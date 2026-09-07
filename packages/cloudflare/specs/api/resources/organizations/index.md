# Organizations

## List organizations the user has access to

**get** `/organizations`

Retrieve a list of organizations a particular user has access to. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

### Query Parameters

- `id: optional array of string`

  Only return organizations with the specified IDs (ex. id=foo&id=bar). Send multiple elements
  by repeating the query value.

- `containing: optional object { account, organization, user }`

  - `account: optional string`

    Filter the list of organizations to the ones that contain this particular
    account.

  - `organization: optional string`

    Filter the list of organizations to the ones that contain this particular
    organization.

  - `user: optional string`

    Filter the list of organizations to the ones that contain this particular
    user.

    IMPORTANT: Just because an organization "contains" a user is not a
    representation of any authorization or privilege to manage any resources
    therein. An organization "containing" a user simply means the user is managed by
    that organization.

- `name: optional object { contains, endsWith, startsWith }`

  - `contains: optional string`

    (case-insensitive) Filter the list of organizations to where the name contains a particular
    string.

  - `endsWith: optional string`

    (case-insensitive) Filter the list of organizations to where the name ends with a particular
    string.

  - `startsWith: optional string`

    (case-insensitive) Filter the list of organizations to where the name starts with a
    particular string.

- `page_size: optional number`

  The amount of items to return. Defaults to 10.

- `page_token: optional string`

  An opaque token returned from the last list response that when
  provided will retrieve the next page.

  Parameters used to filter the retrieved list must remain in subsequent
  requests with a page token.

- `parent: optional object { id }`

  - `id: optional string or "null"`

    Filter the list of organizations to the ones that are a sub-organization
    of the specified organization.

    "null" is a valid value to provide for this parameter. It means "where
    an organization has no parent (i.e. it is a 'root' organization)."

    - `OrganizationsAPIOrganizationID = string`

    - `"null"`

      Filter the list of organizations to the ones that are a sub-organization
      of the specified organization.

      "null" is a valid value to provide for this parameter. It means "where
      an organization has no parent (i.e. it is a 'root' organization)."

      - `"null"`

### Returns

- `errors: array of unknown`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: array of Organization`

  - `id: string`

  - `create_time: string`

  - `meta: object { flags, hierarchy_tags, managed_by }`

    - `flags: optional object { account_creation, account_deletion, account_migration, 2 more }`

      Enable features for Organizations.

      - `account_creation: string`

      - `account_deletion: string`

      - `account_migration: string`

      - `account_mobility: string`

      - `sub_org_creation: string`

    - `hierarchy_tags: optional array of string`

      Ordered chain of organization tags from the root organization down to
      (and including) this organization itself. Root organizations return a
      single-element array containing their own tag; sub-organizations return
      `[rootTag, ...intermediateTags, parentTag, selfTag]`. Useful for
      constructing authorization scopes that need to cover every ancestor
      in the hierarchy.

    - `managed_by: optional string`

  - `name: string`

  - `parent: optional object { id, name }`

    - `id: string`

    - `name: string`

  - `profile: optional AccountProfile`

    - `business_address: string`

    - `business_email: string`

    - `business_name: string`

    - `business_phone: string`

    - `external_metadata: string`

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
curl https://api.cloudflare.com/client/v4/organizations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
      "id": "a7b9c3d2e8f4g1h5i6j0k9l2m3n7o4p8",
      "create_time": "2019-12-27T18:11:19.117Z",
      "meta": {
        "flags": {
          "account_creation": "account_creation",
          "account_deletion": "account_deletion",
          "account_migration": "account_migration",
          "account_mobility": "account_mobility",
          "sub_org_creation": "sub_org_creation"
        },
        "hierarchy_tags": [
          "string"
        ],
        "managed_by": "managed_by"
      },
      "name": "name",
      "parent": {
        "id": "a7b9c3d2e8f4g1h5i6j0k9l2m3n7o4p8",
        "name": "name"
      },
      "profile": {
        "business_address": "business_address",
        "business_email": "business_email",
        "business_name": "business_name",
        "business_phone": "business_phone",
        "external_metadata": "external_metadata"
      }
    }
  ],
  "result_info": {
    "next_page_token": "next_page_token",
    "total_size": 0
  },
  "success": true
}
```

## Get organization

**get** `/organizations/{organization_id}`

Retrieve the details of a certain organization. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

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

