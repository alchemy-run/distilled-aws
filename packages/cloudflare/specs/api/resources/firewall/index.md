# Firewall

# Lockdowns

## List Zone Lockdown rules

**get** `/zones/{zone_id}/firewall/lockdowns`

Fetches Zone Lockdown rules. You can filter the results using several optional parameters.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

### Query Parameters

- `created_on: optional string`

  The timestamp of when the rule was created.

- `description: optional string`

  A string to search for in the description of existing rules.

- `description_search: optional string`

  A string to search for in the description of existing rules.

- `ip: optional string`

  A single IP address to search for in existing rules.

- `ip_range_search: optional string`

  A single IP address range to search for in existing rules.

- `ip_search: optional string`

  A single IP address to search for in existing rules.

- `modified_on: optional string`

  The timestamp of when the rule was last modified.

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  The maximum number of results per page. You can only set the value to `1` or to a multiple of 5 such as `5`, `10`, `15`, or `20`.

- `priority: optional number`

  The priority of the rule to control the processing order. A lower number indicates higher priority. If not provided, any rules with a configured priority will be processed before rules without a priority.

- `uri_search: optional string`

  A single URI to search for in the list of URLs of existing rules.

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

- `result: array of Lockdown`

  - `id: string`

    The unique identifier of the Zone Lockdown rule.

  - `configurations: Configuration`

    A list of IP addresses or CIDR ranges that will be allowed to access the URLs specified in the Zone Lockdown rule. You can include any number of `ip` or `ip_range` configurations.

    - `LockdownIPConfiguration object { target, value }`

      - `target: optional "ip"`

        The configuration target. You must set the target to `ip` when specifying an IP address in the Zone Lockdown rule.

        - `"ip"`

      - `value: optional string`

        The IP address to match. This address will be compared to the IP address of incoming requests.

    - `LockdownCIDRConfiguration object { target, value }`

      - `target: optional "ip_range"`

        The configuration target. You must set the target to `ip_range` when specifying an IP address range in the Zone Lockdown rule.

        - `"ip_range"`

      - `value: optional string`

        The IP address range to match. You can only use prefix lengths `/16` and `/24`.

  - `created_on: string`

    The timestamp of when the rule was created.

  - `description: string`

    An informative summary of the rule.

  - `modified_on: string`

    The timestamp of when the rule was last modified.

  - `paused: boolean`

    When true, indicates that the rule is currently paused.

  - `urls: array of LockdownURL`

    The URLs to include in the rule definition. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.

- `success: true`

  Defines whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Defines the total number of results for the requested service.

  - `page: optional number`

    Defines the current page within paginated list of results.

  - `per_page: optional number`

    Defines the number of results per page of results.

  - `total_count: optional number`

    Defines the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/lockdowns \
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
      "id": "372e67954025e0ba6aaa6d586b9e0b59",
      "configurations": [
        {
          "target": "ip",
          "value": "198.51.100.4"
        }
      ],
      "created_on": "2014-01-01T05:20:00.12345Z",
      "description": "Restrict access to these endpoints to requests from a known IP address",
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "paused": false,
      "urls": [
        "api.mysite.com/some/endpoint*"
      ]
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get a Zone Lockdown rule

**get** `/zones/{zone_id}/firewall/lockdowns/{lock_downs_id}`

Fetches the details of a Zone Lockdown rule.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

- `lock_downs_id: string`

  The unique identifier of the Zone Lockdown rule.

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

- `result: Lockdown`

  - `id: string`

    The unique identifier of the Zone Lockdown rule.

  - `configurations: Configuration`

    A list of IP addresses or CIDR ranges that will be allowed to access the URLs specified in the Zone Lockdown rule. You can include any number of `ip` or `ip_range` configurations.

    - `LockdownIPConfiguration object { target, value }`

      - `target: optional "ip"`

        The configuration target. You must set the target to `ip` when specifying an IP address in the Zone Lockdown rule.

        - `"ip"`

      - `value: optional string`

        The IP address to match. This address will be compared to the IP address of incoming requests.

    - `LockdownCIDRConfiguration object { target, value }`

      - `target: optional "ip_range"`

        The configuration target. You must set the target to `ip_range` when specifying an IP address range in the Zone Lockdown rule.

        - `"ip_range"`

      - `value: optional string`

        The IP address range to match. You can only use prefix lengths `/16` and `/24`.

  - `created_on: string`

    The timestamp of when the rule was created.

  - `description: string`

    An informative summary of the rule.

  - `modified_on: string`

    The timestamp of when the rule was last modified.

  - `paused: boolean`

    When true, indicates that the rule is currently paused.

  - `urls: array of LockdownURL`

    The URLs to include in the rule definition. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/lockdowns/$LOCK_DOWNS_ID \
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
    "id": "372e67954025e0ba6aaa6d586b9e0b59",
    "configurations": [
      {
        "target": "ip",
        "value": "198.51.100.4"
      }
    ],
    "created_on": "2014-01-01T05:20:00.12345Z",
    "description": "Restrict access to these endpoints to requests from a known IP address",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "paused": false,
    "urls": [
      "api.mysite.com/some/endpoint*"
    ]
  },
  "success": true
}
```

## Create a Zone Lockdown rule

**post** `/zones/{zone_id}/firewall/lockdowns`

Creates a new Zone Lockdown rule.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

### Body Parameters

- `configurations: Configuration`

  A list of IP addresses or CIDR ranges that will be allowed to access the URLs specified in the Zone Lockdown rule. You can include any number of `ip` or `ip_range` configurations.

  - `LockdownIPConfiguration object { target, value }`

    - `target: optional "ip"`

      The configuration target. You must set the target to `ip` when specifying an IP address in the Zone Lockdown rule.

      - `"ip"`

    - `value: optional string`

      The IP address to match. This address will be compared to the IP address of incoming requests.

  - `LockdownCIDRConfiguration object { target, value }`

    - `target: optional "ip_range"`

      The configuration target. You must set the target to `ip_range` when specifying an IP address range in the Zone Lockdown rule.

      - `"ip_range"`

    - `value: optional string`

      The IP address range to match. You can only use prefix lengths `/16` and `/24`.

- `urls: array of OverrideURL`

  The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.

- `description: optional string`

  An informative summary of the rule. This value is sanitized and any tags will be removed.

- `paused: optional boolean`

  When true, indicates that the rule is currently paused.

- `priority: optional number`

  The priority of the rule to control the processing order. A lower number indicates higher priority. If not provided, any rules with a configured priority will be processed before rules without a priority.

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

- `result: Lockdown`

  - `id: string`

    The unique identifier of the Zone Lockdown rule.

  - `configurations: Configuration`

    A list of IP addresses or CIDR ranges that will be allowed to access the URLs specified in the Zone Lockdown rule. You can include any number of `ip` or `ip_range` configurations.

    - `LockdownIPConfiguration object { target, value }`

      - `target: optional "ip"`

        The configuration target. You must set the target to `ip` when specifying an IP address in the Zone Lockdown rule.

        - `"ip"`

      - `value: optional string`

        The IP address to match. This address will be compared to the IP address of incoming requests.

    - `LockdownCIDRConfiguration object { target, value }`

      - `target: optional "ip_range"`

        The configuration target. You must set the target to `ip_range` when specifying an IP address range in the Zone Lockdown rule.

        - `"ip_range"`

      - `value: optional string`

        The IP address range to match. You can only use prefix lengths `/16` and `/24`.

  - `created_on: string`

    The timestamp of when the rule was created.

  - `description: string`

    An informative summary of the rule.

  - `modified_on: string`

    The timestamp of when the rule was last modified.

  - `paused: boolean`

    When true, indicates that the rule is currently paused.

  - `urls: array of LockdownURL`

    The URLs to include in the rule definition. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/lockdowns \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "configurations": [
            {}
          ],
          "urls": [
            "shop.example.com/*"
          ],
          "description": "Prevent multiple login failures to mitigate brute force attacks",
          "priority": 5
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
    "id": "372e67954025e0ba6aaa6d586b9e0b59",
    "configurations": [
      {
        "target": "ip",
        "value": "198.51.100.4"
      }
    ],
    "created_on": "2014-01-01T05:20:00.12345Z",
    "description": "Restrict access to these endpoints to requests from a known IP address",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "paused": false,
    "urls": [
      "api.mysite.com/some/endpoint*"
    ]
  },
  "success": true
}
```

## Update a Zone Lockdown rule

**put** `/zones/{zone_id}/firewall/lockdowns/{lock_downs_id}`

Updates an existing Zone Lockdown rule.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

- `lock_downs_id: string`

  The unique identifier of the Zone Lockdown rule.

### Body Parameters

- `configurations: Configuration`

  A list of IP addresses or CIDR ranges that will be allowed to access the URLs specified in the Zone Lockdown rule. You can include any number of `ip` or `ip_range` configurations.

  - `LockdownIPConfiguration object { target, value }`

    - `target: optional "ip"`

      The configuration target. You must set the target to `ip` when specifying an IP address in the Zone Lockdown rule.

      - `"ip"`

    - `value: optional string`

      The IP address to match. This address will be compared to the IP address of incoming requests.

  - `LockdownCIDRConfiguration object { target, value }`

    - `target: optional "ip_range"`

      The configuration target. You must set the target to `ip_range` when specifying an IP address range in the Zone Lockdown rule.

      - `"ip_range"`

    - `value: optional string`

      The IP address range to match. You can only use prefix lengths `/16` and `/24`.

- `urls: array of OverrideURL`

  The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.

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

- `result: Lockdown`

  - `id: string`

    The unique identifier of the Zone Lockdown rule.

  - `configurations: Configuration`

    A list of IP addresses or CIDR ranges that will be allowed to access the URLs specified in the Zone Lockdown rule. You can include any number of `ip` or `ip_range` configurations.

    - `LockdownIPConfiguration object { target, value }`

      - `target: optional "ip"`

        The configuration target. You must set the target to `ip` when specifying an IP address in the Zone Lockdown rule.

        - `"ip"`

      - `value: optional string`

        The IP address to match. This address will be compared to the IP address of incoming requests.

    - `LockdownCIDRConfiguration object { target, value }`

      - `target: optional "ip_range"`

        The configuration target. You must set the target to `ip_range` when specifying an IP address range in the Zone Lockdown rule.

        - `"ip_range"`

      - `value: optional string`

        The IP address range to match. You can only use prefix lengths `/16` and `/24`.

  - `created_on: string`

    The timestamp of when the rule was created.

  - `description: string`

    An informative summary of the rule.

  - `modified_on: string`

    The timestamp of when the rule was last modified.

  - `paused: boolean`

    When true, indicates that the rule is currently paused.

  - `urls: array of LockdownURL`

    The URLs to include in the rule definition. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/lockdowns/$LOCK_DOWNS_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "configurations": [
            {}
          ],
          "urls": [
            "shop.example.com/*"
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
    "id": "372e67954025e0ba6aaa6d586b9e0b59",
    "configurations": [
      {
        "target": "ip",
        "value": "198.51.100.4"
      }
    ],
    "created_on": "2014-01-01T05:20:00.12345Z",
    "description": "Restrict access to these endpoints to requests from a known IP address",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "paused": false,
    "urls": [
      "api.mysite.com/some/endpoint*"
    ]
  },
  "success": true
}
```

## Delete a Zone Lockdown rule

**delete** `/zones/{zone_id}/firewall/lockdowns/{lock_downs_id}`

Deletes an existing Zone Lockdown rule.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

- `lock_downs_id: string`

  The unique identifier of the Zone Lockdown rule.

### Returns

- `result: optional object { id }`

  - `id: optional string`

    The unique identifier of the Zone Lockdown rule.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/lockdowns/$LOCK_DOWNS_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "372e67954025e0ba6aaa6d586b9e0b59"
  }
}
```

## Domain Types

### Configuration

- `Configuration = array of LockdownIPConfiguration or LockdownCIDRConfiguration`

  A list of IP addresses or CIDR ranges that will be allowed to access the URLs specified in the Zone Lockdown rule. You can include any number of `ip` or `ip_range` configurations.

  - `LockdownIPConfiguration object { target, value }`

    - `target: optional "ip"`

      The configuration target. You must set the target to `ip` when specifying an IP address in the Zone Lockdown rule.

      - `"ip"`

    - `value: optional string`

      The IP address to match. This address will be compared to the IP address of incoming requests.

  - `LockdownCIDRConfiguration object { target, value }`

    - `target: optional "ip_range"`

      The configuration target. You must set the target to `ip_range` when specifying an IP address range in the Zone Lockdown rule.

      - `"ip_range"`

    - `value: optional string`

      The IP address range to match. You can only use prefix lengths `/16` and `/24`.

### Lockdown

- `Lockdown object { id, configurations, created_on, 4 more }`

  - `id: string`

    The unique identifier of the Zone Lockdown rule.

  - `configurations: Configuration`

    A list of IP addresses or CIDR ranges that will be allowed to access the URLs specified in the Zone Lockdown rule. You can include any number of `ip` or `ip_range` configurations.

    - `LockdownIPConfiguration object { target, value }`

      - `target: optional "ip"`

        The configuration target. You must set the target to `ip` when specifying an IP address in the Zone Lockdown rule.

        - `"ip"`

      - `value: optional string`

        The IP address to match. This address will be compared to the IP address of incoming requests.

    - `LockdownCIDRConfiguration object { target, value }`

      - `target: optional "ip_range"`

        The configuration target. You must set the target to `ip_range` when specifying an IP address range in the Zone Lockdown rule.

        - `"ip_range"`

      - `value: optional string`

        The IP address range to match. You can only use prefix lengths `/16` and `/24`.

  - `created_on: string`

    The timestamp of when the rule was created.

  - `description: string`

    An informative summary of the rule.

  - `modified_on: string`

    The timestamp of when the rule was last modified.

  - `paused: boolean`

    When true, indicates that the rule is currently paused.

  - `urls: array of LockdownURL`

    The URLs to include in the rule definition. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.

### Lockdown CIDR Configuration

- `LockdownCIDRConfiguration object { target, value }`

  - `target: optional "ip_range"`

    The configuration target. You must set the target to `ip_range` when specifying an IP address range in the Zone Lockdown rule.

    - `"ip_range"`

  - `value: optional string`

    The IP address range to match. You can only use prefix lengths `/16` and `/24`.

### Lockdown IP Configuration

- `LockdownIPConfiguration object { target, value }`

  - `target: optional "ip"`

    The configuration target. You must set the target to `ip` when specifying an IP address in the Zone Lockdown rule.

    - `"ip"`

  - `value: optional string`

    The IP address to match. This address will be compared to the IP address of incoming requests.

### Lockdown URL

- `LockdownURL = string`

### Lockdown Delete Response

- `LockdownDeleteResponse object { id }`

  - `id: optional string`

    The unique identifier of the Zone Lockdown rule.

# Rules

## List firewall rules

**get** `/zones/{zone_id}/firewall/rules`

Fetches firewall rules in a zone. You can filter the results using several optional parameters.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

### Query Parameters

- `id: optional string`

  The unique identifier of the firewall rule.

- `action: optional string`

  The action to search for. Must be an exact match.

- `description: optional string`

  A case-insensitive string to find in the description.

- `page: optional number`

  Page number of paginated results.

- `paused: optional boolean`

  When true, indicates that the firewall rule is currently paused.

- `per_page: optional number`

  Number of firewall rules per page.

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

