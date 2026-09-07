# Custom Prompt Topics

## List custom prompt topics

**get** `/accounts/{account_id}/dlp/custom_prompt_topics`

Lists all DLP custom prompt topic entries in an account.

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

- `result: optional array of CustomPromptTopic`

  - `id: string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `topic: string`

  - `updated_at: string`

  - `description: optional string`

  - `profile_id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/custom_prompt_topics \
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
      "enabled": true,
      "name": "name",
      "topic": "topic",
      "updated_at": "2019-12-27T18:11:19.117Z",
      "description": "description",
      "profile_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    }
  ]
}
```

## Get custom prompt topic

**get** `/accounts/{account_id}/dlp/custom_prompt_topics/{entry_id}`

Fetches a DLP custom prompt topic entry by ID.

### Path Parameters

- `account_id: string`

- `entry_id: string`

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

- `result: optional CustomPromptTopic`

  - `id: string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `topic: string`

  - `updated_at: string`

  - `description: optional string`

  - `profile_id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/custom_prompt_topics/$ENTRY_ID \
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
    "enabled": true,
    "name": "name",
    "topic": "topic",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description",
    "profile_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  }
}
```

## Create custom prompt topic

**post** `/accounts/{account_id}/dlp/custom_prompt_topics`

Creates a DLP custom prompt topic entry.

### Path Parameters

- `account_id: string`

### Body Parameters

- `enabled: boolean`

- `name: string`

- `topic: string`

- `description: optional string`

- `profile_id: optional string`

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

- `result: optional CustomPromptTopic`

  - `id: string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `topic: string`

  - `updated_at: string`

  - `description: optional string`

  - `profile_id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/custom_prompt_topics \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true,
          "name": "name",
          "topic": "topic"
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
    "enabled": true,
    "name": "name",
    "topic": "topic",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description",
    "profile_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  }
}
```

## Update custom prompt topic

**put** `/accounts/{account_id}/dlp/custom_prompt_topics/{entry_id}`

Updates a DLP custom prompt topic entry.

### Path Parameters

- `account_id: string`

- `entry_id: string`

### Body Parameters

- `enabled: boolean`

- `name: string`

- `topic: string`

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

- `result: optional CustomPromptTopic`

  - `id: string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `topic: string`

  - `updated_at: string`

  - `description: optional string`

  - `profile_id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/custom_prompt_topics/$ENTRY_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true,
          "name": "name",
          "topic": "topic"
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
    "enabled": true,
    "name": "name",
    "topic": "topic",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description",
    "profile_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  }
}
```

## Delete custom prompt topic

**delete** `/accounts/{account_id}/dlp/custom_prompt_topics/{entry_id}`

Deletes a DLP custom prompt topic entry.

### Path Parameters

- `account_id: string`

- `entry_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/custom_prompt_topics/$ENTRY_ID \
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

### Custom Prompt Topic

- `CustomPromptTopic object { id, created_at, enabled, 5 more }`

  - `id: string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `topic: string`

  - `updated_at: string`

  - `description: optional string`

  - `profile_id: optional string`

### Custom Prompt Topic Delete Response

- `CustomPromptTopicDeleteResponse = unknown`
