# Pipelines

## [DEPRECATED] List Pipelines

**get** `/accounts/{account_id}/pipelines`

[DEPRECATED] List, filter, and paginate pipelines in an account. Use the new /pipelines/v1/pipelines endpoint instead.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

### Query Parameters

- `page: optional string`

  Specifies which page to retrieve.

- `per_page: optional string`

  Specifies the number of pipelines per page.

- `search: optional string`

  Specifies the prefix of pipeline name to search.

### Returns

- `result_info: object { count, page, per_page, total_count }`

  - `count: number`

    Indicates the number of items on current page.

  - `page: number`

    Indicates the current page number.

  - `per_page: number`

    Indicates the number of items per page.

  - `total_count: number`

    Indicates the total number of items.

- `results: array of object { id, destination, endpoint, 3 more }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result_info": {
    "count": 1,
    "page": 0,
    "per_page": 10,
    "total_count": 1
  },
  "results": [
    {
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
    }
  ],
  "success": true
}
```

## [DEPRECATED] Get Pipeline

**get** `/accounts/{account_id}/pipelines/{pipeline_name}`

[DEPRECATED] Get configuration of a pipeline. Use the new /pipelines/v1/pipelines endpoint instead.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

- `pipeline_name: string`

  Defines the name of the pipeline.

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
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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

## [DEPRECATED] Create Pipeline

**post** `/accounts/{account_id}/pipelines`

[DEPRECATED] Create a new pipeline. Use the new /pipelines/v1/pipelines endpoint instead.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

### Body Parameters

- `destination: object { batch, compression, credentials, 3 more }`

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

  - `credentials: object { access_key_id, endpoint, secret_access_key }`

    - `access_key_id: string`

      Specifies the R2 Bucket Access Key Id.

    - `endpoint: string`

      Specifies the R2 Endpoint.

    - `secret_access_key: string`

      Specifies the R2 Bucket Secret Access Key.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "destination": {
            "batch": {},
            "compression": {},
            "credentials": {
              "access_key_id": "<access key id>",
              "endpoint": "https://123f8a8258064ed892a347f173372359.r2.cloudflarestorage.com",
              "secret_access_key": "<secret key>"
            },
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

## [DEPRECATED] Delete Pipeline

**delete** `/accounts/{account_id}/pipelines/{pipeline_name}`

[DEPRECATED] Delete a pipeline. Use the new /pipelines/v1/pipelines endpoint instead.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

- `pipeline_name: string`

  Defines the name of the pipeline.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/$PIPELINE_NAME \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## List Pipelines

**get** `/accounts/{account_id}/pipelines/v1/pipelines`

List/Filter Pipelines in Account.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

### Query Parameters

- `name: optional string`

  Filters pipelines by name (case-insensitive substring).

- `page: optional number`

- `per_page: optional number`

### Returns

- `result: array of object { id, created_at, modified_at, 3 more }`

  - `id: string`

    Indicates a unique identifier for this pipeline.

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

    Indicates the name of the Pipeline.

  - `sql: string`

    Specifies SQL for the Pipeline processing flow.

  - `status: string`

    Indicates the current status of the Pipeline.

- `result_info: object { count, page, per_page, total_count }`

  - `count: number`

    Indicates the number of items on current page.

  - `page: number`

    Indicates the current page number.

  - `per_page: number`

    Indicates the number of items per page.

  - `total_count: number`

    Indicates the total number of items.

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/pipelines \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "id": "01234567890123457689012345678901",
      "created_at": "created_at",
      "modified_at": "modified_at",
      "name": "my_pipeline",
      "sql": "insert into sink select * from source;",
      "status": "status"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 0,
    "per_page": 10,
    "total_count": 1
  },
  "success": true
}
```

## Get Pipeline Details

**get** `/accounts/{account_id}/pipelines/v1/pipelines/{pipeline_id}`

Get Pipelines Details.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

- `pipeline_id: string`

  Specifies the public ID of the pipeline.

### Returns

- `result: object { id, created_at, modified_at, 5 more }`

  - `id: string`

    Indicates a unique identifier for this pipeline.

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

    Indicates the name of the Pipeline.

  - `sql: string`

    Specifies SQL for the Pipeline processing flow.

  - `status: string`

    Indicates the current status of the Pipeline.

  - `tables: array of object { id, latest, name, 2 more }`

    List of streams and sinks used by this pipeline.

    - `id: string`

      Unique identifier for the connection (stream or sink).

    - `latest: number`

      Latest available version of the connection.

    - `name: string`

      Name of the connection.

    - `type: "stream" or "sink"`

      Type of the connection.

      - `"stream"`

      - `"sink"`

    - `version: number`

      Current version of the connection used by this pipeline.

  - `failure_reason: optional string`

    Indicates the reason for the failure of the Pipeline.

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/pipelines/$PIPELINE_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "01234567890123457689012345678901",
    "created_at": "created_at",
    "modified_at": "modified_at",
    "name": "my_pipeline",
    "sql": "insert into sink select * from source;",
    "status": "status",
    "tables": [
      {
        "id": "1c9200d5872c018bb34e93e2cd8a438e",
        "latest": 5,
        "name": "my_table",
        "type": "stream",
        "version": 4
      }
    ],
    "failure_reason": "failure_reason"
  },
  "success": true
}
```