- `result: array of FirewallRule`

  - `id: optional string`

    The unique identifier of the firewall rule.

  - `action: optional Action`

    The action to apply to a matched request. The `log` action is only available on an Enterprise plan.

    - `"block"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

    - `"allow"`

    - `"log"`

    - `"bypass"`

  - `description: optional string`

    An informative summary of the firewall rule.

  - `filter: optional FirewallFilter or DeletedFilter`

    - `FirewallFilter object { id, description, expression, 2 more }`

      - `id: optional string`

        The unique identifier of the filter.

      - `description: optional string`

        An informative summary of the filter.

      - `expression: optional string`

        The filter expression. For more information, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/).

      - `paused: optional boolean`

        When true, indicates that the filter is currently paused.

      - `ref: optional string`

        A short reference tag. Allows you to select related filters.

    - `DeletedFilter object { id, deleted }`

      - `id: string`

        The unique identifier of the filter.

      - `deleted: boolean`

        When true, indicates that the firewall rule was deleted.

  - `paused: optional boolean`

    When true, indicates that the firewall rule is currently paused.

  - `priority: optional number`

    The priority of the rule. Optional value used to define the processing order. A lower number indicates a higher priority. If not provided, rules with a defined priority will be processed before rules without a priority.

  - `products: optional array of Product`

    - `"zoneLockdown"`

    - `"uaBlock"`

    - `"bic"`

    - `"hot"`

    - `"securityLevel"`

    - `"rateLimit"`

    - `"waf"`

  - `ref: optional string`

    A short reference tag. Allows you to select related firewall rules.

- `success: true`

  Defines whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Defines the total number of results for the requested service.

  - `page: optional number`

    Defines the current page within paginated list of results.

  - `per_page: optional number`

    Defines the number of results per page of results.

  - `total_count: optional number`

    Defines the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/rules \
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
      "id": "372e67954025e0ba6aaa6d586b9e0b60",
      "action": "block",
      "description": "Blocks traffic identified during investigation for MIR-31",
      "filter": {
        "id": "372e67954025e0ba6aaa6d586b9e0b61",
        "description": "Restrict access from these browsers on this address range.",
        "expression": "(http.request.uri.path ~ \".*wp-login.php\" or http.request.uri.path ~ \".*xmlrpc.php\") and ip.addr ne 172.16.22.155",
        "paused": false,
        "ref": "FIL-100"
      },
      "paused": false,
      "priority": 50,
      "products": [
        "waf"
      ],
      "ref": "MIR-31"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get a firewall rule

**get** `/zones/{zone_id}/firewall/rules/{rule_id}`

Fetches the details of a firewall rule.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

- `rule_id: string`

  The unique identifier of the firewall rule.

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

- `result: FirewallRule`

  - `id: optional string`

    The unique identifier of the firewall rule.

  - `action: optional Action`

    The action to apply to a matched request. The `log` action is only available on an Enterprise plan.

    - `"block"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

    - `"allow"`

    - `"log"`

    - `"bypass"`

  - `description: optional string`

    An informative summary of the firewall rule.

  - `filter: optional FirewallFilter or DeletedFilter`

    - `FirewallFilter object { id, description, expression, 2 more }`

      - `id: optional string`

        The unique identifier of the filter.

      - `description: optional string`

        An informative summary of the filter.

      - `expression: optional string`

        The filter expression. For more information, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/).

      - `paused: optional boolean`

        When true, indicates that the filter is currently paused.

      - `ref: optional string`

        A short reference tag. Allows you to select related filters.

    - `DeletedFilter object { id, deleted }`

      - `id: string`

        The unique identifier of the filter.

      - `deleted: boolean`

        When true, indicates that the firewall rule was deleted.

  - `paused: optional boolean`

    When true, indicates that the firewall rule is currently paused.

  - `priority: optional number`

    The priority of the rule. Optional value used to define the processing order. A lower number indicates a higher priority. If not provided, rules with a defined priority will be processed before rules without a priority.

  - `products: optional array of Product`

    - `"zoneLockdown"`

    - `"uaBlock"`

    - `"bic"`

    - `"hot"`

    - `"securityLevel"`

    - `"rateLimit"`

    - `"waf"`

  - `ref: optional string`

    A short reference tag. Allows you to select related firewall rules.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/rules/$RULE_ID \
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
    "id": "372e67954025e0ba6aaa6d586b9e0b60",
    "action": "block",
    "description": "Blocks traffic identified during investigation for MIR-31",
    "filter": {
      "id": "372e67954025e0ba6aaa6d586b9e0b61",
      "description": "Restrict access from these browsers on this address range.",
      "expression": "(http.request.uri.path ~ \".*wp-login.php\" or http.request.uri.path ~ \".*xmlrpc.php\") and ip.addr ne 172.16.22.155",
      "paused": false,
      "ref": "FIL-100"
    },
    "paused": false,
    "priority": 50,
    "products": [
      "waf"
    ],
    "ref": "MIR-31"
  },
  "success": true
}
```

## Create firewall rules

**post** `/zones/{zone_id}/firewall/rules`

Create one or more firewall rules.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

### Body Parameters

- `action: object { mode, response, timeout }`

  The action to perform when the threshold of matched traffic within the configured period is exceeded.

  - `mode: optional "simulate" or "ban" or "challenge" or 2 more`

    The action to perform.

    - `"simulate"`

    - `"ban"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `response: optional object { body, content_type }`

    A custom content type and reponse to return when the threshold is exceeded. The custom response configured in this object will override the custom error for the zone. This object is optional.
    Notes: If you omit this object, Cloudflare will use the default HTML error page. If "mode" is "challenge", "managed_challenge", or "js_challenge", Cloudflare will use the zone challenge pages and you should not provide the "response" object.

    - `body: optional string`

      The response body to return. The value must conform to the configured content type.

    - `content_type: optional string`

      The content type of the body. Must be one of the following: `text/plain`, `text/xml`, or `application/json`.

  - `timeout: optional number`

    The time in seconds during which Cloudflare will perform the mitigation action. Must be an integer value greater than or equal to the period.
    Notes: If "mode" is "challenge", "managed_challenge", or "js_challenge", Cloudflare will use the zone's Challenge Passage time and you should not provide this value.

- `filter: FirewallFilter`

  - `id: optional string`

    The unique identifier of the filter.

  - `description: optional string`

    An informative summary of the filter.

  - `expression: optional string`

    The filter expression. For more information, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/).

  - `paused: optional boolean`

    When true, indicates that the filter is currently paused.

  - `ref: optional string`

    A short reference tag. Allows you to select related filters.

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

- `result: array of FirewallRule`

  - `id: optional string`

    The unique identifier of the firewall rule.

  - `action: optional Action`

    The action to apply to a matched request. The `log` action is only available on an Enterprise plan.

    - `"block"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

    - `"allow"`

    - `"log"`

    - `"bypass"`

  - `description: optional string`

    An informative summary of the firewall rule.

  - `filter: optional FirewallFilter or DeletedFilter`

    - `FirewallFilter object { id, description, expression, 2 more }`

      - `id: optional string`

        The unique identifier of the filter.

      - `description: optional string`

        An informative summary of the filter.

      - `expression: optional string`

        The filter expression. For more information, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/).

      - `paused: optional boolean`

        When true, indicates that the filter is currently paused.

      - `ref: optional string`

        A short reference tag. Allows you to select related filters.

    - `DeletedFilter object { id, deleted }`

      - `id: string`

        The unique identifier of the filter.

      - `deleted: boolean`

        When true, indicates that the firewall rule was deleted.

  - `paused: optional boolean`

    When true, indicates that the firewall rule is currently paused.

  - `priority: optional number`

    The priority of the rule. Optional value used to define the processing order. A lower number indicates a higher priority. If not provided, rules with a defined priority will be processed before rules without a priority.

  - `products: optional array of Product`

    - `"zoneLockdown"`

    - `"uaBlock"`

    - `"bic"`

    - `"hot"`

    - `"securityLevel"`

    - `"rateLimit"`

    - `"waf"`

  - `ref: optional string`

    A short reference tag. Allows you to select related firewall rules.

- `success: true`

  Defines whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Defines the total number of results for the requested service.

  - `page: optional number`

    Defines the current page within paginated list of results.

  - `per_page: optional number`

    Defines the number of results per page of results.

  - `total_count: optional number`

    Defines the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/rules \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": {},
          "filter": {}
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
  "result": [
    {
      "id": "372e67954025e0ba6aaa6d586b9e0b60",
      "action": "block",
      "description": "Blocks traffic identified during investigation for MIR-31",
      "filter": {
        "id": "372e67954025e0ba6aaa6d586b9e0b61",
        "description": "Restrict access from these browsers on this address range.",
        "expression": "(http.request.uri.path ~ \".*wp-login.php\" or http.request.uri.path ~ \".*xmlrpc.php\") and ip.addr ne 172.16.22.155",
        "paused": false,
        "ref": "FIL-100"
      },
      "paused": false,
      "priority": 50,
      "products": [
        "waf"
      ],
      "ref": "MIR-31"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Update a firewall rule

**put** `/zones/{zone_id}/firewall/rules/{rule_id}`

Updates an existing firewall rule.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

- `rule_id: string`

  The unique identifier of the firewall rule.

### Body Parameters

- `action: object { mode, response, timeout }`

  The action to perform when the threshold of matched traffic within the configured period is exceeded.

  - `mode: optional "simulate" or "ban" or "challenge" or 2 more`

    The action to perform.

    - `"simulate"`

    - `"ban"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `response: optional object { body, content_type }`

    A custom content type and reponse to return when the threshold is exceeded. The custom response configured in this object will override the custom error for the zone. This object is optional.
    Notes: If you omit this object, Cloudflare will use the default HTML error page. If "mode" is "challenge", "managed_challenge", or "js_challenge", Cloudflare will use the zone challenge pages and you should not provide the "response" object.

    - `body: optional string`

      The response body to return. The value must conform to the configured content type.

    - `content_type: optional string`

      The content type of the body. Must be one of the following: `text/plain`, `text/xml`, or `application/json`.

  - `timeout: optional number`

    The time in seconds during which Cloudflare will perform the mitigation action. Must be an integer value greater than or equal to the period.
    Notes: If "mode" is "challenge", "managed_challenge", or "js_challenge", Cloudflare will use the zone's Challenge Passage time and you should not provide this value.

- `filter: FirewallFilter`

  - `id: optional string`

    The unique identifier of the filter.

  - `description: optional string`

    An informative summary of the filter.

  - `expression: optional string`

    The filter expression. For more information, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/).

  - `paused: optional boolean`

    When true, indicates that the filter is currently paused.

  - `ref: optional string`

    A short reference tag. Allows you to select related filters.

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

- `result: FirewallRule`

  - `id: optional string`

    The unique identifier of the firewall rule.

  - `action: optional Action`

    The action to apply to a matched request. The `log` action is only available on an Enterprise plan.

    - `"block"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

    - `"allow"`

    - `"log"`

    - `"bypass"`

  - `description: optional string`

    An informative summary of the firewall rule.

  - `filter: optional FirewallFilter or DeletedFilter`

    - `FirewallFilter object { id, description, expression, 2 more }`

      - `id: optional string`

        The unique identifier of the filter.

      - `description: optional string`

        An informative summary of the filter.

      - `expression: optional string`

        The filter expression. For more information, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/).

      - `paused: optional boolean`

        When true, indicates that the filter is currently paused.

      - `ref: optional string`

        A short reference tag. Allows you to select related filters.

    - `DeletedFilter object { id, deleted }`

      - `id: string`

        The unique identifier of the filter.

      - `deleted: boolean`

        When true, indicates that the firewall rule was deleted.

  - `paused: optional boolean`

    When true, indicates that the firewall rule is currently paused.

  - `priority: optional number`

    The priority of the rule. Optional value used to define the processing order. A lower number indicates a higher priority. If not provided, rules with a defined priority will be processed before rules without a priority.

  - `products: optional array of Product`

    - `"zoneLockdown"`

    - `"uaBlock"`

    - `"bic"`

    - `"hot"`

    - `"securityLevel"`

    - `"rateLimit"`

    - `"waf"`

  - `ref: optional string`

    A short reference tag. Allows you to select related firewall rules.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/rules/$RULE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": {},
          "filter": {}
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
    "id": "372e67954025e0ba6aaa6d586b9e0b60",
    "action": "block",
    "description": "Blocks traffic identified during investigation for MIR-31",
    "filter": {
      "id": "372e67954025e0ba6aaa6d586b9e0b61",
      "description": "Restrict access from these browsers on this address range.",
      "expression": "(http.request.uri.path ~ \".*wp-login.php\" or http.request.uri.path ~ \".*xmlrpc.php\") and ip.addr ne 172.16.22.155",
      "paused": false,
      "ref": "FIL-100"
    },
    "paused": false,
    "priority": 50,
    "products": [
      "waf"
    ],
    "ref": "MIR-31"
  },
  "success": true
}
```

## Update priority of a firewall rule

**patch** `/zones/{zone_id}/firewall/rules/{rule_id}`

Updates the priority of an existing firewall rule.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

- `rule_id: string`

  The unique identifier of the firewall rule.

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

- `result: array of FirewallRule`

  - `id: optional string`

    The unique identifier of the firewall rule.

  - `action: optional Action`

    The action to apply to a matched request. The `log` action is only available on an Enterprise plan.

    - `"block"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

    - `"allow"`

    - `"log"`

    - `"bypass"`

  - `description: optional string`

    An informative summary of the firewall rule.

  - `filter: optional FirewallFilter or DeletedFilter`

    - `FirewallFilter object { id, description, expression, 2 more }`

      - `id: optional string`

        The unique identifier of the filter.

      - `description: optional string`

        An informative summary of the filter.

      - `expression: optional string`

        The filter expression. For more information, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/).

      - `paused: optional boolean`

        When true, indicates that the filter is currently paused.

      - `ref: optional string`

        A short reference tag. Allows you to select related filters.

    - `DeletedFilter object { id, deleted }`

      - `id: string`

        The unique identifier of the filter.

      - `deleted: boolean`

        When true, indicates that the firewall rule was deleted.

  - `paused: optional boolean`

    When true, indicates that the firewall rule is currently paused.

  - `priority: optional number`

    The priority of the rule. Optional value used to define the processing order. A lower number indicates a higher priority. If not provided, rules with a defined priority will be processed before rules without a priority.

  - `products: optional array of Product`

    - `"zoneLockdown"`

    - `"uaBlock"`

    - `"bic"`

    - `"hot"`

    - `"securityLevel"`

    - `"rateLimit"`

    - `"waf"`

  - `ref: optional string`

    A short reference tag. Allows you to select related firewall rules.

- `success: true`

  Defines whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Defines the total number of results for the requested service.

  - `page: optional number`

    Defines the current page within paginated list of results.

  - `per_page: optional number`

    Defines the number of results per page of results.

  - `total_count: optional number`

    Defines the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/rules/$RULE_ID \
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
      "id": "372e67954025e0ba6aaa6d586b9e0b60",
      "action": "block",
      "description": "Blocks traffic identified during investigation for MIR-31",
      "filter": {
        "id": "372e67954025e0ba6aaa6d586b9e0b61",
        "description": "Restrict access from these browsers on this address range.",
        "expression": "(http.request.uri.path ~ \".*wp-login.php\" or http.request.uri.path ~ \".*xmlrpc.php\") and ip.addr ne 172.16.22.155",
        "paused": false,
        "ref": "FIL-100"
      },
      "paused": false,
      "priority": 50,
      "products": [
        "waf"
      ],
      "ref": "MIR-31"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Delete a firewall rule

**delete** `/zones/{zone_id}/firewall/rules/{rule_id}`

Deletes an existing firewall rule.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

- `rule_id: string`

  The unique identifier of the firewall rule.

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

- `result: FirewallRule`

  - `id: optional string`

    The unique identifier of the firewall rule.

  - `action: optional Action`

    The action to apply to a matched request. The `log` action is only available on an Enterprise plan.

    - `"block"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

    - `"allow"`

    - `"log"`

    - `"bypass"`

  - `description: optional string`

    An informative summary of the firewall rule.

  - `filter: optional FirewallFilter or DeletedFilter`

    - `FirewallFilter object { id, description, expression, 2 more }`

      - `id: optional string`

        The unique identifier of the filter.

      - `description: optional string`

        An informative summary of the filter.

      - `expression: optional string`

        The filter expression. For more information, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/).

      - `paused: optional boolean`

        When true, indicates that the filter is currently paused.

      - `ref: optional string`

        A short reference tag. Allows you to select related filters.

    - `DeletedFilter object { id, deleted }`

      - `id: string`

        The unique identifier of the filter.

      - `deleted: boolean`

        When true, indicates that the firewall rule was deleted.

  - `paused: optional boolean`

    When true, indicates that the firewall rule is currently paused.

  - `priority: optional number`

    The priority of the rule. Optional value used to define the processing order. A lower number indicates a higher priority. If not provided, rules with a defined priority will be processed before rules without a priority.

  - `products: optional array of Product`

    - `"zoneLockdown"`

    - `"uaBlock"`

    - `"bic"`

    - `"hot"`

    - `"securityLevel"`

    - `"rateLimit"`

    - `"waf"`

  - `ref: optional string`

    A short reference tag. Allows you to select related firewall rules.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/rules/$RULE_ID \
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
    "id": "372e67954025e0ba6aaa6d586b9e0b60",
    "action": "block",
    "description": "Blocks traffic identified during investigation for MIR-31",
    "filter": {
      "id": "372e67954025e0ba6aaa6d586b9e0b61",
      "description": "Restrict access from these browsers on this address range.",
      "expression": "(http.request.uri.path ~ \".*wp-login.php\" or http.request.uri.path ~ \".*xmlrpc.php\") and ip.addr ne 172.16.22.155",
      "paused": false,
      "ref": "FIL-100"
    },
    "paused": false,
    "priority": 50,
    "products": [
      "waf"
    ],
    "ref": "MIR-31"
  },
  "success": true
}
```

## Update firewall rules

**put** `/zones/{zone_id}/firewall/rules`

Updates one or more existing firewall rules.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

### Body Parameters

- `body: unknown`

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

- `result: array of FirewallRule`

  - `id: optional string`

    The unique identifier of the firewall rule.

  - `action: optional Action`

    The action to apply to a matched request. The `log` action is only available on an Enterprise plan.

    - `"block"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

    - `"allow"`

    - `"log"`

    - `"bypass"`

  - `description: optional string`

    An informative summary of the firewall rule.

  - `filter: optional FirewallFilter or DeletedFilter`

    - `FirewallFilter object { id, description, expression, 2 more }`

      - `id: optional string`

        The unique identifier of the filter.

      - `description: optional string`

        An informative summary of the filter.

      - `expression: optional string`

        The filter expression. For more information, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/).

      - `paused: optional boolean`

        When true, indicates that the filter is currently paused.

      - `ref: optional string`

        A short reference tag. Allows you to select related filters.

    - `DeletedFilter object { id, deleted }`

      - `id: string`

        The unique identifier of the filter.

      - `deleted: boolean`

        When true, indicates that the firewall rule was deleted.

  - `paused: optional boolean`

    When true, indicates that the firewall rule is currently paused.

  - `priority: optional number`

    The priority of the rule. Optional value used to define the processing order. A lower number indicates a higher priority. If not provided, rules with a defined priority will be processed before rules without a priority.

  - `products: optional array of Product`

    - `"zoneLockdown"`

    - `"uaBlock"`

    - `"bic"`

    - `"hot"`

    - `"securityLevel"`

    - `"rateLimit"`

    - `"waf"`

  - `ref: optional string`

    A short reference tag. Allows you to select related firewall rules.

