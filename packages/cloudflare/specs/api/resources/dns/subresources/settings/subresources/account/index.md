# Account

## Show DNS Settings

**get** `/accounts/{account_id}/dns_settings`

Show DNS settings for an account

### Path Parameters

- `account_id: string`

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

- `result: optional object { zone_defaults, enforce_dns_only }`

  - `zone_defaults: object { flatten_all_cnames, foundation_dns, internal_dns, 6 more }`

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

    - `nameservers: object { type }`

      Settings determining the nameservers through which the zone should be available.

      - `type: "cloudflare.standard" or "cloudflare.standard.random" or "custom.account" or "custom.tenant"`

        Nameserver type

        - `"cloudflare.standard"`

        - `"cloudflare.standard.random"`

        - `"custom.account"`

        - `"custom.tenant"`

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

  - `enforce_dns_only: optional boolean`

    When enabled, forces all proxied DNS records in the account to behave as DNS-only at the edge, regardless of each record's individual proxy setting. Note that this account-level override does not modify the records themselves; it only affects how they are served at the edge. See more on [Enforce DNS-only](https://developers.cloudflare.com/dns/proxy-status/enforce-dns-only).

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_settings \
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
    "zone_defaults": {
      "flatten_all_cnames": false,
      "foundation_dns": false,
      "internal_dns": {
        "reference_zone_id": "reference_zone_id"
      },
      "multi_provider": false,
      "nameservers": {
        "type": "cloudflare.standard"
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
    },
    "enforce_dns_only": false
  }
}
```

## Update DNS Settings

**patch** `/accounts/{account_id}/dns_settings`

Update DNS settings for an account

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `enforce_dns_only: optional boolean`

  When enabled, forces all proxied DNS records in the account to behave as DNS-only at the edge, regardless of each record's individual proxy setting. Note that this account-level override does not modify the records themselves; it only affects how they are served at the edge. See more on [Enforce DNS-only](https://developers.cloudflare.com/dns/proxy-status/enforce-dns-only).

- `zone_defaults: optional object { flatten_all_cnames, foundation_dns, internal_dns, 6 more }`

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

  - `nameservers: optional object { type }`

    Settings determining the nameservers through which the zone should be available.

    - `type: optional "cloudflare.standard" or "cloudflare.standard.random" or "custom.account" or "custom.tenant"`

      Nameserver type

      - `"cloudflare.standard"`

      - `"cloudflare.standard.random"`

      - `"custom.account"`

      - `"custom.tenant"`

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

- `result: optional object { zone_defaults, enforce_dns_only }`

  - `zone_defaults: object { flatten_all_cnames, foundation_dns, internal_dns, 6 more }`

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

    - `nameservers: object { type }`

      Settings determining the nameservers through which the zone should be available.

      - `type: "cloudflare.standard" or "cloudflare.standard.random" or "custom.account" or "custom.tenant"`

        Nameserver type

        - `"cloudflare.standard"`

        - `"cloudflare.standard.random"`

        - `"custom.account"`

        - `"custom.tenant"`

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

  - `enforce_dns_only: optional boolean`

    When enabled, forces all proxied DNS records in the account to behave as DNS-only at the edge, regardless of each record's individual proxy setting. Note that this account-level override does not modify the records themselves; it only affects how they are served at the edge. See more on [Enforce DNS-only](https://developers.cloudflare.com/dns/proxy-status/enforce-dns-only).

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_settings \
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
    "zone_defaults": {
      "flatten_all_cnames": false,
      "foundation_dns": false,
      "internal_dns": {
        "reference_zone_id": "reference_zone_id"
      },
      "multi_provider": false,
      "nameservers": {
        "type": "cloudflare.standard"
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
    },
    "enforce_dns_only": false
  }
}
```

## Domain Types

### Account Get Response

