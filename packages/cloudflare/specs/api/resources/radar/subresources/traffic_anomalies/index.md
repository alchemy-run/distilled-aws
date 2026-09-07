# Traffic Anomalies

## Get latest Internet traffic anomalies

**get** `/radar/traffic_anomalies`

Retrieves the latest Internet traffic anomalies, which are signals that might indicate an outage. These alerts are automatically detected by Radar and manually verified by our team.

### Query Parameters

- `asn: optional number`

  Filters results by Autonomous System. Specify a single Autonomous System Number (ASN) as integer.

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

- `location: optional string`

  Filters results by location. Specify an alpha-2 location code.

- `offset: optional number`

  Skips the specified number of objects before fetching the results.

- `origin: optional string`

  Filters results by origin.

- `status: optional "VERIFIED" or "UNVERIFIED"`

  - `"VERIFIED"`

  - `"UNVERIFIED"`

- `type: optional array of "LOCATION" or "AS" or "ORIGIN"`

  Filters results by entity type (LOCATION, AS, or ORIGIN).

  - `"LOCATION"`

  - `"AS"`

  - `"ORIGIN"`

### Returns

- `result: object { trafficAnomalies }`

  - `trafficAnomalies: array of object { startDate, status, type, 6 more }`

    - `startDate: string`

    - `status: string`

    - `type: string`

    - `uuid: string`

    - `asnDetails: optional object { asn, name, locations }`

      - `asn: string`

      - `name: string`

      - `locations: optional object { code, name }`

        - `code: string`

        - `name: string`

    - `endDate: optional string`

    - `locationDetails: optional object { code, name }`

      - `code: string`

      - `name: string`

    - `originDetails: optional object { name, origin }`

      - `name: string`

      - `origin: string`

    - `visibleInDataSources: optional array of string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/traffic_anomalies \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "trafficAnomalies": [
      {
        "startDate": "2023-08-02T23:15:00Z",
        "status": "UNVERIFIED",
        "type": "LOCATION",
        "uuid": "55a57f33-8bc0-4984-b4df-fdaff72df39d",
        "asnDetails": {
          "asn": "189",
          "name": "LUMEN-LEGACY-L3-PARTITION",
          "locations": {
            "code": "US",
            "name": "United States"
          }
        },
        "endDate": "2019-12-27T18:11:19.117Z",
        "locationDetails": {
          "code": "US",
          "name": "United States"
        },
        "originDetails": {
          "name": "us-east-1 Amazon Web Services",
          "origin": "amazon-us-east-1"
        },
        "visibleInDataSources": [
          "string"
        ]
      }
    ]
  },
  "success": true
}
```

## Domain Types

### Traffic Anomaly Get Response

- `TrafficAnomalyGetResponse object { trafficAnomalies }`

  - `trafficAnomalies: array of object { startDate, status, type, 6 more }`

    - `startDate: string`

    - `status: string`

    - `type: string`

    - `uuid: string`

    - `asnDetails: optional object { asn, name, locations }`

      - `asn: string`

      - `name: string`

      - `locations: optional object { code, name }`

        - `code: string`

        - `name: string`

    - `endDate: optional string`

    - `locationDetails: optional object { code, name }`

      - `code: string`

      - `name: string`

    - `originDetails: optional object { name, origin }`

      - `name: string`

      - `origin: string`

    - `visibleInDataSources: optional array of string`

# Locations

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

## Domain Types

### Location Get Response

- `LocationGetResponse object { trafficAnomalies }`

  - `trafficAnomalies: array of object { clientCountryAlpha2, clientCountryName, value }`

    - `clientCountryAlpha2: string`

    - `clientCountryName: string`

    - `value: string`

      A numeric string.
