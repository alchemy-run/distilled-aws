## Get top ASes by BGP updates

**get** `/radar/bgp/top/ases`

Retrieves the top autonomous systems by BGP updates (announcements only).

### Query Parameters

- `asn: optional array of string`

  Filters results by Autonomous System. Specify one or more Autonomous System Numbers (ASNs) as a comma-separated list. Prefix with `-` to exclude ASNs from results. For example, `-174, 3356` excludes results from AS174, but includes results from AS3356.

- `dateEnd: optional array of string`

  End of the date range (inclusive).

- `dateRange: optional array of string`

  Filters results by date range. For example, use `7d` and `7dcontrol` to compare this week with the previous week. Use this parameter or set specific start and end dates (`dateStart` and `dateEnd` parameters).

- `dateStart: optional array of string`

  Start of the date range.

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `name: optional array of string`

  Array of names used to label the series in the response.

- `prefix: optional array of string`

  Filters results by BGP network prefix.

- `updateType: optional array of "ANNOUNCEMENT" or "WITHDRAWAL"`

  Filters results by BGP update type.

  - `"ANNOUNCEMENT"`

  - `"WITHDRAWAL"`

### Returns

- `result: object { meta, top_0 }`

  - `meta: object { dateRange }`

    - `dateRange: array of object { endTime, startTime }`

      - `endTime: string`

        Adjusted end of date range.

      - `startTime: string`

        Adjusted start of date range.

  - `top_0: array of object { asn, ASName, value }`

    - `asn: number`

    - `ASName: string`

    - `value: string`

      Percentage of updates by this AS out of the total updates by all autonomous systems.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bgp/top/ases \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "meta": {
      "dateRange": [
        {
          "endTime": "2022-09-17T10:22:57.555Z",
          "startTime": "2022-09-16T10:22:57.555Z"
        }
      ]
    },
    "top_0": [
      {
        "asn": 714,
        "ASName": "Apple-Engineering",
        "value": "0.73996"
      }
    ]
  },
  "success": true
}
```
