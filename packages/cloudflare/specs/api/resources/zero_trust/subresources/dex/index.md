# DEX

## Domain Types

### Digital Experience Monitor

- `DigitalExperienceMonitor object { id, default, name }`

  - `id: string`

    API Resource UUID tag.

  - `default: boolean`

    Whether the policy is the default for the account.

  - `name: string`

### Network Path

- `NetworkPath object { slots, sampling }`

  - `slots: array of object { id, clientToAppRttMs, clientToCfEgressRttMs, 3 more }`

    - `id: string`

      API Resource UUID tag.

    - `clientToAppRttMs: number`

      Round trip time in ms of the client to app mile

    - `clientToCfEgressRttMs: number`

      Round trip time in ms of the client to Cloudflare egress mile

    - `clientToCfIngressRttMs: number`

      Round trip time in ms of the client to Cloudflare ingress mile

    - `timestamp: string`

    - `clientToIspRttMs: optional number`

      Round trip time in ms of the client to ISP mile

  - `sampling: optional object { unit, value }`

    Specifies the sampling applied, if any, to the slots response. When sampled, results shown represent the first test run to the start of each sampling interval.

    - `unit: "hours"`

      - `"hours"`

    - `value: number`

### Network Path Response

- `NetworkPathResponse object { id, deviceName, interval, 4 more }`

  - `id: string`

    API Resource UUID tag.

  - `deviceName: optional string`

    Name of the device that ran the test.

  - `interval: optional string`

    The interval at which the Traceroute synthetic application test is set to run.

  - `kind: optional "traceroute"`

    - `"traceroute"`

  - `name: optional string`

  - `networkPath: optional NetworkPath`

    - `slots: array of object { id, clientToAppRttMs, clientToCfEgressRttMs, 3 more }`

      - `id: string`

        API Resource UUID tag.

      - `clientToAppRttMs: number`

        Round trip time in ms of the client to app mile

      - `clientToCfEgressRttMs: number`

        Round trip time in ms of the client to Cloudflare egress mile

      - `clientToCfIngressRttMs: number`

        Round trip time in ms of the client to Cloudflare ingress mile

      - `timestamp: string`

      - `clientToIspRttMs: optional number`

        Round trip time in ms of the client to ISP mile

    - `sampling: optional object { unit, value }`

      Specifies the sampling applied, if any, to the slots response. When sampled, results shown represent the first test run to the start of each sampling interval.

      - `unit: "hours"`

        - `"hours"`

      - `value: number`

  - `url: optional string`

    The host of the Traceroute synthetic application test.

### Percentiles

- `Percentiles object { p50, p90, p95, p99 }`

  - `p50: optional number`

    p50 observed in the time period.

  - `p90: optional number`

    p90 observed in the time period.

  - `p95: optional number`

    p95 observed in the time period.

  - `p99: optional number`

    p99 observed in the time period.

# WARP Change Events

## List WARP change events.

**get** `/accounts/{account_id}/dex/warp-change-events`

List WARP configuration and enablement toggle change events by device.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

### Query Parameters

- `from: string`

  Start time for the query in ISO (RFC3339 - ISO 8601) format.

- `page: number`

  Page number of paginated results.

- `per_page: number`

  Number of results per page.

- `to: string`

  End time for the query in ISO (RFC3339 - ISO 8601) format.

- `account_name: optional string`

  Filter events by account name.

- `config_name: optional string`

  Filter events by WARP configuration name changed from or to. Applicable to type='config' events only.

- `sort_order: optional "ASC" or "DESC"`

  Sort response by event timestamp.

  - `"ASC"`

  - `"DESC"`

- `toggle: optional "on" or "off"`

  Filter events by type toggle value. Applicable to type='toggle' events only.

  - `"on"`

  - `"off"`

- `type: optional "config" or "toggle"`

  Filter events by type 'config' or 'toggle'.

  - `"config"`

  - `"toggle"`

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

- `result: optional array of object { account_name, account_tag, device_id, 7 more }  or object { device_id, device_registration, from, 6 more }`

  - `DigitalExperienceMonitoringWARPToggleChangeEvent object { account_name, account_tag, device_id, 7 more }`

    - `account_name: optional string`

      The account name.

    - `account_tag: optional string`

      The public account identifier.

    - `device_id: optional string`

      The device ID.

    - `device_registration: optional string`

      Deprecated: use registration_id. The device registration ID.

    - `hostname: optional string`

      The hostname of the machine the event is from.

    - `registration_id: optional string`

      The device registration ID.

    - `serial_number: optional string`

      The serial number of the machine the event is from.

    - `timestamp: optional string`

      The event time.

    - `toggle: optional "on" or "off"`

      The state of the WARP toggle.

      - `"on"`

      - `"off"`

    - `user_email: optional string`

      Email tied to the device.

  - `DigitalExperienceMonitoringWARPConfigChangeEvent object { device_id, device_registration, from, 6 more }`

    - `device_id: optional string`

      The device ID.

    - `device_registration: optional string`

      Deprecated: use registration_id. The device registration ID.

    - `from: optional object { account_name, account_tag, config_name }`

      The details for the WARP configuration that was switched from.

      - `account_name: optional string`

        The account name.

      - `account_tag: optional string`

        The public account identifier.

      - `config_name: optional string`

        The name of the WARP configuration.

    - `hostname: optional string`

      The hostname of the machine the event is from.

    - `registration_id: optional string`

      The device registration ID.

    - `serial_number: optional string`

      The serial number of the machine the event is from.

    - `timestamp: optional string`

      The event time.

    - `to: optional object { account_name, account_tag, config_name }`

      The details for the WARP configuration that was switched to.

      - `account_name: optional string`

        The account name.

      - `account_tag: optional string`

        The public account identifier.

      - `config_name: optional string`

        The name of the WARP configuration.

    - `user_email: optional string`

      Email tied to the device.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/warp-change-events \
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
      "account_name": "account_name",
      "account_tag": "account_tag",
      "device_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "device_registration": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "hostname": "hostname",
      "registration_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "serial_number": "serial_number",
      "timestamp": "2023-10-11T00:00:00Z",
      "toggle": "on",
      "user_email": "user_email"
    }
  ],
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

### WARP Change Event Get Response

- `WARPChangeEventGetResponse = array of object { account_name, account_tag, device_id, 7 more }  or object { device_id, device_registration, from, 6 more }`

  - `DigitalExperienceMonitoringWARPToggleChangeEvent object { account_name, account_tag, device_id, 7 more }`

    - `account_name: optional string`

      The account name.

    - `account_tag: optional string`

      The public account identifier.

    - `device_id: optional string`

      The device ID.

    - `device_registration: optional string`

      Deprecated: use registration_id. The device registration ID.

    - `hostname: optional string`

      The hostname of the machine the event is from.

    - `registration_id: optional string`

      The device registration ID.

    - `serial_number: optional string`

      The serial number of the machine the event is from.

    - `timestamp: optional string`

      The event time.

    - `toggle: optional "on" or "off"`

      The state of the WARP toggle.

      - `"on"`

      - `"off"`

    - `user_email: optional string`

      Email tied to the device.

  - `DigitalExperienceMonitoringWARPConfigChangeEvent object { device_id, device_registration, from, 6 more }`

    - `device_id: optional string`

      The device ID.

    - `device_registration: optional string`

      Deprecated: use registration_id. The device registration ID.

    - `from: optional object { account_name, account_tag, config_name }`

      The details for the WARP configuration that was switched from.

      - `account_name: optional string`

        The account name.

      - `account_tag: optional string`

        The public account identifier.

      - `config_name: optional string`

        The name of the WARP configuration.

    - `hostname: optional string`

      The hostname of the machine the event is from.

    - `registration_id: optional string`

      The device registration ID.

    - `serial_number: optional string`

      The serial number of the machine the event is from.

    - `timestamp: optional string`

      The event time.

    - `to: optional object { account_name, account_tag, config_name }`

      The details for the WARP configuration that was switched to.

      - `account_name: optional string`

        The account name.

      - `account_tag: optional string`

        The public account identifier.

      - `config_name: optional string`

        The name of the WARP configuration.

    - `user_email: optional string`

      Email tied to the device.

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

# Colos

## List Cloudflare colos

**get** `/accounts/{account_id}/dex/colos`

List Cloudflare colos that account's devices were connected to during a time period, sorted by usage starting from the most used colo. Colos without traffic are also returned and sorted alphabetically.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

### Query Parameters

- `from: string`

  Start time for connection period in ISO (RFC3339 - ISO 8601) format.

- `to: string`

  End time for connection period in ISO (RFC3339 - ISO 8601) format.

- `sortBy: optional "fleet-status-usage" or "application-tests-usage"`

  Type of usage that colos should be sorted by. If unspecified, returns all Cloudflare colos sorted alphabetically.

  - `"fleet-status-usage"`

  - `"application-tests-usage"`

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

