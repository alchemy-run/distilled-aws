## Revoke registrations

**post** `/accounts/{account_id}/devices/registrations/revoke`

Revokes a list of WARP registrations.

### Path Parameters

- `account_id: string`

### Query Parameters

- `id: array of string`

  A list of registration IDs to revoke.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: unknown`

- `success: boolean`

  Whether the API call was successful.

- `result_info: optional object { count, cursor, per_page, total_count }`

  V4 public API Pagination/Cursor info.

  - `count: number`

    Number of records in the response.

  - `cursor: string`

    Opaque token to request the next set of records.

  - `per_page: number`

    The limit for the number of records in the response.

  - `total_count: optional number`

    Total number of records available.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/registrations/revoke \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {},
  "success": true,
  "result_info": {
    "count": 1,
    "cursor": "ais86dftf.asdf7ba8",
    "per_page": 10,
    "total_count": null
  }
}
```
