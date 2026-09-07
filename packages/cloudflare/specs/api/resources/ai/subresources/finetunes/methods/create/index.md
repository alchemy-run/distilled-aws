## Create a new Finetune

**post** `/accounts/{account_id}/ai/finetunes`

Creates a new fine-tuning job for a Workers AI model using custom training data.

### Path Parameters

- `account_id: string`

### Body Parameters

- `model: string`

- `name: string`

- `description: optional string`

- `public: optional boolean`

### Returns

- `result: object { id, created_at, model, 4 more }`

  - `id: string`

  - `created_at: string`

  - `model: string`

  - `modified_at: string`

  - `name: string`

  - `public: boolean`

  - `description: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/finetunes \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "model": "model",
          "name": "name"
        }'
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
    "public": true,
    "description": "description"
  },
  "success": true
}
```
