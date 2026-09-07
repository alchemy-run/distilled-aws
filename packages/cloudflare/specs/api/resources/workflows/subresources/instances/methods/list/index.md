## List of workflow instances

**get** `/accounts/{account_id}/workflows/{workflow_name}/instances`

Lists all instances of a workflow with their execution status.

### Path Parameters

- `account_id: string`

- `workflow_name: string`

### Query Parameters

- `cursor: optional string`

  Opaque token for cursor-based pagination. Mutually exclusive with `page`.

- `date_end: optional string`

  Accepts ISO 8601 with no timezone offsets and in UTC.

- `date_start: optional string`

  Accepts ISO 8601 with no timezone offsets and in UTC.

- `direction: optional "asc" or "desc"`

  Defines the direction for cursor-based pagination.

  - `"asc"`

  - `"desc"`

- `page: optional number`

  Deprecated: use `cursor` for pagination instead.

- `per_page: optional number`

- `status: optional "queued" or "running" or "paused" or 6 more`

  - `"queued"`

  - `"running"`

  - `"paused"`

  - `"errored"`

  - `"terminated"`

  - `"complete"`

  - `"waitingForPause"`

  - `"waiting"`

  - `"rollingBack"`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: array of object { id, created_on, ended_on, 6 more }`

  - `id: string`

  - `created_on: string`

  - `ended_on: string`

  - `modified_on: string`

  - `started_on: string`

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

    Deprecated: total count is not reliable with cursor-based pagination.

  - `cursor: optional string`

  - `page: optional number`

    Deprecated: use cursor-based pagination instead.

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workflows/$WORKFLOW_NAME/instances \
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
  "result": [
    {
      "id": "x",
      "created_on": "2019-12-27T18:11:19.117Z",
      "ended_on": "2019-12-27T18:11:19.117Z",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "started_on": "2019-12-27T18:11:19.117Z",
      "status": "queued",
      "version_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "workflow_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "trigger_source": "unknown"
    }
  ],
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
