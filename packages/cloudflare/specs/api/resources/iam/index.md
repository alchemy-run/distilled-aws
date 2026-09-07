# IAM

# Permission Groups

## List Account Permission Groups

**get** `/accounts/{account_id}/iam/permission_groups`

List all the permissions groups for an account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Query Parameters

- `id: optional string`

  ID of the permission group to be fetched.

- `label: optional string`

  Label of the permission group to be fetched.

- `name: optional string`

  Name of the permission group to be fetched.

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

- `result: optional array of object { id, meta, name }`

  A set of permission groups that are specified to the policy.

  - `id: string`

    Identifier of the permission group.

  - `meta: optional object { key, value }`

    Attributes associated to the permission group.

    - `key: optional string`

    - `value: optional string`

  - `name: optional string`

    Name of the permission group.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/permission_groups \
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
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Permission Group Details

**get** `/accounts/{account_id}/iam/permission_groups/{permission_group_id}`

Get information about a specific permission group in an account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `permission_group_id: string`

  Permission Group identifier tag.

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

- `result: optional object { id, meta, name }`

  A named group of permissions that map to a group of operations against resources.

  - `id: string`

    Identifier of the permission group.

  - `meta: optional object { key, value }`

    Attributes associated to the permission group.

    - `key: optional string`

    - `value: optional string`

  - `name: optional string`

    Name of the permission group.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/permission_groups/$PERMISSION_GROUP_ID \
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
    "id": "6d7f2f5f5b1d4a0e9081fdc98d432fd1",
    "meta": {
      "key": "key",
      "value": "value"
    },
    "name": "Load Balancer"
  }
}
```

## Domain Types

### Permission Group List Response

- `PermissionGroupListResponse object { id, meta, name }`

  A named group of permissions that map to a group of operations against resources.

  - `id: string`

    Identifier of the permission group.

  - `meta: optional object { key, value }`

    Attributes associated to the permission group.

    - `key: optional string`

    - `value: optional string`

  - `name: optional string`

    Name of the permission group.

### Permission Group Get Response

- `PermissionGroupGetResponse object { id, meta, name }`

  A named group of permissions that map to a group of operations against resources.

  - `id: string`

    Identifier of the permission group.

  - `meta: optional object { key, value }`

    Attributes associated to the permission group.

    - `key: optional string`

    - `value: optional string`

  - `name: optional string`

    Name of the permission group.

# Resource Groups

## List Resource Groups

**get** `/accounts/{account_id}/iam/resource_groups`

List all the resource groups for an account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Query Parameters

- `id: optional string`

  ID of the resource group to be fetched.

- `name: optional string`

  Name of the resource group to be fetched.

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

- `result: optional array of object { id, scope, meta, name }`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/resource_groups \
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
```

## Resource Group Details

**get** `/accounts/{account_id}/iam/resource_groups/{resource_group_id}`

Get information about a specific resource group in an account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `resource_group_id: string`

  Resource Group identifier tag.

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

- `result: optional object { id, scope, meta, name }`

  A group of scoped resources.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/resource_groups/$RESOURCE_GROUP_ID \
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
}
```

## Create Resource Group

**post** `/accounts/{account_id}/iam/resource_groups`

Create a new Resource Group under the specified account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Body Parameters

- `name: string`

  Name of the resource group

- `scope: object { key, objects }`

  A scope is a combination of scope objects which provides additional context.

  - `key: string`

    This is a combination of pre-defined resource name and identifier (like Account ID etc.)

  - `objects: array of object { key }`

    A list of scope objects for additional context. The number of Scope objects should not be zero.

    - `key: string`

      This is a combination of pre-defined resource name and identifier (like Zone ID etc.)

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

- `result: optional object { id, scope, meta, name }`

  A group of scoped resources.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/resource_groups \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "NewResourceGroup",
          "scope": {
            "key": "com.cloudflare.api.account.eb78d65290b24279ba6f44721b3ea3c4",
            "objects": [
              {
                "key": "com.cloudflare.api.account.zone.23f8d65290b24279ba6f44721b3eaad5"
              }
            ]
          }
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
}
```

## Update Resource Group

**put** `/accounts/{account_id}/iam/resource_groups/{resource_group_id}`

Modify an existing resource group.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `resource_group_id: string`

  Resource Group identifier tag.

### Body Parameters

- `name: optional string`

  Name of the resource group

- `scope: optional object { key, objects }`

  A scope is a combination of scope objects which provides additional context.

  - `key: string`

    This is a combination of pre-defined resource name and identifier (like Account ID etc.)

  - `objects: array of object { key }`

    A list of scope objects for additional context. The number of Scope objects should not be zero.

    - `key: string`

      This is a combination of pre-defined resource name and identifier (like Zone ID etc.)

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

- `result: optional object { id, scope, meta, name }`

  A group of scoped resources.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/resource_groups/$RESOURCE_GROUP_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "UpdatedResourceGroup"
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
}
```

## Remove Resource Group

**delete** `/accounts/{account_id}/iam/resource_groups/{resource_group_id}`

Remove a resource group from an account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `resource_group_id: string`

  Resource Group identifier tag.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/resource_groups/$RESOURCE_GROUP_ID \
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

## Domain Types

### Resource Group List Response

- `ResourceGroupListResponse object { id, scope, meta, name }`

  A group of scoped resources.

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

### Resource Group Get Response

- `ResourceGroupGetResponse object { id, scope, meta, name }`

  A group of scoped resources.

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

### Resource Group Create Response

- `ResourceGroupCreateResponse object { id, scope, meta, name }`

  A group of scoped resources.

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

### Resource Group Update Response

- `ResourceGroupUpdateResponse object { id, scope, meta, name }`

  A group of scoped resources.

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

### Resource Group Delete Response

- `ResourceGroupDeleteResponse object { id }`

  - `id: string`

    Identifier

# User Groups

## List User Groups

**get** `/accounts/{account_id}/iam/user_groups`

List all the user groups for an account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Query Parameters

- `id: optional string`

  ID of the user group to be fetched.

- `direction: optional "asc" or "desc"`

  The sort order of returned user groups by name (ascending or descending).

  - `"asc"`

  - `"desc"`

- `fuzzyName: optional string`

  A string used for searching for user groups containing that substring.

- `name: optional string`

  Name of the user group to be fetched.

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

- `result: optional array of object { id, created_on, modified_on, 2 more }`

  A list of user groups for the account.

  - `id: string`

    User Group identifier tag.

  - `created_on: string`

    Timestamp for the creation of the user group

  - `modified_on: string`

    Last time the user group was modified.

  - `name: string`

    Name of the user group.

  - `policies: optional array of object { id, access, permission_groups, resource_groups }`

    Policies attached to the User group

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/user_groups \
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
      "created_on": "2024-03-01T12:21:02.0000Z",
      "modified_on": "2024-03-01T12:21:02.0000Z",
      "name": "My New User Group",
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

## User Group Details

**get** `/accounts/{account_id}/iam/user_groups/{user_group_id}`

Get information about a specific user group in an account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `user_group_id: string`

  User Group identifier tag.

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

- `result: optional object { id, created_on, modified_on, 2 more }`

  A group of policies resources.

  - `id: string`

    User Group identifier tag.

  - `created_on: string`

    Timestamp for the creation of the user group

  - `modified_on: string`

    Last time the user group was modified.

  - `name: string`

    Name of the user group.

  - `policies: optional array of object { id, access, permission_groups, resource_groups }`

    Policies attached to the User group

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/user_groups/$USER_GROUP_ID \
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
    "created_on": "2024-03-01T12:21:02.0000Z",
    "modified_on": "2024-03-01T12:21:02.0000Z",
    "name": "My New User Group",
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
    ]
  }
}
```

