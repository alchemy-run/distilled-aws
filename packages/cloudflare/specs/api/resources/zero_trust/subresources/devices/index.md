# Devices

## List devices (deprecated)

**get** `/accounts/{account_id}/devices`

List WARP devices. Not supported when [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/) is enabled for the account.

**Deprecated**: please use one of the following endpoints instead:

- GET /accounts/{account_id}/devices/physical-devices
- GET /accounts/{account_id}/devices/registrations

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

- `result: array of Device`

  - `id: optional string`

    Registration ID. Equal to Device ID except for accounts which enabled [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/).

  - `created: optional string`

    When the device was created.

  - `deleted: optional boolean`

    True if the device was deleted.

  - `device_type: optional "windows" or "mac" or "linux" or 3 more`

    - `"windows"`

    - `"mac"`

    - `"linux"`

    - `"android"`

    - `"ios"`

    - `"chromeos"`

  - `ip: optional string`

    IPv4 or IPv6 address.

  - `key: optional string`

    The device's public key.

  - `last_seen: optional string`

    When the device last connected to Cloudflare services.

  - `mac_address: optional string`

    The device mac address.

  - `manufacturer: optional string`

    The device manufacturer name.

  - `model: optional string`

    The device model name.

  - `name: optional string`

    The device name.

  - `os_distro_name: optional string`

    The Linux distro name.

  - `os_distro_revision: optional string`

    The Linux distro revision.

  - `os_version: optional string`

    The operating system version.

  - `os_version_extra: optional string`

    Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

  - `revoked_at: optional string`

    When the device was revoked.

  - `serial_number: optional string`

    The device serial number.

  - `updated: optional string`

    When the device was updated.

  - `user: optional object { id, email, name }`

    - `id: optional string`

      UUID.

    - `email: optional string`

      The contact email address of the user.

    - `name: optional string`

      The enrolled device user's name.

  - `version: optional string`

    The WARP client version.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices \
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
  "result": [
    {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "created": "2017-06-14T00:00:00Z",
      "deleted": true,
      "device_type": "windows",
      "ip": "1.1.1.1",
      "key": "yek0SUYoOQ10vMGsIYAevozXUQpQtNFJFfFGqER/BGc=",
      "last_seen": "2017-06-14T00:00:00Z",
      "mac_address": "00-00-5E-00-53-00",
      "manufacturer": "My phone corp",
      "model": "MyPhone(pro-X)",
      "name": "My mobile device",
      "os_distro_name": "ubuntu",
      "os_distro_revision": "1.0.0",
      "os_version": "10.0.0",
      "os_version_extra": "(a) or 6889 or Ubuntu 24.04",
      "revoked_at": "2017-06-14T00:00:00Z",
      "serial_number": "EXAMPLEHMD6R",
      "updated": "2017-06-14T00:00:00Z",
      "user": {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "email": "user@example.com",
        "name": "John Appleseed"
      },
      "version": "1.0.0"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get device (deprecated)

**get** `/accounts/{account_id}/devices/{device_id}`

Fetches a single WARP device. Not supported when [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/) is enabled for the account.

**Deprecated**: please use one of the following endpoints instead:

- GET /accounts/{account_id}/devices/physical-devices/{device_id}
- GET /accounts/{account_id}/devices/registrations/{registration_id}

### Path Parameters

- `account_id: string`

- `device_id: string`

  Registration ID. Equal to Device ID except for accounts which enabled [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/).

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

- `result: object { id, account, created, 16 more }`

  - `id: optional string`

    Registration ID. Equal to Device ID except for accounts which enabled [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/).

  - `account: optional object { id, account_type, name }`

    - `id: optional string`

    - `account_type: optional string`

    - `name: optional string`

      The name of the enrolled account.

  - `created: optional string`

    When the device was created.

  - `deleted: optional boolean`

    True if the device was deleted.

  - `device_type: optional string`

  - `gateway_device_id: optional string`

  - `ip: optional string`

    IPv4 or IPv6 address.

  - `key: optional string`

    The device's public key.

  - `key_type: optional string`

    Type of the key.

  - `last_seen: optional string`

    When the device last connected to Cloudflare services.

  - `mac_address: optional string`

    The device mac address.

  - `model: optional string`

    The device model name.

  - `name: optional string`

    The device name.

  - `os_version: optional string`

    The operating system version.

  - `serial_number: optional string`

    The device serial number.

  - `tunnel_type: optional string`

    Type of the tunnel connection used.

  - `updated: optional string`

    When the device was updated.

  - `user: optional object { id, email, name }`

    - `id: optional string`

      UUID.

    - `email: optional string`

      The contact email address of the user.

    - `name: optional string`

      The enrolled device user's name.

  - `version: optional string`

    The WARP client version.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/$DEVICE_ID \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "account": {
      "id": "id",
      "account_type": "account_type",
      "name": "Company"
    },
    "created": "2017-06-14T00:00:00Z",
    "deleted": true,
    "device_type": "windows",
    "gateway_device_id": "PD33E90AXfafe14643cbbbc-4a0ed4fc8415Q",
    "ip": "1.1.1.1",
    "key": "yek0SUYoOQ10vMGsIYAevozXUQpQtNFJFfFGqER/BGc=",
    "key_type": "curve25519",
    "last_seen": "2017-06-14T00:00:00Z",
    "mac_address": "00-00-5E-00-53-00",
    "model": "MyPhone(pro-X)",
    "name": "My mobile device",
    "os_version": "10.0.0",
    "serial_number": "EXAMPLEHMD6R",
    "tunnel_type": "masque",
    "updated": "2017-06-14T00:00:00Z",
    "user": {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "email": "user@example.com",
      "name": "John Appleseed"
    },
    "version": "1.0.0"
  },
  "success": true
}
```

## Domain Types

### Device

- `Device object { id, created, deleted, 17 more }`

  - `id: optional string`

    Registration ID. Equal to Device ID except for accounts which enabled [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/).

  - `created: optional string`

    When the device was created.

  - `deleted: optional boolean`

    True if the device was deleted.

  - `device_type: optional "windows" or "mac" or "linux" or 3 more`

    - `"windows"`

    - `"mac"`

    - `"linux"`

    - `"android"`

    - `"ios"`

    - `"chromeos"`

  - `ip: optional string`

    IPv4 or IPv6 address.

  - `key: optional string`

    The device's public key.

  - `last_seen: optional string`

    When the device last connected to Cloudflare services.

  - `mac_address: optional string`

    The device mac address.

  - `manufacturer: optional string`

    The device manufacturer name.

  - `model: optional string`

    The device model name.

  - `name: optional string`

    The device name.

  - `os_distro_name: optional string`

    The Linux distro name.

  - `os_distro_revision: optional string`

    The Linux distro revision.

  - `os_version: optional string`

    The operating system version.

  - `os_version_extra: optional string`

    Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

  - `revoked_at: optional string`

    When the device was revoked.

  - `serial_number: optional string`

    The device serial number.

  - `updated: optional string`

    When the device was updated.

  - `user: optional object { id, email, name }`

    - `id: optional string`

      UUID.

    - `email: optional string`

      The contact email address of the user.

    - `name: optional string`

      The enrolled device user's name.

  - `version: optional string`

    The WARP client version.

### Device Get Response

- `DeviceGetResponse object { id, account, created, 16 more }`

  - `id: optional string`

    Registration ID. Equal to Device ID except for accounts which enabled [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/).

  - `account: optional object { id, account_type, name }`

    - `id: optional string`

    - `account_type: optional string`

    - `name: optional string`

      The name of the enrolled account.

  - `created: optional string`

    When the device was created.

  - `deleted: optional boolean`

    True if the device was deleted.

  - `device_type: optional string`

  - `gateway_device_id: optional string`

  - `ip: optional string`

    IPv4 or IPv6 address.

  - `key: optional string`

    The device's public key.

  - `key_type: optional string`

    Type of the key.

  - `last_seen: optional string`

    When the device last connected to Cloudflare services.

  - `mac_address: optional string`

    The device mac address.

  - `model: optional string`

    The device model name.

  - `name: optional string`

    The device name.

  - `os_version: optional string`

    The operating system version.

  - `serial_number: optional string`

    The device serial number.

  - `tunnel_type: optional string`

    Type of the tunnel connection used.

  - `updated: optional string`

    When the device was updated.

  - `user: optional object { id, email, name }`

    - `id: optional string`

      UUID.

    - `email: optional string`

      The contact email address of the user.

    - `name: optional string`

      The enrolled device user's name.

  - `version: optional string`

    The WARP client version.

# Devices

## List devices

**get** `/accounts/{account_id}/devices/physical-devices`

Lists WARP devices.

### Path Parameters

- `account_id: string`

### Query Parameters

- `id: optional array of string`

  Filter by a one or more device IDs.

- `active_registrations: optional "include" or "only" or "exclude"`

  Include or exclude devices with active registrations. The default is "only" - return only devices with active registrations.

  - `"include"`

  - `"only"`

  - `"exclude"`

- `cursor: optional string`

  Opaque token indicating the starting position when requesting the next set of records. A cursor value can be obtained from the result_info.cursor field in the response.

- `include: optional string`

  Comma-separated list of additional information that should be included in the device response. Supported values are: "last_seen_registration.policy".

- `last_seen_user: optional object { email }`

  - `email: optional string`

    Filter by the last seen user's email.

- `per_page: optional number`

  The maximum number of devices to return in a single response.

- `search: optional string`

  Search by device details.

- `seen_after: optional string`

  Filter by the last_seen timestamp - returns only devices last seen after this timestamp.

- `seen_before: optional string`

  Filter by the last_seen timestamp - returns only devices last seen before this timestamp.

- `sort_by: optional "name" or "id" or "client_version" or 4 more`

  The device field to order results by.

  - `"name"`

  - `"id"`

  - `"client_version"`

  - `"last_seen_user.email"`

  - `"last_seen_at"`

  - `"active_registrations"`

  - `"created_at"`

- `sort_order: optional "asc" or "desc"`

  Sort direction.

  - `"asc"`

  - `"desc"`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: array of object { id, active_registrations, created_at, 16 more }`

  - `id: string`

    The unique ID of the device.

  - `active_registrations: number`

    The number of active registrations for the device. Active registrations are those which haven't been revoked or deleted.

  - `created_at: string`

    The RFC3339 timestamp when the device was created.

  - `last_seen_at: string`

    The RFC3339 timestamp when the device was last seen.

  - `name: string`

    The name of the device.

  - `updated_at: string`

    The RFC3339 timestamp when the device was last updated.

  - `client_version: optional string`

    Version of the WARP client.

  - `deleted_at: optional string`

    The RFC3339 timestamp when the device was deleted.

  - `device_type: optional string`

    The device operating system.

  - `hardware_id: optional string`

    A string that uniquely identifies the hardware or virtual machine (VM).

  - `last_seen_registration: optional object { policy }`

    The last seen registration for the device.

    - `policy: optional object { id, default, deleted, 2 more }`

      A summary of the device profile evaluated for the registration.

      - `id: string`

        The ID of the device settings profile.

      - `default: boolean`

        Whether the device settings profile is the default profile for the account.

      - `deleted: boolean`

        Whether the device settings profile was deleted.

      - `name: string`

        The name of the device settings profile.

      - `updated_at: string`

        The RFC3339 timestamp of when the device settings profile last changed for the registration.

  - `last_seen_user: optional object { id, email, name }`

    The last user to use the WARP device.

    - `id: optional string`

      UUID.

    - `email: optional string`

      The contact email address of the user.

    - `name: optional string`

      The enrolled device user's name.

  - `mac_address: optional string`

    The device MAC address.

  - `manufacturer: optional string`

    The device manufacturer.

  - `model: optional string`

    The model name of the device.

  - `os_version: optional string`

    The device operating system version number.

  - `os_version_extra: optional string`

    Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

  - `public_ip: optional string`

    **Deprecated**: IP information is provided by DEX - see https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/fleet_status/subresources/devices/methods/list/

  - `serial_number: optional string`

    The device serial number.

- `success: boolean`

  Whether the API call was successful.

- `result_info: optional object { count, cursor, per_page, total_count }`

  V4 public API Pagination/Cursor info.

  - `count: number`

    Number of records in the response.

  - `cursor: string`

    Opaque token to request the next set of records.

  - `per_page: number`

    The limit for the number of records in the response.

  - `total_count: optional number`

    Total number of records available.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/physical-devices \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": [
    {
      "id": "fc9ab6ab-3b94-4319-9941-459462b3d73e",
      "active_registrations": 1,
      "created_at": "2025-02-14T13:17:00Z",
      "last_seen_at": "2025-02-14T13:17:00Z",
      "name": "My Device",
      "updated_at": "2025-02-14T13:17:00Z",
      "client_version": "1.0.0",
      "deleted_at": "2025-02-14T13:17:00Z",
      "device_type": "linux",
      "hardware_id": "hardware_id",
      "last_seen_registration": {
        "policy": {
          "id": "11ffb86f-3f0c-4306-b4a2-e62f872b166a",
          "default": true,
          "deleted": true,
          "name": "name",
          "updated_at": "2025-02-14T13:17:00Z"
        }
      },
      "last_seen_user": {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "email": "user@example.com",
        "name": "John Appleseed"
      },
      "mac_address": "f5:01:73:cf:12:23",
      "manufacturer": "ACME",
      "model": "Mark VII",
      "os_version": "os_version",
      "os_version_extra": "os_version_extra",
      "public_ip": "1.1.1.1",
      "serial_number": "ABS765ASD8A"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "cursor": "ais86dftf.asdf7ba8",
    "per_page": 10,
    "total_count": null
  }
}
```

## Get device

**get** `/accounts/{account_id}/devices/physical-devices/{device_id}`

Fetches a single WARP device.

### Path Parameters

- `account_id: string`

- `device_id: string`

### Query Parameters

- `include: optional string`

  Comma-separated list of additional information that should be included in the device response. Supported values are: "last_seen_registration.policy".

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { id, active_registrations, created_at, 16 more }`

  A WARP Device.

  - `id: string`

    The unique ID of the device.

  - `active_registrations: number`

    The number of active registrations for the device. Active registrations are those which haven't been revoked or deleted.

  - `created_at: string`

    The RFC3339 timestamp when the device was created.

  - `last_seen_at: string`

    The RFC3339 timestamp when the device was last seen.

  - `name: string`

    The name of the device.

  - `updated_at: string`

    The RFC3339 timestamp when the device was last updated.

  - `client_version: optional string`

    Version of the WARP client.

  - `deleted_at: optional string`

    The RFC3339 timestamp when the device was deleted.

  - `device_type: optional string`

    The device operating system.

  - `hardware_id: optional string`

    A string that uniquely identifies the hardware or virtual machine (VM).

  - `last_seen_registration: optional object { policy }`

    The last seen registration for the device.

    - `policy: optional object { id, default, deleted, 2 more }`

      A summary of the device profile evaluated for the registration.

      - `id: string`

        The ID of the device settings profile.

      - `default: boolean`

        Whether the device settings profile is the default profile for the account.

      - `deleted: boolean`

        Whether the device settings profile was deleted.

      - `name: string`

        The name of the device settings profile.

      - `updated_at: string`

        The RFC3339 timestamp of when the device settings profile last changed for the registration.

  - `last_seen_user: optional object { id, email, name }`

    The last user to use the WARP device.

    - `id: optional string`

      UUID.

    - `email: optional string`

      The contact email address of the user.

    - `name: optional string`

      The enrolled device user's name.

  - `mac_address: optional string`

    The device MAC address.

  - `manufacturer: optional string`

    The device manufacturer.

  - `model: optional string`

    The model name of the device.

  - `os_version: optional string`

    The device operating system version number.

  - `os_version_extra: optional string`

    Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

  - `public_ip: optional string`

    **Deprecated**: IP information is provided by DEX - see https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/fleet_status/subresources/devices/methods/list/

  - `serial_number: optional string`

    The device serial number.

- `success: boolean`

  Whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/physical-devices/$DEVICE_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "fc9ab6ab-3b94-4319-9941-459462b3d73e",
    "active_registrations": 1,
    "created_at": "2025-02-14T13:17:00Z",
    "last_seen_at": "2025-02-14T13:17:00Z",
    "name": "My Device",
    "updated_at": "2025-02-14T13:17:00Z",
    "client_version": "1.0.0",
    "deleted_at": "2025-02-14T13:17:00Z",
    "device_type": "linux",
    "hardware_id": "hardware_id",
    "last_seen_registration": {
      "policy": {
        "id": "11ffb86f-3f0c-4306-b4a2-e62f872b166a",
        "default": true,
        "deleted": true,
        "name": "name",
        "updated_at": "2025-02-14T13:17:00Z"
      }
    },
    "last_seen_user": {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "email": "user@example.com",
      "name": "John Appleseed"
    },
    "mac_address": "f5:01:73:cf:12:23",
    "manufacturer": "ACME",
    "model": "Mark VII",
    "os_version": "os_version",
    "os_version_extra": "os_version_extra",
    "public_ip": "1.1.1.1",
    "serial_number": "ABS765ASD8A"
  },
  "success": true
}
```

## Delete device

**delete** `/accounts/{account_id}/devices/physical-devices/{device_id}`

Deletes a WARP device.

### Path Parameters

- `account_id: string`

- `device_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `success: boolean`

  Whether the API call was successful.

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/physical-devices/$DEVICE_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "success": true,
  "result": {}
}
```

## Revoke device registrations

**post** `/accounts/{account_id}/devices/physical-devices/{device_id}/revoke`

Revokes all WARP registrations associated with the specified device.

### Path Parameters

- `account_id: string`

- `device_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `success: boolean`

  Whether the API call was successful.

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/physical-devices/$DEVICE_ID/revoke \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "success": true,
  "result": {}
}
```

## Domain Types

### Device List Response

- `DeviceListResponse object { id, active_registrations, created_at, 16 more }`

  A WARP Device.

  - `id: string`

    The unique ID of the device.

  - `active_registrations: number`

    The number of active registrations for the device. Active registrations are those which haven't been revoked or deleted.

  - `created_at: string`

    The RFC3339 timestamp when the device was created.

  - `last_seen_at: string`

    The RFC3339 timestamp when the device was last seen.

  - `name: string`

    The name of the device.

  - `updated_at: string`

    The RFC3339 timestamp when the device was last updated.

  - `client_version: optional string`

    Version of the WARP client.

  - `deleted_at: optional string`

    The RFC3339 timestamp when the device was deleted.

  - `device_type: optional string`

    The device operating system.

  - `hardware_id: optional string`

    A string that uniquely identifies the hardware or virtual machine (VM).

  - `last_seen_registration: optional object { policy }`

    The last seen registration for the device.

    - `policy: optional object { id, default, deleted, 2 more }`

      A summary of the device profile evaluated for the registration.

      - `id: string`

        The ID of the device settings profile.

      - `default: boolean`

        Whether the device settings profile is the default profile for the account.

      - `deleted: boolean`

        Whether the device settings profile was deleted.

      - `name: string`

        The name of the device settings profile.

      - `updated_at: string`

        The RFC3339 timestamp of when the device settings profile last changed for the registration.

  - `last_seen_user: optional object { id, email, name }`

    The last user to use the WARP device.

    - `id: optional string`

      UUID.

    - `email: optional string`

      The contact email address of the user.

    - `name: optional string`

      The enrolled device user's name.

  - `mac_address: optional string`

    The device MAC address.

  - `manufacturer: optional string`

    The device manufacturer.

  - `model: optional string`

    The model name of the device.

  - `os_version: optional string`

    The device operating system version number.

  - `os_version_extra: optional string`

    Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

  - `public_ip: optional string`

    **Deprecated**: IP information is provided by DEX - see https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/fleet_status/subresources/devices/methods/list/

  - `serial_number: optional string`

    The device serial number.

### Device Get Response

- `DeviceGetResponse object { id, active_registrations, created_at, 16 more }`

  A WARP Device.

  - `id: string`

    The unique ID of the device.

  - `active_registrations: number`

    The number of active registrations for the device. Active registrations are those which haven't been revoked or deleted.

  - `created_at: string`

    The RFC3339 timestamp when the device was created.

  - `last_seen_at: string`

    The RFC3339 timestamp when the device was last seen.

  - `name: string`

    The name of the device.

  - `updated_at: string`

    The RFC3339 timestamp when the device was last updated.

  - `client_version: optional string`

    Version of the WARP client.

  - `deleted_at: optional string`

    The RFC3339 timestamp when the device was deleted.

  - `device_type: optional string`

    The device operating system.

  - `hardware_id: optional string`

    A string that uniquely identifies the hardware or virtual machine (VM).

  - `last_seen_registration: optional object { policy }`

    The last seen registration for the device.

    - `policy: optional object { id, default, deleted, 2 more }`

      A summary of the device profile evaluated for the registration.

      - `id: string`

        The ID of the device settings profile.

      - `default: boolean`

        Whether the device settings profile is the default profile for the account.

      - `deleted: boolean`

        Whether the device settings profile was deleted.

      - `name: string`

        The name of the device settings profile.

      - `updated_at: string`

        The RFC3339 timestamp of when the device settings profile last changed for the registration.

  - `last_seen_user: optional object { id, email, name }`

    The last user to use the WARP device.

    - `id: optional string`

      UUID.

    - `email: optional string`

      The contact email address of the user.

    - `name: optional string`

      The enrolled device user's name.

  - `mac_address: optional string`

    The device MAC address.

  - `manufacturer: optional string`

    The device manufacturer.

  - `model: optional string`

    The model name of the device.

  - `os_version: optional string`

    The device operating system version number.

  - `os_version_extra: optional string`

    Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

  - `public_ip: optional string`

    **Deprecated**: IP information is provided by DEX - see https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/fleet_status/subresources/devices/methods/list/

  - `serial_number: optional string`

    The device serial number.

### Device Delete Response

- `DeviceDeleteResponse = unknown`

### Device Revoke Response

- `DeviceRevokeResponse = unknown`

# Resilience

# Global WARP Override

## Retrieve Global WARP override state

**get** `/accounts/{account_id}/devices/resilience/disconnect`

Fetch the Global WARP override state.

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

- `result: object { disconnect, timestamp }`

  - `disconnect: optional boolean`

    Disconnects all devices on the account using Global WARP override.

  - `timestamp: optional string`

    When the Global WARP override state was updated.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/resilience/disconnect \
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
    "disconnect": false,
    "timestamp": "1970-01-01T00:00:00.000Z"
  },
  "success": true
}
```

## Set Global WARP override state

**post** `/accounts/{account_id}/devices/resilience/disconnect`

Sets the Global WARP override state.

### Path Parameters

- `account_id: string`

### Body Parameters

- `disconnect: boolean`

  Disconnects all devices on the account using Global WARP override.

- `justification: optional string`

  Reasoning for setting the Global WARP override state. This will be surfaced in the audit log.

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

- `result: object { disconnect, timestamp }`

  - `disconnect: optional boolean`

    Disconnects all devices on the account using Global WARP override.

  - `timestamp: optional string`

    When the Global WARP override state was updated.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/resilience/disconnect \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "disconnect": false,
          "justification": "Turning off WARP for testing purposes."
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
    "disconnect": false,
    "timestamp": "1970-01-01T00:00:00.000Z"
  },
  "success": true
}
```

## Domain Types

### Global WARP Override Get Response

- `GlobalWARPOverrideGetResponse object { disconnect, timestamp }`

  - `disconnect: optional boolean`

    Disconnects all devices on the account using Global WARP override.

  - `timestamp: optional string`

    When the Global WARP override state was updated.

### Global WARP Override Create Response

- `GlobalWARPOverrideCreateResponse object { disconnect, timestamp }`

  - `disconnect: optional boolean`

    Disconnects all devices on the account using Global WARP override.

  - `timestamp: optional string`

    When the Global WARP override state was updated.

# Registrations

## List registrations

**get** `/accounts/{account_id}/devices/registrations`

Lists WARP registrations.

### Path Parameters

- `account_id: string`

### Query Parameters

- `id: optional array of string`

  Filter by registration ID.

- `cursor: optional string`

  Opaque token indicating the starting position when requesting the next set of records. A cursor value can be obtained from the result_info.cursor field in the response.

- `device: optional object { id }`

  - `id: optional string`

    Filter by WARP device ID.

- `include: optional string`

  Comma-separated list of additional information that should be included in the registration response. Supported values are: "policy".

- `per_page: optional number`

  The maximum number of devices to return in a single response.

- `search: optional string`

  Filter by registration details.

- `seen_after: optional string`

  Filter by the last_seen timestamp - returns only registrations last seen after this timestamp.

- `seen_before: optional string`

  Filter by the last_seen timestamp - returns only registrations last seen before this timestamp.

- `sort_by: optional "id" or "user.name" or "user.email" or 2 more`

  The registration field to order results by.

  - `"id"`

  - `"user.name"`

  - `"user.email"`

  - `"last_seen_at"`

  - `"created_at"`

- `sort_order: optional "asc" or "desc"`

  Sort direction.

  - `"asc"`

  - `"desc"`

- `status: optional "active" or "all" or "revoked"`

  Filter by registration status. Defaults to 'active'.

  - `"active"`

  - `"all"`

  - `"revoked"`

- `user: optional object { id }`

  - `id: optional array of string`

    Filter by user ID.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: array of object { id, created_at, device, 11 more }`

  - `id: string`

    The ID of the registration.

  - `created_at: string`

    The RFC3339 timestamp when the registration was created.

  - `device: object { id, name, client_version }`

    Device details embedded inside of a registration.

    - `id: string`

      The ID of the device.

    - `name: string`

      The name of the device.

    - `client_version: optional string`

      Version of the WARP client.

  - `key: string`

    The public key used to connect to the Cloudflare network.

  - `last_seen_at: string`

    The RFC3339 timestamp when the registration was last seen.

  - `updated_at: string`

    The RFC3339 timestamp when the registration was last updated.

  - `deleted_at: optional string`

    The RFC3339 timestamp when the registration was deleted.

  - `key_type: optional string`

    The type of encryption key used by the WARP client for the active key. Currently 'curve25519' for WireGuard and 'secp256r1' for MASQUE.

  - `policy: optional object { id, default, deleted, 2 more }`

    The device settings profile assigned to this registration.

    - `id: string`

      The ID of the device settings profile.

    - `default: boolean`

      Whether the device settings profile is the default profile for the account.

    - `deleted: boolean`

      Whether the device settings profile was deleted.

    - `name: string`

      The name of the device settings profile.

    - `updated_at: string`

      The RFC3339 timestamp of when the device settings profile last changed for the registration.

  - `revoked_at: optional string`

    The RFC3339 timestamp when the registration was revoked.

  - `tunnel_type: optional string`

    Type of the tunnel - wireguard or masque.

  - `user: optional object { id, email, name }`

    - `id: optional string`

      UUID.

    - `email: optional string`

      The contact email address of the user.

    - `name: optional string`

      The enrolled device user's name.

  - `virtual_ipv4: optional string`

    The virtual IPv4 address assigned to the network interface of the tunnel for this registration.

  - `virtual_ipv6: optional string`

    The virtual IPv6 address assigned to the network interface of the tunnel for this registration.

- `success: boolean`

  Whether the API call was successful.

- `result_info: optional object { count, cursor, per_page, total_count }`

  V4 public API Pagination/Cursor info.

  - `count: number`

    Number of records in the response.

  - `cursor: string`

    Opaque token to request the next set of records.

  - `per_page: number`

    The limit for the number of records in the response.

  - `total_count: optional number`

    Total number of records available.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/registrations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": [
    {
      "created_at": "2025-02-14T13:17:00Z",
      "deleted_at": null,
      "device": {
        "client_version": "1.0.0",
        "id": "32aa0404-78f1-49a4-99e0-97f575081356",
        "name": "My Device"
      },
      "id": "11ffb86f-3f0c-4306-b4a2-e62f872b166a",
      "key": "U+QTP50RsWfeLGHF4tlGDnmGeuwtsz46KCHr5OyhWq00Rsdfl45mgnQAuEJ6CO0YrkyTl9FUf5iB0bwYR3g4EEFEHhtu6jFaqfMrBMBSz6itv9HQXkaR9OieKQ==",
      "key_type": "secp256r1",
      "last_seen_at": "2025-02-14T13:17:00Z",
      "revoked_at": null,
      "tunnel_type": "masque",
      "updated_at": "2025-02-14T13:17:00Z",
      "user": {
        "email": "alice@example.org",
        "id": "30323c1f-318d-4ec9-92c7-5a8c4d25c4fc",
        "name": "Alice"
      }
    },
    {
      "created_at": "2025-02-15T10:20:00Z",
      "deleted_at": null,
      "device": {
        "client_version": "1.0.1",
        "id": "43bb1515-8902-50b5-aa01-a88686192467",
        "name": "Bob's Laptop"
      },
      "id": "22eedc7a-4a1d-5417-c5b3-f73a983c277b",
      "key": "V/RSP61StXgfmLHJG5umHEonHfvxtz57LDIs6PziXr11Stegm56nhrRBvFK7DP1ZsLzUm0GVg6jC1cxZS4h5FFGFJiju7kGbrgNsCNCT77juw0IRYlS0QpjgLR==",
      "key_type": "secp256r1",
      "last_seen_at": "2025-02-15T10:25:00Z",
      "revoked_at": null,
      "tunnel_type": "masque",
      "updated_at": "2025-02-15T10:25:00Z",
      "user": {
        "email": "bob@example.com",
        "id": "41434d2a-429e-5fd0-a3d8-6b9d5e36d5ad",
        "name": "Bob"
      }
    }
  ],
  "result_info": {
    "count": 2,
    "cursor": "ais86dftf.asdf7ba8",
    "per_page": 10,
    "total_count": null
  },
  "success": true
}
```

## Get registration

**get** `/accounts/{account_id}/devices/registrations/{registration_id}`

Fetches a single WARP registration.

### Path Parameters

- `account_id: string`

- `registration_id: string`

### Query Parameters

- `include: optional string`

  Comma-separated list of additional information that should be included in the registration response. Supported values are: "policy".

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { id, created_at, device, 11 more }`

  A WARP configuration tied to a single user. Multiple registrations can be created from a single WARP device.

  - `id: string`

    The ID of the registration.

  - `created_at: string`

    The RFC3339 timestamp when the registration was created.

  - `device: object { id, name, client_version }`

    Device details embedded inside of a registration.

    - `id: string`

      The ID of the device.

    - `name: string`

      The name of the device.

    - `client_version: optional string`

      Version of the WARP client.

  - `key: string`

    The public key used to connect to the Cloudflare network.

  - `last_seen_at: string`

    The RFC3339 timestamp when the registration was last seen.

  - `updated_at: string`

    The RFC3339 timestamp when the registration was last updated.

  - `deleted_at: optional string`

    The RFC3339 timestamp when the registration was deleted.

  - `key_type: optional string`

    The type of encryption key used by the WARP client for the active key. Currently 'curve25519' for WireGuard and 'secp256r1' for MASQUE.

  - `policy: optional object { id, default, deleted, 2 more }`

    The device settings profile assigned to this registration.

    - `id: string`

      The ID of the device settings profile.

    - `default: boolean`

      Whether the device settings profile is the default profile for the account.

    - `deleted: boolean`

      Whether the device settings profile was deleted.

    - `name: string`

      The name of the device settings profile.

    - `updated_at: string`

      The RFC3339 timestamp of when the device settings profile last changed for the registration.

  - `revoked_at: optional string`

    The RFC3339 timestamp when the registration was revoked.

  - `tunnel_type: optional string`

    Type of the tunnel - wireguard or masque.

  - `user: optional object { id, email, name }`

    - `id: optional string`

      UUID.

    - `email: optional string`

      The contact email address of the user.

    - `name: optional string`

      The enrolled device user's name.

  - `virtual_ipv4: optional string`

    The virtual IPv4 address assigned to the network interface of the tunnel for this registration.

  - `virtual_ipv6: optional string`

    The virtual IPv6 address assigned to the network interface of the tunnel for this registration.

