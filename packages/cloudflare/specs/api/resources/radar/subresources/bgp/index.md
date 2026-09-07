# BGP

## Get BGP time series

**get** `/radar/bgp/timeseries`

Retrieves BGP updates over time. When requesting updates for an autonomous system, only BGP updates of type announcement are returned.

### Query Parameters

- `aggInterval: optional "15m" or "1h" or "1d" or "1w"`

  Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

  - `"15m"`

  - `"1h"`

  - `"1d"`

  - `"1w"`

- `asn: optional array of string`

  Filters results by Autonomous System. Specify one or more Autonomous System Numbers (ASNs) as a comma-separated list. Prefix with `-` to exclude ASNs from results. For example, `-174, 3356` excludes results from AS174, but includes results from AS3356.

- `dateEnd: optional array of string`

  End of the date range (inclusive).

- `dateRange: optional array of string`

  Filters results by date range. For example, use `7d` and `7dcontrol` to compare this week with the previous week. Use this parameter or set specific start and end dates (`dateStart` and `dateEnd` parameters).

- `dateStart: optional array of string`

  Start of the date range.

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `name: optional array of string`

  Array of names used to label the series in the response.

- `prefix: optional array of string`

  Filters results by BGP network prefix.

- `updateType: optional array of "ANNOUNCEMENT" or "WITHDRAWAL"`

  Filters results by BGP update type.

  - `"ANNOUNCEMENT"`

  - `"WITHDRAWAL"`

### Returns

- `result: object { meta, serie_0 }`

  - `meta: object { aggInterval, confidenceInfo, dateRange, lastUpdated }`

    - `aggInterval: "15m" or "1h" or "1d" or "1w"`

      - `"15m"`

      - `"1h"`

      - `"1d"`

      - `"1w"`

    - `confidenceInfo: object { annotations, level }`

      - `annotations: array of object { dataSource, description, endDate, 5 more }`

        - `dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more`

          Data source for annotations.

          - `"ALL"`

          - `"AI_BOTS"`

          - `"AI_GATEWAY"`

          - `"BGP"`

          - `"BOTS"`

          - `"CONNECTION_ANOMALY"`

          - `"CT"`

          - `"DNS"`

          - `"DNS_MAGNITUDE"`

          - `"DNS_AS112"`

          - `"DOS"`

          - `"EMAIL_ROUTING"`

          - `"EMAIL_SECURITY"`

          - `"FW"`

          - `"FW_PG"`

          - `"HTTP"`

          - `"HTTP_CONTROL"`

          - `"HTTP_CRAWLER_REFERER"`

          - `"HTTP_ORIGINS"`

          - `"IQI"`

          - `"LEAKED_CREDENTIALS"`

          - `"NET"`

          - `"ROBOTS_TXT"`

          - `"SPEED"`

          - `"WORKERS_AI"`

        - `description: string`

        - `endDate: string`

        - `eventType: "EVENT" or "GENERAL" or "OUTAGE" or 3 more`

          Event type for annotations.

          - `"EVENT"`

          - `"GENERAL"`

          - `"OUTAGE"`

          - `"PARTIAL_PROJECTION"`

          - `"PIPELINE"`

          - `"TRAFFIC_ANOMALY"`

        - `isInstantaneous: boolean`

          Whether event is a single point in time or a time range.

        - `linkedUrl: string`

        - `startDate: string`

        - `tags: optional array of string`

      - `level: number`

        Provides an indication of how much confidence Cloudflare has in the data.

    - `dateRange: array of object { endTime, startTime }`

      - `endTime: string`

        Adjusted end of date range.

      - `startTime: string`

        Adjusted start of date range.

    - `lastUpdated: string`

  - `serie_0: object { timestamps, values }`

    - `timestamps: array of string`

    - `values: array of string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/timeseries \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "meta": {
      "aggInterval": "15m",
      "confidenceInfo": {
        "annotations": [
          {
            "dataSource": "ALL",
            "description": "Cable cut in Tonga",
            "endDate": "2019-12-27T18:11:19.117Z",
            "eventType": "EVENT",
            "isInstantaneous": true,
            "linkedUrl": "https://example.com",
            "startDate": "2019-12-27T18:11:19.117Z",
            "tags": [
              "BOT_CLASS"
            ]
          }
        ],
        "level": 0
      },
      "dateRange": [
        {
          "endTime": "2022-09-17T10:22:57.555Z",
          "startTime": "2022-09-16T10:22:57.555Z"
        }
      ],
      "lastUpdated": "2019-12-27T18:11:19.117Z"
    },
    "serie_0": {
      "timestamps": [
        "2019-12-27T18:11:19.117Z"
      ],
      "values": [
        "10"
      ]
    }
  },
  "success": true
}
```

## Domain Types

### BGP Timeseries Response

- `BGPTimeseriesResponse object { meta, serie_0 }`

  - `meta: object { aggInterval, confidenceInfo, dateRange, lastUpdated }`

    - `aggInterval: "15m" or "1h" or "1d" or "1w"`

      - `"15m"`

      - `"1h"`

      - `"1d"`

      - `"1w"`

    - `confidenceInfo: object { annotations, level }`

      - `annotations: array of object { dataSource, description, endDate, 5 more }`

        - `dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more`

          Data source for annotations.

          - `"ALL"`

          - `"AI_BOTS"`

          - `"AI_GATEWAY"`

          - `"BGP"`

          - `"BOTS"`

          - `"CONNECTION_ANOMALY"`

          - `"CT"`

          - `"DNS"`

          - `"DNS_MAGNITUDE"`

          - `"DNS_AS112"`

          - `"DOS"`

          - `"EMAIL_ROUTING"`

          - `"EMAIL_SECURITY"`

          - `"FW"`

          - `"FW_PG"`

          - `"HTTP"`

          - `"HTTP_CONTROL"`

          - `"HTTP_CRAWLER_REFERER"`

          - `"HTTP_ORIGINS"`

          - `"IQI"`

          - `"LEAKED_CREDENTIALS"`

          - `"NET"`

          - `"ROBOTS_TXT"`

          - `"SPEED"`

          - `"WORKERS_AI"`

        - `description: string`

        - `endDate: string`

        - `eventType: "EVENT" or "GENERAL" or "OUTAGE" or 3 more`

          Event type for annotations.

          - `"EVENT"`

          - `"GENERAL"`

          - `"OUTAGE"`

          - `"PARTIAL_PROJECTION"`

          - `"PIPELINE"`

          - `"TRAFFIC_ANOMALY"`

        - `isInstantaneous: boolean`

          Whether event is a single point in time or a time range.

        - `linkedUrl: string`

        - `startDate: string`

        - `tags: optional array of string`

      - `level: number`

        Provides an indication of how much confidence Cloudflare has in the data.

    - `dateRange: array of object { endTime, startTime }`

      - `endTime: string`

        Adjusted end of date range.

      - `startTime: string`

        Adjusted start of date range.

    - `lastUpdated: string`

  - `serie_0: object { timestamps, values }`

    - `timestamps: array of string`

    - `values: array of string`

