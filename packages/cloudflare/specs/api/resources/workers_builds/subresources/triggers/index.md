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
