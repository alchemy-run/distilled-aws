# Workers Builds

## Get latest builds by script IDs

**get** `/accounts/{account_id}/builds/builds/latest`

Retrieve the most recent builds for multiple worker scripts

### Path Parameters

- `account_id: string`

  Account identifier.

### Query Parameters

- `external_script_ids: string`

  Comma-separated list of system-generated worker script tags (max 20).

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: object { builds }`

  - `builds: optional map[object { build_outcome, build_trigger_metadata, build_uuid, 8 more } ]`

    - `build_outcome: optional "success" or "fail" or "skipped" or 2 more`

      - `"success"`

      - `"fail"`

      - `"skipped"`

      - `"cancelled"`

      - `"terminated"`

    - `build_trigger_metadata: optional object { author, branch, build_command, 11 more }`

      - `author: optional string`

      - `branch: optional string`

        Git branch name.

      - `build_command: optional string`

      - `build_token_name: optional string`

      - `build_token_uuid: optional string`

        Build token UUID.

      - `build_trigger_source: optional "push" or "pull_request" or "manual" or "api"`

        - `"push"`

        - `"pull_request"`

        - `"manual"`

        - `"api"`

      - `commit_hash: optional string`

        Git commit hash

      - `commit_message: optional string`

      - `deploy_command: optional string`

      - `environment_variables: optional map[string]`

      - `provider_account_name: optional string`

      - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

        - `"github"`

        - `"gitlab"`

        - `"gitlab_internal"`

      - `repo_name: optional string`

      - `root_directory: optional string`

        Root directory path.

    - `build_uuid: optional string`

      Build UUID.

    - `created_on: optional string`

    - `initializing_on: optional string`

    - `modified_on: optional string`

    - `pull_request: optional object { created_on, pull_request_url }`

      - `created_on: optional string`

      - `pull_request_url: optional string`

    - `running_on: optional string`

    - `status: optional "queued" or "initializing" or "running" or "stopped"`

      - `"queued"`

      - `"initializing"`

      - `"running"`

      - `"stopped"`

    - `stopped_on: optional string`

    - `trigger: optional object { branch_excludes, branch_includes, build_caching_enabled, 12 more }`

      Trigger information without build_token_uuid

      - `branch_excludes: optional array of string`

      - `branch_includes: optional array of string`

      - `build_caching_enabled: optional boolean`

      - `build_command: optional string`

      - `created_on: optional string`

      - `deleted_on: optional string`

      - `deploy_command: optional string`

      - `external_script_id: optional string`

        System-generated worker script tag.

      - `modified_on: optional string`

      - `path_excludes: optional array of string`

      - `path_includes: optional array of string`

      - `repo_connection: optional object { created_on, deleted_on, modified_on, 6 more }`

        - `created_on: optional string`

        - `deleted_on: optional string`

        - `modified_on: optional string`

        - `provider_account_id: optional string`

          Provider account identifier.

        - `provider_account_name: optional string`

        - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

          - `"github"`

          - `"gitlab"`

          - `"gitlab_internal"`

        - `repo_connection_uuid: optional string`

          Repository connection UUID.

        - `repo_id: optional string`

          Repository identifier.

        - `repo_name: optional string`

      - `root_directory: optional string`

        Root directory path.

      - `trigger_name: optional string`

      - `trigger_uuid: optional string`

        Trigger UUID.

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/builds/latest \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "builds": {
      "foo": {
        "build_outcome": "success",
        "build_trigger_metadata": {
          "author": "developer@cloudflare.com",
          "branch": "main",
          "build_command": "npm run build",
          "build_token_name": "My Build Token",
          "build_token_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "build_trigger_source": "push",
          "commit_hash": "abc123def456",
          "commit_message": "Add new feature",
          "deploy_command": "npx wrangler deploy",
          "environment_variables": {
            "foo": "string"
          },
          "provider_account_name": "Cloudflare",
          "provider_type": "github",
          "repo_name": "workers-sdk",
          "root_directory": "/"
        },
        "build_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_on": "2019-12-27T18:11:19.117Z",
        "initializing_on": "2019-12-27T18:11:19.117Z",
        "modified_on": "2019-12-27T18:11:19.117Z",
        "pull_request": {
          "created_on": "2019-12-27T18:11:19.117Z",
          "pull_request_url": "https://github.com/cloudflare/workers-sdk/pull/123"
        },
        "running_on": "2019-12-27T18:11:19.117Z",
        "status": "running",
        "stopped_on": "2019-12-27T18:11:19.117Z",
        "trigger": {
          "branch_excludes": [
            "string"
          ],
          "branch_includes": [
            "main"
          ],
          "build_caching_enabled": false,
          "build_command": "npm run build",
          "created_on": "2019-12-27T18:11:19.117Z",
          "deleted_on": "2019-12-27T18:11:19.117Z",
          "deploy_command": "npx wrangler deploy",
          "external_script_id": "dd7160bb9cef458093557736f4b9e75b",
          "modified_on": "2019-12-27T18:11:19.117Z",
          "path_excludes": [
            "*.md"
          ],
          "path_includes": [
            "*"
          ],
          "repo_connection": {
            "created_on": "2019-12-27T18:11:19.117Z",
            "deleted_on": "2019-12-27T18:11:19.117Z",
            "modified_on": "2019-12-27T18:11:19.117Z",
            "provider_account_id": "cloudflare",
            "provider_account_name": "Cloudflare",
            "provider_type": "github",
            "repo_connection_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "repo_id": "workers-sdk",
            "repo_name": "workers-sdk"
          },
          "root_directory": "/",
          "trigger_name": "Production Deploy",
          "trigger_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
        }
      }
    }
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## Get builds by version IDs

**get** `/accounts/{account_id}/builds/builds`

Retrieve builds for specific version IDs

### Path Parameters

- `account_id: string`

  Account identifier.

### Query Parameters

- `version_ids: string`

  Comma-separated list of version UUIDs (max 20).

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: object { builds }`

  - `builds: optional map[object { build_outcome, build_trigger_metadata, build_uuid, 8 more } ]`

    - `build_outcome: optional "success" or "fail" or "skipped" or 2 more`

      - `"success"`

      - `"fail"`

      - `"skipped"`

      - `"cancelled"`

      - `"terminated"`

    - `build_trigger_metadata: optional object { author, branch, build_command, 11 more }`

      - `author: optional string`

      - `branch: optional string`

        Git branch name.

      - `build_command: optional string`

      - `build_token_name: optional string`

      - `build_token_uuid: optional string`

        Build token UUID.

      - `build_trigger_source: optional "push" or "pull_request" or "manual" or "api"`

        - `"push"`

        - `"pull_request"`

        - `"manual"`

        - `"api"`

      - `commit_hash: optional string`

        Git commit hash

      - `commit_message: optional string`

      - `deploy_command: optional string`

      - `environment_variables: optional map[string]`

      - `provider_account_name: optional string`

      - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

        - `"github"`

        - `"gitlab"`

        - `"gitlab_internal"`

      - `repo_name: optional string`

      - `root_directory: optional string`

        Root directory path.

    - `build_uuid: optional string`

      Build UUID.

    - `created_on: optional string`

    - `initializing_on: optional string`

    - `modified_on: optional string`

    - `pull_request: optional object { created_on, pull_request_url }`

      - `created_on: optional string`

      - `pull_request_url: optional string`

    - `running_on: optional string`

    - `status: optional "queued" or "initializing" or "running" or "stopped"`

      - `"queued"`

      - `"initializing"`

      - `"running"`

      - `"stopped"`

    - `stopped_on: optional string`

    - `trigger: optional object { branch_excludes, branch_includes, build_caching_enabled, 12 more }`

      Trigger information without build_token_uuid

      - `branch_excludes: optional array of string`

      - `branch_includes: optional array of string`

      - `build_caching_enabled: optional boolean`

      - `build_command: optional string`

      - `created_on: optional string`

      - `deleted_on: optional string`

      - `deploy_command: optional string`

      - `external_script_id: optional string`

        System-generated worker script tag.

      - `modified_on: optional string`

      - `path_excludes: optional array of string`

      - `path_includes: optional array of string`

      - `repo_connection: optional object { created_on, deleted_on, modified_on, 6 more }`

        - `created_on: optional string`

        - `deleted_on: optional string`

        - `modified_on: optional string`

        - `provider_account_id: optional string`

          Provider account identifier.

        - `provider_account_name: optional string`

        - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

          - `"github"`

          - `"gitlab"`

          - `"gitlab_internal"`

        - `repo_connection_uuid: optional string`

          Repository connection UUID.

        - `repo_id: optional string`

          Repository identifier.

        - `repo_name: optional string`

      - `root_directory: optional string`

        Root directory path.

      - `trigger_name: optional string`

      - `trigger_uuid: optional string`

        Trigger UUID.

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/builds \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "builds": {
      "foo": {
        "build_outcome": "success",
        "build_trigger_metadata": {
          "author": "developer@cloudflare.com",
          "branch": "main",
          "build_command": "npm run build",
          "build_token_name": "My Build Token",
          "build_token_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "build_trigger_source": "push",
          "commit_hash": "abc123def456",
          "commit_message": "Add new feature",
          "deploy_command": "npx wrangler deploy",
          "environment_variables": {
            "foo": "string"
          },
          "provider_account_name": "Cloudflare",
          "provider_type": "github",
          "repo_name": "workers-sdk",
          "root_directory": "/"
        },
        "build_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_on": "2019-12-27T18:11:19.117Z",
        "initializing_on": "2019-12-27T18:11:19.117Z",
        "modified_on": "2019-12-27T18:11:19.117Z",
        "pull_request": {
          "created_on": "2019-12-27T18:11:19.117Z",
          "pull_request_url": "https://github.com/cloudflare/workers-sdk/pull/123"
        },
        "running_on": "2019-12-27T18:11:19.117Z",
        "status": "running",
        "stopped_on": "2019-12-27T18:11:19.117Z",
        "trigger": {
          "branch_excludes": [
            "string"
          ],
          "branch_includes": [
            "main"
          ],
          "build_caching_enabled": false,
          "build_command": "npm run build",
          "created_on": "2019-12-27T18:11:19.117Z",
          "deleted_on": "2019-12-27T18:11:19.117Z",
          "deploy_command": "npx wrangler deploy",
          "external_script_id": "dd7160bb9cef458093557736f4b9e75b",
          "modified_on": "2019-12-27T18:11:19.117Z",
          "path_excludes": [
            "*.md"
          ],
          "path_includes": [
            "*"
          ],
          "repo_connection": {
            "created_on": "2019-12-27T18:11:19.117Z",
            "deleted_on": "2019-12-27T18:11:19.117Z",
            "modified_on": "2019-12-27T18:11:19.117Z",
            "provider_account_id": "cloudflare",
            "provider_account_name": "Cloudflare",
            "provider_type": "github",
            "repo_connection_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "repo_id": "workers-sdk",
            "repo_name": "workers-sdk"
          },
          "root_directory": "/",
          "trigger_name": "Production Deploy",
          "trigger_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
        }
      }
    }
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## Get account limits

