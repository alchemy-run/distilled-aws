# Pools

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

## Pool Details

**get** `/accounts/{account_id}/load_balancers/pools/{pool_id}`

Fetch a single configured pool.

### Path Parameters

- `account_id: string`

  Identifier.

- `pool_id: string`

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

- `result: Pool`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/pools/$POOL_ID \
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
  "result": {
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
  },
  "success": true
}
```

## Create Pool

**post** `/accounts/{account_id}/load_balancers/pools`

Create a new pool.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `name: string`

  A short name (tag) for the pool. Only alphanumeric characters, hyphens, and underscores are allowed.

- `origins: array of Origin`

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

- `description: optional string`

  A human-readable description of the pool.

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

- `monitor: optional string`

  The ID of the Monitor to use for checking the health of origins within this pool.

- `monitor_group: optional string`

  The ID of the Monitor Group to use for checking the health of origins within this pool.

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

- `result: Pool`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/pools \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "primary-dc-1",
          "origins": [
            {}
          ],
          "description": "Primary data center - Provider XYZ",
          "notification_email": "someone@example.com,sometwo@example.com",
          "notification_filter": {
            "origin": {
              "disable": true
            },
            "pool": {
              "healthy": false
            }
          }
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
  "result": {
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
  },
  "success": true
}
```

## Update Pool

**put** `/accounts/{account_id}/load_balancers/pools/{pool_id}`

Modify a configured pool.

### Path Parameters

- `account_id: string`

  Identifier.

- `pool_id: string`

### Body Parameters

- `name: string`

  A short name (tag) for the pool. Only alphanumeric characters, hyphens, and underscores are allowed.

- `origins: array of Origin`

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

- `description: optional string`

  A human-readable description of the pool.

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

- `monitor: optional string`

  The ID of the Monitor to use for checking the health of origins within this pool.

- `monitor_group: optional string`

  The ID of the Monitor Group to use for checking the health of origins within this pool.

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

- `result: Pool`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/pools/$POOL_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "primary-dc-1",
          "origins": [
            {}
          ],
          "check_regions": [
            "WEU",
            "ENAM"
          ],
          "description": "Primary data center - Provider XYZ",
          "notification_email": "someone@example.com,sometwo@example.com",
          "notification_filter": {
            "origin": {
              "disable": true
            },
            "pool": {
              "healthy": false
            }
          }
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
  "result": {
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
  },
  "success": true
}
```

## Patch Pool

**patch** `/accounts/{account_id}/load_balancers/pools/{pool_id}`

Apply changes to an existing pool, overwriting the supplied properties.

### Path Parameters

- `account_id: string`

  Identifier.

- `pool_id: string`

### Body Parameters

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

- `description: optional string`

  A human-readable description of the pool.

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

- `monitor: optional string`

  The ID of the Monitor to use for checking the health of origins within this pool.

- `monitor_group: optional string`

  The ID of the Monitor Group to use for checking the health of origins within this pool.

- `name: optional string`

  A short name (tag) for the pool. Only alphanumeric characters, hyphens, and underscores are allowed.

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

- `result: Pool`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/pools/$POOL_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "check_regions": [
            "WEU",
            "ENAM"
          ],
          "description": "Primary data center - Provider XYZ",
          "name": "primary-dc-1",
          "notification_email": "someone@example.com,sometwo@example.com",
          "notification_filter": {
            "origin": {
              "disable": true
            },
            "pool": {
              "healthy": false
            }
          }
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
  "result": {
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
  },
  "success": true
}
```

## Delete Pool

**delete** `/accounts/{account_id}/load_balancers/pools/{pool_id}`

Delete a configured pool.

### Path Parameters

- `account_id: string`

  Identifier.

- `pool_id: string`

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

- `result: object { id }`

  - `id: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/pools/$POOL_ID \
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
  "result": {
    "id": "17b5962d775c646f3f9725cbc7a53df4"
  },
  "success": true
}
```

