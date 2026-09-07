## Preview for non-detection messages

**post** `/accounts/{account_id}/email-security/investigate/preview`

Generates a preview image for a message that was not flagged as a detection. Useful for investigating benign messages. Returns a base64-encoded PNG screenshot of the email body.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `postfix_id: string`

  The identifier of the message

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

- `result: object { screenshot }`

  - `screenshot: string`

    A base64 encoded PNG image of the email.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/preview \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "postfix_id": "4Njp3P0STMz2c02Q"
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
  "result": {
    "screenshot": "screenshot"
  },
  "success": true
}
```
