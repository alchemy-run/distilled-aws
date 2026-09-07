## Get application category

**get** `/accounts/{account_id}/resource-library/categories/{id}`

Get application category by ID.

### Path Parameters

- `account_id: string`

- `id: string`

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

  Indicates whether the API call was successful.

  - `true`

- `result: optional object { id, created_at, description, name }`

  - `id: string`

    Returns the category ID.

  - `created_at: string`

    Returns the category creation time.

  - `description: string`

    Returns the category description.

  - `name: string`

    Returns the category name.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/resource-library/categories/$ID \
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
  "result": {
    "id": "12345678-1234-1234-1234-123456789012",
    "created_at": "2025-01-01T00:00:00Z",
    "description": "Category description",
    "name": "Category name"
  }
}
```