- `success: boolean`

  Whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/registrations/$REGISTRATION_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "11ffb86f-3f0c-4306-b4a2-e62f872b166a",
    "created_at": "2025-02-14T13:17:00Z",
    "device": {
      "id": "32aa0404-78f1-49a4-99e0-97f575081356",
      "name": "My Device",
      "client_version": "1.0.0"
    },
    "key": "U+QTP50RsWfeLGHF4tlGDnmGeuwtsz46KCHr5OyhWq00Rsdfl45mgnQAuEJ6CO0YrkyTl9FUf5iB0bwYR3g4EEFEHhtu6jFaqfMrBMBSz6itv9HQXkaR9OieKQ==",
    "last_seen_at": "2025-02-14T13:17:00Z",
    "updated_at": "2025-02-14T13:17:00Z",
    "deleted_at": "2025-02-14T13:17:00Z",
    "key_type": "secp256r1",
    "policy": {
      "id": "11ffb86f-3f0c-4306-b4a2-e62f872b166a",
      "default": true,
      "deleted": true,
      "name": "name",
      "updated_at": "2025-02-14T13:17:00Z"
    },
    "revoked_at": "2025-02-14T13:17:00Z",
    "tunnel_type": "masque",
    "user": {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "email": "user@example.com",
      "name": "John Appleseed"
    },
    "virtual_ipv4": "100.96.0.1",
    "virtual_ipv6": "2606:4700:0cf1:1000::1"
  },
  "success": true
}
```

## Delete registration

**delete** `/accounts/{account_id}/devices/registrations/{registration_id}`

Deletes a WARP registration.

### Path Parameters

- `account_id: string`

- `registration_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `success: boolean`

  Whether the API call was successful.

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/registrations/$REGISTRATION_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "success": true,
  "result": {}
}
```

## Delete registrations

**delete** `/accounts/{account_id}/devices/registrations`

Deletes a list of WARP registrations.

### Path Parameters

- `account_id: string`

### Query Parameters

- `id: array of string`

  A list of registration IDs to delete.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: unknown`

- `success: boolean`

  Whether the API call was successful.

- `result_info: optional object { count, cursor, per_page, total_count }`

  V4 public API Pagination/Cursor info.

  - `count: number`

    Number of records in the response.

  - `cursor: string`

    Opaque token to request the next set of records.

  - `per_page: number`

    The limit for the number of records in the response.

  - `total_count: optional number`

    Total number of records available.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/registrations \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {},
  "success": true,
  "result_info": {
    "count": 1,
    "cursor": "ais86dftf.asdf7ba8",
    "per_page": 10,
    "total_count": null
  }
}
```

## Revoke registrations

**post** `/accounts/{account_id}/devices/registrations/revoke`

Revokes a list of WARP registrations.

### Path Parameters

- `account_id: string`

### Query Parameters

- `id: array of string`

  A list of registration IDs to revoke.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: unknown`

- `success: boolean`

  Whether the API call was successful.

- `result_info: optional object { count, cursor, per_page, total_count }`

  V4 public API Pagination/Cursor info.

  - `count: number`

    Number of records in the response.

  - `cursor: string`

    Opaque token to request the next set of records.

  - `per_page: number`

    The limit for the number of records in the response.

  - `total_count: optional number`

    Total number of records available.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/registrations/revoke \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {},
  "success": true,
  "result_info": {
    "count": 1,
    "cursor": "ais86dftf.asdf7ba8",
    "per_page": 10,
    "total_count": null
  }
}
```

## Unrevoke registrations

**post** `/accounts/{account_id}/devices/registrations/unrevoke`

Unrevokes a list of WARP registrations.

### Path Parameters

- `account_id: string`

### Query Parameters

- `id: array of string`

  A list of registration IDs to unrevoke.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: unknown`

- `success: boolean`

  Whether the API call was successful.

- `result_info: optional object { count, cursor, per_page, total_count }`

  V4 public API Pagination/Cursor info.

  - `count: number`

    Number of records in the response.

  - `cursor: string`

    Opaque token to request the next set of records.

  - `per_page: number`

    The limit for the number of records in the response.

  - `total_count: optional number`

    Total number of records available.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/registrations/unrevoke \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {},
  "success": true,
  "result_info": {
    "count": 1,
    "cursor": "ais86dftf.asdf7ba8",
    "per_page": 10,
    "total_count": null
  }
}
```

## Domain Types

### Registration List Response

- `RegistrationListResponse object { id, created_at, device, 11 more }`

  A WARP configuration tied to a single user. Multiple registrations can be created from a single WARP device.

  - `id: string`

    The ID of the registration.

  - `created_at: string`

    The RFC3339 timestamp when the registration was created.

  - `device: object { id, name, client_version }`

    Device details embedded inside of a registration.

    - `id: string`

      The ID of the device.

    - `name: string`

      The name of the device.

    - `client_version: optional string`

      Version of the WARP client.

  - `key: string`

    The public key used to connect to the Cloudflare network.

  - `last_seen_at: string`

    The RFC3339 timestamp when the registration was last seen.

  - `updated_at: string`

    The RFC3339 timestamp when the registration was last updated.

  - `deleted_at: optional string`

    The RFC3339 timestamp when the registration was deleted.

  - `key_type: optional string`

    The type of encryption key used by the WARP client for the active key. Currently 'curve25519' for WireGuard and 'secp256r1' for MASQUE.

  - `policy: optional object { id, default, deleted, 2 more }`

    The device settings profile assigned to this registration.

    - `id: string`

      The ID of the device settings profile.

    - `default: boolean`

      Whether the device settings profile is the default profile for the account.

    - `deleted: boolean`

      Whether the device settings profile was deleted.

    - `name: string`

      The name of the device settings profile.

    - `updated_at: string`

      The RFC3339 timestamp of when the device settings profile last changed for the registration.

  - `revoked_at: optional string`

    The RFC3339 timestamp when the registration was revoked.

  - `tunnel_type: optional string`

    Type of the tunnel - wireguard or masque.

  - `user: optional object { id, email, name }`

    - `id: optional string`

      UUID.

    - `email: optional string`

      The contact email address of the user.

    - `name: optional string`

      The enrolled device user's name.

  - `virtual_ipv4: optional string`

    The virtual IPv4 address assigned to the network interface of the tunnel for this registration.

  - `virtual_ipv6: optional string`

    The virtual IPv6 address assigned to the network interface of the tunnel for this registration.

### Registration Get Response

- `RegistrationGetResponse object { id, created_at, device, 11 more }`

  A WARP configuration tied to a single user. Multiple registrations can be created from a single WARP device.

  - `id: string`

    The ID of the registration.

  - `created_at: string`

    The RFC3339 timestamp when the registration was created.

  - `device: object { id, name, client_version }`

    Device details embedded inside of a registration.

    - `id: string`

      The ID of the device.

    - `name: string`

      The name of the device.

    - `client_version: optional string`

      Version of the WARP client.

  - `key: string`

    The public key used to connect to the Cloudflare network.

  - `last_seen_at: string`

    The RFC3339 timestamp when the registration was last seen.

  - `updated_at: string`

    The RFC3339 timestamp when the registration was last updated.

  - `deleted_at: optional string`

    The RFC3339 timestamp when the registration was deleted.

  - `key_type: optional string`

    The type of encryption key used by the WARP client for the active key. Currently 'curve25519' for WireGuard and 'secp256r1' for MASQUE.

  - `policy: optional object { id, default, deleted, 2 more }`

    The device settings profile assigned to this registration.

    - `id: string`

      The ID of the device settings profile.

    - `default: boolean`

      Whether the device settings profile is the default profile for the account.

    - `deleted: boolean`

      Whether the device settings profile was deleted.

    - `name: string`

      The name of the device settings profile.

    - `updated_at: string`

      The RFC3339 timestamp of when the device settings profile last changed for the registration.

  - `revoked_at: optional string`

    The RFC3339 timestamp when the registration was revoked.

  - `tunnel_type: optional string`

    Type of the tunnel - wireguard or masque.

  - `user: optional object { id, email, name }`

    - `id: optional string`

      UUID.

    - `email: optional string`

      The contact email address of the user.

    - `name: optional string`

      The enrolled device user's name.

  - `virtual_ipv4: optional string`

    The virtual IPv4 address assigned to the network interface of the tunnel for this registration.

  - `virtual_ipv6: optional string`

    The virtual IPv6 address assigned to the network interface of the tunnel for this registration.

### Registration Delete Response

- `RegistrationDeleteResponse = unknown`

### Registration Bulk Delete Response

- `RegistrationBulkDeleteResponse = unknown`

### Registration Revoke Response

- `RegistrationRevokeResponse = unknown`

### Registration Unrevoke Response

- `RegistrationUnrevokeResponse = unknown`

# DEX Tests

## List Device DEX tests

**get** `/accounts/{account_id}/dex/devices/dex_tests`

Fetch all DEX tests.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

### Query Parameters

- `kind: optional "http" or "traceroute"`

  Filter by test type.

  - `"http"`

  - `"traceroute"`

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of results per page.

- `testName: optional string`

  Filter by test name.

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

- `result: optional array of object { data, enabled, interval, 5 more }`

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

    Determines whether or not the test is active.

  - `interval: string`

    How often the test will run.

  - `name: string`

    The name of the DEX test. Must be unique.

  - `description: optional string`

    Additional details about the test.

  - `target_policies: optional array of object { id, default, name }`

    DEX rules targeted by this test

    - `id: string`

      The id of the DEX rule.

    - `default: optional boolean`

      Whether the DEX rule is the account default.

    - `name: optional string`

      The name of the DEX rule.

  - `targeted: optional boolean`

  - `test_id: optional string`

    The unique identifier for the test.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/devices/dex_tests \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
      "data": {
        "host": "https://dash.cloudflare.com",
        "kind": "http",
        "method": "GET"
      },
      "enabled": true,
      "interval": "30m",
      "name": "HTTP dash health check",
      "description": "Checks the dash endpoint every 30 minutes",
      "target_policies": [
        {
          "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
          "default": true,
          "name": "name"
        }
      ],
      "targeted": true,
      "test_id": "372e67954025e0ba6aaa6d586b9e0b59"
    }
  ]
}
```

## Get Device DEX test

**get** `/accounts/{account_id}/dex/devices/dex_tests/{dex_test_id}`

Fetch a single DEX test.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

- `dex_test_id: string`

  The unique identifier for the test.

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

- `result: optional object { data, enabled, interval, 5 more }`

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

    Determines whether or not the test is active.

  - `interval: string`

    How often the test will run.

  - `name: string`

    The name of the DEX test. Must be unique.

  - `description: optional string`

    Additional details about the test.

  - `target_policies: optional array of object { id, default, name }`

    DEX rules targeted by this test

    - `id: string`

      The id of the DEX rule.

    - `default: optional boolean`

      Whether the DEX rule is the account default.

    - `name: optional string`

      The name of the DEX rule.

  - `targeted: optional boolean`

  - `test_id: optional string`

    The unique identifier for the test.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/devices/dex_tests/$DEX_TEST_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "data": {
      "host": "https://dash.cloudflare.com",
      "kind": "http",
      "method": "GET"
    },
    "enabled": true,
    "interval": "30m",
    "name": "HTTP dash health check",
    "description": "Checks the dash endpoint every 30 minutes",
    "target_policies": [
      {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "default": true,
        "name": "name"
      }
    ],
    "targeted": true,
    "test_id": "372e67954025e0ba6aaa6d586b9e0b59"
  }
}
```

## Create Device DEX test

**post** `/accounts/{account_id}/dex/devices/dex_tests`

Create a DEX test.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

### Body Parameters

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

  Determines whether or not the test is active.

- `interval: string`

  How often the test will run.

- `name: string`

  The name of the DEX test. Must be unique.

- `description: optional string`

  Additional details about the test.

- `target_policies: optional array of object { id, default, name }`

  DEX rules targeted by this test

  - `id: string`

    The id of the DEX rule.

  - `default: optional boolean`

    Whether the DEX rule is the account default.

  - `name: optional string`

    The name of the DEX rule.

- `targeted: optional boolean`

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

- `result: optional object { data, enabled, interval, 5 more }`

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

    Determines whether or not the test is active.

  - `interval: string`

    How often the test will run.

  - `name: string`

    The name of the DEX test. Must be unique.

  - `description: optional string`

    Additional details about the test.

  - `target_policies: optional array of object { id, default, name }`

    DEX rules targeted by this test

    - `id: string`

      The id of the DEX rule.

    - `default: optional boolean`

      Whether the DEX rule is the account default.

    - `name: optional string`

      The name of the DEX rule.

  - `targeted: optional boolean`

  - `test_id: optional string`

    The unique identifier for the test.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/devices/dex_tests \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "data": {
            "host": "https://dash.cloudflare.com",
            "kind": "http",
            "method": "GET"
          },
          "enabled": true,
          "interval": "30m",
          "name": "HTTP dash health check",
          "description": "Checks the dash endpoint every 30 minutes"
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
    "data": {
      "host": "https://dash.cloudflare.com",
      "kind": "http",
      "method": "GET"
    },
    "enabled": true,
    "interval": "30m",
    "name": "HTTP dash health check",
    "description": "Checks the dash endpoint every 30 minutes",
    "target_policies": [
      {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "default": true,
        "name": "name"
      }
    ],
    "targeted": true,
    "test_id": "372e67954025e0ba6aaa6d586b9e0b59"
  }
}
```

## Update Device DEX test

**put** `/accounts/{account_id}/dex/devices/dex_tests/{dex_test_id}`

Update a DEX test.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

- `dex_test_id: string`

  API Resource UUID tag.

### Body Parameters

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

  Determines whether or not the test is active.

- `interval: string`

  How often the test will run.

- `name: string`

  The name of the DEX test. Must be unique.

- `description: optional string`

  Additional details about the test.

- `target_policies: optional array of object { id, default, name }`

  DEX rules targeted by this test

  - `id: string`

    The id of the DEX rule.

  - `default: optional boolean`

    Whether the DEX rule is the account default.

  - `name: optional string`

    The name of the DEX rule.

- `targeted: optional boolean`

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

- `result: optional object { data, enabled, interval, 5 more }`

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

    Determines whether or not the test is active.

  - `interval: string`

    How often the test will run.

  - `name: string`

    The name of the DEX test. Must be unique.

  - `description: optional string`

    Additional details about the test.

  - `target_policies: optional array of object { id, default, name }`

    DEX rules targeted by this test

    - `id: string`

      The id of the DEX rule.

    - `default: optional boolean`

      Whether the DEX rule is the account default.

    - `name: optional string`

      The name of the DEX rule.

  - `targeted: optional boolean`

  - `test_id: optional string`

    The unique identifier for the test.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/devices/dex_tests/$DEX_TEST_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "data": {
            "host": "https://dash.cloudflare.com",
            "kind": "http",
            "method": "GET"
          },
          "enabled": true,
          "interval": "30m",
          "name": "HTTP dash health check",
          "description": "Checks the dash endpoint every 30 minutes"
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
    "data": {
      "host": "https://dash.cloudflare.com",
      "kind": "http",
      "method": "GET"
    },
    "enabled": true,
    "interval": "30m",
    "name": "HTTP dash health check",
    "description": "Checks the dash endpoint every 30 minutes",
    "target_policies": [
      {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "default": true,
        "name": "name"
      }
    ],
    "targeted": true,
    "test_id": "372e67954025e0ba6aaa6d586b9e0b59"
  }
}
```

## Delete Device DEX test

**delete** `/accounts/{account_id}/dex/devices/dex_tests/{dex_test_id}`

Delete a Device DEX test. Returns the remaining device dex tests for the account.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

- `dex_test_id: string`

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

- `result: optional object { dex_tests }`

  - `dex_tests: optional array of object { data, enabled, interval, 5 more }`

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

      Determines whether or not the test is active.

    - `interval: string`

      How often the test will run.

    - `name: string`

      The name of the DEX test. Must be unique.

    - `description: optional string`

      Additional details about the test.

    - `target_policies: optional array of object { id, default, name }`

      DEX rules targeted by this test

      - `id: string`

        The id of the DEX rule.

      - `default: optional boolean`

        Whether the DEX rule is the account default.

      - `name: optional string`

        The name of the DEX rule.

    - `targeted: optional boolean`

    - `test_id: optional string`

      The unique identifier for the test.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/devices/dex_tests/$DEX_TEST_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "dex_tests": [
      {
        "data": {
          "host": "https://dash.cloudflare.com",
          "kind": "http",
          "method": "GET"
        },
        "enabled": true,
        "interval": "30m",
        "name": "HTTP dash health check",
        "description": "Checks the dash endpoint every 30 minutes",
        "target_policies": [
          {
            "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
            "default": true,
            "name": "name"
          }
        ],
        "targeted": true,
        "test_id": "372e67954025e0ba6aaa6d586b9e0b59"
      }
    ]
  }
}
```

## Domain Types

### Schema Data

- `SchemaData object { host, kind, method }`

  The configuration object which contains the details for the WARP client to conduct the test.

  - `host: optional string`

    The desired endpoint to test.

  - `kind: optional string`

    The type of test.

  - `method: optional string`

    The HTTP request method type.

### Schema HTTP

- `SchemaHTTP object { data, enabled, interval, 5 more }`

  - `data: SchemaData`

    The configuration object which contains the details for the WARP client to conduct the test.

    - `host: optional string`

      The desired endpoint to test.

    - `kind: optional string`

      The type of test.

    - `method: optional string`

      The HTTP request method type.

  - `enabled: boolean`

    Determines whether or not the test is active.

  - `interval: string`

    How often the test will run.

  - `name: string`

    The name of the DEX test. Must be unique.

  - `description: optional string`

    Additional details about the test.

  - `target_policies: optional array of object { id, default, name }`

    Device settings profiles targeted by this test.

    - `id: optional string`

      The id of the device settings profile.

    - `default: optional boolean`

      Whether the profile is the account default.

    - `name: optional string`

      The name of the device settings profile.

  - `targeted: optional boolean`

  - `test_id: optional string`

    The unique identifier for the test.

### DEX Test List Response

- `DEXTestListResponse object { data, enabled, interval, 5 more }`

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

    Determines whether or not the test is active.

  - `interval: string`

    How often the test will run.

  - `name: string`

    The name of the DEX test. Must be unique.

  - `description: optional string`

    Additional details about the test.

  - `target_policies: optional array of object { id, default, name }`

    DEX rules targeted by this test

    - `id: string`

      The id of the DEX rule.

    - `default: optional boolean`

      Whether the DEX rule is the account default.

    - `name: optional string`

      The name of the DEX rule.

  - `targeted: optional boolean`

  - `test_id: optional string`

    The unique identifier for the test.

### DEX Test Get Response

- `DEXTestGetResponse object { data, enabled, interval, 5 more }`

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

    Determines whether or not the test is active.

  - `interval: string`

    How often the test will run.

  - `name: string`

    The name of the DEX test. Must be unique.

  - `description: optional string`

    Additional details about the test.

  - `target_policies: optional array of object { id, default, name }`

    DEX rules targeted by this test

    - `id: string`

      The id of the DEX rule.

    - `default: optional boolean`

      Whether the DEX rule is the account default.

    - `name: optional string`

      The name of the DEX rule.

  - `targeted: optional boolean`

  - `test_id: optional string`

    The unique identifier for the test.

### DEX Test Create Response

- `DEXTestCreateResponse object { data, enabled, interval, 5 more }`

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

    Determines whether or not the test is active.

  - `interval: string`

    How often the test will run.

  - `name: string`

    The name of the DEX test. Must be unique.

  - `description: optional string`

    Additional details about the test.

  - `target_policies: optional array of object { id, default, name }`

    DEX rules targeted by this test

    - `id: string`

      The id of the DEX rule.

    - `default: optional boolean`

      Whether the DEX rule is the account default.

    - `name: optional string`

      The name of the DEX rule.

  - `targeted: optional boolean`

  - `test_id: optional string`

    The unique identifier for the test.

### DEX Test Update Response

- `DEXTestUpdateResponse object { data, enabled, interval, 5 more }`

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

    Determines whether or not the test is active.

  - `interval: string`

    How often the test will run.

  - `name: string`

    The name of the DEX test. Must be unique.

  - `description: optional string`

    Additional details about the test.

  - `target_policies: optional array of object { id, default, name }`

    DEX rules targeted by this test

    - `id: string`

      The id of the DEX rule.

    - `default: optional boolean`

      Whether the DEX rule is the account default.

    - `name: optional string`

      The name of the DEX rule.

  - `targeted: optional boolean`

  - `test_id: optional string`

    The unique identifier for the test.

### DEX Test Delete Response

- `DEXTestDeleteResponse object { dex_tests }`

  - `dex_tests: optional array of object { data, enabled, interval, 5 more }`

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

      Determines whether or not the test is active.

    - `interval: string`

      How often the test will run.

    - `name: string`

      The name of the DEX test. Must be unique.

    - `description: optional string`

      Additional details about the test.

    - `target_policies: optional array of object { id, default, name }`

      DEX rules targeted by this test

      - `id: string`

        The id of the DEX rule.

      - `default: optional boolean`

        Whether the DEX rule is the account default.

      - `name: optional string`

        The name of the DEX rule.

    - `targeted: optional boolean`

    - `test_id: optional string`

      The unique identifier for the test.

# IP Profiles

## List IP profiles

**get** `/accounts/{account_id}/devices/ip-profiles`

Lists WARP Device IP profiles.

### Path Parameters

- `account_id: string`

### Query Parameters

- `page: optional number`

  The page number to return.

- `per_page: optional number`

  The number of IP profiles to return per page.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: array of IPProfile`

  - `id: string`

    The ID of the Device IP profile.

  - `created_at: string`

    The RFC3339Nano timestamp when the Device IP profile was created.

  - `description: string`

    An optional description of the Device IP profile.

  - `enabled: boolean`

    Whether the Device IP profile is enabled.

  - `match: string`

    The wirefilter expression to match registrations. Available values: "identity.name", "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.saml_attributes".

  - `name: string`

    A user-friendly name for the Device IP profile.

  - `precedence: number`

    The precedence of the Device IP profile. Lower values indicate higher precedence. Device IP profile will be evaluated in ascending order of this field.

  - `subnet_id: string`

    The ID of the Subnet.

  - `updated_at: string`

    The RFC3339Nano timestamp when the Device IP profile was last updated.

- `success: boolean`

  Whether the API call was successful.

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: number`

    Number of records in the response.

  - `page: number`

    The page size number of the response.

  - `per_page: number`

    The limit for the number of records in the response.

  - `total_count: number`

    Total number of records available.

  - `total_pages: optional number`

    Total number of pages available.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/ip-profiles \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": [
    {
      "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
      "created_at": "2025-02-14T13:17:00.123456789Z",
      "description": "example comment",
      "enabled": true,
      "match": "identity.email == \"test@cloudflare.com\"",
      "name": "IPv4 Cloudflare Source IPs",
      "precedence": 100,
      "subnet_id": "b70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
      "updated_at": "2025-02-14T13:17:00.123456789Z"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 10,
    "total_count": 10,
    "total_pages": 1
  }
}
```

## Get IP profile

**get** `/accounts/{account_id}/devices/ip-profiles/{profile_id}`

Fetches a single WARP Device IP profile.

### Path Parameters

- `account_id: string`

- `profile_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: IPProfile`

  - `id: string`

    The ID of the Device IP profile.

  - `created_at: string`

    The RFC3339Nano timestamp when the Device IP profile was created.

  - `description: string`

    An optional description of the Device IP profile.

  - `enabled: boolean`

    Whether the Device IP profile is enabled.

  - `match: string`

    The wirefilter expression to match registrations. Available values: "identity.name", "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.saml_attributes".

  - `name: string`

    A user-friendly name for the Device IP profile.

  - `precedence: number`

    The precedence of the Device IP profile. Lower values indicate higher precedence. Device IP profile will be evaluated in ascending order of this field.

  - `subnet_id: string`

    The ID of the Subnet.

  - `updated_at: string`

    The RFC3339Nano timestamp when the Device IP profile was last updated.

- `success: boolean`

  Whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/ip-profiles/$PROFILE_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "created_at": "2025-02-14T13:17:00.123456789Z",
    "description": "example comment",
    "enabled": true,
    "match": "identity.email == \"test@cloudflare.com\"",
    "name": "IPv4 Cloudflare Source IPs",
    "precedence": 100,
    "subnet_id": "b70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "updated_at": "2025-02-14T13:17:00.123456789Z"
  },
  "success": true
}
```

## Create IP profile

**post** `/accounts/{account_id}/devices/ip-profiles`

Creates a WARP Device IP profile. Currently, only IPv4 Device subnets can be associated.

### Path Parameters

- `account_id: string`

### Body Parameters

- `match: string`

  The wirefilter expression to match registrations. Available values: "identity.name", "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.saml_attributes".

- `name: string`

  A user-friendly name for the Device IP profile.

- `precedence: number`

  The precedence of the Device IP profile. Lower values indicate higher precedence. Device IP profile will be evaluated in ascending order of this field.

- `subnet_id: string`

  The ID of the Subnet.

- `description: optional string`

  An optional description of the Device IP profile.

- `enabled: optional boolean`

  Whether the Device IP profile will be applied to matching devices.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: IPProfile`

  - `id: string`

    The ID of the Device IP profile.

  - `created_at: string`

    The RFC3339Nano timestamp when the Device IP profile was created.

  - `description: string`

    An optional description of the Device IP profile.

  - `enabled: boolean`

    Whether the Device IP profile is enabled.

  - `match: string`

    The wirefilter expression to match registrations. Available values: "identity.name", "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.saml_attributes".

  - `name: string`

    A user-friendly name for the Device IP profile.

  - `precedence: number`

    The precedence of the Device IP profile. Lower values indicate higher precedence. Device IP profile will be evaluated in ascending order of this field.

  - `subnet_id: string`

    The ID of the Subnet.

  - `updated_at: string`

    The RFC3339Nano timestamp when the Device IP profile was last updated.

- `success: boolean`

  Whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/ip-profiles \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "match": "identity.email == \\"test@cloudflare.com\\"",
          "name": "IPv4 Cloudflare Source IPs",
          "precedence": 100,
          "subnet_id": "b70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
          "description": "example comment",
          "enabled": true
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "created_at": "2025-02-14T13:17:00.123456789Z",
    "description": "example comment",
    "enabled": true,
    "match": "identity.email == \"test@cloudflare.com\"",
    "name": "IPv4 Cloudflare Source IPs",
    "precedence": 100,
    "subnet_id": "b70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "updated_at": "2025-02-14T13:17:00.123456789Z"
  },
  "success": true
}
```

## Update IP profile

**patch** `/accounts/{account_id}/devices/ip-profiles/{profile_id}`

Updates a WARP Device IP profile. Currently, only IPv4 Device subnets can be associated.

### Path Parameters

- `account_id: string`

- `profile_id: string`

### Body Parameters

- `description: optional string`

  An optional description of the Device IP profile.

- `enabled: optional boolean`

  Whether the Device IP profile is enabled.

- `match: optional string`

  The wirefilter expression to match registrations. Available values: "identity.name", "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.saml_attributes".

- `name: optional string`

  A user-friendly name for the Device IP profile.

- `precedence: optional number`

  The precedence of the Device IP profile. Lower values indicate higher precedence. Device IP profile will be evaluated in ascending order of this field.

- `subnet_id: optional string`

  The ID of the Subnet.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: IPProfile`

  - `id: string`

    The ID of the Device IP profile.

  - `created_at: string`

    The RFC3339Nano timestamp when the Device IP profile was created.

  - `description: string`

    An optional description of the Device IP profile.

  - `enabled: boolean`

    Whether the Device IP profile is enabled.

  - `match: string`

    The wirefilter expression to match registrations. Available values: "identity.name", "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.saml_attributes".

  - `name: string`

    A user-friendly name for the Device IP profile.

  - `precedence: number`

    The precedence of the Device IP profile. Lower values indicate higher precedence. Device IP profile will be evaluated in ascending order of this field.

  - `subnet_id: string`

    The ID of the Subnet.

  - `updated_at: string`

    The RFC3339Nano timestamp when the Device IP profile was last updated.

- `success: boolean`

  Whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/ip-profiles/$PROFILE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "description": "example comment",
          "enabled": true,
          "match": "identity.email == \\"test@cloudflare.com\\"",
          "name": "IPv4 Cloudflare Source IPs",
          "precedence": 100,
          "subnet_id": "b70ff985-a4ef-4643-bbbc-4a0ed4fc8415"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "created_at": "2025-02-14T13:17:00.123456789Z",
    "description": "example comment",
    "enabled": true,
    "match": "identity.email == \"test@cloudflare.com\"",
    "name": "IPv4 Cloudflare Source IPs",
    "precedence": 100,
    "subnet_id": "b70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "updated_at": "2025-02-14T13:17:00.123456789Z"
  },
  "success": true
}
```

## Delete IP profile

**delete** `/accounts/{account_id}/devices/ip-profiles/{profile_id}`

Delete a WARP Device IP profile.

### Path Parameters

- `account_id: string`

- `profile_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { id }`

  - `id: optional string`

    ID of the deleted Device IP profile.

- `success: boolean`

  Whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/ip-profiles/$PROFILE_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415"
  },
  "success": true
}
```

## Domain Types

### IP Profile

- `IPProfile object { id, created_at, description, 6 more }`

  - `id: string`

    The ID of the Device IP profile.

  - `created_at: string`

    The RFC3339Nano timestamp when the Device IP profile was created.

  - `description: string`

    An optional description of the Device IP profile.

  - `enabled: boolean`

    Whether the Device IP profile is enabled.

  - `match: string`

    The wirefilter expression to match registrations. Available values: "identity.name", "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.saml_attributes".

  - `name: string`

    A user-friendly name for the Device IP profile.

  - `precedence: number`

    The precedence of the Device IP profile. Lower values indicate higher precedence. Device IP profile will be evaluated in ascending order of this field.

  - `subnet_id: string`

    The ID of the Subnet.

  - `updated_at: string`

    The RFC3339Nano timestamp when the Device IP profile was last updated.

### IP Profile Delete Response

- `IPProfileDeleteResponse object { id }`

  - `id: optional string`

    ID of the deleted Device IP profile.

# Deployment Groups

## List deployment groups

**get** `/accounts/{account_id}/devices/deployment-groups`

Lists all deployment groups for an account. Use deployment groups to assign target WARP client versions to specific devices. This endpoint is in Beta.

### Path Parameters

- `account_id: string`

### Query Parameters

- `page: optional number`

  The page number to return.

- `per_page: optional number`

  The maximum number of deployment groups to return per page.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: array of DeploymentGroup`

  - `id: string`

    The ID of the deployment group.

  - `created_at: string`

    The RFC3339Nano timestamp when the deployment group was created.

  - `name: string`

    A user-friendly name for the deployment group.

  - `updated_at: string`

    The RFC3339Nano timestamp when the deployment group was last updated.

  - `version_config: array of object { target_environment, version }`

    Contains version configurations for different target environments.

    - `target_environment: string`

      The target environment for the client version (e.g., windows, macos).

    - `version: string`

      The specific client version to deploy.

  - `policy_ids: optional array of string`

    Contains a list of policy IDs assigned to this deployment group.

- `result_info: object { count, page, per_page, 2 more }`

  - `count: number`

    Number of records in the response.

  - `page: number`

    The page size number of the response.

  - `per_page: number`

    The limit for the number of records in the response.

  - `total_count: number`

    Total number of records available.

  - `total_pages: optional number`

    Total number of pages available.

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/deployment-groups \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "created_at": "2026-02-14T13:17:00.123456789Z",
      "name": "Engineering Ring 0",
      "updated_at": "2026-02-14T13:17:00.123456789Z",
      "version_config": [
        {
          "target_environment": "windows",
          "version": "2026.6.234.0"
        }
      ],
      "policy_ids": [
        "policy-uuid-1",
        "policy-uuid-2"
      ]
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 10,
    "total_count": 10,
    "total_pages": 1
  },
  "success": true
}
```

## Get deployment group

**get** `/accounts/{account_id}/devices/deployment-groups/{group_id}`

Fetches a single deployment group by its ID. This endpoint is in Beta.

### Path Parameters

- `account_id: string`

- `group_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: DeploymentGroup`

  - `id: string`

    The ID of the deployment group.

  - `created_at: string`

    The RFC3339Nano timestamp when the deployment group was created.

  - `name: string`

    A user-friendly name for the deployment group.

  - `updated_at: string`

    The RFC3339Nano timestamp when the deployment group was last updated.

  - `version_config: array of object { target_environment, version }`

    Contains version configurations for different target environments.

    - `target_environment: string`

      The target environment for the client version (e.g., windows, macos).

    - `version: string`

      The specific client version to deploy.

  - `policy_ids: optional array of string`

    Contains a list of policy IDs assigned to this deployment group.

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/deployment-groups/$GROUP_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2026-02-14T13:17:00.123456789Z",
    "name": "Engineering Ring 0",
    "updated_at": "2026-02-14T13:17:00.123456789Z",
    "version_config": [
      {
        "target_environment": "windows",
        "version": "2026.6.234.0"
      }
    ],
    "policy_ids": [
      "policy-uuid-1",
      "policy-uuid-2"
    ]
  },
  "success": true
}
```

