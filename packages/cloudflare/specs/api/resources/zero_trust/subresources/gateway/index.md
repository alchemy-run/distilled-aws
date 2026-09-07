# Gateway

## Get Zero Trust account information

**get** `/accounts/{account_id}/gateway`

Retrieve information about the current Zero Trust account.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { id, gateway_tag, provider_name }`

  - `id: optional string`

    Specify the Cloudflare account ID.

  - `gateway_tag: optional string`

    Specify the gateway internal ID.

  - `provider_name: optional string`

    Specify the provider name (usually Cloudflare).

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway \
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
    "id": "699d98642c564d2e855e9661899b7252",
    "gateway_tag": "f174e90afafe4643bbbc4a0ed4fc8415",
    "provider_name": "Cloudflare"
  }
}
```

## Create Zero Trust account

**post** `/accounts/{account_id}/gateway`

Create a Zero Trust account for an existing Cloudflare account.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { id, gateway_tag, provider_name }`

  - `id: optional string`

    Specify the Cloudflare account ID.

  - `gateway_tag: optional string`

    Specify the gateway internal ID.

  - `provider_name: optional string`

    Specify the provider name (usually Cloudflare).

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway \
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
    "id": "699d98642c564d2e855e9661899b7252",
    "gateway_tag": "f174e90afafe4643bbbc4a0ed4fc8415",
    "provider_name": "Cloudflare"
  }
}
```

## Domain Types

### Gateway List Response

- `GatewayListResponse object { id, gateway_tag, provider_name }`

  - `id: optional string`

    Specify the Cloudflare account ID.

  - `gateway_tag: optional string`

    Specify the gateway internal ID.

  - `provider_name: optional string`

    Specify the provider name (usually Cloudflare).

### Gateway Create Response

- `GatewayCreateResponse object { id, gateway_tag, provider_name }`

  - `id: optional string`

    Specify the Cloudflare account ID.

  - `gateway_tag: optional string`

    Specify the gateway internal ID.

  - `provider_name: optional string`

    Specify the provider name (usually Cloudflare).

# Audit SSH Settings

## Get Zero Trust SSH settings

**get** `/accounts/{account_id}/gateway/audit_ssh_settings`

Retrieve all Zero Trust Audit SSH and SSH with Access for Infrastructure settings for an account.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional GatewaySettings`

  - `created_at: optional string`

  - `public_key: optional string`

    Provide the Base64-encoded HPKE public key that encrypts SSH session logs. See https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/use-cases/ssh/ssh-infrastructure-access/#enable-ssh-command-logging.

  - `seed_id: optional string`

    Identify the seed ID.

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/audit_ssh_settings \
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
    "created_at": "2014-01-01T05:20:00.12345Z",
    "public_key": "1pyl6I1tL7xfJuFYVzXlUW8uXXlpxegHXBzGCBKaSFA=",
    "seed_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Update Zero Trust SSH settings

**put** `/accounts/{account_id}/gateway/audit_ssh_settings`

Update Zero Trust Audit SSH and SSH with Access for Infrastructure settings for an account.

### Path Parameters

- `account_id: string`

### Body Parameters

- `public_key: string`

  Provide the Base64-encoded HPKE public key that encrypts SSH session logs. See https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/use-cases/ssh/ssh-infrastructure-access/#enable-ssh-command-logging.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional GatewaySettings`

  - `created_at: optional string`

  - `public_key: optional string`

    Provide the Base64-encoded HPKE public key that encrypts SSH session logs. See https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/use-cases/ssh/ssh-infrastructure-access/#enable-ssh-command-logging.

  - `seed_id: optional string`

    Identify the seed ID.

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/audit_ssh_settings \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "public_key": "1pyl6I1tL7xfJuFYVzXlUW8uXXlpxegHXBzGCBKaSFA="
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
    "created_at": "2014-01-01T05:20:00.12345Z",
    "public_key": "1pyl6I1tL7xfJuFYVzXlUW8uXXlpxegHXBzGCBKaSFA=",
    "seed_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Rotate Zero Trust SSH account seed

**post** `/accounts/{account_id}/gateway/audit_ssh_settings/rotate_seed`

Rotate the SSH account seed that generates the host key identity when connecting through the Cloudflare SSH Proxy.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional GatewaySettings`

  - `created_at: optional string`

  - `public_key: optional string`

    Provide the Base64-encoded HPKE public key that encrypts SSH session logs. See https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/use-cases/ssh/ssh-infrastructure-access/#enable-ssh-command-logging.

  - `seed_id: optional string`

    Identify the seed ID.

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/audit_ssh_settings/rotate_seed \
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
    "created_at": "2014-01-01T05:20:00.12345Z",
    "public_key": "1pyl6I1tL7xfJuFYVzXlUW8uXXlpxegHXBzGCBKaSFA=",
    "seed_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Domain Types

### Gateway Settings

- `GatewaySettings object { created_at, public_key, seed_id, updated_at }`

  - `created_at: optional string`

  - `public_key: optional string`

    Provide the Base64-encoded HPKE public key that encrypts SSH session logs. See https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/use-cases/ssh/ssh-infrastructure-access/#enable-ssh-command-logging.

  - `seed_id: optional string`

    Identify the seed ID.

  - `updated_at: optional string`

# Categories

## List categories

**get** `/accounts/{account_id}/gateway/categories`

List all categories.

### Path Parameters

- `account_id: string`

  Provide the identifier string.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional array of Category`

  - `id: optional number`

    Identify this category. Only one category per ID.

  - `beta: optional boolean`

    Indicate whether the category is in beta and subject to change.

  - `class: optional "free" or "premium" or "blocked" or 2 more`

    Specify which account types can create policies for this category. `blocked` Blocks unconditionally for all accounts. `removalPending` Allows removal from policies but disables addition. `noBlock` Prevents blocking.

    - `"free"`

    - `"premium"`

    - `"blocked"`

    - `"removalPending"`

    - `"noBlock"`

  - `description: optional string`

    Provide a short summary of domains in the category.

  - `name: optional string`

    Specify the category name.

  - `subcategories: optional array of object { id, beta, class, 2 more }`

    Provide all subcategories for this category.

    - `id: optional number`

      Identify this category. Only one category per ID.

    - `beta: optional boolean`

      Indicate whether the category is in beta and subject to change.

    - `class: optional "free" or "premium" or "blocked" or 2 more`

      Specify which account types can create policies for this category. `blocked` Blocks unconditionally for all accounts. `removalPending` Allows removal from policies but disables addition. `noBlock` Prevents blocking.

      - `"free"`

      - `"premium"`

      - `"blocked"`

      - `"removalPending"`

      - `"noBlock"`

    - `description: optional string`

      Provide a short summary of domains in the category.

    - `name: optional string`

      Specify the category name.

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Indicate the total number of results for the requested service.

  - `page: optional number`

    Indicate the current page within a paginated list of results.

  - `per_page: optional number`

    Indicate the number of results per page.

  - `total_count: optional number`

    Indicate the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/categories \
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
      "id": 0,
      "beta": false,
      "class": "premium",
      "description": "Sites related to educational content that are not included in other categories such as Science, Technology or Educational institutions.",
      "name": "Education",
      "subcategories": [
        {
          "id": 0,
          "beta": false,
          "class": "premium",
          "description": "Sites related to educational content that are not included in other categories such as Science, Technology or Educational institutions.",
          "name": "Education"
        }
      ]
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Domain Types

### Category

- `Category object { id, beta, class, 3 more }`

  - `id: optional number`

    Identify this category. Only one category per ID.

  - `beta: optional boolean`

    Indicate whether the category is in beta and subject to change.

  - `class: optional "free" or "premium" or "blocked" or 2 more`

    Specify which account types can create policies for this category. `blocked` Blocks unconditionally for all accounts. `removalPending` Allows removal from policies but disables addition. `noBlock` Prevents blocking.

    - `"free"`

    - `"premium"`

    - `"blocked"`

    - `"removalPending"`

    - `"noBlock"`

  - `description: optional string`

    Provide a short summary of domains in the category.

  - `name: optional string`

    Specify the category name.

  - `subcategories: optional array of object { id, beta, class, 2 more }`

    Provide all subcategories for this category.

    - `id: optional number`

      Identify this category. Only one category per ID.

    - `beta: optional boolean`

      Indicate whether the category is in beta and subject to change.

    - `class: optional "free" or "premium" or "blocked" or 2 more`

      Specify which account types can create policies for this category. `blocked` Blocks unconditionally for all accounts. `removalPending` Allows removal from policies but disables addition. `noBlock` Prevents blocking.

      - `"free"`

      - `"premium"`

      - `"blocked"`

      - `"removalPending"`

      - `"noBlock"`

    - `description: optional string`

      Provide a short summary of domains in the category.

    - `name: optional string`

      Specify the category name.

# App Types

## List application and application type mappings

**get** `/accounts/{account_id}/gateway/app_types`

List all application and application type mappings.

### Path Parameters

- `account_id: string`

  Provide the identifier string.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional array of AppType`

  - `ZeroTrustGatewayApplication object { id, application_type_id, created_at, name }`

    - `id: optional number`

      Identify this application. Only one application per ID.

    - `application_type_id: optional number`

      Identify the type of this application. Multiple applications can share the same type. Refers to the `id` of a returned application type.

    - `created_at: optional string`

    - `name: optional string`

      Specify the name of the application or application type.

  - `ZeroTrustGatewayApplicationType object { id, created_at, description, name }`

    - `id: optional number`

      Identify the type of this application. Multiple applications can share the same type. Refers to the `id` of a returned application type.

    - `created_at: optional string`

    - `description: optional string`

      Provide a short summary of applications with this type.

    - `name: optional string`

      Specify the name of the application or application type.

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Indicate the total number of results for the requested service.

  - `page: optional number`

    Indicate the current page within a paginated list of results.

  - `per_page: optional number`

    Indicate the number of results per page.

  - `total_count: optional number`

    Indicate the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/app_types \
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
      "id": 0,
      "application_type_id": 0,
      "created_at": "2014-01-01T05:20:00.12345Z",
      "name": "Facebook"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Domain Types

### App Type

- `AppType = object { id, application_type_id, created_at, name }  or object { id, created_at, description, name }`

  - `ZeroTrustGatewayApplication object { id, application_type_id, created_at, name }`

    - `id: optional number`

      Identify this application. Only one application per ID.

    - `application_type_id: optional number`

      Identify the type of this application. Multiple applications can share the same type. Refers to the `id` of a returned application type.

    - `created_at: optional string`

    - `name: optional string`

      Specify the name of the application or application type.

  - `ZeroTrustGatewayApplicationType object { id, created_at, description, name }`

    - `id: optional number`

      Identify the type of this application. Multiple applications can share the same type. Refers to the `id` of a returned application type.

    - `created_at: optional string`

    - `description: optional string`

      Provide a short summary of applications with this type.

    - `name: optional string`

      Specify the name of the application or application type.

# Configurations

## Get Zero Trust account configuration

**get** `/accounts/{account_id}/gateway/configuration`

Retrieve the current Zero Trust account configuration.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { created_at, settings, updated_at }`

  Specify account settings.

  - `created_at: optional string`

  - `settings: optional GatewayConfigurationSettings`

    Specify account settings.

    - `activity_log: optional ActivityLogSettings`

      Specify activity log settings.

      - `enabled: optional boolean`

        Specify whether to log activity.

    - `antivirus: optional AntiVirusSettings`

      Specify anti-virus settings.

      - `enabled_download_phase: optional boolean`

        Specify whether to enable anti-virus scanning on downloads.

      - `enabled_upload_phase: optional boolean`

        Specify whether to enable anti-virus scanning on uploads.

      - `fail_closed: optional boolean`

        Specify whether to block requests for unscannable files.

      - `notification_settings: optional NotificationSettings`

        Configure the message the user's device shows during an antivirus scan.

        - `enabled: optional boolean`

          Specify whether to enable notifications.

        - `include_context: optional boolean`

          Specify whether to include context information as query parameters.

        - `msg: optional string`

          Specify the message to show in the notification.

        - `support_url: optional string`

          Specify a URL that directs users to more information. If unset, the notification opens a block page.

    - `block_page: optional BlockPageSettings`

      Specify block page layout settings.

      - `background_color: optional string`

        Specify the block page background color in `#rrggbb` format when the mode is customized_block_page.

      - `enabled: optional boolean`

        Specify whether to enable the custom block page.

      - `footer_text: optional string`

        Specify the block page footer text when the mode is customized_block_page.

      - `header_text: optional string`

        Specify the block page header text when the mode is customized_block_page.

      - `include_context: optional boolean`

        Specify whether to append context to target_uri as query parameters. This applies only when the mode is redirect_uri.

      - `logo_path: optional string`

        Specify the full URL to the logo file when the mode is customized_block_page.

      - `mailto_address: optional string`

        Specify the admin email for users to contact when the mode is customized_block_page.

      - `mailto_subject: optional string`

        Specify the subject line for emails created from the block page when the mode is customized_block_page.

      - `mode: optional "" or "customized_block_page" or "redirect_uri"`

        Specify whether to redirect users to a Cloudflare-hosted block page or a customer-provided URI.

        - `""`

        - `"customized_block_page"`

        - `"redirect_uri"`

      - `name: optional string`

        Specify the block page title when the mode is customized_block_page.

      - `read_only: optional boolean`

        Indicate that this setting was shared via the Orgs API and read only for the current account.

      - `source_account: optional string`

        Indicate the account tag of the account that shared this setting.

      - `suppress_footer: optional boolean`

        Specify whether to suppress detailed information at the bottom of the block page when the mode is customized_block_page.

      - `target_uri: optional string`

        Specify the URI to redirect users to when the mode is redirect_uri.

      - `version: optional number`

        Indicate the version number of the setting.

    - `body_scanning: optional BodyScanningSettings`

      Specify the DLP inspection mode.

      - `inspection_mode: optional "deep" or "shallow"`

        Specify the inspection mode as either `deep` or `shallow`.

        - `"deep"`

        - `"shallow"`

    - `browser_isolation: optional BrowserIsolationSettings`

      Specify Clientless Browser Isolation settings.

      - `non_identity_enabled: optional boolean`

        Specify whether to enable non-identity onramp support for Browser Isolation.

      - `url_browser_isolation_enabled: optional boolean`

        Specify whether to enable Clientless Browser Isolation.

    - `certificate: optional object { id }`

      Specify certificate settings for Gateway TLS interception. If unset, the Cloudflare Root CA handles interception.

      - `id: string`

        Specify the UUID of the certificate used for interception. Ensure the certificate is available at the edge(previously called 'active'). A nil UUID directs Cloudflare to use the Root CA.

    - `custom_certificate: optional CustomCertificateSettings`

      Specify custom certificate settings for BYO-PKI. This field is deprecated; use `certificate` instead.

      - `enabled: boolean`

        Specify whether to enable a custom certificate authority for signing Gateway traffic.

      - `id: optional string`

        Specify the UUID of the certificate (ID from MTLS certificate store).

      - `binding_status: optional string`

        Indicate the internal certificate status.

      - `updated_at: optional string`

    - `extended_email_matching: optional ExtendedEmailMatching`

      Configures user email settings for firewall policies. When you enable this, the system standardizes email addresses in the identity portion of the rule to match extended email variants in firewall policies. When you disable this setting, the system matches email addresses exactly as you provide them. Enable this setting if your email uses `.` or `+` modifiers.

      - `enabled: optional boolean`

        Specify whether to match all variants of user emails (with + or . modifiers) used as criteria in Firewall policies.

      - `read_only: optional boolean`

        Indicate that this setting was shared via the Orgs API and read only for the current account.

      - `source_account: optional string`

        Indicate the account tag of the account that shared this setting.

      - `version: optional number`

        Indicate the version number of the setting.

    - `fips: optional FipsSettings`

      Specify FIPS settings.

      - `tls: optional boolean`

        Enforce cipher suites and TLS versions compliant with FIPS 140-2.

    - `host_selector: optional object { enabled }`

      Enable host selection in egress policies.

      - `enabled: optional boolean`

        Specify whether to enable filtering via hosts for egress policies.

    - `inspection: optional object { mode }`

      Define the proxy inspection mode.

      - `mode: optional "static" or "dynamic"`

        Define the proxy inspection mode.   1. static: Gateway applies static inspection to HTTP on TCP(80). With TLS decryption on, Gateway inspects HTTPS traffic on TCP(443) and UDP(443).   2. dynamic: Gateway applies protocol detection to inspect HTTP and HTTPS traffic on any port. TLS decryption must remain on to inspect HTTPS traffic.

        - `"static"`

        - `"dynamic"`

    - `max_ttl_secs: optional number`

      Account-level cap on DNS response TTLs, in seconds. Gateway rewrites DNS responses so returned record TTLs do not exceed this value. Null means no cap. Each DNS location can inherit, override, or disable it through the location `max_ttl` setting.

    - `protocol_detection: optional ProtocolDetection`

      Specify whether to detect protocols from the initial bytes of client traffic.

      - `enabled: optional boolean`

        Specify whether to detect protocols from the initial bytes of client traffic.

    - `sandbox: optional object { enabled, fallback_action }`

      Specify whether to enable the sandbox.

      - `enabled: optional boolean`

        Specify whether to enable the sandbox.

      - `fallback_action: optional "allow" or "block"`

        Specify the action to take when the system cannot scan the file.

        - `"allow"`

        - `"block"`

    - `tls_decrypt: optional TLSSettings`

      Specify whether to inspect encrypted HTTP traffic.

      - `enabled: optional boolean`

        Specify whether to inspect encrypted HTTP traffic.

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/configuration \
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
    "created_at": "2014-01-01T05:20:00.12345Z",
    "settings": {
      "activity_log": {
        "enabled": true
      },
      "antivirus": {
        "enabled_download_phase": false,
        "enabled_upload_phase": false,
        "fail_closed": false,
        "notification_settings": {
          "enabled": true,
          "include_context": true,
          "msg": "msg",
          "support_url": "support_url"
        }
      },
      "block_page": {
        "background_color": "background_color",
        "enabled": true,
        "footer_text": "--footer--",
        "header_text": "--header--",
        "include_context": true,
        "logo_path": "https://logos.com/a.png",
        "mailto_address": "admin@example.com",
        "mailto_subject": "Blocked User Inquiry",
        "mode": "",
        "name": "Cloudflare",
        "read_only": true,
        "source_account": "source_account",
        "suppress_footer": false,
        "target_uri": "https://example.com",
        "version": 1
      },
      "body_scanning": {
        "inspection_mode": "deep"
      },
      "browser_isolation": {
        "non_identity_enabled": true,
        "url_browser_isolation_enabled": true
      },
      "certificate": {
        "id": "d1b364c5-1311-466e-a194-f0e943e0799f"
      },
      "custom_certificate": {
        "enabled": true,
        "id": "d1b364c5-1311-466e-a194-f0e943e0799f",
        "binding_status": "pending_deployment",
        "updated_at": "2019-12-27T18:11:19.117Z"
      },
      "extended_email_matching": {
        "enabled": true,
        "read_only": true,
        "source_account": "source_account",
        "version": 1
      },
      "fips": {
        "tls": true
      },
      "host_selector": {
        "enabled": false
      },
      "inspection": {
        "mode": "static"
      },
      "max_ttl_secs": 3600,
      "protocol_detection": {
        "enabled": true
      },
      "sandbox": {
        "enabled": true,
        "fallback_action": "allow"
      },
      "tls_decrypt": {
        "enabled": true
      }
    },
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Update Zero Trust account configuration

**put** `/accounts/{account_id}/gateway/configuration`

Update the current Zero Trust account configuration.

### Path Parameters

- `account_id: string`

### Body Parameters

- `settings: optional GatewayConfigurationSettings`

  Specify account settings.

  - `activity_log: optional ActivityLogSettings`

    Specify activity log settings.

    - `enabled: optional boolean`

      Specify whether to log activity.

  - `antivirus: optional AntiVirusSettings`

    Specify anti-virus settings.

    - `enabled_download_phase: optional boolean`

      Specify whether to enable anti-virus scanning on downloads.

    - `enabled_upload_phase: optional boolean`

      Specify whether to enable anti-virus scanning on uploads.

    - `fail_closed: optional boolean`

      Specify whether to block requests for unscannable files.

    - `notification_settings: optional NotificationSettings`

      Configure the message the user's device shows during an antivirus scan.

      - `enabled: optional boolean`

        Specify whether to enable notifications.

      - `include_context: optional boolean`

        Specify whether to include context information as query parameters.

      - `msg: optional string`

        Specify the message to show in the notification.

      - `support_url: optional string`

        Specify a URL that directs users to more information. If unset, the notification opens a block page.

  - `block_page: optional BlockPageSettings`

    Specify block page layout settings.

    - `background_color: optional string`

      Specify the block page background color in `#rrggbb` format when the mode is customized_block_page.

    - `enabled: optional boolean`

      Specify whether to enable the custom block page.

    - `footer_text: optional string`

      Specify the block page footer text when the mode is customized_block_page.

    - `header_text: optional string`

      Specify the block page header text when the mode is customized_block_page.

    - `include_context: optional boolean`

      Specify whether to append context to target_uri as query parameters. This applies only when the mode is redirect_uri.

    - `logo_path: optional string`

      Specify the full URL to the logo file when the mode is customized_block_page.

    - `mailto_address: optional string`

      Specify the admin email for users to contact when the mode is customized_block_page.

    - `mailto_subject: optional string`

      Specify the subject line for emails created from the block page when the mode is customized_block_page.

    - `mode: optional "" or "customized_block_page" or "redirect_uri"`

      Specify whether to redirect users to a Cloudflare-hosted block page or a customer-provided URI.

      - `""`

      - `"customized_block_page"`

      - `"redirect_uri"`

    - `name: optional string`

      Specify the block page title when the mode is customized_block_page.

    - `read_only: optional boolean`

      Indicate that this setting was shared via the Orgs API and read only for the current account.

    - `source_account: optional string`

      Indicate the account tag of the account that shared this setting.

    - `suppress_footer: optional boolean`

      Specify whether to suppress detailed information at the bottom of the block page when the mode is customized_block_page.

    - `target_uri: optional string`

      Specify the URI to redirect users to when the mode is redirect_uri.

    - `version: optional number`

      Indicate the version number of the setting.

  - `body_scanning: optional BodyScanningSettings`

    Specify the DLP inspection mode.

    - `inspection_mode: optional "deep" or "shallow"`

      Specify the inspection mode as either `deep` or `shallow`.

      - `"deep"`

      - `"shallow"`

  - `browser_isolation: optional BrowserIsolationSettings`

    Specify Clientless Browser Isolation settings.

    - `non_identity_enabled: optional boolean`

      Specify whether to enable non-identity onramp support for Browser Isolation.

    - `url_browser_isolation_enabled: optional boolean`

      Specify whether to enable Clientless Browser Isolation.

  - `certificate: optional object { id }`

    Specify certificate settings for Gateway TLS interception. If unset, the Cloudflare Root CA handles interception.

    - `id: string`

      Specify the UUID of the certificate used for interception. Ensure the certificate is available at the edge(previously called 'active'). A nil UUID directs Cloudflare to use the Root CA.

  - `custom_certificate: optional CustomCertificateSettings`

    Specify custom certificate settings for BYO-PKI. This field is deprecated; use `certificate` instead.

    - `enabled: boolean`

      Specify whether to enable a custom certificate authority for signing Gateway traffic.

    - `id: optional string`

      Specify the UUID of the certificate (ID from MTLS certificate store).

    - `binding_status: optional string`

      Indicate the internal certificate status.

    - `updated_at: optional string`

  - `extended_email_matching: optional ExtendedEmailMatching`

    Configures user email settings for firewall policies. When you enable this, the system standardizes email addresses in the identity portion of the rule to match extended email variants in firewall policies. When you disable this setting, the system matches email addresses exactly as you provide them. Enable this setting if your email uses `.` or `+` modifiers.

    - `enabled: optional boolean`

      Specify whether to match all variants of user emails (with + or . modifiers) used as criteria in Firewall policies.

    - `read_only: optional boolean`

      Indicate that this setting was shared via the Orgs API and read only for the current account.

    - `source_account: optional string`

      Indicate the account tag of the account that shared this setting.

    - `version: optional number`

      Indicate the version number of the setting.

  - `fips: optional FipsSettings`

    Specify FIPS settings.

    - `tls: optional boolean`

      Enforce cipher suites and TLS versions compliant with FIPS 140-2.

  - `host_selector: optional object { enabled }`

    Enable host selection in egress policies.

    - `enabled: optional boolean`

      Specify whether to enable filtering via hosts for egress policies.

  - `inspection: optional object { mode }`

    Define the proxy inspection mode.

    - `mode: optional "static" or "dynamic"`

      Define the proxy inspection mode.   1. static: Gateway applies static inspection to HTTP on TCP(80). With TLS decryption on, Gateway inspects HTTPS traffic on TCP(443) and UDP(443).   2. dynamic: Gateway applies protocol detection to inspect HTTP and HTTPS traffic on any port. TLS decryption must remain on to inspect HTTPS traffic.

      - `"static"`

      - `"dynamic"`

  - `max_ttl_secs: optional number`

    Account-level cap on DNS response TTLs, in seconds. Gateway rewrites DNS responses so returned record TTLs do not exceed this value. Null means no cap. Each DNS location can inherit, override, or disable it through the location `max_ttl` setting.

  - `protocol_detection: optional ProtocolDetection`

    Specify whether to detect protocols from the initial bytes of client traffic.

    - `enabled: optional boolean`

      Specify whether to detect protocols from the initial bytes of client traffic.

  - `sandbox: optional object { enabled, fallback_action }`

    Specify whether to enable the sandbox.

    - `enabled: optional boolean`

      Specify whether to enable the sandbox.

    - `fallback_action: optional "allow" or "block"`

      Specify the action to take when the system cannot scan the file.

      - `"allow"`

      - `"block"`

  - `tls_decrypt: optional TLSSettings`

    Specify whether to inspect encrypted HTTP traffic.

    - `enabled: optional boolean`

      Specify whether to inspect encrypted HTTP traffic.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { created_at, settings, updated_at }`

  Specify account settings.

  - `created_at: optional string`

  - `settings: optional GatewayConfigurationSettings`

    Specify account settings.

    - `activity_log: optional ActivityLogSettings`

      Specify activity log settings.

      - `enabled: optional boolean`

        Specify whether to log activity.

    - `antivirus: optional AntiVirusSettings`

      Specify anti-virus settings.

      - `enabled_download_phase: optional boolean`

        Specify whether to enable anti-virus scanning on downloads.

      - `enabled_upload_phase: optional boolean`

        Specify whether to enable anti-virus scanning on uploads.

      - `fail_closed: optional boolean`

        Specify whether to block requests for unscannable files.

      - `notification_settings: optional NotificationSettings`

        Configure the message the user's device shows during an antivirus scan.

        - `enabled: optional boolean`

          Specify whether to enable notifications.

        - `include_context: optional boolean`

          Specify whether to include context information as query parameters.

        - `msg: optional string`

          Specify the message to show in the notification.

        - `support_url: optional string`

          Specify a URL that directs users to more information. If unset, the notification opens a block page.

    - `block_page: optional BlockPageSettings`

      Specify block page layout settings.

      - `background_color: optional string`

        Specify the block page background color in `#rrggbb` format when the mode is customized_block_page.

      - `enabled: optional boolean`

        Specify whether to enable the custom block page.

      - `footer_text: optional string`

        Specify the block page footer text when the mode is customized_block_page.

      - `header_text: optional string`

        Specify the block page header text when the mode is customized_block_page.

      - `include_context: optional boolean`

        Specify whether to append context to target_uri as query parameters. This applies only when the mode is redirect_uri.

      - `logo_path: optional string`

        Specify the full URL to the logo file when the mode is customized_block_page.

      - `mailto_address: optional string`

        Specify the admin email for users to contact when the mode is customized_block_page.

      - `mailto_subject: optional string`

        Specify the subject line for emails created from the block page when the mode is customized_block_page.

      - `mode: optional "" or "customized_block_page" or "redirect_uri"`

        Specify whether to redirect users to a Cloudflare-hosted block page or a customer-provided URI.

        - `""`

        - `"customized_block_page"`

        - `"redirect_uri"`

      - `name: optional string`

        Specify the block page title when the mode is customized_block_page.

      - `read_only: optional boolean`

        Indicate that this setting was shared via the Orgs API and read only for the current account.

      - `source_account: optional string`

        Indicate the account tag of the account that shared this setting.

      - `suppress_footer: optional boolean`

        Specify whether to suppress detailed information at the bottom of the block page when the mode is customized_block_page.

      - `target_uri: optional string`

        Specify the URI to redirect users to when the mode is redirect_uri.

      - `version: optional number`

        Indicate the version number of the setting.

    - `body_scanning: optional BodyScanningSettings`

      Specify the DLP inspection mode.

      - `inspection_mode: optional "deep" or "shallow"`

        Specify the inspection mode as either `deep` or `shallow`.

        - `"deep"`

        - `"shallow"`

    - `browser_isolation: optional BrowserIsolationSettings`

      Specify Clientless Browser Isolation settings.

      - `non_identity_enabled: optional boolean`

        Specify whether to enable non-identity onramp support for Browser Isolation.

      - `url_browser_isolation_enabled: optional boolean`

        Specify whether to enable Clientless Browser Isolation.

    - `certificate: optional object { id }`

      Specify certificate settings for Gateway TLS interception. If unset, the Cloudflare Root CA handles interception.

      - `id: string`

        Specify the UUID of the certificate used for interception. Ensure the certificate is available at the edge(previously called 'active'). A nil UUID directs Cloudflare to use the Root CA.

    - `custom_certificate: optional CustomCertificateSettings`

      Specify custom certificate settings for BYO-PKI. This field is deprecated; use `certificate` instead.

      - `enabled: boolean`

        Specify whether to enable a custom certificate authority for signing Gateway traffic.

      - `id: optional string`

        Specify the UUID of the certificate (ID from MTLS certificate store).

      - `binding_status: optional string`

        Indicate the internal certificate status.

      - `updated_at: optional string`

    - `extended_email_matching: optional ExtendedEmailMatching`

      Configures user email settings for firewall policies. When you enable this, the system standardizes email addresses in the identity portion of the rule to match extended email variants in firewall policies. When you disable this setting, the system matches email addresses exactly as you provide them. Enable this setting if your email uses `.` or `+` modifiers.

      - `enabled: optional boolean`

        Specify whether to match all variants of user emails (with + or . modifiers) used as criteria in Firewall policies.

      - `read_only: optional boolean`

        Indicate that this setting was shared via the Orgs API and read only for the current account.

      - `source_account: optional string`

        Indicate the account tag of the account that shared this setting.

      - `version: optional number`

        Indicate the version number of the setting.

    - `fips: optional FipsSettings`

      Specify FIPS settings.

      - `tls: optional boolean`

        Enforce cipher suites and TLS versions compliant with FIPS 140-2.

    - `host_selector: optional object { enabled }`

      Enable host selection in egress policies.

      - `enabled: optional boolean`

        Specify whether to enable filtering via hosts for egress policies.

    - `inspection: optional object { mode }`

      Define the proxy inspection mode.

      - `mode: optional "static" or "dynamic"`

        Define the proxy inspection mode.   1. static: Gateway applies static inspection to HTTP on TCP(80). With TLS decryption on, Gateway inspects HTTPS traffic on TCP(443) and UDP(443).   2. dynamic: Gateway applies protocol detection to inspect HTTP and HTTPS traffic on any port. TLS decryption must remain on to inspect HTTPS traffic.

        - `"static"`

        - `"dynamic"`

    - `max_ttl_secs: optional number`

      Account-level cap on DNS response TTLs, in seconds. Gateway rewrites DNS responses so returned record TTLs do not exceed this value. Null means no cap. Each DNS location can inherit, override, or disable it through the location `max_ttl` setting.

    - `protocol_detection: optional ProtocolDetection`

      Specify whether to detect protocols from the initial bytes of client traffic.

      - `enabled: optional boolean`

        Specify whether to detect protocols from the initial bytes of client traffic.

    - `sandbox: optional object { enabled, fallback_action }`

      Specify whether to enable the sandbox.

      - `enabled: optional boolean`

        Specify whether to enable the sandbox.

      - `fallback_action: optional "allow" or "block"`

        Specify the action to take when the system cannot scan the file.

        - `"allow"`

        - `"block"`

    - `tls_decrypt: optional TLSSettings`

      Specify whether to inspect encrypted HTTP traffic.

      - `enabled: optional boolean`

        Specify whether to inspect encrypted HTTP traffic.

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/configuration \
    -X PUT \
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
    "created_at": "2014-01-01T05:20:00.12345Z",
    "settings": {
      "activity_log": {
        "enabled": true
      },
      "antivirus": {
        "enabled_download_phase": false,
        "enabled_upload_phase": false,
        "fail_closed": false,
        "notification_settings": {
          "enabled": true,
          "include_context": true,
          "msg": "msg",
          "support_url": "support_url"
        }
      },
      "block_page": {
        "background_color": "background_color",
        "enabled": true,
        "footer_text": "--footer--",
        "header_text": "--header--",
        "include_context": true,
        "logo_path": "https://logos.com/a.png",
        "mailto_address": "admin@example.com",
        "mailto_subject": "Blocked User Inquiry",
        "mode": "",
        "name": "Cloudflare",
        "read_only": true,
        "source_account": "source_account",
        "suppress_footer": false,
        "target_uri": "https://example.com",
        "version": 1
      },
      "body_scanning": {
        "inspection_mode": "deep"
      },
      "browser_isolation": {
        "non_identity_enabled": true,
        "url_browser_isolation_enabled": true
      },
      "certificate": {
        "id": "d1b364c5-1311-466e-a194-f0e943e0799f"
      },
      "custom_certificate": {
        "enabled": true,
        "id": "d1b364c5-1311-466e-a194-f0e943e0799f",
        "binding_status": "pending_deployment",
        "updated_at": "2019-12-27T18:11:19.117Z"
      },
      "extended_email_matching": {
        "enabled": true,
        "read_only": true,
        "source_account": "source_account",
        "version": 1
      },
      "fips": {
        "tls": true
      },
      "host_selector": {
        "enabled": false
      },
      "inspection": {
        "mode": "static"
      },
      "max_ttl_secs": 3600,
      "protocol_detection": {
        "enabled": true
      },
      "sandbox": {
        "enabled": true,
        "fallback_action": "allow"
      },
      "tls_decrypt": {
        "enabled": true
      }
    },
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Patch Zero Trust account configuration

**patch** `/accounts/{account_id}/gateway/configuration`

Update (PATCH) a single subcollection of settings such as `antivirus`, `tls_decrypt`, `activity_log`, `block_page`, `browser_isolation`, `fips`, `body_scanning`, `certificate`, or `max_ttl_secs` without updating the entire configuration object. This endpoint returns an error if any settings collection lacks proper configuration.

### Path Parameters

- `account_id: string`

### Body Parameters

