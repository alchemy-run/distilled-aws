# Super Slurper

# Jobs

## List jobs

**get** `/accounts/{account_id}/slurper/jobs`

Lists all R2 Super Slurper migration jobs for the account with their status.

### Path Parameters

- `account_id: string`

### Query Parameters

- `limit: optional number`

- `offset: optional number`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional array of object { id, createdAt, finishedAt, 4 more }`

  - `id: optional string`

  - `createdAt: optional string`

  - `finishedAt: optional string`

  - `overwrite: optional boolean`

  - `source: optional object { bucket, endpoint, keys, 2 more }  or object { bucket, keys, pathPrefix, vendor }  or object { bucket, jurisdiction, keys, 2 more }`

    - `S3SourceResponseSchema object { bucket, endpoint, keys, 2 more }`

      - `bucket: optional string`

      - `endpoint: optional string`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional "s3"`

        - `"s3"`

    - `GcsSourceResponseSchema object { bucket, keys, pathPrefix, vendor }`

      - `bucket: optional string`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional "gcs"`

        - `"gcs"`

    - `R2SourceResponseSchema object { bucket, jurisdiction, keys, 2 more }`

      - `bucket: optional string`

      - `jurisdiction: optional "default" or "eu" or "fedramp"`

        - `"default"`

        - `"eu"`

        - `"fedramp"`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional Provider`

        - `"r2"`

  - `status: optional "running" or "paused" or "aborted" or "completed"`

    - `"running"`

    - `"paused"`

    - `"aborted"`

    - `"completed"`

  - `target: optional object { bucket, jurisdiction, vendor }`

    - `bucket: optional string`

    - `jurisdiction: optional "default" or "eu" or "fedramp"`

      - `"default"`

      - `"eu"`

      - `"fedramp"`

    - `vendor: optional Provider`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/jobs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": [
    {
      "id": "id",
      "createdAt": "createdAt",
      "finishedAt": "finishedAt",
      "overwrite": true,
      "source": {
        "bucket": "bucket",
        "endpoint": "https://example.com",
        "keys": [
          "string"
        ],
        "pathPrefix": "pathPrefix",
        "vendor": "s3"
      },
      "status": "running",
      "target": {
        "bucket": "bucket",
        "jurisdiction": "default",
        "vendor": "r2"
      }
    }
  ],
  "success": true
}
```

## Get job details

**get** `/accounts/{account_id}/slurper/jobs/{job_id}`

Retrieves detailed status and configuration for a specific R2 Super Slurper migration job.

### Path Parameters

- `account_id: string`

- `job_id: string`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional object { id, createdAt, finishedAt, 4 more }`

  - `id: optional string`

  - `createdAt: optional string`

  - `finishedAt: optional string`

  - `overwrite: optional boolean`

  - `source: optional object { bucket, endpoint, keys, 2 more }  or object { bucket, keys, pathPrefix, vendor }  or object { bucket, jurisdiction, keys, 2 more }`

    - `S3SourceResponseSchema object { bucket, endpoint, keys, 2 more }`

      - `bucket: optional string`

      - `endpoint: optional string`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional "s3"`

        - `"s3"`

    - `GcsSourceResponseSchema object { bucket, keys, pathPrefix, vendor }`

      - `bucket: optional string`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional "gcs"`

        - `"gcs"`

    - `R2SourceResponseSchema object { bucket, jurisdiction, keys, 2 more }`

      - `bucket: optional string`

      - `jurisdiction: optional "default" or "eu" or "fedramp"`

        - `"default"`

        - `"eu"`

        - `"fedramp"`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional Provider`

        - `"r2"`

  - `status: optional "running" or "paused" or "aborted" or "completed"`

    - `"running"`

    - `"paused"`

    - `"aborted"`

    - `"completed"`

  - `target: optional object { bucket, jurisdiction, vendor }`

    - `bucket: optional string`

    - `jurisdiction: optional "default" or "eu" or "fedramp"`

      - `"default"`

      - `"eu"`

      - `"fedramp"`

    - `vendor: optional Provider`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/jobs/$JOB_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "id": "id",
    "createdAt": "createdAt",
    "finishedAt": "finishedAt",
    "overwrite": true,
    "source": {
      "bucket": "bucket",
      "endpoint": "https://example.com",
      "keys": [
        "string"
      ],
      "pathPrefix": "pathPrefix",
      "vendor": "s3"
    },
    "status": "running",
    "target": {
      "bucket": "bucket",
      "jurisdiction": "default",
      "vendor": "r2"
    }
  },
  "success": true
}
```

## Create a job

**post** `/accounts/{account_id}/slurper/jobs`

Creates a new R2 Super Slurper migration job to transfer objects from a source bucket (e.g. S3, GCS, R2) to R2.

