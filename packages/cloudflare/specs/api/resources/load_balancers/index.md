# Load Balancers

## List Load Balancers

**get** `/zones/{zone_id}/load_balancers`

List configured load balancers.

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

- `result: array of LoadBalancer`

  - `id: optional string`

  - `adaptive_routing: optional AdaptiveRouting`

    Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

    - `failover_across_pools: optional boolean`

      Extends zero-downtime failover of requests to healthy origins from alternate pools, when no healthy alternate exists in the same pool, according to the failover order defined by traffic and origin steering. When set false (the default) zero-downtime failover will only occur between origins within the same pool. See `session_affinity_attributes` for control over when sessions are broken or reassigned.

  - `country_pools: optional map[array of string]`

    A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool mapping if it exists else to default_pools.

  - `created_on: optional string`

  - `default_pools: optional array of DefaultPools`

    A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region.

  - `description: optional string`

    Object description.

  - `enabled: optional boolean`

    Whether to enable (the default) this load balancer.

  - `fallback_pool: optional string`

    The pool ID to use when all other pools are detected as unhealthy.

  - `location_strategy: optional LocationStrategy`

    Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.

    - `mode: optional "pop" or "resolver_ip"`

      Determines the authoritative location when ECS is not preferred, does not exist in the request, or its GeoIP lookup is unsuccessful.

      - `"pop"`: Use the Cloudflare PoP location.
      - `"resolver_ip"`: Use the DNS resolver GeoIP location. If the GeoIP lookup is unsuccessful, use the Cloudflare PoP location.

      - `"pop"`

      - `"resolver_ip"`

    - `prefer_ecs: optional "always" or "never" or "proximity" or "geo"`

      Whether the EDNS Client Subnet (ECS) GeoIP should be preferred as the authoritative location.

      - `"always"`: Always prefer ECS.
      - `"never"`: Never prefer ECS.
      - `"proximity"`: Prefer ECS only when `steering_policy="proximity"`.
      - `"geo"`: Prefer ECS only when `steering_policy="geo"`.

      - `"always"`

      - `"never"`

      - `"proximity"`

      - `"geo"`

  - `modified_on: optional string`

  - `name: optional string`

    The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare's DNS, the Load Balancer will take precedence and the DNS record will not be used.

  - `networks: optional array of string`

    List of networks where Load Balancer or Pool is enabled.

  - `pop_pools: optional map[array of string]`

    Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using the corresponding country_pool, then region_pool mapping if it exists else to default_pools.

  - `proxied: optional boolean`

    Whether the hostname should be gray clouded (false) or orange clouded (true).

  - `random_steering: optional RandomSteering`

    Configures pool weights.

    - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights.
    - `steering_policy="least_outstanding_requests"`: Use pool weights to scale each pool's outstanding requests.
    - `steering_policy="least_connections"`: Use pool weights to scale each pool's open connections.

    - `default_weight: optional number`

      The default weight for pools in the load balancer that are not specified in the pool_weights map.

    - `pool_weights: optional map[number]`

      A mapping of pool IDs to custom weights. The weight is relative to other pools in the load balancer.

  - `region_pools: optional map[array of string]`

    A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools.

  - `rules: optional array of Rules`

    BETA Field Not General Access: A list of rules for this load balancer to execute.

    - `condition: optional string`

      The condition expressions to evaluate. If the condition evaluates to true, the overrides or fixed_response in this rule will be applied. An empty condition is always true. For more details on condition expressions, please see https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-rules/expressions.

    - `disabled: optional boolean`

      Disable this specific rule. It will no longer be evaluated by this load balancer.

    - `fixed_response: optional object { content_type, location, message_body, status_code }`

      A collection of fields used to directly respond to the eyeball instead of routing to a pool. If a fixed_response is supplied the rule will be marked as terminates.

      - `content_type: optional string`

        The http 'Content-Type' header to include in the response.

      - `location: optional string`

        The http 'Location' header to include in the response.

      - `message_body: optional string`

        Text to include as the http body.

      - `status_code: optional number`

        The http status code to respond with.

    - `name: optional string`

      Name of this rule. Only used for human readability.

    - `overrides: optional object { adaptive_routing, country_pools, default_pools, 10 more }`

      A collection of overrides to apply to the load balancer when this rule's condition is true. All fields are optional.

      - `adaptive_routing: optional AdaptiveRouting`

        Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

      - `country_pools: optional map[array of string]`

        A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool mapping if it exists else to default_pools.

      - `default_pools: optional array of DefaultPools`

        A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region.

      - `fallback_pool: optional string`

        The pool ID to use when all other pools are detected as unhealthy.

      - `location_strategy: optional LocationStrategy`

        Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.

      - `pop_pools: optional map[array of string]`

        Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using the corresponding country_pool, then region_pool mapping if it exists else to default_pools.

      - `random_steering: optional RandomSteering`

        Configures pool weights.

        - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights.
        - `steering_policy="least_outstanding_requests"`: Use pool weights to scale each pool's outstanding requests.
        - `steering_policy="least_connections"`: Use pool weights to scale each pool's open connections.

      - `region_pools: optional map[array of string]`

        A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools.

      - `session_affinity: optional SessionAffinity`

        Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - `"ip_cookie"`: Behaves the same as `"cookie"` except the initial origin selection is stable and based on the client's ip address. - `"header"`: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see `session_affinity_attributes.headers`) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of `session_affinity_ttl` seconds or the origin server is unhealthy, then a new origin server is calculated and used. See `headers` in `session_affinity_attributes` for additional required configuration.

        - `"none"`

        - `"cookie"`

        - `"ip_cookie"`

        - `"header"`

      - `session_affinity_attributes: optional SessionAffinityAttributes`

        Configures attributes for session affinity.

        - `drain_duration: optional number`

          Configures the drain duration in seconds. This field is only used when session affinity is enabled on the load balancer.

        - `headers: optional array of string`

          Configures the names of HTTP headers to base session affinity on when header `session_affinity` is enabled. At least one HTTP header name must be provided. To specify the exact cookies to be used, include an item in the following format: `"cookie:<cookie-name-1>,<cookie-name-2>"` (example) where everything after the colon is a comma-separated list of cookie names. Providing only `"cookie"` will result in all cookies being used. The default max number of HTTP header names that can be provided depends on your plan: 5 for Enterprise, 1 for all other plans.

        - `require_all_headers: optional boolean`

          When header `session_affinity` is enabled, this option can be used to specify how HTTP headers on load balancing requests will be used. The supported values are: - `"true"`: Load balancing requests must contain *all* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren't created. - `"false"`: Load balancing requests must contain *at least one* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren't created.

        - `samesite: optional "Auto" or "Lax" or "None" or "Strict"`

          Configures the SameSite attribute on session affinity cookie. Value "Auto" will be translated to "Lax" or "None" depending if Always Use HTTPS is enabled. Note: when using value "None", the secure attribute can not be set to "Never".

          - `"Auto"`

          - `"Lax"`

          - `"None"`

          - `"Strict"`

        - `secure: optional "Auto" or "Always" or "Never"`

          Configures the Secure attribute on session affinity cookie. Value "Always" indicates the Secure attribute will be set in the Set-Cookie header, "Never" indicates the Secure attribute will not be set, and "Auto" will set the Secure attribute depending if Always Use HTTPS is enabled.

          - `"Auto"`

          - `"Always"`

          - `"Never"`

        - `zero_downtime_failover: optional "none" or "temporary" or "sticky"`

          Configures the zero-downtime failover between origins within a pool when session affinity is enabled. This feature is currently incompatible with Argo, Tiered Cache, and Bandwidth Alliance. The supported values are: - `"none"`: No failover takes place for sessions pinned to the origin (default). - `"temporary"`: Traffic will be sent to another other healthy origin until the originally pinned origin is available; note that this can potentially result in heavy origin flapping. - `"sticky"`: The session affinity cookie is updated and subsequent requests are sent to the new origin. Note: Zero-downtime failover with sticky sessions is currently not supported for session affinity by header.

          - `"none"`

          - `"temporary"`

          - `"sticky"`

      - `session_affinity_ttl: optional number`

        Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `session_affinity` policy are: - `"cookie"` / `"ip_cookie"`: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between [1800, 604800]. - `"header"`: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between [30, 3600]. Note: With session affinity by header, sessions only expire after they haven't been used for the number of seconds specified.

      - `steering_policy: optional SteeringPolicy`

        Steering Policy for this load balancer.

        - `"off"`: Use `default_pools`.
        - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determined by `location_strategy`.
        - `"random"`: Select a pool randomly.
        - `"dynamic_latency"`: Use round trip time to select the closest pool in default_pools (requires pool health checks).
        - `"proximity"`: Use the pools' latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by `location_strategy` for non-proxied requests.
        - `"least_outstanding_requests"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
        - `"least_connections"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
        - `""`: Will map to `"geo"` if you use `region_pools`/`country_pools`/`pop_pools` otherwise `"off"`.

        - `"off"`

        - `"geo"`

        - `"random"`

        - `"dynamic_latency"`

        - `"proximity"`

        - `"least_outstanding_requests"`

        - `"least_connections"`

        - `""`

      - `ttl: optional number`

        Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.

    - `priority: optional number`

      The order in which rules should be executed in relation to each other. Lower values are executed first. Values do not need to be sequential. If no value is provided for any rule the array order of the rules field will be used to assign a priority.

    - `terminates: optional boolean`

      If this rule's condition is true, this causes rule evaluation to stop after processing this rule.

  - `session_affinity: optional SessionAffinity`

    Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - `"ip_cookie"`: Behaves the same as `"cookie"` except the initial origin selection is stable and based on the client's ip address. - `"header"`: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see `session_affinity_attributes.headers`) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of `session_affinity_ttl` seconds or the origin server is unhealthy, then a new origin server is calculated and used. See `headers` in `session_affinity_attributes` for additional required configuration.

  - `session_affinity_attributes: optional SessionAffinityAttributes`

    Configures attributes for session affinity.

  - `session_affinity_ttl: optional number`

    Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `session_affinity` policy are: - `"cookie"` / `"ip_cookie"`: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between [1800, 604800]. - `"header"`: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between [30, 3600]. Note: With session affinity by header, sessions only expire after they haven't been used for the number of seconds specified.

  - `steering_policy: optional SteeringPolicy`

    Steering Policy for this load balancer.

    - `"off"`: Use `default_pools`.
    - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determined by `location_strategy`.
    - `"random"`: Select a pool randomly.
    - `"dynamic_latency"`: Use round trip time to select the closest pool in default_pools (requires pool health checks).
    - `"proximity"`: Use the pools' latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by `location_strategy` for non-proxied requests.
    - `"least_outstanding_requests"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
    - `"least_connections"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
    - `""`: Will map to `"geo"` if you use `region_pools`/`country_pools`/`pop_pools` otherwise `"off"`.

  - `ttl: optional number`

    Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.

  - `zone_name: optional string`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/load_balancers \
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
      "id": "699d98642c564d2e855e9661899b7252",
      "adaptive_routing": {
        "failover_across_pools": true
      },
      "country_pools": {
        "GB": [
          "abd90f38ced07c2e2f4df50b1f61d4194"
        ],
        "US": [
          "de90f38ced07c2e2f4df50b1f61d4194",
          "00920f38ce07c2e2f4df50b1f61d4194"
        ]
      },
      "created_on": "2014-01-01T05:20:00.12345Z",
      "default_pools": [
        "17b5962d775c646f3f9725cbc7a53df4",
        "9290f38c5d07c2e2f4df57b1f61d4196",
        "00920f38ce07c2e2f4df50b1f61d4194"
      ],
      "description": "Load Balancer for www.example.com",
      "enabled": true,
      "fallback_pool": "fallback_pool",
      "location_strategy": {
        "mode": "resolver_ip",
        "prefer_ecs": "always"
      },
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "name": "www.example.com",
      "networks": [
        "string"
      ],
      "pop_pools": {
        "LAX": [
          "de90f38ced07c2e2f4df50b1f61d4194",
          "9290f38c5d07c2e2f4df57b1f61d4196"
        ],
        "LHR": [
          "abd90f38ced07c2e2f4df50b1f61d4194",
          "f9138c5d07c2e2f4df57b1f61d4196"
        ],
        "SJC": [
          "00920f38ce07c2e2f4df50b1f61d4194"
        ]
      },
      "proxied": true,
      "random_steering": {
        "default_weight": 0.2,
        "pool_weights": {
          "9290f38c5d07c2e2f4df57b1f61d4196": 0.5,
          "de90f38ced07c2e2f4df50b1f61d4194": 0.3
        }
      },
      "region_pools": {
        "ENAM": [
          "00920f38ce07c2e2f4df50b1f61d4194"
        ],
        "WNAM": [
          "de90f38ced07c2e2f4df50b1f61d4194",
          "9290f38c5d07c2e2f4df57b1f61d4196"
        ]
      },
      "rules": [
        {
          "condition": "http.request.uri.path contains \"/testing\"",
          "disabled": true,
          "fixed_response": {
            "content_type": "application/json",
            "location": "www.example.com",
            "message_body": "Testing Hello",
            "status_code": 0
          },
          "name": "route the path /testing to testing datacenter.",
          "overrides": {
            "adaptive_routing": {
              "failover_across_pools": true
            },
            "country_pools": {
              "GB": [
                "abd90f38ced07c2e2f4df50b1f61d4194"
              ],
              "US": [
                "de90f38ced07c2e2f4df50b1f61d4194",
                "00920f38ce07c2e2f4df50b1f61d4194"
              ]
            },
            "default_pools": [
              "17b5962d775c646f3f9725cbc7a53df4",
              "9290f38c5d07c2e2f4df57b1f61d4196",
              "00920f38ce07c2e2f4df50b1f61d4194"
            ],
            "fallback_pool": "fallback_pool",
            "location_strategy": {
              "mode": "resolver_ip",
              "prefer_ecs": "always"
            },
            "pop_pools": {
              "LAX": [
                "de90f38ced07c2e2f4df50b1f61d4194",
                "9290f38c5d07c2e2f4df57b1f61d4196"
              ],
              "LHR": [
                "abd90f38ced07c2e2f4df50b1f61d4194",
                "f9138c5d07c2e2f4df57b1f61d4196"
              ],
              "SJC": [
                "00920f38ce07c2e2f4df50b1f61d4194"
              ]
            },
            "random_steering": {
              "default_weight": 0.2,
              "pool_weights": {
                "9290f38c5d07c2e2f4df57b1f61d4196": 0.5,
                "de90f38ced07c2e2f4df50b1f61d4194": 0.3
              }
            },
            "region_pools": {
              "ENAM": [
                "00920f38ce07c2e2f4df50b1f61d4194"
              ],
              "WNAM": [
                "de90f38ced07c2e2f4df50b1f61d4194",
                "9290f38c5d07c2e2f4df57b1f61d4196"
              ]
            },
            "session_affinity": "cookie",
            "session_affinity_attributes": {
              "drain_duration": 100,
              "headers": [
                "x"
              ],
              "require_all_headers": true,
              "samesite": "Auto",
              "secure": "Auto",
              "zero_downtime_failover": "sticky"
            },
            "session_affinity_ttl": 1800,
            "steering_policy": "dynamic_latency",
            "ttl": 30
          },
          "priority": 0,
          "terminates": true
        }
      ],
      "session_affinity": "cookie",
      "session_affinity_attributes": {
        "drain_duration": 100,
        "headers": [
          "x"
        ],
        "require_all_headers": true,
        "samesite": "Auto",
        "secure": "Auto",
        "zero_downtime_failover": "sticky"
      },
      "session_affinity_ttl": 1800,
      "steering_policy": "dynamic_latency",
      "ttl": 30,
      "zone_name": "example.com"
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

## Load Balancer Details

**get** `/zones/{zone_id}/load_balancers/{load_balancer_id}`

Fetch a single configured load balancer.

### Path Parameters

- `zone_id: string`

- `load_balancer_id: string`

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

