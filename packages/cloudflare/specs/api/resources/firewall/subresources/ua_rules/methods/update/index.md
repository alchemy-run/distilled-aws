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
