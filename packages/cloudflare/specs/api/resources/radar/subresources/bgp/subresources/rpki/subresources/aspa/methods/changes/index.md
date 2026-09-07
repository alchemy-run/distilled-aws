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
