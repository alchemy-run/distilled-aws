## Update a sending domain restriction

**patch** `/accounts/{account_id}/email-security/settings/sending_domain_restrictions/{sending_domain_restriction_id}`

Updates an existing sending domain restriction. Only provided fields will be modified. Changes affect which domains require TLS and which subdomains are excluded.

### Path Parameters

- `account_id: string`

  Identifier.

- `sending_domain_restriction_id: string`

  Sending domain restriction identifier.

### Body Parameters

- `comments: optional string`

- `domain: optional string`

  Domain that requires TLS enforcement.

- `exclude: optional array of string`

  Excluded subdomains that are exempt from TLS requirements.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/sending_domain_restrictions/$SENDING_DOMAIN_RESTRICTION_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "comments": "Enforce TLS for all mail from this domain",
          "domain": "example.com",
          "exclude": [
            "subdomain.example.com"
          ]
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
