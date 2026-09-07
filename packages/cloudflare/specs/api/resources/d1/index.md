# D1

## Domain Types

### D1

- `D1 object { created_at, file_size, jurisdiction, 5 more }`

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

# Database

## List D1 Databases

**get** `/accounts/{account_id}/d1/database`

Returns a list of D1 databases.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Query Parameters

- `name: optional string`

  a database name to search for.

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of items per page.

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

- `result: array of object { created_at, jurisdiction, name, 2 more }`

  - `created_at: optional string`

    Specifies the timestamp the resource was created as an ISO8601 string.

  - `jurisdiction: optional "eu" or "fedramp"`

    Specify the location to restrict the D1 database to run and store data. If this option is present, the location hint is ignored.

    - `"eu"`

    - `"fedramp"`

  - `name: optional string`

    D1 database name.

  - `uuid: optional string`

    D1 database identifier (UUID).

  - `version: optional string`

- `success: true`

  Whether the API call was successful

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database \
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
  "result": [
    {
      "created_at": "2022-11-15T18:25:44.442097Z",
      "jurisdiction": "eu",
      "name": "my-database",
      "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "version": "production"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

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

## Create D1 Database

**post** `/accounts/{account_id}/d1/database`

Returns the created D1 database.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Body Parameters

- `name: string`

  D1 database name.

- `jurisdiction: optional "eu" or "fedramp"`

  Specify the location to restrict the D1 database to run and store data. If this option is present, the location hint is ignored.

  - `"eu"`

  - `"fedramp"`

- `primary_location_hint: optional "wnam" or "enam" or "weur" or 3 more`

  Specify the region to create the D1 primary, if available. If this option is omitted, the D1 will be created as close as possible to the current user.

  - `"wnam"`

  - `"enam"`

  - `"weur"`

  - `"eeur"`

  - `"apac"`

  - `"oc"`

- `read_replication: optional object { mode }`

  Configuration for D1 read replication.

  - `mode: "auto" or "disabled"`

    The read replication mode for the database. Use 'auto' to create replicas and allow D1 automatically place them around the world, or 'disabled' to not use any database replicas (it can take a few hours for all replicas to be deleted).

    - `"auto"`

    - `"disabled"`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "my-database",
          "jurisdiction": "eu",
          "primary_location_hint": "wnam"
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

## Update D1 Database

**put** `/accounts/{account_id}/d1/database/{database_id}`

Updates the specified D1 database.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `database_id: string`

  D1 database identifier (UUID).

### Body Parameters

- `read_replication: object { mode }`

  Configuration for D1 read replication.

  - `mode: "auto" or "disabled"`

    The read replication mode for the database. Use 'auto' to create replicas and allow D1 automatically place them around the world, or 'disabled' to not use any database replicas (it can take a few hours for all replicas to be deleted).

    - `"auto"`

    - `"disabled"`

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
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "read_replication": {
            "mode": "auto"
          }
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

## Update D1 Database partially

**patch** `/accounts/{account_id}/d1/database/{database_id}`

Updates partially the specified D1 database.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `database_id: string`

  D1 database identifier (UUID).

### Body Parameters

- `read_replication: optional object { mode }`

  Configuration for D1 read replication.

  - `mode: "auto" or "disabled"`

    The read replication mode for the database. Use 'auto' to create replicas and allow D1 automatically place them around the world, or 'disabled' to not use any database replicas (it can take a few hours for all replicas to be deleted).

    - `"auto"`

    - `"disabled"`

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
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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

## Delete D1 Database

**delete** `/accounts/{account_id}/d1/database/{database_id}`

Deletes the specified D1 database.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `database_id: string`

  D1 database identifier (UUID).

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

- `result: unknown`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database/$DATABASE_ID \
    -X DELETE \
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
  "result": {},
  "success": true
}
```

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

## Raw D1 Database query

**post** `/accounts/{account_id}/d1/database/{database_id}/raw`

Returns the query result rows as arrays rather than objects. This is a performance-optimized version of the /query endpoint.

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

- `result: array of object { meta, results, success }`

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

  - `results: optional object { columns, rows }`

    - `columns: optional array of string`

    - `rows: optional array of array of number or string or unknown`

      - `number`

      - `string`

      - `unknown`

  - `success: optional boolean`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database/$DATABASE_ID/raw \
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
      "results": {
        "columns": [
          "string"
        ],
        "rows": [
          [
            0
          ]
        ]
      },
      "success": true
    }
  ],
  "success": true
}
```

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

## Domain Types

### Query Result

- `QueryResult object { meta, results, success }`

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

### Database List Response

- `DatabaseListResponse object { created_at, jurisdiction, name, 2 more }`

  - `created_at: optional string`

    Specifies the timestamp the resource was created as an ISO8601 string.

  - `jurisdiction: optional "eu" or "fedramp"`

    Specify the location to restrict the D1 database to run and store data. If this option is present, the location hint is ignored.

    - `"eu"`

    - `"fedramp"`

  - `name: optional string`

    D1 database name.

  - `uuid: optional string`

    D1 database identifier (UUID).

  - `version: optional string`

### Database Delete Response

- `DatabaseDeleteResponse = unknown`

### Database Raw Response

- `DatabaseRawResponse object { meta, results, success }`

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

  - `results: optional object { columns, rows }`

    - `columns: optional array of string`

    - `rows: optional array of array of number or string or unknown`

      - `number`

      - `string`

      - `unknown`

  - `success: optional boolean`

### Database Export Response

- `DatabaseExportResponse object { at_bookmark, error, messages, 4 more }`

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

### Database Import Response

- `DatabaseImportResponse object { at_bookmark, error, filename, 6 more }`

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

# Time Travel

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

## Domain Types

### Time Travel Get Bookmark Response

- `TimeTravelGetBookmarkResponse object { bookmark }`

  - `bookmark: optional string`

    A bookmark representing a specific state of the database at a specific point in time.

### Time Travel Restore Response

- `TimeTravelRestoreResponse object { bookmark, message, previous_bookmark }`

  Response from a time travel restore operation.

  - `bookmark: optional string`

    The new bookmark representing the state of the database after the restore operation.

  - `message: optional string`

    A message describing the result of the restore operation.

  - `previous_bookmark: optional string`

    The bookmark representing the state of the database before the restore operation. Can be used to undo the restore if needed.
