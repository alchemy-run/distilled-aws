# Custom Hostnames

## List Custom Hostnames

**get** `/zones/{zone_id}/custom_hostnames`

List, search, sort, and filter all of your custom hostnames.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `id: optional string`

  Hostname ID to match against. This ID was generated and returned during the initial custom_hostname creation. This parameter cannot be used with the 'hostname', 'hostname.exact', 'hostname.contain', or 'hostname.startsWith' parameters.

- `certificate_authority: optional "google" or "lets_encrypt" or "ssl_com"`

  Filter by the certificate authority that issued the SSL certificate.

  - `"google"`

  - `"lets_encrypt"`

  - `"ssl_com"`

- `custom_origin_server: optional string`

  Filter by custom origin server name.

- `direction: optional "asc" or "desc"`

  Direction to order hostnames.

  - `"asc"`

  - `"desc"`

- `hostname: optional object { contain, exact, startsWith }`

  - `contain: optional string`

    Filters hostnames by a substring match on the hostname value. This parameter cannot be used with the 'id', 'hostname', 'hostname.exact', or 'hostname.startsWith' parameters.

  - `exact: optional string`

    Fully qualified domain name to match against. This parameter cannot be used with the 'id', 'hostname', 'hostname.contain', or 'hostname.startsWith' parameters.

  - `startsWith: optional string`

    Filters hostnames by a prefix match on the hostname value. This parameter cannot be used with the 'id', 'hostname', 'hostname.exact', or 'hostname.contain' parameters.

- `hostname_status: optional "active" or "pending" or "active_redeploying" or 13 more`

  Filter by the hostname's activation status.

  - `"active"`

  - `"pending"`

  - `"active_redeploying"`

  - `"moved"`

  - `"pending_deletion"`

  - `"deleted"`

  - `"pending_blocked"`

  - `"pending_migration"`

  - `"pending_provisioned"`

  - `"test_pending"`

  - `"test_active"`

  - `"test_active_apex"`

  - `"test_blocked"`

  - `"test_failed"`

  - `"provisioned"`

  - `"blocked"`

- `order: optional "ssl" or "ssl_status"`

  Field to order hostnames by.

  - `"ssl"`

  - `"ssl_status"`

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of hostnames per page.

- `ssl: optional 0 or 1`

  Whether to filter hostnames based on if they have SSL enabled.

  - `0`

  - `1`

- `ssl_status: optional "initializing" or "pending_validation" or "deleted" or 18 more`

  Filter by SSL certificate status.

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

