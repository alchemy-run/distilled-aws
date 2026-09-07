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
