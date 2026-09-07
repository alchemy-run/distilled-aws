# Mitigations

## List abuse report mitigations

**get** `/accounts/{account_id}/abuse-reports/{report_id}/mitigations`

List mitigations done to remediate the abuse report.

### Path Parameters

- `account_id: string`

- `report_id: string`

### Query Parameters

- `effective_after: optional string`

  Returns mitigation that were dispatched after the given date

- `effective_before: optional string`

  Returns mitigations that were dispatched before the given date

- `entity_type: optional "url_pattern" or "account" or "zone"`

  Filter by the type of entity the mitigation impacts.

  - `"url_pattern"`

  - `"account"`

  - `"zone"`

- `page: optional number`

  Where in pagination to start listing abuse reports

- `per_page: optional number`

  How many abuse reports per page to list

- `sort: optional "type,asc" or "type,desc" or "effective_date,asc" or 5 more`

  A property to sort by, followed by the order

  - `"type,asc"`

  - `"type,desc"`

  - `"effective_date,asc"`

  - `"effective_date,desc"`

  - `"status,asc"`

  - `"status,desc"`

  - `"entity_type,asc"`

  - `"entity_type,desc"`

- `status: optional "pending" or "active" or "in_review" or 2 more`

  Filter by the status of the mitigation.

  - `"pending"`

  - `"active"`

  - `"in_review"`

  - `"cancelled"`

  - `"removed"`

- `type: optional "account_suspend" or "copyright_interstitial" or "geo_block" or 16 more`

  Filter by the type of mitigation. This filter parameter can be specified multiple times to include multiple types of mitigations in the result set, e.g. ?type=rate_limit_cache&type=legal_block.

  - `"account_suspend"`

  - `"copyright_interstitial"`

  - `"geo_block"`

  - `"legal_block"`

  - `"malware_interstitial"`

  - `"misleading_interstitial"`

  - `"network_block"`

  - `"phishing_interstitial"`

  - `"playfairite_enforce"`

  - `"r2_takedown_account"`

  - `"r2_takedown_bucket"`

  - `"r2_takedown_object"`

  - `"rate_limit_cache"`

  - `"redirect_video_stream"`

  - `"registrar_freeze"`

  - `"registrar_parking"`

  - `"stream_block_account"`

  - `"user_suspend"`

  - `"workers_takedown_by_zone_id"`

### Returns

- `success: boolean`

- `errors: optional array of object { message }`

  - `message: string`

- `messages: optional array of object { message }`

  - `message: string`

- `result: optional object { mitigations }`

  - `mitigations: array of object { id, effective_date, entity_id, 3 more }`

    - `id: string`

      ID of remediation.

    - `effective_date: string`

      Date when the mitigation will become active. Time in RFC 3339 format (https://www.rfc-editor.org/rfc/rfc3339.html)

    - `entity_id: string`

    - `entity_type: "url_pattern" or "account" or "zone"`

      The type of entity targeted by a mitigation.

      - `"url_pattern"`

      - `"account"`

      - `"zone"`

    - `status: "pending" or "active" or "in_review" or 2 more`

      The status of a mitigation

      - `"pending"`

      - `"active"`

      - `"in_review"`

      - `"cancelled"`

      - `"removed"`

    - `type: "account_suspend" or "copyright_interstitial" or "geo_block" or 16 more`

      The type of mitigation applied to a reported entity.

      - `"account_suspend"`

      - `"copyright_interstitial"`

      - `"geo_block"`

      - `"legal_block"`

      - `"malware_interstitial"`

      - `"misleading_interstitial"`

      - `"network_block"`

      - `"phishing_interstitial"`

      - `"playfairite_enforce"`

      - `"r2_takedown_account"`

      - `"r2_takedown_bucket"`

      - `"r2_takedown_object"`

      - `"rate_limit_cache"`

      - `"redirect_video_stream"`

      - `"registrar_freeze"`

      - `"registrar_parking"`

      - `"stream_block_account"`

      - `"user_suspend"`

      - `"workers_takedown_by_zone_id"`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: number`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

  - `total_pages: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/abuse-reports/$REPORT_ID/mitigations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "success": true,
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "message"
    }
  ],
  "result": {
    "mitigations": [
      {
        "id": "id",
        "effective_date": "2009-11-10T23:00:00Z",
        "entity_id": "entity_id",
        "entity_type": "url_pattern",
        "status": "pending",
        "type": "account_suspend"
      }
    ]
  },
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0,
    "total_pages": 0
  }
}
```

## Request review on mitigations

**post** `/accounts/{account_id}/abuse-reports/{report_id}/mitigations/appeal`

Request a review for mitigations on an account.

### Path Parameters

- `account_id: string`

- `report_id: string`

### Body Parameters

- `appeals: array of object { id, reason }`

  List of mitigations to appeal.

  - `id: string`

    ID of the mitigation to appeal.

  - `reason: "removed" or "misclassified"`

    Reason why the customer is appealing.

    - `"removed"`

    - `"misclassified"`

### Returns

- `result_info: object { count, page, per_page, 2 more }`

  - `count: number`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

  - `total_pages: number`

- `success: boolean`

- `errors: optional array of object { message }`

  - `message: string`

- `messages: optional array of object { message }`

  - `message: string`

- `result: optional array of object { id, effective_date, entity_id, 3 more }`

  - `id: string`

    ID of remediation.

  - `effective_date: string`

    Date when the mitigation will become active. Time in RFC 3339 format (https://www.rfc-editor.org/rfc/rfc3339.html)

  - `entity_id: string`

  - `entity_type: "url_pattern" or "account" or "zone"`

    The type of entity targeted by a mitigation.

    - `"url_pattern"`

    - `"account"`

    - `"zone"`

  - `status: "pending" or "active" or "in_review" or 2 more`

    The status of a mitigation

    - `"pending"`

    - `"active"`

    - `"in_review"`

    - `"cancelled"`

    - `"removed"`

  - `type: "account_suspend" or "copyright_interstitial" or "geo_block" or 16 more`

    The type of mitigation applied to a reported entity.

    - `"account_suspend"`

    - `"copyright_interstitial"`

    - `"geo_block"`

    - `"legal_block"`

    - `"malware_interstitial"`

    - `"misleading_interstitial"`

    - `"network_block"`

    - `"phishing_interstitial"`

    - `"playfairite_enforce"`

    - `"r2_takedown_account"`

    - `"r2_takedown_bucket"`

    - `"r2_takedown_object"`

    - `"rate_limit_cache"`

    - `"redirect_video_stream"`

    - `"registrar_freeze"`

    - `"registrar_parking"`

    - `"stream_block_account"`

    - `"user_suspend"`

    - `"workers_takedown_by_zone_id"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/abuse-reports/$REPORT_ID/mitigations/appeal \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "appeals": [
            {
              "id": "id",
              "reason": "misclassified"
            }
          ]
        }'