- `result: optional array of object { airportCode, city, countryCode }`

  array of colos.

  - `airportCode: string`

    Airport code

  - `city: string`

    City

  - `countryCode: string`

    Country code

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/colos \
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
      "airportCode": "SFO",
      "city": "San Francisco",
      "countryCode": "US"
    }
  ]
}
```

## Domain Types

### Colo List Response

- `ColoListResponse object { airportCode, city, countryCode }`

  - `airportCode: string`

    Airport code

  - `city: string`

    City

  - `countryCode: string`

    Country code

# Fleet Status

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

## Domain Types

### Live Stat

- `LiveStat object { uniqueDevicesTotal, value }`

  - `uniqueDevicesTotal: optional number`

    Number of unique devices

  - `value: optional string`

### Fleet Status Live Response

- `FleetStatusLiveResponse object { deviceStats }`

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

### Fleet Status Over Time Response

- `FleetStatusOverTimeResponse object { deviceStats }`

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

# Devices

## List details of devices using WARP.

**get** `/accounts/{account_id}/dex/fleet-status/devices`

List details of devices using WARP.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

### Query Parameters

- `from: string`

  Start of the time range to query. Timestamp can be provided in ISO 8601 datetime format or milliseconds since epoch.

- `page: number`

  Page number of paginated results.

- `per_page: number`

  Number of results per page.

- `to: string`

  End of the time range to query. Timestamp can be provided in ISO 8601 datetime format or milliseconds since epoch.

- `colo: optional string`

  Cloudflare colo airport code.

- `device_id: optional string`

  Device-specific ID, given as UUID.

- `mode: optional string`

  The mode under which the WARP client is run.

- `platform: optional string`

  Operating system.

- `sort_by: optional "colo" or "device_id" or "mode" or 4 more`

  Dimension to sort results by.

  - `"colo"`

  - `"device_id"`

  - `"mode"`

  - `"platform"`

  - `"status"`

  - `"timestamp"`

  - `"version"`

- `source: optional "last_seen" or "hourly" or "raw"`

  Source:

  * `hourly` - device details aggregated hourly, up to 7 days prior
  * `last_seen` - device details, up to 60 minutes prior. Time windows exceeding 60 minutes will be rejected from June 1st, 2026. Please use 'hourly' or 'raw' instead for longer time ranges.
  * `raw` - device details, up to 7 days prior

  - `"last_seen"`

  - `"hourly"`

  - `"raw"`

- `status: optional string`

  Network status.

- `version: optional string`

  WARP client version.

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

- `result: optional array of object { colo, deviceId, mode, 40 more }`

  - `colo: string`

    Cloudflare colo airport code.

  - `deviceId: string`

    Device identifier (UUID v4)

  - `mode: string`

    The mode under which the WARP client is run.

  - `platform: string`

    Operating system.

  - `status: string`

    Network status.

  - `timestamp: string`

  - `version: string`

    WARP client version.

  - `alwaysOn: optional boolean`

  - `batteryCharging: optional boolean`

  - `batteryCycles: optional number`

  - `batteryPct: optional number`

  - `connectionType: optional string`

  - `cpuPct: optional number`

  - `cpuPctByApp: optional array of object { cpu_pct, name }`

    - `cpu_pct: optional number`

      CPU usage percentage, on a scale of 0 to 100.

    - `name: optional string`

      Application name.

  - `deviceIpv4: optional object { address, asn, aso, 4 more }`

    - `address: optional string`

    - `asn: optional number`

    - `aso: optional string`

    - `location: optional object { city, country_iso, state_iso, zip }`

      - `city: optional string`

      - `country_iso: optional string`

      - `state_iso: optional string`

      - `zip: optional string`

    - `name: optional string`

    - `netmask: optional string`

    - `version: optional number`

      IP version (`1` for IPv4, `2` for IPv6, `0` if unknown).

  - `deviceIpv6: optional object { address, asn, aso, 4 more }`

    - `address: optional string`

    - `asn: optional number`

    - `aso: optional string`

    - `location: optional object { city, country_iso, state_iso, zip }`

      - `city: optional string`

      - `country_iso: optional string`

      - `state_iso: optional string`

      - `zip: optional string`

    - `name: optional string`

    - `netmask: optional string`

    - `version: optional number`

      IP version (`1` for IPv4, `2` for IPv6, `0` if unknown).

  - `deviceName: optional string`

    Device identifier (human readable).

  - `deviceRegistration: optional string`

    Deprecated: use registrationId. Device registration identifier (UUID).

  - `diskReadBps: optional number`

  - `diskUsagePct: optional number`

  - `diskWriteBps: optional number`

  - `dohSubdomain: optional string`

  - `estimatedLossPct: optional number`

  - `firewallEnabled: optional boolean`

  - `gatewayIpv4: optional object { address, asn, aso, 4 more }`

    - `address: optional string`

    - `asn: optional number`

    - `aso: optional string`

    - `location: optional object { city, country_iso, state_iso, zip }`

      - `city: optional string`

      - `country_iso: optional string`

      - `state_iso: optional string`

      - `zip: optional string`

    - `name: optional string`

    - `netmask: optional string`

    - `version: optional number`

      IP version (`1` for IPv4, `2` for IPv6, `0` if unknown).

  - `gatewayIpv6: optional object { address, asn, aso, 4 more }`

    - `address: optional string`

    - `asn: optional number`

    - `aso: optional string`

    - `location: optional object { city, country_iso, state_iso, zip }`

      - `city: optional string`

      - `country_iso: optional string`

      - `state_iso: optional string`

      - `zip: optional string`

    - `name: optional string`

    - `netmask: optional string`

    - `version: optional number`

      IP version (`1` for IPv4, `2` for IPv6, `0` if unknown).

  - `handshakeLatencyMs: optional number`

  - `ispIpv4: optional object { address, asn, aso, 4 more }`

    - `address: optional string`

    - `asn: optional number`

    - `aso: optional string`

    - `location: optional object { city, country_iso, state_iso, zip }`

      - `city: optional string`

      - `country_iso: optional string`

      - `state_iso: optional string`

      - `zip: optional string`

    - `name: optional string`

    - `netmask: optional string`

    - `version: optional number`

      IP version (`1` for IPv4, `2` for IPv6, `0` if unknown).

  - `ispIpv6: optional object { address, asn, aso, 4 more }`

    - `address: optional string`

    - `asn: optional number`

    - `aso: optional string`

    - `location: optional object { city, country_iso, state_iso, zip }`

      - `city: optional string`

      - `country_iso: optional string`

      - `state_iso: optional string`

      - `zip: optional string`

    - `name: optional string`

    - `netmask: optional string`

    - `version: optional number`

      IP version (`1` for IPv4, `2` for IPv6, `0` if unknown).

  - `metal: optional string`

  - `networkRcvdBps: optional number`

  - `networkSentBps: optional number`

  - `networkSsid: optional string`

  - `personEmail: optional string`

    User contact email address

  - `ramAvailableKb: optional number`

  - `ramUsedPct: optional number`

  - `ramUsedPctByApp: optional array of object { name, ram_used_pct }`

    - `name: optional string`

      Application name.

    - `ram_used_pct: optional number`

      RAM usage percentage, on a scale of 0 to 100.

  - `registrationId: optional string`

    Device registration identifier (UUID v4). On multi-user devices, this uniquely identifies a user's registration on the device.

  - `rtt: optional object { minRttUs, rttUs, rttVarUs }`

    Round-trip time statistics for the WARP tunnel.

    - `minRttUs: optional object { downstream, upstream }`

      Minimum round-trip time in microseconds.

      - `downstream: optional number`

      - `upstream: optional number`

    - `rttUs: optional object { downstream, upstream }`

      Round-trip time in microseconds.

      - `downstream: optional number`

      - `upstream: optional number`

    - `rttVarUs: optional object { downstream, upstream }`

      Round-trip time variance in microseconds.

      - `downstream: optional number`

      - `upstream: optional number`

  - `switchLocked: optional boolean`

  - `tunnelStats: optional object { bytesLost, bytesReceived, bytesRetransmitted, 6 more }`

    WARP tunnel packet and byte counters.

    - `bytesLost: optional object { downstream, upstream }`

      Number of bytes lost, split by direction.

      - `downstream: optional number`

      - `upstream: optional number`

    - `bytesReceived: optional object { downstream, upstream }`

      Number of bytes received, split by direction.

      - `downstream: optional number`

      - `upstream: optional number`

    - `bytesRetransmitted: optional object { downstream, upstream }`

      Number of bytes retransmitted, split by direction.

      - `downstream: optional number`

      - `upstream: optional number`

    - `bytesSent: optional object { downstream, upstream }`

      Number of bytes sent, split by direction.

      - `downstream: optional number`

      - `upstream: optional number`

    - `packetsLost: optional object { downstream, upstream }`

      Number of packets lost, split by direction.

      - `downstream: optional number`

      - `upstream: optional number`

    - `packetsReceived: optional object { downstream, upstream }`

      Number of packets received, split by direction.

      - `downstream: optional number`

      - `upstream: optional number`

    - `packetsRetransmitted: optional object { downstream, upstream }`

      Number of packets retransmitted, split by direction.

      - `downstream: optional number`

      - `upstream: optional number`

    - `packetsSent: optional object { downstream, upstream }`

      Number of packets sent, split by direction.

      - `downstream: optional number`

      - `upstream: optional number`

    - `statsWindowMs: optional number`

      The measurement window duration in milliseconds.

  - `tunnelType: optional string`

  - `wifiStrengthDbm: optional number`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/fleet-status/devices \
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
      "colo": "SJC",
      "deviceId": "deviceId",
      "mode": "proxy",
      "platform": "windows",
      "status": "connected",
      "timestamp": "2023-10-11 00:00:00+00",
      "version": "1.0.0",
      "alwaysOn": true,
      "batteryCharging": true,
      "batteryCycles": 0,
      "batteryPct": 0,
      "connectionType": "connectionType",
      "cpuPct": 0,
      "cpuPctByApp": [
        {
          "cpu_pct": 0,
          "name": "name"
        }
      ],
      "deviceIpv4": {
        "address": "address",
        "asn": 0,
        "aso": "aso",
        "location": {
          "city": "city",
          "country_iso": "country_iso",
          "state_iso": "state_iso",
          "zip": "zip"
        },
        "name": "name",
        "netmask": "netmask",
        "version": 1
      },
      "deviceIpv6": {
        "address": "address",
        "asn": 0,
        "aso": "aso",
        "location": {
          "city": "city",
          "country_iso": "country_iso",
          "state_iso": "state_iso",
          "zip": "zip"
        },
        "name": "name",
        "netmask": "netmask",
        "version": 1
      },
      "deviceName": "deviceName",
      "deviceRegistration": "deviceRegistration",
      "diskReadBps": 0,
      "diskUsagePct": 0,
      "diskWriteBps": 0,
      "dohSubdomain": "dohSubdomain",
      "estimatedLossPct": 0,
      "firewallEnabled": true,
      "gatewayIpv4": {
        "address": "address",
        "asn": 0,
        "aso": "aso",
        "location": {
          "city": "city",
          "country_iso": "country_iso",
          "state_iso": "state_iso",
          "zip": "zip"
        },
        "name": "name",
        "netmask": "netmask",
        "version": 1
      },
      "gatewayIpv6": {
        "address": "address",
        "asn": 0,
        "aso": "aso",
        "location": {
          "city": "city",
          "country_iso": "country_iso",
          "state_iso": "state_iso",
          "zip": "zip"
        },
        "name": "name",
        "netmask": "netmask",
        "version": 1
      },
      "handshakeLatencyMs": 0,
      "ispIpv4": {
        "address": "address",
        "asn": 0,
        "aso": "aso",
        "location": {
          "city": "city",
          "country_iso": "country_iso",
          "state_iso": "state_iso",
          "zip": "zip"
        },
        "name": "name",
        "netmask": "netmask",
        "version": 1
      },
      "ispIpv6": {
        "address": "address",
        "asn": 0,
        "aso": "aso",
        "location": {
          "city": "city",
          "country_iso": "country_iso",
          "state_iso": "state_iso",
          "zip": "zip"
        },
        "name": "name",
        "netmask": "netmask",
        "version": 1
      },
      "metal": "metal",
      "networkRcvdBps": 0,
      "networkSentBps": 0,
      "networkSsid": "networkSsid",
      "personEmail": "personEmail",
      "ramAvailableKb": 0,
      "ramUsedPct": 0,
      "ramUsedPctByApp": [
        {
          "name": "name",
          "ram_used_pct": 0
        }
      ],
      "registrationId": "registrationId",
      "rtt": {
        "minRttUs": {
          "downstream": 0,
          "upstream": 0
        },
        "rttUs": {
          "downstream": 0,
          "upstream": 0
        },
        "rttVarUs": {
          "downstream": 0,
          "upstream": 0
        }
      },
      "switchLocked": true,
      "tunnelStats": {
        "bytesLost": {
          "downstream": 0,
          "upstream": 0
        },
        "bytesReceived": {
          "downstream": 0,
          "upstream": 0
        },
        "bytesRetransmitted": {
          "downstream": 0,
          "upstream": 0
        },
        "bytesSent": {
          "downstream": 0,
          "upstream": 0
        },
        "packetsLost": {
          "downstream": 0,
          "upstream": 0
        },
        "packetsReceived": {
          "downstream": 0,
          "upstream": 0
        },
        "packetsRetransmitted": {
          "downstream": 0,
          "upstream": 0
        },
        "packetsSent": {
          "downstream": 0,
          "upstream": 0
        },
        "statsWindowMs": 0
      },
      "tunnelType": "tunnelType",
      "wifiStrengthDbm": 0
    }
  ],
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

- `DeviceListResponse object { colo, deviceId, mode, 40 more }`

  - `colo: string`

    Cloudflare colo airport code.

  - `deviceId: string`

    Device identifier (UUID v4)

  - `mode: string`

    The mode under which the WARP client is run.

  - `platform: string`

    Operating system.

  - `status: string`

    Network status.

  - `timestamp: string`

  - `version: string`

    WARP client version.

  - `alwaysOn: optional boolean`

  - `batteryCharging: optional boolean`

  - `batteryCycles: optional number`

  - `batteryPct: optional number`

  - `connectionType: optional string`

  - `cpuPct: optional number`

  - `cpuPctByApp: optional array of object { cpu_pct, name }`

    - `cpu_pct: optional number`

      CPU usage percentage, on a scale of 0 to 100.

    - `name: optional string`

      Application name.

  - `deviceIpv4: optional object { address, asn, aso, 4 more }`

    - `address: optional string`

    - `asn: optional number`

    - `aso: optional string`

    - `location: optional object { city, country_iso, state_iso, zip }`

      - `city: optional string`

      - `country_iso: optional string`

      - `state_iso: optional string`

      - `zip: optional string`

    - `name: optional string`

    - `netmask: optional string`

    - `version: optional number`

      IP version (`1` for IPv4, `2` for IPv6, `0` if unknown).

  - `deviceIpv6: optional object { address, asn, aso, 4 more }`

    - `address: optional string`

    - `asn: optional number`

    - `aso: optional string`

    - `location: optional object { city, country_iso, state_iso, zip }`

      - `city: optional string`

      - `country_iso: optional string`

      - `state_iso: optional string`

      - `zip: optional string`

    - `name: optional string`

    - `netmask: optional string`

    - `version: optional number`

      IP version (`1` for IPv4, `2` for IPv6, `0` if unknown).

  - `deviceName: optional string`

    Device identifier (human readable).

  - `deviceRegistration: optional string`

    Deprecated: use registrationId. Device registration identifier (UUID).

  - `diskReadBps: optional number`

  - `diskUsagePct: optional number`

  - `diskWriteBps: optional number`

  - `dohSubdomain: optional string`

  - `estimatedLossPct: optional number`

  - `firewallEnabled: optional boolean`

  - `gatewayIpv4: optional object { address, asn, aso, 4 more }`

    - `address: optional string`

    - `asn: optional number`

    - `aso: optional string`

    - `location: optional object { city, country_iso, state_iso, zip }`

      - `city: optional string`

      - `country_iso: optional string`

      - `state_iso: optional string`

      - `zip: optional string`

    - `name: optional string`

    - `netmask: optional string`

    - `version: optional number`

      IP version (`1` for IPv4, `2` for IPv6, `0` if unknown).

  - `gatewayIpv6: optional object { address, asn, aso, 4 more }`

    - `address: optional string`

    - `asn: optional number`

    - `aso: optional string`

    - `location: optional object { city, country_iso, state_iso, zip }`

      - `city: optional string`

      - `country_iso: optional string`

      - `state_iso: optional string`

      - `zip: optional string`

    - `name: optional string`

    - `netmask: optional string`

    - `version: optional number`

      IP version (`1` for IPv4, `2` for IPv6, `0` if unknown).

  - `handshakeLatencyMs: optional number`

  - `ispIpv4: optional object { address, asn, aso, 4 more }`

    - `address: optional string`

    - `asn: optional number`

    - `aso: optional string`

    - `location: optional object { city, country_iso, state_iso, zip }`

      - `city: optional string`

      - `country_iso: optional string`

      - `state_iso: optional string`

      - `zip: optional string`

    - `name: optional string`

    - `netmask: optional string`

    - `version: optional number`

      IP version (`1` for IPv4, `2` for IPv6, `0` if unknown).

  - `ispIpv6: optional object { address, asn, aso, 4 more }`

    - `address: optional string`

    - `asn: optional number`

    - `aso: optional string`

    - `location: optional object { city, country_iso, state_iso, zip }`

      - `city: optional string`

      - `country_iso: optional string`

      - `state_iso: optional string`

      - `zip: optional string`

    - `name: optional string`

    - `netmask: optional string`

    - `version: optional number`

      IP version (`1` for IPv4, `2` for IPv6, `0` if unknown).

  - `metal: optional string`

  - `networkRcvdBps: optional number`

  - `networkSentBps: optional number`

  - `networkSsid: optional string`

  - `personEmail: optional string`

    User contact email address

  - `ramAvailableKb: optional number`

  - `ramUsedPct: optional number`

  - `ramUsedPctByApp: optional array of object { name, ram_used_pct }`

    - `name: optional string`

      Application name.

    - `ram_used_pct: optional number`

      RAM usage percentage, on a scale of 0 to 100.

  - `registrationId: optional string`

    Device registration identifier (UUID v4). On multi-user devices, this uniquely identifies a user's registration on the device.

  - `rtt: optional object { minRttUs, rttUs, rttVarUs }`

    Round-trip time statistics for the WARP tunnel.

    - `minRttUs: optional object { downstream, upstream }`

      Minimum round-trip time in microseconds.

      - `downstream: optional number`

      - `upstream: optional number`

    - `rttUs: optional object { downstream, upstream }`

      Round-trip time in microseconds.

      - `downstream: optional number`

      - `upstream: optional number`

    - `rttVarUs: optional object { downstream, upstream }`

      Round-trip time variance in microseconds.

      - `downstream: optional number`

      - `upstream: optional number`

  - `switchLocked: optional boolean`

  - `tunnelStats: optional object { bytesLost, bytesReceived, bytesRetransmitted, 6 more }`

    WARP tunnel packet and byte counters.

    - `bytesLost: optional object { downstream, upstream }`

      Number of bytes lost, split by direction.

      - `downstream: optional number`

      - `upstream: optional number`

    - `bytesReceived: optional object { downstream, upstream }`

      Number of bytes received, split by direction.

      - `downstream: optional number`

      - `upstream: optional number`

    - `bytesRetransmitted: optional object { downstream, upstream }`

      Number of bytes retransmitted, split by direction.

      - `downstream: optional number`

      - `upstream: optional number`

    - `bytesSent: optional object { downstream, upstream }`

      Number of bytes sent, split by direction.

      - `downstream: optional number`

      - `upstream: optional number`

    - `packetsLost: optional object { downstream, upstream }`

      Number of packets lost, split by direction.

      - `downstream: optional number`

      - `upstream: optional number`

    - `packetsReceived: optional object { downstream, upstream }`

      Number of packets received, split by direction.

      - `downstream: optional number`

      - `upstream: optional number`

    - `packetsRetransmitted: optional object { downstream, upstream }`

      Number of packets retransmitted, split by direction.

      - `downstream: optional number`

      - `upstream: optional number`

    - `packetsSent: optional object { downstream, upstream }`

      Number of packets sent, split by direction.

      - `downstream: optional number`

      - `upstream: optional number`

    - `statsWindowMs: optional number`

      The measurement window duration in milliseconds.

  - `tunnelType: optional string`

  - `wifiStrengthDbm: optional number`

# HTTP Tests

## Get details and aggregate metrics for an http test

**get** `/accounts/{account_id}/dex/http-tests/{test_id}`

Get test details and aggregate performance metrics for an http test for a given time period between 1 hour and 7 days.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

- `test_id: string`

  API Resource UUID tag.

### Query Parameters

- `from: string`

  Start time for aggregate metrics in ISO ms.

- `interval: "minute" or "hour"`

  Time interval for aggregate time slots.

  - `"minute"`

  - `"hour"`

- `to: string`

  End time for aggregate metrics in ISO ms.

- `colo: optional string`

  Optionally filter result stats to a Cloudflare colo. Cannot be used in combination with deviceId param.

- `deviceId: optional array of string`

  Optionally filter result stats to a specific device(s). Cannot be used in combination with colo param.

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

- `result: optional HTTPDetails`

  - `host: optional string`

    The url of the HTTP synthetic application test.

  - `httpStats: optional object { availabilityPct, dnsResponseTimeMs, httpStatusCode, 3 more }`

    - `availabilityPct: object { slots, avg, max, min }`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `dnsResponseTimeMs: TestStatOverTime`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `httpStatusCode: array of object { status200, status300, status400, 2 more }`

      - `status200: number`

      - `status300: number`

      - `status400: number`

      - `status500: number`

      - `timestamp: string`

    - `resourceFetchTimeMs: TestStatOverTime`

    - `serverResponseTimeMs: TestStatOverTime`

    - `uniqueDevicesTotal: number`

      Count of unique devices that have run this test in the given time period.

  - `httpStatsByColo: optional array of object { availabilityPct, colo, dnsResponseTimeMs, 4 more }`

    - `availabilityPct: object { slots, avg, max, min }`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `colo: string`

    - `dnsResponseTimeMs: TestStatOverTime`

    - `httpStatusCode: array of object { status200, status300, status400, 2 more }`

      - `status200: number`

      - `status300: number`

      - `status400: number`

      - `status500: number`

      - `timestamp: string`

    - `resourceFetchTimeMs: TestStatOverTime`

    - `serverResponseTimeMs: TestStatOverTime`

    - `uniqueDevicesTotal: number`

      Count of unique devices that have run this test in the given time period.

  - `interval: optional string`

    The interval at which the HTTP synthetic application test is set to run.

  - `kind: optional "http"`

    - `"http"`

  - `method: optional string`

    The HTTP method to use when running the test.

  - `name: optional string`

    The name of the HTTP synthetic application test.

  - `target_policies: optional array of DigitalExperienceMonitor`

    - `id: string`

      API Resource UUID tag.

    - `default: boolean`

      Whether the policy is the default for the account.

    - `name: string`

  - `targeted: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/http-tests/$TEST_ID \
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
    "host": "http://example.com",
    "httpStats": {
      "availabilityPct": {
        "slots": [
          {
            "timestamp": "2023-07-16 15:00:00+00",
            "value": 0
          }
        ],
        "avg": 0,
        "max": 0,
        "min": 0
      },
      "dnsResponseTimeMs": {
        "slots": [
          {
            "timestamp": "2023-07-16 15:00:00+00",
            "value": 0
          }
        ],
        "avg": 0,
        "max": 0,
        "min": 0
      },
      "httpStatusCode": [
        {
          "status200": 0,
          "status300": 0,
          "status400": 0,
          "status500": 0,
          "timestamp": "2023-07-16 15:00:00+00"
        }
      ],
      "resourceFetchTimeMs": {
        "slots": [
          {
            "timestamp": "2023-07-16 15:00:00+00",
            "value": 0
          }
        ],
        "avg": 0,
        "max": 0,
        "min": 0
      },
      "serverResponseTimeMs": {
        "slots": [
          {
            "timestamp": "2023-07-16 15:00:00+00",
            "value": 0
          }
        ],
        "avg": 0,
        "max": 0,
        "min": 0
      },
      "uniqueDevicesTotal": 57
    },
    "httpStatsByColo": [
      {
        "availabilityPct": {
          "slots": [
            {
              "timestamp": "2023-07-16 15:00:00+00",
              "value": 0
            }
          ],
          "avg": 0,
          "max": 0,
          "min": 0
        },
        "colo": "DFW",
        "dnsResponseTimeMs": {
          "slots": [
            {
              "timestamp": "2023-07-16 15:00:00+00",
              "value": 0
            }
          ],
          "avg": 0,
          "max": 0,
          "min": 0
        },
        "httpStatusCode": [
          {
            "status200": 0,
            "status300": 0,
            "status400": 0,
            "status500": 0,
            "timestamp": "2023-07-16 15:00:00+00"
          }
        ],
        "resourceFetchTimeMs": {
          "slots": [
            {
              "timestamp": "2023-07-16 15:00:00+00",
              "value": 0
            }
          ],
          "avg": 0,
          "max": 0,
          "min": 0
        },
        "serverResponseTimeMs": {
          "slots": [
            {
              "timestamp": "2023-07-16 15:00:00+00",
              "value": 0
            }
          ],
          "avg": 0,
          "max": 0,
          "min": 0
        },
        "uniqueDevicesTotal": 57
      }
    ],
    "interval": "0h5m0s",
    "kind": "http",
    "method": "GET",
    "name": "Atlassian Sign In Page",
    "target_policies": [
      {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "default": true,
        "name": "name"
      }
    ],
    "targeted": true
  }
}
```

## Domain Types

### HTTP Details

- `HTTPDetails object { host, httpStats, httpStatsByColo, 6 more }`

  - `host: optional string`

    The url of the HTTP synthetic application test.

  - `httpStats: optional object { availabilityPct, dnsResponseTimeMs, httpStatusCode, 3 more }`

    - `availabilityPct: object { slots, avg, max, min }`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `dnsResponseTimeMs: TestStatOverTime`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `httpStatusCode: array of object { status200, status300, status400, 2 more }`

      - `status200: number`

      - `status300: number`

      - `status400: number`

      - `status500: number`

      - `timestamp: string`

    - `resourceFetchTimeMs: TestStatOverTime`

    - `serverResponseTimeMs: TestStatOverTime`

    - `uniqueDevicesTotal: number`

      Count of unique devices that have run this test in the given time period.

  - `httpStatsByColo: optional array of object { availabilityPct, colo, dnsResponseTimeMs, 4 more }`

    - `availabilityPct: object { slots, avg, max, min }`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `colo: string`

    - `dnsResponseTimeMs: TestStatOverTime`

    - `httpStatusCode: array of object { status200, status300, status400, 2 more }`

      - `status200: number`

      - `status300: number`

      - `status400: number`

      - `status500: number`

      - `timestamp: string`

    - `resourceFetchTimeMs: TestStatOverTime`

    - `serverResponseTimeMs: TestStatOverTime`

    - `uniqueDevicesTotal: number`

      Count of unique devices that have run this test in the given time period.

  - `interval: optional string`

    The interval at which the HTTP synthetic application test is set to run.

  - `kind: optional "http"`

    - `"http"`

  - `method: optional string`

    The HTTP method to use when running the test.

  - `name: optional string`

    The name of the HTTP synthetic application test.

  - `target_policies: optional array of DigitalExperienceMonitor`

    - `id: string`

      API Resource UUID tag.

    - `default: boolean`

      Whether the policy is the default for the account.

    - `name: string`

  - `targeted: optional boolean`

# Percentiles

## Get percentiles for an http test

**get** `/accounts/{account_id}/dex/http-tests/{test_id}/percentiles`

Get percentiles for an http test for a given time period between 1 hour and 7 days.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

- `test_id: string`

  API Resource UUID tag.

### Query Parameters

- `from: string`

  Start time for the query in ISO (RFC3339 - ISO 8601) format.

- `to: string`

  End time for the query in ISO (RFC3339 - ISO 8601) format.

- `colo: optional string`

  Optionally filter result stats to a Cloudflare colo. Cannot be used in combination with deviceId param.

- `deviceId: optional array of string`

  Optionally filter result stats to a specific device(s). Cannot be used in combination with colo param.

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

- `result: optional HTTPDetailsPercentiles`

  - `dnsResponseTimeMs: optional Percentiles`

    - `p50: optional number`

      p50 observed in the time period.

    - `p90: optional number`

      p90 observed in the time period.

    - `p95: optional number`

      p95 observed in the time period.

    - `p99: optional number`

      p99 observed in the time period.

  - `resourceFetchTimeMs: optional Percentiles`

  - `serverResponseTimeMs: optional Percentiles`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/http-tests/$TEST_ID/percentiles \
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
    "dnsResponseTimeMs": {
      "p50": 0,
      "p90": 0,
      "p95": 0,
      "p99": 0
    },
    "resourceFetchTimeMs": {
      "p50": 0,
      "p90": 0,
      "p95": 0,
      "p99": 0
    },
    "serverResponseTimeMs": {
      "p50": 0,
      "p90": 0,
      "p95": 0,
      "p99": 0
    }
  }
}
```

