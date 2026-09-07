# Custom

## Get custom profile

**get** `/accounts/{account_id}/dlp/profiles/custom/{profile_id}`

Fetches a custom DLP profile by id.

### Path Parameters

- `account_id: string`

- `profile_id: string`

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

- `result: optional Profile`

  - `CustomProfile object { id, allowed_match_count, created_at, 13 more }`

    - `id: string`

      The id of the profile (uuid).

    - `allowed_match_count: number`

      Related DLP policies will trigger when the match count exceeds the number set.

    - `created_at: string`

      When the profile was created.

    - `name: string`

      The name of the profile.

    - `ocr_enabled: boolean`

    - `type: "custom"`

      - `"custom"`

    - `updated_at: string`

      When the profile was lasted updated.

    - `ai_context_enabled: optional boolean`

    - `confidence_threshold: optional "low" or "medium" or "high" or "very_high"`

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"very_high"`

    - `context_awareness: optional ContextAwareness`

      Scan the context of predefined entries to only return matches surrounded by keywords.

      - `enabled: boolean`

        If true, scan the context of predefined entries to only return matches surrounded by keywords.

      - `skip: SkipConfiguration`

        Content types to exclude from context analysis and return all matches.

        - `files: boolean`

          If the content type is a file, skip context analysis and return all matches.

    - `data_classes: optional array of string`

      Data classes associated with this profile.

    - `data_tags: optional array of string`

      Data tags associated with this profile.

    - `description: optional string`

      The description of the profile.

    - `entries: optional array of object { id, created_at, enabled, 6 more }  or object { id, created_at, enabled, 4 more }  or object { id, confidence, enabled, 4 more }  or 4 more`

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

    - `sensitivity_levels: optional array of object { group_id, level_id }`

      Sensitivity levels associated with this profile.

      - `group_id: string`

      - `level_id: string`

    - `shared_entries: optional array of object { id, created_at, enabled, 6 more }  or object { id, created_at, enabled, 4 more }  or object { id, confidence, enabled, 4 more }  or 4 more`

      - `CustomEntry object { id, created_at, enabled, 6 more }`

        - `id: string`

        - `created_at: string`

        - `enabled: boolean`

        - `name: string`

        - `pattern: Pattern`

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

  - `PredefinedProfile object { id, allowed_match_count, entries, 7 more }`

    - `id: string`

      The id of the predefined profile (uuid).

    - `allowed_match_count: number`

    - `entries: array of object { id, created_at, enabled, 6 more }  or object { id, created_at, enabled, 4 more }  or object { id, confidence, enabled, 4 more }  or 4 more`

      - `CustomEntry object { id, created_at, enabled, 6 more }`

        - `id: string`

        - `created_at: string`

        - `enabled: boolean`

        - `name: string`

        - `pattern: Pattern`

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

    - `type: "predefined"`

      - `"predefined"`

    - `ai_context_enabled: optional boolean`

    - `confidence_threshold: optional "low" or "medium" or "high" or "very_high"`

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"very_high"`

    - `context_awareness: optional ContextAwareness`

      Scan the context of predefined entries to only return matches surrounded by keywords.

    - `ocr_enabled: optional boolean`

    - `open_access: optional boolean`

      Whether this profile can be accessed by anyone.

  - `IntegrationProfile object { id, created_at, entries, 5 more }`

    - `id: string`

    - `created_at: string`

    - `entries: array of object { id, created_at, enabled, 6 more }  or object { id, created_at, enabled, 4 more }  or object { id, confidence, enabled, 4 more }  or 4 more`

      - `CustomEntry object { id, created_at, enabled, 6 more }`

        - `id: string`

        - `created_at: string`

        - `enabled: boolean`

        - `name: string`

        - `pattern: Pattern`

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

    - `shared_entries: array of object { id, created_at, enabled, 6 more }  or object { id, created_at, enabled, 4 more }  or object { id, confidence, enabled, 4 more }  or 4 more`

      - `CustomEntry object { id, created_at, enabled, 6 more }`

        - `id: string`

        - `created_at: string`

        - `enabled: boolean`

        - `name: string`

        - `pattern: Pattern`

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

    - `type: "integration"`

      - `"integration"`

    - `updated_at: string`

    - `description: optional string`

      The description of the profile.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/profiles/custom/$PROFILE_ID \
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
    "allowed_match_count": 5,
    "created_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "ocr_enabled": true,
    "type": "custom",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "ai_context_enabled": true,
    "confidence_threshold": "low",
    "context_awareness": {
      "enabled": true,
      "skip": {
        "files": true
      }
    },
    "data_classes": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "data_tags": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "description": "description",
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
    "sensitivity_levels": [
      {
        "group_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "level_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    ],
    "shared_entries": [
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
    ]
  }
}
```

## Create custom profile

**post** `/accounts/{account_id}/dlp/profiles/custom`

Creates a DLP custom profile.

### Path Parameters

- `account_id: string`

### Body Parameters

- `name: string`

- `ai_context_enabled: optional boolean`

- `allowed_match_count: optional number`

  Related DLP policies will trigger when the match count exceeds the number set.

- `confidence_threshold: optional string`

- `context_awareness: optional ContextAwareness`

  Scan the context of predefined entries to only return matches surrounded by keywords.

  - `enabled: boolean`

    If true, scan the context of predefined entries to only return matches surrounded by keywords.

  - `skip: SkipConfiguration`

    Content types to exclude from context analysis and return all matches.

    - `files: boolean`

      If the content type is a file, skip context analysis and return all matches.

- `data_classes: optional array of string`

  Data class IDs to associate with the profile.

- `data_tags: optional array of string`

  Data tag IDs to associate with the profile.

- `description: optional string`

  The description of the profile.

- `entries: optional array of object { enabled, name, pattern, description }  or object { enabled, name, words }`

  - `DLPNewCustomEntry object { enabled, name, pattern, description }`

    - `enabled: boolean`

    - `name: string`

    - `pattern: Pattern`

      - `regex: string`

      - `validation: optional "luhn"`

        - `"luhn"`

    - `description: optional string`

  - `DLPNewWordListEntry object { enabled, name, words }`

    - `enabled: boolean`

    - `name: string`

    - `words: array of string`

- `ocr_enabled: optional boolean`

- `sensitivity_levels: optional array of object { group_id, level_id }`

  Sensitivity levels to associate with the profile.

  - `group_id: string`

  - `level_id: string`

- `shared_entries: optional array of object { enabled, entry_id }`

  Entries from other profiles (e.g. pre-defined Cloudflare profiles, or your Microsoft Information Protection profiles).

  - `enabled: boolean`

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

- `result: optional Profile`

  - `CustomProfile object { id, allowed_match_count, created_at, 13 more }`

    - `id: string`

      The id of the profile (uuid).

    - `allowed_match_count: number`

      Related DLP policies will trigger when the match count exceeds the number set.

    - `created_at: string`

      When the profile was created.

    - `name: string`

      The name of the profile.

    - `ocr_enabled: boolean`

    - `type: "custom"`

      - `"custom"`

    - `updated_at: string`

      When the profile was lasted updated.

    - `ai_context_enabled: optional boolean`

    - `confidence_threshold: optional "low" or "medium" or "high" or "very_high"`

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"very_high"`

    - `context_awareness: optional ContextAwareness`

      Scan the context of predefined entries to only return matches surrounded by keywords.

      - `enabled: boolean`

        If true, scan the context of predefined entries to only return matches surrounded by keywords.

      - `skip: SkipConfiguration`

        Content types to exclude from context analysis and return all matches.

        - `files: boolean`

          If the content type is a file, skip context analysis and return all matches.

    - `data_classes: optional array of string`

      Data classes associated with this profile.

    - `data_tags: optional array of string`

      Data tags associated with this profile.

    - `description: optional string`

      The description of the profile.

    - `entries: optional array of object { id, created_at, enabled, 6 more }  or object { id, created_at, enabled, 4 more }  or object { id, confidence, enabled, 4 more }  or 4 more`

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

    - `sensitivity_levels: optional array of object { group_id, level_id }`

      Sensitivity levels associated with this profile.

      - `group_id: string`

      - `level_id: string`

    - `shared_entries: optional array of object { id, created_at, enabled, 6 more }  or object { id, created_at, enabled, 4 more }  or object { id, confidence, enabled, 4 more }  or 4 more`

      - `CustomEntry object { id, created_at, enabled, 6 more }`

        - `id: string`

        - `created_at: string`

        - `enabled: boolean`

        - `name: string`

        - `pattern: Pattern`

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

  - `PredefinedProfile object { id, allowed_match_count, entries, 7 more }`

    - `id: string`

      The id of the predefined profile (uuid).

    - `allowed_match_count: number`

    - `entries: array of object { id, created_at, enabled, 6 more }  or object { id, created_at, enabled, 4 more }  or object { id, confidence, enabled, 4 more }  or 4 more`

      - `CustomEntry object { id, created_at, enabled, 6 more }`

        - `id: string`

        - `created_at: string`

        - `enabled: boolean`

        - `name: string`

        - `pattern: Pattern`

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

    - `type: "predefined"`

      - `"predefined"`

    - `ai_context_enabled: optional boolean`

    - `confidence_threshold: optional "low" or "medium" or "high" or "very_high"`

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"very_high"`

    - `context_awareness: optional ContextAwareness`

      Scan the context of predefined entries to only return matches surrounded by keywords.

    - `ocr_enabled: optional boolean`

    - `open_access: optional boolean`

      Whether this profile can be accessed by anyone.

  - `IntegrationProfile object { id, created_at, entries, 5 more }`

    - `id: string`

    - `created_at: string`

    - `entries: array of object { id, created_at, enabled, 6 more }  or object { id, created_at, enabled, 4 more }  or object { id, confidence, enabled, 4 more }  or 4 more`

      - `CustomEntry object { id, created_at, enabled, 6 more }`

        - `id: string`

        - `created_at: string`

        - `enabled: boolean`

        - `name: string`

        - `pattern: Pattern`

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

    - `shared_entries: array of object { id, created_at, enabled, 6 more }  or object { id, created_at, enabled, 4 more }  or object { id, confidence, enabled, 4 more }  or 4 more`

      - `CustomEntry object { id, created_at, enabled, 6 more }`

        - `id: string`

        - `created_at: string`

        - `enabled: boolean`

        - `name: string`

        - `pattern: Pattern`

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

    - `type: "integration"`

      - `"integration"`

    - `updated_at: string`

    - `description: optional string`

      The description of the profile.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/profiles/custom \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "name",
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
    "allowed_match_count": 5,
    "created_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "ocr_enabled": true,
    "type": "custom",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "ai_context_enabled": true,
    "confidence_threshold": "low",
    "context_awareness": {
      "enabled": true,
      "skip": {
        "files": true
      }
    },
    "data_classes": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "data_tags": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "description": "description",
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
    "sensitivity_levels": [
      {
        "group_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "level_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    ],
    "shared_entries": [
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
    ]
  }
}
```

