## List Internal DNS Views

**get** `/accounts/{account_id}/dns_settings/views`

List DNS Internal Views for an Account

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional "asc" or "desc"`

  Direction to order DNS views in.

  - `"asc"`

  - `"desc"`

- `match: optional "any" or "all"`

  Whether to match all search requirements or at least one (any). If set to `all`, acts like a logical AND between filters. If set to `any`, acts like a logical OR instead.

  - `"any"`

  - `"all"`

- `name: optional object { contains, endswith, exact, startswith }`

  - `contains: optional string`

    Substring of the DNS view name.

  - `endswith: optional string`

    Suffix of the DNS view name.

  - `exact: optional string`

    Exact value of the DNS view name.

  - `startswith: optional string`

    Prefix of the DNS view name.

- `order: optional "name" or "created_on" or "modified_on"`

  Field to order DNS views by.

  - `"name"`

  - `"created_on"`

  - `"modified_on"`

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of DNS views per page.

- `zone_id: optional string`

  A zone ID that exists in the zones list for the view.

- `zone_name: optional string`

  A zone name that exists in the zones list for the view.

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

- `result: optional array of object { id, created_time, modified_time, 2 more }`

  - `id: string`

    Identifier.

  - `created_time: string`

    When the view was created.

  - `modified_time: string`

    When the view was last modified.

  - `name: string`

    The name of the view.

  - `zones: array of string`

    The list of zones linked to this view.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_settings/views \
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_time": "2014-01-01T05:20:00.12345Z",
      "modified_time": "2014-01-01T05:20:00.12345Z",
      "name": "my view",
      "zones": [
        "372e67954025e0ba6aaa6d586b9e0b59"
      ]
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
