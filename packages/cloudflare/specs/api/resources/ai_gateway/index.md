# AI Gateway

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

## Fetch a Gateway

**get** `/accounts/{account_id}/ai-gateway/gateways/{id}`

Retrieves details for a specific AI Gateway dataset.

### Path Parameters

- `account_id: string`

- `id: string`

  gateway id

### Returns

- `result: object { id, cache_invalidate_on_update, cache_ttl, 23 more }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
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
  },
  "success": true
}
```

## Create a new Gateway

**post** `/accounts/{account_id}/ai-gateway/gateways`

Creates a new AI Gateway.

### Path Parameters

- `account_id: string`

### Body Parameters

- `id: string`

  gateway id

- `cache_invalidate_on_update: boolean`

- `cache_ttl: number`

- `collect_logs: boolean`

- `rate_limiting_interval: number`

- `rate_limiting_limit: number`

- `authentication: optional boolean`

- `log_management: optional number`

- `log_management_strategy: optional "STOP_INSERTING" or "DELETE_OLDEST"`

  - `"STOP_INSERTING"`

  - `"DELETE_OLDEST"`

- `logpush: optional boolean`

- `logpush_public_key: optional string`

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

- `workers_ai_billing_mode: optional "postpaid"`

  Controls how Workers AI inference calls routed through this gateway are billed. Only 'postpaid' is currently supported.

  - `"postpaid"`

- `zdr: optional boolean`

### Returns

- `result: object { id, cache_invalidate_on_update, cache_ttl, 23 more }`

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
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "id": "my-gateway",
          "cache_invalidate_on_update": true,
          "cache_ttl": 0,
          "collect_logs": true,
          "rate_limiting_interval": 0,
          "rate_limiting_limit": 0
        }'
```

#### Response

```json
{
  "result": {
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
  },
  "success": true
}
```

## Update a Gateway

**put** `/accounts/{account_id}/ai-gateway/gateways/{id}`

Updates an existing AI Gateway dataset.

### Path Parameters

- `account_id: string`

- `id: string`

  gateway id

### Body Parameters

- `cache_invalidate_on_update: boolean`

- `cache_ttl: number`

- `collect_logs: boolean`

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

### Returns

- `result: object { id, cache_invalidate_on_update, cache_ttl, 23 more }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "cache_invalidate_on_update": true,
          "cache_ttl": 0,
          "collect_logs": true,
          "rate_limiting_interval": 0,
          "rate_limiting_limit": 0
        }'
```

#### Response

```json
{
  "result": {
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
  },
  "success": true
}
```

## Delete a Gateway

**delete** `/accounts/{account_id}/ai-gateway/gateways/{id}`

Deletes an AI Gateway dataset.

### Path Parameters

- `account_id: string`

- `id: string`

  gateway id

### Returns

- `result: object { id, cache_invalidate_on_update, cache_ttl, 23 more }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
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
  },
  "success": true
}
```

## Domain Types

### AI Gateway List Response

- `AIGatewayListResponse object { id, cache_invalidate_on_update, cache_ttl, 23 more }`

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

### AI Gateway Get Response

- `AIGatewayGetResponse object { id, cache_invalidate_on_update, cache_ttl, 23 more }`

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

### AI Gateway Create Response

- `AIGatewayCreateResponse object { id, cache_invalidate_on_update, cache_ttl, 23 more }`

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

### AI Gateway Update Response

- `AIGatewayUpdateResponse object { id, cache_invalidate_on_update, cache_ttl, 23 more }`

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

### AI Gateway Delete Response

- `AIGatewayDeleteResponse object { id, cache_invalidate_on_update, cache_ttl, 23 more }`

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

# Evaluation Types

## List Evaluators

**get** `/accounts/{account_id}/ai-gateway/evaluation-types`

List Evaluators

### Path Parameters

- `account_id: string`

### Query Parameters

- `order_by: optional string`

- `order_by_direction: optional "asc" or "desc"`

  - `"asc"`

  - `"desc"`

- `page: optional number`

- `per_page: optional number`

### Returns

- `result: array of object { id, created_at, description, 5 more }`

  - `id: string`

  - `created_at: string`

  - `description: string`

  - `enable: boolean`

  - `mandatory: boolean`

  - `modified_at: string`

  - `name: string`

  - `type: string`

- `result_info: object { count, page, per_page, total_count }`

  - `count: number`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/evaluation-types \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "id": "id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "description": "description",
      "enable": true,
      "mandatory": true,
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "type": "type"
    }
  ],
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  },
  "success": true
}
```

## Domain Types

### Evaluation Type List Response

- `EvaluationTypeListResponse object { id, created_at, description, 5 more }`

  - `id: string`

  - `created_at: string`

  - `description: string`

  - `enable: boolean`

  - `mandatory: boolean`

  - `modified_at: string`

  - `name: string`

  - `type: string`

# Custom Providers

## List Account Providers

**get** `/accounts/{account_id}/ai-gateway/custom-providers`

Lists all AI Gateway evaluator types configured for the account.

### Path Parameters

- `account_id: string`

### Query Parameters

- `beta: optional boolean`

- `enable: optional boolean`

- `page: optional number`

- `per_page: optional number`

- `search: optional string`

  Search by id, name, slug

### Returns

- `result: array of object { id, base_url, created_at, 12 more }`

  - `id: string`

  - `base_url: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `slug: string`

  - `beta: optional boolean`

  - `curl_example: optional string`

  - `description: optional string`

  - `enable: optional boolean`

  - `headers: optional string`

  - `js_example: optional string`

  - `link: optional string`

  - `logo: optional string`

  - `position: optional number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/custom-providers \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "base_url": "https://example.com",
      "created_at": "2019-12-27T18:11:19.117Z",
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "slug": "slug",
      "beta": true,
      "curl_example": "curl_example",
      "description": "description",
      "enable": true,
      "headers": "headers",
      "js_example": "js_example",
      "link": "link",
      "logo": "logo",
      "position": 0
    }
  ],
  "success": true
}
```

## Fetch a Account Provider

**get** `/accounts/{account_id}/ai-gateway/custom-providers/{id}`

Retrieves details for a specific AI Gateway dataset.

### Path Parameters

- `account_id: string`

- `id: string`

### Returns

- `result: object { id, base_url, created_at, 12 more }`

  - `id: string`

  - `base_url: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `slug: string`

  - `beta: optional boolean`

  - `curl_example: optional string`

  - `description: optional string`

  - `enable: optional boolean`

  - `headers: optional string`

  - `js_example: optional string`

  - `link: optional string`

  - `logo: optional string`

  - `position: optional number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/custom-providers/$ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "base_url": "https://example.com",
    "created_at": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "slug": "slug",
    "beta": true,
    "curl_example": "curl_example",
    "description": "description",
    "enable": true,
    "headers": "headers",
    "js_example": "js_example",
    "link": "link",
    "logo": "logo",
    "position": 0
  },
  "success": true
}
```

## Create a new Account Provider

**post** `/accounts/{account_id}/ai-gateway/custom-providers`

Creates a new AI Gateway.

### Path Parameters

- `account_id: string`

### Body Parameters

- `base_url: string`

- `name: string`

- `slug: string`

- `beta: optional boolean`

- `curl_example: optional string`

- `description: optional string`

- `enable: optional boolean`

- `headers: optional string`

- `js_example: optional string`

- `link: optional string`

- `position: optional number`

### Returns

- `result: object { id, base_url, created_at, 12 more }`

  - `id: string`

  - `base_url: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `slug: string`

  - `beta: optional boolean`

  - `curl_example: optional string`

  - `description: optional string`

  - `enable: optional boolean`

  - `headers: optional string`

  - `js_example: optional string`

  - `link: optional string`

  - `logo: optional string`

  - `position: optional number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/custom-providers \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "base_url": "https://example.com",
          "name": "name",
          "slug": "slug"
        }'
```

#### Response

```json
{
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "base_url": "https://example.com",
    "created_at": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "slug": "slug",
    "beta": true,
    "curl_example": "curl_example",
    "description": "description",
    "enable": true,
    "headers": "headers",
    "js_example": "js_example",
    "link": "link",
    "logo": "logo",
    "position": 0
  },
  "success": true
}
```

## Delete a Account Provider

**delete** `/accounts/{account_id}/ai-gateway/custom-providers/{id}`

Deletes an AI Gateway dataset.

### Path Parameters

- `account_id: string`

- `id: string`

### Returns

- `result: object { id, base_url, created_at, 12 more }`

  - `id: string`

  - `base_url: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `slug: string`

  - `beta: optional boolean`

  - `curl_example: optional string`

  - `description: optional string`

  - `enable: optional boolean`

  - `headers: optional string`

  - `js_example: optional string`

  - `link: optional string`

  - `logo: optional string`

  - `position: optional number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/custom-providers/$ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "base_url": "https://example.com",
    "created_at": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "slug": "slug",
    "beta": true,
    "curl_example": "curl_example",
    "description": "description",
    "enable": true,
    "headers": "headers",
    "js_example": "js_example",
    "link": "link",
    "logo": "logo",
    "position": 0
  },
  "success": true
}
```

## Domain Types

### Custom Provider List Response

- `CustomProviderListResponse object { id, base_url, created_at, 12 more }`

  - `id: string`

  - `base_url: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `slug: string`

  - `beta: optional boolean`

  - `curl_example: optional string`

  - `description: optional string`

  - `enable: optional boolean`

  - `headers: optional string`

  - `js_example: optional string`

  - `link: optional string`

  - `logo: optional string`

  - `position: optional number`

### Custom Provider Get Response

- `CustomProviderGetResponse object { id, base_url, created_at, 12 more }`

  - `id: string`

  - `base_url: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `slug: string`

  - `beta: optional boolean`

  - `curl_example: optional string`

  - `description: optional string`

  - `enable: optional boolean`

  - `headers: optional string`

  - `js_example: optional string`

  - `link: optional string`

  - `logo: optional string`

  - `position: optional number`

### Custom Provider Create Response

- `CustomProviderCreateResponse object { id, base_url, created_at, 12 more }`

  - `id: string`

  - `base_url: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `slug: string`

  - `beta: optional boolean`

  - `curl_example: optional string`

  - `description: optional string`

  - `enable: optional boolean`

  - `headers: optional string`

  - `js_example: optional string`

  - `link: optional string`

  - `logo: optional string`

  - `position: optional number`

### Custom Provider Delete Response

- `CustomProviderDeleteResponse object { id, base_url, created_at, 12 more }`

  - `id: string`

  - `base_url: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `slug: string`

  - `beta: optional boolean`

  - `curl_example: optional string`

  - `description: optional string`

  - `enable: optional boolean`

  - `headers: optional string`

  - `js_example: optional string`

  - `link: optional string`

  - `logo: optional string`

  - `position: optional number`

# Logs

## List Gateway Logs

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs`

List Gateway Logs

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

### Query Parameters

- `cached: optional boolean`

- `direction: optional "asc" or "desc"`

  - `"asc"`

  - `"desc"`

- `end_date: optional string`

- `feedback: optional 0 or 1`

  - `0`

  - `1`

- `filters: optional array of object { key, operator, value }`

  - `key: "id" or "created_at" or "request_content_type" or 21 more`

    - `"id"`

    - `"created_at"`

    - `"request_content_type"`

    - `"response_content_type"`

    - `"request_type"`

    - `"success"`

    - `"cached"`

    - `"provider"`

    - `"model"`

    - `"model_type"`

    - `"cost"`

    - `"tokens"`

    - `"tokens_in"`

    - `"tokens_out"`

    - `"duration"`

    - `"feedback"`

    - `"event_id"`

    - `"metadata.key"`

    - `"metadata.value"`

    - `"authentication"`

    - `"wholesale"`

    - `"compatibilityMode"`

    - `"dlp_action"`

    - `"user_agent"`

  - `operator: "eq" or "neq" or "contains" or 2 more`

    - `"eq"`

    - `"neq"`

    - `"contains"`

    - `"lt"`

    - `"gt"`

  - `value: array of string or number or boolean`

    - `string`

    - `number`

    - `boolean`

- `max_cost: optional number`

- `max_duration: optional number`

- `max_tokens_in: optional number`

- `max_tokens_out: optional number`

- `max_total_tokens: optional number`

- `meta_info: optional boolean`

- `min_cost: optional number`

- `min_duration: optional number`

- `min_tokens_in: optional number`

- `min_tokens_out: optional number`

- `min_total_tokens: optional number`

- `model: optional string`

- `model_type: optional string`

- `order_by: optional "created_at" or "provider" or "model" or 3 more`

  - `"created_at"`

  - `"provider"`

  - `"model"`

  - `"model_type"`

  - `"success"`

  - `"cached"`

- `order_by_direction: optional "asc" or "desc"`

  - `"asc"`

  - `"desc"`

- `page: optional number`

- `per_page: optional number`

- `provider: optional string`

- `request_content_type: optional string`

- `response_content_type: optional string`

- `search: optional string`

- `start_date: optional string`

- `success: optional boolean`

### Returns

- `result: array of object { id, cached, created_at, 16 more }`

  - `id: string`

  - `cached: boolean`

  - `created_at: string`

  - `duration: number`

  - `model: string`

  - `path: string`

  - `provider: string`

  - `success: boolean`

  - `tokens_in: number`

  - `tokens_out: number`

  - `cost: optional number`

  - `custom_cost: optional boolean`

  - `metadata: optional string`

  - `model_type: optional string`

  - `request_content_type: optional string`

  - `request_type: optional string`

  - `response_content_type: optional string`

  - `status_code: optional number`

  - `step: optional number`

- `result_info: object { count, max_cost, max_duration, 11 more }`

  - `count: optional number`

  - `max_cost: optional number`

  - `max_duration: optional number`

  - `max_tokens_in: optional number`

  - `max_tokens_out: optional number`

  - `max_total_tokens: optional number`

  - `min_cost: optional number`

  - `min_duration: optional number`

  - `min_tokens_in: optional number`

  - `min_tokens_out: optional number`

  - `min_total_tokens: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/logs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "id": "id",
      "cached": true,
      "created_at": "2019-12-27T18:11:19.117Z",
      "duration": 0,
      "model": "model",
      "path": "path",
      "provider": "provider",
      "success": true,
      "tokens_in": 0,
      "tokens_out": 0,
      "cost": 0,
      "custom_cost": true,
      "metadata": "metadata",
      "model_type": "model_type",
      "request_content_type": "request_content_type",
      "request_type": "request_type",
      "response_content_type": "response_content_type",
      "status_code": 0,
      "step": 0
    }
  ],
  "result_info": {
    "count": 0,
    "max_cost": 0,
    "max_duration": 0,
    "max_tokens_in": 0,
    "max_tokens_out": 0,
    "max_total_tokens": 0,
    "min_cost": 0,
    "min_duration": 0,
    "min_tokens_in": 0,
    "min_tokens_out": 0,
    "min_total_tokens": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  },
  "success": true
}
```

## Get Gateway Log Detail

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs/{id}`

