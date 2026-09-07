# WARP Connector

## List Warp Connector Tunnels

**get** `/accounts/{account_id}/warp_connector`

Lists and filters Warp Connector Tunnels in an account.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

### Query Parameters

- `exclude_prefix: optional string`

- `existed_at: optional string`

  If provided, include only resources that were created (and not deleted) before this time. URL encoded.

- `include_prefix: optional string`

- `is_deleted: optional boolean`

  If `true`, only include deleted tunnels. If `false`, exclude deleted tunnels. If empty, all tunnels will be included.

- `name: optional string`

  A user-friendly name for the tunnel.

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of results to display.

- `status: optional "inactive" or "degraded" or "healthy" or "down"`

  The status of the tunnel. Valid values are `inactive` (tunnel has never been run), `degraded` (tunnel is active and able to serve traffic but in an unhealthy state), `healthy` (tunnel is active and able to serve traffic), or `down` (tunnel can not serve traffic as it has no connections to the Cloudflare Edge).

  - `"inactive"`

  - `"degraded"`

  - `"healthy"`

  - `"down"`

- `uuid: optional string`

  UUID of the tunnel.

- `was_active_at: optional string`

- `was_inactive_at: optional string`

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

- `result: array of object { id, account_tag, connections, 8 more }`

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

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/warp_connector \
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

## Create a Warp Connector Tunnel

**post** `/accounts/{account_id}/warp_connector`

Creates a new Warp Connector Tunnel in an account.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

### Body Parameters

- `name: string`

  A user-friendly name for a tunnel.

- `ha: optional boolean`

  Indicates that the tunnel will be created to be highly available. If omitted, defaults to false.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/warp_connector \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "blog"
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

## Update a Warp Connector Tunnel

**patch** `/accounts/{account_id}/warp_connector/{tunnel_id}`

Updates an existing Warp Connector Tunnel.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

- `tunnel_id: string`

  UUID of the tunnel.

### Body Parameters

- `name: optional string`

  A user-friendly name for a tunnel.

- `tunnel_secret: optional string`

  Sets the password required to run a locally-managed tunnel. Must be at least 32 bytes and encoded as a base64 string.

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
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "blog",
          "tunnel_secret": "AQIDBAUGBwgBAgMEBQYHCAECAwQFBgcIAQIDBAUGBwg="
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

## Delete a Warp Connector Tunnel

**delete** `/accounts/{account_id}/warp_connector/{tunnel_id}`

Deletes a Warp Connector Tunnel from an account.

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

## Domain Types

### WARP Connector List Response

- `WARPConnectorListResponse object { id, account_tag, connections, 8 more }`

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

### WARP Connector Get Response

- `WARPConnectorGetResponse object { id, account_tag, connections, 8 more }`

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

### WARP Connector Create Response

- `WARPConnectorCreateResponse object { id, account_tag, connections, 8 more }`

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

### WARP Connector Edit Response

- `WARPConnectorEditResponse object { id, account_tag, connections, 8 more }`

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

### WARP Connector Delete Response

- `WARPConnectorDeleteResponse object { id, account_tag, connections, 8 more }`

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

# Token

## Get a Warp Connector Tunnel token

**get** `/accounts/{account_id}/warp_connector/{tunnel_id}/token`

Gets the token used to associate warp device with a specific Warp Connector tunnel.

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

