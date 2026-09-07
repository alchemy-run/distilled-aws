## List Service Bindings

**get** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bindings`

List the Cloudflare services this prefix is currently bound to. Traffic sent to an address within an IP prefix will be routed to the Cloudflare service of the most-specific Service Binding matching the address.
**Example:** binding `192.0.2.0/24` to Cloudflare Magic Transit and `192.0.2.1/32` to the Cloudflare CDN would route traffic for `192.0.2.1` to the CDN, and traffic for all other IPs in the prefix to Cloudflare Magic Transit.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

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

- `result: optional array of ServiceBinding`

  - `id: optional string`

    Identifier of a Service Binding.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `provisioning: optional object { state }`

    Status of a Service Binding's deployment to the Cloudflare network

    - `state: optional "provisioning" or "active"`

      When a binding has been deployed to a majority of Cloudflare datacenters, the binding will become active and can be used with its associated service.

      - `"provisioning"`

      - `"active"`

  - `service_id: optional string`

    Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the
    **List Services** endpoint.

  - `service_name: optional string`

    Name of a service running on the Cloudflare network

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bindings \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
      "id": "0429b49b6a5155297b78e75a44b09e14",
      "cidr": "192.0.2.0/24",
      "provisioning": {
        "state": "provisioning"
      },
      "service_id": "2db684ee7ca04e159946fd05b99e1bcd",
      "service_name": "Magic Transit"
    }
  ]
}
```
