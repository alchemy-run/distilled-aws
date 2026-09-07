# SSL

# Analyze

## Analyze Certificate

**post** `/zones/{zone_id}/ssl/analyze`

Returns the set of hostnames, the signature algorithm, and the expiration date of the certificate.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `bundle_method: optional BundleMethod`

  A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

  - `"ubiquitous"`

  - `"optimal"`

  - `"force"`

- `certificate: optional string`

  The zone's SSL certificate or certificate and the intermediate(s).

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

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/analyze \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "bundle_method": "ubiquitous",
          "certificate": "-----BEGIN CERTIFICATE-----\\nMIIDtTCCAp2gAwIBAgIJAMHAwfXZ5/PWMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV\\nBAYTAkFVMRMwEQYDVQQIEwpTb21lLVN0YXRlMSEwHwYDVQQKExhJbnRlcm5ldCBX\\naWRnaXRzIFB0eSBMdGQwHhcNMTYwODI0MTY0MzAxWhcNMTYxMTIyMTY0MzAxWjBF\\nMQswCQYDVQQGEwJBVTETMBEGA1UECBMKU29tZS1TdGF0ZTEhMB8GA1UEChMYSW50\\nZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB\\nCgKCAQEAwQHoetcl9+5ikGzV6cMzWtWPJHqXT3wpbEkRU9Yz7lgvddmGdtcGbg/1\\nCGZu0jJGkMoppoUo4c3dts3iwqRYmBikUP77wwY2QGmDZw2FvkJCJlKnabIRuGvB\\nKwzESIXgKk2016aTP6/dAjEHyo6SeoK8lkIySUvK0fyOVlsiEsCmOpidtnKX/a+5\\n0GjB79CJH4ER2lLVZnhePFR/zUOyPxZQQ4naHf7yu/b5jhO0f8fwt+pyFxIXjbEI\\ndZliWRkRMtzrHOJIhrmJ2A1J7iOrirbbwillwjjNVUWPf3IJ3M12S9pEewooaeO2\\nizNTERcG9HzAacbVRn2Y2SWIyT/18QIDAQABo4GnMIGkMB0GA1UdDgQWBBT/LbE4\\n9rWf288N6sJA5BRb6FJIGDB1BgNVHSMEbjBsgBT/LbE49rWf288N6sJA5BRb6FJI\\nGKFJpEcwRTELMAkGA1UEBhMCQVUxEzARBgNVBAgTClNvbWUtU3RhdGUxITAfBgNV\\nBAoTGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZIIJAMHAwfXZ5/PWMAwGA1UdEwQF\\nMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHHFwl0tH0quUYZYO0dZYt4R7SJ0pCm2\\n2satiyzHl4OnXcHDpekAo7/a09c6Lz6AU83cKy/+x3/djYHXWba7HpEu0dR3ugQP\\nMlr4zrhd9xKZ0KZKiYmtJH+ak4OM4L3FbT0owUZPyjLSlhMtJVcoRp5CJsjAMBUG\\nSvD8RX+T01wzox/Qb+lnnNnOlaWpqu8eoOenybxKp1a9ULzIVvN/LAcc+14vioFq\\n2swRWtmocBAs8QR9n4uvbpiYvS8eYueDCWMM4fvFfBhaDZ3N9IbtySh3SpFdQDhw\\nYbjM2rxXiyLGxB4Bol7QTv4zHif7Zt89FReT/NBy4rzaskDJY5L6xmY=\\n-----END CERTIFICATE-----\\n"
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
  "result": {}
}
```

## Domain Types

### Analyze Create Response

- `AnalyzeCreateResponse = unknown`

# Certificate Packs

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

## Get Certificate Pack

**get** `/zones/{zone_id}/ssl/certificate_packs/{certificate_pack_id}`

For a given zone, get a certificate pack.

### Path Parameters

- `zone_id: string`

  Identifier.

- `certificate_pack_id: string`

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

- `result: optional object { id, certificates, hosts, 10 more }`

  A certificate pack with all its properties.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/certificate_packs/$CERTIFICATE_PACK_ID \
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
}
```

## Order Advanced Certificate Manager Certificate Pack

**post** `/zones/{zone_id}/ssl/certificate_packs/order`

