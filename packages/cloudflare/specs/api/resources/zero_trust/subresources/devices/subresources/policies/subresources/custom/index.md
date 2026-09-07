# Custom

## List device settings profiles

**get** `/accounts/{account_id}/devices/policies`

Fetches a list of the device settings profiles for an account.

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

- `result: array of SettingsPolicy`

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

    Whether the policy is the default policy for an account.

  - `description: optional string`

    A description of the policy.

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

  - `lan_allow_minutes: optional number`

    The amount of time in minutes a user is allowed access to their LAN. A value of 0 will allow LAN access until the next WARP reconnection, such as a reboot or a laptop waking from sleep. Note that this field is omitted from the response if null or unset.

  - `lan_allow_subnet_size: optional number`

    The size of the subnet for the local access network. Note that this field is omitted from the response if null or unset.

  - `match: optional string`

    The wirefilter expression to match devices. Available values: "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.service_token_uuid", "identity.saml_attributes", "network", "os.name", "os.version".

  - `name: optional string`

    The name of the device settings profile.

  - `policy_id: optional string`

  - `precedence: optional number`

    The precedence of the policy. Lower values indicate higher precedence. Policies will be evaluated in ascending order of this field.

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

  - `target_tests: optional array of object { id, name }`

    - `id: optional string`

      The id of the DEX test targeting this policy.

    - `name: optional string`

      The name of the DEX test targeting this policy.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policies \
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
      "allow_mode_switch": true,
      "allow_updates": true,
      "allowed_to_leave": true,
      "auto_connect": 0,
      "captive_portal": 180,
      "default": false,
      "description": "Policy for test teams.",
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
      "lan_allow_minutes": 30,
      "lan_allow_subnet_size": 24,
      "match": "identity.email == \"test@cloudflare.com\"",
      "name": "Allow Developers",
      "policy_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "precedence": 100,
      "register_interface_ip_with_dns": true,
      "sccm_vpn_boundary_support": false,
      "service_mode_v2": {
        "mode": "proxy",
        "port": 3000
      },
      "support_url": "https://1.1.1.1/help",
      "switch_locked": true,
      "target_tests": [
        {
          "id": "id",
          "name": "name"
        }
      ],
      "tunnel_protocol": "wireguard",
      "virtual_networks": {
        "allowed": [
          "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
        ],
        "default": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
      }
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

## Get device settings profile by ID

**get** `/accounts/{account_id}/devices/policy/{policy_id}`

Fetches a device settings profile by ID.

### Path Parameters

- `account_id: string`

- `policy_id: string`

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

- `result: SettingsPolicy`

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

    Whether the policy is the default policy for an account.

  - `description: optional string`

    A description of the policy.

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

  - `lan_allow_minutes: optional number`

    The amount of time in minutes a user is allowed access to their LAN. A value of 0 will allow LAN access until the next WARP reconnection, such as a reboot or a laptop waking from sleep. Note that this field is omitted from the response if null or unset.

  - `lan_allow_subnet_size: optional number`

    The size of the subnet for the local access network. Note that this field is omitted from the response if null or unset.

  - `match: optional string`

    The wirefilter expression to match devices. Available values: "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.service_token_uuid", "identity.saml_attributes", "network", "os.name", "os.version".

  - `name: optional string`

    The name of the device settings profile.

  - `policy_id: optional string`

  - `precedence: optional number`

    The precedence of the policy. Lower values indicate higher precedence. Policies will be evaluated in ascending order of this field.

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

  - `target_tests: optional array of object { id, name }`

    - `id: optional string`

      The id of the DEX test targeting this policy.

    - `name: optional string`

      The name of the DEX test targeting this policy.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID \
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
    "default": false,
    "description": "Policy for test teams.",
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
    "lan_allow_minutes": 30,
    "lan_allow_subnet_size": 24,
    "match": "identity.email == \"test@cloudflare.com\"",
    "name": "Allow Developers",
    "policy_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "precedence": 100,
    "register_interface_ip_with_dns": true,
    "sccm_vpn_boundary_support": false,
    "service_mode_v2": {
      "mode": "proxy",
      "port": 3000
    },
    "support_url": "https://1.1.1.1/help",
    "switch_locked": true,
    "target_tests": [
      {
        "id": "id",
        "name": "name"
      }
    ],
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

## Create a device settings profile

**post** `/accounts/{account_id}/devices/policy`

Creates a device settings profile to be applied to certain devices matching the criteria.

### Path Parameters

- `account_id: string`

### Body Parameters

- `match: string`

  The wirefilter expression to match devices. Available values: "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.service_token_uuid", "identity.saml_attributes", "network", "os.name", "os.version".