**get** `/accounts/{account_id}/builds/account/limits`

Retrieve account limits and usage information

### Path Parameters

- `account_id: string`

  Account identifier.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: object { build_minutes_refresh_on, has_reached_build_minutes_limit }`

  - `build_minutes_refresh_on: optional string`

    When build minutes will refresh (only for non-paid plans)

  - `has_reached_build_minutes_limit: optional boolean`

    Whether build minutes limit has been reached (only for non-paid plans)

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/account/limits \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "build_minutes_refresh_on": "2019-12-27T18:11:19.117Z",
    "has_reached_build_minutes_limit": true
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## Domain Types

### Workers Build Get Latest Builds Response

- `WorkersBuildGetLatestBuildsResponse object { builds }`

  - `builds: optional map[object { build_outcome, build_trigger_metadata, build_uuid, 8 more } ]`

    - `build_outcome: optional "success" or "fail" or "skipped" or 2 more`

      - `"success"`

      - `"fail"`

      - `"skipped"`

      - `"cancelled"`

      - `"terminated"`

    - `build_trigger_metadata: optional object { author, branch, build_command, 11 more }`

      - `author: optional string`

      - `branch: optional string`

        Git branch name.

      - `build_command: optional string`

      - `build_token_name: optional string`

      - `build_token_uuid: optional string`

        Build token UUID.

      - `build_trigger_source: optional "push" or "pull_request" or "manual" or "api"`

        - `"push"`

        - `"pull_request"`

        - `"manual"`

        - `"api"`

      - `commit_hash: optional string`

        Git commit hash

      - `commit_message: optional string`

      - `deploy_command: optional string`

      - `environment_variables: optional map[string]`

      - `provider_account_name: optional string`

      - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

        - `"github"`

        - `"gitlab"`

        - `"gitlab_internal"`

      - `repo_name: optional string`

      - `root_directory: optional string`

        Root directory path.

    - `build_uuid: optional string`

      Build UUID.

    - `created_on: optional string`

    - `initializing_on: optional string`

    - `modified_on: optional string`

    - `pull_request: optional object { created_on, pull_request_url }`

      - `created_on: optional string`

      - `pull_request_url: optional string`

    - `running_on: optional string`

    - `status: optional "queued" or "initializing" or "running" or "stopped"`

      - `"queued"`

      - `"initializing"`

      - `"running"`

      - `"stopped"`

    - `stopped_on: optional string`

    - `trigger: optional object { branch_excludes, branch_includes, build_caching_enabled, 12 more }`

      Trigger information without build_token_uuid

      - `branch_excludes: optional array of string`

      - `branch_includes: optional array of string`

      - `build_caching_enabled: optional boolean`

      - `build_command: optional string`

      - `created_on: optional string`

      - `deleted_on: optional string`

      - `deploy_command: optional string`

      - `external_script_id: optional string`

        System-generated worker script tag.

      - `modified_on: optional string`

      - `path_excludes: optional array of string`

      - `path_includes: optional array of string`

      - `repo_connection: optional object { created_on, deleted_on, modified_on, 6 more }`

        - `created_on: optional string`

        - `deleted_on: optional string`

        - `modified_on: optional string`

        - `provider_account_id: optional string`

          Provider account identifier.

        - `provider_account_name: optional string`

        - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

          - `"github"`

          - `"gitlab"`

          - `"gitlab_internal"`

        - `repo_connection_uuid: optional string`

          Repository connection UUID.

        - `repo_id: optional string`

          Repository identifier.

        - `repo_name: optional string`

      - `root_directory: optional string`

        Root directory path.

      - `trigger_name: optional string`

      - `trigger_uuid: optional string`

        Trigger UUID.

### Workers Build Get Builds By Version Response

- `WorkersBuildGetBuildsByVersionResponse object { builds }`

  - `builds: optional map[object { build_outcome, build_trigger_metadata, build_uuid, 8 more } ]`

    - `build_outcome: optional "success" or "fail" or "skipped" or 2 more`

      - `"success"`

      - `"fail"`

      - `"skipped"`

      - `"cancelled"`

      - `"terminated"`

    - `build_trigger_metadata: optional object { author, branch, build_command, 11 more }`

      - `author: optional string`

      - `branch: optional string`

        Git branch name.

      - `build_command: optional string`

      - `build_token_name: optional string`

      - `build_token_uuid: optional string`

        Build token UUID.

      - `build_trigger_source: optional "push" or "pull_request" or "manual" or "api"`

        - `"push"`

        - `"pull_request"`

        - `"manual"`

        - `"api"`

      - `commit_hash: optional string`

        Git commit hash

      - `commit_message: optional string`

      - `deploy_command: optional string`

      - `environment_variables: optional map[string]`

      - `provider_account_name: optional string`

      - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

        - `"github"`

        - `"gitlab"`

        - `"gitlab_internal"`

      - `repo_name: optional string`

      - `root_directory: optional string`

        Root directory path.

    - `build_uuid: optional string`

      Build UUID.

    - `created_on: optional string`

    - `initializing_on: optional string`

    - `modified_on: optional string`

    - `pull_request: optional object { created_on, pull_request_url }`

      - `created_on: optional string`

      - `pull_request_url: optional string`

    - `running_on: optional string`

    - `status: optional "queued" or "initializing" or "running" or "stopped"`

      - `"queued"`

      - `"initializing"`

      - `"running"`

      - `"stopped"`

    - `stopped_on: optional string`

    - `trigger: optional object { branch_excludes, branch_includes, build_caching_enabled, 12 more }`

      Trigger information without build_token_uuid

      - `branch_excludes: optional array of string`

      - `branch_includes: optional array of string`

      - `build_caching_enabled: optional boolean`

      - `build_command: optional string`

      - `created_on: optional string`

      - `deleted_on: optional string`

      - `deploy_command: optional string`

      - `external_script_id: optional string`

        System-generated worker script tag.

      - `modified_on: optional string`

      - `path_excludes: optional array of string`

      - `path_includes: optional array of string`

      - `repo_connection: optional object { created_on, deleted_on, modified_on, 6 more }`

        - `created_on: optional string`

        - `deleted_on: optional string`

        - `modified_on: optional string`

        - `provider_account_id: optional string`

          Provider account identifier.

        - `provider_account_name: optional string`

        - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

          - `"github"`

          - `"gitlab"`

          - `"gitlab_internal"`

        - `repo_connection_uuid: optional string`

          Repository connection UUID.

        - `repo_id: optional string`

          Repository identifier.

        - `repo_name: optional string`

      - `root_directory: optional string`

        Root directory path.

      - `trigger_name: optional string`

      - `trigger_uuid: optional string`

        Trigger UUID.

### Workers Build Get Account Limits Response

- `WorkersBuildGetAccountLimitsResponse object { build_minutes_refresh_on, has_reached_build_minutes_limit }`

  - `build_minutes_refresh_on: optional string`

    When build minutes will refresh (only for non-paid plans)

  - `has_reached_build_minutes_limit: optional boolean`

    Whether build minutes limit has been reached (only for non-paid plans)

# Triggers

## List triggers by script

**get** `/accounts/{account_id}/builds/workers/{external_script_id}/triggers`

Get all triggers for a specific worker script

### Path Parameters

- `account_id: string`

  Account identifier.

- `external_script_id: string`

  System-generated worker script tag.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: array of object { branch_excludes, branch_includes, build_caching_enabled, 14 more }`

  - `branch_excludes: optional array of string`

  - `branch_includes: optional array of string`

  - `build_caching_enabled: optional boolean`

  - `build_command: optional string`

  - `build_token_name: optional string`

  - `build_token_uuid: optional string`

    Build token UUID.

  - `created_on: optional string`

  - `deleted_on: optional string`

  - `deploy_command: optional string`

  - `external_script_id: optional string`

    System-generated worker script tag.

  - `modified_on: optional string`

  - `path_excludes: optional array of string`

  - `path_includes: optional array of string`

  - `repo_connection: optional object { created_on, deleted_on, modified_on, 6 more }`

    - `created_on: optional string`

    - `deleted_on: optional string`

    - `modified_on: optional string`

    - `provider_account_id: optional string`

      Provider account identifier.

    - `provider_account_name: optional string`

    - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

      - `"github"`

      - `"gitlab"`

      - `"gitlab_internal"`

    - `repo_connection_uuid: optional string`

      Repository connection UUID.

    - `repo_id: optional string`

      Repository identifier.

    - `repo_name: optional string`

  - `root_directory: optional string`

    Root directory path.

  - `trigger_name: optional string`

  - `trigger_uuid: optional string`

    Trigger UUID.

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/workers/$EXTERNAL_SCRIPT_ID/triggers \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": [
    {
      "branch_excludes": [
        "string"
      ],
      "branch_includes": [
        "main"
      ],
      "build_caching_enabled": false,
      "build_command": "npm run build",
      "build_token_name": "My Build Token",
      "build_token_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "created_on": "2019-12-27T18:11:19.117Z",
      "deleted_on": "2019-12-27T18:11:19.117Z",
      "deploy_command": "npx wrangler deploy",
      "external_script_id": "dd7160bb9cef458093557736f4b9e75b",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "path_excludes": [
        "*.md"
      ],
      "path_includes": [
        "*"
      ],
      "repo_connection": {
        "created_on": "2019-12-27T18:11:19.117Z",
        "deleted_on": "2019-12-27T18:11:19.117Z",
        "modified_on": "2019-12-27T18:11:19.117Z",
        "provider_account_id": "cloudflare",
        "provider_account_name": "Cloudflare",
        "provider_type": "github",
        "repo_connection_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "repo_id": "workers-sdk",
        "repo_name": "workers-sdk"
      },
      "root_directory": "/",
      "trigger_name": "Production Deploy",
      "trigger_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    }
  ],
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## Create trigger

