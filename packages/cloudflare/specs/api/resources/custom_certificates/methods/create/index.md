## Create SSL Configuration

**post** `/zones/{zone_id}/custom_certificates`

Upload a new SSL certificate for a zone.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `certificate: string`

  The zone's SSL certificate or certificate and the intermediate(s).

- `bundle_method: optional BundleMethod`

  A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

  - `"ubiquitous"`

  - `"optimal"`

  - `"force"`

- `custom_csr_id: optional string`

  The identifier for the Custom CSR that was used.

- `deploy: optional "staging" or "production"`

  The environment to deploy the certificate to, defaults to production.

  - `"staging"`

  - `"production"`

- `geo_restrictions: optional GeoRestrictions`

  Specify the region where your private key can be held locally for optimal TLS performance. HTTPS connections to any excluded data center will still be fully encrypted, but will incur some latency while Keyless SSL is used to complete the handshake with the nearest allowed data center. Options allow distribution to only to U.S. data centers, only to E.U. data centers, or only to highest security data centers. Default distribution is to all Cloudflare datacenters, for optimal performance.

  - `label: optional "us" or "eu" or "highest_security"`

    - `"us"`

    - `"eu"`

    - `"highest_security"`

- `policy: optional string`

  Specify the policy that determines the region where your private key will be held locally. HTTPS connections to any excluded data center will still be fully encrypted, but will incur some latency while Keyless SSL is used to complete the handshake with the nearest allowed data center. Any combination of countries, specified by their two letter country code (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) can be chosen, such as 'country: IN', as well as 'region: EU' which refers to the EU region. If there are too few data centers satisfying the policy, it will be rejected.
  Note: The API accepts this field as either "policy" or "policy_restrictions" in requests. Responses return this field as "policy_restrictions".

- `private_key: optional string`

  The zone's private key. Not required if custom_csr_id is provided, in which case the private key is retrieved from the CSR record held by Cloudflare.

- `type: optional "legacy_custom" or "sni_custom"`

  The type 'legacy_custom' enables support for legacy clients which do not include SNI in the TLS handshake.

  - `"legacy_custom"`

  - `"sni_custom"`

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

