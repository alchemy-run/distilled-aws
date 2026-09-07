## Update namespace.

**put** `/accounts/{account_id}/ai-search/namespaces/{name}`

Update namespace.

### Path Parameters

- `account_id: string`

- `name: string`

### Body Parameters

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME \
    -X PUT \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