- `settings: optional GatewayConfigurationSettings`

  Specify account settings.

  - `activity_log: optional ActivityLogSettings`

    Specify activity log settings.

    - `enabled: optional boolean`

      Specify whether to log activity.

  - `antivirus: optional AntiVirusSettings`

    Specify anti-virus settings.

    - `enabled_download_phase: optional boolean`

      Specify whether to enable anti-virus scanning on downloads.

    - `enabled_upload_phase: optional boolean`

      Specify whether to enable anti-virus scanning on uploads.

    - `fail_closed: optional boolean`

      Specify whether to block requests for unscannable files.

    - `notification_settings: optional NotificationSettings`

      Configure the message the user's device shows during an antivirus scan.

      - `enabled: optional boolean`

        Specify whether to enable notifications.

      - `include_context: optional boolean`

        Specify whether to include context information as query parameters.

      - `msg: optional string`

        Specify the message to show in the notification.

      - `support_url: optional string`

        Specify a URL that directs users to more information. If unset, the notification opens a block page.

  - `block_page: optional BlockPageSettings`

    Specify block page layout settings.

    - `background_color: optional string`

      Specify the block page background color in `#rrggbb` format when the mode is customized_block_page.

    - `enabled: optional boolean`

      Specify whether to enable the custom block page.

    - `footer_text: optional string`

      Specify the block page footer text when the mode is customized_block_page.

    - `header_text: optional string`

      Specify the block page header text when the mode is customized_block_page.

    - `include_context: optional boolean`

      Specify whether to append context to target_uri as query parameters. This applies only when the mode is redirect_uri.

    - `logo_path: optional string`

      Specify the full URL to the logo file when the mode is customized_block_page.

    - `mailto_address: optional string`

      Specify the admin email for users to contact when the mode is customized_block_page.

    - `mailto_subject: optional string`

      Specify the subject line for emails created from the block page when the mode is customized_block_page.

    - `mode: optional "" or "customized_block_page" or "redirect_uri"`

      Specify whether to redirect users to a Cloudflare-hosted block page or a customer-provided URI.

      - `""`

      - `"customized_block_page"`

      - `"redirect_uri"`

    - `name: optional string`

      Specify the block page title when the mode is customized_block_page.

    - `read_only: optional boolean`

      Indicate that this setting was shared via the Orgs API and read only for the current account.

    - `source_account: optional string`

      Indicate the account tag of the account that shared this setting.

    - `suppress_footer: optional boolean`

      Specify whether to suppress detailed information at the bottom of the block page when the mode is customized_block_page.

    - `target_uri: optional string`

      Specify the URI to redirect users to when the mode is redirect_uri.

    - `version: optional number`

      Indicate the version number of the setting.

  - `body_scanning: optional BodyScanningSettings`

    Specify the DLP inspection mode.

    - `inspection_mode: optional "deep" or "shallow"`

      Specify the inspection mode as either `deep` or `shallow`.

      - `"deep"`

      - `"shallow"`

  - `browser_isolation: optional BrowserIsolationSettings`

    Specify Clientless Browser Isolation settings.

    - `non_identity_enabled: optional boolean`

      Specify whether to enable non-identity onramp support for Browser Isolation.

    - `url_browser_isolation_enabled: optional boolean`

      Specify whether to enable Clientless Browser Isolation.

  - `certificate: optional object { id }`

    Specify certificate settings for Gateway TLS interception. If unset, the Cloudflare Root CA handles interception.

    - `id: string`

      Specify the UUID of the certificate used for interception. Ensure the certificate is available at the edge(previously called 'active'). A nil UUID directs Cloudflare to use the Root CA.

  - `custom_certificate: optional CustomCertificateSettings`

    Specify custom certificate settings for BYO-PKI. This field is deprecated; use `certificate` instead.

    - `enabled: boolean`

      Specify whether to enable a custom certificate authority for signing Gateway traffic.

    - `id: optional string`

      Specify the UUID of the certificate (ID from MTLS certificate store).

    - `binding_status: optional string`

      Indicate the internal certificate status.

    - `updated_at: optional string`

  - `extended_email_matching: optional ExtendedEmailMatching`

    Configures user email settings for firewall policies. When you enable this, the system standardizes email addresses in the identity portion of the rule to match extended email variants in firewall policies. When you disable this setting, the system matches email addresses exactly as you provide them. Enable this setting if your email uses `.` or `+` modifiers.

    - `enabled: optional boolean`

      Specify whether to match all variants of user emails (with + or . modifiers) used as criteria in Firewall policies.

    - `read_only: optional boolean`

      Indicate that this setting was shared via the Orgs API and read only for the current account.

    - `source_account: optional string`

      Indicate the account tag of the account that shared this setting.

    - `version: optional number`

      Indicate the version number of the setting.

  - `fips: optional FipsSettings`

    Specify FIPS settings.

    - `tls: optional boolean`

      Enforce cipher suites and TLS versions compliant with FIPS 140-2.

  - `host_selector: optional object { enabled }`

    Enable host selection in egress policies.

    - `enabled: optional boolean`

      Specify whether to enable filtering via hosts for egress policies.

  - `inspection: optional object { mode }`

    Define the proxy inspection mode.

    - `mode: optional "static" or "dynamic"`

      Define the proxy inspection mode.   1. static: Gateway applies static inspection to HTTP on TCP(80). With TLS decryption on, Gateway inspects HTTPS traffic on TCP(443) and UDP(443).   2. dynamic: Gateway applies protocol detection to inspect HTTP and HTTPS traffic on any port. TLS decryption must remain on to inspect HTTPS traffic.

      - `"static"`

      - `"dynamic"`

  - `max_ttl_secs: optional number`

    Account-level cap on DNS response TTLs, in seconds. Gateway rewrites DNS responses so returned record TTLs do not exceed this value. Null means no cap. Each DNS location can inherit, override, or disable it through the location `max_ttl` setting.

  - `protocol_detection: optional ProtocolDetection`

    Specify whether to detect protocols from the initial bytes of client traffic.

    - `enabled: optional boolean`

      Specify whether to detect protocols from the initial bytes of client traffic.

  - `sandbox: optional object { enabled, fallback_action }`

    Specify whether to enable the sandbox.

    - `enabled: optional boolean`

      Specify whether to enable the sandbox.

    - `fallback_action: optional "allow" or "block"`

      Specify the action to take when the system cannot scan the file.

      - `"allow"`

      - `"block"`

  - `tls_decrypt: optional TLSSettings`

    Specify whether to inspect encrypted HTTP traffic.

    - `enabled: optional boolean`

      Specify whether to inspect encrypted HTTP traffic.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { created_at, settings, updated_at }`

  Specify account settings.

  - `created_at: optional string`

  - `settings: optional GatewayConfigurationSettings`

    Specify account settings.

    - `activity_log: optional ActivityLogSettings`

      Specify activity log settings.

      - `enabled: optional boolean`

        Specify whether to log activity.

    - `antivirus: optional AntiVirusSettings`

      Specify anti-virus settings.

      - `enabled_download_phase: optional boolean`

        Specify whether to enable anti-virus scanning on downloads.

      - `enabled_upload_phase: optional boolean`

        Specify whether to enable anti-virus scanning on uploads.

      - `fail_closed: optional boolean`

        Specify whether to block requests for unscannable files.

      - `notification_settings: optional NotificationSettings`

        Configure the message the user's device shows during an antivirus scan.

        - `enabled: optional boolean`

          Specify whether to enable notifications.

        - `include_context: optional boolean`

          Specify whether to include context information as query parameters.

        - `msg: optional string`

          Specify the message to show in the notification.

        - `support_url: optional string`

          Specify a URL that directs users to more information. If unset, the notification opens a block page.

    - `block_page: optional BlockPageSettings`

      Specify block page layout settings.

      - `background_color: optional string`

        Specify the block page background color in `#rrggbb` format when the mode is customized_block_page.

      - `enabled: optional boolean`

        Specify whether to enable the custom block page.

      - `footer_text: optional string`

        Specify the block page footer text when the mode is customized_block_page.

      - `header_text: optional string`

        Specify the block page header text when the mode is customized_block_page.

      - `include_context: optional boolean`

        Specify whether to append context to target_uri as query parameters. This applies only when the mode is redirect_uri.

      - `logo_path: optional string`

        Specify the full URL to the logo file when the mode is customized_block_page.

      - `mailto_address: optional string`

        Specify the admin email for users to contact when the mode is customized_block_page.

      - `mailto_subject: optional string`

        Specify the subject line for emails created from the block page when the mode is customized_block_page.

      - `mode: optional "" or "customized_block_page" or "redirect_uri"`

        Specify whether to redirect users to a Cloudflare-hosted block page or a customer-provided URI.

        - `""`

        - `"customized_block_page"`

        - `"redirect_uri"`

      - `name: optional string`

        Specify the block page title when the mode is customized_block_page.

      - `read_only: optional boolean`

        Indicate that this setting was shared via the Orgs API and read only for the current account.

      - `source_account: optional string`

        Indicate the account tag of the account that shared this setting.

      - `suppress_footer: optional boolean`

        Specify whether to suppress detailed information at the bottom of the block page when the mode is customized_block_page.

      - `target_uri: optional string`

        Specify the URI to redirect users to when the mode is redirect_uri.

      - `version: optional number`

        Indicate the version number of the setting.

    - `body_scanning: optional BodyScanningSettings`

      Specify the DLP inspection mode.

      - `inspection_mode: optional "deep" or "shallow"`

        Specify the inspection mode as either `deep` or `shallow`.

        - `"deep"`

        - `"shallow"`

    - `browser_isolation: optional BrowserIsolationSettings`

      Specify Clientless Browser Isolation settings.

      - `non_identity_enabled: optional boolean`

        Specify whether to enable non-identity onramp support for Browser Isolation.

      - `url_browser_isolation_enabled: optional boolean`

        Specify whether to enable Clientless Browser Isolation.

    - `certificate: optional object { id }`

      Specify certificate settings for Gateway TLS interception. If unset, the Cloudflare Root CA handles interception.

      - `id: string`

        Specify the UUID of the certificate used for interception. Ensure the certificate is available at the edge(previously called 'active'). A nil UUID directs Cloudflare to use the Root CA.

    - `custom_certificate: optional CustomCertificateSettings`

      Specify custom certificate settings for BYO-PKI. This field is deprecated; use `certificate` instead.

      - `enabled: boolean`

        Specify whether to enable a custom certificate authority for signing Gateway traffic.

      - `id: optional string`

        Specify the UUID of the certificate (ID from MTLS certificate store).

      - `binding_status: optional string`

        Indicate the internal certificate status.

      - `updated_at: optional string`

    - `extended_email_matching: optional ExtendedEmailMatching`

      Configures user email settings for firewall policies. When you enable this, the system standardizes email addresses in the identity portion of the rule to match extended email variants in firewall policies. When you disable this setting, the system matches email addresses exactly as you provide them. Enable this setting if your email uses `.` or `+` modifiers.

      - `enabled: optional boolean`

        Specify whether to match all variants of user emails (with + or . modifiers) used as criteria in Firewall policies.

      - `read_only: optional boolean`

        Indicate that this setting was shared via the Orgs API and read only for the current account.

      - `source_account: optional string`

        Indicate the account tag of the account that shared this setting.

      - `version: optional number`

        Indicate the version number of the setting.

    - `fips: optional FipsSettings`

      Specify FIPS settings.

      - `tls: optional boolean`

        Enforce cipher suites and TLS versions compliant with FIPS 140-2.

    - `host_selector: optional object { enabled }`

      Enable host selection in egress policies.

      - `enabled: optional boolean`

        Specify whether to enable filtering via hosts for egress policies.

    - `inspection: optional object { mode }`

      Define the proxy inspection mode.

      - `mode: optional "static" or "dynamic"`

        Define the proxy inspection mode.   1. static: Gateway applies static inspection to HTTP on TCP(80). With TLS decryption on, Gateway inspects HTTPS traffic on TCP(443) and UDP(443).   2. dynamic: Gateway applies protocol detection to inspect HTTP and HTTPS traffic on any port. TLS decryption must remain on to inspect HTTPS traffic.

        - `"static"`

        - `"dynamic"`

    - `max_ttl_secs: optional number`

      Account-level cap on DNS response TTLs, in seconds. Gateway rewrites DNS responses so returned record TTLs do not exceed this value. Null means no cap. Each DNS location can inherit, override, or disable it through the location `max_ttl` setting.

    - `protocol_detection: optional ProtocolDetection`

      Specify whether to detect protocols from the initial bytes of client traffic.

      - `enabled: optional boolean`

        Specify whether to detect protocols from the initial bytes of client traffic.

    - `sandbox: optional object { enabled, fallback_action }`

      Specify whether to enable the sandbox.

      - `enabled: optional boolean`

        Specify whether to enable the sandbox.

      - `fallback_action: optional "allow" or "block"`

        Specify the action to take when the system cannot scan the file.

        - `"allow"`

        - `"block"`

    - `tls_decrypt: optional TLSSettings`

      Specify whether to inspect encrypted HTTP traffic.

      - `enabled: optional boolean`

        Specify whether to inspect encrypted HTTP traffic.

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/configuration \
    -X PATCH \
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
    "created_at": "2014-01-01T05:20:00.12345Z",
    "settings": {
      "activity_log": {
        "enabled": true
      },
      "antivirus": {
        "enabled_download_phase": false,
        "enabled_upload_phase": false,
        "fail_closed": false,
        "notification_settings": {
          "enabled": true,
          "include_context": true,
          "msg": "msg",
          "support_url": "support_url"
        }
      },
      "block_page": {
        "background_color": "background_color",
        "enabled": true,
        "footer_text": "--footer--",
        "header_text": "--header--",
        "include_context": true,
        "logo_path": "https://logos.com/a.png",
        "mailto_address": "admin@example.com",
        "mailto_subject": "Blocked User Inquiry",
        "mode": "",
        "name": "Cloudflare",
        "read_only": true,
        "source_account": "source_account",
        "suppress_footer": false,
        "target_uri": "https://example.com",
        "version": 1
      },
      "body_scanning": {
        "inspection_mode": "deep"
      },
      "browser_isolation": {
        "non_identity_enabled": true,
        "url_browser_isolation_enabled": true
      },
      "certificate": {
        "id": "d1b364c5-1311-466e-a194-f0e943e0799f"
      },
      "custom_certificate": {
        "enabled": true,
        "id": "d1b364c5-1311-466e-a194-f0e943e0799f",
        "binding_status": "pending_deployment",
        "updated_at": "2019-12-27T18:11:19.117Z"
      },
      "extended_email_matching": {
        "enabled": true,
        "read_only": true,
        "source_account": "source_account",
        "version": 1
      },
      "fips": {
        "tls": true
      },
      "host_selector": {
        "enabled": false
      },
      "inspection": {
        "mode": "static"
      },
      "max_ttl_secs": 3600,
      "protocol_detection": {
        "enabled": true
      },
      "sandbox": {
        "enabled": true,
        "fallback_action": "allow"
      },
      "tls_decrypt": {
        "enabled": true
      }
    },
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Domain Types

### Activity Log Settings

- `ActivityLogSettings object { enabled }`

  Specify activity log settings.

  - `enabled: optional boolean`

    Specify whether to log activity.

### Anti Virus Settings

- `AntiVirusSettings object { enabled_download_phase, enabled_upload_phase, fail_closed, notification_settings }`

  Specify anti-virus settings.

  - `enabled_download_phase: optional boolean`

    Specify whether to enable anti-virus scanning on downloads.

  - `enabled_upload_phase: optional boolean`

    Specify whether to enable anti-virus scanning on uploads.

  - `fail_closed: optional boolean`

    Specify whether to block requests for unscannable files.

  - `notification_settings: optional NotificationSettings`

    Configure the message the user's device shows during an antivirus scan.

    - `enabled: optional boolean`

      Specify whether to enable notifications.

    - `include_context: optional boolean`

      Specify whether to include context information as query parameters.

    - `msg: optional string`

      Specify the message to show in the notification.

    - `support_url: optional string`

      Specify a URL that directs users to more information. If unset, the notification opens a block page.

### Block Page Settings

- `BlockPageSettings object { background_color, enabled, footer_text, 12 more }`

  Specify block page layout settings.

  - `background_color: optional string`

    Specify the block page background color in `#rrggbb` format when the mode is customized_block_page.

  - `enabled: optional boolean`

    Specify whether to enable the custom block page.

  - `footer_text: optional string`

    Specify the block page footer text when the mode is customized_block_page.

  - `header_text: optional string`

    Specify the block page header text when the mode is customized_block_page.

  - `include_context: optional boolean`

    Specify whether to append context to target_uri as query parameters. This applies only when the mode is redirect_uri.

  - `logo_path: optional string`

    Specify the full URL to the logo file when the mode is customized_block_page.

  - `mailto_address: optional string`

    Specify the admin email for users to contact when the mode is customized_block_page.

  - `mailto_subject: optional string`

    Specify the subject line for emails created from the block page when the mode is customized_block_page.

  - `mode: optional "" or "customized_block_page" or "redirect_uri"`

    Specify whether to redirect users to a Cloudflare-hosted block page or a customer-provided URI.

    - `""`

    - `"customized_block_page"`

    - `"redirect_uri"`

  - `name: optional string`

    Specify the block page title when the mode is customized_block_page.

  - `read_only: optional boolean`

    Indicate that this setting was shared via the Orgs API and read only for the current account.

  - `source_account: optional string`

    Indicate the account tag of the account that shared this setting.

  - `suppress_footer: optional boolean`

    Specify whether to suppress detailed information at the bottom of the block page when the mode is customized_block_page.

  - `target_uri: optional string`

    Specify the URI to redirect users to when the mode is redirect_uri.

  - `version: optional number`

    Indicate the version number of the setting.

### Body Scanning Settings

- `BodyScanningSettings object { inspection_mode }`

  Specify the DLP inspection mode.

  - `inspection_mode: optional "deep" or "shallow"`

    Specify the inspection mode as either `deep` or `shallow`.

    - `"deep"`

    - `"shallow"`

### Browser Isolation Settings

- `BrowserIsolationSettings object { non_identity_enabled, url_browser_isolation_enabled }`

  Specify Clientless Browser Isolation settings.

  - `non_identity_enabled: optional boolean`

    Specify whether to enable non-identity onramp support for Browser Isolation.

  - `url_browser_isolation_enabled: optional boolean`

    Specify whether to enable Clientless Browser Isolation.

### Custom Certificate Settings

- `CustomCertificateSettings object { enabled, id, binding_status, updated_at }`

  Specify custom certificate settings for BYO-PKI. This field is deprecated; use `certificate` instead.

  - `enabled: boolean`

    Specify whether to enable a custom certificate authority for signing Gateway traffic.

  - `id: optional string`

    Specify the UUID of the certificate (ID from MTLS certificate store).

  - `binding_status: optional string`

    Indicate the internal certificate status.

  - `updated_at: optional string`

### Extended Email Matching

- `ExtendedEmailMatching object { enabled, read_only, source_account, version }`

  Configures user email settings for firewall policies. When you enable this, the system standardizes email addresses in the identity portion of the rule to match extended email variants in firewall policies. When you disable this setting, the system matches email addresses exactly as you provide them. Enable this setting if your email uses `.` or `+` modifiers.

  - `enabled: optional boolean`

    Specify whether to match all variants of user emails (with + or . modifiers) used as criteria in Firewall policies.

  - `read_only: optional boolean`

    Indicate that this setting was shared via the Orgs API and read only for the current account.

  - `source_account: optional string`

    Indicate the account tag of the account that shared this setting.

  - `version: optional number`

    Indicate the version number of the setting.

### Fips Settings

- `FipsSettings object { tls }`

  Specify FIPS settings.

  - `tls: optional boolean`

    Enforce cipher suites and TLS versions compliant with FIPS 140-2.

### Gateway Configuration Settings

- `GatewayConfigurationSettings object { activity_log, antivirus, block_page, 12 more }`

  Specify account settings.

  - `activity_log: optional ActivityLogSettings`

    Specify activity log settings.

    - `enabled: optional boolean`

      Specify whether to log activity.

  - `antivirus: optional AntiVirusSettings`

    Specify anti-virus settings.

    - `enabled_download_phase: optional boolean`

      Specify whether to enable anti-virus scanning on downloads.

    - `enabled_upload_phase: optional boolean`

      Specify whether to enable anti-virus scanning on uploads.

    - `fail_closed: optional boolean`

      Specify whether to block requests for unscannable files.

    - `notification_settings: optional NotificationSettings`

      Configure the message the user's device shows during an antivirus scan.

      - `enabled: optional boolean`

        Specify whether to enable notifications.

      - `include_context: optional boolean`

        Specify whether to include context information as query parameters.

      - `msg: optional string`

        Specify the message to show in the notification.

      - `support_url: optional string`

        Specify a URL that directs users to more information. If unset, the notification opens a block page.

  - `block_page: optional BlockPageSettings`

    Specify block page layout settings.

    - `background_color: optional string`

      Specify the block page background color in `#rrggbb` format when the mode is customized_block_page.

    - `enabled: optional boolean`

      Specify whether to enable the custom block page.

    - `footer_text: optional string`

      Specify the block page footer text when the mode is customized_block_page.

    - `header_text: optional string`

      Specify the block page header text when the mode is customized_block_page.

    - `include_context: optional boolean`

      Specify whether to append context to target_uri as query parameters. This applies only when the mode is redirect_uri.

    - `logo_path: optional string`

      Specify the full URL to the logo file when the mode is customized_block_page.

    - `mailto_address: optional string`

      Specify the admin email for users to contact when the mode is customized_block_page.

    - `mailto_subject: optional string`

      Specify the subject line for emails created from the block page when the mode is customized_block_page.

    - `mode: optional "" or "customized_block_page" or "redirect_uri"`

      Specify whether to redirect users to a Cloudflare-hosted block page or a customer-provided URI.

      - `""`

      - `"customized_block_page"`

      - `"redirect_uri"`

    - `name: optional string`

      Specify the block page title when the mode is customized_block_page.

    - `read_only: optional boolean`

      Indicate that this setting was shared via the Orgs API and read only for the current account.

    - `source_account: optional string`

      Indicate the account tag of the account that shared this setting.

    - `suppress_footer: optional boolean`

      Specify whether to suppress detailed information at the bottom of the block page when the mode is customized_block_page.

    - `target_uri: optional string`

      Specify the URI to redirect users to when the mode is redirect_uri.

    - `version: optional number`

      Indicate the version number of the setting.

  - `body_scanning: optional BodyScanningSettings`

    Specify the DLP inspection mode.

    - `inspection_mode: optional "deep" or "shallow"`

      Specify the inspection mode as either `deep` or `shallow`.

      - `"deep"`

      - `"shallow"`

  - `browser_isolation: optional BrowserIsolationSettings`

    Specify Clientless Browser Isolation settings.

    - `non_identity_enabled: optional boolean`

      Specify whether to enable non-identity onramp support for Browser Isolation.

    - `url_browser_isolation_enabled: optional boolean`

      Specify whether to enable Clientless Browser Isolation.

  - `certificate: optional object { id }`

    Specify certificate settings for Gateway TLS interception. If unset, the Cloudflare Root CA handles interception.

    - `id: string`

      Specify the UUID of the certificate used for interception. Ensure the certificate is available at the edge(previously called 'active'). A nil UUID directs Cloudflare to use the Root CA.

  - `custom_certificate: optional CustomCertificateSettings`

    Specify custom certificate settings for BYO-PKI. This field is deprecated; use `certificate` instead.

    - `enabled: boolean`

      Specify whether to enable a custom certificate authority for signing Gateway traffic.

    - `id: optional string`

      Specify the UUID of the certificate (ID from MTLS certificate store).

    - `binding_status: optional string`

      Indicate the internal certificate status.

    - `updated_at: optional string`

  - `extended_email_matching: optional ExtendedEmailMatching`

    Configures user email settings for firewall policies. When you enable this, the system standardizes email addresses in the identity portion of the rule to match extended email variants in firewall policies. When you disable this setting, the system matches email addresses exactly as you provide them. Enable this setting if your email uses `.` or `+` modifiers.

    - `enabled: optional boolean`

      Specify whether to match all variants of user emails (with + or . modifiers) used as criteria in Firewall policies.

    - `read_only: optional boolean`

      Indicate that this setting was shared via the Orgs API and read only for the current account.

    - `source_account: optional string`

      Indicate the account tag of the account that shared this setting.

    - `version: optional number`

      Indicate the version number of the setting.

  - `fips: optional FipsSettings`

    Specify FIPS settings.

    - `tls: optional boolean`

      Enforce cipher suites and TLS versions compliant with FIPS 140-2.

  - `host_selector: optional object { enabled }`

    Enable host selection in egress policies.

    - `enabled: optional boolean`

      Specify whether to enable filtering via hosts for egress policies.

  - `inspection: optional object { mode }`

    Define the proxy inspection mode.

    - `mode: optional "static" or "dynamic"`

      Define the proxy inspection mode.   1. static: Gateway applies static inspection to HTTP on TCP(80). With TLS decryption on, Gateway inspects HTTPS traffic on TCP(443) and UDP(443).   2. dynamic: Gateway applies protocol detection to inspect HTTP and HTTPS traffic on any port. TLS decryption must remain on to inspect HTTPS traffic.

      - `"static"`

      - `"dynamic"`

  - `max_ttl_secs: optional number`

    Account-level cap on DNS response TTLs, in seconds. Gateway rewrites DNS responses so returned record TTLs do not exceed this value. Null means no cap. Each DNS location can inherit, override, or disable it through the location `max_ttl` setting.

  - `protocol_detection: optional ProtocolDetection`

    Specify whether to detect protocols from the initial bytes of client traffic.

    - `enabled: optional boolean`

      Specify whether to detect protocols from the initial bytes of client traffic.

  - `sandbox: optional object { enabled, fallback_action }`

    Specify whether to enable the sandbox.

    - `enabled: optional boolean`

      Specify whether to enable the sandbox.

    - `fallback_action: optional "allow" or "block"`

      Specify the action to take when the system cannot scan the file.

      - `"allow"`

      - `"block"`

  - `tls_decrypt: optional TLSSettings`

    Specify whether to inspect encrypted HTTP traffic.

    - `enabled: optional boolean`

      Specify whether to inspect encrypted HTTP traffic.

### Notification Settings

- `NotificationSettings object { enabled, include_context, msg, support_url }`

  Configure the message the user's device shows during an antivirus scan.

  - `enabled: optional boolean`

    Specify whether to enable notifications.

  - `include_context: optional boolean`

    Specify whether to include context information as query parameters.

  - `msg: optional string`

    Specify the message to show in the notification.

  - `support_url: optional string`

    Specify a URL that directs users to more information. If unset, the notification opens a block page.

### Protocol Detection

- `ProtocolDetection object { enabled }`

  Specify whether to detect protocols from the initial bytes of client traffic.

  - `enabled: optional boolean`

    Specify whether to detect protocols from the initial bytes of client traffic.

### TLS Settings

- `TLSSettings object { enabled }`

  Specify whether to inspect encrypted HTTP traffic.

  - `enabled: optional boolean`

    Specify whether to inspect encrypted HTTP traffic.

### Configuration Get Response

- `ConfigurationGetResponse object { created_at, settings, updated_at }`

  Specify account settings.

  - `created_at: optional string`

  - `settings: optional GatewayConfigurationSettings`

    Specify account settings.

    - `activity_log: optional ActivityLogSettings`

      Specify activity log settings.

      - `enabled: optional boolean`

        Specify whether to log activity.

    - `antivirus: optional AntiVirusSettings`

      Specify anti-virus settings.

      - `enabled_download_phase: optional boolean`

        Specify whether to enable anti-virus scanning on downloads.

      - `enabled_upload_phase: optional boolean`

        Specify whether to enable anti-virus scanning on uploads.

      - `fail_closed: optional boolean`

        Specify whether to block requests for unscannable files.

      - `notification_settings: optional NotificationSettings`

        Configure the message the user's device shows during an antivirus scan.

        - `enabled: optional boolean`

          Specify whether to enable notifications.

        - `include_context: optional boolean`

          Specify whether to include context information as query parameters.

        - `msg: optional string`

          Specify the message to show in the notification.

        - `support_url: optional string`

          Specify a URL that directs users to more information. If unset, the notification opens a block page.

    - `block_page: optional BlockPageSettings`

      Specify block page layout settings.

      - `background_color: optional string`

        Specify the block page background color in `#rrggbb` format when the mode is customized_block_page.

      - `enabled: optional boolean`

        Specify whether to enable the custom block page.

      - `footer_text: optional string`

        Specify the block page footer text when the mode is customized_block_page.

      - `header_text: optional string`

        Specify the block page header text when the mode is customized_block_page.

      - `include_context: optional boolean`

        Specify whether to append context to target_uri as query parameters. This applies only when the mode is redirect_uri.

      - `logo_path: optional string`

        Specify the full URL to the logo file when the mode is customized_block_page.

      - `mailto_address: optional string`

        Specify the admin email for users to contact when the mode is customized_block_page.

      - `mailto_subject: optional string`

        Specify the subject line for emails created from the block page when the mode is customized_block_page.

      - `mode: optional "" or "customized_block_page" or "redirect_uri"`

        Specify whether to redirect users to a Cloudflare-hosted block page or a customer-provided URI.

        - `""`

        - `"customized_block_page"`

        - `"redirect_uri"`

      - `name: optional string`

        Specify the block page title when the mode is customized_block_page.

      - `read_only: optional boolean`

        Indicate that this setting was shared via the Orgs API and read only for the current account.

      - `source_account: optional string`

        Indicate the account tag of the account that shared this setting.

      - `suppress_footer: optional boolean`

        Specify whether to suppress detailed information at the bottom of the block page when the mode is customized_block_page.

      - `target_uri: optional string`

        Specify the URI to redirect users to when the mode is redirect_uri.

      - `version: optional number`

        Indicate the version number of the setting.

    - `body_scanning: optional BodyScanningSettings`

      Specify the DLP inspection mode.

      - `inspection_mode: optional "deep" or "shallow"`

        Specify the inspection mode as either `deep` or `shallow`.

        - `"deep"`

        - `"shallow"`

    - `browser_isolation: optional BrowserIsolationSettings`

      Specify Clientless Browser Isolation settings.

      - `non_identity_enabled: optional boolean`

        Specify whether to enable non-identity onramp support for Browser Isolation.

      - `url_browser_isolation_enabled: optional boolean`

        Specify whether to enable Clientless Browser Isolation.

    - `certificate: optional object { id }`

      Specify certificate settings for Gateway TLS interception. If unset, the Cloudflare Root CA handles interception.

      - `id: string`

        Specify the UUID of the certificate used for interception. Ensure the certificate is available at the edge(previously called 'active'). A nil UUID directs Cloudflare to use the Root CA.

    - `custom_certificate: optional CustomCertificateSettings`

      Specify custom certificate settings for BYO-PKI. This field is deprecated; use `certificate` instead.

      - `enabled: boolean`

        Specify whether to enable a custom certificate authority for signing Gateway traffic.

      - `id: optional string`

        Specify the UUID of the certificate (ID from MTLS certificate store).

      - `binding_status: optional string`

        Indicate the internal certificate status.

      - `updated_at: optional string`

    - `extended_email_matching: optional ExtendedEmailMatching`

      Configures user email settings for firewall policies. When you enable this, the system standardizes email addresses in the identity portion of the rule to match extended email variants in firewall policies. When you disable this setting, the system matches email addresses exactly as you provide them. Enable this setting if your email uses `.` or `+` modifiers.

      - `enabled: optional boolean`

        Specify whether to match all variants of user emails (with + or . modifiers) used as criteria in Firewall policies.

      - `read_only: optional boolean`

        Indicate that this setting was shared via the Orgs API and read only for the current account.

      - `source_account: optional string`

        Indicate the account tag of the account that shared this setting.

      - `version: optional number`

        Indicate the version number of the setting.

    - `fips: optional FipsSettings`

      Specify FIPS settings.

      - `tls: optional boolean`

        Enforce cipher suites and TLS versions compliant with FIPS 140-2.

    - `host_selector: optional object { enabled }`

      Enable host selection in egress policies.

      - `enabled: optional boolean`

        Specify whether to enable filtering via hosts for egress policies.

    - `inspection: optional object { mode }`

      Define the proxy inspection mode.

      - `mode: optional "static" or "dynamic"`

        Define the proxy inspection mode.   1. static: Gateway applies static inspection to HTTP on TCP(80). With TLS decryption on, Gateway inspects HTTPS traffic on TCP(443) and UDP(443).   2. dynamic: Gateway applies protocol detection to inspect HTTP and HTTPS traffic on any port. TLS decryption must remain on to inspect HTTPS traffic.

        - `"static"`

        - `"dynamic"`

    - `max_ttl_secs: optional number`

      Account-level cap on DNS response TTLs, in seconds. Gateway rewrites DNS responses so returned record TTLs do not exceed this value. Null means no cap. Each DNS location can inherit, override, or disable it through the location `max_ttl` setting.

    - `protocol_detection: optional ProtocolDetection`

      Specify whether to detect protocols from the initial bytes of client traffic.

      - `enabled: optional boolean`

        Specify whether to detect protocols from the initial bytes of client traffic.

    - `sandbox: optional object { enabled, fallback_action }`

      Specify whether to enable the sandbox.

      - `enabled: optional boolean`

        Specify whether to enable the sandbox.

      - `fallback_action: optional "allow" or "block"`

        Specify the action to take when the system cannot scan the file.

        - `"allow"`

        - `"block"`

    - `tls_decrypt: optional TLSSettings`

      Specify whether to inspect encrypted HTTP traffic.

      - `enabled: optional boolean`

        Specify whether to inspect encrypted HTTP traffic.

  - `updated_at: optional string`

### Configuration Update Response