- `result: Organization`

  References an Organization in the Cloudflare data model.

  - `id: string`

  - `create_time: string`

  - `meta: object { flags, hierarchy_tags, managed_by }`

    - `flags: optional object { account_creation, account_deletion, account_migration, 2 more }`

      Enable features for Organizations.

      - `account_creation: string`

      - `account_deletion: string`

      - `account_migration: string`

      - `account_mobility: string`

      - `sub_org_creation: string`

    - `hierarchy_tags: optional array of string`

      Ordered chain of organization tags from the root organization down to
      (and including) this organization itself. Root organizations return a
      single-element array containing their own tag; sub-organizations return
      `[rootTag, ...intermediateTags, parentTag, selfTag]`. Useful for
      constructing authorization scopes that need to cover every ancestor
      in the hierarchy.

    - `managed_by: optional string`

  - `name: string`

  - `parent: optional object { id, name }`

    - `id: string`

    - `name: string`

  - `profile: optional AccountProfile`

    - `business_address: string`

    - `business_email: string`

    - `business_name: string`

    - `business_phone: string`

    - `external_metadata: string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID \
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
    "id": "a7b9c3d2e8f4g1h5i6j0k9l2m3n7o4p8",
    "create_time": "2019-12-27T18:11:19.117Z",
    "meta": {
      "flags": {
        "account_creation": "account_creation",
        "account_deletion": "account_deletion",
        "account_migration": "account_migration",
        "account_mobility": "account_mobility",
        "sub_org_creation": "sub_org_creation"
      },
      "hierarchy_tags": [
        "string"
      ],
      "managed_by": "managed_by"
    },
    "name": "name",
    "parent": {
      "id": "a7b9c3d2e8f4g1h5i6j0k9l2m3n7o4p8",
      "name": "name"
    },
    "profile": {
      "business_address": "business_address",
      "business_email": "business_email",
      "business_name": "business_name",
      "business_phone": "business_phone",
      "external_metadata": "external_metadata"
    }
  },
  "success": true
}
```

## Create organization

**post** `/organizations`

Create a new organization for a user. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

### Body Parameters

- `name: string`

- `parent: optional object { id, name }`

  - `id: string`

  - `name: string`

- `profile: optional AccountProfile`

  - `business_address: string`

  - `business_email: string`

  - `business_name: string`

  - `business_phone: string`

  - `external_metadata: string`

### Returns

- `errors: array of unknown`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: Organization`

  References an Organization in the Cloudflare data model.

  - `id: string`

  - `create_time: string`

  - `meta: object { flags, hierarchy_tags, managed_by }`

    - `flags: optional object { account_creation, account_deletion, account_migration, 2 more }`

      Enable features for Organizations.

      - `account_creation: string`

      - `account_deletion: string`

      - `account_migration: string`

      - `account_mobility: string`

      - `sub_org_creation: string`

    - `hierarchy_tags: optional array of string`

      Ordered chain of organization tags from the root organization down to
      (and including) this organization itself. Root organizations return a
      single-element array containing their own tag; sub-organizations return
      `[rootTag, ...intermediateTags, parentTag, selfTag]`. Useful for
      constructing authorization scopes that need to cover every ancestor
      in the hierarchy.

    - `managed_by: optional string`

  - `name: string`

  - `parent: optional object { id, name }`

    - `id: string`

    - `name: string`

  - `profile: optional AccountProfile`

    - `business_address: string`

    - `business_email: string`

    - `business_name: string`

    - `business_phone: string`

    - `external_metadata: string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/organizations \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "name": "name"
        }'
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
    "id": "a7b9c3d2e8f4g1h5i6j0k9l2m3n7o4p8",
    "create_time": "2019-12-27T18:11:19.117Z",
    "meta": {
      "flags": {
        "account_creation": "account_creation",
        "account_deletion": "account_deletion",
        "account_migration": "account_migration",
        "account_mobility": "account_mobility",
        "sub_org_creation": "sub_org_creation"
      },
      "hierarchy_tags": [
        "string"
      ],
      "managed_by": "managed_by"
    },
    "name": "name",
    "parent": {
      "id": "a7b9c3d2e8f4g1h5i6j0k9l2m3n7o4p8",
      "name": "name"
    },
    "profile": {
      "business_address": "business_address",
      "business_email": "business_email",
      "business_name": "business_name",
      "business_phone": "business_phone",
      "external_metadata": "external_metadata"
    }
  },
  "success": true
}
```

## Modify organization.

**put** `/organizations/{organization_id}`

Modify organization. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

### Path Parameters

- `organization_id: string`

### Body Parameters

- `name: string`

- `parent: optional object { id, name }`

  - `id: string`

  - `name: string`

- `profile: optional AccountProfile`

  - `business_address: string`

  - `business_email: string`

  - `business_name: string`

  - `business_phone: string`

  - `external_metadata: string`

### Returns

- `errors: array of unknown`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: Organization`

  References an Organization in the Cloudflare data model.

  - `id: string`

  - `create_time: string`

  - `meta: object { flags, hierarchy_tags, managed_by }`

    - `flags: optional object { account_creation, account_deletion, account_migration, 2 more }`

      Enable features for Organizations.

      - `account_creation: string`

      - `account_deletion: string`

      - `account_migration: string`

      - `account_mobility: string`

      - `sub_org_creation: string`

    - `hierarchy_tags: optional array of string`

      Ordered chain of organization tags from the root organization down to
      (and including) this organization itself. Root organizations return a
      single-element array containing their own tag; sub-organizations return
      `[rootTag, ...intermediateTags, parentTag, selfTag]`. Useful for
      constructing authorization scopes that need to cover every ancestor
      in the hierarchy.

    - `managed_by: optional string`

  - `name: string`

  - `parent: optional object { id, name }`

    - `id: string`

    - `name: string`

  - `profile: optional AccountProfile`

    - `business_address: string`

    - `business_email: string`

    - `business_name: string`

    - `business_phone: string`

    - `external_metadata: string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "name": "name"
        }'
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
    "id": "a7b9c3d2e8f4g1h5i6j0k9l2m3n7o4p8",
    "create_time": "2019-12-27T18:11:19.117Z",
    "meta": {
      "flags": {
        "account_creation": "account_creation",
        "account_deletion": "account_deletion",
        "account_migration": "account_migration",
        "account_mobility": "account_mobility",
        "sub_org_creation": "sub_org_creation"
      },
      "hierarchy_tags": [
        "string"
      ],
      "managed_by": "managed_by"
    },
    "name": "name",
    "parent": {
      "id": "a7b9c3d2e8f4g1h5i6j0k9l2m3n7o4p8",
      "name": "name"
    },
    "profile": {
      "business_address": "business_address",
      "business_email": "business_email",
      "business_name": "business_name",
      "business_phone": "business_phone",
      "external_metadata": "external_metadata"
    }
  },
  "success": true
}
```

