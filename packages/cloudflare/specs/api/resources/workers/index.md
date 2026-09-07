# Workers

## Domain Types

### Migration Step

- `MigrationStep object { deleted_classes, new_classes, new_sqlite_classes, 2 more }`

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

### Single Step Migration

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

### Worker Metadata

- `WorkerMetadata object { body_part, main_module }`

  JSON-encoded metadata about the uploaded parts and Worker configuration.

  - `body_part: optional string`

    Name of the part in the multipart request that contains the script (e.g. the file adding a listener to the `fetch` event). Indicates a `service worker syntax` Worker.

  - `main_module: optional string`

    Name of the part in the multipart request that contains the main module (e.g. the file exporting a `fetch` handler). Indicates a `module syntax` Worker.

# Beta

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

# Routes

## List Routes

**get** `/zones/{zone_id}/workers/routes`

Returns routes for a zone.

### Path Parameters

- `zone_id: string`

  Identifier.

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

- `result: array of object { id, pattern, script }`

  - `id: string`

    Identifier.

  - `pattern: string`

    Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior).

  - `script: optional string`

    Name of the script to run if the route matches.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/workers/routes \
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "pattern": "example.com/*",
      "script": "my-workers-script"
    }
  ],
  "success": true
}
```

## Get Route

**get** `/zones/{zone_id}/workers/routes/{route_id}`

Returns information about a route, including URL pattern and Worker.

### Path Parameters

- `zone_id: string`

  Identifier.

- `route_id: string`

  Identifier.

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

- `result: object { id, pattern, script }`

  - `id: string`

    Identifier.

  - `pattern: string`

    Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior).

  - `script: optional string`

    Name of the script to run if the route matches.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/workers/routes/$ROUTE_ID \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "pattern": "example.com/*",
    "script": "my-workers-script"
  },
  "success": true
}
```

## Create Route

**post** `/zones/{zone_id}/workers/routes`

Creates a route that maps a URL pattern to a Worker.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `pattern: string`

  Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior).

- `script: optional string`

  Name of the script to run if the route matches.

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

- `result: object { id, pattern, script }`

  - `id: string`

    Identifier.

  - `pattern: string`

    Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior).

  - `script: optional string`

    Name of the script to run if the route matches.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/workers/routes \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "pattern": "example.com/*",
          "script": "my-workers-script"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "pattern": "example.com/*",
    "script": "my-workers-script"
  },
  "success": true
}
```

## Update Route

**put** `/zones/{zone_id}/workers/routes/{route_id}`

Updates the URL pattern or Worker associated with a route.

### Path Parameters

- `zone_id: string`

  Identifier.

- `route_id: string`

  Identifier.

### Body Parameters

- `pattern: string`

  Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior).

- `script: optional string`

  Name of the script to run if the route matches.

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

- `result: object { id, pattern, script }`

  - `id: string`

    Identifier.

  - `pattern: string`

    Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior).

  - `script: optional string`

    Name of the script to run if the route matches.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/workers/routes/$ROUTE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "pattern": "example.com/*",
          "script": "my-workers-script"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "pattern": "example.com/*",
    "script": "my-workers-script"
  },
  "success": true
}
```

## Delete Route

**delete** `/zones/{zone_id}/workers/routes/{route_id}`

Deletes a route.

### Path Parameters

- `zone_id: string`

  Identifier.

- `route_id: string`

  Identifier.

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

- `result: object { id }`

  - `id: optional string`

    Identifier.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/workers/routes/$ROUTE_ID \
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  },
  "success": true
}
```

## Domain Types

### Route List Response

- `RouteListResponse object { id, pattern, script }`

  - `id: string`

    Identifier.

  - `pattern: string`

    Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior).

  - `script: optional string`

    Name of the script to run if the route matches.

### Route Get Response

- `RouteGetResponse object { id, pattern, script }`

  - `id: string`

    Identifier.

  - `pattern: string`

    Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior).

  - `script: optional string`

    Name of the script to run if the route matches.

### Route Create Response

- `RouteCreateResponse object { id, pattern, script }`

  - `id: string`

    Identifier.

  - `pattern: string`

    Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior).

  - `script: optional string`

    Name of the script to run if the route matches.

### Route Update Response

- `RouteUpdateResponse object { id, pattern, script }`

  - `id: string`

    Identifier.

  - `pattern: string`

    Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior).

  - `script: optional string`

    Name of the script to run if the route matches.

### Route Delete Response

- `RouteDeleteResponse object { id }`

  - `id: optional string`

    Identifier.

# Assets

# Upload

## Upload Assets

**post** `/accounts/{account_id}/workers/assets/upload`

Upload assets ahead of creating a Worker version.  To learn more about the direct uploads of assets, see https://developers.cloudflare.com/workers/static-assets/direct-upload/.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `base64: true`

  Whether the file contents are base64-encoded. Must be `true`.

  - `true`

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

- `result: optional object { jwt }`

  - `jwt: optional string`

    A "completion" JWT which can be redeemed when creating a Worker version.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/assets/upload \
    -H 'Content-Type: multipart/form-data' \
    -F body='{"foo":"string"}'
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
  "success": true,
  "result": {
    "jwt": "jwt"
  }
}
```

## Domain Types

### Upload Create Response

- `UploadCreateResponse object { jwt }`

  - `jwt: optional string`

    A "completion" JWT which can be redeemed when creating a Worker version.

# Scripts

## List Workers

**get** `/accounts/{account_id}/workers/scripts`

Fetch a list of uploaded workers.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `tags: optional string`

  Filter scripts by tags. Format: comma-separated list of tag:allowed pairs where allowed is 'yes' or 'no'.

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

- `result: array of object { id, cache_options, compatibility_date, 20 more }`

  - `id: optional string`

    The name used to identify the script.

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

  - `created_on: optional string`

    When the script was created.

  - `etag: optional string`

    Hashed script content, can be used in a If-None-Match header when updating.

  - `handlers: optional array of string`

    The names of handlers exported as part of the default export.

  - `has_assets: optional boolean`

    Whether a Worker contains assets.

  - `has_modules: optional boolean`

    Whether a Worker contains modules.

  - `last_deployed_from: optional string`

    The client most recently used to deploy this Worker.

  - `logpush: optional boolean`

    Whether Logpush is turned on for the Worker.

  - `migration_tag: optional string`

    The tag of the Durable Object migration that was most recently applied for this Worker.

  - `modified_on: optional string`

    When the script was last modified.

  - `named_handlers: optional array of object { handlers, name }`

    Named exports, such as Durable Object class implementations and named entrypoints.

    - `handlers: optional array of string`

      The names of handlers exported as part of the named export.

    - `name: optional string`

      The name of the export.

  - `observability: optional object { enabled, head_sampling_rate, logs, traces }`

    Observability settings for the Worker.

    - `enabled: boolean`

      Whether observability is enabled for the Worker.

    - `head_sampling_rate: optional number`

      The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

    - `logs: optional object { enabled, invocation_logs, destinations, 2 more }`

      Log settings for the Worker.

      - `enabled: boolean`

        Whether logs are enabled for the Worker.

      - `invocation_logs: boolean`

        Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.

      - `destinations: optional array of string`

        A list of destinations where logs will be exported to.

      - `head_sampling_rate: optional number`

        The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether log persistence is enabled for the Worker.

    - `traces: optional object { destinations, enabled, head_sampling_rate, 2 more }`

      Trace settings for the Worker.

      - `destinations: optional array of string`

        A list of destinations where traces will be exported to.

      - `enabled: optional boolean`

        Whether traces are enabled for the Worker.

      - `head_sampling_rate: optional number`

        The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether trace persistence is enabled for the Worker.

      - `propagation_policy: optional "authenticated" or "accept"`

        Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" (default) honors inbound trace context only when accompanied by a valid trace auth token. "accept" unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled.

        - `"authenticated"`

        - `"accept"`

  - `placement: optional object { mode, last_analyzed_at, status }  or object { region, last_analyzed_at, status }  or object { hostname, last_analyzed_at, status }  or 5 more`

    Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart Placement, or one of region/hostname/host.

    - `object { mode, last_analyzed_at, status }`

      - `mode: "smart"`

        Enables [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"smart"`

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { region, last_analyzed_at, status }`

      - `region: string`

        Cloud region for targeted placement in format 'provider:region'.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { hostname, last_analyzed_at, status }`

      - `hostname: string`

        HTTP hostname for targeted placement.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { host, last_analyzed_at, status }`

      - `host: string`

        TCP host and port for targeted placement.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { mode, region, last_analyzed_at, status }`

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `region: string`

        Cloud region for targeted placement in format 'provider:region'.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { hostname, mode, last_analyzed_at, status }`

      - `hostname: string`

        HTTP hostname for targeted placement.

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { host, mode, last_analyzed_at, status }`

      - `host: string`

        TCP host and port for targeted placement.

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { mode, target, last_analyzed_at, status }`

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

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

  - `placement_mode: optional "smart" or "targeted"`

    - `"smart"`

    - `"targeted"`

  - `placement_status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

    - `"SUCCESS"`

    - `"UNSUPPORTED_APPLICATION"`

    - `"INSUFFICIENT_INVOCATIONS"`

  - `routes: optional array of object { id, pattern, script }`

    Routes associated with the Worker.

    - `id: string`

      Identifier.

    - `pattern: string`

      Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior).

    - `script: optional string`

      Name of the script to run if the route matches.

  - `tag: optional string`

    The immutable ID of the script.

  - `tags: optional array of string`

    Tags associated with the Worker.

  - `tail_consumers: optional array of ConsumerScript`

    List of Workers that will consume logs from the attached Worker.

    - `service: string`

      Name of Worker that is to be the consumer.

    - `environment: optional string`

      Optional environment if the Worker utilizes one.

    - `namespace: optional string`

      Optional dispatch namespace the script belongs to.

  - `usage_model: optional "standard" or "bundled" or "unbound"`

    Usage model for the Worker invocations.

    - `"standard"`

    - `"bundled"`

    - `"unbound"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts \
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
      "id": "my-workers-script",
      "cache_options": {
        "enabled": true,
        "cross_version_cache": true
      },
      "compatibility_date": "2021-01-01",
      "compatibility_flags": [
        "nodejs_compat"
      ],
      "created_on": "2017-01-01T00:00:00Z",
      "etag": "ea95132c15732412d22c1476fa83f27a",
      "handlers": [
        "fetch",
        "scheduled"
      ],
      "has_assets": false,
      "has_modules": false,
      "last_deployed_from": "wrangler",
      "logpush": false,
      "migration_tag": "v1",
      "modified_on": "2017-01-01T00:00:00Z",
      "named_handlers": [
        {
          "handlers": [
            "class"
          ],
          "name": "MyDurableObject"
        }
      ],
      "observability": {
        "enabled": true,
        "head_sampling_rate": 0.1,
        "logs": {
          "enabled": true,
          "invocation_logs": true,
          "destinations": [
            "cloudflare"
          ],
          "head_sampling_rate": 0.1,
          "persist": true
        },
        "traces": {
          "destinations": [
            "cloudflare"
          ],
          "enabled": true,
          "head_sampling_rate": 0.1,
          "persist": true,
          "propagation_policy": "authenticated"
        }
      },
      "placement": {
        "mode": "smart",
        "last_analyzed_at": "2025-01-01T00:00:00Z",
        "status": "SUCCESS"
      },
      "placement_mode": "smart",
      "placement_status": "SUCCESS",
      "routes": [
        {
          "id": "023e105f4ecef8ad9ca31a8372d0c353",
          "pattern": "example.com/*",
          "script": "my-workers-script"
        }
      ],
      "tag": "e8f70fdbc8b1fb0b8ddb1af166186758",
      "tags": [
        "my-team",
        "my-public-api"
      ],
      "tail_consumers": [
        {
          "service": "my-log-consumer",
          "environment": "production",
          "namespace": "my-namespace"
        }
      ],
      "usage_model": "standard"
    }
  ],
  "success": true
}
```

## Search Workers

**get** `/accounts/{account_id}/workers/scripts-search`

Search for Workers in an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `id: optional string`

  Worker ID (also called tag) to search for. Only exact matches are returned.

- `name: optional string`

  Worker name to search for. Both exact and partial matches are returned.

- `order_by: optional "created_on" or "modified_on" or "name"`

  Property to sort results by. Results are sorted in ascending order.

  - `"created_on"`

  - `"modified_on"`

  - `"name"`

- `page: optional number`

  Current page.

- `per_page: optional number`

  Items per page.

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

- `result: array of object { id, created_on, modified_on, 4 more }`

  - `id: string`

    Identifier.

  - `created_on: string`

    When the script was created.

  - `modified_on: string`

    When the script was last modified.

  - `script_name: string`

    Name of the script, used in URLs and route configuration.

  - `environment_is_default: optional boolean`

    Whether the environment is the default environment.

  - `environment_name: optional string`

    Name of the environment.

  - `service_name: optional string`

    Name of the service.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts-search \
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_on": "2017-01-01T00:00:00Z",
      "modified_on": "2017-01-01T00:00:00Z",
      "script_name": "this-is_my_script-01",
      "environment_is_default": true,
      "environment_name": "production",
      "service_name": "my-service"
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

## Download Worker

**get** `/accounts/{account_id}/workers/scripts/{script_name}`

Fetch raw script content for your worker. Note this is the original script content, not JSON encoded.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Upload Worker Module

**put** `/accounts/{account_id}/workers/scripts/{script_name}`

Upload a worker module. You can find more about the multipart metadata on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

### Query Parameters

- `bindings_inherit: optional "strict"`

  When set to "strict", the upload will fail if any `inherit` type bindings cannot be resolved against the previous version of the Worker. Without this, unresolvable inherit bindings are silently dropped.

  - `"strict"`

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

- `result: object { startup_time_ms, id, cache_options, 21 more }`

  - `startup_time_ms: number`

  - `id: optional string`

    The name used to identify the script.

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

  - `created_on: optional string`

    When the script was created.

  - `entry_point: optional string`

    The entry point for the script.

  - `etag: optional string`

    Hashed script content, can be used in a If-None-Match header when updating.

  - `handlers: optional array of string`

    The names of handlers exported as part of the default export.

  - `has_assets: optional boolean`

    Whether a Worker contains assets.

  - `has_modules: optional boolean`

    Whether a Worker contains modules.

  - `last_deployed_from: optional string`

    The client most recently used to deploy this Worker.

  - `logpush: optional boolean`

    Whether Logpush is turned on for the Worker.

  - `migration_tag: optional string`

    The tag of the Durable Object migration that was most recently applied for this Worker.

  - `modified_on: optional string`

    When the script was last modified.

  - `named_handlers: optional array of object { handlers, name }`

    Named exports, such as Durable Object class implementations and named entrypoints.

    - `handlers: optional array of string`

      The names of handlers exported as part of the named export.

    - `name: optional string`

      The name of the export.

  - `observability: optional object { enabled, head_sampling_rate, logs, traces }`

    Observability settings for the Worker.

    - `enabled: boolean`

      Whether observability is enabled for the Worker.

    - `head_sampling_rate: optional number`

      The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

    - `logs: optional object { enabled, invocation_logs, destinations, 2 more }`

      Log settings for the Worker.

      - `enabled: boolean`

        Whether logs are enabled for the Worker.

      - `invocation_logs: boolean`

        Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.

      - `destinations: optional array of string`

        A list of destinations where logs will be exported to.

      - `head_sampling_rate: optional number`

        The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether log persistence is enabled for the Worker.

    - `traces: optional object { destinations, enabled, head_sampling_rate, 2 more }`

      Trace settings for the Worker.

      - `destinations: optional array of string`

        A list of destinations where traces will be exported to.

      - `enabled: optional boolean`

        Whether traces are enabled for the Worker.

      - `head_sampling_rate: optional number`

        The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether trace persistence is enabled for the Worker.

      - `propagation_policy: optional "authenticated" or "accept"`

        Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" (default) honors inbound trace context only when accompanied by a valid trace auth token. "accept" unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled.

        - `"authenticated"`

        - `"accept"`

  - `placement: optional object { mode, last_analyzed_at, status }  or object { region, last_analyzed_at, status }  or object { hostname, last_analyzed_at, status }  or 5 more`

    Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart Placement, or one of region/hostname/host.

    - `object { mode, last_analyzed_at, status }`

      - `mode: "smart"`

        Enables [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"smart"`

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { region, last_analyzed_at, status }`

      - `region: string`

        Cloud region for targeted placement in format 'provider:region'.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { hostname, last_analyzed_at, status }`

      - `hostname: string`

        HTTP hostname for targeted placement.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { host, last_analyzed_at, status }`

      - `host: string`

        TCP host and port for targeted placement.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { mode, region, last_analyzed_at, status }`

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `region: string`

        Cloud region for targeted placement in format 'provider:region'.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { hostname, mode, last_analyzed_at, status }`

      - `hostname: string`

        HTTP hostname for targeted placement.

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { host, mode, last_analyzed_at, status }`

      - `host: string`

        TCP host and port for targeted placement.

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { mode, target, last_analyzed_at, status }`

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

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

  - `placement_mode: optional "smart" or "targeted"`

    - `"smart"`

    - `"targeted"`

  - `placement_status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

    - `"SUCCESS"`

    - `"UNSUPPORTED_APPLICATION"`

    - `"INSUFFICIENT_INVOCATIONS"`

  - `tag: optional string`

    The immutable ID of the script.

  - `tags: optional array of string`

    Tags associated with the Worker.

  - `tail_consumers: optional array of ConsumerScript`

    List of Workers that will consume logs from the attached Worker.

    - `service: string`

      Name of Worker that is to be the consumer.

    - `environment: optional string`

      Optional environment if the Worker utilizes one.

    - `namespace: optional string`

      Optional dispatch namespace the script belongs to.

  - `usage_model: optional "standard" or "bundled" or "unbound"`

    Usage model for the Worker invocations.

    - `"standard"`

    - `"bundled"`

    - `"unbound"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME \
    -X PUT \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F metadata='{}'
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
    "startup_time_ms": 10,
    "id": "this-is_my_script-01",
    "cache_options": {
      "enabled": true,
      "cross_version_cache": true
    },
    "compatibility_date": "2021-01-01",
    "compatibility_flags": [
      "nodejs_compat"
    ],
    "created_on": "2022-05-05T05:15:11.602148Z",
    "entry_point": "index.js",
    "etag": "777f24a43bef5f69174aa69ceaf1dea67968d510a31d1vw3e49d34a0187c06d1",
    "handlers": [
      "fetch"
    ],
    "has_assets": false,
    "has_modules": false,
    "last_deployed_from": "wrangler",
    "logpush": false,
    "migration_tag": "v1",
    "modified_on": "2022-05-20T19:02:56.446492Z",
    "named_handlers": [
      {
        "handlers": [
          "class"
        ],
        "name": "MyDurableObject"
      }
    ],
    "observability": {
      "enabled": true,
      "head_sampling_rate": 0.1,
      "logs": {
        "enabled": true,
        "invocation_logs": true,
        "destinations": [
          "cloudflare"
        ],
        "head_sampling_rate": 0.1,
        "persist": true
      },
      "traces": {
        "destinations": [
          "cloudflare"
        ],
        "enabled": true,
        "head_sampling_rate": 0.1,
        "persist": true,
        "propagation_policy": "authenticated"
      }
    },
    "placement": {
      "mode": "smart",
      "last_analyzed_at": "2025-01-01T00:00:00Z",
      "status": "SUCCESS"
    },
    "placement_mode": "smart",
    "placement_status": "SUCCESS",
    "tag": "e8f70fdbc8b1fb0b8ddb1af166186758",
    "tags": [
      "my-team",
      "my-public-api"
    ],
    "tail_consumers": [
      {
        "service": "my-log-consumer",
        "environment": "production",
        "namespace": "my-namespace"
      }
    ],
    "usage_model": "standard"
  },
  "success": true
}
```

## Delete Worker

**delete** `/accounts/{account_id}/workers/scripts/{script_name}`

Delete your worker. This call has no response body on a successful delete.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

### Query Parameters

- `force: optional boolean`

  If set to true, delete will not be stopped by associated service binding, durable object, or other binding. Any of these associated bindings/durable objects will be deleted along with the script.

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

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME \
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
  "success": true,
  "result": {}
}
```

## Domain Types

### Script

- `Script object { id, cache_options, compatibility_date, 19 more }`

  - `id: optional string`

    The name used to identify the script.

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

  - `created_on: optional string`

    When the script was created.

  - `etag: optional string`

    Hashed script content, can be used in a If-None-Match header when updating.

  - `handlers: optional array of string`

    The names of handlers exported as part of the default export.

  - `has_assets: optional boolean`

    Whether a Worker contains assets.

  - `has_modules: optional boolean`

    Whether a Worker contains modules.

  - `last_deployed_from: optional string`

    The client most recently used to deploy this Worker.

  - `logpush: optional boolean`

    Whether Logpush is turned on for the Worker.

  - `migration_tag: optional string`

    The tag of the Durable Object migration that was most recently applied for this Worker.

  - `modified_on: optional string`

    When the script was last modified.

  - `named_handlers: optional array of object { handlers, name }`

    Named exports, such as Durable Object class implementations and named entrypoints.

    - `handlers: optional array of string`

      The names of handlers exported as part of the named export.

    - `name: optional string`

      The name of the export.

  - `observability: optional object { enabled, head_sampling_rate, logs, traces }`

    Observability settings for the Worker.

    - `enabled: boolean`

      Whether observability is enabled for the Worker.

    - `head_sampling_rate: optional number`

      The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

    - `logs: optional object { enabled, invocation_logs, destinations, 2 more }`

      Log settings for the Worker.

      - `enabled: boolean`

        Whether logs are enabled for the Worker.

      - `invocation_logs: boolean`

        Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.

      - `destinations: optional array of string`

        A list of destinations where logs will be exported to.

      - `head_sampling_rate: optional number`

        The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether log persistence is enabled for the Worker.

    - `traces: optional object { destinations, enabled, head_sampling_rate, 2 more }`

      Trace settings for the Worker.

      - `destinations: optional array of string`

        A list of destinations where traces will be exported to.

      - `enabled: optional boolean`

        Whether traces are enabled for the Worker.

      - `head_sampling_rate: optional number`

        The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether trace persistence is enabled for the Worker.

      - `propagation_policy: optional "authenticated" or "accept"`

        Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" (default) honors inbound trace context only when accompanied by a valid trace auth token. "accept" unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled.

        - `"authenticated"`

        - `"accept"`

  - `placement: optional object { mode, last_analyzed_at, status }  or object { region, last_analyzed_at, status }  or object { hostname, last_analyzed_at, status }  or 5 more`

    Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart Placement, or one of region/hostname/host.

    - `object { mode, last_analyzed_at, status }`

      - `mode: "smart"`

        Enables [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"smart"`

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { region, last_analyzed_at, status }`

      - `region: string`

        Cloud region for targeted placement in format 'provider:region'.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { hostname, last_analyzed_at, status }`

      - `hostname: string`

        HTTP hostname for targeted placement.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { host, last_analyzed_at, status }`

      - `host: string`

        TCP host and port for targeted placement.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { mode, region, last_analyzed_at, status }`

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `region: string`

        Cloud region for targeted placement in format 'provider:region'.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { hostname, mode, last_analyzed_at, status }`

      - `hostname: string`

        HTTP hostname for targeted placement.

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { host, mode, last_analyzed_at, status }`

      - `host: string`

        TCP host and port for targeted placement.

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { mode, target, last_analyzed_at, status }`

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

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

  - `placement_mode: optional "smart" or "targeted"`

    Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart Placement, or one of region/hostname/host.

    - `"smart"`

    - `"targeted"`

  - `placement_status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

    Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

    - `"SUCCESS"`

    - `"UNSUPPORTED_APPLICATION"`

    - `"INSUFFICIENT_INVOCATIONS"`

  - `tag: optional string`

    The immutable ID of the script.

  - `tags: optional array of string`

    Tags associated with the Worker.

  - `tail_consumers: optional array of ConsumerScript`

    List of Workers that will consume logs from the attached Worker.

    - `service: string`

      Name of Worker that is to be the consumer.

    - `environment: optional string`

      Optional environment if the Worker utilizes one.

    - `namespace: optional string`

      Optional dispatch namespace the script belongs to.

  - `usage_model: optional "standard" or "bundled" or "unbound"`

    Usage model for the Worker invocations.

    - `"standard"`

    - `"bundled"`

    - `"unbound"`

### Script Setting

- `ScriptSetting object { logpush, observability, tags, tail_consumers }`

  - `logpush: optional boolean`

    Whether Logpush is turned on for the Worker.

  - `observability: optional object { enabled, head_sampling_rate, logs, traces }`

    Observability settings for the Worker.

    - `enabled: boolean`

      Whether observability is enabled for the Worker.

    - `head_sampling_rate: optional number`

      The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

    - `logs: optional object { enabled, invocation_logs, destinations, 2 more }`

      Log settings for the Worker.

      - `enabled: boolean`

        Whether logs are enabled for the Worker.

      - `invocation_logs: boolean`

        Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.

      - `destinations: optional array of string`

        A list of destinations where logs will be exported to.

      - `head_sampling_rate: optional number`

        The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether log persistence is enabled for the Worker.

    - `traces: optional object { destinations, enabled, head_sampling_rate, 2 more }`

      Trace settings for the Worker.

      - `destinations: optional array of string`

        A list of destinations where traces will be exported to.

      - `enabled: optional boolean`

        Whether traces are enabled for the Worker.

      - `head_sampling_rate: optional number`

        The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether trace persistence is enabled for the Worker.

      - `propagation_policy: optional "authenticated" or "accept"`

        Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" (default) honors inbound trace context only when accompanied by a valid trace auth token. "accept" unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled.

        - `"authenticated"`

        - `"accept"`

  - `tags: optional array of string`

    Tags associated with the Worker.

  - `tail_consumers: optional array of ConsumerScript`

    List of Workers that will consume logs from the attached Worker.

    - `service: string`

      Name of Worker that is to be the consumer.

    - `environment: optional string`

      Optional environment if the Worker utilizes one.

    - `namespace: optional string`

      Optional dispatch namespace the script belongs to.

### Script List Response

- `ScriptListResponse object { id, cache_options, compatibility_date, 20 more }`

  - `id: optional string`

    The name used to identify the script.

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

  - `created_on: optional string`

    When the script was created.

  - `etag: optional string`

    Hashed script content, can be used in a If-None-Match header when updating.

  - `handlers: optional array of string`

    The names of handlers exported as part of the default export.

  - `has_assets: optional boolean`

    Whether a Worker contains assets.

  - `has_modules: optional boolean`

    Whether a Worker contains modules.

  - `last_deployed_from: optional string`

    The client most recently used to deploy this Worker.

  - `logpush: optional boolean`

    Whether Logpush is turned on for the Worker.

  - `migration_tag: optional string`

    The tag of the Durable Object migration that was most recently applied for this Worker.

  - `modified_on: optional string`

    When the script was last modified.

  - `named_handlers: optional array of object { handlers, name }`

    Named exports, such as Durable Object class implementations and named entrypoints.

    - `handlers: optional array of string`

      The names of handlers exported as part of the named export.

    - `name: optional string`

      The name of the export.

  - `observability: optional object { enabled, head_sampling_rate, logs, traces }`

    Observability settings for the Worker.

    - `enabled: boolean`

      Whether observability is enabled for the Worker.

    - `head_sampling_rate: optional number`

      The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

    - `logs: optional object { enabled, invocation_logs, destinations, 2 more }`

      Log settings for the Worker.

      - `enabled: boolean`

        Whether logs are enabled for the Worker.

      - `invocation_logs: boolean`

        Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.

      - `destinations: optional array of string`

        A list of destinations where logs will be exported to.

      - `head_sampling_rate: optional number`

        The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether log persistence is enabled for the Worker.

    - `traces: optional object { destinations, enabled, head_sampling_rate, 2 more }`

      Trace settings for the Worker.

      - `destinations: optional array of string`

        A list of destinations where traces will be exported to.

      - `enabled: optional boolean`

        Whether traces are enabled for the Worker.

      - `head_sampling_rate: optional number`

        The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether trace persistence is enabled for the Worker.

      - `propagation_policy: optional "authenticated" or "accept"`

        Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" (default) honors inbound trace context only when accompanied by a valid trace auth token. "accept" unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled.

        - `"authenticated"`

        - `"accept"`

  - `placement: optional object { mode, last_analyzed_at, status }  or object { region, last_analyzed_at, status }  or object { hostname, last_analyzed_at, status }  or 5 more`

    Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart Placement, or one of region/hostname/host.

    - `object { mode, last_analyzed_at, status }`

      - `mode: "smart"`

        Enables [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"smart"`

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { region, last_analyzed_at, status }`

      - `region: string`

        Cloud region for targeted placement in format 'provider:region'.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { hostname, last_analyzed_at, status }`

      - `hostname: string`

        HTTP hostname for targeted placement.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { host, last_analyzed_at, status }`

      - `host: string`

        TCP host and port for targeted placement.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { mode, region, last_analyzed_at, status }`

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `region: string`

        Cloud region for targeted placement in format 'provider:region'.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { hostname, mode, last_analyzed_at, status }`

      - `hostname: string`

        HTTP hostname for targeted placement.

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { host, mode, last_analyzed_at, status }`

      - `host: string`

        TCP host and port for targeted placement.

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { mode, target, last_analyzed_at, status }`

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

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

  - `placement_mode: optional "smart" or "targeted"`

    - `"smart"`

    - `"targeted"`

  - `placement_status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

    - `"SUCCESS"`

    - `"UNSUPPORTED_APPLICATION"`

    - `"INSUFFICIENT_INVOCATIONS"`

  - `routes: optional array of object { id, pattern, script }`

    Routes associated with the Worker.

    - `id: string`

      Identifier.

    - `pattern: string`

      Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior).

    - `script: optional string`

      Name of the script to run if the route matches.

  - `tag: optional string`

    The immutable ID of the script.

  - `tags: optional array of string`

    Tags associated with the Worker.

  - `tail_consumers: optional array of ConsumerScript`

    List of Workers that will consume logs from the attached Worker.

    - `service: string`

      Name of Worker that is to be the consumer.

    - `environment: optional string`

      Optional environment if the Worker utilizes one.

    - `namespace: optional string`

      Optional dispatch namespace the script belongs to.

  - `usage_model: optional "standard" or "bundled" or "unbound"`

    Usage model for the Worker invocations.

    - `"standard"`

    - `"bundled"`

    - `"unbound"`

### Script Search Response

- `ScriptSearchResponse = array of object { id, created_on, modified_on, 4 more }`

  - `id: string`

    Identifier.

  - `created_on: string`

    When the script was created.

  - `modified_on: string`

    When the script was last modified.

  - `script_name: string`

    Name of the script, used in URLs and route configuration.

  - `environment_is_default: optional boolean`

    Whether the environment is the default environment.

  - `environment_name: optional string`

    Name of the environment.

  - `service_name: optional string`

    Name of the service.

### Script Get Response

- `ScriptGetResponse = string`

### Script Update Response

- `ScriptUpdateResponse object { startup_time_ms, id, cache_options, 21 more }`

  - `startup_time_ms: number`

  - `id: optional string`

    The name used to identify the script.

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

  - `created_on: optional string`

    When the script was created.

  - `entry_point: optional string`

    The entry point for the script.

  - `etag: optional string`

    Hashed script content, can be used in a If-None-Match header when updating.

  - `handlers: optional array of string`

    The names of handlers exported as part of the default export.

  - `has_assets: optional boolean`

    Whether a Worker contains assets.

  - `has_modules: optional boolean`

    Whether a Worker contains modules.

  - `last_deployed_from: optional string`

    The client most recently used to deploy this Worker.

  - `logpush: optional boolean`

    Whether Logpush is turned on for the Worker.

  - `migration_tag: optional string`

    The tag of the Durable Object migration that was most recently applied for this Worker.

  - `modified_on: optional string`

    When the script was last modified.

  - `named_handlers: optional array of object { handlers, name }`

    Named exports, such as Durable Object class implementations and named entrypoints.

    - `handlers: optional array of string`

      The names of handlers exported as part of the named export.

    - `name: optional string`

      The name of the export.

  - `observability: optional object { enabled, head_sampling_rate, logs, traces }`

    Observability settings for the Worker.

    - `enabled: boolean`

      Whether observability is enabled for the Worker.

    - `head_sampling_rate: optional number`

      The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

    - `logs: optional object { enabled, invocation_logs, destinations, 2 more }`

      Log settings for the Worker.

      - `enabled: boolean`

        Whether logs are enabled for the Worker.

      - `invocation_logs: boolean`

        Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.

      - `destinations: optional array of string`

        A list of destinations where logs will be exported to.

      - `head_sampling_rate: optional number`

        The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether log persistence is enabled for the Worker.

    - `traces: optional object { destinations, enabled, head_sampling_rate, 2 more }`

      Trace settings for the Worker.

      - `destinations: optional array of string`

        A list of destinations where traces will be exported to.

      - `enabled: optional boolean`

        Whether traces are enabled for the Worker.

      - `head_sampling_rate: optional number`

        The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether trace persistence is enabled for the Worker.

      - `propagation_policy: optional "authenticated" or "accept"`

        Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" (default) honors inbound trace context only when accompanied by a valid trace auth token. "accept" unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled.

        - `"authenticated"`

        - `"accept"`

  - `placement: optional object { mode, last_analyzed_at, status }  or object { region, last_analyzed_at, status }  or object { hostname, last_analyzed_at, status }  or 5 more`

    Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart Placement, or one of region/hostname/host.

    - `object { mode, last_analyzed_at, status }`

      - `mode: "smart"`

        Enables [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"smart"`

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { region, last_analyzed_at, status }`

      - `region: string`

        Cloud region for targeted placement in format 'provider:region'.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { hostname, last_analyzed_at, status }`

      - `hostname: string`

        HTTP hostname for targeted placement.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { host, last_analyzed_at, status }`

      - `host: string`

        TCP host and port for targeted placement.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { mode, region, last_analyzed_at, status }`

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `region: string`

        Cloud region for targeted placement in format 'provider:region'.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { hostname, mode, last_analyzed_at, status }`

      - `hostname: string`

        HTTP hostname for targeted placement.

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { host, mode, last_analyzed_at, status }`

      - `host: string`

        TCP host and port for targeted placement.

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { mode, target, last_analyzed_at, status }`

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

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

  - `placement_mode: optional "smart" or "targeted"`

    - `"smart"`

    - `"targeted"`

  - `placement_status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

    - `"SUCCESS"`

    - `"UNSUPPORTED_APPLICATION"`

    - `"INSUFFICIENT_INVOCATIONS"`

  - `tag: optional string`

    The immutable ID of the script.

  - `tags: optional array of string`

    Tags associated with the Worker.

  - `tail_consumers: optional array of ConsumerScript`

    List of Workers that will consume logs from the attached Worker.

    - `service: string`

      Name of Worker that is to be the consumer.

    - `environment: optional string`

      Optional environment if the Worker utilizes one.

    - `namespace: optional string`

      Optional dispatch namespace the script belongs to.

  - `usage_model: optional "standard" or "bundled" or "unbound"`

    Usage model for the Worker invocations.

    - `"standard"`

    - `"bundled"`

    - `"unbound"`

### Script Delete Response

- `ScriptDeleteResponse = unknown`

# Assets

# Upload

## Create Assets Upload Session

**post** `/accounts/{account_id}/workers/scripts/{script_name}/assets-upload-session`

Start uploading a collection of assets for use in a Worker version. To learn more about the direct uploads of assets, see https://developers.cloudflare.com/workers/static-assets/direct-upload/.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

### Body Parameters

- `manifest: map[object { hash, size } ]`

  A manifest ([path]: {hash, size}) map of files to upload. As an example, `/blog/hello-world.html` would be a valid path key.

  - `hash: string`

    The hash of the file.

  - `size: number`

    The size of the file in bytes.

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

- `result: optional object { buckets, jwt }`

  - `buckets: optional array of array of string`

    The requests to make to upload assets.

  - `jwt: optional string`

    A JWT to use as authentication for uploading assets.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/assets-upload-session \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "manifest": {
            "foo": {
              "hash": "hash",
              "size": 0
            }
          }
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
  "success": true,
  "result": {
    "buckets": [
      [
        "string"
      ]
    ],
    "jwt": "jwt"
  }
}
```

## Domain Types

### Upload Create Response

- `UploadCreateResponse object { buckets, jwt }`

  - `buckets: optional array of array of string`

    The requests to make to upload assets.

  - `jwt: optional string`

    A JWT to use as authentication for uploading assets.

# Subdomain

## Get Worker subdomain

**get** `/accounts/{account_id}/workers/scripts/{script_name}/subdomain`

Get if the Worker is available on the workers.dev subdomain.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

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

- `result: object { enabled, previews_enabled }`

  - `enabled: boolean`

    Whether the Worker is available on the workers.dev subdomain.

  - `previews_enabled: boolean`

    Whether the Worker's Preview URLs are available on the workers.dev subdomain.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/subdomain \
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
    "enabled": false,
    "previews_enabled": false
  },
  "success": true
}
```