- `success: true`

  Defines whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Defines the total number of results for the requested service.

  - `page: optional number`

    Defines the current page within paginated list of results.

  - `per_page: optional number`

    Defines the number of results per page of results.

  - `total_count: optional number`

    Defines the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/rules \
    -X PUT \
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
      "id": "372e67954025e0ba6aaa6d586b9e0b60",
      "action": "block",
      "description": "Blocks traffic identified during investigation for MIR-31",
      "filter": {
        "id": "372e67954025e0ba6aaa6d586b9e0b61",
        "description": "Restrict access from these browsers on this address range.",
        "expression": "(http.request.uri.path ~ \".*wp-login.php\" or http.request.uri.path ~ \".*xmlrpc.php\") and ip.addr ne 172.16.22.155",
        "paused": false,
        "ref": "FIL-100"
      },
      "paused": false,
      "priority": 50,
      "products": [
        "waf"
      ],
      "ref": "MIR-31"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Update priority of firewall rules

**patch** `/zones/{zone_id}/firewall/rules`

Updates the priority of existing firewall rules.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

### Body Parameters

- `body: unknown`

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

- `result: array of FirewallRule`

  - `id: optional string`

    The unique identifier of the firewall rule.

  - `action: optional Action`

    The action to apply to a matched request. The `log` action is only available on an Enterprise plan.

    - `"block"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

    - `"allow"`

    - `"log"`

    - `"bypass"`

  - `description: optional string`

    An informative summary of the firewall rule.

  - `filter: optional FirewallFilter or DeletedFilter`

    - `FirewallFilter object { id, description, expression, 2 more }`

      - `id: optional string`

        The unique identifier of the filter.

      - `description: optional string`

        An informative summary of the filter.

      - `expression: optional string`

        The filter expression. For more information, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/).

      - `paused: optional boolean`

        When true, indicates that the filter is currently paused.

      - `ref: optional string`

        A short reference tag. Allows you to select related filters.

    - `DeletedFilter object { id, deleted }`

      - `id: string`

        The unique identifier of the filter.

      - `deleted: boolean`

        When true, indicates that the firewall rule was deleted.

  - `paused: optional boolean`

    When true, indicates that the firewall rule is currently paused.

  - `priority: optional number`

    The priority of the rule. Optional value used to define the processing order. A lower number indicates a higher priority. If not provided, rules with a defined priority will be processed before rules without a priority.

  - `products: optional array of Product`

    - `"zoneLockdown"`

    - `"uaBlock"`

    - `"bic"`

    - `"hot"`

    - `"securityLevel"`

    - `"rateLimit"`

    - `"waf"`

  - `ref: optional string`

    A short reference tag. Allows you to select related firewall rules.

- `success: true`

  Defines whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Defines the total number of results for the requested service.

  - `page: optional number`

    Defines the current page within paginated list of results.

  - `per_page: optional number`

    Defines the number of results per page of results.

  - `total_count: optional number`

    Defines the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/rules \
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
      "id": "372e67954025e0ba6aaa6d586b9e0b60",
      "action": "block",
      "description": "Blocks traffic identified during investigation for MIR-31",
      "filter": {
        "id": "372e67954025e0ba6aaa6d586b9e0b61",
        "description": "Restrict access from these browsers on this address range.",
        "expression": "(http.request.uri.path ~ \".*wp-login.php\" or http.request.uri.path ~ \".*xmlrpc.php\") and ip.addr ne 172.16.22.155",
        "paused": false,
        "ref": "FIL-100"
      },
      "paused": false,
      "priority": 50,
      "products": [
        "waf"
      ],
      "ref": "MIR-31"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Delete firewall rules

**delete** `/zones/{zone_id}/firewall/rules`

Deletes existing firewall rules.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

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

- `result: array of FirewallRule`

  - `id: optional string`

    The unique identifier of the firewall rule.

  - `action: optional Action`

    The action to apply to a matched request. The `log` action is only available on an Enterprise plan.

    - `"block"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

    - `"allow"`

    - `"log"`

    - `"bypass"`

  - `description: optional string`

    An informative summary of the firewall rule.

  - `filter: optional FirewallFilter or DeletedFilter`

    - `FirewallFilter object { id, description, expression, 2 more }`

      - `id: optional string`

        The unique identifier of the filter.

      - `description: optional string`

        An informative summary of the filter.

      - `expression: optional string`

        The filter expression. For more information, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/).

      - `paused: optional boolean`

        When true, indicates that the filter is currently paused.

      - `ref: optional string`

        A short reference tag. Allows you to select related filters.

    - `DeletedFilter object { id, deleted }`

      - `id: string`

        The unique identifier of the filter.

      - `deleted: boolean`

        When true, indicates that the firewall rule was deleted.

  - `paused: optional boolean`

    When true, indicates that the firewall rule is currently paused.

  - `priority: optional number`

    The priority of the rule. Optional value used to define the processing order. A lower number indicates a higher priority. If not provided, rules with a defined priority will be processed before rules without a priority.

  - `products: optional array of Product`

    - `"zoneLockdown"`

    - `"uaBlock"`

    - `"bic"`

    - `"hot"`

    - `"securityLevel"`

    - `"rateLimit"`

    - `"waf"`

  - `ref: optional string`

    A short reference tag. Allows you to select related firewall rules.

