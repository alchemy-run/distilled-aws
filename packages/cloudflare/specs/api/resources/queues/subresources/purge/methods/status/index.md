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