**post** `/accounts/{account_id}/builds/triggers`

Create a new CI/CD trigger

### Path Parameters

- `account_id: string`

  Account identifier.

### Body Parameters

- `branch_excludes: array of string`

- `branch_includes: array of string`

- `build_command: string`

- `build_token_uuid: string`

  Build token UUID.

- `deploy_command: string`

- `external_script_id: string`

  System-generated worker script tag.

- `path_excludes: array of string`

- `path_includes: array of string`

- `repo_connection_uuid: string`

  Repository connection UUID.

- `root_directory: string`

  Root directory path.

- `trigger_name: string`

- `build_caching_enabled: optional boolean`

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: object { branch_excludes, branch_includes, build_caching_enabled, 14 more }`

  - `branch_excludes: optional array of string`

  - `branch_includes: optional array of string`

  - `build_caching_enabled: optional boolean`

  - `build_command: optional string`

  - `build_token_name: optional string`

  - `build_token_uuid: optional string`

    Build token UUID.

  - `created_on: optional string`

  - `deleted_on: optional string`

  - `deploy_command: optional string`

  - `external_script_id: optional string`

    System-generated worker script tag.

  - `modified_on: optional string`

  - `path_excludes: optional array of string`

  - `path_includes: optional array of string`

  - `repo_connection: optional object { created_on, deleted_on, modified_on, 6 more }`

    - `created_on: optional string`

    - `deleted_on: optional string`

    - `modified_on: optional string`

    - `provider_account_id: optional string`

      Provider account identifier.

    - `provider_account_name: optional string`

    - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

      - `"github"`

      - `"gitlab"`

      - `"gitlab_internal"`

    - `repo_connection_uuid: optional string`

      Repository connection UUID.

    - `repo_id: optional string`

      Repository identifier.

    - `repo_name: optional string`

  - `root_directory: optional string`

    Root directory path.

  - `trigger_name: optional string`

  - `trigger_uuid: optional string`

    Trigger UUID.

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/triggers \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "branch_excludes": [
            "string"
          ],
          "branch_includes": [
            "main"
          ],
          "build_command": "npm run build",
          "build_token_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "deploy_command": "npx wrangler deploy",
          "external_script_id": "dd7160bb9cef458093557736f4b9e75b",
          "path_excludes": [
            "*.md"
          ],
          "path_includes": [
            "*"
          ],
          "repo_connection_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "root_directory": "/",
          "trigger_name": "Production Deploy"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "branch_excludes": [
      "string"
    ],
    "branch_includes": [
      "main"
    ],
    "build_caching_enabled": false,
    "build_command": "npm run build",
    "build_token_name": "My Build Token",
    "build_token_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_on": "2019-12-27T18:11:19.117Z",
    "deleted_on": "2019-12-27T18:11:19.117Z",
    "deploy_command": "npx wrangler deploy",
    "external_script_id": "dd7160bb9cef458093557736f4b9e75b",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "path_excludes": [
      "*.md"
    ],
    "path_includes": [
      "*"
    ],
    "repo_connection": {
      "created_on": "2019-12-27T18:11:19.117Z",
      "deleted_on": "2019-12-27T18:11:19.117Z",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "provider_account_id": "cloudflare",
      "provider_account_name": "Cloudflare",
      "provider_type": "github",
      "repo_connection_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "repo_id": "workers-sdk",
      "repo_name": "workers-sdk"
    },
    "root_directory": "/",
    "trigger_name": "Production Deploy",
    "trigger_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## Update trigger

**patch** `/accounts/{account_id}/builds/triggers/{trigger_uuid}`

Update an existing CI/CD trigger

### Path Parameters

- `account_id: string`

  Account identifier.

- `trigger_uuid: string`

  Trigger UUID.

### Body Parameters

- `branch_excludes: optional array of string`

- `branch_includes: optional array of string`

- `build_caching_enabled: optional boolean`

- `build_command: optional string`

- `build_token_uuid: optional string`

  Build token UUID.

- `deploy_command: optional string`

- `path_excludes: optional array of string`

- `path_includes: optional array of string`

- `root_directory: optional string`

  Root directory path.

- `trigger_name: optional string`

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: object { branch_excludes, branch_includes, build_caching_enabled, 14 more }`

  - `branch_excludes: optional array of string`

  - `branch_includes: optional array of string`

  - `build_caching_enabled: optional boolean`

  - `build_command: optional string`

  - `build_token_name: optional string`

  - `build_token_uuid: optional string`

    Build token UUID.

  - `created_on: optional string`

  - `deleted_on: optional string`

  - `deploy_command: optional string`

  - `external_script_id: optional string`

    System-generated worker script tag.

  - `modified_on: optional string`

  - `path_excludes: optional array of string`

  - `path_includes: optional array of string`

  - `repo_connection: optional object { created_on, deleted_on, modified_on, 6 more }`

    - `created_on: optional string`

    - `deleted_on: optional string`

    - `modified_on: optional string`

    - `provider_account_id: optional string`

      Provider account identifier.

    - `provider_account_name: optional string`

    - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

      - `"github"`

      - `"gitlab"`

      - `"gitlab_internal"`

    - `repo_connection_uuid: optional string`

      Repository connection UUID.

    - `repo_id: optional string`

      Repository identifier.

    - `repo_name: optional string`

  - `root_directory: optional string`

    Root directory path.

  - `trigger_name: optional string`

  - `trigger_uuid: optional string`

    Trigger UUID.

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/triggers/$TRIGGER_UUID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "branch_excludes": [
            "string"
          ],
          "branch_includes": [
            "main"
          ],
          "build_command": "npm run build",
          "deploy_command": "npx wrangler deploy",
          "path_excludes": [
            "*.md"
          ],
          "path_includes": [
            "*"
          ],
          "root_directory": "/",
          "trigger_name": "Production Deploy"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "branch_excludes": [
      "string"
    ],
    "branch_includes": [
      "main"
    ],
    "build_caching_enabled": false,
    "build_command": "npm run build",
    "build_token_name": "My Build Token",
    "build_token_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_on": "2019-12-27T18:11:19.117Z",
    "deleted_on": "2019-12-27T18:11:19.117Z",
    "deploy_command": "npx wrangler deploy",
    "external_script_id": "dd7160bb9cef458093557736f4b9e75b",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "path_excludes": [
      "*.md"
    ],
    "path_includes": [
      "*"
    ],
    "repo_connection": {
      "created_on": "2019-12-27T18:11:19.117Z",
      "deleted_on": "2019-12-27T18:11:19.117Z",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "provider_account_id": "cloudflare",
      "provider_account_name": "Cloudflare",
      "provider_type": "github",
      "repo_connection_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "repo_id": "workers-sdk",
      "repo_name": "workers-sdk"
    },
    "root_directory": "/",
    "trigger_name": "Production Deploy",
    "trigger_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## Delete trigger

