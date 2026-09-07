## List all email scanner rules

**get** `/accounts/{account_id}/dlp/email/rules`

Lists all email scanner rules for an account.

### Path Parameters

- `account_id: string`

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

- `result: optional array of object { action, conditions, created_at, 6 more }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/email/rules \
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
  "success": true,
  "result": [
    {
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
  ]
}
```
