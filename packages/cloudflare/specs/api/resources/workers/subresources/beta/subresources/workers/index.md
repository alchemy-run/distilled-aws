# Workers

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

## Get Worker

**get** `/accounts/{account_id}/workers/workers/{worker_id}`

Get details about a specific Worker.

### Path Parameters

- `account_id: string`

  Identifier.

- `worker_id: string`

  Identifier for the Worker, which can be ID or name.

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

- `result: Worker`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/workers/$WORKER_ID \
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
  "result": {
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
  },
  "success": true
}
```

## Create Worker

**post** `/accounts/{account_id}/workers/workers`

Create a new Worker.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `name: string`

  Name of the Worker.

- `logpush: optional boolean`

  Whether logpush is enabled for the Worker.

- `observability: optional object { enabled, head_sampling_rate, logs, traces }`

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

- `subdomain: optional object { enabled, previews_enabled }`

  Subdomain settings for the Worker.

  - `enabled: optional boolean`

    Whether the *.workers.dev subdomain is enabled for the Worker.

  - `previews_enabled: optional boolean`

    Whether [preview URLs](https://developers.cloudflare.com/workers/configuration/previews/) are enabled for the Worker.

- `tags: optional array of string`

  Tags associated with the Worker.

- `tail_consumers: optional array of object { name }`

  Other Workers that should consume logs from the Worker.

  - `name: string`

    Name of the consumer Worker.

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

- `result: Worker`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/workers \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "my-worker",
          "tags": [
            "my-team",
            "my-public-api"
          ]
        }'
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
  "result": {
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
  },
  "success": true
}
```

## Update Worker

**put** `/accounts/{account_id}/workers/workers/{worker_id}`

Perform a complete replacement of a Worker, where omitted properties are set to their default values. This is the exact same as the Create Worker endpoint, but operates on an existing Worker. To perform a partial update instead, use the Edit Worker endpoint.

### Path Parameters

- `account_id: string`

  Identifier.

- `worker_id: string`

  Identifier for the Worker, which can be ID or name.

### Body Parameters

- `name: string`

  Name of the Worker.

- `logpush: optional boolean`

  Whether logpush is enabled for the Worker.

- `observability: optional object { enabled, head_sampling_rate, logs, traces }`

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

- `subdomain: optional object { enabled, previews_enabled }`

  Subdomain settings for the Worker.

  - `enabled: optional boolean`

    Whether the *.workers.dev subdomain is enabled for the Worker.

  - `previews_enabled: optional boolean`

    Whether [preview URLs](https://developers.cloudflare.com/workers/configuration/previews/) are enabled for the Worker.

- `tags: optional array of string`

  Tags associated with the Worker.

- `tail_consumers: optional array of object { name }`

  Other Workers that should consume logs from the Worker.

  - `name: string`

    Name of the consumer Worker.

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

- `result: Worker`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/workers/$WORKER_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "my-worker",
          "tags": [
            "my-team",
            "my-public-api"
          ]
        }'
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
  "result": {
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
  },
  "success": true
}
```

## Edit Worker

**patch** `/accounts/{account_id}/workers/workers/{worker_id}`

Perform a partial update on a Worker, where omitted properties are left unchanged from their current values.

### Path Parameters

- `account_id: string`

  Identifier.

- `worker_id: string`

  Identifier for the Worker, which can be ID or name.

### Body Parameters

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

- `result: Worker`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/workers/$WORKER_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "logpush": true,
          "name": "my-worker",
          "observability": {},
          "subdomain": {},
          "tags": [
            "my-team",
            "my-public-api"
          ],
          "tail_consumers": [
            {
              "name": "my-tail-consumer"
            }
          ]
        }'
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
  "result": {
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
  },
  "success": true
}
```

## Delete Worker

**delete** `/accounts/{account_id}/workers/workers/{worker_id}`

Delete a Worker and all its associated resources (versions, deployments, etc.).

### Path Parameters

- `account_id: string`

  Identifier.

