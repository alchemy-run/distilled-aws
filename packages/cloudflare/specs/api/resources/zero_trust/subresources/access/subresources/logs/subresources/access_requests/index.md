# Access Requests

## Get Access authentication logs

**get** `/accounts/{account_id}/access/logs/access_requests`

Gets a list of Access authentication audit logs for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `allowedOp: optional "eq" or "neq"`

  Operator for the `allowed` filter.

  - `"eq"`

  - `"neq"`

- `app_typeOp: optional "eq" or "neq"`

  Operator for the `app_type` filter.

  - `"eq"`

  - `"neq"`

- `app_uidOp: optional "eq" or "neq"`

  Operator for the `app_uid` filter.

  - `"eq"`

  - `"neq"`

- `country_codeOp: optional "eq" or "neq"`

  Operator for the `country_code` filter.

  - `"eq"`

  - `"neq"`

- `direction: optional "desc" or "asc"`

  The chronological sorting order for the logs.

  - `"desc"`

  - `"asc"`

- `email: optional string`

  Filter by user email. Match mode is controlled by `emailOp` (preferred) or the legacy `email_exact` flag.

  - Default (no `emailOp`, `email_exact=false` or unset): substring match — `email=@example.com` returns all events with that domain.
  - Exact match: set `emailOp=eq` (preferred) or `email_exact=true` — e.g. `email=user@example.com&email_exact=true` returns only that user.
  - Explicit substring match: set `emailOp=contains` (without `email_exact=true`). When both are set, `email_exact=true` takes precedence and the match is exact.
  - Exclusion: set `emailOp=neq`. With `email_exact=true` this is an exact-value exclusion; without it, a fuzzy substring exclusion.

- `email_exact: optional boolean`

  When true, `email` is matched exactly instead of substring matching.

- `emailOp: optional "eq" or "neq" or "contains"`

  Operator for the `email` filter.
  `contains` performs a substring (case-sensitive) match. When `email_exact=true`
  is also set, `email_exact` takes precedence and `contains` is ignored.

  - `"eq"`

  - `"neq"`

  - `"contains"`

- `fields: optional string`

  Comma-separated list of fields to include in the response.
  When omitted, all fields are returned.

- `idpOp: optional "eq" or "neq"`

  Operator for the `idp` filter.

  - `"eq"`

  - `"neq"`

- `limit: optional number`

  The maximum number of log entries to retrieve.

- `non_identityOp: optional "eq" or "neq"`

  Operator for the `non_identity` filter.

  - `"eq"`

  - `"neq"`

- `page: optional number`

  Page number of results.

- `per_page: optional number`

  Number of results per page.

- `ray_idOp: optional "eq" or "neq"`

  Operator for the `ray_id` filter.

  - `"eq"`

  - `"neq"`

- `since: optional string`

  The earliest event timestamp to query.

- `until: optional string`

  The latest event timestamp to query.

- `user_id: optional string`

  Deprecated. Accepted for backward compatibility but no longer applied
  as a filter. Use `email` instead.

- `user_idOp: optional "eq" or "neq"`

  Deprecated. Accepted for backward compatibility but no longer applied
  as a filter (the `user_id` parameter is itself deprecated).

  - `"eq"`

  - `"neq"`

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

- `result: optional array of AccessRequest`

  - `action: optional string`

    The event that occurred, such as a login attempt.

  - `allowed: optional boolean`

    The result of the authentication event.

  - `app_domain: optional string`

    The URL of the Access application.

  - `app_uid: optional string`

    The unique identifier for the Access application.

  - `connection: optional string`

    The IdP used to authenticate.

  - `created_at: optional string`

  - `ip_address: optional string`

    The IP address of the authenticating user.

  - `ray_id: optional string`

    The unique identifier for the request to Cloudflare.

  - `user_email: optional string`

    The email address of the authenticating user.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/logs/access_requests \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "result": [
    {
      "action": "login",
      "allowed": true,
      "app_domain": "test.example.com/admin",
      "app_uid": "df7e2w5f-02b7-4d9d-af26-8d1988fca630",
      "connection": "saml",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "ip_address": "198.41.129.166",
      "ray_id": "187d944c61940c77",
      "user_email": "user@example.com"
    }
  ]
}
```

## Domain Types

### Access Request List Response

- `AccessRequestListResponse = array of AccessRequest`

  - `action: optional string`

    The event that occurred, such as a login attempt.

  - `allowed: optional boolean`

    The result of the authentication event.

  - `app_domain: optional string`

    The URL of the Access application.

  - `app_uid: optional string`

    The unique identifier for the Access application.

  - `connection: optional string`

    The IdP used to authenticate.

  - `created_at: optional string`

  - `ip_address: optional string`

    The IP address of the authenticating user.

  - `ray_id: optional string`

    The unique identifier for the request to Cloudflare.

  - `user_email: optional string`

    The email address of the authenticating user.
