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
