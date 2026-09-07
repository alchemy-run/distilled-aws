## Reactivate Client Certificate

**patch** `/zones/{zone_id}/client_certificates/{client_certificate_id}`

If a API Shield mTLS Client Certificate is in a pending_revocation state, you may reactivate it with this endpoint.

### Path Parameters

- `zone_id: string`

  Identifier.

- `client_certificate_id: string`

  Identifier.

### Body Parameters

- `reactivate: optional boolean`

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

- `result: optional ClientCertificate`

  - `id: optional string`

    Identifier.

  - `certificate: optional string`

    The Client Certificate PEM.

  - `certificate_authority: optional object { id, name }`

    Certificate Authority used to issue the Client Certificate.

    - `id: optional string`

    - `name: optional string`

  - `common_name: optional string`

    Common Name of the Client Certificate.

  - `country: optional string`

    Country, provided by the CSR.

  - `csr: optional string`

    The Certificate Signing Request (CSR). Must be newline-encoded.

  - `expires_on: optional string`

    Date that the Client Certificate expires.

  - `fingerprint_sha256: optional string`

    Unique identifier of the Client Certificate.

  - `issued_on: optional string`

    Date that the Client Certificate was issued by the Certificate Authority.

  - `location: optional string`

    Location, provided by the CSR.

  - `organization: optional string`

    Organization, provided by the CSR.

  - `organizational_unit: optional string`

    Organizational Unit, provided by the CSR.

  - `serial_number: optional string`

    The serial number on the created Client Certificate.

  - `signature: optional string`

    The type of hash used for the Client Certificate..

  - `ski: optional string`

    Subject Key Identifier.

  - `state: optional string`

    State, provided by the CSR.

  - `status: optional Status`

    Client Certificates may be active or revoked, and the pending_reactivation or pending_revocation represent in-progress asynchronous transitions.

    - `"active"`

    - `"pending_reactivation"`

    - `"pending_revocation"`

    - `"revoked"`

  - `validity_days: optional number`

    The number of days the Client Certificate will be valid after the issued_on date.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/client_certificates/$CLIENT_CERTIFICATE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "reactivate": true
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "certificate": "-----BEGIN CERTIFICATE-----\nMIIDmDCCAoC...dhDDE\n-----END CERTIFICATE-----",
    "certificate_authority": {
      "id": "568b6b74-7b0c-4755-8840-4e3b8c24adeb",
      "name": "Cloudflare Managed CA for account"
    },
    "common_name": "Cloudflare",
    "country": "US",
    "csr": "-----BEGIN CERTIFICATE REQUEST-----\nMIICY....\n-----END CERTIFICATE REQUEST-----",
    "expires_on": "2033-02-20T23:18:00Z",
    "fingerprint_sha256": "256c24690243359fb8cf139a125bd05ebf1d968b71e4caf330718e9f5c8a89ea",
    "issued_on": "2023-02-23T23:18:00Z",
    "location": "Somewhere",
    "organization": "Organization",
    "organizational_unit": "Organizational Unit",
    "serial_number": "3bb94ff144ac567b9f75ad664b6c55f8d5e48182",
    "signature": "SHA256WithRSA",
    "ski": "8e375af1389a069a0f921f8cc8e1eb12d784b949",
    "state": "CA",
    "status": "active",
    "validity_days": 3650
  }
}
```