## Create User Group

**post** `/accounts/{account_id}/iam/user_groups`

Create a new user group under the specified account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Body Parameters

- `name: string`

  Name of the User group.

- `policies: optional array of object { access, permission_groups, resource_groups }`

  Policies attached to the User group

  - `access: "allow" or "deny"`

    Allow or deny operations against the resources.

    - `"allow"`

    - `"deny"`

  - `permission_groups: array of object { id }`

    A set of permission groups that are specified to the policy.

    - `id: string`

      Permission Group identifier tag.

  - `resource_groups: array of object { id }`

    A set of resource groups that are specified to the policy.

    - `id: string`

      Resource Group identifier tag.

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

- `result: optional object { id, created_on, modified_on, 2 more }`

  A group of policies resources.

  - `id: string`

    User Group identifier tag.

  - `created_on: string`

    Timestamp for the creation of the user group

  - `modified_on: string`

    Last time the user group was modified.

  - `name: string`

    Name of the user group.

  - `policies: optional array of object { id, access, permission_groups, resource_groups }`

    Policies attached to the User group

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/user_groups \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "name": "My New User Group"
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
    "created_on": "2024-03-01T12:21:02.0000Z",
    "modified_on": "2024-03-01T12:21:02.0000Z",
    "name": "My New User Group",
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
    ]
  }
}
```

## Update User Group

**put** `/accounts/{account_id}/iam/user_groups/{user_group_id}`

Modify an existing user group.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `user_group_id: string`

  User Group identifier tag.

### Body Parameters

- `name: optional string`

  Name of the User group.

- `policies: optional array of object { id, access, permission_groups, resource_groups }`

  Policies attached to the User group

  - `id: string`

    Policy identifier.

  - `access: "allow" or "deny"`

    Allow or deny operations against the resources.

    - `"allow"`

    - `"deny"`

  - `permission_groups: array of object { id }`

    A set of permission groups that are specified to the policy.

    - `id: string`

      Permission Group identifier tag.

  - `resource_groups: array of object { id }`

    A set of resource groups that are specified to the policy.

    - `id: string`

      Resource Group identifier tag.

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

- `result: optional object { id, created_on, modified_on, 2 more }`

  A group of policies resources.

  - `id: string`

    User Group identifier tag.

  - `created_on: string`

    Timestamp for the creation of the user group

  - `modified_on: string`

    Last time the user group was modified.

  - `name: string`

    Name of the user group.

  - `policies: optional array of object { id, access, permission_groups, resource_groups }`

    Policies attached to the User group

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/user_groups/$USER_GROUP_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "name": "My New User Group"
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
    "created_on": "2024-03-01T12:21:02.0000Z",
    "modified_on": "2024-03-01T12:21:02.0000Z",
    "name": "My New User Group",
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
    ]
  }
}
```

## Remove User Group

**delete** `/accounts/{account_id}/iam/user_groups/{user_group_id}`

Remove a user group from an account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `user_group_id: string`

  User Group identifier tag.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/user_groups/$USER_GROUP_ID \
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

### User Group List Response

- `UserGroupListResponse object { id, created_on, modified_on, 2 more }`

  A group of policies resources.

  - `id: string`

    User Group identifier tag.

  - `created_on: string`

    Timestamp for the creation of the user group

  - `modified_on: string`

    Last time the user group was modified.

  - `name: string`

    Name of the user group.

  - `policies: optional array of object { id, access, permission_groups, resource_groups }`

    Policies attached to the User group

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

### User Group Get Response

- `UserGroupGetResponse object { id, created_on, modified_on, 2 more }`

  A group of policies resources.

  - `id: string`

    User Group identifier tag.

  - `created_on: string`

    Timestamp for the creation of the user group

  - `modified_on: string`

    Last time the user group was modified.

  - `name: string`

    Name of the user group.

  - `policies: optional array of object { id, access, permission_groups, resource_groups }`

    Policies attached to the User group

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

### User Group Create Response

- `UserGroupCreateResponse object { id, created_on, modified_on, 2 more }`

  A group of policies resources.

  - `id: string`

    User Group identifier tag.

  - `created_on: string`

    Timestamp for the creation of the user group

  - `modified_on: string`

    Last time the user group was modified.

  - `name: string`

    Name of the user group.

  - `policies: optional array of object { id, access, permission_groups, resource_groups }`

    Policies attached to the User group

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

### User Group Update Response

- `UserGroupUpdateResponse object { id, created_on, modified_on, 2 more }`

  A group of policies resources.

  - `id: string`

    User Group identifier tag.

  - `created_on: string`

    Timestamp for the creation of the user group

  - `modified_on: string`

    Last time the user group was modified.

  - `name: string`

    Name of the user group.

  - `policies: optional array of object { id, access, permission_groups, resource_groups }`

    Policies attached to the User group

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

### User Group Delete Response

- `UserGroupDeleteResponse object { id }`

  - `id: string`

    Identifier

# Members

## List User Group Members

**get** `/accounts/{account_id}/iam/user_groups/{user_group_id}/members`

List all the members attached to a user group.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `user_group_id: string`

  User Group identifier tag.

### Query Parameters

- `direction: optional "asc" or "desc"`

  The sort order of returned user group members by email.

  - `"asc"`

  - `"desc"`

- `fuzzyEmail: optional string`

  A string used for filtering members by partial email match.

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

- `result: optional array of object { id, email, status }`

  - `id: string`

    Account member identifier.

  - `email: optional string`

    The contact email address of the user.

  - `status: optional "accepted" or "pending"`

    The member's status in the account.

    - `"accepted"`

    - `"pending"`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/user_groups/$USER_GROUP_ID/members \
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
      "id": "4f5f0c14a2a41d5063dd301b2f829f04",
      "email": "user@example.com",
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

## Get User Group Member

**get** `/accounts/{account_id}/iam/user_groups/{user_group_id}/members/{member_id}`

Get details of a specific member in a user group.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `user_group_id: string`

  User Group identifier tag.

- `member_id: string`

  The identifier of an existing account Member.

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

