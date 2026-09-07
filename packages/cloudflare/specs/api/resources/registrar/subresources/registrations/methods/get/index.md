## Get Registration

**get** `/accounts/{account_id}/registrar/registrations/{domain_name}`

Returns the current state of a domain registration.

This is the canonical read endpoint for a domain you own. It returns
the full registration resource including current settings and expiration.
When the registration resource is ready, both `created_at` and `expires_at`
are present in the response.

### Path Parameters

- `account_id: string`

  Identifier

- `domain_name: string`

  Fully qualified domain name (FQDN) including the extension
  (e.g., `example.com`, `mybrand.app`). The domain name uniquely
  identifies a registration — the same domain cannot be registered
  twice, making it a natural idempotency key for registration requests.

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

- `result: Registration`

  A domain registration resource representing the current state of a registered domain.

  - `auto_renew: boolean`

    Whether the domain will be automatically renewed before expiration.

  - `created_at: string`

    When the domain was registered. Present when the registration resource exists.

  - `domain_name: string`

    Fully qualified domain name (FQDN) including the extension
    (e.g., `example.com`, `mybrand.app`). The domain name uniquely
    identifies a registration — the same domain cannot be registered
    twice, making it a natural idempotency key for registration requests.

  - `expires_at: string`

    When the domain registration expires. Present when the registration is ready; may be null only while `status` is `registration_pending`.

  - `locked: boolean`

    Whether the domain is locked for transfer.

  - `privacy_mode: "redaction"`

    Current WHOIS privacy mode for the registration.

    - `"redaction"`

  - `status: "active" or "registration_pending" or "expired" or 3 more`

    Current registration status.

    - `active`: Domain is registered and operational
    - `registration_pending`: Registration is in progress
    - `expired`: Domain has expired
    - `suspended`: Domain is suspended by the registry
    - `redemption_period`: Domain is in the redemption grace period
    - `pending_delete`: Domain is pending deletion by the registry

    - `"active"`

    - `"registration_pending"`

    - `"expired"`

    - `"suspended"`

    - `"redemption_period"`

    - `"pending_delete"`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/registrations/$DOMAIN_NAME \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "auto_renew": true,
    "created_at": "2025-01-15T10:00:00Z",
    "domain_name": "example.com",
    "expires_at": "2026-01-15T10:00:00Z",
    "locked": true,
    "privacy_mode": "redaction",
    "status": "active"
  },
  "success": true
}
```
