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
