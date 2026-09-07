# Custom Providers

## List Account Providers

**get** `/accounts/{account_id}/ai-gateway/custom-providers`

Lists all AI Gateway evaluator types configured for the account.

### Path Parameters

- `account_id: string`

### Query Parameters

- `beta: optional boolean`

- `enable: optional boolean`

- `page: optional number`

- `per_page: optional number`

- `search: optional string`

  Search by id, name, slug

### Returns

- `result: array of object { id, base_url, created_at, 12 more }`

  - `id: string`

  - `base_url: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `slug: string`

  - `beta: optional boolean`

  - `curl_example: optional string`

  - `description: optional string`

  - `enable: optional boolean`

  - `headers: optional string`

  - `js_example: optional string`

  - `link: optional string`

  - `logo: optional string`

  - `position: optional number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/custom-providers \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "base_url": "https://example.com",
      "created_at": "2019-12-27T18:11:19.117Z",
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "slug": "slug",
      "beta": true,
      "curl_example": "curl_example",
      "description": "description",
      "enable": true,
      "headers": "headers",
      "js_example": "js_example",
      "link": "link",
      "logo": "logo",
      "position": 0
    }
  ],
  "success": true
}
```

## Fetch a Account Provider

**get** `/accounts/{account_id}/ai-gateway/custom-providers/{id}`

Retrieves details for a specific AI Gateway dataset.

### Path Parameters

- `account_id: string`

- `id: string`

### Returns

- `result: object { id, base_url, created_at, 12 more }`

  - `id: string`

  - `base_url: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `slug: string`

  - `beta: optional boolean`

  - `curl_example: optional string`

  - `description: optional string`

  - `enable: optional boolean`

  - `headers: optional string`

  - `js_example: optional string`

  - `link: optional string`

  - `logo: optional string`

  - `position: optional number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/custom-providers/$ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "base_url": "https://example.com",
    "created_at": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "slug": "slug",
    "beta": true,
    "curl_example": "curl_example",
    "description": "description",
    "enable": true,
    "headers": "headers",
    "js_example": "js_example",
    "link": "link",
    "logo": "logo",
    "position": 0
  },
  "success": true
}
```

## Create a new Account Provider

**post** `/accounts/{account_id}/ai-gateway/custom-providers`

Creates a new AI Gateway.

### Path Parameters

- `account_id: string`

### Body Parameters

- `base_url: string`

- `name: string`

- `slug: string`

- `beta: optional boolean`

- `curl_example: optional string`

- `description: optional string`

- `enable: optional boolean`

- `headers: optional string`

- `js_example: optional string`

- `link: optional string`

- `position: optional number`

### Returns

- `result: object { id, base_url, created_at, 12 more }`

  - `id: string`

  - `base_url: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `slug: string`

  - `beta: optional boolean`

  - `curl_example: optional string`

  - `description: optional string`

  - `enable: optional boolean`

  - `headers: optional string`

  - `js_example: optional string`

  - `link: optional string`

  - `logo: optional string`

  - `position: optional number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/custom-providers \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "base_url": "https://example.com",
          "name": "name",
          "slug": "slug"
        }'
```

#### Response

```json
{
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "base_url": "https://example.com",
    "created_at": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "slug": "slug",
    "beta": true,
    "curl_example": "curl_example",
    "description": "description",
    "enable": true,
    "headers": "headers",
    "js_example": "js_example",
    "link": "link",
    "logo": "logo",
    "position": 0
  },
  "success": true
}
```

## Delete a Account Provider

**delete** `/accounts/{account_id}/ai-gateway/custom-providers/{id}`

Deletes an AI Gateway dataset.

### Path Parameters

- `account_id: string`

- `id: string`

### Returns

- `result: object { id, base_url, created_at, 12 more }`

  - `id: string`

  - `base_url: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `slug: string`

  - `beta: optional boolean`

  - `curl_example: optional string`

  - `description: optional string`

  - `enable: optional boolean`

  - `headers: optional string`

  - `js_example: optional string`

  - `link: optional string`

  - `logo: optional string`

  - `position: optional number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/custom-providers/$ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "base_url": "https://example.com",
    "created_at": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "slug": "slug",
    "beta": true,
    "curl_example": "curl_example",
    "description": "description",
    "enable": true,
    "headers": "headers",
    "js_example": "js_example",
    "link": "link",
    "logo": "logo",
    "position": 0
  },
  "success": true
}
```

## Domain Types

### Custom Provider List Response

- `CustomProviderListResponse object { id, base_url, created_at, 12 more }`

  - `id: string`

  - `base_url: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `slug: string`

  - `beta: optional boolean`

  - `curl_example: optional string`

  - `description: optional string`

  - `enable: optional boolean`

  - `headers: optional string`

  - `js_example: optional string`

  - `link: optional string`

  - `logo: optional string`

  - `position: optional number`

### Custom Provider Get Response

- `CustomProviderGetResponse object { id, base_url, created_at, 12 more }`

  - `id: string`

  - `base_url: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `slug: string`

  - `beta: optional boolean`

  - `curl_example: optional string`

  - `description: optional string`

  - `enable: optional boolean`

  - `headers: optional string`

  - `js_example: optional string`

  - `link: optional string`

  - `logo: optional string`

  - `position: optional number`

### Custom Provider Create Response

- `CustomProviderCreateResponse object { id, base_url, created_at, 12 more }`

  - `id: string`

  - `base_url: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `slug: string`

  - `beta: optional boolean`

  - `curl_example: optional string`

  - `description: optional string`

  - `enable: optional boolean`

  - `headers: optional string`

  - `js_example: optional string`

  - `link: optional string`

  - `logo: optional string`

  - `position: optional number`

### Custom Provider Delete Response

- `CustomProviderDeleteResponse object { id, base_url, created_at, 12 more }`

  - `id: string`

  - `base_url: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `slug: string`

  - `beta: optional boolean`

  - `curl_example: optional string`

  - `description: optional string`

  - `enable: optional boolean`

  - `headers: optional string`

  - `js_example: optional string`

  - `link: optional string`

  - `logo: optional string`

  - `position: optional number`
