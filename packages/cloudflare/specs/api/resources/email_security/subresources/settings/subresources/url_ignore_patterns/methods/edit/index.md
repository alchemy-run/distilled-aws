## Update a URL ignore pattern

**patch** `/accounts/{account_id}/email-security/settings/url_ignore_patterns/{pattern_id}`

Updates an existing URL rewrite ignore pattern. Only provided fields will be modified.

### Path Parameters

- `account_id: string`

  Identifier.

- `pattern_id: string`

  URL ignore pattern identifier

### Body Parameters

- `comments: optional string`

  Optional note describing the reason for the ignore pattern.

- `pattern: optional string`

  Regular expression matching URLs that should not be rewritten.

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

- `result: optional object { id, created_at, pattern, 3 more }`

  A URL ignore pattern that exempts matching URLs from being rewritten by Email Security.

  - `id: string`

    URL ignore pattern identifier

  - `created_at: string`

  - `pattern: string`

    Regular expression matching URLs that should not be rewritten.

  - `comments: optional string`

    Optional note describing the reason for the ignore pattern.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/url_ignore_patterns/$PATTERN_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "comments": "Trusted internal redirect service",
          "pattern": "https://example\\\\.com/.*"
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
    "created_at": "2019-12-27T18:11:19.117Z",
    "pattern": "https://example\\.com/.*",
    "comments": "Trusted internal redirect service",
    "last_modified": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z"
  }
}
```
