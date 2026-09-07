## Export D1 Database as SQL

**post** `/accounts/{account_id}/d1/database/{database_id}/export`

Returns a URL where the SQL contents of your D1 can be downloaded. Note: this process may take
some time for larger DBs, during which your D1 will be unavailable to serve queries. To avoid
blocking your DB unnecessarily, an in-progress export must be continually polled or will automatically cancel.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `database_id: string`

  D1 database identifier (UUID).

### Body Parameters

- `output_format: "polling"`

  Specifies that you will poll this endpoint until the export completes

  - `"polling"`

- `current_bookmark: optional string`

  To poll an in-progress export, provide the current bookmark (returned by your first polling response)

- `dump_options: optional object { no_data, no_schema, tables }`

  - `no_data: optional boolean`

    Export only the table definitions, not their contents

  - `no_schema: optional boolean`

    Export only each table's contents, not its definition

  - `tables: optional array of string`

    Filter the export to just one or more tables. Passing an empty array is the same as not passing anything and means: export all tables.

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

- `result: object { at_bookmark, error, messages, 4 more }`

  - `at_bookmark: optional string`

    The current time-travel bookmark for your D1, used to poll for updates. Will not change for the duration of the export task.

  - `error: optional string`

    Only present when status = 'error'. Contains the error message.

  - `messages: optional array of string`

    Logs since the last time you polled

  - `result: optional object { filename, signed_url }`

    Only present when status = 'complete'

    - `filename: optional string`

      The generated SQL filename.

    - `signed_url: optional string`

      The URL to download the exported SQL. Available for one hour.

  - `status: optional "complete" or "error"`

    - `"complete"`

    - `"error"`

  - `success: optional boolean`

  - `type: optional "export"`

    - `"export"`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database/$DATABASE_ID/export \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "output_format": "polling"
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
    "messages": [
      "string"
    ],
    "result": {
      "filename": "filename",
      "signed_url": "signed_url"
    },
    "status": "complete",
    "success": true,
    "type": "export"
  },
  "success": true
}
```
