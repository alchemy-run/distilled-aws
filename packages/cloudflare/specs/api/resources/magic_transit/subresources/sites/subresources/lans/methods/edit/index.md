## Patch Site LAN

**patch** `/accounts/{account_id}/magic/sites/{site_id}/lans/{lan_id}`

Patch a specific Site LAN.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `lan_id: string`

  Identifier

### Body Parameters

- `bond_id: optional number`

- `is_breakout: optional boolean`

  mark true to use this LAN for source-based breakout traffic

- `is_prioritized: optional boolean`

  mark true to use this LAN for source-based prioritized traffic

- `name: optional string`

- `nat: optional Nat`

  - `static_prefix: optional string`

    A valid CIDR notation representing an IP range.

- `physport: optional number`

- `routed_subnets: optional array of RoutedSubnet`

  - `next_hop: string`

    A valid IPv4 address.

  - `prefix: string`

    A valid CIDR notation representing an IP range.

  - `nat: optional Nat`

- `static_addressing: optional LANStaticAddressing`

  If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

  - `address: string`

    A valid CIDR notation representing an IP range.

  - `dhcp_relay: optional DHCPRelay`

    - `server_addresses: optional array of string`

      List of DHCP server IPs.

  - `dhcp_server: optional DHCPServer`

    - `dhcp_options: optional array of object { code, type, value }`

      Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

      - `code: number`

        DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

      - `type: "text" or "hex" or "ip" or 3 more`

        The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

        - `"text"`

        - `"hex"`

        - `"ip"`

        - `"byte"`

        - `"short"`

        - `"integer"`

      - `value: string`

        The option value, interpreted according to the type field.

    - `dhcp_pool_end: optional string`

      A valid IPv4 address.

    - `dhcp_pool_start: optional string`

      A valid IPv4 address.

    - `dns_server: optional string`

      A valid IPv4 address.

    - `dns_servers: optional array of string`

    - `reservations: optional map[string]`

      Mapping of MAC addresses to IP addresses

  - `secondary_address: optional string`

    A valid CIDR notation representing an IP range.

  - `virtual_address: optional string`

    A valid CIDR notation representing an IP range.

- `vlan_tag: optional number`

  VLAN ID. Use zero for untagged.

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

- `result: LAN`

  - `id: optional string`

    Identifier

  - `bond_id: optional number`

  - `ha_link: optional boolean`

    mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link.

  - `is_breakout: optional boolean`

    mark true to use this LAN for source-based breakout traffic

  - `is_prioritized: optional boolean`

    mark true to use this LAN for source-based prioritized traffic

  - `name: optional string`

  - `nat: optional Nat`

    - `static_prefix: optional string`

      A valid CIDR notation representing an IP range.

  - `physport: optional number`

  - `routed_subnets: optional array of RoutedSubnet`

    - `next_hop: string`

      A valid IPv4 address.

    - `prefix: string`

      A valid CIDR notation representing an IP range.

    - `nat: optional Nat`

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional LANStaticAddressing`

    If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `dhcp_relay: optional DHCPRelay`

      - `server_addresses: optional array of string`

        List of DHCP server IPs.

    - `dhcp_server: optional DHCPServer`

      - `dhcp_options: optional array of object { code, type, value }`

        Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

        - `code: number`

          DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

        - `type: "text" or "hex" or "ip" or 3 more`

          The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

          - `"text"`

          - `"hex"`

          - `"ip"`

          - `"byte"`

          - `"short"`

          - `"integer"`

        - `value: string`

          The option value, interpreted according to the type field.

      - `dhcp_pool_end: optional string`

        A valid IPv4 address.

      - `dhcp_pool_start: optional string`

        A valid IPv4 address.

      - `dns_server: optional string`

        A valid IPv4 address.

      - `dns_servers: optional array of string`

      - `reservations: optional map[string]`

        Mapping of MAC addresses to IP addresses

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

    - `virtual_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/lans/$LAN_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "bond_id": 2,
          "physport": 1,
          "vlan_tag": 42
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "bond_id": 2,
    "ha_link": true,
    "is_breakout": true,
    "is_prioritized": true,
    "name": "name",
    "nat": {
      "static_prefix": "192.0.2.0/24"
    },
    "physport": 1,
    "routed_subnets": [
      {
        "next_hop": "192.0.2.1",
        "prefix": "192.0.2.0/24",
        "nat": {
          "static_prefix": "192.0.2.0/24"
        }
      }
    ],
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "static_addressing": {
      "address": "192.0.2.0/24",
      "dhcp_relay": {
        "server_addresses": [
          "192.0.2.1"
        ]
      },
      "dhcp_server": {
        "dhcp_options": [
          {
            "code": 66,
            "type": "ip",
            "value": "10.20.30.40"
          }
        ],
        "dhcp_pool_end": "192.0.2.1",
        "dhcp_pool_start": "192.0.2.1",
        "dns_server": "192.0.2.1",
        "dns_servers": [
          "192.0.2.1"
        ],
        "reservations": {
          "00:11:22:33:44:55": "192.0.2.100",
          "AA:BB:CC:DD:EE:FF": "192.168.1.101"
        }
      },
      "secondary_address": "192.0.2.0/24",
      "virtual_address": "192.0.2.0/24"
    },
    "vlan_tag": 42
  },
  "success": true
}
```
