## Create webhooks

**put** `/accounts/{account_id}/stream/webhook`

Creates a webhook notification.

### Path Parameters

- `account_id: string`

  The account identifier tag.

### Body Parameters

- `notification_url: optional string`

  The URL where webhooks will be sent.

- `notificationUrl: optional string`

  The URL where webhooks will be sent.

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

- `result: optional object { modified, notification_url, notificationUrl, secret }`

  - `modified: optional string`

    The date and time the webhook was last modified.

  - `notification_url: optional string`

    The URL where webhooks will be sent.

  - `notificationUrl: optional string`

    The URL where webhooks will be sent.

  - `secret: optional string`

    The secret used to verify webhook signatures.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/webhook \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "notification_url": "https://example.com",
          "notificationUrl": "https://example.com"
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
    "modified": "2014-01-02T02:20:00Z",
    "notification_url": "https://example.com",
    "notificationUrl": "https://example.com",
    "secret": "secret"
  }
}
```
