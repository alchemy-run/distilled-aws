## Update Stream

**patch** `/accounts/{account_id}/pipelines/v1/streams/{stream_id}`

Update a Stream.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

- `stream_id: string`

  Specifies the public ID of the stream.

### Body Parameters

- `http: optional object { authentication, enabled, cors }`

  - `authentication: boolean`

    Indicates that authentication is required for the HTTP endpoint.

  - `enabled: boolean`

    Indicates that the HTTP endpoint is enabled.

  - `cors: optional object { origins }`

    Specifies the CORS options for the HTTP endpoint.

    - `origins: optional array of string`

- `worker_binding: optional object { enabled }`

  - `enabled: boolean`

    Indicates that the worker binding is enabled.

### Returns

- `result: object { id, created_at, http, 6 more }`

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

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/streams/$STREAM_ID \
    -X PATCH \
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
    }
  },
  "success": true
}
```