## Create deployment group

**post** `/accounts/{account_id}/devices/deployment-groups`

Creates a new deployment group. Policy IDs must be unique across all deployment groups. This endpoint is in Beta.

### Path Parameters

- `account_id: string`

### Body Parameters

- `name: string`

  A user-friendly name for the deployment group.

- `version_config: array of object { target_environment, version }`

  Contains at least one version configuration.

  - `target_environment: string`

    The target environment for the client version (e.g., windows, macos).

  - `version: string`

    The specific client version to deploy.

- `policy_ids: optional array of string`

  Contains an optional list of policy IDs assigned to a group.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: DeploymentGroup`

  - `id: string`

    The ID of the deployment group.

  - `created_at: string`

    The RFC3339Nano timestamp when the deployment group was created.

  - `name: string`

    A user-friendly name for the deployment group.

  - `updated_at: string`

    The RFC3339Nano timestamp when the deployment group was last updated.

  - `version_config: array of object { target_environment, version }`

    Contains version configurations for different target environments.

    - `target_environment: string`

      The target environment for the client version (e.g., windows, macos).

    - `version: string`

      The specific client version to deploy.

  - `policy_ids: optional array of string`

    Contains a list of policy IDs assigned to this deployment group.

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/deployment-groups \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Engineering Ring 0",
          "version_config": [
            {
              "target_environment": "windows",
              "version": "2026.6.234.0"
            }
          ]
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2026-02-14T13:17:00.123456789Z",
    "name": "Engineering Ring 0",
    "updated_at": "2026-02-14T13:17:00.123456789Z",
    "version_config": [
      {
        "target_environment": "windows",
        "version": "2026.6.234.0"
      }
    ],
    "policy_ids": [
      "policy-uuid-1",
      "policy-uuid-2"
    ]
  },
  "success": true
}
```

## Update deployment group

**patch** `/accounts/{account_id}/devices/deployment-groups/{group_id}`

Updates a deployment group. Returns 409 if any newly added policy IDs already belong to another deployment group. This endpoint is in Beta.

### Path Parameters

- `account_id: string`

- `group_id: string`

### Body Parameters

- `name: optional string`

  A user-friendly name for the deployment group.

- `policy_ids: optional array of string`

  Replaces the entire list of policy IDs.

- `version_config: optional array of object { target_environment, version }`

  Replaces the entire version_config array.

  - `target_environment: string`

    The target environment for the client version (e.g., windows, macos).

  - `version: string`

    The specific client version to deploy.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: DeploymentGroup`

  - `id: string`

    The ID of the deployment group.

  - `created_at: string`

    The RFC3339Nano timestamp when the deployment group was created.

  - `name: string`

    A user-friendly name for the deployment group.

  - `updated_at: string`

    The RFC3339Nano timestamp when the deployment group was last updated.

  - `version_config: array of object { target_environment, version }`

    Contains version configurations for different target environments.

    - `target_environment: string`

      The target environment for the client version (e.g., windows, macos).

    - `version: string`

      The specific client version to deploy.

  - `policy_ids: optional array of string`

    Contains a list of policy IDs assigned to this deployment group.

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/deployment-groups/$GROUP_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Engineering Ring 0"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2026-02-14T13:17:00.123456789Z",
    "name": "Engineering Ring 0",
    "updated_at": "2026-02-14T13:17:00.123456789Z",
    "version_config": [
      {
        "target_environment": "windows",
        "version": "2026.6.234.0"
      }
    ],
    "policy_ids": [
      "policy-uuid-1",
      "policy-uuid-2"
    ]
  },
  "success": true
}
```

## Delete deployment group

**delete** `/accounts/{account_id}/devices/deployment-groups/{group_id}`

Deletes a deployment group. Associated policies no longer apply and devices stop receiving version targets. This endpoint is in Beta.

### Path Parameters

- `account_id: string`

- `group_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { id }`

  - `id: optional string`

    The ID of a deleted deployment group.

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/deployment-groups/$GROUP_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "550e8400-e29b-41d4-a716-446655440000"
  },
  "success": true
}
```

## Domain Types

### Deployment Group

- `DeploymentGroup object { id, created_at, name, 3 more }`

  - `id: string`

    The ID of the deployment group.

  - `created_at: string`

    The RFC3339Nano timestamp when the deployment group was created.

  - `name: string`

    A user-friendly name for the deployment group.

  - `updated_at: string`

    The RFC3339Nano timestamp when the deployment group was last updated.

  - `version_config: array of object { target_environment, version }`

    Contains version configurations for different target environments.

    - `target_environment: string`

      The target environment for the client version (e.g., windows, macos).

    - `version: string`

      The specific client version to deploy.

  - `policy_ids: optional array of string`

    Contains a list of policy IDs assigned to this deployment group.

### Deployment Group Delete Response

- `DeploymentGroupDeleteResponse object { id }`

  - `id: optional string`

    The ID of a deleted deployment group.

# Networks

## List your device managed networks

**get** `/accounts/{account_id}/devices/networks`

Fetches a list of managed networks for an account.

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

- `result: array of DeviceNetwork`

  - `config: optional object { tls_sockaddr, sha256 }`

    The configuration object containing information for the WARP client to detect the managed network.

    - `tls_sockaddr: string`

      A network address of the form "host:port" that the WARP client will use to detect the presence of a TLS host.

    - `sha256: optional string`

      The SHA-256 hash of the TLS certificate presented by the host found at tls_sockaddr. If absent, regular certificate verification (trusted roots, valid timestamp, etc) will be used to validate the certificate.

  - `name: optional string`

    The name of the device managed network. This name must be unique.

  - `network_id: optional string`

    API UUID.

  - `type: optional "tls"`

    The type of device managed network.

    - `"tls"`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/networks \
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
  "result": [
    {
      "config": {
        "tls_sockaddr": "foo.bar:1234",
        "sha256": "b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c"
      },
      "name": "managed-network-1",
      "network_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "type": "tls"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get device managed network details

**get** `/accounts/{account_id}/devices/networks/{network_id}`

Fetches details for a single managed network.

### Path Parameters

- `account_id: string`

- `network_id: string`

  API UUID.

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

- `result: DeviceNetwork`

  - `config: optional object { tls_sockaddr, sha256 }`

    The configuration object containing information for the WARP client to detect the managed network.

    - `tls_sockaddr: string`

      A network address of the form "host:port" that the WARP client will use to detect the presence of a TLS host.

    - `sha256: optional string`

      The SHA-256 hash of the TLS certificate presented by the host found at tls_sockaddr. If absent, regular certificate verification (trusted roots, valid timestamp, etc) will be used to validate the certificate.

  - `name: optional string`

    The name of the device managed network. This name must be unique.

  - `network_id: optional string`

    API UUID.

  - `type: optional "tls"`

    The type of device managed network.

    - `"tls"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/networks/$NETWORK_ID \
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
    "config": {
      "tls_sockaddr": "foo.bar:1234",
      "sha256": "b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c"
    },
    "name": "managed-network-1",
    "network_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "type": "tls"
  },
  "success": true
}
```

## Create a device managed network

**post** `/accounts/{account_id}/devices/networks`

Creates a new device managed network.

### Path Parameters

- `account_id: string`

### Body Parameters

- `config: object { tls_sockaddr, sha256 }`

  The configuration object containing information for the WARP client to detect the managed network.

  - `tls_sockaddr: string`

    A network address of the form "host:port" that the WARP client will use to detect the presence of a TLS host.

  - `sha256: optional string`

    The SHA-256 hash of the TLS certificate presented by the host found at tls_sockaddr. If absent, regular certificate verification (trusted roots, valid timestamp, etc) will be used to validate the certificate.

- `name: string`

  The name of the device managed network. This name must be unique.

- `type: "tls"`

  The type of device managed network.

  - `"tls"`

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

- `result: DeviceNetwork`

  - `config: optional object { tls_sockaddr, sha256 }`

    The configuration object containing information for the WARP client to detect the managed network.

    - `tls_sockaddr: string`

      A network address of the form "host:port" that the WARP client will use to detect the presence of a TLS host.

    - `sha256: optional string`

      The SHA-256 hash of the TLS certificate presented by the host found at tls_sockaddr. If absent, regular certificate verification (trusted roots, valid timestamp, etc) will be used to validate the certificate.

  - `name: optional string`

    The name of the device managed network. This name must be unique.

  - `network_id: optional string`

    API UUID.

  - `type: optional "tls"`

    The type of device managed network.

    - `"tls"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/networks \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "config": {
            "tls_sockaddr": "foo.bar:1234",
            "sha256": "b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c"
          },
          "name": "managed-network-1",
          "type": "tls"
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
    "config": {
      "tls_sockaddr": "foo.bar:1234",
      "sha256": "b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c"
    },
    "name": "managed-network-1",
    "network_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "type": "tls"
  },
  "success": true
}
```

## Update a device managed network

**put** `/accounts/{account_id}/devices/networks/{network_id}`

Updates a configured device managed network.

### Path Parameters

- `account_id: string`

- `network_id: string`

  API UUID.

### Body Parameters

- `config: optional object { tls_sockaddr, sha256 }`

  The configuration object containing information for the WARP client to detect the managed network.

  - `tls_sockaddr: string`

    A network address of the form "host:port" that the WARP client will use to detect the presence of a TLS host.

  - `sha256: optional string`

    The SHA-256 hash of the TLS certificate presented by the host found at tls_sockaddr. If absent, regular certificate verification (trusted roots, valid timestamp, etc) will be used to validate the certificate.

- `name: optional string`

  The name of the device managed network. This name must be unique.

- `type: optional "tls"`

  The type of device managed network.

  - `"tls"`

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

- `result: DeviceNetwork`

  - `config: optional object { tls_sockaddr, sha256 }`

    The configuration object containing information for the WARP client to detect the managed network.

    - `tls_sockaddr: string`

      A network address of the form "host:port" that the WARP client will use to detect the presence of a TLS host.

    - `sha256: optional string`

      The SHA-256 hash of the TLS certificate presented by the host found at tls_sockaddr. If absent, regular certificate verification (trusted roots, valid timestamp, etc) will be used to validate the certificate.

  - `name: optional string`

    The name of the device managed network. This name must be unique.

  - `network_id: optional string`

    API UUID.

  - `type: optional "tls"`

    The type of device managed network.

    - `"tls"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/networks/$NETWORK_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "config": {
            "tls_sockaddr": "foo.bar:1234",
            "sha256": "b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c"
          },
          "name": "managed-network-1",
          "type": "tls"
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
    "config": {
      "tls_sockaddr": "foo.bar:1234",
      "sha256": "b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c"
    },
    "name": "managed-network-1",
    "network_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "type": "tls"
  },
  "success": true
}
```

## Delete a device managed network

**delete** `/accounts/{account_id}/devices/networks/{network_id}`

Deletes a device managed network and fetches a list of the remaining device managed networks for an account.

### Path Parameters

- `account_id: string`

- `network_id: string`

  API UUID.

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

- `result: array of DeviceNetwork`

  - `config: optional object { tls_sockaddr, sha256 }`

    The configuration object containing information for the WARP client to detect the managed network.

    - `tls_sockaddr: string`

      A network address of the form "host:port" that the WARP client will use to detect the presence of a TLS host.

    - `sha256: optional string`

      The SHA-256 hash of the TLS certificate presented by the host found at tls_sockaddr. If absent, regular certificate verification (trusted roots, valid timestamp, etc) will be used to validate the certificate.

  - `name: optional string`

    The name of the device managed network. This name must be unique.

  - `network_id: optional string`

    API UUID.

  - `type: optional "tls"`

    The type of device managed network.

    - `"tls"`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/networks/$NETWORK_ID \
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
  "result": [
    {
      "config": {
        "tls_sockaddr": "foo.bar:1234",
        "sha256": "b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c"
      },
      "name": "managed-network-1",
      "network_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "type": "tls"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Domain Types

### Device Network

- `DeviceNetwork object { config, name, network_id, type }`

  - `config: optional object { tls_sockaddr, sha256 }`

    The configuration object containing information for the WARP client to detect the managed network.

    - `tls_sockaddr: string`

      A network address of the form "host:port" that the WARP client will use to detect the presence of a TLS host.

    - `sha256: optional string`

      The SHA-256 hash of the TLS certificate presented by the host found at tls_sockaddr. If absent, regular certificate verification (trusted roots, valid timestamp, etc) will be used to validate the certificate.

  - `name: optional string`

    The name of the device managed network. This name must be unique.

  - `network_id: optional string`

    API UUID.

  - `type: optional "tls"`

    The type of device managed network.

    - `"tls"`

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

# Policies

## Domain Types

### Device Policy Certificates

- `DevicePolicyCertificates object { enabled }`

  - `enabled: boolean`

    The current status of the device policy certificate provisioning feature for WARP clients.

### Fallback Domain

- `FallbackDomain object { suffix, description, dns_server }`

  - `suffix: string`

    The domain suffix to match when resolving locally.

  - `description: optional string`

    A description of the fallback domain, displayed in the client UI.

  - `dns_server: optional array of string`

    A list of IP addresses to handle domain resolution.

### Fallback Domain Policy

- `FallbackDomainPolicy = array of FallbackDomain`

  - `suffix: string`

    The domain suffix to match when resolving locally.

  - `description: optional string`

    A description of the fallback domain, displayed in the client UI.

  - `dns_server: optional array of string`

    A list of IP addresses to handle domain resolution.

### Settings Policy

- `SettingsPolicy object { allow_mode_switch, allow_updates, allowed_to_leave, 27 more }`

  - `allow_mode_switch: optional boolean`

    Whether to allow the user to switch WARP between modes.

  - `allow_updates: optional boolean`

    Whether to receive update notifications when a new version of the client is available.

  - `allowed_to_leave: optional boolean`

    Whether to allow devices to leave the organization.

  - `auto_connect: optional number`

    The amount of time in seconds to reconnect after having been disabled.

  - `captive_portal: optional number`

    Turn on the captive portal after the specified amount of time.

  - `default: optional boolean`

    Whether the policy is the default policy for an account.

  - `description: optional string`

    A description of the policy.

  - `disable_auto_fallback: optional boolean`

    If the `dns_server` field of a fallback domain is not present, the client will fall back to a best guess of the default/system DNS resolvers unless this policy option is set to `true`.

  - `dns_search_suffixes: optional array of object { suffix, description }`

    List of DNS search suffixes to apply to clients. Suffixes are evaluated in order. Use an empty array to clear.

    - `suffix: string`

      The DNS search suffix to append when resolving short hostnames.

    - `description: optional string`

      A description of the DNS search suffix.

  - `enabled: optional boolean`

    Whether the policy will be applied to matching devices.

  - `exclude: optional array of SplitTunnelExclude`

    List of routes excluded in the WARP client's tunnel.

    - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

      - `address: string`

        The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

    - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

      - `host: string`

        The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

  - `exclude_office_ips: optional boolean`

    Whether to add Microsoft IPs to Split Tunnel exclusions.

  - `fallback_domains: optional array of FallbackDomain`

    - `suffix: string`

      The domain suffix to match when resolving locally.

    - `description: optional string`

      A description of the fallback domain, displayed in the client UI.

    - `dns_server: optional array of string`

      A list of IP addresses to handle domain resolution.

  - `gateway_unique_id: optional string`

  - `global_acceleration: optional object { api_endpoints, enabled, masque_endpoints, wireguard_endpoints }`

    Global Acceleration settings for China. When configured, WARP clients connect to the Global Accelerator addresses instead of the default ones. Please contact your account representative to enable this feature on your account. See https://developers.cloudflare.com/china-network/concepts/global-acceleration/.

    - `api_endpoints: array of string`

      IP:port entries for the API endpoints.

    - `enabled: boolean`

      Global acceleration settings are used only when "enabled".

    - `masque_endpoints: array of string`

      IP:port entries for the MASQUE tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

    - `wireguard_endpoints: array of string`

      IP:port entries for the WireGuard tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

  - `include: optional array of SplitTunnelInclude`

    List of routes included in the WARP client's tunnel.

    - `TeamsDevicesIncludeSplitTunnelWithAddress object { address, description }`

      - `address: string`

        The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

    - `TeamsDevicesIncludeSplitTunnelWithHost object { host, description }`

      - `host: string`

        The domain name to include in the tunnel. If `host` is present, `address` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

  - `lan_allow_minutes: optional number`

    The amount of time in minutes a user is allowed access to their LAN. A value of 0 will allow LAN access until the next WARP reconnection, such as a reboot or a laptop waking from sleep. Note that this field is omitted from the response if null or unset.

  - `lan_allow_subnet_size: optional number`

    The size of the subnet for the local access network. Note that this field is omitted from the response if null or unset.

  - `match: optional string`

    The wirefilter expression to match devices. Available values: "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.service_token_uuid", "identity.saml_attributes", "network", "os.name", "os.version".

  - `name: optional string`

    The name of the device settings profile.

  - `policy_id: optional string`

  - `precedence: optional number`

    The precedence of the policy. Lower values indicate higher precedence. Policies will be evaluated in ascending order of this field.

  - `register_interface_ip_with_dns: optional boolean`

    Determines if the operating system will register WARP's local interface IP with your on-premises DNS server.

  - `sccm_vpn_boundary_support: optional boolean`

    Determines whether the WARP client indicates to SCCM that it is inside a VPN boundary. (Windows only).

  - `service_mode_v2: optional object { mode, port }`

    - `mode: optional string`

      The mode to run the WARP client under.

    - `port: optional number`

      The port number when used with proxy mode.

  - `support_url: optional string`

    The URL to launch when the Send Feedback button is clicked.

  - `switch_locked: optional boolean`

    Whether to allow the user to turn off the WARP switch and disconnect the client.

  - `target_tests: optional array of object { id, name }`

    - `id: optional string`

      The id of the DEX test targeting this policy.

    - `name: optional string`

      The name of the DEX test targeting this policy.

  - `tunnel_protocol: optional string`

    Determines which tunnel protocol to use.

  - `virtual_networks: optional object { allowed, default }`

    Virtual network access settings for the device.

    - `allowed: array of string`

      List of virtual network IDs the device is allowed to access. When virtual_networks is set, at least one entry is required.

    - `default: string`

      The default virtual network ID. Must be included in the `allowed` list.

### Split Tunnel Exclude

- `SplitTunnelExclude = object { address, description }  or object { host, description }`

  - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

### Split Tunnel Include

- `SplitTunnelInclude = object { address, description }  or object { host, description }`

  - `TeamsDevicesIncludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesIncludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to include in the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

# Default

## Get the default device settings profile

**get** `/accounts/{account_id}/devices/policy`

Fetches the default device settings profile for an account.

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

- `result: object { allow_mode_switch, allow_updates, allowed_to_leave, 20 more }`

  - `allow_mode_switch: optional boolean`

    Whether to allow the user to switch WARP between modes.

  - `allow_updates: optional boolean`

    Whether to receive update notifications when a new version of the client is available.

  - `allowed_to_leave: optional boolean`

    Whether to allow devices to leave the organization.

  - `auto_connect: optional number`

    The amount of time in seconds to reconnect after having been disabled.

  - `captive_portal: optional number`

    Turn on the captive portal after the specified amount of time.

  - `default: optional boolean`

    Whether the policy will be applied to matching devices.

  - `disable_auto_fallback: optional boolean`

    If the `dns_server` field of a fallback domain is not present, the client will fall back to a best guess of the default/system DNS resolvers unless this policy option is set to `true`.

  - `dns_search_suffixes: optional array of object { suffix, description }`

    List of DNS search suffixes to apply to clients. Suffixes are evaluated in order. Use an empty array to clear.

    - `suffix: string`

      The DNS search suffix to append when resolving short hostnames.

    - `description: optional string`

      A description of the DNS search suffix.

  - `enabled: optional boolean`

    Whether the policy will be applied to matching devices.

  - `exclude: optional array of SplitTunnelExclude`

    List of routes excluded in the WARP client's tunnel.

    - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

      - `address: string`

        The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

    - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

      - `host: string`

        The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

  - `exclude_office_ips: optional boolean`

    Whether to add Microsoft IPs to Split Tunnel exclusions.

  - `fallback_domains: optional array of FallbackDomain`

    - `suffix: string`

      The domain suffix to match when resolving locally.

    - `description: optional string`

      A description of the fallback domain, displayed in the client UI.

    - `dns_server: optional array of string`

      A list of IP addresses to handle domain resolution.

  - `gateway_unique_id: optional string`

  - `global_acceleration: optional object { api_endpoints, enabled, masque_endpoints, wireguard_endpoints }`

    Global Acceleration settings for China. When configured, WARP clients connect to the Global Accelerator addresses instead of the default ones. Please contact your account representative to enable this feature on your account. See https://developers.cloudflare.com/china-network/concepts/global-acceleration/.

    - `api_endpoints: array of string`

      IP:port entries for the API endpoints.

    - `enabled: boolean`

      Global acceleration settings are used only when "enabled".

    - `masque_endpoints: array of string`

      IP:port entries for the MASQUE tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

    - `wireguard_endpoints: array of string`

      IP:port entries for the WireGuard tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

  - `include: optional array of SplitTunnelInclude`

    List of routes included in the WARP client's tunnel.

    - `TeamsDevicesIncludeSplitTunnelWithAddress object { address, description }`

      - `address: string`

        The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

    - `TeamsDevicesIncludeSplitTunnelWithHost object { host, description }`

      - `host: string`

        The domain name to include in the tunnel. If `host` is present, `address` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

  - `policy_id: optional string`

  - `register_interface_ip_with_dns: optional boolean`

    Determines if the operating system will register WARP's local interface IP with your on-premises DNS server.

  - `sccm_vpn_boundary_support: optional boolean`

    Determines whether the WARP client indicates to SCCM that it is inside a VPN boundary. (Windows only).

  - `service_mode_v2: optional object { mode, port }`

    - `mode: optional string`

      The mode to run the WARP client under.

    - `port: optional number`

      The port number when used with proxy mode.

  - `support_url: optional string`

    The URL to launch when the Send Feedback button is clicked.

  - `switch_locked: optional boolean`

    Whether to allow the user to turn off the WARP switch and disconnect the client.

  - `tunnel_protocol: optional string`

    Determines which tunnel protocol to use.

  - `virtual_networks: optional object { allowed, default }`

    Virtual network access settings for the device.

    - `allowed: array of string`

      List of virtual network IDs the device is allowed to access. When virtual_networks is set, at least one entry is required.

    - `default: string`

      The default virtual network ID. Must be included in the `allowed` list.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy \
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
    "allow_mode_switch": true,
    "allow_updates": true,
    "allowed_to_leave": true,
    "auto_connect": 0,
    "captive_portal": 180,
    "default": true,
    "disable_auto_fallback": true,
    "dns_search_suffixes": [
      {
        "suffix": "internal.corp",
        "description": "Example internal domains"
      }
    ],
    "enabled": true,
    "exclude": [
      {
        "address": "192.0.2.0/24",
        "description": "Exclude testing domains from the tunnel"
      }
    ],
    "exclude_office_ips": true,
    "fallback_domains": [
      {
        "suffix": "example.com",
        "description": "Domain bypass for local development",
        "dns_server": [
          "1.1.1.1"
        ]
      }
    ],
    "gateway_unique_id": "699d98642c564d2e855e9661899b7252",
    "global_acceleration": {
      "api_endpoints": [
        "198.51.100.1:443"
      ],
      "enabled": true,
      "masque_endpoints": [
        "198.51.100.1:443"
      ],
      "wireguard_endpoints": [
        "198.51.100.1:2408"
      ]
    },
    "include": [
      {
        "address": "192.0.2.0/24",
        "description": "Include testing domains in the tunnel"
      }
    ],
    "policy_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "register_interface_ip_with_dns": true,
    "sccm_vpn_boundary_support": false,
    "service_mode_v2": {
      "mode": "proxy",
      "port": 3000
    },
    "support_url": "https://1.1.1.1/help",
    "switch_locked": true,
    "tunnel_protocol": "wireguard",
    "virtual_networks": {
      "allowed": [
        "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
      ],
      "default": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
    }
  },
  "success": true
}
```

## Update the default device settings profile

**patch** `/accounts/{account_id}/devices/policy`

Updates the default device settings profile for an account.

### Path Parameters

- `account_id: string`

### Body Parameters

- `allow_mode_switch: optional boolean`

  Whether to allow the user to switch WARP between modes.

- `allow_updates: optional boolean`

  Whether to receive update notifications when a new version of the client is available.

- `allowed_to_leave: optional boolean`

  Whether to allow devices to leave the organization.

- `auto_connect: optional number`

  The amount of time in seconds to reconnect after having been disabled.

- `captive_portal: optional number`

  Turn on the captive portal after the specified amount of time.

- `disable_auto_fallback: optional boolean`

  If the `dns_server` field of a fallback domain is not present, the client will fall back to a best guess of the default/system DNS resolvers unless this policy option is set to `true`.

- `dns_search_suffixes: optional array of object { suffix, description }`

  List of DNS search suffixes to apply to clients. Suffixes are evaluated in order. Use an empty array to clear.

  - `suffix: string`

    The DNS search suffix to append when resolving short hostnames.

  - `description: optional string`

    A description of the DNS search suffix.

- `exclude: optional array of SplitTunnelExclude`

  List of routes excluded in the WARP client's tunnel. Both 'exclude' and 'include' cannot be set in the same request.

  - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

- `exclude_office_ips: optional boolean`

  Whether to add Microsoft IPs to Split Tunnel exclusions.

- `global_acceleration: optional object { api_endpoints, enabled, masque_endpoints, wireguard_endpoints }`

  Global Acceleration settings for China. When configured, WARP clients connect to the Global Accelerator addresses instead of the default ones. Please contact your account representative to enable this feature on your account. See https://developers.cloudflare.com/china-network/concepts/global-acceleration/.

  - `api_endpoints: array of string`

    IP:port entries for the API endpoints.

  - `enabled: boolean`

    Global acceleration settings are used only when "enabled".

  - `masque_endpoints: array of string`

    IP:port entries for the MASQUE tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

  - `wireguard_endpoints: array of string`

    IP:port entries for the WireGuard tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

- `include: optional array of SplitTunnelInclude`

  List of routes included in the WARP client's tunnel. Both 'exclude' and 'include' cannot be set in the same request.

  - `TeamsDevicesIncludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesIncludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to include in the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

- `lan_allow_minutes: optional number`

  The amount of time in minutes a user is allowed access to their LAN. A value of 0 will allow LAN access until the next WARP reconnection, such as a reboot or a laptop waking from sleep. Note that this field is omitted from the response if null or unset.

- `lan_allow_subnet_size: optional number`

  The size of the subnet for the local access network. Note that this field is omitted from the response if null or unset.

- `register_interface_ip_with_dns: optional boolean`

  Determines if the operating system will register WARP's local interface IP with your on-premises DNS server.

- `sccm_vpn_boundary_support: optional boolean`

  Determines whether the WARP client indicates to SCCM that it is inside a VPN boundary. (Windows only).

- `service_mode_v2: optional object { mode, port }`

  - `mode: optional string`

    The mode to run the WARP client under.

  - `port: optional number`

    The port number when used with proxy mode.

- `support_url: optional string`

  The URL to launch when the Send Feedback button is clicked.

- `switch_locked: optional boolean`

  Whether to allow the user to turn off the WARP switch and disconnect the client.

- `tunnel_protocol: optional string`

  Determines which tunnel protocol to use.

- `virtual_networks: optional object { allowed, default }`

  Virtual network access settings for the device.

  - `allowed: array of string`

    List of virtual network IDs the device is allowed to access. When virtual_networks is set, at least one entry is required.

  - `default: string`

    The default virtual network ID. Must be included in the `allowed` list.

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