- `result: optional object { id, created_at, email, 2 more }`

  Detailed member information for a User Group member.

  - `id: string`

    Account member identifier.

  - `created_at: optional string`

    When the member was added to the user group.

  - `email: optional string`

    The contact email address of the user.

  - `status: optional "accepted" or "pending"`

    The member's status in the account.

    - `"accepted"`

    - `"pending"`

  - `user: optional object { id, email, first_name, last_name }`

    Details of the user associated with this membership.

    - `id: optional string`

      User identifier tag.

    - `email: optional string`

      The contact email address of the user.

    - `first_name: optional string`

      User's first name.

    - `last_name: optional string`

      User's last name.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/user_groups/$USER_GROUP_ID/members/$MEMBER_ID \
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
    "id": "4f5f0c14a2a41d5063dd301b2f829f04",
    "created_at": "2026-01-15T10:30:00Z",
    "email": "user@example.com",
    "status": "accepted",
    "user": {
      "id": "7c5dae5552338874e5053f2534d2767a",
      "email": "user@example.com",
      "first_name": "Alice",
      "last_name": "Smith"
    }
  }
}
```

## Add User Group Members

**post** `/accounts/{account_id}/iam/user_groups/{user_group_id}/members`

Add members to a User Group.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `user_group_id: string`

  User Group identifier tag.

### Body Parameters

- `members: array of object { id }`

  - `id: string`

    The identifier of an existing account Member.

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

- `result: optional array of object { id, email, status }`

  - `id: string`

    Account member identifier.

  - `email: optional string`

    The contact email address of the user.

  - `status: optional "accepted" or "pending"`

    The member's status in the account.

    - `"accepted"`

    - `"pending"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/user_groups/$USER_GROUP_ID/members \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '[
          {
            "id": "023e105f4ecef8ad9ca31a8372d0c353"
          }
        ]'
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
      "id": "4f5f0c14a2a41d5063dd301b2f829f04",
      "email": "user@example.com",
      "status": "accepted"
    }
  ]
}
```

## Update User Group Members

**put** `/accounts/{account_id}/iam/user_groups/{user_group_id}/members`

Replace the set of members attached to a User Group.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `user_group_id: string`

  User Group identifier tag.

### Body Parameters

- `members: array of object { id }`

  Set/Replace members to a user group.

  - `id: string`

    The identifier of an existing account Member.

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

- `result: optional array of object { id, email, status }`

  - `id: string`

    Account member identifier.

  - `email: optional string`

    The contact email address of the user.

  - `status: optional "accepted" or "pending"`

    The member's status in the account.

    - `"accepted"`

    - `"pending"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/user_groups/$USER_GROUP_ID/members \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '[
          {
            "id": "023e105f4ecef8ad9ca31a8372d0c353"
          }
        ]'
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
      "id": "4f5f0c14a2a41d5063dd301b2f829f04",
      "email": "user@example.com",
      "status": "accepted"
    }
  ]
}
```

## Remove User Group Member

**delete** `/accounts/{account_id}/iam/user_groups/{user_group_id}/members/{member_id}`

Remove a member from User Group

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `user_group_id: string`

  User Group identifier tag.

- `member_id: string`

  The identifier of an existing account Member.

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

- `result: optional object { id, email, status }`

  Member attached to a User Group.

  - `id: string`

    Account member identifier.

  - `email: optional string`

    The contact email address of the user.

  - `status: optional "accepted" or "pending"`

    The member's status in the account.

    - `"accepted"`

    - `"pending"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/user_groups/$USER_GROUP_ID/members/$MEMBER_ID \
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
    "id": "4f5f0c14a2a41d5063dd301b2f829f04",
    "email": "user@example.com",
    "status": "accepted"
  }
}
```

## Domain Types

### Member List Response

- `MemberListResponse object { id, email, status }`

  Member attached to a User Group.

  - `id: string`

    Account member identifier.

  - `email: optional string`

    The contact email address of the user.

  - `status: optional "accepted" or "pending"`

    The member's status in the account.

    - `"accepted"`

    - `"pending"`

### Member Get Response

- `MemberGetResponse object { id, created_at, email, 2 more }`

  Detailed member information for a User Group member.

  - `id: string`

    Account member identifier.

  - `created_at: optional string`

    When the member was added to the user group.

  - `email: optional string`

    The contact email address of the user.

  - `status: optional "accepted" or "pending"`

    The member's status in the account.

    - `"accepted"`

    - `"pending"`

  - `user: optional object { id, email, first_name, last_name }`

    Details of the user associated with this membership.

    - `id: optional string`

      User identifier tag.

    - `email: optional string`

      The contact email address of the user.

    - `first_name: optional string`

      User's first name.

    - `last_name: optional string`

      User's last name.

### Member Create Response

- `MemberCreateResponse object { id, email, status }`

  Member attached to a User Group.

  - `id: string`

    Account member identifier.

  - `email: optional string`

    The contact email address of the user.

  - `status: optional "accepted" or "pending"`

    The member's status in the account.

    - `"accepted"`

    - `"pending"`

### Member Update Response

- `MemberUpdateResponse object { id, email, status }`

  Member attached to a User Group.

  - `id: string`

    Account member identifier.

  - `email: optional string`

    The contact email address of the user.

  - `status: optional "accepted" or "pending"`

    The member's status in the account.

    - `"accepted"`

    - `"pending"`

### Member Delete Response

- `MemberDeleteResponse object { id, email, status }`

  Member attached to a User Group.

  - `id: string`

    Account member identifier.

  - `email: optional string`

    The contact email address of the user.

  - `status: optional "accepted" or "pending"`

    The member's status in the account.

    - `"accepted"`

    - `"pending"`

# SSO

## Get all SSO connectors

**get** `/accounts/{account_id}/sso_connectors`

Lists all SSO connectors configured for the account.

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

- `result: optional array of object { id, created_on, email_domain, 4 more }`

  - `id: optional string`

    SSO Connector identifier tag.

  - `created_on: optional string`

    Timestamp for the creation of the SSO connector

  - `email_domain: optional string`

  - `enabled: optional boolean`

  - `updated_on: optional string`

    Timestamp for the last update of the SSO connector

  - `use_fedramp_language: optional boolean`

    Controls the display of FedRAMP language to the user during SSO login

  - `verification: optional object { code, status }`

    - `code: optional string`

      DNS verification code. Add this entire string to the DNS TXT record of the email domain to validate ownership.

    - `status: optional "awaiting" or "pending" or "failed" or "verified"`

      The status of the verification code from the verification process.

      - `"awaiting"`

      - `"pending"`

      - `"failed"`

      - `"verified"`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/sso_connectors \
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_on": "2025-01-01T12:21:02.0000Z",
      "email_domain": "example.com",
      "enabled": false,
      "updated_on": "2025-01-01T12:21:02.0000Z",
      "use_fedramp_language": false,
      "verification": {
        "code": "cloudflare_dashboard_sso=023e105f4ecef8ad9ca31a8372d0c353",
        "status": "pending"
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

## Get single SSO connector

**get** `/accounts/{account_id}/sso_connectors/{sso_connector_id}`

Retrieves details for a specific SSO connector.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `sso_connector_id: string`

  SSO Connector identifier tag.

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

- `result: optional object { id, created_on, email_domain, 4 more }`

  - `id: optional string`

    SSO Connector identifier tag.

  - `created_on: optional string`

    Timestamp for the creation of the SSO connector

  - `email_domain: optional string`

  - `enabled: optional boolean`

  - `updated_on: optional string`

    Timestamp for the last update of the SSO connector

  - `use_fedramp_language: optional boolean`

    Controls the display of FedRAMP language to the user during SSO login

  - `verification: optional object { code, status }`

    - `code: optional string`

      DNS verification code. Add this entire string to the DNS TXT record of the email domain to validate ownership.

    - `status: optional "awaiting" or "pending" or "failed" or "verified"`

      The status of the verification code from the verification process.

      - `"awaiting"`

      - `"pending"`

      - `"failed"`

      - `"verified"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/sso_connectors/$SSO_CONNECTOR_ID \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2025-01-01T12:21:02.0000Z",
    "email_domain": "example.com",
    "enabled": false,
    "updated_on": "2025-01-01T12:21:02.0000Z",
    "use_fedramp_language": false,
    "verification": {
      "code": "cloudflare_dashboard_sso=023e105f4ecef8ad9ca31a8372d0c353",
      "status": "pending"
    }
  }
}
```

## Initialize new SSO connector

**post** `/accounts/{account_id}/sso_connectors`

Creates a new SSO connector for logging into Cloudflare through an identity provider.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Body Parameters

- `email_domain: string`

  Email domain of the new SSO connector

- `begin_verification: optional boolean`

  Begin the verification process after creation

- `use_fedramp_language: optional boolean`

  Controls the display of FedRAMP language to the user during SSO login

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

- `result: optional object { id, created_on, email_domain, 4 more }`

  - `id: optional string`

    SSO Connector identifier tag.

  - `created_on: optional string`

    Timestamp for the creation of the SSO connector

  - `email_domain: optional string`

  - `enabled: optional boolean`

  - `updated_on: optional string`

    Timestamp for the last update of the SSO connector

  - `use_fedramp_language: optional boolean`

    Controls the display of FedRAMP language to the user during SSO login

  - `verification: optional object { code, status }`

    - `code: optional string`

      DNS verification code. Add this entire string to the DNS TXT record of the email domain to validate ownership.

    - `status: optional "awaiting" or "pending" or "failed" or "verified"`

      The status of the verification code from the verification process.

      - `"awaiting"`

      - `"pending"`

      - `"failed"`

      - `"verified"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/sso_connectors \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "email_domain": "example.com",
          "begin_verification": true
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
    "created_on": "2025-01-01T12:21:02.0000Z",
    "email_domain": "example.com",
    "enabled": false,
    "updated_on": "2025-01-01T12:21:02.0000Z",
    "use_fedramp_language": false,
    "verification": {
      "code": "cloudflare_dashboard_sso=023e105f4ecef8ad9ca31a8372d0c353",
      "status": "pending"
    }
  }
}
```

## Update SSO connector state

**patch** `/accounts/{account_id}/sso_connectors/{sso_connector_id}`

Updates the state or configuration of an SSO connector.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `sso_connector_id: string`

  SSO Connector identifier tag.

### Body Parameters

- `enabled: optional boolean`

  SSO Connector enabled state

- `use_fedramp_language: optional boolean`

  Controls the display of FedRAMP language to the user during SSO login

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

- `result: optional object { id, created_on, email_domain, 4 more }`

  - `id: optional string`

    SSO Connector identifier tag.

  - `created_on: optional string`

    Timestamp for the creation of the SSO connector

  - `email_domain: optional string`

  - `enabled: optional boolean`

  - `updated_on: optional string`

    Timestamp for the last update of the SSO connector

  - `use_fedramp_language: optional boolean`

    Controls the display of FedRAMP language to the user during SSO login

  - `verification: optional object { code, status }`

    - `code: optional string`

      DNS verification code. Add this entire string to the DNS TXT record of the email domain to validate ownership.

    - `status: optional "awaiting" or "pending" or "failed" or "verified"`

      The status of the verification code from the verification process.

      - `"awaiting"`

      - `"pending"`

      - `"failed"`

      - `"verified"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/sso_connectors/$SSO_CONNECTOR_ID \
    -X PATCH \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2025-01-01T12:21:02.0000Z",
    "email_domain": "example.com",
    "enabled": false,
    "updated_on": "2025-01-01T12:21:02.0000Z",
    "use_fedramp_language": false,
    "verification": {
      "code": "cloudflare_dashboard_sso=023e105f4ecef8ad9ca31a8372d0c353",
      "status": "pending"
    }
  }
}
```

## Delete SSO connector

**delete** `/accounts/{account_id}/sso_connectors/{sso_connector_id}`

Deletes an SSO connector from the account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `sso_connector_id: string`

  SSO Connector identifier tag.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/sso_connectors/$SSO_CONNECTOR_ID \
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

## Begin SSO connector verification

**post** `/accounts/{account_id}/sso_connectors/{sso_connector_id}/begin_verification`

Validates the user has added the DNS TXT record required for validating ownership of the domain they are trying to set up a connector for.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `sso_connector_id: string`

  SSO Connector identifier tag.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/sso_connectors/$SSO_CONNECTOR_ID/begin_verification \
    -X POST \
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
  "success": true
}
```

