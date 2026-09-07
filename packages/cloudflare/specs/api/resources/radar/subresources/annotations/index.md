# Annotations

## Get latest annotations

**get** `/radar/annotations`

Retrieves the latest annotations.

### Query Parameters

- `asn: optional number`

  Filters results by Autonomous System. Specify a single Autonomous System Number (ASN) as integer.

- `dataSource: optional "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more`

  Filters results by data source.

  - `"ALL"`

  - `"AI_BOTS"`

  - `"AI_GATEWAY"`

  - `"BGP"`

  - `"BOTS"`

  - `"CONNECTION_ANOMALY"`

  - `"CT"`

  - `"DNS"`

  - `"DNS_MAGNITUDE"`

  - `"DNS_AS112"`

  - `"DOS"`

  - `"EMAIL_ROUTING"`

  - `"EMAIL_SECURITY"`

  - `"FW"`

  - `"FW_PG"`

  - `"HTTP"`

  - `"HTTP_CONTROL"`

  - `"HTTP_CRAWLER_REFERER"`

  - `"HTTP_ORIGINS"`

  - `"IQI"`

  - `"LEAKED_CREDENTIALS"`

  - `"NET"`

  - `"ROBOTS_TXT"`

  - `"SPEED"`

  - `"WORKERS_AI"`

- `dateEnd: optional string`

  End of the date range (inclusive).

- `dateRange: optional string`

  Filters results by date range.

- `dateStart: optional string`

  Start of the date range (inclusive).

- `eventType: optional "EVENT" or "GENERAL" or "OUTAGE" or 3 more`

  Filters results by event type.

  - `"EVENT"`

  - `"GENERAL"`

  - `"OUTAGE"`

  - `"PARTIAL_PROJECTION"`

  - `"PIPELINE"`

  - `"TRAFFIC_ANOMALY"`

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

### Returns

- `result: object { annotations }`

  - `annotations: array of object { id, asns, asnsDetails, 12 more }`

    - `id: string`

    - `asns: array of number`

    - `asnsDetails: array of object { asn, name, locations }`

      - `asn: string`

      - `name: string`

      - `locations: optional object { code, name }`

        - `code: string`

        - `name: string`

    - `dataSource: string`

    - `eventType: string`

    - `locations: array of string`

    - `locationsDetails: array of object { code, name }`

      - `code: string`

      - `name: string`

    - `origins: array of string`

    - `originsDetails: array of object { name, origin }`

      - `name: string`

      - `origin: string`

    - `outage: object { outageCause, outageType }`

      - `outageCause: string`

      - `outageType: string`

    - `startDate: string`

    - `description: optional string`

    - `endDate: optional string`

    - `linkedUrl: optional string`

    - `scope: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/annotations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "annotations": [
      {
        "id": "550",
        "asns": [
          189
        ],
        "asnsDetails": [
          {
            "asn": "189",
            "name": "LUMEN-LEGACY-L3-PARTITION",
            "locations": {
              "code": "US",
              "name": "United States"
            }
          }
        ],
        "dataSource": "ALL",
        "eventType": "OUTAGE",
        "locations": [
          "US"
        ],
        "locationsDetails": [
          {
            "code": "US",
            "name": "United States"
          }
        ],
        "origins": [
          "amazon-us-east-1"
        ],
        "originsDetails": [
          {
            "name": "us-east-1 Amazon Web Services",
            "origin": "amazon-us-east-1"
          }
        ],
        "outage": {
          "outageCause": "CABLE_CUT",
          "outageType": "NATIONWIDE"
        },
        "startDate": "2022-09-06T10:00:28Z",
        "description": "example",
        "endDate": "2022-09-08T10:00:28Z",
        "linkedUrl": "http://example.com",
        "scope": "Colima, Michoacán, México"
      }
    ]
  },
  "success": true
}
```

## Domain Types

### Annotation List Response

