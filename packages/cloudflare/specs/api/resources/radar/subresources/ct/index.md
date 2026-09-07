# CT

## Get certificate distribution by dimension

**get** `/radar/ct/summary/{dimension}`

Retrieves an aggregated summary of certificates grouped by the specified dimension.

### Path Parameters

- `dimension: "CA" or "CA_OWNER" or "DURATION" or 11 more`

  Specifies the certificate attribute by which to group the results.

  - `"CA"`

  - `"CA_OWNER"`

  - `"DURATION"`

  - `"ENTRY_TYPE"`

  - `"EXPIRATION_STATUS"`

  - `"HAS_IPS"`

  - `"HAS_WILDCARDS"`

  - `"LOG"`

  - `"LOG_API"`

  - `"LOG_OPERATOR"`

  - `"PUBLIC_KEY_ALGORITHM"`

  - `"SIGNATURE_ALGORITHM"`

  - `"TLD"`

  - `"VALIDATION_LEVEL"`

### Query Parameters

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

- `limitPerGroup: optional number`

  Limits the number of objects per group to the top items within the specified time range. When item count exceeds the limit, extra items appear grouped under an "other" category.

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

- `normalization: optional "RAW_VALUES" or "PERCENTAGE"`

  Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

  - `"RAW_VALUES"`

  - `"PERCENTAGE"`

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

- `result: object { meta, summary_0 }`

  - `meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }`

    Metadata for the results.

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

  - `summary_0: map[string] or object { rfc6962, static }  or object { gt_121d, gt_16d_lte_31d, gt_31d_lte_91d, 3 more }  or 5 more`

    - `map[string]`

    - `object { rfc6962, static }`

      - `rfc6962: string`

      - `static: string`

    - `object { gt_121d, gt_16d_lte_31d, gt_31d_lte_91d, 3 more }`

      - `gt_121d: string`

      - `gt_16d_lte_31d: string`

      - `gt_31d_lte_91d: string`

      - `gt_3d_lte_16d: string`

      - `gt_91d_lte_121d: string`

      - `lte_3d: string`

    - `object { CERTIFICATE, PRECERTIFICATE }`

      - `CERTIFICATE: string`

      - `PRECERTIFICATE: string`

    - `object { EXPIRED, VALID }`

      - `EXPIRED: string`

      - `VALID: string`

    - `object { NEGATIVE, POSITIVE }`

      - `NEGATIVE: string`

      - `POSITIVE: string`

    - `object { DSA, ECDSA, RSA }`

      - `DSA: string`

      - `ECDSA: string`

      - `RSA: string`

    - `object { domain, extended, organization, unknown }`

      - `domain: string`

      - `extended: string`

      - `organization: string`

      - `unknown: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/ct/summary/$DIMENSION \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "meta": {
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
    "summary_0": {
      "DigiCert": "10.274394",
      "GoDaddy": "8.381743",
      "Internet Security Research Group": "63.40249"
    }
  },
  "success": true
}
```

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

## Get time series of certificate distribution by dimension

**get** `/radar/ct/timeseries_groups/{dimension}`

Retrieves the distribution of certificates grouped by the specified dimension over time.

### Path Parameters

- `dimension: "CA" or "CA_OWNER" or "DURATION" or 11 more`

  Specifies the certificate attribute by which to group the results.

  - `"CA"`

  - `"CA_OWNER"`

  - `"DURATION"`

  - `"ENTRY_TYPE"`

  - `"EXPIRATION_STATUS"`

  - `"HAS_IPS"`

  - `"HAS_WILDCARDS"`

  - `"LOG"`

  - `"LOG_API"`

  - `"LOG_OPERATOR"`

  - `"PUBLIC_KEY_ALGORITHM"`

  - `"SIGNATURE_ALGORITHM"`

  - `"TLD"`

  - `"VALIDATION_LEVEL"`

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

- `limitPerGroup: optional number`

  Limits the number of objects per group to the top items within the specified time range. When item count exceeds the limit, extra items appear grouped under an "other" category.

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

