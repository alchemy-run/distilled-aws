# Logos

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

## Delete logo query

**delete** `/accounts/{account_id}/cloudforce-one/v2/brand-protection/logo/queries/{query_id}`

Delete a saved brand protection logo query. Returns 404 if the query ID doesn't exist.

### Path Parameters

- `account_id: string`

- `query_id: string`

### Returns

- `message: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/v2/brand-protection/logo/queries/$QUERY_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "message": "message",
  "success": true
}
```

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

## Domain Types

### Logo Create Response

- `LogoCreateResponse object { message, success, query_id }`

  - `message: string`

  - `success: boolean`

  - `query_id: optional number`

### Logo Delete Response

- `LogoDeleteResponse object { message, success }`

  - `message: string`

  - `success: boolean`

### Logo Get Response

- `LogoGetResponse = array of object { id, r2_path, similarity_threshold, 4 more }`

  - `id: number`

  - `r2_path: string`

  - `similarity_threshold: number`

  - `tag: string`

  - `uploaded_at: string`

  - `content_type: optional string`

    MIME type of the image (only present when download=true)

  - `image_data: optional string`

    Base64-encoded image data (only present when download=true)
