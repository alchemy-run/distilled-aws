## Delete Item.

**delete** `/accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/items/{item_id}`

Deletes a file from a managed AI Search instance and triggers a reindex.

### Path Parameters

- `account_id: string`

- `name: string`

- `id: string`

  AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

- `item_id: string`

### Returns

- `result: object { key }`

  - `key: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/items/$ITEM_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "key": "key"
  },
  "success": true
}
```
