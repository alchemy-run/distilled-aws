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
