## Get the number of outages by location

**get** `/radar/annotations/outages/locations`

Retrieves the number of outages by location.

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

### Returns

- `result: object { annotations }`

  - `annotations: array of object { clientCountryAlpha2, clientCountryName, value }`

    - `clientCountryAlpha2: string`

    - `clientCountryName: string`

    - `value: string`

      A numeric string.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/annotations/outages/locations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "annotations": [
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