- `result: LoadBalancer`

  - `id: optional string`

  - `adaptive_routing: optional AdaptiveRouting`

    Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

    - `failover_across_pools: optional boolean`

      Extends zero-downtime failover of requests to healthy origins from alternate pools, when no healthy alternate exists in the same pool, according to the failover order defined by traffic and origin steering. When set false (the default) zero-downtime failover will only occur between origins within the same pool. See `session_affinity_attributes` for control over when sessions are broken or reassigned.

  - `country_pools: optional map[array of string]`

    A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool mapping if it exists else to default_pools.

  - `created_on: optional string`

  - `default_pools: optional array of DefaultPools`

    A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region.

  - `description: optional string`

    Object description.

  - `enabled: optional boolean`

    Whether to enable (the default) this load balancer.

  - `fallback_pool: optional string`

    The pool ID to use when all other pools are detected as unhealthy.

  - `location_strategy: optional LocationStrategy`

    Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.

    - `mode: optional "pop" or "resolver_ip"`

      Determines the authoritative location when ECS is not preferred, does not exist in the request, or its GeoIP lookup is unsuccessful.

      - `"pop"`: Use the Cloudflare PoP location.
      - `"resolver_ip"`: Use the DNS resolver GeoIP location. If the GeoIP lookup is unsuccessful, use the Cloudflare PoP location.

      - `"pop"`

      - `"resolver_ip"`

    - `prefer_ecs: optional "always" or "never" or "proximity" or "geo"`

      Whether the EDNS Client Subnet (ECS) GeoIP should be preferred as the authoritative location.

      - `"always"`: Always prefer ECS.
      - `"never"`: Never prefer ECS.
      - `"proximity"`: Prefer ECS only when `steering_policy="proximity"`.
      - `"geo"`: Prefer ECS only when `steering_policy="geo"`.

      - `"always"`

      - `"never"`

      - `"proximity"`

      - `"geo"`

  - `modified_on: optional string`

  - `name: optional string`

    The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare's DNS, the Load Balancer will take precedence and the DNS record will not be used.

  - `networks: optional array of string`

    List of networks where Load Balancer or Pool is enabled.

  - `pop_pools: optional map[array of string]`

    Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using the corresponding country_pool, then region_pool mapping if it exists else to default_pools.

  - `proxied: optional boolean`

    Whether the hostname should be gray clouded (false) or orange clouded (true).

  - `random_steering: optional RandomSteering`

    Configures pool weights.

    - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights.
    - `steering_policy="least_outstanding_requests"`: Use pool weights to scale each pool's outstanding requests.
    - `steering_policy="least_connections"`: Use pool weights to scale each pool's open connections.

    - `default_weight: optional number`

      The default weight for pools in the load balancer that are not specified in the pool_weights map.

    - `pool_weights: optional map[number]`

      A mapping of pool IDs to custom weights. The weight is relative to other pools in the load balancer.

  - `region_pools: optional map[array of string]`

    A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools.

  - `rules: optional array of Rules`

    BETA Field Not General Access: A list of rules for this load balancer to execute.

    - `condition: optional string`

      The condition expressions to evaluate. If the condition evaluates to true, the overrides or fixed_response in this rule will be applied. An empty condition is always true. For more details on condition expressions, please see https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-rules/expressions.

    - `disabled: optional boolean`

      Disable this specific rule. It will no longer be evaluated by this load balancer.

    - `fixed_response: optional object { content_type, location, message_body, status_code }`

      A collection of fields used to directly respond to the eyeball instead of routing to a pool. If a fixed_response is supplied the rule will be marked as terminates.

      - `content_type: optional string`

        The http 'Content-Type' header to include in the response.

      - `location: optional string`

        The http 'Location' header to include in the response.

      - `message_body: optional string`

        Text to include as the http body.

      - `status_code: optional number`

        The http status code to respond with.

    - `name: optional string`

      Name of this rule. Only used for human readability.

    - `overrides: optional object { adaptive_routing, country_pools, default_pools, 10 more }`

      A collection of overrides to apply to the load balancer when this rule's condition is true. All fields are optional.

      - `adaptive_routing: optional AdaptiveRouting`

        Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

      - `country_pools: optional map[array of string]`

        A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool mapping if it exists else to default_pools.

      - `default_pools: optional array of DefaultPools`

        A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region.

      - `fallback_pool: optional string`

        The pool ID to use when all other pools are detected as unhealthy.

      - `location_strategy: optional LocationStrategy`

        Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.

      - `pop_pools: optional map[array of string]`

        Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using the corresponding country_pool, then region_pool mapping if it exists else to default_pools.

      - `random_steering: optional RandomSteering`

        Configures pool weights.

        - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights.
        - `steering_policy="least_outstanding_requests"`: Use pool weights to scale each pool's outstanding requests.
        - `steering_policy="least_connections"`: Use pool weights to scale each pool's open connections.

      - `region_pools: optional map[array of string]`

        A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools.

      - `session_affinity: optional SessionAffinity`

        Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - `"ip_cookie"`: Behaves the same as `"cookie"` except the initial origin selection is stable and based on the client's ip address. - `"header"`: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see `session_affinity_attributes.headers`) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of `session_affinity_ttl` seconds or the origin server is unhealthy, then a new origin server is calculated and used. See `headers` in `session_affinity_attributes` for additional required configuration.

        - `"none"`

        - `"cookie"`

        - `"ip_cookie"`

        - `"header"`

      - `session_affinity_attributes: optional SessionAffinityAttributes`

        Configures attributes for session affinity.

        - `drain_duration: optional number`

          Configures the drain duration in seconds. This field is only used when session affinity is enabled on the load balancer.

        - `headers: optional array of string`

          Configures the names of HTTP headers to base session affinity on when header `session_affinity` is enabled. At least one HTTP header name must be provided. To specify the exact cookies to be used, include an item in the following format: `"cookie:<cookie-name-1>,<cookie-name-2>"` (example) where everything after the colon is a comma-separated list of cookie names. Providing only `"cookie"` will result in all cookies being used. The default max number of HTTP header names that can be provided depends on your plan: 5 for Enterprise, 1 for all other plans.

        - `require_all_headers: optional boolean`

          When header `session_affinity` is enabled, this option can be used to specify how HTTP headers on load balancing requests will be used. The supported values are: - `"true"`: Load balancing requests must contain *all* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren't created. - `"false"`: Load balancing requests must contain *at least one* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren't created.

        - `samesite: optional "Auto" or "Lax" or "None" or "Strict"`

          Configures the SameSite attribute on session affinity cookie. Value "Auto" will be translated to "Lax" or "None" depending if Always Use HTTPS is enabled. Note: when using value "None", the secure attribute can not be set to "Never".

          - `"Auto"`

          - `"Lax"`

          - `"None"`

          - `"Strict"`

        - `secure: optional "Auto" or "Always" or "Never"`

          Configures the Secure attribute on session affinity cookie. Value "Always" indicates the Secure attribute will be set in the Set-Cookie header, "Never" indicates the Secure attribute will not be set, and "Auto" will set the Secure attribute depending if Always Use HTTPS is enabled.

          - `"Auto"`

          - `"Always"`

          - `"Never"`

        - `zero_downtime_failover: optional "none" or "temporary" or "sticky"`

          Configures the zero-downtime failover between origins within a pool when session affinity is enabled. This feature is currently incompatible with Argo, Tiered Cache, and Bandwidth Alliance. The supported values are: - `"none"`: No failover takes place for sessions pinned to the origin (default). - `"temporary"`: Traffic will be sent to another other healthy origin until the originally pinned origin is available; note that this can potentially result in heavy origin flapping. - `"sticky"`: The session affinity cookie is updated and subsequent requests are sent to the new origin. Note: Zero-downtime failover with sticky sessions is currently not supported for session affinity by header.

          - `"none"`

          - `"temporary"`

          - `"sticky"`

      - `session_affinity_ttl: optional number`

        Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `session_affinity` policy are: - `"cookie"` / `"ip_cookie"`: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between [1800, 604800]. - `"header"`: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between [30, 3600]. Note: With session affinity by header, sessions only expire after they haven't been used for the number of seconds specified.

      - `steering_policy: optional SteeringPolicy`

        Steering Policy for this load balancer.

        - `"off"`: Use `default_pools`.
        - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determined by `location_strategy`.
        - `"random"`: Select a pool randomly.
        - `"dynamic_latency"`: Use round trip time to select the closest pool in default_pools (requires pool health checks).
        - `"proximity"`: Use the pools' latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by `location_strategy` for non-proxied requests.
        - `"least_outstanding_requests"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
        - `"least_connections"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
        - `""`: Will map to `"geo"` if you use `region_pools`/`country_pools`/`pop_pools` otherwise `"off"`.

        - `"off"`

        - `"geo"`

        - `"random"`

        - `"dynamic_latency"`

        - `"proximity"`

        - `"least_outstanding_requests"`

        - `"least_connections"`

        - `""`

      - `ttl: optional number`

        Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.

    - `priority: optional number`

      The order in which rules should be executed in relation to each other. Lower values are executed first. Values do not need to be sequential. If no value is provided for any rule the array order of the rules field will be used to assign a priority.

    - `terminates: optional boolean`

      If this rule's condition is true, this causes rule evaluation to stop after processing this rule.

  - `session_affinity: optional SessionAffinity`

    Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - `"ip_cookie"`: Behaves the same as `"cookie"` except the initial origin selection is stable and based on the client's ip address. - `"header"`: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see `session_affinity_attributes.headers`) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of `session_affinity_ttl` seconds or the origin server is unhealthy, then a new origin server is calculated and used. See `headers` in `session_affinity_attributes` for additional required configuration.

  - `session_affinity_attributes: optional SessionAffinityAttributes`

    Configures attributes for session affinity.

  - `session_affinity_ttl: optional number`

    Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `session_affinity` policy are: - `"cookie"` / `"ip_cookie"`: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between [1800, 604800]. - `"header"`: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between [30, 3600]. Note: With session affinity by header, sessions only expire after they haven't been used for the number of seconds specified.

  - `steering_policy: optional SteeringPolicy`

    Steering Policy for this load balancer.

    - `"off"`: Use `default_pools`.
    - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determined by `location_strategy`.
    - `"random"`: Select a pool randomly.
    - `"dynamic_latency"`: Use round trip time to select the closest pool in default_pools (requires pool health checks).
    - `"proximity"`: Use the pools' latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by `location_strategy` for non-proxied requests.
    - `"least_outstanding_requests"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
    - `"least_connections"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
    - `""`: Will map to `"geo"` if you use `region_pools`/`country_pools`/`pop_pools` otherwise `"off"`.

  - `ttl: optional number`

    Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.

  - `zone_name: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/load_balancers/$LOAD_BALANCER_ID \
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
    "id": "699d98642c564d2e855e9661899b7252",
    "adaptive_routing": {
      "failover_across_pools": true
    },
    "country_pools": {
      "GB": [
        "abd90f38ced07c2e2f4df50b1f61d4194"
      ],
      "US": [
        "de90f38ced07c2e2f4df50b1f61d4194",
        "00920f38ce07c2e2f4df50b1f61d4194"
      ]
    },
    "created_on": "2014-01-01T05:20:00.12345Z",
    "default_pools": [
      "17b5962d775c646f3f9725cbc7a53df4",
      "9290f38c5d07c2e2f4df57b1f61d4196",
      "00920f38ce07c2e2f4df50b1f61d4194"
    ],
    "description": "Load Balancer for www.example.com",
    "enabled": true,
    "fallback_pool": "fallback_pool",
    "location_strategy": {
      "mode": "resolver_ip",
      "prefer_ecs": "always"
    },
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "www.example.com",
    "networks": [
      "string"
    ],
    "pop_pools": {
      "LAX": [
        "de90f38ced07c2e2f4df50b1f61d4194",
        "9290f38c5d07c2e2f4df57b1f61d4196"
      ],
      "LHR": [
        "abd90f38ced07c2e2f4df50b1f61d4194",
        "f9138c5d07c2e2f4df57b1f61d4196"
      ],
      "SJC": [
        "00920f38ce07c2e2f4df50b1f61d4194"
      ]
    },
    "proxied": true,
    "random_steering": {
      "default_weight": 0.2,
      "pool_weights": {
        "9290f38c5d07c2e2f4df57b1f61d4196": 0.5,
        "de90f38ced07c2e2f4df50b1f61d4194": 0.3
      }
    },
    "region_pools": {
      "ENAM": [
        "00920f38ce07c2e2f4df50b1f61d4194"
      ],
      "WNAM": [
        "de90f38ced07c2e2f4df50b1f61d4194",
        "9290f38c5d07c2e2f4df57b1f61d4196"
      ]
    },
    "rules": [
      {
        "condition": "http.request.uri.path contains \"/testing\"",
        "disabled": true,
        "fixed_response": {
          "content_type": "application/json",
          "location": "www.example.com",
          "message_body": "Testing Hello",
          "status_code": 0
        },
        "name": "route the path /testing to testing datacenter.",
        "overrides": {
          "adaptive_routing": {
            "failover_across_pools": true
          },
          "country_pools": {
            "GB": [
              "abd90f38ced07c2e2f4df50b1f61d4194"
            ],
            "US": [
              "de90f38ced07c2e2f4df50b1f61d4194",
              "00920f38ce07c2e2f4df50b1f61d4194"
            ]
          },
          "default_pools": [
            "17b5962d775c646f3f9725cbc7a53df4",
            "9290f38c5d07c2e2f4df57b1f61d4196",
            "00920f38ce07c2e2f4df50b1f61d4194"
          ],
          "fallback_pool": "fallback_pool",
          "location_strategy": {
            "mode": "resolver_ip",
            "prefer_ecs": "always"
          },
          "pop_pools": {
            "LAX": [
              "de90f38ced07c2e2f4df50b1f61d4194",
              "9290f38c5d07c2e2f4df57b1f61d4196"
            ],
            "LHR": [
              "abd90f38ced07c2e2f4df50b1f61d4194",
              "f9138c5d07c2e2f4df57b1f61d4196"
            ],
            "SJC": [
              "00920f38ce07c2e2f4df50b1f61d4194"
            ]
          },
          "random_steering": {
            "default_weight": 0.2,
            "pool_weights": {
              "9290f38c5d07c2e2f4df57b1f61d4196": 0.5,
              "de90f38ced07c2e2f4df50b1f61d4194": 0.3
            }
          },
          "region_pools": {
            "ENAM": [
              "00920f38ce07c2e2f4df50b1f61d4194"
            ],
            "WNAM": [
              "de90f38ced07c2e2f4df50b1f61d4194",
              "9290f38c5d07c2e2f4df57b1f61d4196"
            ]
          },
          "session_affinity": "cookie",
          "session_affinity_attributes": {
            "drain_duration": 100,
            "headers": [
              "x"
            ],
            "require_all_headers": true,
            "samesite": "Auto",
            "secure": "Auto",
            "zero_downtime_failover": "sticky"
          },
          "session_affinity_ttl": 1800,
          "steering_policy": "dynamic_latency",
          "ttl": 30
        },
        "priority": 0,
        "terminates": true
      }
    ],
    "session_affinity": "cookie",
    "session_affinity_attributes": {
      "drain_duration": 100,
      "headers": [
        "x"
      ],
      "require_all_headers": true,
      "samesite": "Auto",
      "secure": "Auto",
      "zero_downtime_failover": "sticky"
    },
    "session_affinity_ttl": 1800,
    "steering_policy": "dynamic_latency",
    "ttl": 30,
    "zone_name": "example.com"
  },
  "success": true
}
```

## Create Load Balancer

**post** `/zones/{zone_id}/load_balancers`

Create a new load balancer.

### Path Parameters

- `zone_id: string`

### Body Parameters

- `default_pools: array of DefaultPools`

  A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region.

- `fallback_pool: string`

  The pool ID to use when all other pools are detected as unhealthy.

- `name: string`

  The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare's DNS, the Load Balancer will take precedence and the DNS record will not be used.

- `adaptive_routing: optional AdaptiveRouting`

  Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

  - `failover_across_pools: optional boolean`

    Extends zero-downtime failover of requests to healthy origins from alternate pools, when no healthy alternate exists in the same pool, according to the failover order defined by traffic and origin steering. When set false (the default) zero-downtime failover will only occur between origins within the same pool. See `session_affinity_attributes` for control over when sessions are broken or reassigned.

- `country_pools: optional map[array of string]`

  A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool mapping if it exists else to default_pools.

- `description: optional string`

  Object description.

- `location_strategy: optional LocationStrategy`

  Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.

  - `mode: optional "pop" or "resolver_ip"`

    Determines the authoritative location when ECS is not preferred, does not exist in the request, or its GeoIP lookup is unsuccessful.

    - `"pop"`: Use the Cloudflare PoP location.
    - `"resolver_ip"`: Use the DNS resolver GeoIP location. If the GeoIP lookup is unsuccessful, use the Cloudflare PoP location.

    - `"pop"`

    - `"resolver_ip"`

  - `prefer_ecs: optional "always" or "never" or "proximity" or "geo"`

    Whether the EDNS Client Subnet (ECS) GeoIP should be preferred as the authoritative location.

    - `"always"`: Always prefer ECS.
    - `"never"`: Never prefer ECS.
    - `"proximity"`: Prefer ECS only when `steering_policy="proximity"`.
    - `"geo"`: Prefer ECS only when `steering_policy="geo"`.

    - `"always"`

    - `"never"`

    - `"proximity"`

    - `"geo"`

- `networks: optional array of string`

  List of networks where Load Balancer or Pool is enabled.

- `pop_pools: optional map[array of string]`

  Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using the corresponding country_pool, then region_pool mapping if it exists else to default_pools.

- `proxied: optional boolean`

  Whether the hostname should be gray clouded (false) or orange clouded (true).

- `random_steering: optional RandomSteering`

  Configures pool weights.

  - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights.
  - `steering_policy="least_outstanding_requests"`: Use pool weights to scale each pool's outstanding requests.
  - `steering_policy="least_connections"`: Use pool weights to scale each pool's open connections.

  - `default_weight: optional number`

    The default weight for pools in the load balancer that are not specified in the pool_weights map.

  - `pool_weights: optional map[number]`

    A mapping of pool IDs to custom weights. The weight is relative to other pools in the load balancer.

- `region_pools: optional map[array of string]`

  A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools.

- `rules: optional array of Rules`

  BETA Field Not General Access: A list of rules for this load balancer to execute.

  - `condition: optional string`

    The condition expressions to evaluate. If the condition evaluates to true, the overrides or fixed_response in this rule will be applied. An empty condition is always true. For more details on condition expressions, please see https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-rules/expressions.

  - `disabled: optional boolean`

    Disable this specific rule. It will no longer be evaluated by this load balancer.

  - `fixed_response: optional object { content_type, location, message_body, status_code }`

    A collection of fields used to directly respond to the eyeball instead of routing to a pool. If a fixed_response is supplied the rule will be marked as terminates.

    - `content_type: optional string`

      The http 'Content-Type' header to include in the response.

    - `location: optional string`

      The http 'Location' header to include in the response.

    - `message_body: optional string`

      Text to include as the http body.

    - `status_code: optional number`

      The http status code to respond with.

  - `name: optional string`

    Name of this rule. Only used for human readability.

  - `overrides: optional object { adaptive_routing, country_pools, default_pools, 10 more }`

    A collection of overrides to apply to the load balancer when this rule's condition is true. All fields are optional.

    - `adaptive_routing: optional AdaptiveRouting`

      Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

    - `country_pools: optional map[array of string]`

      A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool mapping if it exists else to default_pools.

    - `default_pools: optional array of DefaultPools`

      A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region.

    - `fallback_pool: optional string`

      The pool ID to use when all other pools are detected as unhealthy.

    - `location_strategy: optional LocationStrategy`

      Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.

    - `pop_pools: optional map[array of string]`

      Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using the corresponding country_pool, then region_pool mapping if it exists else to default_pools.

    - `random_steering: optional RandomSteering`

      Configures pool weights.

      - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights.
      - `steering_policy="least_outstanding_requests"`: Use pool weights to scale each pool's outstanding requests.
      - `steering_policy="least_connections"`: Use pool weights to scale each pool's open connections.

    - `region_pools: optional map[array of string]`

      A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools.

    - `session_affinity: optional SessionAffinity`

      Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - `"ip_cookie"`: Behaves the same as `"cookie"` except the initial origin selection is stable and based on the client's ip address. - `"header"`: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see `session_affinity_attributes.headers`) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of `session_affinity_ttl` seconds or the origin server is unhealthy, then a new origin server is calculated and used. See `headers` in `session_affinity_attributes` for additional required configuration.

      - `"none"`

      - `"cookie"`

      - `"ip_cookie"`

      - `"header"`

    - `session_affinity_attributes: optional SessionAffinityAttributes`

      Configures attributes for session affinity.

      - `drain_duration: optional number`

        Configures the drain duration in seconds. This field is only used when session affinity is enabled on the load balancer.

      - `headers: optional array of string`

        Configures the names of HTTP headers to base session affinity on when header `session_affinity` is enabled. At least one HTTP header name must be provided. To specify the exact cookies to be used, include an item in the following format: `"cookie:<cookie-name-1>,<cookie-name-2>"` (example) where everything after the colon is a comma-separated list of cookie names. Providing only `"cookie"` will result in all cookies being used. The default max number of HTTP header names that can be provided depends on your plan: 5 for Enterprise, 1 for all other plans.

      - `require_all_headers: optional boolean`

        When header `session_affinity` is enabled, this option can be used to specify how HTTP headers on load balancing requests will be used. The supported values are: - `"true"`: Load balancing requests must contain *all* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren't created. - `"false"`: Load balancing requests must contain *at least one* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren't created.

      - `samesite: optional "Auto" or "Lax" or "None" or "Strict"`

        Configures the SameSite attribute on session affinity cookie. Value "Auto" will be translated to "Lax" or "None" depending if Always Use HTTPS is enabled. Note: when using value "None", the secure attribute can not be set to "Never".

        - `"Auto"`

        - `"Lax"`

        - `"None"`

        - `"Strict"`

      - `secure: optional "Auto" or "Always" or "Never"`

        Configures the Secure attribute on session affinity cookie. Value "Always" indicates the Secure attribute will be set in the Set-Cookie header, "Never" indicates the Secure attribute will not be set, and "Auto" will set the Secure attribute depending if Always Use HTTPS is enabled.

        - `"Auto"`

        - `"Always"`

        - `"Never"`

      - `zero_downtime_failover: optional "none" or "temporary" or "sticky"`

        Configures the zero-downtime failover between origins within a pool when session affinity is enabled. This feature is currently incompatible with Argo, Tiered Cache, and Bandwidth Alliance. The supported values are: - `"none"`: No failover takes place for sessions pinned to the origin (default). - `"temporary"`: Traffic will be sent to another other healthy origin until the originally pinned origin is available; note that this can potentially result in heavy origin flapping. - `"sticky"`: The session affinity cookie is updated and subsequent requests are sent to the new origin. Note: Zero-downtime failover with sticky sessions is currently not supported for session affinity by header.

        - `"none"`

        - `"temporary"`

        - `"sticky"`

    - `session_affinity_ttl: optional number`

      Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `session_affinity` policy are: - `"cookie"` / `"ip_cookie"`: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between [1800, 604800]. - `"header"`: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between [30, 3600]. Note: With session affinity by header, sessions only expire after they haven't been used for the number of seconds specified.

    - `steering_policy: optional SteeringPolicy`

      Steering Policy for this load balancer.

      - `"off"`: Use `default_pools`.
      - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determined by `location_strategy`.
      - `"random"`: Select a pool randomly.
      - `"dynamic_latency"`: Use round trip time to select the closest pool in default_pools (requires pool health checks).
      - `"proximity"`: Use the pools' latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by `location_strategy` for non-proxied requests.
      - `"least_outstanding_requests"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
      - `"least_connections"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
      - `""`: Will map to `"geo"` if you use `region_pools`/`country_pools`/`pop_pools` otherwise `"off"`.

      - `"off"`

      - `"geo"`

      - `"random"`

      - `"dynamic_latency"`

      - `"proximity"`

      - `"least_outstanding_requests"`

      - `"least_connections"`

      - `""`

    - `ttl: optional number`

      Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.

  - `priority: optional number`

    The order in which rules should be executed in relation to each other. Lower values are executed first. Values do not need to be sequential. If no value is provided for any rule the array order of the rules field will be used to assign a priority.

  - `terminates: optional boolean`

    If this rule's condition is true, this causes rule evaluation to stop after processing this rule.

- `session_affinity: optional SessionAffinity`

  Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - `"ip_cookie"`: Behaves the same as `"cookie"` except the initial origin selection is stable and based on the client's ip address. - `"header"`: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see `session_affinity_attributes.headers`) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of `session_affinity_ttl` seconds or the origin server is unhealthy, then a new origin server is calculated and used. See `headers` in `session_affinity_attributes` for additional required configuration.

- `session_affinity_attributes: optional SessionAffinityAttributes`

  Configures attributes for session affinity.

- `session_affinity_ttl: optional number`

  Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `session_affinity` policy are: - `"cookie"` / `"ip_cookie"`: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between [1800, 604800]. - `"header"`: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between [30, 3600]. Note: With session affinity by header, sessions only expire after they haven't been used for the number of seconds specified.

- `steering_policy: optional SteeringPolicy`

  Steering Policy for this load balancer.

  - `"off"`: Use `default_pools`.
  - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determined by `location_strategy`.
  - `"random"`: Select a pool randomly.
  - `"dynamic_latency"`: Use round trip time to select the closest pool in default_pools (requires pool health checks).
  - `"proximity"`: Use the pools' latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by `location_strategy` for non-proxied requests.
  - `"least_outstanding_requests"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
  - `"least_connections"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
  - `""`: Will map to `"geo"` if you use `region_pools`/`country_pools`/`pop_pools` otherwise `"off"`.

- `ttl: optional number`

  Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.

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

