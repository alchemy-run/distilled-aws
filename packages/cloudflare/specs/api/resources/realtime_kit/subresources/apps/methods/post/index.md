## Create App

**post** `/accounts/{account_id}/realtime/kit/apps`

Create new app for your account

### Path Parameters

- `account_id: string`

  The account identifier tag.

### Body Parameters

- `name: string`

### Returns

- `data: optional object { app }`

  - `app: optional object { id, created_at, name }`

    - `id: optional string`

    - `created_at: optional string`

    - `name: optional string`

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/apps \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "x"
        }'
```

#### Response

```json
{
  "data": {
    "app": {
      "created_at": "2025-01-01T08:16:40.644Z",
      "id": "14a396e7-ca44-4937-bf1f-050a69118543",
      "name": "my-new-app"
    }
  },
  "success": true
}
```