- `success: true`

  Defines whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Defines the total number of results for the requested service.

  - `page: optional number`

    Defines the current page within paginated list of results.

  - `per_page: optional number`

    Defines the number of results per page of results.

  - `total_count: optional number`

    Defines the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/rules \
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
  "result": [
    {
      "id": "372e67954025e0ba6aaa6d586b9e0b60",
      "action": "block",
      "description": "Blocks traffic identified during investigation for MIR-31",
      "filter": {
        "id": "372e67954025e0ba6aaa6d586b9e0b61",
        "description": "Restrict access from these browsers on this address range.",
        "expression": "(http.request.uri.path ~ \".*wp-login.php\" or http.request.uri.path ~ \".*xmlrpc.php\") and ip.addr ne 172.16.22.155",
        "paused": false,
        "ref": "FIL-100"
      },
      "paused": false,
      "priority": 50,
      "products": [
        "waf"
      ],
      "ref": "MIR-31"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Domain Types

### Deleted Filter

- `DeletedFilter object { id, deleted }`

  - `id: string`

    The unique identifier of the filter.

  - `deleted: boolean`

    When true, indicates that the firewall rule was deleted.

### Firewall Rule

- `FirewallRule object { id, action, description, 5 more }`

  - `id: optional string`

    The unique identifier of the firewall rule.

  - `action: optional Action`

    The action to apply to a matched request. The `log` action is only available on an Enterprise plan.

    - `"block"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

    - `"allow"`

    - `"log"`

    - `"bypass"`

  - `description: optional string`

    An informative summary of the firewall rule.

  - `filter: optional FirewallFilter or DeletedFilter`

    - `FirewallFilter object { id, description, expression, 2 more }`

      - `id: optional string`

        The unique identifier of the filter.

      - `description: optional string`

        An informative summary of the filter.

      - `expression: optional string`

        The filter expression. For more information, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/).

      - `paused: optional boolean`

        When true, indicates that the filter is currently paused.

      - `ref: optional string`

        A short reference tag. Allows you to select related filters.

    - `DeletedFilter object { id, deleted }`

      - `id: string`

        The unique identifier of the filter.

      - `deleted: boolean`

        When true, indicates that the firewall rule was deleted.

  - `paused: optional boolean`

    When true, indicates that the firewall rule is currently paused.

  - `priority: optional number`

    The priority of the rule. Optional value used to define the processing order. A lower number indicates a higher priority. If not provided, rules with a defined priority will be processed before rules without a priority.

  - `products: optional array of Product`

    - `"zoneLockdown"`

    - `"uaBlock"`

    - `"bic"`

    - `"hot"`

    - `"securityLevel"`

    - `"rateLimit"`

    - `"waf"`

  - `ref: optional string`

    A short reference tag. Allows you to select related firewall rules.

### Product

- `Product = "zoneLockdown" or "uaBlock" or "bic" or 4 more`

  A list of products to bypass for a request when using the `bypass` action.

  - `"zoneLockdown"`

  - `"uaBlock"`

  - `"bic"`

  - `"hot"`

  - `"securityLevel"`

  - `"rateLimit"`

  - `"waf"`

# Access Rules

## List IP Access rules

**get** `/{accounts_or_zones}/{account_or_zone_id}/firewall/access_rules/rules`

Fetches IP Access rules of an account or zone. These rules apply to all the zones in the account or zone. You can filter the results using several optional parameters.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Query Parameters

- `configuration: optional object { target, value }`

  - `target: optional "ip" or "ip_range" or "asn" or "country"`

    Defines the target to search in existing rules.

    - `"ip"`

    - `"ip_range"`

    - `"asn"`

    - `"country"`

  - `value: optional string`

    Defines the target value to search for in existing rules: an IP address, an IP address range, or a country code, depending on the provided `configuration.target`.
    Notes: You can search for a single IPv4 address, an IP address range with a subnet of '/16' or '/24', or a two-letter ISO-3166-1 alpha-2 country code.

- `direction: optional "asc" or "desc"`

  Defines the direction used to sort returned rules.

  - `"asc"`

  - `"desc"`

- `match: optional "any" or "all"`

  Defines the search requirements. When set to `all`, all the search requirements must match. When set to `any`, only one of the search requirements has to match.

  - `"any"`

  - `"all"`

- `mode: optional "block" or "challenge" or "whitelist" or 2 more`

  The action to apply to a matched request.

  - `"block"`

  - `"challenge"`

  - `"whitelist"`

  - `"js_challenge"`

  - `"managed_challenge"`

- `notes: optional string`

  Defines the string to search for in the notes of existing IP Access rules.
  Notes: For example, the string 'attack' would match IP Access rules with notes 'Attack 26/02' and 'Attack 27/02'. The search is case insensitive.

- `order: optional "configuration.target" or "configuration.value" or "mode"`

  Defines the field used to sort returned rules.

  - `"configuration.target"`

  - `"configuration.value"`

  - `"mode"`

- `page: optional number`

  Defines the requested page within paginated list of results.

- `per_page: optional number`

  Defines the maximum number of results requested.

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

- `result: array of object { id, allowed_modes, configuration, 5 more }`

  - `id: string`

    The unique identifier of the IP Access rule.

  - `allowed_modes: array of "block" or "challenge" or "whitelist" or 2 more`

    The available actions that a rule can apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"whitelist"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `configuration: AccessRuleIPConfiguration or IPV6Configuration or AccessRuleCIDRConfiguration or 2 more`

    The rule configuration.

    - `AccessRuleIPConfiguration object { target, value }`

      - `target: optional "ip"`

        The configuration target. You must set the target to `ip` when specifying an IP address in the rule.

        - `"ip"`

      - `value: optional string`

        The IP address to match. This address will be compared to the IP address of incoming requests.

    - `IPV6Configuration object { target, value }`

      - `target: optional "ip6"`

        The configuration target. You must set the target to `ip6` when specifying an IPv6 address in the rule.

        - `"ip6"`

      - `value: optional string`

        The IPv6 address to match.

    - `AccessRuleCIDRConfiguration object { target, value }`

      - `target: optional "ip_range"`

        The configuration target. You must set the target to `ip_range` when specifying an IP address range in the rule.

        - `"ip_range"`

      - `value: optional string`

        The IP address range to match. You can only use prefix lengths `/16` and `/24` for IPv4 ranges, and prefix lengths `/32`, `/48`, and `/64` for IPv6 ranges.

    - `ASNConfiguration object { target, value }`

      - `target: optional "asn"`

        The configuration target. You must set the target to `asn` when specifying an Autonomous System Number (ASN) in the rule.

        - `"asn"`

      - `value: optional string`

        The AS number to match.

    - `CountryConfiguration object { target, value }`

      - `target: optional "country"`

        The configuration target. You must set the target to `country` when specifying a country code in the rule.

        - `"country"`

      - `value: optional string`

        The two-letter ISO-3166-1 alpha-2 code to match. For more information, refer to [IP Access rules: Parameters](https://developers.cloudflare.com/waf/tools/ip-access-rules/parameters/#country).

  - `mode: "block" or "challenge" or "whitelist" or 2 more`

    The action to apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"whitelist"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `created_on: optional string`

    The timestamp of when the rule was created.

  - `modified_on: optional string`

    The timestamp of when the rule was last modified.

  - `notes: optional string`

    An informative summary of the rule, typically used as a reminder or explanation.

  - `scope: optional object { id, email, type }`

    All zones owned by the user will have the rule applied.

    - `id: optional string`

      Defines an identifier.

    - `email: optional string`

      The contact email address of the user.

    - `type: optional "user" or "organization"`

      Defines the scope of the rule.

      - `"user"`

      - `"organization"`

- `success: true`

  Defines whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Defines the total number of results for the requested service.

  - `page: optional number`

    Defines the current page within paginated list of results.

  - `per_page: optional number`

    Defines the number of results per page of results.

  - `total_count: optional number`

    Defines the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/firewall/access_rules/rules \
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
      "id": "92f17202ed8bd63d69a66b86a49a8f6b",
      "allowed_modes": [
        "whitelist",
        "block",
        "challenge",
        "js_challenge",
        "managed_challenge"
      ],
      "configuration": {
        "target": "ip",
        "value": "198.51.100.4"
      },
      "mode": "challenge",
      "created_on": "2014-01-01T05:20:00.12345Z",
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "notes": "This rule is enabled because of an event that occurred on date X.",
      "scope": {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "email": "user@example.com",
        "type": "user"
      }
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get an IP Access rule

**get** `/{accounts_or_zones}/{account_or_zone_id}/firewall/access_rules/rules/{rule_id}`

Fetches the details of an IP Access rule defined.

### Path Parameters

- `rule_id: string`

  Unique identifier for a rule.

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

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

- `result: object { id, allowed_modes, configuration, 5 more }`

  - `id: string`

    The unique identifier of the IP Access rule.

  - `allowed_modes: array of "block" or "challenge" or "whitelist" or 2 more`

    The available actions that a rule can apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"whitelist"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `configuration: AccessRuleIPConfiguration or IPV6Configuration or AccessRuleCIDRConfiguration or 2 more`

    The rule configuration.

    - `AccessRuleIPConfiguration object { target, value }`

      - `target: optional "ip"`

        The configuration target. You must set the target to `ip` when specifying an IP address in the rule.

        - `"ip"`

      - `value: optional string`

        The IP address to match. This address will be compared to the IP address of incoming requests.

    - `IPV6Configuration object { target, value }`

      - `target: optional "ip6"`

        The configuration target. You must set the target to `ip6` when specifying an IPv6 address in the rule.

        - `"ip6"`

      - `value: optional string`

        The IPv6 address to match.

    - `AccessRuleCIDRConfiguration object { target, value }`

      - `target: optional "ip_range"`

        The configuration target. You must set the target to `ip_range` when specifying an IP address range in the rule.

        - `"ip_range"`

      - `value: optional string`

        The IP address range to match. You can only use prefix lengths `/16` and `/24` for IPv4 ranges, and prefix lengths `/32`, `/48`, and `/64` for IPv6 ranges.

    - `ASNConfiguration object { target, value }`

      - `target: optional "asn"`

        The configuration target. You must set the target to `asn` when specifying an Autonomous System Number (ASN) in the rule.

        - `"asn"`

      - `value: optional string`

        The AS number to match.

    - `CountryConfiguration object { target, value }`

      - `target: optional "country"`

        The configuration target. You must set the target to `country` when specifying a country code in the rule.

        - `"country"`

      - `value: optional string`

        The two-letter ISO-3166-1 alpha-2 code to match. For more information, refer to [IP Access rules: Parameters](https://developers.cloudflare.com/waf/tools/ip-access-rules/parameters/#country).

  - `mode: "block" or "challenge" or "whitelist" or 2 more`

    The action to apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"whitelist"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `created_on: optional string`

    The timestamp of when the rule was created.

  - `modified_on: optional string`

    The timestamp of when the rule was last modified.

  - `notes: optional string`

    An informative summary of the rule, typically used as a reminder or explanation.

  - `scope: optional object { id, email, type }`

    All zones owned by the user will have the rule applied.

    - `id: optional string`

      Defines an identifier.

    - `email: optional string`

      The contact email address of the user.

    - `type: optional "user" or "organization"`

      Defines the scope of the rule.

      - `"user"`

      - `"organization"`

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/firewall/access_rules/rules/$RULE_ID \
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
    "id": "92f17202ed8bd63d69a66b86a49a8f6b",
    "allowed_modes": [
      "whitelist",
      "block",
      "challenge",
      "js_challenge",
      "managed_challenge"
    ],
    "configuration": {
      "target": "ip",
      "value": "198.51.100.4"
    },
    "mode": "challenge",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "notes": "This rule is enabled because of an event that occurred on date X.",
    "scope": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "email": "user@example.com",
      "type": "user"
    }
  },
  "success": true
}
```

## Create an IP Access rule

**post** `/{accounts_or_zones}/{account_or_zone_id}/firewall/access_rules/rules`

Creates a new IP Access rule for an account or zone. The rule will apply to all zones in the account or zone.

Note: To create an IP Access rule that applies to a single zone, refer to the [IP Access rules for a zone](#ip-access-rules-for-a-zone) endpoints.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `configuration: AccessRuleIPConfiguration or IPV6Configuration or AccessRuleCIDRConfiguration or 2 more`

  The rule configuration.

  - `AccessRuleIPConfiguration object { target, value }`

    - `target: optional "ip"`

      The configuration target. You must set the target to `ip` when specifying an IP address in the rule.

      - `"ip"`

    - `value: optional string`

      The IP address to match. This address will be compared to the IP address of incoming requests.

  - `IPV6Configuration object { target, value }`

    - `target: optional "ip6"`

      The configuration target. You must set the target to `ip6` when specifying an IPv6 address in the rule.

      - `"ip6"`

    - `value: optional string`

      The IPv6 address to match.

  - `AccessRuleCIDRConfiguration object { target, value }`

    - `target: optional "ip_range"`

      The configuration target. You must set the target to `ip_range` when specifying an IP address range in the rule.

      - `"ip_range"`

    - `value: optional string`

      The IP address range to match. You can only use prefix lengths `/16` and `/24` for IPv4 ranges, and prefix lengths `/32`, `/48`, and `/64` for IPv6 ranges.

  - `ASNConfiguration object { target, value }`

    - `target: optional "asn"`

      The configuration target. You must set the target to `asn` when specifying an Autonomous System Number (ASN) in the rule.

      - `"asn"`

    - `value: optional string`

      The AS number to match.

  - `CountryConfiguration object { target, value }`

    - `target: optional "country"`

      The configuration target. You must set the target to `country` when specifying a country code in the rule.

      - `"country"`

    - `value: optional string`

      The two-letter ISO-3166-1 alpha-2 code to match. For more information, refer to [IP Access rules: Parameters](https://developers.cloudflare.com/waf/tools/ip-access-rules/parameters/#country).

- `mode: "block" or "challenge" or "whitelist" or 2 more`

  The action to apply to a matched request.

  - `"block"`

  - `"challenge"`

  - `"whitelist"`

  - `"js_challenge"`

  - `"managed_challenge"`

- `notes: optional string`

  An informative summary of the rule, typically used as a reminder or explanation.

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

- `result: object { id, allowed_modes, configuration, 5 more }`

  - `id: string`

    The unique identifier of the IP Access rule.

  - `allowed_modes: array of "block" or "challenge" or "whitelist" or 2 more`

    The available actions that a rule can apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"whitelist"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `configuration: AccessRuleIPConfiguration or IPV6Configuration or AccessRuleCIDRConfiguration or 2 more`

    The rule configuration.

    - `AccessRuleIPConfiguration object { target, value }`

      - `target: optional "ip"`

        The configuration target. You must set the target to `ip` when specifying an IP address in the rule.

        - `"ip"`

      - `value: optional string`

        The IP address to match. This address will be compared to the IP address of incoming requests.

    - `IPV6Configuration object { target, value }`

      - `target: optional "ip6"`

        The configuration target. You must set the target to `ip6` when specifying an IPv6 address in the rule.

        - `"ip6"`

      - `value: optional string`

        The IPv6 address to match.

    - `AccessRuleCIDRConfiguration object { target, value }`

      - `target: optional "ip_range"`

        The configuration target. You must set the target to `ip_range` when specifying an IP address range in the rule.

        - `"ip_range"`

      - `value: optional string`

        The IP address range to match. You can only use prefix lengths `/16` and `/24` for IPv4 ranges, and prefix lengths `/32`, `/48`, and `/64` for IPv6 ranges.

    - `ASNConfiguration object { target, value }`

      - `target: optional "asn"`

        The configuration target. You must set the target to `asn` when specifying an Autonomous System Number (ASN) in the rule.

        - `"asn"`

      - `value: optional string`

        The AS number to match.

    - `CountryConfiguration object { target, value }`

      - `target: optional "country"`

        The configuration target. You must set the target to `country` when specifying a country code in the rule.

        - `"country"`

      - `value: optional string`

        The two-letter ISO-3166-1 alpha-2 code to match. For more information, refer to [IP Access rules: Parameters](https://developers.cloudflare.com/waf/tools/ip-access-rules/parameters/#country).

  - `mode: "block" or "challenge" or "whitelist" or 2 more`

    The action to apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"whitelist"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `created_on: optional string`

    The timestamp of when the rule was created.

  - `modified_on: optional string`

    The timestamp of when the rule was last modified.

  - `notes: optional string`

    An informative summary of the rule, typically used as a reminder or explanation.

  - `scope: optional object { id, email, type }`

    All zones owned by the user will have the rule applied.

    - `id: optional string`

      Defines an identifier.

    - `email: optional string`

      The contact email address of the user.

    - `type: optional "user" or "organization"`

      Defines the scope of the rule.

      - `"user"`

      - `"organization"`

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/firewall/access_rules/rules \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "configuration": {},
          "mode": "challenge",
          "notes": "This rule is enabled because of an event that occurred on date X."
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
    "id": "92f17202ed8bd63d69a66b86a49a8f6b",
    "allowed_modes": [
      "whitelist",
      "block",
      "challenge",
      "js_challenge",
      "managed_challenge"
    ],
    "configuration": {
      "target": "ip",
      "value": "198.51.100.4"
    },
    "mode": "challenge",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "notes": "This rule is enabled because of an event that occurred on date X.",
    "scope": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "email": "user@example.com",
      "type": "user"
    }
  },
  "success": true
}
```

## Update an IP Access rule

**patch** `/{accounts_or_zones}/{account_or_zone_id}/firewall/access_rules/rules/{rule_id}`

Updates an IP Access rule defined.

Note: This operation will affect all zones in the account or zone.

### Path Parameters

- `rule_id: string`

  Unique identifier for a rule.

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `configuration: AccessRuleIPConfiguration or IPV6Configuration or AccessRuleCIDRConfiguration or 2 more`

  The rule configuration.

  - `AccessRuleIPConfiguration object { target, value }`

    - `target: optional "ip"`

      The configuration target. You must set the target to `ip` when specifying an IP address in the rule.

      - `"ip"`

    - `value: optional string`

      The IP address to match. This address will be compared to the IP address of incoming requests.

  - `IPV6Configuration object { target, value }`

    - `target: optional "ip6"`

      The configuration target. You must set the target to `ip6` when specifying an IPv6 address in the rule.

      - `"ip6"`

    - `value: optional string`

      The IPv6 address to match.

  - `AccessRuleCIDRConfiguration object { target, value }`

    - `target: optional "ip_range"`

      The configuration target. You must set the target to `ip_range` when specifying an IP address range in the rule.

      - `"ip_range"`

    - `value: optional string`

      The IP address range to match. You can only use prefix lengths `/16` and `/24` for IPv4 ranges, and prefix lengths `/32`, `/48`, and `/64` for IPv6 ranges.

  - `ASNConfiguration object { target, value }`

    - `target: optional "asn"`

      The configuration target. You must set the target to `asn` when specifying an Autonomous System Number (ASN) in the rule.

      - `"asn"`

    - `value: optional string`

      The AS number to match.

  - `CountryConfiguration object { target, value }`

    - `target: optional "country"`

      The configuration target. You must set the target to `country` when specifying a country code in the rule.

      - `"country"`

    - `value: optional string`

      The two-letter ISO-3166-1 alpha-2 code to match. For more information, refer to [IP Access rules: Parameters](https://developers.cloudflare.com/waf/tools/ip-access-rules/parameters/#country).

- `mode: "block" or "challenge" or "whitelist" or 2 more`

  The action to apply to a matched request.

  - `"block"`

  - `"challenge"`

  - `"whitelist"`

  - `"js_challenge"`

  - `"managed_challenge"`

- `notes: optional string`

  An informative summary of the rule, typically used as a reminder or explanation.

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

- `result: object { id, allowed_modes, configuration, 5 more }`

  - `id: string`

    The unique identifier of the IP Access rule.

  - `allowed_modes: array of "block" or "challenge" or "whitelist" or 2 more`

    The available actions that a rule can apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"whitelist"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `configuration: AccessRuleIPConfiguration or IPV6Configuration or AccessRuleCIDRConfiguration or 2 more`

    The rule configuration.

    - `AccessRuleIPConfiguration object { target, value }`

      - `target: optional "ip"`

        The configuration target. You must set the target to `ip` when specifying an IP address in the rule.

        - `"ip"`

      - `value: optional string`

        The IP address to match. This address will be compared to the IP address of incoming requests.

    - `IPV6Configuration object { target, value }`

      - `target: optional "ip6"`

        The configuration target. You must set the target to `ip6` when specifying an IPv6 address in the rule.

        - `"ip6"`

      - `value: optional string`

        The IPv6 address to match.

    - `AccessRuleCIDRConfiguration object { target, value }`

      - `target: optional "ip_range"`

        The configuration target. You must set the target to `ip_range` when specifying an IP address range in the rule.

        - `"ip_range"`

      - `value: optional string`

        The IP address range to match. You can only use prefix lengths `/16` and `/24` for IPv4 ranges, and prefix lengths `/32`, `/48`, and `/64` for IPv6 ranges.

    - `ASNConfiguration object { target, value }`

      - `target: optional "asn"`

        The configuration target. You must set the target to `asn` when specifying an Autonomous System Number (ASN) in the rule.

        - `"asn"`

      - `value: optional string`

        The AS number to match.

    - `CountryConfiguration object { target, value }`

      - `target: optional "country"`

        The configuration target. You must set the target to `country` when specifying a country code in the rule.

        - `"country"`

      - `value: optional string`

        The two-letter ISO-3166-1 alpha-2 code to match. For more information, refer to [IP Access rules: Parameters](https://developers.cloudflare.com/waf/tools/ip-access-rules/parameters/#country).

  - `mode: "block" or "challenge" or "whitelist" or 2 more`

    The action to apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"whitelist"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `created_on: optional string`

    The timestamp of when the rule was created.

  - `modified_on: optional string`

    The timestamp of when the rule was last modified.

  - `notes: optional string`

    An informative summary of the rule, typically used as a reminder or explanation.

  - `scope: optional object { id, email, type }`

    All zones owned by the user will have the rule applied.

    - `id: optional string`

      Defines an identifier.

    - `email: optional string`

      The contact email address of the user.

    - `type: optional "user" or "organization"`

      Defines the scope of the rule.

      - `"user"`

      - `"organization"`

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/firewall/access_rules/rules/$RULE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "configuration": {},
          "mode": "challenge",
          "notes": "This rule is enabled because of an event that occurred on date X."
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
    "id": "92f17202ed8bd63d69a66b86a49a8f6b",
    "allowed_modes": [
      "whitelist",
      "block",
      "challenge",
      "js_challenge",
      "managed_challenge"
    ],
    "configuration": {
      "target": "ip",
      "value": "198.51.100.4"
    },
    "mode": "challenge",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "notes": "This rule is enabled because of an event that occurred on date X.",
    "scope": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "email": "user@example.com",
      "type": "user"
    }
  },
  "success": true
}
```

## Delete an IP Access rule

**delete** `/{accounts_or_zones}/{account_or_zone_id}/firewall/access_rules/rules/{rule_id}`

Deletes an existing IP Access rule defined.

Note: This operation will affect all zones in the account or zone.

### Path Parameters

- `rule_id: string`

  Unique identifier for a rule.

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

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

  - `id: string`

    Defines an identifier.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/firewall/access_rules/rules/$RULE_ID \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  },
  "success": true
}
```

## Domain Types

### Access Rule CIDR Configuration

- `AccessRuleCIDRConfiguration object { target, value }`

  - `target: optional "ip_range"`

    The configuration target. You must set the target to `ip_range` when specifying an IP address range in the rule.

    - `"ip_range"`

  - `value: optional string`

    The IP address range to match. You can only use prefix lengths `/16` and `/24` for IPv4 ranges, and prefix lengths `/32`, `/48`, and `/64` for IPv6 ranges.

### Access Rule IP Configuration

- `AccessRuleIPConfiguration object { target, value }`

  - `target: optional "ip"`

    The configuration target. You must set the target to `ip` when specifying an IP address in the rule.

    - `"ip"`

  - `value: optional string`

    The IP address to match. This address will be compared to the IP address of incoming requests.

### ASN Configuration

- `ASNConfiguration object { target, value }`

  - `target: optional "asn"`

    The configuration target. You must set the target to `asn` when specifying an Autonomous System Number (ASN) in the rule.

    - `"asn"`

  - `value: optional string`

    The AS number to match.

### Country Configuration

- `CountryConfiguration object { target, value }`

  - `target: optional "country"`

    The configuration target. You must set the target to `country` when specifying a country code in the rule.

    - `"country"`

  - `value: optional string`

    The two-letter ISO-3166-1 alpha-2 code to match. For more information, refer to [IP Access rules: Parameters](https://developers.cloudflare.com/waf/tools/ip-access-rules/parameters/#country).

### IPV6 Configuration

- `IPV6Configuration object { target, value }`

  - `target: optional "ip6"`

    The configuration target. You must set the target to `ip6` when specifying an IPv6 address in the rule.

    - `"ip6"`

  - `value: optional string`

    The IPv6 address to match.

### Access Rule List Response

- `AccessRuleListResponse object { id, allowed_modes, configuration, 5 more }`

  - `id: string`

    The unique identifier of the IP Access rule.

  - `allowed_modes: array of "block" or "challenge" or "whitelist" or 2 more`

    The available actions that a rule can apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"whitelist"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `configuration: AccessRuleIPConfiguration or IPV6Configuration or AccessRuleCIDRConfiguration or 2 more`

    The rule configuration.

    - `AccessRuleIPConfiguration object { target, value }`

      - `target: optional "ip"`

        The configuration target. You must set the target to `ip` when specifying an IP address in the rule.

        - `"ip"`

      - `value: optional string`

        The IP address to match. This address will be compared to the IP address of incoming requests.

    - `IPV6Configuration object { target, value }`

      - `target: optional "ip6"`

        The configuration target. You must set the target to `ip6` when specifying an IPv6 address in the rule.

        - `"ip6"`

      - `value: optional string`

        The IPv6 address to match.

    - `AccessRuleCIDRConfiguration object { target, value }`

      - `target: optional "ip_range"`

        The configuration target. You must set the target to `ip_range` when specifying an IP address range in the rule.

        - `"ip_range"`

      - `value: optional string`

        The IP address range to match. You can only use prefix lengths `/16` and `/24` for IPv4 ranges, and prefix lengths `/32`, `/48`, and `/64` for IPv6 ranges.

    - `ASNConfiguration object { target, value }`

      - `target: optional "asn"`

        The configuration target. You must set the target to `asn` when specifying an Autonomous System Number (ASN) in the rule.

        - `"asn"`

      - `value: optional string`

        The AS number to match.

    - `CountryConfiguration object { target, value }`

      - `target: optional "country"`

        The configuration target. You must set the target to `country` when specifying a country code in the rule.

        - `"country"`

      - `value: optional string`

        The two-letter ISO-3166-1 alpha-2 code to match. For more information, refer to [IP Access rules: Parameters](https://developers.cloudflare.com/waf/tools/ip-access-rules/parameters/#country).

  - `mode: "block" or "challenge" or "whitelist" or 2 more`

    The action to apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"whitelist"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `created_on: optional string`

    The timestamp of when the rule was created.

  - `modified_on: optional string`

    The timestamp of when the rule was last modified.

  - `notes: optional string`

    An informative summary of the rule, typically used as a reminder or explanation.

  - `scope: optional object { id, email, type }`

    All zones owned by the user will have the rule applied.

    - `id: optional string`

      Defines an identifier.

    - `email: optional string`

      The contact email address of the user.

    - `type: optional "user" or "organization"`

      Defines the scope of the rule.

      - `"user"`

      - `"organization"`

### Access Rule Get Response

- `AccessRuleGetResponse object { id, allowed_modes, configuration, 5 more }`

  - `id: string`

    The unique identifier of the IP Access rule.

  - `allowed_modes: array of "block" or "challenge" or "whitelist" or 2 more`

    The available actions that a rule can apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"whitelist"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `configuration: AccessRuleIPConfiguration or IPV6Configuration or AccessRuleCIDRConfiguration or 2 more`

    The rule configuration.

    - `AccessRuleIPConfiguration object { target, value }`

      - `target: optional "ip"`

        The configuration target. You must set the target to `ip` when specifying an IP address in the rule.

        - `"ip"`

      - `value: optional string`

        The IP address to match. This address will be compared to the IP address of incoming requests.

    - `IPV6Configuration object { target, value }`

      - `target: optional "ip6"`

        The configuration target. You must set the target to `ip6` when specifying an IPv6 address in the rule.

        - `"ip6"`

      - `value: optional string`

        The IPv6 address to match.

    - `AccessRuleCIDRConfiguration object { target, value }`

      - `target: optional "ip_range"`

        The configuration target. You must set the target to `ip_range` when specifying an IP address range in the rule.

        - `"ip_range"`

      - `value: optional string`

        The IP address range to match. You can only use prefix lengths `/16` and `/24` for IPv4 ranges, and prefix lengths `/32`, `/48`, and `/64` for IPv6 ranges.

    - `ASNConfiguration object { target, value }`

      - `target: optional "asn"`

        The configuration target. You must set the target to `asn` when specifying an Autonomous System Number (ASN) in the rule.

        - `"asn"`

      - `value: optional string`

        The AS number to match.

    - `CountryConfiguration object { target, value }`

      - `target: optional "country"`

        The configuration target. You must set the target to `country` when specifying a country code in the rule.

        - `"country"`

      - `value: optional string`

        The two-letter ISO-3166-1 alpha-2 code to match. For more information, refer to [IP Access rules: Parameters](https://developers.cloudflare.com/waf/tools/ip-access-rules/parameters/#country).

  - `mode: "block" or "challenge" or "whitelist" or 2 more`

    The action to apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"whitelist"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `created_on: optional string`

    The timestamp of when the rule was created.

  - `modified_on: optional string`

    The timestamp of when the rule was last modified.

  - `notes: optional string`

    An informative summary of the rule, typically used as a reminder or explanation.

  - `scope: optional object { id, email, type }`

    All zones owned by the user will have the rule applied.

    - `id: optional string`

      Defines an identifier.

    - `email: optional string`

      The contact email address of the user.

    - `type: optional "user" or "organization"`

      Defines the scope of the rule.

      - `"user"`

      - `"organization"`

### Access Rule Create Response

- `AccessRuleCreateResponse object { id, allowed_modes, configuration, 5 more }`

  - `id: string`

    The unique identifier of the IP Access rule.

  - `allowed_modes: array of "block" or "challenge" or "whitelist" or 2 more`

    The available actions that a rule can apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"whitelist"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `configuration: AccessRuleIPConfiguration or IPV6Configuration or AccessRuleCIDRConfiguration or 2 more`

    The rule configuration.

    - `AccessRuleIPConfiguration object { target, value }`

      - `target: optional "ip"`

        The configuration target. You must set the target to `ip` when specifying an IP address in the rule.

        - `"ip"`

      - `value: optional string`

        The IP address to match. This address will be compared to the IP address of incoming requests.

    - `IPV6Configuration object { target, value }`

      - `target: optional "ip6"`

        The configuration target. You must set the target to `ip6` when specifying an IPv6 address in the rule.

        - `"ip6"`

      - `value: optional string`

        The IPv6 address to match.

    - `AccessRuleCIDRConfiguration object { target, value }`

      - `target: optional "ip_range"`

        The configuration target. You must set the target to `ip_range` when specifying an IP address range in the rule.

        - `"ip_range"`

      - `value: optional string`

        The IP address range to match. You can only use prefix lengths `/16` and `/24` for IPv4 ranges, and prefix lengths `/32`, `/48`, and `/64` for IPv6 ranges.

    - `ASNConfiguration object { target, value }`

      - `target: optional "asn"`

        The configuration target. You must set the target to `asn` when specifying an Autonomous System Number (ASN) in the rule.

        - `"asn"`

      - `value: optional string`

        The AS number to match.

    - `CountryConfiguration object { target, value }`

      - `target: optional "country"`

        The configuration target. You must set the target to `country` when specifying a country code in the rule.

        - `"country"`

      - `value: optional string`

        The two-letter ISO-3166-1 alpha-2 code to match. For more information, refer to [IP Access rules: Parameters](https://developers.cloudflare.com/waf/tools/ip-access-rules/parameters/#country).

  - `mode: "block" or "challenge" or "whitelist" or 2 more`

    The action to apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"whitelist"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `created_on: optional string`

    The timestamp of when the rule was created.

  - `modified_on: optional string`

    The timestamp of when the rule was last modified.

  - `notes: optional string`

    An informative summary of the rule, typically used as a reminder or explanation.

  - `scope: optional object { id, email, type }`

    All zones owned by the user will have the rule applied.

    - `id: optional string`

      Defines an identifier.

    - `email: optional string`

      The contact email address of the user.

    - `type: optional "user" or "organization"`

      Defines the scope of the rule.

      - `"user"`

      - `"organization"`

### Access Rule Edit Response

- `AccessRuleEditResponse object { id, allowed_modes, configuration, 5 more }`

  - `id: string`

    The unique identifier of the IP Access rule.

  - `allowed_modes: array of "block" or "challenge" or "whitelist" or 2 more`

    The available actions that a rule can apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"whitelist"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `configuration: AccessRuleIPConfiguration or IPV6Configuration or AccessRuleCIDRConfiguration or 2 more`

    The rule configuration.

    - `AccessRuleIPConfiguration object { target, value }`

      - `target: optional "ip"`

        The configuration target. You must set the target to `ip` when specifying an IP address in the rule.

        - `"ip"`

      - `value: optional string`

        The IP address to match. This address will be compared to the IP address of incoming requests.

    - `IPV6Configuration object { target, value }`

      - `target: optional "ip6"`

        The configuration target. You must set the target to `ip6` when specifying an IPv6 address in the rule.

        - `"ip6"`

      - `value: optional string`

        The IPv6 address to match.

    - `AccessRuleCIDRConfiguration object { target, value }`

      - `target: optional "ip_range"`

        The configuration target. You must set the target to `ip_range` when specifying an IP address range in the rule.

        - `"ip_range"`

      - `value: optional string`

        The IP address range to match. You can only use prefix lengths `/16` and `/24` for IPv4 ranges, and prefix lengths `/32`, `/48`, and `/64` for IPv6 ranges.

    - `ASNConfiguration object { target, value }`

      - `target: optional "asn"`

        The configuration target. You must set the target to `asn` when specifying an Autonomous System Number (ASN) in the rule.

        - `"asn"`

      - `value: optional string`

        The AS number to match.

    - `CountryConfiguration object { target, value }`

      - `target: optional "country"`

        The configuration target. You must set the target to `country` when specifying a country code in the rule.

        - `"country"`

      - `value: optional string`

        The two-letter ISO-3166-1 alpha-2 code to match. For more information, refer to [IP Access rules: Parameters](https://developers.cloudflare.com/waf/tools/ip-access-rules/parameters/#country).

  - `mode: "block" or "challenge" or "whitelist" or 2 more`

    The action to apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"whitelist"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `created_on: optional string`

    The timestamp of when the rule was created.

  - `modified_on: optional string`

    The timestamp of when the rule was last modified.

  - `notes: optional string`

    An informative summary of the rule, typically used as a reminder or explanation.

  - `scope: optional object { id, email, type }`

    All zones owned by the user will have the rule applied.

    - `id: optional string`

      Defines an identifier.

    - `email: optional string`

      The contact email address of the user.

    - `type: optional "user" or "organization"`

      Defines the scope of the rule.

      - `"user"`

      - `"organization"`

### Access Rule Delete Response

- `AccessRuleDeleteResponse object { id }`

  - `id: string`

    Defines an identifier.

# UA Rules

## List User Agent Blocking rules

**get** `/zones/{zone_id}/firewall/ua_rules`

Fetches User Agent Blocking rules in a zone. You can filter the results using several optional parameters.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

### Query Parameters

- `description: optional string`

  A string to search for in the description of existing rules.

- `page: optional number`

  Page number of paginated results.

- `paused: optional boolean`

  When true, indicates that the rule is currently paused.

- `per_page: optional number`

  The maximum number of results per page. You can only set the value to `1` or to a multiple of 5 such as `5`, `10`, `15`, or `20`.

- `user_agent: optional string`

  A string to search for in the user agent values of existing rules.

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

- `result: array of object { id, configuration, description, 2 more }`

  - `id: optional string`

    The unique identifier of the User Agent Blocking rule.

  - `configuration: optional object { target, value }`

    The configuration object for the current rule.

    - `target: optional string`

      The configuration target for this rule. You must set the target to `ua` for User Agent Blocking rules.

    - `value: optional string`

      The exact user agent string to match. This value will be compared to the received `User-Agent` HTTP header value.

  - `description: optional string`

    An informative summary of the rule.

  - `mode: optional "block" or "challenge" or "js_challenge" or "managed_challenge"`

    The action to apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `paused: optional boolean`

    When true, indicates that the rule is currently paused.

- `success: true`

  Defines whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Defines the total number of results for the requested service.

  - `page: optional number`

    Defines the current page within paginated list of results.

  - `per_page: optional number`

    Defines the number of results per page of results.

  - `total_count: optional number`

    Defines the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/ua_rules \
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
      "id": "372e67954025e0ba6aaa6d586b9e0b59",
      "configuration": {
        "target": "ua",
        "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4"
      },
      "description": "Prevent access from abusive clients identified by this User Agent to mitigate a DDoS attack",
      "mode": "js_challenge",
      "paused": false
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get a User Agent Blocking rule

**get** `/zones/{zone_id}/firewall/ua_rules/{ua_rule_id}`

Fetches the details of a User Agent Blocking rule.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

- `ua_rule_id: string`

  The unique identifier of the User Agent Blocking rule.

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

- `result: object { id, configuration, description, 2 more }`

  - `id: optional string`

    The unique identifier of the User Agent Blocking rule.

  - `configuration: optional object { target, value }`

    The configuration object for the current rule.

    - `target: optional string`

      The configuration target for this rule. You must set the target to `ua` for User Agent Blocking rules.

    - `value: optional string`

      The exact user agent string to match. This value will be compared to the received `User-Agent` HTTP header value.

  - `description: optional string`

    An informative summary of the rule.

  - `mode: optional "block" or "challenge" or "js_challenge" or "managed_challenge"`

    The action to apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `paused: optional boolean`

    When true, indicates that the rule is currently paused.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/ua_rules/$UA_RULE_ID \
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
    "id": "372e67954025e0ba6aaa6d586b9e0b59",
    "configuration": {
      "target": "ua",
      "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4"
    },
    "description": "Prevent access from abusive clients identified by this User Agent to mitigate a DDoS attack",
    "mode": "js_challenge",
    "paused": false
  },
  "success": true
}
```

