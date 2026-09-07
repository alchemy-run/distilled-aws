## Create Service Binding

**post** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bindings`

Creates a new Service Binding, routing traffic to IPs within the given CIDR to a service running on Cloudflare's network.
**NOTE:** The first Service Binding created for an IP Prefix must exactly match the IP Prefix's CIDR. Subsequent Service Bindings may be created with a more-specific CIDR. Refer to the  [Service Bindings Documentation](https://developers.cloudflare.com/byoip/service-bindings/) for compatibility details.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

### Body Parameters

- `cidr: string`

  IP Prefix in Classless Inter-Domain Routing format.

- `service_id: string`

  Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the
  **List Services** endpoint.

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

- `result: optional ServiceBinding`

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
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "cidr": "192.0.2.0/24",
          "service_id": "2db684ee7ca04e159946fd05b99e1bcd"
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
    "id": "0429b49b6a5155297b78e75a44b09e14",
    "cidr": "192.0.2.0/24",
    "provisioning": {
      "state": "provisioning"
    },
    "service_id": "2db684ee7ca04e159946fd05b99e1bcd",
    "service_name": "Magic Transit"
  }
}
```
