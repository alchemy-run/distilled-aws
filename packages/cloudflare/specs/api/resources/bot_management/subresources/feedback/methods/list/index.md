## List zone feedback reports

**get** `/zones/{zone_id}/bot_management/feedback`

Returns all feedback reports previously submitted for the specified zone. Feedback reports help improve detection by sharing samples of traffic that were misclassified as bots or humans.

### Path Parameters

- `zone_id: string`

  Identifier.

### Returns

- `description: string`

- `expression: string`

  Wirefilter expression describing the traffic being reported.

- `first_request_seen_at: string`

- `last_request_seen_at: string`

- `requests: number`

- `requests_by_attribute: RequestsByAttribute`

  Top attributes contributing to the feedback sample. Keys include topASNs, topCountries, topHosts, topIPs, topJA3Hashes, topJA4s, topPaths, topUserAgents.

  - `metric: string`

  - `requests: number`

- `requests_by_score: RequestsByScore`

  Map of bot scores (1-99) to request counts. Sum must equal `requests`.

- `requests_by_score_src: RequestsByScoreSrc`

  Map of score source to request counts. Sum must equal `requests`.

- `type: FeedbackType`

  Type of feedback report.

  - `"false_positive"`

  - `"false_negative"`

- `created_at: optional string`

- `subtype: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/bot_management/feedback \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
[
  {
    "created_at": "2025-10-01T12:00:00Z",
    "description": "Legitimate checkout traffic was blocked as bots",
    "expression": "(http.host eq 'shop.example.com' and http.request.uri.path starts_with '/checkout') and cf.bot_management.score lt 5",
    "first_request_seen_at": "2025-09-30T08:00:00Z",
    "last_request_seen_at": "2025-09-30T09:00:00Z",
    "requests": 1200,
    "requests_by_attribute": {
      "topIPs": [
        {
          "metric": "203.0.113.10",
          "requests": 180
        },
        {
          "metric": "203.0.113.11",
          "requests": 150
        }
      ],
      "topPaths": [
        {
          "metric": "/checkout",
          "requests": 1000
        }
      ]
    },
    "requests_by_score": {
      "1": 200,
      "2": 300,
      "3": 400,
      "4": 300
    },
    "requests_by_score_src": {
      "heuristics": 200,
      "machine_learning": 1000
    },
    "subtype": "Spamming",
    "type": "false_positive"
  }
]
```