## Create Pipeline

**post** `/accounts/{account_id}/pipelines/v1/pipelines`

Create a new Pipeline.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

### Body Parameters

- `name: string`

  Specifies the name of the Pipeline.

- `sql: string`

  Specifies SQL for the Pipeline processing flow.

### Returns

- `result: object { id, created_at, modified_at, 3 more }`

  - `id: string`

    Indicates a unique identifier for this pipeline.

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

    Indicates the name of the Pipeline.

  - `sql: string`

    Specifies SQL for the Pipeline processing flow.

  - `status: string`

    Indicates the current status of the Pipeline.

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/pipelines \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "my_pipeline",
          "sql": "insert into sink select * from source;"
        }'
```

#### Response

```json
{
  "result": {
    "id": "01234567890123457689012345678901",
    "created_at": "created_at",
    "modified_at": "modified_at",
    "name": "my_pipeline",
    "sql": "insert into sink select * from source;",
    "status": "status"
  },
  "success": true
}
```

## Delete Pipelines

**delete** `/accounts/{account_id}/pipelines/v1/pipelines/{pipeline_id}`

Delete Pipeline in Account.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

- `pipeline_id: string`

  Specifies the public ID of the pipeline.

### Returns

- `result: unknown`

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/pipelines/$PIPELINE_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {},
  "success": true
}
```

## Validate SQL

**post** `/accounts/{account_id}/pipelines/v1/validate_sql`

Validate Arroyo SQL.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

### Body Parameters

- `sql: string`

  Specifies SQL to validate.

### Returns

- `result: object { tables, graph }`

  - `tables: map[object { id, name, type, version } ]`

    Indicates tables involved in the processing.

    - `id: string`

    - `name: string`

    - `type: string`

    - `version: number`

  - `graph: optional object { edges, nodes }`

    - `edges: array of object { dest_id, edge_type, key_type, 2 more }`

      - `dest_id: number`

      - `edge_type: string`

      - `key_type: string`

      - `src_id: number`

      - `value_type: string`

    - `nodes: array of object { description, node_id, operator, parallelism }`

      - `description: string`

      - `node_id: number`

      - `operator: string`

      - `parallelism: number`

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/validate_sql \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "sql": "insert into sink select * from source;"
        }'
