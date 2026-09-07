# Predefined

## Create predefined entry

**post** `/accounts/{account_id}/dlp/entries/predefined`

Predefined entries can't be created, this will update an existing predefined entry.
This is needed for our generated terraform API.

### Path Parameters

- `account_id: string`

### Body Parameters

- `enabled: boolean`

- `entry_id: string`

- `profile_id: optional string`

  This field is not used as the owning profile.
  For predefined entries it is already set to a predefined profile.

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

- `result: optional object { id, confidence, enabled, 3 more }`

  - `id: string`

  - `confidence: object { ai_context_available, available }`

    - `ai_context_available: boolean`

      Indicates whether this entry has AI remote service validation.

    - `available: boolean`

      Indicates whether this entry has any form of validation that is not an AI remote service.

  - `enabled: boolean`

  - `name: string`

  - `profile_id: optional string`

  - `variant: optional object { topic_type, type, description }  or object { type, description }`

    A Predefined AI prompt classification topic entry.

    - `object { topic_type, type, description }`

      A Predefined AI prompt classification topic entry.

      - `topic_type: "Intent" or "Content"`

        - `"Intent"`

        - `"Content"`

      - `type: "PromptTopic"`

        - `"PromptTopic"`

      - `description: optional string`

        A customer-facing explanation of what this predefined AI prompt topic represents.

    - `object { type, description }`

      A general predefined entry.

      - `type: "General"`

        - `"General"`

      - `description: optional string`

        A customer-facing explanation of what this predefined entry represents.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/entries/predefined \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true,
          "entry_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
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
    "confidence": {
      "ai_context_available": true,
      "available": true
    },
    "enabled": true,
    "name": "name",
    "profile_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "variant": {
      "topic_type": "Intent",
      "type": "PromptTopic",
      "description": "description"
    }
  }
}
```

## Update predefined entry

**put** `/accounts/{account_id}/dlp/entries/predefined/{entry_id}`

Updates a DLP entry.

### Path Parameters

- `account_id: string`

- `entry_id: string`

### Body Parameters

- `enabled: boolean`

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

- `result: optional object { id, confidence, enabled, 3 more }`

  - `id: string`

  - `confidence: object { ai_context_available, available }`

    - `ai_context_available: boolean`

      Indicates whether this entry has AI remote service validation.

    - `available: boolean`

      Indicates whether this entry has any form of validation that is not an AI remote service.

  - `enabled: boolean`

  - `name: string`

  - `profile_id: optional string`

  - `variant: optional object { topic_type, type, description }  or object { type, description }`

    A Predefined AI prompt classification topic entry.

    - `object { topic_type, type, description }`

      A Predefined AI prompt classification topic entry.

      - `topic_type: "Intent" or "Content"`

        - `"Intent"`

        - `"Content"`

      - `type: "PromptTopic"`

        - `"PromptTopic"`

      - `description: optional string`

        A customer-facing explanation of what this predefined AI prompt topic represents.

    - `object { type, description }`

      A general predefined entry.

      - `type: "General"`

        - `"General"`

      - `description: optional string`

        A customer-facing explanation of what this predefined entry represents.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/entries/predefined/$ENTRY_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true
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
    "confidence": {
      "ai_context_available": true,
      "available": true
    },
    "enabled": true,
    "name": "name",
    "profile_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "variant": {
      "topic_type": "Intent",
      "type": "PromptTopic",
      "description": "description"
    }
  }
}
```

## Delete predefined entry

**delete** `/accounts/{account_id}/dlp/entries/predefined/{entry_id}`

This is a no-op as predefined entires can't be deleted but is needed for our generated terraform API.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/entries/predefined/$ENTRY_ID \
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

## Get DLP Entry

**get** `/accounts/{account_id}/dlp/entries/{entry_id}`

Fetches a DLP entry by ID.

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

