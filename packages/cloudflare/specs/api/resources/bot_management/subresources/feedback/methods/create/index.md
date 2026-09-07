## Submit a feedback report

**post** `/zones/{zone_id}/bot_management/feedback`

Submit a feedback report for the specified zone. Use `type` to indicate whether the report is a false positive (good traffic flagged as bot) or a false negative (bot traffic missed). Furthermore, you can also use `expression` as a wirefilter to identify the affected traffic sample.

See more accepted API fields and expression types at https://developers.cloudflare.com/bots/concepts/feedback-loop/#api-fields and https://developers.cloudflare.com/bots/concepts/feedback-loop/#expression-fields, respectively.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

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

- `subtype: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/bot_management/feedback \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d "{
          \"description\": \"Automated scraping missed by detections\",
          \"expression\": \"http.host eq 'www.example.com' and http.request.uri.path starts_with '/products' and cf.bot_management.score gt 25\",
          \"first_request_seen_at\": \"2025-09-29T00:00:00Z\",
          \"last_request_seen_at\": \"2025-09-29T06:00:00Z\",
          \"requests\": 2000,
          \"requests_by_attribute\": {
            \"topIPs\": [
              {
                \"metric\": \"203.0.113.55\",
                \"requests\": 400
              }
            ],
            \"topJA3Hashes\": [
              {
                \"metric\": \"ab12cd34ef56...\",
                \"requests\": 900
              }
            ]
          },
          \"requests_by_score\": {
            \"30\": 800,
            \"40\": 700,
            \"50\": 500
          },
          \"requests_by_score_src\": {
            \"heuristics\": 200,
            \"ml\": 1800
          },
          \"type\": \"false_negative\"
        }"
```
