## Update email scanner rule

**put** `/accounts/{account_id}/dlp/email/rules/{rule_id}`

Update email scanner rule

### Path Parameters

- `account_id: string`

- `rule_id: string`

### Body Parameters

- `action: object { action, message }`

  - `action: "Block"`

    - `"Block"`

  - `message: optional string`

- `conditions: array of object { operator, selector, value }`

  Triggered if all conditions match.

  - `operator: "InList" or "NotInList" or "MatchRegex" or "NotMatchRegex"`

    - `"InList"`

    - `"NotInList"`

    - `"MatchRegex"`

    - `"NotMatchRegex"`

  - `selector: "Recipients" or "Sender" or "DLPProfiles"`

    - `"Recipients"`

    - `"Sender"`

    - `"DLPProfiles"`

  - `value: array of string or string`

    - `array of string`

    - `string`

- `enabled: boolean`

- `name: string`

- `description: optional string`

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

- `result: optional object { action, conditions, created_at, 6 more }`

  - `action: object { action, message }`

    - `action: "Block"`

      - `"Block"`

    - `message: optional string`

  - `conditions: array of object { operator, selector, value }`

    Triggered if all conditions match.

    - `operator: "InList" or "NotInList" or "MatchRegex" or "NotMatchRegex"`

      - `"InList"`

      - `"NotInList"`

      - `"MatchRegex"`

      - `"NotMatchRegex"`

    - `selector: "Recipients" or "Sender" or "DLPProfiles"`

      - `"Recipients"`

      - `"Sender"`

      - `"DLPProfiles"`

    - `value: array of string or string`

      - `array of string`

      - `string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `priority: number`

  - `rule_id: string`

  - `updated_at: string`

  - `description: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/email/rules/$RULE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": {
            "action": "Block"
          },
          "conditions": [
            {
              "operator": "InList",
              "selector": "Recipients",
              "value": [
                "string"
              ]
            }
          ],
          "enabled": true,
          "name": "name"
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
    "action": {
      "action": "Block",
      "message": "message"
    },
    "conditions": [
      {
        "operator": "InList",
        "selector": "Recipients",
        "value": [
          "string"
        ]
      }
    ],
    "created_at": "2019-12-27T18:11:19.117Z",
    "enabled": true,
    "name": "name",
    "priority": 0,
    "rule_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description"
  }
}
```
