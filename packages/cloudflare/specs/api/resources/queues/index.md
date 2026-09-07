# Queues

## List Queues

**get** `/accounts/{account_id}/queues`

Returns the queues owned by an account.

### Path Parameters

- `account_id: string`

  A Resource identifier.

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional array of Queue`

  - `consumers: optional array of Consumer`

    - `Worker object { consumer_id, created_on, dead_letter_queue, 4 more }`

      - `consumer_id: optional string`

        A Resource identifier.

      - `created_on: optional string`

      - `dead_letter_queue: optional string`

        Name of the dead letter queue, or empty string if not configured

      - `queue_name: optional string`

      - `script_name: optional string`

        Name of a Worker

      - `settings: optional object { batch_size, max_concurrency, max_retries, 2 more }`

        - `batch_size: optional number`

          The maximum number of messages to include in a batch.

        - `max_concurrency: optional number`

          Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (recommended).

        - `max_retries: optional number`

          The maximum number of retries

        - `max_wait_time_ms: optional number`

          The number of milliseconds to wait for a batch to fill up before attempting to deliver it

        - `retry_delay: optional number`

          The number of seconds to delay before making the message available for another attempt.

      - `type: optional "worker"`

        - `"worker"`

    - `HTTPPull object { consumer_id, created_on, dead_letter_queue, 3 more }`

      - `consumer_id: optional string`

        A Resource identifier.

      - `created_on: optional string`

      - `dead_letter_queue: optional string`

        Name of the dead letter queue, or empty string if not configured

      - `queue_name: optional string`

      - `settings: optional object { batch_size, max_retries, retry_delay, visibility_timeout_ms }`

        - `batch_size: optional number`

          The maximum number of messages to include in a batch.

        - `max_retries: optional number`

          The maximum number of retries

        - `retry_delay: optional number`

          The number of seconds to delay before making the message available for another attempt.

        - `visibility_timeout_ms: optional number`

          The number of milliseconds that a message is exclusively leased. After the timeout, the message becomes available for another attempt.

      - `type: optional "http_pull"`

        - `"http_pull"`

  - `consumers_total_count: optional number`

  - `created_on: optional string`

  - `modified_on: optional string`

  - `producers: optional array of object { script, type }  or object { bucket_name, type }`

    - `MqWorkerProducer object { script, type }`

      - `script: optional string`

      - `type: optional "worker"`

        - `"worker"`

    - `MqR2Producer object { bucket_name, type }`

      - `bucket_name: optional string`

      - `type: optional "r2_bucket"`

        - `"r2_bucket"`

  - `producers_total_count: optional number`

  - `queue_id: optional string`

  - `queue_name: optional string`

  - `settings: optional object { delivery_delay, delivery_paused, message_retention_period }`

    - `delivery_delay: optional number`

      Number of seconds to delay delivery of all messages to consumers.

    - `delivery_paused: optional boolean`

      Indicates if message delivery to consumers is currently paused.

    - `message_retention_period: optional number`

      Number of seconds after which an unconsumed message will be delayed.

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of queues

  - `page: optional number`

    Current page within paginated list of queues

  - `per_page: optional number`

    Number of queues per page

  - `total_count: optional number`

    Total queues available without any search parameters

  - `total_pages: optional number`

    Total pages available without any search parameters

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/queues \
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
  "result": [
    {
      "consumers": [
        {
          "consumer_id": "023e105f4ecef8ad9ca31a8372d0c353",
          "created_on": "2019-12-27T18:11:19.117Z",
          "dead_letter_queue": "dead_letter_queue",
          "queue_name": "example-queue",
          "script_name": "my-consumer-worker",
          "settings": {
            "batch_size": 50,
            "max_concurrency": 10,
            "max_retries": 3,
            "max_wait_time_ms": 5000,
            "retry_delay": 10
          },
          "type": "worker"
        }
      ],
      "consumers_total_count": 0,
      "created_on": "created_on",
      "modified_on": "modified_on",
      "producers": [
        {
          "script": "script",
          "type": "worker"
        }
      ],
      "producers_total_count": 0,
      "queue_id": "queue_id",
      "queue_name": "example-queue",
      "settings": {
        "delivery_delay": 5,
        "delivery_paused": true,
        "message_retention_period": 345600
      }
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  },
  "success": true
}
```

## Get Queue

**get** `/accounts/{account_id}/queues/{queue_id}`

Get details about a specific queue.

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