- `result: optional CustomCertificate`

  - `id: string`

    Identifier.

  - `zone_id: string`

    Identifier.

  - `bundle_method: optional BundleMethod`

    A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

    - `"ubiquitous"`

    - `"optimal"`

    - `"force"`

  - `custom_csr_id: optional string`

    The identifier for the Custom CSR that was used.

  - `expires_on: optional string`

    When the certificate from the authority expires.

  - `geo_restrictions: optional GeoRestrictions`

    Specify the region where your private key can be held locally for optimal TLS performance. HTTPS connections to any excluded data center will still be fully encrypted, but will incur some latency while Keyless SSL is used to complete the handshake with the nearest allowed data center. Options allow distribution to only to U.S. data centers, only to E.U. data centers, or only to highest security data centers. Default distribution is to all Cloudflare datacenters, for optimal performance.

    - `label: optional "us" or "eu" or "highest_security"`

      - `"us"`

      - `"eu"`

      - `"highest_security"`

  - `hosts: optional array of string`

  - `issuer: optional string`

    The certificate authority that issued the certificate.

  - `keyless_server: optional KeylessCertificate`

    - `id: string`

      Keyless certificate identifier tag.

    - `created_on: string`

      When the Keyless SSL was created.

    - `enabled: boolean`

      Whether or not the Keyless SSL is on or off.

    - `host: string`

      The keyless SSL name.

    - `modified_on: string`

      When the Keyless SSL was last modified.

    - `name: string`

      The keyless SSL name.

    - `permissions: array of string`

      Available permissions for the Keyless SSL for the current user requesting the item.

    - `port: number`

      The keyless SSL port used to communicate between Cloudflare and the client's Keyless SSL server.

    - `status: "active" or "deleted"`

      Status of the Keyless SSL.

      - `"active"`

      - `"deleted"`

    - `tunnel: optional Tunnel`

      Configuration for using Keyless SSL through a Cloudflare Tunnel.

      - `private_ip: string`

        Private IP of the Key Server Host.

      - `vnet_id: string`

        Cloudflare Tunnel Virtual Network ID.

  - `modified_on: optional string`

    When the certificate was last modified.

  - `policy_restrictions: optional string`

    The policy restrictions returned by the API. This field is returned in responses
    when a policy has been set. The API accepts the "policy" field in requests but
    returns this field as "policy_restrictions" in responses.

    Specifies the region(s) where your private key can be held locally for optimal
    TLS performance. Format is a boolean expression, for example:
    "(country: US) or (region: EU)"

  - `priority: optional number`

    The order/priority in which the certificate will be used in a request. The higher priority will break ties across overlapping 'legacy_custom' certificates, but 'legacy_custom' certificates will always supercede 'sni_custom' certificates.

  - `signature: optional string`

    The type of hash used for the certificate.

  - `status: optional "active" or "expired" or "deleted" or 2 more`

    Status of the zone's custom SSL.

    - `"active"`

    - `"expired"`

    - `"deleted"`

    - `"pending"`

    - `"initializing"`

  - `uploaded_on: optional string`

    When the certificate was uploaded to Cloudflare.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_certificates \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "certificate": "-----BEGIN CERTIFICATE-----\\nMIIDtTCCAp2gAwIBAgIJAMHAwfXZ5/PWMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV\\nBAYTAkFVMRMwEQYDVQQIEwpTb21lLVN0YXRlMSEwHwYDVQQKExhJbnRlcm5ldCBX\\naWRnaXRzIFB0eSBMdGQwHhcNMTYwODI0MTY0MzAxWhcNMTYxMTIyMTY0MzAxWjBF\\nMQswCQYDVQQGEwJBVTETMBEGA1UECBMKU29tZS1TdGF0ZTEhMB8GA1UEChMYSW50\\nZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB\\nCgKCAQEAwQHoetcl9+5ikGzV6cMzWtWPJHqXT3wpbEkRU9Yz7lgvddmGdtcGbg/1\\nCGZu0jJGkMoppoUo4c3dts3iwqRYmBikUP77wwY2QGmDZw2FvkJCJlKnabIRuGvB\\nKwzESIXgKk2016aTP6/dAjEHyo6SeoK8lkIySUvK0fyOVlsiEsCmOpidtnKX/a+5\\n0GjB79CJH4ER2lLVZnhePFR/zUOyPxZQQ4naHf7yu/b5jhO0f8fwt+pyFxIXjbEI\\ndZliWRkRMtzrHOJIhrmJ2A1J7iOrirbbwillwjjNVUWPf3IJ3M12S9pEewooaeO2\\nizNTERcG9HzAacbVRn2Y2SWIyT/18QIDAQABo4GnMIGkMB0GA1UdDgQWBBT/LbE4\\n9rWf288N6sJA5BRb6FJIGDB1BgNVHSMEbjBsgBT/LbE49rWf288N6sJA5BRb6FJI\\nGKFJpEcwRTELMAkGA1UEBhMCQVUxEzARBgNVBAgTClNvbWUtU3RhdGUxITAfBgNV\\nBAoTGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZIIJAMHAwfXZ5/PWMAwGA1UdEwQF\\nMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHHFwl0tH0quUYZYO0dZYt4R7SJ0pCm2\\n2satiyzHl4OnXcHDpekAo7/a09c6Lz6AU83cKy/+x3/djYHXWba7HpEu0dR3ugQP\\nMlr4zrhd9xKZ0KZKiYmtJH+ak4OM4L3FbT0owUZPyjLSlhMtJVcoRp5CJsjAMBUG\\nSvD8RX+T01wzox/Qb+lnnNnOlaWpqu8eoOenybxKp1a9ULzIVvN/LAcc+14vioFq\\n2swRWtmocBAs8QR9n4uvbpiYvS8eYueDCWMM4fvFfBhaDZ3N9IbtySh3SpFdQDhw\\nYbjM2rxXiyLGxB4Bol7QTv4zHif7Zt89FReT/NBy4rzaskDJY5L6xmY=\\n-----END CERTIFICATE-----\\n",
          "bundle_method": "ubiquitous",
          "custom_csr_id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752",
          "deploy": "staging",
          "policy": "(country: US) or (region: EU)",
          "private_key": "-----BEGIN RSA PRIVATE KEY-----\\nMIIEowIBAAKCAQEAwQHoetcl9+5ikGzV6cMzWtWPJHqXT3wpbEkRU9Yz7lgvddmG\\ndtcGbg/1CGZu0jJGkMoppoUo4c3dts3iwqRYmBikUP77wwY2QGmDZw2FvkJCJlKn\\nabIRuGvBKwzESIXgKk2016aTP6/dAjEHyo6SeoK8lkIySUvK0fyOVlsiEsCmOpid\\ntnKX/a+50GjB79CJH4ER2lLVZnhePFR/zUOyPxZQQ4naHf7yu/b5jhO0f8fwt+py\\nFxIXjbEIdZliWRkRMtzrHOJIhrmJ2A1J7iOrirbbwillwjjNVUWPf3IJ3M12S9pE\\newooaeO2izNTERcG9HzAacbVRn2Y2SWIyT/18QIDAQABAoIBACbhTYXBZYKmYPCb\\nHBR1IBlCQA2nLGf0qRuJNJZg5iEzXows/6tc8YymZkQE7nolapWsQ+upk2y5Xdp/\\naxiuprIs9JzkYK8Ox0r+dlwCG1kSW+UAbX0bQ/qUqlsTvU6muVuMP8vZYHxJ3wmb\\n+ufRBKztPTQ/rYWaYQcgC0RWI20HTFBMxlTAyNxYNWzX7RKFkGVVyB9RsAtmcc8g\\n+j4OdosbfNoJPS0HeIfNpAznDfHKdxDk2Yc1tV6RHBrC1ynyLE9+TaflIAdo2MVv\\nKLMLq51GqYKtgJFIlBRPQqKoyXdz3fGvXrTkf/WY9QNq0J1Vk5ERePZ54mN8iZB7\\n9lwy/AkCgYEA6FXzosxswaJ2wQLeoYc7ceaweX/SwTvxHgXzRyJIIT0eJWgx13Wo\\n/WA3Iziimsjf6qE+SI/8laxPp2A86VMaIt3Z3mJN/CqSVGw8LK2AQst+OwdPyDMu\\niacE8lj/IFGC8mwNUAb9CzGU3JpU4PxxGFjS/eMtGeRXCWkK4NE+G08CgYEA1Kp9\\nN2JrVlqUz+gAX+LPmE9OEMAS9WQSQsfCHGogIFDGGcNf7+uwBM7GAaSJIP01zcoe\\nVAgWdzXCv3FLhsaZoJ6RyLOLay5phbu1iaTr4UNYm5WtYTzMzqh8l1+MFFDl9xDB\\nvULuCIIrglM5MeS/qnSg1uMoH2oVPj9TVst/ir8CgYEAxrI7Ws9Zc4Bt70N1As+U\\nlySjaEVZCMkqvHJ6TCuVZFfQoE0r0whdLdRLU2PsLFP+q7qaeZQqgBaNSKeVcDYR\\n9B+nY/jOmQoPewPVsp/vQTCnE/R81spu0mp0YI6cIheT1Z9zAy322svcc43JaWB7\\nmEbeqyLOP4Z4qSOcmghZBSECgYACvR9Xs0DGn+wCsW4vze/2ei77MD4OQvepPIFX\\ndFZtlBy5ADcgE9z0cuVB6CiL8DbdK5kwY9pGNr8HUCI03iHkW6Zs+0L0YmihfEVe\\nPG19PSzK9CaDdhD9KFZSbLyVFmWfxOt50H7YRTTiPMgjyFpfi5j2q348yVT0tEQS\\nfhRqaQKBgAcWPokmJ7EbYQGeMbS7HC8eWO/RyamlnSffdCdSc7ue3zdVJxpAkQ8W\\nqu80pEIF6raIQfAf8MXiiZ7auFOSnHQTXUbhCpvDLKi0Mwq3G8Pl07l+2s6dQG6T\\nlv6XTQaMyf6n1yjzL+fzDrH3qXMxHMO/b13EePXpDMpY7HQpoLDi\\n-----END RSA PRIVATE KEY-----\\n",
          "type": "sni_custom"
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
    "zone_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "bundle_method": "ubiquitous",
    "custom_csr_id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752",
    "expires_on": "2016-01-01T05:20:00Z",
    "geo_restrictions": {
      "label": "us"
    },
    "hosts": [
      "example.com"
    ],
    "issuer": "GlobalSign",
    "keyless_server": {
      "id": "4d2844d2ce78891c34d0b6c0535a291e",
      "created_on": "2014-01-01T05:20:00Z",
      "enabled": false,
      "host": "example.com",
      "modified_on": "2014-01-01T05:20:00Z",
      "name": "example.com Keyless SSL",
      "permissions": [
        "#ssl:read",
        "#ssl:edit"
      ],
      "port": 24008,
      "status": "active",
      "tunnel": {
        "private_ip": "10.0.0.1",
        "vnet_id": "7365377a-85a4-4390-9480-531ef7dc7a3c"
      }
    },
    "modified_on": "2014-01-01T05:20:00Z",
    "policy_restrictions": "(country: US) or (region: EU)",
    "priority": 1,
    "signature": "SHA256WithRSA",
    "status": "active",
    "uploaded_on": "2014-01-01T05:20:00Z"
  }
}
```
