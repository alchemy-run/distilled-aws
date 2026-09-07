## Get a Bookmark application

**get** `/accounts/{account_id}/access/bookmarks/{bookmark_id}`

Fetches a single Bookmark application.

### Path Parameters

- `account_id: string`

- `bookmark_id: string`

  UUID.

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

- `result: optional Bookmark`

  - `id: optional string`

    The unique identifier for the Bookmark application.

  - `app_launcher_visible: optional boolean`

    Displays the application in the App Launcher.

  - `domain: optional string`

    The domain of the Bookmark application.

  - `logo_url: optional string`

    The image URL for the logo shown in the App Launcher dashboard.

  - `name: optional string`

    The name of the Bookmark application.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/bookmarks/$BOOKMARK_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "id": "id",
    "app_launcher_visible": true,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "domain": "example.com",
    "logo_url": "https://www.cloudflare.com/img/logo-web-badges/cf-logo-on-white-bg.svg",
    "name": "My Website",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```
