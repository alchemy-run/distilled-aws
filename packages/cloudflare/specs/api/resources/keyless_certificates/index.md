# Keyless Certificates

## List Keyless SSL Configurations

**get** `/zones/{zone_id}/keyless_certificates`

List all Keyless SSL configurations for a given zone.

### Path Parameters

- `zone_id: string`

  Identifier.

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

- `result: optional array of KeylessCertificate`

  - `id: string`

    Keyless certificate identifier tag.

  - `created_on: string`

    When the Keyless SSL was created.

  - `enabled: boolean`

    Whether or not the Keyless SSL is on or off.

  - `host: string`

    The keyless SSL name.

  - `modified_on: string`

    When the Keyless SSL was last modified.

  - `name: string`

    The keyless SSL name.

  - `permissions: array of string`

    Available permissions for the Keyless SSL for the current user requesting the item.

  - `port: number`

    The keyless SSL port used to communicate between Cloudflare and the client's Keyless SSL server.

  - `status: "active" or "deleted"`

    Status of the Keyless SSL.

    - `"active"`

    - `"deleted"`

  - `tunnel: optional Tunnel`

    Configuration for using Keyless SSL through a Cloudflare Tunnel.

    - `private_ip: string`

      Private IP of the Key Server Host.

    - `vnet_id: string`

      Cloudflare Tunnel Virtual Network ID.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/keyless_certificates \
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
      "id": "4d2844d2ce78891c34d0b6c0535a291e",
      "created_on": "2014-01-01T05:20:00Z",
      "enabled": false,
      "host": "example.com",
      "modified_on": "2014-01-01T05:20:00Z",
      "name": "example.com Keyless SSL",
      "permissions": [
        "#ssl:read",
        "#ssl:edit"
      ],
      "port": 24008,
      "status": "active",
      "tunnel": {
        "private_ip": "10.0.0.1",
        "vnet_id": "7365377a-85a4-4390-9480-531ef7dc7a3c"
      }
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

## Get Keyless SSL Configuration

**get** `/zones/{zone_id}/keyless_certificates/{keyless_certificate_id}`

Get details for one Keyless SSL configuration.

### Path Parameters

- `zone_id: string`

  Identifier.

- `keyless_certificate_id: string`

  Identifier.

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

