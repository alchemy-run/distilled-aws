## Update predefined profile config

**put** `/accounts/{account_id}/dlp/profiles/predefined/{profile_id}/config`

This is similar to `update_predefined` but only returns entries that are enabled.
This is needed for our terraform API
Updates a DLP predefined profile. Only supports enabling/disabling entries.

### Path Parameters

- `account_id: string`

- `profile_id: string`

### Body Parameters

- `ai_context_enabled: optional boolean`

- `allowed_match_count: optional number`

- `confidence_threshold: optional string`

- `enabled_entries: optional array of string`

- `entries: optional array of object { id, enabled }`

  - `id: string`

  - `enabled: boolean`

- `ocr_enabled: optional boolean`

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

- `result: optional PredefinedProfile`

  - `id: string`

    The id of the predefined profile (uuid).

  - `allowed_match_count: number`

  - `confidence_threshold: string`

  - `enabled_entries: array of string`

    Entries to enable for this predefined profile. Any entries not provided will be disabled.

  - `entries: array of object { id, created_at, enabled, 6 more }  or object { id, created_at, enabled, 4 more }  or object { id, confidence, enabled, 4 more }  or 4 more`

    This field has been deprecated for `enabled_entries`.

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

  - `name: string`

    The name of the predefined profile.

  - `ai_context_enabled: optional boolean`

  - `ocr_enabled: optional boolean`

  - `open_access: optional boolean`

    Whether this profile can be accessed by anyone.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/profiles/predefined/$PROFILE_ID/config \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "allowed_match_count": 5
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
    "allowed_match_count": 0,
    "confidence_threshold": "confidence_threshold",
    "enabled_entries": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "entries": [
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
        "profile_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    ],
    "name": "name",
    "ai_context_enabled": true,
    "ocr_enabled": true,
    "open_access": true
  }
}
```
