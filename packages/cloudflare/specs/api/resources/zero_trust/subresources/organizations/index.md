# Organizations

## Get your Zero Trust organization

**get** `/{accounts_or_zones}/{account_or_zone_id}/access/organizations`

Returns the configuration for your Zero Trust organization.

### Path Parameters

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

- `result: optional Organization`

  - `allow_authenticate_via_warp: optional boolean`

    When set to true, users can authenticate via WARP for any application in your organization. Application settings will take precedence over this value.

  - `auth_domain: optional string`

    The unique subdomain assigned to your Zero Trust organization.

  - `auto_redirect_to_identity: optional boolean`

    When set to `true`, users skip the identity provider selection step during login.

  - `custom_pages: optional object { forbidden, identity_denied }`

    - `forbidden: optional string`

      The uid of the custom page to use when a user is denied access after failing a non-identity rule.

    - `identity_denied: optional string`

      The uid of the custom page to use when a user is denied access.

  - `deny_unmatched_requests: optional boolean`

    Determines whether to deny all requests to Cloudflare-protected resources that lack an associated Access application. If enabled, you must explicitly configure an Access application and policy to allow traffic to your Cloudflare-protected resources. For domains you want to be public across all subdomains, add the domain to the `deny_unmatched_requests_exempted_zone_names` array.

  - `deny_unmatched_requests_exempted_zone_names: optional array of string`

    Contains zone names to exempt from the `deny_unmatched_requests` feature. Requests to a subdomain in an exempted zone will block unauthenticated traffic by default if there is a configured Access application and policy that matches the request.

  - `is_ui_read_only: optional boolean`

    Lock all settings as Read-Only in the Dashboard, regardless of user permission. Updates may only be made via the API or Terraform for this account when enabled.

  - `login_design: optional LoginDesign`

    - `background_color: optional string`

      The background color on your login page.

    - `footer_text: optional string`

      The text at the bottom of your login page.

    - `header_text: optional string`

      The text at the top of your login page.

    - `logo_path: optional string`

      The URL of the logo on your login page.

    - `text_color: optional string`

      The text color on your login page.

  - `mfa_config: optional object { allowed_authenticators, amr_matching_session_duration, required_aaguids, session_duration }`

    Configures multi-factor authentication (MFA) settings for an organization.

    - `allowed_authenticators: optional array of "totp" or "biometrics" or "security_key" or "piv_key"`

      Lists the MFA methods that users can authenticate with.

      - `"totp"`

      - `"biometrics"`

      - `"security_key"`

      - `"piv_key"`

    - `amr_matching_session_duration: optional string`

      Allows a user to skip MFA via Authentication Method Reference (AMR) matching when the AMR claim provided by the IdP the user used to authenticate contains "mfa". Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days).

    - `required_aaguids: optional string`

      Specifies a Cloudflare List of required FIDO2 authenticator device AAGUIDs.

    - `session_duration: optional string`

      Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

  - `mfa_piv_key_requirements: optional object { pin_policy, require_fips_device, ssh_key_size, 2 more }`

    Configures PIV key requirements for MFA using hardware security keys.

    - `pin_policy: optional "never" or "once" or "always"`

      Defines when a PIN is required to use the SSH key. Valid values: `never` (no PIN required), `once` (PIN required once per session), `always` (PIN required for each use).

      - `"never"`

      - `"once"`

      - `"always"`

    - `require_fips_device: optional boolean`

      Requires the PIV key to be stored on a FIPS 140-2 Level 1 or higher validated device.

    - `ssh_key_size: optional array of 256 or 384 or 521 or 3 more`

      Specifies the allowed SSH key sizes in bits. Valid sizes depend on key type. Ed25519 has a fixed key size and does not accept this parameter.

      - `256`

      - `384`

      - `521`

      - `2048`

      - `3072`

      - `4096`

    - `ssh_key_type: optional array of "ecdsa" or "ed25519" or "rsa"`

      Specifies the allowed SSH key types. Valid values are `ecdsa`, `ed25519`, and `rsa`.

      - `"ecdsa"`

      - `"ed25519"`

      - `"rsa"`

    - `touch_policy: optional "never" or "always" or "cached"`

      Defines when physical touch is required to use the SSH key. Valid values: `never` (no touch required), `always` (touch required for each use), `cached` (touch cached for 15 seconds).

      - `"never"`

      - `"always"`

      - `"cached"`

  - `mfa_required_for_all_apps: optional boolean`

    Determines whether global MFA settings apply to applications by default. The organization must have MFA enabled with at least one authentication method and a session duration configured. Note: 'allowed_authenticators' cannot only contain 'piv_key' if the organization has any non-infrastructure applications because PIV keys are only compatible with infrastructure apps.

  - `name: optional string`

    The name of your Zero Trust organization.

  - `session_duration: optional string`

    The amount of time that tokens issued for applications will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

  - `ui_read_only_toggle_reason: optional string`

    A description of the reason why the UI read only field is being toggled.

  - `user_seat_expiration_inactive_time: optional string`

    The amount of time a user seat is inactive before it expires. When the user seat exceeds the set time of inactivity, the user is removed as an active seat and no longer counts against your Teams seat count.  Minimum value for this setting is 1 month (730h). Must be in the format `300ms` or `2h45m`. Valid time units are: `ns`, `us` (or `µs`), `ms`, `s`, `m`, `h`.

  - `warp_auth_session_duration: optional string`

    The amount of time that tokens issued for applications will be valid. Must be in the format `30m` or `2h45m`. Valid time units are: m, h.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/organizations \
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
    "allow_authenticate_via_warp": true,
    "auth_domain": "test.cloudflareaccess.com",
    "auto_redirect_to_identity": true,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "custom_pages": {
      "forbidden": "699d98642c564d2e855e9661899b7252",
      "identity_denied": "699d98642c564d2e855e9661899b7252"
    },
    "deny_unmatched_requests": true,
    "deny_unmatched_requests_exempted_zone_names": [
      "example.com"
    ],
    "is_ui_read_only": true,
    "login_design": {
      "background_color": "#c5ed1b",
      "footer_text": "This is an example description.",
      "header_text": "This is an example description.",
      "logo_path": "https://example.com/logo.png",
      "text_color": "#c5ed1b"
    },
    "mfa_config": {
      "allowed_authenticators": [
        "totp",
        "biometrics",
        "security_key"
      ],
      "amr_matching_session_duration": "12h",
      "required_aaguids": "2fc0579f-8113-47ea-b116-bb5a8db9202a",
      "session_duration": "24h"
    },
    "mfa_piv_key_requirements": {
      "pin_policy": "always",
      "require_fips_device": true,
      "ssh_key_size": [
        256,
        2048
      ],
      "ssh_key_type": [
        "ecdsa",
        "rsa"
      ],
      "touch_policy": "always"
    },
    "mfa_required_for_all_apps": false,
    "name": "Widget Corps Internal Applications",
    "session_duration": "24h",
    "ui_read_only_toggle_reason": "Temporarily turn off the UI read only lock to make a change via the UI",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "user_seat_expiration_inactive_time": "730h",
    "warp_auth_session_duration": "24h"
  }
}
```

## Create your Zero Trust organization

**post** `/{accounts_or_zones}/{account_or_zone_id}/access/organizations`

Sets up a Zero Trust organization for your account or zone.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `auth_domain: string`

  The unique subdomain assigned to your Zero Trust organization.

- `name: string`

  The name of your Zero Trust organization.

- `allow_authenticate_via_warp: optional boolean`

  When set to true, users can authenticate via WARP for any application in your organization. Application settings will take precedence over this value.

- `auto_redirect_to_identity: optional boolean`

  When set to `true`, users skip the identity provider selection step during login.

- `deny_unmatched_requests: optional boolean`

  Determines whether to deny all requests to Cloudflare-protected resources that lack an associated Access application. If enabled, you must explicitly configure an Access application and policy to allow traffic to your Cloudflare-protected resources. For domains you want to be public across all subdomains, add the domain to the `deny_unmatched_requests_exempted_zone_names` array.

- `deny_unmatched_requests_exempted_zone_names: optional array of string`

  Contains zone names to exempt from the `deny_unmatched_requests` feature. Requests to a subdomain in an exempted zone will block unauthenticated traffic by default if there is a configured Access application and policy that matches the request.

- `is_ui_read_only: optional boolean`

  Lock all settings as Read-Only in the Dashboard, regardless of user permission. Updates may only be made via the API or Terraform for this account when enabled.

- `login_design: optional LoginDesign`

  - `background_color: optional string`

    The background color on your login page.

  - `footer_text: optional string`

    The text at the bottom of your login page.

  - `header_text: optional string`

    The text at the top of your login page.

  - `logo_path: optional string`

    The URL of the logo on your login page.

  - `text_color: optional string`

    The text color on your login page.

- `mfa_config: optional object { allowed_authenticators, amr_matching_session_duration, required_aaguids, session_duration }`

  Configures multi-factor authentication (MFA) settings for an organization.

  - `allowed_authenticators: optional array of "totp" or "biometrics" or "security_key" or "piv_key"`

    Lists the MFA methods that users can authenticate with.

    - `"totp"`

    - `"biometrics"`

    - `"security_key"`

    - `"piv_key"`

  - `amr_matching_session_duration: optional string`

    Allows a user to skip MFA via Authentication Method Reference (AMR) matching when the AMR claim provided by the IdP the user used to authenticate contains "mfa". Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days).

  - `required_aaguids: optional string`

    Specifies a Cloudflare List of required FIDO2 authenticator device AAGUIDs.

  - `session_duration: optional string`

    Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

- `mfa_piv_key_requirements: optional object { pin_policy, require_fips_device, ssh_key_size, 2 more }`

  Configures PIV key requirements for MFA using hardware security keys.

  - `pin_policy: optional "never" or "once" or "always"`

    Defines when a PIN is required to use the SSH key. Valid values: `never` (no PIN required), `once` (PIN required once per session), `always` (PIN required for each use).

    - `"never"`

    - `"once"`

    - `"always"`

  - `require_fips_device: optional boolean`

    Requires the PIV key to be stored on a FIPS 140-2 Level 1 or higher validated device.

  - `ssh_key_size: optional array of 256 or 384 or 521 or 3 more`

    Specifies the allowed SSH key sizes in bits. Valid sizes depend on key type. Ed25519 has a fixed key size and does not accept this parameter.

    - `256`

    - `384`

    - `521`

    - `2048`

    - `3072`

    - `4096`

  - `ssh_key_type: optional array of "ecdsa" or "ed25519" or "rsa"`

    Specifies the allowed SSH key types. Valid values are `ecdsa`, `ed25519`, and `rsa`.

    - `"ecdsa"`

    - `"ed25519"`

    - `"rsa"`

  - `touch_policy: optional "never" or "always" or "cached"`

    Defines when physical touch is required to use the SSH key. Valid values: `never` (no touch required), `always` (touch required for each use), `cached` (touch cached for 15 seconds).

    - `"never"`

    - `"always"`

    - `"cached"`

- `mfa_required_for_all_apps: optional boolean`

  Determines whether global MFA settings apply to applications by default. The organization must have MFA enabled with at least one authentication method and a session duration configured. Note: 'allowed_authenticators' cannot only contain 'piv_key' if the organization has any non-infrastructure applications because PIV keys are only compatible with infrastructure apps.

- `session_duration: optional string`

  The amount of time that tokens issued for applications will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

- `ui_read_only_toggle_reason: optional string`

  A description of the reason why the UI read only field is being toggled.

- `user_seat_expiration_inactive_time: optional string`

  The amount of time a user seat is inactive before it expires. When the user seat exceeds the set time of inactivity, the user is removed as an active seat and no longer counts against your Teams seat count.  Minimum value for this setting is 1 month (730h). Must be in the format `300ms` or `2h45m`. Valid time units are: `ns`, `us` (or `µs`), `ms`, `s`, `m`, `h`.

- `warp_auth_session_duration: optional string`

  The amount of time that tokens issued for applications will be valid. Must be in the format `30m` or `2h45m`. Valid time units are: m, h.

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

- `result: optional Organization`

  - `allow_authenticate_via_warp: optional boolean`

    When set to true, users can authenticate via WARP for any application in your organization. Application settings will take precedence over this value.

  - `auth_domain: optional string`

    The unique subdomain assigned to your Zero Trust organization.

  - `auto_redirect_to_identity: optional boolean`

    When set to `true`, users skip the identity provider selection step during login.

  - `custom_pages: optional object { forbidden, identity_denied }`

    - `forbidden: optional string`

      The uid of the custom page to use when a user is denied access after failing a non-identity rule.

    - `identity_denied: optional string`

      The uid of the custom page to use when a user is denied access.

  - `deny_unmatched_requests: optional boolean`

    Determines whether to deny all requests to Cloudflare-protected resources that lack an associated Access application. If enabled, you must explicitly configure an Access application and policy to allow traffic to your Cloudflare-protected resources. For domains you want to be public across all subdomains, add the domain to the `deny_unmatched_requests_exempted_zone_names` array.

  - `deny_unmatched_requests_exempted_zone_names: optional array of string`

    Contains zone names to exempt from the `deny_unmatched_requests` feature. Requests to a subdomain in an exempted zone will block unauthenticated traffic by default if there is a configured Access application and policy that matches the request.

  - `is_ui_read_only: optional boolean`

    Lock all settings as Read-Only in the Dashboard, regardless of user permission. Updates may only be made via the API or Terraform for this account when enabled.

  - `login_design: optional LoginDesign`

    - `background_color: optional string`

      The background color on your login page.

    - `footer_text: optional string`

      The text at the bottom of your login page.

    - `header_text: optional string`

      The text at the top of your login page.

    - `logo_path: optional string`

      The URL of the logo on your login page.

    - `text_color: optional string`

      The text color on your login page.

  - `mfa_config: optional object { allowed_authenticators, amr_matching_session_duration, required_aaguids, session_duration }`

    Configures multi-factor authentication (MFA) settings for an organization.

    - `allowed_authenticators: optional array of "totp" or "biometrics" or "security_key" or "piv_key"`

      Lists the MFA methods that users can authenticate with.

      - `"totp"`

      - `"biometrics"`

      - `"security_key"`

      - `"piv_key"`

    - `amr_matching_session_duration: optional string`

      Allows a user to skip MFA via Authentication Method Reference (AMR) matching when the AMR claim provided by the IdP the user used to authenticate contains "mfa". Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days).

    - `required_aaguids: optional string`

      Specifies a Cloudflare List of required FIDO2 authenticator device AAGUIDs.

    - `session_duration: optional string`

      Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

  - `mfa_piv_key_requirements: optional object { pin_policy, require_fips_device, ssh_key_size, 2 more }`

    Configures PIV key requirements for MFA using hardware security keys.

    - `pin_policy: optional "never" or "once" or "always"`

      Defines when a PIN is required to use the SSH key. Valid values: `never` (no PIN required), `once` (PIN required once per session), `always` (PIN required for each use).

      - `"never"`

      - `"once"`

      - `"always"`

    - `require_fips_device: optional boolean`

      Requires the PIV key to be stored on a FIPS 140-2 Level 1 or higher validated device.

    - `ssh_key_size: optional array of 256 or 384 or 521 or 3 more`

      Specifies the allowed SSH key sizes in bits. Valid sizes depend on key type. Ed25519 has a fixed key size and does not accept this parameter.

      - `256`

      - `384`

      - `521`

      - `2048`

      - `3072`

      - `4096`

    - `ssh_key_type: optional array of "ecdsa" or "ed25519" or "rsa"`

      Specifies the allowed SSH key types. Valid values are `ecdsa`, `ed25519`, and `rsa`.

      - `"ecdsa"`

      - `"ed25519"`

      - `"rsa"`

    - `touch_policy: optional "never" or "always" or "cached"`

      Defines when physical touch is required to use the SSH key. Valid values: `never` (no touch required), `always` (touch required for each use), `cached` (touch cached for 15 seconds).

      - `"never"`

      - `"always"`

      - `"cached"`

  - `mfa_required_for_all_apps: optional boolean`

    Determines whether global MFA settings apply to applications by default. The organization must have MFA enabled with at least one authentication method and a session duration configured. Note: 'allowed_authenticators' cannot only contain 'piv_key' if the organization has any non-infrastructure applications because PIV keys are only compatible with infrastructure apps.

  - `name: optional string`

    The name of your Zero Trust organization.

  - `session_duration: optional string`

    The amount of time that tokens issued for applications will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

  - `ui_read_only_toggle_reason: optional string`

    A description of the reason why the UI read only field is being toggled.

  - `user_seat_expiration_inactive_time: optional string`

    The amount of time a user seat is inactive before it expires. When the user seat exceeds the set time of inactivity, the user is removed as an active seat and no longer counts against your Teams seat count.  Minimum value for this setting is 1 month (730h). Must be in the format `300ms` or `2h45m`. Valid time units are: `ns`, `us` (or `µs`), `ms`, `s`, `m`, `h`.

  - `warp_auth_session_duration: optional string`

    The amount of time that tokens issued for applications will be valid. Must be in the format `30m` or `2h45m`. Valid time units are: m, h.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/organizations \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "auth_domain": "test.cloudflareaccess.com",
          "name": "Widget Corps Internal Applications",
          "deny_unmatched_requests_exempted_zone_names": [
            "example.com"
          ],
          "session_duration": "24h",
          "ui_read_only_toggle_reason": "Temporarily turn off the UI read only lock to make a change via the UI",
          "user_seat_expiration_inactive_time": "730h",
          "warp_auth_session_duration": "24h"
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
    "allow_authenticate_via_warp": true,
    "auth_domain": "test.cloudflareaccess.com",
    "auto_redirect_to_identity": true,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "custom_pages": {
      "forbidden": "699d98642c564d2e855e9661899b7252",
      "identity_denied": "699d98642c564d2e855e9661899b7252"
    },
    "deny_unmatched_requests": true,
    "deny_unmatched_requests_exempted_zone_names": [
      "example.com"
    ],
    "is_ui_read_only": true,
    "login_design": {
      "background_color": "#c5ed1b",
      "footer_text": "This is an example description.",
      "header_text": "This is an example description.",
      "logo_path": "https://example.com/logo.png",
      "text_color": "#c5ed1b"
    },
    "mfa_config": {
      "allowed_authenticators": [
        "totp",
        "biometrics",
        "security_key"
      ],
      "amr_matching_session_duration": "12h",
      "required_aaguids": "2fc0579f-8113-47ea-b116-bb5a8db9202a",
      "session_duration": "24h"
    },
    "mfa_piv_key_requirements": {
      "pin_policy": "always",
      "require_fips_device": true,
      "ssh_key_size": [
        256,
        2048
      ],
      "ssh_key_type": [
        "ecdsa",
        "rsa"
      ],
      "touch_policy": "always"
    },
    "mfa_required_for_all_apps": false,
    "name": "Widget Corps Internal Applications",
    "session_duration": "24h",
    "ui_read_only_toggle_reason": "Temporarily turn off the UI read only lock to make a change via the UI",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "user_seat_expiration_inactive_time": "730h",
    "warp_auth_session_duration": "24h"
  }
}
```

