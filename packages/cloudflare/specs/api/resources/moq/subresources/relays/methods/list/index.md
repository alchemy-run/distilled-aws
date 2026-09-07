## List relays

**get** `/accounts/{account_id}/moq/relays`

Lists all MoQ relays for the account. Returns only metadata.
Config, status, and tokens are omitted.

Results are cursor-paginated (keyset on the `created` timestamp).
Use `created_before` / `created_after` with the `created` value of the
first/last item in a page to fetch the adjacent page. `result_info`
reports the page `count` and the `total` matching the cursor filters.

### Path Parameters

- `account_id: string`

  Cloudflare account identifier.

### Query Parameters

- `asc: optional boolean`

  Sort order by `created`. When true, results are returned oldest-first
  (ascending); otherwise newest-first (descending, the default).

- `created_after: optional string`

  Cursor for pagination. Returns relays created strictly after this
  RFC 3339 timestamp (typically the `created` value of the last item
  on the current page, to fetch the next page).

- `created_before: optional string`

  Cursor for pagination. Returns relays created strictly before this
  RFC 3339 timestamp (typically the `created` value of the first item
  on the current page, to fetch the previous page).

- `per_page: optional number`

  Maximum number of relays to return per page.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `success: boolean`

- `result: optional array of object { created, modified, name, uid }`

  - `created: string`

  - `modified: string`

  - `name: string`

  - `uid: string`

- `result_info: optional object { count, total }`

  - `count: optional number`

  - `total: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/moq/relays \
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
  "success": true,
  "result": [
    {
      "created": "2019-12-27T18:11:19.117Z",
      "modified": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "uid": "a1b2c3d4e5f67890a1b2c3d4e5f67890"
    }
  ],
  "result_info": {
    "count": 0,
    "total": 0
  }
}
```
