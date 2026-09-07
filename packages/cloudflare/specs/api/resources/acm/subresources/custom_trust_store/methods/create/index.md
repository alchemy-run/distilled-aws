## Upload Custom Origin Trust Store

**post** `/zones/{zone_id}/acm/custom_trust_store`

Upload a root CA certificate to the Custom Origin Trust Store for a Zone. Only root CA certificates are accepted.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `certificate: string`

  The root CA certificate in PEM format. Only root CA certificates are accepted; intermediate and leaf certificates are not supported.

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

- `result: optional CustomTrustStore`

  - `id: string`

    Identifier.

  - `certificate: string`

    The root CA certificate in PEM format. Only root CA certificates are accepted; intermediate and leaf certificates are not supported.

  - `expires_on: string`

    When the certificate expires.

  - `issuer: string`

    The certificate authority that issued the certificate.

  - `signature: string`

    The type of hash used for the certificate.

  - `status: "initializing" or "pending_deployment" or "active" or 3 more`

    Status of the zone's custom SSL.

    - `"initializing"`

    - `"pending_deployment"`

    - `"active"`

    - `"pending_deletion"`

    - `"deleted"`

    - `"expired"`

  - `updated_at: string`

    When the certificate was last modified.

  - `uploaded_on: string`

    When the certificate was uploaded to Cloudflare.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/acm/custom_trust_store \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "certificate": "-----BEGIN CERTIFICATE-----\\nMIIDdjCCAl6gAwIBAgIJAPnMg0Fs+/B0MA0GCSqGSIb3DQEBCwUAMFsx...\\n-----END CERTIFICATE-----\\n"
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
    "certificate": "-----BEGIN CERTIFICATE-----\nMIIDdjCCAl6gAwIBAgIJAPnMg0Fs+/B0MA0GCSqGSIb3DQEBCwUAMFsx...\n-----END CERTIFICATE-----\n",
    "expires_on": "2122-10-29T16:59:47Z",
    "issuer": "GlobalSign",
    "signature": "SHA256WithRSA",
    "status": "active",
    "updated_at": "2014-01-01T05:20:00Z",
    "uploaded_on": "2014-01-01T05:20:00Z"
  }
}
```
