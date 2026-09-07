## List tenant memberships

**get** `/tenants/{tenant_id}/memberships`

List of active members (Cloudflare users) for the Tenant.

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

- `result: array of TenantMembership`

  - `user_email: string`

  - `user_name: string`

  - `user_tag: string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/tenants/$TENANT_ID/memberships \
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
    {
      "user_email": "user_email",
      "user_name": "user_name",
      "user_tag": "user_tag"
    }
  ],
  "success": true
}
```
