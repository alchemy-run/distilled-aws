# Memberships

## List Memberships

**get** `/memberships`

List memberships of accounts the user can access.

### Query Parameters

- `account: optional object { name }`

  - `name: optional string`

    Account name

- `direction: optional "asc" or "desc"`

  Direction to order memberships.

  - `"asc"`

  - `"desc"`

- `name: optional string`

  Account name

- `order: optional "id" or "account.name" or "status"`

  Field to order memberships by.

  - `"id"`

  - `"account.name"`

  - `"status"`

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of memberships per page.

- `status: optional "accepted" or "pending" or "rejected"`

  Status of this membership.

  - `"accepted"`

  - `"pending"`

  - `"rejected"`

### Returns

- `IAMCollectionMembershipResponse object { errors, messages, success, 2 more }`

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

  - `result: optional array of Membership`

    - `id: optional string`

      Membership identifier tag.

    - `account: optional Account`

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

    - `api_access_enabled: optional boolean`

      Enterprise only. Indicates whether or not API access is enabled specifically for this user on a given account.

    - `permissions: optional object { analytics, billing, cache_purge, 9 more }`

      All access permissions for the user at the account.

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

    - `roles: optional array of string`

      List of role names the membership has for this account.

    - `status: optional "accepted" or "pending" or "rejected"`

      Status of this membership.

      - `"accepted"`

      - `"pending"`

      - `"rejected"`

  - `result_info: optional object { count, page, per_page, total_count }`

    - `count: optional number`

      Total number of results for the requested service

    - `page: optional number`

      Current page within paginated list of results

    - `per_page: optional number`

      Number of results per page of results

    - `total_count: optional number`

      Total results available without any search parameters

- `IAMCollectionMembershipResponseWithPolicies object { errors, messages, success, 2 more }`

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

  - `result: optional array of object { id, account, api_access_enabled, 4 more }`

    - `id: optional string`

      Membership identifier tag.

    - `account: optional Account`

    - `api_access_enabled: optional boolean`

      Enterprise only. Indicates whether or not API access is enabled specifically for this user on a given account.

    - `permissions: optional object { analytics, billing, cache_purge, 9 more }`

      All access permissions for the user at the account.

      - `analytics: optional PermissionGrant`

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

    - `roles: optional array of string`

      List of role names the membership has for this account.

    - `status: optional "accepted" or "pending" or "rejected"`

      Status of this membership.

      - `"accepted"`

      - `"pending"`

      - `"rejected"`

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
curl https://api.cloudflare.com/client/v4/memberships \
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
      "account": {
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
      },
      "api_access_enabled": true,
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
      },
      "roles": [
        "Account Administrator"
      ],
      "status": "accepted"
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

## Membership Details

**get** `/memberships/{membership_id}`

Get a specific membership.

### Path Parameters

- `membership_id: string`

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

- `result: optional object { id, account, api_access_enabled, 4 more }`

  - `id: optional string`

    Membership identifier tag.

  - `account: optional Account`

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

  - `api_access_enabled: optional boolean`

    Enterprise only. Indicates whether or not API access is enabled specifically for this user on a given account.

  - `permissions: optional object { analytics, billing, cache_purge, 9 more }`

    All access permissions for the user at the account.

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

  - `roles: optional array of string`

    List of role names the membership has for this account.

  - `status: optional "accepted" or "pending" or "rejected"`

    Status of this membership.

    - `"accepted"`

    - `"pending"`

    - `"rejected"`

### Example

```http
curl https://api.cloudflare.com/client/v4/memberships/$MEMBERSHIP_ID \
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
    "account": {
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
    },
    "api_access_enabled": true,
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
    },
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
      "Account Administrator"
    ],
    "status": "accepted"
  }
}
```

## Update Membership

**put** `/memberships/{membership_id}`

Accept or reject this account invitation.

### Path Parameters

- `membership_id: string`

  Membership identifier tag.

### Body Parameters

- `status: "accepted" or "rejected"`

  Whether to accept or reject this account invitation.

  - `"accepted"`

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

- `result: optional object { id, account, api_access_enabled, 4 more }`

  - `id: optional string`

    Membership identifier tag.

  - `account: optional Account`

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

  - `api_access_enabled: optional boolean`

    Enterprise only. Indicates whether or not API access is enabled specifically for this user on a given account.

  - `permissions: optional object { analytics, billing, cache_purge, 9 more }`

    All access permissions for the user at the account.

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

  - `roles: optional array of string`

    List of role names the membership has for this account.

  - `status: optional "accepted" or "pending" or "rejected"`

    Status of this membership.

    - `"accepted"`

    - `"pending"`

    - `"rejected"`

### Example

```http
curl https://api.cloudflare.com/client/v4/memberships/$MEMBERSHIP_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "status": "accepted"
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
    "account": {
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
    },
    "api_access_enabled": true,
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
    },
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
      "Account Administrator"
    ],
    "status": "accepted"
  }
}
```

## Delete Membership

**delete** `/memberships/{membership_id}`

Remove the associated member from an account.

### Path Parameters

- `membership_id: string`

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

  - `id: optional string`

    Membership identifier tag.

### Example

```http
curl https://api.cloudflare.com/client/v4/memberships/$MEMBERSHIP_ID \
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
    "id": "4536bcfad5faccb111b47003c79917fa"
  }
}
```

## Domain Types

### Membership

- `Membership object { id, account, api_access_enabled, 3 more }`

  - `id: optional string`

    Membership identifier tag.

  - `account: optional Account`

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

  - `api_access_enabled: optional boolean`

    Enterprise only. Indicates whether or not API access is enabled specifically for this user on a given account.

  - `permissions: optional object { analytics, billing, cache_purge, 9 more }`

    All access permissions for the user at the account.

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

  - `roles: optional array of string`

    List of role names the membership has for this account.

  - `status: optional "accepted" or "pending" or "rejected"`

    Status of this membership.

    - `"accepted"`

    - `"pending"`

    - `"rejected"`

### Membership Get Response

- `MembershipGetResponse object { id, account, api_access_enabled, 4 more }`

  - `id: optional string`

    Membership identifier tag.

  - `account: optional Account`

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

  - `api_access_enabled: optional boolean`

    Enterprise only. Indicates whether or not API access is enabled specifically for this user on a given account.

  - `permissions: optional object { analytics, billing, cache_purge, 9 more }`

    All access permissions for the user at the account.

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

  - `roles: optional array of string`

    List of role names the membership has for this account.

  - `status: optional "accepted" or "pending" or "rejected"`

    Status of this membership.

    - `"accepted"`

    - `"pending"`

    - `"rejected"`

### Membership Update Response

- `MembershipUpdateResponse object { id, account, api_access_enabled, 4 more }`

  - `id: optional string`

    Membership identifier tag.

  - `account: optional Account`

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

  - `api_access_enabled: optional boolean`

    Enterprise only. Indicates whether or not API access is enabled specifically for this user on a given account.

  - `permissions: optional object { analytics, billing, cache_purge, 9 more }`

    All access permissions for the user at the account.

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

  - `roles: optional array of string`

    List of role names the membership has for this account.

  - `status: optional "accepted" or "pending" or "rejected"`

    Status of this membership.

    - `"accepted"`

    - `"pending"`

    - `"rejected"`

### Membership Delete Response

- `MembershipDeleteResponse object { id }`

  - `id: optional string`

    Membership identifier tag.
