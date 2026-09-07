## Get logs and status from instance

**get** `/accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}`

Retrieves logs and execution status for a specific workflow instance.

### Path Parameters

- `account_id: string`

- `workflow_name: string`

- `instance_id: string`

  Instance identifier. User-created instances match `^[a-zA-Z0-9_][a-zA-Z0-9-_]*$` (max 100 characters); cron-triggered instances can use a longer, system-generated id derived from the cron expression.

### Query Parameters

- `order: optional "asc" or "desc"`

  Step ordering: "asc" (default, oldest first) or "desc" (newest first).

  - `"asc"`

  - `"desc"`

- `simple: optional "true" or "false"`

  When true, omits step details and returns only metadata with step_count.

  - `"true"`

  - `"false"`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { end, error, output, 11 more }`

  - `end: string`

  - `error: object { message, name }`

    - `message: string`

    - `name: string`

  - `output: string or number`

    - `string`

    - `number`

  - `params: unknown`

  - `queued: string`

  - `rollback: object { error, outcome }`

    - `error: object { message, name }`

      - `message: string`

      - `name: string`

    - `outcome: "complete" or "failed"`

      - `"complete"`

      - `"failed"`

  - `start: string`

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

  - `step_count: number`

  - `steps: array of object { attempts, config, end, 5 more }  or object { end, error, finished, 3 more }  or object { trigger, type }  or object { end, error, finished, 4 more }`

    - `object { attempts, config, end, 5 more }`

      - `attempts: array of object { end, error, start, success }`

        - `end: string`

        - `error: object { message, name }`

          - `message: string`

          - `name: string`

        - `start: string`

        - `success: boolean`

      - `config: object { retries, timeout, sensitive }`

        - `retries: object { delay, limit, backoff }`

          - `delay: string or number`

            Specifies the delay duration. '[dynamic]' indicates the delay is computed by a user-supplied function.

            - `string`

            - `number`

          - `limit: number`

          - `backoff: optional "constant" or "linear" or "exponential"`

            - `"constant"`

            - `"linear"`

            - `"exponential"`

        - `timeout: string or number`

          Specifies the timeout duration.

          - `string`

          - `number`

        - `sensitive: optional "output"`

          When set to 'output', step output is redacted from log and step output responses.

          - `"output"`

      - `end: string`

      - `name: string`

      - `output: string`

      - `start: string`

      - `success: boolean`

      - `type: "step" or "rollback"`

        - `"step"`

        - `"rollback"`

    - `object { end, error, finished, 3 more }`

      - `end: string`

      - `error: object { message, name }`

        - `message: string`

        - `name: string`

      - `finished: boolean`

      - `name: string`

      - `start: string`

      - `type: "sleep"`

        - `"sleep"`

    - `object { trigger, type }`

      - `trigger: object { source }`

        - `source: string`

      - `type: "termination"`

        - `"termination"`

    - `object { end, error, finished, 4 more }`

      - `end: string`

      - `error: object { message, name }`

        - `message: string`

        - `name: string`

      - `finished: boolean`

      - `name: string`

      - `start: string`

      - `type: "waitForEvent"`

        - `"waitForEvent"`

      - `output: optional string`

  - `success: boolean`

  - `trigger: object { source }`

    - `source: "unknown" or "api" or "binding" or 2 more`

      - `"unknown"`

      - `"api"`

      - `"binding"`

      - `"event"`

      - `"cron"`

  - `versionId: string`

  - `schedule: optional object { cron, scheduledTime }`

    - `cron: string`

    - `scheduledTime: number`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workflows/$WORKFLOW_NAME/instances/$INSTANCE_ID \
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
    "end": "2019-12-27T18:11:19.117Z",
    "error": {
      "message": "message",
      "name": "name"
    },
    "output": "string",
    "params": {},
    "queued": "2019-12-27T18:11:19.117Z",
    "rollback": {
      "error": {
        "message": "message",
        "name": "name"
      },
      "outcome": "complete"
    },
    "start": "2019-12-27T18:11:19.117Z",
    "status": "queued",
    "step_count": 0,
    "steps": [
      {
        "attempts": [
          {
            "end": "2019-12-27T18:11:19.117Z",
            "error": {
              "message": "message",
              "name": "name"
            },
            "start": "2019-12-27T18:11:19.117Z",
            "success": true
          }
        ],
        "config": {
          "retries": {
            "delay": "string",
            "limit": 0,
            "backoff": "constant"
          },
          "timeout": "string",
          "sensitive": "output"
        },
        "end": "2019-12-27T18:11:19.117Z",
        "name": "name",
        "output": "output",
        "start": "2019-12-27T18:11:19.117Z",
        "success": true,
        "type": "step"
      }
    ],
    "success": true,
    "trigger": {
      "source": "unknown"
    },
    "versionId": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "schedule": {
      "cron": "cron",
      "scheduledTime": 0
    }
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
