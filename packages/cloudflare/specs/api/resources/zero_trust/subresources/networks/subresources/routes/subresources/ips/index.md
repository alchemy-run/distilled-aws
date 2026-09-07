# IPs

## Get tunnel route by IP

**get** `/accounts/{account_id}/teamnet/routes/ip/{ip}`

Fetches routes that contain the given IP address.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

- `ip: string`

### Query Parameters

- `default_virtual_network_fallback: optional boolean`

  When the virtual_network_id parameter is not provided the request filter will default search routes that are in the default virtual network for the account. If this parameter is set to false, the search will include routes that do not have a virtual network.

- `virtual_network_id: optional string`

  UUID of the virtual network.

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

- `result: Teamnet`

  - `id: optional string`

    UUID of the route.

  - `comment: optional string`

    Optional remark describing the route.

  - `created_at: optional string`

    Timestamp of when the resource was created.

  - `deleted_at: optional string`

    Timestamp of when the resource was deleted. If `null`, the resource has not been deleted.

  - `network: optional string`

    The private IPv4 or IPv6 range connected by the route, in CIDR notation.

  - `tun_type: optional "cfd_tunnel" or "warp_connector" or "warp" or 4 more`

    The type of tunnel.

    - `"cfd_tunnel"`

    - `"warp_connector"`

    - `"warp"`

    - `"magic"`

    - `"ip_sec"`

    - `"gre"`

    - `"cni"`

  - `tunnel_id: optional string`

    UUID of the tunnel.

  - `tunnel_name: optional string`

    A user-friendly name for a tunnel.

  - `virtual_network_id: optional string`

    UUID of the virtual network.

  - `virtual_network_name: optional string`

    A user-friendly name for the virtual network.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/routes/ip/$IP \
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
    "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "comment": "Example comment for this route.",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "deleted_at": "2009-11-10T23:00:00.000000Z",
    "network": "172.16.0.0/16",
    "tun_type": "cfd_tunnel",
    "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "tunnel_name": "blog",
    "virtual_network_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "virtual_network_name": "us-east-1-vpc"
  },
  "success": true
}
```
