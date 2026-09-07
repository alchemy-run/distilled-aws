## Get D1 database bookmark

**get** `/accounts/{account_id}/d1/database/{database_id}/time_travel/bookmark`

Retrieves the current bookmark, or the nearest bookmark at or before a provided timestamp.
Bookmarks can be used with the restore endpoint to revert the database to a previous point in time.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `database_id: string`

  D1 database identifier (UUID).

### Query Parameters

- `timestamp: optional string`

  An optional ISO 8601 timestamp. If provided, returns the nearest available bookmark at or before this timestamp. If omitted, returns the current bookmark.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: object { bookmark }`

  - `bookmark: optional string`

    A bookmark representing a specific state of the database at a specific point in time.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database/$DATABASE_ID/time_travel/bookmark \
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
  "result": {
    "bookmark": "00000001-00000002-00004e2f-0a83ea2fceebc654de0640c422be4653"
  },
  "success": true
}
```