## Domain Types

### HTTP Details Percentiles

- `HTTPDetailsPercentiles object { dnsResponseTimeMs, resourceFetchTimeMs, serverResponseTimeMs }`

  - `dnsResponseTimeMs: optional Percentiles`

    - `p50: optional number`

      p50 observed in the time period.

    - `p90: optional number`

      p90 observed in the time period.

    - `p95: optional number`

      p95 observed in the time period.

    - `p99: optional number`

      p99 observed in the time period.

  - `resourceFetchTimeMs: optional Percentiles`

  - `serverResponseTimeMs: optional Percentiles`

### Test Stat Over Time

- `TestStatOverTime object { slots, avg, max, min }`

  - `slots: array of object { timestamp, value }`

    - `timestamp: string`

    - `value: number`

  - `avg: optional number`

    average observed in the time period.

  - `max: optional number`

    highest observed in the time period.

  - `min: optional number`

    lowest observed in the time period.

# Tests

## List DEX test analytics

**get** `/accounts/{account_id}/dex/tests/overview`

List DEX tests with overview metrics.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

### Query Parameters

- `colo: optional string`

  Optionally filter result stats to a Cloudflare colo. Cannot be used in combination with deviceId param.

- `deviceId: optional array of string`

  Optionally filter result stats to a specific device(s). Cannot be used in combination with colo param.

