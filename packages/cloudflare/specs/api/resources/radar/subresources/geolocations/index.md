# Geolocations

## List Geolocations

**get** `/radar/geolocations`

Retrieves a list of geolocations. Geolocation names can be localized by sending an `Accept-Language` HTTP header with a BCP 47 language tag (e.g., `Accept-Language: pt-PT`). The full quality-value chain is supported (e.g., `pt-PT,pt;q=0.9,en;q=0.8`).

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `geoId: optional string`

  Filters results by geolocation. Specify a comma-separated list of GeoNames IDs.

- `limit: optional number`

  Limits the number of objects returned in the response.

- `location: optional string`

  Filters results by location. Specify a comma-separated list of alpha-2 location codes.

- `offset: optional number`

  Skips the specified number of objects before fetching the results.

### Returns

- `result: object { geolocations }`

  - `geolocations: array of object { geoId, latitude, longitude, 5 more }`

    - `geoId: string`

    - `latitude: string`

      A numeric string.

    - `longitude: string`

      A numeric string.

    - `name: string`

    - `parent: object { geoId, latitude, longitude, 5 more }`

      - `geoId: string`

      - `latitude: string`

        A numeric string.

      - `longitude: string`

        A numeric string.

      - `name: string`

      - `parent: object { geoId, latitude, longitude, 4 more }`

        - `geoId: string`

        - `latitude: string`

          A numeric string.

        - `longitude: string`

          A numeric string.

        - `name: string`

        - `type: "CONTINENT" or "COUNTRY" or "ADM1"`

          The type of the geolocation.

          - `"CONTINENT"`

          - `"COUNTRY"`

          - `"ADM1"`

        - `code: optional string`

        - `locale: optional string`

          BCP 47 locale code used for the geolocation name translation

      - `type: "CONTINENT" or "COUNTRY" or "ADM1"`

        The type of the geolocation.

        - `"CONTINENT"`

        - `"COUNTRY"`

        - `"ADM1"`

      - `code: optional string`

      - `locale: optional string`

        BCP 47 locale code used for the geolocation name translation

    - `type: "CONTINENT" or "COUNTRY" or "ADM1"`

      The type of the geolocation.

      - `"CONTINENT"`

      - `"COUNTRY"`

      - `"ADM1"`

    - `code: optional string`

    - `locale: optional string`

      BCP 47 locale code used for the geolocation name translation

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/geolocations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "geolocations": [
      {
        "geoId": "2267056",
        "latitude": "10",
        "longitude": "10",
        "name": "Lisbon",
        "parent": {
          "geoId": "2267056",
          "latitude": "10",
          "longitude": "10",
          "name": "Lisbon",
          "parent": {
            "geoId": "2267056",
            "latitude": "10",
            "longitude": "10",
            "name": "Lisbon",
            "type": "CONTINENT",
            "code": "PT-11",
            "locale": "pt-PT"
          },
          "type": "CONTINENT",
          "code": "PT-11",
          "locale": "pt-PT"
        },
        "type": "CONTINENT",
        "code": "PT-11",
        "locale": "pt-PT"
      }
    ]
  },
  "success": true
}
```

## Get Geolocation details

**get** `/radar/geolocations/{geo_id}`

Retrieves the requested Geolocation information. Geolocation names can be localized by sending an `Accept-Language` HTTP header with a BCP 47 language tag (e.g., `Accept-Language: pt-PT`). The full quality-value chain is supported (e.g., `pt-PT,pt;q=0.9,en;q=0.8`).

### Path Parameters

- `geo_id: string`

  Geolocation ID. Refer to [GeoNames](https://download.geonames.org/export/dump/readme.txt)

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

### Returns

- `result: object { geolocation }`

  - `geolocation: object { geoId, latitude, longitude, 5 more }`

    - `geoId: string`

    - `latitude: string`

      A numeric string.

    - `longitude: string`

      A numeric string.

    - `name: string`

    - `parent: object { geoId, latitude, longitude, 5 more }`

      - `geoId: string`

      - `latitude: string`

        A numeric string.

      - `longitude: string`

        A numeric string.

      - `name: string`

      - `parent: object { geoId, latitude, longitude, 4 more }`

        - `geoId: string`

        - `latitude: string`

          A numeric string.

        - `longitude: string`

          A numeric string.

        - `name: string`

        - `type: "CONTINENT" or "COUNTRY" or "ADM1"`

          The type of the geolocation.

          - `"CONTINENT"`

          - `"COUNTRY"`

          - `"ADM1"`

        - `code: optional string`

        - `locale: optional string`

          BCP 47 locale code used for the geolocation name translation

      - `type: "CONTINENT" or "COUNTRY" or "ADM1"`

        The type of the geolocation.

        - `"CONTINENT"`

        - `"COUNTRY"`

        - `"ADM1"`

      - `code: optional string`

      - `locale: optional string`

        BCP 47 locale code used for the geolocation name translation

    - `type: "CONTINENT" or "COUNTRY" or "ADM1"`

      The type of the geolocation.

      - `"CONTINENT"`

      - `"COUNTRY"`

      - `"ADM1"`

    - `code: optional string`

    - `locale: optional string`

      BCP 47 locale code used for the geolocation name translation

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/geolocations/$GEO_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "geolocation": {
      "geoId": "2267056",
      "latitude": "10",
      "longitude": "10",
      "name": "Lisbon",
      "parent": {
        "geoId": "2267056",
        "latitude": "10",
        "longitude": "10",
        "name": "Lisbon",
        "parent": {
          "geoId": "2267056",
          "latitude": "10",
          "longitude": "10",
          "name": "Lisbon",
          "type": "CONTINENT",
          "code": "PT-11",
          "locale": "pt-PT"
        },
        "type": "CONTINENT",
        "code": "PT-11",
        "locale": "pt-PT"
      },
      "type": "CONTINENT",
      "code": "PT-11",
      "locale": "pt-PT"
    }
  },
  "success": true
}
```