- `normalization: optional "RAW_VALUES" or "PERCENTAGE"`

  Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

  - `"RAW_VALUES"`

  - `"PERCENTAGE"`

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

  - `serie_0: object { timestamps }  or object { rfc6962, static }  or object { gt_121d, gt_16d_lte_31d, gt_31d_lte_91d, 3 more }  or 5 more`

    - `UnnamedSchemaRef7826220e105d84352ba1108d9ed88e55 object { timestamps }`

      - `timestamps: array of string`

    - `object { rfc6962, static }`

      - `rfc6962: array of string`

      - `static: array of string`

    - `object { gt_121d, gt_16d_lte_31d, gt_31d_lte_91d, 3 more }`

      - `gt_121d: array of string`

      - `gt_16d_lte_31d: array of string`

      - `gt_31d_lte_91d: array of string`

      - `gt_3d_lte_16d: array of string`

      - `gt_91d_lte_121d: array of string`

      - `lte_3d: array of string`

    - `object { CERTIFICATE, PRECERTIFICATE }`

      - `CERTIFICATE: array of string`

      - `PRECERTIFICATE: array of string`

    - `object { EXPIRED, VALID }`

      - `EXPIRED: array of string`

      - `VALID: array of string`

    - `object { NEGATIVE, POSITIVE }`

      - `NEGATIVE: array of string`

      - `POSITIVE: array of string`

    - `object { DSA, ECDSA, RSA }`

      - `DSA: array of string`

      - `ECDSA: array of string`

      - `RSA: array of string`

    - `object { domain, extended, organization, unknown }`

      - `domain: array of string`

      - `extended: array of string`

      - `organization: array of string`

      - `unknown: array of string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/ct/timeseries_groups/$DIMENSION \
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
      "timestamps": [
        "2023-08-08T10:15:00Z"
      ]
    }
  },
  "success": true
}
```

## Domain Types

### CT Summary Response

- `CTSummaryResponse object { meta, summary_0 }`

  - `meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }`

    Metadata for the results.

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

  - `summary_0: map[string] or object { rfc6962, static }  or object { gt_121d, gt_16d_lte_31d, gt_31d_lte_91d, 3 more }  or 5 more`

    - `map[string]`

    - `object { rfc6962, static }`

      - `rfc6962: string`

      - `static: string`

    - `object { gt_121d, gt_16d_lte_31d, gt_31d_lte_91d, 3 more }`

      - `gt_121d: string`

      - `gt_16d_lte_31d: string`

      - `gt_31d_lte_91d: string`

      - `gt_3d_lte_16d: string`

      - `gt_91d_lte_121d: string`

      - `lte_3d: string`

    - `object { CERTIFICATE, PRECERTIFICATE }`

      - `CERTIFICATE: string`

      - `PRECERTIFICATE: string`

    - `object { EXPIRED, VALID }`

      - `EXPIRED: string`

      - `VALID: string`

    - `object { NEGATIVE, POSITIVE }`

      - `NEGATIVE: string`

      - `POSITIVE: string`

    - `object { DSA, ECDSA, RSA }`

      - `DSA: string`

      - `ECDSA: string`

      - `RSA: string`

    - `object { domain, extended, organization, unknown }`

      - `domain: string`

      - `extended: string`

      - `organization: string`

      - `unknown: string`

### CT Timeseries Response

- `CTTimeseriesResponse object { meta }`

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

### CT Timeseries Groups Response

- `CTTimeseriesGroupsResponse object { meta, serie_0 }`

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

  - `serie_0: object { timestamps }  or object { rfc6962, static }  or object { gt_121d, gt_16d_lte_31d, gt_31d_lte_91d, 3 more }  or 5 more`

    - `UnnamedSchemaRef7826220e105d84352ba1108d9ed88e55 object { timestamps }`

      - `timestamps: array of string`

    - `object { rfc6962, static }`

      - `rfc6962: array of string`

      - `static: array of string`

    - `object { gt_121d, gt_16d_lte_31d, gt_31d_lte_91d, 3 more }`

      - `gt_121d: array of string`

      - `gt_16d_lte_31d: array of string`

      - `gt_31d_lte_91d: array of string`

      - `gt_3d_lte_16d: array of string`

      - `gt_91d_lte_121d: array of string`

      - `lte_3d: array of string`

    - `object { CERTIFICATE, PRECERTIFICATE }`

      - `CERTIFICATE: array of string`

      - `PRECERTIFICATE: array of string`

    - `object { EXPIRED, VALID }`

      - `EXPIRED: array of string`

      - `VALID: array of string`

    - `object { NEGATIVE, POSITIVE }`

      - `NEGATIVE: array of string`

      - `POSITIVE: array of string`

    - `object { DSA, ECDSA, RSA }`

      - `DSA: array of string`

      - `ECDSA: array of string`

      - `RSA: array of string`

    - `object { domain, extended, organization, unknown }`

      - `domain: array of string`

      - `extended: array of string`

      - `organization: array of string`

      - `unknown: array of string`

