## Create Pipeline

**post** `/accounts/{account_id}/pipelines/v1/pipelines`

Create a new Pipeline.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

### Body Parameters

- `name: string`

  Specifies the name of the Pipeline.

- `sql: string`

  Specifies SQL for the Pipeline processing flow.

### Returns

- `result: object { id, created_at, modified_at, 3 more }`

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

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/pipelines \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "my_pipeline",
          "sql": "insert into sink select * from source;"
        }'
```

#### Response

```json
{
  "result": {
    "id": "01234567890123457689012345678901",
    "created_at": "created_at",
    "modified_at": "modified_at",
    "name": "my_pipeline",
    "sql": "insert into sink select * from source;",
    "status": "status"
  },
  "success": true
}
```
