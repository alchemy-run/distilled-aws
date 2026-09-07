# Logos

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

## Delete saved logo queries by ID

**delete** `/accounts/{account_id}/brand-protection/logos/{logo_id}`

Return a success message after deleting saved logo queries by ID

### Path Parameters

- `account_id: string`

- `logo_id: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/brand-protection/logos/$LOGO_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Domain Types

### Logo Create Response

- `LogoCreateResponse object { id, tag, upload_path }`

  - `id: optional number`

  - `tag: optional string`

  - `upload_path: optional string`