# Authorities

## Get certificate authority details

**get** `/radar/ct/authorities/{ca_slug}`

Retrieves the requested CA information.

### Path Parameters

- `ca_slug: string`

  Certificate authority SHA256 fingerprint.

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

### Returns

- `result: object { certificateAuthority }`

  - `certificateAuthority: object { appleStatus, authorityKeyIdentifier, certificateRecordType, 15 more }`

    - `appleStatus: "INCLUDED" or "NOT_YET_INCLUDED" or "NOT_INCLUDED" or 4 more`

      The inclusion status of a Certificate Authority (CA) in the trust store.

      - `"INCLUDED"`

      - `"NOT_YET_INCLUDED"`

      - `"NOT_INCLUDED"`

      - `"NOT_BEFORE"`

      - `"REMOVED"`

      - `"DISABLED"`

      - `"BLOCKED"`

    - `authorityKeyIdentifier: string`

      The authorityKeyIdentifier value extracted from the certificate PEM.

    - `certificateRecordType: "ROOT_CERTIFICATE" or "INTERMEDIATE_CERTIFICATE"`

      Specifies the type of certificate in the trust chain.

      - `"ROOT_CERTIFICATE"`

      - `"INTERMEDIATE_CERTIFICATE"`

    - `chromeStatus: "INCLUDED" or "NOT_YET_INCLUDED" or "NOT_INCLUDED" or 4 more`

      The inclusion status of a Certificate Authority (CA) in the trust store.

      - `"INCLUDED"`

      - `"NOT_YET_INCLUDED"`

      - `"NOT_INCLUDED"`

      - `"NOT_BEFORE"`

      - `"REMOVED"`

      - `"DISABLED"`

      - `"BLOCKED"`

    - `country: string`

      The two-letter ISO country code where the CA organization is based.

    - `countryName: string`

      The full country name corresponding to the country code.

    - `microsoftStatus: "INCLUDED" or "NOT_YET_INCLUDED" or "NOT_INCLUDED" or 4 more`

      The inclusion status of a Certificate Authority (CA) in the trust store.

      - `"INCLUDED"`

      - `"NOT_YET_INCLUDED"`

      - `"NOT_INCLUDED"`

      - `"NOT_BEFORE"`

      - `"REMOVED"`

      - `"DISABLED"`

      - `"BLOCKED"`

    - `mozillaStatus: "INCLUDED" or "NOT_YET_INCLUDED" or "NOT_INCLUDED" or 4 more`

      The inclusion status of a Certificate Authority (CA) in the trust store.

      - `"INCLUDED"`

      - `"NOT_YET_INCLUDED"`

      - `"NOT_INCLUDED"`

      - `"NOT_BEFORE"`

      - `"REMOVED"`

      - `"DISABLED"`

      - `"BLOCKED"`

    - `name: string`

      The full name of the certificate authority (CA).

    - `owner: string`

      The organization that owns and operates the CA.

    - `parentName: string`

      The name of the parent/root certificate authority that issued this intermediate certificate.

    - `parentSha256Fingerprint: string`

      The SHA-256 fingerprint of the parent certificate.

    - `related: array of object { certificateRecordType, name, revocationStatus, sha256Fingerprint }`

      CAs from the same owner.

      - `certificateRecordType: "ROOT_CERTIFICATE" or "INTERMEDIATE_CERTIFICATE"`

        Specifies the type of certificate in the trust chain.

        - `"ROOT_CERTIFICATE"`

        - `"INTERMEDIATE_CERTIFICATE"`

      - `name: string`

        The full name of the certificate authority (CA).

      - `revocationStatus: "NOT_REVOKED" or "REVOKED" or "PARENT_CERT_REVOKED"`

        The current revocation status of a Certificate Authority (CA) certificate.

        - `"NOT_REVOKED"`

        - `"REVOKED"`

        - `"PARENT_CERT_REVOKED"`

      - `sha256Fingerprint: string`

        The SHA-256 fingerprint of the intermediate certificate.

    - `revocationStatus: "NOT_REVOKED" or "REVOKED" or "PARENT_CERT_REVOKED"`

      The current revocation status of a Certificate Authority (CA) certificate.

      - `"NOT_REVOKED"`

      - `"REVOKED"`

      - `"PARENT_CERT_REVOKED"`

    - `sha256Fingerprint: string`

      The SHA-256 fingerprint of the intermediate certificate.

    - `subjectKeyIdentifier: string`

      The subjectKeyIdentifier value extracted from the certificate PEM.

    - `validFrom: string`

      The start date of the certificate’s validity period (ISO format).

    - `validTo: string`

      The end date of the certificate’s validity period (ISO format).

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/ct/authorities/$CA_SLUG \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "certificateAuthority": {
      "appleStatus": "INCLUDED",
      "authorityKeyIdentifier": "1TkcnFtvBKqilUzvIN0pdKTFRXE",
      "certificateRecordType": "ROOT_CERTIFICATE",
      "chromeStatus": "INCLUDED",
      "country": "PT",
      "countryName": "Portugal",
      "microsoftStatus": "INCLUDED",
      "mozillaStatus": "INCLUDED",
      "name": "MULTICERT Advanced Certification Authority 005",
      "owner": "MULTICERT",
      "parentName": "MULTICERT Root Certification Authority 01",
      "parentSha256Fingerprint": "604D32D036895AED3BFEFAEB727C009EC0F2B3CDFA42A1C71730E6A72C3BE9D4",
      "related": [
        {
          "certificateRecordType": "ROOT_CERTIFICATE",
          "name": "MULTICERT Advanced Certification Authority 005",
          "revocationStatus": "NOT_REVOKED",
          "sha256Fingerprint": "24EDD4E503A8D3FDB5FFB4AF66C887359901CBE687A5A0760D10A08EED99A7C3"
        }
      ],
      "revocationStatus": "NOT_REVOKED",
      "sha256Fingerprint": "24EDD4E503A8D3FDB5FFB4AF66C887359901CBE687A5A0760D10A08EED99A7C3",
      "subjectKeyIdentifier": "VbqXmCURhMmiMtD7nFY6iCr4z",
      "validFrom": "2019-12-09",
      "validTo": "2032-06-08"
    }
  },
  "success": true
}
```

## List certificate authorities

**get** `/radar/ct/authorities`

Retrieves a list of certificate authorities.

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `offset: optional number`

  Skips the specified number of objects before fetching the results.

### Returns

- `result: object { certificateAuthorities }`

  - `certificateAuthorities: array of object { certificateRecordType, country, countryName, 6 more }`

    - `certificateRecordType: "ROOT_CERTIFICATE" or "INTERMEDIATE_CERTIFICATE"`

      Specifies the type of certificate in the trust chain.

      - `"ROOT_CERTIFICATE"`

      - `"INTERMEDIATE_CERTIFICATE"`

    - `country: string`

      The two-letter ISO country code where the CA organization is based.

    - `countryName: string`

      The full country name corresponding to the country code.

    - `name: string`

      The full name of the certificate authority (CA).

    - `owner: string`

      The organization that owns and operates the CA.

    - `parentName: string`

      The name of the parent/root certificate authority that issued this intermediate certificate.

    - `parentSha256Fingerprint: string`

      The SHA-256 fingerprint of the parent certificate.

    - `revocationStatus: "NOT_REVOKED" or "REVOKED" or "PARENT_CERT_REVOKED"`

      The current revocation status of a Certificate Authority (CA) certificate.

      - `"NOT_REVOKED"`

      - `"REVOKED"`

      - `"PARENT_CERT_REVOKED"`

    - `sha256Fingerprint: string`

      The SHA-256 fingerprint of the intermediate certificate.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/ct/authorities \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "certificateAuthorities": [
      {
        "certificateRecordType": "ROOT_CERTIFICATE",
        "country": "PT",
        "countryName": "Portugal",
        "name": "MULTICERT Advanced Certification Authority 005",
        "owner": "MULTICERT",
        "parentName": "MULTICERT Root Certification Authority 01",
        "parentSha256Fingerprint": "24EDD4E503A8D3FDB5FFB4AF66C887359901CBE687A5A0760D10A08EED99A7C3",
        "revocationStatus": "NOT_REVOKED",
        "sha256Fingerprint": "24EDD4E503A8D3FDB5FFB4AF66C887359901CBE687A5A0760D10A08EED99A7C3"
      }
    ]
  },
  "success": true
}
```

