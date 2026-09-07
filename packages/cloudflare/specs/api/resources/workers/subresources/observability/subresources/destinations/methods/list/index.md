## Get Destinations

**get** `/accounts/{account_id}/workers/observability/destinations`

List your Workers Observability Telemetry Destinations.

### Path Parameters

- `account_id: string`

### Query Parameters

- `order: optional "asc" or "desc"`

  - `"asc"`

  - `"desc"`

- `orderBy: optional "created" or "updated"`

  - `"created"`

  - `"updated"`

- `page: optional number`

- `perPage: optional number`

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: "Successful request"`

    - `"Successful request"`

- `result: array of object { configuration, enabled, name, 2 more }`

  - `configuration: object { destination_conf, headers, jobStatus, 3 more }`

    - `destination_conf: string`

    - `headers: map[string]`

    - `jobStatus: object { error_message, last_complete, last_error }`

      - `error_message: string`

      - `last_complete: string`

      - `last_error: string`

    - `logpushDataset: "opentelemetry-traces" or "opentelemetry-logs" or "opentelemetry-metrics"`

      - `"opentelemetry-traces"`

      - `"opentelemetry-logs"`

      - `"opentelemetry-metrics"`

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
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "result": [
    {
      "configuration": {
        "destination_conf": "destination_conf",
        "headers": {
          "foo": "string"
        },
        "jobStatus": {
          "error_message": "error_message",
          "last_complete": "last_complete",
          "last_error": "last_error"
        },
        "logpushDataset": "opentelemetry-traces",
        "type": "logpush",
        "url": "url"
      },
      "enabled": true,
      "name": "name",
      "scripts": [
        "string"
      ],
      "slug": "slug"
    }
  ],
  "success": true
}
```
