## Get layer 3 attacks by bitrate time series

**get** `/radar/attacks/layer3/timeseries_groups/bitrate`

Retrieves the distribution of layer 3 attacks by bitrate over time.

### Query Parameters

- `aggInterval: optional "15m" or "1h" or "1d" or "1w"`

  Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

  - `"15m"`

  - `"1h"`

  - `"1d"`

  - `"1w"`

- `continent: optional array of string`

  Filters results by continent. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude continents from results. For example, `-EU,NA` excludes results from EU, but includes results from NA.

- `dateEnd: optional array of string`

  End of the date range (inclusive).

- `dateRange: optional array of string`

  Filters results by date range. For example, use `7d` and `7dcontrol` to compare this week with the previous week. Use this parameter or set specific start and end dates (`dateStart` and `dateEnd` parameters).

- `dateStart: optional array of string`

  Start of the date range.

- `direction: optional "ORIGIN" or "TARGET"`

  Specifies whether the `location` filter applies to the source or target location.

  - `"ORIGIN"`

  - `"TARGET"`

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `ipVersion: optional array of "IPv4" or "IPv6"`

  Filters results by IP version (Ipv4 vs. IPv6).

  - `"IPv4"`

  - `"IPv6"`

- `location: optional array of string`

  Filters results by location. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude locations from results. For example, `-US,PT` excludes results from the US, but includes results from PT.

- `name: optional array of string`

  Array of names used to label the series in the response.

- `normalization: optional "PERCENTAGE" or "MIN0_MAX"`

  Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

  - `"PERCENTAGE"`

  - `"MIN0_MAX"`

- `protocol: optional array of "UDP" or "TCP" or "ICMP" or "GRE"`

  Filters the results by layer 3/4 protocol.

  - `"UDP"`

  - `"TCP"`

  - `"ICMP"`

  - `"GRE"`

### Returns

- `result: object { meta, serie_0 }`

  - `meta: object { aggInterval, confidenceInfo, dateRange, 3 more }`

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

  - `serie_0: object { _1_GBPS_TO_10_GBPS, _10_GBPS_TO_100_GBPS, _500_MBPS_TO_1_GBPS, 3 more }`

    - `_1_GBPS_TO_10_GBPS: array of string`

    - `_10_GBPS_TO_100_GBPS: array of string`

    - `_500_MBPS_TO_1_GBPS: array of string`

    - `OVER_100_GBPS: array of string`

    - `timestamps: array of string`

    - `UNDER_500_MBPS: array of string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/attacks/layer3/timeseries_groups/bitrate \
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
      ]
    },
    "serie_0": {
      "_1_GBPS_TO_10_GBPS": [
        "10"
      ],
      "_10_GBPS_TO_100_GBPS": [
        "10"
      ],
      "_500_MBPS_TO_1_GBPS": [
        "10"
      ],
      "OVER_100_GBPS": [
        "10"
      ],
      "timestamps": [
        "2019-12-27T18:11:19.117Z"
      ],
      "UNDER_500_MBPS": [
        "10"
      ]
    }
  },
  "success": true
}
```
