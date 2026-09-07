## Get organization profile

**get** `/organizations/{organization_id}/profile`

Get an organizations profile if it exists. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

### Path Parameters

- `organization_id: string`

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
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID/profile \
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
