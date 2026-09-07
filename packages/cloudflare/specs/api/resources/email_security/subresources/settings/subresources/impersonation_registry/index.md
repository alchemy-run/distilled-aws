# Impersonation Registry

## List entries in impersonation registry

**get** `/accounts/{account_id}/email-security/settings/impersonation_registry`

Returns a paginated list of protected identities in the impersonation registry. These entries define identities and email addresses to protect from impersonation attacks. Can be manually added or automatically synced from directory integrations.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional "asc" or "desc"`

  The sorting direction.

  - `"asc"`

  - `"desc"`

- `order: optional "name" or "email" or "created_at"`

  Field to sort by.

  - `"name"`

  - `"email"`

  - `"created_at"`

- `page: optional number`

  Current page within paginated list of results.

- `per_page: optional number`

  The number of results per page. Maximum value is 1000.

- `provenance: optional "A1S_INTERNAL" or "SNOOPY-CASB_OFFICE_365" or "SNOOPY-OFFICE_365" or "SNOOPY-GOOGLE_DIRECTORY"`

  - `"A1S_INTERNAL"`

  - `"SNOOPY-CASB_OFFICE_365"`

  - `"SNOOPY-OFFICE_365"`

  - `"SNOOPY-GOOGLE_DIRECTORY"`

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

- `result: optional array of object { id, comments, created_at, 9 more }`

  - `id: optional string`

    Impersonation registry entry identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `directory_id: optional number`

  - `directory_node_id: optional number`

  - `email: optional string`

  - `external_directory_node_id: optional string`

  - `is_email_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `name: optional string`

  - `provenance: optional "A1S_INTERNAL" or "SNOOPY-CASB_OFFICE_365" or "SNOOPY-OFFICE_365" or "SNOOPY-GOOGLE_DIRECTORY"`

    - `"A1S_INTERNAL"`

    - `"SNOOPY-CASB_OFFICE_365"`

    - `"SNOOPY-OFFICE_365"`

    - `"SNOOPY-GOOGLE_DIRECTORY"`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/impersonation_registry \
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
      "comments": "comments",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "directory_id": 0,
      "directory_node_id": 0,
      "email": "john.doe@example.com",
      "external_directory_node_id": "external_directory_node_id",
      "is_email_regex": false,
      "last_modified": "2014-01-01T05:20:00.12345Z",
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "name": "John Doe",
      "provenance": "A1S_INTERNAL"
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

## Get an impersonation registry entry

**get** `/accounts/{account_id}/email-security/settings/impersonation_registry/{impersonation_registry_id}`

Retrieves details for a specific impersonation registry entry including the protected identity, email pattern, and synchronization source if directory-synced.

### Path Parameters

- `account_id: string`

  Identifier.

- `impersonation_registry_id: string`

  Impersonation registry entry identifier

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