```

#### Response

```json
{
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0,
    "total_pages": 0
  },
  "success": true,
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "message"
    }
  ],
  "result": [
    {
      "id": "id",
      "effective_date": "2009-11-10T23:00:00Z",
      "entity_id": "entity_id",
      "entity_type": "url_pattern",
      "status": "pending",
      "type": "account_suspend"
    }
  ]
}
```

## Domain Types

### Mitigation List Response

- `MitigationListResponse object { mitigations }`

  - `mitigations: array of object { id, effective_date, entity_id, 3 more }`

    - `id: string`

      ID of remediation.

    - `effective_date: string`

      Date when the mitigation will become active. Time in RFC 3339 format (https://www.rfc-editor.org/rfc/rfc3339.html)

    - `entity_id: string`

    - `entity_type: "url_pattern" or "account" or "zone"`

      The type of entity targeted by a mitigation.

      - `"url_pattern"`

      - `"account"`

      - `"zone"`

    - `status: "pending" or "active" or "in_review" or 2 more`

      The status of a mitigation

      - `"pending"`

      - `"active"`

      - `"in_review"`

      - `"cancelled"`

      - `"removed"`

    - `type: "account_suspend" or "copyright_interstitial" or "geo_block" or 16 more`

      The type of mitigation applied to a reported entity.

      - `"account_suspend"`

      - `"copyright_interstitial"`

      - `"geo_block"`

      - `"legal_block"`

      - `"malware_interstitial"`

      - `"misleading_interstitial"`

      - `"network_block"`

      - `"phishing_interstitial"`

      - `"playfairite_enforce"`

      - `"r2_takedown_account"`

      - `"r2_takedown_bucket"`

      - `"r2_takedown_object"`

      - `"rate_limit_cache"`

      - `"redirect_video_stream"`

      - `"registrar_freeze"`

      - `"registrar_parking"`

      - `"stream_block_account"`

      - `"user_suspend"`

      - `"workers_takedown_by_zone_id"`

### Mitigation Review Response

- `MitigationReviewResponse object { id, effective_date, entity_id, 3 more }`

  - `id: string`

    ID of remediation.

  - `effective_date: string`

    Date when the mitigation will become active. Time in RFC 3339 format (https://www.rfc-editor.org/rfc/rfc3339.html)

  - `entity_id: string`

  - `entity_type: "url_pattern" or "account" or "zone"`

    The type of entity targeted by a mitigation.

    - `"url_pattern"`

    - `"account"`

    - `"zone"`

  - `status: "pending" or "active" or "in_review" or 2 more`

    The status of a mitigation

    - `"pending"`

    - `"active"`

    - `"in_review"`

    - `"cancelled"`

    - `"removed"`

  - `type: "account_suspend" or "copyright_interstitial" or "geo_block" or 16 more`

    The type of mitigation applied to a reported entity.

    - `"account_suspend"`

    - `"copyright_interstitial"`

    - `"geo_block"`

    - `"legal_block"`

    - `"malware_interstitial"`

    - `"misleading_interstitial"`

    - `"network_block"`

    - `"phishing_interstitial"`

    - `"playfairite_enforce"`

    - `"r2_takedown_account"`

    - `"r2_takedown_bucket"`

    - `"r2_takedown_object"`

    - `"rate_limit_cache"`

    - `"redirect_video_stream"`

    - `"registrar_freeze"`

    - `"registrar_parking"`

    - `"stream_block_account"`

    - `"user_suspend"`

    - `"workers_takedown_by_zone_id"`
