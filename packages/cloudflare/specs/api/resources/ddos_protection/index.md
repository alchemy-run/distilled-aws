# DDoS Protection

# Advanced TCP Protection

# Allowlist

## List all allowlist prefixes.

**get** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/allowlist`

List all allowlist prefixes for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional string`

  The direction of ordering (ASC or DESC). Defaults to 'ASC'.

- `order: optional string`

  The field to order by. Defaults to 'prefix'.

- `page: optional number`

  The page number for pagination. Defaults to 1.

- `per_page: optional number`

  The number of items per page. Must be between 10 and 1000. Defaults to 25.

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

- `result: optional array of object { id, comment, created_on, 3 more }`

  - `id: string`

    The unique ID of the allowlist prefix.

  - `comment: string`

    An optional comment describing the allowlist prefix.

  - `created_on: string`

    The creation timestamp of the allowlist prefix.

  - `enabled: boolean`

    Whether to enable the allowlist prefix into effect. Defaults to false.

  - `modified_on: string`

    The last modification timestamp of the allowlist prefix.

  - `prefix: string`

    The allowlist prefix in CIDR format.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/allowlist \
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
      "id": "id",
      "comment": "comment",
      "created_on": "2019-12-27T18:11:19.117Z",
      "enabled": true,
      "modified_on": "2019-12-27T18:11:19.117Z",
      "prefix": "prefix"
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

## Create allowlist prefix.

**post** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/allowlist`

Create an allowlist prefix for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `comment: string`

  An comment describing the allowlist prefix.

- `enabled: boolean`

  Whether to enable the allowlist prefix into effect.

- `prefix: string`

  The allowlist prefix to add in CIDR format.

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

- `result: optional object { id, comment, created_on, 3 more }`

  - `id: string`

    The unique ID of the allowlist prefix.

  - `comment: string`

    An optional comment describing the allowlist prefix.

  - `created_on: string`

    The creation timestamp of the allowlist prefix.

  - `enabled: boolean`

    Whether to enable the allowlist prefix into effect. Defaults to false.

  - `modified_on: string`

    The last modification timestamp of the allowlist prefix.

  - `prefix: string`

    The allowlist prefix in CIDR format.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/allowlist \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "comment": "comment",
          "enabled": true,
          "prefix": "prefix"
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
    "id": "id",
    "comment": "comment",
    "created_on": "2019-12-27T18:11:19.117Z",
    "enabled": true,
    "modified_on": "2019-12-27T18:11:19.117Z",
    "prefix": "prefix"
  }
}
```

## Delete all allowlist prefixes.

**delete** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/allowlist`

Delete all allowlist prefixes for an account.

### Path Parameters

- `account_id: string`

  Identifier.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/allowlist \
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
  "success": true
}
```

## Domain Types

### Allowlist List Response

- `AllowlistListResponse object { id, comment, created_on, 3 more }`

  - `id: string`

    The unique ID of the allowlist prefix.

  - `comment: string`

    An optional comment describing the allowlist prefix.

  - `created_on: string`

    The creation timestamp of the allowlist prefix.

  - `enabled: boolean`

    Whether to enable the allowlist prefix into effect. Defaults to false.

  - `modified_on: string`

    The last modification timestamp of the allowlist prefix.

  - `prefix: string`

    The allowlist prefix in CIDR format.

### Allowlist Create Response

- `AllowlistCreateResponse object { id, comment, created_on, 3 more }`

  - `id: string`

    The unique ID of the allowlist prefix.

  - `comment: string`

    An optional comment describing the allowlist prefix.

  - `created_on: string`

    The creation timestamp of the allowlist prefix.

  - `enabled: boolean`

    Whether to enable the allowlist prefix into effect. Defaults to false.

  - `modified_on: string`

    The last modification timestamp of the allowlist prefix.

  - `prefix: string`

    The allowlist prefix in CIDR format.

### Allowlist Bulk Delete Response

- `AllowlistBulkDeleteResponse object { errors, messages, success }`

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

# Items

## Get allowlist prefix.

**get** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/allowlist/{prefix_id}`

Get an allowlist prefix specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `prefix_id: string`

  UUID.

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

- `result: optional object { id, comment, created_on, 3 more }`

  - `id: string`

    The unique ID of the allowlist prefix.

  - `comment: string`

    An optional comment describing the allowlist prefix.

  - `created_on: string`

    The creation timestamp of the allowlist prefix.

  - `enabled: boolean`

    Whether to enable the allowlist prefix into effect. Defaults to false.

  - `modified_on: string`

    The last modification timestamp of the allowlist prefix.

  - `prefix: string`

    The allowlist prefix in CIDR format.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/allowlist/$PREFIX_ID \
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
    "id": "id",
    "comment": "comment",
    "created_on": "2019-12-27T18:11:19.117Z",
    "enabled": true,
    "modified_on": "2019-12-27T18:11:19.117Z",
    "prefix": "prefix"
  }
}
```

## Update allowlist prefix.

