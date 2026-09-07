## List token validation rules

**get** `/zones/{zone_id}/token_validation/rules`

List token validation rules

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `id: optional string`

  Select rules with these IDs.

- `action: optional "log" or "block"`

  Action to take on requests that match operations included in `selector` and fail `expression`.

  - `"log"`

  - `"block"`

- `enabled: optional boolean`

  Toggle rule on or off.

- `host: optional string`

  Select rules with this host in `include`.

- `hostname: optional string`

  Select rules with this host in `include`.

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page.

- `rule_id: optional string`

  Select rules with these IDs.

- `token_configuration: optional array of string`

  Select rules using any of these token configurations.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: array of TokenValidationRule`

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

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/token_validation/rules \
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
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```
