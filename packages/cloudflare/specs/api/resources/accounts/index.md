# Accounts

## List Accounts

**get** `/accounts`

List all accounts you have ownership or verified access to.

### Query Parameters

- `direction: optional "asc" or "desc"`

  Direction to order results.

  - `"asc"`

  - `"desc"`

- `name: optional string`

  Name of the account.

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page.

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

- `result: optional array of Account`

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

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts \
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "Demo Account",
      "type": "standard",
      "created_on": "2014-03-01T12:21:02.0000Z",
      "managed_by": {
        "parent_org_id": "4536bcfad5faccb111b47003c79917fa",
        "parent_org_name": "Demo Parent Organization"
      },
      "settings": {
        "abuse_contact_email": "abuse_contact_email",
        "enforce_twofactor": true
      }
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Account Details

**get** `/accounts/{account_id}`

Get information about a specific account that you are a member of.

### Path Parameters

- `account_id: string`

  Account identifier tag.

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

- `result: optional Account`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID \
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "name": "Demo Account",
    "type": "standard",
    "created_on": "2014-03-01T12:21:02.0000Z",
    "managed_by": {
      "parent_org_id": "4536bcfad5faccb111b47003c79917fa",
      "parent_org_name": "Demo Parent Organization"
    },
    "settings": {
      "abuse_contact_email": "abuse_contact_email",
      "enforce_twofactor": true
    }
  }
}
```

## Create an account

**post** `/accounts`

Create an account (only available for tenant admins at this time)

### Body Parameters

- `name: string`

  Account name

- `type: optional "standard" or "enterprise"`

  - `"standard"`

  - `"enterprise"`

- `unit: optional object { id }`

  information related to the tenant unit, and optionally, an id of the unit to create the account on. see https://developers.cloudflare.com/tenant/how-to/manage-accounts/

  - `id: optional string`

    Tenant unit ID

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

- `result: optional Account`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts \
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "name": "Demo Account",
    "type": "standard",
    "created_on": "2014-03-01T12:21:02.0000Z",
    "managed_by": {
      "parent_org_id": "4536bcfad5faccb111b47003c79917fa",
      "parent_org_name": "Demo Parent Organization"
    },
    "settings": {
      "abuse_contact_email": "abuse_contact_email",
      "enforce_twofactor": true
    }
  }
}
```

## Update Account

**put** `/accounts/{account_id}`

Update an existing account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Body Parameters

- `id: string`

  Identifier

- `name: string`

  Account name

- `type: "standard" or "enterprise"`

  - `"standard"`

  - `"enterprise"`

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

- `result: optional Account`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "id": "023e105f4ecef8ad9ca31a8372d0c353",
          "name": "Demo Account",
          "type": "standard"
        }'
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "name": "Demo Account",
    "type": "standard",
    "created_on": "2014-03-01T12:21:02.0000Z",
    "managed_by": {
      "parent_org_id": "4536bcfad5faccb111b47003c79917fa",
      "parent_org_name": "Demo Parent Organization"
    },
    "settings": {
      "abuse_contact_email": "abuse_contact_email",
      "enforce_twofactor": true
    }
  }
}
```

## Delete a specific account

**delete** `/accounts/{account_id}`

Delete a specific account (only available for tenant admins at this time). This is a permanent operation that will delete any zones or other resources under the account

### Path Parameters

- `account_id: string`

  The account ID of the account to be deleted

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

- `result: optional object { id }`

  - `id: string`

    Identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID \
    -X DELETE \
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```

## Domain Types

### Account

- `Account object { id, name, type, 3 more }`

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

### Account Delete Response

- `AccountDeleteResponse object { id }`

  - `id: string`

    Identifier

# Account Organizations

## Move account

**post** `/accounts/{account_id}/move`

Move an account within an organization hierarchy or an account outside an organization. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

### Path Parameters

- `account_id: string`

### Body Parameters

- `destination_organization_id: string`

### Returns

- `errors: array of unknown`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: object { account_id, destination_organization_id, source_organization_id }`

  - `account_id: string`

  - `destination_organization_id: string`

  - `source_organization_id: string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/move \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "destination_organization_id": "destination_organization_id"
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
    "account_id": "account_id",
    "destination_organization_id": "destination_organization_id",
    "source_organization_id": "source_organization_id"
  },
  "success": true
}
```

## Domain Types

### Account Organization Create Response

- `AccountOrganizationCreateResponse object { account_id, destination_organization_id, source_organization_id }`

  - `account_id: string`

  - `destination_organization_id: string`

  - `source_organization_id: string`

# Account Profile

## Get account profile

**get** `/accounts/{account_id}/profile`

Retrieves the profile information for a specific Cloudflare account, including organization details, settings, and metadata. This endpoint is commonly used to verify account access and retrieve account-level configuration.

### Path Parameters

- `account_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/profile \
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

## Modify account profile

**put** `/accounts/{account_id}/profile`

Updates the profile information for a Cloudflare account. Allows modification of account-level settings and organizational details. Requires Account Settings Write permission.

### Path Parameters

- `account_id: string`

### Body Parameters

- `business_address: string`

- `business_email: string`

- `business_name: string`

- `business_phone: string`

