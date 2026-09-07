## Edit global schema validation settings

**patch** `/zones/{zone_id}/schema_validation/settings`

Partially updates global schema validation settings for a zone using PATCH semantics.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `validation_default_mitigation_action: optional "none" or "log" or "block"`

  The default mitigation action used
  Mitigation actions are as follows:

  - `"log"` - log request when request does not conform to schema
  - `"block"` - deny access to the site when request does not conform to schema
  - `"none"` - skip running schema validation

  - `"none"`

  - `"log"`

  - `"block"`

- `validation_override_mitigation_action: optional "none"`

  When set, this overrides both zone level and operation level mitigation actions.

  - `"none"` - skip running schema validation entirely for the request
  - `null` - clears any existing override

  - `"none"`

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { validation_default_mitigation_action, validation_override_mitigation_action }`

  - `validation_default_mitigation_action: "none" or "log" or "block"`

    The default mitigation action used

    Mitigation actions are as follows:

    - `log` - log request when request does not conform to schema
    - `block` - deny access to the site when request does not conform to schema
    - `none` - skip running schema validation

    - `"none"`

    - `"log"`

    - `"block"`

  - `validation_override_mitigation_action: optional "none"`

    When not null, this overrides global both zone level and operation level mitigation actions. This can serve as a quick way to disable schema validation for the whole zone.

    - `"none"` will skip running schema validation entirely for the request

    - `"none"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/settings \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "validation_default_mitigation_action": "block"
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
    "validation_default_mitigation_action": "block",
    "validation_override_mitigation_action": "none"
  },
  "success": true
}
```
