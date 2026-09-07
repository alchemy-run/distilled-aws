## List Pools

**get** `/accounts/{account_id}/load_balancers/pools`

List configured pools.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `monitor: optional string`

  The ID of the Monitor to use for checking the health of origins within this pool.

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

- `result: array of Pool`

  - `id: optional string`

  - `check_regions: optional array of CheckRegion`

    A list of regions from which to run health checks. Null means every Cloudflare data center.

    - `"WNAM"`

    - `"ENAM"`

    - `"WEU"`

    - `"EEU"`

    - `"NSAM"`

    - `"SSAM"`

    - `"OC"`

    - `"ME"`

    - `"NAF"`

    - `"SAF"`

    - `"SAS"`

    - `"SEAS"`

    - `"NEAS"`

    - `"ALL_REGIONS"`

  - `created_on: optional string`

  - `description: optional string`

    A human-readable description of the pool.

  - `disabled_at: optional string`

    This field shows up only if the pool is disabled. This field is set with the time the pool was disabled at.

  - `enabled: optional boolean`

    Whether to enable (the default) or disable this pool. Disabled pools will not receive traffic and are excluded from health checks. Disabling a pool will cause any load balancers using it to failover to the next pool (if any).

  - `latitude: optional number`

    The latitude of the data center containing the origins used in this pool in decimal degrees. If this is set, longitude must also be set.

  - `load_shedding: optional LoadShedding`

    Configures load shedding policies and percentages for the pool.

    - `default_percent: optional number`

      The percent of traffic to shed from the pool, according to the default policy. Applies to new sessions and traffic without session affinity.

    - `default_policy: optional "random" or "hash"`

      The default policy to use when load shedding. A random policy randomly sheds a given percent of requests. A hash policy computes a hash over the CF-Connecting-IP address and sheds all requests originating from a percent of IPs.

      - `"random"`

      - `"hash"`

    - `session_percent: optional number`

      The percent of existing sessions to shed from the pool, according to the session policy.

    - `session_policy: optional "hash"`

      Only the hash policy is supported for existing sessions (to avoid exponential decay).

      - `"hash"`

  - `longitude: optional number`

    The longitude of the data center containing the origins used in this pool in decimal degrees. If this is set, latitude must also be set.

  - `minimum_origins: optional number`

    The minimum number of origins that must be healthy for this pool to serve traffic. If the number of healthy origins falls below this number, the pool will be marked unhealthy and will failover to the next available pool.

  - `modified_on: optional string`

  - `monitor: optional string`

    The ID of the Monitor to use for checking the health of origins within this pool.

  - `monitor_group: optional string`

    The ID of the Monitor Group to use for checking the health of origins within this pool.

  - `name: optional string`

    A short name (tag) for the pool. Only alphanumeric characters, hyphens, and underscores are allowed.

  - `networks: optional array of string`

    List of networks where Load Balancer or Pool is enabled.

  - `notification_email: optional string`

    This field is now deprecated. It has been moved to Cloudflare's Centralized Notification service https://developers.cloudflare.com/fundamentals/notifications/. The email address to send health status notifications to. This can be an individual mailbox or a mailing list. Multiple emails can be supplied as a comma delimited list.

  - `notification_filter: optional NotificationFilter`

    Filter pool and origin health notifications by resource type or health status. Use null to reset.

    - `origin: optional FilterOptions`

      Filter options for a particular resource type (pool or origin). Use null to reset.

      - `disable: optional boolean`

        If set true, disable notifications for this type of resource (pool or origin).

      - `healthy: optional boolean`

        If present, send notifications only for this health status (e.g. false for only DOWN events). Use null to reset (all events).

    - `pool: optional FilterOptions`

      Filter options for a particular resource type (pool or origin). Use null to reset.

  - `origin_steering: optional OriginSteering`

    Configures origin steering for the pool. Controls how origins are selected for new sessions and traffic without session affinity.

    - `policy: optional "random" or "hash" or "least_outstanding_requests" or "least_connections"`

      The type of origin steering policy to use.

      - `"random"`: Select an origin randomly.
      - `"hash"`: Select an origin by computing a hash over the CF-Connecting-IP address.
      - `"least_outstanding_requests"`: Select an origin by taking into consideration origin weights, as well as each origin's number of outstanding requests. Origins with more pending requests are weighted proportionately less relative to others.
      - `"least_connections"`: Select an origin by taking into consideration origin weights, as well as each origin's number of open connections. Origins with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.

      - `"random"`

      - `"hash"`

      - `"least_outstanding_requests"`

      - `"least_connections"`

  - `origins: optional array of Origin`

    The list of origins within this pool. Traffic directed at this pool is balanced across all currently healthy origins, provided the pool itself is healthy.

    - `address: optional string`

      The IP address (IPv4 or IPv6) of the origin, or its publicly addressable hostname. Hostnames entered here should resolve directly to the origin, and not be a hostname proxied by Cloudflare. To set an internal/reserved address, virtual_network_id must also be set.

    - `disabled_at: optional string`

      This field shows up only if the origin is disabled. This field is set with the time the origin was disabled.

    - `enabled: optional boolean`

      Whether to enable (the default) this origin within the pool. Disabled origins will not receive traffic and are excluded from health checks. The origin will only be disabled for the current pool.

    - `flatten_cname: optional boolean`

      Whether to flatten CNAME records for this origin, resolving them to A/AAAA records before returning to the client. When true (the default), the director resolves CNAME addresses to their underlying A/AAAA records. When false, the origin address is returned as a raw CNAME record without resolution. This setting mirrors the DNS API record flatten_cname setting.

    - `header: optional Header`

      The request header is used to pass additional information with an HTTP request. Currently supported header is 'Host'.

      - `Host: optional array of Host`

        The 'Host' header allows to override the hostname set in the HTTP request. Current support is 1 'Host' header override per origin.

    - `name: optional string`

      A human-identifiable name for the origin.

    - `port: optional number`

      The port for upstream connections. A value of 0 means the default port for the protocol will be used.

    - `virtual_network_id: optional string`

      The virtual network subnet ID the origin belongs in. Virtual network must also belong to the account.

    - `weight: optional number`

      The weight of this origin relative to other origins in the pool. Based on the configured weight the total traffic is distributed among origins within the pool.

      - `origin_steering.policy="least_outstanding_requests"`: Use weight to scale the origin's outstanding requests.
      - `origin_steering.policy="least_connections"`: Use weight to scale the origin's open connections.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results on the current page.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    Total number of pages available.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/pools \
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
  "result": [
    {
      "id": "17b5962d775c646f3f9725cbc7a53df4",
      "check_regions": [
        "WEU",
        "ENAM"
      ],
      "created_on": "2014-01-01T05:20:00.12345Z",
      "description": "Primary data center - Provider XYZ",
      "disabled_at": "2019-12-27T18:11:19.117Z",
      "enabled": false,
      "latitude": 0,
      "load_shedding": {
        "default_percent": 0,
        "default_policy": "random",
        "session_percent": 0,
        "session_policy": "hash"
      },
      "longitude": 0,
      "minimum_origins": 0,
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "monitor": "monitor",
      "monitor_group": "monitor_group",
      "name": "primary-dc-1",
      "networks": [
        "string"
      ],
      "notification_email": "someone@example.com,sometwo@example.com",
      "notification_filter": {
        "origin": {
          "disable": true,
          "healthy": true
        },
        "pool": {
          "disable": true,
          "healthy": false
        }
      },
      "origin_steering": {
        "policy": "random"
      },
      "origins": [
        {
          "address": "0.0.0.0",
          "disabled_at": "2019-12-27T18:11:19.117Z",
          "enabled": true,
          "flatten_cname": true,
          "header": {
            "Host": [
              "example.com"
            ]
          },
          "name": "app-server-1",
          "port": 0,
          "virtual_network_id": "a5624d4e-044a-4ff0-b3e1-e2465353d4b4",
          "weight": 0.6
        }
      ]
    }
  ],
  "success": true,
  "result_info": {
    "count": 20,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```
