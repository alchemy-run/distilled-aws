## Update DNS Settings

**patch** `/zones/{zone_id}/dns_settings`

Update DNS settings for a zone

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `flatten_all_cnames: optional boolean`

  Whether to flatten all CNAME records in the zone. Note that, due to DNS limitations, a CNAME record at the zone apex will always be flattened.

- `foundation_dns: optional boolean`

  Whether to enable Foundation DNS Advanced Nameservers on the zone.

- `internal_dns: optional object { reference_zone_id }`

  Settings for this internal zone.

  - `reference_zone_id: optional string`

    The ID of the zone to fallback to.

- `multi_provider: optional boolean`

  Whether to enable multi-provider DNS, which causes Cloudflare to activate the zone even when non-Cloudflare NS records exist, and to respect NS records at the zone apex during outbound zone transfers.

- `nameservers: optional object { ns_set, type }`

  Settings determining the nameservers through which the zone should be available.

  - `ns_set: optional number`

    Configured nameserver set to be used for this zone

  - `type: optional "cloudflare.standard" or "custom.account" or "custom.tenant" or "custom.zone"`

    Nameserver type

    - `"cloudflare.standard"`

    - `"custom.account"`

    - `"custom.tenant"`

    - `"custom.zone"`

- `ns_ttl: optional number`

  The time to live (TTL) of the zone's nameserver (NS) records.

- `secondary_overrides: optional boolean`

  Allows a Secondary DNS zone to use (proxied) override records and CNAME flattening at the zone apex.

- `soa: optional object { expire, min_ttl, mname, 4 more }`

  Components of the zone's SOA record.

  - `expire: optional number`

    Time in seconds of being unable to query the primary server after which secondary servers should stop serving the zone.

  - `min_ttl: optional number`

    The time to live (TTL) for negative caching of records within the zone.

  - `mname: optional string`

    The primary nameserver, which may be used for outbound zone transfers. If null, a Cloudflare-assigned value will be used.

  - `refresh: optional number`

    Time in seconds after which secondary servers should re-check the SOA record to see if the zone has been updated.

  - `retry: optional number`

    Time in seconds after which secondary servers should retry queries after the primary server was unresponsive.

  - `rname: optional string`

    The email address of the zone administrator, with the first label representing the local part of the email address.

  - `ttl: optional number`

    The time to live (TTL) of the SOA record itself.

- `zone_mode: optional "standard" or "cdn_only" or "dns_only"`

  Whether the zone mode is a regular or CDN/DNS only zone.

  - `"standard"`

  - `"cdn_only"`

  - `"dns_only"`

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

- `result: optional object { flatten_all_cnames, foundation_dns, internal_dns, 6 more }`

  - `flatten_all_cnames: boolean`

    Whether to flatten all CNAME records in the zone. Note that, due to DNS limitations, a CNAME record at the zone apex will always be flattened.

  - `foundation_dns: boolean`

    Whether to enable Foundation DNS Advanced Nameservers on the zone.

  - `internal_dns: object { reference_zone_id }`

    Settings for this internal zone.

    - `reference_zone_id: optional string`

      The ID of the zone to fallback to.

  - `multi_provider: boolean`

    Whether to enable multi-provider DNS, which causes Cloudflare to activate the zone even when non-Cloudflare NS records exist, and to respect NS records at the zone apex during outbound zone transfers.

  - `nameservers: object { type, ns_set }`

    Settings determining the nameservers through which the zone should be available.

    - `type: "cloudflare.standard" or "custom.account" or "custom.tenant" or "custom.zone"`

      Nameserver type

      - `"cloudflare.standard"`

      - `"custom.account"`

      - `"custom.tenant"`

      - `"custom.zone"`

    - `ns_set: optional number`

      Configured nameserver set to be used for this zone

  - `ns_ttl: number`

    The time to live (TTL) of the zone's nameserver (NS) records.

  - `secondary_overrides: boolean`

    Allows a Secondary DNS zone to use (proxied) override records and CNAME flattening at the zone apex.

  - `soa: object { expire, min_ttl, mname, 4 more }`

    Components of the zone's SOA record.

    - `expire: optional number`

      Time in seconds of being unable to query the primary server after which secondary servers should stop serving the zone.

    - `min_ttl: optional number`

      The time to live (TTL) for negative caching of records within the zone.

    - `mname: optional string`

      The primary nameserver, which may be used for outbound zone transfers. If null, a Cloudflare-assigned value will be used.

    - `refresh: optional number`

      Time in seconds after which secondary servers should re-check the SOA record to see if the zone has been updated.

    - `retry: optional number`

      Time in seconds after which secondary servers should retry queries after the primary server was unresponsive.

    - `rname: optional string`

      The email address of the zone administrator, with the first label representing the local part of the email address.

    - `ttl: optional number`

      The time to live (TTL) of the SOA record itself.

  - `zone_mode: "standard" or "cdn_only" or "dns_only"`

    Whether the zone mode is a regular or CDN/DNS only zone.

    - `"standard"`

    - `"cdn_only"`

    - `"dns_only"`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_settings \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "ns_ttl": 86400,
          "zone_mode": "dns_only"
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
    "flatten_all_cnames": false,
    "foundation_dns": false,
    "internal_dns": {
      "reference_zone_id": "reference_zone_id"
    },
    "multi_provider": false,
    "nameservers": {
      "type": "cloudflare.standard",
      "ns_set": 1
    },
    "ns_ttl": 86400,
    "secondary_overrides": false,
    "soa": {
      "expire": 604800,
      "min_ttl": 1800,
      "mname": "kristina.ns.cloudflare.com",
      "refresh": 10000,
      "retry": 2400,
      "rname": "admin.example.com",
      "ttl": 3600
    },
    "zone_mode": "dns_only"
  }
}
```
