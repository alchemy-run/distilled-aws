## Create a sending domain restriction

**post** `/accounts/{account_id}/email-security/settings/sending_domain_restrictions`

Creates a new sending domain restriction to enforce TLS requirements for a domain. Emails without TLS from this domain will be dropped unless the subdomain is in the exclude list.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `domain: string`

  Domain that requires TLS enforcement.

- `exclude: array of string`

  Excluded subdomains that are exempt from TLS requirements.

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

- `result: optional object { id, comments, created_at, 4 more }`

  A sending domain restriction that enforces TLS (Transport Layer Security) requirements for emails from specific domains. If TLS is required, mail without TLS from the specified domain will be dropped.

  - `id: optional string`

    Sending domain restriction identifier.

  - `comments: optional string`

  - `created_at: optional string`

  - `domain: optional string`

    Domain that requires TLS enforcement.

  - `exclude: optional array of string`

    Excluded subdomains that are exempt from TLS requirements.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/sending_domain_restrictions \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "domain": "example.com",
          "exclude": [
            "subdomain.example.com"
          ],
          "comments": "Enforce TLS for all mail from this domain"
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
    "comments": "Enforce TLS for all mail from this domain",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "domain": "example.com",
    "exclude": [
      "subdomain.example.com"
    ],
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z"
  }
}
```
