## Edit app details

**put** `/accounts/{account_id}/calls/apps/{app_id}`

Edit details for a single app.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  A Cloudflare-generated unique identifier for a item.

### Body Parameters

- `name: optional string`

  A short description of Calls app, not shown to end users.

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

- `result: optional object { created, modified, name, uid }`

  - `created: optional string`

    The date and time the item was created.

  - `modified: optional string`

    The date and time the item was last modified.

  - `name: optional string`

    A short description of Calls app, not shown to end users.

  - `uid: optional string`

    A Cloudflare-generated unique identifier for a item.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/calls/apps/$APP_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "production-realtime-app"
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
    "created": "2014-01-02T02:20:00Z",
    "modified": "2014-01-02T02:20:00Z",
    "name": "production-realtime-app",
    "uid": "2a95132c15732412d22c1476fa83f27a"
  }
}
```
