## Create a proxy endpoint

**post** `/accounts/{account_id}/gateway/proxy_endpoints`

Create a new Zero Trust Gateway proxy endpoint.

### Path Parameters

- `account_id: string`

### Body Parameters

- `body: object { name, kind }  or object { kind, name }`

  - `IP object { name, kind }`

    - `name: string`

      Specify the name of the proxy endpoint.

    - `kind: optional "ip"`

      The proxy endpoint kind

      - `"ip"`

  - `Identity object { kind, name }`

    - `kind: "identity"`

      The proxy endpoint kind

      - `"identity"`

    - `name: string`

      Specify the name of the proxy endpoint.

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

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional ProxyEndpoint`

  - `IP object { ips, name, id, 4 more }`

    - `ips: array of GatewayIPs`

      Specify the list of CIDRs to restrict ingress connections.

    - `name: string`

      Specify the name of the proxy endpoint.

    - `id: optional string`

    - `created_at: optional string`

    - `kind: optional "ip"`

      The proxy endpoint kind

      - `"ip"`

    - `subdomain: optional string`

      Specify the subdomain to use as the destination in the proxy client.

    - `updated_at: optional string`

  - `Identity object { kind, name, id, 3 more }`

    - `kind: "identity"`

      The proxy endpoint kind

      - `"identity"`

    - `name: string`

      Specify the name of the proxy endpoint.

    - `id: optional string`

    - `created_at: optional string`

    - `subdomain: optional string`

      Specify the subdomain to use as the destination in the proxy client.

    - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/proxy_endpoints \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Devops team",
          "kind": "ip"
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
    "ips": [
      "192.0.2.1/32"
    ],
    "name": "Devops team",
    "id": "ed35569b41ce4d1facfe683550f54086",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "kind": "ip",
    "subdomain": "oli3n9zkz5.proxy.cloudflare-gateway.com",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```
