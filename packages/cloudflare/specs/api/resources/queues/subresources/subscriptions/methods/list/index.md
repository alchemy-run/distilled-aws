## List Event Subscriptions

**get** `/accounts/{account_id}/event_subscriptions/subscriptions`

Get a paginated list of event subscriptions with optional sorting and filtering

### Path Parameters

- `account_id: string`

  A Resource identifier.

### Query Parameters

- `direction: optional "asc" or "desc"`

  Sort direction

  - `"asc"`

  - `"desc"`

- `order: optional "created_at" or "name" or "enabled" or "source"`

  Field to sort by

  - `"created_at"`

  - `"name"`

  - `"enabled"`

  - `"source"`

- `page: optional number`

  Page number for pagination

- `per_page: optional number`

  Number of items per page

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional array of object { id, created_at, destination, 5 more }`

  - `id: string`

    Unique identifier for the subscription

  - `created_at: string`

    When the subscription was created

  - `destination: object { queue_id, type }`

    Destination configuration for the subscription

    - `queue_id: string`

      ID of the target queue

    - `type: "queues.queue"`

      Type of destination

      - `"queues.queue"`

  - `enabled: boolean`

    Whether the subscription is active

  - `events: array of string`

    List of event types this subscription handles

  - `modified_at: string`

    When the subscription was last modified

  - `name: string`

    Name of the subscription

  - `source: object { type }  or object { type }  or object { type }  or 5 more`

    Source configuration for the subscription

    - `MqEventSourceImages object { type }`

      - `type: optional "images"`

        Type of source

        - `"images"`

    - `MqEventSourceKV object { type }`

      - `type: optional "kv"`

        Type of source

        - `"kv"`

    - `MqEventSourceR2 object { type }`

      - `type: optional "r2"`

        Type of source

        - `"r2"`

    - `MqEventSourceSuperSlurper object { type }`

      - `type: optional "superSlurper"`

        Type of source

        - `"superSlurper"`

    - `MqEventSourceVectorize object { type }`

      - `type: optional "vectorize"`

        Type of source

        - `"vectorize"`

    - `MqEventSourceWorkersAIModel object { model_name, type }`

      - `model_name: optional string`

        Name of the Workers AI model

      - `type: optional "workersAi.model"`

        Type of source

        - `"workersAi.model"`

    - `MqEventSourceWorkersBuildsWorker object { type, worker_name }`

      - `type: optional "workersBuilds.worker"`

        Type of source

        - `"workersBuilds.worker"`

      - `worker_name: optional string`

        Name of the worker

    - `MqEventSourceWorkflowsWorkflow object { type, workflow_name }`

      - `type: optional "workflows.workflow"`

        Type of source

        - `"workflows.workflow"`

      - `workflow_name: optional string`

        Name of the workflow

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: number`

    Number of items in current page

  - `page: number`

    Current page number

  - `per_page: number`

    Items per page

  - `total_count: number`

    Total number of items

  - `total_pages: number`

    Total number of pages

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/event_subscriptions/subscriptions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": [
    {
      "id": "id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "destination": {
        "queue_id": "queue_id",
        "type": "queues.queue"
      },
      "enabled": true,
      "events": [
        "string"
      ],
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "source": {
        "type": "images"
      }
    }
  ],
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0,
    "total_pages": 0
  },
  "success": true
}
```
