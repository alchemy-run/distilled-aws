## Insert logo query

**post** `/accounts/{account_id}/cloudforce-one/v2/brand-protection/logo/queries`

Create a new saved brand protection logo query for visual similarity matching

### Path Parameters

- `account_id: string`

### Body Parameters

- `image_data: string`

  Base64 encoded image data. Can include data URI prefix (e.g., 'data:image/png;base64,...') or just the base64 string.

- `similarity_threshold: number`

  Minimum similarity score (0-1) required for visual matches

- `tag: string`

  Unique identifier for the logo query

- `search_lookback: optional boolean`

  If true, search historic scanned images for matches above the similarity threshold

### Returns

- `message: string`

- `success: boolean`

- `query_id: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/v2/brand-protection/logo/queries \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "image_data": "x",
          "similarity_threshold": 0,
          "tag": "x"
        }'
```

#### Response

```json
{
  "message": "message",
  "success": true,
  "query_id": 0
}
```
