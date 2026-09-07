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
