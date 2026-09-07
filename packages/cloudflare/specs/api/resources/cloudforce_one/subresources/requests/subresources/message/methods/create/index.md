## Create a New Request Message

**post** `/accounts/{account_id}/cloudforce-one/requests/{request_id}/message/new`

Adds a message to a Cloudforce One intelligence request conversation.

### Path Parameters

- `account_id: string`

  Identifier.

- `request_id: string`

  UUID.

### Body Parameters

- `content: optional string`

  Content of message.

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

- `result: optional Message`

  - `id: number`

    Message ID.

  - `author: string`

    Author of message.

  - `content: string`

    Content of message.

  - `is_follow_on_request: boolean`

    Whether the message is a follow-on request.

  - `updated: string`

    Defines the message last updated time.

  - `created: optional string`

    Defines the message creation time.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/$REQUEST_ID/message/new \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "content": "Can you elaborate on the type of DoS that occurred?"
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
    "id": 0,
    "author": "user@domain.com",
    "content": "Can you elaborate on the type of DoS that occurred?",
    "is_follow_on_request": true,
    "updated": "2022-01-01T00:00:00Z",
    "created": "2022-01-01T00:00:00Z"
  }
}
```
