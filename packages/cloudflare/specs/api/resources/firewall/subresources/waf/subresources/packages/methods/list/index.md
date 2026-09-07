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
