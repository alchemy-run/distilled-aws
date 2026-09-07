## List Workers

**get** `/accounts/{account_id}/workers/workers`

List all Workers for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `order: optional "asc" or "desc"`

  Sort direction.

  - `"asc"`

  - `"desc"`

- `order_by: optional "deployed_on" or "updated_on" or "created_on" or "name"`

  Property to sort results by.

  - `"deployed_on"`

  - `"updated_on"`

  - `"created_on"`

  - `"name"`

- `page: optional number`

  Current page.

- `per_page: optional number`

  Items per-page.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: array of Worker`

  - `id: string`

    Immutable ID of the Worker.

  - `created_on: string`

    When the Worker was created.

  - `logpush: boolean`

    Whether logpush is enabled for the Worker.

  - `name: string`

    Name of the Worker.

  - `observability: object { enabled, head_sampling_rate, logs, traces }`

    Observability settings for the Worker.

    - `enabled: optional boolean`

      Whether observability is enabled for the Worker.

    - `head_sampling_rate: optional number`

      The sampling rate for observability. From 0 to 1 (1 = 100%, 0.1 = 10%).

    - `logs: optional object { destinations, enabled, head_sampling_rate, 2 more }`

      Log settings for the Worker.

      - `destinations: optional array of string`

        A list of destinations where logs will be exported to.

      - `enabled: optional boolean`

        Whether logs are enabled for the Worker.

      - `head_sampling_rate: optional number`

        The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%).

      - `invocation_logs: optional boolean`

        Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.

      - `persist: optional boolean`

        Whether log persistence is enabled for the Worker.

    - `traces: optional object { destinations, enabled, head_sampling_rate, 2 more }`

      Trace settings for the Worker.

      - `destinations: optional array of string`

        A list of destinations where traces will be exported to.

      - `enabled: optional boolean`

        Whether traces are enabled for the Worker.

      - `head_sampling_rate: optional number`

        The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%).

      - `persist: optional boolean`

        Whether trace persistence is enabled for the Worker.

      - `propagation_policy: optional "authenticated" or "accept"`

        Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" (default) honors inbound trace context only when accompanied by a valid trace auth token. "accept" unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled.

        - `"authenticated"`

        - `"accept"`

  - `references: object { dispatch_namespace_outbounds, domains, durable_objects, 2 more }`

    Other resources that reference the Worker and depend on it existing.

    - `dispatch_namespace_outbounds: array of object { namespace_id, namespace_name, worker_id, worker_name }`

      Other Workers that reference the Worker as an outbound for a dispatch namespace.

      - `namespace_id: string`

        ID of the dispatch namespace.

      - `namespace_name: string`

        Name of the dispatch namespace.

      - `worker_id: string`

        ID of the Worker using the dispatch namespace.

      - `worker_name: string`

        Name of the Worker using the dispatch namespace.

    - `domains: array of object { id, certificate_id, hostname, 2 more }`

      Custom domains connected to the Worker.

      - `id: string`

        ID of the custom domain.

      - `certificate_id: string`

        ID of the TLS certificate issued for the custom domain.

      - `hostname: string`

        Full hostname of the custom domain, including the zone name.

      - `zone_id: string`

        ID of the zone.

      - `zone_name: string`

        Name of the zone.

    - `durable_objects: array of object { namespace_id, namespace_name, worker_id, worker_name }`

      Other Workers that reference Durable Object classes implemented by the Worker.

      - `namespace_id: string`

        ID of the Durable Object namespace being used.

      - `namespace_name: string`

        Name of the Durable Object namespace being used.

      - `worker_id: string`

        ID of the Worker using the Durable Object implementation.

      - `worker_name: string`

        Name of the Worker using the Durable Object implementation.

    - `queues: array of object { queue_consumer_id, queue_id, queue_name }`

      Queues that send messages to the Worker.

      - `queue_consumer_id: string`

        ID of the queue consumer configuration.

      - `queue_id: string`

        ID of the queue.

      - `queue_name: string`

        Name of the queue.

    - `workers: array of object { id, name }`

      Other Workers that reference the Worker using [service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/).

      - `id: string`

        ID of the referencing Worker.

      - `name: string`

        Name of the referencing Worker.

  - `subdomain: object { enabled, previews_enabled }`

    Subdomain settings for the Worker.

    - `enabled: optional boolean`

      Whether the *.workers.dev subdomain is enabled for the Worker.

    - `previews_enabled: optional boolean`

      Whether [preview URLs](https://developers.cloudflare.com/workers/configuration/previews/) are enabled for the Worker.

  - `tags: array of string`

    Tags associated with the Worker.

  - `tail_consumers: array of object { name }`

    Other Workers that should consume logs from the Worker.

    - `name: string`

      Name of the consumer Worker.

  - `updated_on: string`

    When the Worker was most recently updated.

  - `deployed_on: optional string`

    When the Worker's most recent deployment was created. `null` if the Worker has never been deployed.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/workers \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": [
    {
      "id": "e8f70fdbc8b1fb0b8ddb1af166186758",
      "created_on": "2019-12-27T18:11:19.117Z",
      "logpush": true,
      "name": "my-worker",
      "observability": {
        "enabled": true,
        "head_sampling_rate": 1,
        "logs": {
          "destinations": [
            "string"
          ],
          "enabled": true,
          "head_sampling_rate": 1,
          "invocation_logs": true,
          "persist": true
        },
        "traces": {
          "destinations": [
            "string"
          ],
          "enabled": true,
          "head_sampling_rate": 1,
          "persist": true,
          "propagation_policy": "authenticated"
        }
      },
      "references": {
        "dispatch_namespace_outbounds": [
          {
            "namespace_id": "e8f70fdbc8b1fb0b8ddb1af166186758",
            "namespace_name": "my-dispatch-namespace",
            "worker_id": "e8f70fdbc8b1fb0b8ddb1af166186758",
            "worker_name": "my-worker"
          }
        ],
        "domains": [
          {
            "id": "e8f70fdbc8b1fb0b8ddb1af166186758",
            "certificate_id": "certificate_id",
            "hostname": "my-worker.example.com",
            "zone_id": "e8f70fdbc8b1fb0b8ddb1af166186758",
            "zone_name": "example.com"
          }
        ],
        "durable_objects": [
          {
            "namespace_id": "e8f70fdbc8b1fb0b8ddb1af166186758",
            "namespace_name": "my-durable-object-namespace",
            "worker_id": "e8f70fdbc8b1fb0b8ddb1af166186758",
            "worker_name": "my-worker"
          }
        ],
        "queues": [
          {
            "queue_consumer_id": "e8f70fdbc8b1fb0b8ddb1af166186758",
            "queue_id": "e8f70fdbc8b1fb0b8ddb1af166186758",
            "queue_name": "my-queue"
          }
        ],
        "workers": [
          {
            "id": "e8f70fdbc8b1fb0b8ddb1af166186758",
            "name": "my-worker"
          }
        ]
      },
      "subdomain": {
        "enabled": true,
        "previews_enabled": true
      },
      "tags": [
        "my-team",
        "my-public-api"
      ],
      "tail_consumers": [
        {
          "name": "my-tail-consumer"
        }
      ],
      "updated_on": "2019-12-27T18:11:19.117Z",
      "deployed_on": "2019-12-27T18:11:19.117Z"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```
