## Delete Site WAN

**delete** `/accounts/{account_id}/magic/sites/{site_id}/wans/{wan_id}`

Remove a specific Site WAN.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `wan_id: string`

  Identifier

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

- `result: WAN`

  - `id: optional string`

    Identifier

  - `health_check_rate: optional "low" or "mid" or "high"`

    Magic WAN health check rate for tunnels created on this link. The default value is `mid`.

    - `"low"`

    - `"mid"`

    - `"high"`

  - `name: optional string`

  - `physport: optional number`

  - `priority: optional number`

    Priority of WAN for traffic loadbalancing.

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional WANStaticAddressing`

    (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `gateway_address: string`

      A valid IPv4 address.

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/wans/$WAN_ID \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "health_check_rate": "low",
    "name": "name",
    "physport": 1,
    "priority": 0,
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "static_addressing": {
      "address": "192.0.2.0/24",
      "gateway_address": "192.0.2.1",
      "secondary_address": "192.0.2.0/24"
    },
    "vlan_tag": 42
  },
  "success": true
}
```