- `external_metadata: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/profile \
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

### Account Profile

- `AccountProfile object { business_address, business_email, business_name, 2 more }`

  - `business_address: string`

  - `business_email: string`

  - `business_name: string`

  - `business_phone: string`

  - `external_metadata: string`

# Members

## List Members

**get** `/accounts/{account_id}/members`

List all members of an account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Query Parameters

- `direction: optional "asc" or "desc"`

  Direction to order results.

  - `"asc"`

  - `"desc"`

- `order: optional "user.first_name" or "user.last_name" or "user.email" or "status"`

  Field to order results by.

  - `"user.first_name"`

  - `"user.last_name"`

  - `"user.email"`

  - `"status"`

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page.

- `status: optional "accepted" or "pending" or "rejected"`

  A member's status in the account.

  - `"accepted"`

  - `"pending"`

  - `"rejected"`

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

- `result: optional array of Member`

  - `id: optional string`

    Membership identifier tag.

  - `email: optional string`

    The contact email address of the user.

  - `policies: optional array of object { id, access, permission_groups, resource_groups }`

    Access policy for the membership

    - `id: optional string`

      Policy identifier.

    - `access: optional "allow" or "deny"`

      Allow or deny operations against the resources.

      - `"allow"`

      - `"deny"`

    - `permission_groups: optional array of object { id, meta, name }`

      A set of permission groups that are specified to the policy.

      - `id: string`

        Identifier of the permission group.

      - `meta: optional object { key, value }`

        Attributes associated to the permission group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the permission group.

    - `resource_groups: optional array of object { id, scope, meta, name }`

      A list of resource groups that the policy applies to.

      - `id: string`

        Identifier of the resource group.

      - `scope: array of object { key, objects }`

        The scope associated to the resource group

        - `key: string`

          This is a combination of pre-defined resource name and identifier (like Account ID etc.)

        - `objects: array of object { key }`

          A list of scope objects for additional context.

          - `key: string`

            This is a combination of pre-defined resource name and identifier (like Zone ID etc.)

      - `meta: optional object { key, value }`

        Attributes associated to the resource group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the resource group.

  - `roles: optional array of Role`

    Roles assigned to this Member.

    - `id: string`

      Role identifier tag.

    - `description: string`

      Description of role's permissions.

    - `name: string`

      Role name.

    - `permissions: object { analytics, billing, cache_purge, 9 more }`

      - `analytics: optional PermissionGrant`

        - `read: optional boolean`

        - `write: optional boolean`

      - `billing: optional PermissionGrant`

      - `cache_purge: optional PermissionGrant`

      - `dns: optional PermissionGrant`

      - `dns_records: optional PermissionGrant`

      - `lb: optional PermissionGrant`

      - `logs: optional PermissionGrant`

      - `organization: optional PermissionGrant`

      - `ssl: optional PermissionGrant`

      - `waf: optional PermissionGrant`

      - `zone_settings: optional PermissionGrant`

      - `zones: optional PermissionGrant`

  - `status: optional "accepted" or "pending"`

    A member's status in the account.

    - `"accepted"`

    - `"pending"`

  - `user: optional object { email, id, first_name, 2 more }`

    Details of the user associated to the membership.

    - `email: string`

      The contact email address of the user.

    - `id: optional string`

      Identifier

    - `first_name: optional string`

      User's first name

    - `last_name: optional string`

      User's last name

    - `two_factor_authentication_enabled: optional boolean`

      Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/members \
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
      "id": "4536bcfad5faccb111b47003c79917fa",
      "email": "user@example.com",
      "policies": [
        {
          "id": "f267e341f3dd4697bd3b9f71dd96247f",
          "access": "allow",
          "permission_groups": [
            {
              "id": "c8fed203ed3043cba015a93ad1616f1f",
              "meta": {
                "key": "key",
                "value": "value"
              },
              "name": "Zone Read"
            },
            {
              "id": "82e64a83756745bbbb1c9c2701bf816b",
              "meta": {
                "key": "key",
                "value": "value"
              },
              "name": "Magic Network Monitoring"
            }
          ],
          "resource_groups": [
            {
              "id": "6d7f2f5f5b1d4a0e9081fdc98d432fd1",
              "scope": [
                {
                  "key": "com.cloudflare.api.account.eb78d65290b24279ba6f44721b3ea3c4",
                  "objects": [
                    {
                      "key": "com.cloudflare.api.account.zone.23f8d65290b24279ba6f44721b3eaad5"
                    }
                  ]
                }
              ],
              "meta": {
                "key": "key",
                "value": "value"
              },
              "name": "com.cloudflare.api.account.eb78d65290b24279ba6f44721b3ea3c4"
            }
          ]
        }
      ],
      "roles": [
        {
          "id": "3536bcfad5faccb999b47003c79917fb",
          "description": "Administrative access to the entire Account",
          "name": "Account Administrator",
          "permissions": {
            "analytics": {
              "read": true,
              "write": false
            },
            "billing": {
              "read": true,
              "write": false
            },
            "cache_purge": {
              "read": true,
              "write": false
            },
            "dns": {
              "read": true,
              "write": false
            },
            "dns_records": {
              "read": true,
              "write": false
            },
            "lb": {
              "read": true,
              "write": false
            },
            "logs": {
              "read": true,
              "write": false
            },
            "organization": {
              "read": true,
              "write": false
            },
            "ssl": {
              "read": true,
              "write": false
            },
            "waf": {
              "read": true,
              "write": false
            },
            "zone_settings": {
              "read": true,
              "write": false
            },
            "zones": {
              "read": true,
              "write": true
            }
          }
        }
      ],
      "status": "accepted",
      "user": {
        "email": "user@example.com",
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "first_name": "John",
        "last_name": "Appleseed",
        "two_factor_authentication_enabled": true
      }
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Member Details

**get** `/accounts/{account_id}/members/{member_id}`

Get information about a specific member of an account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `member_id: string`

  Membership identifier tag.

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

- `result: optional Member`

  - `id: optional string`

    Membership identifier tag.

  - `email: optional string`

    The contact email address of the user.

  - `policies: optional array of object { id, access, permission_groups, resource_groups }`

    Access policy for the membership

    - `id: optional string`

      Policy identifier.

    - `access: optional "allow" or "deny"`

      Allow or deny operations against the resources.

      - `"allow"`

      - `"deny"`

    - `permission_groups: optional array of object { id, meta, name }`

      A set of permission groups that are specified to the policy.

      - `id: string`

        Identifier of the permission group.

      - `meta: optional object { key, value }`

        Attributes associated to the permission group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the permission group.

    - `resource_groups: optional array of object { id, scope, meta, name }`

      A list of resource groups that the policy applies to.

      - `id: string`

        Identifier of the resource group.

      - `scope: array of object { key, objects }`

        The scope associated to the resource group

        - `key: string`

          This is a combination of pre-defined resource name and identifier (like Account ID etc.)

        - `objects: array of object { key }`

          A list of scope objects for additional context.

          - `key: string`

            This is a combination of pre-defined resource name and identifier (like Zone ID etc.)

      - `meta: optional object { key, value }`

        Attributes associated to the resource group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the resource group.

  - `roles: optional array of Role`

    Roles assigned to this Member.

    - `id: string`

      Role identifier tag.

    - `description: string`

      Description of role's permissions.

    - `name: string`

      Role name.

    - `permissions: object { analytics, billing, cache_purge, 9 more }`

      - `analytics: optional PermissionGrant`

        - `read: optional boolean`

        - `write: optional boolean`

      - `billing: optional PermissionGrant`

      - `cache_purge: optional PermissionGrant`

      - `dns: optional PermissionGrant`

      - `dns_records: optional PermissionGrant`

      - `lb: optional PermissionGrant`

      - `logs: optional PermissionGrant`

      - `organization: optional PermissionGrant`

      - `ssl: optional PermissionGrant`

      - `waf: optional PermissionGrant`

      - `zone_settings: optional PermissionGrant`

      - `zones: optional PermissionGrant`

  - `status: optional "accepted" or "pending"`

    A member's status in the account.

    - `"accepted"`

    - `"pending"`

  - `user: optional object { email, id, first_name, 2 more }`

    Details of the user associated to the membership.

    - `email: string`

      The contact email address of the user.

    - `id: optional string`

      Identifier

    - `first_name: optional string`

      User's first name

    - `last_name: optional string`

      User's last name

    - `two_factor_authentication_enabled: optional boolean`

      Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/members/$MEMBER_ID \
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
  "result": {
    "id": "4536bcfad5faccb111b47003c79917fa",
    "email": "user@example.com",
    "policies": [
      {
        "id": "f267e341f3dd4697bd3b9f71dd96247f",
        "access": "allow",
        "permission_groups": [
          {
            "id": "c8fed203ed3043cba015a93ad1616f1f",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Zone Read"
          },
          {
            "id": "82e64a83756745bbbb1c9c2701bf816b",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Magic Network Monitoring"
          }
        ],
        "resource_groups": [
          {
            "id": "6d7f2f5f5b1d4a0e9081fdc98d432fd1",
            "scope": [
              {
                "key": "com.cloudflare.api.account.eb78d65290b24279ba6f44721b3ea3c4",
                "objects": [
                  {
                    "key": "com.cloudflare.api.account.zone.23f8d65290b24279ba6f44721b3eaad5"
                  }
                ]
              }
            ],
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "com.cloudflare.api.account.eb78d65290b24279ba6f44721b3ea3c4"
          }
        ]
      }
    ],
    "roles": [
      {
        "id": "3536bcfad5faccb999b47003c79917fb",
        "description": "Administrative access to the entire Account",
        "name": "Account Administrator",
        "permissions": {
          "analytics": {
            "read": true,
            "write": false
          },
          "billing": {
            "read": true,
            "write": false
          },
          "cache_purge": {
            "read": true,
            "write": false
          },
          "dns": {
            "read": true,
            "write": false
          },
          "dns_records": {
            "read": true,
            "write": false
          },
          "lb": {
            "read": true,
            "write": false
          },
          "logs": {
            "read": true,
            "write": false
          },
          "organization": {
            "read": true,
            "write": false
          },
          "ssl": {
            "read": true,
            "write": false
          },
          "waf": {
            "read": true,
            "write": false
          },
          "zone_settings": {
            "read": true,
            "write": false
          },
          "zones": {
            "read": true,
            "write": true
          }
        }
      }
    ],
    "status": "accepted",
    "user": {
      "email": "user@example.com",
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "first_name": "John",
      "last_name": "Appleseed",
      "two_factor_authentication_enabled": true
    }
  }
}
```

## Add Member

**post** `/accounts/{account_id}/members`

Add a user to the list of members for this account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Body Parameters

- `body: object { email, roles, status }  or object { email, policies, status }`

  - `IAMCreateMemberWithRoles object { email, roles, status }`

    - `email: string`

      The contact email address of the user.

    - `roles: array of string`

      Array of roles associated with this member.

    - `status: optional "accepted" or "pending"`

      Status of the member invitation. If not provided during creation, defaults to 'pending'.
      Changing from 'accepted' back to 'pending' will trigger a replacement of the member resource in Terraform.

      - `"accepted"`

      - `"pending"`

  - `IAMCreateMemberWithPolicies object { email, policies, status }`

    - `email: string`

      The contact email address of the user.

    - `policies: array of object { id, access, permission_groups, resource_groups }`

      Array of policies associated with this member.

      - `id: string`

        Policy identifier.

      - `access: "allow" or "deny"`

        Allow or deny operations against the resources.

        - `"allow"`

        - `"deny"`

      - `permission_groups: array of object { id }`

        A set of permission groups that are specified to the policy.

        - `id: string`

          Identifier of the group.

      - `resource_groups: array of object { id }`

        A list of resource groups that the policy applies to.

        - `id: string`

          Identifier of the group.

    - `status: optional "accepted" or "pending"`

      Status of the member invitation. If not provided during creation, defaults to 'pending'.
      Changing from 'accepted' back to 'pending' will trigger a replacement of the member resource in Terraform.

      - `"accepted"`

      - `"pending"`

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