## Domain Types

### Geolocation List Response

- `GeolocationListResponse object { geolocations }`

  - `geolocations: array of object { geoId, latitude, longitude, 5 more }`

    - `geoId: string`

    - `latitude: string`

      A numeric string.

    - `longitude: string`

      A numeric string.

    - `name: string`

    - `parent: object { geoId, latitude, longitude, 5 more }`

      - `geoId: string`

      - `latitude: string`

        A numeric string.

      - `longitude: string`

        A numeric string.

      - `name: string`

      - `parent: object { geoId, latitude, longitude, 4 more }`

        - `geoId: string`

        - `latitude: string`

          A numeric string.

        - `longitude: string`

          A numeric string.

        - `name: string`

        - `type: "CONTINENT" or "COUNTRY" or "ADM1"`

          The type of the geolocation.

          - `"CONTINENT"`

          - `"COUNTRY"`

          - `"ADM1"`

        - `code: optional string`

        - `locale: optional string`

          BCP 47 locale code used for the geolocation name translation

      - `type: "CONTINENT" or "COUNTRY" or "ADM1"`

        The type of the geolocation.

        - `"CONTINENT"`

        - `"COUNTRY"`

        - `"ADM1"`

      - `code: optional string`

      - `locale: optional string`

        BCP 47 locale code used for the geolocation name translation

    - `type: "CONTINENT" or "COUNTRY" or "ADM1"`

      The type of the geolocation.

      - `"CONTINENT"`

      - `"COUNTRY"`

      - `"ADM1"`

    - `code: optional string`

    - `locale: optional string`

      BCP 47 locale code used for the geolocation name translation

### Geolocation Get Response

- `GeolocationGetResponse object { geolocation }`

  - `geolocation: object { geoId, latitude, longitude, 5 more }`

    - `geoId: string`

    - `latitude: string`

      A numeric string.

    - `longitude: string`

      A numeric string.

    - `name: string`

    - `parent: object { geoId, latitude, longitude, 5 more }`

      - `geoId: string`

      - `latitude: string`

        A numeric string.

      - `longitude: string`

        A numeric string.

      - `name: string`

      - `parent: object { geoId, latitude, longitude, 4 more }`

        - `geoId: string`

        - `latitude: string`

          A numeric string.

        - `longitude: string`

          A numeric string.

        - `name: string`

        - `type: "CONTINENT" or "COUNTRY" or "ADM1"`

          The type of the geolocation.

          - `"CONTINENT"`

          - `"COUNTRY"`

          - `"ADM1"`

        - `code: optional string`

        - `locale: optional string`

          BCP 47 locale code used for the geolocation name translation

      - `type: "CONTINENT" or "COUNTRY" or "ADM1"`

        The type of the geolocation.

        - `"CONTINENT"`

        - `"COUNTRY"`

        - `"ADM1"`

      - `code: optional string`

      - `locale: optional string`

        BCP 47 locale code used for the geolocation name translation

    - `type: "CONTINENT" or "COUNTRY" or "ADM1"`

      The type of the geolocation.

      - `"CONTINENT"`

      - `"COUNTRY"`

      - `"ADM1"`

    - `code: optional string`

    - `locale: optional string`

      BCP 47 locale code used for the geolocation name translation