- `wildcard: optional boolean`

  Filter by whether the custom hostname is a wildcard hostname.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

  Informational messages returned by the custom hostname API.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional array of object { id, hostname, created_at, 8 more }`

  - `id: string`

    Identifier.

  - `hostname: string`

    The custom hostname that will point to your hostname via CNAME.

  - `created_at: optional string`

    This is the time the hostname was created.

  - `custom_metadata: optional map[string]`

    Unique key/value metadata for this hostname. These are per-hostname (customer) settings.

  - `custom_origin_server: optional string`

    a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.

  - `custom_origin_sni: optional string`

    A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom origin server name or the string ':request_host_header:' which will cause the host header in the request to be used as SNI. Not configurable with default/fallback origin server.

  - `ownership_verification: optional object { name, type, value }`

    This is a record which can be placed to activate a hostname.

    - `name: optional string`

      DNS Name for record.

    - `type: optional "txt"`

      DNS Record type.

      - `"txt"`

    - `value: optional string`

      Content for the record.

  - `ownership_verification_http: optional object { http_body, http_url }`

    This presents the token to be served by the given http url to activate a hostname.

    - `http_body: optional string`

      Token to be served.

    - `http_url: optional string`

      The HTTP URL that will be checked during custom hostname verification and where the customer should host the token.

  - `ssl: optional object { id, bundle_method, certificate_authority, 17 more }`

    - `id: optional string`

      Custom hostname SSL identifier tag.

    - `bundle_method: optional BundleMethod`

      A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

      - `"ubiquitous"`

      - `"optimal"`

      - `"force"`

    - `certificate_authority: optional CertificateCA`

      The Certificate Authority that will issue the certificate.

      - `"digicert"`

      - `"google"`

      - `"lets_encrypt"`

      - `"ssl_com"`

    - `custom_certificate: optional string`

      If a custom uploaded certificate is used.

    - `custom_csr_id: optional string`

      The identifier for the Custom CSR that was used.

    - `custom_key: optional string`

      The key for a custom uploaded certificate.

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

    - `expires_on: optional string`

      The time the custom certificate expires on.

    - `hosts: optional array of string`

      A list of Hostnames on a custom uploaded certificate.

    - `issuer: optional string`

      The issuer on a custom uploaded certificate.

    - `method: optional DCVMethod`

      Domain control validation (DCV) method used for this hostname.

      - `"http"`

      - `"txt"`

      - `"email"`

    - `serial_number: optional string`

      The serial number on a custom uploaded certificate.

    - `settings: optional object { ciphers, early_hints, http2, 2 more }`

      - `ciphers: optional array of string`

        An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

      - `early_hints: optional "on" or "off"`

        Whether or not Early Hints is enabled.

        - `"on"`

        - `"off"`

      - `http2: optional "on" or "off"`

        Whether or not HTTP2 is enabled.

        - `"on"`

        - `"off"`

      - `min_tls_version: optional "1.0" or "1.1" or "1.2" or "1.3"`

        The minimum TLS version supported.

        - `"1.0"`

        - `"1.1"`

        - `"1.2"`

        - `"1.3"`

      - `tls_1_3: optional "on" or "off"`

        Whether or not TLS 1.3 is enabled.

        - `"on"`

        - `"off"`

    - `signature: optional string`

      The signature on a custom uploaded certificate.

    - `status: optional "initializing" or "pending_validation" or "deleted" or 18 more`

      Status of the hostname's SSL certificates.

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

    - `type: optional DomainValidationType`

      Level of validation to be used for this hostname. Domain validation (dv) must be used.

      - `"dv"`

    - `uploaded_on: optional string`

      The time the custom certificate was uploaded.

    - `validation_errors: optional array of object { message }`

      Domain validation errors that have been received by the certificate authority (CA).

      - `message: optional string`

        A domain validation error.

    - `validation_records: optional array of object { cname, cname_target, emails, 5 more }`

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

    - `wildcard: optional boolean`

      Indicates whether the certificate covers a wildcard.

  - `status: optional "active" or "pending" or "active_redeploying" or 13 more`

    Status of the hostname's activation.

    - `"active"`

    - `"pending"`

    - `"active_redeploying"`

    - `"moved"`

    - `"pending_deletion"`

    - `"deleted"`

    - `"pending_blocked"`

    - `"pending_migration"`

    - `"pending_provisioned"`

    - `"test_pending"`

    - `"test_active"`

    - `"test_active_apex"`

    - `"test_blocked"`

    - `"test_failed"`

    - `"provisioned"`

    - `"blocked"`

  - `verification_errors: optional array of string`

    These are errors that were encountered while trying to activate a hostname.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames \
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
    "string"
  ],
  "success": true,
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "hostname": "app.example.com",
      "created_at": "2020-02-06T18:11:23.531995Z",
      "custom_metadata": {
        "foo": "string"
      },
      "custom_origin_server": "origin2.example.com",
      "custom_origin_sni": "sni.example.com",
      "ownership_verification": {
        "name": "_cf-custom-hostname.app.example.com",
        "type": "txt",
        "value": "5cc07c04-ea62-4a5a-95f0-419334a875a4"
      },
      "ownership_verification_http": {
        "http_body": "5cc07c04-ea62-4a5a-95f0-419334a875a4",
        "http_url": "http://custom.test.com/.well-known/cf-custom-hostname-challenge/0d89c70d-ad9f-4843-b99f-6cc0252067e9"
      },
      "ssl": {
        "id": "0d89c70d-ad9f-4843-b99f-6cc0252067e9",
        "bundle_method": "ubiquitous",
        "certificate_authority": "google",
        "custom_certificate": "-----BEGIN CERTIFICATE-----\nMIIFJDCCBAygAwIBAgIQD0ifmj/Yi5NP/2gdUySbfzANBgkqhkiG9w0BAQsFADBN\nMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMScwJQYDVQQDEx5E...SzSHfXp5lnu/3V08I72q1QNzOCgY1XeL4GKVcj4or6cT6tX6oJH7ePPmfrBfqI/O\nOeH8gMJ+FuwtXYEPa4hBf38M5eU5xWG7\n-----END CERTIFICATE-----\n",
        "custom_csr_id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752",
        "custom_key": "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAwQHoetcl9+5ikGzV6cMzWtWPJHqXT3wpbEkRU9Yz7lgvddmG\ndtcGbg/1CGZu0jJGkMoppoUo4c3dts3iwqRYmBikUP77wwY2QGmDZw2FvkJCJlKn\nabIRuGvBKwzESIXgKk2016aTP6/dAjEHyo6SeoK8lkIySUvK0fyOVlsiEsCmOpid\ntnKX/a+50GjB79CJH4ER2lLVZnhePFR/zUOyPxZQQ4naHf7yu/b5jhO0f8fwt+py\nFxIXjbEIdZliWRkRMtzrHOJIhrmJ2A1J7iOrirbbwillwjjNVUWPf3IJ3M12S9pE\newooaeO2izNTERcG9HzAacbVRn2Y2SWIyT/18QIDAQABAoIBACbhTYXBZYKmYPCb\nHBR1IBlCQA2nLGf0qRuJNJZg5iEzXows/6tc8YymZkQE7nolapWsQ+upk2y5Xdp/\naxiuprIs9JzkYK8Ox0r+dlwCG1kSW+UAbX0bQ/qUqlsTvU6muVuMP8vZYHxJ3wmb\n+ufRBKztPTQ/rYWaYQcgC0RWI20HTFBMxlTAyNxYNWzX7RKFkGVVyB9RsAtmcc8g\n+j4OdosbfNoJPS0HeIfNpAznDfHKdxDk2Yc1tV6RHBrC1ynyLE9+TaflIAdo2MVv\nKLMLq51GqYKtgJFIlBRPQqKoyXdz3fGvXrTkf/WY9QNq0J1Vk5ERePZ54mN8iZB7\n9lwy/AkCgYEA6FXzosxswaJ2wQLeoYc7ceaweX/SwTvxHgXzRyJIIT0eJWgx13Wo\n/WA3Iziimsjf6qE+SI/8laxPp2A86VMaIt3Z3mJN/CqSVGw8LK2AQst+OwdPyDMu\niacE8lj/IFGC8mwNUAb9CzGU3JpU4PxxGFjS/eMtGeRXCWkK4NE+G08CgYEA1Kp9\nN2JrVlqUz+gAX+LPmE9OEMAS9WQSQsfCHGogIFDGGcNf7+uwBM7GAaSJIP01zcoe\nVAgWdzXCv3FLhsaZoJ6RyLOLay5phbu1iaTr4UNYm5WtYTzMzqh8l1+MFFDl9xDB\nvULuCIIrglM5MeS/qnSg1uMoH2oVPj9TVst/ir8CgYEAxrI7Ws9Zc4Bt70N1As+U\nlySjaEVZCMkqvHJ6TCuVZFfQoE0r0whdLdRLU2PsLFP+q7qaeZQqgBaNSKeVcDYR\n9B+nY/jOmQoPewPVsp/vQTCnE/R81spu0mp0YI6cIheT1Z9zAy322svcc43JaWB7\nmEbeqyLOP4Z4qSOcmghZBSECgYACvR9Xs0DGn+wCsW4vze/2ei77MD4OQvepPIFX\ndFZtlBy5ADcgE9z0cuVB6CiL8DbdK5kwY9pGNr8HUCI03iHkW6Zs+0L0YmihfEVe\nPG19PSzK9CaDdhD9KFZSbLyVFmWfxOt50H7YRTTiPMgjyFpfi5j2q348yVT0tEQS\nfhRqaQKBgAcWPokmJ7EbYQGeMbS7HC8eWO/RyamlnSffdCdSc7ue3zdVJxpAkQ8W\nqu80pEIF6raIQfAf8MXiiZ7auFOSnHQTXUbhCpvDLKi0Mwq3G8Pl07l+2s6dQG6T\nlv6XTQaMyf6n1yjzL+fzDrH3qXMxHMO/b13EePXpDMpY7HQpoLDi\n-----END RSA PRIVATE KEY-----\n",
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
        "expires_on": "2021-02-06T18:11:23.531995Z",
        "hosts": [
          "app.example.com",
          "*.app.example.com"
        ],
        "issuer": "DigiCertInc",
        "method": "http",
        "serial_number": "6743787633689793699141714808227354901",
        "settings": {
          "ciphers": [
            "ECDHE-RSA-AES128-GCM-SHA256",
            "AES128-SHA"
          ],
          "early_hints": "on",
          "http2": "on",
          "min_tls_version": "1.2",
          "tls_1_3": "on"
        },
        "signature": "SHA256WithRSA",
        "status": "pending_validation",
        "type": "dv",
        "uploaded_on": "2020-02-06T18:11:23.531995Z",
        "validation_errors": [
          {
            "message": "SERVFAIL looking up CAA for app.example.com"
          }
        ],
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
        "wildcard": false
      },
      "status": "pending",
      "verification_errors": [
        "None of the A or AAAA records are owned by this account and the pre-generated ownership verification token was not found."
      ]
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

## Custom Hostname Details

**get** `/zones/{zone_id}/custom_hostnames/{custom_hostname_id}`

Retrieves detailed information about a specific custom hostname, including SSL certificate status, ownership verification, and origin configuration.

### Path Parameters

- `zone_id: string`

  Identifier.

- `custom_hostname_id: string`

  Identifier.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

  Informational messages returned by the custom hostname API.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { id, hostname, created_at, 8 more }`

  - `id: string`

    Identifier.

  - `hostname: string`

    The custom hostname that will point to your hostname via CNAME.

  - `created_at: optional string`

    This is the time the hostname was created.

  - `custom_metadata: optional map[string]`

    Unique key/value metadata for this hostname. These are per-hostname (customer) settings.

  - `custom_origin_server: optional string`

    a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.

  - `custom_origin_sni: optional string`

    A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom origin server name or the string ':request_host_header:' which will cause the host header in the request to be used as SNI. Not configurable with default/fallback origin server.

  - `ownership_verification: optional object { name, type, value }`

    This is a record which can be placed to activate a hostname.

    - `name: optional string`

      DNS Name for record.

    - `type: optional "txt"`

      DNS Record type.

      - `"txt"`

    - `value: optional string`

      Content for the record.

  - `ownership_verification_http: optional object { http_body, http_url }`

    This presents the token to be served by the given http url to activate a hostname.

    - `http_body: optional string`

      Token to be served.

    - `http_url: optional string`

      The HTTP URL that will be checked during custom hostname verification and where the customer should host the token.

  - `ssl: optional object { id, bundle_method, certificate_authority, 17 more }`

    - `id: optional string`

      Custom hostname SSL identifier tag.

    - `bundle_method: optional BundleMethod`

      A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

      - `"ubiquitous"`

      - `"optimal"`

      - `"force"`

    - `certificate_authority: optional CertificateCA`

      The Certificate Authority that will issue the certificate.

      - `"digicert"`

      - `"google"`

      - `"lets_encrypt"`

      - `"ssl_com"`

    - `custom_certificate: optional string`

      If a custom uploaded certificate is used.

    - `custom_csr_id: optional string`

      The identifier for the Custom CSR that was used.

    - `custom_key: optional string`

      The key for a custom uploaded certificate.

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

    - `expires_on: optional string`

      The time the custom certificate expires on.

    - `hosts: optional array of string`

      A list of Hostnames on a custom uploaded certificate.

    - `issuer: optional string`

      The issuer on a custom uploaded certificate.

    - `method: optional DCVMethod`

      Domain control validation (DCV) method used for this hostname.

      - `"http"`

      - `"txt"`

      - `"email"`

    - `serial_number: optional string`

      The serial number on a custom uploaded certificate.

    - `settings: optional object { ciphers, early_hints, http2, 2 more }`

      - `ciphers: optional array of string`

        An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

      - `early_hints: optional "on" or "off"`

        Whether or not Early Hints is enabled.

        - `"on"`

        - `"off"`

      - `http2: optional "on" or "off"`

        Whether or not HTTP2 is enabled.

        - `"on"`

        - `"off"`

      - `min_tls_version: optional "1.0" or "1.1" or "1.2" or "1.3"`

        The minimum TLS version supported.

        - `"1.0"`

        - `"1.1"`

        - `"1.2"`

        - `"1.3"`

      - `tls_1_3: optional "on" or "off"`

        Whether or not TLS 1.3 is enabled.

        - `"on"`

        - `"off"`

    - `signature: optional string`

      The signature on a custom uploaded certificate.

    - `status: optional "initializing" or "pending_validation" or "deleted" or 18 more`

      Status of the hostname's SSL certificates.

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

    - `type: optional DomainValidationType`

      Level of validation to be used for this hostname. Domain validation (dv) must be used.

      - `"dv"`

    - `uploaded_on: optional string`

      The time the custom certificate was uploaded.

    - `validation_errors: optional array of object { message }`

      Domain validation errors that have been received by the certificate authority (CA).

      - `message: optional string`

        A domain validation error.

    - `validation_records: optional array of object { cname, cname_target, emails, 5 more }`

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

    - `wildcard: optional boolean`

      Indicates whether the certificate covers a wildcard.

  - `status: optional "active" or "pending" or "active_redeploying" or 13 more`

    Status of the hostname's activation.

    - `"active"`

    - `"pending"`

    - `"active_redeploying"`

    - `"moved"`

    - `"pending_deletion"`

    - `"deleted"`

    - `"pending_blocked"`

    - `"pending_migration"`

    - `"pending_provisioned"`

    - `"test_pending"`

    - `"test_active"`

    - `"test_active_apex"`

    - `"test_blocked"`

    - `"test_failed"`

    - `"provisioned"`

    - `"blocked"`

  - `verification_errors: optional array of string`

    These are errors that were encountered while trying to activate a hostname.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/$CUSTOM_HOSTNAME_ID \
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
    "string"
  ],
  "success": true,
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "hostname": "app.example.com",
    "created_at": "2020-02-06T18:11:23.531995Z",
    "custom_metadata": {
      "foo": "string"
    },
    "custom_origin_server": "origin2.example.com",
    "custom_origin_sni": "sni.example.com",
    "ownership_verification": {
      "name": "_cf-custom-hostname.app.example.com",
      "type": "txt",
      "value": "5cc07c04-ea62-4a5a-95f0-419334a875a4"
    },
    "ownership_verification_http": {
      "http_body": "5cc07c04-ea62-4a5a-95f0-419334a875a4",
      "http_url": "http://custom.test.com/.well-known/cf-custom-hostname-challenge/0d89c70d-ad9f-4843-b99f-6cc0252067e9"
    },
    "ssl": {
      "id": "0d89c70d-ad9f-4843-b99f-6cc0252067e9",
      "bundle_method": "ubiquitous",
      "certificate_authority": "google",
      "custom_certificate": "-----BEGIN CERTIFICATE-----\nMIIFJDCCBAygAwIBAgIQD0ifmj/Yi5NP/2gdUySbfzANBgkqhkiG9w0BAQsFADBN\nMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMScwJQYDVQQDEx5E...SzSHfXp5lnu/3V08I72q1QNzOCgY1XeL4GKVcj4or6cT6tX6oJH7ePPmfrBfqI/O\nOeH8gMJ+FuwtXYEPa4hBf38M5eU5xWG7\n-----END CERTIFICATE-----\n",
      "custom_csr_id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752",
      "custom_key": "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAwQHoetcl9+5ikGzV6cMzWtWPJHqXT3wpbEkRU9Yz7lgvddmG\ndtcGbg/1CGZu0jJGkMoppoUo4c3dts3iwqRYmBikUP77wwY2QGmDZw2FvkJCJlKn\nabIRuGvBKwzESIXgKk2016aTP6/dAjEHyo6SeoK8lkIySUvK0fyOVlsiEsCmOpid\ntnKX/a+50GjB79CJH4ER2lLVZnhePFR/zUOyPxZQQ4naHf7yu/b5jhO0f8fwt+py\nFxIXjbEIdZliWRkRMtzrHOJIhrmJ2A1J7iOrirbbwillwjjNVUWPf3IJ3M12S9pE\newooaeO2izNTERcG9HzAacbVRn2Y2SWIyT/18QIDAQABAoIBACbhTYXBZYKmYPCb\nHBR1IBlCQA2nLGf0qRuJNJZg5iEzXows/6tc8YymZkQE7nolapWsQ+upk2y5Xdp/\naxiuprIs9JzkYK8Ox0r+dlwCG1kSW+UAbX0bQ/qUqlsTvU6muVuMP8vZYHxJ3wmb\n+ufRBKztPTQ/rYWaYQcgC0RWI20HTFBMxlTAyNxYNWzX7RKFkGVVyB9RsAtmcc8g\n+j4OdosbfNoJPS0HeIfNpAznDfHKdxDk2Yc1tV6RHBrC1ynyLE9+TaflIAdo2MVv\nKLMLq51GqYKtgJFIlBRPQqKoyXdz3fGvXrTkf/WY9QNq0J1Vk5ERePZ54mN8iZB7\n9lwy/AkCgYEA6FXzosxswaJ2wQLeoYc7ceaweX/SwTvxHgXzRyJIIT0eJWgx13Wo\n/WA3Iziimsjf6qE+SI/8laxPp2A86VMaIt3Z3mJN/CqSVGw8LK2AQst+OwdPyDMu\niacE8lj/IFGC8mwNUAb9CzGU3JpU4PxxGFjS/eMtGeRXCWkK4NE+G08CgYEA1Kp9\nN2JrVlqUz+gAX+LPmE9OEMAS9WQSQsfCHGogIFDGGcNf7+uwBM7GAaSJIP01zcoe\nVAgWdzXCv3FLhsaZoJ6RyLOLay5phbu1iaTr4UNYm5WtYTzMzqh8l1+MFFDl9xDB\nvULuCIIrglM5MeS/qnSg1uMoH2oVPj9TVst/ir8CgYEAxrI7Ws9Zc4Bt70N1As+U\nlySjaEVZCMkqvHJ6TCuVZFfQoE0r0whdLdRLU2PsLFP+q7qaeZQqgBaNSKeVcDYR\n9B+nY/jOmQoPewPVsp/vQTCnE/R81spu0mp0YI6cIheT1Z9zAy322svcc43JaWB7\nmEbeqyLOP4Z4qSOcmghZBSECgYACvR9Xs0DGn+wCsW4vze/2ei77MD4OQvepPIFX\ndFZtlBy5ADcgE9z0cuVB6CiL8DbdK5kwY9pGNr8HUCI03iHkW6Zs+0L0YmihfEVe\nPG19PSzK9CaDdhD9KFZSbLyVFmWfxOt50H7YRTTiPMgjyFpfi5j2q348yVT0tEQS\nfhRqaQKBgAcWPokmJ7EbYQGeMbS7HC8eWO/RyamlnSffdCdSc7ue3zdVJxpAkQ8W\nqu80pEIF6raIQfAf8MXiiZ7auFOSnHQTXUbhCpvDLKi0Mwq3G8Pl07l+2s6dQG6T\nlv6XTQaMyf6n1yjzL+fzDrH3qXMxHMO/b13EePXpDMpY7HQpoLDi\n-----END RSA PRIVATE KEY-----\n",
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
      "expires_on": "2021-02-06T18:11:23.531995Z",
      "hosts": [
        "app.example.com",
        "*.app.example.com"
      ],
      "issuer": "DigiCertInc",
      "method": "http",
      "serial_number": "6743787633689793699141714808227354901",
      "settings": {
        "ciphers": [
          "ECDHE-RSA-AES128-GCM-SHA256",
          "AES128-SHA"
        ],
        "early_hints": "on",
        "http2": "on",
        "min_tls_version": "1.2",
        "tls_1_3": "on"
      },
      "signature": "SHA256WithRSA",
      "status": "pending_validation",
      "type": "dv",
      "uploaded_on": "2020-02-06T18:11:23.531995Z",
      "validation_errors": [
        {
          "message": "SERVFAIL looking up CAA for app.example.com"
        }
      ],
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
      "wildcard": false
    },
    "status": "pending",
    "verification_errors": [
      "None of the A or AAAA records are owned by this account and the pre-generated ownership verification token was not found."
    ]
  }
}
```

## Create Custom Hostname

**post** `/zones/{zone_id}/custom_hostnames`

Add a new custom hostname and request that an SSL certificate be issued for it. One of three validation methods—http, txt, email—should be used, with 'http' recommended if the CNAME is already in place (or will be soon). Specifying 'email' will send an email to the WHOIS contacts on file for the base domain plus hostmaster, postmaster, webmaster, admin, administrator. If http is used and the domain is not already pointing to the Managed CNAME host, the PATCH method must be used once it is (to complete validation).  Enable bundling of certificates using the custom_cert_bundle field. The bundling process requires the following condition One certificate in the bundle must use an RSA, and the other must use an ECDSA.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `hostname: string`

  The custom hostname that will point to your hostname via CNAME.

- `custom_metadata: optional map[string]`

  Unique key/value metadata for this hostname. These are per-hostname (customer) settings.

- `ssl: optional object { bundle_method, certificate_authority, cloudflare_branding, 8 more }`

  SSL properties used when creating the custom hostname.

  - `bundle_method: optional BundleMethod`

    A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

    - `"ubiquitous"`

    - `"optimal"`

    - `"force"`

  - `certificate_authority: optional CertificateCA`

    The Certificate Authority that will issue the certificate.

    - `"digicert"`

    - `"google"`

    - `"lets_encrypt"`

    - `"ssl_com"`

  - `cloudflare_branding: optional boolean`

    Whether or not to add Cloudflare Branding for the order.  This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to true.

  - `custom_cert_bundle: optional array of object { custom_certificate, custom_key }`

    Array of custom certificate and key pairs (1 or 2 pairs allowed).

    - `custom_certificate: string`

      If a custom uploaded certificate is used.

    - `custom_key: string`

      The key for a custom uploaded certificate.

  - `custom_certificate: optional string`

    If a custom uploaded certificate is used.

  - `custom_csr_id: optional string`

    The identifier for the Custom CSR that was used.

  - `custom_key: optional string`

    The key for a custom uploaded certificate.

  - `method: optional DCVMethod`

    Domain control validation (DCV) method used for this hostname.

    - `"http"`

    - `"txt"`

    - `"email"`

  - `settings: optional object { ciphers, early_hints, http2, 2 more }`

    SSL specific settings.

    - `ciphers: optional array of string`

      An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

    - `early_hints: optional "on" or "off"`

      Whether or not Early Hints is enabled.

      - `"on"`

      - `"off"`

    - `http2: optional "on" or "off"`

      Whether or not HTTP2 is enabled.

      - `"on"`

      - `"off"`

    - `min_tls_version: optional "1.0" or "1.1" or "1.2" or "1.3"`

      The minimum TLS version supported.

      - `"1.0"`

      - `"1.1"`

      - `"1.2"`

      - `"1.3"`

    - `tls_1_3: optional "on" or "off"`

      Whether or not TLS 1.3 is enabled.

      - `"on"`

      - `"off"`

  - `type: optional DomainValidationType`

    Level of validation to be used for this hostname. Domain validation (dv) must be used.

    - `"dv"`

  - `wildcard: optional boolean`

    Indicates whether the certificate covers a wildcard.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

  Informational messages returned by the custom hostname API.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { id, hostname, created_at, 8 more }`

  - `id: string`

    Identifier.

  - `hostname: string`

    The custom hostname that will point to your hostname via CNAME.

  - `created_at: optional string`

    This is the time the hostname was created.

  - `custom_metadata: optional map[string]`

    Unique key/value metadata for this hostname. These are per-hostname (customer) settings.

  - `custom_origin_server: optional string`

    a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.

  - `custom_origin_sni: optional string`

    A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom origin server name or the string ':request_host_header:' which will cause the host header in the request to be used as SNI. Not configurable with default/fallback origin server.

  - `ownership_verification: optional object { name, type, value }`

    This is a record which can be placed to activate a hostname.

    - `name: optional string`

      DNS Name for record.

    - `type: optional "txt"`

      DNS Record type.

      - `"txt"`

    - `value: optional string`

      Content for the record.

  - `ownership_verification_http: optional object { http_body, http_url }`

    This presents the token to be served by the given http url to activate a hostname.

    - `http_body: optional string`

      Token to be served.

    - `http_url: optional string`

      The HTTP URL that will be checked during custom hostname verification and where the customer should host the token.

  - `ssl: optional object { id, bundle_method, certificate_authority, 17 more }`

    - `id: optional string`

      Custom hostname SSL identifier tag.

    - `bundle_method: optional BundleMethod`

      A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

      - `"ubiquitous"`

      - `"optimal"`

      - `"force"`

    - `certificate_authority: optional CertificateCA`

      The Certificate Authority that will issue the certificate.

      - `"digicert"`

      - `"google"`

      - `"lets_encrypt"`

      - `"ssl_com"`

    - `custom_certificate: optional string`

      If a custom uploaded certificate is used.

    - `custom_csr_id: optional string`

      The identifier for the Custom CSR that was used.

    - `custom_key: optional string`

      The key for a custom uploaded certificate.

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

    - `expires_on: optional string`

      The time the custom certificate expires on.

    - `hosts: optional array of string`

      A list of Hostnames on a custom uploaded certificate.

    - `issuer: optional string`

      The issuer on a custom uploaded certificate.

    - `method: optional DCVMethod`

      Domain control validation (DCV) method used for this hostname.

      - `"http"`

      - `"txt"`

      - `"email"`

    - `serial_number: optional string`

      The serial number on a custom uploaded certificate.

    - `settings: optional object { ciphers, early_hints, http2, 2 more }`

      - `ciphers: optional array of string`

        An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

      - `early_hints: optional "on" or "off"`

        Whether or not Early Hints is enabled.

        - `"on"`

        - `"off"`

      - `http2: optional "on" or "off"`

        Whether or not HTTP2 is enabled.

        - `"on"`

        - `"off"`

      - `min_tls_version: optional "1.0" or "1.1" or "1.2" or "1.3"`

        The minimum TLS version supported.

        - `"1.0"`

        - `"1.1"`

        - `"1.2"`

        - `"1.3"`

      - `tls_1_3: optional "on" or "off"`

        Whether or not TLS 1.3 is enabled.

        - `"on"`

        - `"off"`

    - `signature: optional string`

      The signature on a custom uploaded certificate.

    - `status: optional "initializing" or "pending_validation" or "deleted" or 18 more`

      Status of the hostname's SSL certificates.

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

    - `type: optional DomainValidationType`

      Level of validation to be used for this hostname. Domain validation (dv) must be used.

      - `"dv"`

    - `uploaded_on: optional string`

      The time the custom certificate was uploaded.

    - `validation_errors: optional array of object { message }`

      Domain validation errors that have been received by the certificate authority (CA).

      - `message: optional string`

        A domain validation error.

    - `validation_records: optional array of object { cname, cname_target, emails, 5 more }`

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

    - `wildcard: optional boolean`

      Indicates whether the certificate covers a wildcard.

  - `status: optional "active" or "pending" or "active_redeploying" or 13 more`

    Status of the hostname's activation.

    - `"active"`

    - `"pending"`

    - `"active_redeploying"`

    - `"moved"`

    - `"pending_deletion"`

    - `"deleted"`

    - `"pending_blocked"`

    - `"pending_migration"`

    - `"pending_provisioned"`

    - `"test_pending"`

    - `"test_active"`

    - `"test_active_apex"`

    - `"test_blocked"`

    - `"test_failed"`

    - `"provisioned"`

    - `"blocked"`

  - `verification_errors: optional array of string`

    These are errors that were encountered while trying to activate a hostname.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "hostname": "app.example.com"
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
    "string"
  ],
  "success": true,
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "hostname": "app.example.com",
    "created_at": "2020-02-06T18:11:23.531995Z",
    "custom_metadata": {
      "foo": "string"
    },
    "custom_origin_server": "origin2.example.com",
    "custom_origin_sni": "sni.example.com",
    "ownership_verification": {
      "name": "_cf-custom-hostname.app.example.com",
      "type": "txt",
      "value": "5cc07c04-ea62-4a5a-95f0-419334a875a4"
    },
    "ownership_verification_http": {
      "http_body": "5cc07c04-ea62-4a5a-95f0-419334a875a4",
      "http_url": "http://custom.test.com/.well-known/cf-custom-hostname-challenge/0d89c70d-ad9f-4843-b99f-6cc0252067e9"
    },
    "ssl": {
      "id": "0d89c70d-ad9f-4843-b99f-6cc0252067e9",
      "bundle_method": "ubiquitous",
      "certificate_authority": "google",
      "custom_certificate": "-----BEGIN CERTIFICATE-----\nMIIFJDCCBAygAwIBAgIQD0ifmj/Yi5NP/2gdUySbfzANBgkqhkiG9w0BAQsFADBN\nMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMScwJQYDVQQDEx5E...SzSHfXp5lnu/3V08I72q1QNzOCgY1XeL4GKVcj4or6cT6tX6oJH7ePPmfrBfqI/O\nOeH8gMJ+FuwtXYEPa4hBf38M5eU5xWG7\n-----END CERTIFICATE-----\n",
      "custom_csr_id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752",
      "custom_key": "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAwQHoetcl9+5ikGzV6cMzWtWPJHqXT3wpbEkRU9Yz7lgvddmG\ndtcGbg/1CGZu0jJGkMoppoUo4c3dts3iwqRYmBikUP77wwY2QGmDZw2FvkJCJlKn\nabIRuGvBKwzESIXgKk2016aTP6/dAjEHyo6SeoK8lkIySUvK0fyOVlsiEsCmOpid\ntnKX/a+50GjB79CJH4ER2lLVZnhePFR/zUOyPxZQQ4naHf7yu/b5jhO0f8fwt+py\nFxIXjbEIdZliWRkRMtzrHOJIhrmJ2A1J7iOrirbbwillwjjNVUWPf3IJ3M12S9pE\newooaeO2izNTERcG9HzAacbVRn2Y2SWIyT/18QIDAQABAoIBACbhTYXBZYKmYPCb\nHBR1IBlCQA2nLGf0qRuJNJZg5iEzXows/6tc8YymZkQE7nolapWsQ+upk2y5Xdp/\naxiuprIs9JzkYK8Ox0r+dlwCG1kSW+UAbX0bQ/qUqlsTvU6muVuMP8vZYHxJ3wmb\n+ufRBKztPTQ/rYWaYQcgC0RWI20HTFBMxlTAyNxYNWzX7RKFkGVVyB9RsAtmcc8g\n+j4OdosbfNoJPS0HeIfNpAznDfHKdxDk2Yc1tV6RHBrC1ynyLE9+TaflIAdo2MVv\nKLMLq51GqYKtgJFIlBRPQqKoyXdz3fGvXrTkf/WY9QNq0J1Vk5ERePZ54mN8iZB7\n9lwy/AkCgYEA6FXzosxswaJ2wQLeoYc7ceaweX/SwTvxHgXzRyJIIT0eJWgx13Wo\n/WA3Iziimsjf6qE+SI/8laxPp2A86VMaIt3Z3mJN/CqSVGw8LK2AQst+OwdPyDMu\niacE8lj/IFGC8mwNUAb9CzGU3JpU4PxxGFjS/eMtGeRXCWkK4NE+G08CgYEA1Kp9\nN2JrVlqUz+gAX+LPmE9OEMAS9WQSQsfCHGogIFDGGcNf7+uwBM7GAaSJIP01zcoe\nVAgWdzXCv3FLhsaZoJ6RyLOLay5phbu1iaTr4UNYm5WtYTzMzqh8l1+MFFDl9xDB\nvULuCIIrglM5MeS/qnSg1uMoH2oVPj9TVst/ir8CgYEAxrI7Ws9Zc4Bt70N1As+U\nlySjaEVZCMkqvHJ6TCuVZFfQoE0r0whdLdRLU2PsLFP+q7qaeZQqgBaNSKeVcDYR\n9B+nY/jOmQoPewPVsp/vQTCnE/R81spu0mp0YI6cIheT1Z9zAy322svcc43JaWB7\nmEbeqyLOP4Z4qSOcmghZBSECgYACvR9Xs0DGn+wCsW4vze/2ei77MD4OQvepPIFX\ndFZtlBy5ADcgE9z0cuVB6CiL8DbdK5kwY9pGNr8HUCI03iHkW6Zs+0L0YmihfEVe\nPG19PSzK9CaDdhD9KFZSbLyVFmWfxOt50H7YRTTiPMgjyFpfi5j2q348yVT0tEQS\nfhRqaQKBgAcWPokmJ7EbYQGeMbS7HC8eWO/RyamlnSffdCdSc7ue3zdVJxpAkQ8W\nqu80pEIF6raIQfAf8MXiiZ7auFOSnHQTXUbhCpvDLKi0Mwq3G8Pl07l+2s6dQG6T\nlv6XTQaMyf6n1yjzL+fzDrH3qXMxHMO/b13EePXpDMpY7HQpoLDi\n-----END RSA PRIVATE KEY-----\n",
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
      "expires_on": "2021-02-06T18:11:23.531995Z",
      "hosts": [
        "app.example.com",
        "*.app.example.com"
      ],
      "issuer": "DigiCertInc",
      "method": "http",
      "serial_number": "6743787633689793699141714808227354901",
      "settings": {
        "ciphers": [
          "ECDHE-RSA-AES128-GCM-SHA256",
          "AES128-SHA"
        ],
        "early_hints": "on",
        "http2": "on",
        "min_tls_version": "1.2",
        "tls_1_3": "on"
      },
      "signature": "SHA256WithRSA",
      "status": "pending_validation",
      "type": "dv",
      "uploaded_on": "2020-02-06T18:11:23.531995Z",
      "validation_errors": [
        {
          "message": "SERVFAIL looking up CAA for app.example.com"
        }
      ],
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
      "wildcard": false
    },
    "status": "pending",
    "verification_errors": [
      "None of the A or AAAA records are owned by this account and the pre-generated ownership verification token was not found."
    ]
  }
}
```

## Edit Custom Hostname

**patch** `/zones/{zone_id}/custom_hostnames/{custom_hostname_id}`

Modify SSL configuration for a custom hostname. When sent with SSL config that matches existing config, used to indicate that hostname should pass domain control validation (DCV). Can also be used to change validation type, e.g., from 'http' to 'email'. Bundle an existing certificate with another certificate by using the "custom_cert_bundle" field. The bundling process supports combining certificates as long as the following condition is met. One certificate must use the RSA algorithm, and the other must use the ECDSA algorithm.

### Path Parameters

- `zone_id: string`

  Identifier.

- `custom_hostname_id: string`

  Identifier.

### Body Parameters

- `custom_metadata: optional map[string]`

  Unique key/value metadata for this hostname. These are per-hostname (customer) settings.

- `custom_origin_server: optional string`

  a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.

- `custom_origin_sni: optional string`

  A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom origin server name or the string ':request_host_header:' which will cause the host header in the request to be used as SNI. Not configurable with default/fallback origin server.

- `ssl: optional object { bundle_method, certificate_authority, cloudflare_branding, 8 more }`

  SSL properties used when creating the custom hostname.

  - `bundle_method: optional BundleMethod`

    A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

    - `"ubiquitous"`

    - `"optimal"`

    - `"force"`

  - `certificate_authority: optional CertificateCA`

    The Certificate Authority that will issue the certificate.

    - `"digicert"`

    - `"google"`

    - `"lets_encrypt"`

    - `"ssl_com"`

  - `cloudflare_branding: optional boolean`

    Whether or not to add Cloudflare Branding for the order.  This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to true.

  - `custom_cert_bundle: optional array of object { custom_certificate, custom_key }`

    Array of custom certificate and key pairs (1 or 2 pairs allowed).

    - `custom_certificate: string`

      If a custom uploaded certificate is used.

    - `custom_key: string`

      The key for a custom uploaded certificate.

  - `custom_certificate: optional string`

    If a custom uploaded certificate is used.

  - `custom_csr_id: optional string`

    The identifier for the Custom CSR that was used.

  - `custom_key: optional string`

    The key for a custom uploaded certificate.

  - `method: optional DCVMethod`

    Domain control validation (DCV) method used for this hostname.

    - `"http"`

    - `"txt"`

    - `"email"`

  - `settings: optional object { ciphers, early_hints, http2, 2 more }`

    SSL specific settings.

    - `ciphers: optional array of string`

      An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

    - `early_hints: optional "on" or "off"`

      Whether or not Early Hints is enabled.

      - `"on"`

      - `"off"`

    - `http2: optional "on" or "off"`

      Whether or not HTTP2 is enabled.

      - `"on"`

      - `"off"`

    - `min_tls_version: optional "1.0" or "1.1" or "1.2" or "1.3"`

      The minimum TLS version supported.

      - `"1.0"`

      - `"1.1"`

      - `"1.2"`

      - `"1.3"`

    - `tls_1_3: optional "on" or "off"`

      Whether or not TLS 1.3 is enabled.

      - `"on"`

      - `"off"`

  - `type: optional DomainValidationType`

    Level of validation to be used for this hostname. Domain validation (dv) must be used.

    - `"dv"`

  - `wildcard: optional boolean`

    Indicates whether the certificate covers a wildcard.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

  Informational messages returned by the custom hostname API.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { id, hostname, created_at, 8 more }`

  - `id: string`

    Identifier.

  - `hostname: string`

    The custom hostname that will point to your hostname via CNAME.

  - `created_at: optional string`

    This is the time the hostname was created.

  - `custom_metadata: optional map[string]`

    Unique key/value metadata for this hostname. These are per-hostname (customer) settings.

  - `custom_origin_server: optional string`

    a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.

  - `custom_origin_sni: optional string`

    A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom origin server name or the string ':request_host_header:' which will cause the host header in the request to be used as SNI. Not configurable with default/fallback origin server.

  - `ownership_verification: optional object { name, type, value }`

    This is a record which can be placed to activate a hostname.

    - `name: optional string`

      DNS Name for record.

    - `type: optional "txt"`

      DNS Record type.

      - `"txt"`

    - `value: optional string`

      Content for the record.

  - `ownership_verification_http: optional object { http_body, http_url }`

    This presents the token to be served by the given http url to activate a hostname.

    - `http_body: optional string`

      Token to be served.

    - `http_url: optional string`

      The HTTP URL that will be checked during custom hostname verification and where the customer should host the token.

  - `ssl: optional object { id, bundle_method, certificate_authority, 17 more }`

    - `id: optional string`

      Custom hostname SSL identifier tag.

    - `bundle_method: optional BundleMethod`

      A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

      - `"ubiquitous"`

      - `"optimal"`

      - `"force"`

    - `certificate_authority: optional CertificateCA`

      The Certificate Authority that will issue the certificate.

      - `"digicert"`

      - `"google"`

      - `"lets_encrypt"`

      - `"ssl_com"`

    - `custom_certificate: optional string`

      If a custom uploaded certificate is used.

    - `custom_csr_id: optional string`

      The identifier for the Custom CSR that was used.

    - `custom_key: optional string`

      The key for a custom uploaded certificate.

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

    - `expires_on: optional string`

      The time the custom certificate expires on.

    - `hosts: optional array of string`

      A list of Hostnames on a custom uploaded certificate.

    - `issuer: optional string`

      The issuer on a custom uploaded certificate.

    - `method: optional DCVMethod`

      Domain control validation (DCV) method used for this hostname.

      - `"http"`

      - `"txt"`

      - `"email"`

    - `serial_number: optional string`

      The serial number on a custom uploaded certificate.

    - `settings: optional object { ciphers, early_hints, http2, 2 more }`

      - `ciphers: optional array of string`

        An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

      - `early_hints: optional "on" or "off"`

        Whether or not Early Hints is enabled.

        - `"on"`

        - `"off"`

      - `http2: optional "on" or "off"`

        Whether or not HTTP2 is enabled.

        - `"on"`

        - `"off"`

      - `min_tls_version: optional "1.0" or "1.1" or "1.2" or "1.3"`

        The minimum TLS version supported.

        - `"1.0"`

        - `"1.1"`

        - `"1.2"`

        - `"1.3"`

      - `tls_1_3: optional "on" or "off"`

        Whether or not TLS 1.3 is enabled.

        - `"on"`

        - `"off"`

    - `signature: optional string`

      The signature on a custom uploaded certificate.

    - `status: optional "initializing" or "pending_validation" or "deleted" or 18 more`

      Status of the hostname's SSL certificates.

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

    - `type: optional DomainValidationType`

      Level of validation to be used for this hostname. Domain validation (dv) must be used.

      - `"dv"`

    - `uploaded_on: optional string`

      The time the custom certificate was uploaded.

    - `validation_errors: optional array of object { message }`

      Domain validation errors that have been received by the certificate authority (CA).

      - `message: optional string`

        A domain validation error.

    - `validation_records: optional array of object { cname, cname_target, emails, 5 more }`

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

    - `wildcard: optional boolean`

      Indicates whether the certificate covers a wildcard.

  - `status: optional "active" or "pending" or "active_redeploying" or 13 more`

    Status of the hostname's activation.

    - `"active"`

    - `"pending"`

    - `"active_redeploying"`

    - `"moved"`

    - `"pending_deletion"`

    - `"deleted"`

    - `"pending_blocked"`

    - `"pending_migration"`

    - `"pending_provisioned"`

    - `"test_pending"`

    - `"test_active"`

    - `"test_active_apex"`

    - `"test_blocked"`

    - `"test_failed"`

    - `"provisioned"`

    - `"blocked"`

  - `verification_errors: optional array of string`

    These are errors that were encountered while trying to activate a hostname.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/$CUSTOM_HOSTNAME_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "custom_origin_server": "origin2.example.com",
          "custom_origin_sni": "sni.example.com"
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
    "string"
  ],
  "success": true,
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "hostname": "app.example.com",
    "created_at": "2020-02-06T18:11:23.531995Z",
    "custom_metadata": {
      "foo": "string"
    },
    "custom_origin_server": "origin2.example.com",
    "custom_origin_sni": "sni.example.com",
    "ownership_verification": {
      "name": "_cf-custom-hostname.app.example.com",
      "type": "txt",
      "value": "5cc07c04-ea62-4a5a-95f0-419334a875a4"
    },
    "ownership_verification_http": {
      "http_body": "5cc07c04-ea62-4a5a-95f0-419334a875a4",
      "http_url": "http://custom.test.com/.well-known/cf-custom-hostname-challenge/0d89c70d-ad9f-4843-b99f-6cc0252067e9"
    },
    "ssl": {
      "id": "0d89c70d-ad9f-4843-b99f-6cc0252067e9",
      "bundle_method": "ubiquitous",
      "certificate_authority": "google",
      "custom_certificate": "-----BEGIN CERTIFICATE-----\nMIIFJDCCBAygAwIBAgIQD0ifmj/Yi5NP/2gdUySbfzANBgkqhkiG9w0BAQsFADBN\nMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMScwJQYDVQQDEx5E...SzSHfXp5lnu/3V08I72q1QNzOCgY1XeL4GKVcj4or6cT6tX6oJH7ePPmfrBfqI/O\nOeH8gMJ+FuwtXYEPa4hBf38M5eU5xWG7\n-----END CERTIFICATE-----\n",
      "custom_csr_id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752",
      "custom_key": "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAwQHoetcl9+5ikGzV6cMzWtWPJHqXT3wpbEkRU9Yz7lgvddmG\ndtcGbg/1CGZu0jJGkMoppoUo4c3dts3iwqRYmBikUP77wwY2QGmDZw2FvkJCJlKn\nabIRuGvBKwzESIXgKk2016aTP6/dAjEHyo6SeoK8lkIySUvK0fyOVlsiEsCmOpid\ntnKX/a+50GjB79CJH4ER2lLVZnhePFR/zUOyPxZQQ4naHf7yu/b5jhO0f8fwt+py\nFxIXjbEIdZliWRkRMtzrHOJIhrmJ2A1J7iOrirbbwillwjjNVUWPf3IJ3M12S9pE\newooaeO2izNTERcG9HzAacbVRn2Y2SWIyT/18QIDAQABAoIBACbhTYXBZYKmYPCb\nHBR1IBlCQA2nLGf0qRuJNJZg5iEzXows/6tc8YymZkQE7nolapWsQ+upk2y5Xdp/\naxiuprIs9JzkYK8Ox0r+dlwCG1kSW+UAbX0bQ/qUqlsTvU6muVuMP8vZYHxJ3wmb\n+ufRBKztPTQ/rYWaYQcgC0RWI20HTFBMxlTAyNxYNWzX7RKFkGVVyB9RsAtmcc8g\n+j4OdosbfNoJPS0HeIfNpAznDfHKdxDk2Yc1tV6RHBrC1ynyLE9+TaflIAdo2MVv\nKLMLq51GqYKtgJFIlBRPQqKoyXdz3fGvXrTkf/WY9QNq0J1Vk5ERePZ54mN8iZB7\n9lwy/AkCgYEA6FXzosxswaJ2wQLeoYc7ceaweX/SwTvxHgXzRyJIIT0eJWgx13Wo\n/WA3Iziimsjf6qE+SI/8laxPp2A86VMaIt3Z3mJN/CqSVGw8LK2AQst+OwdPyDMu\niacE8lj/IFGC8mwNUAb9CzGU3JpU4PxxGFjS/eMtGeRXCWkK4NE+G08CgYEA1Kp9\nN2JrVlqUz+gAX+LPmE9OEMAS9WQSQsfCHGogIFDGGcNf7+uwBM7GAaSJIP01zcoe\nVAgWdzXCv3FLhsaZoJ6RyLOLay5phbu1iaTr4UNYm5WtYTzMzqh8l1+MFFDl9xDB\nvULuCIIrglM5MeS/qnSg1uMoH2oVPj9TVst/ir8CgYEAxrI7Ws9Zc4Bt70N1As+U\nlySjaEVZCMkqvHJ6TCuVZFfQoE0r0whdLdRLU2PsLFP+q7qaeZQqgBaNSKeVcDYR\n9B+nY/jOmQoPewPVsp/vQTCnE/R81spu0mp0YI6cIheT1Z9zAy322svcc43JaWB7\nmEbeqyLOP4Z4qSOcmghZBSECgYACvR9Xs0DGn+wCsW4vze/2ei77MD4OQvepPIFX\ndFZtlBy5ADcgE9z0cuVB6CiL8DbdK5kwY9pGNr8HUCI03iHkW6Zs+0L0YmihfEVe\nPG19PSzK9CaDdhD9KFZSbLyVFmWfxOt50H7YRTTiPMgjyFpfi5j2q348yVT0tEQS\nfhRqaQKBgAcWPokmJ7EbYQGeMbS7HC8eWO/RyamlnSffdCdSc7ue3zdVJxpAkQ8W\nqu80pEIF6raIQfAf8MXiiZ7auFOSnHQTXUbhCpvDLKi0Mwq3G8Pl07l+2s6dQG6T\nlv6XTQaMyf6n1yjzL+fzDrH3qXMxHMO/b13EePXpDMpY7HQpoLDi\n-----END RSA PRIVATE KEY-----\n",
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
      "expires_on": "2021-02-06T18:11:23.531995Z",
      "hosts": [
        "app.example.com",
        "*.app.example.com"
      ],
      "issuer": "DigiCertInc",
      "method": "http",
      "serial_number": "6743787633689793699141714808227354901",
      "settings": {
        "ciphers": [
          "ECDHE-RSA-AES128-GCM-SHA256",
          "AES128-SHA"
        ],
        "early_hints": "on",
        "http2": "on",
        "min_tls_version": "1.2",
        "tls_1_3": "on"
      },
      "signature": "SHA256WithRSA",
      "status": "pending_validation",
      "type": "dv",
      "uploaded_on": "2020-02-06T18:11:23.531995Z",
      "validation_errors": [
        {
          "message": "SERVFAIL looking up CAA for app.example.com"
        }
      ],
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
      "wildcard": false
    },
    "status": "pending",
    "verification_errors": [
      "None of the A or AAAA records are owned by this account and the pre-generated ownership verification token was not found."
    ]
  }
}
```

## Delete Custom Hostname (and any issued SSL certificates)

**delete** `/zones/{zone_id}/custom_hostnames/{custom_hostname_id}`

Permanently deletes a custom hostname and revokes any SSL certificates that were issued for it. This action cannot be undone.

### Path Parameters

- `zone_id: string`

  Identifier.

- `custom_hostname_id: string`

  Identifier.

### Returns

- `id: optional string`

  Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/$CUSTOM_HOSTNAME_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "id": "023e105f4ecef8ad9ca31a8372d0c353"
}
```

