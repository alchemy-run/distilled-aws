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
