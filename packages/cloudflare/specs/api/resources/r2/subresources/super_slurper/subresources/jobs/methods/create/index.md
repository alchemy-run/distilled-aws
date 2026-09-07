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
