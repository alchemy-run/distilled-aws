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