- `result: optional object { id, comments, created_at, 9 more }`

  An impersonation registry entry

  - `id: optional string`

    Impersonation registry entry identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `directory_id: optional number`

  - `directory_node_id: optional number`

  - `email: optional string`

  - `external_directory_node_id: optional string`

  - `is_email_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `name: optional string`

  - `provenance: optional "A1S_INTERNAL" or "SNOOPY-CASB_OFFICE_365" or "SNOOPY-OFFICE_365" or "SNOOPY-GOOGLE_DIRECTORY"`

    - `"A1S_INTERNAL"`

    - `"SNOOPY-CASB_OFFICE_365"`

    - `"SNOOPY-OFFICE_365"`

    - `"SNOOPY-GOOGLE_DIRECTORY"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/impersonation_registry/$IMPERSONATION_REGISTRY_ID \
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
    "comments": "comments",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "directory_id": 0,
    "directory_node_id": 0,
    "email": "john.doe@example.com",
    "external_directory_node_id": "external_directory_node_id",
    "is_email_regex": false,
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "name": "John Doe",
    "provenance": "A1S_INTERNAL"
  }
}
```

## Create impersonation registry entry

**post** `/accounts/{account_id}/email-security/settings/impersonation_registry`

Creates a new entry in the impersonation registry to protect against impersonation. Emails attempting to impersonate this identity will be flagged. Supports regex patterns for flexible email matching.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `email: string`

- `is_email_regex: boolean`

- `name: string`

- `comments: optional string`

- `directory_id: optional number`

- `directory_node_id: optional number`

- `external_directory_node_id: optional string`

- `provenance: optional "A1S_INTERNAL" or "SNOOPY-CASB_OFFICE_365" or "SNOOPY-OFFICE_365" or "SNOOPY-GOOGLE_DIRECTORY"`

  - `"A1S_INTERNAL"`

  - `"SNOOPY-CASB_OFFICE_365"`

  - `"SNOOPY-OFFICE_365"`

  - `"SNOOPY-GOOGLE_DIRECTORY"`

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

- `result: optional object { id, comments, created_at, 9 more }`

  An impersonation registry entry

  - `id: optional string`

    Impersonation registry entry identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `directory_id: optional number`

  - `directory_node_id: optional number`

  - `email: optional string`

  - `external_directory_node_id: optional string`

  - `is_email_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `name: optional string`

  - `provenance: optional "A1S_INTERNAL" or "SNOOPY-CASB_OFFICE_365" or "SNOOPY-OFFICE_365" or "SNOOPY-GOOGLE_DIRECTORY"`

    - `"A1S_INTERNAL"`

    - `"SNOOPY-CASB_OFFICE_365"`

    - `"SNOOPY-OFFICE_365"`

    - `"SNOOPY-GOOGLE_DIRECTORY"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/impersonation_registry \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "email": "john.doe@example.com",
          "is_email_regex": false,
          "name": "John Doe"
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
    "comments": "comments",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "directory_id": 0,
    "directory_node_id": 0,
    "email": "john.doe@example.com",
    "external_directory_node_id": "external_directory_node_id",
    "is_email_regex": false,
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "name": "John Doe",
    "provenance": "A1S_INTERNAL"
  }
}
```

## Update an impersonation registry entry

**patch** `/accounts/{account_id}/email-security/settings/impersonation_registry/{impersonation_registry_id}`

Updates an existing impersonation registry entry. Only provided fields will be modified. Directory-synced entries can't be updated.

### Path Parameters

- `account_id: string`

  Identifier.

- `impersonation_registry_id: string`

  Impersonation registry entry identifier

### Body Parameters

- `comments: optional string`

- `directory_id: optional number`

- `directory_node_id: optional number`

- `email: optional string`

- `external_directory_node_id: optional string`

- `is_email_regex: optional boolean`

- `name: optional string`

- `provenance: optional "A1S_INTERNAL" or "SNOOPY-CASB_OFFICE_365" or "SNOOPY-OFFICE_365" or "SNOOPY-GOOGLE_DIRECTORY"`

  - `"A1S_INTERNAL"`

  - `"SNOOPY-CASB_OFFICE_365"`

  - `"SNOOPY-OFFICE_365"`

  - `"SNOOPY-GOOGLE_DIRECTORY"`

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