- `result: optional Member`

  - `id: optional string`

    Membership identifier tag.

  - `email: optional string`

    The contact email address of the user.

  - `policies: optional array of object { id, access, permission_groups, resource_groups }`

    Access policy for the membership

    - `id: optional string`

      Policy identifier.

    - `access: optional "allow" or "deny"`

      Allow or deny operations against the resources.

      - `"allow"`

      - `"deny"`

    - `permission_groups: optional array of object { id, meta, name }`

      A set of permission groups that are specified to the policy.

      - `id: string`

        Identifier of the permission group.

      - `meta: optional object { key, value }`

        Attributes associated to the permission group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the permission group.

    - `resource_groups: optional array of object { id, scope, meta, name }`

      A list of resource groups that the policy applies to.

      - `id: string`

        Identifier of the resource group.

      - `scope: array of object { key, objects }`

        The scope associated to the resource group

        - `key: string`

          This is a combination of pre-defined resource name and identifier (like Account ID etc.)

        - `objects: array of object { key }`

          A list of scope objects for additional context.

          - `key: string`

            This is a combination of pre-defined resource name and identifier (like Zone ID etc.)

      - `meta: optional object { key, value }`

        Attributes associated to the resource group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the resource group.

  - `roles: optional array of Role`

    Roles assigned to this Member.

    - `id: string`

      Role identifier tag.

    - `description: string`

      Description of role's permissions.

    - `name: string`

      Role name.

    - `permissions: object { analytics, billing, cache_purge, 9 more }`

      - `analytics: optional PermissionGrant`

        - `read: optional boolean`

        - `write: optional boolean`

      - `billing: optional PermissionGrant`

      - `cache_purge: optional PermissionGrant`

      - `dns: optional PermissionGrant`

      - `dns_records: optional PermissionGrant`

      - `lb: optional PermissionGrant`

      - `logs: optional PermissionGrant`

      - `organization: optional PermissionGrant`

      - `ssl: optional PermissionGrant`

      - `waf: optional PermissionGrant`

      - `zone_settings: optional PermissionGrant`

      - `zones: optional PermissionGrant`

  - `status: optional "accepted" or "pending"`

    A member's status in the account.

    - `"accepted"`

    - `"pending"`

  - `user: optional object { email, id, first_name, 2 more }`

    Details of the user associated to the membership.

    - `email: string`

      The contact email address of the user.

    - `id: optional string`

      Identifier

    - `first_name: optional string`

      User's first name

    - `last_name: optional string`

      User's last name

    - `two_factor_authentication_enabled: optional boolean`

      Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/members \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "email": "user@example.com",
          "roles": [
            "3536bcfad5faccb999b47003c79917fb"
          ]
        }'
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
  "result": {
    "id": "4536bcfad5faccb111b47003c79917fa",
    "email": "user@example.com",
    "policies": [
      {
        "id": "f267e341f3dd4697bd3b9f71dd96247f",
        "access": "allow",
        "permission_groups": [
          {
            "id": "c8fed203ed3043cba015a93ad1616f1f",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Zone Read"
          },
          {
            "id": "82e64a83756745bbbb1c9c2701bf816b",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Magic Network Monitoring"
          }
        ],
        "resource_groups": [
          {
            "id": "6d7f2f5f5b1d4a0e9081fdc98d432fd1",
            "scope": [
              {
                "key": "com.cloudflare.api.account.eb78d65290b24279ba6f44721b3ea3c4",
                "objects": [
                  {
                    "key": "com.cloudflare.api.account.zone.23f8d65290b24279ba6f44721b3eaad5"
                  }
                ]
              }
            ],
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "com.cloudflare.api.account.eb78d65290b24279ba6f44721b3ea3c4"
          }
        ]
      }
    ],
    "roles": [
      {
        "id": "3536bcfad5faccb999b47003c79917fb",
        "description": "Administrative access to the entire Account",
        "name": "Account Administrator",
        "permissions": {
          "analytics": {
            "read": true,
            "write": false
          },
          "billing": {
            "read": true,
            "write": false
          },
          "cache_purge": {
            "read": true,
            "write": false
          },
          "dns": {
            "read": true,
            "write": false
          },
          "dns_records": {
            "read": true,
            "write": false
          },
          "lb": {
            "read": true,
            "write": false
          },
          "logs": {
            "read": true,
            "write": false
          },
          "organization": {
            "read": true,
            "write": false
          },
          "ssl": {
            "read": true,
            "write": false
          },
          "waf": {
            "read": true,
            "write": false
          },
          "zone_settings": {
            "read": true,
            "write": false
          },
          "zones": {
            "read": true,
            "write": true
          }
        }
      }
    ],
    "status": "accepted",
    "user": {
      "email": "user@example.com",
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "first_name": "John",
      "last_name": "Appleseed",
      "two_factor_authentication_enabled": true
    }
  }
}
```

## Update Member

**put** `/accounts/{account_id}/members/{member_id}`

Modify an account member.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `member_id: string`

  Membership identifier tag.

### Body Parameters

- `body: object { id, roles, status, user }  or object { policies }`

  - `IAMUpdateMemberWithRoles object { id, roles, status, user }`

    - `id: optional string`

      Membership identifier tag.

    - `roles: optional array of Role`

      Roles assigned to this member.

      - `id: string`

        Role identifier tag.

      - `description: string`

        Description of role's permissions.

      - `name: string`

        Role name.

      - `permissions: object { analytics, billing, cache_purge, 9 more }`

        - `analytics: optional PermissionGrant`

          - `read: optional boolean`

          - `write: optional boolean`

        - `billing: optional PermissionGrant`

        - `cache_purge: optional PermissionGrant`

        - `dns: optional PermissionGrant`

        - `dns_records: optional PermissionGrant`

        - `lb: optional PermissionGrant`

        - `logs: optional PermissionGrant`

        - `organization: optional PermissionGrant`

        - `ssl: optional PermissionGrant`

        - `waf: optional PermissionGrant`

        - `zone_settings: optional PermissionGrant`

        - `zones: optional PermissionGrant`

    - `status: optional "accepted" or "pending"`

      A member's status in the account.

      - `"accepted"`

      - `"pending"`

    - `user: optional object { email, id, first_name, 2 more }`

      Details of the user associated to the membership.

      - `email: string`

        The contact email address of the user.

      - `id: optional string`

        Identifier

      - `first_name: optional string`

        User's first name

      - `last_name: optional string`

        User's last name

      - `two_factor_authentication_enabled: optional boolean`

        Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.

  - `IAMUpdateMemberWithPolicies object { policies }`

    - `policies: array of object { id, access, permission_groups, resource_groups }`

      Array of policies associated with this member.

      - `id: string`

        Policy identifier.

      - `access: "allow" or "deny"`

        Allow or deny operations against the resources.

        - `"allow"`

        - `"deny"`

      - `permission_groups: array of object { id }`

        A set of permission groups that are specified to the policy.

        - `id: string`

          Identifier of the group.

      - `resource_groups: array of object { id }`

        A list of resource groups that the policy applies to.

        - `id: string`

          Identifier of the group.

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

- `result: optional Member`

  - `id: optional string`

    Membership identifier tag.

  - `email: optional string`

    The contact email address of the user.

  - `policies: optional array of object { id, access, permission_groups, resource_groups }`

    Access policy for the membership

    - `id: optional string`

      Policy identifier.

    - `access: optional "allow" or "deny"`

      Allow or deny operations against the resources.

      - `"allow"`

      - `"deny"`

    - `permission_groups: optional array of object { id, meta, name }`

      A set of permission groups that are specified to the policy.

      - `id: string`

        Identifier of the permission group.

      - `meta: optional object { key, value }`

        Attributes associated to the permission group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the permission group.

    - `resource_groups: optional array of object { id, scope, meta, name }`

      A list of resource groups that the policy applies to.

      - `id: string`

        Identifier of the resource group.

      - `scope: array of object { key, objects }`

        The scope associated to the resource group

        - `key: string`

          This is a combination of pre-defined resource name and identifier (like Account ID etc.)

        - `objects: array of object { key }`

          A list of scope objects for additional context.

          - `key: string`

            This is a combination of pre-defined resource name and identifier (like Zone ID etc.)

      - `meta: optional object { key, value }`

        Attributes associated to the resource group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the resource group.

  - `roles: optional array of Role`

    Roles assigned to this Member.

    - `id: string`

      Role identifier tag.

    - `description: string`

      Description of role's permissions.

    - `name: string`

      Role name.

    - `permissions: object { analytics, billing, cache_purge, 9 more }`

      - `analytics: optional PermissionGrant`

        - `read: optional boolean`

        - `write: optional boolean`

      - `billing: optional PermissionGrant`

      - `cache_purge: optional PermissionGrant`

      - `dns: optional PermissionGrant`

      - `dns_records: optional PermissionGrant`

      - `lb: optional PermissionGrant`

      - `logs: optional PermissionGrant`

      - `organization: optional PermissionGrant`

      - `ssl: optional PermissionGrant`

      - `waf: optional PermissionGrant`

      - `zone_settings: optional PermissionGrant`

      - `zones: optional PermissionGrant`

  - `status: optional "accepted" or "pending"`

    A member's status in the account.

    - `"accepted"`

    - `"pending"`

  - `user: optional object { email, id, first_name, 2 more }`

    Details of the user associated to the membership.

    - `email: string`

      The contact email address of the user.

    - `id: optional string`

      Identifier

    - `first_name: optional string`

      User's first name

    - `last_name: optional string`

      User's last name

    - `two_factor_authentication_enabled: optional boolean`

      Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/members/$MEMBER_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{}'
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
  "result": {
    "id": "4536bcfad5faccb111b47003c79917fa",
    "email": "user@example.com",
    "policies": [
      {
        "id": "f267e341f3dd4697bd3b9f71dd96247f",
        "access": "allow",
        "permission_groups": [
          {
            "id": "c8fed203ed3043cba015a93ad1616f1f",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Zone Read"
          },
          {
            "id": "82e64a83756745bbbb1c9c2701bf816b",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Magic Network Monitoring"
          }
        ],
        "resource_groups": [
          {
            "id": "6d7f2f5f5b1d4a0e9081fdc98d432fd1",
            "scope": [
              {
                "key": "com.cloudflare.api.account.eb78d65290b24279ba6f44721b3ea3c4",
                "objects": [
                  {
                    "key": "com.cloudflare.api.account.zone.23f8d65290b24279ba6f44721b3eaad5"
                  }
                ]
              }
            ],
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "com.cloudflare.api.account.eb78d65290b24279ba6f44721b3ea3c4"
          }
        ]
      }
    ],
    "roles": [
      {
        "id": "3536bcfad5faccb999b47003c79917fb",
        "description": "Administrative access to the entire Account",
        "name": "Account Administrator",
        "permissions": {
          "analytics": {
            "read": true,
            "write": false
          },
          "billing": {
            "read": true,
            "write": false
          },
          "cache_purge": {
            "read": true,
            "write": false
          },
          "dns": {
            "read": true,
            "write": false
          },
          "dns_records": {
            "read": true,
            "write": false
          },
          "lb": {
            "read": true,
            "write": false
          },
          "logs": {
            "read": true,
            "write": false
          },
          "organization": {
            "read": true,
            "write": false
          },
          "ssl": {
            "read": true,
            "write": false
          },
          "waf": {
            "read": true,
            "write": false
          },
          "zone_settings": {
            "read": true,
            "write": false
          },
          "zones": {
            "read": true,
            "write": true
          }
        }
      }
    ],
    "status": "accepted",
    "user": {
      "email": "user@example.com",
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "first_name": "John",
      "last_name": "Appleseed",
      "two_factor_authentication_enabled": true
    }
  }
}
```