**patch** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/allowlist/{prefix_id}`

Update an allowlist prefix specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `prefix_id: string`

  UUID.

### Body Parameters

- `comment: optional string`

  A comment describing the allowlist prefix. Optional.

- `enabled: optional boolean`

  Whether to enable the allowlist prefix into effect. Optional.

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

- `result: optional object { id, comment, created_on, 3 more }`

  - `id: string`

    The unique ID of the allowlist prefix.

  - `comment: string`

    An optional comment describing the allowlist prefix.

  - `created_on: string`

    The creation timestamp of the allowlist prefix.

  - `enabled: boolean`

    Whether to enable the allowlist prefix into effect. Defaults to false.

  - `modified_on: string`

    The last modification timestamp of the allowlist prefix.

  - `prefix: string`

    The allowlist prefix in CIDR format.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/allowlist/$PREFIX_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "id": "id",
    "comment": "comment",
    "created_on": "2019-12-27T18:11:19.117Z",
    "enabled": true,
    "modified_on": "2019-12-27T18:11:19.117Z",
    "prefix": "prefix"
  }
}
```

## Delete allowlist prefix.

**delete** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/allowlist/{prefix_id}`

Delete the allowlist prefix for an account given a UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `prefix_id: string`

  UUID.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/allowlist/$PREFIX_ID \
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
  "success": true
}
```

## Domain Types

### Item Get Response

- `ItemGetResponse object { id, comment, created_on, 3 more }`

  - `id: string`

    The unique ID of the allowlist prefix.

  - `comment: string`

    An optional comment describing the allowlist prefix.

  - `created_on: string`

    The creation timestamp of the allowlist prefix.

  - `enabled: boolean`

    Whether to enable the allowlist prefix into effect. Defaults to false.

  - `modified_on: string`

    The last modification timestamp of the allowlist prefix.

  - `prefix: string`

    The allowlist prefix in CIDR format.

### Item Edit Response

- `ItemEditResponse object { id, comment, created_on, 3 more }`

  - `id: string`

    The unique ID of the allowlist prefix.

  - `comment: string`

    An optional comment describing the allowlist prefix.

  - `created_on: string`

    The creation timestamp of the allowlist prefix.

  - `enabled: boolean`

    Whether to enable the allowlist prefix into effect. Defaults to false.

  - `modified_on: string`

    The last modification timestamp of the allowlist prefix.

  - `prefix: string`

    The allowlist prefix in CIDR format.

### Item Delete Response

- `ItemDeleteResponse object { errors, messages, success }`

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

# Prefixes

## List all prefixes.

**get** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/prefixes`

List all prefixes for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional string`

  The direction of ordering (ASC or DESC). Defaults to 'ASC'.

- `order: optional string`

  The field to order by. Defaults to 'prefix'.

- `page: optional number`

  The page number for pagination. Defaults to 1.

- `per_page: optional number`

  The number of items per page. Must be between 10 and 1000. Defaults to 25.

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

- `result: optional array of object { id, comment, created_on, 3 more }`

  - `id: string`

    The unique ID of the prefix.

  - `comment: string`

    A comment describing the prefix.

  - `created_on: string`

    The creation timestamp of the prefix.

  - `excluded: boolean`

    Whether to exclude the prefix from protection.

  - `modified_on: string`

    The last modification timestamp of the prefix.

  - `prefix: string`

    The prefix in CIDR format.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/prefixes \
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
      "id": "id",
      "comment": "comment",
      "created_on": "2019-12-27T18:11:19.117Z",
      "excluded": true,
      "modified_on": "2019-12-27T18:11:19.117Z",
      "prefix": "192.0.2.0/24"
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

## Create prefix.

**post** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/prefixes`

Create a prefix for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `comment: string`

  A comment describing the prefix.

- `excluded: boolean`

  Whether to exclude the prefix from protection.

- `prefix: string`

  The prefix to add in CIDR format.

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

- `result: optional object { id, comment, created_on, 3 more }`

  - `id: string`

    The unique ID of the prefix.

  - `comment: string`

    A comment describing the prefix.

  - `created_on: string`

    The creation timestamp of the prefix.

  - `excluded: boolean`

    Whether to exclude the prefix from protection.

  - `modified_on: string`

    The last modification timestamp of the prefix.

  - `prefix: string`

    The prefix in CIDR format.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/prefixes \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "comment": "comment",
          "excluded": true,
          "prefix": "192.0.2.0/24"
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
    "id": "id",
    "comment": "comment",
    "created_on": "2019-12-27T18:11:19.117Z",
    "excluded": true,
    "modified_on": "2019-12-27T18:11:19.117Z",
    "prefix": "192.0.2.0/24"
  }
}
```

## Delete all prefixes.

**delete** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/prefixes`

Delete all prefixes for an account.

### Path Parameters

- `account_id: string`

  Identifier.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/prefixes \
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
  "success": true
}
```

## Create multiple prefixes.