- `result: string`

  The Tunnel Token is used as a mechanism to authenticate the operation of a tunnel.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/warp_connector/$TUNNEL_ID/token \
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
  "result": "eyJhIjoiNWFiNGU5Z...",
  "success": true
}
```

## Domain Types

### Token Get Response

- `TokenGetResponse = string`

  The Tunnel Token is used as a mechanism to authenticate the operation of a tunnel.

# Connections

## List WARP Connector Tunnel connections

**get** `/accounts/{account_id}/warp_connector/{tunnel_id}/connections`

Fetches connection details for a WARP Connector Tunnel.

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

- `result: array of object { id, arch, conns, 4 more }`

  - `id: optional string`

    UUID of the Cloudflare Tunnel connector.

  - `arch: optional string`

    The cloudflared OS architecture used to establish this connection.

  - `conns: optional array of object { id, client_id, client_version, 3 more }`

    The WARP Connector Tunnel connections between your origin and Cloudflare's edge.

    - `id: optional string`

      UUID of the Cloudflare Tunnel connection.

    - `client_id: optional string`

      UUID of the Cloudflare Tunnel connector.

    - `client_version: optional string`

      The cloudflared version used to establish this connection.

    - `colo_name: optional string`

      The Cloudflare data center used for this connection.

    - `opened_at: optional string`

      Timestamp of when the connection was established.

    - `origin_ip: optional string`

      The public IP address of the host running WARP Connector.

  - `features: optional array of string`

    Features enabled for the Cloudflare Tunnel.

  - `ha_status: optional "offline" or "passive" or "active"`

    The HA status of a WARP Connector client.

    - `"offline"`

    - `"passive"`

    - `"active"`

  - `run_at: optional string`

    Timestamp of when the tunnel connection was started.

  - `version: optional string`

    The cloudflared version used to establish this connection.

- `success: true`

  Whether the API call was successful

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/warp_connector/$TUNNEL_ID/connections \
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
      "id": "1bedc50d-42b3-473c-b108-ff3d10c0d925",
      "arch": "linux_amd64",
      "conns": [
        {
          "id": "1bedc50d-42b3-473c-b108-ff3d10c0d925",
          "client_id": "1bedc50d-42b3-473c-b108-ff3d10c0d925",
          "client_version": "2022.7.1",
          "colo_name": "DFW",
          "opened_at": "2021-01-25T18:22:34.317854Z",
          "origin_ip": "10.1.0.137"
        }
      ],
      "features": [
        "ha-origin"
      ],
      "ha_status": "offline",
      "run_at": "2009-11-10T23:00:00Z",
      "version": "2022.7.1"
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

## Domain Types

### Connection Get Response

- `ConnectionGetResponse object { id, arch, conns, 4 more }`

  A WARP Connector client that maintains a connection to a Cloudflare data center.

  - `id: optional string`

    UUID of the Cloudflare Tunnel connector.

  - `arch: optional string`

    The cloudflared OS architecture used to establish this connection.

  - `conns: optional array of object { id, client_id, client_version, 3 more }`

    The WARP Connector Tunnel connections between your origin and Cloudflare's edge.

    - `id: optional string`

      UUID of the Cloudflare Tunnel connection.

    - `client_id: optional string`

      UUID of the Cloudflare Tunnel connector.

    - `client_version: optional string`

      The cloudflared version used to establish this connection.

    - `colo_name: optional string`

      The Cloudflare data center used for this connection.

    - `opened_at: optional string`

      Timestamp of when the connection was established.

    - `origin_ip: optional string`

      The public IP address of the host running WARP Connector.

  - `features: optional array of string`

    Features enabled for the Cloudflare Tunnel.

  - `ha_status: optional "offline" or "passive" or "active"`

    The HA status of a WARP Connector client.

    - `"offline"`

    - `"passive"`

    - `"active"`

  - `run_at: optional string`

    Timestamp of when the tunnel connection was started.

  - `version: optional string`

    The cloudflared version used to establish this connection.

# Connectors

## Get WARP Connector Tunnel connector

**get** `/accounts/{account_id}/warp_connector/{tunnel_id}/connectors/{connector_id}`

Fetches connector and connection details for a WARP Connector Tunnel.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

- `tunnel_id: string`

  UUID of the tunnel.

- `connector_id: string`

  UUID of the Cloudflare Tunnel connector.

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

- `result: object { id, arch, conns, 4 more }`

  A WARP Connector client that maintains a connection to a Cloudflare data center.

  - `id: optional string`

    UUID of the Cloudflare Tunnel connector.

  - `arch: optional string`

    The cloudflared OS architecture used to establish this connection.

  - `conns: optional array of object { id, client_id, client_version, 3 more }`

    The WARP Connector Tunnel connections between your origin and Cloudflare's edge.

    - `id: optional string`

      UUID of the Cloudflare Tunnel connection.

    - `client_id: optional string`

      UUID of the Cloudflare Tunnel connector.

    - `client_version: optional string`

      The cloudflared version used to establish this connection.

    - `colo_name: optional string`

      The Cloudflare data center used for this connection.

    - `opened_at: optional string`

      Timestamp of when the connection was established.

    - `origin_ip: optional string`

      The public IP address of the host running WARP Connector.

  - `features: optional array of string`

    Features enabled for the Cloudflare Tunnel.

  - `ha_status: optional "offline" or "passive" or "active"`

    The HA status of a WARP Connector client.

    - `"offline"`

    - `"passive"`

    - `"active"`

  - `run_at: optional string`

    Timestamp of when the tunnel connection was started.

  - `version: optional string`

    The cloudflared version used to establish this connection.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/warp_connector/$TUNNEL_ID/connectors/$CONNECTOR_ID \
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
    "id": "1bedc50d-42b3-473c-b108-ff3d10c0d925",
    "arch": "linux_amd64",
    "conns": [
      {
        "id": "1bedc50d-42b3-473c-b108-ff3d10c0d925",
        "client_id": "1bedc50d-42b3-473c-b108-ff3d10c0d925",
        "client_version": "2022.7.1",
        "colo_name": "DFW",
        "opened_at": "2021-01-25T18:22:34.317854Z",
        "origin_ip": "10.1.0.137"
      }
    ],
    "features": [
      "ha-origin"
    ],
    "ha_status": "offline",
    "run_at": "2009-11-10T23:00:00Z",
    "version": "2022.7.1"
  },
  "success": true
}
```

