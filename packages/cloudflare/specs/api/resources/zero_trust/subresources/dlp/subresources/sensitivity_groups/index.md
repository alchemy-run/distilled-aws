# Sensitivity Groups

## Retrieve all sensitivity groups in an account

**get** `/accounts/{account_id}/dlp/sensitivity_groups`

Retrieve all sensitivity groups in an account

### Path Parameters

- `account_id: string`

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

- `result: optional array of object { id, created_at, levels, 4 more }`

  - `id: string`

  - `created_at: string`

  - `levels: array of object { id, created_at, name, 2 more }`

    - `id: string`

    - `created_at: string`

    - `name: string`

    - `updated_at: string`

    - `description: optional string`

  - `name: string`

  - `updated_at: string`

  - `description: optional string`

  - `template_id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/sensitivity_groups \
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
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "created_at": "2019-12-27T18:11:19.117Z",
      "levels": [
        {
          "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "created_at": "2019-12-27T18:11:19.117Z",
          "name": "name",
          "updated_at": "2019-12-27T18:11:19.117Z",
          "description": "description"
        }
      ],
      "name": "name",
      "updated_at": "2019-12-27T18:11:19.117Z",
      "description": "description",
      "template_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    }
  ]
}
```

## Retrieve a specific sensitivity group.

**get** `/accounts/{account_id}/dlp/sensitivity_groups/{sensitivity_group_id}`

Retrieve a specific sensitivity group.

### Path Parameters

- `account_id: string`

- `sensitivity_group_id: string`

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

- `result: optional object { id, created_at, levels, 4 more }`

  - `id: string`

  - `created_at: string`

  - `levels: array of object { id, created_at, name, 2 more }`

    - `id: string`

    - `created_at: string`

    - `name: string`

    - `updated_at: string`

    - `description: optional string`

  - `name: string`

  - `updated_at: string`

  - `description: optional string`

  - `template_id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/sensitivity_groups/$SENSITIVITY_GROUP_ID \
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "levels": [
      {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_at": "2019-12-27T18:11:19.117Z",
        "name": "name",
        "updated_at": "2019-12-27T18:11:19.117Z",
        "description": "description"
      }
    ],
    "name": "name",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description",
    "template_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  }
}
```

## Creates a new sensitivity group.

**post** `/accounts/{account_id}/dlp/sensitivity_groups`

Creates a new sensitivity group.

### Path Parameters

- `account_id: string`

### Body Parameters

- `name: string`

- `description: optional string`

- `levels: optional array of object { name, description }`

  Levels to create with the group. Mutually exclusive with `template_id`.

  - `name: string`

  - `description: optional string`

- `template_id: optional string`

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

- `result: optional object { id, created_at, levels, 4 more }`

  - `id: string`

  - `created_at: string`

  - `levels: array of object { id, created_at, name, 2 more }`

    - `id: string`

    - `created_at: string`

    - `name: string`

    - `updated_at: string`

    - `description: optional string`

  - `name: string`

  - `updated_at: string`

  - `description: optional string`

  - `template_id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/sensitivity_groups \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "levels": [
      {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_at": "2019-12-27T18:11:19.117Z",
        "name": "name",
        "updated_at": "2019-12-27T18:11:19.117Z",
        "description": "description"
      }
    ],
    "name": "name",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description",
    "template_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  }
}
```

## Update the attributes of a single sensitivity group.

**put** `/accounts/{account_id}/dlp/sensitivity_groups/{sensitivity_group_id}`

Update the attributes of a single sensitivity group.

### Path Parameters

- `account_id: string`

- `sensitivity_group_id: string`

### Body Parameters

- `description: optional string`

- `levels: optional array of object { id, description, name }`

  The desired final state of levels.

  - `None` (omitted): no level changes.
  - `Some([])`: delete all levels.
  - `Some([...])`: desired final set + order.

  - `id: optional string`

    If `None` (omitted), a new level will be created. Otherwise, an existing level will
    be updated.

  - `description: optional string`

  - `name: optional string`

- `name: optional string`

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

