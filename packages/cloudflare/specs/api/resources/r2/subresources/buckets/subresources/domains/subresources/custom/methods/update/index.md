## Configure Custom Domain Settings

**put** `/accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom/{domain}`

Edit the configuration for a custom domain on an existing R2 bucket.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

- `domain: string`

  Name of the custom domain.

### Header Parameters

- `"cf-r2-jurisdiction": optional "default" or "eu" or "fedramp"`

  Jurisdiction where objects in this bucket are guaranteed to be stored.

  - `"default"`

  - `"eu"`

  - `"fedramp"`

### Body Parameters

- `ciphers: optional array of string`

  An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

- `enabled: optional boolean`

  Whether to enable public bucket access at the specified custom domain.

- `minTLS: optional "1.0" or "1.1" or "1.2" or "1.3"`

  Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to previous value.

  - `"1.0"`

  - `"1.1"`

  - `"1.2"`

  - `"1.3"`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: object { domain, ciphers, enabled, minTLS }`

  - `domain: string`

    Domain name of the affected custom domain.

  - `ciphers: optional array of string`

    An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

  - `enabled: optional boolean`

    Whether this bucket is publicly accessible at the specified custom domain.

  - `minTLS: optional "1.0" or "1.1" or "1.2" or "1.3"`

    Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.

    - `"1.0"`

    - `"1.1"`

    - `"1.2"`

    - `"1.3"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/domains/custom/$DOMAIN \
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
    "domain": "example-domain.com",
    "ciphers": [
      "string"
    ],
    "enabled": true,
    "minTLS": "1.0"
  },
  "success": true
}
```
