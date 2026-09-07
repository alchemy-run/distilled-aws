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