# Leaks

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

# Top

## Get top prefixes by BGP updates

**get** `/radar/bgp/top/prefixes`

Retrieves the top network prefixes by BGP updates.

### Query Parameters

- `asn: optional array of string`

  Filters results by Autonomous System. Specify one or more Autonomous System Numbers (ASNs) as a comma-separated list. Prefix with `-` to exclude ASNs from results. For example, `-174, 3356` excludes results from AS174, but includes results from AS3356.

- `dateEnd: optional array of string`

  End of the date range (inclusive).

- `dateRange: optional array of string`

  Filters results by date range. For example, use `7d` and `7dcontrol` to compare this week with the previous week. Use this parameter or set specific start and end dates (`dateStart` and `dateEnd` parameters).

- `dateStart: optional array of string`

  Start of the date range.

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `name: optional array of string`

  Array of names used to label the series in the response.

- `updateType: optional array of "ANNOUNCEMENT" or "WITHDRAWAL"`

  Filters results by BGP update type.

  - `"ANNOUNCEMENT"`

  - `"WITHDRAWAL"`

### Returns

- `result: object { meta, top_0 }`

  - `meta: object { dateRange }`

    - `dateRange: array of object { endTime, startTime }`

      - `endTime: string`

        Adjusted end of date range.

      - `startTime: string`

        Adjusted start of date range.

  - `top_0: array of object { prefix, value }`

    - `prefix: string`

    - `value: string`

      A numeric string.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/top/prefixes \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "meta": {
      "dateRange": [
        {
          "endTime": "2022-09-17T10:22:57.555Z",
          "startTime": "2022-09-16T10:22:57.555Z"
        }
      ]
    },
    "top_0": [
      {
        "prefix": "2804:77cc:8000::/33",
        "value": "10"
      }
    ]
  },
  "success": true
}
```

## Domain Types

### Top Prefixes Response

- `TopPrefixesResponse object { meta, top_0 }`

  - `meta: object { dateRange }`

    - `dateRange: array of object { endTime, startTime }`

      - `endTime: string`

        Adjusted end of date range.

      - `startTime: string`

        Adjusted start of date range.

  - `top_0: array of object { prefix, value }`

    - `prefix: string`

    - `value: string`

      A numeric string.

# Ases

## Get top ASes by BGP updates

**get** `/radar/bgp/top/ases`

Retrieves the top autonomous systems by BGP updates (announcements only).

### Query Parameters

- `asn: optional array of string`

  Filters results by Autonomous System. Specify one or more Autonomous System Numbers (ASNs) as a comma-separated list. Prefix with `-` to exclude ASNs from results. For example, `-174, 3356` excludes results from AS174, but includes results from AS3356.

- `dateEnd: optional array of string`

  End of the date range (inclusive).

- `dateRange: optional array of string`

  Filters results by date range. For example, use `7d` and `7dcontrol` to compare this week with the previous week. Use this parameter or set specific start and end dates (`dateStart` and `dateEnd` parameters).

- `dateStart: optional array of string`

  Start of the date range.

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `name: optional array of string`

  Array of names used to label the series in the response.

- `prefix: optional array of string`

  Filters results by BGP network prefix.

- `updateType: optional array of "ANNOUNCEMENT" or "WITHDRAWAL"`

  Filters results by BGP update type.

  - `"ANNOUNCEMENT"`

  - `"WITHDRAWAL"`

### Returns

- `result: object { meta, top_0 }`

  - `meta: object { dateRange }`

    - `dateRange: array of object { endTime, startTime }`

      - `endTime: string`

        Adjusted end of date range.

      - `startTime: string`

        Adjusted start of date range.

  - `top_0: array of object { asn, ASName, value }`

    - `asn: number`

    - `ASName: string`

    - `value: string`

      Percentage of updates by this AS out of the total updates by all autonomous systems.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/top/ases \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "meta": {
      "dateRange": [
        {
          "endTime": "2022-09-17T10:22:57.555Z",
          "startTime": "2022-09-16T10:22:57.555Z"
        }
      ]
    },
    "top_0": [
      {
        "asn": 714,
        "ASName": "Apple-Engineering",
        "value": "0.73996"
      }
    ]
  },
  "success": true
}
```

## Get top ASes by prefix count

**get** `/radar/bgp/top/ases/prefixes`

Retrieves the full list of autonomous systems on the global routing table ordered by announced prefixes count. The data comes from public BGP MRT data archives and updates every 2 hours.

### Query Parameters

- `country: optional string`

  Alpha-2 country code.

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Maximum number of ASes to return.

### Returns

- `result: object { asns, meta }`

  - `asns: array of object { asn, country, name, pfxs_count }`

    - `asn: number`

    - `country: string`

    - `name: string`

    - `pfxs_count: number`

  - `meta: object { data_time, query_time, total_peers }`

    - `data_time: string`

    - `query_time: string`

    - `total_peers: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/top/ases/prefixes \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "asns": [
      {
        "asn": 0,
        "country": "country",
        "name": "name",
        "pfxs_count": 0
      }
    ],
    "meta": {
      "data_time": "data_time",
      "query_time": "query_time",
      "total_peers": 0
    }
  },
  "success": true
}
```

## Domain Types

### Ase Get Response

- `AseGetResponse object { meta, top_0 }`

  - `meta: object { dateRange }`

    - `dateRange: array of object { endTime, startTime }`

      - `endTime: string`

        Adjusted end of date range.

      - `startTime: string`

        Adjusted start of date range.

  - `top_0: array of object { asn, ASName, value }`

    - `asn: number`

    - `ASName: string`

    - `value: string`

      Percentage of updates by this AS out of the total updates by all autonomous systems.

### Ase Prefixes Response

- `AsePrefixesResponse object { asns, meta }`

  - `asns: array of object { asn, country, name, pfxs_count }`

    - `asn: number`

    - `country: string`

    - `name: string`

    - `pfxs_count: number`

  - `meta: object { data_time, query_time, total_peers }`

    - `data_time: string`

    - `query_time: string`

    - `total_peers: number`

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