## Create a User Agent Blocking rule

**post** `/zones/{zone_id}/firewall/ua_rules`

Creates a new User Agent Blocking rule in a zone.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

### Body Parameters

- `configuration: object { target, value }`

  - `target: optional "ua"`

    The configuration target. You must set the target to `ua` when specifying a user agent in the rule.

    - `"ua"`

  - `value: optional string`

    the user agent to exactly match

- `mode: "block" or "challenge" or "whitelist" or 2 more`

  The action to apply to a matched request.

  - `"block"`

  - `"challenge"`

  - `"whitelist"`

  - `"js_challenge"`

  - `"managed_challenge"`

- `description: optional string`

  An informative summary of the rule. This value is sanitized and any tags will be removed.

- `paused: optional boolean`

  When true, indicates that the rule is currently paused.

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

- `result: object { id, configuration, description, 2 more }`

  - `id: optional string`

    The unique identifier of the User Agent Blocking rule.

  - `configuration: optional object { target, value }`

    The configuration object for the current rule.

    - `target: optional string`

      The configuration target for this rule. You must set the target to `ua` for User Agent Blocking rules.

    - `value: optional string`

      The exact user agent string to match. This value will be compared to the received `User-Agent` HTTP header value.

  - `description: optional string`

    An informative summary of the rule.

  - `mode: optional "block" or "challenge" or "js_challenge" or "managed_challenge"`

    The action to apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `paused: optional boolean`

    When true, indicates that the rule is currently paused.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/ua_rules \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "configuration": {},
          "mode": "challenge",
          "description": "Prevent multiple login failures to mitigate brute force attacks"
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
    "id": "372e67954025e0ba6aaa6d586b9e0b59",
    "configuration": {
      "target": "ua",
      "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4"
    },
    "description": "Prevent access from abusive clients identified by this User Agent to mitigate a DDoS attack",
    "mode": "js_challenge",
    "paused": false
  },
  "success": true
}
```

## Update a User Agent Blocking rule

**put** `/zones/{zone_id}/firewall/ua_rules/{ua_rule_id}`

Updates an existing User Agent Blocking rule.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

- `ua_rule_id: string`

  The unique identifier of the User Agent Blocking rule.

### Body Parameters

- `configuration: AccessRuleIPConfiguration or IPV6Configuration or AccessRuleCIDRConfiguration or 2 more`

  The rule configuration.

  - `AccessRuleIPConfiguration object { target, value }`

    - `target: optional "ip"`

      The configuration target. You must set the target to `ip` when specifying an IP address in the rule.

      - `"ip"`

    - `value: optional string`

      The IP address to match. This address will be compared to the IP address of incoming requests.

  - `IPV6Configuration object { target, value }`

    - `target: optional "ip6"`

      The configuration target. You must set the target to `ip6` when specifying an IPv6 address in the rule.

      - `"ip6"`

    - `value: optional string`

      The IPv6 address to match.

  - `AccessRuleCIDRConfiguration object { target, value }`

    - `target: optional "ip_range"`

      The configuration target. You must set the target to `ip_range` when specifying an IP address range in the rule.

      - `"ip_range"`

    - `value: optional string`

      The IP address range to match. You can only use prefix lengths `/16` and `/24` for IPv4 ranges, and prefix lengths `/32`, `/48`, and `/64` for IPv6 ranges.

  - `ASNConfiguration object { target, value }`

    - `target: optional "asn"`

      The configuration target. You must set the target to `asn` when specifying an Autonomous System Number (ASN) in the rule.

      - `"asn"`

    - `value: optional string`

      The AS number to match.

  - `CountryConfiguration object { target, value }`

    - `target: optional "country"`

      The configuration target. You must set the target to `country` when specifying a country code in the rule.

      - `"country"`

    - `value: optional string`

      The two-letter ISO-3166-1 alpha-2 code to match. For more information, refer to [IP Access rules: Parameters](https://developers.cloudflare.com/waf/tools/ip-access-rules/parameters/#country).

- `mode: "block" or "challenge" or "whitelist" or 2 more`

  The action to apply to a matched request.

  - `"block"`

  - `"challenge"`

  - `"whitelist"`

  - `"js_challenge"`

  - `"managed_challenge"`

- `description: optional string`

  An informative summary of the rule. This value is sanitized and any tags will be removed.

- `paused: optional boolean`

  When true, indicates that the rule is currently paused.

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

- `result: object { id, configuration, description, 2 more }`

  - `id: optional string`

    The unique identifier of the User Agent Blocking rule.

  - `configuration: optional object { target, value }`

    The configuration object for the current rule.

    - `target: optional string`

      The configuration target for this rule. You must set the target to `ua` for User Agent Blocking rules.

    - `value: optional string`

      The exact user agent string to match. This value will be compared to the received `User-Agent` HTTP header value.

  - `description: optional string`

    An informative summary of the rule.

  - `mode: optional "block" or "challenge" or "js_challenge" or "managed_challenge"`

    The action to apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `paused: optional boolean`

    When true, indicates that the rule is currently paused.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/ua_rules/$UA_RULE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "configuration": {},
          "mode": "challenge",
          "description": "Prevent multiple login failures to mitigate brute force attacks"
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
    "id": "372e67954025e0ba6aaa6d586b9e0b59",
    "configuration": {
      "target": "ua",
      "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4"
    },
    "description": "Prevent access from abusive clients identified by this User Agent to mitigate a DDoS attack",
    "mode": "js_challenge",
    "paused": false
  },
  "success": true
}
```

