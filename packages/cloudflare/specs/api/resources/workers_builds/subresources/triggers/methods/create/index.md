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