**post** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/prefixes/bulk`

Create multiple prefixes for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `body: array of object { comment, excluded, prefix }`

  - `comment: string`

    A comment describing the prefix.

  - `excluded: boolean`

    Whether to exclude the prefix from protection.

  - `prefix: string`

    The prefix to add in CIDR format.

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

- `result: optional array of object { id, comment, created_on, 3 more }`

  - `id: string`

    The unique ID of the prefix.

  - `comment: string`

    A comment describing the prefix.

  - `created_on: string`

    The creation timestamp of the prefix.

  - `excluded: boolean`

    Whether to exclude the prefix from protection.

  - `modified_on: string`

    The last modification timestamp of the prefix.

  - `prefix: string`

    The prefix in CIDR format.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/prefixes/bulk \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "comment": "comment",
            "excluded": true,
            "prefix": "192.0.2.0/24"
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
      "id": "id",
      "comment": "comment",
      "created_on": "2019-12-27T18:11:19.117Z",
      "excluded": true,
      "modified_on": "2019-12-27T18:11:19.117Z",
      "prefix": "192.0.2.0/24"
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

## Domain Types

### Prefix List Response

- `PrefixListResponse object { id, comment, created_on, 3 more }`

  - `id: string`

    The unique ID of the prefix.

  - `comment: string`

    A comment describing the prefix.

  - `created_on: string`

    The creation timestamp of the prefix.

  - `excluded: boolean`

    Whether to exclude the prefix from protection.

  - `modified_on: string`

    The last modification timestamp of the prefix.

  - `prefix: string`

    The prefix in CIDR format.

### Prefix Create Response

- `PrefixCreateResponse object { id, comment, created_on, 3 more }`

  - `id: string`

    The unique ID of the prefix.

  - `comment: string`

    A comment describing the prefix.

  - `created_on: string`

    The creation timestamp of the prefix.

  - `excluded: boolean`

    Whether to exclude the prefix from protection.

  - `modified_on: string`

    The last modification timestamp of the prefix.

  - `prefix: string`

    The prefix in CIDR format.

### Prefix Bulk Delete Response

- `PrefixBulkDeleteResponse object { errors, messages, success }`

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

### Prefix Bulk Create Response

- `PrefixBulkCreateResponse object { id, comment, created_on, 3 more }`

  - `id: string`

    The unique ID of the prefix.

  - `comment: string`

    A comment describing the prefix.

  - `created_on: string`

    The creation timestamp of the prefix.

  - `excluded: boolean`

    Whether to exclude the prefix from protection.

  - `modified_on: string`

    The last modification timestamp of the prefix.

  - `prefix: string`

    The prefix in CIDR format.

# Items

## Get prefix.

**get** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/prefixes/{prefix_id}`

Get a prefix specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `prefix_id: string`

  UUID.

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

- `result: optional object { id, comment, created_on, 3 more }`

  - `id: string`

    The unique ID of the prefix.

  - `comment: string`

    A comment describing the prefix.

  - `created_on: string`

    The creation timestamp of the prefix.

  - `excluded: boolean`

    Whether to exclude the prefix from protection.

  - `modified_on: string`

    The last modification timestamp of the prefix.

  - `prefix: string`

    The prefix in CIDR format.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/prefixes/$PREFIX_ID \
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
    "id": "id",
    "comment": "comment",
    "created_on": "2019-12-27T18:11:19.117Z",
    "excluded": true,
    "modified_on": "2019-12-27T18:11:19.117Z",
    "prefix": "192.0.2.0/24"
  }
}
```

## Update prefix.

**patch** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/prefixes/{prefix_id}`

Update a prefix specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `prefix_id: string`

  UUID.

### Body Parameters

- `comment: optional string`

  A new comment for the prefix. Optional.

- `excluded: optional boolean`

  Whether to exclude the prefix from protection. Optional.

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

- `result: optional object { id, comment, created_on, 3 more }`

  - `id: string`

    The unique ID of the prefix.

  - `comment: string`

    A comment describing the prefix.

  - `created_on: string`

    The creation timestamp of the prefix.

  - `excluded: boolean`

    Whether to exclude the prefix from protection.

  - `modified_on: string`

    The last modification timestamp of the prefix.

  - `prefix: string`

    The prefix in CIDR format.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/prefixes/$PREFIX_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "id": "id",
    "comment": "comment",
    "created_on": "2019-12-27T18:11:19.117Z",
    "excluded": true,
    "modified_on": "2019-12-27T18:11:19.117Z",
    "prefix": "192.0.2.0/24"
  }
}
```

## Delete prefix.

**delete** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/prefixes/{prefix_id}`

Delete the prefix for an account given a UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `prefix_id: string`

  UUID.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/prefixes/$PREFIX_ID \
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
  "success": true
}
```

## Domain Types

### Item Get Response

- `ItemGetResponse object { id, comment, created_on, 3 more }`

  - `id: string`

    The unique ID of the prefix.

  - `comment: string`

    A comment describing the prefix.

  - `created_on: string`

    The creation timestamp of the prefix.

  - `excluded: boolean`

    Whether to exclude the prefix from protection.

  - `modified_on: string`

    The last modification timestamp of the prefix.

  - `prefix: string`

    The prefix in CIDR format.

### Item Edit Response

- `ItemEditResponse object { id, comment, created_on, 3 more }`

  - `id: string`

    The unique ID of the prefix.

  - `comment: string`

    A comment describing the prefix.

  - `created_on: string`

    The creation timestamp of the prefix.

  - `excluded: boolean`

    Whether to exclude the prefix from protection.

  - `modified_on: string`

    The last modification timestamp of the prefix.

  - `prefix: string`

    The prefix in CIDR format.

### Item Delete Response

- `ItemDeleteResponse object { errors, messages, success }`

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

# SYN Protection

# Filters

## List all SYN Protection filters.

**get** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters`