- `ConfigurationUpdateResponse object { created_at, settings, updated_at }`

  Specify account settings.

  - `created_at: optional string`

  - `settings: optional GatewayConfigurationSettings`

    Specify account settings.

    - `activity_log: optional ActivityLogSettings`

      Specify activity log settings.

      - `enabled: optional boolean`

        Specify whether to log activity.

    - `antivirus: optional AntiVirusSettings`

      Specify anti-virus settings.

      - `enabled_download_phase: optional boolean`

        Specify whether to enable anti-virus scanning on downloads.

      - `enabled_upload_phase: optional boolean`

        Specify whether to enable anti-virus scanning on uploads.

      - `fail_closed: optional boolean`

        Specify whether to block requests for unscannable files.

      - `notification_settings: optional NotificationSettings`

        Configure the message the user's device shows during an antivirus scan.

        - `enabled: optional boolean`

          Specify whether to enable notifications.

        - `include_context: optional boolean`

          Specify whether to include context information as query parameters.

        - `msg: optional string`

          Specify the message to show in the notification.

        - `support_url: optional string`

          Specify a URL that directs users to more information. If unset, the notification opens a block page.

    - `block_page: optional BlockPageSettings`

      Specify block page layout settings.

      - `background_color: optional string`

        Specify the block page background color in `#rrggbb` format when the mode is customized_block_page.

      - `enabled: optional boolean`

        Specify whether to enable the custom block page.

      - `footer_text: optional string`

        Specify the block page footer text when the mode is customized_block_page.

      - `header_text: optional string`

        Specify the block page header text when the mode is customized_block_page.

      - `include_context: optional boolean`

        Specify whether to append context to target_uri as query parameters. This applies only when the mode is redirect_uri.

      - `logo_path: optional string`

        Specify the full URL to the logo file when the mode is customized_block_page.

      - `mailto_address: optional string`

        Specify the admin email for users to contact when the mode is customized_block_page.

      - `mailto_subject: optional string`

        Specify the subject line for emails created from the block page when the mode is customized_block_page.

      - `mode: optional "" or "customized_block_page" or "redirect_uri"`

        Specify whether to redirect users to a Cloudflare-hosted block page or a customer-provided URI.

        - `""`

        - `"customized_block_page"`

        - `"redirect_uri"`

      - `name: optional string`

        Specify the block page title when the mode is customized_block_page.

      - `read_only: optional boolean`

        Indicate that this setting was shared via the Orgs API and read only for the current account.

      - `source_account: optional string`

        Indicate the account tag of the account that shared this setting.

      - `suppress_footer: optional boolean`

        Specify whether to suppress detailed information at the bottom of the block page when the mode is customized_block_page.

      - `target_uri: optional string`

        Specify the URI to redirect users to when the mode is redirect_uri.

      - `version: optional number`

        Indicate the version number of the setting.

    - `body_scanning: optional BodyScanningSettings`

      Specify the DLP inspection mode.

      - `inspection_mode: optional "deep" or "shallow"`

        Specify the inspection mode as either `deep` or `shallow`.

        - `"deep"`

        - `"shallow"`

    - `browser_isolation: optional BrowserIsolationSettings`

      Specify Clientless Browser Isolation settings.

      - `non_identity_enabled: optional boolean`

        Specify whether to enable non-identity onramp support for Browser Isolation.

      - `url_browser_isolation_enabled: optional boolean`

        Specify whether to enable Clientless Browser Isolation.

    - `certificate: optional object { id }`

      Specify certificate settings for Gateway TLS interception. If unset, the Cloudflare Root CA handles interception.

      - `id: string`

        Specify the UUID of the certificate used for interception. Ensure the certificate is available at the edge(previously called 'active'). A nil UUID directs Cloudflare to use the Root CA.

    - `custom_certificate: optional CustomCertificateSettings`

      Specify custom certificate settings for BYO-PKI. This field is deprecated; use `certificate` instead.

      - `enabled: boolean`

        Specify whether to enable a custom certificate authority for signing Gateway traffic.

      - `id: optional string`

        Specify the UUID of the certificate (ID from MTLS certificate store).

      - `binding_status: optional string`

        Indicate the internal certificate status.

      - `updated_at: optional string`

    - `extended_email_matching: optional ExtendedEmailMatching`

      Configures user email settings for firewall policies. When you enable this, the system standardizes email addresses in the identity portion of the rule to match extended email variants in firewall policies. When you disable this setting, the system matches email addresses exactly as you provide them. Enable this setting if your email uses `.` or `+` modifiers.

      - `enabled: optional boolean`

        Specify whether to match all variants of user emails (with + or . modifiers) used as criteria in Firewall policies.

      - `read_only: optional boolean`

        Indicate that this setting was shared via the Orgs API and read only for the current account.

      - `source_account: optional string`

        Indicate the account tag of the account that shared this setting.

      - `version: optional number`

        Indicate the version number of the setting.

    - `fips: optional FipsSettings`

      Specify FIPS settings.

      - `tls: optional boolean`

        Enforce cipher suites and TLS versions compliant with FIPS 140-2.

    - `host_selector: optional object { enabled }`

      Enable host selection in egress policies.

      - `enabled: optional boolean`

        Specify whether to enable filtering via hosts for egress policies.

    - `inspection: optional object { mode }`

      Define the proxy inspection mode.

      - `mode: optional "static" or "dynamic"`

        Define the proxy inspection mode.   1. static: Gateway applies static inspection to HTTP on TCP(80). With TLS decryption on, Gateway inspects HTTPS traffic on TCP(443) and UDP(443).   2. dynamic: Gateway applies protocol detection to inspect HTTP and HTTPS traffic on any port. TLS decryption must remain on to inspect HTTPS traffic.

        - `"static"`

        - `"dynamic"`

    - `max_ttl_secs: optional number`

      Account-level cap on DNS response TTLs, in seconds. Gateway rewrites DNS responses so returned record TTLs do not exceed this value. Null means no cap. Each DNS location can inherit, override, or disable it through the location `max_ttl` setting.

    - `protocol_detection: optional ProtocolDetection`

      Specify whether to detect protocols from the initial bytes of client traffic.

      - `enabled: optional boolean`

        Specify whether to detect protocols from the initial bytes of client traffic.

    - `sandbox: optional object { enabled, fallback_action }`

      Specify whether to enable the sandbox.

      - `enabled: optional boolean`

        Specify whether to enable the sandbox.

      - `fallback_action: optional "allow" or "block"`

        Specify the action to take when the system cannot scan the file.

        - `"allow"`

        - `"block"`

    - `tls_decrypt: optional TLSSettings`

      Specify whether to inspect encrypted HTTP traffic.

      - `enabled: optional boolean`

        Specify whether to inspect encrypted HTTP traffic.

  - `updated_at: optional string`

### Configuration Edit Response

- `ConfigurationEditResponse object { created_at, settings, updated_at }`

  Specify account settings.

  - `created_at: optional string`

  - `settings: optional GatewayConfigurationSettings`

    Specify account settings.

    - `activity_log: optional ActivityLogSettings`

      Specify activity log settings.

      - `enabled: optional boolean`

        Specify whether to log activity.

    - `antivirus: optional AntiVirusSettings`

      Specify anti-virus settings.

      - `enabled_download_phase: optional boolean`

        Specify whether to enable anti-virus scanning on downloads.

      - `enabled_upload_phase: optional boolean`

        Specify whether to enable anti-virus scanning on uploads.

      - `fail_closed: optional boolean`

        Specify whether to block requests for unscannable files.

      - `notification_settings: optional NotificationSettings`

        Configure the message the user's device shows during an antivirus scan.

        - `enabled: optional boolean`

          Specify whether to enable notifications.

        - `include_context: optional boolean`

          Specify whether to include context information as query parameters.

        - `msg: optional string`

          Specify the message to show in the notification.

        - `support_url: optional string`

          Specify a URL that directs users to more information. If unset, the notification opens a block page.

    - `block_page: optional BlockPageSettings`

      Specify block page layout settings.

      - `background_color: optional string`

        Specify the block page background color in `#rrggbb` format when the mode is customized_block_page.

      - `enabled: optional boolean`

        Specify whether to enable the custom block page.

      - `footer_text: optional string`

        Specify the block page footer text when the mode is customized_block_page.

      - `header_text: optional string`

        Specify the block page header text when the mode is customized_block_page.

      - `include_context: optional boolean`

        Specify whether to append context to target_uri as query parameters. This applies only when the mode is redirect_uri.

      - `logo_path: optional string`

        Specify the full URL to the logo file when the mode is customized_block_page.

      - `mailto_address: optional string`

        Specify the admin email for users to contact when the mode is customized_block_page.

      - `mailto_subject: optional string`

        Specify the subject line for emails created from the block page when the mode is customized_block_page.

      - `mode: optional "" or "customized_block_page" or "redirect_uri"`

        Specify whether to redirect users to a Cloudflare-hosted block page or a customer-provided URI.

        - `""`

        - `"customized_block_page"`

        - `"redirect_uri"`

      - `name: optional string`

        Specify the block page title when the mode is customized_block_page.

      - `read_only: optional boolean`

        Indicate that this setting was shared via the Orgs API and read only for the current account.

      - `source_account: optional string`

        Indicate the account tag of the account that shared this setting.

      - `suppress_footer: optional boolean`

        Specify whether to suppress detailed information at the bottom of the block page when the mode is customized_block_page.

      - `target_uri: optional string`

        Specify the URI to redirect users to when the mode is redirect_uri.

      - `version: optional number`

        Indicate the version number of the setting.

    - `body_scanning: optional BodyScanningSettings`

      Specify the DLP inspection mode.

      - `inspection_mode: optional "deep" or "shallow"`

        Specify the inspection mode as either `deep` or `shallow`.

        - `"deep"`

        - `"shallow"`

    - `browser_isolation: optional BrowserIsolationSettings`

      Specify Clientless Browser Isolation settings.

      - `non_identity_enabled: optional boolean`

        Specify whether to enable non-identity onramp support for Browser Isolation.

      - `url_browser_isolation_enabled: optional boolean`

        Specify whether to enable Clientless Browser Isolation.

    - `certificate: optional object { id }`

      Specify certificate settings for Gateway TLS interception. If unset, the Cloudflare Root CA handles interception.

      - `id: string`

        Specify the UUID of the certificate used for interception. Ensure the certificate is available at the edge(previously called 'active'). A nil UUID directs Cloudflare to use the Root CA.

    - `custom_certificate: optional CustomCertificateSettings`

      Specify custom certificate settings for BYO-PKI. This field is deprecated; use `certificate` instead.

      - `enabled: boolean`

        Specify whether to enable a custom certificate authority for signing Gateway traffic.

      - `id: optional string`

        Specify the UUID of the certificate (ID from MTLS certificate store).

      - `binding_status: optional string`

        Indicate the internal certificate status.

      - `updated_at: optional string`

    - `extended_email_matching: optional ExtendedEmailMatching`

      Configures user email settings for firewall policies. When you enable this, the system standardizes email addresses in the identity portion of the rule to match extended email variants in firewall policies. When you disable this setting, the system matches email addresses exactly as you provide them. Enable this setting if your email uses `.` or `+` modifiers.

      - `enabled: optional boolean`

        Specify whether to match all variants of user emails (with + or . modifiers) used as criteria in Firewall policies.

      - `read_only: optional boolean`

        Indicate that this setting was shared via the Orgs API and read only for the current account.

      - `source_account: optional string`

        Indicate the account tag of the account that shared this setting.

      - `version: optional number`

        Indicate the version number of the setting.

    - `fips: optional FipsSettings`

      Specify FIPS settings.

      - `tls: optional boolean`

        Enforce cipher suites and TLS versions compliant with FIPS 140-2.

    - `host_selector: optional object { enabled }`

      Enable host selection in egress policies.

      - `enabled: optional boolean`

        Specify whether to enable filtering via hosts for egress policies.

    - `inspection: optional object { mode }`

      Define the proxy inspection mode.

      - `mode: optional "static" or "dynamic"`

        Define the proxy inspection mode.   1. static: Gateway applies static inspection to HTTP on TCP(80). With TLS decryption on, Gateway inspects HTTPS traffic on TCP(443) and UDP(443).   2. dynamic: Gateway applies protocol detection to inspect HTTP and HTTPS traffic on any port. TLS decryption must remain on to inspect HTTPS traffic.

        - `"static"`

        - `"dynamic"`

    - `max_ttl_secs: optional number`

      Account-level cap on DNS response TTLs, in seconds. Gateway rewrites DNS responses so returned record TTLs do not exceed this value. Null means no cap. Each DNS location can inherit, override, or disable it through the location `max_ttl` setting.

    - `protocol_detection: optional ProtocolDetection`

      Specify whether to detect protocols from the initial bytes of client traffic.

      - `enabled: optional boolean`

        Specify whether to detect protocols from the initial bytes of client traffic.

    - `sandbox: optional object { enabled, fallback_action }`

      Specify whether to enable the sandbox.

      - `enabled: optional boolean`

        Specify whether to enable the sandbox.

      - `fallback_action: optional "allow" or "block"`

        Specify the action to take when the system cannot scan the file.

        - `"allow"`

        - `"block"`

    - `tls_decrypt: optional TLSSettings`

      Specify whether to inspect encrypted HTTP traffic.

      - `enabled: optional boolean`

        Specify whether to inspect encrypted HTTP traffic.

  - `updated_at: optional string`

# Custom Certificate

## Get Zero Trust certificate configuration

**get** `/accounts/{account_id}/gateway/configuration/custom_certificate`

Retrieve the current Zero Trust certificate configuration.

### Path Parameters

- `account_id: string`

### Returns

- `CustomCertificateSettings object { enabled, id, binding_status, updated_at }`

  Specify custom certificate settings for BYO-PKI. This field is deprecated; use `certificate` instead.

  - `enabled: boolean`

    Specify whether to enable a custom certificate authority for signing Gateway traffic.

  - `id: optional string`

    Specify the UUID of the certificate (ID from MTLS certificate store).

  - `binding_status: optional string`

    Indicate the internal certificate status.

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/configuration/custom_certificate \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "enabled": true,
  "id": "d1b364c5-1311-466e-a194-f0e943e0799f",
  "binding_status": "pending_deployment",
  "updated_at": "2019-12-27T18:11:19.117Z"
}
```

# Lists

## List Zero Trust lists

**get** `/accounts/{account_id}/gateway/lists`

Fetch all Zero Trust lists for an account.

### Path Parameters

- `account_id: string`

### Query Parameters

- `type: optional "SERIAL" or "URL" or "DOMAIN" or 6 more`

  Specify the list type.

  - `"SERIAL"`

  - `"URL"`

  - `"DOMAIN"`

  - `"EMAIL"`

  - `"IP"`

  - `"CATEGORY"`

  - `"LOCATION"`

  - `"DEVICE"`

  - `"AAGUID"`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional array of GatewayList`

  - `id: optional string`

    Identify the API resource with a UUID.

  - `count: optional number`

    Indicate the number of items in the list.

  - `created_at: optional string`

  - `description: optional string`

    Provide the list description.

  - `items: optional array of GatewayItem`

    Provide the list items.

    - `created_at: optional string`

    - `description: optional string`

      Provide the list item description (optional).

    - `value: optional string`

      Specify the item value.

  - `name: optional string`

    Specify the list name.

  - `type: optional "SERIAL" or "URL" or "DOMAIN" or 6 more`

    Specify the list type.

    - `"SERIAL"`

    - `"URL"`

    - `"DOMAIN"`

    - `"EMAIL"`

    - `"IP"`

    - `"CATEGORY"`

    - `"LOCATION"`

    - `"DEVICE"`

    - `"AAGUID"`

  - `updated_at: optional string`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Indicate the total number of results for the requested service.

  - `page: optional number`

    Indicate the current page within a paginated list of results.

  - `per_page: optional number`

    Indicate the number of results per page.

  - `total_count: optional number`

    Indicate the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/lists \
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
      "count": 20,
      "created_at": "2014-01-01T05:20:00.12345Z",
      "description": "The serial numbers for administrators",
      "items": [
        {
          "created_at": "2014-01-01T05:20:00.12345Z",
          "description": "Austin office IP",
          "value": "8GE8721REF"
        }
      ],
      "name": "Admin Serial Numbers",
      "type": "SERIAL",
      "updated_at": "2014-01-01T05:20:00.12345Z"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get Zero Trust list details

**get** `/accounts/{account_id}/gateway/lists/{list_id}`

Fetch a single Zero Trust list.

### Path Parameters

- `account_id: string`

- `list_id: string`

  Identify the API resource with a UUID.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional GatewayList`

  - `id: optional string`

    Identify the API resource with a UUID.

  - `count: optional number`

    Indicate the number of items in the list.

  - `created_at: optional string`

  - `description: optional string`

    Provide the list description.

  - `items: optional array of GatewayItem`

    Provide the list items.

    - `created_at: optional string`

    - `description: optional string`

      Provide the list item description (optional).

    - `value: optional string`

      Specify the item value.

  - `name: optional string`

    Specify the list name.

  - `type: optional "SERIAL" or "URL" or "DOMAIN" or 6 more`

    Specify the list type.

    - `"SERIAL"`

    - `"URL"`

    - `"DOMAIN"`

    - `"EMAIL"`

    - `"IP"`

    - `"CATEGORY"`

    - `"LOCATION"`

    - `"DEVICE"`

    - `"AAGUID"`

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/lists/$LIST_ID \
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
    "count": 20,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "The serial numbers for administrators",
    "items": [
      {
        "created_at": "2014-01-01T05:20:00.12345Z",
        "description": "Austin office IP",
        "value": "8GE8721REF"
      }
    ],
    "name": "Admin Serial Numbers",
    "type": "SERIAL",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Create Zero Trust list

**post** `/accounts/{account_id}/gateway/lists`

Creates a new Zero Trust list.

### Path Parameters

- `account_id: string`

### Body Parameters

- `name: string`

  Specify the list name.

- `type: "SERIAL" or "URL" or "DOMAIN" or 6 more`

  Specify the list type.

  - `"SERIAL"`

  - `"URL"`

  - `"DOMAIN"`

  - `"EMAIL"`

  - `"IP"`

  - `"CATEGORY"`

  - `"LOCATION"`

  - `"DEVICE"`

  - `"AAGUID"`

- `description: optional string`

  Provide the list description.

- `items: optional array of object { description, value }`

  Add items to the list.

  - `description: optional string`

    Provide the list item description (optional).

  - `value: optional string`

    Specify the item value.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { id, created_at, description, 4 more }`

  - `id: optional string`

    Identify the API resource with a UUID.

  - `created_at: optional string`

  - `description: optional string`

    Provide the list description.

  - `items: optional array of GatewayItem`

    Provide the list items.

    - `created_at: optional string`

    - `description: optional string`

      Provide the list item description (optional).

    - `value: optional string`

      Specify the item value.

  - `name: optional string`

    Specify the list name.

  - `type: optional "SERIAL" or "URL" or "DOMAIN" or 6 more`

    Specify the list type.

    - `"SERIAL"`

    - `"URL"`

    - `"DOMAIN"`

    - `"EMAIL"`

    - `"IP"`

    - `"CATEGORY"`

    - `"LOCATION"`

    - `"DEVICE"`

    - `"AAGUID"`

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/lists \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Admin Serial Numbers",
          "type": "SERIAL",
          "description": "The serial numbers for administrators"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "The serial numbers for administrators",
    "items": [
      {
        "created_at": "2014-01-01T05:20:00.12345Z",
        "description": "Austin office IP",
        "value": "8GE8721REF"
      }
    ],
    "name": "Admin Serial Numbers",
    "type": "SERIAL",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Update Zero Trust list

**put** `/accounts/{account_id}/gateway/lists/{list_id}`

Updates a configured Zero Trust list. Skips updating list items if not included in the payload. A non empty list items will overwrite the existing list.

### Path Parameters

- `account_id: string`

- `list_id: string`

  Identify the API resource with a UUID.

### Body Parameters

- `name: string`

  Specify the list name.

- `description: optional string`

  Provide the list description.

- `items: optional array of object { description, value }`

  Add items to the list.

  - `description: optional string`

    Provide the list item description (optional).

  - `value: optional string`

    Specify the item value.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional GatewayList`

  - `id: optional string`

    Identify the API resource with a UUID.

  - `count: optional number`

    Indicate the number of items in the list.

  - `created_at: optional string`

  - `description: optional string`

    Provide the list description.

  - `items: optional array of GatewayItem`

    Provide the list items.

    - `created_at: optional string`

    - `description: optional string`

      Provide the list item description (optional).

    - `value: optional string`

      Specify the item value.

  - `name: optional string`

    Specify the list name.

  - `type: optional "SERIAL" or "URL" or "DOMAIN" or 6 more`

    Specify the list type.

    - `"SERIAL"`

    - `"URL"`

    - `"DOMAIN"`

    - `"EMAIL"`

    - `"IP"`

    - `"CATEGORY"`

    - `"LOCATION"`

    - `"DEVICE"`

    - `"AAGUID"`

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/lists/$LIST_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Admin Serial Numbers",
          "description": "The serial numbers for administrators"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "count": 20,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "The serial numbers for administrators",
    "items": [
      {
        "created_at": "2014-01-01T05:20:00.12345Z",
        "description": "Austin office IP",
        "value": "8GE8721REF"
      }
    ],
    "name": "Admin Serial Numbers",
    "type": "SERIAL",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Patch Zero Trust list.

**patch** `/accounts/{account_id}/gateway/lists/{list_id}`

Appends or removes an item from a configured Zero Trust list.

### Path Parameters

- `account_id: string`

- `list_id: string`

  Identify the API resource with a UUID.

### Body Parameters

- `append: optional array of object { description, value }`

  Add items to the list.

  - `description: optional string`

    Provide the list item description (optional).

  - `value: optional string`

    Specify the item value.

- `remove: optional array of string`

  Lists of item values you want to remove.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional GatewayList`

  - `id: optional string`

    Identify the API resource with a UUID.

  - `count: optional number`

    Indicate the number of items in the list.

  - `created_at: optional string`

  - `description: optional string`

    Provide the list description.

  - `items: optional array of GatewayItem`

    Provide the list items.

    - `created_at: optional string`

    - `description: optional string`

      Provide the list item description (optional).

    - `value: optional string`

      Specify the item value.

  - `name: optional string`

    Specify the list name.

  - `type: optional "SERIAL" or "URL" or "DOMAIN" or 6 more`

    Specify the list type.

    - `"SERIAL"`

    - `"URL"`

    - `"DOMAIN"`

    - `"EMAIL"`

    - `"IP"`

    - `"CATEGORY"`

    - `"LOCATION"`

    - `"DEVICE"`

    - `"AAGUID"`

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/lists/$LIST_ID \
    -X PATCH \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "count": 20,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "The serial numbers for administrators",
    "items": [
      {
        "created_at": "2014-01-01T05:20:00.12345Z",
        "description": "Austin office IP",
        "value": "8GE8721REF"
      }
    ],
    "name": "Admin Serial Numbers",
    "type": "SERIAL",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Delete Zero Trust list

**delete** `/accounts/{account_id}/gateway/lists/{list_id}`

Deletes a Zero Trust list.

### Path Parameters

- `account_id: string`

- `list_id: string`

  Identify the API resource with a UUID.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/lists/$LIST_ID \
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
  "result": {}
}
```

## Domain Types

### Gateway Item

- `GatewayItem object { created_at, description, value }`

  - `created_at: optional string`

  - `description: optional string`

    Provide the list item description (optional).

  - `value: optional string`

    Specify the item value.

### Gateway List

- `GatewayList object { id, count, created_at, 5 more }`

  - `id: optional string`

    Identify the API resource with a UUID.

  - `count: optional number`

    Indicate the number of items in the list.

  - `created_at: optional string`

  - `description: optional string`

    Provide the list description.

  - `items: optional array of GatewayItem`

    Provide the list items.

    - `created_at: optional string`

    - `description: optional string`

      Provide the list item description (optional).

    - `value: optional string`

      Specify the item value.

  - `name: optional string`

    Specify the list name.

  - `type: optional "SERIAL" or "URL" or "DOMAIN" or 6 more`

    Specify the list type.

    - `"SERIAL"`

    - `"URL"`

    - `"DOMAIN"`

    - `"EMAIL"`

    - `"IP"`

    - `"CATEGORY"`

    - `"LOCATION"`

    - `"DEVICE"`

    - `"AAGUID"`

  - `updated_at: optional string`

### List Create Response

- `ListCreateResponse object { id, created_at, description, 4 more }`

  - `id: optional string`

    Identify the API resource with a UUID.

  - `created_at: optional string`

  - `description: optional string`

    Provide the list description.

  - `items: optional array of GatewayItem`

    Provide the list items.

    - `created_at: optional string`

    - `description: optional string`

      Provide the list item description (optional).

    - `value: optional string`

      Specify the item value.

  - `name: optional string`

    Specify the list name.

  - `type: optional "SERIAL" or "URL" or "DOMAIN" or 6 more`

    Specify the list type.

    - `"SERIAL"`

    - `"URL"`

    - `"DOMAIN"`

    - `"EMAIL"`

    - `"IP"`

    - `"CATEGORY"`

    - `"LOCATION"`

    - `"DEVICE"`

    - `"AAGUID"`

  - `updated_at: optional string`

### List Delete Response

- `ListDeleteResponse = unknown`

# Items

## Get Zero Trust list items

**get** `/accounts/{account_id}/gateway/lists/{list_id}/items`

Fetch all items in a single Zero Trust list.

### Path Parameters

- `account_id: string`

- `list_id: string`

  Identify the API resource with a UUID.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional array of GatewayItem`

  Provide the list items.

  - `created_at: optional string`

  - `description: optional string`

    Provide the list item description (optional).

  - `value: optional string`

    Specify the item value.

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Shows the total results returned based on your search parameters.

  - `page: optional number`

    Show the current page within paginated list of results.

  - `per_page: optional number`

    Show the number of results per page of results.

  - `total_count: optional number`

    Show the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/lists/$LIST_ID/items \
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
      "created_at": "2014-01-01T05:20:00.12345Z",
      "description": "Austin office IP",
      "value": "8GE8721REF"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

# Locations

## List Zero Trust Gateway locations

**get** `/accounts/{account_id}/gateway/locations`

List Zero Trust Gateway locations for an account.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional array of Location`

  - `id: optional string`

  - `client_default: optional boolean`

    Indicate whether this location is the default location.

  - `created_at: optional string`

  - `dns_destination_ips_id: optional string`

    Indicate the identifier of the pair of IPv4 addresses assigned to this location.

  - `dns_destination_ipv6_block_id: optional string`

    Specify the UUID of the IPv6 block brought to the gateway so that this location's IPv6 address is allocated from the Bring Your Own IPv6 (BYOIPv6) block rather than the standard Cloudflare IPv6 block.

  - `doh_subdomain: optional string`

    Specify the DNS over HTTPS domain that receives DNS requests. Gateway automatically generates this value.

  - `ecs_support: optional boolean`

    Indicate whether the location must resolve EDNS queries.

  - `endpoints: optional Endpoint`

    Configure the destination endpoints for this location.

    - `doh: DOHEndpoint`

      - `enabled: optional boolean`

        Indicate whether the DOH endpoint is enabled for this location.

      - `networks: optional array of IPNetwork`

        Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

        - `network: string`

          Specify the IP address or IP CIDR.

      - `require_token: optional boolean`

        Specify whether the DOH endpoint requires user identity authentication.

    - `dot: DOTEndpoint`

      - `enabled: optional boolean`

        Indicate whether the DOT endpoint is enabled for this location.

      - `networks: optional array of IPNetwork`

        Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

        - `network: string`

          Specify the IP address or IP CIDR.

    - `ipv4: IPV4Endpoint`

      - `enabled: optional boolean`

        Indicate whether the IPv4 endpoint is enabled for this location.

    - `ipv6: IPV6Endpoint`

      - `enabled: optional boolean`

        Indicate whether the IPV6 endpoint is enabled for this location.

      - `networks: optional array of IPV6Network`

        Specify the list of allowed source IPv6 network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

        - `network: string`

          Specify the IPv6 address or IPv6 CIDR.

  - `ip: optional string`

    Defines the automatically generated IPv6 destination IP assigned to this location. Gateway counts all DNS requests sent to this IP as requests under this location.

  - `ipv4_destination: optional string`

    Show the primary destination IPv4 address from the pair identified dns_destination_ips_id. This field read-only.

  - `ipv4_destination_backup: optional string`

    Show the backup destination IPv4 address from the pair identified dns_destination_ips_id. This field read-only.

  - `max_ttl: optional object { mode, ttl_secs }`

    Controls how DNS response TTLs are capped for this location relative to the account `max_ttl_secs` setting. Omitting `max_ttl` on update resets it to `inherit`.

    - `mode: "inherit" or "override" or "disabled"`

      `inherit` uses the account `max_ttl_secs`. `override` uses this location's `ttl_secs`. `disabled` leaves returned TTLs unchanged.

      - `"inherit"`

      - `"override"`

      - `"disabled"`

    - `ttl_secs: optional number`

      Location-specific cap on DNS response TTLs, in seconds. Required when `mode` is `override`. Must be omitted when `mode` is `inherit` or `disabled`.

  - `name: optional string`

    Specify the location name.

  - `networks: optional array of object { network }`

    Specify the list of network ranges from which requests at this location originate. The list takes effect only if it is non-empty and the IPv4 endpoint is enabled for this location.

    - `network: string`

      Specify the IPv4 address or IPv4 CIDR. Limit IPv4 CIDRs to a maximum of /24.

  - `updated_at: optional string`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Indicate the total number of results for the requested service.

  - `page: optional number`

    Indicate the current page within a paginated list of results.

  - `per_page: optional number`

    Indicate the number of results per page.

  - `total_count: optional number`

    Indicate the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/locations \
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
      "id": "ed35569b41ce4d1facfe683550f54086",
      "client_default": false,
      "created_at": "2014-01-01T05:20:00.12345Z",
      "dns_destination_ips_id": "0e4a32c6-6fb8-4858-9296-98f51631e8e6",
      "dns_destination_ipv6_block_id": "b08f7231-d458-495c-98ef-190604c9ee83",
      "doh_subdomain": "oli3n9zkz5",
      "ecs_support": false,
      "endpoints": {
        "doh": {
          "enabled": true,
          "networks": [
            {
              "network": "2001:85a3::/64"
            }
          ],
          "require_token": true
        },
        "dot": {
          "enabled": true,
          "networks": [
            {
              "network": "2001:85a3::/64"
            }
          ]
        },
        "ipv4": {
          "enabled": true
        },
        "ipv6": {
          "enabled": true,
          "networks": [
            {
              "network": "2001:85a3::/64"
            }
          ]
        }
      },
      "ip": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
      "ipv4_destination": "172.64.36.1",
      "ipv4_destination_backup": "172.64.36.2",
      "max_ttl": {
        "mode": "override",
        "ttl_secs": 3600
      },
      "name": "Austin Office Location",
      "networks": [
        {
          "network": "192.0.2.1/32"
        }
      ],
      "updated_at": "2014-01-01T05:20:00.12345Z"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get Zero Trust Gateway location details

**get** `/accounts/{account_id}/gateway/locations/{location_id}`

Get a single Zero Trust Gateway location.

### Path Parameters

- `account_id: string`

- `location_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional Location`

  - `id: optional string`

  - `client_default: optional boolean`

    Indicate whether this location is the default location.

  - `created_at: optional string`

  - `dns_destination_ips_id: optional string`

    Indicate the identifier of the pair of IPv4 addresses assigned to this location.

  - `dns_destination_ipv6_block_id: optional string`

    Specify the UUID of the IPv6 block brought to the gateway so that this location's IPv6 address is allocated from the Bring Your Own IPv6 (BYOIPv6) block rather than the standard Cloudflare IPv6 block.

  - `doh_subdomain: optional string`

    Specify the DNS over HTTPS domain that receives DNS requests. Gateway automatically generates this value.

  - `ecs_support: optional boolean`

    Indicate whether the location must resolve EDNS queries.

  - `endpoints: optional Endpoint`

    Configure the destination endpoints for this location.

    - `doh: DOHEndpoint`

      - `enabled: optional boolean`

        Indicate whether the DOH endpoint is enabled for this location.

      - `networks: optional array of IPNetwork`

        Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

        - `network: string`

          Specify the IP address or IP CIDR.

      - `require_token: optional boolean`

        Specify whether the DOH endpoint requires user identity authentication.

    - `dot: DOTEndpoint`

      - `enabled: optional boolean`

        Indicate whether the DOT endpoint is enabled for this location.

      - `networks: optional array of IPNetwork`

        Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

        - `network: string`

          Specify the IP address or IP CIDR.

    - `ipv4: IPV4Endpoint`

      - `enabled: optional boolean`

        Indicate whether the IPv4 endpoint is enabled for this location.

    - `ipv6: IPV6Endpoint`

      - `enabled: optional boolean`

        Indicate whether the IPV6 endpoint is enabled for this location.

      - `networks: optional array of IPV6Network`

        Specify the list of allowed source IPv6 network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

        - `network: string`

          Specify the IPv6 address or IPv6 CIDR.

  - `ip: optional string`

    Defines the automatically generated IPv6 destination IP assigned to this location. Gateway counts all DNS requests sent to this IP as requests under this location.

  - `ipv4_destination: optional string`

    Show the primary destination IPv4 address from the pair identified dns_destination_ips_id. This field read-only.

  - `ipv4_destination_backup: optional string`

    Show the backup destination IPv4 address from the pair identified dns_destination_ips_id. This field read-only.

  - `max_ttl: optional object { mode, ttl_secs }`

    Controls how DNS response TTLs are capped for this location relative to the account `max_ttl_secs` setting. Omitting `max_ttl` on update resets it to `inherit`.

    - `mode: "inherit" or "override" or "disabled"`

      `inherit` uses the account `max_ttl_secs`. `override` uses this location's `ttl_secs`. `disabled` leaves returned TTLs unchanged.

      - `"inherit"`

      - `"override"`

      - `"disabled"`

    - `ttl_secs: optional number`

      Location-specific cap on DNS response TTLs, in seconds. Required when `mode` is `override`. Must be omitted when `mode` is `inherit` or `disabled`.

  - `name: optional string`

    Specify the location name.

  - `networks: optional array of object { network }`

    Specify the list of network ranges from which requests at this location originate. The list takes effect only if it is non-empty and the IPv4 endpoint is enabled for this location.

    - `network: string`

      Specify the IPv4 address or IPv4 CIDR. Limit IPv4 CIDRs to a maximum of /24.

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/locations/$LOCATION_ID \
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
    "id": "ed35569b41ce4d1facfe683550f54086",
    "client_default": false,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "dns_destination_ips_id": "0e4a32c6-6fb8-4858-9296-98f51631e8e6",
    "dns_destination_ipv6_block_id": "b08f7231-d458-495c-98ef-190604c9ee83",
    "doh_subdomain": "oli3n9zkz5",
    "ecs_support": false,
    "endpoints": {
      "doh": {
        "enabled": true,
        "networks": [
          {
            "network": "2001:85a3::/64"
          }
        ],
        "require_token": true
      },
      "dot": {
        "enabled": true,
        "networks": [
          {
            "network": "2001:85a3::/64"
          }
        ]
      },
      "ipv4": {
        "enabled": true
      },
      "ipv6": {
        "enabled": true,
        "networks": [
          {
            "network": "2001:85a3::/64"
          }
        ]
      }
    },
    "ip": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
    "ipv4_destination": "172.64.36.1",
    "ipv4_destination_backup": "172.64.36.2",
    "max_ttl": {
      "mode": "override",
      "ttl_secs": 3600
    },
    "name": "Austin Office Location",
    "networks": [
      {
        "network": "192.0.2.1/32"
      }
    ],
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Create a Zero Trust Gateway location

**post** `/accounts/{account_id}/gateway/locations`

Create a new Zero Trust Gateway location.

### Path Parameters

- `account_id: string`

### Body Parameters

- `name: string`

  Specify the location name.

- `client_default: optional boolean`

  Indicate whether this location is the default location.

- `dns_destination_ips_id: optional string`

  Specify the identifier of the pair of IPv4 addresses assigned to this location. When creating a location, if this field is absent or set to null, the pair of shared IPv4 addresses (0e4a32c6-6fb8-4858-9296-98f51631e8e6) is auto-assigned. When updating a location, if this field is absent or set to null, the pre-assigned pair remains unchanged.

- `ecs_support: optional boolean`

  Indicate whether the location must resolve EDNS queries.

- `endpoints: optional Endpoint`

  Configure the destination endpoints for this location.

  - `doh: DOHEndpoint`

    - `enabled: optional boolean`

      Indicate whether the DOH endpoint is enabled for this location.

    - `networks: optional array of IPNetwork`

      Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

      - `network: string`

        Specify the IP address or IP CIDR.

    - `require_token: optional boolean`

      Specify whether the DOH endpoint requires user identity authentication.

  - `dot: DOTEndpoint`

    - `enabled: optional boolean`

      Indicate whether the DOT endpoint is enabled for this location.

    - `networks: optional array of IPNetwork`

      Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

      - `network: string`

        Specify the IP address or IP CIDR.

  - `ipv4: IPV4Endpoint`

    - `enabled: optional boolean`

      Indicate whether the IPv4 endpoint is enabled for this location.

  - `ipv6: IPV6Endpoint`

    - `enabled: optional boolean`

      Indicate whether the IPV6 endpoint is enabled for this location.

    - `networks: optional array of IPV6Network`

      Specify the list of allowed source IPv6 network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

      - `network: string`

        Specify the IPv6 address or IPv6 CIDR.

- `max_ttl: optional object { mode, ttl_secs }`

  Controls how DNS response TTLs are capped for this location relative to the account `max_ttl_secs` setting. Omitting `max_ttl` on update resets it to `inherit`.

  - `mode: "inherit" or "override" or "disabled"`

    `inherit` uses the account `max_ttl_secs`. `override` uses this location's `ttl_secs`. `disabled` leaves returned TTLs unchanged.

    - `"inherit"`

    - `"override"`

    - `"disabled"`

  - `ttl_secs: optional number`

    Location-specific cap on DNS response TTLs, in seconds. Required when `mode` is `override`. Must be omitted when `mode` is `inherit` or `disabled`.

- `networks: optional array of object { network }`

  Specify the list of network ranges from which requests at this location originate. The list takes effect only if it is non-empty and the IPv4 endpoint is enabled for this location.

  - `network: string`

    Specify the IPv4 address or IPv4 CIDR. Limit IPv4 CIDRs to a maximum of /24.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional Location`

  - `id: optional string`

  - `client_default: optional boolean`

    Indicate whether this location is the default location.

  - `created_at: optional string`

  - `dns_destination_ips_id: optional string`

    Indicate the identifier of the pair of IPv4 addresses assigned to this location.

  - `dns_destination_ipv6_block_id: optional string`

    Specify the UUID of the IPv6 block brought to the gateway so that this location's IPv6 address is allocated from the Bring Your Own IPv6 (BYOIPv6) block rather than the standard Cloudflare IPv6 block.

  - `doh_subdomain: optional string`

    Specify the DNS over HTTPS domain that receives DNS requests. Gateway automatically generates this value.

  - `ecs_support: optional boolean`

    Indicate whether the location must resolve EDNS queries.

  - `endpoints: optional Endpoint`

    Configure the destination endpoints for this location.

    - `doh: DOHEndpoint`

      - `enabled: optional boolean`

        Indicate whether the DOH endpoint is enabled for this location.

      - `networks: optional array of IPNetwork`

        Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

        - `network: string`

          Specify the IP address or IP CIDR.

      - `require_token: optional boolean`

        Specify whether the DOH endpoint requires user identity authentication.

    - `dot: DOTEndpoint`

      - `enabled: optional boolean`

        Indicate whether the DOT endpoint is enabled for this location.

      - `networks: optional array of IPNetwork`

        Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

        - `network: string`

          Specify the IP address or IP CIDR.

    - `ipv4: IPV4Endpoint`

      - `enabled: optional boolean`

        Indicate whether the IPv4 endpoint is enabled for this location.

    - `ipv6: IPV6Endpoint`

      - `enabled: optional boolean`

        Indicate whether the IPV6 endpoint is enabled for this location.

      - `networks: optional array of IPV6Network`

        Specify the list of allowed source IPv6 network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

        - `network: string`

          Specify the IPv6 address or IPv6 CIDR.

  - `ip: optional string`

    Defines the automatically generated IPv6 destination IP assigned to this location. Gateway counts all DNS requests sent to this IP as requests under this location.

  - `ipv4_destination: optional string`

    Show the primary destination IPv4 address from the pair identified dns_destination_ips_id. This field read-only.

  - `ipv4_destination_backup: optional string`

    Show the backup destination IPv4 address from the pair identified dns_destination_ips_id. This field read-only.

  - `max_ttl: optional object { mode, ttl_secs }`

    Controls how DNS response TTLs are capped for this location relative to the account `max_ttl_secs` setting. Omitting `max_ttl` on update resets it to `inherit`.

    - `mode: "inherit" or "override" or "disabled"`

      `inherit` uses the account `max_ttl_secs`. `override` uses this location's `ttl_secs`. `disabled` leaves returned TTLs unchanged.

      - `"inherit"`

      - `"override"`

      - `"disabled"`

    - `ttl_secs: optional number`

      Location-specific cap on DNS response TTLs, in seconds. Required when `mode` is `override`. Must be omitted when `mode` is `inherit` or `disabled`.

  - `name: optional string`

    Specify the location name.

  - `networks: optional array of object { network }`

    Specify the list of network ranges from which requests at this location originate. The list takes effect only if it is non-empty and the IPv4 endpoint is enabled for this location.

    - `network: string`

      Specify the IPv4 address or IPv4 CIDR. Limit IPv4 CIDRs to a maximum of /24.

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/locations \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Austin Office Location",
          "dns_destination_ips_id": "0e4a32c6-6fb8-4858-9296-98f51631e8e6"
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
    "id": "ed35569b41ce4d1facfe683550f54086",
    "client_default": false,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "dns_destination_ips_id": "0e4a32c6-6fb8-4858-9296-98f51631e8e6",
    "dns_destination_ipv6_block_id": "b08f7231-d458-495c-98ef-190604c9ee83",
    "doh_subdomain": "oli3n9zkz5",
    "ecs_support": false,
    "endpoints": {
      "doh": {
        "enabled": true,
        "networks": [
          {
            "network": "2001:85a3::/64"
          }
        ],
        "require_token": true
      },
      "dot": {
        "enabled": true,
        "networks": [
          {
            "network": "2001:85a3::/64"
          }
        ]
      },
      "ipv4": {
        "enabled": true
      },
      "ipv6": {
        "enabled": true,
        "networks": [
          {
            "network": "2001:85a3::/64"
          }
        ]
      }
    },
    "ip": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
    "ipv4_destination": "172.64.36.1",
    "ipv4_destination_backup": "172.64.36.2",
    "max_ttl": {
      "mode": "override",
      "ttl_secs": 3600
    },
    "name": "Austin Office Location",
    "networks": [
      {
        "network": "192.0.2.1/32"
      }
    ],
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Update a Zero Trust Gateway location

