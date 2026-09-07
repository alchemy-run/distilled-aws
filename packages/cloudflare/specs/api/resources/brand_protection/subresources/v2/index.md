# V2

# Queries

## Get queries

**get** `/accounts/{account_id}/cloudforce-one/v2/brand-protection/domain/queries`

Get all saved brand protection queries for an account

### Path Parameters

- `account_id: string`

### Query Parameters

- `id: optional string`

### Returns

- `created: string`

- `parameters: object { string_matches, max_time, min_time }`

  - `string_matches: array of object { pattern }`

    - `pattern: string`

  - `max_time: optional string`

  - `min_time: optional string`

- `query_id: number`

- `query_tag: string`

- `scan: boolean`

- `updated: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/v2/brand-protection/domain/queries \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
[
  {
    "created": "created",
    "parameters": {
      "string_matches": [
        {
          "pattern": "x"
        }
      ],
      "max_time": "max_time",
      "min_time": "min_time"
    },
    "query_id": 0,
    "query_tag": "query_tag",
    "scan": true,
    "updated": "updated"
  }
]
```

## Domain Types

### Query Get Response

- `QueryGetResponse = array of object { created, parameters, query_id, 3 more }`

  - `created: string`

  - `parameters: object { string_matches, max_time, min_time }`

    - `string_matches: array of object { pattern }`

      - `pattern: string`

    - `max_time: optional string`

    - `min_time: optional string`

  - `query_id: number`

  - `query_tag: string`

  - `scan: boolean`

  - `updated: string`

# Matches

## List saved query matches

**get** `/accounts/{account_id}/cloudforce-one/v2/brand-protection/domain/matches`

Get paginated list of domain matches for one or more brand protection queries. When multiple query_ids are provided (comma-separated), matches are deduplicated across queries and each match includes a match_details array with per-match query metadata and individual dismissed state.

### Path Parameters

- `account_id: string`

### Query Parameters

- `query_id: array of string`

  Query ID or comma-separated list of Query IDs. When multiple IDs are provided, matches are deduplicated across queries and each match includes a match_details array with per-match query metadata and dismissed state.

- `domain_search: optional string`

  Filter matches by domain name (substring match)

- `include_dismissed: optional string`

- `include_domain_id: optional string`

- `limit: optional string`

- `offset: optional string`

- `order: optional "asc" or "desc"`

  Sort order. Options: 'asc' (ascending) or 'desc' (descending)

  - `"asc"`

  - `"desc"`

- `orderBy: optional "domain" or "first_seen" or "registrar"`

  Column to sort by. Options: 'domain', 'first_seen', or 'registrar'

  - `"domain"`

  - `"first_seen"`

  - `"registrar"`

### Returns

- `matches: array of object { domain, first_seen, public_scans, 6 more }`

  - `domain: string`

  - `first_seen: string`

  - `public_scans: object { submission_id }`

    - `submission_id: string`

  - `registrar: string`

  - `scan_status: string`

  - `scan_submission_id: number`

  - `source: string`

  - `dismissed: optional boolean`

    Whether the match is dismissed. Only present for single-query requests. For multi-query requests, use the dismissed field in each match_details entry.

  - `match_details: optional array of object { dismissed, match_id, query_id, query_tag }`

    Per-match detail objects with query metadata and individual dismissed state. Only present when multiple query_ids are requested.

    - `dismissed: boolean`

      Individual dismissed state for this specific match.

    - `match_id: number`

    - `query_id: number`

    - `query_tag: string`

      Tag associated with the query, if one exists.

- `total: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/v2/brand-protection/domain/matches \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "matches": [
    {
      "domain": "domain",
      "first_seen": "first_seen",
      "public_scans": {
        "submission_id": "submission_id"
      },
      "registrar": "registrar",
      "scan_status": "scan_status",
      "scan_submission_id": 0,
      "source": "source",
      "dismissed": true,
      "match_details": [
        {
          "dismissed": true,
          "match_id": 0,
          "query_id": 0,
          "query_tag": "query_tag"
        }
      ]
    }
  ],
  "total": 0
}
```

## Domain Types

### Match Get Response

- `MatchGetResponse object { matches, total }`

  - `matches: array of object { domain, first_seen, public_scans, 6 more }`

    - `domain: string`

    - `first_seen: string`

    - `public_scans: object { submission_id }`

      - `submission_id: string`

    - `registrar: string`

    - `scan_status: string`

    - `scan_submission_id: number`

    - `source: string`

    - `dismissed: optional boolean`

      Whether the match is dismissed. Only present for single-query requests. For multi-query requests, use the dismissed field in each match_details entry.

    - `match_details: optional array of object { dismissed, match_id, query_id, query_tag }`

      Per-match detail objects with query metadata and individual dismissed state. Only present when multiple query_ids are requested.

      - `dismissed: boolean`

        Individual dismissed state for this specific match.

      - `match_id: number`

      - `query_id: number`

      - `query_tag: string`

        Tag associated with the query, if one exists.

  - `total: number`

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
