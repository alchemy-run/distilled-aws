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
