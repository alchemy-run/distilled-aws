## Import SQL into your D1 Database

**post** `/accounts/{account_id}/d1/database/{database_id}/import`

Generates a temporary URL for uploading an SQL file to, then instructing the D1 to import it
and polling it for status updates. Imports block the D1 for their duration.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `database_id: string`

  D1 database identifier (UUID).

### Body Parameters

- `body: object { action, etag }  or object { action, etag, filename }  or object { action, current_bookmark }`

  - `Init object { action, etag }`

    - `action: "init"`

      Indicates you have a new SQL file to upload.

      - `"init"`

    - `etag: string`

      Required when action is 'init' or 'ingest'. An md5 hash of the file you're uploading. Used to check if it already exists, and validate its contents before ingesting.

  - `Ingest object { action, etag, filename }`

    - `action: "ingest"`

      Indicates you've finished uploading to tell the D1 to start consuming it

      - `"ingest"`

    - `etag: string`

      An md5 hash of the file you're uploading. Used to check if it already exists, and validate its contents before ingesting.

    - `filename: string`

      The filename you have successfully uploaded.

  - `Poll object { action, current_bookmark }`

    - `action: "poll"`

      Indicates you've finished uploading to tell the D1 to start consuming it

      - `"poll"`

    - `current_bookmark: string`

      This identifies the currently-running import, checking its status.

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

- `result: object { at_bookmark, error, filename, 6 more }`

  - `at_bookmark: optional string`

    The current time-travel bookmark for your D1, used to poll for updates. Will not change for the duration of the import. Only returned if an import process is currently running or recently finished.

  - `error: optional string`

    Only present when status = 'error'. Contains the error message that prevented the import from succeeding.

  - `filename: optional string`

    Derived from the database ID and etag, to use in avoiding repeated uploads. Only returned when for the 'init' action.

  - `messages: optional array of string`

    Logs since the last time you polled

  - `result: optional object { final_bookmark, meta, num_queries }`

    Only present when status = 'complete'

    - `final_bookmark: optional string`

      The time-travel bookmark if you need restore your D1 to directly after the import succeeded.

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

    - `num_queries: optional number`

      The total number of queries that were executed during the import.

  - `status: optional "complete" or "error"`

    - `"complete"`

    - `"error"`

  - `success: optional boolean`

  - `type: optional "import"`

    - `"import"`

  - `upload_url: optional string`

    The R2 presigned URL to use for uploading. Only returned when for the 'init' action.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database/$DATABASE_ID/import \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": "init",
          "etag": "etag"
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
  "result": {
    "at_bookmark": "at_bookmark",
    "error": "error",
    "filename": "filename",
    "messages": [
      "string"
    ],
    "result": {
      "final_bookmark": "final_bookmark",
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
      "num_queries": 0
    },
    "status": "complete",
    "success": true,
    "type": "import",
    "upload_url": "upload_url"
  },
  "success": true
}
```