Retrieves detailed information for a specific AI Gateway log entry.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

- `id: string`

### Returns

- `result: object { id, cached, created_at, 22 more }`

  - `id: string`

  - `cached: boolean`

  - `created_at: string`

  - `duration: number`

  - `model: string`

  - `path: string`

  - `provider: string`

  - `success: boolean`

  - `tokens_in: number`

  - `tokens_out: number`

  - `cost: optional number`

  - `custom_cost: optional boolean`

  - `metadata: optional string`

  - `model_type: optional string`

  - `request_content_type: optional string`

  - `request_head: optional string`

  - `request_head_complete: optional boolean`

  - `request_size: optional number`

  - `request_type: optional string`

  - `response_content_type: optional string`

  - `response_head: optional string`

  - `response_head_complete: optional boolean`

  - `response_size: optional number`

  - `status_code: optional number`

  - `step: optional number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/logs/$ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "id",
    "cached": true,
    "created_at": "2019-12-27T18:11:19.117Z",
    "duration": 0,
    "model": "model",
    "path": "path",
    "provider": "provider",
    "success": true,
    "tokens_in": 0,
    "tokens_out": 0,
    "cost": 0,
    "custom_cost": true,
    "metadata": "metadata",
    "model_type": "model_type",
    "request_content_type": "request_content_type",
    "request_head": "request_head",
    "request_head_complete": true,
    "request_size": 0,
    "request_type": "request_type",
    "response_content_type": "response_content_type",
    "response_head": "response_head",
    "response_head_complete": true,
    "response_size": 0,
    "status_code": 0,
    "step": 0
  },
  "success": true
}
```

## Patch Gateway Log

**patch** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs/{id}`

Updates metadata for an AI Gateway log entry.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

- `id: string`

### Body Parameters

- `feedback: optional number`

- `metadata: optional map[string or number or boolean]`

  - `string`

  - `number`

  - `boolean`

- `score: optional number`

### Returns

- `result: unknown`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/logs/$ID \
    -X PATCH \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {},
  "success": true
}
```

## Delete Gateway Logs

**delete** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs`

Delete Gateway Logs

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

### Query Parameters

- `filters: optional array of object { key, operator, value }`

  - `key: "id" or "created_at" or "request_content_type" or 21 more`

    - `"id"`

    - `"created_at"`

    - `"request_content_type"`

    - `"response_content_type"`

    - `"request_type"`

    - `"success"`

    - `"cached"`

    - `"provider"`

    - `"model"`

    - `"model_type"`

    - `"cost"`

    - `"tokens"`

    - `"tokens_in"`

    - `"tokens_out"`

    - `"duration"`

    - `"feedback"`

    - `"event_id"`

    - `"metadata.key"`

    - `"metadata.value"`

    - `"authentication"`

    - `"wholesale"`

    - `"compatibilityMode"`

    - `"dlp_action"`

    - `"user_agent"`

  - `operator: "eq" or "neq" or "contains" or 2 more`

    - `"eq"`

    - `"neq"`

    - `"contains"`

    - `"lt"`

    - `"gt"`

  - `value: array of string or number or boolean`

    - `string`

    - `number`

    - `boolean`

- `limit: optional number`

- `order_by: optional "created_at" or "provider" or "model" or 8 more`

  - `"created_at"`

  - `"provider"`

  - `"model"`

  - `"model_type"`

  - `"success"`

  - `"cached"`

  - `"cost"`

  - `"tokens_in"`

  - `"tokens_out"`

  - `"duration"`

  - `"feedback"`

- `order_by_direction: optional "asc" or "desc"`

  - `"asc"`

  - `"desc"`

### Returns

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/logs \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "success": true
}
```

## Get Gateway Log Request

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs/{id}/request`

Retrieves the original request payload for an AI Gateway log entry.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

- `id: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/logs/$ID/request \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{}
```

## Get Gateway Log Response

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs/{id}/response`

Retrieves the response payload for an AI Gateway log entry.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

- `id: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/logs/$ID/response \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{}
```

## Domain Types

### Log List Response

- `LogListResponse object { id, cached, created_at, 16 more }`

  - `id: string`

  - `cached: boolean`

  - `created_at: string`

  - `duration: number`

  - `model: string`

  - `path: string`

  - `provider: string`

  - `success: boolean`

  - `tokens_in: number`

  - `tokens_out: number`

  - `cost: optional number`

  - `custom_cost: optional boolean`

  - `metadata: optional string`

  - `model_type: optional string`

  - `request_content_type: optional string`

  - `request_type: optional string`

  - `response_content_type: optional string`

  - `status_code: optional number`

  - `step: optional number`

### Log Get Response

- `LogGetResponse object { id, cached, created_at, 22 more }`

  - `id: string`

  - `cached: boolean`

  - `created_at: string`

  - `duration: number`

  - `model: string`

  - `path: string`

  - `provider: string`

  - `success: boolean`

  - `tokens_in: number`

  - `tokens_out: number`

  - `cost: optional number`

  - `custom_cost: optional boolean`

  - `metadata: optional string`

  - `model_type: optional string`

  - `request_content_type: optional string`

  - `request_head: optional string`

  - `request_head_complete: optional boolean`

  - `request_size: optional number`

  - `request_type: optional string`

  - `response_content_type: optional string`

  - `response_head: optional string`

  - `response_head_complete: optional boolean`

  - `response_size: optional number`

  - `status_code: optional number`

  - `step: optional number`

### Log Edit Response

- `LogEditResponse = unknown`

### Log Delete Response

- `LogDeleteResponse object { success }`

  - `success: boolean`

### Log Request Response

- `LogRequestResponse = unknown`

### Log Response Response

- `LogResponseResponse = unknown`

# Datasets

## List Datasets

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/datasets`

Lists all AI Gateway evaluator types configured for the account.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

### Query Parameters

- `enable: optional boolean`

- `name: optional string`

- `page: optional number`

- `per_page: optional number`

- `search: optional string`

  Search by id, name, filters

### Returns

- `result: array of object { id, created_at, enable, 4 more }`

  - `id: string`

  - `created_at: string`

  - `enable: boolean`

  - `filters: array of object { key, operator, value }`

    - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

      - `"created_at"`

      - `"request_content_type"`

      - `"response_content_type"`

      - `"success"`

      - `"cached"`

      - `"provider"`

      - `"model"`

      - `"cost"`

      - `"tokens"`

      - `"tokens_in"`

      - `"tokens_out"`

      - `"duration"`

      - `"feedback"`

    - `operator: "eq" or "contains" or "lt" or "gt"`

      - `"eq"`

      - `"contains"`

      - `"lt"`

      - `"gt"`

    - `value: array of string or number or boolean`

      - `string`

      - `number`

      - `boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/datasets \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "id": "id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "enable": true,
      "filters": [
        {
          "key": "created_at",
          "operator": "eq",
          "value": [
            "string"
          ]
        }
      ],
      "gateway_id": "my-gateway",
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "name"
    }
  ],
  "success": true
}
```

## Fetch a Dataset

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/datasets/{id}`

Retrieves details for a specific AI Gateway dataset.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

- `id: string`

### Returns

- `result: object { id, created_at, enable, 4 more }`

  - `id: string`

  - `created_at: string`

  - `enable: boolean`

  - `filters: array of object { key, operator, value }`

    - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

      - `"created_at"`

      - `"request_content_type"`

      - `"response_content_type"`

      - `"success"`

      - `"cached"`

      - `"provider"`

      - `"model"`

      - `"cost"`

      - `"tokens"`

      - `"tokens_in"`

      - `"tokens_out"`

      - `"duration"`

      - `"feedback"`

    - `operator: "eq" or "contains" or "lt" or "gt"`

      - `"eq"`

      - `"contains"`

      - `"lt"`

      - `"gt"`

    - `value: array of string or number or boolean`

      - `string`

      - `number`

      - `boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/datasets/$ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "enable": true,
    "filters": [
      {
        "key": "created_at",
        "operator": "eq",
        "value": [
          "string"
        ]
      }
    ],
    "gateway_id": "my-gateway",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name"
  },
  "success": true
}
```

## Create a new Dataset

**post** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/datasets`

Creates a new AI Gateway.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

### Body Parameters

- `enable: boolean`

- `filters: array of object { key, operator, value }`

  - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

    - `"created_at"`

    - `"request_content_type"`

    - `"response_content_type"`

    - `"success"`

    - `"cached"`

    - `"provider"`

    - `"model"`

    - `"cost"`

    - `"tokens"`

    - `"tokens_in"`

    - `"tokens_out"`

    - `"duration"`

    - `"feedback"`

  - `operator: "eq" or "contains" or "lt" or "gt"`

    - `"eq"`

    - `"contains"`

    - `"lt"`

    - `"gt"`

  - `value: array of string or number or boolean`

    - `string`

    - `number`

    - `boolean`

- `name: string`

### Returns

- `result: object { id, created_at, enable, 4 more }`

  - `id: string`

  - `created_at: string`

  - `enable: boolean`

  - `filters: array of object { key, operator, value }`

    - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

      - `"created_at"`

      - `"request_content_type"`

      - `"response_content_type"`

      - `"success"`

      - `"cached"`

      - `"provider"`

      - `"model"`

      - `"cost"`

      - `"tokens"`

      - `"tokens_in"`

      - `"tokens_out"`

      - `"duration"`

      - `"feedback"`

    - `operator: "eq" or "contains" or "lt" or "gt"`

      - `"eq"`

      - `"contains"`

      - `"lt"`

      - `"gt"`

    - `value: array of string or number or boolean`

      - `string`

      - `number`

      - `boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/datasets \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enable": true,
          "filters": [
            {
              "key": "created_at",
              "operator": "eq",
              "value": [
                "string"
              ]
            }
          ],
          "name": "name"
        }'
```

#### Response

```json
{
  "result": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "enable": true,
    "filters": [
      {
        "key": "created_at",
        "operator": "eq",
        "value": [
          "string"
        ]
      }
    ],
    "gateway_id": "my-gateway",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name"
  },
  "success": true
}
```

## Update a Dataset

**put** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/datasets/{id}`

Updates an existing AI Gateway dataset.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

- `id: string`

### Body Parameters

- `enable: boolean`

- `filters: array of object { key, operator, value }`

  - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

    - `"created_at"`

    - `"request_content_type"`

    - `"response_content_type"`

    - `"success"`

    - `"cached"`

    - `"provider"`

    - `"model"`

    - `"cost"`

    - `"tokens"`

    - `"tokens_in"`

    - `"tokens_out"`

    - `"duration"`

    - `"feedback"`

  - `operator: "eq" or "contains" or "lt" or "gt"`

    - `"eq"`

    - `"contains"`

    - `"lt"`

    - `"gt"`

  - `value: array of string or number or boolean`

    - `string`

    - `number`

    - `boolean`

- `name: string`

### Returns