## Domain Types

### Authority Get Response

- `AuthorityGetResponse object { certificateAuthority }`

  - `certificateAuthority: object { appleStatus, authorityKeyIdentifier, certificateRecordType, 15 more }`

    - `appleStatus: "INCLUDED" or "NOT_YET_INCLUDED" or "NOT_INCLUDED" or 4 more`

      The inclusion status of a Certificate Authority (CA) in the trust store.

      - `"INCLUDED"`

      - `"NOT_YET_INCLUDED"`

      - `"NOT_INCLUDED"`

      - `"NOT_BEFORE"`

      - `"REMOVED"`

      - `"DISABLED"`

      - `"BLOCKED"`

    - `authorityKeyIdentifier: string`

      The authorityKeyIdentifier value extracted from the certificate PEM.

    - `certificateRecordType: "ROOT_CERTIFICATE" or "INTERMEDIATE_CERTIFICATE"`

      Specifies the type of certificate in the trust chain.

      - `"ROOT_CERTIFICATE"`

      - `"INTERMEDIATE_CERTIFICATE"`

    - `chromeStatus: "INCLUDED" or "NOT_YET_INCLUDED" or "NOT_INCLUDED" or 4 more`

      The inclusion status of a Certificate Authority (CA) in the trust store.

      - `"INCLUDED"`

      - `"NOT_YET_INCLUDED"`

      - `"NOT_INCLUDED"`

      - `"NOT_BEFORE"`

      - `"REMOVED"`

      - `"DISABLED"`

      - `"BLOCKED"`

    - `country: string`

      The two-letter ISO country code where the CA organization is based.

    - `countryName: string`

      The full country name corresponding to the country code.

    - `microsoftStatus: "INCLUDED" or "NOT_YET_INCLUDED" or "NOT_INCLUDED" or 4 more`

      The inclusion status of a Certificate Authority (CA) in the trust store.

      - `"INCLUDED"`

      - `"NOT_YET_INCLUDED"`

      - `"NOT_INCLUDED"`

      - `"NOT_BEFORE"`

      - `"REMOVED"`

      - `"DISABLED"`

      - `"BLOCKED"`

    - `mozillaStatus: "INCLUDED" or "NOT_YET_INCLUDED" or "NOT_INCLUDED" or 4 more`

      The inclusion status of a Certificate Authority (CA) in the trust store.

      - `"INCLUDED"`

      - `"NOT_YET_INCLUDED"`

      - `"NOT_INCLUDED"`

      - `"NOT_BEFORE"`

      - `"REMOVED"`

      - `"DISABLED"`

      - `"BLOCKED"`

    - `name: string`

      The full name of the certificate authority (CA).

    - `owner: string`

      The organization that owns and operates the CA.

    - `parentName: string`

      The name of the parent/root certificate authority that issued this intermediate certificate.

    - `parentSha256Fingerprint: string`

      The SHA-256 fingerprint of the parent certificate.

    - `related: array of object { certificateRecordType, name, revocationStatus, sha256Fingerprint }`

      CAs from the same owner.

      - `certificateRecordType: "ROOT_CERTIFICATE" or "INTERMEDIATE_CERTIFICATE"`

        Specifies the type of certificate in the trust chain.

        - `"ROOT_CERTIFICATE"`

        - `"INTERMEDIATE_CERTIFICATE"`

      - `name: string`

        The full name of the certificate authority (CA).

      - `revocationStatus: "NOT_REVOKED" or "REVOKED" or "PARENT_CERT_REVOKED"`

        The current revocation status of a Certificate Authority (CA) certificate.

        - `"NOT_REVOKED"`

        - `"REVOKED"`

        - `"PARENT_CERT_REVOKED"`

      - `sha256Fingerprint: string`

        The SHA-256 fingerprint of the intermediate certificate.

    - `revocationStatus: "NOT_REVOKED" or "REVOKED" or "PARENT_CERT_REVOKED"`

      The current revocation status of a Certificate Authority (CA) certificate.

      - `"NOT_REVOKED"`

      - `"REVOKED"`

      - `"PARENT_CERT_REVOKED"`

    - `sha256Fingerprint: string`

      The SHA-256 fingerprint of the intermediate certificate.

    - `subjectKeyIdentifier: string`

      The subjectKeyIdentifier value extracted from the certificate PEM.

    - `validFrom: string`

      The start date of the certificate’s validity period (ISO format).

    - `validTo: string`

      The end date of the certificate’s validity period (ISO format).

