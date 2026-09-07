# Accounts

## Add an account membership to an Address Map

**put** `/accounts/{account_id}/addressing/address_maps/{address_map_id}/accounts/{account_id}`

Add an account as a member of a particular address map.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `address_map_id: string`

  Identifier of an Address Map.

### Body Parameters

- `body: unknown`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/address_maps/$ADDRESS_MAP_ID/accounts/$ACCOUNT_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
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
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Remove an account membership from an Address Map

**delete** `/accounts/{account_id}/addressing/address_maps/{address_map_id}/accounts/{account_id}`

Remove an account as a member of a particular address map.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `address_map_id: string`

  Identifier of an Address Map.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/address_maps/$ADDRESS_MAP_ID/accounts/$ACCOUNT_ID \
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

### Account Update Response

- `AccountUpdateResponse object { errors, messages, success, result_info }`

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

### Account Delete Response

- `AccountDeleteResponse object { errors, messages, success, result_info }`

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