# Routes

## Get Multi-Origin AS (MOAS) prefixes

**get** `/radar/bgp/routes/moas`

Retrieves all Multi-Origin AS (MOAS) prefixes in the global routing tables.

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `invalid_only: optional boolean`

  Lookup only RPKI invalid MOASes.

- `origin: optional number`

  Lookup MOASes originated by the given ASN.

- `prefix: optional string`

### Returns

- `result: object { meta, moas }`

  - `meta: object { data_time, query_time, total_peers }`

    - `data_time: string`

    - `query_time: string`

    - `total_peers: number`

  - `moas: array of object { origins, prefix }`

    - `origins: array of object { origin, peer_count, rpki_validation }`

      - `origin: number`

      - `peer_count: number`

      - `rpki_validation: string`

    - `prefix: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/routes/moas \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "meta": {
      "data_time": "data_time",
      "query_time": "query_time",
      "total_peers": 0
    },
    "moas": [
      {
        "origins": [
          {
            "origin": 0,
            "peer_count": 0,
            "rpki_validation": "rpki_validation"
          }
        ],
        "prefix": "prefix"
      }
    ]
  },
  "success": true
}
```

## Get prefix-to-ASN mapping

**get** `/radar/bgp/routes/pfx2as`

Retrieves the prefix-to-ASN mapping from global routing tables.

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `longestPrefixMatch: optional boolean`

  Return only results with the longest prefix match for the given prefix. For example, specify a /32 prefix to lookup the origin ASN for an IPv4 address.

- `origin: optional number`

  Lookup prefixes originated by the given ASN.

- `prefix: optional string`

- `rpkiStatus: optional "VALID" or "INVALID" or "UNKNOWN"`

  Return only results with matching rpki status: valid, invalid or unknown.

  - `"VALID"`

  - `"INVALID"`

  - `"UNKNOWN"`

### Returns

- `result: object { meta, prefix_origins }`

  - `meta: object { data_time, query_time, total_peers }`

    - `data_time: string`

    - `query_time: string`

    - `total_peers: number`

  - `prefix_origins: array of object { origin, peer_count, prefix, rpki_validation }`

    - `origin: number`

    - `peer_count: number`

    - `prefix: string`

    - `rpki_validation: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/routes/pfx2as \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "meta": {
      "data_time": "data_time",
      "query_time": "query_time",
      "total_peers": 0
    },
    "prefix_origins": [
      {
        "origin": 0,
        "peer_count": 0,
        "prefix": "prefix",
        "rpki_validation": "rpki_validation"
      }
    ]
  },
  "success": true
}
```

## Get BGP routing table stats 

**get** `/radar/bgp/routes/stats`

Retrieves the BGP routing table stats.

### Query Parameters

- `asn: optional number`

  Filters results by Autonomous System. Specify a single Autonomous System Number (ASN) as integer.

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `location: optional string`

  Filters results by location. Specify an alpha-2 location code.

### Returns

- `result: object { meta, stats }`

  - `meta: object { data_time, query_time, total_peers }`

    - `data_time: string`

    - `query_time: string`

    - `total_peers: number`

  - `stats: object { distinct_origins, distinct_origins_ipv4, distinct_origins_ipv6, 15 more }`

    - `distinct_origins: number`

    - `distinct_origins_ipv4: number`

    - `distinct_origins_ipv6: number`

    - `distinct_prefixes: number`

    - `distinct_prefixes_ipv4: number`

    - `distinct_prefixes_ipv6: number`

    - `routes_invalid: number`

    - `routes_invalid_ipv4: number`

    - `routes_invalid_ipv6: number`

    - `routes_total: number`

    - `routes_total_ipv4: number`

    - `routes_total_ipv6: number`

    - `routes_unknown: number`

    - `routes_unknown_ipv4: number`

    - `routes_unknown_ipv6: number`

    - `routes_valid: number`

    - `routes_valid_ipv4: number`

    - `routes_valid_ipv6: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/routes/stats \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "meta": {
      "data_time": "data_time",
      "query_time": "query_time",
      "total_peers": 0
    },
    "stats": {
      "distinct_origins": 0,
      "distinct_origins_ipv4": 0,
      "distinct_origins_ipv6": 0,
      "distinct_prefixes": 0,
      "distinct_prefixes_ipv4": 0,
      "distinct_prefixes_ipv6": 0,
      "routes_invalid": 0,
      "routes_invalid_ipv4": 0,
      "routes_invalid_ipv6": 0,
      "routes_total": 0,
      "routes_total_ipv4": 0,
      "routes_total_ipv6": 0,
      "routes_unknown": 0,
      "routes_unknown_ipv4": 0,
      "routes_unknown_ipv6": 0,
      "routes_valid": 0,
      "routes_valid_ipv4": 0,
      "routes_valid_ipv6": 0
    }
  },
  "success": true
}
```

## List ASes from global routing tables

**get** `/radar/bgp/routes/ases`

Retrieves all ASes in the current global routing tables with routing statistics.

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `location: optional string`

  Filters results by location. Specify an alpha-2 location code.

- `sortBy: optional "cone" or "pfxs" or "ipv4" or 4 more`

  Sorts results by the specified field.

  - `"cone"`

  - `"pfxs"`

  - `"ipv4"`

  - `"ipv6"`

  - `"rpki_valid"`

  - `"rpki_invalid"`

  - `"rpki_unknown"`

- `sortOrder: optional "ASC" or "DESC"`

  Sort order.

  - `"ASC"`

  - `"DESC"`

### Returns

