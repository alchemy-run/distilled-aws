## Create new saved logo queries from image files

**post** `/accounts/{account_id}/brand-protection/logos`

Return new saved logo queries created from image files

### Path Parameters

- `account_id: string`

### Query Parameters

- `match_type: optional string`

- `tag: optional string`

- `threshold: optional number`

### Returns

- `id: optional number`

- `tag: optional string`

- `upload_path: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/brand-protection/logos \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "id": 0,
  "tag": "tag",
  "upload_path": "upload_path"
}
```
