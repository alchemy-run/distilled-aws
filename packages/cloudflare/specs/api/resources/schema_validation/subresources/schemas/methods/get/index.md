## Get details of a schema

**get** `/zones/{zone_id}/schema_validation/schemas/{schema_id}`

Gets the contents and metadata of a specific OpenAPI schema uploaded to API Shield.

### Path Parameters

- `zone_id: string`

  Identifier.

- `schema_id: string`

  UUID.

### Query Parameters

- `omit_source: optional boolean`

  Omit the source-files of schemas and only retrieve their meta-data.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: PublicSchema`

  A schema used in schema validation

  - `created_at: string`

  - `kind: "openapi_v3"`

    The kind of the schema

    - `"openapi_v3"`

  - `name: string`

    A human-readable name for the schema

  - `schema_id: string`

    A unique identifier of this schema

  - `source: string`

    The raw schema, e.g., the OpenAPI schema, either as JSON or YAML

  - `validation_enabled: optional boolean`

    An indicator if this schema is enabled

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/schemas/$SCHEMA_ID \
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
    "created_at": "2014-01-01T05:20:00.12345Z",
    "kind": "openapi_v3",
    "name": "petstore schema",
    "schema_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "source": "<schema file contents>",
    "validation_enabled": true
  },
  "success": true
}
```
