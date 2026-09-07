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
