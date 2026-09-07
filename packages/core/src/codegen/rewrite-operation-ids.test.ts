import { describe, expect, test } from "bun:test";
import {
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
