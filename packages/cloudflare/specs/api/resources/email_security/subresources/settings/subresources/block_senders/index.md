# Block Senders

## List blocked email senders

**get** `/accounts/{account_id}/email-security/settings/block_senders`

Returns a paginated list of blocked email sender patterns. These patterns prevent emails from matching senders from being delivered. Supports filtering by pattern type and searching across patterns.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional "asc" or "desc"`

  The sorting direction.

  - `"asc"`

  - `"desc"`

- `order: optional "pattern" or "created_at"`

  Field to sort by.

  - `"pattern"`

  - `"created_at"`

- `page: optional number`

  Current page within paginated list of results.

- `pattern: optional string`

  Filter by pattern value.

- `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

  Filter by pattern type.

  - `"EMAIL"`

  - `"DOMAIN"`

  - `"IP"`

  - `"UNKNOWN"`

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

- `result: optional array of object { id, comments, created_at, 5 more }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/block_senders \
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
      "comments": "Block sender with email test@example.com",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "is_regex": false,
      "last_modified": "2014-01-01T05:20:00.12345Z",
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "pattern": "test@example.com",
      "pattern_type": "EMAIL"
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

## Create blocked email sender

**post** `/accounts/{account_id}/email-security/settings/block_senders`

Creates a new blocked sender pattern. Emails matching this pattern will be blocked from delivery. Patterns can be email addresses, domains, or IP addresses, and support regular expressions.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `is_regex: boolean`

- `pattern: string`

- `pattern_type: "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

  Type of pattern matching.
  Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

  - `"EMAIL"`

  - `"DOMAIN"`

  - `"IP"`

  - `"UNKNOWN"`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/block_senders \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "is_regex": false,
          "pattern": "test@example.com",
          "pattern_type": "EMAIL",
          "comments": "Block sender with email test@example.com"
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

## Update a blocked email sender

**patch** `/accounts/{account_id}/email-security/settings/block_senders/{pattern_id}`

Updates an existing blocked sender pattern. Only provided fields will be modified. The pattern will continue blocking emails until deleted.

### Path Parameters

- `account_id: string`

  Identifier.

- `pattern_id: string`

  Blocked sender pattern identifier

### Body Parameters

- `comments: optional string`

- `is_regex: optional boolean`

- `pattern: optional string`

- `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

  Type of pattern matching.
  Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

  - `"EMAIL"`

  - `"DOMAIN"`

  - `"IP"`

  - `"UNKNOWN"`

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
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "comments": "Block sender with email test@example.com",
          "pattern": "test@example.com",
          "pattern_type": "EMAIL"
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

## Delete a blocked email sender

**delete** `/accounts/{account_id}/email-security/settings/block_senders/{pattern_id}`

Removes a blocked sender pattern. After deletion, emails from this sender will no longer be automatically blocked based on this rule.

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

- `result: optional object { id }`

  - `id: string`

    Blocked sender pattern identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/block_senders/$PATTERN_ID \
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

### Block Sender List Response

- `BlockSenderListResponse object { id, comments, created_at, 5 more }`

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

### Block Sender Get Response

- `BlockSenderGetResponse object { id, comments, created_at, 5 more }`

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

### Block Sender Create Response

- `BlockSenderCreateResponse object { id, comments, created_at, 5 more }`

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

### Block Sender Edit Response

- `BlockSenderEditResponse object { id, comments, created_at, 5 more }`

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

### Block Sender Delete Response

- `BlockSenderDeleteResponse object { id }`

  - `id: string`

    Blocked sender pattern identifier
