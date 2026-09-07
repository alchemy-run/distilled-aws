# Brand Protection

## Create new URL submissions

**post** `/accounts/{account_id}/brand-protection/submit`

Return new URL submissions

### Path Parameters

- `account_id: string`

### Returns

- `skipped_urls: optional array of map[unknown]`

- `submitted_urls: optional array of map[unknown]`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/brand-protection/submit \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "skipped_urls": [
    {
      "foo": "bar"
    }
  ],
  "submitted_urls": [
    {
      "foo": "bar"
    }
  ]
}
```

## Read submitted URLs by ID

**get** `/accounts/{account_id}/brand-protection/url-info`

Return submitted URLs based on ID

### Path Parameters

- `account_id: string`

### Returns

- `result: optional array of map[unknown]`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/brand-protection/url-info \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "foo": "bar"
    }
  ]
}
```

## Domain Types

### Info

- `Info object { categorizations, model_results, rule_matches, 4 more }`

  - `categorizations: optional array of object { category, verification_status }`

    List of categorizations applied to this submission.

    - `category: optional string`

      Name of the category applied.

    - `verification_status: optional string`

      Result of human review for this categorization.

  - `model_results: optional array of object { model_name, model_score }`

    List of model results for completed scans.

    - `model_name: optional string`

      Name of the model.

    - `model_score: optional number`

      This is the score that is outputted by the model for this submission.

  - `rule_matches: optional array of object { banning, blocking, description, name }`

    List of signatures that matched against site content found when crawling the URL.

    - `banning: optional boolean`

      For internal use.

    - `blocking: optional boolean`

      For internal use.

    - `description: optional string`

      Description of the signature that matched.

    - `name: optional string`

      Name of the signature that matched.

  - `scan_status: optional object { last_processed, scan_complete, status_code, submission_id }`

    Status of the most recent scan found.

    - `last_processed: optional string`

      Timestamp of when the submission was processed.

    - `scan_complete: optional boolean`

      For internal use.

    - `status_code: optional number`

      Status code that the crawler received when loading the submitted URL.

    - `submission_id: optional number`

      ID of the most recent submission.

  - `screenshot_download_signature: optional string`

    For internal use.

  - `screenshot_path: optional string`

    For internal use.

  - `url: optional string`

    URL that was submitted.

### Submit

- `Submit object { excluded_urls, skipped_urls, submitted_urls }`

  - `excluded_urls: optional array of object { url }`

    URLs that were excluded from scanning because their domain is in our no-scan list.

    - `url: optional string`

      URL that was excluded.

  - `skipped_urls: optional array of object { url, url_id }`

    URLs that were skipped because the same URL is currently being scanned.

    - `url: optional string`

      URL that was skipped.

    - `url_id: optional number`

      ID of the submission of that URL that is currently scanning.

  - `submitted_urls: optional array of object { url, url_id }`

    URLs that were successfully submitted for scanning.

    - `url: optional string`

      URL that was submitted.

    - `url_id: optional number`

      ID assigned to this URL submission. Used to retrieve scanning results.

### Brand Protection Submit Response

- `BrandProtectionSubmitResponse object { skipped_urls, submitted_urls }`

  - `skipped_urls: optional array of map[unknown]`

  - `submitted_urls: optional array of map[unknown]`

### Brand Protection URL Info Response

- `BrandProtectionURLInfoResponse = map[unknown]`

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

# Matches

## Read matches for string queries by ID

**get** `/accounts/{account_id}/brand-protection/matches`

Return matches for string queries based on ID

### Path Parameters

- `account_id: string`

### Query Parameters

- `id: optional string`

- `include_domain_id: optional boolean`

- `limit: optional number`

- `offset: optional number`

### Returns

- `matches: optional array of map[unknown]`

- `total: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/brand-protection/matches \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "matches": [
    {
      "foo": "bar"
    }
  ],
  "total": 0
}
```

## Download matches for string queries by ID

**get** `/accounts/{account_id}/brand-protection/matches/download`

Return matches as CSV for string queries based on ID

### Path Parameters

- `account_id: string`

### Query Parameters

- `id: optional string`

- `include_domain_id: optional boolean`

- `limit: optional number`

- `offset: optional number`

### Returns

- `matches: optional array of map[unknown]`

- `total: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/brand-protection/matches/download \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "matches": [
    {
      "foo": "bar"
    }
  ],
  "total": 0
}
```

## Domain Types

### Match Get Response

- `MatchGetResponse object { matches, total }`

  - `matches: optional array of map[unknown]`

  - `total: optional number`

### Match Download Response

- `MatchDownloadResponse object { matches, total }`

  - `matches: optional array of map[unknown]`

  - `total: optional number`

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

# Logo Matches

## Read matches for logo queries by ID

**get** `/accounts/{account_id}/brand-protection/logo-matches`

Return matches for logo queries based on ID

### Path Parameters

- `account_id: string`

### Query Parameters

- `limit: optional string`

- `logo_id: optional array of string`

- `offset: optional string`

### Returns

- `matches: optional array of map[unknown]`

- `total: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/brand-protection/logo-matches \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "matches": [
    {
      "foo": "bar"
    }
  ],
  "total": 0
}
```

## Download matches for logo queries by ID

**get** `/accounts/{account_id}/brand-protection/logo-matches/download`

Return matches as CSV for logo queries based on ID

### Path Parameters

- `account_id: string`

### Query Parameters

- `limit: optional string`

- `logo_id: optional array of string`

- `offset: optional string`

### Returns

- `matches: optional array of map[unknown]`

- `total: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/brand-protection/logo-matches/download \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "matches": [
    {
      "foo": "bar"
    }
  ],
  "total": 0
}
```

## Domain Types

### Logo Match Get Response

- `LogoMatchGetResponse object { matches, total }`

  - `matches: optional array of map[unknown]`

  - `total: optional number`

### Logo Match Download Response

- `LogoMatchDownloadResponse object { matches, total }`

  - `matches: optional array of map[unknown]`

  - `total: optional number`

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
