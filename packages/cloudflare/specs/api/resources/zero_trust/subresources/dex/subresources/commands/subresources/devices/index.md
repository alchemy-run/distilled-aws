# Devices

## List devices eligible for remote captures

**get** `/accounts/{account_id}/dex/commands/devices`

List devices with WARP client support for remote captures which have been connected in the last 1 hour.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

### Query Parameters

- `page: number`

  Page number of paginated results.

- `per_page: number`

  Number of results per page.

- `search: optional string`

  Filter devices by name or email.

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

- `result: optional object { devices }`

  - `devices: optional array of object { deviceId, deviceName, eligible, 7 more }`

    List of eligible devices

    - `deviceId: optional string`

      Device identifier (UUID v4)

    - `deviceName: optional string`

      Device identifier (human readable)

    - `eligible: optional boolean`

      Whether the device is eligible for remote captures

    - `ineligibleReason: optional string`

      If the device is not eligible, the reason why.

    - `personEmail: optional string`

      User contact email address

    - `platform: optional string`

      Operating system.

    - `registrationId: optional string`

      Device registration identifier (UUID v4). On multi-user devices, this uniquely identifies a user's registration on the device.

    - `status: optional string`

      Network status.

    - `timestamp: optional string`

    - `version: optional string`

      WARP client version.

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/commands/devices \
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
    "devices": [
      {
        "deviceId": "deviceId",
        "deviceName": "deviceName",
        "eligible": true,
        "ineligibleReason": "ineligibleReason",
        "personEmail": "personEmail",
        "platform": "windows",
        "registrationId": "registrationId",
        "status": "connected",
        "timestamp": "2023-10-11 00:00:00+00",
        "version": "1.0.0"
      }
    ]
  },
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Domain Types

### Device List Response

- `DeviceListResponse object { devices }`

  - `devices: optional array of object { deviceId, deviceName, eligible, 7 more }`

    List of eligible devices

    - `deviceId: optional string`

      Device identifier (UUID v4)

    - `deviceName: optional string`

      Device identifier (human readable)

    - `eligible: optional boolean`

      Whether the device is eligible for remote captures

    - `ineligibleReason: optional string`

      If the device is not eligible, the reason why.

    - `personEmail: optional string`

      User contact email address

    - `platform: optional string`

      Operating system.

    - `registrationId: optional string`

      Device registration identifier (UUID v4). On multi-user devices, this uniquely identifies a user's registration on the device.

    - `status: optional string`

      Network status.

    - `timestamp: optional string`

    - `version: optional string`

      WARP client version.
