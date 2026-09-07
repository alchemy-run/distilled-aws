## Get logo queries

**get** `/accounts/{account_id}/cloudforce-one/v2/brand-protection/logo/queries`

Get all saved brand protection logo queries for an account. Optionally specify id to get a single query. Set download=true to include base64-encoded image data.

### Path Parameters

- `account_id: string`

### Query Parameters

- `id: optional string`

  Optional query ID to retrieve a specific logo query

- `download: optional string`

  If true, include base64-encoded image data in the response

### Returns

- `id: number`

- `r2_path: string`

- `similarity_threshold: number`

- `tag: string`

- `uploaded_at: string`

- `content_type: optional string`

  MIME type of the image (only present when download=true)

- `image_data: optional string`

  Base64-encoded image data (only present when download=true)

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/v2/brand-protection/logo/queries \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
[
  {
    "id": 0,
    "r2_path": "r2_path",
    "similarity_threshold": 0,
    "tag": "tag",
    "uploaded_at": "uploaded_at",
    "content_type": "content_type",
    "image_data": "image_data"
  }
]
```
