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