```

#### Response

```json
{
  "result": {
    "tables": {
      "foo": {
        "id": "id",
        "name": "name",
        "type": "type",
        "version": 0
      }
    },
    "graph": {
      "edges": [
        {
          "dest_id": 0,
          "edge_type": "edge_type",
          "key_type": "key_type",
          "src_id": 0,
          "value_type": "value_type"
        }
      ],
      "nodes": [
        {
          "description": "description",
          "node_id": 0,
          "operator": "operator",
          "parallelism": 0
        }
      ]
    }
  },
  "success": true
}
```

## Domain Types

### Pipeline List Response

- `PipelineListResponse object { result_info, results, success }`

  - `result_info: object { count, page, per_page, total_count }`

    - `count: number`

      Indicates the number of items on current page.

    - `page: number`

      Indicates the current page number.

    - `per_page: number`

      Indicates the number of items per page.

    - `total_count: number`

      Indicates the total number of items.

  - `results: array of object { id, destination, endpoint, 3 more }`

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

### Pipeline Get Response

- `PipelineGetResponse object { id, destination, endpoint, 3 more }`

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

### Pipeline Create Response

- `PipelineCreateResponse object { id, destination, endpoint, 3 more }`

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

### Pipeline Update Response

- `PipelineUpdateResponse object { id, destination, endpoint, 3 more }`

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

### Pipeline List V1 Response

- `PipelineListV1Response object { id, created_at, modified_at, 3 more }`

  - `id: string`

    Indicates a unique identifier for this pipeline.

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

    Indicates the name of the Pipeline.

  - `sql: string`

    Specifies SQL for the Pipeline processing flow.

  - `status: string`

    Indicates the current status of the Pipeline.

### Pipeline Get V1 Response

- `PipelineGetV1Response object { id, created_at, modified_at, 5 more }`

  - `id: string`

    Indicates a unique identifier for this pipeline.

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

    Indicates the name of the Pipeline.

  - `sql: string`

    Specifies SQL for the Pipeline processing flow.

  - `status: string`

    Indicates the current status of the Pipeline.

  - `tables: array of object { id, latest, name, 2 more }`

    List of streams and sinks used by this pipeline.

    - `id: string`

      Unique identifier for the connection (stream or sink).

    - `latest: number`

      Latest available version of the connection.

    - `name: string`

      Name of the connection.

    - `type: "stream" or "sink"`

      Type of the connection.

      - `"stream"`

      - `"sink"`

    - `version: number`

      Current version of the connection used by this pipeline.

  - `failure_reason: optional string`

    Indicates the reason for the failure of the Pipeline.

### Pipeline Create V1 Response

- `PipelineCreateV1Response object { id, created_at, modified_at, 3 more }`

  - `id: string`

    Indicates a unique identifier for this pipeline.

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

    Indicates the name of the Pipeline.

  - `sql: string`

    Specifies SQL for the Pipeline processing flow.

  - `status: string`

    Indicates the current status of the Pipeline.

### Pipeline Delete V1 Response

- `PipelineDeleteV1Response = unknown`

### Pipeline Validate Sql Response

- `PipelineValidateSqlResponse object { tables, graph }`

  - `tables: map[object { id, name, type, version } ]`

    Indicates tables involved in the processing.

    - `id: string`

    - `name: string`

    - `type: string`

    - `version: number`

  - `graph: optional object { edges, nodes }`

    - `edges: array of object { dest_id, edge_type, key_type, 2 more }`

      - `dest_id: number`

      - `edge_type: string`

      - `key_type: string`

      - `src_id: number`

      - `value_type: string`

    - `nodes: array of object { description, node_id, operator, parallelism }`

      - `description: string`

      - `node_id: number`

      - `operator: string`

      - `parallelism: number`

# Sinks

## List Sinks

**get** `/accounts/{account_id}/pipelines/v1/sinks`

List/Filter Sinks in Account.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

### Query Parameters

- `name: optional string`

  Filters sinks by name (case-insensitive substring).

- `page: optional number`

- `per_page: optional number`

- `pipeline_id: optional string`

### Returns

- `result: array of object { id, created_at, modified_at, 5 more }`

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

- `result_info: object { count, page, per_page, total_count }`

  - `count: number`

    Indicates the number of items on current page.

  - `page: number`

    Indicates the current page number.

  - `per_page: number`

    Indicates the number of items per page.

  - `total_count: number`

    Indicates the total number of items.

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/sinks \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
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
    }
  ],
  "result_info": {
    "count": 1,
    "page": 0,
    "per_page": 10,
    "total_count": 1
  },
  "success": true
}
```

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

## Create Sink

**post** `/accounts/{account_id}/pipelines/v1/sinks`

Create a new Sink.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

### Body Parameters

- `name: string`

  Defines the name of the Sink.

- `type: "r2" or "r2_data_catalog"`

  Specifies the type of sink.

  - `"r2"`

  - `"r2_data_catalog"`

- `config: optional object { account_id, bucket, credentials, 5 more }  or object { token, account_id, bucket, 3 more }`

  Defines the configuration of the R2 Sink.

  - `CloudflarePipelinesR2Table object { account_id, bucket, credentials, 5 more }`

    - `account_id: string`

      Cloudflare Account ID for the bucket

    - `bucket: string`

      R2 Bucket to write to

    - `credentials: object { access_key_id, secret_access_key }`

      - `access_key_id: string`

        Cloudflare Account ID for the bucket

      - `secret_access_key: string`

        Cloudflare Account ID for the bucket

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

  - `CloudflarePipelinesR2DataCatalogTable object { token, account_id, bucket, 3 more }`

    R2 Data Catalog Sink

    - `token: string`

      Authentication token

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

  - `config: optional object { account_id, bucket, credentials, 5 more }  or object { token, account_id, bucket, 3 more }`

    R2 Data Catalog Sink

    - `CloudflarePipelinesR2Table object { account_id, bucket, credentials, 5 more }`

      - `account_id: string`

        Cloudflare Account ID for the bucket

      - `bucket: string`

        R2 Bucket to write to

      - `credentials: object { access_key_id, secret_access_key }`

        - `access_key_id: string`

          Cloudflare Account ID for the bucket

        - `secret_access_key: string`

          Cloudflare Account ID for the bucket

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

    - `CloudflarePipelinesR2DataCatalogTable object { token, account_id, bucket, 3 more }`

      R2 Data Catalog Sink

      - `token: string`

        Authentication token

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/sinks \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "my_sink",
          "type": "r2"
        }'
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
      "credentials": {
        "access_key_id": "access_key_id",
        "secret_access_key": "secret_access_key"
      },
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

