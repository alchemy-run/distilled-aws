## Get top locations by total traffic anomalies

**get** `/radar/traffic_anomalies/locations`

Retrieves the sum of Internet traffic anomalies, grouped by location. These anomalies are signals that might indicate an outage, automatically detected by Radar and manually verified by our team.

### Query Parameters

- `dateEnd: optional string`

  End of the date range (inclusive).

- `dateRange: optional string`

  Filters results by date range.

- `dateStart: optional string`

  Start of the date range (inclusive).

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `status: optional "VERIFIED" or "UNVERIFIED"`

  - `"VERIFIED"`

  - `"UNVERIFIED"`

### Returns

- `result: object { trafficAnomalies }`

  - `trafficAnomalies: array of object { clientCountryAlpha2, clientCountryName, value }`

    - `clientCountryAlpha2: string`

    - `clientCountryName: string`

    - `value: string`

      A numeric string.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/traffic_anomalies/locations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "trafficAnomalies": [
      {
        "clientCountryAlpha2": "PT",
        "clientCountryName": "Portugal",
        "value": "10"
      }
    ]
  },
  "success": true
}
```
