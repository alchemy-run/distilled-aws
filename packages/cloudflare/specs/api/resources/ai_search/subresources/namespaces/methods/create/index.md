## Create namespace.

**post** `/accounts/{account_id}/ai-search/namespaces`

Create a new namespace.

### Path Parameters

- `account_id: string`

### Body Parameters

- `name: string`

- `description: optional string`

  Optional description for the namespace. Max 256 characters.

### Returns

- `result: object { created_at, name, description }`

  - `created_at: string`

  - `name: string`

  - `description: optional string`

    Optional description for the namespace. Max 256 characters.

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "name",
          "description": "Production environment"
        }'
```

#### Response

```json
{
  "result": {
    "created_at": "2019-12-27T18:11:19.117Z",
    "name": "production",
    "description": "Production environment"
  },
  "success": true
}
```