- `worker_id: string`

  Identifier for the Worker, which can be ID or name.

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

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/workers/$WORKER_ID \
    -X DELETE \
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
  "success": true
}
```

## Domain Types

### Worker

- `Worker object { id, created_on, logpush, 8 more }`

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

### Worker Delete Response

- `WorkerDeleteResponse object { errors, messages, success }`

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

  - `success: true`

    Whether the API call was successful.

    - `true`

# Versions

## List Versions

**get** `/accounts/{account_id}/workers/workers/{worker_id}/versions`

List all versions for a Worker.

### Path Parameters

- `account_id: string`

  Identifier.

- `worker_id: string`

  Identifier for the Worker, which can be ID or name.

### Query Parameters

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

- `result: array of Version`

  - `id: string`

    Version identifier.

  - `created_on: string`

    When the version was created.

  - `number: number`

    The integer version number, starting from one.

  - `urls: array of string`

    All routable URLs that always point to this version. Does not include alias URLs, since aliases can be updated to point to a different version.

  - `annotations: optional object { "workers/message", "workers/tag", "workers/triggered_by" }`

    Metadata about the version.

    - `"workers/message": optional string`

      Human-readable message about the version. Truncated to 1000 bytes if longer.

    - `"workers/tag": optional string`

      User-provided identifier for the version. Maximum 100 bytes.

    - `"workers/triggered_by": optional string`

      Operation that triggered the creation of the version.

  - `assets: optional object { config, jwt }`

    Configuration for assets within a Worker.

    [`_headers`](https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers) and
    [`_redirects`](https://developers.cloudflare.com/workers/static-assets/redirects/) files should be
    included as modules named `_headers` and `_redirects` with content type `text/plain`.

    - `config: optional object { html_handling, not_found_handling, run_worker_first }`

      Configuration for assets within a Worker.

      - `html_handling: optional "auto-trailing-slash" or "force-trailing-slash" or "drop-trailing-slash" or "none"`

        Determines the redirects and rewrites of requests for HTML content.

        - `"auto-trailing-slash"`

        - `"force-trailing-slash"`

        - `"drop-trailing-slash"`

        - `"none"`

      - `not_found_handling: optional "none" or "404-page" or "single-page-application"`

        Determines the response when a request does not match a static asset, and there is no Worker script.

        - `"none"`

        - `"404-page"`

        - `"single-page-application"`

      - `run_worker_first: optional array of string or boolean`

        Contains a list path rules to control routing to either the Worker or assets. Glob (*) and negative (!) rules are supported. Rules must start with either '/' or '!/'. At least one non-negative rule must be provided, and negative rules have higher precedence than non-negative rules.

        - `array of string`

          Contains a list path rules to control routing to either the Worker or assets. Glob (*) and negative (!) rules are supported. Rules must start with either '/' or '!/'. At least one non-negative rule must be provided, and negative rules have higher precedence than non-negative rules.

        - `boolean`

          Enables routing to always invoke the Worker script ahead of all requests. When true, this is equivalent to `["/*"]` in the string array version of this field.

    - `jwt: optional string`

      Token provided upon successful upload of all files from a registered manifest.

  - `bindings: optional array of object { name, type }  or object { instance_name, name, type, namespace }  or object { name, namespace, type }  or 32 more`

    List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings.

    - `AI object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "ai"`

        The kind of resource that the binding provides.

        - `"ai"`

    - `AISearch object { instance_name, name, type, namespace }`

      - `instance_name: string`

        The user-chosen instance name. Must exist at deploy time. The worker can search, chat, update, and manage items/jobs on this instance.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "ai_search"`

        The kind of resource that the binding provides.

        - `"ai_search"`

      - `namespace: optional string`

        The namespace the instance belongs to. Defaults to "default" if omitted. Customers who don't use namespaces can simply omit this field.

    - `AISearchNamespace object { name, namespace, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `namespace: string`

        The user-chosen namespace name. Must exist before deploy -- Wrangler handles auto-creation on deploy failure (R2 bucket pattern). The "default" namespace is auto-created by config-api for new accounts. Grants full access (CRUD + search + chat) to all instances within the namespace.

      - `type: "ai_search_namespace"`

        The kind of resource that the binding provides.

        - `"ai_search_namespace"`

    - `AnalyticsEngine object { dataset, name, type }`

      - `dataset: string`

        The name of the dataset to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "analytics_engine"`

        The kind of resource that the binding provides.

        - `"analytics_engine"`

    - `Assets object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "assets"`

        The kind of resource that the binding provides.

        - `"assets"`

    - `Browser object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "browser"`

        The kind of resource that the binding provides.

        - `"browser"`

    - `D1 object { database_id, name, type, id }`

      - `database_id: string`

        Identifier of the D1 database to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "d1"`

        The kind of resource that the binding provides.

        - `"d1"`

      - `id: optional string`

        Identifier of the D1 database to bind to.

    - `DataBlob object { name, part, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `part: string`

        The name of the file containing the data content. Only accepted for `service worker syntax` Workers.

      - `type: "data_blob"`

        The kind of resource that the binding provides.

        - `"data_blob"`

    - `DispatchNamespace object { name, namespace, type, outbound }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `namespace: string`

        The name of the dispatch namespace.

      - `type: "dispatch_namespace"`

        The kind of resource that the binding provides.

        - `"dispatch_namespace"`

      - `outbound: optional object { params, worker }`

        Outbound worker.

        - `params: optional array of object { name }`

          Pass information from the Dispatch Worker to the Outbound Worker through the parameters.

          - `name: string`

            Name of the parameter.

        - `worker: optional object { entrypoint, environment, service }`

          Outbound worker.

          - `entrypoint: optional string`

            Entrypoint to invoke on the outbound worker.

          - `environment: optional string`

            Environment of the outbound worker.

          - `service: optional string`

            Name of the outbound worker.

    - `DurableObjectNamespace object { name, type, class_name, 4 more }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "durable_object_namespace"`

        The kind of resource that the binding provides.

        - `"durable_object_namespace"`

      - `class_name: optional string`

        The exported class name of the Durable Object.

      - `dispatch_namespace: optional string`

        The dispatch namespace the Durable Object script belongs to.

      - `environment: optional string`

        The environment of the script_name to bind to.

      - `namespace_id: optional string`

        Namespace identifier tag.

      - `script_name: optional string`

        The script where the Durable Object is defined, if it is external to this Worker.

    - `Hyperdrive object { id, name, type }`

      - `id: string`

        Identifier of the Hyperdrive connection to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "hyperdrive"`

        The kind of resource that the binding provides.

        - `"hyperdrive"`

    - `Inherit object { name, type, old_name, version_id }`

      - `name: string`

        The name of the inherited binding.

      - `type: "inherit"`

        The kind of resource that the binding provides.

        - `"inherit"`

      - `old_name: optional string`

        The old name of the inherited binding. If set, the binding will be renamed from `old_name` to `name` in the new version. If not set, the binding will keep the same name between versions.

      - `version_id: optional string`

        Identifier for the version to inherit the binding from, which can be the version ID or the literal "latest" to inherit from the latest version. Defaults to inheriting the binding from the latest version.

    - `Images object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "images"`

        The kind of resource that the binding provides.

        - `"images"`

    - `Json object { json, name, type }`

      - `json: unknown`

        JSON data to use.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "json"`

        The kind of resource that the binding provides.

        - `"json"`

    - `KVNamespace object { name, namespace_id, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `namespace_id: string`

        Namespace identifier tag.

      - `type: "kv_namespace"`

        The kind of resource that the binding provides.

        - `"kv_namespace"`

    - `Media object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "media"`

        The kind of resource that the binding provides.

        - `"media"`

    - `MTLSCertificate object { certificate_id, name, type }`

      - `certificate_id: string`

        Identifier of the certificate to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "mtls_certificate"`

        The kind of resource that the binding provides.

        - `"mtls_certificate"`

    - `PlainText object { name, text, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `text: string`

        The text value to use.

      - `type: "plain_text"`

        The kind of resource that the binding provides.

        - `"plain_text"`

    - `Pipelines object { name, pipeline, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `pipeline: string`

        Name of the Pipeline to bind to.

      - `type: "pipelines"`

        The kind of resource that the binding provides.

        - `"pipelines"`

    - `Queue object { name, queue_name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `queue_name: string`

        Name of the Queue to bind to.

      - `type: "queue"`

        The kind of resource that the binding provides.

        - `"queue"`

    - `Ratelimit object { name, namespace_id, simple, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `namespace_id: string`

        Identifier of the rate limit namespace to bind to.

      - `simple: object { limit, period, mitigation_timeout }`

        The rate limit configuration.

        - `limit: number`

          The limit (requests per period).

        - `period: number`

          The period in seconds.

        - `mitigation_timeout: optional number`

          Duration in seconds to apply the mitigation action after the rate limit is exceeded. Valid values are 0 (disabled), 10, or multiples of 60 up to 86400. Must be greater than or equal to the period when non-zero.

      - `type: "ratelimit"`

        The kind of resource that the binding provides.

        - `"ratelimit"`

    - `R2Bucket object { bucket_name, name, type, jurisdiction }`

      - `bucket_name: string`

        R2 bucket to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "r2_bucket"`

        The kind of resource that the binding provides.

        - `"r2_bucket"`

      - `jurisdiction: optional "eu" or "fedramp" or "fedramp-high"`

        The [jurisdiction](https://developers.cloudflare.com/r2/reference/data-location/#jurisdictional-restrictions) of the R2 bucket.

        - `"eu"`

        - `"fedramp"`

        - `"fedramp-high"`

    - `SecretText object { name, text, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `text: string`

        The secret value to use.

      - `type: "secret_text"`

        The kind of resource that the binding provides.

        - `"secret_text"`

    - `SendEmail object { name, type, allowed_destination_addresses, 2 more }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "send_email"`

        The kind of resource that the binding provides.

        - `"send_email"`

      - `allowed_destination_addresses: optional array of string`

        List of allowed destination addresses.

      - `allowed_sender_addresses: optional array of string`

        List of allowed sender addresses.

      - `destination_address: optional string`

        Destination address for the email.

    - `Service object { name, service, type, 2 more }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `service: string`

        Name of Worker to bind to.

      - `type: "service"`

        The kind of resource that the binding provides.

        - `"service"`

      - `entrypoint: optional string`

        Entrypoint to invoke on the target Worker.

      - `environment: optional string`

        Optional environment if the Worker utilizes one.

    - `TextBlob object { name, part, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `part: string`

        The name of the file containing the text content. Only accepted for `service worker syntax` Workers.

      - `type: "text_blob"`

        The kind of resource that the binding provides.

        - `"text_blob"`

    - `Vectorize object { index_name, name, type }`

      - `index_name: string`

        Name of the Vectorize index to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "vectorize"`

        The kind of resource that the binding provides.

        - `"vectorize"`

    - `VersionMetadata object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "version_metadata"`

        The kind of resource that the binding provides.

        - `"version_metadata"`

    - `SecretsStoreSecret object { name, secret_name, store_id, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `secret_name: string`

        Name of the secret in the store.

      - `store_id: string`

        ID of the store containing the secret.

      - `type: "secrets_store_secret"`

        The kind of resource that the binding provides.

        - `"secrets_store_secret"`

    - `Flagship object { app_id, name, type }`

      - `app_id: string`

        ID of the Flagship app to bind to for feature flag evaluation.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "flagship"`

        The kind of resource that the binding provides.

        - `"flagship"`

    - `SecretKey object { algorithm, format, name, 4 more }`

      - `algorithm: unknown`

        Algorithm-specific key parameters. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#algorithm).

      - `format: "raw" or "pkcs8" or "spki" or "jwk"`

        Data format of the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#format).

        - `"raw"`

        - `"pkcs8"`

        - `"spki"`

        - `"jwk"`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "secret_key"`

        The kind of resource that the binding provides.

        - `"secret_key"`

      - `usages: array of "encrypt" or "decrypt" or "sign" or 5 more`

        Allowed operations with the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#keyUsages).

        - `"encrypt"`

        - `"decrypt"`

        - `"sign"`

        - `"verify"`

        - `"deriveKey"`

        - `"deriveBits"`

        - `"wrapKey"`

        - `"unwrapKey"`

      - `key_base64: optional string`

        Base64-encoded key data. Required if `format` is "raw", "pkcs8", or "spki".

      - `key_jwk: optional unknown`

        Key data in [JSON Web Key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#json_web_key) format. Required if `format` is "jwk".

    - `Workflow object { name, type, workflow_name, 2 more }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "workflow"`

        The kind of resource that the binding provides.

        - `"workflow"`

      - `workflow_name: string`

        Name of the Workflow to bind to.

      - `class_name: optional string`

        Class name of the Workflow. Should only be provided if the Workflow belongs to this script.

      - `script_name: optional string`

        Script name that contains the Workflow. If not provided, defaults to this script name.

    - `WasmModule object { name, part, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `part: string`

        The name of the file containing the WebAssembly module content. Only accepted for `service worker syntax` Workers.

      - `type: "wasm_module"`

        The kind of resource that the binding provides.

        - `"wasm_module"`

    - `VPCService object { name, service_id, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `service_id: string`

        Identifier of the VPC service to bind to.

      - `type: "vpc_service"`

        The kind of resource that the binding provides.

        - `"vpc_service"`

    - `VPCNetwork object { name, type, network_id, tunnel_id }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "vpc_network"`

        The kind of resource that the binding provides.

        - `"vpc_network"`

      - `network_id: optional string`

        Identifier of the network to bind to. Only "cf1:network" is currently supported. Mutually exclusive with tunnel_id.

      - `tunnel_id: optional string`

        UUID of the Cloudflare Tunnel to bind to. Mutually exclusive with network_id.

  - `cache_options: optional object { enabled, cross_version_cache }`

    Global CacheW configuration for the Worker. When caching is on,
    the platform provisions a `cloudflare.app` zone for the Worker.
    A `type: worker` entry in the `exports` map can override this
    value for a single entrypoint.

    - `enabled: boolean`

      Whether caching is enabled for this Worker.

    - `cross_version_cache: optional boolean`

      Whether cached responses are shared across Worker version
      uploads. This is independent of `enabled`. It can stay true
      while caching is off, so the preference survives turning
      caching off and back on.

  - `compatibility_date: optional string`

    Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker.

  - `compatibility_flags: optional array of string`

    Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`.

  - `containers: optional array of object { class_name }`

    List of containers attached to a Worker. Containers can only be attached to Durable Object classes of this Worker script.

    - `class_name: string`

      Select which Durable Object class should get this container attached.

  - `limits: optional object { cpu_ms, subrequests }`

    Resource limits enforced at runtime.

    - `cpu_ms: optional number`

      CPU time limit in milliseconds.

    - `subrequests: optional number`

      Subrequest limit per request.

  - `main_module: optional string`

    The name of the main module in the `modules` array (e.g. the name of the module that exports a `fetch` handler).

  - `migration_tag: optional string`

    Durable Object migration tag. Set when the version is deployed. Omitted if the version has not been deployed or the Worker does not use Durable Objects.

  - `migrations: optional SingleStepMigration or object { new_tag, old_tag, steps }`

    Migrations for Durable Objects associated with the version. Migrations are applied when the version is deployed.

    - `SingleStepMigration object { deleted_classes, new_classes, new_sqlite_classes, 4 more }`

      A single set of migrations to apply.

      - `deleted_classes: optional array of string`

        A list of classes to delete Durable Object namespaces from.

      - `new_classes: optional array of string`

        A list of classes to create Durable Object namespaces from.

      - `new_sqlite_classes: optional array of string`

        A list of classes to create Durable Object namespaces with SQLite from.

      - `new_tag: optional string`

        Tag to set as the latest migration tag.

      - `old_tag: optional string`

        Tag used to verify against the latest migration tag for this Worker. If they don't match, the upload is rejected.

      - `renamed_classes: optional array of object { from, to }`

        A list of classes with Durable Object namespaces that were renamed.

        - `from: optional string`

        - `to: optional string`

      - `transferred_classes: optional array of object { from, from_script, to }`

        A list of transfers for Durable Object namespaces from a different Worker and class to a class defined in this Worker.

        - `from: optional string`

        - `from_script: optional string`

        - `to: optional string`

    - `WorkersMultipleStepMigrations object { new_tag, old_tag, steps }`

      - `new_tag: optional string`

        Tag to set as the latest migration tag.

      - `old_tag: optional string`

        Tag used to verify against the latest migration tag for this Worker. If they don't match, the upload is rejected.

      - `steps: optional array of MigrationStep`

        Migrations to apply in order.

        - `deleted_classes: optional array of string`

          A list of classes to delete Durable Object namespaces from.

        - `new_classes: optional array of string`

          A list of classes to create Durable Object namespaces from.

        - `new_sqlite_classes: optional array of string`

          A list of classes to create Durable Object namespaces with SQLite from.

        - `renamed_classes: optional array of object { from, to }`

          A list of classes with Durable Object namespaces that were renamed.

          - `from: optional string`

          - `to: optional string`

        - `transferred_classes: optional array of object { from, from_script, to }`

          A list of transfers for Durable Object namespaces from a different Worker and class to a class defined in this Worker.

          - `from: optional string`

          - `from_script: optional string`

          - `to: optional string`

  - `modules: optional array of object { content_base64, content_type, name }`

    Code, sourcemaps, and other content used at runtime.

    This includes [`_headers`](https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers) and
    [`_redirects`](https://developers.cloudflare.com/workers/static-assets/redirects/) files used to configure
    [Static Assets](https://developers.cloudflare.com/workers/static-assets/). `_headers` and `_redirects` files should be
    included as modules named `_headers` and `_redirects` with content type `text/plain`.

    - `content_base64: string`

      The base64-encoded module content.

    - `content_type: string`

      The content type of the module.

    - `name: string`

      The name of the module.

  - `package_dependencies: optional array of object { installedVersion, name, packageJsonVersion }`

    The list of npm packages that were installed and used when this Worker
    version was built.

    - `installedVersion: string`

      The exact version that was resolved and installed by the package manager.

    - `name: string`

      The npm package name.

    - `packageJsonVersion: string`

      The version constraint as written in package.json.

  - `placement: optional object { mode }  or object { region }  or object { hostname }  or 5 more`

    Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart Placement, or one of region/hostname/host.

    - `Mode object { mode }`

      - `mode: "smart"`

        Enables [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"smart"`

    - `Region object { region }`

      - `region: string`

        Cloud region for targeted placement in format 'provider:region'.

    - `Hostname object { hostname }`

      - `hostname: string`

        HTTP hostname for targeted placement.

    - `Host object { host }`

      - `host: string`

        TCP host and port for targeted placement.

    - `object { mode, region }`

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `region: string`

        Cloud region for targeted placement in format 'provider:region'.

    - `object { hostname, mode }`

      - `hostname: string`

        HTTP hostname for targeted placement.

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

    - `object { host, mode }`

      - `host: string`

        TCP host and port for targeted placement.

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

    - `object { mode, target }`

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `target: array of object { region }  or object { hostname }  or object { host }`

        Array of placement targets (currently limited to single target).

        - `Region object { region }`

          - `region: string`

            Cloud region in format 'provider:region'.

        - `Hostname object { hostname }`

          - `hostname: string`

            HTTP hostname for targeted placement.

        - `Host object { host }`

          - `host: string`

            TCP host:port for targeted placement.

  - `source: optional string`

    The client used to create the version.

  - `startup_time_ms: optional number`

    Time in milliseconds spent on [Worker startup](https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time).

  - `usage_model: optional "standard" or "bundled" or "unbound"`

    Usage model for the version.

    - `"standard"`

    - `"bundled"`

    - `"unbound"`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/workers/$WORKER_ID/versions \
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
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "created_on": "2019-12-27T18:11:19.117Z",
      "number": 0,
      "urls": [
        "https://9387e76d-my-worker.my-subdomain.workers.dev"
      ],
      "annotations": {
        "workers/message": "Fixed bug.",
        "workers/tag": "v1.0.1",
        "workers/triggered_by": "upload"
      },
      "assets": {
        "config": {
          "html_handling": "auto-trailing-slash",
          "not_found_handling": "404-page",
          "run_worker_first": true
        },
        "jwt": "jwt"
      },
      "bindings": [
        {
          "name": "MY_ENV_VAR",
          "text": "my_data",
          "type": "plain_text"
        }
      ],
      "cache_options": {
        "enabled": true,
        "cross_version_cache": true
      },
      "compatibility_date": "2021-01-01",
      "compatibility_flags": [
        "nodejs_compat"
      ],
      "containers": [
        {
          "class_name": "MyDurableObject"
        }
      ],
      "limits": {
        "cpu_ms": 50,
        "subrequests": 1000
      },
      "main_module": "index.js",
      "migration_tag": "v1",
      "migrations": {},
      "modules": [
        {
          "content_base64": "ZXhwb3J0IGRlZmF1bHQgewogIGFzeW5jIGZldGNoKHJlcXVlc3QsIGVudiwgY3R4KSB7CiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKCdIZWxsbyBXb3JsZCEnKQogIH0KfQ==",
          "content_type": "application/javascript+module",
          "name": "index.js"
        }
      ],
      "package_dependencies": [
        {
          "installedVersion": "4.17.22",
          "name": "lodash",
          "packageJsonVersion": "^4.17.21"
        }
      ],
      "placement": {
        "mode": "smart"
      },
      "source": "wrangler",
      "startup_time_ms": 10,
      "usage_model": "standard"
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

## Get Version

**get** `/accounts/{account_id}/workers/workers/{worker_id}/versions/{version_id}`

Get details about a specific version.

### Path Parameters

- `account_id: string`

  Identifier.

- `worker_id: string`

  Identifier for the Worker, which can be ID or name.

- `version_id: string`

  Identifier for the version, which can be a UUID, a UUID prefix (minimum length 8), or the literal "latest" to operate on the most recently created version.

### Query Parameters

- `include: optional "modules"`

  Whether to include the `modules` property of the version in the response, which contains code and sourcemap content and may add several megabytes to the response size.

  - `"modules"`

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

- `result: Version`

  - `id: string`

    Version identifier.

  - `created_on: string`

    When the version was created.

  - `number: number`

    The integer version number, starting from one.

  - `urls: array of string`

    All routable URLs that always point to this version. Does not include alias URLs, since aliases can be updated to point to a different version.

  - `annotations: optional object { "workers/message", "workers/tag", "workers/triggered_by" }`

    Metadata about the version.

    - `"workers/message": optional string`

      Human-readable message about the version. Truncated to 1000 bytes if longer.

    - `"workers/tag": optional string`

      User-provided identifier for the version. Maximum 100 bytes.

    - `"workers/triggered_by": optional string`

      Operation that triggered the creation of the version.

  - `assets: optional object { config, jwt }`

    Configuration for assets within a Worker.

    [`_headers`](https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers) and
    [`_redirects`](https://developers.cloudflare.com/workers/static-assets/redirects/) files should be
    included as modules named `_headers` and `_redirects` with content type `text/plain`.

    - `config: optional object { html_handling, not_found_handling, run_worker_first }`

      Configuration for assets within a Worker.

      - `html_handling: optional "auto-trailing-slash" or "force-trailing-slash" or "drop-trailing-slash" or "none"`

        Determines the redirects and rewrites of requests for HTML content.

        - `"auto-trailing-slash"`

        - `"force-trailing-slash"`

        - `"drop-trailing-slash"`

        - `"none"`

      - `not_found_handling: optional "none" or "404-page" or "single-page-application"`

        Determines the response when a request does not match a static asset, and there is no Worker script.

        - `"none"`

        - `"404-page"`

        - `"single-page-application"`

      - `run_worker_first: optional array of string or boolean`

        Contains a list path rules to control routing to either the Worker or assets. Glob (*) and negative (!) rules are supported. Rules must start with either '/' or '!/'. At least one non-negative rule must be provided, and negative rules have higher precedence than non-negative rules.

        - `array of string`

          Contains a list path rules to control routing to either the Worker or assets. Glob (*) and negative (!) rules are supported. Rules must start with either '/' or '!/'. At least one non-negative rule must be provided, and negative rules have higher precedence than non-negative rules.

        - `boolean`

          Enables routing to always invoke the Worker script ahead of all requests. When true, this is equivalent to `["/*"]` in the string array version of this field.

    - `jwt: optional string`

      Token provided upon successful upload of all files from a registered manifest.

  - `bindings: optional array of object { name, type }  or object { instance_name, name, type, namespace }  or object { name, namespace, type }  or 32 more`

    List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings.

    - `AI object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "ai"`

        The kind of resource that the binding provides.

        - `"ai"`

    - `AISearch object { instance_name, name, type, namespace }`

      - `instance_name: string`

        The user-chosen instance name. Must exist at deploy time. The worker can search, chat, update, and manage items/jobs on this instance.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "ai_search"`

        The kind of resource that the binding provides.

        - `"ai_search"`

      - `namespace: optional string`

        The namespace the instance belongs to. Defaults to "default" if omitted. Customers who don't use namespaces can simply omit this field.

    - `AISearchNamespace object { name, namespace, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `namespace: string`

        The user-chosen namespace name. Must exist before deploy -- Wrangler handles auto-creation on deploy failure (R2 bucket pattern). The "default" namespace is auto-created by config-api for new accounts. Grants full access (CRUD + search + chat) to all instances within the namespace.

      - `type: "ai_search_namespace"`

        The kind of resource that the binding provides.

        - `"ai_search_namespace"`

    - `AnalyticsEngine object { dataset, name, type }`

      - `dataset: string`

        The name of the dataset to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "analytics_engine"`

        The kind of resource that the binding provides.

        - `"analytics_engine"`

    - `Assets object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "assets"`

        The kind of resource that the binding provides.

        - `"assets"`

    - `Browser object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "browser"`

        The kind of resource that the binding provides.

        - `"browser"`

    - `D1 object { database_id, name, type, id }`

      - `database_id: string`

        Identifier of the D1 database to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "d1"`

        The kind of resource that the binding provides.

        - `"d1"`

      - `id: optional string`

        Identifier of the D1 database to bind to.

    - `DataBlob object { name, part, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `part: string`

        The name of the file containing the data content. Only accepted for `service worker syntax` Workers.

      - `type: "data_blob"`

        The kind of resource that the binding provides.

        - `"data_blob"`

    - `DispatchNamespace object { name, namespace, type, outbound }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `namespace: string`

        The name of the dispatch namespace.

      - `type: "dispatch_namespace"`

        The kind of resource that the binding provides.

        - `"dispatch_namespace"`

      - `outbound: optional object { params, worker }`

        Outbound worker.

        - `params: optional array of object { name }`

          Pass information from the Dispatch Worker to the Outbound Worker through the parameters.

          - `name: string`

            Name of the parameter.

        - `worker: optional object { entrypoint, environment, service }`

          Outbound worker.

          - `entrypoint: optional string`

            Entrypoint to invoke on the outbound worker.

          - `environment: optional string`

            Environment of the outbound worker.

          - `service: optional string`

            Name of the outbound worker.

    - `DurableObjectNamespace object { name, type, class_name, 4 more }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "durable_object_namespace"`

        The kind of resource that the binding provides.

        - `"durable_object_namespace"`

      - `class_name: optional string`

        The exported class name of the Durable Object.

      - `dispatch_namespace: optional string`

        The dispatch namespace the Durable Object script belongs to.

      - `environment: optional string`

        The environment of the script_name to bind to.

      - `namespace_id: optional string`

        Namespace identifier tag.

      - `script_name: optional string`

        The script where the Durable Object is defined, if it is external to this Worker.

    - `Hyperdrive object { id, name, type }`

      - `id: string`

        Identifier of the Hyperdrive connection to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "hyperdrive"`

        The kind of resource that the binding provides.

        - `"hyperdrive"`

    - `Inherit object { name, type, old_name, version_id }`

      - `name: string`

        The name of the inherited binding.

      - `type: "inherit"`

        The kind of resource that the binding provides.

        - `"inherit"`

      - `old_name: optional string`

        The old name of the inherited binding. If set, the binding will be renamed from `old_name` to `name` in the new version. If not set, the binding will keep the same name between versions.

      - `version_id: optional string`

        Identifier for the version to inherit the binding from, which can be the version ID or the literal "latest" to inherit from the latest version. Defaults to inheriting the binding from the latest version.

    - `Images object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "images"`

        The kind of resource that the binding provides.

        - `"images"`

    - `Json object { json, name, type }`

      - `json: unknown`

        JSON data to use.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "json"`

        The kind of resource that the binding provides.

        - `"json"`

    - `KVNamespace object { name, namespace_id, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `namespace_id: string`

        Namespace identifier tag.

      - `type: "kv_namespace"`

        The kind of resource that the binding provides.

        - `"kv_namespace"`

    - `Media object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "media"`

        The kind of resource that the binding provides.

        - `"media"`

    - `MTLSCertificate object { certificate_id, name, type }`

      - `certificate_id: string`

        Identifier of the certificate to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "mtls_certificate"`

        The kind of resource that the binding provides.

        - `"mtls_certificate"`

    - `PlainText object { name, text, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `text: string`

        The text value to use.

      - `type: "plain_text"`

        The kind of resource that the binding provides.

        - `"plain_text"`

    - `Pipelines object { name, pipeline, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `pipeline: string`

        Name of the Pipeline to bind to.

      - `type: "pipelines"`

        The kind of resource that the binding provides.

        - `"pipelines"`

    - `Queue object { name, queue_name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `queue_name: string`

        Name of the Queue to bind to.

      - `type: "queue"`

        The kind of resource that the binding provides.

        - `"queue"`

    - `Ratelimit object { name, namespace_id, simple, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `namespace_id: string`

        Identifier of the rate limit namespace to bind to.

      - `simple: object { limit, period, mitigation_timeout }`

        The rate limit configuration.

        - `limit: number`

          The limit (requests per period).

        - `period: number`

          The period in seconds.

        - `mitigation_timeout: optional number`

          Duration in seconds to apply the mitigation action after the rate limit is exceeded. Valid values are 0 (disabled), 10, or multiples of 60 up to 86400. Must be greater than or equal to the period when non-zero.

      - `type: "ratelimit"`

        The kind of resource that the binding provides.

        - `"ratelimit"`

    - `R2Bucket object { bucket_name, name, type, jurisdiction }`

      - `bucket_name: string`

        R2 bucket to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "r2_bucket"`

        The kind of resource that the binding provides.

        - `"r2_bucket"`

      - `jurisdiction: optional "eu" or "fedramp" or "fedramp-high"`

        The [jurisdiction](https://developers.cloudflare.com/r2/reference/data-location/#jurisdictional-restrictions) of the R2 bucket.

        - `"eu"`

        - `"fedramp"`

        - `"fedramp-high"`

    - `SecretText object { name, text, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `text: string`

        The secret value to use.

      - `type: "secret_text"`

        The kind of resource that the binding provides.

        - `"secret_text"`

    - `SendEmail object { name, type, allowed_destination_addresses, 2 more }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "send_email"`

        The kind of resource that the binding provides.

        - `"send_email"`

      - `allowed_destination_addresses: optional array of string`

        List of allowed destination addresses.

      - `allowed_sender_addresses: optional array of string`

        List of allowed sender addresses.

      - `destination_address: optional string`

        Destination address for the email.

    - `Service object { name, service, type, 2 more }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `service: string`

        Name of Worker to bind to.

      - `type: "service"`

        The kind of resource that the binding provides.

        - `"service"`

      - `entrypoint: optional string`

        Entrypoint to invoke on the target Worker.

      - `environment: optional string`

        Optional environment if the Worker utilizes one.

    - `TextBlob object { name, part, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `part: string`

        The name of the file containing the text content. Only accepted for `service worker syntax` Workers.

      - `type: "text_blob"`

        The kind of resource that the binding provides.

        - `"text_blob"`

    - `Vectorize object { index_name, name, type }`

      - `index_name: string`

        Name of the Vectorize index to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "vectorize"`

        The kind of resource that the binding provides.

        - `"vectorize"`

    - `VersionMetadata object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "version_metadata"`

        The kind of resource that the binding provides.

        - `"version_metadata"`

    - `SecretsStoreSecret object { name, secret_name, store_id, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `secret_name: string`

        Name of the secret in the store.

      - `store_id: string`

        ID of the store containing the secret.

      - `type: "secrets_store_secret"`

        The kind of resource that the binding provides.

        - `"secrets_store_secret"`

    - `Flagship object { app_id, name, type }`

      - `app_id: string`

        ID of the Flagship app to bind to for feature flag evaluation.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "flagship"`

        The kind of resource that the binding provides.

        - `"flagship"`

    - `SecretKey object { algorithm, format, name, 4 more }`

      - `algorithm: unknown`

        Algorithm-specific key parameters. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#algorithm).

      - `format: "raw" or "pkcs8" or "spki" or "jwk"`

        Data format of the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#format).

        - `"raw"`

        - `"pkcs8"`

        - `"spki"`

        - `"jwk"`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "secret_key"`

        The kind of resource that the binding provides.

        - `"secret_key"`

      - `usages: array of "encrypt" or "decrypt" or "sign" or 5 more`

        Allowed operations with the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#keyUsages).

        - `"encrypt"`

        - `"decrypt"`

        - `"sign"`

        - `"verify"`

        - `"deriveKey"`

        - `"deriveBits"`

        - `"wrapKey"`

        - `"unwrapKey"`

      - `key_base64: optional string`

        Base64-encoded key data. Required if `format` is "raw", "pkcs8", or "spki".

      - `key_jwk: optional unknown`

        Key data in [JSON Web Key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#json_web_key) format. Required if `format` is "jwk".

    - `Workflow object { name, type, workflow_name, 2 more }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "workflow"`

        The kind of resource that the binding provides.

        - `"workflow"`

      - `workflow_name: string`

        Name of the Workflow to bind to.

      - `class_name: optional string`

        Class name of the Workflow. Should only be provided if the Workflow belongs to this script.

      - `script_name: optional string`

        Script name that contains the Workflow. If not provided, defaults to this script name.

    - `WasmModule object { name, part, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `part: string`

        The name of the file containing the WebAssembly module content. Only accepted for `service worker syntax` Workers.

      - `type: "wasm_module"`

        The kind of resource that the binding provides.

        - `"wasm_module"`

    - `VPCService object { name, service_id, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `service_id: string`

        Identifier of the VPC service to bind to.

      - `type: "vpc_service"`

        The kind of resource that the binding provides.

        - `"vpc_service"`

    - `VPCNetwork object { name, type, network_id, tunnel_id }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "vpc_network"`

        The kind of resource that the binding provides.

        - `"vpc_network"`

      - `network_id: optional string`

        Identifier of the network to bind to. Only "cf1:network" is currently supported. Mutually exclusive with tunnel_id.

      - `tunnel_id: optional string`

        UUID of the Cloudflare Tunnel to bind to. Mutually exclusive with network_id.

  - `cache_options: optional object { enabled, cross_version_cache }`

    Global CacheW configuration for the Worker. When caching is on,
    the platform provisions a `cloudflare.app` zone for the Worker.
    A `type: worker` entry in the `exports` map can override this
    value for a single entrypoint.

    - `enabled: boolean`

      Whether caching is enabled for this Worker.

    - `cross_version_cache: optional boolean`

      Whether cached responses are shared across Worker version
      uploads. This is independent of `enabled`. It can stay true
      while caching is off, so the preference survives turning
      caching off and back on.

  - `compatibility_date: optional string`

    Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker.

  - `compatibility_flags: optional array of string`

    Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`.

  - `containers: optional array of object { class_name }`

    List of containers attached to a Worker. Containers can only be attached to Durable Object classes of this Worker script.

    - `class_name: string`

      Select which Durable Object class should get this container attached.

  - `limits: optional object { cpu_ms, subrequests }`

    Resource limits enforced at runtime.

    - `cpu_ms: optional number`

      CPU time limit in milliseconds.

    - `subrequests: optional number`

      Subrequest limit per request.

  - `main_module: optional string`

    The name of the main module in the `modules` array (e.g. the name of the module that exports a `fetch` handler).

  - `migration_tag: optional string`

    Durable Object migration tag. Set when the version is deployed. Omitted if the version has not been deployed or the Worker does not use Durable Objects.

  - `migrations: optional SingleStepMigration or object { new_tag, old_tag, steps }`

    Migrations for Durable Objects associated with the version. Migrations are applied when the version is deployed.

    - `SingleStepMigration object { deleted_classes, new_classes, new_sqlite_classes, 4 more }`

      A single set of migrations to apply.

      - `deleted_classes: optional array of string`

        A list of classes to delete Durable Object namespaces from.

      - `new_classes: optional array of string`

        A list of classes to create Durable Object namespaces from.

      - `new_sqlite_classes: optional array of string`

        A list of classes to create Durable Object namespaces with SQLite from.

      - `new_tag: optional string`

        Tag to set as the latest migration tag.

      - `old_tag: optional string`

        Tag used to verify against the latest migration tag for this Worker. If they don't match, the upload is rejected.

      - `renamed_classes: optional array of object { from, to }`

        A list of classes with Durable Object namespaces that were renamed.

        - `from: optional string`

        - `to: optional string`

      - `transferred_classes: optional array of object { from, from_script, to }`

        A list of transfers for Durable Object namespaces from a different Worker and class to a class defined in this Worker.

        - `from: optional string`

        - `from_script: optional string`

        - `to: optional string`

    - `WorkersMultipleStepMigrations object { new_tag, old_tag, steps }`

      - `new_tag: optional string`

        Tag to set as the latest migration tag.

      - `old_tag: optional string`

        Tag used to verify against the latest migration tag for this Worker. If they don't match, the upload is rejected.

      - `steps: optional array of MigrationStep`

        Migrations to apply in order.

        - `deleted_classes: optional array of string`

          A list of classes to delete Durable Object namespaces from.

        - `new_classes: optional array of string`

          A list of classes to create Durable Object namespaces from.

        - `new_sqlite_classes: optional array of string`

          A list of classes to create Durable Object namespaces with SQLite from.

        - `renamed_classes: optional array of object { from, to }`

          A list of classes with Durable Object namespaces that were renamed.

          - `from: optional string`

          - `to: optional string`

        - `transferred_classes: optional array of object { from, from_script, to }`

          A list of transfers for Durable Object namespaces from a different Worker and class to a class defined in this Worker.

          - `from: optional string`

          - `from_script: optional string`

          - `to: optional string`

  - `modules: optional array of object { content_base64, content_type, name }`

    Code, sourcemaps, and other content used at runtime.

    This includes [`_headers`](https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers) and
    [`_redirects`](https://developers.cloudflare.com/workers/static-assets/redirects/) files used to configure
    [Static Assets](https://developers.cloudflare.com/workers/static-assets/). `_headers` and `_redirects` files should be
    included as modules named `_headers` and `_redirects` with content type `text/plain`.

    - `content_base64: string`

      The base64-encoded module content.

    - `content_type: string`

      The content type of the module.

    - `name: string`

      The name of the module.

  - `package_dependencies: optional array of object { installedVersion, name, packageJsonVersion }`

    The list of npm packages that were installed and used when this Worker
    version was built.

    - `installedVersion: string`

      The exact version that was resolved and installed by the package manager.

    - `name: string`

      The npm package name.

    - `packageJsonVersion: string`

      The version constraint as written in package.json.

  - `placement: optional object { mode }  or object { region }  or object { hostname }  or 5 more`

    Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart Placement, or one of region/hostname/host.

    - `Mode object { mode }`

      - `mode: "smart"`

        Enables [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"smart"`

    - `Region object { region }`

      - `region: string`

        Cloud region for targeted placement in format 'provider:region'.

    - `Hostname object { hostname }`

      - `hostname: string`

        HTTP hostname for targeted placement.

    - `Host object { host }`

      - `host: string`

        TCP host and port for targeted placement.

    - `object { mode, region }`

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `region: string`

        Cloud region for targeted placement in format 'provider:region'.

    - `object { hostname, mode }`

      - `hostname: string`

        HTTP hostname for targeted placement.

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

    - `object { host, mode }`

      - `host: string`

        TCP host and port for targeted placement.

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

    - `object { mode, target }`

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `target: array of object { region }  or object { hostname }  or object { host }`

        Array of placement targets (currently limited to single target).

        - `Region object { region }`

          - `region: string`

            Cloud region in format 'provider:region'.

        - `Hostname object { hostname }`

          - `hostname: string`

            HTTP hostname for targeted placement.

        - `Host object { host }`

          - `host: string`

            TCP host:port for targeted placement.

  - `source: optional string`

    The client used to create the version.

  - `startup_time_ms: optional number`

    Time in milliseconds spent on [Worker startup](https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time).

  - `usage_model: optional "standard" or "bundled" or "unbound"`

    Usage model for the version.

    - `"standard"`

    - `"bundled"`

    - `"unbound"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/workers/$WORKER_ID/versions/$VERSION_ID \
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
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_on": "2019-12-27T18:11:19.117Z",
    "number": 0,
    "urls": [
      "https://9387e76d-my-worker.my-subdomain.workers.dev"
    ],
    "annotations": {
      "workers/message": "Fixed bug.",
      "workers/tag": "v1.0.1",
      "workers/triggered_by": "upload"
    },
    "assets": {
      "config": {
        "html_handling": "auto-trailing-slash",
        "not_found_handling": "404-page",
        "run_worker_first": true
      },
      "jwt": "jwt"
    },
    "bindings": [
      {
        "name": "MY_ENV_VAR",
        "text": "my_data",
        "type": "plain_text"
      }
    ],
    "cache_options": {
      "enabled": true,
      "cross_version_cache": true
    },
    "compatibility_date": "2021-01-01",
    "compatibility_flags": [
      "nodejs_compat"
    ],
    "containers": [
      {
        "class_name": "MyDurableObject"
      }
    ],
    "limits": {
      "cpu_ms": 50,
      "subrequests": 1000
    },
    "main_module": "index.js",
    "migration_tag": "v1",
    "migrations": {},
    "modules": [
      {
        "content_base64": "ZXhwb3J0IGRlZmF1bHQgewogIGFzeW5jIGZldGNoKHJlcXVlc3QsIGVudiwgY3R4KSB7CiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKCdIZWxsbyBXb3JsZCEnKQogIH0KfQ==",
        "content_type": "application/javascript+module",
        "name": "index.js"
      }
    ],
    "package_dependencies": [
      {
        "installedVersion": "4.17.22",
        "name": "lodash",
        "packageJsonVersion": "^4.17.21"
      }
    ],
    "placement": {
      "mode": "smart"
    },
    "source": "wrangler",
    "startup_time_ms": 10,
    "usage_model": "standard"
  },
  "success": true
}
```

## Create Version

**post** `/accounts/{account_id}/workers/workers/{worker_id}/versions`

Create a new version.

### Path Parameters

- `account_id: string`

  Identifier.

- `worker_id: string`

  Identifier for the Worker, which can be ID or name.

### Query Parameters

- `deploy: optional boolean`

  If true, a deployment will be created that sends 100% of traffic to the new version.

### Body Parameters

- `annotations: optional object { "workers/message", "workers/tag", "workers/triggered_by" }`

  Metadata about the version.

  - `"workers/message": optional string`

    Human-readable message about the version. Truncated to 1000 bytes if longer.

  - `"workers/tag": optional string`

    User-provided identifier for the version. Maximum 100 bytes.

  - `"workers/triggered_by": optional string`

    Operation that triggered the creation of the version.

- `assets: optional object { config, jwt }`

  Configuration for assets within a Worker.

  [`_headers`](https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers) and
  [`_redirects`](https://developers.cloudflare.com/workers/static-assets/redirects/) files should be
  included as modules named `_headers` and `_redirects` with content type `text/plain`.

  - `config: optional object { html_handling, not_found_handling, run_worker_first }`

    Configuration for assets within a Worker.

    - `html_handling: optional "auto-trailing-slash" or "force-trailing-slash" or "drop-trailing-slash" or "none"`

      Determines the redirects and rewrites of requests for HTML content.

      - `"auto-trailing-slash"`

      - `"force-trailing-slash"`

      - `"drop-trailing-slash"`

      - `"none"`

    - `not_found_handling: optional "none" or "404-page" or "single-page-application"`

      Determines the response when a request does not match a static asset, and there is no Worker script.

      - `"none"`

      - `"404-page"`

      - `"single-page-application"`

    - `run_worker_first: optional array of string or boolean`

      Contains a list path rules to control routing to either the Worker or assets. Glob (*) and negative (!) rules are supported. Rules must start with either '/' or '!/'. At least one non-negative rule must be provided, and negative rules have higher precedence than non-negative rules.

      - `array of string`

        Contains a list path rules to control routing to either the Worker or assets. Glob (*) and negative (!) rules are supported. Rules must start with either '/' or '!/'. At least one non-negative rule must be provided, and negative rules have higher precedence than non-negative rules.

      - `boolean`

        Enables routing to always invoke the Worker script ahead of all requests. When true, this is equivalent to `["/*"]` in the string array version of this field.

  - `jwt: optional string`

    Token provided upon successful upload of all files from a registered manifest.

- `bindings: optional array of object { name, type }  or object { instance_name, name, type, namespace }  or object { name, namespace, type }  or 32 more`

  List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings.

  - `AI object { name, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `type: "ai"`

      The kind of resource that the binding provides.

      - `"ai"`

  - `AISearch object { instance_name, name, type, namespace }`

    - `instance_name: string`

      The user-chosen instance name. Must exist at deploy time. The worker can search, chat, update, and manage items/jobs on this instance.

    - `name: string`

      A JavaScript variable name for the binding.

    - `type: "ai_search"`

      The kind of resource that the binding provides.

      - `"ai_search"`

    - `namespace: optional string`

      The namespace the instance belongs to. Defaults to "default" if omitted. Customers who don't use namespaces can simply omit this field.

  - `AISearchNamespace object { name, namespace, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `namespace: string`

      The user-chosen namespace name. Must exist before deploy -- Wrangler handles auto-creation on deploy failure (R2 bucket pattern). The "default" namespace is auto-created by config-api for new accounts. Grants full access (CRUD + search + chat) to all instances within the namespace.

    - `type: "ai_search_namespace"`

      The kind of resource that the binding provides.

      - `"ai_search_namespace"`

  - `AnalyticsEngine object { dataset, name, type }`

    - `dataset: string`

      The name of the dataset to bind to.

    - `name: string`

      A JavaScript variable name for the binding.

    - `type: "analytics_engine"`

      The kind of resource that the binding provides.

      - `"analytics_engine"`

  - `Assets object { name, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `type: "assets"`

      The kind of resource that the binding provides.

      - `"assets"`

  - `Browser object { name, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `type: "browser"`

      The kind of resource that the binding provides.

      - `"browser"`

  - `D1 object { database_id, name, type, id }`

    - `database_id: string`

      Identifier of the D1 database to bind to.

    - `name: string`

      A JavaScript variable name for the binding.

    - `type: "d1"`

      The kind of resource that the binding provides.

      - `"d1"`

    - `id: optional string`

      Identifier of the D1 database to bind to.

  - `DataBlob object { name, part, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `part: string`

      The name of the file containing the data content. Only accepted for `service worker syntax` Workers.

    - `type: "data_blob"`

      The kind of resource that the binding provides.

      - `"data_blob"`

  - `DispatchNamespace object { name, namespace, type, outbound }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `namespace: string`

      The name of the dispatch namespace.

    - `type: "dispatch_namespace"`

      The kind of resource that the binding provides.

      - `"dispatch_namespace"`

    - `outbound: optional object { params, worker }`

      Outbound worker.

      - `params: optional array of object { name }`

        Pass information from the Dispatch Worker to the Outbound Worker through the parameters.

        - `name: string`

          Name of the parameter.

      - `worker: optional object { entrypoint, environment, service }`

        Outbound worker.

        - `entrypoint: optional string`

          Entrypoint to invoke on the outbound worker.

        - `environment: optional string`

          Environment of the outbound worker.

        - `service: optional string`

          Name of the outbound worker.

  - `DurableObjectNamespace object { name, type, class_name, 4 more }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `type: "durable_object_namespace"`

      The kind of resource that the binding provides.

      - `"durable_object_namespace"`

    - `class_name: optional string`

      The exported class name of the Durable Object.

    - `dispatch_namespace: optional string`

      The dispatch namespace the Durable Object script belongs to.

    - `environment: optional string`

      The environment of the script_name to bind to.

    - `namespace_id: optional string`

      Namespace identifier tag.

    - `script_name: optional string`

      The script where the Durable Object is defined, if it is external to this Worker.

  - `Hyperdrive object { id, name, type }`

    - `id: string`

      Identifier of the Hyperdrive connection to bind to.

    - `name: string`

      A JavaScript variable name for the binding.

    - `type: "hyperdrive"`

      The kind of resource that the binding provides.

      - `"hyperdrive"`

  - `Inherit object { name, type, old_name, version_id }`

    - `name: string`

      The name of the inherited binding.

    - `type: "inherit"`

      The kind of resource that the binding provides.

      - `"inherit"`

    - `old_name: optional string`

      The old name of the inherited binding. If set, the binding will be renamed from `old_name` to `name` in the new version. If not set, the binding will keep the same name between versions.

    - `version_id: optional string`

      Identifier for the version to inherit the binding from, which can be the version ID or the literal "latest" to inherit from the latest version. Defaults to inheriting the binding from the latest version.

  - `Images object { name, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `type: "images"`

      The kind of resource that the binding provides.

      - `"images"`

  - `Json object { json, name, type }`

    - `json: unknown`

      JSON data to use.

    - `name: string`

      A JavaScript variable name for the binding.

    - `type: "json"`

      The kind of resource that the binding provides.

      - `"json"`

  - `KVNamespace object { name, namespace_id, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `namespace_id: string`

      Namespace identifier tag.

    - `type: "kv_namespace"`

      The kind of resource that the binding provides.

      - `"kv_namespace"`

  - `Media object { name, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `type: "media"`

      The kind of resource that the binding provides.

      - `"media"`

  - `MTLSCertificate object { certificate_id, name, type }`

    - `certificate_id: string`

      Identifier of the certificate to bind to.

    - `name: string`

      A JavaScript variable name for the binding.

    - `type: "mtls_certificate"`

      The kind of resource that the binding provides.

      - `"mtls_certificate"`

  - `PlainText object { name, text, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `text: string`

      The text value to use.

    - `type: "plain_text"`

      The kind of resource that the binding provides.

      - `"plain_text"`

  - `Pipelines object { name, pipeline, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `pipeline: string`

      Name of the Pipeline to bind to.

    - `type: "pipelines"`

      The kind of resource that the binding provides.

      - `"pipelines"`

  - `Queue object { name, queue_name, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `queue_name: string`

      Name of the Queue to bind to.

    - `type: "queue"`

      The kind of resource that the binding provides.

      - `"queue"`

  - `Ratelimit object { name, namespace_id, simple, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `namespace_id: string`

      Identifier of the rate limit namespace to bind to.

    - `simple: object { limit, period, mitigation_timeout }`

      The rate limit configuration.

      - `limit: number`

        The limit (requests per period).

      - `period: number`

        The period in seconds.

      - `mitigation_timeout: optional number`

        Duration in seconds to apply the mitigation action after the rate limit is exceeded. Valid values are 0 (disabled), 10, or multiples of 60 up to 86400. Must be greater than or equal to the period when non-zero.

    - `type: "ratelimit"`

      The kind of resource that the binding provides.

      - `"ratelimit"`

  - `R2Bucket object { bucket_name, name, type, jurisdiction }`

    - `bucket_name: string`

      R2 bucket to bind to.

    - `name: string`

      A JavaScript variable name for the binding.

    - `type: "r2_bucket"`

      The kind of resource that the binding provides.

      - `"r2_bucket"`

    - `jurisdiction: optional "eu" or "fedramp" or "fedramp-high"`

      The [jurisdiction](https://developers.cloudflare.com/r2/reference/data-location/#jurisdictional-restrictions) of the R2 bucket.

      - `"eu"`

      - `"fedramp"`

      - `"fedramp-high"`

  - `SecretText object { name, text, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `text: string`

      The secret value to use.

    - `type: "secret_text"`

      The kind of resource that the binding provides.

      - `"secret_text"`

  - `SendEmail object { name, type, allowed_destination_addresses, 2 more }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `type: "send_email"`

      The kind of resource that the binding provides.

      - `"send_email"`

    - `allowed_destination_addresses: optional array of string`

      List of allowed destination addresses.

    - `allowed_sender_addresses: optional array of string`

      List of allowed sender addresses.

    - `destination_address: optional string`

      Destination address for the email.

  - `Service object { name, service, type, 2 more }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `service: string`

      Name of Worker to bind to.

    - `type: "service"`

      The kind of resource that the binding provides.

      - `"service"`

    - `entrypoint: optional string`

      Entrypoint to invoke on the target Worker.

    - `environment: optional string`

      Optional environment if the Worker utilizes one.

  - `TextBlob object { name, part, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `part: string`

      The name of the file containing the text content. Only accepted for `service worker syntax` Workers.

    - `type: "text_blob"`

      The kind of resource that the binding provides.

      - `"text_blob"`

  - `Vectorize object { index_name, name, type }`

    - `index_name: string`

      Name of the Vectorize index to bind to.

    - `name: string`

      A JavaScript variable name for the binding.

    - `type: "vectorize"`

      The kind of resource that the binding provides.

      - `"vectorize"`

  - `VersionMetadata object { name, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `type: "version_metadata"`

      The kind of resource that the binding provides.

      - `"version_metadata"`

  - `SecretsStoreSecret object { name, secret_name, store_id, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `secret_name: string`

      Name of the secret in the store.

    - `store_id: string`

      ID of the store containing the secret.

    - `type: "secrets_store_secret"`

      The kind of resource that the binding provides.

      - `"secrets_store_secret"`

  - `Flagship object { app_id, name, type }`

    - `app_id: string`

      ID of the Flagship app to bind to for feature flag evaluation.

    - `name: string`

      A JavaScript variable name for the binding.

    - `type: "flagship"`

      The kind of resource that the binding provides.

      - `"flagship"`

  - `SecretKey object { algorithm, format, name, 4 more }`

    - `algorithm: unknown`

      Algorithm-specific key parameters. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#algorithm).

    - `format: "raw" or "pkcs8" or "spki" or "jwk"`

      Data format of the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#format).

      - `"raw"`

      - `"pkcs8"`

      - `"spki"`

      - `"jwk"`

    - `name: string`

      A JavaScript variable name for the binding.

    - `type: "secret_key"`

      The kind of resource that the binding provides.

      - `"secret_key"`

    - `usages: array of "encrypt" or "decrypt" or "sign" or 5 more`

      Allowed operations with the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#keyUsages).

      - `"encrypt"`

      - `"decrypt"`

      - `"sign"`

      - `"verify"`

      - `"deriveKey"`

      - `"deriveBits"`

      - `"wrapKey"`

      - `"unwrapKey"`

    - `key_base64: optional string`

      Base64-encoded key data. Required if `format` is "raw", "pkcs8", or "spki".

    - `key_jwk: optional unknown`

      Key data in [JSON Web Key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#json_web_key) format. Required if `format` is "jwk".

  - `Workflow object { name, type, workflow_name, 2 more }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `type: "workflow"`

      The kind of resource that the binding provides.

      - `"workflow"`

    - `workflow_name: string`

      Name of the Workflow to bind to.

    - `class_name: optional string`

      Class name of the Workflow. Should only be provided if the Workflow belongs to this script.

    - `script_name: optional string`

      Script name that contains the Workflow. If not provided, defaults to this script name.

  - `WasmModule object { name, part, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `part: string`

      The name of the file containing the WebAssembly module content. Only accepted for `service worker syntax` Workers.

    - `type: "wasm_module"`

      The kind of resource that the binding provides.

      - `"wasm_module"`

  - `VPCService object { name, service_id, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `service_id: string`

      Identifier of the VPC service to bind to.

    - `type: "vpc_service"`

      The kind of resource that the binding provides.

      - `"vpc_service"`

  - `VPCNetwork object { name, type, network_id, tunnel_id }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `type: "vpc_network"`

      The kind of resource that the binding provides.

      - `"vpc_network"`

    - `network_id: optional string`

      Identifier of the network to bind to. Only "cf1:network" is currently supported. Mutually exclusive with tunnel_id.

    - `tunnel_id: optional string`

      UUID of the Cloudflare Tunnel to bind to. Mutually exclusive with network_id.

- `cache_options: optional object { enabled, cross_version_cache }`

  Global CacheW configuration for the Worker. When caching is on,
  the platform provisions a `cloudflare.app` zone for the Worker.
  A `type: worker` entry in the `exports` map can override this
  value for a single entrypoint.

  - `enabled: boolean`

    Whether caching is enabled for this Worker.

  - `cross_version_cache: optional boolean`

    Whether cached responses are shared across Worker version
    uploads. This is independent of `enabled`. It can stay true
    while caching is off, so the preference survives turning
    caching off and back on.

- `compatibility_date: optional string`

  Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker.

- `compatibility_flags: optional array of string`

  Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`.

- `containers: optional array of object { class_name }`

  List of containers attached to a Worker. Containers can only be attached to Durable Object classes of this Worker script.

  - `class_name: string`

    Select which Durable Object class should get this container attached.

- `limits: optional object { cpu_ms, subrequests }`

  Resource limits enforced at runtime.

  - `cpu_ms: optional number`

    CPU time limit in milliseconds.

  - `subrequests: optional number`

    Subrequest limit per request.

- `main_module: optional string`

  The name of the main module in the `modules` array (e.g. the name of the module that exports a `fetch` handler).

- `migrations: optional SingleStepMigration or object { new_tag, old_tag, steps }`

  Migrations for Durable Objects associated with the version. Migrations are applied when the version is deployed.

  - `SingleStepMigration object { deleted_classes, new_classes, new_sqlite_classes, 4 more }`

    A single set of migrations to apply.

    - `deleted_classes: optional array of string`

      A list of classes to delete Durable Object namespaces from.

    - `new_classes: optional array of string`

      A list of classes to create Durable Object namespaces from.

    - `new_sqlite_classes: optional array of string`

      A list of classes to create Durable Object namespaces with SQLite from.

    - `new_tag: optional string`

      Tag to set as the latest migration tag.

    - `old_tag: optional string`

      Tag used to verify against the latest migration tag for this Worker. If they don't match, the upload is rejected.

    - `renamed_classes: optional array of object { from, to }`

      A list of classes with Durable Object namespaces that were renamed.

      - `from: optional string`

      - `to: optional string`

    - `transferred_classes: optional array of object { from, from_script, to }`

      A list of transfers for Durable Object namespaces from a different Worker and class to a class defined in this Worker.

      - `from: optional string`

      - `from_script: optional string`

      - `to: optional string`

  - `WorkersMultipleStepMigrations object { new_tag, old_tag, steps }`

    - `new_tag: optional string`

      Tag to set as the latest migration tag.

    - `old_tag: optional string`

      Tag used to verify against the latest migration tag for this Worker. If they don't match, the upload is rejected.

    - `steps: optional array of MigrationStep`

      Migrations to apply in order.

      - `deleted_classes: optional array of string`

        A list of classes to delete Durable Object namespaces from.

      - `new_classes: optional array of string`

        A list of classes to create Durable Object namespaces from.

      - `new_sqlite_classes: optional array of string`

        A list of classes to create Durable Object namespaces with SQLite from.

      - `renamed_classes: optional array of object { from, to }`

        A list of classes with Durable Object namespaces that were renamed.

        - `from: optional string`

        - `to: optional string`

      - `transferred_classes: optional array of object { from, from_script, to }`

        A list of transfers for Durable Object namespaces from a different Worker and class to a class defined in this Worker.

        - `from: optional string`

        - `from_script: optional string`

        - `to: optional string`

- `modules: optional array of object { content_base64, content_type, name }`

  Code, sourcemaps, and other content used at runtime.

  This includes [`_headers`](https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers) and
  [`_redirects`](https://developers.cloudflare.com/workers/static-assets/redirects/) files used to configure
  [Static Assets](https://developers.cloudflare.com/workers/static-assets/). `_headers` and `_redirects` files should be
  included as modules named `_headers` and `_redirects` with content type `text/plain`.

  - `content_base64: string`

    The base64-encoded module content.

  - `content_type: string`

    The content type of the module.

  - `name: string`

    The name of the module.

- `package_dependencies: optional array of object { installedVersion, name, packageJsonVersion }`

  The list of npm packages that were installed and used when this Worker
  version was built.

  - `installedVersion: string`

    The exact version that was resolved and installed by the package manager.

  - `name: string`

    The npm package name.

  - `packageJsonVersion: string`

    The version constraint as written in package.json.

- `placement: optional object { mode }  or object { region }  or object { hostname }  or 5 more`

  Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart Placement, or one of region/hostname/host.

  - `Mode object { mode }`

    - `mode: "smart"`

      Enables [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `"smart"`

  - `Region object { region }`

    - `region: string`

      Cloud region for targeted placement in format 'provider:region'.

  - `Hostname object { hostname }`

    - `hostname: string`

      HTTP hostname for targeted placement.

  - `Host object { host }`

    - `host: string`

      TCP host and port for targeted placement.

  - `object { mode, region }`

    - `mode: "targeted"`

      Targeted placement mode.

      - `"targeted"`

    - `region: string`

      Cloud region for targeted placement in format 'provider:region'.

  - `object { hostname, mode }`

    - `hostname: string`

      HTTP hostname for targeted placement.

    - `mode: "targeted"`

      Targeted placement mode.

      - `"targeted"`

  - `object { host, mode }`

    - `host: string`

      TCP host and port for targeted placement.

    - `mode: "targeted"`

      Targeted placement mode.

      - `"targeted"`

  - `object { mode, target }`

    - `mode: "targeted"`

      Targeted placement mode.

      - `"targeted"`

    - `target: array of object { region }  or object { hostname }  or object { host }`

      Array of placement targets (currently limited to single target).

      - `Region object { region }`

        - `region: string`

          Cloud region in format 'provider:region'.

      - `Hostname object { hostname }`

        - `hostname: string`

          HTTP hostname for targeted placement.

      - `Host object { host }`

        - `host: string`

          TCP host:port for targeted placement.

- `usage_model: optional "standard" or "bundled" or "unbound"`

  Usage model for the version.

  - `"standard"`

  - `"bundled"`

  - `"unbound"`

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

- `result: Version`

  - `id: string`

    Version identifier.

  - `created_on: string`

    When the version was created.

  - `number: number`

    The integer version number, starting from one.

  - `urls: array of string`

    All routable URLs that always point to this version. Does not include alias URLs, since aliases can be updated to point to a different version.

  - `annotations: optional object { "workers/message", "workers/tag", "workers/triggered_by" }`

    Metadata about the version.

    - `"workers/message": optional string`

      Human-readable message about the version. Truncated to 1000 bytes if longer.

    - `"workers/tag": optional string`

      User-provided identifier for the version. Maximum 100 bytes.

    - `"workers/triggered_by": optional string`

      Operation that triggered the creation of the version.

  - `assets: optional object { config, jwt }`

    Configuration for assets within a Worker.

    [`_headers`](https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers) and
    [`_redirects`](https://developers.cloudflare.com/workers/static-assets/redirects/) files should be
    included as modules named `_headers` and `_redirects` with content type `text/plain`.

    - `config: optional object { html_handling, not_found_handling, run_worker_first }`

      Configuration for assets within a Worker.

      - `html_handling: optional "auto-trailing-slash" or "force-trailing-slash" or "drop-trailing-slash" or "none"`

        Determines the redirects and rewrites of requests for HTML content.

        - `"auto-trailing-slash"`

        - `"force-trailing-slash"`

        - `"drop-trailing-slash"`

        - `"none"`

      - `not_found_handling: optional "none" or "404-page" or "single-page-application"`

        Determines the response when a request does not match a static asset, and there is no Worker script.

        - `"none"`

        - `"404-page"`

        - `"single-page-application"`

      - `run_worker_first: optional array of string or boolean`

        Contains a list path rules to control routing to either the Worker or assets. Glob (*) and negative (!) rules are supported. Rules must start with either '/' or '!/'. At least one non-negative rule must be provided, and negative rules have higher precedence than non-negative rules.

        - `array of string`

          Contains a list path rules to control routing to either the Worker or assets. Glob (*) and negative (!) rules are supported. Rules must start with either '/' or '!/'. At least one non-negative rule must be provided, and negative rules have higher precedence than non-negative rules.

        - `boolean`

          Enables routing to always invoke the Worker script ahead of all requests. When true, this is equivalent to `["/*"]` in the string array version of this field.

    - `jwt: optional string`

      Token provided upon successful upload of all files from a registered manifest.

  - `bindings: optional array of object { name, type }  or object { instance_name, name, type, namespace }  or object { name, namespace, type }  or 32 more`

    List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings.

    - `AI object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "ai"`

        The kind of resource that the binding provides.

        - `"ai"`

    - `AISearch object { instance_name, name, type, namespace }`

      - `instance_name: string`

        The user-chosen instance name. Must exist at deploy time. The worker can search, chat, update, and manage items/jobs on this instance.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "ai_search"`

        The kind of resource that the binding provides.

        - `"ai_search"`

      - `namespace: optional string`

        The namespace the instance belongs to. Defaults to "default" if omitted. Customers who don't use namespaces can simply omit this field.

    - `AISearchNamespace object { name, namespace, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `namespace: string`

        The user-chosen namespace name. Must exist before deploy -- Wrangler handles auto-creation on deploy failure (R2 bucket pattern). The "default" namespace is auto-created by config-api for new accounts. Grants full access (CRUD + search + chat) to all instances within the namespace.

      - `type: "ai_search_namespace"`

        The kind of resource that the binding provides.

        - `"ai_search_namespace"`

    - `AnalyticsEngine object { dataset, name, type }`

      - `dataset: string`

        The name of the dataset to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "analytics_engine"`

        The kind of resource that the binding provides.

        - `"analytics_engine"`

    - `Assets object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "assets"`

        The kind of resource that the binding provides.

        - `"assets"`

    - `Browser object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "browser"`

        The kind of resource that the binding provides.

        - `"browser"`

    - `D1 object { database_id, name, type, id }`

      - `database_id: string`

        Identifier of the D1 database to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "d1"`

        The kind of resource that the binding provides.

        - `"d1"`

      - `id: optional string`

        Identifier of the D1 database to bind to.

    - `DataBlob object { name, part, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `part: string`

        The name of the file containing the data content. Only accepted for `service worker syntax` Workers.

      - `type: "data_blob"`

        The kind of resource that the binding provides.

        - `"data_blob"`

    - `DispatchNamespace object { name, namespace, type, outbound }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `namespace: string`

        The name of the dispatch namespace.

      - `type: "dispatch_namespace"`

        The kind of resource that the binding provides.

        - `"dispatch_namespace"`

      - `outbound: optional object { params, worker }`

        Outbound worker.

        - `params: optional array of object { name }`

          Pass information from the Dispatch Worker to the Outbound Worker through the parameters.

          - `name: string`

            Name of the parameter.

        - `worker: optional object { entrypoint, environment, service }`

          Outbound worker.

          - `entrypoint: optional string`

            Entrypoint to invoke on the outbound worker.

          - `environment: optional string`

            Environment of the outbound worker.

          - `service: optional string`

            Name of the outbound worker.

    - `DurableObjectNamespace object { name, type, class_name, 4 more }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "durable_object_namespace"`

        The kind of resource that the binding provides.

        - `"durable_object_namespace"`

      - `class_name: optional string`

        The exported class name of the Durable Object.

      - `dispatch_namespace: optional string`

        The dispatch namespace the Durable Object script belongs to.

      - `environment: optional string`

        The environment of the script_name to bind to.

      - `namespace_id: optional string`

        Namespace identifier tag.

      - `script_name: optional string`

        The script where the Durable Object is defined, if it is external to this Worker.

    - `Hyperdrive object { id, name, type }`

      - `id: string`

        Identifier of the Hyperdrive connection to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "hyperdrive"`

        The kind of resource that the binding provides.

        - `"hyperdrive"`

    - `Inherit object { name, type, old_name, version_id }`

      - `name: string`

        The name of the inherited binding.

      - `type: "inherit"`

        The kind of resource that the binding provides.

        - `"inherit"`

      - `old_name: optional string`

        The old name of the inherited binding. If set, the binding will be renamed from `old_name` to `name` in the new version. If not set, the binding will keep the same name between versions.

      - `version_id: optional string`

        Identifier for the version to inherit the binding from, which can be the version ID or the literal "latest" to inherit from the latest version. Defaults to inheriting the binding from the latest version.

    - `Images object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "images"`

        The kind of resource that the binding provides.

        - `"images"`

    - `Json object { json, name, type }`

      - `json: unknown`

        JSON data to use.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "json"`

        The kind of resource that the binding provides.

        - `"json"`

    - `KVNamespace object { name, namespace_id, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `namespace_id: string`

        Namespace identifier tag.

      - `type: "kv_namespace"`

        The kind of resource that the binding provides.

        - `"kv_namespace"`

    - `Media object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "media"`

        The kind of resource that the binding provides.

        - `"media"`

    - `MTLSCertificate object { certificate_id, name, type }`

      - `certificate_id: string`

        Identifier of the certificate to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "mtls_certificate"`

        The kind of resource that the binding provides.

        - `"mtls_certificate"`

    - `PlainText object { name, text, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `text: string`

        The text value to use.

      - `type: "plain_text"`

        The kind of resource that the binding provides.

        - `"plain_text"`

    - `Pipelines object { name, pipeline, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `pipeline: string`

        Name of the Pipeline to bind to.

      - `type: "pipelines"`

        The kind of resource that the binding provides.

        - `"pipelines"`

    - `Queue object { name, queue_name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `queue_name: string`

        Name of the Queue to bind to.

      - `type: "queue"`

        The kind of resource that the binding provides.

        - `"queue"`

    - `Ratelimit object { name, namespace_id, simple, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `namespace_id: string`

        Identifier of the rate limit namespace to bind to.

      - `simple: object { limit, period, mitigation_timeout }`

        The rate limit configuration.

        - `limit: number`

          The limit (requests per period).

        - `period: number`

          The period in seconds.

        - `mitigation_timeout: optional number`

          Duration in seconds to apply the mitigation action after the rate limit is exceeded. Valid values are 0 (disabled), 10, or multiples of 60 up to 86400. Must be greater than or equal to the period when non-zero.

      - `type: "ratelimit"`

        The kind of resource that the binding provides.

        - `"ratelimit"`

    - `R2Bucket object { bucket_name, name, type, jurisdiction }`

      - `bucket_name: string`

        R2 bucket to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "r2_bucket"`

        The kind of resource that the binding provides.

        - `"r2_bucket"`

      - `jurisdiction: optional "eu" or "fedramp" or "fedramp-high"`

        The [jurisdiction](https://developers.cloudflare.com/r2/reference/data-location/#jurisdictional-restrictions) of the R2 bucket.

        - `"eu"`

        - `"fedramp"`

        - `"fedramp-high"`

    - `SecretText object { name, text, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `text: string`

        The secret value to use.

      - `type: "secret_text"`

        The kind of resource that the binding provides.

        - `"secret_text"`

    - `SendEmail object { name, type, allowed_destination_addresses, 2 more }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "send_email"`

        The kind of resource that the binding provides.

        - `"send_email"`

      - `allowed_destination_addresses: optional array of string`

        List of allowed destination addresses.

      - `allowed_sender_addresses: optional array of string`

        List of allowed sender addresses.

      - `destination_address: optional string`

        Destination address for the email.

    - `Service object { name, service, type, 2 more }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `service: string`

        Name of Worker to bind to.

      - `type: "service"`

        The kind of resource that the binding provides.

        - `"service"`

      - `entrypoint: optional string`

        Entrypoint to invoke on the target Worker.

      - `environment: optional string`

        Optional environment if the Worker utilizes one.

    - `TextBlob object { name, part, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `part: string`

        The name of the file containing the text content. Only accepted for `service worker syntax` Workers.

      - `type: "text_blob"`

        The kind of resource that the binding provides.

        - `"text_blob"`

    - `Vectorize object { index_name, name, type }`

      - `index_name: string`

        Name of the Vectorize index to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "vectorize"`

        The kind of resource that the binding provides.

        - `"vectorize"`

    - `VersionMetadata object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "version_metadata"`

        The kind of resource that the binding provides.

        - `"version_metadata"`

    - `SecretsStoreSecret object { name, secret_name, store_id, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `secret_name: string`

        Name of the secret in the store.

      - `store_id: string`

        ID of the store containing the secret.

      - `type: "secrets_store_secret"`

        The kind of resource that the binding provides.

        - `"secrets_store_secret"`

    - `Flagship object { app_id, name, type }`

      - `app_id: string`

        ID of the Flagship app to bind to for feature flag evaluation.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "flagship"`

        The kind of resource that the binding provides.

        - `"flagship"`

    - `SecretKey object { algorithm, format, name, 4 more }`

      - `algorithm: unknown`

        Algorithm-specific key parameters. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#algorithm).

      - `format: "raw" or "pkcs8" or "spki" or "jwk"`

        Data format of the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#format).

        - `"raw"`

        - `"pkcs8"`

        - `"spki"`

        - `"jwk"`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "secret_key"`

        The kind of resource that the binding provides.

        - `"secret_key"`

      - `usages: array of "encrypt" or "decrypt" or "sign" or 5 more`

        Allowed operations with the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#keyUsages).

        - `"encrypt"`

        - `"decrypt"`

        - `"sign"`

        - `"verify"`

        - `"deriveKey"`

        - `"deriveBits"`

        - `"wrapKey"`

        - `"unwrapKey"`

      - `key_base64: optional string`

        Base64-encoded key data. Required if `format` is "raw", "pkcs8", or "spki".

      - `key_jwk: optional unknown`

        Key data in [JSON Web Key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#json_web_key) format. Required if `format` is "jwk".

    - `Workflow object { name, type, workflow_name, 2 more }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "workflow"`

        The kind of resource that the binding provides.

        - `"workflow"`

      - `workflow_name: string`

        Name of the Workflow to bind to.

      - `class_name: optional string`

        Class name of the Workflow. Should only be provided if the Workflow belongs to this script.

      - `script_name: optional string`

        Script name that contains the Workflow. If not provided, defaults to this script name.

    - `WasmModule object { name, part, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `part: string`

        The name of the file containing the WebAssembly module content. Only accepted for `service worker syntax` Workers.

      - `type: "wasm_module"`

        The kind of resource that the binding provides.

        - `"wasm_module"`

    - `VPCService object { name, service_id, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `service_id: string`

        Identifier of the VPC service to bind to.

      - `type: "vpc_service"`

        The kind of resource that the binding provides.

        - `"vpc_service"`

    - `VPCNetwork object { name, type, network_id, tunnel_id }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "vpc_network"`

        The kind of resource that the binding provides.

        - `"vpc_network"`

      - `network_id: optional string`

        Identifier of the network to bind to. Only "cf1:network" is currently supported. Mutually exclusive with tunnel_id.

      - `tunnel_id: optional string`

        UUID of the Cloudflare Tunnel to bind to. Mutually exclusive with network_id.

  - `cache_options: optional object { enabled, cross_version_cache }`

    Global CacheW configuration for the Worker. When caching is on,
    the platform provisions a `cloudflare.app` zone for the Worker.
    A `type: worker` entry in the `exports` map can override this
    value for a single entrypoint.

    - `enabled: boolean`

      Whether caching is enabled for this Worker.

    - `cross_version_cache: optional boolean`

      Whether cached responses are shared across Worker version
      uploads. This is independent of `enabled`. It can stay true
      while caching is off, so the preference survives turning
      caching off and back on.

  - `compatibility_date: optional string`

    Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker.

  - `compatibility_flags: optional array of string`

    Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`.

  - `containers: optional array of object { class_name }`

    List of containers attached to a Worker. Containers can only be attached to Durable Object classes of this Worker script.

    - `class_name: string`

      Select which Durable Object class should get this container attached.

  - `limits: optional object { cpu_ms, subrequests }`

    Resource limits enforced at runtime.

    - `cpu_ms: optional number`

      CPU time limit in milliseconds.

    - `subrequests: optional number`

      Subrequest limit per request.

  - `main_module: optional string`

    The name of the main module in the `modules` array (e.g. the name of the module that exports a `fetch` handler).

  - `migration_tag: optional string`

    Durable Object migration tag. Set when the version is deployed. Omitted if the version has not been deployed or the Worker does not use Durable Objects.

  - `migrations: optional SingleStepMigration or object { new_tag, old_tag, steps }`

    Migrations for Durable Objects associated with the version. Migrations are applied when the version is deployed.

    - `SingleStepMigration object { deleted_classes, new_classes, new_sqlite_classes, 4 more }`

      A single set of migrations to apply.

      - `deleted_classes: optional array of string`

        A list of classes to delete Durable Object namespaces from.

      - `new_classes: optional array of string`

        A list of classes to create Durable Object namespaces from.

      - `new_sqlite_classes: optional array of string`

        A list of classes to create Durable Object namespaces with SQLite from.

      - `new_tag: optional string`

        Tag to set as the latest migration tag.

      - `old_tag: optional string`

        Tag used to verify against the latest migration tag for this Worker. If they don't match, the upload is rejected.

      - `renamed_classes: optional array of object { from, to }`

        A list of classes with Durable Object namespaces that were renamed.

        - `from: optional string`

        - `to: optional string`

      - `transferred_classes: optional array of object { from, from_script, to }`

        A list of transfers for Durable Object namespaces from a different Worker and class to a class defined in this Worker.

        - `from: optional string`

        - `from_script: optional string`

        - `to: optional string`

    - `WorkersMultipleStepMigrations object { new_tag, old_tag, steps }`

      - `new_tag: optional string`

        Tag to set as the latest migration tag.

      - `old_tag: optional string`

        Tag used to verify against the latest migration tag for this Worker. If they don't match, the upload is rejected.

      - `steps: optional array of MigrationStep`

        Migrations to apply in order.

        - `deleted_classes: optional array of string`

          A list of classes to delete Durable Object namespaces from.

        - `new_classes: optional array of string`

          A list of classes to create Durable Object namespaces from.

        - `new_sqlite_classes: optional array of string`

          A list of classes to create Durable Object namespaces with SQLite from.

        - `renamed_classes: optional array of object { from, to }`

          A list of classes with Durable Object namespaces that were renamed.

          - `from: optional string`

          - `to: optional string`

        - `transferred_classes: optional array of object { from, from_script, to }`

          A list of transfers for Durable Object namespaces from a different Worker and class to a class defined in this Worker.

          - `from: optional string`

          - `from_script: optional string`

          - `to: optional string`

  - `modules: optional array of object { content_base64, content_type, name }`

    Code, sourcemaps, and other content used at runtime.

    This includes [`_headers`](https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers) and
    [`_redirects`](https://developers.cloudflare.com/workers/static-assets/redirects/) files used to configure
    [Static Assets](https://developers.cloudflare.com/workers/static-assets/). `_headers` and `_redirects` files should be
    included as modules named `_headers` and `_redirects` with content type `text/plain`.

    - `content_base64: string`

      The base64-encoded module content.

    - `content_type: string`

      The content type of the module.

    - `name: string`

      The name of the module.

  - `package_dependencies: optional array of object { installedVersion, name, packageJsonVersion }`

    The list of npm packages that were installed and used when this Worker
    version was built.

    - `installedVersion: string`

      The exact version that was resolved and installed by the package manager.

    - `name: string`

      The npm package name.

    - `packageJsonVersion: string`

      The version constraint as written in package.json.

  - `placement: optional object { mode }  or object { region }  or object { hostname }  or 5 more`

    Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart Placement, or one of region/hostname/host.

    - `Mode object { mode }`

      - `mode: "smart"`

        Enables [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"smart"`

    - `Region object { region }`

      - `region: string`

        Cloud region for targeted placement in format 'provider:region'.

    - `Hostname object { hostname }`

      - `hostname: string`

        HTTP hostname for targeted placement.

    - `Host object { host }`

      - `host: string`

        TCP host and port for targeted placement.

    - `object { mode, region }`

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `region: string`

        Cloud region for targeted placement in format 'provider:region'.

    - `object { hostname, mode }`

      - `hostname: string`

        HTTP hostname for targeted placement.

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

    - `object { host, mode }`

      - `host: string`

        TCP host and port for targeted placement.

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

    - `object { mode, target }`

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `target: array of object { region }  or object { hostname }  or object { host }`

        Array of placement targets (currently limited to single target).

        - `Region object { region }`

          - `region: string`

            Cloud region in format 'provider:region'.

        - `Hostname object { hostname }`

          - `hostname: string`

            HTTP hostname for targeted placement.

        - `Host object { host }`

          - `host: string`

            TCP host:port for targeted placement.

  - `source: optional string`

    The client used to create the version.

  - `startup_time_ms: optional number`

    Time in milliseconds spent on [Worker startup](https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time).

  - `usage_model: optional "standard" or "bundled" or "unbound"`

    Usage model for the version.

    - `"standard"`

    - `"bundled"`

    - `"unbound"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/workers/$WORKER_ID/versions \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "bindings": [
            {
              "name": "MY_ENV_VAR",
              "text": "my_data",
              "type": "plain_text"
            }
          ],
          "compatibility_date": "2021-01-01",
          "compatibility_flags": [
            "nodejs_compat"
          ],
          "containers": [
            {
              "class_name": "MyDurableObject"
            }
          ],
          "main_module": "index.js",
          "usage_model": "standard"
        }'
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
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_on": "2019-12-27T18:11:19.117Z",
    "number": 0,
    "urls": [
      "https://9387e76d-my-worker.my-subdomain.workers.dev"
    ],
    "annotations": {
      "workers/message": "Fixed bug.",
      "workers/tag": "v1.0.1",
      "workers/triggered_by": "upload"
    },
    "assets": {
      "config": {
        "html_handling": "auto-trailing-slash",
        "not_found_handling": "404-page",
        "run_worker_first": true
      },
      "jwt": "jwt"
    },
    "bindings": [
      {
        "name": "MY_ENV_VAR",
        "text": "my_data",
        "type": "plain_text"
      }
    ],
    "cache_options": {
      "enabled": true,
      "cross_version_cache": true
    },
    "compatibility_date": "2021-01-01",
    "compatibility_flags": [
      "nodejs_compat"
    ],
    "containers": [
      {
        "class_name": "MyDurableObject"
      }
    ],
    "limits": {
      "cpu_ms": 50,
      "subrequests": 1000
    },
    "main_module": "index.js",
    "migration_tag": "v1",
    "migrations": {},
    "modules": [
      {
        "content_base64": "ZXhwb3J0IGRlZmF1bHQgewogIGFzeW5jIGZldGNoKHJlcXVlc3QsIGVudiwgY3R4KSB7CiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKCdIZWxsbyBXb3JsZCEnKQogIH0KfQ==",
        "content_type": "application/javascript+module",
        "name": "index.js"
      }
    ],
    "package_dependencies": [
      {
        "installedVersion": "4.17.22",
        "name": "lodash",
        "packageJsonVersion": "^4.17.21"
      }
    ],
    "placement": {
      "mode": "smart"
    },
    "source": "wrangler",
    "startup_time_ms": 10,
    "usage_model": "standard"
  },
  "success": true
}
```

## Delete Version

**delete** `/accounts/{account_id}/workers/workers/{worker_id}/versions/{version_id}`

Delete a version.

### Path Parameters

- `account_id: string`

  Identifier.

- `worker_id: string`

  Identifier for the Worker, which can be ID or name.

- `version_id: string`

  Identifier for the version, which can be a UUID, a UUID prefix (minimum length 8), or the literal "latest" to operate on the most recently created version.

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

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/workers/$WORKER_ID/versions/$VERSION_ID \
    -X DELETE \
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
  "success": true
}
```

## Domain Types

### Version

- `Version object { id, created_on, number, 18 more }`

  - `id: string`

    Version identifier.

  - `created_on: string`

    When the version was created.

  - `number: number`

    The integer version number, starting from one.

  - `urls: array of string`

    All routable URLs that always point to this version. Does not include alias URLs, since aliases can be updated to point to a different version.

  - `annotations: optional object { "workers/message", "workers/tag", "workers/triggered_by" }`

    Metadata about the version.

    - `"workers/message": optional string`

      Human-readable message about the version. Truncated to 1000 bytes if longer.

    - `"workers/tag": optional string`

      User-provided identifier for the version. Maximum 100 bytes.

    - `"workers/triggered_by": optional string`

      Operation that triggered the creation of the version.

  - `assets: optional object { config, jwt }`

    Configuration for assets within a Worker.

    [`_headers`](https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers) and
    [`_redirects`](https://developers.cloudflare.com/workers/static-assets/redirects/) files should be
    included as modules named `_headers` and `_redirects` with content type `text/plain`.

    - `config: optional object { html_handling, not_found_handling, run_worker_first }`

      Configuration for assets within a Worker.

      - `html_handling: optional "auto-trailing-slash" or "force-trailing-slash" or "drop-trailing-slash" or "none"`

        Determines the redirects and rewrites of requests for HTML content.

        - `"auto-trailing-slash"`

        - `"force-trailing-slash"`

        - `"drop-trailing-slash"`

        - `"none"`

      - `not_found_handling: optional "none" or "404-page" or "single-page-application"`

        Determines the response when a request does not match a static asset, and there is no Worker script.

        - `"none"`

        - `"404-page"`

        - `"single-page-application"`

      - `run_worker_first: optional array of string or boolean`

        Contains a list path rules to control routing to either the Worker or assets. Glob (*) and negative (!) rules are supported. Rules must start with either '/' or '!/'. At least one non-negative rule must be provided, and negative rules have higher precedence than non-negative rules.

        - `array of string`

          Contains a list path rules to control routing to either the Worker or assets. Glob (*) and negative (!) rules are supported. Rules must start with either '/' or '!/'. At least one non-negative rule must be provided, and negative rules have higher precedence than non-negative rules.

        - `boolean`

          Enables routing to always invoke the Worker script ahead of all requests. When true, this is equivalent to `["/*"]` in the string array version of this field.

    - `jwt: optional string`

      Token provided upon successful upload of all files from a registered manifest.

  - `bindings: optional array of object { name, type }  or object { instance_name, name, type, namespace }  or object { name, namespace, type }  or 32 more`

    List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings.

    - `AI object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "ai"`

        The kind of resource that the binding provides.

        - `"ai"`

    - `AISearch object { instance_name, name, type, namespace }`

      - `instance_name: string`

        The user-chosen instance name. Must exist at deploy time. The worker can search, chat, update, and manage items/jobs on this instance.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "ai_search"`

        The kind of resource that the binding provides.

        - `"ai_search"`

      - `namespace: optional string`

        The namespace the instance belongs to. Defaults to "default" if omitted. Customers who don't use namespaces can simply omit this field.

    - `AISearchNamespace object { name, namespace, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `namespace: string`

        The user-chosen namespace name. Must exist before deploy -- Wrangler handles auto-creation on deploy failure (R2 bucket pattern). The "default" namespace is auto-created by config-api for new accounts. Grants full access (CRUD + search + chat) to all instances within the namespace.

      - `type: "ai_search_namespace"`

        The kind of resource that the binding provides.

        - `"ai_search_namespace"`

    - `AnalyticsEngine object { dataset, name, type }`

      - `dataset: string`

        The name of the dataset to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "analytics_engine"`

        The kind of resource that the binding provides.

        - `"analytics_engine"`

    - `Assets object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "assets"`

        The kind of resource that the binding provides.

        - `"assets"`

    - `Browser object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "browser"`

        The kind of resource that the binding provides.

        - `"browser"`

    - `D1 object { database_id, name, type, id }`

      - `database_id: string`

        Identifier of the D1 database to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "d1"`

        The kind of resource that the binding provides.

        - `"d1"`

      - `id: optional string`

        Identifier of the D1 database to bind to.

    - `DataBlob object { name, part, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `part: string`

        The name of the file containing the data content. Only accepted for `service worker syntax` Workers.

      - `type: "data_blob"`

        The kind of resource that the binding provides.

        - `"data_blob"`

    - `DispatchNamespace object { name, namespace, type, outbound }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `namespace: string`

        The name of the dispatch namespace.

      - `type: "dispatch_namespace"`

        The kind of resource that the binding provides.

        - `"dispatch_namespace"`

      - `outbound: optional object { params, worker }`

        Outbound worker.

        - `params: optional array of object { name }`

          Pass information from the Dispatch Worker to the Outbound Worker through the parameters.

          - `name: string`

            Name of the parameter.

        - `worker: optional object { entrypoint, environment, service }`

          Outbound worker.

          - `entrypoint: optional string`

            Entrypoint to invoke on the outbound worker.

          - `environment: optional string`

            Environment of the outbound worker.

          - `service: optional string`

            Name of the outbound worker.

    - `DurableObjectNamespace object { name, type, class_name, 4 more }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "durable_object_namespace"`

        The kind of resource that the binding provides.

        - `"durable_object_namespace"`

      - `class_name: optional string`

        The exported class name of the Durable Object.

      - `dispatch_namespace: optional string`

        The dispatch namespace the Durable Object script belongs to.

      - `environment: optional string`

        The environment of the script_name to bind to.

      - `namespace_id: optional string`

        Namespace identifier tag.

      - `script_name: optional string`

        The script where the Durable Object is defined, if it is external to this Worker.

    - `Hyperdrive object { id, name, type }`

      - `id: string`

        Identifier of the Hyperdrive connection to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "hyperdrive"`

        The kind of resource that the binding provides.

        - `"hyperdrive"`

    - `Inherit object { name, type, old_name, version_id }`

      - `name: string`

        The name of the inherited binding.

      - `type: "inherit"`

        The kind of resource that the binding provides.

        - `"inherit"`

      - `old_name: optional string`

        The old name of the inherited binding. If set, the binding will be renamed from `old_name` to `name` in the new version. If not set, the binding will keep the same name between versions.

      - `version_id: optional string`

        Identifier for the version to inherit the binding from, which can be the version ID or the literal "latest" to inherit from the latest version. Defaults to inheriting the binding from the latest version.

    - `Images object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "images"`

        The kind of resource that the binding provides.

        - `"images"`

    - `Json object { json, name, type }`

      - `json: unknown`

        JSON data to use.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "json"`

        The kind of resource that the binding provides.

        - `"json"`

    - `KVNamespace object { name, namespace_id, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `namespace_id: string`

        Namespace identifier tag.

      - `type: "kv_namespace"`

        The kind of resource that the binding provides.

        - `"kv_namespace"`

    - `Media object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "media"`

        The kind of resource that the binding provides.

        - `"media"`

    - `MTLSCertificate object { certificate_id, name, type }`

      - `certificate_id: string`

        Identifier of the certificate to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "mtls_certificate"`

        The kind of resource that the binding provides.

        - `"mtls_certificate"`

    - `PlainText object { name, text, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `text: string`

        The text value to use.

      - `type: "plain_text"`

        The kind of resource that the binding provides.

        - `"plain_text"`

    - `Pipelines object { name, pipeline, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `pipeline: string`

        Name of the Pipeline to bind to.

      - `type: "pipelines"`

        The kind of resource that the binding provides.

        - `"pipelines"`

    - `Queue object { name, queue_name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `queue_name: string`

        Name of the Queue to bind to.

      - `type: "queue"`

        The kind of resource that the binding provides.

        - `"queue"`

    - `Ratelimit object { name, namespace_id, simple, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `namespace_id: string`

        Identifier of the rate limit namespace to bind to.

      - `simple: object { limit, period, mitigation_timeout }`

        The rate limit configuration.

        - `limit: number`

          The limit (requests per period).

        - `period: number`

          The period in seconds.

        - `mitigation_timeout: optional number`

          Duration in seconds to apply the mitigation action after the rate limit is exceeded. Valid values are 0 (disabled), 10, or multiples of 60 up to 86400. Must be greater than or equal to the period when non-zero.

      - `type: "ratelimit"`

        The kind of resource that the binding provides.

        - `"ratelimit"`

    - `R2Bucket object { bucket_name, name, type, jurisdiction }`

      - `bucket_name: string`

        R2 bucket to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "r2_bucket"`

        The kind of resource that the binding provides.

        - `"r2_bucket"`

      - `jurisdiction: optional "eu" or "fedramp" or "fedramp-high"`

        The [jurisdiction](https://developers.cloudflare.com/r2/reference/data-location/#jurisdictional-restrictions) of the R2 bucket.

        - `"eu"`

        - `"fedramp"`

        - `"fedramp-high"`

    - `SecretText object { name, text, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `text: string`

        The secret value to use.

      - `type: "secret_text"`

        The kind of resource that the binding provides.

        - `"secret_text"`

    - `SendEmail object { name, type, allowed_destination_addresses, 2 more }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "send_email"`

        The kind of resource that the binding provides.

        - `"send_email"`

      - `allowed_destination_addresses: optional array of string`

        List of allowed destination addresses.

      - `allowed_sender_addresses: optional array of string`

        List of allowed sender addresses.

      - `destination_address: optional string`

        Destination address for the email.

    - `Service object { name, service, type, 2 more }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `service: string`

        Name of Worker to bind to.

      - `type: "service"`

        The kind of resource that the binding provides.

        - `"service"`

      - `entrypoint: optional string`

        Entrypoint to invoke on the target Worker.

      - `environment: optional string`

        Optional environment if the Worker utilizes one.

    - `TextBlob object { name, part, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `part: string`

        The name of the file containing the text content. Only accepted for `service worker syntax` Workers.

      - `type: "text_blob"`

        The kind of resource that the binding provides.

        - `"text_blob"`

    - `Vectorize object { index_name, name, type }`

      - `index_name: string`

        Name of the Vectorize index to bind to.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "vectorize"`

        The kind of resource that the binding provides.

        - `"vectorize"`

    - `VersionMetadata object { name, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "version_metadata"`

        The kind of resource that the binding provides.

        - `"version_metadata"`

    - `SecretsStoreSecret object { name, secret_name, store_id, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `secret_name: string`

        Name of the secret in the store.

      - `store_id: string`

        ID of the store containing the secret.

      - `type: "secrets_store_secret"`

        The kind of resource that the binding provides.

        - `"secrets_store_secret"`

    - `Flagship object { app_id, name, type }`

      - `app_id: string`

        ID of the Flagship app to bind to for feature flag evaluation.

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "flagship"`

        The kind of resource that the binding provides.

        - `"flagship"`

    - `SecretKey object { algorithm, format, name, 4 more }`

      - `algorithm: unknown`

        Algorithm-specific key parameters. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#algorithm).

      - `format: "raw" or "pkcs8" or "spki" or "jwk"`

        Data format of the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#format).

        - `"raw"`

        - `"pkcs8"`

        - `"spki"`

        - `"jwk"`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "secret_key"`

        The kind of resource that the binding provides.

        - `"secret_key"`

      - `usages: array of "encrypt" or "decrypt" or "sign" or 5 more`

        Allowed operations with the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#keyUsages).

        - `"encrypt"`

        - `"decrypt"`

        - `"sign"`

        - `"verify"`

        - `"deriveKey"`

        - `"deriveBits"`

        - `"wrapKey"`

        - `"unwrapKey"`

      - `key_base64: optional string`

        Base64-encoded key data. Required if `format` is "raw", "pkcs8", or "spki".

      - `key_jwk: optional unknown`

        Key data in [JSON Web Key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#json_web_key) format. Required if `format` is "jwk".

    - `Workflow object { name, type, workflow_name, 2 more }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "workflow"`

        The kind of resource that the binding provides.

        - `"workflow"`

      - `workflow_name: string`

        Name of the Workflow to bind to.

      - `class_name: optional string`

        Class name of the Workflow. Should only be provided if the Workflow belongs to this script.

      - `script_name: optional string`

        Script name that contains the Workflow. If not provided, defaults to this script name.

    - `WasmModule object { name, part, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `part: string`

        The name of the file containing the WebAssembly module content. Only accepted for `service worker syntax` Workers.

      - `type: "wasm_module"`

        The kind of resource that the binding provides.

        - `"wasm_module"`

    - `VPCService object { name, service_id, type }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `service_id: string`

        Identifier of the VPC service to bind to.

      - `type: "vpc_service"`

        The kind of resource that the binding provides.

        - `"vpc_service"`

    - `VPCNetwork object { name, type, network_id, tunnel_id }`

      - `name: string`

        A JavaScript variable name for the binding.

      - `type: "vpc_network"`

        The kind of resource that the binding provides.

        - `"vpc_network"`

      - `network_id: optional string`

        Identifier of the network to bind to. Only "cf1:network" is currently supported. Mutually exclusive with tunnel_id.

      - `tunnel_id: optional string`

        UUID of the Cloudflare Tunnel to bind to. Mutually exclusive with network_id.

  - `cache_options: optional object { enabled, cross_version_cache }`

    Global CacheW configuration for the Worker. When caching is on,
    the platform provisions a `cloudflare.app` zone for the Worker.
    A `type: worker` entry in the `exports` map can override this
    value for a single entrypoint.

    - `enabled: boolean`

      Whether caching is enabled for this Worker.

    - `cross_version_cache: optional boolean`

      Whether cached responses are shared across Worker version
      uploads. This is independent of `enabled`. It can stay true
      while caching is off, so the preference survives turning
      caching off and back on.

  - `compatibility_date: optional string`

    Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker.

  - `compatibility_flags: optional array of string`

    Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`.

  - `containers: optional array of object { class_name }`

    List of containers attached to a Worker. Containers can only be attached to Durable Object classes of this Worker script.

    - `class_name: string`

      Select which Durable Object class should get this container attached.

  - `limits: optional object { cpu_ms, subrequests }`

    Resource limits enforced at runtime.

    - `cpu_ms: optional number`

      CPU time limit in milliseconds.

    - `subrequests: optional number`

      Subrequest limit per request.

  - `main_module: optional string`

    The name of the main module in the `modules` array (e.g. the name of the module that exports a `fetch` handler).

  - `migration_tag: optional string`

    Durable Object migration tag. Set when the version is deployed. Omitted if the version has not been deployed or the Worker does not use Durable Objects.

  - `migrations: optional SingleStepMigration or object { new_tag, old_tag, steps }`

    Migrations for Durable Objects associated with the version. Migrations are applied when the version is deployed.

    - `SingleStepMigration object { deleted_classes, new_classes, new_sqlite_classes, 4 more }`

      A single set of migrations to apply.

      - `deleted_classes: optional array of string`

        A list of classes to delete Durable Object namespaces from.

      - `new_classes: optional array of string`

        A list of classes to create Durable Object namespaces from.

      - `new_sqlite_classes: optional array of string`

        A list of classes to create Durable Object namespaces with SQLite from.

      - `new_tag: optional string`

        Tag to set as the latest migration tag.

      - `old_tag: optional string`

        Tag used to verify against the latest migration tag for this Worker. If they don't match, the upload is rejected.

      - `renamed_classes: optional array of object { from, to }`

        A list of classes with Durable Object namespaces that were renamed.

        - `from: optional string`

        - `to: optional string`

      - `transferred_classes: optional array of object { from, from_script, to }`

        A list of transfers for Durable Object namespaces from a different Worker and class to a class defined in this Worker.

        - `from: optional string`

        - `from_script: optional string`

        - `to: optional string`

    - `WorkersMultipleStepMigrations object { new_tag, old_tag, steps }`

      - `new_tag: optional string`

        Tag to set as the latest migration tag.

      - `old_tag: optional string`

        Tag used to verify against the latest migration tag for this Worker. If they don't match, the upload is rejected.

      - `steps: optional array of MigrationStep`

        Migrations to apply in order.

        - `deleted_classes: optional array of string`

          A list of classes to delete Durable Object namespaces from.

        - `new_classes: optional array of string`

          A list of classes to create Durable Object namespaces from.

        - `new_sqlite_classes: optional array of string`

          A list of classes to create Durable Object namespaces with SQLite from.

        - `renamed_classes: optional array of object { from, to }`

          A list of classes with Durable Object namespaces that were renamed.

          - `from: optional string`

          - `to: optional string`

        - `transferred_classes: optional array of object { from, from_script, to }`

          A list of transfers for Durable Object namespaces from a different Worker and class to a class defined in this Worker.

          - `from: optional string`

          - `from_script: optional string`

          - `to: optional string`

  - `modules: optional array of object { content_base64, content_type, name }`

    Code, sourcemaps, and other content used at runtime.

    This includes [`_headers`](https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers) and
    [`_redirects`](https://developers.cloudflare.com/workers/static-assets/redirects/) files used to configure
    [Static Assets](https://developers.cloudflare.com/workers/static-assets/). `_headers` and `_redirects` files should be
    included as modules named `_headers` and `_redirects` with content type `text/plain`.

    - `content_base64: string`

      The base64-encoded module content.

    - `content_type: string`

      The content type of the module.

    - `name: string`

      The name of the module.

  - `package_dependencies: optional array of object { installedVersion, name, packageJsonVersion }`

    The list of npm packages that were installed and used when this Worker
    version was built.

    - `installedVersion: string`

      The exact version that was resolved and installed by the package manager.

    - `name: string`

      The npm package name.

    - `packageJsonVersion: string`

      The version constraint as written in package.json.

  - `placement: optional object { mode }  or object { region }  or object { hostname }  or 5 more`

    Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart Placement, or one of region/hostname/host.

    - `Mode object { mode }`

      - `mode: "smart"`

        Enables [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"smart"`

    - `Region object { region }`

      - `region: string`

        Cloud region for targeted placement in format 'provider:region'.

    - `Hostname object { hostname }`

      - `hostname: string`

        HTTP hostname for targeted placement.

    - `Host object { host }`

      - `host: string`

        TCP host and port for targeted placement.

    - `object { mode, region }`

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `region: string`

        Cloud region for targeted placement in format 'provider:region'.

    - `object { hostname, mode }`

      - `hostname: string`

        HTTP hostname for targeted placement.

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

    - `object { host, mode }`

      - `host: string`

        TCP host and port for targeted placement.

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

    - `object { mode, target }`

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `target: array of object { region }  or object { hostname }  or object { host }`

        Array of placement targets (currently limited to single target).

        - `Region object { region }`

          - `region: string`

            Cloud region in format 'provider:region'.

        - `Hostname object { hostname }`

          - `hostname: string`

            HTTP hostname for targeted placement.

        - `Host object { host }`

          - `host: string`

            TCP host:port for targeted placement.

  - `source: optional string`

    The client used to create the version.

  - `startup_time_ms: optional number`

    Time in milliseconds spent on [Worker startup](https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time).

  - `usage_model: optional "standard" or "bundled" or "unbound"`

    Usage model for the version.

    - `"standard"`

    - `"bundled"`

    - `"unbound"`

### Version Delete Response

- `VersionDeleteResponse object { errors, messages, success }`

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

  - `success: true`

    Whether the API call was successful.

    - `true`
