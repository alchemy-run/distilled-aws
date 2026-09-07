## List all uploaded schemas

**get** `/zones/{zone_id}/schema_validation/schemas`

Lists all OpenAPI schemas uploaded to API Shield with pagination support.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `omit_source: optional boolean`

  Omit the source-files of schemas and only retrieve their meta-data.

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page.

- `validation_enabled: optional boolean`

  Filter for enabled schemas

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: array of PublicSchema`

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

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/schemas \
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
  "result": [
    {
      "created_at": "2014-01-01T05:20:00.12345Z",
      "kind": "openapi_v3",
      "name": "petstore schema",
      "schema_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "source": "<schema file contents>",
      "validation_enabled": true
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```
