## Files

**get** `/accounts/{account_id}/autorag/rags/{id}/files`

Files

### Path Parameters

- `account_id: string`

- `id: string`

  rag id

### Query Parameters

- `page: optional number`

- `per_page: optional number`

- `search: optional string`

- `status: optional "completed" or "queued" or "running" or "error"`

  - `"completed"`

  - `"queued"`

  - `"running"`

  - `"error"`

### Returns

- `result: array of object { error, key }`

  - `error: string`

  - `key: string`

- `result_info: object { count, page, total_count, per_page }`

  - `count: number`

  - `page: number`

  - `total_count: number`

  - `per_page: optional number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/autorag/rags/$ID/files \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "error": "error",
      "key": "key"
    }
  ],
  "result_info": {
    "count": 0,
    "page": 0,
    "total_count": 0,
    "per_page": 5
  },
  "success": true
}
```