**put** `/accounts/{account_id}/gateway/locations/{location_id}`

Update a configured Zero Trust Gateway location.

### Path Parameters

- `account_id: string`

- `location_id: string`

### Body Parameters

- `name: string`

  Specify the location name.

- `client_default: optional boolean`

  Indicate whether this location is the default location.

- `dns_destination_ips_id: optional string`

  Specify the identifier of the pair of IPv4 addresses assigned to this location. When creating a location, if this field is absent or set to null, the pair of shared IPv4 addresses (0e4a32c6-6fb8-4858-9296-98f51631e8e6) is auto-assigned. When updating a location, if this field is absent or set to null, the pre-assigned pair remains unchanged.

- `ecs_support: optional boolean`

  Indicate whether the location must resolve EDNS queries.

- `endpoints: optional Endpoint`

  Configure the destination endpoints for this location.

  - `doh: DOHEndpoint`

    - `enabled: optional boolean`

      Indicate whether the DOH endpoint is enabled for this location.

    - `networks: optional array of IPNetwork`

      Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

      - `network: string`

        Specify the IP address or IP CIDR.

    - `require_token: optional boolean`

      Specify whether the DOH endpoint requires user identity authentication.

  - `dot: DOTEndpoint`

    - `enabled: optional boolean`

      Indicate whether the DOT endpoint is enabled for this location.

    - `networks: optional array of IPNetwork`

      Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

      - `network: string`

        Specify the IP address or IP CIDR.

  - `ipv4: IPV4Endpoint`

    - `enabled: optional boolean`

      Indicate whether the IPv4 endpoint is enabled for this location.

  - `ipv6: IPV6Endpoint`

    - `enabled: optional boolean`

      Indicate whether the IPV6 endpoint is enabled for this location.

    - `networks: optional array of IPV6Network`

      Specify the list of allowed source IPv6 network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

      - `network: string`

        Specify the IPv6 address or IPv6 CIDR.

- `max_ttl: optional object { mode, ttl_secs }`

  Controls how DNS response TTLs are capped for this location relative to the account `max_ttl_secs` setting. Omitting `max_ttl` on update resets it to `inherit`.

  - `mode: "inherit" or "override" or "disabled"`

    `inherit` uses the account `max_ttl_secs`. `override` uses this location's `ttl_secs`. `disabled` leaves returned TTLs unchanged.

    - `"inherit"`

    - `"override"`

    - `"disabled"`

  - `ttl_secs: optional number`

    Location-specific cap on DNS response TTLs, in seconds. Required when `mode` is `override`. Must be omitted when `mode` is `inherit` or `disabled`.

- `networks: optional array of object { network }`

  Specify the list of network ranges from which requests at this location originate. The list takes effect only if it is non-empty and the IPv4 endpoint is enabled for this location.

  - `network: string`

    Specify the IPv4 address or IPv4 CIDR. Limit IPv4 CIDRs to a maximum of /24.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional Location`

  - `id: optional string`

  - `client_default: optional boolean`

    Indicate whether this location is the default location.

  - `created_at: optional string`

  - `dns_destination_ips_id: optional string`

    Indicate the identifier of the pair of IPv4 addresses assigned to this location.

  - `dns_destination_ipv6_block_id: optional string`

    Specify the UUID of the IPv6 block brought to the gateway so that this location's IPv6 address is allocated from the Bring Your Own IPv6 (BYOIPv6) block rather than the standard Cloudflare IPv6 block.

  - `doh_subdomain: optional string`

    Specify the DNS over HTTPS domain that receives DNS requests. Gateway automatically generates this value.

  - `ecs_support: optional boolean`

    Indicate whether the location must resolve EDNS queries.

  - `endpoints: optional Endpoint`

    Configure the destination endpoints for this location.

    - `doh: DOHEndpoint`

      - `enabled: optional boolean`

        Indicate whether the DOH endpoint is enabled for this location.

      - `networks: optional array of IPNetwork`

        Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

        - `network: string`

          Specify the IP address or IP CIDR.

      - `require_token: optional boolean`

        Specify whether the DOH endpoint requires user identity authentication.

    - `dot: DOTEndpoint`

      - `enabled: optional boolean`

        Indicate whether the DOT endpoint is enabled for this location.

      - `networks: optional array of IPNetwork`

        Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

        - `network: string`

          Specify the IP address or IP CIDR.

    - `ipv4: IPV4Endpoint`

      - `enabled: optional boolean`

        Indicate whether the IPv4 endpoint is enabled for this location.

    - `ipv6: IPV6Endpoint`

      - `enabled: optional boolean`

        Indicate whether the IPV6 endpoint is enabled for this location.

      - `networks: optional array of IPV6Network`

        Specify the list of allowed source IPv6 network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

        - `network: string`

          Specify the IPv6 address or IPv6 CIDR.

  - `ip: optional string`

    Defines the automatically generated IPv6 destination IP assigned to this location. Gateway counts all DNS requests sent to this IP as requests under this location.

  - `ipv4_destination: optional string`

    Show the primary destination IPv4 address from the pair identified dns_destination_ips_id. This field read-only.

  - `ipv4_destination_backup: optional string`

    Show the backup destination IPv4 address from the pair identified dns_destination_ips_id. This field read-only.

  - `max_ttl: optional object { mode, ttl_secs }`

    Controls how DNS response TTLs are capped for this location relative to the account `max_ttl_secs` setting. Omitting `max_ttl` on update resets it to `inherit`.

    - `mode: "inherit" or "override" or "disabled"`

      `inherit` uses the account `max_ttl_secs`. `override` uses this location's `ttl_secs`. `disabled` leaves returned TTLs unchanged.

      - `"inherit"`

      - `"override"`

      - `"disabled"`

    - `ttl_secs: optional number`

      Location-specific cap on DNS response TTLs, in seconds. Required when `mode` is `override`. Must be omitted when `mode` is `inherit` or `disabled`.

  - `name: optional string`

    Specify the location name.

  - `networks: optional array of object { network }`

    Specify the list of network ranges from which requests at this location originate. The list takes effect only if it is non-empty and the IPv4 endpoint is enabled for this location.

    - `network: string`

      Specify the IPv4 address or IPv4 CIDR. Limit IPv4 CIDRs to a maximum of /24.

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/locations/$LOCATION_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Austin Office Location",
          "dns_destination_ips_id": "0e4a32c6-6fb8-4858-9296-98f51631e8e6"
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
    "id": "ed35569b41ce4d1facfe683550f54086",
    "client_default": false,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "dns_destination_ips_id": "0e4a32c6-6fb8-4858-9296-98f51631e8e6",
    "dns_destination_ipv6_block_id": "b08f7231-d458-495c-98ef-190604c9ee83",
    "doh_subdomain": "oli3n9zkz5",
    "ecs_support": false,
    "endpoints": {
      "doh": {
        "enabled": true,
        "networks": [
          {
            "network": "2001:85a3::/64"
          }
        ],
        "require_token": true
      },
      "dot": {
        "enabled": true,
        "networks": [
          {
            "network": "2001:85a3::/64"
          }
        ]
      },
      "ipv4": {
        "enabled": true
      },
      "ipv6": {
        "enabled": true,
        "networks": [
          {
            "network": "2001:85a3::/64"
          }
        ]
      }
    },
    "ip": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
    "ipv4_destination": "172.64.36.1",
    "ipv4_destination_backup": "172.64.36.2",
    "max_ttl": {
      "mode": "override",
      "ttl_secs": 3600
    },
    "name": "Austin Office Location",
    "networks": [
      {
        "network": "192.0.2.1/32"
      }
    ],
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Delete a Zero Trust Gateway location

**delete** `/accounts/{account_id}/gateway/locations/{location_id}`

Delete a configured Zero Trust Gateway location.

### Path Parameters

- `account_id: string`

- `location_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/locations/$LOCATION_ID \
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
  "result": {}
}
```

## Domain Types

### DOH Endpoint

- `DOHEndpoint object { enabled, networks, require_token }`

  - `enabled: optional boolean`

    Indicate whether the DOH endpoint is enabled for this location.

  - `networks: optional array of IPNetwork`

    Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

    - `network: string`

      Specify the IP address or IP CIDR.

  - `require_token: optional boolean`

    Specify whether the DOH endpoint requires user identity authentication.

### DOT Endpoint

- `DOTEndpoint object { enabled, networks }`

  - `enabled: optional boolean`

    Indicate whether the DOT endpoint is enabled for this location.

  - `networks: optional array of IPNetwork`

    Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

    - `network: string`

      Specify the IP address or IP CIDR.

### Endpoint

- `Endpoint object { doh, dot, ipv4, ipv6 }`

  Configure the destination endpoints for this location.

  - `doh: DOHEndpoint`

    - `enabled: optional boolean`

      Indicate whether the DOH endpoint is enabled for this location.

    - `networks: optional array of IPNetwork`

      Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

      - `network: string`

        Specify the IP address or IP CIDR.

    - `require_token: optional boolean`

      Specify whether the DOH endpoint requires user identity authentication.

  - `dot: DOTEndpoint`

    - `enabled: optional boolean`

      Indicate whether the DOT endpoint is enabled for this location.

    - `networks: optional array of IPNetwork`

      Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

      - `network: string`

        Specify the IP address or IP CIDR.

  - `ipv4: IPV4Endpoint`

    - `enabled: optional boolean`

      Indicate whether the IPv4 endpoint is enabled for this location.

  - `ipv6: IPV6Endpoint`

    - `enabled: optional boolean`

      Indicate whether the IPV6 endpoint is enabled for this location.

    - `networks: optional array of IPV6Network`

      Specify the list of allowed source IPv6 network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

      - `network: string`

        Specify the IPv6 address or IPv6 CIDR.

### IP Network

- `IPNetwork object { network }`

  - `network: string`

    Specify the IP address or IP CIDR.

### IPV4 Endpoint

- `IPV4Endpoint object { enabled }`

  - `enabled: optional boolean`

    Indicate whether the IPv4 endpoint is enabled for this location.

### IPV6 Endpoint

- `IPV6Endpoint object { enabled, networks }`

  - `enabled: optional boolean`

    Indicate whether the IPV6 endpoint is enabled for this location.

  - `networks: optional array of IPV6Network`

    Specify the list of allowed source IPv6 network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

    - `network: string`

      Specify the IPv6 address or IPv6 CIDR.

### IPV6 Network

- `IPV6Network object { network }`

  - `network: string`

    Specify the IPv6 address or IPv6 CIDR.

### Location

- `Location object { id, client_default, created_at, 12 more }`

  - `id: optional string`

  - `client_default: optional boolean`

    Indicate whether this location is the default location.

  - `created_at: optional string`

  - `dns_destination_ips_id: optional string`

    Indicate the identifier of the pair of IPv4 addresses assigned to this location.

  - `dns_destination_ipv6_block_id: optional string`

    Specify the UUID of the IPv6 block brought to the gateway so that this location's IPv6 address is allocated from the Bring Your Own IPv6 (BYOIPv6) block rather than the standard Cloudflare IPv6 block.

  - `doh_subdomain: optional string`

    Specify the DNS over HTTPS domain that receives DNS requests. Gateway automatically generates this value.

  - `ecs_support: optional boolean`

    Indicate whether the location must resolve EDNS queries.

  - `endpoints: optional Endpoint`

    Configure the destination endpoints for this location.

    - `doh: DOHEndpoint`

      - `enabled: optional boolean`

        Indicate whether the DOH endpoint is enabled for this location.

      - `networks: optional array of IPNetwork`

        Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

        - `network: string`

          Specify the IP address or IP CIDR.

      - `require_token: optional boolean`

        Specify whether the DOH endpoint requires user identity authentication.

    - `dot: DOTEndpoint`

      - `enabled: optional boolean`

        Indicate whether the DOT endpoint is enabled for this location.

      - `networks: optional array of IPNetwork`

        Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

        - `network: string`

          Specify the IP address or IP CIDR.

    - `ipv4: IPV4Endpoint`

      - `enabled: optional boolean`

        Indicate whether the IPv4 endpoint is enabled for this location.

    - `ipv6: IPV6Endpoint`

      - `enabled: optional boolean`

        Indicate whether the IPV6 endpoint is enabled for this location.

      - `networks: optional array of IPV6Network`

        Specify the list of allowed source IPv6 network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

        - `network: string`

          Specify the IPv6 address or IPv6 CIDR.

  - `ip: optional string`

    Defines the automatically generated IPv6 destination IP assigned to this location. Gateway counts all DNS requests sent to this IP as requests under this location.

  - `ipv4_destination: optional string`

    Show the primary destination IPv4 address from the pair identified dns_destination_ips_id. This field read-only.

  - `ipv4_destination_backup: optional string`

    Show the backup destination IPv4 address from the pair identified dns_destination_ips_id. This field read-only.

  - `max_ttl: optional object { mode, ttl_secs }`

    Controls how DNS response TTLs are capped for this location relative to the account `max_ttl_secs` setting. Omitting `max_ttl` on update resets it to `inherit`.

    - `mode: "inherit" or "override" or "disabled"`

      `inherit` uses the account `max_ttl_secs`. `override` uses this location's `ttl_secs`. `disabled` leaves returned TTLs unchanged.

      - `"inherit"`

      - `"override"`

      - `"disabled"`

    - `ttl_secs: optional number`

      Location-specific cap on DNS response TTLs, in seconds. Required when `mode` is `override`. Must be omitted when `mode` is `inherit` or `disabled`.

  - `name: optional string`

    Specify the location name.

  - `networks: optional array of object { network }`

    Specify the list of network ranges from which requests at this location originate. The list takes effect only if it is non-empty and the IPv4 endpoint is enabled for this location.

    - `network: string`

      Specify the IPv4 address or IPv4 CIDR. Limit IPv4 CIDRs to a maximum of /24.

  - `updated_at: optional string`

### Location Delete Response

- `LocationDeleteResponse = unknown`

# Logging

## Get logging settings for the Zero Trust account

**get** `/accounts/{account_id}/gateway/logging`

Retrieve the current logging settings for the Zero Trust account.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional LoggingSetting`

  - `redact_pii: optional boolean`

    Indicate whether to redact personally identifiable information from activity logging (PII fields include source IP, user email, user ID, device ID, URL, referrer, and user agent).

  - `settings_by_rule_type: optional object { dns, http, l4 }`

    Configure logging settings for each rule type.

    - `dns: optional object { log_all, log_blocks }`

      Configure logging settings for DNS firewall.

      - `log_all: optional boolean`

        Specify whether to log all requests to this service.

      - `log_blocks: optional boolean`

        Specify whether to log only blocking requests to this service.

    - `http: optional object { log_all, log_blocks }`

      Configure logging settings for HTTP/HTTPS firewall.

      - `log_all: optional boolean`

        Specify whether to log all requests to this service.

      - `log_blocks: optional boolean`

        Specify whether to log only blocking requests to this service.

    - `l4: optional object { log_all, log_blocks }`

      Configure logging settings for Network firewall.

      - `log_all: optional boolean`

        Specify whether to log all requests to this service.

      - `log_blocks: optional boolean`

        Specify whether to log only blocking requests to this service.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/logging \
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
    "redact_pii": true,
    "settings_by_rule_type": {
      "dns": {
        "log_all": false,
        "log_blocks": true
      },
      "http": {
        "log_all": false,
        "log_blocks": true
      },
      "l4": {
        "log_all": false,
        "log_blocks": true
      }
    }
  }
}
```

## Update Zero Trust account logging settings

**put** `/accounts/{account_id}/gateway/logging`

Update logging settings for the current Zero Trust account.

### Path Parameters

- `account_id: string`

### Body Parameters

- `redact_pii: optional boolean`

  Indicate whether to redact personally identifiable information from activity logging (PII fields include source IP, user email, user ID, device ID, URL, referrer, and user agent).

- `settings_by_rule_type: optional object { dns, http, l4 }`

  Configure logging settings for each rule type.

  - `dns: optional object { log_all, log_blocks }`

    Configure logging settings for DNS firewall.

    - `log_all: optional boolean`

      Specify whether to log all requests to this service.

    - `log_blocks: optional boolean`

      Specify whether to log only blocking requests to this service.

  - `http: optional object { log_all, log_blocks }`

    Configure logging settings for HTTP/HTTPS firewall.

    - `log_all: optional boolean`

      Specify whether to log all requests to this service.

    - `log_blocks: optional boolean`

      Specify whether to log only blocking requests to this service.

  - `l4: optional object { log_all, log_blocks }`

    Configure logging settings for Network firewall.

    - `log_all: optional boolean`

      Specify whether to log all requests to this service.

    - `log_blocks: optional boolean`

      Specify whether to log only blocking requests to this service.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional LoggingSetting`

  - `redact_pii: optional boolean`

    Indicate whether to redact personally identifiable information from activity logging (PII fields include source IP, user email, user ID, device ID, URL, referrer, and user agent).

  - `settings_by_rule_type: optional object { dns, http, l4 }`

    Configure logging settings for each rule type.

    - `dns: optional object { log_all, log_blocks }`

      Configure logging settings for DNS firewall.

      - `log_all: optional boolean`

        Specify whether to log all requests to this service.

      - `log_blocks: optional boolean`

        Specify whether to log only blocking requests to this service.

    - `http: optional object { log_all, log_blocks }`

      Configure logging settings for HTTP/HTTPS firewall.

      - `log_all: optional boolean`

        Specify whether to log all requests to this service.

      - `log_blocks: optional boolean`

        Specify whether to log only blocking requests to this service.

    - `l4: optional object { log_all, log_blocks }`

      Configure logging settings for Network firewall.

      - `log_all: optional boolean`

        Specify whether to log all requests to this service.

      - `log_blocks: optional boolean`

        Specify whether to log only blocking requests to this service.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/logging \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "redact_pii": true
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
    "redact_pii": true,
    "settings_by_rule_type": {
      "dns": {
        "log_all": false,
        "log_blocks": true
      },
      "http": {
        "log_all": false,
        "log_blocks": true
      },
      "l4": {
        "log_all": false,
        "log_blocks": true
      }
    }
  }
}
```

## Domain Types

### Logging Setting

- `LoggingSetting object { redact_pii, settings_by_rule_type }`

  - `redact_pii: optional boolean`

    Indicate whether to redact personally identifiable information from activity logging (PII fields include source IP, user email, user ID, device ID, URL, referrer, and user agent).

  - `settings_by_rule_type: optional object { dns, http, l4 }`

    Configure logging settings for each rule type.

    - `dns: optional object { log_all, log_blocks }`

      Configure logging settings for DNS firewall.

      - `log_all: optional boolean`

        Specify whether to log all requests to this service.

      - `log_blocks: optional boolean`

        Specify whether to log only blocking requests to this service.

    - `http: optional object { log_all, log_blocks }`

      Configure logging settings for HTTP/HTTPS firewall.

      - `log_all: optional boolean`

        Specify whether to log all requests to this service.

      - `log_blocks: optional boolean`

        Specify whether to log only blocking requests to this service.

    - `l4: optional object { log_all, log_blocks }`

      Configure logging settings for Network firewall.

      - `log_all: optional boolean`

        Specify whether to log all requests to this service.

      - `log_blocks: optional boolean`

        Specify whether to log only blocking requests to this service.

# Proxy Endpoints

## List proxy endpoints

**get** `/accounts/{account_id}/gateway/proxy_endpoints`

List all Zero Trust Gateway proxy endpoints for an account.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional array of ProxyEndpoint`

  - `IP object { ips, name, id, 4 more }`

    - `ips: array of GatewayIPs`

      Specify the list of CIDRs to restrict ingress connections.

    - `name: string`

      Specify the name of the proxy endpoint.

    - `id: optional string`

    - `created_at: optional string`

    - `kind: optional "ip"`

      The proxy endpoint kind

      - `"ip"`

    - `subdomain: optional string`

      Specify the subdomain to use as the destination in the proxy client.

    - `updated_at: optional string`

  - `Identity object { kind, name, id, 3 more }`

    - `kind: "identity"`

      The proxy endpoint kind

      - `"identity"`

    - `name: string`

      Specify the name of the proxy endpoint.

    - `id: optional string`

    - `created_at: optional string`

    - `subdomain: optional string`

      Specify the subdomain to use as the destination in the proxy client.

    - `updated_at: optional string`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Indicate the total number of results for the requested service.

  - `page: optional number`

    Indicate the current page within a paginated list of results.

  - `per_page: optional number`

    Indicate the number of results per page.

  - `total_count: optional number`

    Indicate the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/proxy_endpoints \
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
      "ips": [
        "192.0.2.1/32"
      ],
      "name": "Devops team",
      "id": "ed35569b41ce4d1facfe683550f54086",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "kind": "ip",
      "subdomain": "oli3n9zkz5.proxy.cloudflare-gateway.com",
      "updated_at": "2014-01-01T05:20:00.12345Z"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get a proxy endpoint

**get** `/accounts/{account_id}/gateway/proxy_endpoints/{proxy_endpoint_id}`

Get a single Zero Trust Gateway proxy endpoint.

### Path Parameters

- `account_id: string`

- `proxy_endpoint_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional ProxyEndpoint`

  - `IP object { ips, name, id, 4 more }`

    - `ips: array of GatewayIPs`

      Specify the list of CIDRs to restrict ingress connections.

    - `name: string`

      Specify the name of the proxy endpoint.

    - `id: optional string`

    - `created_at: optional string`

    - `kind: optional "ip"`

      The proxy endpoint kind

      - `"ip"`

    - `subdomain: optional string`

      Specify the subdomain to use as the destination in the proxy client.

    - `updated_at: optional string`

  - `Identity object { kind, name, id, 3 more }`

    - `kind: "identity"`

      The proxy endpoint kind

      - `"identity"`

    - `name: string`

      Specify the name of the proxy endpoint.

    - `id: optional string`

    - `created_at: optional string`

    - `subdomain: optional string`

      Specify the subdomain to use as the destination in the proxy client.

    - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/proxy_endpoints/$PROXY_ENDPOINT_ID \
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
    "ips": [
      "192.0.2.1/32"
    ],
    "name": "Devops team",
    "id": "ed35569b41ce4d1facfe683550f54086",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "kind": "ip",
    "subdomain": "oli3n9zkz5.proxy.cloudflare-gateway.com",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Create a proxy endpoint

**post** `/accounts/{account_id}/gateway/proxy_endpoints`

Create a new Zero Trust Gateway proxy endpoint.

### Path Parameters

- `account_id: string`

### Body Parameters

- `body: object { name, kind }  or object { kind, name }`

  - `IP object { name, kind }`

    - `name: string`

      Specify the name of the proxy endpoint.

    - `kind: optional "ip"`

      The proxy endpoint kind

      - `"ip"`

  - `Identity object { kind, name }`

    - `kind: "identity"`

      The proxy endpoint kind

      - `"identity"`

    - `name: string`

      Specify the name of the proxy endpoint.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional ProxyEndpoint`

  - `IP object { ips, name, id, 4 more }`

    - `ips: array of GatewayIPs`

      Specify the list of CIDRs to restrict ingress connections.

    - `name: string`

      Specify the name of the proxy endpoint.

    - `id: optional string`

    - `created_at: optional string`

    - `kind: optional "ip"`

      The proxy endpoint kind

      - `"ip"`

    - `subdomain: optional string`

      Specify the subdomain to use as the destination in the proxy client.

    - `updated_at: optional string`

  - `Identity object { kind, name, id, 3 more }`

    - `kind: "identity"`

      The proxy endpoint kind

      - `"identity"`

    - `name: string`

      Specify the name of the proxy endpoint.

    - `id: optional string`

    - `created_at: optional string`

    - `subdomain: optional string`

      Specify the subdomain to use as the destination in the proxy client.

    - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/proxy_endpoints \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Devops team",
          "kind": "ip"
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
    "ips": [
      "192.0.2.1/32"
    ],
    "name": "Devops team",
    "id": "ed35569b41ce4d1facfe683550f54086",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "kind": "ip",
    "subdomain": "oli3n9zkz5.proxy.cloudflare-gateway.com",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Update a proxy endpoint

**patch** `/accounts/{account_id}/gateway/proxy_endpoints/{proxy_endpoint_id}`

Update a configured Zero Trust Gateway proxy endpoint.

### Path Parameters

- `account_id: string`

- `proxy_endpoint_id: string`

### Body Parameters

- `ips: optional array of GatewayIPs`

  Specify the list of CIDRs to restrict ingress connections.

- `name: optional string`

  Specify the name of the proxy endpoint.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional ProxyEndpoint`

  - `IP object { ips, name, id, 4 more }`

    - `ips: array of GatewayIPs`

      Specify the list of CIDRs to restrict ingress connections.

    - `name: string`

      Specify the name of the proxy endpoint.

    - `id: optional string`

    - `created_at: optional string`

    - `kind: optional "ip"`

      The proxy endpoint kind

      - `"ip"`

    - `subdomain: optional string`

      Specify the subdomain to use as the destination in the proxy client.

    - `updated_at: optional string`

  - `Identity object { kind, name, id, 3 more }`

    - `kind: "identity"`

      The proxy endpoint kind

      - `"identity"`

    - `name: string`

      Specify the name of the proxy endpoint.

    - `id: optional string`

    - `created_at: optional string`

    - `subdomain: optional string`

      Specify the subdomain to use as the destination in the proxy client.

    - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/proxy_endpoints/$PROXY_ENDPOINT_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Devops team"
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
    "ips": [
      "192.0.2.1/32"
    ],
    "name": "Devops team",
    "id": "ed35569b41ce4d1facfe683550f54086",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "kind": "ip",
    "subdomain": "oli3n9zkz5.proxy.cloudflare-gateway.com",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Delete a proxy endpoint

**delete** `/accounts/{account_id}/gateway/proxy_endpoints/{proxy_endpoint_id}`

Delete a configured Zero Trust Gateway proxy endpoint.

### Path Parameters

- `account_id: string`

- `proxy_endpoint_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/proxy_endpoints/$PROXY_ENDPOINT_ID \
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
  "result": {}
}
```

## Domain Types

### Gateway IPs

- `GatewayIPs = string`

  Specify an IPv4 or IPv6 CIDR. Limit IPv6 to a maximum of /109 and IPv4 to a maximum of /25.

### Proxy Endpoint

- `ProxyEndpoint = object { ips, name, id, 4 more }  or object { kind, name, id, 3 more }`

  - `IP object { ips, name, id, 4 more }`

    - `ips: array of GatewayIPs`

      Specify the list of CIDRs to restrict ingress connections.

    - `name: string`

      Specify the name of the proxy endpoint.

    - `id: optional string`

    - `created_at: optional string`

    - `kind: optional "ip"`

      The proxy endpoint kind

      - `"ip"`

    - `subdomain: optional string`

      Specify the subdomain to use as the destination in the proxy client.

    - `updated_at: optional string`

  - `Identity object { kind, name, id, 3 more }`

    - `kind: "identity"`

      The proxy endpoint kind

      - `"identity"`

    - `name: string`

      Specify the name of the proxy endpoint.

    - `id: optional string`

    - `created_at: optional string`

    - `subdomain: optional string`

      Specify the subdomain to use as the destination in the proxy client.

    - `updated_at: optional string`

### Proxy Endpoint Delete Response

- `ProxyEndpointDeleteResponse = unknown`

# Rules

## List Zero Trust Gateway rules

**get** `/accounts/{account_id}/gateway/rules`