### Path Parameters

- `account_id: string`

### Body Parameters

- `overwrite: optional boolean`

- `source: optional object { bucket, secret, vendor, 4 more }  or object { bucket, secret, vendor, 2 more }  or object { bucket, secret, vendor, 3 more }`

  - `R2SlurperS3SourceSchema object { bucket, secret, vendor, 4 more }`

    - `bucket: string`

    - `secret: object { accessKeyId, secretAccessKey }`

      - `accessKeyId: string`

      - `secretAccessKey: string`

    - `vendor: "s3"`

      - `"s3"`

    - `endpoint: optional string`

      Custom S3-compatible endpoint that must use https://.

    - `keys: optional array of string`

    - `pathPrefix: optional string`

    - `region: optional string`

  - `R2SlurperGcsSourceSchema object { bucket, secret, vendor, 2 more }`

    - `bucket: string`

    - `secret: object { clientEmail, privateKey }`

      - `clientEmail: string`

      - `privateKey: string`

    - `vendor: "gcs"`

      - `"gcs"`

    - `keys: optional array of string`

    - `pathPrefix: optional string`

  - `R2SlurperR2SourceSchema object { bucket, secret, vendor, 3 more }`

    - `bucket: string`

    - `secret: object { accessKeyId, secretAccessKey }`

      - `accessKeyId: string`

      - `secretAccessKey: string`

    - `vendor: Provider`

      - `"r2"`

    - `jurisdiction: optional "default" or "eu" or "fedramp"`

      - `"default"`

      - `"eu"`

      - `"fedramp"`

    - `keys: optional array of string`

    - `pathPrefix: optional string`

- `target: optional object { bucket, secret, vendor, jurisdiction }`

  - `bucket: string`

  - `secret: object { accessKeyId, secretAccessKey }`

    - `accessKeyId: string`

    - `secretAccessKey: string`

  - `vendor: Provider`

  - `jurisdiction: optional "default" or "eu" or "fedramp"`

    - `"default"`

    - `"eu"`

    - `"fedramp"`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional object { id }`

  - `id: optional string`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/jobs \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "id": "id"
  },
  "success": true
}
```

## Abort all jobs

**put** `/accounts/{account_id}/slurper/jobs/abortAll`

Cancels all running R2 Super Slurper migration jobs for the account. Any objects in the middle of a transfer will finish, but no new objects will start transferring.

### Path Parameters

- `account_id: string`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional string`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/jobs/abortAll \
    -X PUT \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": "result",
  "success": true
}
```

## Abort a job

**put** `/accounts/{account_id}/slurper/jobs/{job_id}/abort`

Cancels a specific R2 Super Slurper migration job. Any objects in the middle of a transfer will finish, but no new objects will start transferring.

### Path Parameters

- `account_id: string`

- `job_id: string`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional string`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/jobs/$JOB_ID/abort \
    -X PUT \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": "result",
  "success": true
}
```

## Pause a job

**put** `/accounts/{account_id}/slurper/jobs/{job_id}/pause`

Pauses a running R2 Super Slurper migration job. The job can be resumed later to continue transferring.

### Path Parameters

- `account_id: string`

- `job_id: string`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional string`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/jobs/$JOB_ID/pause \
    -X PUT \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": "result",
  "success": true
}
```

## Get job progress

**get** `/accounts/{account_id}/slurper/jobs/{job_id}/progress`

Retrieves current progress metrics for an R2 Super Slurper migration job

### Path Parameters

- `account_id: string`

- `job_id: string`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional object { id, createdAt, failedObjects, 4 more }`

  - `id: optional string`

  - `createdAt: optional string`

  - `failedObjects: optional number`

  - `objects: optional number`

  - `skippedObjects: optional number`

  - `status: optional "running" or "paused" or "aborted" or "completed"`

    - `"running"`

    - `"paused"`

    - `"aborted"`

    - `"completed"`

  - `transferredObjects: optional number`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/jobs/$JOB_ID/progress \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "id": "id",
    "createdAt": "createdAt",
    "failedObjects": 0,
    "objects": 0,
    "skippedObjects": 0,
    "status": "running",
    "transferredObjects": 0
  },
  "success": true
}
```

## Resume a job

**put** `/accounts/{account_id}/slurper/jobs/{job_id}/resume`

Resumes a paused R2 Super Slurper migration job, continuing the transfer from where it stopped.

### Path Parameters

- `account_id: string`

- `job_id: string`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional string`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/jobs/$JOB_ID/resume \
    -X PUT \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": "result",
  "success": true
}
```

## Domain Types

### Job List Response

