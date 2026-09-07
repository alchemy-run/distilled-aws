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
