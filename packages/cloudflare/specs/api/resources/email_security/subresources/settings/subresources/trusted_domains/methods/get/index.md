## Get a trusted email domain

**get** `/accounts/{account_id}/email-security/settings/trusted_domains/{trusted_domain_id}`

Retrieves details for a specific trusted domain pattern including its pattern value, whether it uses regex matching, and which detection types it affects.

### Path Parameters

- `account_id: string`

  Identifier.

- `trusted_domain_id: string`

  Trusted domain identifier

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/trusted_domains/$TRUSTED_DOMAIN_ID \
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