For a given zone, order an advanced certificate pack.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `certificate_authority: "google" or "lets_encrypt" or "ssl_com"`

  Certificate Authority selected for the order.  For information on any certificate authority specific details or restrictions [see this page for more details](https://developers.cloudflare.com/ssl/reference/certificate-authorities).

  - `"google"`

  - `"lets_encrypt"`

  - `"ssl_com"`

- `hosts: array of Host`

  Comma separated list of valid host names for the certificate packs. Must contain the zone apex, may not contain more than 50 hosts, and may not be empty.

- `type: "advanced"`

  Type of certificate pack.

  - `"advanced"`

- `validation_method: "txt" or "http" or "email"`

  Validation Method selected for the order.

  - `"txt"`

  - `"http"`

  - `"email"`

- `validity_days: 14 or 30 or 90 or 365`

  Validity Days selected for the order.

  - `14`

  - `30`

  - `90`

  - `365`

- `cloudflare_branding: optional boolean`

  Whether or not to add Cloudflare Branding for the order.  This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to true.

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

- `result: optional object { id, certificates, hosts, 10 more }`

  A certificate pack with all its properties.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/certificate_packs/order \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "certificate_authority": "lets_encrypt",
          "hosts": [
            "example.com",
            "*.example.com",
            "www.example.com"
          ],
          "type": "advanced",
          "validation_method": "txt",
          "validity_days": 14
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
}
```

## Restart Validation or Update Advanced Certificate Manager Certificate Pack

**patch** `/zones/{zone_id}/ssl/certificate_packs/{certificate_pack_id}`

For a given zone, restart validation or add cloudflare branding for an advanced certificate pack.  The former is only a validation operation for a Certificate Pack in a validation_timed_out status.

### Path Parameters

- `zone_id: string`

  Identifier.

- `certificate_pack_id: string`

  Identifier.

### Body Parameters

- `cloudflare_branding: optional boolean`

  Whether or not to add Cloudflare Branding for the order.  This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to true.

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

- `result: optional object { id, certificates, hosts, 10 more }`

  A certificate pack with all its properties.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/certificate_packs/$CERTIFICATE_PACK_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
}
```

## Delete Advanced Certificate Manager Certificate Pack

**delete** `/zones/{zone_id}/ssl/certificate_packs/{certificate_pack_id}`

For a given zone, delete an advanced certificate pack.

### Path Parameters

- `zone_id: string`

  Identifier.

- `certificate_pack_id: string`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/certificate_packs/$CERTIFICATE_PACK_ID \
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

### Host

- `Host = string`

### Request Validity

- `RequestValidity = 7 or 30 or 90 or 4 more`

  The number of days for which the certificate should be valid.

  - `7`

  - `30`

  - `90`

  - `365`

  - `730`

  - `1095`

  - `5475`

### Status

- `Status = "initializing" or "pending_validation" or "deleted" or 18 more`

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

### Validation Method

- `ValidationMethod = "http" or "cname" or "txt"`

  Validation method in use for a certificate pack order.

  - `"http"`

  - `"cname"`

  - `"txt"`

### Certificate Pack List Response

- `CertificatePackListResponse object { id, certificates, hosts, 10 more }`

  A certificate pack with all its properties.

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

### Certificate Pack Get Response

- `CertificatePackGetResponse object { id, certificates, hosts, 10 more }`

  A certificate pack with all its properties.

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

### Certificate Pack Create Response

- `CertificatePackCreateResponse object { id, certificates, hosts, 10 more }`

  A certificate pack with all its properties.

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

### Certificate Pack Edit Response

- `CertificatePackEditResponse object { id, certificates, hosts, 10 more }`

  A certificate pack with all its properties.

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

### Certificate Pack Delete Response

- `CertificatePackDeleteResponse object { id }`

  - `id: optional string`

    Identifier.

# Quota

## Get Certificate Pack Quotas

**get** `/zones/{zone_id}/ssl/certificate_packs/quota`

For a given zone, list certificate pack quotas.

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

