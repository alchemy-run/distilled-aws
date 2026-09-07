# Tunnels

## List All Tunnels

**get** `/accounts/{account_id}/tunnels`

Lists and filters all types of Tunnels in an account.

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

- `tun_types: optional array of "cfd_tunnel" or "warp_connector" or "warp" or 4 more`

  The types of tunnels to filter by, separated by commas.

  - `"cfd_tunnel"`

  - `"warp_connector"`

  - `"warp"`

  - `"magic"`

  - `"ip_sec"`

  - `"gre"`

  - `"cni"`

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

- `result: array of CloudflareTunnel or object { id, account_tag, connections, 8 more }`

  - `CloudflareTunnel object { id, account_tag, config_src, 10 more }`

    A Cloudflare Tunnel that connects your origin to Cloudflare's edge.

    - `id: optional string`

      UUID of the tunnel.

    - `account_tag: optional string`

      Cloudflare account ID

    - `config_src: optional "local" or "cloudflare"`

      Indicates if this is a locally or remotely configured tunnel. If `local`, manage the tunnel using a YAML file on the origin machine. If `cloudflare`, manage the tunnel on the Zero Trust dashboard.

      - `"local"`

      - `"cloudflare"`

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

    - `remote_config: optional boolean`

      If `true`, the tunnel can be configured remotely from the Zero Trust dashboard. If `false`, the tunnel must be configured locally on the origin machine.

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

  - `TunnelWARPConnectorTunnel object { id, account_tag, connections, 8 more }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tunnels \
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
      "config_src": "cloudflare",
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
      "remote_config": true,
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

## Domain Types

### Connection

- `Connection object { colo_name, is_pending_reconnect, uuid }`

  - `colo_name: optional string`

    The Cloudflare data center used for this connection.

  - `is_pending_reconnect: optional boolean`

    Cloudflare continues to track connections for several minutes after they disconnect. This is an optimization to improve latency and reliability of reconnecting.  If `true`, the connection has disconnected but is still being tracked. If `false`, the connection is actively serving traffic.

  - `uuid: optional string`

    UUID of the Cloudflare Tunnel connection.

### Tunnel List Response

- `TunnelListResponse = CloudflareTunnel or object { id, account_tag, connections, 8 more }`

  A Cloudflare Tunnel that connects your origin to Cloudflare's edge.

  - `CloudflareTunnel object { id, account_tag, config_src, 10 more }`

    A Cloudflare Tunnel that connects your origin to Cloudflare's edge.

    - `id: optional string`

      UUID of the tunnel.

    - `account_tag: optional string`

      Cloudflare account ID

    - `config_src: optional "local" or "cloudflare"`

      Indicates if this is a locally or remotely configured tunnel. If `local`, manage the tunnel using a YAML file on the origin machine. If `cloudflare`, manage the tunnel on the Zero Trust dashboard.

      - `"local"`

      - `"cloudflare"`

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

    - `remote_config: optional boolean`

      If `true`, the tunnel can be configured remotely from the Zero Trust dashboard. If `false`, the tunnel must be configured locally on the origin machine.

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

  - `TunnelWARPConnectorTunnel object { id, account_tag, connections, 8 more }`

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

# Cloudflared

## List Cloudflare Tunnels

**get** `/accounts/{account_id}/cfd_tunnel`

Lists and filters Cloudflare Tunnels in an account.

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

  A user-friendly name for a tunnel.

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

- `result: array of CloudflareTunnel`

  - `id: optional string`

    UUID of the tunnel.

  - `account_tag: optional string`

    Cloudflare account ID

  - `config_src: optional "local" or "cloudflare"`

    Indicates if this is a locally or remotely configured tunnel. If `local`, manage the tunnel using a YAML file on the origin machine. If `cloudflare`, manage the tunnel on the Zero Trust dashboard.

    - `"local"`

    - `"cloudflare"`

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

  - `remote_config: optional boolean`

    If `true`, the tunnel can be configured remotely from the Zero Trust dashboard. If `false`, the tunnel must be configured locally on the origin machine.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel \
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
      "config_src": "cloudflare",
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
      "remote_config": true,
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

## Get a Cloudflare Tunnel

**get** `/accounts/{account_id}/cfd_tunnel/{tunnel_id}`

Fetches a single Cloudflare Tunnel.

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

- `result: CloudflareTunnel`

  A Cloudflare Tunnel that connects your origin to Cloudflare's edge.

  - `id: optional string`

    UUID of the tunnel.

  - `account_tag: optional string`

    Cloudflare account ID

  - `config_src: optional "local" or "cloudflare"`

    Indicates if this is a locally or remotely configured tunnel. If `local`, manage the tunnel using a YAML file on the origin machine. If `cloudflare`, manage the tunnel on the Zero Trust dashboard.

    - `"local"`

    - `"cloudflare"`

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

  - `remote_config: optional boolean`

    If `true`, the tunnel can be configured remotely from the Zero Trust dashboard. If `false`, the tunnel must be configured locally on the origin machine.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID \
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
    "config_src": "cloudflare",
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
    "remote_config": true,
    "status": "healthy",
    "tun_type": "cfd_tunnel"
  },
  "success": true
}
```

