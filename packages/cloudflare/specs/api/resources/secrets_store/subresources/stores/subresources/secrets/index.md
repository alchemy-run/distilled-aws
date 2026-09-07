# Secrets

## List store secrets

**get** `/accounts/{account_id}/secrets_store/stores/{store_id}/secrets`

Lists all store secrets

### Path Parameters

- `account_id: string`

  Account Identifier

- `store_id: string`

  Store Identifier

### Query Parameters

- `direction: optional "asc" or "desc"`

  Direction to sort objects

  - `"asc"`

  - `"desc"`

- `order: optional "name" or "comment" or "created" or 2 more`

  Order secrets by values in the given field

  - `"name"`

  - `"comment"`

  - `"created"`

  - `"modified"`

  - `"status"`

- `page: optional number`

  Page number

- `per_page: optional number`

  Number of objects to return per page

- `scopes: optional array of array of string`

  Only secrets with the given scopes will be returned

- `search: optional string`

  Search secrets using a filter string, filtering across name and comment

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

- `result: optional array of object { id, created, modified, 5 more }`

  - `id: string`

    Secret identifier tag.

  - `created: string`

    Whenthe secret was created.

  - `modified: string`

    When the secret was modified.

  - `name: string`

    The name of the secret

  - `status: "pending" or "active" or "deleted"`

    - `"pending"`

    - `"active"`

    - `"deleted"`

  - `store_id: string`

    Store Identifier

  - `comment: optional string`

    Freeform text describing the secret

  - `scopes: optional array of string`

    The list of services that can use this secret.

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secrets_store/stores/$STORE_ID/secrets \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
      "id": "3fd85f74b32742f1bff64a85009dda07",
      "created": "2023-09-21T18:56:32.624632Z",
      "modified": "2023-09-21T18:56:32.624632Z",
      "name": "MY_API_KEY",
      "status": "pending",
      "store_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "comment": "info about my secret",
      "scopes": [
        "workers",
        "ai_gateway",
        "dex",
        "access"
      ]
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Get a secret by ID

**get** `/accounts/{account_id}/secrets_store/stores/{store_id}/secrets/{secret_id}`

Returns details of a single secret

### Path Parameters

- `account_id: string`

  Account Identifier

- `store_id: string`

  Store Identifier

- `secret_id: string`

  Secret identifier tag.

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

- `result: optional object { id, created, modified, 5 more }`

  - `id: string`

    Secret identifier tag.

  - `created: string`

    Whenthe secret was created.

  - `modified: string`

    When the secret was modified.

  - `name: string`

    The name of the secret

  - `status: "pending" or "active" or "deleted"`

    - `"pending"`

    - `"active"`

    - `"deleted"`

  - `store_id: string`

    Store Identifier

  - `comment: optional string`

    Freeform text describing the secret

  - `scopes: optional array of string`

    The list of services that can use this secret.

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secrets_store/stores/$STORE_ID/secrets/$SECRET_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "id": "3fd85f74b32742f1bff64a85009dda07",
    "created": "2023-09-21T18:56:32.624632Z",
    "modified": "2023-09-21T18:56:32.624632Z",
    "name": "MY_API_KEY",
    "status": "pending",
    "store_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "comment": "info about my secret",
    "scopes": [
      "workers",
      "ai_gateway",
      "dex",
      "access"
    ]
  },
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Create a secret

**post** `/accounts/{account_id}/secrets_store/stores/{store_id}/secrets`

Creates a secret in the account

### Path Parameters

- `account_id: string`

  Account Identifier

- `store_id: string`

  Store Identifier

### Body Parameters

- `body: array of object { name, scopes, value, comment }`

  - `name: string`

    The name of the secret

  - `scopes: array of string`

    The list of services that can use this secret.

  - `value: string`

    The value of the secret. Maximum 64 KiB (65,536 bytes). Note that this is 'write only' - no API response will provide this value, it is only used to create/modify secrets.

  - `comment: optional string`

    Freeform text describing the secret

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