- `result: object { allow_mode_switch, allow_updates, allowed_to_leave, 20 more }`

  - `allow_mode_switch: optional boolean`

    Whether to allow the user to switch WARP between modes.

  - `allow_updates: optional boolean`

    Whether to receive update notifications when a new version of the client is available.

  - `allowed_to_leave: optional boolean`

    Whether to allow devices to leave the organization.

  - `auto_connect: optional number`

    The amount of time in seconds to reconnect after having been disabled.

  - `captive_portal: optional number`

    Turn on the captive portal after the specified amount of time.

  - `default: optional boolean`

    Whether the policy will be applied to matching devices.

  - `disable_auto_fallback: optional boolean`

    If the `dns_server` field of a fallback domain is not present, the client will fall back to a best guess of the default/system DNS resolvers unless this policy option is set to `true`.

  - `dns_search_suffixes: optional array of object { suffix, description }`

    List of DNS search suffixes to apply to clients. Suffixes are evaluated in order. Use an empty array to clear.

    - `suffix: string`

      The DNS search suffix to append when resolving short hostnames.

    - `description: optional string`

      A description of the DNS search suffix.

  - `enabled: optional boolean`

    Whether the policy will be applied to matching devices.

  - `exclude: optional array of SplitTunnelExclude`

    List of routes excluded in the WARP client's tunnel.

    - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

      - `address: string`

        The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

    - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

      - `host: string`

        The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

  - `exclude_office_ips: optional boolean`

    Whether to add Microsoft IPs to Split Tunnel exclusions.

  - `fallback_domains: optional array of FallbackDomain`

    - `suffix: string`

      The domain suffix to match when resolving locally.

    - `description: optional string`

      A description of the fallback domain, displayed in the client UI.

    - `dns_server: optional array of string`

      A list of IP addresses to handle domain resolution.

  - `gateway_unique_id: optional string`

  - `global_acceleration: optional object { api_endpoints, enabled, masque_endpoints, wireguard_endpoints }`

    Global Acceleration settings for China. When configured, WARP clients connect to the Global Accelerator addresses instead of the default ones. Please contact your account representative to enable this feature on your account. See https://developers.cloudflare.com/china-network/concepts/global-acceleration/.

    - `api_endpoints: array of string`

      IP:port entries for the API endpoints.

    - `enabled: boolean`

      Global acceleration settings are used only when "enabled".

    - `masque_endpoints: array of string`

      IP:port entries for the MASQUE tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

    - `wireguard_endpoints: array of string`

      IP:port entries for the WireGuard tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

  - `include: optional array of SplitTunnelInclude`

    List of routes included in the WARP client's tunnel.

    - `TeamsDevicesIncludeSplitTunnelWithAddress object { address, description }`

      - `address: string`

        The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

    - `TeamsDevicesIncludeSplitTunnelWithHost object { host, description }`

      - `host: string`

        The domain name to include in the tunnel. If `host` is present, `address` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

  - `policy_id: optional string`

  - `register_interface_ip_with_dns: optional boolean`

    Determines if the operating system will register WARP's local interface IP with your on-premises DNS server.

  - `sccm_vpn_boundary_support: optional boolean`

    Determines whether the WARP client indicates to SCCM that it is inside a VPN boundary. (Windows only).

  - `service_mode_v2: optional object { mode, port }`

    - `mode: optional string`

      The mode to run the WARP client under.

    - `port: optional number`

      The port number when used with proxy mode.

  - `support_url: optional string`

    The URL to launch when the Send Feedback button is clicked.

  - `switch_locked: optional boolean`

    Whether to allow the user to turn off the WARP switch and disconnect the client.

  - `tunnel_protocol: optional string`

    Determines which tunnel protocol to use.

  - `virtual_networks: optional object { allowed, default }`

    Virtual network access settings for the device.

    - `allowed: array of string`

      List of virtual network IDs the device is allowed to access. When virtual_networks is set, at least one entry is required.

    - `default: string`

      The default virtual network ID. Must be included in the `allowed` list.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "allow_mode_switch": true,
          "allow_updates": true,
          "allowed_to_leave": true,
          "captive_portal": 180,
          "disable_auto_fallback": true,
          "exclude_office_ips": true,
          "lan_allow_minutes": 30,
          "lan_allow_subnet_size": 24,
          "register_interface_ip_with_dns": true,
          "support_url": "https://1.1.1.1/help",
          "switch_locked": true,
          "tunnel_protocol": "wireguard"
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
    "allow_mode_switch": true,
    "allow_updates": true,
    "allowed_to_leave": true,
    "auto_connect": 0,
    "captive_portal": 180,
    "default": true,
    "disable_auto_fallback": true,
    "dns_search_suffixes": [
      {
        "suffix": "internal.corp",
        "description": "Example internal domains"
      }
    ],
    "enabled": true,
    "exclude": [
      {
        "address": "192.0.2.0/24",
        "description": "Exclude testing domains from the tunnel"
      }
    ],
    "exclude_office_ips": true,
    "fallback_domains": [
      {
        "suffix": "example.com",
        "description": "Domain bypass for local development",
        "dns_server": [
          "1.1.1.1"
        ]
      }
    ],
    "gateway_unique_id": "699d98642c564d2e855e9661899b7252",
    "global_acceleration": {
      "api_endpoints": [
        "198.51.100.1:443"
      ],
      "enabled": true,
      "masque_endpoints": [
        "198.51.100.1:443"
      ],
      "wireguard_endpoints": [
        "198.51.100.1:2408"
      ]
    },
    "include": [
      {
        "address": "192.0.2.0/24",
        "description": "Include testing domains in the tunnel"
      }
    ],
    "policy_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "register_interface_ip_with_dns": true,
    "sccm_vpn_boundary_support": false,
    "service_mode_v2": {
      "mode": "proxy",
      "port": 3000
    },
    "support_url": "https://1.1.1.1/help",
    "switch_locked": true,
    "tunnel_protocol": "wireguard",
    "virtual_networks": {
      "allowed": [
        "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
      ],
      "default": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
    }
  },
  "success": true
}
```

## Domain Types

### Default Get Response

- `DefaultGetResponse object { allow_mode_switch, allow_updates, allowed_to_leave, 20 more }`

  - `allow_mode_switch: optional boolean`

    Whether to allow the user to switch WARP between modes.

  - `allow_updates: optional boolean`

    Whether to receive update notifications when a new version of the client is available.

  - `allowed_to_leave: optional boolean`

    Whether to allow devices to leave the organization.

  - `auto_connect: optional number`

    The amount of time in seconds to reconnect after having been disabled.

  - `captive_portal: optional number`

    Turn on the captive portal after the specified amount of time.

  - `default: optional boolean`

    Whether the policy will be applied to matching devices.

  - `disable_auto_fallback: optional boolean`

    If the `dns_server` field of a fallback domain is not present, the client will fall back to a best guess of the default/system DNS resolvers unless this policy option is set to `true`.

  - `dns_search_suffixes: optional array of object { suffix, description }`

    List of DNS search suffixes to apply to clients. Suffixes are evaluated in order. Use an empty array to clear.

    - `suffix: string`

      The DNS search suffix to append when resolving short hostnames.

    - `description: optional string`

      A description of the DNS search suffix.

  - `enabled: optional boolean`

    Whether the policy will be applied to matching devices.

  - `exclude: optional array of SplitTunnelExclude`

    List of routes excluded in the WARP client's tunnel.

    - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

      - `address: string`

        The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

    - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

      - `host: string`

        The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

  - `exclude_office_ips: optional boolean`

    Whether to add Microsoft IPs to Split Tunnel exclusions.

  - `fallback_domains: optional array of FallbackDomain`

    - `suffix: string`

      The domain suffix to match when resolving locally.

    - `description: optional string`

      A description of the fallback domain, displayed in the client UI.

    - `dns_server: optional array of string`

      A list of IP addresses to handle domain resolution.

  - `gateway_unique_id: optional string`

  - `global_acceleration: optional object { api_endpoints, enabled, masque_endpoints, wireguard_endpoints }`

    Global Acceleration settings for China. When configured, WARP clients connect to the Global Accelerator addresses instead of the default ones. Please contact your account representative to enable this feature on your account. See https://developers.cloudflare.com/china-network/concepts/global-acceleration/.

    - `api_endpoints: array of string`

      IP:port entries for the API endpoints.

    - `enabled: boolean`

      Global acceleration settings are used only when "enabled".

    - `masque_endpoints: array of string`

      IP:port entries for the MASQUE tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

    - `wireguard_endpoints: array of string`

      IP:port entries for the WireGuard tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

  - `include: optional array of SplitTunnelInclude`

    List of routes included in the WARP client's tunnel.

    - `TeamsDevicesIncludeSplitTunnelWithAddress object { address, description }`

      - `address: string`

        The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

    - `TeamsDevicesIncludeSplitTunnelWithHost object { host, description }`

      - `host: string`

        The domain name to include in the tunnel. If `host` is present, `address` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

  - `policy_id: optional string`

  - `register_interface_ip_with_dns: optional boolean`

    Determines if the operating system will register WARP's local interface IP with your on-premises DNS server.

  - `sccm_vpn_boundary_support: optional boolean`

    Determines whether the WARP client indicates to SCCM that it is inside a VPN boundary. (Windows only).

  - `service_mode_v2: optional object { mode, port }`

    - `mode: optional string`

      The mode to run the WARP client under.

    - `port: optional number`

      The port number when used with proxy mode.

  - `support_url: optional string`

    The URL to launch when the Send Feedback button is clicked.

  - `switch_locked: optional boolean`

    Whether to allow the user to turn off the WARP switch and disconnect the client.

  - `tunnel_protocol: optional string`

    Determines which tunnel protocol to use.

  - `virtual_networks: optional object { allowed, default }`

    Virtual network access settings for the device.

    - `allowed: array of string`

      List of virtual network IDs the device is allowed to access. When virtual_networks is set, at least one entry is required.

    - `default: string`

      The default virtual network ID. Must be included in the `allowed` list.

### Default Edit Response

- `DefaultEditResponse object { allow_mode_switch, allow_updates, allowed_to_leave, 20 more }`

  - `allow_mode_switch: optional boolean`

    Whether to allow the user to switch WARP between modes.

  - `allow_updates: optional boolean`

    Whether to receive update notifications when a new version of the client is available.

  - `allowed_to_leave: optional boolean`

    Whether to allow devices to leave the organization.

  - `auto_connect: optional number`

    The amount of time in seconds to reconnect after having been disabled.

  - `captive_portal: optional number`

    Turn on the captive portal after the specified amount of time.

  - `default: optional boolean`

    Whether the policy will be applied to matching devices.

  - `disable_auto_fallback: optional boolean`

    If the `dns_server` field of a fallback domain is not present, the client will fall back to a best guess of the default/system DNS resolvers unless this policy option is set to `true`.

  - `dns_search_suffixes: optional array of object { suffix, description }`

    List of DNS search suffixes to apply to clients. Suffixes are evaluated in order. Use an empty array to clear.

    - `suffix: string`

      The DNS search suffix to append when resolving short hostnames.

    - `description: optional string`

      A description of the DNS search suffix.

  - `enabled: optional boolean`

    Whether the policy will be applied to matching devices.

  - `exclude: optional array of SplitTunnelExclude`

    List of routes excluded in the WARP client's tunnel.

    - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

      - `address: string`

        The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

    - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

      - `host: string`

        The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

  - `exclude_office_ips: optional boolean`

    Whether to add Microsoft IPs to Split Tunnel exclusions.

  - `fallback_domains: optional array of FallbackDomain`

    - `suffix: string`

      The domain suffix to match when resolving locally.

    - `description: optional string`

      A description of the fallback domain, displayed in the client UI.

    - `dns_server: optional array of string`

      A list of IP addresses to handle domain resolution.

  - `gateway_unique_id: optional string`

  - `global_acceleration: optional object { api_endpoints, enabled, masque_endpoints, wireguard_endpoints }`

    Global Acceleration settings for China. When configured, WARP clients connect to the Global Accelerator addresses instead of the default ones. Please contact your account representative to enable this feature on your account. See https://developers.cloudflare.com/china-network/concepts/global-acceleration/.

    - `api_endpoints: array of string`

      IP:port entries for the API endpoints.

    - `enabled: boolean`

      Global acceleration settings are used only when "enabled".

    - `masque_endpoints: array of string`

      IP:port entries for the MASQUE tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

    - `wireguard_endpoints: array of string`

      IP:port entries for the WireGuard tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

  - `include: optional array of SplitTunnelInclude`

    List of routes included in the WARP client's tunnel.

    - `TeamsDevicesIncludeSplitTunnelWithAddress object { address, description }`

      - `address: string`

        The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

    - `TeamsDevicesIncludeSplitTunnelWithHost object { host, description }`

      - `host: string`

        The domain name to include in the tunnel. If `host` is present, `address` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

  - `policy_id: optional string`

  - `register_interface_ip_with_dns: optional boolean`

    Determines if the operating system will register WARP's local interface IP with your on-premises DNS server.

  - `sccm_vpn_boundary_support: optional boolean`

    Determines whether the WARP client indicates to SCCM that it is inside a VPN boundary. (Windows only).

  - `service_mode_v2: optional object { mode, port }`

    - `mode: optional string`

      The mode to run the WARP client under.

    - `port: optional number`

      The port number when used with proxy mode.

  - `support_url: optional string`

    The URL to launch when the Send Feedback button is clicked.

  - `switch_locked: optional boolean`

    Whether to allow the user to turn off the WARP switch and disconnect the client.

  - `tunnel_protocol: optional string`

    Determines which tunnel protocol to use.

  - `virtual_networks: optional object { allowed, default }`

    Virtual network access settings for the device.

    - `allowed: array of string`

      List of virtual network IDs the device is allowed to access. When virtual_networks is set, at least one entry is required.

    - `default: string`

      The default virtual network ID. Must be included in the `allowed` list.

# Excludes

## Get the Split Tunnel exclude list

**get** `/accounts/{account_id}/devices/policy/exclude`

Fetches the list of routes excluded from the WARP client's tunnel.

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

- `result: array of SplitTunnelExclude`

  - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/exclude \
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
  "result": [
    {
      "address": "192.0.2.0/24",
      "description": "Exclude testing domains from the tunnel"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Set the Split Tunnel exclude list

**put** `/accounts/{account_id}/devices/policy/exclude`

Sets the list of routes excluded from the WARP client's tunnel.

### Path Parameters

- `account_id: string`

### Body Parameters

- `body: array of SplitTunnelExclude`

  - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

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

- `result: array of SplitTunnelExclude`

  - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/exclude \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "address": "192.0.2.0/24",
            "description": "Exclude testing domains from the tunnel"
          }
        ]'
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
  "result": [
    {
      "address": "192.0.2.0/24",
      "description": "Exclude testing domains from the tunnel"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

# Includes

## Get the Split Tunnel include list

**get** `/accounts/{account_id}/devices/policy/include`

Fetches the list of routes included in the WARP client's tunnel.

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

- `result: array of SplitTunnelInclude`

  - `TeamsDevicesIncludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesIncludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to include in the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/include \
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
  "result": [
    {
      "address": "192.0.2.0/24",
      "description": "Include testing domains in the tunnel"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Set the Split Tunnel include list

**put** `/accounts/{account_id}/devices/policy/include`

Sets the list of routes included in the WARP client's tunnel.

### Path Parameters

- `account_id: string`

### Body Parameters

- `body: array of SplitTunnelInclude`

  - `TeamsDevicesIncludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesIncludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to include in the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

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

- `result: array of SplitTunnelInclude`

  - `TeamsDevicesIncludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesIncludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to include in the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/include \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "address": "192.0.2.0/24",
            "description": "Include testing domains in the tunnel"
          }
        ]'
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
  "result": [
    {
      "address": "192.0.2.0/24",
      "description": "Include testing domains in the tunnel"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

# Fallback Domains

## Get your Local Domain Fallback list

**get** `/accounts/{account_id}/devices/policy/fallback_domains`

Fetches a list of domains to bypass Gateway DNS resolution. These domains will use the specified local DNS resolver instead.

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

- `result: array of FallbackDomain`

  - `suffix: string`

    The domain suffix to match when resolving locally.

  - `description: optional string`

    A description of the fallback domain, displayed in the client UI.

  - `dns_server: optional array of string`

    A list of IP addresses to handle domain resolution.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/fallback_domains \
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
  "result": [
    {
      "suffix": "example.com",
      "description": "Domain bypass for local development",
      "dns_server": [
        "1.1.1.1"
      ]
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Set your Local Domain Fallback list

**put** `/accounts/{account_id}/devices/policy/fallback_domains`

Sets the list of domains to bypass Gateway DNS resolution. These domains will use the specified local DNS resolver instead.

### Path Parameters

- `account_id: string`

### Body Parameters

- `domains: array of FallbackDomain`

  - `suffix: string`

    The domain suffix to match when resolving locally.

  - `description: optional string`

    A description of the fallback domain, displayed in the client UI.

  - `dns_server: optional array of string`

    A list of IP addresses to handle domain resolution.

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

- `result: array of FallbackDomain`

  - `suffix: string`

    The domain suffix to match when resolving locally.

  - `description: optional string`

    A description of the fallback domain, displayed in the client UI.

  - `dns_server: optional array of string`

    A list of IP addresses to handle domain resolution.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/fallback_domains \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "suffix": "example.com",
            "description": "Domain bypass for local development",
            "dns_server": [
              "1.1.1.1"
            ]
          }
        ]'
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
  "result": [
    {
      "suffix": "example.com",
      "description": "Domain bypass for local development",
      "dns_server": [
        "1.1.1.1"
      ]
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

# Certificates

## Get device certificate provisioning status

**get** `/zones/{zone_id}/devices/policy/certificates`

Fetches device certificate provisioning.

### Path Parameters

- `zone_id: string`

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

- `result: DevicePolicyCertificates`

  - `enabled: boolean`

    The current status of the device policy certificate provisioning feature for WARP clients.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/devices/policy/certificates \
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
    "enabled": true
  },
  "success": true
}
```

## Update device certificate provisioning status

**patch** `/zones/{zone_id}/devices/policy/certificates`

Enable Zero Trust Clients to provision a certificate, containing a x509 subject, and referenced by Access device posture policies when the client visits MTLS protected domains. This facilitates device posture without a WARP session.

### Path Parameters

- `zone_id: string`

### Body Parameters

- `enabled: boolean`

  The current status of the device policy certificate provisioning feature for WARP clients.

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

- `result: DevicePolicyCertificates`

  - `enabled: boolean`

    The current status of the device policy certificate provisioning feature for WARP clients.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/devices/policy/certificates \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true
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
    "enabled": true
  },
  "success": true
}
```

# Custom

## List device settings profiles

**get** `/accounts/{account_id}/devices/policies`

Fetches a list of the device settings profiles for an account.

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

- `result: array of SettingsPolicy`

  - `allow_mode_switch: optional boolean`

    Whether to allow the user to switch WARP between modes.

  - `allow_updates: optional boolean`

    Whether to receive update notifications when a new version of the client is available.

  - `allowed_to_leave: optional boolean`

    Whether to allow devices to leave the organization.

  - `auto_connect: optional number`

    The amount of time in seconds to reconnect after having been disabled.

  - `captive_portal: optional number`

    Turn on the captive portal after the specified amount of time.

  - `default: optional boolean`

    Whether the policy is the default policy for an account.

  - `description: optional string`

    A description of the policy.

  - `disable_auto_fallback: optional boolean`

    If the `dns_server` field of a fallback domain is not present, the client will fall back to a best guess of the default/system DNS resolvers unless this policy option is set to `true`.

  - `dns_search_suffixes: optional array of object { suffix, description }`

    List of DNS search suffixes to apply to clients. Suffixes are evaluated in order. Use an empty array to clear.

    - `suffix: string`

      The DNS search suffix to append when resolving short hostnames.

    - `description: optional string`

      A description of the DNS search suffix.

  - `enabled: optional boolean`

    Whether the policy will be applied to matching devices.

  - `exclude: optional array of SplitTunnelExclude`

    List of routes excluded in the WARP client's tunnel.

    - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

      - `address: string`

        The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

    - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

      - `host: string`

        The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

  - `exclude_office_ips: optional boolean`

    Whether to add Microsoft IPs to Split Tunnel exclusions.

  - `fallback_domains: optional array of FallbackDomain`

    - `suffix: string`

      The domain suffix to match when resolving locally.

    - `description: optional string`

      A description of the fallback domain, displayed in the client UI.

    - `dns_server: optional array of string`

      A list of IP addresses to handle domain resolution.

  - `gateway_unique_id: optional string`

  - `global_acceleration: optional object { api_endpoints, enabled, masque_endpoints, wireguard_endpoints }`

    Global Acceleration settings for China. When configured, WARP clients connect to the Global Accelerator addresses instead of the default ones. Please contact your account representative to enable this feature on your account. See https://developers.cloudflare.com/china-network/concepts/global-acceleration/.

    - `api_endpoints: array of string`

      IP:port entries for the API endpoints.

    - `enabled: boolean`

      Global acceleration settings are used only when "enabled".

    - `masque_endpoints: array of string`

      IP:port entries for the MASQUE tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

    - `wireguard_endpoints: array of string`

      IP:port entries for the WireGuard tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

  - `include: optional array of SplitTunnelInclude`

    List of routes included in the WARP client's tunnel.

    - `TeamsDevicesIncludeSplitTunnelWithAddress object { address, description }`

      - `address: string`

        The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

    - `TeamsDevicesIncludeSplitTunnelWithHost object { host, description }`

      - `host: string`

        The domain name to include in the tunnel. If `host` is present, `address` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

  - `lan_allow_minutes: optional number`

    The amount of time in minutes a user is allowed access to their LAN. A value of 0 will allow LAN access until the next WARP reconnection, such as a reboot or a laptop waking from sleep. Note that this field is omitted from the response if null or unset.

  - `lan_allow_subnet_size: optional number`

    The size of the subnet for the local access network. Note that this field is omitted from the response if null or unset.

  - `match: optional string`

    The wirefilter expression to match devices. Available values: "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.service_token_uuid", "identity.saml_attributes", "network", "os.name", "os.version".

  - `name: optional string`

    The name of the device settings profile.

  - `policy_id: optional string`

  - `precedence: optional number`

    The precedence of the policy. Lower values indicate higher precedence. Policies will be evaluated in ascending order of this field.

  - `register_interface_ip_with_dns: optional boolean`

    Determines if the operating system will register WARP's local interface IP with your on-premises DNS server.

  - `sccm_vpn_boundary_support: optional boolean`

    Determines whether the WARP client indicates to SCCM that it is inside a VPN boundary. (Windows only).

  - `service_mode_v2: optional object { mode, port }`

    - `mode: optional string`

      The mode to run the WARP client under.

    - `port: optional number`

      The port number when used with proxy mode.

  - `support_url: optional string`

    The URL to launch when the Send Feedback button is clicked.

  - `switch_locked: optional boolean`

    Whether to allow the user to turn off the WARP switch and disconnect the client.

  - `target_tests: optional array of object { id, name }`

    - `id: optional string`

      The id of the DEX test targeting this policy.

    - `name: optional string`

      The name of the DEX test targeting this policy.

  - `tunnel_protocol: optional string`

    Determines which tunnel protocol to use.

  - `virtual_networks: optional object { allowed, default }`

    Virtual network access settings for the device.

    - `allowed: array of string`

      List of virtual network IDs the device is allowed to access. When virtual_networks is set, at least one entry is required.

    - `default: string`

      The default virtual network ID. Must be included in the `allowed` list.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policies \
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
  "result": [
    {
      "allow_mode_switch": true,
      "allow_updates": true,
      "allowed_to_leave": true,
      "auto_connect": 0,
      "captive_portal": 180,
      "default": false,
      "description": "Policy for test teams.",
      "disable_auto_fallback": true,
      "dns_search_suffixes": [
        {
          "suffix": "internal.corp",
          "description": "Example internal domains"
        }
      ],
      "enabled": true,
      "exclude": [
        {
          "address": "192.0.2.0/24",
          "description": "Exclude testing domains from the tunnel"
        }
      ],
      "exclude_office_ips": true,
      "fallback_domains": [
        {
          "suffix": "example.com",
          "description": "Domain bypass for local development",
          "dns_server": [
            "1.1.1.1"
          ]
        }
      ],
      "gateway_unique_id": "699d98642c564d2e855e9661899b7252",
      "global_acceleration": {
        "api_endpoints": [
          "198.51.100.1:443"
        ],
        "enabled": true,
        "masque_endpoints": [
          "198.51.100.1:443"
        ],
        "wireguard_endpoints": [
          "198.51.100.1:2408"
        ]
      },
      "include": [
        {
          "address": "192.0.2.0/24",
          "description": "Include testing domains in the tunnel"
        }
      ],
      "lan_allow_minutes": 30,
      "lan_allow_subnet_size": 24,
      "match": "identity.email == \"test@cloudflare.com\"",
      "name": "Allow Developers",
      "policy_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "precedence": 100,
      "register_interface_ip_with_dns": true,
      "sccm_vpn_boundary_support": false,
      "service_mode_v2": {
        "mode": "proxy",
        "port": 3000
      },
      "support_url": "https://1.1.1.1/help",
      "switch_locked": true,
      "target_tests": [
        {
          "id": "id",
          "name": "name"
        }
      ],
      "tunnel_protocol": "wireguard",
      "virtual_networks": {
        "allowed": [
          "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
        ],
        "default": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
      }
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get device settings profile by ID

**get** `/accounts/{account_id}/devices/policy/{policy_id}`

Fetches a device settings profile by ID.

### Path Parameters

- `account_id: string`

- `policy_id: string`

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

- `result: SettingsPolicy`

  - `allow_mode_switch: optional boolean`

    Whether to allow the user to switch WARP between modes.

  - `allow_updates: optional boolean`

    Whether to receive update notifications when a new version of the client is available.

  - `allowed_to_leave: optional boolean`

    Whether to allow devices to leave the organization.

  - `auto_connect: optional number`

    The amount of time in seconds to reconnect after having been disabled.

  - `captive_portal: optional number`

    Turn on the captive portal after the specified amount of time.

  - `default: optional boolean`

    Whether the policy is the default policy for an account.

  - `description: optional string`

    A description of the policy.

  - `disable_auto_fallback: optional boolean`

    If the `dns_server` field of a fallback domain is not present, the client will fall back to a best guess of the default/system DNS resolvers unless this policy option is set to `true`.

  - `dns_search_suffixes: optional array of object { suffix, description }`

    List of DNS search suffixes to apply to clients. Suffixes are evaluated in order. Use an empty array to clear.

    - `suffix: string`

      The DNS search suffix to append when resolving short hostnames.

    - `description: optional string`

      A description of the DNS search suffix.

  - `enabled: optional boolean`

    Whether the policy will be applied to matching devices.

  - `exclude: optional array of SplitTunnelExclude`

    List of routes excluded in the WARP client's tunnel.

    - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

      - `address: string`

        The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

    - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

      - `host: string`

        The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

  - `exclude_office_ips: optional boolean`

    Whether to add Microsoft IPs to Split Tunnel exclusions.

  - `fallback_domains: optional array of FallbackDomain`

    - `suffix: string`

      The domain suffix to match when resolving locally.

    - `description: optional string`

      A description of the fallback domain, displayed in the client UI.

    - `dns_server: optional array of string`

      A list of IP addresses to handle domain resolution.

  - `gateway_unique_id: optional string`

  - `global_acceleration: optional object { api_endpoints, enabled, masque_endpoints, wireguard_endpoints }`

    Global Acceleration settings for China. When configured, WARP clients connect to the Global Accelerator addresses instead of the default ones. Please contact your account representative to enable this feature on your account. See https://developers.cloudflare.com/china-network/concepts/global-acceleration/.

    - `api_endpoints: array of string`

      IP:port entries for the API endpoints.

    - `enabled: boolean`

      Global acceleration settings are used only when "enabled".

    - `masque_endpoints: array of string`

      IP:port entries for the MASQUE tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

    - `wireguard_endpoints: array of string`

      IP:port entries for the WireGuard tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

  - `include: optional array of SplitTunnelInclude`

    List of routes included in the WARP client's tunnel.

    - `TeamsDevicesIncludeSplitTunnelWithAddress object { address, description }`

      - `address: string`

        The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

    - `TeamsDevicesIncludeSplitTunnelWithHost object { host, description }`

      - `host: string`

        The domain name to include in the tunnel. If `host` is present, `address` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

  - `lan_allow_minutes: optional number`

    The amount of time in minutes a user is allowed access to their LAN. A value of 0 will allow LAN access until the next WARP reconnection, such as a reboot or a laptop waking from sleep. Note that this field is omitted from the response if null or unset.

  - `lan_allow_subnet_size: optional number`

    The size of the subnet for the local access network. Note that this field is omitted from the response if null or unset.

  - `match: optional string`

    The wirefilter expression to match devices. Available values: "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.service_token_uuid", "identity.saml_attributes", "network", "os.name", "os.version".

  - `name: optional string`

    The name of the device settings profile.

  - `policy_id: optional string`

  - `precedence: optional number`

    The precedence of the policy. Lower values indicate higher precedence. Policies will be evaluated in ascending order of this field.

  - `register_interface_ip_with_dns: optional boolean`

    Determines if the operating system will register WARP's local interface IP with your on-premises DNS server.

  - `sccm_vpn_boundary_support: optional boolean`

    Determines whether the WARP client indicates to SCCM that it is inside a VPN boundary. (Windows only).

  - `service_mode_v2: optional object { mode, port }`

    - `mode: optional string`

      The mode to run the WARP client under.

    - `port: optional number`

      The port number when used with proxy mode.

  - `support_url: optional string`

    The URL to launch when the Send Feedback button is clicked.

  - `switch_locked: optional boolean`

    Whether to allow the user to turn off the WARP switch and disconnect the client.

  - `target_tests: optional array of object { id, name }`

    - `id: optional string`

      The id of the DEX test targeting this policy.

    - `name: optional string`

      The name of the DEX test targeting this policy.

  - `tunnel_protocol: optional string`

    Determines which tunnel protocol to use.

  - `virtual_networks: optional object { allowed, default }`

    Virtual network access settings for the device.

    - `allowed: array of string`

      List of virtual network IDs the device is allowed to access. When virtual_networks is set, at least one entry is required.

    - `default: string`

      The default virtual network ID. Must be included in the `allowed` list.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID \
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
    "allow_mode_switch": true,
    "allow_updates": true,
    "allowed_to_leave": true,
    "auto_connect": 0,
    "captive_portal": 180,
    "default": false,
    "description": "Policy for test teams.",
    "disable_auto_fallback": true,
    "dns_search_suffixes": [
      {
        "suffix": "internal.corp",
        "description": "Example internal domains"
      }
    ],
    "enabled": true,
    "exclude": [
      {
        "address": "192.0.2.0/24",
        "description": "Exclude testing domains from the tunnel"
      }
    ],
    "exclude_office_ips": true,
    "fallback_domains": [
      {
        "suffix": "example.com",
        "description": "Domain bypass for local development",
        "dns_server": [
          "1.1.1.1"
        ]
      }
    ],
    "gateway_unique_id": "699d98642c564d2e855e9661899b7252",
    "global_acceleration": {
      "api_endpoints": [
        "198.51.100.1:443"
      ],
      "enabled": true,
      "masque_endpoints": [
        "198.51.100.1:443"
      ],
      "wireguard_endpoints": [
        "198.51.100.1:2408"
      ]
    },
    "include": [
      {
        "address": "192.0.2.0/24",
        "description": "Include testing domains in the tunnel"
      }
    ],
    "lan_allow_minutes": 30,
    "lan_allow_subnet_size": 24,
    "match": "identity.email == \"test@cloudflare.com\"",
    "name": "Allow Developers",
    "policy_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "precedence": 100,
    "register_interface_ip_with_dns": true,
    "sccm_vpn_boundary_support": false,
    "service_mode_v2": {
      "mode": "proxy",
      "port": 3000
    },
    "support_url": "https://1.1.1.1/help",
    "switch_locked": true,
    "target_tests": [
      {
        "id": "id",
        "name": "name"
      }
    ],
    "tunnel_protocol": "wireguard",
    "virtual_networks": {
      "allowed": [
        "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
      ],
      "default": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
    }
  },
  "success": true
}
```

## Create a device settings profile

**post** `/accounts/{account_id}/devices/policy`

Creates a device settings profile to be applied to certain devices matching the criteria.

### Path Parameters

- `account_id: string`

### Body Parameters

- `match: string`

  The wirefilter expression to match devices. Available values: "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.service_token_uuid", "identity.saml_attributes", "network", "os.name", "os.version".

- `name: string`

  The name of the device settings profile.

- `precedence: number`

  The precedence of the policy. Lower values indicate higher precedence. Policies will be evaluated in ascending order of this field.

- `allow_mode_switch: optional boolean`

  Whether to allow the user to switch WARP between modes.

- `allow_updates: optional boolean`

  Whether to receive update notifications when a new version of the client is available.

- `allowed_to_leave: optional boolean`

  Whether to allow devices to leave the organization.

- `auto_connect: optional number`

  The amount of time in seconds to reconnect after having been disabled.

- `captive_portal: optional number`

  Turn on the captive portal after the specified amount of time.

- `description: optional string`

  A description of the policy.

- `disable_auto_fallback: optional boolean`

  If the `dns_server` field of a fallback domain is not present, the client will fall back to a best guess of the default/system DNS resolvers unless this policy option is set to `true`.

- `dns_search_suffixes: optional array of object { suffix, description }`

  List of DNS search suffixes to apply to clients. Suffixes are evaluated in order. Use an empty array to clear.

  - `suffix: string`

    The DNS search suffix to append when resolving short hostnames.

  - `description: optional string`

    A description of the DNS search suffix.

- `enabled: optional boolean`

  Whether the policy will be applied to matching devices.

- `exclude: optional array of SplitTunnelExclude`

  List of routes excluded in the WARP client's tunnel. Both 'exclude' and 'include' cannot be set in the same request.

  - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

- `exclude_office_ips: optional boolean`

  Whether to add Microsoft IPs to Split Tunnel exclusions.

- `global_acceleration: optional object { api_endpoints, enabled, masque_endpoints, wireguard_endpoints }`

  Global Acceleration settings for China. When configured, WARP clients connect to the Global Accelerator addresses instead of the default ones. Please contact your account representative to enable this feature on your account. See https://developers.cloudflare.com/china-network/concepts/global-acceleration/.

  - `api_endpoints: array of string`

    IP:port entries for the API endpoints.

  - `enabled: boolean`

    Global acceleration settings are used only when "enabled".

  - `masque_endpoints: array of string`

    IP:port entries for the MASQUE tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

  - `wireguard_endpoints: array of string`

    IP:port entries for the WireGuard tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

- `include: optional array of SplitTunnelInclude`

  List of routes included in the WARP client's tunnel. Both 'exclude' and 'include' cannot be set in the same request.

  - `TeamsDevicesIncludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesIncludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to include in the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

- `lan_allow_minutes: optional number`

  The amount of time in minutes a user is allowed access to their LAN. A value of 0 will allow LAN access until the next WARP reconnection, such as a reboot or a laptop waking from sleep. Note that this field is omitted from the response if null or unset.

- `lan_allow_subnet_size: optional number`

  The size of the subnet for the local access network. Note that this field is omitted from the response if null or unset.

- `register_interface_ip_with_dns: optional boolean`

  Determines if the operating system will register WARP's local interface IP with your on-premises DNS server.

- `sccm_vpn_boundary_support: optional boolean`

  Determines whether the WARP client indicates to SCCM that it is inside a VPN boundary. (Windows only).

- `service_mode_v2: optional object { mode, port }`

  - `mode: optional string`

    The mode to run the WARP client under.

  - `port: optional number`

    The port number when used with proxy mode.

- `support_url: optional string`

  The URL to launch when the Send Feedback button is clicked.

- `switch_locked: optional boolean`

  Whether to allow the user to turn off the WARP switch and disconnect the client.

- `tunnel_protocol: optional string`

  Determines which tunnel protocol to use.

- `virtual_networks: optional object { allowed, default }`

  Virtual network access settings for the device.

  - `allowed: array of string`

    List of virtual network IDs the device is allowed to access. When virtual_networks is set, at least one entry is required.

  - `default: string`

    The default virtual network ID. Must be included in the `allowed` list.

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

- `result: SettingsPolicy`

  - `allow_mode_switch: optional boolean`

    Whether to allow the user to switch WARP between modes.

  - `allow_updates: optional boolean`

    Whether to receive update notifications when a new version of the client is available.

  - `allowed_to_leave: optional boolean`

    Whether to allow devices to leave the organization.

  - `auto_connect: optional number`

    The amount of time in seconds to reconnect after having been disabled.

  - `captive_portal: optional number`

    Turn on the captive portal after the specified amount of time.

  - `default: optional boolean`

    Whether the policy is the default policy for an account.

  - `description: optional string`

    A description of the policy.

  - `disable_auto_fallback: optional boolean`

    If the `dns_server` field of a fallback domain is not present, the client will fall back to a best guess of the default/system DNS resolvers unless this policy option is set to `true`.

  - `dns_search_suffixes: optional array of object { suffix, description }`

    List of DNS search suffixes to apply to clients. Suffixes are evaluated in order. Use an empty array to clear.

    - `suffix: string`

      The DNS search suffix to append when resolving short hostnames.

    - `description: optional string`

      A description of the DNS search suffix.

  - `enabled: optional boolean`

    Whether the policy will be applied to matching devices.

  - `exclude: optional array of SplitTunnelExclude`

    List of routes excluded in the WARP client's tunnel.

    - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

      - `address: string`

        The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

    - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

      - `host: string`

        The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

  - `exclude_office_ips: optional boolean`

    Whether to add Microsoft IPs to Split Tunnel exclusions.

  - `fallback_domains: optional array of FallbackDomain`

    - `suffix: string`

      The domain suffix to match when resolving locally.

    - `description: optional string`

      A description of the fallback domain, displayed in the client UI.

    - `dns_server: optional array of string`

      A list of IP addresses to handle domain resolution.

  - `gateway_unique_id: optional string`

  - `global_acceleration: optional object { api_endpoints, enabled, masque_endpoints, wireguard_endpoints }`

    Global Acceleration settings for China. When configured, WARP clients connect to the Global Accelerator addresses instead of the default ones. Please contact your account representative to enable this feature on your account. See https://developers.cloudflare.com/china-network/concepts/global-acceleration/.

    - `api_endpoints: array of string`

      IP:port entries for the API endpoints.

    - `enabled: boolean`

      Global acceleration settings are used only when "enabled".

    - `masque_endpoints: array of string`

      IP:port entries for the MASQUE tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

    - `wireguard_endpoints: array of string`

      IP:port entries for the WireGuard tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

  - `include: optional array of SplitTunnelInclude`

    List of routes included in the WARP client's tunnel.

    - `TeamsDevicesIncludeSplitTunnelWithAddress object { address, description }`

      - `address: string`

        The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

    - `TeamsDevicesIncludeSplitTunnelWithHost object { host, description }`

      - `host: string`

        The domain name to include in the tunnel. If `host` is present, `address` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

  - `lan_allow_minutes: optional number`

    The amount of time in minutes a user is allowed access to their LAN. A value of 0 will allow LAN access until the next WARP reconnection, such as a reboot or a laptop waking from sleep. Note that this field is omitted from the response if null or unset.

  - `lan_allow_subnet_size: optional number`

    The size of the subnet for the local access network. Note that this field is omitted from the response if null or unset.

  - `match: optional string`

    The wirefilter expression to match devices. Available values: "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.service_token_uuid", "identity.saml_attributes", "network", "os.name", "os.version".

  - `name: optional string`

    The name of the device settings profile.

  - `policy_id: optional string`

  - `precedence: optional number`

    The precedence of the policy. Lower values indicate higher precedence. Policies will be evaluated in ascending order of this field.

  - `register_interface_ip_with_dns: optional boolean`

    Determines if the operating system will register WARP's local interface IP with your on-premises DNS server.

  - `sccm_vpn_boundary_support: optional boolean`

    Determines whether the WARP client indicates to SCCM that it is inside a VPN boundary. (Windows only).

  - `service_mode_v2: optional object { mode, port }`

    - `mode: optional string`

      The mode to run the WARP client under.

    - `port: optional number`

      The port number when used with proxy mode.

  - `support_url: optional string`

    The URL to launch when the Send Feedback button is clicked.

  - `switch_locked: optional boolean`

    Whether to allow the user to turn off the WARP switch and disconnect the client.

  - `target_tests: optional array of object { id, name }`

    - `id: optional string`

      The id of the DEX test targeting this policy.

    - `name: optional string`

      The name of the DEX test targeting this policy.

  - `tunnel_protocol: optional string`

    Determines which tunnel protocol to use.

  - `virtual_networks: optional object { allowed, default }`

    Virtual network access settings for the device.

    - `allowed: array of string`

      List of virtual network IDs the device is allowed to access. When virtual_networks is set, at least one entry is required.

    - `default: string`

      The default virtual network ID. Must be included in the `allowed` list.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "match": "identity.email == \\"test@cloudflare.com\\"",
          "name": "Allow Developers",
          "precedence": 100,
          "allow_mode_switch": true,
          "allow_updates": true,
          "allowed_to_leave": true,
          "captive_portal": 180,
          "description": "Policy for test teams.",
          "disable_auto_fallback": true,
          "enabled": true,
          "exclude_office_ips": true,
          "lan_allow_minutes": 30,
          "lan_allow_subnet_size": 24,
          "register_interface_ip_with_dns": true,
          "support_url": "https://1.1.1.1/help",
          "switch_locked": true,
          "tunnel_protocol": "wireguard"
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
    "allow_mode_switch": true,
    "allow_updates": true,
    "allowed_to_leave": true,
    "auto_connect": 0,
    "captive_portal": 180,
    "default": false,
    "description": "Policy for test teams.",
    "disable_auto_fallback": true,
    "dns_search_suffixes": [
      {
        "suffix": "internal.corp",
        "description": "Example internal domains"
      }
    ],
    "enabled": true,
    "exclude": [
      {
        "address": "192.0.2.0/24",
        "description": "Exclude testing domains from the tunnel"
      }
    ],
    "exclude_office_ips": true,
    "fallback_domains": [
      {
        "suffix": "example.com",
        "description": "Domain bypass for local development",
        "dns_server": [
          "1.1.1.1"
        ]
      }
    ],
    "gateway_unique_id": "699d98642c564d2e855e9661899b7252",
    "global_acceleration": {
      "api_endpoints": [
        "198.51.100.1:443"
      ],
      "enabled": true,
      "masque_endpoints": [
        "198.51.100.1:443"
      ],
      "wireguard_endpoints": [
        "198.51.100.1:2408"
      ]
    },
    "include": [
      {
        "address": "192.0.2.0/24",
        "description": "Include testing domains in the tunnel"
      }
    ],
    "lan_allow_minutes": 30,
    "lan_allow_subnet_size": 24,
    "match": "identity.email == \"test@cloudflare.com\"",
    "name": "Allow Developers",
    "policy_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "precedence": 100,
    "register_interface_ip_with_dns": true,
    "sccm_vpn_boundary_support": false,
    "service_mode_v2": {
      "mode": "proxy",
      "port": 3000
    },
    "support_url": "https://1.1.1.1/help",
    "switch_locked": true,
    "target_tests": [
      {
        "id": "id",
        "name": "name"
      }
    ],
    "tunnel_protocol": "wireguard",
    "virtual_networks": {
      "allowed": [
        "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
      ],
      "default": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
    }
  },
  "success": true
}
```

## Update a device settings profile

**patch** `/accounts/{account_id}/devices/policy/{policy_id}`

Updates a configured device settings profile.

### Path Parameters

- `account_id: string`

- `policy_id: string`

### Body Parameters

- `allow_mode_switch: optional boolean`

  Whether to allow the user to switch WARP between modes.

- `allow_updates: optional boolean`

  Whether to receive update notifications when a new version of the client is available.

- `allowed_to_leave: optional boolean`

  Whether to allow devices to leave the organization.

- `auto_connect: optional number`

  The amount of time in seconds to reconnect after having been disabled.

- `captive_portal: optional number`

  Turn on the captive portal after the specified amount of time.

- `description: optional string`

  A description of the policy.

- `disable_auto_fallback: optional boolean`

  If the `dns_server` field of a fallback domain is not present, the client will fall back to a best guess of the default/system DNS resolvers unless this policy option is set to `true`.

- `dns_search_suffixes: optional array of object { suffix, description }`

  List of DNS search suffixes to apply to clients. Suffixes are evaluated in order. Use an empty array to clear.

  - `suffix: string`

    The DNS search suffix to append when resolving short hostnames.

  - `description: optional string`

    A description of the DNS search suffix.

- `enabled: optional boolean`

  Whether the policy will be applied to matching devices.

- `exclude: optional array of SplitTunnelExclude`

  List of routes excluded in the WARP client's tunnel. Both 'exclude' and 'include' cannot be set in the same request.

  - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

- `exclude_office_ips: optional boolean`

  Whether to add Microsoft IPs to Split Tunnel exclusions.

- `global_acceleration: optional object { api_endpoints, enabled, masque_endpoints, wireguard_endpoints }`

  Global Acceleration settings for China. When configured, WARP clients connect to the Global Accelerator addresses instead of the default ones. Please contact your account representative to enable this feature on your account. See https://developers.cloudflare.com/china-network/concepts/global-acceleration/.

  - `api_endpoints: array of string`

    IP:port entries for the API endpoints.

  - `enabled: boolean`

    Global acceleration settings are used only when "enabled".

  - `masque_endpoints: array of string`

    IP:port entries for the MASQUE tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

  - `wireguard_endpoints: array of string`

    IP:port entries for the WireGuard tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

- `include: optional array of SplitTunnelInclude`

  List of routes included in the WARP client's tunnel. Both 'exclude' and 'include' cannot be set in the same request.

  - `TeamsDevicesIncludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesIncludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to include in the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

