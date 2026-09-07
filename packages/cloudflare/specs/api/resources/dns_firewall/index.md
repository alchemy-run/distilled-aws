# DNS Firewall

## List DNS Firewall Clusters

**get** `/accounts/{account_id}/dns_firewall`

List DNS Firewall clusters for an account

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `page: optional number`

  Page number of paginated results

- `per_page: optional number`

  Number of clusters per page

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

- `result: optional array of object { id, deprecate_any_requests, dns_firewall_ips, 10 more }`

  - `id: string`

    Identifier.

  - `deprecate_any_requests: boolean`

    Whether to refuse to answer queries for the ANY type

  - `dns_firewall_ips: array of FirewallIPs`

  - `ecs_fallback: boolean`

    Whether to forward client IP (resolver) subnet if no EDNS Client Subnet is sent

  - `maximum_cache_ttl: number`

    By default, Cloudflare attempts to cache responses for as long as
    indicated by the TTL received from upstream nameservers. This setting
    sets an upper bound on this duration. For caching purposes, higher TTLs
    will be decreased to the maximum value defined by this setting.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

  - `minimum_cache_ttl: number`

    By default, Cloudflare attempts to cache responses for as long as
    indicated by the TTL received from upstream nameservers. This setting
    sets a lower bound on this duration. For caching purposes, lower TTLs
    will be increased to the minimum value defined by this setting.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

    Note that, even with this setting, there is no guarantee that a
    response will be cached for at least the specified duration. Cached
    responses may be removed earlier for capacity or other operational
    reasons.

  - `modified_on: string`

    Last modification of DNS Firewall cluster

  - `name: string`

    DNS Firewall cluster name

  - `negative_cache_ttl: number`

    This setting controls how long DNS Firewall should cache negative
    responses (e.g., NXDOMAIN) from the upstream servers.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

  - `ratelimit: number`

    Maximum number of DNS queries per second that will be forwarded to your upstream nameservers. The limit is enforced per server, where each server receives a fraction of the configured value. The actual aggregate rate for a data center may vary depending on how many servers are present. Responses served from cache do not count toward this limit. Set to null to disable rate limiting.

  - `retries: number`

    Number of retries for fetching DNS responses from upstream nameservers (not counting the initial attempt)

  - `upstream_ips: array of UpstreamIPs`

  - `attack_mitigation: optional AttackMitigation`

    Attack mitigation settings

    - `enabled: optional boolean`

      When enabled, automatically mitigate random-prefix attacks to protect upstream DNS servers

    - `only_when_upstream_unhealthy: optional boolean`

      Only mitigate attacks when upstream servers seem unhealthy

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_firewall \
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
      "deprecate_any_requests": true,
      "dns_firewall_ips": [
        "203.0.113.1",
        "203.0.113.254",
        "2001:DB8:AB::CF",
        "2001:DB8:CD::CF"
      ],
      "ecs_fallback": false,
      "maximum_cache_ttl": 900,
      "minimum_cache_ttl": 60,
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "name": "My Awesome DNS Firewall cluster",
      "negative_cache_ttl": 900,
      "ratelimit": 600,
      "retries": 2,
      "upstream_ips": [
        "192.0.2.1",
        "198.51.100.1",
        "2001:DB8:100::CF"
      ],
      "attack_mitigation": {
        "enabled": true,
        "only_when_upstream_unhealthy": false
      }
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

## DNS Firewall Cluster Details

**get** `/accounts/{account_id}/dns_firewall/{dns_firewall_id}`

Show a single DNS Firewall cluster for an account

### Path Parameters

- `account_id: string`

  Identifier.

- `dns_firewall_id: string`

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

