## Get certificates time series

**get** `/radar/ct/timeseries`

Retrieves certificate volume over time.

### Query Parameters

- `aggInterval: optional "15m" or "1h" or "1d" or "1w"`

  Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

  - `"15m"`

  - `"1h"`

  - `"1d"`

  - `"1w"`

- `ca: optional array of string`

  Filters results by certificate authority.

- `caOwner: optional array of string`

  Filters results by certificate authority owner.

- `dateEnd: optional array of string`

  End of the date range (inclusive).

- `dateRange: optional array of string`

  Filters results by date range. For example, use `7d` and `7dcontrol` to compare this week with the previous week. Use this parameter or set specific start and end dates (`dateStart` and `dateEnd` parameters).

- `dateStart: optional array of string`

  Start of the date range.

- `duration: optional array of "LTE_3D" or "GT_3D_LTE_7D" or "GT_7D_LTE_10D" or 4 more`

  Filters results by certificate duration.

  - `"LTE_3D"`

  - `"GT_3D_LTE_7D"`

  - `"GT_7D_LTE_10D"`

  - `"GT_10D_LTE_47D"`

  - `"GT_47D_LTE_100D"`

  - `"GT_100D_LTE_200D"`

  - `"GT_200D"`

- `entryType: optional array of "PRECERTIFICATE" or "CERTIFICATE"`

  Filters results by entry type (certificate vs. pre-certificate).

  - `"PRECERTIFICATE"`

  - `"CERTIFICATE"`

- `expirationStatus: optional array of "EXPIRED" or "VALID"`

  Filters results by expiration status (expired vs. valid).

  - `"EXPIRED"`

  - `"VALID"`

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `hasIps: optional array of boolean`

  Filters results based on whether the certificates are bound to specific IP addresses.

- `hasWildcards: optional array of boolean`

  Filters results based on whether the certificates contain wildcard domains.

- `log: optional array of string`

  Filters results by certificate log.

- `logApi: optional array of "RFC6962" or "STATIC"`

  Filters results by certificate log API (RFC6962 vs. static).

  - `"RFC6962"`

  - `"STATIC"`

- `logOperator: optional array of string`

  Filters results by certificate log operator.

- `name: optional array of string`

  Array of names used to label the series in the response.

- `publicKeyAlgorithm: optional array of "DSA" or "ECDSA" or "RSA"`

  Filters results by public key algorithm.

  - `"DSA"`

  - `"ECDSA"`

  - `"RSA"`

- `signatureAlgorithm: optional array of "DSA_SHA_1" or "DSA_SHA_256" or "ECDSA_SHA_1" or 12 more`

  Filters results by signature algorithm.

  - `"DSA_SHA_1"`

  - `"DSA_SHA_256"`

  - `"ECDSA_SHA_1"`

  - `"ECDSA_SHA_256"`

  - `"ECDSA_SHA_384"`

  - `"ECDSA_SHA_512"`

  - `"PSS_SHA_256"`

  - `"PSS_SHA_384"`

  - `"PSS_SHA_512"`

  - `"RSA_MD2"`

  - `"RSA_MD5"`

  - `"RSA_SHA_1"`

  - `"RSA_SHA_256"`

  - `"RSA_SHA_384"`

  - `"RSA_SHA_512"`

- `tld: optional array of string`

  Filters results by top-level domain.

- `uniqueEntries: optional array of "true" or "false"`

  Specifies whether to filter out duplicate certificates and pre-certificates. Set to true for unique entries only.

  - `"true"`

  - `"false"`

- `validationLevel: optional array of "DOMAIN" or "ORGANIZATION" or "EXTENDED"`

  Filters results by validation level.

  - `"DOMAIN"`

  - `"ORGANIZATION"`

  - `"EXTENDED"`

### Returns

- `result: object { meta }`

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

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/ct/timeseries \
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
    }
  },
  "success": true
}
```
