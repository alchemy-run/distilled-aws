# Hostname Routes

## List hostname routes

**get** `/accounts/{account_id}/zerotrust/routes/hostname`

Lists and filters hostname routes in an account.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

### Query Parameters

- `id: optional string`

  The hostname route ID.

- `comment: optional string`

  If set, only list hostname routes with the given comment.

- `existed_at: optional string`

  If provided, include only resources that were created (and not deleted) before this time. URL encoded.

- `hostname: optional string`

  If set, only list hostname routes that contain a substring of the given value, the filter is case-insensitive.

- `is_deleted: optional boolean`

  If `true`, only return deleted hostname routes. If `false`, exclude deleted hostname routes.

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of results to display.

- `tunnel_id: optional string`

  If set, only list hostname routes that point to a specific tunnel.

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

- `result: array of HostnameRoute`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zerotrust/routes/hostname \
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
      "comment": "example comment",
      "created_at": "2021-01-25T18:22:34.317854Z",
      "deleted_at": "2009-11-10T23:00:00.000000Z",
      "hostname": "office-1.local",
      "tun_type": "cfd_tunnel",
      "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
      "tunnel_name": "api-tunnel"
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

## Create hostname route

**post** `/accounts/{account_id}/zerotrust/routes/hostname`

Create a hostname route.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

### Body Parameters

- `comment: optional string`

  An optional description of the hostname route.

- `hostname: optional string`

  The hostname of the route.

- `tunnel_id: optional string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zerotrust/routes/hostname \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "comment": "example comment",
          "hostname": "office-1.local",
          "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415"
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

## Update hostname route

**patch** `/accounts/{account_id}/zerotrust/routes/hostname/{hostname_route_id}`

Updates a hostname route.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

- `hostname_route_id: string`

  The hostname route ID.

### Body Parameters

- `comment: optional string`

  An optional description of the hostname route.

- `hostname: optional string`

  The hostname of the route.

- `tunnel_id: optional string`

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
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "comment": "example comment",
          "hostname": "office-1.local",
          "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415"
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

## Delete hostname route

**delete** `/accounts/{account_id}/zerotrust/routes/hostname/{hostname_route_id}`

Delete a hostname route.

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

## Domain Types

### Hostname Route

- `HostnameRoute object { id, comment, created_at, 5 more }`

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