## Remove Member

**delete** `/accounts/{account_id}/members/{member_id}`

Remove a member from an account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `member_id: string`

  Membership identifier tag.

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

- `result: optional object { id }`

  - `id: string`

    Identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/members/$MEMBER_ID \
    -X DELETE \
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```

## Domain Types

### Status

- `Status = "member" or "invited"`

  Whether the user is a member of the organization or has an invitation pending.

  - `"member"`

  - `"invited"`

### Member Delete Response

- `MemberDeleteResponse object { id }`

  - `id: string`

    Identifier

# Roles

## List Roles

**get** `/accounts/{account_id}/roles`

Get all available roles for an account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Query Parameters

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of roles per page.

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

- `result: optional array of Role`

  - `id: string`

    Role identifier tag.

  - `description: string`

    Description of role's permissions.

  - `name: string`

    Role name.

  - `permissions: object { analytics, billing, cache_purge, 9 more }`

    - `analytics: optional PermissionGrant`

      - `read: optional boolean`

      - `write: optional boolean`

    - `billing: optional PermissionGrant`

    - `cache_purge: optional PermissionGrant`

    - `dns: optional PermissionGrant`

    - `dns_records: optional PermissionGrant`

    - `lb: optional PermissionGrant`

    - `logs: optional PermissionGrant`

    - `organization: optional PermissionGrant`

    - `ssl: optional PermissionGrant`

    - `waf: optional PermissionGrant`

    - `zone_settings: optional PermissionGrant`

    - `zones: optional PermissionGrant`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/roles \
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
      "id": "3536bcfad5faccb999b47003c79917fb",
      "description": "Administrative access to the entire Account",
      "name": "Account Administrator",
      "permissions": {
        "analytics": {
          "read": true,
          "write": false
        },
        "billing": {
          "read": true,
          "write": false
        },
        "cache_purge": {
          "read": true,
          "write": false
        },
        "dns": {
          "read": true,
          "write": false
        },
        "dns_records": {
          "read": true,
          "write": false
        },
        "lb": {
          "read": true,
          "write": false
        },
        "logs": {
          "read": true,
          "write": false
        },
        "organization": {
          "read": true,
          "write": false
        },
        "ssl": {
          "read": true,
          "write": false
        },
        "waf": {
          "read": true,
          "write": false
        },
        "zone_settings": {
          "read": true,
          "write": false
        },
        "zones": {
          "read": true,
          "write": true
        }
      }
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Role Details

**get** `/accounts/{account_id}/roles/{role_id}`

Get information about a specific role for an account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `role_id: string`

  Role identifier tag.

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

- `result: optional Role`

  - `id: string`

    Role identifier tag.

  - `description: string`

    Description of role's permissions.

  - `name: string`

    Role name.

  - `permissions: object { analytics, billing, cache_purge, 9 more }`

    - `analytics: optional PermissionGrant`

      - `read: optional boolean`

      - `write: optional boolean`

    - `billing: optional PermissionGrant`

    - `cache_purge: optional PermissionGrant`

    - `dns: optional PermissionGrant`

    - `dns_records: optional PermissionGrant`

    - `lb: optional PermissionGrant`

    - `logs: optional PermissionGrant`

    - `organization: optional PermissionGrant`

    - `ssl: optional PermissionGrant`

    - `waf: optional PermissionGrant`

    - `zone_settings: optional PermissionGrant`

    - `zones: optional PermissionGrant`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/roles/$ROLE_ID \
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
  "result": {
    "id": "3536bcfad5faccb999b47003c79917fb",
    "description": "Administrative access to the entire Account",
    "name": "Account Administrator",
    "permissions": {
      "analytics": {
        "read": true,
        "write": false
      },
      "billing": {
        "read": true,
        "write": false
      },
      "cache_purge": {
        "read": true,
        "write": false
      },
      "dns": {
        "read": true,
        "write": false
      },
      "dns_records": {
        "read": true,
        "write": false
      },
      "lb": {
        "read": true,
        "write": false
      },
      "logs": {
        "read": true,
        "write": false
      },
      "organization": {
        "read": true,
        "write": false
      },
      "ssl": {
        "read": true,
        "write": false
      },
      "waf": {
        "read": true,
        "write": false
      },
      "zone_settings": {
        "read": true,
        "write": false
      },
      "zones": {
        "read": true,
        "write": true
      }
    }
  }
}
```

# Subscriptions

## List Subscriptions

**get** `/accounts/{account_id}/subscriptions`

Lists all of an account's subscriptions.

### Path Parameters

- `account_id: string`

  Identifier

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

- `result: array of Subscription`

  - `id: optional string`

    Subscription identifier tag.

  - `currency: optional string`

    The monetary unit in which pricing information is displayed.

  - `current_period_end: optional string`

    The end of the current period and also when the next billing is due.

  - `current_period_start: optional string`

    When the current billing period started. May match initial_period_start if this is the first period.

  - `frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"`

    How often the subscription is renewed automatically.

    - `"weekly"`

    - `"monthly"`

    - `"quarterly"`

    - `"yearly"`

  - `price: optional number`

    The price of the subscription that will be billed, in US dollars.

  - `rate_plan: optional RatePlan`

    The rate plan applied to the subscription.

    - `id: optional "free" or "lite" or "pro" or 7 more`

      The ID of the rate plan.

      - `"free"`

      - `"lite"`

      - `"pro"`

      - `"pro_plus"`

      - `"business"`

      - `"enterprise"`

      - `"partners_free"`

      - `"partners_pro"`

      - `"partners_business"`

      - `"partners_enterprise"`

    - `currency: optional string`

      The currency applied to the rate plan subscription.

    - `externally_managed: optional boolean`

      Whether this rate plan is managed externally from Cloudflare.

    - `is_contract: optional boolean`

      Whether a rate plan is enterprise-based (or newly adopted term contract).

    - `public_name: optional string`

      The full name of the rate plan.

    - `scope: optional string`

      The scope that this rate plan applies to.

    - `sets: optional array of string`

      The list of sets this rate plan applies to. Returns array of strings.

  - `state: optional "Trial" or "Provisioned" or "Paid" or 4 more`

    The state that the subscription is in.

    - `"Trial"`

    - `"Provisioned"`

    - `"Paid"`

    - `"AwaitingPayment"`

    - `"Cancelled"`

    - `"Failed"`

    - `"Expired"`