- `result: optional object { id, deprecate_any_requests, dns_firewall_ips, 10 more }`

  - `id: string`

    Identifier.

  - `deprecate_any_requests: boolean`

    Whether to refuse to answer queries for the ANY type

  - `dns_firewall_ips: array of FirewallIPs`

  - `ecs_fallback: boolean`

    Whether to forward client IP (resolver) subnet if no EDNS Client Subnet is sent

  - `maximum_cache_ttl: number`

    By default, Cloudflare attempts to cache responses for as long as
    indicated by the TTL received from upstream nameservers. This setting
    sets an upper bound on this duration. For caching purposes, higher TTLs
    will be decreased to the maximum value defined by this setting.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

  - `minimum_cache_ttl: number`

    By default, Cloudflare attempts to cache responses for as long as
    indicated by the TTL received from upstream nameservers. This setting
    sets a lower bound on this duration. For caching purposes, lower TTLs
    will be increased to the minimum value defined by this setting.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

    Note that, even with this setting, there is no guarantee that a
    response will be cached for at least the specified duration. Cached
    responses may be removed earlier for capacity or other operational
    reasons.

  - `modified_on: string`

    Last modification of DNS Firewall cluster

  - `name: string`

    DNS Firewall cluster name

  - `negative_cache_ttl: number`

    This setting controls how long DNS Firewall should cache negative
    responses (e.g., NXDOMAIN) from the upstream servers.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

  - `ratelimit: number`

    Maximum number of DNS queries per second that will be forwarded to your upstream nameservers. The limit is enforced per server, where each server receives a fraction of the configured value. The actual aggregate rate for a data center may vary depending on how many servers are present. Responses served from cache do not count toward this limit. Set to null to disable rate limiting.

  - `retries: number`

    Number of retries for fetching DNS responses from upstream nameservers (not counting the initial attempt)

  - `upstream_ips: array of UpstreamIPs`

  - `attack_mitigation: optional AttackMitigation`

    Attack mitigation settings

    - `enabled: optional boolean`

      When enabled, automatically mitigate random-prefix attacks to protect upstream DNS servers

    - `only_when_upstream_unhealthy: optional boolean`

      Only mitigate attacks when upstream servers seem unhealthy

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_firewall/$DNS_FIREWALL_ID \
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
    "deprecate_any_requests": true,
    "dns_firewall_ips": [
      "203.0.113.1",
      "203.0.113.254",
      "2001:DB8:AB::CF",
      "2001:DB8:CD::CF"
    ],
    "ecs_fallback": false,
    "maximum_cache_ttl": 900,
    "minimum_cache_ttl": 60,
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "My Awesome DNS Firewall cluster",
    "negative_cache_ttl": 900,
    "ratelimit": 600,
    "retries": 2,
    "upstream_ips": [
      "192.0.2.1",
      "198.51.100.1",
      "2001:DB8:100::CF"
    ],
    "attack_mitigation": {
      "enabled": true,
      "only_when_upstream_unhealthy": false
    }
  }
}
```

## Create DNS Firewall Cluster

**post** `/accounts/{account_id}/dns_firewall`

Create a DNS Firewall cluster

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `name: string`

  DNS Firewall cluster name

- `upstream_ips: array of UpstreamIPs`

- `attack_mitigation: optional AttackMitigation`

  Attack mitigation settings

  - `enabled: optional boolean`

    When enabled, automatically mitigate random-prefix attacks to protect upstream DNS servers

  - `only_when_upstream_unhealthy: optional boolean`

    Only mitigate attacks when upstream servers seem unhealthy

- `deprecate_any_requests: optional boolean`

  Whether to refuse to answer queries for the ANY type

- `dns_firewall_ip_count: optional number`

  Number of IPv4 addresses to assign to the DNS Firewall cluster. Only used during cluster creation and cannot be changed later.

- `ecs_fallback: optional boolean`

  Whether to forward client IP (resolver) subnet if no EDNS Client Subnet is sent

- `maximum_cache_ttl: optional number`

  By default, Cloudflare attempts to cache responses for as long as
  indicated by the TTL received from upstream nameservers. This setting
  sets an upper bound on this duration. For caching purposes, higher TTLs
  will be decreased to the maximum value defined by this setting.

  This setting does not affect the TTL value in the DNS response
  Cloudflare returns to clients. Cloudflare will always forward the TTL
  value received from upstream nameservers.

- `minimum_cache_ttl: optional number`

  By default, Cloudflare attempts to cache responses for as long as
  indicated by the TTL received from upstream nameservers. This setting
  sets a lower bound on this duration. For caching purposes, lower TTLs
  will be increased to the minimum value defined by this setting.

  This setting does not affect the TTL value in the DNS response
  Cloudflare returns to clients. Cloudflare will always forward the TTL
  value received from upstream nameservers.

  Note that, even with this setting, there is no guarantee that a
  response will be cached for at least the specified duration. Cached
  responses may be removed earlier for capacity or other operational
  reasons.

- `negative_cache_ttl: optional number`

  This setting controls how long DNS Firewall should cache negative
  responses (e.g., NXDOMAIN) from the upstream servers.

  This setting does not affect the TTL value in the DNS response
  Cloudflare returns to clients. Cloudflare will always forward the TTL
  value received from upstream nameservers.

- `ratelimit: optional number`

  Maximum number of DNS queries per second that will be forwarded to your upstream nameservers. The limit is enforced per server, where each server receives a fraction of the configured value. The actual aggregate rate for a data center may vary depending on how many servers are present. Responses served from cache do not count toward this limit. Set to null to disable rate limiting.

- `retries: optional number`

  Number of retries for fetching DNS responses from upstream nameservers (not counting the initial attempt)

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

- `result: optional object { id, deprecate_any_requests, dns_firewall_ips, 10 more }`

  - `id: string`

    Identifier.

  - `deprecate_any_requests: boolean`

    Whether to refuse to answer queries for the ANY type

  - `dns_firewall_ips: array of FirewallIPs`

  - `ecs_fallback: boolean`

    Whether to forward client IP (resolver) subnet if no EDNS Client Subnet is sent

  - `maximum_cache_ttl: number`

    By default, Cloudflare attempts to cache responses for as long as
    indicated by the TTL received from upstream nameservers. This setting
    sets an upper bound on this duration. For caching purposes, higher TTLs
    will be decreased to the maximum value defined by this setting.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

  - `minimum_cache_ttl: number`

    By default, Cloudflare attempts to cache responses for as long as
    indicated by the TTL received from upstream nameservers. This setting
    sets a lower bound on this duration. For caching purposes, lower TTLs
    will be increased to the minimum value defined by this setting.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

    Note that, even with this setting, there is no guarantee that a
    response will be cached for at least the specified duration. Cached
    responses may be removed earlier for capacity or other operational
    reasons.

  - `modified_on: string`

    Last modification of DNS Firewall cluster

  - `name: string`

    DNS Firewall cluster name

  - `negative_cache_ttl: number`

    This setting controls how long DNS Firewall should cache negative
    responses (e.g., NXDOMAIN) from the upstream servers.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

  - `ratelimit: number`

    Maximum number of DNS queries per second that will be forwarded to your upstream nameservers. The limit is enforced per server, where each server receives a fraction of the configured value. The actual aggregate rate for a data center may vary depending on how many servers are present. Responses served from cache do not count toward this limit. Set to null to disable rate limiting.

  - `retries: number`

    Number of retries for fetching DNS responses from upstream nameservers (not counting the initial attempt)

  - `upstream_ips: array of UpstreamIPs`

  - `attack_mitigation: optional AttackMitigation`

    Attack mitigation settings

    - `enabled: optional boolean`

      When enabled, automatically mitigate random-prefix attacks to protect upstream DNS servers

    - `only_when_upstream_unhealthy: optional boolean`

      Only mitigate attacks when upstream servers seem unhealthy

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_firewall \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "My Awesome DNS Firewall cluster",
          "upstream_ips": [
            "192.0.2.1",
            "198.51.100.1",
            "2001:DB8:100::CF"
          ],
          "deprecate_any_requests": true,
          "dns_firewall_ip_count": 2,
          "maximum_cache_ttl": 900,
          "minimum_cache_ttl": 60,
          "negative_cache_ttl": 900,
          "ratelimit": 600,
          "retries": 2
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
    "deprecate_any_requests": true,
    "dns_firewall_ips": [
      "203.0.113.1",
      "203.0.113.254",
      "2001:DB8:AB::CF",
      "2001:DB8:CD::CF"
    ],
    "ecs_fallback": false,
    "maximum_cache_ttl": 900,
    "minimum_cache_ttl": 60,
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "My Awesome DNS Firewall cluster",
    "negative_cache_ttl": 900,
    "ratelimit": 600,
    "retries": 2,
    "upstream_ips": [
      "192.0.2.1",
      "198.51.100.1",
      "2001:DB8:100::CF"
    ],
    "attack_mitigation": {
      "enabled": true,
      "only_when_upstream_unhealthy": false
    }
  }
}
```

