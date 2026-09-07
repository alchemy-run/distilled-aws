# Deployments

## Get deployments

**get** `/accounts/{account_id}/pages/projects/{project_name}/deployments`

Fetch a list of project deployments.

### Path Parameters

- `account_id: string`

  Identifier.

- `project_name: string`

  Name of the project.

### Query Parameters

- `env: optional "production" or "preview"`

  What type of deployments to fetch.

  - `"production"`

  - `"preview"`

- `page: optional number`

  Which page of deployments to fetch.

- `per_page: optional number`

  How many deployments to return per page.

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

- `result: array of Deployment`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME/deployments \
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

## Get deployment info

**get** `/accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}`

Fetch information about a deployment.

### Path Parameters

- `account_id: string`

  Identifier.

- `project_name: string`

  Name of the project.

- `deployment_id: string`

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

- `result: Deployment`

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

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME/deployments/$DEPLOYMENT_ID \
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
  "success": true
}
```

## Create deployment

**post** `/accounts/{account_id}/pages/projects/{project_name}/deployments`

Start a new deployment from production. The repository and account must have already been authorized on the Cloudflare Pages dashboard.

### Path Parameters

- `account_id: string`

  Identifier.

- `project_name: string`

  Name of the project.

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

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME/deployments \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F branch=staging \
    -F commit_dirty=false \
    -F commit_hash=a1b2c3d4e5f6 \
    -F commit_message='Update homepage' \
    -F manifest='{"index.html": "abc123", "style.css": "def456"}' \
    -F pages_build_output_dir=dist
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
  "success": true
}
```

## Delete deployment

**delete** `/accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}`

Delete a deployment.

### Path Parameters

- `account_id: string`

  Identifier.

- `project_name: string`

  Name of the project.

- `deployment_id: string`

  Identifier.

### Query Parameters

- `force: optional boolean`

  Allow deletion of aliased non-production deployments when a normal delete would be rejected.

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

- `result: unknown`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME/deployments/$DEPLOYMENT_ID \
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
  "result": {},
  "success": true
}
```

## Retry deployment

**post** `/accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/retry`

Retry a previous deployment.

### Path Parameters

- `account_id: string`

  Identifier.

- `project_name: string`

  Name of the project.

- `deployment_id: string`

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

- `result: Deployment`

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

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME/deployments/$DEPLOYMENT_ID/retry \
    -X POST \
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
  "success": true
}
```

## Rollback deployment

**post** `/accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/rollback`

Rollback the production deployment to a previous deployment. You can only rollback to succesful builds on production.

### Path Parameters

- `account_id: string`

  Identifier.

- `project_name: string`

  Name of the project.

- `deployment_id: string`

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

- `result: Deployment`

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

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME/deployments/$DEPLOYMENT_ID/rollback \
    -X POST \
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
  "success": true
}
```

## Domain Types

### Deployment Delete Response

- `DeploymentDeleteResponse = unknown`

# History

# Logs

## Get deployment logs

**get** `/accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/history/logs`

Fetch deployment logs for a project.

### Path Parameters

- `account_id: string`

  Identifier.

- `project_name: string`

  Name of the project.

- `deployment_id: string`

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

- `result: object { data, includes_container_logs, total }`

  - `data: array of object { line, ts }`

    - `line: string`

    - `ts: string`

  - `includes_container_logs: boolean`

  - `total: number`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME/deployments/$DEPLOYMENT_ID/history/logs \
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
    "data": [
      {
        "line": "Cloning repository...",
        "ts": "2021-04-20T19:35:29.0749819Z"
      },
      {
        "line": "From https://github.com/cloudflare/example",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": " * branch            209c5bb11d89533f426b2f8469bcae12fdccf71b -> FETCH_HEAD",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "HEAD is now at 209c5bb Update index.html",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "Success: Finished cloning repository files",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "Installing dependencies",
        "ts": "2021-04-20T19:35:59.0749819Z"
      },
      {
        "line": "Python version set to 2.7",
        "ts": "2021-04-20T19:35:59.0931208Z"
      },
      {
        "line": "v12.18.0 is already installed.",
        "ts": "2021-04-20T19:36:02.2369501Z"
      },
      {
        "line": "Now using node v12.18.0 (npm v6.14.4)",
        "ts": "2021-04-20T19:36:02.6028886Z"
      },
      {
        "line": "Started restoring cached build plugins",
        "ts": "2021-04-20T19:36:02.624555Z"
      },
      {
        "line": "Finished restoring cached build plugins",
        "ts": "2021-04-20T19:36:02.6340688Z"
      },
      {
        "line": "Attempting ruby version 2.7.1, read from environment",
        "ts": "2021-04-20T19:36:02.963095Z"
      },
      {
        "line": "Using ruby version 2.7.1",
        "ts": "2021-04-20T19:36:04.2236084Z"
      },
      {
        "line": "Using PHP version 5.6",
        "ts": "2021-04-20T19:36:04.5450152Z"
      },
      {
        "line": "5.2 is already installed.",
        "ts": "2021-04-20T19:36:04.5740509Z"
      },
      {
        "line": "Using Swift version 5.2",
        "ts": "2021-04-20T19:36:04.577035Z"
      },
      {
        "line": "Installing Hugo 0.54.0",
        "ts": "2021-04-20T19:36:04.5771615Z"
      },
      {
        "line": "Hugo Static Site Generator v0.54.0-B1A82C61A/extended linux/amd64 BuildDate: 2019-02-01T10:04:38Z",
        "ts": "2021-04-20T19:36:05.4786868Z"
      },
      {
        "line": "Started restoring cached go cache",
        "ts": "2021-04-20T19:36:05.4794366Z"
      },
      {
        "line": "Finished restoring cached go cache",
        "ts": "2021-04-20T19:36:05.481977Z"
      },
      {
        "line": "go version go1.14.4 linux/amd64",
        "ts": "2021-04-20T19:36:05.9049776Z"
      },
      {
        "line": "go version go1.14.4 linux/amd64",
        "ts": "2021-04-20T19:36:05.9086053Z"
      },
      {
        "line": "Installing missing commands",
        "ts": "2021-04-20T19:36:05.9163568Z"
      },
      {
        "line": "Verify run directory",
        "ts": "2021-04-20T19:36:05.9163934Z"
      },
      {
        "line": "Executing user command: echo \"skipping build step: no build command specified\"",
        "ts": "2021-04-20T19:36:05.9164636Z"
      },
      {
        "line": "skipping build step: no build command specified",
        "ts": "2021-04-20T19:36:05.9165087Z"
      },
      {
        "line": "Finished",
        "ts": "2021-04-20T19:36:05.917412Z"
      }
    ],
    "includes_container_logs": true,
    "total": 30
  },
  "success": true
}
```

## Domain Types

### Log Get Response

- `LogGetResponse object { data, includes_container_logs, total }`

  - `data: array of object { line, ts }`

    - `line: string`

    - `ts: string`

  - `includes_container_logs: boolean`

  - `total: number`