- `result: object { asns, meta }`

  - `asns: array of object { asn, coneSize, country, 7 more }`

    - `asn: number`

    - `coneSize: number`

      AS's customer cone size.

    - `country: string`

      Alpha-2 code for the AS's registration country.

    - `ipv4Count: number`

      Number of IPv4 addresses originated by the AS.

    - `ipv6Count: string`

      Number of IPv6 addresses originated by the AS.

    - `name: string`

      Name of the AS.

    - `pfxsCount: number`

      Number of total IP prefixes originated by the AS.

    - `rpkiInvalid: number`

      Number of RPKI invalid prefixes originated by the AS.

    - `rpkiUnknown: number`

      Number of RPKI unknown prefixes originated by the AS.

    - `rpkiValid: number`

      Number of RPKI valid prefixes originated by the AS.

  - `meta: object { dataTime, queryTime, totalPeers }`

    - `dataTime: string`

      The timestamp of when the data is generated.

    - `queryTime: string`

      The timestamp of the query.

    - `totalPeers: number`

      Total number of route collector peers used to generate this data.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/routes/ases \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "asns": [
      {
        "asn": 0,
        "coneSize": 0,
        "country": "US",
        "ipv4Count": 0,
        "ipv6Count": "1.21e24",
        "name": "name",
        "pfxsCount": 0,
        "rpkiInvalid": 0,
        "rpkiUnknown": 0,
        "rpkiValid": 0
      }
    ],
    "meta": {
      "dataTime": "2024-06-03T14:00:00",
      "queryTime": "2024-06-03T14:00:00",
      "totalPeers": 0
    }
  },
  "success": true
}
```

## Get real-time BGP routes for a prefix

**get** `/radar/bgp/routes/realtime`

Retrieves real-time BGP routes for a prefix, using public real-time data collectors (RouteViews and RIPE RIS).

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `prefix: optional string`

### Returns

- `result: object { meta, routes }`

  - `meta: object { asn_info, collectors, data_time, 2 more }`

    - `asn_info: array of object { as_name, asn, country_code, 2 more }`

      - `as_name: string`

        Name of the autonomous system.

      - `asn: number`

        AS number.

      - `country_code: string`

        Alpha-2 code for the AS's registration country.

      - `org_id: string`

        Organization ID.

      - `org_name: string`

        Organization name.

    - `collectors: array of object { collector, latest_realtime_ts, latest_rib_ts, 4 more }`

      - `collector: string`

        Public route collector ID.

      - `latest_realtime_ts: string`

        Latest real-time stream timestamp for this collector.

      - `latest_rib_ts: string`

        Latest RIB dump MRT file timestamp for this collector.

      - `latest_updates_ts: string`

        Latest BGP updates MRT file timestamp for this collector.

      - `peers_count: number`

        Total number of collector peers used from this collector.

      - `peers_v4_count: number`

        Total number of collector peers used from this collector for IPv4 prefixes.

      - `peers_v6_count: number`

        Total number of collector peers used from this collector for IPv6 prefixes.

    - `data_time: string`

      The most recent data timestamp for from the real-time sources.

    - `prefix_origins: array of object { origin, prefix, rpki_validation, 3 more }`

      - `origin: number`

        Origin ASN.

      - `prefix: string`

        IP prefix of this query.

      - `rpki_validation: string`

        Prefix-origin RPKI validation: valid, invalid, unknown.

      - `total_peers: number`

        Total number of peers.

      - `total_visible: number`

        Total number of peers seeing this prefix.

      - `visibility: number`

        Ratio of peers seeing this prefix to total number of peers.

    - `query_time: string`

      The timestamp of this query.

  - `routes: array of object { as_path, collector, communities, 2 more }`

    - `as_path: array of number`

      AS-level path for this route, from collector to origin.

    - `collector: string`

      Public collector ID for this route.

    - `communities: array of string`

      BGP community values.

    - `prefix: string`

      IP prefix of this query.

    - `timestamp: string`

      Latest timestamp of change for this route.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/routes/realtime \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "meta": {
      "asn_info": [
        {
          "as_name": "as_name",
          "asn": 0,
          "country_code": "country_code",
          "org_id": "org_id",
          "org_name": "org_name"
        }
      ],
      "collectors": [
        {
          "collector": "collector",
          "latest_realtime_ts": "latest_realtime_ts",
          "latest_rib_ts": "latest_rib_ts",
          "latest_updates_ts": "latest_updates_ts",
          "peers_count": 0,
          "peers_v4_count": 0,
          "peers_v6_count": 0
        }
      ],
      "data_time": "data_time",
      "prefix_origins": [
        {
          "origin": 0,
          "prefix": "prefix",
          "rpki_validation": "rpki_validation",
          "total_peers": 0,
          "total_visible": 0,
          "visibility": 0
        }
      ],
      "query_time": "query_time"
    },
    "routes": [
      {
        "as_path": [
          0
        ],
        "collector": "collector",
        "communities": [
          "string"
        ],
        "prefix": "prefix",
        "timestamp": "timestamp"
      }
    ]
  },
  "success": true
}
```

## Domain Types

### Route Moas Response

- `RouteMoasResponse object { meta, moas }`

  - `meta: object { data_time, query_time, total_peers }`

    - `data_time: string`

    - `query_time: string`

    - `total_peers: number`

  - `moas: array of object { origins, prefix }`

    - `origins: array of object { origin, peer_count, rpki_validation }`

      - `origin: number`

      - `peer_count: number`

      - `rpki_validation: string`

    - `prefix: string`

### Route Pfx2as Response

- `RoutePfx2asResponse object { meta, prefix_origins }`

  - `meta: object { data_time, query_time, total_peers }`

    - `data_time: string`

    - `query_time: string`

    - `total_peers: number`

  - `prefix_origins: array of object { origin, peer_count, prefix, rpki_validation }`

    - `origin: number`

    - `peer_count: number`

    - `prefix: string`

    - `rpki_validation: string`

### Route Stats Response

- `RouteStatsResponse object { meta, stats }`

  - `meta: object { data_time, query_time, total_peers }`

    - `data_time: string`

    - `query_time: string`

    - `total_peers: number`

  - `stats: object { distinct_origins, distinct_origins_ipv4, distinct_origins_ipv6, 15 more }`

    - `distinct_origins: number`

    - `distinct_origins_ipv4: number`

    - `distinct_origins_ipv6: number`

    - `distinct_prefixes: number`

    - `distinct_prefixes_ipv4: number`

    - `distinct_prefixes_ipv6: number`

    - `routes_invalid: number`

    - `routes_invalid_ipv4: number`

    - `routes_invalid_ipv6: number`

    - `routes_total: number`

    - `routes_total_ipv4: number`

    - `routes_total_ipv6: number`

    - `routes_unknown: number`

    - `routes_unknown_ipv4: number`

    - `routes_unknown_ipv6: number`

    - `routes_valid: number`

    - `routes_valid_ipv4: number`

    - `routes_valid_ipv6: number`

### Route Ases Response

