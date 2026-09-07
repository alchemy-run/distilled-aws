# Patterns

## Validate a DLP regex pattern

**post** `/accounts/{account_id}/dlp/patterns/validate`

Validates whether this pattern is a valid regular expression. Rejects it if
the regular expression is too complex or can match an unbounded-length
string. The regex will be rejected if it uses `*` or `+`. Bound the maximum
number of characters that can be matched using a range, e.g. `{1,100}`.

### Path Parameters

- `account_id: string`

### Body Parameters

- `regex: string`

- `max_match_bytes: optional number`

  Maximum number of bytes that the regular expression can match.

  If this is `null` then there is no limit on the length. Patterns can use
  `*` and `+`. Otherwise repeats should use a range `{m,n}` to restrict
  patterns to the length. If this field is missing, then a default length
  limit is used.

  Note that the length is specified in bytes. Since regular expressions
  use UTF-8 the pattern `.` can match up to 4 bytes. Hence `.{1,256}`
  has a maximum length of 1024 bytes.

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

- `result: optional object { valid }`

  - `valid: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/patterns/validate \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "regex": "regex"
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
    "valid": true
  }
}
```

## Domain Types

### Pattern Validate Response

- `PatternValidateResponse object { valid }`

  - `valid: boolean`
