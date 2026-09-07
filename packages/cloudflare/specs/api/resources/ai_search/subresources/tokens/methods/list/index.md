## List tokens.

**get** `/accounts/{account_id}/ai-search/tokens`

List tokens.

### Path Parameters

- `account_id: string`

### Query Parameters

- `page: optional number`

  Page number (1-indexed).

- `per_page: optional number`

  Number of results per page.

- `search: optional string`

  Filter tokens whose name contains this string (case-insensitive).

### Returns

- `result: array of object { id, cf_api_id, created_at, 6 more }`

  - `id: string`

  - `cf_api_id: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `created_by: optional string`

  - `enabled: optional boolean`

  - `legacy: optional boolean`

  - `modified_by: optional string`

- `result_info: object { count, page, per_page, total_count }`

  - `count: number`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/tokens \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "cf_api_id": "cf_api_id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "created_by": "created_by",
      "enabled": true,
      "legacy": true,
      "modified_by": "modified_by"
    }
  ],
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  },
  "success": true
}
```
