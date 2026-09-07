# Versions

## List deployed Workflow versions

**get** `/accounts/{account_id}/workflows/{workflow_name}/versions`

Lists all deployed versions of a workflow.

### Path Parameters

- `account_id: string`

- `workflow_name: string`

### Query Parameters

- `page: optional number`

- `per_page: optional number`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: array of object { id, class_name, created_on, 5 more }`

  - `id: string`

  - `class_name: string`

  - `created_on: string`

  - `has_dag: boolean`

  - `language: "javascript" or "python"`

    The programming language of the workflow implementation

    - `"javascript"`

    - `"python"`

  - `modified_on: string`

  - `workflow_id: string`

  - `limits: optional object { steps }`

    - `steps: optional number`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workflows/$WORKFLOW_NAME/versions \
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
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "class_name": "class_name",
      "created_on": "2019-12-27T18:11:19.117Z",
      "has_dag": true,
      "language": "javascript",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "workflow_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "limits": {
        "steps": 1
      }
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

## Get Workflow version details

**get** `/accounts/{account_id}/workflows/{workflow_name}/versions/{version_id}`

Retrieves details for a specific deployed workflow version.

### Path Parameters

- `account_id: string`

- `workflow_name: string`

- `version_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { id, class_name, created_on, 5 more }`

  - `id: string`

  - `class_name: string`

  - `created_on: string`

  - `has_dag: boolean`

  - `language: "javascript" or "python"`

    The programming language of the workflow implementation

    - `"javascript"`

    - `"python"`

  - `modified_on: string`

  - `workflow_id: string`

  - `limits: optional object { steps }`

    - `steps: optional number`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workflows/$WORKFLOW_NAME/versions/$VERSION_ID \
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "class_name": "class_name",
    "created_on": "2019-12-27T18:11:19.117Z",
    "has_dag": true,
    "language": "javascript",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "workflow_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "limits": {
      "steps": 1
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

## Get Workflow version graph

**get** `/accounts/{account_id}/workflows/{workflow_name}/versions/{version_id}/graph`

Retrieves the graph visualization of a workflow version.

### Path Parameters

- `account_id: string`

- `workflow_name: string`

- `version_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { id, class_name, created_on, 3 more }`

  - `id: string`

  - `class_name: string`

  - `created_on: string`

  - `graph: object { version, workflow }`

    Versioned workflow graph payload.

    - `version: number`

    - `workflow: object { class_name, functions, nodes, payload }`

      A parsed workflow entrypoint with its step graph.

      - `class_name: string`

      - `functions: map[object { name, nodes, type } ]`

        - `name: string`

        - `nodes: array of unknown`

          Child nodes (recursive).

        - `type: "function_def"`

          - `"function_def"`

      - `nodes: array of object { duration, name, type, 2 more }  or object { config, name, nodes, 3 more }  or object { name, options, type, 3 more }  or 11 more`

        - `object { duration, name, type, 2 more }`

          - `duration: number or string`

            Duration as milliseconds (number) or human-readable string.

            - `number`

            - `string`

          - `name: string`

          - `type: "step_sleep"`

            - `"step_sleep"`

          - `resolves: optional number`

          - `starts: optional number`

        - `object { config, name, nodes, 3 more }`

          - `config: object { retries, timeout }`

            Configuration for a step (retries and timeout).

            - `retries: object { backoff, delay, limit }`

              Retry policy for a step.

              - `backoff: "constant" or "linear" or "exponential"`

                Backoff strategy for step retries.

                - `"constant"`

                - `"linear"`

                - `"exponential"`

              - `delay: number or string`

                Duration as milliseconds (number) or human-readable string.

                - `number`

                - `string`

              - `limit: number`

            - `timeout: number or string`

              Duration as milliseconds (number) or human-readable string.

              - `number`

              - `string`

          - `name: string`

          - `nodes: array of unknown`

            Child nodes (recursive).

          - `type: "step_do"`

            - `"step_do"`

          - `resolves: optional number`

          - `starts: optional number`

        - `object { name, options, type, 3 more }`

          - `name: string`

          - `options: object { event_type, timeout }`

            Options for a waitForEvent step.

            - `event_type: string`

            - `timeout: number or string`

              Duration as milliseconds (number) or human-readable string.

              - `number`

              - `string`

          - `type: "step_wait_for_event"`

            - `"step_wait_for_event"`

          - `payload: optional object { type }  or object { fields, type }`

            Shape descriptor for JSON payloads.

            - `Type object { type }`

              - `type: "unknown"`

                - `"unknown"`

            - `object { fields, type }`

              - `fields: map[unknown]`

                Nested JsonShape fields (recursive structure).

              - `type: "object"`

                - `"object"`

          - `resolves: optional number`

          - `starts: optional number`

        - `object { name, timestamp, type, 2 more }`

          - `name: string`

          - `timestamp: string`

          - `type: "step_sleep_until"`

            - `"step_sleep_until"`

          - `resolves: optional number`

          - `starts: optional number`

        - `object { nodes, type }`

          - `nodes: array of unknown`

            Child nodes (recursive).

          - `type: "loop"`

            - `"loop"`

        - `object { kind, nodes, type }`

          - `kind: "all" or "any" or "all_settled" or "race"`

            Parallel execution strategy.

            - `"all"`

            - `"any"`

            - `"all_settled"`

            - `"race"`

          - `nodes: array of unknown`

            Child nodes (recursive).

          - `type: "parallel"`

            - `"parallel"`

        - `object { catch_block, finally_block, try_block, type }`

          - `catch_block: object { nodes, type }`

            - `nodes: array of unknown`

              Child nodes (recursive).

            - `type: "block"`

              - `"block"`

          - `finally_block: object { nodes, type }`

            - `nodes: array of unknown`

              Child nodes (recursive).

            - `type: "block"`

              - `"block"`

          - `try_block: object { nodes, type }`

            - `nodes: array of unknown`

              Child nodes (recursive).

            - `type: "block"`

              - `"block"`

          - `type: "try"`

            - `"try"`

        - `object { nodes, type }`

          - `nodes: array of unknown`

            Child nodes (recursive).

          - `type: "block"`

            - `"block"`

        - `object { branches, type }`

          - `branches: array of object { condition, nodes }`

            - `condition: string`

            - `nodes: array of unknown`

              Child nodes (recursive).

          - `type: "if"`

            - `"if"`

        - `object { branches, discriminant, type }`

          - `branches: array of object { condition, nodes }`

            - `condition: string`

            - `nodes: array of unknown`

              Child nodes (recursive).

          - `discriminant: string`

          - `type: "switch"`

            - `"switch"`

        - `object { class_name, functions, nodes, 2 more }`

          - `class_name: string`

          - `functions: map[object { name, nodes, type } ]`

            - `name: string`

            - `nodes: array of unknown`

              Child nodes (recursive).

            - `type: "function_def"`

              - `"function_def"`

          - `nodes: array of unknown`

            Child nodes (recursive).

          - `type: "start"`

            - `"start"`

          - `payload: optional object { type }  or object { fields, type }`

            Shape descriptor for JSON payloads.

            - `Type object { type }`

              - `type: "unknown"`

                - `"unknown"`

            - `object { fields, type }`

              - `fields: map[unknown]`

                Nested JsonShape fields (recursive structure).

              - `type: "object"`

                - `"object"`

        - `object { name, type, resolves, starts }`

          - `name: string`

          - `type: "function_call"`

            - `"function_call"`

          - `resolves: optional number`

          - `starts: optional number`

        - `object { name, nodes, type }`

          - `name: string`

          - `nodes: array of unknown`

            Child nodes (recursive).

          - `type: "function_def"`

            - `"function_def"`

        - `object { kind, type }`

          - `kind: "break" or "return"`

            Break or return from a loop.

            - `"break"`

            - `"return"`

          - `type: "break"`

            - `"break"`

      - `payload: optional object { type }  or object { fields, type }`

        Shape descriptor for JSON payloads.

        - `Type object { type }`

          - `type: "unknown"`

            - `"unknown"`

        - `object { fields, type }`

          - `fields: map[unknown]`

            Nested JsonShape fields (recursive structure).

          - `type: "object"`

            - `"object"`

  - `modified_on: string`

  - `workflow_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workflows/$WORKFLOW_NAME/versions/$VERSION_ID/graph \
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "class_name": "class_name",
    "created_on": "2019-12-27T18:11:19.117Z",
    "graph": {
      "version": 0,
      "workflow": {
        "class_name": "class_name",
        "functions": {
          "foo": {
            "name": "name",
            "nodes": [
              {}
            ],
            "type": "function_def"
          }
        },
        "nodes": [
          {
            "duration": 0,
            "name": "name",
            "type": "step_sleep",
            "resolves": 0,
            "starts": 0
          }
        ],
        "payload": {
          "type": "unknown"
        }
      }
    },
    "modified_on": "2019-12-27T18:11:19.117Z",
    "workflow_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
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