## Update your Zero Trust organization

**put** `/{accounts_or_zones}/{account_or_zone_id}/access/organizations`

Updates the configuration for your Zero Trust organization.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `allow_authenticate_via_warp: optional boolean`

  When set to true, users can authenticate via WARP for any application in your organization. Application settings will take precedence over this value.

- `auth_domain: optional string`

  The unique subdomain assigned to your Zero Trust organization.

- `auto_redirect_to_identity: optional boolean`

  When set to `true`, users skip the identity provider selection step during login.

- `custom_pages: optional object { forbidden, identity_denied }`

  - `forbidden: optional string`

    The uid of the custom page to use when a user is denied access after failing a non-identity rule.

  - `identity_denied: optional string`

    The uid of the custom page to use when a user is denied access.

- `deny_unmatched_requests: optional boolean`

  Determines whether to deny all requests to Cloudflare-protected resources that lack an associated Access application. If enabled, you must explicitly configure an Access application and policy to allow traffic to your Cloudflare-protected resources. For domains you want to be public across all subdomains, add the domain to the `deny_unmatched_requests_exempted_zone_names` array.

- `deny_unmatched_requests_exempted_zone_names: optional array of string`

  Contains zone names to exempt from the `deny_unmatched_requests` feature. Requests to a subdomain in an exempted zone will block unauthenticated traffic by default if there is a configured Access application and policy that matches the request.