- `lan_allow_minutes: optional number`

  The amount of time in minutes a user is allowed access to their LAN. A value of 0 will allow LAN access until the next WARP reconnection, such as a reboot or a laptop waking from sleep. Note that this field is omitted from the response if null or unset.

- `lan_allow_subnet_size: optional number`

  The size of the subnet for the local access network. Note that this field is omitted from the response if null or unset.

- `match: optional string`

  The wirefilter expression to match devices. Available values: "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.service_token_uuid", "identity.saml_attributes", "network", "os.name", "os.version".

- `name: optional string`

  The name of the device settings profile.

- `precedence: optional number`

  The precedence of the policy. Lower values indicate higher precedence. Policies will be evaluated in ascending order of this field.

- `register_interface_ip_with_dns: optional boolean`

  Determines if the operating system will register WARP's local interface IP with your on-premises DNS server.

- `sccm_vpn_boundary_support: optional boolean`

  Determines whether the WARP client indicates to SCCM that it is inside a VPN boundary. (Windows only).

- `service_mode_v2: optional object { mode, port }`

  - `mode: optional string`

    The mode to run the WARP client under.

  - `port: optional number`

    The port number when used with proxy mode.

- `support_url: optional string`

  The URL to launch when the Send Feedback button is clicked.

- `switch_locked: optional boolean`

  Whether to allow the user to turn off the WARP switch and disconnect the client.

- `tunnel_protocol: optional string`

  Determines which tunnel protocol to use.

- `virtual_networks: optional object { allowed, default }`

  Virtual network access settings for the device.

  - `allowed: array of string`

    List of virtual network IDs the device is allowed to access. When virtual_networks is set, at least one entry is required.

  - `default: string`

    The default virtual network ID. Must be included in the `allowed` list.

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

