## Get per-operation schema validation setting

**get** `/zones/{zone_id}/schema_validation/settings/operations/{operation_id}`

Retrieves the schema validation settings configured for a specific API operation.

### Path Parameters

- `zone_id: string`

  Identifier.

- `operation_id: string`

  UUID.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { mitigation_action, operation_id }`

  - `mitigation_action: "log" or "block" or "none"`

    When set, this applies a mitigation action to this operation which supersedes a global schema validation setting just for this operation

    - `"log"` - log request when request does not conform to schema for this operation
    - `"block"` - deny access to the site when request does not conform to schema for this operation
    - `"none"` - will skip mitigation for this operation

    - `"log"`

    - `"block"`

    - `"none"`

  - `operation_id: string`

    UUID.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/settings/operations/$OPERATION_ID \
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
    "mitigation_action": "block",
    "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
  },
  "success": true
}
```