## Update custom profile

**put** `/accounts/{account_id}/dlp/profiles/custom/{profile_id}`

Updates a DLP custom profile.

### Path Parameters

- `account_id: string`

- `profile_id: string`

### Body Parameters

- `name: string`

- `ai_context_enabled: optional boolean`

- `allowed_match_count: optional number`

- `confidence_threshold: optional string`

- `context_awareness: optional ContextAwareness`

  Scan the context of predefined entries to only return matches surrounded by keywords.

  - `enabled: boolean`

    If true, scan the context of predefined entries to only return matches surrounded by keywords.

  - `skip: SkipConfiguration`

    Content types to exclude from context analysis and return all matches.

    - `files: boolean`

      If the content type is a file, skip context analysis and return all matches.

- `data_classes: optional array of string`

  Data class IDs to associate with the profile. If omitted, existing associations are unchanged.

- `data_tags: optional array of string`

  Data tag IDs to associate with the profile. If omitted, existing associations are unchanged.

- `description: optional string`

  The description of the profile.

- `entries: optional array of object { enabled, entry_id, name, 2 more }  or object { enabled, name, pattern, description }`

  Custom entries from this profile.
  If this field is omitted, entries owned by this profile will not be changed.

  - `DLPNewCustomEntryWithID object { enabled, entry_id, name, 2 more }`

    - `enabled: boolean`

    - `entry_id: string`

    - `name: string`

    - `pattern: Pattern`

      - `regex: string`

      - `validation: optional "luhn"`

        - `"luhn"`

    - `description: optional string`

  - `DLPNewCustomEntry object { enabled, name, pattern, description }`

    - `enabled: boolean`

    - `name: string`

    - `pattern: Pattern`

    - `description: optional string`

