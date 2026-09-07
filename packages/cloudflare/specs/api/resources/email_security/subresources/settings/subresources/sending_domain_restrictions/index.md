# Sending Domain Restrictions

## List sending domain restrictions

**get** `/accounts/{account_id}/email-security/settings/sending_domain_restrictions`

Returns a paginated list of sending domain restrictions. These restrictions enforce TLS requirements for emails from specific domains. Mail without TLS from restricted domains will be dropped unless the subdomain is in the exclude list. Supports sorting and searching.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional "asc" or "desc"`

  The sorting direction.

  - `"asc"`

  - `"desc"`

- `order: optional "domain" or "created_at"`

  Field to sort by.

  - `"domain"`

  - `"created_at"`

- `page: optional number`

  Current page within paginated list of results.

- `per_page: optional number`

  The number of results per page. Maximum value is 1000.

- `search: optional string`

  Search term for filtering records. Behavior may change.

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

- `result: optional array of object { id, comments, created_at, 4 more }`

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

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/sending_domain_restrictions \
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
  "result": [
    {
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
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get a sending domain restriction

**get** `/accounts/{account_id}/email-security/settings/sending_domain_restrictions/{sending_domain_restriction_id}`

Retrieves details for a specific sending domain restriction including the domain requiring TLS and any excluded subdomains exempt from the TLS requirement.

### Path Parameters

- `account_id: string`

  Identifier.

- `sending_domain_restriction_id: string`

  Sending domain restriction identifier.

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

## Delete a sending domain restriction

**delete** `/accounts/{account_id}/email-security/settings/sending_domain_restrictions/{sending_domain_restriction_id}`

Removes a sending domain restriction. After deletion, TLS will no longer be enforced for emails from this domain.

### Path Parameters

- `account_id: string`

  Identifier.

- `sending_domain_restriction_id: string`

  Sending domain restriction identifier.

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

- `result: optional object { id }`

  - `id: string`

    Sending domain restriction identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/sending_domain_restrictions/$SENDING_DOMAIN_RESTRICTION_ID \
    -X DELETE \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
  }
}
```

## Domain Types

### Sending Domain Restriction List Response

- `SendingDomainRestrictionListResponse object { id, comments, created_at, 4 more }`

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

### Sending Domain Restriction Get Response

- `SendingDomainRestrictionGetResponse object { id, comments, created_at, 4 more }`

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

### Sending Domain Restriction Create Response

- `SendingDomainRestrictionCreateResponse object { id, comments, created_at, 4 more }`

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

### Sending Domain Restriction Edit Response

- `SendingDomainRestrictionEditResponse object { id, comments, created_at, 4 more }`

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

### Sending Domain Restriction Delete Response

- `SendingDomainRestrictionDeleteResponse object { id }`

  - `id: string`

    Sending domain restriction identifier.
