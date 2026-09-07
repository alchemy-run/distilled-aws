## Cancel build

**put** `/accounts/{account_id}/builds/builds/{build_uuid}/cancel`

Cancel a running or queued build

### Path Parameters

- `account_id: string`

  Account identifier.

- `build_uuid: string`

  Build UUID.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: object { build_outcome, build_uuid, stopped_on }`

  - `build_outcome: optional "success" or "fail" or "skipped" or 2 more`

    - `"success"`

    - `"fail"`

    - `"skipped"`

    - `"cancelled"`

    - `"terminated"`

  - `build_uuid: optional string`

    Build UUID.

  - `stopped_on: optional string`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/builds/$BUILD_UUID/cancel \
    -X PUT \
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
    "build_outcome": "success",
    "build_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "stopped_on": "2019-12-27T18:11:19.117Z"
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
