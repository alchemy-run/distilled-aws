## Fetch BGP Prefix

**get** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/prefixes/{bgp_prefix_id}`

Retrieve a single BGP Prefix according to its identifier

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

- `bgp_prefix_id: string`

  Identifier of BGP Prefix.

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

- `result: optional BGPPrefix`

  - `id: optional string`

    Identifier of BGP Prefix.

  - `asn: optional number`

    Autonomous System Number (ASN) the prefix will be advertised under.

  - `asn_prepend_count: optional number`

    Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute

  - `auto_advertise_withdraw: optional boolean`

    Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Cloudflare will automatically withdraw the BGP prefix when there are no matching BGP routes, and will resume advertising when there is at least one matching BGP route.

  - `bgp_signal_opts: optional object { enabled, modified_at }`

    - `enabled: optional boolean`

      Whether control of advertisement of the prefix to the Internet is enabled to be performed via BGP signal

    - `modified_at: optional string`

      Last time BGP signaling control was toggled. This field is null if BGP signaling has never been enabled.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `modified_at: optional string`

  - `on_demand: optional object { advertised, advertised_modified_at, on_demand_enabled, on_demand_locked }`

    - `advertised: optional boolean`

      Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.

    - `advertised_modified_at: optional string`

      Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

    - `on_demand_enabled: optional boolean`

      Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

    - `on_demand_locked: optional boolean`

      Whether the advertisement status of the prefix is locked, meaning it cannot be changed.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bgp/prefixes/$BGP_PREFIX_ID \
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
    "id": "7009ba364c7a5760798ceb430e603b74",
    "asn": 13335,
    "asn_prepend_count": 2,
    "auto_advertise_withdraw": true,
    "bgp_signal_opts": {
      "enabled": false,
      "modified_at": "2014-01-01T05:20:00.12345Z"
    },
    "cidr": "192.0.2.0/24",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "on_demand": {
      "advertised": true,
      "advertised_modified_at": "2014-01-01T05:20:00.12345Z",
      "on_demand_enabled": true,
      "on_demand_locked": false
    }
  }
}
```
