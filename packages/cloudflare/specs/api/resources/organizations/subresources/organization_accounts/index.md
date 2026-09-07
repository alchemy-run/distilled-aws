# Organization Accounts

## Get organization accounts

**get** `/organizations/{organization_id}/accounts`

Retrieve a list of accounts that belong to a specific organization. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

### Path Parameters

- `organization_id: string`

### Query Parameters

- `account_pubname: optional object { contains, endsWith, startsWith }`

  - `contains: optional string`

    (case-insensitive) Filter the list of accounts to where the account_pubname contains
    a particular string.

  - `endsWith: optional string`

    (case-insensitive) Filter the list of accounts to where the account_pubname ends with
    a particular string.

  - `startsWith: optional string`

    (case-insensitive) Filter the list of accounts to where the account_pubname starts with
    a particular string.

- `direction: optional "asc" or "desc"`

  Sort direction for the order_by field. Valid values: `asc`, `desc`.
  Defaults to `asc` when order_by is specified.

  - `"asc"`

  - `"desc"`

- `name: optional object { contains, endsWith, startsWith }`

  - `contains: optional string`

    (case-insensitive) Filter the list of accounts to where the name contains a particular
    string.

  - `endsWith: optional string`

    (case-insensitive) Filter the list of accounts to where the name ends with a particular
    string.

  - `startsWith: optional string`

    (case-insensitive) Filter the list of accounts to where the name starts with a
    particular string.

- `order_by: optional "account_name"`

  Field to order results by. Currently supported values: `account_name`.
  When not specified, results are ordered by internal account ID.

  - `"account_name"`

- `page_size: optional number`

  The amount of items to return. Defaults to 10.

- `page_token: optional string`

  An opaque token returned from the last list response that when
  provided will retrieve the next page.

  Parameters used to filter the retrieved list must remain in subsequent
  requests with a page token.

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

- `result_info: object { next_page_token, total_size }`

  - `next_page_token: optional string`

    Use this opaque token in the next request to retrieve the
    next page.

    Parameters used to filter the retrieved list must remain in subsequent
    requests with a page token.

  - `total_size: optional number`

    Counts the total amount of items in a list with the applied filters. The API omits next_page_token to indicate no more items in a particular list.

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID/accounts \
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
  "result_info": {
    "next_page_token": "next_page_token",
    "total_size": 0
  },
  "success": true
}
```

## Domain Types

### Organization Accounts

- `OrganizationAccounts object { id, name, type, 3 more }`

  - `id: string`

    Identifier

  - `name: string`

    Account name

  - `type: "standard" or "enterprise"`

    - `"standard"`

    - `"enterprise"`

  - `created_on: optional string`

    Timestamp for the creation of the account

  - `managed_by: optional object { parent_org_id, parent_org_name }`

    Parent container details

    - `parent_org_id: optional string`

      ID of the parent Organization, if one exists

    - `parent_org_name: optional string`

      Name of the parent Organization, if one exists

  - `settings: optional object { abuse_contact_email, enforce_twofactor }`

    Account settings

    - `abuse_contact_email: optional string`

      Sets an abuse contact email to notify for abuse reports.

    - `enforce_twofactor: optional boolean`

      Indicates whether membership in this account requires that
      Two-Factor Authentication is enabled

### Organization Account Get Response

- `OrganizationAccountGetResponse = array of TenantAccount`

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
