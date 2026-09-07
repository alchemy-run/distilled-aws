# RPKI

# ASPA

## Get ASPA objects snapshot

**get** `/radar/bgp/rpki/aspa/snapshot`

Retrieves current or historical ASPA (Autonomous System Provider Authorization) objects. ASPA objects define which ASNs are authorized upstream providers for a customer ASN.

### Query Parameters

- `customerAsn: optional number`

  Filter by customer ASN (the ASN publishing the ASPA object).

- `date: optional string`

  Filters results by the specified datetime (ISO 8601).

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `includeAsnInfo: optional boolean`

  Include ASN metadata (name, country) in response.

- `providerAsn: optional number`

  Filter by provider ASN (an authorized upstream provider in ASPA objects).

### Returns

- `result: object { asnInfo, aspaObjects, meta }`

  - `asnInfo: object { "13335" }`

    - `"13335": object { asn, country, name }`

      - `asn: number`

        ASN number.

      - `country: string`

        Alpha-2 country code.

      - `name: string`

        AS name.

  - `aspaObjects: array of object { customerAsn, providers }`

    - `customerAsn: number`

      The customer ASN publishing the ASPA object.

    - `providers: array of number`

  - `meta: object { dataTime, queryTime, totalCount }`

    - `dataTime: string`

      Timestamp of the underlying data.

    - `queryTime: string`

      Timestamp when the query was executed.

    - `totalCount: number`

      Total number of ASPA objects.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/rpki/aspa/snapshot \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "asnInfo": {
      "13335": {
        "asn": 0,
        "country": "country",
        "name": "name"
      }
    },
    "aspaObjects": [
      {
        "customerAsn": 0,
        "providers": [
          0
        ]
      }
    ],
    "meta": {
      "dataTime": "2019-12-27T18:11:19.117Z",
      "queryTime": "2019-12-27T18:11:19.117Z",
      "totalCount": 0
    }
  },
  "success": true
}
```

## Get ASPA changes over time

**get** `/radar/bgp/rpki/aspa/changes`

Retrieves ASPA (Autonomous System Provider Authorization) changes over time. Returns daily aggregated changes including additions, removals, and modifications of ASPA objects.

### Query Parameters

- `asn: optional number`

  Filter changes involving this ASN (as customer or provider).

- `dateEnd: optional string`

  End of the date range (inclusive).

- `dateStart: optional string`

  Start of the date range (inclusive).

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `includeAsnInfo: optional boolean`

  Include ASN metadata (name, country) in response.

### Returns

- `result: object { asnInfo, changes, meta }`

  - `asnInfo: object { "13335" }`

    - `"13335": object { asn, country, name }`

      - `asn: number`

        ASN number.

      - `country: string`

        Alpha-2 country code.

      - `name: string`

        AS name.

  - `changes: array of object { customersAdded, customersRemoved, date, 4 more }`

    - `customersAdded: number`

      Number of new ASPA objects created.

    - `customersRemoved: number`

      Number of ASPA objects deleted.

    - `date: string`

      Date of the changes in ISO 8601 format.

    - `entries: array of object { customerAsn, providers, type }`

      - `customerAsn: number`

        The customer ASN affected.

      - `providers: array of number`

      - `type: "CustomerAdded" or "CustomerRemoved" or "ProvidersAdded" or "ProvidersRemoved"`

        - `"CustomerAdded"`

        - `"CustomerRemoved"`

        - `"ProvidersAdded"`

        - `"ProvidersRemoved"`

    - `providersAdded: number`

      Number of providers added to existing objects.

    - `providersRemoved: number`

      Number of providers removed from existing objects.

    - `totalCount: number`

      Running total of active ASPA objects after this day.

  - `meta: object { dataTime, queryTime }`

    - `dataTime: string`

      Timestamp of the underlying data.

    - `queryTime: string`

      Timestamp when the query was executed.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/rpki/aspa/changes \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "asnInfo": {
      "13335": {
        "asn": 0,
        "country": "country",
        "name": "name"
      }
    },
    "changes": [
      {
        "customersAdded": 0,
        "customersRemoved": 0,
        "date": "2019-12-27T18:11:19.117Z",
        "entries": [
          {
            "customerAsn": 0,
            "providers": [
              0
            ],
            "type": "CustomerAdded"
          }
        ],
        "providersAdded": 0,
        "providersRemoved": 0,
        "totalCount": 0
      }
    ],
    "meta": {
      "dataTime": "2019-12-27T18:11:19.117Z",
      "queryTime": "2019-12-27T18:11:19.117Z"
    }
  },
  "success": true
}
```

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

## Domain Types

### ASPA Snapshot Response

- `ASPASnapshotResponse object { asnInfo, aspaObjects, meta }`

  - `asnInfo: object { "13335" }`

    - `"13335": object { asn, country, name }`

      - `asn: number`

        ASN number.

      - `country: string`

        Alpha-2 country code.

      - `name: string`

        AS name.

  - `aspaObjects: array of object { customerAsn, providers }`

    - `customerAsn: number`

      The customer ASN publishing the ASPA object.

    - `providers: array of number`

  - `meta: object { dataTime, queryTime, totalCount }`

    - `dataTime: string`

      Timestamp of the underlying data.

    - `queryTime: string`

      Timestamp when the query was executed.

    - `totalCount: number`

      Total number of ASPA objects.

### ASPA Changes Response

- `ASPAChangesResponse object { asnInfo, changes, meta }`

  - `asnInfo: object { "13335" }`

    - `"13335": object { asn, country, name }`

      - `asn: number`

        ASN number.

      - `country: string`

        Alpha-2 country code.

      - `name: string`

        AS name.

  - `changes: array of object { customersAdded, customersRemoved, date, 4 more }`

    - `customersAdded: number`

      Number of new ASPA objects created.

    - `customersRemoved: number`

      Number of ASPA objects deleted.

    - `date: string`

      Date of the changes in ISO 8601 format.

    - `entries: array of object { customerAsn, providers, type }`

      - `customerAsn: number`

        The customer ASN affected.

      - `providers: array of number`

      - `type: "CustomerAdded" or "CustomerRemoved" or "ProvidersAdded" or "ProvidersRemoved"`

        - `"CustomerAdded"`

        - `"CustomerRemoved"`

        - `"ProvidersAdded"`

        - `"ProvidersRemoved"`

    - `providersAdded: number`

      Number of providers added to existing objects.

    - `providersRemoved: number`

      Number of providers removed from existing objects.

    - `totalCount: number`

      Running total of active ASPA objects after this day.

  - `meta: object { dataTime, queryTime }`

    - `dataTime: string`

      Timestamp of the underlying data.

    - `queryTime: string`

      Timestamp when the query was executed.

### ASPA Timeseries Response

- `ASPATimeseriesResponse object { meta, serie_0 }`

  - `meta: object { dataTime, queryTime }`

    - `dataTime: string`

      Timestamp of the underlying data.

    - `queryTime: string`

      Timestamp when the query was executed.

  - `serie_0: object { timestamps, values }`

    - `timestamps: array of string`

    - `values: array of string`

# Roas

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

## Domain Types

### Roa Timeseries Response

- `RoaTimeseriesResponse object { meta, serie_0 }`

  - `meta: object { dataTime, queryTime }`

    - `dataTime: string`

      Timestamp of the underlying data.

    - `queryTime: string`

      Timestamp when the query was executed.

  - `serie_0: object { timestamps, values }`

    - `timestamps: array of string`

    - `values: array of string`
