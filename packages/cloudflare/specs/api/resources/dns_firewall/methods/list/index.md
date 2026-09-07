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