List all SYN Protection filters for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional string`

  The direction of ordering (ASC or DESC). Defaults to 'ASC'.

- `mode: optional string`

  The mode of the filters to get. Optional. Valid values: 'enabled', 'disabled', 'monitoring'.

- `order: optional string`

  The field to order by. Defaults to 'prefix'.

- `page: optional number`

  The page number for pagination. Defaults to 1.

- `per_page: optional number`

  The number of items per page. Must be between 10 and 1000. Defaults to 25.

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

- `result: optional array of object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/filters \
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
      "id": "id",
      "created_on": "2019-12-27T18:11:19.117Z",
      "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }",
      "mode": "mode",
      "modified_on": "2019-12-27T18:11:19.117Z"
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

## Create a SYN Protection filter.

**post** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters`

Create a SYN Protection filter for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `expression: string`

  The filter expression.

- `mode: string`

  The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

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

- `result: optional object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/filters \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }",
          "mode": "mode"
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
    "id": "id",
    "created_on": "2019-12-27T18:11:19.117Z",
    "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z"
  }
}
```

## Delete all SYN Protection filters.

**delete** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters`

Delete all SYN Protection filters for an account.

### Path Parameters

- `account_id: string`

  Identifier.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/filters \
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
  "success": true
}
```

## Domain Types

### Filter List Response

- `FilterListResponse object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

### Filter Create Response

- `FilterCreateResponse object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

### Filter Bulk Delete Response

- `FilterBulkDeleteResponse object { errors, messages, success }`

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

# Items

## Get SYN Protection filter.

**get** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters/{filter_id}`

Get a SYN Protection filter specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `filter_id: string`

  UUID.

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

- `result: optional object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/filters/$FILTER_ID \
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
    "id": "id",
    "created_on": "2019-12-27T18:11:19.117Z",
    "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z"
  }
}
```

## Update SYN Protection filter.

**patch** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters/{filter_id}`

Update a SYN Protection filter specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `filter_id: string`

  UUID.

### Body Parameters

- `expression: optional string`

  The new filter expression. Optional.

- `mode: optional string`

  The new mode for the filter. Optional. Must be one of 'enabled', 'disabled', 'monitoring'.

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

- `result: optional object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/filters/$FILTER_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }"
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
    "id": "id",
    "created_on": "2019-12-27T18:11:19.117Z",
    "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z"
  }
}
```

## Delete SYN Protection filter.

**delete** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters/{filter_id}`

Delete a SYN Protection filter specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `filter_id: string`

  UUID.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/filters/$FILTER_ID \
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
  "success": true
}
```

## Domain Types

### Item Get Response

- `ItemGetResponse object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

### Item Edit Response

- `ItemEditResponse object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

### Item Delete Response

- `ItemDeleteResponse object { errors, messages, success }`

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

# Rules

## List all SYN Protection rules.

**get** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules`

List all SYN Protection rules for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional string`

  The direction of ordering (ASC or DESC). Defaults to 'ASC'.

- `order: optional string`

  The field to order by. Defaults to 'prefix'.

- `page: optional number`

  The page number for pagination. Defaults to 1.

- `per_page: optional number`

  The number of items per page. Must be between 10 and 1000. Defaults to 25.

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

- `result: optional array of object { id, burst_sensitivity, created_on, 6 more }`

  - `id: string`

    The unique ID of the SYN Protection rule.

  - `burst_sensitivity: string`

    The burst sensitivity. Must be one of 'low', 'medium', 'high'.

  - `created_on: string`

    The creation timestamp of the SYN Protection rule.

  - `mitigation_type: string`

    The type of mitigation for SYN Protection. Must be one of 'challenge' or 'retransmit'.

  - `mode: string`

    The mode for SYN Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the SYN Protection rule.

  - `name: string`

    The name of the SYN Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

  - `rate_sensitivity: string`

    The rate sensitivity. Must be one of 'low', 'medium', 'high'.

  - `scope: string`

    The scope for the SYN Protection rule. Must be one of 'global', 'region', or 'datacenter'.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/rules \
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
      "id": "id",
      "burst_sensitivity": "burst_sensitivity",
      "created_on": "2019-12-27T18:11:19.117Z",
      "mitigation_type": "mitigation_type",
      "mode": "mode",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "rate_sensitivity": "rate_sensitivity",
      "scope": "scope"
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

## Create SYN Protection rule.

**post** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules`

Create a SYN Protection rule for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `burst_sensitivity: string`

  The burst sensitivity. Must be one of 'low', 'medium', 'high'.

- `mode: string`

  The mode for SYN Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

- `name: string`

  The name of the SYN Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

- `rate_sensitivity: string`

  The rate sensitivity. Must be one of 'low', 'medium', 'high'.

- `scope: string`

  The scope for the SYN Protection rule. Must be one of 'global', 'region', or 'datacenter'.

- `mitigation_type: optional string`

  The type of mitigation. Must be one of 'challenge' or 'retransmit'. Optional. Defaults to 'challenge'.

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

