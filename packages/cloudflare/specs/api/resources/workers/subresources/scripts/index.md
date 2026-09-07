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