## Domain Types

### SSO List Response

- `SSOListResponse object { id, created_on, email_domain, 4 more }`

  - `id: optional string`

    SSO Connector identifier tag.

  - `created_on: optional string`

    Timestamp for the creation of the SSO connector

  - `email_domain: optional string`

  - `enabled: optional boolean`

  - `updated_on: optional string`

    Timestamp for the last update of the SSO connector

  - `use_fedramp_language: optional boolean`

    Controls the display of FedRAMP language to the user during SSO login

  - `verification: optional object { code, status }`

    - `code: optional string`

      DNS verification code. Add this entire string to the DNS TXT record of the email domain to validate ownership.

    - `status: optional "awaiting" or "pending" or "failed" or "verified"`

      The status of the verification code from the verification process.

      - `"awaiting"`

      - `"pending"`

      - `"failed"`

      - `"verified"`

### SSO Get Response

- `SSOGetResponse object { id, created_on, email_domain, 4 more }`

  - `id: optional string`

    SSO Connector identifier tag.

  - `created_on: optional string`

    Timestamp for the creation of the SSO connector

  - `email_domain: optional string`

  - `enabled: optional boolean`

  - `updated_on: optional string`

    Timestamp for the last update of the SSO connector

  - `use_fedramp_language: optional boolean`

    Controls the display of FedRAMP language to the user during SSO login

  - `verification: optional object { code, status }`

    - `code: optional string`

      DNS verification code. Add this entire string to the DNS TXT record of the email domain to validate ownership.

    - `status: optional "awaiting" or "pending" or "failed" or "verified"`

      The status of the verification code from the verification process.

      - `"awaiting"`

      - `"pending"`

      - `"failed"`

      - `"verified"`

### SSO Create Response

- `SSOCreateResponse object { id, created_on, email_domain, 4 more }`

  - `id: optional string`

    SSO Connector identifier tag.

  - `created_on: optional string`

    Timestamp for the creation of the SSO connector

  - `email_domain: optional string`

  - `enabled: optional boolean`

  - `updated_on: optional string`

    Timestamp for the last update of the SSO connector

  - `use_fedramp_language: optional boolean`

    Controls the display of FedRAMP language to the user during SSO login

  - `verification: optional object { code, status }`

    - `code: optional string`

      DNS verification code. Add this entire string to the DNS TXT record of the email domain to validate ownership.

    - `status: optional "awaiting" or "pending" or "failed" or "verified"`

      The status of the verification code from the verification process.

      - `"awaiting"`

      - `"pending"`

      - `"failed"`

      - `"verified"`

### SSO Update Response

- `SSOUpdateResponse object { id, created_on, email_domain, 4 more }`

  - `id: optional string`

    SSO Connector identifier tag.

  - `created_on: optional string`

    Timestamp for the creation of the SSO connector

  - `email_domain: optional string`

  - `enabled: optional boolean`

  - `updated_on: optional string`

    Timestamp for the last update of the SSO connector

  - `use_fedramp_language: optional boolean`

    Controls the display of FedRAMP language to the user during SSO login

  - `verification: optional object { code, status }`

    - `code: optional string`

      DNS verification code. Add this entire string to the DNS TXT record of the email domain to validate ownership.

    - `status: optional "awaiting" or "pending" or "failed" or "verified"`

      The status of the verification code from the verification process.

      - `"awaiting"`

      - `"pending"`

      - `"failed"`

      - `"verified"`

### SSO Delete Response

- `SSODeleteResponse object { id }`

  - `id: string`

    Identifier

### SSO Begin Verification Response

- `SSOBeginVerificationResponse object { errors, messages, success }`

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

# OAuth Clients

## List OAuth Clients

**get** `/accounts/{account_id}/oauth_clients`

List all OAuth clients for an account.

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

