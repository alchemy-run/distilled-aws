## Get RPKI ROA deployment time series

**get** `/radar/bgp/rpki/roas/timeseries`

Retrieves RPKI ROA (Route Origin Authorization) validation ratios over time. Returns the selected metric as a time series. Supports filtering by ASN or location (country code) — multiple values of the same filter type produce one series per value. If no ASN or location is specified, returns the global aggregate.

### Query Parameters

- `asn: optional array of string`

  Filters results by Autonomous System Number. Specify one or more ASNs. Multiple values generate one series per ASN.

- `dateEnd: optional string`

  End of the date range (inclusive).

- `dateStart: optional string`

  Start of the date range (inclusive).

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `location: optional array of string`

  Filters results by location. Specify a comma-separated list of alpha-2 location codes.

- `metric: optional "validPfxsRatio" or "validPfxsV4Ratio" or "validPfxsV6Ratio" or 3 more`

  Which RPKI ROA validation metric to return. validPfxsRatio = ratio of RPKI-valid prefixes (IPv4+IPv6 combined). validPfxsV4Ratio / validPfxsV6Ratio = same, split by IP version. validIpsRatio = ratio of RPKI-valid address space (IPv4 /24s + IPv6 /48s). validIpsV4Ratio / validIpsV6Ratio = same, split by IP version.

  - `"validPfxsRatio"`

  - `"validPfxsV4Ratio"`

  - `"validPfxsV6Ratio"`

  - `"validIpsRatio"`

  - `"validIpsV4Ratio"`

  - `"validIpsV6Ratio"`

- `name: optional array of string`

  Array of names used to label the series in the response.

### Returns

- `result: object { meta, serie_0 }`

  - `meta: object { dataTime, queryTime }`

    - `dataTime: string`

      Timestamp of the underlying data.

    - `queryTime: string`

      Timestamp when the query was executed.

  - `serie_0: object { timestamps, values }`

    - `timestamps: array of string`

    - `values: array of string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/rpki/roas/timeseries \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "meta": {
      "dataTime": "2019-12-27T18:11:19.117Z",
      "queryTime": "2019-12-27T18:11:19.117Z"
    },
    "serie_0": {
      "timestamps": [
        "2019-12-27T18:11:19.117Z"
      ],
      "values": [
        "10"
      ]
    }
  },
  "success": true
}
```
