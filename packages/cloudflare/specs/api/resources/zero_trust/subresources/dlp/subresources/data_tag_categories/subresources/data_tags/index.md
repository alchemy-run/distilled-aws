# Data Tags

## Retrieve all data tags in a data tag category

**get** `/accounts/{account_id}/dlp/data_tag_categories/{category_id}/data_tags`

Retrieve all data tags in a data tag category

### Path Parameters

- `account_id: string`

- `category_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/data_tag_categories/$CATEGORY_ID/data_tags \
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

## Retrieve a specific data tag.

**get** `/accounts/{account_id}/dlp/data_tag_categories/{category_id}/data_tags/{tag_id}`

Retrieve a specific data tag.

### Path Parameters

- `account_id: string`

- `category_id: string`

- `tag_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/data_tag_categories/$CATEGORY_ID/data_tags/$TAG_ID \
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

## Creates a new data tag.

**post** `/accounts/{account_id}/dlp/data_tag_categories/{category_id}/data_tags`

Creates a new data tag.

### Path Parameters

- `account_id: string`

- `category_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/data_tag_categories/$CATEGORY_ID/data_tags \
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

## Update the attributes of a single data tag.

**put** `/accounts/{account_id}/dlp/data_tag_categories/{category_id}/data_tags/{tag_id}`

Update the attributes of a single data tag.

### Path Parameters

- `account_id: string`

- `category_id: string`

- `tag_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/data_tag_categories/$CATEGORY_ID/data_tags/$TAG_ID \
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

## Delete a single data tag.

**delete** `/accounts/{account_id}/dlp/data_tag_categories/{category_id}/data_tags/{tag_id}`

Delete a single data tag.

### Path Parameters

- `account_id: string`

- `category_id: string`

- `tag_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/data_tag_categories/$CATEGORY_ID/data_tags/$TAG_ID \
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

### Data Tag List Response

- `DataTagListResponse object { id, created_at, name, 2 more }`

  - `id: string`

  - `created_at: string`

  - `name: string`

  - `updated_at: string`

  - `description: optional string`

### Data Tag Get Response

- `DataTagGetResponse object { id, created_at, name, 2 more }`

  - `id: string`

  - `created_at: string`

  - `name: string`

  - `updated_at: string`

  - `description: optional string`

### Data Tag Create Response

- `DataTagCreateResponse object { id, created_at, name, 2 more }`

  - `id: string`

  - `created_at: string`

  - `name: string`

  - `updated_at: string`

  - `description: optional string`

### Data Tag Update Response

- `DataTagUpdateResponse object { id, created_at, name, 2 more }`

  - `id: string`

  - `created_at: string`

  - `name: string`

  - `updated_at: string`

  - `description: optional string`

### Data Tag Delete Response

- `DataTagDeleteResponse = unknown`