List Zero Trust Gateway rules for an account.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional array of GatewayRule`

  - `action: "on" or "off" or "allow" or 13 more`

    Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.

    - `"on"`

    - `"off"`

    - `"allow"`

    - `"block"`

    - `"scan"`

    - `"noscan"`

    - `"safesearch"`

    - `"ytrestricted"`

    - `"isolate"`

    - `"noisolate"`

    - `"override"`

    - `"l4_override"`

    - `"egress"`

    - `"resolve"`

    - `"quarantine"`

    - `"redirect"`

  - `enabled: boolean`

    Specify whether the rule is enabled.

  - `filters: array of GatewayFilter`

    Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.

    - `"http"`

    - `"dns"`

    - `"l4"`

    - `"egress"`

    - `"dns_resolver"`

  - `name: string`

    Specify the rule name.

  - `precedence: number`

    Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order of this value. Refer to [Order of enforcement](http://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/order-of-enforcement/#manage-precedence-with-terraform) to manage precedence via Terraform.

  - `traffic: string`

    Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `id: optional string`

    Identify the API resource with a UUID.

  - `created_at: optional string`

  - `deleted_at: optional string`

    Indicate the date of deletion, if any.

  - `description: optional string`

    Specify the rule description.

  - `device_posture: optional string`

    Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `expiration: optional object { expires_at, duration, expired }`

    Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any. This  does not apply to HTTP or network policies. Settable only for `dns` rules.

    - `expires_at: string`

      Show the timestamp when the policy expires and stops applying.  The value must follow RFC 3339 and include a UTC offset.  The system accepts non-zero offsets but converts them to the equivalent UTC+00:00  value and returns timestamps with a trailing Z. Expiration policies ignore client  timezones and expire globally at the specified expires_at time.

    - `duration: optional number`

      Defines the default duration a policy active in minutes. Must set in order to use the `reset_expiration` endpoint on this rule.

    - `expired: optional boolean`

      Indicates whether the policy is expired.

  - `identity: optional string`

    Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `read_only: optional boolean`

    Indicate that this rule is shared via the Orgs API and read only.

  - `rule_settings: optional RuleSetting`

    Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, confirm the setting supports your rule type and check whether the API modifies the value. Use API-returned values in your configuration to prevent drift.

    - `add_headers: optional map[array of string]`

      Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Settable only for `http` rules with the action set to `allow`.

    - `allow_child_bypass: optional boolean`

      Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.

    - `audit_ssh: optional object { command_logging }`

      Define the settings for the Audit SSH action. Settable only for `l4` rules with `audit_ssh` action.

      - `command_logging: optional boolean`

        Enable SSH command logging.

    - `biso_admin_controls: optional object { copy, dcp, dd, 10 more }`

      Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.

      - `copy: optional "enabled" or "disabled" or "remote_only"`

        Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this field is absent, copying remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `dcp: optional boolean`

        Set to false to enable copy-pasting. Only applies when `version == "v1"`.

      - `dd: optional boolean`

        Set to false to enable downloading. Only applies when `version == "v1"`.

      - `dk: optional boolean`

        Set to false to enable keyboard usage. Only applies when `version == "v1"`.

      - `download: optional "enabled" or "disabled" or "remote_only"`

        Configure download behavior. When set to remote_only, users can view downloads but cannot save them. If this field is absent, downloading remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `dp: optional boolean`

        Set to false to enable printing. Only applies when `version == "v1"`.

      - `du: optional boolean`

        Set to false to enable uploading. Only applies when `version == "v1"`.

      - `keyboard: optional "enabled" or "disabled"`

        Configure keyboard usage behavior. If this field is absent, keyboard usage remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `paste: optional "enabled" or "disabled" or "remote_only"`

        Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is absent, pasting remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `printing: optional "enabled" or "disabled"`

        Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `upload: optional "enabled" or "disabled"`

        Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `version: optional "v1" or "v2"`

        Indicate which version of the browser isolation controls should apply.

        - `"v1"`

        - `"v2"`

      - `wm_id: optional string`

        Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.

    - `block_page: optional object { target_uri, include_context }`

      Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `block`.

      - `target_uri: string`

        Specify the URI to which the user is redirected.

      - `include_context: optional boolean`

        Specify whether to pass the context information as query parameters.

    - `block_page_enabled: optional boolean`

      Enable the custom block page. Settable only for `dns` rules with action `block`.

    - `block_reason: optional string`

      Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules when the action set to `block`.

    - `bypass_parent_rule: optional boolean`

      Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.

    - `check_session: optional object { duration, enforce }`

      Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.

      - `duration: optional string`

        Sets the required session freshness threshold. The API returns a normalized version of this value.

      - `enforce: optional boolean`

        Enable session enforcement.

    - `dns_resolvers: optional object { ipv4, ipv6 }`

      Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_internally' settings. DNS queries get routed to the address closest to their origin. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

      - `ipv4: optional array of DNSResolverSettingsV4`

        - `ip: string`

          Specify the IPv4 address of the upstream resolver.

        - `port: optional number`

          Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

        - `route_through_private_network: optional boolean`

          Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

        - `vnet_id: optional string`

          Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

      - `ipv6: optional array of DNSResolverSettingsV6`

        - `ip: string`

          Specify the IPv6 address of the upstream resolver.

        - `port: optional number`

          Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

        - `route_through_private_network: optional boolean`

          Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

        - `vnet_id: optional string`

          Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

    - `egress: optional object { ipv4, ipv4_fallback, ipv6 }`

      Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate local egress via WARP IPs. Settable only for `egress` rules.

      - `ipv4: optional string`

        Specify the IPv4 address to use for egress.

      - `ipv4_fallback: optional string`

        Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.

      - `ipv6: optional string`

        Specify the IPv6 range to use for egress.

    - `forensic_copy: optional object { enabled }`

      Configure whether a copy of the HTTP request will be sent to storage when the rule matches.

      - `enabled: optional boolean`

        Enable sending the copy to storage.

    - `ignore_cname_category_matches: optional boolean`

      Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in the response. Settable only for `dns` and `dns_resolver` rules.

    - `insecure_disable_dnssec_validation: optional boolean`

      Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.

    - `ip_categories: optional boolean`

      Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for `dns` and `dns_resolver` rules.

    - `ip_indicator_feeds: optional boolean`

      Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for `dns` and `dns_resolver` rules.

    - `l4override: optional object { ip, port }`

      Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.

      - `ip: optional string`

        Defines the IPv4 or IPv6 address.

      - `port: optional number`

        Defines a port number to use for TCP/UDP overrides.

    - `notification_settings: optional object { enabled, include_context, msg, support_url }`

      Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `block`.

      - `enabled: optional boolean`

        Enable notification.

      - `include_context: optional boolean`

        Indicates whether to pass the context information as query parameters.

      - `msg: optional string`

        Customize the message shown in the notification.

      - `support_url: optional string`

        Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.

    - `override_host: optional string`

      Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.

    - `override_ips: optional array of string`

      Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.

    - `payload_log: optional object { enabled }`

      Configure DLP payload logging. Settable only for `http` rules.

      - `enabled: optional boolean`

        Enable DLP payload logging for this rule.

    - `quarantine: optional object { file_types }`

      Configure settings that apply to quarantine rules. Settable only for `http` rules.

      - `file_types: optional array of "exe" or "pdf" or "doc" or 10 more`

        Specify the types of files to sandbox.

        - `"exe"`

        - `"pdf"`

        - `"doc"`

        - `"docm"`

        - `"docx"`

        - `"rtf"`

        - `"ppt"`

        - `"pptx"`

        - `"xls"`

        - `"xlsm"`

        - `"xlsx"`

        - `"zip"`

        - `"rar"`

    - `redirect: optional object { target_uri, include_context, preserve_path_and_query }`

      Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.

      - `target_uri: string`

        Specify the URI to which the user is redirected.

      - `include_context: optional boolean`

        Specify whether to pass the context information as query parameters.

      - `preserve_path_and_query: optional boolean`

        Specify whether to append the path and query parameters from the original request to target_uri.

    - `resolve_dns_internally: optional object { fallback, view_id }`

      Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is specified or 'resolve_dns_through_cloudflare' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

      - `fallback: optional "none" or "public_dns"`

        Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CNAME records for 'A' or 'AAAA' queries.

        - `"none"`

        - `"public_dns"`

      - `view_id: optional string`

        Specify the internal DNS view identifier to pass to the internal DNS service.

    - `resolve_dns_through_cloudflare: optional boolean`

      Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'resolve_dns_internally' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

    - `untrusted_cert: optional object { action }`

      Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `allow`.

      - `action: optional "pass_through" or "block" or "error"`

        Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.

        - `"pass_through"`

        - `"block"`

        - `"error"`

  - `schedule: optional Schedule`

    Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.

    - `fri: optional string`

      Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Fridays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `mon: optional string`

      Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits). If this parameter omitted, the rule is deactivated on Mondays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `sat: optional string`

      Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Saturdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `sun: optional string`

      Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Sundays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `thu: optional string`

      Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Thursdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `time_zone: optional string`

      Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) is provided, Gateway always uses the current time for that time zone. When this parameter is omitted, Gateway uses the time zone determined from the user's IP address. Colo time zone is used when the user's IP address does not resolve to a location.

    - `tue: optional string`

      Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Tuesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `wed: optional string`

      Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Wednesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `sharable: optional boolean`

    Indicate that this rule is sharable via the Orgs API.

  - `source_account: optional string`

    Provide the account tag of the account that created the rule.

  - `updated_at: optional string`

  - `version: optional number`

    Indicate the version number of the rule(read-only).

  - `warning_status: optional string`

    Indicate a warning for a misconfigured rule, if any.

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Indicate the total number of results for the requested service.

  - `page: optional number`

    Indicate the current page within a paginated list of results.

  - `per_page: optional number`

    Indicate the number of results per page.

  - `total_count: optional number`

    Indicate the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules \
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
      "action": "allow",
      "enabled": true,
      "filters": [
        "http"
      ],
      "name": "block bad websites",
      "precedence": 0,
      "traffic": "http.request.uri matches \".*a/partial/uri.*\" and http.request.host in $01302951-49f9-47c9-a400-0297e60b6a10",
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "deleted_at": "2019-12-27T18:11:19.117Z",
      "description": "Block bad websites based on their host name.",
      "device_posture": "any(device_posture.checks.passed[*] in {\"1308749e-fcfb-4ebc-b051-fe022b632644\"})",
      "expiration": {
        "expires_at": "2014-01-01T05:20:20Z",
        "duration": 10,
        "expired": false
      },
      "identity": "any(identity.groups.name[*] in {\"finance\"})",
      "read_only": true,
      "rule_settings": {
        "add_headers": {
          "My-Next-Header": [
            "foo",
            "bar"
          ],
          "X-Custom-Header-Name": [
            "somecustomvalue"
          ]
        },
        "allow_child_bypass": false,
        "audit_ssh": {
          "command_logging": false
        },
        "biso_admin_controls": {
          "copy": "remote_only",
          "dcp": true,
          "dd": true,
          "dk": true,
          "download": "enabled",
          "dp": false,
          "du": true,
          "keyboard": "enabled",
          "paste": "enabled",
          "printing": "enabled",
          "upload": "enabled",
          "version": "v1",
          "wm_id": "475345dc-5299-4b6e-8f6a-3d3e4c8e9f1a"
        },
        "block_page": {
          "target_uri": "https://example.com",
          "include_context": true
        },
        "block_page_enabled": true,
        "block_reason": "This website is a security risk",
        "bypass_parent_rule": false,
        "check_session": {
          "duration": "300s",
          "enforce": true
        },
        "dns_resolvers": {
          "ipv4": [
            {
              "ip": "2.2.2.2",
              "port": 5053,
              "route_through_private_network": true,
              "vnet_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
            }
          ],
          "ipv6": [
            {
              "ip": "2001:DB8::",
              "port": 5053,
              "route_through_private_network": true,
              "vnet_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
            }
          ]
        },
        "egress": {
          "ipv4": "192.0.2.2",
          "ipv4_fallback": "192.0.2.3",
          "ipv6": "2001:DB8::/64"
        },
        "forensic_copy": {
          "enabled": true
        },
        "ignore_cname_category_matches": true,
        "insecure_disable_dnssec_validation": false,
        "ip_categories": true,
        "ip_indicator_feeds": true,
        "l4override": {
          "ip": "1.1.1.1",
          "port": 0
        },
        "notification_settings": {
          "enabled": true,
          "include_context": true,
          "msg": "msg",
          "support_url": "support_url"
        },
        "override_host": "example.com",
        "override_ips": [
          "1.1.1.1",
          "2.2.2.2"
        ],
        "payload_log": {
          "enabled": true
        },
        "quarantine": {
          "file_types": [
            "exe"
          ]
        },
        "redirect": {
          "target_uri": "https://example.com",
          "include_context": true,
          "preserve_path_and_query": true
        },
        "resolve_dns_internally": {
          "fallback": "none",
          "view_id": "view_id"
        },
        "resolve_dns_through_cloudflare": true,
        "untrusted_cert": {
          "action": "error"
        }
      },
      "schedule": {
        "fri": "08:00-12:30,13:30-17:00",
        "mon": "08:00-12:30,13:30-17:00",
        "sat": "08:00-12:30,13:30-17:00",
        "sun": "08:00-12:30,13:30-17:00",
        "thu": "08:00-12:30,13:30-17:00",
        "time_zone": "America/New York",
        "tue": "08:00-12:30,13:30-17:00",
        "wed": "08:00-12:30,13:30-17:00"
      },
      "sharable": true,
      "source_account": "source_account",
      "updated_at": "2014-01-01T05:20:00.12345Z",
      "version": 1,
      "warning_status": "warning_status"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get Zero Trust Gateway rule details.

**get** `/accounts/{account_id}/gateway/rules/{rule_id}`

Get a single Zero Trust Gateway rule.

### Path Parameters

- `account_id: string`

- `rule_id: string`

  Identify the API resource with a UUID.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional GatewayRule`

  - `action: "on" or "off" or "allow" or 13 more`

    Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.

    - `"on"`

    - `"off"`

    - `"allow"`

    - `"block"`

    - `"scan"`

    - `"noscan"`

    - `"safesearch"`

    - `"ytrestricted"`

    - `"isolate"`

    - `"noisolate"`

    - `"override"`

    - `"l4_override"`

    - `"egress"`

    - `"resolve"`

    - `"quarantine"`

    - `"redirect"`

  - `enabled: boolean`

    Specify whether the rule is enabled.

  - `filters: array of GatewayFilter`

    Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.

    - `"http"`

    - `"dns"`

    - `"l4"`

    - `"egress"`

    - `"dns_resolver"`

  - `name: string`

    Specify the rule name.

  - `precedence: number`

    Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order of this value. Refer to [Order of enforcement](http://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/order-of-enforcement/#manage-precedence-with-terraform) to manage precedence via Terraform.

  - `traffic: string`

    Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `id: optional string`

    Identify the API resource with a UUID.

  - `created_at: optional string`

  - `deleted_at: optional string`

    Indicate the date of deletion, if any.

  - `description: optional string`

    Specify the rule description.

  - `device_posture: optional string`

    Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `expiration: optional object { expires_at, duration, expired }`

    Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any. This  does not apply to HTTP or network policies. Settable only for `dns` rules.

    - `expires_at: string`

      Show the timestamp when the policy expires and stops applying.  The value must follow RFC 3339 and include a UTC offset.  The system accepts non-zero offsets but converts them to the equivalent UTC+00:00  value and returns timestamps with a trailing Z. Expiration policies ignore client  timezones and expire globally at the specified expires_at time.

    - `duration: optional number`

      Defines the default duration a policy active in minutes. Must set in order to use the `reset_expiration` endpoint on this rule.

    - `expired: optional boolean`

      Indicates whether the policy is expired.

  - `identity: optional string`

    Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `read_only: optional boolean`

    Indicate that this rule is shared via the Orgs API and read only.

  - `rule_settings: optional RuleSetting`

    Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, confirm the setting supports your rule type and check whether the API modifies the value. Use API-returned values in your configuration to prevent drift.

    - `add_headers: optional map[array of string]`

      Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Settable only for `http` rules with the action set to `allow`.

    - `allow_child_bypass: optional boolean`

      Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.

    - `audit_ssh: optional object { command_logging }`

      Define the settings for the Audit SSH action. Settable only for `l4` rules with `audit_ssh` action.

      - `command_logging: optional boolean`

        Enable SSH command logging.

    - `biso_admin_controls: optional object { copy, dcp, dd, 10 more }`

      Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.

      - `copy: optional "enabled" or "disabled" or "remote_only"`

        Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this field is absent, copying remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `dcp: optional boolean`

        Set to false to enable copy-pasting. Only applies when `version == "v1"`.

      - `dd: optional boolean`

        Set to false to enable downloading. Only applies when `version == "v1"`.

      - `dk: optional boolean`

        Set to false to enable keyboard usage. Only applies when `version == "v1"`.

      - `download: optional "enabled" or "disabled" or "remote_only"`

        Configure download behavior. When set to remote_only, users can view downloads but cannot save them. If this field is absent, downloading remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `dp: optional boolean`

        Set to false to enable printing. Only applies when `version == "v1"`.

      - `du: optional boolean`

        Set to false to enable uploading. Only applies when `version == "v1"`.

      - `keyboard: optional "enabled" or "disabled"`

        Configure keyboard usage behavior. If this field is absent, keyboard usage remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `paste: optional "enabled" or "disabled" or "remote_only"`

        Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is absent, pasting remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `printing: optional "enabled" or "disabled"`

        Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `upload: optional "enabled" or "disabled"`

        Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `version: optional "v1" or "v2"`

        Indicate which version of the browser isolation controls should apply.

        - `"v1"`

        - `"v2"`

      - `wm_id: optional string`

        Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.

    - `block_page: optional object { target_uri, include_context }`

      Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `block`.

      - `target_uri: string`

        Specify the URI to which the user is redirected.

      - `include_context: optional boolean`

        Specify whether to pass the context information as query parameters.

    - `block_page_enabled: optional boolean`

      Enable the custom block page. Settable only for `dns` rules with action `block`.

    - `block_reason: optional string`

      Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules when the action set to `block`.

    - `bypass_parent_rule: optional boolean`

      Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.

    - `check_session: optional object { duration, enforce }`

      Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.

      - `duration: optional string`

        Sets the required session freshness threshold. The API returns a normalized version of this value.

      - `enforce: optional boolean`

        Enable session enforcement.

    - `dns_resolvers: optional object { ipv4, ipv6 }`

      Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_internally' settings. DNS queries get routed to the address closest to their origin. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

      - `ipv4: optional array of DNSResolverSettingsV4`

        - `ip: string`

          Specify the IPv4 address of the upstream resolver.

        - `port: optional number`

          Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

        - `route_through_private_network: optional boolean`

          Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

        - `vnet_id: optional string`

          Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

      - `ipv6: optional array of DNSResolverSettingsV6`

        - `ip: string`

          Specify the IPv6 address of the upstream resolver.

        - `port: optional number`

          Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

        - `route_through_private_network: optional boolean`

          Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

        - `vnet_id: optional string`

          Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

    - `egress: optional object { ipv4, ipv4_fallback, ipv6 }`

      Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate local egress via WARP IPs. Settable only for `egress` rules.

      - `ipv4: optional string`

        Specify the IPv4 address to use for egress.

      - `ipv4_fallback: optional string`

        Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.

      - `ipv6: optional string`

        Specify the IPv6 range to use for egress.

    - `forensic_copy: optional object { enabled }`

      Configure whether a copy of the HTTP request will be sent to storage when the rule matches.

      - `enabled: optional boolean`

        Enable sending the copy to storage.

    - `ignore_cname_category_matches: optional boolean`

      Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in the response. Settable only for `dns` and `dns_resolver` rules.

    - `insecure_disable_dnssec_validation: optional boolean`

      Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.

    - `ip_categories: optional boolean`

      Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for `dns` and `dns_resolver` rules.

    - `ip_indicator_feeds: optional boolean`

      Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for `dns` and `dns_resolver` rules.

    - `l4override: optional object { ip, port }`

      Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.

      - `ip: optional string`

        Defines the IPv4 or IPv6 address.

      - `port: optional number`

        Defines a port number to use for TCP/UDP overrides.

    - `notification_settings: optional object { enabled, include_context, msg, support_url }`

      Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `block`.

      - `enabled: optional boolean`

        Enable notification.

      - `include_context: optional boolean`

        Indicates whether to pass the context information as query parameters.

      - `msg: optional string`

        Customize the message shown in the notification.

      - `support_url: optional string`

        Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.

    - `override_host: optional string`

      Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.

    - `override_ips: optional array of string`

      Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.

    - `payload_log: optional object { enabled }`

      Configure DLP payload logging. Settable only for `http` rules.

      - `enabled: optional boolean`

        Enable DLP payload logging for this rule.

    - `quarantine: optional object { file_types }`

      Configure settings that apply to quarantine rules. Settable only for `http` rules.

      - `file_types: optional array of "exe" or "pdf" or "doc" or 10 more`

        Specify the types of files to sandbox.

        - `"exe"`

        - `"pdf"`

        - `"doc"`

        - `"docm"`

        - `"docx"`

        - `"rtf"`

        - `"ppt"`

        - `"pptx"`

        - `"xls"`

        - `"xlsm"`

        - `"xlsx"`

        - `"zip"`

        - `"rar"`

    - `redirect: optional object { target_uri, include_context, preserve_path_and_query }`

      Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.

      - `target_uri: string`

        Specify the URI to which the user is redirected.

      - `include_context: optional boolean`

        Specify whether to pass the context information as query parameters.

      - `preserve_path_and_query: optional boolean`

        Specify whether to append the path and query parameters from the original request to target_uri.

    - `resolve_dns_internally: optional object { fallback, view_id }`

      Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is specified or 'resolve_dns_through_cloudflare' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

      - `fallback: optional "none" or "public_dns"`

        Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CNAME records for 'A' or 'AAAA' queries.

        - `"none"`

        - `"public_dns"`

      - `view_id: optional string`

        Specify the internal DNS view identifier to pass to the internal DNS service.

    - `resolve_dns_through_cloudflare: optional boolean`

      Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'resolve_dns_internally' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

    - `untrusted_cert: optional object { action }`

      Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `allow`.

      - `action: optional "pass_through" or "block" or "error"`

        Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.

        - `"pass_through"`

        - `"block"`

        - `"error"`

  - `schedule: optional Schedule`

    Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.

    - `fri: optional string`

      Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Fridays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `mon: optional string`

      Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits). If this parameter omitted, the rule is deactivated on Mondays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `sat: optional string`

      Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Saturdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `sun: optional string`

      Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Sundays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `thu: optional string`

      Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Thursdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `time_zone: optional string`

      Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) is provided, Gateway always uses the current time for that time zone. When this parameter is omitted, Gateway uses the time zone determined from the user's IP address. Colo time zone is used when the user's IP address does not resolve to a location.

    - `tue: optional string`

      Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Tuesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `wed: optional string`

      Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Wednesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `sharable: optional boolean`

    Indicate that this rule is sharable via the Orgs API.

  - `source_account: optional string`

    Provide the account tag of the account that created the rule.

  - `updated_at: optional string`

  - `version: optional number`

    Indicate the version number of the rule(read-only).

  - `warning_status: optional string`

    Indicate a warning for a misconfigured rule, if any.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules/$RULE_ID \
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
    "action": "allow",
    "enabled": true,
    "filters": [
      "http"
    ],
    "name": "block bad websites",
    "precedence": 0,
    "traffic": "http.request.uri matches \".*a/partial/uri.*\" and http.request.host in $01302951-49f9-47c9-a400-0297e60b6a10",
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "deleted_at": "2019-12-27T18:11:19.117Z",
    "description": "Block bad websites based on their host name.",
    "device_posture": "any(device_posture.checks.passed[*] in {\"1308749e-fcfb-4ebc-b051-fe022b632644\"})",
    "expiration": {
      "expires_at": "2014-01-01T05:20:20Z",
      "duration": 10,
      "expired": false
    },
    "identity": "any(identity.groups.name[*] in {\"finance\"})",
    "read_only": true,
    "rule_settings": {
      "add_headers": {
        "My-Next-Header": [
          "foo",
          "bar"
        ],
        "X-Custom-Header-Name": [
          "somecustomvalue"
        ]
      },
      "allow_child_bypass": false,
      "audit_ssh": {
        "command_logging": false
      },
      "biso_admin_controls": {
        "copy": "remote_only",
        "dcp": true,
        "dd": true,
        "dk": true,
        "download": "enabled",
        "dp": false,
        "du": true,
        "keyboard": "enabled",
        "paste": "enabled",
        "printing": "enabled",
        "upload": "enabled",
        "version": "v1",
        "wm_id": "475345dc-5299-4b6e-8f6a-3d3e4c8e9f1a"
      },
      "block_page": {
        "target_uri": "https://example.com",
        "include_context": true
      },
      "block_page_enabled": true,
      "block_reason": "This website is a security risk",
      "bypass_parent_rule": false,
      "check_session": {
        "duration": "300s",
        "enforce": true
      },
      "dns_resolvers": {
        "ipv4": [
          {
            "ip": "2.2.2.2",
            "port": 5053,
            "route_through_private_network": true,
            "vnet_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
          }
        ],
        "ipv6": [
          {
            "ip": "2001:DB8::",
            "port": 5053,
            "route_through_private_network": true,
            "vnet_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
          }
        ]
      },
      "egress": {
        "ipv4": "192.0.2.2",
        "ipv4_fallback": "192.0.2.3",
        "ipv6": "2001:DB8::/64"
      },
      "forensic_copy": {
        "enabled": true
      },
      "ignore_cname_category_matches": true,
      "insecure_disable_dnssec_validation": false,
      "ip_categories": true,
      "ip_indicator_feeds": true,
      "l4override": {
        "ip": "1.1.1.1",
        "port": 0
      },
      "notification_settings": {
        "enabled": true,
        "include_context": true,
        "msg": "msg",
        "support_url": "support_url"
      },
      "override_host": "example.com",
      "override_ips": [
        "1.1.1.1",
        "2.2.2.2"
      ],
      "payload_log": {
        "enabled": true
      },
      "quarantine": {
        "file_types": [
          "exe"
        ]
      },
      "redirect": {
        "target_uri": "https://example.com",
        "include_context": true,
        "preserve_path_and_query": true
      },
      "resolve_dns_internally": {
        "fallback": "none",
        "view_id": "view_id"
      },
      "resolve_dns_through_cloudflare": true,
      "untrusted_cert": {
        "action": "error"
      }
    },
    "schedule": {
      "fri": "08:00-12:30,13:30-17:00",
      "mon": "08:00-12:30,13:30-17:00",
      "sat": "08:00-12:30,13:30-17:00",
      "sun": "08:00-12:30,13:30-17:00",
      "thu": "08:00-12:30,13:30-17:00",
      "time_zone": "America/New York",
      "tue": "08:00-12:30,13:30-17:00",
      "wed": "08:00-12:30,13:30-17:00"
    },
    "sharable": true,
    "source_account": "source_account",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "version": 1,
    "warning_status": "warning_status"
  }
}
```

## Create a Zero Trust Gateway rule

**post** `/accounts/{account_id}/gateway/rules`

Create a new Zero Trust Gateway rule.

### Path Parameters

- `account_id: string`

### Body Parameters

- `action: "on" or "off" or "allow" or 13 more`

  Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.

  - `"on"`

  - `"off"`

  - `"allow"`

  - `"block"`

  - `"scan"`

  - `"noscan"`

  - `"safesearch"`

  - `"ytrestricted"`

  - `"isolate"`

  - `"noisolate"`

  - `"override"`

  - `"l4_override"`

  - `"egress"`

  - `"resolve"`

  - `"quarantine"`

  - `"redirect"`

- `name: string`

  Specify the rule name.

- `description: optional string`

  Specify the rule description.

- `device_posture: optional string`

  Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

- `enabled: optional boolean`

  Specify whether the rule is enabled.

- `expiration: optional object { expires_at, duration, expired }`

  Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any. This  does not apply to HTTP or network policies. Settable only for `dns` rules.

  - `expires_at: string`

    Show the timestamp when the policy expires and stops applying.  The value must follow RFC 3339 and include a UTC offset.  The system accepts non-zero offsets but converts them to the equivalent UTC+00:00  value and returns timestamps with a trailing Z. Expiration policies ignore client  timezones and expire globally at the specified expires_at time.

  - `duration: optional number`

    Defines the default duration a policy active in minutes. Must set in order to use the `reset_expiration` endpoint on this rule.

  - `expired: optional boolean`

    Indicates whether the policy is expired.

- `filters: optional array of GatewayFilter`

  Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.

  - `"http"`

  - `"dns"`

  - `"l4"`

  - `"egress"`

  - `"dns_resolver"`

- `identity: optional string`

  Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

- `precedence: optional number`

  Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order of this value. Refer to [Order of enforcement](http://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/order-of-enforcement/#manage-precedence-with-terraform) to manage precedence via Terraform.

- `rule_settings: optional RuleSetting`

  Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, confirm the setting supports your rule type and check whether the API modifies the value. Use API-returned values in your configuration to prevent drift.

  - `add_headers: optional map[array of string]`

    Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Settable only for `http` rules with the action set to `allow`.

  - `allow_child_bypass: optional boolean`

    Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.

  - `audit_ssh: optional object { command_logging }`

    Define the settings for the Audit SSH action. Settable only for `l4` rules with `audit_ssh` action.

    - `command_logging: optional boolean`

      Enable SSH command logging.

  - `biso_admin_controls: optional object { copy, dcp, dd, 10 more }`

    Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.

    - `copy: optional "enabled" or "disabled" or "remote_only"`

      Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this field is absent, copying remains enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

      - `"remote_only"`

    - `dcp: optional boolean`

      Set to false to enable copy-pasting. Only applies when `version == "v1"`.

    - `dd: optional boolean`

      Set to false to enable downloading. Only applies when `version == "v1"`.

    - `dk: optional boolean`

      Set to false to enable keyboard usage. Only applies when `version == "v1"`.

    - `download: optional "enabled" or "disabled" or "remote_only"`

      Configure download behavior. When set to remote_only, users can view downloads but cannot save them. If this field is absent, downloading remains enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

      - `"remote_only"`

    - `dp: optional boolean`

      Set to false to enable printing. Only applies when `version == "v1"`.

    - `du: optional boolean`

      Set to false to enable uploading. Only applies when `version == "v1"`.

    - `keyboard: optional "enabled" or "disabled"`

      Configure keyboard usage behavior. If this field is absent, keyboard usage remains enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

    - `paste: optional "enabled" or "disabled" or "remote_only"`

      Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is absent, pasting remains enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

      - `"remote_only"`

    - `printing: optional "enabled" or "disabled"`

      Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

    - `upload: optional "enabled" or "disabled"`

      Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

    - `version: optional "v1" or "v2"`

      Indicate which version of the browser isolation controls should apply.

      - `"v1"`

      - `"v2"`

    - `wm_id: optional string`

      Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.

  - `block_page: optional object { target_uri, include_context }`

    Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `block`.

    - `target_uri: string`

      Specify the URI to which the user is redirected.

    - `include_context: optional boolean`

      Specify whether to pass the context information as query parameters.

  - `block_page_enabled: optional boolean`

    Enable the custom block page. Settable only for `dns` rules with action `block`.

  - `block_reason: optional string`

    Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules when the action set to `block`.

  - `bypass_parent_rule: optional boolean`

    Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.

  - `check_session: optional object { duration, enforce }`

    Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.

    - `duration: optional string`

      Sets the required session freshness threshold. The API returns a normalized version of this value.

    - `enforce: optional boolean`

      Enable session enforcement.

  - `dns_resolvers: optional object { ipv4, ipv6 }`

    Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_internally' settings. DNS queries get routed to the address closest to their origin. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

    - `ipv4: optional array of DNSResolverSettingsV4`

      - `ip: string`

        Specify the IPv4 address of the upstream resolver.

      - `port: optional number`

        Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

      - `route_through_private_network: optional boolean`

        Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

      - `vnet_id: optional string`

        Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

    - `ipv6: optional array of DNSResolverSettingsV6`

      - `ip: string`

        Specify the IPv6 address of the upstream resolver.

      - `port: optional number`

        Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

      - `route_through_private_network: optional boolean`

        Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

      - `vnet_id: optional string`

        Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

  - `egress: optional object { ipv4, ipv4_fallback, ipv6 }`

    Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate local egress via WARP IPs. Settable only for `egress` rules.

    - `ipv4: optional string`

      Specify the IPv4 address to use for egress.

    - `ipv4_fallback: optional string`

      Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.

    - `ipv6: optional string`

      Specify the IPv6 range to use for egress.

  - `forensic_copy: optional object { enabled }`

    Configure whether a copy of the HTTP request will be sent to storage when the rule matches.

    - `enabled: optional boolean`

      Enable sending the copy to storage.

  - `ignore_cname_category_matches: optional boolean`

    Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in the response. Settable only for `dns` and `dns_resolver` rules.

  - `insecure_disable_dnssec_validation: optional boolean`

    Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.

  - `ip_categories: optional boolean`

    Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for `dns` and `dns_resolver` rules.

  - `ip_indicator_feeds: optional boolean`

    Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for `dns` and `dns_resolver` rules.

  - `l4override: optional object { ip, port }`

    Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.

    - `ip: optional string`

      Defines the IPv4 or IPv6 address.

    - `port: optional number`

      Defines a port number to use for TCP/UDP overrides.

  - `notification_settings: optional object { enabled, include_context, msg, support_url }`

    Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `block`.

    - `enabled: optional boolean`

      Enable notification.

    - `include_context: optional boolean`

      Indicates whether to pass the context information as query parameters.

    - `msg: optional string`

      Customize the message shown in the notification.

    - `support_url: optional string`

      Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.

  - `override_host: optional string`

    Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.

  - `override_ips: optional array of string`

    Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.

  - `payload_log: optional object { enabled }`

    Configure DLP payload logging. Settable only for `http` rules.

    - `enabled: optional boolean`

      Enable DLP payload logging for this rule.

  - `quarantine: optional object { file_types }`

    Configure settings that apply to quarantine rules. Settable only for `http` rules.

    - `file_types: optional array of "exe" or "pdf" or "doc" or 10 more`

      Specify the types of files to sandbox.

      - `"exe"`

      - `"pdf"`

      - `"doc"`

      - `"docm"`

      - `"docx"`

      - `"rtf"`

      - `"ppt"`

      - `"pptx"`

      - `"xls"`

      - `"xlsm"`

      - `"xlsx"`

      - `"zip"`

      - `"rar"`

  - `redirect: optional object { target_uri, include_context, preserve_path_and_query }`

    Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.

    - `target_uri: string`

      Specify the URI to which the user is redirected.

    - `include_context: optional boolean`

      Specify whether to pass the context information as query parameters.

    - `preserve_path_and_query: optional boolean`

      Specify whether to append the path and query parameters from the original request to target_uri.

  - `resolve_dns_internally: optional object { fallback, view_id }`

    Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is specified or 'resolve_dns_through_cloudflare' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

    - `fallback: optional "none" or "public_dns"`

      Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CNAME records for 'A' or 'AAAA' queries.

      - `"none"`

      - `"public_dns"`

    - `view_id: optional string`

      Specify the internal DNS view identifier to pass to the internal DNS service.

  - `resolve_dns_through_cloudflare: optional boolean`

    Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'resolve_dns_internally' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

  - `untrusted_cert: optional object { action }`

    Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `allow`.

    - `action: optional "pass_through" or "block" or "error"`

      Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.

      - `"pass_through"`

      - `"block"`

      - `"error"`

- `schedule: optional Schedule`

  Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.

  - `fri: optional string`

    Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Fridays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `mon: optional string`

    Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits). If this parameter omitted, the rule is deactivated on Mondays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `sat: optional string`

    Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Saturdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `sun: optional string`

    Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Sundays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `thu: optional string`

    Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Thursdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `time_zone: optional string`

    Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) is provided, Gateway always uses the current time for that time zone. When this parameter is omitted, Gateway uses the time zone determined from the user's IP address. Colo time zone is used when the user's IP address does not resolve to a location.

  - `tue: optional string`

    Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Tuesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `wed: optional string`

    Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Wednesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

- `traffic: optional string`

  Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional GatewayRule`

  - `action: "on" or "off" or "allow" or 13 more`

    Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.

    - `"on"`

    - `"off"`

    - `"allow"`

    - `"block"`

    - `"scan"`

    - `"noscan"`

    - `"safesearch"`

    - `"ytrestricted"`

    - `"isolate"`

    - `"noisolate"`

    - `"override"`

    - `"l4_override"`

    - `"egress"`

    - `"resolve"`

    - `"quarantine"`

    - `"redirect"`

  - `enabled: boolean`

    Specify whether the rule is enabled.

  - `filters: array of GatewayFilter`

    Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.

    - `"http"`

    - `"dns"`

    - `"l4"`

    - `"egress"`

    - `"dns_resolver"`

  - `name: string`

    Specify the rule name.

  - `precedence: number`

    Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order of this value. Refer to [Order of enforcement](http://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/order-of-enforcement/#manage-precedence-with-terraform) to manage precedence via Terraform.

  - `traffic: string`

    Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `id: optional string`

    Identify the API resource with a UUID.

  - `created_at: optional string`

  - `deleted_at: optional string`

    Indicate the date of deletion, if any.

  - `description: optional string`

    Specify the rule description.

  - `device_posture: optional string`

    Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `expiration: optional object { expires_at, duration, expired }`

    Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any. This  does not apply to HTTP or network policies. Settable only for `dns` rules.

    - `expires_at: string`

      Show the timestamp when the policy expires and stops applying.  The value must follow RFC 3339 and include a UTC offset.  The system accepts non-zero offsets but converts them to the equivalent UTC+00:00  value and returns timestamps with a trailing Z. Expiration policies ignore client  timezones and expire globally at the specified expires_at time.

    - `duration: optional number`

      Defines the default duration a policy active in minutes. Must set in order to use the `reset_expiration` endpoint on this rule.

    - `expired: optional boolean`

      Indicates whether the policy is expired.

  - `identity: optional string`

    Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `read_only: optional boolean`

    Indicate that this rule is shared via the Orgs API and read only.

  - `rule_settings: optional RuleSetting`

    Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, confirm the setting supports your rule type and check whether the API modifies the value. Use API-returned values in your configuration to prevent drift.

    - `add_headers: optional map[array of string]`

      Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Settable only for `http` rules with the action set to `allow`.

    - `allow_child_bypass: optional boolean`

      Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.

    - `audit_ssh: optional object { command_logging }`

      Define the settings for the Audit SSH action. Settable only for `l4` rules with `audit_ssh` action.

      - `command_logging: optional boolean`

        Enable SSH command logging.

    - `biso_admin_controls: optional object { copy, dcp, dd, 10 more }`

      Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.

      - `copy: optional "enabled" or "disabled" or "remote_only"`

        Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this field is absent, copying remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `dcp: optional boolean`

        Set to false to enable copy-pasting. Only applies when `version == "v1"`.

      - `dd: optional boolean`

        Set to false to enable downloading. Only applies when `version == "v1"`.

      - `dk: optional boolean`

        Set to false to enable keyboard usage. Only applies when `version == "v1"`.

      - `download: optional "enabled" or "disabled" or "remote_only"`

        Configure download behavior. When set to remote_only, users can view downloads but cannot save them. If this field is absent, downloading remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `dp: optional boolean`

        Set to false to enable printing. Only applies when `version == "v1"`.

      - `du: optional boolean`

        Set to false to enable uploading. Only applies when `version == "v1"`.

      - `keyboard: optional "enabled" or "disabled"`

        Configure keyboard usage behavior. If this field is absent, keyboard usage remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `paste: optional "enabled" or "disabled" or "remote_only"`

        Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is absent, pasting remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `printing: optional "enabled" or "disabled"`

        Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `upload: optional "enabled" or "disabled"`

        Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `version: optional "v1" or "v2"`

        Indicate which version of the browser isolation controls should apply.

        - `"v1"`

        - `"v2"`

      - `wm_id: optional string`

        Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.

    - `block_page: optional object { target_uri, include_context }`

      Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `block`.

      - `target_uri: string`

        Specify the URI to which the user is redirected.

      - `include_context: optional boolean`

        Specify whether to pass the context information as query parameters.

    - `block_page_enabled: optional boolean`

      Enable the custom block page. Settable only for `dns` rules with action `block`.

    - `block_reason: optional string`

      Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules when the action set to `block`.

    - `bypass_parent_rule: optional boolean`

      Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.

    - `check_session: optional object { duration, enforce }`

      Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.

      - `duration: optional string`

        Sets the required session freshness threshold. The API returns a normalized version of this value.

      - `enforce: optional boolean`

        Enable session enforcement.

    - `dns_resolvers: optional object { ipv4, ipv6 }`

      Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_internally' settings. DNS queries get routed to the address closest to their origin. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

      - `ipv4: optional array of DNSResolverSettingsV4`

        - `ip: string`

          Specify the IPv4 address of the upstream resolver.

        - `port: optional number`

          Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

        - `route_through_private_network: optional boolean`

          Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

        - `vnet_id: optional string`

          Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

      - `ipv6: optional array of DNSResolverSettingsV6`

        - `ip: string`

          Specify the IPv6 address of the upstream resolver.

        - `port: optional number`

          Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

        - `route_through_private_network: optional boolean`

          Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

        - `vnet_id: optional string`

          Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

    - `egress: optional object { ipv4, ipv4_fallback, ipv6 }`

      Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate local egress via WARP IPs. Settable only for `egress` rules.

      - `ipv4: optional string`

        Specify the IPv4 address to use for egress.

      - `ipv4_fallback: optional string`

        Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.

      - `ipv6: optional string`

        Specify the IPv6 range to use for egress.

    - `forensic_copy: optional object { enabled }`

      Configure whether a copy of the HTTP request will be sent to storage when the rule matches.

      - `enabled: optional boolean`

        Enable sending the copy to storage.

    - `ignore_cname_category_matches: optional boolean`

      Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in the response. Settable only for `dns` and `dns_resolver` rules.

    - `insecure_disable_dnssec_validation: optional boolean`

      Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.

    - `ip_categories: optional boolean`

      Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for `dns` and `dns_resolver` rules.

    - `ip_indicator_feeds: optional boolean`

      Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for `dns` and `dns_resolver` rules.

    - `l4override: optional object { ip, port }`

      Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.

      - `ip: optional string`

        Defines the IPv4 or IPv6 address.

      - `port: optional number`

        Defines a port number to use for TCP/UDP overrides.

    - `notification_settings: optional object { enabled, include_context, msg, support_url }`

      Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `block`.

      - `enabled: optional boolean`

        Enable notification.

      - `include_context: optional boolean`

        Indicates whether to pass the context information as query parameters.

      - `msg: optional string`

        Customize the message shown in the notification.

      - `support_url: optional string`

        Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.

    - `override_host: optional string`

      Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.

    - `override_ips: optional array of string`

      Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.

    - `payload_log: optional object { enabled }`

      Configure DLP payload logging. Settable only for `http` rules.

      - `enabled: optional boolean`

        Enable DLP payload logging for this rule.

    - `quarantine: optional object { file_types }`

      Configure settings that apply to quarantine rules. Settable only for `http` rules.

      - `file_types: optional array of "exe" or "pdf" or "doc" or 10 more`

        Specify the types of files to sandbox.

        - `"exe"`

        - `"pdf"`

        - `"doc"`

        - `"docm"`

        - `"docx"`

        - `"rtf"`

        - `"ppt"`

        - `"pptx"`

        - `"xls"`

        - `"xlsm"`

        - `"xlsx"`

        - `"zip"`

        - `"rar"`

    - `redirect: optional object { target_uri, include_context, preserve_path_and_query }`

      Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.

      - `target_uri: string`

        Specify the URI to which the user is redirected.

      - `include_context: optional boolean`

        Specify whether to pass the context information as query parameters.

      - `preserve_path_and_query: optional boolean`

        Specify whether to append the path and query parameters from the original request to target_uri.

    - `resolve_dns_internally: optional object { fallback, view_id }`

      Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is specified or 'resolve_dns_through_cloudflare' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

      - `fallback: optional "none" or "public_dns"`

        Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CNAME records for 'A' or 'AAAA' queries.

        - `"none"`

        - `"public_dns"`

      - `view_id: optional string`

        Specify the internal DNS view identifier to pass to the internal DNS service.

    - `resolve_dns_through_cloudflare: optional boolean`

      Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'resolve_dns_internally' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

    - `untrusted_cert: optional object { action }`

      Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `allow`.

      - `action: optional "pass_through" or "block" or "error"`

        Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.

        - `"pass_through"`

        - `"block"`

        - `"error"`

  - `schedule: optional Schedule`

    Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.

    - `fri: optional string`

      Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Fridays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `mon: optional string`

      Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits). If this parameter omitted, the rule is deactivated on Mondays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `sat: optional string`

      Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Saturdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `sun: optional string`

      Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Sundays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `thu: optional string`

      Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Thursdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `time_zone: optional string`

      Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) is provided, Gateway always uses the current time for that time zone. When this parameter is omitted, Gateway uses the time zone determined from the user's IP address. Colo time zone is used when the user's IP address does not resolve to a location.

    - `tue: optional string`

      Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Tuesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `wed: optional string`

      Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Wednesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `sharable: optional boolean`

    Indicate that this rule is sharable via the Orgs API.

  - `source_account: optional string`

    Provide the account tag of the account that created the rule.

  - `updated_at: optional string`

  - `version: optional number`

    Indicate the version number of the rule(read-only).

  - `warning_status: optional string`

    Indicate a warning for a misconfigured rule, if any.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": "allow",
          "name": "block bad websites",
          "description": "Block bad websites based on their host name.",
          "device_posture": "any(device_posture.checks.passed[*] in {\\"1308749e-fcfb-4ebc-b051-fe022b632644\\"})",
          "enabled": true,
          "filters": [
            "http"
          ],
          "identity": "any(identity.groups.name[*] in {\\"finance\\"})",
          "traffic": "http.request.uri matches \\".*a/partial/uri.*\\" and http.request.host in $01302951-49f9-47c9-a400-0297e60b6a10"
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
    "action": "allow",
    "enabled": true,
    "filters": [
      "http"
    ],
    "name": "block bad websites",
    "precedence": 0,
    "traffic": "http.request.uri matches \".*a/partial/uri.*\" and http.request.host in $01302951-49f9-47c9-a400-0297e60b6a10",
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "deleted_at": "2019-12-27T18:11:19.117Z",
    "description": "Block bad websites based on their host name.",
    "device_posture": "any(device_posture.checks.passed[*] in {\"1308749e-fcfb-4ebc-b051-fe022b632644\"})",
    "expiration": {
      "expires_at": "2014-01-01T05:20:20Z",
      "duration": 10,
      "expired": false
    },
    "identity": "any(identity.groups.name[*] in {\"finance\"})",
    "read_only": true,
    "rule_settings": {
      "add_headers": {
        "My-Next-Header": [
          "foo",
          "bar"
        ],
        "X-Custom-Header-Name": [
          "somecustomvalue"
        ]
      },
      "allow_child_bypass": false,
      "audit_ssh": {
        "command_logging": false
      },
      "biso_admin_controls": {
        "copy": "remote_only",
        "dcp": true,
        "dd": true,
        "dk": true,
        "download": "enabled",
        "dp": false,
        "du": true,
        "keyboard": "enabled",
        "paste": "enabled",
        "printing": "enabled",
        "upload": "enabled",
        "version": "v1",
        "wm_id": "475345dc-5299-4b6e-8f6a-3d3e4c8e9f1a"
      },
      "block_page": {
        "target_uri": "https://example.com",
        "include_context": true
      },
      "block_page_enabled": true,
      "block_reason": "This website is a security risk",
      "bypass_parent_rule": false,
      "check_session": {
        "duration": "300s",
        "enforce": true
      },
      "dns_resolvers": {
        "ipv4": [
          {
            "ip": "2.2.2.2",
            "port": 5053,
            "route_through_private_network": true,
            "vnet_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
          }
        ],
        "ipv6": [
          {
            "ip": "2001:DB8::",
            "port": 5053,
            "route_through_private_network": true,
            "vnet_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
          }
        ]
      },
      "egress": {
        "ipv4": "192.0.2.2",
        "ipv4_fallback": "192.0.2.3",
        "ipv6": "2001:DB8::/64"
      },
      "forensic_copy": {
        "enabled": true
      },
      "ignore_cname_category_matches": true,
      "insecure_disable_dnssec_validation": false,
      "ip_categories": true,
      "ip_indicator_feeds": true,
      "l4override": {
        "ip": "1.1.1.1",
        "port": 0
      },
      "notification_settings": {
        "enabled": true,
        "include_context": true,
        "msg": "msg",
        "support_url": "support_url"
      },
      "override_host": "example.com",
      "override_ips": [
        "1.1.1.1",
        "2.2.2.2"
      ],
      "payload_log": {
        "enabled": true
      },
      "quarantine": {
        "file_types": [
          "exe"
        ]
      },
      "redirect": {
        "target_uri": "https://example.com",
        "include_context": true,
        "preserve_path_and_query": true
      },
      "resolve_dns_internally": {
        "fallback": "none",
        "view_id": "view_id"
      },
      "resolve_dns_through_cloudflare": true,
      "untrusted_cert": {
        "action": "error"
      }
    },
    "schedule": {
      "fri": "08:00-12:30,13:30-17:00",
      "mon": "08:00-12:30,13:30-17:00",
      "sat": "08:00-12:30,13:30-17:00",
      "sun": "08:00-12:30,13:30-17:00",
      "thu": "08:00-12:30,13:30-17:00",
      "time_zone": "America/New York",
      "tue": "08:00-12:30,13:30-17:00",
      "wed": "08:00-12:30,13:30-17:00"
    },
    "sharable": true,
    "source_account": "source_account",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "version": 1,
    "warning_status": "warning_status"
  }
}
```

## Update a Zero Trust Gateway rule

**put** `/accounts/{account_id}/gateway/rules/{rule_id}`

Update a configured Zero Trust Gateway rule.

### Path Parameters

- `account_id: string`

- `rule_id: string`

  Identify the API resource with a UUID.

### Body Parameters

- `action: "on" or "off" or "allow" or 13 more`

  Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.

  - `"on"`

  - `"off"`

  - `"allow"`

  - `"block"`

  - `"scan"`

  - `"noscan"`

  - `"safesearch"`

  - `"ytrestricted"`

  - `"isolate"`

  - `"noisolate"`

  - `"override"`

  - `"l4_override"`

  - `"egress"`

  - `"resolve"`

  - `"quarantine"`

  - `"redirect"`

- `name: string`

  Specify the rule name.

- `description: optional string`

  Specify the rule description.

- `device_posture: optional string`

  Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

- `enabled: optional boolean`

  Specify whether the rule is enabled.

- `expiration: optional object { expires_at, duration, expired }`

  Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any. This  does not apply to HTTP or network policies. Settable only for `dns` rules.

  - `expires_at: string`

    Show the timestamp when the policy expires and stops applying.  The value must follow RFC 3339 and include a UTC offset.  The system accepts non-zero offsets but converts them to the equivalent UTC+00:00  value and returns timestamps with a trailing Z. Expiration policies ignore client  timezones and expire globally at the specified expires_at time.

  - `duration: optional number`

    Defines the default duration a policy active in minutes. Must set in order to use the `reset_expiration` endpoint on this rule.

  - `expired: optional boolean`

    Indicates whether the policy is expired.

- `filters: optional array of GatewayFilter`

  Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.

  - `"http"`

  - `"dns"`

  - `"l4"`

  - `"egress"`

  - `"dns_resolver"`

- `identity: optional string`

  Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

- `precedence: optional number`

  Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order of this value. Refer to [Order of enforcement](http://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/order-of-enforcement/#manage-precedence-with-terraform) to manage precedence via Terraform.

- `rule_settings: optional RuleSetting`

  Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, confirm the setting supports your rule type and check whether the API modifies the value. Use API-returned values in your configuration to prevent drift.

  - `add_headers: optional map[array of string]`

    Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Settable only for `http` rules with the action set to `allow`.

  - `allow_child_bypass: optional boolean`

    Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.

  - `audit_ssh: optional object { command_logging }`

    Define the settings for the Audit SSH action. Settable only for `l4` rules with `audit_ssh` action.

    - `command_logging: optional boolean`

      Enable SSH command logging.

  - `biso_admin_controls: optional object { copy, dcp, dd, 10 more }`

    Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.

    - `copy: optional "enabled" or "disabled" or "remote_only"`

      Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this field is absent, copying remains enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

      - `"remote_only"`

    - `dcp: optional boolean`

      Set to false to enable copy-pasting. Only applies when `version == "v1"`.

    - `dd: optional boolean`

      Set to false to enable downloading. Only applies when `version == "v1"`.

    - `dk: optional boolean`

      Set to false to enable keyboard usage. Only applies when `version == "v1"`.

    - `download: optional "enabled" or "disabled" or "remote_only"`

      Configure download behavior. When set to remote_only, users can view downloads but cannot save them. If this field is absent, downloading remains enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

      - `"remote_only"`

    - `dp: optional boolean`

      Set to false to enable printing. Only applies when `version == "v1"`.

    - `du: optional boolean`

      Set to false to enable uploading. Only applies when `version == "v1"`.

    - `keyboard: optional "enabled" or "disabled"`

      Configure keyboard usage behavior. If this field is absent, keyboard usage remains enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

    - `paste: optional "enabled" or "disabled" or "remote_only"`

      Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is absent, pasting remains enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

      - `"remote_only"`

    - `printing: optional "enabled" or "disabled"`

      Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

    - `upload: optional "enabled" or "disabled"`

      Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

    - `version: optional "v1" or "v2"`

      Indicate which version of the browser isolation controls should apply.

      - `"v1"`

      - `"v2"`

    - `wm_id: optional string`

      Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.

  - `block_page: optional object { target_uri, include_context }`

    Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `block`.

    - `target_uri: string`

      Specify the URI to which the user is redirected.

    - `include_context: optional boolean`

      Specify whether to pass the context information as query parameters.

  - `block_page_enabled: optional boolean`

    Enable the custom block page. Settable only for `dns` rules with action `block`.

  - `block_reason: optional string`

    Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules when the action set to `block`.

  - `bypass_parent_rule: optional boolean`

    Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.

  - `check_session: optional object { duration, enforce }`

    Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.

    - `duration: optional string`

      Sets the required session freshness threshold. The API returns a normalized version of this value.

    - `enforce: optional boolean`

      Enable session enforcement.

  - `dns_resolvers: optional object { ipv4, ipv6 }`

    Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_internally' settings. DNS queries get routed to the address closest to their origin. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

    - `ipv4: optional array of DNSResolverSettingsV4`

      - `ip: string`

        Specify the IPv4 address of the upstream resolver.

      - `port: optional number`

        Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

      - `route_through_private_network: optional boolean`

        Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

      - `vnet_id: optional string`

        Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

    - `ipv6: optional array of DNSResolverSettingsV6`

      - `ip: string`

        Specify the IPv6 address of the upstream resolver.

      - `port: optional number`

        Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

      - `route_through_private_network: optional boolean`

        Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

      - `vnet_id: optional string`

        Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

  - `egress: optional object { ipv4, ipv4_fallback, ipv6 }`

    Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate local egress via WARP IPs. Settable only for `egress` rules.

    - `ipv4: optional string`

      Specify the IPv4 address to use for egress.

    - `ipv4_fallback: optional string`

      Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.

    - `ipv6: optional string`

      Specify the IPv6 range to use for egress.

  - `forensic_copy: optional object { enabled }`

    Configure whether a copy of the HTTP request will be sent to storage when the rule matches.

    - `enabled: optional boolean`

      Enable sending the copy to storage.

  - `ignore_cname_category_matches: optional boolean`

    Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in the response. Settable only for `dns` and `dns_resolver` rules.

  - `insecure_disable_dnssec_validation: optional boolean`

    Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.

  - `ip_categories: optional boolean`

    Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for `dns` and `dns_resolver` rules.

  - `ip_indicator_feeds: optional boolean`

    Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for `dns` and `dns_resolver` rules.

  - `l4override: optional object { ip, port }`

    Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.

    - `ip: optional string`

      Defines the IPv4 or IPv6 address.

    - `port: optional number`

      Defines a port number to use for TCP/UDP overrides.

  - `notification_settings: optional object { enabled, include_context, msg, support_url }`

    Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `block`.

    - `enabled: optional boolean`

      Enable notification.

    - `include_context: optional boolean`

      Indicates whether to pass the context information as query parameters.

    - `msg: optional string`

      Customize the message shown in the notification.

    - `support_url: optional string`

      Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.

  - `override_host: optional string`

    Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.

  - `override_ips: optional array of string`

    Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.

  - `payload_log: optional object { enabled }`

    Configure DLP payload logging. Settable only for `http` rules.

    - `enabled: optional boolean`

      Enable DLP payload logging for this rule.

  - `quarantine: optional object { file_types }`

    Configure settings that apply to quarantine rules. Settable only for `http` rules.

    - `file_types: optional array of "exe" or "pdf" or "doc" or 10 more`

      Specify the types of files to sandbox.

      - `"exe"`

      - `"pdf"`

      - `"doc"`

      - `"docm"`

      - `"docx"`

      - `"rtf"`

      - `"ppt"`

      - `"pptx"`

      - `"xls"`

      - `"xlsm"`

      - `"xlsx"`

      - `"zip"`

      - `"rar"`

  - `redirect: optional object { target_uri, include_context, preserve_path_and_query }`

    Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.

    - `target_uri: string`

      Specify the URI to which the user is redirected.

    - `include_context: optional boolean`

      Specify whether to pass the context information as query parameters.

    - `preserve_path_and_query: optional boolean`

      Specify whether to append the path and query parameters from the original request to target_uri.

  - `resolve_dns_internally: optional object { fallback, view_id }`

    Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is specified or 'resolve_dns_through_cloudflare' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

    - `fallback: optional "none" or "public_dns"`

      Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CNAME records for 'A' or 'AAAA' queries.

      - `"none"`

      - `"public_dns"`

    - `view_id: optional string`

      Specify the internal DNS view identifier to pass to the internal DNS service.

  - `resolve_dns_through_cloudflare: optional boolean`

    Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'resolve_dns_internally' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

  - `untrusted_cert: optional object { action }`

    Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `allow`.

    - `action: optional "pass_through" or "block" or "error"`

      Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.

      - `"pass_through"`

      - `"block"`

      - `"error"`

- `schedule: optional Schedule`

  Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.

  - `fri: optional string`

    Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Fridays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `mon: optional string`

    Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits). If this parameter omitted, the rule is deactivated on Mondays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `sat: optional string`

    Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Saturdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `sun: optional string`

    Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Sundays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `thu: optional string`

    Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Thursdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `time_zone: optional string`

    Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) is provided, Gateway always uses the current time for that time zone. When this parameter is omitted, Gateway uses the time zone determined from the user's IP address. Colo time zone is used when the user's IP address does not resolve to a location.

  - `tue: optional string`

    Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Tuesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `wed: optional string`

    Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Wednesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

- `traffic: optional string`

  Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional GatewayRule`

  - `action: "on" or "off" or "allow" or 13 more`

    Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.

    - `"on"`

    - `"off"`

    - `"allow"`

    - `"block"`

    - `"scan"`

    - `"noscan"`

    - `"safesearch"`

    - `"ytrestricted"`

    - `"isolate"`

    - `"noisolate"`

    - `"override"`

    - `"l4_override"`

    - `"egress"`

    - `"resolve"`

    - `"quarantine"`

    - `"redirect"`

  - `enabled: boolean`

    Specify whether the rule is enabled.

  - `filters: array of GatewayFilter`

    Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.

    - `"http"`

    - `"dns"`

    - `"l4"`

    - `"egress"`

    - `"dns_resolver"`

  - `name: string`

    Specify the rule name.

  - `precedence: number`

    Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order of this value. Refer to [Order of enforcement](http://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/order-of-enforcement/#manage-precedence-with-terraform) to manage precedence via Terraform.

  - `traffic: string`

    Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `id: optional string`

    Identify the API resource with a UUID.

  - `created_at: optional string`

  - `deleted_at: optional string`

    Indicate the date of deletion, if any.

  - `description: optional string`

    Specify the rule description.

  - `device_posture: optional string`

    Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `expiration: optional object { expires_at, duration, expired }`

    Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any. This  does not apply to HTTP or network policies. Settable only for `dns` rules.

    - `expires_at: string`

      Show the timestamp when the policy expires and stops applying.  The value must follow RFC 3339 and include a UTC offset.  The system accepts non-zero offsets but converts them to the equivalent UTC+00:00  value and returns timestamps with a trailing Z. Expiration policies ignore client  timezones and expire globally at the specified expires_at time.

    - `duration: optional number`

      Defines the default duration a policy active in minutes. Must set in order to use the `reset_expiration` endpoint on this rule.

    - `expired: optional boolean`

      Indicates whether the policy is expired.

  - `identity: optional string`

    Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `read_only: optional boolean`

    Indicate that this rule is shared via the Orgs API and read only.

  - `rule_settings: optional RuleSetting`

    Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, confirm the setting supports your rule type and check whether the API modifies the value. Use API-returned values in your configuration to prevent drift.

    - `add_headers: optional map[array of string]`

      Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Settable only for `http` rules with the action set to `allow`.

    - `allow_child_bypass: optional boolean`

      Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.

    - `audit_ssh: optional object { command_logging }`

      Define the settings for the Audit SSH action. Settable only for `l4` rules with `audit_ssh` action.

      - `command_logging: optional boolean`

        Enable SSH command logging.

    - `biso_admin_controls: optional object { copy, dcp, dd, 10 more }`

      Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.

      - `copy: optional "enabled" or "disabled" or "remote_only"`

        Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this field is absent, copying remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `dcp: optional boolean`

        Set to false to enable copy-pasting. Only applies when `version == "v1"`.

      - `dd: optional boolean`

        Set to false to enable downloading. Only applies when `version == "v1"`.

      - `dk: optional boolean`

        Set to false to enable keyboard usage. Only applies when `version == "v1"`.

      - `download: optional "enabled" or "disabled" or "remote_only"`

        Configure download behavior. When set to remote_only, users can view downloads but cannot save them. If this field is absent, downloading remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `dp: optional boolean`

        Set to false to enable printing. Only applies when `version == "v1"`.

      - `du: optional boolean`

        Set to false to enable uploading. Only applies when `version == "v1"`.

      - `keyboard: optional "enabled" or "disabled"`

        Configure keyboard usage behavior. If this field is absent, keyboard usage remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `paste: optional "enabled" or "disabled" or "remote_only"`

        Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is absent, pasting remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `printing: optional "enabled" or "disabled"`

        Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `upload: optional "enabled" or "disabled"`

        Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `version: optional "v1" or "v2"`

        Indicate which version of the browser isolation controls should apply.

        - `"v1"`

        - `"v2"`

      - `wm_id: optional string`

        Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.

    - `block_page: optional object { target_uri, include_context }`

      Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `block`.

      - `target_uri: string`

        Specify the URI to which the user is redirected.

      - `include_context: optional boolean`

        Specify whether to pass the context information as query parameters.

    - `block_page_enabled: optional boolean`

      Enable the custom block page. Settable only for `dns` rules with action `block`.

    - `block_reason: optional string`

      Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules when the action set to `block`.

    - `bypass_parent_rule: optional boolean`

      Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.

    - `check_session: optional object { duration, enforce }`

      Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.

      - `duration: optional string`

        Sets the required session freshness threshold. The API returns a normalized version of this value.

      - `enforce: optional boolean`

        Enable session enforcement.

    - `dns_resolvers: optional object { ipv4, ipv6 }`

      Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_internally' settings. DNS queries get routed to the address closest to their origin. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

      - `ipv4: optional array of DNSResolverSettingsV4`

        - `ip: string`

          Specify the IPv4 address of the upstream resolver.

        - `port: optional number`

          Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

        - `route_through_private_network: optional boolean`

          Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

        - `vnet_id: optional string`

          Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

      - `ipv6: optional array of DNSResolverSettingsV6`

        - `ip: string`

          Specify the IPv6 address of the upstream resolver.

        - `port: optional number`

          Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

        - `route_through_private_network: optional boolean`

          Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

        - `vnet_id: optional string`

          Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

    - `egress: optional object { ipv4, ipv4_fallback, ipv6 }`

      Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate local egress via WARP IPs. Settable only for `egress` rules.

      - `ipv4: optional string`

        Specify the IPv4 address to use for egress.

      - `ipv4_fallback: optional string`

        Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.

      - `ipv6: optional string`

        Specify the IPv6 range to use for egress.

    - `forensic_copy: optional object { enabled }`

      Configure whether a copy of the HTTP request will be sent to storage when the rule matches.

      - `enabled: optional boolean`

        Enable sending the copy to storage.

    - `ignore_cname_category_matches: optional boolean`

      Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in the response. Settable only for `dns` and `dns_resolver` rules.

    - `insecure_disable_dnssec_validation: optional boolean`

      Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.

    - `ip_categories: optional boolean`

      Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for `dns` and `dns_resolver` rules.

    - `ip_indicator_feeds: optional boolean`

      Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for `dns` and `dns_resolver` rules.

    - `l4override: optional object { ip, port }`

      Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.

      - `ip: optional string`

        Defines the IPv4 or IPv6 address.

      - `port: optional number`

        Defines a port number to use for TCP/UDP overrides.

    - `notification_settings: optional object { enabled, include_context, msg, support_url }`

      Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `block`.

      - `enabled: optional boolean`

        Enable notification.

      - `include_context: optional boolean`

        Indicates whether to pass the context information as query parameters.

      - `msg: optional string`

        Customize the message shown in the notification.

      - `support_url: optional string`

        Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.

    - `override_host: optional string`

      Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.

    - `override_ips: optional array of string`

      Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.

    - `payload_log: optional object { enabled }`

      Configure DLP payload logging. Settable only for `http` rules.

      - `enabled: optional boolean`

        Enable DLP payload logging for this rule.

    - `quarantine: optional object { file_types }`

      Configure settings that apply to quarantine rules. Settable only for `http` rules.

      - `file_types: optional array of "exe" or "pdf" or "doc" or 10 more`

        Specify the types of files to sandbox.

        - `"exe"`

        - `"pdf"`

        - `"doc"`

        - `"docm"`

        - `"docx"`

        - `"rtf"`

        - `"ppt"`

        - `"pptx"`

        - `"xls"`

        - `"xlsm"`

        - `"xlsx"`

        - `"zip"`

        - `"rar"`

    - `redirect: optional object { target_uri, include_context, preserve_path_and_query }`

      Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.

      - `target_uri: string`

        Specify the URI to which the user is redirected.

      - `include_context: optional boolean`

        Specify whether to pass the context information as query parameters.

      - `preserve_path_and_query: optional boolean`

        Specify whether to append the path and query parameters from the original request to target_uri.

    - `resolve_dns_internally: optional object { fallback, view_id }`

      Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is specified or 'resolve_dns_through_cloudflare' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

      - `fallback: optional "none" or "public_dns"`

        Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CNAME records for 'A' or 'AAAA' queries.

        - `"none"`

        - `"public_dns"`

      - `view_id: optional string`

        Specify the internal DNS view identifier to pass to the internal DNS service.

    - `resolve_dns_through_cloudflare: optional boolean`

      Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'resolve_dns_internally' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

    - `untrusted_cert: optional object { action }`

      Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `allow`.

      - `action: optional "pass_through" or "block" or "error"`

        Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.

        - `"pass_through"`

        - `"block"`

        - `"error"`

  - `schedule: optional Schedule`

    Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.

    - `fri: optional string`

      Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Fridays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `mon: optional string`

      Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits). If this parameter omitted, the rule is deactivated on Mondays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `sat: optional string`

      Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Saturdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `sun: optional string`

      Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Sundays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `thu: optional string`

      Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Thursdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `time_zone: optional string`

      Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) is provided, Gateway always uses the current time for that time zone. When this parameter is omitted, Gateway uses the time zone determined from the user's IP address. Colo time zone is used when the user's IP address does not resolve to a location.

    - `tue: optional string`

      Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Tuesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `wed: optional string`

      Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Wednesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `sharable: optional boolean`

    Indicate that this rule is sharable via the Orgs API.

  - `source_account: optional string`

    Provide the account tag of the account that created the rule.

  - `updated_at: optional string`

  - `version: optional number`

    Indicate the version number of the rule(read-only).

  - `warning_status: optional string`

    Indicate a warning for a misconfigured rule, if any.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules/$RULE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": "allow",
          "name": "block bad websites",
          "description": "Block bad websites based on their host name.",
          "device_posture": "any(device_posture.checks.passed[*] in {\\"1308749e-fcfb-4ebc-b051-fe022b632644\\"})",
          "enabled": true,
          "filters": [
            "http"
          ],
          "identity": "any(identity.groups.name[*] in {\\"finance\\"})",
          "traffic": "http.request.uri matches \\".*a/partial/uri.*\\" and http.request.host in $01302951-49f9-47c9-a400-0297e60b6a10"
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
    "action": "allow",
    "enabled": true,
    "filters": [
      "http"
    ],
    "name": "block bad websites",
    "precedence": 0,
    "traffic": "http.request.uri matches \".*a/partial/uri.*\" and http.request.host in $01302951-49f9-47c9-a400-0297e60b6a10",
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "deleted_at": "2019-12-27T18:11:19.117Z",
    "description": "Block bad websites based on their host name.",
    "device_posture": "any(device_posture.checks.passed[*] in {\"1308749e-fcfb-4ebc-b051-fe022b632644\"})",
    "expiration": {
      "expires_at": "2014-01-01T05:20:20Z",
      "duration": 10,
      "expired": false
    },
    "identity": "any(identity.groups.name[*] in {\"finance\"})",
    "read_only": true,
    "rule_settings": {
      "add_headers": {
        "My-Next-Header": [
          "foo",
          "bar"
        ],
        "X-Custom-Header-Name": [
          "somecustomvalue"
        ]
      },
      "allow_child_bypass": false,
      "audit_ssh": {
        "command_logging": false
      },
      "biso_admin_controls": {
        "copy": "remote_only",
        "dcp": true,
        "dd": true,
        "dk": true,
        "download": "enabled",
        "dp": false,
        "du": true,
        "keyboard": "enabled",
        "paste": "enabled",
        "printing": "enabled",
        "upload": "enabled",
        "version": "v1",
        "wm_id": "475345dc-5299-4b6e-8f6a-3d3e4c8e9f1a"
      },
      "block_page": {
        "target_uri": "https://example.com",
        "include_context": true
      },
      "block_page_enabled": true,
      "block_reason": "This website is a security risk",
      "bypass_parent_rule": false,
      "check_session": {
        "duration": "300s",
        "enforce": true
      },
      "dns_resolvers": {
        "ipv4": [
          {
            "ip": "2.2.2.2",
            "port": 5053,
            "route_through_private_network": true,
            "vnet_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
          }
        ],
        "ipv6": [
          {
            "ip": "2001:DB8::",
            "port": 5053,
            "route_through_private_network": true,
            "vnet_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
          }
        ]
      },
      "egress": {
        "ipv4": "192.0.2.2",
        "ipv4_fallback": "192.0.2.3",
        "ipv6": "2001:DB8::/64"
      },
      "forensic_copy": {
        "enabled": true
      },
      "ignore_cname_category_matches": true,
      "insecure_disable_dnssec_validation": false,
      "ip_categories": true,
      "ip_indicator_feeds": true,
      "l4override": {
        "ip": "1.1.1.1",
        "port": 0
      },
      "notification_settings": {
        "enabled": true,
        "include_context": true,
        "msg": "msg",
        "support_url": "support_url"
      },
      "override_host": "example.com",
      "override_ips": [
        "1.1.1.1",
        "2.2.2.2"
      ],
      "payload_log": {
        "enabled": true
      },
      "quarantine": {
        "file_types": [
          "exe"
        ]
      },
      "redirect": {
        "target_uri": "https://example.com",
        "include_context": true,
        "preserve_path_and_query": true
      },
      "resolve_dns_internally": {
        "fallback": "none",
        "view_id": "view_id"
      },
      "resolve_dns_through_cloudflare": true,
      "untrusted_cert": {
        "action": "error"
      }
    },
    "schedule": {
      "fri": "08:00-12:30,13:30-17:00",
      "mon": "08:00-12:30,13:30-17:00",
      "sat": "08:00-12:30,13:30-17:00",
      "sun": "08:00-12:30,13:30-17:00",
      "thu": "08:00-12:30,13:30-17:00",
      "time_zone": "America/New York",
      "tue": "08:00-12:30,13:30-17:00",
      "wed": "08:00-12:30,13:30-17:00"
    },
    "sharable": true,
    "source_account": "source_account",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "version": 1,
    "warning_status": "warning_status"
  }
}
```

## Delete a Zero Trust Gateway rule

**delete** `/accounts/{account_id}/gateway/rules/{rule_id}`

Delete a Zero Trust Gateway rule.

### Path Parameters

- `account_id: string`

- `rule_id: string`

  Identify the API resource with a UUID.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules/$RULE_ID \
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
  "result": {}
}
```

