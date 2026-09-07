## Query D1 Database

**post** `/accounts/{account_id}/d1/database/{database_id}/query`

Returns the query result as an object.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `database_id: string`

  D1 database identifier (UUID).

### Body Parameters

- `body: object { sql, params }  or object { batch }`

  A single query object or a batch query object

  - `D1SingleQuery object { sql, params }`

    A single query with or without parameters

    - `sql: string`

      Your SQL query. Supports multiple statements, joined by semicolons, which will be executed as a batch.

    - `params: optional array of string`

  - `MultipleQueries object { batch }`

    - `batch: array of object { sql, params }`

      - `sql: string`

        Your SQL query. Supports multiple statements, joined by semicolons, which will be executed as a batch.

      - `params: optional array of string`

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

- `result: array of QueryResult`

  - `meta: optional object { changed_db, changes, duration, 8 more }`

    - `changed_db: optional boolean`

      Denotes if the database has been altered in some way, like deleting rows.

    - `changes: optional number`

      Rough indication of how many rows were modified by the query, as provided by SQLite's `sqlite3_total_changes()`.

    - `duration: optional number`

      The duration of the SQL query execution inside the database. Does not include any network communication.

    - `last_row_id: optional number`

      The row ID of the last inserted row in a table with an `INTEGER PRIMARY KEY` as provided by SQLite. Tables created with `WITHOUT ROWID` do not populate this.

    - `rows_read: optional number`

      Number of rows read during the SQL query execution, including indices (not all rows are necessarily returned).

    - `rows_written: optional number`

      Number of rows written during the SQL query execution, including indices.

    - `served_by_colo: optional string`

      The three letters airport code of the colo that handled the query.

    - `served_by_primary: optional boolean`

      Denotes if the query has been handled by the database primary instance.

    - `served_by_region: optional "WNAM" or "ENAM" or "WEUR" or 3 more`

      Region location hint of the database instance that handled the query.

      - `"WNAM"`

      - `"ENAM"`

      - `"WEUR"`

      - `"EEUR"`

      - `"APAC"`

      - `"OC"`

    - `size_after: optional number`

      Size of the database after the query committed, in bytes.

    - `timings: optional object { sql_duration_ms }`

      Various durations for the query.

      - `sql_duration_ms: optional number`

        The duration of the SQL query execution inside the database. Does not include any network communication.

  - `results: optional array of unknown`

  - `success: optional boolean`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database/$DATABASE_ID/query \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "sql": "SELECT * FROM myTable WHERE field = ? OR field = ?;",
          "params": [
            "firstParam",
            "secondParam"
          ]
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
  "result": [
    {
      "meta": {
        "changed_db": true,
        "changes": 0,
        "duration": 0,
        "last_row_id": 0,
        "rows_read": 0,
        "rows_written": 0,
        "served_by_colo": "LHR",
        "served_by_primary": true,
        "served_by_region": "EEUR",
        "size_after": 0,
        "timings": {
          "sql_duration_ms": 0
        }
      },
      "results": [
        {}
      ],
      "success": true
    }
  ],
  "success": true
}
```
