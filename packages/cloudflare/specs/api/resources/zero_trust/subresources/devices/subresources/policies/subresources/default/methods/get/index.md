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
