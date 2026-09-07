## Update Destination

**patch** `/accounts/{account_id}/workers/observability/destinations/{slug}`

Update an existing Workers Observability Telemetry Destination.

### Path Parameters

- `account_id: string`

- `slug: string`

### Body Parameters

- `configuration: object { headers, type, url }`

  - `headers: map[string]`

  - `type: "logpush"`

    - `"logpush"`

  - `url: string`

- `enabled: boolean`

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: "Successful request"`

    - `"Successful request"`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/destinations/$SLUG \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "configuration": {
            "headers": {
              "foo": "string"
            },
            "type": "logpush",
            "url": "url"
          },
          "enabled": true
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
      "message": "Successful request"
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
