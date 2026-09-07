## Get hostname route

**get** `/accounts/{account_id}/zerotrust/routes/hostname/{hostname_route_id}`

Get a hostname route.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

- `hostname_route_id: string`

  The hostname route ID.

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

- `result: HostnameRoute`

  - `id: optional string`

    The hostname route ID.

  - `comment: optional string`

    An optional description of the hostname route.

  - `created_at: optional string`

    Timestamp of when the resource was created.

  - `deleted_at: optional string`

    Timestamp of when the resource was deleted. If `null`, the resource has not been deleted.

  - `hostname: optional string`

    The hostname of the route.

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

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zerotrust/routes/hostname/$HOSTNAME_ROUTE_ID \
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
    "comment": "example comment",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "deleted_at": "2009-11-10T23:00:00.000000Z",
    "hostname": "office-1.local",
    "tun_type": "cfd_tunnel",
    "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "tunnel_name": "api-tunnel"
  },
  "success": true
}
```
