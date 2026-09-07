# Catch Alls

## Get catch-all rule

**get** `/zones/{zone_id}/email/routing/rules/catch_all`

Get information on the default catch-all routing rule.

### Path Parameters

- `zone_id: string`

  Identifier.

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

- `result: optional object { id, actions, enabled, 4 more }`

  - `id: optional string`

    Routing rule identifier.

  - `actions: optional array of CatchAllAction`

    List actions for the catch-all routing rule.

    - `type: "drop" or "forward" or "worker"`

      Type of action for catch-all rule.

      - `"drop"`

      - `"forward"`

      - `"worker"`

    - `value: optional array of string`

  - `enabled: optional true or false`

    Routing rule status.

    - `true`

    - `false`

  - `matchers: optional array of CatchAllMatcher`

    List of matchers for the catch-all routing rule.

    - `type: "all"`

      Type of matcher. Default is 'all'.

      - `"all"`

  - `name: optional string`

    Routing rule name.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/rules/catch_all \
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
        "type": "all"
      }
    ],
    "name": "Send to user@example.net rule.",
    "source": "api",
    "tag": "a7e6fb77503c41d8a7f3113c6918f10c"
  }
}
```

## Update catch-all rule

**put** `/zones/{zone_id}/email/routing/rules/catch_all`

Enable or disable catch-all routing rule, or change action to forward to specific destination address. Forward actions require all destination addresses to be verified.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `actions: array of CatchAllAction`

  List actions for the catch-all routing rule.

  - `type: "drop" or "forward" or "worker"`

    Type of action for catch-all rule.

    - `"drop"`

    - `"forward"`

    - `"worker"`

  - `value: optional array of string`

- `matchers: array of CatchAllMatcher`

  List of matchers for the catch-all routing rule.

  - `type: "all"`

    Type of matcher. Default is 'all'.

    - `"all"`

- `enabled: optional true or false`

  Routing rule status.

  - `true`

  - `false`

- `name: optional string`

  Routing rule name.

- `owner_worker_tag: optional string`

  Public tag (script_tag) of the Worker that owns this rule. Required when
  `source` is `wrangler`.

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

- `result: optional object { id, actions, enabled, 4 more }`

  - `id: optional string`

    Routing rule identifier.

  - `actions: optional array of CatchAllAction`

    List actions for the catch-all routing rule.

    - `type: "drop" or "forward" or "worker"`

      Type of action for catch-all rule.

      - `"drop"`

      - `"forward"`

      - `"worker"`

    - `value: optional array of string`

  - `enabled: optional true or false`

    Routing rule status.

    - `true`

    - `false`

  - `matchers: optional array of CatchAllMatcher`

    List of matchers for the catch-all routing rule.

    - `type: "all"`

      Type of matcher. Default is 'all'.

      - `"all"`

  - `name: optional string`

    Routing rule name.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/rules/catch_all \
    -X PUT \
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
              "type": "all"
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
        "type": "all"
      }
    ],
    "name": "Send to user@example.net rule.",
    "source": "api",
    "tag": "a7e6fb77503c41d8a7f3113c6918f10c"
  }
}
```

## Domain Types

### Catch All Action

- `CatchAllAction object { type, value }`

  Action for the catch-all routing rule.

  - `type: "drop" or "forward" or "worker"`

    Type of action for catch-all rule.

    - `"drop"`

    - `"forward"`

    - `"worker"`

  - `value: optional array of string`

### Catch All Matcher

- `CatchAllMatcher object { type }`

  Matcher for catch-all routing rule.

  - `type: "all"`

    Type of matcher. Default is 'all'.

    - `"all"`

### Catch All Get Response

- `CatchAllGetResponse object { id, actions, enabled, 4 more }`

  - `id: optional string`

    Routing rule identifier.

  - `actions: optional array of CatchAllAction`

    List actions for the catch-all routing rule.

    - `type: "drop" or "forward" or "worker"`

      Type of action for catch-all rule.

      - `"drop"`

      - `"forward"`

      - `"worker"`

    - `value: optional array of string`

  - `enabled: optional true or false`

    Routing rule status.

    - `true`

    - `false`

  - `matchers: optional array of CatchAllMatcher`

    List of matchers for the catch-all routing rule.

    - `type: "all"`

      Type of matcher. Default is 'all'.

      - `"all"`

  - `name: optional string`

    Routing rule name.

  - `source: optional "api" or "wrangler"`

    Who manages the rule. `api` covers dashboard, generic API, and Terraform;
    `wrangler` means the rule is managed by a Worker's wrangler.jsonc. Defaults
    to `api` when omitted on write.

    - `"api"`

    - `"wrangler"`

  - `tag: optional string`

    Routing rule tag. (Deprecated, replaced by routing rule identifier)

### Catch All Update Response

- `CatchAllUpdateResponse object { id, actions, enabled, 4 more }`

  - `id: optional string`

    Routing rule identifier.

  - `actions: optional array of CatchAllAction`

    List actions for the catch-all routing rule.

    - `type: "drop" or "forward" or "worker"`

      Type of action for catch-all rule.

      - `"drop"`

      - `"forward"`

      - `"worker"`

    - `value: optional array of string`

  - `enabled: optional true or false`

    Routing rule status.

    - `true`

    - `false`

  - `matchers: optional array of CatchAllMatcher`

    List of matchers for the catch-all routing rule.

    - `type: "all"`

      Type of matcher. Default is 'all'.

      - `"all"`

  - `name: optional string`

    Routing rule name.

  - `source: optional "api" or "wrangler"`

    Who manages the rule. `api` covers dashboard, generic API, and Terraform;
    `wrangler` means the rule is managed by a Worker's wrangler.jsonc. Defaults
    to `api` when omitted on write.

    - `"api"`

    - `"wrangler"`

  - `tag: optional string`

    Routing rule tag. (Deprecated, replaced by routing rule identifier)