## Update DNS Firewall Cluster

**patch** `/accounts/{account_id}/dns_firewall/{dns_firewall_id}`

Modify the configuration of a DNS Firewall cluster

### Path Parameters

- `account_id: string`

  Identifier.

- `dns_firewall_id: string`

  Identifier.

### Body Parameters

- `attack_mitigation: optional AttackMitigation`

  Attack mitigation settings

  - `enabled: optional boolean`

    When enabled, automatically mitigate random-prefix attacks to protect upstream DNS servers

  - `only_when_upstream_unhealthy: optional boolean`

    Only mitigate attacks when upstream servers seem unhealthy

- `deprecate_any_requests: optional boolean`

  Whether to refuse to answer queries for the ANY type

- `ecs_fallback: optional boolean`

  Whether to forward client IP (resolver) subnet if no EDNS Client Subnet is sent

- `maximum_cache_ttl: optional number`

  By default, Cloudflare attempts to cache responses for as long as
  indicated by the TTL received from upstream nameservers. This setting
  sets an upper bound on this duration. For caching purposes, higher TTLs
  will be decreased to the maximum value defined by this setting.

  This setting does not affect the TTL value in the DNS response
  Cloudflare returns to clients. Cloudflare will always forward the TTL
  value received from upstream nameservers.