- `is_ui_read_only: optional boolean`

  Lock all settings as Read-Only in the Dashboard, regardless of user permission. Updates may only be made via the API or Terraform for this account when enabled.

- `login_design: optional LoginDesign`

  - `background_color: optional string`

    The background color on your login page.

  - `footer_text: optional string`

    The text at the bottom of your login page.

  - `header_text: optional string`

    The text at the top of your login page.

  - `logo_path: optional string`

    The URL of the logo on your login page.

  - `text_color: optional string`

    The text color on your login page.

- `mfa_config: optional object { allowed_authenticators, amr_matching_session_duration, required_aaguids, session_duration }`

  Configures multi-factor authentication (MFA) settings for an organization.

  - `allowed_authenticators: optional array of "totp" or "biometrics" or "security_key" or "piv_key"`

    Lists the MFA methods that users can authenticate with.

    - `"totp"`

    - `"biometrics"`

    - `"security_key"`

    - `"piv_key"`

  - `amr_matching_session_duration: optional string`

    Allows a user to skip MFA via Authentication Method Reference (AMR) matching when the AMR claim provided by the IdP the user used to authenticate contains "mfa". Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days).

  - `required_aaguids: optional string`

    Specifies a Cloudflare List of required FIDO2 authenticator device AAGUIDs.

  - `session_duration: optional string`

    Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

