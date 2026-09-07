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
