## Update entry

**put** `/accounts/{account_id}/dlp/entries/{entry_id}`

Updates a DLP entry.

### Path Parameters

- `account_id: string`

- `entry_id: string`

### Body Parameters

- `body: object { name, pattern, type, 2 more }  or object { type, enabled }  or object { type, enabled }`

  - `Custom object { name, pattern, type, 2 more }`

    - `name: string`

    - `pattern: Pattern`

      - `regex: string`

      - `validation: optional "luhn"`

        - `"luhn"`

    - `type: "custom"`

      - `"custom"`

    - `description: optional string`

    - `enabled: optional boolean`

  - `Predefined object { type, enabled }`

    - `type: "predefined"`

      - `"predefined"`

    - `enabled: optional boolean`

  - `Integration object { type, enabled }`

    - `type: "integration"`

      - `"integration"`

    - `enabled: optional boolean`

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

- `result: optional object { id, created_at, enabled, 6 more }  or object { id, created_at, enabled, 4 more }  or object { id, confidence, enabled, 4 more }  or 4 more`

  - `CustomEntry object { id, created_at, enabled, 6 more }`

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

  - `CustomPromptTopicEntry object { id, created_at, enabled, 4 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `type: "custom_prompt_topic"`

      - `"custom_prompt_topic"`

    - `updated_at: string`

    - `description: optional string`

      The optional description of the custom prompt topic entry.

  - `PredefinedEntry object { id, confidence, enabled, 4 more }`

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

  - `IntegrationEntry object { id, created_at, enabled, 4 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `type: "integration"`

      - `"integration"`

    - `updated_at: string`

    - `profile_id: optional string`

  - `ExactDataEntry object { id, case_sensitive, created_at, 6 more }`

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

  - `DocumentFingerprintEntry object { id, created_at, enabled, 4 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `type: "document_fingerprint"`

      - `"document_fingerprint"`

    - `updated_at: string`

    - `description: optional string`

      The optional description of the document fingerprint entry.

  - `WordListEntry object { id, created_at, enabled, 5 more }`

    - `id: string`

    - `created_at: string`

    - `enabled: boolean`

    - `name: string`

    - `type: "word_list"`

      - `"word_list"`

    - `updated_at: string`

    - `word_list: unknown`

    - `profile_id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/entries/$ENTRY_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "name",
          "pattern": {
            "regex": "regex"
          },
          "type": "custom"
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
    "pattern": {
      "regex": "regex",
      "validation": "luhn"
    },
    "type": "custom",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description",
    "profile_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  }
}
```
