## Upload a schema to a zone

**post** `/zones/{zone_id}/api_gateway/user_schemas`

Uploads a new OpenAPI schema for API Shield schema validation. The schema defines expected request/response formats for API endpoints.

### Path Parameters

- `zone_id: string`

  Identifier.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { schema, upload_details }`

  - `schema: OldPublicSchema`

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

  - `upload_details: optional object { warnings }`

    - `warnings: optional array of object { code, locations, message }`

      Diagnostic warning events that occurred during processing. These events are non-critical errors found within the schema.

      - `code: number`

        Code that identifies the event that occurred.

      - `locations: optional array of string`

        JSONPath location(s) in the schema where these events were encountered.  See <https://goessner.net/articles/JsonPath/> for JSONPath specification.

      - `message: optional string`

        Diagnostic message that describes the event.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/user_schemas \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F 'file=@/path/to/file' \
    -F kind=openapi_v3 \
    -F name='petstore schema'
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
    "schema": {
      "created_at": "2014-01-01T05:20:00.12345Z",
      "kind": "openapi_v3",
      "name": "petstore schema",
      "schema_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "source": "<schema file bytes>",
      "validation_enabled": true
    },
    "upload_details": {
      "warnings": [
        {
          "code": 28,
          "locations": [
            ".paths[\"/user/{username}\"].put"
          ],
          "message": "unsupported media type: application/octet-stream"
        }
      ]
    }
  },
  "success": true
}
```
