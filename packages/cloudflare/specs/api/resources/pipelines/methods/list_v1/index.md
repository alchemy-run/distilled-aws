## List Pipelines

**get** `/accounts/{account_id}/pipelines/v1/pipelines`

List/Filter Pipelines in Account.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

### Query Parameters

- `name: optional string`

  Filters pipelines by name (case-insensitive substring).

- `page: optional number`

- `per_page: optional number`

### Returns

- `result: array of object { id, created_at, modified_at, 3 more }`

  - `id: string`

    Indicates a unique identifier for this pipeline.

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

    Indicates the name of the Pipeline.

  - `sql: string`

    Specifies SQL for the Pipeline processing flow.

  - `status: string`

    Indicates the current status of the Pipeline.

- `result_info: object { count, page, per_page, total_count }`

  - `count: number`

    Indicates the number of items on current page.

  - `page: number`

    Indicates the current page number.

  - `per_page: number`

    Indicates the number of items per page.

  - `total_count: number`

    Indicates the total number of items.

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/pipelines \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "id": "01234567890123457689012345678901",
      "created_at": "created_at",
      "modified_at": "modified_at",
      "name": "my_pipeline",
      "sql": "insert into sink select * from source;",
      "status": "status"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 0,
    "per_page": 10,
    "total_count": 1
  },
  "success": true
}
```