- `JobListResponse object { id, createdAt, finishedAt, 4 more }`

  - `id: optional string`

  - `createdAt: optional string`

  - `finishedAt: optional string`

  - `overwrite: optional boolean`

  - `source: optional object { bucket, endpoint, keys, 2 more }  or object { bucket, keys, pathPrefix, vendor }  or object { bucket, jurisdiction, keys, 2 more }`

    - `S3SourceResponseSchema object { bucket, endpoint, keys, 2 more }`

      - `bucket: optional string`

      - `endpoint: optional string`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional "s3"`

        - `"s3"`

    - `GcsSourceResponseSchema object { bucket, keys, pathPrefix, vendor }`

      - `bucket: optional string`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional "gcs"`

        - `"gcs"`

    - `R2SourceResponseSchema object { bucket, jurisdiction, keys, 2 more }`

      - `bucket: optional string`

      - `jurisdiction: optional "default" or "eu" or "fedramp"`

        - `"default"`

        - `"eu"`

        - `"fedramp"`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional Provider`

        - `"r2"`

  - `status: optional "running" or "paused" or "aborted" or "completed"`

    - `"running"`

    - `"paused"`

    - `"aborted"`

    - `"completed"`

  - `target: optional object { bucket, jurisdiction, vendor }`

    - `bucket: optional string`

    - `jurisdiction: optional "default" or "eu" or "fedramp"`

      - `"default"`

      - `"eu"`

      - `"fedramp"`

    - `vendor: optional Provider`

### Job Get Response

- `JobGetResponse object { id, createdAt, finishedAt, 4 more }`

  - `id: optional string`

  - `createdAt: optional string`

  - `finishedAt: optional string`

  - `overwrite: optional boolean`

  - `source: optional object { bucket, endpoint, keys, 2 more }  or object { bucket, keys, pathPrefix, vendor }  or object { bucket, jurisdiction, keys, 2 more }`

    - `S3SourceResponseSchema object { bucket, endpoint, keys, 2 more }`

      - `bucket: optional string`

      - `endpoint: optional string`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional "s3"`

        - `"s3"`

    - `GcsSourceResponseSchema object { bucket, keys, pathPrefix, vendor }`

      - `bucket: optional string`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional "gcs"`

        - `"gcs"`

    - `R2SourceResponseSchema object { bucket, jurisdiction, keys, 2 more }`

      - `bucket: optional string`

      - `jurisdiction: optional "default" or "eu" or "fedramp"`

        - `"default"`

        - `"eu"`

        - `"fedramp"`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional Provider`

        - `"r2"`

  - `status: optional "running" or "paused" or "aborted" or "completed"`

    - `"running"`

    - `"paused"`

    - `"aborted"`

    - `"completed"`

  - `target: optional object { bucket, jurisdiction, vendor }`

    - `bucket: optional string`

    - `jurisdiction: optional "default" or "eu" or "fedramp"`

      - `"default"`

      - `"eu"`

      - `"fedramp"`

    - `vendor: optional Provider`

### Job Create Response

- `JobCreateResponse object { id }`

  - `id: optional string`

### Job Abort All Response

- `JobAbortAllResponse = string`

### Job Abort Response

- `JobAbortResponse = string`

### Job Pause Response

- `JobPauseResponse = string`

### Job Progress Response

- `JobProgressResponse object { id, createdAt, failedObjects, 4 more }`

  - `id: optional string`

  - `createdAt: optional string`

  - `failedObjects: optional number`

  - `objects: optional number`

  - `skippedObjects: optional number`

  - `status: optional "running" or "paused" or "aborted" or "completed"`

    - `"running"`

    - `"paused"`

    - `"aborted"`

    - `"completed"`

  - `transferredObjects: optional number`

### Job Resume Response

- `JobResumeResponse = string`

# Logs

## Get job logs

**get** `/accounts/{account_id}/slurper/jobs/{job_id}/logs`

Gets log entries for an R2 Super Slurper migration job, showing migration status changes, errors, etc.

### Path Parameters

- `account_id: string`

- `job_id: string`

### Query Parameters

- `limit: optional number`

- `offset: optional number`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional array of object { createdAt, job, logType, 2 more }`

  - `createdAt: optional string`

  - `job: optional string`

  - `logType: optional "migrationStart" or "migrationComplete" or "migrationAbort" or 12 more`

    - `"migrationStart"`

    - `"migrationComplete"`

    - `"migrationAbort"`

    - `"migrationError"`

    - `"migrationPause"`

    - `"migrationResume"`

    - `"migrationErrorFailedContinuation"`

    - `"importErrorRetryExhaustion"`

    - `"importSkippedStorageClass"`

    - `"importSkippedOversized"`

    - `"importSkippedEmptyObject"`

    - `"importSkippedUnsupportedContentType"`

    - `"importSkippedExcludedContentType"`

    - `"importSkippedInvalidMedia"`

    - `"importSkippedRequiresRetrieval"`

  - `message: optional string`

  - `objectKey: optional string`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/jobs/$JOB_ID/logs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": [
    {
      "createdAt": "createdAt",
      "job": "job",
      "logType": "migrationStart",
      "message": "message",
      "objectKey": "objectKey"
    }
  ],
  "success": true
}
```

