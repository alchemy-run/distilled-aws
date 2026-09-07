## List account stores

**get** `/accounts/{account_id}/secrets_store/stores`

Lists all the stores in an account

### Path Parameters

- `account_id: string`

  Account Identifier

### Query Parameters

- `direction: optional "asc" or "desc"`

  Direction to sort objects

  - `"asc"`

  - `"desc"`

- `order: optional "name" or "comment" or "created" or 2 more`

  Order secrets by values in the given field

  - `"name"`

  - `"comment"`

  - `"created"`

  - `"modified"`

  - `"status"`

- `page: optional number`

  Page number

- `per_page: optional number`

  Number of objects to return per page

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

- `result: optional array of object { id, created, modified, 2 more }`

  - `id: string`

    Store Identifier

  - `created: string`

    Whenthe secret was created.

  - `modified: string`

    When the secret was modified.

  - `name: string`

    The name of the store

  - `account_id: optional string`

    Account Identifier

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secrets_store/stores \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
      "created": "2023-09-21T18:56:32.624632Z",
      "modified": "2023-09-21T18:56:32.624632Z",
      "name": "service_x_keys",
      "account_id": "985e105f4ecef8ad9ca31a8372d0c353"
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
