# Settings

## Get device settings for a Zero Trust account

**get** `/accounts/{account_id}/devices/settings`

Describes the current device settings for a Zero Trust account.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: DeviceSettings`

  - `disable_for_time: optional number`

    Sets the time limit, in seconds, that a user can use an override code to bypass WARP.

  - `external_emergency_signal_enabled: optional boolean`

    Controls whether the external emergency disconnect feature is enabled.

  - `external_emergency_signal_fingerprint: optional string`

    The SHA256 fingerprint (64 hexadecimal characters) of the HTTPS server certificate for the external_emergency_signal_url. If provided, the WARP client will use this value to verify the server's identity. The device will ignore any response if the server's certificate fingerprint does not exactly match this value.

  - `external_emergency_signal_interval: optional string`

    The interval at which the WARP client fetches the emergency disconnect signal, formatted as a duration string (e.g., "5m", "2m30s", "1h"). Minimum 30 seconds.

  - `external_emergency_signal_url: optional string`

    The HTTPS URL from which to fetch the emergency disconnect signal. Must use HTTPS and have an IPv4 or IPv6 address as the host.

  - `gateway_proxy_enabled: optional boolean`

    Enable gateway proxy filtering on TCP.

  - `gateway_udp_proxy_enabled: optional boolean`

    Enable gateway proxy filtering on UDP.

  - `root_certificate_installation_enabled: optional boolean`

    Enable installation of cloudflare managed root certificate.

  - `use_zt_virtual_ip: optional boolean`

    Enable using CGNAT virtual IPv4.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/settings \
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
  "result": {
    "disable_for_time": 0,
    "external_emergency_signal_enabled": true,
    "external_emergency_signal_fingerprint": "abcd1234567890abcd1234567890abcd1234567890abcd1234567890abcd1234",
    "external_emergency_signal_interval": "5m",
    "external_emergency_signal_url": "https://192.0.2.1/signal",
    "gateway_proxy_enabled": true,
    "gateway_udp_proxy_enabled": true,
    "root_certificate_installation_enabled": true,
    "use_zt_virtual_ip": true
  },
  "success": true
}
```

## Update device settings for a Zero Trust account

**put** `/accounts/{account_id}/devices/settings`

Updates the current device settings for a Zero Trust account.

### Path Parameters

- `account_id: string`

### Body Parameters

- `disable_for_time: optional number`

  Sets the time limit, in seconds, that a user can use an override code to bypass WARP.

- `external_emergency_signal_enabled: optional boolean`

  Controls whether the external emergency disconnect feature is enabled.

- `external_emergency_signal_fingerprint: optional string`

  The SHA256 fingerprint (64 hexadecimal characters) of the HTTPS server certificate for the external_emergency_signal_url. If provided, the WARP client will use this value to verify the server's identity. The device will ignore any response if the server's certificate fingerprint does not exactly match this value.

- `external_emergency_signal_interval: optional string`

  The interval at which the WARP client fetches the emergency disconnect signal, formatted as a duration string (e.g., "5m", "2m30s", "1h"). Minimum 30 seconds.

- `external_emergency_signal_url: optional string`

  The HTTPS URL from which to fetch the emergency disconnect signal. Must use HTTPS and have an IPv4 or IPv6 address as the host.

- `gateway_proxy_enabled: optional boolean`

  Enable gateway proxy filtering on TCP.

- `gateway_udp_proxy_enabled: optional boolean`

  Enable gateway proxy filtering on UDP.

- `root_certificate_installation_enabled: optional boolean`

  Enable installation of cloudflare managed root certificate.

