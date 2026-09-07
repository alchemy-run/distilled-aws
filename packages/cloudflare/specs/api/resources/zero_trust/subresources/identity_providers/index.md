# Identity Providers

## List Access identity providers

**get** `/{accounts_or_zones}/{account_or_zone_id}/access/identity_providers`

Lists all configured identity providers.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Query Parameters

- `page: optional number`

  Page number of results.

- `per_page: optional number`

  Number of results per page.

- `scim_enabled: optional string`

  Indicates to Access to only retrieve identity providers that have the System for Cross-Domain Identity Management (SCIM) enabled.

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

- `result: optional array of AzureAD or object { config, name, type, 5 more }  or object { config, name, type, 5 more }  or 12 more`

  - `AzureAD object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 5 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `conditional_access_enabled: optional boolean`

        Should Cloudflare try to load authentication contexts from your account

      - `directory_id: optional string`

        Your Azure directory uuid

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `prompt: optional "login" or "select_account" or "none"`

        Indicates the type of user interaction that is required. prompt=login forces the user to enter their credentials on that request, negating single-sign on. prompt=none is the opposite. It ensures that the user isn't presented with any interactive prompt. If the request can't be completed silently by using single-sign on, the Microsoft identity platform returns an interaction_required error. prompt=select_account interrupts single sign-on providing account selection experience listing all the accounts either in session or any remembered account or an option to choose to use a different account altogether.

        - `"login"`

        - `"select_account"`

        - `"none"`

      - `support_groups: optional boolean`

        Should Cloudflare try to load groups from your account

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `"onetimepin"`

      - `"azureAD"`

      - `"saml"`

      - `"centrify"`

      - `"facebook"`

      - `"github"`

      - `"google-apps"`

      - `"google"`

      - `"linkedin"`

      - `"oidc"`

      - `"okta"`

      - `"onelogin"`

      - `"pingone"`

      - `"yandex"`

      - `"cloudflare"`

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

      - `enabled: optional boolean`

        A flag to enable or disable SCIM for the identity provider.

      - `identity_update_behavior: optional "automatic" or "reauth" or "no_action"`

        Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user's identity and augment it with fields from the SCIM user resource. Use "reauth" to force re-authentication on group membership updates, user identity update will only occur after successful re-authentication. With "reauth" identities will not contain fields from the SCIM user resource. With "no_action" identities will not be changed by SCIM updates in any way and users will not be prompted to reauthenticate.

        - `"automatic"`

        - `"reauth"`

        - `"no_action"`

      - `scim_base_url: optional string`

        The base URL of Cloudflare's SCIM V2.0 API endpoint.

      - `seat_deprovision: optional boolean`

        A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user_deprovision is also enabled.

      - `secret: optional string`

        A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests.  If you lose this you will need to refresh it at /access/identity_providers/:idpID/refresh_scim_secret.

      - `user_deprovision: optional boolean`

        A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.

  - `AccessCentrify object { config, name, type, 5 more }`

    - `config: object { centrify_account, centrify_app_id, claims, 3 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `centrify_account: optional string`

        Your centrify account url

      - `centrify_app_id: optional string`

        Your centrify app id

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessFacebook object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGitHub object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGoogle object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, email_claim_name }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGoogleApps object { config, name, type, 5 more }`

    - `config: object { apps_domain, claims, client_id, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `apps_domain: optional string`

        Your companies TLD

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessLinkedin object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOIDC object { config, name, type, 5 more }`

    - `config: object { auth_url, certs_url, claims, 6 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `auth_url: optional string`

        The authorization_endpoint URL of your IdP

      - `certs_url: optional string`

        The jwks_uri endpoint of your IdP to allow the IdP keys to sign the tokens

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `pkce_enabled: optional boolean`

        Enable Proof Key for Code Exchange (PKCE)

      - `scopes: optional array of string`

        OAuth scopes

      - `token_url: optional string`

        The token_endpoint URL of your IdP

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOkta object { config, name, type, 5 more }`

    - `config: object { authorization_server_id, claims, client_id, 3 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `authorization_server_id: optional string`

        Your okta authorization server id

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `okta_account: optional string`

        Your okta account url

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOnelogin object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `onelogin_account: optional string`

        Your OneLogin account url

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessPingone object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `ping_env_id: optional string`

        Your PingOne environment identifier

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessSAML object { config, name, type, 5 more }`

    - `config: object { attributes, email_attribute_name, enable_encryption, 5 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `attributes: optional array of string`

        A list of SAML attribute names that will be added to your signed JWT token and can be used in SAML policy rules.

      - `email_attribute_name: optional string`

        The attribute name for email in the SAML response.

      - `enable_encryption: optional boolean`

        Enable SAML assertion encryption. When enabled, the Identity Provider will encrypt
        SAML assertions using the certificate from the assigned certificate set.

        To enable encryption:

        1. Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`
        1. Set this field to `true` and include `saml_certificate_set_id` in the PUT request
        1. Configure the public certificate in your external Identity Provider

        Note: Requires `saml_certificate_set_id` to be set when `true`.

      - `header_attributes: optional array of object { attribute_name, header_name }`

        Add a list of attribute names that will be returned in the response header from the Access callback.

        - `attribute_name: optional string`

          attribute name from the IDP

        - `header_name: optional string`

          header that will be added on the request to the origin

      - `idp_public_certs: optional array of string`

        X509 certificate to verify the signature in the SAML authentication response

      - `issuer_url: optional string`

        IdP Entity ID or Issuer URL

      - `sign_request: optional boolean`

        Sign the SAML authentication request with Access credentials. To verify the signature, use the public key from the Access certs endpoints.

      - `sso_target_url: optional string`

        URL to send the SAML authentication requests to

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessYandex object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOnetimepin object { config, name, type, 5 more }`

    - `config: object { redirect_url }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `redirect_url: optional string`

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessCloudflare object { config, name, type, 5 more }`

    - `config: object { redirect_url, restrict_to_account_members }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `redirect_url: optional string`

      - `restrict_to_account_members: optional boolean`

        When enabled, only users who are members of your Cloudflare account can authenticate through this identity provider. When disabled, any user with a Cloudflare account can authenticate, subject to your Access policies.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

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
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/identity_providers \
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
      "config": {
        "claims": [
          "email_verified",
          "preferred_username",
          "custom_claim_name"
        ],
        "client_id": "<your client id>",
        "client_secret": "<your client secret>",
        "conditional_access_enabled": true,
        "directory_id": "<your azure directory uuid>",
        "email_claim_name": "custom_claim_name",
        "prompt": "login",
        "support_groups": true
      },
      "name": "Widget Corps IDP",
      "type": "onetimepin",
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "read_only": true,
      "saml_certificate_set": {
        "created_at": "2026-05-07T19:16:19.821162Z",
        "uid": "c409ef44-e72c-41c8-8c0b-278c8a6f4fd8",
        "updated_at": "2026-05-07T19:16:19.821162Z",
        "current_certificate": {
          "is_current": true,
          "not_after": "2027-05-07T19:11:00Z",
          "public_certificate": "-----BEGIN CERTIFICATE-----\nMIIEpzCCA4+gAwIBAgIUTh2VSDDJ0oB/gabio6j1L9QwWoUwDQYJKoZIhvcNAQEL\n...\n-----END CERTIFICATE-----\n",
          "uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
        },
        "previous_certificate": {}
      },
      "saml_certificate_set_id": "c409ef44-e72c-41c8-8c0b-278c8a6f4fd8",
      "scim_config": {
        "enabled": true,
        "identity_update_behavior": "automatic",
        "scim_base_url": "scim_base_url",
        "seat_deprovision": true,
        "secret": "secret",
        "user_deprovision": true
      }
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

## Get an Access identity provider

**get** `/{accounts_or_zones}/{account_or_zone_id}/access/identity_providers/{identity_provider_id}`

Fetches a configured identity provider.

### Path Parameters

- `identity_provider_id: string`

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

- `result: optional IdentityProvider`

  - `AzureAD object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 5 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `conditional_access_enabled: optional boolean`

        Should Cloudflare try to load authentication contexts from your account

      - `directory_id: optional string`

        Your Azure directory uuid

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `prompt: optional "login" or "select_account" or "none"`

        Indicates the type of user interaction that is required. prompt=login forces the user to enter their credentials on that request, negating single-sign on. prompt=none is the opposite. It ensures that the user isn't presented with any interactive prompt. If the request can't be completed silently by using single-sign on, the Microsoft identity platform returns an interaction_required error. prompt=select_account interrupts single sign-on providing account selection experience listing all the accounts either in session or any remembered account or an option to choose to use a different account altogether.

        - `"login"`

        - `"select_account"`

        - `"none"`

      - `support_groups: optional boolean`

        Should Cloudflare try to load groups from your account

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `"onetimepin"`

      - `"azureAD"`

      - `"saml"`

      - `"centrify"`

      - `"facebook"`

      - `"github"`

      - `"google-apps"`

      - `"google"`

      - `"linkedin"`

      - `"oidc"`

      - `"okta"`

      - `"onelogin"`

      - `"pingone"`

      - `"yandex"`

      - `"cloudflare"`

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

      - `enabled: optional boolean`

        A flag to enable or disable SCIM for the identity provider.

      - `identity_update_behavior: optional "automatic" or "reauth" or "no_action"`

        Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user's identity and augment it with fields from the SCIM user resource. Use "reauth" to force re-authentication on group membership updates, user identity update will only occur after successful re-authentication. With "reauth" identities will not contain fields from the SCIM user resource. With "no_action" identities will not be changed by SCIM updates in any way and users will not be prompted to reauthenticate.

        - `"automatic"`

        - `"reauth"`

        - `"no_action"`

      - `scim_base_url: optional string`

        The base URL of Cloudflare's SCIM V2.0 API endpoint.

      - `seat_deprovision: optional boolean`

        A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user_deprovision is also enabled.

      - `secret: optional string`

        A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests.  If you lose this you will need to refresh it at /access/identity_providers/:idpID/refresh_scim_secret.

      - `user_deprovision: optional boolean`

        A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.

  - `AccessCentrify object { config, name, type, 5 more }`

    - `config: object { centrify_account, centrify_app_id, claims, 3 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `centrify_account: optional string`

        Your centrify account url

      - `centrify_app_id: optional string`

        Your centrify app id

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessFacebook object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGitHub object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGoogle object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, email_claim_name }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGoogleApps object { config, name, type, 5 more }`

    - `config: object { apps_domain, claims, client_id, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `apps_domain: optional string`

        Your companies TLD

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessLinkedin object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOIDC object { config, name, type, 5 more }`

    - `config: object { auth_url, certs_url, claims, 6 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `auth_url: optional string`

        The authorization_endpoint URL of your IdP

      - `certs_url: optional string`

        The jwks_uri endpoint of your IdP to allow the IdP keys to sign the tokens

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `pkce_enabled: optional boolean`

        Enable Proof Key for Code Exchange (PKCE)

      - `scopes: optional array of string`

        OAuth scopes

      - `token_url: optional string`

        The token_endpoint URL of your IdP

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOkta object { config, name, type, 5 more }`

    - `config: object { authorization_server_id, claims, client_id, 3 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `authorization_server_id: optional string`

        Your okta authorization server id

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `okta_account: optional string`

        Your okta account url

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOnelogin object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `onelogin_account: optional string`

        Your OneLogin account url

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessPingone object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `ping_env_id: optional string`

        Your PingOne environment identifier

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessSAML object { config, name, type, 5 more }`

    - `config: object { attributes, email_attribute_name, enable_encryption, 5 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `attributes: optional array of string`

        A list of SAML attribute names that will be added to your signed JWT token and can be used in SAML policy rules.

      - `email_attribute_name: optional string`

        The attribute name for email in the SAML response.

      - `enable_encryption: optional boolean`

        Enable SAML assertion encryption. When enabled, the Identity Provider will encrypt
        SAML assertions using the certificate from the assigned certificate set.

        To enable encryption:

        1. Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`
        1. Set this field to `true` and include `saml_certificate_set_id` in the PUT request
        1. Configure the public certificate in your external Identity Provider

        Note: Requires `saml_certificate_set_id` to be set when `true`.

      - `header_attributes: optional array of object { attribute_name, header_name }`

        Add a list of attribute names that will be returned in the response header from the Access callback.

        - `attribute_name: optional string`

          attribute name from the IDP

        - `header_name: optional string`

          header that will be added on the request to the origin

      - `idp_public_certs: optional array of string`

        X509 certificate to verify the signature in the SAML authentication response

      - `issuer_url: optional string`

        IdP Entity ID or Issuer URL

      - `sign_request: optional boolean`

        Sign the SAML authentication request with Access credentials. To verify the signature, use the public key from the Access certs endpoints.

      - `sso_target_url: optional string`

        URL to send the SAML authentication requests to

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessYandex object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOnetimepin object { config, name, type, 5 more }`

    - `config: object { redirect_url }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `redirect_url: optional string`

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessCloudflare object { config, name, type, 5 more }`

    - `config: object { redirect_url, restrict_to_account_members }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `redirect_url: optional string`

      - `restrict_to_account_members: optional boolean`

        When enabled, only users who are members of your Cloudflare account can authenticate through this identity provider. When disabled, any user with a Cloudflare account can authenticate, subject to your Access policies.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/identity_providers/$IDENTITY_PROVIDER_ID \
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
    "config": {
      "claims": [
        "email_verified",
        "preferred_username",
        "custom_claim_name"
      ],
      "client_id": "<your client id>",
      "client_secret": "<your client secret>",
      "conditional_access_enabled": true,
      "directory_id": "<your azure directory uuid>",
      "email_claim_name": "custom_claim_name",
      "prompt": "login",
      "support_groups": true
    },
    "name": "Widget Corps IDP",
    "type": "onetimepin",
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "read_only": true,
    "saml_certificate_set": {
      "created_at": "2026-05-07T19:16:19.821162Z",
      "uid": "c409ef44-e72c-41c8-8c0b-278c8a6f4fd8",
      "updated_at": "2026-05-07T19:16:19.821162Z",
      "current_certificate": {
        "is_current": true,
        "not_after": "2027-05-07T19:11:00Z",
        "public_certificate": "-----BEGIN CERTIFICATE-----\nMIIEpzCCA4+gAwIBAgIUTh2VSDDJ0oB/gabio6j1L9QwWoUwDQYJKoZIhvcNAQEL\n...\n-----END CERTIFICATE-----\n",
        "uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
      },
      "previous_certificate": {}
    },
    "saml_certificate_set_id": "c409ef44-e72c-41c8-8c0b-278c8a6f4fd8",
    "scim_config": {
      "enabled": true,
      "identity_update_behavior": "automatic",
      "scim_base_url": "scim_base_url",
      "seat_deprovision": true,
      "secret": "secret",
      "user_deprovision": true
    }
  }
}
```

## Add an Access identity provider

**post** `/{accounts_or_zones}/{account_or_zone_id}/access/identity_providers`

Adds a new identity provider to Access.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `identity_provider: IdentityProvider`

  - `AzureAD object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 5 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `conditional_access_enabled: optional boolean`

        Should Cloudflare try to load authentication contexts from your account

      - `directory_id: optional string`

        Your Azure directory uuid

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `prompt: optional "login" or "select_account" or "none"`

        Indicates the type of user interaction that is required. prompt=login forces the user to enter their credentials on that request, negating single-sign on. prompt=none is the opposite. It ensures that the user isn't presented with any interactive prompt. If the request can't be completed silently by using single-sign on, the Microsoft identity platform returns an interaction_required error. prompt=select_account interrupts single sign-on providing account selection experience listing all the accounts either in session or any remembered account or an option to choose to use a different account altogether.

        - `"login"`

        - `"select_account"`

        - `"none"`

      - `support_groups: optional boolean`

        Should Cloudflare try to load groups from your account

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `"onetimepin"`

      - `"azureAD"`

      - `"saml"`

      - `"centrify"`

      - `"facebook"`

      - `"github"`

      - `"google-apps"`

      - `"google"`

      - `"linkedin"`

      - `"oidc"`

      - `"okta"`

      - `"onelogin"`

      - `"pingone"`

      - `"yandex"`

      - `"cloudflare"`

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

      - `enabled: optional boolean`

        A flag to enable or disable SCIM for the identity provider.

      - `identity_update_behavior: optional "automatic" or "reauth" or "no_action"`

        Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user's identity and augment it with fields from the SCIM user resource. Use "reauth" to force re-authentication on group membership updates, user identity update will only occur after successful re-authentication. With "reauth" identities will not contain fields from the SCIM user resource. With "no_action" identities will not be changed by SCIM updates in any way and users will not be prompted to reauthenticate.

        - `"automatic"`

        - `"reauth"`

        - `"no_action"`

      - `scim_base_url: optional string`

        The base URL of Cloudflare's SCIM V2.0 API endpoint.

      - `seat_deprovision: optional boolean`

        A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user_deprovision is also enabled.

      - `secret: optional string`

        A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests.  If you lose this you will need to refresh it at /access/identity_providers/:idpID/refresh_scim_secret.

      - `user_deprovision: optional boolean`

        A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.

  - `AccessCentrify object { config, name, type, 5 more }`

    - `config: object { centrify_account, centrify_app_id, claims, 3 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `centrify_account: optional string`

        Your centrify account url

      - `centrify_app_id: optional string`

        Your centrify app id

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessFacebook object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGitHub object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGoogle object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, email_claim_name }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGoogleApps object { config, name, type, 5 more }`

    - `config: object { apps_domain, claims, client_id, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `apps_domain: optional string`

        Your companies TLD

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessLinkedin object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOIDC object { config, name, type, 5 more }`

    - `config: object { auth_url, certs_url, claims, 6 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `auth_url: optional string`

        The authorization_endpoint URL of your IdP

      - `certs_url: optional string`

        The jwks_uri endpoint of your IdP to allow the IdP keys to sign the tokens

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `pkce_enabled: optional boolean`

        Enable Proof Key for Code Exchange (PKCE)

      - `scopes: optional array of string`

        OAuth scopes

      - `token_url: optional string`

        The token_endpoint URL of your IdP

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOkta object { config, name, type, 5 more }`

    - `config: object { authorization_server_id, claims, client_id, 3 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `authorization_server_id: optional string`

        Your okta authorization server id

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `okta_account: optional string`

        Your okta account url

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOnelogin object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `onelogin_account: optional string`

        Your OneLogin account url

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessPingone object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `ping_env_id: optional string`

        Your PingOne environment identifier

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessSAML object { config, name, type, 5 more }`

    - `config: object { attributes, email_attribute_name, enable_encryption, 5 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `attributes: optional array of string`

        A list of SAML attribute names that will be added to your signed JWT token and can be used in SAML policy rules.

      - `email_attribute_name: optional string`

        The attribute name for email in the SAML response.

      - `enable_encryption: optional boolean`

        Enable SAML assertion encryption. When enabled, the Identity Provider will encrypt
        SAML assertions using the certificate from the assigned certificate set.

        To enable encryption:

        1. Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`
        1. Set this field to `true` and include `saml_certificate_set_id` in the PUT request
        1. Configure the public certificate in your external Identity Provider

        Note: Requires `saml_certificate_set_id` to be set when `true`.

      - `header_attributes: optional array of object { attribute_name, header_name }`

        Add a list of attribute names that will be returned in the response header from the Access callback.

        - `attribute_name: optional string`

          attribute name from the IDP

        - `header_name: optional string`

          header that will be added on the request to the origin

      - `idp_public_certs: optional array of string`

        X509 certificate to verify the signature in the SAML authentication response

      - `issuer_url: optional string`

        IdP Entity ID or Issuer URL

      - `sign_request: optional boolean`

        Sign the SAML authentication request with Access credentials. To verify the signature, use the public key from the Access certs endpoints.

      - `sso_target_url: optional string`

        URL to send the SAML authentication requests to

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessYandex object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOnetimepin object { config, name, type, 5 more }`

    - `config: object { redirect_url }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `redirect_url: optional string`

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessCloudflare object { config, name, type, 5 more }`

    - `config: object { redirect_url, restrict_to_account_members }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `redirect_url: optional string`

      - `restrict_to_account_members: optional boolean`

        When enabled, only users who are members of your Cloudflare account can authenticate through this identity provider. When disabled, any user with a Cloudflare account can authenticate, subject to your Access policies.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

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

- `result: optional IdentityProvider`

  - `AzureAD object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 5 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `conditional_access_enabled: optional boolean`

        Should Cloudflare try to load authentication contexts from your account

      - `directory_id: optional string`

        Your Azure directory uuid

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `prompt: optional "login" or "select_account" or "none"`

        Indicates the type of user interaction that is required. prompt=login forces the user to enter their credentials on that request, negating single-sign on. prompt=none is the opposite. It ensures that the user isn't presented with any interactive prompt. If the request can't be completed silently by using single-sign on, the Microsoft identity platform returns an interaction_required error. prompt=select_account interrupts single sign-on providing account selection experience listing all the accounts either in session or any remembered account or an option to choose to use a different account altogether.

        - `"login"`

        - `"select_account"`

        - `"none"`

      - `support_groups: optional boolean`

        Should Cloudflare try to load groups from your account

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `"onetimepin"`

      - `"azureAD"`

      - `"saml"`

      - `"centrify"`

      - `"facebook"`

      - `"github"`

      - `"google-apps"`

      - `"google"`

      - `"linkedin"`

      - `"oidc"`

      - `"okta"`

      - `"onelogin"`

      - `"pingone"`

      - `"yandex"`

      - `"cloudflare"`

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

      - `enabled: optional boolean`

        A flag to enable or disable SCIM for the identity provider.

      - `identity_update_behavior: optional "automatic" or "reauth" or "no_action"`

        Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user's identity and augment it with fields from the SCIM user resource. Use "reauth" to force re-authentication on group membership updates, user identity update will only occur after successful re-authentication. With "reauth" identities will not contain fields from the SCIM user resource. With "no_action" identities will not be changed by SCIM updates in any way and users will not be prompted to reauthenticate.

        - `"automatic"`

        - `"reauth"`

        - `"no_action"`

      - `scim_base_url: optional string`

        The base URL of Cloudflare's SCIM V2.0 API endpoint.

      - `seat_deprovision: optional boolean`

        A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user_deprovision is also enabled.

      - `secret: optional string`

        A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests.  If you lose this you will need to refresh it at /access/identity_providers/:idpID/refresh_scim_secret.

      - `user_deprovision: optional boolean`

        A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.

  - `AccessCentrify object { config, name, type, 5 more }`

    - `config: object { centrify_account, centrify_app_id, claims, 3 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `centrify_account: optional string`

        Your centrify account url

      - `centrify_app_id: optional string`

        Your centrify app id

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessFacebook object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGitHub object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGoogle object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, email_claim_name }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGoogleApps object { config, name, type, 5 more }`

    - `config: object { apps_domain, claims, client_id, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `apps_domain: optional string`

        Your companies TLD

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessLinkedin object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOIDC object { config, name, type, 5 more }`

    - `config: object { auth_url, certs_url, claims, 6 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `auth_url: optional string`

        The authorization_endpoint URL of your IdP

      - `certs_url: optional string`

        The jwks_uri endpoint of your IdP to allow the IdP keys to sign the tokens

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `pkce_enabled: optional boolean`

        Enable Proof Key for Code Exchange (PKCE)

      - `scopes: optional array of string`

        OAuth scopes

      - `token_url: optional string`

        The token_endpoint URL of your IdP

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOkta object { config, name, type, 5 more }`

    - `config: object { authorization_server_id, claims, client_id, 3 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `authorization_server_id: optional string`

        Your okta authorization server id

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `okta_account: optional string`

        Your okta account url

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOnelogin object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `onelogin_account: optional string`

        Your OneLogin account url

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessPingone object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `ping_env_id: optional string`

        Your PingOne environment identifier

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessSAML object { config, name, type, 5 more }`

    - `config: object { attributes, email_attribute_name, enable_encryption, 5 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `attributes: optional array of string`

        A list of SAML attribute names that will be added to your signed JWT token and can be used in SAML policy rules.

      - `email_attribute_name: optional string`

        The attribute name for email in the SAML response.

      - `enable_encryption: optional boolean`

        Enable SAML assertion encryption. When enabled, the Identity Provider will encrypt
        SAML assertions using the certificate from the assigned certificate set.

        To enable encryption:

        1. Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`
        1. Set this field to `true` and include `saml_certificate_set_id` in the PUT request
        1. Configure the public certificate in your external Identity Provider

        Note: Requires `saml_certificate_set_id` to be set when `true`.

      - `header_attributes: optional array of object { attribute_name, header_name }`

        Add a list of attribute names that will be returned in the response header from the Access callback.

        - `attribute_name: optional string`

          attribute name from the IDP

        - `header_name: optional string`

          header that will be added on the request to the origin

      - `idp_public_certs: optional array of string`

        X509 certificate to verify the signature in the SAML authentication response

      - `issuer_url: optional string`

        IdP Entity ID or Issuer URL

      - `sign_request: optional boolean`

        Sign the SAML authentication request with Access credentials. To verify the signature, use the public key from the Access certs endpoints.

      - `sso_target_url: optional string`

        URL to send the SAML authentication requests to

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessYandex object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOnetimepin object { config, name, type, 5 more }`

    - `config: object { redirect_url }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `redirect_url: optional string`

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessCloudflare object { config, name, type, 5 more }`

    - `config: object { redirect_url, restrict_to_account_members }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `redirect_url: optional string`

      - `restrict_to_account_members: optional boolean`

        When enabled, only users who are members of your Cloudflare account can authenticate through this identity provider. When disabled, any user with a Cloudflare account can authenticate, subject to your Access policies.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/identity_providers \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "config": {},
          "name": "Widget Corps IDP",
          "type": "onetimepin",
          "saml_certificate_set_id": "c409ef44-e72c-41c8-8c0b-278c8a6f4fd8"
        }'
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
    "config": {
      "claims": [
        "email_verified",
        "preferred_username",
        "custom_claim_name"
      ],
      "client_id": "<your client id>",
      "client_secret": "<your client secret>",
      "conditional_access_enabled": true,
      "directory_id": "<your azure directory uuid>",
      "email_claim_name": "custom_claim_name",
      "prompt": "login",
      "support_groups": true
    },
    "name": "Widget Corps IDP",
    "type": "onetimepin",
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "read_only": true,
    "saml_certificate_set": {
      "created_at": "2026-05-07T19:16:19.821162Z",
      "uid": "c409ef44-e72c-41c8-8c0b-278c8a6f4fd8",
      "updated_at": "2026-05-07T19:16:19.821162Z",
      "current_certificate": {
        "is_current": true,
        "not_after": "2027-05-07T19:11:00Z",
        "public_certificate": "-----BEGIN CERTIFICATE-----\nMIIEpzCCA4+gAwIBAgIUTh2VSDDJ0oB/gabio6j1L9QwWoUwDQYJKoZIhvcNAQEL\n...\n-----END CERTIFICATE-----\n",
        "uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
      },
      "previous_certificate": {}
    },
    "saml_certificate_set_id": "c409ef44-e72c-41c8-8c0b-278c8a6f4fd8",
    "scim_config": {
      "enabled": true,
      "identity_update_behavior": "automatic",
      "scim_base_url": "scim_base_url",
      "seat_deprovision": true,
      "secret": "secret",
      "user_deprovision": true
    }
  }
}
```

## Update an Access identity provider

**put** `/{accounts_or_zones}/{account_or_zone_id}/access/identity_providers/{identity_provider_id}`

Updates a configured identity provider.

### Path Parameters

- `identity_provider_id: string`

  UUID.

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `identity_provider: IdentityProvider`

  - `AzureAD object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 5 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `conditional_access_enabled: optional boolean`

        Should Cloudflare try to load authentication contexts from your account

      - `directory_id: optional string`

        Your Azure directory uuid

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `prompt: optional "login" or "select_account" or "none"`

        Indicates the type of user interaction that is required. prompt=login forces the user to enter their credentials on that request, negating single-sign on. prompt=none is the opposite. It ensures that the user isn't presented with any interactive prompt. If the request can't be completed silently by using single-sign on, the Microsoft identity platform returns an interaction_required error. prompt=select_account interrupts single sign-on providing account selection experience listing all the accounts either in session or any remembered account or an option to choose to use a different account altogether.

        - `"login"`

        - `"select_account"`

        - `"none"`

      - `support_groups: optional boolean`

        Should Cloudflare try to load groups from your account

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `"onetimepin"`

      - `"azureAD"`

      - `"saml"`

      - `"centrify"`

      - `"facebook"`

      - `"github"`

      - `"google-apps"`

      - `"google"`

      - `"linkedin"`

      - `"oidc"`

      - `"okta"`

      - `"onelogin"`

      - `"pingone"`

      - `"yandex"`

      - `"cloudflare"`

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

      - `enabled: optional boolean`

        A flag to enable or disable SCIM for the identity provider.

      - `identity_update_behavior: optional "automatic" or "reauth" or "no_action"`

        Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user's identity and augment it with fields from the SCIM user resource. Use "reauth" to force re-authentication on group membership updates, user identity update will only occur after successful re-authentication. With "reauth" identities will not contain fields from the SCIM user resource. With "no_action" identities will not be changed by SCIM updates in any way and users will not be prompted to reauthenticate.

        - `"automatic"`

        - `"reauth"`

        - `"no_action"`

      - `scim_base_url: optional string`

        The base URL of Cloudflare's SCIM V2.0 API endpoint.

      - `seat_deprovision: optional boolean`

        A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user_deprovision is also enabled.

      - `secret: optional string`

        A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests.  If you lose this you will need to refresh it at /access/identity_providers/:idpID/refresh_scim_secret.

      - `user_deprovision: optional boolean`

        A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.

  - `AccessCentrify object { config, name, type, 5 more }`

    - `config: object { centrify_account, centrify_app_id, claims, 3 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `centrify_account: optional string`

        Your centrify account url

      - `centrify_app_id: optional string`

        Your centrify app id

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessFacebook object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGitHub object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGoogle object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, email_claim_name }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGoogleApps object { config, name, type, 5 more }`

    - `config: object { apps_domain, claims, client_id, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `apps_domain: optional string`

        Your companies TLD

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessLinkedin object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOIDC object { config, name, type, 5 more }`

    - `config: object { auth_url, certs_url, claims, 6 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `auth_url: optional string`

        The authorization_endpoint URL of your IdP

      - `certs_url: optional string`

        The jwks_uri endpoint of your IdP to allow the IdP keys to sign the tokens

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `pkce_enabled: optional boolean`

        Enable Proof Key for Code Exchange (PKCE)

      - `scopes: optional array of string`

        OAuth scopes

      - `token_url: optional string`

        The token_endpoint URL of your IdP

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOkta object { config, name, type, 5 more }`

    - `config: object { authorization_server_id, claims, client_id, 3 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `authorization_server_id: optional string`

        Your okta authorization server id

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `okta_account: optional string`

        Your okta account url

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOnelogin object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `onelogin_account: optional string`

        Your OneLogin account url

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessPingone object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `ping_env_id: optional string`

        Your PingOne environment identifier

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessSAML object { config, name, type, 5 more }`

    - `config: object { attributes, email_attribute_name, enable_encryption, 5 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `attributes: optional array of string`

        A list of SAML attribute names that will be added to your signed JWT token and can be used in SAML policy rules.

      - `email_attribute_name: optional string`

        The attribute name for email in the SAML response.

      - `enable_encryption: optional boolean`

        Enable SAML assertion encryption. When enabled, the Identity Provider will encrypt
        SAML assertions using the certificate from the assigned certificate set.

        To enable encryption:

        1. Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`
        1. Set this field to `true` and include `saml_certificate_set_id` in the PUT request
        1. Configure the public certificate in your external Identity Provider

        Note: Requires `saml_certificate_set_id` to be set when `true`.

      - `header_attributes: optional array of object { attribute_name, header_name }`

        Add a list of attribute names that will be returned in the response header from the Access callback.

        - `attribute_name: optional string`

          attribute name from the IDP

        - `header_name: optional string`

          header that will be added on the request to the origin

      - `idp_public_certs: optional array of string`

        X509 certificate to verify the signature in the SAML authentication response

      - `issuer_url: optional string`

        IdP Entity ID or Issuer URL

      - `sign_request: optional boolean`

        Sign the SAML authentication request with Access credentials. To verify the signature, use the public key from the Access certs endpoints.

      - `sso_target_url: optional string`

        URL to send the SAML authentication requests to

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessYandex object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOnetimepin object { config, name, type, 5 more }`

    - `config: object { redirect_url }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `redirect_url: optional string`

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessCloudflare object { config, name, type, 5 more }`

    - `config: object { redirect_url, restrict_to_account_members }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `redirect_url: optional string`

      - `restrict_to_account_members: optional boolean`

        When enabled, only users who are members of your Cloudflare account can authenticate through this identity provider. When disabled, any user with a Cloudflare account can authenticate, subject to your Access policies.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

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

- `result: optional IdentityProvider`

  - `AzureAD object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 5 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `conditional_access_enabled: optional boolean`

        Should Cloudflare try to load authentication contexts from your account

      - `directory_id: optional string`

        Your Azure directory uuid

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `prompt: optional "login" or "select_account" or "none"`

        Indicates the type of user interaction that is required. prompt=login forces the user to enter their credentials on that request, negating single-sign on. prompt=none is the opposite. It ensures that the user isn't presented with any interactive prompt. If the request can't be completed silently by using single-sign on, the Microsoft identity platform returns an interaction_required error. prompt=select_account interrupts single sign-on providing account selection experience listing all the accounts either in session or any remembered account or an option to choose to use a different account altogether.

        - `"login"`

        - `"select_account"`

        - `"none"`

      - `support_groups: optional boolean`

        Should Cloudflare try to load groups from your account

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `"onetimepin"`

      - `"azureAD"`

      - `"saml"`

      - `"centrify"`

      - `"facebook"`

      - `"github"`

      - `"google-apps"`

      - `"google"`

      - `"linkedin"`

      - `"oidc"`

      - `"okta"`

      - `"onelogin"`

      - `"pingone"`

      - `"yandex"`

      - `"cloudflare"`

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

      - `enabled: optional boolean`

        A flag to enable or disable SCIM for the identity provider.

      - `identity_update_behavior: optional "automatic" or "reauth" or "no_action"`

        Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user's identity and augment it with fields from the SCIM user resource. Use "reauth" to force re-authentication on group membership updates, user identity update will only occur after successful re-authentication. With "reauth" identities will not contain fields from the SCIM user resource. With "no_action" identities will not be changed by SCIM updates in any way and users will not be prompted to reauthenticate.

        - `"automatic"`

        - `"reauth"`

        - `"no_action"`

      - `scim_base_url: optional string`

        The base URL of Cloudflare's SCIM V2.0 API endpoint.

      - `seat_deprovision: optional boolean`

        A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user_deprovision is also enabled.

      - `secret: optional string`

        A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests.  If you lose this you will need to refresh it at /access/identity_providers/:idpID/refresh_scim_secret.

      - `user_deprovision: optional boolean`

        A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.

  - `AccessCentrify object { config, name, type, 5 more }`

    - `config: object { centrify_account, centrify_app_id, claims, 3 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `centrify_account: optional string`

        Your centrify account url

      - `centrify_app_id: optional string`

        Your centrify app id

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessFacebook object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGitHub object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGoogle object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, email_claim_name }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGoogleApps object { config, name, type, 5 more }`

    - `config: object { apps_domain, claims, client_id, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `apps_domain: optional string`

        Your companies TLD

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessLinkedin object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOIDC object { config, name, type, 5 more }`

    - `config: object { auth_url, certs_url, claims, 6 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `auth_url: optional string`

        The authorization_endpoint URL of your IdP

      - `certs_url: optional string`

        The jwks_uri endpoint of your IdP to allow the IdP keys to sign the tokens

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `pkce_enabled: optional boolean`

        Enable Proof Key for Code Exchange (PKCE)

      - `scopes: optional array of string`

        OAuth scopes

      - `token_url: optional string`

        The token_endpoint URL of your IdP

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOkta object { config, name, type, 5 more }`

    - `config: object { authorization_server_id, claims, client_id, 3 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `authorization_server_id: optional string`

        Your okta authorization server id

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `okta_account: optional string`

        Your okta account url

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOnelogin object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `onelogin_account: optional string`

        Your OneLogin account url

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessPingone object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `ping_env_id: optional string`

        Your PingOne environment identifier

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessSAML object { config, name, type, 5 more }`

    - `config: object { attributes, email_attribute_name, enable_encryption, 5 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `attributes: optional array of string`

        A list of SAML attribute names that will be added to your signed JWT token and can be used in SAML policy rules.

      - `email_attribute_name: optional string`

        The attribute name for email in the SAML response.

      - `enable_encryption: optional boolean`

        Enable SAML assertion encryption. When enabled, the Identity Provider will encrypt
        SAML assertions using the certificate from the assigned certificate set.

        To enable encryption:

        1. Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`
        1. Set this field to `true` and include `saml_certificate_set_id` in the PUT request
        1. Configure the public certificate in your external Identity Provider

        Note: Requires `saml_certificate_set_id` to be set when `true`.

      - `header_attributes: optional array of object { attribute_name, header_name }`

        Add a list of attribute names that will be returned in the response header from the Access callback.

        - `attribute_name: optional string`

          attribute name from the IDP

        - `header_name: optional string`

          header that will be added on the request to the origin

      - `idp_public_certs: optional array of string`

        X509 certificate to verify the signature in the SAML authentication response

      - `issuer_url: optional string`

        IdP Entity ID or Issuer URL

      - `sign_request: optional boolean`

        Sign the SAML authentication request with Access credentials. To verify the signature, use the public key from the Access certs endpoints.

      - `sso_target_url: optional string`

        URL to send the SAML authentication requests to

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessYandex object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOnetimepin object { config, name, type, 5 more }`

    - `config: object { redirect_url }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `redirect_url: optional string`

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessCloudflare object { config, name, type, 5 more }`

    - `config: object { redirect_url, restrict_to_account_members }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `redirect_url: optional string`

      - `restrict_to_account_members: optional boolean`

        When enabled, only users who are members of your Cloudflare account can authenticate through this identity provider. When disabled, any user with a Cloudflare account can authenticate, subject to your Access policies.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/identity_providers/$IDENTITY_PROVIDER_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "config": {},
          "name": "Widget Corps IDP",
          "type": "onetimepin",
          "saml_certificate_set_id": "c409ef44-e72c-41c8-8c0b-278c8a6f4fd8"
        }'
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
    "config": {
      "claims": [
        "email_verified",
        "preferred_username",
        "custom_claim_name"
      ],
      "client_id": "<your client id>",
      "client_secret": "<your client secret>",
      "conditional_access_enabled": true,
      "directory_id": "<your azure directory uuid>",
      "email_claim_name": "custom_claim_name",
      "prompt": "login",
      "support_groups": true
    },
    "name": "Widget Corps IDP",
    "type": "onetimepin",
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "read_only": true,
    "saml_certificate_set": {
      "created_at": "2026-05-07T19:16:19.821162Z",
      "uid": "c409ef44-e72c-41c8-8c0b-278c8a6f4fd8",
      "updated_at": "2026-05-07T19:16:19.821162Z",
      "current_certificate": {
        "is_current": true,
        "not_after": "2027-05-07T19:11:00Z",
        "public_certificate": "-----BEGIN CERTIFICATE-----\nMIIEpzCCA4+gAwIBAgIUTh2VSDDJ0oB/gabio6j1L9QwWoUwDQYJKoZIhvcNAQEL\n...\n-----END CERTIFICATE-----\n",
        "uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
      },
      "previous_certificate": {}
    },
    "saml_certificate_set_id": "c409ef44-e72c-41c8-8c0b-278c8a6f4fd8",
    "scim_config": {
      "enabled": true,
      "identity_update_behavior": "automatic",
      "scim_base_url": "scim_base_url",
      "seat_deprovision": true,
      "secret": "secret",
      "user_deprovision": true
    }
  }
}
```

## Delete an Access identity provider

**delete** `/{accounts_or_zones}/{account_or_zone_id}/access/identity_providers/{identity_provider_id}`

Deletes an identity provider from Access.

### Path Parameters

- `identity_provider_id: string`

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

- `result: optional object { id }`

  - `id: optional string`

    UUID.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/identity_providers/$IDENTITY_PROVIDER_ID \
    -X DELETE \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
  }
}
```

## Domain Types

### Azure AD

- `AzureAD object { config, name, type, 5 more }`

  - `config: object { claims, client_id, client_secret, 5 more }`

    The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `claims: optional array of string`

      Custom claims

    - `client_id: optional string`

      Your OAuth Client ID

    - `client_secret: optional string`

      Your OAuth Client Secret

    - `conditional_access_enabled: optional boolean`

      Should Cloudflare try to load authentication contexts from your account

    - `directory_id: optional string`

      Your Azure directory uuid

    - `email_claim_name: optional string`

      The claim name for email in the id_token response.

    - `prompt: optional "login" or "select_account" or "none"`

      Indicates the type of user interaction that is required. prompt=login forces the user to enter their credentials on that request, negating single-sign on. prompt=none is the opposite. It ensures that the user isn't presented with any interactive prompt. If the request can't be completed silently by using single-sign on, the Microsoft identity platform returns an interaction_required error. prompt=select_account interrupts single sign-on providing account selection experience listing all the accounts either in session or any remembered account or an option to choose to use a different account altogether.

      - `"login"`

      - `"select_account"`

      - `"none"`

    - `support_groups: optional boolean`

      Should Cloudflare try to load groups from your account

  - `name: string`

    The name of the identity provider, shown to users on the login page.

  - `type: IdentityProviderType`

    The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `"onetimepin"`

    - `"azureAD"`

    - `"saml"`

    - `"centrify"`

    - `"facebook"`

    - `"github"`

    - `"google-apps"`

    - `"google"`

    - `"linkedin"`

    - `"oidc"`

    - `"okta"`

    - `"onelogin"`

    - `"pingone"`

    - `"yandex"`

    - `"cloudflare"`

  - `id: optional string`

    UUID.

  - `read_only: optional boolean`

    Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

  - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

    The SAML encryption certificate set details, including current and previous certificates.
    Only present for SAML identity providers with a certificate set assigned.

    - `created_at: string`

      Timestamp when the certificate set was created

    - `uid: string`

      Unique identifier for the certificate set

    - `updated_at: string`

      Timestamp when the certificate set was last updated (e.g., during rotation)

    - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

      The currently active certificate used for encrypting SAML assertions

      - `is_current: boolean`

        Indicates whether this is the currently active certificate

      - `not_after: string`

        Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

      - `public_certificate: string`

        PEM-encoded X.509 certificate containing the public key.
        Configure this certificate in your external SAML Identity Provider to enable encryption.

      - `uid: string`

        Unique identifier for the certificate

    - `previous_certificate: optional unknown`

      The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

  - `saml_certificate_set_id: optional string`

    The UID of the SAML encryption certificate set assigned to this Identity Provider.
    Only present for SAML identity providers with encryption configured.
    Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

  - `scim_config: optional IdentityProviderSCIMConfig`

    The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

    - `enabled: optional boolean`

      A flag to enable or disable SCIM for the identity provider.

    - `identity_update_behavior: optional "automatic" or "reauth" or "no_action"`

      Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user's identity and augment it with fields from the SCIM user resource. Use "reauth" to force re-authentication on group membership updates, user identity update will only occur after successful re-authentication. With "reauth" identities will not contain fields from the SCIM user resource. With "no_action" identities will not be changed by SCIM updates in any way and users will not be prompted to reauthenticate.

      - `"automatic"`

      - `"reauth"`

      - `"no_action"`

    - `scim_base_url: optional string`

      The base URL of Cloudflare's SCIM V2.0 API endpoint.

    - `seat_deprovision: optional boolean`

      A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user_deprovision is also enabled.

    - `secret: optional string`

      A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests.  If you lose this you will need to refresh it at /access/identity_providers/:idpID/refresh_scim_secret.

    - `user_deprovision: optional boolean`

      A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.

### Generic OAuth Config

- `GenericOAuthConfig object { client_id, client_secret }`

  - `client_id: optional string`

    Your OAuth Client ID

  - `client_secret: optional string`

    Your OAuth Client Secret

### Identity Provider

- `IdentityProvider = AzureAD or object { config, name, type, 5 more }  or object { config, name, type, 5 more }  or 12 more`

  - `AzureAD object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 5 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `conditional_access_enabled: optional boolean`

        Should Cloudflare try to load authentication contexts from your account

      - `directory_id: optional string`

        Your Azure directory uuid

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `prompt: optional "login" or "select_account" or "none"`

        Indicates the type of user interaction that is required. prompt=login forces the user to enter their credentials on that request, negating single-sign on. prompt=none is the opposite. It ensures that the user isn't presented with any interactive prompt. If the request can't be completed silently by using single-sign on, the Microsoft identity platform returns an interaction_required error. prompt=select_account interrupts single sign-on providing account selection experience listing all the accounts either in session or any remembered account or an option to choose to use a different account altogether.

        - `"login"`

        - `"select_account"`

        - `"none"`

      - `support_groups: optional boolean`

        Should Cloudflare try to load groups from your account

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `"onetimepin"`

      - `"azureAD"`

      - `"saml"`

      - `"centrify"`

      - `"facebook"`

      - `"github"`

      - `"google-apps"`

      - `"google"`

      - `"linkedin"`

      - `"oidc"`

      - `"okta"`

      - `"onelogin"`

      - `"pingone"`

      - `"yandex"`

      - `"cloudflare"`

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

      - `enabled: optional boolean`

        A flag to enable or disable SCIM for the identity provider.

      - `identity_update_behavior: optional "automatic" or "reauth" or "no_action"`

        Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user's identity and augment it with fields from the SCIM user resource. Use "reauth" to force re-authentication on group membership updates, user identity update will only occur after successful re-authentication. With "reauth" identities will not contain fields from the SCIM user resource. With "no_action" identities will not be changed by SCIM updates in any way and users will not be prompted to reauthenticate.

        - `"automatic"`

        - `"reauth"`

        - `"no_action"`

      - `scim_base_url: optional string`

        The base URL of Cloudflare's SCIM V2.0 API endpoint.

      - `seat_deprovision: optional boolean`

        A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user_deprovision is also enabled.

      - `secret: optional string`

        A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests.  If you lose this you will need to refresh it at /access/identity_providers/:idpID/refresh_scim_secret.

      - `user_deprovision: optional boolean`

        A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.

  - `AccessCentrify object { config, name, type, 5 more }`

    - `config: object { centrify_account, centrify_app_id, claims, 3 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `centrify_account: optional string`

        Your centrify account url

      - `centrify_app_id: optional string`

        Your centrify app id

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessFacebook object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGitHub object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGoogle object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, email_claim_name }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGoogleApps object { config, name, type, 5 more }`

    - `config: object { apps_domain, claims, client_id, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `apps_domain: optional string`

        Your companies TLD

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessLinkedin object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOIDC object { config, name, type, 5 more }`

    - `config: object { auth_url, certs_url, claims, 6 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `auth_url: optional string`

        The authorization_endpoint URL of your IdP

      - `certs_url: optional string`

        The jwks_uri endpoint of your IdP to allow the IdP keys to sign the tokens

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `pkce_enabled: optional boolean`

        Enable Proof Key for Code Exchange (PKCE)

      - `scopes: optional array of string`

        OAuth scopes

      - `token_url: optional string`

        The token_endpoint URL of your IdP

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOkta object { config, name, type, 5 more }`

    - `config: object { authorization_server_id, claims, client_id, 3 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `authorization_server_id: optional string`

        Your okta authorization server id

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `okta_account: optional string`

        Your okta account url

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOnelogin object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `onelogin_account: optional string`

        Your OneLogin account url

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessPingone object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `ping_env_id: optional string`

        Your PingOne environment identifier

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessSAML object { config, name, type, 5 more }`

    - `config: object { attributes, email_attribute_name, enable_encryption, 5 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `attributes: optional array of string`

        A list of SAML attribute names that will be added to your signed JWT token and can be used in SAML policy rules.

      - `email_attribute_name: optional string`

        The attribute name for email in the SAML response.

      - `enable_encryption: optional boolean`

        Enable SAML assertion encryption. When enabled, the Identity Provider will encrypt
        SAML assertions using the certificate from the assigned certificate set.

        To enable encryption:

        1. Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`
        1. Set this field to `true` and include `saml_certificate_set_id` in the PUT request
        1. Configure the public certificate in your external Identity Provider

        Note: Requires `saml_certificate_set_id` to be set when `true`.

      - `header_attributes: optional array of object { attribute_name, header_name }`

        Add a list of attribute names that will be returned in the response header from the Access callback.

        - `attribute_name: optional string`

          attribute name from the IDP

        - `header_name: optional string`

          header that will be added on the request to the origin

      - `idp_public_certs: optional array of string`

        X509 certificate to verify the signature in the SAML authentication response

      - `issuer_url: optional string`

        IdP Entity ID or Issuer URL

      - `sign_request: optional boolean`

        Sign the SAML authentication request with Access credentials. To verify the signature, use the public key from the Access certs endpoints.

      - `sso_target_url: optional string`

        URL to send the SAML authentication requests to

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessYandex object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOnetimepin object { config, name, type, 5 more }`

    - `config: object { redirect_url }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `redirect_url: optional string`

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessCloudflare object { config, name, type, 5 more }`

    - `config: object { redirect_url, restrict_to_account_members }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `redirect_url: optional string`

      - `restrict_to_account_members: optional boolean`

        When enabled, only users who are members of your Cloudflare account can authenticate through this identity provider. When disabled, any user with a Cloudflare account can authenticate, subject to your Access policies.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

### Identity Provider SCIM Config

- `IdentityProviderSCIMConfig object { enabled, identity_update_behavior, scim_base_url, 3 more }`

  The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `enabled: optional boolean`

    A flag to enable or disable SCIM for the identity provider.

  - `identity_update_behavior: optional "automatic" or "reauth" or "no_action"`

    Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user's identity and augment it with fields from the SCIM user resource. Use "reauth" to force re-authentication on group membership updates, user identity update will only occur after successful re-authentication. With "reauth" identities will not contain fields from the SCIM user resource. With "no_action" identities will not be changed by SCIM updates in any way and users will not be prompted to reauthenticate.

    - `"automatic"`

    - `"reauth"`

    - `"no_action"`

  - `scim_base_url: optional string`

    The base URL of Cloudflare's SCIM V2.0 API endpoint.

  - `seat_deprovision: optional boolean`

    A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user_deprovision is also enabled.

  - `secret: optional string`

    A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests.  If you lose this you will need to refresh it at /access/identity_providers/:idpID/refresh_scim_secret.

  - `user_deprovision: optional boolean`

    A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.

### Identity Provider Type

- `IdentityProviderType = "onetimepin" or "azureAD" or "saml" or 12 more`

  The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

  - `"onetimepin"`

  - `"azureAD"`

  - `"saml"`

  - `"centrify"`

  - `"facebook"`

  - `"github"`

  - `"google-apps"`

  - `"google"`

  - `"linkedin"`

  - `"oidc"`

  - `"okta"`

  - `"onelogin"`

  - `"pingone"`

  - `"yandex"`

  - `"cloudflare"`

### Identity Provider List Response

- `IdentityProviderListResponse = AzureAD or object { config, name, type, 5 more }  or object { config, name, type, 5 more }  or 12 more`

  - `AzureAD object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 5 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `conditional_access_enabled: optional boolean`

        Should Cloudflare try to load authentication contexts from your account

      - `directory_id: optional string`

        Your Azure directory uuid

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `prompt: optional "login" or "select_account" or "none"`

        Indicates the type of user interaction that is required. prompt=login forces the user to enter their credentials on that request, negating single-sign on. prompt=none is the opposite. It ensures that the user isn't presented with any interactive prompt. If the request can't be completed silently by using single-sign on, the Microsoft identity platform returns an interaction_required error. prompt=select_account interrupts single sign-on providing account selection experience listing all the accounts either in session or any remembered account or an option to choose to use a different account altogether.

        - `"login"`

        - `"select_account"`

        - `"none"`

      - `support_groups: optional boolean`

        Should Cloudflare try to load groups from your account

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `"onetimepin"`

      - `"azureAD"`

      - `"saml"`

      - `"centrify"`

      - `"facebook"`

      - `"github"`

      - `"google-apps"`

      - `"google"`

      - `"linkedin"`

      - `"oidc"`

      - `"okta"`

      - `"onelogin"`

      - `"pingone"`

      - `"yandex"`

      - `"cloudflare"`

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

      - `enabled: optional boolean`

        A flag to enable or disable SCIM for the identity provider.

      - `identity_update_behavior: optional "automatic" or "reauth" or "no_action"`

        Indicates how a SCIM event updates a user identity used for policy evaluation. Use "automatic" to automatically update a user's identity and augment it with fields from the SCIM user resource. Use "reauth" to force re-authentication on group membership updates, user identity update will only occur after successful re-authentication. With "reauth" identities will not contain fields from the SCIM user resource. With "no_action" identities will not be changed by SCIM updates in any way and users will not be prompted to reauthenticate.

        - `"automatic"`

        - `"reauth"`

        - `"no_action"`

      - `scim_base_url: optional string`

        The base URL of Cloudflare's SCIM V2.0 API endpoint.

      - `seat_deprovision: optional boolean`

        A flag to remove a user's seat in Zero Trust when they have been deprovisioned in the Identity Provider.  This cannot be enabled unless user_deprovision is also enabled.

      - `secret: optional string`

        A read-only token generated when the SCIM integration is enabled for the first time.  It is redacted on subsequent requests.  If you lose this you will need to refresh it at /access/identity_providers/:idpID/refresh_scim_secret.

      - `user_deprovision: optional boolean`

        A flag to enable revoking a user's session in Access and Gateway when they have been deprovisioned in the Identity Provider.

  - `AccessCentrify object { config, name, type, 5 more }`

    - `config: object { centrify_account, centrify_app_id, claims, 3 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `centrify_account: optional string`

        Your centrify account url

      - `centrify_app_id: optional string`

        Your centrify app id

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessFacebook object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGitHub object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGoogle object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, email_claim_name }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessGoogleApps object { config, name, type, 5 more }`

    - `config: object { apps_domain, claims, client_id, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `apps_domain: optional string`

        Your companies TLD

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessLinkedin object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOIDC object { config, name, type, 5 more }`

    - `config: object { auth_url, certs_url, claims, 6 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `auth_url: optional string`

        The authorization_endpoint URL of your IdP

      - `certs_url: optional string`

        The jwks_uri endpoint of your IdP to allow the IdP keys to sign the tokens

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `pkce_enabled: optional boolean`

        Enable Proof Key for Code Exchange (PKCE)

      - `scopes: optional array of string`

        OAuth scopes

      - `token_url: optional string`

        The token_endpoint URL of your IdP

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOkta object { config, name, type, 5 more }`

    - `config: object { authorization_server_id, claims, client_id, 3 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `authorization_server_id: optional string`

        Your okta authorization server id

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `okta_account: optional string`

        Your okta account url

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOnelogin object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `onelogin_account: optional string`

        Your OneLogin account url

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessPingone object { config, name, type, 5 more }`

    - `config: object { claims, client_id, client_secret, 2 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `claims: optional array of string`

        Custom claims

      - `client_id: optional string`

        Your OAuth Client ID

      - `client_secret: optional string`

        Your OAuth Client Secret

      - `email_claim_name: optional string`

        The claim name for email in the id_token response.

      - `ping_env_id: optional string`

        Your PingOne environment identifier

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessSAML object { config, name, type, 5 more }`

    - `config: object { attributes, email_attribute_name, enable_encryption, 5 more }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `attributes: optional array of string`

        A list of SAML attribute names that will be added to your signed JWT token and can be used in SAML policy rules.

      - `email_attribute_name: optional string`

        The attribute name for email in the SAML response.

      - `enable_encryption: optional boolean`

        Enable SAML assertion encryption. When enabled, the Identity Provider will encrypt
        SAML assertions using the certificate from the assigned certificate set.

        To enable encryption:

        1. Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`
        1. Set this field to `true` and include `saml_certificate_set_id` in the PUT request
        1. Configure the public certificate in your external Identity Provider

        Note: Requires `saml_certificate_set_id` to be set when `true`.

      - `header_attributes: optional array of object { attribute_name, header_name }`

        Add a list of attribute names that will be returned in the response header from the Access callback.

        - `attribute_name: optional string`

          attribute name from the IDP

        - `header_name: optional string`

          header that will be added on the request to the origin

      - `idp_public_certs: optional array of string`

        X509 certificate to verify the signature in the SAML authentication response

      - `issuer_url: optional string`

        IdP Entity ID or Issuer URL

      - `sign_request: optional boolean`

        Sign the SAML authentication request with Access credentials. To verify the signature, use the public key from the Access certs endpoints.

      - `sso_target_url: optional string`

        URL to send the SAML authentication requests to

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessYandex object { config, name, type, 5 more }`

    - `config: GenericOAuthConfig`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessOnetimepin object { config, name, type, 5 more }`

    - `config: object { redirect_url }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `redirect_url: optional string`

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

  - `AccessCloudflare object { config, name, type, 5 more }`

    - `config: object { redirect_url, restrict_to_account_members }`

      The configuration parameters for the identity provider. To view the required parameters for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

      - `redirect_url: optional string`

      - `restrict_to_account_members: optional boolean`

        When enabled, only users who are members of your Cloudflare account can authenticate through this identity provider. When disabled, any user with a Cloudflare account can authenticate, subject to your Access policies.

    - `name: string`

      The name of the identity provider, shown to users on the login page.

    - `type: IdentityProviderType`

      The type of identity provider. To determine the value for a specific provider, refer to our [developer documentation](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/).

    - `id: optional string`

      UUID.

    - `read_only: optional boolean`

      Indicates that the identity provider is immutable and cannot be updated or deleted via the API.

    - `saml_certificate_set: optional object { created_at, uid, updated_at, 2 more }`

      The SAML encryption certificate set details, including current and previous certificates.
      Only present for SAML identity providers with a certificate set assigned.

      - `created_at: string`

        Timestamp when the certificate set was created

      - `uid: string`

        Unique identifier for the certificate set

      - `updated_at: string`

        Timestamp when the certificate set was last updated (e.g., during rotation)

      - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

        The currently active certificate used for encrypting SAML assertions

        - `is_current: boolean`

          Indicates whether this is the currently active certificate

        - `not_after: string`

          Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

        - `public_certificate: string`

          PEM-encoded X.509 certificate containing the public key.
          Configure this certificate in your external SAML Identity Provider to enable encryption.

        - `uid: string`

          Unique identifier for the certificate

      - `previous_certificate: optional unknown`

        The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

    - `saml_certificate_set_id: optional string`

      The UID of the SAML encryption certificate set assigned to this Identity Provider.
      Only present for SAML identity providers with encryption configured.
      Create a certificate set via POST to `/identity_providers/{id}/saml_certificate`.

    - `scim_config: optional IdentityProviderSCIMConfig`

      The configuration settings for enabling a System for Cross-Domain Identity Management (SCIM) with the identity provider.

### Identity Provider Delete Response

- `IdentityProviderDeleteResponse object { id }`

  - `id: optional string`

    UUID.

# SCIM

# Groups

## List SCIM Group resources

**get** `/accounts/{account_id}/access/identity_providers/{identity_provider_id}/scim/groups`

Lists SCIM Group resources synced to Cloudflare via the System for Cross-domain Identity Management (SCIM).

### Path Parameters

- `account_id: string`

  Identifier.

- `identity_provider_id: string`

  UUID.

### Query Parameters

- `cf_resource_id: optional array of string`

  The unique Cloudflare-generated Id of the SCIM Group resource; also known as the "Id".
  Pass once for a single lookup (`?cf_resource_id=A`) or repeat the parameter
  (`?cf_resource_id=A&cf_resource_id=B`) to look up multiple groups in one request,
  up to 50 values. Mutually exclusive with `idp_resource_id`, `name`,
  `search_contains`, and `search_starts_with`.

- `idp_resource_id: optional array of string`

  The IdP-generated Id of the SCIM Group resource; also known as the "external Id".
  Pass once for a single lookup (`?idp_resource_id=A`) or repeat the parameter
  (`?idp_resource_id=A&idp_resource_id=B`) to look up multiple groups in one request,
  up to 50 values. Mutually exclusive with `cf_resource_id`, `name`,
  `search_contains`, and `search_starts_with`.

- `name: optional string`

  The display name of the SCIM Group resource.

- `page: optional number`

  Page number of results.

- `per_page: optional number`

  Number of results per page.

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

- `result: optional array of ZeroTrustGroup`

  - `id: optional string`

    The unique Cloudflare-generated Id of the SCIM resource.

  - `displayName: optional string`

    The display name of the SCIM Group resource.

  - `externalId: optional string`

    The IdP-generated Id of the SCIM resource.

  - `meta: optional object { created, lastModified }`

    The metadata of the SCIM resource.

    - `created: optional string`

      The timestamp of when the SCIM resource was created.

    - `lastModified: optional string`

      The timestamp of when the SCIM resource was last modified.

  - `schemas: optional array of string`

    The list of URIs which indicate the attributes contained within a SCIM resource.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/identity_providers/$IDENTITY_PROVIDER_ID/scim/groups \
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
      "id": "bd97ef8d-7986-43e3-9ee0-c25dda33e4b0",
      "displayName": "ALL EMPLOYEES",
      "externalId": "all_employees",
      "meta": {
        "created": "2025-01-01T00:00:00Z",
        "lastModified": "2025-01-02T00:00:00Z"
      },
      "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:Group"
      ]
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

# Users

## List SCIM User resources

**get** `/accounts/{account_id}/access/identity_providers/{identity_provider_id}/scim/users`

Lists SCIM User resources synced to Cloudflare via the System for Cross-domain Identity Management (SCIM).

### Path Parameters

- `account_id: string`

  Identifier.

- `identity_provider_id: string`

  UUID.

### Query Parameters

- `cf_resource_id: optional array of string`

  The unique Cloudflare-generated Id of the SCIM User resource; also known as the "Id".
  Pass once for a single lookup (`?cf_resource_id=A`) or repeat the parameter
  (`?cf_resource_id=A&cf_resource_id=B`) to look up multiple users in one request,
  up to 50 values. Mutually exclusive with `idp_resource_id`, `username`, `email`,
  `name`, `search_contains`, and `search_starts_with`.

- `email: optional string`

  The email address of the SCIM User resource.

- `idp_resource_id: optional array of string`

  The IdP-generated Id of the SCIM User resource; also known as the "external Id".
  Pass once for a single lookup (`?idp_resource_id=A`) or repeat the parameter
  (`?idp_resource_id=A&idp_resource_id=B`) to look up multiple users in one request,
  up to 50 values. Mutually exclusive with `cf_resource_id`, `username`, `email`,
  `name`, `search_contains`, and `search_starts_with`.

- `name: optional string`

  The name of the SCIM User resource.

- `page: optional number`

  Page number of results.

- `per_page: optional number`

  Number of results per page.

- `username: optional string`

  The username of the SCIM User resource.

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

- `result: optional array of AccessUser`

  - `id: optional string`

    The unique Cloudflare-generated Id of the SCIM resource.

  - `active: optional boolean`

    Determines the status of the SCIM User resource.

  - `displayName: optional string`

    The name of the SCIM User resource.

  - `emails: optional array of object { primary, type, value }`

    - `primary: optional boolean`

      Indicates if the email address is the primary email belonging to the SCIM User resource.

    - `type: optional string`

      Indicates the type of the email address.

    - `value: optional string`

      The email address of the SCIM User resource.

  - `externalId: optional string`

    The IdP-generated Id of the SCIM resource.

  - `meta: optional object { created, lastModified }`

    The metadata of the SCIM resource.

    - `created: optional string`

      The timestamp of when the SCIM resource was created.

    - `lastModified: optional string`

      The timestamp of when the SCIM resource was last modified.

  - `schemas: optional array of string`

    The list of URIs which indicate the attributes contained within a SCIM resource.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/identity_providers/$IDENTITY_PROVIDER_ID/scim/users \
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
      "id": "bd97ef8d-7986-43e3-9ee0-c25dda33e4b0",
      "active": true,
      "displayName": "John Smith",
      "emails": [
        {
          "primary": true,
          "type": "work",
          "value": "john.smith@example.com"
        }
      ],
      "externalId": "john_smith",
      "meta": {
        "created": "2025-01-01T00:00:00Z",
        "lastModified": "2025-01-02T00:00:00Z"
      },
      "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User"
      ]
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

# SAML Certificate

## Create SAML encryption certificate for Identity Provider

**post** `/accounts/{account_id}/access/identity_providers/{identity_provider_id}/saml_certificate`

Creates a new SAML encryption certificate set and assigns it to the specified
SAML Identity Provider. This endpoint is idempotent - if the IdP already has
a certificate set assigned, the existing certificate set is returned with a 200 status.

**Workflow for enabling SAML encryption:**

1. Call this endpoint to create and assign a certificate set to the IdP
1. Update the IdP configuration (PUT `/identity_providers/{id}`) with:
   - `config.enable_encryption: true`
   - `saml_certificate_set_id: <uid from step 1>`
1. Configure the certificate's public key in your external SAML Identity Provider

### Path Parameters

- `account_id: string`

  Identifier.

- `identity_provider_id: string`

  UUID.

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

- `result: optional object { created_at, uid, updated_at, 2 more }`

  A SAML encryption certificate set containing current and optionally previous certificates for encryption key rotation.

  - `created_at: string`

    Timestamp when the certificate set was created

  - `uid: string`

    Unique identifier for the certificate set

  - `updated_at: string`

    Timestamp when the certificate set was last updated (e.g., during rotation)

  - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

    The currently active certificate used for encrypting SAML assertions

    - `is_current: boolean`

      Indicates whether this is the currently active certificate

    - `not_after: string`

      Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

    - `public_certificate: string`

      PEM-encoded X.509 certificate containing the public key.
      Configure this certificate in your external SAML Identity Provider to enable encryption.

    - `uid: string`

      Unique identifier for the certificate

  - `previous_certificate: optional unknown`

    The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/identity_providers/$IDENTITY_PROVIDER_ID/saml_certificate \
    -X POST \
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
    "created_at": "2026-05-07T19:16:19.821162Z",
    "uid": "c409ef44-e72c-41c8-8c0b-278c8a6f4fd8",
    "updated_at": "2026-05-07T19:16:19.821162Z",
    "current_certificate": {
      "is_current": true,
      "not_after": "2027-05-07T19:11:00Z",
      "public_certificate": "-----BEGIN CERTIFICATE-----\nMIIEpzCCA4+gAwIBAgIUTh2VSDDJ0oB/gabio6j1L9QwWoUwDQYJKoZIhvcNAQEL\n...\n-----END CERTIFICATE-----\n",
      "uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
    },
    "previous_certificate": {}
  }
}
```

## Domain Types

### SAML Certificate Create Response

- `SAMLCertificateCreateResponse object { created_at, uid, updated_at, 2 more }`

  A SAML encryption certificate set containing current and optionally previous certificates for encryption key rotation.

  - `created_at: string`

    Timestamp when the certificate set was created

  - `uid: string`

    Unique identifier for the certificate set

  - `updated_at: string`

    Timestamp when the certificate set was last updated (e.g., during rotation)

  - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

    The currently active certificate used for encrypting SAML assertions

    - `is_current: boolean`

      Indicates whether this is the currently active certificate

    - `not_after: string`

      Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

    - `public_certificate: string`

      PEM-encoded X.509 certificate containing the public key.
      Configure this certificate in your external SAML Identity Provider to enable encryption.

    - `uid: string`

      Unique identifier for the certificate

  - `previous_certificate: optional unknown`

    The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.
