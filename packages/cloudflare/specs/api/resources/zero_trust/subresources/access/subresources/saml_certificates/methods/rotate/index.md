## Rotate SAML certificate

**post** `/accounts/{account_id}/access/saml_certificates/{saml_cert_set_id}/rotate`

Rotates the SAML encryption certificates within the specified certificate set. This generates a new
certificate and moves the current certificate to the previous slot. If a previous certificate exists,
it will be deactivated and removed.

This endpoint ensures zero-downtime rotation by maintaining both current and previous certificates
during the transition period, allowing IdPs time to update their configurations. Automated rotation
happens 30 days before a current certificate's expiration.

### Path Parameters

- `account_id: string`

  Identifier.

- `saml_cert_set_id: string`

  UUID.

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

- `result: optional object { created_at, uid, updated_at, 2 more }`

  - `created_at: string`

    When the certificate set was created

  - `uid: string`

    Unique identifier for the certificate set

  - `updated_at: string`

    When the certificate set was last updated

  - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

    The current active certificate

    - `is_current: boolean`

      Indicates whether the certificate can be used for IdP configuration.

    - `not_after: string`

      Certificate expiration date

    - `public_certificate: string`

      The public certificate in PEM format

    - `uid: string`

      Unique identifier for the certificate

  - `previous_certificate: optional unknown`

    The previous certificate (maintained during rotation period). May be null when no rotation has occurred. Mirrors the structure of `saml_certificate`.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/saml_certificates/$SAML_CERT_SET_ID/rotate \
    -X POST \
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
    "created_at": "2024-03-21T10:30:00Z",
    "uid": "a5bb4b3f-c2d1-4e6a-8f9b-1d3e4f5a6b7c",
    "updated_at": "2024-03-21T10:30:00Z",
    "current_certificate": {
      "is_current": true,
      "not_after": "2027-03-21T12:00:00Z",
      "public_certificate": "-----BEGIN CERTIFICATE-----\nMIIGAjCCA+qgAwIBAgIJAI7kymlF7CWT...\n...certificate content...\n-----END CERTIFICATE-----\n",
      "uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
    },
    "previous_certificate": {}
  }
}
```