- `ocr_enabled: optional boolean`

- `sensitivity_levels: optional array of object { group_id, level_id }`

  Sensitivity levels to associate with the profile. If omitted, existing associations are unchanged.

  - `group_id: string`

  - `level_id: string`

- `shared_entries: optional array of object { enabled, entry_id }`

  Other entries, e.g. predefined or integration.

  - `enabled: boolean`

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

- `result: optional Profile`

  - `CustomProfile object { id, allowed_match_count, created_at, 13 more }`

    - `id: string`

      The id of the profile (uuid).

    - `allowed_match_count: number`

      Related DLP policies will trigger when the match count exceeds the number set.

    - `created_at: string`

      When the profile was created.

    - `name: string`

      The name of the profile.

    - `ocr_enabled: boolean`

    - `type: "custom"`

      - `"custom"`

    - `updated_at: string`

      When the profile was lasted updated.

    - `ai_context_enabled: optional boolean`

    - `confidence_threshold: optional "low" or "medium" or "high" or "very_high"`

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"very_high"`

    - `context_awareness: optional ContextAwareness`

      Scan the context of predefined entries to only return matches surrounded by keywords.

      - `enabled: boolean`

        If true, scan the context of predefined entries to only return matches surrounded by keywords.

      - `skip: SkipConfiguration`

        Content types to exclude from context analysis and return all matches.

        - `files: boolean`

          If the content type is a file, skip context analysis and return all matches.

    - `data_classes: optional array of string`

      Data classes associated with this profile.

    - `data_tags: optional array of string`

      Data tags associated with this profile.

    - `description: optional string`

      The description of the profile.

    - `entries: optional array of object { id, created_at, enabled, 6 more }  or object { id, created_at, enabled, 4 more }  or object { id, confidence, enabled, 4 more }  or 4 more`

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

    - `sensitivity_levels: optional array of object { group_id, level_id }`

      Sensitivity levels associated with this profile.

      - `group_id: string`

      - `level_id: string`

    - `shared_entries: optional array of object { id, created_at, enabled, 6 more }  or object { id, created_at, enabled, 4 more }  or object { id, confidence, enabled, 4 more }  or 4 more`

      - `CustomEntry object { id, created_at, enabled, 6 more }`

        - `id: string`

        - `created_at: string`

        - `enabled: boolean`

        - `name: string`

        - `pattern: Pattern`

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

  - `PredefinedProfile object { id, allowed_match_count, entries, 7 more }`

    - `id: string`

      The id of the predefined profile (uuid).

    - `allowed_match_count: number`

    - `entries: array of object { id, created_at, enabled, 6 more }  or object { id, created_at, enabled, 4 more }  or object { id, confidence, enabled, 4 more }  or 4 more`

      - `CustomEntry object { id, created_at, enabled, 6 more }`

        - `id: string`

        - `created_at: string`

        - `enabled: boolean`

        - `name: string`

        - `pattern: Pattern`

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

    - `type: "predefined"`

      - `"predefined"`

    - `ai_context_enabled: optional boolean`

    - `confidence_threshold: optional "low" or "medium" or "high" or "very_high"`

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"very_high"`

    - `context_awareness: optional ContextAwareness`

      Scan the context of predefined entries to only return matches surrounded by keywords.

    - `ocr_enabled: optional boolean`

    - `open_access: optional boolean`

      Whether this profile can be accessed by anyone.

  - `IntegrationProfile object { id, created_at, entries, 5 more }`

    - `id: string`

    - `created_at: string`

    - `entries: array of object { id, created_at, enabled, 6 more }  or object { id, created_at, enabled, 4 more }  or object { id, confidence, enabled, 4 more }  or 4 more`

      - `CustomEntry object { id, created_at, enabled, 6 more }`

        - `id: string`

        - `created_at: string`

        - `enabled: boolean`

        - `name: string`

        - `pattern: Pattern`

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

    - `shared_entries: array of object { id, created_at, enabled, 6 more }  or object { id, created_at, enabled, 4 more }  or object { id, confidence, enabled, 4 more }  or 4 more`

      - `CustomEntry object { id, created_at, enabled, 6 more }`

        - `id: string`

        - `created_at: string`

        - `enabled: boolean`

        - `name: string`

        - `pattern: Pattern`

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

    - `type: "integration"`

      - `"integration"`

    - `updated_at: string`

    - `description: optional string`

      The description of the profile.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/profiles/custom/$PROFILE_ID \
    -X PUT \
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
    "allowed_match_count": 5,
    "created_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "ocr_enabled": true,
    "type": "custom",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "ai_context_enabled": true,
    "confidence_threshold": "low",
    "context_awareness": {
      "enabled": true,
      "skip": {
        "files": true
      }
    },
    "data_classes": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "data_tags": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "description": "description",
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
    "sensitivity_levels": [
      {
        "group_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "level_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    ],
    "shared_entries": [
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
    ]
  }
}
```

## Delete custom profile

**delete** `/accounts/{account_id}/dlp/profiles/custom/{profile_id}`

Deletes a DLP custom profile.

### Path Parameters

- `account_id: string`

- `profile_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/profiles/custom/$PROFILE_ID \
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

