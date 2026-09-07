## Create new saved string queries

**post** `/accounts/{account_id}/brand-protection/queries`

Return a success message after creating new saved string queries

### Path Parameters

- `account_id: string`

### Query Parameters

- `id: optional string`

- `scan: optional boolean`

- `tag: optional string`

### Body Parameters

- `max_time: optional string`

- `min_time: optional string`

- `scan: optional boolean`

- `string_matches: optional unknown`

- `tag: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/brand-protection/queries \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```
