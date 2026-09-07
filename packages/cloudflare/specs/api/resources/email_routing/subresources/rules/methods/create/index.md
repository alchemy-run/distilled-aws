## Create routing rule

**post** `/zones/{zone_id}/email/routing/rules`

Rules consist of a set of criteria for matching emails (such as an email being sent to a specific custom email address) plus a set of actions to take on the email (like forwarding it to a specific destination address). Forward actions require all destination addresses to be verified.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `actions: array of Action`

  List actions patterns.

  - `type: "drop" or "forward" or "worker"`

    Type of supported action.

    - `"drop"`

    - `"forward"`

    - `"worker"`

  - `value: optional array of string`

- `matchers: array of Matcher`

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

- `enabled: optional true or false`

  Routing rule status.

  - `true`

  - `false`

- `name: optional string`

  Routing rule name.

- `owner_worker_tag: optional string`

  Public tag (script_tag) of the Worker that owns this rule. Required when
  `source` is `wrangler`.

- `priority: optional number`

  Priority of the routing rule.

- `source: optional "api" or "wrangler"`

  Who manages the rule. `api` covers dashboard, generic API, and Terraform;
  `wrangler` means the rule is managed by a Worker's wrangler.jsonc. Defaults
  to `api` when omitted on write.

  - `"api"`

  - `"wrangler"`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/rules \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "actions": [
            {
              "type": "forward"
            }
          ],
          "matchers": [
            {
              "type": "literal"
            }
          ],
          "enabled": true,
          "name": "Send to user@example.net rule.",
          "owner_worker_tag": "a7e6fb77503c41d8a7f3113c6918f10c",
          "source": "api"
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
