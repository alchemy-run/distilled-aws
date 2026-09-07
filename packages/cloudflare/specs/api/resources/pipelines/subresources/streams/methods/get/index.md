## Get Stream Details

**get** `/accounts/{account_id}/pipelines/v1/streams/{stream_id}`

Get Stream Details.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

- `stream_id: string`

  Specifies the public ID of the stream.

### Returns

- `result: object { id, created_at, http, 7 more }`

  - `id: string`

    Indicates a unique identifier for this stream.

  - `created_at: string`

  - `http: object { authentication, enabled, cors }`

    - `authentication: boolean`

      Indicates that authentication is required for the HTTP endpoint.

    - `enabled: boolean`

      Indicates that the HTTP endpoint is enabled.

    - `cors: optional object { origins }`

      Specifies the CORS options for the HTTP endpoint.

      - `origins: optional array of string`

  - `modified_at: string`

  - `name: string`

    Indicates the name of the Stream.

  - `version: number`

    Indicates the current version of this stream.

  - `worker_binding: object { enabled }`

    - `enabled: boolean`

      Indicates that the worker binding is enabled.

  - `endpoint: optional string`

    Indicates the endpoint URL of this stream.

  - `format: optional object { type, decimal_encoding, timestamp_format, unstructured }  or object { type, compression, row_group_bytes }`

    - `Json object { type, decimal_encoding, timestamp_format, unstructured }`

      - `type: "json"`

        - `"json"`

      - `decimal_encoding: optional "number" or "string" or "bytes"`

        - `"number"`

        - `"string"`

        - `"bytes"`

      - `timestamp_format: optional "rfc3339" or "unix_millis"`

        - `"rfc3339"`

        - `"unix_millis"`

      - `unstructured: optional boolean`

    - `Parquet object { type, compression, row_group_bytes }`

      - `type: "parquet"`

        - `"parquet"`

      - `compression: optional "uncompressed" or "snappy" or "gzip" or 2 more`

        - `"uncompressed"`

        - `"snappy"`

        - `"gzip"`

        - `"zstd"`

        - `"lz4"`

      - `row_group_bytes: optional number`

  - `schema: optional object { fields, format, inferred }`

    - `fields: optional array of object { type, metadata_key, name, 2 more }  or object { type, metadata_key, name, 2 more }  or object { type, metadata_key, name, 2 more }  or 8 more`

      - `Int32 object { type, metadata_key, name, 2 more }`

        - `type: "int32"`

          - `"int32"`

        - `metadata_key: optional string`

        - `name: optional string`

        - `required: optional boolean`

        - `sql_name: optional string`

      - `Int64 object { type, metadata_key, name, 2 more }`

        - `type: "int64"`

          - `"int64"`

        - `metadata_key: optional string`

        - `name: optional string`

        - `required: optional boolean`

        - `sql_name: optional string`

      - `Float32 object { type, metadata_key, name, 2 more }`

        - `type: "float32"`

          - `"float32"`

        - `metadata_key: optional string`

        - `name: optional string`

        - `required: optional boolean`

        - `sql_name: optional string`

      - `Float64 object { type, metadata_key, name, 2 more }`

        - `type: "float64"`

          - `"float64"`

        - `metadata_key: optional string`

        - `name: optional string`

        - `required: optional boolean`

        - `sql_name: optional string`

      - `Bool object { type, metadata_key, name, 2 more }`

        - `type: "bool"`

          - `"bool"`

        - `metadata_key: optional string`

        - `name: optional string`

        - `required: optional boolean`

        - `sql_name: optional string`

      - `String object { type, metadata_key, name, 2 more }`

        - `type: "string"`

          - `"string"`

        - `metadata_key: optional string`

        - `name: optional string`

        - `required: optional boolean`

        - `sql_name: optional string`

      - `Binary object { type, metadata_key, name, 2 more }`

        - `type: "binary"`

          - `"binary"`

        - `metadata_key: optional string`

        - `name: optional string`

        - `required: optional boolean`

        - `sql_name: optional string`

      - `Timestamp object { type, metadata_key, name, 3 more }`

        - `type: "timestamp"`

          - `"timestamp"`

        - `metadata_key: optional string`

        - `name: optional string`

        - `required: optional boolean`

        - `sql_name: optional string`

        - `unit: optional "second" or "millisecond" or "microsecond" or "nanosecond"`

          - `"second"`

          - `"millisecond"`

          - `"microsecond"`

          - `"nanosecond"`

      - `Json object { type, metadata_key, name, 2 more }`

        - `type: "json"`

          - `"json"`

        - `metadata_key: optional string`

        - `name: optional string`

        - `required: optional boolean`

        - `sql_name: optional string`

      - `Struct =`

      - `List =`

    - `format: optional object { type, decimal_encoding, timestamp_format, unstructured }  or object { type, compression, row_group_bytes }`

      - `Json object { type, decimal_encoding, timestamp_format, unstructured }`

        - `type: "json"`

          - `"json"`

        - `decimal_encoding: optional "number" or "string" or "bytes"`

          - `"number"`

          - `"string"`

          - `"bytes"`

        - `timestamp_format: optional "rfc3339" or "unix_millis"`

          - `"rfc3339"`

          - `"unix_millis"`

        - `unstructured: optional boolean`

      - `Parquet object { type, compression, row_group_bytes }`

        - `type: "parquet"`

          - `"parquet"`

        - `compression: optional "uncompressed" or "snappy" or "gzip" or 2 more`

          - `"uncompressed"`

          - `"snappy"`

          - `"gzip"`

          - `"zstd"`

          - `"lz4"`

        - `row_group_bytes: optional number`

    - `inferred: optional boolean`

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/streams/$STREAM_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "01234567890123457689012345678901",
    "created_at": "2019-12-27T18:11:19.117Z",
    "http": {
      "authentication": false,
      "enabled": true,
      "cors": {
        "origins": [
          "string"
        ]
      }
    },
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "my_stream",
    "version": 3,
    "worker_binding": {
      "enabled": true
    },
    "endpoint": "https://01234567890123457689012345678901.ingest.cloudflare.com/v1",
    "format": {
      "type": "json",
      "decimal_encoding": "number",
      "timestamp_format": "rfc3339",
      "unstructured": true
    },
    "schema": {
      "fields": [
        {
          "type": "int32",
          "metadata_key": "metadata_key",
          "name": "name",
          "required": true,
          "sql_name": "sql_name"
        }
      ],
      "format": {
        "type": "json",
        "decimal_encoding": "number",
        "timestamp_format": "rfc3339",
        "unstructured": true
      },
      "inferred": true
    }
  },
  "success": true
}
```