- `RouteAsesResponse object { asns, meta }`

  - `asns: array of object { asn, coneSize, country, 7 more }`

    - `asn: number`

    - `coneSize: number`

      AS's customer cone size.

    - `country: string`

      Alpha-2 code for the AS's registration country.

    - `ipv4Count: number`

      Number of IPv4 addresses originated by the AS.

    - `ipv6Count: string`

      Number of IPv6 addresses originated by the AS.

    - `name: string`

      Name of the AS.

    - `pfxsCount: number`

      Number of total IP prefixes originated by the AS.

    - `rpkiInvalid: number`

      Number of RPKI invalid prefixes originated by the AS.

    - `rpkiUnknown: number`

      Number of RPKI unknown prefixes originated by the AS.

    - `rpkiValid: number`

      Number of RPKI valid prefixes originated by the AS.

  - `meta: object { dataTime, queryTime, totalPeers }`

    - `dataTime: string`

      The timestamp of when the data is generated.

    - `queryTime: string`

      The timestamp of the query.

    - `totalPeers: number`

      Total number of route collector peers used to generate this data.

### Route Realtime Response

- `RouteRealtimeResponse object { meta, routes }`

  - `meta: object { asn_info, collectors, data_time, 2 more }`

    - `asn_info: array of object { as_name, asn, country_code, 2 more }`

      - `as_name: string`

        Name of the autonomous system.

      - `asn: number`

        AS number.

      - `country_code: string`

        Alpha-2 code for the AS's registration country.

      - `org_id: string`

        Organization ID.

      - `org_name: string`

        Organization name.

    - `collectors: array of object { collector, latest_realtime_ts, latest_rib_ts, 4 more }`

      - `collector: string`

        Public route collector ID.

      - `latest_realtime_ts: string`

        Latest real-time stream timestamp for this collector.

      - `latest_rib_ts: string`

        Latest RIB dump MRT file timestamp for this collector.

      - `latest_updates_ts: string`

        Latest BGP updates MRT file timestamp for this collector.

      - `peers_count: number`

        Total number of collector peers used from this collector.

      - `peers_v4_count: number`

        Total number of collector peers used from this collector for IPv4 prefixes.

      - `peers_v6_count: number`

        Total number of collector peers used from this collector for IPv6 prefixes.

    - `data_time: string`

      The most recent data timestamp for from the real-time sources.

    - `prefix_origins: array of object { origin, prefix, rpki_validation, 3 more }`

      - `origin: number`

        Origin ASN.

      - `prefix: string`

        IP prefix of this query.

      - `rpki_validation: string`

        Prefix-origin RPKI validation: valid, invalid, unknown.

      - `total_peers: number`

        Total number of peers.

      - `total_visible: number`

        Total number of peers seeing this prefix.

      - `visibility: number`

        Ratio of peers seeing this prefix to total number of peers.

    - `query_time: string`

      The timestamp of this query.

  - `routes: array of object { as_path, collector, communities, 2 more }`

    - `as_path: array of number`

      AS-level path for this route, from collector to origin.

    - `collector: string`

      Public collector ID for this route.

    - `communities: array of string`

      BGP community values.

    - `prefix: string`

      IP prefix of this query.

    - `timestamp: string`

      Latest timestamp of change for this route.

# IPs

## Get announced IP address space time series

**get** `/radar/bgp/ips/timeseries`

Retrieves time series data for the announced IP space count, represented as the number of IPv4 /24s and IPv6 /48s, for a given ASN.

### Query Parameters

- `asn: optional array of string`

  Filters results by Autonomous System. Specify one or more Autonomous System Numbers (ASNs) as a comma-separated list. Prefix with `-` to exclude ASNs from results. For example, `-174, 3356` excludes results from AS174, but includes results from AS3356.

- `dateEnd: optional array of string`

  End of the date range (inclusive).

- `dateRange: optional array of string`

  Filters results by date range. For example, use `7d` and `7dcontrol` to compare this week with the previous week. Use this parameter or set specific start and end dates (`dateStart` and `dateEnd` parameters).

- `dateStart: optional array of string`

  Start of the date range.

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `includeDelay: optional boolean`

  Includes data delay meta information.

- `ipVersion: optional array of "IPv4" or "IPv6"`

  Filters results by IP version (Ipv4 vs. IPv6).

  - `"IPv4"`

  - `"IPv6"`

- `location: optional array of string`

  Filters results by location. Specify a comma-separated list of alpha-2 location codes.

- `name: optional array of string`

  Array of names used to label the series in the response.

### Returns