## Domain Types

### Connector Get Response

- `ConnectorGetResponse object { id, arch, conns, 4 more }`

  A WARP Connector client that maintains a connection to a Cloudflare data center.

  - `id: optional string`

    UUID of the Cloudflare Tunnel connector.

  - `arch: optional string`

    The cloudflared OS architecture used to establish this connection.

  - `conns: optional array of object { id, client_id, client_version, 3 more }`

    The WARP Connector Tunnel connections between your origin and Cloudflare's edge.

    - `id: optional string`

      UUID of the Cloudflare Tunnel connection.

    - `client_id: optional string`

      UUID of the Cloudflare Tunnel connector.

    - `client_version: optional string`

      The cloudflared version used to establish this connection.

    - `colo_name: optional string`

      The Cloudflare data center used for this connection.

    - `opened_at: optional string`

      Timestamp of when the connection was established.

    - `origin_ip: optional string`

      The public IP address of the host running WARP Connector.

  - `features: optional array of string`

    Features enabled for the Cloudflare Tunnel.

  - `ha_status: optional "offline" or "passive" or "active"`

    The HA status of a WARP Connector client.

    - `"offline"`

    - `"passive"`

    - `"active"`

  - `run_at: optional string`

    Timestamp of when the tunnel connection was started.

  - `version: optional string`

    The cloudflared version used to establish this connection.

# Failover

## Trigger a manual failover for a WARP Connector Tunnel

**put** `/accounts/{account_id}/warp_connector/{tunnel_id}/failover`

Triggers a manual failover for a specific WARP Connector Tunnel, setting the specified client as the active connector. The tunnel must be configured for high availability (HA) and the client must be linked to the tunnel.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

- `tunnel_id: string`

  UUID of the tunnel.

### Body Parameters

- `client_id: string`

  UUID of the Cloudflare Tunnel connector.

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

- `result: unknown`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/warp_connector/$TUNNEL_ID/failover \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "client_id": "1bedc50d-42b3-473c-b108-ff3d10c0d925"
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
  "result": {},
  "success": true
}
```

## Domain Types

### Failover Update Response

- `FailoverUpdateResponse = unknown`

# Configurations

## Get WARP Connector HA configuration

**get** `/accounts/{account_id}/warp_connector/{tunnel_id}/configurations`

Gets the high-availability configuration for a WARP Connector tunnel.

### Path Parameters

- `account_id: string`

  Identifier.

- `tunnel_id: string`

  UUID of the tunnel.

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

## Domain Types

### Configuration Get Response

- `ConfigurationGetResponse object { configuration_version, created_at, ha_mode, 3 more }`

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

### Configuration Update Response

- `ConfigurationUpdateResponse object { configuration_version, created_at, ha_mode, 3 more }`

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
