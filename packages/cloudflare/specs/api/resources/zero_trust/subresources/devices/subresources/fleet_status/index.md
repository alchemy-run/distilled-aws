# Fleet Status

## Get the latest status of a device.

**get** `/accounts/{account_id}/dex/devices/{device_id}/fleet-status/live`

Get the latest status of a device given device_id from the device_state table.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

- `device_id: string`

  Unique identifier for the physical device (UUID).

### Query Parameters

- `since_minutes: number`

  Number of minutes before current time.

- `colo: optional string`

  List of data centers to filter results.

- `time_now: optional string`

  Current time in ISO format.

### Returns

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/devices/$DEVICE_ID/fleet-status/live \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
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
```

## Domain Types

### Fleet Status Get Response

- `FleetStatusGetResponse object { colo, deviceId, mode, 40 more }`

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
