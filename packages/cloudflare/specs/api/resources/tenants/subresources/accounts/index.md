# Accounts

## List tenant accounts

**get** `/tenants/{tenant_id}/accounts`

List of accounts for the Tenant.

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

- `result: array of TenantAccount`

  - `id: string`

  - `created_on: string`

  - `name: string`

  - `settings: object { abuse_contact_email, access_approval_expiry, api_access_enabled, 3 more }`

    - `abuse_contact_email: string`

    - `access_approval_expiry: string`

    - `api_access_enabled: boolean`

    - `default_nameservers: string`

      Use [DNS Settings](https://developers.cloudflare.com/api/operations/dns-settings-for-an-account-list-dns-settings) instead. Deprecated.

    - `enforce_twofactor: boolean`

    - `use_account_custom_ns_by_default: boolean`

      Use [DNS Settings](https://developers.cloudflare.com/api/operations/dns-settings-for-an-account-list-dns-settings) instead. Deprecated.

  - `type: "standard" or "enterprise"`

    - `"standard"`

    - `"enterprise"`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/tenants/$TENANT_ID/accounts \
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
      "id": "id",
      "created_on": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "settings": {
        "abuse_contact_email": "abuse_contact_email",
        "access_approval_expiry": "2019-12-27T18:11:19.117Z",
        "api_access_enabled": true,
        "default_nameservers": "default_nameservers",
        "enforce_twofactor": true,
        "use_account_custom_ns_by_default": true
      },
      "type": "standard"
    }
  ],
  "success": true
}
```

## Domain Types

### Tenant Account

- `TenantAccount object { id, created_on, name, 2 more }`

  - `id: string`

  - `created_on: string`

  - `name: string`

  - `settings: object { abuse_contact_email, access_approval_expiry, api_access_enabled, 3 more }`

    - `abuse_contact_email: string`

    - `access_approval_expiry: string`

    - `api_access_enabled: boolean`

    - `default_nameservers: string`

      Use [DNS Settings](https://developers.cloudflare.com/api/operations/dns-settings-for-an-account-list-dns-settings) instead. Deprecated.

    - `enforce_twofactor: boolean`

    - `use_account_custom_ns_by_default: boolean`

      Use [DNS Settings](https://developers.cloudflare.com/api/operations/dns-settings-for-an-account-list-dns-settings) instead. Deprecated.

  - `type: "standard" or "enterprise"`

    - `"standard"`

    - `"enterprise"`