- `mfa_piv_key_requirements: optional object { pin_policy, require_fips_device, ssh_key_size, 2 more }`

  Configures PIV key requirements for MFA using hardware security keys.

  - `pin_policy: optional "never" or "once" or "always"`

    Defines when a PIN is required to use the SSH key. Valid values: `never` (no PIN required), `once` (PIN required once per session), `always` (PIN required for each use).

    - `"never"`

    - `"once"`

    - `"always"`

  - `require_fips_device: optional boolean`

    Requires the PIV key to be stored on a FIPS 140-2 Level 1 or higher validated device.

  - `ssh_key_size: optional array of 256 or 384 or 521 or 3 more`

    Specifies the allowed SSH key sizes in bits. Valid sizes depend on key type. Ed25519 has a fixed key size and does not accept this parameter.

    - `256`

    - `384`

    - `521`

    - `2048`

    - `3072`

    - `4096`

  - `ssh_key_type: optional array of "ecdsa" or "ed25519" or "rsa"`

    Specifies the allowed SSH key types. Valid values are `ecdsa`, `ed25519`, and `rsa`.

    - `"ecdsa"`

    - `"ed25519"`

    - `"rsa"`

  - `touch_policy: optional "never" or "always" or "cached"`

    Defines when physical touch is required to use the SSH key. Valid values: `never` (no touch required), `always` (touch required for each use), `cached` (touch cached for 15 seconds).

    - `"never"`

    - `"always"`

    - `"cached"`

