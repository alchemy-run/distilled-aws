## List DLS prefix bindings for an account

**get** `/accounts/{account_id}/dls/regional_services/prefix_bindings`

List DLS prefix bindings for an account

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

### Query Parameters

- `cursor: optional string`

  Opaque token for cursor-based pagination. Omit for the first page. Pass the value from a previous response to fetch the next page.

- `per_page: optional number`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: array of object { id, cidr, prefix_id, region_key }`

  - `id: string`

    The ID of the binding.

  - `cidr: string`

    The CIDR that is bound.

  - `prefix_id: string`

    The ID of the parent prefix.

  - `region_key: string`

    The region key used for the binding.

- `result_info: object { count, cursor, per_page }`

  - `count: number`

    Number of items in the current page.

  - `cursor: string`

    Opaque cursor for the next page. Empty string when there are no more results.

  - `per_page: number`

    Maximum number of items per page.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dls/regional_services/prefix_bindings \
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
  "result": [
    {
      "id": "id",
      "cidr": "cidr",
      "prefix_id": "prefix_id",
      "region_key": "x"
    }
  ],
  "result_info": {
    "count": 0,
    "cursor": "cursor",
    "per_page": 0
  },
  "success": true
}
```
