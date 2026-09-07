# Schemas

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

## Edit details of a schema to enable validation

**patch** `/zones/{zone_id}/schema_validation/schemas/{schema_id}`

Modifies an existing OpenAPI schema in API Shield, updating the validation rules for associated API operations.

### Path Parameters

- `zone_id: string`

  Identifier.

- `schema_id: string`

  UUID.

### Body Parameters

- `validation_enabled: optional boolean`

  Flag whether schema is enabled for validation.

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
    "source": "<schema file contents>",
    "validation_enabled": true
  },
  "success": true
}
```

## Delete a schema

**delete** `/zones/{zone_id}/schema_validation/schemas/{schema_id}`

Permanently removes an uploaded OpenAPI schema from API Shield. Operations using this schema will lose their validation rules.

### Path Parameters

- `zone_id: string`

  Identifier.

- `schema_id: string`

  UUID.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { id }`

  - `id: string`

    The ID of the schema that was just deleted

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/schemas/$SCHEMA_ID \
    -X DELETE \
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  },
  "success": true
}
```

## Domain Types

### Public Schema

- `PublicSchema object { created_at, kind, name, 3 more }`

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

### Schema Delete Response

- `SchemaDeleteResponse object { id }`

  - `id: string`

    The ID of the schema that was just deleted