### Authority List Response

- `AuthorityListResponse object { certificateAuthorities }`

  - `certificateAuthorities: array of object { certificateRecordType, country, countryName, 6 more }`

    - `certificateRecordType: "ROOT_CERTIFICATE" or "INTERMEDIATE_CERTIFICATE"`

      Specifies the type of certificate in the trust chain.

      - `"ROOT_CERTIFICATE"`

      - `"INTERMEDIATE_CERTIFICATE"`

    - `country: string`

      The two-letter ISO country code where the CA organization is based.

    - `countryName: string`

      The full country name corresponding to the country code.

    - `name: string`

      The full name of the certificate authority (CA).

    - `owner: string`

      The organization that owns and operates the CA.

    - `parentName: string`

      The name of the parent/root certificate authority that issued this intermediate certificate.

    - `parentSha256Fingerprint: string`

      The SHA-256 fingerprint of the parent certificate.

    - `revocationStatus: "NOT_REVOKED" or "REVOKED" or "PARENT_CERT_REVOKED"`

      The current revocation status of a Certificate Authority (CA) certificate.

      - `"NOT_REVOKED"`

      - `"REVOKED"`

      - `"PARENT_CERT_REVOKED"`

    - `sha256Fingerprint: string`

      The SHA-256 fingerprint of the intermediate certificate.

