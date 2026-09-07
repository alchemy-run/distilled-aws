## List autonomous systems

**get** `/radar/entities/asns`

Retrieves a list of autonomous systems.

### Query Parameters

- `asn: optional string`

  Filters results by Autonomous System. Specify one or more Autonomous System Numbers (ASNs) as a comma-separated list.

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `location: optional string`

  Filters results by location. Specify an alpha-2 location code.

- `offset: optional number`

  Skips the specified number of objects before fetching the results.

- `orderBy: optional "ASN" or "POPULATION"`

  Specifies the metric to order the ASNs by.

  - `"ASN"`

  - `"POPULATION"`

### Returns

- `result: object { asns }`

  - `asns: array of object { asn, country, countryName, 5 more }`

    - `asn: number`

    - `country: string`

    - `countryName: string`

    - `estimatedUsers: object { estimatedUsers }`

      - `estimatedUsers: optional number`

        Total estimated users.

    - `name: string`

    - `aka: optional string`

    - `orgName: optional string`

    - `website: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/entities/asns \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "asns": [
      {
        "asn": 714,
        "country": "GB",
        "countryName": "United Kingdom",
        "estimatedUsers": {
          "estimatedUsers": 86099
        },
        "name": "Apple Inc.",
        "aka": "aka",
        "orgName": "orgName",
        "website": "https://www.apple.com/support/systemstatus/"
      }
    ]
  },
  "success": true
}
```