- `result: optional KeylessCertificate`

  - `id: string`

    Keyless certificate identifier tag.

  - `created_on: string`

    When the Keyless SSL was created.

  - `enabled: boolean`

    Whether or not the Keyless SSL is on or off.

  - `host: string`

    The keyless SSL name.

  - `modified_on: string`

    When the Keyless SSL was last modified.

  - `name: string`

    The keyless SSL name.

  - `permissions: array of string`

    Available permissions for the Keyless SSL for the current user requesting the item.

  - `port: number`

    The keyless SSL port used to communicate between Cloudflare and the client's Keyless SSL server.

  - `status: "active" or "deleted"`

    Status of the Keyless SSL.

    - `"active"`

    - `"deleted"`

  - `tunnel: optional Tunnel`

    Configuration for using Keyless SSL through a Cloudflare Tunnel.

    - `private_ip: string`

      Private IP of the Key Server Host.

    - `vnet_id: string`

      Cloudflare Tunnel Virtual Network ID.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/keyless_certificates/$KEYLESS_CERTIFICATE_ID \
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
    "id": "4d2844d2ce78891c34d0b6c0535a291e",
    "created_on": "2014-01-01T05:20:00Z",
    "enabled": false,
    "host": "example.com",
    "modified_on": "2014-01-01T05:20:00Z",
    "name": "example.com Keyless SSL",
    "permissions": [
      "#ssl:read",
      "#ssl:edit"
    ],
    "port": 24008,
    "status": "active",
    "tunnel": {
      "private_ip": "10.0.0.1",
      "vnet_id": "7365377a-85a4-4390-9480-531ef7dc7a3c"
    }
  }
}
```

## Create Keyless SSL Configuration

**post** `/zones/{zone_id}/keyless_certificates`

Creates a Keyless SSL configuration that allows SSL/TLS termination without exposing private keys to Cloudflare. Keys remain on your infrastructure.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `certificate: string`

  The zone's SSL certificate or SSL certificate and intermediate(s).

- `host: string`

  The keyless SSL name.

- `port: number`

  The keyless SSL port used to communicate between Cloudflare and the client's Keyless SSL server.

- `bundle_method: optional BundleMethod`

  A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

  - `"ubiquitous"`

  - `"optimal"`

  - `"force"`

- `name: optional string`

  The keyless SSL name.

- `tunnel: optional Tunnel`

  Configuration for using Keyless SSL through a Cloudflare Tunnel.

  - `private_ip: string`

    Private IP of the Key Server Host.

  - `vnet_id: string`

    Cloudflare Tunnel Virtual Network ID.

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

- `result: optional KeylessCertificate`

  - `id: string`

    Keyless certificate identifier tag.

  - `created_on: string`

    When the Keyless SSL was created.

  - `enabled: boolean`

    Whether or not the Keyless SSL is on or off.

  - `host: string`

    The keyless SSL name.

  - `modified_on: string`

    When the Keyless SSL was last modified.

  - `name: string`

    The keyless SSL name.

  - `permissions: array of string`

    Available permissions for the Keyless SSL for the current user requesting the item.

  - `port: number`

    The keyless SSL port used to communicate between Cloudflare and the client's Keyless SSL server.

  - `status: "active" or "deleted"`

    Status of the Keyless SSL.

    - `"active"`

    - `"deleted"`

  - `tunnel: optional Tunnel`

    Configuration for using Keyless SSL through a Cloudflare Tunnel.

    - `private_ip: string`

      Private IP of the Key Server Host.

    - `vnet_id: string`

      Cloudflare Tunnel Virtual Network ID.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/keyless_certificates \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "certificate": "-----BEGIN CERTIFICATE-----\\nMIIDtTCCAp2gAwIBAgIJAM15n7fdxhRtMA0GCSqGSIb3DQEBBQUAMEUxCzAJBgNV\\nBAYTAlVTMRMwEQYDVQQIEwpTb21lLVN0YXRlMSEwHwYDVQQKExhJbnRlcm5ldCBX\\naWRnaXRzIFB0eSBMdGQwHhcNMTQwMzExMTkyMTU5WhcNMTQwNDEwMTkyMTU5WjBF\\nMQswCQYDVQQGEwJVUzETMBEGA1UECBMKU29tZS1TdGF0ZTEhMB8GA1UEChMYSW50\\nZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB\\nCgKCAQEAvq3sKsHpeduJHimOK+fvQdKsI8z8A05MZyyLp2/R/GE8FjNv+hkVY1WQ\\nLIyTNNQH7CJecE1nbTfo8Y56S7x/rhxC6/DJ8MIulapFPnorq46KU6yRxiM0MQ3N\\nnTJHlHA2ozZta6YBBfVfhHWl1F0IfNbXCLKvGwWWMbCx43OfW6KTkbRnE6gFWKuO\\nfSO5h2u5TaWVuSIzBvYs7Vza6m+gtYAvKAJV2nSZ+eSEFPDo29corOy8+huEOUL8\\n5FAw4BFPsr1TlrlGPFitduQUHGrSL7skk1ESGza0to3bOtrodKei2s9bk5MXm7lZ\\nqI+WZJX4Zu9+mzZhc9pCVi8r/qlXuQIDAQABo4GnMIGkMB0GA1UdDgQWBBRvavf+\\nsWM4IwKiH9X9w1vl6nUVRDB1BgNVHSMEbjBsgBRvavf+sWM4IwKiH9X9w1vl6nUV\\nRKFJpEcwRTELMAkGA1UEBhMCVVMxEzARBgNVBAgTClNvbWUtU3RhdGUxITAfBgNV\\nBAoTGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZIIJAM15n7fdxhRtMAwGA1UdEwQF\\nMAMBAf8wDQYJKoZIhvcNAQEFBQADggEBABY2ZzBaW0dMsAAT7tPJzrVWVzQx6KU4\\nUEBLudIlWPlkAwTnINCWR/8eNjCCmGA4heUdHmazdpPa8RzwOmc0NT1NQqzSyktt\\nvTqb4iHD7+8f9MqJ9/FssCfTtqr/Qst/hGH4Wmdf1EJ/6FqYAAb5iRlPgshFZxU8\\nuXtA8hWn6fK6eISD9HBdcAFToUvKNZ1BIDPvh9f95Ine8ar6yGd56TUNrHR8eHBs\\nESxz5ddVR/oWRysNJ+aGAyYqHS8S/ttmC7r4XCAHqXptkHPCGRqkAhsterYhd4I8\\n/cBzejUobNCjjHFbtkAL/SjxZOLW+pNkZwfeYdM8iPkD54Uua1v2tdw=\\n-----END CERTIFICATE-----",
          "host": "example.com",
          "port": 24008,
          "bundle_method": "ubiquitous",
          "name": "example.com Keyless SSL"
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
    "id": "4d2844d2ce78891c34d0b6c0535a291e",
    "created_on": "2014-01-01T05:20:00Z",
    "enabled": false,
    "host": "example.com",
    "modified_on": "2014-01-01T05:20:00Z",
    "name": "example.com Keyless SSL",
    "permissions": [
      "#ssl:read",
      "#ssl:edit"
    ],
    "port": 24008,
    "status": "active",
    "tunnel": {
      "private_ip": "10.0.0.1",
      "vnet_id": "7365377a-85a4-4390-9480-531ef7dc7a3c"
    }
  }
}
```

