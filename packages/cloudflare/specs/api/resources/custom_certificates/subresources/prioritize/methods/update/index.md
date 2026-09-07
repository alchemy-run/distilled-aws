## Re-prioritize SSL Certificates

**put** `/zones/{zone_id}/custom_certificates/prioritize`

If a zone has multiple SSL certificates, you can set the order in which they should be used during a request. The higher priority will break ties across overlapping 'legacy_custom' certificates.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `certificates: array of object { id, priority }`

  Array of ordered certificates.

  - `id: optional string`

    Identifier.

  - `priority: optional number`

    The order/priority in which the certificate will be used in a request. The higher priority will break ties across overlapping 'legacy_custom' certificates, but 'legacy_custom' certificates will always supercede 'sni_custom' certificates.

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

- `result: optional array of CustomCertificate`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_certificates/prioritize \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "certificates": [
            {
              "id": "5a7805061c76ada191ed06f989cc3dac",
              "priority": 2
            },
            {
              "id": "9a7806061c88ada191ed06f989cc3dac",
              "priority": 1
            }
          ]
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
  "result": [
    {
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