- `minimum_cache_ttl: optional number`

  By default, Cloudflare attempts to cache responses for as long as
  indicated by the TTL received from upstream nameservers. This setting
  sets a lower bound on this duration. For caching purposes, lower TTLs
  will be increased to the minimum value defined by this setting.

  This setting does not affect the TTL value in the DNS response
  Cloudflare returns to clients. Cloudflare will always forward the TTL
  value received from upstream nameservers.

  Note that, even with this setting, there is no guarantee that a
  response will be cached for at least the specified duration. Cached
  responses may be removed earlier for capacity or other operational
  reasons.

- `name: optional string`

  DNS Firewall cluster name

- `negative_cache_ttl: optional number`

  This setting controls how long DNS Firewall should cache negative
  responses (e.g., NXDOMAIN) from the upstream servers.

  This setting does not affect the TTL value in the DNS response
  Cloudflare returns to clients. Cloudflare will always forward the TTL
  value received from upstream nameservers.

- `ratelimit: optional number`

  Maximum number of DNS queries per second that will be forwarded to your upstream nameservers. The limit is enforced per server, where each server receives a fraction of the configured value. The actual aggregate rate for a data center may vary depending on how many servers are present. Responses served from cache do not count toward this limit. Set to null to disable rate limiting.

- `retries: optional number`

  Number of retries for fetching DNS responses from upstream nameservers (not counting the initial attempt)

- `upstream_ips: optional array of UpstreamIPs`

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

- `result: optional object { id, deprecate_any_requests, dns_firewall_ips, 10 more }`

  - `id: string`

    Identifier.

  - `deprecate_any_requests: boolean`

    Whether to refuse to answer queries for the ANY type

  - `dns_firewall_ips: array of FirewallIPs`

  - `ecs_fallback: boolean`

    Whether to forward client IP (resolver) subnet if no EDNS Client Subnet is sent

  - `maximum_cache_ttl: number`

    By default, Cloudflare attempts to cache responses for as long as
    indicated by the TTL received from upstream nameservers. This setting
    sets an upper bound on this duration. For caching purposes, higher TTLs
    will be decreased to the maximum value defined by this setting.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

  - `minimum_cache_ttl: number`

    By default, Cloudflare attempts to cache responses for as long as
    indicated by the TTL received from upstream nameservers. This setting
    sets a lower bound on this duration. For caching purposes, lower TTLs
    will be increased to the minimum value defined by this setting.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

    Note that, even with this setting, there is no guarantee that a
    response will be cached for at least the specified duration. Cached
    responses may be removed earlier for capacity or other operational
    reasons.

  - `modified_on: string`

    Last modification of DNS Firewall cluster

  - `name: string`

    DNS Firewall cluster name

  - `negative_cache_ttl: number`

    This setting controls how long DNS Firewall should cache negative
    responses (e.g., NXDOMAIN) from the upstream servers.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

  - `ratelimit: number`

    Maximum number of DNS queries per second that will be forwarded to your upstream nameservers. The limit is enforced per server, where each server receives a fraction of the configured value. The actual aggregate rate for a data center may vary depending on how many servers are present. Responses served from cache do not count toward this limit. Set to null to disable rate limiting.

  - `retries: number`

    Number of retries for fetching DNS responses from upstream nameservers (not counting the initial attempt)

  - `upstream_ips: array of UpstreamIPs`

  - `attack_mitigation: optional AttackMitigation`

    Attack mitigation settings

    - `enabled: optional boolean`

      When enabled, automatically mitigate random-prefix attacks to protect upstream DNS servers

    - `only_when_upstream_unhealthy: optional boolean`

      Only mitigate attacks when upstream servers seem unhealthy

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_firewall/$DNS_FIREWALL_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "deprecate_any_requests": true,
          "maximum_cache_ttl": 900,
          "minimum_cache_ttl": 60,
          "name": "My Awesome DNS Firewall cluster",
          "negative_cache_ttl": 900,
          "ratelimit": 600,
          "retries": 2,
          "upstream_ips": [
            "192.0.2.1",
            "198.51.100.1",
            "2001:DB8:100::CF"
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
    "deprecate_any_requests": true,
    "dns_firewall_ips": [
      "203.0.113.1",
      "203.0.113.254",
      "2001:DB8:AB::CF",
      "2001:DB8:CD::CF"
    ],
    "ecs_fallback": false,
    "maximum_cache_ttl": 900,
    "minimum_cache_ttl": 60,
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "My Awesome DNS Firewall cluster",
    "negative_cache_ttl": 900,
    "ratelimit": 600,
    "retries": 2,
    "upstream_ips": [
      "192.0.2.1",
      "198.51.100.1",
      "2001:DB8:100::CF"
    ],
    "attack_mitigation": {
      "enabled": true,
      "only_when_upstream_unhealthy": false
    }
  }
}
```

## Delete DNS Firewall Cluster

**delete** `/accounts/{account_id}/dns_firewall/{dns_firewall_id}`

Delete a DNS Firewall cluster

### Path Parameters

- `account_id: string`

  Identifier.

- `dns_firewall_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_firewall/$DNS_FIREWALL_ID \
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

