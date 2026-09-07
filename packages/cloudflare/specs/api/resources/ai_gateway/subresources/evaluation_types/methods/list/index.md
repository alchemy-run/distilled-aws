## List Evaluators

**get** `/accounts/{account_id}/ai-gateway/evaluation-types`

List Evaluators

### Path Parameters

- `account_id: string`

### Query Parameters

- `order_by: optional string`

- `order_by_direction: optional "asc" or "desc"`

  - `"asc"`

  - `"desc"`

- `page: optional number`

- `per_page: optional number`

### Returns

- `result: array of object { id, created_at, description, 5 more }`

  - `id: string`

  - `created_at: string`

  - `description: string`

  - `enable: boolean`

  - `mandatory: boolean`

  - `modified_at: string`

  - `name: string`

  - `type: string`

- `result_info: object { count, page, per_page, total_count }`

  - `count: number`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/evaluation-types \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "id": "id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "description": "description",
      "enable": true,
      "mandatory": true,
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "type": "type"
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