## Delete organization.

**delete** `/organizations/{organization_id}`

Delete an organization. The organization MUST be empty before deleting.
It must not contain any sub-organizations, accounts, members or users. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

**Access Control:** Restricted to enterprise organizations.

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

- `result: object { id }`

  - `id: string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID \
    -X DELETE \
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
    "id": "id"
  },
  "success": true
}
```

## Domain Types

### Organization

- `Organization object { id, create_time, meta, 3 more }`

  References an Organization in the Cloudflare data model.

  - `id: string`

  - `create_time: string`

  - `meta: object { flags, hierarchy_tags, managed_by }`

    - `flags: optional object { account_creation, account_deletion, account_migration, 2 more }`

      Enable features for Organizations.

      - `account_creation: string`

      - `account_deletion: string`

      - `account_migration: string`

      - `account_mobility: string`

      - `sub_org_creation: string`

    - `hierarchy_tags: optional array of string`

      Ordered chain of organization tags from the root organization down to
      (and including) this organization itself. Root organizations return a
      single-element array containing their own tag; sub-organizations return
      `[rootTag, ...intermediateTags, parentTag, selfTag]`. Useful for
      constructing authorization scopes that need to cover every ancestor
      in the hierarchy.

    - `managed_by: optional string`

  - `name: string`

  - `parent: optional object { id, name }`

    - `id: string`

    - `name: string`

  - `profile: optional AccountProfile`

    - `business_address: string`

    - `business_email: string`

    - `business_name: string`

    - `business_phone: string`

    - `external_metadata: string`

### Organization Delete Response

- `OrganizationDeleteResponse object { id }`

  - `id: string`

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

# Organization Profile

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

## Modify organization profile.

**put** `/organizations/{organization_id}/profile`

Modify organization profile. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

### Path Parameters

- `organization_id: string`

### Body Parameters

- `business_address: string`

- `business_email: string`

- `business_name: string`

- `business_phone: string`

