## Creates a new data class

**post** `/accounts/{account_id}/dlp/data_classes`

Creates a new data class

### Path Parameters

- `account_id: string`

### Body Parameters

- `data_tags: array of string`

- `expression: string`

- `name: string`

- `sensitivity_levels: array of object { group_id, level_id }`

  - `group_id: string`

  - `level_id: string`

- `description: optional string`

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

- `result: optional object { id, created_at, data_tags, 5 more }`

  - `id: string`

  - `created_at: string`

  - `data_tags: array of string`

  - `expression: string`

  - `name: string`

  - `sensitivity_levels: array of object { group_id, level_id }`

    - `group_id: string`

    - `level_id: string`

  - `updated_at: string`

  - `description: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/data_classes \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "data_tags": [
            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          ],
          "expression": "expression",
          "name": "name",
          "sensitivity_levels": [
            {
              "group_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
              "level_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
            }
          ]
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "data_tags": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "expression": "expression",
    "name": "name",
    "sensitivity_levels": [
      {
        "group_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "level_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    ],
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description"
  }
}
```
