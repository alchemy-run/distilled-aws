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