- `name: string`

  The name of the device settings profile.

- `precedence: number`

  The precedence of the policy. Lower values indicate higher precedence. Policies will be evaluated in ascending order of this field.

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

- `description: optional string`

  A description of the policy.

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

  List of routes excluded in the WARP client's tunnel. Both 'exclude' and 'include' cannot be set in the same request.

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

  List of routes included in the WARP client's tunnel. Both 'exclude' and 'include' cannot be set in the same request.

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

- `lan_allow_minutes: optional number`

  The amount of time in minutes a user is allowed access to their LAN. A value of 0 will allow LAN access until the next WARP reconnection, such as a reboot or a laptop waking from sleep. Note that this field is omitted from the response if null or unset.

- `lan_allow_subnet_size: optional number`

  The size of the subnet for the local access network. Note that this field is omitted from the response if null or unset.

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

- `result: SettingsPolicy`

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

    Whether the policy is the default policy for an account.

  - `description: optional string`

    A description of the policy.

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

  - `lan_allow_minutes: optional number`

    The amount of time in minutes a user is allowed access to their LAN. A value of 0 will allow LAN access until the next WARP reconnection, such as a reboot or a laptop waking from sleep. Note that this field is omitted from the response if null or unset.

  - `lan_allow_subnet_size: optional number`

    The size of the subnet for the local access network. Note that this field is omitted from the response if null or unset.

  - `match: optional string`

    The wirefilter expression to match devices. Available values: "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.service_token_uuid", "identity.saml_attributes", "network", "os.name", "os.version".

  - `name: optional string`

    The name of the device settings profile.

  - `policy_id: optional string`

  - `precedence: optional number`

    The precedence of the policy. Lower values indicate higher precedence. Policies will be evaluated in ascending order of this field.

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

  - `target_tests: optional array of object { id, name }`

    - `id: optional string`

      The id of the DEX test targeting this policy.

    - `name: optional string`

      The name of the DEX test targeting this policy.

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
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "match": "identity.email == \\"test@cloudflare.com\\"",
          "name": "Allow Developers",
          "precedence": 100,
          "allow_mode_switch": true,
          "allow_updates": true,
          "allowed_to_leave": true,
          "captive_portal": 180,
          "description": "Policy for test teams.",
          "disable_auto_fallback": true,
          "enabled": true,
          "exclude_office_ips": true,
          "lan_allow_minutes": 30,
          "lan_allow_subnet_size": 24,
          "register_interface_ip_with_dns": true,
          "support_url": "https://1.1.1.1/help",
          "switch_locked": true,
          "tunnel_protocol": "wireguard"
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
    "allow_mode_switch": true,
    "allow_updates": true,
    "allowed_to_leave": true,
    "auto_connect": 0,
    "captive_portal": 180,
    "default": false,
    "description": "Policy for test teams.",
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
    "lan_allow_minutes": 30,
    "lan_allow_subnet_size": 24,
    "match": "identity.email == \"test@cloudflare.com\"",
    "name": "Allow Developers",
    "policy_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "precedence": 100,
    "register_interface_ip_with_dns": true,
    "sccm_vpn_boundary_support": false,
    "service_mode_v2": {
      "mode": "proxy",
      "port": 3000
    },
    "support_url": "https://1.1.1.1/help",
    "switch_locked": true,
    "target_tests": [
      {
        "id": "id",
        "name": "name"
      }
    ],
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

## Update a device settings profile

**patch** `/accounts/{account_id}/devices/policy/{policy_id}`

Updates a configured device settings profile.

### Path Parameters

- `account_id: string`

- `policy_id: string`

### Body Parameters

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

- `description: optional string`

  A description of the policy.

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

  List of routes excluded in the WARP client's tunnel. Both 'exclude' and 'include' cannot be set in the same request.

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

  List of routes included in the WARP client's tunnel. Both 'exclude' and 'include' cannot be set in the same request.

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

- `lan_allow_minutes: optional number`

  The amount of time in minutes a user is allowed access to their LAN. A value of 0 will allow LAN access until the next WARP reconnection, such as a reboot or a laptop waking from sleep. Note that this field is omitted from the response if null or unset.

- `lan_allow_subnet_size: optional number`

  The size of the subnet for the local access network. Note that this field is omitted from the response if null or unset.

- `match: optional string`

  The wirefilter expression to match devices. Available values: "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.service_token_uuid", "identity.saml_attributes", "network", "os.name", "os.version".

- `name: optional string`

  The name of the device settings profile.