## Post Worker subdomain

**post** `/accounts/{account_id}/workers/scripts/{script_name}/subdomain`

Enable or disable the Worker on the workers.dev subdomain.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

### Body Parameters

- `enabled: boolean`

  Whether the Worker should be available on the workers.dev subdomain.

- `previews_enabled: optional boolean`

  Whether the Worker's Preview URLs should be available on the workers.dev subdomain.

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

- `result: object { enabled, previews_enabled }`

  - `enabled: boolean`

    Whether the Worker is available on the workers.dev subdomain.

  - `previews_enabled: boolean`

    Whether the Worker's Preview URLs are available on the workers.dev subdomain.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/subdomain \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true
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
    "enabled": false,
    "previews_enabled": false
  },
  "success": true
}
```

## Delete Worker subdomain

**delete** `/accounts/{account_id}/workers/scripts/{script_name}/subdomain`

Disable all workers.dev subdomains for a Worker.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

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

- `result: object { enabled, previews_enabled }`

  - `enabled: boolean`

    Whether the Worker is available on the workers.dev subdomain.

  - `previews_enabled: boolean`

    Whether the Worker's Preview URLs are available on the workers.dev subdomain.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/subdomain \
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
  "result": {
    "enabled": false,
    "previews_enabled": false
  },
  "success": true
}
```

## Domain Types

### Subdomain Get Response

- `SubdomainGetResponse object { enabled, previews_enabled }`

  - `enabled: boolean`

    Whether the Worker is available on the workers.dev subdomain.

  - `previews_enabled: boolean`

    Whether the Worker's Preview URLs are available on the workers.dev subdomain.

### Subdomain Create Response

- `SubdomainCreateResponse object { enabled, previews_enabled }`

  - `enabled: boolean`

    Whether the Worker is available on the workers.dev subdomain.

  - `previews_enabled: boolean`

    Whether the Worker's Preview URLs are available on the workers.dev subdomain.

### Subdomain Delete Response

- `SubdomainDeleteResponse object { enabled, previews_enabled }`

  - `enabled: boolean`

    Whether the Worker is available on the workers.dev subdomain.

  - `previews_enabled: boolean`

    Whether the Worker's Preview URLs are available on the workers.dev subdomain.

# Schedules

## Get Cron Triggers

**get** `/accounts/{account_id}/workers/scripts/{script_name}/schedules`

Fetches Cron Triggers for a Worker.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

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

- `result: object { schedules }`

  - `schedules: array of object { cron, created_on, modified_on }`

    - `cron: string`

    - `created_on: optional string`

    - `modified_on: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/schedules \
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
    "schedules": [
      {
        "cron": "*/30 * * * *",
        "created_on": "created_on",
        "modified_on": "modified_on"
      }
    ]
  },
  "success": true
}
```

## Update Cron Triggers

**put** `/accounts/{account_id}/workers/scripts/{script_name}/schedules`

Updates Cron Triggers for a Worker.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

### Body Parameters

- `body: array of object { cron, created_on, modified_on }`

  - `cron: string`

  - `created_on: optional string`

  - `modified_on: optional string`

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

- `result: object { schedules }`

  - `schedules: array of object { cron, created_on, modified_on }`

    - `cron: string`

    - `created_on: optional string`

    - `modified_on: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/schedules \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "cron": "*/30 * * * *"
          }
        ]'
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
    "schedules": [
      {
        "cron": "*/30 * * * *",
        "created_on": "created_on",
        "modified_on": "modified_on"
      }
    ]
  },
  "success": true
}
```

## Domain Types

### Schedule Get Response

- `ScheduleGetResponse object { schedules }`

  - `schedules: array of object { cron, created_on, modified_on }`

    - `cron: string`

    - `created_on: optional string`

    - `modified_on: optional string`

### Schedule Update Response

- `ScheduleUpdateResponse object { schedules }`

  - `schedules: array of object { cron, created_on, modified_on }`

    - `cron: string`

    - `created_on: optional string`

    - `modified_on: optional string`

# Tail

## List Tails

**get** `/accounts/{account_id}/workers/scripts/{script_name}/tails`

Get list of tails currently deployed on a Worker.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

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

- `result: object { id, expires_at, url }`

  - `id: string`

    Identifier.

  - `expires_at: string`

  - `url: string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/tails \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "expires_at": "expires_at",
    "url": "url"
  },
  "success": true
}
```

## Start Tail

**post** `/accounts/{account_id}/workers/scripts/{script_name}/tails`

Starts a tail that receives logs and exception from a Worker.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

### Body Parameters

- `body: unknown`

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

- `result: object { id, expires_at, url }`

  - `id: string`

    Identifier.

  - `expires_at: string`

  - `url: string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/tails \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "expires_at": "expires_at",
    "url": "url"
  },
  "success": true
}
```

## Delete Tail

**delete** `/accounts/{account_id}/workers/scripts/{script_name}/tails/{id}`

Deletes a tail from a Worker.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

- `id: string`

  Identifier.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/tails/$ID \
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

### Consumer Script

- `ConsumerScript object { service, environment, namespace }`

  A reference to a script that will consume logs from the attached Worker.

  - `service: string`

    Name of Worker that is to be the consumer.

  - `environment: optional string`

    Optional environment if the Worker utilizes one.

  - `namespace: optional string`

    Optional dispatch namespace the script belongs to.

### Tail Get Response

- `TailGetResponse object { id, expires_at, url }`

  - `id: string`

    Identifier.

  - `expires_at: string`

  - `url: string`

### Tail Create Response

- `TailCreateResponse object { id, expires_at, url }`

  - `id: string`

    Identifier.

  - `expires_at: string`

  - `url: string`

### Tail Delete Response

- `TailDeleteResponse object { errors, messages, success }`

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

# Content

## Get script content

**get** `/accounts/{account_id}/workers/scripts/{script_name}/content/v2`

Fetch script content only.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/content/v2 \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Put script content

**put** `/accounts/{account_id}/workers/scripts/{script_name}/content`

Put script content without touching config or metadata.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

### Header Parameters

- `"CF-WORKER-BODY-PART": optional string`

- `"CF-WORKER-MAIN-MODULE-PART": optional string`

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

- `result: Script`

  - `id: optional string`

    The name used to identify the script.

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

  - `created_on: optional string`

    When the script was created.

  - `etag: optional string`

    Hashed script content, can be used in a If-None-Match header when updating.

  - `handlers: optional array of string`

    The names of handlers exported as part of the default export.

  - `has_assets: optional boolean`

    Whether a Worker contains assets.

  - `has_modules: optional boolean`

    Whether a Worker contains modules.

  - `last_deployed_from: optional string`

    The client most recently used to deploy this Worker.

  - `logpush: optional boolean`

    Whether Logpush is turned on for the Worker.

  - `migration_tag: optional string`

    The tag of the Durable Object migration that was most recently applied for this Worker.

  - `modified_on: optional string`

    When the script was last modified.

  - `named_handlers: optional array of object { handlers, name }`

    Named exports, such as Durable Object class implementations and named entrypoints.

    - `handlers: optional array of string`

      The names of handlers exported as part of the named export.

    - `name: optional string`

      The name of the export.

  - `observability: optional object { enabled, head_sampling_rate, logs, traces }`

    Observability settings for the Worker.

    - `enabled: boolean`

      Whether observability is enabled for the Worker.

    - `head_sampling_rate: optional number`

      The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

    - `logs: optional object { enabled, invocation_logs, destinations, 2 more }`

      Log settings for the Worker.

      - `enabled: boolean`

        Whether logs are enabled for the Worker.

      - `invocation_logs: boolean`

        Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.

      - `destinations: optional array of string`

        A list of destinations where logs will be exported to.

      - `head_sampling_rate: optional number`

        The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether log persistence is enabled for the Worker.

    - `traces: optional object { destinations, enabled, head_sampling_rate, 2 more }`

      Trace settings for the Worker.

      - `destinations: optional array of string`

        A list of destinations where traces will be exported to.

      - `enabled: optional boolean`

        Whether traces are enabled for the Worker.

      - `head_sampling_rate: optional number`

        The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether trace persistence is enabled for the Worker.

      - `propagation_policy: optional "authenticated" or "accept"`

        Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" (default) honors inbound trace context only when accompanied by a valid trace auth token. "accept" unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled.

        - `"authenticated"`

        - `"accept"`

  - `placement: optional object { mode, last_analyzed_at, status }  or object { region, last_analyzed_at, status }  or object { hostname, last_analyzed_at, status }  or 5 more`

    Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart Placement, or one of region/hostname/host.

    - `object { mode, last_analyzed_at, status }`

      - `mode: "smart"`

        Enables [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"smart"`

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { region, last_analyzed_at, status }`

      - `region: string`

        Cloud region for targeted placement in format 'provider:region'.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { hostname, last_analyzed_at, status }`

      - `hostname: string`

        HTTP hostname for targeted placement.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { host, last_analyzed_at, status }`

      - `host: string`

        TCP host and port for targeted placement.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { mode, region, last_analyzed_at, status }`

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `region: string`

        Cloud region for targeted placement in format 'provider:region'.

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { hostname, mode, last_analyzed_at, status }`

      - `hostname: string`

        HTTP hostname for targeted placement.

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { host, mode, last_analyzed_at, status }`

      - `host: string`

        TCP host and port for targeted placement.

      - `mode: "targeted"`

        Targeted placement mode.

        - `"targeted"`

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

    - `object { mode, target, last_analyzed_at, status }`

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

      - `last_analyzed_at: optional string`

        The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

      - `status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

        Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

        - `"SUCCESS"`

        - `"UNSUPPORTED_APPLICATION"`

        - `"INSUFFICIENT_INVOCATIONS"`

  - `placement_mode: optional "smart" or "targeted"`

    Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode='smart' for Smart Placement, or one of region/hostname/host.

    - `"smart"`

    - `"targeted"`

  - `placement_status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"`

    Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

    - `"SUCCESS"`

    - `"UNSUPPORTED_APPLICATION"`

    - `"INSUFFICIENT_INVOCATIONS"`

  - `tag: optional string`

    The immutable ID of the script.

  - `tags: optional array of string`

    Tags associated with the Worker.

  - `tail_consumers: optional array of ConsumerScript`

    List of Workers that will consume logs from the attached Worker.

    - `service: string`

      Name of Worker that is to be the consumer.

    - `environment: optional string`

      Optional environment if the Worker utilizes one.

    - `namespace: optional string`

      Optional dispatch namespace the script belongs to.

  - `usage_model: optional "standard" or "bundled" or "unbound"`

    Usage model for the Worker invocations.

    - `"standard"`

    - `"bundled"`

    - `"unbound"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/content \
    -X PUT \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F metadata='{}'
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
    "id": "my-workers-script",
    "cache_options": {
      "enabled": true,
      "cross_version_cache": true
    },
    "compatibility_date": "2021-01-01",
    "compatibility_flags": [
      "nodejs_compat"
    ],
    "created_on": "2017-01-01T00:00:00Z",
    "etag": "ea95132c15732412d22c1476fa83f27a",
    "handlers": [
      "fetch",
      "scheduled"
    ],
    "has_assets": false,
    "has_modules": false,
    "last_deployed_from": "wrangler",
    "logpush": false,
    "migration_tag": "v1",
    "modified_on": "2017-01-01T00:00:00Z",
    "named_handlers": [
      {
        "handlers": [
          "class"
        ],
        "name": "MyDurableObject"
      }
    ],
    "observability": {
      "enabled": true,
      "head_sampling_rate": 0.1,
      "logs": {
        "enabled": true,
        "invocation_logs": true,
        "destinations": [
          "cloudflare"
        ],
        "head_sampling_rate": 0.1,
        "persist": true
      },
      "traces": {
        "destinations": [
          "cloudflare"
        ],
        "enabled": true,
        "head_sampling_rate": 0.1,
        "persist": true,
        "propagation_policy": "authenticated"
      }
    },
    "placement": {
      "mode": "smart",
      "last_analyzed_at": "2025-01-01T00:00:00Z",
      "status": "SUCCESS"
    },
    "placement_mode": "smart",
    "placement_status": "SUCCESS",
    "tag": "e8f70fdbc8b1fb0b8ddb1af166186758",
    "tags": [
      "my-team",
      "my-public-api"
    ],
    "tail_consumers": [
      {
        "service": "my-log-consumer",
        "environment": "production",
        "namespace": "my-namespace"
      }
    ],
    "usage_model": "standard"
  },
  "success": true
}
```

# Settings

## Get Script Settings

**get** `/accounts/{account_id}/workers/scripts/{script_name}/script-settings`

Get script-level settings when using [Worker Versions](https://developers.cloudflare.com/api/operations/worker-versions-list-versions). Includes Logpush and Tail Consumers.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

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

- `result: ScriptSetting`

  - `logpush: optional boolean`

    Whether Logpush is turned on for the Worker.

  - `observability: optional object { enabled, head_sampling_rate, logs, traces }`

    Observability settings for the Worker.

    - `enabled: boolean`

      Whether observability is enabled for the Worker.

    - `head_sampling_rate: optional number`

      The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

    - `logs: optional object { enabled, invocation_logs, destinations, 2 more }`

      Log settings for the Worker.

      - `enabled: boolean`

        Whether logs are enabled for the Worker.

      - `invocation_logs: boolean`

        Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.

      - `destinations: optional array of string`

        A list of destinations where logs will be exported to.

      - `head_sampling_rate: optional number`

        The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether log persistence is enabled for the Worker.

    - `traces: optional object { destinations, enabled, head_sampling_rate, 2 more }`

      Trace settings for the Worker.

      - `destinations: optional array of string`

        A list of destinations where traces will be exported to.

      - `enabled: optional boolean`

        Whether traces are enabled for the Worker.

      - `head_sampling_rate: optional number`

        The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether trace persistence is enabled for the Worker.

      - `propagation_policy: optional "authenticated" or "accept"`

        Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" (default) honors inbound trace context only when accompanied by a valid trace auth token. "accept" unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled.

        - `"authenticated"`

        - `"accept"`

  - `tags: optional array of string`

    Tags associated with the Worker.

  - `tail_consumers: optional array of ConsumerScript`

    List of Workers that will consume logs from the attached Worker.

    - `service: string`

      Name of Worker that is to be the consumer.

    - `environment: optional string`

      Optional environment if the Worker utilizes one.

    - `namespace: optional string`

      Optional dispatch namespace the script belongs to.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/script-settings \
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
    "logpush": false,
    "observability": {
      "enabled": true,
      "head_sampling_rate": 0.1,
      "logs": {
        "enabled": true,
        "invocation_logs": true,
        "destinations": [
          "cloudflare"
        ],
        "head_sampling_rate": 0.1,
        "persist": true
      },
      "traces": {
        "destinations": [
          "cloudflare"
        ],
        "enabled": true,
        "head_sampling_rate": 0.1,
        "persist": true,
        "propagation_policy": "authenticated"
      }
    },
    "tags": [
      "my-team",
      "my-public-api"
    ],
    "tail_consumers": [
      {
        "service": "my-log-consumer",
        "environment": "production",
        "namespace": "my-namespace"
      }
    ]
  },
  "success": true
}
```

## Patch Script Settings

**patch** `/accounts/{account_id}/workers/scripts/{script_name}/script-settings`

Patch script-level settings when using [Worker Versions](https://developers.cloudflare.com/api/operations/worker-versions-list-versions). Including but not limited to Logpush and Tail Consumers.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

### Body Parameters

- `logpush: optional boolean`

  Whether Logpush is turned on for the Worker.

- `observability: optional object { enabled, head_sampling_rate, logs, traces }`

  Observability settings for the Worker.

  - `enabled: boolean`

    Whether observability is enabled for the Worker.

  - `head_sampling_rate: optional number`

    The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

  - `logs: optional object { enabled, invocation_logs, destinations, 2 more }`

    Log settings for the Worker.

    - `enabled: boolean`

      Whether logs are enabled for the Worker.

    - `invocation_logs: boolean`

      Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.

    - `destinations: optional array of string`

      A list of destinations where logs will be exported to.

    - `head_sampling_rate: optional number`

      The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

    - `persist: optional boolean`

      Whether log persistence is enabled for the Worker.

  - `traces: optional object { destinations, enabled, head_sampling_rate, 2 more }`

    Trace settings for the Worker.

    - `destinations: optional array of string`

      A list of destinations where traces will be exported to.

    - `enabled: optional boolean`

      Whether traces are enabled for the Worker.

    - `head_sampling_rate: optional number`

      The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

    - `persist: optional boolean`

      Whether trace persistence is enabled for the Worker.

    - `propagation_policy: optional "authenticated" or "accept"`

      Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" (default) honors inbound trace context only when accompanied by a valid trace auth token. "accept" unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled.

      - `"authenticated"`

      - `"accept"`

- `tags: optional array of string`

  Tags associated with the Worker.

- `tail_consumers: optional array of ConsumerScript`

  List of Workers that will consume logs from the attached Worker.

  - `service: string`

    Name of Worker that is to be the consumer.

  - `environment: optional string`

    Optional environment if the Worker utilizes one.

  - `namespace: optional string`

    Optional dispatch namespace the script belongs to.

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

- `result: ScriptSetting`

  - `logpush: optional boolean`

    Whether Logpush is turned on for the Worker.

  - `observability: optional object { enabled, head_sampling_rate, logs, traces }`

    Observability settings for the Worker.

    - `enabled: boolean`

      Whether observability is enabled for the Worker.

    - `head_sampling_rate: optional number`

      The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

    - `logs: optional object { enabled, invocation_logs, destinations, 2 more }`

      Log settings for the Worker.

      - `enabled: boolean`

        Whether logs are enabled for the Worker.

      - `invocation_logs: boolean`

        Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.

      - `destinations: optional array of string`

        A list of destinations where logs will be exported to.

      - `head_sampling_rate: optional number`

        The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether log persistence is enabled for the Worker.

    - `traces: optional object { destinations, enabled, head_sampling_rate, 2 more }`

      Trace settings for the Worker.

      - `destinations: optional array of string`

        A list of destinations where traces will be exported to.

      - `enabled: optional boolean`

        Whether traces are enabled for the Worker.

      - `head_sampling_rate: optional number`

        The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether trace persistence is enabled for the Worker.

      - `propagation_policy: optional "authenticated" or "accept"`

        Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" (default) honors inbound trace context only when accompanied by a valid trace auth token. "accept" unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled.

        - `"authenticated"`

        - `"accept"`

  - `tags: optional array of string`

    Tags associated with the Worker.

  - `tail_consumers: optional array of ConsumerScript`

    List of Workers that will consume logs from the attached Worker.

    - `service: string`

      Name of Worker that is to be the consumer.

    - `environment: optional string`

      Optional environment if the Worker utilizes one.

    - `namespace: optional string`

      Optional dispatch namespace the script belongs to.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/script-settings \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
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
    "logpush": false,
    "observability": {
      "enabled": true,
      "head_sampling_rate": 0.1,
      "logs": {
        "enabled": true,
        "invocation_logs": true,
        "destinations": [
          "cloudflare"
        ],
        "head_sampling_rate": 0.1,
        "persist": true
      },
      "traces": {
        "destinations": [
          "cloudflare"
        ],
        "enabled": true,
        "head_sampling_rate": 0.1,
        "persist": true,
        "propagation_policy": "authenticated"
      }
    },
    "tags": [
      "my-team",
      "my-public-api"
    ],
    "tail_consumers": [
      {
        "service": "my-log-consumer",
        "environment": "production",
        "namespace": "my-namespace"
      }
    ]
  },
  "success": true
}
```

# Deployments

## List Deployments

**get** `/accounts/{account_id}/workers/scripts/{script_name}/deployments`

List of Worker Deployments. The first deployment in the list is the latest deployment actively serving traffic.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

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

- `result: object { deployments }`

  - `deployments: array of Deployment`

    - `id: string`

    - `created_on: string`

    - `source: string`

    - `strategy: "percentage"`

      - `"percentage"`

    - `versions: array of object { percentage, version_id }`

      - `percentage: number`

      - `version_id: string`

    - `annotations: optional object { "workers/message", "workers/triggered_by" }`

      - `"workers/message": optional string`

        Human-readable message about the deployment. Truncated to 1000 bytes if longer.

      - `"workers/triggered_by": optional string`

        Operation that triggered the creation of the deployment.

    - `author_email: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/deployments \
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
    "deployments": [
      {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_on": "2019-12-27T18:11:19.117Z",
        "source": "api",
        "strategy": "percentage",
        "versions": [
          {
            "percentage": 100,
            "version_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          }
        ],
        "annotations": {
          "workers/message": "Deploy bug fix.",
          "workers/triggered_by": "deployment"
        },
        "author_email": "dev@stainless.com"
      }
    ]
  },
  "success": true
}
```

## Create Deployment

**post** `/accounts/{account_id}/workers/scripts/{script_name}/deployments`

Deployments configure how [Worker Versions](https://developers.cloudflare.com/api/operations/worker-versions-list-versions) are deployed to traffic. A deployment can consist of one or two versions of a Worker.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

### Query Parameters

- `force: optional boolean`

  If set to true, the deployment will be created even if normally blocked by something such rolling back to an older version when a secret has changed.

### Body Parameters

- `strategy: "percentage"`

  - `"percentage"`

- `versions: array of object { percentage, version_id }`

  - `percentage: number`

  - `version_id: string`

- `annotations: optional object { "workers/message", "workers/triggered_by" }`

  - `"workers/message": optional string`

    Human-readable message about the deployment. Truncated to 1000 bytes if longer.

  - `"workers/triggered_by": optional string`

    Operation that triggered the creation of the deployment.

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

- `result: Deployment`

  - `id: string`

  - `created_on: string`

  - `source: string`

  - `strategy: "percentage"`

    - `"percentage"`

  - `versions: array of object { percentage, version_id }`

    - `percentage: number`

    - `version_id: string`

  - `annotations: optional object { "workers/message", "workers/triggered_by" }`

    - `"workers/message": optional string`

      Human-readable message about the deployment. Truncated to 1000 bytes if longer.

    - `"workers/triggered_by": optional string`

      Operation that triggered the creation of the deployment.

  - `author_email: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/deployments \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "strategy": "percentage",
          "versions": [
            {
              "percentage": 100,
              "version_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_on": "2019-12-27T18:11:19.117Z",
    "source": "api",
    "strategy": "percentage",
    "versions": [
      {
        "percentage": 100,
        "version_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    ],
    "annotations": {
      "workers/message": "Deploy bug fix.",
      "workers/triggered_by": "deployment"
    },
    "author_email": "dev@stainless.com"
  },
  "success": true
}
```

## Get Deployment

**get** `/accounts/{account_id}/workers/scripts/{script_name}/deployments/{deployment_id}`

Get information about a Worker Deployment.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

- `deployment_id: string`

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

- `result: Deployment`

  - `id: string`

  - `created_on: string`

  - `source: string`

  - `strategy: "percentage"`

    - `"percentage"`

  - `versions: array of object { percentage, version_id }`

    - `percentage: number`

    - `version_id: string`

  - `annotations: optional object { "workers/message", "workers/triggered_by" }`

    - `"workers/message": optional string`

      Human-readable message about the deployment. Truncated to 1000 bytes if longer.

    - `"workers/triggered_by": optional string`

      Operation that triggered the creation of the deployment.

  - `author_email: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/deployments/$DEPLOYMENT_ID \
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
    "source": "api",
    "strategy": "percentage",
    "versions": [
      {
        "percentage": 100,
        "version_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    ],
    "annotations": {
      "workers/message": "Deploy bug fix.",
      "workers/triggered_by": "deployment"
    },
    "author_email": "dev@stainless.com"
  },
  "success": true
}
```

## Delete Deployment

**delete** `/accounts/{account_id}/workers/scripts/{script_name}/deployments/{deployment_id}`

Delete a Worker Deployment. The latest deployment, which is actively serving traffic, cannot be deleted. All other deployments can be deleted.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

- `deployment_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/deployments/$DEPLOYMENT_ID \
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

### Deployment

- `Deployment object { id, created_on, source, 4 more }`

  - `id: string`

  - `created_on: string`

  - `source: string`

  - `strategy: "percentage"`

    - `"percentage"`

  - `versions: array of object { percentage, version_id }`

    - `percentage: number`

    - `version_id: string`

  - `annotations: optional object { "workers/message", "workers/triggered_by" }`

    - `"workers/message": optional string`

      Human-readable message about the deployment. Truncated to 1000 bytes if longer.

    - `"workers/triggered_by": optional string`

      Operation that triggered the creation of the deployment.

  - `author_email: optional string`

### Deployment List Response

- `DeploymentListResponse object { deployments }`

  - `deployments: array of Deployment`

    - `id: string`

    - `created_on: string`

    - `source: string`

    - `strategy: "percentage"`

      - `"percentage"`

    - `versions: array of object { percentage, version_id }`

      - `percentage: number`

      - `version_id: string`

    - `annotations: optional object { "workers/message", "workers/triggered_by" }`

      - `"workers/message": optional string`

        Human-readable message about the deployment. Truncated to 1000 bytes if longer.

      - `"workers/triggered_by": optional string`

        Operation that triggered the creation of the deployment.

    - `author_email: optional string`

### Deployment Delete Response

- `DeploymentDeleteResponse object { errors, messages, success }`

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

**get** `/accounts/{account_id}/workers/scripts/{script_name}/versions`

List of Worker Versions. The first version in the list is the latest version.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script.

### Query Parameters

- `deployable: optional boolean`

  Only return versions that can be used in a deployment. Ignores pagination.

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

- `result: object { items }`

  - `items: optional array of object { id, metadata, number }`

    - `id: optional string`

      Unique identifier for the version.

    - `metadata: optional object { author_email, author_id, created_on, 3 more }`

      - `author_email: optional string`

        Email of the user who created the version.

      - `author_id: optional string`

        Identifier of the user who created the version.

      - `created_on: optional string`

        When the version was created.

      - `hasPreview: optional boolean`

        Whether the version can be previewed.

      - `modified_on: optional string`

        When the version was last modified.

      - `source: optional "unknown" or "api" or "wrangler" or 8 more`

        The source of the version upload.

        - `"unknown"`

        - `"api"`

        - `"wrangler"`

        - `"terraform"`

        - `"dash"`

        - `"cf_cli"`

        - `"dash_template"`

        - `"integration"`

        - `"quick_editor"`

        - `"playground"`

        - `"workersci"`

    - `number: optional number`

      Sequential version number.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/versions \
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
    "items": [
      {
        "id": "18f97339-c287-4872-9bdd-e2135c07ec12",
        "metadata": {
          "author_email": "user@example.com",
          "author_id": "408cbcdfd4dda4617efef40b04d168a1",
          "created_on": "2022-11-08T17:19:29.176266Z",
          "hasPreview": true,
          "modified_on": "2022-11-08T17:19:29.176266Z",
          "source": "api"
        },
        "number": 1
      }
    ]
  },
  "success": true
}
```

## Get Version Detail

**get** `/accounts/{account_id}/workers/scripts/{script_name}/versions/{version_id}`

Retrieves detailed information about a specific version of a Workers script.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script.

- `version_id: string`

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

- `result: object { resources, id, metadata, number }`

  - `resources: object { bindings, script, script_runtime }`

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

    - `script: optional object { etag, handlers, last_deployed_from, named_handlers }`

      - `etag: optional string`

        Hashed script content

      - `handlers: optional array of string`

        The names of handlers exported as part of the default export.

      - `last_deployed_from: optional string`

        The client most recently used to deploy this Worker.

      - `named_handlers: optional array of object { handlers, name }`

        Named exports, such as Durable Object class implementations and named entrypoints.

        - `handlers: optional array of string`

          The names of handlers exported as part of the named export.

        - `name: optional string`

          The name of the exported class or entrypoint.

    - `script_runtime: optional object { compatibility_date, compatibility_flags, limits, 2 more }`

      Runtime configuration for the Worker.

      - `compatibility_date: optional string`

        Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker.

      - `compatibility_flags: optional array of string`

        Flags that enable or disable certain features in the Workers runtime.

      - `limits: optional object { cpu_ms }`

        Resource limits for the Worker.

        - `cpu_ms: optional number`

          The amount of CPU time this Worker can use in milliseconds.

      - `migration_tag: optional string`

        The tag of the Durable Object migration that was most recently applied for this Worker.

      - `usage_model: optional "bundled" or "unbound" or "standard"`

        Usage model for the Worker invocations.

        - `"bundled"`

        - `"unbound"`

        - `"standard"`

  - `id: optional string`

    Unique identifier for the version.

  - `metadata: optional object { author_email, author_id, created_on, 3 more }`

    - `author_email: optional string`

      Email of the user who created the version.

    - `author_id: optional string`

      Identifier of the user who created the version.

    - `created_on: optional string`

      When the version was created.

    - `hasPreview: optional boolean`

      Whether the version can be previewed.

    - `modified_on: optional string`

      When the version was last modified.

    - `source: optional "unknown" or "api" or "wrangler" or 8 more`

      The source of the version upload.

      - `"unknown"`

      - `"api"`

      - `"wrangler"`

      - `"terraform"`

      - `"dash"`

      - `"cf_cli"`

      - `"dash_template"`

      - `"integration"`

      - `"quick_editor"`

      - `"playground"`

      - `"workersci"`

  - `number: optional number`

    Sequential version number.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/versions/$VERSION_ID \
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
    "resources": {
      "bindings": [
        {
          "name": "MY_ENV_VAR",
          "text": "my_data",
          "type": "plain_text"
        }
      ],
      "script": {
        "etag": "13a3240e8fb414561b0366813b0b8f42b3e6cfa0d9e70e99835dae83d0d8a794",
        "handlers": [
          "fetch"
        ],
        "last_deployed_from": "api",
        "named_handlers": [
          {
            "handlers": [
              "fetch"
            ],
            "name": "MyClass"
          }
        ]
      },
      "script_runtime": {
        "compatibility_date": "2022-11-08",
        "compatibility_flags": [
          "x"
        ],
        "limits": {
          "cpu_ms": 50
        },
        "migration_tag": "v1",
        "usage_model": "standard"
      }
    },
    "id": "18f97339-c287-4872-9bdd-e2135c07ec12",
    "metadata": {
      "author_email": "user@example.com",
      "author_id": "408cbcdfd4dda4617efef40b04d168a1",
      "created_on": "2022-11-08T17:19:29.176266Z",
      "hasPreview": true,
      "modified_on": "2022-11-08T17:19:29.176266Z",
      "source": "api"
    },
    "number": 1
  },
  "success": true
}
```

## Upload Version

**post** `/accounts/{account_id}/workers/scripts/{script_name}/versions`

Upload a Worker Version without deploying to Cloudflare's network. You can find more about the multipart metadata on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script.

### Query Parameters

- `bindings_inherit: optional "strict"`

  When set to "strict", the upload will fail if any `inherit` type bindings cannot be resolved against the previous version of the Worker. Without this, unresolvable inherit bindings are silently dropped.

  - `"strict"`

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

- `result: object { resources, id, metadata, 2 more }`

  - `resources: object { bindings, script, script_runtime }`

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

    - `script: optional object { etag, handlers, last_deployed_from, named_handlers }`

      - `etag: optional string`

        Hashed script content

      - `handlers: optional array of string`

        The names of handlers exported as part of the default export.

      - `last_deployed_from: optional string`

        The client most recently used to deploy this Worker.

      - `named_handlers: optional array of object { handlers, name }`

        Named exports, such as Durable Object class implementations and named entrypoints.

        - `handlers: optional array of string`

          The names of handlers exported as part of the named export.

        - `name: optional string`

          The name of the exported class or entrypoint.

    - `script_runtime: optional object { compatibility_date, compatibility_flags, limits, 2 more }`

      Runtime configuration for the Worker.

      - `compatibility_date: optional string`

        Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker.

      - `compatibility_flags: optional array of string`

        Flags that enable or disable certain features in the Workers runtime.

      - `limits: optional object { cpu_ms }`

        Resource limits for the Worker.

        - `cpu_ms: optional number`

          The amount of CPU time this Worker can use in milliseconds.

      - `migration_tag: optional string`

        The tag of the Durable Object migration that was most recently applied for this Worker.

      - `usage_model: optional "bundled" or "unbound" or "standard"`

        Usage model for the Worker invocations.

        - `"bundled"`

        - `"unbound"`

        - `"standard"`

  - `id: optional string`

    Unique identifier for the version.

  - `metadata: optional object { author_email, author_id, created_on, 3 more }`

    - `author_email: optional string`

      Email of the user who created the version.

    - `author_id: optional string`

      Identifier of the user who created the version.

    - `created_on: optional string`

      When the version was created.

    - `hasPreview: optional boolean`

      Whether the version can be previewed.

    - `modified_on: optional string`

      When the version was last modified.

    - `source: optional "unknown" or "api" or "wrangler" or 8 more`

      The source of the version upload.

      - `"unknown"`

      - `"api"`

      - `"wrangler"`

      - `"terraform"`

      - `"dash"`

      - `"cf_cli"`

      - `"dash_template"`

      - `"integration"`

      - `"quick_editor"`

      - `"playground"`

      - `"workersci"`

  - `number: optional number`

    Sequential version number.

  - `startup_time_ms: optional number`

    Time in milliseconds spent on [Worker startup](https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time).

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/versions \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F metadata='{"main_module":"worker.js"}'
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
    "resources": {
      "bindings": [
        {
          "name": "MY_ENV_VAR",
          "text": "my_data",
          "type": "plain_text"
        }
      ],
      "script": {
        "etag": "13a3240e8fb414561b0366813b0b8f42b3e6cfa0d9e70e99835dae83d0d8a794",
        "handlers": [
          "fetch"
        ],
        "last_deployed_from": "api",
        "named_handlers": [
          {
            "handlers": [
              "fetch"
            ],
            "name": "MyClass"
          }
        ]
      },
      "script_runtime": {
        "compatibility_date": "2022-11-08",
        "compatibility_flags": [
          "x"
        ],
        "limits": {
          "cpu_ms": 50
        },
        "migration_tag": "v1",
        "usage_model": "standard"
      }
    },
    "id": "18f97339-c287-4872-9bdd-e2135c07ec12",
    "metadata": {
      "author_email": "user@example.com",
      "author_id": "408cbcdfd4dda4617efef40b04d168a1",
      "created_on": "2022-11-08T17:19:29.176266Z",
      "hasPreview": true,
      "modified_on": "2022-11-08T17:19:29.176266Z",
      "source": "api"
    },
    "number": 1,
    "startup_time_ms": 10
  },
  "success": true
}
```

