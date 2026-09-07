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
