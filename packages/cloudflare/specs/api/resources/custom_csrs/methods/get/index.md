## Custom CSR Details

**get** `/{accounts_or_zones}/{account_or_zone_id}/custom_csrs/{custom_csr_id}`

Retrieve details for a specific custom Certificate Signing Request (CSR).

### Path Parameters

- `custom_csr_id: string`

  Custom CSR identifier tag.

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

- `result: optional object { id, created_at, key_type, 11 more }`

  A custom Certificate Signing Request (CSR).

  - `id: string`

    Custom CSR identifier tag.

  - `created_at: string`

    When the CSR was created.

  - `key_type: "rsa2048" or "p256v1"`

    The key algorithm used to generate the CSR.

    - `"rsa2048"`

    - `"p256v1"`

  - `account_tag: optional string`

    Account identifier associated with this CSR.

  - `common_name: optional string`

    The common name (domain) for the CSR.

  - `country: optional string`

    Two-letter ISO 3166-1 alpha-2 country code.

  - `csr: optional string`

    The PEM-encoded Certificate Signing Request.

  - `description: optional string`

    Optional description for the CSR.

  - `locality: optional string`

    City or locality name.

  - `name: optional string`

    Human-readable name for the CSR.

  - `organization: optional string`

    Organization name.

  - `organizational_unit: optional string`

    Organizational unit name.

  - `sans: optional array of string`

    Subject Alternative Names included in the CSR.

  - `state: optional string`

    State or province name.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/custom_csrs/$CUSTOM_CSR_ID \
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
    "id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752",
    "created_at": "2024-01-15T10:30:00Z",
    "key_type": "rsa2048",
    "account_tag": "23e087bd19bc1d40ae95b6f297263ceb",
    "common_name": "example.com",
    "country": "US",
    "csr": "-----BEGIN CERTIFICATE REQUEST-----\nMIICYzCCAUsCAQAwHj...",
    "description": "CSR for example.com wildcard",
    "locality": "San Francisco",
    "name": "My Custom CSR",
    "organization": "Cloudflare, Inc.",
    "organizational_unit": "Engineering",
    "sans": [
      "example.com",
      "www.example.com"
    ],
    "state": "California"
  }
}
```
