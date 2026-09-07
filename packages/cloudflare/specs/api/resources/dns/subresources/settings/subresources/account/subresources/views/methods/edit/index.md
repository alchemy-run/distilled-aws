## Update Internal DNS View

**patch** `/accounts/{account_id}/dns_settings/views/{view_id}`

Update an existing Internal DNS View

### Path Parameters

- `account_id: string`

  Identifier.

- `view_id: string`

  Identifier.

### Body Parameters

- `name: optional string`

  The name of the view.

- `zones: optional array of string`

  The list of zones linked to this view.

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

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { id, created_time, modified_time, 2 more }`

  - `id: string`

    Identifier.

  - `created_time: string`

    When the view was created.

  - `modified_time: string`

    When the view was last modified.

  - `name: string`

    The name of the view.

  - `zones: array of string`

    The list of zones linked to this view.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_settings/views/$VIEW_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "my view"
        }'
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
  "success": true,
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_time": "2014-01-01T05:20:00.12345Z",
    "modified_time": "2014-01-01T05:20:00.12345Z",
    "name": "my view",
    "zones": [
      "372e67954025e0ba6aaa6d586b9e0b59"
    ]
  }
}
```
