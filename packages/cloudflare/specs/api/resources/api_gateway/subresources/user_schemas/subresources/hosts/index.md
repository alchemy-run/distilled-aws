# Hosts

## Retrieve schema hosts in a zone

**get** `/zones/{zone_id}/api_gateway/user_schemas/hosts`

Lists all unique hosts found in uploaded OpenAPI schemas for the zone. Useful for understanding which domains have schema coverage.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional array of object { created_at, hosts, name, schema_id }`

  - `created_at: string`

  - `hosts: array of string`

    Hosts serving the schema, e.g zone.host.com

  - `name: string`

    Name of the schema

  - `schema_id: string`

    UUID.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/user_schemas/hosts \
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
  "success": true,
  "result": [
    {
      "created_at": "2014-01-01T05:20:00.12345Z",
      "hosts": [
        "string"
      ],
      "name": "petstore schema",
      "schema_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Domain Types

### Host List Response

- `HostListResponse object { created_at, hosts, name, schema_id }`

  - `created_at: string`

  - `hosts: array of string`

    Hosts serving the schema, e.g zone.host.com

  - `name: string`

    Name of the schema

  - `schema_id: string`

    UUID.