- `result: optional array of object { client_id, visibility, allowed_cors_origins, 16 more }`

  - `client_id: string`

    The unique identifier for an OAuth client.

  - `visibility: "public" or "private"`

    Visibility of the OAuth client.

    - `"public"`

    - `"private"`

  - `allowed_cors_origins: optional array of string`

    Array of allowed CORS origins.

  - `client_name: optional string`

    Human-readable name of the OAuth client.

  - `client_uri: optional string`

    URL of the home page of the client.

  - `client_uri_verification: optional object { status, text }`

    Client URI domain control verification state.

    - `status: optional "pending" or "in_progress" or "verified" or "failed"`

      Current verification status for the client URI host.

      - `"pending"`

      - `"in_progress"`

      - `"verified"`

      - `"failed"`

    - `text: optional string`

      Exact TXT record value that must be added to DNS to prove ownership of the client URI host.

  - `created_at: optional string`

    Timestamp when the OAuth client was created.

  - `grant_types: optional array of "authorization_code" or "refresh_token"`

    Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.

    - `"authorization_code"`

    - `"refresh_token"`

  - `has_rotated_secret: optional boolean`

    Indicates whether the client has a rotated secret that has not yet been deleted.

  - `logo_uri: optional string`

    URL of the client's logo.

  - `policy_uri: optional string`

    URL that points to a privacy policy document.

  - `post_logout_redirect_uris: optional array of string`

    Array of allowed post-logout redirect URIs.

  - `promoted_at: optional string`

    Timestamp when the OAuth client was promoted to public visibility.

  - `redirect_uris: optional array of string`

    Array of allowed redirect URIs for the client.

  - `response_types: optional array of "token" or "id_token" or "code"`

    Array of OAuth response types the client is allowed to use.

    - `"token"`

    - `"id_token"`

    - `"code"`

  - `scopes: optional array of string`

    Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes `offline_access` and `openid` are added or removed automatically based on `grant_types` and `response_types`.

  - `token_endpoint_auth_method: optional "none" or "client_secret_basic" or "client_secret_post"`

    The authentication method the client uses at the token endpoint.

    - `"none"`

    - `"client_secret_basic"`

    - `"client_secret_post"`

  - `tos_uri: optional string`

    URL that points to a terms of service document.

  - `updated_at: optional string`

    Timestamp when the OAuth client was last updated.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/oauth_clients \
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
      "client_id": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4",
      "visibility": "private",
      "allowed_cors_origins": [
        "https://example.com"
      ],
      "client_name": "My OAuth App",
      "client_uri": "https://example.com",
      "client_uri_verification": {
        "status": "in_progress",
        "text": "cloudflare_oauth_client_publisher=example"
      },
      "created_at": "2025-01-01T00:00:00Z",
      "grant_types": [
        "authorization_code",
        "refresh_token"
      ],
      "has_rotated_secret": false,
      "logo_uri": "https://example.com/logo.png",
      "policy_uri": "https://example.com/privacy",
      "post_logout_redirect_uris": [
        "https://example.com/logout"
      ],
      "promoted_at": "2026-05-13T12:00:00Z",
      "redirect_uris": [
        "https://example.com/callback"
      ],
      "response_types": [
        "code"
      ],
      "scopes": [
        "account.read"
      ],
      "token_endpoint_auth_method": "client_secret_post",
      "tos_uri": "https://example.com/tos",
      "updated_at": "2025-01-01T00:00:00Z"
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

## OAuth Client Details

**get** `/accounts/{account_id}/oauth_clients/{oauth_client_id}`

Get details of a specific OAuth client.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `oauth_client_id: string`

  The unique identifier for an OAuth client.

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

- `result: optional object { client_id, visibility, allowed_cors_origins, 16 more }`

  Fields shared by OAuth client responses and create/update requests.

  - `client_id: string`

    The unique identifier for an OAuth client.

  - `visibility: "public" or "private"`

    Visibility of the OAuth client.

    - `"public"`

    - `"private"`

  - `allowed_cors_origins: optional array of string`

    Array of allowed CORS origins.

  - `client_name: optional string`

    Human-readable name of the OAuth client.

  - `client_uri: optional string`

    URL of the home page of the client.

  - `client_uri_verification: optional object { status, text }`

    Client URI domain control verification state.

    - `status: optional "pending" or "in_progress" or "verified" or "failed"`

      Current verification status for the client URI host.

      - `"pending"`

      - `"in_progress"`

      - `"verified"`

      - `"failed"`

    - `text: optional string`

      Exact TXT record value that must be added to DNS to prove ownership of the client URI host.

  - `created_at: optional string`

    Timestamp when the OAuth client was created.

  - `grant_types: optional array of "authorization_code" or "refresh_token"`

    Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.

    - `"authorization_code"`

    - `"refresh_token"`

  - `has_rotated_secret: optional boolean`

    Indicates whether the client has a rotated secret that has not yet been deleted.

  - `logo_uri: optional string`

    URL of the client's logo.

  - `policy_uri: optional string`

    URL that points to a privacy policy document.

  - `post_logout_redirect_uris: optional array of string`

    Array of allowed post-logout redirect URIs.

  - `promoted_at: optional string`

    Timestamp when the OAuth client was promoted to public visibility.

  - `redirect_uris: optional array of string`

    Array of allowed redirect URIs for the client.

  - `response_types: optional array of "token" or "id_token" or "code"`

    Array of OAuth response types the client is allowed to use.

    - `"token"`

    - `"id_token"`

    - `"code"`

  - `scopes: optional array of string`

    Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes `offline_access` and `openid` are added or removed automatically based on `grant_types` and `response_types`.

  - `token_endpoint_auth_method: optional "none" or "client_secret_basic" or "client_secret_post"`

    The authentication method the client uses at the token endpoint.

    - `"none"`

    - `"client_secret_basic"`

    - `"client_secret_post"`

  - `tos_uri: optional string`

    URL that points to a terms of service document.

  - `updated_at: optional string`

    Timestamp when the OAuth client was last updated.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/oauth_clients/$OAUTH_CLIENT_ID \
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
    "client_id": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4",
    "visibility": "private",
    "allowed_cors_origins": [
      "https://example.com"
    ],
    "client_name": "My OAuth App",
    "client_uri": "https://example.com",
    "client_uri_verification": {
      "status": "in_progress",
      "text": "cloudflare_oauth_client_publisher=example"
    },
    "created_at": "2025-01-01T00:00:00Z",
    "grant_types": [
      "authorization_code",
      "refresh_token"
    ],
    "has_rotated_secret": false,
    "logo_uri": "https://example.com/logo.png",
    "policy_uri": "https://example.com/privacy",
    "post_logout_redirect_uris": [
      "https://example.com/logout"
    ],
    "promoted_at": "2026-05-13T12:00:00Z",
    "redirect_uris": [
      "https://example.com/callback"
    ],
    "response_types": [
      "code"
    ],
    "scopes": [
      "account.read"
    ],
    "token_endpoint_auth_method": "client_secret_post",
    "tos_uri": "https://example.com/tos",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

## Create OAuth Client

**post** `/accounts/{account_id}/oauth_clients`

Create a new OAuth client for an account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Body Parameters

- `client_name: string`

  Human-readable name of the OAuth client.

- `grant_types: array of "authorization_code" or "refresh_token"`

  Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.

  - `"authorization_code"`

  - `"refresh_token"`

- `redirect_uris: array of string`

  Array of allowed redirect URIs for the client.

- `response_types: array of "token" or "id_token" or "code"`

  Array of OAuth response types the client is allowed to use.

  - `"token"`

  - `"id_token"`

  - `"code"`

- `scopes: array of string`

  Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes `offline_access` and `openid` are added or removed automatically based on `grant_types` and `response_types`.

- `token_endpoint_auth_method: "none" or "client_secret_basic" or "client_secret_post"`

  The authentication method the client uses at the token endpoint.

  - `"none"`

  - `"client_secret_basic"`

  - `"client_secret_post"`

- `allowed_cors_origins: optional array of string`

  Array of allowed CORS origins.

- `client_uri: optional string`

  URL of the home page of the client.

- `logo_uri: optional string`

  URL of the client's logo.

- `policy_uri: optional string`

  URL that points to a privacy policy document.

