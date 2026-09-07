## Get Queue Metrics

**get** `/accounts/{account_id}/queues/{queue_id}/metrics`

Return best-effort metrics for a queue. Values may be approximate due to the distributed nature of queues.

### Path Parameters

- `account_id: string`

  A Resource identifier.

- `queue_id: string`

  A Resource identifier.

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional object { backlog_bytes, backlog_count, oldest_message_timestamp_ms }`

  Best-effort metrics for the queue. Values may be approximate due to the distributed nature of queues.

  - `backlog_bytes: number`

    The size in bytes of unacknowledged messages in the queue.

  - `backlog_count: number`

    The number of unacknowledged messages in the queue.

  - `oldest_message_timestamp_ms: number`

    Unix timestamp in milliseconds of the oldest unacknowledged message in the queue. Returns 0 if unknown.

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/queues/$QUEUE_ID/metrics \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "backlog_bytes": 1024,
    "backlog_count": 5,
    "oldest_message_timestamp_ms": 1710950954154
  },
  "success": true
}
```