- `result: optional object { id, created_at, levels, 4 more }`

  - `id: string`

  - `created_at: string`

  - `levels: array of object { id, created_at, name, 2 more }`

    - `id: string`

    - `created_at: string`

    - `name: string`

    - `updated_at: string`

    - `description: optional string`

  - `name: string`

  - `updated_at: string`

  - `description: optional string`

  - `template_id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/sensitivity_groups/$SENSITIVITY_GROUP_ID \
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
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "levels": [
      {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_at": "2019-12-27T18:11:19.117Z",
        "name": "name",
        "updated_at": "2019-12-27T18:11:19.117Z",
        "description": "description"
      }
    ],
    "name": "name",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description",
    "template_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  }
}
```

## Delete a single sensitivity group.

**delete** `/accounts/{account_id}/dlp/sensitivity_groups/{sensitivity_group_id}`

Delete a single sensitivity group.

### Path Parameters

- `account_id: string`

- `sensitivity_group_id: string`

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

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/sensitivity_groups/$SENSITIVITY_GROUP_ID \
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
  "result": {}
}
```

## Domain Types

### Sensitivity Group List Response

- `SensitivityGroupListResponse object { id, created_at, levels, 4 more }`

  - `id: string`

  - `created_at: string`

  - `levels: array of object { id, created_at, name, 2 more }`

    - `id: string`

    - `created_at: string`

    - `name: string`

    - `updated_at: string`

    - `description: optional string`

  - `name: string`

  - `updated_at: string`

  - `description: optional string`

  - `template_id: optional string`

### Sensitivity Group Get Response

- `SensitivityGroupGetResponse object { id, created_at, levels, 4 more }`

  - `id: string`

  - `created_at: string`

  - `levels: array of object { id, created_at, name, 2 more }`

    - `id: string`

    - `created_at: string`

    - `name: string`

    - `updated_at: string`

    - `description: optional string`

  - `name: string`

  - `updated_at: string`

  - `description: optional string`

  - `template_id: optional string`

### Sensitivity Group Create Response

- `SensitivityGroupCreateResponse object { id, created_at, levels, 4 more }`

  - `id: string`

  - `created_at: string`

  - `levels: array of object { id, created_at, name, 2 more }`

    - `id: string`

    - `created_at: string`

    - `name: string`

    - `updated_at: string`

    - `description: optional string`

  - `name: string`

  - `updated_at: string`

  - `description: optional string`

  - `template_id: optional string`

### Sensitivity Group Update Response

- `SensitivityGroupUpdateResponse object { id, created_at, levels, 4 more }`

  - `id: string`

  - `created_at: string`

  - `levels: array of object { id, created_at, name, 2 more }`

    - `id: string`

    - `created_at: string`

    - `name: string`

    - `updated_at: string`

    - `description: optional string`

  - `name: string`

  - `updated_at: string`

  - `description: optional string`

  - `template_id: optional string`

### Sensitivity Group Delete Response

- `SensitivityGroupDeleteResponse = unknown`

# Levels

## Retrieve all sensitivity levels in a sensitivity group

**get** `/accounts/{account_id}/dlp/sensitivity_groups/{sensitivity_group_id}/levels`

Retrieve all sensitivity levels in a sensitivity group

### Path Parameters

- `account_id: string`

- `sensitivity_group_id: string`

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

- `result: optional array of object { id, created_at, name, 2 more }`

  - `id: string`

  - `created_at: string`

  - `name: string`

  - `updated_at: string`

  - `description: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/sensitivity_groups/$SENSITIVITY_GROUP_ID/levels \
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
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "created_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "updated_at": "2019-12-27T18:11:19.117Z",
      "description": "description"
    }
  ]
}
```

## Retrieve a specific sensitivity level.

**get** `/accounts/{account_id}/dlp/sensitivity_groups/{sensitivity_group_id}/levels/{sensitivity_level_id}`

Retrieve a specific sensitivity level.

### Path Parameters

- `account_id: string`

- `sensitivity_group_id: string`

- `sensitivity_level_id: string`

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

- `result: optional object { id, created_at, name, 2 more }`

  - `id: string`

  - `created_at: string`

  - `name: string`

  - `updated_at: string`

  - `description: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/sensitivity_groups/$SENSITIVITY_GROUP_ID/levels/$SENSITIVITY_LEVEL_ID \
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description"
  }
}
```

## Creates a new sensitivity level.

**post** `/accounts/{account_id}/dlp/sensitivity_groups/{sensitivity_group_id}/levels`

Creates a new sensitivity level.

### Path Parameters

- `account_id: string`

- `sensitivity_group_id: string`

### Body Parameters

- `name: string`

- `description: optional string`

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

- `result: optional object { id, created_at, name, 2 more }`

  - `id: string`

  - `created_at: string`

  - `name: string`

  - `updated_at: string`

  - `description: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/sensitivity_groups/$SENSITIVITY_GROUP_ID/levels \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description"
  }
}
```

## Update the attributes of a single sensitivity level.

**put** `/accounts/{account_id}/dlp/sensitivity_groups/{sensitivity_group_id}/levels/{sensitivity_level_id}`

Update the attributes of a single sensitivity level.

### Path Parameters

- `account_id: string`

- `sensitivity_group_id: string`

- `sensitivity_level_id: string`

### Body Parameters

- `description: optional string`

- `name: optional string`

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

- `result: optional object { id, created_at, name, 2 more }`

  - `id: string`

  - `created_at: string`

  - `name: string`

  - `updated_at: string`

  - `description: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/sensitivity_groups/$SENSITIVITY_GROUP_ID/levels/$SENSITIVITY_LEVEL_ID \
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
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description"
  }
}
```

## Delete a single sensitivity level.

**delete** `/accounts/{account_id}/dlp/sensitivity_groups/{sensitivity_group_id}/levels/{sensitivity_level_id}`

Delete a single sensitivity level.

### Path Parameters

- `account_id: string`

- `sensitivity_group_id: string`

- `sensitivity_level_id: string`

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

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/sensitivity_groups/$SENSITIVITY_GROUP_ID/levels/$SENSITIVITY_LEVEL_ID \
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
  "result": {}
}
```

