## List all Workflows

**get** `/accounts/{account_id}/workflows`

Lists all workflows configured for the account.

### Path Parameters

- `account_id: string`

### Query Parameters

- `page: optional number`

- `per_page: optional number`

- `search: optional string`

  Allows filtering workflows` name.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: array of object { id, class_name, created_on, 6 more }`

  - `id: string`

  - `class_name: string`

  - `created_on: string`

  - `instances: object { complete, errored, paused, 6 more }`

    - `complete: optional number`

    - `errored: optional number`

    - `paused: optional number`

    - `queued: optional number`

    - `rollingBack: optional number`

    - `running: optional number`

    - `terminated: optional number`

    - `waiting: optional number`

    - `waitingForPause: optional number`

  - `modified_on: string`

  - `name: string`

  - `script_name: string`

  - `triggered_on: string`

  - `schedules: optional array of object { cron, next_instance }`

    - `cron: string`

    - `next_instance: string`

- `success: true`

  - `true`

- `result_info: optional object { count, per_page, total_count, 3 more }`

  - `count: number`

  - `per_page: number`

  - `total_count: number`

  - `cursor: optional string`

  - `page: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workflows \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "class_name": "class_name",
      "created_on": "2019-12-27T18:11:19.117Z",
      "instances": {
        "complete": 0,
        "errored": 0,
        "paused": 0,
        "queued": 0,
        "rollingBack": 0,
        "running": 0,
        "terminated": 0,
        "waiting": 0,
        "waitingForPause": 0
      },
      "modified_on": "2019-12-27T18:11:19.117Z",
      "name": "x",
      "script_name": "script_name",
      "triggered_on": "2019-12-27T18:11:19.117Z",
      "schedules": [
        {
          "cron": "cron",
          "next_instance": "next_instance"
        }
      ]
    }
  ],
  "success": true,
  "result_info": {
    "count": 0,
    "per_page": 0,
    "total_count": 0,
    "cursor": "cursor",
    "page": 0,
    "total_pages": 0
  }
}
```