- `result: LoadBalancer`

  - `id: optional string`

  - `adaptive_routing: optional AdaptiveRouting`

    Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

    - `failover_across_pools: optional boolean`

      Extends zero-downtime failover of requests to healthy origins from alternate pools, when no healthy alternate exists in the same pool, according to the failover order defined by traffic and origin steering. When set false (the default) zero-downtime failover will only occur between origins within the same pool. See `session_affinity_attributes` for control over when sessions are broken or reassigned.

  - `country_pools: optional map[array of string]`

    A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool mapping if it exists else to default_pools.

  - `created_on: optional string`

  - `default_pools: optional array of DefaultPools`

    A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region.

  - `description: optional string`

    Object description.

  - `enabled: optional boolean`

    Whether to enable (the default) this load balancer.

  - `fallback_pool: optional string`

    The pool ID to use when all other pools are detected as unhealthy.

  - `location_strategy: optional LocationStrategy`

    Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.

    - `mode: optional "pop" or "resolver_ip"`

      Determines the authoritative location when ECS is not preferred, does not exist in the request, or its GeoIP lookup is unsuccessful.

      - `"pop"`: Use the Cloudflare PoP location.
      - `"resolver_ip"`: Use the DNS resolver GeoIP location. If the GeoIP lookup is unsuccessful, use the Cloudflare PoP location.

      - `"pop"`

      - `"resolver_ip"`

    - `prefer_ecs: optional "always" or "never" or "proximity" or "geo"`

      Whether the EDNS Client Subnet (ECS) GeoIP should be preferred as the authoritative location.

      - `"always"`: Always prefer ECS.
      - `"never"`: Never prefer ECS.
      - `"proximity"`: Prefer ECS only when `steering_policy="proximity"`.
      - `"geo"`: Prefer ECS only when `steering_policy="geo"`.

      - `"always"`

      - `"never"`

      - `"proximity"`

      - `"geo"`

  - `modified_on: optional string`

  - `name: optional string`

    The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare's DNS, the Load Balancer will take precedence and the DNS record will not be used.

  - `networks: optional array of string`

    List of networks where Load Balancer or Pool is enabled.

  - `pop_pools: optional map[array of string]`

    Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using the corresponding country_pool, then region_pool mapping if it exists else to default_pools.

  - `proxied: optional boolean`

    Whether the hostname should be gray clouded (false) or orange clouded (true).

  - `random_steering: optional RandomSteering`

    Configures pool weights.

    - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights.
    - `steering_policy="least_outstanding_requests"`: Use pool weights to scale each pool's outstanding requests.
    - `steering_policy="least_connections"`: Use pool weights to scale each pool's open connections.

    - `default_weight: optional number`

      The default weight for pools in the load balancer that are not specified in the pool_weights map.

    - `pool_weights: optional map[number]`

      A mapping of pool IDs to custom weights. The weight is relative to other pools in the load balancer.

  - `region_pools: optional map[array of string]`

    A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools.

  - `rules: optional array of Rules`

    BETA Field Not General Access: A list of rules for this load balancer to execute.

    - `condition: optional string`

      The condition expressions to evaluate. If the condition evaluates to true, the overrides or fixed_response in this rule will be applied. An empty condition is always true. For more details on condition expressions, please see https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-rules/expressions.

    - `disabled: optional boolean`

      Disable this specific rule. It will no longer be evaluated by this load balancer.

    - `fixed_response: optional object { content_type, location, message_body, status_code }`

      A collection of fields used to directly respond to the eyeball instead of routing to a pool. If a fixed_response is supplied the rule will be marked as terminates.

      - `content_type: optional string`

        The http 'Content-Type' header to include in the response.

      - `location: optional string`

        The http 'Location' header to include in the response.

      - `message_body: optional string`

        Text to include as the http body.

      - `status_code: optional number`

        The http status code to respond with.

    - `name: optional string`

      Name of this rule. Only used for human readability.

    - `overrides: optional object { adaptive_routing, country_pools, default_pools, 10 more }`

      A collection of overrides to apply to the load balancer when this rule's condition is true. All fields are optional.

      - `adaptive_routing: optional AdaptiveRouting`

        Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

      - `country_pools: optional map[array of string]`

        A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool mapping if it exists else to default_pools.

      - `default_pools: optional array of DefaultPools`

        A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region.

      - `fallback_pool: optional string`

        The pool ID to use when all other pools are detected as unhealthy.

      - `location_strategy: optional LocationStrategy`

        Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.

      - `pop_pools: optional map[array of string]`

        Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using the corresponding country_pool, then region_pool mapping if it exists else to default_pools.

      - `random_steering: optional RandomSteering`

        Configures pool weights.

        - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights.
        - `steering_policy="least_outstanding_requests"`: Use pool weights to scale each pool's outstanding requests.
        - `steering_policy="least_connections"`: Use pool weights to scale each pool's open connections.

      - `region_pools: optional map[array of string]`

        A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools.

      - `session_affinity: optional SessionAffinity`

        Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - `"ip_cookie"`: Behaves the same as `"cookie"` except the initial origin selection is stable and based on the client's ip address. - `"header"`: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see `session_affinity_attributes.headers`) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of `session_affinity_ttl` seconds or the origin server is unhealthy, then a new origin server is calculated and used. See `headers` in `session_affinity_attributes` for additional required configuration.

        - `"none"`

        - `"cookie"`

        - `"ip_cookie"`

        - `"header"`

      - `session_affinity_attributes: optional SessionAffinityAttributes`

        Configures attributes for session affinity.

        - `drain_duration: optional number`

          Configures the drain duration in seconds. This field is only used when session affinity is enabled on the load balancer.

        - `headers: optional array of string`

          Configures the names of HTTP headers to base session affinity on when header `session_affinity` is enabled. At least one HTTP header name must be provided. To specify the exact cookies to be used, include an item in the following format: `"cookie:<cookie-name-1>,<cookie-name-2>"` (example) where everything after the colon is a comma-separated list of cookie names. Providing only `"cookie"` will result in all cookies being used. The default max number of HTTP header names that can be provided depends on your plan: 5 for Enterprise, 1 for all other plans.

        - `require_all_headers: optional boolean`

          When header `session_affinity` is enabled, this option can be used to specify how HTTP headers on load balancing requests will be used. The supported values are: - `"true"`: Load balancing requests must contain *all* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren't created. - `"false"`: Load balancing requests must contain *at least one* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren't created.

        - `samesite: optional "Auto" or "Lax" or "None" or "Strict"`

          Configures the SameSite attribute on session affinity cookie. Value "Auto" will be translated to "Lax" or "None" depending if Always Use HTTPS is enabled. Note: when using value "None", the secure attribute can not be set to "Never".

          - `"Auto"`

          - `"Lax"`

          - `"None"`

          - `"Strict"`

        - `secure: optional "Auto" or "Always" or "Never"`

          Configures the Secure attribute on session affinity cookie. Value "Always" indicates the Secure attribute will be set in the Set-Cookie header, "Never" indicates the Secure attribute will not be set, and "Auto" will set the Secure attribute depending if Always Use HTTPS is enabled.

          - `"Auto"`

          - `"Always"`

          - `"Never"`

        - `zero_downtime_failover: optional "none" or "temporary" or "sticky"`

          Configures the zero-downtime failover between origins within a pool when session affinity is enabled. This feature is currently incompatible with Argo, Tiered Cache, and Bandwidth Alliance. The supported values are: - `"none"`: No failover takes place for sessions pinned to the origin (default). - `"temporary"`: Traffic will be sent to another other healthy origin until the originally pinned origin is available; note that this can potentially result in heavy origin flapping. - `"sticky"`: The session affinity cookie is updated and subsequent requests are sent to the new origin. Note: Zero-downtime failover with sticky sessions is currently not supported for session affinity by header.

          - `"none"`

          - `"temporary"`

          - `"sticky"`

      - `session_affinity_ttl: optional number`

        Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `session_affinity` policy are: - `"cookie"` / `"ip_cookie"`: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between [1800, 604800]. - `"header"`: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between [30, 3600]. Note: With session affinity by header, sessions only expire after they haven't been used for the number of seconds specified.

      - `steering_policy: optional SteeringPolicy`

        Steering Policy for this load balancer.

        - `"off"`: Use `default_pools`.
        - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determined by `location_strategy`.
        - `"random"`: Select a pool randomly.
        - `"dynamic_latency"`: Use round trip time to select the closest pool in default_pools (requires pool health checks).
        - `"proximity"`: Use the pools' latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by `location_strategy` for non-proxied requests.
        - `"least_outstanding_requests"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
        - `"least_connections"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
        - `""`: Will map to `"geo"` if you use `region_pools`/`country_pools`/`pop_pools` otherwise `"off"`.

        - `"off"`

        - `"geo"`

        - `"random"`

        - `"dynamic_latency"`

        - `"proximity"`

        - `"least_outstanding_requests"`

        - `"least_connections"`

        - `""`

      - `ttl: optional number`

        Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.

    - `priority: optional number`

      The order in which rules should be executed in relation to each other. Lower values are executed first. Values do not need to be sequential. If no value is provided for any rule the array order of the rules field will be used to assign a priority.

    - `terminates: optional boolean`

      If this rule's condition is true, this causes rule evaluation to stop after processing this rule.

  - `session_affinity: optional SessionAffinity`

    Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - `"ip_cookie"`: Behaves the same as `"cookie"` except the initial origin selection is stable and based on the client's ip address. - `"header"`: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see `session_affinity_attributes.headers`) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of `session_affinity_ttl` seconds or the origin server is unhealthy, then a new origin server is calculated and used. See `headers` in `session_affinity_attributes` for additional required configuration.

  - `session_affinity_attributes: optional SessionAffinityAttributes`

    Configures attributes for session affinity.

  - `session_affinity_ttl: optional number`

    Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `session_affinity` policy are: - `"cookie"` / `"ip_cookie"`: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between [1800, 604800]. - `"header"`: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between [30, 3600]. Note: With session affinity by header, sessions only expire after they haven't been used for the number of seconds specified.

  - `steering_policy: optional SteeringPolicy`

    Steering Policy for this load balancer.

    - `"off"`: Use `default_pools`.
    - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determined by `location_strategy`.
    - `"random"`: Select a pool randomly.
    - `"dynamic_latency"`: Use round trip time to select the closest pool in default_pools (requires pool health checks).
    - `"proximity"`: Use the pools' latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by `location_strategy` for non-proxied requests.
    - `"least_outstanding_requests"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
    - `"least_connections"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
    - `""`: Will map to `"geo"` if you use `region_pools`/`country_pools`/`pop_pools` otherwise `"off"`.

  - `ttl: optional number`

    Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.

  - `zone_name: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/load_balancers \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "default_pools": [
            "17b5962d775c646f3f9725cbc7a53df4",
            "9290f38c5d07c2e2f4df57b1f61d4196",
            "00920f38ce07c2e2f4df50b1f61d4194"
          ],
          "fallback_pool": "fallback_pool",
          "name": "www.example.com",
          "country_pools": {
            "GB": [
              "abd90f38ced07c2e2f4df50b1f61d4194"
            ],
            "US": [
              "de90f38ced07c2e2f4df50b1f61d4194",
              "00920f38ce07c2e2f4df50b1f61d4194"
            ]
          },
          "description": "Load Balancer for www.example.com",
          "pop_pools": {
            "LAX": [
              "de90f38ced07c2e2f4df50b1f61d4194",
              "9290f38c5d07c2e2f4df57b1f61d4196"
            ],
            "LHR": [
              "abd90f38ced07c2e2f4df50b1f61d4194",
              "f9138c5d07c2e2f4df57b1f61d4196"
            ],
            "SJC": [
              "00920f38ce07c2e2f4df50b1f61d4194"
            ]
          },
          "proxied": true,
          "region_pools": {
            "ENAM": [
              "00920f38ce07c2e2f4df50b1f61d4194"
            ],
            "WNAM": [
              "de90f38ced07c2e2f4df50b1f61d4194",
              "9290f38c5d07c2e2f4df57b1f61d4196"
            ]
          },
          "session_affinity": "cookie",
          "session_affinity_ttl": 1800,
          "steering_policy": "dynamic_latency",
          "ttl": 30
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
    "id": "699d98642c564d2e855e9661899b7252",
    "adaptive_routing": {
      "failover_across_pools": true
    },
    "country_pools": {
      "GB": [
        "abd90f38ced07c2e2f4df50b1f61d4194"
      ],
      "US": [
        "de90f38ced07c2e2f4df50b1f61d4194",
        "00920f38ce07c2e2f4df50b1f61d4194"
      ]
    },
    "created_on": "2014-01-01T05:20:00.12345Z",
    "default_pools": [
      "17b5962d775c646f3f9725cbc7a53df4",
      "9290f38c5d07c2e2f4df57b1f61d4196",
      "00920f38ce07c2e2f4df50b1f61d4194"
    ],
    "description": "Load Balancer for www.example.com",
    "enabled": true,
    "fallback_pool": "fallback_pool",
    "location_strategy": {
      "mode": "resolver_ip",
      "prefer_ecs": "always"
    },
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "www.example.com",
    "networks": [
      "string"
    ],
    "pop_pools": {
      "LAX": [
        "de90f38ced07c2e2f4df50b1f61d4194",
        "9290f38c5d07c2e2f4df57b1f61d4196"
      ],
      "LHR": [
        "abd90f38ced07c2e2f4df50b1f61d4194",
        "f9138c5d07c2e2f4df57b1f61d4196"
      ],
      "SJC": [
        "00920f38ce07c2e2f4df50b1f61d4194"
      ]
    },
    "proxied": true,
    "random_steering": {
      "default_weight": 0.2,
      "pool_weights": {
        "9290f38c5d07c2e2f4df57b1f61d4196": 0.5,
        "de90f38ced07c2e2f4df50b1f61d4194": 0.3
      }
    },
    "region_pools": {
      "ENAM": [
        "00920f38ce07c2e2f4df50b1f61d4194"
      ],
      "WNAM": [
        "de90f38ced07c2e2f4df50b1f61d4194",
        "9290f38c5d07c2e2f4df57b1f61d4196"
      ]
    },
    "rules": [
      {
        "condition": "http.request.uri.path contains \"/testing\"",
        "disabled": true,
        "fixed_response": {
          "content_type": "application/json",
          "location": "www.example.com",
          "message_body": "Testing Hello",
          "status_code": 0
        },
        "name": "route the path /testing to testing datacenter.",
        "overrides": {
          "adaptive_routing": {
            "failover_across_pools": true
          },
          "country_pools": {
            "GB": [
              "abd90f38ced07c2e2f4df50b1f61d4194"
            ],
            "US": [
              "de90f38ced07c2e2f4df50b1f61d4194",
              "00920f38ce07c2e2f4df50b1f61d4194"
            ]
          },
          "default_pools": [
            "17b5962d775c646f3f9725cbc7a53df4",
            "9290f38c5d07c2e2f4df57b1f61d4196",
            "00920f38ce07c2e2f4df50b1f61d4194"
          ],
          "fallback_pool": "fallback_pool",
          "location_strategy": {
            "mode": "resolver_ip",
            "prefer_ecs": "always"
          },
          "pop_pools": {
            "LAX": [
              "de90f38ced07c2e2f4df50b1f61d4194",
              "9290f38c5d07c2e2f4df57b1f61d4196"
            ],
            "LHR": [
              "abd90f38ced07c2e2f4df50b1f61d4194",
              "f9138c5d07c2e2f4df57b1f61d4196"
            ],
            "SJC": [
              "00920f38ce07c2e2f4df50b1f61d4194"
            ]
          },
          "random_steering": {
            "default_weight": 0.2,
            "pool_weights": {
              "9290f38c5d07c2e2f4df57b1f61d4196": 0.5,
              "de90f38ced07c2e2f4df50b1f61d4194": 0.3
            }
          },
          "region_pools": {
            "ENAM": [
              "00920f38ce07c2e2f4df50b1f61d4194"
            ],
            "WNAM": [
              "de90f38ced07c2e2f4df50b1f61d4194",
              "9290f38c5d07c2e2f4df57b1f61d4196"
            ]
          },
          "session_affinity": "cookie",
          "session_affinity_attributes": {
            "drain_duration": 100,
            "headers": [
              "x"
            ],
            "require_all_headers": true,
            "samesite": "Auto",
            "secure": "Auto",
            "zero_downtime_failover": "sticky"
          },
          "session_affinity_ttl": 1800,
          "steering_policy": "dynamic_latency",
          "ttl": 30
        },
        "priority": 0,
        "terminates": true
      }
    ],
    "session_affinity": "cookie",
    "session_affinity_attributes": {
      "drain_duration": 100,
      "headers": [
        "x"
      ],
      "require_all_headers": true,
      "samesite": "Auto",
      "secure": "Auto",
      "zero_downtime_failover": "sticky"
    },
    "session_affinity_ttl": 1800,
    "steering_policy": "dynamic_latency",
    "ttl": 30,
    "zone_name": "example.com"
  },
  "success": true
}
```

## Update Load Balancer

**put** `/zones/{zone_id}/load_balancers/{load_balancer_id}`

Update a configured load balancer.

### Path Parameters

- `zone_id: string`

- `load_balancer_id: string`

### Body Parameters

- `default_pools: array of DefaultPools`

  A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region.

- `fallback_pool: string`

  The pool ID to use when all other pools are detected as unhealthy.

- `name: string`

  The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare's DNS, the Load Balancer will take precedence and the DNS record will not be used.

- `adaptive_routing: optional AdaptiveRouting`

  Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

  - `failover_across_pools: optional boolean`

    Extends zero-downtime failover of requests to healthy origins from alternate pools, when no healthy alternate exists in the same pool, according to the failover order defined by traffic and origin steering. When set false (the default) zero-downtime failover will only occur between origins within the same pool. See `session_affinity_attributes` for control over when sessions are broken or reassigned.

- `country_pools: optional map[array of string]`

  A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool mapping if it exists else to default_pools.

- `description: optional string`

  Object description.

- `enabled: optional boolean`

  Whether to enable (the default) this load balancer.

- `location_strategy: optional LocationStrategy`

  Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.

  - `mode: optional "pop" or "resolver_ip"`

    Determines the authoritative location when ECS is not preferred, does not exist in the request, or its GeoIP lookup is unsuccessful.

    - `"pop"`: Use the Cloudflare PoP location.
    - `"resolver_ip"`: Use the DNS resolver GeoIP location. If the GeoIP lookup is unsuccessful, use the Cloudflare PoP location.

    - `"pop"`

    - `"resolver_ip"`

  - `prefer_ecs: optional "always" or "never" or "proximity" or "geo"`

    Whether the EDNS Client Subnet (ECS) GeoIP should be preferred as the authoritative location.

    - `"always"`: Always prefer ECS.
    - `"never"`: Never prefer ECS.
    - `"proximity"`: Prefer ECS only when `steering_policy="proximity"`.
    - `"geo"`: Prefer ECS only when `steering_policy="geo"`.

    - `"always"`

    - `"never"`

    - `"proximity"`

    - `"geo"`

- `networks: optional array of string`

  List of networks where Load Balancer or Pool is enabled.

- `pop_pools: optional map[array of string]`

  Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using the corresponding country_pool, then region_pool mapping if it exists else to default_pools.

- `proxied: optional boolean`

  Whether the hostname should be gray clouded (false) or orange clouded (true).

- `random_steering: optional RandomSteering`

  Configures pool weights.

  - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights.
  - `steering_policy="least_outstanding_requests"`: Use pool weights to scale each pool's outstanding requests.
  - `steering_policy="least_connections"`: Use pool weights to scale each pool's open connections.

  - `default_weight: optional number`

    The default weight for pools in the load balancer that are not specified in the pool_weights map.

  - `pool_weights: optional map[number]`

    A mapping of pool IDs to custom weights. The weight is relative to other pools in the load balancer.

- `region_pools: optional map[array of string]`

  A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools.

