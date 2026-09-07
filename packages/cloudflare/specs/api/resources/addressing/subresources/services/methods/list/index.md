## List Services

**get** `/accounts/{account_id}/addressing/services`

Bring-Your-Own IP (BYOIP) prefixes onboarded to Cloudflare must be bound to a service running on the Cloudflare network to enable a Cloudflare product on the IP addresses. This endpoint can be used as a reference of available services on the Cloudflare network, and their service IDs.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

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

- `result: optional array of object { id, name }`

  - `id: optional string`

    Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the
    **List Services** endpoint.

  - `name: optional string`

    Name of a service running on the Cloudflare network

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/services \
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
      "id": "2db684ee7ca04e159946fd05b99e1bcd",
      "name": "Magic Transit"
    }
  ]
}
```
