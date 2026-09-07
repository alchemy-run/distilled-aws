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