- `success: true`

  Whether the API call was successful

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/subscriptions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": [
    {
      "id": "506e3185e9c882d175a2d0cb0093d9f2",
      "currency": "USD",
      "current_period_end": "2014-03-31T12:20:00Z",
      "current_period_start": "2014-05-11T12:20:00Z",
      "frequency": "monthly",
      "price": 20,
      "rate_plan": {
        "id": "free",
        "currency": "USD",
        "externally_managed": false,
        "is_contract": false,
        "public_name": "Business Plan",
        "scope": "zone",
        "sets": [
          "string"
        ]
      },
      "state": "Paid"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Create Subscription

**post** `/accounts/{account_id}/subscriptions`

Creates an account subscription.

### Path Parameters

- `account_id: string`

  Identifier

### Body Parameters

- `frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"`

  How often the subscription is renewed automatically.

  - `"weekly"`

  - `"monthly"`

  - `"quarterly"`

  - `"yearly"`

- `rate_plan: optional RatePlan`

  The rate plan applied to the subscription.

  - `id: optional "free" or "lite" or "pro" or 7 more`

    The ID of the rate plan.

    - `"free"`

    - `"lite"`

    - `"pro"`

    - `"pro_plus"`

    - `"business"`

    - `"enterprise"`

    - `"partners_free"`

    - `"partners_pro"`

    - `"partners_business"`

    - `"partners_enterprise"`

  - `currency: optional string`

    The currency applied to the rate plan subscription.

  - `externally_managed: optional boolean`

    Whether this rate plan is managed externally from Cloudflare.

  - `is_contract: optional boolean`

    Whether a rate plan is enterprise-based (or newly adopted term contract).

  - `public_name: optional string`

    The full name of the rate plan.

  - `scope: optional string`

    The scope that this rate plan applies to.

  - `sets: optional array of string`

    The list of sets this rate plan applies to. Returns array of strings.

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

- `result: Subscription`

  - `id: optional string`

    Subscription identifier tag.

  - `currency: optional string`

    The monetary unit in which pricing information is displayed.

  - `current_period_end: optional string`

    The end of the current period and also when the next billing is due.

  - `current_period_start: optional string`

    When the current billing period started. May match initial_period_start if this is the first period.

  - `frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"`

    How often the subscription is renewed automatically.

    - `"weekly"`

    - `"monthly"`

    - `"quarterly"`

    - `"yearly"`

  - `price: optional number`

    The price of the subscription that will be billed, in US dollars.

  - `rate_plan: optional RatePlan`

    The rate plan applied to the subscription.

    - `id: optional "free" or "lite" or "pro" or 7 more`

      The ID of the rate plan.

      - `"free"`

      - `"lite"`

      - `"pro"`

      - `"pro_plus"`

      - `"business"`

      - `"enterprise"`

      - `"partners_free"`

      - `"partners_pro"`

      - `"partners_business"`

      - `"partners_enterprise"`

    - `currency: optional string`

      The currency applied to the rate plan subscription.

    - `externally_managed: optional boolean`

      Whether this rate plan is managed externally from Cloudflare.

    - `is_contract: optional boolean`

      Whether a rate plan is enterprise-based (or newly adopted term contract).

    - `public_name: optional string`

      The full name of the rate plan.

    - `scope: optional string`

      The scope that this rate plan applies to.

    - `sets: optional array of string`

      The list of sets this rate plan applies to. Returns array of strings.

  - `state: optional "Trial" or "Provisioned" or "Paid" or 4 more`

    The state that the subscription is in.

    - `"Trial"`

    - `"Provisioned"`

    - `"Paid"`

    - `"AwaitingPayment"`

    - `"Cancelled"`

    - `"Failed"`

    - `"Expired"`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/subscriptions \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "frequency": "monthly"
        }'
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
  "result": {
    "id": "506e3185e9c882d175a2d0cb0093d9f2",
    "currency": "USD",
    "current_period_end": "2014-03-31T12:20:00Z",
    "current_period_start": "2014-05-11T12:20:00Z",
    "frequency": "monthly",
    "price": 20,
    "rate_plan": {
      "id": "free",
      "currency": "USD",
      "externally_managed": false,
      "is_contract": false,
      "public_name": "Business Plan",
      "scope": "zone",
      "sets": [
        "string"
      ]
    },
    "state": "Paid"
  },
  "success": true
}
```

## Update Subscription

**put** `/accounts/{account_id}/subscriptions/{subscription_identifier}`

Updates an account subscription.

### Path Parameters

- `account_id: string`

  Identifier

- `subscription_identifier: string`

  Subscription identifier tag.

### Body Parameters

- `frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"`

  How often the subscription is renewed automatically.

  - `"weekly"`

  - `"monthly"`

  - `"quarterly"`

  - `"yearly"`

- `rate_plan: optional RatePlan`

  The rate plan applied to the subscription.

  - `id: optional "free" or "lite" or "pro" or 7 more`

    The ID of the rate plan.

    - `"free"`

    - `"lite"`

    - `"pro"`

    - `"pro_plus"`

    - `"business"`

    - `"enterprise"`

    - `"partners_free"`

    - `"partners_pro"`

    - `"partners_business"`

    - `"partners_enterprise"`

  - `currency: optional string`

    The currency applied to the rate plan subscription.

  - `externally_managed: optional boolean`

    Whether this rate plan is managed externally from Cloudflare.

  - `is_contract: optional boolean`

    Whether a rate plan is enterprise-based (or newly adopted term contract).

  - `public_name: optional string`

    The full name of the rate plan.

  - `scope: optional string`

    The scope that this rate plan applies to.

  - `sets: optional array of string`

    The list of sets this rate plan applies to. Returns array of strings.

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

- `result: Subscription`

  - `id: optional string`

    Subscription identifier tag.

  - `currency: optional string`

    The monetary unit in which pricing information is displayed.

  - `current_period_end: optional string`

    The end of the current period and also when the next billing is due.

  - `current_period_start: optional string`

    When the current billing period started. May match initial_period_start if this is the first period.

  - `frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"`

    How often the subscription is renewed automatically.

    - `"weekly"`

    - `"monthly"`

    - `"quarterly"`

    - `"yearly"`

  - `price: optional number`

    The price of the subscription that will be billed, in US dollars.

  - `rate_plan: optional RatePlan`

    The rate plan applied to the subscription.

    - `id: optional "free" or "lite" or "pro" or 7 more`

      The ID of the rate plan.

      - `"free"`

      - `"lite"`

      - `"pro"`

      - `"pro_plus"`

      - `"business"`

      - `"enterprise"`

      - `"partners_free"`

      - `"partners_pro"`

      - `"partners_business"`

      - `"partners_enterprise"`

    - `currency: optional string`

      The currency applied to the rate plan subscription.

    - `externally_managed: optional boolean`

      Whether this rate plan is managed externally from Cloudflare.

    - `is_contract: optional boolean`

      Whether a rate plan is enterprise-based (or newly adopted term contract).

    - `public_name: optional string`

      The full name of the rate plan.

    - `scope: optional string`

      The scope that this rate plan applies to.

    - `sets: optional array of string`

      The list of sets this rate plan applies to. Returns array of strings.

  - `state: optional "Trial" or "Provisioned" or "Paid" or 4 more`

    The state that the subscription is in.

    - `"Trial"`

    - `"Provisioned"`

    - `"Paid"`

    - `"AwaitingPayment"`

    - `"Cancelled"`

    - `"Failed"`

    - `"Expired"`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/subscriptions/$SUBSCRIPTION_IDENTIFIER \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "frequency": "monthly"
        }'
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
  "result": {
    "id": "506e3185e9c882d175a2d0cb0093d9f2",
    "currency": "USD",
    "current_period_end": "2014-03-31T12:20:00Z",
    "current_period_start": "2014-05-11T12:20:00Z",
    "frequency": "monthly",
    "price": 20,
    "rate_plan": {
      "id": "free",
      "currency": "USD",
      "externally_managed": false,
      "is_contract": false,
      "public_name": "Business Plan",
      "scope": "zone",
      "sets": [
        "string"
      ]
    },
    "state": "Paid"
  },
  "success": true
}
```

## Delete Subscription

**delete** `/accounts/{account_id}/subscriptions/{subscription_identifier}`

Deletes an account's subscription.

### Path Parameters

- `account_id: string`

  Identifier

- `subscription_identifier: string`

  Subscription identifier tag.

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

- `result: object { subscription_id }`

  - `subscription_id: optional string`

    Subscription identifier tag.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/subscriptions/$SUBSCRIPTION_IDENTIFIER \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": {
    "subscription_id": "506e3185e9c882d175a2d0cb0093d9f2"
  },
  "success": true
}
```

## Domain Types

### Subscription Delete Response

- `SubscriptionDeleteResponse object { subscription_id }`

  - `subscription_id: optional string`

    Subscription identifier tag.

# Tokens

## List Tokens

**get** `/accounts/{account_id}/tokens`

List all Account Owned API tokens created for this account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Query Parameters

- `direction: optional "asc" or "desc"`

  Direction to order results.

  - `"asc"`

  - `"desc"`

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page.

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

- `result: optional array of Token`

  - `id: optional string`

    Token identifier tag.

  - `condition: optional object { request_ip }`

    - `request_ip: optional object { in, not_in }`

      Client IP restrictions.

      - `in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

      - `not_in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

  - `expires_on: optional string`

    The expiration time on or after which the JWT MUST NOT be accepted for processing.

  - `issued_on: optional string`

    The time on which the token was created.

  - `last_used_on: optional string`

    Last time the token was used.

  - `modified_on: optional string`

    Last time the token was modified.

  - `name: optional string`

    Token name.

  - `not_before: optional string`

    The time before which the token MUST NOT be accepted for processing.

  - `policies: optional array of TokenPolicy`

    List of access policies assigned to the token.

    - `id: string`

      Policy identifier.

    - `effect: "allow" or "deny"`

      Allow or deny operations against the resources.

      - `"allow"`

      - `"deny"`

    - `permission_groups: array of object { id, meta, name }`

      A set of permission groups that are specified to the policy.

      - `id: string`

        Identifier of the permission group.

      - `meta: optional object { key, value }`

        Attributes associated to the permission group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the permission group.

    - `resources: map[string] or map[map[string]]`

      A list of resource names that the policy applies to.

      - `IAMResourcesTypeObjectString = map[string]`

        Map of simple string resource permissions

      - `IAMResourcesTypeObjectNested = map[map[string]]`

        Map of nested resource permissions

  - `status: optional "active" or "disabled" or "expired"`

    Status of the token.

    - `"active"`

    - `"disabled"`

    - `"expired"`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tokens \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
      "id": "ed17574386854bf78a67040be0a770b0",
      "condition": {
        "request_ip": {
          "in": [
            "123.123.123.0/24",
            "2606:4700::/32"
          ],
          "not_in": [
            "123.123.123.100/24",
            "2606:4700:4700::/48"
          ]
        }
      },
      "expires_on": "2020-01-01T00:00:00Z",
      "issued_on": "2018-07-01T05:20:00Z",
      "last_used_on": "2020-01-02T12:34:00Z",
      "modified_on": "2018-07-02T05:20:00Z",
      "name": "readonly token",
      "not_before": "2018-07-01T05:20:00Z",
      "policies": [
        {
          "id": "f267e341f3dd4697bd3b9f71dd96247f",
          "effect": "allow",
          "permission_groups": [
            {
              "id": "c8fed203ed3043cba015a93ad1616f1f",
              "meta": {
                "key": "key",
                "value": "value"
              },
              "name": "Zone Read"
            },
            {
              "id": "82e64a83756745bbbb1c9c2701bf816b",
              "meta": {
                "key": "key",
                "value": "value"
              },
              "name": "Magic Network Monitoring"
            }
          ],
          "resources": {
            "foo": "string"
          }
        }
      ],
      "status": "active"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Token Details

