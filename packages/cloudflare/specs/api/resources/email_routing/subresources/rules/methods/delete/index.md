## Delete routing rule

**delete** `/zones/{zone_id}/email/routing/rules/{rule_identifier}`

Delete a specific routing rule.

### Path Parameters

- `zone_id: string`

  Identifier.

- `rule_identifier: string`

  Routing rule identifier.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional EmailRoutingRule`

  - `id: optional string`

    Routing rule identifier.

  - `actions: optional array of Action`

    List actions patterns.

    - `type: "drop" or "forward" or "worker"`

      Type of supported action.

      - `"drop"`

      - `"forward"`

      - `"worker"`

    - `value: optional array of string`

  - `enabled: optional true or false`

    Routing rule status.

    - `true`

    - `false`

  - `matchers: optional array of Matcher`

    Matching patterns to forward to your actions.

    - `type: "all" or "literal"`

      Type of matcher.

      - `"all"`

      - `"literal"`

    - `field: optional "to"`

      Field for type matcher.

      - `"to"`

    - `value: optional string`

      Value for matcher.

  - `name: optional string`

    Routing rule name.

  - `priority: optional number`

    Priority of the routing rule.

  - `source: optional "api" or "wrangler"`

    Who manages the rule. `api` covers dashboard, generic API, and Terraform;
    `wrangler` means the rule is managed by a Worker's wrangler.jsonc. Defaults
    to `api` when omitted on write.

    - `"api"`

    - `"wrangler"`

  - `tag: optional string`

    Routing rule tag. (Deprecated, replaced by routing rule identifier)

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/rules/$RULE_IDENTIFIER \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "success": true,
  "result": {
    "id": "a7e6fb77503c41d8a7f3113c6918f10c",
    "actions": [
      {
        "type": "forward",
        "value": [
          "destinationaddress@example.net"
        ]
      }
    ],
    "enabled": true,
    "matchers": [
      {
        "type": "literal",
        "field": "to",
        "value": "test@example.com"
      }
    ],
    "name": "Send to user@example.net rule.",
    "priority": 0,
    "source": "api",
    "tag": "a7e6fb77503c41d8a7f3113c6918f10c"
  }
}
```