- `result: optional array of object { id, created, modified, 5 more }`

  - `id: string`

    Secret identifier tag.

  - `created: string`

    Whenthe secret was created.

  - `modified: string`

    When the secret was modified.

  - `name: string`

    The name of the secret

  - `status: "pending" or "active" or "deleted"`

    - `"pending"`

    - `"active"`

    - `"deleted"`

  - `store_id: string`

    Store Identifier

  - `comment: optional string`

    Freeform text describing the secret

  - `scopes: optional array of string`

    The list of services that can use this secret.

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secrets_store/stores/$STORE_ID/secrets \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '[
          {
            "name": "MY_API_KEY",
            "scopes": [
              "workers",
              "ai_gateway",
              "dex",
              "access"
            ],
            "value": "api-token-secret-123",
            "comment": "info about my secret"
          }
        ]'
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
      "id": "3fd85f74b32742f1bff64a85009dda07",
      "created": "2023-09-21T18:56:32.624632Z",
      "modified": "2023-09-21T18:56:32.624632Z",
      "name": "MY_API_KEY",
      "status": "pending",
      "store_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "comment": "info about my secret",
      "scopes": [
        "workers",
        "ai_gateway",
        "dex",
        "access"
      ]
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Patch a secret

**patch** `/accounts/{account_id}/secrets_store/stores/{store_id}/secrets/{secret_id}`

Updates a single secret

### Path Parameters

- `account_id: string`

  Account Identifier

- `store_id: string`

  Store Identifier

- `secret_id: string`

  Secret identifier tag.

### Body Parameters

- `comment: optional string`

  Freeform text describing the secret

- `scopes: optional array of string`

  The list of services that can use this secret.

- `value: optional string`

  The value of the secret. Maximum 64 KiB (65,536 bytes). Note that this is 'write only' - no API response will provide this value, it is only used to create/modify secrets.

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

- `result: optional object { id, created, modified, 5 more }`

  - `id: string`

    Secret identifier tag.

  - `created: string`

    Whenthe secret was created.

  - `modified: string`

    When the secret was modified.

  - `name: string`

    The name of the secret

  - `status: "pending" or "active" or "deleted"`

    - `"pending"`

    - `"active"`

    - `"deleted"`

  - `store_id: string`

    Store Identifier

  - `comment: optional string`

    Freeform text describing the secret

  - `scopes: optional array of string`

    The list of services that can use this secret.

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secrets_store/stores/$STORE_ID/secrets/$SECRET_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "comment": "info about my secret",
          "scopes": [
            "workers",
            "ai_gateway",
            "dex",
            "access"
          ],
          "value": "api-token-secret-123"
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
    "id": "3fd85f74b32742f1bff64a85009dda07",
    "created": "2023-09-21T18:56:32.624632Z",
    "modified": "2023-09-21T18:56:32.624632Z",
    "name": "MY_API_KEY",
    "status": "pending",
    "store_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "comment": "info about my secret",
    "scopes": [
      "workers",
      "ai_gateway",
      "dex",
      "access"
    ]
  },
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Delete a secret

**delete** `/accounts/{account_id}/secrets_store/stores/{store_id}/secrets/{secret_id}`

Deletes a single secret

### Path Parameters

- `account_id: string`

  Account Identifier

- `store_id: string`

  Store Identifier

- `secret_id: string`

  Secret identifier tag.

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

- `result: optional unknown`

  Result is null for delete operations.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secrets_store/stores/$STORE_ID/secrets/$SECRET_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "result": {}
}
```

## Delete secrets

**delete** `/accounts/{account_id}/secrets_store/stores/{store_id}/secrets`

Deletes one or more secrets

### Path Parameters

- `account_id: string`

  Account Identifier

- `store_id: string`

  Store Identifier

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

- `result: optional unknown`

  Result is null for delete operations.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secrets_store/stores/$STORE_ID/secrets \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "result": {}
}
```

## Duplicate Secret

**post** `/accounts/{account_id}/secrets_store/stores/{store_id}/secrets/{secret_id}/duplicate`

Duplicates the secret, keeping the value

### Path Parameters

- `account_id: string`

  Account Identifier

- `store_id: string`

  Store Identifier

- `secret_id: string`

  Secret identifier tag.

### Body Parameters

- `name: string`

  The name of the secret

- `scopes: array of string`

  The list of services that can use this secret.

- `comment: optional string`

  Freeform text describing the secret

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

