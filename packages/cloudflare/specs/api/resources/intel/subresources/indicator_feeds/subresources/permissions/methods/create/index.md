## Grant permission to indicator feed

**put** `/accounts/{account_id}/intel/indicator-feeds/permissions/add`

Grants access permissions for a custom threat indicator feed to other accounts.

### Path Parameters

- `account_id: string`

  Identifier

### Body Parameters

- `account_tag: optional string`

  The Cloudflare account tag of the account to change permissions on

- `feed_id: optional number`

  The ID of the feed to add/remove permissions on

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { success }`

  - `success: optional boolean`

    Whether the update succeeded or not

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/permissions/add \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "account_tag": "823f45f16fd2f7e21e1e054aga4d2859",
          "feed_id": 1
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "success": true
  }
}
```