- `result: optional object { advanced }`

  - `advanced: optional object { allocated, used }`

    - `allocated: optional number`

      Quantity Allocated.

    - `used: optional number`

      Quantity Used.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/certificate_packs/quota \
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
    "advanced": {
      "allocated": 0,
      "used": 0
    }
  }
}
```

## Domain Types

### Quota Get Response

- `QuotaGetResponse object { advanced }`

  - `advanced: optional object { allocated, used }`

    - `allocated: optional number`

      Quantity Allocated.

    - `used: optional number`

      Quantity Used.

# Recommendations

# Automatic Upgrader

## Get Automatic SSL/TLS enrollment status for the given zone

**get** `/zones/{zone_id}/settings/ssl_automatic_mode`

If the system is enabled, the response will include next_scheduled_scan, representing the next time this zone will be scanned and the zone's ssl/tls encryption mode is potentially upgraded by the system. If the system is disabled, next_scheduled_scan will not be present in the response body.

### Path Parameters

- `zone_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: object { id, editable, modified_on, 2 more }`

  - `id: string`

  - `editable: boolean`

    Whether this setting can be updated or not.

  - `modified_on: string`

    Last time this setting was modified.

  - `value: "auto" or "custom"`

    Current setting of the automatic SSL/TLS.

    - `"auto"`

    - `"custom"`

  - `next_scheduled_scan: optional string`

    Next time this zone will be scanned by the Automatic SSL/TLS.

- `success: boolean`

  Indicates the API call's success or failure.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/ssl_automatic_mode \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "editable": true,
    "id": "ssl_automatic_mode",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "next_scheduled_scan": "2014-02-01T05:20:00.12345Z",
    "value": "auto"
  },
  "success": true
}
```

## Patch Automatic SSL/TLS Enrollment status for given zone

**patch** `/zones/{zone_id}/settings/ssl_automatic_mode`

The automatic system is enabled when this endpoint is hit with value in the request body is set to "auto", and disabled when the request body value is set to "custom".

### Path Parameters

- `zone_id: string`

### Body Parameters

- `value: "auto" or "custom"`

  Controls enablement of Automatic SSL/TLS.

  - `"auto"`

  - `"custom"`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: object { id, editable, modified_on, 2 more }`

  - `id: string`

  - `editable: boolean`

    Whether this setting can be updated or not.

  - `modified_on: string`

    Last time this setting was modified.

  - `value: "auto" or "custom"`

    Current setting of the automatic SSL/TLS.

    - `"auto"`

    - `"custom"`

  - `next_scheduled_scan: optional string`

    Next time this zone will be scanned by the Automatic SSL/TLS.

- `success: boolean`

  Indicates the API call's success or failure.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/ssl_automatic_mode \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "value": "auto"
        }'
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "editable": true,
    "id": "ssl_automatic_mode",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "next_scheduled_scan": "2014-02-01T05:20:00.12345Z",
    "value": "auto"
  },
  "success": true
}
```

## Domain Types

### Automatic Upgrader Get Response

- `AutomaticUpgraderGetResponse object { id, editable, modified_on, 2 more }`

  - `id: string`

  - `editable: boolean`

    Whether this setting can be updated or not.

  - `modified_on: string`

    Last time this setting was modified.

  - `value: "auto" or "custom"`

    Current setting of the automatic SSL/TLS.

    - `"auto"`

    - `"custom"`

  - `next_scheduled_scan: optional string`

    Next time this zone will be scanned by the Automatic SSL/TLS.

### Automatic Upgrader Patch Response

- `AutomaticUpgraderPatchResponse object { id, editable, modified_on, 2 more }`

  - `id: string`

  - `editable: boolean`

    Whether this setting can be updated or not.

  - `modified_on: string`

    Last time this setting was modified.

  - `value: "auto" or "custom"`

    Current setting of the automatic SSL/TLS.

    - `"auto"`

    - `"custom"`

  - `next_scheduled_scan: optional string`

    Next time this zone will be scanned by the Automatic SSL/TLS.

# Auto Origin TLS Kex

## Get Auto-Origin TLS KEX enrollment status for the given zone

**get** `/zones/{zone_id}/settings/auto_origin_tls_kex`

When enabled, Cloudflare automatically selects the preferred TLS key-exchange algorithm to use when establishing the TLS connection to the zone's origin, picking from the algorithms permitted by the zone's `origin_tls_compliance_modes` setting. When disabled, the default key-exchange ordering is used.

### Path Parameters

- `zone_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: object { id, enabled, modified_on }`

  - `id: string`

  - `enabled: boolean`

    Whether Auto-Origin TLS KEX selection is enabled for the zone.

  - `modified_on: string`

    Last time this setting was modified.

