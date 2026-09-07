## Get Keyless SSL Configuration

**get** `/zones/{zone_id}/keyless_certificates/{keyless_certificate_id}`

Get details for one Keyless SSL configuration.

### Path Parameters

- `zone_id: string`

  Identifier.

- `keyless_certificate_id: string`

  Identifier.

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

- `result: optional KeylessCertificate`

  - `id: string`

    Keyless certificate identifier tag.

  - `created_on: string`

    When the Keyless SSL was created.

  - `enabled: boolean`

    Whether or not the Keyless SSL is on or off.

  - `host: string`

    The keyless SSL name.

  - `modified_on: string`

    When the Keyless SSL was last modified.

  - `name: string`

    The keyless SSL name.

  - `permissions: array of string`

    Available permissions for the Keyless SSL for the current user requesting the item.

  - `port: number`

    The keyless SSL port used to communicate between Cloudflare and the client's Keyless SSL server.

  - `status: "active" or "deleted"`

    Status of the Keyless SSL.

    - `"active"`

    - `"deleted"`

  - `tunnel: optional Tunnel`

    Configuration for using Keyless SSL through a Cloudflare Tunnel.

    - `private_ip: string`

      Private IP of the Key Server Host.

    - `vnet_id: string`

      Cloudflare Tunnel Virtual Network ID.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/keyless_certificates/$KEYLESS_CERTIFICATE_ID \
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
    "id": "4d2844d2ce78891c34d0b6c0535a291e",
    "created_on": "2014-01-01T05:20:00Z",
    "enabled": false,
    "host": "example.com",
    "modified_on": "2014-01-01T05:20:00Z",
    "name": "example.com Keyless SSL",
    "permissions": [
      "#ssl:read",
      "#ssl:edit"
    ],
    "port": 24008,
    "status": "active",
    "tunnel": {
      "private_ip": "10.0.0.1",
      "vnet_id": "7365377a-85a4-4390-9480-531ef7dc7a3c"
    }
  }
}
```
