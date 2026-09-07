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
