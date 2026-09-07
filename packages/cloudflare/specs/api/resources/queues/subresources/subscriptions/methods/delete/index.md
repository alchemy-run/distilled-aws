## Delete Event Subscription

**delete** `/accounts/{account_id}/event_subscriptions/subscriptions/{subscription_id}`

Delete an existing event subscription

### Path Parameters

- `account_id: string`

  A Resource identifier.

- `subscription_id: string`

  A Resource identifier.

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional object { id, created_at, destination, 5 more }`

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

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/event_subscriptions/subscriptions/$SUBSCRIPTION_ID \
    -X DELETE \
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
  "result": {
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
  },
  "success": true
}
```