- `result: optional Queue`

  - `consumers: optional array of Consumer`

    - `Worker object { consumer_id, created_on, dead_letter_queue, 4 more }`

      - `consumer_id: optional string`

        A Resource identifier.

      - `created_on: optional string`

      - `dead_letter_queue: optional string`

        Name of the dead letter queue, or empty string if not configured

      - `queue_name: optional string`

      - `script_name: optional string`

        Name of a Worker

      - `settings: optional object { batch_size, max_concurrency, max_retries, 2 more }`

        - `batch_size: optional number`

          The maximum number of messages to include in a batch.

        - `max_concurrency: optional number`

          Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (recommended).

        - `max_retries: optional number`

          The maximum number of retries

        - `max_wait_time_ms: optional number`

          The number of milliseconds to wait for a batch to fill up before attempting to deliver it

        - `retry_delay: optional number`

          The number of seconds to delay before making the message available for another attempt.

      - `type: optional "worker"`

        - `"worker"`

    - `HTTPPull object { consumer_id, created_on, dead_letter_queue, 3 more }`

      - `consumer_id: optional string`

        A Resource identifier.

      - `created_on: optional string`

      - `dead_letter_queue: optional string`

        Name of the dead letter queue, or empty string if not configured

      - `queue_name: optional string`

      - `settings: optional object { batch_size, max_retries, retry_delay, visibility_timeout_ms }`

        - `batch_size: optional number`

          The maximum number of messages to include in a batch.

        - `max_retries: optional number`

          The maximum number of retries

        - `retry_delay: optional number`

          The number of seconds to delay before making the message available for another attempt.

        - `visibility_timeout_ms: optional number`

          The number of milliseconds that a message is exclusively leased. After the timeout, the message becomes available for another attempt.

      - `type: optional "http_pull"`

        - `"http_pull"`

  - `consumers_total_count: optional number`

  - `created_on: optional string`

  - `modified_on: optional string`

  - `producers: optional array of object { script, type }  or object { bucket_name, type }`

    - `MqWorkerProducer object { script, type }`

      - `script: optional string`

      - `type: optional "worker"`

        - `"worker"`

    - `MqR2Producer object { bucket_name, type }`

      - `bucket_name: optional string`

      - `type: optional "r2_bucket"`

        - `"r2_bucket"`

  - `producers_total_count: optional number`

  - `queue_id: optional string`

  - `queue_name: optional string`

  - `settings: optional object { delivery_delay, delivery_paused, message_retention_period }`

    - `delivery_delay: optional number`

      Number of seconds to delay delivery of all messages to consumers.

    - `delivery_paused: optional boolean`

      Indicates if message delivery to consumers is currently paused.

    - `message_retention_period: optional number`

      Number of seconds after which an unconsumed message will be delayed.

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/queues/$QUEUE_ID \
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
    "consumers": [
      {
        "consumer_id": "023e105f4ecef8ad9ca31a8372d0c353",
        "created_on": "2019-12-27T18:11:19.117Z",
        "dead_letter_queue": "dead_letter_queue",
        "queue_name": "example-queue",
        "script_name": "my-consumer-worker",
        "settings": {
          "batch_size": 50,
          "max_concurrency": 10,
          "max_retries": 3,
          "max_wait_time_ms": 5000,
          "retry_delay": 10
        },
        "type": "worker"
      }
    ],
    "consumers_total_count": 0,
    "created_on": "created_on",
    "modified_on": "modified_on",
    "producers": [
      {
        "script": "script",
        "type": "worker"
      }
    ],
    "producers_total_count": 0,
    "queue_id": "queue_id",
    "queue_name": "example-queue",
    "settings": {
      "delivery_delay": 5,
      "delivery_paused": true,
      "message_retention_period": 345600
    }
  },
  "success": true
}
```

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

## Create Queue

**post** `/accounts/{account_id}/queues`

Create a new queue

### Path Parameters

- `account_id: string`

  A Resource identifier.

### Body Parameters

- `queue_name: string`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional Queue`

  - `consumers: optional array of Consumer`

    - `Worker object { consumer_id, created_on, dead_letter_queue, 4 more }`

      - `consumer_id: optional string`

        A Resource identifier.

      - `created_on: optional string`

      - `dead_letter_queue: optional string`

        Name of the dead letter queue, or empty string if not configured

      - `queue_name: optional string`

      - `script_name: optional string`

        Name of a Worker

      - `settings: optional object { batch_size, max_concurrency, max_retries, 2 more }`

        - `batch_size: optional number`

          The maximum number of messages to include in a batch.

        - `max_concurrency: optional number`

          Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (recommended).

        - `max_retries: optional number`

          The maximum number of retries

        - `max_wait_time_ms: optional number`

          The number of milliseconds to wait for a batch to fill up before attempting to deliver it

        - `retry_delay: optional number`

          The number of seconds to delay before making the message available for another attempt.

      - `type: optional "worker"`

        - `"worker"`

    - `HTTPPull object { consumer_id, created_on, dead_letter_queue, 3 more }`

      - `consumer_id: optional string`

        A Resource identifier.

      - `created_on: optional string`

      - `dead_letter_queue: optional string`

        Name of the dead letter queue, or empty string if not configured

      - `queue_name: optional string`

      - `settings: optional object { batch_size, max_retries, retry_delay, visibility_timeout_ms }`

        - `batch_size: optional number`

          The maximum number of messages to include in a batch.

        - `max_retries: optional number`

          The maximum number of retries

        - `retry_delay: optional number`

          The number of seconds to delay before making the message available for another attempt.

        - `visibility_timeout_ms: optional number`

          The number of milliseconds that a message is exclusively leased. After the timeout, the message becomes available for another attempt.

      - `type: optional "http_pull"`

        - `"http_pull"`

  - `consumers_total_count: optional number`

  - `created_on: optional string`

  - `modified_on: optional string`

  - `producers: optional array of object { script, type }  or object { bucket_name, type }`

    - `MqWorkerProducer object { script, type }`

      - `script: optional string`

      - `type: optional "worker"`

        - `"worker"`

    - `MqR2Producer object { bucket_name, type }`

      - `bucket_name: optional string`

      - `type: optional "r2_bucket"`

        - `"r2_bucket"`

  - `producers_total_count: optional number`

  - `queue_id: optional string`

  - `queue_name: optional string`

  - `settings: optional object { delivery_delay, delivery_paused, message_retention_period }`

    - `delivery_delay: optional number`

      Number of seconds to delay delivery of all messages to consumers.

    - `delivery_paused: optional boolean`

      Indicates if message delivery to consumers is currently paused.

    - `message_retention_period: optional number`

      Number of seconds after which an unconsumed message will be delayed.

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/queues \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "queue_name": "example-queue"
        }'
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
    "consumers": [
      {
        "consumer_id": "023e105f4ecef8ad9ca31a8372d0c353",
        "created_on": "2019-12-27T18:11:19.117Z",
        "dead_letter_queue": "dead_letter_queue",
        "queue_name": "example-queue",
        "script_name": "my-consumer-worker",
        "settings": {
          "batch_size": 50,
          "max_concurrency": 10,
          "max_retries": 3,
          "max_wait_time_ms": 5000,
          "retry_delay": 10
        },
        "type": "worker"
      }
    ],
    "consumers_total_count": 0,
    "created_on": "created_on",
    "modified_on": "modified_on",
    "producers": [
      {
        "script": "script",
        "type": "worker"
      }
    ],
    "producers_total_count": 0,
    "queue_id": "queue_id",
    "queue_name": "example-queue",
    "settings": {
      "delivery_delay": 5,
      "delivery_paused": true,
      "message_retention_period": 345600
    }
  },
  "success": true
}
```

## Update Queue

**put** `/accounts/{account_id}/queues/{queue_id}`

Updates a Queue. Note that this endpoint does not support partial updates. If successful, the Queue's configuration is overwritten with the supplied configuration.

### Path Parameters

- `account_id: string`

  A Resource identifier.

- `queue_id: string`

  A Resource identifier.

### Body Parameters

- `queue_name: optional string`

- `settings: optional object { delivery_delay, delivery_paused, message_retention_period }`

  - `delivery_delay: optional number`

    Number of seconds to delay delivery of all messages to consumers.

  - `delivery_paused: optional boolean`

    Indicates if message delivery to consumers is currently paused.

  - `message_retention_period: optional number`

    Number of seconds after which an unconsumed message will be delayed.

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional Queue`

  - `consumers: optional array of Consumer`

    - `Worker object { consumer_id, created_on, dead_letter_queue, 4 more }`

      - `consumer_id: optional string`

        A Resource identifier.

      - `created_on: optional string`

      - `dead_letter_queue: optional string`

        Name of the dead letter queue, or empty string if not configured

      - `queue_name: optional string`

      - `script_name: optional string`

        Name of a Worker

      - `settings: optional object { batch_size, max_concurrency, max_retries, 2 more }`

        - `batch_size: optional number`

          The maximum number of messages to include in a batch.

        - `max_concurrency: optional number`

          Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (recommended).

        - `max_retries: optional number`

          The maximum number of retries

        - `max_wait_time_ms: optional number`

          The number of milliseconds to wait for a batch to fill up before attempting to deliver it

        - `retry_delay: optional number`

          The number of seconds to delay before making the message available for another attempt.

      - `type: optional "worker"`

        - `"worker"`

    - `HTTPPull object { consumer_id, created_on, dead_letter_queue, 3 more }`

      - `consumer_id: optional string`

        A Resource identifier.

      - `created_on: optional string`

      - `dead_letter_queue: optional string`

        Name of the dead letter queue, or empty string if not configured

      - `queue_name: optional string`

      - `settings: optional object { batch_size, max_retries, retry_delay, visibility_timeout_ms }`

        - `batch_size: optional number`

          The maximum number of messages to include in a batch.

        - `max_retries: optional number`

          The maximum number of retries

        - `retry_delay: optional number`

          The number of seconds to delay before making the message available for another attempt.

        - `visibility_timeout_ms: optional number`

          The number of milliseconds that a message is exclusively leased. After the timeout, the message becomes available for another attempt.

      - `type: optional "http_pull"`

        - `"http_pull"`

  - `consumers_total_count: optional number`

  - `created_on: optional string`

  - `modified_on: optional string`

  - `producers: optional array of object { script, type }  or object { bucket_name, type }`

    - `MqWorkerProducer object { script, type }`

      - `script: optional string`

      - `type: optional "worker"`

        - `"worker"`

    - `MqR2Producer object { bucket_name, type }`

      - `bucket_name: optional string`

      - `type: optional "r2_bucket"`

        - `"r2_bucket"`

  - `producers_total_count: optional number`

  - `queue_id: optional string`

  - `queue_name: optional string`

  - `settings: optional object { delivery_delay, delivery_paused, message_retention_period }`

    - `delivery_delay: optional number`

      Number of seconds to delay delivery of all messages to consumers.

    - `delivery_paused: optional boolean`

      Indicates if message delivery to consumers is currently paused.

    - `message_retention_period: optional number`

      Number of seconds after which an unconsumed message will be delayed.

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/queues/$QUEUE_ID \
    -X PUT \
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
    "consumers": [
      {
        "consumer_id": "023e105f4ecef8ad9ca31a8372d0c353",
        "created_on": "2019-12-27T18:11:19.117Z",
        "dead_letter_queue": "dead_letter_queue",
        "queue_name": "example-queue",
        "script_name": "my-consumer-worker",
        "settings": {
          "batch_size": 50,
          "max_concurrency": 10,
          "max_retries": 3,
          "max_wait_time_ms": 5000,
          "retry_delay": 10
        },
        "type": "worker"
      }
    ],
    "consumers_total_count": 0,
    "created_on": "created_on",
    "modified_on": "modified_on",
    "producers": [
      {
        "script": "script",
        "type": "worker"
      }
    ],
    "producers_total_count": 0,
    "queue_id": "queue_id",
    "queue_name": "example-queue",
    "settings": {
      "delivery_delay": 5,
      "delivery_paused": true,
      "message_retention_period": 345600
    }
  },
  "success": true
}
```

## Update Queue

**patch** `/accounts/{account_id}/queues/{queue_id}`

Updates a Queue.

### Path Parameters

- `account_id: string`

  A Resource identifier.

- `queue_id: string`

  A Resource identifier.

### Body Parameters

- `queue_name: optional string`

- `settings: optional object { delivery_delay, delivery_paused, message_retention_period }`

  - `delivery_delay: optional number`

    Number of seconds to delay delivery of all messages to consumers.

  - `delivery_paused: optional boolean`

    Indicates if message delivery to consumers is currently paused.

  - `message_retention_period: optional number`

    Number of seconds after which an unconsumed message will be delayed.

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional Queue`

  - `consumers: optional array of Consumer`

    - `Worker object { consumer_id, created_on, dead_letter_queue, 4 more }`

      - `consumer_id: optional string`

        A Resource identifier.

      - `created_on: optional string`

      - `dead_letter_queue: optional string`

        Name of the dead letter queue, or empty string if not configured

      - `queue_name: optional string`

      - `script_name: optional string`

        Name of a Worker

      - `settings: optional object { batch_size, max_concurrency, max_retries, 2 more }`

        - `batch_size: optional number`

          The maximum number of messages to include in a batch.

        - `max_concurrency: optional number`

          Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (recommended).

        - `max_retries: optional number`

          The maximum number of retries

        - `max_wait_time_ms: optional number`

          The number of milliseconds to wait for a batch to fill up before attempting to deliver it

        - `retry_delay: optional number`

          The number of seconds to delay before making the message available for another attempt.

      - `type: optional "worker"`

        - `"worker"`

    - `HTTPPull object { consumer_id, created_on, dead_letter_queue, 3 more }`

      - `consumer_id: optional string`

        A Resource identifier.

      - `created_on: optional string`

      - `dead_letter_queue: optional string`

        Name of the dead letter queue, or empty string if not configured

      - `queue_name: optional string`

      - `settings: optional object { batch_size, max_retries, retry_delay, visibility_timeout_ms }`

        - `batch_size: optional number`

          The maximum number of messages to include in a batch.

        - `max_retries: optional number`

          The maximum number of retries

        - `retry_delay: optional number`

          The number of seconds to delay before making the message available for another attempt.

        - `visibility_timeout_ms: optional number`

          The number of milliseconds that a message is exclusively leased. After the timeout, the message becomes available for another attempt.

      - `type: optional "http_pull"`

        - `"http_pull"`

  - `consumers_total_count: optional number`

  - `created_on: optional string`

  - `modified_on: optional string`

  - `producers: optional array of object { script, type }  or object { bucket_name, type }`

    - `MqWorkerProducer object { script, type }`

      - `script: optional string`

      - `type: optional "worker"`

        - `"worker"`

    - `MqR2Producer object { bucket_name, type }`

      - `bucket_name: optional string`

      - `type: optional "r2_bucket"`

        - `"r2_bucket"`

  - `producers_total_count: optional number`

  - `queue_id: optional string`

  - `queue_name: optional string`

  - `settings: optional object { delivery_delay, delivery_paused, message_retention_period }`

    - `delivery_delay: optional number`

      Number of seconds to delay delivery of all messages to consumers.

    - `delivery_paused: optional boolean`

      Indicates if message delivery to consumers is currently paused.

    - `message_retention_period: optional number`

      Number of seconds after which an unconsumed message will be delayed.

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/queues/$QUEUE_ID \
    -X PATCH \
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
    "consumers": [
      {
        "consumer_id": "023e105f4ecef8ad9ca31a8372d0c353",
        "created_on": "2019-12-27T18:11:19.117Z",
        "dead_letter_queue": "dead_letter_queue",
        "queue_name": "example-queue",
        "script_name": "my-consumer-worker",
        "settings": {
          "batch_size": 50,
          "max_concurrency": 10,
          "max_retries": 3,
          "max_wait_time_ms": 5000,
          "retry_delay": 10
        },
        "type": "worker"
      }
    ],
    "consumers_total_count": 0,
    "created_on": "created_on",
    "modified_on": "modified_on",
    "producers": [
      {
        "script": "script",
        "type": "worker"
      }
    ],
    "producers_total_count": 0,
    "queue_id": "queue_id",
    "queue_name": "example-queue",
    "settings": {
      "delivery_delay": 5,
      "delivery_paused": true,
      "message_retention_period": 345600
    }
  },
  "success": true
}
```

## Delete Queue

**delete** `/accounts/{account_id}/queues/{queue_id}`

Deletes a queue

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

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/queues/$QUEUE_ID \
    -X DELETE \
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
  "success": true
}
```

