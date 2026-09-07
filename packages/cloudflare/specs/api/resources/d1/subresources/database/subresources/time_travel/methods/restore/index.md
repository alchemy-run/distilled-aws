## Restore D1 Database to a bookmark or point in time

**post** `/accounts/{account_id}/d1/database/{database_id}/time_travel/restore`

Restores a D1 database to a previous point in time either via a bookmark or a timestamp.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `database_id: string`

  D1 database identifier (UUID).

### Query Parameters

- `bookmark: optional string`

  A bookmark to restore the database to. Required if `timestamp` is not provided.

- `timestamp: optional string`

  An ISO 8601 timestamp to restore the database to. Required if `bookmark` is not provided.

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

- `result: object { bookmark, message, previous_bookmark }`

  Response from a time travel restore operation.

  - `bookmark: optional string`

    The new bookmark representing the state of the database after the restore operation.

  - `message: optional string`

    A message describing the result of the restore operation.

  - `previous_bookmark: optional string`

    The bookmark representing the state of the database before the restore operation. Can be used to undo the restore if needed.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database/$DATABASE_ID/time_travel/restore \
    -X POST \
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
    "bookmark": "00000001-00000002-00004e2f-0a83ea2fceebc654de0640c422be4653",
    "message": "Database restored successfully",
    "previous_bookmark": "00000001-00000002-00004e2f-0a83ea2fceebc654de0640c422be4653"
  },
  "success": true
}
```
