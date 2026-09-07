## Get ASPA count time series

**get** `/radar/bgp/rpki/aspa/timeseries`

Retrieves ASPA (Autonomous System Provider Authorization) object count over time. Supports filtering by RIR or location (country code) to generate multiple named series. If no RIR or location filter is specified, returns total count.

### Query Parameters

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

- `name: optional array of string`

  Array of names used to label the series in the response.

- `rir: optional array of "RIPE_NCC" or "ARIN" or "APNIC" or 2 more`

  Filter by Regional Internet Registry (RIR). Multiple RIRs generate multiple series.

  - `"RIPE_NCC"`

  - `"ARIN"`

  - `"APNIC"`

  - `"LACNIC"`

  - `"AFRINIC"`

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
curl https://api.cloudflare.com/client/v4/radar/bgp/rpki/aspa/timeseries \
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
