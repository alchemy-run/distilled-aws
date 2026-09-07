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
