# Currents

## Get current aggregated analytics

**get** `/zones/{zone_id}/spectrum/analytics/aggregate/current`

Retrieves analytics aggregated from the last minute of usage on Spectrum applications underneath a given zone.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `appID: optional string`

  Comma-delimited list of Spectrum Application Id(s). If provided, the response will be limited to Spectrum Application Id(s) that match.

- `colo_name: optional string`

  Co-location identifier.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional array of object { appID, bytesEgress, bytesIngress, 2 more }`

  - `appID: string`

    Application identifier.

  - `bytesEgress: number`

    Number of bytes sent.

  - `bytesIngress: number`

    Number of bytes received.

  - `connections: number`

    Number of connections.

  - `durationAvg: number`

    Average duration of connections.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/spectrum/analytics/aggregate/current \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": [
    {
      "appID": "023e105f4ecef8ad9ca31a8372d0c353",
      "bytesEgress": 0,
      "bytesIngress": 0,
      "connections": 0,
      "durationAvg": 0
    }
  ]
}
```

## Domain Types

### Current Get Response

- `CurrentGetResponse = array of object { appID, bytesEgress, bytesIngress, 2 more }`

  - `appID: string`

    Application identifier.

  - `bytesEgress: number`

    Number of bytes sent.

  - `bytesIngress: number`

    Number of bytes received.

  - `connections: number`

    Number of connections.

  - `durationAvg: number`

    Average duration of connections.