**get** `/accounts/{account_id}/tokens/{token_id}`

Get information about a specific Account Owned API token.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `token_id: string`

  Token identifier tag.

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

- `result: optional Token`

  - `id: optional string`

    Token identifier tag.

  - `condition: optional object { request_ip }`

    - `request_ip: optional object { in, not_in }`

      Client IP restrictions.

      - `in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

      - `not_in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

  - `expires_on: optional string`

    The expiration time on or after which the JWT MUST NOT be accepted for processing.

  - `issued_on: optional string`

    The time on which the token was created.

  - `last_used_on: optional string`

    Last time the token was used.

  - `modified_on: optional string`

    Last time the token was modified.

  - `name: optional string`

    Token name.

  - `not_before: optional string`

    The time before which the token MUST NOT be accepted for processing.

  - `policies: optional array of TokenPolicy`

    List of access policies assigned to the token.

    - `id: string`

      Policy identifier.

    - `effect: "allow" or "deny"`

      Allow or deny operations against the resources.

      - `"allow"`

      - `"deny"`

    - `permission_groups: array of object { id, meta, name }`

      A set of permission groups that are specified to the policy.

      - `id: string`

        Identifier of the permission group.

      - `meta: optional object { key, value }`

        Attributes associated to the permission group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the permission group.

    - `resources: map[string] or map[map[string]]`

      A list of resource names that the policy applies to.

      - `IAMResourcesTypeObjectString = map[string]`

        Map of simple string resource permissions

      - `IAMResourcesTypeObjectNested = map[map[string]]`

        Map of nested resource permissions

  - `status: optional "active" or "disabled" or "expired"`

    Status of the token.

    - `"active"`

    - `"disabled"`

    - `"expired"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tokens/$TOKEN_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": {
    "id": "ed17574386854bf78a67040be0a770b0",
    "condition": {
      "request_ip": {
        "in": [
          "123.123.123.0/24",
          "2606:4700::/32"
        ],
        "not_in": [
          "123.123.123.100/24",
          "2606:4700:4700::/48"
        ]
      }
    },
    "expires_on": "2020-01-01T00:00:00Z",
    "issued_on": "2018-07-01T05:20:00Z",
    "last_used_on": "2020-01-02T12:34:00Z",
    "modified_on": "2018-07-02T05:20:00Z",
    "name": "readonly token",
    "not_before": "2018-07-01T05:20:00Z",
    "policies": [
      {
        "id": "f267e341f3dd4697bd3b9f71dd96247f",
        "effect": "allow",
        "permission_groups": [
          {
            "id": "c8fed203ed3043cba015a93ad1616f1f",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Zone Read"
          },
          {
            "id": "82e64a83756745bbbb1c9c2701bf816b",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Magic Network Monitoring"
          }
        ],
        "resources": {
          "foo": "string"
        }
      }
    ],
    "status": "active"
  }
}
```

## Create Token

**post** `/accounts/{account_id}/tokens`

Create a new Account Owned API token.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Body Parameters

- `name: string`

  Token name.

- `policies: array of TokenPolicy`

  List of access policies assigned to the token.

  - `id: string`

    Policy identifier.

  - `effect: "allow" or "deny"`

    Allow or deny operations against the resources.

    - `"allow"`

    - `"deny"`

  - `permission_groups: array of object { id, meta, name }`

    A set of permission groups that are specified to the policy.

    - `id: string`

      Identifier of the permission group.

    - `meta: optional object { key, value }`

      Attributes associated to the permission group.

      - `key: optional string`

      - `value: optional string`

    - `name: optional string`

      Name of the permission group.

  - `resources: map[string] or map[map[string]]`

    A list of resource names that the policy applies to.

    - `IAMResourcesTypeObjectString = map[string]`

      Map of simple string resource permissions

    - `IAMResourcesTypeObjectNested = map[map[string]]`

      Map of nested resource permissions

- `condition: optional object { request_ip }`

  - `request_ip: optional object { in, not_in }`

    Client IP restrictions.

    - `in: optional array of TokenConditionCIDRList`

      List of IPv4/IPv6 CIDR addresses.

    - `not_in: optional array of TokenConditionCIDRList`

      List of IPv4/IPv6 CIDR addresses.

- `expires_on: optional string`

  The expiration time on or after which the JWT MUST NOT be accepted for processing.

- `not_before: optional string`

  The time before which the token MUST NOT be accepted for processing.

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

- `result: optional object { id, condition, expires_on, 8 more }`

  - `id: optional string`

    Token identifier tag.

  - `condition: optional object { request_ip }`

    - `request_ip: optional object { in, not_in }`

      Client IP restrictions.

      - `in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

      - `not_in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

  - `expires_on: optional string`

    The expiration time on or after which the JWT MUST NOT be accepted for processing.

  - `issued_on: optional string`

    The time on which the token was created.

  - `last_used_on: optional string`

    Last time the token was used.

  - `modified_on: optional string`

    Last time the token was modified.

  - `name: optional string`

    Token name.

  - `not_before: optional string`

    The time before which the token MUST NOT be accepted for processing.

  - `policies: optional array of TokenPolicy`

    List of access policies assigned to the token.

    - `id: string`

      Policy identifier.

    - `effect: "allow" or "deny"`

      Allow or deny operations against the resources.

      - `"allow"`

      - `"deny"`

    - `permission_groups: array of object { id, meta, name }`

      A set of permission groups that are specified to the policy.

      - `id: string`

        Identifier of the permission group.

      - `meta: optional object { key, value }`

        Attributes associated to the permission group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the permission group.

    - `resources: map[string] or map[map[string]]`

      A list of resource names that the policy applies to.

      - `IAMResourcesTypeObjectString = map[string]`

        Map of simple string resource permissions

      - `IAMResourcesTypeObjectNested = map[map[string]]`

        Map of nested resource permissions

  - `status: optional "active" or "disabled" or "expired"`

    Status of the token.

    - `"active"`

    - `"disabled"`

    - `"expired"`

  - `value: optional TokenValue`

    The token value.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tokens \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "readonly token",
          "policies": [
            {
              "effect": "allow",
              "permission_groups": [
                {
                  "id": "c8fed203ed3043cba015a93ad1616f1f",
                  "meta": {}
                },
                {
                  "id": "82e64a83756745bbbb1c9c2701bf816b",
                  "meta": {}
                }
              ],
              "resources": {
                "foo": "string"
              }
            }
          ],
          "expires_on": "2020-01-01T00:00:00Z",
          "not_before": "2018-07-01T05:20:00Z"
        }'
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
  "result": {
    "id": "ed17574386854bf78a67040be0a770b0",
    "condition": {
      "request_ip": {
        "in": [
          "123.123.123.0/24",
          "2606:4700::/32"
        ],
        "not_in": [
          "123.123.123.100/24",
          "2606:4700:4700::/48"
        ]
      }
    },
    "expires_on": "2020-01-01T00:00:00Z",
    "issued_on": "2018-07-01T05:20:00Z",
    "last_used_on": "2020-01-02T12:34:00Z",
    "modified_on": "2018-07-02T05:20:00Z",
    "name": "readonly token",
    "not_before": "2018-07-01T05:20:00Z",
    "policies": [
      {
        "id": "f267e341f3dd4697bd3b9f71dd96247f",
        "effect": "allow",
        "permission_groups": [
          {
            "id": "c8fed203ed3043cba015a93ad1616f1f",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Zone Read"
          },
          {
            "id": "82e64a83756745bbbb1c9c2701bf816b",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Magic Network Monitoring"
          }
        ],
        "resources": {
          "foo": "string"
        }
      }
    ],
    "status": "active",
    "value": "8M7wS6hCpXVc-DoRnPPY_UCWPgy8aea4Wy6kCe5T"
  }
}
```

## Update Token

**put** `/accounts/{account_id}/tokens/{token_id}`

Update an existing token.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `token_id: string`

  Token identifier tag.

### Body Parameters

- `name: string`

  Token name.

- `policies: array of TokenPolicy`

  List of access policies assigned to the token.

  - `id: string`

    Policy identifier.

  - `effect: "allow" or "deny"`

    Allow or deny operations against the resources.

    - `"allow"`

    - `"deny"`

  - `permission_groups: array of object { id, meta, name }`

    A set of permission groups that are specified to the policy.

    - `id: string`

      Identifier of the permission group.

    - `meta: optional object { key, value }`

      Attributes associated to the permission group.

      - `key: optional string`

      - `value: optional string`

    - `name: optional string`

      Name of the permission group.

  - `resources: map[string] or map[map[string]]`

    A list of resource names that the policy applies to.

    - `IAMResourcesTypeObjectString = map[string]`

      Map of simple string resource permissions

    - `IAMResourcesTypeObjectNested = map[map[string]]`

      Map of nested resource permissions

- `condition: optional object { request_ip }`

  - `request_ip: optional object { in, not_in }`

    Client IP restrictions.

    - `in: optional array of TokenConditionCIDRList`

      List of IPv4/IPv6 CIDR addresses.

    - `not_in: optional array of TokenConditionCIDRList`

      List of IPv4/IPv6 CIDR addresses.

- `expires_on: optional string`

  The expiration time on or after which the JWT MUST NOT be accepted for processing.

- `not_before: optional string`

  The time before which the token MUST NOT be accepted for processing.

- `status: optional "active" or "disabled" or "expired"`

  Status of the token.

  - `"active"`

  - `"disabled"`

  - `"expired"`

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

- `result: optional Token`

  - `id: optional string`

    Token identifier tag.

  - `condition: optional object { request_ip }`

    - `request_ip: optional object { in, not_in }`

      Client IP restrictions.

      - `in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

      - `not_in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

  - `expires_on: optional string`

    The expiration time on or after which the JWT MUST NOT be accepted for processing.

  - `issued_on: optional string`

    The time on which the token was created.

  - `last_used_on: optional string`

    Last time the token was used.

  - `modified_on: optional string`

    Last time the token was modified.

  - `name: optional string`

    Token name.

  - `not_before: optional string`

    The time before which the token MUST NOT be accepted for processing.

  - `policies: optional array of TokenPolicy`

    List of access policies assigned to the token.

    - `id: string`

      Policy identifier.

    - `effect: "allow" or "deny"`

      Allow or deny operations against the resources.

      - `"allow"`

      - `"deny"`

    - `permission_groups: array of object { id, meta, name }`

      A set of permission groups that are specified to the policy.

      - `id: string`

        Identifier of the permission group.

      - `meta: optional object { key, value }`

        Attributes associated to the permission group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the permission group.

    - `resources: map[string] or map[map[string]]`

      A list of resource names that the policy applies to.

      - `IAMResourcesTypeObjectString = map[string]`

        Map of simple string resource permissions

      - `IAMResourcesTypeObjectNested = map[map[string]]`

        Map of nested resource permissions

  - `status: optional "active" or "disabled" or "expired"`

    Status of the token.

    - `"active"`

    - `"disabled"`

    - `"expired"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tokens/$TOKEN_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "readonly token",
          "policies": [
            {
              "effect": "allow",
              "permission_groups": [
                {
                  "id": "c8fed203ed3043cba015a93ad1616f1f",
                  "meta": {}
                },
                {
                  "id": "82e64a83756745bbbb1c9c2701bf816b",
                  "meta": {}
                }
              ],
              "resources": {
                "foo": "string"
              }
            }
          ],
          "expires_on": "2020-01-01T00:00:00Z",
          "not_before": "2018-07-01T05:20:00Z",
          "status": "active"
        }'
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
  "result": {
    "id": "ed17574386854bf78a67040be0a770b0",
    "condition": {
      "request_ip": {
        "in": [
          "123.123.123.0/24",
          "2606:4700::/32"
        ],
        "not_in": [
          "123.123.123.100/24",
          "2606:4700:4700::/48"
        ]
      }
    },
    "expires_on": "2020-01-01T00:00:00Z",
    "issued_on": "2018-07-01T05:20:00Z",
    "last_used_on": "2020-01-02T12:34:00Z",
    "modified_on": "2018-07-02T05:20:00Z",
    "name": "readonly token",
    "not_before": "2018-07-01T05:20:00Z",
    "policies": [
      {
        "id": "f267e341f3dd4697bd3b9f71dd96247f",
        "effect": "allow",
        "permission_groups": [
          {
            "id": "c8fed203ed3043cba015a93ad1616f1f",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Zone Read"
          },
          {
            "id": "82e64a83756745bbbb1c9c2701bf816b",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Magic Network Monitoring"
          }
        ],
        "resources": {
          "foo": "string"
        }
      }
    ],
    "status": "active"
  }
}
```

## Delete Token

**delete** `/accounts/{account_id}/tokens/{token_id}`

Destroy an Account Owned API token.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `token_id: string`

  Token identifier tag.

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

- `result: optional object { id }`

  - `id: string`

    Identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tokens/$TOKEN_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```

