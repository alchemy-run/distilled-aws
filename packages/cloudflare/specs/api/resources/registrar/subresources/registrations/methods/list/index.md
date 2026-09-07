## List Registrations

**get** `/accounts/{account_id}/registrar/registrations`

Returns a paginated list of domain registrations owned by the account.

This endpoint uses cursor-based pagination. Results are ordered by registration
date by default. To fetch the next page, pass the `cursor` value from the
`result_info` object in the response as the `cursor` query parameter in
your next request. An empty `cursor` string indicates there are no more
pages.

### Path Parameters

- `account_id: string`

  Identifier

### Query Parameters

- `cursor: optional string`

  Opaque token from a previous response's `result_info.cursor`.
  Pass this value to fetch the next page of results. Omit (or
  pass an empty string) for the first page.

- `direction: optional "asc" or "desc"`

  Sort direction for results. Defaults to ascending order.

  - `"asc"`

  - `"desc"`

- `per_page: optional number`

  Number of items to return per page.

- `sort_by: optional "registry_created_at" or "registry_expires_at" or "name"`

  Column to sort results by. Defaults to registration date
  (`registry_created_at`) when omitted.

  - `"registry_created_at"`

  - `"registry_expires_at"`

  - `"name"`

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

- `result: array of Registration`

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

- `result_info: object { count, cursor, per_page }`

  Cursor-based pagination metadata. Used by list endpoints that support
  cursor pagination. Pass the `cursor` value as a query parameter in the
  next request to fetch the next page. An empty string indicates there
  are no more pages.

  - `count: number`

    Number of items in the current result set.

  - `cursor: string`

    Opaque cursor for fetching the next page. Pass this value as the
    `cursor` query parameter in a subsequent request. An empty string
    indicates there are no more pages.

  - `per_page: number`

    Maximum number of items per page.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/registrations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": [],
  "result_info": {
    "count": 0,
    "cursor": "",
    "per_page": 20
  },
  "success": true
}
```
