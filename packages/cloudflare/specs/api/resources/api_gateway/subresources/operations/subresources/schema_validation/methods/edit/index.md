## Update multiple operation-level schema validation settings

**patch** `/zones/{zone_id}/api_gateway/operations/schema_validation`

Updates multiple operation-level schema validation settings on the zone

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `settings_multiple_request: SettingsMultipleRequest`

  - `mitigation_action: optional "log" or "block" or "none"`

    When set, this applies a mitigation action to this operation

    - `log` log request when request does not conform to schema for this operation
    - `block` deny access to the site when request does not conform to schema for this operation
    - `none` will skip mitigation for this operation
    - `null` indicates that no operation level mitigation is in place, see Zone Level Schema Validation Settings for mitigation action that will be applied

    - `"log"`

    - `"block"`

    - `"none"`

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: SettingsMultipleRequest`

  - `mitigation_action: optional "log" or "block" or "none"`

    When set, this applies a mitigation action to this operation

    - `log` log request when request does not conform to schema for this operation
    - `block` deny access to the site when request does not conform to schema for this operation
    - `none` will skip mitigation for this operation
    - `null` indicates that no operation level mitigation is in place, see Zone Level Schema Validation Settings for mitigation action that will be applied

    - `"log"`

    - `"block"`

    - `"none"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/operations/schema_validation \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "3818d821-5901-4147-a474-f5f5aec1d54e": {
            "mitigation_action": "log"
          },
          "b17c8043-99a0-4202-b7d9-8f7cdbee02cd": {
            "mitigation_action": "block"
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
  "result": {
    "3818d821-5901-4147-a474-f5f5aec1d54e": {
      "mitigation_action": "log"
    },
    "b17c8043-99a0-4202-b7d9-8f7cdbee02cd": {
      "mitigation_action": "block"
    }
  },
  "success": true
}
```
