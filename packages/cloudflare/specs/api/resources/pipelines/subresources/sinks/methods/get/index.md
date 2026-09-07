## Get Sink Details

**get** `/accounts/{account_id}/pipelines/v1/sinks/{sink_id}`

Get Sink Details.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

- `sink_id: string`

  Specifies the publid ID of the sink.

### Returns

- `result: object { id, created_at, modified_at, 5 more }`

  - `id: string`

    Indicates a unique identifier for this sink.

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

    Defines the name of the Sink.

  - `type: "r2" or "r2_data_catalog"`

    Specifies the type of sink.

    - `"r2"`

    - `"r2_data_catalog"`

  - `config: optional object { account_id, bucket, file_naming, 4 more }  or object { account_id, bucket, table_name, 2 more }`

    Defines the configuration of the R2 Sink.

    - `CloudflarePipelinesR2TablePublic object { account_id, bucket, file_naming, 4 more }`

      R2 Sink public configuration.

      - `account_id: string`

        Cloudflare Account ID for the bucket

      - `bucket: string`

        R2 Bucket to write to

      - `file_naming: optional object { prefix, strategy, suffix }`

        Controls filename prefix/suffix and strategy.

        - `prefix: optional string`

          The prefix to use in file name. i.e prefix-<uuid>.parquet

        - `strategy: optional "serial" or "uuid" or "uuid_v7" or "ulid"`

          Filename generation strategy.

          - `"serial"`

          - `"uuid"`

          - `"uuid_v7"`

          - `"ulid"`

        - `suffix: optional string`

          This will overwrite the default file suffix. i.e .parquet, use with caution

      - `jurisdiction: optional string`

        Jurisdiction this bucket is hosted in

      - `partitioning: optional object { time_pattern }`

        Data-layout partitioning for sinks.

        - `time_pattern: optional string`

          The pattern of the date string

      - `path: optional string`

        Subpath within the bucket to write to

      - `rolling_policy: optional object { file_size_bytes, inactivity_seconds, interval_seconds }`

        Rolling policy for file sinks (when & why to close a file and open a new one).

        - `file_size_bytes: optional number`

          Files will be rolled after reaching this number of bytes

        - `inactivity_seconds: optional number`

          Number of seconds of inactivity to wait before rolling over to a new file

        - `interval_seconds: optional number`

          Number of seconds to wait before rolling over to a new file

    - `CloudflarePipelinesR2DataCatalogTablePublic object { account_id, bucket, table_name, 2 more }`

      R2 Data Catalog Sink public configuration.

      - `account_id: string`

        Cloudflare Account ID

      - `bucket: string`

        The R2 Bucket that hosts this catalog

      - `table_name: string`

        Table name

      - `namespace: optional string`

        Table namespace

      - `rolling_policy: optional object { file_size_bytes, inactivity_seconds, interval_seconds }`

        Rolling policy for file sinks (when & why to close a file and open a new one).

        - `file_size_bytes: optional number`

          Files will be rolled after reaching this number of bytes

        - `inactivity_seconds: optional number`

          Number of seconds of inactivity to wait before rolling over to a new file

        - `interval_seconds: optional number`

          Number of seconds to wait before rolling over to a new file

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/sinks/$SINK_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "01234567890123457689012345678901",
    "created_at": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "my_sink",
    "type": "r2",
    "config": {
      "account_id": "account_id",
      "bucket": "bucket",
      "file_naming": {
        "prefix": "prefix",
        "strategy": "serial",
        "suffix": "suffix"
      },
      "jurisdiction": "jurisdiction",
      "partitioning": {
        "time_pattern": "year=%Y/month=%m/day=%d/hour=%H"
      },
      "path": "path",
      "rolling_policy": {
        "file_size_bytes": 0,
        "inactivity_seconds": 1,
        "interval_seconds": 1
      }
    },
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
