## List Custom Domains of Bucket

**get** `/accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom`

Gets a list of all custom domains registered with an existing R2 bucket.

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

- `result: object { domains }`

  - `domains: array of object { domain, enabled, status, 4 more }`

    - `domain: string`

      Domain name of the custom domain to be added.

    - `enabled: boolean`

      Whether this bucket is publicly accessible at the specified custom domain.

    - `status: object { ownership, ssl }`

      - `ownership: "pending" or "active" or "deactivated" or 3 more`

        Ownership status of the domain.

        - `"pending"`

        - `"active"`

        - `"deactivated"`

        - `"blocked"`

        - `"error"`

        - `"unknown"`

      - `ssl: "initializing" or "pending" or "active" or 3 more`

        SSL certificate status.

        - `"initializing"`

        - `"pending"`

        - `"active"`

        - `"deactivated"`

        - `"error"`

        - `"unknown"`

    - `ciphers: optional array of string`

      An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

    - `minTLS: optional "1.0" or "1.1" or "1.2" or "1.3"`

      Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.

      - `"1.0"`

      - `"1.1"`

      - `"1.2"`

      - `"1.3"`

    - `zoneId: optional string`

      Zone ID of the custom domain resides in.

    - `zoneName: optional string`

      Zone that the custom domain resides in.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/domains/custom \
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
    "domains": [
      {
        "domain": "prefix.example-domain.one.com",
        "enabled": false,
        "status": {
          "ownership": "deactivated",
          "ssl": "pending"
        },
        "ciphers": [
          "string"
        ],
        "minTLS": "1.0",
        "zoneId": "36ca64a6d92827b8a6b90be344bb1bfd",
        "zoneName": "example-domain.one.com"
      },
      {
        "domain": "prefix.example-domain.two.com",
        "enabled": true,
        "status": {
          "ownership": "active",
          "ssl": "active"
        },
        "ciphers": [
          "string"
        ],
        "minTLS": "1.0",
        "zoneId": "d9d28585d5f8f5b0f857b055bf574f19",
        "zoneName": "zoneName"
      }
    ]
  },
  "success": true
}
```
