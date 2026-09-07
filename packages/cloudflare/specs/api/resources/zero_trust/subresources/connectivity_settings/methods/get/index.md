## Get Zero Trust Connectivity Settings

**get** `/accounts/{account_id}/zerotrust/connectivity_settings`

Gets the Zero Trust Connectivity Settings for the given account.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

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

- `result: object { icmp_proxy_enabled, offramp_warp_enabled }`

  - `icmp_proxy_enabled: optional boolean`

    A flag to enable the ICMP proxy for the account network.

  - `offramp_warp_enabled: optional boolean`

    A flag to enable WARP to WARP traffic.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zerotrust/connectivity_settings \
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
    "icmp_proxy_enabled": true,
    "offramp_warp_enabled": true
  },
  "success": true
}
```