## List Zero Trust Gateway rules inherited from the parent account

**get** `/accounts/{account_id}/gateway/rules/tenant`

List Zero Trust Gateway rules for the parent account of an account in the MSP configuration.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional array of GatewayRule`

  - `action: "on" or "off" or "allow" or 13 more`

    Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.

    - `"on"`

    - `"off"`

    - `"allow"`

    - `"block"`

    - `"scan"`

    - `"noscan"`

    - `"safesearch"`

    - `"ytrestricted"`

    - `"isolate"`

    - `"noisolate"`

    - `"override"`

    - `"l4_override"`

    - `"egress"`

    - `"resolve"`

    - `"quarantine"`

    - `"redirect"`

  - `enabled: boolean`

    Specify whether the rule is enabled.

  - `filters: array of GatewayFilter`

    Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.

    - `"http"`

    - `"dns"`

    - `"l4"`

    - `"egress"`

    - `"dns_resolver"`

  - `name: string`

    Specify the rule name.

  - `precedence: number`

    Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order of this value. Refer to [Order of enforcement](http://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/order-of-enforcement/#manage-precedence-with-terraform) to manage precedence via Terraform.

  - `traffic: string`

    Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `id: optional string`

    Identify the API resource with a UUID.

  - `created_at: optional string`

  - `deleted_at: optional string`

    Indicate the date of deletion, if any.

  - `description: optional string`

    Specify the rule description.

  - `device_posture: optional string`

    Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `expiration: optional object { expires_at, duration, expired }`

    Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any. This  does not apply to HTTP or network policies. Settable only for `dns` rules.

    - `expires_at: string`

      Show the timestamp when the policy expires and stops applying.  The value must follow RFC 3339 and include a UTC offset.  The system accepts non-zero offsets but converts them to the equivalent UTC+00:00  value and returns timestamps with a trailing Z. Expiration policies ignore client  timezones and expire globally at the specified expires_at time.

    - `duration: optional number`

      Defines the default duration a policy active in minutes. Must set in order to use the `reset_expiration` endpoint on this rule.

    - `expired: optional boolean`

      Indicates whether the policy is expired.

  - `identity: optional string`

    Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `read_only: optional boolean`

    Indicate that this rule is shared via the Orgs API and read only.

  - `rule_settings: optional RuleSetting`

    Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, confirm the setting supports your rule type and check whether the API modifies the value. Use API-returned values in your configuration to prevent drift.

    - `add_headers: optional map[array of string]`

      Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Settable only for `http` rules with the action set to `allow`.

    - `allow_child_bypass: optional boolean`

      Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.

    - `audit_ssh: optional object { command_logging }`

      Define the settings for the Audit SSH action. Settable only for `l4` rules with `audit_ssh` action.

      - `command_logging: optional boolean`

        Enable SSH command logging.

    - `biso_admin_controls: optional object { copy, dcp, dd, 10 more }`

      Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.

      - `copy: optional "enabled" or "disabled" or "remote_only"`

        Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this field is absent, copying remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `dcp: optional boolean`

        Set to false to enable copy-pasting. Only applies when `version == "v1"`.

      - `dd: optional boolean`

        Set to false to enable downloading. Only applies when `version == "v1"`.

      - `dk: optional boolean`

        Set to false to enable keyboard usage. Only applies when `version == "v1"`.

      - `download: optional "enabled" or "disabled" or "remote_only"`

        Configure download behavior. When set to remote_only, users can view downloads but cannot save them. If this field is absent, downloading remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `dp: optional boolean`

        Set to false to enable printing. Only applies when `version == "v1"`.

      - `du: optional boolean`

        Set to false to enable uploading. Only applies when `version == "v1"`.

      - `keyboard: optional "enabled" or "disabled"`

        Configure keyboard usage behavior. If this field is absent, keyboard usage remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `paste: optional "enabled" or "disabled" or "remote_only"`

        Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is absent, pasting remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `printing: optional "enabled" or "disabled"`

        Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `upload: optional "enabled" or "disabled"`

        Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `version: optional "v1" or "v2"`

        Indicate which version of the browser isolation controls should apply.

        - `"v1"`

        - `"v2"`

      - `wm_id: optional string`

        Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.

    - `block_page: optional object { target_uri, include_context }`

      Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `block`.

      - `target_uri: string`

        Specify the URI to which the user is redirected.

      - `include_context: optional boolean`

        Specify whether to pass the context information as query parameters.

    - `block_page_enabled: optional boolean`

      Enable the custom block page. Settable only for `dns` rules with action `block`.

    - `block_reason: optional string`

      Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules when the action set to `block`.

    - `bypass_parent_rule: optional boolean`

      Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.

    - `check_session: optional object { duration, enforce }`

      Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.

      - `duration: optional string`

        Sets the required session freshness threshold. The API returns a normalized version of this value.

      - `enforce: optional boolean`

        Enable session enforcement.

    - `dns_resolvers: optional object { ipv4, ipv6 }`

      Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_internally' settings. DNS queries get routed to the address closest to their origin. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

      - `ipv4: optional array of DNSResolverSettingsV4`

        - `ip: string`

          Specify the IPv4 address of the upstream resolver.

        - `port: optional number`

          Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

        - `route_through_private_network: optional boolean`

          Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

        - `vnet_id: optional string`

          Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

      - `ipv6: optional array of DNSResolverSettingsV6`

        - `ip: string`

          Specify the IPv6 address of the upstream resolver.

        - `port: optional number`

          Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

        - `route_through_private_network: optional boolean`

          Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

        - `vnet_id: optional string`

          Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

    - `egress: optional object { ipv4, ipv4_fallback, ipv6 }`

      Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate local egress via WARP IPs. Settable only for `egress` rules.

      - `ipv4: optional string`

        Specify the IPv4 address to use for egress.

      - `ipv4_fallback: optional string`

        Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.

      - `ipv6: optional string`

        Specify the IPv6 range to use for egress.

    - `forensic_copy: optional object { enabled }`

      Configure whether a copy of the HTTP request will be sent to storage when the rule matches.

      - `enabled: optional boolean`

        Enable sending the copy to storage.

    - `ignore_cname_category_matches: optional boolean`

      Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in the response. Settable only for `dns` and `dns_resolver` rules.

    - `insecure_disable_dnssec_validation: optional boolean`

      Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.

    - `ip_categories: optional boolean`

      Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for `dns` and `dns_resolver` rules.

    - `ip_indicator_feeds: optional boolean`

      Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for `dns` and `dns_resolver` rules.

    - `l4override: optional object { ip, port }`

      Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.

      - `ip: optional string`

        Defines the IPv4 or IPv6 address.

      - `port: optional number`

        Defines a port number to use for TCP/UDP overrides.

    - `notification_settings: optional object { enabled, include_context, msg, support_url }`

      Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `block`.

      - `enabled: optional boolean`

        Enable notification.

      - `include_context: optional boolean`

        Indicates whether to pass the context information as query parameters.

      - `msg: optional string`

        Customize the message shown in the notification.

      - `support_url: optional string`

        Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.

    - `override_host: optional string`

      Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.

    - `override_ips: optional array of string`

      Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.

    - `payload_log: optional object { enabled }`

      Configure DLP payload logging. Settable only for `http` rules.

      - `enabled: optional boolean`

        Enable DLP payload logging for this rule.

    - `quarantine: optional object { file_types }`

      Configure settings that apply to quarantine rules. Settable only for `http` rules.

      - `file_types: optional array of "exe" or "pdf" or "doc" or 10 more`

        Specify the types of files to sandbox.

        - `"exe"`

        - `"pdf"`

        - `"doc"`

        - `"docm"`

        - `"docx"`

        - `"rtf"`

        - `"ppt"`

        - `"pptx"`

        - `"xls"`

        - `"xlsm"`

        - `"xlsx"`

        - `"zip"`

        - `"rar"`

    - `redirect: optional object { target_uri, include_context, preserve_path_and_query }`

      Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.

      - `target_uri: string`

        Specify the URI to which the user is redirected.

      - `include_context: optional boolean`

        Specify whether to pass the context information as query parameters.

      - `preserve_path_and_query: optional boolean`

        Specify whether to append the path and query parameters from the original request to target_uri.

    - `resolve_dns_internally: optional object { fallback, view_id }`

      Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is specified or 'resolve_dns_through_cloudflare' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

      - `fallback: optional "none" or "public_dns"`

        Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CNAME records for 'A' or 'AAAA' queries.

        - `"none"`

        - `"public_dns"`

      - `view_id: optional string`

        Specify the internal DNS view identifier to pass to the internal DNS service.

    - `resolve_dns_through_cloudflare: optional boolean`

      Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'resolve_dns_internally' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

    - `untrusted_cert: optional object { action }`

      Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `allow`.

      - `action: optional "pass_through" or "block" or "error"`

        Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.

        - `"pass_through"`

        - `"block"`

        - `"error"`

  - `schedule: optional Schedule`

    Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.

    - `fri: optional string`

      Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Fridays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `mon: optional string`

      Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits). If this parameter omitted, the rule is deactivated on Mondays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `sat: optional string`

      Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Saturdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `sun: optional string`

      Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Sundays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `thu: optional string`

      Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Thursdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `time_zone: optional string`

      Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) is provided, Gateway always uses the current time for that time zone. When this parameter is omitted, Gateway uses the time zone determined from the user's IP address. Colo time zone is used when the user's IP address does not resolve to a location.

    - `tue: optional string`

      Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Tuesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `wed: optional string`

      Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Wednesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `sharable: optional boolean`

    Indicate that this rule is sharable via the Orgs API.

  - `source_account: optional string`

    Provide the account tag of the account that created the rule.

  - `updated_at: optional string`

  - `version: optional number`

    Indicate the version number of the rule(read-only).

  - `warning_status: optional string`

    Indicate a warning for a misconfigured rule, if any.

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Indicate the total number of results for the requested service.

  - `page: optional number`

    Indicate the current page within a paginated list of results.

  - `per_page: optional number`

    Indicate the number of results per page.

  - `total_count: optional number`

    Indicate the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules/tenant \
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
      "action": "allow",
      "enabled": true,
      "filters": [
        "http"
      ],
      "name": "block bad websites",
      "precedence": 0,
      "traffic": "http.request.uri matches \".*a/partial/uri.*\" and http.request.host in $01302951-49f9-47c9-a400-0297e60b6a10",
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "deleted_at": "2019-12-27T18:11:19.117Z",
      "description": "Block bad websites based on their host name.",
      "device_posture": "any(device_posture.checks.passed[*] in {\"1308749e-fcfb-4ebc-b051-fe022b632644\"})",
      "expiration": {
        "expires_at": "2014-01-01T05:20:20Z",
        "duration": 10,
        "expired": false
      },
      "identity": "any(identity.groups.name[*] in {\"finance\"})",
      "read_only": true,
      "rule_settings": {
        "add_headers": {
          "My-Next-Header": [
            "foo",
            "bar"
          ],
          "X-Custom-Header-Name": [
            "somecustomvalue"
          ]
        },
        "allow_child_bypass": false,
        "audit_ssh": {
          "command_logging": false
        },
        "biso_admin_controls": {
          "copy": "remote_only",
          "dcp": true,
          "dd": true,
          "dk": true,
          "download": "enabled",
          "dp": false,
          "du": true,
          "keyboard": "enabled",
          "paste": "enabled",
          "printing": "enabled",
          "upload": "enabled",
          "version": "v1",
          "wm_id": "475345dc-5299-4b6e-8f6a-3d3e4c8e9f1a"
        },
        "block_page": {
          "target_uri": "https://example.com",
          "include_context": true
        },
        "block_page_enabled": true,
        "block_reason": "This website is a security risk",
        "bypass_parent_rule": false,
        "check_session": {
          "duration": "300s",
          "enforce": true
        },
        "dns_resolvers": {
          "ipv4": [
            {
              "ip": "2.2.2.2",
              "port": 5053,
              "route_through_private_network": true,
              "vnet_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
            }
          ],
          "ipv6": [
            {
              "ip": "2001:DB8::",
              "port": 5053,
              "route_through_private_network": true,
              "vnet_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
            }
          ]
        },
        "egress": {
          "ipv4": "192.0.2.2",
          "ipv4_fallback": "192.0.2.3",
          "ipv6": "2001:DB8::/64"
        },
        "forensic_copy": {
          "enabled": true
        },
        "ignore_cname_category_matches": true,
        "insecure_disable_dnssec_validation": false,
        "ip_categories": true,
        "ip_indicator_feeds": true,
        "l4override": {
          "ip": "1.1.1.1",
          "port": 0
        },
        "notification_settings": {
          "enabled": true,
          "include_context": true,
          "msg": "msg",
          "support_url": "support_url"
        },
        "override_host": "example.com",
        "override_ips": [
          "1.1.1.1",
          "2.2.2.2"
        ],
        "payload_log": {
          "enabled": true
        },
        "quarantine": {
          "file_types": [
            "exe"
          ]
        },
        "redirect": {
          "target_uri": "https://example.com",
          "include_context": true,
          "preserve_path_and_query": true
        },
        "resolve_dns_internally": {
          "fallback": "none",
          "view_id": "view_id"
        },
        "resolve_dns_through_cloudflare": true,
        "untrusted_cert": {
          "action": "error"
        }
      },
      "schedule": {
        "fri": "08:00-12:30,13:30-17:00",
        "mon": "08:00-12:30,13:30-17:00",
        "sat": "08:00-12:30,13:30-17:00",
        "sun": "08:00-12:30,13:30-17:00",
        "thu": "08:00-12:30,13:30-17:00",
        "time_zone": "America/New York",
        "tue": "08:00-12:30,13:30-17:00",
        "wed": "08:00-12:30,13:30-17:00"
      },
      "sharable": true,
      "source_account": "source_account",
      "updated_at": "2014-01-01T05:20:00.12345Z",
      "version": 1,
      "warning_status": "warning_status"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Reset the expiration of a Zero Trust Gateway Rule

**post** `/accounts/{account_id}/gateway/rules/{rule_id}/reset_expiration`

Resets the expiration of a Zero Trust Gateway Rule if its duration elapsed and it has a default duration. The Zero Trust Gateway Rule must have values  for both `expiration.expires_at` and `expiration.duration`.

### Path Parameters

- `account_id: string`

- `rule_id: string`

  Identify the API resource with a UUID.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional GatewayRule`

  - `action: "on" or "off" or "allow" or 13 more`

    Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.

    - `"on"`

    - `"off"`

    - `"allow"`

    - `"block"`

    - `"scan"`

    - `"noscan"`

    - `"safesearch"`

    - `"ytrestricted"`

    - `"isolate"`

    - `"noisolate"`

    - `"override"`

    - `"l4_override"`

    - `"egress"`

    - `"resolve"`

    - `"quarantine"`

    - `"redirect"`

  - `enabled: boolean`

    Specify whether the rule is enabled.

  - `filters: array of GatewayFilter`

    Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.

    - `"http"`

    - `"dns"`

    - `"l4"`

    - `"egress"`

    - `"dns_resolver"`

  - `name: string`

    Specify the rule name.

  - `precedence: number`

    Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order of this value. Refer to [Order of enforcement](http://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/order-of-enforcement/#manage-precedence-with-terraform) to manage precedence via Terraform.

  - `traffic: string`

    Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `id: optional string`

    Identify the API resource with a UUID.

  - `created_at: optional string`

  - `deleted_at: optional string`

    Indicate the date of deletion, if any.

  - `description: optional string`

    Specify the rule description.

  - `device_posture: optional string`

    Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `expiration: optional object { expires_at, duration, expired }`

    Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any. This  does not apply to HTTP or network policies. Settable only for `dns` rules.

    - `expires_at: string`

      Show the timestamp when the policy expires and stops applying.  The value must follow RFC 3339 and include a UTC offset.  The system accepts non-zero offsets but converts them to the equivalent UTC+00:00  value and returns timestamps with a trailing Z. Expiration policies ignore client  timezones and expire globally at the specified expires_at time.

    - `duration: optional number`

      Defines the default duration a policy active in minutes. Must set in order to use the `reset_expiration` endpoint on this rule.

    - `expired: optional boolean`

      Indicates whether the policy is expired.

  - `identity: optional string`

    Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `read_only: optional boolean`

    Indicate that this rule is shared via the Orgs API and read only.

  - `rule_settings: optional RuleSetting`

    Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, confirm the setting supports your rule type and check whether the API modifies the value. Use API-returned values in your configuration to prevent drift.

    - `add_headers: optional map[array of string]`

      Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Settable only for `http` rules with the action set to `allow`.

    - `allow_child_bypass: optional boolean`

      Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.

    - `audit_ssh: optional object { command_logging }`

      Define the settings for the Audit SSH action. Settable only for `l4` rules with `audit_ssh` action.

      - `command_logging: optional boolean`

        Enable SSH command logging.

    - `biso_admin_controls: optional object { copy, dcp, dd, 10 more }`

      Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.

      - `copy: optional "enabled" or "disabled" or "remote_only"`

        Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this field is absent, copying remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `dcp: optional boolean`

        Set to false to enable copy-pasting. Only applies when `version == "v1"`.

      - `dd: optional boolean`

        Set to false to enable downloading. Only applies when `version == "v1"`.

      - `dk: optional boolean`

        Set to false to enable keyboard usage. Only applies when `version == "v1"`.

      - `download: optional "enabled" or "disabled" or "remote_only"`

        Configure download behavior. When set to remote_only, users can view downloads but cannot save them. If this field is absent, downloading remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `dp: optional boolean`

        Set to false to enable printing. Only applies when `version == "v1"`.

      - `du: optional boolean`

        Set to false to enable uploading. Only applies when `version == "v1"`.

      - `keyboard: optional "enabled" or "disabled"`

        Configure keyboard usage behavior. If this field is absent, keyboard usage remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `paste: optional "enabled" or "disabled" or "remote_only"`

        Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is absent, pasting remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `printing: optional "enabled" or "disabled"`

        Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `upload: optional "enabled" or "disabled"`

        Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `version: optional "v1" or "v2"`

        Indicate which version of the browser isolation controls should apply.

        - `"v1"`

        - `"v2"`

      - `wm_id: optional string`

        Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.

    - `block_page: optional object { target_uri, include_context }`

      Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `block`.

      - `target_uri: string`

        Specify the URI to which the user is redirected.

      - `include_context: optional boolean`

        Specify whether to pass the context information as query parameters.

    - `block_page_enabled: optional boolean`

      Enable the custom block page. Settable only for `dns` rules with action `block`.

    - `block_reason: optional string`

      Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules when the action set to `block`.

    - `bypass_parent_rule: optional boolean`

      Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.

    - `check_session: optional object { duration, enforce }`

      Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.

      - `duration: optional string`

        Sets the required session freshness threshold. The API returns a normalized version of this value.

      - `enforce: optional boolean`

        Enable session enforcement.

    - `dns_resolvers: optional object { ipv4, ipv6 }`

      Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_internally' settings. DNS queries get routed to the address closest to their origin. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

      - `ipv4: optional array of DNSResolverSettingsV4`

        - `ip: string`

          Specify the IPv4 address of the upstream resolver.

        - `port: optional number`

          Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

        - `route_through_private_network: optional boolean`

          Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

        - `vnet_id: optional string`

          Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

      - `ipv6: optional array of DNSResolverSettingsV6`

        - `ip: string`

          Specify the IPv6 address of the upstream resolver.

        - `port: optional number`

          Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

        - `route_through_private_network: optional boolean`

          Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

        - `vnet_id: optional string`

          Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

    - `egress: optional object { ipv4, ipv4_fallback, ipv6 }`

      Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate local egress via WARP IPs. Settable only for `egress` rules.

      - `ipv4: optional string`

        Specify the IPv4 address to use for egress.

      - `ipv4_fallback: optional string`

        Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.

      - `ipv6: optional string`

        Specify the IPv6 range to use for egress.

    - `forensic_copy: optional object { enabled }`

      Configure whether a copy of the HTTP request will be sent to storage when the rule matches.

      - `enabled: optional boolean`

        Enable sending the copy to storage.

    - `ignore_cname_category_matches: optional boolean`

      Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in the response. Settable only for `dns` and `dns_resolver` rules.

    - `insecure_disable_dnssec_validation: optional boolean`

      Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.

    - `ip_categories: optional boolean`

      Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for `dns` and `dns_resolver` rules.

    - `ip_indicator_feeds: optional boolean`

      Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for `dns` and `dns_resolver` rules.

    - `l4override: optional object { ip, port }`

      Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.

      - `ip: optional string`

        Defines the IPv4 or IPv6 address.

      - `port: optional number`

        Defines a port number to use for TCP/UDP overrides.

    - `notification_settings: optional object { enabled, include_context, msg, support_url }`

      Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `block`.

      - `enabled: optional boolean`

        Enable notification.

      - `include_context: optional boolean`

        Indicates whether to pass the context information as query parameters.

      - `msg: optional string`

        Customize the message shown in the notification.

      - `support_url: optional string`

        Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.

    - `override_host: optional string`

      Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.

    - `override_ips: optional array of string`

      Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.

    - `payload_log: optional object { enabled }`

      Configure DLP payload logging. Settable only for `http` rules.

      - `enabled: optional boolean`

        Enable DLP payload logging for this rule.

    - `quarantine: optional object { file_types }`

      Configure settings that apply to quarantine rules. Settable only for `http` rules.

      - `file_types: optional array of "exe" or "pdf" or "doc" or 10 more`

        Specify the types of files to sandbox.

        - `"exe"`

        - `"pdf"`

        - `"doc"`

        - `"docm"`

        - `"docx"`

        - `"rtf"`

        - `"ppt"`

        - `"pptx"`

        - `"xls"`

        - `"xlsm"`

        - `"xlsx"`

        - `"zip"`

        - `"rar"`

    - `redirect: optional object { target_uri, include_context, preserve_path_and_query }`

      Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.

      - `target_uri: string`

        Specify the URI to which the user is redirected.

      - `include_context: optional boolean`

        Specify whether to pass the context information as query parameters.

      - `preserve_path_and_query: optional boolean`

        Specify whether to append the path and query parameters from the original request to target_uri.

    - `resolve_dns_internally: optional object { fallback, view_id }`

      Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is specified or 'resolve_dns_through_cloudflare' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

      - `fallback: optional "none" or "public_dns"`

        Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CNAME records for 'A' or 'AAAA' queries.

        - `"none"`

        - `"public_dns"`

      - `view_id: optional string`

        Specify the internal DNS view identifier to pass to the internal DNS service.

    - `resolve_dns_through_cloudflare: optional boolean`

      Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'resolve_dns_internally' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

    - `untrusted_cert: optional object { action }`

      Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `allow`.

      - `action: optional "pass_through" or "block" or "error"`

        Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.

        - `"pass_through"`

        - `"block"`

        - `"error"`

  - `schedule: optional Schedule`

    Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.

    - `fri: optional string`

      Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Fridays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `mon: optional string`

      Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits). If this parameter omitted, the rule is deactivated on Mondays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `sat: optional string`

      Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Saturdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `sun: optional string`

      Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Sundays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `thu: optional string`

      Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Thursdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `time_zone: optional string`

      Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) is provided, Gateway always uses the current time for that time zone. When this parameter is omitted, Gateway uses the time zone determined from the user's IP address. Colo time zone is used when the user's IP address does not resolve to a location.

    - `tue: optional string`

      Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Tuesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `wed: optional string`

      Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Wednesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `sharable: optional boolean`

    Indicate that this rule is sharable via the Orgs API.

  - `source_account: optional string`

    Provide the account tag of the account that created the rule.

  - `updated_at: optional string`

  - `version: optional number`

    Indicate the version number of the rule(read-only).

  - `warning_status: optional string`

    Indicate a warning for a misconfigured rule, if any.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules/$RULE_ID/reset_expiration \
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
    "action": "allow",
    "enabled": true,
    "filters": [
      "http"
    ],
    "name": "block bad websites",
    "precedence": 0,
    "traffic": "http.request.uri matches \".*a/partial/uri.*\" and http.request.host in $01302951-49f9-47c9-a400-0297e60b6a10",
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "deleted_at": "2019-12-27T18:11:19.117Z",
    "description": "Block bad websites based on their host name.",
    "device_posture": "any(device_posture.checks.passed[*] in {\"1308749e-fcfb-4ebc-b051-fe022b632644\"})",
    "expiration": {
      "expires_at": "2014-01-01T05:20:20Z",
      "duration": 10,
      "expired": false
    },
    "identity": "any(identity.groups.name[*] in {\"finance\"})",
    "read_only": true,
    "rule_settings": {
      "add_headers": {
        "My-Next-Header": [
          "foo",
          "bar"
        ],
        "X-Custom-Header-Name": [
          "somecustomvalue"
        ]
      },
      "allow_child_bypass": false,
      "audit_ssh": {
        "command_logging": false
      },
      "biso_admin_controls": {
        "copy": "remote_only",
        "dcp": true,
        "dd": true,
        "dk": true,
        "download": "enabled",
        "dp": false,
        "du": true,
        "keyboard": "enabled",
        "paste": "enabled",
        "printing": "enabled",
        "upload": "enabled",
        "version": "v1",
        "wm_id": "475345dc-5299-4b6e-8f6a-3d3e4c8e9f1a"
      },
      "block_page": {
        "target_uri": "https://example.com",
        "include_context": true
      },
      "block_page_enabled": true,
      "block_reason": "This website is a security risk",
      "bypass_parent_rule": false,
      "check_session": {
        "duration": "300s",
        "enforce": true
      },
      "dns_resolvers": {
        "ipv4": [
          {
            "ip": "2.2.2.2",
            "port": 5053,
            "route_through_private_network": true,
            "vnet_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
          }
        ],
        "ipv6": [
          {
            "ip": "2001:DB8::",
            "port": 5053,
            "route_through_private_network": true,
            "vnet_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
          }
        ]
      },
      "egress": {
        "ipv4": "192.0.2.2",
        "ipv4_fallback": "192.0.2.3",
        "ipv6": "2001:DB8::/64"
      },
      "forensic_copy": {
        "enabled": true
      },
      "ignore_cname_category_matches": true,
      "insecure_disable_dnssec_validation": false,
      "ip_categories": true,
      "ip_indicator_feeds": true,
      "l4override": {
        "ip": "1.1.1.1",
        "port": 0
      },
      "notification_settings": {
        "enabled": true,
        "include_context": true,
        "msg": "msg",
        "support_url": "support_url"
      },
      "override_host": "example.com",
      "override_ips": [
        "1.1.1.1",
        "2.2.2.2"
      ],
      "payload_log": {
        "enabled": true
      },
      "quarantine": {
        "file_types": [
          "exe"
        ]
      },
      "redirect": {
        "target_uri": "https://example.com",
        "include_context": true,
        "preserve_path_and_query": true
      },
      "resolve_dns_internally": {
        "fallback": "none",
        "view_id": "view_id"
      },
      "resolve_dns_through_cloudflare": true,
      "untrusted_cert": {
        "action": "error"
      }
    },
    "schedule": {
      "fri": "08:00-12:30,13:30-17:00",
      "mon": "08:00-12:30,13:30-17:00",
      "sat": "08:00-12:30,13:30-17:00",
      "sun": "08:00-12:30,13:30-17:00",
      "thu": "08:00-12:30,13:30-17:00",
      "time_zone": "America/New York",
      "tue": "08:00-12:30,13:30-17:00",
      "wed": "08:00-12:30,13:30-17:00"
    },
    "sharable": true,
    "source_account": "source_account",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "version": 1,
    "warning_status": "warning_status"
  }
}
```

## Domain Types

### DNS Resolver Settings V4

- `DNSResolverSettingsV4 object { ip, port, route_through_private_network, vnet_id }`

  - `ip: string`

    Specify the IPv4 address of the upstream resolver.

  - `port: optional number`

    Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

  - `route_through_private_network: optional boolean`

    Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

  - `vnet_id: optional string`

    Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

### DNS Resolver Settings V6

- `DNSResolverSettingsV6 object { ip, port, route_through_private_network, vnet_id }`

  - `ip: string`

    Specify the IPv6 address of the upstream resolver.

  - `port: optional number`

    Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

  - `route_through_private_network: optional boolean`

    Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

  - `vnet_id: optional string`

    Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

### Gateway Filter

- `GatewayFilter = "http" or "dns" or "l4" or 2 more`

  Specify the protocol or layer to use.

  - `"http"`

  - `"dns"`

  - `"l4"`

  - `"egress"`

  - `"dns_resolver"`

### Gateway Rule

- `GatewayRule object { action, enabled, filters, 18 more }`

  - `action: "on" or "off" or "allow" or 13 more`

    Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.

    - `"on"`

    - `"off"`

    - `"allow"`

    - `"block"`

    - `"scan"`

    - `"noscan"`

    - `"safesearch"`

    - `"ytrestricted"`

    - `"isolate"`

    - `"noisolate"`

    - `"override"`

    - `"l4_override"`

    - `"egress"`

    - `"resolve"`

    - `"quarantine"`

    - `"redirect"`

  - `enabled: boolean`

    Specify whether the rule is enabled.

  - `filters: array of GatewayFilter`

    Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.

    - `"http"`

    - `"dns"`

    - `"l4"`

    - `"egress"`

    - `"dns_resolver"`

  - `name: string`

    Specify the rule name.

  - `precedence: number`

    Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order of this value. Refer to [Order of enforcement](http://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/order-of-enforcement/#manage-precedence-with-terraform) to manage precedence via Terraform.

  - `traffic: string`

    Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `id: optional string`

    Identify the API resource with a UUID.

  - `created_at: optional string`

  - `deleted_at: optional string`

    Indicate the date of deletion, if any.

  - `description: optional string`

    Specify the rule description.

  - `device_posture: optional string`

    Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `expiration: optional object { expires_at, duration, expired }`

    Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any. This  does not apply to HTTP or network policies. Settable only for `dns` rules.

    - `expires_at: string`

      Show the timestamp when the policy expires and stops applying.  The value must follow RFC 3339 and include a UTC offset.  The system accepts non-zero offsets but converts them to the equivalent UTC+00:00  value and returns timestamps with a trailing Z. Expiration policies ignore client  timezones and expire globally at the specified expires_at time.

    - `duration: optional number`

      Defines the default duration a policy active in minutes. Must set in order to use the `reset_expiration` endpoint on this rule.

    - `expired: optional boolean`

      Indicates whether the policy is expired.

  - `identity: optional string`

    Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `read_only: optional boolean`

    Indicate that this rule is shared via the Orgs API and read only.

  - `rule_settings: optional RuleSetting`

    Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, confirm the setting supports your rule type and check whether the API modifies the value. Use API-returned values in your configuration to prevent drift.

    - `add_headers: optional map[array of string]`

      Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Settable only for `http` rules with the action set to `allow`.

    - `allow_child_bypass: optional boolean`

      Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.

    - `audit_ssh: optional object { command_logging }`

      Define the settings for the Audit SSH action. Settable only for `l4` rules with `audit_ssh` action.

      - `command_logging: optional boolean`

        Enable SSH command logging.

    - `biso_admin_controls: optional object { copy, dcp, dd, 10 more }`

      Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.

      - `copy: optional "enabled" or "disabled" or "remote_only"`

        Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this field is absent, copying remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `dcp: optional boolean`

        Set to false to enable copy-pasting. Only applies when `version == "v1"`.

      - `dd: optional boolean`

        Set to false to enable downloading. Only applies when `version == "v1"`.

      - `dk: optional boolean`

        Set to false to enable keyboard usage. Only applies when `version == "v1"`.

      - `download: optional "enabled" or "disabled" or "remote_only"`

        Configure download behavior. When set to remote_only, users can view downloads but cannot save them. If this field is absent, downloading remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `dp: optional boolean`

        Set to false to enable printing. Only applies when `version == "v1"`.

      - `du: optional boolean`

        Set to false to enable uploading. Only applies when `version == "v1"`.

      - `keyboard: optional "enabled" or "disabled"`

        Configure keyboard usage behavior. If this field is absent, keyboard usage remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `paste: optional "enabled" or "disabled" or "remote_only"`

        Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is absent, pasting remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `printing: optional "enabled" or "disabled"`

        Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `upload: optional "enabled" or "disabled"`

        Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `version: optional "v1" or "v2"`

        Indicate which version of the browser isolation controls should apply.

        - `"v1"`

        - `"v2"`

      - `wm_id: optional string`

        Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.

    - `block_page: optional object { target_uri, include_context }`

      Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `block`.

      - `target_uri: string`

        Specify the URI to which the user is redirected.

      - `include_context: optional boolean`

        Specify whether to pass the context information as query parameters.

    - `block_page_enabled: optional boolean`

      Enable the custom block page. Settable only for `dns` rules with action `block`.

    - `block_reason: optional string`

      Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules when the action set to `block`.

    - `bypass_parent_rule: optional boolean`

      Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.

    - `check_session: optional object { duration, enforce }`

      Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.

      - `duration: optional string`

        Sets the required session freshness threshold. The API returns a normalized version of this value.

      - `enforce: optional boolean`

        Enable session enforcement.

    - `dns_resolvers: optional object { ipv4, ipv6 }`

      Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_internally' settings. DNS queries get routed to the address closest to their origin. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

      - `ipv4: optional array of DNSResolverSettingsV4`

        - `ip: string`

          Specify the IPv4 address of the upstream resolver.

        - `port: optional number`

          Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

        - `route_through_private_network: optional boolean`

          Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

        - `vnet_id: optional string`

          Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

      - `ipv6: optional array of DNSResolverSettingsV6`

        - `ip: string`

          Specify the IPv6 address of the upstream resolver.

        - `port: optional number`

          Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

        - `route_through_private_network: optional boolean`

          Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

        - `vnet_id: optional string`

          Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

    - `egress: optional object { ipv4, ipv4_fallback, ipv6 }`

      Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate local egress via WARP IPs. Settable only for `egress` rules.

      - `ipv4: optional string`

        Specify the IPv4 address to use for egress.

      - `ipv4_fallback: optional string`

        Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.

      - `ipv6: optional string`

        Specify the IPv6 range to use for egress.

    - `forensic_copy: optional object { enabled }`

      Configure whether a copy of the HTTP request will be sent to storage when the rule matches.

      - `enabled: optional boolean`

        Enable sending the copy to storage.

    - `ignore_cname_category_matches: optional boolean`

      Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in the response. Settable only for `dns` and `dns_resolver` rules.

    - `insecure_disable_dnssec_validation: optional boolean`

      Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.

    - `ip_categories: optional boolean`

      Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for `dns` and `dns_resolver` rules.

    - `ip_indicator_feeds: optional boolean`

      Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for `dns` and `dns_resolver` rules.

    - `l4override: optional object { ip, port }`

      Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.

      - `ip: optional string`

        Defines the IPv4 or IPv6 address.

      - `port: optional number`

        Defines a port number to use for TCP/UDP overrides.

    - `notification_settings: optional object { enabled, include_context, msg, support_url }`

      Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `block`.

      - `enabled: optional boolean`

        Enable notification.

      - `include_context: optional boolean`

        Indicates whether to pass the context information as query parameters.

      - `msg: optional string`

        Customize the message shown in the notification.

      - `support_url: optional string`

        Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.

    - `override_host: optional string`

      Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.

    - `override_ips: optional array of string`

      Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.

    - `payload_log: optional object { enabled }`

      Configure DLP payload logging. Settable only for `http` rules.

      - `enabled: optional boolean`

        Enable DLP payload logging for this rule.

    - `quarantine: optional object { file_types }`

      Configure settings that apply to quarantine rules. Settable only for `http` rules.

      - `file_types: optional array of "exe" or "pdf" or "doc" or 10 more`

        Specify the types of files to sandbox.

        - `"exe"`

        - `"pdf"`

        - `"doc"`

        - `"docm"`

        - `"docx"`

        - `"rtf"`

        - `"ppt"`

        - `"pptx"`

        - `"xls"`

        - `"xlsm"`

        - `"xlsx"`

        - `"zip"`

        - `"rar"`

    - `redirect: optional object { target_uri, include_context, preserve_path_and_query }`

      Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.

      - `target_uri: string`

        Specify the URI to which the user is redirected.

      - `include_context: optional boolean`

        Specify whether to pass the context information as query parameters.

      - `preserve_path_and_query: optional boolean`

        Specify whether to append the path and query parameters from the original request to target_uri.

    - `resolve_dns_internally: optional object { fallback, view_id }`

      Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is specified or 'resolve_dns_through_cloudflare' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

      - `fallback: optional "none" or "public_dns"`

        Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CNAME records for 'A' or 'AAAA' queries.

        - `"none"`

        - `"public_dns"`

      - `view_id: optional string`

        Specify the internal DNS view identifier to pass to the internal DNS service.

    - `resolve_dns_through_cloudflare: optional boolean`

      Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'resolve_dns_internally' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

    - `untrusted_cert: optional object { action }`

      Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `allow`.

      - `action: optional "pass_through" or "block" or "error"`

        Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.

        - `"pass_through"`

        - `"block"`

        - `"error"`

  - `schedule: optional Schedule`

    Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.

    - `fri: optional string`

      Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Fridays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `mon: optional string`

      Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits). If this parameter omitted, the rule is deactivated on Mondays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `sat: optional string`

      Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Saturdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `sun: optional string`

      Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Sundays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `thu: optional string`

      Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Thursdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `time_zone: optional string`

      Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) is provided, Gateway always uses the current time for that time zone. When this parameter is omitted, Gateway uses the time zone determined from the user's IP address. Colo time zone is used when the user's IP address does not resolve to a location.

    - `tue: optional string`

      Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Tuesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `wed: optional string`

      Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Wednesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `sharable: optional boolean`

    Indicate that this rule is sharable via the Orgs API.

  - `source_account: optional string`

    Provide the account tag of the account that created the rule.

  - `updated_at: optional string`

  - `version: optional number`

    Indicate the version number of the rule(read-only).

  - `warning_status: optional string`

    Indicate a warning for a misconfigured rule, if any.

### Rule Setting

- `RuleSetting object { add_headers, allow_child_bypass, audit_ssh, 23 more }`

  Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, confirm the setting supports your rule type and check whether the API modifies the value. Use API-returned values in your configuration to prevent drift.

  - `add_headers: optional map[array of string]`

    Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Settable only for `http` rules with the action set to `allow`.

  - `allow_child_bypass: optional boolean`

    Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.

  - `audit_ssh: optional object { command_logging }`

    Define the settings for the Audit SSH action. Settable only for `l4` rules with `audit_ssh` action.

    - `command_logging: optional boolean`

      Enable SSH command logging.

  - `biso_admin_controls: optional object { copy, dcp, dd, 10 more }`

    Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.

    - `copy: optional "enabled" or "disabled" or "remote_only"`

      Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this field is absent, copying remains enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

      - `"remote_only"`

    - `dcp: optional boolean`

      Set to false to enable copy-pasting. Only applies when `version == "v1"`.

    - `dd: optional boolean`

      Set to false to enable downloading. Only applies when `version == "v1"`.

    - `dk: optional boolean`

      Set to false to enable keyboard usage. Only applies when `version == "v1"`.

    - `download: optional "enabled" or "disabled" or "remote_only"`

      Configure download behavior. When set to remote_only, users can view downloads but cannot save them. If this field is absent, downloading remains enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

      - `"remote_only"`

    - `dp: optional boolean`

      Set to false to enable printing. Only applies when `version == "v1"`.

    - `du: optional boolean`

      Set to false to enable uploading. Only applies when `version == "v1"`.

    - `keyboard: optional "enabled" or "disabled"`

      Configure keyboard usage behavior. If this field is absent, keyboard usage remains enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

    - `paste: optional "enabled" or "disabled" or "remote_only"`

      Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is absent, pasting remains enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

      - `"remote_only"`

    - `printing: optional "enabled" or "disabled"`

      Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

    - `upload: optional "enabled" or "disabled"`

      Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

    - `version: optional "v1" or "v2"`

      Indicate which version of the browser isolation controls should apply.

      - `"v1"`

      - `"v2"`

    - `wm_id: optional string`

      Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.

  - `block_page: optional object { target_uri, include_context }`

    Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `block`.

    - `target_uri: string`

      Specify the URI to which the user is redirected.

    - `include_context: optional boolean`

      Specify whether to pass the context information as query parameters.

  - `block_page_enabled: optional boolean`

    Enable the custom block page. Settable only for `dns` rules with action `block`.

  - `block_reason: optional string`

    Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules when the action set to `block`.

  - `bypass_parent_rule: optional boolean`

    Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.

  - `check_session: optional object { duration, enforce }`

    Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.

    - `duration: optional string`

      Sets the required session freshness threshold. The API returns a normalized version of this value.

    - `enforce: optional boolean`

      Enable session enforcement.

  - `dns_resolvers: optional object { ipv4, ipv6 }`

    Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_internally' settings. DNS queries get routed to the address closest to their origin. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

    - `ipv4: optional array of DNSResolverSettingsV4`

      - `ip: string`

        Specify the IPv4 address of the upstream resolver.

      - `port: optional number`

        Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

      - `route_through_private_network: optional boolean`

        Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

      - `vnet_id: optional string`

        Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

    - `ipv6: optional array of DNSResolverSettingsV6`

      - `ip: string`

        Specify the IPv6 address of the upstream resolver.

      - `port: optional number`

        Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

      - `route_through_private_network: optional boolean`

        Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

      - `vnet_id: optional string`

        Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

  - `egress: optional object { ipv4, ipv4_fallback, ipv6 }`

    Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate local egress via WARP IPs. Settable only for `egress` rules.

    - `ipv4: optional string`

      Specify the IPv4 address to use for egress.

    - `ipv4_fallback: optional string`

      Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.

    - `ipv6: optional string`

      Specify the IPv6 range to use for egress.

  - `forensic_copy: optional object { enabled }`

    Configure whether a copy of the HTTP request will be sent to storage when the rule matches.

    - `enabled: optional boolean`

      Enable sending the copy to storage.

  - `ignore_cname_category_matches: optional boolean`

    Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in the response. Settable only for `dns` and `dns_resolver` rules.

  - `insecure_disable_dnssec_validation: optional boolean`

    Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.

  - `ip_categories: optional boolean`

    Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for `dns` and `dns_resolver` rules.

  - `ip_indicator_feeds: optional boolean`

    Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for `dns` and `dns_resolver` rules.

  - `l4override: optional object { ip, port }`

    Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.

    - `ip: optional string`

      Defines the IPv4 or IPv6 address.

    - `port: optional number`

      Defines a port number to use for TCP/UDP overrides.

  - `notification_settings: optional object { enabled, include_context, msg, support_url }`

    Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `block`.

    - `enabled: optional boolean`

      Enable notification.

    - `include_context: optional boolean`

      Indicates whether to pass the context information as query parameters.

    - `msg: optional string`

      Customize the message shown in the notification.

    - `support_url: optional string`

      Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.

  - `override_host: optional string`

    Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.

  - `override_ips: optional array of string`

    Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.

  - `payload_log: optional object { enabled }`

    Configure DLP payload logging. Settable only for `http` rules.

    - `enabled: optional boolean`

      Enable DLP payload logging for this rule.

  - `quarantine: optional object { file_types }`

    Configure settings that apply to quarantine rules. Settable only for `http` rules.

    - `file_types: optional array of "exe" or "pdf" or "doc" or 10 more`

      Specify the types of files to sandbox.

      - `"exe"`

      - `"pdf"`

      - `"doc"`

      - `"docm"`

      - `"docx"`

      - `"rtf"`

      - `"ppt"`

      - `"pptx"`

      - `"xls"`

      - `"xlsm"`

      - `"xlsx"`

      - `"zip"`

      - `"rar"`

  - `redirect: optional object { target_uri, include_context, preserve_path_and_query }`

    Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.

    - `target_uri: string`

      Specify the URI to which the user is redirected.

    - `include_context: optional boolean`

      Specify whether to pass the context information as query parameters.

    - `preserve_path_and_query: optional boolean`

      Specify whether to append the path and query parameters from the original request to target_uri.

  - `resolve_dns_internally: optional object { fallback, view_id }`

    Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is specified or 'resolve_dns_through_cloudflare' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

    - `fallback: optional "none" or "public_dns"`

      Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CNAME records for 'A' or 'AAAA' queries.

      - `"none"`

      - `"public_dns"`

    - `view_id: optional string`

      Specify the internal DNS view identifier to pass to the internal DNS service.

  - `resolve_dns_through_cloudflare: optional boolean`

    Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'resolve_dns_internally' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

  - `untrusted_cert: optional object { action }`

    Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `allow`.

    - `action: optional "pass_through" or "block" or "error"`

      Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.

      - `"pass_through"`

      - `"block"`

      - `"error"`

### Schedule

- `Schedule object { fri, mon, sat, 5 more }`

  Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.

  - `fri: optional string`

    Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Fridays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `mon: optional string`

    Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits). If this parameter omitted, the rule is deactivated on Mondays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `sat: optional string`

    Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Saturdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `sun: optional string`

    Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Sundays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `thu: optional string`

    Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Thursdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `time_zone: optional string`

    Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) is provided, Gateway always uses the current time for that time zone. When this parameter is omitted, Gateway uses the time zone determined from the user's IP address. Colo time zone is used when the user's IP address does not resolve to a location.

  - `tue: optional string`

    Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Tuesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `wed: optional string`

    Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Wednesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

### Rule Delete Response

- `RuleDeleteResponse = unknown`

# Certificates

## List Zero Trust certificates

**get** `/accounts/{account_id}/gateway/certificates`

List all Zero Trust certificates for an account.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional array of object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Indicate the total number of results for the requested service.

  - `page: optional number`

    Indicate the current page within a paginated list of results.

  - `per_page: optional number`

    Indicate the number of results per page.

  - `total_count: optional number`

    Indicate the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/certificates \
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
      "binding_status": "pending_deployment",
      "certificate": "-----BEGIN CERTIFICATE-----\\nMIIDmDCCAoCgAwIBAgIUKTOAZNjcXVZRj4oQt0SHsl1c1vMwDQYJKoZIhvcNAQELBQAwUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjAgFw0yMjExMjIxNjU5NDdaGA8yMTIyMTAyOTE2NTk0N1owUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMRcORwgJFTdcG/2GKI+cFYiOBNDKjCZUXEOvXWY42BkH9wxiMT869CO+enA1w5pIrXow6kCM1sQspHHaVmJUlotEMJxyoLFfA/8Kt1EKFyobOjuZs2SwyVyJ2sStvQuUQEosULZCNGZEqoH5g6zhMPxaxm7ZLrrsDZ9maNGVqo7EWLWHrZ57Q/5MtTrbxQL+eXjUmJ9K3kS+3uEwMdqR6Z3BluU1ivanpPc1CN2GNhdO0/hSY4YkGEnuLsqJyDd3cIiB1MxuCBJ4ZaqOd2viV1WcP3oU3dxVPm4MWyfYIldMWB14FahScxLhWdRnM9YZ/i9IFcLypXsuz7DjrJPtPUCAwEAAaNmMGQwHQYDVR0OBBYEFP5JzLUawNF+c3AXsYTEWHh7z2czMB8GA1UdIwQYMBaAFP5JzLUawNF+c3AXsYTEWHh7z2czMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAGAQH/AgEBMA0GCSqGSIb3DQEBCwUAA4IBAQBc+Be7NDhpE09y7hLPZGRPl1cSKBw4RI0XIv6rlbSTFs5EebpTGjhx/whNxwEZhB9HZ7111Oa1YlT8xkI9DshB78mjAHCKBAJ76moK8tkG0aqdYpJ4ZcJTVBB7l98Rvgc7zfTii7WemTy72deBbSeiEtXavm4EF0mWjHhQ5Nxpnp00Bqn5g1x8CyTDypgmugnep+xG+iFzNmTdsz7WI9T/7kDMXqB7M/FPWBORyS98OJqNDswCLF8bIZYwUBEe+bRHFomoShMzaC3tvim7WCb16noDkSTMlfKO4pnvKhpcVdSgwcruATV7y+W+Lvmz2OT/Gui4JhqeoTewsxndhDDE\\n-----END CERTIFICATE-----\\n",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "expires_on": "2014-01-01T05:20:00.12345Z",
      "fingerprint": "E9:19:49:AA:DD:D8:1E:C1:20:2A:D8:22:BF:A5:F8:FC:1A:F7:10:9F:C7:5B:69:AB:0:31:91:8B:61:B4:BF:1C",
      "in_use": true,
      "issuer_org": "Example Inc.",
      "issuer_raw": "O=Example Inc.,L=California,ST=San Francisco,C=US",
      "type": "gateway_managed",
      "updated_at": "2014-01-01T05:20:00.12345Z",
      "uploaded_on": "2014-01-01T05:20:00.12345Z"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get Zero Trust certificate details

**get** `/accounts/{account_id}/gateway/certificates/{certificate_id}`

Get a single Zero Trust certificate.

### Path Parameters

- `account_id: string`

- `certificate_id: string`

  Identify the certificate with a UUID.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/certificates/$CERTIFICATE_ID \
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
    "binding_status": "pending_deployment",
    "certificate": "-----BEGIN CERTIFICATE-----\\nMIIDmDCCAoCgAwIBAgIUKTOAZNjcXVZRj4oQt0SHsl1c1vMwDQYJKoZIhvcNAQELBQAwUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjAgFw0yMjExMjIxNjU5NDdaGA8yMTIyMTAyOTE2NTk0N1owUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMRcORwgJFTdcG/2GKI+cFYiOBNDKjCZUXEOvXWY42BkH9wxiMT869CO+enA1w5pIrXow6kCM1sQspHHaVmJUlotEMJxyoLFfA/8Kt1EKFyobOjuZs2SwyVyJ2sStvQuUQEosULZCNGZEqoH5g6zhMPxaxm7ZLrrsDZ9maNGVqo7EWLWHrZ57Q/5MtTrbxQL+eXjUmJ9K3kS+3uEwMdqR6Z3BluU1ivanpPc1CN2GNhdO0/hSY4YkGEnuLsqJyDd3cIiB1MxuCBJ4ZaqOd2viV1WcP3oU3dxVPm4MWyfYIldMWB14FahScxLhWdRnM9YZ/i9IFcLypXsuz7DjrJPtPUCAwEAAaNmMGQwHQYDVR0OBBYEFP5JzLUawNF+c3AXsYTEWHh7z2czMB8GA1UdIwQYMBaAFP5JzLUawNF+c3AXsYTEWHh7z2czMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAGAQH/AgEBMA0GCSqGSIb3DQEBCwUAA4IBAQBc+Be7NDhpE09y7hLPZGRPl1cSKBw4RI0XIv6rlbSTFs5EebpTGjhx/whNxwEZhB9HZ7111Oa1YlT8xkI9DshB78mjAHCKBAJ76moK8tkG0aqdYpJ4ZcJTVBB7l98Rvgc7zfTii7WemTy72deBbSeiEtXavm4EF0mWjHhQ5Nxpnp00Bqn5g1x8CyTDypgmugnep+xG+iFzNmTdsz7WI9T/7kDMXqB7M/FPWBORyS98OJqNDswCLF8bIZYwUBEe+bRHFomoShMzaC3tvim7WCb16noDkSTMlfKO4pnvKhpcVdSgwcruATV7y+W+Lvmz2OT/Gui4JhqeoTewsxndhDDE\\n-----END CERTIFICATE-----\\n",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "expires_on": "2014-01-01T05:20:00.12345Z",
    "fingerprint": "E9:19:49:AA:DD:D8:1E:C1:20:2A:D8:22:BF:A5:F8:FC:1A:F7:10:9F:C7:5B:69:AB:0:31:91:8B:61:B4:BF:1C",
    "in_use": true,
    "issuer_org": "Example Inc.",
    "issuer_raw": "O=Example Inc.,L=California,ST=San Francisco,C=US",
    "type": "gateway_managed",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "uploaded_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Create Zero Trust certificate

**post** `/accounts/{account_id}/gateway/certificates`

Create a new Zero Trust certificate.

### Path Parameters

- `account_id: string`

### Body Parameters

- `validity_period_days: optional number`

  Sets the certificate validity period in days (range: 1-10,950 days / ~30 years). Defaults to 1,825 days (5 years). **Important**: This field is only settable during the certificate creation.  Certificates becomes immutable after creation - use the `/activate` and `/deactivate` endpoints to manage certificate lifecycle.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/certificates \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "binding_status": "pending_deployment",
    "certificate": "-----BEGIN CERTIFICATE-----\\nMIIDmDCCAoCgAwIBAgIUKTOAZNjcXVZRj4oQt0SHsl1c1vMwDQYJKoZIhvcNAQELBQAwUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjAgFw0yMjExMjIxNjU5NDdaGA8yMTIyMTAyOTE2NTk0N1owUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMRcORwgJFTdcG/2GKI+cFYiOBNDKjCZUXEOvXWY42BkH9wxiMT869CO+enA1w5pIrXow6kCM1sQspHHaVmJUlotEMJxyoLFfA/8Kt1EKFyobOjuZs2SwyVyJ2sStvQuUQEosULZCNGZEqoH5g6zhMPxaxm7ZLrrsDZ9maNGVqo7EWLWHrZ57Q/5MtTrbxQL+eXjUmJ9K3kS+3uEwMdqR6Z3BluU1ivanpPc1CN2GNhdO0/hSY4YkGEnuLsqJyDd3cIiB1MxuCBJ4ZaqOd2viV1WcP3oU3dxVPm4MWyfYIldMWB14FahScxLhWdRnM9YZ/i9IFcLypXsuz7DjrJPtPUCAwEAAaNmMGQwHQYDVR0OBBYEFP5JzLUawNF+c3AXsYTEWHh7z2czMB8GA1UdIwQYMBaAFP5JzLUawNF+c3AXsYTEWHh7z2czMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAGAQH/AgEBMA0GCSqGSIb3DQEBCwUAA4IBAQBc+Be7NDhpE09y7hLPZGRPl1cSKBw4RI0XIv6rlbSTFs5EebpTGjhx/whNxwEZhB9HZ7111Oa1YlT8xkI9DshB78mjAHCKBAJ76moK8tkG0aqdYpJ4ZcJTVBB7l98Rvgc7zfTii7WemTy72deBbSeiEtXavm4EF0mWjHhQ5Nxpnp00Bqn5g1x8CyTDypgmugnep+xG+iFzNmTdsz7WI9T/7kDMXqB7M/FPWBORyS98OJqNDswCLF8bIZYwUBEe+bRHFomoShMzaC3tvim7WCb16noDkSTMlfKO4pnvKhpcVdSgwcruATV7y+W+Lvmz2OT/Gui4JhqeoTewsxndhDDE\\n-----END CERTIFICATE-----\\n",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "expires_on": "2014-01-01T05:20:00.12345Z",
    "fingerprint": "E9:19:49:AA:DD:D8:1E:C1:20:2A:D8:22:BF:A5:F8:FC:1A:F7:10:9F:C7:5B:69:AB:0:31:91:8B:61:B4:BF:1C",
    "in_use": true,
    "issuer_org": "Example Inc.",
    "issuer_raw": "O=Example Inc.,L=California,ST=San Francisco,C=US",
    "type": "gateway_managed",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "uploaded_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Delete Zero Trust certificate

**delete** `/accounts/{account_id}/gateway/certificates/{certificate_id}`

Delete a gateway-managed Zero Trust certificate. You must deactivate the certificate from the edge (inactive) before deleting it.

### Path Parameters

- `account_id: string`

- `certificate_id: string`

  Identify the certificate with a UUID.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/certificates/$CERTIFICATE_ID \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "binding_status": "pending_deployment",
    "certificate": "-----BEGIN CERTIFICATE-----\\nMIIDmDCCAoCgAwIBAgIUKTOAZNjcXVZRj4oQt0SHsl1c1vMwDQYJKoZIhvcNAQELBQAwUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjAgFw0yMjExMjIxNjU5NDdaGA8yMTIyMTAyOTE2NTk0N1owUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMRcORwgJFTdcG/2GKI+cFYiOBNDKjCZUXEOvXWY42BkH9wxiMT869CO+enA1w5pIrXow6kCM1sQspHHaVmJUlotEMJxyoLFfA/8Kt1EKFyobOjuZs2SwyVyJ2sStvQuUQEosULZCNGZEqoH5g6zhMPxaxm7ZLrrsDZ9maNGVqo7EWLWHrZ57Q/5MtTrbxQL+eXjUmJ9K3kS+3uEwMdqR6Z3BluU1ivanpPc1CN2GNhdO0/hSY4YkGEnuLsqJyDd3cIiB1MxuCBJ4ZaqOd2viV1WcP3oU3dxVPm4MWyfYIldMWB14FahScxLhWdRnM9YZ/i9IFcLypXsuz7DjrJPtPUCAwEAAaNmMGQwHQYDVR0OBBYEFP5JzLUawNF+c3AXsYTEWHh7z2czMB8GA1UdIwQYMBaAFP5JzLUawNF+c3AXsYTEWHh7z2czMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAGAQH/AgEBMA0GCSqGSIb3DQEBCwUAA4IBAQBc+Be7NDhpE09y7hLPZGRPl1cSKBw4RI0XIv6rlbSTFs5EebpTGjhx/whNxwEZhB9HZ7111Oa1YlT8xkI9DshB78mjAHCKBAJ76moK8tkG0aqdYpJ4ZcJTVBB7l98Rvgc7zfTii7WemTy72deBbSeiEtXavm4EF0mWjHhQ5Nxpnp00Bqn5g1x8CyTDypgmugnep+xG+iFzNmTdsz7WI9T/7kDMXqB7M/FPWBORyS98OJqNDswCLF8bIZYwUBEe+bRHFomoShMzaC3tvim7WCb16noDkSTMlfKO4pnvKhpcVdSgwcruATV7y+W+Lvmz2OT/Gui4JhqeoTewsxndhDDE\\n-----END CERTIFICATE-----\\n",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "expires_on": "2014-01-01T05:20:00.12345Z",
    "fingerprint": "E9:19:49:AA:DD:D8:1E:C1:20:2A:D8:22:BF:A5:F8:FC:1A:F7:10:9F:C7:5B:69:AB:0:31:91:8B:61:B4:BF:1C",
    "in_use": true,
    "issuer_org": "Example Inc.",
    "issuer_raw": "O=Example Inc.,L=California,ST=San Francisco,C=US",
    "type": "gateway_managed",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "uploaded_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Activate a Zero Trust certificate

**post** `/accounts/{account_id}/gateway/certificates/{certificate_id}/activate`

Bind a single Zero Trust certificate to the edge.

### Path Parameters

- `account_id: string`

- `certificate_id: string`

  Identify the certificate with a UUID.

### Body Parameters

- `body: unknown`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/certificates/$CERTIFICATE_ID/activate \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "binding_status": "pending_deployment",
    "certificate": "-----BEGIN CERTIFICATE-----\\nMIIDmDCCAoCgAwIBAgIUKTOAZNjcXVZRj4oQt0SHsl1c1vMwDQYJKoZIhvcNAQELBQAwUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjAgFw0yMjExMjIxNjU5NDdaGA8yMTIyMTAyOTE2NTk0N1owUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMRcORwgJFTdcG/2GKI+cFYiOBNDKjCZUXEOvXWY42BkH9wxiMT869CO+enA1w5pIrXow6kCM1sQspHHaVmJUlotEMJxyoLFfA/8Kt1EKFyobOjuZs2SwyVyJ2sStvQuUQEosULZCNGZEqoH5g6zhMPxaxm7ZLrrsDZ9maNGVqo7EWLWHrZ57Q/5MtTrbxQL+eXjUmJ9K3kS+3uEwMdqR6Z3BluU1ivanpPc1CN2GNhdO0/hSY4YkGEnuLsqJyDd3cIiB1MxuCBJ4ZaqOd2viV1WcP3oU3dxVPm4MWyfYIldMWB14FahScxLhWdRnM9YZ/i9IFcLypXsuz7DjrJPtPUCAwEAAaNmMGQwHQYDVR0OBBYEFP5JzLUawNF+c3AXsYTEWHh7z2czMB8GA1UdIwQYMBaAFP5JzLUawNF+c3AXsYTEWHh7z2czMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAGAQH/AgEBMA0GCSqGSIb3DQEBCwUAA4IBAQBc+Be7NDhpE09y7hLPZGRPl1cSKBw4RI0XIv6rlbSTFs5EebpTGjhx/whNxwEZhB9HZ7111Oa1YlT8xkI9DshB78mjAHCKBAJ76moK8tkG0aqdYpJ4ZcJTVBB7l98Rvgc7zfTii7WemTy72deBbSeiEtXavm4EF0mWjHhQ5Nxpnp00Bqn5g1x8CyTDypgmugnep+xG+iFzNmTdsz7WI9T/7kDMXqB7M/FPWBORyS98OJqNDswCLF8bIZYwUBEe+bRHFomoShMzaC3tvim7WCb16noDkSTMlfKO4pnvKhpcVdSgwcruATV7y+W+Lvmz2OT/Gui4JhqeoTewsxndhDDE\\n-----END CERTIFICATE-----\\n",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "expires_on": "2014-01-01T05:20:00.12345Z",
    "fingerprint": "E9:19:49:AA:DD:D8:1E:C1:20:2A:D8:22:BF:A5:F8:FC:1A:F7:10:9F:C7:5B:69:AB:0:31:91:8B:61:B4:BF:1C",
    "in_use": true,
    "issuer_org": "Example Inc.",
    "issuer_raw": "O=Example Inc.,L=California,ST=San Francisco,C=US",
    "type": "gateway_managed",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "uploaded_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Deactivate a Zero Trust certificate

**post** `/accounts/{account_id}/gateway/certificates/{certificate_id}/deactivate`

Unbind a single Zero Trust certificate from the edge.

### Path Parameters

- `account_id: string`

- `certificate_id: string`

  Identify the certificate with a UUID.

### Body Parameters

- `body: unknown`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/certificates/$CERTIFICATE_ID/deactivate \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "binding_status": "pending_deployment",
    "certificate": "-----BEGIN CERTIFICATE-----\\nMIIDmDCCAoCgAwIBAgIUKTOAZNjcXVZRj4oQt0SHsl1c1vMwDQYJKoZIhvcNAQELBQAwUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjAgFw0yMjExMjIxNjU5NDdaGA8yMTIyMTAyOTE2NTk0N1owUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMRcORwgJFTdcG/2GKI+cFYiOBNDKjCZUXEOvXWY42BkH9wxiMT869CO+enA1w5pIrXow6kCM1sQspHHaVmJUlotEMJxyoLFfA/8Kt1EKFyobOjuZs2SwyVyJ2sStvQuUQEosULZCNGZEqoH5g6zhMPxaxm7ZLrrsDZ9maNGVqo7EWLWHrZ57Q/5MtTrbxQL+eXjUmJ9K3kS+3uEwMdqR6Z3BluU1ivanpPc1CN2GNhdO0/hSY4YkGEnuLsqJyDd3cIiB1MxuCBJ4ZaqOd2viV1WcP3oU3dxVPm4MWyfYIldMWB14FahScxLhWdRnM9YZ/i9IFcLypXsuz7DjrJPtPUCAwEAAaNmMGQwHQYDVR0OBBYEFP5JzLUawNF+c3AXsYTEWHh7z2czMB8GA1UdIwQYMBaAFP5JzLUawNF+c3AXsYTEWHh7z2czMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAGAQH/AgEBMA0GCSqGSIb3DQEBCwUAA4IBAQBc+Be7NDhpE09y7hLPZGRPl1cSKBw4RI0XIv6rlbSTFs5EebpTGjhx/whNxwEZhB9HZ7111Oa1YlT8xkI9DshB78mjAHCKBAJ76moK8tkG0aqdYpJ4ZcJTVBB7l98Rvgc7zfTii7WemTy72deBbSeiEtXavm4EF0mWjHhQ5Nxpnp00Bqn5g1x8CyTDypgmugnep+xG+iFzNmTdsz7WI9T/7kDMXqB7M/FPWBORyS98OJqNDswCLF8bIZYwUBEe+bRHFomoShMzaC3tvim7WCb16noDkSTMlfKO4pnvKhpcVdSgwcruATV7y+W+Lvmz2OT/Gui4JhqeoTewsxndhDDE\\n-----END CERTIFICATE-----\\n",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "expires_on": "2014-01-01T05:20:00.12345Z",
    "fingerprint": "E9:19:49:AA:DD:D8:1E:C1:20:2A:D8:22:BF:A5:F8:FC:1A:F7:10:9F:C7:5B:69:AB:0:31:91:8B:61:B4:BF:1C",
    "in_use": true,
    "issuer_org": "Example Inc.",
    "issuer_raw": "O=Example Inc.,L=California,ST=San Francisco,C=US",
    "type": "gateway_managed",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "uploaded_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Domain Types

### Certificate List Response

- `CertificateListResponse object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