- `AnnotationListResponse object { annotations }`

  - `annotations: array of object { id, asns, asnsDetails, 12 more }`

    - `id: string`

    - `asns: array of number`

    - `asnsDetails: array of object { asn, name, locations }`

      - `asn: string`

      - `name: string`

      - `locations: optional object { code, name }`

        - `code: string`

        - `name: string`

    - `dataSource: string`

    - `eventType: string`

    - `locations: array of string`

    - `locationsDetails: array of object { code, name }`

      - `code: string`

      - `name: string`

    - `origins: array of string`

    - `originsDetails: array of object { name, origin }`

      - `name: string`

      - `origin: string`

    - `outage: object { outageCause, outageType }`

      - `outageCause: string`

      - `outageType: string`

    - `startDate: string`

    - `description: optional string`

    - `endDate: optional string`

    - `linkedUrl: optional string`

    - `scope: optional string`

# Outages

## Get latest Internet outages and anomalies

**get** `/radar/annotations/outages`

Retrieves the latest Internet outages and anomalies.

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

### Returns

- `result: object { annotations }`

  - `annotations: array of object { id, asns, asnsDetails, 12 more }`

    - `id: string`

    - `asns: array of number`

    - `asnsDetails: array of object { asn, name, locations }`

      - `asn: string`

      - `name: string`

      - `locations: optional object { code, name }`

        - `code: string`

        - `name: string`

    - `dataSource: string`

    - `eventType: string`

    - `locations: array of string`

    - `locationsDetails: array of object { code, name }`

      - `code: string`

      - `name: string`

    - `origins: array of string`

    - `originsDetails: array of object { name, origin }`

      - `name: string`

      - `origin: string`

    - `outage: object { outageCause, outageType }`

      - `outageCause: string`

      - `outageType: string`

    - `startDate: string`

    - `description: optional string`

    - `endDate: optional string`

    - `linkedUrl: optional string`

    - `scope: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/annotations/outages \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "annotations": [
      {
        "id": "550",
        "asns": [
          189
        ],
        "asnsDetails": [
          {
            "asn": "189",
            "name": "LUMEN-LEGACY-L3-PARTITION",
            "locations": {
              "code": "US",
              "name": "United States"
            }
          }
        ],
        "dataSource": "ALL",
        "eventType": "OUTAGE",
        "locations": [
          "US"
        ],
        "locationsDetails": [
          {
            "code": "US",
            "name": "United States"
          }
        ],
        "origins": [
          "amazon-us-east-1"
        ],
        "originsDetails": [
          {
            "name": "us-east-1 Amazon Web Services",
            "origin": "amazon-us-east-1"
          }
        ],
        "outage": {
          "outageCause": "CABLE_CUT",
          "outageType": "NATIONWIDE"
        },
        "startDate": "2019-12-27T18:11:19.117Z",
        "description": "example",
        "endDate": "2019-12-27T18:11:19.117Z",
        "linkedUrl": "http://example.com",
        "scope": "Colima, Michoacán, México"
      }
    ]
  },
  "success": true
}
```

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

## Domain Types

### Outage Get Response

- `OutageGetResponse object { annotations }`

  - `annotations: array of object { id, asns, asnsDetails, 12 more }`

    - `id: string`

    - `asns: array of number`

    - `asnsDetails: array of object { asn, name, locations }`

      - `asn: string`

      - `name: string`

      - `locations: optional object { code, name }`

        - `code: string`

        - `name: string`

    - `dataSource: string`

    - `eventType: string`

    - `locations: array of string`

    - `locationsDetails: array of object { code, name }`

      - `code: string`

      - `name: string`

    - `origins: array of string`

    - `originsDetails: array of object { name, origin }`

      - `name: string`

      - `origin: string`

    - `outage: object { outageCause, outageType }`

      - `outageCause: string`

      - `outageType: string`

    - `startDate: string`

    - `description: optional string`

    - `endDate: optional string`

    - `linkedUrl: optional string`

    - `scope: optional string`

### Outage Locations Response

- `OutageLocationsResponse object { annotations }`

  - `annotations: array of object { clientCountryAlpha2, clientCountryName, value }`

    - `clientCountryAlpha2: string`

    - `clientCountryName: string`

    - `value: string`

      A numeric string.
