# Destinations

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

## Delete Destination

**delete** `/accounts/{account_id}/workers/observability/destinations/{slug}`

Delete a Workers Observability Telemetry Destination.

### Path Parameters

- `account_id: string`

- `slug: string`

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: "Successful request"`

    - `"Successful request"`

- `success: true`

  - `true`

- `result: optional object { configuration, enabled, name, 2 more }`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/destinations/$SLUG \
    -X DELETE \
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
  "success": true,
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
  }
}
```

## Domain Types

### Destination List Response

- `DestinationListResponse object { configuration, enabled, name, 2 more }`

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

### Destination Create Response

- `DestinationCreateResponse object { configuration, enabled, name, 2 more }`

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

### Destination Update Response

- `DestinationUpdateResponse object { configuration, enabled, name, 2 more }`

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

### Destination Delete Response

- `DestinationDeleteResponse object { configuration, enabled, name, 2 more }`

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
