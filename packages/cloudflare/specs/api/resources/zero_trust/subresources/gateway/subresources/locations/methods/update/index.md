## Update a Zero Trust Gateway location

**put** `/accounts/{account_id}/gateway/locations/{location_id}`

Update a configured Zero Trust Gateway location.

### Path Parameters

- `account_id: string`

- `location_id: string`

### Body Parameters

- `name: string`

  Specify the location name.

- `client_default: optional boolean`

  Indicate whether this location is the default location.

- `dns_destination_ips_id: optional string`

  Specify the identifier of the pair of IPv4 addresses assigned to this location. When creating a location, if this field is absent or set to null, the pair of shared IPv4 addresses (0e4a32c6-6fb8-4858-9296-98f51631e8e6) is auto-assigned. When updating a location, if this field is absent or set to null, the pre-assigned pair remains unchanged.

- `ecs_support: optional boolean`

  Indicate whether the location must resolve EDNS queries.

- `endpoints: optional Endpoint`

  Configure the destination endpoints for this location.

  - `doh: DOHEndpoint`

    - `enabled: optional boolean`

      Indicate whether the DOH endpoint is enabled for this location.

    - `networks: optional array of IPNetwork`

      Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

      - `network: string`

        Specify the IP address or IP CIDR.

    - `require_token: optional boolean`

      Specify whether the DOH endpoint requires user identity authentication.

  - `dot: DOTEndpoint`

    - `enabled: optional boolean`

      Indicate whether the DOT endpoint is enabled for this location.

    - `networks: optional array of IPNetwork`

      Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

      - `network: string`

        Specify the IP address or IP CIDR.

  - `ipv4: IPV4Endpoint`

    - `enabled: optional boolean`

      Indicate whether the IPv4 endpoint is enabled for this location.

  - `ipv6: IPV6Endpoint`

    - `enabled: optional boolean`

      Indicate whether the IPV6 endpoint is enabled for this location.

    - `networks: optional array of IPV6Network`

      Specify the list of allowed source IPv6 network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

      - `network: string`

        Specify the IPv6 address or IPv6 CIDR.

- `max_ttl: optional object { mode, ttl_secs }`

  Controls how DNS response TTLs are capped for this location relative to the account `max_ttl_secs` setting. Omitting `max_ttl` on update resets it to `inherit`.

  - `mode: "inherit" or "override" or "disabled"`

    `inherit` uses the account `max_ttl_secs`. `override` uses this location's `ttl_secs`. `disabled` leaves returned TTLs unchanged.

    - `"inherit"`

    - `"override"`

    - `"disabled"`

  - `ttl_secs: optional number`

    Location-specific cap on DNS response TTLs, in seconds. Required when `mode` is `override`. Must be omitted when `mode` is `inherit` or `disabled`.