### Attack Mitigation

- `AttackMitigation object { enabled, only_when_upstream_unhealthy }`

  Attack mitigation settings

  - `enabled: optional boolean`

    When enabled, automatically mitigate random-prefix attacks to protect upstream DNS servers

  - `only_when_upstream_unhealthy: optional boolean`

    Only mitigate attacks when upstream servers seem unhealthy

### Firewall IPs

- `FirewallIPs = string`

  Cloudflare-assigned DNS IPv4 address

### Upstream IPs

- `UpstreamIPs = string`

  Upstream DNS Server IPv4 address

### DNS Firewall List Response

- `DNSFirewallListResponse object { id, deprecate_any_requests, dns_firewall_ips, 10 more }`

  - `id: string`

    Identifier.

  - `deprecate_any_requests: boolean`

    Whether to refuse to answer queries for the ANY type

  - `dns_firewall_ips: array of FirewallIPs`

  - `ecs_fallback: boolean`

    Whether to forward client IP (resolver) subnet if no EDNS Client Subnet is sent

  - `maximum_cache_ttl: number`

    By default, Cloudflare attempts to cache responses for as long as
    indicated by the TTL received from upstream nameservers. This setting
    sets an upper bound on this duration. For caching purposes, higher TTLs
    will be decreased to the maximum value defined by this setting.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

  - `minimum_cache_ttl: number`

    By default, Cloudflare attempts to cache responses for as long as
    indicated by the TTL received from upstream nameservers. This setting
    sets a lower bound on this duration. For caching purposes, lower TTLs
    will be increased to the minimum value defined by this setting.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

    Note that, even with this setting, there is no guarantee that a
    response will be cached for at least the specified duration. Cached
    responses may be removed earlier for capacity or other operational
    reasons.

  - `modified_on: string`

    Last modification of DNS Firewall cluster

  - `name: string`

    DNS Firewall cluster name

  - `negative_cache_ttl: number`

    This setting controls how long DNS Firewall should cache negative
    responses (e.g., NXDOMAIN) from the upstream servers.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

  - `ratelimit: number`

    Maximum number of DNS queries per second that will be forwarded to your upstream nameservers. The limit is enforced per server, where each server receives a fraction of the configured value. The actual aggregate rate for a data center may vary depending on how many servers are present. Responses served from cache do not count toward this limit. Set to null to disable rate limiting.

  - `retries: number`

    Number of retries for fetching DNS responses from upstream nameservers (not counting the initial attempt)

  - `upstream_ips: array of UpstreamIPs`

  - `attack_mitigation: optional AttackMitigation`

    Attack mitigation settings

    - `enabled: optional boolean`

      When enabled, automatically mitigate random-prefix attacks to protect upstream DNS servers

    - `only_when_upstream_unhealthy: optional boolean`

      Only mitigate attacks when upstream servers seem unhealthy

### DNS Firewall Get Response

- `DNSFirewallGetResponse object { id, deprecate_any_requests, dns_firewall_ips, 10 more }`

  - `id: string`

    Identifier.

  - `deprecate_any_requests: boolean`

    Whether to refuse to answer queries for the ANY type

  - `dns_firewall_ips: array of FirewallIPs`

  - `ecs_fallback: boolean`

    Whether to forward client IP (resolver) subnet if no EDNS Client Subnet is sent

  - `maximum_cache_ttl: number`

    By default, Cloudflare attempts to cache responses for as long as
    indicated by the TTL received from upstream nameservers. This setting
    sets an upper bound on this duration. For caching purposes, higher TTLs
    will be decreased to the maximum value defined by this setting.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

  - `minimum_cache_ttl: number`

    By default, Cloudflare attempts to cache responses for as long as
    indicated by the TTL received from upstream nameservers. This setting
    sets a lower bound on this duration. For caching purposes, lower TTLs
    will be increased to the minimum value defined by this setting.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

    Note that, even with this setting, there is no guarantee that a
    response will be cached for at least the specified duration. Cached
    responses may be removed earlier for capacity or other operational
    reasons.

  - `modified_on: string`

    Last modification of DNS Firewall cluster

  - `name: string`

    DNS Firewall cluster name

  - `negative_cache_ttl: number`

    This setting controls how long DNS Firewall should cache negative
    responses (e.g., NXDOMAIN) from the upstream servers.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

  - `ratelimit: number`

    Maximum number of DNS queries per second that will be forwarded to your upstream nameservers. The limit is enforced per server, where each server receives a fraction of the configured value. The actual aggregate rate for a data center may vary depending on how many servers are present. Responses served from cache do not count toward this limit. Set to null to disable rate limiting.

  - `retries: number`

    Number of retries for fetching DNS responses from upstream nameservers (not counting the initial attempt)

  - `upstream_ips: array of UpstreamIPs`

  - `attack_mitigation: optional AttackMitigation`

    Attack mitigation settings

    - `enabled: optional boolean`

      When enabled, automatically mitigate random-prefix attacks to protect upstream DNS servers

    - `only_when_upstream_unhealthy: optional boolean`

      Only mitigate attacks when upstream servers seem unhealthy