## Delete a User Agent Blocking rule

**delete** `/zones/{zone_id}/firewall/ua_rules/{ua_rule_id}`

Deletes an existing User Agent Blocking rule.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

- `ua_rule_id: string`

  The unique identifier of the User Agent Blocking rule.

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

- `result: object { id, configuration, description, 2 more }`

  - `id: optional string`

    The unique identifier of the User Agent Blocking rule.

  - `configuration: optional object { target, value }`

    The configuration object for the current rule.

    - `target: optional string`

      The configuration target for this rule. You must set the target to `ua` for User Agent Blocking rules.

    - `value: optional string`

      The exact user agent string to match. This value will be compared to the received `User-Agent` HTTP header value.

  - `description: optional string`

    An informative summary of the rule.

  - `mode: optional "block" or "challenge" or "js_challenge" or "managed_challenge"`

    The action to apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `paused: optional boolean`

    When true, indicates that the rule is currently paused.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/ua_rules/$UA_RULE_ID \
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
    "id": "372e67954025e0ba6aaa6d586b9e0b59",
    "configuration": {
      "target": "ua",
      "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4"
    },
    "description": "Prevent access from abusive clients identified by this User Agent to mitigate a DDoS attack",
    "mode": "js_challenge",
    "paused": false
  },
  "success": true
}
```

## Domain Types

### UA Rule List Response

- `UARuleListResponse object { id, configuration, description, 2 more }`

  - `id: optional string`

    The unique identifier of the User Agent Blocking rule.

  - `configuration: optional object { target, value }`

    The configuration object for the current rule.

    - `target: optional string`

      The configuration target for this rule. You must set the target to `ua` for User Agent Blocking rules.

    - `value: optional string`

      The exact user agent string to match. This value will be compared to the received `User-Agent` HTTP header value.

  - `description: optional string`

    An informative summary of the rule.

  - `mode: optional "block" or "challenge" or "js_challenge" or "managed_challenge"`

    The action to apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `paused: optional boolean`

    When true, indicates that the rule is currently paused.

### UA Rule Get Response

- `UARuleGetResponse object { id, configuration, description, 2 more }`

  - `id: optional string`

    The unique identifier of the User Agent Blocking rule.

  - `configuration: optional object { target, value }`

    The configuration object for the current rule.

    - `target: optional string`

      The configuration target for this rule. You must set the target to `ua` for User Agent Blocking rules.

    - `value: optional string`

      The exact user agent string to match. This value will be compared to the received `User-Agent` HTTP header value.

  - `description: optional string`

    An informative summary of the rule.

  - `mode: optional "block" or "challenge" or "js_challenge" or "managed_challenge"`

    The action to apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `paused: optional boolean`

    When true, indicates that the rule is currently paused.

### UA Rule Create Response

- `UARuleCreateResponse object { id, configuration, description, 2 more }`

  - `id: optional string`

    The unique identifier of the User Agent Blocking rule.

  - `configuration: optional object { target, value }`

    The configuration object for the current rule.

    - `target: optional string`

      The configuration target for this rule. You must set the target to `ua` for User Agent Blocking rules.

    - `value: optional string`

      The exact user agent string to match. This value will be compared to the received `User-Agent` HTTP header value.

  - `description: optional string`

    An informative summary of the rule.

  - `mode: optional "block" or "challenge" or "js_challenge" or "managed_challenge"`

    The action to apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `paused: optional boolean`

    When true, indicates that the rule is currently paused.

### UA Rule Update Response

- `UARuleUpdateResponse object { id, configuration, description, 2 more }`

  - `id: optional string`

    The unique identifier of the User Agent Blocking rule.

  - `configuration: optional object { target, value }`

    The configuration object for the current rule.

    - `target: optional string`

      The configuration target for this rule. You must set the target to `ua` for User Agent Blocking rules.

    - `value: optional string`

      The exact user agent string to match. This value will be compared to the received `User-Agent` HTTP header value.

  - `description: optional string`

    An informative summary of the rule.

  - `mode: optional "block" or "challenge" or "js_challenge" or "managed_challenge"`

    The action to apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `paused: optional boolean`

    When true, indicates that the rule is currently paused.

### UA Rule Delete Response

- `UARuleDeleteResponse object { id, configuration, description, 2 more }`

  - `id: optional string`

    The unique identifier of the User Agent Blocking rule.

  - `configuration: optional object { target, value }`

    The configuration object for the current rule.

    - `target: optional string`

      The configuration target for this rule. You must set the target to `ua` for User Agent Blocking rules.

    - `value: optional string`

      The exact user agent string to match. This value will be compared to the received `User-Agent` HTTP header value.

  - `description: optional string`

    An informative summary of the rule.

  - `mode: optional "block" or "challenge" or "js_challenge" or "managed_challenge"`

    The action to apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `paused: optional boolean`

    When true, indicates that the rule is currently paused.

# WAF

# Overrides

## List WAF overrides

**get** `/zones/{zone_id}/firewall/waf/overrides`

Fetches the URI-based WAF overrides in a zone.

**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).

### Path Parameters

- `zone_id: string`

  Defines an identifier.

### Query Parameters

- `page: optional number`

  The page number of paginated results.

- `per_page: optional number`

  The number of WAF overrides per page.

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

- `result: array of Override`

  - `id: optional string`

    The unique identifier of the WAF override.

  - `description: optional string`

    An informative summary of the current URI-based WAF override.

  - `groups: optional map[unknown]`

    An object that allows you to enable or disable WAF rule groups for the current WAF override. Each key of this object must be the ID of a WAF rule group, and each value must be a valid WAF action (usually `default` or `disable`). When creating a new URI-based WAF override, you must provide a `groups` object or a `rules` object.

  - `paused: optional boolean`

    When true, indicates that the rule is currently paused.

  - `priority: optional number`

    The relative priority of the current URI-based WAF override when multiple overrides match a single URL. A lower number indicates higher priority. Higher priority overrides may overwrite values set by lower priority overrides.

  - `rewrite_action: optional RewriteAction`

    Specifies that, when a WAF rule matches, its configured action will be replaced by the action configured in this object.

    - `block: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

    - `challenge: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

    - `default: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

    - `disable: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

    - `simulate: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

  - `rules: optional WAFRule`

    An object that allows you to override the action of specific WAF rules. Each key of this object must be the ID of a WAF rule, and each value must be a valid WAF action. Unless you are disabling a rule, ensure that you also enable the rule group that this WAF rule belongs to. When creating a new URI-based WAF override, you must provide a `groups` object or a `rules` object.

    - `"challenge"`

    - `"block"`

    - `"simulate"`

    - `"disable"`

    - `"default"`

  - `urls: optional array of OverrideURL`

    The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.

- `success: true`

  Defines whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Defines the total number of results for the requested service.

  - `page: optional number`

    Defines the current page within paginated list of results.

  - `per_page: optional number`

    Defines the number of results per page of results.

  - `total_count: optional number`

    Defines the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/waf/overrides \
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
      "id": "de677e5818985db1285d0e80225f06e5",
      "description": "Enable Cloudflare Magento ruleset for shop.example.com",
      "groups": {
        "ea8687e59929c1fd05ba97574ad43f77": "bar"
      },
      "paused": true,
      "priority": 1,
      "rewrite_action": {
        "block": "challenge",
        "challenge": "challenge",
        "default": "challenge",
        "disable": "challenge",
        "simulate": "challenge"
      },
      "rules": {
        "100015": "disable"
      },
      "urls": [
        "shop.example.com/*"
      ]
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get a WAF override

**get** `/zones/{zone_id}/firewall/waf/overrides/{overrides_id}`

Fetches the details of a URI-based WAF override.

**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).

### Path Parameters

- `zone_id: string`

  Defines an identifier.

- `overrides_id: string`

  The unique identifier of the WAF override.

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

- `result: Override`

  - `id: optional string`

    The unique identifier of the WAF override.

  - `description: optional string`

    An informative summary of the current URI-based WAF override.

  - `groups: optional map[unknown]`

    An object that allows you to enable or disable WAF rule groups for the current WAF override. Each key of this object must be the ID of a WAF rule group, and each value must be a valid WAF action (usually `default` or `disable`). When creating a new URI-based WAF override, you must provide a `groups` object or a `rules` object.

  - `paused: optional boolean`

    When true, indicates that the rule is currently paused.

  - `priority: optional number`

    The relative priority of the current URI-based WAF override when multiple overrides match a single URL. A lower number indicates higher priority. Higher priority overrides may overwrite values set by lower priority overrides.

  - `rewrite_action: optional RewriteAction`

    Specifies that, when a WAF rule matches, its configured action will be replaced by the action configured in this object.

    - `block: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

    - `challenge: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

    - `default: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

    - `disable: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

    - `simulate: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

  - `rules: optional WAFRule`

    An object that allows you to override the action of specific WAF rules. Each key of this object must be the ID of a WAF rule, and each value must be a valid WAF action. Unless you are disabling a rule, ensure that you also enable the rule group that this WAF rule belongs to. When creating a new URI-based WAF override, you must provide a `groups` object or a `rules` object.

    - `"challenge"`

    - `"block"`

    - `"simulate"`

    - `"disable"`

    - `"default"`

  - `urls: optional array of OverrideURL`

    The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/waf/overrides/$OVERRIDES_ID \
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
    "id": "de677e5818985db1285d0e80225f06e5",
    "description": "Enable Cloudflare Magento ruleset for shop.example.com",
    "groups": {
      "ea8687e59929c1fd05ba97574ad43f77": "bar"
    },
    "paused": true,
    "priority": 1,
    "rewrite_action": {
      "block": "challenge",
      "challenge": "challenge",
      "default": "challenge",
      "disable": "challenge",
      "simulate": "challenge"
    },
    "rules": {
      "100015": "disable"
    },
    "urls": [
      "shop.example.com/*"
    ]
  },
  "success": true
}
```

## Create a WAF override

**post** `/zones/{zone_id}/firewall/waf/overrides`

Creates a URI-based WAF override for a zone.

**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).

### Path Parameters

- `zone_id: string`

  Defines an identifier.

### Body Parameters

- `urls: array of OverrideURL`

  The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.

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

- `result: Override`

  - `id: optional string`

    The unique identifier of the WAF override.

  - `description: optional string`

    An informative summary of the current URI-based WAF override.

  - `groups: optional map[unknown]`

    An object that allows you to enable or disable WAF rule groups for the current WAF override. Each key of this object must be the ID of a WAF rule group, and each value must be a valid WAF action (usually `default` or `disable`). When creating a new URI-based WAF override, you must provide a `groups` object or a `rules` object.

  - `paused: optional boolean`

    When true, indicates that the rule is currently paused.

  - `priority: optional number`

    The relative priority of the current URI-based WAF override when multiple overrides match a single URL. A lower number indicates higher priority. Higher priority overrides may overwrite values set by lower priority overrides.

  - `rewrite_action: optional RewriteAction`

    Specifies that, when a WAF rule matches, its configured action will be replaced by the action configured in this object.

    - `block: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

    - `challenge: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

    - `default: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

    - `disable: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

    - `simulate: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

  - `rules: optional WAFRule`

    An object that allows you to override the action of specific WAF rules. Each key of this object must be the ID of a WAF rule, and each value must be a valid WAF action. Unless you are disabling a rule, ensure that you also enable the rule group that this WAF rule belongs to. When creating a new URI-based WAF override, you must provide a `groups` object or a `rules` object.

    - `"challenge"`

    - `"block"`

    - `"simulate"`

    - `"disable"`

    - `"default"`

  - `urls: optional array of OverrideURL`

    The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/waf/overrides \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "urls": [
            "shop.example.com/*"
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
    "id": "de677e5818985db1285d0e80225f06e5",
    "description": "Enable Cloudflare Magento ruleset for shop.example.com",
    "groups": {
      "ea8687e59929c1fd05ba97574ad43f77": "bar"
    },
    "paused": true,
    "priority": 1,
    "rewrite_action": {
      "block": "challenge",
      "challenge": "challenge",
      "default": "challenge",
      "disable": "challenge",
      "simulate": "challenge"
    },
    "rules": {
      "100015": "disable"
    },
    "urls": [
      "shop.example.com/*"
    ]
  },
  "success": true
}
```

## Update WAF override

**put** `/zones/{zone_id}/firewall/waf/overrides/{overrides_id}`

Updates an existing URI-based WAF override.

**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).

### Path Parameters

- `zone_id: string`

  Defines an identifier.

- `overrides_id: string`

  The unique identifier of the WAF override.

### Body Parameters

- `id: string`

  Defines an identifier.

- `rewrite_action: RewriteAction`

  Specifies that, when a WAF rule matches, its configured action will be replaced by the action configured in this object.

  - `block: optional "challenge" or "block" or "simulate" or 2 more`

    The WAF rule action to apply.

    - `"challenge"`

    - `"block"`

    - `"simulate"`

    - `"disable"`

    - `"default"`

  - `challenge: optional "challenge" or "block" or "simulate" or 2 more`

    The WAF rule action to apply.

    - `"challenge"`

    - `"block"`

    - `"simulate"`

    - `"disable"`

    - `"default"`

  - `default: optional "challenge" or "block" or "simulate" or 2 more`

    The WAF rule action to apply.

    - `"challenge"`

    - `"block"`

    - `"simulate"`

    - `"disable"`

    - `"default"`

  - `disable: optional "challenge" or "block" or "simulate" or 2 more`

    The WAF rule action to apply.

    - `"challenge"`

    - `"block"`

    - `"simulate"`

    - `"disable"`

    - `"default"`

  - `simulate: optional "challenge" or "block" or "simulate" or 2 more`

    The WAF rule action to apply.

    - `"challenge"`

    - `"block"`

    - `"simulate"`

    - `"disable"`

    - `"default"`

- `rules: WAFRule`

  An object that allows you to override the action of specific WAF rules. Each key of this object must be the ID of a WAF rule, and each value must be a valid WAF action. Unless you are disabling a rule, ensure that you also enable the rule group that this WAF rule belongs to. When creating a new URI-based WAF override, you must provide a `groups` object or a `rules` object.

  - `"challenge"`

  - `"block"`

  - `"simulate"`

  - `"disable"`

  - `"default"`

- `urls: array of OverrideURL`

  The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.

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

- `result: Override`

  - `id: optional string`

    The unique identifier of the WAF override.

  - `description: optional string`

    An informative summary of the current URI-based WAF override.

  - `groups: optional map[unknown]`

    An object that allows you to enable or disable WAF rule groups for the current WAF override. Each key of this object must be the ID of a WAF rule group, and each value must be a valid WAF action (usually `default` or `disable`). When creating a new URI-based WAF override, you must provide a `groups` object or a `rules` object.

  - `paused: optional boolean`

    When true, indicates that the rule is currently paused.

  - `priority: optional number`

    The relative priority of the current URI-based WAF override when multiple overrides match a single URL. A lower number indicates higher priority. Higher priority overrides may overwrite values set by lower priority overrides.

  - `rewrite_action: optional RewriteAction`

    Specifies that, when a WAF rule matches, its configured action will be replaced by the action configured in this object.

    - `block: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

    - `challenge: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

    - `default: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

    - `disable: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

    - `simulate: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

  - `rules: optional WAFRule`

    An object that allows you to override the action of specific WAF rules. Each key of this object must be the ID of a WAF rule, and each value must be a valid WAF action. Unless you are disabling a rule, ensure that you also enable the rule group that this WAF rule belongs to. When creating a new URI-based WAF override, you must provide a `groups` object or a `rules` object.

    - `"challenge"`

    - `"block"`

    - `"simulate"`

    - `"disable"`

    - `"default"`

  - `urls: optional array of OverrideURL`

    The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/waf/overrides/$OVERRIDES_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "id": "023e105f4ecef8ad9ca31a8372d0c353",
          "rewrite_action": {},
          "rules": {
            "100015": "disable"
          },
          "urls": [
            "shop.example.com/*"
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
    "id": "de677e5818985db1285d0e80225f06e5",
    "description": "Enable Cloudflare Magento ruleset for shop.example.com",
    "groups": {
      "ea8687e59929c1fd05ba97574ad43f77": "bar"
    },
    "paused": true,
    "priority": 1,
    "rewrite_action": {
      "block": "challenge",
      "challenge": "challenge",
      "default": "challenge",
      "disable": "challenge",
      "simulate": "challenge"
    },
    "rules": {
      "100015": "disable"
    },
    "urls": [
      "shop.example.com/*"
    ]
  },
  "success": true
}
```