- `external_metadata: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID/profile \
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

### Organization Profile

- `OrganizationProfile object { business_address, business_email, business_name, 2 more }`

  - `business_address: string`

  - `business_email: string`

  - `business_name: string`

  - `business_phone: string`

  - `external_metadata: string`

# Members

## List organization members

**get** `/organizations/{organization_id}/members`

List memberships for an Organization. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

### Path Parameters

- `organization_id: string`

### Query Parameters

- `page_size: optional number`

  The amount of items to return. Defaults to 10.

- `page_token: optional string`

  An opaque token returned from the last list response that when
  provided will retrieve the next page.

  Parameters used to filter the retrieved list must remain in subsequent
  requests with a page token.

- `status: optional array of "active" or "canceled"`

  Filter the list of memberships by membership status.

  - `"active"`

  - `"canceled"`

- `user: optional object { email }`

  - `email: optional string`

    Filter the list of memberships for a specific email that ends with a substring.

### Returns

- `errors: array of unknown`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: array of OrganizationMember`

  - `id: string`

    Organization Member ID

  - `create_time: string`

  - `meta: map[unknown]`

  - `status: "active" or "canceled"`

    - `"active"`

    - `"canceled"`

  - `update_time: string`

  - `user: object { id, email, name, two_factor_authentication_enabled }`

    - `id: string`

    - `email: string`

    - `name: string`

    - `two_factor_authentication_enabled: boolean`

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
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID/members \
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
      "id": "a7b9c3d2e8f4g1h5i6j0k9l2m3n7o4p8",
      "create_time": "2019-12-27T18:11:19.117Z",
      "meta": {
        "foo": {}
      },
      "status": "active",
      "update_time": "2019-12-27T18:11:19.117Z",
      "user": {
        "id": "id",
        "email": "email",
        "name": "name",
        "two_factor_authentication_enabled": true
      }
    }
  ],
  "result_info": {
    "next_page_token": "next_page_token",
    "total_size": 0
  },
  "success": true
}
```

## Get organization member

**get** `/organizations/{organization_id}/members/{member_id}`

Retrieve a single membership from an Organization. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

### Path Parameters

- `organization_id: string`

- `member_id: string`

  Organization Member ID

### Returns

- `errors: array of unknown`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: OrganizationMember`

  - `id: string`

    Organization Member ID

  - `create_time: string`

  - `meta: map[unknown]`

  - `status: "active" or "canceled"`

    - `"active"`

    - `"canceled"`

  - `update_time: string`

  - `user: object { id, email, name, two_factor_authentication_enabled }`

    - `id: string`

    - `email: string`

    - `name: string`

    - `two_factor_authentication_enabled: boolean`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID/members/$MEMBER_ID \
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
    "id": "a7b9c3d2e8f4g1h5i6j0k9l2m3n7o4p8",
    "create_time": "2019-12-27T18:11:19.117Z",
    "meta": {
      "foo": {}
    },
    "status": "active",
    "update_time": "2019-12-27T18:11:19.117Z",
    "user": {
      "id": "id",
      "email": "email",
      "name": "name",
      "two_factor_authentication_enabled": true
    }
  },
  "success": true
}
```

## Create organization member

**post** `/organizations/{organization_id}/members`

Create a membership that grants access to a specific Organization. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

### Path Parameters

- `organization_id: string`

### Body Parameters

- `member: object { user, status }`

  - `user: object { email }`

    - `email: string`

  - `status: optional "active" or "canceled"`

    - `"active"`

    - `"canceled"`

### Returns

- `errors: array of unknown`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: OrganizationMember`

  - `id: string`

    Organization Member ID

  - `create_time: string`

  - `meta: map[unknown]`

  - `status: "active" or "canceled"`

    - `"active"`

    - `"canceled"`

  - `update_time: string`

  - `user: object { id, email, name, two_factor_authentication_enabled }`

    - `id: string`

    - `email: string`

    - `name: string`

    - `two_factor_authentication_enabled: boolean`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID/members \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "member": {
            "user": {
              "email": "email"
            }
          }
        }'
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
    "id": "a7b9c3d2e8f4g1h5i6j0k9l2m3n7o4p8",
    "create_time": "2019-12-27T18:11:19.117Z",
    "meta": {
      "foo": {}
    },
    "status": "active",
    "update_time": "2019-12-27T18:11:19.117Z",
    "user": {
      "id": "id",
      "email": "email",
      "name": "name",
      "two_factor_authentication_enabled": true
    }
  },
  "success": true
}
```

## Delete organization member

**delete** `/organizations/{organization_id}/members/{member_id}`

Delete a membership to a particular Organization. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

### Path Parameters

- `organization_id: string`

- `member_id: string`

  Organization Member ID

### Example

```http
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID/members/$MEMBER_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

## Domain Types

### Organization Member

- `OrganizationMember object { id, create_time, meta, 3 more }`

  - `id: string`

    Organization Member ID

  - `create_time: string`

  - `meta: map[unknown]`

  - `status: "active" or "canceled"`

    - `"active"`

    - `"canceled"`

  - `update_time: string`

  - `user: object { id, email, name, two_factor_authentication_enabled }`

    - `id: string`

    - `email: string`

    - `name: string`

    - `two_factor_authentication_enabled: boolean`

# Logs

# Audit

## Get organization audit logs (Version 2)

**get** `/organizations/{organization_id}/logs/audit`

Gets a list of audit logs for an organization.

### Path Parameters

- `organization_id: string`

  The unique id that identifies the organization.

### Query Parameters

- `before: string`

  Limits the returned results to logs older than the specified date. This can be a date string 2019-04-30 (interpreted in UTC) or an absolute timestamp that conforms to RFC3339.

- `since: string`

  Limits the returned results to logs newer than the specified date. This can be a date string 2019-04-30 (interpreted in UTC) or an absolute timestamp that conforms to RFC3339.

- `id: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by their IDs.

- `action_result: optional object { not }`

  - `not: optional array of "success" or "failure"`

    Filters out audit logs by whether the action was successful or not.

    - `"success"`

    - `"failure"`

- `action_type: optional object { not }`

  - `not: optional array of "create" or "delete" or "view" or "update"`

    Filters out audit logs by the action type.

    - `"create"`

    - `"delete"`

    - `"view"`

    - `"update"`

- `actor_context: optional object { not }`

  - `not: optional array of "api_key" or "api_token" or "dash" or 2 more`

    Filters out audit logs by the actor context.

    - `"api_key"`

    - `"api_token"`

    - `"dash"`

    - `"oauth"`

    - `"origin_ca_key"`

- `actor_email: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the actor's email address.

- `actor_id: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the actor's user ID.

- `actor_ip_address: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs IP address where the action was initiated.

