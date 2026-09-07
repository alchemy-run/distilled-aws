## Create new target

**post** `/accounts/{account_id}/infrastructure/targets`

Create new target

### Path Parameters

- `account_id: string`

  Account identifier

### Body Parameters

- `hostname: string`

  A non-unique field that refers to a target. Case insensitive, maximum
  length of 255 characters, supports the use of special characters dash
  and period, does not support spaces, and must start and end with an
  alphanumeric character.

- `ip: object { ipv4, ipv6 }`

  The IPv4/IPv6 address that identifies where to reach a target

  - `ipv4: optional object { ip_addr, virtual_network_id }`

    The target's IPv4 address

    - `ip_addr: optional string`

      IP address of the target

    - `virtual_network_id: optional string`

      (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

  - `ipv6: optional object { ip_addr, virtual_network_id }`

    The target's IPv6 address

    - `ip_addr: optional string`

      IP address of the target

    - `virtual_network_id: optional string`

      (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

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

- `result: optional object { id, created_at, hostname, 2 more }`

  - `id: string`

    Target identifier

  - `created_at: string`

    Date and time at which the target was created

  - `hostname: string`

    A non-unique field that refers to a target

  - `ip: object { ipv4, ipv6 }`

    The IPv4/IPv6 address that identifies where to reach a target

    - `ipv4: optional object { ip_addr, virtual_network_id }`

      The target's IPv4 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

    - `ipv6: optional object { ip_addr, virtual_network_id }`

      The target's IPv6 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

  - `modified_at: string`

    Date and time at which the target was modified

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/infrastructure/targets \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "hostname": "infra-access-target",
          "ip": {}
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-08-24T14:15:22Z",
    "hostname": "infra-access-target",
    "ip": {
      "ipv4": {
        "ip_addr": "187.26.29.249",
        "virtual_network_id": "c77b744e-acc8-428f-9257-6878c046ed55"
      },
      "ipv6": {
        "ip_addr": "64c0:64e8:f0b4:8dbf:7104:72b0:ec8f:f5e0",
        "virtual_network_id": "c77b744e-acc8-428f-9257-6878c046ed55"
      }
    },
    "modified_at": "2019-08-24T14:15:22Z"
  }
}
```