## Domain Types

### Bundle Method

- `BundleMethod = "ubiquitous" or "optimal" or "force"`

  A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

  - `"ubiquitous"`

  - `"optimal"`

  - `"force"`

### Custom Hostname

- `CustomHostname object { id, hostname, created_at, 8 more }`

  - `id: string`

    Identifier.

  - `hostname: string`

    The custom hostname that will point to your hostname via CNAME.

  - `created_at: optional string`

    This is the time the hostname was created.

  - `custom_metadata: optional map[string]`

    Unique key/value metadata for this hostname. These are per-hostname (customer) settings.

  - `custom_origin_server: optional string`

    a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.

  - `custom_origin_sni: optional string`

    A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom origin server name or the string ':request_host_header:' which will cause the host header in the request to be used as SNI. Not configurable with default/fallback origin server.

  - `ownership_verification: optional object { name, type, value }`

    This is a record which can be placed to activate a hostname.

    - `name: optional string`

      DNS Name for record.

    - `type: optional "txt"`

      DNS Record type.

      - `"txt"`

    - `value: optional string`

      Content for the record.

  - `ownership_verification_http: optional object { http_body, http_url }`

    This presents the token to be served by the given http url to activate a hostname.

    - `http_body: optional string`

      Token to be served.

    - `http_url: optional string`

      The HTTP URL that will be checked during custom hostname verification and where the customer should host the token.

  - `ssl: optional object { id, bundle_method, certificate_authority, 17 more }`

    - `id: optional string`

      Custom hostname SSL identifier tag.

    - `bundle_method: optional BundleMethod`

      A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

      - `"ubiquitous"`

      - `"optimal"`

      - `"force"`

    - `certificate_authority: optional CertificateCA`

      The Certificate Authority that will issue the certificate.

      - `"digicert"`

      - `"google"`

      - `"lets_encrypt"`

      - `"ssl_com"`

    - `custom_certificate: optional string`

      If a custom uploaded certificate is used.

    - `custom_csr_id: optional string`

      The identifier for the Custom CSR that was used.

    - `custom_key: optional string`

      The key for a custom uploaded certificate.

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

    - `expires_on: optional string`

      The time the custom certificate expires on.

    - `hosts: optional array of string`

      A list of Hostnames on a custom uploaded certificate.

    - `issuer: optional string`

      The issuer on a custom uploaded certificate.

    - `method: optional DCVMethod`

      Domain control validation (DCV) method used for this hostname.

      - `"http"`

      - `"txt"`

      - `"email"`

    - `serial_number: optional string`

      The serial number on a custom uploaded certificate.

    - `settings: optional object { ciphers, early_hints, http2, 2 more }`

      - `ciphers: optional array of string`

        An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

      - `early_hints: optional "on" or "off"`

        Whether or not Early Hints is enabled.

        - `"on"`

        - `"off"`

      - `http2: optional "on" or "off"`

        Whether or not HTTP2 is enabled.

        - `"on"`

        - `"off"`

      - `min_tls_version: optional "1.0" or "1.1" or "1.2" or "1.3"`

        The minimum TLS version supported.

        - `"1.0"`

        - `"1.1"`

        - `"1.2"`

        - `"1.3"`

      - `tls_1_3: optional "on" or "off"`

        Whether or not TLS 1.3 is enabled.

        - `"on"`

        - `"off"`

    - `signature: optional string`

      The signature on a custom uploaded certificate.

    - `status: optional "initializing" or "pending_validation" or "deleted" or 18 more`

      Status of the hostname's SSL certificates.

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

    - `type: optional DomainValidationType`

      Level of validation to be used for this hostname. Domain validation (dv) must be used.

      - `"dv"`

    - `uploaded_on: optional string`

      The time the custom certificate was uploaded.

    - `validation_errors: optional array of object { message }`

      Domain validation errors that have been received by the certificate authority (CA).

      - `message: optional string`

        A domain validation error.

    - `validation_records: optional array of object { cname, cname_target, emails, 5 more }`

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

    - `wildcard: optional boolean`

      Indicates whether the certificate covers a wildcard.

  - `status: optional "active" or "pending" or "active_redeploying" or 13 more`

    Status of the hostname's activation.

    - `"active"`

    - `"pending"`

    - `"active_redeploying"`

    - `"moved"`

    - `"pending_deletion"`

    - `"deleted"`

    - `"pending_blocked"`

    - `"pending_migration"`

    - `"pending_provisioned"`

    - `"test_pending"`

    - `"test_active"`

    - `"test_active_apex"`

    - `"test_blocked"`

    - `"test_failed"`

    - `"provisioned"`

    - `"blocked"`

  - `verification_errors: optional array of string`

    These are errors that were encountered while trying to activate a hostname.