- `result: object { id, created_at, enable, 4 more }`

  - `id: string`

  - `created_at: string`

  - `enable: boolean`

  - `filters: array of object { key, operator, value }`

    - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

      - `"created_at"`

      - `"request_content_type"`

      - `"response_content_type"`

      - `"success"`

      - `"cached"`

      - `"provider"`

      - `"model"`

      - `"cost"`

      - `"tokens"`

      - `"tokens_in"`

      - `"tokens_out"`

      - `"duration"`

      - `"feedback"`

    - `operator: "eq" or "contains" or "lt" or "gt"`

      - `"eq"`

      - `"contains"`

      - `"lt"`

      - `"gt"`

    - `value: array of string or number or boolean`

      - `string`

      - `number`

      - `boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/datasets/$ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enable": true,
          "filters": [
            {
              "key": "created_at",
              "operator": "eq",
              "value": [
                "string"
              ]
            }
          ],
          "name": "name"
        }'
```

#### Response

```json
{
  "result": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "enable": true,
    "filters": [
      {
        "key": "created_at",
        "operator": "eq",
        "value": [
          "string"
        ]
      }
    ],
    "gateway_id": "my-gateway",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name"
  },
  "success": true
}
```

## Delete a Dataset

**delete** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/datasets/{id}`

Deletes an AI Gateway dataset.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

- `id: string`

### Returns

- `result: object { id, created_at, enable, 4 more }`

  - `id: string`

  - `created_at: string`

  - `enable: boolean`

  - `filters: array of object { key, operator, value }`

    - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

      - `"created_at"`

      - `"request_content_type"`

      - `"response_content_type"`

      - `"success"`

      - `"cached"`

      - `"provider"`

      - `"model"`

      - `"cost"`

      - `"tokens"`

      - `"tokens_in"`

      - `"tokens_out"`

      - `"duration"`

      - `"feedback"`

    - `operator: "eq" or "contains" or "lt" or "gt"`

      - `"eq"`

      - `"contains"`

      - `"lt"`

      - `"gt"`

    - `value: array of string or number or boolean`

      - `string`

      - `number`

      - `boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/datasets/$ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "enable": true,
    "filters": [
      {
        "key": "created_at",
        "operator": "eq",
        "value": [
          "string"
        ]
      }
    ],
    "gateway_id": "my-gateway",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name"
  },
  "success": true
}
```

## Domain Types

### Dataset List Response

- `DatasetListResponse object { id, created_at, enable, 4 more }`

  - `id: string`

  - `created_at: string`

  - `enable: boolean`

  - `filters: array of object { key, operator, value }`

    - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

      - `"created_at"`

      - `"request_content_type"`

      - `"response_content_type"`

      - `"success"`

      - `"cached"`

      - `"provider"`

      - `"model"`

      - `"cost"`

      - `"tokens"`

      - `"tokens_in"`

      - `"tokens_out"`

      - `"duration"`

      - `"feedback"`

    - `operator: "eq" or "contains" or "lt" or "gt"`

      - `"eq"`

      - `"contains"`

      - `"lt"`

      - `"gt"`

    - `value: array of string or number or boolean`

      - `string`

      - `number`

      - `boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

### Dataset Get Response

- `DatasetGetResponse object { id, created_at, enable, 4 more }`

  - `id: string`

  - `created_at: string`

  - `enable: boolean`

  - `filters: array of object { key, operator, value }`

    - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

      - `"created_at"`

      - `"request_content_type"`

      - `"response_content_type"`

      - `"success"`

      - `"cached"`

      - `"provider"`

      - `"model"`

      - `"cost"`

      - `"tokens"`

      - `"tokens_in"`

      - `"tokens_out"`

      - `"duration"`

      - `"feedback"`

    - `operator: "eq" or "contains" or "lt" or "gt"`

      - `"eq"`

      - `"contains"`

      - `"lt"`

      - `"gt"`

    - `value: array of string or number or boolean`

      - `string`

      - `number`

      - `boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

### Dataset Create Response

- `DatasetCreateResponse object { id, created_at, enable, 4 more }`

  - `id: string`

  - `created_at: string`

  - `enable: boolean`

  - `filters: array of object { key, operator, value }`

    - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

      - `"created_at"`

      - `"request_content_type"`

      - `"response_content_type"`

      - `"success"`

      - `"cached"`

      - `"provider"`

      - `"model"`

      - `"cost"`

      - `"tokens"`

      - `"tokens_in"`

      - `"tokens_out"`

      - `"duration"`

      - `"feedback"`

    - `operator: "eq" or "contains" or "lt" or "gt"`

      - `"eq"`

      - `"contains"`

      - `"lt"`

      - `"gt"`

    - `value: array of string or number or boolean`

      - `string`

      - `number`

      - `boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

### Dataset Update Response

- `DatasetUpdateResponse object { id, created_at, enable, 4 more }`

  - `id: string`

  - `created_at: string`

  - `enable: boolean`

  - `filters: array of object { key, operator, value }`

    - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

      - `"created_at"`

      - `"request_content_type"`

      - `"response_content_type"`

      - `"success"`

      - `"cached"`

      - `"provider"`

      - `"model"`

      - `"cost"`

      - `"tokens"`

      - `"tokens_in"`

      - `"tokens_out"`

      - `"duration"`

      - `"feedback"`

    - `operator: "eq" or "contains" or "lt" or "gt"`

      - `"eq"`

      - `"contains"`

      - `"lt"`

      - `"gt"`

    - `value: array of string or number or boolean`

      - `string`

      - `number`

      - `boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

### Dataset Delete Response

- `DatasetDeleteResponse object { id, created_at, enable, 4 more }`

  - `id: string`

  - `created_at: string`

  - `enable: boolean`

  - `filters: array of object { key, operator, value }`

    - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

      - `"created_at"`

      - `"request_content_type"`

      - `"response_content_type"`

      - `"success"`

      - `"cached"`

      - `"provider"`

      - `"model"`

      - `"cost"`

      - `"tokens"`

      - `"tokens_in"`

      - `"tokens_out"`

      - `"duration"`

      - `"feedback"`

    - `operator: "eq" or "contains" or "lt" or "gt"`

      - `"eq"`

      - `"contains"`

      - `"lt"`

      - `"gt"`

    - `value: array of string or number or boolean`

      - `string`

      - `number`

      - `boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

# Evaluations

## List Evaluations

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/evaluations`

Lists all AI Gateway evaluator types configured for the account.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

### Query Parameters

- `name: optional string`

- `page: optional number`

- `per_page: optional number`

- `processed: optional boolean`

- `search: optional string`

  Search by id, name

### Returns

- `result: array of object { id, created_at, datasets, 6 more }`

  - `id: string`

  - `created_at: string`

  - `datasets: array of object { id, account_id, account_tag, 6 more }`

    - `id: string`

    - `account_id: string`

    - `account_tag: string`

    - `created_at: string`

    - `enable: boolean`

    - `filters: array of object { key, operator, value }`

      - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

        - `"created_at"`

        - `"request_content_type"`

        - `"response_content_type"`

        - `"success"`

        - `"cached"`

        - `"provider"`

        - `"model"`

        - `"cost"`

        - `"tokens"`

        - `"tokens_in"`

        - `"tokens_out"`

        - `"duration"`

        - `"feedback"`

      - `operator: "eq" or "contains" or "lt" or "gt"`

        - `"eq"`

        - `"contains"`

        - `"lt"`

        - `"gt"`

      - `value: array of string or number or boolean`

        - `string`

        - `number`

        - `boolean`

    - `gateway_id: string`

      gateway id

    - `modified_at: string`

    - `name: string`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

  - `processed: boolean`

  - `results: array of object { id, created_at, evaluation_id, 6 more }`

    - `id: string`

    - `created_at: string`

    - `evaluation_id: string`

    - `evaluation_type_id: string`

    - `modified_at: string`

    - `result: string`

    - `status: number`

    - `status_description: string`

    - `total_logs: number`

  - `total_logs: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/evaluations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "id": "id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "datasets": [
        {
          "id": "id",
          "account_id": "account_id",
          "account_tag": "account_tag",
          "created_at": "2019-12-27T18:11:19.117Z",
          "enable": true,
          "filters": [
            {
              "key": "created_at",
              "operator": "eq",
              "value": [
                "string"
              ]
            }
          ],
          "gateway_id": "my-gateway",
          "modified_at": "2019-12-27T18:11:19.117Z",
          "name": "name"
        }
      ],
      "gateway_id": "my-gateway",
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "processed": true,
      "results": [
        {
          "id": "id",
          "created_at": "2019-12-27T18:11:19.117Z",
          "evaluation_id": "evaluation_id",
          "evaluation_type_id": "evaluation_type_id",
          "modified_at": "2019-12-27T18:11:19.117Z",
          "result": "result",
          "status": 0,
          "status_description": "status_description",
          "total_logs": 0
        }
      ],
      "total_logs": 0
    }
  ],
  "success": true
}
```

## Fetch a Evaluation

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/evaluations/{id}`

Retrieves details for a specific AI Gateway dataset.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

- `id: string`

### Returns

- `result: object { id, created_at, datasets, 6 more }`

  - `id: string`

  - `created_at: string`

  - `datasets: array of object { id, account_id, account_tag, 6 more }`

    - `id: string`

    - `account_id: string`

    - `account_tag: string`

    - `created_at: string`

    - `enable: boolean`

    - `filters: array of object { key, operator, value }`

      - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

        - `"created_at"`

        - `"request_content_type"`

        - `"response_content_type"`

        - `"success"`

        - `"cached"`

        - `"provider"`

        - `"model"`

        - `"cost"`

        - `"tokens"`

        - `"tokens_in"`

        - `"tokens_out"`

        - `"duration"`

        - `"feedback"`

      - `operator: "eq" or "contains" or "lt" or "gt"`

        - `"eq"`

        - `"contains"`

        - `"lt"`

        - `"gt"`

      - `value: array of string or number or boolean`

        - `string`

        - `number`

        - `boolean`

    - `gateway_id: string`

      gateway id

    - `modified_at: string`

    - `name: string`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

  - `processed: boolean`

  - `results: array of object { id, created_at, evaluation_id, 6 more }`

    - `id: string`

    - `created_at: string`

    - `evaluation_id: string`

    - `evaluation_type_id: string`

    - `modified_at: string`

    - `result: string`

    - `status: number`

    - `status_description: string`

    - `total_logs: number`

  - `total_logs: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/evaluations/$ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "datasets": [
      {
        "id": "id",
        "account_id": "account_id",
        "account_tag": "account_tag",
        "created_at": "2019-12-27T18:11:19.117Z",
        "enable": true,
        "filters": [
          {
            "key": "created_at",
            "operator": "eq",
            "value": [
              "string"
            ]
          }
        ],
        "gateway_id": "my-gateway",
        "modified_at": "2019-12-27T18:11:19.117Z",
        "name": "name"
      }
    ],
    "gateway_id": "my-gateway",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "processed": true,
    "results": [
      {
        "id": "id",
        "created_at": "2019-12-27T18:11:19.117Z",
        "evaluation_id": "evaluation_id",
        "evaluation_type_id": "evaluation_type_id",
        "modified_at": "2019-12-27T18:11:19.117Z",
        "result": "result",
        "status": 0,
        "status_description": "status_description",
        "total_logs": 0
      }
    ],
    "total_logs": 0
  },
  "success": true
}
```

## Create a new Evaluation

**post** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/evaluations`

Creates a new AI Gateway.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

### Body Parameters

- `dataset_ids: array of string`

- `evaluation_type_ids: array of string`

- `name: string`

### Returns

- `result: object { id, created_at, datasets, 6 more }`

  - `id: string`

  - `created_at: string`

  - `datasets: array of object { id, account_id, account_tag, 6 more }`

    - `id: string`

    - `account_id: string`

    - `account_tag: string`

    - `created_at: string`

    - `enable: boolean`

    - `filters: array of object { key, operator, value }`

      - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

        - `"created_at"`

        - `"request_content_type"`

        - `"response_content_type"`

        - `"success"`

        - `"cached"`

        - `"provider"`

        - `"model"`

        - `"cost"`

        - `"tokens"`

        - `"tokens_in"`

        - `"tokens_out"`

        - `"duration"`

        - `"feedback"`

      - `operator: "eq" or "contains" or "lt" or "gt"`

        - `"eq"`

        - `"contains"`

        - `"lt"`

        - `"gt"`

      - `value: array of string or number or boolean`

        - `string`

        - `number`

        - `boolean`

    - `gateway_id: string`

      gateway id

    - `modified_at: string`

    - `name: string`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

  - `processed: boolean`

  - `results: array of object { id, created_at, evaluation_id, 6 more }`

    - `id: string`

    - `created_at: string`

    - `evaluation_id: string`

    - `evaluation_type_id: string`

    - `modified_at: string`

    - `result: string`

    - `status: number`

    - `status_description: string`

    - `total_logs: number`

  - `total_logs: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/evaluations \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "dataset_ids": [
            "string"
          ],
          "evaluation_type_ids": [
            "string"
          ],
          "name": "name"
        }'
