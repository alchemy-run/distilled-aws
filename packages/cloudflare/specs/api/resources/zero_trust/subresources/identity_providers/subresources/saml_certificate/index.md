# SAML Certificate

## Create SAML encryption certificate for Identity Provider

**post** `/accounts/{account_id}/access/identity_providers/{identity_provider_id}/saml_certificate`

Creates a new SAML encryption certificate set and assigns it to the specified
SAML Identity Provider. This endpoint is idempotent - if the IdP already has
a certificate set assigned, the existing certificate set is returned with a 200 status.

**Workflow for enabling SAML encryption:**

1. Call this endpoint to create and assign a certificate set to the IdP
1. Update the IdP configuration (PUT `/identity_providers/{id}`) with:
   - `config.enable_encryption: true`
   - `saml_certificate_set_id: <uid from step 1>`
1. Configure the certificate's public key in your external SAML Identity Provider

### Path Parameters

- `account_id: string`

  Identifier.

- `identity_provider_id: string`

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

  A SAML encryption certificate set containing current and optionally previous certificates for encryption key rotation.

  - `created_at: string`

    Timestamp when the certificate set was created

  - `uid: string`

    Unique identifier for the certificate set

  - `updated_at: string`

    Timestamp when the certificate set was last updated (e.g., during rotation)

  - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

    The currently active certificate used for encrypting SAML assertions

    - `is_current: boolean`

      Indicates whether this is the currently active certificate

    - `not_after: string`

      Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

    - `public_certificate: string`

      PEM-encoded X.509 certificate containing the public key.
      Configure this certificate in your external SAML Identity Provider to enable encryption.

    - `uid: string`

      Unique identifier for the certificate

  - `previous_certificate: optional unknown`

    The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/identity_providers/$IDENTITY_PROVIDER_ID/saml_certificate \
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
    "created_at": "2026-05-07T19:16:19.821162Z",
    "uid": "c409ef44-e72c-41c8-8c0b-278c8a6f4fd8",
    "updated_at": "2026-05-07T19:16:19.821162Z",
    "current_certificate": {
      "is_current": true,
      "not_after": "2027-05-07T19:11:00Z",
      "public_certificate": "-----BEGIN CERTIFICATE-----\nMIIEpzCCA4+gAwIBAgIUTh2VSDDJ0oB/gabio6j1L9QwWoUwDQYJKoZIhvcNAQEL\n...\n-----END CERTIFICATE-----\n",
      "uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
    },
    "previous_certificate": {}
  }
}
```

## Domain Types

### SAML Certificate Create Response

- `SAMLCertificateCreateResponse object { created_at, uid, updated_at, 2 more }`

  A SAML encryption certificate set containing current and optionally previous certificates for encryption key rotation.

  - `created_at: string`

    Timestamp when the certificate set was created

  - `uid: string`

    Unique identifier for the certificate set

  - `updated_at: string`

    Timestamp when the certificate set was last updated (e.g., during rotation)

  - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

    The currently active certificate used for encrypting SAML assertions

    - `is_current: boolean`

      Indicates whether this is the currently active certificate

    - `not_after: string`

      Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

    - `public_certificate: string`

      PEM-encoded X.509 certificate containing the public key.
      Configure this certificate in your external SAML Identity Provider to enable encryption.

    - `uid: string`

      Unique identifier for the certificate

  - `previous_certificate: optional unknown`

    The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of `saml_certificate`.