### DCV Method

- `DCVMethod = "http" or "txt" or "email"`

  Domain control validation (DCV) method used for this hostname.

  - `"http"`

  - `"txt"`

  - `"email"`

### Domain Validation Type

- `DomainValidationType = "dv"`

  Level of validation to be used for this hostname. Domain validation (dv) must be used.

  - `"dv"`

### Custom Hostname List Response

- `CustomHostnameListResponse object { id, hostname, created_at, 8 more }`

  - `id: string`

    Identifier.

  - `hostname: string`

    The custom hostname that will point to your hostname via CNAME.

  - `created_at: optional string`

    This is the time the hostname was created.

  - `custom_metadata: optional map[string]`

    Unique key/value metadata for this hostname. These are per-hostname (customer) settings.

  - `custom_origin_server: optional string`

    a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.

  - `custom_origin_sni: optional string`

    A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom origin server name or the string ':request_host_header:' which will cause the host header in the request to be used as SNI. Not configurable with default/fallback origin server.

  - `ownership_verification: optional object { name, type, value }`

    This is a record which can be placed to activate a hostname.

    - `name: optional string`

      DNS Name for record.

    - `type: optional "txt"`

      DNS Record type.

      - `"txt"`

    - `value: optional string`

      Content for the record.

  - `ownership_verification_http: optional object { http_body, http_url }`

    This presents the token to be served by the given http url to activate a hostname.

    - `http_body: optional string`

      Token to be served.

    - `http_url: optional string`

      The HTTP URL that will be checked during custom hostname verification and where the customer should host the token.

  - `ssl: optional object { id, bundle_method, certificate_authority, 17 more }`

    - `id: optional string`

      Custom hostname SSL identifier tag.

    - `bundle_method: optional BundleMethod`

      A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

      - `"ubiquitous"`

      - `"optimal"`

      - `"force"`

    - `certificate_authority: optional CertificateCA`

      The Certificate Authority that will issue the certificate.

      - `"digicert"`

      - `"google"`

      - `"lets_encrypt"`

      - `"ssl_com"`

    - `custom_certificate: optional string`

      If a custom uploaded certificate is used.

    - `custom_csr_id: optional string`

      The identifier for the Custom CSR that was used.

    - `custom_key: optional string`

      The key for a custom uploaded certificate.

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

    - `expires_on: optional string`

      The time the custom certificate expires on.

    - `hosts: optional array of string`

      A list of Hostnames on a custom uploaded certificate.

    - `issuer: optional string`

      The issuer on a custom uploaded certificate.

    - `method: optional DCVMethod`

      Domain control validation (DCV) method used for this hostname.

      - `"http"`

      - `"txt"`

      - `"email"`

    - `serial_number: optional string`

      The serial number on a custom uploaded certificate.

    - `settings: optional object { ciphers, early_hints, http2, 2 more }`

      - `ciphers: optional array of string`

        An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

      - `early_hints: optional "on" or "off"`

        Whether or not Early Hints is enabled.

        - `"on"`

        - `"off"`

      - `http2: optional "on" or "off"`

        Whether or not HTTP2 is enabled.

        - `"on"`

        - `"off"`

      - `min_tls_version: optional "1.0" or "1.1" or "1.2" or "1.3"`

        The minimum TLS version supported.

        - `"1.0"`

        - `"1.1"`

        - `"1.2"`

        - `"1.3"`

      - `tls_1_3: optional "on" or "off"`

        Whether or not TLS 1.3 is enabled.

        - `"on"`

        - `"off"`

    - `signature: optional string`

      The signature on a custom uploaded certificate.

    - `status: optional "initializing" or "pending_validation" or "deleted" or 18 more`

      Status of the hostname's SSL certificates.

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

    - `type: optional DomainValidationType`

      Level of validation to be used for this hostname. Domain validation (dv) must be used.

      - `"dv"`

    - `uploaded_on: optional string`

      The time the custom certificate was uploaded.

    - `validation_errors: optional array of object { message }`

      Domain validation errors that have been received by the certificate authority (CA).

      - `message: optional string`

        A domain validation error.

    - `validation_records: optional array of object { cname, cname_target, emails, 5 more }`

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

    - `wildcard: optional boolean`

      Indicates whether the certificate covers a wildcard.

  - `status: optional "active" or "pending" or "active_redeploying" or 13 more`

    Status of the hostname's activation.

    - `"active"`

    - `"pending"`

    - `"active_redeploying"`

    - `"moved"`

    - `"pending_deletion"`

    - `"deleted"`

    - `"pending_blocked"`

    - `"pending_migration"`

    - `"pending_provisioned"`

    - `"test_pending"`

    - `"test_active"`

    - `"test_active_apex"`

    - `"test_blocked"`

    - `"test_failed"`

    - `"provisioned"`

    - `"blocked"`

  - `verification_errors: optional array of string`

    These are errors that were encountered while trying to activate a hostname.