### Certificate Get Response

- `CertificateGetResponse object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

### Certificate Create Response

- `CertificateCreateResponse object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

### Certificate Delete Response

- `CertificateDeleteResponse object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

### Certificate Activate Response

- `CertificateActivateResponse object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

### Certificate Deactivate Response

- `CertificateDeactivateResponse object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

# Pacfiles

## List PAC files

**get** `/accounts/{account_id}/gateway/pacfiles`

List all Zero Trust Gateway PAC files for an account.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional array of object { id, created_at, description, 4 more }`

  - `id: optional string`

  - `created_at: optional string`

  - `description: optional string`

    Detailed description of the PAC file.

  - `name: optional string`

    Name of the PAC file.

  - `slug: optional string`

    URL-friendly version of the PAC file name.

  - `updated_at: optional string`

  - `url: optional string`

    Unique URL to download the PAC file.

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Indicate the total number of results for the requested service.

  - `page: optional number`

    Indicate the current page within a paginated list of results.

  - `per_page: optional number`

    Indicate the number of results per page.

  - `total_count: optional number`

    Indicate the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/pacfiles \
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
      "id": "ed35569b41ce4d1facfe683550f54086",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "description": "PAC file for Devops team",
      "name": "Devops team",
      "slug": "pac_devops",
      "updated_at": "2014-01-01T05:20:00.12345Z",
      "url": "https://pac.cloudflare-gateway.com/699d98642c564d2e855e9661899b7252/pac_devops"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get a PAC file

