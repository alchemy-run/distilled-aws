## List Gateways

**get** `/accounts/{account_id}/ai-gateway/gateways`

Lists all AI Gateway evaluator types configured for the account.

### Path Parameters

- `account_id: string`

### Query Parameters

- `page: optional number`

- `per_page: optional number`

- `search: optional string`

  Search by id

### Returns

- `result: array of object { id, cache_invalidate_on_update, cache_ttl, 23 more }`

  - `id: string`

    gateway id

  - `cache_invalidate_on_update: boolean`

  - `cache_ttl: number`

  - `collect_logs: boolean`

  - `created_at: string`

  - `modified_at: string`

  - `rate_limiting_interval: number`

  - `rate_limiting_limit: number`

  - `authentication: optional boolean`

  - `dlp: optional object { action, enabled, profiles }  or object { enabled, policies }`

    - `object { action, enabled, profiles }`

      - `action: "BLOCK" or "FLAG"`

        - `"BLOCK"`

        - `"FLAG"`

      - `enabled: boolean`

      - `profiles: array of string`

    - `object { enabled, policies }`

      - `enabled: boolean`

      - `policies: array of object { id, action, check, 2 more }`

        - `id: string`

        - `action: "FLAG" or "BLOCK"`

          - `"FLAG"`

          - `"BLOCK"`

        - `check: array of "REQUEST" or "RESPONSE"`

          - `"REQUEST"`

          - `"RESPONSE"`

        - `enabled: boolean`

        - `profiles: array of string`

  - `guardrails: optional object { prompt, response }`

    - `prompt: object { P1, S1, S10, 11 more }`

      - `P1: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S1: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S10: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S11: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S12: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S13: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S2: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S3: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S4: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S5: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S6: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S7: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S8: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S9: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

    - `response: object { P1, S1, S10, 11 more }`

      - `P1: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S1: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S10: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S11: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S12: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S13: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S2: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S3: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S4: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S5: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S6: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S7: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S8: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

      - `S9: optional "FLAG" or "BLOCK"`

        - `"FLAG"`

        - `"BLOCK"`

  - `is_default: optional boolean`

  - `log_management: optional number`

  - `log_management_strategy: optional "STOP_INSERTING" or "DELETE_OLDEST"`

    - `"STOP_INSERTING"`

    - `"DELETE_OLDEST"`

  - `logpush: optional boolean`

  - `logpush_public_key: optional string`

  - `otel: optional array of object { headers, url, authorization, content_type }`

    - `headers: map[string]`

    - `url: string`

    - `authorization: optional string`

    - `content_type: optional "json" or "protobuf"`

      - `"json"`

      - `"protobuf"`

  - `rate_limiting_technique: optional "fixed" or "sliding"`

    - `"fixed"`

    - `"sliding"`

  - `retry_backoff: optional "constant" or "linear" or "exponential"`

    Backoff strategy for retry delays

    - `"constant"`

    - `"linear"`

    - `"exponential"`

  - `retry_delay: optional number`

    Delay between retry attempts in milliseconds (0-5000)

  - `retry_max_attempts: optional number`

    Maximum number of retry attempts for failed requests (1-5)

  - `spend_limits: optional object { enabled, rules }`

    - `enabled: optional boolean`

    - `rules: optional array of object { limit, limitType, window, 6 more }`

      - `limit: number`

      - `limitType: "cost"`

        - `"cost"`

      - `window: number`

      - `id: optional string`

      - `enabled: optional boolean`

      - `metadata: optional map[object { mode }  or object { mode, values } ]`

        - `Mode object { mode }`

          - `mode: "partition"`

            - `"partition"`

        - `object { mode, values }`

          - `mode: "filter"`

            - `"filter"`

          - `values: array of string`

      - `model: optional object { mode, values }`

        - `mode: "filter"`

          - `"filter"`

        - `values: array of string`

      - `provider: optional object { mode, values }`

        - `mode: "filter"`

          - `"filter"`

        - `values: array of string`

      - `technique: optional "fixed" or "sliding"`

        - `"fixed"`

        - `"sliding"`

  - `store_id: optional string`

  - `stripe: optional object { authorization, usage_events }`

    - `authorization: string`

    - `usage_events: array of object { payload }`

      - `payload: string`

  - `workers_ai_billing_mode: optional "postpaid"`

    Controls how Workers AI inference calls routed through this gateway are billed. Only 'postpaid' is currently supported.

    - `"postpaid"`

  - `zdr: optional boolean`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "id": "my-gateway",
      "cache_invalidate_on_update": true,
      "cache_ttl": 0,
      "collect_logs": true,
      "created_at": "2019-12-27T18:11:19.117Z",
      "modified_at": "2019-12-27T18:11:19.117Z",
      "rate_limiting_interval": 0,
      "rate_limiting_limit": 0,
      "authentication": true,
      "dlp": {
        "action": "BLOCK",
        "enabled": true,
        "profiles": [
          "string"
        ]
      },
      "guardrails": {
        "prompt": {
          "P1": "FLAG",
          "S1": "FLAG",
          "S10": "FLAG",
          "S11": "FLAG",
          "S12": "FLAG",
          "S13": "FLAG",
          "S2": "FLAG",
          "S3": "FLAG",
          "S4": "FLAG",
          "S5": "FLAG",
          "S6": "FLAG",
          "S7": "FLAG",
          "S8": "FLAG",
          "S9": "FLAG"
        },
        "response": {
          "P1": "FLAG",
          "S1": "FLAG",
          "S10": "FLAG",
          "S11": "FLAG",
          "S12": "FLAG",
          "S13": "FLAG",
          "S2": "FLAG",
          "S3": "FLAG",
          "S4": "FLAG",
          "S5": "FLAG",
          "S6": "FLAG",
          "S7": "FLAG",
          "S8": "FLAG",
          "S9": "FLAG"
        }
      },
      "is_default": true,
      "log_management": 10000,
      "log_management_strategy": "STOP_INSERTING",
      "logpush": true,
      "logpush_public_key": "xxxxxxxxxxxxxxxx",
      "otel": [
        {
          "headers": {
            "foo": "string"
          },
          "url": "https://example.com",
          "authorization": "authorization",
          "content_type": "json"
        }
      ],
      "rate_limiting_technique": "fixed",
      "retry_backoff": "constant",
      "retry_delay": 0,
      "retry_max_attempts": 1,
      "spend_limits": {
        "enabled": true,
        "rules": [
          {
            "limit": 1,
            "limitType": "cost",
            "window": 1,
            "id": "x",
            "enabled": true,
            "metadata": {
              "foo": {
                "mode": "partition"
              }
            },
            "model": {
              "mode": "filter",
              "values": [
                "string"
              ]
            },
            "provider": {
              "mode": "filter",
              "values": [
                "string"
              ]
            },
            "technique": "fixed"
          }
        ]
      },
      "store_id": "store_id",
      "stripe": {
        "authorization": "authorization",
        "usage_events": [
          {
            "payload": "payload"
          }
        ]
      },
      "workers_ai_billing_mode": "postpaid",
      "zdr": true
    }
  ],
  "success": true
}
```
