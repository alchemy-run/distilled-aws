## Enable validation for a schema

**patch** `/zones/{zone_id}/api_gateway/user_schemas/{schema_id}`

Activates schema validation for an uploaded OpenAPI schema. Requests to matching endpoints will be validated against the schema definitions.

### Path Parameters

- `zone_id: string`

  Identifier.

- `schema_id: string`

### Body Parameters

- `validation_enabled: optional true`

  Flag whether schema is enabled for validation.

  - `true`

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: OldPublicSchema`

  - `created_at: string`

  - `kind: "openapi_v3"`

    Kind of schema

    - `"openapi_v3"`

  - `name: string`

    Name of the schema

  - `schema_id: string`

    UUID.

  - `source: optional string`

    Source of the schema

  - `validation_enabled: optional boolean`

    Flag whether schema is enabled for validation.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/user_schemas/$SCHEMA_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "created_at": "2014-01-01T05:20:00.12345Z",
    "kind": "openapi_v3",
    "name": "petstore schema",
    "schema_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "source": "<schema file bytes>",
    "validation_enabled": true
  },
  "success": true
}
```