- `success: boolean`

  Indicates the API call's success or failure.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/auto_origin_tls_kex \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "enabled": false,
    "id": "auto_origin_tls_kex",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  },
  "success": true
}
```

## Patch Auto-Origin TLS KEX enrollment status for the given zone

**patch** `/zones/{zone_id}/settings/auto_origin_tls_kex`

Enable or disable Auto-Origin TLS KEX selection for the zone by sending `{"enabled": true}` or `{"enabled": false}`. When enabled, Cloudflare runs a periodic scan of the zone's origins to determine the preferred key-exchange algorithm and writes that preference to the edge so it is sent first in the TLS ClientHello to the origin.

### Path Parameters

- `zone_id: string`

### Body Parameters

- `enabled: boolean`

  Controls enablement of Auto-Origin TLS KEX selection for the zone.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: object { id, enabled, modified_on }`

  - `id: string`

  - `enabled: boolean`

    Whether Auto-Origin TLS KEX selection is enabled for the zone.

  - `modified_on: string`

    Last time this setting was modified.

- `success: boolean`

  Indicates the API call's success or failure.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/auto_origin_tls_kex \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true
        }'
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "enabled": false,
    "id": "auto_origin_tls_kex",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  },
  "success": true
}
```

## Domain Types

### Auto Origin TLS Kex Get Response

- `AutoOriginTLSKexGetResponse object { id, enabled, modified_on }`

  - `id: string`

  - `enabled: boolean`

    Whether Auto-Origin TLS KEX selection is enabled for the zone.

  - `modified_on: string`

    Last time this setting was modified.

### Auto Origin TLS Kex Edit Response

- `AutoOriginTLSKexEditResponse object { id, enabled, modified_on }`

  - `id: string`

  - `enabled: boolean`

    Whether Auto-Origin TLS KEX selection is enabled for the zone.

  - `modified_on: string`

    Last time this setting was modified.

# Universal

# Settings

## Universal SSL Settings Details

**get** `/zones/{zone_id}/ssl/universal/settings`

Get Universal SSL Settings for a Zone.

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

- `result: optional UniversalSSLSettings`

  - `enabled: optional boolean`

    Disabling Universal SSL removes any currently active Universal SSL certificates for your zone from the edge and prevents any future Universal SSL certificates from being ordered. If there are no advanced certificates or custom certificates uploaded for the domain, visitors will be unable to access the domain over HTTPS.

    By disabling Universal SSL, you understand that the following Cloudflare settings and preferences will result in visitors being unable to visit your domain unless you have uploaded a custom certificate or purchased an advanced certificate.

    * HSTS
    * Always Use HTTPS
    * Opportunistic Encryption
    * Onion Routing
    * Any Page Rules redirecting traffic to HTTPS

    Similarly, any HTTP redirect to HTTPS at the origin while the Cloudflare proxy is enabled will result in users being unable to visit your site without a valid certificate at Cloudflare's edge.

    If you do not have a valid custom or advanced certificate at Cloudflare's edge and are unsure if any of the above Cloudflare settings are enabled, or if any HTTP redirects exist at your origin, we advise leaving Universal SSL enabled for your domain.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/universal/settings \
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
    "enabled": true
  }
}
```

## Edit Universal SSL Settings

**patch** `/zones/{zone_id}/ssl/universal/settings`

Patch Universal SSL Settings for a Zone.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `enabled: optional boolean`

  Disabling Universal SSL removes any currently active Universal SSL certificates for your zone from the edge and prevents any future Universal SSL certificates from being ordered. If there are no advanced certificates or custom certificates uploaded for the domain, visitors will be unable to access the domain over HTTPS.

  By disabling Universal SSL, you understand that the following Cloudflare settings and preferences will result in visitors being unable to visit your domain unless you have uploaded a custom certificate or purchased an advanced certificate.

  * HSTS
  * Always Use HTTPS
  * Opportunistic Encryption
  * Onion Routing
  * Any Page Rules redirecting traffic to HTTPS

  Similarly, any HTTP redirect to HTTPS at the origin while the Cloudflare proxy is enabled will result in users being unable to visit your site without a valid certificate at Cloudflare's edge.

  If you do not have a valid custom or advanced certificate at Cloudflare's edge and are unsure if any of the above Cloudflare settings are enabled, or if any HTTP redirects exist at your origin, we advise leaving Universal SSL enabled for your domain.

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

