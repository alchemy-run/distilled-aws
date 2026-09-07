# Managed

## Get r2.dev Domain of Bucket

**get** `/accounts/{account_id}/r2/buckets/{bucket_name}/domains/managed`

Gets state of public access over the bucket's R2-managed (r2.dev) domain.

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

- `result: object { bucketId, domain, enabled }`

  - `bucketId: string`

    Bucket ID.

  - `domain: string`

    Domain name of the bucket's r2.dev domain.

  - `enabled: boolean`

    Whether this bucket is publicly accessible at the r2.dev domain.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/domains/managed \
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
    "bucketId": "0113a9e4549cf9b1ff1bf56e04da0cef",
    "domain": "pub-0113a9e4549cf9b1ff1bf56e04da0cef.r2.dev",
    "enabled": true
  },
  "success": true
}
```

## Update r2.dev Domain of Bucket

**put** `/accounts/{account_id}/r2/buckets/{bucket_name}/domains/managed`

Updates state of public access over the bucket's R2-managed (r2.dev) domain.

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

- `enabled: boolean`

  Whether to enable public bucket access at the r2.dev domain.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: object { bucketId, domain, enabled }`

  - `bucketId: string`

    Bucket ID.

  - `domain: string`

    Domain name of the bucket's r2.dev domain.

  - `enabled: boolean`

    Whether this bucket is publicly accessible at the r2.dev domain.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/domains/managed \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true
        }'
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
    "bucketId": "0113a9e4549cf9b1ff1bf56e04da0cef",
    "domain": "pub-0113a9e4549cf9b1ff1bf56e04da0cef.r2.dev",
    "enabled": true
  },
  "success": true
}
```

## Domain Types

### Managed List Response

- `ManagedListResponse object { bucketId, domain, enabled }`

  - `bucketId: string`

    Bucket ID.

  - `domain: string`

    Domain name of the bucket's r2.dev domain.

  - `enabled: boolean`

    Whether this bucket is publicly accessible at the r2.dev domain.

### Managed Update Response

- `ManagedUpdateResponse object { bucketId, domain, enabled }`

  - `bucketId: string`

    Bucket ID.

  - `domain: string`

    Domain name of the bucket's r2.dev domain.

  - `enabled: boolean`

    Whether this bucket is publicly accessible at the r2.dev domain.
