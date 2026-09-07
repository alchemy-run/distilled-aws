## Get an Access group

**get** `/{accounts_or_zones}/{account_or_zone_id}/access/groups/{group_id}`

Fetches a single Access group.

### Path Parameters

- `group_id: string`

  UUID.

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

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

- `result: optional object { id, exclude, include, 3 more }`

  - `id: optional string`

    UUID.

  - `exclude: optional array of AccessRule`

    Rules evaluated with a NOT logical operator. To match a policy, a user cannot meet any of the Exclude rules.

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

  - `is_default: optional array of AccessRule`

    Rules evaluated with an AND logical operator. To match a policy, a user must meet all of the Require rules.

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

  - `name: optional string`

    The name of the Access group.

  - `require: optional array of AccessRule`

    Rules evaluated with an AND logical operator. To match a policy, a user must meet all of the Require rules.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/groups/$GROUP_ID \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
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
    "is_default": [
      {
        "certificate": {}
      }
    ],
    "name": "Allow devs",
    "require": [
      {
        "certificate": {}
      }
    ],
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```