## Create a Cloudflare Tunnel

**post** `/accounts/{account_id}/cfd_tunnel`

Creates a new Cloudflare Tunnel in an account.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

### Body Parameters

- `name: string`

  A user-friendly name for a tunnel.

- `config_src: optional "local" or "cloudflare"`

  Indicates if this is a locally or remotely configured tunnel. If `local`, manage the tunnel using a YAML file on the origin machine. If `cloudflare`, manage the tunnel on the Zero Trust dashboard.

  - `"local"`

  - `"cloudflare"`

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

- `result: CloudflareTunnel`

  A Cloudflare Tunnel that connects your origin to Cloudflare's edge.

  - `id: optional string`

    UUID of the tunnel.

  - `account_tag: optional string`

    Cloudflare account ID

  - `config_src: optional "local" or "cloudflare"`

    Indicates if this is a locally or remotely configured tunnel. If `local`, manage the tunnel using a YAML file on the origin machine. If `cloudflare`, manage the tunnel on the Zero Trust dashboard.

    - `"local"`

    - `"cloudflare"`

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

  - `remote_config: optional boolean`

    If `true`, the tunnel can be configured remotely from the Zero Trust dashboard. If `false`, the tunnel must be configured locally on the origin machine.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "blog",
          "config_src": "cloudflare",
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
    "config_src": "cloudflare",
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
    "remote_config": true,
    "status": "healthy",
    "tun_type": "cfd_tunnel"
  },
  "success": true
}
```

## Update a Cloudflare Tunnel

**patch** `/accounts/{account_id}/cfd_tunnel/{tunnel_id}`

Updates an existing Cloudflare Tunnel.

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

- `result: CloudflareTunnel`

  A Cloudflare Tunnel that connects your origin to Cloudflare's edge.

  - `id: optional string`

    UUID of the tunnel.

  - `account_tag: optional string`

    Cloudflare account ID

  - `config_src: optional "local" or "cloudflare"`

    Indicates if this is a locally or remotely configured tunnel. If `local`, manage the tunnel using a YAML file on the origin machine. If `cloudflare`, manage the tunnel on the Zero Trust dashboard.

    - `"local"`

    - `"cloudflare"`

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

  - `remote_config: optional boolean`

    If `true`, the tunnel can be configured remotely from the Zero Trust dashboard. If `false`, the tunnel must be configured locally on the origin machine.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID \
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
    "config_src": "cloudflare",
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
    "remote_config": true,
    "status": "healthy",
    "tun_type": "cfd_tunnel"
  },
  "success": true
}
```

## Delete a Cloudflare Tunnel

**delete** `/accounts/{account_id}/cfd_tunnel/{tunnel_id}`

Deletes a Cloudflare Tunnel from an account.

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

