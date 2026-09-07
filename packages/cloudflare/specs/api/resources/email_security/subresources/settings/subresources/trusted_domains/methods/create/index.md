## Create trusted email domain

**post** `/accounts/{account_id}/email-security/settings/trusted_domains`

Creates a new trusted domain pattern. Use for partner domains or approved senders that should bypass recent domain registration and similarity checks. Configure whether it prevents recent domain or spoof dispositions.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `is_recent: boolean`

  Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

- `is_regex: boolean`

- `is_similarity: boolean`

  Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

- `pattern: string`

- `comments: optional string`

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

- `result: optional object { id, comments, created_at, 6 more }`

  A trusted email domain

  - `id: optional string`

    Trusted domain identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `is_recent: optional boolean`

    Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

  - `is_regex: optional boolean`

  - `is_similarity: optional boolean`

    Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `pattern: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/trusted_domains \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "is_recent": true,
          "is_regex": false,
          "is_similarity": false,
          "pattern": "example.com",
          "comments": "Trusted partner domain"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "comments": "Trusted partner domain",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "is_recent": true,
    "is_regex": false,
    "is_similarity": false,
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "pattern": "example.com"
  }
}
```