- `actor_token_id: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the API token ID when the actor context is an api_token or oauth.

- `actor_token_name: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the API token name when the actor context is an api_token or oauth.

- `actor_type: optional object { not }`

  - `not: optional array of "cloudflare_admin" or "system" or "user"`

    Filters out audit logs by the actor type.

    - `"cloudflare_admin"`

    - `"system"`

    - `"user"`

- `cursor: optional string`

  The cursor is an opaque token used to paginate through large sets of records. It indicates the position from which to continue when requesting the next set of records. A valid cursor value can be obtained from the cursor object in the result_info structure of a previous response.

- `direction: optional "desc" or "asc"`

  Sets sorting order.

  - `"desc"`

  - `"asc"`

- `limit: optional number`

  The number limits the objects to return. The cursor attribute may be used to iterate over the next batch of objects if there are more than the limit.

- `raw_cf_ray_id: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the response CF Ray ID.

- `raw_method: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the HTTP method for the API call.

- `raw_status_code: optional object { not }`

  - `not: optional array of number`

    Filters out audit logs by the response status code that was returned.

- `raw_uri: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the request URI.

- `resource_id: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the resource ID.

- `resource_product: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the Cloudflare product associated with the changed resource.

- `resource_scope: optional object { not }`

  - `not: optional array of "organizations"`

    Filters out audit logs by the resource scope, specifying whether the resource is associated with an organization.

    - `"organizations"`

- `resource_type: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs based on the unique type of resource changed by the action.

### Returns

- `errors: optional array of object { message }`

  - `message: string`

- `result: optional array of object { id, action, actor, 3 more }`

  - `id: optional string`

    A unique identifier for the audit log entry.

  - `action: optional object { description, result, time, type }`

    Provides information about the action performed.

    - `description: optional string`

      A short description of the action performed.

    - `result: optional string`

      The result of the action, indicating success or failure.

    - `time: optional string`

      A timestamp indicating when the action was logged.

    - `type: optional string`

      A short string that describes the action that was performed.

  - `actor: optional object { id, context, email, 4 more }`

    Provides details about the actor who performed the action.

    - `id: optional string`

      The ID of the actor who performed the action. If a user performed the action, this will be their User ID.

    - `context: optional "api_key" or "api_token" or "dash" or 2 more`

      - `"api_key"`

      - `"api_token"`

      - `"dash"`

      - `"oauth"`

      - `"origin_ca_key"`

    - `email: optional string`

      The email of the actor who performed the action.

    - `ip_address: optional string`

      The IP address of the request that performed the action.

    - `token_id: optional string`

      The API token ID when the actor context is an api_token or oauth.

    - `token_name: optional string`

      The API token name when the actor context is an api_token or oauth.

    - `type: optional "cloudflare_admin" or "system" or "user"`

      The type of actor.

      - `"cloudflare_admin"`

      - `"system"`

      - `"user"`

  - `organization: optional object { id }`

    Contains organization related information.

    - `id: optional string`

      A unique identifier for the organization.

  - `raw: optional object { cf_ray_id, method, status_code, 2 more }`

    Provides raw information about the request and response.

    - `cf_ray_id: optional string`

      The Cloudflare Ray ID for the request.

    - `method: optional string`

      The HTTP method of the request.

    - `status_code: optional number`

      The HTTP response status code returned by the API.

    - `uri: optional string`

      The URI of the request.

    - `user_agent: optional string`

      The client's user agent string sent with the request.

  - `resource: optional object { id, product, request, 3 more }`

    Provides details about the affected resource.

    - `id: optional string`

      The unique identifier for the affected resource.

    - `product: optional string`

      The Cloudflare product associated with the resource.

    - `request: optional unknown`

    - `response: optional unknown`

    - `scope: optional unknown`

      The scope of the resource.

    - `type: optional string`

      The type of the resource.

- `result_info: optional object { count, cursor }`

  Provides information about the result of the request, including count and cursor.

  - `count: optional string`

    The number of records returned in the response.

  - `cursor: optional string`

    The cursor token used for pagination.

