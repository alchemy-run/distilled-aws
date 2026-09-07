## Get Zero Trust account information

**get** `/accounts/{account_id}/gateway`

Retrieve information about the current Zero Trust account.

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

- `result: optional object { id, gateway_tag, provider_name }`

  - `id: optional string`

    Specify the Cloudflare account ID.

  - `gateway_tag: optional string`

    Specify the gateway internal ID.

  - `provider_name: optional string`

    Specify the provider name (usually Cloudflare).

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway \
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
    "id": "699d98642c564d2e855e9661899b7252",
    "gateway_tag": "f174e90afafe4643bbbc4a0ed4fc8415",
    "provider_name": "Cloudflare"
  }
}
```