### Custom Hostname Get Response

- `CustomHostnameGetResponse object { id, hostname, created_at, 8 more }`

  - `id: string`

    Identifier.

  - `hostname: string`

    The custom hostname that will point to your hostname via CNAME.

  - `created_at: optional string`

    This is the time the hostname was created.

  - `custom_metadata: optional map[string]`

    Unique key/value metadata for this hostname. These are per-hostname (customer) settings.

  - `custom_origin_server: optional string`

    a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.

  - `custom_origin_sni: optional string`

    A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom origin server name or the string ':request_host_header:' which will cause the host header in the request to be used as SNI. Not configurable with default/fallback origin server.

  - `ownership_verification: optional object { name, type, value }`

    This is a record which can be placed to activate a hostname.

    - `name: optional string`

      DNS Name for record.

    - `type: optional "txt"`

      DNS Record type.

      - `"txt"`

    - `value: optional string`

      Content for the record.

  - `ownership_verification_http: optional object { http_body, http_url }`

    This presents the token to be served by the given http url to activate a hostname.

    - `http_body: optional string`

      Token to be served.

    - `http_url: optional string`

      The HTTP URL that will be checked during custom hostname verification and where the customer should host the token.

  - `ssl: optional object { id, bundle_method, certificate_authority, 17 more }`

    - `id: optional string`

      Custom hostname SSL identifier tag.

    - `bundle_method: optional BundleMethod`

      A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

      - `"ubiquitous"`

      - `"optimal"`

      - `"force"`

    - `certificate_authority: optional CertificateCA`

      The Certificate Authority that will issue the certificate.

      - `"digicert"`

      - `"google"`

      - `"lets_encrypt"`

      - `"ssl_com"`

    - `custom_certificate: optional string`

      If a custom uploaded certificate is used.

    - `custom_csr_id: optional string`

      The identifier for the Custom CSR that was used.

    - `custom_key: optional string`

      The key for a custom uploaded certificate.

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

    - `expires_on: optional string`

      The time the custom certificate expires on.

    - `hosts: optional array of string`

      A list of Hostnames on a custom uploaded certificate.

    - `issuer: optional string`

      The issuer on a custom uploaded certificate.

    - `method: optional DCVMethod`

      Domain control validation (DCV) method used for this hostname.

      - `"http"`

      - `"txt"`

      - `"email"`

    - `serial_number: optional string`

      The serial number on a custom uploaded certificate.

    - `settings: optional object { ciphers, early_hints, http2, 2 more }`

      - `ciphers: optional array of string`

        An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

      - `early_hints: optional "on" or "off"`

        Whether or not Early Hints is enabled.

        - `"on"`

        - `"off"`

      - `http2: optional "on" or "off"`

        Whether or not HTTP2 is enabled.

        - `"on"`

        - `"off"`

      - `min_tls_version: optional "1.0" or "1.1" or "1.2" or "1.3"`

        The minimum TLS version supported.

        - `"1.0"`

        - `"1.1"`

        - `"1.2"`

        - `"1.3"`

      - `tls_1_3: optional "on" or "off"`

        Whether or not TLS 1.3 is enabled.

        - `"on"`

        - `"off"`

    - `signature: optional string`

      The signature on a custom uploaded certificate.

    - `status: optional "initializing" or "pending_validation" or "deleted" or 18 more`

      Status of the hostname's SSL certificates.

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

    - `type: optional DomainValidationType`

      Level of validation to be used for this hostname. Domain validation (dv) must be used.

      - `"dv"`

    - `uploaded_on: optional string`

      The time the custom certificate was uploaded.

    - `validation_errors: optional array of object { message }`

      Domain validation errors that have been received by the certificate authority (CA).

      - `message: optional string`

        A domain validation error.

    - `validation_records: optional array of object { cname, cname_target, emails, 5 more }`

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

    - `wildcard: optional boolean`

      Indicates whether the certificate covers a wildcard.

  - `status: optional "active" or "pending" or "active_redeploying" or 13 more`

    Status of the hostname's activation.

    - `"active"`

    - `"pending"`

    - `"active_redeploying"`

    - `"moved"`

    - `"pending_deletion"`

    - `"deleted"`

    - `"pending_blocked"`

    - `"pending_migration"`

    - `"pending_provisioned"`

    - `"test_pending"`

    - `"test_active"`

    - `"test_active_apex"`

    - `"test_blocked"`

    - `"test_failed"`

    - `"provisioned"`

    - `"blocked"`

  - `verification_errors: optional array of string`

    These are errors that were encountered while trying to activate a hostname.