- `result: optional object { id, created, modified, 5 more }`

  - `id: string`

    Secret identifier tag.

  - `created: string`

    Whenthe secret was created.

  - `modified: string`

    When the secret was modified.

  - `name: string`

    The name of the secret

  - `status: "pending" or "active" or "deleted"`

    - `"pending"`

    - `"active"`

    - `"deleted"`

  - `store_id: string`

    Store Identifier

  - `comment: optional string`

    Freeform text describing the secret

  - `scopes: optional array of string`

    The list of services that can use this secret.

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secrets_store/stores/$STORE_ID/secrets/$SECRET_ID/duplicate \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "name": "MY_API_KEY",
          "scopes": [
            "workers",
            "ai_gateway",
            "dex",
            "access"
          ],
          "comment": "info about my secret"
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
    "id": "3fd85f74b32742f1bff64a85009dda07",
    "created": "2023-09-21T18:56:32.624632Z",
    "modified": "2023-09-21T18:56:32.624632Z",
    "name": "MY_API_KEY",
    "status": "pending",
    "store_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "comment": "info about my secret",
    "scopes": [
      "workers",
      "ai_gateway",
      "dex",
      "access"
    ]
  },
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Domain Types

### Secret List Response

- `SecretListResponse object { id, created, modified, 5 more }`

  - `id: string`

    Secret identifier tag.

  - `created: string`

    Whenthe secret was created.

  - `modified: string`

    When the secret was modified.

  - `name: string`

    The name of the secret

  - `status: "pending" or "active" or "deleted"`

    - `"pending"`

    - `"active"`

    - `"deleted"`

  - `store_id: string`

    Store Identifier

  - `comment: optional string`

    Freeform text describing the secret

  - `scopes: optional array of string`

    The list of services that can use this secret.

### Secret Get Response

- `SecretGetResponse object { id, created, modified, 5 more }`

  - `id: string`

    Secret identifier tag.

  - `created: string`

    Whenthe secret was created.

  - `modified: string`

    When the secret was modified.

  - `name: string`

    The name of the secret

  - `status: "pending" or "active" or "deleted"`

    - `"pending"`

    - `"active"`

    - `"deleted"`

  - `store_id: string`

    Store Identifier

  - `comment: optional string`

    Freeform text describing the secret

  - `scopes: optional array of string`

    The list of services that can use this secret.

### Secret Create Response

- `SecretCreateResponse object { id, created, modified, 5 more }`

  - `id: string`

    Secret identifier tag.

  - `created: string`

    Whenthe secret was created.

  - `modified: string`

    When the secret was modified.

  - `name: string`

    The name of the secret

  - `status: "pending" or "active" or "deleted"`

    - `"pending"`

    - `"active"`

    - `"deleted"`

  - `store_id: string`

    Store Identifier

  - `comment: optional string`

    Freeform text describing the secret

  - `scopes: optional array of string`

    The list of services that can use this secret.

### Secret Edit Response

- `SecretEditResponse object { id, created, modified, 5 more }`

  - `id: string`

    Secret identifier tag.

  - `created: string`

    Whenthe secret was created.

  - `modified: string`

    When the secret was modified.

  - `name: string`

    The name of the secret

  - `status: "pending" or "active" or "deleted"`

    - `"pending"`

    - `"active"`

    - `"deleted"`

  - `store_id: string`

    Store Identifier

  - `comment: optional string`

    Freeform text describing the secret

  - `scopes: optional array of string`

    The list of services that can use this secret.

### Secret Delete Response

- `SecretDeleteResponse = unknown`

  Result is null for delete operations.

### Secret Bulk Delete Response

- `SecretBulkDeleteResponse = unknown`

  Result is null for delete operations.

### Secret Duplicate Response

- `SecretDuplicateResponse object { id, created, modified, 5 more }`

  - `id: string`

    Secret identifier tag.

  - `created: string`

    Whenthe secret was created.

  - `modified: string`

    When the secret was modified.

  - `name: string`

    The name of the secret

  - `status: "pending" or "active" or "deleted"`

    - `"pending"`

    - `"active"`

    - `"deleted"`

  - `store_id: string`

    Store Identifier

  - `comment: optional string`

    Freeform text describing the secret

  - `scopes: optional array of string`

    The list of services that can use this secret.