## Delete Sink

**delete** `/accounts/{account_id}/pipelines/v1/sinks/{sink_id}`

Delete Pipeline in Account.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

- `sink_id: string`

  Specifies the publid ID of the sink.

### Query Parameters

- `force: optional string`

  Deprecated: Delete sink forcefully, including deleting any dependent pipelines.

### Returns

- `result: unknown`

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/sinks/$SINK_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {},
  "success": true
}
```

## Domain Types

### Sink List Response

- `SinkListResponse object { id, created_at, modified_at, 5 more }`

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

### Sink Get Response

- `SinkGetResponse object { id, created_at, modified_at, 5 more }`

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

### Sink Create Response

- `SinkCreateResponse object { id, created_at, modified_at, 5 more }`

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

  - `config: optional object { account_id, bucket, credentials, 5 more }  or object { token, account_id, bucket, 3 more }`

    R2 Data Catalog Sink

    - `CloudflarePipelinesR2Table object { account_id, bucket, credentials, 5 more }`

      - `account_id: string`

        Cloudflare Account ID for the bucket

      - `bucket: string`

        R2 Bucket to write to

      - `credentials: object { access_key_id, secret_access_key }`

        - `access_key_id: string`

          Cloudflare Account ID for the bucket

        - `secret_access_key: string`

          Cloudflare Account ID for the bucket

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

    - `CloudflarePipelinesR2DataCatalogTable object { token, account_id, bucket, 3 more }`

      R2 Data Catalog Sink

      - `token: string`

        Authentication token

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

### Sink Delete Response

- `SinkDeleteResponse = unknown`

# Streams

## List Streams

**get** `/accounts/{account_id}/pipelines/v1/streams`

List/Filter Streams in Account.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

### Query Parameters

- `name: optional string`

  Filters streams by name (case-insensitive substring).

- `page: optional number`

- `per_page: optional number`

- `pipeline_id: optional string`

  Specifies the public ID of the pipeline.

### Returns

- `result: array of object { id, created_at, http, 7 more }`

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

- `result_info: object { count, page, per_page, total_count }`

  - `count: number`

    Indicates the number of items on current page.

  - `page: number`

    Indicates the current page number.

  - `per_page: number`

    Indicates the number of items per page.

  - `total_count: number`

    Indicates the total number of items.

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/streams \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
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
    }
  ],
  "result_info": {
    "count": 1,
    "page": 0,
    "per_page": 10,
    "total_count": 1
  },
  "success": true
}
```

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

## Create Stream

**post** `/accounts/{account_id}/pipelines/v1/streams`

Create a new Stream.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

### Body Parameters

- `name: string`

  Specifies the name of the Stream.

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

- `http: optional object { authentication, enabled, cors }`

  - `authentication: boolean`

    Indicates that authentication is required for the HTTP endpoint.

  - `enabled: boolean`

    Indicates that the HTTP endpoint is enabled.

  - `cors: optional object { origins }`

    Specifies the CORS options for the HTTP endpoint.

    - `origins: optional array of string`

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

- `worker_binding: optional object { enabled }`

  - `enabled: boolean`

    Indicates that the worker binding is enabled.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/streams \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "my_stream"
        }'
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

## Delete Stream

**delete** `/accounts/{account_id}/pipelines/v1/streams/{stream_id}`

Delete Stream in Account.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

- `stream_id: string`

  Specifies the public ID of the stream.

### Query Parameters

- `force: optional string`

  Deprecated: Delete stream forcefully, including deleting any dependent pipelines.

### Returns

- `result: unknown`

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/streams/$STREAM_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {},
  "success": true
}
```

## Domain Types

### Stream List Response

- `StreamListResponse object { id, created_at, http, 7 more }`

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

### Stream Get Response

- `StreamGetResponse object { id, created_at, http, 7 more }`

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

### Stream Create Response

- `StreamCreateResponse object { id, created_at, http, 7 more }`

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

### Stream Update Response

- `StreamUpdateResponse object { id, created_at, http, 6 more }`

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

### Stream Delete Response

- `StreamDeleteResponse = unknown`