```

#### Response

```json
{
  "result": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "datasets": [
      {
        "id": "id",
        "account_id": "account_id",
        "account_tag": "account_tag",
        "created_at": "2019-12-27T18:11:19.117Z",
        "enable": true,
        "filters": [
          {
            "key": "created_at",
            "operator": "eq",
            "value": [
              "string"
            ]
          }
        ],
        "gateway_id": "my-gateway",
        "modified_at": "2019-12-27T18:11:19.117Z",
        "name": "name"
      }
    ],
    "gateway_id": "my-gateway",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "processed": true,
    "results": [
      {
        "id": "id",
        "created_at": "2019-12-27T18:11:19.117Z",
        "evaluation_id": "evaluation_id",
        "evaluation_type_id": "evaluation_type_id",
        "modified_at": "2019-12-27T18:11:19.117Z",
        "result": "result",
        "status": 0,
        "status_description": "status_description",
        "total_logs": 0
      }
    ],
    "total_logs": 0
  },
  "success": true
}
```

## Delete a Evaluation

**delete** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/evaluations/{id}`

Deletes an AI Gateway dataset.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

- `id: string`

### Returns

- `result: object { id, created_at, datasets, 6 more }`

  - `id: string`

  - `created_at: string`

  - `datasets: array of object { id, account_id, account_tag, 6 more }`

    - `id: string`

    - `account_id: string`

    - `account_tag: string`

    - `created_at: string`

    - `enable: boolean`

    - `filters: array of object { key, operator, value }`

      - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

        - `"created_at"`

        - `"request_content_type"`

        - `"response_content_type"`

        - `"success"`

        - `"cached"`

        - `"provider"`

        - `"model"`

        - `"cost"`

        - `"tokens"`

        - `"tokens_in"`

        - `"tokens_out"`

        - `"duration"`

        - `"feedback"`

      - `operator: "eq" or "contains" or "lt" or "gt"`

        - `"eq"`

        - `"contains"`

        - `"lt"`

        - `"gt"`

      - `value: array of string or number or boolean`

        - `string`

        - `number`

        - `boolean`

    - `gateway_id: string`

      gateway id

    - `modified_at: string`

    - `name: string`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

  - `processed: boolean`

  - `results: array of object { id, created_at, evaluation_id, 6 more }`

    - `id: string`

    - `created_at: string`

    - `evaluation_id: string`

    - `evaluation_type_id: string`

    - `modified_at: string`

    - `result: string`

    - `status: number`

    - `status_description: string`

    - `total_logs: number`

  - `total_logs: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/evaluations/$ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "datasets": [
      {
        "id": "id",
        "account_id": "account_id",
        "account_tag": "account_tag",
        "created_at": "2019-12-27T18:11:19.117Z",
        "enable": true,
        "filters": [
          {
            "key": "created_at",
            "operator": "eq",
            "value": [
              "string"
            ]
          }
        ],
        "gateway_id": "my-gateway",
        "modified_at": "2019-12-27T18:11:19.117Z",
        "name": "name"
      }
    ],
    "gateway_id": "my-gateway",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "processed": true,
    "results": [
      {
        "id": "id",
        "created_at": "2019-12-27T18:11:19.117Z",
        "evaluation_id": "evaluation_id",
        "evaluation_type_id": "evaluation_type_id",
        "modified_at": "2019-12-27T18:11:19.117Z",
        "result": "result",
        "status": 0,
        "status_description": "status_description",
        "total_logs": 0
      }
    ],
    "total_logs": 0
  },
  "success": true
}
```

## Domain Types

### Evaluation List Response

- `EvaluationListResponse object { id, created_at, datasets, 6 more }`

  - `id: string`

  - `created_at: string`

  - `datasets: array of object { id, account_id, account_tag, 6 more }`

    - `id: string`

    - `account_id: string`

    - `account_tag: string`

    - `created_at: string`

    - `enable: boolean`

    - `filters: array of object { key, operator, value }`

      - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

        - `"created_at"`

        - `"request_content_type"`

        - `"response_content_type"`

        - `"success"`

        - `"cached"`

        - `"provider"`

        - `"model"`

        - `"cost"`

        - `"tokens"`

        - `"tokens_in"`

        - `"tokens_out"`

        - `"duration"`

        - `"feedback"`

      - `operator: "eq" or "contains" or "lt" or "gt"`

        - `"eq"`

        - `"contains"`

        - `"lt"`

        - `"gt"`

      - `value: array of string or number or boolean`

        - `string`

        - `number`

        - `boolean`

    - `gateway_id: string`

      gateway id

    - `modified_at: string`

    - `name: string`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

  - `processed: boolean`

  - `results: array of object { id, created_at, evaluation_id, 6 more }`

    - `id: string`

    - `created_at: string`

    - `evaluation_id: string`

    - `evaluation_type_id: string`

    - `modified_at: string`

    - `result: string`

    - `status: number`

    - `status_description: string`

    - `total_logs: number`

  - `total_logs: number`

### Evaluation Get Response

- `EvaluationGetResponse object { id, created_at, datasets, 6 more }`

  - `id: string`

  - `created_at: string`

  - `datasets: array of object { id, account_id, account_tag, 6 more }`

    - `id: string`

    - `account_id: string`

    - `account_tag: string`

    - `created_at: string`

    - `enable: boolean`

    - `filters: array of object { key, operator, value }`

      - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

        - `"created_at"`

        - `"request_content_type"`

        - `"response_content_type"`

        - `"success"`

        - `"cached"`

        - `"provider"`

        - `"model"`

        - `"cost"`

        - `"tokens"`

        - `"tokens_in"`

        - `"tokens_out"`

        - `"duration"`

        - `"feedback"`

      - `operator: "eq" or "contains" or "lt" or "gt"`

        - `"eq"`

        - `"contains"`

        - `"lt"`

        - `"gt"`

      - `value: array of string or number or boolean`

        - `string`

        - `number`

        - `boolean`

    - `gateway_id: string`

      gateway id

    - `modified_at: string`

    - `name: string`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

  - `processed: boolean`

  - `results: array of object { id, created_at, evaluation_id, 6 more }`

    - `id: string`

    - `created_at: string`

    - `evaluation_id: string`

    - `evaluation_type_id: string`

    - `modified_at: string`

    - `result: string`

    - `status: number`

    - `status_description: string`

    - `total_logs: number`

  - `total_logs: number`

### Evaluation Create Response

- `EvaluationCreateResponse object { id, created_at, datasets, 6 more }`

  - `id: string`

  - `created_at: string`

  - `datasets: array of object { id, account_id, account_tag, 6 more }`

    - `id: string`

    - `account_id: string`

    - `account_tag: string`

    - `created_at: string`

    - `enable: boolean`

    - `filters: array of object { key, operator, value }`

      - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

        - `"created_at"`

        - `"request_content_type"`

        - `"response_content_type"`

        - `"success"`

        - `"cached"`

        - `"provider"`

        - `"model"`

        - `"cost"`

        - `"tokens"`

        - `"tokens_in"`

        - `"tokens_out"`

        - `"duration"`

        - `"feedback"`

      - `operator: "eq" or "contains" or "lt" or "gt"`

        - `"eq"`

        - `"contains"`

        - `"lt"`

        - `"gt"`

      - `value: array of string or number or boolean`

        - `string`

        - `number`

        - `boolean`

    - `gateway_id: string`

      gateway id

    - `modified_at: string`

    - `name: string`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

  - `processed: boolean`

  - `results: array of object { id, created_at, evaluation_id, 6 more }`

    - `id: string`

    - `created_at: string`

    - `evaluation_id: string`

    - `evaluation_type_id: string`

    - `modified_at: string`

    - `result: string`

    - `status: number`

    - `status_description: string`

    - `total_logs: number`

  - `total_logs: number`

### Evaluation Delete Response

- `EvaluationDeleteResponse object { id, created_at, datasets, 6 more }`

  - `id: string`

  - `created_at: string`

  - `datasets: array of object { id, account_id, account_tag, 6 more }`

    - `id: string`

    - `account_id: string`

    - `account_tag: string`

    - `created_at: string`

    - `enable: boolean`

    - `filters: array of object { key, operator, value }`

      - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

        - `"created_at"`

        - `"request_content_type"`

        - `"response_content_type"`

        - `"success"`

        - `"cached"`

        - `"provider"`

        - `"model"`

        - `"cost"`

        - `"tokens"`

        - `"tokens_in"`

        - `"tokens_out"`

        - `"duration"`

        - `"feedback"`

      - `operator: "eq" or "contains" or "lt" or "gt"`

        - `"eq"`

        - `"contains"`

        - `"lt"`

        - `"gt"`

      - `value: array of string or number or boolean`

        - `string`

        - `number`

        - `boolean`

    - `gateway_id: string`

      gateway id

    - `modified_at: string`

    - `name: string`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

  - `processed: boolean`

  - `results: array of object { id, created_at, evaluation_id, 6 more }`

    - `id: string`

    - `created_at: string`

    - `evaluation_id: string`

    - `evaluation_type_id: string`

    - `modified_at: string`

    - `result: string`

    - `status: number`

    - `status_description: string`

    - `total_logs: number`

  - `total_logs: number`

# Dynamic Routing

## List all AI Gateway Dynamic Routes.

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes`

List all AI Gateway Dynamic Routes.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

### Query Parameters

- `page: optional number`

  Page number

- `per_page: optional number`

  Number of routes per page

### Returns

- `data: object { order_by, order_by_direction, page, 2 more }`

  - `order_by: string`

  - `order_by_direction: string`

  - `page: number`

  - `per_page: number`

  - `routes: array of object { id, account_tag, created_at, 6 more }`

    - `id: string`

    - `account_tag: string`

    - `created_at: string`

    - `deployment: object { created_at, deployment_id, version_id }`

      - `created_at: string`

      - `deployment_id: string`

      - `version_id: string`

    - `elements: array of object { id, outputs, type }  or object { id, outputs, properties, type }  or object { id, outputs, type }  or 3 more`

      - `object { id, outputs, type }`

        - `id: string`

        - `outputs: object { next }`

          - `next: object { elementId }`

            - `elementId: string`

        - `type: "start"`

          - `"start"`

      - `object { id, outputs, properties, type }`

        - `id: string`

        - `outputs: object { false, true }`

          - `false: object { elementId }`

            - `elementId: string`

          - `true: object { elementId }`

            - `elementId: string`

        - `properties: object { conditions }`

          - `conditions: optional unknown`

        - `type: "conditional"`

          - `"conditional"`

      - `object { id, outputs, type }`

        - `id: string`

        - `outputs: map[object { elementId } ]`

          - `elementId: string`

        - `type: "percentage"`

          - `"percentage"`

      - `object { id, outputs, properties, type }`

        - `id: string`

        - `outputs: object { fallback, success }`

          - `fallback: object { elementId }`

            - `elementId: string`

          - `success: object { elementId }`

            - `elementId: string`

        - `properties: object { key, limit, limitType, window }`

          - `key: string`

          - `limit: number`

          - `limitType: "count" or "cost"`

            - `"count"`

            - `"cost"`

          - `window: number`

        - `type: "rate"`

          - `"rate"`

      - `object { id, outputs, properties, type }`

        - `id: string`

        - `outputs: object { fallback, success }`

          - `fallback: object { elementId }`

            - `elementId: string`

          - `success: object { elementId }`

            - `elementId: string`

        - `properties: object { model, provider, retries, timeout }`

          - `model: string`

          - `provider: string`

          - `retries: number`

          - `timeout: number`

        - `type: "model"`

          - `"model"`

      - `object { id, outputs, type }`

        - `id: string`

        - `outputs: map[object { elementId } ]`

          - `elementId: string`

        - `type: "end"`

          - `"end"`

    - `gateway_id: string`

    - `modified_at: string`

    - `name: string`

    - `version: object { active, created_at, data, 2 more }`

      - `active: "true" or "false"`

        - `"true"`

        - `"false"`

      - `created_at: string`

      - `data: string`

      - `version_id: string`

      - `is_valid: optional boolean`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/routes \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "order_by": "order_by",
    "order_by_direction": "order_by_direction",
    "page": 0,
    "per_page": 0,
    "routes": [
      {
        "id": "id",
        "account_tag": "account_tag",
        "created_at": "2019-12-27T18:11:19.117Z",
        "deployment": {
          "created_at": "created_at",
          "deployment_id": "deployment_id",
          "version_id": "version_id"
        },
        "elements": [
          {
            "id": "id",
            "outputs": {
              "next": {
                "elementId": "elementId"
              }
            },
            "type": "start"
          }
        ],
        "gateway_id": "gateway_id",
        "modified_at": "2019-12-27T18:11:19.117Z",
        "name": "name",
        "version": {
          "active": "true",
          "created_at": "created_at",
          "data": "data",
          "version_id": "version_id",
          "is_valid": true
        }
      }
    ]
  },
  "success": true
}
```