## Domain Types

### Level List Response

- `LevelListResponse object { id, created_at, name, 2 more }`

  - `id: string`

  - `created_at: string`

  - `name: string`

  - `updated_at: string`

  - `description: optional string`

### Level Get Response

- `LevelGetResponse object { id, created_at, name, 2 more }`

  - `id: string`

  - `created_at: string`

  - `name: string`

  - `updated_at: string`

  - `description: optional string`

### Level Create Response

- `LevelCreateResponse object { id, created_at, name, 2 more }`

  - `id: string`

  - `created_at: string`

  - `name: string`

  - `updated_at: string`

  - `description: optional string`

### Level Update Response

- `LevelUpdateResponse object { id, created_at, name, 2 more }`

  - `id: string`

  - `created_at: string`

  - `name: string`

  - `updated_at: string`

  - `description: optional string`

### Level Delete Response

- `LevelDeleteResponse = unknown`

# Order

## Retrieve the ordered list of level IDs for a sensitivity group.

**get** `/accounts/{account_id}/dlp/sensitivity_groups/{sensitivity_group_id}/level_order`

Retrieve the ordered list of level IDs for a sensitivity group.

### Path Parameters

- `account_id: string`

- `sensitivity_group_id: string`

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

- `result: optional object { level_ids }`

  The ordered list of level IDs for a sensitivity group.
  Used to get and set the ordering of levels independently of level attributes.

  - `level_ids: array of string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/sensitivity_groups/$SENSITIVITY_GROUP_ID/level_order \
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
    "level_ids": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ]
  }
}
```

## Set the ordering of levels within a sensitivity group.

**put** `/accounts/{account_id}/dlp/sensitivity_groups/{sensitivity_group_id}/level_order`

Set the ordering of levels within a sensitivity group.

### Path Parameters

- `account_id: string`

- `sensitivity_group_id: string`

### Body Parameters

- `level_ids: array of string`

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

- `result: optional object { level_ids }`

  The ordered list of level IDs for a sensitivity group.
  Used to get and set the ordering of levels independently of level attributes.

  - `level_ids: array of string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/sensitivity_groups/$SENSITIVITY_GROUP_ID/level_order \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "level_ids": [
            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
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
    "level_ids": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ]
  }
}
```

## Domain Types

### Order Get Response

- `OrderGetResponse object { level_ids }`

  The ordered list of level IDs for a sensitivity group.
  Used to get and set the ordering of levels independently of level attributes.

  - `level_ids: array of string`

### Order Update Response

- `OrderUpdateResponse object { level_ids }`

  The ordered list of level IDs for a sensitivity group.
  Used to get and set the ordering of levels independently of level attributes.

  - `level_ids: array of string`
