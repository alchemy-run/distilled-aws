# Routes

## List tunnel routes

**get** `/accounts/{account_id}/teamnet/routes`

Lists and filters private network routes in an account.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

### Query Parameters

- `comment: optional string`

  Optional remark describing the route.

- `existed_at: optional string`

  If provided, include only resources that were created (and not deleted) before this time. URL encoded.

- `is_deleted: optional boolean`

  If `true`, only include deleted routes. If `false`, exclude deleted routes. If empty, all routes will be included.

- `network_subset: optional string`

  If set, only list routes that are contained within this IP range.

- `network_superset: optional string`

  If set, only list routes that contain this IP range.

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of results to display.

- `route_id: optional string`

  UUID of the route.

- `tun_types: optional array of "cfd_tunnel" or "warp_connector" or "warp" or 4 more`

  The types of tunnels to filter by, separated by commas.

  - `"cfd_tunnel"`

  - `"warp_connector"`

  - `"warp"`

  - `"magic"`

  - `"ip_sec"`

  - `"gre"`

  - `"cni"`

- `tunnel_id: optional string`

  UUID of the tunnel.

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

- `result: array of Teamnet`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/routes \
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
      "comment": "Example comment for this route.",
      "created_at": "2021-01-25T18:22:34.317854Z",
      "deleted_at": "2009-11-10T23:00:00.000000Z",
      "network": "172.16.0.0/16",
      "tun_type": "cfd_tunnel",
      "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
      "tunnel_name": "blog",
      "virtual_network_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
      "virtual_network_name": "us-east-1-vpc"
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

## Get tunnel route

**get** `/accounts/{account_id}/teamnet/routes/{route_id}`

Get a private network route in an account.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

- `route_id: string`

  UUID of the route.

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

- `result: Route`

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

  - `tunnel_id: optional string`

    UUID of the tunnel.

  - `virtual_network_id: optional string`

    UUID of the virtual network.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/routes/$ROUTE_ID \
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
    "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "virtual_network_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415"
  },
  "success": true
}
```

## Create a tunnel route

**post** `/accounts/{account_id}/teamnet/routes`

Routes a private network through a Cloudflare Tunnel.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

### Body Parameters

- `network: string`

  The private IPv4 or IPv6 range connected by the route, in CIDR notation.

- `tunnel_id: string`

  UUID of the tunnel.

- `comment: optional string`

  Optional remark describing the route.

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

- `result: Route`

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

  - `tunnel_id: optional string`

    UUID of the tunnel.

  - `virtual_network_id: optional string`

    UUID of the virtual network.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/routes \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "network": "172.16.0.0/16",
          "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
          "comment": "Example comment for this route.",
          "virtual_network_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415"
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
    "comment": "Example comment for this route.",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "deleted_at": "2009-11-10T23:00:00.000000Z",
    "network": "172.16.0.0/16",
    "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "virtual_network_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415"
  },
  "success": true
}
```

## Update a tunnel route

**patch** `/accounts/{account_id}/teamnet/routes/{route_id}`

Updates an existing private network route in an account. The fields that are meant to be updated should be provided in the body of the request.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

- `route_id: string`

  UUID of the route.

### Body Parameters

- `comment: optional string`

  Optional remark describing the route.

- `network: optional string`

  The private IPv4 or IPv6 range connected by the route, in CIDR notation.

- `tunnel_id: optional string`

  UUID of the tunnel.

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

