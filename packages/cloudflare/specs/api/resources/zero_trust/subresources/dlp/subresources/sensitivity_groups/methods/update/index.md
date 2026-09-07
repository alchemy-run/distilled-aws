## Update the attributes of a single sensitivity group.

**put** `/accounts/{account_id}/dlp/sensitivity_groups/{sensitivity_group_id}`

Update the attributes of a single sensitivity group.

### Path Parameters

- `account_id: string`

- `sensitivity_group_id: string`

### Body Parameters

- `description: optional string`

- `levels: optional array of object { id, description, name }`

  The desired final state of levels.

  - `None` (omitted): no level changes.
  - `Some([])`: delete all levels.
  - `Some([...])`: desired final set + order.

  - `id: optional string`

    If `None` (omitted), a new level will be created. Otherwise, an existing level will
    be updated.

  - `description: optional string`

  - `name: optional string`

- `name: optional string`

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

- `result: optional object { id, created_at, levels, 4 more }`

  - `id: string`

  - `created_at: string`

  - `levels: array of object { id, created_at, name, 2 more }`

    - `id: string`

    - `created_at: string`

    - `name: string`

    - `updated_at: string`

    - `description: optional string`

  - `name: string`

  - `updated_at: string`

  - `description: optional string`

  - `template_id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/sensitivity_groups/$SENSITIVITY_GROUP_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "levels": [
      {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_at": "2019-12-27T18:11:19.117Z",
        "name": "name",
        "updated_at": "2019-12-27T18:11:19.117Z",
        "description": "description"
      }
    ],
    "name": "name",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description",
    "template_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  }
}
```