**get** `/accounts/{account_id}/gateway/pacfiles/{pacfile_id}`

Get a single Zero Trust Gateway PAC file.

### Path Parameters

- `account_id: string`

- `pacfile_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { id, contents, created_at, 5 more }`

  - `id: optional string`

  - `contents: optional string`

    Actual contents of the PAC file

  - `created_at: optional string`

  - `description: optional string`

    Detailed description of the PAC file.

  - `name: optional string`

    Name of the PAC file.

  - `slug: optional string`

    URL-friendly version of the PAC file name.

  - `updated_at: optional string`

  - `url: optional string`

    Unique URL to download the PAC file.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/pacfiles/$PACFILE_ID \
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
    "id": "ed35569b41ce4d1facfe683550f54086",
    "contents": "function FindProxyForURL(url, host) { return \"DIRECT\"; }",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "PAC file for Devops team",
    "name": "Devops team",
    "slug": "pac_devops",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "url": "https://pac.cloudflare-gateway.com/699d98642c564d2e855e9661899b7252/pac_devops"
  }
}
```

## Create a PAC file

**post** `/accounts/{account_id}/gateway/pacfiles`

Create a new Zero Trust Gateway PAC file.

### Path Parameters

- `account_id: string`

### Body Parameters

- `contents: string`

  Actual contents of the PAC file

- `name: string`

  Name of the PAC file.

- `description: optional string`

  Detailed description of the PAC file.

- `slug: optional string`

  URL-friendly version of the PAC file name. If not provided, it will be auto-generated

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { id, contents, created_at, 5 more }`

  - `id: optional string`

  - `contents: optional string`

    Actual contents of the PAC file

  - `created_at: optional string`

  - `description: optional string`

    Detailed description of the PAC file.

  - `name: optional string`

    Name of the PAC file.

  - `slug: optional string`

    URL-friendly version of the PAC file name.

  - `updated_at: optional string`

  - `url: optional string`

    Unique URL to download the PAC file.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/pacfiles \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "contents": "function FindProxyForURL(url, host) { return \\"DIRECT\\"; }",
          "name": "Devops team",
          "description": "PAC file for Devops team",
          "slug": "pac_devops"
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
    "id": "ed35569b41ce4d1facfe683550f54086",
    "contents": "function FindProxyForURL(url, host) { return \"DIRECT\"; }",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "PAC file for Devops team",
    "name": "Devops team",
    "slug": "pac_devops",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "url": "https://pac.cloudflare-gateway.com/699d98642c564d2e855e9661899b7252/pac_devops"
  }
}
```

## Update a Zero Trust Gateway PAC file

**put** `/accounts/{account_id}/gateway/pacfiles/{pacfile_id}`

Update a configured Zero Trust Gateway PAC file.

### Path Parameters

- `account_id: string`

- `pacfile_id: string`

### Body Parameters

- `contents: string`

  Actual contents of the PAC file

- `description: string`

  Detailed description of the PAC file.

- `name: string`

  Name of the PAC file.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { id, contents, created_at, 5 more }`

  - `id: optional string`

  - `contents: optional string`

    Actual contents of the PAC file

  - `created_at: optional string`

  - `description: optional string`

    Detailed description of the PAC file.

  - `name: optional string`

    Name of the PAC file.

  - `slug: optional string`

    URL-friendly version of the PAC file name.

  - `updated_at: optional string`

  - `url: optional string`

    Unique URL to download the PAC file.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/pacfiles/$PACFILE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "contents": "function FindProxyForURL(url, host) { return \\"DIRECT\\"; }",
          "description": "PAC file for Devops team",
          "name": "Devops team"
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
    "id": "ed35569b41ce4d1facfe683550f54086",
    "contents": "function FindProxyForURL(url, host) { return \"DIRECT\"; }",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "PAC file for Devops team",
    "name": "Devops team",
    "slug": "pac_devops",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "url": "https://pac.cloudflare-gateway.com/699d98642c564d2e855e9661899b7252/pac_devops"
  }
}
```

## Delete a PAC file

**delete** `/accounts/{account_id}/gateway/pacfiles/{pacfile_id}`

Delete a configured Zero Trust Gateway PAC file.

### Path Parameters

- `account_id: string`

- `pacfile_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/pacfiles/$PACFILE_ID \
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
  "result": {}
}
```

## Domain Types

### Pacfile List Response

- `PacfileListResponse object { id, created_at, description, 4 more }`

  - `id: optional string`

  - `created_at: optional string`

  - `description: optional string`

    Detailed description of the PAC file.

  - `name: optional string`

    Name of the PAC file.

  - `slug: optional string`

    URL-friendly version of the PAC file name.

  - `updated_at: optional string`

  - `url: optional string`

    Unique URL to download the PAC file.

### Pacfile Get Response

- `PacfileGetResponse object { id, contents, created_at, 5 more }`

  - `id: optional string`

  - `contents: optional string`

    Actual contents of the PAC file

  - `created_at: optional string`

  - `description: optional string`

    Detailed description of the PAC file.

  - `name: optional string`

    Name of the PAC file.

  - `slug: optional string`

    URL-friendly version of the PAC file name.

  - `updated_at: optional string`

  - `url: optional string`

    Unique URL to download the PAC file.

### Pacfile Create Response

- `PacfileCreateResponse object { id, contents, created_at, 5 more }`

  - `id: optional string`

  - `contents: optional string`

    Actual contents of the PAC file

  - `created_at: optional string`

  - `description: optional string`

    Detailed description of the PAC file.

  - `name: optional string`

    Name of the PAC file.

  - `slug: optional string`

    URL-friendly version of the PAC file name.

  - `updated_at: optional string`

  - `url: optional string`

    Unique URL to download the PAC file.

### Pacfile Update Response

- `PacfileUpdateResponse object { id, contents, created_at, 5 more }`

  - `id: optional string`

  - `contents: optional string`

    Actual contents of the PAC file

  - `created_at: optional string`

  - `description: optional string`

    Detailed description of the PAC file.

  - `name: optional string`

    Name of the PAC file.

  - `slug: optional string`

    URL-friendly version of the PAC file name.

  - `updated_at: optional string`

  - `url: optional string`

    Unique URL to download the PAC file.

### Pacfile Delete Response

- `PacfileDeleteResponse = unknown`