# Logs

## Get certificate log details

**get** `/radar/ct/logs/{log_slug}`

Retrieves the requested certificate log information.

### Path Parameters

- `log_slug: string`

  Certificate log slug.

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

### Returns

- `result: object { certificateLog }`

  - `certificateLog: object { api, avgThroughput, description, 12 more }`

    - `api: "RFC6962" or "STATIC"`

      The API standard that the certificate log follows.

      - `"RFC6962"`

      - `"STATIC"`

    - `avgThroughput: number`

      The average throughput of the CT log, measured in certificates per hour (certs/hour).

    - `description: string`

      A brief description of the certificate log.

    - `endExclusive: string`

      The end date and time for when the log will stop accepting certificates.

    - `lastUpdate: string`

      Timestamp of the most recent update to the CT log.

    - `operator: string`

      The organization responsible for operating the certificate log.

    - `performance: object { endpoints, responseTime, uptime }`

      Log performance metrics, including averages and per-endpoint details.

      - `endpoints: array of object { endpoint, responseTime, uptime }`

        - `endpoint: "add-chain (new)" or "add-chain (old)" or "add-pre-chain (new)" or 4 more`

          The certificate log endpoint names used in performance metrics.

          - `"add-chain (new)"`

          - `"add-chain (old)"`

          - `"add-pre-chain (new)"`

          - `"add-pre-chain (old)"`

          - `"get-entries"`

          - `"get-roots"`

          - `"get-sth"`

        - `responseTime: number`

        - `uptime: number`

      - `responseTime: number`

      - `uptime: number`

    - `related: array of object { description, endExclusive, slug, 2 more }`

      Logs from the same operator.

      - `description: string`

        A brief description of the certificate log.

      - `endExclusive: string`

        The end date and time for when the log will stop accepting certificates.

      - `slug: string`

        A URL-friendly, kebab-case identifier for the certificate log.

      - `startInclusive: string`

        The start date and time for when the log starts accepting certificates.

      - `state: "USABLE" or "PENDING" or "QUALIFIED" or 3 more`

        The current state of the certificate log. More details about log states can be found here: https://googlechrome.github.io/CertificateTransparency/log_states.html

        - `"USABLE"`

        - `"PENDING"`

        - `"QUALIFIED"`

        - `"READ_ONLY"`

        - `"RETIRED"`

        - `"REJECTED"`

    - `slug: string`

      A URL-friendly, kebab-case identifier for the certificate log.

    - `startInclusive: string`

      The start date and time for when the log starts accepting certificates.

    - `state: "USABLE" or "PENDING" or "QUALIFIED" or 3 more`

      The current state of the certificate log. More details about log states can be found here: https://googlechrome.github.io/CertificateTransparency/log_states.html

      - `"USABLE"`

      - `"PENDING"`

      - `"QUALIFIED"`

      - `"READ_ONLY"`

      - `"RETIRED"`

      - `"REJECTED"`

    - `stateTimestamp: string`

      Timestamp of when the log state was last updated.

    - `submittableCertCount: string`

      Number of certificates that are eligible for inclusion to this log but have not been included yet. Based on certificates signed by trusted root CAs within the log's accepted date range.

    - `submittedCertCount: string`

      Number of certificates already included in this CT log.

    - `url: string`

      The URL for the certificate log.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/ct/logs/$LOG_SLUG \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "certificateLog": {
      "api": "RFC6962",
      "avgThroughput": 0,
      "description": "Google 'Argon2024' log",
      "endExclusive": "2025-01-01T00:00:00Z",
      "lastUpdate": "2025-01-01T00:00:00Z",
      "operator": "Google",
      "performance": {
        "endpoints": [
          {
            "endpoint": "add-chain (new)",
            "responseTime": 0,
            "uptime": 0
          }
        ],
        "responseTime": 0,
        "uptime": 0
      },
      "related": [
        {
          "description": "Google 'Argon2024' log",
          "endExclusive": "2025-01-01T00:00:00Z",
          "slug": "argon2024",
          "startInclusive": "2024-01-01T00:00:00Z",
          "state": "USABLE"
        }
      ],
      "slug": "argon2024",
      "startInclusive": "2024-01-01T00:00:00Z",
      "state": "USABLE",
      "stateTimestamp": "2025-02-01T08:53:20Z",
      "submittableCertCount": "10",
      "submittedCertCount": "10",
      "url": "https://ct.googleapis.com/logs/us1/argon2024/"
    }
  },
  "success": true
}
```

## List certificate logs

**get** `/radar/ct/logs`

Retrieves a list of certificate logs.

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `offset: optional number`

  Skips the specified number of objects before fetching the results.

### Returns

- `result: object { certificateLogs }`

  - `certificateLogs: array of object { api, description, endExclusive, 6 more }`

    - `api: "RFC6962" or "STATIC"`

      The API standard that the certificate log follows.

      - `"RFC6962"`

      - `"STATIC"`

    - `description: string`

      A brief description of the certificate log.

    - `endExclusive: string`

      The end date and time for when the log will stop accepting certificates.

    - `operator: string`

      The organization responsible for operating the certificate log.

    - `slug: string`

      A URL-friendly, kebab-case identifier for the certificate log.

    - `startInclusive: string`

      The start date and time for when the log starts accepting certificates.

    - `state: "USABLE" or "PENDING" or "QUALIFIED" or 3 more`

      The current state of the certificate log. More details about log states can be found here: https://googlechrome.github.io/CertificateTransparency/log_states.html

      - `"USABLE"`

      - `"PENDING"`

      - `"QUALIFIED"`

      - `"READ_ONLY"`

      - `"RETIRED"`

      - `"REJECTED"`

    - `stateTimestamp: string`

      Timestamp of when the log state was last updated.

    - `url: string`

      The URL for the certificate log.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/ct/logs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "certificateLogs": [
      {
        "api": "RFC6962",
        "description": "Google 'Argon2024' log",
        "endExclusive": "2025-01-01T00:00:00Z",
        "operator": "Google",
        "slug": "argon2024",
        "startInclusive": "2024-01-01T00:00:00Z",
        "state": "USABLE",
        "stateTimestamp": "2025-02-01T08:53:20Z",
        "url": "https://ct.googleapis.com/logs/us1/argon2024/"
      }
    ]
  },
  "success": true
}
```