## Get an AI Gateway Dynamic Route.

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}`

Get an AI Gateway Dynamic Route.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

- `id: string`

### Returns

- `result: object { id, created_at, deployment, 5 more }`

  - `id: string`

  - `created_at: string`

  - `deployment: object { created_at, deployment_id, version_id }`

    - `created_at: string`

    - `deployment_id: string`

    - `version_id: string`

  - `elements: array of object { id, outputs, type }  or object { id, outputs, properties, type }  or object { id, outputs, type }  or 3 more`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: object { next }`

        - `next: object { elementId }`

          - `elementId: string`

      - `type: "start"`

        - `"start"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { false, true }`

        - `false: object { elementId }`

          - `elementId: string`

        - `true: object { elementId }`

          - `elementId: string`

      - `properties: object { conditions }`

        - `conditions: optional unknown`

      - `type: "conditional"`

        - `"conditional"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "percentage"`

        - `"percentage"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { key, limit, limitType, window }`

        - `key: string`

        - `limit: number`

        - `limitType: "count" or "cost"`

          - `"count"`

          - `"cost"`

        - `window: number`

      - `type: "rate"`

        - `"rate"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { model, provider, retries, timeout }`

        - `model: string`

        - `provider: string`

        - `retries: number`

        - `timeout: number`

      - `type: "model"`

        - `"model"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "end"`

        - `"end"`

  - `gateway_id: string`

  - `modified_at: string`

  - `name: string`

  - `version: object { active, created_at, data, 2 more }`

    - `active: "true" or "false"`

      - `"true"`

      - `"false"`

    - `created_at: string`

    - `data: string`

    - `version_id: string`

    - `is_valid: optional boolean`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/routes/$ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "deployment": {
      "created_at": "created_at",
      "deployment_id": "deployment_id",
      "version_id": "version_id"
    },
    "elements": [
      {
        "id": "id",
        "outputs": {
          "next": {
            "elementId": "elementId"
          }
        },
        "type": "start"
      }
    ],
    "gateway_id": "gateway_id",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "version": {
      "active": "true",
      "created_at": "created_at",
      "data": "data",
      "version_id": "version_id",
      "is_valid": true
    }
  },
  "success": true
}
```

## Create a new AI Gateway Dynamic Route.

**post** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes`

Create a new AI Gateway Dynamic Route.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

### Body Parameters

- `elements: array of object { id, outputs, type }  or object { id, outputs, properties, type }  or object { id, outputs, type }  or 3 more`

  - `object { id, outputs, type }`

    - `id: string`

    - `outputs: object { next }`

      - `next: object { elementId }`

        - `elementId: string`

    - `type: "start"`

      - `"start"`

  - `object { id, outputs, properties, type }`

    - `id: string`

    - `outputs: object { false, true }`

      - `false: object { elementId }`

        - `elementId: string`

      - `true: object { elementId }`

        - `elementId: string`

    - `properties: object { conditions }`

      - `conditions: optional unknown`

    - `type: "conditional"`

      - `"conditional"`

  - `object { id, outputs, type }`

    - `id: string`

    - `outputs: map[object { elementId } ]`

      - `elementId: string`

    - `type: "percentage"`

      - `"percentage"`

  - `object { id, outputs, properties, type }`

    - `id: string`

    - `outputs: object { fallback, success }`

      - `fallback: object { elementId }`

        - `elementId: string`

      - `success: object { elementId }`

        - `elementId: string`

    - `properties: object { key, limit, limitType, window }`

      - `key: string`

      - `limit: number`

      - `limitType: "count" or "cost"`

        - `"count"`

        - `"cost"`

      - `window: number`

    - `type: "rate"`

      - `"rate"`

  - `object { id, outputs, properties, type }`

    - `id: string`

    - `outputs: object { fallback, success }`

      - `fallback: object { elementId }`

        - `elementId: string`

      - `success: object { elementId }`

        - `elementId: string`

    - `properties: object { model, provider, retries, timeout }`

      - `model: string`

      - `provider: string`

      - `retries: number`

      - `timeout: number`

    - `type: "model"`

      - `"model"`

  - `object { id, outputs, type }`

    - `id: string`

    - `outputs: map[object { elementId } ]`

      - `elementId: string`

    - `type: "end"`

      - `"end"`

- `name: string`

### Returns

- `result: object { id, created_at, deployment, 5 more }`

  - `id: string`

  - `created_at: string`

  - `deployment: object { created_at, deployment_id, version_id }`

    - `created_at: string`

    - `deployment_id: string`

    - `version_id: string`

  - `elements: array of object { id, outputs, type }  or object { id, outputs, properties, type }  or object { id, outputs, type }  or 3 more`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: object { next }`

        - `next: object { elementId }`

          - `elementId: string`

      - `type: "start"`

        - `"start"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { false, true }`

        - `false: object { elementId }`

          - `elementId: string`

        - `true: object { elementId }`

          - `elementId: string`

      - `properties: object { conditions }`

        - `conditions: optional unknown`

      - `type: "conditional"`

        - `"conditional"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "percentage"`

        - `"percentage"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { key, limit, limitType, window }`

        - `key: string`

        - `limit: number`

        - `limitType: "count" or "cost"`

          - `"count"`

          - `"cost"`

        - `window: number`

      - `type: "rate"`

        - `"rate"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { model, provider, retries, timeout }`

        - `model: string`

        - `provider: string`

        - `retries: number`

        - `timeout: number`

      - `type: "model"`

        - `"model"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "end"`

        - `"end"`

  - `gateway_id: string`

  - `modified_at: string`

  - `name: string`

  - `version: object { active, created_at, data, 2 more }`

    - `active: "true" or "false"`

      - `"true"`

      - `"false"`

    - `created_at: string`

    - `data: string`

    - `version_id: string`

    - `is_valid: optional boolean`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/routes \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "elements": [
            {
              "id": "id",
              "outputs": {
                "next": {
                  "elementId": "elementId"
                }
              },
              "type": "start"
            }
          ],
          "name": "name"
        }'
```

#### Response

```json
{
  "result": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "deployment": {
      "created_at": "created_at",
      "deployment_id": "deployment_id",
      "version_id": "version_id"
    },
    "elements": [
      {
        "id": "id",
        "outputs": {
          "next": {
            "elementId": "elementId"
          }
        },
        "type": "start"
      }
    ],
    "gateway_id": "gateway_id",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "version": {
      "active": "true",
      "created_at": "created_at",
      "data": "data",
      "version_id": "version_id",
      "is_valid": true
    }
  },
  "success": true
}
```

## Update an AI Gateway Dynamic Route.

**patch** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}`

Update an AI Gateway Dynamic Route.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

- `id: string`

### Body Parameters

- `name: string`

### Returns

- `route: object { id, account_tag, created_at, 6 more }`

  - `id: string`

  - `account_tag: string`

  - `created_at: string`

  - `deployment: object { created_at, deployment_id, version_id }`

    - `created_at: string`

    - `deployment_id: string`

    - `version_id: string`

  - `elements: array of object { id, outputs, type }  or object { id, outputs, properties, type }  or object { id, outputs, type }  or 3 more`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: object { next }`

        - `next: object { elementId }`

          - `elementId: string`

      - `type: "start"`

        - `"start"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { false, true }`

        - `false: object { elementId }`

          - `elementId: string`

        - `true: object { elementId }`

          - `elementId: string`

      - `properties: object { conditions }`

        - `conditions: optional unknown`

      - `type: "conditional"`

        - `"conditional"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "percentage"`

        - `"percentage"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { key, limit, limitType, window }`

        - `key: string`

        - `limit: number`

        - `limitType: "count" or "cost"`

          - `"count"`

          - `"cost"`

        - `window: number`

      - `type: "rate"`

        - `"rate"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { model, provider, retries, timeout }`

        - `model: string`

        - `provider: string`

        - `retries: number`

        - `timeout: number`

      - `type: "model"`

        - `"model"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "end"`

        - `"end"`

  - `gateway_id: string`

  - `modified_at: string`

  - `name: string`

  - `version: object { active, created_at, data, 2 more }`

    - `active: "true" or "false"`

      - `"true"`

      - `"false"`

    - `created_at: string`

    - `data: string`

    - `version_id: string`

    - `is_valid: optional boolean`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/routes/$ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Route Name"
        }'
```

#### Response

```json
{
  "route": {
    "id": "id",
    "account_tag": "account_tag",
    "created_at": "2019-12-27T18:11:19.117Z",
    "deployment": {
      "created_at": "created_at",
      "deployment_id": "deployment_id",
      "version_id": "version_id"
    },
    "elements": [
      {
        "id": "id",
        "outputs": {
          "next": {
            "elementId": "elementId"
          }
        },
        "type": "start"
      }
    ],
    "gateway_id": "gateway_id",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "version": {
      "active": "true",
      "created_at": "created_at",
      "data": "data",
      "version_id": "version_id",
      "is_valid": true
    }
  },
  "success": true
}
```

## Delete an AI Gateway Dynamic Route.

**delete** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}`

Delete an AI Gateway Dynamic Route.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

- `id: string`

### Returns

- `result: object { id, created_at, elements, 3 more }`

  - `id: string`

  - `created_at: string`

  - `elements: array of object { id, outputs, type }  or object { id, outputs, properties, type }  or object { id, outputs, type }  or 3 more`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: object { next }`

        - `next: object { elementId }`

          - `elementId: string`

      - `type: "start"`

        - `"start"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { false, true }`

        - `false: object { elementId }`

          - `elementId: string`

        - `true: object { elementId }`

          - `elementId: string`

      - `properties: object { conditions }`

        - `conditions: optional unknown`

      - `type: "conditional"`

        - `"conditional"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "percentage"`

        - `"percentage"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { key, limit, limitType, window }`

        - `key: string`

        - `limit: number`

        - `limitType: "count" or "cost"`

          - `"count"`

          - `"cost"`

        - `window: number`

      - `type: "rate"`

        - `"rate"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { model, provider, retries, timeout }`

        - `model: string`

        - `provider: string`

        - `retries: number`

        - `timeout: number`

      - `type: "model"`

        - `"model"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "end"`

        - `"end"`

  - `gateway_id: string`

  - `modified_at: string`

  - `name: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/routes/$ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "elements": [
      {
        "id": "id",
        "outputs": {
          "next": {
            "elementId": "elementId"
          }
        },
        "type": "start"
      }
    ],
    "gateway_id": "gateway_id",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name"
  },
  "success": true
}
```

## List all AI Gateway Dynamic Route Deployments.

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}/deployments`

List all AI Gateway Dynamic Route Deployments.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

- `id: string`

### Returns

- `data: object { deployments, order_by, order_by_direction, 2 more }`

  - `deployments: array of object { created_at, deployment_id, version_id }`

    - `created_at: string`

    - `deployment_id: string`

    - `version_id: string`

  - `order_by: string`

  - `order_by_direction: string`

  - `page: number`

  - `per_page: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/routes/$ID/deployments \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "deployments": [
      {
        "created_at": "created_at",
        "deployment_id": "deployment_id",
        "version_id": "version_id"
      }
    ],
    "order_by": "order_by",
    "order_by_direction": "order_by_direction",
    "page": 0,
    "per_page": 0
  },
  "success": true
}
```

## Create a new AI Gateway Dynamic Route Deployment.

**post** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}/deployments`

Create a new AI Gateway Dynamic Route Deployment.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

- `id: string`

### Body Parameters

- `version_id: string`

### Returns

- `result: object { id, created_at, elements, 3 more }`

  - `id: string`

  - `created_at: string`

  - `elements: array of object { id, outputs, type }  or object { id, outputs, properties, type }  or object { id, outputs, type }  or 3 more`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: object { next }`

        - `next: object { elementId }`

          - `elementId: string`

      - `type: "start"`

        - `"start"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { false, true }`

        - `false: object { elementId }`

          - `elementId: string`

        - `true: object { elementId }`

          - `elementId: string`

      - `properties: object { conditions }`

        - `conditions: optional unknown`

      - `type: "conditional"`

        - `"conditional"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "percentage"`

        - `"percentage"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { key, limit, limitType, window }`

        - `key: string`

        - `limit: number`

        - `limitType: "count" or "cost"`

          - `"count"`

          - `"cost"`

        - `window: number`

      - `type: "rate"`

        - `"rate"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { model, provider, retries, timeout }`

        - `model: string`

        - `provider: string`

        - `retries: number`

        - `timeout: number`

      - `type: "model"`

        - `"model"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "end"`

        - `"end"`

  - `gateway_id: string`

  - `modified_at: string`

  - `name: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/routes/$ID/deployments \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "version_id": "54442216"
        }'
```

#### Response

```json
{
  "result": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "elements": [
      {
        "id": "id",
        "outputs": {
          "next": {
            "elementId": "elementId"
          }
        },
        "type": "start"
      }
    ],
    "gateway_id": "gateway_id",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name"
  },
  "success": true
}
```

## List all AI Gateway Dynamic Route Versions.

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}/versions`

List all AI Gateway Dynamic Route Versions.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

- `id: string`

### Returns

- `data: object { order_by, order_by_direction, page, 2 more }`

  - `order_by: string`

  - `order_by_direction: string`

  - `page: number`

  - `per_page: number`

  - `versions: array of object { active, created_at, data, 2 more }`

    - `active: "true" or "false"`

      - `"true"`

      - `"false"`

    - `created_at: string`

    - `data: string`

    - `version_id: string`

    - `is_valid: optional boolean`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/routes/$ID/versions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "order_by": "order_by",
    "order_by_direction": "order_by_direction",
    "page": 0,
    "per_page": 0,
    "versions": [
      {
        "active": "true",
        "created_at": "created_at",
        "data": "data",
        "version_id": "version_id",
        "is_valid": true
      }
    ]
  },
  "success": true
}
```