- `result: CloudflareTunnel`

  A Cloudflare Tunnel that connects your origin to Cloudflare's edge.

  - `id: optional string`

    UUID of the tunnel.

  - `account_tag: optional string`

    Cloudflare account ID

  - `config_src: optional "local" or "cloudflare"`

    Indicates if this is a locally or remotely configured tunnel. If `local`, manage the tunnel using a YAML file on the origin machine. If `cloudflare`, manage the tunnel on the Zero Trust dashboard.

    - `"local"`

    - `"cloudflare"`

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

  - `remote_config: optional boolean`

    If `true`, the tunnel can be configured remotely from the Zero Trust dashboard. If `false`, the tunnel must be configured locally on the origin machine.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID \
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
    "config_src": "cloudflare",
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
    "remote_config": true,
    "status": "healthy",
    "tun_type": "cfd_tunnel"
  },
  "success": true
}
```

# Configurations

## Get configuration

**get** `/accounts/{account_id}/cfd_tunnel/{tunnel_id}/configurations`

Gets the configuration for a remotely-managed tunnel

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

- `result: optional object { account_id, config, created_at, 3 more }`

  Cloudflare Tunnel configuration

  - `account_id: optional string`

    Identifier.

  - `config: optional object { ingress, originRequest }`

    The tunnel configuration and ingress rules.

    - `ingress: optional array of object { hostname, service, originRequest, path }`

      List of public hostname definitions. At least one ingress rule needs to be defined for the tunnel.

      - `hostname: string`

        Public hostname for this service.

      - `service: string`

        Protocol and address of destination server. Supported protocols: http://, https://, unix://, tcp://, ssh://, rdp://, unix+tls://, smb://. Alternatively can return a HTTP status code http_status:[code] e.g. 'http_status:404'.

      - `originRequest: optional object { access, caPool, connectTimeout, 12 more }`

        Configuration parameters for the public hostname specific connection settings between cloudflared and origin server.

        - `access: optional object { audTag, teamName, required }`

          For all L7 requests to this hostname, cloudflared will validate each request's Cf-Access-Jwt-Assertion request header.

          - `audTag: array of string`

            Access applications that are allowed to reach this hostname for this Tunnel. Audience tags can be identified in the dashboard or via the List Access policies API.

          - `teamName: string`

          - `required: optional boolean`

            Deny traffic that has not fulfilled Access authorization.

        - `caPool: optional string`

          Path to the certificate authority (CA) for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.

        - `connectTimeout: optional number`

          Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to establish TLS, which is controlled by tlsTimeout.

        - `disableChunkedEncoding: optional boolean`

          Disables chunked transfer encoding. Useful if you are running a WSGI server.

        - `http2Origin: optional boolean`

          Attempt to connect to origin using HTTP2. Origin must be configured as https.

        - `httpHostHeader: optional string`

          Sets the HTTP Host header on requests sent to the local service.

        - `keepAliveConnections: optional number`

          Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

        - `keepAliveTimeout: optional number`

          Timeout after which an idle keepalive connection can be discarded.

        - `matchSNItoHost: optional boolean`

          Auto configure the Hostname on the origin server certificate.

        - `noHappyEyeballs: optional boolean`

          Disable the “happy eyeballs” algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

        - `noTLSVerify: optional boolean`

          Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.

        - `originServerName: optional string`

          Hostname that cloudflared should expect from your origin server certificate.

        - `proxyType: optional string`

          cloudflared starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP. This configures what type of proxy will be started. Valid options are: "" for the regular proxy and "socks" for a SOCKS5 proxy.

        - `tcpKeepAlive: optional number`

          The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

        - `tlsTimeout: optional number`

          Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

      - `path: optional string`

        Requests with this path route to this public hostname.

    - `originRequest: optional object { access, caPool, connectTimeout, 12 more }`

      Configuration parameters for the public hostname specific connection settings between cloudflared and origin server.

      - `access: optional object { audTag, teamName, required }`

        For all L7 requests to this hostname, cloudflared will validate each request's Cf-Access-Jwt-Assertion request header.

        - `audTag: array of string`

          Access applications that are allowed to reach this hostname for this Tunnel. Audience tags can be identified in the dashboard or via the List Access policies API.

        - `teamName: string`

        - `required: optional boolean`

          Deny traffic that has not fulfilled Access authorization.

      - `caPool: optional string`

        Path to the certificate authority (CA) for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.

      - `connectTimeout: optional number`

        Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to establish TLS, which is controlled by tlsTimeout.

      - `disableChunkedEncoding: optional boolean`

        Disables chunked transfer encoding. Useful if you are running a WSGI server.

      - `http2Origin: optional boolean`

        Attempt to connect to origin using HTTP2. Origin must be configured as https.

      - `httpHostHeader: optional string`

        Sets the HTTP Host header on requests sent to the local service.

      - `keepAliveConnections: optional number`

        Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

      - `keepAliveTimeout: optional number`

        Timeout after which an idle keepalive connection can be discarded.

      - `matchSNItoHost: optional boolean`

        Auto configure the Hostname on the origin server certificate.

      - `noHappyEyeballs: optional boolean`

        Disable the “happy eyeballs” algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

      - `noTLSVerify: optional boolean`

        Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.

      - `originServerName: optional string`

        Hostname that cloudflared should expect from your origin server certificate.

      - `proxyType: optional string`

        cloudflared starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP. This configures what type of proxy will be started. Valid options are: "" for the regular proxy and "socks" for a SOCKS5 proxy.

      - `tcpKeepAlive: optional number`

        The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

      - `tlsTimeout: optional number`

        Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

  - `created_at: optional string`

  - `source: optional "local" or "cloudflare"`

    Indicates if this is a locally or remotely configured tunnel. If `local`, manage the tunnel using a YAML file on the origin machine. If `cloudflare`, manage the tunnel's configuration on the Zero Trust dashboard.

    - `"local"`

    - `"cloudflare"`

  - `tunnel_id: optional string`

    UUID of the tunnel.

  - `version: optional number`

    The version of the Tunnel Configuration.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID/configurations \
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
    "account_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "config": {
      "ingress": [
        {
          "hostname": "tunnel.example.com",
          "service": "https://localhost:8001",
          "originRequest": {
            "access": {
              "audTag": [
                "string"
              ],
              "teamName": "zero-trust-organization-name",
              "required": false
            },
            "caPool": "caPool",
            "connectTimeout": 10,
            "disableChunkedEncoding": true,
            "http2Origin": true,
            "httpHostHeader": "httpHostHeader",
            "keepAliveConnections": 100,
            "keepAliveTimeout": 90,
            "matchSNItoHost": false,
            "noHappyEyeballs": false,
            "noTLSVerify": false,
            "originServerName": "originServerName",
            "proxyType": "proxyType",
            "tcpKeepAlive": 30,
            "tlsTimeout": 10
          },
          "path": "subpath"
        }
      ],
      "originRequest": {
        "access": {
          "audTag": [
            "string"
          ],
          "teamName": "zero-trust-organization-name",
          "required": false
        },
        "caPool": "caPool",
        "connectTimeout": 10,
        "disableChunkedEncoding": true,
        "http2Origin": true,
        "httpHostHeader": "httpHostHeader",
        "keepAliveConnections": 100,
        "keepAliveTimeout": 90,
        "matchSNItoHost": false,
        "noHappyEyeballs": false,
        "noTLSVerify": false,
        "originServerName": "originServerName",
        "proxyType": "proxyType",
        "tcpKeepAlive": 30,
        "tlsTimeout": 10
      },
      "warp-routing": {
        "enabled": true
      }
    },
    "created_at": "2014-01-01T05:20:00.12345Z",
    "source": "cloudflare",
    "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "version": 0
  }
}
```