- `result: optional object { id, burst_sensitivity, created_on, 6 more }`

  - `id: string`

    The unique ID of the SYN Protection rule.

  - `burst_sensitivity: string`

    The burst sensitivity. Must be one of 'low', 'medium', 'high'.

  - `created_on: string`

    The creation timestamp of the SYN Protection rule.

  - `mitigation_type: string`

    The type of mitigation for SYN Protection. Must be one of 'challenge' or 'retransmit'.

  - `mode: string`

    The mode for SYN Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the SYN Protection rule.

  - `name: string`

    The name of the SYN Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

  - `rate_sensitivity: string`

    The rate sensitivity. Must be one of 'low', 'medium', 'high'.

  - `scope: string`

    The scope for the SYN Protection rule. Must be one of 'global', 'region', or 'datacenter'.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/rules \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "burst_sensitivity": "burst_sensitivity",
          "mode": "mode",
          "name": "name",
          "rate_sensitivity": "rate_sensitivity",
          "scope": "scope"
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
    "id": "id",
    "burst_sensitivity": "burst_sensitivity",
    "created_on": "2019-12-27T18:11:19.117Z",
    "mitigation_type": "mitigation_type",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "rate_sensitivity": "rate_sensitivity",
    "scope": "scope"
  }
}
```

## Delete all SYN Protection rules.

**delete** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules`

Delete all SYN Protection rules for an account.

### Path Parameters

- `account_id: string`

  Identifier.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/rules \
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
  "success": true
}
```

## Domain Types

### Rule List Response

- `RuleListResponse object { id, burst_sensitivity, created_on, 6 more }`

  - `id: string`

    The unique ID of the SYN Protection rule.

  - `burst_sensitivity: string`

    The burst sensitivity. Must be one of 'low', 'medium', 'high'.

  - `created_on: string`

    The creation timestamp of the SYN Protection rule.

  - `mitigation_type: string`

    The type of mitigation for SYN Protection. Must be one of 'challenge' or 'retransmit'.

  - `mode: string`

    The mode for SYN Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the SYN Protection rule.

  - `name: string`

    The name of the SYN Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

  - `rate_sensitivity: string`

    The rate sensitivity. Must be one of 'low', 'medium', 'high'.

  - `scope: string`

    The scope for the SYN Protection rule. Must be one of 'global', 'region', or 'datacenter'.

### Rule Create Response

- `RuleCreateResponse object { id, burst_sensitivity, created_on, 6 more }`

  - `id: string`

    The unique ID of the SYN Protection rule.

  - `burst_sensitivity: string`

    The burst sensitivity. Must be one of 'low', 'medium', 'high'.

  - `created_on: string`

    The creation timestamp of the SYN Protection rule.

  - `mitigation_type: string`

    The type of mitigation for SYN Protection. Must be one of 'challenge' or 'retransmit'.

  - `mode: string`

    The mode for SYN Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the SYN Protection rule.

  - `name: string`

    The name of the SYN Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

  - `rate_sensitivity: string`

    The rate sensitivity. Must be one of 'low', 'medium', 'high'.

  - `scope: string`

    The scope for the SYN Protection rule. Must be one of 'global', 'region', or 'datacenter'.

### Rule Bulk Delete Response

- `RuleBulkDeleteResponse object { errors, messages, success }`

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

# Items

## Get SYN Protection rule.

**get** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules/{rule_id}`

Get a SYN Protection rule specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `rule_id: string`

  UUID.

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

- `result: optional object { id, burst_sensitivity, created_on, 6 more }`

  - `id: string`

    The unique ID of the SYN Protection rule.

  - `burst_sensitivity: string`

    The burst sensitivity. Must be one of 'low', 'medium', 'high'.

  - `created_on: string`

    The creation timestamp of the SYN Protection rule.

  - `mitigation_type: string`

    The type of mitigation for SYN Protection. Must be one of 'challenge' or 'retransmit'.

  - `mode: string`

    The mode for SYN Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the SYN Protection rule.

  - `name: string`

    The name of the SYN Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

  - `rate_sensitivity: string`

    The rate sensitivity. Must be one of 'low', 'medium', 'high'.

  - `scope: string`

    The scope for the SYN Protection rule. Must be one of 'global', 'region', or 'datacenter'.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/rules/$RULE_ID \
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
    "id": "id",
    "burst_sensitivity": "burst_sensitivity",
    "created_on": "2019-12-27T18:11:19.117Z",
    "mitigation_type": "mitigation_type",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "rate_sensitivity": "rate_sensitivity",
    "scope": "scope"
  }
}
```

## Update SYN Protection rule.

**patch** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules/{rule_id}`

Update a SYN Protection rule specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `rule_id: string`

  UUID.

### Body Parameters

- `burst_sensitivity: optional string`

  The new burst sensitivity. Optional. Must be one of 'low', 'medium', 'high'.

- `mitigation_type: optional string`

  The new mitigation type. Optional. Must be one of 'challenge' or 'retransmit'.

- `mode: optional string`

  The new mode for SYN Protection. Optional. Must be one of 'enabled', 'disabled', 'monitoring'.

- `rate_sensitivity: optional string`

  The new rate sensitivity. Optional. Must be one of 'low', 'medium', 'high'.

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

