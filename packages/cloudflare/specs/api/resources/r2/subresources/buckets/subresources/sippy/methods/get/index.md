## Get Sippy Configuration

**get** `/accounts/{account_id}/r2/buckets/{bucket_name}/sippy`

Gets configuration for Sippy for an existing R2 bucket.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

### Header Parameters

- `"cf-r2-jurisdiction": optional "default" or "eu" or "fedramp"`

  Jurisdiction where objects in this bucket are guaranteed to be stored.

  - `"default"`

  - `"eu"`

  - `"fedramp"`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: Sippy`

  - `destination: optional object { accessKeyId, account, bucket, provider }`

    Details about the configured destination bucket.

    - `accessKeyId: optional string`

      ID of the Cloudflare API token used when writing objects to this
      bucket.

    - `account: optional string`

    - `bucket: optional string`

      Name of the bucket on the provider.

    - `provider: optional Provider`

      - `"r2"`

  - `enabled: optional boolean`

    State of Sippy for this bucket.

  - `source: optional object { bucket, bucketUrl, provider, region }`

    Details about the configured source bucket.

    - `bucket: optional string`

      Name of the bucket on the provider (AWS, GCS only).

    - `bucketUrl: optional string`

      S3-compatible URL (Generic S3-compatible providers only).

    - `provider: optional "aws" or "gcs" or "s3"`

      - `"aws"`

      - `"gcs"`

      - `"s3"`

    - `region: optional string`

      Region where the bucket resides (AWS only).

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/sippy \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
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
    "destination": {
      "accessKeyId": "accessKeyId",
      "account": "account",
      "bucket": "bucket",
      "provider": "r2"
    },
    "enabled": true,
    "source": {
      "bucket": "bucket",
      "bucketUrl": "bucketUrl",
      "provider": "aws",
      "region": "region"
    }
  },
  "success": true
}
```
