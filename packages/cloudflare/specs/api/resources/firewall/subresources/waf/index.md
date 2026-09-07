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