- `rules: optional array of Rules`

  BETA Field Not General Access: A list of rules for this load balancer to execute.

  - `condition: optional string`

    The condition expressions to evaluate. If the condition evaluates to true, the overrides or fixed_response in this rule will be applied. An empty condition is always true. For more details on condition expressions, please see https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-rules/expressions.

  - `disabled: optional boolean`

    Disable this specific rule. It will no longer be evaluated by this load balancer.

  - `fixed_response: optional object { content_type, location, message_body, status_code }`

    A collection of fields used to directly respond to the eyeball instead of routing to a pool. If a fixed_response is supplied the rule will be marked as terminates.

    - `content_type: optional string`

      The http 'Content-Type' header to include in the response.

    - `location: optional string`

      The http 'Location' header to include in the response.

    - `message_body: optional string`

      Text to include as the http body.

    - `status_code: optional number`

      The http status code to respond with.

  - `name: optional string`

    Name of this rule. Only used for human readability.

  - `overrides: optional object { adaptive_routing, country_pools, default_pools, 10 more }`

    A collection of overrides to apply to the load balancer when this rule's condition is true. All fields are optional.

    - `adaptive_routing: optional AdaptiveRouting`

      Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

    - `country_pools: optional map[array of string]`

      A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool mapping if it exists else to default_pools.

    - `default_pools: optional array of DefaultPools`

      A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region.

    - `fallback_pool: optional string`

      The pool ID to use when all other pools are detected as unhealthy.

    - `location_strategy: optional LocationStrategy`

      Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.

    - `pop_pools: optional map[array of string]`

      Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using the corresponding country_pool, then region_pool mapping if it exists else to default_pools.

    - `random_steering: optional RandomSteering`

      Configures pool weights.

      - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights.
      - `steering_policy="least_outstanding_requests"`: Use pool weights to scale each pool's outstanding requests.
      - `steering_policy="least_connections"`: Use pool weights to scale each pool's open connections.

    - `region_pools: optional map[array of string]`

      A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools.

    - `session_affinity: optional SessionAffinity`

      Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - `"ip_cookie"`: Behaves the same as `"cookie"` except the initial origin selection is stable and based on the client's ip address. - `"header"`: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see `session_affinity_attributes.headers`) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of `session_affinity_ttl` seconds or the origin server is unhealthy, then a new origin server is calculated and used. See `headers` in `session_affinity_attributes` for additional required configuration.

      - `"none"`

      - `"cookie"`

      - `"ip_cookie"`

      - `"header"`

    - `session_affinity_attributes: optional SessionAffinityAttributes`

      Configures attributes for session affinity.

      - `drain_duration: optional number`

        Configures the drain duration in seconds. This field is only used when session affinity is enabled on the load balancer.

      - `headers: optional array of string`

        Configures the names of HTTP headers to base session affinity on when header `session_affinity` is enabled. At least one HTTP header name must be provided. To specify the exact cookies to be used, include an item in the following format: `"cookie:<cookie-name-1>,<cookie-name-2>"` (example) where everything after the colon is a comma-separated list of cookie names. Providing only `"cookie"` will result in all cookies being used. The default max number of HTTP header names that can be provided depends on your plan: 5 for Enterprise, 1 for all other plans.

      - `require_all_headers: optional boolean`

        When header `session_affinity` is enabled, this option can be used to specify how HTTP headers on load balancing requests will be used. The supported values are: - `"true"`: Load balancing requests must contain *all* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren't created. - `"false"`: Load balancing requests must contain *at least one* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren't created.

      - `samesite: optional "Auto" or "Lax" or "None" or "Strict"`

        Configures the SameSite attribute on session affinity cookie. Value "Auto" will be translated to "Lax" or "None" depending if Always Use HTTPS is enabled. Note: when using value "None", the secure attribute can not be set to "Never".

        - `"Auto"`

        - `"Lax"`

        - `"None"`

        - `"Strict"`

      - `secure: optional "Auto" or "Always" or "Never"`

        Configures the Secure attribute on session affinity cookie. Value "Always" indicates the Secure attribute will be set in the Set-Cookie header, "Never" indicates the Secure attribute will not be set, and "Auto" will set the Secure attribute depending if Always Use HTTPS is enabled.

        - `"Auto"`

        - `"Always"`

        - `"Never"`

      - `zero_downtime_failover: optional "none" or "temporary" or "sticky"`

        Configures the zero-downtime failover between origins within a pool when session affinity is enabled. This feature is currently incompatible with Argo, Tiered Cache, and Bandwidth Alliance. The supported values are: - `"none"`: No failover takes place for sessions pinned to the origin (default). - `"temporary"`: Traffic will be sent to another other healthy origin until the originally pinned origin is available; note that this can potentially result in heavy origin flapping. - `"sticky"`: The session affinity cookie is updated and subsequent requests are sent to the new origin. Note: Zero-downtime failover with sticky sessions is currently not supported for session affinity by header.

        - `"none"`

        - `"temporary"`

        - `"sticky"`

    - `session_affinity_ttl: optional number`

      Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `session_affinity` policy are: - `"cookie"` / `"ip_cookie"`: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between [1800, 604800]. - `"header"`: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between [30, 3600]. Note: With session affinity by header, sessions only expire after they haven't been used for the number of seconds specified.

    - `steering_policy: optional SteeringPolicy`

      Steering Policy for this load balancer.

      - `"off"`: Use `default_pools`.
      - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determined by `location_strategy`.
      - `"random"`: Select a pool randomly.
      - `"dynamic_latency"`: Use round trip time to select the closest pool in default_pools (requires pool health checks).
      - `"proximity"`: Use the pools' latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by `location_strategy` for non-proxied requests.
      - `"least_outstanding_requests"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
      - `"least_connections"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
      - `""`: Will map to `"geo"` if you use `region_pools`/`country_pools`/`pop_pools` otherwise `"off"`.

      - `"off"`

      - `"geo"`

      - `"random"`

      - `"dynamic_latency"`

      - `"proximity"`

      - `"least_outstanding_requests"`

      - `"least_connections"`

      - `""`

    - `ttl: optional number`

      Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.

  - `priority: optional number`

    The order in which rules should be executed in relation to each other. Lower values are executed first. Values do not need to be sequential. If no value is provided for any rule the array order of the rules field will be used to assign a priority.

  - `terminates: optional boolean`

    If this rule's condition is true, this causes rule evaluation to stop after processing this rule.

- `session_affinity: optional SessionAffinity`

  Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - `"ip_cookie"`: Behaves the same as `"cookie"` except the initial origin selection is stable and based on the client's ip address. - `"header"`: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see `session_affinity_attributes.headers`) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of `session_affinity_ttl` seconds or the origin server is unhealthy, then a new origin server is calculated and used. See `headers` in `session_affinity_attributes` for additional required configuration.

- `session_affinity_attributes: optional SessionAffinityAttributes`

  Configures attributes for session affinity.

- `session_affinity_ttl: optional number`

  Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `session_affinity` policy are: - `"cookie"` / `"ip_cookie"`: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between [1800, 604800]. - `"header"`: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between [30, 3600]. Note: With session affinity by header, sessions only expire after they haven't been used for the number of seconds specified.

- `steering_policy: optional SteeringPolicy`

  Steering Policy for this load balancer.

  - `"off"`: Use `default_pools`.
  - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determined by `location_strategy`.
  - `"random"`: Select a pool randomly.
  - `"dynamic_latency"`: Use round trip time to select the closest pool in default_pools (requires pool health checks).
  - `"proximity"`: Use the pools' latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by `location_strategy` for non-proxied requests.
  - `"least_outstanding_requests"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
  - `"least_connections"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
  - `""`: Will map to `"geo"` if you use `region_pools`/`country_pools`/`pop_pools` otherwise `"off"`.

- `ttl: optional number`

  Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.

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

- `result: LoadBalancer`

  - `id: optional string`

  - `adaptive_routing: optional AdaptiveRouting`

    Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

    - `failover_across_pools: optional boolean`

      Extends zero-downtime failover of requests to healthy origins from alternate pools, when no healthy alternate exists in the same pool, according to the failover order defined by traffic and origin steering. When set false (the default) zero-downtime failover will only occur between origins within the same pool. See `session_affinity_attributes` for control over when sessions are broken or reassigned.

  - `country_pools: optional map[array of string]`

    A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool mapping if it exists else to default_pools.

  - `created_on: optional string`

  - `default_pools: optional array of DefaultPools`

    A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region.

  - `description: optional string`

    Object description.

  - `enabled: optional boolean`

    Whether to enable (the default) this load balancer.

  - `fallback_pool: optional string`

    The pool ID to use when all other pools are detected as unhealthy.

  - `location_strategy: optional LocationStrategy`

    Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.

    - `mode: optional "pop" or "resolver_ip"`

      Determines the authoritative location when ECS is not preferred, does not exist in the request, or its GeoIP lookup is unsuccessful.

      - `"pop"`: Use the Cloudflare PoP location.
      - `"resolver_ip"`: Use the DNS resolver GeoIP location. If the GeoIP lookup is unsuccessful, use the Cloudflare PoP location.

      - `"pop"`

      - `"resolver_ip"`

    - `prefer_ecs: optional "always" or "never" or "proximity" or "geo"`

      Whether the EDNS Client Subnet (ECS) GeoIP should be preferred as the authoritative location.

      - `"always"`: Always prefer ECS.
      - `"never"`: Never prefer ECS.
      - `"proximity"`: Prefer ECS only when `steering_policy="proximity"`.
      - `"geo"`: Prefer ECS only when `steering_policy="geo"`.

      - `"always"`

      - `"never"`

      - `"proximity"`

      - `"geo"`

  - `modified_on: optional string`

  - `name: optional string`

    The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare's DNS, the Load Balancer will take precedence and the DNS record will not be used.

  - `networks: optional array of string`

    List of networks where Load Balancer or Pool is enabled.

  - `pop_pools: optional map[array of string]`

    Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using the corresponding country_pool, then region_pool mapping if it exists else to default_pools.

  - `proxied: optional boolean`

    Whether the hostname should be gray clouded (false) or orange clouded (true).

  - `random_steering: optional RandomSteering`

    Configures pool weights.

    - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights.
    - `steering_policy="least_outstanding_requests"`: Use pool weights to scale each pool's outstanding requests.
    - `steering_policy="least_connections"`: Use pool weights to scale each pool's open connections.

    - `default_weight: optional number`

      The default weight for pools in the load balancer that are not specified in the pool_weights map.

    - `pool_weights: optional map[number]`

      A mapping of pool IDs to custom weights. The weight is relative to other pools in the load balancer.

  - `region_pools: optional map[array of string]`

    A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools.

  - `rules: optional array of Rules`

    BETA Field Not General Access: A list of rules for this load balancer to execute.

    - `condition: optional string`

      The condition expressions to evaluate. If the condition evaluates to true, the overrides or fixed_response in this rule will be applied. An empty condition is always true. For more details on condition expressions, please see https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-rules/expressions.

    - `disabled: optional boolean`

      Disable this specific rule. It will no longer be evaluated by this load balancer.

    - `fixed_response: optional object { content_type, location, message_body, status_code }`

      A collection of fields used to directly respond to the eyeball instead of routing to a pool. If a fixed_response is supplied the rule will be marked as terminates.

      - `content_type: optional string`

        The http 'Content-Type' header to include in the response.

      - `location: optional string`

        The http 'Location' header to include in the response.

      - `message_body: optional string`

        Text to include as the http body.

      - `status_code: optional number`

        The http status code to respond with.

    - `name: optional string`

      Name of this rule. Only used for human readability.

    - `overrides: optional object { adaptive_routing, country_pools, default_pools, 10 more }`

      A collection of overrides to apply to the load balancer when this rule's condition is true. All fields are optional.

      - `adaptive_routing: optional AdaptiveRouting`

        Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

      - `country_pools: optional map[array of string]`

        A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool mapping if it exists else to default_pools.

      - `default_pools: optional array of DefaultPools`

        A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region.

      - `fallback_pool: optional string`

        The pool ID to use when all other pools are detected as unhealthy.

      - `location_strategy: optional LocationStrategy`

        Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.

      - `pop_pools: optional map[array of string]`

        Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using the corresponding country_pool, then region_pool mapping if it exists else to default_pools.

      - `random_steering: optional RandomSteering`

        Configures pool weights.

        - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights.
        - `steering_policy="least_outstanding_requests"`: Use pool weights to scale each pool's outstanding requests.
        - `steering_policy="least_connections"`: Use pool weights to scale each pool's open connections.

      - `region_pools: optional map[array of string]`

        A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools.

      - `session_affinity: optional SessionAffinity`

        Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - `"ip_cookie"`: Behaves the same as `"cookie"` except the initial origin selection is stable and based on the client's ip address. - `"header"`: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see `session_affinity_attributes.headers`) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of `session_affinity_ttl` seconds or the origin server is unhealthy, then a new origin server is calculated and used. See `headers` in `session_affinity_attributes` for additional required configuration.

        - `"none"`

        - `"cookie"`

        - `"ip_cookie"`

        - `"header"`

      - `session_affinity_attributes: optional SessionAffinityAttributes`

        Configures attributes for session affinity.

        - `drain_duration: optional number`

          Configures the drain duration in seconds. This field is only used when session affinity is enabled on the load balancer.

        - `headers: optional array of string`

          Configures the names of HTTP headers to base session affinity on when header `session_affinity` is enabled. At least one HTTP header name must be provided. To specify the exact cookies to be used, include an item in the following format: `"cookie:<cookie-name-1>,<cookie-name-2>"` (example) where everything after the colon is a comma-separated list of cookie names. Providing only `"cookie"` will result in all cookies being used. The default max number of HTTP header names that can be provided depends on your plan: 5 for Enterprise, 1 for all other plans.

        - `require_all_headers: optional boolean`

          When header `session_affinity` is enabled, this option can be used to specify how HTTP headers on load balancing requests will be used. The supported values are: - `"true"`: Load balancing requests must contain *all* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren't created. - `"false"`: Load balancing requests must contain *at least one* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren't created.

        - `samesite: optional "Auto" or "Lax" or "None" or "Strict"`

          Configures the SameSite attribute on session affinity cookie. Value "Auto" will be translated to "Lax" or "None" depending if Always Use HTTPS is enabled. Note: when using value "None", the secure attribute can not be set to "Never".

          - `"Auto"`

          - `"Lax"`

          - `"None"`

          - `"Strict"`

        - `secure: optional "Auto" or "Always" or "Never"`

          Configures the Secure attribute on session affinity cookie. Value "Always" indicates the Secure attribute will be set in the Set-Cookie header, "Never" indicates the Secure attribute will not be set, and "Auto" will set the Secure attribute depending if Always Use HTTPS is enabled.

          - `"Auto"`

          - `"Always"`

          - `"Never"`

        - `zero_downtime_failover: optional "none" or "temporary" or "sticky"`

          Configures the zero-downtime failover between origins within a pool when session affinity is enabled. This feature is currently incompatible with Argo, Tiered Cache, and Bandwidth Alliance. The supported values are: - `"none"`: No failover takes place for sessions pinned to the origin (default). - `"temporary"`: Traffic will be sent to another other healthy origin until the originally pinned origin is available; note that this can potentially result in heavy origin flapping. - `"sticky"`: The session affinity cookie is updated and subsequent requests are sent to the new origin. Note: Zero-downtime failover with sticky sessions is currently not supported for session affinity by header.

          - `"none"`

          - `"temporary"`

          - `"sticky"`

      - `session_affinity_ttl: optional number`

        Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `session_affinity` policy are: - `"cookie"` / `"ip_cookie"`: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between [1800, 604800]. - `"header"`: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between [30, 3600]. Note: With session affinity by header, sessions only expire after they haven't been used for the number of seconds specified.

      - `steering_policy: optional SteeringPolicy`

        Steering Policy for this load balancer.

        - `"off"`: Use `default_pools`.
        - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determined by `location_strategy`.
        - `"random"`: Select a pool randomly.
        - `"dynamic_latency"`: Use round trip time to select the closest pool in default_pools (requires pool health checks).
        - `"proximity"`: Use the pools' latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by `location_strategy` for non-proxied requests.
        - `"least_outstanding_requests"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
        - `"least_connections"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
        - `""`: Will map to `"geo"` if you use `region_pools`/`country_pools`/`pop_pools` otherwise `"off"`.

        - `"off"`

        - `"geo"`

        - `"random"`

        - `"dynamic_latency"`

        - `"proximity"`

        - `"least_outstanding_requests"`

        - `"least_connections"`

        - `""`

      - `ttl: optional number`

        Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.

    - `priority: optional number`

      The order in which rules should be executed in relation to each other. Lower values are executed first. Values do not need to be sequential. If no value is provided for any rule the array order of the rules field will be used to assign a priority.

    - `terminates: optional boolean`

      If this rule's condition is true, this causes rule evaluation to stop after processing this rule.

  - `session_affinity: optional SessionAffinity`

    Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - `"ip_cookie"`: Behaves the same as `"cookie"` except the initial origin selection is stable and based on the client's ip address. - `"header"`: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see `session_affinity_attributes.headers`) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of `session_affinity_ttl` seconds or the origin server is unhealthy, then a new origin server is calculated and used. See `headers` in `session_affinity_attributes` for additional required configuration.

  - `session_affinity_attributes: optional SessionAffinityAttributes`

    Configures attributes for session affinity.

  - `session_affinity_ttl: optional number`

    Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `session_affinity` policy are: - `"cookie"` / `"ip_cookie"`: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between [1800, 604800]. - `"header"`: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between [30, 3600]. Note: With session affinity by header, sessions only expire after they haven't been used for the number of seconds specified.

  - `steering_policy: optional SteeringPolicy`

    Steering Policy for this load balancer.

    - `"off"`: Use `default_pools`.
    - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determined by `location_strategy`.
    - `"random"`: Select a pool randomly.
    - `"dynamic_latency"`: Use round trip time to select the closest pool in default_pools (requires pool health checks).
    - `"proximity"`: Use the pools' latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by `location_strategy` for non-proxied requests.
    - `"least_outstanding_requests"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
    - `"least_connections"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
    - `""`: Will map to `"geo"` if you use `region_pools`/`country_pools`/`pop_pools` otherwise `"off"`.

  - `ttl: optional number`

    Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.

  - `zone_name: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/load_balancers/$LOAD_BALANCER_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "default_pools": [
            "17b5962d775c646f3f9725cbc7a53df4",
            "9290f38c5d07c2e2f4df57b1f61d4196",
            "00920f38ce07c2e2f4df50b1f61d4194"
          ],
          "fallback_pool": "fallback_pool",
          "name": "www.example.com",
          "country_pools": {
            "GB": [
              "abd90f38ced07c2e2f4df50b1f61d4194"
            ],
            "US": [
              "de90f38ced07c2e2f4df50b1f61d4194",
              "00920f38ce07c2e2f4df50b1f61d4194"
            ]
          },
          "description": "Load Balancer for www.example.com",
          "enabled": true,
          "pop_pools": {
            "LAX": [
              "de90f38ced07c2e2f4df50b1f61d4194",
              "9290f38c5d07c2e2f4df57b1f61d4196"
            ],
            "LHR": [
              "abd90f38ced07c2e2f4df50b1f61d4194",
              "f9138c5d07c2e2f4df57b1f61d4196"
            ],
            "SJC": [
              "00920f38ce07c2e2f4df50b1f61d4194"
            ]
          },
          "proxied": true,
          "region_pools": {
            "ENAM": [
              "00920f38ce07c2e2f4df50b1f61d4194"
            ],
            "WNAM": [
              "de90f38ced07c2e2f4df50b1f61d4194",
              "9290f38c5d07c2e2f4df57b1f61d4196"
            ]
          },
          "session_affinity": "cookie",
          "session_affinity_ttl": 1800,
          "steering_policy": "dynamic_latency",
          "ttl": 30
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
    "id": "699d98642c564d2e855e9661899b7252",
    "adaptive_routing": {
      "failover_across_pools": true
    },
    "country_pools": {
      "GB": [
        "abd90f38ced07c2e2f4df50b1f61d4194"
      ],
      "US": [
        "de90f38ced07c2e2f4df50b1f61d4194",
        "00920f38ce07c2e2f4df50b1f61d4194"
      ]
    },
    "created_on": "2014-01-01T05:20:00.12345Z",
    "default_pools": [
      "17b5962d775c646f3f9725cbc7a53df4",
      "9290f38c5d07c2e2f4df57b1f61d4196",
      "00920f38ce07c2e2f4df50b1f61d4194"
    ],
    "description": "Load Balancer for www.example.com",
    "enabled": true,
    "fallback_pool": "fallback_pool",
    "location_strategy": {
      "mode": "resolver_ip",
      "prefer_ecs": "always"
    },
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "www.example.com",
    "networks": [
      "string"
    ],
    "pop_pools": {
      "LAX": [
        "de90f38ced07c2e2f4df50b1f61d4194",
        "9290f38c5d07c2e2f4df57b1f61d4196"
      ],
      "LHR": [
        "abd90f38ced07c2e2f4df50b1f61d4194",
        "f9138c5d07c2e2f4df57b1f61d4196"
      ],
      "SJC": [
        "00920f38ce07c2e2f4df50b1f61d4194"
      ]
    },
    "proxied": true,
    "random_steering": {
      "default_weight": 0.2,
      "pool_weights": {
        "9290f38c5d07c2e2f4df57b1f61d4196": 0.5,
        "de90f38ced07c2e2f4df50b1f61d4194": 0.3
      }
    },
    "region_pools": {
      "ENAM": [
        "00920f38ce07c2e2f4df50b1f61d4194"
      ],
      "WNAM": [
        "de90f38ced07c2e2f4df50b1f61d4194",
        "9290f38c5d07c2e2f4df57b1f61d4196"
      ]
    },
    "rules": [
      {
        "condition": "http.request.uri.path contains \"/testing\"",
        "disabled": true,
        "fixed_response": {
          "content_type": "application/json",
          "location": "www.example.com",
          "message_body": "Testing Hello",
          "status_code": 0
        },
        "name": "route the path /testing to testing datacenter.",
        "overrides": {
          "adaptive_routing": {
            "failover_across_pools": true
          },
          "country_pools": {
            "GB": [
              "abd90f38ced07c2e2f4df50b1f61d4194"
            ],
            "US": [
              "de90f38ced07c2e2f4df50b1f61d4194",
              "00920f38ce07c2e2f4df50b1f61d4194"
            ]
          },
          "default_pools": [
            "17b5962d775c646f3f9725cbc7a53df4",
            "9290f38c5d07c2e2f4df57b1f61d4196",
            "00920f38ce07c2e2f4df50b1f61d4194"
          ],
          "fallback_pool": "fallback_pool",
          "location_strategy": {
            "mode": "resolver_ip",
            "prefer_ecs": "always"
          },
          "pop_pools": {
            "LAX": [
              "de90f38ced07c2e2f4df50b1f61d4194",
              "9290f38c5d07c2e2f4df57b1f61d4196"
            ],
            "LHR": [
              "abd90f38ced07c2e2f4df50b1f61d4194",
              "f9138c5d07c2e2f4df57b1f61d4196"
            ],
            "SJC": [
              "00920f38ce07c2e2f4df50b1f61d4194"
            ]
          },
          "random_steering": {
            "default_weight": 0.2,
            "pool_weights": {
              "9290f38c5d07c2e2f4df57b1f61d4196": 0.5,
              "de90f38ced07c2e2f4df50b1f61d4194": 0.3
            }
          },
          "region_pools": {
            "ENAM": [
              "00920f38ce07c2e2f4df50b1f61d4194"
            ],
            "WNAM": [
              "de90f38ced07c2e2f4df50b1f61d4194",
              "9290f38c5d07c2e2f4df57b1f61d4196"
            ]
          },
          "session_affinity": "cookie",
          "session_affinity_attributes": {
            "drain_duration": 100,
            "headers": [
              "x"
            ],
            "require_all_headers": true,
            "samesite": "Auto",
            "secure": "Auto",
            "zero_downtime_failover": "sticky"
          },
          "session_affinity_ttl": 1800,
          "steering_policy": "dynamic_latency",
          "ttl": 30
        },
        "priority": 0,
        "terminates": true
      }
    ],
    "session_affinity": "cookie",
    "session_affinity_attributes": {
      "drain_duration": 100,
      "headers": [
        "x"
      ],
      "require_all_headers": true,
      "samesite": "Auto",
      "secure": "Auto",
      "zero_downtime_failover": "sticky"
    },
    "session_affinity_ttl": 1800,
    "steering_policy": "dynamic_latency",
    "ttl": 30,
    "zone_name": "example.com"
  },
  "success": true
}
```

