## Enable Sippy

**put** `/accounts/{account_id}/r2/buckets/{bucket_name}/sippy`

Sets configuration for Sippy for an existing R2 bucket.

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

### Body Parameters

- `body: object { destination, source }  or object { destination, source }  or object { destination, source }`

  - `R2EnableSippyAws object { destination, source }`

    - `destination: optional object { accessKeyId, provider, secretAccessKey }`

      R2 bucket to copy objects to.

      - `accessKeyId: optional string`

        ID of a Cloudflare API token.
        This is the value labelled "Access Key ID" when creating an API.
        token from the [R2 dashboard](https://dash.cloudflare.com/?to=/:account/r2/api-tokens).

        Sippy will use this token when writing objects to R2, so it is
        best to scope this token to the bucket you're enabling Sippy for.

      - `provider: optional Provider`

        - `"r2"`

      - `secretAccessKey: optional string`

        Value of a Cloudflare API token.
        This is the value labelled "Secret Access Key" when creating an API.
        token from the [R2 dashboard](https://dash.cloudflare.com/?to=/:account/r2/api-tokens).

        Sippy will use this token when writing objects to R2, so it is
        best to scope this token to the bucket you're enabling Sippy for.

    - `source: optional object { accessKeyId, bucket, provider, 2 more }`

      AWS S3 bucket to copy objects from.

      - `accessKeyId: optional string`

        Access Key ID of an IAM credential (ideally scoped to a single S3 bucket).

      - `bucket: optional string`

        Name of the AWS S3 bucket.

      - `provider: optional "aws"`

        - `"aws"`

      - `region: optional string`

        Name of the AWS availability zone.

      - `secretAccessKey: optional string`

        Secret Access Key of an IAM credential (ideally scoped to a single S3 bucket).

  - `R2EnableSippyGcs object { destination, source }`

    - `destination: optional object { accessKeyId, provider, secretAccessKey }`

      R2 bucket to copy objects to.

      - `accessKeyId: optional string`

        ID of a Cloudflare API token.
        This is the value labelled "Access Key ID" when creating an API.
        token from the [R2 dashboard](https://dash.cloudflare.com/?to=/:account/r2/api-tokens).

        Sippy will use this token when writing objects to R2, so it is
        best to scope this token to the bucket you're enabling Sippy for.

      - `provider: optional Provider`

      - `secretAccessKey: optional string`

        Value of a Cloudflare API token.
        This is the value labelled "Secret Access Key" when creating an API.
        token from the [R2 dashboard](https://dash.cloudflare.com/?to=/:account/r2/api-tokens).

        Sippy will use this token when writing objects to R2, so it is
        best to scope this token to the bucket you're enabling Sippy for.

    - `source: optional object { bucket, clientEmail, privateKey, provider }`

      GCS bucket to copy objects from.

      - `bucket: optional string`

        Name of the GCS bucket.

      - `clientEmail: optional string`

        Client email of an IAM credential (ideally scoped to a single GCS bucket).

      - `privateKey: optional string`

        Private Key of an IAM credential (ideally scoped to a single GCS bucket).

      - `provider: optional "gcs"`

        - `"gcs"`

  - `R2EnableSippyS3 object { destination, source }`

    - `destination: optional object { accessKeyId, provider, secretAccessKey }`

      R2 bucket to copy objects to.

      - `accessKeyId: optional string`

        ID of a Cloudflare API token.
        This is the value labelled "Access Key ID" when creating an API.
        token from the [R2 dashboard](https://dash.cloudflare.com/?to=/:account/r2/api-tokens).

        Sippy will use this token when writing objects to R2, so it is
        best to scope this token to the bucket you're enabling Sippy for.

      - `provider: optional Provider`

      - `secretAccessKey: optional string`

        Value of a Cloudflare API token.
        This is the value labelled "Secret Access Key" when creating an API.
        token from the [R2 dashboard](https://dash.cloudflare.com/?to=/:account/r2/api-tokens).

        Sippy will use this token when writing objects to R2, so it is
        best to scope this token to the bucket you're enabling Sippy for.

    - `source: optional object { accessKeyId, bucketUrl, provider, secretAccessKey }`

      General S3-compatible provider to copy objects from.

      - `accessKeyId: optional string`

        Access Key ID of an IAM credential (ideally scoped to a single S3 bucket).

      - `bucketUrl: optional string`

        URL to the S3-compatible API of the bucket.

      - `provider: optional "s3"`

        - `"s3"`

      - `secretAccessKey: optional string`

        Secret Access Key of an IAM credential (ideally scoped to a single S3 bucket).

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
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
