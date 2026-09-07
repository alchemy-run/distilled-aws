## Get a zone token validation rule

**get** `/zones/{zone_id}/token_validation/rules/{rule_id}`

Get a zone token validation rule.

### Path Parameters

- `zone_id: string`

  Identifier.

- `rule_id: string`

  UUID.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: TokenValidationRule`

  A Token Validation rule that can enforce security policies using JWT Tokens.

  - `action: "log" or "block"`

    Action to take on requests that match operations included in `selector` and fail `expression`.

    - `"log"`

    - `"block"`

  - `description: string`

    A human-readable description that gives more details than `title`.

  - `enabled: boolean`

    Toggle rule on or off.

  - `expression: string`

    Rule expression. Requests that fail to match this expression will be subject to `action`.

    For details on expressions, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

  - `selector: object { exclude, include }`

    Select operations covered by this rule.

    For details on selectors, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

    - `exclude: optional array of object { operation_ids }`

      Ignore operations that were otherwise included by `include`.

      - `operation_ids: optional array of string`

        Excluded operation IDs.

    - `include: optional array of object { host }`

      Select all matching operations.

      - `host: optional array of string`

        Included hostnames.

  - `title: string`

    A human-readable name for the rule.

  - `id: optional string`

    UUID.

  - `created_at: optional string`

  - `last_updated: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/token_validation/rules/$RULE_ID \
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
    "action": "log",
    "description": "Long description for Token Validation Rule",
    "enabled": true,
    "expression": "is_jwt_valid(\"52973293-cb04-4a97-8f55-e7d2ad1107dd\") or is_jwt_valid(\"46eab8d1-6376-45e3-968f-2c649d77d423\")",
    "selector": {
      "exclude": [
        {
          "operation_ids": [
            "f9c5615e-fe15-48ce-bec6-cfc1946f1bec",
            "56828eae-035a-4396-ba07-51c66d680a04"
          ]
        }
      ],
      "include": [
        {
          "host": [
            "v1.example.com",
            "v2.example.com"
          ]
        }
      ]
    },
    "title": "Example Token Validation Rule",
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "last_updated": "2014-01-01T05:20:00.12345Z"
  },
  "success": true
}
```
