# Assets

## Get a Request Asset

**get** `/accounts/{account_id}/cloudforce-one/requests/{request_id}/asset/{asset_id}`

Retrieves an asset attached to a Cloudforce One intelligence request.

### Path Parameters

- `account_id: string`

  Identifier.

- `request_id: string`

  UUID.

- `asset_id: string`

  UUID.

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

- `result: optional array of object { id, name, created, 2 more }`

  - `id: number`

    Asset ID.

  - `name: string`

    Asset name.

  - `created: optional string`

    Defines the asset creation time.

  - `description: optional string`

    Asset description.

  - `file_type: optional string`

    Asset file type.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/$REQUEST_ID/asset/$ASSET_ID \
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
      "id": 0,
      "name": "example.docx",
      "created": "2022-01-01T00:00:00Z",
      "description": "example description",
      "file_type": "docx"
    }
  ]
}
```

## List Request Assets

**post** `/accounts/{account_id}/cloudforce-one/requests/{request_id}/asset`

Lists assets attached to a Cloudforce One intelligence request.

### Path Parameters

- `account_id: string`

  Identifier.

- `request_id: string`

  UUID.

### Body Parameters

- `page: number`

  Page number of results.

- `per_page: number`

  Number of results per page.

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

- `result: optional array of object { id, name, created, 2 more }`

  - `id: number`

    Asset ID.

  - `name: string`

    Asset name.

  - `created: optional string`

    Defines the asset creation time.

  - `description: optional string`

    Asset description.

  - `file_type: optional string`

    Asset file type.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/$REQUEST_ID/asset \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "page": 0,
          "per_page": 10
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
  "result": [
    {
      "id": 0,
      "name": "example.docx",
      "created": "2022-01-01T00:00:00Z",
      "description": "example description",
      "file_type": "docx"
    }
  ]
}
```

## Update a Request Asset

**put** `/accounts/{account_id}/cloudforce-one/requests/{request_id}/asset/{asset_id}`

Updates an asset in a Cloudforce One intelligence request.

### Path Parameters

- `account_id: string`

  Identifier.

- `request_id: string`

  UUID.

- `asset_id: string`

  UUID.

### Body Parameters

- `source: optional string`

  Asset file to upload.

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

- `result: optional object { id, name, created, 2 more }`

  - `id: number`

    Asset ID.

  - `name: string`

    Asset name.

  - `created: optional string`

    Defines the asset creation time.

  - `description: optional string`

    Asset description.

  - `file_type: optional string`

    Asset file type.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/$REQUEST_ID/asset/$ASSET_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "source": "@/Users/me/example.docx"
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
    "id": 0,
    "name": "example.docx",
    "created": "2022-01-01T00:00:00Z",
    "description": "example description",
    "file_type": "docx"
  }
}
```

## Delete a Request Asset

**delete** `/accounts/{account_id}/cloudforce-one/requests/{request_id}/asset/{asset_id}`

Removes an asset from a Cloudforce One intelligence request.

### Path Parameters

- `account_id: string`

  Identifier.

- `request_id: string`

  UUID.

- `asset_id: string`

  UUID.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/$REQUEST_ID/asset/$ASSET_ID \
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
  "success": true
}
```

## Domain Types

### Asset Get Response

- `AssetGetResponse object { id, name, created, 2 more }`

  - `id: number`

    Asset ID.

  - `name: string`

    Asset name.

  - `created: optional string`

    Defines the asset creation time.

  - `description: optional string`

    Asset description.

  - `file_type: optional string`

    Asset file type.

### Asset Create Response

- `AssetCreateResponse object { id, name, created, 2 more }`

  - `id: number`

    Asset ID.

  - `name: string`

    Asset name.

  - `created: optional string`

    Defines the asset creation time.

  - `description: optional string`

    Asset description.

  - `file_type: optional string`

    Asset file type.

### Asset Update Response

- `AssetUpdateResponse object { id, name, created, 2 more }`

  - `id: number`

    Asset ID.

  - `name: string`

    Asset name.

  - `created: optional string`

    Defines the asset creation time.

  - `description: optional string`

    Asset description.

  - `file_type: optional string`

    Asset file type.

### Asset Delete Response

- `AssetDeleteResponse object { errors, messages, success }`

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