## Verify Token

**get** `/accounts/{account_id}/tokens/verify`

Test whether a token works.

### Path Parameters

- `account_id: string`

  Account identifier tag.

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

- `result: optional object { id, status, expires_on, not_before }`

  - `id: string`

    Token identifier tag.

  - `status: "active" or "disabled" or "expired"`

    Status of the token.

    - `"active"`

    - `"disabled"`

    - `"expired"`

  - `expires_on: optional string`

    The expiration time on or after which the JWT MUST NOT be accepted for processing.

  - `not_before: optional string`

    The time before which the token MUST NOT be accepted for processing.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tokens/verify \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": {
    "id": "ed17574386854bf78a67040be0a770b0",
    "status": "active",
    "expires_on": "2020-01-01T00:00:00Z",
    "not_before": "2018-07-01T05:20:00Z"
  }
}
```

## Domain Types

### Token Create Response

- `TokenCreateResponse object { id, condition, expires_on, 8 more }`

  - `id: optional string`

    Token identifier tag.

  - `condition: optional object { request_ip }`

    - `request_ip: optional object { in, not_in }`

      Client IP restrictions.

      - `in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

      - `not_in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

  - `expires_on: optional string`

    The expiration time on or after which the JWT MUST NOT be accepted for processing.

  - `issued_on: optional string`

    The time on which the token was created.

  - `last_used_on: optional string`

    Last time the token was used.

  - `modified_on: optional string`

    Last time the token was modified.

  - `name: optional string`

    Token name.

  - `not_before: optional string`

    The time before which the token MUST NOT be accepted for processing.

  - `policies: optional array of TokenPolicy`

    List of access policies assigned to the token.

    - `id: string`

      Policy identifier.

    - `effect: "allow" or "deny"`

      Allow or deny operations against the resources.

      - `"allow"`

      - `"deny"`

    - `permission_groups: array of object { id, meta, name }`

      A set of permission groups that are specified to the policy.

      - `id: string`

        Identifier of the permission group.

      - `meta: optional object { key, value }`

        Attributes associated to the permission group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the permission group.

    - `resources: map[string] or map[map[string]]`

      A list of resource names that the policy applies to.

      - `IAMResourcesTypeObjectString = map[string]`

        Map of simple string resource permissions

      - `IAMResourcesTypeObjectNested = map[map[string]]`

        Map of nested resource permissions

  - `status: optional "active" or "disabled" or "expired"`

    Status of the token.

    - `"active"`

    - `"disabled"`

    - `"expired"`

  - `value: optional TokenValue`

    The token value.

### Token Delete Response

- `TokenDeleteResponse object { id }`

  - `id: string`

    Identifier

### Token Verify Response

- `TokenVerifyResponse object { id, status, expires_on, not_before }`

  - `id: string`

    Token identifier tag.

  - `status: "active" or "disabled" or "expired"`

    Status of the token.

    - `"active"`

    - `"disabled"`

    - `"expired"`

  - `expires_on: optional string`

    The expiration time on or after which the JWT MUST NOT be accepted for processing.

  - `not_before: optional string`

    The time before which the token MUST NOT be accepted for processing.

# Permission Groups

## List Permission Groups

**get** `/accounts/{account_id}/tokens/permission_groups`

Find all available permission groups for Account Owned API Tokens

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Query Parameters

- `name: optional string`

  Filter by the name of the permission group.
  The value must be URL-encoded.

- `scope: optional string`

  Filter by the scope of the permission group.
  The value must be URL-encoded.

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

- `result: optional array of object { id, category, name, scopes }`

  - `id: optional string`

    Public ID.

  - `category: optional "developer_platform" or "ai_and_machine_learning" or "dns_and_zones" or 10 more`

    Product category that this permission group belongs to.

    - `"developer_platform"`

    - `"ai_and_machine_learning"`

    - `"dns_and_zones"`

    - `"app_security"`

    - `"rules_and_configuration"`

    - `"cloudflare_one_and_zero_trust"`

    - `"analytics_and_logs"`

    - `"network_services"`

    - `"media"`

    - `"email_and_messaging"`

    - `"cache_and_performance"`

    - `"account_and_billing"`

    - `"other"`

  - `name: optional string`

    Permission Group Name

  - `scopes: optional array of "com.cloudflare.api.account" or "com.cloudflare.api.account.zone" or "com.cloudflare.api.user" or "com.cloudflare.edge.r2.bucket"`

    Resources to which the Permission Group is scoped

    - `"com.cloudflare.api.account"`

    - `"com.cloudflare.api.account.zone"`

    - `"com.cloudflare.api.user"`

    - `"com.cloudflare.edge.r2.bucket"`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tokens/permission_groups \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
      "id": "7cf72faf220841aabcfdfab81c43c4f6",
      "category": "account_and_billing",
      "name": "Billing Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "9d24387c6e8544e2bc4024a03991339f",
      "category": "network_services",
      "name": "Load Balancing: Monitors and Pools Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "d2a1802cc9a34e30852f8b33869b2f3c",
      "category": "network_services",
      "name": "Load Balancing: Monitors and Pools Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "8b47d2786a534c08a1f94ee8f9f599ef",
      "category": "developer_platform",
      "name": "Workers KV Storage Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "f7f0eda5697f475c90846e879bab8666",
      "category": "developer_platform",
      "name": "Workers KV Storage Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "1a71c399035b4950a1bd1466bbe4f420",
      "category": "developer_platform",
      "name": "Workers Scripts Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "e086da7e2179491d91ee5f35b3ca210a",
      "category": "developer_platform",
      "name": "Workers Scripts Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## List Permission Groups

**get** `/accounts/{account_id}/tokens/permission_groups`

Find all available permission groups for Account Owned API Tokens

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Query Parameters

- `name: optional string`

  Filter by the name of the permission group.
  The value must be URL-encoded.

- `scope: optional string`

  Filter by the scope of the permission group.
  The value must be URL-encoded.

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

- `result: optional array of object { id, category, name, scopes }`

  - `id: optional string`

    Public ID.

  - `category: optional "developer_platform" or "ai_and_machine_learning" or "dns_and_zones" or 10 more`

    Product category that this permission group belongs to.

    - `"developer_platform"`

    - `"ai_and_machine_learning"`

    - `"dns_and_zones"`

    - `"app_security"`

    - `"rules_and_configuration"`

    - `"cloudflare_one_and_zero_trust"`

    - `"analytics_and_logs"`

    - `"network_services"`

    - `"media"`

    - `"email_and_messaging"`

    - `"cache_and_performance"`

    - `"account_and_billing"`

    - `"other"`

  - `name: optional string`

    Permission Group Name

  - `scopes: optional array of "com.cloudflare.api.account" or "com.cloudflare.api.account.zone" or "com.cloudflare.api.user" or "com.cloudflare.edge.r2.bucket"`

    Resources to which the Permission Group is scoped

    - `"com.cloudflare.api.account"`

    - `"com.cloudflare.api.account.zone"`

    - `"com.cloudflare.api.user"`

    - `"com.cloudflare.edge.r2.bucket"`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tokens/permission_groups \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
      "id": "7cf72faf220841aabcfdfab81c43c4f6",
      "category": "account_and_billing",
      "name": "Billing Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "9d24387c6e8544e2bc4024a03991339f",
      "category": "network_services",
      "name": "Load Balancing: Monitors and Pools Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "d2a1802cc9a34e30852f8b33869b2f3c",
      "category": "network_services",
      "name": "Load Balancing: Monitors and Pools Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "8b47d2786a534c08a1f94ee8f9f599ef",
      "category": "developer_platform",
      "name": "Workers KV Storage Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "f7f0eda5697f475c90846e879bab8666",
      "category": "developer_platform",
      "name": "Workers KV Storage Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "1a71c399035b4950a1bd1466bbe4f420",
      "category": "developer_platform",
      "name": "Workers Scripts Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "e086da7e2179491d91ee5f35b3ca210a",
      "category": "developer_platform",
      "name": "Workers Scripts Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Domain Types

### Permission Group List Response

- `PermissionGroupListResponse object { id, category, name, scopes }`

  - `id: optional string`

    Public ID.

  - `category: optional "developer_platform" or "ai_and_machine_learning" or "dns_and_zones" or 10 more`

    Product category that this permission group belongs to.

    - `"developer_platform"`

    - `"ai_and_machine_learning"`

    - `"dns_and_zones"`

    - `"app_security"`

    - `"rules_and_configuration"`

    - `"cloudflare_one_and_zero_trust"`

    - `"analytics_and_logs"`

    - `"network_services"`

    - `"media"`

    - `"email_and_messaging"`

    - `"cache_and_performance"`

    - `"account_and_billing"`

    - `"other"`

  - `name: optional string`

    Permission Group Name

  - `scopes: optional array of "com.cloudflare.api.account" or "com.cloudflare.api.account.zone" or "com.cloudflare.api.user" or "com.cloudflare.edge.r2.bucket"`

    Resources to which the Permission Group is scoped

    - `"com.cloudflare.api.account"`

    - `"com.cloudflare.api.account.zone"`

    - `"com.cloudflare.api.user"`

    - `"com.cloudflare.edge.r2.bucket"`

### Permission Group Get Response

- `PermissionGroupGetResponse = array of object { id, category, name, scopes }`

  - `id: optional string`

    Public ID.

  - `category: optional "developer_platform" or "ai_and_machine_learning" or "dns_and_zones" or 10 more`

    Product category that this permission group belongs to.

    - `"developer_platform"`

    - `"ai_and_machine_learning"`

    - `"dns_and_zones"`

    - `"app_security"`

    - `"rules_and_configuration"`

    - `"cloudflare_one_and_zero_trust"`

    - `"analytics_and_logs"`

    - `"network_services"`

    - `"media"`

    - `"email_and_messaging"`

    - `"cache_and_performance"`

    - `"account_and_billing"`

    - `"other"`

  - `name: optional string`

    Permission Group Name

  - `scopes: optional array of "com.cloudflare.api.account" or "com.cloudflare.api.account.zone" or "com.cloudflare.api.user" or "com.cloudflare.edge.r2.bucket"`

    Resources to which the Permission Group is scoped

    - `"com.cloudflare.api.account"`

    - `"com.cloudflare.api.account.zone"`

    - `"com.cloudflare.api.user"`

    - `"com.cloudflare.edge.r2.bucket"`

# Value

## Roll Token

**put** `/accounts/{account_id}/tokens/{token_id}/value`

Roll the Account Owned API token secret.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `token_id: string`

  Token identifier tag.

### Body Parameters

- `body: unknown`

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

- `result: optional TokenValue`

  The token value.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tokens/$TOKEN_ID/value \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
  "result": "8M7wS6hCpXVc-DoRnPPY_UCWPgy8aea4Wy6kCe5T"
}
```

