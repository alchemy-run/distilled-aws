## [DEPRECATED] Update Pipeline

**put** `/accounts/{account_id}/pipelines/{pipeline_name}`

[DEPRECATED] Update an existing pipeline. Use the new /pipelines/v1/pipelines endpoint instead.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

- `pipeline_name: string`

  Defines the name of the pipeline.

### Body Parameters

- `destination: object { batch, compression, format, 3 more }`

  - `batch: object { max_bytes, max_duration_s, max_rows }`

    - `max_bytes: optional number`

      Specifies rough maximum size of files.

    - `max_duration_s: optional number`

      Specifies duration to wait to aggregate batches files.

    - `max_rows: optional number`

      Specifies rough maximum number of rows per file.

  - `compression: object { type }`

    - `type: optional "none" or "gzip" or "deflate"`

      Specifies the desired compression algorithm and format.

      - `"none"`

      - `"gzip"`

      - `"deflate"`

  - `format: "json"`

    Specifies the format of data to deliver.

    - `"json"`

  - `path: object { bucket, filename, filepath, prefix }`

    - `bucket: string`

      Specifies the R2 Bucket to store files.

    - `filename: optional string`

      Specifies the name pattern to for individual data files.

    - `filepath: optional string`

      Specifies the name pattern for directory.

    - `prefix: optional string`

      Specifies the base directory within the bucket.

  - `type: "r2"`

    Specifies the type of destination.

    - `"r2"`

  - `credentials: optional object { access_key_id, endpoint, secret_access_key }`

    - `access_key_id: string`

      Specifies the R2 Bucket Access Key Id.

    - `endpoint: string`

      Specifies the R2 Endpoint.

    - `secret_access_key: string`

      Specifies the R2 Bucket Secret Access Key.

- `name: string`

  Defines the name of the pipeline.

- `source: array of object { format, type, authentication, cors }  or object { format, type }`

  - `CloudflarePipelinesWorkersPipelinesHTTPSource object { format, type, authentication, cors }`

    [DEPRECATED] HTTP source configuration. Use the new streams API instead.

    - `format: "json"`

      Specifies the format of source data.

      - `"json"`

    - `type: string`

    - `authentication: optional boolean`

      Specifies whether authentication is required to send to this pipeline via HTTP.

    - `cors: optional object { origins }`

      - `origins: optional array of string`

        Specifies allowed origins to allow Cross Origin HTTP Requests.

  - `CloudflarePipelinesWorkersPipelinesBindingSource object { format, type }`

    [DEPRECATED] Worker binding source configuration. Use the new streams API instead.

    - `format: "json"`

      Specifies the format of source data.

      - `"json"`

    - `type: string`

### Returns

- `result: object { id, destination, endpoint, 3 more }`

  [DEPRECATED] Describes the configuration of a pipeline. Use the new streams/sinks/pipelines API instead.

  - `id: string`

    Specifies the pipeline identifier.

  - `destination: object { batch, compression, format, 2 more }`

    - `batch: object { max_bytes, max_duration_s, max_rows }`

      - `max_bytes: number`

        Specifies rough maximum size of files.

      - `max_duration_s: number`

        Specifies duration to wait to aggregate batches files.

      - `max_rows: number`

        Specifies rough maximum number of rows per file.

    - `compression: object { type }`

      - `type: "none" or "gzip" or "deflate"`

        Specifies the desired compression algorithm and format.

        - `"none"`

        - `"gzip"`

        - `"deflate"`

    - `format: "json"`

      Specifies the format of data to deliver.

      - `"json"`

    - `path: object { bucket, filename, filepath, prefix }`

      - `bucket: string`

        Specifies the R2 Bucket to store files.

      - `filename: optional string`

        Specifies the name pattern to for individual data files.

      - `filepath: optional string`

        Specifies the name pattern for directory.

      - `prefix: optional string`

        Specifies the base directory within the bucket.

    - `type: "r2"`

      Specifies the type of destination.

      - `"r2"`

  - `endpoint: string`

    Indicates the endpoint URL to send traffic.

  - `name: string`

    Defines the name of the pipeline.

  - `source: array of object { format, type, authentication, cors }  or object { format, type }`

    - `CloudflarePipelinesWorkersPipelinesHTTPSource object { format, type, authentication, cors }`

      [DEPRECATED] HTTP source configuration. Use the new streams API instead.

      - `format: "json"`

        Specifies the format of source data.

        - `"json"`

      - `type: string`

      - `authentication: optional boolean`

        Specifies whether authentication is required to send to this pipeline via HTTP.

      - `cors: optional object { origins }`

        - `origins: optional array of string`

          Specifies allowed origins to allow Cross Origin HTTP Requests.

    - `CloudflarePipelinesWorkersPipelinesBindingSource object { format, type }`

      [DEPRECATED] Worker binding source configuration. Use the new streams API instead.

      - `format: "json"`

        Specifies the format of source data.

        - `"json"`

      - `type: string`

  - `version: number`

    Indicates the version number of last saved configuration.

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/$PIPELINE_NAME \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "destination": {
            "batch": {},
            "compression": {},
            "format": "json",
            "path": {
              "bucket": "bucket",
              "prefix": "base"
            },
            "type": "r2"
          },
          "name": "sample_pipeline",
          "source": [
            {
              "format": "json",
              "type": "type"
            }
          ]
        }'
```

#### Response

```json
{
  "result": {
    "id": "123f8a8258064ed892a347f173372359",
    "destination": {
      "batch": {
        "max_bytes": 1000,
        "max_duration_s": 0.25,
        "max_rows": 100
      },
      "compression": {
        "type": "gzip"
      },
      "format": "json",
      "path": {
        "bucket": "bucket",
        "filename": "${slug}${extension}",
        "filepath": "${date}/${hour}",
        "prefix": "base"
      },
      "type": "r2"
    },
    "endpoint": "https://123f8a8258064ed892a347f173372359.pipelines.cloudflare.com",
    "name": "sample_pipeline",
    "source": [
      {
        "format": "json",
        "type": "type",
        "authentication": true,
        "cors": {
          "origins": [
            "*"
          ]
        }
      }
    ],
    "version": 2
  },
  "success": true
}
```
