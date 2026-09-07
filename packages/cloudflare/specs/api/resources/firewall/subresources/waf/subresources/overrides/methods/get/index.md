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