## Create a new AI Gateway Dynamic Route Version.

**post** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}/versions`

Create a new AI Gateway Dynamic Route Version.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

- `id: string`

### Body Parameters

- `elements: array of object { id, outputs, type }  or object { id, outputs, properties, type }  or object { id, outputs, type }  or 3 more`

  - `object { id, outputs, type }`

    - `id: string`

    - `outputs: object { next }`

      - `next: object { elementId }`

        - `elementId: string`

    - `type: "start"`

      - `"start"`

  - `object { id, outputs, properties, type }`

    - `id: string`

    - `outputs: object { false, true }`

      - `false: object { elementId }`

        - `elementId: string`

      - `true: object { elementId }`

        - `elementId: string`

    - `properties: object { conditions }`

      - `conditions: optional unknown`

    - `type: "conditional"`

      - `"conditional"`

  - `object { id, outputs, type }`

    - `id: string`

    - `outputs: map[object { elementId } ]`

      - `elementId: string`

    - `type: "percentage"`

      - `"percentage"`

  - `object { id, outputs, properties, type }`

    - `id: string`

    - `outputs: object { fallback, success }`

      - `fallback: object { elementId }`

        - `elementId: string`

      - `success: object { elementId }`

        - `elementId: string`

    - `properties: object { key, limit, limitType, window }`

      - `key: string`

      - `limit: number`

      - `limitType: "count" or "cost"`

        - `"count"`

        - `"cost"`

      - `window: number`

    - `type: "rate"`

      - `"rate"`

  - `object { id, outputs, properties, type }`

    - `id: string`

    - `outputs: object { fallback, success }`

      - `fallback: object { elementId }`

        - `elementId: string`

      - `success: object { elementId }`

        - `elementId: string`

    - `properties: object { model, provider, retries, timeout }`

      - `model: string`

      - `provider: string`

      - `retries: number`

      - `timeout: number`

    - `type: "model"`

      - `"model"`

  - `object { id, outputs, type }`

    - `id: string`

    - `outputs: map[object { elementId } ]`

      - `elementId: string`

    - `type: "end"`

      - `"end"`

### Returns

- `result: object { id, created_at, elements, 3 more }`

  - `id: string`

  - `created_at: string`

  - `elements: array of object { id, outputs, type }  or object { id, outputs, properties, type }  or object { id, outputs, type }  or 3 more`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: object { next }`

        - `next: object { elementId }`

          - `elementId: string`

      - `type: "start"`

        - `"start"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { false, true }`

        - `false: object { elementId }`

          - `elementId: string`

        - `true: object { elementId }`

          - `elementId: string`

      - `properties: object { conditions }`

        - `conditions: optional unknown`

      - `type: "conditional"`

        - `"conditional"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "percentage"`

        - `"percentage"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { key, limit, limitType, window }`

        - `key: string`

        - `limit: number`

        - `limitType: "count" or "cost"`

          - `"count"`

          - `"cost"`

        - `window: number`

      - `type: "rate"`

        - `"rate"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { model, provider, retries, timeout }`

        - `model: string`

        - `provider: string`

        - `retries: number`

        - `timeout: number`

      - `type: "model"`

        - `"model"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "end"`

        - `"end"`

  - `gateway_id: string`

  - `modified_at: string`

  - `name: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/routes/$ID/versions \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "elements": [
            {
              "id": "id",
              "outputs": {
                "next": {
                  "elementId": "elementId"
                }
              },
              "type": "start"
            }
          ]
        }'
```

#### Response

```json
{
  "result": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "elements": [
      {
        "id": "id",
        "outputs": {
          "next": {
            "elementId": "elementId"
          }
        },
        "type": "start"
      }
    ],
    "gateway_id": "gateway_id",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name"
  },
  "success": true
}
```

## Get an AI Gateway Dynamic Route Version.

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}/versions/{version_id}`

Get an AI Gateway Dynamic Route Version.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

- `id: string`

- `version_id: string`

### Returns

- `result: object { id, active, created_at, 7 more }`

  - `id: string`

  - `active: "true" or "false"`

    - `"true"`

    - `"false"`

  - `created_at: string`

  - `data: string`

  - `elements: array of object { id, outputs, type }  or object { id, outputs, properties, type }  or object { id, outputs, type }  or 3 more`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: object { next }`

        - `next: object { elementId }`

          - `elementId: string`

      - `type: "start"`

        - `"start"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { false, true }`

        - `false: object { elementId }`

          - `elementId: string`

        - `true: object { elementId }`

          - `elementId: string`

      - `properties: object { conditions }`

        - `conditions: optional unknown`

      - `type: "conditional"`

        - `"conditional"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "percentage"`

        - `"percentage"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { key, limit, limitType, window }`

        - `key: string`

        - `limit: number`

        - `limitType: "count" or "cost"`

          - `"count"`

          - `"cost"`

        - `window: number`

      - `type: "rate"`

        - `"rate"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { model, provider, retries, timeout }`

        - `model: string`

        - `provider: string`

        - `retries: number`

        - `timeout: number`

      - `type: "model"`

        - `"model"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "end"`

        - `"end"`

  - `gateway_id: string`

  - `modified_at: string`

  - `name: string`

  - `version_id: string`

  - `is_valid: optional boolean`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/routes/$ID/versions/$VERSION_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "id",
    "active": "true",
    "created_at": "created_at",
    "data": "data",
    "elements": [
      {
        "id": "id",
        "outputs": {
          "next": {
            "elementId": "elementId"
          }
        },
        "type": "start"
      }
    ],
    "gateway_id": "gateway_id",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "version_id": "version_id",
    "is_valid": true
  },
  "success": true
}
```

## Domain Types

### Dynamic Routing List Response

- `DynamicRoutingListResponse object { data, success }`

  - `data: object { order_by, order_by_direction, page, 2 more }`

    - `order_by: string`

    - `order_by_direction: string`

    - `page: number`

    - `per_page: number`

    - `routes: array of object { id, account_tag, created_at, 6 more }`

      - `id: string`

      - `account_tag: string`

      - `created_at: string`

      - `deployment: object { created_at, deployment_id, version_id }`

        - `created_at: string`

        - `deployment_id: string`

        - `version_id: string`

      - `elements: array of object { id, outputs, type }  or object { id, outputs, properties, type }  or object { id, outputs, type }  or 3 more`

        - `object { id, outputs, type }`

          - `id: string`

          - `outputs: object { next }`

            - `next: object { elementId }`

              - `elementId: string`

          - `type: "start"`

            - `"start"`

        - `object { id, outputs, properties, type }`

          - `id: string`

          - `outputs: object { false, true }`

            - `false: object { elementId }`

              - `elementId: string`

            - `true: object { elementId }`

              - `elementId: string`

          - `properties: object { conditions }`

            - `conditions: optional unknown`

          - `type: "conditional"`

            - `"conditional"`

        - `object { id, outputs, type }`

          - `id: string`

          - `outputs: map[object { elementId } ]`

            - `elementId: string`

          - `type: "percentage"`

            - `"percentage"`

        - `object { id, outputs, properties, type }`

          - `id: string`

          - `outputs: object { fallback, success }`

            - `fallback: object { elementId }`

              - `elementId: string`

            - `success: object { elementId }`

              - `elementId: string`

          - `properties: object { key, limit, limitType, window }`

            - `key: string`

            - `limit: number`

            - `limitType: "count" or "cost"`

              - `"count"`

              - `"cost"`

            - `window: number`

          - `type: "rate"`

            - `"rate"`

        - `object { id, outputs, properties, type }`

          - `id: string`

          - `outputs: object { fallback, success }`

            - `fallback: object { elementId }`

              - `elementId: string`

            - `success: object { elementId }`

              - `elementId: string`

          - `properties: object { model, provider, retries, timeout }`

            - `model: string`

            - `provider: string`

            - `retries: number`

            - `timeout: number`

          - `type: "model"`

            - `"model"`

        - `object { id, outputs, type }`

          - `id: string`

          - `outputs: map[object { elementId } ]`

            - `elementId: string`

          - `type: "end"`

            - `"end"`

      - `gateway_id: string`

      - `modified_at: string`

      - `name: string`

      - `version: object { active, created_at, data, 2 more }`

        - `active: "true" or "false"`

          - `"true"`

          - `"false"`

        - `created_at: string`

        - `data: string`

        - `version_id: string`

        - `is_valid: optional boolean`

  - `success: boolean`

### Dynamic Routing Get Response

- `DynamicRoutingGetResponse object { id, created_at, deployment, 5 more }`

  - `id: string`

  - `created_at: string`

  - `deployment: object { created_at, deployment_id, version_id }`

    - `created_at: string`

    - `deployment_id: string`

    - `version_id: string`

  - `elements: array of object { id, outputs, type }  or object { id, outputs, properties, type }  or object { id, outputs, type }  or 3 more`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: object { next }`

        - `next: object { elementId }`

          - `elementId: string`

      - `type: "start"`

        - `"start"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { false, true }`

        - `false: object { elementId }`

          - `elementId: string`

        - `true: object { elementId }`

          - `elementId: string`

      - `properties: object { conditions }`

        - `conditions: optional unknown`

      - `type: "conditional"`

        - `"conditional"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "percentage"`

        - `"percentage"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { key, limit, limitType, window }`

        - `key: string`

        - `limit: number`

        - `limitType: "count" or "cost"`

          - `"count"`

          - `"cost"`

        - `window: number`

      - `type: "rate"`

        - `"rate"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { model, provider, retries, timeout }`

        - `model: string`

        - `provider: string`

        - `retries: number`

        - `timeout: number`

      - `type: "model"`

        - `"model"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "end"`

        - `"end"`

  - `gateway_id: string`

  - `modified_at: string`

  - `name: string`

  - `version: object { active, created_at, data, 2 more }`

    - `active: "true" or "false"`

      - `"true"`

      - `"false"`

    - `created_at: string`

    - `data: string`

    - `version_id: string`

    - `is_valid: optional boolean`

### Dynamic Routing Create Response

- `DynamicRoutingCreateResponse object { id, created_at, deployment, 5 more }`

  - `id: string`

  - `created_at: string`

  - `deployment: object { created_at, deployment_id, version_id }`

    - `created_at: string`

    - `deployment_id: string`

    - `version_id: string`

  - `elements: array of object { id, outputs, type }  or object { id, outputs, properties, type }  or object { id, outputs, type }  or 3 more`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: object { next }`

        - `next: object { elementId }`

          - `elementId: string`

      - `type: "start"`

        - `"start"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { false, true }`

        - `false: object { elementId }`

          - `elementId: string`

        - `true: object { elementId }`

          - `elementId: string`

      - `properties: object { conditions }`

        - `conditions: optional unknown`

      - `type: "conditional"`

        - `"conditional"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "percentage"`

        - `"percentage"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { key, limit, limitType, window }`

        - `key: string`

        - `limit: number`

        - `limitType: "count" or "cost"`

          - `"count"`

          - `"cost"`

        - `window: number`

      - `type: "rate"`

        - `"rate"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { model, provider, retries, timeout }`

        - `model: string`

        - `provider: string`

        - `retries: number`

        - `timeout: number`

      - `type: "model"`

        - `"model"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "end"`

        - `"end"`

  - `gateway_id: string`

  - `modified_at: string`

  - `name: string`

  - `version: object { active, created_at, data, 2 more }`

    - `active: "true" or "false"`

      - `"true"`

      - `"false"`

    - `created_at: string`

    - `data: string`

    - `version_id: string`

    - `is_valid: optional boolean`

### Dynamic Routing Update Response

- `DynamicRoutingUpdateResponse object { route, success }`

  - `route: object { id, account_tag, created_at, 6 more }`

    - `id: string`

    - `account_tag: string`

    - `created_at: string`

    - `deployment: object { created_at, deployment_id, version_id }`

      - `created_at: string`

      - `deployment_id: string`

      - `version_id: string`

    - `elements: array of object { id, outputs, type }  or object { id, outputs, properties, type }  or object { id, outputs, type }  or 3 more`

      - `object { id, outputs, type }`

        - `id: string`

        - `outputs: object { next }`

          - `next: object { elementId }`

            - `elementId: string`

        - `type: "start"`

          - `"start"`

      - `object { id, outputs, properties, type }`

        - `id: string`

        - `outputs: object { false, true }`

          - `false: object { elementId }`

            - `elementId: string`

          - `true: object { elementId }`

            - `elementId: string`

        - `properties: object { conditions }`

          - `conditions: optional unknown`

        - `type: "conditional"`

          - `"conditional"`

      - `object { id, outputs, type }`

        - `id: string`

        - `outputs: map[object { elementId } ]`

          - `elementId: string`

        - `type: "percentage"`

          - `"percentage"`

      - `object { id, outputs, properties, type }`

        - `id: string`

        - `outputs: object { fallback, success }`

          - `fallback: object { elementId }`

            - `elementId: string`

          - `success: object { elementId }`

            - `elementId: string`

        - `properties: object { key, limit, limitType, window }`

          - `key: string`

          - `limit: number`

          - `limitType: "count" or "cost"`

            - `"count"`

            - `"cost"`

          - `window: number`

        - `type: "rate"`

          - `"rate"`

      - `object { id, outputs, properties, type }`

        - `id: string`

        - `outputs: object { fallback, success }`

          - `fallback: object { elementId }`

            - `elementId: string`

          - `success: object { elementId }`

            - `elementId: string`

        - `properties: object { model, provider, retries, timeout }`

          - `model: string`

          - `provider: string`

          - `retries: number`

          - `timeout: number`

        - `type: "model"`

          - `"model"`

      - `object { id, outputs, type }`

        - `id: string`

        - `outputs: map[object { elementId } ]`

          - `elementId: string`

        - `type: "end"`

          - `"end"`

    - `gateway_id: string`

    - `modified_at: string`

    - `name: string`

    - `version: object { active, created_at, data, 2 more }`

      - `active: "true" or "false"`

        - `"true"`

        - `"false"`

      - `created_at: string`

      - `data: string`

      - `version_id: string`

      - `is_valid: optional boolean`

  - `success: boolean`

### Dynamic Routing Delete Response

- `DynamicRoutingDeleteResponse object { id, created_at, elements, 3 more }`

  - `id: string`

  - `created_at: string`

  - `elements: array of object { id, outputs, type }  or object { id, outputs, properties, type }  or object { id, outputs, type }  or 3 more`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: object { next }`

        - `next: object { elementId }`

          - `elementId: string`

      - `type: "start"`

        - `"start"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { false, true }`

        - `false: object { elementId }`

          - `elementId: string`

        - `true: object { elementId }`

          - `elementId: string`

      - `properties: object { conditions }`

        - `conditions: optional unknown`

      - `type: "conditional"`

        - `"conditional"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "percentage"`

        - `"percentage"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { key, limit, limitType, window }`

        - `key: string`

        - `limit: number`

        - `limitType: "count" or "cost"`

          - `"count"`

          - `"cost"`

        - `window: number`

      - `type: "rate"`

        - `"rate"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { model, provider, retries, timeout }`

        - `model: string`

        - `provider: string`

        - `retries: number`

        - `timeout: number`

      - `type: "model"`

        - `"model"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "end"`

        - `"end"`

  - `gateway_id: string`

  - `modified_at: string`

  - `name: string`

