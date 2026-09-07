## Get a blocked email sender

**get** `/accounts/{account_id}/email-security/settings/block_senders/{pattern_id}`

Retrieves details for a specific blocked sender pattern including its pattern type, value, and metadata.

### Path Parameters

- `account_id: string`

  Identifier.

- `pattern_id: string`

  Blocked sender pattern identifier

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

- `result: optional object { id, comments, created_at, 5 more }`

  A blocked sender pattern

  - `id: optional string`

    Blocked sender pattern identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `is_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `pattern: optional string`

  - `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

    Type of pattern matching.
    Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

    - `"EMAIL"`

    - `"DOMAIN"`

    - `"IP"`

    - `"UNKNOWN"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/block_senders/$PATTERN_ID \
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
  "success": true,
  "result": {
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "comments": "Block sender with email test@example.com",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "is_regex": false,
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "pattern": "test@example.com",
    "pattern_type": "EMAIL"
  }
}
```
