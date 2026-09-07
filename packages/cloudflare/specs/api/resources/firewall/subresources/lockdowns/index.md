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
