## List certificate authorities

**get** `/radar/ct/authorities`

Retrieves a list of certificate authorities.

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `offset: optional number`

  Skips the specified number of objects before fetching the results.

### Returns

- `result: object { certificateAuthorities }`

  - `certificateAuthorities: array of object { certificateRecordType, country, countryName, 6 more }`

    - `certificateRecordType: "ROOT_CERTIFICATE" or "INTERMEDIATE_CERTIFICATE"`

      Specifies the type of certificate in the trust chain.

      - `"ROOT_CERTIFICATE"`

      - `"INTERMEDIATE_CERTIFICATE"`

    - `country: string`

      The two-letter ISO country code where the CA organization is based.

    - `countryName: string`

      The full country name corresponding to the country code.

    - `name: string`

      The full name of the certificate authority (CA).

    - `owner: string`

      The organization that owns and operates the CA.

    - `parentName: string`

      The name of the parent/root certificate authority that issued this intermediate certificate.

    - `parentSha256Fingerprint: string`

      The SHA-256 fingerprint of the parent certificate.

    - `revocationStatus: "NOT_REVOKED" or "REVOKED" or "PARENT_CERT_REVOKED"`

      The current revocation status of a Certificate Authority (CA) certificate.

      - `"NOT_REVOKED"`

      - `"REVOKED"`

      - `"PARENT_CERT_REVOKED"`

    - `sha256Fingerprint: string`

      The SHA-256 fingerprint of the intermediate certificate.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/ct/authorities \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "certificateAuthorities": [
      {
        "certificateRecordType": "ROOT_CERTIFICATE",
        "country": "PT",
        "countryName": "Portugal",
        "name": "MULTICERT Advanced Certification Authority 005",
        "owner": "MULTICERT",
        "parentName": "MULTICERT Root Certification Authority 01",
        "parentSha256Fingerprint": "24EDD4E503A8D3FDB5FFB4AF66C887359901CBE687A5A0760D10A08EED99A7C3",
        "revocationStatus": "NOT_REVOKED",
        "sha256Fingerprint": "24EDD4E503A8D3FDB5FFB4AF66C887359901CBE687A5A0760D10A08EED99A7C3"
      }
    ]
  },
  "success": true
}
```
