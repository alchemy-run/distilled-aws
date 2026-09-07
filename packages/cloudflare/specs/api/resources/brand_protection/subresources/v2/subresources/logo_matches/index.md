# Logo Matches

## List logo matches

**get** `/accounts/{account_id}/cloudforce-one/v2/brand-protection/logo/matches`

Get paginated list of logo matches for a specific brand protection logo query

### Path Parameters

- `account_id: string`

### Query Parameters

- `query_id: string`

- `download: optional string`

- `limit: optional string`

- `offset: optional string`

- `order: optional "asc" or "desc"`

  Sort order. Options: 'asc' (ascending) or 'desc' (descending)

  - `"asc"`

  - `"desc"`

- `orderBy: optional "matchedAt" or "domain" or "similarityScore" or "registrar"`

  Column to sort by. Options: 'matchedAt', 'domain', 'similarityScore', or 'registrar'

  - `"matchedAt"`

  - `"domain"`

  - `"similarityScore"`

  - `"registrar"`

### Returns

- `matches: array of object { id, domain, matched_at, 6 more }`

  - `id: number`

  - `domain: string`

  - `matched_at: string`

  - `query_id: number`

  - `registrar: string`

  - `similarity_score: number`

  - `url_scan_id: string`

  - `content_type: optional string`

  - `image_data: optional string`

- `total: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/v2/brand-protection/logo/matches \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "matches": [
    {
      "id": 0,
      "domain": "domain",
      "matched_at": "matched_at",
      "query_id": 0,
      "registrar": "registrar",
      "similarity_score": 0,
      "url_scan_id": "url_scan_id",
      "content_type": "content_type",
      "image_data": "image_data"
    }
  ],
  "total": 0
}
```

## Domain Types

### Logo Match Get Response

- `LogoMatchGetResponse object { matches, total }`

  - `matches: array of object { id, domain, matched_at, 6 more }`

    - `id: number`

    - `domain: string`

    - `matched_at: string`

    - `query_id: number`

    - `registrar: string`

    - `similarity_score: number`

    - `url_scan_id: string`

    - `content_type: optional string`

    - `image_data: optional string`

  - `total: number`
