# Tokens

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

## Create token.

**post** `/accounts/{account_id}/ai-search/tokens`

Create a new token.

### Path Parameters

- `account_id: string`

### Body Parameters

- `cf_api_id: string`

- `cf_api_key: string`

- `name: string`

- `legacy: optional boolean`

### Returns

- `result: object { id, cf_api_id, created_at, 6 more }`

  - `id: string`

  - `cf_api_id: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `created_by: optional string`

  - `enabled: optional boolean`

  - `legacy: optional boolean`

  - `modified_by: optional string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/tokens \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "cf_api_id": "a1b2c3d4e5f6",
          "cf_api_key": "abc123",
          "name": "my-token"
        }'
```

#### Response

```json
{
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "cf_api_id": "cf_api_id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "created_by": "created_by",
    "enabled": true,
    "legacy": true,
    "modified_by": "modified_by"
  },
  "success": true
}
```

## Read token.

**get** `/accounts/{account_id}/ai-search/tokens/{id}`

Read token.

### Path Parameters

- `account_id: string`

- `id: string`

### Returns

- `result: object { id, cf_api_id, created_at, 6 more }`

  - `id: string`

  - `cf_api_id: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `created_by: optional string`

  - `enabled: optional boolean`

  - `legacy: optional boolean`

  - `modified_by: optional string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/tokens/$ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "cf_api_id": "cf_api_id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "created_by": "created_by",
    "enabled": true,
    "legacy": true,
    "modified_by": "modified_by"
  },
  "success": true
}
```

## Update token.

**put** `/accounts/{account_id}/ai-search/tokens/{id}`

Update token.

### Path Parameters

- `account_id: string`

- `id: string`

### Body Parameters

- `cf_api_id: string`

- `cf_api_key: string`

- `name: string`

- `legacy: optional boolean`

### Returns

- `result: object { id, cf_api_id, created_at, 6 more }`

  - `id: string`

  - `cf_api_id: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `created_by: optional string`

  - `enabled: optional boolean`

  - `legacy: optional boolean`

  - `modified_by: optional string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/tokens/$ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "cf_api_id": "a1b2c3d4e5f6",
          "cf_api_key": "abc123",
          "name": "my-token"
        }'
```

#### Response

```json
{
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "cf_api_id": "cf_api_id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "created_by": "created_by",
    "enabled": true,
    "legacy": true,
    "modified_by": "modified_by"
  },
  "success": true
}
```

## Delete token.

**delete** `/accounts/{account_id}/ai-search/tokens/{id}`

Delete token.

### Path Parameters

- `account_id: string`

- `id: string`

### Returns

- `result: unknown`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/tokens/$ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {},
  "success": true
}
```

## Domain Types

### Token List Response

- `TokenListResponse object { id, cf_api_id, created_at, 6 more }`

  - `id: string`

  - `cf_api_id: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `created_by: optional string`

  - `enabled: optional boolean`

  - `legacy: optional boolean`

  - `modified_by: optional string`

### Token Create Response

- `TokenCreateResponse object { id, cf_api_id, created_at, 6 more }`

  - `id: string`

  - `cf_api_id: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `created_by: optional string`

  - `enabled: optional boolean`

  - `legacy: optional boolean`

  - `modified_by: optional string`

### Token Read Response

- `TokenReadResponse object { id, cf_api_id, created_at, 6 more }`

  - `id: string`

  - `cf_api_id: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `created_by: optional string`

  - `enabled: optional boolean`

  - `legacy: optional boolean`

  - `modified_by: optional string`

### Token Update Response

- `TokenUpdateResponse object { id, cf_api_id, created_at, 6 more }`

  - `id: string`

  - `cf_api_id: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `created_by: optional string`

  - `enabled: optional boolean`

  - `legacy: optional boolean`

  - `modified_by: optional string`

### Token Delete Response

- `TokenDeleteResponse = unknown`
