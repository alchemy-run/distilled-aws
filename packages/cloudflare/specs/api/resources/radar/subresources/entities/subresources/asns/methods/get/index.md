## Get AS details by ASN

**get** `/radar/entities/asns/{asn}`

Retrieves the requested autonomous system information. (A confidence level below `5` indicates a low level of confidence in the traffic data - normally this happens because Cloudflare has a small amount of traffic from/to this AS). Population estimates come from APNIC (refer to https://labs.apnic.net/?p=526).

### Path Parameters

- `asn: number`

  Single Autonomous System Number (ASN) as integer.

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

### Returns

- `result: object { asn }`

  - `asn: object { asn, confidenceLevel, country, 8 more }`

    - `asn: number`

    - `confidenceLevel: number`

    - `country: string`

    - `countryName: string`

    - `estimatedUsers: object { locations, estimatedUsers }`

      - `locations: array of object { locationAlpha2, locationName, estimatedUsers }`

        - `locationAlpha2: string`

        - `locationName: string`

        - `estimatedUsers: optional number`

          Estimated users per location.

      - `estimatedUsers: optional number`

        Total estimated users.

    - `name: string`

    - `orgName: string`

    - `related: array of object { asn, name, aka, estimatedUsers }`

      - `asn: number`

      - `name: string`

      - `aka: optional string`

      - `estimatedUsers: optional number`

        Total estimated users.

    - `source: string`

      Regional Internet Registry.

    - `website: string`

    - `aka: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/entities/asns/$ASN \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "asn": {
      "asn": 714,
      "confidenceLevel": 5,
      "country": "GB",
      "countryName": "United Kingdom",
      "estimatedUsers": {
        "locations": [
          {
            "locationAlpha2": "US",
            "locationName": "United States",
            "estimatedUsers": 16710
          }
        ],
        "estimatedUsers": 86099
      },
      "name": "Apple Inc.",
      "orgName": "orgName",
      "related": [
        {
          "asn": 174,
          "name": "Cogent-174",
          "aka": "aka",
          "estimatedUsers": 65345
        }
      ],
      "source": "RIPE",
      "website": "https://www.apple.com/support/systemstatus/",
      "aka": "aka"
    }
  },
  "success": true
}
```