- `result: optional object { id, created_at, enabled, 8 more }  or object { id, created_at, enabled, 6 more }  or object { id, confidence, enabled, 6 more }  or 4 more`

  - `object { id, created_at, enabled, 8 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `pattern: Pattern`

      - `regex: string`

      - `validation: optional "luhn"`

        - `"luhn"`

    - `type: "custom"`

      - `"custom"`

    - `updated_at: string`

    - `description: optional string`

    - `profile_id: optional string`

    - `profiles: optional array of object { id, name }`

      - `id: string`

      - `name: string`

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `object { id, created_at, enabled, 6 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `type: "custom_prompt_topic"`

      - `"custom_prompt_topic"`

    - `updated_at: string`

    - `description: optional string`

      The optional description of the custom prompt topic entry.

    - `profiles: optional array of object { id, name }`

      - `id: string`

      - `name: string`

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `object { id, confidence, enabled, 6 more }`

    - `id: string`

    - `confidence: object { ai_context_available, available }`

      - `ai_context_available: boolean`

        Indicates whether this entry has AI remote service validation.

      - `available: boolean`

        Indicates whether this entry has any form of validation that is not an AI remote service.

    - `enabled: boolean`

    - `name: string`

    - `type: "predefined"`

      - `"predefined"`

    - `profile_id: optional string`

    - `profiles: optional array of object { id, name }`

      - `id: string`

      - `name: string`

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

    - `variant: optional object { topic_type, type, description }  or object { type, description }`

      A Predefined AI prompt classification topic entry.

      - `object { topic_type, type, description }`

        A Predefined AI prompt classification topic entry.

        - `topic_type: "Intent" or "Content"`

          - `"Intent"`

          - `"Content"`

        - `type: "PromptTopic"`

          - `"PromptTopic"`

        - `description: optional string`

          A customer-facing explanation of what this predefined AI prompt topic represents.

      - `object { type, description }`

        A general predefined entry.

        - `type: "General"`

          - `"General"`

        - `description: optional string`

          A customer-facing explanation of what this predefined entry represents.

  - `object { id, created_at, enabled, 6 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `type: "integration"`

      - `"integration"`

    - `updated_at: string`

    - `profile_id: optional string`

    - `profiles: optional array of object { id, name }`

      - `id: string`

      - `name: string`

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `object { id, case_sensitive, created_at, 8 more }`

    - `id: string`

    - `case_sensitive: boolean`

      Only applies to custom word lists.
      Determines if the words should be matched in a case-sensitive manner
      Cannot be set to false if secret is true

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `secret: boolean`

    - `type: "exact_data"`

      - `"exact_data"`

    - `updated_at: string`

    - `description: optional string`

      The optional description of the exact data entry.

    - `profiles: optional array of object { id, name }`

      - `id: string`

      - `name: string`

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `object { id, created_at, enabled, 6 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `type: "document_fingerprint"`

      - `"document_fingerprint"`

    - `updated_at: string`

    - `description: optional string`

      The optional description of the document fingerprint entry.

    - `profiles: optional array of object { id, name }`

      - `id: string`

      - `name: string`

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `object { id, created_at, enabled, 7 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `type: "word_list"`

      - `"word_list"`

    - `updated_at: string`

    - `word_list: unknown`

    - `profile_id: optional string`

    - `profiles: optional array of object { id, name }`

      - `id: string`

      - `name: string`

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/entries/$ENTRY_ID \
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
    "pattern": {
      "regex": "regex",
      "validation": "luhn"
    },
    "type": "custom",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description",
    "profile_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "profiles": [
      {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "name": "name"
      }
    ],
    "upload_status": "empty"
  }
}
```

## List all entries

**get** `/accounts/{account_id}/dlp/entries`

Lists all DLP entries in an account.

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

- `result: optional array of object { id, created_at, enabled, 7 more }  or object { id, created_at, enabled, 5 more }  or object { id, confidence, enabled, 5 more }  or 4 more`

  - `object { id, created_at, enabled, 7 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `pattern: Pattern`

      - `regex: string`

      - `validation: optional "luhn"`

        - `"luhn"`

    - `type: "custom"`

      - `"custom"`

    - `updated_at: string`

    - `description: optional string`

    - `profile_id: optional string`

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `object { id, created_at, enabled, 5 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `type: "custom_prompt_topic"`

      - `"custom_prompt_topic"`

    - `updated_at: string`

    - `description: optional string`

      The optional description of the custom prompt topic entry.

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `object { id, confidence, enabled, 5 more }`

    - `id: string`

    - `confidence: object { ai_context_available, available }`

      - `ai_context_available: boolean`

        Indicates whether this entry has AI remote service validation.

      - `available: boolean`

        Indicates whether this entry has any form of validation that is not an AI remote service.

    - `enabled: boolean`

    - `name: string`

    - `type: "predefined"`

      - `"predefined"`

    - `profile_id: optional string`

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

    - `variant: optional object { topic_type, type, description }  or object { type, description }`

      A Predefined AI prompt classification topic entry.

      - `object { topic_type, type, description }`

        A Predefined AI prompt classification topic entry.

        - `topic_type: "Intent" or "Content"`

          - `"Intent"`

          - `"Content"`

        - `type: "PromptTopic"`

          - `"PromptTopic"`

        - `description: optional string`

          A customer-facing explanation of what this predefined AI prompt topic represents.

      - `object { type, description }`

        A general predefined entry.

        - `type: "General"`

          - `"General"`

        - `description: optional string`

          A customer-facing explanation of what this predefined entry represents.

  - `object { id, created_at, enabled, 5 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `type: "integration"`

      - `"integration"`

    - `updated_at: string`

    - `profile_id: optional string`

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `object { id, case_sensitive, created_at, 7 more }`

    - `id: string`

    - `case_sensitive: boolean`

      Only applies to custom word lists.
      Determines if the words should be matched in a case-sensitive manner
      Cannot be set to false if secret is true

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `secret: boolean`

    - `type: "exact_data"`

      - `"exact_data"`

    - `updated_at: string`

    - `description: optional string`

      The optional description of the exact data entry.

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `object { id, created_at, enabled, 5 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `type: "document_fingerprint"`

      - `"document_fingerprint"`

    - `updated_at: string`

    - `description: optional string`

      The optional description of the document fingerprint entry.

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `object { id, created_at, enabled, 6 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `type: "word_list"`

      - `"word_list"`

    - `updated_at: string`

    - `word_list: unknown`

    - `profile_id: optional string`

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/entries \
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
      "pattern": {
        "regex": "regex",
        "validation": "luhn"
      },
      "type": "custom",
      "updated_at": "2019-12-27T18:11:19.117Z",
      "description": "description",
      "profile_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "upload_status": "empty"
    }
  ]
}
```

## Domain Types

### Predefined Create Response

- `PredefinedCreateResponse object { id, confidence, enabled, 3 more }`

  - `id: string`

  - `confidence: object { ai_context_available, available }`

    - `ai_context_available: boolean`

      Indicates whether this entry has AI remote service validation.

    - `available: boolean`

      Indicates whether this entry has any form of validation that is not an AI remote service.

  - `enabled: boolean`

  - `name: string`

  - `profile_id: optional string`

  - `variant: optional object { topic_type, type, description }  or object { type, description }`

    A Predefined AI prompt classification topic entry.

    - `object { topic_type, type, description }`

      A Predefined AI prompt classification topic entry.

      - `topic_type: "Intent" or "Content"`

        - `"Intent"`

        - `"Content"`

      - `type: "PromptTopic"`

        - `"PromptTopic"`

      - `description: optional string`

        A customer-facing explanation of what this predefined AI prompt topic represents.

    - `object { type, description }`

      A general predefined entry.

      - `type: "General"`

        - `"General"`

      - `description: optional string`

        A customer-facing explanation of what this predefined entry represents.

### Predefined Update Response

- `PredefinedUpdateResponse object { id, confidence, enabled, 3 more }`

  - `id: string`

  - `confidence: object { ai_context_available, available }`

    - `ai_context_available: boolean`

      Indicates whether this entry has AI remote service validation.

    - `available: boolean`

      Indicates whether this entry has any form of validation that is not an AI remote service.

  - `enabled: boolean`

  - `name: string`

  - `profile_id: optional string`

  - `variant: optional object { topic_type, type, description }  or object { type, description }`

    A Predefined AI prompt classification topic entry.

    - `object { topic_type, type, description }`

      A Predefined AI prompt classification topic entry.

      - `topic_type: "Intent" or "Content"`

        - `"Intent"`

        - `"Content"`

      - `type: "PromptTopic"`

        - `"PromptTopic"`

      - `description: optional string`

        A customer-facing explanation of what this predefined AI prompt topic represents.

    - `object { type, description }`

      A general predefined entry.

      - `type: "General"`

        - `"General"`

      - `description: optional string`

        A customer-facing explanation of what this predefined entry represents.

### Predefined Delete Response

- `PredefinedDeleteResponse = unknown`

### Predefined Get Response

- `PredefinedGetResponse = object { id, created_at, enabled, 8 more }  or object { id, created_at, enabled, 6 more }  or object { id, confidence, enabled, 6 more }  or 4 more`

  - `object { id, created_at, enabled, 8 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `pattern: Pattern`

      - `regex: string`

      - `validation: optional "luhn"`

        - `"luhn"`

    - `type: "custom"`

      - `"custom"`

    - `updated_at: string`

    - `description: optional string`

    - `profile_id: optional string`

    - `profiles: optional array of object { id, name }`

      - `id: string`

      - `name: string`

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `object { id, created_at, enabled, 6 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `type: "custom_prompt_topic"`

      - `"custom_prompt_topic"`

    - `updated_at: string`

    - `description: optional string`

      The optional description of the custom prompt topic entry.

    - `profiles: optional array of object { id, name }`

      - `id: string`

      - `name: string`

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `object { id, confidence, enabled, 6 more }`

    - `id: string`

    - `confidence: object { ai_context_available, available }`

      - `ai_context_available: boolean`

        Indicates whether this entry has AI remote service validation.

      - `available: boolean`

        Indicates whether this entry has any form of validation that is not an AI remote service.

    - `enabled: boolean`

    - `name: string`

    - `type: "predefined"`

      - `"predefined"`

    - `profile_id: optional string`

    - `profiles: optional array of object { id, name }`

      - `id: string`

      - `name: string`

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

    - `variant: optional object { topic_type, type, description }  or object { type, description }`

      A Predefined AI prompt classification topic entry.

      - `object { topic_type, type, description }`

        A Predefined AI prompt classification topic entry.

        - `topic_type: "Intent" or "Content"`

          - `"Intent"`

          - `"Content"`

        - `type: "PromptTopic"`

          - `"PromptTopic"`

        - `description: optional string`

          A customer-facing explanation of what this predefined AI prompt topic represents.

      - `object { type, description }`

        A general predefined entry.

        - `type: "General"`

          - `"General"`

        - `description: optional string`

          A customer-facing explanation of what this predefined entry represents.

  - `object { id, created_at, enabled, 6 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `type: "integration"`

      - `"integration"`

    - `updated_at: string`

    - `profile_id: optional string`

    - `profiles: optional array of object { id, name }`

      - `id: string`

      - `name: string`

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `object { id, case_sensitive, created_at, 8 more }`

    - `id: string`

    - `case_sensitive: boolean`

      Only applies to custom word lists.
      Determines if the words should be matched in a case-sensitive manner
      Cannot be set to false if secret is true

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `secret: boolean`

    - `type: "exact_data"`

      - `"exact_data"`

    - `updated_at: string`

    - `description: optional string`

      The optional description of the exact data entry.

    - `profiles: optional array of object { id, name }`

      - `id: string`

      - `name: string`

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `object { id, created_at, enabled, 6 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `type: "document_fingerprint"`

      - `"document_fingerprint"`

    - `updated_at: string`

    - `description: optional string`

      The optional description of the document fingerprint entry.

    - `profiles: optional array of object { id, name }`

      - `id: string`

      - `name: string`

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `object { id, created_at, enabled, 7 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `type: "word_list"`

      - `"word_list"`

    - `updated_at: string`

    - `word_list: unknown`

    - `profile_id: optional string`

    - `profiles: optional array of object { id, name }`

      - `id: string`

      - `name: string`

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

### Predefined List Response

- `PredefinedListResponse = object { id, created_at, enabled, 7 more }  or object { id, created_at, enabled, 5 more }  or object { id, confidence, enabled, 5 more }  or 4 more`

  - `object { id, created_at, enabled, 7 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `pattern: Pattern`

      - `regex: string`

      - `validation: optional "luhn"`

        - `"luhn"`

    - `type: "custom"`

      - `"custom"`

    - `updated_at: string`

    - `description: optional string`

    - `profile_id: optional string`

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `object { id, created_at, enabled, 5 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `type: "custom_prompt_topic"`

      - `"custom_prompt_topic"`

    - `updated_at: string`

    - `description: optional string`

      The optional description of the custom prompt topic entry.

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `object { id, confidence, enabled, 5 more }`

    - `id: string`

    - `confidence: object { ai_context_available, available }`

      - `ai_context_available: boolean`

        Indicates whether this entry has AI remote service validation.

      - `available: boolean`

        Indicates whether this entry has any form of validation that is not an AI remote service.

    - `enabled: boolean`

    - `name: string`

    - `type: "predefined"`

      - `"predefined"`

    - `profile_id: optional string`

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

    - `variant: optional object { topic_type, type, description }  or object { type, description }`

      A Predefined AI prompt classification topic entry.

      - `object { topic_type, type, description }`

        A Predefined AI prompt classification topic entry.

        - `topic_type: "Intent" or "Content"`

          - `"Intent"`

          - `"Content"`

        - `type: "PromptTopic"`

          - `"PromptTopic"`

        - `description: optional string`

          A customer-facing explanation of what this predefined AI prompt topic represents.

      - `object { type, description }`

        A general predefined entry.

        - `type: "General"`

          - `"General"`

        - `description: optional string`

          A customer-facing explanation of what this predefined entry represents.

  - `object { id, created_at, enabled, 5 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `type: "integration"`

      - `"integration"`

    - `updated_at: string`

    - `profile_id: optional string`

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `object { id, case_sensitive, created_at, 7 more }`

    - `id: string`

    - `case_sensitive: boolean`

      Only applies to custom word lists.
      Determines if the words should be matched in a case-sensitive manner
      Cannot be set to false if secret is true

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `secret: boolean`

    - `type: "exact_data"`

      - `"exact_data"`

    - `updated_at: string`

    - `description: optional string`

      The optional description of the exact data entry.

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `object { id, created_at, enabled, 5 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `type: "document_fingerprint"`

      - `"document_fingerprint"`

    - `updated_at: string`

    - `description: optional string`

      The optional description of the document fingerprint entry.

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `object { id, created_at, enabled, 6 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `type: "word_list"`

      - `"word_list"`

    - `updated_at: string`

    - `word_list: unknown`

    - `profile_id: optional string`

    - `upload_status: optional "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`