## Domain Types

### Version List Response

- `VersionListResponse object { id, metadata, number }`

  - `id: optional string`

    Unique identifier for the version.

  - `metadata: optional object { author_email, author_id, created_on, 3 more }`

    - `author_email: optional string`

      Email of the user who created the version.

    - `author_id: optional string`

      Identifier of the user who created the version.

    - `created_on: optional string`

      When the version was created.

    - `hasPreview: optional boolean`

      Whether the version can be previewed.

    - `modified_on: optional string`

      When the version was last modified.

    - `source: optional "unknown" or "api" or "wrangler" or 8 more`

      The source of the version upload.

      - `"unknown"`

      - `"api"`

      - `"wrangler"`

      - `"terraform"`

      - `"dash"`

      - `"cf_cli"`

      - `"dash_template"`

      - `"integration"`

      - `"quick_editor"`

      - `"playground"`

      - `"workersci"`

  - `number: optional number`

    Sequential version number.

### Version Get Response

- `VersionGetResponse object { resources, id, metadata, number }`

  - `resources: object { bindings, script, script_runtime }`

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

    - `script: optional object { etag, handlers, last_deployed_from, named_handlers }`

      - `etag: optional string`

        Hashed script content

      - `handlers: optional array of string`

        The names of handlers exported as part of the default export.

      - `last_deployed_from: optional string`

        The client most recently used to deploy this Worker.

      - `named_handlers: optional array of object { handlers, name }`

        Named exports, such as Durable Object class implementations and named entrypoints.

        - `handlers: optional array of string`

          The names of handlers exported as part of the named export.

        - `name: optional string`

          The name of the exported class or entrypoint.

    - `script_runtime: optional object { compatibility_date, compatibility_flags, limits, 2 more }`

      Runtime configuration for the Worker.

      - `compatibility_date: optional string`

        Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker.

      - `compatibility_flags: optional array of string`

        Flags that enable or disable certain features in the Workers runtime.

      - `limits: optional object { cpu_ms }`

        Resource limits for the Worker.

        - `cpu_ms: optional number`

          The amount of CPU time this Worker can use in milliseconds.

      - `migration_tag: optional string`

        The tag of the Durable Object migration that was most recently applied for this Worker.

      - `usage_model: optional "bundled" or "unbound" or "standard"`

        Usage model for the Worker invocations.

        - `"bundled"`

        - `"unbound"`

        - `"standard"`

  - `id: optional string`

    Unique identifier for the version.

  - `metadata: optional object { author_email, author_id, created_on, 3 more }`

    - `author_email: optional string`

      Email of the user who created the version.

    - `author_id: optional string`

      Identifier of the user who created the version.

    - `created_on: optional string`

      When the version was created.

    - `hasPreview: optional boolean`

      Whether the version can be previewed.

    - `modified_on: optional string`

      When the version was last modified.

    - `source: optional "unknown" or "api" or "wrangler" or 8 more`

      The source of the version upload.

      - `"unknown"`

      - `"api"`

      - `"wrangler"`

      - `"terraform"`

      - `"dash"`

      - `"cf_cli"`

      - `"dash_template"`

      - `"integration"`

      - `"quick_editor"`

      - `"playground"`

      - `"workersci"`

  - `number: optional number`

    Sequential version number.

### Version Create Response

- `VersionCreateResponse object { resources, id, metadata, 2 more }`

  - `resources: object { bindings, script, script_runtime }`

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

    - `script: optional object { etag, handlers, last_deployed_from, named_handlers }`

      - `etag: optional string`

        Hashed script content

      - `handlers: optional array of string`

        The names of handlers exported as part of the default export.

      - `last_deployed_from: optional string`

        The client most recently used to deploy this Worker.

      - `named_handlers: optional array of object { handlers, name }`

        Named exports, such as Durable Object class implementations and named entrypoints.

        - `handlers: optional array of string`

          The names of handlers exported as part of the named export.

        - `name: optional string`

          The name of the exported class or entrypoint.

    - `script_runtime: optional object { compatibility_date, compatibility_flags, limits, 2 more }`

      Runtime configuration for the Worker.

      - `compatibility_date: optional string`

        Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker.

      - `compatibility_flags: optional array of string`

        Flags that enable or disable certain features in the Workers runtime.

      - `limits: optional object { cpu_ms }`

        Resource limits for the Worker.

        - `cpu_ms: optional number`

          The amount of CPU time this Worker can use in milliseconds.

      - `migration_tag: optional string`

        The tag of the Durable Object migration that was most recently applied for this Worker.

      - `usage_model: optional "bundled" or "unbound" or "standard"`

        Usage model for the Worker invocations.

        - `"bundled"`

        - `"unbound"`

        - `"standard"`

  - `id: optional string`

    Unique identifier for the version.

  - `metadata: optional object { author_email, author_id, created_on, 3 more }`

    - `author_email: optional string`

      Email of the user who created the version.

    - `author_id: optional string`

      Identifier of the user who created the version.

    - `created_on: optional string`

      When the version was created.

    - `hasPreview: optional boolean`

      Whether the version can be previewed.

    - `modified_on: optional string`

      When the version was last modified.

    - `source: optional "unknown" or "api" or "wrangler" or 8 more`

      The source of the version upload.

      - `"unknown"`

      - `"api"`

      - `"wrangler"`

      - `"terraform"`

      - `"dash"`

      - `"cf_cli"`

      - `"dash_template"`

      - `"integration"`

      - `"quick_editor"`

      - `"playground"`

      - `"workersci"`

  - `number: optional number`

    Sequential version number.

  - `startup_time_ms: optional number`

    Time in milliseconds spent on [Worker startup](https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time).

# Secrets

## List script secrets

**get** `/accounts/{account_id}/workers/scripts/{script_name}/secrets`

List secrets bound to a script.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

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

- `result: optional array of object { name, text, type }  or object { algorithm, format, name, 4 more }`

  - `SecretText object { name, text, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `text: string`

      The secret value to use.

    - `type: "secret_text"`

      The kind of resource that the binding provides.

      - `"secret_text"`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/secrets \
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
  "success": true,
  "result": [
    {
      "name": "myBinding",
      "type": "secret_text"
    }
  ]
}
```

## Get secret binding

**get** `/accounts/{account_id}/workers/scripts/{script_name}/secrets/{secret_name}`

Get a given secret binding (value omitted) on a script.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

- `secret_name: string`

  A JavaScript variable name for the secret binding.

### Query Parameters

- `url_encoded: optional boolean`

  Flag that indicates whether the secret name is URL encoded.

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

- `result: optional object { name, text, type }  or object { algorithm, format, name, 4 more }`

  A secret value accessible through a binding.

  - `SecretText object { name, text, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `text: string`

      The secret value to use.

    - `type: "secret_text"`

      The kind of resource that the binding provides.

      - `"secret_text"`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/secrets/$SECRET_NAME \
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
  "success": true,
  "result": {
    "name": "myBinding",
    "type": "secret_text"
  }
}
```

## Add script secret

**put** `/accounts/{account_id}/workers/scripts/{script_name}/secrets`

Add a secret to a script.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

### Body Parameters

- `body: object { name, text, type }  or object { algorithm, format, name, 4 more }`

  A secret value accessible through a binding.

  - `SecretText object { name, text, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `text: string`

      The secret value to use.

    - `type: "secret_text"`

      The kind of resource that the binding provides.

      - `"secret_text"`

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

- `result: optional object { name, text, type }  or object { algorithm, format, name, 4 more }`

  A secret value accessible through a binding.

  - `SecretText object { name, text, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `text: string`

      The secret value to use.

    - `type: "secret_text"`

      The kind of resource that the binding provides.

      - `"secret_text"`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/secrets \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "myBinding",
          "text": "My secret.",
          "type": "secret_text"
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
  "success": true,
  "result": {
    "name": "myBinding",
    "type": "secret_text"
  }
}
```

## Delete script secret

**delete** `/accounts/{account_id}/workers/scripts/{script_name}/secrets/{secret_name}`

Remove a secret from a script.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

- `secret_name: string`

  A JavaScript variable name for the secret binding.

### Query Parameters

- `url_encoded: optional boolean`

  Flag that indicates whether the secret name is URL encoded.

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

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/secrets/$SECRET_NAME \
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
  "success": true,
  "result": {}
}
```

## Patch multiple script secrets

**patch** `/accounts/{account_id}/workers/scripts/{script_name}/secrets-bulk`

Create, update, or delete multiple secrets on a script in a single operation using JSON Merge Patch (RFC 7396).

Usage:

- To create or update a secret, set its value to a secret object.
- To delete a secret, set its value to `null`.
- Secrets not included in the request are left unchanged.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

### Body Parameters

- `secrets: optional map[object { name, text, type }  or object { algorithm, format, name, 4 more } ]`

  Map of secret names to secret values:

  - Set to a secret object to create or update.
  - Set to `null` to delete.
  - Omit to leave unchanged.

  - `SecretText object { name, text, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `text: string`

      The secret value to use.

    - `type: "secret_text"`

      The kind of resource that the binding provides.

      - `"secret_text"`

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

- `version_tags: optional map[unknown]`

  Optional version tags to apply to the new script version.

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

- `result: optional map[object { name, text, type }  or object { algorithm, format, name, 4 more } ]`

  Map of secret names to secret metadata for resulting secrets.

  - `SecretText object { name, text, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `text: string`

      The secret value to use.

    - `type: "secret_text"`

      The kind of resource that the binding provides.

      - `"secret_text"`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/secrets-bulk \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
  "success": true,
  "result": {
    "foo": {
      "name": "myBinding",
      "type": "secret_text"
    }
  }
}
```

## Domain Types

### Secret List Response

- `SecretListResponse = object { name, text, type }  or object { algorithm, format, name, 4 more }`

  A secret value accessible through a binding.

  - `SecretText object { name, text, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `text: string`

      The secret value to use.

    - `type: "secret_text"`

      The kind of resource that the binding provides.

      - `"secret_text"`

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

### Secret Get Response

- `SecretGetResponse = object { name, text, type }  or object { algorithm, format, name, 4 more }`

  A secret value accessible through a binding.

  - `SecretText object { name, text, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `text: string`

      The secret value to use.

    - `type: "secret_text"`

      The kind of resource that the binding provides.

      - `"secret_text"`

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

### Secret Update Response

- `SecretUpdateResponse = object { name, text, type }  or object { algorithm, format, name, 4 more }`

  A secret value accessible through a binding.

  - `SecretText object { name, text, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `text: string`

      The secret value to use.

    - `type: "secret_text"`

      The kind of resource that the binding provides.

      - `"secret_text"`

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

### Secret Delete Response

- `SecretDeleteResponse = unknown`

### Secret Bulk Update Response

- `SecretBulkUpdateResponse = map[object { name, text, type }  or object { algorithm, format, name, 4 more } ]`

  Map of secret names to secret metadata for resulting secrets.

  - `SecretText object { name, text, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `text: string`

      The secret value to use.

    - `type: "secret_text"`

      The kind of resource that the binding provides.

      - `"secret_text"`

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

# Script And Version Settings

## Get Settings

**get** `/accounts/{account_id}/workers/scripts/{script_name}/settings`

Get metadata and config, such as bindings or usage model.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

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

- `result: object { annotations, bindings, cache_options, 11 more }`

  - `annotations: optional object { "workers/message", "workers/tag", "workers/triggered_by" }`

    Annotations for the Worker version. Annotations are not inherited across settings updates; omitting this field means the new version will have no annotations.

    - `"workers/message": optional string`

      Human-readable message about the version. Truncated to 1000 bytes if longer.

    - `"workers/tag": optional string`

      User-provided identifier for the version. Maximum 100 bytes.

    - `"workers/triggered_by": optional string`

      Operation that triggered the creation of the version. This is read-only and set by the server.

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

  - `exports: optional map[object { type, cache } ]`

    Declarative exports for the Worker. Worker entrypoint entries
    (`type: worker`) carry cache configuration for that entrypoint.

    - `type: "worker" or "durable-object"`

      The kind of export.

      - `"worker"`

      - `"durable-object"`

    - `cache: optional object { enabled }`

      Cache override for this entrypoint. It applies only to
      `type: worker` entries and overrides the Worker's global
      `cache_options.enabled` for that entrypoint.

      - `enabled: boolean`

        Whether caching is enabled for this entrypoint.

  - `limits: optional object { cpu_ms, subrequests }`

    Limits to apply for this Worker.

    - `cpu_ms: optional number`

      The amount of CPU time this Worker can use in milliseconds.

    - `subrequests: optional number`

      The number of subrequests this Worker can make per request.

  - `logpush: optional boolean`

    Whether Logpush is turned on for the Worker.

  - `migrations: optional SingleStepMigration or object { new_tag, old_tag, steps }`

    Migrations to apply for Durable Objects associated with this Worker.

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

  - `observability: optional object { enabled, head_sampling_rate, logs, traces }`

    Observability settings for the Worker.

    - `enabled: boolean`

      Whether observability is enabled for the Worker.

    - `head_sampling_rate: optional number`

      The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

    - `logs: optional object { enabled, invocation_logs, destinations, 2 more }`

      Log settings for the Worker.

      - `enabled: boolean`

        Whether logs are enabled for the Worker.

      - `invocation_logs: boolean`

        Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.

      - `destinations: optional array of string`

        A list of destinations where logs will be exported to.

      - `head_sampling_rate: optional number`

        The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether log persistence is enabled for the Worker.

    - `traces: optional object { destinations, enabled, head_sampling_rate, 2 more }`

      Trace settings for the Worker.

      - `destinations: optional array of string`

        A list of destinations where traces will be exported to.

      - `enabled: optional boolean`

        Whether traces are enabled for the Worker.

      - `head_sampling_rate: optional number`

        The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether trace persistence is enabled for the Worker.

      - `propagation_policy: optional "authenticated" or "accept"`

        Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" (default) honors inbound trace context only when accompanied by a valid trace auth token. "accept" unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled.

        - `"authenticated"`

        - `"accept"`

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

  - `tags: optional array of string`

    Tags associated with the Worker.

  - `tail_consumers: optional array of ConsumerScript`

    List of Workers that will consume logs from the attached Worker.

    - `service: string`

      Name of Worker that is to be the consumer.

    - `environment: optional string`

      Optional environment if the Worker utilizes one.

    - `namespace: optional string`

      Optional dispatch namespace the script belongs to.

  - `usage_model: optional "standard" or "bundled" or "unbound"`

    Usage model for the Worker invocations.

    - `"standard"`

    - `"bundled"`

    - `"unbound"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/settings \
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
    "annotations": {
      "workers/message": "Fixed bug.",
      "workers/tag": "v1.0.1",
      "workers/triggered_by": "upload"
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
    "limits": {
      "cpu_ms": 50,
      "subrequests": 1000
    },
    "logpush": false,
    "observability": {
      "enabled": true,
      "head_sampling_rate": 0.1,
      "logs": {
        "enabled": true,
        "invocation_logs": true,
        "destinations": [
          "cloudflare"
        ],
        "head_sampling_rate": 0.1,
        "persist": true
      },
      "traces": {
        "destinations": [
          "cloudflare"
        ],
        "enabled": true,
        "head_sampling_rate": 0.1,
        "persist": true,
        "propagation_policy": "authenticated"
      }
    },
    "placement": {
      "mode": "smart"
    },
    "tags": [
      "my-team",
      "my-public-api"
    ],
    "tail_consumers": [
      {
        "service": "my-log-consumer",
        "environment": "production",
        "namespace": "my-namespace"
      }
    ],
    "usage_model": "standard"
  },
  "success": true
}
```

## Patch Settings

**patch** `/accounts/{account_id}/workers/scripts/{script_name}/settings`

Patch metadata or config, such as bindings or usage model.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

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

- `result: object { annotations, bindings, cache_options, 11 more }`

  - `annotations: optional object { "workers/message", "workers/tag", "workers/triggered_by" }`

    Annotations for the Worker version. Annotations are not inherited across settings updates; omitting this field means the new version will have no annotations.

    - `"workers/message": optional string`

      Human-readable message about the version. Truncated to 1000 bytes if longer.

    - `"workers/tag": optional string`

      User-provided identifier for the version. Maximum 100 bytes.

    - `"workers/triggered_by": optional string`

      Operation that triggered the creation of the version. This is read-only and set by the server.

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

  - `exports: optional map[object { type, cache } ]`

    Declarative exports for the Worker. Worker entrypoint entries
    (`type: worker`) carry cache configuration for that entrypoint.

    - `type: "worker" or "durable-object"`

      The kind of export.

      - `"worker"`

      - `"durable-object"`

    - `cache: optional object { enabled }`

      Cache override for this entrypoint. It applies only to
      `type: worker` entries and overrides the Worker's global
      `cache_options.enabled` for that entrypoint.

      - `enabled: boolean`

        Whether caching is enabled for this entrypoint.

  - `limits: optional object { cpu_ms, subrequests }`

    Limits to apply for this Worker.

    - `cpu_ms: optional number`

      The amount of CPU time this Worker can use in milliseconds.

    - `subrequests: optional number`

      The number of subrequests this Worker can make per request.

  - `logpush: optional boolean`

    Whether Logpush is turned on for the Worker.

  - `migrations: optional SingleStepMigration or object { new_tag, old_tag, steps }`

    Migrations to apply for Durable Objects associated with this Worker.

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

  - `observability: optional object { enabled, head_sampling_rate, logs, traces }`

    Observability settings for the Worker.

    - `enabled: boolean`

      Whether observability is enabled for the Worker.

    - `head_sampling_rate: optional number`

      The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

    - `logs: optional object { enabled, invocation_logs, destinations, 2 more }`

      Log settings for the Worker.

      - `enabled: boolean`

        Whether logs are enabled for the Worker.

      - `invocation_logs: boolean`

        Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.

      - `destinations: optional array of string`

        A list of destinations where logs will be exported to.

      - `head_sampling_rate: optional number`

        The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether log persistence is enabled for the Worker.

    - `traces: optional object { destinations, enabled, head_sampling_rate, 2 more }`

      Trace settings for the Worker.

      - `destinations: optional array of string`

        A list of destinations where traces will be exported to.

      - `enabled: optional boolean`

        Whether traces are enabled for the Worker.

      - `head_sampling_rate: optional number`

        The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether trace persistence is enabled for the Worker.

      - `propagation_policy: optional "authenticated" or "accept"`

        Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" (default) honors inbound trace context only when accompanied by a valid trace auth token. "accept" unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled.

        - `"authenticated"`

        - `"accept"`

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

  - `tags: optional array of string`

    Tags associated with the Worker.

  - `tail_consumers: optional array of ConsumerScript`

    List of Workers that will consume logs from the attached Worker.

    - `service: string`

      Name of Worker that is to be the consumer.

    - `environment: optional string`

      Optional environment if the Worker utilizes one.

    - `namespace: optional string`

      Optional dispatch namespace the script belongs to.

  - `usage_model: optional "standard" or "bundled" or "unbound"`

    Usage model for the Worker invocations.

    - `"standard"`

    - `"bundled"`

    - `"unbound"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/settings \
    -X PATCH \
    -H 'Content-Type: multipart/form-data' \
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
    "annotations": {
      "workers/message": "Fixed bug.",
      "workers/tag": "v1.0.1",
      "workers/triggered_by": "upload"
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
    "limits": {
      "cpu_ms": 50,
      "subrequests": 1000
    },
    "logpush": false,
    "observability": {
      "enabled": true,
      "head_sampling_rate": 0.1,
      "logs": {
        "enabled": true,
        "invocation_logs": true,
        "destinations": [
          "cloudflare"
        ],
        "head_sampling_rate": 0.1,
        "persist": true
      },
      "traces": {
        "destinations": [
          "cloudflare"
        ],
        "enabled": true,
        "head_sampling_rate": 0.1,
        "persist": true,
        "propagation_policy": "authenticated"
      }
    },
    "placement": {
      "mode": "smart"
    },
    "tags": [
      "my-team",
      "my-public-api"
    ],
    "tail_consumers": [
      {
        "service": "my-log-consumer",
        "environment": "production",
        "namespace": "my-namespace"
      }
    ],
    "usage_model": "standard"
  },
  "success": true
}
```

## Domain Types

### Script And Version Setting Get Response

- `ScriptAndVersionSettingGetResponse object { annotations, bindings, cache_options, 11 more }`

  - `annotations: optional object { "workers/message", "workers/tag", "workers/triggered_by" }`

    Annotations for the Worker version. Annotations are not inherited across settings updates; omitting this field means the new version will have no annotations.

    - `"workers/message": optional string`

      Human-readable message about the version. Truncated to 1000 bytes if longer.

    - `"workers/tag": optional string`

      User-provided identifier for the version. Maximum 100 bytes.

    - `"workers/triggered_by": optional string`

      Operation that triggered the creation of the version. This is read-only and set by the server.

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

  - `exports: optional map[object { type, cache } ]`

    Declarative exports for the Worker. Worker entrypoint entries
    (`type: worker`) carry cache configuration for that entrypoint.

    - `type: "worker" or "durable-object"`

      The kind of export.

      - `"worker"`

      - `"durable-object"`

    - `cache: optional object { enabled }`

      Cache override for this entrypoint. It applies only to
      `type: worker` entries and overrides the Worker's global
      `cache_options.enabled` for that entrypoint.

      - `enabled: boolean`

        Whether caching is enabled for this entrypoint.

  - `limits: optional object { cpu_ms, subrequests }`

    Limits to apply for this Worker.

    - `cpu_ms: optional number`

      The amount of CPU time this Worker can use in milliseconds.

    - `subrequests: optional number`

      The number of subrequests this Worker can make per request.

  - `logpush: optional boolean`

    Whether Logpush is turned on for the Worker.

  - `migrations: optional SingleStepMigration or object { new_tag, old_tag, steps }`

    Migrations to apply for Durable Objects associated with this Worker.

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

  - `observability: optional object { enabled, head_sampling_rate, logs, traces }`

    Observability settings for the Worker.

    - `enabled: boolean`

      Whether observability is enabled for the Worker.

    - `head_sampling_rate: optional number`

      The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

    - `logs: optional object { enabled, invocation_logs, destinations, 2 more }`

      Log settings for the Worker.

      - `enabled: boolean`

        Whether logs are enabled for the Worker.

      - `invocation_logs: boolean`

        Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.

      - `destinations: optional array of string`

        A list of destinations where logs will be exported to.

      - `head_sampling_rate: optional number`

        The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether log persistence is enabled for the Worker.

    - `traces: optional object { destinations, enabled, head_sampling_rate, 2 more }`

      Trace settings for the Worker.

      - `destinations: optional array of string`

        A list of destinations where traces will be exported to.

      - `enabled: optional boolean`

        Whether traces are enabled for the Worker.

      - `head_sampling_rate: optional number`

        The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether trace persistence is enabled for the Worker.

      - `propagation_policy: optional "authenticated" or "accept"`

        Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" (default) honors inbound trace context only when accompanied by a valid trace auth token. "accept" unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled.

        - `"authenticated"`

        - `"accept"`

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

  - `tags: optional array of string`

    Tags associated with the Worker.

  - `tail_consumers: optional array of ConsumerScript`

    List of Workers that will consume logs from the attached Worker.

    - `service: string`

      Name of Worker that is to be the consumer.

    - `environment: optional string`

      Optional environment if the Worker utilizes one.

    - `namespace: optional string`

      Optional dispatch namespace the script belongs to.

  - `usage_model: optional "standard" or "bundled" or "unbound"`

    Usage model for the Worker invocations.

    - `"standard"`

    - `"bundled"`

    - `"unbound"`

### Script And Version Setting Edit Response

- `ScriptAndVersionSettingEditResponse object { annotations, bindings, cache_options, 11 more }`

  - `annotations: optional object { "workers/message", "workers/tag", "workers/triggered_by" }`

    Annotations for the Worker version. Annotations are not inherited across settings updates; omitting this field means the new version will have no annotations.

    - `"workers/message": optional string`

      Human-readable message about the version. Truncated to 1000 bytes if longer.

    - `"workers/tag": optional string`

      User-provided identifier for the version. Maximum 100 bytes.

    - `"workers/triggered_by": optional string`

      Operation that triggered the creation of the version. This is read-only and set by the server.

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

  - `exports: optional map[object { type, cache } ]`

    Declarative exports for the Worker. Worker entrypoint entries
    (`type: worker`) carry cache configuration for that entrypoint.

    - `type: "worker" or "durable-object"`

      The kind of export.

      - `"worker"`

      - `"durable-object"`

    - `cache: optional object { enabled }`

      Cache override for this entrypoint. It applies only to
      `type: worker` entries and overrides the Worker's global
      `cache_options.enabled` for that entrypoint.

      - `enabled: boolean`

        Whether caching is enabled for this entrypoint.

  - `limits: optional object { cpu_ms, subrequests }`

    Limits to apply for this Worker.

    - `cpu_ms: optional number`

      The amount of CPU time this Worker can use in milliseconds.

    - `subrequests: optional number`

      The number of subrequests this Worker can make per request.

  - `logpush: optional boolean`

    Whether Logpush is turned on for the Worker.

  - `migrations: optional SingleStepMigration or object { new_tag, old_tag, steps }`

    Migrations to apply for Durable Objects associated with this Worker.

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

  - `observability: optional object { enabled, head_sampling_rate, logs, traces }`

    Observability settings for the Worker.

    - `enabled: boolean`

      Whether observability is enabled for the Worker.

    - `head_sampling_rate: optional number`

      The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

    - `logs: optional object { enabled, invocation_logs, destinations, 2 more }`

      Log settings for the Worker.

      - `enabled: boolean`

        Whether logs are enabled for the Worker.

      - `invocation_logs: boolean`

        Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.

      - `destinations: optional array of string`

        A list of destinations where logs will be exported to.

      - `head_sampling_rate: optional number`

        The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether log persistence is enabled for the Worker.

    - `traces: optional object { destinations, enabled, head_sampling_rate, 2 more }`

      Trace settings for the Worker.

      - `destinations: optional array of string`

        A list of destinations where traces will be exported to.

      - `enabled: optional boolean`

        Whether traces are enabled for the Worker.

      - `head_sampling_rate: optional number`

        The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

      - `persist: optional boolean`

        Whether trace persistence is enabled for the Worker.

      - `propagation_policy: optional "authenticated" or "accept"`

        Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. "authenticated" (default) honors inbound trace context only when accompanied by a valid trace auth token. "accept" unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled.

        - `"authenticated"`

        - `"accept"`

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

  - `tags: optional array of string`

    Tags associated with the Worker.

  - `tail_consumers: optional array of ConsumerScript`

    List of Workers that will consume logs from the attached Worker.

    - `service: string`

      Name of Worker that is to be the consumer.

    - `environment: optional string`

      Optional environment if the Worker utilizes one.

    - `namespace: optional string`

      Optional dispatch namespace the script belongs to.

  - `usage_model: optional "standard" or "bundled" or "unbound"`

    Usage model for the Worker invocations.

    - `"standard"`

    - `"bundled"`

    - `"unbound"`

# Account Settings

## Fetch Worker Account Settings

**get** `/accounts/{account_id}/workers/account-settings`

Fetches Worker account settings for an account.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: object { default_usage_model, green_compute }`

  - `default_usage_model: optional string`

  - `green_compute: optional boolean`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/account-settings \
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
    "default_usage_model": "default_usage_model",
    "green_compute": true
  },
  "success": true
}
```

## Create Worker Account Settings

**put** `/accounts/{account_id}/workers/account-settings`

Creates Worker account settings for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `default_usage_model: optional string`

- `green_compute: optional boolean`

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

- `result: object { default_usage_model, green_compute }`

  - `default_usage_model: optional string`

  - `green_compute: optional boolean`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/account-settings \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "default_usage_model": "default_usage_model",
    "green_compute": true
  },
  "success": true
}
```

## Domain Types

### Account Setting Get Response

- `AccountSettingGetResponse object { default_usage_model, green_compute }`

  - `default_usage_model: optional string`

  - `green_compute: optional boolean`

### Account Setting Update Response

- `AccountSettingUpdateResponse object { default_usage_model, green_compute }`

  - `default_usage_model: optional string`

  - `green_compute: optional boolean`

# Domains

## List Domains

**get** `/accounts/{account_id}/workers/domains`

Lists all domains for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `environment: optional string`

  Worker environment associated with the domain.

- `hostname: optional string`

  Hostname of the domain.

- `service: optional string`

  Name of the Worker associated with the domain.

- `zone_id: optional string`

  ID of the zone containing the domain hostname.

- `zone_name: optional string`

  Name of the zone containing the domain hostname.

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

- `result: array of object { id, cert_id, environment, 4 more }`

  - `id: string`

    Immutable ID of the domain.

  - `cert_id: string`

    ID of the TLS certificate issued for the domain.

  - `environment: string`

    Worker environment associated with the domain.

  - `hostname: string`

    Hostname of the domain. Can be either the zone apex or a subdomain of the zone. Requests to this hostname will be routed to the configured Worker.

  - `service: string`

    Name of the Worker associated with the domain. Requests to the configured hostname will be routed to this Worker.

  - `zone_id: string`

    ID of the zone containing the domain hostname.

  - `zone_name: string`

    Name of the zone containing the domain hostname.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/domains \
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
      "id": "dbe10b4bc17c295377eabd600e1787fd",
      "cert_id": "9fdf92c8-64c2-4a3d-b1af-e15304961145",
      "environment": "production",
      "hostname": "app.example.com",
      "service": "my-worker",
      "zone_id": "593c9c94de529bbbfaac7c53ced0447d",
      "zone_name": "example.com"
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

## Get Domain

**get** `/accounts/{account_id}/workers/domains/{domain_id}`

Gets information about a domain.

### Path Parameters

- `account_id: string`

  Identifier.

- `domain_id: string`

  ID of the domain.

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

- `result: object { id, cert_id, environment, 4 more }`

  - `id: string`

    Immutable ID of the domain.

  - `cert_id: string`

    ID of the TLS certificate issued for the domain.

  - `environment: string`

    Worker environment associated with the domain.

  - `hostname: string`

    Hostname of the domain. Can be either the zone apex or a subdomain of the zone. Requests to this hostname will be routed to the configured Worker.

  - `service: string`

    Name of the Worker associated with the domain. Requests to the configured hostname will be routed to this Worker.

  - `zone_id: string`

    ID of the zone containing the domain hostname.

  - `zone_name: string`

    Name of the zone containing the domain hostname.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/domains/$DOMAIN_ID \
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
    "id": "dbe10b4bc17c295377eabd600e1787fd",
    "cert_id": "9fdf92c8-64c2-4a3d-b1af-e15304961145",
    "environment": "production",
    "hostname": "app.example.com",
    "service": "my-worker",
    "zone_id": "593c9c94de529bbbfaac7c53ced0447d",
    "zone_name": "example.com"
  },
  "success": true
}
```

## Attach Domain

**put** `/accounts/{account_id}/workers/domains`

Attaches a domain that routes traffic to a Worker.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `hostname: string`

  Hostname of the domain. Can be either the zone apex or a subdomain of the zone. Requests to this hostname will be routed to the configured Worker.

- `service: string`

  Name of the Worker associated with the domain. Requests to the configured hostname will be routed to this Worker.

- `environment: optional string`

  Worker environment associated with the domain.

- `zone_id: optional string`

  ID of the zone containing the domain hostname.

- `zone_name: optional string`

  Name of the zone containing the domain hostname.

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

- `result: object { id, cert_id, environment, 4 more }`

  - `id: string`

    Immutable ID of the domain.

  - `cert_id: string`

    ID of the TLS certificate issued for the domain.

  - `environment: string`

    Worker environment associated with the domain.

  - `hostname: string`

    Hostname of the domain. Can be either the zone apex or a subdomain of the zone. Requests to this hostname will be routed to the configured Worker.

  - `service: string`

    Name of the Worker associated with the domain. Requests to the configured hostname will be routed to this Worker.

  - `zone_id: string`

    ID of the zone containing the domain hostname.

  - `zone_name: string`

    Name of the zone containing the domain hostname.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/domains \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "hostname": "app.example.com",
          "service": "my-worker",
          "environment": "production",
          "zone_id": "593c9c94de529bbbfaac7c53ced0447d",
          "zone_name": "example.com"
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
    "id": "dbe10b4bc17c295377eabd600e1787fd",
    "cert_id": "9fdf92c8-64c2-4a3d-b1af-e15304961145",
    "environment": "production",
    "hostname": "app.example.com",
    "service": "my-worker",
    "zone_id": "593c9c94de529bbbfaac7c53ced0447d",
    "zone_name": "example.com"
  },
  "success": true
}
```

## Detach Domain

**delete** `/accounts/{account_id}/workers/domains/{domain_id}`

Detaches a domain from a Worker. Both the Worker and all of its previews are no longer routable using this domain.

### Path Parameters

- `account_id: string`

  Identifier.

- `domain_id: string`

  ID of the domain.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/domains/$DOMAIN_ID \
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

### Domain List Response

- `DomainListResponse object { id, cert_id, environment, 4 more }`

  - `id: string`

    Immutable ID of the domain.

  - `cert_id: string`

    ID of the TLS certificate issued for the domain.

  - `environment: string`

    Worker environment associated with the domain.

  - `hostname: string`

    Hostname of the domain. Can be either the zone apex or a subdomain of the zone. Requests to this hostname will be routed to the configured Worker.

  - `service: string`

    Name of the Worker associated with the domain. Requests to the configured hostname will be routed to this Worker.

  - `zone_id: string`

    ID of the zone containing the domain hostname.

  - `zone_name: string`

    Name of the zone containing the domain hostname.

### Domain Get Response

- `DomainGetResponse object { id, cert_id, environment, 4 more }`

  - `id: string`

    Immutable ID of the domain.

  - `cert_id: string`

    ID of the TLS certificate issued for the domain.

  - `environment: string`

    Worker environment associated with the domain.

  - `hostname: string`

    Hostname of the domain. Can be either the zone apex or a subdomain of the zone. Requests to this hostname will be routed to the configured Worker.

  - `service: string`

    Name of the Worker associated with the domain. Requests to the configured hostname will be routed to this Worker.

  - `zone_id: string`

    ID of the zone containing the domain hostname.

  - `zone_name: string`

    Name of the zone containing the domain hostname.

### Domain Update Response

- `DomainUpdateResponse object { id, cert_id, environment, 4 more }`

  - `id: string`

    Immutable ID of the domain.

  - `cert_id: string`

    ID of the TLS certificate issued for the domain.

  - `environment: string`

    Worker environment associated with the domain.

  - `hostname: string`

    Hostname of the domain. Can be either the zone apex or a subdomain of the zone. Requests to this hostname will be routed to the configured Worker.

  - `service: string`

    Name of the Worker associated with the domain. Requests to the configured hostname will be routed to this Worker.

  - `zone_id: string`

    ID of the zone containing the domain hostname.

  - `zone_name: string`

    Name of the zone containing the domain hostname.

### Domain Delete Response

- `DomainDeleteResponse object { errors, messages, success }`

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

# Subdomains

## Get Subdomain

**get** `/accounts/{account_id}/workers/subdomain`

