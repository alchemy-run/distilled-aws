# Trace

## Get email trace

**get** `/accounts/{account_id}/email-security/investigate/{investigate_id}/trace`

Retrieves delivery and processing trace information for an email message. Shows the delivery path, retraction history, and move operations performed on the message. Useful for debugging delivery issues.

### Path Parameters

- `account_id: string`

  Identifier.

- `investigate_id: string`

  Unique identifier for a message retrieved from investigation

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

- `result: object { inbound, outbound }`

  - `inbound: object { lines, pending }`

    - `lines: optional array of object { lineno, logged_at, message, ts }`

      - `lineno: optional number`

        Line number in the trace log

      - `logged_at: optional string`

      - `message: optional string`

      - `ts: optional string`

        Deprecated, use `logged_at` instead. End of life: November 1, 2026.

    - `pending: optional boolean`

  - `outbound: object { lines, pending }`

    - `lines: optional array of object { lineno, logged_at, message, ts }`

      - `lineno: optional number`

        Line number in the trace log

      - `logged_at: optional string`

      - `message: optional string`

      - `ts: optional string`

        Deprecated, use `logged_at` instead. End of life: November 1, 2026.

    - `pending: optional boolean`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/$INVESTIGATE_ID/trace \
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
  "result": {
    "inbound": {
      "lines": [
        {
          "lineno": 0,
          "logged_at": "2019-12-27T18:11:19.117Z",
          "message": "message",
          "ts": "ts"
        }
      ],
      "pending": true
    },
    "outbound": {
      "lines": [
        {
          "lineno": 0,
          "logged_at": "2019-12-27T18:11:19.117Z",
          "message": "message",
          "ts": "ts"
        }
      ],
      "pending": true
    }
  },
  "success": true
}
```

## Domain Types

### Trace Get Response

- `TraceGetResponse object { inbound, outbound }`

  - `inbound: object { lines, pending }`

    - `lines: optional array of object { lineno, logged_at, message, ts }`

      - `lineno: optional number`

        Line number in the trace log

      - `logged_at: optional string`

      - `message: optional string`

      - `ts: optional string`

        Deprecated, use `logged_at` instead. End of life: November 1, 2026.

    - `pending: optional boolean`

  - `outbound: object { lines, pending }`

    - `lines: optional array of object { lineno, logged_at, message, ts }`

      - `lineno: optional number`

        Line number in the trace log

      - `logged_at: optional string`

      - `message: optional string`

      - `ts: optional string`

        Deprecated, use `logged_at` instead. End of life: November 1, 2026.

    - `pending: optional boolean`