- `result: object { meta, serie_0 }`

  - `meta: object { aggInterval, confidenceInfo, dateRange, 4 more }`

    Metadata for the results.

    - `aggInterval: "FIFTEEN_MINUTES" or "ONE_HOUR" or "ONE_DAY" or 2 more`

      Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

      - `"FIFTEEN_MINUTES"`

      - `"ONE_HOUR"`

      - `"ONE_DAY"`

      - `"ONE_WEEK"`

      - `"ONE_MONTH"`

    - `confidenceInfo: object { annotations, level }`

      - `annotations: array of object { dataSource, description, endDate, 5 more }`

        - `dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more`

          Data source for annotations.

          - `"ALL"`

          - `"AI_BOTS"`

          - `"AI_GATEWAY"`

          - `"BGP"`

          - `"BOTS"`

          - `"CONNECTION_ANOMALY"`

          - `"CT"`

          - `"DNS"`

          - `"DNS_MAGNITUDE"`

          - `"DNS_AS112"`

          - `"DOS"`

          - `"EMAIL_ROUTING"`

          - `"EMAIL_SECURITY"`

          - `"FW"`

          - `"FW_PG"`

          - `"HTTP"`

          - `"HTTP_CONTROL"`

          - `"HTTP_CRAWLER_REFERER"`

          - `"HTTP_ORIGINS"`

          - `"IQI"`

          - `"LEAKED_CREDENTIALS"`

          - `"NET"`

          - `"ROBOTS_TXT"`

          - `"SPEED"`

          - `"WORKERS_AI"`

        - `description: string`

        - `endDate: string`

        - `eventType: "EVENT" or "GENERAL" or "OUTAGE" or 3 more`

          Event type for annotations.

          - `"EVENT"`

          - `"GENERAL"`

          - `"OUTAGE"`

          - `"PARTIAL_PROJECTION"`

          - `"PIPELINE"`

          - `"TRAFFIC_ANOMALY"`

        - `isInstantaneous: boolean`

          Whether event is a single point in time or a time range.

        - `linkedUrl: string`

        - `startDate: string`

        - `tags: optional array of string`

      - `level: number`

        Provides an indication of how much confidence Cloudflare has in the data.

    - `dateRange: array of object { endTime, startTime }`

      - `endTime: string`

        Adjusted end of date range.

      - `startTime: string`

        Adjusted start of date range.

    - `lastUpdated: string`

      Timestamp of the last dataset update.

    - `normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more`

      Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

      - `"PERCENTAGE"`

      - `"MIN0_MAX"`

      - `"MIN_MAX"`

      - `"RAW_VALUES"`

      - `"PERCENTAGE_CHANGE"`

      - `"ROLLING_AVERAGE"`

      - `"OVERLAPPED_PERCENTAGE"`

      - `"RATIO"`

    - `units: array of object { name, value }`

      Measurement units for the results.

      - `name: string`

      - `value: string`

    - `delay: optional object { asn_data, country_data, healthy, nowTs }`

      - `asn_data: object { delaySecs, delayStr, healthy, latest }`

        - `delaySecs: number`

        - `delayStr: string`

        - `healthy: boolean`

        - `latest: object { entries_count, path, timestamp }`

          - `entries_count: number`

          - `path: string`

          - `timestamp: number`

      - `country_data: object { delaySecs, delayStr, healthy, latest }`

        - `delaySecs: number`

        - `delayStr: string`

        - `healthy: boolean`

        - `latest: object { count, timestamp }`

          - `count: number`

          - `timestamp: number`

      - `healthy: boolean`

      - `nowTs: number`

  - `serie_0: object { ipv4, ipv6, timestamps }`

    - `ipv4: array of string`

    - `ipv6: array of string`

    - `timestamps: array of string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/ips/timeseries \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "meta": {
      "aggInterval": "FIFTEEN_MINUTES",
      "confidenceInfo": {
        "annotations": [
          {
            "dataSource": "ALL",
            "description": "Cable cut in Tonga",
            "endDate": "2019-12-27T18:11:19.117Z",
            "eventType": "EVENT",
            "isInstantaneous": true,
            "linkedUrl": "https://example.com",
            "startDate": "2019-12-27T18:11:19.117Z",
            "tags": [
              "BOT_CLASS"
            ]
          }
        ],
        "level": 0
      },
      "dateRange": [
        {
          "endTime": "2022-09-17T10:22:57.555Z",
          "startTime": "2022-09-16T10:22:57.555Z"
        }
      ],
      "lastUpdated": "2019-12-27T18:11:19.117Z",
      "normalization": "PERCENTAGE",
      "units": [
        {
          "name": "*",
          "value": "requests"
        }
      ],
      "delay": {
        "asn_data": {
          "delaySecs": 0,
          "delayStr": "delayStr",
          "healthy": true,
          "latest": {
            "entries_count": 0,
            "path": "path",
            "timestamp": 0
          }
        },
        "country_data": {
          "delaySecs": 0,
          "delayStr": "delayStr",
          "healthy": true,
          "latest": {
            "count": 0,
            "timestamp": 0
          }
        },
        "healthy": true,
        "nowTs": 0
      }
    },
    "serie_0": {
      "ipv4": [
        "10"
      ],
      "ipv6": [
        "10"
      ],
      "timestamps": [
        "2019-12-27T18:11:19.117Z"
      ]
    }
  },
  "success": true
}
```

## Domain Types

### IP Timeseries Response

- `IPTimeseriesResponse object { meta, serie_0 }`

  - `meta: object { aggInterval, confidenceInfo, dateRange, 4 more }`

    Metadata for the results.

    - `aggInterval: "FIFTEEN_MINUTES" or "ONE_HOUR" or "ONE_DAY" or 2 more`

      Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

      - `"FIFTEEN_MINUTES"`

      - `"ONE_HOUR"`

      - `"ONE_DAY"`

      - `"ONE_WEEK"`

      - `"ONE_MONTH"`

    - `confidenceInfo: object { annotations, level }`

      - `annotations: array of object { dataSource, description, endDate, 5 more }`

        - `dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more`

          Data source for annotations.

          - `"ALL"`

          - `"AI_BOTS"`

          - `"AI_GATEWAY"`

          - `"BGP"`

          - `"BOTS"`

          - `"CONNECTION_ANOMALY"`

          - `"CT"`

          - `"DNS"`

          - `"DNS_MAGNITUDE"`

          - `"DNS_AS112"`

          - `"DOS"`

          - `"EMAIL_ROUTING"`

          - `"EMAIL_SECURITY"`

          - `"FW"`

          - `"FW_PG"`

          - `"HTTP"`

          - `"HTTP_CONTROL"`

          - `"HTTP_CRAWLER_REFERER"`

          - `"HTTP_ORIGINS"`

          - `"IQI"`

          - `"LEAKED_CREDENTIALS"`

          - `"NET"`

          - `"ROBOTS_TXT"`

          - `"SPEED"`

          - `"WORKERS_AI"`

        - `description: string`

        - `endDate: string`

        - `eventType: "EVENT" or "GENERAL" or "OUTAGE" or 3 more`

          Event type for annotations.

          - `"EVENT"`

          - `"GENERAL"`

          - `"OUTAGE"`

          - `"PARTIAL_PROJECTION"`

          - `"PIPELINE"`

          - `"TRAFFIC_ANOMALY"`

        - `isInstantaneous: boolean`

          Whether event is a single point in time or a time range.

        - `linkedUrl: string`

        - `startDate: string`

        - `tags: optional array of string`

      - `level: number`

        Provides an indication of how much confidence Cloudflare has in the data.

    - `dateRange: array of object { endTime, startTime }`

      - `endTime: string`

        Adjusted end of date range.

      - `startTime: string`

        Adjusted start of date range.

    - `lastUpdated: string`

      Timestamp of the last dataset update.

    - `normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more`

      Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

      - `"PERCENTAGE"`

      - `"MIN0_MAX"`

      - `"MIN_MAX"`

      - `"RAW_VALUES"`

      - `"PERCENTAGE_CHANGE"`

      - `"ROLLING_AVERAGE"`

      - `"OVERLAPPED_PERCENTAGE"`

      - `"RATIO"`

    - `units: array of object { name, value }`

      Measurement units for the results.

      - `name: string`

      - `value: string`

    - `delay: optional object { asn_data, country_data, healthy, nowTs }`

      - `asn_data: object { delaySecs, delayStr, healthy, latest }`

        - `delaySecs: number`

        - `delayStr: string`

        - `healthy: boolean`

        - `latest: object { entries_count, path, timestamp }`

          - `entries_count: number`

          - `path: string`

          - `timestamp: number`

      - `country_data: object { delaySecs, delayStr, healthy, latest }`

        - `delaySecs: number`

        - `delayStr: string`

        - `healthy: boolean`

        - `latest: object { count, timestamp }`

          - `count: number`

          - `timestamp: number`

      - `healthy: boolean`

      - `nowTs: number`

  - `serie_0: object { ipv4, ipv6, timestamps }`

    - `ipv4: array of string`

    - `ipv6: array of string`

    - `timestamps: array of string`