- `success: optional true`

  Indicates whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID/logs/audit \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "action": {
        "description": "Add Member",
        "result": "success",
        "time": "2024-04-26T17:31:07Z",
        "type": "create"
      },
      "actor": {
        "id": "f6b5de0326bb5182b8a4840ee01ec774",
        "context": "dash",
        "email": "alice@example.com",
        "ip_address": "198.41.129.166",
        "token_id": "token_id",
        "token_name": "token_name",
        "type": "user"
      },
      "organization": {
        "id": "019c4f65e7607d8c9f6f6b58aa3aff50"
      },
      "raw": {
        "cf_ray_id": "8e9b1c60ef9e1c9a",
        "method": "POST",
        "status_code": 200,
        "uri": "/accounts/4bb334f7c94c4a29a045f03944f072e5/members",
        "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15"
      },
      "resource": {
        "id": "id",
        "product": "organizations",
        "request": {},
        "response": {},
        "scope": {},
        "type": "type"
      }
    }
  ],
  "result_info": {
    "count": "1",
    "cursor": "ASqdKd7dKgxh-aZ8bm0mZos1BtW4BdEqifCzNkEeGRzi_5SN_-362Y8sF-C1TRn60_6rd3z2dIajf9EAPyQ_NmIeAMkacmaJPXipqvP7PLU4t72wyqBeJfjmjdE="
  },
  "success": true
}
```

## Domain Types

### Audit List Response

- `AuditListResponse object { id, action, actor, 3 more }`

  - `id: optional string`

    A unique identifier for the audit log entry.

  - `action: optional object { description, result, time, type }`

    Provides information about the action performed.

    - `description: optional string`

      A short description of the action performed.

    - `result: optional string`

      The result of the action, indicating success or failure.

    - `time: optional string`

      A timestamp indicating when the action was logged.

    - `type: optional string`

      A short string that describes the action that was performed.

  - `actor: optional object { id, context, email, 4 more }`

    Provides details about the actor who performed the action.

    - `id: optional string`

      The ID of the actor who performed the action. If a user performed the action, this will be their User ID.

    - `context: optional "api_key" or "api_token" or "dash" or 2 more`

      - `"api_key"`

      - `"api_token"`

      - `"dash"`

      - `"oauth"`

      - `"origin_ca_key"`

    - `email: optional string`

      The email of the actor who performed the action.

    - `ip_address: optional string`

      The IP address of the request that performed the action.

    - `token_id: optional string`

      The API token ID when the actor context is an api_token or oauth.

    - `token_name: optional string`

      The API token name when the actor context is an api_token or oauth.

    - `type: optional "cloudflare_admin" or "system" or "user"`

      The type of actor.

      - `"cloudflare_admin"`

      - `"system"`

      - `"user"`

  - `organization: optional object { id }`

    Contains organization related information.

    - `id: optional string`

      A unique identifier for the organization.

  - `raw: optional object { cf_ray_id, method, status_code, 2 more }`

    Provides raw information about the request and response.

    - `cf_ray_id: optional string`

      The Cloudflare Ray ID for the request.

    - `method: optional string`

      The HTTP method of the request.

    - `status_code: optional number`

      The HTTP response status code returned by the API.

    - `uri: optional string`

      The URI of the request.

    - `user_agent: optional string`

      The client's user agent string sent with the request.

  - `resource: optional object { id, product, request, 3 more }`

    Provides details about the affected resource.

    - `id: optional string`

      The unique identifier for the affected resource.

    - `product: optional string`

      The Cloudflare product associated with the resource.

    - `request: optional unknown`

    - `response: optional unknown`

    - `scope: optional unknown`

      The scope of the resource.

    - `type: optional string`

      The type of the resource.

# Billing

# Usage

## Get Organization Usage (Version 2, Alpha, Restricted)

**get** `/organizations/{organization_id}/billable/usage`

Returns cost and usage data for all accounts within an organization,
aligned with the [FinOps FOCUS v1.3](https://focus.finops.org/focus-specification/v1-3/)
Cost and Usage dataset specification.

Each record represents one billable metric for one account on one day.
This includes all metered usage, including usage that falls within
free-tier allowances and may result in zero cost. The response
includes usage for every account belonging to the specified
organization.

**Note:** Cost and pricing fields are not yet populated and
will be absent from responses until billing integration is complete.

When `from` and `to` are omitted, defaults to the start of the current
month through today. The maximum date range is 31 days.

### Path Parameters

- `organization_id: string`

  Represents a Cloudflare resource identifier tag.

### Query Parameters

- `from: optional string`

  Start date for the usage query (ISO 8601). Required if `to` is set. When omitted along with `to`, defaults to the start of the current month. Filters by charge period (when consumption happened), not billing period. The maximum date range is 31 days.

- `metric: optional string`

  Filter results by billable metric id (e.g., workers_standard_requests).

- `to: optional string`

  End date for the usage query (ISO 8601). Required if `from` is set. When omitted along with `from`, defaults to today. Filters by charge period (when consumption happened), not billing period. The maximum date range is 31 days.

### Returns

- `errors: array of object { message, code }`

  Contains error details if the request failed.

  - `message: string`

    Describes the error or notice.

  - `code: optional number`

    Identifies the error or notice type.

- `messages: array of object { message, code }`

  Contains informational notices about the response.

  - `message: string`

    Describes the error or notice.

  - `code: optional number`

    Identifies the error or notice type.

- `result: array of object { BillingAccountId, BillingAccountName, ChargeCategory, 30 more }`

  Contains the array of cost and usage records.

  - `BillingAccountId: string`

    Public identifier of the Cloudflare account (account tag).

  - `BillingAccountName: string`

    Display name of the Cloudflare account.

  - `ChargeCategory: "Usage"`

    Highest-level classification of a charge based on the nature of how it gets billed. Currently only "Usage" is supported.

    - `"Usage"`

  - `ChargeDescription: string`

    Self-contained summary of the charge's purpose and price.

  - `ChargeFrequency: "Usage-Based"`

    Indicates how often a charge occurs. Currently only "Usage-Based" is supported.

    - `"Usage-Based"`

  - `ChargePeriodEnd: string`

    Exclusive end of the time interval during which the usage was consumed.

  - `ChargePeriodStart: string`

    Inclusive start of the time interval during which the usage was consumed.

  - `ConsumedQuantity: number`

    Measured usage amount within the charge period. Reflects raw metered consumption before pricing transformations.

  - `ConsumedUnit: string`

    Unit of measure for the consumed quantity (e.g., "GB", "Requests", "vCPU-Hours").

  - `HostProviderName: string`

    Name of the entity providing the underlying infrastructure or platform.

  - `InvoiceIssuerName: string`

    Name of the entity responsible for invoicing for the services consumed.

  - `ServiceProviderName: string`

    Name of the entity that made the services available for purchase.

  - `x_BillableMetricName: string`

    The display name of the billable metric. Cloudflare extension; replaces FOCUS SkuMeter.

  - `BilledCost: optional number`

    A charge serving as the basis for invoicing, inclusive of all reduced rates and discounts while excluding the amortization of upfront charges (one-time or recurring).

  - `BillingCurrency: optional string`

    Currency that a charge was billed in (ISO 4217).

  - `BillingPeriodEnd: optional string`

    Exclusive end of the billing cycle that contains this usage record.

  - `BillingPeriodStart: optional string`

    Inclusive start of the billing cycle that contains this usage record.

  - `ChargeClass: optional "Correction"`

    Indicates whether the row represents a correction to one or more charges invoiced in a previous billing period.

    - `"Correction"`

  - `ContractedCost: optional number`

    Cost calculated by multiplying ContractedUnitPrice and the corresponding PricingQuantity.

  - `ContractedUnitPrice: optional number`

    The agreed-upon unit price for a single PricingUnit of the associated billable metric, inclusive of negotiated discounts, if present, while excluding any other discounts.

  - `EffectiveCost: optional number`

    The amortized cost of the charge after applying all reduced rates, discounts, and the applicable portion of relevant, prepaid purchases (one-time or recurring) that covered the charge.

  - `ListCost: optional number`

    Cost calculated by multiplying ListUnitPrice and the corresponding PricingQuantity.

  - `ListUnitPrice: optional number`

    Suggested provider-published unit price for a single PricingUnit of the associated billable metric, exclusive of any discounts.

  - `PricingQuantity: optional number`

    Volume of a given service used or purchased, based on the PricingUnit.

  - `PricingUnit: optional string`

    Provider-specified measurement unit for determining unit prices, indicating how the provider rates measured usage after applying pricing rules like block pricing.

  - `RegionId: optional string`

    Provider-assigned identifier for an isolated geographic area where a service is provided.

  - `RegionName: optional string`

    Name of an isolated geographic area where a service is provided.

  - `SubAccountId: optional string`

    Unique identifier assigned to a grouping of services. For Cloudflare, this is the subscription or contract ID.

  - `SubAccountName: optional string`

    Name assigned to a grouping of services. For Cloudflare, this is the subscription or contract display name.

  - `x_BillableMetricId: optional string`

    The unique identifier for the billable metric in the Cloudflare catalog. Cloudflare extension; replaces FOCUS SkuId.

  - `x_ProductFamilyName: optional string`

    The product family the charge belongs to (e.g., "R2", "Workers"). Cloudflare extension; replaces FOCUS ServiceName.

  - `x_ZoneId: optional string`

    The identifier for the Cloudflare zone (zone tag). Cloudflare extension.

  - `x_ZoneName: optional string`

    The display name of the Cloudflare zone. Cloudflare extension.

- `success: true`

  Indicates whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID/billable/usage \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 0
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 0
    }
  ],
  "result": [
    {
      "BillingAccountId": "023e105f4ecef8ad9ca31a8372d0c353",
      "BillingAccountName": "My Account",
      "ChargeCategory": "Usage",
      "ChargeDescription": "Workers Standard Requests — daily usage",
      "ChargeFrequency": "Usage-Based",
      "ChargePeriodEnd": "2025-05-02T00:00:00Z",
      "ChargePeriodStart": "2025-05-01T00:00:00Z",
      "ConsumedQuantity": 150000,
      "ConsumedUnit": "Requests",
      "HostProviderName": "Cloudflare",
      "InvoiceIssuerName": "Cloudflare",
      "ServiceProviderName": "Cloudflare",
      "x_BillableMetricName": "Workers Standard Requests",
      "BilledCost": 0,
      "BillingCurrency": "USD",
      "BillingPeriodEnd": "2025-06-01T00:00:00Z",
      "BillingPeriodStart": "2025-05-01T00:00:00Z",
      "ChargeClass": "Correction",
      "ContractedCost": 0.75,
      "ContractedUnitPrice": 0.000005,
      "EffectiveCost": 0,
      "ListCost": 0.75,
      "ListUnitPrice": 0.000005,
      "PricingQuantity": 150000,
      "PricingUnit": "Requests",
      "RegionId": "EEUR",
      "RegionName": "Eastern Europe",
      "SubAccountId": "c9bd752d-9ca8-411d-b804-be44a758057f",
      "SubAccountName": "My Subscription",
      "x_BillableMetricId": "workers_standard_requests",
      "x_ProductFamilyName": "Workers",
      "x_ZoneId": "023e105f4ecef8ad9ca31a8372d0c353",
      "x_ZoneName": "example.com"
    }
  ],
  "success": true
}
```

