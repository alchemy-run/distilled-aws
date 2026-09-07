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
