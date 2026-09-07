import { describe, expect, test } from "bun:test";
import {
  isMechanicalOperationId,
  isVerbatimRouteId,
  pathToVerbNoun,
  singularize,
  toVerbNoun,
  verbNounSmithyModel,
} from "./rewrite-operation-ids.ts";

const cases: ReadonlyArray<readonly [string, string]> = [
  // go-swagger (Fly Machines)
  ["Apps_list", "listApps"],
  ["Apps_show", "getApp"],
  ["Apps_create", "createApp"],
  ["Apps_delete", "deleteApp"],
  ["App_Certificates_show", "getAppCertificate"],
  ["Machines_list_events", "listMachineEvents"],
  ["Machines_delete_metadata", "deleteMachineMetadata"],
  ["Postgres_users_create", "createPostgresUser"],
  ["Volumes_list", "listVolumes"],
  ["Platform_regions_get", "getPlatformRegion"],
  ["Secretkeys_set", "setSecretKey"],
  ["App_Certificates_acme_create", "createAppAcmeCertificate"],
  ["App_Certificates_acme_delete", "deleteAppAcmeCertificate"],
  ["App_Certificates_list", "listAppCertificates"],
  // Azure autorest `Resource_action`
  ["addsServices_list", "listAddsServices"],
  ["addsServices_get", "getAddsService"],
  ["ServiceMembers_getMetrics", "getServiceMemberMetrics"],
  [
    "ServiceMembers_listGlobalConfiguration",
    "listServiceMemberGlobalConfiguration",
  ],
  ["VirtualMachines_start", "startVirtualMachine"],
  ["OpenIdConnectProvider_get", "getOpenIdConnectProvider"],
  ["Report_verify", "verifyReport"],
  ["Deployments_whatIf", "deployments_whatIf"],
  ["get_apps", "getApps"],
  ["list_all_users", "listAllUsers"],
  ["Get_Apps_list", "getAppsList"],
  ["VirtualMachines_listAll", "listVirtualMachineAll"],
  ["VirtualMachines_createOrUpdate", "virtualMachines_createOrUpdate"],
  ["VirtualMachines_powerOff", "virtualMachines_powerOff"],
  ["ip_address_aggregate_settings_update", "updateIpAddressAggregateSettings"],
  // REST trailing verb
  ["ConfigsList", "listConfigs"],
  ["ContainerCreate", "createContainer"],
  ["PlansGet", "getPlan"],
  ["IssueGet", "getIssue"],
  ["EnvironmentVersionsGet", "getEnvironmentVersion"],
  ["MonitorsList", "listMonitors"],
  ["SitesAppConfigurationList", "listSitesAppConfiguration"],
  ["ExperimentHoldoutsPartialUpdate", "updateExperimentHoldoutPartial"],
  ["SchemaPropertyGroupsList", "listSchemaPropertyGroups"],
  ["QueueList", "listQueue"],
  ["ImageListTags", "imageListTags"],
  // GraphQL nounVerb
  ["projectCreate", "createProject"],
  // Swagger tag-prefixed (Forgejo/Gitea)
  ["orgDelete", "deleteOrg"],
  ["orgGetAll", "orgGetAll"],
  ["issueListIssues", "listIssues"],
  ["issueCreateIssue", "createIssue"],
  ["repoGetRepo", "getRepo"],
  ["issueGetRepoComments", "issueGetRepoComments"],
  ["userGetCurrent", "userGetCurrent"],
  ["environmentPatchCommit", "environmentPatchCommit"],
  ["adminCreateOrg", "adminCreateOrg"],
  ["activitypubInstanceActor", "activitypubInstanceActor"],
  ["serviceDelete", "deleteService"],
  ["projectTokenCreate", "createProjectToken"],
  ["volumeInstanceUpdate", "updateVolumeInstance"],
  ["accountById", "accountById"],
  ["tcpProxies", "tcpProxies"],
  // already verb-first: untouched apart from aliasing
  ["GetObject", "getObject"],
  ["listSprites", "listSprites"],
  ["showContact", "getContact"],
  ["index", "list"],
  ["RetrieveAccount", "getAccount"],
  ["WatchCoreV1PersistentVolumeList", "watchCoreV1PersistentVolumeList"],
  [
    "ReadAppsV1NamespacedReplicaSetStatus",
    "readAppsV1NamespacedReplicaSetStatus",
  ],
  [
    "ReplaceAppsV1NamespacedStatefulSetScale",
    "replaceAppsV1NamespacedStatefulSetScale",
  ],
  [
    "ConnectCoreV1DeleteNamespacedPodProxyWithPath",
    "connectCoreV1DeleteNamespacedPodProxyWithPath",
  ],
  ["DeleteStorageV1CSIDriver", "deleteStorageV1CSIDriver"],
  ["GetSchedulingAPIGroup", "getSchedulingAPIGroup"],
  ["BulkDeleteMessages", "bulkDeleteMessages"],
  ["BulkUpdateGuildRoles", "bulkUpdateGuildRoles"],
  ["AddStatusCheckContexts", "addStatusCheckContexts"],
  ["UploadReleaseAsset", "uploadReleaseAsset"],
  ["PostRadarValueListItems", "postRadarValueListItems"],
  [
    "PostSetupIntentsIntentVerifyMicrodeposits",
    "postSetupIntentsIntentVerifyMicrodeposits",
  ],
  ["InsertCalendarList", "insertCalendarList"],
  ["FetchThreatListUpdates", "fetchThreatListUpdates"],
  ["StreamGenerateContent", "streamGenerateContent"],
  ["QueryCreate", "createQuery"],
  ["ReleaseGet", "getRelease"],
  ["RequestGet", "getRequest"],
  ["SetGet", "getSet"],
  ["CheckGet", "getCheck"],
  ["CheckRunsList", "listCheckRuns"],
  ["QueryRun", "queryRun"],
  ["ReportVerify", "verifyReport"],
  ["ReportList", "listReport"],
  // compounds and non-verb ids: untouched
  ["AppGetOrCreate", "appGetOrCreate"],
  ["AddOrUpdateMembershipForUserInOrg", "addOrUpdateMembershipForUserInOrg"],
  ["DnsRecordsBatch", "dnsRecordsBatch"],
  ["DnsTimeseriesGroupsResponseCode", "dnsTimeseriesGroupsResponseCode"],
  ["Root", "root"],
  ["V1GetProjectFunctionCombinedStats", "v1GetProjectFunctionCombinedStats"],
  ["PullRequestStacksAdd", "addPullRequestStack"],
  ["TeamsControllerCreateTeam", "teamsControllerCreateTeam"],
  // singularisation
  ["AddressesGet", "getAddress"],
  ["AliasesList", "listAliases"],
  ["AliasGet", "getAlias"],
  ["AnalyticsGet", "getAnalytics"],
  ["TimeseriesGet", "getTimeseries"],
  ["SeriesGet", "getSeries"],
  ["SettingsUpdate", "updateSettings"],
  ["CredentialsGet", "getCredentials"],
  ["MetricsGet", "getMetrics"],
  ["StatusesGet", "getStatus"],
  ["CanvasGet", "getCanvas"],
  ["LensGet", "getLens"],
  ["CategoriesGet", "getCategory"],
  ["DatabasesGet", "getDatabase"],
  ["ResponsesGet", "getResponse"],
  ["IndexesList", "listIndexes"],
  ["ProxiesList", "listProxies"],
  ["ProcessesGet", "getProcess"],
  ["Ec2AddressesGet", "getEc2Address"],
  ["IPsList", "listIPs"],
  ["IPsGet", "getIP"],
];

