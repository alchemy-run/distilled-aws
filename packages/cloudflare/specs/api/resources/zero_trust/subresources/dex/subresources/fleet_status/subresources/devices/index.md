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
