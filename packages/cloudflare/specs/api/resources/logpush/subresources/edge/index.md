# Edge

## List Instant Logs jobs

**get** `/zones/{zone_id}/logpush/edge/jobs`

Lists Instant Logs jobs for a zone.

### Path Parameters

- `zone_id: string`

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

- `result: optional array of InstantLogpushJob`

  - `destination_conf: optional string`

    Unique WebSocket address that will receive messages from Cloudflare’s edge.

  - `fields: optional string`

    Comma-separated list of fields.

  - `filter: optional string`

    Filters to drill down into specific events.

  - `sample: optional number`

    The sample parameter is the sample rate of the records set by the client: "sample": 1 is 100% of records "sample": 10 is 10% and so on.

  - `session_id: optional string`

    Unique session id of the job.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logpush/edge/jobs \
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
      "destination_conf": "wss://logs.cloudflare.com/instant-logs/ws/sessions/99d471b1ca3c23cc8e30b6acec5db987",
      "fields": "ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID",
      "filter": "{\"where\":{\"and\":[{\"key\":\"ClientCountry\",\"operator\":\"neq\",\"value\":\"ca\"}]}}",
      "sample": 1,
      "session_id": "99d471b1ca3c23cc8e30b6acec5db987"
    }
  ]
}
```

## Create Instant Logs job

**post** `/zones/{zone_id}/logpush/edge/jobs`

Creates a new Instant Logs job for a zone.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `fields: optional string`

  Comma-separated list of fields.

- `filter: optional string`

  Filters to drill down into specific events.

- `sample: optional number`

  The sample parameter is the sample rate of the records set by the client: "sample": 1 is 100% of records "sample": 10 is 10% and so on.

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

- `result: optional InstantLogpushJob`

  - `destination_conf: optional string`

    Unique WebSocket address that will receive messages from Cloudflare’s edge.

  - `fields: optional string`

    Comma-separated list of fields.

  - `filter: optional string`

    Filters to drill down into specific events.

  - `sample: optional number`

    The sample parameter is the sample rate of the records set by the client: "sample": 1 is 100% of records "sample": 10 is 10% and so on.

  - `session_id: optional string`

    Unique session id of the job.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logpush/edge/jobs \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "fields": "ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID",
          "filter": "{\\"where\\":{\\"and\\":[{\\"key\\":\\"ClientCountry\\",\\"operator\\":\\"neq\\",\\"value\\":\\"ca\\"}]}}",
          "sample": 1
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
    "destination_conf": "wss://logs.cloudflare.com/instant-logs/ws/sessions/99d471b1ca3c23cc8e30b6acec5db987",
    "fields": "ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID",
    "filter": "{\"where\":{\"and\":[{\"key\":\"ClientCountry\",\"operator\":\"neq\",\"value\":\"ca\"}]}}",
    "sample": 1,
    "session_id": "99d471b1ca3c23cc8e30b6acec5db987"
  }
}
```

## Domain Types

### Instant Logpush Job

- `InstantLogpushJob object { destination_conf, fields, filter, 2 more }`

  - `destination_conf: optional string`

    Unique WebSocket address that will receive messages from Cloudflare’s edge.

  - `fields: optional string`

    Comma-separated list of fields.

  - `filter: optional string`

    Filters to drill down into specific events.

  - `sample: optional number`

    The sample parameter is the sample rate of the records set by the client: "sample": 1 is 100% of records "sample": 10 is 10% and so on.

  - `session_id: optional string`

    Unique session id of the job.
