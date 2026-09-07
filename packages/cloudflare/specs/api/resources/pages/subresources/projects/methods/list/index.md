## Get projects

**get** `/accounts/{account_id}/pages/projects`

Fetch a list of all user projects.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `page: optional number`

  Which page of projects to fetch.

- `per_page: optional number`

  How many projects to return per page.

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

- `result: array of Project`

  - `id: string`

    ID of the project.

  - `canonical_deployment: Deployment`

    Most recent production deployment of the project.

    - `id: string`

      Id of the deployment.

    - `aliases: array of string`

      A list of alias URLs pointing to this deployment.

    - `build_config: object { web_analytics_tag, web_analytics_token, build_caching, 3 more }`

      Configs for the project build process.

      - `web_analytics_tag: string`

        The classifying tag for analytics.

      - `web_analytics_token: string`

        The auth token for analytics.

      - `build_caching: optional boolean`

        Enable build caching for the project.

      - `build_command: optional string`

        Command used to build project.

      - `destination_dir: optional string`

        Assets output directory of the build.

      - `root_dir: optional string`

        Directory to run the command.

    - `created_on: string`

      When the deployment was created.

    - `deployment_trigger: object { metadata, type }`

      Info about what caused the deployment.

      - `metadata: object { branch, commit_dirty, commit_hash, commit_message }`

        Additional info about the trigger.

        - `branch: string`

          Where the trigger happened.

        - `commit_dirty: boolean`

          Whether the deployment trigger commit was dirty.

        - `commit_hash: string`

          Hash of the deployment trigger commit.

        - `commit_message: string`

          Message of the deployment trigger commit.

      - `type: "github:push" or "ad_hoc" or "deploy_hook"`

        What caused the deployment.

        - `"github:push"`

        - `"ad_hoc"`

        - `"deploy_hook"`

    - `env_vars: map[object { type, value }  or object { type, value } ]`

      Environment variables used for builds and Pages Functions.

      - `PlainText object { type, value }`

        A plaintext environment variable.

        - `type: "plain_text"`

          - `"plain_text"`

        - `value: string`

          Environment variable value.

      - `SecretText object { type, value }`

        An encrypted environment variable.

        - `type: "secret_text"`

          - `"secret_text"`

        - `value: string`

          Secret value.

    - `environment: "preview" or "production"`

      Type of deploy.

      - `"preview"`

      - `"production"`

    - `is_skipped: boolean`

      If the deployment has been skipped.

    - `latest_stage: Stage`

      The status of the deployment.

      - `ended_on: string`

        When the stage ended.

      - `name: "queued" or "initialize" or "clone_repo" or 2 more`

        The current build stage.

        - `"queued"`

        - `"initialize"`

        - `"clone_repo"`

        - `"build"`

        - `"deploy"`

      - `started_on: string`

        When the stage started.

      - `status: "success" or "idle" or "active" or 2 more`

        State of the current stage.

        - `"success"`

        - `"idle"`

        - `"active"`

        - `"failure"`

        - `"canceled"`

    - `modified_on: string`

      When the deployment was last modified.

    - `project_id: string`

      Id of the project.

    - `project_name: string`

      Name of the project.

    - `short_id: string`

      Short Id (8 character) of the deployment.

    - `source: object { config, type }`

      Configs for the project source control.

      - `config: object { deployments_enabled, owner, owner_id, 10 more }`

        - `deployments_enabled: boolean`

          Whether to enable automatic deployments when pushing to the source repository.
          When disabled, no deployments (production or preview) will be triggered automatically.

        - `owner: string`

          The owner of the repository.

        - `owner_id: string`

          The owner ID of the repository.

        - `path_excludes: array of string`

          A list of paths that should be excluded from triggering a preview deployment. Wildcard syntax (`*`) is supported.

        - `path_includes: array of string`

          A list of paths that should be watched to trigger a preview deployment. Wildcard syntax (`*`) is supported.

        - `pr_comments_enabled: boolean`

          Whether to enable PR comments.

        - `preview_branch_excludes: array of string`

          A list of branches that should not trigger a preview deployment. Wildcard syntax (`*`) is supported. Must be used with `preview_deployment_setting` set to `custom`.

        - `preview_branch_includes: array of string`

          A list of branches that should trigger a preview deployment. Wildcard syntax (`*`) is supported. Must be used with `preview_deployment_setting` set to `custom`.

        - `preview_deployment_setting: "all" or "none" or "custom"`

          Controls whether commits to preview branches trigger a preview deployment.

          - `"all"`

          - `"none"`

          - `"custom"`

        - `production_branch: string`

          The production branch of the repository.

        - `production_deployments_enabled: boolean`

          Whether to trigger a production deployment on commits to the production branch.

        - `repo_id: string`

          The ID of the repository.

        - `repo_name: string`

          The name of the repository.

      - `type: "github" or "gitlab"`

        The source control management provider.

        - `"github"`

        - `"gitlab"`

    - `stages: array of Stage`

      List of past stages.

      - `ended_on: string`

        When the stage ended.

      - `name: "queued" or "initialize" or "clone_repo" or 2 more`

        The current build stage.

      - `started_on: string`

        When the stage started.

      - `status: "success" or "idle" or "active" or 2 more`

        State of the current stage.

    - `url: string`

      The live URL to view this deployment.

    - `uses_functions: optional boolean`

      Whether the deployment uses functions.

  - `created_on: string`

    When the project was created.

  - `deployment_configs: object { preview, production }`

    Configs for deployments in a project.

    - `preview: object { always_use_latest_compatibility_date, build_image_major_version, compatibility_date, 19 more }`

      Configs for preview deploys.

      - `always_use_latest_compatibility_date: boolean`

        Whether to always use the latest compatibility date for Pages Functions.

      - `build_image_major_version: number`

        The major version of the build image to use for Pages Functions.

      - `compatibility_date: string`

        Compatibility date used for Pages Functions.

      - `compatibility_flags: array of string`

        Compatibility flags used for Pages Functions.

      - `env_vars: map[object { type, value }  or object { type, value } ]`

        Environment variables used for builds and Pages Functions.

        - `PlainText object { type, value }`

          A plaintext environment variable.

          - `type: "plain_text"`

            - `"plain_text"`

          - `value: string`

            Environment variable value.

        - `SecretText object { type, value }`

          An encrypted environment variable.

          - `type: "secret_text"`

            - `"secret_text"`

          - `value: string`

            Secret value.

      - `fail_open: boolean`

        Whether to fail open when the deployment config cannot be applied.

      - `usage_model: "standard" or "bundled" or "unbound"`

        The usage model for Pages Functions.

        - `"standard"`

        - `"bundled"`

        - `"unbound"`

      - `ai_bindings: optional map[object { project_id } ]`

        Constellation bindings used for Pages Functions.

        - `project_id: string`

      - `analytics_engine_datasets: optional map[object { dataset } ]`

        Analytics Engine bindings used for Pages Functions.

        - `dataset: string`

          Name of the dataset.

      - `browsers: optional map[object {  } ]`

        Browser bindings used for Pages Functions.

      - `d1_databases: optional map[object { id } ]`

        D1 databases used for Pages Functions.

        - `id: string`

          UUID of the D1 database.

      - `durable_object_namespaces: optional map[object { namespace_id } ]`

        Durable Object namespaces used for Pages Functions.

        - `namespace_id: string`

          ID of the Durable Object namespace.

      - `hyperdrive_bindings: optional map[object { id } ]`

        Hyperdrive bindings used for Pages Functions.

        - `id: string`

      - `kv_namespaces: optional map[object { namespace_id } ]`

        KV namespaces used for Pages Functions.

        - `namespace_id: string`

          ID of the KV namespace.

      - `limits: optional object { cpu_ms }`

        Limits for Pages Functions.

        - `cpu_ms: number`

          CPU time limit in milliseconds.

      - `mtls_certificates: optional map[object { certificate_id } ]`

        mTLS bindings used for Pages Functions.

        - `certificate_id: string`

      - `placement: optional object { mode }`

        Placement setting used for Pages Functions.

        - `mode: string`

          Placement mode.

      - `queue_producers: optional map[object { name } ]`

        Queue Producer bindings used for Pages Functions.

        - `name: string`

          Name of the Queue.

      - `r2_buckets: optional map[object { name, jurisdiction } ]`

        R2 buckets used for Pages Functions.

        - `name: string`

          Name of the R2 bucket.

        - `jurisdiction: optional string`

          Jurisdiction of the R2 bucket.

      - `services: optional map[object { environment, service, entrypoint } ]`

        Services used for Pages Functions.

        - `environment: string`

          The Service environment.

        - `service: string`

          The Service name.

        - `entrypoint: optional string`

          The entrypoint to bind to.

      - `vectorize_bindings: optional map[object { index_name } ]`

        Vectorize bindings used for Pages Functions.

        - `index_name: string`

      - `wrangler_config_hash: optional string`

        Hash of the Wrangler configuration used for the deployment.

    - `production: object { always_use_latest_compatibility_date, build_image_major_version, compatibility_date, 19 more }`

      Configs for production deploys.

      - `always_use_latest_compatibility_date: boolean`

        Whether to always use the latest compatibility date for Pages Functions.

      - `build_image_major_version: number`

        The major version of the build image to use for Pages Functions.

      - `compatibility_date: string`

        Compatibility date used for Pages Functions.

      - `compatibility_flags: array of string`

        Compatibility flags used for Pages Functions.

      - `env_vars: map[object { type, value }  or object { type, value } ]`

        Environment variables used for builds and Pages Functions.

        - `PlainText object { type, value }`

          A plaintext environment variable.

          - `type: "plain_text"`

            - `"plain_text"`

          - `value: string`

            Environment variable value.

        - `SecretText object { type, value }`

          An encrypted environment variable.

          - `type: "secret_text"`

            - `"secret_text"`

          - `value: string`

            Secret value.

      - `fail_open: boolean`

        Whether to fail open when the deployment config cannot be applied.

      - `usage_model: "standard" or "bundled" or "unbound"`

        The usage model for Pages Functions.

        - `"standard"`

        - `"bundled"`

        - `"unbound"`

      - `ai_bindings: optional map[object { project_id } ]`

        Constellation bindings used for Pages Functions.

        - `project_id: string`

      - `analytics_engine_datasets: optional map[object { dataset } ]`

        Analytics Engine bindings used for Pages Functions.

        - `dataset: string`

          Name of the dataset.

      - `browsers: optional map[object {  } ]`

        Browser bindings used for Pages Functions.

      - `d1_databases: optional map[object { id } ]`

        D1 databases used for Pages Functions.

        - `id: string`

          UUID of the D1 database.

      - `durable_object_namespaces: optional map[object { namespace_id } ]`

        Durable Object namespaces used for Pages Functions.

        - `namespace_id: string`

          ID of the Durable Object namespace.

      - `hyperdrive_bindings: optional map[object { id } ]`

        Hyperdrive bindings used for Pages Functions.

        - `id: string`

      - `kv_namespaces: optional map[object { namespace_id } ]`

        KV namespaces used for Pages Functions.

        - `namespace_id: string`

          ID of the KV namespace.

      - `limits: optional object { cpu_ms }`

        Limits for Pages Functions.

        - `cpu_ms: number`

          CPU time limit in milliseconds.

      - `mtls_certificates: optional map[object { certificate_id } ]`

        mTLS bindings used for Pages Functions.

        - `certificate_id: string`

      - `placement: optional object { mode }`

        Placement setting used for Pages Functions.

        - `mode: string`

          Placement mode.

      - `queue_producers: optional map[object { name } ]`

        Queue Producer bindings used for Pages Functions.

        - `name: string`

          Name of the Queue.

      - `r2_buckets: optional map[object { name, jurisdiction } ]`

        R2 buckets used for Pages Functions.

        - `name: string`

          Name of the R2 bucket.

        - `jurisdiction: optional string`

          Jurisdiction of the R2 bucket.

      - `services: optional map[object { environment, service, entrypoint } ]`

        Services used for Pages Functions.

        - `environment: string`

          The Service environment.

        - `service: string`

          The Service name.

        - `entrypoint: optional string`

          The entrypoint to bind to.

      - `vectorize_bindings: optional map[object { index_name } ]`

        Vectorize bindings used for Pages Functions.

        - `index_name: string`

      - `wrangler_config_hash: optional string`

        Hash of the Wrangler configuration used for the deployment.

  - `framework: string`

    Framework the project is using.

  - `framework_version: string`

    Version of the framework the project is using.

  - `latest_deployment: Deployment`

    Most recent deployment of the project.

  - `name: string`

    Name of the project.

  - `preview_script_name: string`

    Name of the preview script.

  - `production_branch: string`

    Production branch of the project. Used to identify production deployments.

  - `production_script_name: string`

    Name of the production script.

  - `uses_functions: boolean`

    Whether the project uses functions.

  - `build_config: optional object { web_analytics_tag, web_analytics_token, build_caching, 3 more }`

    Configs for the project build process.

    - `web_analytics_tag: string`

      The classifying tag for analytics.

    - `web_analytics_token: string`

      The auth token for analytics.

    - `build_caching: optional boolean`

      Enable build caching for the project.

    - `build_command: optional string`

      Command used to build project.

    - `destination_dir: optional string`

      Assets output directory of the build.

    - `root_dir: optional string`

      Directory to run the command.

  - `domains: optional array of string`

    A list of associated custom domains for the project.

  - `source: optional object { config, type }`

    Configs for the project source control.

    - `config: object { deployments_enabled, owner, owner_id, 10 more }`

      - `deployments_enabled: boolean`

        Whether to enable automatic deployments when pushing to the source repository.
        When disabled, no deployments (production or preview) will be triggered automatically.

      - `owner: string`

        The owner of the repository.

      - `owner_id: string`

        The owner ID of the repository.

      - `path_excludes: array of string`

        A list of paths that should be excluded from triggering a preview deployment. Wildcard syntax (`*`) is supported.

      - `path_includes: array of string`

        A list of paths that should be watched to trigger a preview deployment. Wildcard syntax (`*`) is supported.

      - `pr_comments_enabled: boolean`

        Whether to enable PR comments.

      - `preview_branch_excludes: array of string`

        A list of branches that should not trigger a preview deployment. Wildcard syntax (`*`) is supported. Must be used with `preview_deployment_setting` set to `custom`.

      - `preview_branch_includes: array of string`

        A list of branches that should trigger a preview deployment. Wildcard syntax (`*`) is supported. Must be used with `preview_deployment_setting` set to `custom`.

      - `preview_deployment_setting: "all" or "none" or "custom"`

        Controls whether commits to preview branches trigger a preview deployment.

        - `"all"`

        - `"none"`

        - `"custom"`

      - `production_branch: string`

        The production branch of the repository.

      - `production_deployments_enabled: boolean`

        Whether to trigger a production deployment on commits to the production branch.

      - `repo_id: string`

        The ID of the repository.

      - `repo_name: string`

        The name of the repository.

    - `type: "github" or "gitlab"`

      The source control management provider.

      - `"github"`

      - `"gitlab"`

  - `subdomain: optional string`

    The Cloudflare subdomain associated with the project.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects \
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
      "id": "7b162ea7-7367-4d67-bcde-1160995d5",
      "canonical_deployment": {
        "id": "f64788e9-fccd-4d4a-a28a-cb84f88f6",
        "aliases": [
          "https://branchname.projectname.pages.dev"
        ],
        "build_config": {
          "web_analytics_tag": "cee1c73f6e4743d0b5e6bb1a0bcaabcc",
          "web_analytics_token": "021e1057c18547eca7b79f2516f06o7x",
          "build_caching": true,
          "build_command": "npm run build",
          "destination_dir": "build",
          "root_dir": "/"
        },
        "created_on": "2021-03-09T00:55:03.923456Z",
        "deployment_trigger": {
          "metadata": {
            "branch": "main",
            "commit_dirty": false,
            "commit_hash": "ad9ccd918a81025731e10e40267e11273a263421",
            "commit_message": "Update index.html"
          },
          "type": "ad_hoc"
        },
        "env_vars": {
          "foo": {
            "type": "plain_text",
            "value": "hello world"
          }
        },
        "environment": "preview",
        "is_skipped": true,
        "latest_stage": {
          "ended_on": "2021-03-09T00:58:59.045655Z",
          "name": "deploy",
          "started_on": "2021-03-09T00:55:03.923456Z",
          "status": "success"
        },
        "modified_on": "2021-03-09T00:58:59.045655Z",
        "project_id": "7b162ea7-7367-4d67-bcde-1160995d5",
        "project_name": "this-is-my-project-01",
        "short_id": "f64788e9",
        "source": {
          "config": {
            "deployments_enabled": true,
            "owner": "my-org",
            "owner_id": "12345678",
            "path_excludes": [
              "string"
            ],
            "path_includes": [
              "string"
            ],
            "pr_comments_enabled": true,
            "preview_branch_excludes": [
              "string"
            ],
            "preview_branch_includes": [
              "string"
            ],
            "preview_deployment_setting": "all",
            "production_branch": "main",
            "production_deployments_enabled": true,
            "repo_id": "12345678",
            "repo_name": "my-repo"
          },
          "type": "github"
        },
        "stages": [
          {
            "ended_on": "2021-06-03T15:39:03.134378Z",
            "name": "queued",
            "started_on": "2021-06-03T15:38:15.608194Z",
            "status": "active"
          },
          {
            "ended_on": null,
            "name": "initialize",
            "started_on": null,
            "status": "idle"
          },
          {
            "ended_on": null,
            "name": "clone_repo",
            "started_on": null,
            "status": "idle"
          },
          {
            "ended_on": null,
            "name": "build",
            "started_on": null,
            "status": "idle"
          },
          {
            "ended_on": null,
            "name": "deploy",
            "started_on": null,
            "status": "idle"
          }
        ],
        "url": "https://f64788e9.ninjakittens.pages.dev",
        "uses_functions": true
      },
      "created_on": "2017-01-01T00:00:00Z",
      "deployment_configs": {
        "preview": {
          "always_use_latest_compatibility_date": false,
          "build_image_major_version": 3,
          "compatibility_date": "2025-01-01",
          "compatibility_flags": [
            "url_standard"
          ],
          "env_vars": {
            "foo": {
              "type": "plain_text",
              "value": "hello world"
            }
          },
          "fail_open": true,
          "usage_model": "standard",
          "ai_bindings": {
            "AI_BINDING": {
              "project_id": "some-project-id"
            }
          },
          "analytics_engine_datasets": {
            "ANALYTICS_ENGINE_BINDING": {
              "dataset": "api_analytics"
            }
          },
          "browsers": {
            "BROWSER": {}
          },
          "d1_databases": {
            "D1_BINDING": {
              "id": "445e2955-951a-43f8-a35b-a4d0c8138f63"
            }
          },
          "durable_object_namespaces": {
            "DO_BINDING": {
              "namespace_id": "5eb63bbbe01eeed093cb22bb8f5acdc3"
            }
          },
          "hyperdrive_bindings": {
            "HYPERDRIVE": {
              "id": "a76a99bc342644deb02c38d66082262a"
            }
          },
          "kv_namespaces": {
            "KV_BINDING": {
              "namespace_id": "5eb63bbbe01eeed093cb22bb8f5acdc3"
            }
          },
          "limits": {
            "cpu_ms": 100
          },
          "mtls_certificates": {
            "MTLS": {
              "certificate_id": "d7cdd17c-916f-4cb7-aabe-585eb382ec4e"
            }
          },
          "placement": {
            "mode": "smart"
          },
          "queue_producers": {
            "QUEUE_PRODUCER_BINDING": {
              "name": "some-queue"
            }
          },
          "r2_buckets": {
            "R2_BINDING": {
              "name": "some-bucket",
              "jurisdiction": "eu"
            }
          },
          "services": {
            "SERVICE_BINDING": {
              "environment": "production",
              "service": "example-worker",
              "entrypoint": "MyHandler"
            }
          },
          "vectorize_bindings": {
            "VECTORIZE": {
              "index_name": "my_index"
            }
          },
          "wrangler_config_hash": "abc123def456"
        },
        "production": {
          "always_use_latest_compatibility_date": false,
          "build_image_major_version": 3,
          "compatibility_date": "2025-01-01",
          "compatibility_flags": [
            "url_standard"
          ],
          "env_vars": {
            "foo": {
              "type": "plain_text",
              "value": "hello world"
            }
          },
          "fail_open": true,
          "usage_model": "standard",
          "ai_bindings": {
            "AI_BINDING": {
              "project_id": "some-project-id"
            }
          },
          "analytics_engine_datasets": {
            "ANALYTICS_ENGINE_BINDING": {
              "dataset": "api_analytics"
            }
          },
          "browsers": {
            "BROWSER": {}
          },
          "d1_databases": {
            "D1_BINDING": {
              "id": "445e2955-951a-43f8-a35b-a4d0c8138f63"
            }
          },
          "durable_object_namespaces": {
            "DO_BINDING": {
              "namespace_id": "5eb63bbbe01eeed093cb22bb8f5acdc3"
            }
          },
          "hyperdrive_bindings": {
            "HYPERDRIVE": {
              "id": "a76a99bc342644deb02c38d66082262a"
            }
          },
          "kv_namespaces": {
            "KV_BINDING": {
              "namespace_id": "5eb63bbbe01eeed093cb22bb8f5acdc3"
            }
          },
          "limits": {
            "cpu_ms": 100
          },
          "mtls_certificates": {
            "MTLS": {
              "certificate_id": "d7cdd17c-916f-4cb7-aabe-585eb382ec4e"
            }
          },
          "placement": {
            "mode": "smart"
          },
          "queue_producers": {
            "QUEUE_PRODUCER_BINDING": {
              "name": "some-queue"
            }
          },
          "r2_buckets": {
            "R2_BINDING": {
              "name": "some-bucket",
              "jurisdiction": "eu"
            }
          },
          "services": {
            "SERVICE_BINDING": {
              "environment": "production",
              "service": "example-worker",
              "entrypoint": "MyHandler"
            }
          },
          "vectorize_bindings": {
            "VECTORIZE": {
              "index_name": "my_index"
            }
          },
          "wrangler_config_hash": "abc123def456"
        }
      },
      "framework": "framework",
      "framework_version": "framework_version",
      "latest_deployment": {
        "id": "f64788e9-fccd-4d4a-a28a-cb84f88f6",
        "aliases": [
          "https://branchname.projectname.pages.dev"
        ],
        "build_config": {
          "web_analytics_tag": "cee1c73f6e4743d0b5e6bb1a0bcaabcc",
          "web_analytics_token": "021e1057c18547eca7b79f2516f06o7x",
          "build_caching": true,
          "build_command": "npm run build",
          "destination_dir": "build",
          "root_dir": "/"
        },
        "created_on": "2021-03-09T00:55:03.923456Z",
        "deployment_trigger": {
          "metadata": {
            "branch": "main",
            "commit_dirty": false,
            "commit_hash": "ad9ccd918a81025731e10e40267e11273a263421",
            "commit_message": "Update index.html"
          },
          "type": "ad_hoc"
        },
        "env_vars": {
          "foo": {
            "type": "plain_text",
            "value": "hello world"
          }
        },
        "environment": "preview",
        "is_skipped": true,
        "latest_stage": {
          "ended_on": "2021-03-09T00:58:59.045655Z",
          "name": "deploy",
          "started_on": "2021-03-09T00:55:03.923456Z",
          "status": "success"
        },
        "modified_on": "2021-03-09T00:58:59.045655Z",
        "project_id": "7b162ea7-7367-4d67-bcde-1160995d5",
        "project_name": "this-is-my-project-01",
        "short_id": "f64788e9",
        "source": {
          "config": {
            "deployments_enabled": true,
            "owner": "my-org",
            "owner_id": "12345678",
            "path_excludes": [
              "string"
            ],
            "path_includes": [
              "string"
            ],
            "pr_comments_enabled": true,
            "preview_branch_excludes": [
              "string"
            ],
            "preview_branch_includes": [
              "string"
            ],
            "preview_deployment_setting": "all",
            "production_branch": "main",
            "production_deployments_enabled": true,
            "repo_id": "12345678",
            "repo_name": "my-repo"
          },
          "type": "github"
        },
        "stages": [
          {
            "ended_on": "2021-06-03T15:39:03.134378Z",
            "name": "queued",
            "started_on": "2021-06-03T15:38:15.608194Z",
            "status": "active"
          },
          {
            "ended_on": null,
            "name": "initialize",
            "started_on": null,
            "status": "idle"
          },
          {
            "ended_on": null,
            "name": "clone_repo",
            "started_on": null,
            "status": "idle"
          },
          {
            "ended_on": null,
            "name": "build",
            "started_on": null,
            "status": "idle"
          },
          {
            "ended_on": null,
            "name": "deploy",
            "started_on": null,
            "status": "idle"
          }
        ],
        "url": "https://f64788e9.ninjakittens.pages.dev",
        "uses_functions": true
      },
      "name": "this-is-my-project-01",
      "preview_script_name": "pages-worker--1234567-preview",
      "production_branch": "main",
      "production_script_name": "pages-worker--1234567-production",
      "uses_functions": true,
      "build_config": {
        "web_analytics_tag": "cee1c73f6e4743d0b5e6bb1a0bcaabcc",
        "web_analytics_token": "021e1057c18547eca7b79f2516f06o7x",
        "build_caching": true,
        "build_command": "npm run build",
        "destination_dir": "build",
        "root_dir": "/"
      },
      "domains": [
        "customdomain.com",
        "customdomain.org"
      ],
      "source": {
        "config": {
          "deployments_enabled": true,
          "owner": "my-org",
          "owner_id": "12345678",
          "path_excludes": [
            "string"
          ],
          "path_includes": [
            "string"
          ],
          "pr_comments_enabled": true,
          "preview_branch_excludes": [
            "string"
          ],
          "preview_branch_includes": [
            "string"
          ],
          "preview_deployment_setting": "all",
          "production_branch": "main",
          "production_deployments_enabled": true,
          "repo_id": "12345678",
          "repo_name": "my-repo"
        },
        "type": "github"
      },
      "subdomain": "helloworld.pages.dev"
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