### Custom Hostname Create Response

- `CustomHostnameCreateResponse object { id, hostname, created_at, 8 more }`

  - `id: string`

    Identifier.

  - `hostname: string`

    The custom hostname that will point to your hostname via CNAME.

  - `created_at: optional string`

    This is the time the hostname was created.

  - `custom_metadata: optional map[string]`

    Unique key/value metadata for this hostname. These are per-hostname (customer) settings.

  - `custom_origin_server: optional string`

    a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.

  - `custom_origin_sni: optional string`

    A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom origin server name or the string ':request_host_header:' which will cause the host header in the request to be used as SNI. Not configurable with default/fallback origin server.

  - `ownership_verification: optional object { name, type, value }`

    This is a record which can be placed to activate a hostname.

    - `name: optional string`

      DNS Name for record.

    - `type: optional "txt"`

      DNS Record type.

      - `"txt"`

    - `value: optional string`

      Content for the record.

  - `ownership_verification_http: optional object { http_body, http_url }`

    This presents the token to be served by the given http url to activate a hostname.

    - `http_body: optional string`

      Token to be served.

    - `http_url: optional string`

      The HTTP URL that will be checked during custom hostname verification and where the customer should host the token.

  - `ssl: optional object { id, bundle_method, certificate_authority, 17 more }`

    - `id: optional string`

      Custom hostname SSL identifier tag.

    - `bundle_method: optional BundleMethod`

      A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

      - `"ubiquitous"`

      - `"optimal"`

      - `"force"`

    - `certificate_authority: optional CertificateCA`

      The Certificate Authority that will issue the certificate.

      - `"digicert"`

      - `"google"`

      - `"lets_encrypt"`

      - `"ssl_com"`

    - `custom_certificate: optional string`

      If a custom uploaded certificate is used.

    - `custom_csr_id: optional string`

      The identifier for the Custom CSR that was used.

    - `custom_key: optional string`

      The key for a custom uploaded certificate.

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

    - `expires_on: optional string`

      The time the custom certificate expires on.

    - `hosts: optional array of string`

      A list of Hostnames on a custom uploaded certificate.

    - `issuer: optional string`

      The issuer on a custom uploaded certificate.

    - `method: optional DCVMethod`

      Domain control validation (DCV) method used for this hostname.

      - `"http"`

      - `"txt"`

      - `"email"`

    - `serial_number: optional string`

      The serial number on a custom uploaded certificate.

    - `settings: optional object { ciphers, early_hints, http2, 2 more }`

      - `ciphers: optional array of string`

        An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

      - `early_hints: optional "on" or "off"`

        Whether or not Early Hints is enabled.

        - `"on"`

        - `"off"`

      - `http2: optional "on" or "off"`

        Whether or not HTTP2 is enabled.

        - `"on"`

        - `"off"`

      - `min_tls_version: optional "1.0" or "1.1" or "1.2" or "1.3"`

        The minimum TLS version supported.

        - `"1.0"`

        - `"1.1"`

        - `"1.2"`

        - `"1.3"`

      - `tls_1_3: optional "on" or "off"`

        Whether or not TLS 1.3 is enabled.

        - `"on"`

        - `"off"`

    - `signature: optional string`

      The signature on a custom uploaded certificate.

    - `status: optional "initializing" or "pending_validation" or "deleted" or 18 more`

      Status of the hostname's SSL certificates.

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

    - `type: optional DomainValidationType`

      Level of validation to be used for this hostname. Domain validation (dv) must be used.

      - `"dv"`

    - `uploaded_on: optional string`

      The time the custom certificate was uploaded.

    - `validation_errors: optional array of object { message }`

      Domain validation errors that have been received by the certificate authority (CA).

      - `message: optional string`

        A domain validation error.

    - `validation_records: optional array of object { cname, cname_target, emails, 5 more }`

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

    - `wildcard: optional boolean`

      Indicates whether the certificate covers a wildcard.

  - `status: optional "active" or "pending" or "active_redeploying" or 13 more`

    Status of the hostname's activation.

    - `"active"`

    - `"pending"`

    - `"active_redeploying"`

    - `"moved"`

    - `"pending_deletion"`

    - `"deleted"`

    - `"pending_blocked"`

    - `"pending_migration"`

    - `"pending_provisioned"`

    - `"test_pending"`

    - `"test_active"`

    - `"test_active_apex"`

    - `"test_blocked"`

    - `"test_failed"`

    - `"provisioned"`

    - `"blocked"`

  - `verification_errors: optional array of string`

    These are errors that were encountered while trying to activate a hostname.

### Custom Hostname Edit Response

- `CustomHostnameEditResponse object { id, hostname, created_at, 8 more }`

  - `id: string`

    Identifier.

  - `hostname: string`

    The custom hostname that will point to your hostname via CNAME.

  - `created_at: optional string`

    This is the time the hostname was created.

  - `custom_metadata: optional map[string]`

    Unique key/value metadata for this hostname. These are per-hostname (customer) settings.

  - `custom_origin_server: optional string`

    a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.

  - `custom_origin_sni: optional string`

    A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom origin server name or the string ':request_host_header:' which will cause the host header in the request to be used as SNI. Not configurable with default/fallback origin server.

  - `ownership_verification: optional object { name, type, value }`

    This is a record which can be placed to activate a hostname.

    - `name: optional string`

      DNS Name for record.

    - `type: optional "txt"`

      DNS Record type.

      - `"txt"`

    - `value: optional string`

      Content for the record.

  - `ownership_verification_http: optional object { http_body, http_url }`

    This presents the token to be served by the given http url to activate a hostname.

    - `http_body: optional string`

      Token to be served.

    - `http_url: optional string`

      The HTTP URL that will be checked during custom hostname verification and where the customer should host the token.

  - `ssl: optional object { id, bundle_method, certificate_authority, 17 more }`

    - `id: optional string`

      Custom hostname SSL identifier tag.

    - `bundle_method: optional BundleMethod`

      A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

      - `"ubiquitous"`

      - `"optimal"`

      - `"force"`

    - `certificate_authority: optional CertificateCA`

      The Certificate Authority that will issue the certificate.

      - `"digicert"`

      - `"google"`

      - `"lets_encrypt"`

      - `"ssl_com"`

    - `custom_certificate: optional string`

      If a custom uploaded certificate is used.

    - `custom_csr_id: optional string`

      The identifier for the Custom CSR that was used.

    - `custom_key: optional string`

      The key for a custom uploaded certificate.

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

    - `expires_on: optional string`

      The time the custom certificate expires on.

    - `hosts: optional array of string`

      A list of Hostnames on a custom uploaded certificate.

    - `issuer: optional string`

      The issuer on a custom uploaded certificate.

    - `method: optional DCVMethod`

      Domain control validation (DCV) method used for this hostname.

      - `"http"`

      - `"txt"`

      - `"email"`

    - `serial_number: optional string`

      The serial number on a custom uploaded certificate.

    - `settings: optional object { ciphers, early_hints, http2, 2 more }`

      - `ciphers: optional array of string`

        An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

      - `early_hints: optional "on" or "off"`

        Whether or not Early Hints is enabled.

        - `"on"`

        - `"off"`

      - `http2: optional "on" or "off"`

        Whether or not HTTP2 is enabled.

        - `"on"`

        - `"off"`

      - `min_tls_version: optional "1.0" or "1.1" or "1.2" or "1.3"`

        The minimum TLS version supported.

        - `"1.0"`

        - `"1.1"`

        - `"1.2"`

        - `"1.3"`

      - `tls_1_3: optional "on" or "off"`

        Whether or not TLS 1.3 is enabled.

        - `"on"`

        - `"off"`

    - `signature: optional string`

      The signature on a custom uploaded certificate.

    - `status: optional "initializing" or "pending_validation" or "deleted" or 18 more`

      Status of the hostname's SSL certificates.

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

    - `type: optional DomainValidationType`

      Level of validation to be used for this hostname. Domain validation (dv) must be used.

      - `"dv"`

    - `uploaded_on: optional string`

      The time the custom certificate was uploaded.

    - `validation_errors: optional array of object { message }`

      Domain validation errors that have been received by the certificate authority (CA).

      - `message: optional string`

        A domain validation error.

    - `validation_records: optional array of object { cname, cname_target, emails, 5 more }`

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

    - `wildcard: optional boolean`

      Indicates whether the certificate covers a wildcard.

  - `status: optional "active" or "pending" or "active_redeploying" or 13 more`

    Status of the hostname's activation.

    - `"active"`

    - `"pending"`

    - `"active_redeploying"`

    - `"moved"`

    - `"pending_deletion"`

    - `"deleted"`

    - `"pending_blocked"`

    - `"pending_migration"`

    - `"pending_provisioned"`

    - `"test_pending"`

    - `"test_active"`

    - `"test_active_apex"`

    - `"test_blocked"`

    - `"test_failed"`

    - `"provisioned"`

    - `"blocked"`

  - `verification_errors: optional array of string`

    These are errors that were encountered while trying to activate a hostname.