- `kind: optional "http" or "traceroute"`

  Filter by test type.

  - `"http"`

  - `"traceroute"`

- `page: optional number`

  Page number of paginated results

- `per_page: optional number`

  Number of items per page

- `registration_id: optional string`

  Optionally filter results to a specific device registration. Must be used in combination with a single deviceId.

- `testName: optional string`

  Optionally filter results by test name.

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

- `result: optional Tests`

  - `overviewMetrics: object { testsTotal, avgHttpAvailabilityPct, avgTracerouteAvailabilityPct }`

    - `testsTotal: number`

      number of tests.

    - `avgHttpAvailabilityPct: optional number`

      percentage availability for all HTTP test results in response.

    - `avgTracerouteAvailabilityPct: optional number`

      percentage availability for all traceroutes results in response.

  - `tests: array of object { id, created, description, 13 more }`

    array of test results objects.

    - `id: string`

      API Resource UUID tag.

    - `created: string`

      date the test was created.

    - `description: string`

      the test description defined during configuration

    - `enabled: boolean`

      if true, then the test will run on targeted devices. Else, the test will not run.

    - `host: string`

    - `interval: string`

      The interval at which the synthetic application test is set to run.

    - `kind: "http" or "traceroute"`

      test type, http or traceroute

      - `"http"`

      - `"traceroute"`

    - `name: string`

      name given to this test

    - `updated: string`

    - `httpResults: optional object { resourceFetchTime }`

      - `resourceFetchTime: object { history, avgMs, overTime }`

        - `history: array of object { timePeriod, avgMs, deltaPct }`

          - `timePeriod: AggregateTimePeriod`

            - `units: "hours" or "days" or "testRuns"`

              - `"hours"`

              - `"days"`

              - `"testRuns"`

            - `value: number`

          - `avgMs: optional number`

          - `deltaPct: optional number`

        - `avgMs: optional number`

        - `overTime: optional object { timePeriod, values }`

          - `timePeriod: AggregateTimePeriod`

          - `values: array of object { avgMs, timestamp }`

            - `avgMs: number`

            - `timestamp: string`

    - `httpResultsByColo: optional array of object { colo, resourceFetchTime }`

      - `colo: string`

        Cloudflare colo

      - `resourceFetchTime: object { history, avgMs, overTime }`

        - `history: array of object { timePeriod, avgMs, deltaPct }`

          - `timePeriod: AggregateTimePeriod`

          - `avgMs: optional number`

          - `deltaPct: optional number`

        - `avgMs: optional number`

        - `overTime: optional object { timePeriod, values }`

          - `timePeriod: AggregateTimePeriod`

          - `values: array of object { avgMs, timestamp }`

            - `avgMs: number`

            - `timestamp: string`

    - `method: optional string`

      for HTTP, the method to use when running the test

    - `target_policies: optional array of DigitalExperienceMonitor`

      - `id: string`

        API Resource UUID tag.

      - `default: boolean`

        Whether the policy is the default for the account.

      - `name: string`

    - `targeted: optional boolean`

    - `tracerouteResults: optional object { roundTripTime }`

      - `roundTripTime: object { history, avgMs, overTime }`

        - `history: array of object { timePeriod, avgMs, deltaPct }`

          - `timePeriod: AggregateTimePeriod`

          - `avgMs: optional number`

          - `deltaPct: optional number`

        - `avgMs: optional number`

        - `overTime: optional object { timePeriod, values }`

          - `timePeriod: AggregateTimePeriod`

          - `values: array of object { avgMs, timestamp }`

            - `avgMs: number`

            - `timestamp: string`

    - `tracerouteResultsByColo: optional array of object { colo, roundTripTime }`

      - `colo: string`

        Cloudflare colo

      - `roundTripTime: object { history, avgMs, overTime }`

        - `history: array of object { timePeriod, avgMs, deltaPct }`

          - `timePeriod: AggregateTimePeriod`

          - `avgMs: optional number`

          - `deltaPct: optional number`

        - `avgMs: optional number`

        - `overTime: optional object { timePeriod, values }`

          - `timePeriod: AggregateTimePeriod`

          - `values: array of object { avgMs, timestamp }`

            - `avgMs: number`

            - `timestamp: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/tests/overview \
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
    "overviewMetrics": {
      "testsTotal": 0,
      "avgHttpAvailabilityPct": 0,
      "avgTracerouteAvailabilityPct": 0
    },
    "tests": [
      {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "created": "created",
        "description": "description",
        "enabled": true,
        "host": "host",
        "interval": "interval",
        "kind": "http",
        "name": "name",
        "updated": "updated",
        "httpResults": {
          "resourceFetchTime": {
            "history": [
              {
                "timePeriod": {
                  "units": "hours",
                  "value": 0
                },
                "avgMs": 0,
                "deltaPct": 0
              }
            ],
            "avgMs": 0,
            "overTime": {
              "timePeriod": {
                "units": "hours",
                "value": 0
              },
              "values": [
                {
                  "avgMs": 0,
                  "timestamp": "timestamp"
                }
              ]
            }
          }
        },
        "httpResultsByColo": [
          {
            "colo": "SJC",
            "resourceFetchTime": {
              "history": [
                {
                  "timePeriod": {
                    "units": "hours",
                    "value": 0
                  },
                  "avgMs": 0,
                  "deltaPct": 0
                }
              ],
              "avgMs": 0,
              "overTime": {
                "timePeriod": {
                  "units": "hours",
                  "value": 0
                },
                "values": [
                  {
                    "avgMs": 0,
                    "timestamp": "timestamp"
                  }
                ]
              }
            }
          }
        ],
        "method": "method",
        "target_policies": [
          {
            "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
            "default": true,
            "name": "name"
          }
        ],
        "targeted": true,
        "tracerouteResults": {
          "roundTripTime": {
            "history": [
              {
                "timePeriod": {
                  "units": "hours",
                  "value": 0
                },
                "avgMs": 0,
                "deltaPct": 0
              }
            ],
            "avgMs": 0,
            "overTime": {
              "timePeriod": {
                "units": "hours",
                "value": 0
              },
              "values": [
                {
                  "avgMs": 0,
                  "timestamp": "timestamp"
                }
              ]
            }
          }
        },
        "tracerouteResultsByColo": [
          {
            "colo": "SJC",
            "roundTripTime": {
              "history": [
                {
                  "timePeriod": {
                    "units": "hours",
                    "value": 0
                  },
                  "avgMs": 0,
                  "deltaPct": 0
                }
              ],
              "avgMs": 0,
              "overTime": {
                "timePeriod": {
                  "units": "hours",
                  "value": 0
                },
                "values": [
                  {
                    "avgMs": 0,
                    "timestamp": "timestamp"
                  }
                ]
              }
            }
          }
        ]
      }
    ]
  }
}
```

