## Create build token

**post** `/accounts/{account_id}/builds/tokens`

Create a new build authentication token

### Path Parameters

- `account_id: string`

  Account identifier.

### Body Parameters

- `build_token_name: string`

- `build_token_secret: string`

- `cloudflare_token_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: object { build_token_name, build_token_uuid, cloudflare_token_id, owner_type }`

  - `build_token_name: optional string`

  - `build_token_uuid: optional string`

    Build token UUID.

  - `cloudflare_token_id: optional string`

  - `owner_type: optional string`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/tokens \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "build_token_name": "My Build Token",
          "build_token_secret": "super-secret-token",
          "cloudflare_token_id": "cf-token-123"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "build_token_name": "My Build Token",
    "build_token_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "cloudflare_token_id": "cf-token-123",
    "owner_type": "user"
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```