- `mfa_required_for_all_apps: optional boolean`

  Determines whether global MFA settings apply to applications by default. The organization must have MFA enabled with at least one authentication method and a session duration configured. Note: 'allowed_authenticators' cannot only contain 'piv_key' if the organization has any non-infrastructure applications because PIV keys are only compatible with infrastructure apps.

- `name: optional string`

  The name of your Zero Trust organization.

- `session_duration: optional string`

  The amount of time that tokens issued for applications will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

- `ui_read_only_toggle_reason: optional string`

  A description of the reason why the UI read only field is being toggled.

- `user_seat_expiration_inactive_time: optional string`

  The amount of time a user seat is inactive before it expires. When the user seat exceeds the set time of inactivity, the user is removed as an active seat and no longer counts against your Teams seat count.  Minimum value for this setting is 1 month (730h). Must be in the format `300ms` or `2h45m`. Valid time units are: `ns`, `us` (or `µs`), `ms`, `s`, `m`, `h`.

- `warp_auth_session_duration: optional string`

  The amount of time that tokens issued for applications will be valid. Must be in the format `30m` or `2h45m`. Valid time units are: m, h.

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

- `result: optional Organization`

  - `allow_authenticate_via_warp: optional boolean`

    When set to true, users can authenticate via WARP for any application in your organization. Application settings will take precedence over this value.

  - `auth_domain: optional string`

    The unique subdomain assigned to your Zero Trust organization.

  - `auto_redirect_to_identity: optional boolean`

    When set to `true`, users skip the identity provider selection step during login.

  - `custom_pages: optional object { forbidden, identity_denied }`

    - `forbidden: optional string`

      The uid of the custom page to use when a user is denied access after failing a non-identity rule.

    - `identity_denied: optional string`

      The uid of the custom page to use when a user is denied access.

  - `deny_unmatched_requests: optional boolean`

    Determines whether to deny all requests to Cloudflare-protected resources that lack an associated Access application. If enabled, you must explicitly configure an Access application and policy to allow traffic to your Cloudflare-protected resources. For domains you want to be public across all subdomains, add the domain to the `deny_unmatched_requests_exempted_zone_names` array.

  - `deny_unmatched_requests_exempted_zone_names: optional array of string`

    Contains zone names to exempt from the `deny_unmatched_requests` feature. Requests to a subdomain in an exempted zone will block unauthenticated traffic by default if there is a configured Access application and policy that matches the request.

  - `is_ui_read_only: optional boolean`

    Lock all settings as Read-Only in the Dashboard, regardless of user permission. Updates may only be made via the API or Terraform for this account when enabled.

  - `login_design: optional LoginDesign`

    - `background_color: optional string`

      The background color on your login page.

    - `footer_text: optional string`

      The text at the bottom of your login page.

    - `header_text: optional string`

      The text at the top of your login page.

    - `logo_path: optional string`

      The URL of the logo on your login page.

    - `text_color: optional string`

      The text color on your login page.

  - `mfa_config: optional object { allowed_authenticators, amr_matching_session_duration, required_aaguids, session_duration }`

    Configures multi-factor authentication (MFA) settings for an organization.

    - `allowed_authenticators: optional array of "totp" or "biometrics" or "security_key" or "piv_key"`

      Lists the MFA methods that users can authenticate with.

      - `"totp"`

      - `"biometrics"`

      - `"security_key"`

      - `"piv_key"`

    - `amr_matching_session_duration: optional string`

      Allows a user to skip MFA via Authentication Method Reference (AMR) matching when the AMR claim provided by the IdP the user used to authenticate contains "mfa". Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days).

    - `required_aaguids: optional string`

      Specifies a Cloudflare List of required FIDO2 authenticator device AAGUIDs.

    - `session_duration: optional string`

      Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

  - `mfa_piv_key_requirements: optional object { pin_policy, require_fips_device, ssh_key_size, 2 more }`

    Configures PIV key requirements for MFA using hardware security keys.

    - `pin_policy: optional "never" or "once" or "always"`

      Defines when a PIN is required to use the SSH key. Valid values: `never` (no PIN required), `once` (PIN required once per session), `always` (PIN required for each use).

      - `"never"`

      - `"once"`

      - `"always"`

    - `require_fips_device: optional boolean`

      Requires the PIV key to be stored on a FIPS 140-2 Level 1 or higher validated device.

    - `ssh_key_size: optional array of 256 or 384 or 521 or 3 more`

      Specifies the allowed SSH key sizes in bits. Valid sizes depend on key type. Ed25519 has a fixed key size and does not accept this parameter.

      - `256`

      - `384`

      - `521`

      - `2048`

      - `3072`

      - `4096`

    - `ssh_key_type: optional array of "ecdsa" or "ed25519" or "rsa"`

      Specifies the allowed SSH key types. Valid values are `ecdsa`, `ed25519`, and `rsa`.

      - `"ecdsa"`

      - `"ed25519"`

      - `"rsa"`

    - `touch_policy: optional "never" or "always" or "cached"`

      Defines when physical touch is required to use the SSH key. Valid values: `never` (no touch required), `always` (touch required for each use), `cached` (touch cached for 15 seconds).

      - `"never"`

      - `"always"`

      - `"cached"`

  - `mfa_required_for_all_apps: optional boolean`

    Determines whether global MFA settings apply to applications by default. The organization must have MFA enabled with at least one authentication method and a session duration configured. Note: 'allowed_authenticators' cannot only contain 'piv_key' if the organization has any non-infrastructure applications because PIV keys are only compatible with infrastructure apps.

  - `name: optional string`

    The name of your Zero Trust organization.

  - `session_duration: optional string`

    The amount of time that tokens issued for applications will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

  - `ui_read_only_toggle_reason: optional string`

    A description of the reason why the UI read only field is being toggled.

  - `user_seat_expiration_inactive_time: optional string`

    The amount of time a user seat is inactive before it expires. When the user seat exceeds the set time of inactivity, the user is removed as an active seat and no longer counts against your Teams seat count.  Minimum value for this setting is 1 month (730h). Must be in the format `300ms` or `2h45m`. Valid time units are: `ns`, `us` (or `µs`), `ms`, `s`, `m`, `h`.

  - `warp_auth_session_duration: optional string`

    The amount of time that tokens issued for applications will be valid. Must be in the format `30m` or `2h45m`. Valid time units are: m, h.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/organizations \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "auth_domain": "test.cloudflareaccess.com",
          "deny_unmatched_requests_exempted_zone_names": [
            "example.com"
          ],
          "name": "Widget Corps Internal Applications",
          "session_duration": "24h",
          "ui_read_only_toggle_reason": "Temporarily turn off the UI read only lock to make a change via the UI",
          "user_seat_expiration_inactive_time": "730h",
          "warp_auth_session_duration": "24h"
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
    "allow_authenticate_via_warp": true,
    "auth_domain": "test.cloudflareaccess.com",
    "auto_redirect_to_identity": true,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "custom_pages": {
      "forbidden": "699d98642c564d2e855e9661899b7252",
      "identity_denied": "699d98642c564d2e855e9661899b7252"
    },
    "deny_unmatched_requests": true,
    "deny_unmatched_requests_exempted_zone_names": [
      "example.com"
    ],
    "is_ui_read_only": true,
    "login_design": {
      "background_color": "#c5ed1b",
      "footer_text": "This is an example description.",
      "header_text": "This is an example description.",
      "logo_path": "https://example.com/logo.png",
      "text_color": "#c5ed1b"
    },
    "mfa_config": {
      "allowed_authenticators": [
        "totp",
        "biometrics",
        "security_key"
      ],
      "amr_matching_session_duration": "12h",
      "required_aaguids": "2fc0579f-8113-47ea-b116-bb5a8db9202a",
      "session_duration": "24h"
    },
    "mfa_piv_key_requirements": {
      "pin_policy": "always",
      "require_fips_device": true,
      "ssh_key_size": [
        256,
        2048
      ],
      "ssh_key_type": [
        "ecdsa",
        "rsa"
      ],
      "touch_policy": "always"
    },
    "mfa_required_for_all_apps": false,
    "name": "Widget Corps Internal Applications",
    "session_duration": "24h",
    "ui_read_only_toggle_reason": "Temporarily turn off the UI read only lock to make a change via the UI",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "user_seat_expiration_inactive_time": "730h",
    "warp_auth_session_duration": "24h"
  }
}
```

## Revoke all Access tokens for a user

**post** `/{accounts_or_zones}/{account_or_zone_id}/access/organizations/revoke_user`

Revokes a user's access across all applications.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Query Parameters

- `devices: optional boolean`

  When set to `true`, all devices associated with the user will be revoked.

### Body Parameters

- `email: string`

  The email of the user to revoke.

- `devices: optional boolean`

  When set to `true`, all devices associated with the user will be revoked.

- `user_uid: optional string`

  The uuid of the user to revoke.

- `warp_session_reauth: optional boolean`

  When set to `true`, the user will be required to re-authenticate to WARP for all Gateway policies that enforce a WARP client session duration. When `false`, the user’s WARP session will remain active

### Returns

- `result: optional true or false`

  - `true`

  - `false`

- `success: optional true or false`

  - `true`

  - `false`

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/organizations/revoke_user \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "email": "test@example.com",
          "devices": true,
          "user_uid": "699d98642c564d2e855e9661899b7252",
          "warp_session_reauth": true
        }'
```

