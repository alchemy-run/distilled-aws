## Change status of instance

**patch** `/accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}/status`

Changes the execution status of a workflow instance (e.g., pause, resume, terminate).

### Path Parameters

- `account_id: string`

- `workflow_name: string`

- `instance_id: string`

  Instance identifier. User-created instances match `^[a-zA-Z0-9_][a-zA-Z0-9-_]*$` (max 100 characters); cron-triggered instances can use a longer, system-generated id derived from the cron expression.

### Body Parameters

- `body: optional object { status }  or object { status }  or object { status, rollback }  or object { status, from }`

  - `Status object { status }`

    - `status: "pause"`

      - `"pause"`

  - `Status object { status }`

    - `status: "resume"`

      - `"resume"`

  - `object { status, rollback }`

    - `status: "terminate"`

      - `"terminate"`

    - `rollback: optional boolean`

      Run rollback before terminating.

  - `object { status, from }`

    - `status: "restart"`

      - `"restart"`

    - `from: optional object { name, count, type }`

      Step to restart from.

      - `name: string`

      - `count: optional number`

      - `type: optional "do" or "sleep" or "waitForEvent"`

        - `"do"`

        - `"sleep"`

        - `"waitForEvent"`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { status, timestamp }`

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

  - `timestamp: string`

    Accepts ISO 8601 with no timezone offsets and in UTC.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workflows/$WORKFLOW_NAME/instances/$INSTANCE_ID/status \
    -X PATCH \
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
    "status": "queued",
    "timestamp": "2019-12-27T18:11:19.117Z"
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