# Top

## Get top ASes by announced IP space

**get** `/radar/bgp/ips/top/ases`

Returns the top-N autonomous systems by announced IP space at the nearest 8-hour RIB boundary at or before the requested date. The snapped boundary is returned as `anchor_ts`.

### Query Parameters

- `country: optional string`

  Optional ISO 3166-1 alpha-2 country filter. Omit for global top-N.

- `date: optional string`

  Filters results by the specified datetime (ISO 8601).

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `metric: optional "v4_24s" or "v6_48s"`

  Ranking metric: IPv4 /24 count or IPv6 /48 count.

  - `"v4_24s"`

  - `"v6_48s"`

### Returns

- `result: object { anchorTs, asns, country, metric }`

  - `anchorTs: string`

  - `asns: array of object { asn, v4_24s, v6_48s }`

    - `asn: number`

    - `v4_24s: number`

    - `v6_48s: number`

  - `country: string`

  - `metric: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/ips/top/ases \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "anchorTs": "2026-04-18T16:00:00.000Z",
    "asns": [
      {
        "asn": 749,
        "v4_24s": 875649,
        "v6_48s": 0
      }
    ],
    "country": "US",
    "metric": "v4_24s"
  },
  "success": true
}
```

## Domain Types

### Top Ases Response

- `TopAsesResponse object { anchorTs, asns, country, metric }`

  - `anchorTs: string`

  - `asns: array of object { asn, v4_24s, v6_48s }`

    - `asn: number`

    - `v4_24s: number`

    - `v6_48s: number`

  - `country: string`

  - `metric: string`

# RPKI

# ASPA

## Get ASPA objects snapshot

**get** `/radar/bgp/rpki/aspa/snapshot`

Retrieves current or historical ASPA (Autonomous System Provider Authorization) objects. ASPA objects define which ASNs are authorized upstream providers for a customer ASN.

### Query Parameters

- `customerAsn: optional number`

  Filter by customer ASN (the ASN publishing the ASPA object).

- `date: optional string`

  Filters results by the specified datetime (ISO 8601).

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `includeAsnInfo: optional boolean`

  Include ASN metadata (name, country) in response.

- `providerAsn: optional number`

  Filter by provider ASN (an authorized upstream provider in ASPA objects).

### Returns

- `result: object { asnInfo, aspaObjects, meta }`

  - `asnInfo: object { "13335" }`

    - `"13335": object { asn, country, name }`

      - `asn: number`

        ASN number.

      - `country: string`

        Alpha-2 country code.

      - `name: string`

        AS name.

  - `aspaObjects: array of object { customerAsn, providers }`

    - `customerAsn: number`

      The customer ASN publishing the ASPA object.

    - `providers: array of number`

  - `meta: object { dataTime, queryTime, totalCount }`

    - `dataTime: string`

      Timestamp of the underlying data.

    - `queryTime: string`

      Timestamp when the query was executed.

    - `totalCount: number`

      Total number of ASPA objects.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/rpki/aspa/snapshot \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "asnInfo": {
      "13335": {
        "asn": 0,
        "country": "country",
        "name": "name"
      }
    },
    "aspaObjects": [
      {
        "customerAsn": 0,
        "providers": [
          0
        ]
      }
    ],
    "meta": {
      "dataTime": "2019-12-27T18:11:19.117Z",
      "queryTime": "2019-12-27T18:11:19.117Z",
      "totalCount": 0
    }
  },
  "success": true
}
```

## Get ASPA changes over time

**get** `/radar/bgp/rpki/aspa/changes`

Retrieves ASPA (Autonomous System Provider Authorization) changes over time. Returns daily aggregated changes including additions, removals, and modifications of ASPA objects.

### Query Parameters

- `asn: optional number`

  Filter changes involving this ASN (as customer or provider).

- `dateEnd: optional string`

  End of the date range (inclusive).

- `dateStart: optional string`

  Start of the date range (inclusive).

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `includeAsnInfo: optional boolean`

  Include ASN metadata (name, country) in response.

### Returns

- `result: object { asnInfo, changes, meta }`

  - `asnInfo: object { "13335" }`

    - `"13335": object { asn, country, name }`

      - `asn: number`

        ASN number.

      - `country: string`

        Alpha-2 country code.

      - `name: string`

        AS name.

  - `changes: array of object { customersAdded, customersRemoved, date, 4 more }`

    - `customersAdded: number`

      Number of new ASPA objects created.

    - `customersRemoved: number`

      Number of ASPA objects deleted.

    - `date: string`

      Date of the changes in ISO 8601 format.

    - `entries: array of object { customerAsn, providers, type }`

      - `customerAsn: number`

        The customer ASN affected.

      - `providers: array of number`

      - `type: "CustomerAdded" or "CustomerRemoved" or "ProvidersAdded" or "ProvidersRemoved"`

        - `"CustomerAdded"`

        - `"CustomerRemoved"`

        - `"ProvidersAdded"`

        - `"ProvidersRemoved"`

    - `providersAdded: number`

      Number of providers added to existing objects.

    - `providersRemoved: number`

      Number of providers removed from existing objects.

    - `totalCount: number`

      Running total of active ASPA objects after this day.

  - `meta: object { dataTime, queryTime }`

    - `dataTime: string`

      Timestamp of the underlying data.

    - `queryTime: string`

      Timestamp when the query was executed.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/rpki/aspa/changes \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "asnInfo": {
      "13335": {
        "asn": 0,
        "country": "country",
        "name": "name"
      }
    },
    "changes": [
      {
        "customersAdded": 0,
        "customersRemoved": 0,
        "date": "2019-12-27T18:11:19.117Z",
        "entries": [
          {
            "customerAsn": 0,
            "providers": [
              0
            ],
            "type": "CustomerAdded"
          }
        ],
        "providersAdded": 0,
        "providersRemoved": 0,
        "totalCount": 0
      }
    ],
    "meta": {
      "dataTime": "2019-12-27T18:11:19.117Z",
      "queryTime": "2019-12-27T18:11:19.117Z"
    }
  },
  "success": true
}
```

## Get ASPA count time series

**get** `/radar/bgp/rpki/aspa/timeseries`

Retrieves ASPA (Autonomous System Provider Authorization) object count over time. Supports filtering by RIR or location (country code) to generate multiple named series. If no RIR or location filter is specified, returns total count.

### Query Parameters

