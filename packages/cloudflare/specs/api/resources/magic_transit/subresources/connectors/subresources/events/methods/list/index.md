## List Events

**get** `/accounts/{account_id}/magic/connectors/{connector_id}/telemetry/events`

List Events

### Path Parameters

- `account_id: string`

  Account identifier

- `connector_id: string`

### Query Parameters

- `from: number`

- `to: number`

- `cursor: optional string`

- `k: optional string`

  Filter by event kind

- `limit: optional number`

### Returns

- `result: object { count, items, cursor }`

  - `count: number`

  - `items: array of object { a, k, n, t }`

    - `a: number`

      Time the Event was collected (seconds since the Unix epoch)

    - `k: string`

      Kind

    - `n: number`

      Sequence number, used to order events with the same timestamp

    - `t: number`

      Time the Event was recorded (seconds since the Unix epoch)

  - `cursor: optional string`

- `success: boolean`

- `errors: optional array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: optional array of object { code, message }`

  - `code: number`

  - `message: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/connectors/$CONNECTOR_ID/telemetry/events \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "count": 0,
    "items": [
      {
        "a": 0,
        "k": "k",
        "n": 0,
        "t": 0
      }
    ],
    "cursor": "cursor"
  },
  "success": true,
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
  ]
}
```
