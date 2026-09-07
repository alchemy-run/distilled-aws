## Get certificate authority details

**get** `/radar/ct/authorities/{ca_slug}`

Retrieves the requested CA information.

### Path Parameters

- `ca_slug: string`

  Certificate authority SHA256 fingerprint.

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

### Returns

- `result: object { certificateAuthority }`

  - `certificateAuthority: object { appleStatus, authorityKeyIdentifier, certificateRecordType, 15 more }`

    - `appleStatus: "INCLUDED" or "NOT_YET_INCLUDED" or "NOT_INCLUDED" or 4 more`

      The inclusion status of a Certificate Authority (CA) in the trust store.

      - `"INCLUDED"`

      - `"NOT_YET_INCLUDED"`

      - `"NOT_INCLUDED"`

      - `"NOT_BEFORE"`

      - `"REMOVED"`

      - `"DISABLED"`

      - `"BLOCKED"`

    - `authorityKeyIdentifier: string`

      The authorityKeyIdentifier value extracted from the certificate PEM.

    - `certificateRecordType: "ROOT_CERTIFICATE" or "INTERMEDIATE_CERTIFICATE"`

      Specifies the type of certificate in the trust chain.

      - `"ROOT_CERTIFICATE"`

      - `"INTERMEDIATE_CERTIFICATE"`

    - `chromeStatus: "INCLUDED" or "NOT_YET_INCLUDED" or "NOT_INCLUDED" or 4 more`

      The inclusion status of a Certificate Authority (CA) in the trust store.

      - `"INCLUDED"`

      - `"NOT_YET_INCLUDED"`

      - `"NOT_INCLUDED"`

      - `"NOT_BEFORE"`

      - `"REMOVED"`

      - `"DISABLED"`

      - `"BLOCKED"`

    - `country: string`

      The two-letter ISO country code where the CA organization is based.

    - `countryName: string`

      The full country name corresponding to the country code.

    - `microsoftStatus: "INCLUDED" or "NOT_YET_INCLUDED" or "NOT_INCLUDED" or 4 more`

      The inclusion status of a Certificate Authority (CA) in the trust store.

      - `"INCLUDED"`

      - `"NOT_YET_INCLUDED"`

      - `"NOT_INCLUDED"`

      - `"NOT_BEFORE"`

      - `"REMOVED"`

      - `"DISABLED"`

      - `"BLOCKED"`

    - `mozillaStatus: "INCLUDED" or "NOT_YET_INCLUDED" or "NOT_INCLUDED" or 4 more`

      The inclusion status of a Certificate Authority (CA) in the trust store.

      - `"INCLUDED"`

      - `"NOT_YET_INCLUDED"`

      - `"NOT_INCLUDED"`

      - `"NOT_BEFORE"`

      - `"REMOVED"`

      - `"DISABLED"`

      - `"BLOCKED"`

    - `name: string`

      The full name of the certificate authority (CA).

    - `owner: string`

      The organization that owns and operates the CA.

    - `parentName: string`

      The name of the parent/root certificate authority that issued this intermediate certificate.

    - `parentSha256Fingerprint: string`

      The SHA-256 fingerprint of the parent certificate.

    - `related: array of object { certificateRecordType, name, revocationStatus, sha256Fingerprint }`

      CAs from the same owner.

      - `certificateRecordType: "ROOT_CERTIFICATE" or "INTERMEDIATE_CERTIFICATE"`

        Specifies the type of certificate in the trust chain.

        - `"ROOT_CERTIFICATE"`

        - `"INTERMEDIATE_CERTIFICATE"`

      - `name: string`

        The full name of the certificate authority (CA).

      - `revocationStatus: "NOT_REVOKED" or "REVOKED" or "PARENT_CERT_REVOKED"`

        The current revocation status of a Certificate Authority (CA) certificate.

        - `"NOT_REVOKED"`

        - `"REVOKED"`

        - `"PARENT_CERT_REVOKED"`

      - `sha256Fingerprint: string`

        The SHA-256 fingerprint of the intermediate certificate.

    - `revocationStatus: "NOT_REVOKED" or "REVOKED" or "PARENT_CERT_REVOKED"`

      The current revocation status of a Certificate Authority (CA) certificate.

      - `"NOT_REVOKED"`

      - `"REVOKED"`

      - `"PARENT_CERT_REVOKED"`

    - `sha256Fingerprint: string`

      The SHA-256 fingerprint of the intermediate certificate.

    - `subjectKeyIdentifier: string`

      The subjectKeyIdentifier value extracted from the certificate PEM.

    - `validFrom: string`

      The start date of the certificate’s validity period (ISO format).

    - `validTo: string`

      The end date of the certificate’s validity period (ISO format).

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/ct/authorities/$CA_SLUG \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "certificateAuthority": {
      "appleStatus": "INCLUDED",
      "authorityKeyIdentifier": "1TkcnFtvBKqilUzvIN0pdKTFRXE",
      "certificateRecordType": "ROOT_CERTIFICATE",
      "chromeStatus": "INCLUDED",
      "country": "PT",
      "countryName": "Portugal",
      "microsoftStatus": "INCLUDED",
      "mozillaStatus": "INCLUDED",
      "name": "MULTICERT Advanced Certification Authority 005",
      "owner": "MULTICERT",
      "parentName": "MULTICERT Root Certification Authority 01",
      "parentSha256Fingerprint": "604D32D036895AED3BFEFAEB727C009EC0F2B3CDFA42A1C71730E6A72C3BE9D4",
      "related": [
        {
          "certificateRecordType": "ROOT_CERTIFICATE",
          "name": "MULTICERT Advanced Certification Authority 005",
          "revocationStatus": "NOT_REVOKED",
          "sha256Fingerprint": "24EDD4E503A8D3FDB5FFB4AF66C887359901CBE687A5A0760D10A08EED99A7C3"
        }
      ],
      "revocationStatus": "NOT_REVOKED",
      "sha256Fingerprint": "24EDD4E503A8D3FDB5FFB4AF66C887359901CBE687A5A0760D10A08EED99A7C3",
      "subjectKeyIdentifier": "VbqXmCURhMmiMtD7nFY6iCr4z",
      "validFrom": "2019-12-09",
      "validTo": "2032-06-08"
    }
  },
  "success": true
}
```
