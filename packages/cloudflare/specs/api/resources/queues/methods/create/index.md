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
