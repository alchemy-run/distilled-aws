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
