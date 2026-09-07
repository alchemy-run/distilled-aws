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