- `result: optional object { id, burst_sensitivity, created_on, 6 more }`

  - `id: string`

    The unique ID of the SYN Protection rule.

  - `burst_sensitivity: string`

    The burst sensitivity. Must be one of 'low', 'medium', 'high'.

  - `created_on: string`

    The creation timestamp of the SYN Protection rule.

  - `mitigation_type: string`

    The type of mitigation for SYN Protection. Must be one of 'challenge' or 'retransmit'.

  - `mode: string`

    The mode for SYN Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the SYN Protection rule.

  - `name: string`

    The name of the SYN Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

  - `rate_sensitivity: string`

    The rate sensitivity. Must be one of 'low', 'medium', 'high'.

  - `scope: string`

    The scope for the SYN Protection rule. Must be one of 'global', 'region', or 'datacenter'.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/rules/$RULE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "id": "id",
    "burst_sensitivity": "burst_sensitivity",
    "created_on": "2019-12-27T18:11:19.117Z",
    "mitigation_type": "mitigation_type",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "rate_sensitivity": "rate_sensitivity",
    "scope": "scope"
  }
}
```

## Delete SYN Protection rule.

**delete** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules/{rule_id}`

Delete a SYN Protection rule specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `rule_id: string`

  UUID.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/rules/$RULE_ID \
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
  "success": true
}
```

## Domain Types

### Item Get Response

- `ItemGetResponse object { id, burst_sensitivity, created_on, 6 more }`

  - `id: string`

    The unique ID of the SYN Protection rule.

  - `burst_sensitivity: string`

    The burst sensitivity. Must be one of 'low', 'medium', 'high'.

  - `created_on: string`

    The creation timestamp of the SYN Protection rule.

  - `mitigation_type: string`

    The type of mitigation for SYN Protection. Must be one of 'challenge' or 'retransmit'.

  - `mode: string`

    The mode for SYN Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the SYN Protection rule.

  - `name: string`

    The name of the SYN Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

  - `rate_sensitivity: string`

    The rate sensitivity. Must be one of 'low', 'medium', 'high'.

  - `scope: string`

    The scope for the SYN Protection rule. Must be one of 'global', 'region', or 'datacenter'.

### Item Edit Response

- `ItemEditResponse object { id, burst_sensitivity, created_on, 6 more }`

  - `id: string`

    The unique ID of the SYN Protection rule.

  - `burst_sensitivity: string`

    The burst sensitivity. Must be one of 'low', 'medium', 'high'.

  - `created_on: string`

    The creation timestamp of the SYN Protection rule.

  - `mitigation_type: string`

    The type of mitigation for SYN Protection. Must be one of 'challenge' or 'retransmit'.

  - `mode: string`

    The mode for SYN Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the SYN Protection rule.

  - `name: string`

    The name of the SYN Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

  - `rate_sensitivity: string`

    The rate sensitivity. Must be one of 'low', 'medium', 'high'.

  - `scope: string`

    The scope for the SYN Protection rule. Must be one of 'global', 'region', or 'datacenter'.

### Item Delete Response

- `ItemDeleteResponse object { errors, messages, success }`

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

# TCP Flow Protection

# Filters

## List all TCP Flow Protection filters.

**get** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters`

List all TCP Flow Protection filters for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional string`

  The direction of ordering (ASC or DESC). Defaults to 'ASC'.

- `mode: optional string`

  The mode of the filters to get. Optional. Valid values: 'enabled', 'disabled', 'monitoring'.

- `order: optional string`

  The field to order by. Defaults to 'prefix'.

- `page: optional number`

  The page number for pagination. Defaults to 1.

- `per_page: optional number`

  The number of items per page. Must be between 10 and 1000. Defaults to 25.

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

- `result: optional array of object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters \
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
      "id": "id",
      "created_on": "2019-12-27T18:11:19.117Z",
      "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }",
      "mode": "mode",
      "modified_on": "2019-12-27T18:11:19.117Z"
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

## Create a TCP Flow Protection filter.

**post** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters`

Create a TCP Flow Protection filter for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `expression: string`

  The filter expression.

- `mode: string`

  The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

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

- `result: optional object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }",
          "mode": "mode"
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
    "id": "id",
    "created_on": "2019-12-27T18:11:19.117Z",
    "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z"
  }
}
```

## Delete all TCP Flow Protection filters.

**delete** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters`

Delete all TCP Flow Protection filters for an account.

### Path Parameters

- `account_id: string`

  Identifier.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters \
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
  "success": true
}
```

## Domain Types

### Filter List Response

- `FilterListResponse object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

### Filter Create Response

- `FilterCreateResponse object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

### Filter Bulk Delete Response

- `FilterBulkDeleteResponse object { errors, messages, success }`

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

# Items

## Get TCP Flow Protection filter.

**get** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters/{filter_id}`

Get a TCP Flow Protection filter specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `filter_id: string`

  UUID.

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

- `result: optional object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters/$FILTER_ID \
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
    "id": "id",
    "created_on": "2019-12-27T18:11:19.117Z",
    "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z"
  }
}
```

## Update TCP Flow Protection filter.

**patch** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters/{filter_id}`

Update a TCP Flow Protection filter specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `filter_id: string`

  UUID.

### Body Parameters

- `expression: optional string`

  The new filter expression. Optional.

- `mode: optional string`

  The new mode for the filter. Optional. Must be one of 'enabled', 'disabled', 'monitoring'.

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

- `result: optional object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters/$FILTER_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }"
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
    "id": "id",
    "created_on": "2019-12-27T18:11:19.117Z",
    "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z"
  }
}
```

## Delete TCP Flow Protection filter.

**delete** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters/{filter_id}`