## Put configuration

**put** `/accounts/{account_id}/cfd_tunnel/{tunnel_id}/configurations`

Adds or updates the configuration for a remotely-managed tunnel.

### Path Parameters

- `account_id: string`

  Identifier.

- `tunnel_id: string`

  UUID of the tunnel.

### Body Parameters

- `config: optional object { ingress, originRequest }`

  The tunnel configuration and ingress rules.

  - `ingress: optional array of object { hostname, service, originRequest, path }`

    List of public hostname definitions. At least one ingress rule needs to be defined for the tunnel.

    - `hostname: string`

      Public hostname for this service.

    - `service: string`

      Protocol and address of destination server. Supported protocols: http://, https://, unix://, tcp://, ssh://, rdp://, unix+tls://, smb://. Alternatively can return a HTTP status code http_status:[code] e.g. 'http_status:404'.

    - `originRequest: optional object { access, caPool, connectTimeout, 12 more }`

      Configuration parameters for the public hostname specific connection settings between cloudflared and origin server.

      - `access: optional object { audTag, teamName, required }`

        For all L7 requests to this hostname, cloudflared will validate each request's Cf-Access-Jwt-Assertion request header.

        - `audTag: array of string`

          Access applications that are allowed to reach this hostname for this Tunnel. Audience tags can be identified in the dashboard or via the List Access policies API.

        - `teamName: string`

        - `required: optional boolean`

          Deny traffic that has not fulfilled Access authorization.

      - `caPool: optional string`

        Path to the certificate authority (CA) for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.

      - `connectTimeout: optional number`

        Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to establish TLS, which is controlled by tlsTimeout.

      - `disableChunkedEncoding: optional boolean`

        Disables chunked transfer encoding. Useful if you are running a WSGI server.

      - `http2Origin: optional boolean`

        Attempt to connect to origin using HTTP2. Origin must be configured as https.

      - `httpHostHeader: optional string`

        Sets the HTTP Host header on requests sent to the local service.

      - `keepAliveConnections: optional number`

        Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

      - `keepAliveTimeout: optional number`

        Timeout after which an idle keepalive connection can be discarded.

      - `matchSNItoHost: optional boolean`

        Auto configure the Hostname on the origin server certificate.

      - `noHappyEyeballs: optional boolean`

        Disable the “happy eyeballs” algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

      - `noTLSVerify: optional boolean`

        Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.

      - `originServerName: optional string`

        Hostname that cloudflared should expect from your origin server certificate.

      - `proxyType: optional string`

        cloudflared starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP. This configures what type of proxy will be started. Valid options are: "" for the regular proxy and "socks" for a SOCKS5 proxy.

      - `tcpKeepAlive: optional number`

        The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

      - `tlsTimeout: optional number`

        Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

    - `path: optional string`

      Requests with this path route to this public hostname.

  - `originRequest: optional object { access, caPool, connectTimeout, 12 more }`

    Configuration parameters for the public hostname specific connection settings between cloudflared and origin server.

    - `access: optional object { audTag, teamName, required }`

      For all L7 requests to this hostname, cloudflared will validate each request's Cf-Access-Jwt-Assertion request header.

      - `audTag: array of string`

        Access applications that are allowed to reach this hostname for this Tunnel. Audience tags can be identified in the dashboard or via the List Access policies API.

      - `teamName: string`

      - `required: optional boolean`

        Deny traffic that has not fulfilled Access authorization.

    - `caPool: optional string`

      Path to the certificate authority (CA) for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.

    - `connectTimeout: optional number`

      Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to establish TLS, which is controlled by tlsTimeout.

    - `disableChunkedEncoding: optional boolean`

      Disables chunked transfer encoding. Useful if you are running a WSGI server.

    - `http2Origin: optional boolean`

      Attempt to connect to origin using HTTP2. Origin must be configured as https.

    - `httpHostHeader: optional string`

      Sets the HTTP Host header on requests sent to the local service.

    - `keepAliveConnections: optional number`

      Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

    - `keepAliveTimeout: optional number`

      Timeout after which an idle keepalive connection can be discarded.

    - `matchSNItoHost: optional boolean`

      Auto configure the Hostname on the origin server certificate.

    - `noHappyEyeballs: optional boolean`

      Disable the “happy eyeballs” algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

    - `noTLSVerify: optional boolean`

      Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.

    - `originServerName: optional string`

      Hostname that cloudflared should expect from your origin server certificate.

    - `proxyType: optional string`

      cloudflared starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP. This configures what type of proxy will be started. Valid options are: "" for the regular proxy and "socks" for a SOCKS5 proxy.

    - `tcpKeepAlive: optional number`

      The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

    - `tlsTimeout: optional number`

      Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

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