- `post_logout_redirect_uris: optional array of string`

  Array of allowed post-logout redirect URIs.

- `tos_uri: optional string`

  URL that points to a terms of service document.

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

- `result: optional object { client_id, visibility, allowed_cors_origins, 17 more }`

  Fields shared by OAuth client responses and create/update requests.

  - `client_id: string`

    The unique identifier for an OAuth client.

  - `visibility: "public" or "private"`

    Visibility of the OAuth client.

    - `"public"`

    - `"private"`

  - `allowed_cors_origins: optional array of string`

    Array of allowed CORS origins.

  - `client_name: optional string`

    Human-readable name of the OAuth client.

  - `client_secret: optional string`

    The client secret. This is the only time the secret is returned in a response.

  - `client_uri: optional string`

    URL of the home page of the client.

  - `client_uri_verification: optional object { status, text }`

    Client URI domain control verification state.

    - `status: optional "pending" or "in_progress" or "verified" or "failed"`

      Current verification status for the client URI host.

      - `"pending"`

      - `"in_progress"`

      - `"verified"`

      - `"failed"`

    - `text: optional string`

      Exact TXT record value that must be added to DNS to prove ownership of the client URI host.

  - `created_at: optional string`

    Timestamp when the OAuth client was created.

  - `grant_types: optional array of "authorization_code" or "refresh_token"`

    Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.

    - `"authorization_code"`

    - `"refresh_token"`

  - `has_rotated_secret: optional boolean`

    Indicates whether the client has a rotated secret that has not yet been deleted.

  - `logo_uri: optional string`

    URL of the client's logo.

  - `policy_uri: optional string`

    URL that points to a privacy policy document.

  - `post_logout_redirect_uris: optional array of string`

    Array of allowed post-logout redirect URIs.

  - `promoted_at: optional string`

    Timestamp when the OAuth client was promoted to public visibility.

  - `redirect_uris: optional array of string`

    Array of allowed redirect URIs for the client.

  - `response_types: optional array of "token" or "id_token" or "code"`

    Array of OAuth response types the client is allowed to use.

    - `"token"`

    - `"id_token"`

    - `"code"`

  - `scopes: optional array of string`

    Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes `offline_access` and `openid` are added or removed automatically based on `grant_types` and `response_types`.

  - `token_endpoint_auth_method: optional "none" or "client_secret_basic" or "client_secret_post"`

    The authentication method the client uses at the token endpoint.

    - `"none"`

    - `"client_secret_basic"`

    - `"client_secret_post"`

  - `tos_uri: optional string`

    URL that points to a terms of service document.

  - `updated_at: optional string`

    Timestamp when the OAuth client was last updated.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/oauth_clients \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "client_name": "My OAuth App",
          "grant_types": [
            "authorization_code",
            "refresh_token"
          ],
          "redirect_uris": [
            "https://example.com/callback"
          ],
          "response_types": [
            "code"
          ],
          "scopes": [
            "account.read"
          ],
          "token_endpoint_auth_method": "client_secret_post",
          "allowed_cors_origins": [
            "https://example.com"
          ],
          "client_uri": "https://example.com",
          "logo_uri": "https://example.com/logo.png",
          "policy_uri": "https://example.com/privacy",
          "post_logout_redirect_uris": [
            "https://example.com/logout"
          ],
          "tos_uri": "https://example.com/tos"
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
    "client_id": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4",
    "visibility": "private",
    "allowed_cors_origins": [
      "https://example.com"
    ],
    "client_name": "My OAuth App",
    "client_secret": "cf-oauth-secret-example",
    "client_uri": "https://example.com",
    "client_uri_verification": {
      "status": "in_progress",
      "text": "cloudflare_oauth_client_publisher=example"
    },
    "created_at": "2025-01-01T00:00:00Z",
    "grant_types": [
      "authorization_code",
      "refresh_token"
    ],
    "has_rotated_secret": false,
    "logo_uri": "https://example.com/logo.png",
    "policy_uri": "https://example.com/privacy",
    "post_logout_redirect_uris": [
      "https://example.com/logout"
    ],
    "promoted_at": "2026-05-13T12:00:00Z",
    "redirect_uris": [
      "https://example.com/callback"
    ],
    "response_types": [
      "code"
    ],
    "scopes": [
      "account.read"
    ],
    "token_endpoint_auth_method": "client_secret_post",
    "tos_uri": "https://example.com/tos",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

## Update OAuth Client

**patch** `/accounts/{account_id}/oauth_clients/{oauth_client_id}`

Update an existing OAuth client. Only include fields you want to update.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `oauth_client_id: string`

  The unique identifier for an OAuth client.

### Body Parameters

- `allowed_cors_origins: optional array of string`

  Array of allowed CORS origins.

- `client_name: optional string`

  Human-readable name of the OAuth client.

- `client_uri: optional string`

  URL of the home page of the client.

- `grant_types: optional array of "authorization_code" or "refresh_token"`

  Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.

  - `"authorization_code"`

  - `"refresh_token"`

- `logo_uri: optional string`

  URL of the client's logo.

- `policy_uri: optional string`

  URL that points to a privacy policy document.

- `post_logout_redirect_uris: optional array of string`

  Array of allowed post-logout redirect URIs.

- `redirect_uris: optional array of string`

  Array of allowed redirect URIs for the client.

- `response_types: optional array of "token" or "id_token" or "code"`

  Array of OAuth response types the client is allowed to use.

  - `"token"`

  - `"id_token"`

  - `"code"`

- `scopes: optional array of string`

  Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes `offline_access` and `openid` are added or removed automatically based on `grant_types` and `response_types`.

- `token_endpoint_auth_method: optional "none" or "client_secret_basic" or "client_secret_post"`

  The authentication method the client uses at the token endpoint.

  - `"none"`

  - `"client_secret_basic"`

  - `"client_secret_post"`

- `tos_uri: optional string`

  URL that points to a terms of service document.

- `visibility: optional "public"`

  Promote the OAuth client from private to public visibility. Only `public` is accepted; demotion to `private` is not supported. Promotion requires a non-empty client name, logo URI, verified client URI host, and at least one non-identity scope.

  - `"public"`

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

