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
