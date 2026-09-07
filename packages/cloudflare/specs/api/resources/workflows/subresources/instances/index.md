# Instances

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

## Batch create new Workflow instances

**post** `/accounts/{account_id}/workflows/{workflow_name}/instances/batch`

Creates multiple workflow instances in a single batch operation.

### Path Parameters

- `account_id: string`

- `workflow_name: string`

### Body Parameters

- `body: optional array of object { instance_id, instance_retention, params }`

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

- `result: array of object { id, status, version_id, 2 more }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workflows/$WORKFLOW_NAME/instances/batch \
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
  "result": [
    {
      "id": "x",
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

## Get full step output from instance

**get** `/accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}/step`

Retrieves the full, untruncated output for a specific step on a workflow instance. Returns a flat status-shaped JSON body with step `status` ('running' | 'waiting' | 'complete' | 'errored'), `error` (nullable), and `output` (the step value, or null while running/waiting/errored). When the step returned a ReadableStream from step.do, the response is served as 'application/octet-stream' with the raw bytes as the body instead of JSON. A `status='running'` response with non-null `error` indicates the step is currently retrying after a prior attempt failed.

### Path Parameters

- `account_id: string`

- `workflow_name: string`

- `instance_id: string`

  Instance identifier. User-created instances match `^[a-zA-Z0-9_][a-zA-Z0-9-_]*$` (max 100 characters); cron-triggered instances can use a longer, system-generated id derived from the cron expression.

### Query Parameters

- `name: string`

  Exact step name from the instance logs response, including the generated counter suffix.

- `type: "step" or "waitForEvent"`

  Step type to disambiguate step.do and waitForEvent entries that share the same name.

  - `"step"`

  - `"waitForEvent"`

- `attempt: optional number`

  Specific attempt number to retrieve output or error for.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { error, status, output }`

  - `error: object { message, name }`

    Error details when status='errored'; null otherwise.

    - `message: string`

    - `name: string`

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

  - `output: optional unknown`

    Full step output or waitForEvent payload without truncation. Sensitive outputs are returned as '[REDACTED]'. Populated when status='complete'. May be a ReadableStream when the step returned one from step.do; stream outputs are served as application/octet-stream rather than JSON.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workflows/$WORKFLOW_NAME/instances/$INSTANCE_ID/step \
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
    "error": {
      "message": "message",
      "name": "name"
    },
    "status": "queued",
    "output": {}
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

## Domain Types

### Instance List Response

- `InstanceListResponse object { id, created_on, ended_on, 6 more }`

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

### Instance Get Response

- `InstanceGetResponse object { end, error, output, 11 more }`

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

### Instance Create Response

- `InstanceCreateResponse object { id, status, version_id, 2 more }`

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

### Instance Bulk Response

- `InstanceBulkResponse object { id, status, version_id, 2 more }`

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

### Instance Step Response

- `InstanceStepResponse object { error, status, output }`

  - `error: object { message, name }`

    Error details when status='errored'; null otherwise.

    - `message: string`

    - `name: string`

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

  - `output: optional unknown`

    Full step output or waitForEvent payload without truncation. Sensitive outputs are returned as '[REDACTED]'. Populated when status='complete'. May be a ReadableStream when the step returned one from step.do; stream outputs are served as application/octet-stream rather than JSON.

# Status

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

## Domain Types

### Status Edit Response

- `StatusEditResponse object { status, timestamp }`

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

# Events

## Send event to instance

**post** `/accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}/events/{event_type}`

Sends an event to a running workflow instance to trigger state transitions.

### Path Parameters

- `account_id: string`

- `workflow_name: string`

- `instance_id: string`

  Instance identifier. User-created instances match `^[a-zA-Z0-9_][a-zA-Z0-9-_]*$` (max 100 characters); cron-triggered instances can use a longer, system-generated id derived from the cron expression.

- `event_type: string`

### Body Parameters

- `body: optional unknown`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `success: true`

  - `true`

- `result: optional unknown`

- `result_info: optional object { count, per_page, total_count, 3 more }`

  - `count: number`

  - `per_page: number`

  - `total_count: number`

  - `cursor: optional string`

  - `page: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workflows/$WORKFLOW_NAME/instances/$INSTANCE_ID/events/$EVENT_TYPE \
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
  "success": true,
  "result": {},
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

## Domain Types

### Event Create Response

- `EventCreateResponse = unknown`