### Custom Profile

- `CustomProfile object { id, allowed_match_count, created_at, 12 more }`

  - `id: string`

    The id of the profile (uuid).

  - `allowed_match_count: number`

    Related DLP policies will trigger when the match count exceeds the number set.

  - `created_at: string`

    When the profile was created.

  - `name: string`

    The name of the profile.

  - `ocr_enabled: boolean`

  - `updated_at: string`

    When the profile was lasted updated.

  - `ai_context_enabled: optional boolean`

  - `confidence_threshold: optional "low" or "medium" or "high" or "very_high"`

    - `"low"`

    - `"medium"`

    - `"high"`

    - `"very_high"`

  - `context_awareness: optional ContextAwareness`

    Scan the context of predefined entries to only return matches surrounded by keywords.

    - `enabled: boolean`

      If true, scan the context of predefined entries to only return matches surrounded by keywords.

    - `skip: SkipConfiguration`

      Content types to exclude from context analysis and return all matches.

      - `files: boolean`

        If the content type is a file, skip context analysis and return all matches.

  - `data_classes: optional array of string`

    Data classes associated with this profile.

  - `data_tags: optional array of string`

    Data tags associated with this profile.

  - `description: optional string`

    The description of the profile.

  - `entries: optional array of object { id, created_at, enabled, 6 more }  or object { id, created_at, enabled, 4 more }  or object { id, confidence, enabled, 4 more }  or 4 more`

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

  - `sensitivity_levels: optional array of object { group_id, level_id }`

    Sensitivity levels associated with this profile.

    - `group_id: string`

    - `level_id: string`

  - `shared_entries: optional array of object { id, created_at, enabled, 6 more }  or object { id, created_at, enabled, 4 more }  or object { id, confidence, enabled, 4 more }  or 4 more`

    - `CustomEntry object { id, created_at, enabled, 6 more }`

      - `id: string`

      - `created_at: string`

      - `enabled: boolean`

      - `name: string`

      - `pattern: Pattern`

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

### Pattern

- `Pattern object { regex, validation }`

  - `regex: string`

  - `validation: optional "luhn"`

    - `"luhn"`

### Custom Delete Response

- `CustomDeleteResponse = unknown`
