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