### Dynamic Routing List Deployments Response

- `DynamicRoutingListDeploymentsResponse object { data, success }`

  - `data: object { deployments, order_by, order_by_direction, 2 more }`

    - `deployments: array of object { created_at, deployment_id, version_id }`

      - `created_at: string`

      - `deployment_id: string`

      - `version_id: string`

    - `order_by: string`

    - `order_by_direction: string`

    - `page: number`

    - `per_page: number`

  - `success: boolean`

### Dynamic Routing Create Deployment Response

- `DynamicRoutingCreateDeploymentResponse object { id, created_at, elements, 3 more }`

  - `id: string`

  - `created_at: string`

  - `elements: array of object { id, outputs, type }  or object { id, outputs, properties, type }  or object { id, outputs, type }  or 3 more`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: object { next }`

        - `next: object { elementId }`

          - `elementId: string`

      - `type: "start"`

        - `"start"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { false, true }`

        - `false: object { elementId }`

          - `elementId: string`

        - `true: object { elementId }`

          - `elementId: string`

      - `properties: object { conditions }`

        - `conditions: optional unknown`

      - `type: "conditional"`

        - `"conditional"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "percentage"`

        - `"percentage"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { key, limit, limitType, window }`

        - `key: string`

        - `limit: number`

        - `limitType: "count" or "cost"`

          - `"count"`

          - `"cost"`

        - `window: number`

      - `type: "rate"`

        - `"rate"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { model, provider, retries, timeout }`

        - `model: string`

        - `provider: string`

        - `retries: number`

        - `timeout: number`

      - `type: "model"`

        - `"model"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "end"`

        - `"end"`

  - `gateway_id: string`

  - `modified_at: string`

  - `name: string`

### Dynamic Routing List Versions Response

- `DynamicRoutingListVersionsResponse object { data, success }`

  - `data: object { order_by, order_by_direction, page, 2 more }`

    - `order_by: string`

    - `order_by_direction: string`

    - `page: number`

    - `per_page: number`

    - `versions: array of object { active, created_at, data, 2 more }`

      - `active: "true" or "false"`

        - `"true"`

        - `"false"`

      - `created_at: string`

      - `data: string`

      - `version_id: string`

      - `is_valid: optional boolean`

  - `success: boolean`

### Dynamic Routing Create Version Response

- `DynamicRoutingCreateVersionResponse object { id, created_at, elements, 3 more }`

  - `id: string`

  - `created_at: string`

  - `elements: array of object { id, outputs, type }  or object { id, outputs, properties, type }  or object { id, outputs, type }  or 3 more`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: object { next }`

        - `next: object { elementId }`

          - `elementId: string`

      - `type: "start"`

        - `"start"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { false, true }`

        - `false: object { elementId }`

          - `elementId: string`

        - `true: object { elementId }`

          - `elementId: string`

      - `properties: object { conditions }`

        - `conditions: optional unknown`

      - `type: "conditional"`

        - `"conditional"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "percentage"`

        - `"percentage"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { key, limit, limitType, window }`

        - `key: string`

        - `limit: number`

        - `limitType: "count" or "cost"`

          - `"count"`

          - `"cost"`

        - `window: number`

      - `type: "rate"`

        - `"rate"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { model, provider, retries, timeout }`

        - `model: string`

        - `provider: string`

        - `retries: number`

        - `timeout: number`

      - `type: "model"`

        - `"model"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "end"`

        - `"end"`

  - `gateway_id: string`

  - `modified_at: string`

  - `name: string`

### Dynamic Routing Get Version Response

- `DynamicRoutingGetVersionResponse object { id, active, created_at, 7 more }`

  - `id: string`

  - `active: "true" or "false"`

    - `"true"`

    - `"false"`

  - `created_at: string`

  - `data: string`

  - `elements: array of object { id, outputs, type }  or object { id, outputs, properties, type }  or object { id, outputs, type }  or 3 more`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: object { next }`

        - `next: object { elementId }`

          - `elementId: string`

      - `type: "start"`

        - `"start"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { false, true }`

        - `false: object { elementId }`

          - `elementId: string`

        - `true: object { elementId }`

          - `elementId: string`

      - `properties: object { conditions }`

        - `conditions: optional unknown`

      - `type: "conditional"`

        - `"conditional"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "percentage"`

        - `"percentage"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { key, limit, limitType, window }`

        - `key: string`

        - `limit: number`

        - `limitType: "count" or "cost"`

          - `"count"`

          - `"cost"`

        - `window: number`

      - `type: "rate"`

        - `"rate"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { model, provider, retries, timeout }`

        - `model: string`

        - `provider: string`

        - `retries: number`

        - `timeout: number`

      - `type: "model"`

        - `"model"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "end"`

        - `"end"`

  - `gateway_id: string`

  - `modified_at: string`

  - `name: string`

  - `version_id: string`

  - `is_valid: optional boolean`

# Provider Configs

## List Provider Configs

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/provider_configs`

Lists all AI Gateway evaluator types configured for the account.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

### Query Parameters

- `page: optional number`

- `per_page: optional number`

### Returns

- `result: array of object { id, alias, default_config, 7 more }`

  - `id: string`

  - `alias: string`

  - `default_config: boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `provider_slug: string`

  - `secret_id: string`

  - `secret_preview: string`

  - `rate_limit: optional number`

  - `rate_limit_period: optional number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/provider_configs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "id": "id",
      "alias": "alias",
      "default_config": true,
      "gateway_id": "my-gateway",
      "modified_at": "2019-12-27T18:11:19.117Z",
      "provider_slug": "provider_slug",
      "secret_id": "secret_id",
      "secret_preview": "secret_preview",
      "rate_limit": 0,
      "rate_limit_period": 0
    }
  ],
  "success": true
}
```

## Create a new Provider Configs

**post** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/provider_configs`

Creates a new AI Gateway.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

### Body Parameters

- `alias: string`

- `default_config: boolean`

- `provider_slug: string`

- `rate_limit: optional number`

- `rate_limit_period: optional number`

- `secret: optional string`

- `secret_id: optional string`

### Returns

- `result: object { id, alias, default_config, 7 more }`

  - `id: string`

  - `alias: string`

  - `default_config: boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `provider_slug: string`

  - `secret_id: string`

  - `secret_preview: string`

  - `rate_limit: optional number`

  - `rate_limit_period: optional number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/provider_configs \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "alias": "alias",
          "default_config": true,
          "provider_slug": "provider_slug"
        }'
```

#### Response

```json
{
  "result": {
    "id": "id",
    "alias": "alias",
    "default_config": true,
    "gateway_id": "my-gateway",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "provider_slug": "provider_slug",
    "secret_id": "secret_id",
    "secret_preview": "secret_preview",
    "rate_limit": 0,
    "rate_limit_period": 0
  },
  "success": true
}
```

## Domain Types

### Provider Config List Response

- `ProviderConfigListResponse object { id, alias, default_config, 7 more }`

  - `id: string`

  - `alias: string`

  - `default_config: boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `provider_slug: string`

  - `secret_id: string`

  - `secret_preview: string`

  - `rate_limit: optional number`

  - `rate_limit_period: optional number`

### Provider Config Create Response

- `ProviderConfigCreateResponse object { id, alias, default_config, 7 more }`

  - `id: string`

  - `alias: string`

  - `default_config: boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `provider_slug: string`

  - `secret_id: string`

  - `secret_preview: string`

  - `rate_limit: optional number`

  - `rate_limit_period: optional number`

# URLs

## Get Gateway URL

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/url/{provider}`

Retrieves the endpoint URL for an AI Gateway.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

- `provider: string`

### Returns

- `result: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/url/$PROVIDER \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": "result",
  "success": true
}
```

## Domain Types

### URL Get Response

- `URLGetResponse = string`

# Billing

## Get credit balance

**get** `/accounts/{account_id}/ai-gateway/billing/credit-balance`

Retrieve the current credit balance, payment method info, and top-up configuration.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { balance, has_default_payment_method, payment_method, 2 more }`

  - `balance: number`

  - `has_default_payment_method: boolean`

  - `payment_method: object { brand, last4 }`

    - `brand: optional string`

    - `last4: optional string`

  - `topup_config: object { amount, disabledReason, error, 2 more }`

    - `amount: number`

    - `disabledReason: string`

    - `error: string`

    - `lastFailedAt: number`

    - `threshold: number`

  - `first_topup_success: optional boolean`

- `success: true`

  - `true`

- `result_info: optional object { has_more, page, per_page, total_count }`

  - `has_more: boolean`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/credit-balance \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "balance": 0,
    "has_default_payment_method": true,
    "payment_method": {
      "brand": "brand",
      "last4": "last4"
    },
    "topup_config": {
      "amount": 0,
      "disabledReason": "disabledReason",
      "error": "error",
      "lastFailedAt": 0,
      "threshold": 0
    },
    "first_topup_success": true
  },
  "success": true,
  "result_info": {
    "has_more": true,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  }
}
```

## Get usage history

**get** `/accounts/{account_id}/ai-gateway/billing/usage-history`

Retrieve aggregated usage meter event summaries for the given time range.

### Path Parameters

- `account_id: string`

### Query Parameters

- `value_grouping_window: "day" or "hour"`

  Grouping window for usage data.

  - `"day"`

  - `"hour"`

- `end_time: optional number`

  End time as Unix timestamp in milliseconds.

- `start_time: optional number`

  Start time as Unix timestamp in milliseconds.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { history }`

  - `history: array of object { id, aggregated_value, end_time, start_time }`

    - `id: string`

    - `aggregated_value: number`

    - `end_time: number`

    - `start_time: number`

- `success: true`

  - `true`

- `result_info: optional object { has_more, page, per_page, total_count }`

  - `has_more: boolean`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/usage-history \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "history": [
      {
        "id": "id",
        "aggregated_value": 0,
        "end_time": 0,
        "start_time": 0
      }
    ]
  },
  "success": true,
  "result_info": {
    "has_more": true,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  }
}
```

## Get invoice history

**get** `/accounts/{account_id}/ai-gateway/billing/invoice-history`

Retrieve a list of past invoices with pagination, optionally filtered by type.

### Path Parameters

- `account_id: string`

### Query Parameters

