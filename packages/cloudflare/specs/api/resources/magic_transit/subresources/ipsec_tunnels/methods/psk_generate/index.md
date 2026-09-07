## Generate Pre-Shared Key (PSK) for IPsec tunnels

**post** `/accounts/{account_id}/magic/ipsec_tunnels/{ipsec_tunnel_id}/psk_generate`

Generates a Pre-Shared Key for a specific IPsec tunnel used in the IKE session. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes. After a PSK is generated, the PSK is immediately persisted to Cloudflare's edge and cannot be retrieved later. Store the PSK in a safe place.

### Path Parameters

- `account_id: string`

  Identifier

- `ipsec_tunnel_id: string`

  Identifier

### Body Parameters

- `body: unknown`

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

- `result: object { ipsec_tunnel_id, psk, psk_metadata }`

  - `ipsec_tunnel_id: optional string`

    Identifier

  - `psk: optional string`

    A randomly generated or provided string for use in the IPsec tunnel.

  - `psk_metadata: optional PSKMetadata`

    The PSK metadata that includes when the PSK was generated.

    - `last_generated_on: optional string`

      The date and time the tunnel was last modified.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/ipsec_tunnels/$IPSEC_TUNNEL_ID/psk_generate \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "ipsec_tunnel_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "psk": "O3bwKSjnaoCxDoUxjcq4Rk8ZKkezQUiy",
    "psk_metadata": {
      "last_generated_on": "2017-06-14T05:20:00Z"
    }
  },
  "success": true
}
```
