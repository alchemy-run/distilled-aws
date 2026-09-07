## List Access applications

**get** `/{accounts_or_zones}/{account_or_zone_id}/access/apps`

Lists all Access applications in an account or zone.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Query Parameters

- `aud: optional string`

  The aud of the app.

- `domain: optional string`

  The domain of the app.

- `exact: optional boolean`

  True for only exact string matches against passed name/domain query parameters.

- `name: optional string`

  The name of the app.

- `page: optional number`

  Page number of results.

- `per_page: optional number`

  Number of results per page.

- `search: optional string`

  Search for apps by other listed query parameters.

- `target_attributes: optional string`

  Target Criteria attributes in key=value format.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional array of object { domain, type, id, 31 more }  or object { id, allowed_idps, app_launcher_visible, 10 more }  or object { domain, type, id, 31 more }  or 10 more`

  - `SelfHostedApplication object { domain, type, id, 31 more }`

    - `domain: string`

      The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.

    - `type: ApplicationType`

      The application type.

      - `"self_hosted"`

      - `"saas"`

      - `"ssh"`

      - `"vnc"`

      - `"app_launcher"`

      - `"warp"`

      - `"biso"`

      - `"bookmark"`

      - `"dash_sso"`

      - `"infrastructure"`

      - `"rdp"`

      - `"mcp"`

      - `"mcp_portal"`

      - `"proxy_endpoint"`

    - `id: optional string`

      UUID.

    - `allow_authenticate_via_warp: optional boolean`

      When set to true, users can authenticate to this application using their WARP session.  When set to false this application will always require direct IdP authentication. This setting always overrides the organization setting for WARP authentication.

    - `allow_iframe: optional boolean`

      Enables loading application content in an iFrame.

    - `allowed_idps: optional array of AllowedIdPs`

      The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.

    - `app_launcher_visible: optional boolean`

      Displays the application in the App Launcher.

    - `aud: optional string`

      Audience tag.

    - `auto_redirect_to_identity: optional boolean`

      When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.

    - `cors_headers: optional CORSHeaders`

      - `allow_all_headers: optional boolean`

        Allows all HTTP request headers.

      - `allow_all_methods: optional boolean`

        Allows all HTTP request methods.

      - `allow_all_origins: optional boolean`

        Allows all origins.

      - `allow_credentials: optional boolean`

        When set to `true`, includes credentials (cookies, authorization headers, or TLS client certificates) with requests.

      - `allowed_headers: optional array of AllowedHeaders`

        Allowed HTTP request headers.

      - `allowed_methods: optional array of AllowedMethods`

        Allowed HTTP request methods.

        - `"GET"`

        - `"POST"`

        - `"HEAD"`

        - `"PUT"`

        - `"DELETE"`

        - `"CONNECT"`

        - `"OPTIONS"`

        - `"TRACE"`

        - `"PATCH"`

      - `allowed_origins: optional array of AllowedOrigins`

        Allowed origins.

      - `max_age: optional number`

        The maximum number of seconds the results of a preflight request can be cached.

    - `custom_deny_message: optional string`

      The custom error message shown to a user when they are denied access to the application.

    - `custom_deny_url: optional string`

      The custom URL a user is redirected to when they are denied access to the application when failing identity-based rules.

    - `custom_non_identity_deny_url: optional string`

      The custom URL a user is redirected to when they are denied access to the application when failing non-identity rules.

    - `custom_pages: optional array of string`

      The custom pages that will be displayed when applicable for this application

    - `destinations: optional array of object { type, uri }  or object { cidr, hostname, l4_protocol, 3 more }  or object { mcp_server_id, type }  or 4 more`

      List of destinations secured by Access. This supersedes `self_hosted_domains` to allow for more flexibility in defining different types of domains. If `destinations` are provided, then `self_hosted_domains` will be ignored.

      - `PublicDestination object { type, uri }`

        A public hostname that Access will secure. Public destinations support sub-domain and path. Wildcard '*' can be used in the definition.

        - `type: optional "public"`

          - `"public"`

        - `uri: optional string`

          The URI of the destination. Public destinations' URIs can include a domain and path with [wildcards](https://developers.cloudflare.com/cloudflare-one/policies/access/app-paths/).

      - `PrivateDestination object { cidr, hostname, l4_protocol, 3 more }`

        - `cidr: optional string`

          The CIDR range of the destination. Single IPs will be computed as /32.

        - `hostname: optional string`

          The hostname of the destination. Matches a valid SNI served by an HTTPS origin.

        - `l4_protocol: optional "tcp" or "udp"`

          The L4 protocol of the destination. When omitted, both UDP and TCP traffic will match.

          - `"tcp"`

          - `"udp"`

        - `port_range: optional string`

          The port range of the destination. Can be a single port or a range of ports. When omitted, all ports will match.

        - `type: optional "private"`

          - `"private"`

        - `vnet_id: optional string`

          The VNET ID to match the destination. When omitted, all VNETs will match.

      - `ViaMcpServerPortalDestination object { mcp_server_id, type }`

        A MCP server id configured in ai-controls. Access will secure the MCP server if accessed through a MCP portal.

        - `mcp_server_id: optional string`

          The MCP server id configured in ai-controls.

        - `type: optional "via_mcp_server_portal"`

          - `"via_mcp_server_portal"`

      - `WorkerDestination object { type, worker_id }`

        A specific Cloudflare Worker that Access will secure. All requests routed to the specified Worker, including its preview deployments, will be protected. The `preview_worker` and `public` destination types takes precedence, so you can create separate applications to override the policies for the Worker's previews or specific paths.

        - `type: "worker"`

          - `"worker"`

        - `worker_id: string`

          The ID of the Cloudflare Worker to protect with Access.

      - `PreviewWorkerDestination object { type, worker_id }`

        A specific Cloudflare Worker whose preview deployments Access will secure. Only requests routed to the preview deployments of the specified Worker will be protected. The `public` destination type takes precedence, so you can create separate applications to override the policies for specific paths.

        - `type: "preview_worker"`

          - `"preview_worker"`

        - `worker_id: string`

          The ID of the Cloudflare Worker whose preview deployments to protect with Access.

      - `AllWorkersDestination object { type }`

        Protects all Cloudflare Workers on the account with Access, including their preview deployments. At most one destination of this type can exist per account. The `worker`, `preview_worker`, `all_preview_workers`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

        - `type: "all_workers"`

          - `"all_workers"`

      - `AllPreviewWorkersDestination object { type }`

        Protects the preview deployments of all Cloudflare Workers on the account with Access. At most one destination of this type can exist per account. The `worker`, `preview_worker`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

        - `type: "all_preview_workers"`

          - `"all_preview_workers"`

    - `eager_redirect_cookie_setting: optional boolean`

      Preemptively sets the Access session cookie on every hostname in a multi-hostname self-hosted application during the initial redirect chain, rather than setting it lazily on first visit. Defaults to true. Set to false to disable the eager redirect cookie behavior.

    - `enable_binding_cookie: optional boolean`

      Enables the binding cookie, which increases security against compromised authorization tokens and CSRF attacks.

    - `http_only_cookie_attribute: optional boolean`

      Enables the HttpOnly cookie attribute, which increases security against XSS attacks.

    - `logo_url: optional string`

      The image URL for the logo shown in the App Launcher dashboard.

    - `mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }`

      Configures multi-factor authentication (MFA) settings.

      - `allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"`

        Lists the MFA methods that users can authenticate with.

        - `"totp"`

        - `"biometrics"`

        - `"security_key"`

      - `mfa_disabled: optional boolean`

        Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

      - `session_duration: optional string`

        Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

    - `name: optional string`

      The name of the application.

    - `oauth_configuration: optional object { dynamic_client_registration, enabled, grant }`

      **Beta:** Optional configuration for managing an OAuth authorization flow controlled by Access. When set, Access will act as the OAuth authorization server for this application. Only compatible with OAuth clients that support [RFC 8707](https://datatracker.ietf.org/doc/html/rfc8707) (Resource Indicators for OAuth 2.0). This feature is currently in beta.

      - `dynamic_client_registration: optional object { allow_any_on_localhost, allow_any_on_loopback, allowed_uris, enabled }`

        Settings for OAuth dynamic client registration.

        - `allow_any_on_localhost: optional boolean`

          Allows any client with redirect URIs on localhost.

        - `allow_any_on_loopback: optional boolean`

          Allows any client with redirect URIs on 127.0.0.1.

        - `allowed_uris: optional array of string`

          The URIs that are allowed as redirect URIs for dynamically registered clients. Must use the `https` protocol. Paths may end in `/*` to match all sub-paths.

        - `enabled: optional boolean`

          Whether dynamic client registration is enabled.

      - `enabled: optional boolean`

        Whether the OAuth configuration is enabled for this application. When set to `false`, Access will not handle OAuth for this application. Defaults to `true` if omitted.

      - `grant: optional object { access_token_lifetime, session_duration }`

        Settings for OAuth grant behavior.

        - `access_token_lifetime: optional string`

          The lifetime of the access token. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

        - `session_duration: optional string`

          The duration of the OAuth session. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

    - `options_preflight_bypass: optional boolean`

      Allows options preflight requests to bypass Access authentication and go directly to the origin. Cannot turn on if cors_headers is set.

    - `path_cookie_attribute: optional boolean`

      Enables cookie paths to scope an application's JWT to the application path. If disabled, the JWT will scope to the hostname by default

    - `policies: optional array of object { id, approval_groups, approval_required, 14 more }`

      - `id: optional string`

        The UUID of the policy

      - `approval_groups: optional array of ApprovalGroup`

        Administrators who can approve a temporary authentication request.

        - `approvals_needed: number`

          The number of approvals needed to obtain access.

        - `email_addresses: optional array of string`

          A list of emails that can approve the access request.

        - `email_list_uuid: optional string`

          The UUID of an re-usable email list.

      - `approval_required: optional boolean`

        Requires the user to request access from an administrator at the start of each session.

      - `connection_rules: optional object { rdp }`

        The rules that define how users may connect to targets secured by your application.

        - `rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }`

          The RDP-specific rules that define clipboard behavior for RDP connections.

          - `allowed_clipboard_local_to_remote_formats: optional array of "text"`

            Clipboard formats allowed when copying from local machine to remote RDP session.

            - `"text"`

          - `allowed_clipboard_remote_to_local_formats: optional array of "text"`

            Clipboard formats allowed when copying from remote RDP session to local machine.

            - `"text"`

      - `created_at: optional string`

      - `decision: optional Decision`

        The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

        - `"allow"`

        - `"deny"`

        - `"non_identity"`

        - `"bypass"`

      - `exclude: optional array of AccessRule`

        Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

        - `GroupRule object { group }`

          Matches an Access group.

          - `group: object { id }`

            - `id: string`

              The ID of a previously created Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

          - `any_valid_service_token: object {  }`

            An empty object which matches on all service tokens.

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

          - `auth_context: object { id, ac_id, identity_provider_id }`

            - `id: string`

              The ID of an Authentication context.

            - `ac_id: string`

              The ACID of an Authentication context.

            - `identity_provider_id: string`

              The ID of your Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

          - `auth_method: object { auth_method }`

            - `auth_method: string`

              The type of authentication method https://datatracker.ietf.org/doc/html/rfc8176#section-2.

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

          - `azureAD: object { id, identity_provider_id }`

            - `id: string`

              The ID of an Azure group.

            - `identity_provider_id: string`

              The ID of your Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

          - `certificate: object {  }`

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

          - `common_name: object { common_name }`

            - `common_name: string`

              The common name to match.

        - `CountryRule object { geo }`

          Matches a specific country

          - `geo: object { country_code }`

            - `country_code: string`

              The country code that should be matched.

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

          - `device_posture: object { integration_uid }`

            - `integration_uid: string`

              The ID of a device posture integration.

        - `DomainRule object { email_domain }`

          Match an entire email domain.

          - `email_domain: object { domain }`

            - `domain: string`

              The email domain to match.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

          - `email_list: object { id }`

            - `id: string`

              The ID of a previously created email list.

        - `EmailRule object { email }`

          Matches a specific email.

          - `email: object { email }`

            - `email: string`

              The email of the user.

        - `EveryoneRule object { everyone }`

          Matches everyone.

          - `everyone: object {  }`

            An empty object which matches on all users.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

          - `external_evaluation: object { evaluate_url, keys_url }`

            - `evaluate_url: string`

              The API endpoint containing your business logic.

            - `keys_url: string`

              The API endpoint containing the key that Access uses to verify that the response came from your API.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

          - `"github-organization": object { identity_provider_id, name, team }`

            - `identity_provider_id: string`

              The ID of your Github identity provider.

            - `name: string`

              The name of the organization.

            - `team: optional string`

              The name of the team

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

          - `gsuite: object { email, identity_provider_id }`

            - `email: string`

              The email of the Google Workspace group.

            - `identity_provider_id: string`

              The ID of your Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

          - `login_method: object { id }`

            - `id: string`

              The ID of an identity provider.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

          - `ip_list: object { id }`

            - `id: string`

              The ID of a previously created IP list.

        - `IPRule object { ip }`

          Matches an IP address block.

          - `ip: object { ip }`

            - `ip: string`

              An IPv4 or IPv6 CIDR block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

          - `okta: object { identity_provider_id, name }`

            - `identity_provider_id: string`

              The ID of your Okta identity provider.

            - `name: string`

              The name of the Okta group.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

          - `saml: object { attribute_name, attribute_value, identity_provider_id }`

            - `attribute_name: string`

              The name of the SAML attribute.

            - `attribute_value: string`

              The SAML attribute value to look for.

            - `identity_provider_id: string`

              The ID of your SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

          - `oidc: object { claim_name, claim_value, identity_provider_id }`

            - `claim_name: string`

              The name of the OIDC claim.

            - `claim_value: string`

              The OIDC claim value to look for.

            - `identity_provider_id: string`

              The ID of your OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

          - `service_token: object { token_id }`

            - `token_id: string`

              The ID of a Service Token.

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

          - `linked_app_token: object { app_uid }`

            - `app_uid: string`

              The ID of an Access OIDC SaaS application

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

          - `user_risk_score: object { user_risk_score }`

            - `user_risk_score: array of "low" or "medium" or "high" or "unscored"`

              A list of risk score levels to match. Values can be low, medium, high, or unscored.

              - `"low"`

              - `"medium"`

              - `"high"`

              - `"unscored"`

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

          - `cloudflare_account_member: object { account_id }`

            - `account_id: optional string`

              Identifier.

      - `include: optional array of AccessRule`

        Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `isolation_required: optional boolean`

        Require this application to be served in an isolated browser for users matching this policy. 'Client Web Isolation' must be on for the account in order to use this feature.

      - `mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }`

        Configures multi-factor authentication (MFA) settings.

        - `allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"`

          Lists the MFA methods that users can authenticate with.

          - `"totp"`

          - `"biometrics"`

          - `"security_key"`

        - `mfa_disabled: optional boolean`

          Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

        - `session_duration: optional string`

          Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

      - `name: optional string`

        The name of the Access policy.

      - `precedence: optional number`

        The order of execution for this policy. Must be unique for each policy within an app.

      - `purpose_justification_prompt: optional string`

        A custom message that will appear on the purpose justification screen.

      - `purpose_justification_required: optional boolean`

        Require users to enter a justification when they log in to the application.

      - `require: optional array of AccessRule`

        Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `session_duration: optional string`

        The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

      - `updated_at: optional string`

    - `read_service_tokens_from_header: optional string`

      Allows matching Access Service Tokens passed HTTP in a single header with this name.
      This works as an alternative to the (CF-Access-Client-Id, CF-Access-Client-Secret) pair of headers.
      The header value will be interpreted as a json object similar to:
      {
      "cf-access-client-id": "88bf3b6d86161464f6509f7219099e57.access.example.com",
      "cf-access-client-secret": "bdd31cbc4dec990953e39163fbbb194c93313ca9f0a6e420346af9d326b1d2a5"
      }

    - `same_site_cookie_attribute: optional string`

      Sets the SameSite cookie setting, which provides increased security against CSRF attacks.

    - `scim_config: optional object { idp_uid, remote_uri, authentication, 3 more }`

      Configuration for provisioning to this application via SCIM. This is currently in closed beta.

      - `idp_uid: string`

        The UID of the IdP to use as the source for SCIM resources to provision to this application.

      - `remote_uri: string`

        The base URI for the application's SCIM-compatible API.

      - `authentication: optional SCIMConfigAuthenticationHTTPBasic or SCIMConfigAuthenticationOAuthBearerToken or SCIMConfigAuthenticationOauth2 or 2 more`

        Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

        - `SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }`

          Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

          - `password: string`

            Password used to authenticate with the remote SCIM service.

          - `scheme: "httpbasic"`

            The authentication scheme to use when making SCIM requests to this application.

            - `"httpbasic"`

          - `user: string`

            User name used to authenticate with the remote SCIM service.

        - `SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }`

          Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

          - `token: string`

            Token used to authenticate with the remote SCIM service.

          - `scheme: "oauthbearertoken"`

            The authentication scheme to use when making SCIM requests to this application.

            - `"oauthbearertoken"`

        - `SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }`

          Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

          - `authorization_url: string`

            URL used to generate the auth code used during token generation.

          - `client_id: string`

            Client ID used to authenticate when generating a token for authenticating with the remote SCIM service.

          - `client_secret: string`

            Secret used to authenticate when generating a token for authenticating with the remove SCIM service.

          - `scheme: "oauth2"`

            The authentication scheme to use when making SCIM requests to this application.

            - `"oauth2"`

          - `token_url: string`

            URL used to generate the token used to authenticate with the remote SCIM service.

          - `scopes: optional array of string`

            The authorization scopes to request when generating the token used to authenticate with the remove SCIM service.

        - `AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }`

          Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

          - `client_id: string`

            Client ID of the Access service token used to authenticate with the remote service.

          - `client_secret: string`

            Client secret of the Access service token used to authenticate with the remote service.

          - `scheme: "access_service_token"`

            The authentication scheme to use when making SCIM requests to this application.

            - `"access_service_token"`

        - `AccessSCIMConfigMultiAuthentication = array of SCIMConfigAuthenticationHTTPBasic or SCIMConfigAuthenticationOAuthBearerToken or SCIMConfigAuthenticationOauth2 or object { client_id, client_secret, scheme }`

          Multiple authentication schemes

          - `SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }`

            Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

          - `SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }`

            Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

          - `SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }`

            Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

          - `AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }`

            Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

            - `client_id: string`

              Client ID of the Access service token used to authenticate with the remote service.

            - `client_secret: string`

              Client secret of the Access service token used to authenticate with the remote service.

            - `scheme: "access_service_token"`

              The authentication scheme to use when making SCIM requests to this application.

              - `"access_service_token"`

      - `deactivate_on_delete: optional boolean`

        If false, propagates DELETE requests to the target application for SCIM resources. If true, sets 'active' to false on the SCIM resource. Note: Some targets do not support DELETE operations.

      - `enabled: optional boolean`

        Whether SCIM provisioning is turned on for this application.

      - `mappings: optional array of SCIMConfigMapping`

        A list of mappings to apply to SCIM resources before provisioning them in this application. These can transform or filter the resources to be provisioned.

        - `schema: string`

          Which SCIM resource type this mapping applies to.

        - `enabled: optional boolean`

          Whether or not this mapping is enabled.

        - `filter: optional string`

          A [SCIM filter expression](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2) that matches resources that should be provisioned to this application.

        - `operations: optional object { create, delete, update }`

          Whether or not this mapping applies to creates, updates, or deletes.

          - `create: optional boolean`

            Whether or not this mapping applies to create (POST) operations.

          - `delete: optional boolean`

            Whether or not this mapping applies to DELETE operations.

          - `update: optional boolean`

            Whether or not this mapping applies to update (PATCH/PUT) operations.

        - `strictness: optional "strict" or "passthrough"`

          The level of adherence to outbound resource schemas when provisioning to this mapping. ‘Strict’ removes unknown values, while ‘passthrough’ passes unknown values to the target.

          - `"strict"`

          - `"passthrough"`

        - `transform_jsonata: optional string`

          A [JSONata](https://jsonata.org/) expression that transforms the resource before provisioning it in the application.

    - `self_hosted_domains: optional array of SelfHostedDomains`

      List of public domains that Access will secure. This field is deprecated in favor of `destinations` and will be supported until **November 21, 2025.** If `destinations` are provided, then `self_hosted_domains` will be ignored.

    - `service_auth_401_redirect: optional boolean`

      Returns a 401 status code when the request is blocked by a Service Auth policy.

    - `session_duration: optional string`

      The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. Note: unsupported for infrastructure type applications.

    - `skip_interstitial: optional boolean`

      Enables automatic authentication through cloudflared.

    - `tags: optional array of string`

      The tags you want assigned to an application. Tags are used to filter applications in the App Launcher dashboard.

    - `use_clientless_isolation_app_launcher_url: optional boolean`

      Determines if users can access this application via a clientless browser isolation URL.
      This allows users to access private domains without connecting to Gateway. The option requires
      Clientless Browser Isolation to be set up with policies that allow users of this application.

  - `SaaSApplication object { id, allowed_idps, app_launcher_visible, 10 more }`

    - `id: optional string`

      UUID.

    - `allowed_idps: optional array of AllowedIdPs`

      The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.

    - `app_launcher_visible: optional boolean`

      Displays the application in the App Launcher.

    - `aud: optional string`

      Audience tag.

    - `auto_redirect_to_identity: optional boolean`

      When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.

    - `custom_pages: optional array of string`

      The custom pages that will be displayed when applicable for this application

    - `logo_url: optional string`

      The image URL for the logo shown in the App Launcher dashboard.

    - `name: optional string`

      The name of the application.

    - `policies: optional array of object { id, approval_groups, approval_required, 14 more }`

      - `id: optional string`

        The UUID of the policy

      - `approval_groups: optional array of ApprovalGroup`

        Administrators who can approve a temporary authentication request.

        - `approvals_needed: number`

          The number of approvals needed to obtain access.

        - `email_addresses: optional array of string`

          A list of emails that can approve the access request.

        - `email_list_uuid: optional string`

          The UUID of an re-usable email list.

      - `approval_required: optional boolean`

        Requires the user to request access from an administrator at the start of each session.

      - `connection_rules: optional object { rdp }`

        The rules that define how users may connect to targets secured by your application.

        - `rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }`

          The RDP-specific rules that define clipboard behavior for RDP connections.

          - `allowed_clipboard_local_to_remote_formats: optional array of "text"`

            Clipboard formats allowed when copying from local machine to remote RDP session.

            - `"text"`

          - `allowed_clipboard_remote_to_local_formats: optional array of "text"`

            Clipboard formats allowed when copying from remote RDP session to local machine.

            - `"text"`

      - `created_at: optional string`

      - `decision: optional Decision`

        The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

      - `exclude: optional array of AccessRule`

        Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `include: optional array of AccessRule`

        Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `isolation_required: optional boolean`

        Require this application to be served in an isolated browser for users matching this policy. 'Client Web Isolation' must be on for the account in order to use this feature.

      - `mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }`

        Configures multi-factor authentication (MFA) settings.

        - `allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"`

          Lists the MFA methods that users can authenticate with.

          - `"totp"`

          - `"biometrics"`

          - `"security_key"`

        - `mfa_disabled: optional boolean`

          Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

        - `session_duration: optional string`

          Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

      - `name: optional string`

        The name of the Access policy.

      - `precedence: optional number`

        The order of execution for this policy. Must be unique for each policy within an app.

      - `purpose_justification_prompt: optional string`

        A custom message that will appear on the purpose justification screen.

      - `purpose_justification_required: optional boolean`

        Require users to enter a justification when they log in to the application.

      - `require: optional array of AccessRule`

        Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `session_duration: optional string`

        The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

      - `updated_at: optional string`

    - `saas_app: optional SAMLSaaSApp or OIDCSaaSApp`

      - `SAMLSaaSApp object { auth_type, consumer_service_url, custom_attributes, 8 more }`

        - `auth_type: optional "saml" or "oidc"`

          Optional identifier indicating the authentication protocol used for the saas app. Required for OIDC. Default if unset is "saml"

          - `"saml"`

          - `"oidc"`

        - `consumer_service_url: optional string`

          The service provider's endpoint that is responsible for receiving and parsing a SAML assertion.

        - `custom_attributes: optional array of object { friendly_name, name, name_format, 2 more }`

          - `friendly_name: optional string`

            The SAML FriendlyName of the attribute.

          - `name: optional string`

            The name of the attribute.

          - `name_format: optional "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified" or "urn:oasis:names:tc:SAML:2.0:attrname-format:basic" or "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"`

            A globally unique name for an identity or service provider.

            - `"urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"`

            - `"urn:oasis:names:tc:SAML:2.0:attrname-format:basic"`

            - `"urn:oasis:names:tc:SAML:2.0:attrname-format:uri"`

          - `required: optional boolean`

            If the attribute is required when building a SAML assertion.

          - `source: optional object { name, name_by_idp }`

            - `name: optional string`

              The name of the IdP attribute.

            - `name_by_idp: optional array of object { idp_id, source_name }`

              A mapping from IdP ID to attribute name.

              - `idp_id: optional string`

                The UID of the IdP.

              - `source_name: optional string`

                The name of the IdP provided attribute.

        - `default_relay_state: optional string`

          The URL that the user will be redirected to after a successful login for IDP initiated logins.

        - `idp_entity_id: optional string`

          The unique identifier for your SaaS application.

        - `name_id_format: optional SaaSAppNameIDFormat`

          The format of the name identifier sent to the SaaS application.

          - `"id"`

          - `"email"`

        - `name_id_transform_jsonata: optional string`

          A [JSONata](https://jsonata.org/) expression that transforms an application's user identities into a NameID value for its SAML assertion. This expression should evaluate to a singular string. The output of this expression can override the `name_id_format` setting.

        - `public_key: optional string`

          The Access public certificate that will be used to verify your identity.

        - `saml_attribute_transform_jsonata: optional string`

          A [JSONata] (https://jsonata.org/) expression that transforms an application's user identities into attribute assertions in the SAML response. The expression can transform id, email, name, and groups values. It can also transform fields listed in the saml_attributes or oidc_fields of the identity provider used to authenticate. The output of this expression must be a JSON object.

        - `sp_entity_id: optional string`

          A globally unique name for an identity or service provider.

        - `sso_endpoint: optional string`

          The endpoint where your SaaS application will send login requests.

      - `OIDCSaaSApp object { access_token_lifetime, allow_pkce_without_client_secret, app_launcher_url, 11 more }`

        - `access_token_lifetime: optional string`

          The lifetime of the OIDC Access Token after creation. Valid units are m,h. Must be greater than or equal to 1m and less than or equal to 24h.

        - `allow_pkce_without_client_secret: optional boolean`

          If client secret should be required on the token endpoint when authorization_code_with_pkce grant is used.

        - `app_launcher_url: optional string`

          The URL where this applications tile redirects users

        - `auth_type: optional "saml" or "oidc"`

          Identifier of the authentication protocol used for the saas app. Required for OIDC.

          - `"saml"`

          - `"oidc"`

        - `client_id: optional string`

          The application client id

        - `client_secret: optional string`

          The application client secret, only returned on POST request.

        - `custom_claims: optional array of object { name, required, scope, source }`

          - `name: optional string`

            The name of the claim.

          - `required: optional boolean`

            If the claim is required when building an OIDC token.

          - `scope: optional "groups" or "profile" or "email" or "openid"`

            The scope of the claim.

            - `"groups"`

            - `"profile"`

            - `"email"`

            - `"openid"`

          - `source: optional object { name, name_by_idp }`

            - `name: optional string`

              The name of the IdP claim.

            - `name_by_idp: optional map[string]`

              A mapping from IdP ID to claim name.

        - `grant_types: optional array of "authorization_code" or "authorization_code_with_pkce" or "refresh_tokens" or 2 more`

          The OIDC flows supported by this application

          - `"authorization_code"`

          - `"authorization_code_with_pkce"`

          - `"refresh_tokens"`

          - `"hybrid"`

          - `"implicit"`

        - `group_filter_regex: optional string`

          A regex to filter Cloudflare groups returned in ID token and userinfo endpoint

        - `hybrid_and_implicit_options: optional object { return_access_token_from_authorization_endpoint, return_id_token_from_authorization_endpoint }`

          - `return_access_token_from_authorization_endpoint: optional boolean`

            If an Access Token should be returned from the OIDC Authorization endpoint

          - `return_id_token_from_authorization_endpoint: optional boolean`

            If an ID Token should be returned from the OIDC Authorization endpoint

        - `public_key: optional string`

          The Access public certificate that will be used to verify your identity.

        - `redirect_uris: optional array of string`

          The permitted URL's for Cloudflare to return Authorization codes and Access/ID tokens

        - `refresh_token_options: optional object { lifetime }`

          - `lifetime: optional string`

            How long a refresh token will be valid for after creation. Valid units are m,h,d. Must be longer than 1m.

        - `scopes: optional array of "openid" or "groups" or "email" or "profile"`

          Define the user information shared with access, "offline_access" scope will be automatically enabled if refresh tokens are enabled

          - `"openid"`

          - `"groups"`

          - `"email"`

          - `"profile"`

    - `scim_config: optional object { idp_uid, remote_uri, authentication, 3 more }`

      Configuration for provisioning to this application via SCIM. This is currently in closed beta.

      - `idp_uid: string`

        The UID of the IdP to use as the source for SCIM resources to provision to this application.

      - `remote_uri: string`

        The base URI for the application's SCIM-compatible API.

      - `authentication: optional SCIMConfigAuthenticationHTTPBasic or SCIMConfigAuthenticationOAuthBearerToken or SCIMConfigAuthenticationOauth2 or 2 more`

        Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

        - `SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }`

          Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

        - `SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }`

          Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

        - `SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }`

          Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

        - `AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }`

          Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

          - `client_id: string`

            Client ID of the Access service token used to authenticate with the remote service.

          - `client_secret: string`

            Client secret of the Access service token used to authenticate with the remote service.

          - `scheme: "access_service_token"`

            The authentication scheme to use when making SCIM requests to this application.

            - `"access_service_token"`

        - `AccessSCIMConfigMultiAuthentication = array of SCIMConfigAuthenticationHTTPBasic or SCIMConfigAuthenticationOAuthBearerToken or SCIMConfigAuthenticationOauth2 or object { client_id, client_secret, scheme }`

          Multiple authentication schemes

          - `SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }`

            Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

          - `SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }`

            Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

          - `SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }`

            Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

          - `AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }`

            Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

            - `client_id: string`

              Client ID of the Access service token used to authenticate with the remote service.

            - `client_secret: string`

              Client secret of the Access service token used to authenticate with the remote service.

            - `scheme: "access_service_token"`

              The authentication scheme to use when making SCIM requests to this application.

              - `"access_service_token"`

      - `deactivate_on_delete: optional boolean`

        If false, propagates DELETE requests to the target application for SCIM resources. If true, sets 'active' to false on the SCIM resource. Note: Some targets do not support DELETE operations.

      - `enabled: optional boolean`

        Whether SCIM provisioning is turned on for this application.

      - `mappings: optional array of SCIMConfigMapping`

        A list of mappings to apply to SCIM resources before provisioning them in this application. These can transform or filter the resources to be provisioned.

        - `schema: string`

          Which SCIM resource type this mapping applies to.

        - `enabled: optional boolean`

          Whether or not this mapping is enabled.

        - `filter: optional string`

          A [SCIM filter expression](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2) that matches resources that should be provisioned to this application.

        - `operations: optional object { create, delete, update }`

          Whether or not this mapping applies to creates, updates, or deletes.

        - `strictness: optional "strict" or "passthrough"`

          The level of adherence to outbound resource schemas when provisioning to this mapping. ‘Strict’ removes unknown values, while ‘passthrough’ passes unknown values to the target.

        - `transform_jsonata: optional string`

          A [JSONata](https://jsonata.org/) expression that transforms the resource before provisioning it in the application.

    - `tags: optional array of string`

      The tags you want assigned to an application. Tags are used to filter applications in the App Launcher dashboard.

    - `type: optional ApplicationType`

      The application type.

  - `BrowserSSHApplication object { domain, type, id, 31 more }`

    - `domain: string`

      The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.

    - `type: "self_hosted" or "saas" or "ssh" or 11 more`

      The application type.

      - `"self_hosted"`

      - `"saas"`

      - `"ssh"`

      - `"vnc"`

      - `"app_launcher"`

      - `"warp"`

      - `"biso"`

      - `"bookmark"`

      - `"dash_sso"`

      - `"infrastructure"`

      - `"rdp"`

      - `"mcp"`

      - `"mcp_portal"`

      - `"proxy_endpoint"`

    - `id: optional string`

      UUID.

    - `allow_authenticate_via_warp: optional boolean`

      When set to true, users can authenticate to this application using their WARP session.  When set to false this application will always require direct IdP authentication. This setting always overrides the organization setting for WARP authentication.

    - `allow_iframe: optional boolean`

      Enables loading application content in an iFrame.

    - `allowed_idps: optional array of AllowedIdPs`

      The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.

    - `app_launcher_visible: optional boolean`

      Displays the application in the App Launcher.

    - `aud: optional string`

      Audience tag.

    - `auto_redirect_to_identity: optional boolean`

      When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.

    - `cors_headers: optional CORSHeaders`

    - `custom_deny_message: optional string`

      The custom error message shown to a user when they are denied access to the application.

    - `custom_deny_url: optional string`

      The custom URL a user is redirected to when they are denied access to the application when failing identity-based rules.

    - `custom_non_identity_deny_url: optional string`

      The custom URL a user is redirected to when they are denied access to the application when failing non-identity rules.

    - `custom_pages: optional array of string`

      The custom pages that will be displayed when applicable for this application

    - `destinations: optional array of object { type, uri }  or object { cidr, hostname, l4_protocol, 3 more }  or object { mcp_server_id, type }  or 4 more`

      List of destinations secured by Access. This supersedes `self_hosted_domains` to allow for more flexibility in defining different types of domains. If `destinations` are provided, then `self_hosted_domains` will be ignored.

      - `PublicDestination object { type, uri }`

        A public hostname that Access will secure. Public destinations support sub-domain and path. Wildcard '*' can be used in the definition.

        - `type: optional "public"`

          - `"public"`

        - `uri: optional string`

          The URI of the destination. Public destinations' URIs can include a domain and path with [wildcards](https://developers.cloudflare.com/cloudflare-one/policies/access/app-paths/).

      - `PrivateDestination object { cidr, hostname, l4_protocol, 3 more }`

        - `cidr: optional string`

          The CIDR range of the destination. Single IPs will be computed as /32.

        - `hostname: optional string`

          The hostname of the destination. Matches a valid SNI served by an HTTPS origin.

        - `l4_protocol: optional "tcp" or "udp"`

          The L4 protocol of the destination. When omitted, both UDP and TCP traffic will match.

          - `"tcp"`

          - `"udp"`

        - `port_range: optional string`

          The port range of the destination. Can be a single port or a range of ports. When omitted, all ports will match.

        - `type: optional "private"`

          - `"private"`

        - `vnet_id: optional string`

          The VNET ID to match the destination. When omitted, all VNETs will match.

      - `ViaMcpServerPortalDestination object { mcp_server_id, type }`

        A MCP server id configured in ai-controls. Access will secure the MCP server if accessed through a MCP portal.

        - `mcp_server_id: optional string`

          The MCP server id configured in ai-controls.

        - `type: optional "via_mcp_server_portal"`

          - `"via_mcp_server_portal"`

      - `WorkerDestination object { type, worker_id }`

        A specific Cloudflare Worker that Access will secure. All requests routed to the specified Worker, including its preview deployments, will be protected. The `preview_worker` and `public` destination types takes precedence, so you can create separate applications to override the policies for the Worker's previews or specific paths.

        - `type: "worker"`

          - `"worker"`

        - `worker_id: string`

          The ID of the Cloudflare Worker to protect with Access.

      - `PreviewWorkerDestination object { type, worker_id }`

        A specific Cloudflare Worker whose preview deployments Access will secure. Only requests routed to the preview deployments of the specified Worker will be protected. The `public` destination type takes precedence, so you can create separate applications to override the policies for specific paths.

        - `type: "preview_worker"`

          - `"preview_worker"`

        - `worker_id: string`

          The ID of the Cloudflare Worker whose preview deployments to protect with Access.

      - `AllWorkersDestination object { type }`

        Protects all Cloudflare Workers on the account with Access, including their preview deployments. At most one destination of this type can exist per account. The `worker`, `preview_worker`, `all_preview_workers`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

        - `type: "all_workers"`

          - `"all_workers"`

      - `AllPreviewWorkersDestination object { type }`

        Protects the preview deployments of all Cloudflare Workers on the account with Access. At most one destination of this type can exist per account. The `worker`, `preview_worker`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

        - `type: "all_preview_workers"`

          - `"all_preview_workers"`

    - `eager_redirect_cookie_setting: optional boolean`

      Preemptively sets the Access session cookie on every hostname in a multi-hostname self-hosted application during the initial redirect chain, rather than setting it lazily on first visit. Defaults to true. Set to false to disable the eager redirect cookie behavior.

    - `enable_binding_cookie: optional boolean`

      Enables the binding cookie, which increases security against compromised authorization tokens and CSRF attacks.

    - `http_only_cookie_attribute: optional boolean`

      Enables the HttpOnly cookie attribute, which increases security against XSS attacks.

    - `logo_url: optional string`

      The image URL for the logo shown in the App Launcher dashboard.

    - `mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }`

      Configures multi-factor authentication (MFA) settings.

      - `allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"`

        Lists the MFA methods that users can authenticate with.

        - `"totp"`

        - `"biometrics"`

        - `"security_key"`

      - `mfa_disabled: optional boolean`

        Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

      - `session_duration: optional string`

        Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

    - `name: optional string`

      The name of the application.

    - `oauth_configuration: optional object { dynamic_client_registration, enabled, grant }`

      **Beta:** Optional configuration for managing an OAuth authorization flow controlled by Access. When set, Access will act as the OAuth authorization server for this application. Only compatible with OAuth clients that support [RFC 8707](https://datatracker.ietf.org/doc/html/rfc8707) (Resource Indicators for OAuth 2.0). This feature is currently in beta.

      - `dynamic_client_registration: optional object { allow_any_on_localhost, allow_any_on_loopback, allowed_uris, enabled }`

        Settings for OAuth dynamic client registration.

        - `allow_any_on_localhost: optional boolean`

          Allows any client with redirect URIs on localhost.

        - `allow_any_on_loopback: optional boolean`

          Allows any client with redirect URIs on 127.0.0.1.

        - `allowed_uris: optional array of string`

          The URIs that are allowed as redirect URIs for dynamically registered clients. Must use the `https` protocol. Paths may end in `/*` to match all sub-paths.

        - `enabled: optional boolean`

          Whether dynamic client registration is enabled.

      - `enabled: optional boolean`

        Whether the OAuth configuration is enabled for this application. When set to `false`, Access will not handle OAuth for this application. Defaults to `true` if omitted.

      - `grant: optional object { access_token_lifetime, session_duration }`

        Settings for OAuth grant behavior.

        - `access_token_lifetime: optional string`

          The lifetime of the access token. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

        - `session_duration: optional string`

          The duration of the OAuth session. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

    - `options_preflight_bypass: optional boolean`

      Allows options preflight requests to bypass Access authentication and go directly to the origin. Cannot turn on if cors_headers is set.

    - `path_cookie_attribute: optional boolean`

      Enables cookie paths to scope an application's JWT to the application path. If disabled, the JWT will scope to the hostname by default

    - `policies: optional array of object { id, approval_groups, approval_required, 14 more }`

      - `id: optional string`

        The UUID of the policy

      - `approval_groups: optional array of ApprovalGroup`

        Administrators who can approve a temporary authentication request.

        - `approvals_needed: number`

          The number of approvals needed to obtain access.

        - `email_addresses: optional array of string`

          A list of emails that can approve the access request.

        - `email_list_uuid: optional string`

          The UUID of an re-usable email list.

      - `approval_required: optional boolean`

        Requires the user to request access from an administrator at the start of each session.

      - `connection_rules: optional object { rdp }`

        The rules that define how users may connect to targets secured by your application.

        - `rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }`

          The RDP-specific rules that define clipboard behavior for RDP connections.

          - `allowed_clipboard_local_to_remote_formats: optional array of "text"`

            Clipboard formats allowed when copying from local machine to remote RDP session.

            - `"text"`

          - `allowed_clipboard_remote_to_local_formats: optional array of "text"`

            Clipboard formats allowed when copying from remote RDP session to local machine.

            - `"text"`

      - `created_at: optional string`

      - `decision: optional Decision`

        The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

      - `exclude: optional array of AccessRule`

        Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `include: optional array of AccessRule`

        Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `isolation_required: optional boolean`

        Require this application to be served in an isolated browser for users matching this policy. 'Client Web Isolation' must be on for the account in order to use this feature.

      - `mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }`

        Configures multi-factor authentication (MFA) settings.

        - `allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"`

          Lists the MFA methods that users can authenticate with.

          - `"totp"`

          - `"biometrics"`

          - `"security_key"`

        - `mfa_disabled: optional boolean`

          Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

        - `session_duration: optional string`

          Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

      - `name: optional string`

        The name of the Access policy.

      - `precedence: optional number`

        The order of execution for this policy. Must be unique for each policy within an app.

      - `purpose_justification_prompt: optional string`

        A custom message that will appear on the purpose justification screen.

      - `purpose_justification_required: optional boolean`

        Require users to enter a justification when they log in to the application.

      - `require: optional array of AccessRule`

        Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `session_duration: optional string`

        The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

      - `updated_at: optional string`

    - `read_service_tokens_from_header: optional string`

      Allows matching Access Service Tokens passed HTTP in a single header with this name.
      This works as an alternative to the (CF-Access-Client-Id, CF-Access-Client-Secret) pair of headers.
      The header value will be interpreted as a json object similar to:
      {
      "cf-access-client-id": "88bf3b6d86161464f6509f7219099e57.access.example.com",
      "cf-access-client-secret": "bdd31cbc4dec990953e39163fbbb194c93313ca9f0a6e420346af9d326b1d2a5"
      }

    - `same_site_cookie_attribute: optional string`

      Sets the SameSite cookie setting, which provides increased security against CSRF attacks.

    - `scim_config: optional object { idp_uid, remote_uri, authentication, 3 more }`

      Configuration for provisioning to this application via SCIM. This is currently in closed beta.

      - `idp_uid: string`

        The UID of the IdP to use as the source for SCIM resources to provision to this application.

      - `remote_uri: string`

        The base URI for the application's SCIM-compatible API.

      - `authentication: optional SCIMConfigAuthenticationHTTPBasic or SCIMConfigAuthenticationOAuthBearerToken or SCIMConfigAuthenticationOauth2 or 2 more`

        Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

        - `SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }`

          Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

        - `SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }`

          Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

        - `SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }`

          Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

        - `AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }`

          Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

          - `client_id: string`

            Client ID of the Access service token used to authenticate with the remote service.

          - `client_secret: string`

            Client secret of the Access service token used to authenticate with the remote service.

          - `scheme: "access_service_token"`

            The authentication scheme to use when making SCIM requests to this application.

            - `"access_service_token"`

        - `AccessSCIMConfigMultiAuthentication = array of SCIMConfigAuthenticationHTTPBasic or SCIMConfigAuthenticationOAuthBearerToken or SCIMConfigAuthenticationOauth2 or object { client_id, client_secret, scheme }`

          Multiple authentication schemes

          - `SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }`

            Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

          - `SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }`

            Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

          - `SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }`

            Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

          - `AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }`

            Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

            - `client_id: string`

              Client ID of the Access service token used to authenticate with the remote service.

            - `client_secret: string`

              Client secret of the Access service token used to authenticate with the remote service.

            - `scheme: "access_service_token"`

              The authentication scheme to use when making SCIM requests to this application.

              - `"access_service_token"`

      - `deactivate_on_delete: optional boolean`

        If false, propagates DELETE requests to the target application for SCIM resources. If true, sets 'active' to false on the SCIM resource. Note: Some targets do not support DELETE operations.

      - `enabled: optional boolean`

        Whether SCIM provisioning is turned on for this application.

      - `mappings: optional array of SCIMConfigMapping`

        A list of mappings to apply to SCIM resources before provisioning them in this application. These can transform or filter the resources to be provisioned.

        - `schema: string`

          Which SCIM resource type this mapping applies to.

        - `enabled: optional boolean`

          Whether or not this mapping is enabled.

        - `filter: optional string`

          A [SCIM filter expression](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2) that matches resources that should be provisioned to this application.

        - `operations: optional object { create, delete, update }`

          Whether or not this mapping applies to creates, updates, or deletes.

        - `strictness: optional "strict" or "passthrough"`

          The level of adherence to outbound resource schemas when provisioning to this mapping. ‘Strict’ removes unknown values, while ‘passthrough’ passes unknown values to the target.

        - `transform_jsonata: optional string`

          A [JSONata](https://jsonata.org/) expression that transforms the resource before provisioning it in the application.

    - `self_hosted_domains: optional array of SelfHostedDomains`

      List of public domains that Access will secure. This field is deprecated in favor of `destinations` and will be supported until **November 21, 2025.** If `destinations` are provided, then `self_hosted_domains` will be ignored.

    - `service_auth_401_redirect: optional boolean`

      Returns a 401 status code when the request is blocked by a Service Auth policy.

    - `session_duration: optional string`

      The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. Note: unsupported for infrastructure type applications.

    - `skip_interstitial: optional boolean`

      Enables automatic authentication through cloudflared.

    - `tags: optional array of string`

      The tags you want assigned to an application. Tags are used to filter applications in the App Launcher dashboard.

    - `use_clientless_isolation_app_launcher_url: optional boolean`

      Determines if users can access this application via a clientless browser isolation URL.
      This allows users to access private domains without connecting to Gateway. The option requires
      Clientless Browser Isolation to be set up with policies that allow users of this application.

  - `BrowserVNCApplication object { domain, type, id, 31 more }`

    - `domain: string`

      The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.

    - `type: "self_hosted" or "saas" or "ssh" or 11 more`

      The application type.

      - `"self_hosted"`

      - `"saas"`

      - `"ssh"`

      - `"vnc"`

      - `"app_launcher"`

      - `"warp"`

      - `"biso"`

      - `"bookmark"`

      - `"dash_sso"`

      - `"infrastructure"`

      - `"rdp"`

      - `"mcp"`

      - `"mcp_portal"`

      - `"proxy_endpoint"`

    - `id: optional string`

      UUID.

    - `allow_authenticate_via_warp: optional boolean`

      When set to true, users can authenticate to this application using their WARP session.  When set to false this application will always require direct IdP authentication. This setting always overrides the organization setting for WARP authentication.

    - `allow_iframe: optional boolean`

      Enables loading application content in an iFrame.

    - `allowed_idps: optional array of AllowedIdPs`

      The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.

    - `app_launcher_visible: optional boolean`

      Displays the application in the App Launcher.

    - `aud: optional string`

      Audience tag.

    - `auto_redirect_to_identity: optional boolean`

      When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.

    - `cors_headers: optional CORSHeaders`

    - `custom_deny_message: optional string`

      The custom error message shown to a user when they are denied access to the application.

    - `custom_deny_url: optional string`

      The custom URL a user is redirected to when they are denied access to the application when failing identity-based rules.

    - `custom_non_identity_deny_url: optional string`

      The custom URL a user is redirected to when they are denied access to the application when failing non-identity rules.

    - `custom_pages: optional array of string`

      The custom pages that will be displayed when applicable for this application

    - `destinations: optional array of object { type, uri }  or object { cidr, hostname, l4_protocol, 3 more }  or object { mcp_server_id, type }  or 4 more`

      List of destinations secured by Access. This supersedes `self_hosted_domains` to allow for more flexibility in defining different types of domains. If `destinations` are provided, then `self_hosted_domains` will be ignored.

      - `PublicDestination object { type, uri }`

        A public hostname that Access will secure. Public destinations support sub-domain and path. Wildcard '*' can be used in the definition.

        - `type: optional "public"`

          - `"public"`

        - `uri: optional string`

          The URI of the destination. Public destinations' URIs can include a domain and path with [wildcards](https://developers.cloudflare.com/cloudflare-one/policies/access/app-paths/).

      - `PrivateDestination object { cidr, hostname, l4_protocol, 3 more }`

        - `cidr: optional string`

          The CIDR range of the destination. Single IPs will be computed as /32.

        - `hostname: optional string`

          The hostname of the destination. Matches a valid SNI served by an HTTPS origin.

        - `l4_protocol: optional "tcp" or "udp"`

          The L4 protocol of the destination. When omitted, both UDP and TCP traffic will match.

          - `"tcp"`

          - `"udp"`

        - `port_range: optional string`

          The port range of the destination. Can be a single port or a range of ports. When omitted, all ports will match.

        - `type: optional "private"`

          - `"private"`

        - `vnet_id: optional string`

          The VNET ID to match the destination. When omitted, all VNETs will match.

      - `ViaMcpServerPortalDestination object { mcp_server_id, type }`

        A MCP server id configured in ai-controls. Access will secure the MCP server if accessed through a MCP portal.

        - `mcp_server_id: optional string`

          The MCP server id configured in ai-controls.

        - `type: optional "via_mcp_server_portal"`

          - `"via_mcp_server_portal"`

      - `WorkerDestination object { type, worker_id }`

        A specific Cloudflare Worker that Access will secure. All requests routed to the specified Worker, including its preview deployments, will be protected. The `preview_worker` and `public` destination types takes precedence, so you can create separate applications to override the policies for the Worker's previews or specific paths.

        - `type: "worker"`

          - `"worker"`

        - `worker_id: string`

          The ID of the Cloudflare Worker to protect with Access.

      - `PreviewWorkerDestination object { type, worker_id }`

        A specific Cloudflare Worker whose preview deployments Access will secure. Only requests routed to the preview deployments of the specified Worker will be protected. The `public` destination type takes precedence, so you can create separate applications to override the policies for specific paths.

        - `type: "preview_worker"`

          - `"preview_worker"`

        - `worker_id: string`

          The ID of the Cloudflare Worker whose preview deployments to protect with Access.

      - `AllWorkersDestination object { type }`

        Protects all Cloudflare Workers on the account with Access, including their preview deployments. At most one destination of this type can exist per account. The `worker`, `preview_worker`, `all_preview_workers`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

        - `type: "all_workers"`

          - `"all_workers"`

      - `AllPreviewWorkersDestination object { type }`

        Protects the preview deployments of all Cloudflare Workers on the account with Access. At most one destination of this type can exist per account. The `worker`, `preview_worker`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

        - `type: "all_preview_workers"`

          - `"all_preview_workers"`

    - `eager_redirect_cookie_setting: optional boolean`

      Preemptively sets the Access session cookie on every hostname in a multi-hostname self-hosted application during the initial redirect chain, rather than setting it lazily on first visit. Defaults to true. Set to false to disable the eager redirect cookie behavior.

    - `enable_binding_cookie: optional boolean`

      Enables the binding cookie, which increases security against compromised authorization tokens and CSRF attacks.

    - `http_only_cookie_attribute: optional boolean`

      Enables the HttpOnly cookie attribute, which increases security against XSS attacks.

    - `logo_url: optional string`

      The image URL for the logo shown in the App Launcher dashboard.

    - `mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }`

      Configures multi-factor authentication (MFA) settings.

      - `allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"`

        Lists the MFA methods that users can authenticate with.

        - `"totp"`

        - `"biometrics"`

        - `"security_key"`

      - `mfa_disabled: optional boolean`

        Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

      - `session_duration: optional string`

        Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

    - `name: optional string`

      The name of the application.

    - `oauth_configuration: optional object { dynamic_client_registration, enabled, grant }`

      **Beta:** Optional configuration for managing an OAuth authorization flow controlled by Access. When set, Access will act as the OAuth authorization server for this application. Only compatible with OAuth clients that support [RFC 8707](https://datatracker.ietf.org/doc/html/rfc8707) (Resource Indicators for OAuth 2.0). This feature is currently in beta.

      - `dynamic_client_registration: optional object { allow_any_on_localhost, allow_any_on_loopback, allowed_uris, enabled }`

        Settings for OAuth dynamic client registration.

        - `allow_any_on_localhost: optional boolean`

          Allows any client with redirect URIs on localhost.

        - `allow_any_on_loopback: optional boolean`

          Allows any client with redirect URIs on 127.0.0.1.

        - `allowed_uris: optional array of string`

          The URIs that are allowed as redirect URIs for dynamically registered clients. Must use the `https` protocol. Paths may end in `/*` to match all sub-paths.

        - `enabled: optional boolean`

          Whether dynamic client registration is enabled.

      - `enabled: optional boolean`

        Whether the OAuth configuration is enabled for this application. When set to `false`, Access will not handle OAuth for this application. Defaults to `true` if omitted.

      - `grant: optional object { access_token_lifetime, session_duration }`

        Settings for OAuth grant behavior.

        - `access_token_lifetime: optional string`

          The lifetime of the access token. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

        - `session_duration: optional string`

          The duration of the OAuth session. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

    - `options_preflight_bypass: optional boolean`

      Allows options preflight requests to bypass Access authentication and go directly to the origin. Cannot turn on if cors_headers is set.

    - `path_cookie_attribute: optional boolean`

      Enables cookie paths to scope an application's JWT to the application path. If disabled, the JWT will scope to the hostname by default

    - `policies: optional array of object { id, approval_groups, approval_required, 14 more }`

      - `id: optional string`

        The UUID of the policy

      - `approval_groups: optional array of ApprovalGroup`

        Administrators who can approve a temporary authentication request.

        - `approvals_needed: number`

          The number of approvals needed to obtain access.

        - `email_addresses: optional array of string`

          A list of emails that can approve the access request.

        - `email_list_uuid: optional string`

          The UUID of an re-usable email list.

      - `approval_required: optional boolean`

        Requires the user to request access from an administrator at the start of each session.

      - `connection_rules: optional object { rdp }`

        The rules that define how users may connect to targets secured by your application.

        - `rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }`

          The RDP-specific rules that define clipboard behavior for RDP connections.

          - `allowed_clipboard_local_to_remote_formats: optional array of "text"`

            Clipboard formats allowed when copying from local machine to remote RDP session.

            - `"text"`

          - `allowed_clipboard_remote_to_local_formats: optional array of "text"`

            Clipboard formats allowed when copying from remote RDP session to local machine.

            - `"text"`

      - `created_at: optional string`

      - `decision: optional Decision`

        The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

      - `exclude: optional array of AccessRule`

        Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `include: optional array of AccessRule`

        Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `isolation_required: optional boolean`

        Require this application to be served in an isolated browser for users matching this policy. 'Client Web Isolation' must be on for the account in order to use this feature.

      - `mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }`

        Configures multi-factor authentication (MFA) settings.

        - `allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"`

          Lists the MFA methods that users can authenticate with.

          - `"totp"`

          - `"biometrics"`

          - `"security_key"`

        - `mfa_disabled: optional boolean`

          Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

        - `session_duration: optional string`

          Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

      - `name: optional string`

        The name of the Access policy.

      - `precedence: optional number`

        The order of execution for this policy. Must be unique for each policy within an app.

      - `purpose_justification_prompt: optional string`

        A custom message that will appear on the purpose justification screen.

      - `purpose_justification_required: optional boolean`

        Require users to enter a justification when they log in to the application.

      - `require: optional array of AccessRule`

        Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `session_duration: optional string`

        The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

      - `updated_at: optional string`

    - `read_service_tokens_from_header: optional string`

      Allows matching Access Service Tokens passed HTTP in a single header with this name.
      This works as an alternative to the (CF-Access-Client-Id, CF-Access-Client-Secret) pair of headers.
      The header value will be interpreted as a json object similar to:
      {
      "cf-access-client-id": "88bf3b6d86161464f6509f7219099e57.access.example.com",
      "cf-access-client-secret": "bdd31cbc4dec990953e39163fbbb194c93313ca9f0a6e420346af9d326b1d2a5"
      }

    - `same_site_cookie_attribute: optional string`

      Sets the SameSite cookie setting, which provides increased security against CSRF attacks.

    - `scim_config: optional object { idp_uid, remote_uri, authentication, 3 more }`

      Configuration for provisioning to this application via SCIM. This is currently in closed beta.

      - `idp_uid: string`

        The UID of the IdP to use as the source for SCIM resources to provision to this application.

      - `remote_uri: string`

        The base URI for the application's SCIM-compatible API.

      - `authentication: optional SCIMConfigAuthenticationHTTPBasic or SCIMConfigAuthenticationOAuthBearerToken or SCIMConfigAuthenticationOauth2 or 2 more`

        Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

        - `SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }`

          Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

        - `SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }`

          Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

        - `SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }`

          Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

        - `AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }`

          Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

          - `client_id: string`

            Client ID of the Access service token used to authenticate with the remote service.

          - `client_secret: string`

            Client secret of the Access service token used to authenticate with the remote service.

          - `scheme: "access_service_token"`

            The authentication scheme to use when making SCIM requests to this application.

            - `"access_service_token"`

        - `AccessSCIMConfigMultiAuthentication = array of SCIMConfigAuthenticationHTTPBasic or SCIMConfigAuthenticationOAuthBearerToken or SCIMConfigAuthenticationOauth2 or object { client_id, client_secret, scheme }`

          Multiple authentication schemes

          - `SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }`

            Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

          - `SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }`

            Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

          - `SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }`

            Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

          - `AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }`

            Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

            - `client_id: string`

              Client ID of the Access service token used to authenticate with the remote service.

            - `client_secret: string`

              Client secret of the Access service token used to authenticate with the remote service.

            - `scheme: "access_service_token"`

              The authentication scheme to use when making SCIM requests to this application.

              - `"access_service_token"`

      - `deactivate_on_delete: optional boolean`

        If false, propagates DELETE requests to the target application for SCIM resources. If true, sets 'active' to false on the SCIM resource. Note: Some targets do not support DELETE operations.

      - `enabled: optional boolean`

        Whether SCIM provisioning is turned on for this application.

      - `mappings: optional array of SCIMConfigMapping`

        A list of mappings to apply to SCIM resources before provisioning them in this application. These can transform or filter the resources to be provisioned.

        - `schema: string`

          Which SCIM resource type this mapping applies to.

        - `enabled: optional boolean`

          Whether or not this mapping is enabled.

        - `filter: optional string`

          A [SCIM filter expression](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2) that matches resources that should be provisioned to this application.

        - `operations: optional object { create, delete, update }`

          Whether or not this mapping applies to creates, updates, or deletes.

        - `strictness: optional "strict" or "passthrough"`

          The level of adherence to outbound resource schemas when provisioning to this mapping. ‘Strict’ removes unknown values, while ‘passthrough’ passes unknown values to the target.

        - `transform_jsonata: optional string`

          A [JSONata](https://jsonata.org/) expression that transforms the resource before provisioning it in the application.

    - `self_hosted_domains: optional array of SelfHostedDomains`

      List of public domains that Access will secure. This field is deprecated in favor of `destinations` and will be supported until **November 21, 2025.** If `destinations` are provided, then `self_hosted_domains` will be ignored.

    - `service_auth_401_redirect: optional boolean`

      Returns a 401 status code when the request is blocked by a Service Auth policy.

    - `session_duration: optional string`

      The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. Note: unsupported for infrastructure type applications.

    - `skip_interstitial: optional boolean`

      Enables automatic authentication through cloudflared.

    - `tags: optional array of string`

      The tags you want assigned to an application. Tags are used to filter applications in the App Launcher dashboard.

    - `use_clientless_isolation_app_launcher_url: optional boolean`

      Determines if users can access this application via a clientless browser isolation URL.
      This allows users to access private domains without connecting to Gateway. The option requires
      Clientless Browser Isolation to be set up with policies that allow users of this application.

  - `AppLauncherApplication object { type, id, allowed_idps, 15 more }`

    - `type: "self_hosted" or "saas" or "ssh" or 11 more`

      The application type.

      - `"self_hosted"`

      - `"saas"`

      - `"ssh"`

      - `"vnc"`

      - `"app_launcher"`

      - `"warp"`

      - `"biso"`

      - `"bookmark"`

      - `"dash_sso"`

      - `"infrastructure"`

      - `"rdp"`

      - `"mcp"`

      - `"mcp_portal"`

      - `"proxy_endpoint"`

    - `id: optional string`

      UUID.

    - `allowed_idps: optional array of AllowedIdPs`

      The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.

    - `app_launcher_logo_url: optional string`

      The image URL of the logo shown in the App Launcher header.

    - `aud: optional string`

      Audience tag.

    - `auto_redirect_to_identity: optional boolean`

      When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.

    - `bg_color: optional string`

      The background color of the App Launcher page.

    - `custom_deny_url: optional string`

      The custom URL a user is redirected to when they are denied access to the application when failing identity-based rules.

    - `custom_non_identity_deny_url: optional string`

      The custom URL a user is redirected to when they are denied access to the application when failing non-identity rules.

    - `custom_pages: optional array of string`

      The custom pages that will be displayed when applicable for this application

    - `domain: optional string`

      The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.

    - `footer_links: optional array of object { name, url }`

      The links in the App Launcher footer.

      - `name: string`

        The hypertext in the footer link.

      - `url: string`

        the hyperlink in the footer link.

    - `header_bg_color: optional string`

      The background color of the App Launcher header.

    - `landing_page_design: optional object { button_color, button_text_color, image_url, 2 more }`

      The design of the App Launcher landing page shown to users when they log in.

      - `button_color: optional string`

        The background color of the log in button on the landing page.

      - `button_text_color: optional string`

        The color of the text in the log in button on the landing page.

      - `image_url: optional string`

        The URL of the image shown on the landing page.

      - `message: optional string`

        The message shown on the landing page.

      - `title: optional string`

        The title shown on the landing page.

    - `name: optional string`

      The name of the application.

    - `policies: optional array of object { id, approval_groups, approval_required, 14 more }`

      - `id: optional string`

        The UUID of the policy

      - `approval_groups: optional array of ApprovalGroup`

        Administrators who can approve a temporary authentication request.

        - `approvals_needed: number`

          The number of approvals needed to obtain access.

        - `email_addresses: optional array of string`

          A list of emails that can approve the access request.

        - `email_list_uuid: optional string`

          The UUID of an re-usable email list.

      - `approval_required: optional boolean`

        Requires the user to request access from an administrator at the start of each session.

      - `connection_rules: optional object { rdp }`

        The rules that define how users may connect to targets secured by your application.

        - `rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }`

          The RDP-specific rules that define clipboard behavior for RDP connections.

          - `allowed_clipboard_local_to_remote_formats: optional array of "text"`

            Clipboard formats allowed when copying from local machine to remote RDP session.

            - `"text"`

          - `allowed_clipboard_remote_to_local_formats: optional array of "text"`

            Clipboard formats allowed when copying from remote RDP session to local machine.

            - `"text"`

      - `created_at: optional string`

      - `decision: optional Decision`

        The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

      - `exclude: optional array of AccessRule`

        Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `include: optional array of AccessRule`

        Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `isolation_required: optional boolean`

        Require this application to be served in an isolated browser for users matching this policy. 'Client Web Isolation' must be on for the account in order to use this feature.

      - `mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }`

        Configures multi-factor authentication (MFA) settings.

        - `allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"`

          Lists the MFA methods that users can authenticate with.

          - `"totp"`

          - `"biometrics"`

          - `"security_key"`

        - `mfa_disabled: optional boolean`

          Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

        - `session_duration: optional string`

          Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

      - `name: optional string`

        The name of the Access policy.

      - `precedence: optional number`

        The order of execution for this policy. Must be unique for each policy within an app.

      - `purpose_justification_prompt: optional string`

        A custom message that will appear on the purpose justification screen.

      - `purpose_justification_required: optional boolean`

        Require users to enter a justification when they log in to the application.

      - `require: optional array of AccessRule`

        Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `session_duration: optional string`

        The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

      - `updated_at: optional string`

    - `session_duration: optional string`

      The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. Note: unsupported for infrastructure type applications.

    - `skip_app_launcher_login_page: optional boolean`

      Determines when to skip the App Launcher landing page.

  - `DeviceEnrollmentPermissionsApplication object { type, id, allowed_idps, 9 more }`

    - `type: ApplicationType`

      The application type.

    - `id: optional string`

      UUID.

    - `allowed_idps: optional array of AllowedIdPs`

      The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.

    - `aud: optional string`

      Audience tag.

    - `auto_redirect_to_identity: optional boolean`

      When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.

    - `custom_deny_url: optional string`

      The custom URL a user is redirected to when they are denied access to the application when failing identity-based rules.

    - `custom_non_identity_deny_url: optional string`

      The custom URL a user is redirected to when they are denied access to the application when failing non-identity rules.

    - `custom_pages: optional array of string`

      The custom pages that will be displayed when applicable for this application

    - `domain: optional string`

      The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.

    - `name: optional string`

      The name of the application.

    - `policies: optional array of object { id, approval_groups, approval_required, 14 more }`

      - `id: optional string`

        The UUID of the policy

      - `approval_groups: optional array of ApprovalGroup`

        Administrators who can approve a temporary authentication request.

        - `approvals_needed: number`

          The number of approvals needed to obtain access.

        - `email_addresses: optional array of string`

          A list of emails that can approve the access request.

        - `email_list_uuid: optional string`

          The UUID of an re-usable email list.

      - `approval_required: optional boolean`

        Requires the user to request access from an administrator at the start of each session.

      - `connection_rules: optional object { rdp }`

        The rules that define how users may connect to targets secured by your application.

        - `rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }`

          The RDP-specific rules that define clipboard behavior for RDP connections.

          - `allowed_clipboard_local_to_remote_formats: optional array of "text"`

            Clipboard formats allowed when copying from local machine to remote RDP session.

            - `"text"`

          - `allowed_clipboard_remote_to_local_formats: optional array of "text"`

            Clipboard formats allowed when copying from remote RDP session to local machine.

            - `"text"`

      - `created_at: optional string`

      - `decision: optional Decision`

        The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

      - `exclude: optional array of AccessRule`

        Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `include: optional array of AccessRule`

        Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `isolation_required: optional boolean`

        Require this application to be served in an isolated browser for users matching this policy. 'Client Web Isolation' must be on for the account in order to use this feature.

      - `mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }`

        Configures multi-factor authentication (MFA) settings.

        - `allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"`

          Lists the MFA methods that users can authenticate with.

          - `"totp"`

          - `"biometrics"`

          - `"security_key"`

        - `mfa_disabled: optional boolean`

          Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

        - `session_duration: optional string`

          Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

      - `name: optional string`

        The name of the Access policy.

      - `precedence: optional number`

        The order of execution for this policy. Must be unique for each policy within an app.

      - `purpose_justification_prompt: optional string`

        A custom message that will appear on the purpose justification screen.

      - `purpose_justification_required: optional boolean`

        Require users to enter a justification when they log in to the application.

      - `require: optional array of AccessRule`

        Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `session_duration: optional string`

        The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

      - `updated_at: optional string`

    - `session_duration: optional string`

      The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. Note: unsupported for infrastructure type applications.

  - `BrowserIsolationPermissionsApplication object { type, id, allowed_idps, 9 more }`

    - `type: ApplicationType`

      The application type.

    - `id: optional string`

      UUID.

    - `allowed_idps: optional array of AllowedIdPs`

      The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.

    - `aud: optional string`

      Audience tag.

    - `auto_redirect_to_identity: optional boolean`

      When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.

    - `custom_deny_url: optional string`

      The custom URL a user is redirected to when they are denied access to the application when failing identity-based rules.

    - `custom_non_identity_deny_url: optional string`

      The custom URL a user is redirected to when they are denied access to the application when failing non-identity rules.

    - `custom_pages: optional array of string`

      The custom pages that will be displayed when applicable for this application

    - `domain: optional string`

      The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.

    - `name: optional string`

      The name of the application.

    - `policies: optional array of object { id, approval_groups, approval_required, 14 more }`

      - `id: optional string`

        The UUID of the policy

      - `approval_groups: optional array of ApprovalGroup`

        Administrators who can approve a temporary authentication request.

        - `approvals_needed: number`

          The number of approvals needed to obtain access.

        - `email_addresses: optional array of string`

          A list of emails that can approve the access request.

        - `email_list_uuid: optional string`

          The UUID of an re-usable email list.

      - `approval_required: optional boolean`

        Requires the user to request access from an administrator at the start of each session.

      - `connection_rules: optional object { rdp }`

        The rules that define how users may connect to targets secured by your application.

        - `rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }`

          The RDP-specific rules that define clipboard behavior for RDP connections.

          - `allowed_clipboard_local_to_remote_formats: optional array of "text"`

            Clipboard formats allowed when copying from local machine to remote RDP session.

            - `"text"`

          - `allowed_clipboard_remote_to_local_formats: optional array of "text"`

            Clipboard formats allowed when copying from remote RDP session to local machine.

            - `"text"`

      - `created_at: optional string`

      - `decision: optional Decision`

        The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

      - `exclude: optional array of AccessRule`

        Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `include: optional array of AccessRule`

        Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `isolation_required: optional boolean`

        Require this application to be served in an isolated browser for users matching this policy. 'Client Web Isolation' must be on for the account in order to use this feature.

      - `mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }`

        Configures multi-factor authentication (MFA) settings.

        - `allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"`

          Lists the MFA methods that users can authenticate with.

          - `"totp"`

          - `"biometrics"`

          - `"security_key"`

        - `mfa_disabled: optional boolean`

          Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

        - `session_duration: optional string`

          Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

      - `name: optional string`

        The name of the Access policy.

      - `precedence: optional number`

        The order of execution for this policy. Must be unique for each policy within an app.

      - `purpose_justification_prompt: optional string`

        A custom message that will appear on the purpose justification screen.

      - `purpose_justification_required: optional boolean`

        Require users to enter a justification when they log in to the application.

      - `require: optional array of AccessRule`

        Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `session_duration: optional string`

        The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

      - `updated_at: optional string`

    - `session_duration: optional string`

      The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. Note: unsupported for infrastructure type applications.

  - `GatewayIdentityProxyEndpointApplication object { type, id, allowed_idps, 9 more }`

    - `type: ApplicationType`

      The application type.

    - `id: optional string`

      UUID.

    - `allowed_idps: optional array of AllowedIdPs`

      The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.

    - `aud: optional string`

      Audience tag.

    - `auto_redirect_to_identity: optional boolean`

      When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.

    - `custom_deny_url: optional string`

      The custom URL a user is redirected to when they are denied access to the application when failing identity-based rules.

    - `custom_non_identity_deny_url: optional string`

      The custom URL a user is redirected to when they are denied access to the application when failing non-identity rules.

    - `custom_pages: optional array of string`

      The custom pages that will be displayed when applicable for this application

    - `domain: optional string`

      The proxy endpoint domain in the format: 10 alphanumeric characters followed by .proxy.cloudflare-gateway.com

    - `name: optional string`

      The name of the application.

    - `policies: optional array of object { id, approval_groups, approval_required, 14 more }`

      - `id: optional string`

        The UUID of the policy

      - `approval_groups: optional array of ApprovalGroup`

        Administrators who can approve a temporary authentication request.

        - `approvals_needed: number`

          The number of approvals needed to obtain access.

        - `email_addresses: optional array of string`

          A list of emails that can approve the access request.

        - `email_list_uuid: optional string`

          The UUID of an re-usable email list.

      - `approval_required: optional boolean`

        Requires the user to request access from an administrator at the start of each session.

      - `connection_rules: optional object { rdp }`

        The rules that define how users may connect to targets secured by your application.

        - `rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }`

          The RDP-specific rules that define clipboard behavior for RDP connections.

          - `allowed_clipboard_local_to_remote_formats: optional array of "text"`

            Clipboard formats allowed when copying from local machine to remote RDP session.

            - `"text"`

          - `allowed_clipboard_remote_to_local_formats: optional array of "text"`

            Clipboard formats allowed when copying from remote RDP session to local machine.

            - `"text"`

      - `created_at: optional string`

      - `decision: optional Decision`

        The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

      - `exclude: optional array of AccessRule`

        Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `include: optional array of AccessRule`

        Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `isolation_required: optional boolean`

        Require this application to be served in an isolated browser for users matching this policy. 'Client Web Isolation' must be on for the account in order to use this feature.

      - `mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }`

        Configures multi-factor authentication (MFA) settings.

        - `allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"`

          Lists the MFA methods that users can authenticate with.

          - `"totp"`

          - `"biometrics"`

          - `"security_key"`

        - `mfa_disabled: optional boolean`

          Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

        - `session_duration: optional string`

          Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

      - `name: optional string`

        The name of the Access policy.

      - `precedence: optional number`

        The order of execution for this policy. Must be unique for each policy within an app.

      - `purpose_justification_prompt: optional string`

        A custom message that will appear on the purpose justification screen.

      - `purpose_justification_required: optional boolean`

        Require users to enter a justification when they log in to the application.

      - `require: optional array of AccessRule`

        Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `session_duration: optional string`

        The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

      - `updated_at: optional string`

    - `session_duration: optional string`

      The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. Note: unsupported for infrastructure type applications.

  - `BookmarkApplication object { id, app_launcher_visible, aud, 6 more }`

    - `id: optional string`

      UUID.

    - `app_launcher_visible: optional boolean`

      Displays the application in the App Launcher.

    - `aud: optional string`

      Audience tag.

    - `domain: optional string`

      The URL or domain of the bookmark.

    - `logo_url: optional string`

      The image URL for the logo shown in the App Launcher dashboard.

    - `name: optional string`

      The name of the application.

    - `policies: optional array of object { id, approval_groups, approval_required, 14 more }`

      - `id: optional string`

        The UUID of the policy

      - `approval_groups: optional array of ApprovalGroup`

        Administrators who can approve a temporary authentication request.

        - `approvals_needed: number`

          The number of approvals needed to obtain access.

        - `email_addresses: optional array of string`

          A list of emails that can approve the access request.

        - `email_list_uuid: optional string`

          The UUID of an re-usable email list.

      - `approval_required: optional boolean`

        Requires the user to request access from an administrator at the start of each session.

      - `connection_rules: optional object { rdp }`

        The rules that define how users may connect to targets secured by your application.

        - `rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }`

          The RDP-specific rules that define clipboard behavior for RDP connections.

          - `allowed_clipboard_local_to_remote_formats: optional array of "text"`

            Clipboard formats allowed when copying from local machine to remote RDP session.

            - `"text"`

          - `allowed_clipboard_remote_to_local_formats: optional array of "text"`

            Clipboard formats allowed when copying from remote RDP session to local machine.

            - `"text"`

      - `created_at: optional string`

      - `decision: optional Decision`

        The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

      - `exclude: optional array of AccessRule`

        Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `include: optional array of AccessRule`

        Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `isolation_required: optional boolean`

        Require this application to be served in an isolated browser for users matching this policy. 'Client Web Isolation' must be on for the account in order to use this feature.

      - `mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }`

        Configures multi-factor authentication (MFA) settings.

        - `allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"`

          Lists the MFA methods that users can authenticate with.

          - `"totp"`

          - `"biometrics"`

          - `"security_key"`

        - `mfa_disabled: optional boolean`

          Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

        - `session_duration: optional string`

          Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

      - `name: optional string`

        The name of the Access policy.

      - `precedence: optional number`

        The order of execution for this policy. Must be unique for each policy within an app.

      - `purpose_justification_prompt: optional string`

        A custom message that will appear on the purpose justification screen.

      - `purpose_justification_required: optional boolean`

        Require users to enter a justification when they log in to the application.

      - `require: optional array of AccessRule`

        Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `session_duration: optional string`

        The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

      - `updated_at: optional string`

    - `tags: optional array of string`

      The tags you want assigned to an application. Tags are used to filter applications in the App Launcher dashboard.

    - `type: optional ApplicationType`

      The application type.

  - `InfrastructureApplication object { target_criteria, type, id, 3 more }`

    - `target_criteria: array of object { port, protocol, target_attributes }`

      - `port: number`

        The port that the targets use for the chosen communication protocol. A port cannot be assigned to multiple protocols.

      - `protocol: "SSH"`

        The communication protocol your application secures.

        - `"SSH"`

      - `target_attributes: map[array of string]`

        Contains a map of target attribute keys to target attribute values.

    - `type: ApplicationType`

      The application type.

    - `id: optional string`

      UUID.

    - `aud: optional string`

      Audience tag.

    - `name: optional string`

      The name of the application.

    - `policies: optional array of object { id, connection_rules, created_at, 7 more }`

      - `id: optional string`

        The UUID of the policy

      - `connection_rules: optional object { ssh }`

        The rules that define how users may connect to the targets secured by your application.

        - `ssh: optional object { usernames, allow_email_alias }`

          The SSH-specific rules that define how users may connect to the targets secured by your application.

          - `usernames: array of string`

            Contains the Unix usernames that may be used when connecting over SSH.

          - `allow_email_alias: optional boolean`

            Enables using Identity Provider email alias as SSH username.

      - `created_at: optional string`

      - `decision: optional Decision`

        The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

      - `exclude: optional array of AccessRule`

        Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `include: optional array of AccessRule`

        Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }`

        Configures multi-factor authentication (MFA) settings for infrastructure applications.

        - `allowed_authenticators: optional array of "piv_key"`

          Lists the MFA methods that users can authenticate with. For infrastructure applications, only `piv_key` is supported.

          - `"piv_key"`

        - `mfa_disabled: optional boolean`

          Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

        - `session_duration: optional string`

          Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples: `5m` or `24h`.

      - `name: optional string`

        The name of the Access policy.

      - `require: optional array of AccessRule`

        Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `updated_at: optional string`

  - `BrowserRDPApplication object { domain, target_criteria, type, 32 more }`

    - `domain: string`

      The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.

    - `target_criteria: array of object { port, protocol, target_attributes }`

      - `port: number`

        The port that the targets use for the chosen communication protocol. A port cannot be assigned to multiple protocols.

      - `protocol: "RDP"`

        The communication protocol your application secures.

        - `"RDP"`

      - `target_attributes: map[array of string]`

        Contains a map of target attribute keys to target attribute values.

    - `type: ApplicationType`

      The application type.

    - `id: optional string`

      UUID.

    - `allow_authenticate_via_warp: optional boolean`

      When set to true, users can authenticate to this application using their WARP session.  When set to false this application will always require direct IdP authentication. This setting always overrides the organization setting for WARP authentication.

    - `allow_iframe: optional boolean`

      Enables loading application content in an iFrame.

    - `allowed_idps: optional array of AllowedIdPs`

      The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.

    - `app_launcher_visible: optional boolean`

      Displays the application in the App Launcher.

    - `aud: optional string`

      Audience tag.

    - `auto_redirect_to_identity: optional boolean`

      When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.

    - `cors_headers: optional CORSHeaders`

    - `custom_deny_message: optional string`

      The custom error message shown to a user when they are denied access to the application.

    - `custom_deny_url: optional string`

      The custom URL a user is redirected to when they are denied access to the application when failing identity-based rules.

    - `custom_non_identity_deny_url: optional string`

      The custom URL a user is redirected to when they are denied access to the application when failing non-identity rules.

    - `custom_pages: optional array of string`

      The custom pages that will be displayed when applicable for this application

    - `destinations: optional array of object { type, uri }  or object { cidr, hostname, l4_protocol, 3 more }  or object { mcp_server_id, type }  or 4 more`

      List of destinations secured by Access. This supersedes `self_hosted_domains` to allow for more flexibility in defining different types of domains. If `destinations` are provided, then `self_hosted_domains` will be ignored.

      - `PublicDestination object { type, uri }`

        A public hostname that Access will secure. Public destinations support sub-domain and path. Wildcard '*' can be used in the definition.

        - `type: optional "public"`

          - `"public"`

        - `uri: optional string`

          The URI of the destination. Public destinations' URIs can include a domain and path with [wildcards](https://developers.cloudflare.com/cloudflare-one/policies/access/app-paths/).

      - `PrivateDestination object { cidr, hostname, l4_protocol, 3 more }`

        - `cidr: optional string`

          The CIDR range of the destination. Single IPs will be computed as /32.

        - `hostname: optional string`

          The hostname of the destination. Matches a valid SNI served by an HTTPS origin.

        - `l4_protocol: optional "tcp" or "udp"`

          The L4 protocol of the destination. When omitted, both UDP and TCP traffic will match.

          - `"tcp"`

          - `"udp"`

        - `port_range: optional string`

          The port range of the destination. Can be a single port or a range of ports. When omitted, all ports will match.

        - `type: optional "private"`

          - `"private"`

        - `vnet_id: optional string`

          The VNET ID to match the destination. When omitted, all VNETs will match.

      - `ViaMcpServerPortalDestination object { mcp_server_id, type }`

        A MCP server id configured in ai-controls. Access will secure the MCP server if accessed through a MCP portal.

        - `mcp_server_id: optional string`

          The MCP server id configured in ai-controls.

        - `type: optional "via_mcp_server_portal"`

          - `"via_mcp_server_portal"`

      - `WorkerDestination object { type, worker_id }`

        A specific Cloudflare Worker that Access will secure. All requests routed to the specified Worker, including its preview deployments, will be protected. The `preview_worker` and `public` destination types takes precedence, so you can create separate applications to override the policies for the Worker's previews or specific paths.

        - `type: "worker"`

          - `"worker"`

        - `worker_id: string`

          The ID of the Cloudflare Worker to protect with Access.

      - `PreviewWorkerDestination object { type, worker_id }`

        A specific Cloudflare Worker whose preview deployments Access will secure. Only requests routed to the preview deployments of the specified Worker will be protected. The `public` destination type takes precedence, so you can create separate applications to override the policies for specific paths.

        - `type: "preview_worker"`

          - `"preview_worker"`

        - `worker_id: string`

          The ID of the Cloudflare Worker whose preview deployments to protect with Access.

      - `AllWorkersDestination object { type }`

        Protects all Cloudflare Workers on the account with Access, including their preview deployments. At most one destination of this type can exist per account. The `worker`, `preview_worker`, `all_preview_workers`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

        - `type: "all_workers"`

          - `"all_workers"`

      - `AllPreviewWorkersDestination object { type }`

        Protects the preview deployments of all Cloudflare Workers on the account with Access. At most one destination of this type can exist per account. The `worker`, `preview_worker`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

        - `type: "all_preview_workers"`

          - `"all_preview_workers"`

    - `eager_redirect_cookie_setting: optional boolean`

      Preemptively sets the Access session cookie on every hostname in a multi-hostname self-hosted application during the initial redirect chain, rather than setting it lazily on first visit. Defaults to true. Set to false to disable the eager redirect cookie behavior.

    - `enable_binding_cookie: optional boolean`

      Enables the binding cookie, which increases security against compromised authorization tokens and CSRF attacks.

    - `http_only_cookie_attribute: optional boolean`

      Enables the HttpOnly cookie attribute, which increases security against XSS attacks.

    - `logo_url: optional string`

      The image URL for the logo shown in the App Launcher dashboard.

    - `mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }`

      Configures multi-factor authentication (MFA) settings.

      - `allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"`

        Lists the MFA methods that users can authenticate with.

        - `"totp"`

        - `"biometrics"`

        - `"security_key"`

      - `mfa_disabled: optional boolean`

        Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

      - `session_duration: optional string`

        Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

    - `name: optional string`

      The name of the application.

    - `oauth_configuration: optional object { dynamic_client_registration, enabled, grant }`

      **Beta:** Optional configuration for managing an OAuth authorization flow controlled by Access. When set, Access will act as the OAuth authorization server for this application. Only compatible with OAuth clients that support [RFC 8707](https://datatracker.ietf.org/doc/html/rfc8707) (Resource Indicators for OAuth 2.0). This feature is currently in beta.

      - `dynamic_client_registration: optional object { allow_any_on_localhost, allow_any_on_loopback, allowed_uris, enabled }`

        Settings for OAuth dynamic client registration.

        - `allow_any_on_localhost: optional boolean`

          Allows any client with redirect URIs on localhost.

        - `allow_any_on_loopback: optional boolean`

          Allows any client with redirect URIs on 127.0.0.1.

        - `allowed_uris: optional array of string`

          The URIs that are allowed as redirect URIs for dynamically registered clients. Must use the `https` protocol. Paths may end in `/*` to match all sub-paths.

        - `enabled: optional boolean`

          Whether dynamic client registration is enabled.

      - `enabled: optional boolean`

        Whether the OAuth configuration is enabled for this application. When set to `false`, Access will not handle OAuth for this application. Defaults to `true` if omitted.

      - `grant: optional object { access_token_lifetime, session_duration }`

        Settings for OAuth grant behavior.

        - `access_token_lifetime: optional string`

          The lifetime of the access token. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

        - `session_duration: optional string`

          The duration of the OAuth session. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

    - `options_preflight_bypass: optional boolean`

      Allows options preflight requests to bypass Access authentication and go directly to the origin. Cannot turn on if cors_headers is set.

    - `path_cookie_attribute: optional boolean`

      Enables cookie paths to scope an application's JWT to the application path. If disabled, the JWT will scope to the hostname by default

    - `policies: optional array of object { id, approval_groups, approval_required, 14 more }`

      - `id: optional string`

        The UUID of the policy

      - `approval_groups: optional array of ApprovalGroup`

        Administrators who can approve a temporary authentication request.

        - `approvals_needed: number`

          The number of approvals needed to obtain access.

        - `email_addresses: optional array of string`

          A list of emails that can approve the access request.

        - `email_list_uuid: optional string`

          The UUID of an re-usable email list.

      - `approval_required: optional boolean`

        Requires the user to request access from an administrator at the start of each session.

      - `connection_rules: optional object { rdp }`

        The rules that define how users may connect to targets secured by your application.

        - `rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }`

          The RDP-specific rules that define clipboard behavior for RDP connections.

          - `allowed_clipboard_local_to_remote_formats: optional array of "text"`

            Clipboard formats allowed when copying from local machine to remote RDP session.

            - `"text"`

          - `allowed_clipboard_remote_to_local_formats: optional array of "text"`

            Clipboard formats allowed when copying from remote RDP session to local machine.

            - `"text"`

      - `created_at: optional string`

      - `decision: optional Decision`

        The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

      - `exclude: optional array of AccessRule`

        Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `include: optional array of AccessRule`

        Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `isolation_required: optional boolean`

        Require this application to be served in an isolated browser for users matching this policy. 'Client Web Isolation' must be on for the account in order to use this feature.

      - `mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }`

        Configures multi-factor authentication (MFA) settings.

        - `allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"`

          Lists the MFA methods that users can authenticate with.

          - `"totp"`

          - `"biometrics"`

          - `"security_key"`

        - `mfa_disabled: optional boolean`

          Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

        - `session_duration: optional string`

          Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

      - `name: optional string`

        The name of the Access policy.

      - `precedence: optional number`

        The order of execution for this policy. Must be unique for each policy within an app.

      - `purpose_justification_prompt: optional string`

        A custom message that will appear on the purpose justification screen.

      - `purpose_justification_required: optional boolean`

        Require users to enter a justification when they log in to the application.

      - `require: optional array of AccessRule`

        Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `session_duration: optional string`

        The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

      - `updated_at: optional string`

    - `read_service_tokens_from_header: optional string`

      Allows matching Access Service Tokens passed HTTP in a single header with this name.
      This works as an alternative to the (CF-Access-Client-Id, CF-Access-Client-Secret) pair of headers.
      The header value will be interpreted as a json object similar to:
      {
      "cf-access-client-id": "88bf3b6d86161464f6509f7219099e57.access.example.com",
      "cf-access-client-secret": "bdd31cbc4dec990953e39163fbbb194c93313ca9f0a6e420346af9d326b1d2a5"
      }

    - `same_site_cookie_attribute: optional string`

      Sets the SameSite cookie setting, which provides increased security against CSRF attacks.

    - `scim_config: optional object { idp_uid, remote_uri, authentication, 3 more }`

      Configuration for provisioning to this application via SCIM. This is currently in closed beta.

      - `idp_uid: string`

        The UID of the IdP to use as the source for SCIM resources to provision to this application.

      - `remote_uri: string`

        The base URI for the application's SCIM-compatible API.

      - `authentication: optional SCIMConfigAuthenticationHTTPBasic or SCIMConfigAuthenticationOAuthBearerToken or SCIMConfigAuthenticationOauth2 or 2 more`

        Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

        - `SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }`

          Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

        - `SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }`

          Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

        - `SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }`

          Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

        - `AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }`

          Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

          - `client_id: string`

            Client ID of the Access service token used to authenticate with the remote service.

          - `client_secret: string`

            Client secret of the Access service token used to authenticate with the remote service.

          - `scheme: "access_service_token"`

            The authentication scheme to use when making SCIM requests to this application.

            - `"access_service_token"`

        - `AccessSCIMConfigMultiAuthentication = array of SCIMConfigAuthenticationHTTPBasic or SCIMConfigAuthenticationOAuthBearerToken or SCIMConfigAuthenticationOauth2 or object { client_id, client_secret, scheme }`

          Multiple authentication schemes

          - `SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }`

            Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

          - `SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }`

            Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

          - `SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }`

            Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

          - `AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }`

            Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

            - `client_id: string`

              Client ID of the Access service token used to authenticate with the remote service.

            - `client_secret: string`

              Client secret of the Access service token used to authenticate with the remote service.

            - `scheme: "access_service_token"`

              The authentication scheme to use when making SCIM requests to this application.

              - `"access_service_token"`

      - `deactivate_on_delete: optional boolean`

        If false, propagates DELETE requests to the target application for SCIM resources. If true, sets 'active' to false on the SCIM resource. Note: Some targets do not support DELETE operations.

      - `enabled: optional boolean`

        Whether SCIM provisioning is turned on for this application.

      - `mappings: optional array of SCIMConfigMapping`

        A list of mappings to apply to SCIM resources before provisioning them in this application. These can transform or filter the resources to be provisioned.

        - `schema: string`

          Which SCIM resource type this mapping applies to.

        - `enabled: optional boolean`

          Whether or not this mapping is enabled.

        - `filter: optional string`

          A [SCIM filter expression](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2) that matches resources that should be provisioned to this application.

        - `operations: optional object { create, delete, update }`

          Whether or not this mapping applies to creates, updates, or deletes.

        - `strictness: optional "strict" or "passthrough"`

          The level of adherence to outbound resource schemas when provisioning to this mapping. ‘Strict’ removes unknown values, while ‘passthrough’ passes unknown values to the target.

        - `transform_jsonata: optional string`

          A [JSONata](https://jsonata.org/) expression that transforms the resource before provisioning it in the application.

    - `self_hosted_domains: optional array of SelfHostedDomains`

      List of public domains that Access will secure. This field is deprecated in favor of `destinations` and will be supported until **November 21, 2025.** If `destinations` are provided, then `self_hosted_domains` will be ignored.

    - `service_auth_401_redirect: optional boolean`

      Returns a 401 status code when the request is blocked by a Service Auth policy.

    - `session_duration: optional string`

      The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. Note: unsupported for infrastructure type applications.

    - `skip_interstitial: optional boolean`

      Enables automatic authentication through cloudflared.

    - `tags: optional array of string`

      The tags you want assigned to an application. Tags are used to filter applications in the App Launcher dashboard.

    - `use_clientless_isolation_app_launcher_url: optional boolean`

      Determines if users can access this application via a clientless browser isolation URL.
      This allows users to access private domains without connecting to Gateway. The option requires
      Clientless Browser Isolation to be set up with policies that allow users of this application.

  - `McpServerApplication object { type, id, allow_authenticate_via_warp, 18 more }`

    - `type: ApplicationType`

      The application type.

    - `id: optional string`

      UUID.

    - `allow_authenticate_via_warp: optional boolean`

      When set to true, users can authenticate to this application using their WARP session.  When set to false this application will always require direct IdP authentication. This setting always overrides the organization setting for WARP authentication.

    - `allowed_idps: optional array of AllowedIdPs`

      The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.

    - `aud: optional string`

      Audience tag.

    - `auto_redirect_to_identity: optional boolean`

      When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.

    - `custom_deny_message: optional string`

      The custom error message shown to a user when they are denied access to the application.

    - `custom_deny_url: optional string`

      The custom URL a user is redirected to when they are denied access to the application when failing identity-based rules.

    - `custom_non_identity_deny_url: optional string`

      The custom URL a user is redirected to when they are denied access to the application when failing non-identity rules.

    - `custom_pages: optional array of string`

      The custom pages that will be displayed when applicable for this application

    - `destinations: optional array of object { type, uri }  or object { cidr, hostname, l4_protocol, 3 more }  or object { mcp_server_id, type }  or 4 more`

      List of destinations secured by Access. This supersedes `self_hosted_domains` to allow for more flexibility in defining different types of domains. If `destinations` are provided, then `self_hosted_domains` will be ignored.

      - `PublicDestination object { type, uri }`

        A public hostname that Access will secure. Public destinations support sub-domain and path. Wildcard '*' can be used in the definition.

        - `type: optional "public"`

          - `"public"`

        - `uri: optional string`

          The URI of the destination. Public destinations' URIs can include a domain and path with [wildcards](https://developers.cloudflare.com/cloudflare-one/policies/access/app-paths/).

      - `PrivateDestination object { cidr, hostname, l4_protocol, 3 more }`

        - `cidr: optional string`

          The CIDR range of the destination. Single IPs will be computed as /32.

        - `hostname: optional string`

          The hostname of the destination. Matches a valid SNI served by an HTTPS origin.

        - `l4_protocol: optional "tcp" or "udp"`

          The L4 protocol of the destination. When omitted, both UDP and TCP traffic will match.

          - `"tcp"`

          - `"udp"`

        - `port_range: optional string`

          The port range of the destination. Can be a single port or a range of ports. When omitted, all ports will match.

        - `type: optional "private"`

          - `"private"`

        - `vnet_id: optional string`

          The VNET ID to match the destination. When omitted, all VNETs will match.

      - `ViaMcpServerPortalDestination object { mcp_server_id, type }`

        A MCP server id configured in ai-controls. Access will secure the MCP server if accessed through a MCP portal.

        - `mcp_server_id: optional string`

          The MCP server id configured in ai-controls.

        - `type: optional "via_mcp_server_portal"`

          - `"via_mcp_server_portal"`

      - `WorkerDestination object { type, worker_id }`

        A specific Cloudflare Worker that Access will secure. All requests routed to the specified Worker, including its preview deployments, will be protected. The `preview_worker` and `public` destination types takes precedence, so you can create separate applications to override the policies for the Worker's previews or specific paths.

        - `type: "worker"`

          - `"worker"`

        - `worker_id: string`

          The ID of the Cloudflare Worker to protect with Access.

      - `PreviewWorkerDestination object { type, worker_id }`

        A specific Cloudflare Worker whose preview deployments Access will secure. Only requests routed to the preview deployments of the specified Worker will be protected. The `public` destination type takes precedence, so you can create separate applications to override the policies for specific paths.

        - `type: "preview_worker"`

          - `"preview_worker"`

        - `worker_id: string`

          The ID of the Cloudflare Worker whose preview deployments to protect with Access.

      - `AllWorkersDestination object { type }`

        Protects all Cloudflare Workers on the account with Access, including their preview deployments. At most one destination of this type can exist per account. The `worker`, `preview_worker`, `all_preview_workers`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

        - `type: "all_workers"`

          - `"all_workers"`

      - `AllPreviewWorkersDestination object { type }`

        Protects the preview deployments of all Cloudflare Workers on the account with Access. At most one destination of this type can exist per account. The `worker`, `preview_worker`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

        - `type: "all_preview_workers"`

          - `"all_preview_workers"`

    - `http_only_cookie_attribute: optional boolean`

      Enables the HttpOnly cookie attribute, which increases security against XSS attacks.

    - `logo_url: optional string`

      The image URL for the logo shown in the App Launcher dashboard.

    - `name: optional string`

      The name of the application.

    - `oauth_configuration: optional object { dynamic_client_registration, enabled, grant }`

      **Beta:** Optional configuration for managing an OAuth authorization flow controlled by Access. When set, Access will act as the OAuth authorization server for this application. Only compatible with OAuth clients that support [RFC 8707](https://datatracker.ietf.org/doc/html/rfc8707) (Resource Indicators for OAuth 2.0). This feature is currently in beta.

      - `dynamic_client_registration: optional object { allow_any_on_localhost, allow_any_on_loopback, allowed_uris, enabled }`

        Settings for OAuth dynamic client registration.

        - `allow_any_on_localhost: optional boolean`

          Allows any client with redirect URIs on localhost.

        - `allow_any_on_loopback: optional boolean`

          Allows any client with redirect URIs on 127.0.0.1.

        - `allowed_uris: optional array of string`

          The URIs that are allowed as redirect URIs for dynamically registered clients. Must use the `https` protocol. Paths may end in `/*` to match all sub-paths.

        - `enabled: optional boolean`

          Whether dynamic client registration is enabled.

      - `enabled: optional boolean`

        Whether the OAuth configuration is enabled for this application. When set to `false`, Access will not handle OAuth for this application. Defaults to `true` if omitted.

      - `grant: optional object { access_token_lifetime, session_duration }`

        Settings for OAuth grant behavior.

        - `access_token_lifetime: optional string`

          The lifetime of the access token. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

        - `session_duration: optional string`

          The duration of the OAuth session. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

    - `options_preflight_bypass: optional boolean`

      Allows options preflight requests to bypass Access authentication and go directly to the origin. Cannot turn on if cors_headers is set.

    - `policies: optional array of object { id, approval_groups, approval_required, 14 more }`

      - `id: optional string`

        The UUID of the policy

      - `approval_groups: optional array of ApprovalGroup`

        Administrators who can approve a temporary authentication request.

        - `approvals_needed: number`

          The number of approvals needed to obtain access.

        - `email_addresses: optional array of string`

          A list of emails that can approve the access request.

        - `email_list_uuid: optional string`

          The UUID of an re-usable email list.

      - `approval_required: optional boolean`

        Requires the user to request access from an administrator at the start of each session.

      - `connection_rules: optional object { rdp }`

        The rules that define how users may connect to targets secured by your application.

        - `rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }`

          The RDP-specific rules that define clipboard behavior for RDP connections.

          - `allowed_clipboard_local_to_remote_formats: optional array of "text"`

            Clipboard formats allowed when copying from local machine to remote RDP session.

            - `"text"`

          - `allowed_clipboard_remote_to_local_formats: optional array of "text"`

            Clipboard formats allowed when copying from remote RDP session to local machine.

            - `"text"`

      - `created_at: optional string`

      - `decision: optional Decision`

        The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

      - `exclude: optional array of AccessRule`

        Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `include: optional array of AccessRule`

        Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `isolation_required: optional boolean`

        Require this application to be served in an isolated browser for users matching this policy. 'Client Web Isolation' must be on for the account in order to use this feature.

      - `mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }`

        Configures multi-factor authentication (MFA) settings.

        - `allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"`

          Lists the MFA methods that users can authenticate with.

          - `"totp"`

          - `"biometrics"`

          - `"security_key"`

        - `mfa_disabled: optional boolean`

          Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

        - `session_duration: optional string`

          Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

      - `name: optional string`

        The name of the Access policy.

      - `precedence: optional number`

        The order of execution for this policy. Must be unique for each policy within an app.

      - `purpose_justification_prompt: optional string`

        A custom message that will appear on the purpose justification screen.

      - `purpose_justification_required: optional boolean`

        Require users to enter a justification when they log in to the application.

      - `require: optional array of AccessRule`

        Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `session_duration: optional string`

        The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

      - `updated_at: optional string`

    - `same_site_cookie_attribute: optional string`

      Sets the SameSite cookie setting, which provides increased security against CSRF attacks.

    - `scim_config: optional object { idp_uid, remote_uri, authentication, 3 more }`

      Configuration for provisioning to this application via SCIM. This is currently in closed beta.

      - `idp_uid: string`

        The UID of the IdP to use as the source for SCIM resources to provision to this application.

      - `remote_uri: string`

        The base URI for the application's SCIM-compatible API.

      - `authentication: optional SCIMConfigAuthenticationHTTPBasic or SCIMConfigAuthenticationOAuthBearerToken or SCIMConfigAuthenticationOauth2 or 2 more`

        Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

        - `SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }`

          Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

        - `SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }`

          Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

        - `SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }`

          Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

        - `AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }`

          Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

          - `client_id: string`

            Client ID of the Access service token used to authenticate with the remote service.

          - `client_secret: string`

            Client secret of the Access service token used to authenticate with the remote service.

          - `scheme: "access_service_token"`

            The authentication scheme to use when making SCIM requests to this application.

            - `"access_service_token"`

        - `AccessSCIMConfigMultiAuthentication = array of SCIMConfigAuthenticationHTTPBasic or SCIMConfigAuthenticationOAuthBearerToken or SCIMConfigAuthenticationOauth2 or object { client_id, client_secret, scheme }`

          Multiple authentication schemes

          - `SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }`

            Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

          - `SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }`

            Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

          - `SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }`

            Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

          - `AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }`

            Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

            - `client_id: string`

              Client ID of the Access service token used to authenticate with the remote service.

            - `client_secret: string`

              Client secret of the Access service token used to authenticate with the remote service.

            - `scheme: "access_service_token"`

              The authentication scheme to use when making SCIM requests to this application.

              - `"access_service_token"`

      - `deactivate_on_delete: optional boolean`

        If false, propagates DELETE requests to the target application for SCIM resources. If true, sets 'active' to false on the SCIM resource. Note: Some targets do not support DELETE operations.

      - `enabled: optional boolean`

        Whether SCIM provisioning is turned on for this application.

      - `mappings: optional array of SCIMConfigMapping`

        A list of mappings to apply to SCIM resources before provisioning them in this application. These can transform or filter the resources to be provisioned.

        - `schema: string`

          Which SCIM resource type this mapping applies to.

        - `enabled: optional boolean`

          Whether or not this mapping is enabled.

        - `filter: optional string`

          A [SCIM filter expression](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2) that matches resources that should be provisioned to this application.

        - `operations: optional object { create, delete, update }`

          Whether or not this mapping applies to creates, updates, or deletes.

        - `strictness: optional "strict" or "passthrough"`

          The level of adherence to outbound resource schemas when provisioning to this mapping. ‘Strict’ removes unknown values, while ‘passthrough’ passes unknown values to the target.

        - `transform_jsonata: optional string`

          A [JSONata](https://jsonata.org/) expression that transforms the resource before provisioning it in the application.

    - `session_duration: optional string`

      The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. Note: unsupported for infrastructure type applications.

    - `tags: optional array of string`

      The tags you want assigned to an application. Tags are used to filter applications in the App Launcher dashboard.

  - `McpServerPortalApplication object { type, id, allow_authenticate_via_warp, 19 more }`

    - `type: ApplicationType`

      The application type.

    - `id: optional string`

      UUID.

    - `allow_authenticate_via_warp: optional boolean`

      When set to true, users can authenticate to this application using their WARP session.  When set to false this application will always require direct IdP authentication. This setting always overrides the organization setting for WARP authentication.

    - `allowed_idps: optional array of AllowedIdPs`

      The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.

    - `aud: optional string`

      Audience tag.

    - `auto_redirect_to_identity: optional boolean`

      When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.

    - `custom_deny_message: optional string`

      The custom error message shown to a user when they are denied access to the application.

    - `custom_deny_url: optional string`

      The custom URL a user is redirected to when they are denied access to the application when failing identity-based rules.

    - `custom_non_identity_deny_url: optional string`

      The custom URL a user is redirected to when they are denied access to the application when failing non-identity rules.

    - `custom_pages: optional array of string`

      The custom pages that will be displayed when applicable for this application

    - `destinations: optional array of object { type, uri }  or object { cidr, hostname, l4_protocol, 3 more }  or object { mcp_server_id, type }  or 4 more`

      List of destinations secured by Access. This supersedes `self_hosted_domains` to allow for more flexibility in defining different types of domains. If `destinations` are provided, then `self_hosted_domains` will be ignored.

      - `PublicDestination object { type, uri }`

        A public hostname that Access will secure. Public destinations support sub-domain and path. Wildcard '*' can be used in the definition.

        - `type: optional "public"`

          - `"public"`

        - `uri: optional string`

          The URI of the destination. Public destinations' URIs can include a domain and path with [wildcards](https://developers.cloudflare.com/cloudflare-one/policies/access/app-paths/).

      - `PrivateDestination object { cidr, hostname, l4_protocol, 3 more }`

        - `cidr: optional string`

          The CIDR range of the destination. Single IPs will be computed as /32.

        - `hostname: optional string`

          The hostname of the destination. Matches a valid SNI served by an HTTPS origin.

        - `l4_protocol: optional "tcp" or "udp"`

          The L4 protocol of the destination. When omitted, both UDP and TCP traffic will match.

          - `"tcp"`

          - `"udp"`

        - `port_range: optional string`

          The port range of the destination. Can be a single port or a range of ports. When omitted, all ports will match.

        - `type: optional "private"`

          - `"private"`

        - `vnet_id: optional string`

          The VNET ID to match the destination. When omitted, all VNETs will match.

      - `ViaMcpServerPortalDestination object { mcp_server_id, type }`

        A MCP server id configured in ai-controls. Access will secure the MCP server if accessed through a MCP portal.

        - `mcp_server_id: optional string`

          The MCP server id configured in ai-controls.

        - `type: optional "via_mcp_server_portal"`

          - `"via_mcp_server_portal"`

      - `WorkerDestination object { type, worker_id }`

        A specific Cloudflare Worker that Access will secure. All requests routed to the specified Worker, including its preview deployments, will be protected. The `preview_worker` and `public` destination types takes precedence, so you can create separate applications to override the policies for the Worker's previews or specific paths.

        - `type: "worker"`

          - `"worker"`

        - `worker_id: string`

          The ID of the Cloudflare Worker to protect with Access.

      - `PreviewWorkerDestination object { type, worker_id }`

        A specific Cloudflare Worker whose preview deployments Access will secure. Only requests routed to the preview deployments of the specified Worker will be protected. The `public` destination type takes precedence, so you can create separate applications to override the policies for specific paths.

        - `type: "preview_worker"`

          - `"preview_worker"`

        - `worker_id: string`

          The ID of the Cloudflare Worker whose preview deployments to protect with Access.

      - `AllWorkersDestination object { type }`

        Protects all Cloudflare Workers on the account with Access, including their preview deployments. At most one destination of this type can exist per account. The `worker`, `preview_worker`, `all_preview_workers`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

        - `type: "all_workers"`

          - `"all_workers"`

      - `AllPreviewWorkersDestination object { type }`

        Protects the preview deployments of all Cloudflare Workers on the account with Access. At most one destination of this type can exist per account. The `worker`, `preview_worker`, and `public` destination types take precedence, so you can create separate applications to override the policies for specific Workers, their previews, or specific paths.

        - `type: "all_preview_workers"`

          - `"all_preview_workers"`

    - `domain: optional string`

      The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.

    - `http_only_cookie_attribute: optional boolean`

      Enables the HttpOnly cookie attribute, which increases security against XSS attacks.

    - `logo_url: optional string`

      The image URL for the logo shown in the App Launcher dashboard.

    - `name: optional string`

      The name of the application.

    - `oauth_configuration: optional object { dynamic_client_registration, enabled, grant }`

      **Beta:** Optional configuration for managing an OAuth authorization flow controlled by Access. When set, Access will act as the OAuth authorization server for this application. Only compatible with OAuth clients that support [RFC 8707](https://datatracker.ietf.org/doc/html/rfc8707) (Resource Indicators for OAuth 2.0). This feature is currently in beta.

      - `dynamic_client_registration: optional object { allow_any_on_localhost, allow_any_on_loopback, allowed_uris, enabled }`

        Settings for OAuth dynamic client registration.

        - `allow_any_on_localhost: optional boolean`

          Allows any client with redirect URIs on localhost.

        - `allow_any_on_loopback: optional boolean`

          Allows any client with redirect URIs on 127.0.0.1.

        - `allowed_uris: optional array of string`

          The URIs that are allowed as redirect URIs for dynamically registered clients. Must use the `https` protocol. Paths may end in `/*` to match all sub-paths.

        - `enabled: optional boolean`

          Whether dynamic client registration is enabled.

      - `enabled: optional boolean`

        Whether the OAuth configuration is enabled for this application. When set to `false`, Access will not handle OAuth for this application. Defaults to `true` if omitted.

      - `grant: optional object { access_token_lifetime, session_duration }`

        Settings for OAuth grant behavior.

        - `access_token_lifetime: optional string`

          The lifetime of the access token. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

        - `session_duration: optional string`

          The duration of the OAuth session. Must be in the format `300ms` or `2h45m`. Valid time units are ns, us (or µs), ms, s, m, h.

    - `options_preflight_bypass: optional boolean`

      Allows options preflight requests to bypass Access authentication and go directly to the origin. Cannot turn on if cors_headers is set.

    - `policies: optional array of object { id, approval_groups, approval_required, 14 more }`

      - `id: optional string`

        The UUID of the policy

      - `approval_groups: optional array of ApprovalGroup`

        Administrators who can approve a temporary authentication request.

        - `approvals_needed: number`

          The number of approvals needed to obtain access.

        - `email_addresses: optional array of string`

          A list of emails that can approve the access request.

        - `email_list_uuid: optional string`

          The UUID of an re-usable email list.

      - `approval_required: optional boolean`

        Requires the user to request access from an administrator at the start of each session.

      - `connection_rules: optional object { rdp }`

        The rules that define how users may connect to targets secured by your application.

        - `rdp: optional object { allowed_clipboard_local_to_remote_formats, allowed_clipboard_remote_to_local_formats }`

          The RDP-specific rules that define clipboard behavior for RDP connections.

          - `allowed_clipboard_local_to_remote_formats: optional array of "text"`

            Clipboard formats allowed when copying from local machine to remote RDP session.

            - `"text"`

          - `allowed_clipboard_remote_to_local_formats: optional array of "text"`

            Clipboard formats allowed when copying from remote RDP session to local machine.

            - `"text"`

      - `created_at: optional string`

      - `decision: optional Decision`

        The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

      - `exclude: optional array of AccessRule`

        Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `include: optional array of AccessRule`

        Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `isolation_required: optional boolean`

        Require this application to be served in an isolated browser for users matching this policy. 'Client Web Isolation' must be on for the account in order to use this feature.

      - `mfa_config: optional object { allowed_authenticators, mfa_disabled, session_duration }`

        Configures multi-factor authentication (MFA) settings.

        - `allowed_authenticators: optional array of "totp" or "biometrics" or "security_key"`

          Lists the MFA methods that users can authenticate with.

          - `"totp"`

          - `"biometrics"`

          - `"security_key"`

        - `mfa_disabled: optional boolean`

          Indicates whether to disable MFA for this resource. This option is available at the application and policy level.

        - `session_duration: optional string`

          Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

      - `name: optional string`

        The name of the Access policy.

      - `precedence: optional number`

        The order of execution for this policy. Must be unique for each policy within an app.

      - `purpose_justification_prompt: optional string`

        A custom message that will appear on the purpose justification screen.

      - `purpose_justification_required: optional boolean`

        Require users to enter a justification when they log in to the application.

      - `require: optional array of AccessRule`

        Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.

        - `GroupRule object { group }`

          Matches an Access group.

        - `AnyValidServiceTokenRule object { any_valid_service_token }`

          Matches any valid Access Service Token

        - `AccessAuthContextRule object { auth_context }`

          Matches an Azure Authentication Context.
          Requires an Azure identity provider.

        - `AuthenticationMethodRule object { auth_method }`

          Enforce different MFA options

        - `AzureGroupRule object { azureAD }`

          Matches an Azure group.
          Requires an Azure identity provider.

        - `CertificateRule object { certificate }`

          Matches any valid client certificate.

        - `AccessCommonNameRule object { common_name }`

          Matches a specific common name.

        - `CountryRule object { geo }`

          Matches a specific country

        - `AccessDevicePostureRule object { device_posture }`

          Enforces a device posture rule has run successfully

        - `DomainRule object { email_domain }`

          Match an entire email domain.

        - `EmailListRule object { email_list }`

          Matches an email address from a list.

        - `EmailRule object { email }`

          Matches a specific email.

        - `EveryoneRule object { everyone }`

          Matches everyone.

        - `ExternalEvaluationRule object { external_evaluation }`

          Create Allow or Block policies which evaluate the user based on custom criteria.

        - `GitHubOrganizationRule object { "github-organization" }`

          Matches a Github organization.
          Requires a Github identity provider.

        - `GSuiteGroupRule object { gsuite }`

          Matches a group in Google Workspace.
          Requires a Google Workspace identity provider.

        - `AccessLoginMethodRule object { login_method }`

          Matches a specific identity provider id.

        - `IPListRule object { ip_list }`

          Matches an IP address from a list.

        - `IPRule object { ip }`

          Matches an IP address block.

        - `OktaGroupRule object { okta }`

          Matches an Okta group.
          Requires an Okta identity provider.

        - `SAMLGroupRule object { saml }`

          Matches a SAML group.
          Requires a SAML identity provider.

        - `AccessOIDCClaimRule object { oidc }`

          Matches an OIDC claim.
          Requires an OIDC identity provider.

        - `ServiceTokenRule object { service_token }`

          Matches a specific Access Service Token

        - `AccessLinkedAppTokenRule object { linked_app_token }`

          Matches OAuth 2.0 access tokens issued by the specified Access OIDC SaaS application. Only compatible with non_identity and bypass decisions.

        - `AccessUserRiskScoreRule object { user_risk_score }`

          Matches a user's risk score.

        - `AccessCloudflareAccountMemberRule object { cloudflare_account_member }`

          Matches users who are members of a specific Cloudflare account.
          Requires a Cloudflare identity provider.

      - `session_duration: optional string`

        The amount of time that tokens issued for the application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

      - `updated_at: optional string`

    - `same_site_cookie_attribute: optional string`

      Sets the SameSite cookie setting, which provides increased security against CSRF attacks.

    - `scim_config: optional object { idp_uid, remote_uri, authentication, 3 more }`

      Configuration for provisioning to this application via SCIM. This is currently in closed beta.

      - `idp_uid: string`

        The UID of the IdP to use as the source for SCIM resources to provision to this application.

      - `remote_uri: string`

        The base URI for the application's SCIM-compatible API.

      - `authentication: optional SCIMConfigAuthenticationHTTPBasic or SCIMConfigAuthenticationOAuthBearerToken or SCIMConfigAuthenticationOauth2 or 2 more`

        Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

        - `SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }`

          Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

        - `SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }`

          Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

        - `SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }`

          Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

        - `AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }`

          Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

          - `client_id: string`

            Client ID of the Access service token used to authenticate with the remote service.

          - `client_secret: string`

            Client secret of the Access service token used to authenticate with the remote service.

          - `scheme: "access_service_token"`

            The authentication scheme to use when making SCIM requests to this application.

            - `"access_service_token"`

        - `AccessSCIMConfigMultiAuthentication = array of SCIMConfigAuthenticationHTTPBasic or SCIMConfigAuthenticationOAuthBearerToken or SCIMConfigAuthenticationOauth2 or object { client_id, client_secret, scheme }`

          Multiple authentication schemes

          - `SCIMConfigAuthenticationHTTPBasic object { password, scheme, user }`

            Attributes for configuring HTTP Basic authentication scheme for SCIM provisioning to an application.

          - `SCIMConfigAuthenticationOAuthBearerToken object { token, scheme }`

            Attributes for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application.

          - `SCIMConfigAuthenticationOauth2 object { authorization_url, client_id, client_secret, 3 more }`

            Attributes for configuring OAuth 2 authentication scheme for SCIM provisioning to an application.

          - `AccessSCIMConfigAuthenticationAccessServiceToken object { client_id, client_secret, scheme }`

            Attributes for configuring Access Service Token authentication scheme for SCIM provisioning to an application.

            - `client_id: string`

              Client ID of the Access service token used to authenticate with the remote service.

            - `client_secret: string`

              Client secret of the Access service token used to authenticate with the remote service.

            - `scheme: "access_service_token"`

              The authentication scheme to use when making SCIM requests to this application.

              - `"access_service_token"`

      - `deactivate_on_delete: optional boolean`

        If false, propagates DELETE requests to the target application for SCIM resources. If true, sets 'active' to false on the SCIM resource. Note: Some targets do not support DELETE operations.

      - `enabled: optional boolean`

        Whether SCIM provisioning is turned on for this application.

      - `mappings: optional array of SCIMConfigMapping`

        A list of mappings to apply to SCIM resources before provisioning them in this application. These can transform or filter the resources to be provisioned.

        - `schema: string`

          Which SCIM resource type this mapping applies to.

        - `enabled: optional boolean`

          Whether or not this mapping is enabled.

        - `filter: optional string`

          A [SCIM filter expression](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2) that matches resources that should be provisioned to this application.

        - `operations: optional object { create, delete, update }`

          Whether or not this mapping applies to creates, updates, or deletes.

        - `strictness: optional "strict" or "passthrough"`

          The level of adherence to outbound resource schemas when provisioning to this mapping. ‘Strict’ removes unknown values, while ‘passthrough’ passes unknown values to the target.

        - `transform_jsonata: optional string`

          A [JSONata](https://jsonata.org/) expression that transforms the resource before provisioning it in the application.

    - `session_duration: optional string`

      The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. Note: unsupported for infrastructure type applications.

    - `tags: optional array of string`

      The tags you want assigned to an application. Tags are used to filter applications in the App Launcher dashboard.

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/apps \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": [
    {
      "domain": "test.example.com/admin",
      "type": "self_hosted",
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "allow_authenticate_via_warp": true,
      "allow_iframe": true,
      "allowed_idps": [
        "699d98642c564d2e855e9661899b7252"
      ],
      "app_launcher_visible": true,
      "aud": "737646a56ab1df6ec9bddc7e5ca84eaf3b0768850f3ffb5d74f1534911fe3893",
      "auto_redirect_to_identity": true,
      "cors_headers": {
        "allow_all_headers": true,
        "allow_all_methods": true,
        "allow_all_origins": true,
        "allow_credentials": true,
        "allowed_headers": [
          "string"
        ],
        "allowed_methods": [
          "GET"
        ],
        "allowed_origins": [
          "https://example.com"
        ],
        "max_age": -1
      },
      "created_at": "2014-01-01T05:20:00.12345Z",
      "custom_deny_message": "custom_deny_message",
      "custom_deny_url": "custom_deny_url",
      "custom_non_identity_deny_url": "custom_non_identity_deny_url",
      "custom_pages": [
        "699d98642c564d2e855e9661899b7252"
      ],
      "destinations": [
        {
          "type": "public",
          "uri": "test.example.com/admin"
        },
        {
          "type": "public",
          "uri": "test.anotherexample.com/staff"
        },
        {
          "cidr": "10.5.0.0/24",
          "hostname": "hostname",
          "l4_protocol": "tcp",
          "port_range": "80-90",
          "type": "private",
          "vnet_id": "vnet_id"
        },
        {
          "cidr": "10.5.0.3/32",
          "hostname": "hostname",
          "l4_protocol": "tcp",
          "port_range": "80",
          "type": "private",
          "vnet_id": "vnet_id"
        },
        {
          "cidr": "cidr",
          "hostname": "private-sni.example.com",
          "l4_protocol": "tcp",
          "port_range": "port_range",
          "type": "private",
          "vnet_id": "vnet_id"
        },
        {
          "mcp_server_id": "mcp-server-1",
          "type": "via_mcp_server_portal"
        },
        {
          "type": "worker",
          "worker_id": "617f1d0431a98306ff61e336d79fce86"
        },
        {
          "type": "preview_worker",
          "worker_id": "617f1d0431a98306ff61e336d79fce86"
        },
        {
          "type": "all_workers"
        },
        {
          "type": "all_preview_workers"
        }
      ],
      "eager_redirect_cookie_setting": true,
      "enable_binding_cookie": true,
      "http_only_cookie_attribute": true,
      "logo_url": "https://www.cloudflare.com/img/logo-web-badges/cf-logo-on-white-bg.svg",
      "mfa_config": {
        "allowed_authenticators": [
          "totp",
          "biometrics",
          "security_key"
        ],
        "mfa_disabled": false,
        "session_duration": "24h"
      },
      "name": "Admin Site",
      "oauth_configuration": {
        "dynamic_client_registration": {
          "allow_any_on_localhost": true,
          "allow_any_on_loopback": true,
          "allowed_uris": [
            "https://example.com/callback"
          ],
          "enabled": true
        },
        "enabled": true,
        "grant": {
          "access_token_lifetime": "5m",
          "session_duration": "24h"
        }
      },
      "options_preflight_bypass": true,
      "path_cookie_attribute": true,
      "policies": [
        {
          "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
          "approval_groups": [
            {
              "approvals_needed": 1,
              "email_addresses": [
                "test1@cloudflare.com",
                "test2@cloudflare.com"
              ],
              "email_list_uuid": "email_list_uuid"
            },
            {
              "approvals_needed": 3,
              "email_addresses": [
                "test@cloudflare.com",
                "test2@cloudflare.com"
              ],
              "email_list_uuid": "597147a1-976b-4ef2-9af0-81d5d007fc34"
            }
          ],
          "approval_required": true,
          "connection_rules": {
            "rdp": {
              "allowed_clipboard_local_to_remote_formats": [
                "text"
              ],
              "allowed_clipboard_remote_to_local_formats": [
                "text"
              ]
            }
          },
          "created_at": "2014-01-01T05:20:00.12345Z",
          "decision": "allow",
          "exclude": [
            {
              "certificate": {}
            }
          ],
          "include": [
            {
              "certificate": {}
            }
          ],
          "isolation_required": false,
          "mfa_config": {
            "allowed_authenticators": [
              "totp",
              "biometrics",
              "security_key"
            ],
            "mfa_disabled": false,
            "session_duration": "24h"
          },
          "name": "Allow devs",
          "precedence": 0,
          "purpose_justification_prompt": "Please enter a justification for entering this protected domain.",
          "purpose_justification_required": true,
          "require": [
            {
              "certificate": {}
            }
          ],
          "session_duration": "24h",
          "updated_at": "2014-01-01T05:20:00.12345Z"
        }
      ],
      "read_service_tokens_from_header": "Authorization",
      "same_site_cookie_attribute": "strict",
      "scim_config": {
        "idp_uid": "idp_uid",
        "remote_uri": "remote_uri",
        "authentication": {
          "password": "password",
          "scheme": "httpbasic",
          "user": "user"
        },
        "deactivate_on_delete": true,
        "enabled": true,
        "mappings": [
          {
            "schema": "urn:ietf:params:scim:schemas:core:2.0:User",
            "enabled": true,
            "filter": "title pr or userType eq \"Intern\"",
            "operations": {
              "create": true,
              "delete": true,
              "update": true
            },
            "strictness": "strict",
            "transform_jsonata": "$merge([$, {'userName': $substringBefore($.userName, '@') & '+test@' & $substringAfter($.userName, '@')}])"
          }
        ]
      },
      "self_hosted_domains": [
        "test.example.com/admin",
        "test.anotherexample.com/staff"
      ],
      "service_auth_401_redirect": true,
      "session_duration": "24h",
      "skip_interstitial": true,
      "tags": [
        "engineers"
      ],
      "updated_at": "2014-01-01T05:20:00.12345Z",
      "use_clientless_isolation_app_launcher_url": false
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```