Returns a Workers subdomain for an account.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: object { subdomain }`

  - `subdomain: string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/subdomain \
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
    "subdomain": "my-subdomain"
  },
  "success": true
}
```

## Create Subdomain

**put** `/accounts/{account_id}/workers/subdomain`

Creates a Workers subdomain for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `subdomain: string`

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

- `result: object { subdomain }`

  - `subdomain: string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/subdomain \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "subdomain": "my-subdomain"
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
    "subdomain": "my-subdomain"
  },
  "success": true
}
```

## Delete Subdomain

**delete** `/accounts/{account_id}/workers/subdomain`

Deletes a Workers subdomain for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/subdomain \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Domain Types

### Subdomain Get Response

- `SubdomainGetResponse object { subdomain }`

  - `subdomain: string`

### Subdomain Update Response

- `SubdomainUpdateResponse object { subdomain }`

  - `subdomain: string`

# Observability

# Telemetry

## List keys

**post** `/accounts/{account_id}/workers/observability/telemetry/keys`

List all the keys in your telemetry events.

### Path Parameters

- `account_id: string`

### Body Parameters

- `datasets: optional array of string`

  Leave this empty to use the default datasets

- `filters: optional array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

  Apply filters to narrow key discovery. Supports nested groups via kind: 'group'. Maximum nesting depth is 4.

  - `object { filterCombination, filters, kind }`

    - `filterCombination: "and" or "or" or "AND" or "OR"`

      - `"and"`

      - `"or"`

      - `"AND"`

      - `"OR"`

    - `filters: array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

      - `object { filterCombination, filters, kind }`

        - `filterCombination: "and" or "or" or "AND" or "OR"`

          - `"and"`

          - `"or"`

          - `"AND"`

          - `"OR"`

        - `filters: array of unknown`

        - `kind: "group"`

          - `"group"`

      - `WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }`

        A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

        - `key: string`

          Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

        - `operation: "includes" or "not_includes" or "starts_with" or 27 more`

          Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

          - `"includes"`

          - `"not_includes"`

          - `"starts_with"`

          - `"ends_with"`

          - `"regex"`

          - `"exists"`

          - `"is_null"`

          - `"in"`

          - `"not_in"`

          - `"eq"`

          - `"neq"`

          - `"gt"`

          - `"gte"`

          - `"lt"`

          - `"lte"`

          - `"="`

          - `"!="`

          - `">"`

          - `">="`

          - `"<"`

          - `"<="`

          - `"INCLUDES"`

          - `"DOES_NOT_INCLUDE"`

          - `"MATCH_REGEX"`

          - `"EXISTS"`

          - `"DOES_NOT_EXIST"`

          - `"IN"`

          - `"NOT_IN"`

          - `"STARTS_WITH"`

          - `"ENDS_WITH"`

        - `type: "string" or "number" or "boolean"`

          Data type of the filter field. Must match the actual type of the key being filtered.

          - `"string"`

          - `"number"`

          - `"boolean"`

        - `kind: optional "filter"`

          Discriminator for leaf filter nodes. Always 'filter' when present; may be omitted.

          - `"filter"`

        - `value: optional string or number or boolean`

          Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

          - `string`

          - `number`

          - `boolean`

    - `kind: "group"`

      - `"group"`

  - `WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }`

    A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

    - `key: string`

      Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

    - `operation: "includes" or "not_includes" or "starts_with" or 27 more`

      Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

      - `"includes"`

      - `"not_includes"`

      - `"starts_with"`

      - `"ends_with"`

      - `"regex"`

      - `"exists"`

      - `"is_null"`

      - `"in"`

      - `"not_in"`

      - `"eq"`

      - `"neq"`

      - `"gt"`

      - `"gte"`

      - `"lt"`

      - `"lte"`

      - `"="`

      - `"!="`

      - `">"`

      - `">="`

      - `"<"`

      - `"<="`

      - `"INCLUDES"`

      - `"DOES_NOT_INCLUDE"`

      - `"MATCH_REGEX"`

      - `"EXISTS"`

      - `"DOES_NOT_EXIST"`

      - `"IN"`

      - `"NOT_IN"`

      - `"STARTS_WITH"`

      - `"ENDS_WITH"`

    - `type: "string" or "number" or "boolean"`

      Data type of the filter field. Must match the actual type of the key being filtered.

      - `"string"`

      - `"number"`

      - `"boolean"`

    - `kind: optional "filter"`

      Discriminator for leaf filter nodes. Always 'filter' when present; may be omitted.

      - `"filter"`

    - `value: optional string or number or boolean`

      Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

      - `string`

      - `number`

      - `boolean`

- `from: optional number`

- `keyNeedle: optional object { value, isRegex, matchCase }`

  If the user suggests a key, use this to narrow down the list of keys returned. Make sure matchCase is false to avoid case sensitivity issues.

  - `value: string or number or boolean`

    The text or pattern to search for.

    - `string`

    - `number`

    - `boolean`

  - `isRegex: optional boolean`

    When true, treats the value as a regular expression (RE2 syntax).

  - `matchCase: optional boolean`

    When true, performs a case-sensitive search. Defaults to case-insensitive.

- `limit: optional number`

  Advanced usage: set limit=1000+ to retrieve comprehensive key options without needing additional filtering.

- `needle: optional object { value, isRegex, matchCase }`

  Search for a specific substring in any of the events

  - `value: string or number or boolean`

    The text or pattern to search for.

    - `string`

    - `number`

    - `boolean`

  - `isRegex: optional boolean`

    When true, treats the value as a regular expression (RE2 syntax).

  - `matchCase: optional boolean`

    When true, performs a case-sensitive search. Defaults to case-insensitive.

- `to: optional number`

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: "Successful request"`

    - `"Successful request"`

- `result: array of object { key, lastSeenAt, type }`

  - `key: string`

  - `lastSeenAt: number`

  - `type: "string" or "boolean" or "number"`

    - `"string"`

    - `"boolean"`

    - `"number"`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/telemetry/keys \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{}'
```

#### Response

```json
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "Successful request"
    }
  ],
  "result": [
    {
      "key": "key",
      "lastSeenAt": 0,
      "type": "string"
    }
  ],
  "success": true
}
```

## Run a query

**post** `/accounts/{account_id}/workers/observability/telemetry/query`

Run a temporary or saved query.

### Path Parameters

- `account_id: string`

### Body Parameters

- `queryId: string`

  Identifier for the query. When parameters are omitted, this ID is used to load a previously saved query's parameters. When providing parameters inline, pass any identifier (e.g. an ad-hoc ID).

- `timeframe: object { from, to }`

  Timeframe for the query using Unix timestamps in milliseconds. Narrower timeframes produce faster responses and more specific results.

  - `from: number`

    Start timestamp for the query timeframe (Unix timestamp in milliseconds)

  - `to: number`

    End timestamp for the query timeframe (Unix timestamp in milliseconds)

- `chart: optional boolean`

  When true, includes time-series data in the response.

- `compare: optional boolean`

  When true, includes a comparison dataset from the previous time period of equal length.

- `dry: optional boolean`

  When true, executes the query without persisting the results. Useful for validation or previewing.

- `granularity: optional number`

  Number of time-series buckets. Only used when view is 'calculations'. Omit to let the system auto-detect an appropriate granularity.

- `ignoreSeries: optional boolean`

  When true, omits time-series data from the response and returns only aggregated values. Reduces response size when series are not needed.

- `limit: optional number`

  Maximum number of events to return when view is 'events'. Also controls the number of group-by rows when view is 'calculations'.

- `offset: optional string`

  Cursor for pagination in event, trace, and invocation views. Pass the $metadata.id of the last returned item to fetch the next page.

- `offsetBy: optional number`

  Numeric offset for paginating grouped/pattern results (top-N lists). Use together with limit. Not used by cursor-based pagination.

- `offsetDirection: optional string`

  Pagination direction: 'next' for forward, 'prev' for backward.

- `parameters: optional object { calculations, datasets, filterCombination, 6 more }`

  Query parameters defining what data to retrieve — filters, calculations, group-bys, and ordering. In practice this should always be provided for ad-hoc queries. Only omit when executing a previously saved query by queryId. Use the keys and values endpoints to discover available fields before building filters.

  - `calculations: optional array of object { operator, alias, key, keyType }`

    Aggregation calculations to compute (e.g. count, avg, p99). Each calculation produces aggregate values and optional time-series data.

    - `operator: "uniq" or "count" or "max" or 35 more`

      Aggregation operator to apply. Examples: count, avg, sum, min, max, median, p90, p95, p99, uniq, stddev, variance.

      - `"uniq"`

      - `"count"`

      - `"max"`

      - `"min"`

      - `"sum"`

      - `"avg"`

      - `"median"`

      - `"p001"`

      - `"p01"`

      - `"p05"`

      - `"p10"`

      - `"p25"`

      - `"p75"`

      - `"p90"`

      - `"p95"`

      - `"p99"`

      - `"p999"`

      - `"stddev"`

      - `"variance"`

      - `"COUNT_DISTINCT"`

      - `"COUNT"`

      - `"MAX"`

      - `"MIN"`

      - `"SUM"`

      - `"AVG"`

      - `"MEDIAN"`

      - `"P001"`

      - `"P01"`

      - `"P05"`

      - `"P10"`

      - `"P25"`

      - `"P75"`

      - `"P90"`

      - `"P95"`

      - `"P99"`

      - `"P999"`

      - `"STDDEV"`

      - `"VARIANCE"`

    - `alias: optional string`

      Custom label for this calculation in the results. Useful for distinguishing multiple calculations.

    - `key: optional string`

      Field name to calculate over. Must exist in the data — verify with the keys endpoint. Omit for operators that don't require a key (e.g. count).

    - `keyType: optional "string" or "number" or "boolean"`

      Data type of the key. Required when key is provided to ensure correct aggregation.

      - `"string"`

      - `"number"`

      - `"boolean"`

  - `datasets: optional array of string`

    Datasets to query. Leave empty to query all available datasets.

  - `filterCombination: optional "and" or "or" or "AND" or "OR"`

    Logical operator for combining top-level filters: 'and' (all must match) or 'or' (any must match). Defaults to 'and'.

    - `"and"`

    - `"or"`

    - `"AND"`

    - `"OR"`

  - `filters: optional array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

    Filters to narrow query results. Use the keys and values endpoints to discover available fields before building filters. Supports nested groups via kind: 'group'. Maximum nesting depth is 4.

    - `object { filterCombination, filters, kind }`

      - `filterCombination: "and" or "or" or "AND" or "OR"`

        - `"and"`

        - `"or"`

        - `"AND"`

        - `"OR"`

      - `filters: array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

        - `object { filterCombination, filters, kind }`

          - `filterCombination: "and" or "or" or "AND" or "OR"`

            - `"and"`

            - `"or"`

            - `"AND"`

            - `"OR"`

          - `filters: array of unknown`

          - `kind: "group"`

            - `"group"`

        - `WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }`

          A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

          - `key: string`

            Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

          - `operation: "includes" or "not_includes" or "starts_with" or 27 more`

            Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

            - `"includes"`

            - `"not_includes"`

            - `"starts_with"`

            - `"ends_with"`

            - `"regex"`

            - `"exists"`

            - `"is_null"`

            - `"in"`

            - `"not_in"`

            - `"eq"`

            - `"neq"`

            - `"gt"`

            - `"gte"`

            - `"lt"`

            - `"lte"`

            - `"="`

            - `"!="`

            - `">"`

            - `">="`

            - `"<"`

            - `"<="`

            - `"INCLUDES"`

            - `"DOES_NOT_INCLUDE"`

            - `"MATCH_REGEX"`

            - `"EXISTS"`

            - `"DOES_NOT_EXIST"`

            - `"IN"`

            - `"NOT_IN"`

            - `"STARTS_WITH"`

            - `"ENDS_WITH"`

          - `type: "string" or "number" or "boolean"`

            Data type of the filter field. Must match the actual type of the key being filtered.

            - `"string"`

            - `"number"`

            - `"boolean"`

          - `kind: optional "filter"`

            Discriminator for leaf filter nodes. Always 'filter' when present; may be omitted.

            - `"filter"`

          - `value: optional string or number or boolean`

            Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

            - `string`

            - `number`

            - `boolean`

      - `kind: "group"`

        - `"group"`

    - `WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }`

      A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

      - `key: string`

        Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

      - `operation: "includes" or "not_includes" or "starts_with" or 27 more`

        Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

        - `"includes"`

        - `"not_includes"`

        - `"starts_with"`

        - `"ends_with"`

        - `"regex"`

        - `"exists"`

        - `"is_null"`

        - `"in"`

        - `"not_in"`

        - `"eq"`

        - `"neq"`

        - `"gt"`

        - `"gte"`

        - `"lt"`

        - `"lte"`

        - `"="`

        - `"!="`

        - `">"`

        - `">="`

        - `"<"`

        - `"<="`

        - `"INCLUDES"`

        - `"DOES_NOT_INCLUDE"`

        - `"MATCH_REGEX"`

        - `"EXISTS"`

        - `"DOES_NOT_EXIST"`

        - `"IN"`

        - `"NOT_IN"`

        - `"STARTS_WITH"`

        - `"ENDS_WITH"`

      - `type: "string" or "number" or "boolean"`

        Data type of the filter field. Must match the actual type of the key being filtered.

        - `"string"`

        - `"number"`

        - `"boolean"`

      - `kind: optional "filter"`

        Discriminator for leaf filter nodes. Always 'filter' when present; may be omitted.

        - `"filter"`

      - `value: optional string or number or boolean`

        Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

        - `string`

        - `number`

        - `boolean`

  - `groupBys: optional array of object { type, value }`

    Fields to group calculation results by. Only applicable when the query view is 'calculations'. Produces per-group aggregate values.

    - `type: "string" or "number" or "boolean"`

      Data type of the group-by field.

      - `"string"`

      - `"number"`

      - `"boolean"`

    - `value: string`

      Field name to group results by (e.g. $metadata.service, $metadata.statusCode).

  - `havings: optional array of object { key, operation, value }`

    Post-aggregation filters applied to calculation results. Use to filter groups after aggregation (e.g. only groups where count > 100).

    - `key: string`

      Calculation alias or operator to filter on after aggregation.

    - `operation: "eq" or "neq" or "gt" or 3 more`

      Numeric comparison operator: eq, neq, gt, gte, lt, lte.

      - `"eq"`

      - `"neq"`

      - `"gt"`

      - `"gte"`

      - `"lt"`

      - `"lte"`

    - `value: number`

      Threshold value to compare the calculation result against.

  - `limit: optional number`

    Maximum number of group-by rows to return in calculation results. A value of 10 is a sensible default for most use cases.

  - `needle: optional object { value, isRegex, matchCase }`

    Full-text search expression applied across all event fields. Matches events containing the specified text.

    - `value: string or number or boolean`

      The text or pattern to search for.

      - `string`

      - `number`

      - `boolean`

    - `isRegex: optional boolean`

      When true, treats the value as a regular expression (RE2 syntax).

    - `matchCase: optional boolean`

      When true, performs a case-sensitive search. Defaults to case-insensitive.

  - `orderBy: optional object { value, order }`

    Ordering for grouped calculation results. Only effective when a group-by is present.

    - `value: string`

      Alias of the calculation to order results by. Must match the alias (or operator) of a calculation in the query.

    - `order: optional "asc" or "desc"`

      Sort direction: 'asc' for ascending, 'desc' for descending.

      - `"asc"`

      - `"desc"`

- `view: optional "traces" or "events" or "calculations" or 3 more`

  Controls the shape of the response. 'events': individual log lines matching the query. 'calculations': aggregated metrics (count, avg, p99, etc.) with optional group-by breakdowns and time-series. 'invocations': events grouped by request ID. 'traces': distributed trace summaries. 'agents': Durable Object agent summaries.

  - `"traces"`

  - `"events"`

  - `"calculations"`

  - `"invocations"`

  - `"requests"`

  - `"agents"`

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: "Successful request"`

    - `"Successful request"`

- `result: object { run, statistics, agents, 5 more }`

  Complete results of a query run. The populated fields depend on the requested view type (events, calculations, invocations, traces, or agents).

  - `run: object { id, accountId, dry, 8 more }`

    Represents a single execution of a query against Workers Observability data, including the query definition, execution status, and performance statistics.

    - `id: string`

      Unique identifier for this query run.

    - `accountId: string`

      Cloudflare account ID that owns this query run.

    - `dry: boolean`

      Whether this was a dry run (results not persisted).

    - `granularity: number`

      Number of time-series buckets used for the query. Higher values produce more detailed series data.

    - `query: object { id, adhoc, created, 6 more }`

      A saved query definition with its parameters, metadata, and ownership information.

      - `id: string`

      - `adhoc: boolean`

        If the query wasn't explcitly saved

      - `created: string`

      - `createdBy: string`

      - `description: string`

      - `name: string`

        Query name

      - `parameters: object { calculations, datasets, filterCombination, 6 more }`

        - `calculations: optional array of object { operator, alias, key, keyType }`

          Create Calculations to compute as part of the query.

          - `operator: "uniq" or "count" or "max" or 35 more`

            - `"uniq"`

            - `"count"`

            - `"max"`

            - `"min"`

            - `"sum"`

            - `"avg"`

            - `"median"`

            - `"p001"`

            - `"p01"`

            - `"p05"`

            - `"p10"`

            - `"p25"`

            - `"p75"`

            - `"p90"`

            - `"p95"`

            - `"p99"`

            - `"p999"`

            - `"stddev"`

            - `"variance"`

            - `"COUNT_DISTINCT"`

            - `"COUNT"`

            - `"MAX"`

            - `"MIN"`

            - `"SUM"`

            - `"AVG"`

            - `"MEDIAN"`

            - `"P001"`

            - `"P01"`

            - `"P05"`

            - `"P10"`

            - `"P25"`

            - `"P75"`

            - `"P90"`

            - `"P95"`

            - `"P99"`

            - `"P999"`

            - `"STDDEV"`

            - `"VARIANCE"`

          - `alias: optional string`

          - `key: optional string`

          - `keyType: optional "string" or "number" or "boolean"`

            - `"string"`

            - `"number"`

            - `"boolean"`

        - `datasets: optional array of string`

          Set the Datasets to query. Leave it empty to query all the datasets.

        - `filterCombination: optional "and" or "or" or "AND" or "OR"`

          Set a Flag to describe how to combine the filters on the query.

          - `"and"`

          - `"or"`

          - `"AND"`

          - `"OR"`

        - `filters: optional array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

          Configure the Filters to apply to the query. Supports nested groups via kind: 'group'.

          - `object { filterCombination, filters, kind }`

            - `filterCombination: "and" or "or" or "AND" or "OR"`

              - `"and"`

              - `"or"`

              - `"AND"`

              - `"OR"`

            - `filters: array of unknown`

            - `kind: "group"`

              - `"group"`

          - `WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }`

            A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

            - `key: string`

              Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

            - `operation: "includes" or "not_includes" or "starts_with" or 27 more`

              Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

              - `"includes"`

              - `"not_includes"`

              - `"starts_with"`

              - `"ends_with"`

              - `"regex"`

              - `"exists"`

              - `"is_null"`

              - `"in"`

              - `"not_in"`

              - `"eq"`

              - `"neq"`

              - `"gt"`

              - `"gte"`

              - `"lt"`

              - `"lte"`

              - `"="`

              - `"!="`

              - `">"`

              - `">="`

              - `"<"`

              - `"<="`

              - `"INCLUDES"`

              - `"DOES_NOT_INCLUDE"`

              - `"MATCH_REGEX"`

              - `"EXISTS"`

              - `"DOES_NOT_EXIST"`

              - `"IN"`

              - `"NOT_IN"`

              - `"STARTS_WITH"`

              - `"ENDS_WITH"`

            - `type: "string" or "number" or "boolean"`

              Data type of the filter field. Must match the actual type of the key being filtered.

              - `"string"`

              - `"number"`

              - `"boolean"`

            - `kind: optional "filter"`

              Discriminator for leaf filter nodes. Always 'filter' when present; may be omitted.

              - `"filter"`

            - `value: optional string or number or boolean`

              Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

              - `string`

              - `number`

              - `boolean`

        - `groupBys: optional array of object { type, value }`

          Define how to group the results of the query.

          - `type: "string" or "number" or "boolean"`

            - `"string"`

            - `"number"`

            - `"boolean"`

          - `value: string`

        - `havings: optional array of object { key, operation, value }`

          Configure the Having clauses that filter on calculations in the query result.

          - `key: string`

          - `operation: "eq" or "neq" or "gt" or 3 more`

            - `"eq"`

            - `"neq"`

            - `"gt"`

            - `"gte"`

            - `"lt"`

            - `"lte"`

          - `value: number`

        - `limit: optional number`

          Set a limit on the number of results / records returned by the query

        - `needle: optional object { value, isRegex, matchCase }`

          Define an expression to search using full-text search.

          - `value:`

          - `isRegex: optional boolean`

          - `matchCase: optional boolean`

        - `orderBy: optional object { value, order }`

          Configure the order of the results returned by the query.

          - `value: string`

            Configure which Calculation to order the results by.

          - `order: optional "asc" or "desc"`

            Set the order of the results

            - `"asc"`

            - `"desc"`

      - `updated: string`

      - `updatedBy: string`

    - `status: "STARTED" or "COMPLETED"`

      Current execution status of the query run.

      - `"STARTED"`

      - `"COMPLETED"`

    - `timeframe: object { from, to }`

      Time range for the query execution

      - `from: number`

        Start timestamp for the query timeframe (Unix timestamp in milliseconds)

      - `to: number`

        End timestamp for the query timeframe (Unix timestamp in milliseconds)

    - `userId: string`

      ID of the user who initiated the query run.

    - `created: optional string`

      ISO-8601 timestamp when the query run was created.

    - `statistics: optional object { bytes_read, elapsed, rows_read, abr_level }`

      Query performance statistics from the database (does not include network latency).

      - `bytes_read: number`

        Number of uncompressed bytes read from the table.

      - `elapsed: number`

        Time in seconds for the query to run.

      - `rows_read: number`

        Number of rows scanned from the table.

      - `abr_level: optional number`

        The level of Adaptive Bit Rate (ABR) sampling used for the query. If empty the ABR level is 1

    - `updated: optional string`

      ISO-8601 timestamp when the query run was last updated.

  - `statistics: object { bytes_read, elapsed, rows_read, abr_level }`

    Query performance statistics from the database. Includes execution time, rows scanned, and bytes read. Does not include network latency.

    - `bytes_read: number`

      Number of uncompressed bytes read from the table.

    - `elapsed: number`

      Time in seconds for the query to run.

    - `rows_read: number`

      Number of rows scanned from the table.

    - `abr_level: optional number`

      The level of Adaptive Bit Rate (ABR) sampling used for the query. If empty the ABR level is 1

  - `agents: optional array of object { agentClass, eventTypeCounts, firstEventMs, 5 more }`

    Durable Object agent summaries. Present when the query view is 'agents'. Each entry represents an agent with its event counts and status.

    - `agentClass: string`

      Class name of the Durable Object agent.

    - `eventTypeCounts: map[number]`

      Breakdown of event counts by event type.

    - `firstEventMs: number`

      Timestamp of the earliest event from this agent in the queried window (Unix epoch ms).

    - `hasErrors: boolean`

      Whether the agent emitted any error events in the queried window.

    - `lastEventMs: number`

      Timestamp of the most recent event from this agent (Unix epoch ms).

    - `namespace: string`

      Durable Object namespace the agent belongs to.

    - `service: string`

      Worker service name that hosts this agent.

    - `totalEvents: number`

      Total number of events emitted by this agent in the queried window.

  - `calculations: optional array of object { aggregates, calculation, series, alias }`

    Aggregated calculation results. Present when the query view is 'calculations'. Contains computed metrics (count, avg, p99, etc.) with optional group-by breakdowns and time-series data.

    - `aggregates: array of object { count, interval, sampleInterval, 2 more }`

      - `count: number`

      - `interval: number`

      - `sampleInterval: number`

      - `value: number`

      - `groups: optional array of object { key, value }`

        - `key: string`

        - `value: string or number or boolean`

          - `string`

          - `number`

          - `boolean`

    - `calculation: string`

    - `series: array of object { data, time }`

      - `data: array of object { count, interval, sampleInterval, 4 more }`

        - `count: number`

        - `interval: number`

        - `sampleInterval: number`

        - `value: number`

        - `firstSeen: optional string`

        - `groups: optional array of object { key, value }`

          - `key: string`

          - `value: string or number or boolean`

            - `string`

            - `number`

            - `boolean`

        - `lastSeen: optional string`

      - `time: string`

    - `alias: optional string`

  - `compare: optional array of object { aggregates, calculation, series, alias }`

    Comparison calculation results from the previous time period. Present when the compare option is enabled. Same structure as calculations.

    - `aggregates: array of object { count, interval, sampleInterval, 2 more }`

      - `count: number`

      - `interval: number`

      - `sampleInterval: number`

      - `value: number`

      - `groups: optional array of object { key, value }`

        - `key: string`

        - `value: string or number or boolean`

          - `string`

          - `number`

          - `boolean`

    - `calculation: string`

    - `series: array of object { data, time }`

      - `data: array of object { count, interval, sampleInterval, 4 more }`

        - `count: number`

        - `interval: number`

        - `sampleInterval: number`

        - `value: number`

        - `firstSeen: optional string`

        - `groups: optional array of object { key, value }`

          - `key: string`

          - `value: string or number or boolean`

            - `string`

            - `number`

            - `boolean`

        - `lastSeen: optional string`

      - `time: string`

    - `alias: optional string`

  - `events: optional object { count, events, fields, series }`

    Individual event results. Present when the query view is 'events'. Contains the matching log lines and their metadata.

    - `count: optional number`

      Total number of events matching the query (may exceed the number returned due to limits).

    - `events: optional array of object { "$metadata", dataset, source, 3 more }`

      List of individual telemetry events matching the query.

      - `"$metadata": object { id, account, cloudService, 28 more }`

        Structured metadata extracted from the event. These fields are indexed and available for filtering and aggregation.

        - `id: string`

          Unique event ID. Use as the cursor value for offset-based pagination.

        - `account: optional string`

          Cloudflare account identifier.

        - `cloudService: optional string`

          Cloudflare product that generated this event (e.g. workers, pages).

        - `coldStart: optional number`

        - `cost: optional number`

          Estimated cost units for this invocation.

        - `duration: optional number`

          Span duration in milliseconds.

        - `endTime: optional number`

          Span end time as a Unix epoch in milliseconds.

        - `error: optional string`

          Error message, present when the log represents an error.

        - `errorTemplate: optional string`

          Templatized version of the error message used for grouping similar errors.

        - `fingerprint: optional string`

          Content-based fingerprint used to group similar events.

        - `level: optional string`

          Log level (e.g. log, debug, info, warn, error).

        - `message: optional string`

          Log message text.

        - `messageTemplate: optional string`

          Templatized version of the log message used for grouping similar messages.

        - `metricName: optional string`

          Metric name when the event represents a metric data point.

        - `origin: optional string`

          Origin of the event (e.g. fetch, scheduled, queue).

        - `parentSpanId: optional string`

          Span ID of the parent span in the trace hierarchy.

        - `provider: optional string`

          Infrastructure provider identifier.

        - `region: optional string`

          Cloudflare data center / region that handled the request.

        - `requestId: optional string`

          Cloudflare request ID that ties all logs from a single invocation together.

        - `service: optional string`

          Worker script name that produced this event.

        - `spanId: optional string`

          Span ID for this individual unit of work within a trace.

        - `spanName: optional string`

          Human-readable name for this span.

        - `stackId: optional string`

          Stack / deployment identifier.

        - `startTime: optional number`

          Span start time as a Unix epoch in milliseconds.

        - `statusCode: optional number`

          HTTP response status code returned by the Worker.

        - `traceDuration: optional number`

          Total duration of the entire trace in milliseconds.

        - `traceId: optional string`

          Distributed trace ID linking spans across services.

        - `transactionName: optional string`

          Logical transaction name for this request.

        - `trigger: optional string`

          What triggered the invocation (e.g. GET /users, POST /orders, queue message).

        - `type: optional string`

          Event type classifier (e.g. cf-worker-event, cf-worker-log).

        - `url: optional string`

          Request URL that triggered the Worker invocation.

      - `dataset: string`

        The dataset this event belongs to (e.g. cloudflare-workers).

      - `source: string or map[unknown]`

        Raw log payload. May be a string or a structured object depending on how the log was emitted.

        - `string`

        - `map[unknown]`

      - `timestamp: number`

        Event timestamp as a Unix epoch in milliseconds.

      - `"$containers": optional map[unknown]`

        Cloudflare Containers event information that enriches your logs for identifying and debugging issues.

      - `"$workers": optional object { eventType, requestId, scriptName, 10 more }  or object { cpuTimeMs, eventType, outcome, 14 more }`

        Cloudflare Workers event information that enriches your logs for identifying and debugging issues.

        - `object { eventType, requestId, scriptName, 10 more }`

          - `eventType: "fetch" or "scheduled" or "alarm" or 9 more`

            - `"fetch"`

            - `"scheduled"`

            - `"alarm"`

            - `"cron"`

            - `"queue"`

            - `"email"`

            - `"tail"`

            - `"rpc"`

            - `"jsrpc"`

            - `"websocket"`

            - `"workflow"`

            - `"unknown"`

          - `requestId: string`

          - `scriptName: string`

          - `durableObjectId: optional string`

          - `entrypoint: optional string`

          - `event: optional map[unknown]`

          - `executionModel: optional "durableObject" or "stateless"`

            - `"durableObject"`

            - `"stateless"`

          - `outcome: optional string`

          - `preview: optional object { id, name, slug }`

            - `id: optional string`

            - `name: optional string`

            - `slug: optional string`

          - `scriptVersion: optional object { id, message, tag }`

            - `id: optional string`

            - `message: optional string`

            - `tag: optional string`

          - `spanId: optional string`

          - `traceId: optional string`

          - `truncated: optional boolean`

        - `object { cpuTimeMs, eventType, outcome, 14 more }`

          - `cpuTimeMs: number`

          - `eventType: "fetch" or "scheduled" or "alarm" or 9 more`

            - `"fetch"`

            - `"scheduled"`

            - `"alarm"`

            - `"cron"`

            - `"queue"`

            - `"email"`

            - `"tail"`

            - `"rpc"`

            - `"jsrpc"`

            - `"websocket"`

            - `"workflow"`

            - `"unknown"`

          - `outcome: string`

          - `requestId: string`

          - `scriptName: string`

          - `wallTimeMs: number`

          - `diagnosticsChannelEvents: optional array of object { channel, message, timestamp }`

            - `channel: string`

            - `message: string`

            - `timestamp: number`

          - `dispatchNamespace: optional string`

          - `durableObjectId: optional string`

          - `entrypoint: optional string`

          - `event: optional map[unknown]`

          - `executionModel: optional "durableObject" or "stateless"`

            - `"durableObject"`

            - `"stateless"`

          - `preview: optional object { id, name, slug }`

            - `id: optional string`

            - `name: optional string`

            - `slug: optional string`

          - `scriptVersion: optional object { id, message, tag }`

            - `id: optional string`

            - `message: optional string`

            - `tag: optional string`

          - `spanId: optional string`

          - `traceId: optional string`

          - `truncated: optional boolean`

    - `fields: optional array of object { key, type }`

      List of fields discovered in the matched events. Useful for building dynamic UIs.

      - `key: string`

        Field name present in the matched events.

      - `type: string`

        Data type of the field (string, number, or boolean).

    - `series: optional array of object { data, time }`

      Time-series data for the matched events, bucketed by the query granularity.

      - `data: array of object { aggregates, count, interval, 3 more }`

        - `aggregates: object { _count, _interval, _firstSeen, 2 more }`

          - `_count: number`

          - `_interval: number`

          - `_firstSeen: optional string`

          - `_lastSeen: optional string`

          - `bin: optional unknown`

        - `count: number`

        - `interval: number`

        - `sampleInterval: number`

        - `errors: optional number`

        - `groups: optional map[string or number or boolean]`

          Groups in the query results.

          - `string`

          - `number`

          - `boolean`

      - `time: string`

  - `invocations: optional map[array of object { "$metadata", dataset, source, 3 more } ]`

    Events grouped by invocation (request ID). Present when the query view is 'invocations'. Each key is a request ID mapping to all events from that invocation.

    - `"$metadata": object { id, account, cloudService, 28 more }`

      Structured metadata extracted from the event. These fields are indexed and available for filtering and aggregation.

      - `id: string`

        Unique event ID. Use as the cursor value for offset-based pagination.

      - `account: optional string`

        Cloudflare account identifier.

      - `cloudService: optional string`

        Cloudflare product that generated this event (e.g. workers, pages).

      - `coldStart: optional number`

      - `cost: optional number`

        Estimated cost units for this invocation.

      - `duration: optional number`

        Span duration in milliseconds.

      - `endTime: optional number`

        Span end time as a Unix epoch in milliseconds.

      - `error: optional string`

        Error message, present when the log represents an error.

      - `errorTemplate: optional string`

        Templatized version of the error message used for grouping similar errors.

      - `fingerprint: optional string`

        Content-based fingerprint used to group similar events.

      - `level: optional string`

        Log level (e.g. log, debug, info, warn, error).

      - `message: optional string`

        Log message text.

      - `messageTemplate: optional string`

        Templatized version of the log message used for grouping similar messages.

      - `metricName: optional string`

        Metric name when the event represents a metric data point.

      - `origin: optional string`

        Origin of the event (e.g. fetch, scheduled, queue).

      - `parentSpanId: optional string`

        Span ID of the parent span in the trace hierarchy.

      - `provider: optional string`

        Infrastructure provider identifier.

      - `region: optional string`

        Cloudflare data center / region that handled the request.

      - `requestId: optional string`

        Cloudflare request ID that ties all logs from a single invocation together.

      - `service: optional string`

        Worker script name that produced this event.

      - `spanId: optional string`

        Span ID for this individual unit of work within a trace.

      - `spanName: optional string`

        Human-readable name for this span.

      - `stackId: optional string`

        Stack / deployment identifier.

      - `startTime: optional number`

        Span start time as a Unix epoch in milliseconds.

      - `statusCode: optional number`

        HTTP response status code returned by the Worker.

      - `traceDuration: optional number`

        Total duration of the entire trace in milliseconds.

      - `traceId: optional string`

        Distributed trace ID linking spans across services.

      - `transactionName: optional string`

        Logical transaction name for this request.

      - `trigger: optional string`

        What triggered the invocation (e.g. GET /users, POST /orders, queue message).

      - `type: optional string`

        Event type classifier (e.g. cf-worker-event, cf-worker-log).

      - `url: optional string`

        Request URL that triggered the Worker invocation.

    - `dataset: string`

      The dataset this event belongs to (e.g. cloudflare-workers).

    - `source: string or map[unknown]`

      Raw log payload. May be a string or a structured object depending on how the log was emitted.

      - `string`

      - `map[unknown]`

    - `timestamp: number`

      Event timestamp as a Unix epoch in milliseconds.

    - `"$containers": optional map[unknown]`

      Cloudflare Containers event information that enriches your logs for identifying and debugging issues.

    - `"$workers": optional object { eventType, requestId, scriptName, 10 more }  or object { cpuTimeMs, eventType, outcome, 14 more }`

      Cloudflare Workers event information that enriches your logs for identifying and debugging issues.

      - `object { eventType, requestId, scriptName, 10 more }`

        - `eventType: "fetch" or "scheduled" or "alarm" or 9 more`

          - `"fetch"`

          - `"scheduled"`

          - `"alarm"`

          - `"cron"`

          - `"queue"`

          - `"email"`

          - `"tail"`

          - `"rpc"`

          - `"jsrpc"`

          - `"websocket"`

          - `"workflow"`

          - `"unknown"`

        - `requestId: string`

        - `scriptName: string`

        - `durableObjectId: optional string`

        - `entrypoint: optional string`

        - `event: optional map[unknown]`

        - `executionModel: optional "durableObject" or "stateless"`

          - `"durableObject"`

          - `"stateless"`

        - `outcome: optional string`

        - `preview: optional object { id, name, slug }`

          - `id: optional string`

          - `name: optional string`

          - `slug: optional string`

        - `scriptVersion: optional object { id, message, tag }`

          - `id: optional string`

          - `message: optional string`

          - `tag: optional string`

        - `spanId: optional string`

        - `traceId: optional string`

        - `truncated: optional boolean`

      - `object { cpuTimeMs, eventType, outcome, 14 more }`

        - `cpuTimeMs: number`

        - `eventType: "fetch" or "scheduled" or "alarm" or 9 more`

          - `"fetch"`

          - `"scheduled"`

          - `"alarm"`

          - `"cron"`

          - `"queue"`

          - `"email"`

          - `"tail"`

          - `"rpc"`

          - `"jsrpc"`

          - `"websocket"`

          - `"workflow"`

          - `"unknown"`

        - `outcome: string`

        - `requestId: string`

        - `scriptName: string`

        - `wallTimeMs: number`

        - `diagnosticsChannelEvents: optional array of object { channel, message, timestamp }`

          - `channel: string`

          - `message: string`

          - `timestamp: number`

        - `dispatchNamespace: optional string`

        - `durableObjectId: optional string`

        - `entrypoint: optional string`

        - `event: optional map[unknown]`

        - `executionModel: optional "durableObject" or "stateless"`

          - `"durableObject"`

          - `"stateless"`

        - `preview: optional object { id, name, slug }`

          - `id: optional string`

          - `name: optional string`

          - `slug: optional string`

        - `scriptVersion: optional object { id, message, tag }`

          - `id: optional string`

          - `message: optional string`

          - `tag: optional string`

        - `spanId: optional string`

        - `traceId: optional string`

        - `truncated: optional boolean`

  - `traces: optional array of object { rootSpanName, rootTransactionName, service, 6 more }`

    Trace summaries matching the query. Present when the query view is 'traces'. Each entry represents a distributed trace with its spans, duration, and services involved.

    - `rootSpanName: string`

      Name of the root span that initiated the trace.

    - `rootTransactionName: string`

      Logical transaction name for the root span.

    - `service: array of string`

      List of Worker services involved in the trace.

    - `spans: number`

      Total number of spans in the trace.

    - `traceDurationMs: number`

      Total duration of the trace in milliseconds.

    - `traceEndMs: number`

      Trace end time as a Unix epoch in milliseconds.

    - `traceId: string`

      Unique identifier for the distributed trace.

    - `traceStartMs: number`

      Trace start time as a Unix epoch in milliseconds.

    - `errors: optional array of string`

      Error messages encountered during the trace, if any.

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/telemetry/query \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "queryId": "queryId",
          "timeframe": {
            "from": 0,
            "to": 0
          }
        }'
```