- `result: optional UniversalSSLSettings`

  - `enabled: optional boolean`

    Disabling Universal SSL removes any currently active Universal SSL certificates for your zone from the edge and prevents any future Universal SSL certificates from being ordered. If there are no advanced certificates or custom certificates uploaded for the domain, visitors will be unable to access the domain over HTTPS.

    By disabling Universal SSL, you understand that the following Cloudflare settings and preferences will result in visitors being unable to visit your domain unless you have uploaded a custom certificate or purchased an advanced certificate.

    * HSTS
    * Always Use HTTPS
    * Opportunistic Encryption
    * Onion Routing
    * Any Page Rules redirecting traffic to HTTPS

    Similarly, any HTTP redirect to HTTPS at the origin while the Cloudflare proxy is enabled will result in users being unable to visit your site without a valid certificate at Cloudflare's edge.

    If you do not have a valid custom or advanced certificate at Cloudflare's edge and are unsure if any of the above Cloudflare settings are enabled, or if any HTTP redirects exist at your origin, we advise leaving Universal SSL enabled for your domain.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/universal/settings \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true
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
    "enabled": true
  }
}
```

## Domain Types

### Universal SSL Settings

- `UniversalSSLSettings object { enabled }`

  - `enabled: optional boolean`

    Disabling Universal SSL removes any currently active Universal SSL certificates for your zone from the edge and prevents any future Universal SSL certificates from being ordered. If there are no advanced certificates or custom certificates uploaded for the domain, visitors will be unable to access the domain over HTTPS.

    By disabling Universal SSL, you understand that the following Cloudflare settings and preferences will result in visitors being unable to visit your domain unless you have uploaded a custom certificate or purchased an advanced certificate.

    * HSTS
    * Always Use HTTPS
    * Opportunistic Encryption
    * Onion Routing
    * Any Page Rules redirecting traffic to HTTPS

    Similarly, any HTTP redirect to HTTPS at the origin while the Cloudflare proxy is enabled will result in users being unable to visit your site without a valid certificate at Cloudflare's edge.

    If you do not have a valid custom or advanced certificate at Cloudflare's edge and are unsure if any of the above Cloudflare settings are enabled, or if any HTTP redirects exist at your origin, we advise leaving Universal SSL enabled for your domain.

# Verification

## SSL Verification Details

**get** `/zones/{zone_id}/ssl/verification`

Get SSL Verification Info for a Zone.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `retry: optional true`

  Immediately retry SSL Verification.

  - `true`

### Returns

- `result: optional array of Verification`

  - `certificate_status: "initializing" or "authorizing" or "active" or 4 more`

    Current status of certificate.

    - `"initializing"`

    - `"authorizing"`

    - `"active"`

    - `"expired"`

    - `"issuing"`

    - `"timing_out"`

    - `"pending_deployment"`

  - `brand_check: optional boolean`

    Certificate Authority is manually reviewing the order.

  - `cert_pack_uuid: optional string`

    Certificate Pack UUID.

  - `signature: optional "ECDSAWithSHA256" or "SHA1WithRSA" or "SHA256WithRSA"`

    Certificate's signature algorithm.

    - `"ECDSAWithSHA256"`

    - `"SHA1WithRSA"`

    - `"SHA256WithRSA"`

  - `validation_method: optional ValidationMethod`

    Validation method in use for a certificate pack order.

    - `"http"`

    - `"cname"`

    - `"txt"`

  - `verification_info: optional object { record_name, record_target }`

    Certificate's required verification information.

    - `record_name: optional "record_name" or "http_url" or "cname" or "txt_name"`

      Name of CNAME record.

      - `"record_name"`

      - `"http_url"`

      - `"cname"`

      - `"txt_name"`

    - `record_target: optional "record_value" or "http_body" or "cname_target" or "txt_value"`

      Target of CNAME record.

      - `"record_value"`

      - `"http_body"`

      - `"cname_target"`

      - `"txt_value"`

  - `verification_status: optional boolean`

    Status of the required verification information, omitted if verification status is unknown.

  - `verification_type: optional "cname" or "meta tag"`

    Method of verification.

    - `"cname"`

    - `"meta tag"`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/verification \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "certificate_status": "active",
      "brand_check": false,
      "cert_pack_uuid": "a77f8bd7-3b47-46b4-a6f1-75cf98109948",
      "signature": "ECDSAWithSHA256",
      "validation_method": "txt",
      "verification_info": {
        "record_name": "record_name",
        "record_target": "record_value"
      },
      "verification_status": true,
      "verification_type": "cname"
    }
  ]
}
```

## Edit SSL Certificate Pack Validation Method

**patch** `/zones/{zone_id}/ssl/verification/{certificate_pack_id}`

Edit SSL validation method for a certificate pack. A PATCH request will request an immediate validation check on any certificate, and return the updated status. If a validation method is provided, the validation will be immediately attempted using that method.

### Path Parameters

- `zone_id: string`

  Identifier.

