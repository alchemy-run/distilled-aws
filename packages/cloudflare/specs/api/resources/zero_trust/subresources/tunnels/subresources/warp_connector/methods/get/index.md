## Get a Warp Connector Tunnel

**get** `/accounts/{account_id}/warp_connector/{tunnel_id}`

Fetches a single Warp Connector Tunnel.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

- `tunnel_id: string`

  UUID of the tunnel.

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

- `result: object { id, account_tag, connections, 8 more }`

  A Warp Connector Tunnel that connects your origin to Cloudflare's edge.

  - `id: optional string`

    UUID of the tunnel.

  - `account_tag: optional string`

    Cloudflare account ID

  - `connections: optional array of object { id, client_id, client_version, 5 more }`

    The Cloudflare Tunnel connections between your origin and Cloudflare's edge.

    - `id: optional string`

      UUID of the Cloudflare Tunnel connection.

    - `client_id: optional string`

      UUID of the Cloudflare Tunnel connector.

    - `client_version: optional string`

      The cloudflared version used to establish this connection.

    - `colo_name: optional string`

      The Cloudflare data center used for this connection.

    - `is_pending_reconnect: optional boolean`

      Cloudflare continues to track connections for several minutes after they disconnect. This is an optimization to improve latency and reliability of reconnecting.  If `true`, the connection has disconnected but is still being tracked. If `false`, the connection is actively serving traffic.

    - `opened_at: optional string`

      Timestamp of when the connection was established.

    - `origin_ip: optional string`

      The public IP address of the host running cloudflared.

    - `uuid: optional string`

      UUID of the Cloudflare Tunnel connection.

  - `conns_active_at: optional string`

    Timestamp of when the tunnel established at least one connection to Cloudflare's edge. If `null`, the tunnel is inactive.

  - `conns_inactive_at: optional string`

    Timestamp of when the tunnel became inactive (no connections to Cloudflare's edge). If `null`, the tunnel is active.

  - `created_at: optional string`

    Timestamp of when the resource was created.

  - `deleted_at: optional string`

    Timestamp of when the resource was deleted. If `null`, the resource has not been deleted.

  - `metadata: optional unknown`

    Metadata associated with the tunnel.

  - `name: optional string`

    A user-friendly name for a tunnel.

  - `status: optional "inactive" or "degraded" or "healthy" or "down"`

    The status of the tunnel. Valid values are `inactive` (tunnel has never been run), `degraded` (tunnel is active and able to serve traffic but in an unhealthy state), `healthy` (tunnel is active and able to serve traffic), or `down` (tunnel can not serve traffic as it has no connections to the Cloudflare Edge).

    - `"inactive"`

    - `"degraded"`

    - `"healthy"`

    - `"down"`

  - `tun_type: optional "cfd_tunnel" or "warp_connector" or "warp" or 4 more`

    The type of tunnel.

    - `"cfd_tunnel"`

    - `"warp_connector"`

    - `"warp"`

    - `"magic"`

    - `"ip_sec"`

    - `"gre"`

    - `"cni"`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/warp_connector/$TUNNEL_ID \
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
    "account_tag": "699d98642c564d2e855e9661899b7252",
    "connections": [
      {
        "id": "1bedc50d-42b3-473c-b108-ff3d10c0d925",
        "client_id": "1bedc50d-42b3-473c-b108-ff3d10c0d925",
        "client_version": "2022.7.1",
        "colo_name": "DFW",
        "is_pending_reconnect": false,
        "opened_at": "2021-01-25T18:22:34.317854Z",
        "origin_ip": "10.1.0.137",
        "uuid": "1bedc50d-42b3-473c-b108-ff3d10c0d925"
      }
    ],
    "conns_active_at": "2009-11-10T23:00:00Z",
    "conns_inactive_at": "2009-11-10T23:00:00Z",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "deleted_at": "2009-11-10T23:00:00.000000Z",
    "metadata": {},
    "name": "blog",
    "status": "healthy",
    "tun_type": "cfd_tunnel"
  },
  "success": true
}
```