## Patch Load Balancer

**patch** `/zones/{zone_id}/load_balancers/{load_balancer_id}`

Apply changes to an existing load balancer, overwriting the supplied properties.

### Path Parameters

- `zone_id: string`

- `load_balancer_id: string`

### Body Parameters

- `adaptive_routing: optional AdaptiveRouting`

  Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

  - `failover_across_pools: optional boolean`

    Extends zero-downtime failover of requests to healthy origins from alternate pools, when no healthy alternate exists in the same pool, according to the failover order defined by traffic and origin steering. When set false (the default) zero-downtime failover will only occur between origins within the same pool. See `session_affinity_attributes` for control over when sessions are broken or reassigned.

- `country_pools: optional map[array of string]`

  A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool mapping if it exists else to default_pools.

- `default_pools: optional array of DefaultPools`

  A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region.

- `description: optional string`

  Object description.

- `enabled: optional boolean`

  Whether to enable (the default) this load balancer.

- `fallback_pool: optional string`

  The pool ID to use when all other pools are detected as unhealthy.

- `location_strategy: optional LocationStrategy`

  Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.

  - `mode: optional "pop" or "resolver_ip"`

    Determines the authoritative location when ECS is not preferred, does not exist in the request, or its GeoIP lookup is unsuccessful.

    - `"pop"`: Use the Cloudflare PoP location.
    - `"resolver_ip"`: Use the DNS resolver GeoIP location. If the GeoIP lookup is unsuccessful, use the Cloudflare PoP location.

    - `"pop"`

    - `"resolver_ip"`

  - `prefer_ecs: optional "always" or "never" or "proximity" or "geo"`

    Whether the EDNS Client Subnet (ECS) GeoIP should be preferred as the authoritative location.

    - `"always"`: Always prefer ECS.
    - `"never"`: Never prefer ECS.
    - `"proximity"`: Prefer ECS only when `steering_policy="proximity"`.
    - `"geo"`: Prefer ECS only when `steering_policy="geo"`.

    - `"always"`

    - `"never"`

    - `"proximity"`

    - `"geo"`

- `name: optional string`

  The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare's DNS, the Load Balancer will take precedence and the DNS record will not be used.

- `pop_pools: optional map[array of string]`

  Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using the corresponding country_pool, then region_pool mapping if it exists else to default_pools.

- `proxied: optional boolean`

  Whether the hostname should be gray clouded (false) or orange clouded (true).

- `random_steering: optional RandomSteering`

  Configures pool weights.

  - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights.
  - `steering_policy="least_outstanding_requests"`: Use pool weights to scale each pool's outstanding requests.
  - `steering_policy="least_connections"`: Use pool weights to scale each pool's open connections.

  - `default_weight: optional number`

    The default weight for pools in the load balancer that are not specified in the pool_weights map.

  - `pool_weights: optional map[number]`

    A mapping of pool IDs to custom weights. The weight is relative to other pools in the load balancer.

- `region_pools: optional map[array of string]`

  A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools.

- `rules: optional array of Rules`

  BETA Field Not General Access: A list of rules for this load balancer to execute.

  - `condition: optional string`

    The condition expressions to evaluate. If the condition evaluates to true, the overrides or fixed_response in this rule will be applied. An empty condition is always true. For more details on condition expressions, please see https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-rules/expressions.

  - `disabled: optional boolean`

    Disable this specific rule. It will no longer be evaluated by this load balancer.

  - `fixed_response: optional object { content_type, location, message_body, status_code }`

    A collection of fields used to directly respond to the eyeball instead of routing to a pool. If a fixed_response is supplied the rule will be marked as terminates.

    - `content_type: optional string`

      The http 'Content-Type' header to include in the response.

    - `location: optional string`

      The http 'Location' header to include in the response.

    - `message_body: optional string`

      Text to include as the http body.

    - `status_code: optional number`

      The http status code to respond with.

  - `name: optional string`

    Name of this rule. Only used for human readability.

  - `overrides: optional object { adaptive_routing, country_pools, default_pools, 10 more }`

    A collection of overrides to apply to the load balancer when this rule's condition is true. All fields are optional.

    - `adaptive_routing: optional AdaptiveRouting`

      Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

    - `country_pools: optional map[array of string]`

      A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool mapping if it exists else to default_pools.

    - `default_pools: optional array of DefaultPools`

      A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region.

    - `fallback_pool: optional string`

      The pool ID to use when all other pools are detected as unhealthy.

    - `location_strategy: optional LocationStrategy`

      Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.

    - `pop_pools: optional map[array of string]`

      Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using the corresponding country_pool, then region_pool mapping if it exists else to default_pools.

    - `random_steering: optional RandomSteering`

      Configures pool weights.

      - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights.
      - `steering_policy="least_outstanding_requests"`: Use pool weights to scale each pool's outstanding requests.
      - `steering_policy="least_connections"`: Use pool weights to scale each pool's open connections.

    - `region_pools: optional map[array of string]`

      A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools.

    - `session_affinity: optional SessionAffinity`

      Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - `"ip_cookie"`: Behaves the same as `"cookie"` except the initial origin selection is stable and based on the client's ip address. - `"header"`: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see `session_affinity_attributes.headers`) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of `session_affinity_ttl` seconds or the origin server is unhealthy, then a new origin server is calculated and used. See `headers` in `session_affinity_attributes` for additional required configuration.

      - `"none"`

      - `"cookie"`

      - `"ip_cookie"`

      - `"header"`

    - `session_affinity_attributes: optional SessionAffinityAttributes`

      Configures attributes for session affinity.

      - `drain_duration: optional number`

        Configures the drain duration in seconds. This field is only used when session affinity is enabled on the load balancer.

      - `headers: optional array of string`

        Configures the names of HTTP headers to base session affinity on when header `session_affinity` is enabled. At least one HTTP header name must be provided. To specify the exact cookies to be used, include an item in the following format: `"cookie:<cookie-name-1>,<cookie-name-2>"` (example) where everything after the colon is a comma-separated list of cookie names. Providing only `"cookie"` will result in all cookies being used. The default max number of HTTP header names that can be provided depends on your plan: 5 for Enterprise, 1 for all other plans.

      - `require_all_headers: optional boolean`

        When header `session_affinity` is enabled, this option can be used to specify how HTTP headers on load balancing requests will be used. The supported values are: - `"true"`: Load balancing requests must contain *all* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren't created. - `"false"`: Load balancing requests must contain *at least one* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren't created.

      - `samesite: optional "Auto" or "Lax" or "None" or "Strict"`

        Configures the SameSite attribute on session affinity cookie. Value "Auto" will be translated to "Lax" or "None" depending if Always Use HTTPS is enabled. Note: when using value "None", the secure attribute can not be set to "Never".

        - `"Auto"`

        - `"Lax"`

        - `"None"`

        - `"Strict"`

      - `secure: optional "Auto" or "Always" or "Never"`

        Configures the Secure attribute on session affinity cookie. Value "Always" indicates the Secure attribute will be set in the Set-Cookie header, "Never" indicates the Secure attribute will not be set, and "Auto" will set the Secure attribute depending if Always Use HTTPS is enabled.

        - `"Auto"`

        - `"Always"`

        - `"Never"`

      - `zero_downtime_failover: optional "none" or "temporary" or "sticky"`

        Configures the zero-downtime failover between origins within a pool when session affinity is enabled. This feature is currently incompatible with Argo, Tiered Cache, and Bandwidth Alliance. The supported values are: - `"none"`: No failover takes place for sessions pinned to the origin (default). - `"temporary"`: Traffic will be sent to another other healthy origin until the originally pinned origin is available; note that this can potentially result in heavy origin flapping. - `"sticky"`: The session affinity cookie is updated and subsequent requests are sent to the new origin. Note: Zero-downtime failover with sticky sessions is currently not supported for session affinity by header.

        - `"none"`

        - `"temporary"`

        - `"sticky"`

    - `session_affinity_ttl: optional number`

      Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `session_affinity` policy are: - `"cookie"` / `"ip_cookie"`: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between [1800, 604800]. - `"header"`: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between [30, 3600]. Note: With session affinity by header, sessions only expire after they haven't been used for the number of seconds specified.

    - `steering_policy: optional SteeringPolicy`

      Steering Policy for this load balancer.

      - `"off"`: Use `default_pools`.
      - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determined by `location_strategy`.
      - `"random"`: Select a pool randomly.
      - `"dynamic_latency"`: Use round trip time to select the closest pool in default_pools (requires pool health checks).
      - `"proximity"`: Use the pools' latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by `location_strategy` for non-proxied requests.
      - `"least_outstanding_requests"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
      - `"least_connections"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
      - `""`: Will map to `"geo"` if you use `region_pools`/`country_pools`/`pop_pools` otherwise `"off"`.

      - `"off"`

      - `"geo"`

      - `"random"`

      - `"dynamic_latency"`

      - `"proximity"`

      - `"least_outstanding_requests"`

      - `"least_connections"`

      - `""`

    - `ttl: optional number`

      Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.

  - `priority: optional number`

    The order in which rules should be executed in relation to each other. Lower values are executed first. Values do not need to be sequential. If no value is provided for any rule the array order of the rules field will be used to assign a priority.

  - `terminates: optional boolean`

    If this rule's condition is true, this causes rule evaluation to stop after processing this rule.

- `session_affinity: optional SessionAffinity`

  Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - `"ip_cookie"`: Behaves the same as `"cookie"` except the initial origin selection is stable and based on the client's ip address. - `"header"`: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see `session_affinity_attributes.headers`) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of `session_affinity_ttl` seconds or the origin server is unhealthy, then a new origin server is calculated and used. See `headers` in `session_affinity_attributes` for additional required configuration.

- `session_affinity_attributes: optional SessionAffinityAttributes`

  Configures attributes for session affinity.

- `session_affinity_ttl: optional number`

  Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `session_affinity` policy are: - `"cookie"` / `"ip_cookie"`: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between [1800, 604800]. - `"header"`: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between [30, 3600]. Note: With session affinity by header, sessions only expire after they haven't been used for the number of seconds specified.

- `steering_policy: optional SteeringPolicy`

  Steering Policy for this load balancer.

  - `"off"`: Use `default_pools`.
  - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determined by `location_strategy`.
  - `"random"`: Select a pool randomly.
  - `"dynamic_latency"`: Use round trip time to select the closest pool in default_pools (requires pool health checks).
  - `"proximity"`: Use the pools' latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by `location_strategy` for non-proxied requests.
  - `"least_outstanding_requests"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
  - `"least_connections"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
  - `""`: Will map to `"geo"` if you use `region_pools`/`country_pools`/`pop_pools` otherwise `"off"`.

- `ttl: optional number`

  Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.

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

- `result: LoadBalancer`

  - `id: optional string`

  - `adaptive_routing: optional AdaptiveRouting`

    Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

    - `failover_across_pools: optional boolean`

      Extends zero-downtime failover of requests to healthy origins from alternate pools, when no healthy alternate exists in the same pool, according to the failover order defined by traffic and origin steering. When set false (the default) zero-downtime failover will only occur between origins within the same pool. See `session_affinity_attributes` for control over when sessions are broken or reassigned.

  - `country_pools: optional map[array of string]`

    A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool mapping if it exists else to default_pools.

  - `created_on: optional string`

  - `default_pools: optional array of DefaultPools`

    A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region.

  - `description: optional string`

    Object description.

  - `enabled: optional boolean`

    Whether to enable (the default) this load balancer.

  - `fallback_pool: optional string`

    The pool ID to use when all other pools are detected as unhealthy.

  - `location_strategy: optional LocationStrategy`

    Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.

    - `mode: optional "pop" or "resolver_ip"`

      Determines the authoritative location when ECS is not preferred, does not exist in the request, or its GeoIP lookup is unsuccessful.

      - `"pop"`: Use the Cloudflare PoP location.
      - `"resolver_ip"`: Use the DNS resolver GeoIP location. If the GeoIP lookup is unsuccessful, use the Cloudflare PoP location.

      - `"pop"`

      - `"resolver_ip"`

    - `prefer_ecs: optional "always" or "never" or "proximity" or "geo"`

      Whether the EDNS Client Subnet (ECS) GeoIP should be preferred as the authoritative location.

      - `"always"`: Always prefer ECS.
      - `"never"`: Never prefer ECS.
      - `"proximity"`: Prefer ECS only when `steering_policy="proximity"`.
      - `"geo"`: Prefer ECS only when `steering_policy="geo"`.

      - `"always"`

      - `"never"`

      - `"proximity"`

      - `"geo"`

  - `modified_on: optional string`

  - `name: optional string`

    The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare's DNS, the Load Balancer will take precedence and the DNS record will not be used.

  - `networks: optional array of string`

    List of networks where Load Balancer or Pool is enabled.

  - `pop_pools: optional map[array of string]`

    Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using the corresponding country_pool, then region_pool mapping if it exists else to default_pools.

  - `proxied: optional boolean`

    Whether the hostname should be gray clouded (false) or orange clouded (true).

  - `random_steering: optional RandomSteering`

    Configures pool weights.

    - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights.
    - `steering_policy="least_outstanding_requests"`: Use pool weights to scale each pool's outstanding requests.
    - `steering_policy="least_connections"`: Use pool weights to scale each pool's open connections.

    - `default_weight: optional number`

      The default weight for pools in the load balancer that are not specified in the pool_weights map.

    - `pool_weights: optional map[number]`

      A mapping of pool IDs to custom weights. The weight is relative to other pools in the load balancer.

  - `region_pools: optional map[array of string]`

    A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools.

  - `rules: optional array of Rules`

    BETA Field Not General Access: A list of rules for this load balancer to execute.

    - `condition: optional string`

      The condition expressions to evaluate. If the condition evaluates to true, the overrides or fixed_response in this rule will be applied. An empty condition is always true. For more details on condition expressions, please see https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-rules/expressions.

    - `disabled: optional boolean`

      Disable this specific rule. It will no longer be evaluated by this load balancer.

    - `fixed_response: optional object { content_type, location, message_body, status_code }`

      A collection of fields used to directly respond to the eyeball instead of routing to a pool. If a fixed_response is supplied the rule will be marked as terminates.

      - `content_type: optional string`

        The http 'Content-Type' header to include in the response.

      - `location: optional string`

        The http 'Location' header to include in the response.

      - `message_body: optional string`

        Text to include as the http body.

      - `status_code: optional number`

        The http status code to respond with.

    - `name: optional string`

      Name of this rule. Only used for human readability.

    - `overrides: optional object { adaptive_routing, country_pools, default_pools, 10 more }`

      A collection of overrides to apply to the load balancer when this rule's condition is true. All fields are optional.

      - `adaptive_routing: optional AdaptiveRouting`

        Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

      - `country_pools: optional map[array of string]`

        A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool mapping if it exists else to default_pools.

      - `default_pools: optional array of DefaultPools`

        A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region.

      - `fallback_pool: optional string`

        The pool ID to use when all other pools are detected as unhealthy.

      - `location_strategy: optional LocationStrategy`

        Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.

      - `pop_pools: optional map[array of string]`

        Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using the corresponding country_pool, then region_pool mapping if it exists else to default_pools.

      - `random_steering: optional RandomSteering`

        Configures pool weights.

        - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights.
        - `steering_policy="least_outstanding_requests"`: Use pool weights to scale each pool's outstanding requests.
        - `steering_policy="least_connections"`: Use pool weights to scale each pool's open connections.

      - `region_pools: optional map[array of string]`

        A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools.

      - `session_affinity: optional SessionAffinity`

        Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - `"ip_cookie"`: Behaves the same as `"cookie"` except the initial origin selection is stable and based on the client's ip address. - `"header"`: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see `session_affinity_attributes.headers`) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of `session_affinity_ttl` seconds or the origin server is unhealthy, then a new origin server is calculated and used. See `headers` in `session_affinity_attributes` for additional required configuration.

        - `"none"`

        - `"cookie"`

        - `"ip_cookie"`

        - `"header"`

      - `session_affinity_attributes: optional SessionAffinityAttributes`

        Configures attributes for session affinity.

        - `drain_duration: optional number`

          Configures the drain duration in seconds. This field is only used when session affinity is enabled on the load balancer.

        - `headers: optional array of string`

          Configures the names of HTTP headers to base session affinity on when header `session_affinity` is enabled. At least one HTTP header name must be provided. To specify the exact cookies to be used, include an item in the following format: `"cookie:<cookie-name-1>,<cookie-name-2>"` (example) where everything after the colon is a comma-separated list of cookie names. Providing only `"cookie"` will result in all cookies being used. The default max number of HTTP header names that can be provided depends on your plan: 5 for Enterprise, 1 for all other plans.

        - `require_all_headers: optional boolean`

          When header `session_affinity` is enabled, this option can be used to specify how HTTP headers on load balancing requests will be used. The supported values are: - `"true"`: Load balancing requests must contain *all* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren't created. - `"false"`: Load balancing requests must contain *at least one* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren't created.

        - `samesite: optional "Auto" or "Lax" or "None" or "Strict"`

          Configures the SameSite attribute on session affinity cookie. Value "Auto" will be translated to "Lax" or "None" depending if Always Use HTTPS is enabled. Note: when using value "None", the secure attribute can not be set to "Never".

          - `"Auto"`

          - `"Lax"`

          - `"None"`

          - `"Strict"`

        - `secure: optional "Auto" or "Always" or "Never"`

          Configures the Secure attribute on session affinity cookie. Value "Always" indicates the Secure attribute will be set in the Set-Cookie header, "Never" indicates the Secure attribute will not be set, and "Auto" will set the Secure attribute depending if Always Use HTTPS is enabled.

          - `"Auto"`

          - `"Always"`

          - `"Never"`

        - `zero_downtime_failover: optional "none" or "temporary" or "sticky"`

          Configures the zero-downtime failover between origins within a pool when session affinity is enabled. This feature is currently incompatible with Argo, Tiered Cache, and Bandwidth Alliance. The supported values are: - `"none"`: No failover takes place for sessions pinned to the origin (default). - `"temporary"`: Traffic will be sent to another other healthy origin until the originally pinned origin is available; note that this can potentially result in heavy origin flapping. - `"sticky"`: The session affinity cookie is updated and subsequent requests are sent to the new origin. Note: Zero-downtime failover with sticky sessions is currently not supported for session affinity by header.

          - `"none"`

          - `"temporary"`

          - `"sticky"`

      - `session_affinity_ttl: optional number`

        Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `session_affinity` policy are: - `"cookie"` / `"ip_cookie"`: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between [1800, 604800]. - `"header"`: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between [30, 3600]. Note: With session affinity by header, sessions only expire after they haven't been used for the number of seconds specified.

      - `steering_policy: optional SteeringPolicy`

        Steering Policy for this load balancer.

        - `"off"`: Use `default_pools`.
        - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determined by `location_strategy`.
        - `"random"`: Select a pool randomly.
        - `"dynamic_latency"`: Use round trip time to select the closest pool in default_pools (requires pool health checks).
        - `"proximity"`: Use the pools' latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by `location_strategy` for non-proxied requests.
        - `"least_outstanding_requests"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
        - `"least_connections"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
        - `""`: Will map to `"geo"` if you use `region_pools`/`country_pools`/`pop_pools` otherwise `"off"`.

        - `"off"`

        - `"geo"`

        - `"random"`

        - `"dynamic_latency"`

        - `"proximity"`

        - `"least_outstanding_requests"`

        - `"least_connections"`

        - `""`

      - `ttl: optional number`

        Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.

    - `priority: optional number`

      The order in which rules should be executed in relation to each other. Lower values are executed first. Values do not need to be sequential. If no value is provided for any rule the array order of the rules field will be used to assign a priority.

    - `terminates: optional boolean`

      If this rule's condition is true, this causes rule evaluation to stop after processing this rule.

  - `session_affinity: optional SessionAffinity`

    Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - `"ip_cookie"`: Behaves the same as `"cookie"` except the initial origin selection is stable and based on the client's ip address. - `"header"`: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see `session_affinity_attributes.headers`) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of `session_affinity_ttl` seconds or the origin server is unhealthy, then a new origin server is calculated and used. See `headers` in `session_affinity_attributes` for additional required configuration.

  - `session_affinity_attributes: optional SessionAffinityAttributes`

    Configures attributes for session affinity.

  - `session_affinity_ttl: optional number`

    Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `session_affinity` policy are: - `"cookie"` / `"ip_cookie"`: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between [1800, 604800]. - `"header"`: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between [30, 3600]. Note: With session affinity by header, sessions only expire after they haven't been used for the number of seconds specified.

  - `steering_policy: optional SteeringPolicy`

    Steering Policy for this load balancer.

    - `"off"`: Use `default_pools`.
    - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determined by `location_strategy`.
    - `"random"`: Select a pool randomly.
    - `"dynamic_latency"`: Use round trip time to select the closest pool in default_pools (requires pool health checks).
    - `"proximity"`: Use the pools' latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by `location_strategy` for non-proxied requests.
    - `"least_outstanding_requests"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
    - `"least_connections"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
    - `""`: Will map to `"geo"` if you use `region_pools`/`country_pools`/`pop_pools` otherwise `"off"`.

  - `ttl: optional number`

    Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.

  - `zone_name: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/load_balancers/$LOAD_BALANCER_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "country_pools": {
            "GB": [
              "abd90f38ced07c2e2f4df50b1f61d4194"
            ],
            "US": [
              "de90f38ced07c2e2f4df50b1f61d4194",
              "00920f38ce07c2e2f4df50b1f61d4194"
            ]
          },
          "default_pools": [
            "17b5962d775c646f3f9725cbc7a53df4",
            "9290f38c5d07c2e2f4df57b1f61d4196",
            "00920f38ce07c2e2f4df50b1f61d4194"
          ],
          "description": "Load Balancer for www.example.com",
          "enabled": true,
          "name": "www.example.com",
          "pop_pools": {
            "LAX": [
              "de90f38ced07c2e2f4df50b1f61d4194",
              "9290f38c5d07c2e2f4df57b1f61d4196"
            ],
            "LHR": [
              "abd90f38ced07c2e2f4df50b1f61d4194",
              "f9138c5d07c2e2f4df57b1f61d4196"
            ],
            "SJC": [
              "00920f38ce07c2e2f4df50b1f61d4194"
            ]
          },
          "proxied": true,
          "region_pools": {
            "ENAM": [
              "00920f38ce07c2e2f4df50b1f61d4194"
            ],
            "WNAM": [
              "de90f38ced07c2e2f4df50b1f61d4194",
              "9290f38c5d07c2e2f4df57b1f61d4196"
            ]
          },
          "session_affinity": "cookie",
          "session_affinity_ttl": 1800,
          "steering_policy": "dynamic_latency",
          "ttl": 30
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
    "id": "699d98642c564d2e855e9661899b7252",
    "adaptive_routing": {
      "failover_across_pools": true
    },
    "country_pools": {
      "GB": [
        "abd90f38ced07c2e2f4df50b1f61d4194"
      ],
      "US": [
        "de90f38ced07c2e2f4df50b1f61d4194",
        "00920f38ce07c2e2f4df50b1f61d4194"
      ]
    },
    "created_on": "2014-01-01T05:20:00.12345Z",
    "default_pools": [
      "17b5962d775c646f3f9725cbc7a53df4",
      "9290f38c5d07c2e2f4df57b1f61d4196",
      "00920f38ce07c2e2f4df50b1f61d4194"
    ],
    "description": "Load Balancer for www.example.com",
    "enabled": true,
    "fallback_pool": "fallback_pool",
    "location_strategy": {
      "mode": "resolver_ip",
      "prefer_ecs": "always"
    },
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "www.example.com",
    "networks": [
      "string"
    ],
    "pop_pools": {
      "LAX": [
        "de90f38ced07c2e2f4df50b1f61d4194",
        "9290f38c5d07c2e2f4df57b1f61d4196"
      ],
      "LHR": [
        "abd90f38ced07c2e2f4df50b1f61d4194",
        "f9138c5d07c2e2f4df57b1f61d4196"
      ],
      "SJC": [
        "00920f38ce07c2e2f4df50b1f61d4194"
      ]
    },
    "proxied": true,
    "random_steering": {
      "default_weight": 0.2,
      "pool_weights": {
        "9290f38c5d07c2e2f4df57b1f61d4196": 0.5,
        "de90f38ced07c2e2f4df50b1f61d4194": 0.3
      }
    },
    "region_pools": {
      "ENAM": [
        "00920f38ce07c2e2f4df50b1f61d4194"
      ],
      "WNAM": [
        "de90f38ced07c2e2f4df50b1f61d4194",
        "9290f38c5d07c2e2f4df57b1f61d4196"
      ]
    },
    "rules": [
      {
        "condition": "http.request.uri.path contains \"/testing\"",
        "disabled": true,
        "fixed_response": {
          "content_type": "application/json",
          "location": "www.example.com",
          "message_body": "Testing Hello",
          "status_code": 0
        },
        "name": "route the path /testing to testing datacenter.",
        "overrides": {
          "adaptive_routing": {
            "failover_across_pools": true
          },
          "country_pools": {
            "GB": [
              "abd90f38ced07c2e2f4df50b1f61d4194"
            ],
            "US": [
              "de90f38ced07c2e2f4df50b1f61d4194",
              "00920f38ce07c2e2f4df50b1f61d4194"
            ]
          },
          "default_pools": [
            "17b5962d775c646f3f9725cbc7a53df4",
            "9290f38c5d07c2e2f4df57b1f61d4196",
            "00920f38ce07c2e2f4df50b1f61d4194"
          ],
          "fallback_pool": "fallback_pool",
          "location_strategy": {
            "mode": "resolver_ip",
            "prefer_ecs": "always"
          },
          "pop_pools": {
            "LAX": [
              "de90f38ced07c2e2f4df50b1f61d4194",
              "9290f38c5d07c2e2f4df57b1f61d4196"
            ],
            "LHR": [
              "abd90f38ced07c2e2f4df50b1f61d4194",
              "f9138c5d07c2e2f4df57b1f61d4196"
            ],
            "SJC": [
              "00920f38ce07c2e2f4df50b1f61d4194"
            ]
          },
          "random_steering": {
            "default_weight": 0.2,
            "pool_weights": {
              "9290f38c5d07c2e2f4df57b1f61d4196": 0.5,
              "de90f38ced07c2e2f4df50b1f61d4194": 0.3
            }
          },
          "region_pools": {
            "ENAM": [
              "00920f38ce07c2e2f4df50b1f61d4194"
            ],
            "WNAM": [
              "de90f38ced07c2e2f4df50b1f61d4194",
              "9290f38c5d07c2e2f4df57b1f61d4196"
            ]
          },
          "session_affinity": "cookie",
          "session_affinity_attributes": {
            "drain_duration": 100,
            "headers": [
              "x"
            ],
            "require_all_headers": true,
            "samesite": "Auto",
            "secure": "Auto",
            "zero_downtime_failover": "sticky"
          },
          "session_affinity_ttl": 1800,
          "steering_policy": "dynamic_latency",
          "ttl": 30
        },
        "priority": 0,
        "terminates": true
      }
    ],
    "session_affinity": "cookie",
    "session_affinity_attributes": {
      "drain_duration": 100,
      "headers": [
        "x"
      ],
      "require_all_headers": true,
      "samesite": "Auto",
      "secure": "Auto",
      "zero_downtime_failover": "sticky"
    },
    "session_affinity_ttl": 1800,
    "steering_policy": "dynamic_latency",
    "ttl": 30,
    "zone_name": "example.com"
  },
  "success": true
}
```

