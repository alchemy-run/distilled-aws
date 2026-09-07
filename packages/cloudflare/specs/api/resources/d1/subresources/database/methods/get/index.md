## Get D1 Database

**get** `/accounts/{account_id}/d1/database/{database_id}`

Returns the specified D1 database.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `database_id: string`

  D1 database identifier (UUID).

### Query Parameters

- `fields: optional array of "uuid" or "name" or "created_at" or 6 more`

  Comma-separated list of fields to include in the response. When omitted,
  all fields are returned.

  - `"uuid"`

  - `"name"`

  - `"created_at"`

  - `"version"`

  - `"jurisdiction"`

  - `"num_tables"`

  - `"file_size"`

  - `"running_in_region"`

  - `"read_replication"`

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

- `result: D1`

  The details of the D1 database.

  - `created_at: optional string`

    Specifies the timestamp the resource was created as an ISO8601 string.

  - `file_size: optional number`

    The D1 database's size, in bytes.

  - `jurisdiction: optional "eu" or "fedramp"`

    Specify the location to restrict the D1 database to run and store data. If this option is present, the location hint is ignored.

    - `"eu"`

    - `"fedramp"`

  - `name: optional string`

    D1 database name.

  - `num_tables: optional number`

  - `read_replication: optional object { mode }`

    Configuration for D1 read replication.

    - `mode: "auto" or "disabled"`

      The read replication mode for the database. Mode 'auto' denotes that D1 creates replicas and automatically places them around the world. Mode 'disabled' denotes that no database replicas are used.

      - `"auto"`

      - `"disabled"`

  - `uuid: optional string`

    D1 database identifier (UUID).

  - `version: optional string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database/$DATABASE_ID \
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
    "created_at": "2022-11-15T18:25:44.442097Z",
    "file_size": 12,
    "jurisdiction": "eu",
    "name": "my-database",
    "num_tables": 12,
    "read_replication": {
      "mode": "auto"
    },
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "version": "production"
  },
  "success": true
}
```