Delete a TCP Flow Protection filter specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `filter_id: string`

  UUID.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters/$FILTER_ID \
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
  "success": true
}
```

## Domain Types

### Item Get Response

- `ItemGetResponse object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

### Item Edit Response

- `ItemEditResponse object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

### Item Delete Response

- `ItemDeleteResponse object { errors, messages, success }`

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

# Rules

## List all TCP Flow Protection rules.

**get** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules`

List all TCP Flow Protection rules for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional string`

  The direction of ordering (ASC or DESC). Defaults to 'ASC'.

- `order: optional string`

  The field to order by. Defaults to 'prefix'.

- `page: optional number`

  The page number for pagination. Defaults to 1.

- `per_page: optional number`

  The number of items per page. Must be between 10 and 1000. Defaults to 25.

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

- `result: optional array of object { id, burst_sensitivity, created_on, 5 more }`

  - `id: string`

    The unique ID of the TCP Flow Protection rule.

  - `burst_sensitivity: string`

    The burst sensitivity. Must be one of 'low', 'medium', 'high'.

  - `created_on: string`

    The creation timestamp of the TCP Flow Protection rule.

  - `mode: string`

    The mode for TCP Flow Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the TCP Flow Protection rule.

  - `name: string`

    The name of the TCP Flow Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

  - `rate_sensitivity: string`

    The rate sensitivity. Must be one of 'low', 'medium', 'high'.

  - `scope: string`

    The scope for the TCP Flow Protection rule. Must be one of 'global', 'region', or 'datacenter'.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules \
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
      "id": "id",
      "burst_sensitivity": "burst_sensitivity",
      "created_on": "2019-12-27T18:11:19.117Z",
      "mode": "mode",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "rate_sensitivity": "rate_sensitivity",
      "scope": "scope"
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

## Create TCP Flow Protection rule.

**post** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules`

Create a TCP Flow Protection rule for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `burst_sensitivity: string`

  The burst sensitivity. Must be one of 'low', 'medium', 'high'.

- `mode: string`

  The mode for the TCP Flow Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

- `name: string`

  The name of the TCP Flow Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

- `rate_sensitivity: string`

  The rate sensitivity. Must be one of 'low', 'medium', 'high'.

- `scope: string`

  The scope for the TCP Flow Protection rule.

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

- `result: optional object { id, burst_sensitivity, created_on, 5 more }`

  - `id: string`

    The unique ID of the TCP Flow Protection rule.

  - `burst_sensitivity: string`

    The burst sensitivity. Must be one of 'low', 'medium', 'high'.

  - `created_on: string`

    The creation timestamp of the TCP Flow Protection rule.

  - `mode: string`

    The mode for TCP Flow Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the TCP Flow Protection rule.

  - `name: string`

    The name of the TCP Flow Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

  - `rate_sensitivity: string`

    The rate sensitivity. Must be one of 'low', 'medium', 'high'.

  - `scope: string`

    The scope for the TCP Flow Protection rule. Must be one of 'global', 'region', or 'datacenter'.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "burst_sensitivity": "burst_sensitivity",
          "mode": "mode",
          "name": "name",
          "rate_sensitivity": "rate_sensitivity",
          "scope": "scope"
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
    "id": "id",
    "burst_sensitivity": "burst_sensitivity",
    "created_on": "2019-12-27T18:11:19.117Z",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "rate_sensitivity": "rate_sensitivity",
    "scope": "scope"
  }
}
```

## Delete all TCP Flow Protection rules.

**delete** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules`

Delete all TCP Flow Protection rules for an account.

### Path Parameters

- `account_id: string`

  Identifier.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules \
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
  "success": true
}
```

## Domain Types

### Rule List Response

- `RuleListResponse object { id, burst_sensitivity, created_on, 5 more }`

  - `id: string`

    The unique ID of the TCP Flow Protection rule.

  - `burst_sensitivity: string`

    The burst sensitivity. Must be one of 'low', 'medium', 'high'.

  - `created_on: string`

    The creation timestamp of the TCP Flow Protection rule.

  - `mode: string`

    The mode for TCP Flow Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the TCP Flow Protection rule.

  - `name: string`

    The name of the TCP Flow Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

  - `rate_sensitivity: string`

    The rate sensitivity. Must be one of 'low', 'medium', 'high'.

  - `scope: string`

    The scope for the TCP Flow Protection rule. Must be one of 'global', 'region', or 'datacenter'.

### Rule Create Response

- `RuleCreateResponse object { id, burst_sensitivity, created_on, 5 more }`

  - `id: string`

    The unique ID of the TCP Flow Protection rule.

  - `burst_sensitivity: string`

    The burst sensitivity. Must be one of 'low', 'medium', 'high'.

  - `created_on: string`

    The creation timestamp of the TCP Flow Protection rule.

  - `mode: string`

    The mode for TCP Flow Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the TCP Flow Protection rule.

  - `name: string`

    The name of the TCP Flow Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

  - `rate_sensitivity: string`

    The rate sensitivity. Must be one of 'low', 'medium', 'high'.

  - `scope: string`

    The scope for the TCP Flow Protection rule. Must be one of 'global', 'region', or 'datacenter'.

### Rule Bulk Delete Response

- `RuleBulkDeleteResponse object { errors, messages, success }`

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

# Items

## Get TCP Flow Protection rule.

**get** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules/{rule_id}`

