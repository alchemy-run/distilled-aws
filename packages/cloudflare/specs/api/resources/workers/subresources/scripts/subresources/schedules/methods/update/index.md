## Update Cron Triggers

**put** `/accounts/{account_id}/workers/scripts/{script_name}/schedules`

Updates Cron Triggers for a Worker.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

### Body Parameters

- `body: array of object { cron, created_on, modified_on }`

  - `cron: string`

  - `created_on: optional string`

  - `modified_on: optional string`

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: object { schedules }`

  - `schedules: array of object { cron, created_on, modified_on }`

    - `cron: string`

    - `created_on: optional string`

    - `modified_on: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/schedules \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "cron": "*/30 * * * *"
          }
        ]'
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "schedules": [
      {
        "cron": "*/30 * * * *",
        "created_on": "created_on",
        "modified_on": "modified_on"
      }
    ]
  },
  "success": true
}
```
