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
