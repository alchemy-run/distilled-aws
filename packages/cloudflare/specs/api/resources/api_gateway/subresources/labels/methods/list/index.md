## Retrieve all labels

**get** `/zones/{zone_id}/api_gateway/labels`

Retrieve all labels

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `direction: optional "asc" or "desc"`

  Direction to order results.

  - `"asc"`

  - `"desc"`

- `filter: optional string`

  Filter for labels where the name or description matches using substring match

- `order: optional "name" or "description" or "created_at" or 2 more`

  Field to order by

  - `"name"`

  - `"description"`

  - `"created_at"`

  - `"last_updated"`

  - `"mapped_resources.operations"`

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page.

- `source: optional "user" or "managed"`

  Filter for labels with source

  - `"user"`

  - `"managed"`

- `with_mapped_resource_counts: optional boolean`

  Include `mapped_resources` for each label

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: array of object { created_at, description, last_updated, 4 more }`

  - `created_at: string`

  - `description: string`

    The description of the label

  - `last_updated: string`

  - `metadata: unknown`

    Metadata for the label

  - `name: string`

    The name of the label

  - `source: "user" or "managed"`

    * `user` - label is owned by the user
    * `managed` - label is owned by cloudflare

    - `"user"`

    - `"managed"`

  - `mapped_resources: optional unknown`

    Provides counts of what resources are linked to this label

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/labels \
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
      "description": "All endpoints that deal with logins",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "metadata": {
        "foo": "bar"
      },
      "name": "login",
      "source": "user",
      "mapped_resources": {
        "operations": 29
      }
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
