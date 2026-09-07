# Tenants

## Get tenant

**get** `/tenants/{tenant_id}`

Retrieves a Tenant by Tenant ID.

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

- `result: Tenant`

  - `cdate: string`

  - `edate: string`

  - `tenant_contacts: object { email, website }`

    - `email: optional string`

    - `website: optional string`

  - `tenant_labels: array of string`

  - `tenant_metadata: object { dns }`

    - `dns: optional object { ns_pool }`

      - `ns_pool: object { primary, secondary }`

        - `primary: optional string`

        - `secondary: optional string`

  - `tenant_name: string`

  - `tenant_network: unknown`

  - `tenant_status: string`

  - `tenant_tag: string`

  - `tenant_type: string`

  - `tenant_units: array of object { unit_memberships, unit_metadata, unit_name, 2 more }`

    - `unit_memberships: array of unknown`

    - `unit_metadata: unknown`

    - `unit_name: string`

    - `unit_status: string`

    - `unit_tag: string`

  - `customer_id: optional string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/tenants/$TENANT_ID \
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
    "cdate": "2019-12-27T18:11:19.117Z",
    "edate": "2019-12-27T18:11:19.117Z",
    "tenant_contacts": {
      "email": "email",
      "website": "website"
    },
    "tenant_labels": [
      "string"
    ],
    "tenant_metadata": {
      "dns": {
        "ns_pool": {
          "primary": "primary",
          "secondary": "secondary"
        }
      }
    },
    "tenant_name": "tenant_name",
    "tenant_network": {},
    "tenant_status": "tenant_status",
    "tenant_tag": "tenant_tag",
    "tenant_type": "tenant_type",
    "tenant_units": [
      {
        "unit_memberships": [
          {}
        ],
        "unit_metadata": {},
        "unit_name": "unit_name",
        "unit_status": "unit_status",
        "unit_tag": "unit_tag"
      }
    ],
    "customer_id": "customer_id"
  },
  "success": true
}
```

## Domain Types

### Tenant

- `Tenant object { cdate, edate, tenant_contacts, 9 more }`

  - `cdate: string`

  - `edate: string`

  - `tenant_contacts: object { email, website }`

    - `email: optional string`

    - `website: optional string`

  - `tenant_labels: array of string`

  - `tenant_metadata: object { dns }`

    - `dns: optional object { ns_pool }`

      - `ns_pool: object { primary, secondary }`

        - `primary: optional string`

        - `secondary: optional string`

  - `tenant_name: string`

  - `tenant_network: unknown`

  - `tenant_status: string`

  - `tenant_tag: string`

  - `tenant_type: string`

  - `tenant_units: array of object { unit_memberships, unit_metadata, unit_name, 2 more }`

    - `unit_memberships: array of unknown`

    - `unit_metadata: unknown`

    - `unit_name: string`

    - `unit_status: string`

    - `unit_tag: string`

  - `customer_id: optional string`

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

# Entitlements

## List tenant entitlements

**get** `/tenants/{tenant_id}/entitlements`

List of innate entitlements available for the Tenant.

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

- `result: TenantEntitlements`

  - `allow_add_subdomain: object { type, value }`

    - `type: "bool"`

      - `"bool"`

    - `value: boolean`

  - `allow_auto_accept_invites: object { type, value }`

    - `type: "bool"`

      - `"bool"`

    - `value: boolean`

  - `cname_setup_allowed: object { type, value }`

    - `type: "bool"`

      - `"bool"`

    - `value: boolean`

  - `custom_entitlements: array of object { allocation, feature }`

    - `allocation: object { type, value }  or object { type, value }  or object { type, value }`

      - `OrganizationsAPIMaxCountAllocation object { type, value }`

        - `type: "max_count"`

          - `"max_count"`

        - `value: number`

      - `OrganizationsAPIBoolAllocation object { type, value }`

        - `type: "bool"`

          - `"bool"`

        - `value: boolean`

      - `OrganizationsAPINullAllocation object { type, value }`

        - `type: ""`

          - `""`

        - `value: optional unknown`

    - `feature: object { key }`

      - `key: string`

  - `mhs_certificate_count: object { type, value }`

    - `type: "max_count"`

      - `"max_count"`

    - `value: number`

  - `partial_setup_allowed: object { type, value }`

    - `type: "bool"`

      - `"bool"`

    - `value: boolean`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/tenants/$TENANT_ID/entitlements \
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
    "allow_add_subdomain": {
      "type": "bool",
      "value": true
    },
    "allow_auto_accept_invites": {
      "type": "bool",
      "value": true
    },
    "cname_setup_allowed": {
      "type": "bool",
      "value": true
    },
    "custom_entitlements": [
      {
        "allocation": {
          "type": "max_count",
          "value": 0
        },
        "feature": {
          "key": "key"
        }
      }
    ],
    "mhs_certificate_count": {
      "type": "max_count",
      "value": 0
    },
    "partial_setup_allowed": {
      "type": "bool",
      "value": true
    }
  },
  "success": true
}
```

## Domain Types

### Tenant Entitlements

- `TenantEntitlements object { allow_add_subdomain, allow_auto_accept_invites, cname_setup_allowed, 3 more }`

  - `allow_add_subdomain: object { type, value }`

    - `type: "bool"`

      - `"bool"`

    - `value: boolean`

  - `allow_auto_accept_invites: object { type, value }`

    - `type: "bool"`

      - `"bool"`

    - `value: boolean`

  - `cname_setup_allowed: object { type, value }`

    - `type: "bool"`

      - `"bool"`

    - `value: boolean`

  - `custom_entitlements: array of object { allocation, feature }`

    - `allocation: object { type, value }  or object { type, value }  or object { type, value }`

      - `OrganizationsAPIMaxCountAllocation object { type, value }`

        - `type: "max_count"`

          - `"max_count"`

        - `value: number`

      - `OrganizationsAPIBoolAllocation object { type, value }`

        - `type: "bool"`

          - `"bool"`

        - `value: boolean`

      - `OrganizationsAPINullAllocation object { type, value }`

        - `type: ""`

          - `""`

        - `value: optional unknown`

    - `feature: object { key }`

      - `key: string`

  - `mhs_certificate_count: object { type, value }`

    - `type: "max_count"`

      - `"max_count"`

    - `value: number`

  - `partial_setup_allowed: object { type, value }`

    - `type: "bool"`

      - `"bool"`

    - `value: boolean`

# Memberships

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

## Domain Types

### Tenant Membership

- `TenantMembership object { user_email, user_name, user_tag }`

  - `user_email: string`

  - `user_name: string`

  - `user_tag: string`
