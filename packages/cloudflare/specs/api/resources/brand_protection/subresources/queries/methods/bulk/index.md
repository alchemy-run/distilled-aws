## Create new saved string queries in bulk

**post** `/accounts/{account_id}/brand-protection/queries/bulk`

Return a success message after creating new saved string queries in bulk

### Path Parameters

- `account_id: string`

### Body Parameters

- `queries: optional array of map[unknown]`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/brand-protection/queries/bulk \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```
