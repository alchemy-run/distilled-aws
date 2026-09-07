## Update operation-level schema validation settings

**put** `/zones/{zone_id}/api_gateway/operations/{operation_id}/schema_validation`

Updates operation-level schema validation settings on the zone

### Path Parameters

- `zone_id: string`

  Identifier.

- `operation_id: string`

  UUID.

### Body Parameters

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

- `mitigation_action: optional "log" or "block" or "none"`

  When set, this applies a mitigation action to this operation

  - `log` log request when request does not conform to schema for this operation
  - `block` deny access to the site when request does not conform to schema for this operation
  - `none` will skip mitigation for this operation
  - `null` indicates that no operation level mitigation is in place, see Zone Level Schema Validation Settings for mitigation action that will be applied

  - `"log"`

  - `"block"`

  - `"none"`

- `operation_id: optional string`

  UUID.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/operations/$OPERATION_ID/schema_validation \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "mitigation_action": "block"
        }'
```

#### Response

```json
{
  "mitigation_action": "block",
  "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
}
```
