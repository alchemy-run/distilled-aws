# Hijacks

# Events

## Get BGP hijack events

**get** `/radar/bgp/hijacks/events`

Retrieves the BGP hijack events.

### Query Parameters

- `dateEnd: optional string`

  End of the date range (inclusive).

- `dateRange: optional string`

  Filters results by date range.

- `dateStart: optional string`

  Start of the date range (inclusive).

- `eventId: optional number`

  The unique identifier of a event.

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `hijackerAsn: optional number`

  The potential hijacker AS of a BGP hijack event.

- `involvedAsn: optional number`

  The potential hijacker or victim AS of a BGP hijack event.

- `involvedCountry: optional string`

  The country code of the potential hijacker or victim AS of a BGP hijack event.

- `maxConfidence: optional number`

  Filters events by maximum confidence score (1-4 low, 5-7 mid, 8+ high).

- `minConfidence: optional number`

  Filters events by minimum confidence score (1-4 low, 5-7 mid, 8+ high).

- `page: optional number`

  Current page number, starting from 1.

- `per_page: optional number`

  Number of entries per page.

- `prefix: optional string`

- `sortBy: optional "ID" or "TIME" or "CONFIDENCE"`

  Sorts results by the specified field.

  - `"ID"`

  - `"TIME"`

  - `"CONFIDENCE"`

- `sortOrder: optional "ASC" or "DESC"`

  Sort order.

  - `"ASC"`

  - `"DESC"`

- `victimAsn: optional number`

  The potential victim AS of a BGP hijack event.

### Returns

- `result: object { asn_info, events, total_monitors }`

  - `asn_info: array of object { asn, country_code, org_name }`

    - `asn: number`

    - `country_code: string`

    - `org_name: string`

  - `events: array of object { id, confidence_score, duration, 15 more }`

    - `id: number`

    - `confidence_score: number`

    - `duration: number`

    - `event_type: number`

    - `hijack_msgs_count: number`

    - `hijacker_asn: number`

    - `hijacker_country: string`

    - `is_stale: boolean`

    - `max_hijack_ts: string`

    - `max_msg_ts: string`

    - `min_hijack_ts: string`

    - `on_going_count: number`

    - `peer_asns: array of number`

    - `peer_ip_count: number`

    - `prefixes: array of string`

    - `tags: array of object { name, score }`

      - `name: string`

      - `score: number`

    - `victim_asns: array of number`

    - `victim_countries: array of string`

  - `total_monitors: number`

- `result_info: object { count, page, per_page, total_count }`

  - `count: number`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/hijacks/events \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "asn_info": [
      {
        "asn": 0,
        "country_code": "country_code",
        "org_name": "org_name"
      }
    ],
    "events": [
      {
        "id": 0,
        "confidence_score": 0,
        "duration": 0,
        "event_type": 0,
        "hijack_msgs_count": 0,
        "hijacker_asn": 0,
        "hijacker_country": "hijacker_country",
        "is_stale": true,
        "max_hijack_ts": "max_hijack_ts",
        "max_msg_ts": "max_msg_ts",
        "min_hijack_ts": "min_hijack_ts",
        "on_going_count": 0,
        "peer_asns": [
          0
        ],
        "peer_ip_count": 0,
        "prefixes": [
          "string"
        ],
        "tags": [
          {
            "name": "name",
            "score": 0
          }
        ],
        "victim_asns": [
          0
        ],
        "victim_countries": [
          "string"
        ]
      }
    ],
    "total_monitors": 0
  },
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  },
  "success": true
}
```

## Domain Types

### Event List Response

- `EventListResponse object { asn_info, events, total_monitors }`

  - `asn_info: array of object { asn, country_code, org_name }`

    - `asn: number`

    - `country_code: string`

    - `org_name: string`

  - `events: array of object { id, confidence_score, duration, 15 more }`

    - `id: number`

    - `confidence_score: number`

    - `duration: number`

    - `event_type: number`

    - `hijack_msgs_count: number`

    - `hijacker_asn: number`

    - `hijacker_country: string`

    - `is_stale: boolean`

    - `max_hijack_ts: string`

    - `max_msg_ts: string`

    - `min_hijack_ts: string`

    - `on_going_count: number`

    - `peer_asns: array of number`

    - `peer_ip_count: number`

    - `prefixes: array of string`

    - `tags: array of object { name, score }`

      - `name: string`

      - `score: number`

    - `victim_asns: array of number`

    - `victim_countries: array of string`

  - `total_monitors: number`