- `networks: optional array of object { network }`

  Specify the list of network ranges from which requests at this location originate. The list takes effect only if it is non-empty and the IPv4 endpoint is enabled for this location.

  - `network: string`

    Specify the IPv4 address or IPv4 CIDR. Limit IPv4 CIDRs to a maximum of /24.

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

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional Location`

  - `id: optional string`

  - `client_default: optional boolean`

    Indicate whether this location is the default location.

  - `created_at: optional string`

  - `dns_destination_ips_id: optional string`

    Indicate the identifier of the pair of IPv4 addresses assigned to this location.

  - `dns_destination_ipv6_block_id: optional string`

    Specify the UUID of the IPv6 block brought to the gateway so that this location's IPv6 address is allocated from the Bring Your Own IPv6 (BYOIPv6) block rather than the standard Cloudflare IPv6 block.

  - `doh_subdomain: optional string`

    Specify the DNS over HTTPS domain that receives DNS requests. Gateway automatically generates this value.

  - `ecs_support: optional boolean`

    Indicate whether the location must resolve EDNS queries.

  - `endpoints: optional Endpoint`

    Configure the destination endpoints for this location.

    - `doh: DOHEndpoint`

      - `enabled: optional boolean`

        Indicate whether the DOH endpoint is enabled for this location.

      - `networks: optional array of IPNetwork`

        Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

        - `network: string`

          Specify the IP address or IP CIDR.

      - `require_token: optional boolean`

        Specify whether the DOH endpoint requires user identity authentication.

    - `dot: DOTEndpoint`

      - `enabled: optional boolean`

        Indicate whether the DOT endpoint is enabled for this location.

      - `networks: optional array of IPNetwork`

        Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

        - `network: string`

          Specify the IP address or IP CIDR.

    - `ipv4: IPV4Endpoint`

      - `enabled: optional boolean`

        Indicate whether the IPv4 endpoint is enabled for this location.

    - `ipv6: IPV6Endpoint`

      - `enabled: optional boolean`

        Indicate whether the IPV6 endpoint is enabled for this location.

      - `networks: optional array of IPV6Network`

        Specify the list of allowed source IPv6 network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

        - `network: string`

          Specify the IPv6 address or IPv6 CIDR.

  - `ip: optional string`

    Defines the automatically generated IPv6 destination IP assigned to this location. Gateway counts all DNS requests sent to this IP as requests under this location.

  - `ipv4_destination: optional string`

    Show the primary destination IPv4 address from the pair identified dns_destination_ips_id. This field read-only.

  - `ipv4_destination_backup: optional string`

    Show the backup destination IPv4 address from the pair identified dns_destination_ips_id. This field read-only.

  - `max_ttl: optional object { mode, ttl_secs }`

    Controls how DNS response TTLs are capped for this location relative to the account `max_ttl_secs` setting. Omitting `max_ttl` on update resets it to `inherit`.

    - `mode: "inherit" or "override" or "disabled"`

      `inherit` uses the account `max_ttl_secs`. `override` uses this location's `ttl_secs`. `disabled` leaves returned TTLs unchanged.

      - `"inherit"`

      - `"override"`

      - `"disabled"`

    - `ttl_secs: optional number`

      Location-specific cap on DNS response TTLs, in seconds. Required when `mode` is `override`. Must be omitted when `mode` is `inherit` or `disabled`.

  - `name: optional string`

    Specify the location name.

  - `networks: optional array of object { network }`

    Specify the list of network ranges from which requests at this location originate. The list takes effect only if it is non-empty and the IPv4 endpoint is enabled for this location.

    - `network: string`

      Specify the IPv4 address or IPv4 CIDR. Limit IPv4 CIDRs to a maximum of /24.

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/locations/$LOCATION_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Austin Office Location",
          "dns_destination_ips_id": "0e4a32c6-6fb8-4858-9296-98f51631e8e6"
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
    "id": "ed35569b41ce4d1facfe683550f54086",
    "client_default": false,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "dns_destination_ips_id": "0e4a32c6-6fb8-4858-9296-98f51631e8e6",
    "dns_destination_ipv6_block_id": "b08f7231-d458-495c-98ef-190604c9ee83",
    "doh_subdomain": "oli3n9zkz5",
    "ecs_support": false,
    "endpoints": {
      "doh": {
        "enabled": true,
        "networks": [
          {
            "network": "2001:85a3::/64"
          }
        ],
        "require_token": true
      },
      "dot": {
        "enabled": true,
        "networks": [
          {
            "network": "2001:85a3::/64"
          }
        ]
      },
      "ipv4": {
        "enabled": true
      },
      "ipv6": {
        "enabled": true,
        "networks": [
          {
            "network": "2001:85a3::/64"
          }
        ]
      }
    },
    "ip": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
    "ipv4_destination": "172.64.36.1",
    "ipv4_destination_backup": "172.64.36.2",
    "max_ttl": {
      "mode": "override",
      "ttl_secs": 3600
    },
    "name": "Austin Office Location",
    "networks": [
      {
        "network": "192.0.2.1/32"
      }
    ],
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```