#### Response

```json
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "Successful request"
    }
  ],
  "result": {
    "run": {
      "id": "id",
      "accountId": "accountId",
      "dry": true,
      "granularity": 0,
      "query": {
        "id": "id",
        "adhoc": true,
        "created": "created",
        "createdBy": "createdBy",
        "description": "Query description",
        "name": "x",
        "parameters": {
          "calculations": [
            {
              "operator": "uniq",
              "alias": "alias",
              "key": "key",
              "keyType": "string"
            }
          ],
          "datasets": [
            "string"
          ],
          "filterCombination": "and",
          "filters": [
            {
              "filterCombination": "and",
              "filters": [
                {}
              ],
              "kind": "group"
            }
          ],
          "groupBys": [
            {
              "type": "string",
              "value": "value"
            }
          ],
          "havings": [
            {
              "key": "key",
              "operation": "eq",
              "value": 0
            }
          ],
          "limit": 0,
          "needle": {
            "value": {
              "0": "s",
              "1": "t",
              "2": "r",
              "3": "i",
              "4": "n",
              "5": "g"
            },
            "isRegex": true,
            "matchCase": true
          },
          "orderBy": {
            "value": "value",
            "order": "asc"
          }
        },
        "updated": "updated",
        "updatedBy": "updatedBy"
      },
      "status": "STARTED",
      "timeframe": {
        "from": 0,
        "to": 0
      },
      "userId": "userId",
      "created": "created",
      "statistics": {
        "bytes_read": 0,
        "elapsed": 0,
        "rows_read": 0,
        "abr_level": 0
      },
      "updated": "updated"
    },
    "statistics": {
      "bytes_read": 0,
      "elapsed": 0,
      "rows_read": 0,
      "abr_level": 0
    },
    "agents": [
      {
        "agentClass": "agentClass",
        "eventTypeCounts": {
          "foo": 0
        },
        "firstEventMs": 0,
        "hasErrors": true,
        "lastEventMs": 0,
        "namespace": "namespace",
        "service": "service",
        "totalEvents": 0
      }
    ],
    "calculations": [
      {
        "aggregates": [
          {
            "count": 0,
            "interval": 0,
            "sampleInterval": 0,
            "value": 0,
            "groups": [
              {
                "key": "key",
                "value": "string"
              }
            ]
          }
        ],
        "calculation": "calculation",
        "series": [
          {
            "data": [
              {
                "count": 0,
                "interval": 0,
                "sampleInterval": 0,
                "value": 0,
                "firstSeen": "firstSeen",
                "groups": [
                  {
                    "key": "key",
                    "value": "string"
                  }
                ],
                "lastSeen": "lastSeen"
              }
            ],
            "time": "time"
          }
        ],
        "alias": "alias"
      }
    ],
    "compare": [
      {
        "aggregates": [
          {
            "count": 0,
            "interval": 0,
            "sampleInterval": 0,
            "value": 0,
            "groups": [
              {
                "key": "key",
                "value": "string"
              }
            ]
          }
        ],
        "calculation": "calculation",
        "series": [
          {
            "data": [
              {
                "count": 0,
                "interval": 0,
                "sampleInterval": 0,
                "value": 0,
                "firstSeen": "firstSeen",
                "groups": [
                  {
                    "key": "key",
                    "value": "string"
                  }
                ],
                "lastSeen": "lastSeen"
              }
            ],
            "time": "time"
          }
        ],
        "alias": "alias"
      }
    ],
    "events": {
      "count": 0,
      "events": [
        {
          "$metadata": {
            "id": "id",
            "account": "account",
            "cloudService": "cloudService",
            "coldStart": 1,
            "cost": 1,
            "duration": 1,
            "endTime": 0,
            "error": "error",
            "errorTemplate": "errorTemplate",
            "fingerprint": "fingerprint",
            "level": "level",
            "message": "message",
            "messageTemplate": "messageTemplate",
            "metricName": "metricName",
            "origin": "origin",
            "parentSpanId": "parentSpanId",
            "provider": "provider",
            "region": "region",
            "requestId": "requestId",
            "service": "service",
            "spanId": "spanId",
            "spanName": "spanName",
            "stackId": "stackId",
            "startTime": 0,
            "statusCode": 1,
            "traceDuration": 1,
            "traceId": "traceId",
            "transactionName": "transactionName",
            "trigger": "trigger",
            "type": "type",
            "url": "url"
          },
          "dataset": "dataset",
          "source": "string",
          "timestamp": 0,
          "$containers": {
            "foo": "bar"
          },
          "$workers": {
            "eventType": "fetch",
            "requestId": "requestId",
            "scriptName": "scriptName",
            "durableObjectId": "durableObjectId",
            "entrypoint": "entrypoint",
            "event": {
              "foo": "bar"
            },
            "executionModel": "durableObject",
            "outcome": "outcome",
            "preview": {
              "id": "id",
              "name": "name",
              "slug": "slug"
            },
            "scriptVersion": {
              "id": "id",
              "message": "message",
              "tag": "tag"
            },
            "spanId": "spanId",
            "traceId": "traceId",
            "truncated": true
          }
        }
      ],
      "fields": [
        {
          "key": "key",
          "type": "type"
        }
      ],
      "series": [
        {
          "data": [
            {
              "aggregates": {
                "_count": 1,
                "_interval": 1,
                "_firstSeen": "_firstSeen",
                "_lastSeen": "_lastSeen",
                "bin": {}
              },
              "count": 0,
              "interval": 0,
              "sampleInterval": 0,
              "errors": 0,
              "groups": {
                "foo": "string"
              }
            }
          ],
          "time": "time"
        }
      ]
    },
    "invocations": {
      "foo": [
        {
          "$metadata": {
            "id": "id",
            "account": "account",
            "cloudService": "cloudService",
            "coldStart": 1,
            "cost": 1,
            "duration": 1,
            "endTime": 0,
            "error": "error",
            "errorTemplate": "errorTemplate",
            "fingerprint": "fingerprint",
            "level": "level",
            "message": "message",
            "messageTemplate": "messageTemplate",
            "metricName": "metricName",
            "origin": "origin",
            "parentSpanId": "parentSpanId",
            "provider": "provider",
            "region": "region",
            "requestId": "requestId",
            "service": "service",
            "spanId": "spanId",
            "spanName": "spanName",
            "stackId": "stackId",
            "startTime": 0,
            "statusCode": 1,
            "traceDuration": 1,
            "traceId": "traceId",
            "transactionName": "transactionName",
            "trigger": "trigger",
            "type": "type",
            "url": "url"
          },
          "dataset": "dataset",
          "source": "string",
          "timestamp": 0,
          "$containers": {
            "foo": "bar"
          },
          "$workers": {
            "eventType": "fetch",
            "requestId": "requestId",
            "scriptName": "scriptName",
            "durableObjectId": "durableObjectId",
            "entrypoint": "entrypoint",
            "event": {
              "foo": "bar"
            },
            "executionModel": "durableObject",
            "outcome": "outcome",
            "preview": {
              "id": "id",
              "name": "name",
              "slug": "slug"
            },
            "scriptVersion": {
              "id": "id",
              "message": "message",
              "tag": "tag"
            },
            "spanId": "spanId",
            "traceId": "traceId",
            "truncated": true
          }
        }
      ]
    },
    "traces": [
      {
        "rootSpanName": "rootSpanName",
        "rootTransactionName": "rootTransactionName",
        "service": [
          "string"
        ],
        "spans": 0,
        "traceDurationMs": 0,
        "traceEndMs": 0,
        "traceId": "traceId",
        "traceStartMs": 0,
        "errors": [
          "string"
        ]
      }
    ]
  },
  "success": true
}
```

## List values

**post** `/accounts/{account_id}/workers/observability/telemetry/values`

List unique values found in your events.

### Path Parameters

- `account_id: string`

### Body Parameters

- `datasets: array of string`

  Leave this empty to use the default datasets

- `key: string`

- `timeframe: object { from, to }`

  - `from: number`

  - `to: number`

- `type: "string" or "boolean" or "number"`

  - `"string"`

  - `"boolean"`

  - `"number"`

- `filters: optional array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

  Apply filters before listing values. Supports nested groups via kind: 'group'. Maximum nesting depth is 4.

  - `object { filterCombination, filters, kind }`

    - `filterCombination: "and" or "or" or "AND" or "OR"`

      - `"and"`

      - `"or"`

      - `"AND"`

      - `"OR"`

    - `filters: array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

      - `object { filterCombination, filters, kind }`

        - `filterCombination: "and" or "or" or "AND" or "OR"`

          - `"and"`

          - `"or"`

          - `"AND"`

          - `"OR"`

        - `filters: array of unknown`

        - `kind: "group"`

          - `"group"`

      - `WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }`

        A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

        - `key: string`

          Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

        - `operation: "includes" or "not_includes" or "starts_with" or 27 more`

          Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

          - `"includes"`

          - `"not_includes"`

          - `"starts_with"`

          - `"ends_with"`

          - `"regex"`

          - `"exists"`

          - `"is_null"`

          - `"in"`

          - `"not_in"`

          - `"eq"`

          - `"neq"`

          - `"gt"`

          - `"gte"`

          - `"lt"`

          - `"lte"`

          - `"="`

          - `"!="`

          - `">"`

          - `">="`

          - `"<"`

          - `"<="`

          - `"INCLUDES"`

          - `"DOES_NOT_INCLUDE"`

          - `"MATCH_REGEX"`

          - `"EXISTS"`

          - `"DOES_NOT_EXIST"`

          - `"IN"`

          - `"NOT_IN"`

          - `"STARTS_WITH"`

          - `"ENDS_WITH"`

        - `type: "string" or "number" or "boolean"`

          Data type of the filter field. Must match the actual type of the key being filtered.

          - `"string"`

          - `"number"`

          - `"boolean"`

        - `kind: optional "filter"`

          Discriminator for leaf filter nodes. Always 'filter' when present; may be omitted.

          - `"filter"`

        - `value: optional string or number or boolean`

          Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

          - `string`

          - `number`

          - `boolean`

    - `kind: "group"`

      - `"group"`

  - `WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }`

    A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

    - `key: string`

      Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

    - `operation: "includes" or "not_includes" or "starts_with" or 27 more`

      Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

      - `"includes"`

      - `"not_includes"`

      - `"starts_with"`

      - `"ends_with"`

      - `"regex"`

      - `"exists"`

      - `"is_null"`

      - `"in"`

      - `"not_in"`

      - `"eq"`

      - `"neq"`

      - `"gt"`

      - `"gte"`

      - `"lt"`

      - `"lte"`

      - `"="`

      - `"!="`

      - `">"`

      - `">="`

      - `"<"`

      - `"<="`

      - `"INCLUDES"`

      - `"DOES_NOT_INCLUDE"`

      - `"MATCH_REGEX"`

      - `"EXISTS"`

      - `"DOES_NOT_EXIST"`

      - `"IN"`

      - `"NOT_IN"`

      - `"STARTS_WITH"`

      - `"ENDS_WITH"`

    - `type: "string" or "number" or "boolean"`

      Data type of the filter field. Must match the actual type of the key being filtered.

      - `"string"`

      - `"number"`

      - `"boolean"`

    - `kind: optional "filter"`

      Discriminator for leaf filter nodes. Always 'filter' when present; may be omitted.

      - `"filter"`

    - `value: optional string or number or boolean`

      Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

      - `string`

      - `number`

      - `boolean`

- `limit: optional number`

- `needle: optional object { value, isRegex, matchCase }`

  Full-text search expression to match events containing the specified text or pattern.

  - `value: string or number or boolean`

    The text or pattern to search for.

    - `string`

    - `number`

    - `boolean`

  - `isRegex: optional boolean`

    When true, treats the value as a regular expression (RE2 syntax).

  - `matchCase: optional boolean`

    When true, performs a case-sensitive search. Defaults to case-insensitive.

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: "Successful request"`

    - `"Successful request"`

- `result: array of object { dataset, key, type, value }`

  - `dataset: string`

  - `key: string`

  - `type: "string" or "boolean" or "number"`

    - `"string"`

    - `"boolean"`

    - `"number"`

  - `value: string or number or boolean`

    - `string`

    - `number`

    - `boolean`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/telemetry/values \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "datasets": [
            "string"
          ],
          "key": "key",
          "timeframe": {
            "from": 0,
            "to": 0
          },
          "type": "string"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "Successful request"
    }
  ],
  "result": [
    {
      "dataset": "dataset",
      "key": "key",
      "type": "string",
      "value": "string"
    }
  ],
  "success": true
}
```

## Prepare live tail

**post** `/accounts/{account_id}/workers/observability/telemetry/live-tail`

Prepare websocket server for live tail.

### Path Parameters

- `account_id: string`

### Body Parameters

- `filterCombination: optional "and" or "or" or "AND" or "OR"`

  Set a flag to describe how to combine the filters on the query.

  - `"and"`

  - `"or"`

  - `"AND"`

  - `"OR"`

- `filters: optional array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

  Apply filters to the query. Supports nested groups via kind: 'group'.

  - `object { filterCombination, filters, kind }`

    - `filterCombination: "and" or "or" or "AND" or "OR"`

      - `"and"`

      - `"or"`

      - `"AND"`

      - `"OR"`

    - `filters: array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

      - `object { filterCombination, filters, kind }`

        - `filterCombination: "and" or "or" or "AND" or "OR"`

          - `"and"`

          - `"or"`

          - `"AND"`

          - `"OR"`

        - `filters: array of unknown`

        - `kind: "group"`

          - `"group"`

      - `WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }`

        A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

        - `key: string`

          Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

        - `operation: "includes" or "not_includes" or "starts_with" or 27 more`

          Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

          - `"includes"`

          - `"not_includes"`

          - `"starts_with"`

          - `"ends_with"`

          - `"regex"`

          - `"exists"`

          - `"is_null"`

          - `"in"`

          - `"not_in"`

          - `"eq"`

          - `"neq"`

          - `"gt"`

          - `"gte"`

          - `"lt"`

          - `"lte"`

          - `"="`

          - `"!="`

          - `">"`

          - `">="`

          - `"<"`

          - `"<="`

          - `"INCLUDES"`

          - `"DOES_NOT_INCLUDE"`

          - `"MATCH_REGEX"`

          - `"EXISTS"`

          - `"DOES_NOT_EXIST"`

          - `"IN"`

          - `"NOT_IN"`

          - `"STARTS_WITH"`

          - `"ENDS_WITH"`

        - `type: "string" or "number" or "boolean"`

          Data type of the filter field. Must match the actual type of the key being filtered.

          - `"string"`

          - `"number"`

          - `"boolean"`

        - `kind: optional "filter"`

          Discriminator for leaf filter nodes. Always 'filter' when present; may be omitted.

          - `"filter"`

        - `value: optional string or number or boolean`

          Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

          - `string`

          - `number`

          - `boolean`

    - `kind: "group"`

      - `"group"`

  - `WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }`

    A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

    - `key: string`

      Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

    - `operation: "includes" or "not_includes" or "starts_with" or 27 more`

      Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

      - `"includes"`

      - `"not_includes"`

      - `"starts_with"`

      - `"ends_with"`

      - `"regex"`

      - `"exists"`

      - `"is_null"`

      - `"in"`

      - `"not_in"`

      - `"eq"`

      - `"neq"`

      - `"gt"`

      - `"gte"`

      - `"lt"`

      - `"lte"`

      - `"="`

      - `"!="`

      - `">"`

      - `">="`

      - `"<"`

      - `"<="`

      - `"INCLUDES"`

      - `"DOES_NOT_INCLUDE"`

      - `"MATCH_REGEX"`

      - `"EXISTS"`

      - `"DOES_NOT_EXIST"`

      - `"IN"`

      - `"NOT_IN"`

      - `"STARTS_WITH"`

      - `"ENDS_WITH"`

    - `type: "string" or "number" or "boolean"`

      Data type of the filter field. Must match the actual type of the key being filtered.

      - `"string"`

      - `"number"`

      - `"boolean"`

    - `kind: optional "filter"`

      Discriminator for leaf filter nodes. Always 'filter' when present; may be omitted.

      - `"filter"`

    - `value: optional string or number or boolean`

      Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

      - `string`

      - `number`

      - `boolean`

- `scriptId: optional string`

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: "Successful request"`

    - `"Successful request"`

- `result: object { wsUrl }`

  - `wsUrl: string`

    WebSocket URL clients connect to in order to stream live tail events.

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/telemetry/live-tail \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{}'
```

#### Response

```json
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "Successful request"
    }
  ],
  "result": {
    "wsUrl": "https://example.com"
  },
  "success": true
}
```

## Live tail heartbeat

**post** `/accounts/{account_id}/workers/observability/telemetry/live-tail/heartbeat`

Notify live tail that user is still eligible to receive live events.

### Path Parameters

- `account_id: string`

### Body Parameters

- `scriptId: optional string`

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: "Successful request"`

    - `"Successful request"`

- `result: unknown`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/telemetry/live-tail/heartbeat \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{}'
```

#### Response

```json
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "Successful request"
    }
  ],
  "result": {},
  "success": true
}
```

## Domain Types

### Telemetry Keys Response

- `TelemetryKeysResponse object { key, lastSeenAt, type }`

  - `key: string`

  - `lastSeenAt: number`

  - `type: "string" or "boolean" or "number"`

    - `"string"`

    - `"boolean"`

    - `"number"`

### Telemetry Query Response

- `TelemetryQueryResponse object { run, statistics, agents, 5 more }`

  Complete results of a query run. The populated fields depend on the requested view type (events, calculations, invocations, traces, or agents).

  - `run: object { id, accountId, dry, 8 more }`

    Represents a single execution of a query against Workers Observability data, including the query definition, execution status, and performance statistics.

    - `id: string`

      Unique identifier for this query run.

    - `accountId: string`

      Cloudflare account ID that owns this query run.

    - `dry: boolean`

      Whether this was a dry run (results not persisted).

    - `granularity: number`

      Number of time-series buckets used for the query. Higher values produce more detailed series data.

    - `query: object { id, adhoc, created, 6 more }`

      A saved query definition with its parameters, metadata, and ownership information.

      - `id: string`

      - `adhoc: boolean`

        If the query wasn't explcitly saved

      - `created: string`

      - `createdBy: string`

      - `description: string`

      - `name: string`

        Query name

      - `parameters: object { calculations, datasets, filterCombination, 6 more }`

        - `calculations: optional array of object { operator, alias, key, keyType }`

          Create Calculations to compute as part of the query.

          - `operator: "uniq" or "count" or "max" or 35 more`

            - `"uniq"`

            - `"count"`

            - `"max"`

            - `"min"`

            - `"sum"`

            - `"avg"`

            - `"median"`

            - `"p001"`

            - `"p01"`

            - `"p05"`

            - `"p10"`

            - `"p25"`

            - `"p75"`

            - `"p90"`

            - `"p95"`

            - `"p99"`

            - `"p999"`

            - `"stddev"`

            - `"variance"`

            - `"COUNT_DISTINCT"`

            - `"COUNT"`

            - `"MAX"`

            - `"MIN"`

            - `"SUM"`

            - `"AVG"`

            - `"MEDIAN"`

            - `"P001"`

            - `"P01"`

            - `"P05"`

            - `"P10"`

            - `"P25"`

            - `"P75"`

            - `"P90"`

            - `"P95"`

            - `"P99"`

            - `"P999"`

            - `"STDDEV"`

            - `"VARIANCE"`

          - `alias: optional string`

          - `key: optional string`

          - `keyType: optional "string" or "number" or "boolean"`

            - `"string"`

            - `"number"`

            - `"boolean"`

        - `datasets: optional array of string`

          Set the Datasets to query. Leave it empty to query all the datasets.

        - `filterCombination: optional "and" or "or" or "AND" or "OR"`

          Set a Flag to describe how to combine the filters on the query.

          - `"and"`

          - `"or"`

          - `"AND"`

          - `"OR"`

        - `filters: optional array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

          Configure the Filters to apply to the query. Supports nested groups via kind: 'group'.

          - `object { filterCombination, filters, kind }`

            - `filterCombination: "and" or "or" or "AND" or "OR"`

              - `"and"`

              - `"or"`

              - `"AND"`

              - `"OR"`

            - `filters: array of unknown`

            - `kind: "group"`

              - `"group"`

          - `WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }`

            A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

            - `key: string`

              Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

            - `operation: "includes" or "not_includes" or "starts_with" or 27 more`

              Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

              - `"includes"`

              - `"not_includes"`

              - `"starts_with"`

              - `"ends_with"`

              - `"regex"`

              - `"exists"`

              - `"is_null"`

              - `"in"`

              - `"not_in"`

              - `"eq"`

              - `"neq"`

              - `"gt"`

              - `"gte"`

              - `"lt"`

              - `"lte"`

              - `"="`

              - `"!="`

              - `">"`

              - `">="`

              - `"<"`

              - `"<="`

              - `"INCLUDES"`

              - `"DOES_NOT_INCLUDE"`

              - `"MATCH_REGEX"`

              - `"EXISTS"`

              - `"DOES_NOT_EXIST"`

              - `"IN"`

              - `"NOT_IN"`

              - `"STARTS_WITH"`

              - `"ENDS_WITH"`

            - `type: "string" or "number" or "boolean"`

              Data type of the filter field. Must match the actual type of the key being filtered.

              - `"string"`

              - `"number"`

              - `"boolean"`

            - `kind: optional "filter"`

              Discriminator for leaf filter nodes. Always 'filter' when present; may be omitted.

              - `"filter"`

            - `value: optional string or number or boolean`

              Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

              - `string`

              - `number`

              - `boolean`

        - `groupBys: optional array of object { type, value }`

          Define how to group the results of the query.

          - `type: "string" or "number" or "boolean"`

            - `"string"`

            - `"number"`

            - `"boolean"`

          - `value: string`

        - `havings: optional array of object { key, operation, value }`

          Configure the Having clauses that filter on calculations in the query result.

          - `key: string`

          - `operation: "eq" or "neq" or "gt" or 3 more`

            - `"eq"`

            - `"neq"`

            - `"gt"`

            - `"gte"`

            - `"lt"`

            - `"lte"`

          - `value: number`

        - `limit: optional number`

          Set a limit on the number of results / records returned by the query

        - `needle: optional object { value, isRegex, matchCase }`

          Define an expression to search using full-text search.

          - `value:`

          - `isRegex: optional boolean`

          - `matchCase: optional boolean`

        - `orderBy: optional object { value, order }`

          Configure the order of the results returned by the query.

          - `value: string`

            Configure which Calculation to order the results by.

          - `order: optional "asc" or "desc"`

            Set the order of the results

            - `"asc"`

            - `"desc"`

      - `updated: string`

      - `updatedBy: string`

    - `status: "STARTED" or "COMPLETED"`

      Current execution status of the query run.

      - `"STARTED"`

      - `"COMPLETED"`

    - `timeframe: object { from, to }`

      Time range for the query execution

      - `from: number`

        Start timestamp for the query timeframe (Unix timestamp in milliseconds)

      - `to: number`

        End timestamp for the query timeframe (Unix timestamp in milliseconds)

    - `userId: string`

      ID of the user who initiated the query run.

    - `created: optional string`

      ISO-8601 timestamp when the query run was created.

    - `statistics: optional object { bytes_read, elapsed, rows_read, abr_level }`

      Query performance statistics from the database (does not include network latency).

      - `bytes_read: number`

        Number of uncompressed bytes read from the table.

      - `elapsed: number`

        Time in seconds for the query to run.

      - `rows_read: number`

        Number of rows scanned from the table.

      - `abr_level: optional number`

        The level of Adaptive Bit Rate (ABR) sampling used for the query. If empty the ABR level is 1

    - `updated: optional string`

      ISO-8601 timestamp when the query run was last updated.

  - `statistics: object { bytes_read, elapsed, rows_read, abr_level }`

    Query performance statistics from the database. Includes execution time, rows scanned, and bytes read. Does not include network latency.

    - `bytes_read: number`

      Number of uncompressed bytes read from the table.

    - `elapsed: number`

      Time in seconds for the query to run.

    - `rows_read: number`

      Number of rows scanned from the table.

    - `abr_level: optional number`

      The level of Adaptive Bit Rate (ABR) sampling used for the query. If empty the ABR level is 1

  - `agents: optional array of object { agentClass, eventTypeCounts, firstEventMs, 5 more }`

    Durable Object agent summaries. Present when the query view is 'agents'. Each entry represents an agent with its event counts and status.

    - `agentClass: string`

      Class name of the Durable Object agent.

    - `eventTypeCounts: map[number]`

      Breakdown of event counts by event type.

    - `firstEventMs: number`

      Timestamp of the earliest event from this agent in the queried window (Unix epoch ms).

    - `hasErrors: boolean`

      Whether the agent emitted any error events in the queried window.

    - `lastEventMs: number`

      Timestamp of the most recent event from this agent (Unix epoch ms).

    - `namespace: string`

      Durable Object namespace the agent belongs to.

    - `service: string`

      Worker service name that hosts this agent.

    - `totalEvents: number`

      Total number of events emitted by this agent in the queried window.

  - `calculations: optional array of object { aggregates, calculation, series, alias }`

    Aggregated calculation results. Present when the query view is 'calculations'. Contains computed metrics (count, avg, p99, etc.) with optional group-by breakdowns and time-series data.

    - `aggregates: array of object { count, interval, sampleInterval, 2 more }`

      - `count: number`

      - `interval: number`

      - `sampleInterval: number`

      - `value: number`

      - `groups: optional array of object { key, value }`

        - `key: string`

        - `value: string or number or boolean`

          - `string`

          - `number`

          - `boolean`

    - `calculation: string`

    - `series: array of object { data, time }`

      - `data: array of object { count, interval, sampleInterval, 4 more }`

        - `count: number`

        - `interval: number`

        - `sampleInterval: number`

        - `value: number`

        - `firstSeen: optional string`

        - `groups: optional array of object { key, value }`

          - `key: string`

          - `value: string or number or boolean`

            - `string`

            - `number`

            - `boolean`

        - `lastSeen: optional string`

      - `time: string`

    - `alias: optional string`

  - `compare: optional array of object { aggregates, calculation, series, alias }`

    Comparison calculation results from the previous time period. Present when the compare option is enabled. Same structure as calculations.

    - `aggregates: array of object { count, interval, sampleInterval, 2 more }`

      - `count: number`

      - `interval: number`

      - `sampleInterval: number`

      - `value: number`

      - `groups: optional array of object { key, value }`

        - `key: string`

        - `value: string or number or boolean`

          - `string`

          - `number`

          - `boolean`

    - `calculation: string`

    - `series: array of object { data, time }`

      - `data: array of object { count, interval, sampleInterval, 4 more }`

        - `count: number`

        - `interval: number`

        - `sampleInterval: number`

        - `value: number`

        - `firstSeen: optional string`

        - `groups: optional array of object { key, value }`

          - `key: string`

          - `value: string or number or boolean`

            - `string`

            - `number`

            - `boolean`

        - `lastSeen: optional string`

      - `time: string`

    - `alias: optional string`

  - `events: optional object { count, events, fields, series }`

    Individual event results. Present when the query view is 'events'. Contains the matching log lines and their metadata.

    - `count: optional number`

      Total number of events matching the query (may exceed the number returned due to limits).

    - `events: optional array of object { "$metadata", dataset, source, 3 more }`

      List of individual telemetry events matching the query.

      - `"$metadata": object { id, account, cloudService, 28 more }`

        Structured metadata extracted from the event. These fields are indexed and available for filtering and aggregation.

        - `id: string`

          Unique event ID. Use as the cursor value for offset-based pagination.

        - `account: optional string`

          Cloudflare account identifier.

        - `cloudService: optional string`

          Cloudflare product that generated this event (e.g. workers, pages).

        - `coldStart: optional number`

        - `cost: optional number`

          Estimated cost units for this invocation.

        - `duration: optional number`

          Span duration in milliseconds.

        - `endTime: optional number`

          Span end time as a Unix epoch in milliseconds.

        - `error: optional string`

          Error message, present when the log represents an error.

        - `errorTemplate: optional string`

          Templatized version of the error message used for grouping similar errors.

        - `fingerprint: optional string`

          Content-based fingerprint used to group similar events.

        - `level: optional string`

          Log level (e.g. log, debug, info, warn, error).

        - `message: optional string`

          Log message text.

        - `messageTemplate: optional string`

          Templatized version of the log message used for grouping similar messages.

        - `metricName: optional string`

          Metric name when the event represents a metric data point.

        - `origin: optional string`

          Origin of the event (e.g. fetch, scheduled, queue).

        - `parentSpanId: optional string`

          Span ID of the parent span in the trace hierarchy.

        - `provider: optional string`

          Infrastructure provider identifier.

        - `region: optional string`

          Cloudflare data center / region that handled the request.

        - `requestId: optional string`

          Cloudflare request ID that ties all logs from a single invocation together.

        - `service: optional string`

          Worker script name that produced this event.

        - `spanId: optional string`

          Span ID for this individual unit of work within a trace.

        - `spanName: optional string`

          Human-readable name for this span.

        - `stackId: optional string`

          Stack / deployment identifier.

        - `startTime: optional number`

          Span start time as a Unix epoch in milliseconds.

        - `statusCode: optional number`

          HTTP response status code returned by the Worker.

        - `traceDuration: optional number`

          Total duration of the entire trace in milliseconds.

        - `traceId: optional string`

          Distributed trace ID linking spans across services.

        - `transactionName: optional string`

          Logical transaction name for this request.

        - `trigger: optional string`

          What triggered the invocation (e.g. GET /users, POST /orders, queue message).

        - `type: optional string`

          Event type classifier (e.g. cf-worker-event, cf-worker-log).

        - `url: optional string`

          Request URL that triggered the Worker invocation.

      - `dataset: string`

        The dataset this event belongs to (e.g. cloudflare-workers).

      - `source: string or map[unknown]`

        Raw log payload. May be a string or a structured object depending on how the log was emitted.

        - `string`

        - `map[unknown]`

      - `timestamp: number`

        Event timestamp as a Unix epoch in milliseconds.

      - `"$containers": optional map[unknown]`

        Cloudflare Containers event information that enriches your logs for identifying and debugging issues.

      - `"$workers": optional object { eventType, requestId, scriptName, 10 more }  or object { cpuTimeMs, eventType, outcome, 14 more }`

        Cloudflare Workers event information that enriches your logs for identifying and debugging issues.

        - `object { eventType, requestId, scriptName, 10 more }`

          - `eventType: "fetch" or "scheduled" or "alarm" or 9 more`

            - `"fetch"`

            - `"scheduled"`

            - `"alarm"`

            - `"cron"`

            - `"queue"`

            - `"email"`

            - `"tail"`

            - `"rpc"`

            - `"jsrpc"`

            - `"websocket"`

            - `"workflow"`

            - `"unknown"`

          - `requestId: string`

          - `scriptName: string`

          - `durableObjectId: optional string`

          - `entrypoint: optional string`

          - `event: optional map[unknown]`

          - `executionModel: optional "durableObject" or "stateless"`

            - `"durableObject"`

            - `"stateless"`

          - `outcome: optional string`

          - `preview: optional object { id, name, slug }`

            - `id: optional string`

            - `name: optional string`

            - `slug: optional string`

          - `scriptVersion: optional object { id, message, tag }`

            - `id: optional string`

            - `message: optional string`

            - `tag: optional string`

          - `spanId: optional string`

          - `traceId: optional string`

          - `truncated: optional boolean`

        - `object { cpuTimeMs, eventType, outcome, 14 more }`

          - `cpuTimeMs: number`

          - `eventType: "fetch" or "scheduled" or "alarm" or 9 more`

            - `"fetch"`

            - `"scheduled"`

            - `"alarm"`

            - `"cron"`

            - `"queue"`

            - `"email"`

            - `"tail"`

            - `"rpc"`

            - `"jsrpc"`

            - `"websocket"`

            - `"workflow"`

            - `"unknown"`

          - `outcome: string`

          - `requestId: string`

          - `scriptName: string`

          - `wallTimeMs: number`

          - `diagnosticsChannelEvents: optional array of object { channel, message, timestamp }`

            - `channel: string`

            - `message: string`

            - `timestamp: number`

          - `dispatchNamespace: optional string`

          - `durableObjectId: optional string`

          - `entrypoint: optional string`

          - `event: optional map[unknown]`

          - `executionModel: optional "durableObject" or "stateless"`

            - `"durableObject"`

            - `"stateless"`

          - `preview: optional object { id, name, slug }`

            - `id: optional string`

            - `name: optional string`

            - `slug: optional string`

          - `scriptVersion: optional object { id, message, tag }`

            - `id: optional string`

            - `message: optional string`

            - `tag: optional string`

          - `spanId: optional string`

          - `traceId: optional string`

          - `truncated: optional boolean`

    - `fields: optional array of object { key, type }`

      List of fields discovered in the matched events. Useful for building dynamic UIs.

      - `key: string`

        Field name present in the matched events.

      - `type: string`

        Data type of the field (string, number, or boolean).

    - `series: optional array of object { data, time }`

      Time-series data for the matched events, bucketed by the query granularity.

      - `data: array of object { aggregates, count, interval, 3 more }`

        - `aggregates: object { _count, _interval, _firstSeen, 2 more }`

          - `_count: number`

          - `_interval: number`

          - `_firstSeen: optional string`

          - `_lastSeen: optional string`

          - `bin: optional unknown`

        - `count: number`

        - `interval: number`

        - `sampleInterval: number`

        - `errors: optional number`

        - `groups: optional map[string or number or boolean]`

          Groups in the query results.

          - `string`

          - `number`

          - `boolean`

      - `time: string`

  - `invocations: optional map[array of object { "$metadata", dataset, source, 3 more } ]`

    Events grouped by invocation (request ID). Present when the query view is 'invocations'. Each key is a request ID mapping to all events from that invocation.

    - `"$metadata": object { id, account, cloudService, 28 more }`

      Structured metadata extracted from the event. These fields are indexed and available for filtering and aggregation.

      - `id: string`

        Unique event ID. Use as the cursor value for offset-based pagination.

      - `account: optional string`

        Cloudflare account identifier.

      - `cloudService: optional string`

        Cloudflare product that generated this event (e.g. workers, pages).

      - `coldStart: optional number`

      - `cost: optional number`

        Estimated cost units for this invocation.

      - `duration: optional number`

        Span duration in milliseconds.

      - `endTime: optional number`

        Span end time as a Unix epoch in milliseconds.

      - `error: optional string`

        Error message, present when the log represents an error.

      - `errorTemplate: optional string`

        Templatized version of the error message used for grouping similar errors.

      - `fingerprint: optional string`

        Content-based fingerprint used to group similar events.

      - `level: optional string`

        Log level (e.g. log, debug, info, warn, error).

      - `message: optional string`

        Log message text.

      - `messageTemplate: optional string`

        Templatized version of the log message used for grouping similar messages.

      - `metricName: optional string`

        Metric name when the event represents a metric data point.

      - `origin: optional string`

        Origin of the event (e.g. fetch, scheduled, queue).

      - `parentSpanId: optional string`

        Span ID of the parent span in the trace hierarchy.

      - `provider: optional string`

        Infrastructure provider identifier.

      - `region: optional string`

        Cloudflare data center / region that handled the request.

      - `requestId: optional string`

        Cloudflare request ID that ties all logs from a single invocation together.

      - `service: optional string`

        Worker script name that produced this event.

      - `spanId: optional string`

        Span ID for this individual unit of work within a trace.

      - `spanName: optional string`

        Human-readable name for this span.

      - `stackId: optional string`

        Stack / deployment identifier.

      - `startTime: optional number`

        Span start time as a Unix epoch in milliseconds.

      - `statusCode: optional number`

        HTTP response status code returned by the Worker.

      - `traceDuration: optional number`

        Total duration of the entire trace in milliseconds.

      - `traceId: optional string`

        Distributed trace ID linking spans across services.

      - `transactionName: optional string`

        Logical transaction name for this request.

      - `trigger: optional string`

        What triggered the invocation (e.g. GET /users, POST /orders, queue message).

      - `type: optional string`

        Event type classifier (e.g. cf-worker-event, cf-worker-log).

      - `url: optional string`

        Request URL that triggered the Worker invocation.

    - `dataset: string`

      The dataset this event belongs to (e.g. cloudflare-workers).

    - `source: string or map[unknown]`

      Raw log payload. May be a string or a structured object depending on how the log was emitted.

      - `string`

      - `map[unknown]`

    - `timestamp: number`

      Event timestamp as a Unix epoch in milliseconds.

    - `"$containers": optional map[unknown]`

      Cloudflare Containers event information that enriches your logs for identifying and debugging issues.

    - `"$workers": optional object { eventType, requestId, scriptName, 10 more }  or object { cpuTimeMs, eventType, outcome, 14 more }`

      Cloudflare Workers event information that enriches your logs for identifying and debugging issues.

      - `object { eventType, requestId, scriptName, 10 more }`

        - `eventType: "fetch" or "scheduled" or "alarm" or 9 more`

          - `"fetch"`

          - `"scheduled"`

          - `"alarm"`

          - `"cron"`

          - `"queue"`

          - `"email"`

          - `"tail"`

          - `"rpc"`

          - `"jsrpc"`

          - `"websocket"`

          - `"workflow"`

          - `"unknown"`

        - `requestId: string`

        - `scriptName: string`

        - `durableObjectId: optional string`

        - `entrypoint: optional string`

        - `event: optional map[unknown]`

        - `executionModel: optional "durableObject" or "stateless"`

          - `"durableObject"`

          - `"stateless"`

        - `outcome: optional string`

        - `preview: optional object { id, name, slug }`

          - `id: optional string`

          - `name: optional string`

          - `slug: optional string`

        - `scriptVersion: optional object { id, message, tag }`

          - `id: optional string`

          - `message: optional string`

          - `tag: optional string`

        - `spanId: optional string`

        - `traceId: optional string`

        - `truncated: optional boolean`

      - `object { cpuTimeMs, eventType, outcome, 14 more }`

        - `cpuTimeMs: number`

        - `eventType: "fetch" or "scheduled" or "alarm" or 9 more`

          - `"fetch"`

          - `"scheduled"`

          - `"alarm"`

          - `"cron"`

          - `"queue"`

          - `"email"`

          - `"tail"`

          - `"rpc"`

          - `"jsrpc"`

          - `"websocket"`

          - `"workflow"`

          - `"unknown"`

        - `outcome: string`

        - `requestId: string`

        - `scriptName: string`

        - `wallTimeMs: number`

        - `diagnosticsChannelEvents: optional array of object { channel, message, timestamp }`

          - `channel: string`

          - `message: string`

          - `timestamp: number`

        - `dispatchNamespace: optional string`

        - `durableObjectId: optional string`

        - `entrypoint: optional string`

        - `event: optional map[unknown]`

        - `executionModel: optional "durableObject" or "stateless"`

          - `"durableObject"`

          - `"stateless"`

        - `preview: optional object { id, name, slug }`

          - `id: optional string`

          - `name: optional string`

          - `slug: optional string`

        - `scriptVersion: optional object { id, message, tag }`

          - `id: optional string`

          - `message: optional string`

          - `tag: optional string`

        - `spanId: optional string`

        - `traceId: optional string`

        - `truncated: optional boolean`

  - `traces: optional array of object { rootSpanName, rootTransactionName, service, 6 more }`

    Trace summaries matching the query. Present when the query view is 'traces'. Each entry represents a distributed trace with its spans, duration, and services involved.

    - `rootSpanName: string`

      Name of the root span that initiated the trace.

    - `rootTransactionName: string`

      Logical transaction name for the root span.

    - `service: array of string`

      List of Worker services involved in the trace.

    - `spans: number`

      Total number of spans in the trace.

    - `traceDurationMs: number`

      Total duration of the trace in milliseconds.

    - `traceEndMs: number`

      Trace end time as a Unix epoch in milliseconds.

    - `traceId: string`

      Unique identifier for the distributed trace.

    - `traceStartMs: number`

      Trace start time as a Unix epoch in milliseconds.

    - `errors: optional array of string`

      Error messages encountered during the trace, if any.

### Telemetry Values Response

- `TelemetryValuesResponse object { dataset, key, type, value }`

  - `dataset: string`

  - `key: string`

  - `type: "string" or "boolean" or "number"`

    - `"string"`

    - `"boolean"`

    - `"number"`

  - `value: string or number or boolean`

    - `string`

    - `number`

    - `boolean`

### Telemetry Live Tail Response

- `TelemetryLiveTailResponse object { wsUrl }`

  - `wsUrl: string`

    WebSocket URL clients connect to in order to stream live tail events.

### Telemetry Live Tail Heartbeat Response

- `TelemetryLiveTailHeartbeatResponse = unknown`

# Destinations

## Get Destinations

**get** `/accounts/{account_id}/workers/observability/destinations`

List your Workers Observability Telemetry Destinations.

### Path Parameters

- `account_id: string`

### Query Parameters

- `order: optional "asc" or "desc"`

  - `"asc"`

  - `"desc"`

- `orderBy: optional "created" or "updated"`

  - `"created"`

  - `"updated"`

- `page: optional number`

- `perPage: optional number`

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: "Successful request"`

    - `"Successful request"`