## Domain Types

### Queue

- `Queue object { consumers, consumers_total_count, created_on, 6 more }`

  - `consumers: optional array of Consumer`

    - `Worker object { consumer_id, created_on, dead_letter_queue, 4 more }`

      - `consumer_id: optional string`

        A Resource identifier.

      - `created_on: optional string`

      - `dead_letter_queue: optional string`

        Name of the dead letter queue, or empty string if not configured

      - `queue_name: optional string`

      - `script_name: optional string`

        Name of a Worker

      - `settings: optional object { batch_size, max_concurrency, max_retries, 2 more }`

        - `batch_size: optional number`

          The maximum number of messages to include in a batch.

        - `max_concurrency: optional number`

          Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (recommended).

        - `max_retries: optional number`

          The maximum number of retries

        - `max_wait_time_ms: optional number`

          The number of milliseconds to wait for a batch to fill up before attempting to deliver it

        - `retry_delay: optional number`

          The number of seconds to delay before making the message available for another attempt.

      - `type: optional "worker"`

        - `"worker"`

    - `HTTPPull object { consumer_id, created_on, dead_letter_queue, 3 more }`

      - `consumer_id: optional string`

        A Resource identifier.

      - `created_on: optional string`

      - `dead_letter_queue: optional string`

        Name of the dead letter queue, or empty string if not configured

      - `queue_name: optional string`

      - `settings: optional object { batch_size, max_retries, retry_delay, visibility_timeout_ms }`

        - `batch_size: optional number`

          The maximum number of messages to include in a batch.

        - `max_retries: optional number`

          The maximum number of retries

        - `retry_delay: optional number`

          The number of seconds to delay before making the message available for another attempt.

        - `visibility_timeout_ms: optional number`

          The number of milliseconds that a message is exclusively leased. After the timeout, the message becomes available for another attempt.

      - `type: optional "http_pull"`

        - `"http_pull"`

  - `consumers_total_count: optional number`

  - `created_on: optional string`

  - `modified_on: optional string`

  - `producers: optional array of object { script, type }  or object { bucket_name, type }`

    - `MqWorkerProducer object { script, type }`

      - `script: optional string`

      - `type: optional "worker"`

        - `"worker"`

    - `MqR2Producer object { bucket_name, type }`

      - `bucket_name: optional string`

      - `type: optional "r2_bucket"`

        - `"r2_bucket"`

  - `producers_total_count: optional number`

  - `queue_id: optional string`

  - `queue_name: optional string`

  - `settings: optional object { delivery_delay, delivery_paused, message_retention_period }`

    - `delivery_delay: optional number`

      Number of seconds to delay delivery of all messages to consumers.

    - `delivery_paused: optional boolean`

      Indicates if message delivery to consumers is currently paused.

    - `message_retention_period: optional number`

      Number of seconds after which an unconsumed message will be delayed.

### Queue Get Metrics Response

- `QueueGetMetricsResponse object { backlog_bytes, backlog_count, oldest_message_timestamp_ms }`

  Best-effort metrics for the queue. Values may be approximate due to the distributed nature of queues.

  - `backlog_bytes: number`

    The size in bytes of unacknowledged messages in the queue.

  - `backlog_count: number`

    The number of unacknowledged messages in the queue.

  - `oldest_message_timestamp_ms: number`

    Unix timestamp in milliseconds of the oldest unacknowledged message in the queue. Returns 0 if unknown.

### Queue Delete Response

- `QueueDeleteResponse object { errors, messages, success }`

  - `errors: optional array of ResponseInfo`

    - `code: number`

    - `message: string`

    - `documentation_url: optional string`

    - `source: optional object { pointer }`

      - `pointer: optional string`

  - `messages: optional array of string`

  - `success: optional true`

    Indicates if the API call was successful or not.

    - `true`

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

# Purge

## Get Queue Purge Status

**get** `/accounts/{account_id}/queues/{queue_id}/purge`

Get details about a Queue's purge status.

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

