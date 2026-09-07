## Download Item Content.

**get** `/accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/items/{item_id}/download`

Downloads the raw file content for a specific item from the managed AI Search instance storage.

### Path Parameters

- `account_id: string`

- `name: string`

- `id: string`

  AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

- `item_id: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/items/$ITEM_ID/download \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
