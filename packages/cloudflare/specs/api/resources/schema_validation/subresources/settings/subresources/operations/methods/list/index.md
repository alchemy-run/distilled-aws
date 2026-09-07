## List per-operation schema validation settings

**get** `/zones/{zone_id}/schema_validation/settings/operations`

Lists all per-operation schema validation settings configured for the zone.

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

- `result: array of object { mitigation_action, operation_id }`

  - `mitigation_action: "log" or "block" or "none"`

    When set, this applies a mitigation action to this operation which supersedes a global schema validation setting just for this operation

    - `"log"` - log request when request does not conform to schema for this operation
    - `"block"` - deny access to the site when request does not conform to schema for this operation
    - `"none"` - will skip mitigation for this operation

    - `"log"`

    - `"block"`

    - `"none"`

  - `operation_id: string`

    UUID.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/settings/operations \
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
      "mitigation_action": "block",
      "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
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