- `AccountGetResponse object { zone_defaults, enforce_dns_only }`

  - `zone_defaults: object { flatten_all_cnames, foundation_dns, internal_dns, 6 more }`

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

    - `nameservers: object { type }`

      Settings determining the nameservers through which the zone should be available.

      - `type: "cloudflare.standard" or "cloudflare.standard.random" or "custom.account" or "custom.tenant"`

        Nameserver type

        - `"cloudflare.standard"`

        - `"cloudflare.standard.random"`

        - `"custom.account"`

        - `"custom.tenant"`

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

  - `enforce_dns_only: optional boolean`

    When enabled, forces all proxied DNS records in the account to behave as DNS-only at the edge, regardless of each record's individual proxy setting. Note that this account-level override does not modify the records themselves; it only affects how they are served at the edge. See more on [Enforce DNS-only](https://developers.cloudflare.com/dns/proxy-status/enforce-dns-only).

### Account Edit Response

- `AccountEditResponse object { zone_defaults, enforce_dns_only }`

  - `zone_defaults: object { flatten_all_cnames, foundation_dns, internal_dns, 6 more }`

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

    - `nameservers: object { type }`

      Settings determining the nameservers through which the zone should be available.

      - `type: "cloudflare.standard" or "cloudflare.standard.random" or "custom.account" or "custom.tenant"`

        Nameserver type

        - `"cloudflare.standard"`

        - `"cloudflare.standard.random"`

        - `"custom.account"`

        - `"custom.tenant"`

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

  - `enforce_dns_only: optional boolean`

    When enabled, forces all proxied DNS records in the account to behave as DNS-only at the edge, regardless of each record's individual proxy setting. Note that this account-level override does not modify the records themselves; it only affects how they are served at the edge. See more on [Enforce DNS-only](https://developers.cloudflare.com/dns/proxy-status/enforce-dns-only).

# Views

## List Internal DNS Views

**get** `/accounts/{account_id}/dns_settings/views`

List DNS Internal Views for an Account

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional "asc" or "desc"`

  Direction to order DNS views in.

  - `"asc"`

  - `"desc"`

- `match: optional "any" or "all"`

  Whether to match all search requirements or at least one (any). If set to `all`, acts like a logical AND between filters. If set to `any`, acts like a logical OR instead.

  - `"any"`

  - `"all"`

- `name: optional object { contains, endswith, exact, startswith }`

  - `contains: optional string`

    Substring of the DNS view name.

  - `endswith: optional string`

    Suffix of the DNS view name.

  - `exact: optional string`

    Exact value of the DNS view name.

  - `startswith: optional string`

    Prefix of the DNS view name.

- `order: optional "name" or "created_on" or "modified_on"`

  Field to order DNS views by.

  - `"name"`

  - `"created_on"`

  - `"modified_on"`

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of DNS views per page.

- `zone_id: optional string`

  A zone ID that exists in the zones list for the view.

- `zone_name: optional string`

  A zone name that exists in the zones list for the view.

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

- `result: optional array of object { id, created_time, modified_time, 2 more }`

  - `id: string`

    Identifier.

  - `created_time: string`

    When the view was created.

  - `modified_time: string`

    When the view was last modified.

  - `name: string`

    The name of the view.

  - `zones: array of string`

    The list of zones linked to this view.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_settings/views \
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
      "created_time": "2014-01-01T05:20:00.12345Z",
      "modified_time": "2014-01-01T05:20:00.12345Z",
      "name": "my view",
      "zones": [
        "372e67954025e0ba6aaa6d586b9e0b59"
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

## DNS Internal View Details

**get** `/accounts/{account_id}/dns_settings/views/{view_id}`

Get DNS Internal View

### Path Parameters

- `account_id: string`

  Identifier.

- `view_id: string`

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

- `result: optional object { id, created_time, modified_time, 2 more }`

  - `id: string`

    Identifier.

  - `created_time: string`

    When the view was created.

  - `modified_time: string`

    When the view was last modified.

  - `name: string`

    The name of the view.

  - `zones: array of string`

    The list of zones linked to this view.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_settings/views/$VIEW_ID \
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
    "created_time": "2014-01-01T05:20:00.12345Z",
    "modified_time": "2014-01-01T05:20:00.12345Z",
    "name": "my view",
    "zones": [
      "372e67954025e0ba6aaa6d586b9e0b59"
    ]
  }
}
```

