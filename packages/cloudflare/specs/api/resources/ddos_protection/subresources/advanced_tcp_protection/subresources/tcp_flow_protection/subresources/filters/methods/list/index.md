## List all TCP Flow Protection filters.

**get** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters`

List all TCP Flow Protection filters for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional string`

  The direction of ordering (ASC or DESC). Defaults to 'ASC'.

- `mode: optional string`

  The mode of the filters to get. Optional. Valid values: 'enabled', 'disabled', 'monitoring'.

- `order: optional string`

  The field to order by. Defaults to 'prefix'.

- `page: optional number`

  The page number for pagination. Defaults to 1.

- `per_page: optional number`

  The number of items per page. Must be between 10 and 1000. Defaults to 25.

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

- `result: optional array of object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters \
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
      "id": "id",
      "created_on": "2019-12-27T18:11:19.117Z",
      "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }",
      "mode": "mode",
      "modified_on": "2019-12-27T18:11:19.117Z"
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
