# Messages

## Push Message

**post** `/accounts/{account_id}/queues/{queue_id}/messages`

Push a message to a Queue

### Path Parameters

- `account_id: string`

  A Resource identifier.

- `queue_id: string`

  A Resource identifier.

### Body Parameters

- `body: optional object { body, content_type, delay_seconds }  or object { body, content_type, delay_seconds }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/queues/$QUEUE_ID/messages \
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

## Acknowledge + Retry Queue Messages

**post** `/accounts/{account_id}/queues/{queue_id}/messages/ack`

Acknowledge + Retry messages from a Queue

### Path Parameters

- `account_id: string`

  A Resource identifier.

- `queue_id: string`

  A Resource identifier.

### Body Parameters

- `acks: optional array of object { lease_id }`

  - `lease_id: optional string`

    An ID that represents an "in-flight" message that has been pulled from a Queue. You must hold on to this ID and use it to acknowledge this message.

- `retries: optional array of object { delay_seconds, lease_id }`

  - `delay_seconds: optional number`

    The number of seconds to delay before making the message available for another attempt.

  - `lease_id: optional string`

    An ID that represents an "in-flight" message that has been pulled from a Queue. You must hold on to this ID and use it to acknowledge this message.

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional object { ackCount, retryCount, warnings }`

  - `ackCount: optional number`

    The number of messages that were succesfully acknowledged.

  - `retryCount: optional number`

    The number of messages that were succesfully retried.

  - `warnings: optional map[string]`

    Map of lease IDs to warning messages encountered during acknowledgement.

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/queues/$QUEUE_ID/messages/ack \
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
    "ackCount": 5,
    "retryCount": 5,
    "warnings": {
      "foo": "string"
    }
  },
  "success": true
}
```

## Pull Queue Messages

**post** `/accounts/{account_id}/queues/{queue_id}/messages/pull`

Pull a batch of messages from a Queue

### Path Parameters

- `account_id: string`

  A Resource identifier.

- `queue_id: string`

  A Resource identifier.

### Body Parameters

- `batch_size: optional number`

  The maximum number of messages to include in a batch.

- `visibility_timeout_ms: optional number`

  The number of milliseconds that a message is exclusively leased. After the timeout, the message becomes available for another attempt.

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional object { message_backlog_count, messages, metadata }`

  - `message_backlog_count: optional number`

    The number of unacknowledged messages in the queue.

  - `messages: optional array of object { id, attempts, body, 3 more }`

    - `id: optional string`

    - `attempts: optional number`

    - `body: optional string`

    - `lease_id: optional string`

      An ID that represents an "in-flight" message that has been pulled from a Queue. You must hold on to this ID and use it to acknowledge this message.

    - `metadata: optional unknown`

    - `timestamp_ms: optional number`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/queues/$QUEUE_ID/messages/pull \
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
    "message_backlog_count": 5,
    "messages": [
      {
        "id": "b01b5594f784d0165c2985833f5660dd",
        "attempts": 1,
        "body": "hello world",
        "lease_id": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIn0..Q8p21d7dceR6vUfwftONdQ.JVqZgAS-Zk7MqmqccYtTHeeMElNHaOMigeWdb8LyMOg.T2_HV99CYzGaQuhTyW8RsgbnpTRZHRM6N7UoSaAKeK0",
        "metadata": {
          "CF-Content-Type": "text",
          "CF-sourceMessageSource": "dash"
        },
        "timestamp_ms": 1710950954154
      }
    ],
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

## Domain Types

### Message Push Response

- `MessagePushResponse object { metadata }`

  - `metadata: optional object { metrics }`

    - `metrics: optional object { backlog_bytes, backlog_count, oldest_message_timestamp_ms }`

      Best-effort metrics for the queue. Values may be approximate due to the distributed nature of queues.

      - `backlog_bytes: number`

        The size in bytes of unacknowledged messages in the queue.

      - `backlog_count: number`

        The number of unacknowledged messages in the queue.

      - `oldest_message_timestamp_ms: number`

        Unix timestamp in milliseconds of the oldest unacknowledged message in the queue. Returns 0 if unknown.

### Message Ack Response

- `MessageAckResponse object { ackCount, retryCount, warnings }`

  - `ackCount: optional number`

    The number of messages that were succesfully acknowledged.

  - `retryCount: optional number`

    The number of messages that were succesfully retried.

  - `warnings: optional map[string]`

    Map of lease IDs to warning messages encountered during acknowledgement.

### Message Pull Response

- `MessagePullResponse object { message_backlog_count, messages, metadata }`

  - `message_backlog_count: optional number`

    The number of unacknowledged messages in the queue.

  - `messages: optional array of object { id, attempts, body, 3 more }`

    - `id: optional string`

    - `attempts: optional number`

    - `body: optional string`

    - `lease_id: optional string`

      An ID that represents an "in-flight" message that has been pulled from a Queue. You must hold on to this ID and use it to acknowledge this message.

    - `metadata: optional unknown`

    - `timestamp_ms: optional number`

  - `metadata: optional object { metrics }`

    - `metrics: optional object { backlog_bytes, backlog_count, oldest_message_timestamp_ms }`

      Best-effort metrics for the queue. Values may be approximate due to the distributed nature of queues.

      - `backlog_bytes: number`

        The size in bytes of unacknowledged messages in the queue.

      - `backlog_count: number`

        The number of unacknowledged messages in the queue.

      - `oldest_message_timestamp_ms: number`

        Unix timestamp in milliseconds of the oldest unacknowledged message in the queue. Returns 0 if unknown.

### Message Bulk Push Response

- `MessageBulkPushResponse object { metadata }`

  - `metadata: optional object { metrics }`

    - `metrics: optional object { backlog_bytes, backlog_count, oldest_message_timestamp_ms }`

      Best-effort metrics for the queue. Values may be approximate due to the distributed nature of queues.

      - `backlog_bytes: number`

        The size in bytes of unacknowledged messages in the queue.

      - `backlog_count: number`

        The number of unacknowledged messages in the queue.

      - `oldest_message_timestamp_ms: number`

        Unix timestamp in milliseconds of the oldest unacknowledged message in the queue. Returns 0 if unknown.
