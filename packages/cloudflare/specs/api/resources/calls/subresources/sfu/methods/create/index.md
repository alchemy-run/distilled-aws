## Create a new app

**post** `/accounts/{account_id}/calls/apps`

Creates a new Cloudflare calls app. An app is an unique enviroment where each Session can access all Tracks within the app.

### Path Parameters

- `account_id: string`

  The account identifier tag.

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

- `result: optional object { created, modified, name, 2 more }`

  - `created: optional string`

    The date and time the item was created.

  - `modified: optional string`

    The date and time the item was last modified.

  - `name: optional string`

    A short description of Calls app, not shown to end users.

  - `secret: optional string`

    Bearer token

  - `uid: optional string`

    A Cloudflare-generated unique identifier for a item.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/calls/apps \
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
    "secret": "66bcf64aa8907b9f9d90ac17746a77ce394c393b92b3916633dc02846e608ad4",
    "uid": "2a95132c15732412d22c1476fa83f27a"
  }
}
```