- `result: optional object { client_id, visibility, allowed_cors_origins, 16 more }`

  Fields shared by OAuth client responses and create/update requests.

  - `client_id: string`

    The unique identifier for an OAuth client.

  - `visibility: "public" or "private"`

    Visibility of the OAuth client.

    - `"public"`

    - `"private"`

  - `allowed_cors_origins: optional array of string`

    Array of allowed CORS origins.

  - `client_name: optional string`

    Human-readable name of the OAuth client.

  - `client_uri: optional string`

    URL of the home page of the client.

  - `client_uri_verification: optional object { status, text }`

    Client URI domain control verification state.

    - `status: optional "pending" or "in_progress" or "verified" or "failed"`

      Current verification status for the client URI host.

      - `"pending"`

      - `"in_progress"`

      - `"verified"`

      - `"failed"`

    - `text: optional string`

      Exact TXT record value that must be added to DNS to prove ownership of the client URI host.

  - `created_at: optional string`

    Timestamp when the OAuth client was created.

  - `grant_types: optional array of "authorization_code" or "refresh_token"`

    Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.

    - `"authorization_code"`

    - `"refresh_token"`

  - `has_rotated_secret: optional boolean`

    Indicates whether the client has a rotated secret that has not yet been deleted.

  - `logo_uri: optional string`

    URL of the client's logo.

  - `policy_uri: optional string`

    URL that points to a privacy policy document.

  - `post_logout_redirect_uris: optional array of string`

    Array of allowed post-logout redirect URIs.

  - `promoted_at: optional string`

    Timestamp when the OAuth client was promoted to public visibility.

  - `redirect_uris: optional array of string`

    Array of allowed redirect URIs for the client.

  - `response_types: optional array of "token" or "id_token" or "code"`

    Array of OAuth response types the client is allowed to use.

    - `"token"`

    - `"id_token"`

    - `"code"`

  - `scopes: optional array of string`

    Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes `offline_access` and `openid` are added or removed automatically based on `grant_types` and `response_types`.

  - `token_endpoint_auth_method: optional "none" or "client_secret_basic" or "client_secret_post"`

    The authentication method the client uses at the token endpoint.

    - `"none"`

    - `"client_secret_basic"`

    - `"client_secret_post"`

  - `tos_uri: optional string`

    URL that points to a terms of service document.

  - `updated_at: optional string`

    Timestamp when the OAuth client was last updated.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/oauth_clients/$OAUTH_CLIENT_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "allowed_cors_origins": [
            "https://example.com"
          ],
          "client_name": "My OAuth App",
          "client_uri": "https://example.com",
          "grant_types": [
            "authorization_code",
            "refresh_token"
          ],
          "logo_uri": "https://example.com/logo.png",
          "policy_uri": "https://example.com/privacy",
          "post_logout_redirect_uris": [
            "https://example.com/logout"
          ],
          "redirect_uris": [
            "https://example.com/callback"
          ],
          "response_types": [
            "code"
          ],
          "scopes": [
            "account.read"
          ],
          "token_endpoint_auth_method": "client_secret_post",
          "tos_uri": "https://example.com/tos",
          "visibility": "public"
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
    "client_id": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4",
    "visibility": "private",
    "allowed_cors_origins": [
      "https://example.com"
    ],
    "client_name": "My OAuth App",
    "client_uri": "https://example.com",
    "client_uri_verification": {
      "status": "in_progress",
      "text": "cloudflare_oauth_client_publisher=example"
    },
    "created_at": "2025-01-01T00:00:00Z",
    "grant_types": [
      "authorization_code",
      "refresh_token"
    ],
    "has_rotated_secret": false,
    "logo_uri": "https://example.com/logo.png",
    "policy_uri": "https://example.com/privacy",
    "post_logout_redirect_uris": [
      "https://example.com/logout"
    ],
    "promoted_at": "2026-05-13T12:00:00Z",
    "redirect_uris": [
      "https://example.com/callback"
    ],
    "response_types": [
      "code"
    ],
    "scopes": [
      "account.read"
    ],
    "token_endpoint_auth_method": "client_secret_post",
    "tos_uri": "https://example.com/tos",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

## Delete OAuth Client

**delete** `/accounts/{account_id}/oauth_clients/{oauth_client_id}`

Delete an OAuth client.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `oauth_client_id: string`

  The unique identifier for an OAuth client.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/oauth_clients/$OAUTH_CLIENT_ID \
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

## Rotate OAuth Client Secret

**post** `/accounts/{account_id}/oauth_clients/{oauth_client_id}/rotate_secret`

Creates a second client secret so you can update your client configuration before deleting the old one. The `has_rotated_secret` field on the client will be set to `true`.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `oauth_client_id: string`

  The unique identifier for an OAuth client.

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