## Create Internal DNS View

**post** `/accounts/{account_id}/dns_settings/views`

Create Internal DNS View for an account

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `name: string`

  The name of the view.

- `zones: array of string`

  The list of zones linked to this view.

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

- `result: optional object { id, created_time, modified_time, 2 more }`

  - `id: string`

    Identifier.

  - `created_time: string`

    When the view was created.

  - `modified_time: string`

    When the view was last modified.

  - `name: string`

    The name of the view.

  - `zones: array of string`

    The list of zones linked to this view.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_settings/views \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "my view",
          "zones": [
            "372e67954025e0ba6aaa6d586b9e0b59"
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_time": "2014-01-01T05:20:00.12345Z",
    "modified_time": "2014-01-01T05:20:00.12345Z",
    "name": "my view",
    "zones": [
      "372e67954025e0ba6aaa6d586b9e0b59"
    ]
  }
}
```

## Update Internal DNS View

**patch** `/accounts/{account_id}/dns_settings/views/{view_id}`

Update an existing Internal DNS View

### Path Parameters

- `account_id: string`

  Identifier.

- `view_id: string`

  Identifier.

### Body Parameters

- `name: optional string`

  The name of the view.

- `zones: optional array of string`

  The list of zones linked to this view.

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

- `result: optional object { id, created_time, modified_time, 2 more }`

  - `id: string`

    Identifier.

  - `created_time: string`

    When the view was created.

  - `modified_time: string`

    When the view was last modified.

  - `name: string`

    The name of the view.

  - `zones: array of string`

    The list of zones linked to this view.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_settings/views/$VIEW_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "my view"
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
    "created_time": "2014-01-01T05:20:00.12345Z",
    "modified_time": "2014-01-01T05:20:00.12345Z",
    "name": "my view",
    "zones": [
      "372e67954025e0ba6aaa6d586b9e0b59"
    ]
  }
}
```

## Delete Internal DNS View

**delete** `/accounts/{account_id}/dns_settings/views/{view_id}`

Delete an existing Internal DNS View

### Path Parameters

- `account_id: string`

  Identifier.

- `view_id: string`

  Identifier.

### Returns

- `result: optional object { id }`

  - `id: optional string`

    Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_settings/views/$VIEW_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```

## Domain Types

### View List Response

- `ViewListResponse object { id, created_time, modified_time, 2 more }`

  - `id: string`

    Identifier.

  - `created_time: string`

    When the view was created.

  - `modified_time: string`

    When the view was last modified.

  - `name: string`

    The name of the view.

  - `zones: array of string`

    The list of zones linked to this view.

### View Get Response

- `ViewGetResponse object { id, created_time, modified_time, 2 more }`

  - `id: string`

    Identifier.

  - `created_time: string`

    When the view was created.

  - `modified_time: string`

    When the view was last modified.

  - `name: string`

    The name of the view.

  - `zones: array of string`

    The list of zones linked to this view.

### View Create Response

- `ViewCreateResponse object { id, created_time, modified_time, 2 more }`

  - `id: string`

    Identifier.

  - `created_time: string`

    When the view was created.

  - `modified_time: string`

    When the view was last modified.

  - `name: string`

    The name of the view.

  - `zones: array of string`

    The list of zones linked to this view.

### View Edit Response

- `ViewEditResponse object { id, created_time, modified_time, 2 more }`

  - `id: string`

    Identifier.

  - `created_time: string`

    When the view was created.

  - `modified_time: string`

    When the view was last modified.

  - `name: string`

    The name of the view.

  - `zones: array of string`

    The list of zones linked to this view.

### View Delete Response

- `ViewDeleteResponse object { id }`

  - `id: optional string`

    Identifier.
