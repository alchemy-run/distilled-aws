# Proxy Endpoints

## List proxy endpoints

**get** `/accounts/{account_id}/gateway/proxy_endpoints`

List all Zero Trust Gateway proxy endpoints for an account.

### Path Parameters

- `account_id: string`

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

- `result: optional array of ProxyEndpoint`

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

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Indicate the total number of results for the requested service.

  - `page: optional number`

    Indicate the current page within a paginated list of results.

  - `per_page: optional number`

    Indicate the number of results per page.

  - `total_count: optional number`

    Indicate the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/proxy_endpoints \
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
  "result": [
    {
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
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get a proxy endpoint

**get** `/accounts/{account_id}/gateway/proxy_endpoints/{proxy_endpoint_id}`

Get a single Zero Trust Gateway proxy endpoint.

### Path Parameters

- `account_id: string`

- `proxy_endpoint_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/proxy_endpoints/$PROXY_ENDPOINT_ID \
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

## Update a proxy endpoint

**patch** `/accounts/{account_id}/gateway/proxy_endpoints/{proxy_endpoint_id}`

Update a configured Zero Trust Gateway proxy endpoint.

### Path Parameters

- `account_id: string`

- `proxy_endpoint_id: string`

### Body Parameters

- `ips: optional array of GatewayIPs`

  Specify the list of CIDRs to restrict ingress connections.

- `name: optional string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/proxy_endpoints/$PROXY_ENDPOINT_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Devops team"
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

## Delete a proxy endpoint

**delete** `/accounts/{account_id}/gateway/proxy_endpoints/{proxy_endpoint_id}`

Delete a configured Zero Trust Gateway proxy endpoint.

### Path Parameters

- `account_id: string`

- `proxy_endpoint_id: string`

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

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/proxy_endpoints/$PROXY_ENDPOINT_ID \
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
  "success": true,
  "result": {}
}
```

## Domain Types

### Gateway IPs

- `GatewayIPs = string`

  Specify an IPv4 or IPv6 CIDR. Limit IPv6 to a maximum of /109 and IPv4 to a maximum of /25.

### Proxy Endpoint

- `ProxyEndpoint = object { ips, name, id, 4 more }  or object { kind, name, id, 3 more }`

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

### Proxy Endpoint Delete Response

- `ProxyEndpointDeleteResponse = unknown`
