## Rotate a token

**post** `/accounts/{account_id}/moq/relays/{relay_id}/tokens/rotate`

Generates a new token for the specified type. The old token is
immediately invalidated. Token value is shown once in the response.

### Path Parameters

- `account_id: string`

  Cloudflare account identifier.

- `relay_id: string`

### Body Parameters

- `type: "publish_subscribe" or "subscribe"`

  Which token type to rotate.

  - `"publish_subscribe"`

  - `"subscribe"`

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `success: boolean`

- `result: optional object { token, type }`

  - `token: string`

    New token value (shown once). Treat as sensitive.

  - `type: "publish_subscribe" or "subscribe"`

    - `"publish_subscribe"`

    - `"subscribe"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/moq/relays/$RELAY_ID/tokens/rotate \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "type": "publish_subscribe"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "success": true,
  "result": {
    "token": "eyJhbGciOiJFZDI1NTE5...",
    "type": "publish_subscribe"
  }
}
```