### DNS Firewall Create Response

- `DNSFirewallCreateResponse object { id, deprecate_any_requests, dns_firewall_ips, 10 more }`

  - `id: string`

    Identifier.

  - `deprecate_any_requests: boolean`

    Whether to refuse to answer queries for the ANY type

  - `dns_firewall_ips: array of FirewallIPs`

  - `ecs_fallback: boolean`

    Whether to forward client IP (resolver) subnet if no EDNS Client Subnet is sent

  - `maximum_cache_ttl: number`

    By default, Cloudflare attempts to cache responses for as long as
    indicated by the TTL received from upstream nameservers. This setting
    sets an upper bound on this duration. For caching purposes, higher TTLs
    will be decreased to the maximum value defined by this setting.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

  - `minimum_cache_ttl: number`

    By default, Cloudflare attempts to cache responses for as long as
    indicated by the TTL received from upstream nameservers. This setting
    sets a lower bound on this duration. For caching purposes, lower TTLs
    will be increased to the minimum value defined by this setting.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

    Note that, even with this setting, there is no guarantee that a
    response will be cached for at least the specified duration. Cached
    responses may be removed earlier for capacity or other operational
    reasons.

  - `modified_on: string`

    Last modification of DNS Firewall cluster

  - `name: string`

    DNS Firewall cluster name

  - `negative_cache_ttl: number`

    This setting controls how long DNS Firewall should cache negative
    responses (e.g., NXDOMAIN) from the upstream servers.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

  - `ratelimit: number`

    Maximum number of DNS queries per second that will be forwarded to your upstream nameservers. The limit is enforced per server, where each server receives a fraction of the configured value. The actual aggregate rate for a data center may vary depending on how many servers are present. Responses served from cache do not count toward this limit. Set to null to disable rate limiting.

  - `retries: number`

    Number of retries for fetching DNS responses from upstream nameservers (not counting the initial attempt)

  - `upstream_ips: array of UpstreamIPs`

  - `attack_mitigation: optional AttackMitigation`

    Attack mitigation settings

    - `enabled: optional boolean`

      When enabled, automatically mitigate random-prefix attacks to protect upstream DNS servers

    - `only_when_upstream_unhealthy: optional boolean`

      Only mitigate attacks when upstream servers seem unhealthy

### DNS Firewall Edit Response

- `DNSFirewallEditResponse object { id, deprecate_any_requests, dns_firewall_ips, 10 more }`

  - `id: string`

    Identifier.

  - `deprecate_any_requests: boolean`

    Whether to refuse to answer queries for the ANY type

  - `dns_firewall_ips: array of FirewallIPs`

  - `ecs_fallback: boolean`

    Whether to forward client IP (resolver) subnet if no EDNS Client Subnet is sent

  - `maximum_cache_ttl: number`

    By default, Cloudflare attempts to cache responses for as long as
    indicated by the TTL received from upstream nameservers. This setting
    sets an upper bound on this duration. For caching purposes, higher TTLs
    will be decreased to the maximum value defined by this setting.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

  - `minimum_cache_ttl: number`

    By default, Cloudflare attempts to cache responses for as long as
    indicated by the TTL received from upstream nameservers. This setting
    sets a lower bound on this duration. For caching purposes, lower TTLs
    will be increased to the minimum value defined by this setting.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

    Note that, even with this setting, there is no guarantee that a
    response will be cached for at least the specified duration. Cached
    responses may be removed earlier for capacity or other operational
    reasons.

  - `modified_on: string`

    Last modification of DNS Firewall cluster

  - `name: string`

    DNS Firewall cluster name

  - `negative_cache_ttl: number`

    This setting controls how long DNS Firewall should cache negative
    responses (e.g., NXDOMAIN) from the upstream servers.

    This setting does not affect the TTL value in the DNS response
    Cloudflare returns to clients. Cloudflare will always forward the TTL
    value received from upstream nameservers.

  - `ratelimit: number`

    Maximum number of DNS queries per second that will be forwarded to your upstream nameservers. The limit is enforced per server, where each server receives a fraction of the configured value. The actual aggregate rate for a data center may vary depending on how many servers are present. Responses served from cache do not count toward this limit. Set to null to disable rate limiting.

  - `retries: number`

    Number of retries for fetching DNS responses from upstream nameservers (not counting the initial attempt)

  - `upstream_ips: array of UpstreamIPs`

  - `attack_mitigation: optional AttackMitigation`

    Attack mitigation settings

    - `enabled: optional boolean`

      When enabled, automatically mitigate random-prefix attacks to protect upstream DNS servers

    - `only_when_upstream_unhealthy: optional boolean`

      Only mitigate attacks when upstream servers seem unhealthy