**delete** `/accounts/{account_id}/builds/triggers/{trigger_uuid}`

Remove a CI/CD trigger

### Path Parameters

- `account_id: string`

  Account identifier.

- `trigger_uuid: string`

  Trigger UUID.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: unknown`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/triggers/$TRIGGER_UUID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": null,
  "success": true
}
```

## Purge build cache

**post** `/accounts/{account_id}/builds/triggers/{trigger_uuid}/purge_build_cache`

Clear the build cache for a specific trigger

### Path Parameters

- `account_id: string`

  Account identifier.

- `trigger_uuid: string`

  Trigger UUID.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: unknown`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/triggers/$TRIGGER_UUID/purge_build_cache \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": null,
  "success": true
}
```

## Create manual build

**post** `/accounts/{account_id}/builds/triggers/{trigger_uuid}/builds`

Trigger a manual build for a specific trigger

### Path Parameters

- `account_id: string`

  Account identifier.

- `trigger_uuid: string`

  Trigger UUID.

### Body Parameters

- `branch: optional string`

  Git branch name (required if commit_hash not provided)

- `commit_hash: optional string`

  Git commit hash (required if branch not provided)

- `seed_repo: optional object { branch, owner, path, 3 more }`

  - `branch: string`

    Git branch name.

  - `owner: string`

  - `path: string`

  - `provider: "github" or "gitlab" or "gitlab_internal"`

    - `"github"`

    - `"gitlab"`

    - `"gitlab_internal"`

  - `repository: string`

  - `files: optional array of object { content, filename, isBase64, replace }`

    - `content: string`

    - `filename: string`

    - `isBase64: optional boolean`

    - `replace: optional string`

      Text to replace in the file

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: object { build_uuid, created_on }`

  - `build_uuid: optional string`

    Build UUID.

  - `created_on: optional string`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/triggers/$TRIGGER_UUID/builds \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "branch": "main",
          "commit_hash": "abc123def456"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "build_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_on": "2019-12-27T18:11:19.117Z"
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## Domain Types

### Trigger List Response

- `TriggerListResponse object { branch_excludes, branch_includes, build_caching_enabled, 14 more }`

  - `branch_excludes: optional array of string`

  - `branch_includes: optional array of string`

  - `build_caching_enabled: optional boolean`

  - `build_command: optional string`

  - `build_token_name: optional string`

  - `build_token_uuid: optional string`

    Build token UUID.

  - `created_on: optional string`

  - `deleted_on: optional string`

  - `deploy_command: optional string`

  - `external_script_id: optional string`

    System-generated worker script tag.

  - `modified_on: optional string`

  - `path_excludes: optional array of string`

  - `path_includes: optional array of string`

  - `repo_connection: optional object { created_on, deleted_on, modified_on, 6 more }`

    - `created_on: optional string`

    - `deleted_on: optional string`

    - `modified_on: optional string`

    - `provider_account_id: optional string`

      Provider account identifier.

    - `provider_account_name: optional string`

    - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

      - `"github"`

      - `"gitlab"`

      - `"gitlab_internal"`

    - `repo_connection_uuid: optional string`

      Repository connection UUID.

    - `repo_id: optional string`

      Repository identifier.

    - `repo_name: optional string`

  - `root_directory: optional string`

    Root directory path.

  - `trigger_name: optional string`

  - `trigger_uuid: optional string`

    Trigger UUID.

### Trigger Create Response

- `TriggerCreateResponse object { branch_excludes, branch_includes, build_caching_enabled, 14 more }`

  - `branch_excludes: optional array of string`

  - `branch_includes: optional array of string`

  - `build_caching_enabled: optional boolean`

  - `build_command: optional string`

  - `build_token_name: optional string`

  - `build_token_uuid: optional string`

    Build token UUID.

  - `created_on: optional string`

  - `deleted_on: optional string`

  - `deploy_command: optional string`

  - `external_script_id: optional string`

    System-generated worker script tag.

  - `modified_on: optional string`

  - `path_excludes: optional array of string`

  - `path_includes: optional array of string`

  - `repo_connection: optional object { created_on, deleted_on, modified_on, 6 more }`

    - `created_on: optional string`

    - `deleted_on: optional string`

    - `modified_on: optional string`

    - `provider_account_id: optional string`

      Provider account identifier.

    - `provider_account_name: optional string`

    - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

      - `"github"`

      - `"gitlab"`

      - `"gitlab_internal"`

    - `repo_connection_uuid: optional string`

      Repository connection UUID.

    - `repo_id: optional string`

      Repository identifier.

    - `repo_name: optional string`

  - `root_directory: optional string`

    Root directory path.

  - `trigger_name: optional string`

  - `trigger_uuid: optional string`

    Trigger UUID.

### Trigger Update Response

- `TriggerUpdateResponse object { branch_excludes, branch_includes, build_caching_enabled, 14 more }`

  - `branch_excludes: optional array of string`

  - `branch_includes: optional array of string`

  - `build_caching_enabled: optional boolean`

  - `build_command: optional string`

  - `build_token_name: optional string`

  - `build_token_uuid: optional string`

    Build token UUID.

  - `created_on: optional string`

  - `deleted_on: optional string`

  - `deploy_command: optional string`

  - `external_script_id: optional string`

    System-generated worker script tag.

  - `modified_on: optional string`

  - `path_excludes: optional array of string`

  - `path_includes: optional array of string`

  - `repo_connection: optional object { created_on, deleted_on, modified_on, 6 more }`

    - `created_on: optional string`

    - `deleted_on: optional string`

    - `modified_on: optional string`

    - `provider_account_id: optional string`

      Provider account identifier.

    - `provider_account_name: optional string`

    - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

      - `"github"`

      - `"gitlab"`

      - `"gitlab_internal"`

    - `repo_connection_uuid: optional string`

      Repository connection UUID.

    - `repo_id: optional string`

      Repository identifier.

    - `repo_name: optional string`

  - `root_directory: optional string`

    Root directory path.

  - `trigger_name: optional string`

  - `trigger_uuid: optional string`

    Trigger UUID.

### Trigger Delete Response

- `TriggerDeleteResponse = unknown`

### Trigger Purge Cache Response

- `TriggerPurgeCacheResponse = unknown`

### Trigger Create Build Response

- `TriggerCreateBuildResponse object { build_uuid, created_on }`

  - `build_uuid: optional string`

    Build UUID.

  - `created_on: optional string`

# Environment Variables

## List environment variables

**get** `/accounts/{account_id}/builds/triggers/{trigger_uuid}/environment_variables`

Get all environment variables for a trigger

### Path Parameters

- `account_id: string`

  Account identifier.

- `trigger_uuid: string`

  Trigger UUID.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: map[object { created_on, is_secret, value } ]`

  - `created_on: string`

  - `is_secret: boolean`

  - `value: optional string`

    Value is null for secret environment variables

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/triggers/$TRIGGER_UUID/environment_variables \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "API_KEY": {
      "created_on": "2023-01-01T00:00:00Z",
      "is_secret": true,
      "value": null
    },
    "NODE_ENV": {
      "created_on": "2023-01-01T00:00:00Z",
      "is_secret": false,
      "value": "production"
    }
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## Upsert environment variables

**patch** `/accounts/{account_id}/builds/triggers/{trigger_uuid}/environment_variables`

Create or update environment variables for a trigger

### Path Parameters

- `account_id: string`

  Account identifier.

- `trigger_uuid: string`

  Trigger UUID.

### Body Parameters

