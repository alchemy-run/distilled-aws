# Account Types

## Get tenant account types

**get** `/tenants/{tenant_id}/account_types`

List of account types available for the Tenant to provision accounts.

### Path Parameters

- `tenant_id: string`

### Returns

- `errors: array of unknown`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: array of string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/tenants/$TENANT_ID/account_types \
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
  "result": [
    "string"
  ],
  "success": true
}
```

## Domain Types

### Account Type List Response

- `AccountTypeListResponse = string`