- `result: optional object { completed, started_at }`

  - `completed: optional string`

    Indicates if the last purge operation completed successfully.

  - `started_at: optional string`

    Timestamp when the last purge operation started.

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/queues/$QUEUE_ID/purge \
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
    "completed": "completed",
    "started_at": "started_at"
  },
  "success": true
}
```

## Purge Queue

**post** `/accounts/{account_id}/queues/{queue_id}/purge`

Deletes all messages from the Queue.

### Path Parameters

- `account_id: string`

  A Resource identifier.

- `queue_id: string`

  A Resource identifier.

### Body Parameters

- `delete_messages_permanently: optional boolean`

  Confimation that all messages will be deleted permanently.

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional Queue`

  - `consumers: optional array of Consumer`

    - `Worker object { consumer_id, created_on, dead_letter_queue, 4 more }`

      - `consumer_id: optional string`

        A Resource identifier.

      - `created_on: optional string`

      - `dead_letter_queue: optional string`

        Name of the dead letter queue, or empty string if not configured

      - `queue_name: optional string`

      - `script_name: optional string`

        Name of a Worker

      - `settings: optional object { batch_size, max_concurrency, max_retries, 2 more }`

        - `batch_size: optional number`

          The maximum number of messages to include in a batch.

        - `max_concurrency: optional number`

          Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (recommended).

        - `max_retries: optional number`

          The maximum number of retries

        - `max_wait_time_ms: optional number`

          The number of milliseconds to wait for a batch to fill up before attempting to deliver it

        - `retry_delay: optional number`

          The number of seconds to delay before making the message available for another attempt.

      - `type: optional "worker"`

        - `"worker"`

    - `HTTPPull object { consumer_id, created_on, dead_letter_queue, 3 more }`

      - `consumer_id: optional string`

        A Resource identifier.

      - `created_on: optional string`

      - `dead_letter_queue: optional string`

        Name of the dead letter queue, or empty string if not configured

      - `queue_name: optional string`

      - `settings: optional object { batch_size, max_retries, retry_delay, visibility_timeout_ms }`

        - `batch_size: optional number`

          The maximum number of messages to include in a batch.

        - `max_retries: optional number`

          The maximum number of retries

        - `retry_delay: optional number`

          The number of seconds to delay before making the message available for another attempt.

        - `visibility_timeout_ms: optional number`

          The number of milliseconds that a message is exclusively leased. After the timeout, the message becomes available for another attempt.

      - `type: optional "http_pull"`

        - `"http_pull"`

  - `consumers_total_count: optional number`

  - `created_on: optional string`

  - `modified_on: optional string`

  - `producers: optional array of object { script, type }  or object { bucket_name, type }`

    - `MqWorkerProducer object { script, type }`

      - `script: optional string`

      - `type: optional "worker"`

        - `"worker"`

    - `MqR2Producer object { bucket_name, type }`

      - `bucket_name: optional string`

      - `type: optional "r2_bucket"`

        - `"r2_bucket"`

  - `producers_total_count: optional number`

  - `queue_id: optional string`

  - `queue_name: optional string`

  - `settings: optional object { delivery_delay, delivery_paused, message_retention_period }`

    - `delivery_delay: optional number`

      Number of seconds to delay delivery of all messages to consumers.

    - `delivery_paused: optional boolean`

      Indicates if message delivery to consumers is currently paused.

    - `message_retention_period: optional number`

      Number of seconds after which an unconsumed message will be delayed.

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/queues/$QUEUE_ID/purge \
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
    "consumers": [
      {
        "consumer_id": "023e105f4ecef8ad9ca31a8372d0c353",
        "created_on": "2019-12-27T18:11:19.117Z",
        "dead_letter_queue": "dead_letter_queue",
        "queue_name": "example-queue",
        "script_name": "my-consumer-worker",
        "settings": {
          "batch_size": 50,
          "max_concurrency": 10,
          "max_retries": 3,
          "max_wait_time_ms": 5000,
          "retry_delay": 10
        },
        "type": "worker"
      }
    ],
    "consumers_total_count": 0,
    "created_on": "created_on",
    "modified_on": "modified_on",
    "producers": [
      {
        "script": "script",
        "type": "worker"
      }
    ],
    "producers_total_count": 0,
    "queue_id": "queue_id",
    "queue_name": "example-queue",
    "settings": {
      "delivery_delay": 5,
      "delivery_paused": true,
      "message_retention_period": 345600
    }
  },
  "success": true
}
```

## Domain Types

### Purge Status Response

- `PurgeStatusResponse object { completed, started_at }`

  - `completed: optional string`

    Indicates if the last purge operation completed successfully.

  - `started_at: optional string`

    Timestamp when the last purge operation started.

# Consumers

## List Queue Consumers

**get** `/accounts/{account_id}/queues/{queue_id}/consumers`

Returns the consumers for a Queue

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

- `result: optional array of Consumer`

  - `Worker object { consumer_id, created_on, dead_letter_queue, 4 more }`

    - `consumer_id: optional string`

      A Resource identifier.

    - `created_on: optional string`

    - `dead_letter_queue: optional string`

      Name of the dead letter queue, or empty string if not configured

    - `queue_name: optional string`

    - `script_name: optional string`

      Name of a Worker

    - `settings: optional object { batch_size, max_concurrency, max_retries, 2 more }`

      - `batch_size: optional number`

        The maximum number of messages to include in a batch.

      - `max_concurrency: optional number`

        Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (recommended).

      - `max_retries: optional number`

        The maximum number of retries

      - `max_wait_time_ms: optional number`

        The number of milliseconds to wait for a batch to fill up before attempting to deliver it

      - `retry_delay: optional number`

        The number of seconds to delay before making the message available for another attempt.

    - `type: optional "worker"`

      - `"worker"`

  - `HTTPPull object { consumer_id, created_on, dead_letter_queue, 3 more }`

    - `consumer_id: optional string`

      A Resource identifier.

    - `created_on: optional string`

    - `dead_letter_queue: optional string`

      Name of the dead letter queue, or empty string if not configured

    - `queue_name: optional string`

    - `settings: optional object { batch_size, max_retries, retry_delay, visibility_timeout_ms }`

      - `batch_size: optional number`

        The maximum number of messages to include in a batch.

      - `max_retries: optional number`

        The maximum number of retries

      - `retry_delay: optional number`

        The number of seconds to delay before making the message available for another attempt.

      - `visibility_timeout_ms: optional number`

        The number of milliseconds that a message is exclusively leased. After the timeout, the message becomes available for another attempt.

    - `type: optional "http_pull"`

      - `"http_pull"`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/queues/$QUEUE_ID/consumers \
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
  "result": [
    {
      "consumer_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_on": "2019-12-27T18:11:19.117Z",
      "dead_letter_queue": "dead_letter_queue",
      "queue_name": "example-queue",
      "script_name": "my-consumer-worker",
      "settings": {
        "batch_size": 50,
        "max_concurrency": 10,
        "max_retries": 3,
        "max_wait_time_ms": 5000,
        "retry_delay": 10
      },
      "type": "worker"
    }
  ],
  "success": true
}
```

## Get Queue Consumer

**get** `/accounts/{account_id}/queues/{queue_id}/consumers/{consumer_id}`

Fetches the consumer for a queue by consumer id

### Path Parameters

- `account_id: string`

  A Resource identifier.

- `queue_id: string`

  A Resource identifier.

- `consumer_id: string`

  A Resource identifier.

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional Consumer`

  Response body representing a consumer

  - `Worker object { consumer_id, created_on, dead_letter_queue, 4 more }`

    - `consumer_id: optional string`

      A Resource identifier.

    - `created_on: optional string`

    - `dead_letter_queue: optional string`

      Name of the dead letter queue, or empty string if not configured

    - `queue_name: optional string`

    - `script_name: optional string`

      Name of a Worker

    - `settings: optional object { batch_size, max_concurrency, max_retries, 2 more }`

      - `batch_size: optional number`

        The maximum number of messages to include in a batch.

      - `max_concurrency: optional number`

        Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (recommended).

      - `max_retries: optional number`

        The maximum number of retries

      - `max_wait_time_ms: optional number`

        The number of milliseconds to wait for a batch to fill up before attempting to deliver it

      - `retry_delay: optional number`

        The number of seconds to delay before making the message available for another attempt.

    - `type: optional "worker"`

      - `"worker"`

  - `HTTPPull object { consumer_id, created_on, dead_letter_queue, 3 more }`

    - `consumer_id: optional string`

      A Resource identifier.

    - `created_on: optional string`

    - `dead_letter_queue: optional string`

      Name of the dead letter queue, or empty string if not configured

    - `queue_name: optional string`

    - `settings: optional object { batch_size, max_retries, retry_delay, visibility_timeout_ms }`

      - `batch_size: optional number`

        The maximum number of messages to include in a batch.

      - `max_retries: optional number`

        The maximum number of retries

      - `retry_delay: optional number`

        The number of seconds to delay before making the message available for another attempt.

      - `visibility_timeout_ms: optional number`

        The number of milliseconds that a message is exclusively leased. After the timeout, the message becomes available for another attempt.

    - `type: optional "http_pull"`

      - `"http_pull"`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/queues/$QUEUE_ID/consumers/$CONSUMER_ID \
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
    "consumer_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2019-12-27T18:11:19.117Z",
    "dead_letter_queue": "dead_letter_queue",
    "queue_name": "example-queue",
    "script_name": "my-consumer-worker",
    "settings": {
      "batch_size": 50,
      "max_concurrency": 10,
      "max_retries": 3,
      "max_wait_time_ms": 5000,
      "retry_delay": 10
    },
    "type": "worker"
  },
  "success": true
}
```

## Create a Queue Consumer

**post** `/accounts/{account_id}/queues/{queue_id}/consumers`

Creates a new consumer for a Queue

### Path Parameters

- `account_id: string`

  A Resource identifier.

- `queue_id: string`

  A Resource identifier.

### Body Parameters

