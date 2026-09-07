## Update configuration for risk behaviors

**put** `/accounts/{account_id}/zt_risk_scoring/behaviors`

Updates risk score behavior configurations, defining weights and thresholds for risk calculation.

### Path Parameters

- `account_id: string`

### Body Parameters

- `behaviors: map[object { enabled, risk_level } ]`

  - `enabled: boolean`

  - `risk_level: "low" or "medium" or "high"`

    - `"low"`

    - `"medium"`

    - `"high"`

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

- `result: optional object { behaviors }`

  - `behaviors: map[object { enabled, risk_level } ]`

    - `enabled: boolean`

    - `risk_level: "low" or "medium" or "high"`

      - `"low"`

      - `"medium"`

      - `"high"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zt_risk_scoring/behaviors \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "behaviors": {
            "foo": {
              "enabled": true,
              "risk_level": "low"
            }
          }
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
    "behaviors": {
      "foo": {
        "enabled": true,
        "risk_level": "low"
      }
    }
  }
}
```