- `result: optional object { account_id, config, created_at, 3 more }`

  Cloudflare Tunnel configuration

  - `account_id: optional string`

    Identifier.

  - `config: optional object { ingress, originRequest }`

    The tunnel configuration and ingress rules.

    - `ingress: optional array of object { hostname, service, originRequest, path }`

      List of public hostname definitions. At least one ingress rule needs to be defined for the tunnel.

      - `hostname: string`

        Public hostname for this service.

      - `service: string`

        Protocol and address of destination server. Supported protocols: http://, https://, unix://, tcp://, ssh://, rdp://, unix+tls://, smb://. Alternatively can return a HTTP status code http_status:[code] e.g. 'http_status:404'.

      - `originRequest: optional object { access, caPool, connectTimeout, 12 more }`

        Configuration parameters for the public hostname specific connection settings between cloudflared and origin server.

        - `access: optional object { audTag, teamName, required }`

          For all L7 requests to this hostname, cloudflared will validate each request's Cf-Access-Jwt-Assertion request header.

          - `audTag: array of string`

            Access applications that are allowed to reach this hostname for this Tunnel. Audience tags can be identified in the dashboard or via the List Access policies API.

          - `teamName: string`

          - `required: optional boolean`

            Deny traffic that has not fulfilled Access authorization.

        - `caPool: optional string`

          Path to the certificate authority (CA) for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.

        - `connectTimeout: optional number`

          Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to establish TLS, which is controlled by tlsTimeout.

        - `disableChunkedEncoding: optional boolean`

          Disables chunked transfer encoding. Useful if you are running a WSGI server.

        - `http2Origin: optional boolean`

          Attempt to connect to origin using HTTP2. Origin must be configured as https.

        - `httpHostHeader: optional string`

          Sets the HTTP Host header on requests sent to the local service.

        - `keepAliveConnections: optional number`

          Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

        - `keepAliveTimeout: optional number`

          Timeout after which an idle keepalive connection can be discarded.

        - `matchSNItoHost: optional boolean`

          Auto configure the Hostname on the origin server certificate.

        - `noHappyEyeballs: optional boolean`

          Disable the “happy eyeballs” algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

        - `noTLSVerify: optional boolean`

          Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.

        - `originServerName: optional string`

          Hostname that cloudflared should expect from your origin server certificate.

        - `proxyType: optional string`

          cloudflared starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP. This configures what type of proxy will be started. Valid options are: "" for the regular proxy and "socks" for a SOCKS5 proxy.

        - `tcpKeepAlive: optional number`

          The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

        - `tlsTimeout: optional number`

          Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

      - `path: optional string`

        Requests with this path route to this public hostname.

    - `originRequest: optional object { access, caPool, connectTimeout, 12 more }`

      Configuration parameters for the public hostname specific connection settings between cloudflared and origin server.

      - `access: optional object { audTag, teamName, required }`

        For all L7 requests to this hostname, cloudflared will validate each request's Cf-Access-Jwt-Assertion request header.

        - `audTag: array of string`

          Access applications that are allowed to reach this hostname for this Tunnel. Audience tags can be identified in the dashboard or via the List Access policies API.

        - `teamName: string`

        - `required: optional boolean`

          Deny traffic that has not fulfilled Access authorization.

      - `caPool: optional string`

        Path to the certificate authority (CA) for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.

      - `connectTimeout: optional number`

        Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to establish TLS, which is controlled by tlsTimeout.

      - `disableChunkedEncoding: optional boolean`

        Disables chunked transfer encoding. Useful if you are running a WSGI server.

      - `http2Origin: optional boolean`

        Attempt to connect to origin using HTTP2. Origin must be configured as https.

      - `httpHostHeader: optional string`

        Sets the HTTP Host header on requests sent to the local service.

      - `keepAliveConnections: optional number`

        Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

      - `keepAliveTimeout: optional number`

        Timeout after which an idle keepalive connection can be discarded.

      - `matchSNItoHost: optional boolean`

        Auto configure the Hostname on the origin server certificate.

      - `noHappyEyeballs: optional boolean`

        Disable the “happy eyeballs” algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

      - `noTLSVerify: optional boolean`

        Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.

      - `originServerName: optional string`

        Hostname that cloudflared should expect from your origin server certificate.

      - `proxyType: optional string`

        cloudflared starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP. This configures what type of proxy will be started. Valid options are: "" for the regular proxy and "socks" for a SOCKS5 proxy.

      - `tcpKeepAlive: optional number`

        The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

      - `tlsTimeout: optional number`

        Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

  - `created_at: optional string`

  - `source: optional "local" or "cloudflare"`

    Indicates if this is a locally or remotely configured tunnel. If `local`, manage the tunnel using a YAML file on the origin machine. If `cloudflare`, manage the tunnel's configuration on the Zero Trust dashboard.

    - `"local"`

    - `"cloudflare"`

  - `tunnel_id: optional string`

    UUID of the tunnel.

  - `version: optional number`

    The version of the Tunnel Configuration.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID/configurations \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "account_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "config": {
      "ingress": [
        {
          "hostname": "tunnel.example.com",
          "service": "https://localhost:8001",
          "originRequest": {
            "access": {
              "audTag": [
                "string"
              ],
              "teamName": "zero-trust-organization-name",
              "required": false
            },
            "caPool": "caPool",
            "connectTimeout": 10,
            "disableChunkedEncoding": true,
            "http2Origin": true,
            "httpHostHeader": "httpHostHeader",
            "keepAliveConnections": 100,
            "keepAliveTimeout": 90,
            "matchSNItoHost": false,
            "noHappyEyeballs": false,
            "noTLSVerify": false,
            "originServerName": "originServerName",
            "proxyType": "proxyType",
            "tcpKeepAlive": 30,
            "tlsTimeout": 10
          },
          "path": "subpath"
        }
      ],
      "originRequest": {
        "access": {
          "audTag": [
            "string"
          ],
          "teamName": "zero-trust-organization-name",
          "required": false
        },
        "caPool": "caPool",
        "connectTimeout": 10,
        "disableChunkedEncoding": true,
        "http2Origin": true,
        "httpHostHeader": "httpHostHeader",
        "keepAliveConnections": 100,
        "keepAliveTimeout": 90,
        "matchSNItoHost": false,
        "noHappyEyeballs": false,
        "noTLSVerify": false,
        "originServerName": "originServerName",
        "proxyType": "proxyType",
        "tcpKeepAlive": 30,
        "tlsTimeout": 10
      },
      "warp-routing": {
        "enabled": true
      }
    },
    "created_at": "2014-01-01T05:20:00.12345Z",
    "source": "cloudflare",
    "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "version": 0
  }
}
```

## Domain Types

### Configuration Get Response

- `ConfigurationGetResponse object { account_id, config, created_at, 3 more }`

  Cloudflare Tunnel configuration

  - `account_id: optional string`

    Identifier.

  - `config: optional object { ingress, originRequest }`

    The tunnel configuration and ingress rules.

    - `ingress: optional array of object { hostname, service, originRequest, path }`

      List of public hostname definitions. At least one ingress rule needs to be defined for the tunnel.

      - `hostname: string`

        Public hostname for this service.

      - `service: string`

        Protocol and address of destination server. Supported protocols: http://, https://, unix://, tcp://, ssh://, rdp://, unix+tls://, smb://. Alternatively can return a HTTP status code http_status:[code] e.g. 'http_status:404'.

      - `originRequest: optional object { access, caPool, connectTimeout, 12 more }`

        Configuration parameters for the public hostname specific connection settings between cloudflared and origin server.

        - `access: optional object { audTag, teamName, required }`

          For all L7 requests to this hostname, cloudflared will validate each request's Cf-Access-Jwt-Assertion request header.

          - `audTag: array of string`

            Access applications that are allowed to reach this hostname for this Tunnel. Audience tags can be identified in the dashboard or via the List Access policies API.

          - `teamName: string`

          - `required: optional boolean`

            Deny traffic that has not fulfilled Access authorization.

        - `caPool: optional string`

          Path to the certificate authority (CA) for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.

        - `connectTimeout: optional number`

          Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to establish TLS, which is controlled by tlsTimeout.

        - `disableChunkedEncoding: optional boolean`

          Disables chunked transfer encoding. Useful if you are running a WSGI server.

        - `http2Origin: optional boolean`

          Attempt to connect to origin using HTTP2. Origin must be configured as https.

        - `httpHostHeader: optional string`

          Sets the HTTP Host header on requests sent to the local service.

        - `keepAliveConnections: optional number`

          Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

        - `keepAliveTimeout: optional number`

          Timeout after which an idle keepalive connection can be discarded.

        - `matchSNItoHost: optional boolean`

          Auto configure the Hostname on the origin server certificate.

        - `noHappyEyeballs: optional boolean`

          Disable the “happy eyeballs” algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

        - `noTLSVerify: optional boolean`

          Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.

        - `originServerName: optional string`

          Hostname that cloudflared should expect from your origin server certificate.

        - `proxyType: optional string`

          cloudflared starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP. This configures what type of proxy will be started. Valid options are: "" for the regular proxy and "socks" for a SOCKS5 proxy.

        - `tcpKeepAlive: optional number`

          The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

        - `tlsTimeout: optional number`

          Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

      - `path: optional string`

        Requests with this path route to this public hostname.

    - `originRequest: optional object { access, caPool, connectTimeout, 12 more }`

      Configuration parameters for the public hostname specific connection settings between cloudflared and origin server.

      - `access: optional object { audTag, teamName, required }`

        For all L7 requests to this hostname, cloudflared will validate each request's Cf-Access-Jwt-Assertion request header.

        - `audTag: array of string`

          Access applications that are allowed to reach this hostname for this Tunnel. Audience tags can be identified in the dashboard or via the List Access policies API.

        - `teamName: string`

        - `required: optional boolean`

          Deny traffic that has not fulfilled Access authorization.

      - `caPool: optional string`

        Path to the certificate authority (CA) for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.

      - `connectTimeout: optional number`

        Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to establish TLS, which is controlled by tlsTimeout.

      - `disableChunkedEncoding: optional boolean`

        Disables chunked transfer encoding. Useful if you are running a WSGI server.

      - `http2Origin: optional boolean`

        Attempt to connect to origin using HTTP2. Origin must be configured as https.

      - `httpHostHeader: optional string`

        Sets the HTTP Host header on requests sent to the local service.

      - `keepAliveConnections: optional number`

        Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

      - `keepAliveTimeout: optional number`

        Timeout after which an idle keepalive connection can be discarded.

      - `matchSNItoHost: optional boolean`

        Auto configure the Hostname on the origin server certificate.

      - `noHappyEyeballs: optional boolean`

        Disable the “happy eyeballs” algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

      - `noTLSVerify: optional boolean`

        Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.

      - `originServerName: optional string`

        Hostname that cloudflared should expect from your origin server certificate.

      - `proxyType: optional string`

        cloudflared starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP. This configures what type of proxy will be started. Valid options are: "" for the regular proxy and "socks" for a SOCKS5 proxy.

      - `tcpKeepAlive: optional number`

        The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

      - `tlsTimeout: optional number`

        Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

  - `created_at: optional string`

  - `source: optional "local" or "cloudflare"`

    Indicates if this is a locally or remotely configured tunnel. If `local`, manage the tunnel using a YAML file on the origin machine. If `cloudflare`, manage the tunnel's configuration on the Zero Trust dashboard.

    - `"local"`

    - `"cloudflare"`

  - `tunnel_id: optional string`

    UUID of the tunnel.

  - `version: optional number`

    The version of the Tunnel Configuration.

### Configuration Update Response

- `ConfigurationUpdateResponse object { account_id, config, created_at, 3 more }`

  Cloudflare Tunnel configuration

  - `account_id: optional string`

    Identifier.

  - `config: optional object { ingress, originRequest }`

    The tunnel configuration and ingress rules.

    - `ingress: optional array of object { hostname, service, originRequest, path }`

      List of public hostname definitions. At least one ingress rule needs to be defined for the tunnel.

      - `hostname: string`

        Public hostname for this service.

      - `service: string`

        Protocol and address of destination server. Supported protocols: http://, https://, unix://, tcp://, ssh://, rdp://, unix+tls://, smb://. Alternatively can return a HTTP status code http_status:[code] e.g. 'http_status:404'.

      - `originRequest: optional object { access, caPool, connectTimeout, 12 more }`

        Configuration parameters for the public hostname specific connection settings between cloudflared and origin server.

        - `access: optional object { audTag, teamName, required }`

          For all L7 requests to this hostname, cloudflared will validate each request's Cf-Access-Jwt-Assertion request header.

          - `audTag: array of string`

            Access applications that are allowed to reach this hostname for this Tunnel. Audience tags can be identified in the dashboard or via the List Access policies API.

          - `teamName: string`

          - `required: optional boolean`

            Deny traffic that has not fulfilled Access authorization.

        - `caPool: optional string`

          Path to the certificate authority (CA) for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.

        - `connectTimeout: optional number`

          Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to establish TLS, which is controlled by tlsTimeout.

        - `disableChunkedEncoding: optional boolean`

          Disables chunked transfer encoding. Useful if you are running a WSGI server.

        - `http2Origin: optional boolean`

          Attempt to connect to origin using HTTP2. Origin must be configured as https.

        - `httpHostHeader: optional string`

          Sets the HTTP Host header on requests sent to the local service.

        - `keepAliveConnections: optional number`

          Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

        - `keepAliveTimeout: optional number`

          Timeout after which an idle keepalive connection can be discarded.

        - `matchSNItoHost: optional boolean`

          Auto configure the Hostname on the origin server certificate.

        - `noHappyEyeballs: optional boolean`

          Disable the “happy eyeballs” algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

        - `noTLSVerify: optional boolean`

          Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.

        - `originServerName: optional string`

          Hostname that cloudflared should expect from your origin server certificate.

        - `proxyType: optional string`

          cloudflared starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP. This configures what type of proxy will be started. Valid options are: "" for the regular proxy and "socks" for a SOCKS5 proxy.

        - `tcpKeepAlive: optional number`

          The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

        - `tlsTimeout: optional number`

          Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

      - `path: optional string`

        Requests with this path route to this public hostname.

    - `originRequest: optional object { access, caPool, connectTimeout, 12 more }`

      Configuration parameters for the public hostname specific connection settings between cloudflared and origin server.

      - `access: optional object { audTag, teamName, required }`

        For all L7 requests to this hostname, cloudflared will validate each request's Cf-Access-Jwt-Assertion request header.

        - `audTag: array of string`

          Access applications that are allowed to reach this hostname for this Tunnel. Audience tags can be identified in the dashboard or via the List Access policies API.

        - `teamName: string`

        - `required: optional boolean`

          Deny traffic that has not fulfilled Access authorization.

      - `caPool: optional string`

        Path to the certificate authority (CA) for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.

      - `connectTimeout: optional number`

        Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to establish TLS, which is controlled by tlsTimeout.

      - `disableChunkedEncoding: optional boolean`

        Disables chunked transfer encoding. Useful if you are running a WSGI server.

      - `http2Origin: optional boolean`

        Attempt to connect to origin using HTTP2. Origin must be configured as https.

      - `httpHostHeader: optional string`

        Sets the HTTP Host header on requests sent to the local service.

      - `keepAliveConnections: optional number`

        Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

      - `keepAliveTimeout: optional number`

        Timeout after which an idle keepalive connection can be discarded.

      - `matchSNItoHost: optional boolean`

        Auto configure the Hostname on the origin server certificate.

      - `noHappyEyeballs: optional boolean`

        Disable the “happy eyeballs” algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

      - `noTLSVerify: optional boolean`

        Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.

      - `originServerName: optional string`

        Hostname that cloudflared should expect from your origin server certificate.

      - `proxyType: optional string`

        cloudflared starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP. This configures what type of proxy will be started. Valid options are: "" for the regular proxy and "socks" for a SOCKS5 proxy.

      - `tcpKeepAlive: optional number`

        The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

      - `tlsTimeout: optional number`

        Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

  - `created_at: optional string`

  - `source: optional "local" or "cloudflare"`

    Indicates if this is a locally or remotely configured tunnel. If `local`, manage the tunnel using a YAML file on the origin machine. If `cloudflare`, manage the tunnel's configuration on the Zero Trust dashboard.

    - `"local"`

    - `"cloudflare"`

  - `tunnel_id: optional string`

    UUID of the tunnel.

  - `version: optional number`

    The version of the Tunnel Configuration.

# Connections

## List Cloudflare Tunnel connections

**get** `/accounts/{account_id}/cfd_tunnel/{tunnel_id}/connections`

Fetches connection details for a Cloudflare Tunnel.

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

- `result: array of Client`

  - `id: optional string`

    UUID of the Cloudflare Tunnel connection.

  - `arch: optional string`

    The cloudflared OS architecture used to establish this connection.

  - `config_version: optional number`

    The version of the remote tunnel configuration. Used internally to sync cloudflared with the Zero Trust dashboard.

  - `conns: optional array of object { id, client_id, client_version, 5 more }`

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

  - `features: optional array of string`

    Features enabled for the Cloudflare Tunnel.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID/connections \
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
      "config_version": 0,
      "conns": [
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
      "features": [
        "ha-origin"
      ],
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

## Clean up Cloudflare Tunnel connections

**delete** `/accounts/{account_id}/cfd_tunnel/{tunnel_id}/connections`

Removes a connection (aka Cloudflare Tunnel Connector) from a Cloudflare Tunnel independently of its current state. If no connector id (client_id) is provided all connectors will be removed. We recommend running this command after rotating tokens.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

- `tunnel_id: string`

  UUID of the tunnel.

### Query Parameters

- `client_id: optional string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID/connections \
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
  "result": {},
  "success": true
}
```

## Domain Types

### Client

- `Client object { id, arch, config_version, 4 more }`

  A client (typically cloudflared) that maintains connections to a Cloudflare data center.

  - `id: optional string`

    UUID of the Cloudflare Tunnel connection.

  - `arch: optional string`

    The cloudflared OS architecture used to establish this connection.

  - `config_version: optional number`

    The version of the remote tunnel configuration. Used internally to sync cloudflared with the Zero Trust dashboard.

  - `conns: optional array of object { id, client_id, client_version, 5 more }`

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

  - `features: optional array of string`

    Features enabled for the Cloudflare Tunnel.

  - `run_at: optional string`

    Timestamp of when the tunnel connection was started.

  - `version: optional string`

    The cloudflared version used to establish this connection.

### Connection Delete Response

- `ConnectionDeleteResponse = unknown`

# Token

## Get a Cloudflare Tunnel token

**get** `/accounts/{account_id}/cfd_tunnel/{tunnel_id}/token`

Gets the token used to associate cloudflared with a specific tunnel.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID/token \
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

# Connectors

## Get Cloudflare Tunnel connector

**get** `/accounts/{account_id}/cfd_tunnel/{tunnel_id}/connectors/{connector_id}`

Fetches connector and connection details for a Cloudflare Tunnel.

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

- `result: Client`

  A client (typically cloudflared) that maintains connections to a Cloudflare data center.

  - `id: optional string`

    UUID of the Cloudflare Tunnel connection.

  - `arch: optional string`

    The cloudflared OS architecture used to establish this connection.

  - `config_version: optional number`

    The version of the remote tunnel configuration. Used internally to sync cloudflared with the Zero Trust dashboard.

  - `conns: optional array of object { id, client_id, client_version, 5 more }`

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

  - `features: optional array of string`

    Features enabled for the Cloudflare Tunnel.

  - `run_at: optional string`

    Timestamp of when the tunnel connection was started.

  - `version: optional string`

    The cloudflared version used to establish this connection.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID/connectors/$CONNECTOR_ID \
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
    "config_version": 0,
    "conns": [
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
    "features": [
      "ha-origin"
    ],
    "run_at": "2009-11-10T23:00:00Z",
    "version": "2022.7.1"
  },
  "success": true
}
```

# Management

## Get a Cloudflare Tunnel management token

**post** `/accounts/{account_id}/cfd_tunnel/{tunnel_id}/management`

Gets a management token used to access the management resources (i.e. Streaming Logs) of a tunnel.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

- `tunnel_id: string`

  UUID of the tunnel.

### Body Parameters

- `resources: array of "logs"`

  - `"logs"`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID/management \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "resources": [
            "logs"
          ]
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
  "result": "eyJhIjoiNWFiNGU5Z...",
  "success": true
}
```

## Domain Types

### Management Create Response

- `ManagementCreateResponse = string`

  The Tunnel Token is used as a mechanism to authenticate the operation of a tunnel.

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
