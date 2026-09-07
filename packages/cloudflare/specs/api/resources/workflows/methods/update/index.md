## Create/modify Workflow

**put** `/accounts/{account_id}/workflows/{workflow_name}`

Creates a new workflow or updates an existing workflow definition.

### Path Parameters

- `account_id: string`

- `workflow_name: string`

### Body Parameters

- `class_name: string`

- `script_name: string`

- `limits: optional object { steps }`

  - `steps: optional number`

- `schedules: optional array of object { cron }`

  - `cron: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { id, class_name, created_on, 7 more }`

  - `id: string`

  - `class_name: string`

  - `created_on: string`

  - `is_deleted: number`

  - `modified_on: string`

  - `name: string`

  - `script_name: string`

  - `terminator_running: number`

  - `triggered_on: string`

  - `version_id: string`

- `success: true`

  - `true`

- `result_info: optional object { count, per_page, total_count, 3 more }`

  - `count: number`

  - `per_page: number`

  - `total_count: number`

  - `cursor: optional string`

  - `page: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workflows/$WORKFLOW_NAME \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "class_name": "x",
          "script_name": "x"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "class_name": "class_name",
    "created_on": "2019-12-27T18:11:19.117Z",
    "is_deleted": 0,
    "modified_on": "2019-12-27T18:11:19.117Z",
    "name": "x",
    "script_name": "script_name",
    "terminator_running": 0,
    "triggered_on": "2019-12-27T18:11:19.117Z",
    "version_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  },
  "success": true,
  "result_info": {
    "count": 0,
    "per_page": 0,
    "total_count": 0,
    "cursor": "cursor",
    "page": 0,
    "total_pages": 0
  }
}
```
