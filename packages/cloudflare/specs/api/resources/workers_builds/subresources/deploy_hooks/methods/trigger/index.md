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
