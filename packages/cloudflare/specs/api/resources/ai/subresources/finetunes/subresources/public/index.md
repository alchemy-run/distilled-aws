# Public

## List Public Finetunes

**get** `/accounts/{account_id}/ai/finetunes/public`

Lists publicly available fine-tuned models that can be used with Workers AI.

### Path Parameters

- `account_id: string`

### Query Parameters

- `limit: optional number`

  Pagination Limit

- `offset: optional number`

  Pagination Offset

- `orderBy: optional string`

  Order By Column Name

### Returns

- `result: array of object { id, created_at, model, 4 more }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/finetunes/public \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "created_at": "2019-12-27T18:11:19.117Z",
      "model": "model",
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "public": true,
      "description": "description"
    }
  ],
  "success": true
}
```

## Domain Types

### Public List Response

- `PublicListResponse object { id, created_at, model, 4 more }`

  - `id: string`

  - `created_at: string`

  - `model: string`

  - `modified_at: string`

  - `name: string`

  - `public: boolean`

  - `description: optional string`
