# Certificates

## List mTLS certificates

**get** `/{accounts_or_zones}/{account_or_zone_id}/access/certificates`

Lists all mTLS root certificates.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Query Parameters

- `page: optional number`

  Page number of results.

- `per_page: optional number`

  Number of results per page.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional array of Certificate`

  - `id: optional string`

    The ID of the application that will use this certificate.

  - `associated_hostnames: optional array of AssociatedHostnames`

    The hostnames of the applications that will use this certificate.

  - `expires_on: optional string`

  - `fingerprint: optional string`

    The MD5 fingerprint of the certificate.

  - `name: optional string`

    The name of the certificate.

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/certificates \
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
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": [
    {
      "id": "id",
      "associated_hostnames": [
        "admin.example.com"
      ],
      "created_at": "2014-01-01T05:20:00.12345Z",
      "expires_on": "2014-01-01T05:20:00.12345Z",
      "fingerprint": "MD5 Fingerprint=1E:80:0F:7A:FD:31:55:96:DE:D5:CB:E2:F0:91:F6:91",
      "name": "Allow devs",
      "updated_at": "2014-01-01T05:20:00.12345Z"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Get an mTLS certificate

**get** `/{accounts_or_zones}/{account_or_zone_id}/access/certificates/{certificate_id}`

Fetches a single mTLS certificate.

### Path Parameters

- `certificate_id: string`

  UUID.

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional Certificate`

  - `id: optional string`

    The ID of the application that will use this certificate.

  - `associated_hostnames: optional array of AssociatedHostnames`

    The hostnames of the applications that will use this certificate.

  - `expires_on: optional string`

  - `fingerprint: optional string`

    The MD5 fingerprint of the certificate.

  - `name: optional string`

    The name of the certificate.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/certificates/$CERTIFICATE_ID \
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
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "id",
    "associated_hostnames": [
      "admin.example.com"
    ],
    "created_at": "2014-01-01T05:20:00.12345Z",
    "expires_on": "2014-01-01T05:20:00.12345Z",
    "fingerprint": "MD5 Fingerprint=1E:80:0F:7A:FD:31:55:96:DE:D5:CB:E2:F0:91:F6:91",
    "name": "Allow devs",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Add an mTLS certificate

**post** `/{accounts_or_zones}/{account_or_zone_id}/access/certificates`

Adds a new mTLS root certificate to Access.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `certificate: string`

  The certificate content.

- `name: string`

  The name of the certificate.

- `associated_hostnames: optional array of AssociatedHostnames`

  The hostnames of the applications that will use this certificate.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional Certificate`

  - `id: optional string`

    The ID of the application that will use this certificate.

  - `associated_hostnames: optional array of AssociatedHostnames`

    The hostnames of the applications that will use this certificate.

  - `expires_on: optional string`

  - `fingerprint: optional string`

    The MD5 fingerprint of the certificate.

  - `name: optional string`

    The name of the certificate.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/certificates \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "certificate": "-----BEGIN CERTIFICATE-----\\nMIIGAjCCA+qgAwIBAgIJAI7kymlF7CWT...N4RI7KKB7nikiuUf8vhULKy5IX10\\nDrUtmu/B\\n-----END CERTIFICATE-----",
          "name": "Allow devs"
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
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "id",
    "associated_hostnames": [
      "admin.example.com"
    ],
    "created_at": "2014-01-01T05:20:00.12345Z",
    "expires_on": "2014-01-01T05:20:00.12345Z",
    "fingerprint": "MD5 Fingerprint=1E:80:0F:7A:FD:31:55:96:DE:D5:CB:E2:F0:91:F6:91",
    "name": "Allow devs",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Update an mTLS certificate

**put** `/{accounts_or_zones}/{account_or_zone_id}/access/certificates/{certificate_id}`

Updates a configured mTLS certificate.

### Path Parameters

- `certificate_id: string`

  UUID.

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `associated_hostnames: array of AssociatedHostnames`

  The hostnames of the applications that will use this certificate.

- `name: optional string`

  The name of the certificate.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional Certificate`

  - `id: optional string`

    The ID of the application that will use this certificate.

  - `associated_hostnames: optional array of AssociatedHostnames`

    The hostnames of the applications that will use this certificate.

  - `expires_on: optional string`

  - `fingerprint: optional string`

    The MD5 fingerprint of the certificate.

  - `name: optional string`

    The name of the certificate.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/certificates/$CERTIFICATE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "associated_hostnames": [
            "admin.example.com"
          ],
          "name": "Allow devs"
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
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "id",
    "associated_hostnames": [
      "admin.example.com"
    ],
    "created_at": "2014-01-01T05:20:00.12345Z",
    "expires_on": "2014-01-01T05:20:00.12345Z",
    "fingerprint": "MD5 Fingerprint=1E:80:0F:7A:FD:31:55:96:DE:D5:CB:E2:F0:91:F6:91",
    "name": "Allow devs",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Delete an mTLS certificate

