# Finetunes

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

## Domain Types

### Finetune List Response

- `FinetuneListResponse object { id, created_at, model, 3 more }`

  - `id: string`

  - `created_at: string`

  - `model: string`

  - `modified_at: string`

  - `name: string`

  - `description: optional string`

### Finetune Create Response

- `FinetuneCreateResponse object { id, created_at, model, 4 more }`

  - `id: string`

  - `created_at: string`

  - `model: string`

  - `modified_at: string`

  - `name: string`

  - `public: boolean`

  - `description: optional string`

# Assets

## Upload a Finetune Asset

**post** `/accounts/{account_id}/ai/finetunes/{finetune_id}/finetune-assets`

Uploads training data assets for a Workers AI fine-tuning job.

### Path Parameters

- `account_id: string`

- `finetune_id: string`

### Returns

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/finetunes/$FINETUNE_ID/finetune-assets \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F 'file=@/path/to/file' \
    -F file_name=file_name
```

#### Response

```json
{
  "success": true
}
```

## Domain Types

### Asset Create Response

- `AssetCreateResponse object { success }`

  - `success: boolean`

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