- `body: object { script_name, type, dead_letter_queue, settings }  or object { type, dead_letter_queue, settings }`

  Request body for creating or updating a consumer

  - `Worker object { script_name, type, dead_letter_queue, settings }`

    - `script_name: string`

      Name of a Worker

    - `type: "worker"`

      - `"worker"`

    - `dead_letter_queue: optional string`

    - `settings: optional object { batch_size, max_concurrency, max_retries, 2 more }`

      - `batch_size: optional number`

        The maximum number of messages to include in a batch.

      - `max_concurrency: optional number`

        Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (recommended).

      - `max_retries: optional number`

        The maximum number of retries

      - `max_wait_time_ms: optional number`

        The number of milliseconds to wait for a batch to fill up before attempting to deliver it

      - `retry_delay: optional number`

        The number of seconds to delay before making the message available for another attempt.

  - `HTTPPull object { type, dead_letter_queue, settings }`

    - `type: "http_pull"`

      - `"http_pull"`

    - `dead_letter_queue: optional string`

    - `settings: optional object { batch_size, max_retries, retry_delay, visibility_timeout_ms }`

      - `batch_size: optional number`

        The maximum number of messages to include in a batch.

      - `max_retries: optional number`

        The maximum number of retries

      - `retry_delay: optional number`

        The number of seconds to delay before making the message available for another attempt.

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

- `result: optional Consumer`

  Response body representing a consumer

  - `Worker object { consumer_id, created_on, dead_letter_queue, 4 more }`

    - `consumer_id: optional string`

      A Resource identifier.

    - `created_on: optional string`

    - `dead_letter_queue: optional string`

      Name of the dead letter queue, or empty string if not configured

    - `queue_name: optional string`

    - `script_name: optional string`

      Name of a Worker

    - `settings: optional object { batch_size, max_concurrency, max_retries, 2 more }`

      - `batch_size: optional number`

        The maximum number of messages to include in a batch.

      - `max_concurrency: optional number`

        Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (recommended).

      - `max_retries: optional number`

        The maximum number of retries

      - `max_wait_time_ms: optional number`

        The number of milliseconds to wait for a batch to fill up before attempting to deliver it

      - `retry_delay: optional number`

        The number of seconds to delay before making the message available for another attempt.

    - `type: optional "worker"`

      - `"worker"`

  - `HTTPPull object { consumer_id, created_on, dead_letter_queue, 3 more }`

    - `consumer_id: optional string`

      A Resource identifier.

    - `created_on: optional string`

    - `dead_letter_queue: optional string`

      Name of the dead letter queue, or empty string if not configured

    - `queue_name: optional string`

    - `settings: optional object { batch_size, max_retries, retry_delay, visibility_timeout_ms }`

      - `batch_size: optional number`

        The maximum number of messages to include in a batch.

      - `max_retries: optional number`

        The maximum number of retries

      - `retry_delay: optional number`

        The number of seconds to delay before making the message available for another attempt.

      - `visibility_timeout_ms: optional number`

        The number of milliseconds that a message is exclusively leased. After the timeout, the message becomes available for another attempt.

    - `type: optional "http_pull"`

      - `"http_pull"`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/queues/$QUEUE_ID/consumers \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "script_name": "my-consumer-worker",
          "type": "worker",
          "dead_letter_queue": "example-queue"
        }'
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
    "consumer_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2019-12-27T18:11:19.117Z",
    "dead_letter_queue": "dead_letter_queue",
    "queue_name": "example-queue",
    "script_name": "my-consumer-worker",
    "settings": {
      "batch_size": 50,
      "max_concurrency": 10,
      "max_retries": 3,
      "max_wait_time_ms": 5000,
      "retry_delay": 10
    },
    "type": "worker"
  },
  "success": true
}
```

## Update Queue Consumer

**put** `/accounts/{account_id}/queues/{queue_id}/consumers/{consumer_id}`

Updates the consumer for a queue, or creates one if it does not exist.

### Path Parameters

- `account_id: string`

  A Resource identifier.

- `queue_id: string`

  A Resource identifier.

- `consumer_id: string`

  A Resource identifier.

### Body Parameters

- `body: object { script_name, type, dead_letter_queue, settings }  or object { type, dead_letter_queue, settings }`

  Request body for creating or updating a consumer

  - `Worker object { script_name, type, dead_letter_queue, settings }`

    - `script_name: string`

      Name of a Worker

    - `type: "worker"`

      - `"worker"`

    - `dead_letter_queue: optional string`

    - `settings: optional object { batch_size, max_concurrency, max_retries, 2 more }`

      - `batch_size: optional number`

        The maximum number of messages to include in a batch.

      - `max_concurrency: optional number`

        Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (recommended).

      - `max_retries: optional number`

        The maximum number of retries

      - `max_wait_time_ms: optional number`

        The number of milliseconds to wait for a batch to fill up before attempting to deliver it

      - `retry_delay: optional number`

        The number of seconds to delay before making the message available for another attempt.

  - `HTTPPull object { type, dead_letter_queue, settings }`

    - `type: "http_pull"`

      - `"http_pull"`

    - `dead_letter_queue: optional string`

    - `settings: optional object { batch_size, max_retries, retry_delay, visibility_timeout_ms }`

      - `batch_size: optional number`

        The maximum number of messages to include in a batch.

      - `max_retries: optional number`

        The maximum number of retries

      - `retry_delay: optional number`

        The number of seconds to delay before making the message available for another attempt.

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

- `result: optional Consumer`

  Response body representing a consumer

  - `Worker object { consumer_id, created_on, dead_letter_queue, 4 more }`

    - `consumer_id: optional string`

      A Resource identifier.

    - `created_on: optional string`

    - `dead_letter_queue: optional string`

      Name of the dead letter queue, or empty string if not configured

    - `queue_name: optional string`

    - `script_name: optional string`

      Name of a Worker

    - `settings: optional object { batch_size, max_concurrency, max_retries, 2 more }`

      - `batch_size: optional number`

        The maximum number of messages to include in a batch.

      - `max_concurrency: optional number`

        Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (recommended).

      - `max_retries: optional number`

        The maximum number of retries

      - `max_wait_time_ms: optional number`

        The number of milliseconds to wait for a batch to fill up before attempting to deliver it

      - `retry_delay: optional number`

        The number of seconds to delay before making the message available for another attempt.

    - `type: optional "worker"`

      - `"worker"`

  - `HTTPPull object { consumer_id, created_on, dead_letter_queue, 3 more }`

    - `consumer_id: optional string`

      A Resource identifier.

    - `created_on: optional string`

    - `dead_letter_queue: optional string`

      Name of the dead letter queue, or empty string if not configured

    - `queue_name: optional string`

    - `settings: optional object { batch_size, max_retries, retry_delay, visibility_timeout_ms }`

      - `batch_size: optional number`

        The maximum number of messages to include in a batch.

      - `max_retries: optional number`

        The maximum number of retries

      - `retry_delay: optional number`

        The number of seconds to delay before making the message available for another attempt.

      - `visibility_timeout_ms: optional number`

        The number of milliseconds that a message is exclusively leased. After the timeout, the message becomes available for another attempt.

    - `type: optional "http_pull"`

      - `"http_pull"`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/queues/$QUEUE_ID/consumers/$CONSUMER_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "script_name": "my-consumer-worker",
          "type": "worker",
          "dead_letter_queue": "example-queue"
        }'
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
    "consumer_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2019-12-27T18:11:19.117Z",
    "dead_letter_queue": "dead_letter_queue",
    "queue_name": "example-queue",
    "script_name": "my-consumer-worker",
    "settings": {
      "batch_size": 50,
      "max_concurrency": 10,
      "max_retries": 3,
      "max_wait_time_ms": 5000,
      "retry_delay": 10
    },
    "type": "worker"
  },
  "success": true
}
```

## Delete Queue Consumer

**delete** `/accounts/{account_id}/queues/{queue_id}/consumers/{consumer_id}`

Deletes the consumer for a queue.

### Path Parameters

- `account_id: string`

  A Resource identifier.

- `queue_id: string`

  A Resource identifier.