- `result: array of object { configuration, enabled, name, 2 more }`

  - `configuration: object { destination_conf, headers, jobStatus, 3 more }`

    - `destination_conf: string`

    - `headers: map[string]`

    - `jobStatus: object { error_message, last_complete, last_error }`

      - `error_message: string`

      - `last_complete: string`

      - `last_error: string`

    - `logpushDataset: "opentelemetry-traces" or "opentelemetry-logs" or "opentelemetry-metrics"`

      - `"opentelemetry-traces"`

      - `"opentelemetry-logs"`

      - `"opentelemetry-metrics"`

    - `type: "logpush"`

      - `"logpush"`

    - `url: string`

  - `enabled: boolean`

  - `name: string`

  - `scripts: array of string`

  - `slug: string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/destinations \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "Successful request"
    }
  ],
  "result": [
    {
      "configuration": {
        "destination_conf": "destination_conf",
        "headers": {
          "foo": "string"
        },
        "jobStatus": {
          "error_message": "error_message",
          "last_complete": "last_complete",
          "last_error": "last_error"
        },
        "logpushDataset": "opentelemetry-traces",
        "type": "logpush",
        "url": "url"
      },
      "enabled": true,
      "name": "name",
      "scripts": [
        "string"
      ],
      "slug": "slug"
    }
  ],
  "success": true
}
```

## Create Destination

**post** `/accounts/{account_id}/workers/observability/destinations`

Create a new Workers Observability Telemetry Destination.

### Path Parameters

- `account_id: string`

### Body Parameters

- `configuration: object { headers, logpushDataset, type, url }`

  - `headers: map[string]`

  - `logpushDataset: "opentelemetry-traces" or "opentelemetry-logs" or "opentelemetry-metrics"`

    - `"opentelemetry-traces"`

    - `"opentelemetry-logs"`

    - `"opentelemetry-metrics"`

  - `type: "logpush"`

    - `"logpush"`

  - `url: string`

- `enabled: boolean`

- `name: string`

- `skipPreflightCheck: optional boolean`

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: "Resource created"`

    - `"Resource created"`

- `result: object { configuration, enabled, name, 2 more }`

  - `configuration: object { destination_conf, logpushDataset, logpushJob, 2 more }`

    - `destination_conf: string`

    - `logpushDataset: "opentelemetry-traces" or "opentelemetry-logs" or "opentelemetry-metrics"`

      - `"opentelemetry-traces"`

      - `"opentelemetry-logs"`

      - `"opentelemetry-metrics"`

    - `logpushJob: number`

    - `type: "logpush"`

      - `"logpush"`

    - `url: string`

  - `enabled: boolean`

  - `name: string`

  - `scripts: array of string`

  - `slug: string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/destinations \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "configuration": {
            "headers": {
              "foo": "string"
            },
            "logpushDataset": "opentelemetry-traces",
            "type": "logpush",
            "url": "url"
          },
          "enabled": true,
          "name": "name"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "Resource created"
    }
  ],
  "result": {
    "configuration": {
      "destination_conf": "destination_conf",
      "logpushDataset": "opentelemetry-traces",
      "logpushJob": 0,
      "type": "logpush",
      "url": "url"
    },
    "enabled": true,
    "name": "name",
    "scripts": [
      "string"
    ],
    "slug": "slug"
  },
  "success": true
}
```

## Update Destination

**patch** `/accounts/{account_id}/workers/observability/destinations/{slug}`

Update an existing Workers Observability Telemetry Destination.

### Path Parameters

- `account_id: string`

- `slug: string`

### Body Parameters

- `configuration: object { headers, type, url }`

  - `headers: map[string]`

  - `type: "logpush"`

    - `"logpush"`

  - `url: string`

- `enabled: boolean`

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: "Successful request"`

    - `"Successful request"`

- `result: object { configuration, enabled, name, 2 more }`

  - `configuration: object { destination_conf, logpushDataset, logpushJob, 2 more }`

    - `destination_conf: string`

    - `logpushDataset: "opentelemetry-traces" or "opentelemetry-logs" or "opentelemetry-metrics"`

      - `"opentelemetry-traces"`

      - `"opentelemetry-logs"`

      - `"opentelemetry-metrics"`

    - `logpushJob: number`

    - `type: "logpush"`

      - `"logpush"`

    - `url: string`

  - `enabled: boolean`

  - `name: string`

  - `scripts: array of string`

  - `slug: string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/destinations/$SLUG \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "configuration": {
            "headers": {
              "foo": "string"
            },
            "type": "logpush",
            "url": "url"
          },
          "enabled": true
        }'
```

#### Response

```json
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "Successful request"
    }
  ],
  "result": {
    "configuration": {
      "destination_conf": "destination_conf",
      "logpushDataset": "opentelemetry-traces",
      "logpushJob": 0,
      "type": "logpush",
      "url": "url"
    },
    "enabled": true,
    "name": "name",
    "scripts": [
      "string"
    ],
    "slug": "slug"
  },
  "success": true
}
```

## Delete Destination

**delete** `/accounts/{account_id}/workers/observability/destinations/{slug}`

Delete a Workers Observability Telemetry Destination.

### Path Parameters

- `account_id: string`

- `slug: string`

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: "Successful request"`

    - `"Successful request"`

- `success: true`

  - `true`

- `result: optional object { configuration, enabled, name, 2 more }`

  - `configuration: object { destination_conf, logpushDataset, logpushJob, 2 more }`

    - `destination_conf: string`

    - `logpushDataset: "opentelemetry-traces" or "opentelemetry-logs" or "opentelemetry-metrics"`

      - `"opentelemetry-traces"`

      - `"opentelemetry-logs"`

      - `"opentelemetry-metrics"`

    - `logpushJob: number`

    - `type: "logpush"`

      - `"logpush"`

    - `url: string`

  - `enabled: boolean`

  - `name: string`

  - `scripts: array of string`

  - `slug: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/destinations/$SLUG \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "Successful request"
    }
  ],
  "success": true,
  "result": {
    "configuration": {
      "destination_conf": "destination_conf",
      "logpushDataset": "opentelemetry-traces",
      "logpushJob": 0,
      "type": "logpush",
      "url": "url"
    },
    "enabled": true,
    "name": "name",
    "scripts": [
      "string"
    ],
    "slug": "slug"
  }
}
```

## Domain Types

### Destination List Response

- `DestinationListResponse object { configuration, enabled, name, 2 more }`

  - `configuration: object { destination_conf, headers, jobStatus, 3 more }`

    - `destination_conf: string`

    - `headers: map[string]`

    - `jobStatus: object { error_message, last_complete, last_error }`

      - `error_message: string`

      - `last_complete: string`

      - `last_error: string`

    - `logpushDataset: "opentelemetry-traces" or "opentelemetry-logs" or "opentelemetry-metrics"`

      - `"opentelemetry-traces"`

      - `"opentelemetry-logs"`

      - `"opentelemetry-metrics"`

    - `type: "logpush"`

      - `"logpush"`

    - `url: string`

  - `enabled: boolean`

  - `name: string`

  - `scripts: array of string`

  - `slug: string`

### Destination Create Response

- `DestinationCreateResponse object { configuration, enabled, name, 2 more }`

  - `configuration: object { destination_conf, logpushDataset, logpushJob, 2 more }`

    - `destination_conf: string`

    - `logpushDataset: "opentelemetry-traces" or "opentelemetry-logs" or "opentelemetry-metrics"`

      - `"opentelemetry-traces"`

      - `"opentelemetry-logs"`

      - `"opentelemetry-metrics"`

    - `logpushJob: number`

    - `type: "logpush"`

      - `"logpush"`

    - `url: string`

  - `enabled: boolean`

  - `name: string`

  - `scripts: array of string`

  - `slug: string`

### Destination Update Response

- `DestinationUpdateResponse object { configuration, enabled, name, 2 more }`

  - `configuration: object { destination_conf, logpushDataset, logpushJob, 2 more }`

    - `destination_conf: string`

    - `logpushDataset: "opentelemetry-traces" or "opentelemetry-logs" or "opentelemetry-metrics"`

      - `"opentelemetry-traces"`

      - `"opentelemetry-logs"`

      - `"opentelemetry-metrics"`

    - `logpushJob: number`

    - `type: "logpush"`

      - `"logpush"`

    - `url: string`

  - `enabled: boolean`

  - `name: string`

  - `scripts: array of string`

  - `slug: string`

### Destination Delete Response

- `DestinationDeleteResponse object { configuration, enabled, name, 2 more }`

  - `configuration: object { destination_conf, logpushDataset, logpushJob, 2 more }`

    - `destination_conf: string`

    - `logpushDataset: "opentelemetry-traces" or "opentelemetry-logs" or "opentelemetry-metrics"`

      - `"opentelemetry-traces"`

      - `"opentelemetry-logs"`

      - `"opentelemetry-metrics"`

    - `logpushJob: number`

    - `type: "logpush"`

      - `"logpush"`

    - `url: string`

  - `enabled: boolean`

  - `name: string`

  - `scripts: array of string`

  - `slug: string`

# Queries

## Save query

**post** `/accounts/{account_id}/workers/observability/queries`

Persist query for later use.

### Path Parameters

- `account_id: string`

### Body Parameters

- `description: string`

- `name: string`

  Query name

- `parameters: object { calculations, datasets, filterCombination, 6 more }`

  - `calculations: optional array of object { operator, alias, key, keyType }`

    Create Calculations to compute as part of the query.

    - `operator: "uniq" or "count" or "max" or 35 more`

      - `"uniq"`

      - `"count"`

      - `"max"`

      - `"min"`

      - `"sum"`

      - `"avg"`

      - `"median"`

      - `"p001"`

      - `"p01"`

      - `"p05"`

      - `"p10"`

      - `"p25"`

      - `"p75"`

      - `"p90"`

      - `"p95"`

      - `"p99"`

      - `"p999"`

      - `"stddev"`

      - `"variance"`

      - `"COUNT_DISTINCT"`

      - `"COUNT"`

      - `"MAX"`

      - `"MIN"`

      - `"SUM"`

      - `"AVG"`

      - `"MEDIAN"`

      - `"P001"`

      - `"P01"`

      - `"P05"`

      - `"P10"`

      - `"P25"`

      - `"P75"`

      - `"P90"`

      - `"P95"`

      - `"P99"`

      - `"P999"`

      - `"STDDEV"`

      - `"VARIANCE"`

    - `alias: optional string`

    - `key: optional string`

    - `keyType: optional "string" or "number" or "boolean"`

      - `"string"`

      - `"number"`

      - `"boolean"`

  - `datasets: optional array of string`

    Set the Datasets to query. Leave it empty to query all the datasets.

  - `filterCombination: optional "and" or "or" or "AND" or "OR"`

    Set a Flag to describe how to combine the filters on the query.

    - `"and"`

    - `"or"`

    - `"AND"`

    - `"OR"`

  - `filters: optional array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

    Configure the Filters to apply to the query. Supports nested groups via kind: 'group'.

    - `object { filterCombination, filters, kind }`

      - `filterCombination: "and" or "or" or "AND" or "OR"`

        - `"and"`

        - `"or"`

        - `"AND"`

        - `"OR"`

      - `filters: array of unknown`

      - `kind: "group"`

        - `"group"`

    - `WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }`

      A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

      - `key: string`

        Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

      - `operation: "includes" or "not_includes" or "starts_with" or 27 more`

        Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

        - `"includes"`

        - `"not_includes"`

        - `"starts_with"`

        - `"ends_with"`

        - `"regex"`

        - `"exists"`

        - `"is_null"`

        - `"in"`

        - `"not_in"`

        - `"eq"`

        - `"neq"`

        - `"gt"`

        - `"gte"`

        - `"lt"`

        - `"lte"`

        - `"="`

        - `"!="`

        - `">"`

        - `">="`

        - `"<"`

        - `"<="`

        - `"INCLUDES"`

        - `"DOES_NOT_INCLUDE"`

        - `"MATCH_REGEX"`

        - `"EXISTS"`

        - `"DOES_NOT_EXIST"`

        - `"IN"`

        - `"NOT_IN"`

        - `"STARTS_WITH"`

        - `"ENDS_WITH"`

      - `type: "string" or "number" or "boolean"`

        Data type of the filter field. Must match the actual type of the key being filtered.

        - `"string"`

        - `"number"`

        - `"boolean"`

      - `kind: optional "filter"`

        Discriminator for leaf filter nodes. Always 'filter' when present; may be omitted.

        - `"filter"`

      - `value: optional string or number or boolean`

        Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

        - `string`

        - `number`

        - `boolean`

  - `groupBys: optional array of object { type, value }`

    Define how to group the results of the query.

    - `type: "string" or "number" or "boolean"`

      - `"string"`

      - `"number"`

      - `"boolean"`

    - `value: string`

  - `havings: optional array of object { key, operation, value }`

    Configure the Having clauses that filter on calculations in the query result.

    - `key: string`

    - `operation: "eq" or "neq" or "gt" or 3 more`

      - `"eq"`

      - `"neq"`

      - `"gt"`

      - `"gte"`

      - `"lt"`

      - `"lte"`

    - `value: number`

  - `limit: optional number`

    Set a limit on the number of results / records returned by the query

  - `needle: optional object { value, isRegex, matchCase }`

    Define an expression to search using full-text search.

    - `value: string or number or boolean`

      - `string`

      - `number`

      - `boolean`

    - `isRegex: optional boolean`

    - `matchCase: optional boolean`

  - `orderBy: optional object { value, order }`

    Configure the order of the results returned by the query.

    - `value: string`

      Configure which Calculation to order the results by.

    - `order: optional "asc" or "desc"`

      Set the order of the results

      - `"asc"`

      - `"desc"`

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: "Successful request"`

    - `"Successful request"`

- `result: object { id, adhoc, created, 6 more }`

  - `id: string`

  - `adhoc: boolean`

    If the query wasn't explcitly saved

  - `created: string`

  - `createdBy: string`

  - `description: string`

  - `name: string`

    Query name

  - `parameters: object { calculations, datasets, filterCombination, 6 more }`

    - `calculations: optional array of object { operator, alias, key, keyType }`

      Create Calculations to compute as part of the query.

      - `operator: "uniq" or "count" or "max" or 35 more`

        - `"uniq"`

        - `"count"`

        - `"max"`

        - `"min"`

        - `"sum"`

        - `"avg"`

        - `"median"`

        - `"p001"`

        - `"p01"`

        - `"p05"`

        - `"p10"`

        - `"p25"`

        - `"p75"`

        - `"p90"`

        - `"p95"`

        - `"p99"`

        - `"p999"`

        - `"stddev"`

        - `"variance"`

        - `"COUNT_DISTINCT"`

        - `"COUNT"`

        - `"MAX"`

        - `"MIN"`

        - `"SUM"`

        - `"AVG"`

        - `"MEDIAN"`

        - `"P001"`

        - `"P01"`

        - `"P05"`

        - `"P10"`

        - `"P25"`

        - `"P75"`

        - `"P90"`

        - `"P95"`

        - `"P99"`

        - `"P999"`

        - `"STDDEV"`

        - `"VARIANCE"`

      - `alias: optional string`

      - `key: optional string`

      - `keyType: optional "string" or "number" or "boolean"`

        - `"string"`

        - `"number"`

        - `"boolean"`

    - `datasets: optional array of string`

      Set the Datasets to query. Leave it empty to query all the datasets.

    - `filterCombination: optional "and" or "or" or "AND" or "OR"`

      Set a Flag to describe how to combine the filters on the query.

      - `"and"`

      - `"or"`

      - `"AND"`

      - `"OR"`

    - `filters: optional array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

      Configure the Filters to apply to the query. Supports nested groups via kind: 'group'.

      - `object { filterCombination, filters, kind }`

        - `filterCombination: "and" or "or" or "AND" or "OR"`

          - `"and"`

          - `"or"`

          - `"AND"`

          - `"OR"`

        - `filters: array of unknown`

        - `kind: "group"`

          - `"group"`

      - `WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }`

        A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

        - `key: string`

          Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

        - `operation: "includes" or "not_includes" or "starts_with" or 27 more`

          Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

          - `"includes"`

          - `"not_includes"`

          - `"starts_with"`

          - `"ends_with"`

          - `"regex"`

          - `"exists"`

          - `"is_null"`

          - `"in"`

          - `"not_in"`

          - `"eq"`

          - `"neq"`

          - `"gt"`

          - `"gte"`

          - `"lt"`

          - `"lte"`

          - `"="`

          - `"!="`

          - `">"`

          - `">="`

          - `"<"`

          - `"<="`

          - `"INCLUDES"`

          - `"DOES_NOT_INCLUDE"`

          - `"MATCH_REGEX"`

          - `"EXISTS"`

          - `"DOES_NOT_EXIST"`

          - `"IN"`

          - `"NOT_IN"`

          - `"STARTS_WITH"`

          - `"ENDS_WITH"`

        - `type: "string" or "number" or "boolean"`

          Data type of the filter field. Must match the actual type of the key being filtered.

          - `"string"`

          - `"number"`

          - `"boolean"`

        - `kind: optional "filter"`

          Discriminator for leaf filter nodes. Always 'filter' when present; may be omitted.

          - `"filter"`

        - `value: optional string or number or boolean`

          Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

          - `string`

          - `number`

          - `boolean`

    - `groupBys: optional array of object { type, value }`

      Define how to group the results of the query.

      - `type: "string" or "number" or "boolean"`

        - `"string"`

        - `"number"`

        - `"boolean"`

      - `value: string`

    - `havings: optional array of object { key, operation, value }`

      Configure the Having clauses that filter on calculations in the query result.

      - `key: string`

      - `operation: "eq" or "neq" or "gt" or 3 more`

        - `"eq"`

        - `"neq"`

        - `"gt"`

        - `"gte"`

        - `"lt"`

        - `"lte"`

      - `value: number`

    - `limit: optional number`

      Set a limit on the number of results / records returned by the query

    - `needle: optional object { value, isRegex, matchCase }`

      Define an expression to search using full-text search.

      - `value: string or number or boolean`

        - `string`

        - `number`

        - `boolean`

      - `isRegex: optional boolean`

      - `matchCase: optional boolean`

    - `orderBy: optional object { value, order }`

      Configure the order of the results returned by the query.

      - `value: string`

        Configure which Calculation to order the results by.

      - `order: optional "asc" or "desc"`

        Set the order of the results

        - `"asc"`

        - `"desc"`

  - `updated: string`

  - `updatedBy: string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/queries \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "description": "Query description",
          "name": "x",
          "parameters": {}
        }'
```

#### Response

```json
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "Successful request"
    }
  ],
  "result": {
    "id": "id",
    "adhoc": true,
    "created": "created",
    "createdBy": "createdBy",
    "description": "Query description",
    "name": "x",
    "parameters": {
      "calculations": [
        {
          "operator": "uniq",
          "alias": "alias",
          "key": "key",
          "keyType": "string"
        }
      ],
      "datasets": [
        "string"
      ],
      "filterCombination": "and",
      "filters": [
        {
          "filterCombination": "and",
          "filters": [
            {}
          ],
          "kind": "group"
        }
      ],
      "groupBys": [
        {
          "type": "string",
          "value": "value"
        }
      ],
      "havings": [
        {
          "key": "key",
          "operation": "eq",
          "value": 0
        }
      ],
      "limit": 0,
      "needle": {
        "value": "string",
        "isRegex": true,
        "matchCase": true
      },
      "orderBy": {
        "value": "value",
        "order": "asc"
      }
    },
    "updated": "updated",
    "updatedBy": "updatedBy"
  },
  "success": true
}
```

## List queries

**get** `/accounts/{account_id}/workers/observability/queries`

List saved queries.

### Path Parameters

- `account_id: string`

### Query Parameters

- `order: optional "asc" or "desc"`

  - `"asc"`

  - `"desc"`

- `orderBy: optional "created" or "updated"`

  - `"created"`

  - `"updated"`

- `page: optional number`

- `perPage: optional number`

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: "Successful request"`

    - `"Successful request"`

- `result: array of object { id, adhoc, created, 6 more }`

  - `id: string`

  - `adhoc: boolean`

    If the query wasn't explcitly saved

  - `created: string`

  - `createdBy: string`

  - `description: string`

  - `name: string`

    Query name

  - `parameters: object { calculations, datasets, filterCombination, 6 more }`

    - `calculations: optional array of object { operator, alias, key, keyType }`

      Create Calculations to compute as part of the query.

      - `operator: "uniq" or "count" or "max" or 35 more`

        - `"uniq"`

        - `"count"`

        - `"max"`

        - `"min"`

        - `"sum"`

        - `"avg"`

        - `"median"`

        - `"p001"`

        - `"p01"`

        - `"p05"`

        - `"p10"`

        - `"p25"`

        - `"p75"`

        - `"p90"`

        - `"p95"`

        - `"p99"`

        - `"p999"`

        - `"stddev"`

        - `"variance"`

        - `"COUNT_DISTINCT"`

        - `"COUNT"`

        - `"MAX"`

        - `"MIN"`

        - `"SUM"`

        - `"AVG"`

        - `"MEDIAN"`

        - `"P001"`

        - `"P01"`

        - `"P05"`

        - `"P10"`

        - `"P25"`

        - `"P75"`

        - `"P90"`

        - `"P95"`

        - `"P99"`

        - `"P999"`

        - `"STDDEV"`

        - `"VARIANCE"`

      - `alias: optional string`

      - `key: optional string`

      - `keyType: optional "string" or "number" or "boolean"`

        - `"string"`

        - `"number"`

        - `"boolean"`

    - `datasets: optional array of string`

      Set the Datasets to query. Leave it empty to query all the datasets.

    - `filterCombination: optional "and" or "or" or "AND" or "OR"`

      Set a Flag to describe how to combine the filters on the query.

      - `"and"`

      - `"or"`

      - `"AND"`

      - `"OR"`

    - `filters: optional array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

      Configure the Filters to apply to the query. Supports nested groups via kind: 'group'.

      - `object { filterCombination, filters, kind }`

        - `filterCombination: "and" or "or" or "AND" or "OR"`

          - `"and"`

          - `"or"`

          - `"AND"`

          - `"OR"`

        - `filters: array of unknown`

        - `kind: "group"`

          - `"group"`

      - `WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }`

        A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

        - `key: string`

          Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

        - `operation: "includes" or "not_includes" or "starts_with" or 27 more`

          Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

          - `"includes"`

          - `"not_includes"`

          - `"starts_with"`

          - `"ends_with"`

          - `"regex"`

          - `"exists"`

          - `"is_null"`

          - `"in"`

          - `"not_in"`

          - `"eq"`

          - `"neq"`

          - `"gt"`

          - `"gte"`

          - `"lt"`

          - `"lte"`

          - `"="`

          - `"!="`

          - `">"`

          - `">="`

          - `"<"`

          - `"<="`

          - `"INCLUDES"`

          - `"DOES_NOT_INCLUDE"`

          - `"MATCH_REGEX"`

          - `"EXISTS"`

          - `"DOES_NOT_EXIST"`

          - `"IN"`

          - `"NOT_IN"`

          - `"STARTS_WITH"`

          - `"ENDS_WITH"`

        - `type: "string" or "number" or "boolean"`

          Data type of the filter field. Must match the actual type of the key being filtered.

          - `"string"`

          - `"number"`

          - `"boolean"`

        - `kind: optional "filter"`

          Discriminator for leaf filter nodes. Always 'filter' when present; may be omitted.

          - `"filter"`

        - `value: optional string or number or boolean`

          Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

          - `string`

          - `number`

          - `boolean`

    - `groupBys: optional array of object { type, value }`

      Define how to group the results of the query.

      - `type: "string" or "number" or "boolean"`

        - `"string"`

        - `"number"`

        - `"boolean"`

      - `value: string`

    - `havings: optional array of object { key, operation, value }`

      Configure the Having clauses that filter on calculations in the query result.

      - `key: string`

      - `operation: "eq" or "neq" or "gt" or 3 more`

        - `"eq"`

        - `"neq"`

        - `"gt"`

        - `"gte"`

        - `"lt"`

        - `"lte"`

      - `value: number`

    - `limit: optional number`

      Set a limit on the number of results / records returned by the query

    - `needle: optional object { value, isRegex, matchCase }`

      Define an expression to search using full-text search.

      - `value: string or number or boolean`

        - `string`

        - `number`

        - `boolean`

      - `isRegex: optional boolean`

      - `matchCase: optional boolean`

    - `orderBy: optional object { value, order }`

      Configure the order of the results returned by the query.

      - `value: string`

        Configure which Calculation to order the results by.

      - `order: optional "asc" or "desc"`

        Set the order of the results

        - `"asc"`

        - `"desc"`

  - `updated: string`

  - `updatedBy: string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/queries \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "Successful request"
    }
  ],
  "result": [
    {
      "id": "id",
      "adhoc": true,
      "created": "created",
      "createdBy": "createdBy",
      "description": "Query description",
      "name": "x",
      "parameters": {
        "calculations": [
          {
            "operator": "uniq",
            "alias": "alias",
            "key": "key",
            "keyType": "string"
          }
        ],
        "datasets": [
          "string"
        ],
        "filterCombination": "and",
        "filters": [
          {
            "filterCombination": "and",
            "filters": [
              {}
            ],
            "kind": "group"
          }
        ],
        "groupBys": [
          {
            "type": "string",
            "value": "value"
          }
        ],
        "havings": [
          {
            "key": "key",
            "operation": "eq",
            "value": 0
          }
        ],
        "limit": 0,
        "needle": {
          "value": "string",
          "isRegex": true,
          "matchCase": true
        },
        "orderBy": {
          "value": "value",
          "order": "asc"
        }
      },
      "updated": "updated",
      "updatedBy": "updatedBy"
    }
  ],
  "success": true
}
```

## Domain Types

### Query Create Response

