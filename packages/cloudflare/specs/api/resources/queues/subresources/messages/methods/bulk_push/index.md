## Push Message Batch

**post** `/accounts/{account_id}/queues/{queue_id}/messages/batch`

Push a batch of message to a Queue

### Path Parameters

- `account_id: string`

  A Resource identifier.

- `queue_id: string`

  A Resource identifier.

### Body Parameters

- `delay_seconds: optional number`

  The number of seconds to wait for attempting to deliver this batch to consumers

- `messages: optional array of object { body, content_type, delay_seconds }  or object { body, content_type, delay_seconds }`

  - `MqQueueMessageText object { body, content_type, delay_seconds }`

    - `body: optional string`

    - `content_type: optional "text"`

      - `"text"`

    - `delay_seconds: optional number`

      The number of seconds to wait for attempting to deliver this message to consumers

  - `MqQueueMessageJson object { body, content_type, delay_seconds }`

    - `body: optional unknown`

    - `content_type: optional "json"`

      - `"json"`

    - `delay_seconds: optional number`

      The number of seconds to wait for attempting to deliver this message to consumers

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional object { metadata }`

  - `metadata: optional object { metrics }`

    - `metrics: optional object { backlog_bytes, backlog_count, oldest_message_timestamp_ms }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/queues/$QUEUE_ID/messages/batch \
    -X POST \
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
    "metadata": {
      "metrics": {
        "backlog_bytes": 1024,
        "backlog_count": 5,
        "oldest_message_timestamp_ms": 1710950954154
      }
    }
  },
  "success": true
}
```
