## Sync

**patch** `/accounts/{account_id}/autorag/rags/{id}/sync`

Sync

### Path Parameters

- `account_id: string`

- `id: string`

  rag id

### Returns

- `result: object { job_id }`

  - `job_id: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/autorag/rags/$ID/sync \
    -X PATCH \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "job_id": "job_id"
  },
  "success": true
}
```
