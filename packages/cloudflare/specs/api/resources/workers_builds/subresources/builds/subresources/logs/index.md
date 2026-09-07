# Logs

## Get build logs

**get** `/accounts/{account_id}/builds/builds/{build_uuid}/logs`

Retrieve logs for a specific build with cursor-based pagination

### Path Parameters

- `account_id: string`

  Account identifier.

- `build_uuid: string`

  Build UUID.

### Query Parameters

- `cursor: optional string`

  Pagination cursor for log retrieval.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: object { cursor, lines, truncated }`

  - `cursor: optional string`

    Pagination cursor for log retrieval.

  - `lines: optional array of array of number or string`

    - `number`

      Unix epoch timestamp

    - `string`

      Log message

  - `truncated: optional boolean`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/builds/$BUILD_UUID/logs \
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
    "cursor": "eyJsaW5lIjoxMDAsInRpbWVzdGFtcCI6MTYzNjQ3MjQwMH0",
    "lines": [
      [
        1636472400,
        1636472400
      ]
    ],
    "truncated": false
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

## Domain Types

### Log Get Response

- `LogGetResponse object { cursor, lines, truncated }`

  - `cursor: optional string`

    Pagination cursor for log retrieval.

  - `lines: optional array of array of number or string`

    - `number`

      Unix epoch timestamp

    - `string`

      Log message

  - `truncated: optional boolean`
