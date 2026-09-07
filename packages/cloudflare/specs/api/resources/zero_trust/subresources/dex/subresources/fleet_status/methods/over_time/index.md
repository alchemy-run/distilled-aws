## Get over time aggregate details for devices by dimension

**get** `/accounts/{account_id}/dex/fleet-status/over-time`

Get aggregate details for devices using WARP, up to 7 days.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

### Query Parameters

- `from: string`

  Start of the time range to query. Timestamp can be provided in ISO 8601 datetime format or milliseconds since epoch.

- `to: string`

  End of the time range to query. Timestamp can be provided in ISO 8601 datetime format or milliseconds since epoch.

- `colo: optional string`

  Cloudflare colo airport code.

- `device_id: optional string`

  Device-specific ID, given as UUID.

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

- `result: optional object { deviceStats }`

  - `deviceStats: optional object { byMode, byStatus, uniqueDevicesTotal }`

    - `byMode: optional array of object { timestamp, uniqueDevicesTotal, value }`

      - `timestamp: optional string`

      - `uniqueDevicesTotal: optional number`

        Number of unique devices

      - `value: optional string`

    - `byStatus: optional array of object { timestamp, uniqueDevicesTotal, value }`

      - `timestamp: optional string`

      - `uniqueDevicesTotal: optional number`

        Number of unique devices

      - `value: optional string`

    - `uniqueDevicesTotal: optional number`

      Number of unique devices

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/fleet-status/over-time \
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
  "result": {
    "deviceStats": {
      "byMode": [
        {
          "timestamp": "2023-10-11 00:00:00+00",
          "uniqueDevicesTotal": 0,
          "value": "value"
        }
      ],
      "byStatus": [
        {
          "timestamp": "2023-10-11 00:00:00+00",
          "uniqueDevicesTotal": 0,
          "value": "value"
        }
      ],
      "uniqueDevicesTotal": 0
    }
  }
}
```
