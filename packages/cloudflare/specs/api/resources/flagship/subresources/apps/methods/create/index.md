## Create app

**post** `/accounts/{account_id}/flagship/apps`

Creates an app. The returned `id` is used in all subsequent flag, changelog, and evaluation requests.

### Path Parameters

- `account_id: string`

  Cloudflare account ID.

### Body Parameters

- `name: string`

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: string`

- `result: object { id, created_at, name, 2 more }`

  - `id: string`

  - `created_at: string`

  - `name: string`

  - `updated_at: string`

  - `updated_by: string`

    Email of the actor who last modified the app, or `edge-gateway` for gateway-authenticated changes.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/flagship/apps \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "x"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "message"
    }
  ],
  "result": {
    "id": "id",
    "created_at": "created_at",
    "name": "name",
    "updated_at": "updated_at",
    "updated_by": "updated_by"
  },
  "success": true
}
```
