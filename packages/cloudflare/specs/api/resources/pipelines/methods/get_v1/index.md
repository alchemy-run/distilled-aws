## Get Pipeline Details

**get** `/accounts/{account_id}/pipelines/v1/pipelines/{pipeline_id}`

Get Pipelines Details.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

- `pipeline_id: string`

  Specifies the public ID of the pipeline.

### Returns

- `result: object { id, created_at, modified_at, 5 more }`

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

  - `tables: array of object { id, latest, name, 2 more }`

    List of streams and sinks used by this pipeline.

    - `id: string`

      Unique identifier for the connection (stream or sink).

    - `latest: number`

      Latest available version of the connection.

    - `name: string`

      Name of the connection.

    - `type: "stream" or "sink"`

      Type of the connection.

      - `"stream"`

      - `"sink"`

    - `version: number`

      Current version of the connection used by this pipeline.

  - `failure_reason: optional string`

    Indicates the reason for the failure of the Pipeline.

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/pipelines/$PIPELINE_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "status": "status",
    "tables": [
      {
        "id": "1c9200d5872c018bb34e93e2cd8a438e",
        "latest": 5,
        "name": "my_table",
        "type": "stream",
        "version": 4
      }
    ],
    "failure_reason": "failure_reason"
  },
  "success": true
}
```
