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
