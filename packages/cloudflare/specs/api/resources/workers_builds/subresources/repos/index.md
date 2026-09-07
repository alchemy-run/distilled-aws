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
