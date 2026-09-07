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
