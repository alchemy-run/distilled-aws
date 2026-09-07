## Search Workers

**get** `/accounts/{account_id}/workers/scripts-search`

Search for Workers in an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `id: optional string`

  Worker ID (also called tag) to search for. Only exact matches are returned.

- `name: optional string`

  Worker name to search for. Both exact and partial matches are returned.

- `order_by: optional "created_on" or "modified_on" or "name"`

  Property to sort results by. Results are sorted in ascending order.

  - `"created_on"`

  - `"modified_on"`

  - `"name"`

- `page: optional number`

  Current page.

- `per_page: optional number`

  Items per page.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: array of object { id, created_on, modified_on, 4 more }`

  - `id: string`

    Identifier.

  - `created_on: string`

    When the script was created.

  - `modified_on: string`

    When the script was last modified.

  - `script_name: string`

    Name of the script, used in URLs and route configuration.

  - `environment_is_default: optional boolean`

    Whether the environment is the default environment.

  - `environment_name: optional string`

    Name of the environment.

  - `service_name: optional string`

    Name of the service.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts-search \
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_on": "2017-01-01T00:00:00Z",
      "modified_on": "2017-01-01T00:00:00Z",
      "script_name": "this-is_my_script-01",
      "environment_is_default": true,
      "environment_name": "production",
      "service_name": "my-service"
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