- `precedence: optional number`

  The precedence of the policy. Lower values indicate higher precedence. Policies will be evaluated in ascending order of this field.

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

- `result: SettingsPolicy`

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

    Whether the policy is the default policy for an account.

  - `description: optional string`

    A description of the policy.

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

  - `lan_allow_minutes: optional number`

    The amount of time in minutes a user is allowed access to their LAN. A value of 0 will allow LAN access until the next WARP reconnection, such as a reboot or a laptop waking from sleep. Note that this field is omitted from the response if null or unset.

  - `lan_allow_subnet_size: optional number`

    The size of the subnet for the local access network. Note that this field is omitted from the response if null or unset.

  - `match: optional string`

    The wirefilter expression to match devices. Available values: "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.service_token_uuid", "identity.saml_attributes", "network", "os.name", "os.version".

  - `name: optional string`

    The name of the device settings profile.

  - `policy_id: optional string`

  - `precedence: optional number`

    The precedence of the policy. Lower values indicate higher precedence. Policies will be evaluated in ascending order of this field.

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

  - `target_tests: optional array of object { id, name }`

    - `id: optional string`

      The id of the DEX test targeting this policy.

    - `name: optional string`

      The name of the DEX test targeting this policy.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "allow_mode_switch": true,
          "allow_updates": true,
          "allowed_to_leave": true,
          "captive_portal": 180,
          "description": "Policy for test teams.",
          "disable_auto_fallback": true,
          "enabled": true,
          "exclude_office_ips": true,
          "lan_allow_minutes": 30,
          "lan_allow_subnet_size": 24,
          "match": "identity.email == \\"test@cloudflare.com\\"",
          "name": "Allow Developers",
          "precedence": 100,
          "register_interface_ip_with_dns": true,
          "support_url": "https://1.1.1.1/help",
          "switch_locked": true,
          "tunnel_protocol": "wireguard"
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
    "allow_mode_switch": true,
    "allow_updates": true,
    "allowed_to_leave": true,
    "auto_connect": 0,
    "captive_portal": 180,
    "default": false,
    "description": "Policy for test teams.",
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
    "lan_allow_minutes": 30,
    "lan_allow_subnet_size": 24,
    "match": "identity.email == \"test@cloudflare.com\"",
    "name": "Allow Developers",
    "policy_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "precedence": 100,
    "register_interface_ip_with_dns": true,
    "sccm_vpn_boundary_support": false,
    "service_mode_v2": {
      "mode": "proxy",
      "port": 3000
    },
    "support_url": "https://1.1.1.1/help",
    "switch_locked": true,
    "target_tests": [
      {
        "id": "id",
        "name": "name"
      }
    ],
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

## Delete a device settings profile

**delete** `/accounts/{account_id}/devices/policy/{policy_id}`

Deletes a device settings profile and fetches a list of the remaining profiles for an account.

### Path Parameters

- `account_id: string`

- `policy_id: string`

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

- `result: array of SettingsPolicy`

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

    Whether the policy is the default policy for an account.

  - `description: optional string`

    A description of the policy.

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

  - `lan_allow_minutes: optional number`

    The amount of time in minutes a user is allowed access to their LAN. A value of 0 will allow LAN access until the next WARP reconnection, such as a reboot or a laptop waking from sleep. Note that this field is omitted from the response if null or unset.

  - `lan_allow_subnet_size: optional number`

    The size of the subnet for the local access network. Note that this field is omitted from the response if null or unset.

  - `match: optional string`

    The wirefilter expression to match devices. Available values: "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.service_token_uuid", "identity.saml_attributes", "network", "os.name", "os.version".

  - `name: optional string`

    The name of the device settings profile.

  - `policy_id: optional string`

  - `precedence: optional number`

    The precedence of the policy. Lower values indicate higher precedence. Policies will be evaluated in ascending order of this field.

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

  - `target_tests: optional array of object { id, name }`

    - `id: optional string`

      The id of the DEX test targeting this policy.

    - `name: optional string`

      The name of the DEX test targeting this policy.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID \
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
  "result": [
    {
      "allow_mode_switch": true,
      "allow_updates": true,
      "allowed_to_leave": true,
      "auto_connect": 0,
      "captive_portal": 180,
      "default": false,
      "description": "Policy for test teams.",
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
      "lan_allow_minutes": 30,
      "lan_allow_subnet_size": 24,
      "match": "identity.email == \"test@cloudflare.com\"",
      "name": "Allow Developers",
      "policy_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "precedence": 100,
      "register_interface_ip_with_dns": true,
      "sccm_vpn_boundary_support": false,
      "service_mode_v2": {
        "mode": "proxy",
        "port": 3000
      },
      "support_url": "https://1.1.1.1/help",
      "switch_locked": true,
      "target_tests": [
        {
          "id": "id",
          "name": "name"
        }
      ],
      "tunnel_protocol": "wireguard",
      "virtual_networks": {
        "allowed": [
          "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
        ],
        "default": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
      }
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

# Excludes

## Get the Split Tunnel exclude list for a device settings profile

**get** `/accounts/{account_id}/devices/policy/{policy_id}/exclude`

Fetches the list of routes excluded from the WARP client's tunnel for a specific device settings profile.

### Path Parameters

- `account_id: string`

- `policy_id: string`

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

- `result: array of SplitTunnelExclude`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID/exclude \
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
      "address": "192.0.2.0/24",
      "description": "Exclude testing domains from the tunnel"
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

## Set the Split Tunnel exclude list for a device settings profile

**put** `/accounts/{account_id}/devices/policy/{policy_id}/exclude`

Sets the list of routes excluded from the WARP client's tunnel for a specific device settings profile.

### Path Parameters

- `account_id: string`

- `policy_id: string`

### Body Parameters

- `body: array of SplitTunnelExclude`

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

- `result: array of SplitTunnelExclude`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID/exclude \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "address": "192.0.2.0/24",
            "description": "Exclude testing domains from the tunnel"
          }
        ]'
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
      "address": "192.0.2.0/24",
      "description": "Exclude testing domains from the tunnel"
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