#### Response

```json
{
  "result": true,
  "success": true
}
```

## Domain Types

### Login Design

- `LoginDesign object { background_color, footer_text, header_text, 2 more }`

  - `background_color: optional string`

    The background color on your login page.

  - `footer_text: optional string`

    The text at the bottom of your login page.

  - `header_text: optional string`

    The text at the top of your login page.

  - `logo_path: optional string`

    The URL of the logo on your login page.

  - `text_color: optional string`

    The text color on your login page.

### Organization

- `Organization object { allow_authenticate_via_warp, auth_domain, auto_redirect_to_identity, 13 more }`

  - `allow_authenticate_via_warp: optional boolean`

    When set to true, users can authenticate via WARP for any application in your organization. Application settings will take precedence over this value.

  - `auth_domain: optional string`

    The unique subdomain assigned to your Zero Trust organization.

  - `auto_redirect_to_identity: optional boolean`

    When set to `true`, users skip the identity provider selection step during login.

  - `custom_pages: optional object { forbidden, identity_denied }`

    - `forbidden: optional string`

      The uid of the custom page to use when a user is denied access after failing a non-identity rule.

    - `identity_denied: optional string`

      The uid of the custom page to use when a user is denied access.

  - `deny_unmatched_requests: optional boolean`

    Determines whether to deny all requests to Cloudflare-protected resources that lack an associated Access application. If enabled, you must explicitly configure an Access application and policy to allow traffic to your Cloudflare-protected resources. For domains you want to be public across all subdomains, add the domain to the `deny_unmatched_requests_exempted_zone_names` array.

  - `deny_unmatched_requests_exempted_zone_names: optional array of string`

    Contains zone names to exempt from the `deny_unmatched_requests` feature. Requests to a subdomain in an exempted zone will block unauthenticated traffic by default if there is a configured Access application and policy that matches the request.

  - `is_ui_read_only: optional boolean`

    Lock all settings as Read-Only in the Dashboard, regardless of user permission. Updates may only be made via the API or Terraform for this account when enabled.

  - `login_design: optional LoginDesign`

    - `background_color: optional string`

      The background color on your login page.

    - `footer_text: optional string`

      The text at the bottom of your login page.

    - `header_text: optional string`

      The text at the top of your login page.

    - `logo_path: optional string`

      The URL of the logo on your login page.

    - `text_color: optional string`

      The text color on your login page.

  - `mfa_config: optional object { allowed_authenticators, amr_matching_session_duration, required_aaguids, session_duration }`

    Configures multi-factor authentication (MFA) settings for an organization.

    - `allowed_authenticators: optional array of "totp" or "biometrics" or "security_key" or "piv_key"`

      Lists the MFA methods that users can authenticate with.

      - `"totp"`

      - `"biometrics"`

      - `"security_key"`

      - `"piv_key"`

    - `amr_matching_session_duration: optional string`

      Allows a user to skip MFA via Authentication Method Reference (AMR) matching when the AMR claim provided by the IdP the user used to authenticate contains "mfa". Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days).

    - `required_aaguids: optional string`

      Specifies a Cloudflare List of required FIDO2 authenticator device AAGUIDs.

    - `session_duration: optional string`

      Defines the duration of an MFA session. Must be in minutes (m) or hours (h). Minimum: 0m. Maximum: 720h (30 days). Examples:`5m` or `24h`.

  - `mfa_piv_key_requirements: optional object { pin_policy, require_fips_device, ssh_key_size, 2 more }`

    Configures PIV key requirements for MFA using hardware security keys.

    - `pin_policy: optional "never" or "once" or "always"`

      Defines when a PIN is required to use the SSH key. Valid values: `never` (no PIN required), `once` (PIN required once per session), `always` (PIN required for each use).

      - `"never"`

      - `"once"`

      - `"always"`

    - `require_fips_device: optional boolean`

      Requires the PIV key to be stored on a FIPS 140-2 Level 1 or higher validated device.

    - `ssh_key_size: optional array of 256 or 384 or 521 or 3 more`

      Specifies the allowed SSH key sizes in bits. Valid sizes depend on key type. Ed25519 has a fixed key size and does not accept this parameter.

      - `256`

      - `384`

      - `521`

      - `2048`

      - `3072`

      - `4096`

    - `ssh_key_type: optional array of "ecdsa" or "ed25519" or "rsa"`

      Specifies the allowed SSH key types. Valid values are `ecdsa`, `ed25519`, and `rsa`.

      - `"ecdsa"`

      - `"ed25519"`

      - `"rsa"`

    - `touch_policy: optional "never" or "always" or "cached"`

      Defines when physical touch is required to use the SSH key. Valid values: `never` (no touch required), `always` (touch required for each use), `cached` (touch cached for 15 seconds).

      - `"never"`

      - `"always"`

      - `"cached"`

  - `mfa_required_for_all_apps: optional boolean`

    Determines whether global MFA settings apply to applications by default. The organization must have MFA enabled with at least one authentication method and a session duration configured. Note: 'allowed_authenticators' cannot only contain 'piv_key' if the organization has any non-infrastructure applications because PIV keys are only compatible with infrastructure apps.

  - `name: optional string`

    The name of your Zero Trust organization.

  - `session_duration: optional string`

    The amount of time that tokens issued for applications will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.

  - `ui_read_only_toggle_reason: optional string`

    A description of the reason why the UI read only field is being toggled.

  - `user_seat_expiration_inactive_time: optional string`

    The amount of time a user seat is inactive before it expires. When the user seat exceeds the set time of inactivity, the user is removed as an active seat and no longer counts against your Teams seat count.  Minimum value for this setting is 1 month (730h). Must be in the format `300ms` or `2h45m`. Valid time units are: `ns`, `us` (or `µs`), `ms`, `s`, `m`, `h`.

  - `warp_auth_session_duration: optional string`

    The amount of time that tokens issued for applications will be valid. Must be in the format `30m` or `2h45m`. Valid time units are: m, h.

