# Events

## Get BGP route leak events

**get** `/radar/bgp/leaks/events`

Retrieves the BGP route leak events.

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

- `involvedAsn: optional number`

  ASN that is causing or affected by a route leak event.

- `involvedCountry: optional string`

  Country code of a involved ASN in a route leak event.

- `leakAsn: optional number`

  The leaking AS of a route leak event.

- `page: optional number`

  Current page number, starting from 1.

- `per_page: optional number`

  Number of entries per page.

- `sortBy: optional "ID" or "LEAKS" or "PEERS" or 3 more`

  Sorts results by the specified field.

  - `"ID"`

  - `"LEAKS"`

  - `"PEERS"`

  - `"PREFIXES"`

  - `"ORIGINS"`

  - `"TIME"`

- `sortOrder: optional "ASC" or "DESC"`

  Sort order.

  - `"ASC"`

  - `"DESC"`

### Returns

- `result: object { asn_info, events }`

  - `asn_info: array of object { asn, country_code, org_name }`

    - `asn: number`

    - `country_code: string`

    - `org_name: string`

  - `events: array of object { id, countries, detected_ts, 10 more }`

    - `id: number`

    - `countries: array of string`

    - `detected_ts: string`

    - `finished: boolean`

    - `leak_asn: number`

    - `leak_count: number`

    - `leak_seg: array of number`

    - `leak_type: number`

    - `max_ts: string`

    - `min_ts: string`

    - `origin_count: number`

    - `peer_count: number`

    - `prefix_count: number`

- `result_info: object { count, page, per_page, total_count }`

  - `count: number`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/leaks/events \
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
        "countries": [
          "string"
        ],
        "detected_ts": "detected_ts",
        "finished": true,
        "leak_asn": 0,
        "leak_count": 0,
        "leak_seg": [
          0
        ],
        "leak_type": 0,
        "max_ts": "max_ts",
        "min_ts": "min_ts",
        "origin_count": 0,
        "peer_count": 0,
        "prefix_count": 0
      }
    ]
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

- `EventListResponse object { asn_info, events }`

  - `asn_info: array of object { asn, country_code, org_name }`

    - `asn: number`

    - `country_code: string`

    - `org_name: string`

  - `events: array of object { id, countries, detected_ts, 10 more }`

    - `id: number`

    - `countries: array of string`

    - `detected_ts: string`

    - `finished: boolean`

    - `leak_asn: number`

    - `leak_count: number`

    - `leak_seg: array of number`

    - `leak_type: number`

    - `max_ts: string`

    - `min_ts: string`

    - `origin_count: number`

    - `peer_count: number`

    - `prefix_count: number`