### Custom Hostname Delete Response

- `CustomHostnameDeleteResponse object { id }`

  - `id: optional string`

    Identifier.

# Fallback Origin

## Get Fallback Origin for Custom Hostnames

**get** `/zones/{zone_id}/custom_hostnames/fallback_origin`

Retrieves the current fallback origin configuration for custom hostnames on a zone. The fallback origin handles traffic when specific custom hostname origins are unavailable.

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

- `result: optional object { created_at, errors, origin, 2 more }`

  - `created_at: optional string`

    This is the time the fallback origin was created.

  - `errors: optional array of string`

    These are errors that were encountered while trying to activate a fallback origin.

  - `origin: optional string`

    Your origin hostname that requests to your custom hostnames will be sent to.

  - `status: optional "initializing" or "pending_deployment" or "pending_deletion" or 3 more`

    Status of the fallback origin's activation.

    - `"initializing"`

    - `"pending_deployment"`

    - `"pending_deletion"`

    - `"active"`

    - `"deployment_timed_out"`

    - `"deletion_timed_out"`

  - `updated_at: optional string`

    This is the time the fallback origin was updated.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/fallback_origin \
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
    "created_at": "2019-10-28T18:11:23.37411Z",
    "errors": [
      "DNS records are not setup correctly. Origin should be a proxied A/AAAA/CNAME dns record"
    ],
    "origin": "fallback.example.com",
    "status": "pending_deployment",
    "updated_at": "2020-03-16T18:11:23.531995Z"
  }
}
```

## Update Fallback Origin for Custom Hostnames

**put** `/zones/{zone_id}/custom_hostnames/fallback_origin`

Updates the fallback origin configuration for custom hostnames on a zone. Sets the default origin server for custom hostname traffic.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `origin: string`

  Your origin hostname that requests to your custom hostnames will be sent to.

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

- `result: optional object { created_at, errors, origin, 2 more }`

  - `created_at: optional string`

    This is the time the fallback origin was created.

  - `errors: optional array of string`

    These are errors that were encountered while trying to activate a fallback origin.

  - `origin: optional string`

    Your origin hostname that requests to your custom hostnames will be sent to.

  - `status: optional "initializing" or "pending_deployment" or "pending_deletion" or 3 more`

    Status of the fallback origin's activation.

    - `"initializing"`

    - `"pending_deployment"`

    - `"pending_deletion"`

    - `"active"`

    - `"deployment_timed_out"`

    - `"deletion_timed_out"`

  - `updated_at: optional string`

    This is the time the fallback origin was updated.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/fallback_origin \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "origin": "fallback.example.com"
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
    "created_at": "2019-10-28T18:11:23.37411Z",
    "errors": [
      "DNS records are not setup correctly. Origin should be a proxied A/AAAA/CNAME dns record"
    ],
    "origin": "fallback.example.com",
    "status": "pending_deployment",
    "updated_at": "2020-03-16T18:11:23.531995Z"
  }
}
```

## Delete Fallback Origin for Custom Hostnames

**delete** `/zones/{zone_id}/custom_hostnames/fallback_origin`

Removes the fallback origin configuration for custom hostnames on a zone. Custom hostnames without specific origins will no longer have a fallback.

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

- `result: optional object { created_at, errors, origin, 2 more }`

  - `created_at: optional string`

    This is the time the fallback origin was created.

  - `errors: optional array of string`

    These are errors that were encountered while trying to activate a fallback origin.

  - `origin: optional string`

    Your origin hostname that requests to your custom hostnames will be sent to.

  - `status: optional "initializing" or "pending_deployment" or "pending_deletion" or 3 more`

    Status of the fallback origin's activation.

    - `"initializing"`

    - `"pending_deployment"`

    - `"pending_deletion"`

    - `"active"`

    - `"deployment_timed_out"`

    - `"deletion_timed_out"`

  - `updated_at: optional string`

    This is the time the fallback origin was updated.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/fallback_origin \
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
    "created_at": "2019-10-28T18:11:23.37411Z",
    "errors": [
      "DNS records are not setup correctly. Origin should be a proxied A/AAAA/CNAME dns record"
    ],
    "origin": "fallback.example.com",
    "status": "pending_deployment",
    "updated_at": "2020-03-16T18:11:23.531995Z"
  }
}
```

## Domain Types

### Fallback Origin Get Response

- `FallbackOriginGetResponse object { created_at, errors, origin, 2 more }`

  - `created_at: optional string`

    This is the time the fallback origin was created.

  - `errors: optional array of string`

    These are errors that were encountered while trying to activate a fallback origin.

  - `origin: optional string`

    Your origin hostname that requests to your custom hostnames will be sent to.

  - `status: optional "initializing" or "pending_deployment" or "pending_deletion" or 3 more`

    Status of the fallback origin's activation.

    - `"initializing"`

    - `"pending_deployment"`

    - `"pending_deletion"`

    - `"active"`

    - `"deployment_timed_out"`

    - `"deletion_timed_out"`

  - `updated_at: optional string`

    This is the time the fallback origin was updated.

### Fallback Origin Update Response

- `FallbackOriginUpdateResponse object { created_at, errors, origin, 2 more }`

  - `created_at: optional string`

    This is the time the fallback origin was created.

  - `errors: optional array of string`

    These are errors that were encountered while trying to activate a fallback origin.

  - `origin: optional string`

    Your origin hostname that requests to your custom hostnames will be sent to.

  - `status: optional "initializing" or "pending_deployment" or "pending_deletion" or 3 more`

    Status of the fallback origin's activation.

    - `"initializing"`

    - `"pending_deployment"`

    - `"pending_deletion"`

    - `"active"`

    - `"deployment_timed_out"`

    - `"deletion_timed_out"`

  - `updated_at: optional string`

    This is the time the fallback origin was updated.

### Fallback Origin Delete Response

- `FallbackOriginDeleteResponse object { created_at, errors, origin, 2 more }`

  - `created_at: optional string`

    This is the time the fallback origin was created.

  - `errors: optional array of string`

    These are errors that were encountered while trying to activate a fallback origin.

  - `origin: optional string`

    Your origin hostname that requests to your custom hostnames will be sent to.

  - `status: optional "initializing" or "pending_deployment" or "pending_deletion" or 3 more`

    Status of the fallback origin's activation.

    - `"initializing"`

    - `"pending_deployment"`

    - `"pending_deletion"`

    - `"active"`

    - `"deployment_timed_out"`

    - `"deletion_timed_out"`

  - `updated_at: optional string`

    This is the time the fallback origin was updated.

# Certificate Pack

# Certificates

## Replace Custom Certificate and Custom Key In Custom Hostname

**put** `/zones/{zone_id}/custom_hostnames/{custom_hostname_id}/certificate_pack/{certificate_pack_id}/certificates/{certificate_id}`

Replace a single custom certificate within a certificate pack that contains two bundled certificates. The replacement must adhere to the following constraints. You can only replace an RSA certificate with another RSA certificate or an ECDSA certificate with another ECDSA certificate.

### Path Parameters

- `zone_id: string`

  Identifier.

- `custom_hostname_id: string`

  Identifier.

- `certificate_pack_id: string`

  Identifier.

- `certificate_id: string`

  Identifier.

### Body Parameters

- `custom_certificate: string`

  If a custom uploaded certificate is used.

- `custom_key: string`

  The key for a custom uploaded certificate.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

  Informational messages returned by the custom hostname API.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { id, hostname, created_at, 8 more }`

  - `id: string`

    Identifier.

  - `hostname: string`

    The custom hostname that will point to your hostname via CNAME.

  - `created_at: optional string`

    This is the time the hostname was created.

  - `custom_metadata: optional map[string]`

    Unique key/value metadata for this hostname. These are per-hostname (customer) settings.

  - `custom_origin_server: optional string`

    a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.

  - `custom_origin_sni: optional string`

    A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom origin server name or the string ':request_host_header:' which will cause the host header in the request to be used as SNI. Not configurable with default/fallback origin server.

  - `ownership_verification: optional object { name, type, value }`

    This is a record which can be placed to activate a hostname.

    - `name: optional string`

      DNS Name for record.

    - `type: optional "txt"`

      DNS Record type.

      - `"txt"`

    - `value: optional string`

      Content for the record.

  - `ownership_verification_http: optional object { http_body, http_url }`

    This presents the token to be served by the given http url to activate a hostname.

    - `http_body: optional string`

      Token to be served.

    - `http_url: optional string`

      The HTTP URL that will be checked during custom hostname verification and where the customer should host the token.

  - `ssl: optional object { id, bundle_method, certificate_authority, 17 more }`

    - `id: optional string`

      Custom hostname SSL identifier tag.

    - `bundle_method: optional BundleMethod`

      A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

      - `"ubiquitous"`

      - `"optimal"`

      - `"force"`

    - `certificate_authority: optional CertificateCA`

      The Certificate Authority that will issue the certificate.

      - `"digicert"`

      - `"google"`

      - `"lets_encrypt"`

      - `"ssl_com"`

    - `custom_certificate: optional string`

      If a custom uploaded certificate is used.

    - `custom_csr_id: optional string`

      The identifier for the Custom CSR that was used.

    - `custom_key: optional string`

      The key for a custom uploaded certificate.

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

    - `expires_on: optional string`

      The time the custom certificate expires on.

    - `hosts: optional array of string`

      A list of Hostnames on a custom uploaded certificate.

    - `issuer: optional string`

      The issuer on a custom uploaded certificate.

    - `method: optional DCVMethod`

      Domain control validation (DCV) method used for this hostname.

      - `"http"`

      - `"txt"`

      - `"email"`

    - `serial_number: optional string`

      The serial number on a custom uploaded certificate.

    - `settings: optional object { ciphers, early_hints, http2, 2 more }`

      - `ciphers: optional array of string`

        An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

      - `early_hints: optional "on" or "off"`

        Whether or not Early Hints is enabled.

        - `"on"`

        - `"off"`

      - `http2: optional "on" or "off"`

        Whether or not HTTP2 is enabled.

        - `"on"`

        - `"off"`

      - `min_tls_version: optional "1.0" or "1.1" or "1.2" or "1.3"`

        The minimum TLS version supported.

        - `"1.0"`

        - `"1.1"`

        - `"1.2"`

        - `"1.3"`

      - `tls_1_3: optional "on" or "off"`

        Whether or not TLS 1.3 is enabled.

        - `"on"`

        - `"off"`

    - `signature: optional string`

      The signature on a custom uploaded certificate.

    - `status: optional "initializing" or "pending_validation" or "deleted" or 18 more`

      Status of the hostname's SSL certificates.

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

    - `type: optional DomainValidationType`

      Level of validation to be used for this hostname. Domain validation (dv) must be used.

      - `"dv"`

    - `uploaded_on: optional string`

      The time the custom certificate was uploaded.

    - `validation_errors: optional array of object { message }`

      Domain validation errors that have been received by the certificate authority (CA).

      - `message: optional string`

        A domain validation error.

    - `validation_records: optional array of object { cname, cname_target, emails, 5 more }`

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

    - `wildcard: optional boolean`

      Indicates whether the certificate covers a wildcard.

  - `status: optional "active" or "pending" or "active_redeploying" or 13 more`

    Status of the hostname's activation.

    - `"active"`

    - `"pending"`

    - `"active_redeploying"`

    - `"moved"`

    - `"pending_deletion"`

    - `"deleted"`

    - `"pending_blocked"`

    - `"pending_migration"`

    - `"pending_provisioned"`

    - `"test_pending"`

    - `"test_active"`

    - `"test_active_apex"`

    - `"test_blocked"`

    - `"test_failed"`

    - `"provisioned"`

    - `"blocked"`

  - `verification_errors: optional array of string`

    These are errors that were encountered while trying to activate a hostname.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/$CUSTOM_HOSTNAME_ID/certificate_pack/$CERTIFICATE_PACK_ID/certificates/$CERTIFICATE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "custom_certificate": "-----BEGIN CERTIFICATE-----\\nMIIDdjCCAl6gAwIBAgIJAPnMg0Fs+/B0MA0GCSqGSIb3DQEBCwUAMFsx...\\n-----END CERTIFICATE-----\\n",
          "custom_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/SCB5...\\n-----END PRIVATE KEY-----\\n"
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
    "string"
  ],
  "success": true,
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "hostname": "app.example.com",
    "created_at": "2020-02-06T18:11:23.531995Z",
    "custom_metadata": {
      "foo": "string"
    },
    "custom_origin_server": "origin2.example.com",
    "custom_origin_sni": "sni.example.com",
    "ownership_verification": {
      "name": "_cf-custom-hostname.app.example.com",
      "type": "txt",
      "value": "5cc07c04-ea62-4a5a-95f0-419334a875a4"
    },
    "ownership_verification_http": {
      "http_body": "5cc07c04-ea62-4a5a-95f0-419334a875a4",
      "http_url": "http://custom.test.com/.well-known/cf-custom-hostname-challenge/0d89c70d-ad9f-4843-b99f-6cc0252067e9"
    },
    "ssl": {
      "id": "0d89c70d-ad9f-4843-b99f-6cc0252067e9",
      "bundle_method": "ubiquitous",
      "certificate_authority": "google",
      "custom_certificate": "-----BEGIN CERTIFICATE-----\nMIIFJDCCBAygAwIBAgIQD0ifmj/Yi5NP/2gdUySbfzANBgkqhkiG9w0BAQsFADBN\nMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMScwJQYDVQQDEx5E...SzSHfXp5lnu/3V08I72q1QNzOCgY1XeL4GKVcj4or6cT6tX6oJH7ePPmfrBfqI/O\nOeH8gMJ+FuwtXYEPa4hBf38M5eU5xWG7\n-----END CERTIFICATE-----\n",
      "custom_csr_id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752",
      "custom_key": "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAwQHoetcl9+5ikGzV6cMzWtWPJHqXT3wpbEkRU9Yz7lgvddmG\ndtcGbg/1CGZu0jJGkMoppoUo4c3dts3iwqRYmBikUP77wwY2QGmDZw2FvkJCJlKn\nabIRuGvBKwzESIXgKk2016aTP6/dAjEHyo6SeoK8lkIySUvK0fyOVlsiEsCmOpid\ntnKX/a+50GjB79CJH4ER2lLVZnhePFR/zUOyPxZQQ4naHf7yu/b5jhO0f8fwt+py\nFxIXjbEIdZliWRkRMtzrHOJIhrmJ2A1J7iOrirbbwillwjjNVUWPf3IJ3M12S9pE\newooaeO2izNTERcG9HzAacbVRn2Y2SWIyT/18QIDAQABAoIBACbhTYXBZYKmYPCb\nHBR1IBlCQA2nLGf0qRuJNJZg5iEzXows/6tc8YymZkQE7nolapWsQ+upk2y5Xdp/\naxiuprIs9JzkYK8Ox0r+dlwCG1kSW+UAbX0bQ/qUqlsTvU6muVuMP8vZYHxJ3wmb\n+ufRBKztPTQ/rYWaYQcgC0RWI20HTFBMxlTAyNxYNWzX7RKFkGVVyB9RsAtmcc8g\n+j4OdosbfNoJPS0HeIfNpAznDfHKdxDk2Yc1tV6RHBrC1ynyLE9+TaflIAdo2MVv\nKLMLq51GqYKtgJFIlBRPQqKoyXdz3fGvXrTkf/WY9QNq0J1Vk5ERePZ54mN8iZB7\n9lwy/AkCgYEA6FXzosxswaJ2wQLeoYc7ceaweX/SwTvxHgXzRyJIIT0eJWgx13Wo\n/WA3Iziimsjf6qE+SI/8laxPp2A86VMaIt3Z3mJN/CqSVGw8LK2AQst+OwdPyDMu\niacE8lj/IFGC8mwNUAb9CzGU3JpU4PxxGFjS/eMtGeRXCWkK4NE+G08CgYEA1Kp9\nN2JrVlqUz+gAX+LPmE9OEMAS9WQSQsfCHGogIFDGGcNf7+uwBM7GAaSJIP01zcoe\nVAgWdzXCv3FLhsaZoJ6RyLOLay5phbu1iaTr4UNYm5WtYTzMzqh8l1+MFFDl9xDB\nvULuCIIrglM5MeS/qnSg1uMoH2oVPj9TVst/ir8CgYEAxrI7Ws9Zc4Bt70N1As+U\nlySjaEVZCMkqvHJ6TCuVZFfQoE0r0whdLdRLU2PsLFP+q7qaeZQqgBaNSKeVcDYR\n9B+nY/jOmQoPewPVsp/vQTCnE/R81spu0mp0YI6cIheT1Z9zAy322svcc43JaWB7\nmEbeqyLOP4Z4qSOcmghZBSECgYACvR9Xs0DGn+wCsW4vze/2ei77MD4OQvepPIFX\ndFZtlBy5ADcgE9z0cuVB6CiL8DbdK5kwY9pGNr8HUCI03iHkW6Zs+0L0YmihfEVe\nPG19PSzK9CaDdhD9KFZSbLyVFmWfxOt50H7YRTTiPMgjyFpfi5j2q348yVT0tEQS\nfhRqaQKBgAcWPokmJ7EbYQGeMbS7HC8eWO/RyamlnSffdCdSc7ue3zdVJxpAkQ8W\nqu80pEIF6raIQfAf8MXiiZ7auFOSnHQTXUbhCpvDLKi0Mwq3G8Pl07l+2s6dQG6T\nlv6XTQaMyf6n1yjzL+fzDrH3qXMxHMO/b13EePXpDMpY7HQpoLDi\n-----END RSA PRIVATE KEY-----\n",
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
      "expires_on": "2021-02-06T18:11:23.531995Z",
      "hosts": [
        "app.example.com",
        "*.app.example.com"
      ],
      "issuer": "DigiCertInc",
      "method": "http",
      "serial_number": "6743787633689793699141714808227354901",
      "settings": {
        "ciphers": [
          "ECDHE-RSA-AES128-GCM-SHA256",
          "AES128-SHA"
        ],
        "early_hints": "on",
        "http2": "on",
        "min_tls_version": "1.2",
        "tls_1_3": "on"
      },
      "signature": "SHA256WithRSA",
      "status": "pending_validation",
      "type": "dv",
      "uploaded_on": "2020-02-06T18:11:23.531995Z",
      "validation_errors": [
        {
          "message": "SERVFAIL looking up CAA for app.example.com"
        }
      ],
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
      "wildcard": false
    },
    "status": "pending",
    "verification_errors": [
      "None of the A or AAAA records are owned by this account and the pre-generated ownership verification token was not found."
    ]
  }
}
```

## Delete Single Certificate And Key For Custom Hostname

**delete** `/zones/{zone_id}/custom_hostnames/{custom_hostname_id}/certificate_pack/{certificate_pack_id}/certificates/{certificate_id}`

Delete a single custom certificate from a certificate pack that contains two bundled certificates. Deletion is subject to the following constraints. You cannot delete a certificate if it is the only remaining certificate in the pack. At least one certificate must remain in the pack.

### Path Parameters

- `zone_id: string`

  Identifier.

- `custom_hostname_id: string`

  Identifier.

- `certificate_pack_id: string`

  Identifier.

- `certificate_id: string`

  Identifier.

### Returns

- `id: optional string`

  Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/$CUSTOM_HOSTNAME_ID/certificate_pack/$CERTIFICATE_PACK_ID/certificates/$CERTIFICATE_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "id": "023e105f4ecef8ad9ca31a8372d0c353"
}
```

