## Get DNS summary by dimension

**get** `/radar/dns/summary/{dimension}`

Retrieves the distribution of DNS queries by the specified dimension.

### Path Parameters

- `dimension: "AS" or "CACHE_HIT" or "DNSSEC" or 11 more`

  Specifies the attribute by which to group the results.

  - `"AS"`

  - `"CACHE_HIT"`

  - `"DNSSEC"`

  - `"DNSSEC_AWARE"`

  - `"DNSSEC_E2E"`

  - `"IP_VERSION"`

  - `"LOCATION"`

  - `"MATCHING_ANSWER"`

  - `"PROTOCOL"`

  - `"QUERY_TYPE"`

  - `"RESPONSE_CODE"`

  - `"RESPONSE_TTL"`

  - `"TLD"`

  - `"TLD_DNS_MAGNITUDE"`

### Query Parameters

- `asn: optional array of string`

  Filters results by Autonomous System. Specify one or more Autonomous System Numbers (ASNs) as a comma-separated list. Prefix with `-` to exclude ASNs from results. For example, `-174, 3356` excludes results from AS174, but includes results from AS3356.

- `cacheHit: optional array of boolean`

  Filters results based on cache status.

- `continent: optional array of string`

  Filters results by continent. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude continents from results. For example, `-EU,NA` excludes results from EU, but includes results from NA.

- `dateEnd: optional array of string`

  End of the date range (inclusive).

- `dateRange: optional array of string`

  Filters results by date range. For example, use `7d` and `7dcontrol` to compare this week with the previous week. Use this parameter or set specific start and end dates (`dateStart` and `dateEnd` parameters).

- `dateStart: optional array of string`

  Start of the date range.

- `dnssec: optional array of "INVALID" or "INSECURE" or "SECURE" or "OTHER"`

  Filters results based on DNSSEC (DNS Security Extensions) support.

  - `"INVALID"`

  - `"INSECURE"`

  - `"SECURE"`

  - `"OTHER"`

- `dnssecAware: optional array of "SUPPORTED" or "NOT_SUPPORTED"`

  Filters results based on DNSSEC (DNS Security Extensions) client awareness.

  - `"SUPPORTED"`

  - `"NOT_SUPPORTED"`

- `dnssecE2e: optional array of boolean`

  Filters results based on DNSSEC-validated answers by end-to-end security status.

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `ipVersion: optional array of "IPv4" or "IPv6"`

  Filters results by IP version (Ipv4 vs. IPv6).

  - `"IPv4"`

  - `"IPv6"`

- `limitPerGroup: optional number`

  Limits the number of objects per group to the top items within the specified time range. When item count exceeds the limit, extra items appear grouped under an "other" category.

- `location: optional array of string`

  Filters results by location. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude locations from results. For example, `-US,PT` excludes results from the US, but includes results from PT.

- `matchingAnswer: optional array of boolean`

  Filters results based on whether the queries have a matching answer.

- `name: optional array of string`

  Array of names used to label the series in the response.

- `nodata: optional array of boolean`

  Specifies whether the response includes empty DNS responses (NODATA).

- `protocol: optional array of "UDP" or "TCP" or "HTTPS" or "TLS"`

  Filters results by DNS transport protocol.

  - `"UDP"`

  - `"TCP"`

  - `"HTTPS"`

  - `"TLS"`

- `queryType: optional array of "A" or "AAAA" or "A6" or 85 more`

  Filters results by DNS query type.

  - `"A"`

  - `"AAAA"`

  - `"A6"`

  - `"AFSDB"`

  - `"ANY"`

  - `"APL"`

  - `"ATMA"`

  - `"AXFR"`

  - `"CAA"`

  - `"CDNSKEY"`

  - `"CDS"`

  - `"CERT"`

  - `"CNAME"`

  - `"CSYNC"`

  - `"DHCID"`

  - `"DLV"`

  - `"DNAME"`

  - `"DNSKEY"`

  - `"DOA"`

  - `"DS"`

  - `"EID"`

  - `"EUI48"`

  - `"EUI64"`

  - `"GPOS"`

  - `"GID"`

  - `"HINFO"`

  - `"HIP"`

  - `"HTTPS"`

  - `"IPSECKEY"`

  - `"ISDN"`

  - `"IXFR"`

  - `"KEY"`

  - `"KX"`

  - `"L32"`

  - `"L64"`

  - `"LOC"`

  - `"LP"`

  - `"MAILA"`

  - `"MAILB"`

  - `"MB"`

  - `"MD"`

  - `"MF"`

  - `"MG"`

  - `"MINFO"`

  - `"MR"`

  - `"MX"`

  - `"NAPTR"`

  - `"NB"`

  - `"NBSTAT"`

  - `"NID"`

  - `"NIMLOC"`

  - `"NINFO"`

  - `"NS"`

  - `"NSAP"`

  - `"NSEC"`

  - `"NSEC3"`

  - `"NSEC3PARAM"`

  - `"NULL"`

  - `"NXT"`

  - `"OPENPGPKEY"`

  - `"OPT"`

  - `"PTR"`

  - `"PX"`

  - `"RKEY"`

  - `"RP"`

  - `"RRSIG"`

  - `"RT"`

  - `"SIG"`

  - `"SINK"`

  - `"SMIMEA"`

  - `"SOA"`

  - `"SPF"`

  - `"SRV"`

  - `"SSHFP"`

  - `"SVCB"`

  - `"TA"`

  - `"TALINK"`

  - `"TKEY"`

  - `"TLSA"`

  - `"TSIG"`

  - `"TXT"`

  - `"UINFO"`

  - `"UID"`

  - `"UNSPEC"`

  - `"URI"`

  - `"WKS"`

  - `"X25"`

  - `"ZONEMD"`

- `responseCode: optional array of "NOERROR" or "FORMERR" or "SERVFAIL" or 16 more`

  Filters results by DNS response code.

  - `"NOERROR"`

  - `"FORMERR"`

  - `"SERVFAIL"`

  - `"NXDOMAIN"`

  - `"NOTIMP"`

  - `"REFUSED"`

  - `"YXDOMAIN"`

  - `"YXRRSET"`

  - `"NXRRSET"`

  - `"NOTAUTH"`

  - `"NOTZONE"`

  - `"BADSIG"`

  - `"BADKEY"`

  - `"BADTIME"`

  - `"BADMODE"`

  - `"BADNAME"`

  - `"BADALG"`

  - `"BADTRUNC"`

  - `"BADCOOKIE"`

- `responseTtl: optional array of "LTE_1M" or "GT_1M_LTE_5M" or "GT_5M_LTE_15M" or 4 more`

  Filters results by DNS response TTL.

  - `"LTE_1M"`

  - `"GT_1M_LTE_5M"`

  - `"GT_5M_LTE_15M"`

  - `"GT_15M_LTE_1H"`

  - `"GT_1H_LTE_1D"`

  - `"GT_1D_LTE_1W"`

  - `"GT_1W"`

- `tld: optional array of string`

  Filters results by top-level domain.

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

  - `summary_0: map[string]`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/dns/summary/$DIMENSION \
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
      "IPv4": "50.168733",
      "IPv6": "25.084366"
    }
  },
  "success": true
}
```
