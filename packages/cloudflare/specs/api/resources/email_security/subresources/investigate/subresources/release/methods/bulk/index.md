## Release messages from quarantine

**post** `/accounts/{account_id}/email-security/investigate/release`

Releases one or more quarantined messages, delivering them to the intended recipients. Use when a message was incorrectly quarantined. Returns delivery status for each recipient.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `body: array of string`

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

- `result: array of object { id, delivered, failed, 2 more }`

  - `id: string`

    Unique identifier for a message retrieved from investigation

  - `delivered: optional array of string`

  - `failed: optional array of string`

  - `postfix_id: optional string`

    Deprecated, use `id` instead. End of life: November 1, 2026.

  - `undelivered: optional array of string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/release \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          "4Njp3P0STMz2c02Q-2024-01-05T10:00:00-12345678"
        ]'
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
  "result": [
    {
      "id": "4Njp3P0STMz2c02Q-2024-01-05T10:00:00-12345678",
      "delivered": [
        "string"
      ],
      "failed": [
        "string"
      ],
      "postfix_id": "4Njp3P0STMz2c02Q",
      "undelivered": [
        "string"
      ]
    }
  ],
  "success": true
}
```