## Domain Types

### Log Get Response

- `LogGetResponse object { certificateLog }`

  - `certificateLog: object { api, avgThroughput, description, 12 more }`

    - `api: "RFC6962" or "STATIC"`

      The API standard that the certificate log follows.

      - `"RFC6962"`

      - `"STATIC"`

    - `avgThroughput: number`

      The average throughput of the CT log, measured in certificates per hour (certs/hour).

    - `description: string`

      A brief description of the certificate log.

    - `endExclusive: string`

      The end date and time for when the log will stop accepting certificates.

    - `lastUpdate: string`

      Timestamp of the most recent update to the CT log.

    - `operator: string`

      The organization responsible for operating the certificate log.

    - `performance: object { endpoints, responseTime, uptime }`

      Log performance metrics, including averages and per-endpoint details.

      - `endpoints: array of object { endpoint, responseTime, uptime }`

        - `endpoint: "add-chain (new)" or "add-chain (old)" or "add-pre-chain (new)" or 4 more`

          The certificate log endpoint names used in performance metrics.

          - `"add-chain (new)"`

          - `"add-chain (old)"`

          - `"add-pre-chain (new)"`

          - `"add-pre-chain (old)"`

          - `"get-entries"`

          - `"get-roots"`

          - `"get-sth"`

        - `responseTime: number`

        - `uptime: number`

      - `responseTime: number`

      - `uptime: number`

    - `related: array of object { description, endExclusive, slug, 2 more }`

      Logs from the same operator.

      - `description: string`

        A brief description of the certificate log.

      - `endExclusive: string`

        The end date and time for when the log will stop accepting certificates.

      - `slug: string`

        A URL-friendly, kebab-case identifier for the certificate log.

      - `startInclusive: string`

        The start date and time for when the log starts accepting certificates.

      - `state: "USABLE" or "PENDING" or "QUALIFIED" or 3 more`

        The current state of the certificate log. More details about log states can be found here: https://googlechrome.github.io/CertificateTransparency/log_states.html

        - `"USABLE"`

        - `"PENDING"`

        - `"QUALIFIED"`

        - `"READ_ONLY"`

        - `"RETIRED"`

        - `"REJECTED"`

    - `slug: string`

      A URL-friendly, kebab-case identifier for the certificate log.

    - `startInclusive: string`

      The start date and time for when the log starts accepting certificates.

    - `state: "USABLE" or "PENDING" or "QUALIFIED" or 3 more`

      The current state of the certificate log. More details about log states can be found here: https://googlechrome.github.io/CertificateTransparency/log_states.html

      - `"USABLE"`

      - `"PENDING"`

      - `"QUALIFIED"`

      - `"READ_ONLY"`

      - `"RETIRED"`

      - `"REJECTED"`

    - `stateTimestamp: string`

      Timestamp of when the log state was last updated.

    - `submittableCertCount: string`

      Number of certificates that are eligible for inclusion to this log but have not been included yet. Based on certificates signed by trusted root CAs within the log's accepted date range.

    - `submittedCertCount: string`

      Number of certificates already included in this CT log.

    - `url: string`

      The URL for the certificate log.

### Log List Response

- `LogListResponse object { certificateLogs }`

  - `certificateLogs: array of object { api, description, endExclusive, 6 more }`

    - `api: "RFC6962" or "STATIC"`

      The API standard that the certificate log follows.

      - `"RFC6962"`

      - `"STATIC"`

    - `description: string`

      A brief description of the certificate log.

    - `endExclusive: string`

      The end date and time for when the log will stop accepting certificates.

    - `operator: string`

      The organization responsible for operating the certificate log.

    - `slug: string`

      A URL-friendly, kebab-case identifier for the certificate log.

    - `startInclusive: string`

      The start date and time for when the log starts accepting certificates.

    - `state: "USABLE" or "PENDING" or "QUALIFIED" or 3 more`

      The current state of the certificate log. More details about log states can be found here: https://googlechrome.github.io/CertificateTransparency/log_states.html

      - `"USABLE"`

      - `"PENDING"`

      - `"QUALIFIED"`

      - `"READ_ONLY"`

      - `"RETIRED"`

      - `"REJECTED"`

    - `stateTimestamp: string`

      Timestamp of when the log state was last updated.

    - `url: string`

      The URL for the certificate log.