## Delete Load Balancer

**delete** `/zones/{zone_id}/load_balancers/{load_balancer_id}`

Delete a configured load balancer.

### Path Parameters

- `zone_id: string`

- `load_balancer_id: string`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/load_balancers/$LOAD_BALANCER_ID \
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
    "id": "699d98642c564d2e855e9661899b7252"
  },
  "success": true
}
```

## Domain Types

### Adaptive Routing

- `AdaptiveRouting object { failover_across_pools }`

  Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

  - `failover_across_pools: optional boolean`

    Extends zero-downtime failover of requests to healthy origins from alternate pools, when no healthy alternate exists in the same pool, according to the failover order defined by traffic and origin steering. When set false (the default) zero-downtime failover will only occur between origins within the same pool. See `session_affinity_attributes` for control over when sessions are broken or reassigned.

### Check Region

- `CheckRegion = "WNAM" or "ENAM" or "WEU" or 11 more`

  WNAM: Western North America, ENAM: Eastern North America, WEU: Western Europe, EEU: Eastern Europe, NSAM: Northern South America, SSAM: Southern South America, OC: Oceania, ME: Middle East, NAF: North Africa, SAF: South Africa, SAS: Southern Asia, SEAS: South East Asia, NEAS: North East Asia, ALL_REGIONS: all regions (ENTERPRISE customers only).

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

### Default Pools

- `DefaultPools = string`

  A pool ID.

### Filter Options

- `FilterOptions object { disable, healthy }`

  Filter options for a particular resource type (pool or origin). Use null to reset.

  - `disable: optional boolean`

    If set true, disable notifications for this type of resource (pool or origin).

  - `healthy: optional boolean`

    If present, send notifications only for this health status (e.g. false for only DOWN events). Use null to reset (all events).

### Header

- `Header object { Host }`

  The request header is used to pass additional information with an HTTP request. Currently supported header is 'Host'.

  - `Host: optional array of Host`

    The 'Host' header allows to override the hostname set in the HTTP request. Current support is 1 'Host' header override per origin.

### Host

- `Host = string`

### Load Balancer

- `LoadBalancer object { id, adaptive_routing, country_pools, 20 more }`

  - `id: optional string`

  - `adaptive_routing: optional AdaptiveRouting`

    Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

    - `failover_across_pools: optional boolean`

      Extends zero-downtime failover of requests to healthy origins from alternate pools, when no healthy alternate exists in the same pool, according to the failover order defined by traffic and origin steering. When set false (the default) zero-downtime failover will only occur between origins within the same pool. See `session_affinity_attributes` for control over when sessions are broken or reassigned.

  - `country_pools: optional map[array of string]`

    A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool mapping if it exists else to default_pools.

  - `created_on: optional string`

  - `default_pools: optional array of DefaultPools`

    A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region.

  - `description: optional string`

    Object description.

  - `enabled: optional boolean`

    Whether to enable (the default) this load balancer.

  - `fallback_pool: optional string`

    The pool ID to use when all other pools are detected as unhealthy.

  - `location_strategy: optional LocationStrategy`

    Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.

    - `mode: optional "pop" or "resolver_ip"`

      Determines the authoritative location when ECS is not preferred, does not exist in the request, or its GeoIP lookup is unsuccessful.

      - `"pop"`: Use the Cloudflare PoP location.
      - `"resolver_ip"`: Use the DNS resolver GeoIP location. If the GeoIP lookup is unsuccessful, use the Cloudflare PoP location.

      - `"pop"`

      - `"resolver_ip"`

    - `prefer_ecs: optional "always" or "never" or "proximity" or "geo"`

      Whether the EDNS Client Subnet (ECS) GeoIP should be preferred as the authoritative location.

      - `"always"`: Always prefer ECS.
      - `"never"`: Never prefer ECS.
      - `"proximity"`: Prefer ECS only when `steering_policy="proximity"`.
      - `"geo"`: Prefer ECS only when `steering_policy="geo"`.

      - `"always"`

      - `"never"`

      - `"proximity"`

      - `"geo"`

  - `modified_on: optional string`

  - `name: optional string`

    The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare's DNS, the Load Balancer will take precedence and the DNS record will not be used.

  - `networks: optional array of string`

    List of networks where Load Balancer or Pool is enabled.

  - `pop_pools: optional map[array of string]`

    Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using the corresponding country_pool, then region_pool mapping if it exists else to default_pools.

  - `proxied: optional boolean`

    Whether the hostname should be gray clouded (false) or orange clouded (true).

  - `random_steering: optional RandomSteering`

    Configures pool weights.

    - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights.
    - `steering_policy="least_outstanding_requests"`: Use pool weights to scale each pool's outstanding requests.
    - `steering_policy="least_connections"`: Use pool weights to scale each pool's open connections.

    - `default_weight: optional number`

      The default weight for pools in the load balancer that are not specified in the pool_weights map.

    - `pool_weights: optional map[number]`

      A mapping of pool IDs to custom weights. The weight is relative to other pools in the load balancer.

  - `region_pools: optional map[array of string]`

    A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools.

  - `rules: optional array of Rules`

    BETA Field Not General Access: A list of rules for this load balancer to execute.

    - `condition: optional string`

      The condition expressions to evaluate. If the condition evaluates to true, the overrides or fixed_response in this rule will be applied. An empty condition is always true. For more details on condition expressions, please see https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-rules/expressions.

    - `disabled: optional boolean`

      Disable this specific rule. It will no longer be evaluated by this load balancer.

    - `fixed_response: optional object { content_type, location, message_body, status_code }`

      A collection of fields used to directly respond to the eyeball instead of routing to a pool. If a fixed_response is supplied the rule will be marked as terminates.

      - `content_type: optional string`

        The http 'Content-Type' header to include in the response.

      - `location: optional string`

        The http 'Location' header to include in the response.

      - `message_body: optional string`

        Text to include as the http body.

      - `status_code: optional number`

        The http status code to respond with.

    - `name: optional string`

      Name of this rule. Only used for human readability.

    - `overrides: optional object { adaptive_routing, country_pools, default_pools, 10 more }`

      A collection of overrides to apply to the load balancer when this rule's condition is true. All fields are optional.

      - `adaptive_routing: optional AdaptiveRouting`

        Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

      - `country_pools: optional map[array of string]`

        A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool mapping if it exists else to default_pools.

      - `default_pools: optional array of DefaultPools`

        A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region.

      - `fallback_pool: optional string`

        The pool ID to use when all other pools are detected as unhealthy.

      - `location_strategy: optional LocationStrategy`

        Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.

      - `pop_pools: optional map[array of string]`

        Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using the corresponding country_pool, then region_pool mapping if it exists else to default_pools.

      - `random_steering: optional RandomSteering`

        Configures pool weights.

        - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights.
        - `steering_policy="least_outstanding_requests"`: Use pool weights to scale each pool's outstanding requests.
        - `steering_policy="least_connections"`: Use pool weights to scale each pool's open connections.

      - `region_pools: optional map[array of string]`

        A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools.

      - `session_affinity: optional SessionAffinity`

        Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - `"ip_cookie"`: Behaves the same as `"cookie"` except the initial origin selection is stable and based on the client's ip address. - `"header"`: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see `session_affinity_attributes.headers`) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of `session_affinity_ttl` seconds or the origin server is unhealthy, then a new origin server is calculated and used. See `headers` in `session_affinity_attributes` for additional required configuration.

        - `"none"`

        - `"cookie"`

        - `"ip_cookie"`

        - `"header"`

      - `session_affinity_attributes: optional SessionAffinityAttributes`

        Configures attributes for session affinity.

        - `drain_duration: optional number`

          Configures the drain duration in seconds. This field is only used when session affinity is enabled on the load balancer.

        - `headers: optional array of string`

          Configures the names of HTTP headers to base session affinity on when header `session_affinity` is enabled. At least one HTTP header name must be provided. To specify the exact cookies to be used, include an item in the following format: `"cookie:<cookie-name-1>,<cookie-name-2>"` (example) where everything after the colon is a comma-separated list of cookie names. Providing only `"cookie"` will result in all cookies being used. The default max number of HTTP header names that can be provided depends on your plan: 5 for Enterprise, 1 for all other plans.

        - `require_all_headers: optional boolean`

          When header `session_affinity` is enabled, this option can be used to specify how HTTP headers on load balancing requests will be used. The supported values are: - `"true"`: Load balancing requests must contain *all* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren't created. - `"false"`: Load balancing requests must contain *at least one* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren't created.

        - `samesite: optional "Auto" or "Lax" or "None" or "Strict"`

          Configures the SameSite attribute on session affinity cookie. Value "Auto" will be translated to "Lax" or "None" depending if Always Use HTTPS is enabled. Note: when using value "None", the secure attribute can not be set to "Never".

          - `"Auto"`

          - `"Lax"`

          - `"None"`

          - `"Strict"`

        - `secure: optional "Auto" or "Always" or "Never"`

          Configures the Secure attribute on session affinity cookie. Value "Always" indicates the Secure attribute will be set in the Set-Cookie header, "Never" indicates the Secure attribute will not be set, and "Auto" will set the Secure attribute depending if Always Use HTTPS is enabled.

          - `"Auto"`

          - `"Always"`

          - `"Never"`

        - `zero_downtime_failover: optional "none" or "temporary" or "sticky"`

          Configures the zero-downtime failover between origins within a pool when session affinity is enabled. This feature is currently incompatible with Argo, Tiered Cache, and Bandwidth Alliance. The supported values are: - `"none"`: No failover takes place for sessions pinned to the origin (default). - `"temporary"`: Traffic will be sent to another other healthy origin until the originally pinned origin is available; note that this can potentially result in heavy origin flapping. - `"sticky"`: The session affinity cookie is updated and subsequent requests are sent to the new origin. Note: Zero-downtime failover with sticky sessions is currently not supported for session affinity by header.

          - `"none"`

          - `"temporary"`

          - `"sticky"`

      - `session_affinity_ttl: optional number`

        Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `session_affinity` policy are: - `"cookie"` / `"ip_cookie"`: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between [1800, 604800]. - `"header"`: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between [30, 3600]. Note: With session affinity by header, sessions only expire after they haven't been used for the number of seconds specified.

      - `steering_policy: optional SteeringPolicy`

        Steering Policy for this load balancer.

        - `"off"`: Use `default_pools`.
        - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determined by `location_strategy`.
        - `"random"`: Select a pool randomly.
        - `"dynamic_latency"`: Use round trip time to select the closest pool in default_pools (requires pool health checks).
        - `"proximity"`: Use the pools' latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by `location_strategy` for non-proxied requests.
        - `"least_outstanding_requests"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
        - `"least_connections"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
        - `""`: Will map to `"geo"` if you use `region_pools`/`country_pools`/`pop_pools` otherwise `"off"`.

        - `"off"`

        - `"geo"`

        - `"random"`

        - `"dynamic_latency"`

        - `"proximity"`

        - `"least_outstanding_requests"`

        - `"least_connections"`

        - `""`

      - `ttl: optional number`

        Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.

    - `priority: optional number`

      The order in which rules should be executed in relation to each other. Lower values are executed first. Values do not need to be sequential. If no value is provided for any rule the array order of the rules field will be used to assign a priority.

    - `terminates: optional boolean`

      If this rule's condition is true, this causes rule evaluation to stop after processing this rule.

  - `session_affinity: optional SessionAffinity`

    Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - `"ip_cookie"`: Behaves the same as `"cookie"` except the initial origin selection is stable and based on the client's ip address. - `"header"`: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see `session_affinity_attributes.headers`) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of `session_affinity_ttl` seconds or the origin server is unhealthy, then a new origin server is calculated and used. See `headers` in `session_affinity_attributes` for additional required configuration.

  - `session_affinity_attributes: optional SessionAffinityAttributes`

    Configures attributes for session affinity.

  - `session_affinity_ttl: optional number`

    Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `session_affinity` policy are: - `"cookie"` / `"ip_cookie"`: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between [1800, 604800]. - `"header"`: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between [30, 3600]. Note: With session affinity by header, sessions only expire after they haven't been used for the number of seconds specified.

  - `steering_policy: optional SteeringPolicy`

    Steering Policy for this load balancer.

    - `"off"`: Use `default_pools`.
    - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determined by `location_strategy`.
    - `"random"`: Select a pool randomly.
    - `"dynamic_latency"`: Use round trip time to select the closest pool in default_pools (requires pool health checks).
    - `"proximity"`: Use the pools' latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by `location_strategy` for non-proxied requests.
    - `"least_outstanding_requests"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
    - `"least_connections"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
    - `""`: Will map to `"geo"` if you use `region_pools`/`country_pools`/`pop_pools` otherwise `"off"`.

  - `ttl: optional number`

    Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.

  - `zone_name: optional string`

### Load Shedding

- `LoadShedding object { default_percent, default_policy, session_percent, session_policy }`

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

### Location Strategy

- `LocationStrategy object { mode, prefer_ecs }`

  Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.

  - `mode: optional "pop" or "resolver_ip"`

    Determines the authoritative location when ECS is not preferred, does not exist in the request, or its GeoIP lookup is unsuccessful.

    - `"pop"`: Use the Cloudflare PoP location.
    - `"resolver_ip"`: Use the DNS resolver GeoIP location. If the GeoIP lookup is unsuccessful, use the Cloudflare PoP location.

    - `"pop"`

    - `"resolver_ip"`

  - `prefer_ecs: optional "always" or "never" or "proximity" or "geo"`

    Whether the EDNS Client Subnet (ECS) GeoIP should be preferred as the authoritative location.

    - `"always"`: Always prefer ECS.
    - `"never"`: Never prefer ECS.
    - `"proximity"`: Prefer ECS only when `steering_policy="proximity"`.
    - `"geo"`: Prefer ECS only when `steering_policy="geo"`.

    - `"always"`

    - `"never"`

    - `"proximity"`

    - `"geo"`

### Notification Filter

- `NotificationFilter object { origin, pool }`

  Filter pool and origin health notifications by resource type or health status. Use null to reset.

  - `origin: optional FilterOptions`

    Filter options for a particular resource type (pool or origin). Use null to reset.

    - `disable: optional boolean`

      If set true, disable notifications for this type of resource (pool or origin).

    - `healthy: optional boolean`

      If present, send notifications only for this health status (e.g. false for only DOWN events). Use null to reset (all events).

  - `pool: optional FilterOptions`

    Filter options for a particular resource type (pool or origin). Use null to reset.

### Origin

- `Origin object { address, disabled_at, enabled, 6 more }`

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

### Origin Steering

- `OriginSteering object { policy }`

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

### Random Steering

- `RandomSteering object { default_weight, pool_weights }`

  Configures pool weights.

  - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights.
  - `steering_policy="least_outstanding_requests"`: Use pool weights to scale each pool's outstanding requests.
  - `steering_policy="least_connections"`: Use pool weights to scale each pool's open connections.

  - `default_weight: optional number`

    The default weight for pools in the load balancer that are not specified in the pool_weights map.

  - `pool_weights: optional map[number]`

    A mapping of pool IDs to custom weights. The weight is relative to other pools in the load balancer.

### Rules

- `Rules object { condition, disabled, fixed_response, 4 more }`

  A rule object containing conditions and overrides for this load balancer to evaluate.

  - `condition: optional string`

    The condition expressions to evaluate. If the condition evaluates to true, the overrides or fixed_response in this rule will be applied. An empty condition is always true. For more details on condition expressions, please see https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-rules/expressions.

  - `disabled: optional boolean`

    Disable this specific rule. It will no longer be evaluated by this load balancer.

  - `fixed_response: optional object { content_type, location, message_body, status_code }`

    A collection of fields used to directly respond to the eyeball instead of routing to a pool. If a fixed_response is supplied the rule will be marked as terminates.

    - `content_type: optional string`

      The http 'Content-Type' header to include in the response.

    - `location: optional string`

      The http 'Location' header to include in the response.

    - `message_body: optional string`

      Text to include as the http body.

    - `status_code: optional number`

      The http status code to respond with.

  - `name: optional string`

    Name of this rule. Only used for human readability.

  - `overrides: optional object { adaptive_routing, country_pools, default_pools, 10 more }`

    A collection of overrides to apply to the load balancer when this rule's condition is true. All fields are optional.

    - `adaptive_routing: optional AdaptiveRouting`

      Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

      - `failover_across_pools: optional boolean`

        Extends zero-downtime failover of requests to healthy origins from alternate pools, when no healthy alternate exists in the same pool, according to the failover order defined by traffic and origin steering. When set false (the default) zero-downtime failover will only occur between origins within the same pool. See `session_affinity_attributes` for control over when sessions are broken or reassigned.

    - `country_pools: optional map[array of string]`

      A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region_pool mapping if it exists else to default_pools.

    - `default_pools: optional array of DefaultPools`

      A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a given region.

    - `fallback_pool: optional string`

      The pool ID to use when all other pools are detected as unhealthy.

    - `location_strategy: optional LocationStrategy`

      Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.

      - `mode: optional "pop" or "resolver_ip"`

        Determines the authoritative location when ECS is not preferred, does not exist in the request, or its GeoIP lookup is unsuccessful.

        - `"pop"`: Use the Cloudflare PoP location.
        - `"resolver_ip"`: Use the DNS resolver GeoIP location. If the GeoIP lookup is unsuccessful, use the Cloudflare PoP location.

        - `"pop"`

        - `"resolver_ip"`

      - `prefer_ecs: optional "always" or "never" or "proximity" or "geo"`

        Whether the EDNS Client Subnet (ECS) GeoIP should be preferred as the authoritative location.

        - `"always"`: Always prefer ECS.
        - `"never"`: Never prefer ECS.
        - `"proximity"`: Prefer ECS only when `steering_policy="proximity"`.
        - `"geo"`: Prefer ECS only when `steering_policy="geo"`.

        - `"always"`

        - `"never"`

        - `"proximity"`

        - `"geo"`

    - `pop_pools: optional map[array of string]`

      Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using the corresponding country_pool, then region_pool mapping if it exists else to default_pools.

    - `random_steering: optional RandomSteering`

      Configures pool weights.

      - `steering_policy="random"`: A random pool is selected with probability proportional to pool weights.
      - `steering_policy="least_outstanding_requests"`: Use pool weights to scale each pool's outstanding requests.
      - `steering_policy="least_connections"`: Use pool weights to scale each pool's open connections.

      - `default_weight: optional number`

        The default weight for pools in the load balancer that are not specified in the pool_weights map.

      - `pool_weights: optional map[number]`

        A mapping of pool IDs to custom weights. The weight is relative to other pools in the load balancer.

    - `region_pools: optional map[array of string]`

      A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default_pools.

    - `session_affinity: optional SessionAffinity`

      Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - `"ip_cookie"`: Behaves the same as `"cookie"` except the initial origin selection is stable and based on the client's ip address. - `"header"`: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see `session_affinity_attributes.headers`) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of `session_affinity_ttl` seconds or the origin server is unhealthy, then a new origin server is calculated and used. See `headers` in `session_affinity_attributes` for additional required configuration.

      - `"none"`

      - `"cookie"`

      - `"ip_cookie"`

      - `"header"`

    - `session_affinity_attributes: optional SessionAffinityAttributes`

      Configures attributes for session affinity.

      - `drain_duration: optional number`

        Configures the drain duration in seconds. This field is only used when session affinity is enabled on the load balancer.

      - `headers: optional array of string`

        Configures the names of HTTP headers to base session affinity on when header `session_affinity` is enabled. At least one HTTP header name must be provided. To specify the exact cookies to be used, include an item in the following format: `"cookie:<cookie-name-1>,<cookie-name-2>"` (example) where everything after the colon is a comma-separated list of cookie names. Providing only `"cookie"` will result in all cookies being used. The default max number of HTTP header names that can be provided depends on your plan: 5 for Enterprise, 1 for all other plans.

      - `require_all_headers: optional boolean`

        When header `session_affinity` is enabled, this option can be used to specify how HTTP headers on load balancing requests will be used. The supported values are: - `"true"`: Load balancing requests must contain *all* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren't created. - `"false"`: Load balancing requests must contain *at least one* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren't created.

      - `samesite: optional "Auto" or "Lax" or "None" or "Strict"`

        Configures the SameSite attribute on session affinity cookie. Value "Auto" will be translated to "Lax" or "None" depending if Always Use HTTPS is enabled. Note: when using value "None", the secure attribute can not be set to "Never".

        - `"Auto"`

        - `"Lax"`

        - `"None"`

        - `"Strict"`

      - `secure: optional "Auto" or "Always" or "Never"`

        Configures the Secure attribute on session affinity cookie. Value "Always" indicates the Secure attribute will be set in the Set-Cookie header, "Never" indicates the Secure attribute will not be set, and "Auto" will set the Secure attribute depending if Always Use HTTPS is enabled.

        - `"Auto"`

        - `"Always"`

        - `"Never"`

      - `zero_downtime_failover: optional "none" or "temporary" or "sticky"`

        Configures the zero-downtime failover between origins within a pool when session affinity is enabled. This feature is currently incompatible with Argo, Tiered Cache, and Bandwidth Alliance. The supported values are: - `"none"`: No failover takes place for sessions pinned to the origin (default). - `"temporary"`: Traffic will be sent to another other healthy origin until the originally pinned origin is available; note that this can potentially result in heavy origin flapping. - `"sticky"`: The session affinity cookie is updated and subsequent requests are sent to the new origin. Note: Zero-downtime failover with sticky sessions is currently not supported for session affinity by header.

        - `"none"`

        - `"temporary"`

        - `"sticky"`

    - `session_affinity_ttl: optional number`

      Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per `session_affinity` policy are: - `"cookie"` / `"ip_cookie"`: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between [1800, 604800]. - `"header"`: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between [30, 3600]. Note: With session affinity by header, sessions only expire after they haven't been used for the number of seconds specified.

    - `steering_policy: optional SteeringPolicy`

      Steering Policy for this load balancer.

      - `"off"`: Use `default_pools`.
      - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determined by `location_strategy`.
      - `"random"`: Select a pool randomly.
      - `"dynamic_latency"`: Use round trip time to select the closest pool in default_pools (requires pool health checks).
      - `"proximity"`: Use the pools' latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by `location_strategy` for non-proxied requests.
      - `"least_outstanding_requests"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
      - `"least_connections"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
      - `""`: Will map to `"geo"` if you use `region_pools`/`country_pools`/`pop_pools` otherwise `"off"`.

      - `"off"`

      - `"geo"`

      - `"random"`

      - `"dynamic_latency"`

      - `"proximity"`

      - `"least_outstanding_requests"`

      - `"least_connections"`

      - `""`

    - `ttl: optional number`

      Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.

  - `priority: optional number`

    The order in which rules should be executed in relation to each other. Lower values are executed first. Values do not need to be sequential. If no value is provided for any rule the array order of the rules field will be used to assign a priority.

  - `terminates: optional boolean`

    If this rule's condition is true, this causes rule evaluation to stop after processing this rule.

### Session Affinity

- `SessionAffinity = "none" or "cookie" or "ip_cookie" or "header"`

  Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - `"ip_cookie"`: Behaves the same as `"cookie"` except the initial origin selection is stable and based on the client's ip address. - `"header"`: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see `session_affinity_attributes.headers`) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of `session_affinity_ttl` seconds or the origin server is unhealthy, then a new origin server is calculated and used. See `headers` in `session_affinity_attributes` for additional required configuration.

  - `"none"`

  - `"cookie"`

  - `"ip_cookie"`

  - `"header"`

### Session Affinity Attributes

- `SessionAffinityAttributes object { drain_duration, headers, require_all_headers, 3 more }`

  Configures attributes for session affinity.

  - `drain_duration: optional number`

    Configures the drain duration in seconds. This field is only used when session affinity is enabled on the load balancer.

  - `headers: optional array of string`

    Configures the names of HTTP headers to base session affinity on when header `session_affinity` is enabled. At least one HTTP header name must be provided. To specify the exact cookies to be used, include an item in the following format: `"cookie:<cookie-name-1>,<cookie-name-2>"` (example) where everything after the colon is a comma-separated list of cookie names. Providing only `"cookie"` will result in all cookies being used. The default max number of HTTP header names that can be provided depends on your plan: 5 for Enterprise, 1 for all other plans.

  - `require_all_headers: optional boolean`

    When header `session_affinity` is enabled, this option can be used to specify how HTTP headers on load balancing requests will be used. The supported values are: - `"true"`: Load balancing requests must contain *all* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren't created. - `"false"`: Load balancing requests must contain *at least one* of the HTTP headers specified by the `headers` session affinity attribute, otherwise sessions aren't created.

  - `samesite: optional "Auto" or "Lax" or "None" or "Strict"`

    Configures the SameSite attribute on session affinity cookie. Value "Auto" will be translated to "Lax" or "None" depending if Always Use HTTPS is enabled. Note: when using value "None", the secure attribute can not be set to "Never".

    - `"Auto"`

    - `"Lax"`

    - `"None"`

    - `"Strict"`

  - `secure: optional "Auto" or "Always" or "Never"`

    Configures the Secure attribute on session affinity cookie. Value "Always" indicates the Secure attribute will be set in the Set-Cookie header, "Never" indicates the Secure attribute will not be set, and "Auto" will set the Secure attribute depending if Always Use HTTPS is enabled.

    - `"Auto"`

    - `"Always"`

    - `"Never"`

  - `zero_downtime_failover: optional "none" or "temporary" or "sticky"`

    Configures the zero-downtime failover between origins within a pool when session affinity is enabled. This feature is currently incompatible with Argo, Tiered Cache, and Bandwidth Alliance. The supported values are: - `"none"`: No failover takes place for sessions pinned to the origin (default). - `"temporary"`: Traffic will be sent to another other healthy origin until the originally pinned origin is available; note that this can potentially result in heavy origin flapping. - `"sticky"`: The session affinity cookie is updated and subsequent requests are sent to the new origin. Note: Zero-downtime failover with sticky sessions is currently not supported for session affinity by header.

    - `"none"`

    - `"temporary"`

    - `"sticky"`

### Steering Policy

- `SteeringPolicy = "off" or "geo" or "random" or 5 more`

  Steering Policy for this load balancer.

  - `"off"`: Use `default_pools`.
  - `"geo"`: Use `region_pools`/`country_pools`/`pop_pools`. For non-proxied requests, the country for `country_pools` is determined by `location_strategy`.
  - `"random"`: Select a pool randomly.
  - `"dynamic_latency"`: Use round trip time to select the closest pool in default_pools (requires pool health checks).
  - `"proximity"`: Use the pools' latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by `location_strategy` for non-proxied requests.
  - `"least_outstanding_requests"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
  - `"least_connections"`: Select a pool by taking into consideration `random_steering` weights, as well as each pool's number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
  - `""`: Will map to `"geo"` if you use `region_pools`/`country_pools`/`pop_pools` otherwise `"off"`.

  - `"off"`

  - `"geo"`

  - `"random"`

  - `"dynamic_latency"`

  - `"proximity"`

  - `"least_outstanding_requests"`

  - `"least_connections"`

  - `""`