- `consumer_id: string`

  A Resource identifier.

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/queues/$QUEUE_ID/consumers/$CONSUMER_ID \
    -X DELETE \
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
  "success": true
}
```

## Domain Types

### Consumer

- `Consumer = object { consumer_id, created_on, dead_letter_queue, 4 more }  or object { consumer_id, created_on, dead_letter_queue, 3 more }`

  Response body representing a consumer

  - `Worker object { consumer_id, created_on, dead_letter_queue, 4 more }`

    - `consumer_id: optional string`

      A Resource identifier.

    - `created_on: optional string`

    - `dead_letter_queue: optional string`

      Name of the dead letter queue, or empty string if not configured

    - `queue_name: optional string`

    - `script_name: optional string`

      Name of a Worker

    - `settings: optional object { batch_size, max_concurrency, max_retries, 2 more }`

      - `batch_size: optional number`

        The maximum number of messages to include in a batch.

      - `max_concurrency: optional number`

        Maximum number of concurrent consumers that may consume from this Queue. Set to `null` to automatically opt in to the platform's maximum (recommended).

      - `max_retries: optional number`

        The maximum number of retries

      - `max_wait_time_ms: optional number`

        The number of milliseconds to wait for a batch to fill up before attempting to deliver it

      - `retry_delay: optional number`

        The number of seconds to delay before making the message available for another attempt.

    - `type: optional "worker"`

      - `"worker"`

  - `HTTPPull object { consumer_id, created_on, dead_letter_queue, 3 more }`

    - `consumer_id: optional string`

      A Resource identifier.

    - `created_on: optional string`

    - `dead_letter_queue: optional string`

      Name of the dead letter queue, or empty string if not configured

    - `queue_name: optional string`

    - `settings: optional object { batch_size, max_retries, retry_delay, visibility_timeout_ms }`

      - `batch_size: optional number`

        The maximum number of messages to include in a batch.

      - `max_retries: optional number`

        The maximum number of retries

      - `retry_delay: optional number`

        The number of seconds to delay before making the message available for another attempt.

      - `visibility_timeout_ms: optional number`

        The number of milliseconds that a message is exclusively leased. After the timeout, the message becomes available for another attempt.

    - `type: optional "http_pull"`

      - `"http_pull"`

### Consumer Delete Response

- `ConsumerDeleteResponse object { errors, messages, success }`

  - `errors: optional array of ResponseInfo`

    - `code: number`

    - `message: string`

    - `documentation_url: optional string`

    - `source: optional object { pointer }`

      - `pointer: optional string`

  - `messages: optional array of string`

  - `success: optional true`

    Indicates if the API call was successful or not.

    - `true`

# Subscriptions

## List Event Subscriptions

**get** `/accounts/{account_id}/event_subscriptions/subscriptions`

Get a paginated list of event subscriptions with optional sorting and filtering

### Path Parameters

- `account_id: string`

  A Resource identifier.

### Query Parameters

- `direction: optional "asc" or "desc"`

  Sort direction

  - `"asc"`

  - `"desc"`

- `order: optional "created_at" or "name" or "enabled" or "source"`

  Field to sort by

  - `"created_at"`

  - `"name"`

  - `"enabled"`

  - `"source"`

- `page: optional number`

  Page number for pagination

- `per_page: optional number`

  Number of items per page

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional array of object { id, created_at, destination, 5 more }`

  - `id: string`

    Unique identifier for the subscription

  - `created_at: string`

    When the subscription was created

  - `destination: object { queue_id, type }`

    Destination configuration for the subscription

    - `queue_id: string`

      ID of the target queue

    - `type: "queues.queue"`

      Type of destination

      - `"queues.queue"`

  - `enabled: boolean`

    Whether the subscription is active

  - `events: array of string`

    List of event types this subscription handles

  - `modified_at: string`

    When the subscription was last modified

  - `name: string`

    Name of the subscription

  - `source: object { type }  or object { type }  or object { type }  or 5 more`

    Source configuration for the subscription

    - `MqEventSourceImages object { type }`

      - `type: optional "images"`

        Type of source

        - `"images"`

    - `MqEventSourceKV object { type }`

      - `type: optional "kv"`

        Type of source

        - `"kv"`

    - `MqEventSourceR2 object { type }`

      - `type: optional "r2"`

        Type of source

        - `"r2"`

    - `MqEventSourceSuperSlurper object { type }`

      - `type: optional "superSlurper"`

        Type of source

        - `"superSlurper"`

    - `MqEventSourceVectorize object { type }`

      - `type: optional "vectorize"`

        Type of source

        - `"vectorize"`

    - `MqEventSourceWorkersAIModel object { model_name, type }`

      - `model_name: optional string`

        Name of the Workers AI model

      - `type: optional "workersAi.model"`

        Type of source

        - `"workersAi.model"`

    - `MqEventSourceWorkersBuildsWorker object { type, worker_name }`

      - `type: optional "workersBuilds.worker"`

        Type of source

        - `"workersBuilds.worker"`

      - `worker_name: optional string`

        Name of the worker

    - `MqEventSourceWorkflowsWorkflow object { type, workflow_name }`

      - `type: optional "workflows.workflow"`

        Type of source

        - `"workflows.workflow"`

      - `workflow_name: optional string`

        Name of the workflow

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: number`

    Number of items in current page

  - `page: number`

    Current page number

  - `per_page: number`

    Items per page

  - `total_count: number`

    Total number of items

  - `total_pages: number`

    Total number of pages

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/event_subscriptions/subscriptions \
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
  "result": [
    {
      "id": "id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "destination": {
        "queue_id": "queue_id",
        "type": "queues.queue"
      },
      "enabled": true,
      "events": [
        "string"
      ],
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "source": {
        "type": "images"
      }
    }
  ],
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0,
    "total_pages": 0
  },
  "success": true
}
```

## Get Event Subscription

**get** `/accounts/{account_id}/event_subscriptions/subscriptions/{subscription_id}`

Get details about an existing event subscription

### Path Parameters

- `account_id: string`

  A Resource identifier.

- `subscription_id: string`

  A Resource identifier.

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional object { id, created_at, destination, 5 more }`

  - `id: string`

    Unique identifier for the subscription

  - `created_at: string`

    When the subscription was created

  - `destination: object { queue_id, type }`

    Destination configuration for the subscription

    - `queue_id: string`

      ID of the target queue

    - `type: "queues.queue"`

      Type of destination

      - `"queues.queue"`

  - `enabled: boolean`

    Whether the subscription is active

  - `events: array of string`

    List of event types this subscription handles

  - `modified_at: string`

    When the subscription was last modified

  - `name: string`

    Name of the subscription

  - `source: object { type }  or object { type }  or object { type }  or 5 more`

    Source configuration for the subscription

    - `MqEventSourceImages object { type }`

      - `type: optional "images"`

        Type of source

        - `"images"`

    - `MqEventSourceKV object { type }`

      - `type: optional "kv"`

        Type of source

        - `"kv"`

    - `MqEventSourceR2 object { type }`

      - `type: optional "r2"`

        Type of source

        - `"r2"`

    - `MqEventSourceSuperSlurper object { type }`

      - `type: optional "superSlurper"`

        Type of source

        - `"superSlurper"`

    - `MqEventSourceVectorize object { type }`

      - `type: optional "vectorize"`

        Type of source

        - `"vectorize"`

    - `MqEventSourceWorkersAIModel object { model_name, type }`

      - `model_name: optional string`

        Name of the Workers AI model

      - `type: optional "workersAi.model"`

        Type of source

        - `"workersAi.model"`

    - `MqEventSourceWorkersBuildsWorker object { type, worker_name }`

      - `type: optional "workersBuilds.worker"`

        Type of source

        - `"workersBuilds.worker"`

      - `worker_name: optional string`

        Name of the worker

    - `MqEventSourceWorkflowsWorkflow object { type, workflow_name }`

      - `type: optional "workflows.workflow"`

        Type of source

        - `"workflows.workflow"`

      - `workflow_name: optional string`

        Name of the workflow

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/event_subscriptions/subscriptions/$SUBSCRIPTION_ID \
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
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "destination": {
      "queue_id": "queue_id",
      "type": "queues.queue"
    },
    "enabled": true,
    "events": [
      "string"
    ],
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "source": {
      "type": "images"
    }
  },
  "success": true
}
```

## Create Event Subscription

**post** `/accounts/{account_id}/event_subscriptions/subscriptions`

Create a new event subscription for a queue

### Path Parameters

- `account_id: string`

  A Resource identifier.

### Body Parameters

- `destination: optional object { queue_id, type }`

  Destination configuration for the subscription

  - `queue_id: string`

    ID of the target queue

  - `type: "queues.queue"`

    Type of destination

    - `"queues.queue"`

- `enabled: optional boolean`

  Whether the subscription is active

- `events: optional array of string`

  List of event types this subscription handles

- `name: optional string`

  Name of the subscription

