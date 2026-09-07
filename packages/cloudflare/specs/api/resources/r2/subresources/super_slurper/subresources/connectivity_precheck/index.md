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
