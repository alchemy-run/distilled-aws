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