**delete** `/{accounts_or_zones}/{account_or_zone_id}/access/certificates/{certificate_id}`

Deletes an mTLS certificate.

### Path Parameters

- `certificate_id: string`

  UUID.

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { id }`

  - `id: optional string`

    UUID.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/certificates/$CERTIFICATE_ID \
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
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
  }
}
```

## Domain Types

### Associated Hostnames

- `AssociatedHostnames = string`

  A fully-qualified domain name (FQDN).

### Certificate

- `Certificate object { id, associated_hostnames, expires_on, 2 more }`

  - `id: optional string`

    The ID of the application that will use this certificate.

  - `associated_hostnames: optional array of AssociatedHostnames`

    The hostnames of the applications that will use this certificate.

  - `expires_on: optional string`

  - `fingerprint: optional string`

    The MD5 fingerprint of the certificate.

  - `name: optional string`

    The name of the certificate.

### Certificate Delete Response

- `CertificateDeleteResponse object { id }`

  - `id: optional string`

    UUID.

# Settings

## List all mTLS hostname settings

**get** `/{accounts_or_zones}/{account_or_zone_id}/access/certificates/settings`

List all mTLS hostname settings for this account or zone.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional array of CertificateSettings`

  - `china_network: boolean`

    Request client certificates for this hostname in China. Can only be set to true if this zone is china network enabled.

  - `client_certificate_forwarding: boolean`

    Client Certificate Forwarding is a feature that takes the client cert provided by the eyeball to the edge, and forwards it to the origin as a HTTP header to allow logging on the origin.

  - `hostname: string`

    The hostname that these settings apply to.

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/certificates/settings \
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
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": [
    {
      "china_network": false,
      "client_certificate_forwarding": true,
      "hostname": "admin.example.com"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Update an mTLS certificate's hostname settings

**put** `/{accounts_or_zones}/{account_or_zone_id}/access/certificates/settings`

Updates an mTLS certificate's hostname settings.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `settings: array of CertificateSettings`

  - `china_network: boolean`

    Request client certificates for this hostname in China. Can only be set to true if this zone is china network enabled.

  - `client_certificate_forwarding: boolean`

    Client Certificate Forwarding is a feature that takes the client cert provided by the eyeball to the edge, and forwards it to the origin as a HTTP header to allow logging on the origin.

  - `hostname: string`

    The hostname that these settings apply to.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional array of CertificateSettings`

  - `china_network: boolean`

    Request client certificates for this hostname in China. Can only be set to true if this zone is china network enabled.

  - `client_certificate_forwarding: boolean`

    Client Certificate Forwarding is a feature that takes the client cert provided by the eyeball to the edge, and forwards it to the origin as a HTTP header to allow logging on the origin.

  - `hostname: string`

    The hostname that these settings apply to.

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/certificates/settings \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "settings": [
            {
              "china_network": false,
              "client_certificate_forwarding": true,
              "hostname": "admin.example.com"
            }
          ]
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
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": [
    {
      "china_network": false,
      "client_certificate_forwarding": true,
      "hostname": "admin.example.com"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Domain Types

### Certificate Settings

- `CertificateSettings object { china_network, client_certificate_forwarding, hostname }`

  - `china_network: boolean`

    Request client certificates for this hostname in China. Can only be set to true if this zone is china network enabled.

  - `client_certificate_forwarding: boolean`

    Client Certificate Forwarding is a feature that takes the client cert provided by the eyeball to the edge, and forwards it to the origin as a HTTP header to allow logging on the origin.

  - `hostname: string`

    The hostname that these settings apply to.
