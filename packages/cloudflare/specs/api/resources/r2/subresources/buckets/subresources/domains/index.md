# Domains

# Custom

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

## Get Custom Domain Settings

**get** `/accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom/{domain}`

Get the configuration for a custom domain on an existing R2 bucket.

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

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: object { domain, enabled, status, 4 more }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/domains/custom/$DOMAIN \
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
  "success": true
}
```

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

## Remove Custom Domain From Bucket

**delete** `/accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom/{domain}`

Remove custom domain registration from an existing R2 bucket.

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

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: object { domain }`

  - `domain: string`

    Name of the removed custom domain.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/domains/custom/$DOMAIN \
    -X DELETE \
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
    "domain": "example-domain/custom-domain.com"
  },
  "success": true
}
```

## Domain Types

### Custom List Response

- `CustomListResponse object { domains }`

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

### Custom Get Response

- `CustomGetResponse object { domain, enabled, status, 4 more }`

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

### Custom Create Response

- `CustomCreateResponse object { domain, enabled, zoneId, 2 more }`

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

### Custom Update Response

- `CustomUpdateResponse object { domain, ciphers, enabled, minTLS }`

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

### Custom Delete Response

- `CustomDeleteResponse object { domain }`

  - `domain: string`

    Name of the removed custom domain.

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
