# Top

## Get top ASes by announced IP space

**get** `/radar/bgp/ips/top/ases`

Returns the top-N autonomous systems by announced IP space at the nearest 8-hour RIB boundary at or before the requested date. The snapped boundary is returned as `anchor_ts`.

### Query Parameters

- `country: optional string`

  Optional ISO 3166-1 alpha-2 country filter. Omit for global top-N.

- `date: optional string`

  Filters results by the specified datetime (ISO 8601).

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `metric: optional "v4_24s" or "v6_48s"`

  Ranking metric: IPv4 /24 count or IPv6 /48 count.

  - `"v4_24s"`

  - `"v6_48s"`

### Returns

- `result: object { anchorTs, asns, country, metric }`

  - `anchorTs: string`

  - `asns: array of object { asn, v4_24s, v6_48s }`

    - `asn: number`

    - `v4_24s: number`

    - `v6_48s: number`

  - `country: string`

  - `metric: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/ips/top/ases \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "anchorTs": "2026-04-18T16:00:00.000Z",
    "asns": [
      {
        "asn": 749,
        "v4_24s": 875649,
        "v6_48s": 0
      }
    ],
    "country": "US",
    "metric": "v4_24s"
  },
  "success": true
}
```

## Domain Types

### Top Ases Response

- `TopAsesResponse object { anchorTs, asns, country, metric }`

  - `anchorTs: string`

  - `asns: array of object { asn, v4_24s, v6_48s }`

    - `asn: number`

    - `v4_24s: number`

    - `v6_48s: number`

  - `country: string`

  - `metric: string`
