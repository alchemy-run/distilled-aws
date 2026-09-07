# Account Profile

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

## Modify account profile

**put** `/accounts/{account_id}/profile`

Updates the profile information for a Cloudflare account. Allows modification of account-level settings and organizational details. Requires Account Settings Write permission.

### Path Parameters

- `account_id: string`

### Body Parameters

- `business_address: string`

- `business_email: string`

- `business_name: string`

- `business_phone: string`

- `external_metadata: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/profile \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "business_address": "business_address",
          "business_email": "business_email",
          "business_name": "business_name",
          "business_phone": "business_phone",
          "external_metadata": "external_metadata"
        }'
```

## Domain Types

### Account Profile

- `AccountProfile object { business_address, business_email, business_name, 2 more }`

  - `business_address: string`

  - `business_email: string`

  - `business_name: string`

  - `business_phone: string`

  - `external_metadata: string`