- `use_zt_virtual_ip: optional boolean`

  Enable using CGNAT virtual IPv4.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: DeviceSettings`

  - `disable_for_time: optional number`

    Sets the time limit, in seconds, that a user can use an override code to bypass WARP.

  - `external_emergency_signal_enabled: optional boolean`

    Controls whether the external emergency disconnect feature is enabled.

  - `external_emergency_signal_fingerprint: optional string`

    The SHA256 fingerprint (64 hexadecimal characters) of the HTTPS server certificate for the external_emergency_signal_url. If provided, the WARP client will use this value to verify the server's identity. The device will ignore any response if the server's certificate fingerprint does not exactly match this value.

  - `external_emergency_signal_interval: optional string`

    The interval at which the WARP client fetches the emergency disconnect signal, formatted as a duration string (e.g., "5m", "2m30s", "1h"). Minimum 30 seconds.

  - `external_emergency_signal_url: optional string`

    The HTTPS URL from which to fetch the emergency disconnect signal. Must use HTTPS and have an IPv4 or IPv6 address as the host.

  - `gateway_proxy_enabled: optional boolean`

    Enable gateway proxy filtering on TCP.

  - `gateway_udp_proxy_enabled: optional boolean`

    Enable gateway proxy filtering on UDP.

  - `root_certificate_installation_enabled: optional boolean`

    Enable installation of cloudflare managed root certificate.

  - `use_zt_virtual_ip: optional boolean`

    Enable using CGNAT virtual IPv4.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/settings \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "external_emergency_signal_enabled": true,
          "external_emergency_signal_fingerprint": "abcd1234567890abcd1234567890abcd1234567890abcd1234567890abcd1234",
          "external_emergency_signal_interval": "5m",
          "external_emergency_signal_url": "https://192.0.2.1/signal",
          "gateway_proxy_enabled": true,
          "gateway_udp_proxy_enabled": true,
          "root_certificate_installation_enabled": true,
          "use_zt_virtual_ip": true
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
  "result": {
    "disable_for_time": 0,
    "external_emergency_signal_enabled": true,
    "external_emergency_signal_fingerprint": "abcd1234567890abcd1234567890abcd1234567890abcd1234567890abcd1234",
    "external_emergency_signal_interval": "5m",
    "external_emergency_signal_url": "https://192.0.2.1/signal",
    "gateway_proxy_enabled": true,
    "gateway_udp_proxy_enabled": true,
    "root_certificate_installation_enabled": true,
    "use_zt_virtual_ip": true
  },
  "success": true
}
```

## Patch device settings for a Zero Trust account

**patch** `/accounts/{account_id}/devices/settings`

Patches the current device settings for a Zero Trust account.

### Path Parameters

- `account_id: string`

### Body Parameters

- `disable_for_time: optional number`

  Sets the time limit, in seconds, that a user can use an override code to bypass WARP.

- `external_emergency_signal_enabled: optional boolean`

  Controls whether the external emergency disconnect feature is enabled.

- `external_emergency_signal_fingerprint: optional string`

  The SHA256 fingerprint (64 hexadecimal characters) of the HTTPS server certificate for the external_emergency_signal_url. If provided, the WARP client will use this value to verify the server's identity. The device will ignore any response if the server's certificate fingerprint does not exactly match this value.

- `external_emergency_signal_interval: optional string`

  The interval at which the WARP client fetches the emergency disconnect signal, formatted as a duration string (e.g., "5m", "2m30s", "1h"). Minimum 30 seconds.

- `external_emergency_signal_url: optional string`

  The HTTPS URL from which to fetch the emergency disconnect signal. Must use HTTPS and have an IPv4 or IPv6 address as the host.

- `gateway_proxy_enabled: optional boolean`

  Enable gateway proxy filtering on TCP.

- `gateway_udp_proxy_enabled: optional boolean`

  Enable gateway proxy filtering on UDP.

- `root_certificate_installation_enabled: optional boolean`

  Enable installation of cloudflare managed root certificate.

- `use_zt_virtual_ip: optional boolean`

  Enable using CGNAT virtual IPv4.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: DeviceSettings`

  - `disable_for_time: optional number`

    Sets the time limit, in seconds, that a user can use an override code to bypass WARP.

  - `external_emergency_signal_enabled: optional boolean`

    Controls whether the external emergency disconnect feature is enabled.

  - `external_emergency_signal_fingerprint: optional string`

    The SHA256 fingerprint (64 hexadecimal characters) of the HTTPS server certificate for the external_emergency_signal_url. If provided, the WARP client will use this value to verify the server's identity. The device will ignore any response if the server's certificate fingerprint does not exactly match this value.

  - `external_emergency_signal_interval: optional string`

    The interval at which the WARP client fetches the emergency disconnect signal, formatted as a duration string (e.g., "5m", "2m30s", "1h"). Minimum 30 seconds.

  - `external_emergency_signal_url: optional string`

    The HTTPS URL from which to fetch the emergency disconnect signal. Must use HTTPS and have an IPv4 or IPv6 address as the host.

  - `gateway_proxy_enabled: optional boolean`

    Enable gateway proxy filtering on TCP.

  - `gateway_udp_proxy_enabled: optional boolean`

    Enable gateway proxy filtering on UDP.

  - `root_certificate_installation_enabled: optional boolean`

    Enable installation of cloudflare managed root certificate.

  - `use_zt_virtual_ip: optional boolean`

    Enable using CGNAT virtual IPv4.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/settings \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "external_emergency_signal_enabled": true,
          "external_emergency_signal_fingerprint": "abcd1234567890abcd1234567890abcd1234567890abcd1234567890abcd1234",
          "external_emergency_signal_interval": "5m",
          "external_emergency_signal_url": "https://192.0.2.1/signal",
          "gateway_proxy_enabled": true,
          "gateway_udp_proxy_enabled": true,
          "root_certificate_installation_enabled": true,
          "use_zt_virtual_ip": true
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
  "result": {
    "disable_for_time": 0,
    "external_emergency_signal_enabled": true,
    "external_emergency_signal_fingerprint": "abcd1234567890abcd1234567890abcd1234567890abcd1234567890abcd1234",
    "external_emergency_signal_interval": "5m",
    "external_emergency_signal_url": "https://192.0.2.1/signal",
    "gateway_proxy_enabled": true,
    "gateway_udp_proxy_enabled": true,
    "root_certificate_installation_enabled": true,
    "use_zt_virtual_ip": true
  },
  "success": true
}
```