## Domain Types

### Aggregate Time Period

- `AggregateTimePeriod object { units, value }`

  - `units: "hours" or "days" or "testRuns"`

    - `"hours"`

    - `"days"`

    - `"testRuns"`

  - `value: number`

### Tests

- `Tests object { overviewMetrics, tests }`

  - `overviewMetrics: object { testsTotal, avgHttpAvailabilityPct, avgTracerouteAvailabilityPct }`

    - `testsTotal: number`

      number of tests.

    - `avgHttpAvailabilityPct: optional number`

      percentage availability for all HTTP test results in response.

    - `avgTracerouteAvailabilityPct: optional number`

      percentage availability for all traceroutes results in response.

  - `tests: array of object { id, created, description, 13 more }`

    array of test results objects.

    - `id: string`

      API Resource UUID tag.

    - `created: string`

      date the test was created.

    - `description: string`

      the test description defined during configuration

    - `enabled: boolean`

      if true, then the test will run on targeted devices. Else, the test will not run.

    - `host: string`

    - `interval: string`

      The interval at which the synthetic application test is set to run.

    - `kind: "http" or "traceroute"`

      test type, http or traceroute

      - `"http"`

      - `"traceroute"`

    - `name: string`

      name given to this test

    - `updated: string`

    - `httpResults: optional object { resourceFetchTime }`

      - `resourceFetchTime: object { history, avgMs, overTime }`

        - `history: array of object { timePeriod, avgMs, deltaPct }`

          - `timePeriod: AggregateTimePeriod`

            - `units: "hours" or "days" or "testRuns"`

              - `"hours"`

              - `"days"`

              - `"testRuns"`

            - `value: number`

          - `avgMs: optional number`

          - `deltaPct: optional number`

        - `avgMs: optional number`

        - `overTime: optional object { timePeriod, values }`

          - `timePeriod: AggregateTimePeriod`

          - `values: array of object { avgMs, timestamp }`

            - `avgMs: number`

            - `timestamp: string`

    - `httpResultsByColo: optional array of object { colo, resourceFetchTime }`

      - `colo: string`

        Cloudflare colo

      - `resourceFetchTime: object { history, avgMs, overTime }`

        - `history: array of object { timePeriod, avgMs, deltaPct }`

          - `timePeriod: AggregateTimePeriod`

          - `avgMs: optional number`

          - `deltaPct: optional number`

        - `avgMs: optional number`

        - `overTime: optional object { timePeriod, values }`

          - `timePeriod: AggregateTimePeriod`

          - `values: array of object { avgMs, timestamp }`

            - `avgMs: number`

            - `timestamp: string`

    - `method: optional string`

      for HTTP, the method to use when running the test

    - `target_policies: optional array of DigitalExperienceMonitor`

      - `id: string`

        API Resource UUID tag.

      - `default: boolean`

        Whether the policy is the default for the account.

      - `name: string`

    - `targeted: optional boolean`

    - `tracerouteResults: optional object { roundTripTime }`

      - `roundTripTime: object { history, avgMs, overTime }`

        - `history: array of object { timePeriod, avgMs, deltaPct }`

          - `timePeriod: AggregateTimePeriod`

          - `avgMs: optional number`

          - `deltaPct: optional number`

        - `avgMs: optional number`

        - `overTime: optional object { timePeriod, values }`

          - `timePeriod: AggregateTimePeriod`

          - `values: array of object { avgMs, timestamp }`

            - `avgMs: number`

            - `timestamp: string`

    - `tracerouteResultsByColo: optional array of object { colo, roundTripTime }`

      - `colo: string`

        Cloudflare colo

      - `roundTripTime: object { history, avgMs, overTime }`

        - `history: array of object { timePeriod, avgMs, deltaPct }`

          - `timePeriod: AggregateTimePeriod`

          - `avgMs: optional number`

          - `deltaPct: optional number`

        - `avgMs: optional number`

        - `overTime: optional object { timePeriod, values }`

          - `timePeriod: AggregateTimePeriod`

          - `values: array of object { avgMs, timestamp }`

            - `avgMs: number`

            - `timestamp: string`