- `source: optional object { type }  or object { type }  or object { type }  or 5 more`

  Source configuration for the subscription

  - `MqEventSourceImages object { type }`

    - `type: optional "images"`

      Type of source

      - `"images"`

  - `MqEventSourceKV object { type }`

    - `type: optional "kv"`

      Type of source

      - `"kv"`

  - `MqEventSourceR2 object { type }`

    - `type: optional "r2"`

      Type of source

      - `"r2"`

  - `MqEventSourceSuperSlurper object { type }`

    - `type: optional "superSlurper"`

      Type of source

      - `"superSlurper"`

  - `MqEventSourceVectorize object { type }`

    - `type: optional "vectorize"`

      Type of source

      - `"vectorize"`

  - `MqEventSourceWorkersAIModel object { model_name, type }`

    - `model_name: optional string`

      Name of the Workers AI model

    - `type: optional "workersAi.model"`

      Type of source

      - `"workersAi.model"`

  - `MqEventSourceWorkersBuildsWorker object { type, worker_name }`

    - `type: optional "workersBuilds.worker"`

      Type of source

      - `"workersBuilds.worker"`

    - `worker_name: optional string`

      Name of the worker

  - `MqEventSourceWorkflowsWorkflow object { type, workflow_name }`

    - `type: optional "workflows.workflow"`

      Type of source

      - `"workflows.workflow"`

    - `workflow_name: optional string`

      Name of the workflow

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional object { id, created_at, destination, 5 more }`

  - `id: string`

    Unique identifier for the subscription

  - `created_at: string`

    When the subscription was created

  - `destination: object { queue_id, type }`

    Destination configuration for the subscription

    - `queue_id: string`

      ID of the target queue

    - `type: "queues.queue"`

      Type of destination

      - `"queues.queue"`

  - `enabled: boolean`

    Whether the subscription is active

  - `events: array of string`

    List of event types this subscription handles

  - `modified_at: string`

    When the subscription was last modified

  - `name: string`

    Name of the subscription

  - `source: object { type }  or object { type }  or object { type }  or 5 more`

    Source configuration for the subscription

    - `MqEventSourceImages object { type }`

      - `type: optional "images"`

        Type of source

        - `"images"`

    - `MqEventSourceKV object { type }`

      - `type: optional "kv"`

        Type of source

        - `"kv"`

    - `MqEventSourceR2 object { type }`

      - `type: optional "r2"`

        Type of source

        - `"r2"`

    - `MqEventSourceSuperSlurper object { type }`

      - `type: optional "superSlurper"`

        Type of source

        - `"superSlurper"`

    - `MqEventSourceVectorize object { type }`

      - `type: optional "vectorize"`

        Type of source

        - `"vectorize"`

    - `MqEventSourceWorkersAIModel object { model_name, type }`

      - `model_name: optional string`

        Name of the Workers AI model

      - `type: optional "workersAi.model"`

        Type of source

        - `"workersAi.model"`

    - `MqEventSourceWorkersBuildsWorker object { type, worker_name }`

      - `type: optional "workersBuilds.worker"`

        Type of source

        - `"workersBuilds.worker"`

      - `worker_name: optional string`

        Name of the worker

    - `MqEventSourceWorkflowsWorkflow object { type, workflow_name }`

      - `type: optional "workflows.workflow"`

        Type of source

        - `"workflows.workflow"`

      - `workflow_name: optional string`

        Name of the workflow

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/event_subscriptions/subscriptions \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "destination": {
      "queue_id": "queue_id",
      "type": "queues.queue"
    },
    "enabled": true,
    "events": [
      "string"
    ],
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "source": {
      "type": "images"
    }
  },
  "success": true
}
```

## Update Event Subscription

**patch** `/accounts/{account_id}/event_subscriptions/subscriptions/{subscription_id}`

Update an existing event subscription

### Path Parameters

- `account_id: string`

  A Resource identifier.

- `subscription_id: string`

  A Resource identifier.

### Body Parameters

- `destination: optional object { queue_id, type }`

  Destination configuration for the subscription

  - `queue_id: string`

    ID of the target queue

  - `type: "queues.queue"`

    Type of destination

    - `"queues.queue"`

- `enabled: optional boolean`

  Whether the subscription is active

- `events: optional array of string`

  List of event types this subscription handles

- `name: optional string`

  Name of the subscription

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional object { id, created_at, destination, 5 more }`

  - `id: string`

    Unique identifier for the subscription

  - `created_at: string`

    When the subscription was created

  - `destination: object { queue_id, type }`

    Destination configuration for the subscription

    - `queue_id: string`

      ID of the target queue

    - `type: "queues.queue"`

      Type of destination

      - `"queues.queue"`

  - `enabled: boolean`

    Whether the subscription is active

  - `events: array of string`

    List of event types this subscription handles

  - `modified_at: string`

    When the subscription was last modified

  - `name: string`

    Name of the subscription

  - `source: object { type }  or object { type }  or object { type }  or 5 more`

    Source configuration for the subscription

    - `MqEventSourceImages object { type }`

      - `type: optional "images"`

        Type of source

        - `"images"`

    - `MqEventSourceKV object { type }`

      - `type: optional "kv"`

        Type of source

        - `"kv"`

    - `MqEventSourceR2 object { type }`

      - `type: optional "r2"`

        Type of source

        - `"r2"`

    - `MqEventSourceSuperSlurper object { type }`

      - `type: optional "superSlurper"`

        Type of source

        - `"superSlurper"`

    - `MqEventSourceVectorize object { type }`

      - `type: optional "vectorize"`

        Type of source

        - `"vectorize"`

    - `MqEventSourceWorkersAIModel object { model_name, type }`

      - `model_name: optional string`

        Name of the Workers AI model

      - `type: optional "workersAi.model"`

        Type of source

        - `"workersAi.model"`

    - `MqEventSourceWorkersBuildsWorker object { type, worker_name }`

      - `type: optional "workersBuilds.worker"`

        Type of source

        - `"workersBuilds.worker"`

      - `worker_name: optional string`

        Name of the worker

    - `MqEventSourceWorkflowsWorkflow object { type, workflow_name }`

      - `type: optional "workflows.workflow"`

        Type of source

        - `"workflows.workflow"`

      - `workflow_name: optional string`

        Name of the workflow

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/event_subscriptions/subscriptions/$SUBSCRIPTION_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "destination": {
      "queue_id": "queue_id",
      "type": "queues.queue"
    },
    "enabled": true,
    "events": [
      "string"
    ],
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "source": {
      "type": "images"
    }
  },
  "success": true
}
```

## Delete Event Subscription

**delete** `/accounts/{account_id}/event_subscriptions/subscriptions/{subscription_id}`

Delete an existing event subscription

### Path Parameters

- `account_id: string`

  A Resource identifier.

- `subscription_id: string`

  A Resource identifier.

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional object { id, created_at, destination, 5 more }`

  - `id: string`

    Unique identifier for the subscription

  - `created_at: string`

    When the subscription was created

  - `destination: object { queue_id, type }`

    Destination configuration for the subscription

    - `queue_id: string`

      ID of the target queue

    - `type: "queues.queue"`

      Type of destination

      - `"queues.queue"`

  - `enabled: boolean`

    Whether the subscription is active

  - `events: array of string`

    List of event types this subscription handles

  - `modified_at: string`

    When the subscription was last modified

  - `name: string`

    Name of the subscription

  - `source: object { type }  or object { type }  or object { type }  or 5 more`

    Source configuration for the subscription

    - `MqEventSourceImages object { type }`

      - `type: optional "images"`

        Type of source

        - `"images"`

    - `MqEventSourceKV object { type }`

      - `type: optional "kv"`

        Type of source

        - `"kv"`

    - `MqEventSourceR2 object { type }`

      - `type: optional "r2"`

        Type of source

        - `"r2"`

    - `MqEventSourceSuperSlurper object { type }`

      - `type: optional "superSlurper"`

        Type of source

        - `"superSlurper"`

    - `MqEventSourceVectorize object { type }`

      - `type: optional "vectorize"`

        Type of source

        - `"vectorize"`

    - `MqEventSourceWorkersAIModel object { model_name, type }`

      - `model_name: optional string`

        Name of the Workers AI model

      - `type: optional "workersAi.model"`

        Type of source

        - `"workersAi.model"`

    - `MqEventSourceWorkersBuildsWorker object { type, worker_name }`

      - `type: optional "workersBuilds.worker"`

        Type of source

        - `"workersBuilds.worker"`

      - `worker_name: optional string`

        Name of the worker

    - `MqEventSourceWorkflowsWorkflow object { type, workflow_name }`

      - `type: optional "workflows.workflow"`

        Type of source

        - `"workflows.workflow"`

      - `workflow_name: optional string`

        Name of the workflow

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/event_subscriptions/subscriptions/$SUBSCRIPTION_ID \
    -X DELETE \
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
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "destination": {
      "queue_id": "queue_id",
      "type": "queues.queue"
    },
    "enabled": true,
    "events": [
      "string"
    ],
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "source": {
      "type": "images"
    }
  },
  "success": true
}
```

## Domain Types

### Subscription List Response

- `SubscriptionListResponse object { id, created_at, destination, 5 more }`

  - `id: string`

    Unique identifier for the subscription

  - `created_at: string`

    When the subscription was created

  - `destination: object { queue_id, type }`

    Destination configuration for the subscription

    - `queue_id: string`

      ID of the target queue

    - `type: "queues.queue"`

      Type of destination

      - `"queues.queue"`

  - `enabled: boolean`

    Whether the subscription is active

  - `events: array of string`

    List of event types this subscription handles

  - `modified_at: string`

    When the subscription was last modified

  - `name: string`

    Name of the subscription

  - `source: object { type }  or object { type }  or object { type }  or 5 more`

    Source configuration for the subscription

    - `MqEventSourceImages object { type }`

      - `type: optional "images"`

        Type of source

        - `"images"`

    - `MqEventSourceKV object { type }`

      - `type: optional "kv"`

        Type of source

        - `"kv"`

    - `MqEventSourceR2 object { type }`

      - `type: optional "r2"`

        Type of source

        - `"r2"`

    - `MqEventSourceSuperSlurper object { type }`

      - `type: optional "superSlurper"`

        Type of source

        - `"superSlurper"`

    - `MqEventSourceVectorize object { type }`

      - `type: optional "vectorize"`

        Type of source

        - `"vectorize"`

    - `MqEventSourceWorkersAIModel object { model_name, type }`

      - `model_name: optional string`

        Name of the Workers AI model

      - `type: optional "workersAi.model"`

        Type of source

        - `"workersAi.model"`

    - `MqEventSourceWorkersBuildsWorker object { type, worker_name }`

      - `type: optional "workersBuilds.worker"`

        Type of source

        - `"workersBuilds.worker"`

      - `worker_name: optional string`

        Name of the worker

    - `MqEventSourceWorkflowsWorkflow object { type, workflow_name }`

      - `type: optional "workflows.workflow"`

        Type of source

        - `"workflows.workflow"`

      - `workflow_name: optional string`

        Name of the workflow

