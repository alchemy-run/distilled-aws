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
