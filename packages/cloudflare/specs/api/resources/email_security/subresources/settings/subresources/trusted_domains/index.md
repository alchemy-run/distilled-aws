# Trusted Domains

## List trusted email domains

**get** `/accounts/{account_id}/email-security/settings/trusted_domains`

Returns a paginated list of trusted domain patterns. Trusted domains prevent false positives for recently registered domains and lookalike domain detections. Patterns can use regular expressions for flexible matching.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional "asc" or "desc"`

  The sorting direction.

  - `"asc"`

  - `"desc"`

- `is_recent: optional boolean`

  Filter to show only recently registered domains that are trusted to prevent triggering Suspicious or Malicious dispositions.

- `is_similarity: optional boolean`

  Filter to show only proximity domains (partner or approved domains with similar spelling to connected domains) that prevent Spoof dispositions.

- `order: optional "pattern" or "created_at"`

  Field to sort by.

  - `"pattern"`

  - `"created_at"`

- `page: optional number`

  Current page within paginated list of results.

- `pattern: optional string`

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

- `result: optional array of object { id, comments, created_at, 6 more }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/trusted_domains \
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
      "comments": "Trusted partner domain",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "is_recent": true,
      "is_regex": false,
      "is_similarity": false,
      "last_modified": "2014-01-01T05:20:00.12345Z",
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "pattern": "example.com"
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

## Update a trusted email domain

**patch** `/accounts/{account_id}/email-security/settings/trusted_domains/{trusted_domain_id}`

Updates an existing trusted domain pattern. Only provided fields will be modified. Changes take effect for new emails matching the pattern.

### Path Parameters

- `account_id: string`

  Identifier.

- `trusted_domain_id: string`

  Trusted domain identifier

### Body Parameters

- `comments: optional string`

- `is_recent: optional boolean`

  Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

- `is_regex: optional boolean`

- `is_similarity: optional boolean`

  Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

- `pattern: optional string`

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
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "comments": "Trusted partner domain",
          "is_recent": true,
          "pattern": "example.com"
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

## Delete a trusted email domain

**delete** `/accounts/{account_id}/email-security/settings/trusted_domains/{trusted_domain_id}`

Removes a trusted domain pattern. After deletion, emails from this domain will be subject to normal recent domain and similarity checks.

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

- `result: optional object { id }`

  - `id: string`

    Trusted domain identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/trusted_domains/$TRUSTED_DOMAIN_ID \
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

### Trusted Domain List Response

- `TrustedDomainListResponse object { id, comments, created_at, 6 more }`

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

### Trusted Domain Get Response

- `TrustedDomainGetResponse object { id, comments, created_at, 6 more }`

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

### Trusted Domain Create Response

- `TrustedDomainCreateResponse object { id, comments, created_at, 6 more }`

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

### Trusted Domain Edit Response

- `TrustedDomainEditResponse object { id, comments, created_at, 6 more }`

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

### Trusted Domain Delete Response

- `TrustedDomainDeleteResponse object { id }`

  - `id: string`

    Trusted domain identifier