## Reset device settings for a Zero Trust account with defaults. This turns off all proxying.

**delete** `/accounts/{account_id}/devices/settings`

Resets the current device settings for a Zero Trust account.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: DeviceSettings`

  - `disable_for_time: optional number`

    Sets the time limit, in seconds, that a user can use an override code to bypass WARP.

  - `external_emergency_signal_enabled: optional boolean`

    Controls whether the external emergency disconnect feature is enabled.

  - `external_emergency_signal_fingerprint: optional string`

    The SHA256 fingerprint (64 hexadecimal characters) of the HTTPS server certificate for the external_emergency_signal_url. If provided, the WARP client will use this value to verify the server's identity. The device will ignore any response if the server's certificate fingerprint does not exactly match this value.

  - `external_emergency_signal_interval: optional string`

    The interval at which the WARP client fetches the emergency disconnect signal, formatted as a duration string (e.g., "5m", "2m30s", "1h"). Minimum 30 seconds.

  - `external_emergency_signal_url: optional string`

    The HTTPS URL from which to fetch the emergency disconnect signal. Must use HTTPS and have an IPv4 or IPv6 address as the host.

  - `gateway_proxy_enabled: optional boolean`

    Enable gateway proxy filtering on TCP.

  - `gateway_udp_proxy_enabled: optional boolean`

    Enable gateway proxy filtering on UDP.

  - `root_certificate_installation_enabled: optional boolean`

    Enable installation of cloudflare managed root certificate.

  - `use_zt_virtual_ip: optional boolean`

    Enable using CGNAT virtual IPv4.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/settings \
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
  "result": {
    "disable_for_time": 0,
    "external_emergency_signal_enabled": true,
    "external_emergency_signal_fingerprint": "abcd1234567890abcd1234567890abcd1234567890abcd1234567890abcd1234",
    "external_emergency_signal_interval": "5m",
    "external_emergency_signal_url": "https://192.0.2.1/signal",
    "gateway_proxy_enabled": true,
    "gateway_udp_proxy_enabled": true,
    "root_certificate_installation_enabled": true,
    "use_zt_virtual_ip": true
  },
  "success": true
}
```

## Domain Types

### Device Settings

- `DeviceSettings object { disable_for_time, external_emergency_signal_enabled, external_emergency_signal_fingerprint, 6 more }`

  - `disable_for_time: optional number`

    Sets the time limit, in seconds, that a user can use an override code to bypass WARP.

  - `external_emergency_signal_enabled: optional boolean`

    Controls whether the external emergency disconnect feature is enabled.

  - `external_emergency_signal_fingerprint: optional string`

    The SHA256 fingerprint (64 hexadecimal characters) of the HTTPS server certificate for the external_emergency_signal_url. If provided, the WARP client will use this value to verify the server's identity. The device will ignore any response if the server's certificate fingerprint does not exactly match this value.

  - `external_emergency_signal_interval: optional string`

    The interval at which the WARP client fetches the emergency disconnect signal, formatted as a duration string (e.g., "5m", "2m30s", "1h"). Minimum 30 seconds.

  - `external_emergency_signal_url: optional string`

    The HTTPS URL from which to fetch the emergency disconnect signal. Must use HTTPS and have an IPv4 or IPv6 address as the host.

  - `gateway_proxy_enabled: optional boolean`

    Enable gateway proxy filtering on TCP.

  - `gateway_udp_proxy_enabled: optional boolean`

    Enable gateway proxy filtering on UDP.

  - `root_certificate_installation_enabled: optional boolean`

    Enable installation of cloudflare managed root certificate.

  - `use_zt_virtual_ip: optional boolean`

    Enable using CGNAT virtual IPv4.