- `body: map[object { is_secret, value } ]`

  - `is_secret: boolean`

  - `value: optional string`

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: map[object { created_on, is_secret, value } ]`

  - `created_on: string`

  - `is_secret: boolean`

  - `value: optional string`

    Value is null for secret environment variables

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/triggers/$TRIGGER_UUID/environment_variables \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "API_KEY": {
            "is_secret": true,
            "value": "secret-key"
          },
          "NODE_ENV": {
            "is_secret": false,
            "value": "production"
          }
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "API_KEY": {
      "created_on": "2023-01-01T00:00:00Z",
      "is_secret": true,
      "value": null
    },
    "NODE_ENV": {
      "created_on": "2023-01-01T00:00:00Z",
      "is_secret": false,
      "value": "production"
    }
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## Delete environment variable

**delete** `/accounts/{account_id}/builds/triggers/{trigger_uuid}/environment_variables/{environment_variable_key}`

Remove a specific environment variable from a trigger

### Path Parameters

- `account_id: string`

  Account identifier.

- `trigger_uuid: string`

  Trigger UUID.

- `environment_variable_key: string`

  Environment variable key.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: unknown`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/triggers/$TRIGGER_UUID/environment_variables/$ENVIRONMENT_VARIABLE_KEY \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": null,
  "success": true
}
```

## Domain Types

### Environment Variable List Response

- `EnvironmentVariableListResponse = map[object { created_on, is_secret, value } ]`

  - `created_on: string`

  - `is_secret: boolean`

  - `value: optional string`

    Value is null for secret environment variables

### Environment Variable Upsert Response

- `EnvironmentVariableUpsertResponse = map[object { created_on, is_secret, value } ]`

  - `created_on: string`

  - `is_secret: boolean`

  - `value: optional string`

    Value is null for secret environment variables

### Environment Variable Delete Response

- `EnvironmentVariableDeleteResponse = unknown`

# Deploy Hooks

## List deploy hooks

**get** `/accounts/{account_id}/builds/workers/{script_name}/deploy_hooks`

Get all deploy hooks for a specific worker script.

### Path Parameters

- `account_id: string`

  Account identifier.

- `script_name: string`

  Human-readable name of the worker.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: array of object { branch, created_on, deploy_hook_name, 4 more }`

  - `branch: optional string`

    Git branch name.

  - `created_on: optional string`

  - `deploy_hook_name: optional string`

    Deploy hook name (1-58 characters).

  - `deploy_hook_uuid: optional string`

    Deploy hook UUID.

  - `external_script_id: optional string`

    System-generated worker script tag.

  - `latest_build: optional object { created_on }`

    - `created_on: optional string`

  - `modified_on: optional string`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/workers/$SCRIPT_NAME/deploy_hooks \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": [
    {
      "branch": "main",
      "created_on": "2019-12-27T18:11:19.117Z",
      "deploy_hook_name": "Production Deploy Hook",
      "deploy_hook_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "external_script_id": "dd7160bb9cef458093557736f4b9e75b",
      "latest_build": {
        "created_on": "2019-12-27T18:11:19.117Z"
      },
      "modified_on": "2019-12-27T18:11:19.117Z"
    }
  ],
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## Create deploy hook

**post** `/accounts/{account_id}/builds/workers/{script_name}/deploy_hooks`

Create a new deploy hook for a worker script.

### Path Parameters

- `account_id: string`

  Account identifier.

- `script_name: string`

  Human-readable name of the worker.

### Body Parameters

- `branch: string`

  Git branch name.

- `deploy_hook_name: string`

  Deploy hook name (1-58 characters).

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: object { branch, created_on, deploy_hook_name, 3 more }`

  - `branch: optional string`

    Git branch name.

  - `created_on: optional string`

  - `deploy_hook_name: optional string`

    Deploy hook name (1-58 characters).

  - `deploy_hook_uuid: optional string`

    Deploy hook UUID.

  - `external_script_id: optional string`

    System-generated worker script tag.

  - `modified_on: optional string`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/workers/$SCRIPT_NAME/deploy_hooks \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "branch": "main",
          "deploy_hook_name": "Production Deploy Hook"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "branch": "main",
    "created_on": "2019-12-27T18:11:19.117Z",
    "deploy_hook_name": "Production Deploy Hook",
    "deploy_hook_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "external_script_id": "dd7160bb9cef458093557736f4b9e75b",
    "modified_on": "2019-12-27T18:11:19.117Z"
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## Get deploy hook

**get** `/accounts/{account_id}/builds/workers/{script_name}/deploy_hooks/{deploy_hook_uuid}`

Get details of a specific deploy hook.

### Path Parameters

- `account_id: string`

  Account identifier.

- `script_name: string`

  Human-readable name of the worker.

- `deploy_hook_uuid: string`

  Deploy hook UUID.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: object { branch, created_on, deploy_hook_name, 3 more }`

  - `branch: optional string`

    Git branch name.

  - `created_on: optional string`

  - `deploy_hook_name: optional string`

    Deploy hook name (1-58 characters).

  - `deploy_hook_uuid: optional string`

    Deploy hook UUID.

  - `external_script_id: optional string`

    System-generated worker script tag.

  - `modified_on: optional string`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/workers/$SCRIPT_NAME/deploy_hooks/$DEPLOY_HOOK_UUID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "branch": "main",
    "created_on": "2019-12-27T18:11:19.117Z",
    "deploy_hook_name": "Production Deploy Hook",
    "deploy_hook_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "external_script_id": "dd7160bb9cef458093557736f4b9e75b",
    "modified_on": "2019-12-27T18:11:19.117Z"
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## Update deploy hook

**put** `/accounts/{account_id}/builds/workers/{script_name}/deploy_hooks/{deploy_hook_uuid}`

Update an existing deploy hook.

### Path Parameters

- `account_id: string`

  Account identifier.

- `script_name: string`

  Human-readable name of the worker.

- `deploy_hook_uuid: string`

  Deploy hook UUID.

### Body Parameters

- `branch: string`

  Git branch name.

- `deploy_hook_name: string`

  Deploy hook name (1-58 characters).

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: object { branch, created_on, deploy_hook_name, 3 more }`

  - `branch: optional string`

    Git branch name.

  - `created_on: optional string`

  - `deploy_hook_name: optional string`

    Deploy hook name (1-58 characters).

  - `deploy_hook_uuid: optional string`

    Deploy hook UUID.

  - `external_script_id: optional string`

    System-generated worker script tag.

  - `modified_on: optional string`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/workers/$SCRIPT_NAME/deploy_hooks/$DEPLOY_HOOK_UUID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "branch": "main",
          "deploy_hook_name": "Production Deploy Hook"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "branch": "main",
    "created_on": "2019-12-27T18:11:19.117Z",
    "deploy_hook_name": "Production Deploy Hook",
    "deploy_hook_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "external_script_id": "dd7160bb9cef458093557736f4b9e75b",
    "modified_on": "2019-12-27T18:11:19.117Z"
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## Delete deploy hook

**delete** `/accounts/{account_id}/builds/workers/{script_name}/deploy_hooks/{deploy_hook_uuid}`

Delete a deploy hook.

### Path Parameters

- `account_id: string`

  Account identifier.

- `script_name: string`

  Human-readable name of the worker.

- `deploy_hook_uuid: string`

  Deploy hook UUID.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: object { branch, created_on, deploy_hook_name, 3 more }`

  - `branch: optional string`

    Git branch name.

  - `created_on: optional string`

  - `deploy_hook_name: optional string`

    Deploy hook name (1-58 characters).

  - `deploy_hook_uuid: optional string`

    Deploy hook UUID.

  - `external_script_id: optional string`

    System-generated worker script tag.

  - `modified_on: optional string`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/workers/$SCRIPT_NAME/deploy_hooks/$DEPLOY_HOOK_UUID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "branch": "main",
    "created_on": "2019-12-27T18:11:19.117Z",
    "deploy_hook_name": "Production Deploy Hook",
    "deploy_hook_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "external_script_id": "dd7160bb9cef458093557736f4b9e75b",
    "modified_on": "2019-12-27T18:11:19.117Z"
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## Trigger deploy hook

**post** `/workers/builds/deploy_hooks/{deploy_hook_uuid}`

Trigger a build using a deploy hook. This endpoint does not require authentication - the deploy_hook_uuid acts as a secret token.

### Path Parameters

