## Create a new workflow instance

**post** `/accounts/{account_id}/workflows/{workflow_name}/instances`

Creates a new instance of a workflow, starting its execution.

### Path Parameters

- `account_id: string`

- `workflow_name: string`

### Body Parameters

- `instance_id: optional string`

- `instance_retention: optional object { error_retention, success_retention }`

  - `error_retention: optional number or string`

    Specifies the duration in milliseconds or as a string like '5 minutes'.

    - `number`

      Specifies the duration in milliseconds.

    - `string`

  - `success_retention: optional number or string`

    Specifies the duration in milliseconds or as a string like '5 minutes'.

    - `number`

      Specifies the duration in milliseconds.

    - `string`

- `params: optional unknown`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { id, status, version_id, 2 more }`

  - `id: string`

  - `status: "queued" or "running" or "paused" or 6 more`

    - `"queued"`

    - `"running"`

    - `"paused"`

    - `"errored"`

    - `"terminated"`

    - `"complete"`

    - `"waitingForPause"`

    - `"waiting"`

    - `"rollingBack"`

  - `version_id: string`

  - `workflow_id: string`

  - `trigger_source: optional "unknown" or "api" or "binding" or 2 more`

    - `"unknown"`

    - `"api"`

    - `"binding"`

    - `"event"`

    - `"cron"`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workflows/$WORKFLOW_NAME/instances \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "id": "x",
    "status": "queued",
    "version_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "workflow_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "trigger_source": "unknown"
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