### Load Balancer Delete Response

- `LoadBalancerDeleteResponse object { id }`

  - `id: optional string`

# Monitors

## List Monitors

**get** `/accounts/{account_id}/load_balancers/monitors`

List configured monitors for an account.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: array of Monitor`

  - `id: optional string`

  - `allow_insecure: optional boolean`

    Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors.

  - `consecutive_down: optional number`

    To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times.

  - `consecutive_up: optional number`

    To be marked healthy the monitored origin must pass this healthcheck N consecutive times.

  - `created_on: optional string`

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

  - `modified_on: optional string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitors \
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
      "id": "f1aba936b94213e5b8dca0c0dbf1f9cc",
      "allow_insecure": true,
      "consecutive_down": 0,
      "consecutive_up": 0,
      "created_on": "2014-01-01T05:20:00.12345Z",
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
      "interval": 0,
      "method": "GET",
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "path": "/health",
      "port": 0,
      "probe_zone": "example.com",
      "retries": 0,
      "timeout": 0,
      "type": "https"
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

## Monitor Details

**get** `/accounts/{account_id}/load_balancers/monitors/{monitor_id}`

List a single configured monitor for an account.

### Path Parameters

- `account_id: string`

  Identifier.

- `monitor_id: string`

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

- `result: Monitor`

  - `id: optional string`

  - `allow_insecure: optional boolean`

    Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors.

  - `consecutive_down: optional number`

    To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times.

  - `consecutive_up: optional number`

    To be marked healthy the monitored origin must pass this healthcheck N consecutive times.

  - `created_on: optional string`

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

  - `modified_on: optional string`

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

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitors/$MONITOR_ID \
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
    "id": "f1aba936b94213e5b8dca0c0dbf1f9cc",
    "allow_insecure": true,
    "consecutive_down": 0,
    "consecutive_up": 0,
    "created_on": "2014-01-01T05:20:00.12345Z",
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
    "interval": 0,
    "method": "GET",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "path": "/health",
    "port": 0,
    "probe_zone": "example.com",
    "retries": 0,
    "timeout": 0,
    "type": "https"
  },
  "success": true
}
```

## Create Monitor

**post** `/accounts/{account_id}/load_balancers/monitors`

Create a configured monitor.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: Monitor`

  - `id: optional string`

  - `allow_insecure: optional boolean`

    Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors.

  - `consecutive_down: optional number`

    To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times.

  - `consecutive_up: optional number`

    To be marked healthy the monitored origin must pass this healthcheck N consecutive times.

  - `created_on: optional string`

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

  - `modified_on: optional string`

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

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitors \
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
    "id": "f1aba936b94213e5b8dca0c0dbf1f9cc",
    "allow_insecure": true,
    "consecutive_down": 0,
    "consecutive_up": 0,
    "created_on": "2014-01-01T05:20:00.12345Z",
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
    "interval": 0,
    "method": "GET",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "path": "/health",
    "port": 0,
    "probe_zone": "example.com",
    "retries": 0,
    "timeout": 0,
    "type": "https"
  },
  "success": true
}
```

## Update Monitor

**put** `/accounts/{account_id}/load_balancers/monitors/{monitor_id}`

Modify a configured monitor.

### Path Parameters

- `account_id: string`

  Identifier.

- `monitor_id: string`

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

- `result: Monitor`

  - `id: optional string`

  - `allow_insecure: optional boolean`

    Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors.

  - `consecutive_down: optional number`

    To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times.

  - `consecutive_up: optional number`

    To be marked healthy the monitored origin must pass this healthcheck N consecutive times.

  - `created_on: optional string`

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

  - `modified_on: optional string`

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

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitors/$MONITOR_ID \
    -X PUT \
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
    "id": "f1aba936b94213e5b8dca0c0dbf1f9cc",
    "allow_insecure": true,
    "consecutive_down": 0,
    "consecutive_up": 0,
    "created_on": "2014-01-01T05:20:00.12345Z",
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
    "interval": 0,
    "method": "GET",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "path": "/health",
    "port": 0,
    "probe_zone": "example.com",
    "retries": 0,
    "timeout": 0,
    "type": "https"
  },
  "success": true
}
```

## Patch Monitor

**patch** `/accounts/{account_id}/load_balancers/monitors/{monitor_id}`

Apply changes to an existing monitor, overwriting the supplied properties.

### Path Parameters

- `account_id: string`

  Identifier.

- `monitor_id: string`

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

- `result: Monitor`

  - `id: optional string`

  - `allow_insecure: optional boolean`

    Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors.

  - `consecutive_down: optional number`

    To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times.

  - `consecutive_up: optional number`

    To be marked healthy the monitored origin must pass this healthcheck N consecutive times.

  - `created_on: optional string`

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

  - `modified_on: optional string`

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

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitors/$MONITOR_ID \
    -X PATCH \
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
    "id": "f1aba936b94213e5b8dca0c0dbf1f9cc",
    "allow_insecure": true,
    "consecutive_down": 0,
    "consecutive_up": 0,
    "created_on": "2014-01-01T05:20:00.12345Z",
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
    "interval": 0,
    "method": "GET",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "path": "/health",
    "port": 0,
    "probe_zone": "example.com",
    "retries": 0,
    "timeout": 0,
    "type": "https"
  },
  "success": true
}
```

## Delete Monitor

**delete** `/accounts/{account_id}/load_balancers/monitors/{monitor_id}`

Delete a configured monitor.

### Path Parameters

- `account_id: string`

  Identifier.

- `monitor_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitors/$MONITOR_ID \
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
    "id": "f1aba936b94213e5b8dca0c0dbf1f9cc"
  },
  "success": true
}
```

## Domain Types

### Monitor

- `Monitor object { id, allow_insecure, consecutive_down, 16 more }`

  - `id: optional string`

  - `allow_insecure: optional boolean`

    Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors.

  - `consecutive_down: optional number`

    To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times.

  - `consecutive_up: optional number`

    To be marked healthy the monitored origin must pass this healthcheck N consecutive times.

  - `created_on: optional string`

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

  - `modified_on: optional string`

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

### Monitor Delete Response

- `MonitorDeleteResponse object { id }`

  - `id: optional string`

# Previews

## Preview Monitor

**post** `/accounts/{account_id}/load_balancers/monitors/{monitor_id}/preview`

Preview pools using the specified monitor with provided monitor details. The returned preview_id can be used in the preview endpoint to retrieve the results.

### Path Parameters

- `account_id: string`

  Identifier.

- `monitor_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitors/$MONITOR_ID/preview \
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

### Preview Create Response

- `PreviewCreateResponse object { pools, preview_id }`

  - `pools: optional map[string]`

    Monitored pool IDs mapped to their respective names.

  - `preview_id: optional string`

# References

## List Monitor References

**get** `/accounts/{account_id}/load_balancers/monitors/{monitor_id}/references`

