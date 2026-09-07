## Get device managed network details

**get** `/accounts/{account_id}/devices/networks/{network_id}`

Fetches details for a single managed network.

### Path Parameters

- `account_id: string`

- `network_id: string`

  API UUID.

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

- `result: DeviceNetwork`

  - `config: optional object { tls_sockaddr, sha256 }`

    The configuration object containing information for the WARP client to detect the managed network.

    - `tls_sockaddr: string`

      A network address of the form "host:port" that the WARP client will use to detect the presence of a TLS host.

    - `sha256: optional string`

      The SHA-256 hash of the TLS certificate presented by the host found at tls_sockaddr. If absent, regular certificate verification (trusted roots, valid timestamp, etc) will be used to validate the certificate.

  - `name: optional string`

    The name of the device managed network. This name must be unique.

  - `network_id: optional string`

    API UUID.

  - `type: optional "tls"`

    The type of device managed network.

    - `"tls"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/networks/$NETWORK_ID \
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
    "config": {
      "tls_sockaddr": "foo.bar:1234",
      "sha256": "b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c"
    },
    "name": "managed-network-1",
    "network_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "type": "tls"
  },
  "success": true
}
```
