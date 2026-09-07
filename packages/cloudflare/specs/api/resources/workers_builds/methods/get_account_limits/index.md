## Get account limits

**get** `/accounts/{account_id}/builds/account/limits`

Retrieve account limits and usage information

### Path Parameters

- `account_id: string`

  Account identifier.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: object { build_minutes_refresh_on, has_reached_build_minutes_limit }`

  - `build_minutes_refresh_on: optional string`

    When build minutes will refresh (only for non-paid plans)

  - `has_reached_build_minutes_limit: optional boolean`

    Whether build minutes limit has been reached (only for non-paid plans)

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/account/limits \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "build_minutes_refresh_on": "2019-12-27T18:11:19.117Z",
    "has_reached_build_minutes_limit": true
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
