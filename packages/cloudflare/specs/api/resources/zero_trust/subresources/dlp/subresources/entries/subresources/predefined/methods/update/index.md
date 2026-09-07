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