## Delete a WAF override

**delete** `/zones/{zone_id}/firewall/waf/overrides/{overrides_id}`

Deletes an existing URI-based WAF override.

**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).

### Path Parameters

- `zone_id: string`

  Defines an identifier.

- `overrides_id: string`

  The unique identifier of the WAF override.

### Returns

- `result: optional object { id }`

  - `id: optional string`

    The unique identifier of the WAF override.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/waf/overrides/$OVERRIDES_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "de677e5818985db1285d0e80225f06e5"
  }
}
```

## Domain Types

### Override

- `Override object { id, description, groups, 5 more }`

  - `id: optional string`

    The unique identifier of the WAF override.

  - `description: optional string`

    An informative summary of the current URI-based WAF override.

  - `groups: optional map[unknown]`

    An object that allows you to enable or disable WAF rule groups for the current WAF override. Each key of this object must be the ID of a WAF rule group, and each value must be a valid WAF action (usually `default` or `disable`). When creating a new URI-based WAF override, you must provide a `groups` object or a `rules` object.

  - `paused: optional boolean`

    When true, indicates that the rule is currently paused.

  - `priority: optional number`

    The relative priority of the current URI-based WAF override when multiple overrides match a single URL. A lower number indicates higher priority. Higher priority overrides may overwrite values set by lower priority overrides.

  - `rewrite_action: optional RewriteAction`

    Specifies that, when a WAF rule matches, its configured action will be replaced by the action configured in this object.

    - `block: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

    - `challenge: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

    - `default: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

    - `disable: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

    - `simulate: optional "challenge" or "block" or "simulate" or 2 more`

      The WAF rule action to apply.

      - `"challenge"`

      - `"block"`

      - `"simulate"`

      - `"disable"`

      - `"default"`

  - `rules: optional WAFRule`

    An object that allows you to override the action of specific WAF rules. Each key of this object must be the ID of a WAF rule, and each value must be a valid WAF action. Unless you are disabling a rule, ensure that you also enable the rule group that this WAF rule belongs to. When creating a new URI-based WAF override, you must provide a `groups` object or a `rules` object.

    - `"challenge"`

    - `"block"`

    - `"simulate"`

    - `"disable"`

    - `"default"`

  - `urls: optional array of OverrideURL`

    The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.

### Override URL

- `OverrideURL = string`

### Rewrite Action

- `RewriteAction object { block, challenge, default, 2 more }`

  Specifies that, when a WAF rule matches, its configured action will be replaced by the action configured in this object.

  - `block: optional "challenge" or "block" or "simulate" or 2 more`

    The WAF rule action to apply.

    - `"challenge"`

    - `"block"`

    - `"simulate"`

    - `"disable"`

    - `"default"`

  - `challenge: optional "challenge" or "block" or "simulate" or 2 more`

    The WAF rule action to apply.

    - `"challenge"`

    - `"block"`

    - `"simulate"`

    - `"disable"`

    - `"default"`

  - `default: optional "challenge" or "block" or "simulate" or 2 more`

    The WAF rule action to apply.

    - `"challenge"`

    - `"block"`

    - `"simulate"`

    - `"disable"`

    - `"default"`

  - `disable: optional "challenge" or "block" or "simulate" or 2 more`

    The WAF rule action to apply.

    - `"challenge"`

    - `"block"`

    - `"simulate"`

    - `"disable"`

    - `"default"`

  - `simulate: optional "challenge" or "block" or "simulate" or 2 more`

    The WAF rule action to apply.

    - `"challenge"`

    - `"block"`

    - `"simulate"`

    - `"disable"`

    - `"default"`

### WAF Rule

- `WAFRule = map["challenge" or "block" or "simulate" or 2 more]`

  An object that allows you to override the action of specific WAF rules. Each key of this object must be the ID of a WAF rule, and each value must be a valid WAF action. Unless you are disabling a rule, ensure that you also enable the rule group that this WAF rule belongs to. When creating a new URI-based WAF override, you must provide a `groups` object or a `rules` object.

  - `"challenge"`

  - `"block"`

  - `"simulate"`

  - `"disable"`

  - `"default"`

### Override Delete Response

- `OverrideDeleteResponse object { id }`

  - `id: optional string`

    The unique identifier of the WAF override.

# Packages

## List WAF packages

**get** `/zones/{zone_id}/firewall/waf/packages`

Fetches WAF packages for a zone.

**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).

### Path Parameters

- `zone_id: string`

  Defines an identifier.

### Query Parameters

- `direction: optional "asc" or "desc"`

  The direction used to sort returned packages.

  - `"asc"`

  - `"desc"`

- `match: optional "any" or "all"`

  When set to `all`, all the search requirements must match. When set to `any`, only one of the search requirements has to match.

  - `"any"`

  - `"all"`

- `name: optional string`

  The name of the WAF package.

- `order: optional "name"`

  The field used to sort returned packages.

  - `"name"`

- `page: optional number`

  The page number of paginated results.

- `per_page: optional number`

  The number of packages per page.

### Returns

- `FirewallAPIResponseCollection object { errors, messages, result, 2 more }`

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

  - `result: array of unknown`

  - `success: true`

    Defines whether the API call was successful.

    - `true`

  - `result_info: optional object { count, page, per_page, total_count }`

    - `count: optional number`

      Defines the total number of results for the requested service.

    - `page: optional number`

      Defines the current page within paginated list of results.

    - `per_page: optional number`

      Defines the number of results per page of results.

    - `total_count: optional number`

      Defines the total results available without any search parameters.

- `Result object { result }`

  - `result: optional array of object { id, description, detection_mode, 3 more }  or object { id, description, detection_mode, 5 more }`

    - `FirewallPackageDefinition object { id, description, detection_mode, 3 more }`

      - `id: string`

        Defines an identifier.

      - `description: string`

        A summary of the purpose/function of the WAF package.

      - `detection_mode: "anomaly" or "traditional"`

        The mode that defines how rules within the package are evaluated during the course of a request. When a package uses anomaly detection mode (`anomaly` value), each rule is given a score when triggered. If the total score of all triggered rules exceeds the sensitivity defined in the WAF package, the action configured in the package will be performed. Traditional detection mode (`traditional` value) will decide the action to take when it is triggered by the request. If multiple rules are triggered, the action providing the highest protection will be applied (for example, a 'block' action will win over a 'challenge' action).

        - `"anomaly"`

        - `"traditional"`

      - `name: string`

        The name of the WAF package.

      - `zone_id: string`

        Defines an identifier.

      - `status: optional "active"`

        When set to `active`, indicates that the WAF package will be applied to the zone.

        - `"active"`

    - `FirewallAnomalyPackage object { id, description, detection_mode, 5 more }`

      - `id: string`

        Defines an identifier.

      - `description: string`

        A summary of the purpose/function of the WAF package.

      - `detection_mode: "anomaly" or "traditional"`

        When a WAF package uses anomaly detection, each rule is given a score when triggered. If the total score of all triggered rules exceeds the sensitivity defined on the WAF package, the action defined on the package will be taken.

        - `"anomaly"`

        - `"traditional"`

      - `name: string`

        The name of the WAF package.

      - `zone_id: string`

        Defines an identifier.

      - `action_mode: optional "simulate" or "block" or "challenge"`

        The default action performed by the rules in the WAF package.

        - `"simulate"`

        - `"block"`

        - `"challenge"`

      - `sensitivity: optional "high" or "medium" or "low" or "off"`

        The sensitivity of the WAF package.

        - `"high"`

        - `"medium"`

        - `"low"`

        - `"off"`

      - `status: optional "active"`

        When set to `active`, indicates that the WAF package will be applied to the zone.

        - `"active"`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/waf/packages \
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
    {}
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get a WAF package

**get** `/zones/{zone_id}/firewall/waf/packages/{package_id}`

Fetches the details of a WAF package.

**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).

### Path Parameters

- `zone_id: string`

  Defines an identifier.

- `package_id: string`

  Defines a package identifier.

### Returns

- `FirewallAPIResponseSingle object { errors, messages, result, success }`

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

    Defines whether the API call was successful.

    - `true`

- `Result object { result }`

  - `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/waf/packages/$PACKAGE_ID \
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

## Domain Types

### Package List Response

- `PackageListResponse = unknown`

### Package Get Response

- `PackageGetResponse = object { errors, messages, result, success }  or object { result }`

  - `FirewallAPIResponseSingle object { errors, messages, result, success }`

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

      Defines whether the API call was successful.

      - `true`

  - `Result object { result }`

    - `result: optional unknown`

# Groups

## List WAF rule groups

**get** `/zones/{zone_id}/firewall/waf/packages/{package_id}/groups`

Fetches the WAF rule groups in a WAF package.

**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).

### Path Parameters

- `zone_id: string`

  Defines an identifier of a schema.

- `package_id: string`

  Defines the unique identifier of a WAF package.

### Query Parameters

- `direction: optional "asc" or "desc"`

  Defines the direction used to sort returned rule groups.

  - `"asc"`

  - `"desc"`

- `match: optional "any" or "all"`

  Defines the condition for search requirements. When set to `all`, all the search requirements must match. When set to `any`, only one of the search requirements has to match.

  - `"any"`

  - `"all"`

- `mode: optional "on" or "off"`

  Defines the state of the rules contained in the rule group. When `on`, the rules in the group are configurable/usable.

  - `"on"`

  - `"off"`

- `name: optional string`

  Defines the name of the rule group.

- `order: optional "mode" or "rules_count"`

  Defines the field used to sort returned rule groups.

  - `"mode"`

  - `"rules_count"`

- `page: optional number`

  Defines the page number of paginated results.

- `per_page: optional number`

  Defines the number of rule groups per page.

- `rules_count: optional number`

  Defines the number of rules in the current rule group.

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

- `result: array of Group`

  - `id: string`

    Defines the unique identifier of the rule group.

  - `description: string`

    Defines an informative summary of what the rule group does.

  - `mode: "on" or "off"`

    Defines the state of the rules contained in the rule group. When `on`, the rules in the group are configurable/usable.

    - `"on"`

    - `"off"`

  - `name: string`

    Defines the name of the rule group.

  - `rules_count: number`

    Defines the number of rules in the current rule group.

  - `allowed_modes: optional array of "on" or "off"`

    Defines the available states for the rule group.

    - `"on"`

    - `"off"`

  - `modified_rules_count: optional number`

    Defines the number of rules within the group that have been modified from their default configuration.

  - `package_id: optional string`

    Defines the unique identifier of a WAF package.

- `success: true`

  Defines whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Defines the total number of results for the requested service.

  - `page: optional number`

    Defines the current page within paginated list of results.

  - `per_page: optional number`

    Defines the number of results per page of results.

  - `total_count: optional number`

    Defines the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/waf/packages/$PACKAGE_ID/groups \
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
      "id": "de677e5818985db1285d0e80225f06e5",
      "description": "Group designed to protect against IP addresses that are a threat and typically used to launch DDoS attacks",
      "mode": "on",
      "name": "Project Honey Pot",
      "rules_count": 10,
      "allowed_modes": [
        "on",
        "off"
      ],
      "modified_rules_count": 2,
      "package_id": "a25a9a7e9c00afc1fb2e0245519d725b"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get a WAF rule group

**get** `/zones/{zone_id}/firewall/waf/packages/{package_id}/groups/{group_id}`

Fetches the details of a WAF rule group.

**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).

### Path Parameters

- `zone_id: string`

  Defines an identifier of a schema.

- `package_id: string`

  Defines the unique identifier of a WAF package.

- `group_id: string`

  Defines the unique identifier of a WAF package.

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

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/waf/packages/$PACKAGE_ID/groups/$GROUP_ID \
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

## Update a WAF rule group

**patch** `/zones/{zone_id}/firewall/waf/packages/{package_id}/groups/{group_id}`

Updates a WAF rule group. You can update the state (`mode` parameter) of a rule group.

**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).

### Path Parameters

- `zone_id: string`

  Defines an identifier of a schema.

- `package_id: string`

  Defines the unique identifier of a WAF package.

- `group_id: string`

  Defines the unique identifier of a WAF package.

### Body Parameters

