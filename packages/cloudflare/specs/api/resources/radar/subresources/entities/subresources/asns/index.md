# ASNs

## List autonomous systems

**get** `/radar/entities/asns`

Retrieves a list of autonomous systems.

### Query Parameters

- `asn: optional string`

  Filters results by Autonomous System. Specify one or more Autonomous System Numbers (ASNs) as a comma-separated list.

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `location: optional string`

  Filters results by location. Specify an alpha-2 location code.

- `offset: optional number`

  Skips the specified number of objects before fetching the results.

- `orderBy: optional "ASN" or "POPULATION"`

  Specifies the metric to order the ASNs by.

  - `"ASN"`

  - `"POPULATION"`

### Returns

- `result: object { asns }`

  - `asns: array of object { asn, country, countryName, 5 more }`

    - `asn: number`

    - `country: string`

    - `countryName: string`

    - `estimatedUsers: object { estimatedUsers }`

      - `estimatedUsers: optional number`

        Total estimated users.

    - `name: string`

    - `aka: optional string`

    - `orgName: optional string`

    - `website: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/entities/asns \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "asns": [
      {
        "asn": 714,
        "country": "GB",
        "countryName": "United Kingdom",
        "estimatedUsers": {
          "estimatedUsers": 86099
        },
        "name": "Apple Inc.",
        "aka": "aka",
        "orgName": "orgName",
        "website": "https://www.apple.com/support/systemstatus/"
      }
    ]
  },
  "success": true
}
```

## Get AS details by ASN

**get** `/radar/entities/asns/{asn}`

