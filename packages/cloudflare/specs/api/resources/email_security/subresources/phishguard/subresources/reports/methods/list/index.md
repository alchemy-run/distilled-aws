## Get PhishGuard reports

**get** `/accounts/{account_id}/email-security/phishguard/reports`

Retrieves PhishGuard security alert reports for a specified date range. Reports include detected threats, dispositions, and contextual information. Use for security monitoring and threat analysis.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `end: optional string`

  End of the time range (RFC3339). Takes precedence over to_date.

- `from_date: optional string`

  Deprecated, use `start` instead. Start date in YYYY-MM-DD format.

- `start: optional string`

  Start of the time range (RFC3339). Takes precedence over from_date.

- `to_date: optional string`

  Deprecated, use `end` instead. End date in YYYY-MM-DD format.

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

- `result: array of object { id, content, disposition, 7 more }`

  - `id: number`

  - `content: string`

  - `disposition: "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

    - `"MALICIOUS"`

    - `"MALICIOUS-BEC"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"ENCRYPTED"`

    - `"EXTERNAL"`

    - `"UNKNOWN"`

    - `"NONE"`

  - `fields: object { to, from, occurred_at, 2 more }`

    - `to: array of string`

    - `from: optional string`

    - `occurred_at: optional string`

    - `postfix_id: optional string`

    - `ts: optional string`

      Deprecated, use `occurred_at` instead

  - `priority: string`

  - `title: string`

  - `created_at: optional string`

  - `tags: optional array of object { category, value }`

    - `category: string`

    - `value: string`

  - `ts: optional string`

    Deprecated, use `created_at` instead

  - `updated_at: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/phishguard/reports \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
      "id": 0,
      "content": "content",
      "disposition": "MALICIOUS",
      "fields": {
        "to": [
          "string"
        ],
        "from": "from",
        "occurred_at": "2019-12-27T18:11:19.117Z",
        "postfix_id": "postfix_id",
        "ts": "2019-12-27T18:11:19.117Z"
      },
      "priority": "priority",
      "title": "title",
      "created_at": "2019-12-27T18:11:19.117Z",
      "tags": [
        {
          "category": "category",
          "value": "value"
        }
      ],
      "ts": "2019-12-27T18:11:19.117Z",
      "updated_at": "2019-12-27T18:11:19.117Z"
    }
  ],
  "success": true
}
```
