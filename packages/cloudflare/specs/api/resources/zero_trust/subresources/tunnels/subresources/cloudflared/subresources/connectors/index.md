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
