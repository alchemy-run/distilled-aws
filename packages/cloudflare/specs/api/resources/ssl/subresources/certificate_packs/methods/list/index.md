## List Certificate Packs

**get** `/zones/{zone_id}/ssl/certificate_packs`

For a given zone, list all active certificate packs.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `deploy: optional "staging" or "production"`

  Specify the deployment environment for the certificate packs.

  - `"staging"`

  - `"production"`

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of certificate packs per page.

- `status: optional "all"`

  Include Certificate Packs of all statuses, not just active ones.

  - `"all"`

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

- `result: optional array of object { id, certificates, hosts, 10 more }`

  - `id: string`

    Identifier.

  - `certificates: array of object { id, hosts, status, 9 more }`

    Array of certificates in this pack.

    - `id: string`

      Certificate identifier.

    - `hosts: array of string`

      Hostnames covered by this certificate.

    - `status: string`

      Certificate status.

    - `bundle_method: optional string`

      Certificate bundle method.

    - `expires_on: optional string`

      When the certificate from the authority expires.

    - `geo_restrictions: optional object { label }`

      Specify the region where your private key can be held locally.

      - `label: optional "us" or "eu" or "highest_security"`

        - `"us"`

        - `"eu"`

        - `"highest_security"`

    - `issuer: optional string`

      The certificate authority that issued the certificate.

    - `modified_on: optional string`

      When the certificate was last modified.

    - `priority: optional number`

      The order/priority in which the certificate will be used.

    - `signature: optional string`

      The type of hash used for the certificate.

    - `uploaded_on: optional string`

      When the certificate was uploaded to Cloudflare.

    - `zone_id: optional string`

      Identifier.

  - `hosts: array of Host`

    Comma separated list of valid host names for the certificate packs. Must contain the zone apex, may not contain more than 50 hosts, and may not be empty.

  - `status: Status`

    Status of certificate pack.

    - `"initializing"`

    - `"pending_validation"`

    - `"deleted"`

    - `"pending_issuance"`

    - `"pending_deployment"`

    - `"pending_deletion"`

    - `"pending_expiration"`

    - `"expired"`

    - `"active"`

    - `"initializing_timed_out"`

    - `"validation_timed_out"`

    - `"issuance_timed_out"`

    - `"deployment_timed_out"`

    - `"deletion_timed_out"`

    - `"pending_cleanup"`

    - `"staging_deployment"`

    - `"staging_active"`

    - `"deactivating"`

    - `"inactive"`

    - `"backup_issued"`

    - `"holding_deployment"`

  - `type: "mh_custom" or "managed_hostname" or "sni_custom" or 5 more`

    Type of certificate pack.

    - `"mh_custom"`

    - `"managed_hostname"`

    - `"sni_custom"`

    - `"universal"`

    - `"advanced"`

    - `"total_tls"`

    - `"keyless"`

    - `"legacy_custom"`

  - `certificate_authority: optional "google" or "lets_encrypt" or "ssl_com"`

    Certificate Authority selected for the order.  For information on any certificate authority specific details or restrictions [see this page for more details](https://developers.cloudflare.com/ssl/reference/certificate-authorities).

    - `"google"`

    - `"lets_encrypt"`

    - `"ssl_com"`

  - `cloudflare_branding: optional boolean`

    Whether or not to add Cloudflare Branding for the order.  This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to true.

  - `dcv_delegation_records: optional array of object { cname, cname_target, emails, 5 more }`

    DCV Delegation records for domain validation.

    - `cname: optional string`

      The CNAME record hostname for DCV delegation.

    - `cname_target: optional string`

      The CNAME record target value for DCV delegation.

    - `emails: optional array of string`

      The set of email addresses that the certificate authority (CA) will use to complete domain validation.

    - `http_body: optional string`

      The content that the certificate authority (CA) will expect to find at the http_url during the domain validation.

    - `http_url: optional string`

      The url that will be checked during domain validation.

    - `status: optional string`

      Status of the validation record.

    - `txt_name: optional string`

      The hostname that the certificate authority (CA) will check for a TXT record during domain validation .

    - `txt_value: optional string`

      The TXT record that the certificate authority (CA) will check during domain validation.

  - `primary_certificate: optional string`

    Identifier of the primary certificate in a pack.

  - `validation_errors: optional array of object { message }`

    Domain validation errors that have been received by the certificate authority (CA).

    - `message: optional string`

      A domain validation error.

  - `validation_method: optional "txt" or "http" or "email"`

    Validation Method selected for the order.

    - `"txt"`

    - `"http"`

    - `"email"`

  - `validation_records: optional array of object { cname, cname_target, emails, 5 more }`

    Certificates' validation records.

    - `cname: optional string`

      The CNAME record hostname for DCV delegation.

    - `cname_target: optional string`

      The CNAME record target value for DCV delegation.

    - `emails: optional array of string`

      The set of email addresses that the certificate authority (CA) will use to complete domain validation.

    - `http_body: optional string`

      The content that the certificate authority (CA) will expect to find at the http_url during the domain validation.

    - `http_url: optional string`

      The url that will be checked during domain validation.

    - `status: optional string`

      Status of the validation record.

    - `txt_name: optional string`

      The hostname that the certificate authority (CA) will check for a TXT record during domain validation .

    - `txt_value: optional string`

      The TXT record that the certificate authority (CA) will check during domain validation.

  - `validity_days: optional 14 or 30 or 90 or 365`

    Validity Days selected for the order.

    - `14`

    - `30`

    - `90`

    - `365`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/certificate_packs \
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "certificates": [
        {
          "id": "7e7b8deba8538af625850b7b2530034c",
          "hosts": [
            "example.com",
            "*.example.com"
          ],
          "status": "active",
          "bundle_method": "ubiquitous",
          "expires_on": "2024-01-01T00:00:00Z",
          "geo_restrictions": {
            "label": "us"
          },
          "issuer": "Let's Encrypt",
          "modified_on": "2014-01-01T05:20:00Z",
          "priority": 0,
          "signature": "ECDSAWithSHA256",
          "uploaded_on": "2014-01-01T05:20:00Z",
          "zone_id": "023e105f4ecef8ad9ca31a8372d0c353"
        }
      ],
      "hosts": [
        "example.com",
        "*.example.com",
        "www.example.com"
      ],
      "status": "initializing",
      "type": "universal",
      "certificate_authority": "lets_encrypt",
      "cloudflare_branding": false,
      "dcv_delegation_records": [
        {
          "cname": "_acme-challenge.example.com",
          "cname_target": "dcv.cloudflare.com",
          "emails": [
            "administrator@example.com",
            "webmaster@example.com"
          ],
          "http_body": "ca3-574923932a82475cb8592200f1a2a23d",
          "http_url": "http://app.example.com/.well-known/pki-validation/ca3-da12a1c25e7b48cf80408c6c1763b8a2.txt",
          "status": "pending",
          "txt_name": "_acme-challenge.app.example.com",
          "txt_value": "810b7d5f01154524b961ba0cd578acc2"
        }
      ],
      "primary_certificate": "7e7b8deba8538af625850b7b2530034c",
      "validation_errors": [
        {
          "message": "SERVFAIL looking up CAA for app.example.com"
        }
      ],
      "validation_method": "txt",
      "validation_records": [
        {
          "cname": "_acme-challenge.example.com",
          "cname_target": "dcv.cloudflare.com",
          "emails": [
            "administrator@example.com",
            "webmaster@example.com"
          ],
          "http_body": "ca3-574923932a82475cb8592200f1a2a23d",
          "http_url": "http://app.example.com/.well-known/pki-validation/ca3-da12a1c25e7b48cf80408c6c1763b8a2.txt",
          "status": "pending",
          "txt_name": "_acme-challenge.app.example.com",
          "txt_value": "810b7d5f01154524b961ba0cd578acc2"
        }
      ],
      "validity_days": 14
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
