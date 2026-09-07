# Total TLS

## Total TLS Settings Details

**get** `/zones/{zone_id}/acm/total_tls`

Get Total TLS Settings for a Zone.

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

- `result: optional object { certificate_authority, enabled, validity_period }`

  - `certificate_authority: optional CertificateAuthority`

    The Certificate Authority that Total TLS certificates will be issued through.

    - `"google"`

    - `"lets_encrypt"`

    - `"ssl_com"`

  - `enabled: optional boolean`

    If enabled, Total TLS will order a hostname specific TLS certificate for any proxied A, AAAA, or CNAME record in your zone.

  - `validity_period: optional 90`

    The validity period in days for the certificates ordered via Total TLS.

    - `90`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/acm/total_tls \
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
    "certificate_authority": "google",
    "enabled": true,
    "validity_period": 90
  }
}
```

## Enable or Disable Total TLS

**post** `/zones/{zone_id}/acm/total_tls`

Set Total TLS Settings or disable the feature for a Zone.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `enabled: boolean`

  If enabled, Total TLS will order a hostname specific TLS certificate for any proxied A, AAAA, or CNAME record in your zone.

- `certificate_authority: optional CertificateAuthority`

  The Certificate Authority that Total TLS certificates will be issued through.

  - `"google"`

  - `"lets_encrypt"`

  - `"ssl_com"`

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

- `result: optional object { certificate_authority, enabled, validity_period }`

  - `certificate_authority: optional CertificateAuthority`

    The Certificate Authority that Total TLS certificates will be issued through.

    - `"google"`

    - `"lets_encrypt"`

    - `"ssl_com"`

  - `enabled: optional boolean`

    If enabled, Total TLS will order a hostname specific TLS certificate for any proxied A, AAAA, or CNAME record in your zone.

  - `validity_period: optional 90`

    The validity period in days for the certificates ordered via Total TLS.

    - `90`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/acm/total_tls \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true,
          "certificate_authority": "google"
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
    "certificate_authority": "google",
    "enabled": true,
    "validity_period": 90
  }
}
```

## Enable or Disable Total TLS

**post** `/zones/{zone_id}/acm/total_tls`

Set Total TLS Settings or disable the feature for a Zone.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `enabled: boolean`

  If enabled, Total TLS will order a hostname specific TLS certificate for any proxied A, AAAA, or CNAME record in your zone.

- `certificate_authority: optional CertificateAuthority`

  The Certificate Authority that Total TLS certificates will be issued through.

  - `"google"`

  - `"lets_encrypt"`

  - `"ssl_com"`

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

- `result: optional object { certificate_authority, enabled, validity_period }`

  - `certificate_authority: optional CertificateAuthority`

    The Certificate Authority that Total TLS certificates will be issued through.

    - `"google"`

    - `"lets_encrypt"`

    - `"ssl_com"`

  - `enabled: optional boolean`

    If enabled, Total TLS will order a hostname specific TLS certificate for any proxied A, AAAA, or CNAME record in your zone.

  - `validity_period: optional 90`

    The validity period in days for the certificates ordered via Total TLS.

    - `90`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/acm/total_tls \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true,
          "certificate_authority": "google"
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
    "certificate_authority": "google",
    "enabled": true,
    "validity_period": 90
  }
}
```

## Domain Types

### Certificate Authority

- `CertificateAuthority = "google" or "lets_encrypt" or "ssl_com"`

  The Certificate Authority that Total TLS certificates will be issued through.

  - `"google"`

  - `"lets_encrypt"`

  - `"ssl_com"`

### Total TLS Get Response

- `TotalTLSGetResponse object { certificate_authority, enabled, validity_period }`

  - `certificate_authority: optional CertificateAuthority`

    The Certificate Authority that Total TLS certificates will be issued through.

    - `"google"`

    - `"lets_encrypt"`

    - `"ssl_com"`

  - `enabled: optional boolean`

    If enabled, Total TLS will order a hostname specific TLS certificate for any proxied A, AAAA, or CNAME record in your zone.

  - `validity_period: optional 90`

    The validity period in days for the certificates ordered via Total TLS.

    - `90`

### Total TLS Update Response

- `TotalTLSUpdateResponse object { certificate_authority, enabled, validity_period }`

  - `certificate_authority: optional CertificateAuthority`

    The Certificate Authority that Total TLS certificates will be issued through.

    - `"google"`

    - `"lets_encrypt"`

    - `"ssl_com"`

  - `enabled: optional boolean`

    If enabled, Total TLS will order a hostname specific TLS certificate for any proxied A, AAAA, or CNAME record in your zone.

  - `validity_period: optional 90`

    The validity period in days for the certificates ordered via Total TLS.

    - `90`

### Total TLS Edit Response

- `TotalTLSEditResponse object { certificate_authority, enabled, validity_period }`

  - `certificate_authority: optional CertificateAuthority`

    The Certificate Authority that Total TLS certificates will be issued through.

    - `"google"`

    - `"lets_encrypt"`

    - `"ssl_com"`

  - `enabled: optional boolean`

    If enabled, Total TLS will order a hostname specific TLS certificate for any proxied A, AAAA, or CNAME record in your zone.

  - `validity_period: optional 90`

    The validity period in days for the certificates ordered via Total TLS.

    - `90`