Get the list of resources that reference the provided monitor.

### Path Parameters

- `account_id: string`

  Identifier.

- `monitor_id: string`

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

  List of resources that reference a given monitor.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitors/$MONITOR_ID/references \
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
      "resource_id": "17b5962d775c646f3f9725cbc7a53df4",
      "resource_name": "primary-dc-1",
      "resource_type": "pool"
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

# Monitor Groups

## List Monitor Groups

**get** `/accounts/{account_id}/load_balancers/monitor_groups`

List configured monitor groups.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: array of MonitorGroup`

  - `id: string`

    The ID of the Monitor Group to use for checking the health of origins within this pool.

  - `description: string`

    A short description of the monitor group

  - `members: array of object { enabled, monitor_id, monitoring_only, 3 more }`

    List of monitors in this group

    - `enabled: boolean`

      Whether this monitor is enabled in the group

    - `monitor_id: string`

      The ID of the Monitor to use for checking the health of origins within this pool.

    - `monitoring_only: boolean`

      Whether this monitor is used for monitoring only (does not affect pool health)

    - `must_be_healthy: boolean`

      Whether this monitor must be healthy for the pool to be considered healthy

    - `created_at: optional string`

      The timestamp of when the monitor was added to the group

    - `updated_at: optional string`

      The timestamp of when the monitor group member was last updated

  - `created_on: optional string`

    The timestamp of when the monitor group was created

  - `modified_on: optional string`

    The timestamp of when the monitor group was last updated

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitor_groups \
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
      "id": "id",
      "description": "Primary datacenter monitors",
      "members": [
        {
          "enabled": true,
          "monitor_id": "monitor_id",
          "monitoring_only": false,
          "must_be_healthy": true,
          "created_at": "2014-01-01T05:20:00.12345Z",
          "updated_at": "2014-01-01T05:20:00.12345Z"
        }
      ],
      "created_on": "2014-01-01T05:20:00.12345Z",
      "modified_on": "2014-01-01T05:20:00.12345Z"
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

## Monitor Group Details

**get** `/accounts/{account_id}/load_balancers/monitor_groups/{monitor_group_id}`

Fetch a single configured monitor group.

### Path Parameters

- `account_id: string`

  Identifier.

- `monitor_group_id: string`

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

- `result: MonitorGroup`

  - `id: string`

    The ID of the Monitor Group to use for checking the health of origins within this pool.

  - `description: string`

    A short description of the monitor group

  - `members: array of object { enabled, monitor_id, monitoring_only, 3 more }`

    List of monitors in this group

    - `enabled: boolean`

      Whether this monitor is enabled in the group

    - `monitor_id: string`

      The ID of the Monitor to use for checking the health of origins within this pool.

    - `monitoring_only: boolean`

      Whether this monitor is used for monitoring only (does not affect pool health)

    - `must_be_healthy: boolean`

      Whether this monitor must be healthy for the pool to be considered healthy

    - `created_at: optional string`

      The timestamp of when the monitor was added to the group

    - `updated_at: optional string`

      The timestamp of when the monitor group member was last updated

  - `created_on: optional string`

    The timestamp of when the monitor group was created

  - `modified_on: optional string`

    The timestamp of when the monitor group was last updated

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitor_groups/$MONITOR_GROUP_ID \
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
    "id": "id",
    "description": "Primary datacenter monitors",
    "members": [
      {
        "enabled": true,
        "monitor_id": "monitor_id",
        "monitoring_only": false,
        "must_be_healthy": true,
        "created_at": "2014-01-01T05:20:00.12345Z",
        "updated_at": "2014-01-01T05:20:00.12345Z"
      }
    ],
    "created_on": "2014-01-01T05:20:00.12345Z",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  },
  "success": true
}
```

## Create Monitor Group

**post** `/accounts/{account_id}/load_balancers/monitor_groups`

Create a new monitor group.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `description: string`

  A short description of the monitor group

- `members: array of object { enabled, monitor_id, monitoring_only, 3 more }`

  List of monitors in this group

  - `enabled: boolean`

    Whether this monitor is enabled in the group

  - `monitor_id: string`

    The ID of the Monitor to use for checking the health of origins within this pool.

  - `monitoring_only: boolean`

    Whether this monitor is used for monitoring only (does not affect pool health)

  - `must_be_healthy: boolean`

    Whether this monitor must be healthy for the pool to be considered healthy

  - `created_at: optional string`

    The timestamp of when the monitor was added to the group

  - `updated_at: optional string`

    The timestamp of when the monitor group member was last updated

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

- `result: MonitorGroup`

  - `id: string`

    The ID of the Monitor Group to use for checking the health of origins within this pool.

  - `description: string`

    A short description of the monitor group

  - `members: array of object { enabled, monitor_id, monitoring_only, 3 more }`

    List of monitors in this group

    - `enabled: boolean`

      Whether this monitor is enabled in the group

    - `monitor_id: string`

      The ID of the Monitor to use for checking the health of origins within this pool.

    - `monitoring_only: boolean`

      Whether this monitor is used for monitoring only (does not affect pool health)

    - `must_be_healthy: boolean`

      Whether this monitor must be healthy for the pool to be considered healthy

    - `created_at: optional string`

      The timestamp of when the monitor was added to the group

    - `updated_at: optional string`

      The timestamp of when the monitor group member was last updated

  - `created_on: optional string`

    The timestamp of when the monitor group was created

  - `modified_on: optional string`

    The timestamp of when the monitor group was last updated

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitor_groups \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "description": "Primary datacenter monitors",
          "members": [
            {
              "enabled": true,
              "monitor_id": "monitor_id",
              "monitoring_only": false,
              "must_be_healthy": true
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
  "result": {
    "id": "id",
    "description": "Primary datacenter monitors",
    "members": [
      {
        "enabled": true,
        "monitor_id": "monitor_id",
        "monitoring_only": false,
        "must_be_healthy": true,
        "created_at": "2014-01-01T05:20:00.12345Z",
        "updated_at": "2014-01-01T05:20:00.12345Z"
      }
    ],
    "created_on": "2014-01-01T05:20:00.12345Z",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  },
  "success": true
}
```

## Update Monitor Group

**put** `/accounts/{account_id}/load_balancers/monitor_groups/{monitor_group_id}`

Modify a configured monitor group.

### Path Parameters

- `account_id: string`

  Identifier.

- `monitor_group_id: string`

### Body Parameters

- `description: string`

  A short description of the monitor group

- `members: array of object { enabled, monitor_id, monitoring_only, 3 more }`

  List of monitors in this group

  - `enabled: boolean`

    Whether this monitor is enabled in the group

  - `monitor_id: string`

    The ID of the Monitor to use for checking the health of origins within this pool.

  - `monitoring_only: boolean`

    Whether this monitor is used for monitoring only (does not affect pool health)

  - `must_be_healthy: boolean`

    Whether this monitor must be healthy for the pool to be considered healthy

  - `created_at: optional string`

    The timestamp of when the monitor was added to the group

  - `updated_at: optional string`

    The timestamp of when the monitor group member was last updated

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

- `result: MonitorGroup`

  - `id: string`

    The ID of the Monitor Group to use for checking the health of origins within this pool.

  - `description: string`

    A short description of the monitor group

  - `members: array of object { enabled, monitor_id, monitoring_only, 3 more }`

    List of monitors in this group

    - `enabled: boolean`

      Whether this monitor is enabled in the group

    - `monitor_id: string`

      The ID of the Monitor to use for checking the health of origins within this pool.

    - `monitoring_only: boolean`

      Whether this monitor is used for monitoring only (does not affect pool health)

    - `must_be_healthy: boolean`

      Whether this monitor must be healthy for the pool to be considered healthy

    - `created_at: optional string`

      The timestamp of when the monitor was added to the group

    - `updated_at: optional string`

      The timestamp of when the monitor group member was last updated

  - `created_on: optional string`

    The timestamp of when the monitor group was created

  - `modified_on: optional string`

    The timestamp of when the monitor group was last updated

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitor_groups/$MONITOR_GROUP_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "description": "Primary datacenter monitors",
          "members": [
            {
              "enabled": true,
              "monitor_id": "monitor_id",
              "monitoring_only": false,
              "must_be_healthy": true
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
  "result": {
    "id": "id",
    "description": "Primary datacenter monitors",
    "members": [
      {
        "enabled": true,
        "monitor_id": "monitor_id",
        "monitoring_only": false,
        "must_be_healthy": true,
        "created_at": "2014-01-01T05:20:00.12345Z",
        "updated_at": "2014-01-01T05:20:00.12345Z"
      }
    ],
    "created_on": "2014-01-01T05:20:00.12345Z",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  },
  "success": true
}
```

## Patch Monitor Group

**patch** `/accounts/{account_id}/load_balancers/monitor_groups/{monitor_group_id}`

Apply changes to an existing monitor group, overwriting the supplied properties.

### Path Parameters

- `account_id: string`

  Identifier.

- `monitor_group_id: string`

### Body Parameters

- `description: string`

  A short description of the monitor group

- `members: array of object { enabled, monitor_id, monitoring_only, 3 more }`

  List of monitors in this group

  - `enabled: boolean`

    Whether this monitor is enabled in the group

  - `monitor_id: string`

    The ID of the Monitor to use for checking the health of origins within this pool.

  - `monitoring_only: boolean`

    Whether this monitor is used for monitoring only (does not affect pool health)

  - `must_be_healthy: boolean`

    Whether this monitor must be healthy for the pool to be considered healthy

  - `created_at: optional string`

    The timestamp of when the monitor was added to the group

  - `updated_at: optional string`

    The timestamp of when the monitor group member was last updated

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

- `result: MonitorGroup`

  - `id: string`

    The ID of the Monitor Group to use for checking the health of origins within this pool.

  - `description: string`

    A short description of the monitor group

  - `members: array of object { enabled, monitor_id, monitoring_only, 3 more }`

    List of monitors in this group

    - `enabled: boolean`

      Whether this monitor is enabled in the group

    - `monitor_id: string`

      The ID of the Monitor to use for checking the health of origins within this pool.

    - `monitoring_only: boolean`

      Whether this monitor is used for monitoring only (does not affect pool health)

    - `must_be_healthy: boolean`

      Whether this monitor must be healthy for the pool to be considered healthy

    - `created_at: optional string`

      The timestamp of when the monitor was added to the group

    - `updated_at: optional string`

      The timestamp of when the monitor group member was last updated

  - `created_on: optional string`

    The timestamp of when the monitor group was created

  - `modified_on: optional string`

    The timestamp of when the monitor group was last updated

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitor_groups/$MONITOR_GROUP_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "description": "Primary datacenter monitors",
          "members": [
            {
              "enabled": true,
              "monitor_id": "monitor_id",
              "monitoring_only": false,
              "must_be_healthy": true
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
  "result": {
    "id": "id",
    "description": "Primary datacenter monitors",
    "members": [
      {
        "enabled": true,
        "monitor_id": "monitor_id",
        "monitoring_only": false,
        "must_be_healthy": true,
        "created_at": "2014-01-01T05:20:00.12345Z",
        "updated_at": "2014-01-01T05:20:00.12345Z"
      }
    ],
    "created_on": "2014-01-01T05:20:00.12345Z",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  },
  "success": true
}
```

## Delete Monitor Group

**delete** `/accounts/{account_id}/load_balancers/monitor_groups/{monitor_group_id}`

Delete a configured monitor group.

### Path Parameters

- `account_id: string`

  Identifier.

- `monitor_group_id: string`

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

- `result: MonitorGroup`

  - `id: string`

    The ID of the Monitor Group to use for checking the health of origins within this pool.

  - `description: string`

    A short description of the monitor group

  - `members: array of object { enabled, monitor_id, monitoring_only, 3 more }`

    List of monitors in this group

    - `enabled: boolean`

      Whether this monitor is enabled in the group

    - `monitor_id: string`

      The ID of the Monitor to use for checking the health of origins within this pool.

    - `monitoring_only: boolean`

      Whether this monitor is used for monitoring only (does not affect pool health)

    - `must_be_healthy: boolean`

      Whether this monitor must be healthy for the pool to be considered healthy

    - `created_at: optional string`

      The timestamp of when the monitor was added to the group

    - `updated_at: optional string`

      The timestamp of when the monitor group member was last updated

  - `created_on: optional string`

    The timestamp of when the monitor group was created

  - `modified_on: optional string`

    The timestamp of when the monitor group was last updated

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitor_groups/$MONITOR_GROUP_ID \
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
    "id": "id",
    "description": "Primary datacenter monitors",
    "members": [
      {
        "enabled": true,
        "monitor_id": "monitor_id",
        "monitoring_only": false,
        "must_be_healthy": true,
        "created_at": "2014-01-01T05:20:00.12345Z",
        "updated_at": "2014-01-01T05:20:00.12345Z"
      }
    ],
    "created_on": "2014-01-01T05:20:00.12345Z",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  },
  "success": true
}
```

## Domain Types

### Monitor Group

- `MonitorGroup object { id, description, members, 2 more }`

  - `id: string`

    The ID of the Monitor Group to use for checking the health of origins within this pool.

  - `description: string`

    A short description of the monitor group

  - `members: array of object { enabled, monitor_id, monitoring_only, 3 more }`

    List of monitors in this group

    - `enabled: boolean`

      Whether this monitor is enabled in the group

    - `monitor_id: string`

      The ID of the Monitor to use for checking the health of origins within this pool.

    - `monitoring_only: boolean`

      Whether this monitor is used for monitoring only (does not affect pool health)

    - `must_be_healthy: boolean`

      Whether this monitor must be healthy for the pool to be considered healthy

    - `created_at: optional string`

      The timestamp of when the monitor was added to the group

    - `updated_at: optional string`

      The timestamp of when the monitor group member was last updated

  - `created_on: optional string`

    The timestamp of when the monitor group was created

  - `modified_on: optional string`

    The timestamp of when the monitor group was last updated

# References

## List Monitor Group References

**get** `/accounts/{account_id}/load_balancers/monitor_groups/{monitor_group_id}/references`

Get the list of resources that reference the provided monitor group.

### Path Parameters

- `account_id: string`

  Identifier.

- `monitor_group_id: string`

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

  List of resources that reference a given monitor group.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitor_groups/$MONITOR_GROUP_ID/references \
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
      "resource_id": "17b5962d775c646f3f9725cbc7a53df4",
      "resource_name": "primary-dc-1",
      "resource_type": "pool"
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

# Previews

## Preview Result

**get** `/accounts/{account_id}/load_balancers/preview/{preview_id}`

Get the result of a previous preview operation using the provided preview_id.

### Path Parameters

- `account_id: string`

  Identifier.

- `preview_id: string`

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

- `result: map[object { healthy, origins } ]`

  Resulting health data from a preview operation.

  - `healthy: optional boolean`

  - `origins: optional array of map[object { failure_reason, healthy, response_code, rtt } ]`

    - `failure_reason: optional string`

    - `healthy: optional boolean`

    - `response_code: optional number`

    - `rtt: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/preview/$PREVIEW_ID \
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
    "abwlnp5jbqn45ecgxd03erbgtxtqai0d": {
      "healthy": true,
      "origins": [
        {
          "originone.example.com.": {
            "failure_reason": "No failures",
            "healthy": true,
            "response_code": 200,
            "rtt": "66ms"
          }
        }
      ]
    }
  },
  "success": true
}
```

## Domain Types

### Preview Get Response

- `PreviewGetResponse = map[object { healthy, origins } ]`

  Resulting health data from a preview operation.

  - `healthy: optional boolean`

  - `origins: optional array of map[object { failure_reason, healthy, response_code, rtt } ]`

    - `failure_reason: optional string`

    - `healthy: optional boolean`

    - `response_code: optional number`

    - `rtt: optional string`

# Regions

## List Regions

**get** `/accounts/{account_id}/load_balancers/regions`

List all region mappings.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `country_code_a2: optional string`

  Two-letter alpha-2 country code followed in ISO 3166-1.

- `subdivision_code: optional string`

  Two-letter subdivision code followed in ISO 3166-2.

- `subdivision_code_a2: optional string`

  Two-letter subdivision code followed in ISO 3166-2.

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

- `result: unknown or string`

  - `unknown`

  - `string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/regions \
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
  "result": {},
  "success": true
}
```

## Get Region

**get** `/accounts/{account_id}/load_balancers/regions/{region_id}`

Get a single region mapping.

### Path Parameters

- `account_id: string`

  Identifier.

- `region_id: "WNAM" or "ENAM" or "WEU" or 10 more`

  A list of Cloudflare regions. WNAM: Western North America, ENAM: Eastern North America, WEU: Western Europe, EEU: Eastern Europe, NSAM: Northern South America, SSAM: Southern South America, OC: Oceania, ME: Middle East, NAF: North Africa, SAF: South Africa, SAS: Southern Asia, SEAS: South East Asia, NEAS: North East Asia).

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

- `result: unknown or string`

  A list of countries and subdivisions mapped to a region.

  - `unknown`

  - `string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/regions/$REGION_ID \
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
    "iso_standard": "Country and subdivision codes follow ISO 3166-1 alpha-2 and ISO 3166-2",
    "regions": [
      {
        "countries": [
          {
            "country_code_a2": "CA",
            "country_name": "Canada",
            "country_subdivisions": [
              {
                "subdivision_code_a2": "AB",
                "subdivision_name": "Alberta"
              },
              {
                "subdivision_code_a2": "BC",
                "subdivision_name": "British Columbia"
              }
            ]
          },
          {
            "country_code_a2": "HT",
            "country_name": "Haiti"
          },
          {
            "country_code_a2": "MX",
            "country_name": "Mexico"
          },
          {
            "country_code_a2": "US",
            "country_name": "United States",
            "country_subdivisions": [
              {
                "subdivision_code_a2": "AZ",
                "subdivision_name": "Arizona"
              },
              {
                "subdivision_code_a2": "CA",
                "subdivision_name": "California"
              },
              {
                "subdivision_code_a2": "CO",
                "subdivision_name": "Colorado"
              },
              {
                "subdivision_code_a2": "HI",
                "subdivision_name": "Hawaii"
              },
              {
                "subdivision_code_a2": "MN",
                "subdivision_name": "Minnesota"
              },
              {
                "subdivision_code_a2": "MO",
                "subdivision_name": "Missouri"
              },
              {
                "subdivision_code_a2": "NV",
                "subdivision_name": "Nevada"
              },
              {
                "subdivision_code_a2": "OR",
                "subdivision_name": "Oregon"
              },
              {
                "subdivision_code_a2": "TX",
                "subdivision_name": "Texas"
              },
              {
                "subdivision_code_a2": "UT",
                "subdivision_name": "Utah"
              },
              {
                "subdivision_code_a2": "WA",
                "subdivision_name": "Washington"
              }
            ]
          }
        ],
        "region_code": "WNAM"
      }
    ]
  },
  "success": true
}
```

## Domain Types

### Region List Response

- `RegionListResponse = unknown or string`

  - `unknown`

  - `string`

### Region Get Response

- `RegionGetResponse = unknown or string`

  A list of countries and subdivisions mapped to a region.

  - `unknown`

  - `string`

# Searches

## Search Resources

**get** `/accounts/{account_id}/load_balancers/search`

Search for Load Balancing resources.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `page: optional number`

- `per_page: optional number`

- `query: optional string`

  Search query term.

- `references: optional "" or "*" or "referral" or "referrer"`

  The type of references to include. "*" to include both referral and referrer references. "" to not include any reference information.

  - `""`

  - `"*"`

  - `"referral"`

  - `"referrer"`

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

- `result: object { resources }`

  - `resources: optional array of object { reference_type, references, resource_id, 2 more }`

    A list of resources matching the search query.

    - `reference_type: optional "referral" or "referrer"`

      When listed as a reference, the type (direction) of the reference.

      - `"referral"`

      - `"referrer"`

    - `references: optional array of unknown`

      A list of references to (referrer) or from (referral) this resource.

    - `resource_id: optional string`

    - `resource_name: optional string`

      The human-identifiable name of the resource.

    - `resource_type: optional "load_balancer" or "monitor" or "pool"`

      The type of the resource.

      - `"load_balancer"`

      - `"monitor"`

      - `"pool"`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/search \
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
    "resources": [
      {
        "reference_type": "referral",
        "references": [
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
        "resource_id": "17b5962d775c646f3f9725cbc7a53df4",
        "resource_name": "primary-dc-1",
        "resource_type": "pool"
      }
    ]
  },
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

### Search List Response

- `SearchListResponse object { resources }`

  - `resources: optional array of object { reference_type, references, resource_id, 2 more }`

    A list of resources matching the search query.

    - `reference_type: optional "referral" or "referrer"`

      When listed as a reference, the type (direction) of the reference.

      - `"referral"`

      - `"referrer"`

    - `references: optional array of unknown`

      A list of references to (referrer) or from (referral) this resource.

    - `resource_id: optional string`

    - `resource_name: optional string`

      The human-identifiable name of the resource.

    - `resource_type: optional "load_balancer" or "monitor" or "pool"`

      The type of the resource.

      - `"load_balancer"`

      - `"monitor"`

      - `"pool"`
