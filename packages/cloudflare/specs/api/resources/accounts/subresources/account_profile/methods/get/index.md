## Get account profile

**get** `/accounts/{account_id}/profile`

Retrieves the profile information for a specific Cloudflare account, including organization details, settings, and metadata. This endpoint is commonly used to verify account access and retrieve account-level configuration.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of unknown`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: AccountProfile`

  - `business_address: string`

  - `business_email: string`

  - `business_name: string`

  - `business_phone: string`

  - `external_metadata: string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/profile \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "errors": [],
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
    "business_address": "business_address",
    "business_email": "business_email",
    "business_name": "business_name",
    "business_phone": "business_phone",
    "external_metadata": "external_metadata"
  },
  "success": true
}
```
