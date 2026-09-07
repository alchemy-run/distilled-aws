## Get location details

**get** `/radar/entities/locations/{location}`

Retrieves the requested location information. (A confidence level below `5` indicates a low level of confidence in the traffic data - normally this happens because Cloudflare has a small amount of traffic from/to this location).

### Path Parameters

- `location: string`

  Location alpha-2 code.

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

### Returns

- `result: object { location }`

  - `location: object { alpha2, confidenceLevel, continent, 5 more }`

    - `alpha2: string`

    - `confidenceLevel: number`

    - `continent: string`

    - `latitude: string`

      A numeric string.

    - `longitude: string`

      A numeric string.

    - `name: string`

    - `region: string`

    - `subregion: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/entities/locations/$LOCATION \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "location": {
      "alpha2": "AF",
      "confidenceLevel": 5,
      "continent": "AS",
      "latitude": "10",
      "longitude": "10",
      "name": "Afghanistan",
      "region": "Middle East",
      "subregion": "Southern Asia"
    }
  },
  "success": true
}
```
