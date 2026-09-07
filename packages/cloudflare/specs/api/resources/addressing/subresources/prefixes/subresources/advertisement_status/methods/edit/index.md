## Update Prefix Dynamic Advertisement Status

**patch** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/status`

Advertise or withdraw the BGP route for a prefix.

**Deprecated:** Prefer the BGP Prefixes endpoints, which additionally allow for advertising and withdrawing
subnets of an IP prefix.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

### Body Parameters

- `advertised: boolean`

  Advertisement status of the prefix. If `true`, the BGP route for the prefix is advertised to the Internet. If
  `false`, the BGP route is withdrawn.

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

- `result: optional object { advertised, advertised_modified_at }`

  - `advertised: optional boolean`

    Advertisement status of the prefix. If `true`, the BGP route for the prefix is advertised to the Internet. If
    `false`, the BGP route is withdrawn.

  - `advertised_modified_at: optional string`

    Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bgp/status \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "advertised": true
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
    "advertised": true,
    "advertised_modified_at": "2014-01-01T05:20:00.12345Z"
  }
}
```
