# Items

## Get Zero Trust list items

**get** `/accounts/{account_id}/gateway/lists/{list_id}/items`

Fetch all items in a single Zero Trust list.

### Path Parameters

- `account_id: string`

- `list_id: string`

  Identify the API resource with a UUID.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional array of GatewayItem`

  Provide the list items.

  - `created_at: optional string`

  - `description: optional string`

    Provide the list item description (optional).

  - `value: optional string`

    Specify the item value.

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Shows the total results returned based on your search parameters.

  - `page: optional number`

    Show the current page within paginated list of results.

  - `per_page: optional number`

    Show the number of results per page of results.

  - `total_count: optional number`

    Show the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/lists/$LIST_ID/items \
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
      "description": "Austin office IP",
      "value": "8GE8721REF"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```
