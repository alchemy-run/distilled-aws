## List Request Messages

**post** `/accounts/{account_id}/cloudforce-one/requests/{request_id}/message`

Lists messages in a Cloudforce One intelligence request conversation.

### Path Parameters

- `account_id: string`

  Identifier.

- `request_id: string`

  UUID.

### Body Parameters

- `page: number`

  Page number of results.

- `per_page: number`

  Number of results per page.

- `after: optional string`

  Retrieve mes  ges created after this time.

- `before: optional string`

  Retrieve messages created before this time.

- `sort_by: optional string`

  Field to sort results by.

- `sort_order: optional "asc" or "desc"`

  Sort order (asc or desc).

  - `"asc"`

  - `"desc"`

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

- `result: optional array of Message`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/$REQUEST_ID/message \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "page": 0,
          "per_page": 10,
          "before": "2024-01-01T00:00:00Z",
          "sort_by": "created"
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
  "result": [
    {
      "id": 0,
      "author": "user@domain.com",
      "content": "Can you elaborate on the type of DoS that occurred?",
      "is_follow_on_request": true,
      "updated": "2022-01-01T00:00:00Z",
      "created": "2022-01-01T00:00:00Z"
    }
  ]
}
```