describe("toVerbNoun", () => {
  for (const [input, expected] of cases) {
    test(`${input} → ${expected}`, () => {
      expect(toVerbNoun(input)).toBe(expected);
    });
  }
});

describe("singularize", () => {
  test.each([
    ["Apps", "App"],
    ["Machines", "Machine"],
    ["Addresses", "Address"],
    ["Aliases", "Alias"],
    ["Analytics", "Analytics"],
    ["Series", "Series"],
    ["Status", "Status"],
    ["Statuses", "Status"],
    ["Canvas", "Canvas"],
    ["Categories", "Category"],
    ["Boxes", "Box"],
    ["Branches", "Branch"],
    ["Releases", "Release"],
    ["Databases", "Database"],
    ["Postgres", "Postgres"],
    ["Kubernetes", "Kubernetes"],
    ["DNS", "DNS"],
    ["IPs", "IP"],
    ["Data", "Data"],
    ["Ips", "Ips"],
    ["Keys", "Key"],
    ["Days", "Day"],
    ["Toys", "Toy"],
  ])("%s → %s", (input, expected) => {
    expect(singularize(input)).toBe(expected);
  });
});

describe("verbNounSmithyModel", () => {
  test("renames operations, companions, and every reference", () => {
    const model = {
      shapes: {
        "ns#Svc": {
          type: "service",
          operations: [{ target: "ns#AppsList" }, { target: "ns#AppsGet" }],
        },
        "ns#AppsList": {
          type: "operation",
          input: { target: "ns#AppsListRequest" },
          output: { target: "ns#AppsListResponse" },
        },
        "ns#AppsListRequest": { type: "structure", members: {} },
        "ns#AppsListResponse": {
          type: "structure",
          members: { items: { target: "ns#AppsListResponseItemsList" } },
        },
        "ns#AppsListResponseItemsList": {
          type: "list",
          member: { target: "smithy.api#String" },
        },
        "ns#AppsGet": {
          type: "operation",
          input: { target: "ns#AppsGetRequest" },
          output: { target: "smithy.api#Unit" },
        },
        "ns#AppsGetRequest": { type: "structure", members: {} },
      },
    };
    const r = verbNounSmithyModel(model);
    expect(r.renamed).toBe(2);
    expect(r.collisions).toEqual([]);
    expect(Object.keys(model.shapes).sort()).toEqual(
      [
        "ns#Svc",
        "ns#ListApps",
        "ns#ListAppsRequest",
        "ns#ListAppsResponse",
        "ns#ListAppsResponseItemsList",
        "ns#GetApp",
        "ns#GetAppRequest",
      ].sort(),
    );
    const shapes = model.shapes as Record<string, any>;
    expect(shapes["ns#Svc"].operations).toEqual([
      { target: "ns#ListApps" },
      { target: "ns#GetApp" },
    ]);
    expect(shapes["ns#ListApps"].output.target).toBe("ns#ListAppsResponse");
    expect(shapes["ns#ListAppsResponse"].members.items.target).toBe(
      "ns#ListAppsResponseItemsList",
    );
  });

  test("is idempotent", () => {
    const model = {
      shapes: {
        "ns#AppsList": {
          type: "operation",
          input: { target: "ns#AppsListRequest" },
          output: { target: "smithy.api#Unit" },
        },
        "ns#AppsListRequest": { type: "structure", members: {} },
      },
    };
    verbNounSmithyModel(model);
    const once = JSON.stringify(model);
    const second = verbNounSmithyModel(model);
    expect(second.renamed).toBe(0);
    expect(JSON.stringify(model)).toBe(once);
  });

  test("reports collisions and keeps the original", () => {
    const model = {
      shapes: {
        "ns#ListApps": { type: "operation" },
        "ns#AppsList": { type: "operation" },
      },
    };
    const r = verbNounSmithyModel(model);
    expect(r.renamed).toBe(0);
    expect(r.collisions).toEqual(["AppsList → ListApps"]);
    expect(Object.keys(model.shapes).sort()).toEqual([
      "ns#AppsList",
      "ns#ListApps",
    ]);
  });
});