- `result: optional object { client_secret }`

  - `client_secret: optional string`

    The new client secret.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/oauth_clients/$OAUTH_CLIENT_ID/rotate_secret \
    -X POST \
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
    "client_secret": "cf-oauth-secret-new-example"
  }
}
```

## Delete Rotated OAuth Client Secret

**delete** `/accounts/{account_id}/oauth_clients/{oauth_client_id}/rotate_secret`

Removes the old client secret after a rotation, keeping only the new one. Use this after you have updated your client configuration to use the new secret. The `has_rotated_secret` field on the client indicates whether there is an old secret to delete.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `oauth_client_id: string`

  The unique identifier for an OAuth client.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/oauth_clients/$OAUTH_CLIENT_ID/rotate_secret \
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

## Domain Types

### OAuth Client List Response

- `OAuthClientListResponse object { client_id, visibility, allowed_cors_origins, 16 more }`

  Fields shared by OAuth client responses and create/update requests.

  - `client_id: string`

    The unique identifier for an OAuth client.

  - `visibility: "public" or "private"`

    Visibility of the OAuth client.

    - `"public"`

    - `"private"`

  - `allowed_cors_origins: optional array of string`

    Array of allowed CORS origins.

  - `client_name: optional string`

    Human-readable name of the OAuth client.

  - `client_uri: optional string`

    URL of the home page of the client.

  - `client_uri_verification: optional object { status, text }`

    Client URI domain control verification state.

    - `status: optional "pending" or "in_progress" or "verified" or "failed"`

      Current verification status for the client URI host.

      - `"pending"`

      - `"in_progress"`

      - `"verified"`

      - `"failed"`

    - `text: optional string`

      Exact TXT record value that must be added to DNS to prove ownership of the client URI host.

  - `created_at: optional string`

    Timestamp when the OAuth client was created.

  - `grant_types: optional array of "authorization_code" or "refresh_token"`

    Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.

    - `"authorization_code"`

    - `"refresh_token"`

  - `has_rotated_secret: optional boolean`

    Indicates whether the client has a rotated secret that has not yet been deleted.

  - `logo_uri: optional string`

    URL of the client's logo.

  - `policy_uri: optional string`

    URL that points to a privacy policy document.

  - `post_logout_redirect_uris: optional array of string`

    Array of allowed post-logout redirect URIs.

  - `promoted_at: optional string`

    Timestamp when the OAuth client was promoted to public visibility.

  - `redirect_uris: optional array of string`

    Array of allowed redirect URIs for the client.

  - `response_types: optional array of "token" or "id_token" or "code"`

    Array of OAuth response types the client is allowed to use.

    - `"token"`

    - `"id_token"`

    - `"code"`

  - `scopes: optional array of string`

    Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes `offline_access` and `openid` are added or removed automatically based on `grant_types` and `response_types`.

  - `token_endpoint_auth_method: optional "none" or "client_secret_basic" or "client_secret_post"`

    The authentication method the client uses at the token endpoint.

    - `"none"`

    - `"client_secret_basic"`

    - `"client_secret_post"`

  - `tos_uri: optional string`

    URL that points to a terms of service document.

  - `updated_at: optional string`

    Timestamp when the OAuth client was last updated.

### OAuth Client Get Response

- `OAuthClientGetResponse object { client_id, visibility, allowed_cors_origins, 16 more }`

  Fields shared by OAuth client responses and create/update requests.

  - `client_id: string`

    The unique identifier for an OAuth client.

  - `visibility: "public" or "private"`

    Visibility of the OAuth client.

    - `"public"`

    - `"private"`

  - `allowed_cors_origins: optional array of string`

    Array of allowed CORS origins.

  - `client_name: optional string`

    Human-readable name of the OAuth client.

  - `client_uri: optional string`

    URL of the home page of the client.

  - `client_uri_verification: optional object { status, text }`

    Client URI domain control verification state.

    - `status: optional "pending" or "in_progress" or "verified" or "failed"`

      Current verification status for the client URI host.

      - `"pending"`

      - `"in_progress"`

      - `"verified"`

      - `"failed"`

    - `text: optional string`

      Exact TXT record value that must be added to DNS to prove ownership of the client URI host.

  - `created_at: optional string`

    Timestamp when the OAuth client was created.

  - `grant_types: optional array of "authorization_code" or "refresh_token"`

    Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.

    - `"authorization_code"`

    - `"refresh_token"`

  - `has_rotated_secret: optional boolean`

    Indicates whether the client has a rotated secret that has not yet been deleted.

  - `logo_uri: optional string`

    URL of the client's logo.

  - `policy_uri: optional string`

    URL that points to a privacy policy document.

  - `post_logout_redirect_uris: optional array of string`

    Array of allowed post-logout redirect URIs.

  - `promoted_at: optional string`

    Timestamp when the OAuth client was promoted to public visibility.

  - `redirect_uris: optional array of string`

    Array of allowed redirect URIs for the client.

  - `response_types: optional array of "token" or "id_token" or "code"`

    Array of OAuth response types the client is allowed to use.

    - `"token"`

    - `"id_token"`

    - `"code"`

  - `scopes: optional array of string`

    Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes `offline_access` and `openid` are added or removed automatically based on `grant_types` and `response_types`.

  - `token_endpoint_auth_method: optional "none" or "client_secret_basic" or "client_secret_post"`

    The authentication method the client uses at the token endpoint.

    - `"none"`

    - `"client_secret_basic"`

    - `"client_secret_post"`

  - `tos_uri: optional string`

    URL that points to a terms of service document.

  - `updated_at: optional string`

    Timestamp when the OAuth client was last updated.

### OAuth Client Create Response

- `OAuthClientCreateResponse object { client_id, visibility, allowed_cors_origins, 17 more }`

  Fields shared by OAuth client responses and create/update requests.

  - `client_id: string`

    The unique identifier for an OAuth client.

  - `visibility: "public" or "private"`

    Visibility of the OAuth client.

    - `"public"`

    - `"private"`

  - `allowed_cors_origins: optional array of string`

    Array of allowed CORS origins.

  - `client_name: optional string`

    Human-readable name of the OAuth client.

  - `client_secret: optional string`

    The client secret. This is the only time the secret is returned in a response.

  - `client_uri: optional string`

    URL of the home page of the client.

  - `client_uri_verification: optional object { status, text }`

    Client URI domain control verification state.

    - `status: optional "pending" or "in_progress" or "verified" or "failed"`

      Current verification status for the client URI host.

      - `"pending"`

      - `"in_progress"`

      - `"verified"`

      - `"failed"`

    - `text: optional string`

      Exact TXT record value that must be added to DNS to prove ownership of the client URI host.

  - `created_at: optional string`

    Timestamp when the OAuth client was created.

  - `grant_types: optional array of "authorization_code" or "refresh_token"`

    Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.

    - `"authorization_code"`

    - `"refresh_token"`

  - `has_rotated_secret: optional boolean`

    Indicates whether the client has a rotated secret that has not yet been deleted.

  - `logo_uri: optional string`

    URL of the client's logo.

  - `policy_uri: optional string`

    URL that points to a privacy policy document.

  - `post_logout_redirect_uris: optional array of string`

    Array of allowed post-logout redirect URIs.

  - `promoted_at: optional string`

    Timestamp when the OAuth client was promoted to public visibility.

  - `redirect_uris: optional array of string`

    Array of allowed redirect URIs for the client.

  - `response_types: optional array of "token" or "id_token" or "code"`

    Array of OAuth response types the client is allowed to use.

    - `"token"`

    - `"id_token"`

    - `"code"`

  - `scopes: optional array of string`

    Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes `offline_access` and `openid` are added or removed automatically based on `grant_types` and `response_types`.

  - `token_endpoint_auth_method: optional "none" or "client_secret_basic" or "client_secret_post"`

    The authentication method the client uses at the token endpoint.

    - `"none"`

    - `"client_secret_basic"`

    - `"client_secret_post"`

  - `tos_uri: optional string`

    URL that points to a terms of service document.

  - `updated_at: optional string`

    Timestamp when the OAuth client was last updated.

### OAuth Client Update Response

- `OAuthClientUpdateResponse object { client_id, visibility, allowed_cors_origins, 16 more }`

  Fields shared by OAuth client responses and create/update requests.

  - `client_id: string`

    The unique identifier for an OAuth client.

  - `visibility: "public" or "private"`

    Visibility of the OAuth client.

    - `"public"`

    - `"private"`

  - `allowed_cors_origins: optional array of string`

    Array of allowed CORS origins.

  - `client_name: optional string`

    Human-readable name of the OAuth client.

  - `client_uri: optional string`

    URL of the home page of the client.

  - `client_uri_verification: optional object { status, text }`

    Client URI domain control verification state.

    - `status: optional "pending" or "in_progress" or "verified" or "failed"`

      Current verification status for the client URI host.

      - `"pending"`

      - `"in_progress"`

      - `"verified"`

      - `"failed"`

    - `text: optional string`

      Exact TXT record value that must be added to DNS to prove ownership of the client URI host.

  - `created_at: optional string`

    Timestamp when the OAuth client was created.

  - `grant_types: optional array of "authorization_code" or "refresh_token"`

    Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.

    - `"authorization_code"`

    - `"refresh_token"`

  - `has_rotated_secret: optional boolean`

    Indicates whether the client has a rotated secret that has not yet been deleted.

  - `logo_uri: optional string`

    URL of the client's logo.

  - `policy_uri: optional string`

    URL that points to a privacy policy document.

  - `post_logout_redirect_uris: optional array of string`

    Array of allowed post-logout redirect URIs.

  - `promoted_at: optional string`

    Timestamp when the OAuth client was promoted to public visibility.

  - `redirect_uris: optional array of string`

    Array of allowed redirect URIs for the client.

  - `response_types: optional array of "token" or "id_token" or "code"`

    Array of OAuth response types the client is allowed to use.

    - `"token"`

    - `"id_token"`

    - `"code"`

  - `scopes: optional array of string`

    Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes `offline_access` and `openid` are added or removed automatically based on `grant_types` and `response_types`.

  - `token_endpoint_auth_method: optional "none" or "client_secret_basic" or "client_secret_post"`

    The authentication method the client uses at the token endpoint.

    - `"none"`

    - `"client_secret_basic"`

    - `"client_secret_post"`

  - `tos_uri: optional string`

    URL that points to a terms of service document.

  - `updated_at: optional string`

    Timestamp when the OAuth client was last updated.

### OAuth Client Delete Response

- `OAuthClientDeleteResponse object { id }`

  - `id: string`

    Identifier

### OAuth Client Rotate Secret Response

- `OAuthClientRotateSecretResponse object { client_secret }`

  - `client_secret: optional string`

    The new client secret.

### OAuth Client Delete Rotated Secret Response

- `OAuthClientDeleteRotatedSecretResponse object { id }`

  - `id: string`

    Identifier

# OAuth Scopes

## List OAuth Scopes

**get** `/oauth/scopes`

List all available OAuth scopes. This endpoint requires authentication but has no authorization role requirements.

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

- `result: optional array of object { id, name, category, scopes }`

  - `id: string`

    The scope label to use in the scopes array when creating or updating an OAuth client.

  - `name: string`

    Human-readable name of the OAuth scope.

  - `category: optional string`

    Category for grouping scopes in the UI.

  - `scopes: optional array of string`

    The underlying resource scopes (Bach scopes) that define which resources this OAuth scope can act upon.

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
curl https://api.cloudflare.com/client/v4/oauth/scopes \
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
      "id": "account.read",
      "name": "Account Read",
      "category": "account_and_billing",
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

### OAuth Scope List Response

- `OAuthScopeListResponse object { id, name, category, scopes }`

  An available OAuth scope that can be assigned to an OAuth client.

  - `id: string`

    The scope label to use in the scopes array when creating or updating an OAuth client.

  - `name: string`

    Human-readable name of the OAuth scope.

  - `category: optional string`

    Category for grouping scopes in the UI.

  - `scopes: optional array of string`

    The underlying resource scopes (Bach scopes) that define which resources this OAuth scope can act upon.
