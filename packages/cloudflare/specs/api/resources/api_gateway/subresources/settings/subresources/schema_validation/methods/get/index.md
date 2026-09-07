## Retrieve zone level schema validation settings

**get** `/zones/{zone_id}/api_gateway/settings/schema_validation`

Retrieves zone level schema validation settings currently set on the zone

### Path Parameters

- `zone_id: string`

  Identifier.

### Returns

- `Settings object { validation_default_mitigation_action, validation_override_mitigation_action }`

  - `validation_default_mitigation_action: optional "none" or "log" or "block"`

    The default mitigation action used when there is no mitigation action defined on the operation

    Mitigation actions are as follows:

    * `log` - log request when request does not conform to schema
    * `block` - deny access to the site when request does not conform to schema

    A special value of of `none` will skip running schema validation entirely for the request when there is no mitigation action defined on the operation

    - `"none"`

    - `"log"`

    - `"block"`

  - `validation_override_mitigation_action: optional "none"`

    When set, this overrides both zone level and operation level mitigation actions.

    - `none` will skip running schema validation entirely for the request
    - `null` indicates that no override is in place

    - `"none"`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/settings/schema_validation \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "validation_default_mitigation_action": "block",
  "validation_override_mitigation_action": "none"
}
```