## Edit Keyless SSL Configuration

**patch** `/zones/{zone_id}/keyless_certificates/{keyless_certificate_id}`

This will update attributes of a Keyless SSL. Consists of one or more of the following:  host,name,port.

### Path Parameters

- `zone_id: string`

  Identifier.

- `keyless_certificate_id: string`

  Identifier.

### Body Parameters

- `enabled: optional boolean`

  Whether or not the Keyless SSL is on or off.

- `host: optional string`

  The keyless SSL name.

- `name: optional string`

  The keyless SSL name.

- `port: optional number`

  The keyless SSL port used to communicate between Cloudflare and the client's Keyless SSL server.

- `tunnel: optional Tunnel`

  Configuration for using Keyless SSL through a Cloudflare Tunnel.

  - `private_ip: string`

    Private IP of the Key Server Host.

  - `vnet_id: string`

    Cloudflare Tunnel Virtual Network ID.

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

- `result: optional KeylessCertificate`

  - `id: string`

    Keyless certificate identifier tag.

  - `created_on: string`

    When the Keyless SSL was created.

  - `enabled: boolean`

    Whether or not the Keyless SSL is on or off.

  - `host: string`

    The keyless SSL name.

  - `modified_on: string`

    When the Keyless SSL was last modified.

  - `name: string`

    The keyless SSL name.

  - `permissions: array of string`

    Available permissions for the Keyless SSL for the current user requesting the item.

  - `port: number`

    The keyless SSL port used to communicate between Cloudflare and the client's Keyless SSL server.

  - `status: "active" or "deleted"`

    Status of the Keyless SSL.

    - `"active"`

    - `"deleted"`

  - `tunnel: optional Tunnel`

    Configuration for using Keyless SSL through a Cloudflare Tunnel.

    - `private_ip: string`

      Private IP of the Key Server Host.

    - `vnet_id: string`

      Cloudflare Tunnel Virtual Network ID.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/keyless_certificates/$KEYLESS_CERTIFICATE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "host": "example.com",
          "name": "example.com Keyless SSL",
          "port": 24008
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
    "id": "4d2844d2ce78891c34d0b6c0535a291e",
    "created_on": "2014-01-01T05:20:00Z",
    "enabled": false,
    "host": "example.com",
    "modified_on": "2014-01-01T05:20:00Z",
    "name": "example.com Keyless SSL",
    "permissions": [
      "#ssl:read",
      "#ssl:edit"
    ],
    "port": 24008,
    "status": "active",
    "tunnel": {
      "private_ip": "10.0.0.1",
      "vnet_id": "7365377a-85a4-4390-9480-531ef7dc7a3c"
    }
  }
}
```

## Delete Keyless SSL Configuration

**delete** `/zones/{zone_id}/keyless_certificates/{keyless_certificate_id}`

Removes a Keyless SSL configuration. SSL connections will no longer use the keyless server for cryptographic operations.

### Path Parameters

- `zone_id: string`

  Identifier.

- `keyless_certificate_id: string`

  Identifier.

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

    Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/keyless_certificates/$KEYLESS_CERTIFICATE_ID \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```

## Domain Types

### Keyless Certificate

- `KeylessCertificate object { id, created_on, enabled, 7 more }`

  - `id: string`

    Keyless certificate identifier tag.

  - `created_on: string`

    When the Keyless SSL was created.

  - `enabled: boolean`

    Whether or not the Keyless SSL is on or off.

  - `host: string`

    The keyless SSL name.

  - `modified_on: string`

    When the Keyless SSL was last modified.

  - `name: string`

    The keyless SSL name.

  - `permissions: array of string`

    Available permissions for the Keyless SSL for the current user requesting the item.

  - `port: number`

    The keyless SSL port used to communicate between Cloudflare and the client's Keyless SSL server.

  - `status: "active" or "deleted"`

    Status of the Keyless SSL.

    - `"active"`

    - `"deleted"`

  - `tunnel: optional Tunnel`

    Configuration for using Keyless SSL through a Cloudflare Tunnel.

    - `private_ip: string`

      Private IP of the Key Server Host.

    - `vnet_id: string`

      Cloudflare Tunnel Virtual Network ID.

### Tunnel

- `Tunnel object { private_ip, vnet_id }`

  Configuration for using Keyless SSL through a Cloudflare Tunnel.

  - `private_ip: string`

    Private IP of the Key Server Host.

  - `vnet_id: string`

    Cloudflare Tunnel Virtual Network ID.

### Keyless Certificate Delete Response

- `KeylessCertificateDeleteResponse object { id }`

  - `id: optional string`

    Identifier.