### Subscription Get Response

- `SubscriptionGetResponse object { id, created_at, destination, 5 more }`

  - `id: string`

    Unique identifier for the subscription

  - `created_at: string`

    When the subscription was created

  - `destination: object { queue_id, type }`

    Destination configuration for the subscription

    - `queue_id: string`

      ID of the target queue

    - `type: "queues.queue"`

      Type of destination

      - `"queues.queue"`

  - `enabled: boolean`

    Whether the subscription is active

  - `events: array of string`

    List of event types this subscription handles

  - `modified_at: string`

    When the subscription was last modified

  - `name: string`

    Name of the subscription

  - `source: object { type }  or object { type }  or object { type }  or 5 more`

    Source configuration for the subscription

    - `MqEventSourceImages object { type }`

      - `type: optional "images"`

        Type of source

        - `"images"`

    - `MqEventSourceKV object { type }`

      - `type: optional "kv"`

        Type of source

        - `"kv"`

    - `MqEventSourceR2 object { type }`

      - `type: optional "r2"`

        Type of source

        - `"r2"`

    - `MqEventSourceSuperSlurper object { type }`

      - `type: optional "superSlurper"`

        Type of source

        - `"superSlurper"`

    - `MqEventSourceVectorize object { type }`

      - `type: optional "vectorize"`

        Type of source

        - `"vectorize"`

    - `MqEventSourceWorkersAIModel object { model_name, type }`

      - `model_name: optional string`

        Name of the Workers AI model

      - `type: optional "workersAi.model"`

        Type of source

        - `"workersAi.model"`

    - `MqEventSourceWorkersBuildsWorker object { type, worker_name }`

      - `type: optional "workersBuilds.worker"`

        Type of source

        - `"workersBuilds.worker"`

      - `worker_name: optional string`

        Name of the worker

    - `MqEventSourceWorkflowsWorkflow object { type, workflow_name }`

      - `type: optional "workflows.workflow"`

        Type of source

        - `"workflows.workflow"`

      - `workflow_name: optional string`

        Name of the workflow

### Subscription Create Response

- `SubscriptionCreateResponse object { id, created_at, destination, 5 more }`

  - `id: string`

    Unique identifier for the subscription

  - `created_at: string`

    When the subscription was created

  - `destination: object { queue_id, type }`

    Destination configuration for the subscription

    - `queue_id: string`

      ID of the target queue

    - `type: "queues.queue"`

      Type of destination

      - `"queues.queue"`

  - `enabled: boolean`

    Whether the subscription is active

  - `events: array of string`

    List of event types this subscription handles

  - `modified_at: string`

    When the subscription was last modified

  - `name: string`

    Name of the subscription

  - `source: object { type }  or object { type }  or object { type }  or 5 more`

    Source configuration for the subscription

    - `MqEventSourceImages object { type }`

      - `type: optional "images"`

        Type of source

        - `"images"`

    - `MqEventSourceKV object { type }`

      - `type: optional "kv"`

        Type of source

        - `"kv"`

    - `MqEventSourceR2 object { type }`

      - `type: optional "r2"`

        Type of source

        - `"r2"`

    - `MqEventSourceSuperSlurper object { type }`

      - `type: optional "superSlurper"`

        Type of source

        - `"superSlurper"`

    - `MqEventSourceVectorize object { type }`

      - `type: optional "vectorize"`

        Type of source

        - `"vectorize"`

    - `MqEventSourceWorkersAIModel object { model_name, type }`

      - `model_name: optional string`

        Name of the Workers AI model

      - `type: optional "workersAi.model"`

        Type of source

        - `"workersAi.model"`

    - `MqEventSourceWorkersBuildsWorker object { type, worker_name }`

      - `type: optional "workersBuilds.worker"`

        Type of source

        - `"workersBuilds.worker"`

      - `worker_name: optional string`

        Name of the worker

    - `MqEventSourceWorkflowsWorkflow object { type, workflow_name }`

      - `type: optional "workflows.workflow"`

        Type of source

        - `"workflows.workflow"`

      - `workflow_name: optional string`

        Name of the workflow

### Subscription Update Response

- `SubscriptionUpdateResponse object { id, created_at, destination, 5 more }`

  - `id: string`

    Unique identifier for the subscription

  - `created_at: string`

    When the subscription was created

  - `destination: object { queue_id, type }`

    Destination configuration for the subscription

    - `queue_id: string`

      ID of the target queue

    - `type: "queues.queue"`

      Type of destination

      - `"queues.queue"`

  - `enabled: boolean`

    Whether the subscription is active

  - `events: array of string`

    List of event types this subscription handles

  - `modified_at: string`

    When the subscription was last modified

  - `name: string`

    Name of the subscription

  - `source: object { type }  or object { type }  or object { type }  or 5 more`

    Source configuration for the subscription

    - `MqEventSourceImages object { type }`

      - `type: optional "images"`

        Type of source

        - `"images"`

    - `MqEventSourceKV object { type }`

      - `type: optional "kv"`

        Type of source

        - `"kv"`

    - `MqEventSourceR2 object { type }`

      - `type: optional "r2"`

        Type of source

        - `"r2"`

    - `MqEventSourceSuperSlurper object { type }`

      - `type: optional "superSlurper"`

        Type of source

        - `"superSlurper"`

    - `MqEventSourceVectorize object { type }`

      - `type: optional "vectorize"`

        Type of source

        - `"vectorize"`

    - `MqEventSourceWorkersAIModel object { model_name, type }`

      - `model_name: optional string`

        Name of the Workers AI model

      - `type: optional "workersAi.model"`

        Type of source

        - `"workersAi.model"`

    - `MqEventSourceWorkersBuildsWorker object { type, worker_name }`

      - `type: optional "workersBuilds.worker"`

        Type of source

        - `"workersBuilds.worker"`

      - `worker_name: optional string`

        Name of the worker

    - `MqEventSourceWorkflowsWorkflow object { type, workflow_name }`

      - `type: optional "workflows.workflow"`

        Type of source

        - `"workflows.workflow"`

      - `workflow_name: optional string`

        Name of the workflow

### Subscription Delete Response

- `SubscriptionDeleteResponse object { id, created_at, destination, 5 more }`

  - `id: string`

    Unique identifier for the subscription

  - `created_at: string`

    When the subscription was created

  - `destination: object { queue_id, type }`

    Destination configuration for the subscription

    - `queue_id: string`

      ID of the target queue

    - `type: "queues.queue"`

      Type of destination

      - `"queues.queue"`

  - `enabled: boolean`

    Whether the subscription is active

  - `events: array of string`

    List of event types this subscription handles

  - `modified_at: string`

    When the subscription was last modified

  - `name: string`

    Name of the subscription

  - `source: object { type }  or object { type }  or object { type }  or 5 more`

    Source configuration for the subscription

    - `MqEventSourceImages object { type }`

      - `type: optional "images"`

        Type of source

        - `"images"`

    - `MqEventSourceKV object { type }`

      - `type: optional "kv"`

        Type of source

        - `"kv"`

    - `MqEventSourceR2 object { type }`

      - `type: optional "r2"`

        Type of source

        - `"r2"`

    - `MqEventSourceSuperSlurper object { type }`

      - `type: optional "superSlurper"`

        Type of source

        - `"superSlurper"`

    - `MqEventSourceVectorize object { type }`

      - `type: optional "vectorize"`

        Type of source

        - `"vectorize"`

    - `MqEventSourceWorkersAIModel object { model_name, type }`

      - `model_name: optional string`

        Name of the Workers AI model

      - `type: optional "workersAi.model"`

        Type of source

        - `"workersAi.model"`

    - `MqEventSourceWorkersBuildsWorker object { type, worker_name }`

      - `type: optional "workersBuilds.worker"`

        Type of source

        - `"workersBuilds.worker"`

      - `worker_name: optional string`

        Name of the worker

    - `MqEventSourceWorkflowsWorkflow object { type, workflow_name }`

      - `type: optional "workflows.workflow"`

        Type of source

        - `"workflows.workflow"`

      - `workflow_name: optional string`

        Name of the workflow
