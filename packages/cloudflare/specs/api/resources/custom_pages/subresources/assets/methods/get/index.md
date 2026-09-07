## Get a custom asset

**get** `/{accounts_or_zones}/{account_or_zone_id}/custom_pages/assets/{asset_name}`

Fetches the details of a custom asset.

### Path Parameters

- `asset_name: string`

  The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (_).

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

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

- `result: optional object { description, last_updated, name, 2 more }`

  - `description: optional string`

    A short description of the custom asset.

  - `last_updated: optional string`

  - `name: optional string`

    The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (_).

  - `size_bytes: optional number`

    The size of the asset content in bytes.

  - `url: optional string`

    The URL where the asset content is fetched from.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/custom_pages/assets/$ASSET_NAME \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "description": "Custom 500 error page",
    "last_updated": "2014-01-01T05:20:00.12345Z",
    "name": "my_custom_error_page",
    "size_bytes": 1024,
    "url": "https://example.com/error.html"
  }
}
```