- `result: optional object { id, comments, created_at, 9 more }`

  An impersonation registry entry

  - `id: optional string`

    Impersonation registry entry identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `directory_id: optional number`

  - `directory_node_id: optional number`

  - `email: optional string`

  - `external_directory_node_id: optional string`

  - `is_email_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `name: optional string`

  - `provenance: optional "A1S_INTERNAL" or "SNOOPY-CASB_OFFICE_365" or "SNOOPY-OFFICE_365" or "SNOOPY-GOOGLE_DIRECTORY"`

    - `"A1S_INTERNAL"`

    - `"SNOOPY-CASB_OFFICE_365"`

    - `"SNOOPY-OFFICE_365"`

    - `"SNOOPY-GOOGLE_DIRECTORY"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/impersonation_registry/$IMPERSONATION_REGISTRY_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "email": "john.doe@example.com",
          "name": "John Doe"
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
    "comments": "comments",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "directory_id": 0,
    "directory_node_id": 0,
    "email": "john.doe@example.com",
    "external_directory_node_id": "external_directory_node_id",
    "is_email_regex": false,
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "name": "John Doe",
    "provenance": "A1S_INTERNAL"
  }
}
```

## Delete an impersonation registry entry

**delete** `/accounts/{account_id}/email-security/settings/impersonation_registry/{impersonation_registry_id}`

Removes an entry from the impersonation registry. After deletion, this identity will no longer be protected from impersonation.

### Path Parameters

- `account_id: string`

  Identifier.

- `impersonation_registry_id: string`

  Impersonation registry entry identifier

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

    Impersonation registry entry identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/impersonation_registry/$IMPERSONATION_REGISTRY_ID \
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

### Impersonation Registry List Response

- `ImpersonationRegistryListResponse object { id, comments, created_at, 9 more }`

  An impersonation registry entry

  - `id: optional string`

    Impersonation registry entry identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `directory_id: optional number`

  - `directory_node_id: optional number`

  - `email: optional string`

  - `external_directory_node_id: optional string`

  - `is_email_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `name: optional string`

  - `provenance: optional "A1S_INTERNAL" or "SNOOPY-CASB_OFFICE_365" or "SNOOPY-OFFICE_365" or "SNOOPY-GOOGLE_DIRECTORY"`

    - `"A1S_INTERNAL"`

    - `"SNOOPY-CASB_OFFICE_365"`

    - `"SNOOPY-OFFICE_365"`

    - `"SNOOPY-GOOGLE_DIRECTORY"`

### Impersonation Registry Get Response

- `ImpersonationRegistryGetResponse object { id, comments, created_at, 9 more }`

  An impersonation registry entry

  - `id: optional string`

    Impersonation registry entry identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `directory_id: optional number`

  - `directory_node_id: optional number`

  - `email: optional string`

  - `external_directory_node_id: optional string`

  - `is_email_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `name: optional string`

  - `provenance: optional "A1S_INTERNAL" or "SNOOPY-CASB_OFFICE_365" or "SNOOPY-OFFICE_365" or "SNOOPY-GOOGLE_DIRECTORY"`

    - `"A1S_INTERNAL"`

    - `"SNOOPY-CASB_OFFICE_365"`

    - `"SNOOPY-OFFICE_365"`

    - `"SNOOPY-GOOGLE_DIRECTORY"`

### Impersonation Registry Create Response

- `ImpersonationRegistryCreateResponse object { id, comments, created_at, 9 more }`

  An impersonation registry entry

  - `id: optional string`

    Impersonation registry entry identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `directory_id: optional number`

  - `directory_node_id: optional number`

  - `email: optional string`

  - `external_directory_node_id: optional string`

  - `is_email_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `name: optional string`

  - `provenance: optional "A1S_INTERNAL" or "SNOOPY-CASB_OFFICE_365" or "SNOOPY-OFFICE_365" or "SNOOPY-GOOGLE_DIRECTORY"`

    - `"A1S_INTERNAL"`

    - `"SNOOPY-CASB_OFFICE_365"`

    - `"SNOOPY-OFFICE_365"`

    - `"SNOOPY-GOOGLE_DIRECTORY"`

### Impersonation Registry Edit Response

- `ImpersonationRegistryEditResponse object { id, comments, created_at, 9 more }`

  An impersonation registry entry

  - `id: optional string`

    Impersonation registry entry identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `directory_id: optional number`

  - `directory_node_id: optional number`

  - `email: optional string`

  - `external_directory_node_id: optional string`

  - `is_email_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `name: optional string`

  - `provenance: optional "A1S_INTERNAL" or "SNOOPY-CASB_OFFICE_365" or "SNOOPY-OFFICE_365" or "SNOOPY-GOOGLE_DIRECTORY"`

    - `"A1S_INTERNAL"`

    - `"SNOOPY-CASB_OFFICE_365"`

    - `"SNOOPY-OFFICE_365"`

    - `"SNOOPY-GOOGLE_DIRECTORY"`

### Impersonation Registry Delete Response

- `ImpersonationRegistryDeleteResponse object { id }`

  - `id: string`

    Impersonation registry entry identifier
