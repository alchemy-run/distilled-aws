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