Retrieves the requested autonomous system information. (A confidence level below `5` indicates a low level of confidence in the traffic data - normally this happens because Cloudflare has a small amount of traffic from/to this AS). Population estimates come from APNIC (refer to https://labs.apnic.net/?p=526).

### Path Parameters

- `asn: number`

  Single Autonomous System Number (ASN) as integer.

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

### Returns

- `result: object { asn }`

  - `asn: object { asn, confidenceLevel, country, 8 more }`

    - `asn: number`

    - `confidenceLevel: number`

    - `country: string`

    - `countryName: string`

    - `estimatedUsers: object { locations, estimatedUsers }`

      - `locations: array of object { locationAlpha2, locationName, estimatedUsers }`

        - `locationAlpha2: string`

        - `locationName: string`

        - `estimatedUsers: optional number`

          Estimated users per location.

      - `estimatedUsers: optional number`

        Total estimated users.

    - `name: string`

    - `orgName: string`

    - `related: array of object { asn, name, aka, estimatedUsers }`

      - `asn: number`

      - `name: string`

      - `aka: optional string`

      - `estimatedUsers: optional number`

        Total estimated users.

    - `source: string`

      Regional Internet Registry.

    - `website: string`

    - `aka: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/entities/asns/$ASN \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "asn": {
      "asn": 714,
      "confidenceLevel": 5,
      "country": "GB",
      "countryName": "United Kingdom",
      "estimatedUsers": {
        "locations": [
          {
            "locationAlpha2": "US",
            "locationName": "United States",
            "estimatedUsers": 16710
          }
        ],
        "estimatedUsers": 86099
      },
      "name": "Apple Inc.",
      "orgName": "orgName",
      "related": [
        {
          "asn": 174,
          "name": "Cogent-174",
          "aka": "aka",
          "estimatedUsers": 65345
        }
      ],
      "source": "RIPE",
      "website": "https://www.apple.com/support/systemstatus/",
      "aka": "aka"
    }
  },
  "success": true
}
```

## Get AS-level relationships by ASN

**get** `/radar/entities/asns/{asn}/rel`

Retrieves AS-level relationship for given networks.

### Path Parameters

- `asn: number`

  Retrieves all ASNs with provider-customer or peering relationships with the given ASN.

### Query Parameters

- `asn2: optional number`

  Retrieves the AS relationship of ASN2 with respect to the given ASN.

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

### Returns

- `result: object { meta, rels }`

  - `meta: object { data_time, query_time, total_peers }`

    - `data_time: string`

    - `query_time: string`

    - `total_peers: number`

  - `rels: array of object { asn1, asn1_country, asn1_name, 4 more }`

    - `asn1: number`

    - `asn1_country: string`

    - `asn1_name: string`

    - `asn2: number`

    - `asn2_country: string`

    - `asn2_name: string`

    - `rel: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/entities/asns/$ASN/rel \
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
    "rels": [
      {
        "asn1": 0,
        "asn1_country": "asn1_country",
        "asn1_name": "asn1_name",
        "asn2": 0,
        "asn2_country": "asn2_country",
        "asn2_name": "asn2_name",
        "rel": "rel"
      }
    ]
  },
  "success": true
}
```

## Get IRR AS-SETs that an AS is a member of

**get** `/radar/entities/asns/{asn}/as_set`

Retrieves Internet Routing Registry AS-SETs that an AS is a member of.

### Path Parameters

- `asn: number`

  Retrieves all AS-SETs that the given AS is a member of.

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

### Returns

- `result: object { as_sets, paths }`

  - `as_sets: array of object { as_members_count, as_set_members_count, as_set_upstreams_count, 6 more }`

    - `as_members_count: number`

      The number of AS members in the AS-SET

    - `as_set_members_count: number`

      The number of AS-SET members in the AS-SET

    - `as_set_upstreams_count: number`

      The number of recursive upstream AS-SETs

    - `asn_cone_size: number`

      The number of unique ASNs in the AS-SETs recursive downstream

    - `irr_sources: array of string`

      The IRR sources of the AS-SET

    - `name: string`

      The name of the AS-SET

    - `hierarchical_asn: optional number`

      The AS number following hierarchical AS-SET name

    - `inferred_asn: optional number`

      The inferred AS number of the AS-SET

    - `peeringdb_asn: optional number`

      The AS number matching PeeringDB record

  - `paths: array of array of string`

    Paths from the AS-SET that include the given AS to its upstreams recursively

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/entities/asns/$ASN/as_set \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "as_sets": [
      {
        "as_members_count": 0,
        "as_set_members_count": 0,
        "as_set_upstreams_count": 0,
        "asn_cone_size": 0,
        "irr_sources": [
          "string"
        ],
        "name": "name",
        "hierarchical_asn": 0,
        "inferred_asn": 0,
        "peeringdb_asn": 0
      }
    ],
    "paths": [
      [
        "string"
      ]
    ]
  },
  "success": true
}
```

## Get AS details by IP address

**get** `/radar/entities/asns/ip`

Retrieves the requested autonomous system information based on IP address. Population estimates come from APNIC (refer to https://labs.apnic.net/?p=526).

### Query Parameters

- `ip: string`

  IP address.

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

### Returns

- `result: object { asn }`

  - `asn: object { asn, country, countryName, 7 more }`

    - `asn: number`

    - `country: string`

    - `countryName: string`

    - `estimatedUsers: object { locations, estimatedUsers }`

      - `locations: array of object { locationAlpha2, locationName, estimatedUsers }`

        - `locationAlpha2: string`

        - `locationName: string`

        - `estimatedUsers: optional number`

          Estimated users per location.

      - `estimatedUsers: optional number`

        Total estimated users.

    - `name: string`

    - `orgName: string`

    - `related: array of object { asn, name, aka, estimatedUsers }`

      - `asn: number`

      - `name: string`

      - `aka: optional string`

      - `estimatedUsers: optional number`

        Total estimated users.

    - `source: string`

      Regional Internet Registry.

    - `website: string`

    - `aka: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/entities/asns/ip \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "asn": {
      "asn": 714,
      "country": "GB",
      "countryName": "United Kingdom",
      "estimatedUsers": {
        "locations": [
          {
            "locationAlpha2": "US",
            "locationName": "United States",
            "estimatedUsers": 16710
          }
        ],
        "estimatedUsers": 86099
      },
      "name": "Apple Inc.",
      "orgName": "orgName",
      "related": [
        {
          "asn": 0,
          "name": "name",
          "aka": "aka",
          "estimatedUsers": 65345
        }
      ],
      "source": "RIPE",
      "website": "https://www.apple.com/support/systemstatus/",
      "aka": "aka"
    }
  },
  "success": true
}
```

## Get AS rankings by botnet threat feed activity

**get** `/radar/entities/asns/botnet_threat_feed`

Retrieves a ranked list of Autonomous Systems based on their presence in the Cloudflare Botnet Threat Feed. Rankings can be sorted by offense count or number of bad IPs. Optionally compare to a previous date to see rank changes.

### Query Parameters

- `asn: optional array of string`

  Filters results by Autonomous System. Specify one or more Autonomous System Numbers (ASNs) as a comma-separated list. Prefix with `-` to exclude ASNs from results. For example, `-174, 3356` excludes results from AS174, but includes results from AS3356.

- `compareDateRange: optional string`

  Relative date range for rank change comparison (e.g., "1d", "7d", "30d").

- `date: optional string`

  The date to retrieve (YYYY-MM-DD format). If not specified, returns the most recent available data. Note: This is the date the report was generated. The report is generated from information collected from the previous day (e.g., the 2026-02-23 entry contains data from 2026-02-22).

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `location: optional string`

  Filters results by location. Specify an alpha-2 location code.

- `metric: optional "OFFENSE_COUNT" or "NUMBER_OF_OFFENDING_IPS"`

  Metric to rank ASNs by.

  - `"OFFENSE_COUNT"`

  - `"NUMBER_OF_OFFENDING_IPS"`

- `offset: optional number`

  Skips the specified number of objects before fetching the results.

- `sortOrder: optional "ASC" or "DESC"`

  Sort order.

  - `"ASC"`

  - `"DESC"`

### Returns

- `result: object { ases, meta }`

  - `ases: array of object { asn, country, name, 2 more }`

    - `asn: number`

    - `country: string`

    - `name: string`

    - `rank: number`

    - `rankChange: optional number`

  - `meta: object { date, total, compareDate }`

    - `date: string`

    - `total: number`

    - `compareDate: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/entities/asns/botnet_threat_feed \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "ases": [
      {
        "asn": 4134,
        "country": "CN",
        "name": "CHINANET-BACKBONE",
        "rank": 1,
        "rankChange": -2
      }
    ],
    "meta": {
      "date": "2026-02-04",
      "total": 50,
      "compareDate": "2026-01-28"
    }
  },
  "success": true
}
```

## Domain Types

### ASN List Response

- `ASNListResponse object { asns }`

  - `asns: array of object { asn, country, countryName, 5 more }`

    - `asn: number`

    - `country: string`

    - `countryName: string`

    - `estimatedUsers: object { estimatedUsers }`

      - `estimatedUsers: optional number`

        Total estimated users.

    - `name: string`

    - `aka: optional string`

    - `orgName: optional string`

    - `website: optional string`

### ASN Get Response

- `ASNGetResponse object { asn }`

  - `asn: object { asn, confidenceLevel, country, 8 more }`

    - `asn: number`

    - `confidenceLevel: number`

    - `country: string`

    - `countryName: string`

    - `estimatedUsers: object { locations, estimatedUsers }`

      - `locations: array of object { locationAlpha2, locationName, estimatedUsers }`

        - `locationAlpha2: string`

        - `locationName: string`

        - `estimatedUsers: optional number`

          Estimated users per location.

      - `estimatedUsers: optional number`

        Total estimated users.

    - `name: string`

    - `orgName: string`

    - `related: array of object { asn, name, aka, estimatedUsers }`

      - `asn: number`

      - `name: string`

      - `aka: optional string`

      - `estimatedUsers: optional number`

        Total estimated users.

    - `source: string`

      Regional Internet Registry.

    - `website: string`

    - `aka: optional string`

### ASN Rel Response

- `ASNRelResponse object { meta, rels }`

  - `meta: object { data_time, query_time, total_peers }`

    - `data_time: string`

    - `query_time: string`

    - `total_peers: number`

  - `rels: array of object { asn1, asn1_country, asn1_name, 4 more }`

    - `asn1: number`

    - `asn1_country: string`

    - `asn1_name: string`

    - `asn2: number`

    - `asn2_country: string`

    - `asn2_name: string`

    - `rel: string`

### ASN As Set Response

- `ASNAsSetResponse object { as_sets, paths }`

  - `as_sets: array of object { as_members_count, as_set_members_count, as_set_upstreams_count, 6 more }`

    - `as_members_count: number`

      The number of AS members in the AS-SET

    - `as_set_members_count: number`

      The number of AS-SET members in the AS-SET

    - `as_set_upstreams_count: number`

      The number of recursive upstream AS-SETs

    - `asn_cone_size: number`

      The number of unique ASNs in the AS-SETs recursive downstream

    - `irr_sources: array of string`

      The IRR sources of the AS-SET

    - `name: string`

      The name of the AS-SET

    - `hierarchical_asn: optional number`

      The AS number following hierarchical AS-SET name

    - `inferred_asn: optional number`

      The inferred AS number of the AS-SET

    - `peeringdb_asn: optional number`

      The AS number matching PeeringDB record

  - `paths: array of array of string`

    Paths from the AS-SET that include the given AS to its upstreams recursively

### ASN IP Response

- `ASNIPResponse object { asn }`

  - `asn: object { asn, country, countryName, 7 more }`

    - `asn: number`

    - `country: string`

    - `countryName: string`

    - `estimatedUsers: object { locations, estimatedUsers }`

      - `locations: array of object { locationAlpha2, locationName, estimatedUsers }`

        - `locationAlpha2: string`

        - `locationName: string`

        - `estimatedUsers: optional number`

          Estimated users per location.

      - `estimatedUsers: optional number`

        Total estimated users.

    - `name: string`

    - `orgName: string`

    - `related: array of object { asn, name, aka, estimatedUsers }`

      - `asn: number`

      - `name: string`

      - `aka: optional string`

      - `estimatedUsers: optional number`

        Total estimated users.

    - `source: string`

      Regional Internet Registry.

    - `website: string`

    - `aka: optional string`

### ASN Botnet Threat Feed Response

- `ASNBotnetThreatFeedResponse object { ases, meta }`

  - `ases: array of object { asn, country, name, 2 more }`

    - `asn: number`

    - `country: string`

    - `name: string`

    - `rank: number`

    - `rankChange: optional number`

  - `meta: object { date, total, compareDate }`

    - `date: string`

    - `total: number`

    - `compareDate: optional string`
