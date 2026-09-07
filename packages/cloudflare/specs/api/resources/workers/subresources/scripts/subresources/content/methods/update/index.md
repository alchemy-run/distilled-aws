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
