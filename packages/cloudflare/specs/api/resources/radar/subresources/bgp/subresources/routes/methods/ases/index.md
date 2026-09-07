## List ASes from global routing tables

**get** `/radar/bgp/routes/ases`

Retrieves all ASes in the current global routing tables with routing statistics.

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `location: optional string`

  Filters results by location. Specify an alpha-2 location code.

- `sortBy: optional "cone" or "pfxs" or "ipv4" or 4 more`

  Sorts results by the specified field.

  - `"cone"`

  - `"pfxs"`

  - `"ipv4"`

  - `"ipv6"`

  - `"rpki_valid"`

  - `"rpki_invalid"`

  - `"rpki_unknown"`

- `sortOrder: optional "ASC" or "DESC"`

  Sort order.

  - `"ASC"`

  - `"DESC"`

### Returns

- `result: object { asns, meta }`

  - `asns: array of object { asn, coneSize, country, 7 more }`

    - `asn: number`

    - `coneSize: number`

      AS's customer cone size.

    - `country: string`

      Alpha-2 code for the AS's registration country.

    - `ipv4Count: number`

      Number of IPv4 addresses originated by the AS.

    - `ipv6Count: string`

      Number of IPv6 addresses originated by the AS.

    - `name: string`

      Name of the AS.

    - `pfxsCount: number`

      Number of total IP prefixes originated by the AS.

    - `rpkiInvalid: number`

      Number of RPKI invalid prefixes originated by the AS.

    - `rpkiUnknown: number`

      Number of RPKI unknown prefixes originated by the AS.

    - `rpkiValid: number`

      Number of RPKI valid prefixes originated by the AS.

  - `meta: object { dataTime, queryTime, totalPeers }`

    - `dataTime: string`

      The timestamp of when the data is generated.

    - `queryTime: string`

      The timestamp of the query.

    - `totalPeers: number`

      Total number of route collector peers used to generate this data.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/routes/ases \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "asns": [
      {
        "asn": 0,
        "coneSize": 0,
        "country": "US",
        "ipv4Count": 0,
        "ipv6Count": "1.21e24",
        "name": "name",
        "pfxsCount": 0,
        "rpkiInvalid": 0,
        "rpkiUnknown": 0,
        "rpkiValid": 0
      }
    ],
    "meta": {
      "dataTime": "2024-06-03T14:00:00",
      "queryTime": "2024-06-03T14:00:00",
      "totalPeers": 0
    }
  },
  "success": true
}
```
