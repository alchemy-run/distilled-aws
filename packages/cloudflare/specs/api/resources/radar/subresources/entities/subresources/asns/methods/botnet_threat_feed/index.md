## Get AS rankings by botnet threat feed activity

**get** `/radar/entities/asns/botnet_threat_feed`

Retrieves a ranked list of Autonomous Systems based on their presence in the Cloudflare Botnet Threat Feed. Rankings can be sorted by offense count or number of bad IPs. Optionally compare to a previous date to see rank changes.

### Query Parameters

- `asn: optional array of string`

  Filters results by Autonomous System. Specify one or more Autonomous System Numbers (ASNs) as a comma-separated list. Prefix with `-` to exclude ASNs from results. For example, `-174, 3356` excludes results from AS174, but includes results from AS3356.

- `compareDateRange: optional string`

  Relative date range for rank change comparison (e.g., "1d", "7d", "30d").

- `date: optional string`

  The date to retrieve (YYYY-MM-DD format). If not specified, returns the most recent available data. Note: This is the date the report was generated. The report is generated from information collected from the previous day (e.g., the 2026-02-23 entry contains data from 2026-02-22).

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `location: optional string`

  Filters results by location. Specify an alpha-2 location code.

- `metric: optional "OFFENSE_COUNT" or "NUMBER_OF_OFFENDING_IPS"`

  Metric to rank ASNs by.

  - `"OFFENSE_COUNT"`

  - `"NUMBER_OF_OFFENDING_IPS"`

- `offset: optional number`

  Skips the specified number of objects before fetching the results.

- `sortOrder: optional "ASC" or "DESC"`

  Sort order.

  - `"ASC"`

  - `"DESC"`

### Returns

- `result: object { ases, meta }`

  - `ases: array of object { asn, country, name, 2 more }`

    - `asn: number`

    - `country: string`

    - `name: string`

    - `rank: number`

    - `rankChange: optional number`

  - `meta: object { date, total, compareDate }`

    - `date: string`

    - `total: number`

    - `compareDate: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/entities/asns/botnet_threat_feed \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "ases": [
      {
        "asn": 4134,
        "country": "CN",
        "name": "CHINANET-BACKBONE",
        "rank": 1,
        "rankChange": -2
      }
    ],
    "meta": {
      "date": "2026-02-04",
      "total": 50,
      "compareDate": "2026-01-28"
    }
  },
  "success": true
}
```
