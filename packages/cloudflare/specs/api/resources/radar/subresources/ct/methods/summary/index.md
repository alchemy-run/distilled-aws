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