# Unique Devices

## Get count of devices targeted

**get** `/accounts/{account_id}/dex/tests/unique-devices`

Returns unique count of devices that have run synthetic application monitoring tests in the past 7 days.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

### Query Parameters

- `deviceId: optional array of string`

  Optionally filter result stats to a specific device(s). Cannot be used in combination with colo param.

- `testName: optional string`

  Optionally filter results by test name.

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

- `result: optional UniqueDevices`

  - `uniqueDevicesTotal: number`

    total number of unique devices

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/tests/unique-devices \
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
    "uniqueDevicesTotal": 0
  }
}
```

## Domain Types

### Unique Devices

- `UniqueDevices object { uniqueDevicesTotal }`

  - `uniqueDevicesTotal: number`

    total number of unique devices

# Traceroute Test Results

# Network Path

## Get details for a specific traceroute test run

**get** `/accounts/{account_id}/dex/traceroute-test-results/{test_result_id}/network-path`

Get a breakdown of hops and performance metrics for a specific traceroute test run

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

- `test_result_id: string`

  API Resource UUID tag.

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

- `result: optional object { hops, resultId, colo, 6 more }`

  - `hops: array of object { ttl, asn, aso, 6 more }`

    An array of the hops taken by the device to reach the end destination.

    - `ttl: number`

    - `asn: optional number`

    - `aso: optional string`

    - `ipAddress: optional string`

    - `location: optional object { city, state, zip }`

      - `city: optional string`

      - `state: optional string`

      - `zip: optional string`

    - `mile: optional "client-to-app" or "client-to-cf-egress" or "client-to-cf-ingress" or "client-to-isp"`

      - `"client-to-app"`

      - `"client-to-cf-egress"`

      - `"client-to-cf-ingress"`

      - `"client-to-isp"`

    - `name: optional string`

    - `packetLossPct: optional number`

    - `rttMs: optional number`

  - `resultId: string`

    API Resource UUID tag.

  - `colo: optional string`

    Cloudflare colo airport code.

  - `deviceName: optional string`

    Name of the device associated with this network path response.

  - `execution_context: optional "EXECUTION_CONTEXT_INVALID" or "OUT_OF_TUNNEL" or "IN_TUNNEL"`

    Whether the test was run inside or outside of the WARP tunnel.

    - `"EXECUTION_CONTEXT_INVALID"`

    - `"OUT_OF_TUNNEL"`

    - `"IN_TUNNEL"`

  - `testId: optional string`

    API Resource UUID tag.

  - `testName: optional string`

    Name of the traceroute test.

  - `time_start: optional string`

    Timestamp indicating when the traceroute test execution began.

  - `tunnel_type: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/traceroute-test-results/$TEST_RESULT_ID/network-path \
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
    "hops": [
      {
        "ttl": 0,
        "asn": 0,
        "aso": "aso",
        "ipAddress": "ipAddress",
        "location": {
          "city": "city",
          "state": "state",
          "zip": "zip"
        },
        "mile": "client-to-app",
        "name": "name",
        "packetLossPct": 0,
        "rttMs": 0
      }
    ],
    "resultId": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "colo": "SJC",
    "deviceName": "deviceName",
    "execution_context": "EXECUTION_CONTEXT_INVALID",
    "testId": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "testName": "testName",
    "time_start": "2023-07-16 15:00:00+00",
    "tunnel_type": "tunnel_type"
  }
}
```

## Domain Types

### Network Path Get Response

- `NetworkPathGetResponse object { hops, resultId, colo, 6 more }`

  - `hops: array of object { ttl, asn, aso, 6 more }`

    An array of the hops taken by the device to reach the end destination.

    - `ttl: number`

    - `asn: optional number`

    - `aso: optional string`

    - `ipAddress: optional string`

    - `location: optional object { city, state, zip }`

      - `city: optional string`

      - `state: optional string`

      - `zip: optional string`

    - `mile: optional "client-to-app" or "client-to-cf-egress" or "client-to-cf-ingress" or "client-to-isp"`

      - `"client-to-app"`

      - `"client-to-cf-egress"`

      - `"client-to-cf-ingress"`

      - `"client-to-isp"`

    - `name: optional string`

    - `packetLossPct: optional number`

    - `rttMs: optional number`

  - `resultId: string`

    API Resource UUID tag.

  - `colo: optional string`

    Cloudflare colo airport code.

  - `deviceName: optional string`

    Name of the device associated with this network path response.

  - `execution_context: optional "EXECUTION_CONTEXT_INVALID" or "OUT_OF_TUNNEL" or "IN_TUNNEL"`

    Whether the test was run inside or outside of the WARP tunnel.

    - `"EXECUTION_CONTEXT_INVALID"`

    - `"OUT_OF_TUNNEL"`

    - `"IN_TUNNEL"`

  - `testId: optional string`

    API Resource UUID tag.

  - `testName: optional string`

    Name of the traceroute test.

  - `time_start: optional string`

    Timestamp indicating when the traceroute test execution began.

  - `tunnel_type: optional string`

# Traceroute Tests

## Get details and aggregate metrics for a traceroute test

**get** `/accounts/{account_id}/dex/traceroute-tests/{test_id}`

Get test details and aggregate performance metrics for a traceroute test for a given time period between 1 hour and 7 days.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

- `test_id: string`

  API Resource UUID tag.

### Query Parameters

- `from: string`

  Start time for aggregate metrics in ISO ms.

- `interval: "minute" or "hour"`

  Time interval for aggregate time slots.

  - `"minute"`

  - `"hour"`

- `to: string`

  End time for aggregate metrics in ISO ms.

- `colo: optional string`

  Optionally filter result stats to a Cloudflare colo. Cannot be used in combination with deviceId param.

- `deviceId: optional array of string`

  Optionally filter result stats to a specific device(s). Cannot be used in combination with colo param.

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

- `result: optional Traceroute`

  - `host: string`

    The host of the Traceroute synthetic application test.

  - `interval: string`

    The interval at which the Traceroute synthetic application test is set to run.

  - `kind: "traceroute"`

    - `"traceroute"`

  - `name: string`

    The name of the Traceroute synthetic application test.

  - `target_policies: optional array of DigitalExperienceMonitor`

    - `id: string`

      API Resource UUID tag.

    - `default: boolean`

      Whether the policy is the default for the account.

    - `name: string`

  - `targeted: optional boolean`

  - `tracerouteStats: optional object { availabilityPct, hopsCount, packetLossPct, 2 more }`

    - `availabilityPct: object { slots, avg, max, min }`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `hopsCount: TestStatOverTime`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `packetLossPct: object { slots, avg, max, min }`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `roundTripTimeMs: TestStatOverTime`

    - `uniqueDevicesTotal: number`

      Count of unique devices that have run this test in the given time period.

  - `tracerouteStatsByColo: optional array of object { availabilityPct, colo, hopsCount, 3 more }`

    - `availabilityPct: object { slots, avg, max, min }`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `colo: string`

    - `hopsCount: TestStatOverTime`

    - `packetLossPct: object { slots, avg, max, min }`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `roundTripTimeMs: TestStatOverTime`

    - `uniqueDevicesTotal: number`

      Count of unique devices that have run this test in the given time period.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/traceroute-tests/$TEST_ID \
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
    "host": "1.1.1.1",
    "interval": "0h5m0s",
    "kind": "traceroute",
    "name": "Atlassian Sign In Page",
    "target_policies": [
      {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "default": true,
        "name": "name"
      }
    ],
    "targeted": true,
    "tracerouteStats": {
      "availabilityPct": {
        "slots": [
          {
            "timestamp": "2023-07-16 15:00:00+00",
            "value": 0
          }
        ],
        "avg": 0,
        "max": 0,
        "min": 0
      },
      "hopsCount": {
        "slots": [
          {
            "timestamp": "2023-07-16 15:00:00+00",
            "value": 0
          }
        ],
        "avg": 0,
        "max": 0,
        "min": 0
      },
      "packetLossPct": {
        "slots": [
          {
            "timestamp": "2023-07-16 15:00:00+00",
            "value": 0
          }
        ],
        "avg": 0,
        "max": 0,
        "min": 0
      },
      "roundTripTimeMs": {
        "slots": [
          {
            "timestamp": "2023-07-16 15:00:00+00",
            "value": 0
          }
        ],
        "avg": 0,
        "max": 0,
        "min": 0
      },
      "uniqueDevicesTotal": 57
    },
    "tracerouteStatsByColo": [
      {
        "availabilityPct": {
          "slots": [
            {
              "timestamp": "2023-07-16 15:00:00+00",
              "value": 0
            }
          ],
          "avg": 0,
          "max": 0,
          "min": 0
        },
        "colo": "DFW",
        "hopsCount": {
          "slots": [
            {
              "timestamp": "2023-07-16 15:00:00+00",
              "value": 0
            }
          ],
          "avg": 0,
          "max": 0,
          "min": 0
        },
        "packetLossPct": {
          "slots": [
            {
              "timestamp": "2023-07-16 15:00:00+00",
              "value": 0
            }
          ],
          "avg": 0,
          "max": 0,
          "min": 0
        },
        "roundTripTimeMs": {
          "slots": [
            {
              "timestamp": "2023-07-16 15:00:00+00",
              "value": 0
            }
          ],
          "avg": 0,
          "max": 0,
          "min": 0
        },
        "uniqueDevicesTotal": 57
      }
    ]
  }
}
```

## Get percentiles for a traceroute test

