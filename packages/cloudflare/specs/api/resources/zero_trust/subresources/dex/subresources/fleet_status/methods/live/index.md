## Get live aggregate device details by dimension

**get** `/accounts/{account_id}/dex/fleet-status/live`

Get details for live (up to 60 minutes) devices using WARP.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

### Query Parameters

- `since_minutes: number`

  Number of minutes before current time.

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

  - `deviceStats: optional object { byColo, byMode, byPlatform, 3 more }`

    - `byColo: optional array of LiveStat`

      - `uniqueDevicesTotal: optional number`

        Number of unique devices

      - `value: optional string`

    - `byMode: optional array of LiveStat`

      - `uniqueDevicesTotal: optional number`

        Number of unique devices

      - `value: optional string`

    - `byPlatform: optional array of LiveStat`

      - `uniqueDevicesTotal: optional number`

        Number of unique devices

      - `value: optional string`

    - `byStatus: optional array of LiveStat`

      - `uniqueDevicesTotal: optional number`

        Number of unique devices

      - `value: optional string`

    - `byVersion: optional array of LiveStat`

      - `uniqueDevicesTotal: optional number`

        Number of unique devices

      - `value: optional string`

    - `uniqueDevicesTotal: optional number`

      Number of unique devices

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/fleet-status/live \
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
      "byColo": [
        {
          "uniqueDevicesTotal": 0,
          "value": "value"
        }
      ],
      "byMode": [
        {
          "uniqueDevicesTotal": 0,
          "value": "value"
        }
      ],
      "byPlatform": [
        {
          "uniqueDevicesTotal": 0,
          "value": "value"
        }
      ],
      "byStatus": [
        {
          "uniqueDevicesTotal": 0,
          "value": "value"
        }
      ],
      "byVersion": [
        {
          "uniqueDevicesTotal": 0,
          "value": "value"
        }
      ],
      "uniqueDevicesTotal": 0
    }
  }
}
```
