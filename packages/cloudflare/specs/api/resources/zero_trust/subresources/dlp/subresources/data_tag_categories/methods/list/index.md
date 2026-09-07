## Retrieve all data tag categories in an account

**get** `/accounts/{account_id}/dlp/data_tag_categories`

Retrieve all data tag categories in an account

### Path Parameters

- `account_id: string`

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

- `result: optional array of object { id, created_at, name, 4 more }`

  - `id: string`

  - `created_at: string`

  - `name: string`

  - `tags: array of object { id, created_at, name, 2 more }`

    - `id: string`

    - `created_at: string`

    - `name: string`

    - `updated_at: string`

    - `description: optional string`

  - `updated_at: string`

  - `description: optional string`

  - `template_id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/data_tag_categories \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "created_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "tags": [
        {
          "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "created_at": "2019-12-27T18:11:19.117Z",
          "name": "name",
          "updated_at": "2019-12-27T18:11:19.117Z",
          "description": "description"
        }
      ],
      "updated_at": "2019-12-27T18:11:19.117Z",
      "description": "description",
      "template_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    }
  ]
}
```