**get** `/accounts/{account_id}/dex/traceroute-tests/{test_id}/percentiles`

Get percentiles for a traceroute test for a given time period between 1 hour and 7 days.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

- `test_id: string`

  API Resource UUID tag.

### Query Parameters

- `from: string`

  Start time for the query in ISO (RFC3339 - ISO 8601) format.

- `to: string`

  End time for the query in ISO (RFC3339 - ISO 8601) format.

- `colo: optional string`

  Optionally filter result stats to a Cloudflare colo. Cannot be used in combination with deviceId param.

- `deviceId: optional array of string`

  Optionally filter result stats to a specific device(s). Cannot be used in combination with colo param.

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

- `result: optional object { hopsCount, packetLossPct, roundTripTimeMs }`

  - `hopsCount: optional Percentiles`

    - `p50: optional number`

      p50 observed in the time period.

    - `p90: optional number`

      p90 observed in the time period.

    - `p95: optional number`

      p95 observed in the time period.

    - `p99: optional number`

      p99 observed in the time period.

  - `packetLossPct: optional Percentiles`

  - `roundTripTimeMs: optional Percentiles`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/traceroute-tests/$TEST_ID/percentiles \
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
    "hopsCount": {
      "p50": 0,
      "p90": 0,
      "p95": 0,
      "p99": 0
    },
    "packetLossPct": {
      "p50": 0,
      "p90": 0,
      "p95": 0,
      "p99": 0
    },
    "roundTripTimeMs": {
      "p50": 0,
      "p90": 0,
      "p95": 0,
      "p99": 0
    }
  }
}
```

## Get network path breakdown for a traceroute test

**get** `/accounts/{account_id}/dex/traceroute-tests/{test_id}/network-path`

Get a breakdown of metrics by hop for individual traceroute test runs.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

- `test_id: string`

  API Resource UUID tag.

### Query Parameters

- `deviceId: string`

  Device to filter traceroute result runs to.

- `from: string`

  Start time for aggregate metrics in ISO ms.

- `interval: "minute" or "hour"`

  Time interval for aggregate time slots.

  - `"minute"`

  - `"hour"`

- `to: string`

  End time for aggregate metrics in ISO ms.

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

- `result: optional NetworkPathResponse`

  - `id: string`

    API Resource UUID tag.

  - `deviceName: optional string`

    Name of the device that ran the test.

  - `interval: optional string`

    The interval at which the Traceroute synthetic application test is set to run.

  - `kind: optional "traceroute"`

    - `"traceroute"`

  - `name: optional string`

  - `networkPath: optional NetworkPath`

    - `slots: array of object { id, clientToAppRttMs, clientToCfEgressRttMs, 3 more }`

      - `id: string`

        API Resource UUID tag.

      - `clientToAppRttMs: number`

        Round trip time in ms of the client to app mile

      - `clientToCfEgressRttMs: number`

        Round trip time in ms of the client to Cloudflare egress mile

      - `clientToCfIngressRttMs: number`

        Round trip time in ms of the client to Cloudflare ingress mile

      - `timestamp: string`

      - `clientToIspRttMs: optional number`

        Round trip time in ms of the client to ISP mile

    - `sampling: optional object { unit, value }`

      Specifies the sampling applied, if any, to the slots response. When sampled, results shown represent the first test run to the start of each sampling interval.

      - `unit: "hours"`

        - `"hours"`

      - `value: number`

  - `url: optional string`

    The host of the Traceroute synthetic application test.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/traceroute-tests/$TEST_ID/network-path \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "deviceName": "deviceName",
    "interval": "0h5m0s",
    "kind": "traceroute",
    "name": "name",
    "networkPath": {
      "slots": [
        {
          "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
          "clientToAppRttMs": 0,
          "clientToCfEgressRttMs": 0,
          "clientToCfIngressRttMs": 0,
          "timestamp": "2023-07-16 15:00:00+00",
          "clientToIspRttMs": 0
        }
      ],
      "sampling": {
        "unit": "hours",
        "value": 0
      }
    },
    "url": "1.1.1.1"
  }
}
```

## Domain Types

### Traceroute

- `Traceroute object { host, interval, kind, 5 more }`

  - `host: string`

    The host of the Traceroute synthetic application test.

  - `interval: string`

    The interval at which the Traceroute synthetic application test is set to run.

  - `kind: "traceroute"`

    - `"traceroute"`

  - `name: string`

    The name of the Traceroute synthetic application test.

  - `target_policies: optional array of DigitalExperienceMonitor`

    - `id: string`

      API Resource UUID tag.

    - `default: boolean`

      Whether the policy is the default for the account.

    - `name: string`

  - `targeted: optional boolean`

  - `tracerouteStats: optional object { availabilityPct, hopsCount, packetLossPct, 2 more }`

    - `availabilityPct: object { slots, avg, max, min }`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `hopsCount: TestStatOverTime`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `packetLossPct: object { slots, avg, max, min }`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `roundTripTimeMs: TestStatOverTime`

    - `uniqueDevicesTotal: number`

      Count of unique devices that have run this test in the given time period.

  - `tracerouteStatsByColo: optional array of object { availabilityPct, colo, hopsCount, 3 more }`

    - `availabilityPct: object { slots, avg, max, min }`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `colo: string`

    - `hopsCount: TestStatOverTime`

    - `packetLossPct: object { slots, avg, max, min }`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `roundTripTimeMs: TestStatOverTime`

    - `uniqueDevicesTotal: number`

      Count of unique devices that have run this test in the given time period.

### Traceroute Test Percentiles Response

- `TracerouteTestPercentilesResponse object { hopsCount, packetLossPct, roundTripTimeMs }`

  - `hopsCount: optional Percentiles`

    - `p50: optional number`

      p50 observed in the time period.

    - `p90: optional number`

      p90 observed in the time period.

    - `p95: optional number`

      p95 observed in the time period.

    - `p99: optional number`

      p99 observed in the time period.

  - `packetLossPct: optional Percentiles`

  - `roundTripTimeMs: optional Percentiles`

# Rules

## Get DEX Rule

**get** `/accounts/{account_id}/dex/rules/{rule_id}`

Get details for a DEX Rule.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

- `rule_id: string`

  API Resource UUID tag.

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

- `result: optional object { id, created_at, match, 4 more }`

  - `id: string`

    API Resource UUID tag.

  - `created_at: string`

  - `match: string`

  - `name: string`

  - `description: optional string`

  - `targeted_tests: optional array of object { data, enabled, name, test_id }`

    - `data: object { host, kind, method }`

      The configuration object which contains the details for the WARP client to conduct the test.

      - `host: string`

        The desired endpoint to test.

      - `kind: "http" or "traceroute"`

        The type of test.

        - `"http"`

        - `"traceroute"`

      - `method: optional "GET"`

        The HTTP request method type.

        - `"GET"`

    - `enabled: boolean`

    - `name: string`

    - `test_id: string`

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/rules/$RULE_ID \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2023-07-16 15:00:00+00",
    "match": "match",
    "name": "name",
    "description": "description",
    "targeted_tests": [
      {
        "data": {
          "host": "https://dash.cloudflare.com",
          "kind": "http",
          "method": "GET"
        },
        "enabled": true,
        "name": "name",
        "test_id": "test_id"
      }
    ],
    "updated_at": "2023-07-16 15:00:00+00"
  }
}
```

## Delete a DEX Rule

**delete** `/accounts/{account_id}/dex/rules/{rule_id}`

Delete a DEX Rule.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

- `rule_id: string`

  API Resource UUID tag.

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

- `result: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/rules/$RULE_ID \
    -X DELETE \
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
  "result": true
}
```

## Update a DEX Rule

**patch** `/accounts/{account_id}/dex/rules/{rule_id}`

Update a DEX Rule.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

- `rule_id: string`

  API Resource UUID tag.

### Body Parameters

- `description: optional string`

- `match: optional string`

  The wirefilter expression to match.

- `name: optional string`

  The name of the Rule.

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

- `result: optional object { id, created_at, match, 4 more }`

  - `id: string`

    API Resource UUID tag.

  - `created_at: string`

  - `match: string`

  - `name: string`

  - `description: optional string`

  - `targeted_tests: optional array of object { data, enabled, name, test_id }`

    - `data: object { host, kind, method }`

      The configuration object which contains the details for the WARP client to conduct the test.

      - `host: string`

        The desired endpoint to test.

      - `kind: "http" or "traceroute"`

        The type of test.

        - `"http"`

        - `"traceroute"`

      - `method: optional "GET"`

        The HTTP request method type.

        - `"GET"`

    - `enabled: boolean`

    - `name: string`

    - `test_id: string`

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/rules/$RULE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2023-07-16 15:00:00+00",
    "match": "match",
    "name": "name",
    "description": "description",
    "targeted_tests": [
      {
        "data": {
          "host": "https://dash.cloudflare.com",
          "kind": "http",
          "method": "GET"
        },
        "enabled": true,
        "name": "name",
        "test_id": "test_id"
      }
    ],
    "updated_at": "2023-07-16 15:00:00+00"
  }
}
```

## Create a DEX Rule

**post** `/accounts/{account_id}/dex/rules`

Create a DEX Rule.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

### Body Parameters

- `match: string`

  The wirefilter expression to match.

- `name: string`

  The name of the Rule.

- `description: optional string`

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

