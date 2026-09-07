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
