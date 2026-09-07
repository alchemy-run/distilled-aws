## Set Pre-Shared Keys (PSK) for IPsec tunnels

**post** `/accounts/{account_id}/magic/ipsec_tunnels/psk`

Sets Pre-Shared Keys for multiple IPsec tunnels associated with an account. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes. After PSKs are applied, they are immediately persisted to Cloudflare's edge and cannot be retrieved later. Store the PSKs in a safe place.

### Path Parameters

- `account_id: string`

  Identifier

### Query Parameters

- `validate_only: optional boolean`

  If `true`, only run validation without persisting changes.

### Body Parameters

- `psks: array of object { id, psk }`

  List of tunnel ID and PSK pairs.

  - `id: string`

    The ID of the IPsec tunnel.

  - `psk: string`

    A randomly generated or provided string for use in the IPsec tunnel.

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

- `result: object { successfully_applied_psks, unapplied_psks }`

  - `successfully_applied_psks: optional map[object { ipsec_id, ipsec_tunnel_id, psk, psk_metadata } ]`

    Map of tunnel IDs to successfully applied PSK details.

    - `ipsec_id: string`

      The IKE identifier used for this tunnel on the Cloudflare edge.

    - `ipsec_tunnel_id: string`

      Identifier

    - `psk: string`

      A randomly generated or provided string for use in the IPsec tunnel.

    - `psk_metadata: PSKMetadata`

      The PSK metadata that includes when the PSK was generated.

      - `last_generated_on: optional string`

        The date and time the tunnel was last modified.

  - `unapplied_psks: optional map[string]`

    Map of tunnel IDs to failure reasons for PSKs that could not be applied.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/ipsec_tunnels/psk \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "psks": [
            {
              "id": "023e105f4ecef8ad9ca31a8372d0c353",
              "psk": "O3bwKSjnaoCxDoUxjcq4Rk8ZKkezQUiy"
            }
          ]
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
    "successfully_applied_psks": {
      "foo": {
        "ipsec_id": "12345_abc123def4567890abcdef1234567890",
        "ipsec_tunnel_id": "023e105f4ecef8ad9ca31a8372d0c353",
        "psk": "O3bwKSjnaoCxDoUxjcq4Rk8ZKkezQUiy",
        "psk_metadata": {
          "last_generated_on": "2017-06-14T05:20:00Z"
        }
      }
    },
    "unapplied_psks": {
      "foo": "string"
    }
  },
  "success": true
}
```