## Domain Types

### Log List Response

- `LogListResponse object { createdAt, job, logType, 2 more }`

  - `createdAt: optional string`

  - `job: optional string`

  - `logType: optional "migrationStart" or "migrationComplete" or "migrationAbort" or 12 more`

    - `"migrationStart"`

    - `"migrationComplete"`

    - `"migrationAbort"`

    - `"migrationError"`

    - `"migrationPause"`

    - `"migrationResume"`

    - `"migrationErrorFailedContinuation"`

    - `"importErrorRetryExhaustion"`

    - `"importSkippedStorageClass"`

    - `"importSkippedOversized"`

    - `"importSkippedEmptyObject"`

    - `"importSkippedUnsupportedContentType"`

    - `"importSkippedExcludedContentType"`

    - `"importSkippedInvalidMedia"`

    - `"importSkippedRequiresRetrieval"`

  - `message: optional string`

  - `objectKey: optional string`

# Connectivity Precheck

## Check source connectivity

**put** `/accounts/{account_id}/slurper/source/connectivity-precheck`

Check whether tokens are valid against the source bucket

### Path Parameters

- `account_id: string`

### Body Parameters

- `body: object { bucket, secret, vendor, 4 more }  or object { bucket, secret, vendor, 2 more }  or object { bucket, secret, vendor, 3 more }`

  - `R2SlurperS3SourceSchema object { bucket, secret, vendor, 4 more }`

    - `bucket: string`

    - `secret: object { accessKeyId, secretAccessKey }`

      - `accessKeyId: string`

      - `secretAccessKey: string`

    - `vendor: "s3"`

      - `"s3"`

    - `endpoint: optional string`

      Custom S3-compatible endpoint that must use https://.

    - `keys: optional array of string`

    - `pathPrefix: optional string`

    - `region: optional string`

  - `R2SlurperGcsSourceSchema object { bucket, secret, vendor, 2 more }`

    - `bucket: string`

    - `secret: object { clientEmail, privateKey }`

      - `clientEmail: string`

      - `privateKey: string`

    - `vendor: "gcs"`

      - `"gcs"`

    - `keys: optional array of string`

    - `pathPrefix: optional string`

  - `R2SlurperR2SourceSchema object { bucket, secret, vendor, 3 more }`

    - `bucket: string`

    - `secret: object { accessKeyId, secretAccessKey }`

      - `accessKeyId: string`

      - `secretAccessKey: string`

    - `vendor: Provider`

      - `"r2"`

    - `jurisdiction: optional "default" or "eu" or "fedramp"`

      - `"default"`

      - `"eu"`

      - `"fedramp"`

    - `keys: optional array of string`

    - `pathPrefix: optional string`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional object { connectivityStatus }`

  - `connectivityStatus: optional "success" or "error"`

    - `"success"`

    - `"error"`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/source/connectivity-precheck \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "bucket": "bucket",
          "secret": {
            "accessKeyId": "accessKeyId",
            "secretAccessKey": "secretAccessKey"
          },
          "vendor": "s3"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "connectivityStatus": "success"
  },
  "success": true
}
```

## Check target connectivity

**put** `/accounts/{account_id}/slurper/target/connectivity-precheck`

Check whether tokens are valid against the target bucket

### Path Parameters

- `account_id: string`

### Body Parameters

- `bucket: string`

- `secret: object { accessKeyId, secretAccessKey }`

  - `accessKeyId: string`

  - `secretAccessKey: string`

- `vendor: Provider`

  - `"r2"`

- `jurisdiction: optional "default" or "eu" or "fedramp"`

  - `"default"`

  - `"eu"`

  - `"fedramp"`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional object { connectivityStatus }`

  - `connectivityStatus: optional "success" or "error"`

    - `"success"`

    - `"error"`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/target/connectivity-precheck \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "bucket": "bucket",
          "secret": {
            "accessKeyId": "accessKeyId",
            "secretAccessKey": "secretAccessKey"
          },
          "vendor": "r2"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "connectivityStatus": "success"
  },
  "success": true
}
```

## Domain Types

### Connectivity Precheck Source Response

- `ConnectivityPrecheckSourceResponse object { connectivityStatus }`

  - `connectivityStatus: optional "success" or "error"`

    - `"success"`

    - `"error"`

### Connectivity Precheck Target Response

- `ConnectivityPrecheckTargetResponse object { connectivityStatus }`

  - `connectivityStatus: optional "success" or "error"`

    - `"success"`

    - `"error"`