## Domain Types

### Certificate Update Response

- `CertificateUpdateResponse object { id, hostname, created_at, 8 more }`

  - `id: string`

    Identifier.

  - `hostname: string`

    The custom hostname that will point to your hostname via CNAME.

  - `created_at: optional string`

    This is the time the hostname was created.

  - `custom_metadata: optional map[string]`

    Unique key/value metadata for this hostname. These are per-hostname (customer) settings.

  - `custom_origin_server: optional string`

    a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.

  - `custom_origin_sni: optional string`

    A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom origin server name or the string ':request_host_header:' which will cause the host header in the request to be used as SNI. Not configurable with default/fallback origin server.

  - `ownership_verification: optional object { name, type, value }`

    This is a record which can be placed to activate a hostname.

    - `name: optional string`

      DNS Name for record.

    - `type: optional "txt"`

      DNS Record type.

      - `"txt"`

    - `value: optional string`

      Content for the record.

  - `ownership_verification_http: optional object { http_body, http_url }`

    This presents the token to be served by the given http url to activate a hostname.

    - `http_body: optional string`

      Token to be served.

    - `http_url: optional string`

      The HTTP URL that will be checked during custom hostname verification and where the customer should host the token.

  - `ssl: optional object { id, bundle_method, certificate_authority, 17 more }`

    - `id: optional string`

      Custom hostname SSL identifier tag.

    - `bundle_method: optional BundleMethod`

      A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

      - `"ubiquitous"`

      - `"optimal"`

      - `"force"`

    - `certificate_authority: optional CertificateCA`

      The Certificate Authority that will issue the certificate.

      - `"digicert"`

      - `"google"`

      - `"lets_encrypt"`

      - `"ssl_com"`

    - `custom_certificate: optional string`

      If a custom uploaded certificate is used.

    - `custom_csr_id: optional string`

      The identifier for the Custom CSR that was used.

    - `custom_key: optional string`

      The key for a custom uploaded certificate.

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

    - `expires_on: optional string`

      The time the custom certificate expires on.

    - `hosts: optional array of string`

      A list of Hostnames on a custom uploaded certificate.

    - `issuer: optional string`

      The issuer on a custom uploaded certificate.

    - `method: optional DCVMethod`

      Domain control validation (DCV) method used for this hostname.

      - `"http"`

      - `"txt"`

      - `"email"`

    - `serial_number: optional string`

      The serial number on a custom uploaded certificate.

    - `settings: optional object { ciphers, early_hints, http2, 2 more }`

      - `ciphers: optional array of string`

        An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

      - `early_hints: optional "on" or "off"`

        Whether or not Early Hints is enabled.

        - `"on"`

        - `"off"`

      - `http2: optional "on" or "off"`

        Whether or not HTTP2 is enabled.

        - `"on"`

        - `"off"`

      - `min_tls_version: optional "1.0" or "1.1" or "1.2" or "1.3"`

        The minimum TLS version supported.

        - `"1.0"`

        - `"1.1"`

        - `"1.2"`

        - `"1.3"`

      - `tls_1_3: optional "on" or "off"`

        Whether or not TLS 1.3 is enabled.

        - `"on"`

        - `"off"`

    - `signature: optional string`

      The signature on a custom uploaded certificate.

    - `status: optional "initializing" or "pending_validation" or "deleted" or 18 more`

      Status of the hostname's SSL certificates.

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

    - `type: optional DomainValidationType`

      Level of validation to be used for this hostname. Domain validation (dv) must be used.

      - `"dv"`

    - `uploaded_on: optional string`

      The time the custom certificate was uploaded.

    - `validation_errors: optional array of object { message }`

      Domain validation errors that have been received by the certificate authority (CA).

      - `message: optional string`

        A domain validation error.

    - `validation_records: optional array of object { cname, cname_target, emails, 5 more }`

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

    - `wildcard: optional boolean`

      Indicates whether the certificate covers a wildcard.

  - `status: optional "active" or "pending" or "active_redeploying" or 13 more`

    Status of the hostname's activation.

    - `"active"`

    - `"pending"`

    - `"active_redeploying"`

    - `"moved"`

    - `"pending_deletion"`

    - `"deleted"`

    - `"pending_blocked"`

    - `"pending_migration"`

    - `"pending_provisioned"`

    - `"test_pending"`

    - `"test_active"`

    - `"test_active_apex"`

    - `"test_blocked"`

    - `"test_failed"`

    - `"provisioned"`

    - `"blocked"`

  - `verification_errors: optional array of string`

    These are errors that were encountered while trying to activate a hostname.

### Certificate Delete Response

- `CertificateDeleteResponse object { id }`

  - `id: optional string`

    Identifier.