- `QueryCreateResponse object { id, adhoc, created, 6 more }`

  - `id: string`

  - `adhoc: boolean`

    If the query wasn't explcitly saved

  - `created: string`

  - `createdBy: string`

  - `description: string`

  - `name: string`

    Query name

  - `parameters: object { calculations, datasets, filterCombination, 6 more }`

    - `calculations: optional array of object { operator, alias, key, keyType }`

      Create Calculations to compute as part of the query.

      - `operator: "uniq" or "count" or "max" or 35 more`

        - `"uniq"`

        - `"count"`

        - `"max"`

        - `"min"`

        - `"sum"`

        - `"avg"`

        - `"median"`

        - `"p001"`

        - `"p01"`

        - `"p05"`

        - `"p10"`

        - `"p25"`

        - `"p75"`

        - `"p90"`

        - `"p95"`

        - `"p99"`

        - `"p999"`

        - `"stddev"`

        - `"variance"`

        - `"COUNT_DISTINCT"`

        - `"COUNT"`

        - `"MAX"`

        - `"MIN"`

        - `"SUM"`

        - `"AVG"`

        - `"MEDIAN"`

        - `"P001"`

        - `"P01"`

        - `"P05"`

        - `"P10"`

        - `"P25"`

        - `"P75"`

        - `"P90"`

        - `"P95"`

        - `"P99"`

        - `"P999"`

        - `"STDDEV"`

        - `"VARIANCE"`

      - `alias: optional string`

      - `key: optional string`

      - `keyType: optional "string" or "number" or "boolean"`

        - `"string"`

        - `"number"`

        - `"boolean"`

    - `datasets: optional array of string`

      Set the Datasets to query. Leave it empty to query all the datasets.

    - `filterCombination: optional "and" or "or" or "AND" or "OR"`

      Set a Flag to describe how to combine the filters on the query.

      - `"and"`

      - `"or"`

      - `"AND"`

      - `"OR"`

    - `filters: optional array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

      Configure the Filters to apply to the query. Supports nested groups via kind: 'group'.

      - `object { filterCombination, filters, kind }`

        - `filterCombination: "and" or "or" or "AND" or "OR"`

          - `"and"`

          - `"or"`

          - `"AND"`

          - `"OR"`

        - `filters: array of unknown`

        - `kind: "group"`

          - `"group"`

      - `WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }`

        A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

        - `key: string`

          Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

        - `operation: "includes" or "not_includes" or "starts_with" or 27 more`

          Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

          - `"includes"`

          - `"not_includes"`

          - `"starts_with"`

          - `"ends_with"`

          - `"regex"`

          - `"exists"`

          - `"is_null"`

          - `"in"`

          - `"not_in"`

          - `"eq"`

          - `"neq"`

          - `"gt"`

          - `"gte"`

          - `"lt"`

          - `"lte"`

          - `"="`

          - `"!="`

          - `">"`

          - `">="`

          - `"<"`

          - `"<="`

          - `"INCLUDES"`

          - `"DOES_NOT_INCLUDE"`

          - `"MATCH_REGEX"`

          - `"EXISTS"`

          - `"DOES_NOT_EXIST"`

          - `"IN"`

          - `"NOT_IN"`

          - `"STARTS_WITH"`

          - `"ENDS_WITH"`

        - `type: "string" or "number" or "boolean"`

          Data type of the filter field. Must match the actual type of the key being filtered.

          - `"string"`

          - `"number"`

          - `"boolean"`

        - `kind: optional "filter"`

          Discriminator for leaf filter nodes. Always 'filter' when present; may be omitted.

          - `"filter"`

        - `value: optional string or number or boolean`

          Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

          - `string`

          - `number`

          - `boolean`

    - `groupBys: optional array of object { type, value }`

      Define how to group the results of the query.

      - `type: "string" or "number" or "boolean"`

        - `"string"`

        - `"number"`

        - `"boolean"`

      - `value: string`

    - `havings: optional array of object { key, operation, value }`

      Configure the Having clauses that filter on calculations in the query result.

      - `key: string`

      - `operation: "eq" or "neq" or "gt" or 3 more`

        - `"eq"`

        - `"neq"`

        - `"gt"`

        - `"gte"`

        - `"lt"`

        - `"lte"`

      - `value: number`

    - `limit: optional number`

      Set a limit on the number of results / records returned by the query

    - `needle: optional object { value, isRegex, matchCase }`

      Define an expression to search using full-text search.

      - `value: string or number or boolean`

        - `string`

        - `number`

        - `boolean`

      - `isRegex: optional boolean`

      - `matchCase: optional boolean`

    - `orderBy: optional object { value, order }`

      Configure the order of the results returned by the query.

      - `value: string`

        Configure which Calculation to order the results by.

      - `order: optional "asc" or "desc"`

        Set the order of the results

        - `"asc"`

        - `"desc"`

  - `updated: string`

  - `updatedBy: string`

### Query List Response

- `QueryListResponse object { id, adhoc, created, 6 more }`

  - `id: string`

  - `adhoc: boolean`

    If the query wasn't explcitly saved

  - `created: string`

  - `createdBy: string`

  - `description: string`

  - `name: string`

    Query name

  - `parameters: object { calculations, datasets, filterCombination, 6 more }`

    - `calculations: optional array of object { operator, alias, key, keyType }`

      Create Calculations to compute as part of the query.

      - `operator: "uniq" or "count" or "max" or 35 more`

        - `"uniq"`

        - `"count"`

        - `"max"`

        - `"min"`

        - `"sum"`

        - `"avg"`

        - `"median"`

        - `"p001"`

        - `"p01"`

        - `"p05"`

        - `"p10"`

        - `"p25"`

        - `"p75"`

        - `"p90"`

        - `"p95"`

        - `"p99"`

        - `"p999"`

        - `"stddev"`

        - `"variance"`

        - `"COUNT_DISTINCT"`

        - `"COUNT"`

        - `"MAX"`

        - `"MIN"`

        - `"SUM"`

        - `"AVG"`

        - `"MEDIAN"`

        - `"P001"`

        - `"P01"`

        - `"P05"`

        - `"P10"`

        - `"P25"`

        - `"P75"`

        - `"P90"`

        - `"P95"`

        - `"P99"`

        - `"P999"`

        - `"STDDEV"`

        - `"VARIANCE"`

      - `alias: optional string`

      - `key: optional string`

      - `keyType: optional "string" or "number" or "boolean"`

        - `"string"`

        - `"number"`

        - `"boolean"`

    - `datasets: optional array of string`

      Set the Datasets to query. Leave it empty to query all the datasets.

    - `filterCombination: optional "and" or "or" or "AND" or "OR"`

      Set a Flag to describe how to combine the filters on the query.

      - `"and"`

      - `"or"`

      - `"AND"`

      - `"OR"`

    - `filters: optional array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

      Configure the Filters to apply to the query. Supports nested groups via kind: 'group'.

      - `object { filterCombination, filters, kind }`

        - `filterCombination: "and" or "or" or "AND" or "OR"`

          - `"and"`

          - `"or"`

          - `"AND"`

          - `"OR"`

        - `filters: array of unknown`

        - `kind: "group"`

          - `"group"`

      - `WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }`

        A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

        - `key: string`

          Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

        - `operation: "includes" or "not_includes" or "starts_with" or 27 more`

          Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

          - `"includes"`

          - `"not_includes"`

          - `"starts_with"`

          - `"ends_with"`

          - `"regex"`

          - `"exists"`

          - `"is_null"`

          - `"in"`

          - `"not_in"`

          - `"eq"`

          - `"neq"`

          - `"gt"`

          - `"gte"`

          - `"lt"`

          - `"lte"`

          - `"="`

          - `"!="`

          - `">"`

          - `">="`

          - `"<"`

          - `"<="`

          - `"INCLUDES"`

          - `"DOES_NOT_INCLUDE"`

          - `"MATCH_REGEX"`

          - `"EXISTS"`

          - `"DOES_NOT_EXIST"`

          - `"IN"`

          - `"NOT_IN"`

          - `"STARTS_WITH"`

          - `"ENDS_WITH"`

        - `type: "string" or "number" or "boolean"`

          Data type of the filter field. Must match the actual type of the key being filtered.

          - `"string"`

          - `"number"`

          - `"boolean"`

        - `kind: optional "filter"`

          Discriminator for leaf filter nodes. Always 'filter' when present; may be omitted.

          - `"filter"`

        - `value: optional string or number or boolean`

          Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

          - `string`

          - `number`

          - `boolean`

    - `groupBys: optional array of object { type, value }`

      Define how to group the results of the query.

      - `type: "string" or "number" or "boolean"`

        - `"string"`

        - `"number"`

        - `"boolean"`

      - `value: string`

    - `havings: optional array of object { key, operation, value }`

      Configure the Having clauses that filter on calculations in the query result.

      - `key: string`

      - `operation: "eq" or "neq" or "gt" or 3 more`

        - `"eq"`

        - `"neq"`

        - `"gt"`

        - `"gte"`

        - `"lt"`

        - `"lte"`

      - `value: number`

    - `limit: optional number`

      Set a limit on the number of results / records returned by the query

    - `needle: optional object { value, isRegex, matchCase }`

      Define an expression to search using full-text search.

      - `value: string or number or boolean`

        - `string`

        - `number`

        - `boolean`

      - `isRegex: optional boolean`

      - `matchCase: optional boolean`

    - `orderBy: optional object { value, order }`

      Configure the order of the results returned by the query.

      - `value: string`

        Configure which Calculation to order the results by.

      - `order: optional "asc" or "desc"`

        Set the order of the results

        - `"asc"`

        - `"desc"`

  - `updated: string`

  - `updatedBy: string`

# Shared Queries

## Create a sharable link to a query result

**post** `/accounts/{account_id}/workers/observability/shared/query`

Shared queries store the results of a previously run query, allowing you to share the results with others.

### Path Parameters

- `account_id: string`

### Body Parameters

- `queryId: string`

  Identifier for the query. When parameters are omitted, this ID is used to load a previously saved query's parameters. When providing parameters inline, pass any identifier (e.g. an ad-hoc ID).

- `timeframe: object { from, to }`

  Timeframe for the query using Unix timestamps in milliseconds. Narrower timeframes produce faster responses and more specific results.

  - `from: number`

    Start timestamp for the query timeframe (Unix timestamp in milliseconds)

  - `to: number`

    End timestamp for the query timeframe (Unix timestamp in milliseconds)

- `chart: optional boolean`

  When true, includes time-series data in the response.

- `compare: optional boolean`

  When true, includes a comparison dataset from the previous time period of equal length.

- `dry: optional boolean`

  When true, executes the query without persisting the results. Useful for validation or previewing.

- `granularity: optional number`

  Number of time-series buckets. Only used when view is 'calculations'. Omit to let the system auto-detect an appropriate granularity.

- `ignoreSeries: optional boolean`

  When true, omits time-series data from the response and returns only aggregated values. Reduces response size when series are not needed.

- `limit: optional number`

  Maximum number of events to return when view is 'events'. Also controls the number of group-by rows when view is 'calculations'.

- `offset: optional string`

  Cursor for pagination in event, trace, and invocation views. Pass the $metadata.id of the last returned item to fetch the next page.

- `offsetBy: optional number`

  Numeric offset for paginating grouped/pattern results (top-N lists). Use together with limit. Not used by cursor-based pagination.

- `offsetDirection: optional string`

  Pagination direction: 'next' for forward, 'prev' for backward.

- `parameters: optional object { calculations, datasets, filterCombination, 6 more }`

  Query parameters defining what data to retrieve — filters, calculations, group-bys, and ordering. In practice this should always be provided for ad-hoc queries. Only omit when executing a previously saved query by queryId. Use the keys and values endpoints to discover available fields before building filters.

  - `calculations: optional array of object { operator, alias, key, keyType }`

    Aggregation calculations to compute (e.g. count, avg, p99). Each calculation produces aggregate values and optional time-series data.

    - `operator: "uniq" or "count" or "max" or 35 more`

      Aggregation operator to apply. Examples: count, avg, sum, min, max, median, p90, p95, p99, uniq, stddev, variance.

      - `"uniq"`

      - `"count"`

      - `"max"`

      - `"min"`

      - `"sum"`

      - `"avg"`

      - `"median"`

      - `"p001"`

      - `"p01"`

      - `"p05"`

      - `"p10"`

      - `"p25"`

      - `"p75"`

      - `"p90"`

      - `"p95"`

      - `"p99"`

      - `"p999"`

      - `"stddev"`

      - `"variance"`

      - `"COUNT_DISTINCT"`

      - `"COUNT"`

      - `"MAX"`

      - `"MIN"`

      - `"SUM"`

      - `"AVG"`

      - `"MEDIAN"`

      - `"P001"`

      - `"P01"`

      - `"P05"`

      - `"P10"`

      - `"P25"`

      - `"P75"`

      - `"P90"`

      - `"P95"`

      - `"P99"`

      - `"P999"`

      - `"STDDEV"`

      - `"VARIANCE"`

    - `alias: optional string`

      Custom label for this calculation in the results. Useful for distinguishing multiple calculations.

    - `key: optional string`

      Field name to calculate over. Must exist in the data — verify with the keys endpoint. Omit for operators that don't require a key (e.g. count).

    - `keyType: optional "string" or "number" or "boolean"`

      Data type of the key. Required when key is provided to ensure correct aggregation.

      - `"string"`

      - `"number"`

      - `"boolean"`

  - `datasets: optional array of string`

    Datasets to query. Leave empty to query all available datasets.

  - `filterCombination: optional "and" or "or" or "AND" or "OR"`

    Logical operator for combining top-level filters: 'and' (all must match) or 'or' (any must match). Defaults to 'and'.

    - `"and"`

    - `"or"`

    - `"AND"`

    - `"OR"`

  - `filters: optional array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

    Filters to narrow query results. Use the keys and values endpoints to discover available fields before building filters. Supports nested groups via kind: 'group'. Maximum nesting depth is 4.

    - `object { filterCombination, filters, kind }`

      - `filterCombination: "and" or "or" or "AND" or "OR"`

        - `"and"`

        - `"or"`

        - `"AND"`

        - `"OR"`

      - `filters: array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

        - `object { filterCombination, filters, kind }`

          - `filterCombination: "and" or "or" or "AND" or "OR"`

            - `"and"`

            - `"or"`

            - `"AND"`

            - `"OR"`

          - `filters: array of unknown`

          - `kind: "group"`

            - `"group"`

        - `WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }`

          A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

          - `key: string`

            Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

          - `operation: "includes" or "not_includes" or "starts_with" or 27 more`

            Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

            - `"includes"`

            - `"not_includes"`

            - `"starts_with"`

            - `"ends_with"`

            - `"regex"`

            - `"exists"`

            - `"is_null"`

            - `"in"`

            - `"not_in"`

            - `"eq"`

            - `"neq"`

            - `"gt"`

            - `"gte"`

            - `"lt"`

            - `"lte"`

            - `"="`

            - `"!="`

            - `">"`

            - `">="`

            - `"<"`

            - `"<="`

            - `"INCLUDES"`

            - `"DOES_NOT_INCLUDE"`

            - `"MATCH_REGEX"`

            - `"EXISTS"`

            - `"DOES_NOT_EXIST"`

            - `"IN"`

            - `"NOT_IN"`

            - `"STARTS_WITH"`

            - `"ENDS_WITH"`

          - `type: "string" or "number" or "boolean"`

            Data type of the filter field. Must match the actual type of the key being filtered.

            - `"string"`

            - `"number"`

            - `"boolean"`

          - `kind: optional "filter"`

            Discriminator for leaf filter nodes. Always 'filter' when present; may be omitted.

            - `"filter"`

          - `value: optional string or number or boolean`

            Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

            - `string`

            - `number`

            - `boolean`

      - `kind: "group"`

        - `"group"`

    - `WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }`

      A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

      - `key: string`

        Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

      - `operation: "includes" or "not_includes" or "starts_with" or 27 more`

        Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

        - `"includes"`

        - `"not_includes"`

        - `"starts_with"`

        - `"ends_with"`

        - `"regex"`

        - `"exists"`

        - `"is_null"`

        - `"in"`

        - `"not_in"`

        - `"eq"`

        - `"neq"`

        - `"gt"`

        - `"gte"`

        - `"lt"`

        - `"lte"`

        - `"="`

        - `"!="`

        - `">"`

        - `">="`

        - `"<"`

        - `"<="`

        - `"INCLUDES"`

        - `"DOES_NOT_INCLUDE"`

        - `"MATCH_REGEX"`

        - `"EXISTS"`

        - `"DOES_NOT_EXIST"`

        - `"IN"`

        - `"NOT_IN"`

        - `"STARTS_WITH"`

        - `"ENDS_WITH"`

      - `type: "string" or "number" or "boolean"`

        Data type of the filter field. Must match the actual type of the key being filtered.

        - `"string"`

        - `"number"`

        - `"boolean"`

      - `kind: optional "filter"`

        Discriminator for leaf filter nodes. Always 'filter' when present; may be omitted.

        - `"filter"`

      - `value: optional string or number or boolean`

        Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

        - `string`

        - `number`

        - `boolean`

  - `groupBys: optional array of object { type, value }`

    Fields to group calculation results by. Only applicable when the query view is 'calculations'. Produces per-group aggregate values.

    - `type: "string" or "number" or "boolean"`

      Data type of the group-by field.

      - `"string"`

      - `"number"`

      - `"boolean"`

    - `value: string`

      Field name to group results by (e.g. $metadata.service, $metadata.statusCode).

  - `havings: optional array of object { key, operation, value }`

    Post-aggregation filters applied to calculation results. Use to filter groups after aggregation (e.g. only groups where count > 100).

    - `key: string`

      Calculation alias or operator to filter on after aggregation.

    - `operation: "eq" or "neq" or "gt" or 3 more`

      Numeric comparison operator: eq, neq, gt, gte, lt, lte.

      - `"eq"`

      - `"neq"`

      - `"gt"`

      - `"gte"`

      - `"lt"`

      - `"lte"`

    - `value: number`

      Threshold value to compare the calculation result against.

  - `limit: optional number`

    Maximum number of group-by rows to return in calculation results. A value of 10 is a sensible default for most use cases.

  - `needle: optional object { value, isRegex, matchCase }`

    Full-text search expression applied across all event fields. Matches events containing the specified text.

    - `value: string or number or boolean`

      The text or pattern to search for.

      - `string`

      - `number`

      - `boolean`

    - `isRegex: optional boolean`

      When true, treats the value as a regular expression (RE2 syntax).

    - `matchCase: optional boolean`

      When true, performs a case-sensitive search. Defaults to case-insensitive.

  - `orderBy: optional object { value, order }`

    Ordering for grouped calculation results. Only effective when a group-by is present.

    - `value: string`

      Alias of the calculation to order results by. Must match the alias (or operator) of a calculation in the query.

    - `order: optional "asc" or "desc"`

      Sort direction: 'asc' for ascending, 'desc' for descending.

      - `"asc"`

      - `"desc"`

- `view: optional "traces" or "events" or "calculations" or 3 more`

  Controls the shape of the response. 'events': individual log lines matching the query. 'calculations': aggregated metrics (count, avg, p99, etc.) with optional group-by breakdowns and time-series. 'invocations': events grouped by request ID. 'traces': distributed trace summaries. 'agents': Durable Object agent summaries.

  - `"traces"`

  - `"events"`

  - `"calculations"`

  - `"invocations"`

  - `"requests"`

  - `"agents"`

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: "Successful request"`

    - `"Successful request"`

- `result: object { id }`

  - `id: string`

    Specify the ID of the shared query.

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/shared/query \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "queryId": "queryId",
          "timeframe": {
            "from": 0,
            "to": 0
          }
        }'
```

#### Response

```json
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "Successful request"
    }
  ],
  "result": {
    "id": "id"
  },
  "success": true
}
```

## View a query that has been shared

**get** `/accounts/{account_id}/workers/observability/shared/query/{id}`

Shared queries store the results of a previously run query, allowing you to share the results with others.

### Path Parameters

- `account_id: string`

- `id: string`

  Specify the ID of the shared query.

### Query Parameters