# Logs

# Audit

## Get account audit logs (Version 2)

**get** `/accounts/{account_id}/logs/audit`

Gets a list of audit logs for an account.

### Path Parameters

- `account_id: string`

  The unique id that identifies the account.

### Query Parameters

- `before: string`

  Limits the returned results to logs older than the specified date. This can be a date string 2019-04-30 (interpreted in UTC) or an absolute timestamp that conforms to RFC3339.

- `since: string`

  Limits the returned results to logs newer than the specified date. This can be a date string 2019-04-30 (interpreted in UTC) or an absolute timestamp that conforms to RFC3339.

- `id: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by their IDs.

- `account_name: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the account name.

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

    Filters out audit logs by the actor ID. This can be either the Account ID or User ID.

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

  - `not: optional array of "account" or "cloudflare_admin" or "system" or "user"`

    Filters out audit logs by the actor type.

    - `"account"`

    - `"cloudflare_admin"`

    - `"system"`

    - `"user"`

- `audit_log_id: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by their IDs.

- `cursor: optional string`

  The cursor is an opaque token used to paginate through large sets of records. It indicates the position from which to continue when requesting the next set of records. A valid cursor value can be obtained from the cursor object in the result_info structure of a previous response.

- `direction: optional "desc" or "asc"`

  Sets sorting order.

  - `"desc"`

  - `"asc"`

- `limit: optional number`

  The number limits the objects to return. The cursor attribute may be used to iterate over the next batch of objects if there are more than the limit.

- `product_category: optional array of string`

  Filters audit logs by one or more predefined product categories. Each product category expands into a curated set of resource_product values and is unioned with any explicit resource_product filter. Matched case-insensitively; unknown product categories return 400. Repeatable. Use the audit log product categories endpoint to discover the available values.

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

  - `not: optional array of "accounts" or "user" or "zones" or "memberships"`

    Filters out audit logs by the resource scope, specifying whether the resource is associated with an user, an account, a zone, or a membership.

    - `"accounts"`

    - `"user"`

    - `"zones"`

    - `"memberships"`

- `resource_type: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs based on the unique type of resource changed by the action.

- `zone_id: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the zone ID.

- `zone_name: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the zone name associated with the change.

### Returns

- `errors: optional array of object { message }`

  - `message: string`

- `result: optional array of object { id, account, action, 4 more }`

  - `id: optional string`

    A unique identifier for the audit log entry.

  - `account: optional object { id, name }`

    Contains account related information.

    - `id: optional string`

      A unique identifier for the account.

    - `name: optional string`

      A string that identifies the account name.

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

    - `type: optional "account" or "cloudflare_admin" or "system" or "user"`

      The type of actor.

      - `"account"`

      - `"cloudflare_admin"`

      - `"system"`

      - `"user"`

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

  - `zone: optional object { id, name }`

    Provides details about the zone affected by the action.

    - `id: optional string`

      A string that identifies the zone id.

    - `name: optional string`

      A string that identifies the zone name.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/logs/audit \
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
      "account": {
        "id": "4bb334f7c94c4a29a045f03944f072e5",
        "name": "Example Account"
      },
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
      "raw": {
        "cf_ray_id": "8e9b1c60ef9e1c9a",
        "method": "POST",
        "status_code": 200,
        "uri": "/accounts/4bb334f7c94c4a29a045f03944f072e5/members",
        "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15"
      },
      "resource": {
        "id": "id",
        "product": "members",
        "request": {},
        "response": {},
        "scope": {},
        "type": "type"
      },
      "zone": {
        "id": "id",
        "name": "example.com"
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

- `AuditListResponse object { id, account, action, 4 more }`

  - `id: optional string`

    A unique identifier for the audit log entry.

  - `account: optional object { id, name }`

    Contains account related information.

    - `id: optional string`

      A unique identifier for the account.

    - `name: optional string`

      A string that identifies the account name.

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

    - `type: optional "account" or "cloudflare_admin" or "system" or "user"`

      The type of actor.

      - `"account"`

      - `"cloudflare_admin"`

      - `"system"`

      - `"user"`

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

  - `zone: optional object { id, name }`

    Provides details about the zone affected by the action.

    - `id: optional string`

      A string that identifies the zone id.

    - `name: optional string`

      A string that identifies the zone name.
