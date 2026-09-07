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
