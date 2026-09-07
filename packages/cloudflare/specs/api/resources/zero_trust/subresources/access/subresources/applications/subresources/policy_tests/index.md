# Policy Tests

## Get the current status of a given Access policy test

**get** `/accounts/{account_id}/access/policy-tests/{policy_test_id}`

Fetches the current status of a given Access policy test.

### Path Parameters

- `account_id: string`

  Identifier.

- `policy_test_id: string`

  The UUID of the policy test.

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

- `result: optional object { id, percent_approved, percent_blocked, 7 more }`

  - `id: optional string`

    The UUID of the policy test.

  - `percent_approved: optional number`

    The percentage of (processed) users approved based on policy evaluation results.

  - `percent_blocked: optional number`

    The percentage of (processed) users blocked based on policy evaluation results.

  - `percent_errored: optional number`

    The percentage of (processed) users errored based on policy evaluation results.

  - `percent_users_processed: optional number`

    The percentage of users processed so far (of the entire user base).

  - `status: optional "blocked" or "processing" or "exceeded time" or "complete"`

    The status of the policy test.

    - `"blocked"`

    - `"processing"`

    - `"exceeded time"`

    - `"complete"`

  - `total_users: optional number`

    The total number of users in the user base.

  - `users_approved: optional number`

    The number of (processed) users approved based on policy evaluation results.

  - `users_blocked: optional number`

    The number of (processed) users blocked based on policy evaluation results.

  - `users_errored: optional number`

    The number of (processed) users errored based on policy evaluation results.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policy-tests/$POLICY_TEST_ID \
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
  "result": {
    "id": "f1a8b3c9d4e5f6789a0b1c2d3e4f5678a9b0c1d2e3f4a5b67890c1d2e3f4b5a6",
    "percent_approved": 25,
    "percent_blocked": 25,
    "percent_errored": 25,
    "percent_users_processed": 50,
    "status": "complete",
    "total_users": 20,
    "users_approved": 5,
    "users_blocked": 5,
    "users_errored": 5
  }
}
```

## Start Access policy test

**post** `/accounts/{account_id}/access/policy-tests`

Starts an Access policy test.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `policies: optional array of object { decision, include, name, 10 more }  or string`

  - `object { decision, include, name, 10 more }`

    - `decision: Decision`

      The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.

      - `"allow"`

      - `"deny"`

      - `"non_identity"`

      - `"bypass"`

    - `include: array of AccessRule`

      Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.

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

    - `name: string`

      The name of the Access policy.

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

  - `string`

    The UUID of the reusable policy you wish to test

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

- `result: optional object { id, status }`

  - `id: optional string`

    The UUID of the policy test.

  - `status: optional "success"`

    The status of the policy test request.

    - `"success"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policy-tests \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
  "result": {
    "id": "f1a8b3c9d4e5f6789a0b1c2d3e4f5678a9b0c1d2e3f4a5b67890c1d2e3f4b5a6",
    "status": "success"
  }
}
```

## Domain Types

### Policy Test Get Response

- `PolicyTestGetResponse object { id, percent_approved, percent_blocked, 7 more }`

  - `id: optional string`

    The UUID of the policy test.

  - `percent_approved: optional number`

    The percentage of (processed) users approved based on policy evaluation results.

  - `percent_blocked: optional number`

    The percentage of (processed) users blocked based on policy evaluation results.

  - `percent_errored: optional number`

    The percentage of (processed) users errored based on policy evaluation results.

  - `percent_users_processed: optional number`

    The percentage of users processed so far (of the entire user base).

  - `status: optional "blocked" or "processing" or "exceeded time" or "complete"`

    The status of the policy test.

    - `"blocked"`

    - `"processing"`

    - `"exceeded time"`

    - `"complete"`

  - `total_users: optional number`

    The total number of users in the user base.

  - `users_approved: optional number`

    The number of (processed) users approved based on policy evaluation results.

  - `users_blocked: optional number`

    The number of (processed) users blocked based on policy evaluation results.

  - `users_errored: optional number`

    The number of (processed) users errored based on policy evaluation results.

### Policy Test Create Response

- `PolicyTestCreateResponse object { id, status }`

  - `id: optional string`

    The UUID of the policy test.

  - `status: optional "success"`

    The status of the policy test request.

    - `"success"`

# Users

## Get an Access policy test users page

**get** `/accounts/{account_id}/access/policy-tests/{policy_test_id}/users`

Fetches a single page of user results from an Access policy test.

### Path Parameters

- `account_id: string`

  Identifier.

- `policy_test_id: string`

  The UUID of the policy test.

### Query Parameters

- `page: optional number`

  Page number of results.

- `per_page: optional number`

- `status: optional "success" or "fail" or "error"`

  Filter users by their policy evaluation status.

  - `"success"`

  - `"fail"`

  - `"error"`

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

- `result: optional array of object { id, email, name, status }`

  Page of processed users.

  - `id: optional string`

    UUID.

  - `email: optional string`

    The email of the user.

  - `name: optional string`

    The name of the user.

  - `status: optional "approved" or "blocked" or "error"`

    Policy evaluation result for an individual user.

    - `"approved"`

    - `"blocked"`

    - `"error"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policy-tests/$POLICY_TEST_ID/users \
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
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "email": "jdoe@example.com",
      "name": "Jane Doe",
      "status": "approved"
    }
  ]
}
```

## Domain Types

### User List Response

- `UserListResponse object { id, email, name, status }`

  - `id: optional string`

    UUID.

  - `email: optional string`

    The email of the user.

  - `name: optional string`

    The name of the user.

  - `status: optional "approved" or "blocked" or "error"`

    Policy evaluation result for an individual user.

    - `"approved"`

    - `"blocked"`

    - `"error"`
