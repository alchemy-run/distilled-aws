## Upload a schema

**post** `/zones/{zone_id}/schema_validation/schemas`

Uploads a new OpenAPI schema for API Shield schema validation. The schema defines expected request/response formats for API endpoints.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `kind: "openapi_v3"`

  The kind of the schema

  - `"openapi_v3"`

- `name: string`

  A human-readable name for the schema

- `source: string`

  The raw schema, e.g., the OpenAPI schema, either as JSON or YAML

- `validation_enabled: boolean`

  An indicator if this schema is enabled

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

    A unique error code that describes the kind of issue with the schema

  - `message: string`

    A short text explaining the issue with the schema

  - `documentation_url: optional string`

  - `source: optional object { locations, pointer }`

    - `locations: optional array of string`

      A list of JSON path expression(s) that describe the location(s) of the issue within the provided resource. See <https://goessner.net/articles/JsonPath/> for JSONPath specification.

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

    A unique error code that describes the kind of issue with the schema

  - `message: string`

    A short text explaining the issue with the schema

  - `documentation_url: optional string`

  - `source: optional object { locations, pointer }`

    - `locations: optional array of string`

      A list of JSON path expression(s) that describe the location(s) of the issue within the provided resource. See <https://goessner.net/articles/JsonPath/> for JSONPath specification.

    - `pointer: optional string`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/schemas \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "kind": "openapi_v3",
          "name": "petstore schema",
          "source": "<schema file contents>",
          "validation_enabled": true
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
        "locations": [
          ".paths[\"/user/{username}\"].put"
        ],
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
        "locations": [
          ".paths[\"/user/{username}\"].put"
        ],
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
