## Address Map Details

**get** `/accounts/{account_id}/addressing/address_maps/{address_map_id}`

Show a particular address map owned by the account.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `address_map_id: string`

  Identifier of an Address Map.

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

- `result: optional object { id, can_delete, can_modify_ips, 7 more }`

  - `id: optional string`

    Identifier of an Address Map.

  - `can_delete: optional boolean`

    If set to false, then the Address Map cannot be deleted via API. This is true for Cloudflare-managed maps.

  - `can_modify_ips: optional boolean`

    If set to false, then the IPs on the Address Map cannot be modified via the API. This is true for Cloudflare-managed maps.

  - `created_at: optional string`

  - `default_sni: optional string`

    If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudflare receives a TLS handshake from a client without an SNI, it will respond with the default SNI on those IPs. The default SNI can be any valid zone or subdomain owned by the account.

  - `description: optional string`

    An optional description field which may be used to describe the types of IPs or zones on the map.

  - `enabled: optional boolean`

    Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled.

  - `ips: optional IPs`

    The set of IPs on the Address Map.

    - `created_at: optional string`

    - `ip: optional string`

      An IPv4 or IPv6 address.

  - `memberships: optional array of object { can_delete, created_at, identifier, kind }`

    Zones and Accounts which will be assigned IPs on this Address Map. A zone membership will take priority over an account membership.

    - `can_delete: optional boolean`

      Controls whether the membership can be deleted via the API or not.

    - `created_at: optional string`

    - `identifier: optional string`

      The identifier for the membership (eg. a zone or account tag).

    - `kind: optional Kind`

      The type of the membership.

      - `"zone"`

      - `"account"`

  - `modified_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/address_maps/$ADDRESS_MAP_ID \
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
    "id": "055817b111884e0227e1be16a0be6ee0",
    "can_delete": true,
    "can_modify_ips": true,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "default_sni": "*.example.com",
    "description": "My Ecommerce zones",
    "enabled": true,
    "ips": [
      {
        "created_at": "2014-01-01T05:20:00.12345Z",
        "ip": "192.0.2.1"
      }
    ],
    "memberships": [
      {
        "can_delete": true,
        "created_at": "2014-01-01T05:20:00.12345Z",
        "identifier": "023e105f4ecef8ad9ca31a8372d0c353",
        "kind": "zone"
      }
    ],
    "modified_at": "2014-01-01T05:20:00.12345Z"
  }
}
```
