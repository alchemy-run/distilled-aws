# Locations

## List locations

**get** `/radar/entities/locations`

Retrieves a list of locations.

### Query Parameters

- `continent: optional "AF" or "AS" or "EU" or 3 more`

  Filters results by continent code.

  - `"AF"`

  - `"AS"`

  - `"EU"`

  - `"NA"`

  - `"OC"`

  - `"SA"`

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `location: optional string`

  Filters results by location. Specify a comma-separated list of alpha-2 location codes.

- `offset: optional number`

  Skips the specified number of objects before fetching the results.

- `region: optional string`

  Filters results by region.

- `subregion: optional string`

  Filters results by subregion.

### Returns

- `result: object { locations }`

  - `locations: array of object { alpha2, continent, latitude, 4 more }`

    - `alpha2: string`

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
curl https://api.cloudflare.com/client/v4/radar/entities/locations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "locations": [
      {
        "alpha2": "AF",
        "continent": "AS",
        "latitude": "10",
        "longitude": "10",
        "name": "Afghanistan",
        "region": "Middle East",
        "subregion": "Southern Asia"
      }
    ]
  },
  "success": true
}
```

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

## Domain Types

### Location List Response

- `LocationListResponse object { locations }`

  - `locations: array of object { alpha2, continent, latitude, 4 more }`

    - `alpha2: string`

    - `continent: string`

    - `latitude: string`

      A numeric string.

    - `longitude: string`

      A numeric string.

    - `name: string`

    - `region: string`

    - `subregion: string`

### Location Get Response

- `LocationGetResponse object { location }`

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
