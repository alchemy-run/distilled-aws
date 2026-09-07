## Retrieve information about a specific schema on a zone

**get** `/zones/{zone_id}/api_gateway/user_schemas/{schema_id}`

Gets detailed information about a specific uploaded OpenAPI schema, including its contents and validation configuration.

### Path Parameters

- `zone_id: string`

  Identifier.

- `schema_id: string`

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
    "source": "<schema file bytes>",
    "validation_enabled": true
  },
  "success": true
}
```
