# Summary

## Get DNS queries by cache status summary

**get** `/radar/dns/summary/cache_hit`

Retrieves the distribution of DNS queries by cache status.

### Query Parameters

- `asn: optional array of string`

  Filters results by Autonomous System. Specify one or more Autonomous System Numbers (ASNs) as a comma-separated list. Prefix with `-` to exclude ASNs from results. For example, `-174, 3356` excludes results from AS174, but includes results from AS3356.

- `continent: optional array of string`

  Filters results by continent. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude continents from results. For example, `-EU,NA` excludes results from EU, but includes results from NA.

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

- `location: optional array of string`

  Filters results by location. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude locations from results. For example, `-US,PT` excludes results from the US, but includes results from PT.

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

  - `summary_0: object { NEGATIVE, POSITIVE }`

    - `NEGATIVE: string`

      A numeric string.

    - `POSITIVE: string`

      A numeric string.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/dns/summary/cache_hit \
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
      "NEGATIVE": "10",
      "POSITIVE": "10"
    }
  },
  "success": true
}
```

## Get DNS queries by DNSSEC support summary

**get** `/radar/dns/summary/dnssec`

Retrieves the distribution of DNS responses by DNSSEC (DNS Security Extensions) support.

### Query Parameters

- `asn: optional array of string`

  Filters results by Autonomous System. Specify one or more Autonomous System Numbers (ASNs) as a comma-separated list. Prefix with `-` to exclude ASNs from results. For example, `-174, 3356` excludes results from AS174, but includes results from AS3356.

- `continent: optional array of string`

  Filters results by continent. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude continents from results. For example, `-EU,NA` excludes results from EU, but includes results from NA.

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

- `location: optional array of string`

  Filters results by location. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude locations from results. For example, `-US,PT` excludes results from the US, but includes results from PT.

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

  - `summary_0: object { INSECURE, INVALID, OTHER, SECURE }`

    - `INSECURE: string`

      A numeric string.

    - `INVALID: string`

      A numeric string.

    - `OTHER: string`

      A numeric string.

    - `SECURE: string`

      A numeric string.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/dns/summary/dnssec \
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
      "INSECURE": "10",
      "INVALID": "10",
      "OTHER": "10",
      "SECURE": "10"
    }
  },
  "success": true
}
```

## Get DNS queries by DNSSEC awareness summary

**get** `/radar/dns/summary/dnssec_aware`

Retrieves the distribution of DNS queries by DNSSEC (DNS Security Extensions) client awareness.

### Query Parameters

- `asn: optional array of string`

  Filters results by Autonomous System. Specify one or more Autonomous System Numbers (ASNs) as a comma-separated list. Prefix with `-` to exclude ASNs from results. For example, `-174, 3356` excludes results from AS174, but includes results from AS3356.

- `continent: optional array of string`

  Filters results by continent. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude continents from results. For example, `-EU,NA` excludes results from EU, but includes results from NA.

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

- `location: optional array of string`

  Filters results by location. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude locations from results. For example, `-US,PT` excludes results from the US, but includes results from PT.

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

  - `summary_0: object { NOT_SUPPORTED, SUPPORTED }`

    - `NOT_SUPPORTED: string`

      A numeric string.

    - `SUPPORTED: string`

      A numeric string.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/dns/summary/dnssec_aware \
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
      "NOT_SUPPORTED": "10",
      "SUPPORTED": "10"
    }
  },
  "success": true
}
```

## Get DNS queries by DNSSEC end-to-end summary

**get** `/radar/dns/summary/dnssec_e2e`

Retrieves the distribution of DNSSEC-validated answers by end-to-end security status.

### Query Parameters

- `asn: optional array of string`

  Filters results by Autonomous System. Specify one or more Autonomous System Numbers (ASNs) as a comma-separated list. Prefix with `-` to exclude ASNs from results. For example, `-174, 3356` excludes results from AS174, but includes results from AS3356.

- `continent: optional array of string`

  Filters results by continent. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude continents from results. For example, `-EU,NA` excludes results from EU, but includes results from NA.

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

- `location: optional array of string`

  Filters results by location. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude locations from results. For example, `-US,PT` excludes results from the US, but includes results from PT.

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

  - `summary_0: object { NEGATIVE, POSITIVE }`

    - `NEGATIVE: string`

      A numeric string.

    - `POSITIVE: string`

      A numeric string.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/dns/summary/dnssec_e2e \
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
      "NEGATIVE": "10",
      "POSITIVE": "10"
    }
  },
  "success": true
}
```

## Get DNS queries by IP version summary

**get** `/radar/dns/summary/ip_version`

Retrieves the distribution of DNS queries by IP version.

### Query Parameters

- `asn: optional array of string`

  Filters results by Autonomous System. Specify one or more Autonomous System Numbers (ASNs) as a comma-separated list. Prefix with `-` to exclude ASNs from results. For example, `-174, 3356` excludes results from AS174, but includes results from AS3356.