- `result: optional object { id, created_at, match, 4 more }`

  - `id: string`

    API Resource UUID tag.

  - `created_at: string`

  - `match: string`

  - `name: string`

  - `description: optional string`

  - `targeted_tests: optional array of object { data, enabled, name, test_id }`

    - `data: object { host, kind, method }`

      The configuration object which contains the details for the WARP client to conduct the test.

      - `host: string`

        The desired endpoint to test.

      - `kind: "http" or "traceroute"`

        The type of test.

        - `"http"`

        - `"traceroute"`

      - `method: optional "GET"`

        The HTTP request method type.

        - `"GET"`

    - `enabled: boolean`

    - `name: string`

    - `test_id: string`

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/rules \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "match": "match",
          "name": "name"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2023-07-16 15:00:00+00",
    "match": "match",
    "name": "name",
    "description": "description",
    "targeted_tests": [
      {
        "data": {
          "host": "https://dash.cloudflare.com",
          "kind": "http",
          "method": "GET"
        },
        "enabled": true,
        "name": "name",
        "test_id": "test_id"
      }
    ],
    "updated_at": "2023-07-16 15:00:00+00"
  }
}
```

## List DEX Rules

**get** `/accounts/{account_id}/dex/rules`

List DEX Rules.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

### Query Parameters

- `page: number`

  Page number of paginated results.

- `per_page: number`

  Number of results per page.

- `name: optional string`

  Filter results by rule name.

- `sort_by: optional "name" or "created_at" or "updated_at"`

  Which property to sort results by.

  - `"name"`

  - `"created_at"`

  - `"updated_at"`

- `sort_order: optional "ASC" or "DESC"`

  Sort direction for sort_by property.

  - `"ASC"`

  - `"DESC"`

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

- `result: optional object { rules }`

  - `rules: optional array of object { id, created_at, match, 4 more }`

    - `id: string`

      API Resource UUID tag.

    - `created_at: string`

    - `match: string`

    - `name: string`

    - `description: optional string`

    - `targeted_tests: optional array of object { data, enabled, name, test_id }`

      - `data: object { host, kind, method }`

        The configuration object which contains the details for the WARP client to conduct the test.

        - `host: string`

          The desired endpoint to test.

        - `kind: "http" or "traceroute"`

          The type of test.

          - `"http"`

          - `"traceroute"`

        - `method: optional "GET"`

          The HTTP request method type.

          - `"GET"`

      - `enabled: boolean`

      - `name: string`

      - `test_id: string`

    - `updated_at: optional string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/rules \
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
    "rules": [
      {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "created_at": "2023-07-16 15:00:00+00",
        "match": "match",
        "name": "name",
        "description": "description",
        "targeted_tests": [
          {
            "data": {
              "host": "https://dash.cloudflare.com",
              "kind": "http",
              "method": "GET"
            },
            "enabled": true,
            "name": "name",
            "test_id": "test_id"
          }
        ],
        "updated_at": "2023-07-16 15:00:00+00"
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

### Rule Get Response

- `RuleGetResponse object { id, created_at, match, 4 more }`

  - `id: string`

    API Resource UUID tag.

  - `created_at: string`

  - `match: string`

  - `name: string`

  - `description: optional string`

  - `targeted_tests: optional array of object { data, enabled, name, test_id }`

    - `data: object { host, kind, method }`

      The configuration object which contains the details for the WARP client to conduct the test.

      - `host: string`

        The desired endpoint to test.

      - `kind: "http" or "traceroute"`

        The type of test.

        - `"http"`

        - `"traceroute"`

      - `method: optional "GET"`

        The HTTP request method type.

        - `"GET"`

    - `enabled: boolean`

    - `name: string`

    - `test_id: string`

  - `updated_at: optional string`

### Rule Delete Response

- `RuleDeleteResponse = boolean`

### Rule Update Response

- `RuleUpdateResponse object { id, created_at, match, 4 more }`

  - `id: string`

    API Resource UUID tag.

  - `created_at: string`

  - `match: string`

  - `name: string`

  - `description: optional string`

  - `targeted_tests: optional array of object { data, enabled, name, test_id }`

    - `data: object { host, kind, method }`

      The configuration object which contains the details for the WARP client to conduct the test.

      - `host: string`

        The desired endpoint to test.

      - `kind: "http" or "traceroute"`

        The type of test.

        - `"http"`

        - `"traceroute"`

      - `method: optional "GET"`

        The HTTP request method type.

        - `"GET"`

    - `enabled: boolean`

    - `name: string`

    - `test_id: string`

  - `updated_at: optional string`

### Rule Create Response

- `RuleCreateResponse object { id, created_at, match, 4 more }`

  - `id: string`

    API Resource UUID tag.

  - `created_at: string`

  - `match: string`

  - `name: string`

  - `description: optional string`

  - `targeted_tests: optional array of object { data, enabled, name, test_id }`

    - `data: object { host, kind, method }`

      The configuration object which contains the details for the WARP client to conduct the test.

      - `host: string`

        The desired endpoint to test.

      - `kind: "http" or "traceroute"`

        The type of test.

        - `"http"`

        - `"traceroute"`

      - `method: optional "GET"`

        The HTTP request method type.

        - `"GET"`

    - `enabled: boolean`

    - `name: string`

    - `test_id: string`

  - `updated_at: optional string`

### Rule List Response

- `RuleListResponse object { rules }`

  - `rules: optional array of object { id, created_at, match, 4 more }`

    - `id: string`

      API Resource UUID tag.

    - `created_at: string`

    - `match: string`

    - `name: string`

    - `description: optional string`

    - `targeted_tests: optional array of object { data, enabled, name, test_id }`

      - `data: object { host, kind, method }`

        The configuration object which contains the details for the WARP client to conduct the test.

        - `host: string`

          The desired endpoint to test.

        - `kind: "http" or "traceroute"`

          The type of test.

          - `"http"`

          - `"traceroute"`

        - `method: optional "GET"`

          The HTTP request method type.

          - `"GET"`

      - `enabled: boolean`

      - `name: string`

      - `test_id: string`

    - `updated_at: optional string`

# Devices

# ISPs

## List device ISPs

**get** `/accounts/{account_id}/dex/devices/{device_id}/isps`

List ISP information observed for a specific device during traceroute tests.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

- `device_id: string`

  API Resource UUID tag.

### Query Parameters

- `per_page: number`

  Number of items per page

- `cursor: optional string`

  Cursor for cursor-based pagination. Mutually exclusive with page.

- `from: optional string`

  Start time for the query in ISO 8601 format.

- `page: optional number`

  Page number of paginated results. Mutually exclusive with cursor.

- `sort_by: optional "time_start"`

  The field to sort results by.

  - `"time_start"`

- `sort_order: optional "ASC" or "DESC"`

  The order to sort results.

  - `"ASC"`

  - `"DESC"`

- `to: optional string`

  End time for the query in ISO 8601 format.

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

- `result: optional ISPs`

  - `isps: array of object { test_id, test_result_id, time_start, ip }`

    - `test_id: string`

      The test that generated this result.

    - `test_result_id: string`

      The specific test result.

    - `time_start: string`

      Timestamp of when the ISP was observed.

    - `ip: optional object { address, asn, aso, 4 more }`

      IP address information for the ISP hop. Fields marked as PII-gated (`name`, `address`, `netmask`, and all `location` sub-fields) will be returned as the literal string `"REDACTED"` for callers that do not have the PII permission. `asn`, `aso`, and `version` are always returned regardless of PII access.

      - `address: optional string`

        IP address. Returned as `"REDACTED"` without PII permission.

      - `asn: optional number`

        Autonomous System Number.

      - `aso: optional string`

        Autonomous System Organization name.

      - `location: optional object { city, country_iso, state_iso, zip }`

        Geographic location information. All fields are returned as the literal string `"REDACTED"` for callers that do not have the PII permission.

        - `city: optional string`

          City name. Returned as `"REDACTED"` without PII permission.

        - `country_iso: optional string`

          Country ISO code. Returned as `"REDACTED"` without PII permission.

        - `state_iso: optional string`

          State/province ISO code. Returned as `"REDACTED"` without PII permission.

        - `zip: optional string`

          ZIP/postal code. Returned as `"REDACTED"` without PII permission.

      - `name: optional string`

        Named IP address (reverse DNS hostname when available). Returned as `"REDACTED"` without PII permission.

      - `netmask: optional string`

        Network mask. Returned as `"REDACTED"` without PII permission.

      - `version: optional number`

        IP version (`1` for IPv4, `2` for IPv6, `0` if unknown).

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/devices/$DEVICE_ID/isps \
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
    "isps": [
      {
        "test_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "test_result_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "time_start": "2024-06-01T12:00:00Z",
        "ip": {
          "address": "203.0.113.1",
          "asn": 13335,
          "aso": "CLOUDFLARENET",
          "location": {
            "city": "San Francisco",
            "country_iso": "US",
            "state_iso": "CA",
            "zip": "94107"
          },
          "name": "isp-gateway.example.com",
          "netmask": "255.255.255.0",
          "version": 1
        }
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

### ISPs

- `ISPs object { isps }`

  - `isps: array of object { test_id, test_result_id, time_start, ip }`

    - `test_id: string`

      The test that generated this result.

    - `test_result_id: string`

      The specific test result.

    - `time_start: string`

      Timestamp of when the ISP was observed.

    - `ip: optional object { address, asn, aso, 4 more }`

      IP address information for the ISP hop. Fields marked as PII-gated (`name`, `address`, `netmask`, and all `location` sub-fields) will be returned as the literal string `"REDACTED"` for callers that do not have the PII permission. `asn`, `aso`, and `version` are always returned regardless of PII access.

      - `address: optional string`

        IP address. Returned as `"REDACTED"` without PII permission.

      - `asn: optional number`

        Autonomous System Number.

      - `aso: optional string`

        Autonomous System Organization name.

      - `location: optional object { city, country_iso, state_iso, zip }`

        Geographic location information. All fields are returned as the literal string `"REDACTED"` for callers that do not have the PII permission.

        - `city: optional string`

          City name. Returned as `"REDACTED"` without PII permission.

        - `country_iso: optional string`

          Country ISO code. Returned as `"REDACTED"` without PII permission.

        - `state_iso: optional string`

          State/province ISO code. Returned as `"REDACTED"` without PII permission.

        - `zip: optional string`

          ZIP/postal code. Returned as `"REDACTED"` without PII permission.

      - `name: optional string`

        Named IP address (reverse DNS hostname when available). Returned as `"REDACTED"` without PII permission.

      - `netmask: optional string`

        Network mask. Returned as `"REDACTED"` without PII permission.

      - `version: optional number`

        IP version (`1` for IPv4, `2` for IPv6, `0` if unknown).