describe("isMechanicalOperationId", () => {
  test.each([
    [undefined, "get", "/users", true],
    ["get-api-card", "get", "/api/card", true],
    ["post_v1_users_id", "post", "/v1/users/{id}", true],
    ["getApiV1AnnotationLayer", "get", "/api/v1/annotation_layer", true],
    ["get-database-by-uuid", "get", "/databases/{uuid}", true],
    ["getEvents", "get", "/events", true],
    ["getMauUsage", "get", "/api/v2/usage/mau", false],
    ["getExperimentSnapshot", "get", "/v1/snapshots/{id}", false],
    [
      "deleteBranches",
      "post",
      "/api/v2/code-refs/repositories/{repo}/branch-delete-tasks",
      false,
    ],
    ["post-applePay-sessions", "post", "/applePay/sessions", true],
    ["Apps_list", "get", "/apps", false],
    ["listUsers", "get", "/users", false],
    [
      "delete-artifact",
      "delete",
      "/repos/{owner}/{repo}/actions/artifacts/{artifact_id}",
      false,
    ],
    ["get_pricing", "get", "/pricing", true],
    ["get_actions", "get", "/actions", true],
    ["deletePolicy", "delete", "/v2/policies/{policyId}", true],
    ["getCustomerById", "get", "/v2/customers/{customerId}", true],
    [
      "getBalanceByAsset",
      "get",
      "/accounts/{account_id}/balances/{asset}",
      false,
    ],
  ])("%s %s %s → %s", (id, method, path, expected) => {
    expect(isMechanicalOperationId(id, { method, path })).toBe(expected);
  });
});

