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
