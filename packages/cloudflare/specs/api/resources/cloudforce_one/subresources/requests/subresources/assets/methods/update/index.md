## Update a Request Asset

**put** `/accounts/{account_id}/cloudforce-one/requests/{request_id}/asset/{asset_id}`

Updates an asset in a Cloudforce One intelligence request.

### Path Parameters

- `account_id: string`

  Identifier.

- `request_id: string`

  UUID.

- `asset_id: string`

  UUID.

### Body Parameters

- `source: optional string`

  Asset file to upload.

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

- `result: optional object { id, name, created, 2 more }`

  - `id: number`

    Asset ID.

  - `name: string`

    Asset name.

  - `created: optional string`

    Defines the asset creation time.

  - `description: optional string`

    Asset description.

  - `file_type: optional string`

    Asset file type.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/$REQUEST_ID/asset/$ASSET_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "source": "@/Users/me/example.docx"
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
    "id": 0,
    "name": "example.docx",
    "created": "2022-01-01T00:00:00Z",
    "description": "example description",
    "file_type": "docx"
  }
}
```