describe("pathToVerbNoun with a mechanical id", () => {
  test.each([
    ["get", "/feeds", "activity/get-feeds", false, "getFeeds"],
    ["get", "/actions", "get_actions", undefined, "getActions"],
    ["get", "/pricing", "get_pricing", false, "getPricing"],
    [
      "get",
      "/load_balancers/{id}/metrics",
      "get_load_balancer_metrics",
      false,
      "getLoadBalancerMetrics",
    ],
    [
      "delete",
      "/v2/policies/{policyId}",
      "deletePolicy",
      undefined,
      "deletePolicy",
    ],
    [
      "get",
      "/v2/customers/{customerId}",
      "getCustomerById",
      undefined,
      "getCustomer",
    ],
    ["post", "/api/action", "post-api-action", undefined, "createAction"],
    [
      "get",
      "/orgs/{org}/rulesets/{ruleset_id}",
      "repos/get-org-ruleset",
      undefined,
      "getOrgRuleset",
    ],
    [
      "get",
      "/orgs/{org}/rulesets",
      "repos/get-org-rulesets",
      true,
      "listOrgRulesets",
    ],
    [
      "delete",
      "/api/jobs/{namespace}/scheduled/{id}",
      "deleteScheduledJob",
      undefined,
      "deleteScheduledJob",
    ],
    [
      "get",
      "/v2/payments/{session_id}/authorizations/{authorization_id}",
      "getPaymentSessionAuthorization",
      undefined,
      "getPaymentSessionAuthorization",
    ],
  ])("%s %s (%s) → %s", (method, path, id, coll, expected) => {
    expect(
      pathToVerbNoun({ method, path }, { returnsCollection: coll, nouns: id }),
    ).toBe(expected);
  });
});

describe("pathToVerbNoun with a verbatim id", () => {
  test.each([
    [
      "post",
      "/v1/apps/{appId}/promote",
      "postV1AppsByAppIdPromote",
      "createAppPromote",
    ],
    ["get", "/v1/apps", "getV1Apps", "getApps"],
    ["get", "/v1/apps/{appId}", "getV1AppsByAppId", "getApp"],
    ["post", "/v1/accounts/{account}", "PostAccountsAccount", "updateAccount"],
    ["post", "/v1/accounts", "PostAccounts", "createAccount"],
    ["get", "/v1/accounts/{account}", "GetAccountsAccount", "getAccount"],
    [
      "delete",
      "/v1/accounts/{account}",
      "DeleteAccountsAccount",
      "deleteAccount",
    ],
    [
      "delete",
      "/v1/customers/{customer}/discount",
      "DeleteCustomersCustomerDiscount",
      "deleteCustomerDiscount",
    ],
    [
      "get",
      "/v1/customers/{customer}/balance_transactions/{transaction}",
      "GetCustomersCustomerBalanceTransactionsTransaction",
      "getCustomerBalanceTransaction",
    ],
    [
      "delete",
      "/organizations/{organization}/teams/{team}",
      "delete_organization_team",
      "deleteOrganizationTeam",
    ],
    [
      "get",
      "/organizations/{organization}/teams/{team}/members/{id}",
      "get_organization_team_member",
      "getOrganizationTeamMember",
    ],
    [
      "delete",
      "/projects/{project_id}/branches/{branch_id}/custom-domains/{domain}",
      "deleteProjectBranchCustomDomain",
      "deleteProjectBranchCustomDomain",
    ],
    [
      "delete",
      "/v1/buckets/{bucketId}/keys/{keyId}",
      "deleteV1BucketsByBucketIdKeysByKeyId",
      "deleteBucketKey",
    ],
    ["get", "/v1/users/{id}", "get_v1_users_id", "getUser"],
    [
      "delete",
      "/projects/{project_id}/jwks/{jwks_id}",
      "deleteProjectJWKS",
      "deleteProjectJWKS",
    ],
    [
      "get",
      "/projects/{project_id}/branches/{branch_id}/data-api/{database_name}",
      "getProjectBranchDataAPI",
      "getProjectBranchDataAPI",
    ],
    ["get", "/v2/customers/{customerId}", "getCustomerById", "getCustomer"],
    [
      "get",
      "/{teamSlug}/{projectSlug}/{repositoryName}/blobs/{digest}",
      "getByTeamSlugByProjectSlugByRepositoryNameBlobsByDigest",
      "getBlob",
    ],
    [
      "delete",
      "/v1/security/firewall/config/{configVersion}",
      "deleteSecurityFirewallConfigByConfigVersion",
      "deleteSecurityFirewallConfig",
    ],
  ])("%s %s (%s) → %s", (method, path, id, expected) => {
    expect(
      pathToVerbNoun({ method, path }, { nouns: id, verbatim: true }),
    ).toBe(expected);
  });
});

