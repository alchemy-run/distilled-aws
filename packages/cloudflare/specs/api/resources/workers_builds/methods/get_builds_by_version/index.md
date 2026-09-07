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
