## Delete flag

**delete** `/accounts/{account_id}/flagship/apps/{app_id}/flags/{flag_key}`

Permanently deletes a flag. Subsequent evaluations fall back to the caller-supplied default. Cannot be undone.

### Path Parameters

- `account_id: string`

  Cloudflare account ID.

- `app_id: string`

  App identifier.

- `flag_key: string`

  Flag key (slug).

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: string`

- `result: object { key }`

  - `key: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/flagship/apps/$APP_ID/flags/$FLAG_KEY \
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
    "key": "key"
  },
  "success": true
}
```
