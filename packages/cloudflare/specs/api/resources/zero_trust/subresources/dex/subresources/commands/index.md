# Commands

## List account commands

**get** `/accounts/{account_id}/dex/commands`

Retrieves a paginated list of commands issued to devices under the specified account, optionally filtered by time range, device, or other parameters

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

### Query Parameters

- `page: number`

  Page number of paginated results.

- `per_page: number`

  Number of results per page.

- `command_type: optional "pcap" or "speed-test" or "warp-diag"`

  Optionally filter executed commands by command type.

  - `"pcap"`

  - `"speed-test"`

  - `"warp-diag"`

- `device_id: optional string`

  Unique identifier for a device.

- `from: optional string`

  Start time for the query in ISO (RFC3339 - ISO 8601) format.

- `status: optional "PENDING_EXEC" or "PENDING_UPLOAD" or "SUCCESS" or "FAILED"`

  Optionally filter executed commands by status.

  - `"PENDING_EXEC"`

  - `"PENDING_UPLOAD"`

  - `"SUCCESS"`

  - `"FAILED"`

- `to: optional string`

  End time for the query in ISO (RFC3339 - ISO 8601) format.

- `user_email: optional string`

  Email tied to the device.

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

- `result: optional object { commands }`

  - `commands: optional array of object { id, completed_date, created_date, 6 more }`

    - `id: optional string`

    - `completed_date: optional string`

    - `created_date: optional string`

    - `device_id: optional string`

    - `filename: optional string`

    - `registration_id: optional string`

      Unique identifier for the device registration

    - `status: optional string`

    - `type: optional string`

    - `user_email: optional string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/commands \
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
    "commands": [
      {
        "id": "id",
        "completed_date": "2019-12-27T18:11:19.117Z",
        "created_date": "2019-12-27T18:11:19.117Z",
        "device_id": "device_id",
        "filename": "filename",
        "registration_id": "registration_id",
        "status": "status",
        "type": "type",
        "user_email": "user_email"
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

## Create account commands

**post** `/accounts/{account_id}/dex/commands`

Initiate commands for up to 10 devices per account.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

### Body Parameters

- `commands: array of object { device_id, type, user_email, 2 more }`

  List of device-level commands to execute

  - `device_id: string`

    Unique identifier for the physical device

  - `type: "pcap" or "speed-test" or "warp-diag"`

    Type of command to execute on the device

    - `"pcap"`

    - `"speed-test"`

    - `"warp-diag"`

  - `user_email: string`

    Email tied to the device

  - `args: optional object { "test-all-routes" }  or object { "max-file-size-mb", "packet-size-bytes", "time-limit-min" }  or object { interfaces }`

    Command arguments. Allowed fields depend on `type`.

    - `WARPDiagArgs object { "test-all-routes" }`

      - `"test-all-routes": optional boolean`

        Test an IP address from all included or excluded ranges. Essentially the same as running 'route get <ip>' and collecting the results. This option may increase the time taken to collect the warp-diag.

    - `PCAPArgs object { "max-file-size-mb", "packet-size-bytes", "time-limit-min" }`

      - `"max-file-size-mb": optional number`

        Maximum file size (in MB) for the capture file. If the capture artifact exceeds the specified max file size, it will NOT be uploaded.

      - `"packet-size-bytes": optional number`

        Maximum number of bytes to save for each packet

      - `"time-limit-min": optional number`

        Limit on capture duration (in minutes)

    - `SpeedTestArgs object { interfaces }`

      - `interfaces: optional array of "default" or "tunnel"`

        List of interfaces to run the speed test on

        - `"default"`

        - `"tunnel"`

  - `registration_id: optional string`

    Unique identifier for the device registration. Required for multi-user devices to target the correct user session.

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

- `result: optional object { commands }`

  - `commands: optional array of object { id, args, device_id, 3 more }`

    List of created commands

    - `id: optional string`

      Unique identifier for the command

    - `args: optional map[string]`

      Command arguments

    - `device_id: optional string`

      Identifier for the device associated with the command

    - `registration_id: optional string`

      Unique identifier for the device registration

    - `status: optional "PENDING_EXEC" or "PENDING_UPLOAD" or "SUCCESS" or "FAILED"`

      Current status of the command

      - `"PENDING_EXEC"`

      - `"PENDING_UPLOAD"`

      - `"SUCCESS"`

      - `"FAILED"`

    - `type: optional string`

      Type of the command (e.g., "pcap", "speed-test", or "warp-diag")

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/commands \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "commands": [
            {
              "device_id": "device_id",
              "type": "pcap",
              "user_email": "user_email"
            }
          ]
        }'
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
    "commands": [
      {
        "id": "id",
        "args": {
          "foo": "string"
        },
        "device_id": "device_id",
        "registration_id": "registration_id",
        "status": "PENDING_EXEC",
        "type": "type"
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

### Command List Response

- `CommandListResponse object { commands }`

  - `commands: optional array of object { id, completed_date, created_date, 6 more }`

    - `id: optional string`

    - `completed_date: optional string`

    - `created_date: optional string`

    - `device_id: optional string`

    - `filename: optional string`

    - `registration_id: optional string`

      Unique identifier for the device registration

    - `status: optional string`

    - `type: optional string`

    - `user_email: optional string`

### Command Create Response

- `CommandCreateResponse object { commands }`

  - `commands: optional array of object { id, args, device_id, 3 more }`

    List of created commands

    - `id: optional string`

      Unique identifier for the command

    - `args: optional map[string]`

      Command arguments

    - `device_id: optional string`

      Identifier for the device associated with the command

    - `registration_id: optional string`

      Unique identifier for the device registration

    - `status: optional "PENDING_EXEC" or "PENDING_UPLOAD" or "SUCCESS" or "FAILED"`

      Current status of the command

      - `"PENDING_EXEC"`

      - `"PENDING_UPLOAD"`

      - `"SUCCESS"`

      - `"FAILED"`

    - `type: optional string`

      Type of the command (e.g., "pcap", "speed-test", or "warp-diag")

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

# Downloads

## Download command output file

**get** `/accounts/{account_id}/dex/commands/{command_id}/downloads/{filename}`

Downloads artifacts for an executed command. Bulk downloads are not supported

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

- `command_id: string`

  Unique identifier for a command

- `filename: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/commands/$COMMAND_ID/downloads/$FILENAME \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

# Quota

## Returns account commands usage, quota, and reset time

**get** `/accounts/{account_id}/dex/commands/quota`

Retrieves the current quota usage and limits for device commands within a specific account, including the time when the quota will reset

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

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

- `result: optional object { quota, quota_usage, reset_time }`

  - `quota: number`

    The total number of commands that can be initiated for an account.

  - `quota_usage: number`

    The number of commands that have been initiated for an account.

  - `reset_time: string`

    The time when the quota resets.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/commands/quota \
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
    "quota": 0,
    "quota_usage": 0,
    "reset_time": "2019-12-27T18:11:19.117Z"
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

### Quota Get Response

- `QuotaGetResponse object { quota, quota_usage, reset_time }`

  - `quota: number`

    The total number of commands that can be initiated for an account.

  - `quota_usage: number`

    The number of commands that have been initiated for an account.

  - `reset_time: string`

    The time when the quota resets.
