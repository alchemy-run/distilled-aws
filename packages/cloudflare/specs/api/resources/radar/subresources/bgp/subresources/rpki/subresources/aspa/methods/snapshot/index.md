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
