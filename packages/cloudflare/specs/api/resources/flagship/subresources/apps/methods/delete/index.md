## Delete app

**delete** `/accounts/{account_id}/flagship/apps/{app_id}`

Deletes an app and all its flags and changelog history. Returns 409 if any Worker still references this app via a Flagship binding.

### Path Parameters

- `account_id: string`

  Cloudflare account ID.

- `app_id: string`

  App identifier.

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: string`

- `result: object { id }`

  - `id: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/flagship/apps/$APP_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "id": "id"
  },
  "success": true
}
```