- `type: optional "auto" or "all" or "manual"`

  Filter invoice type: auto, manual, or all.

  - `"auto"`

  - `"all"`

  - `"manual"`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { invoices, pagination }`

  - `invoices: array of object { amount_due, amount_paid, amount_remaining, 11 more }`

    - `amount_due: number`

    - `amount_paid: number`

    - `amount_remaining: number`

    - `currency: string`

    - `id: optional string`

    - `attempt_count: optional number`

    - `attempted: optional boolean`

    - `auto_advance: optional boolean`

    - `created: optional number`

    - `created_by: optional string`

    - `description: optional string`

    - `invoice_origin: optional string`

    - `invoice_pdf: optional string`

    - `status: optional string`

  - `pagination: object { has_more, page, per_page, total_count }`

    - `has_more: boolean`

    - `page: number`

    - `per_page: number`

    - `total_count: number`

- `success: true`

  - `true`

- `result_info: optional object { has_more, page, per_page, total_count }`

  - `has_more: boolean`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/invoice-history \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "invoices": [
      {
        "amount_due": 0,
        "amount_paid": 0,
        "amount_remaining": 0,
        "currency": "currency",
        "id": "id",
        "attempt_count": 0,
        "attempted": true,
        "auto_advance": true,
        "created": 0,
        "created_by": "created_by",
        "description": "description",
        "invoice_origin": "invoice_origin",
        "invoice_pdf": "invoice_pdf",
        "status": "status"
      }
    ],
    "pagination": {
      "has_more": true,
      "page": 0,
      "per_page": 0,
      "total_count": 0
    }
  },
  "success": true,
  "result_info": {
    "has_more": true,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  }
}
```

## Get invoice preview

**get** `/accounts/{account_id}/ai-gateway/billing/invoice-preview`

Retrieve a preview of the upcoming invoice including line items and tax.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { id, amount_due, amount_paid, 6 more }`

  - `id: string`

  - `amount_due: number`

  - `amount_paid: number`

  - `amount_remaining: number`

  - `currency: string`

  - `invoice_lines: array of object { amount, currency, description, 4 more }`

    - `amount: number`

    - `currency: string`

    - `description: string`

    - `period: object { end, start }`

      - `end: number`

      - `start: number`

    - `pricing: object { unit_amount_decimal }`

      - `unit_amount_decimal: string`

    - `quantity: number`

    - `pretax_credit_amounts: optional array of object { amount, type, credit_balance_transaction, discount }`

      - `amount: number`

      - `type: string`

      - `credit_balance_transaction: optional string`

      - `discount: optional string`

  - `period_end: number`

  - `period_start: number`

  - `status: "draft" or "open" or "paid" or 2 more`

    - `"draft"`

    - `"open"`

    - `"paid"`

    - `"uncollectible"`

    - `"void"`

- `success: true`

  - `true`

- `result_info: optional object { has_more, page, per_page, total_count }`

  - `has_more: boolean`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/invoice-preview \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "id",
    "amount_due": 0,
    "amount_paid": 0,
    "amount_remaining": 0,
    "currency": "currency",
    "invoice_lines": [
      {
        "amount": 0,
        "currency": "currency",
        "description": "description",
        "period": {
          "end": 0,
          "start": 0
        },
        "pricing": {
          "unit_amount_decimal": "unit_amount_decimal"
        },
        "quantity": 0,
        "pretax_credit_amounts": [
          {
            "amount": 0,
            "type": "type",
            "credit_balance_transaction": "credit_balance_transaction",
            "discount": "discount"
          }
        ]
      }
    ],
    "period_end": 0,
    "period_start": 0,
    "status": "draft"
  },
  "success": true,
  "result_info": {
    "has_more": true,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  }
}
```

## Domain Types

### Billing Credit Balance Response

- `BillingCreditBalanceResponse object { balance, has_default_payment_method, payment_method, 2 more }`

  - `balance: number`

  - `has_default_payment_method: boolean`

  - `payment_method: object { brand, last4 }`

    - `brand: optional string`

    - `last4: optional string`

  - `topup_config: object { amount, disabledReason, error, 2 more }`

    - `amount: number`

    - `disabledReason: string`

    - `error: string`

    - `lastFailedAt: number`

    - `threshold: number`

  - `first_topup_success: optional boolean`

### Billing Usage History Response

- `BillingUsageHistoryResponse object { history }`

  - `history: array of object { id, aggregated_value, end_time, start_time }`

    - `id: string`

    - `aggregated_value: number`

    - `end_time: number`

    - `start_time: number`

### Billing Invoice History Response

- `BillingInvoiceHistoryResponse object { invoices, pagination }`

  - `invoices: array of object { amount_due, amount_paid, amount_remaining, 11 more }`

    - `amount_due: number`

    - `amount_paid: number`

    - `amount_remaining: number`

    - `currency: string`

    - `id: optional string`

    - `attempt_count: optional number`

    - `attempted: optional boolean`

    - `auto_advance: optional boolean`

    - `created: optional number`

    - `created_by: optional string`

    - `description: optional string`

    - `invoice_origin: optional string`

    - `invoice_pdf: optional string`

    - `status: optional string`

  - `pagination: object { has_more, page, per_page, total_count }`

    - `has_more: boolean`

    - `page: number`

    - `per_page: number`

    - `total_count: number`

### Billing Invoice Preview Response

- `BillingInvoicePreviewResponse object { id, amount_due, amount_paid, 6 more }`

  - `id: string`

  - `amount_due: number`

  - `amount_paid: number`

  - `amount_remaining: number`

  - `currency: string`

  - `invoice_lines: array of object { amount, currency, description, 4 more }`

    - `amount: number`

    - `currency: string`

    - `description: string`

    - `period: object { end, start }`

      - `end: number`

      - `start: number`

    - `pricing: object { unit_amount_decimal }`

      - `unit_amount_decimal: string`

    - `quantity: number`

    - `pretax_credit_amounts: optional array of object { amount, type, credit_balance_transaction, discount }`

      - `amount: number`

      - `type: string`

      - `credit_balance_transaction: optional string`

      - `discount: optional string`

  - `period_end: number`

  - `period_start: number`

  - `status: "draft" or "open" or "paid" or 2 more`

    - `"draft"`

    - `"open"`

    - `"paid"`

    - `"uncollectible"`

    - `"void"`

# Topup

## Create a top-up

**post** `/accounts/{account_id}/ai-gateway/billing/topup`

Create a credit top-up via Stripe PaymentIntent for the given account.

### Path Parameters

- `account_id: string`

### Body Parameters

- `amount: number`

  Top-up amount in cents (min 1000).

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { client_secret, onboarding, payment_intent_id, 2 more }`

  - `client_secret: string`

    Stripe PaymentIntent client secret.

  - `onboarding: boolean`

    Whether the user was already onboarded.

  - `payment_intent_id: string`

    Stripe invoice ID.

  - `brand: optional string`

    Card brand (visa, mastercard, etc.).

  - `last4: optional string`

    Last 4 digits of card.

- `success: true`

  - `true`

- `result_info: optional object { has_more, page, per_page, total_count }`

  - `has_more: boolean`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/topup \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "amount": 5000
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "client_secret": "client_secret",
    "onboarding": true,
    "payment_intent_id": "payment_intent_id",
    "brand": "brand",
    "last4": "last4"
  },
  "success": true,
  "result_info": {
    "has_more": true,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  }
}
```

## Check top-up status

**post** `/accounts/{account_id}/ai-gateway/billing/topup/status`

Get the payment processing status of a top-up by its invoice ID.

### Path Parameters

- `account_id: string`

### Body Parameters

- `payment_intent_id: string`

  Stripe invoice ID to check status for.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { payment_intent_id, status }`

  - `payment_intent_id: string`

  - `status: "completed" or "pending"`

    - `"completed"`

    - `"pending"`

- `success: true`

  - `true`

- `result_info: optional object { has_more, page, per_page, total_count }`

  - `has_more: boolean`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/topup/status \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "payment_intent_id": "in_1abc"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "payment_intent_id": "payment_intent_id",
    "status": "completed"
  },
  "success": true,
  "result_info": {
    "has_more": true,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  }
}
```

## Domain Types

### Topup Create Response

- `TopupCreateResponse object { client_secret, onboarding, payment_intent_id, 2 more }`

  - `client_secret: string`

    Stripe PaymentIntent client secret.

  - `onboarding: boolean`

    Whether the user was already onboarded.

  - `payment_intent_id: string`

    Stripe invoice ID.

  - `brand: optional string`

    Card brand (visa, mastercard, etc.).

  - `last4: optional string`

    Last 4 digits of card.

### Topup Status Response

- `TopupStatusResponse object { payment_intent_id, status }`

  - `payment_intent_id: string`

  - `status: "completed" or "pending"`

    - `"completed"`

    - `"pending"`

# Config

## Get auto top-up configuration

**get** `/accounts/{account_id}/ai-gateway/billing/topup/config`

Retrieve the current auto top-up threshold, amount, and any error state.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { amount, disabledReason, error, 2 more }`

  - `amount: number`

  - `disabledReason: string`

  - `error: string`

  - `lastFailedAt: number`

  - `threshold: number`

- `success: true`

  - `true`

- `result_info: optional object { has_more, page, per_page, total_count }`

  - `has_more: boolean`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/topup/config \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "amount": 0,
    "disabledReason": "disabledReason",
    "error": "error",
    "lastFailedAt": 0,
    "threshold": 0
  },
  "success": true,
  "result_info": {
    "has_more": true,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  }
}
```

## Set auto top-up configuration

**post** `/accounts/{account_id}/ai-gateway/billing/topup/config`

Configure auto top-up with a balance threshold and top-up amount.

### Path Parameters

- `account_id: string`

### Body Parameters

- `amount: number`

  Auto top-up amount in cents (min 1000).

- `threshold: number`

  Balance threshold in cents that triggers auto top-up (min 500).

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { amount, threshold }`

  - `amount: number`

  - `threshold: number`

- `success: true`

  - `true`

- `result_info: optional object { has_more, page, per_page, total_count }`

  - `has_more: boolean`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/topup/config \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "amount": 5000,
          "threshold": 500
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "amount": 0,
    "threshold": 0
  },
  "success": true,
  "result_info": {
    "has_more": true,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  }
}
```

## Delete auto top-up configuration

**delete** `/accounts/{account_id}/ai-gateway/billing/topup/config`

Remove the auto top-up configuration for the account.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: unknown`

- `success: true`

  - `true`

- `result_info: optional object { has_more, page, per_page, total_count }`

  - `has_more: boolean`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/topup/config \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {},
  "success": true,
  "result_info": {
    "has_more": true,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  }
}
```

## Domain Types

### Config Get Response

- `ConfigGetResponse object { amount, disabledReason, error, 2 more }`

  - `amount: number`

  - `disabledReason: string`

  - `error: string`

  - `lastFailedAt: number`

  - `threshold: number`

### Config Create Response

- `ConfigCreateResponse object { amount, threshold }`

  - `amount: number`

  - `threshold: number`

### Config Delete Response

- `ConfigDeleteResponse = unknown`

# Spending Limit

## Get spending limit

**get** `/accounts/{account_id}/ai-gateway/billing/spending-limit`

Retrieve the current spending limit configuration for the account.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { config, enabled }`

  - `config: object { amount, duration, strategy }`

    - `amount: number`

    - `duration: string`

    - `strategy: string`

  - `enabled: boolean`

- `success: true`

  - `true`

- `result_info: optional object { has_more, page, per_page, total_count }`

  - `has_more: boolean`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/spending-limit \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "config": {
      "amount": 0,
      "duration": "duration",
      "strategy": "strategy"
    },
    "enabled": true
  },
  "success": true,
  "result_info": {
    "has_more": true,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  }
}
```

## Set spending limit (deprecated)

**post** `/accounts/{account_id}/ai-gateway/billing/spending-limit`

Deprecated: spending limits can no longer be created, enabled, or modified and this endpoint always responds 403. Use the new AI Gateway spend limits instead: https://developers.cloudflare.com/ai-gateway/features/spend-limits/. Existing limits can be removed via DELETE /spending-limit.

### Path Parameters

- `account_id: string`

### Body Parameters

- `amount: number`

  Spending limit amount in cents (min 100).

- `duration: "daily" or "weekly" or "monthly"`

  Spending limit duration.

  - `"daily"`

  - `"weekly"`

  - `"monthly"`

- `strategy: "fixed" or "sliding"`

  Spending limit strategy.

  - `"fixed"`

  - `"sliding"`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: unknown`

- `success: true`

  - `true`

- `result_info: optional object { has_more, page, per_page, total_count }`

  - `has_more: boolean`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/spending-limit \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "amount": 10000,
          "duration": "monthly",
          "strategy": "fixed"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {},
  "success": true,
  "result_info": {
    "has_more": true,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  }
}
```

## Delete spending limit

**delete** `/accounts/{account_id}/ai-gateway/billing/spending-limit`

Remove the spending limit for the account.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: unknown`

- `success: true`

  - `true`

- `result_info: optional object { has_more, page, per_page, total_count }`

  - `has_more: boolean`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/spending-limit \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {},
  "success": true,
  "result_info": {
    "has_more": true,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  }
}
```

## Domain Types

### Spending Limit Get Response

- `SpendingLimitGetResponse object { config, enabled }`

  - `config: object { amount, duration, strategy }`

    - `amount: number`

    - `duration: string`

    - `strategy: string`

  - `enabled: boolean`

### Spending Limit Create Response

- `SpendingLimitCreateResponse = unknown`

### Spending Limit Delete Response

- `SpendingLimitDeleteResponse = unknown`