- `continent: optional array of string`

  Filters results by continent. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude continents from results. For example, `-EU,NA` excludes results from EU, but includes results from NA.

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

- `location: optional array of string`

  Filters results by location. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude locations from results. For example, `-US,PT` excludes results from the US, but includes results from PT.

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

  - `summary_0: object { IPv4, IPv6 }`

    - `IPv4: string`

      A numeric string.

    - `IPv6: string`

      A numeric string.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/dns/summary/ip_version \
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
      "IPv4": "10",
      "IPv6": "10"
    }
  },
  "success": true
}
```

## Get DNS queries by matching answer summary

**get** `/radar/dns/summary/matching_answer`

Retrieves the distribution of DNS queries by matching answers.

### Query Parameters

- `asn: optional array of string`

  Filters results by Autonomous System. Specify one or more Autonomous System Numbers (ASNs) as a comma-separated list. Prefix with `-` to exclude ASNs from results. For example, `-174, 3356` excludes results from AS174, but includes results from AS3356.

- `continent: optional array of string`

  Filters results by continent. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude continents from results. For example, `-EU,NA` excludes results from EU, but includes results from NA.

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

- `location: optional array of string`

  Filters results by location. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude locations from results. For example, `-US,PT` excludes results from the US, but includes results from PT.

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

  - `summary_0: object { NEGATIVE, POSITIVE }`

    - `NEGATIVE: string`

      A numeric string.

    - `POSITIVE: string`

      A numeric string.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/dns/summary/matching_answer \
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
      "NEGATIVE": "10",
      "POSITIVE": "10"
    }
  },
  "success": true
}
```

## Get DNS queries by protocol summary

**get** `/radar/dns/summary/protocol`

Retrieves the distribution of DNS queries by DNS transport protocol.

### Query Parameters

- `asn: optional array of string`

  Filters results by Autonomous System. Specify one or more Autonomous System Numbers (ASNs) as a comma-separated list. Prefix with `-` to exclude ASNs from results. For example, `-174, 3356` excludes results from AS174, but includes results from AS3356.

- `continent: optional array of string`

  Filters results by continent. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude continents from results. For example, `-EU,NA` excludes results from EU, but includes results from NA.

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

- `location: optional array of string`

  Filters results by location. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude locations from results. For example, `-US,PT` excludes results from the US, but includes results from PT.

- `name: optional array of string`

  Array of names used to label the series in the response.

- `nodata: optional array of boolean`

  Specifies whether the response includes empty DNS responses (NODATA).

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

  - `summary_0: object { HTTPS, TCP, TLS, UDP }`

    - `HTTPS: string`

      A numeric string.

    - `TCP: string`

      A numeric string.

    - `TLS: string`

      A numeric string.

    - `UDP: string`

      A numeric string.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/dns/summary/protocol \
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
      "HTTPS": "10",
      "TCP": "10",
      "TLS": "10",
      "UDP": "10"
    }
  },
  "success": true
}
```

## Get DNS queries by type summary

**get** `/radar/dns/summary/query_type`

Retrieves the distribution of DNS queries by type.

### Query Parameters

- `asn: optional array of string`

  Filters results by Autonomous System. Specify one or more Autonomous System Numbers (ASNs) as a comma-separated list. Prefix with `-` to exclude ASNs from results. For example, `-174, 3356` excludes results from AS174, but includes results from AS3356.

- `continent: optional array of string`

  Filters results by continent. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude continents from results. For example, `-EU,NA` excludes results from EU, but includes results from NA.

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

- `limitPerGroup: optional number`

  Limits the number of objects per group to the top items within the specified time range. When item count exceeds the limit, extra items appear grouped under an "other" category.

- `location: optional array of string`

  Filters results by location. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude locations from results. For example, `-US,PT` excludes results from the US, but includes results from PT.

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
curl https://api.cloudflare.com/client/v4/radar/dns/summary/query_type \
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
      "A": "20",
      "AAAA": "20",
      "HTTPS": "20",
      "NS": "20",
      "PTR": "20"
    }
  },
  "success": true
}
```

## Get DNS queries by response code summary

**get** `/radar/dns/summary/response_code`

Retrieves the distribution of DNS queries by response code.

### Query Parameters

- `asn: optional array of string`

  Filters results by Autonomous System. Specify one or more Autonomous System Numbers (ASNs) as a comma-separated list. Prefix with `-` to exclude ASNs from results. For example, `-174, 3356` excludes results from AS174, but includes results from AS3356.

- `continent: optional array of string`

  Filters results by continent. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude continents from results. For example, `-EU,NA` excludes results from EU, but includes results from NA.

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

- `limitPerGroup: optional number`

  Limits the number of objects per group to the top items within the specified time range. When item count exceeds the limit, extra items appear grouped under an "other" category.