- `deploy_hook_uuid: string`

  Deploy hook UUID.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: object { already_exists, build_uuid, created_on, status }`

  - `already_exists: optional boolean`

    True if a pending build already exists for this branch

  - `build_uuid: optional string`

    Build UUID.

  - `created_on: optional string`

  - `status: optional "queued" or "initializing" or "running" or "stopped"`

    - `"queued"`

    - `"initializing"`

    - `"running"`

    - `"stopped"`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/workers/builds/deploy_hooks/$DEPLOY_HOOK_UUID \
    -X POST \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "already_exists": false,
    "build_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_on": "2019-12-27T18:11:19.117Z",
    "status": "running"
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## Domain Types

### Deploy Hook List Response

- `DeployHookListResponse object { branch, created_on, deploy_hook_name, 4 more }`

  - `branch: optional string`

    Git branch name.

  - `created_on: optional string`

  - `deploy_hook_name: optional string`

    Deploy hook name (1-58 characters).

  - `deploy_hook_uuid: optional string`

    Deploy hook UUID.

  - `external_script_id: optional string`

    System-generated worker script tag.

  - `latest_build: optional object { created_on }`

    - `created_on: optional string`

  - `modified_on: optional string`

### Deploy Hook Create Response

- `DeployHookCreateResponse object { branch, created_on, deploy_hook_name, 3 more }`

  - `branch: optional string`

    Git branch name.

  - `created_on: optional string`

  - `deploy_hook_name: optional string`

    Deploy hook name (1-58 characters).

  - `deploy_hook_uuid: optional string`

    Deploy hook UUID.

  - `external_script_id: optional string`

    System-generated worker script tag.

  - `modified_on: optional string`

### Deploy Hook Get Response

- `DeployHookGetResponse object { branch, created_on, deploy_hook_name, 3 more }`

  - `branch: optional string`

    Git branch name.

  - `created_on: optional string`

  - `deploy_hook_name: optional string`

    Deploy hook name (1-58 characters).

  - `deploy_hook_uuid: optional string`

    Deploy hook UUID.

  - `external_script_id: optional string`

    System-generated worker script tag.

  - `modified_on: optional string`

### Deploy Hook Update Response

- `DeployHookUpdateResponse object { branch, created_on, deploy_hook_name, 3 more }`

  - `branch: optional string`

    Git branch name.

  - `created_on: optional string`

  - `deploy_hook_name: optional string`

    Deploy hook name (1-58 characters).

  - `deploy_hook_uuid: optional string`

    Deploy hook UUID.

  - `external_script_id: optional string`

    System-generated worker script tag.

  - `modified_on: optional string`

### Deploy Hook Delete Response

- `DeployHookDeleteResponse object { branch, created_on, deploy_hook_name, 3 more }`

  - `branch: optional string`

    Git branch name.

  - `created_on: optional string`

  - `deploy_hook_name: optional string`

    Deploy hook name (1-58 characters).

  - `deploy_hook_uuid: optional string`

    Deploy hook UUID.

  - `external_script_id: optional string`

    System-generated worker script tag.

  - `modified_on: optional string`

### Deploy Hook Trigger Response

- `DeployHookTriggerResponse object { already_exists, build_uuid, created_on, status }`

  - `already_exists: optional boolean`

    True if a pending build already exists for this branch

  - `build_uuid: optional string`

    Build UUID.

  - `created_on: optional string`

  - `status: optional "queued" or "initializing" or "running" or "stopped"`

    - `"queued"`

    - `"initializing"`

    - `"running"`

    - `"stopped"`

# Tokens

## Create build token

**post** `/accounts/{account_id}/builds/tokens`

Create a new build authentication token

### Path Parameters

- `account_id: string`

  Account identifier.

### Body Parameters

- `build_token_name: string`

- `build_token_secret: string`

- `cloudflare_token_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: object { build_token_name, build_token_uuid, cloudflare_token_id, owner_type }`

  - `build_token_name: optional string`

  - `build_token_uuid: optional string`

    Build token UUID.

  - `cloudflare_token_id: optional string`

  - `owner_type: optional string`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/tokens \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "build_token_name": "My Build Token",
          "build_token_secret": "super-secret-token",
          "cloudflare_token_id": "cf-token-123"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "build_token_name": "My Build Token",
    "build_token_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "cloudflare_token_id": "cf-token-123",
    "owner_type": "user"
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## List build tokens

**get** `/accounts/{account_id}/builds/tokens`

Get all build tokens with pagination

### Path Parameters

- `account_id: string`

  Account identifier.

### Query Parameters

- `page: optional number`

  Page number for pagination

- `per_page: optional number`

  Number of items per page

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: array of object { build_token_name, build_token_uuid, cloudflare_token_id, owner_type }`

  - `build_token_name: optional string`

  - `build_token_uuid: optional string`

    Build token UUID.

  - `cloudflare_token_id: optional string`

  - `owner_type: optional string`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/tokens \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": [
    {
      "build_token_name": "My Build Token",
      "build_token_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "cloudflare_token_id": "cf-token-123",
      "owner_type": "user"
    }
  ],
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## Delete build token

**delete** `/accounts/{account_id}/builds/tokens/{build_token_uuid}`

Remove a build authentication token

### Path Parameters

- `account_id: string`

  Account identifier.

- `build_token_uuid: string`

  Build token UUID.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: unknown`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/tokens/$BUILD_TOKEN_UUID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": null,
  "success": true
}
```

## Domain Types

### Token Create Response

- `TokenCreateResponse object { build_token_name, build_token_uuid, cloudflare_token_id, owner_type }`

  - `build_token_name: optional string`

  - `build_token_uuid: optional string`

    Build token UUID.

  - `cloudflare_token_id: optional string`

  - `owner_type: optional string`

### Token List Response

- `TokenListResponse object { build_token_name, build_token_uuid, cloudflare_token_id, owner_type }`

  - `build_token_name: optional string`

  - `build_token_uuid: optional string`

    Build token UUID.

  - `cloudflare_token_id: optional string`

  - `owner_type: optional string`

### Token Delete Response

- `TokenDeleteResponse = unknown`

# Repos

# Connections

## Create or update repository connection

**put** `/accounts/{account_id}/builds/repos/connections`

Upsert a repository connection for CI/CD integration

### Path Parameters

- `account_id: string`

  Account identifier.

### Body Parameters

- `provider_account_id: string`

  Provider account identifier.

- `provider_account_name: string`

- `provider_type: "github" or "gitlab" or "gitlab_internal"`

  - `"github"`

  - `"gitlab"`

  - `"gitlab_internal"`

- `repo_id: string`

  Repository identifier.

- `repo_name: string`

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: object { created_on, deleted_on, modified_on, 6 more }`

  - `created_on: optional string`

  - `deleted_on: optional string`

  - `modified_on: optional string`

  - `provider_account_id: optional string`

    Provider account identifier.

  - `provider_account_name: optional string`

  - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

    - `"github"`

    - `"gitlab"`

    - `"gitlab_internal"`

  - `repo_connection_uuid: optional string`

    Repository connection UUID.

  - `repo_id: optional string`

    Repository identifier.

  - `repo_name: optional string`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/repos/connections \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "provider_account_id": "cloudflare",
          "provider_account_name": "Cloudflare",
          "provider_type": "github",
          "repo_id": "workers-sdk",
          "repo_name": "workers-sdk"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "created_on": "2019-12-27T18:11:19.117Z",
    "deleted_on": "2019-12-27T18:11:19.117Z",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "provider_account_id": "cloudflare",
    "provider_account_name": "Cloudflare",
    "provider_type": "github",
    "repo_connection_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "repo_id": "workers-sdk",
    "repo_name": "workers-sdk"
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## Delete repository connection

**delete** `/accounts/{account_id}/builds/repos/connections/{repo_connection_uuid}`

Remove a repository connection

### Path Parameters

- `account_id: string`

  Account identifier.

- `repo_connection_uuid: string`

  Repository connection UUID.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: unknown`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/repos/connections/$REPO_CONNECTION_UUID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": null,
  "success": true
}
```

## Domain Types

### Connection Upsert Response

- `ConnectionUpsertResponse object { created_on, deleted_on, modified_on, 6 more }`

  - `created_on: optional string`

  - `deleted_on: optional string`

  - `modified_on: optional string`

  - `provider_account_id: optional string`

    Provider account identifier.

  - `provider_account_name: optional string`

  - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

    - `"github"`

    - `"gitlab"`

    - `"gitlab_internal"`

  - `repo_connection_uuid: optional string`

    Repository connection UUID.

  - `repo_id: optional string`

    Repository identifier.

  - `repo_name: optional string`

### Connection Delete Response

- `ConnectionDeleteResponse = unknown`

# Config Autofill

## Get repository configuration autofill

**get** `/accounts/{account_id}/builds/repos/{provider_type}/{provider_account_id}/{repo_id}/config_autofill`

Analyze repository for automatic configuration detection

### Path Parameters

- `account_id: string`

  Account identifier.

- `provider_type: "github" or "gitlab" or "gitlab_internal"`

  - `"github"`

  - `"gitlab"`

  - `"gitlab_internal"`

- `provider_account_id: string`

  Provider account identifier.

- `repo_id: string`

  Repository identifier.

### Query Parameters

- `branch: string`

  Git branch name.

- `root_directory: optional string`

  Root directory path.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: object { config_file, default_worker_name, env_worker_names, 2 more }`

  - `config_file: optional string`

  - `default_worker_name: optional string`

  - `env_worker_names: optional map[string]`

  - `package_manager: optional "npm" or "yarn" or "pnpm" or 2 more`

    - `"npm"`

    - `"yarn"`

    - `"pnpm"`

    - `"bun"`

    - `"uv"`

  - `scripts: optional map[string]`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/repos/$PROVIDER_TYPE/$PROVIDER_ACCOUNT_ID/$REPO_ID/config_autofill \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "config_file": "wrangler.toml",
    "default_worker_name": "my-worker",
    "env_worker_names": {
      "production": "my-worker-prod",
      "staging": "my-worker-staging"
    },
    "package_manager": "npm",
    "scripts": {
      "build": "npm run build",
      "test": "npm test"
    }
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## Domain Types

### Config Autofill Get Response

- `ConfigAutofillGetResponse object { config_file, default_worker_name, env_worker_names, 2 more }`

  - `config_file: optional string`

  - `default_worker_name: optional string`

  - `env_worker_names: optional map[string]`

  - `package_manager: optional "npm" or "yarn" or "pnpm" or 2 more`

    - `"npm"`

    - `"yarn"`

    - `"pnpm"`

    - `"bun"`

    - `"uv"`

  - `scripts: optional map[string]`

# Builds

## List builds by script

**get** `/accounts/{account_id}/builds/workers/{external_script_id}/builds`

Get all builds for a specific worker script with pagination

### Path Parameters

- `account_id: string`

  Account identifier.

- `external_script_id: string`

  System-generated worker script tag.

### Query Parameters

- `page: optional number`

  Page number for pagination