- `view: optional "events" or "invocations" or "calculations"`

  Select the view of the query result to return, defaults to events.

  - `"events"`

  - `"invocations"`

  - `"calculations"`

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: "Successful request"`

    - `"Successful request"`

- `result: object { run, statistics, agents, 5 more }`

  Complete results of a query run. The populated fields depend on the requested view type (events, calculations, invocations, traces, or agents).

  - `run: object { id, accountId, dry, 8 more }`

    Represents a single execution of a query against Workers Observability data, including the query definition, execution status, and performance statistics.

    - `id: string`

      Unique identifier for this query run.

    - `accountId: string`

      Cloudflare account ID that owns this query run.

    - `dry: boolean`

      Whether this was a dry run (results not persisted).

    - `granularity: number`

      Number of time-series buckets used for the query. Higher values produce more detailed series data.

    - `query: object { id, adhoc, created, 6 more }`

      A saved query definition with its parameters, metadata, and ownership information.

      - `id: string`

      - `adhoc: boolean`

        If the query wasn't explcitly saved

      - `created: string`

      - `createdBy: string`

      - `description: string`

      - `name: string`

        Query name

      - `parameters: object { calculations, datasets, filterCombination, 6 more }`

        - `calculations: optional array of object { operator, alias, key, keyType }`

          Create Calculations to compute as part of the query.

          - `operator: "uniq" or "count" or "max" or 35 more`

            - `"uniq"`

            - `"count"`

            - `"max"`

            - `"min"`

            - `"sum"`

            - `"avg"`

            - `"median"`

            - `"p001"`

            - `"p01"`

            - `"p05"`

            - `"p10"`

            - `"p25"`

            - `"p75"`

            - `"p90"`

            - `"p95"`

            - `"p99"`

            - `"p999"`

            - `"stddev"`

            - `"variance"`

            - `"COUNT_DISTINCT"`

            - `"COUNT"`

            - `"MAX"`

            - `"MIN"`

            - `"SUM"`

            - `"AVG"`

            - `"MEDIAN"`

            - `"P001"`

            - `"P01"`

            - `"P05"`

            - `"P10"`

            - `"P25"`

            - `"P75"`

            - `"P90"`

            - `"P95"`

            - `"P99"`

            - `"P999"`

            - `"STDDEV"`

            - `"VARIANCE"`

          - `alias: optional string`

          - `key: optional string`

          - `keyType: optional "string" or "number" or "boolean"`

            - `"string"`

            - `"number"`

            - `"boolean"`

        - `datasets: optional array of string`

          Set the Datasets to query. Leave it empty to query all the datasets.

        - `filterCombination: optional "and" or "or" or "AND" or "OR"`

          Set a Flag to describe how to combine the filters on the query.

          - `"and"`

          - `"or"`

          - `"AND"`

          - `"OR"`

        - `filters: optional array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

          Configure the Filters to apply to the query. Supports nested groups via kind: 'group'.

          - `object { filterCombination, filters, kind }`

            - `filterCombination: "and" or "or" or "AND" or "OR"`

              - `"and"`

              - `"or"`

              - `"AND"`

              - `"OR"`

            - `filters: array of unknown`

            - `kind: "group"`

              - `"group"`

          - `WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }`

            A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

            - `key: string`

              Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

            - `operation: "includes" or "not_includes" or "starts_with" or 27 more`

              Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

              - `"includes"`

              - `"not_includes"`

              - `"starts_with"`

              - `"ends_with"`

              - `"regex"`

              - `"exists"`

              - `"is_null"`

              - `"in"`

              - `"not_in"`

              - `"eq"`

              - `"neq"`

              - `"gt"`

              - `"gte"`

              - `"lt"`

              - `"lte"`

              - `"="`

              - `"!="`

              - `">"`

              - `">="`

              - `"<"`

              - `"<="`

              - `"INCLUDES"`

              - `"DOES_NOT_INCLUDE"`

              - `"MATCH_REGEX"`

              - `"EXISTS"`

              - `"DOES_NOT_EXIST"`

              - `"IN"`

              - `"NOT_IN"`

              - `"STARTS_WITH"`

              - `"ENDS_WITH"`

            - `type: "string" or "number" or "boolean"`

              Data type of the filter field. Must match the actual type of the key being filtered.

              - `"string"`

              - `"number"`

              - `"boolean"`

            - `kind: optional "filter"`

              Discriminator for leaf filter nodes. Always 'filter' when present; may be omitted.

              - `"filter"`

            - `value: optional string or number or boolean`

              Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

              - `string`

              - `number`

              - `boolean`

        - `groupBys: optional array of object { type, value }`

          Define how to group the results of the query.

          - `type: "string" or "number" or "boolean"`

            - `"string"`

            - `"number"`

            - `"boolean"`

          - `value: string`

        - `havings: optional array of object { key, operation, value }`

          Configure the Having clauses that filter on calculations in the query result.

          - `key: string`

          - `operation: "eq" or "neq" or "gt" or 3 more`

            - `"eq"`

            - `"neq"`

            - `"gt"`

            - `"gte"`

            - `"lt"`

            - `"lte"`

          - `value: number`

        - `limit: optional number`

          Set a limit on the number of results / records returned by the query

        - `needle: optional object { value, isRegex, matchCase }`

          Define an expression to search using full-text search.

          - `value:`

          - `isRegex: optional boolean`

          - `matchCase: optional boolean`

        - `orderBy: optional object { value, order }`

          Configure the order of the results returned by the query.

          - `value: string`

            Configure which Calculation to order the results by.

          - `order: optional "asc" or "desc"`

            Set the order of the results

            - `"asc"`

            - `"desc"`

      - `updated: string`

      - `updatedBy: string`

    - `status: "STARTED" or "COMPLETED"`

      Current execution status of the query run.

      - `"STARTED"`

      - `"COMPLETED"`

    - `timeframe: object { from, to }`

      Time range for the query execution

      - `from: number`

        Start timestamp for the query timeframe (Unix timestamp in milliseconds)

      - `to: number`

        End timestamp for the query timeframe (Unix timestamp in milliseconds)

    - `userId: string`

      ID of the user who initiated the query run.

    - `created: optional string`

      ISO-8601 timestamp when the query run was created.

    - `statistics: optional object { bytes_read, elapsed, rows_read, abr_level }`

      Query performance statistics from the database (does not include network latency).

      - `bytes_read: number`

        Number of uncompressed bytes read from the table.

      - `elapsed: number`

        Time in seconds for the query to run.

      - `rows_read: number`

        Number of rows scanned from the table.

      - `abr_level: optional number`

        The level of Adaptive Bit Rate (ABR) sampling used for the query. If empty the ABR level is 1

    - `updated: optional string`

      ISO-8601 timestamp when the query run was last updated.

  - `statistics: object { bytes_read, elapsed, rows_read, abr_level }`

    Query performance statistics from the database. Includes execution time, rows scanned, and bytes read. Does not include network latency.

    - `bytes_read: number`

      Number of uncompressed bytes read from the table.

    - `elapsed: number`

      Time in seconds for the query to run.

    - `rows_read: number`

      Number of rows scanned from the table.

    - `abr_level: optional number`

      The level of Adaptive Bit Rate (ABR) sampling used for the query. If empty the ABR level is 1

  - `agents: optional array of object { agentClass, eventTypeCounts, firstEventMs, 5 more }`

    Durable Object agent summaries. Present when the query view is 'agents'. Each entry represents an agent with its event counts and status.

    - `agentClass: string`

      Class name of the Durable Object agent.

    - `eventTypeCounts: map[number]`

      Breakdown of event counts by event type.

    - `firstEventMs: number`

      Timestamp of the earliest event from this agent in the queried window (Unix epoch ms).

    - `hasErrors: boolean`

      Whether the agent emitted any error events in the queried window.

    - `lastEventMs: number`

      Timestamp of the most recent event from this agent (Unix epoch ms).

    - `namespace: string`

      Durable Object namespace the agent belongs to.

    - `service: string`

      Worker service name that hosts this agent.

    - `totalEvents: number`

      Total number of events emitted by this agent in the queried window.

  - `calculations: optional array of object { aggregates, calculation, series, alias }`

    Aggregated calculation results. Present when the query view is 'calculations'. Contains computed metrics (count, avg, p99, etc.) with optional group-by breakdowns and time-series data.

    - `aggregates: array of object { count, interval, sampleInterval, 2 more }`

      - `count: number`

      - `interval: number`

      - `sampleInterval: number`

      - `value: number`

      - `groups: optional array of object { key, value }`

        - `key: string`

        - `value: string or number or boolean`

          - `string`

          - `number`

          - `boolean`

    - `calculation: string`

    - `series: array of object { data, time }`

      - `data: array of object { count, interval, sampleInterval, 4 more }`

        - `count: number`

        - `interval: number`

        - `sampleInterval: number`

        - `value: number`

        - `firstSeen: optional string`

        - `groups: optional array of object { key, value }`

          - `key: string`

          - `value: string or number or boolean`

            - `string`

            - `number`

            - `boolean`

        - `lastSeen: optional string`

      - `time: string`

    - `alias: optional string`

  - `compare: optional array of object { aggregates, calculation, series, alias }`

    Comparison calculation results from the previous time period. Present when the compare option is enabled. Same structure as calculations.

    - `aggregates: array of object { count, interval, sampleInterval, 2 more }`

      - `count: number`

      - `interval: number`

      - `sampleInterval: number`

      - `value: number`

      - `groups: optional array of object { key, value }`

        - `key: string`

        - `value: string or number or boolean`

          - `string`

          - `number`

          - `boolean`

    - `calculation: string`

    - `series: array of object { data, time }`

      - `data: array of object { count, interval, sampleInterval, 4 more }`

        - `count: number`

        - `interval: number`

        - `sampleInterval: number`

        - `value: number`

        - `firstSeen: optional string`

        - `groups: optional array of object { key, value }`

          - `key: string`

          - `value: string or number or boolean`

            - `string`

            - `number`

            - `boolean`

        - `lastSeen: optional string`

      - `time: string`

    - `alias: optional string`

  - `events: optional object { count, events, fields, series }`

    Individual event results. Present when the query view is 'events'. Contains the matching log lines and their metadata.

    - `count: optional number`

      Total number of events matching the query (may exceed the number returned due to limits).

    - `events: optional array of object { "$metadata", dataset, source, 3 more }`

      List of individual telemetry events matching the query.

      - `"$metadata": object { id, account, cloudService, 28 more }`

        Structured metadata extracted from the event. These fields are indexed and available for filtering and aggregation.

        - `id: string`

          Unique event ID. Use as the cursor value for offset-based pagination.

        - `account: optional string`

          Cloudflare account identifier.

        - `cloudService: optional string`

          Cloudflare product that generated this event (e.g. workers, pages).

        - `coldStart: optional number`

        - `cost: optional number`

          Estimated cost units for this invocation.

        - `duration: optional number`

          Span duration in milliseconds.

        - `endTime: optional number`

          Span end time as a Unix epoch in milliseconds.

        - `error: optional string`

          Error message, present when the log represents an error.

        - `errorTemplate: optional string`

          Templatized version of the error message used for grouping similar errors.

        - `fingerprint: optional string`

          Content-based fingerprint used to group similar events.

        - `level: optional string`

          Log level (e.g. log, debug, info, warn, error).

        - `message: optional string`

          Log message text.

        - `messageTemplate: optional string`

          Templatized version of the log message used for grouping similar messages.

        - `metricName: optional string`

          Metric name when the event represents a metric data point.

        - `origin: optional string`

          Origin of the event (e.g. fetch, scheduled, queue).

        - `parentSpanId: optional string`

          Span ID of the parent span in the trace hierarchy.

        - `provider: optional string`

          Infrastructure provider identifier.

        - `region: optional string`

          Cloudflare data center / region that handled the request.

        - `requestId: optional string`

          Cloudflare request ID that ties all logs from a single invocation together.

        - `service: optional string`

          Worker script name that produced this event.

        - `spanId: optional string`

          Span ID for this individual unit of work within a trace.

        - `spanName: optional string`

          Human-readable name for this span.

        - `stackId: optional string`

          Stack / deployment identifier.

        - `startTime: optional number`

          Span start time as a Unix epoch in milliseconds.

        - `statusCode: optional number`

          HTTP response status code returned by the Worker.

        - `traceDuration: optional number`

          Total duration of the entire trace in milliseconds.

        - `traceId: optional string`

          Distributed trace ID linking spans across services.

        - `transactionName: optional string`

          Logical transaction name for this request.

        - `trigger: optional string`

          What triggered the invocation (e.g. GET /users, POST /orders, queue message).

        - `type: optional string`

          Event type classifier (e.g. cf-worker-event, cf-worker-log).

        - `url: optional string`

          Request URL that triggered the Worker invocation.

      - `dataset: string`

        The dataset this event belongs to (e.g. cloudflare-workers).

      - `source: string or map[unknown]`

        Raw log payload. May be a string or a structured object depending on how the log was emitted.

        - `string`

        - `map[unknown]`

      - `timestamp: number`

        Event timestamp as a Unix epoch in milliseconds.

      - `"$containers": optional map[unknown]`

        Cloudflare Containers event information that enriches your logs for identifying and debugging issues.

      - `"$workers": optional object { eventType, requestId, scriptName, 10 more }  or object { cpuTimeMs, eventType, outcome, 14 more }`

        Cloudflare Workers event information that enriches your logs for identifying and debugging issues.

        - `object { eventType, requestId, scriptName, 10 more }`

          - `eventType: "fetch" or "scheduled" or "alarm" or 9 more`

            - `"fetch"`

            - `"scheduled"`

            - `"alarm"`

            - `"cron"`

            - `"queue"`

            - `"email"`

            - `"tail"`

            - `"rpc"`

            - `"jsrpc"`

            - `"websocket"`

            - `"workflow"`

            - `"unknown"`

          - `requestId: string`

          - `scriptName: string`

          - `durableObjectId: optional string`

          - `entrypoint: optional string`

          - `event: optional map[unknown]`

          - `executionModel: optional "durableObject" or "stateless"`

            - `"durableObject"`

            - `"stateless"`

          - `outcome: optional string`

          - `preview: optional object { id, name, slug }`

            - `id: optional string`

            - `name: optional string`

            - `slug: optional string`

          - `scriptVersion: optional object { id, message, tag }`

            - `id: optional string`

            - `message: optional string`

            - `tag: optional string`

          - `spanId: optional string`

          - `traceId: optional string`

          - `truncated: optional boolean`

        - `object { cpuTimeMs, eventType, outcome, 14 more }`

          - `cpuTimeMs: number`

          - `eventType: "fetch" or "scheduled" or "alarm" or 9 more`

            - `"fetch"`

            - `"scheduled"`

            - `"alarm"`

            - `"cron"`

            - `"queue"`

            - `"email"`

            - `"tail"`

            - `"rpc"`

            - `"jsrpc"`

            - `"websocket"`

            - `"workflow"`

            - `"unknown"`

          - `outcome: string`

          - `requestId: string`

          - `scriptName: string`

          - `wallTimeMs: number`

          - `diagnosticsChannelEvents: optional array of object { channel, message, timestamp }`

            - `channel: string`

            - `message: string`

            - `timestamp: number`

          - `dispatchNamespace: optional string`

          - `durableObjectId: optional string`

          - `entrypoint: optional string`

          - `event: optional map[unknown]`

          - `executionModel: optional "durableObject" or "stateless"`

            - `"durableObject"`

            - `"stateless"`

          - `preview: optional object { id, name, slug }`

            - `id: optional string`

            - `name: optional string`

            - `slug: optional string`

          - `scriptVersion: optional object { id, message, tag }`

            - `id: optional string`

            - `message: optional string`

            - `tag: optional string`

          - `spanId: optional string`

          - `traceId: optional string`

          - `truncated: optional boolean`

    - `fields: optional array of object { key, type }`

      List of fields discovered in the matched events. Useful for building dynamic UIs.

      - `key: string`

        Field name present in the matched events.

      - `type: string`

        Data type of the field (string, number, or boolean).

    - `series: optional array of object { data, time }`

      Time-series data for the matched events, bucketed by the query granularity.

      - `data: array of object { aggregates, count, interval, 3 more }`

        - `aggregates: object { _count, _interval, _firstSeen, 2 more }`

          - `_count: number`

          - `_interval: number`

          - `_firstSeen: optional string`

          - `_lastSeen: optional string`

          - `bin: optional unknown`

        - `count: number`

        - `interval: number`

        - `sampleInterval: number`

        - `errors: optional number`

        - `groups: optional map[string or number or boolean]`

          Groups in the query results.

          - `string`

          - `number`

          - `boolean`

      - `time: string`

  - `invocations: optional map[array of object { "$metadata", dataset, source, 3 more } ]`

    Events grouped by invocation (request ID). Present when the query view is 'invocations'. Each key is a request ID mapping to all events from that invocation.

    - `"$metadata": object { id, account, cloudService, 28 more }`

      Structured metadata extracted from the event. These fields are indexed and available for filtering and aggregation.

      - `id: string`

        Unique event ID. Use as the cursor value for offset-based pagination.

      - `account: optional string`

        Cloudflare account identifier.

      - `cloudService: optional string`

        Cloudflare product that generated this event (e.g. workers, pages).

      - `coldStart: optional number`

      - `cost: optional number`

        Estimated cost units for this invocation.

      - `duration: optional number`

        Span duration in milliseconds.

      - `endTime: optional number`

        Span end time as a Unix epoch in milliseconds.

      - `error: optional string`

        Error message, present when the log represents an error.

      - `errorTemplate: optional string`

        Templatized version of the error message used for grouping similar errors.

      - `fingerprint: optional string`

        Content-based fingerprint used to group similar events.

      - `level: optional string`

        Log level (e.g. log, debug, info, warn, error).

      - `message: optional string`

        Log message text.

      - `messageTemplate: optional string`

        Templatized version of the log message used for grouping similar messages.

      - `metricName: optional string`

        Metric name when the event represents a metric data point.

      - `origin: optional string`

        Origin of the event (e.g. fetch, scheduled, queue).

      - `parentSpanId: optional string`

        Span ID of the parent span in the trace hierarchy.

      - `provider: optional string`

        Infrastructure provider identifier.

      - `region: optional string`

        Cloudflare data center / region that handled the request.

      - `requestId: optional string`

        Cloudflare request ID that ties all logs from a single invocation together.

      - `service: optional string`

        Worker script name that produced this event.

      - `spanId: optional string`

        Span ID for this individual unit of work within a trace.

      - `spanName: optional string`

        Human-readable name for this span.

      - `stackId: optional string`

        Stack / deployment identifier.

      - `startTime: optional number`

        Span start time as a Unix epoch in milliseconds.

      - `statusCode: optional number`

        HTTP response status code returned by the Worker.

      - `traceDuration: optional number`

        Total duration of the entire trace in milliseconds.

      - `traceId: optional string`

        Distributed trace ID linking spans across services.

      - `transactionName: optional string`

        Logical transaction name for this request.

      - `trigger: optional string`

        What triggered the invocation (e.g. GET /users, POST /orders, queue message).

      - `type: optional string`

        Event type classifier (e.g. cf-worker-event, cf-worker-log).

      - `url: optional string`

        Request URL that triggered the Worker invocation.

    - `dataset: string`

      The dataset this event belongs to (e.g. cloudflare-workers).

    - `source: string or map[unknown]`

      Raw log payload. May be a string or a structured object depending on how the log was emitted.

      - `string`

      - `map[unknown]`

    - `timestamp: number`

      Event timestamp as a Unix epoch in milliseconds.

    - `"$containers": optional map[unknown]`

      Cloudflare Containers event information that enriches your logs for identifying and debugging issues.

    - `"$workers": optional object { eventType, requestId, scriptName, 10 more }  or object { cpuTimeMs, eventType, outcome, 14 more }`

      Cloudflare Workers event information that enriches your logs for identifying and debugging issues.

      - `object { eventType, requestId, scriptName, 10 more }`

        - `eventType: "fetch" or "scheduled" or "alarm" or 9 more`

          - `"fetch"`

          - `"scheduled"`

          - `"alarm"`

          - `"cron"`

          - `"queue"`

          - `"email"`

          - `"tail"`

          - `"rpc"`

          - `"jsrpc"`

          - `"websocket"`

          - `"workflow"`

          - `"unknown"`

        - `requestId: string`

        - `scriptName: string`

        - `durableObjectId: optional string`

        - `entrypoint: optional string`

        - `event: optional map[unknown]`

        - `executionModel: optional "durableObject" or "stateless"`

          - `"durableObject"`

          - `"stateless"`

        - `outcome: optional string`

        - `preview: optional object { id, name, slug }`

          - `id: optional string`

          - `name: optional string`

          - `slug: optional string`

        - `scriptVersion: optional object { id, message, tag }`

          - `id: optional string`

          - `message: optional string`

          - `tag: optional string`

        - `spanId: optional string`

        - `traceId: optional string`

        - `truncated: optional boolean`

      - `object { cpuTimeMs, eventType, outcome, 14 more }`

        - `cpuTimeMs: number`

        - `eventType: "fetch" or "scheduled" or "alarm" or 9 more`

          - `"fetch"`

          - `"scheduled"`

          - `"alarm"`

          - `"cron"`

          - `"queue"`

          - `"email"`

          - `"tail"`

          - `"rpc"`

          - `"jsrpc"`

          - `"websocket"`

          - `"workflow"`

          - `"unknown"`

        - `outcome: string`

        - `requestId: string`

        - `scriptName: string`

        - `wallTimeMs: number`

        - `diagnosticsChannelEvents: optional array of object { channel, message, timestamp }`

          - `channel: string`

          - `message: string`

          - `timestamp: number`

        - `dispatchNamespace: optional string`

        - `durableObjectId: optional string`

        - `entrypoint: optional string`

        - `event: optional map[unknown]`

        - `executionModel: optional "durableObject" or "stateless"`

          - `"durableObject"`

          - `"stateless"`

        - `preview: optional object { id, name, slug }`

          - `id: optional string`

          - `name: optional string`

          - `slug: optional string`

        - `scriptVersion: optional object { id, message, tag }`

          - `id: optional string`

          - `message: optional string`

          - `tag: optional string`

        - `spanId: optional string`

        - `traceId: optional string`

        - `truncated: optional boolean`

  - `traces: optional array of object { rootSpanName, rootTransactionName, service, 6 more }`

    Trace summaries matching the query. Present when the query view is 'traces'. Each entry represents a distributed trace with its spans, duration, and services involved.

    - `rootSpanName: string`

      Name of the root span that initiated the trace.

    - `rootTransactionName: string`

      Logical transaction name for the root span.

    - `service: array of string`

      List of Worker services involved in the trace.

    - `spans: number`

      Total number of spans in the trace.

    - `traceDurationMs: number`

      Total duration of the trace in milliseconds.

    - `traceEndMs: number`

      Trace end time as a Unix epoch in milliseconds.

    - `traceId: string`

      Unique identifier for the distributed trace.

    - `traceStartMs: number`

      Trace start time as a Unix epoch in milliseconds.

    - `errors: optional array of string`

      Error messages encountered during the trace, if any.

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/shared/query/$ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "Successful request"
    }
  ],
  "result": {
    "run": {
      "id": "id",
      "accountId": "accountId",
      "dry": true,
      "granularity": 0,
      "query": {
        "id": "id",
        "adhoc": true,
        "created": "created",
        "createdBy": "createdBy",
        "description": "Query description",
        "name": "x",
        "parameters": {
          "calculations": [
            {
              "operator": "uniq",
              "alias": "alias",
              "key": "key",
              "keyType": "string"
            }
          ],
          "datasets": [
            "string"
          ],
          "filterCombination": "and",
          "filters": [
            {
              "filterCombination": "and",
              "filters": [
                {}
              ],
              "kind": "group"
            }
          ],
          "groupBys": [
            {
              "type": "string",
              "value": "value"
            }
          ],
          "havings": [
            {
              "key": "key",
              "operation": "eq",
              "value": 0
            }
          ],
          "limit": 0,
          "needle": {
            "value": {
              "0": "s",
              "1": "t",
              "2": "r",
              "3": "i",
              "4": "n",
              "5": "g"
            },
            "isRegex": true,
            "matchCase": true
          },
          "orderBy": {
            "value": "value",
            "order": "asc"
          }
        },
        "updated": "updated",
        "updatedBy": "updatedBy"
      },
      "status": "STARTED",
      "timeframe": {
        "from": 0,
        "to": 0
      },
      "userId": "userId",
      "created": "created",
      "statistics": {
        "bytes_read": 0,
        "elapsed": 0,
        "rows_read": 0,
        "abr_level": 0
      },
      "updated": "updated"
    },
    "statistics": {
      "bytes_read": 0,
      "elapsed": 0,
      "rows_read": 0,
      "abr_level": 0
    },
    "agents": [
      {
        "agentClass": "agentClass",
        "eventTypeCounts": {
          "foo": 0
        },
        "firstEventMs": 0,
        "hasErrors": true,
        "lastEventMs": 0,
        "namespace": "namespace",
        "service": "service",
        "totalEvents": 0
      }
    ],
    "calculations": [
      {
        "aggregates": [
          {
            "count": 0,
            "interval": 0,
            "sampleInterval": 0,
            "value": 0,
            "groups": [
              {
                "key": "key",
                "value": "string"
              }
            ]
          }
        ],
        "calculation": "calculation",
        "series": [
          {
            "data": [
              {
                "count": 0,
                "interval": 0,
                "sampleInterval": 0,
                "value": 0,
                "firstSeen": "firstSeen",
                "groups": [
                  {
                    "key": "key",
                    "value": "string"
                  }
                ],
                "lastSeen": "lastSeen"
              }
            ],
            "time": "time"
          }
        ],
        "alias": "alias"
      }
    ],
    "compare": [
      {
        "aggregates": [
          {
            "count": 0,
            "interval": 0,
            "sampleInterval": 0,
            "value": 0,
            "groups": [
              {
                "key": "key",
                "value": "string"
              }
            ]
          }
        ],
        "calculation": "calculation",
        "series": [
          {
            "data": [
              {
                "count": 0,
                "interval": 0,
                "sampleInterval": 0,
                "value": 0,
                "firstSeen": "firstSeen",
                "groups": [
                  {
                    "key": "key",
                    "value": "string"
                  }
                ],
                "lastSeen": "lastSeen"
              }
            ],
            "time": "time"
          }
        ],
        "alias": "alias"
      }
    ],
    "events": {
      "count": 0,
      "events": [
        {
          "$metadata": {
            "id": "id",
            "account": "account",
            "cloudService": "cloudService",
            "coldStart": 1,
            "cost": 1,
            "duration": 1,
            "endTime": 0,
            "error": "error",
            "errorTemplate": "errorTemplate",
            "fingerprint": "fingerprint",
            "level": "level",
            "message": "message",
            "messageTemplate": "messageTemplate",
            "metricName": "metricName",
            "origin": "origin",
            "parentSpanId": "parentSpanId",
            "provider": "provider",
            "region": "region",
            "requestId": "requestId",
            "service": "service",
            "spanId": "spanId",
            "spanName": "spanName",
            "stackId": "stackId",
            "startTime": 0,
            "statusCode": 1,
            "traceDuration": 1,
            "traceId": "traceId",
            "transactionName": "transactionName",
            "trigger": "trigger",
            "type": "type",
            "url": "url"
          },
          "dataset": "dataset",
          "source": "string",
          "timestamp": 0,
          "$containers": {
            "foo": "bar"
          },
          "$workers": {
            "eventType": "fetch",
            "requestId": "requestId",
            "scriptName": "scriptName",
            "durableObjectId": "durableObjectId",
            "entrypoint": "entrypoint",
            "event": {
              "foo": "bar"
            },
            "executionModel": "durableObject",
            "outcome": "outcome",
            "preview": {
              "id": "id",
              "name": "name",
              "slug": "slug"
            },
            "scriptVersion": {
              "id": "id",
              "message": "message",
              "tag": "tag"
            },
            "spanId": "spanId",
            "traceId": "traceId",
            "truncated": true
          }
        }
      ],
      "fields": [
        {
          "key": "key",
          "type": "type"
        }
      ],
      "series": [
        {
          "data": [
            {
              "aggregates": {
                "_count": 1,
                "_interval": 1,
                "_firstSeen": "_firstSeen",
                "_lastSeen": "_lastSeen",
                "bin": {}
              },
              "count": 0,
              "interval": 0,
              "sampleInterval": 0,
              "errors": 0,
              "groups": {
                "foo": "string"
              }
            }
          ],
          "time": "time"
        }
      ]
    },
    "invocations": {
      "foo": [
        {
          "$metadata": {
            "id": "id",
            "account": "account",
            "cloudService": "cloudService",
            "coldStart": 1,
            "cost": 1,
            "duration": 1,
            "endTime": 0,
            "error": "error",
            "errorTemplate": "errorTemplate",
            "fingerprint": "fingerprint",
            "level": "level",
            "message": "message",
            "messageTemplate": "messageTemplate",
            "metricName": "metricName",
            "origin": "origin",
            "parentSpanId": "parentSpanId",
            "provider": "provider",
            "region": "region",
            "requestId": "requestId",
            "service": "service",
            "spanId": "spanId",
            "spanName": "spanName",
            "stackId": "stackId",
            "startTime": 0,
            "statusCode": 1,
            "traceDuration": 1,
            "traceId": "traceId",
            "transactionName": "transactionName",
            "trigger": "trigger",
            "type": "type",
            "url": "url"
          },
          "dataset": "dataset",
          "source": "string",
          "timestamp": 0,
          "$containers": {
            "foo": "bar"
          },
          "$workers": {
            "eventType": "fetch",
            "requestId": "requestId",
            "scriptName": "scriptName",
            "durableObjectId": "durableObjectId",
            "entrypoint": "entrypoint",
            "event": {
              "foo": "bar"
            },
            "executionModel": "durableObject",
            "outcome": "outcome",
            "preview": {
              "id": "id",
              "name": "name",
              "slug": "slug"
            },
            "scriptVersion": {
              "id": "id",
              "message": "message",
              "tag": "tag"
            },
            "spanId": "spanId",
            "traceId": "traceId",
            "truncated": true
          }
        }
      ]
    },
    "traces": [
      {
        "rootSpanName": "rootSpanName",
        "rootTransactionName": "rootTransactionName",
        "service": [
          "string"
        ],
        "spans": 0,
        "traceDurationMs": 0,
        "traceEndMs": 0,
        "traceId": "traceId",
        "traceStartMs": 0,
        "errors": [
          "string"
        ]
      }
    ]
  },
  "success": true
}
```

## Domain Types

### Shared Query Create Response

- `SharedQueryCreateResponse object { id }`

  - `id: string`

    Specify the ID of the shared query.

### Shared Query Get Response

- `SharedQueryGetResponse object { run, statistics, agents, 5 more }`

  Complete results of a query run. The populated fields depend on the requested view type (events, calculations, invocations, traces, or agents).

  - `run: object { id, accountId, dry, 8 more }`

    Represents a single execution of a query against Workers Observability data, including the query definition, execution status, and performance statistics.

    - `id: string`

      Unique identifier for this query run.

    - `accountId: string`

      Cloudflare account ID that owns this query run.

    - `dry: boolean`

      Whether this was a dry run (results not persisted).

    - `granularity: number`

      Number of time-series buckets used for the query. Higher values produce more detailed series data.

    - `query: object { id, adhoc, created, 6 more }`

      A saved query definition with its parameters, metadata, and ownership information.

      - `id: string`

      - `adhoc: boolean`

        If the query wasn't explcitly saved

      - `created: string`

      - `createdBy: string`

      - `description: string`

      - `name: string`

        Query name

      - `parameters: object { calculations, datasets, filterCombination, 6 more }`

        - `calculations: optional array of object { operator, alias, key, keyType }`

          Create Calculations to compute as part of the query.

          - `operator: "uniq" or "count" or "max" or 35 more`

            - `"uniq"`

            - `"count"`

            - `"max"`

            - `"min"`

            - `"sum"`

            - `"avg"`

            - `"median"`

            - `"p001"`

            - `"p01"`

            - `"p05"`

            - `"p10"`

            - `"p25"`

            - `"p75"`

            - `"p90"`

            - `"p95"`

            - `"p99"`

            - `"p999"`

            - `"stddev"`

            - `"variance"`

            - `"COUNT_DISTINCT"`

            - `"COUNT"`

            - `"MAX"`

            - `"MIN"`

            - `"SUM"`

            - `"AVG"`

            - `"MEDIAN"`

            - `"P001"`

            - `"P01"`

            - `"P05"`

            - `"P10"`

            - `"P25"`

            - `"P75"`

            - `"P90"`

            - `"P95"`

            - `"P99"`

            - `"P999"`

            - `"STDDEV"`

            - `"VARIANCE"`

          - `alias: optional string`

          - `key: optional string`

          - `keyType: optional "string" or "number" or "boolean"`

            - `"string"`

            - `"number"`

            - `"boolean"`

        - `datasets: optional array of string`

          Set the Datasets to query. Leave it empty to query all the datasets.

        - `filterCombination: optional "and" or "or" or "AND" or "OR"`

          Set a Flag to describe how to combine the filters on the query.

          - `"and"`

          - `"or"`

          - `"AND"`

          - `"OR"`

        - `filters: optional array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

          Configure the Filters to apply to the query. Supports nested groups via kind: 'group'.

          - `object { filterCombination, filters, kind }`

            - `filterCombination: "and" or "or" or "AND" or "OR"`

              - `"and"`

              - `"or"`

              - `"AND"`

              - `"OR"`

            - `filters: array of unknown`

            - `kind: "group"`

              - `"group"`

          - `WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }`

            A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

            - `key: string`

              Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

            - `operation: "includes" or "not_includes" or "starts_with" or 27 more`

              Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

              - `"includes"`

              - `"not_includes"`

              - `"starts_with"`

              - `"ends_with"`

              - `"regex"`

              - `"exists"`

              - `"is_null"`

              - `"in"`

              - `"not_in"`

              - `"eq"`

              - `"neq"`

              - `"gt"`

              - `"gte"`

              - `"lt"`

              - `"lte"`

              - `"="`

              - `"!="`

              - `">"`

              - `">="`

              - `"<"`

              - `"<="`

              - `"INCLUDES"`

              - `"DOES_NOT_INCLUDE"`

              - `"MATCH_REGEX"`

              - `"EXISTS"`

              - `"DOES_NOT_EXIST"`

              - `"IN"`

              - `"NOT_IN"`

              - `"STARTS_WITH"`

              - `"ENDS_WITH"`

            - `type: "string" or "number" or "boolean"`

              Data type of the filter field. Must match the actual type of the key being filtered.

              - `"string"`

              - `"number"`

              - `"boolean"`

            - `kind: optional "filter"`

              Discriminator for leaf filter nodes. Always 'filter' when present; may be omitted.

              - `"filter"`

            - `value: optional string or number or boolean`

              Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

              - `string`

              - `number`

              - `boolean`

        - `groupBys: optional array of object { type, value }`

          Define how to group the results of the query.

          - `type: "string" or "number" or "boolean"`

            - `"string"`

            - `"number"`

            - `"boolean"`

          - `value: string`

        - `havings: optional array of object { key, operation, value }`

          Configure the Having clauses that filter on calculations in the query result.

          - `key: string`

          - `operation: "eq" or "neq" or "gt" or 3 more`

            - `"eq"`

            - `"neq"`

            - `"gt"`

            - `"gte"`

            - `"lt"`

            - `"lte"`

          - `value: number`

        - `limit: optional number`

          Set a limit on the number of results / records returned by the query

        - `needle: optional object { value, isRegex, matchCase }`

          Define an expression to search using full-text search.

          - `value:`

          - `isRegex: optional boolean`

          - `matchCase: optional boolean`

        - `orderBy: optional object { value, order }`

          Configure the order of the results returned by the query.

          - `value: string`

            Configure which Calculation to order the results by.

          - `order: optional "asc" or "desc"`

            Set the order of the results

            - `"asc"`

            - `"desc"`

      - `updated: string`

      - `updatedBy: string`

    - `status: "STARTED" or "COMPLETED"`

      Current execution status of the query run.

      - `"STARTED"`

      - `"COMPLETED"`

    - `timeframe: object { from, to }`

      Time range for the query execution

      - `from: number`

        Start timestamp for the query timeframe (Unix timestamp in milliseconds)

      - `to: number`

        End timestamp for the query timeframe (Unix timestamp in milliseconds)

    - `userId: string`

      ID of the user who initiated the query run.

    - `created: optional string`

      ISO-8601 timestamp when the query run was created.

    - `statistics: optional object { bytes_read, elapsed, rows_read, abr_level }`

      Query performance statistics from the database (does not include network latency).

      - `bytes_read: number`

        Number of uncompressed bytes read from the table.

      - `elapsed: number`

        Time in seconds for the query to run.

      - `rows_read: number`

        Number of rows scanned from the table.

      - `abr_level: optional number`

        The level of Adaptive Bit Rate (ABR) sampling used for the query. If empty the ABR level is 1

    - `updated: optional string`

      ISO-8601 timestamp when the query run was last updated.

  - `statistics: object { bytes_read, elapsed, rows_read, abr_level }`

    Query performance statistics from the database. Includes execution time, rows scanned, and bytes read. Does not include network latency.

    - `bytes_read: number`

      Number of uncompressed bytes read from the table.

    - `elapsed: number`

      Time in seconds for the query to run.

    - `rows_read: number`

      Number of rows scanned from the table.

    - `abr_level: optional number`

      The level of Adaptive Bit Rate (ABR) sampling used for the query. If empty the ABR level is 1

  - `agents: optional array of object { agentClass, eventTypeCounts, firstEventMs, 5 more }`

    Durable Object agent summaries. Present when the query view is 'agents'. Each entry represents an agent with its event counts and status.

    - `agentClass: string`

      Class name of the Durable Object agent.

    - `eventTypeCounts: map[number]`

      Breakdown of event counts by event type.

    - `firstEventMs: number`

      Timestamp of the earliest event from this agent in the queried window (Unix epoch ms).

    - `hasErrors: boolean`

      Whether the agent emitted any error events in the queried window.

    - `lastEventMs: number`

      Timestamp of the most recent event from this agent (Unix epoch ms).

    - `namespace: string`

      Durable Object namespace the agent belongs to.

    - `service: string`

      Worker service name that hosts this agent.

    - `totalEvents: number`

      Total number of events emitted by this agent in the queried window.

  - `calculations: optional array of object { aggregates, calculation, series, alias }`

    Aggregated calculation results. Present when the query view is 'calculations'. Contains computed metrics (count, avg, p99, etc.) with optional group-by breakdowns and time-series data.

    - `aggregates: array of object { count, interval, sampleInterval, 2 more }`

      - `count: number`

      - `interval: number`

      - `sampleInterval: number`

      - `value: number`

      - `groups: optional array of object { key, value }`

        - `key: string`

        - `value: string or number or boolean`

          - `string`

          - `number`

          - `boolean`

    - `calculation: string`

    - `series: array of object { data, time }`

      - `data: array of object { count, interval, sampleInterval, 4 more }`

        - `count: number`

        - `interval: number`

        - `sampleInterval: number`

        - `value: number`

        - `firstSeen: optional string`

        - `groups: optional array of object { key, value }`

          - `key: string`

          - `value: string or number or boolean`

            - `string`

            - `number`

            - `boolean`

        - `lastSeen: optional string`

      - `time: string`

    - `alias: optional string`

  - `compare: optional array of object { aggregates, calculation, series, alias }`

    Comparison calculation results from the previous time period. Present when the compare option is enabled. Same structure as calculations.

    - `aggregates: array of object { count, interval, sampleInterval, 2 more }`

      - `count: number`

      - `interval: number`

      - `sampleInterval: number`

      - `value: number`

      - `groups: optional array of object { key, value }`

        - `key: string`

        - `value: string or number or boolean`

          - `string`

          - `number`

          - `boolean`

    - `calculation: string`

    - `series: array of object { data, time }`

      - `data: array of object { count, interval, sampleInterval, 4 more }`

        - `count: number`

        - `interval: number`

        - `sampleInterval: number`

        - `value: number`

        - `firstSeen: optional string`

        - `groups: optional array of object { key, value }`

          - `key: string`

          - `value: string or number or boolean`

            - `string`

            - `number`

            - `boolean`

        - `lastSeen: optional string`

      - `time: string`

    - `alias: optional string`

  - `events: optional object { count, events, fields, series }`

    Individual event results. Present when the query view is 'events'. Contains the matching log lines and their metadata.

    - `count: optional number`

      Total number of events matching the query (may exceed the number returned due to limits).

    - `events: optional array of object { "$metadata", dataset, source, 3 more }`

      List of individual telemetry events matching the query.

      - `"$metadata": object { id, account, cloudService, 28 more }`

        Structured metadata extracted from the event. These fields are indexed and available for filtering and aggregation.

        - `id: string`

          Unique event ID. Use as the cursor value for offset-based pagination.

        - `account: optional string`

          Cloudflare account identifier.

        - `cloudService: optional string`

          Cloudflare product that generated this event (e.g. workers, pages).

        - `coldStart: optional number`

        - `cost: optional number`

          Estimated cost units for this invocation.

        - `duration: optional number`

          Span duration in milliseconds.

        - `endTime: optional number`

          Span end time as a Unix epoch in milliseconds.

        - `error: optional string`

          Error message, present when the log represents an error.

        - `errorTemplate: optional string`

          Templatized version of the error message used for grouping similar errors.

        - `fingerprint: optional string`

          Content-based fingerprint used to group similar events.

        - `level: optional string`

          Log level (e.g. log, debug, info, warn, error).

        - `message: optional string`

          Log message text.

        - `messageTemplate: optional string`

          Templatized version of the log message used for grouping similar messages.

        - `metricName: optional string`

          Metric name when the event represents a metric data point.

        - `origin: optional string`

          Origin of the event (e.g. fetch, scheduled, queue).

        - `parentSpanId: optional string`

          Span ID of the parent span in the trace hierarchy.

        - `provider: optional string`

          Infrastructure provider identifier.

        - `region: optional string`

          Cloudflare data center / region that handled the request.

        - `requestId: optional string`

          Cloudflare request ID that ties all logs from a single invocation together.

        - `service: optional string`

          Worker script name that produced this event.

        - `spanId: optional string`

          Span ID for this individual unit of work within a trace.

        - `spanName: optional string`

          Human-readable name for this span.

        - `stackId: optional string`

          Stack / deployment identifier.

        - `startTime: optional number`

          Span start time as a Unix epoch in milliseconds.

        - `statusCode: optional number`

          HTTP response status code returned by the Worker.

        - `traceDuration: optional number`

          Total duration of the entire trace in milliseconds.

        - `traceId: optional string`

          Distributed trace ID linking spans across services.

        - `transactionName: optional string`

          Logical transaction name for this request.

        - `trigger: optional string`

          What triggered the invocation (e.g. GET /users, POST /orders, queue message).

        - `type: optional string`

          Event type classifier (e.g. cf-worker-event, cf-worker-log).

        - `url: optional string`

          Request URL that triggered the Worker invocation.

      - `dataset: string`

        The dataset this event belongs to (e.g. cloudflare-workers).

      - `source: string or map[unknown]`

        Raw log payload. May be a string or a structured object depending on how the log was emitted.

        - `string`

        - `map[unknown]`

      - `timestamp: number`

        Event timestamp as a Unix epoch in milliseconds.

      - `"$containers": optional map[unknown]`

        Cloudflare Containers event information that enriches your logs for identifying and debugging issues.

      - `"$workers": optional object { eventType, requestId, scriptName, 10 more }  or object { cpuTimeMs, eventType, outcome, 14 more }`

        Cloudflare Workers event information that enriches your logs for identifying and debugging issues.

        - `object { eventType, requestId, scriptName, 10 more }`

          - `eventType: "fetch" or "scheduled" or "alarm" or 9 more`

            - `"fetch"`

            - `"scheduled"`

            - `"alarm"`

            - `"cron"`

            - `"queue"`

            - `"email"`

            - `"tail"`

            - `"rpc"`

            - `"jsrpc"`

            - `"websocket"`

            - `"workflow"`

            - `"unknown"`

          - `requestId: string`

          - `scriptName: string`

          - `durableObjectId: optional string`

          - `entrypoint: optional string`

          - `event: optional map[unknown]`

          - `executionModel: optional "durableObject" or "stateless"`

            - `"durableObject"`

            - `"stateless"`

          - `outcome: optional string`

          - `preview: optional object { id, name, slug }`

            - `id: optional string`

            - `name: optional string`

            - `slug: optional string`

          - `scriptVersion: optional object { id, message, tag }`

            - `id: optional string`

            - `message: optional string`

            - `tag: optional string`

          - `spanId: optional string`

          - `traceId: optional string`

          - `truncated: optional boolean`

        - `object { cpuTimeMs, eventType, outcome, 14 more }`

          - `cpuTimeMs: number`

          - `eventType: "fetch" or "scheduled" or "alarm" or 9 more`

            - `"fetch"`

            - `"scheduled"`

            - `"alarm"`

            - `"cron"`

            - `"queue"`

            - `"email"`

            - `"tail"`

            - `"rpc"`

            - `"jsrpc"`

            - `"websocket"`

            - `"workflow"`

            - `"unknown"`

          - `outcome: string`

          - `requestId: string`

          - `scriptName: string`

          - `wallTimeMs: number`

          - `diagnosticsChannelEvents: optional array of object { channel, message, timestamp }`

            - `channel: string`

            - `message: string`

            - `timestamp: number`

          - `dispatchNamespace: optional string`

          - `durableObjectId: optional string`

          - `entrypoint: optional string`

          - `event: optional map[unknown]`

          - `executionModel: optional "durableObject" or "stateless"`

            - `"durableObject"`

            - `"stateless"`

          - `preview: optional object { id, name, slug }`

            - `id: optional string`

            - `name: optional string`

            - `slug: optional string`

          - `scriptVersion: optional object { id, message, tag }`

            - `id: optional string`

            - `message: optional string`

            - `tag: optional string`

          - `spanId: optional string`

          - `traceId: optional string`

          - `truncated: optional boolean`

    - `fields: optional array of object { key, type }`

      List of fields discovered in the matched events. Useful for building dynamic UIs.

      - `key: string`

        Field name present in the matched events.

      - `type: string`

        Data type of the field (string, number, or boolean).

    - `series: optional array of object { data, time }`

      Time-series data for the matched events, bucketed by the query granularity.

      - `data: array of object { aggregates, count, interval, 3 more }`

        - `aggregates: object { _count, _interval, _firstSeen, 2 more }`

          - `_count: number`

          - `_interval: number`

          - `_firstSeen: optional string`

          - `_lastSeen: optional string`

          - `bin: optional unknown`

        - `count: number`

        - `interval: number`

        - `sampleInterval: number`

        - `errors: optional number`

        - `groups: optional map[string or number or boolean]`

          Groups in the query results.

          - `string`

          - `number`

          - `boolean`

      - `time: string`

  - `invocations: optional map[array of object { "$metadata", dataset, source, 3 more } ]`

    Events grouped by invocation (request ID). Present when the query view is 'invocations'. Each key is a request ID mapping to all events from that invocation.

    - `"$metadata": object { id, account, cloudService, 28 more }`

      Structured metadata extracted from the event. These fields are indexed and available for filtering and aggregation.

      - `id: string`

        Unique event ID. Use as the cursor value for offset-based pagination.

      - `account: optional string`

        Cloudflare account identifier.

      - `cloudService: optional string`

        Cloudflare product that generated this event (e.g. workers, pages).

      - `coldStart: optional number`

      - `cost: optional number`

        Estimated cost units for this invocation.

      - `duration: optional number`

        Span duration in milliseconds.

      - `endTime: optional number`

        Span end time as a Unix epoch in milliseconds.

      - `error: optional string`

        Error message, present when the log represents an error.

      - `errorTemplate: optional string`

        Templatized version of the error message used for grouping similar errors.

      - `fingerprint: optional string`

        Content-based fingerprint used to group similar events.

      - `level: optional string`

        Log level (e.g. log, debug, info, warn, error).

      - `message: optional string`

        Log message text.

      - `messageTemplate: optional string`

        Templatized version of the log message used for grouping similar messages.

      - `metricName: optional string`

        Metric name when the event represents a metric data point.

      - `origin: optional string`

        Origin of the event (e.g. fetch, scheduled, queue).

      - `parentSpanId: optional string`

        Span ID of the parent span in the trace hierarchy.

      - `provider: optional string`

        Infrastructure provider identifier.

      - `region: optional string`

        Cloudflare data center / region that handled the request.

      - `requestId: optional string`

        Cloudflare request ID that ties all logs from a single invocation together.

      - `service: optional string`

        Worker script name that produced this event.

      - `spanId: optional string`

        Span ID for this individual unit of work within a trace.

      - `spanName: optional string`

        Human-readable name for this span.

      - `stackId: optional string`

        Stack / deployment identifier.

      - `startTime: optional number`

        Span start time as a Unix epoch in milliseconds.

      - `statusCode: optional number`

        HTTP response status code returned by the Worker.

      - `traceDuration: optional number`

        Total duration of the entire trace in milliseconds.

      - `traceId: optional string`

        Distributed trace ID linking spans across services.

      - `transactionName: optional string`

        Logical transaction name for this request.

      - `trigger: optional string`

        What triggered the invocation (e.g. GET /users, POST /orders, queue message).

      - `type: optional string`

        Event type classifier (e.g. cf-worker-event, cf-worker-log).

      - `url: optional string`

        Request URL that triggered the Worker invocation.

    - `dataset: string`

      The dataset this event belongs to (e.g. cloudflare-workers).

    - `source: string or map[unknown]`

      Raw log payload. May be a string or a structured object depending on how the log was emitted.

      - `string`

      - `map[unknown]`

    - `timestamp: number`

      Event timestamp as a Unix epoch in milliseconds.

    - `"$containers": optional map[unknown]`

      Cloudflare Containers event information that enriches your logs for identifying and debugging issues.

    - `"$workers": optional object { eventType, requestId, scriptName, 10 more }  or object { cpuTimeMs, eventType, outcome, 14 more }`

      Cloudflare Workers event information that enriches your logs for identifying and debugging issues.

      - `object { eventType, requestId, scriptName, 10 more }`

        - `eventType: "fetch" or "scheduled" or "alarm" or 9 more`

          - `"fetch"`

          - `"scheduled"`

          - `"alarm"`

          - `"cron"`

          - `"queue"`

          - `"email"`

          - `"tail"`

          - `"rpc"`

          - `"jsrpc"`

          - `"websocket"`

          - `"workflow"`

          - `"unknown"`

        - `requestId: string`

        - `scriptName: string`

        - `durableObjectId: optional string`

        - `entrypoint: optional string`

        - `event: optional map[unknown]`

        - `executionModel: optional "durableObject" or "stateless"`

          - `"durableObject"`

          - `"stateless"`

        - `outcome: optional string`

        - `preview: optional object { id, name, slug }`

          - `id: optional string`

          - `name: optional string`

          - `slug: optional string`

        - `scriptVersion: optional object { id, message, tag }`

          - `id: optional string`

          - `message: optional string`

          - `tag: optional string`

        - `spanId: optional string`

        - `traceId: optional string`

        - `truncated: optional boolean`

      - `object { cpuTimeMs, eventType, outcome, 14 more }`

        - `cpuTimeMs: number`

        - `eventType: "fetch" or "scheduled" or "alarm" or 9 more`

          - `"fetch"`

          - `"scheduled"`

          - `"alarm"`

          - `"cron"`

          - `"queue"`

          - `"email"`

          - `"tail"`

          - `"rpc"`

          - `"jsrpc"`

          - `"websocket"`

          - `"workflow"`

          - `"unknown"`

        - `outcome: string`

        - `requestId: string`

        - `scriptName: string`

        - `wallTimeMs: number`

        - `diagnosticsChannelEvents: optional array of object { channel, message, timestamp }`

          - `channel: string`

          - `message: string`

          - `timestamp: number`

        - `dispatchNamespace: optional string`

        - `durableObjectId: optional string`

        - `entrypoint: optional string`

        - `event: optional map[unknown]`

        - `executionModel: optional "durableObject" or "stateless"`

          - `"durableObject"`

          - `"stateless"`

        - `preview: optional object { id, name, slug }`

          - `id: optional string`

          - `name: optional string`

          - `slug: optional string`

        - `scriptVersion: optional object { id, message, tag }`

          - `id: optional string`

          - `message: optional string`

          - `tag: optional string`

        - `spanId: optional string`

        - `traceId: optional string`

        - `truncated: optional boolean`

  - `traces: optional array of object { rootSpanName, rootTransactionName, service, 6 more }`

    Trace summaries matching the query. Present when the query view is 'traces'. Each entry represents a distributed trace with its spans, duration, and services involved.

    - `rootSpanName: string`

      Name of the root span that initiated the trace.

    - `rootTransactionName: string`

      Logical transaction name for the root span.

    - `service: array of string`

      List of Worker services involved in the trace.

    - `spans: number`

      Total number of spans in the trace.

    - `traceDurationMs: number`

      Total duration of the trace in milliseconds.

    - `traceEndMs: number`

      Trace end time as a Unix epoch in milliseconds.

    - `traceId: string`

      Unique identifier for the distributed trace.

    - `traceStartMs: number`

      Trace start time as a Unix epoch in milliseconds.

    - `errors: optional array of string`

      Error messages encountered during the trace, if any.