- `certificate_pack_id: string`

  Certificate Pack UUID.

### Body Parameters

- `validation_method: "http" or "cname" or "txt" or "email"`

  Desired validation method.

  - `"http"`

  - `"cname"`

  - `"txt"`

  - `"email"`

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

- `result: optional object { status, validation_method }`

  - `status: optional string`

    Result status.

  - `validation_method: optional "http" or "cname" or "txt" or "email"`

    Desired validation method.

    - `"http"`

    - `"cname"`

    - `"txt"`

    - `"email"`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/verification/$CERTIFICATE_PACK_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "validation_method": "txt"
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
    "status": "pending_validation",
    "validation_method": "txt"
  }
}
```

## Domain Types

### Verification

- `Verification object { certificate_status, brand_check, cert_pack_uuid, 5 more }`

  - `certificate_status: "initializing" or "authorizing" or "active" or 4 more`

    Current status of certificate.

    - `"initializing"`

    - `"authorizing"`

    - `"active"`

    - `"expired"`

    - `"issuing"`

    - `"timing_out"`

    - `"pending_deployment"`

  - `brand_check: optional boolean`

    Certificate Authority is manually reviewing the order.

  - `cert_pack_uuid: optional string`

    Certificate Pack UUID.

  - `signature: optional "ECDSAWithSHA256" or "SHA1WithRSA" or "SHA256WithRSA"`

    Certificate's signature algorithm.

    - `"ECDSAWithSHA256"`

    - `"SHA1WithRSA"`

    - `"SHA256WithRSA"`

  - `validation_method: optional ValidationMethod`

    Validation method in use for a certificate pack order.

    - `"http"`

    - `"cname"`

    - `"txt"`

  - `verification_info: optional object { record_name, record_target }`

    Certificate's required verification information.

    - `record_name: optional "record_name" or "http_url" or "cname" or "txt_name"`

      Name of CNAME record.

      - `"record_name"`

      - `"http_url"`

      - `"cname"`

      - `"txt_name"`

    - `record_target: optional "record_value" or "http_body" or "cname_target" or "txt_value"`

      Target of CNAME record.

      - `"record_value"`

      - `"http_body"`

      - `"cname_target"`

      - `"txt_value"`

  - `verification_status: optional boolean`

    Status of the required verification information, omitted if verification status is unknown.

  - `verification_type: optional "cname" or "meta tag"`

    Method of verification.

    - `"cname"`

    - `"meta tag"`

### Verification Get Response

- `VerificationGetResponse = array of Verification`

  - `certificate_status: "initializing" or "authorizing" or "active" or 4 more`

    Current status of certificate.

    - `"initializing"`

    - `"authorizing"`

    - `"active"`

    - `"expired"`

    - `"issuing"`

    - `"timing_out"`

    - `"pending_deployment"`

  - `brand_check: optional boolean`

    Certificate Authority is manually reviewing the order.

  - `cert_pack_uuid: optional string`

    Certificate Pack UUID.

  - `signature: optional "ECDSAWithSHA256" or "SHA1WithRSA" or "SHA256WithRSA"`

    Certificate's signature algorithm.

    - `"ECDSAWithSHA256"`

    - `"SHA1WithRSA"`

    - `"SHA256WithRSA"`

  - `validation_method: optional ValidationMethod`

    Validation method in use for a certificate pack order.

    - `"http"`

    - `"cname"`

    - `"txt"`

  - `verification_info: optional object { record_name, record_target }`

    Certificate's required verification information.

    - `record_name: optional "record_name" or "http_url" or "cname" or "txt_name"`

      Name of CNAME record.

      - `"record_name"`

      - `"http_url"`

      - `"cname"`

      - `"txt_name"`

    - `record_target: optional "record_value" or "http_body" or "cname_target" or "txt_value"`

      Target of CNAME record.

      - `"record_value"`

      - `"http_body"`

      - `"cname_target"`

      - `"txt_value"`

  - `verification_status: optional boolean`

    Status of the required verification information, omitted if verification status is unknown.

  - `verification_type: optional "cname" or "meta tag"`

    Method of verification.

    - `"cname"`

    - `"meta tag"`

### Verification Edit Response

- `VerificationEditResponse object { status, validation_method }`

  - `status: optional string`

    Result status.

  - `validation_method: optional "http" or "cname" or "txt" or "email"`

    Desired validation method.

    - `"http"`

    - `"cname"`

    - `"txt"`

    - `"email"`
