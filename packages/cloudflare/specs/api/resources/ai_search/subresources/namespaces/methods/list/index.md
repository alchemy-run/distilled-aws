## List namespaces.

**get** `/accounts/{account_id}/ai-search/namespaces`

List namespaces.

### Path Parameters

- `account_id: string`

### Query Parameters

- `page: optional number`

  Page number (1-indexed).

- `per_page: optional number`

  Number of results per page.

- `search: optional string`

  Filter namespaces whose name or description contains this string (case-insensitive).

### Returns

- `result: array of object { created_at, name, description }`

  - `created_at: string`

  - `name: string`

  - `description: optional string`

    Optional description for the namespace. Max 256 characters.

- `result_info: object { count, page, per_page, total_count }`

  - `count: number`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "created_at": "2019-12-27T18:11:19.117Z",
      "name": "production",
      "description": "Production environment"
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