### Version List Response

- `VersionListResponse object { id, class_name, created_on, 5 more }`

  - `id: string`

  - `class_name: string`

  - `created_on: string`

  - `has_dag: boolean`

  - `language: "javascript" or "python"`

    The programming language of the workflow implementation

    - `"javascript"`

    - `"python"`

  - `modified_on: string`

  - `workflow_id: string`

  - `limits: optional object { steps }`

    - `steps: optional number`

### Version Get Response

- `VersionGetResponse object { id, class_name, created_on, 5 more }`

  - `id: string`

  - `class_name: string`

  - `created_on: string`

  - `has_dag: boolean`

  - `language: "javascript" or "python"`

    The programming language of the workflow implementation

    - `"javascript"`

    - `"python"`

  - `modified_on: string`

  - `workflow_id: string`

  - `limits: optional object { steps }`

    - `steps: optional number`

### Version Graph Response

- `VersionGraphResponse object { id, class_name, created_on, 3 more }`

  - `id: string`

  - `class_name: string`

  - `created_on: string`

  - `graph: object { version, workflow }`

    Versioned workflow graph payload.

    - `version: number`

    - `workflow: object { class_name, functions, nodes, payload }`

      A parsed workflow entrypoint with its step graph.

      - `class_name: string`

      - `functions: map[object { name, nodes, type } ]`

        - `name: string`

        - `nodes: array of unknown`

          Child nodes (recursive).

        - `type: "function_def"`

          - `"function_def"`

      - `nodes: array of object { duration, name, type, 2 more }  or object { config, name, nodes, 3 more }  or object { name, options, type, 3 more }  or 11 more`

        - `object { duration, name, type, 2 more }`

          - `duration: number or string`

            Duration as milliseconds (number) or human-readable string.

            - `number`

            - `string`

          - `name: string`

          - `type: "step_sleep"`

            - `"step_sleep"`

          - `resolves: optional number`

          - `starts: optional number`

        - `object { config, name, nodes, 3 more }`

          - `config: object { retries, timeout }`

            Configuration for a step (retries and timeout).

            - `retries: object { backoff, delay, limit }`

              Retry policy for a step.

              - `backoff: "constant" or "linear" or "exponential"`

                Backoff strategy for step retries.

                - `"constant"`

                - `"linear"`

                - `"exponential"`

              - `delay: number or string`

                Duration as milliseconds (number) or human-readable string.

                - `number`

                - `string`

              - `limit: number`

            - `timeout: number or string`

              Duration as milliseconds (number) or human-readable string.

              - `number`

              - `string`

          - `name: string`

          - `nodes: array of unknown`

            Child nodes (recursive).

          - `type: "step_do"`

            - `"step_do"`

          - `resolves: optional number`

          - `starts: optional number`

        - `object { name, options, type, 3 more }`

          - `name: string`

          - `options: object { event_type, timeout }`

            Options for a waitForEvent step.

            - `event_type: string`

            - `timeout: number or string`

              Duration as milliseconds (number) or human-readable string.

              - `number`

              - `string`

          - `type: "step_wait_for_event"`

            - `"step_wait_for_event"`

          - `payload: optional object { type }  or object { fields, type }`

            Shape descriptor for JSON payloads.

            - `Type object { type }`

              - `type: "unknown"`

                - `"unknown"`

            - `object { fields, type }`

              - `fields: map[unknown]`

                Nested JsonShape fields (recursive structure).

              - `type: "object"`

                - `"object"`

          - `resolves: optional number`

          - `starts: optional number`

        - `object { name, timestamp, type, 2 more }`

          - `name: string`

          - `timestamp: string`

          - `type: "step_sleep_until"`

            - `"step_sleep_until"`

          - `resolves: optional number`

          - `starts: optional number`

        - `object { nodes, type }`

          - `nodes: array of unknown`

            Child nodes (recursive).

          - `type: "loop"`

            - `"loop"`

        - `object { kind, nodes, type }`

          - `kind: "all" or "any" or "all_settled" or "race"`

            Parallel execution strategy.

            - `"all"`

            - `"any"`

            - `"all_settled"`

            - `"race"`

          - `nodes: array of unknown`

            Child nodes (recursive).

          - `type: "parallel"`

            - `"parallel"`

        - `object { catch_block, finally_block, try_block, type }`

          - `catch_block: object { nodes, type }`

            - `nodes: array of unknown`

              Child nodes (recursive).

            - `type: "block"`

              - `"block"`

          - `finally_block: object { nodes, type }`

            - `nodes: array of unknown`

              Child nodes (recursive).

            - `type: "block"`

              - `"block"`

          - `try_block: object { nodes, type }`

            - `nodes: array of unknown`

              Child nodes (recursive).

            - `type: "block"`

              - `"block"`

          - `type: "try"`

            - `"try"`

        - `object { nodes, type }`

          - `nodes: array of unknown`

            Child nodes (recursive).

          - `type: "block"`

            - `"block"`

        - `object { branches, type }`

          - `branches: array of object { condition, nodes }`

            - `condition: string`

            - `nodes: array of unknown`

              Child nodes (recursive).

          - `type: "if"`

            - `"if"`

        - `object { branches, discriminant, type }`

          - `branches: array of object { condition, nodes }`

            - `condition: string`

            - `nodes: array of unknown`

              Child nodes (recursive).

          - `discriminant: string`

          - `type: "switch"`

            - `"switch"`

        - `object { class_name, functions, nodes, 2 more }`

          - `class_name: string`

          - `functions: map[object { name, nodes, type } ]`

            - `name: string`

            - `nodes: array of unknown`

              Child nodes (recursive).

            - `type: "function_def"`

              - `"function_def"`

          - `nodes: array of unknown`

            Child nodes (recursive).

          - `type: "start"`

            - `"start"`

          - `payload: optional object { type }  or object { fields, type }`

            Shape descriptor for JSON payloads.

            - `Type object { type }`

              - `type: "unknown"`

                - `"unknown"`

            - `object { fields, type }`

              - `fields: map[unknown]`

                Nested JsonShape fields (recursive structure).

              - `type: "object"`

                - `"object"`

        - `object { name, type, resolves, starts }`

          - `name: string`

          - `type: "function_call"`

            - `"function_call"`

          - `resolves: optional number`

          - `starts: optional number`

        - `object { name, nodes, type }`

          - `name: string`

          - `nodes: array of unknown`

            Child nodes (recursive).

          - `type: "function_def"`

            - `"function_def"`

        - `object { kind, type }`

          - `kind: "break" or "return"`

            Break or return from a loop.

            - `"break"`

            - `"return"`

          - `type: "break"`

            - `"break"`

      - `payload: optional object { type }  or object { fields, type }`

        Shape descriptor for JSON payloads.

        - `Type object { type }`

          - `type: "unknown"`

            - `"unknown"`

        - `object { fields, type }`

          - `fields: map[unknown]`

            Nested JsonShape fields (recursive structure).

          - `type: "object"`

            - `"object"`

  - `modified_on: string`

  - `workflow_id: string`