### DNS Firewall Delete Response

- `DNSFirewallDeleteResponse object { id }`

  - `id: optional string`

    Identifier.

# Analytics

# Reports

## Table

**get** `/accounts/{account_id}/dns_firewall/{dns_firewall_id}/dns_analytics/report`

Retrieves a list of summarised aggregate metrics over a given time period.

See [Analytics API properties](https://developers.cloudflare.com/dns/reference/analytics-api-properties/) for detailed information about the available query parameters.

### Path Parameters

- `account_id: string`

  Identifier.

- `dns_firewall_id: string`

  Identifier.

### Query Parameters

- `dimensions: optional string`

  A comma-separated list of dimensions to group results by.

- `filters: optional string`

  Segmentation filter in 'attribute operator value' format.

- `limit: optional number`

  Limit number of returned metrics.

- `metrics: optional string`

  A comma-separated list of metrics to query.

- `since: optional string`

  Start date and time of requesting data period in ISO 8601 format.

- `sort: optional string`

  A comma-separated list of dimensions to sort by, where each dimension may be prefixed by - (descending) or + (ascending).

- `until: optional string`

  End date and time of requesting data period in ISO 8601 format.

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

- `result: optional Report`

  - `data: array of object { dimensions, metrics }`

    Array with one row per combination of dimension values.

    - `dimensions: array of string`

      Array of dimension values, representing the combination of dimension values corresponding to this row.

    - `metrics: array of number`

      Array with one item per requested metric. Each item is a single value.

  - `data_lag: number`

    Number of seconds between current time and last processed event, in another words how many seconds of data could be missing.

  - `max: unknown`

    Maximum results for each metric (object mapping metric names to values). Currently always an empty object.

  - `min: unknown`

    Minimum results for each metric (object mapping metric names to values). Currently always an empty object.

  - `query: object { dimensions, limit, metrics, 4 more }`

    - `dimensions: array of string`

      Array of dimension names.

    - `limit: number`

      Limit number of returned metrics.

    - `metrics: array of string`

      Array of metric names.

    - `since: string`

      Start date and time of requesting data period in ISO 8601 format.

    - `until: string`

      End date and time of requesting data period in ISO 8601 format.

    - `filters: optional string`

      Segmentation filter in 'attribute operator value' format.

    - `sort: optional array of string`

      Array of dimensions to sort by, where each dimension may be prefixed by - (descending) or + (ascending).

  - `rows: number`

    Total number of rows in the result.

  - `totals: unknown`

    Total results for metrics across all data (object mapping metric names to values).

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_firewall/$DNS_FIREWALL_ID/dns_analytics/report \
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
    "data": [
      {
        "dimensions": [
          "NODATA"
        ],
        "metrics": [
          0
        ]
      }
    ],
    "data_lag": 60,
    "max": {},
    "min": {},
    "query": {
      "dimensions": [
        "responseCode",
        "queryName"
      ],
      "limit": 100,
      "metrics": [
        "queryCount",
        "responseTimeAvg"
      ],
      "since": "2023-11-11T12:00:00Z",
      "until": "2023-11-11T13:00:00Z",
      "filters": "responseCode==NOERROR,queryType==A",
      "sort": [
        "+responseCode",
        "-queryName"
      ]
    },
    "rows": 100,
    "totals": {}
  }
}
```

# Bytimes

## By Time

**get** `/accounts/{account_id}/dns_firewall/{dns_firewall_id}/dns_analytics/report/bytime`

Retrieves a list of aggregate metrics grouped by time interval.

See [Analytics API properties](https://developers.cloudflare.com/dns/reference/analytics-api-properties/) for detailed information about the available query parameters.

### Path Parameters

- `account_id: string`

  Identifier.

- `dns_firewall_id: string`

  Identifier.

### Query Parameters

- `dimensions: optional string`

  A comma-separated list of dimensions to group results by.

- `filters: optional string`

  Segmentation filter in 'attribute operator value' format.

- `limit: optional number`

  Limit number of returned metrics.

- `metrics: optional string`

  A comma-separated list of metrics to query.

- `since: optional string`

  Start date and time of requesting data period in ISO 8601 format.

- `sort: optional string`

  A comma-separated list of dimensions to sort by, where each dimension may be prefixed by - (descending) or + (ascending).

- `time_delta: optional "all" or "auto" or "year" or 7 more`

  Unit of time to group data by.

  - `"all"`

  - `"auto"`

  - `"year"`

  - `"quarter"`

  - `"month"`

  - `"week"`

  - `"day"`

  - `"hour"`

  - `"dekaminute"`

  - `"minute"`

- `until: optional string`

  End date and time of requesting data period in ISO 8601 format.

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

- `result: optional ByTime`

  - `data: array of object { dimensions, metrics }`

    Array with one row per combination of dimension values.

    - `dimensions: array of string`

      Array of dimension values, representing the combination of dimension values corresponding to this row.

    - `metrics: array of array of number`

      Array with one item per requested metric. Each item is an array of values, broken down by time interval.

  - `data_lag: number`

    Number of seconds between current time and last processed event, in another words how many seconds of data could be missing.

  - `max: unknown`

    Maximum results for each metric (object mapping metric names to values). Currently always an empty object.

  - `min: unknown`

    Minimum results for each metric (object mapping metric names to values). Currently always an empty object.

  - `query: object { dimensions, limit, metrics, 5 more }`

    - `dimensions: array of string`

      Array of dimension names.

    - `limit: number`

      Limit number of returned metrics.

    - `metrics: array of string`

      Array of metric names.

    - `since: string`

      Start date and time of requesting data period in ISO 8601 format.

    - `time_delta: "all" or "auto" or "year" or 7 more`

      Unit of time to group data by.

      - `"all"`

      - `"auto"`

      - `"year"`

      - `"quarter"`

      - `"month"`

      - `"week"`

      - `"day"`

      - `"hour"`

      - `"dekaminute"`

      - `"minute"`

    - `until: string`

      End date and time of requesting data period in ISO 8601 format.

    - `filters: optional string`

      Segmentation filter in 'attribute operator value' format.

    - `sort: optional array of string`

      Array of dimensions to sort by, where each dimension may be prefixed by - (descending) or + (ascending).

  - `rows: number`

    Total number of rows in the result.

  - `time_intervals: array of array of string`

    Array of time intervals in the response data. Each interval is represented as an array containing two values: the start time, and the end time.

  - `totals: unknown`

    Total results for metrics across all data (object mapping metric names to values).

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_firewall/$DNS_FIREWALL_ID/dns_analytics/report/bytime \
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
    "data": [
      {
        "dimensions": [
          "NODATA"
        ],
        "metrics": [
          [
            0
          ]
        ]
      }
    ],
    "data_lag": 60,
    "max": {},
    "min": {},
    "query": {
      "dimensions": [
        "responseCode",
        "queryName"
      ],
      "limit": 100,
      "metrics": [
        "queryCount",
        "responseTimeAvg"
      ],
      "since": "2023-11-11T12:00:00Z",
      "time_delta": "hour",
      "until": "2023-11-11T13:00:00Z",
      "filters": "responseCode==NOERROR,queryType==A",
      "sort": [
        "+responseCode",
        "-queryName"
      ]
    },
    "rows": 100,
    "time_intervals": [
      [
        "2023-11-11T12:00:00Z"
      ]
    ],
    "totals": {}
  }
}
```