- `mode: optional "on" or "off"`

  Defines the state of the rules contained in the rule group. When `on`, the rules in the group are configurable/usable.

  - `"on"`

  - `"off"`

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

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/waf/packages/$PACKAGE_ID/groups/$GROUP_ID \
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
  "result": {},
  "success": true
}
```

## Domain Types

### Group

- `Group object { id, description, mode, 5 more }`

  - `id: string`

    Defines the unique identifier of the rule group.

  - `description: string`

    Defines an informative summary of what the rule group does.

  - `mode: "on" or "off"`

    Defines the state of the rules contained in the rule group. When `on`, the rules in the group are configurable/usable.

    - `"on"`

    - `"off"`

  - `name: string`

    Defines the name of the rule group.

  - `rules_count: number`

    Defines the number of rules in the current rule group.

  - `allowed_modes: optional array of "on" or "off"`

    Defines the available states for the rule group.

    - `"on"`

    - `"off"`

  - `modified_rules_count: optional number`

    Defines the number of rules within the group that have been modified from their default configuration.

  - `package_id: optional string`

    Defines the unique identifier of a WAF package.

### Group Get Response

- `GroupGetResponse = unknown or string`

  - `unknown`

  - `string`

### Group Edit Response

- `GroupEditResponse = unknown or string`

  - `unknown`

  - `string`

# Rules

## List WAF rules

**get** `/zones/{zone_id}/firewall/waf/packages/{package_id}/rules`

Fetches WAF rules in a WAF package.

**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).

### Path Parameters

- `zone_id: string`

  Defines an identifier of a schema.

- `package_id: string`

  Defines the unique identifier of a WAF package.

### Query Parameters

- `description: optional string`

  Defines the public description of the WAF rule.

- `direction: optional "asc" or "desc"`

  Defines the direction used to sort returned rules.

  - `"asc"`

  - `"desc"`

- `group_id: optional string`

  Defines the unique identifier of the rule group.

- `match: optional "any" or "all"`

  Defines the search requirements. When set to `all`, all the search requirements must match. When set to `any`, only one of the search requirements has to match.

  - `"any"`

  - `"all"`

- `mode: optional "DIS" or "CHL" or "BLK" or "SIM"`

  Defines the action/mode a rule has been overridden to perform.

  - `"DIS"`

  - `"CHL"`

  - `"BLK"`

  - `"SIM"`

- `order: optional "priority" or "group_id" or "description"`

  Defines the field used to sort returned rules.

  - `"priority"`

  - `"group_id"`

  - `"description"`

- `page: optional number`

  Defines the page number of paginated results.

- `per_page: optional number`

  Defines the number of rules per page.

- `priority: optional string`

  Defines the order in which the individual WAF rule is executed within its rule group.

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

- `result: array of object { id, allowed_modes, description, 4 more }  or object { id, allowed_modes, default_mode, 5 more }  or object { id, allowed_modes, description, 4 more }`

  - `WAFManagedRulesAnomalyRule object { id, allowed_modes, description, 4 more }`

    When triggered, anomaly detection WAF rules contribute to an overall threat score that will determine if a request is considered malicious. You can configure the total scoring threshold through the 'sensitivity' property of the WAF package.

    - `id: string`

      Defines the unique identifier of the WAF rule.

    - `allowed_modes: array of AllowedModesAnomaly`

      Defines the available modes for the current WAF rule. Applies to anomaly detection WAF rules.

      - `"on"`

      - `"off"`

    - `description: string`

      Defines the public description of the WAF rule.

    - `group: WAFRuleGroup`

      Defines the rule group to which the current WAF rule belongs.

      - `id: optional string`

        Defines the unique identifier of the rule group.

      - `name: optional string`

        Defines the name of the rule group.

    - `mode: AllowedModesAnomaly`

      Defines the mode anomaly. When set to `on`, the current WAF rule will be used when evaluating the request. Applies to anomaly detection WAF rules.

      - `"on"`

      - `"off"`

    - `package_id: string`

      Defines the unique identifier of a WAF package.

    - `priority: string`

      Defines the order in which the individual WAF rule is executed within its rule group.

  - `WAFManagedRulesTraditionalDenyRule object { id, allowed_modes, default_mode, 5 more }`

    When triggered, traditional WAF rules cause the firewall to immediately act upon the request based on the configuration of the rule. A 'deny' rule will immediately respond to the request based on the configured rule action/mode (for example, 'block') and no other rules will be processed.

    - `id: string`

      Defines the unique identifier of the WAF rule.

    - `allowed_modes: array of "default" or "disable" or "simulate" or 2 more`

      Defines the list of possible actions of the WAF rule when it is triggered.

      - `"default"`

      - `"disable"`

      - `"simulate"`

      - `"block"`

      - `"challenge"`

    - `default_mode: "disable" or "simulate" or "block" or "challenge"`

      Defines the default action/mode of a rule.

      - `"disable"`

      - `"simulate"`

      - `"block"`

      - `"challenge"`

    - `description: string`

      Defines the public description of the WAF rule.

    - `group: WAFRuleGroup`

      Defines the rule group to which the current WAF rule belongs.

    - `mode: "default" or "disable" or "simulate" or 2 more`

      Defines the action that the current WAF rule will perform when triggered. Applies to traditional (deny) WAF rules.

      - `"default"`

      - `"disable"`

      - `"simulate"`

      - `"block"`

      - `"challenge"`

    - `package_id: string`

      Defines the unique identifier of a WAF package.

    - `priority: string`

      Defines the order in which the individual WAF rule is executed within its rule group.

  - `WAFManagedRulesTraditionalAllowRule object { id, allowed_modes, description, 4 more }`

    When triggered, traditional WAF rules cause the firewall to immediately act on the request based on the rule configuration. An 'allow' rule will immediately allow the request and no other rules will be processed.

    - `id: string`

      Defines the unique identifier of the WAF rule.

    - `allowed_modes: array of "on" or "off"`

      Defines the available modes for the current WAF rule.

      - `"on"`

      - `"off"`

    - `description: string`

      Defines the public description of the WAF rule.

    - `group: WAFRuleGroup`

      Defines the rule group to which the current WAF rule belongs.

    - `mode: "on" or "off"`

      When set to `on`, the current rule will be used when evaluating the request. Applies to traditional (allow) WAF rules.

      - `"on"`

      - `"off"`

    - `package_id: string`

      Defines the unique identifier of a WAF package.

    - `priority: string`

      Defines the order in which the individual WAF rule is executed within its rule group.

- `success: true`

  Defines whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Defines the total number of results for the requested service.

  - `page: optional number`

    Defines the current page within paginated list of results.

  - `per_page: optional number`

    Defines the number of results per page of results.

  - `total_count: optional number`

    Defines the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/waf/packages/$PACKAGE_ID/rules \
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
      "id": "f939de3be84e66e757adcdcb87908023",
      "allowed_modes": [
        "on",
        "off"
      ],
      "description": "SQL injection prevention for SELECT statements",
      "group": {
        "id": "de677e5818985db1285d0e80225f06e5",
        "name": "Project Honey Pot"
      },
      "mode": "on",
      "package_id": "a25a9a7e9c00afc1fb2e0245519d725b",
      "priority": "priority"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get a WAF rule

**get** `/zones/{zone_id}/firewall/waf/packages/{package_id}/rules/{rule_id}`

Fetches the details of a WAF rule in a WAF package.

**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).

### Path Parameters

- `zone_id: string`

  Defines an identifier of a schema.

- `package_id: string`

  Defines the unique identifier of a WAF package.

- `rule_id: string`

  Defines the unique identifier of a WAF package.

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

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/waf/packages/$PACKAGE_ID/rules/$RULE_ID \
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

## Update a WAF rule

**patch** `/zones/{zone_id}/firewall/waf/packages/{package_id}/rules/{rule_id}`

Updates a WAF rule. You can only update the mode/action of the rule.

**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).

### Path Parameters

- `zone_id: string`

  Defines an identifier of a schema.

- `package_id: string`

  Defines the unique identifier of a WAF package.

- `rule_id: string`

  Defines the unique identifier of a WAF package.

### Body Parameters

- `mode: optional "default" or "disable" or "simulate" or 4 more`

  Defines the mode/action of the rule when triggered. You must use a value from the `allowed_modes` array of the current rule.

  - `"default"`

  - `"disable"`

  - `"simulate"`

  - `"block"`

  - `"challenge"`

  - `"on"`

  - `"off"`

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

- `result: object { id, allowed_modes, description, 4 more }  or object { id, allowed_modes, default_mode, 5 more }  or object { id, allowed_modes, description, 4 more }`

  When triggered, anomaly detection WAF rules contribute to an overall threat score that will determine if a request is considered malicious. You can configure the total scoring threshold through the 'sensitivity' property of the WAF package.

  - `WAFManagedRulesAnomalyRule object { id, allowed_modes, description, 4 more }`

    When triggered, anomaly detection WAF rules contribute to an overall threat score that will determine if a request is considered malicious. You can configure the total scoring threshold through the 'sensitivity' property of the WAF package.

    - `id: string`

      Defines the unique identifier of the WAF rule.

    - `allowed_modes: array of AllowedModesAnomaly`

      Defines the available modes for the current WAF rule. Applies to anomaly detection WAF rules.

      - `"on"`

      - `"off"`

    - `description: string`

      Defines the public description of the WAF rule.

    - `group: WAFRuleGroup`

      Defines the rule group to which the current WAF rule belongs.

      - `id: optional string`

        Defines the unique identifier of the rule group.

      - `name: optional string`

        Defines the name of the rule group.

    - `mode: AllowedModesAnomaly`

      Defines the mode anomaly. When set to `on`, the current WAF rule will be used when evaluating the request. Applies to anomaly detection WAF rules.

      - `"on"`

      - `"off"`

    - `package_id: string`

      Defines the unique identifier of a WAF package.

    - `priority: string`

      Defines the order in which the individual WAF rule is executed within its rule group.

  - `WAFManagedRulesTraditionalDenyRule object { id, allowed_modes, default_mode, 5 more }`

    When triggered, traditional WAF rules cause the firewall to immediately act upon the request based on the configuration of the rule. A 'deny' rule will immediately respond to the request based on the configured rule action/mode (for example, 'block') and no other rules will be processed.

    - `id: string`

      Defines the unique identifier of the WAF rule.

    - `allowed_modes: array of "default" or "disable" or "simulate" or 2 more`

      Defines the list of possible actions of the WAF rule when it is triggered.

      - `"default"`

      - `"disable"`

      - `"simulate"`

      - `"block"`

      - `"challenge"`

    - `default_mode: "disable" or "simulate" or "block" or "challenge"`

      Defines the default action/mode of a rule.

      - `"disable"`

      - `"simulate"`

      - `"block"`

      - `"challenge"`

    - `description: string`

      Defines the public description of the WAF rule.

    - `group: WAFRuleGroup`

      Defines the rule group to which the current WAF rule belongs.

    - `mode: "default" or "disable" or "simulate" or 2 more`

      Defines the action that the current WAF rule will perform when triggered. Applies to traditional (deny) WAF rules.

      - `"default"`

      - `"disable"`

      - `"simulate"`

      - `"block"`

      - `"challenge"`

    - `package_id: string`

      Defines the unique identifier of a WAF package.

    - `priority: string`

      Defines the order in which the individual WAF rule is executed within its rule group.

  - `WAFManagedRulesTraditionalAllowRule object { id, allowed_modes, description, 4 more }`

    When triggered, traditional WAF rules cause the firewall to immediately act on the request based on the rule configuration. An 'allow' rule will immediately allow the request and no other rules will be processed.

    - `id: string`

      Defines the unique identifier of the WAF rule.

    - `allowed_modes: array of "on" or "off"`

      Defines the available modes for the current WAF rule.

      - `"on"`

      - `"off"`

    - `description: string`

      Defines the public description of the WAF rule.

    - `group: WAFRuleGroup`

      Defines the rule group to which the current WAF rule belongs.

    - `mode: "on" or "off"`

      When set to `on`, the current rule will be used when evaluating the request. Applies to traditional (allow) WAF rules.

      - `"on"`

      - `"off"`

    - `package_id: string`

      Defines the unique identifier of a WAF package.

    - `priority: string`

      Defines the order in which the individual WAF rule is executed within its rule group.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/waf/packages/$PACKAGE_ID/rules/$RULE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "mode": "on"
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
    "id": "f939de3be84e66e757adcdcb87908023",
    "allowed_modes": [
      "on",
      "off"
    ],
    "description": "SQL injection prevention for SELECT statements",
    "group": {
      "id": "de677e5818985db1285d0e80225f06e5",
      "name": "Project Honey Pot"
    },
    "mode": "on",
    "package_id": "a25a9a7e9c00afc1fb2e0245519d725b",
    "priority": "priority"
  },
  "success": true
}
```

## Domain Types

### Allowed Modes Anomaly

- `AllowedModesAnomaly = "on" or "off"`

  Defines the mode anomaly. When set to `on`, the current WAF rule will be used when evaluating the request. Applies to anomaly detection WAF rules.

  - `"on"`

  - `"off"`

### WAF Rule Group

- `WAFRuleGroup object { id, name }`

  Defines the rule group to which the current WAF rule belongs.

  - `id: optional string`

    Defines the unique identifier of the rule group.

  - `name: optional string`

    Defines the name of the rule group.

### Rule List Response

- `RuleListResponse = object { id, allowed_modes, description, 4 more }  or object { id, allowed_modes, default_mode, 5 more }  or object { id, allowed_modes, description, 4 more }`

  When triggered, anomaly detection WAF rules contribute to an overall threat score that will determine if a request is considered malicious. You can configure the total scoring threshold through the 'sensitivity' property of the WAF package.

  - `WAFManagedRulesAnomalyRule object { id, allowed_modes, description, 4 more }`

    When triggered, anomaly detection WAF rules contribute to an overall threat score that will determine if a request is considered malicious. You can configure the total scoring threshold through the 'sensitivity' property of the WAF package.

    - `id: string`

      Defines the unique identifier of the WAF rule.

    - `allowed_modes: array of AllowedModesAnomaly`

      Defines the available modes for the current WAF rule. Applies to anomaly detection WAF rules.

      - `"on"`

      - `"off"`

    - `description: string`

      Defines the public description of the WAF rule.

    - `group: WAFRuleGroup`

      Defines the rule group to which the current WAF rule belongs.

      - `id: optional string`

        Defines the unique identifier of the rule group.

      - `name: optional string`

        Defines the name of the rule group.

    - `mode: AllowedModesAnomaly`

      Defines the mode anomaly. When set to `on`, the current WAF rule will be used when evaluating the request. Applies to anomaly detection WAF rules.

      - `"on"`

      - `"off"`

    - `package_id: string`

      Defines the unique identifier of a WAF package.

    - `priority: string`

      Defines the order in which the individual WAF rule is executed within its rule group.

  - `WAFManagedRulesTraditionalDenyRule object { id, allowed_modes, default_mode, 5 more }`

    When triggered, traditional WAF rules cause the firewall to immediately act upon the request based on the configuration of the rule. A 'deny' rule will immediately respond to the request based on the configured rule action/mode (for example, 'block') and no other rules will be processed.

    - `id: string`

      Defines the unique identifier of the WAF rule.

    - `allowed_modes: array of "default" or "disable" or "simulate" or 2 more`

      Defines the list of possible actions of the WAF rule when it is triggered.

      - `"default"`

      - `"disable"`

      - `"simulate"`

      - `"block"`

      - `"challenge"`

    - `default_mode: "disable" or "simulate" or "block" or "challenge"`

      Defines the default action/mode of a rule.

      - `"disable"`

      - `"simulate"`

      - `"block"`

      - `"challenge"`

    - `description: string`

      Defines the public description of the WAF rule.

    - `group: WAFRuleGroup`

      Defines the rule group to which the current WAF rule belongs.

    - `mode: "default" or "disable" or "simulate" or 2 more`

      Defines the action that the current WAF rule will perform when triggered. Applies to traditional (deny) WAF rules.

      - `"default"`

      - `"disable"`

      - `"simulate"`

      - `"block"`

      - `"challenge"`

    - `package_id: string`

      Defines the unique identifier of a WAF package.

    - `priority: string`

      Defines the order in which the individual WAF rule is executed within its rule group.

  - `WAFManagedRulesTraditionalAllowRule object { id, allowed_modes, description, 4 more }`

    When triggered, traditional WAF rules cause the firewall to immediately act on the request based on the rule configuration. An 'allow' rule will immediately allow the request and no other rules will be processed.

    - `id: string`

      Defines the unique identifier of the WAF rule.

    - `allowed_modes: array of "on" or "off"`

      Defines the available modes for the current WAF rule.

      - `"on"`

      - `"off"`

    - `description: string`

      Defines the public description of the WAF rule.

    - `group: WAFRuleGroup`

      Defines the rule group to which the current WAF rule belongs.

    - `mode: "on" or "off"`

      When set to `on`, the current rule will be used when evaluating the request. Applies to traditional (allow) WAF rules.

      - `"on"`

      - `"off"`

    - `package_id: string`

      Defines the unique identifier of a WAF package.

    - `priority: string`

      Defines the order in which the individual WAF rule is executed within its rule group.

### Rule Get Response

- `RuleGetResponse = unknown or string`

  - `unknown`

  - `string`

### Rule Edit Response

- `RuleEditResponse = object { id, allowed_modes, description, 4 more }  or object { id, allowed_modes, default_mode, 5 more }  or object { id, allowed_modes, description, 4 more }`

  When triggered, anomaly detection WAF rules contribute to an overall threat score that will determine if a request is considered malicious. You can configure the total scoring threshold through the 'sensitivity' property of the WAF package.

  - `WAFManagedRulesAnomalyRule object { id, allowed_modes, description, 4 more }`

    When triggered, anomaly detection WAF rules contribute to an overall threat score that will determine if a request is considered malicious. You can configure the total scoring threshold through the 'sensitivity' property of the WAF package.

    - `id: string`

      Defines the unique identifier of the WAF rule.

    - `allowed_modes: array of AllowedModesAnomaly`

      Defines the available modes for the current WAF rule. Applies to anomaly detection WAF rules.

      - `"on"`

      - `"off"`

    - `description: string`

      Defines the public description of the WAF rule.

    - `group: WAFRuleGroup`

      Defines the rule group to which the current WAF rule belongs.

      - `id: optional string`

        Defines the unique identifier of the rule group.

      - `name: optional string`

        Defines the name of the rule group.

    - `mode: AllowedModesAnomaly`

      Defines the mode anomaly. When set to `on`, the current WAF rule will be used when evaluating the request. Applies to anomaly detection WAF rules.

      - `"on"`

      - `"off"`

    - `package_id: string`

      Defines the unique identifier of a WAF package.

    - `priority: string`

      Defines the order in which the individual WAF rule is executed within its rule group.

  - `WAFManagedRulesTraditionalDenyRule object { id, allowed_modes, default_mode, 5 more }`

    When triggered, traditional WAF rules cause the firewall to immediately act upon the request based on the configuration of the rule. A 'deny' rule will immediately respond to the request based on the configured rule action/mode (for example, 'block') and no other rules will be processed.

    - `id: string`

      Defines the unique identifier of the WAF rule.

    - `allowed_modes: array of "default" or "disable" or "simulate" or 2 more`

      Defines the list of possible actions of the WAF rule when it is triggered.

      - `"default"`

      - `"disable"`

      - `"simulate"`

      - `"block"`

      - `"challenge"`

    - `default_mode: "disable" or "simulate" or "block" or "challenge"`

      Defines the default action/mode of a rule.

      - `"disable"`

      - `"simulate"`

      - `"block"`

      - `"challenge"`

    - `description: string`

      Defines the public description of the WAF rule.

    - `group: WAFRuleGroup`

      Defines the rule group to which the current WAF rule belongs.

    - `mode: "default" or "disable" or "simulate" or 2 more`

      Defines the action that the current WAF rule will perform when triggered. Applies to traditional (deny) WAF rules.

      - `"default"`

      - `"disable"`

      - `"simulate"`

      - `"block"`

      - `"challenge"`

    - `package_id: string`

      Defines the unique identifier of a WAF package.

    - `priority: string`

      Defines the order in which the individual WAF rule is executed within its rule group.

  - `WAFManagedRulesTraditionalAllowRule object { id, allowed_modes, description, 4 more }`

    When triggered, traditional WAF rules cause the firewall to immediately act on the request based on the rule configuration. An 'allow' rule will immediately allow the request and no other rules will be processed.

    - `id: string`

      Defines the unique identifier of the WAF rule.

    - `allowed_modes: array of "on" or "off"`

      Defines the available modes for the current WAF rule.

      - `"on"`

      - `"off"`

    - `description: string`

      Defines the public description of the WAF rule.

    - `group: WAFRuleGroup`

      Defines the rule group to which the current WAF rule belongs.

    - `mode: "on" or "off"`

      When set to `on`, the current rule will be used when evaluating the request. Applies to traditional (allow) WAF rules.

      - `"on"`

      - `"off"`

    - `package_id: string`

      Defines the unique identifier of a WAF package.

    - `priority: string`

      Defines the order in which the individual WAF rule is executed within its rule group.