- `result: Route`

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

  - `tunnel_id: optional string`

    UUID of the tunnel.

  - `virtual_network_id: optional string`

    UUID of the virtual network.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/routes/$ROUTE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "comment": "Example comment for this route.",
          "network": "172.16.0.0/16",
          "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
          "virtual_network_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415"
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
    "comment": "Example comment for this route.",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "deleted_at": "2009-11-10T23:00:00.000000Z",
    "network": "172.16.0.0/16",
    "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "virtual_network_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415"
  },
  "success": true
}
```

## Delete a tunnel route

**delete** `/accounts/{account_id}/teamnet/routes/{route_id}`

Deletes a private network route from an account.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

- `route_id: string`

  UUID of the route.

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

- `result: Route`

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

  - `tunnel_id: optional string`

    UUID of the tunnel.

  - `virtual_network_id: optional string`

    UUID of the virtual network.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/routes/$ROUTE_ID \
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
    "comment": "Example comment for this route.",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "deleted_at": "2009-11-10T23:00:00.000000Z",
    "network": "172.16.0.0/16",
    "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "virtual_network_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415"
  },
  "success": true
}
```

## Domain Types

### Network Route

- `NetworkRoute object { id, comment, created_at, 4 more }`

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

  - `tunnel_id: optional string`

    UUID of the tunnel.

  - `virtual_network_id: optional string`

    UUID of the virtual network.

### Route

- `Route object { id, comment, created_at, 4 more }`

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

  - `tunnel_id: optional string`

    UUID of the tunnel.

  - `virtual_network_id: optional string`

    UUID of the virtual network.

### Teamnet

- `Teamnet object { id, comment, created_at, 7 more }`

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

# Networks

## Create a tunnel route (CIDR Endpoint)

**post** `/accounts/{account_id}/teamnet/routes/network/{ip_network_encoded}`

Routes a private network through a Cloudflare Tunnel. The CIDR in `ip_network_encoded` must be written in URL-encoded format.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

- `ip_network_encoded: string`

  IP/CIDR range in URL-encoded format

### Body Parameters

- `tunnel_id: string`

  UUID of the tunnel.

- `comment: optional string`

  Optional remark describing the route.

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

- `result: Route`

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

  - `tunnel_id: optional string`

    UUID of the tunnel.

  - `virtual_network_id: optional string`

    UUID of the virtual network.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/routes/network/$IP_NETWORK_ENCODED \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
          "comment": "Example comment for this route.",
          "virtual_network_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415"
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
    "comment": "Example comment for this route.",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "deleted_at": "2009-11-10T23:00:00.000000Z",
    "network": "172.16.0.0/16",
    "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "virtual_network_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415"
  },
  "success": true
}
```

## Update a tunnel route (CIDR Endpoint)

**patch** `/accounts/{account_id}/teamnet/routes/network/{ip_network_encoded}`

Updates an existing private network route in an account. The CIDR in `ip_network_encoded` must be written in URL-encoded format.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

- `ip_network_encoded: string`

  IP/CIDR range in URL-encoded format

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

- `result: Route`

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

  - `tunnel_id: optional string`

    UUID of the tunnel.

  - `virtual_network_id: optional string`

    UUID of the virtual network.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/routes/network/$IP_NETWORK_ENCODED \
    -X PATCH \
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
    "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "virtual_network_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415"
  },
  "success": true
}
```

## Delete a tunnel route (CIDR Endpoint)

**delete** `/accounts/{account_id}/teamnet/routes/network/{ip_network_encoded}`

Deletes a private network route from an account. The CIDR in `ip_network_encoded` must be written in URL-encoded format. If no virtual_network_id is provided it will delete the route from the default vnet. If no tun_type is provided it will fetch the type from the tunnel_id or if that is missing it will assume Cloudflare Tunnel as default. If tunnel_id is provided it will delete the route from that tunnel, otherwise it will delete the route based on the vnet and tun_type.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

- `ip_network_encoded: string`

  IP/CIDR range in URL-encoded format

### Query Parameters

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

- `result: Route`

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

  - `tunnel_id: optional string`

    UUID of the tunnel.

  - `virtual_network_id: optional string`

    UUID of the virtual network.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/routes/network/$IP_NETWORK_ENCODED \
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
    "comment": "Example comment for this route.",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "deleted_at": "2009-11-10T23:00:00.000000Z",
    "network": "172.16.0.0/16",
    "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "virtual_network_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415"
  },
  "success": true
}
```