## Patch Pools

**patch** `/accounts/{account_id}/load_balancers/pools`

Apply changes to a number of existing pools, overwriting the supplied properties. Pools are ordered by ascending `name`. Returns the list of affected pools. Supports the standard pagination query parameters, either `limit`/`offset` or `per_page`/`page`.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `notification_email: optional ""`

  The email address to send health status notifications to. This field is now deprecated in favor of Cloudflare Notifications for Load Balancing, so only resetting this field with an empty string `""` is accepted.

  - `""`

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

## Domain Types

### Pool

- `Pool object { id, check_regions, created_on, 16 more }`

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

### Pool Delete Response

- `PoolDeleteResponse object { id }`

  - `id: optional string`

# Health

## Pool Health Details

**get** `/accounts/{account_id}/load_balancers/pools/{pool_id}/health`

Fetch the latest pool health status for a single pool.

### Path Parameters

- `account_id: string`

  Identifier.

- `pool_id: string`

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

- `result: object { pool_id, pop_health }`

  A list of regions from which to run health checks. Null means every Cloudflare data center.

  - `pool_id: optional string`

    Pool ID.

  - `pop_health: optional object { healthy, origins }`

    List of regions and associated health status.

    - `healthy: optional boolean`

      Whether health check in region is healthy.

    - `origins: optional array of object { ip }`

      - `ip: optional object { failure_reason, healthy, response_code, rtt }`

        - `failure_reason: optional string`

          Failure reason.

        - `healthy: optional boolean`

          Origin health status.

        - `response_code: optional number`

          Response code from origin health check.

        - `rtt: optional string`

          Origin RTT (Round Trip Time) response.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/pools/$POOL_ID/health \
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
  "result": {
    "pool_id": "17b5962d775c646f3f9725cbc7a53df4",
    "pop_health": {
      "healthy": true,
      "origins": [
        {
          "ip": {
            "failure_reason": "No failure reasons",
            "healthy": true,
            "response_code": 200,
            "rtt": "201.5ms"
          }
        }
      ]
    }
  },
  "success": true
}
```

## Preview Pool

**post** `/accounts/{account_id}/load_balancers/pools/{pool_id}/preview`

Preview pool health using provided monitor details. The returned preview_id can be used in the preview endpoint to retrieve the results.

### Path Parameters

- `account_id: string`

  Identifier.

- `pool_id: string`

### Body Parameters

- `allow_insecure: optional boolean`

  Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors.

- `consecutive_down: optional number`

  To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times.

- `consecutive_up: optional number`

  To be marked healthy the monitored origin must pass this healthcheck N consecutive times.

- `description: optional string`

  Object description.

- `expected_body: optional string`

  A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy. This parameter is only valid for HTTP and HTTPS monitors.

- `expected_codes: optional string`

  The expected HTTP response code or code range of the health check. This parameter is only valid for HTTP and HTTPS monitors.

- `follow_redirects: optional boolean`

  Follow redirects if returned by the origin. This parameter is only valid for HTTP and HTTPS monitors.

- `header: optional map[array of string]`

  The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only valid for HTTP and HTTPS monitors.

- `interval: optional number`

  The interval between each health check. Shorter intervals may improve failover time, but will increase load on the origins as we check from multiple locations.

- `method: optional string`

  The method to use for the health check. This defaults to 'GET' for HTTP/HTTPS based checks and 'connection_established' for TCP based health checks.

- `path: optional string`

  The endpoint path you want to conduct a health check against. This parameter is only valid for HTTP and HTTPS monitors.

- `port: optional number`

  The port number to connect to for the health check. Required for TCP, UDP, and SMTP checks. HTTP and HTTPS checks should only define the port when using a non-standard port (HTTP: default 80, HTTPS: default 443).

- `probe_zone: optional string`

  Assign this monitor to emulate the specified zone while probing. This parameter is only valid for HTTP and HTTPS monitors.

- `retries: optional number`

  The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.

- `timeout: optional number`

  The timeout (in seconds) before marking the health check as failed.

- `type: optional "http" or "https" or "tcp" or 3 more`

  The protocol to use for the health check. Currently supported protocols are 'HTTP','HTTPS', 'TCP', 'ICMP-PING', 'UDP-ICMP', and 'SMTP'.

  - `"http"`

  - `"https"`

  - `"tcp"`

  - `"udp_icmp"`

  - `"icmp_ping"`

  - `"smtp"`

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

- `result: object { pools, preview_id }`

  - `pools: optional map[string]`

    Monitored pool IDs mapped to their respective names.

  - `preview_id: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/pools/$POOL_ID/preview \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "allow_insecure": true,
          "description": "Login page monitor",
          "expected_body": "alive",
          "expected_codes": "2xx",
          "follow_redirects": true,
          "header": {
            "Host": [
              "example.com"
            ],
            "X-App-ID": [
              "abc123"
            ]
          },
          "method": "GET",
          "path": "/health",
          "probe_zone": "example.com",
          "type": "https"
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
  "result": {
    "pools": {
      "abwlnp5jbqn45ecgxd03erbgtxtqai0d": "WNAM Datacenter",
      "ve8h9lrcip5n5bbga9yqmdws28ay5d0l": "EEU Datacenter"
    },
    "preview_id": "f1aba936b94213e5b8dca0c0dbf1f9cc"
  },
  "success": true
}
```

## Domain Types

### Health Get Response

- `HealthGetResponse object { pool_id, pop_health }`

  A list of regions from which to run health checks. Null means every Cloudflare data center.

  - `pool_id: optional string`

    Pool ID.

  - `pop_health: optional object { healthy, origins }`

    List of regions and associated health status.

    - `healthy: optional boolean`

      Whether health check in region is healthy.

    - `origins: optional array of object { ip }`

      - `ip: optional object { failure_reason, healthy, response_code, rtt }`

        - `failure_reason: optional string`

          Failure reason.

        - `healthy: optional boolean`

          Origin health status.

        - `response_code: optional number`

          Response code from origin health check.

        - `rtt: optional string`

          Origin RTT (Round Trip Time) response.

### Health Create Response

- `HealthCreateResponse object { pools, preview_id }`

  - `pools: optional map[string]`

    Monitored pool IDs mapped to their respective names.

  - `preview_id: optional string`

# References

## List Pool References

**get** `/accounts/{account_id}/load_balancers/pools/{pool_id}/references`

Get the list of resources that reference the provided pool.

### Path Parameters

- `account_id: string`

  Identifier.

- `pool_id: string`

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

- `result: array of object { reference_type, resource_id, resource_name, resource_type }`

  List of resources that reference a given pool.

  - `reference_type: optional "*" or "referral" or "referrer"`

    - `"*"`

    - `"referral"`

    - `"referrer"`

  - `resource_id: optional string`

  - `resource_name: optional string`

  - `resource_type: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/pools/$POOL_ID/references \
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
      "reference_type": "referrer",
      "resource_id": "699d98642c564d2e855e9661899b7252",
      "resource_name": "www.example.com",
      "resource_type": "load_balancer"
    },
    {
      "reference_type": "referral",
      "resource_id": "f1aba936b94213e5b8dca0c0dbf1f9cc",
      "resource_name": "Login page monitor",
      "resource_type": "monitor"
    }
  ],
  "success": true
}
```

## Domain Types

### Reference Get Response

- `ReferenceGetResponse object { reference_type, resource_id, resource_name, resource_type }`

  - `reference_type: optional "*" or "referral" or "referrer"`

    - `"*"`

    - `"referral"`

    - `"referrer"`

  - `resource_id: optional string`

  - `resource_name: optional string`

  - `resource_type: optional string`