- `location: optional array of string`

  Filters results by location. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude locations from results. For example, `-US,PT` excludes results from the US, but includes results from PT.

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
curl https://api.cloudflare.com/client/v4/radar/dns/summary/response_code \
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
      "NOERROR": "70",
      "NOTIMP": "5",
      "NXDOMAIN": "10",
      "REFUSED": "5",
      "SERVFAIL": "5"
    }
  },
  "success": true
}
```

## Get DNS queries by response TTL summary

**get** `/radar/dns/summary/response_ttl`

Retrieves the distribution of DNS queries by minimum response TTL.

### Query Parameters

- `asn: optional array of string`

  Filters results by Autonomous System. Specify one or more Autonomous System Numbers (ASNs) as a comma-separated list. Prefix with `-` to exclude ASNs from results. For example, `-174, 3356` excludes results from AS174, but includes results from AS3356.

- `continent: optional array of string`

  Filters results by continent. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude continents from results. For example, `-EU,NA` excludes results from EU, but includes results from NA.

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

- `location: optional array of string`

  Filters results by location. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude locations from results. For example, `-US,PT` excludes results from the US, but includes results from PT.

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

  - `summary_0: object { gt_15m_lte_1h, gt_1d_lte_1w, gt_1h_lte_1d, 4 more }`

    - `gt_15m_lte_1h: string`

      A numeric string.

    - `gt_1d_lte_1w: string`

      A numeric string.

    - `gt_1h_lte_1d: string`

      A numeric string.

    - `gt_1m_lte_5m: string`

      A numeric string.

    - `gt_1w: string`

      A numeric string.

    - `gt_5m_lte_15m: string`

      A numeric string.

    - `lte_1m: string`

      A numeric string.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/dns/summary/response_ttl \
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
      "gt_15m_lte_1h": "10",
      "gt_1d_lte_1w": "10",
      "gt_1h_lte_1d": "10",
      "gt_1m_lte_5m": "10",
      "gt_1w": "10",
      "gt_5m_lte_15m": "10",
      "lte_1m": "10"
    }
  },
  "success": true
}
```

## Domain Types

### Summary Cache Hit Response

- `SummaryCacheHitResponse object { meta, summary_0 }`

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

  - `summary_0: object { NEGATIVE, POSITIVE }`

    - `NEGATIVE: string`

      A numeric string.

    - `POSITIVE: string`

      A numeric string.

### Summary DNSSEC Response

- `SummaryDNSSECResponse object { meta, summary_0 }`

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

  - `summary_0: object { INSECURE, INVALID, OTHER, SECURE }`

    - `INSECURE: string`

      A numeric string.

    - `INVALID: string`

      A numeric string.

    - `OTHER: string`

      A numeric string.

    - `SECURE: string`

      A numeric string.

### Summary DNSSEC Aware Response

- `SummaryDNSSECAwareResponse object { meta, summary_0 }`

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

  - `summary_0: object { NOT_SUPPORTED, SUPPORTED }`

    - `NOT_SUPPORTED: string`

      A numeric string.

    - `SUPPORTED: string`

      A numeric string.

### Summary DNSSEC E2E Response

- `SummaryDNSSECE2EResponse object { meta, summary_0 }`

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

  - `summary_0: object { NEGATIVE, POSITIVE }`

    - `NEGATIVE: string`

      A numeric string.

    - `POSITIVE: string`

      A numeric string.

### Summary IP Version Response

- `SummaryIPVersionResponse object { meta, summary_0 }`

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

  - `summary_0: object { IPv4, IPv6 }`

    - `IPv4: string`

      A numeric string.

    - `IPv6: string`

      A numeric string.

### Summary Matching Answer Response

- `SummaryMatchingAnswerResponse object { meta, summary_0 }`

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

  - `summary_0: object { NEGATIVE, POSITIVE }`

    - `NEGATIVE: string`

      A numeric string.

    - `POSITIVE: string`

      A numeric string.

### Summary Protocol Response

- `SummaryProtocolResponse object { meta, summary_0 }`

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

  - `summary_0: object { HTTPS, TCP, TLS, UDP }`

    - `HTTPS: string`

      A numeric string.

    - `TCP: string`

      A numeric string.

    - `TLS: string`

      A numeric string.

    - `UDP: string`

      A numeric string.

### Summary Query Type Response

- `SummaryQueryTypeResponse object { meta, summary_0 }`

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

### Summary Response Code Response

- `SummaryResponseCodeResponse object { meta, summary_0 }`

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

### Summary Response TTL Response

- `SummaryResponseTTLResponse object { meta, summary_0 }`

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

  - `summary_0: object { gt_15m_lte_1h, gt_1d_lte_1w, gt_1h_lte_1d, 4 more }`

    - `gt_15m_lte_1h: string`

      A numeric string.

    - `gt_1d_lte_1w: string`

      A numeric string.

    - `gt_1h_lte_1d: string`

      A numeric string.

    - `gt_1m_lte_5m: string`

      A numeric string.

    - `gt_1w: string`

      A numeric string.

    - `gt_5m_lte_15m: string`

      A numeric string.

    - `lte_1m: string`

      A numeric string.