- `result: SettingsPolicy`

  - `allow_mode_switch: optional boolean`

    Whether to allow the user to switch WARP between modes.

  - `allow_updates: optional boolean`

    Whether to receive update notifications when a new version of the client is available.

  - `allowed_to_leave: optional boolean`

    Whether to allow devices to leave the organization.

  - `auto_connect: optional number`

    The amount of time in seconds to reconnect after having been disabled.

  - `captive_portal: optional number`

    Turn on the captive portal after the specified amount of time.

  - `default: optional boolean`

    Whether the policy is the default policy for an account.

  - `description: optional string`

    A description of the policy.

  - `disable_auto_fallback: optional boolean`

    If the `dns_server` field of a fallback domain is not present, the client will fall back to a best guess of the default/system DNS resolvers unless this policy option is set to `true`.

  - `dns_search_suffixes: optional array of object { suffix, description }`

    List of DNS search suffixes to apply to clients. Suffixes are evaluated in order. Use an empty array to clear.

    - `suffix: string`

      The DNS search suffix to append when resolving short hostnames.

    - `description: optional string`

      A description of the DNS search suffix.

  - `enabled: optional boolean`

    Whether the policy will be applied to matching devices.

  - `exclude: optional array of SplitTunnelExclude`

    List of routes excluded in the WARP client's tunnel.

    - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

      - `address: string`

        The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

    - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

      - `host: string`

        The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

  - `exclude_office_ips: optional boolean`

    Whether to add Microsoft IPs to Split Tunnel exclusions.

  - `fallback_domains: optional array of FallbackDomain`

    - `suffix: string`

      The domain suffix to match when resolving locally.

    - `description: optional string`

      A description of the fallback domain, displayed in the client UI.

    - `dns_server: optional array of string`

      A list of IP addresses to handle domain resolution.

  - `gateway_unique_id: optional string`

  - `global_acceleration: optional object { api_endpoints, enabled, masque_endpoints, wireguard_endpoints }`

    Global Acceleration settings for China. When configured, WARP clients connect to the Global Accelerator addresses instead of the default ones. Please contact your account representative to enable this feature on your account. See https://developers.cloudflare.com/china-network/concepts/global-acceleration/.

    - `api_endpoints: array of string`

      IP:port entries for the API endpoints.

    - `enabled: boolean`

      Global acceleration settings are used only when "enabled".

    - `masque_endpoints: array of string`

      IP:port entries for the MASQUE tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

    - `wireguard_endpoints: array of string`

      IP:port entries for the WireGuard tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

  - `include: optional array of SplitTunnelInclude`

    List of routes included in the WARP client's tunnel.

    - `TeamsDevicesIncludeSplitTunnelWithAddress object { address, description }`

      - `address: string`

        The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

    - `TeamsDevicesIncludeSplitTunnelWithHost object { host, description }`

      - `host: string`

        The domain name to include in the tunnel. If `host` is present, `address` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

  - `lan_allow_minutes: optional number`

    The amount of time in minutes a user is allowed access to their LAN. A value of 0 will allow LAN access until the next WARP reconnection, such as a reboot or a laptop waking from sleep. Note that this field is omitted from the response if null or unset.

  - `lan_allow_subnet_size: optional number`

    The size of the subnet for the local access network. Note that this field is omitted from the response if null or unset.

  - `match: optional string`

    The wirefilter expression to match devices. Available values: "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.service_token_uuid", "identity.saml_attributes", "network", "os.name", "os.version".

  - `name: optional string`

    The name of the device settings profile.

  - `policy_id: optional string`

  - `precedence: optional number`

    The precedence of the policy. Lower values indicate higher precedence. Policies will be evaluated in ascending order of this field.

  - `register_interface_ip_with_dns: optional boolean`

    Determines if the operating system will register WARP's local interface IP with your on-premises DNS server.

  - `sccm_vpn_boundary_support: optional boolean`

    Determines whether the WARP client indicates to SCCM that it is inside a VPN boundary. (Windows only).

  - `service_mode_v2: optional object { mode, port }`

    - `mode: optional string`

      The mode to run the WARP client under.

    - `port: optional number`

      The port number when used with proxy mode.

  - `support_url: optional string`

    The URL to launch when the Send Feedback button is clicked.

  - `switch_locked: optional boolean`

    Whether to allow the user to turn off the WARP switch and disconnect the client.

  - `target_tests: optional array of object { id, name }`

    - `id: optional string`

      The id of the DEX test targeting this policy.

    - `name: optional string`

      The name of the DEX test targeting this policy.

  - `tunnel_protocol: optional string`

    Determines which tunnel protocol to use.

  - `virtual_networks: optional object { allowed, default }`

    Virtual network access settings for the device.

    - `allowed: array of string`

      List of virtual network IDs the device is allowed to access. When virtual_networks is set, at least one entry is required.

    - `default: string`

      The default virtual network ID. Must be included in the `allowed` list.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "allow_mode_switch": true,
          "allow_updates": true,
          "allowed_to_leave": true,
          "captive_portal": 180,
          "description": "Policy for test teams.",
          "disable_auto_fallback": true,
          "enabled": true,
          "exclude_office_ips": true,
          "lan_allow_minutes": 30,
          "lan_allow_subnet_size": 24,
          "match": "identity.email == \\"test@cloudflare.com\\"",
          "name": "Allow Developers",
          "precedence": 100,
          "register_interface_ip_with_dns": true,
          "support_url": "https://1.1.1.1/help",
          "switch_locked": true,
          "tunnel_protocol": "wireguard"
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
    "allow_mode_switch": true,
    "allow_updates": true,
    "allowed_to_leave": true,
    "auto_connect": 0,
    "captive_portal": 180,
    "default": false,
    "description": "Policy for test teams.",
    "disable_auto_fallback": true,
    "dns_search_suffixes": [
      {
        "suffix": "internal.corp",
        "description": "Example internal domains"
      }
    ],
    "enabled": true,
    "exclude": [
      {
        "address": "192.0.2.0/24",
        "description": "Exclude testing domains from the tunnel"
      }
    ],
    "exclude_office_ips": true,
    "fallback_domains": [
      {
        "suffix": "example.com",
        "description": "Domain bypass for local development",
        "dns_server": [
          "1.1.1.1"
        ]
      }
    ],
    "gateway_unique_id": "699d98642c564d2e855e9661899b7252",
    "global_acceleration": {
      "api_endpoints": [
        "198.51.100.1:443"
      ],
      "enabled": true,
      "masque_endpoints": [
        "198.51.100.1:443"
      ],
      "wireguard_endpoints": [
        "198.51.100.1:2408"
      ]
    },
    "include": [
      {
        "address": "192.0.2.0/24",
        "description": "Include testing domains in the tunnel"
      }
    ],
    "lan_allow_minutes": 30,
    "lan_allow_subnet_size": 24,
    "match": "identity.email == \"test@cloudflare.com\"",
    "name": "Allow Developers",
    "policy_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "precedence": 100,
    "register_interface_ip_with_dns": true,
    "sccm_vpn_boundary_support": false,
    "service_mode_v2": {
      "mode": "proxy",
      "port": 3000
    },
    "support_url": "https://1.1.1.1/help",
    "switch_locked": true,
    "target_tests": [
      {
        "id": "id",
        "name": "name"
      }
    ],
    "tunnel_protocol": "wireguard",
    "virtual_networks": {
      "allowed": [
        "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
      ],
      "default": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
    }
  },
  "success": true
}
```

## Delete a device settings profile

**delete** `/accounts/{account_id}/devices/policy/{policy_id}`

Deletes a device settings profile and fetches a list of the remaining profiles for an account.

### Path Parameters

- `account_id: string`

- `policy_id: string`

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

- `result: array of SettingsPolicy`

  - `allow_mode_switch: optional boolean`

    Whether to allow the user to switch WARP between modes.

  - `allow_updates: optional boolean`

    Whether to receive update notifications when a new version of the client is available.

  - `allowed_to_leave: optional boolean`

    Whether to allow devices to leave the organization.

  - `auto_connect: optional number`

    The amount of time in seconds to reconnect after having been disabled.

  - `captive_portal: optional number`

    Turn on the captive portal after the specified amount of time.

  - `default: optional boolean`

    Whether the policy is the default policy for an account.

  - `description: optional string`

    A description of the policy.

  - `disable_auto_fallback: optional boolean`

    If the `dns_server` field of a fallback domain is not present, the client will fall back to a best guess of the default/system DNS resolvers unless this policy option is set to `true`.

  - `dns_search_suffixes: optional array of object { suffix, description }`

    List of DNS search suffixes to apply to clients. Suffixes are evaluated in order. Use an empty array to clear.

    - `suffix: string`

      The DNS search suffix to append when resolving short hostnames.

    - `description: optional string`

      A description of the DNS search suffix.

  - `enabled: optional boolean`

    Whether the policy will be applied to matching devices.

  - `exclude: optional array of SplitTunnelExclude`

    List of routes excluded in the WARP client's tunnel.

    - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

      - `address: string`

        The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

    - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

      - `host: string`

        The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

  - `exclude_office_ips: optional boolean`

    Whether to add Microsoft IPs to Split Tunnel exclusions.

  - `fallback_domains: optional array of FallbackDomain`

    - `suffix: string`

      The domain suffix to match when resolving locally.

    - `description: optional string`

      A description of the fallback domain, displayed in the client UI.

    - `dns_server: optional array of string`

      A list of IP addresses to handle domain resolution.

  - `gateway_unique_id: optional string`

  - `global_acceleration: optional object { api_endpoints, enabled, masque_endpoints, wireguard_endpoints }`

    Global Acceleration settings for China. When configured, WARP clients connect to the Global Accelerator addresses instead of the default ones. Please contact your account representative to enable this feature on your account. See https://developers.cloudflare.com/china-network/concepts/global-acceleration/.

    - `api_endpoints: array of string`

      IP:port entries for the API endpoints.

    - `enabled: boolean`

      Global acceleration settings are used only when "enabled".

    - `masque_endpoints: array of string`

      IP:port entries for the MASQUE tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

    - `wireguard_endpoints: array of string`

      IP:port entries for the WireGuard tunnel endpoints. Either wireguard_endpoints or masque_endpoints must be provided.

  - `include: optional array of SplitTunnelInclude`

    List of routes included in the WARP client's tunnel.

    - `TeamsDevicesIncludeSplitTunnelWithAddress object { address, description }`

      - `address: string`

        The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

    - `TeamsDevicesIncludeSplitTunnelWithHost object { host, description }`

      - `host: string`

        The domain name to include in the tunnel. If `host` is present, `address` must not be present.

      - `description: optional string`

        A description of the Split Tunnel item, displayed in the client UI.

  - `lan_allow_minutes: optional number`

    The amount of time in minutes a user is allowed access to their LAN. A value of 0 will allow LAN access until the next WARP reconnection, such as a reboot or a laptop waking from sleep. Note that this field is omitted from the response if null or unset.

  - `lan_allow_subnet_size: optional number`

    The size of the subnet for the local access network. Note that this field is omitted from the response if null or unset.

  - `match: optional string`

    The wirefilter expression to match devices. Available values: "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.service_token_uuid", "identity.saml_attributes", "network", "os.name", "os.version".

  - `name: optional string`

    The name of the device settings profile.

  - `policy_id: optional string`

  - `precedence: optional number`

    The precedence of the policy. Lower values indicate higher precedence. Policies will be evaluated in ascending order of this field.

  - `register_interface_ip_with_dns: optional boolean`

    Determines if the operating system will register WARP's local interface IP with your on-premises DNS server.

  - `sccm_vpn_boundary_support: optional boolean`

    Determines whether the WARP client indicates to SCCM that it is inside a VPN boundary. (Windows only).

  - `service_mode_v2: optional object { mode, port }`

    - `mode: optional string`

      The mode to run the WARP client under.

    - `port: optional number`

      The port number when used with proxy mode.

  - `support_url: optional string`

    The URL to launch when the Send Feedback button is clicked.

  - `switch_locked: optional boolean`

    Whether to allow the user to turn off the WARP switch and disconnect the client.

  - `target_tests: optional array of object { id, name }`

    - `id: optional string`

      The id of the DEX test targeting this policy.

    - `name: optional string`

      The name of the DEX test targeting this policy.

  - `tunnel_protocol: optional string`

    Determines which tunnel protocol to use.

  - `virtual_networks: optional object { allowed, default }`

    Virtual network access settings for the device.

    - `allowed: array of string`

      List of virtual network IDs the device is allowed to access. When virtual_networks is set, at least one entry is required.

    - `default: string`

      The default virtual network ID. Must be included in the `allowed` list.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID \
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
  "result": [
    {
      "allow_mode_switch": true,
      "allow_updates": true,
      "allowed_to_leave": true,
      "auto_connect": 0,
      "captive_portal": 180,
      "default": false,
      "description": "Policy for test teams.",
      "disable_auto_fallback": true,
      "dns_search_suffixes": [
        {
          "suffix": "internal.corp",
          "description": "Example internal domains"
        }
      ],
      "enabled": true,
      "exclude": [
        {
          "address": "192.0.2.0/24",
          "description": "Exclude testing domains from the tunnel"
        }
      ],
      "exclude_office_ips": true,
      "fallback_domains": [
        {
          "suffix": "example.com",
          "description": "Domain bypass for local development",
          "dns_server": [
            "1.1.1.1"
          ]
        }
      ],
      "gateway_unique_id": "699d98642c564d2e855e9661899b7252",
      "global_acceleration": {
        "api_endpoints": [
          "198.51.100.1:443"
        ],
        "enabled": true,
        "masque_endpoints": [
          "198.51.100.1:443"
        ],
        "wireguard_endpoints": [
          "198.51.100.1:2408"
        ]
      },
      "include": [
        {
          "address": "192.0.2.0/24",
          "description": "Include testing domains in the tunnel"
        }
      ],
      "lan_allow_minutes": 30,
      "lan_allow_subnet_size": 24,
      "match": "identity.email == \"test@cloudflare.com\"",
      "name": "Allow Developers",
      "policy_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "precedence": 100,
      "register_interface_ip_with_dns": true,
      "sccm_vpn_boundary_support": false,
      "service_mode_v2": {
        "mode": "proxy",
        "port": 3000
      },
      "support_url": "https://1.1.1.1/help",
      "switch_locked": true,
      "target_tests": [
        {
          "id": "id",
          "name": "name"
        }
      ],
      "tunnel_protocol": "wireguard",
      "virtual_networks": {
        "allowed": [
          "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
        ],
        "default": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
      }
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

# Excludes

## Get the Split Tunnel exclude list for a device settings profile

**get** `/accounts/{account_id}/devices/policy/{policy_id}/exclude`

Fetches the list of routes excluded from the WARP client's tunnel for a specific device settings profile.

### Path Parameters

- `account_id: string`

- `policy_id: string`

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

- `result: array of SplitTunnelExclude`

  - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID/exclude \
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
  "result": [
    {
      "address": "192.0.2.0/24",
      "description": "Exclude testing domains from the tunnel"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Set the Split Tunnel exclude list for a device settings profile

**put** `/accounts/{account_id}/devices/policy/{policy_id}/exclude`

Sets the list of routes excluded from the WARP client's tunnel for a specific device settings profile.

### Path Parameters

- `account_id: string`

- `policy_id: string`

### Body Parameters

- `body: array of SplitTunnelExclude`

  - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

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

- `result: array of SplitTunnelExclude`

  - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID/exclude \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "address": "192.0.2.0/24",
            "description": "Exclude testing domains from the tunnel"
          }
        ]'
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
  "result": [
    {
      "address": "192.0.2.0/24",
      "description": "Exclude testing domains from the tunnel"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

# Includes

## Get the Split Tunnel include list for a device settings profile

**get** `/accounts/{account_id}/devices/policy/{policy_id}/include`

Fetches the list of routes included in the WARP client's tunnel for a specific device settings profile.

### Path Parameters

- `account_id: string`

- `policy_id: string`

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

- `result: array of SplitTunnelInclude`

  - `TeamsDevicesIncludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesIncludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to include in the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID/include \
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
  "result": [
    {
      "address": "192.0.2.0/24",
      "description": "Include testing domains in the tunnel"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Set the Split Tunnel include list for a device settings profile

**put** `/accounts/{account_id}/devices/policy/{policy_id}/include`

Sets the list of routes included in the WARP client's tunnel for a specific device settings profile.

### Path Parameters

- `account_id: string`

- `policy_id: string`

### Body Parameters

- `body: array of SplitTunnelInclude`

  - `TeamsDevicesIncludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesIncludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to include in the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

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

- `result: array of SplitTunnelInclude`

  - `TeamsDevicesIncludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesIncludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to include in the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID/include \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "address": "192.0.2.0/24",
            "description": "Include testing domains in the tunnel"
          }
        ]'
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
  "result": [
    {
      "address": "192.0.2.0/24",
      "description": "Include testing domains in the tunnel"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

# Fallback Domains

## Get the Local Domain Fallback list for a device settings profile

**get** `/accounts/{account_id}/devices/policy/{policy_id}/fallback_domains`

Fetches the list of domains to bypass Gateway DNS resolution from a specified device settings profile. These domains will use the specified local DNS resolver instead.

### Path Parameters

- `account_id: string`

- `policy_id: string`

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

- `result: array of FallbackDomain`

  - `suffix: string`

    The domain suffix to match when resolving locally.

  - `description: optional string`

    A description of the fallback domain, displayed in the client UI.

  - `dns_server: optional array of string`

    A list of IP addresses to handle domain resolution.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID/fallback_domains \
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
  "result": [
    {
      "suffix": "example.com",
      "description": "Domain bypass for local development",
      "dns_server": [
        "1.1.1.1"
      ]
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Set the Local Domain Fallback list for a device settings profile

**put** `/accounts/{account_id}/devices/policy/{policy_id}/fallback_domains`

Sets the list of domains to bypass Gateway DNS resolution. These domains will use the specified local DNS resolver instead. This will only apply to the specified device settings profile.

### Path Parameters

- `account_id: string`

- `policy_id: string`

### Body Parameters

- `domains: array of FallbackDomain`

  - `suffix: string`

    The domain suffix to match when resolving locally.

  - `description: optional string`

    A description of the fallback domain, displayed in the client UI.

  - `dns_server: optional array of string`

    A list of IP addresses to handle domain resolution.

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

- `result: array of FallbackDomain`

  - `suffix: string`

    The domain suffix to match when resolving locally.

  - `description: optional string`

    A description of the fallback domain, displayed in the client UI.

  - `dns_server: optional array of string`

    A list of IP addresses to handle domain resolution.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID/fallback_domains \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "suffix": "example.com",
            "description": "Domain bypass for local development",
            "dns_server": [
              "1.1.1.1"
            ]
          }
        ]'
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
  "result": [
    {
      "suffix": "example.com",
      "description": "Domain bypass for local development",
      "dns_server": [
        "1.1.1.1"
      ]
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

# Posture

## List device posture rules

**get** `/accounts/{account_id}/devices/posture`

Fetches device posture rules for a Zero Trust account.

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

- `result: array of DevicePostureRule`

  - `id: optional string`

    API UUID.

  - `description: optional string`

    The description of the device posture rule.

  - `expiration: optional string`

    Sets the expiration time for a posture check result. If empty, the result remains valid until it is overwritten by new data from the WARP client.

  - `input: optional DeviceInput`

    The value to be checked against.

    - `FileInput object { operating_system, path, exists, 2 more }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        File path.

      - `exists: optional boolean`

        Whether or not file exists.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `UniqueClientIDInput object { id, operating_system }`

      - `id: string`

        List ID.

      - `operating_system: "android" or "ios" or "chromeos"`

        Operating System.

        - `"android"`

        - `"ios"`

        - `"chromeos"`

    - `DomainJoinedInput object { operating_system, domain }`

      - `operating_system: "windows"`

        Operating System.

        - `"windows"`

      - `domain: optional string`

        Domain.

    - `OSVersionInput object { operating_system, operator, version, 3 more }`

      - `operating_system: "windows"`

        Operating System.

        - `"windows"`

      - `operator: "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `version: string`

        Version of OS.

      - `os_distro_name: optional string`

        Operating System Distribution Name (linux only).

      - `os_distro_revision: optional string`

        Version of OS Distribution (linux only).

      - `os_version_extra: optional string`

        Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

    - `FirewallInput object { enabled, operating_system }`

      - `enabled: boolean`

        Enabled.

      - `operating_system: "windows" or "mac"`

        Operating System.

        - `"windows"`

        - `"mac"`

    - `SentineloneInput object { operating_system, path, sha256, thumbprint }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        File path.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `TeamsDevicesCarbonblackInputRequest object { operating_system, path, sha256, thumbprint }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        File path.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `TeamsDevicesAccessSerialNumberListInputRequest object { id }`

      - `id: string`

        UUID of Access List.

    - `DiskEncryptionInput object { checkDisks, requireAll }`

      - `checkDisks: optional array of CarbonblackInput`

        List of volume names to be checked for encryption.

      - `requireAll: optional boolean`

        Whether to check all disks for encryption.

    - `TeamsDevicesApplicationInputRequest object { operating_system, path, sha256, thumbprint }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        Path for the application.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `ClientCertificateInput object { certificate_id, cn }`

      - `certificate_id: string`

        UUID of Cloudflare managed certificate.

      - `cn: string`

        Common Name that is protected by the certificate.

    - `TeamsDevicesClientCertificateV2InputRequest object { certificate_id, check_private_key, operating_system, 4 more }`

      - `certificate_id: string`

        UUID of Cloudflare managed certificate.

      - `check_private_key: boolean`

        Confirm the certificate was not imported from another device. We recommend keeping this enabled unless the certificate was deployed without a private key.

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `cn: optional string`

        Certificate Common Name. This may include one or more variables in the ${ } notation. Only ${serial_number} and ${hostname} are valid variables.

      - `extended_key_usage: optional array of "clientAuth" or "emailProtection"`

        List of values indicating purposes for which the certificate public key can be used.

        - `"clientAuth"`

        - `"emailProtection"`

      - `locations: optional object { paths, trust_stores }`

        - `paths: optional array of string`

          List of paths to check for client certificate on linux.

        - `trust_stores: optional array of "system" or "user"`

          List of trust stores to check for client certificate.

          - `"system"`

          - `"user"`

      - `subject_alternative_names: optional array of string`

        List of certificate Subject Alternative Names.

    - `TeamsDevicesAntivirusInputRequest object { update_window_days }`

      - `update_window_days: optional number`

        Number of days that the antivirus should be updated within.

    - `WorkspaceOneInput object { compliance_status, connection_id }`

      - `compliance_status: "compliant" or "noncompliant" or "unknown"`

        Compliance Status.

        - `"compliant"`

        - `"noncompliant"`

        - `"unknown"`

      - `connection_id: string`

        Posture Integration ID.

    - `CrowdstrikeInput object { connection_id, last_seen, operator, 6 more }`

      - `connection_id: string`

        Posture Integration ID.

      - `last_seen: optional string`

        For more details on last seen, please refer to the Crowdstrike documentation.

      - `operator: optional "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `os: optional string`

        Os Version.

      - `overall: optional string`

        Overall.

      - `sensor_config: optional string`

        SensorConfig.

      - `state: optional "online" or "offline" or "unknown"`

        For more details on state, please refer to the Crowdstrike documentation.

        - `"online"`

        - `"offline"`

        - `"unknown"`

      - `version: optional string`

        Version.

      - `versionOperator: optional "<" or "<=" or ">" or 2 more`

        Version Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

    - `IntuneInput object { compliance_status, connection_id }`

      - `compliance_status: "compliant" or "noncompliant" or "unknown" or 3 more`

        Compliance Status.

        - `"compliant"`

        - `"noncompliant"`

        - `"unknown"`

        - `"notapplicable"`

        - `"ingraceperiod"`

        - `"error"`

      - `connection_id: string`

        Posture Integration ID.

    - `KolideInput object { connection_id, auth_state, countOperator, issue_count }`

      - `connection_id: string`

        Posture Integration ID.

      - `auth_state: optional array of "Good" or "Notified" or "Will Block" or "Blocked"`

        The set of Kolide device authentication states that pass the posture check. Device must match one of the specified states.

        - `"Good"`

        - `"Notified"`

        - `"Will Block"`

        - `"Blocked"`

      - `countOperator: optional "<" or "<=" or ">" or 2 more`

        Count Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `issue_count: optional string`

        The Number of Issues.

    - `TaniumInput object { connection_id, eid_last_seen, operator, 3 more }`

      - `connection_id: string`

        Posture Integration ID.

      - `eid_last_seen: optional string`

        For more details on eid last seen, refer to the Tanium documentation.

      - `operator: optional "<" or "<=" or ">" or 2 more`

        Operator to evaluate risk_level or eid_last_seen.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `risk_level: optional "low" or "medium" or "high" or "critical"`

        For more details on risk level, refer to the Tanium documentation.

        - `"low"`

        - `"medium"`

        - `"high"`

        - `"critical"`

      - `scoreOperator: optional "<" or "<=" or ">" or 2 more`

        Score Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `total_score: optional number`

        For more details on total score, refer to the Tanium documentation.

    - `SentineloneS2sInput object { connection_id, active_threats, infected, 4 more }`

      - `connection_id: string`

        Posture Integration ID.

      - `active_threats: optional number`

        The Number of active threats.

      - `infected: optional boolean`

        Whether device is infected.

      - `is_active: optional boolean`

        Whether device is active.

      - `network_status: optional "connected" or "disconnected" or "disconnecting" or "connecting"`

        Network status of device.

        - `"connected"`

        - `"disconnected"`

        - `"disconnecting"`

        - `"connecting"`

      - `operational_state: optional "na" or "partially_disabled" or "auto_fully_disabled" or 4 more`

        Agent operational state.

        - `"na"`

        - `"partially_disabled"`

        - `"auto_fully_disabled"`

        - `"fully_disabled"`

        - `"auto_partially_disabled"`

        - `"disabled_error"`

        - `"db_corruption"`

      - `operator: optional "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

    - `TeamsDevicesCustomS2sInputRequest object { connection_id, operator, score }`

      - `connection_id: string`

        Posture Integration ID.

      - `operator: "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `score: number`

        A value between 0-100 assigned to devices set by the 3rd party posture provider.

  - `match: optional array of DeviceMatch`

    The conditions that the client must match to run the rule.

    - `platform: optional "windows" or "mac" or "linux" or 3 more`

      - `"windows"`

      - `"mac"`

      - `"linux"`

      - `"android"`

      - `"ios"`

      - `"chromeos"`

  - `name: optional string`

    The name of the device posture rule.

  - `schedule: optional string`

    Polling frequency for the WARP client posture check. Default: `5m` (poll every five minutes). Minimum: `1m`.

  - `type: optional "file" or "application" or "tanium" or 20 more`

    The type of device posture rule.

    - `"file"`

    - `"application"`

    - `"tanium"`

    - `"gateway"`

    - `"warp"`

    - `"disk_encryption"`

    - `"serial_number"`

    - `"sentinelone"`

    - `"carbonblack"`

    - `"firewall"`

    - `"os_version"`

    - `"domain_joined"`

    - `"client_certificate"`

    - `"client_certificate_v2"`

    - `"antivirus"`

    - `"unique_client_id"`

    - `"kolide"`

    - `"tanium_s2s"`

    - `"crowdstrike_s2s"`

    - `"intune"`

    - `"workspace_one"`

    - `"sentinelone_s2s"`

    - `"custom_s2s"`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/posture \
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
  "result": [
    {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "description": "The rule for admin serial numbers",
      "expiration": "1h",
      "input": {
        "operating_system": "linux",
        "path": "/bin/cat",
        "exists": true,
        "sha256": "https://api.us-2.crowdstrike.com",
        "thumbprint": "0aabab210bdb998e9cf45da2c9ce352977ab531c681b74cf1e487be1bbe9fe6e"
      },
      "match": [
        {
          "platform": "windows"
        }
      ],
      "name": "Admin Serial Numbers",
      "schedule": "1h",
      "type": "file"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get device posture rule details

**get** `/accounts/{account_id}/devices/posture/{rule_id}`

Fetches a single device posture rule.

### Path Parameters

- `account_id: string`

- `rule_id: string`

  API UUID.

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

- `result: DevicePostureRule`

  - `id: optional string`

    API UUID.

  - `description: optional string`

    The description of the device posture rule.

  - `expiration: optional string`

    Sets the expiration time for a posture check result. If empty, the result remains valid until it is overwritten by new data from the WARP client.

  - `input: optional DeviceInput`

    The value to be checked against.

    - `FileInput object { operating_system, path, exists, 2 more }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        File path.

      - `exists: optional boolean`

        Whether or not file exists.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `UniqueClientIDInput object { id, operating_system }`

      - `id: string`

        List ID.

      - `operating_system: "android" or "ios" or "chromeos"`

        Operating System.

        - `"android"`

        - `"ios"`

        - `"chromeos"`

    - `DomainJoinedInput object { operating_system, domain }`

      - `operating_system: "windows"`

        Operating System.

        - `"windows"`

      - `domain: optional string`

        Domain.

    - `OSVersionInput object { operating_system, operator, version, 3 more }`

      - `operating_system: "windows"`

        Operating System.

        - `"windows"`

      - `operator: "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `version: string`

        Version of OS.

      - `os_distro_name: optional string`

        Operating System Distribution Name (linux only).

      - `os_distro_revision: optional string`

        Version of OS Distribution (linux only).

      - `os_version_extra: optional string`

        Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

    - `FirewallInput object { enabled, operating_system }`

      - `enabled: boolean`

        Enabled.

      - `operating_system: "windows" or "mac"`

        Operating System.

        - `"windows"`

        - `"mac"`

    - `SentineloneInput object { operating_system, path, sha256, thumbprint }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        File path.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `TeamsDevicesCarbonblackInputRequest object { operating_system, path, sha256, thumbprint }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        File path.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `TeamsDevicesAccessSerialNumberListInputRequest object { id }`

      - `id: string`

        UUID of Access List.

    - `DiskEncryptionInput object { checkDisks, requireAll }`

      - `checkDisks: optional array of CarbonblackInput`

        List of volume names to be checked for encryption.

      - `requireAll: optional boolean`

        Whether to check all disks for encryption.

    - `TeamsDevicesApplicationInputRequest object { operating_system, path, sha256, thumbprint }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        Path for the application.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `ClientCertificateInput object { certificate_id, cn }`

      - `certificate_id: string`

        UUID of Cloudflare managed certificate.

      - `cn: string`

        Common Name that is protected by the certificate.

    - `TeamsDevicesClientCertificateV2InputRequest object { certificate_id, check_private_key, operating_system, 4 more }`

      - `certificate_id: string`

        UUID of Cloudflare managed certificate.

      - `check_private_key: boolean`

        Confirm the certificate was not imported from another device. We recommend keeping this enabled unless the certificate was deployed without a private key.

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `cn: optional string`

        Certificate Common Name. This may include one or more variables in the ${ } notation. Only ${serial_number} and ${hostname} are valid variables.

      - `extended_key_usage: optional array of "clientAuth" or "emailProtection"`

        List of values indicating purposes for which the certificate public key can be used.

        - `"clientAuth"`

        - `"emailProtection"`

      - `locations: optional object { paths, trust_stores }`

        - `paths: optional array of string`

          List of paths to check for client certificate on linux.

        - `trust_stores: optional array of "system" or "user"`

          List of trust stores to check for client certificate.

          - `"system"`

          - `"user"`

      - `subject_alternative_names: optional array of string`

        List of certificate Subject Alternative Names.

    - `TeamsDevicesAntivirusInputRequest object { update_window_days }`

      - `update_window_days: optional number`

        Number of days that the antivirus should be updated within.

    - `WorkspaceOneInput object { compliance_status, connection_id }`

      - `compliance_status: "compliant" or "noncompliant" or "unknown"`

        Compliance Status.

        - `"compliant"`

        - `"noncompliant"`

        - `"unknown"`

      - `connection_id: string`

        Posture Integration ID.

    - `CrowdstrikeInput object { connection_id, last_seen, operator, 6 more }`

      - `connection_id: string`

        Posture Integration ID.

      - `last_seen: optional string`

        For more details on last seen, please refer to the Crowdstrike documentation.

      - `operator: optional "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `os: optional string`

        Os Version.

      - `overall: optional string`

        Overall.

      - `sensor_config: optional string`

        SensorConfig.

      - `state: optional "online" or "offline" or "unknown"`

        For more details on state, please refer to the Crowdstrike documentation.

        - `"online"`

        - `"offline"`

        - `"unknown"`

      - `version: optional string`

        Version.

      - `versionOperator: optional "<" or "<=" or ">" or 2 more`

        Version Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

    - `IntuneInput object { compliance_status, connection_id }`

      - `compliance_status: "compliant" or "noncompliant" or "unknown" or 3 more`

        Compliance Status.

        - `"compliant"`

        - `"noncompliant"`

        - `"unknown"`

        - `"notapplicable"`

        - `"ingraceperiod"`

        - `"error"`

      - `connection_id: string`

        Posture Integration ID.

    - `KolideInput object { connection_id, auth_state, countOperator, issue_count }`

      - `connection_id: string`

        Posture Integration ID.

      - `auth_state: optional array of "Good" or "Notified" or "Will Block" or "Blocked"`

        The set of Kolide device authentication states that pass the posture check. Device must match one of the specified states.

        - `"Good"`

        - `"Notified"`

        - `"Will Block"`

        - `"Blocked"`

      - `countOperator: optional "<" or "<=" or ">" or 2 more`

        Count Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `issue_count: optional string`

        The Number of Issues.

    - `TaniumInput object { connection_id, eid_last_seen, operator, 3 more }`

      - `connection_id: string`

        Posture Integration ID.

      - `eid_last_seen: optional string`

        For more details on eid last seen, refer to the Tanium documentation.

      - `operator: optional "<" or "<=" or ">" or 2 more`

        Operator to evaluate risk_level or eid_last_seen.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `risk_level: optional "low" or "medium" or "high" or "critical"`

        For more details on risk level, refer to the Tanium documentation.

        - `"low"`

        - `"medium"`

        - `"high"`

        - `"critical"`

      - `scoreOperator: optional "<" or "<=" or ">" or 2 more`

        Score Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `total_score: optional number`

        For more details on total score, refer to the Tanium documentation.

    - `SentineloneS2sInput object { connection_id, active_threats, infected, 4 more }`

      - `connection_id: string`

        Posture Integration ID.

      - `active_threats: optional number`

        The Number of active threats.

      - `infected: optional boolean`

        Whether device is infected.

      - `is_active: optional boolean`

        Whether device is active.

      - `network_status: optional "connected" or "disconnected" or "disconnecting" or "connecting"`

        Network status of device.

        - `"connected"`

        - `"disconnected"`

        - `"disconnecting"`

        - `"connecting"`

      - `operational_state: optional "na" or "partially_disabled" or "auto_fully_disabled" or 4 more`

        Agent operational state.

        - `"na"`

        - `"partially_disabled"`

        - `"auto_fully_disabled"`

        - `"fully_disabled"`

        - `"auto_partially_disabled"`

        - `"disabled_error"`

        - `"db_corruption"`

      - `operator: optional "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

    - `TeamsDevicesCustomS2sInputRequest object { connection_id, operator, score }`

      - `connection_id: string`

        Posture Integration ID.

      - `operator: "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `score: number`

        A value between 0-100 assigned to devices set by the 3rd party posture provider.

  - `match: optional array of DeviceMatch`

    The conditions that the client must match to run the rule.

    - `platform: optional "windows" or "mac" or "linux" or 3 more`

      - `"windows"`

      - `"mac"`

      - `"linux"`

      - `"android"`

      - `"ios"`

      - `"chromeos"`

  - `name: optional string`

    The name of the device posture rule.

  - `schedule: optional string`

    Polling frequency for the WARP client posture check. Default: `5m` (poll every five minutes). Minimum: `1m`.

  - `type: optional "file" or "application" or "tanium" or 20 more`

    The type of device posture rule.

    - `"file"`

    - `"application"`

    - `"tanium"`

    - `"gateway"`

    - `"warp"`

    - `"disk_encryption"`

    - `"serial_number"`

    - `"sentinelone"`

    - `"carbonblack"`

    - `"firewall"`

    - `"os_version"`

    - `"domain_joined"`

    - `"client_certificate"`

    - `"client_certificate_v2"`

    - `"antivirus"`

    - `"unique_client_id"`

    - `"kolide"`

    - `"tanium_s2s"`

    - `"crowdstrike_s2s"`

    - `"intune"`

    - `"workspace_one"`

    - `"sentinelone_s2s"`

    - `"custom_s2s"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/posture/$RULE_ID \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "description": "The rule for admin serial numbers",
    "expiration": "1h",
    "input": {
      "operating_system": "linux",
      "path": "/bin/cat",
      "exists": true,
      "sha256": "https://api.us-2.crowdstrike.com",
      "thumbprint": "0aabab210bdb998e9cf45da2c9ce352977ab531c681b74cf1e487be1bbe9fe6e"
    },
    "match": [
      {
        "platform": "windows"
      }
    ],
    "name": "Admin Serial Numbers",
    "schedule": "1h",
    "type": "file"
  },
  "success": true
}
```

## Create a device posture rule

**post** `/accounts/{account_id}/devices/posture`

Creates a new device posture rule.

### Path Parameters

- `account_id: string`

### Body Parameters

- `name: string`

  The name of the device posture rule.

- `type: "file" or "application" or "tanium" or 20 more`

  The type of device posture rule.

  - `"file"`

  - `"application"`

  - `"tanium"`

  - `"gateway"`

  - `"warp"`

  - `"disk_encryption"`

  - `"serial_number"`

  - `"sentinelone"`

  - `"carbonblack"`

  - `"firewall"`

  - `"os_version"`

  - `"domain_joined"`

  - `"client_certificate"`

  - `"client_certificate_v2"`

  - `"antivirus"`

  - `"unique_client_id"`

  - `"kolide"`

  - `"tanium_s2s"`

  - `"crowdstrike_s2s"`

  - `"intune"`

  - `"workspace_one"`

  - `"sentinelone_s2s"`

  - `"custom_s2s"`

- `description: optional string`

  The description of the device posture rule.

- `expiration: optional string`

  Sets the expiration time for a posture check result. If empty, the result remains valid until it is overwritten by new data from the WARP client.

- `input: optional DeviceInput`

  The value to be checked against.

  - `FileInput object { operating_system, path, exists, 2 more }`

    - `operating_system: "windows" or "linux" or "mac"`

      Operating system.

      - `"windows"`

      - `"linux"`

      - `"mac"`

    - `path: string`

      File path.

    - `exists: optional boolean`

      Whether or not file exists.

    - `sha256: optional string`

      SHA-256.

    - `thumbprint: optional string`

      Signing certificate thumbprint.

  - `UniqueClientIDInput object { id, operating_system }`

    - `id: string`

      List ID.

    - `operating_system: "android" or "ios" or "chromeos"`

      Operating System.

      - `"android"`

      - `"ios"`

      - `"chromeos"`

  - `DomainJoinedInput object { operating_system, domain }`

    - `operating_system: "windows"`

      Operating System.

      - `"windows"`

    - `domain: optional string`

      Domain.

  - `OSVersionInput object { operating_system, operator, version, 3 more }`

    - `operating_system: "windows"`

      Operating System.

      - `"windows"`

    - `operator: "<" or "<=" or ">" or 2 more`

      Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `version: string`

      Version of OS.

    - `os_distro_name: optional string`

      Operating System Distribution Name (linux only).

    - `os_distro_revision: optional string`

      Version of OS Distribution (linux only).

    - `os_version_extra: optional string`

      Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

  - `FirewallInput object { enabled, operating_system }`

    - `enabled: boolean`

      Enabled.

    - `operating_system: "windows" or "mac"`

      Operating System.

      - `"windows"`

      - `"mac"`

  - `SentineloneInput object { operating_system, path, sha256, thumbprint }`

    - `operating_system: "windows" or "linux" or "mac"`

      Operating system.

      - `"windows"`

      - `"linux"`

      - `"mac"`

    - `path: string`

      File path.

    - `sha256: optional string`

      SHA-256.

    - `thumbprint: optional string`

      Signing certificate thumbprint.

  - `TeamsDevicesCarbonblackInputRequest object { operating_system, path, sha256, thumbprint }`

    - `operating_system: "windows" or "linux" or "mac"`

      Operating system.

      - `"windows"`

      - `"linux"`

      - `"mac"`

    - `path: string`

      File path.

    - `sha256: optional string`

      SHA-256.

    - `thumbprint: optional string`

      Signing certificate thumbprint.

  - `TeamsDevicesAccessSerialNumberListInputRequest object { id }`

    - `id: string`

      UUID of Access List.

  - `DiskEncryptionInput object { checkDisks, requireAll }`

    - `checkDisks: optional array of CarbonblackInput`

      List of volume names to be checked for encryption.

    - `requireAll: optional boolean`

      Whether to check all disks for encryption.

  - `TeamsDevicesApplicationInputRequest object { operating_system, path, sha256, thumbprint }`

    - `operating_system: "windows" or "linux" or "mac"`

      Operating system.

      - `"windows"`

      - `"linux"`

      - `"mac"`

    - `path: string`

      Path for the application.

    - `sha256: optional string`

      SHA-256.

    - `thumbprint: optional string`

      Signing certificate thumbprint.

  - `ClientCertificateInput object { certificate_id, cn }`

    - `certificate_id: string`

      UUID of Cloudflare managed certificate.

    - `cn: string`

      Common Name that is protected by the certificate.

  - `TeamsDevicesClientCertificateV2InputRequest object { certificate_id, check_private_key, operating_system, 4 more }`

    - `certificate_id: string`

      UUID of Cloudflare managed certificate.

    - `check_private_key: boolean`

      Confirm the certificate was not imported from another device. We recommend keeping this enabled unless the certificate was deployed without a private key.

    - `operating_system: "windows" or "linux" or "mac"`

      Operating system.

      - `"windows"`

      - `"linux"`

      - `"mac"`

    - `cn: optional string`

      Certificate Common Name. This may include one or more variables in the ${ } notation. Only ${serial_number} and ${hostname} are valid variables.

    - `extended_key_usage: optional array of "clientAuth" or "emailProtection"`

      List of values indicating purposes for which the certificate public key can be used.

      - `"clientAuth"`

      - `"emailProtection"`

    - `locations: optional object { paths, trust_stores }`

      - `paths: optional array of string`

        List of paths to check for client certificate on linux.

      - `trust_stores: optional array of "system" or "user"`

        List of trust stores to check for client certificate.

        - `"system"`

        - `"user"`

    - `subject_alternative_names: optional array of string`

      List of certificate Subject Alternative Names.

  - `TeamsDevicesAntivirusInputRequest object { update_window_days }`

    - `update_window_days: optional number`

      Number of days that the antivirus should be updated within.

  - `WorkspaceOneInput object { compliance_status, connection_id }`

    - `compliance_status: "compliant" or "noncompliant" or "unknown"`

      Compliance Status.

      - `"compliant"`

      - `"noncompliant"`

      - `"unknown"`

    - `connection_id: string`

      Posture Integration ID.

  - `CrowdstrikeInput object { connection_id, last_seen, operator, 6 more }`

    - `connection_id: string`

      Posture Integration ID.

    - `last_seen: optional string`

      For more details on last seen, please refer to the Crowdstrike documentation.

    - `operator: optional "<" or "<=" or ">" or 2 more`

      Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `os: optional string`

      Os Version.

    - `overall: optional string`

      Overall.

    - `sensor_config: optional string`

      SensorConfig.

    - `state: optional "online" or "offline" or "unknown"`

      For more details on state, please refer to the Crowdstrike documentation.

      - `"online"`

      - `"offline"`

      - `"unknown"`

    - `version: optional string`

      Version.

    - `versionOperator: optional "<" or "<=" or ">" or 2 more`

      Version Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

  - `IntuneInput object { compliance_status, connection_id }`

    - `compliance_status: "compliant" or "noncompliant" or "unknown" or 3 more`

      Compliance Status.

      - `"compliant"`

      - `"noncompliant"`

      - `"unknown"`

      - `"notapplicable"`

      - `"ingraceperiod"`

      - `"error"`

    - `connection_id: string`

      Posture Integration ID.

  - `KolideInput object { connection_id, auth_state, countOperator, issue_count }`

    - `connection_id: string`

      Posture Integration ID.

    - `auth_state: optional array of "Good" or "Notified" or "Will Block" or "Blocked"`

      The set of Kolide device authentication states that pass the posture check. Device must match one of the specified states.

      - `"Good"`

      - `"Notified"`

      - `"Will Block"`

      - `"Blocked"`

    - `countOperator: optional "<" or "<=" or ">" or 2 more`

      Count Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `issue_count: optional string`

      The Number of Issues.

  - `TaniumInput object { connection_id, eid_last_seen, operator, 3 more }`

    - `connection_id: string`

      Posture Integration ID.

    - `eid_last_seen: optional string`

      For more details on eid last seen, refer to the Tanium documentation.

    - `operator: optional "<" or "<=" or ">" or 2 more`

      Operator to evaluate risk_level or eid_last_seen.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `risk_level: optional "low" or "medium" or "high" or "critical"`

      For more details on risk level, refer to the Tanium documentation.

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"critical"`

    - `scoreOperator: optional "<" or "<=" or ">" or 2 more`

      Score Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `total_score: optional number`

      For more details on total score, refer to the Tanium documentation.

  - `SentineloneS2sInput object { connection_id, active_threats, infected, 4 more }`

    - `connection_id: string`

      Posture Integration ID.

    - `active_threats: optional number`

      The Number of active threats.

    - `infected: optional boolean`

      Whether device is infected.

    - `is_active: optional boolean`

      Whether device is active.

    - `network_status: optional "connected" or "disconnected" or "disconnecting" or "connecting"`

      Network status of device.

      - `"connected"`

      - `"disconnected"`

      - `"disconnecting"`

      - `"connecting"`

    - `operational_state: optional "na" or "partially_disabled" or "auto_fully_disabled" or 4 more`

      Agent operational state.

      - `"na"`

      - `"partially_disabled"`

      - `"auto_fully_disabled"`

      - `"fully_disabled"`

      - `"auto_partially_disabled"`

      - `"disabled_error"`

      - `"db_corruption"`

    - `operator: optional "<" or "<=" or ">" or 2 more`

      Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

  - `TeamsDevicesCustomS2sInputRequest object { connection_id, operator, score }`

    - `connection_id: string`

      Posture Integration ID.

    - `operator: "<" or "<=" or ">" or 2 more`

      Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `score: number`

      A value between 0-100 assigned to devices set by the 3rd party posture provider.

- `match: optional array of DeviceMatch`

  The conditions that the client must match to run the rule.

  - `platform: optional "windows" or "mac" or "linux" or 3 more`

    - `"windows"`

    - `"mac"`

    - `"linux"`

    - `"android"`

    - `"ios"`

    - `"chromeos"`

- `schedule: optional string`

  Polling frequency for the WARP client posture check. Default: `5m` (poll every five minutes). Minimum: `1m`.

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

- `result: DevicePostureRule`

  - `id: optional string`

    API UUID.

  - `description: optional string`

    The description of the device posture rule.

  - `expiration: optional string`

    Sets the expiration time for a posture check result. If empty, the result remains valid until it is overwritten by new data from the WARP client.

  - `input: optional DeviceInput`

    The value to be checked against.

    - `FileInput object { operating_system, path, exists, 2 more }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        File path.

      - `exists: optional boolean`

        Whether or not file exists.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `UniqueClientIDInput object { id, operating_system }`

      - `id: string`

        List ID.

      - `operating_system: "android" or "ios" or "chromeos"`

        Operating System.

        - `"android"`

        - `"ios"`

        - `"chromeos"`

    - `DomainJoinedInput object { operating_system, domain }`

      - `operating_system: "windows"`

        Operating System.

        - `"windows"`

      - `domain: optional string`

        Domain.

    - `OSVersionInput object { operating_system, operator, version, 3 more }`

      - `operating_system: "windows"`

        Operating System.

        - `"windows"`

      - `operator: "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `version: string`

        Version of OS.

      - `os_distro_name: optional string`

        Operating System Distribution Name (linux only).

      - `os_distro_revision: optional string`

        Version of OS Distribution (linux only).

      - `os_version_extra: optional string`

        Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

    - `FirewallInput object { enabled, operating_system }`

      - `enabled: boolean`

        Enabled.

      - `operating_system: "windows" or "mac"`

        Operating System.

        - `"windows"`

        - `"mac"`

    - `SentineloneInput object { operating_system, path, sha256, thumbprint }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        File path.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `TeamsDevicesCarbonblackInputRequest object { operating_system, path, sha256, thumbprint }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        File path.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `TeamsDevicesAccessSerialNumberListInputRequest object { id }`

      - `id: string`

        UUID of Access List.

    - `DiskEncryptionInput object { checkDisks, requireAll }`

      - `checkDisks: optional array of CarbonblackInput`

        List of volume names to be checked for encryption.

      - `requireAll: optional boolean`

        Whether to check all disks for encryption.

    - `TeamsDevicesApplicationInputRequest object { operating_system, path, sha256, thumbprint }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        Path for the application.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `ClientCertificateInput object { certificate_id, cn }`

      - `certificate_id: string`

        UUID of Cloudflare managed certificate.

      - `cn: string`

        Common Name that is protected by the certificate.

    - `TeamsDevicesClientCertificateV2InputRequest object { certificate_id, check_private_key, operating_system, 4 more }`

      - `certificate_id: string`

        UUID of Cloudflare managed certificate.

      - `check_private_key: boolean`

        Confirm the certificate was not imported from another device. We recommend keeping this enabled unless the certificate was deployed without a private key.

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `cn: optional string`

        Certificate Common Name. This may include one or more variables in the ${ } notation. Only ${serial_number} and ${hostname} are valid variables.

      - `extended_key_usage: optional array of "clientAuth" or "emailProtection"`

        List of values indicating purposes for which the certificate public key can be used.

        - `"clientAuth"`

        - `"emailProtection"`

      - `locations: optional object { paths, trust_stores }`

        - `paths: optional array of string`

          List of paths to check for client certificate on linux.

        - `trust_stores: optional array of "system" or "user"`

          List of trust stores to check for client certificate.

          - `"system"`

          - `"user"`

      - `subject_alternative_names: optional array of string`

        List of certificate Subject Alternative Names.

    - `TeamsDevicesAntivirusInputRequest object { update_window_days }`

      - `update_window_days: optional number`

        Number of days that the antivirus should be updated within.

    - `WorkspaceOneInput object { compliance_status, connection_id }`

      - `compliance_status: "compliant" or "noncompliant" or "unknown"`

        Compliance Status.

        - `"compliant"`

        - `"noncompliant"`

        - `"unknown"`

      - `connection_id: string`

        Posture Integration ID.

    - `CrowdstrikeInput object { connection_id, last_seen, operator, 6 more }`

      - `connection_id: string`

        Posture Integration ID.

      - `last_seen: optional string`

        For more details on last seen, please refer to the Crowdstrike documentation.

      - `operator: optional "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `os: optional string`

        Os Version.

      - `overall: optional string`

        Overall.

      - `sensor_config: optional string`

        SensorConfig.

      - `state: optional "online" or "offline" or "unknown"`

        For more details on state, please refer to the Crowdstrike documentation.

        - `"online"`

        - `"offline"`

        - `"unknown"`

      - `version: optional string`

        Version.

      - `versionOperator: optional "<" or "<=" or ">" or 2 more`

        Version Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

    - `IntuneInput object { compliance_status, connection_id }`

      - `compliance_status: "compliant" or "noncompliant" or "unknown" or 3 more`

        Compliance Status.

        - `"compliant"`

        - `"noncompliant"`

        - `"unknown"`

        - `"notapplicable"`

        - `"ingraceperiod"`

        - `"error"`

      - `connection_id: string`

        Posture Integration ID.

    - `KolideInput object { connection_id, auth_state, countOperator, issue_count }`

      - `connection_id: string`

        Posture Integration ID.

      - `auth_state: optional array of "Good" or "Notified" or "Will Block" or "Blocked"`

        The set of Kolide device authentication states that pass the posture check. Device must match one of the specified states.

        - `"Good"`

        - `"Notified"`

        - `"Will Block"`

        - `"Blocked"`

      - `countOperator: optional "<" or "<=" or ">" or 2 more`

        Count Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `issue_count: optional string`

        The Number of Issues.

    - `TaniumInput object { connection_id, eid_last_seen, operator, 3 more }`

      - `connection_id: string`

        Posture Integration ID.

      - `eid_last_seen: optional string`

        For more details on eid last seen, refer to the Tanium documentation.

      - `operator: optional "<" or "<=" or ">" or 2 more`

        Operator to evaluate risk_level or eid_last_seen.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `risk_level: optional "low" or "medium" or "high" or "critical"`

        For more details on risk level, refer to the Tanium documentation.

        - `"low"`

        - `"medium"`

        - `"high"`

        - `"critical"`

      - `scoreOperator: optional "<" or "<=" or ">" or 2 more`

        Score Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `total_score: optional number`

        For more details on total score, refer to the Tanium documentation.

    - `SentineloneS2sInput object { connection_id, active_threats, infected, 4 more }`

      - `connection_id: string`

        Posture Integration ID.

      - `active_threats: optional number`

        The Number of active threats.

      - `infected: optional boolean`

        Whether device is infected.

      - `is_active: optional boolean`

        Whether device is active.

      - `network_status: optional "connected" or "disconnected" or "disconnecting" or "connecting"`

        Network status of device.

        - `"connected"`

        - `"disconnected"`

        - `"disconnecting"`

        - `"connecting"`

      - `operational_state: optional "na" or "partially_disabled" or "auto_fully_disabled" or 4 more`

        Agent operational state.

        - `"na"`

        - `"partially_disabled"`

        - `"auto_fully_disabled"`

        - `"fully_disabled"`

        - `"auto_partially_disabled"`

        - `"disabled_error"`

        - `"db_corruption"`

      - `operator: optional "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

    - `TeamsDevicesCustomS2sInputRequest object { connection_id, operator, score }`

      - `connection_id: string`

        Posture Integration ID.

      - `operator: "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `score: number`

        A value between 0-100 assigned to devices set by the 3rd party posture provider.

  - `match: optional array of DeviceMatch`

    The conditions that the client must match to run the rule.

    - `platform: optional "windows" or "mac" or "linux" or 3 more`

      - `"windows"`

      - `"mac"`

      - `"linux"`

      - `"android"`

      - `"ios"`

      - `"chromeos"`

  - `name: optional string`

    The name of the device posture rule.

  - `schedule: optional string`

    Polling frequency for the WARP client posture check. Default: `5m` (poll every five minutes). Minimum: `1m`.

  - `type: optional "file" or "application" or "tanium" or 20 more`

    The type of device posture rule.

    - `"file"`

    - `"application"`

    - `"tanium"`

    - `"gateway"`

    - `"warp"`

    - `"disk_encryption"`

    - `"serial_number"`

    - `"sentinelone"`

    - `"carbonblack"`

    - `"firewall"`

    - `"os_version"`

    - `"domain_joined"`

    - `"client_certificate"`

    - `"client_certificate_v2"`

    - `"antivirus"`

    - `"unique_client_id"`

    - `"kolide"`

    - `"tanium_s2s"`

    - `"crowdstrike_s2s"`

    - `"intune"`

    - `"workspace_one"`

    - `"sentinelone_s2s"`

    - `"custom_s2s"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/posture \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Admin Serial Numbers",
          "type": "file",
          "description": "The rule for admin serial numbers",
          "expiration": "1h",
          "input": {
            "operating_system": "linux",
            "path": "/bin/cat",
            "thumbprint": "0aabab210bdb998e9cf45da2c9ce352977ab531c681b74cf1e487be1bbe9fe6e"
          },
          "schedule": "1h"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "description": "The rule for admin serial numbers",
    "expiration": "1h",
    "input": {
      "operating_system": "linux",
      "path": "/bin/cat",
      "exists": true,
      "sha256": "https://api.us-2.crowdstrike.com",
      "thumbprint": "0aabab210bdb998e9cf45da2c9ce352977ab531c681b74cf1e487be1bbe9fe6e"
    },
    "match": [
      {
        "platform": "windows"
      }
    ],
    "name": "Admin Serial Numbers",
    "schedule": "1h",
    "type": "file"
  },
  "success": true
}
```

## Update a device posture rule

**put** `/accounts/{account_id}/devices/posture/{rule_id}`

Updates a device posture rule.

### Path Parameters

- `account_id: string`

- `rule_id: string`

  API UUID.

### Body Parameters

- `name: string`

  The name of the device posture rule.

- `type: "file" or "application" or "tanium" or 20 more`

  The type of device posture rule.

  - `"file"`

  - `"application"`

  - `"tanium"`

  - `"gateway"`

  - `"warp"`

  - `"disk_encryption"`

  - `"serial_number"`

  - `"sentinelone"`

  - `"carbonblack"`

  - `"firewall"`

  - `"os_version"`

  - `"domain_joined"`

  - `"client_certificate"`

  - `"client_certificate_v2"`

  - `"antivirus"`

  - `"unique_client_id"`

  - `"kolide"`

  - `"tanium_s2s"`

  - `"crowdstrike_s2s"`

  - `"intune"`

  - `"workspace_one"`

  - `"sentinelone_s2s"`

  - `"custom_s2s"`

- `description: optional string`

  The description of the device posture rule.

- `expiration: optional string`

  Sets the expiration time for a posture check result. If empty, the result remains valid until it is overwritten by new data from the WARP client.

- `input: optional DeviceInput`

  The value to be checked against.

  - `FileInput object { operating_system, path, exists, 2 more }`

    - `operating_system: "windows" or "linux" or "mac"`

      Operating system.

      - `"windows"`

      - `"linux"`

      - `"mac"`

    - `path: string`

      File path.

    - `exists: optional boolean`

      Whether or not file exists.

    - `sha256: optional string`

      SHA-256.

    - `thumbprint: optional string`

      Signing certificate thumbprint.

  - `UniqueClientIDInput object { id, operating_system }`

    - `id: string`

      List ID.

    - `operating_system: "android" or "ios" or "chromeos"`

      Operating System.

      - `"android"`

      - `"ios"`

      - `"chromeos"`

  - `DomainJoinedInput object { operating_system, domain }`

    - `operating_system: "windows"`

      Operating System.

      - `"windows"`

    - `domain: optional string`

      Domain.

  - `OSVersionInput object { operating_system, operator, version, 3 more }`

    - `operating_system: "windows"`

      Operating System.

      - `"windows"`

    - `operator: "<" or "<=" or ">" or 2 more`

      Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `version: string`

      Version of OS.

    - `os_distro_name: optional string`

      Operating System Distribution Name (linux only).

    - `os_distro_revision: optional string`

      Version of OS Distribution (linux only).

    - `os_version_extra: optional string`

      Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

  - `FirewallInput object { enabled, operating_system }`

    - `enabled: boolean`

      Enabled.

    - `operating_system: "windows" or "mac"`

      Operating System.

      - `"windows"`

      - `"mac"`

  - `SentineloneInput object { operating_system, path, sha256, thumbprint }`

    - `operating_system: "windows" or "linux" or "mac"`

      Operating system.

      - `"windows"`

      - `"linux"`

      - `"mac"`

    - `path: string`

      File path.

    - `sha256: optional string`

      SHA-256.

    - `thumbprint: optional string`

      Signing certificate thumbprint.

  - `TeamsDevicesCarbonblackInputRequest object { operating_system, path, sha256, thumbprint }`

    - `operating_system: "windows" or "linux" or "mac"`

      Operating system.

      - `"windows"`

      - `"linux"`

      - `"mac"`

    - `path: string`

      File path.

    - `sha256: optional string`

      SHA-256.

    - `thumbprint: optional string`

      Signing certificate thumbprint.

  - `TeamsDevicesAccessSerialNumberListInputRequest object { id }`

    - `id: string`

      UUID of Access List.

  - `DiskEncryptionInput object { checkDisks, requireAll }`

    - `checkDisks: optional array of CarbonblackInput`

      List of volume names to be checked for encryption.

    - `requireAll: optional boolean`

      Whether to check all disks for encryption.

  - `TeamsDevicesApplicationInputRequest object { operating_system, path, sha256, thumbprint }`

    - `operating_system: "windows" or "linux" or "mac"`

      Operating system.

      - `"windows"`

      - `"linux"`

      - `"mac"`

    - `path: string`

      Path for the application.

    - `sha256: optional string`

      SHA-256.

    - `thumbprint: optional string`

      Signing certificate thumbprint.

  - `ClientCertificateInput object { certificate_id, cn }`

    - `certificate_id: string`

      UUID of Cloudflare managed certificate.

    - `cn: string`

      Common Name that is protected by the certificate.

  - `TeamsDevicesClientCertificateV2InputRequest object { certificate_id, check_private_key, operating_system, 4 more }`

    - `certificate_id: string`

      UUID of Cloudflare managed certificate.

    - `check_private_key: boolean`

      Confirm the certificate was not imported from another device. We recommend keeping this enabled unless the certificate was deployed without a private key.

    - `operating_system: "windows" or "linux" or "mac"`

      Operating system.

      - `"windows"`

      - `"linux"`

      - `"mac"`

    - `cn: optional string`

      Certificate Common Name. This may include one or more variables in the ${ } notation. Only ${serial_number} and ${hostname} are valid variables.

    - `extended_key_usage: optional array of "clientAuth" or "emailProtection"`

      List of values indicating purposes for which the certificate public key can be used.

      - `"clientAuth"`

      - `"emailProtection"`

    - `locations: optional object { paths, trust_stores }`

      - `paths: optional array of string`

        List of paths to check for client certificate on linux.

      - `trust_stores: optional array of "system" or "user"`

        List of trust stores to check for client certificate.

        - `"system"`

        - `"user"`

    - `subject_alternative_names: optional array of string`

      List of certificate Subject Alternative Names.

  - `TeamsDevicesAntivirusInputRequest object { update_window_days }`

    - `update_window_days: optional number`

      Number of days that the antivirus should be updated within.

  - `WorkspaceOneInput object { compliance_status, connection_id }`

    - `compliance_status: "compliant" or "noncompliant" or "unknown"`

      Compliance Status.

      - `"compliant"`

      - `"noncompliant"`

      - `"unknown"`

    - `connection_id: string`

      Posture Integration ID.

  - `CrowdstrikeInput object { connection_id, last_seen, operator, 6 more }`

    - `connection_id: string`

      Posture Integration ID.

    - `last_seen: optional string`

      For more details on last seen, please refer to the Crowdstrike documentation.

    - `operator: optional "<" or "<=" or ">" or 2 more`

      Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `os: optional string`

      Os Version.

    - `overall: optional string`

      Overall.

    - `sensor_config: optional string`

      SensorConfig.

    - `state: optional "online" or "offline" or "unknown"`

      For more details on state, please refer to the Crowdstrike documentation.

      - `"online"`

      - `"offline"`

      - `"unknown"`

    - `version: optional string`

      Version.

    - `versionOperator: optional "<" or "<=" or ">" or 2 more`

      Version Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

  - `IntuneInput object { compliance_status, connection_id }`

    - `compliance_status: "compliant" or "noncompliant" or "unknown" or 3 more`

      Compliance Status.

      - `"compliant"`

      - `"noncompliant"`

      - `"unknown"`

      - `"notapplicable"`

      - `"ingraceperiod"`

      - `"error"`

    - `connection_id: string`

      Posture Integration ID.

  - `KolideInput object { connection_id, auth_state, countOperator, issue_count }`

    - `connection_id: string`

      Posture Integration ID.

    - `auth_state: optional array of "Good" or "Notified" or "Will Block" or "Blocked"`

      The set of Kolide device authentication states that pass the posture check. Device must match one of the specified states.

      - `"Good"`

      - `"Notified"`

      - `"Will Block"`

      - `"Blocked"`

    - `countOperator: optional "<" or "<=" or ">" or 2 more`

      Count Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `issue_count: optional string`

      The Number of Issues.

  - `TaniumInput object { connection_id, eid_last_seen, operator, 3 more }`

    - `connection_id: string`

      Posture Integration ID.

    - `eid_last_seen: optional string`

      For more details on eid last seen, refer to the Tanium documentation.

    - `operator: optional "<" or "<=" or ">" or 2 more`

      Operator to evaluate risk_level or eid_last_seen.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `risk_level: optional "low" or "medium" or "high" or "critical"`

      For more details on risk level, refer to the Tanium documentation.

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"critical"`

    - `scoreOperator: optional "<" or "<=" or ">" or 2 more`

      Score Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `total_score: optional number`

      For more details on total score, refer to the Tanium documentation.

  - `SentineloneS2sInput object { connection_id, active_threats, infected, 4 more }`

    - `connection_id: string`

      Posture Integration ID.

    - `active_threats: optional number`

      The Number of active threats.

    - `infected: optional boolean`

      Whether device is infected.

    - `is_active: optional boolean`

      Whether device is active.

    - `network_status: optional "connected" or "disconnected" or "disconnecting" or "connecting"`

      Network status of device.

      - `"connected"`

      - `"disconnected"`

      - `"disconnecting"`

      - `"connecting"`

    - `operational_state: optional "na" or "partially_disabled" or "auto_fully_disabled" or 4 more`

      Agent operational state.

      - `"na"`

      - `"partially_disabled"`

      - `"auto_fully_disabled"`

      - `"fully_disabled"`

      - `"auto_partially_disabled"`

      - `"disabled_error"`

      - `"db_corruption"`

    - `operator: optional "<" or "<=" or ">" or 2 more`

      Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

  - `TeamsDevicesCustomS2sInputRequest object { connection_id, operator, score }`

    - `connection_id: string`

      Posture Integration ID.

    - `operator: "<" or "<=" or ">" or 2 more`

      Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `score: number`

      A value between 0-100 assigned to devices set by the 3rd party posture provider.

- `match: optional array of DeviceMatch`

  The conditions that the client must match to run the rule.

  - `platform: optional "windows" or "mac" or "linux" or 3 more`

    - `"windows"`

    - `"mac"`

    - `"linux"`

    - `"android"`

    - `"ios"`

    - `"chromeos"`

- `schedule: optional string`

  Polling frequency for the WARP client posture check. Default: `5m` (poll every five minutes). Minimum: `1m`.

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

- `result: DevicePostureRule`

  - `id: optional string`

    API UUID.

  - `description: optional string`

    The description of the device posture rule.

  - `expiration: optional string`

    Sets the expiration time for a posture check result. If empty, the result remains valid until it is overwritten by new data from the WARP client.

  - `input: optional DeviceInput`

    The value to be checked against.

    - `FileInput object { operating_system, path, exists, 2 more }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        File path.

      - `exists: optional boolean`

        Whether or not file exists.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `UniqueClientIDInput object { id, operating_system }`

      - `id: string`

        List ID.

      - `operating_system: "android" or "ios" or "chromeos"`

        Operating System.

        - `"android"`

        - `"ios"`

        - `"chromeos"`

    - `DomainJoinedInput object { operating_system, domain }`

      - `operating_system: "windows"`

        Operating System.

        - `"windows"`

      - `domain: optional string`

        Domain.

    - `OSVersionInput object { operating_system, operator, version, 3 more }`

      - `operating_system: "windows"`

        Operating System.

        - `"windows"`

      - `operator: "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `version: string`

        Version of OS.

      - `os_distro_name: optional string`

        Operating System Distribution Name (linux only).

      - `os_distro_revision: optional string`

        Version of OS Distribution (linux only).

      - `os_version_extra: optional string`

        Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

    - `FirewallInput object { enabled, operating_system }`

      - `enabled: boolean`

        Enabled.

      - `operating_system: "windows" or "mac"`

        Operating System.

        - `"windows"`

        - `"mac"`

    - `SentineloneInput object { operating_system, path, sha256, thumbprint }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        File path.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `TeamsDevicesCarbonblackInputRequest object { operating_system, path, sha256, thumbprint }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        File path.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `TeamsDevicesAccessSerialNumberListInputRequest object { id }`

      - `id: string`

        UUID of Access List.

    - `DiskEncryptionInput object { checkDisks, requireAll }`

      - `checkDisks: optional array of CarbonblackInput`

        List of volume names to be checked for encryption.

      - `requireAll: optional boolean`

        Whether to check all disks for encryption.

    - `TeamsDevicesApplicationInputRequest object { operating_system, path, sha256, thumbprint }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        Path for the application.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `ClientCertificateInput object { certificate_id, cn }`

      - `certificate_id: string`

        UUID of Cloudflare managed certificate.

      - `cn: string`

        Common Name that is protected by the certificate.

    - `TeamsDevicesClientCertificateV2InputRequest object { certificate_id, check_private_key, operating_system, 4 more }`

      - `certificate_id: string`

        UUID of Cloudflare managed certificate.

      - `check_private_key: boolean`

        Confirm the certificate was not imported from another device. We recommend keeping this enabled unless the certificate was deployed without a private key.

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `cn: optional string`

        Certificate Common Name. This may include one or more variables in the ${ } notation. Only ${serial_number} and ${hostname} are valid variables.

      - `extended_key_usage: optional array of "clientAuth" or "emailProtection"`

        List of values indicating purposes for which the certificate public key can be used.

        - `"clientAuth"`

        - `"emailProtection"`

      - `locations: optional object { paths, trust_stores }`

        - `paths: optional array of string`

          List of paths to check for client certificate on linux.

        - `trust_stores: optional array of "system" or "user"`

          List of trust stores to check for client certificate.

          - `"system"`

          - `"user"`

      - `subject_alternative_names: optional array of string`

        List of certificate Subject Alternative Names.

    - `TeamsDevicesAntivirusInputRequest object { update_window_days }`

      - `update_window_days: optional number`

        Number of days that the antivirus should be updated within.

    - `WorkspaceOneInput object { compliance_status, connection_id }`

      - `compliance_status: "compliant" or "noncompliant" or "unknown"`

        Compliance Status.

        - `"compliant"`

        - `"noncompliant"`

        - `"unknown"`

      - `connection_id: string`

        Posture Integration ID.

    - `CrowdstrikeInput object { connection_id, last_seen, operator, 6 more }`

      - `connection_id: string`

        Posture Integration ID.

      - `last_seen: optional string`

        For more details on last seen, please refer to the Crowdstrike documentation.

      - `operator: optional "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `os: optional string`

        Os Version.

      - `overall: optional string`

        Overall.

      - `sensor_config: optional string`

        SensorConfig.

      - `state: optional "online" or "offline" or "unknown"`

        For more details on state, please refer to the Crowdstrike documentation.

        - `"online"`

        - `"offline"`

        - `"unknown"`

      - `version: optional string`

        Version.

      - `versionOperator: optional "<" or "<=" or ">" or 2 more`

        Version Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

    - `IntuneInput object { compliance_status, connection_id }`

      - `compliance_status: "compliant" or "noncompliant" or "unknown" or 3 more`

        Compliance Status.

        - `"compliant"`

        - `"noncompliant"`

        - `"unknown"`

        - `"notapplicable"`

        - `"ingraceperiod"`

        - `"error"`

      - `connection_id: string`

        Posture Integration ID.

    - `KolideInput object { connection_id, auth_state, countOperator, issue_count }`

      - `connection_id: string`

        Posture Integration ID.

      - `auth_state: optional array of "Good" or "Notified" or "Will Block" or "Blocked"`

        The set of Kolide device authentication states that pass the posture check. Device must match one of the specified states.

        - `"Good"`

        - `"Notified"`

        - `"Will Block"`

        - `"Blocked"`

      - `countOperator: optional "<" or "<=" or ">" or 2 more`

        Count Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `issue_count: optional string`

        The Number of Issues.

    - `TaniumInput object { connection_id, eid_last_seen, operator, 3 more }`

      - `connection_id: string`

        Posture Integration ID.

      - `eid_last_seen: optional string`

        For more details on eid last seen, refer to the Tanium documentation.

      - `operator: optional "<" or "<=" or ">" or 2 more`

        Operator to evaluate risk_level or eid_last_seen.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `risk_level: optional "low" or "medium" or "high" or "critical"`

        For more details on risk level, refer to the Tanium documentation.

        - `"low"`

        - `"medium"`

        - `"high"`

        - `"critical"`

      - `scoreOperator: optional "<" or "<=" or ">" or 2 more`

        Score Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `total_score: optional number`

        For more details on total score, refer to the Tanium documentation.

    - `SentineloneS2sInput object { connection_id, active_threats, infected, 4 more }`

      - `connection_id: string`

        Posture Integration ID.

      - `active_threats: optional number`

        The Number of active threats.

      - `infected: optional boolean`

        Whether device is infected.

      - `is_active: optional boolean`

        Whether device is active.

      - `network_status: optional "connected" or "disconnected" or "disconnecting" or "connecting"`

        Network status of device.

        - `"connected"`

        - `"disconnected"`

        - `"disconnecting"`

        - `"connecting"`

      - `operational_state: optional "na" or "partially_disabled" or "auto_fully_disabled" or 4 more`

        Agent operational state.

        - `"na"`

        - `"partially_disabled"`

        - `"auto_fully_disabled"`

        - `"fully_disabled"`

        - `"auto_partially_disabled"`

        - `"disabled_error"`

        - `"db_corruption"`

      - `operator: optional "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

    - `TeamsDevicesCustomS2sInputRequest object { connection_id, operator, score }`

      - `connection_id: string`

        Posture Integration ID.

      - `operator: "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `score: number`

        A value between 0-100 assigned to devices set by the 3rd party posture provider.

  - `match: optional array of DeviceMatch`

    The conditions that the client must match to run the rule.

    - `platform: optional "windows" or "mac" or "linux" or 3 more`

      - `"windows"`

      - `"mac"`

      - `"linux"`

      - `"android"`

      - `"ios"`

      - `"chromeos"`

  - `name: optional string`

    The name of the device posture rule.

  - `schedule: optional string`

    Polling frequency for the WARP client posture check. Default: `5m` (poll every five minutes). Minimum: `1m`.

  - `type: optional "file" or "application" or "tanium" or 20 more`

    The type of device posture rule.

    - `"file"`

    - `"application"`

    - `"tanium"`

    - `"gateway"`

    - `"warp"`

    - `"disk_encryption"`

    - `"serial_number"`

    - `"sentinelone"`

    - `"carbonblack"`

    - `"firewall"`

    - `"os_version"`

    - `"domain_joined"`

    - `"client_certificate"`

    - `"client_certificate_v2"`

    - `"antivirus"`

    - `"unique_client_id"`

    - `"kolide"`

    - `"tanium_s2s"`

    - `"crowdstrike_s2s"`

    - `"intune"`

    - `"workspace_one"`

    - `"sentinelone_s2s"`

    - `"custom_s2s"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/posture/$RULE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Admin Serial Numbers",
          "type": "file",
          "description": "The rule for admin serial numbers",
          "expiration": "1h",
          "input": {
            "operating_system": "linux",
            "path": "/bin/cat",
            "thumbprint": "0aabab210bdb998e9cf45da2c9ce352977ab531c681b74cf1e487be1bbe9fe6e"
          },
          "schedule": "1h"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "description": "The rule for admin serial numbers",
    "expiration": "1h",
    "input": {
      "operating_system": "linux",
      "path": "/bin/cat",
      "exists": true,
      "sha256": "https://api.us-2.crowdstrike.com",
      "thumbprint": "0aabab210bdb998e9cf45da2c9ce352977ab531c681b74cf1e487be1bbe9fe6e"
    },
    "match": [
      {
        "platform": "windows"
      }
    ],
    "name": "Admin Serial Numbers",
    "schedule": "1h",
    "type": "file"
  },
  "success": true
}
```

## Delete a device posture rule

**delete** `/accounts/{account_id}/devices/posture/{rule_id}`

Deletes a device posture rule.

### Path Parameters

- `account_id: string`

- `rule_id: string`

  API UUID.

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

- `result: object { id }`

  - `id: optional string`

    API UUID.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/posture/$RULE_ID \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
  },
  "success": true
}
```

## Domain Types

### Carbonblack Input

- `CarbonblackInput = string`

### Client Certificate Input

- `ClientCertificateInput object { certificate_id, cn }`

  - `certificate_id: string`

    UUID of Cloudflare managed certificate.

  - `cn: string`

    Common Name that is protected by the certificate.

### Crowdstrike Input

- `CrowdstrikeInput object { connection_id, last_seen, operator, 6 more }`

  - `connection_id: string`

    Posture Integration ID.

  - `last_seen: optional string`

    For more details on last seen, please refer to the Crowdstrike documentation.

  - `operator: optional "<" or "<=" or ">" or 2 more`

    Operator.

    - `"<"`

    - `"<="`

    - `">"`

    - `">="`

    - `"=="`

  - `os: optional string`

    Os Version.

  - `overall: optional string`

    Overall.

  - `sensor_config: optional string`

    SensorConfig.

  - `state: optional "online" or "offline" or "unknown"`

    For more details on state, please refer to the Crowdstrike documentation.

    - `"online"`

    - `"offline"`

    - `"unknown"`

  - `version: optional string`

    Version.

  - `versionOperator: optional "<" or "<=" or ">" or 2 more`

    Version Operator.

    - `"<"`

    - `"<="`

    - `">"`

    - `">="`

    - `"=="`

### Device Input

- `DeviceInput = FileInput or UniqueClientIDInput or DomainJoinedInput or 17 more`

  The value to be checked against.

  - `FileInput object { operating_system, path, exists, 2 more }`

    - `operating_system: "windows" or "linux" or "mac"`

      Operating system.

      - `"windows"`

      - `"linux"`

      - `"mac"`

    - `path: string`

      File path.

    - `exists: optional boolean`

      Whether or not file exists.

    - `sha256: optional string`

      SHA-256.

    - `thumbprint: optional string`

      Signing certificate thumbprint.

  - `UniqueClientIDInput object { id, operating_system }`

    - `id: string`

      List ID.

    - `operating_system: "android" or "ios" or "chromeos"`

      Operating System.

      - `"android"`

      - `"ios"`

      - `"chromeos"`

  - `DomainJoinedInput object { operating_system, domain }`

    - `operating_system: "windows"`

      Operating System.

      - `"windows"`

    - `domain: optional string`

      Domain.

  - `OSVersionInput object { operating_system, operator, version, 3 more }`

    - `operating_system: "windows"`

      Operating System.

      - `"windows"`

    - `operator: "<" or "<=" or ">" or 2 more`

      Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `version: string`

      Version of OS.

    - `os_distro_name: optional string`

      Operating System Distribution Name (linux only).

    - `os_distro_revision: optional string`

      Version of OS Distribution (linux only).

    - `os_version_extra: optional string`

      Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

  - `FirewallInput object { enabled, operating_system }`

    - `enabled: boolean`

      Enabled.

    - `operating_system: "windows" or "mac"`

      Operating System.

      - `"windows"`

      - `"mac"`

  - `SentineloneInput object { operating_system, path, sha256, thumbprint }`

    - `operating_system: "windows" or "linux" or "mac"`

      Operating system.

      - `"windows"`

      - `"linux"`

      - `"mac"`

    - `path: string`

      File path.

    - `sha256: optional string`

      SHA-256.

    - `thumbprint: optional string`

      Signing certificate thumbprint.

  - `TeamsDevicesCarbonblackInputRequest object { operating_system, path, sha256, thumbprint }`

    - `operating_system: "windows" or "linux" or "mac"`

      Operating system.

      - `"windows"`

      - `"linux"`

      - `"mac"`

    - `path: string`

      File path.

    - `sha256: optional string`

      SHA-256.

    - `thumbprint: optional string`

      Signing certificate thumbprint.

  - `TeamsDevicesAccessSerialNumberListInputRequest object { id }`

    - `id: string`

      UUID of Access List.

  - `DiskEncryptionInput object { checkDisks, requireAll }`

    - `checkDisks: optional array of CarbonblackInput`

      List of volume names to be checked for encryption.

    - `requireAll: optional boolean`

      Whether to check all disks for encryption.

  - `TeamsDevicesApplicationInputRequest object { operating_system, path, sha256, thumbprint }`

    - `operating_system: "windows" or "linux" or "mac"`

      Operating system.

      - `"windows"`

      - `"linux"`

      - `"mac"`

    - `path: string`

      Path for the application.

    - `sha256: optional string`

      SHA-256.

    - `thumbprint: optional string`

      Signing certificate thumbprint.

  - `ClientCertificateInput object { certificate_id, cn }`

    - `certificate_id: string`

      UUID of Cloudflare managed certificate.

    - `cn: string`

      Common Name that is protected by the certificate.

  - `TeamsDevicesClientCertificateV2InputRequest object { certificate_id, check_private_key, operating_system, 4 more }`

    - `certificate_id: string`

      UUID of Cloudflare managed certificate.

    - `check_private_key: boolean`

      Confirm the certificate was not imported from another device. We recommend keeping this enabled unless the certificate was deployed without a private key.

    - `operating_system: "windows" or "linux" or "mac"`

      Operating system.

      - `"windows"`

      - `"linux"`

      - `"mac"`

    - `cn: optional string`

      Certificate Common Name. This may include one or more variables in the ${ } notation. Only ${serial_number} and ${hostname} are valid variables.

    - `extended_key_usage: optional array of "clientAuth" or "emailProtection"`

      List of values indicating purposes for which the certificate public key can be used.

      - `"clientAuth"`

      - `"emailProtection"`

    - `locations: optional object { paths, trust_stores }`

      - `paths: optional array of string`

        List of paths to check for client certificate on linux.

      - `trust_stores: optional array of "system" or "user"`

        List of trust stores to check for client certificate.

        - `"system"`

        - `"user"`

    - `subject_alternative_names: optional array of string`

      List of certificate Subject Alternative Names.

  - `TeamsDevicesAntivirusInputRequest object { update_window_days }`

    - `update_window_days: optional number`

      Number of days that the antivirus should be updated within.

  - `WorkspaceOneInput object { compliance_status, connection_id }`

    - `compliance_status: "compliant" or "noncompliant" or "unknown"`

      Compliance Status.

      - `"compliant"`

      - `"noncompliant"`

      - `"unknown"`

    - `connection_id: string`

      Posture Integration ID.

  - `CrowdstrikeInput object { connection_id, last_seen, operator, 6 more }`

    - `connection_id: string`

      Posture Integration ID.

    - `last_seen: optional string`

      For more details on last seen, please refer to the Crowdstrike documentation.

    - `operator: optional "<" or "<=" or ">" or 2 more`

      Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `os: optional string`

      Os Version.

    - `overall: optional string`

      Overall.

    - `sensor_config: optional string`

      SensorConfig.

    - `state: optional "online" or "offline" or "unknown"`

      For more details on state, please refer to the Crowdstrike documentation.

      - `"online"`

      - `"offline"`

      - `"unknown"`

    - `version: optional string`

      Version.

    - `versionOperator: optional "<" or "<=" or ">" or 2 more`

      Version Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

  - `IntuneInput object { compliance_status, connection_id }`

    - `compliance_status: "compliant" or "noncompliant" or "unknown" or 3 more`

      Compliance Status.

      - `"compliant"`

      - `"noncompliant"`

      - `"unknown"`

      - `"notapplicable"`

      - `"ingraceperiod"`

      - `"error"`

    - `connection_id: string`

      Posture Integration ID.

  - `KolideInput object { connection_id, auth_state, countOperator, issue_count }`

    - `connection_id: string`

      Posture Integration ID.

    - `auth_state: optional array of "Good" or "Notified" or "Will Block" or "Blocked"`

      The set of Kolide device authentication states that pass the posture check. Device must match one of the specified states.

      - `"Good"`

      - `"Notified"`

      - `"Will Block"`

      - `"Blocked"`

    - `countOperator: optional "<" or "<=" or ">" or 2 more`

      Count Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `issue_count: optional string`

      The Number of Issues.

  - `TaniumInput object { connection_id, eid_last_seen, operator, 3 more }`

    - `connection_id: string`

      Posture Integration ID.

    - `eid_last_seen: optional string`

      For more details on eid last seen, refer to the Tanium documentation.

    - `operator: optional "<" or "<=" or ">" or 2 more`

      Operator to evaluate risk_level or eid_last_seen.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `risk_level: optional "low" or "medium" or "high" or "critical"`

      For more details on risk level, refer to the Tanium documentation.

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"critical"`

    - `scoreOperator: optional "<" or "<=" or ">" or 2 more`

      Score Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `total_score: optional number`

      For more details on total score, refer to the Tanium documentation.

  - `SentineloneS2sInput object { connection_id, active_threats, infected, 4 more }`

    - `connection_id: string`

      Posture Integration ID.

    - `active_threats: optional number`

      The Number of active threats.

    - `infected: optional boolean`

      Whether device is infected.

    - `is_active: optional boolean`

      Whether device is active.

    - `network_status: optional "connected" or "disconnected" or "disconnecting" or "connecting"`

      Network status of device.

      - `"connected"`

      - `"disconnected"`

      - `"disconnecting"`

      - `"connecting"`

    - `operational_state: optional "na" or "partially_disabled" or "auto_fully_disabled" or 4 more`

      Agent operational state.

      - `"na"`

      - `"partially_disabled"`

      - `"auto_fully_disabled"`

      - `"fully_disabled"`

      - `"auto_partially_disabled"`

      - `"disabled_error"`

      - `"db_corruption"`

    - `operator: optional "<" or "<=" or ">" or 2 more`

      Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

  - `TeamsDevicesCustomS2sInputRequest object { connection_id, operator, score }`

    - `connection_id: string`

      Posture Integration ID.

    - `operator: "<" or "<=" or ">" or 2 more`

      Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `score: number`

      A value between 0-100 assigned to devices set by the 3rd party posture provider.

### Device Match

- `DeviceMatch object { platform }`

  - `platform: optional "windows" or "mac" or "linux" or 3 more`

    - `"windows"`

    - `"mac"`

    - `"linux"`

    - `"android"`

    - `"ios"`

    - `"chromeos"`

### Device Posture Rule

- `DevicePostureRule object { id, description, expiration, 5 more }`

  - `id: optional string`

    API UUID.

  - `description: optional string`

    The description of the device posture rule.

  - `expiration: optional string`

    Sets the expiration time for a posture check result. If empty, the result remains valid until it is overwritten by new data from the WARP client.

  - `input: optional DeviceInput`

    The value to be checked against.

    - `FileInput object { operating_system, path, exists, 2 more }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        File path.

      - `exists: optional boolean`

        Whether or not file exists.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `UniqueClientIDInput object { id, operating_system }`

      - `id: string`

        List ID.

      - `operating_system: "android" or "ios" or "chromeos"`

        Operating System.

        - `"android"`

        - `"ios"`

        - `"chromeos"`

    - `DomainJoinedInput object { operating_system, domain }`

      - `operating_system: "windows"`

        Operating System.

        - `"windows"`

      - `domain: optional string`

        Domain.

    - `OSVersionInput object { operating_system, operator, version, 3 more }`

      - `operating_system: "windows"`

        Operating System.

        - `"windows"`

      - `operator: "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `version: string`

        Version of OS.

      - `os_distro_name: optional string`

        Operating System Distribution Name (linux only).

      - `os_distro_revision: optional string`

        Version of OS Distribution (linux only).

      - `os_version_extra: optional string`

        Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

    - `FirewallInput object { enabled, operating_system }`

      - `enabled: boolean`

        Enabled.

      - `operating_system: "windows" or "mac"`

        Operating System.

        - `"windows"`

        - `"mac"`

    - `SentineloneInput object { operating_system, path, sha256, thumbprint }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        File path.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `TeamsDevicesCarbonblackInputRequest object { operating_system, path, sha256, thumbprint }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        File path.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `TeamsDevicesAccessSerialNumberListInputRequest object { id }`

      - `id: string`

        UUID of Access List.

    - `DiskEncryptionInput object { checkDisks, requireAll }`

      - `checkDisks: optional array of CarbonblackInput`

        List of volume names to be checked for encryption.

      - `requireAll: optional boolean`

        Whether to check all disks for encryption.

    - `TeamsDevicesApplicationInputRequest object { operating_system, path, sha256, thumbprint }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        Path for the application.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `ClientCertificateInput object { certificate_id, cn }`

      - `certificate_id: string`

        UUID of Cloudflare managed certificate.

      - `cn: string`

        Common Name that is protected by the certificate.

    - `TeamsDevicesClientCertificateV2InputRequest object { certificate_id, check_private_key, operating_system, 4 more }`

      - `certificate_id: string`

        UUID of Cloudflare managed certificate.

      - `check_private_key: boolean`

        Confirm the certificate was not imported from another device. We recommend keeping this enabled unless the certificate was deployed without a private key.

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `cn: optional string`

        Certificate Common Name. This may include one or more variables in the ${ } notation. Only ${serial_number} and ${hostname} are valid variables.

      - `extended_key_usage: optional array of "clientAuth" or "emailProtection"`

        List of values indicating purposes for which the certificate public key can be used.

        - `"clientAuth"`

        - `"emailProtection"`

      - `locations: optional object { paths, trust_stores }`

        - `paths: optional array of string`

          List of paths to check for client certificate on linux.

        - `trust_stores: optional array of "system" or "user"`

          List of trust stores to check for client certificate.

          - `"system"`

          - `"user"`

      - `subject_alternative_names: optional array of string`

        List of certificate Subject Alternative Names.

    - `TeamsDevicesAntivirusInputRequest object { update_window_days }`

      - `update_window_days: optional number`

        Number of days that the antivirus should be updated within.

    - `WorkspaceOneInput object { compliance_status, connection_id }`

      - `compliance_status: "compliant" or "noncompliant" or "unknown"`

        Compliance Status.

        - `"compliant"`

        - `"noncompliant"`

        - `"unknown"`

      - `connection_id: string`

        Posture Integration ID.

    - `CrowdstrikeInput object { connection_id, last_seen, operator, 6 more }`

      - `connection_id: string`

        Posture Integration ID.

      - `last_seen: optional string`

        For more details on last seen, please refer to the Crowdstrike documentation.

      - `operator: optional "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `os: optional string`

        Os Version.

      - `overall: optional string`

        Overall.

      - `sensor_config: optional string`

        SensorConfig.

      - `state: optional "online" or "offline" or "unknown"`

        For more details on state, please refer to the Crowdstrike documentation.

        - `"online"`

        - `"offline"`

        - `"unknown"`

      - `version: optional string`

        Version.

      - `versionOperator: optional "<" or "<=" or ">" or 2 more`

        Version Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

    - `IntuneInput object { compliance_status, connection_id }`

      - `compliance_status: "compliant" or "noncompliant" or "unknown" or 3 more`

        Compliance Status.

        - `"compliant"`

        - `"noncompliant"`

        - `"unknown"`

        - `"notapplicable"`

        - `"ingraceperiod"`

        - `"error"`

      - `connection_id: string`

        Posture Integration ID.

    - `KolideInput object { connection_id, auth_state, countOperator, issue_count }`

      - `connection_id: string`

        Posture Integration ID.

      - `auth_state: optional array of "Good" or "Notified" or "Will Block" or "Blocked"`

        The set of Kolide device authentication states that pass the posture check. Device must match one of the specified states.

        - `"Good"`

        - `"Notified"`

        - `"Will Block"`

        - `"Blocked"`

      - `countOperator: optional "<" or "<=" or ">" or 2 more`

        Count Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `issue_count: optional string`

        The Number of Issues.

    - `TaniumInput object { connection_id, eid_last_seen, operator, 3 more }`

      - `connection_id: string`

        Posture Integration ID.

      - `eid_last_seen: optional string`

        For more details on eid last seen, refer to the Tanium documentation.

      - `operator: optional "<" or "<=" or ">" or 2 more`

        Operator to evaluate risk_level or eid_last_seen.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `risk_level: optional "low" or "medium" or "high" or "critical"`

        For more details on risk level, refer to the Tanium documentation.

        - `"low"`

        - `"medium"`

        - `"high"`

        - `"critical"`

      - `scoreOperator: optional "<" or "<=" or ">" or 2 more`

        Score Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `total_score: optional number`

        For more details on total score, refer to the Tanium documentation.

    - `SentineloneS2sInput object { connection_id, active_threats, infected, 4 more }`

      - `connection_id: string`

        Posture Integration ID.

      - `active_threats: optional number`

        The Number of active threats.

      - `infected: optional boolean`

        Whether device is infected.

      - `is_active: optional boolean`

        Whether device is active.

      - `network_status: optional "connected" or "disconnected" or "disconnecting" or "connecting"`

        Network status of device.

        - `"connected"`

        - `"disconnected"`

        - `"disconnecting"`

        - `"connecting"`

      - `operational_state: optional "na" or "partially_disabled" or "auto_fully_disabled" or 4 more`

        Agent operational state.

        - `"na"`

        - `"partially_disabled"`

        - `"auto_fully_disabled"`

        - `"fully_disabled"`

        - `"auto_partially_disabled"`

        - `"disabled_error"`

        - `"db_corruption"`

      - `operator: optional "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

    - `TeamsDevicesCustomS2sInputRequest object { connection_id, operator, score }`

      - `connection_id: string`

        Posture Integration ID.

      - `operator: "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `score: number`

        A value between 0-100 assigned to devices set by the 3rd party posture provider.

  - `match: optional array of DeviceMatch`

    The conditions that the client must match to run the rule.

    - `platform: optional "windows" or "mac" or "linux" or 3 more`

      - `"windows"`

      - `"mac"`

      - `"linux"`

      - `"android"`

      - `"ios"`

      - `"chromeos"`

  - `name: optional string`

    The name of the device posture rule.

  - `schedule: optional string`

    Polling frequency for the WARP client posture check. Default: `5m` (poll every five minutes). Minimum: `1m`.

  - `type: optional "file" or "application" or "tanium" or 20 more`

    The type of device posture rule.

    - `"file"`

    - `"application"`

    - `"tanium"`

    - `"gateway"`

    - `"warp"`

    - `"disk_encryption"`

    - `"serial_number"`

    - `"sentinelone"`

    - `"carbonblack"`

    - `"firewall"`

    - `"os_version"`

    - `"domain_joined"`

    - `"client_certificate"`

    - `"client_certificate_v2"`

    - `"antivirus"`

    - `"unique_client_id"`

    - `"kolide"`

    - `"tanium_s2s"`

    - `"crowdstrike_s2s"`

    - `"intune"`

    - `"workspace_one"`

    - `"sentinelone_s2s"`

    - `"custom_s2s"`

### Disk Encryption Input

- `DiskEncryptionInput object { checkDisks, requireAll }`

  - `checkDisks: optional array of CarbonblackInput`

    List of volume names to be checked for encryption.

  - `requireAll: optional boolean`

    Whether to check all disks for encryption.

### Domain Joined Input

- `DomainJoinedInput object { operating_system, domain }`

  - `operating_system: "windows"`

    Operating System.

    - `"windows"`

  - `domain: optional string`

    Domain.

### File Input

- `FileInput object { operating_system, path, exists, 2 more }`

  - `operating_system: "windows" or "linux" or "mac"`

    Operating system.

    - `"windows"`

    - `"linux"`

    - `"mac"`

  - `path: string`

    File path.

  - `exists: optional boolean`

    Whether or not file exists.

  - `sha256: optional string`

    SHA-256.

  - `thumbprint: optional string`

    Signing certificate thumbprint.

### Firewall Input

- `FirewallInput object { enabled, operating_system }`

  - `enabled: boolean`

    Enabled.

  - `operating_system: "windows" or "mac"`

    Operating System.

    - `"windows"`

    - `"mac"`

### Intune Input

- `IntuneInput object { compliance_status, connection_id }`

  - `compliance_status: "compliant" or "noncompliant" or "unknown" or 3 more`

    Compliance Status.

    - `"compliant"`

    - `"noncompliant"`

    - `"unknown"`

    - `"notapplicable"`

    - `"ingraceperiod"`

    - `"error"`

  - `connection_id: string`

    Posture Integration ID.

### Kolide Input

- `KolideInput object { connection_id, auth_state, countOperator, issue_count }`

  - `connection_id: string`

    Posture Integration ID.

  - `auth_state: optional array of "Good" or "Notified" or "Will Block" or "Blocked"`

    The set of Kolide device authentication states that pass the posture check. Device must match one of the specified states.

    - `"Good"`

    - `"Notified"`

    - `"Will Block"`

    - `"Blocked"`

  - `countOperator: optional "<" or "<=" or ">" or 2 more`

    Count Operator.

    - `"<"`

    - `"<="`

    - `">"`

    - `">="`

    - `"=="`

  - `issue_count: optional string`

    The Number of Issues.

### OS Version Input

- `OSVersionInput object { operating_system, operator, version, 3 more }`

  - `operating_system: "windows"`

    Operating System.

    - `"windows"`

  - `operator: "<" or "<=" or ">" or 2 more`

    Operator.

    - `"<"`

    - `"<="`

    - `">"`

    - `">="`

    - `"=="`

  - `version: string`

    Version of OS.

  - `os_distro_name: optional string`

    Operating System Distribution Name (linux only).

  - `os_distro_revision: optional string`

    Version of OS Distribution (linux only).

  - `os_version_extra: optional string`

    Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

### Sentinelone Input

- `SentineloneInput object { operating_system, path, sha256, thumbprint }`

  - `operating_system: "windows" or "linux" or "mac"`

    Operating system.

    - `"windows"`

    - `"linux"`

    - `"mac"`

  - `path: string`

    File path.

  - `sha256: optional string`

    SHA-256.

  - `thumbprint: optional string`

    Signing certificate thumbprint.

### Sentinelone S2s Input

- `SentineloneS2sInput object { connection_id, active_threats, infected, 4 more }`

  - `connection_id: string`

    Posture Integration ID.

  - `active_threats: optional number`

    The Number of active threats.

  - `infected: optional boolean`

    Whether device is infected.

  - `is_active: optional boolean`

    Whether device is active.

  - `network_status: optional "connected" or "disconnected" or "disconnecting" or "connecting"`

    Network status of device.

    - `"connected"`

    - `"disconnected"`

    - `"disconnecting"`

    - `"connecting"`

  - `operational_state: optional "na" or "partially_disabled" or "auto_fully_disabled" or 4 more`

    Agent operational state.

    - `"na"`

    - `"partially_disabled"`

    - `"auto_fully_disabled"`

    - `"fully_disabled"`

    - `"auto_partially_disabled"`

    - `"disabled_error"`

    - `"db_corruption"`

  - `operator: optional "<" or "<=" or ">" or 2 more`

    Operator.

    - `"<"`

    - `"<="`

    - `">"`

    - `">="`

    - `"=="`

### Tanium Input

- `TaniumInput object { connection_id, eid_last_seen, operator, 3 more }`

  - `connection_id: string`

    Posture Integration ID.

  - `eid_last_seen: optional string`

    For more details on eid last seen, refer to the Tanium documentation.

  - `operator: optional "<" or "<=" or ">" or 2 more`

    Operator to evaluate risk_level or eid_last_seen.

    - `"<"`

    - `"<="`

    - `">"`

    - `">="`

    - `"=="`

  - `risk_level: optional "low" or "medium" or "high" or "critical"`

    For more details on risk level, refer to the Tanium documentation.

    - `"low"`

    - `"medium"`

    - `"high"`

    - `"critical"`

  - `scoreOperator: optional "<" or "<=" or ">" or 2 more`

    Score Operator.

    - `"<"`

    - `"<="`

    - `">"`

    - `">="`

    - `"=="`

  - `total_score: optional number`

    For more details on total score, refer to the Tanium documentation.

### Unique Client ID Input

- `UniqueClientIDInput object { id, operating_system }`

  - `id: string`

    List ID.

  - `operating_system: "android" or "ios" or "chromeos"`

    Operating System.

    - `"android"`

    - `"ios"`

    - `"chromeos"`

### Workspace One Input

- `WorkspaceOneInput object { compliance_status, connection_id }`

  - `compliance_status: "compliant" or "noncompliant" or "unknown"`

    Compliance Status.

    - `"compliant"`

    - `"noncompliant"`

    - `"unknown"`

  - `connection_id: string`

    Posture Integration ID.

### Posture Delete Response

- `PostureDeleteResponse object { id }`

  - `id: optional string`

    API UUID.

# Integrations

## List your device posture integrations

**get** `/accounts/{account_id}/devices/posture/integration`

Fetches the list of device posture integrations for an account.

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

- `result: array of Integration`

  - `id: optional string`

    API UUID.

  - `config: optional object { api_url, auth_url, client_id }`

    The configuration object containing third-party integration information.

    - `api_url: string`

      The Workspace One API URL provided in the Workspace One Admin Dashboard.

    - `auth_url: string`

      The Workspace One Authorization URL depending on your region.

    - `client_id: string`

      The Workspace One client ID provided in the Workspace One Admin Dashboard.

  - `interval: optional string`

    The interval between each posture check with the third-party API. Use `m` for minutes (e.g. `5m`) and `h` for hours (e.g. `12h`).

  - `name: optional string`

    The name of the device posture integration.

  - `type: optional "workspace_one" or "crowdstrike_s2s" or "uptycs" or 5 more`

    The type of device posture integration.

    - `"workspace_one"`

    - `"crowdstrike_s2s"`

    - `"uptycs"`

    - `"intune"`

    - `"kolide"`

    - `"tanium_s2s"`

    - `"sentinelone_s2s"`

    - `"custom_s2s"`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/posture/integration \
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
  "result": [
    {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "config": {
        "api_url": "https://as123.awmdm.com/API",
        "auth_url": "https://na.uemauth.workspaceone.com/connect/token",
        "client_id": "example client id"
      },
      "interval": "10m",
      "name": "My Workspace One Integration",
      "type": "workspace_one"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get device posture integration details

**get** `/accounts/{account_id}/devices/posture/integration/{integration_id}`

Fetches details for a single device posture integration.

### Path Parameters

- `account_id: string`

- `integration_id: string`

  API UUID.

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

- `result: Integration`

  - `id: optional string`

    API UUID.

  - `config: optional object { api_url, auth_url, client_id }`

    The configuration object containing third-party integration information.

    - `api_url: string`

      The Workspace One API URL provided in the Workspace One Admin Dashboard.

    - `auth_url: string`

      The Workspace One Authorization URL depending on your region.

    - `client_id: string`

      The Workspace One client ID provided in the Workspace One Admin Dashboard.

  - `interval: optional string`

    The interval between each posture check with the third-party API. Use `m` for minutes (e.g. `5m`) and `h` for hours (e.g. `12h`).

  - `name: optional string`

    The name of the device posture integration.

  - `type: optional "workspace_one" or "crowdstrike_s2s" or "uptycs" or 5 more`

    The type of device posture integration.

    - `"workspace_one"`

    - `"crowdstrike_s2s"`

    - `"uptycs"`

    - `"intune"`

    - `"kolide"`

    - `"tanium_s2s"`

    - `"sentinelone_s2s"`

    - `"custom_s2s"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/posture/integration/$INTEGRATION_ID \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "config": {
      "api_url": "https://as123.awmdm.com/API",
      "auth_url": "https://na.uemauth.workspaceone.com/connect/token",
      "client_id": "example client id"
    },
    "interval": "10m",
    "name": "My Workspace One Integration",
    "type": "workspace_one"
  },
  "success": true
}
```

## Create a device posture integration

**post** `/accounts/{account_id}/devices/posture/integration`

Create a new device posture integration.

### Path Parameters

- `account_id: string`

### Body Parameters

- `config: object { api_url, auth_url, client_id, client_secret }  or object { api_url, client_id, client_secret, customer_id }  or object { api_url, client_key, client_secret, customer_id }  or 5 more`

  The configuration object containing third-party integration information.

  - `TeamsDevicesWorkspaceOneConfigRequest object { api_url, auth_url, client_id, client_secret }`

    - `api_url: string`

      The Workspace One API URL provided in the Workspace One Admin Dashboard.

    - `auth_url: string`

      The Workspace One Authorization URL depending on your region.

    - `client_id: string`

      The Workspace One client ID provided in the Workspace One Admin Dashboard.

    - `client_secret: string`

      The Workspace One client secret provided in the Workspace One Admin Dashboard.

  - `TeamsDevicesCrowdstrikeConfigRequest object { api_url, client_id, client_secret, customer_id }`

    - `api_url: string`

      The Crowdstrike API URL.

    - `client_id: string`

      The Crowdstrike client ID.

    - `client_secret: string`

      The Crowdstrike client secret.

    - `customer_id: string`

      The Crowdstrike customer ID.

  - `TeamsDevicesUptycsConfigRequest object { api_url, client_key, client_secret, customer_id }`

    - `api_url: string`

      The Uptycs API URL.

    - `client_key: string`

      The Uptycs client secret.

    - `client_secret: string`

      The Uptycs client secret.

    - `customer_id: string`

      The Uptycs customer ID.

  - `TeamsDevicesIntuneConfigRequest object { client_id, client_secret, customer_id }`

    - `client_id: string`

      The Intune client ID.

    - `client_secret: string`

      The Intune client secret.

    - `customer_id: string`

      The Intune customer ID.

  - `TeamsDevicesKolideConfigRequest object { client_id, client_secret }`

    - `client_id: string`

      The Kolide client ID.

    - `client_secret: string`

      The Kolide client secret.

  - `TeamsDevicesTaniumConfigRequest object { api_url, client_secret, access_client_id, access_client_secret }`

    - `api_url: string`

      The Tanium API URL.

    - `client_secret: string`

      The Tanium client secret.

    - `access_client_id: optional string`

      If present, this id will be passed in the `CF-Access-Client-ID` header when hitting the `api_url`.

    - `access_client_secret: optional string`

      If present, this secret will be passed in the `CF-Access-Client-Secret` header when hitting the `api_url`.

  - `TeamsDevicesSentineloneS2sConfigRequest object { api_url, client_secret }`

    - `api_url: string`

      The SentinelOne S2S API URL.

    - `client_secret: string`

      The SentinelOne S2S client secret.

  - `TeamsDevicesCustomS2sConfigRequest object { access_client_id, access_client_secret, api_url }`

    - `access_client_id: string`

      This id will be passed in the `CF-Access-Client-ID` header when hitting the `api_url`.

    - `access_client_secret: string`

      This secret will be passed in the `CF-Access-Client-Secret` header when hitting the `api_url`.

    - `api_url: string`

      The Custom Device Posture Integration  API URL.

- `interval: string`

  The interval between each posture check with the third-party API. Use `m` for minutes (e.g. `5m`) and `h` for hours (e.g. `12h`).

- `name: string`

  The name of the device posture integration.

- `type: "workspace_one" or "crowdstrike_s2s" or "uptycs" or 5 more`

  The type of device posture integration.

  - `"workspace_one"`

  - `"crowdstrike_s2s"`

  - `"uptycs"`

  - `"intune"`

  - `"kolide"`

  - `"tanium_s2s"`

  - `"sentinelone_s2s"`

  - `"custom_s2s"`

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

- `result: Integration`

  - `id: optional string`

    API UUID.

  - `config: optional object { api_url, auth_url, client_id }`

    The configuration object containing third-party integration information.

    - `api_url: string`

      The Workspace One API URL provided in the Workspace One Admin Dashboard.

    - `auth_url: string`

      The Workspace One Authorization URL depending on your region.

    - `client_id: string`

      The Workspace One client ID provided in the Workspace One Admin Dashboard.

  - `interval: optional string`

    The interval between each posture check with the third-party API. Use `m` for minutes (e.g. `5m`) and `h` for hours (e.g. `12h`).

  - `name: optional string`

    The name of the device posture integration.

  - `type: optional "workspace_one" or "crowdstrike_s2s" or "uptycs" or 5 more`

    The type of device posture integration.

    - `"workspace_one"`

    - `"crowdstrike_s2s"`

    - `"uptycs"`

    - `"intune"`

    - `"kolide"`

    - `"tanium_s2s"`

    - `"sentinelone_s2s"`

    - `"custom_s2s"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/posture/integration \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "config": {
            "api_url": "https://as123.awmdm.com/API",
            "auth_url": "https://na.uemauth.workspaceone.com/connect/token",
            "client_id": "example client id",
            "client_secret": "example client secret"
          },
          "interval": "10m",
          "name": "My Workspace One Integration",
          "type": "workspace_one"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "config": {
      "api_url": "https://as123.awmdm.com/API",
      "auth_url": "https://na.uemauth.workspaceone.com/connect/token",
      "client_id": "example client id"
    },
    "interval": "10m",
    "name": "My Workspace One Integration",
    "type": "workspace_one"
  },
  "success": true
}
```

## Update a device posture integration

**patch** `/accounts/{account_id}/devices/posture/integration/{integration_id}`

Updates a configured device posture integration.

### Path Parameters

- `account_id: string`

- `integration_id: string`

  API UUID.

### Body Parameters

- `config: optional object { api_url, auth_url, client_id, client_secret }  or object { api_url, client_id, client_secret, customer_id }  or object { api_url, client_key, client_secret, customer_id }  or 5 more`

  The configuration object containing third-party integration information.

  - `TeamsDevicesWorkspaceOneConfigRequest object { api_url, auth_url, client_id, client_secret }`

    - `api_url: string`

      The Workspace One API URL provided in the Workspace One Admin Dashboard.

    - `auth_url: string`

      The Workspace One Authorization URL depending on your region.

    - `client_id: string`

      The Workspace One client ID provided in the Workspace One Admin Dashboard.

    - `client_secret: string`

      The Workspace One client secret provided in the Workspace One Admin Dashboard.

  - `TeamsDevicesCrowdstrikeConfigRequest object { api_url, client_id, client_secret, customer_id }`

    - `api_url: string`

      The Crowdstrike API URL.

    - `client_id: string`

      The Crowdstrike client ID.

    - `client_secret: string`

      The Crowdstrike client secret.

    - `customer_id: string`

      The Crowdstrike customer ID.

  - `TeamsDevicesUptycsConfigRequest object { api_url, client_key, client_secret, customer_id }`

    - `api_url: string`

      The Uptycs API URL.

    - `client_key: string`

      The Uptycs client secret.

    - `client_secret: string`

      The Uptycs client secret.

    - `customer_id: string`

      The Uptycs customer ID.

  - `TeamsDevicesIntuneConfigRequest object { client_id, client_secret, customer_id }`

    - `client_id: string`

      The Intune client ID.

    - `client_secret: string`

      The Intune client secret.

    - `customer_id: string`

      The Intune customer ID.

  - `TeamsDevicesKolideConfigRequest object { client_id, client_secret }`

    - `client_id: string`

      The Kolide client ID.

    - `client_secret: string`

      The Kolide client secret.

  - `TeamsDevicesTaniumConfigRequest object { api_url, client_secret, access_client_id, access_client_secret }`

    - `api_url: string`

      The Tanium API URL.

    - `client_secret: string`

      The Tanium client secret.

    - `access_client_id: optional string`

      If present, this id will be passed in the `CF-Access-Client-ID` header when hitting the `api_url`.

    - `access_client_secret: optional string`

      If present, this secret will be passed in the `CF-Access-Client-Secret` header when hitting the `api_url`.

  - `TeamsDevicesSentineloneS2sConfigRequest object { api_url, client_secret }`

    - `api_url: string`

      The SentinelOne S2S API URL.

    - `client_secret: string`

      The SentinelOne S2S client secret.

  - `TeamsDevicesCustomS2sConfigRequest object { access_client_id, access_client_secret, api_url }`

    - `access_client_id: string`

      This id will be passed in the `CF-Access-Client-ID` header when hitting the `api_url`.

    - `access_client_secret: string`

      This secret will be passed in the `CF-Access-Client-Secret` header when hitting the `api_url`.

    - `api_url: string`

      The Custom Device Posture Integration  API URL.

- `interval: optional string`

  The interval between each posture check with the third-party API. Use `m` for minutes (e.g. `5m`) and `h` for hours (e.g. `12h`).

- `name: optional string`

  The name of the device posture integration.

- `type: optional "workspace_one" or "crowdstrike_s2s" or "uptycs" or 5 more`

  The type of device posture integration.

  - `"workspace_one"`

  - `"crowdstrike_s2s"`

  - `"uptycs"`

  - `"intune"`

  - `"kolide"`

  - `"tanium_s2s"`

  - `"sentinelone_s2s"`

  - `"custom_s2s"`

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

- `result: Integration`

  - `id: optional string`

    API UUID.

  - `config: optional object { api_url, auth_url, client_id }`

    The configuration object containing third-party integration information.

    - `api_url: string`

      The Workspace One API URL provided in the Workspace One Admin Dashboard.

    - `auth_url: string`

      The Workspace One Authorization URL depending on your region.

    - `client_id: string`

      The Workspace One client ID provided in the Workspace One Admin Dashboard.

  - `interval: optional string`

    The interval between each posture check with the third-party API. Use `m` for minutes (e.g. `5m`) and `h` for hours (e.g. `12h`).

  - `name: optional string`

    The name of the device posture integration.

  - `type: optional "workspace_one" or "crowdstrike_s2s" or "uptycs" or 5 more`

    The type of device posture integration.

    - `"workspace_one"`

    - `"crowdstrike_s2s"`

    - `"uptycs"`

    - `"intune"`

    - `"kolide"`

    - `"tanium_s2s"`

    - `"sentinelone_s2s"`

    - `"custom_s2s"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/posture/integration/$INTEGRATION_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "config": {
            "api_url": "https://as123.awmdm.com/API",
            "auth_url": "https://na.uemauth.workspaceone.com/connect/token",
            "client_id": "example client id",
            "client_secret": "example client secret"
          },
          "interval": "10m",
          "name": "My Workspace One Integration",
          "type": "workspace_one"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "config": {
      "api_url": "https://as123.awmdm.com/API",
      "auth_url": "https://na.uemauth.workspaceone.com/connect/token",
      "client_id": "example client id"
    },
    "interval": "10m",
    "name": "My Workspace One Integration",
    "type": "workspace_one"
  },
  "success": true
}
```

## Delete a device posture integration

**delete** `/accounts/{account_id}/devices/posture/integration/{integration_id}`

Delete a configured device posture integration.

### Path Parameters

- `account_id: string`

- `integration_id: string`

  API UUID.

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

- `result: unknown or string`

  - `unknown`

  - `string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/posture/integration/$INTEGRATION_ID \
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
  "result": {},
  "success": true
}
```

## Domain Types

### Integration

- `Integration object { id, config, interval, 2 more }`

  - `id: optional string`

    API UUID.

  - `config: optional object { api_url, auth_url, client_id }`

    The configuration object containing third-party integration information.

    - `api_url: string`

      The Workspace One API URL provided in the Workspace One Admin Dashboard.

    - `auth_url: string`

      The Workspace One Authorization URL depending on your region.

    - `client_id: string`

      The Workspace One client ID provided in the Workspace One Admin Dashboard.

  - `interval: optional string`

    The interval between each posture check with the third-party API. Use `m` for minutes (e.g. `5m`) and `h` for hours (e.g. `12h`).

  - `name: optional string`

    The name of the device posture integration.

  - `type: optional "workspace_one" or "crowdstrike_s2s" or "uptycs" or 5 more`

    The type of device posture integration.

    - `"workspace_one"`

    - `"crowdstrike_s2s"`

    - `"uptycs"`

    - `"intune"`

    - `"kolide"`

    - `"tanium_s2s"`

    - `"sentinelone_s2s"`

    - `"custom_s2s"`

### Integration Delete Response

- `IntegrationDeleteResponse = unknown or string`

  - `unknown`

  - `string`

# Revoke

## Revoke devices (deprecated)

**post** `/accounts/{account_id}/devices/revoke`

Revokes a list of devices. Not supported when [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/) is enabled.

**Deprecated**: please use POST /accounts/{account_id}/devices/registrations/revoke instead.

### Path Parameters

- `account_id: string`

### Body Parameters

- `body: array of string`

  A list of Registration IDs to revoke.

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

- `result: unknown or string`

  - `unknown`

  - `string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/revoke \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
        ]'
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
  "result": {},
  "success": true
}
```

## Domain Types

### Revoke Create Response

- `RevokeCreateResponse = unknown or string`

  - `unknown`

  - `string`

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

# Unrevoke

## Unrevoke devices (deprecated)

**post** `/accounts/{account_id}/devices/unrevoke`

Unrevokes a list of devices. Not supported when [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/) is enabled.

**Deprecated**: please use POST /accounts/{account_id}/devices/registrations/unrevoke instead.

### Path Parameters

- `account_id: string`

### Body Parameters

- `body: array of string`

  A list of Registration IDs to unrevoke.

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

- `result: unknown or string`

  - `unknown`

  - `string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/unrevoke \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
        ]'
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
  "result": {},
  "success": true
}
```

## Domain Types

### Unrevoke Create Response

- `UnrevokeCreateResponse = unknown or string`

  - `unknown`

  - `string`

# Override Codes

## Get override codes (deprecated)


**get** `/accounts/{account_id}/devices/{device_id}/override_codes`

Fetches a one-time use admin override code for a device. This relies on the **Admin Override** setting being enabled in your device configuration. Not supported when [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/) is enabled for the account.
**Deprecated:** please use GET /accounts/{account_id}/devices/registrations/{registration_id}/override_codes instead.

### Path Parameters

- `account_id: string`

- `device_id: string`

  Registration ID. Equal to Device ID except for accounts which enabled [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/).

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

- `result: array of unknown`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/$DEVICE_ID/override_codes \
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
  "result": [
    {}
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get override codes

**get** `/accounts/{account_id}/devices/registrations/{registration_id}/override_codes`

Fetches one-time use admin override codes for a registration. This relies on the **Admin Override** setting being enabled in your device configuration.

### Path Parameters

- `account_id: string`

- `registration_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { disable_for_time }`

  - `disable_for_time: optional map[string]`

- `success: boolean`

  Whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/registrations/$REGISTRATION_ID/override_codes \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "disable_for_time": {
      "foo": "string"
    }
  },
  "success": true
}
```

## Domain Types

### Override Code List Response

- `OverrideCodeListResponse = unknown`

### Override Code Get Response

- `OverrideCodeGetResponse object { disable_for_time }`

  - `disable_for_time: optional map[string]`
