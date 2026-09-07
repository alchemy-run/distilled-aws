## Update WARP Connector HA configuration

**put** `/accounts/{account_id}/warp_connector/{tunnel_id}/configurations`

Adds or updates the high-availability configuration for a WARP Connector tunnel.

### Path Parameters

- `account_id: string`

  Identifier.

- `tunnel_id: string`

  UUID of the tunnel.

### Body Parameters

- `ha_mode: "none" or "disabled" or "aws" or "local"`

  High-availability mode for the WARP Connector tunnel. `none` means HA is enabled but no provider is configured yet (newly created tunnels default to this). `disabled` means HA is explicitly turned off. `aws` uses AWS ENI move for failover. `local` uses virtual IPs (VIPs) on the local interface.

  - `"none"`

  - `"disabled"`

  - `"aws"`

  - `"local"`

- `config: optional object { fnr_id }  or object { vips, vips_previous }  or unknown`

  Provider-specific configuration. Required shape depends on ha_mode. For `aws`, must contain `fnr_id`. For `local`, must contain `vips`. For `none` and `disabled`, must be empty or omitted.

  - `TunnelMeshAwsConfig object { fnr_id }`

    - `fnr_id: string`

      Floating Network Resource ID — the secondary ENI that is moved between nodes on failover.

  - `TunnelMeshLocalConfig object { vips, vips_previous }`

    - `vips: array of object { address }`

      VIPs to assign on the CloudflareWARP interface.

      - `address: string`

        Virtual IP address (IPv4 or IPv6).

    - `vips_previous: optional array of object { address }`

      VIPs to clean up on demotion or version drift.

      - `address: string`

        Virtual IP address (IPv4 or IPv6).

  - `unknown`

    Empty object for none/disabled modes.

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

- `result: optional object { configuration_version, created_at, ha_mode, 3 more }`

  - `configuration_version: number`

    Monotonically increasing configuration version, incremented on each PUT.

  - `created_at: string`

    Timestamp of when the resource was created.

  - `ha_mode: "none" or "disabled" or "aws" or "local"`

    High-availability mode for the WARP Connector tunnel. `none` means HA is enabled but no provider is configured yet (newly created tunnels default to this). `disabled` means HA is explicitly turned off. `aws` uses AWS ENI move for failover. `local` uses virtual IPs (VIPs) on the local interface.

    - `"none"`

    - `"disabled"`

    - `"aws"`

    - `"local"`

  - `tunnel_id: string`

    UUID of the tunnel.

  - `config: optional object { fnr_id }  or object { vips, vips_previous }`

    Provider-specific configuration. Present for `aws` and `local` modes.

    - `TunnelMeshAwsConfig object { fnr_id }`

      - `fnr_id: string`

        Floating Network Resource ID — the secondary ENI that is moved between nodes on failover.

    - `TunnelMeshLocalConfig object { vips, vips_previous }`

      - `vips: array of object { address }`

        VIPs to assign on the CloudflareWARP interface.

        - `address: string`

          Virtual IP address (IPv4 or IPv6).

      - `vips_previous: optional array of object { address }`

        VIPs to clean up on demotion or version drift.

        - `address: string`

          Virtual IP address (IPv4 or IPv6).

  - `updated_at: optional string`

    Timestamp of the last update. Null if never updated.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/warp_connector/$TUNNEL_ID/configurations \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "ha_mode": "aws"
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
    "configuration_version": 0,
    "created_at": "2021-01-25T18:22:34.317854Z",
    "ha_mode": "aws",
    "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "config": {
      "fnr_id": "eni-0123456789abcdef0"
    },
    "updated_at": "2021-01-25T18:22:34.317854Z"
  }
}
```