### Organization Revoke Users Response

- `OrganizationRevokeUsersResponse = true or false`

  - `true`

  - `false`

# DOH

## Get your Zero Trust organization DoH settings

**get** `/accounts/{account_id}/access/organizations/doh`

Returns the DoH settings for your Zero Trust organization.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: optional object { id, client_id, doh_jwt_duration, 3 more }`

  - `id: optional string`

    The ID of the service token.

  - `client_id: optional string`

    The Client ID for the service token. Access will check for this value in the `CF-Access-Client-ID` request header.

  - `doh_jwt_duration: optional string`

    The duration the DoH JWT is valid for. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.  Note that the maximum duration for this setting is the same as the key rotation period on the account.

  - `duration: optional string`

    The duration for how long the service token will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. The default is 1 year in hours (8760h).

  - `expires_at: optional string`

  - `name: optional string`

    The name of the service token.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/organizations/doh \
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
    "client_id": "88bf3b6d86161464f6509f7219099e57.access.example.com",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "doh_jwt_duration": "800h",
    "duration": "60m",
    "expires_at": "2014-01-01T05:20:00.12345Z",
    "last_seen_at": "2014-01-01T05:20:00.12345Z",
    "name": "CI/CD token",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Update your Zero Trust organization DoH settings

**put** `/accounts/{account_id}/access/organizations/doh`

Updates the DoH settings for your Zero Trust organization.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `doh_jwt_duration: optional string`

  The duration the DoH JWT is valid for. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.  Note that the maximum duration for this setting is the same as the key rotation period on the account. Default expiration is 24h

- `service_token_id: optional string`

  The uuid of the service token you want to use for DoH authentication

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

- `result: optional object { id, client_id, doh_jwt_duration, 3 more }`

  - `id: optional string`

    The ID of the service token.

  - `client_id: optional string`

    The Client ID for the service token. Access will check for this value in the `CF-Access-Client-ID` request header.

  - `doh_jwt_duration: optional string`

    The duration the DoH JWT is valid for. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.  Note that the maximum duration for this setting is the same as the key rotation period on the account. Default expiration is 24h

  - `duration: optional string`

    The duration for how long the service token will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. The default is 1 year in hours (8760h).

  - `expires_at: optional string`

  - `name: optional string`

    The name of the service token.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/organizations/doh \
    -X PUT \
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
    "client_id": "88bf3b6d86161464f6509f7219099e57.access.example.com",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "doh_jwt_duration": "800h",
    "duration": "60m",
    "expires_at": "2014-01-01T05:20:00.12345Z",
    "last_seen_at": "2014-01-01T05:20:00.12345Z",
    "name": "CI/CD token",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Domain Types

### DOH Get Response

- `DOHGetResponse object { id, client_id, doh_jwt_duration, 3 more }`

  - `id: optional string`

    The ID of the service token.

  - `client_id: optional string`

    The Client ID for the service token. Access will check for this value in the `CF-Access-Client-ID` request header.

  - `doh_jwt_duration: optional string`

    The duration the DoH JWT is valid for. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.  Note that the maximum duration for this setting is the same as the key rotation period on the account.

  - `duration: optional string`

    The duration for how long the service token will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. The default is 1 year in hours (8760h).

  - `expires_at: optional string`

  - `name: optional string`

    The name of the service token.

### DOH Update Response

- `DOHUpdateResponse object { id, client_id, doh_jwt_duration, 3 more }`

  - `id: optional string`

    The ID of the service token.

  - `client_id: optional string`

    The Client ID for the service token. Access will check for this value in the `CF-Access-Client-ID` request header.

  - `doh_jwt_duration: optional string`

    The duration the DoH JWT is valid for. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.  Note that the maximum duration for this setting is the same as the key rotation period on the account. Default expiration is 24h

  - `duration: optional string`

    The duration for how long the service token will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. The default is 1 year in hours (8760h).

  - `expires_at: optional string`

  - `name: optional string`

    The name of the service token.
