## Attach Custom Domain To Bucket

**post** `/accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom`

Register a new custom domain for an existing R2 bucket.

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

- `domain: string`

  Name of the custom domain to be added.

- `enabled: boolean`

  Whether to enable public bucket access at the custom domain. If undefined, the domain will be enabled.

- `zoneId: string`

  Zone ID of the custom domain.

- `ciphers: optional array of string`

  An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

- `minTLS: optional "1.0" or "1.1" or "1.2" or "1.3"`

  Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.

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

- `result: object { domain, enabled, zoneId, 2 more }`

  - `domain: string`

    Domain name of the affected custom domain.

  - `enabled: boolean`

    Whether this bucket is publicly accessible at the specified custom domain.

  - `zoneId: string`

    Zone ID of the custom domain.

  - `ciphers: optional array of string`

    An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/domains/custom \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "domain": "prefix.example-domain.com",
          "enabled": true,
          "zoneId": "36ca64a6d92827b8a6b90be344bb1bfd"
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
    "domain": "example-domain.com",
    "enabled": true,
    "zoneId": "36ca64a6d92827b8a6b90be344bb1bfd",
    "ciphers": [
      "string"
    ],
    "minTLS": "1.0"
  },
  "success": true
}
```
