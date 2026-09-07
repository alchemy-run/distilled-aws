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