# Includes

## Get the Split Tunnel include list for a device settings profile

**get** `/accounts/{account_id}/devices/policy/{policy_id}/include`

Fetches the list of routes included in the WARP client's tunnel for a specific device settings profile.

### Path Parameters

- `account_id: string`

- `policy_id: string`

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

- `result: array of SplitTunnelInclude`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID/include \
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
      "address": "192.0.2.0/24",
      "description": "Include testing domains in the tunnel"
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

## Set the Split Tunnel include list for a device settings profile

**put** `/accounts/{account_id}/devices/policy/{policy_id}/include`

Sets the list of routes included in the WARP client's tunnel for a specific device settings profile.

### Path Parameters

- `account_id: string`

- `policy_id: string`

### Body Parameters

- `body: array of SplitTunnelInclude`

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

- `result: array of SplitTunnelInclude`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID/include \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "address": "192.0.2.0/24",
            "description": "Include testing domains in the tunnel"
          }
        ]'
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
      "address": "192.0.2.0/24",
      "description": "Include testing domains in the tunnel"
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

# Fallback Domains

## Get the Local Domain Fallback list for a device settings profile

**get** `/accounts/{account_id}/devices/policy/{policy_id}/fallback_domains`

Fetches the list of domains to bypass Gateway DNS resolution from a specified device settings profile. These domains will use the specified local DNS resolver instead.

### Path Parameters

- `account_id: string`

- `policy_id: string`

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

- `result: array of FallbackDomain`

  - `suffix: string`

    The domain suffix to match when resolving locally.

  - `description: optional string`

    A description of the fallback domain, displayed in the client UI.

  - `dns_server: optional array of string`

    A list of IP addresses to handle domain resolution.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID/fallback_domains \
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
      "suffix": "example.com",
      "description": "Domain bypass for local development",
      "dns_server": [
        "1.1.1.1"
      ]
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

## Set the Local Domain Fallback list for a device settings profile

**put** `/accounts/{account_id}/devices/policy/{policy_id}/fallback_domains`

Sets the list of domains to bypass Gateway DNS resolution. These domains will use the specified local DNS resolver instead. This will only apply to the specified device settings profile.

### Path Parameters

- `account_id: string`

- `policy_id: string`

### Body Parameters

- `domains: array of FallbackDomain`

  - `suffix: string`

    The domain suffix to match when resolving locally.

  - `description: optional string`

    A description of the fallback domain, displayed in the client UI.

  - `dns_server: optional array of string`

    A list of IP addresses to handle domain resolution.

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

- `result: array of FallbackDomain`

  - `suffix: string`

    The domain suffix to match when resolving locally.

  - `description: optional string`

    A description of the fallback domain, displayed in the client UI.

  - `dns_server: optional array of string`

    A list of IP addresses to handle domain resolution.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID/fallback_domains \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "suffix": "example.com",
            "description": "Domain bypass for local development",
            "dns_server": [
              "1.1.1.1"
            ]
          }
        ]'
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
      "suffix": "example.com",
      "description": "Domain bypass for local development",
      "dns_server": [
        "1.1.1.1"
      ]
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