## Domain Types

### Usage Get Response

- `UsageGetResponse = array of object { BillingAccountId, BillingAccountName, ChargeCategory, 30 more }`

  Contains the array of cost and usage records.

  - `BillingAccountId: string`

    Public identifier of the Cloudflare account (account tag).

  - `BillingAccountName: string`

    Display name of the Cloudflare account.

  - `ChargeCategory: "Usage"`

    Highest-level classification of a charge based on the nature of how it gets billed. Currently only "Usage" is supported.

    - `"Usage"`

  - `ChargeDescription: string`

    Self-contained summary of the charge's purpose and price.

  - `ChargeFrequency: "Usage-Based"`

    Indicates how often a charge occurs. Currently only "Usage-Based" is supported.

    - `"Usage-Based"`

  - `ChargePeriodEnd: string`

    Exclusive end of the time interval during which the usage was consumed.

  - `ChargePeriodStart: string`

    Inclusive start of the time interval during which the usage was consumed.

  - `ConsumedQuantity: number`

    Measured usage amount within the charge period. Reflects raw metered consumption before pricing transformations.

  - `ConsumedUnit: string`

    Unit of measure for the consumed quantity (e.g., "GB", "Requests", "vCPU-Hours").

  - `HostProviderName: string`

    Name of the entity providing the underlying infrastructure or platform.

  - `InvoiceIssuerName: string`

    Name of the entity responsible for invoicing for the services consumed.

  - `ServiceProviderName: string`

    Name of the entity that made the services available for purchase.

  - `x_BillableMetricName: string`

    The display name of the billable metric. Cloudflare extension; replaces FOCUS SkuMeter.

  - `BilledCost: optional number`

    A charge serving as the basis for invoicing, inclusive of all reduced rates and discounts while excluding the amortization of upfront charges (one-time or recurring).

  - `BillingCurrency: optional string`

    Currency that a charge was billed in (ISO 4217).

  - `BillingPeriodEnd: optional string`

    Exclusive end of the billing cycle that contains this usage record.

  - `BillingPeriodStart: optional string`

    Inclusive start of the billing cycle that contains this usage record.

  - `ChargeClass: optional "Correction"`

    Indicates whether the row represents a correction to one or more charges invoiced in a previous billing period.

    - `"Correction"`

  - `ContractedCost: optional number`

    Cost calculated by multiplying ContractedUnitPrice and the corresponding PricingQuantity.

  - `ContractedUnitPrice: optional number`

    The agreed-upon unit price for a single PricingUnit of the associated billable metric, inclusive of negotiated discounts, if present, while excluding any other discounts.

  - `EffectiveCost: optional number`

    The amortized cost of the charge after applying all reduced rates, discounts, and the applicable portion of relevant, prepaid purchases (one-time or recurring) that covered the charge.

  - `ListCost: optional number`

    Cost calculated by multiplying ListUnitPrice and the corresponding PricingQuantity.

  - `ListUnitPrice: optional number`

    Suggested provider-published unit price for a single PricingUnit of the associated billable metric, exclusive of any discounts.

  - `PricingQuantity: optional number`

    Volume of a given service used or purchased, based on the PricingUnit.

  - `PricingUnit: optional string`

    Provider-specified measurement unit for determining unit prices, indicating how the provider rates measured usage after applying pricing rules like block pricing.

  - `RegionId: optional string`

    Provider-assigned identifier for an isolated geographic area where a service is provided.

  - `RegionName: optional string`

    Name of an isolated geographic area where a service is provided.

  - `SubAccountId: optional string`

    Unique identifier assigned to a grouping of services. For Cloudflare, this is the subscription or contract ID.

  - `SubAccountName: optional string`

    Name assigned to a grouping of services. For Cloudflare, this is the subscription or contract display name.

  - `x_BillableMetricId: optional string`

    The unique identifier for the billable metric in the Cloudflare catalog. Cloudflare extension; replaces FOCUS SkuId.

  - `x_ProductFamilyName: optional string`

    The product family the charge belongs to (e.g., "R2", "Workers"). Cloudflare extension; replaces FOCUS ServiceName.

  - `x_ZoneId: optional string`

    The identifier for the Cloudflare zone (zone tag). Cloudflare extension.

  - `x_ZoneName: optional string`

    The display name of the Cloudflare zone. Cloudflare extension.
