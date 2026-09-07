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
