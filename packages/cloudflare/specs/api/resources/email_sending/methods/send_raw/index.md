## Send a raw MIME email

**post** `/accounts/{account_id}/email/sending/send_raw`

Send a raw MIME email

### Path Parameters

- `account_id: string`

  Identifier of the account.

### Body Parameters

- `from: string`

  Sender email address.

- `mime_message: string`

  The full MIME-encoded email message. Should include standard RFC 5322 headers such as From, To, Subject, and Content-Type. The from and recipients fields in the request body control SMTP envelope routing; the From and To headers in the MIME message control what the recipient's email client displays.

- `recipients: array of string`

  List of recipient email addresses.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { delivered, message_id, permanent_bounces, queued }`

  - `delivered: array of string`

    Email addresses to which the message was delivered immediately.

  - `message_id: string`

    Message ID of the sent email.

  - `permanent_bounces: array of string`

    Email addresses that permanently bounced.

  - `queued: array of string`

    Email addresses for which delivery was queued for later.

- `success: true`

  - `true`

- `result_info: optional object { count, per_page, total_count, 2 more }`

  - `count: number`

  - `per_page: number`

  - `total_count: number`

  - `cursor: optional string`

  - `page: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/sending/send_raw \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "from": "sender@example.com",
          "mime_message": "From: sender@example.com\\r\\nTo: recipient@example.com\\r\\nSubject: Hello\\r\\nContent-Type: text/plain\\r\\n\\r\\nHello, World!",
          "recipients": [
            "recipient@example.com"
          ]
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
  "result": {
    "delivered": [
      "recipient@example.com"
    ],
    "message_id": "<aB3xK9mP2qR5sT8uV0wX1yZ4cD6fG7hJ9kL0@example.com>",
    "permanent_bounces": [
      "string"
    ],
    "queued": [
      "string"
    ]
  },
  "success": true,
  "result_info": {
    "count": 0,
    "per_page": 0,
    "total_count": 0,
    "cursor": "cursor",
    "page": 0
  }
}
```
