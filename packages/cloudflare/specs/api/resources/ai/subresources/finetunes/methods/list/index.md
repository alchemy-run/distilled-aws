## List Finetunes

**get** `/accounts/{account_id}/ai/finetunes`

Lists all fine-tuning jobs created by the account, including status and metrics.

### Path Parameters

- `account_id: string`

### Returns

- `result: object { id, created_at, model, 3 more }`

  - `id: string`

  - `created_at: string`

  - `model: string`

  - `modified_at: string`

  - `name: string`

  - `description: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/finetunes \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "model": "model",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "description": "description"
  },
  "success": true
}
```
