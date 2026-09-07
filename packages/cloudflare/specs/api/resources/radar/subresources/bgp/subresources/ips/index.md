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
