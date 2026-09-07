## Get top ASes by prefix count

**get** `/radar/bgp/top/ases/prefixes`

Retrieves the full list of autonomous systems on the global routing table ordered by announced prefixes count. The data comes from public BGP MRT data archives and updates every 2 hours.

### Query Parameters

- `country: optional string`

  Alpha-2 country code.

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Maximum number of ASes to return.

### Returns

- `result: object { asns, meta }`

  - `asns: array of object { asn, country, name, pfxs_count }`

    - `asn: number`

    - `country: string`

    - `name: string`

    - `pfxs_count: number`

  - `meta: object { data_time, query_time, total_peers }`

    - `data_time: string`

    - `query_time: string`

    - `total_peers: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/top/ases/prefixes \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "asns": [
      {
        "asn": 0,
        "country": "country",
        "name": "name",
        "pfxs_count": 0
      }
    ],
    "meta": {
      "data_time": "data_time",
      "query_time": "query_time",
      "total_peers": 0
    }
  },
  "success": true
}
```