- `dateEnd: optional string`

  End of the date range (inclusive).

- `dateStart: optional string`

  Start of the date range (inclusive).

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `location: optional array of string`

  Filters results by location. Specify a comma-separated list of alpha-2 location codes.

- `name: optional array of string`

  Array of names used to label the series in the response.

- `rir: optional array of "RIPE_NCC" or "ARIN" or "APNIC" or 2 more`

  Filter by Regional Internet Registry (RIR). Multiple RIRs generate multiple series.

  - `"RIPE_NCC"`

  - `"ARIN"`

  - `"APNIC"`

  - `"LACNIC"`

  - `"AFRINIC"`

### Returns

- `result: object { meta, serie_0 }`

  - `meta: object { dataTime, queryTime }`

    - `dataTime: string`

      Timestamp of the underlying data.

    - `queryTime: string`

      Timestamp when the query was executed.

  - `serie_0: object { timestamps, values }`

    - `timestamps: array of string`

    - `values: array of string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/rpki/aspa/timeseries \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "meta": {
      "dataTime": "2019-12-27T18:11:19.117Z",
      "queryTime": "2019-12-27T18:11:19.117Z"
    },
    "serie_0": {
      "timestamps": [
        "2019-12-27T18:11:19.117Z"
      ],
      "values": [
        "10"
      ]
    }
  },
  "success": true
}
```

## Domain Types

### ASPA Snapshot Response

- `ASPASnapshotResponse object { asnInfo, aspaObjects, meta }`

  - `asnInfo: object { "13335" }`

    - `"13335": object { asn, country, name }`

      - `asn: number`

        ASN number.

      - `country: string`

        Alpha-2 country code.

      - `name: string`

        AS name.

  - `aspaObjects: array of object { customerAsn, providers }`

    - `customerAsn: number`

      The customer ASN publishing the ASPA object.

    - `providers: array of number`

  - `meta: object { dataTime, queryTime, totalCount }`

    - `dataTime: string`

      Timestamp of the underlying data.

    - `queryTime: string`

      Timestamp when the query was executed.

    - `totalCount: number`

      Total number of ASPA objects.

### ASPA Changes Response

- `ASPAChangesResponse object { asnInfo, changes, meta }`

  - `asnInfo: object { "13335" }`

    - `"13335": object { asn, country, name }`

      - `asn: number`

        ASN number.

      - `country: string`

        Alpha-2 country code.

      - `name: string`

        AS name.

  - `changes: array of object { customersAdded, customersRemoved, date, 4 more }`

    - `customersAdded: number`

      Number of new ASPA objects created.

    - `customersRemoved: number`

      Number of ASPA objects deleted.

    - `date: string`

      Date of the changes in ISO 8601 format.

    - `entries: array of object { customerAsn, providers, type }`

      - `customerAsn: number`

        The customer ASN affected.

      - `providers: array of number`

      - `type: "CustomerAdded" or "CustomerRemoved" or "ProvidersAdded" or "ProvidersRemoved"`

        - `"CustomerAdded"`

        - `"CustomerRemoved"`

        - `"ProvidersAdded"`

        - `"ProvidersRemoved"`

    - `providersAdded: number`

      Number of providers added to existing objects.

    - `providersRemoved: number`

      Number of providers removed from existing objects.

    - `totalCount: number`

      Running total of active ASPA objects after this day.

  - `meta: object { dataTime, queryTime }`

    - `dataTime: string`

      Timestamp of the underlying data.

    - `queryTime: string`

      Timestamp when the query was executed.

### ASPA Timeseries Response

- `ASPATimeseriesResponse object { meta, serie_0 }`

  - `meta: object { dataTime, queryTime }`

    - `dataTime: string`

      Timestamp of the underlying data.

    - `queryTime: string`

      Timestamp when the query was executed.

  - `serie_0: object { timestamps, values }`

    - `timestamps: array of string`

    - `values: array of string`

# Roas

## Get RPKI ROA deployment time series

**get** `/radar/bgp/rpki/roas/timeseries`

Retrieves RPKI ROA (Route Origin Authorization) validation ratios over time. Returns the selected metric as a time series. Supports filtering by ASN or location (country code) — multiple values of the same filter type produce one series per value. If no ASN or location is specified, returns the global aggregate.

### Query Parameters

- `asn: optional array of string`

  Filters results by Autonomous System Number. Specify one or more ASNs. Multiple values generate one series per ASN.

- `dateEnd: optional string`

  End of the date range (inclusive).

- `dateStart: optional string`

  Start of the date range (inclusive).

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `location: optional array of string`

  Filters results by location. Specify a comma-separated list of alpha-2 location codes.

- `metric: optional "validPfxsRatio" or "validPfxsV4Ratio" or "validPfxsV6Ratio" or 3 more`

  Which RPKI ROA validation metric to return. validPfxsRatio = ratio of RPKI-valid prefixes (IPv4+IPv6 combined). validPfxsV4Ratio / validPfxsV6Ratio = same, split by IP version. validIpsRatio = ratio of RPKI-valid address space (IPv4 /24s + IPv6 /48s). validIpsV4Ratio / validIpsV6Ratio = same, split by IP version.

  - `"validPfxsRatio"`

  - `"validPfxsV4Ratio"`

  - `"validPfxsV6Ratio"`

  - `"validIpsRatio"`

  - `"validIpsV4Ratio"`

  - `"validIpsV6Ratio"`

- `name: optional array of string`

  Array of names used to label the series in the response.

### Returns

- `result: object { meta, serie_0 }`

  - `meta: object { dataTime, queryTime }`

    - `dataTime: string`

      Timestamp of the underlying data.

    - `queryTime: string`

      Timestamp when the query was executed.

  - `serie_0: object { timestamps, values }`

    - `timestamps: array of string`

    - `values: array of string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/rpki/roas/timeseries \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "meta": {
      "dataTime": "2019-12-27T18:11:19.117Z",
      "queryTime": "2019-12-27T18:11:19.117Z"
    },
    "serie_0": {
      "timestamps": [
        "2019-12-27T18:11:19.117Z"
      ],
      "values": [
        "10"
      ]
    }
  },
  "success": true
}
```

## Domain Types

### Roa Timeseries Response

- `RoaTimeseriesResponse object { meta, serie_0 }`

  - `meta: object { dataTime, queryTime }`

    - `dataTime: string`

      Timestamp of the underlying data.

    - `queryTime: string`

      Timestamp when the query was executed.

  - `serie_0: object { timestamps, values }`

    - `timestamps: array of string`

    - `values: array of string`
