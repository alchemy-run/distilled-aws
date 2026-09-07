## Create a Web Analytics rule

**post** `/accounts/{account_id}/rum/v2/{ruleset_id}/rule`

Creates a new rule in a Web Analytics ruleset.

### Path Parameters

- `account_id: string`

  Identifier.

- `ruleset_id: string`

  The Web Analytics ruleset identifier.

### Body Parameters

- `host: optional string`

- `inclusive: optional boolean`

  Whether the rule includes or excludes traffic from being measured.

- `is_paused: optional boolean`

  Whether the rule is paused or not.

- `paths: optional array of string`

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

- `success: boolean`

  Whether the API call was successful.

- `result: optional RUMRule`

  - `id: optional string`

    The Web Analytics rule identifier.

  - `created: optional string`

  - `host: optional string`

    The hostname the rule will be applied to.

  - `inclusive: optional boolean`

    Whether the rule includes or excludes traffic from being measured.

  - `is_paused: optional boolean`

    Whether the rule is paused or not.

  - `paths: optional array of string`

    The paths the rule will be applied to.

  - `priority: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rum/v2/$RULESET_ID/rule \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "host": "example.com",
          "inclusive": true,
          "paths": [
            "*"
          ]
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created": "2014-01-01T05:20:00.12345Z",
    "host": "example.com",
    "inclusive": true,
    "is_paused": false,
    "paths": [
      "*"
    ],
    "priority": 1000
  }
}
```
