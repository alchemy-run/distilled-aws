## List DEX Rules

**get** `/accounts/{account_id}/dex/rules`

List DEX Rules.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

### Query Parameters

- `page: number`

  Page number of paginated results.

- `per_page: number`

  Number of results per page.

- `name: optional string`

  Filter results by rule name.

- `sort_by: optional "name" or "created_at" or "updated_at"`

  Which property to sort results by.

  - `"name"`

  - `"created_at"`

  - `"updated_at"`

- `sort_order: optional "ASC" or "DESC"`

  Sort direction for sort_by property.

  - `"ASC"`

  - `"DESC"`

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

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { rules }`

  - `rules: optional array of object { id, created_at, match, 4 more }`

    - `id: string`

      API Resource UUID tag.

    - `created_at: string`

    - `match: string`

    - `name: string`

    - `description: optional string`

    - `targeted_tests: optional array of object { data, enabled, name, test_id }`

      - `data: object { host, kind, method }`

        The configuration object which contains the details for the WARP client to conduct the test.

        - `host: string`

          The desired endpoint to test.

        - `kind: "http" or "traceroute"`

          The type of test.

          - `"http"`

          - `"traceroute"`

        - `method: optional "GET"`

          The HTTP request method type.

          - `"GET"`

      - `enabled: boolean`

      - `name: string`

      - `test_id: string`

    - `updated_at: optional string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/rules \
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
  "result": {
    "rules": [
      {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "created_at": "2023-07-16 15:00:00+00",
        "match": "match",
        "name": "name",
        "description": "description",
        "targeted_tests": [
          {
            "data": {
              "host": "https://dash.cloudflare.com",
              "kind": "http",
              "method": "GET"
            },
            "enabled": true,
            "name": "name",
            "test_id": "test_id"
          }
        ],
        "updated_at": "2023-07-16 15:00:00+00"
      }
    ]
  },
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```
