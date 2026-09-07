## Create Destination

**post** `/accounts/{account_id}/workers/observability/destinations`

Create a new Workers Observability Telemetry Destination.

### Path Parameters

- `account_id: string`

### Body Parameters

- `configuration: object { headers, logpushDataset, type, url }`

  - `headers: map[string]`

  - `logpushDataset: "opentelemetry-traces" or "opentelemetry-logs" or "opentelemetry-metrics"`

    - `"opentelemetry-traces"`

    - `"opentelemetry-logs"`

    - `"opentelemetry-metrics"`

  - `type: "logpush"`

    - `"logpush"`

  - `url: string`

- `enabled: boolean`

- `name: string`

- `skipPreflightCheck: optional boolean`

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: "Resource created"`

    - `"Resource created"`

- `result: object { configuration, enabled, name, 2 more }`

  - `configuration: object { destination_conf, logpushDataset, logpushJob, 2 more }`

    - `destination_conf: string`

    - `logpushDataset: "opentelemetry-traces" or "opentelemetry-logs" or "opentelemetry-metrics"`

      - `"opentelemetry-traces"`

      - `"opentelemetry-logs"`

      - `"opentelemetry-metrics"`

    - `logpushJob: number`

    - `type: "logpush"`

      - `"logpush"`

    - `url: string`

  - `enabled: boolean`

  - `name: string`

  - `scripts: array of string`

  - `slug: string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/destinations \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "configuration": {
            "headers": {
              "foo": "string"
            },
            "logpushDataset": "opentelemetry-traces",
            "type": "logpush",
            "url": "url"
          },
          "enabled": true,
          "name": "name"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "Resource created"
    }
  ],
  "result": {
    "configuration": {
      "destination_conf": "destination_conf",
      "logpushDataset": "opentelemetry-traces",
      "logpushJob": 0,
      "type": "logpush",
      "url": "url"
    },
    "enabled": true,
    "name": "name",
    "scripts": [
      "string"
    ],
    "slug": "slug"
  },
  "success": true
}
```