# Reverse DNS

## Show DNS Firewall Cluster Reverse DNS

**get** `/accounts/{account_id}/dns_firewall/{dns_firewall_id}/reverse_dns`

Show reverse DNS configuration (PTR records) for a DNS Firewall cluster

### Path Parameters

- `account_id: string`

  Identifier.

- `dns_firewall_id: string`

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

- `result: optional object { ptr }`

  - `ptr: map[string]`

    Map of cluster IP addresses to PTR record contents

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_firewall/$DNS_FIREWALL_ID/reverse_dns \
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
    "ptr": {
      "foo": "string"
    }
  }
}
```

## Update DNS Firewall Cluster Reverse DNS

**patch** `/accounts/{account_id}/dns_firewall/{dns_firewall_id}/reverse_dns`

Update reverse DNS configuration (PTR records) for a DNS Firewall cluster

### Path Parameters

- `account_id: string`

  Identifier.

- `dns_firewall_id: string`

  Identifier.

### Body Parameters

- `ptr: optional map[string]`

  Map of cluster IP addresses to PTR record contents

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

- `result: optional object { ptr }`

  - `ptr: map[string]`

    Map of cluster IP addresses to PTR record contents

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_firewall/$DNS_FIREWALL_ID/reverse_dns \
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
    "ptr": {
      "foo": "string"
    }
  }
}
```

## Domain Types

### Reverse DNS Get Response

- `ReverseDNSGetResponse object { ptr }`

  - `ptr: map[string]`

    Map of cluster IP addresses to PTR record contents

### Reverse DNS Edit Response

- `ReverseDNSEditResponse object { ptr }`

  - `ptr: map[string]`

    Map of cluster IP addresses to PTR record contents