describe("pathToVerbNoun", () => {
  test.each([
    ["get", "/users", "listUsers"],
    ["get", "/users/{id}", "getUser"],
    ["post", "/users", "createUser"],
    ["put", "/users/{id}", "putUser"],
    ["post", "/users/{id}", "updateUser"],
    ["patch", "/users/{id}", "updateUser"],
    ["delete", "/users/{id}", "deleteUser"],
    ["post", "/users/{id}/reset", "resetUser"],
    ["post", "/emails/{email_id}/cancel", "cancelEmail"],
    ["get", "/orgs/{org}/repos", "listOrgRepos"],
    ["get", "/api/v1/annotation_layer", "listAnnotationLayer"],
    ["get", "/api/card", "listCard"],
    [
      "get",
      "/api/public/dashboard/{uuid}/dashcard/{dashcard-id}/card/{card-id}",
      "getDashboardDashcardCard",
    ],
    ["post", "/applePay/sessions", "createApplePaySession"],
    ["post", "/cancels", "createCancel"],
    [
      "get",
      "/v1/benefit-offers/country-summaries",
      "listBenefitOfferCountrySummaries",
    ],
    ["get", "/v1/contractor-invoices/{id}", "getContractorInvoice"],
    ["post", "/auth/oauth2/token", "createAuthOauth2Token"],
    ["post", "/login", "login"],
    ["get", "/", "getRoot"],
    ["get", "/api/v2/usage/mau", "listUsageMau"],
    ["post", "/api/ee/action-v2/execute-bulk", "executeEeActionV2Bulk"],
    ["get", "/api/collections/{namespace}/{slug}-{id}", "getCollection"],
    ["get", "/zen", "getZen"],
    ["get", "/feeds", "getFeeds"],
    ["get", "/guilds/{guild_id}/webhooks", "getGuildWebhooks"],
    ["delete", "/api/notifications", "deleteNotifications"],
  ])("%s %s → %s", (method, path, expected) => {
    expect(
      pathToVerbNoun(
        { method, path },
        { returnsCollection: expected.startsWith("list") },
      ),
    ).toBe(expected);
  });
});

describe("isVerbatimRouteId", () => {
  test.each([
    [undefined, "get", "/apps", true],
    ["postV1AppsByAppIdPromote", "post", "/v1/apps/{appId}/promote", true],
    ["getV1Apps", "get", "/v1/apps", true],
    ["get_v1_users_id", "get", "/v1/users/{id}", true],
    ["get-api-card", "get", "/api/card", true],
    [
      "getByTeamSlugByProjectSlugByRepositoryNameBlobsByDigest",
      "get",
      "/{teamSlug}/{projectSlug}/{repositoryName}/blobs/{digest}",
      true,
    ],
    ["activity/get-feeds", "get", "/feeds", true],
    ["get_actions", "get", "/actions", true],
    [
      "deleteScheduledJob",
      "delete",
      "/api/jobs/{namespace}/scheduled/{id}",
      false,
    ],
    ["getCustomerById", "get", "/v2/customers/{customerId}", true],
    [
      "get_webhook_by_token",
      "get",
      "/webhooks/{webhook_id}/{webhook_token}",
      false,
    ],
    [
      "getFirewallConfig",
      "get",
      "/v1/security/firewall/config/{configVersion}",
      false,
    ],
  ])("%s %s %s → %s", (id, method, path, expected) => {
    expect(isVerbatimRouteId(id, { method, path })).toBe(expected);
  });
});
