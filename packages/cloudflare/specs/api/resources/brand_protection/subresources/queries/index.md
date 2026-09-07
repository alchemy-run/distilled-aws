# Queries

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

## Delete saved string queries by ID

**delete** `/accounts/{account_id}/brand-protection/queries`

Return a success message after deleting saved string queries by ID

### Path Parameters

- `account_id: string`

### Query Parameters

- `id: optional string`

- `scan: optional boolean`

- `tag: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/brand-protection/queries \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

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