Get a TCP Flow Protection rule specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `rule_id: string`

  UUID.

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

- `result: optional object { id, burst_sensitivity, created_on, 5 more }`

  - `id: string`

    The unique ID of the TCP Flow Protection rule.

  - `burst_sensitivity: string`

    The burst sensitivity. Must be one of 'low', 'medium', 'high'.

  - `created_on: string`

    The creation timestamp of the TCP Flow Protection rule.

  - `mode: string`

    The mode for TCP Flow Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the TCP Flow Protection rule.

  - `name: string`

    The name of the TCP Flow Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

  - `rate_sensitivity: string`

    The rate sensitivity. Must be one of 'low', 'medium', 'high'.

  - `scope: string`

    The scope for the TCP Flow Protection rule. Must be one of 'global', 'region', or 'datacenter'.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules/$RULE_ID \
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
    "id": "id",
    "burst_sensitivity": "burst_sensitivity",
    "created_on": "2019-12-27T18:11:19.117Z",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "rate_sensitivity": "rate_sensitivity",
    "scope": "scope"
  }
}
```

## Update TCP Flow Protection rule.

**patch** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules/{rule_id}`

Update a TCP Flow Protection rule specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `rule_id: string`

  UUID.

### Body Parameters

- `burst_sensitivity: optional string`

  The new burst sensitivity. Optional. Must be one of 'low', 'medium', 'high'.

- `mode: optional string`

  The new mode for TCP Flow Protection. Optional. Must be one of 'enabled', 'disabled', 'monitoring'.

- `rate_sensitivity: optional string`

  The new rate sensitivity. Optional. Must be one of 'low', 'medium', 'high'.

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

- `result: optional object { id, burst_sensitivity, created_on, 5 more }`

  - `id: string`

    The unique ID of the TCP Flow Protection rule.

  - `burst_sensitivity: string`

    The burst sensitivity. Must be one of 'low', 'medium', 'high'.

  - `created_on: string`

    The creation timestamp of the TCP Flow Protection rule.

  - `mode: string`

    The mode for TCP Flow Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the TCP Flow Protection rule.

  - `name: string`

    The name of the TCP Flow Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

  - `rate_sensitivity: string`

    The rate sensitivity. Must be one of 'low', 'medium', 'high'.

  - `scope: string`

    The scope for the TCP Flow Protection rule. Must be one of 'global', 'region', or 'datacenter'.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules/$RULE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "id": "id",
    "burst_sensitivity": "burst_sensitivity",
    "created_on": "2019-12-27T18:11:19.117Z",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "rate_sensitivity": "rate_sensitivity",
    "scope": "scope"
  }
}
```

## Delete TCP Flow Protection rule.

**delete** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules/{rule_id}`

Delete a TCP Flow Protection rule specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `rule_id: string`

  UUID.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules/$RULE_ID \
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
  "success": true
}
```

## Domain Types

### Item Get Response

- `ItemGetResponse object { id, burst_sensitivity, created_on, 5 more }`

  - `id: string`

    The unique ID of the TCP Flow Protection rule.

  - `burst_sensitivity: string`

    The burst sensitivity. Must be one of 'low', 'medium', 'high'.

  - `created_on: string`

    The creation timestamp of the TCP Flow Protection rule.

  - `mode: string`

    The mode for TCP Flow Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the TCP Flow Protection rule.

  - `name: string`

    The name of the TCP Flow Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

  - `rate_sensitivity: string`

    The rate sensitivity. Must be one of 'low', 'medium', 'high'.

  - `scope: string`

    The scope for the TCP Flow Protection rule. Must be one of 'global', 'region', or 'datacenter'.

### Item Edit Response

- `ItemEditResponse object { id, burst_sensitivity, created_on, 5 more }`

  - `id: string`

    The unique ID of the TCP Flow Protection rule.

  - `burst_sensitivity: string`

    The burst sensitivity. Must be one of 'low', 'medium', 'high'.

  - `created_on: string`

    The creation timestamp of the TCP Flow Protection rule.

  - `mode: string`

    The mode for TCP Flow Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the TCP Flow Protection rule.

  - `name: string`

    The name of the TCP Flow Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

  - `rate_sensitivity: string`

    The rate sensitivity. Must be one of 'low', 'medium', 'high'.

  - `scope: string`

    The scope for the TCP Flow Protection rule. Must be one of 'global', 'region', or 'datacenter'.

### Item Delete Response

- `ItemDeleteResponse object { errors, messages, success }`

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

# Status

## Get protection status.

**get** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_protection_status`

Get the protection status of the account.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: optional object { enabled }`

  - `enabled: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/tcp_protection_status \
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
    "enabled": true
  }
}
```

## Update protection status.

**patch** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_protection_status`

Update the protection status of the account.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `enabled: boolean`

  Enables or disables protection.

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

- `result: optional object { enabled }`

  - `enabled: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/tcp_protection_status \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true
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
    "enabled": true
  }
}
```

## Domain Types

### Status Get Response

- `StatusGetResponse object { enabled }`

  - `enabled: boolean`

### Status Edit Response

- `StatusEditResponse object { enabled }`

  - `enabled: boolean`