- `per_page: optional number`

  Number of items per page

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: array of object { build_outcome, build_trigger_metadata, build_uuid, 8 more }`

  - `build_outcome: optional "success" or "fail" or "skipped" or 2 more`

    - `"success"`

    - `"fail"`

    - `"skipped"`

    - `"cancelled"`

    - `"terminated"`

  - `build_trigger_metadata: optional object { author, branch, build_command, 11 more }`

    - `author: optional string`

    - `branch: optional string`

      Git branch name.

    - `build_command: optional string`

    - `build_token_name: optional string`

    - `build_token_uuid: optional string`

      Build token UUID.

    - `build_trigger_source: optional "push" or "pull_request" or "manual" or "api"`

      - `"push"`

      - `"pull_request"`

      - `"manual"`

      - `"api"`

    - `commit_hash: optional string`

      Git commit hash

    - `commit_message: optional string`

    - `deploy_command: optional string`

    - `environment_variables: optional map[string]`

    - `provider_account_name: optional string`

    - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

      - `"github"`

      - `"gitlab"`

      - `"gitlab_internal"`

    - `repo_name: optional string`

    - `root_directory: optional string`

      Root directory path.

  - `build_uuid: optional string`

    Build UUID.

  - `created_on: optional string`

  - `initializing_on: optional string`

  - `modified_on: optional string`

  - `pull_request: optional object { created_on, pull_request_url }`

    - `created_on: optional string`

    - `pull_request_url: optional string`

  - `running_on: optional string`

  - `status: optional "queued" or "initializing" or "running" or "stopped"`

    - `"queued"`

    - `"initializing"`

    - `"running"`

    - `"stopped"`

  - `stopped_on: optional string`

  - `trigger: optional object { branch_excludes, branch_includes, build_caching_enabled, 12 more }`

    Trigger information without build_token_uuid

    - `branch_excludes: optional array of string`

    - `branch_includes: optional array of string`

    - `build_caching_enabled: optional boolean`

    - `build_command: optional string`

    - `created_on: optional string`

    - `deleted_on: optional string`

    - `deploy_command: optional string`

    - `external_script_id: optional string`

      System-generated worker script tag.

    - `modified_on: optional string`

    - `path_excludes: optional array of string`

    - `path_includes: optional array of string`

    - `repo_connection: optional object { created_on, deleted_on, modified_on, 6 more }`

      - `created_on: optional string`

      - `deleted_on: optional string`

      - `modified_on: optional string`

      - `provider_account_id: optional string`

        Provider account identifier.

      - `provider_account_name: optional string`

      - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

        - `"github"`

        - `"gitlab"`

        - `"gitlab_internal"`

      - `repo_connection_uuid: optional string`

        Repository connection UUID.

      - `repo_id: optional string`

        Repository identifier.

      - `repo_name: optional string`

    - `root_directory: optional string`

      Root directory path.

    - `trigger_name: optional string`

    - `trigger_uuid: optional string`

      Trigger UUID.

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/workers/$EXTERNAL_SCRIPT_ID/builds \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": [
    {
      "build_outcome": "success",
      "build_trigger_metadata": {
        "author": "developer@cloudflare.com",
        "branch": "main",
        "build_command": "npm run build",
        "build_token_name": "My Build Token",
        "build_token_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "build_trigger_source": "push",
        "commit_hash": "abc123def456",
        "commit_message": "Add new feature",
        "deploy_command": "npx wrangler deploy",
        "environment_variables": {
          "foo": "string"
        },
        "provider_account_name": "Cloudflare",
        "provider_type": "github",
        "repo_name": "workers-sdk",
        "root_directory": "/"
      },
      "build_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "created_on": "2019-12-27T18:11:19.117Z",
      "initializing_on": "2019-12-27T18:11:19.117Z",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "pull_request": {
        "created_on": "2019-12-27T18:11:19.117Z",
        "pull_request_url": "https://github.com/cloudflare/workers-sdk/pull/123"
      },
      "running_on": "2019-12-27T18:11:19.117Z",
      "status": "running",
      "stopped_on": "2019-12-27T18:11:19.117Z",
      "trigger": {
        "branch_excludes": [
          "string"
        ],
        "branch_includes": [
          "main"
        ],
        "build_caching_enabled": false,
        "build_command": "npm run build",
        "created_on": "2019-12-27T18:11:19.117Z",
        "deleted_on": "2019-12-27T18:11:19.117Z",
        "deploy_command": "npx wrangler deploy",
        "external_script_id": "dd7160bb9cef458093557736f4b9e75b",
        "modified_on": "2019-12-27T18:11:19.117Z",
        "path_excludes": [
          "*.md"
        ],
        "path_includes": [
          "*"
        ],
        "repo_connection": {
          "created_on": "2019-12-27T18:11:19.117Z",
          "deleted_on": "2019-12-27T18:11:19.117Z",
          "modified_on": "2019-12-27T18:11:19.117Z",
          "provider_account_id": "cloudflare",
          "provider_account_name": "Cloudflare",
          "provider_type": "github",
          "repo_connection_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "repo_id": "workers-sdk",
          "repo_name": "workers-sdk"
        },
        "root_directory": "/",
        "trigger_name": "Production Deploy",
        "trigger_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    }
  ],
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## Get build by UUID

**get** `/accounts/{account_id}/builds/builds/{build_uuid}`

Retrieve detailed information about a specific build

### Path Parameters

- `account_id: string`

  Account identifier.

- `build_uuid: string`

  Build UUID.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: object { build_outcome, build_trigger_metadata, build_uuid, 8 more }`

  - `build_outcome: optional "success" or "fail" or "skipped" or 2 more`

    - `"success"`

    - `"fail"`

    - `"skipped"`

    - `"cancelled"`

    - `"terminated"`

  - `build_trigger_metadata: optional object { author, branch, build_command, 11 more }`

    - `author: optional string`

    - `branch: optional string`

      Git branch name.

    - `build_command: optional string`

    - `build_token_name: optional string`

    - `build_token_uuid: optional string`

      Build token UUID.

    - `build_trigger_source: optional "push" or "pull_request" or "manual" or "api"`

      - `"push"`

      - `"pull_request"`

      - `"manual"`

      - `"api"`

    - `commit_hash: optional string`

      Git commit hash

    - `commit_message: optional string`

    - `deploy_command: optional string`

    - `environment_variables: optional map[string]`

    - `provider_account_name: optional string`

    - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

      - `"github"`

      - `"gitlab"`

      - `"gitlab_internal"`

    - `repo_name: optional string`

    - `root_directory: optional string`

      Root directory path.

  - `build_uuid: optional string`

    Build UUID.

  - `created_on: optional string`

  - `initializing_on: optional string`

  - `modified_on: optional string`

  - `pull_request: optional object { created_on, pull_request_url }`

    - `created_on: optional string`

    - `pull_request_url: optional string`

  - `running_on: optional string`

  - `status: optional "queued" or "initializing" or "running" or "stopped"`

    - `"queued"`

    - `"initializing"`

    - `"running"`

    - `"stopped"`

  - `stopped_on: optional string`

  - `trigger: optional object { branch_excludes, branch_includes, build_caching_enabled, 12 more }`

    Trigger information without build_token_uuid

    - `branch_excludes: optional array of string`

    - `branch_includes: optional array of string`

    - `build_caching_enabled: optional boolean`

    - `build_command: optional string`

    - `created_on: optional string`

    - `deleted_on: optional string`

    - `deploy_command: optional string`

    - `external_script_id: optional string`

      System-generated worker script tag.

    - `modified_on: optional string`

    - `path_excludes: optional array of string`

    - `path_includes: optional array of string`

    - `repo_connection: optional object { created_on, deleted_on, modified_on, 6 more }`

      - `created_on: optional string`

      - `deleted_on: optional string`

      - `modified_on: optional string`

      - `provider_account_id: optional string`

        Provider account identifier.

      - `provider_account_name: optional string`

      - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

        - `"github"`

        - `"gitlab"`

        - `"gitlab_internal"`

      - `repo_connection_uuid: optional string`

        Repository connection UUID.

      - `repo_id: optional string`

        Repository identifier.

      - `repo_name: optional string`

    - `root_directory: optional string`

      Root directory path.

    - `trigger_name: optional string`

    - `trigger_uuid: optional string`

      Trigger UUID.

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/builds/$BUILD_UUID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "build_outcome": "success",
    "build_trigger_metadata": {
      "author": "developer@cloudflare.com",
      "branch": "main",
      "build_command": "npm run build",
      "build_token_name": "My Build Token",
      "build_token_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "build_trigger_source": "push",
      "commit_hash": "abc123def456",
      "commit_message": "Add new feature",
      "deploy_command": "npx wrangler deploy",
      "environment_variables": {
        "foo": "string"
      },
      "provider_account_name": "Cloudflare",
      "provider_type": "github",
      "repo_name": "workers-sdk",
      "root_directory": "/"
    },
    "build_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_on": "2019-12-27T18:11:19.117Z",
    "initializing_on": "2019-12-27T18:11:19.117Z",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "pull_request": {
      "created_on": "2019-12-27T18:11:19.117Z",
      "pull_request_url": "https://github.com/cloudflare/workers-sdk/pull/123"
    },
    "running_on": "2019-12-27T18:11:19.117Z",
    "status": "running",
    "stopped_on": "2019-12-27T18:11:19.117Z",
    "trigger": {
      "branch_excludes": [
        "string"
      ],
      "branch_includes": [
        "main"
      ],
      "build_caching_enabled": false,
      "build_command": "npm run build",
      "created_on": "2019-12-27T18:11:19.117Z",
      "deleted_on": "2019-12-27T18:11:19.117Z",
      "deploy_command": "npx wrangler deploy",
      "external_script_id": "dd7160bb9cef458093557736f4b9e75b",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "path_excludes": [
        "*.md"
      ],
      "path_includes": [
        "*"
      ],
      "repo_connection": {
        "created_on": "2019-12-27T18:11:19.117Z",
        "deleted_on": "2019-12-27T18:11:19.117Z",
        "modified_on": "2019-12-27T18:11:19.117Z",
        "provider_account_id": "cloudflare",
        "provider_account_name": "Cloudflare",
        "provider_type": "github",
        "repo_connection_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "repo_id": "workers-sdk",
        "repo_name": "workers-sdk"
      },
      "root_directory": "/",
      "trigger_name": "Production Deploy",
      "trigger_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    }
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## Cancel build

**put** `/accounts/{account_id}/builds/builds/{build_uuid}/cancel`

Cancel a running or queued build

### Path Parameters

- `account_id: string`

  Account identifier.

- `build_uuid: string`

  Build UUID.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: object { build_outcome, build_uuid, stopped_on }`

  - `build_outcome: optional "success" or "fail" or "skipped" or 2 more`

    - `"success"`

    - `"fail"`

    - `"skipped"`

    - `"cancelled"`

    - `"terminated"`

  - `build_uuid: optional string`

    Build UUID.

  - `stopped_on: optional string`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/builds/$BUILD_UUID/cancel \
    -X PUT \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "build_outcome": "success",
    "build_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "stopped_on": "2019-12-27T18:11:19.117Z"
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## Domain Types

### Build List Response

- `BuildListResponse object { build_outcome, build_trigger_metadata, build_uuid, 8 more }`

  - `build_outcome: optional "success" or "fail" or "skipped" or 2 more`

    - `"success"`

    - `"fail"`

    - `"skipped"`

    - `"cancelled"`

    - `"terminated"`

  - `build_trigger_metadata: optional object { author, branch, build_command, 11 more }`

    - `author: optional string`

    - `branch: optional string`

      Git branch name.

    - `build_command: optional string`

    - `build_token_name: optional string`

    - `build_token_uuid: optional string`

      Build token UUID.

    - `build_trigger_source: optional "push" or "pull_request" or "manual" or "api"`

      - `"push"`

      - `"pull_request"`

      - `"manual"`

      - `"api"`

    - `commit_hash: optional string`

      Git commit hash

    - `commit_message: optional string`

    - `deploy_command: optional string`

    - `environment_variables: optional map[string]`

    - `provider_account_name: optional string`

    - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

      - `"github"`

      - `"gitlab"`

      - `"gitlab_internal"`

    - `repo_name: optional string`

    - `root_directory: optional string`

      Root directory path.

  - `build_uuid: optional string`

    Build UUID.

  - `created_on: optional string`

  - `initializing_on: optional string`

  - `modified_on: optional string`

  - `pull_request: optional object { created_on, pull_request_url }`

    - `created_on: optional string`

    - `pull_request_url: optional string`

  - `running_on: optional string`

  - `status: optional "queued" or "initializing" or "running" or "stopped"`

    - `"queued"`

    - `"initializing"`

    - `"running"`

    - `"stopped"`

  - `stopped_on: optional string`

  - `trigger: optional object { branch_excludes, branch_includes, build_caching_enabled, 12 more }`

    Trigger information without build_token_uuid

    - `branch_excludes: optional array of string`

    - `branch_includes: optional array of string`

    - `build_caching_enabled: optional boolean`

    - `build_command: optional string`

    - `created_on: optional string`

    - `deleted_on: optional string`

    - `deploy_command: optional string`

    - `external_script_id: optional string`

      System-generated worker script tag.

    - `modified_on: optional string`

    - `path_excludes: optional array of string`

    - `path_includes: optional array of string`

    - `repo_connection: optional object { created_on, deleted_on, modified_on, 6 more }`

      - `created_on: optional string`

      - `deleted_on: optional string`

      - `modified_on: optional string`

      - `provider_account_id: optional string`

        Provider account identifier.

      - `provider_account_name: optional string`

      - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

        - `"github"`

        - `"gitlab"`

        - `"gitlab_internal"`

      - `repo_connection_uuid: optional string`

        Repository connection UUID.

      - `repo_id: optional string`

        Repository identifier.

      - `repo_name: optional string`

    - `root_directory: optional string`

      Root directory path.

    - `trigger_name: optional string`

    - `trigger_uuid: optional string`

      Trigger UUID.

### Build Get Response

- `BuildGetResponse object { build_outcome, build_trigger_metadata, build_uuid, 8 more }`

  - `build_outcome: optional "success" or "fail" or "skipped" or 2 more`

    - `"success"`

    - `"fail"`

    - `"skipped"`

    - `"cancelled"`

    - `"terminated"`

  - `build_trigger_metadata: optional object { author, branch, build_command, 11 more }`

    - `author: optional string`

    - `branch: optional string`

      Git branch name.

    - `build_command: optional string`

    - `build_token_name: optional string`

    - `build_token_uuid: optional string`

      Build token UUID.

    - `build_trigger_source: optional "push" or "pull_request" or "manual" or "api"`

      - `"push"`

      - `"pull_request"`

      - `"manual"`

      - `"api"`

    - `commit_hash: optional string`

      Git commit hash

    - `commit_message: optional string`

    - `deploy_command: optional string`

    - `environment_variables: optional map[string]`

    - `provider_account_name: optional string`

    - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

      - `"github"`

      - `"gitlab"`

      - `"gitlab_internal"`

    - `repo_name: optional string`

    - `root_directory: optional string`

      Root directory path.

  - `build_uuid: optional string`

    Build UUID.

  - `created_on: optional string`

  - `initializing_on: optional string`

  - `modified_on: optional string`

  - `pull_request: optional object { created_on, pull_request_url }`

    - `created_on: optional string`

    - `pull_request_url: optional string`

  - `running_on: optional string`

  - `status: optional "queued" or "initializing" or "running" or "stopped"`

    - `"queued"`

    - `"initializing"`

    - `"running"`

    - `"stopped"`

  - `stopped_on: optional string`

  - `trigger: optional object { branch_excludes, branch_includes, build_caching_enabled, 12 more }`

    Trigger information without build_token_uuid

    - `branch_excludes: optional array of string`

    - `branch_includes: optional array of string`

    - `build_caching_enabled: optional boolean`

    - `build_command: optional string`

    - `created_on: optional string`

    - `deleted_on: optional string`

    - `deploy_command: optional string`

    - `external_script_id: optional string`

      System-generated worker script tag.

    - `modified_on: optional string`

    - `path_excludes: optional array of string`

    - `path_includes: optional array of string`

    - `repo_connection: optional object { created_on, deleted_on, modified_on, 6 more }`

      - `created_on: optional string`

      - `deleted_on: optional string`

      - `modified_on: optional string`

      - `provider_account_id: optional string`

        Provider account identifier.

      - `provider_account_name: optional string`

      - `provider_type: optional "github" or "gitlab" or "gitlab_internal"`

        - `"github"`

        - `"gitlab"`

        - `"gitlab_internal"`

      - `repo_connection_uuid: optional string`

        Repository connection UUID.

      - `repo_id: optional string`

        Repository identifier.

      - `repo_name: optional string`

    - `root_directory: optional string`

      Root directory path.

    - `trigger_name: optional string`

    - `trigger_uuid: optional string`

      Trigger UUID.

### Build Cancel Response

- `BuildCancelResponse object { build_outcome, build_uuid, stopped_on }`

  - `build_outcome: optional "success" or "fail" or "skipped" or 2 more`

    - `"success"`

    - `"fail"`

    - `"skipped"`

    - `"cancelled"`

    - `"terminated"`

  - `build_uuid: optional string`

    Build UUID.

  - `stopped_on: optional string`

# Logs

## Get build logs

**get** `/accounts/{account_id}/builds/builds/{build_uuid}/logs`

Retrieve logs for a specific build with cursor-based pagination

### Path Parameters

- `account_id: string`

  Account identifier.

- `build_uuid: string`

  Build UUID.

### Query Parameters

- `cursor: optional string`

  Pagination cursor for log retrieval.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: object { cursor, lines, truncated }`

  - `cursor: optional string`

    Pagination cursor for log retrieval.

  - `lines: optional array of array of number or string`

    - `number`

      Unix epoch timestamp

    - `string`

      Log message

  - `truncated: optional boolean`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/builds/$BUILD_UUID/logs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "cursor": "eyJsaW5lIjoxMDAsInRpbWVzdGFtcCI6MTYzNjQ3MjQwMH0",
    "lines": [
      [
        1636472400,
        1636472400
      ]
    ],
    "truncated": false
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

## Domain Types

### Log Get Response

- `LogGetResponse object { cursor, lines, truncated }`

  - `cursor: optional string`

    Pagination cursor for log retrieval.

  - `lines: optional array of array of number or string`

    - `number`

      Unix epoch timestamp

    - `string`

      Log message

  - `truncated: optional boolean`
