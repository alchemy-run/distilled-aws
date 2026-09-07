# DLP

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

# Datasets

## Fetch all datasets

**get** `/accounts/{account_id}/dlp/datasets`

Lists all DLP datasets configured for the account, including custom word lists and EDM datasets.

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

- `result: optional DatasetArray`

  - `id: string`

  - `columns: array of object { entry_id, header_name, num_cells, upload_status }`

    - `entry_id: string`

    - `header_name: string`

    - `num_cells: number`

    - `upload_status: "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `created_at: string`

  - `encoding_version: number`

  - `name: string`

  - `num_cells: number`

  - `secret: boolean`

  - `status: "empty" or "uploading" or "pending" or 3 more`

    - `"empty"`

    - `"uploading"`

    - `"pending"`

    - `"processing"`

    - `"failed"`

    - `"complete"`

  - `updated_at: string`

    Stores when the dataset was last updated.

    This includes name or description changes as well as uploads.

  - `uploads: array of object { num_cells, status, version }`

    - `num_cells: number`

    - `status: "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

    - `version: number`

  - `case_sensitive: optional boolean`

  - `description: optional string`

    The description of the dataset.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/datasets \
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
      "columns": [
        {
          "entry_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "header_name": "header_name",
          "num_cells": 0,
          "upload_status": "empty"
        }
      ],
      "created_at": "2019-12-27T18:11:19.117Z",
      "encoding_version": 0,
      "name": "name",
      "num_cells": 0,
      "secret": true,
      "status": "empty",
      "updated_at": "2019-12-27T18:11:19.117Z",
      "uploads": [
        {
          "num_cells": 0,
          "status": "empty",
          "version": 0
        }
      ],
      "case_sensitive": true,
      "description": "description"
    }
  ]
}
```

## Fetch a specific dataset

**get** `/accounts/{account_id}/dlp/datasets/{dataset_id}`

Fetch a specific dataset

### Path Parameters

- `account_id: string`

- `dataset_id: string`

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

- `result: optional Dataset`

  - `id: string`

  - `columns: array of object { entry_id, header_name, num_cells, upload_status }`

    - `entry_id: string`

    - `header_name: string`

    - `num_cells: number`

    - `upload_status: "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `created_at: string`

  - `encoding_version: number`

  - `name: string`

  - `num_cells: number`

  - `secret: boolean`

  - `status: "empty" or "uploading" or "pending" or 3 more`

    - `"empty"`

    - `"uploading"`

    - `"pending"`

    - `"processing"`

    - `"failed"`

    - `"complete"`

  - `updated_at: string`

    Stores when the dataset was last updated.

    This includes name or description changes as well as uploads.

  - `uploads: array of object { num_cells, status, version }`

    - `num_cells: number`

    - `status: "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

    - `version: number`

  - `case_sensitive: optional boolean`

  - `description: optional string`

    The description of the dataset.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/datasets/$DATASET_ID \
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
    "columns": [
      {
        "entry_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "header_name": "header_name",
        "num_cells": 0,
        "upload_status": "empty"
      }
    ],
    "created_at": "2019-12-27T18:11:19.117Z",
    "encoding_version": 0,
    "name": "name",
    "num_cells": 0,
    "secret": true,
    "status": "empty",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "uploads": [
      {
        "num_cells": 0,
        "status": "empty",
        "version": 0
      }
    ],
    "case_sensitive": true,
    "description": "description"
  }
}
```

## Create a new dataset

**post** `/accounts/{account_id}/dlp/datasets`

Creates a new DLP (Data Loss Prevention) dataset for storing custom detection patterns. Datasets can contain exact match data, word lists, or EDM (Exact Data Match) configurations.

### Path Parameters

- `account_id: string`

### Body Parameters

- `name: string`

- `case_sensitive: optional boolean`

  Only applies to custom word lists.
  Determines if the words should be matched in a case-sensitive manner
  Cannot be set to false if `secret` is true or undefined

- `description: optional string`

  The description of the dataset.

- `encoding_version: optional number`

  Dataset encoding version

  Non-secret custom word lists with no header are always version 1.
  Secret EDM lists with no header are version 1.
  Multicolumn CSV with headers are version 2.
  Omitting this field provides the default value 0, which is interpreted
  the same as 1.

- `secret: optional boolean`

  Generate a secret dataset.

  If true, the response will include a secret to use with the EDM encoder.
  If false, the response has no secret and the dataset is uploaded in plaintext.

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

- `result: optional DatasetCreation`

  - `dataset: Dataset`

    - `id: string`

    - `columns: array of object { entry_id, header_name, num_cells, upload_status }`

      - `entry_id: string`

      - `header_name: string`

      - `num_cells: number`

      - `upload_status: "empty" or "uploading" or "pending" or 3 more`

        - `"empty"`

        - `"uploading"`

        - `"pending"`

        - `"processing"`

        - `"failed"`

        - `"complete"`

    - `created_at: string`

    - `encoding_version: number`

    - `name: string`

    - `num_cells: number`

    - `secret: boolean`

    - `status: "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

    - `updated_at: string`

      Stores when the dataset was last updated.

      This includes name or description changes as well as uploads.

    - `uploads: array of object { num_cells, status, version }`

      - `num_cells: number`

      - `status: "empty" or "uploading" or "pending" or 3 more`

        - `"empty"`

        - `"uploading"`

        - `"pending"`

        - `"processing"`

        - `"failed"`

        - `"complete"`

      - `version: number`

    - `case_sensitive: optional boolean`

    - `description: optional string`

      The description of the dataset.

  - `encoding_version: number`

    Encoding version to use for dataset.

  - `max_cells: number`

  - `version: number`

    The version to use when uploading the dataset.

  - `secret: optional string`

    The secret to use for Exact Data Match datasets.

    This is not present in Custom Wordlists.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/datasets \
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
    "dataset": {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "columns": [
        {
          "entry_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "header_name": "header_name",
          "num_cells": 0,
          "upload_status": "empty"
        }
      ],
      "created_at": "2019-12-27T18:11:19.117Z",
      "encoding_version": 0,
      "name": "name",
      "num_cells": 0,
      "secret": true,
      "status": "empty",
      "updated_at": "2019-12-27T18:11:19.117Z",
      "uploads": [
        {
          "num_cells": 0,
          "status": "empty",
          "version": 0
        }
      ],
      "case_sensitive": true,
      "description": "description"
    },
    "encoding_version": 0,
    "max_cells": 0,
    "version": 0,
    "secret": "secret"
  }
}
```

## Update details about a dataset

**put** `/accounts/{account_id}/dlp/datasets/{dataset_id}`

Updates the configuration of an existing DLP dataset, such as its name, description, or detection settings.

### Path Parameters

- `account_id: string`

- `dataset_id: string`

### Body Parameters

- `case_sensitive: optional boolean`

  Determines if the words should be matched in a case-sensitive manner.

  Only required for custom word lists.

- `description: optional string`

  The description of the dataset.

- `name: optional string`

  The name of the dataset, must be unique.

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

- `result: optional Dataset`

  - `id: string`

  - `columns: array of object { entry_id, header_name, num_cells, upload_status }`

    - `entry_id: string`

    - `header_name: string`

    - `num_cells: number`

    - `upload_status: "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `created_at: string`

  - `encoding_version: number`

  - `name: string`

  - `num_cells: number`

  - `secret: boolean`

  - `status: "empty" or "uploading" or "pending" or 3 more`

    - `"empty"`

    - `"uploading"`

    - `"pending"`

    - `"processing"`

    - `"failed"`

    - `"complete"`

  - `updated_at: string`

    Stores when the dataset was last updated.

    This includes name or description changes as well as uploads.

  - `uploads: array of object { num_cells, status, version }`

    - `num_cells: number`

    - `status: "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

    - `version: number`

  - `case_sensitive: optional boolean`

  - `description: optional string`

    The description of the dataset.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/datasets/$DATASET_ID \
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
    "columns": [
      {
        "entry_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "header_name": "header_name",
        "num_cells": 0,
        "upload_status": "empty"
      }
    ],
    "created_at": "2019-12-27T18:11:19.117Z",
    "encoding_version": 0,
    "name": "name",
    "num_cells": 0,
    "secret": true,
    "status": "empty",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "uploads": [
      {
        "num_cells": 0,
        "status": "empty",
        "version": 0
      }
    ],
    "case_sensitive": true,
    "description": "description"
  }
}
```

## Delete a dataset

**delete** `/accounts/{account_id}/dlp/datasets/{dataset_id}`

This deletes all versions of the dataset.

### Path Parameters

- `account_id: string`

- `dataset_id: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/datasets/$DATASET_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Domain Types

### Dataset

- `Dataset object { id, columns, created_at, 9 more }`

  - `id: string`

  - `columns: array of object { entry_id, header_name, num_cells, upload_status }`

    - `entry_id: string`

    - `header_name: string`

    - `num_cells: number`

    - `upload_status: "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `created_at: string`

  - `encoding_version: number`

  - `name: string`

  - `num_cells: number`

  - `secret: boolean`

  - `status: "empty" or "uploading" or "pending" or 3 more`

    - `"empty"`

    - `"uploading"`

    - `"pending"`

    - `"processing"`

    - `"failed"`

    - `"complete"`

  - `updated_at: string`

    Stores when the dataset was last updated.

    This includes name or description changes as well as uploads.

  - `uploads: array of object { num_cells, status, version }`

    - `num_cells: number`

    - `status: "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

    - `version: number`

  - `case_sensitive: optional boolean`

  - `description: optional string`

    The description of the dataset.

### Dataset Array

- `DatasetArray = array of Dataset`

  - `id: string`

  - `columns: array of object { entry_id, header_name, num_cells, upload_status }`

    - `entry_id: string`

    - `header_name: string`

    - `num_cells: number`

    - `upload_status: "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `created_at: string`

  - `encoding_version: number`

  - `name: string`

  - `num_cells: number`

  - `secret: boolean`

  - `status: "empty" or "uploading" or "pending" or 3 more`

    - `"empty"`

    - `"uploading"`

    - `"pending"`

    - `"processing"`

    - `"failed"`

    - `"complete"`

  - `updated_at: string`

    Stores when the dataset was last updated.

    This includes name or description changes as well as uploads.

  - `uploads: array of object { num_cells, status, version }`

    - `num_cells: number`

    - `status: "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

    - `version: number`

  - `case_sensitive: optional boolean`

  - `description: optional string`

    The description of the dataset.

### Dataset Creation

- `DatasetCreation object { dataset, encoding_version, max_cells, 2 more }`

  - `dataset: Dataset`

    - `id: string`

    - `columns: array of object { entry_id, header_name, num_cells, upload_status }`

      - `entry_id: string`

      - `header_name: string`

      - `num_cells: number`

      - `upload_status: "empty" or "uploading" or "pending" or 3 more`

        - `"empty"`

        - `"uploading"`

        - `"pending"`

        - `"processing"`

        - `"failed"`

        - `"complete"`

    - `created_at: string`

    - `encoding_version: number`

    - `name: string`

    - `num_cells: number`

    - `secret: boolean`

    - `status: "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

    - `updated_at: string`

      Stores when the dataset was last updated.

      This includes name or description changes as well as uploads.

    - `uploads: array of object { num_cells, status, version }`

      - `num_cells: number`

      - `status: "empty" or "uploading" or "pending" or 3 more`

        - `"empty"`

        - `"uploading"`

        - `"pending"`

        - `"processing"`

        - `"failed"`

        - `"complete"`

      - `version: number`

    - `case_sensitive: optional boolean`

    - `description: optional string`

      The description of the dataset.

  - `encoding_version: number`

    Encoding version to use for dataset.

  - `max_cells: number`

  - `version: number`

    The version to use when uploading the dataset.

  - `secret: optional string`

    The secret to use for Exact Data Match datasets.

    This is not present in Custom Wordlists.

# Upload

## Prepare to upload a new version of a dataset

**post** `/accounts/{account_id}/dlp/datasets/{dataset_id}/upload`

Creates a new version of a DLP dataset, allowing you to stage changes before activation. Used for single-column EDM and custom word lists.

### Path Parameters

- `account_id: string`

- `dataset_id: string`

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

- `result: optional NewVersion`

  - `encoding_version: number`

  - `max_cells: number`

  - `version: number`

  - `case_sensitive: optional boolean`

  - `columns: optional array of object { entry_id, header_name, num_cells, upload_status }`

    - `entry_id: string`

    - `header_name: string`

    - `num_cells: number`

    - `upload_status: "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `secret: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/datasets/$DATASET_ID/upload \
    -X POST \
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
    "encoding_version": 0,
    "max_cells": 0,
    "version": 0,
    "case_sensitive": true,
    "columns": [
      {
        "entry_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "header_name": "header_name",
        "num_cells": 0,
        "upload_status": "empty"
      }
    ],
    "secret": "secret"
  }
}
```

## Upload a new version of a dataset

**post** `/accounts/{account_id}/dlp/datasets/{dataset_id}/upload/{version}`

This is used for single-column EDMv1 and Custom Word Lists. The EDM format
can only be created in the Cloudflare dashboard. For other clients, this
operation can only be used for non-secret Custom Word Lists. The body must
be a UTF-8 encoded, newline (NL or CRNL) separated list of words to be matched.

### Path Parameters

- `account_id: string`

- `dataset_id: string`

- `version: number`

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

- `result: optional Dataset`

  - `id: string`

  - `columns: array of object { entry_id, header_name, num_cells, upload_status }`

    - `entry_id: string`

    - `header_name: string`

    - `num_cells: number`

    - `upload_status: "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `created_at: string`

  - `encoding_version: number`

  - `name: string`

  - `num_cells: number`

  - `secret: boolean`

  - `status: "empty" or "uploading" or "pending" or 3 more`

    - `"empty"`

    - `"uploading"`

    - `"pending"`

    - `"processing"`

    - `"failed"`

    - `"complete"`

  - `updated_at: string`

    Stores when the dataset was last updated.

    This includes name or description changes as well as uploads.

  - `uploads: array of object { num_cells, status, version }`

    - `num_cells: number`

    - `status: "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

    - `version: number`

  - `case_sensitive: optional boolean`

  - `description: optional string`

    The description of the dataset.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/datasets/$DATASET_ID/upload/$VERSION \
    -H 'Content-Type: application/octet-stream' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F 'dataset=@/path/to/dataset'
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
    "columns": [
      {
        "entry_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "header_name": "header_name",
        "num_cells": 0,
        "upload_status": "empty"
      }
    ],
    "created_at": "2019-12-27T18:11:19.117Z",
    "encoding_version": 0,
    "name": "name",
    "num_cells": 0,
    "secret": true,
    "status": "empty",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "uploads": [
      {
        "num_cells": 0,
        "status": "empty",
        "version": 0
      }
    ],
    "case_sensitive": true,
    "description": "description"
  }
}
```

## Domain Types

### New Version

- `NewVersion object { encoding_version, max_cells, version, 3 more }`

  - `encoding_version: number`

  - `max_cells: number`

  - `version: number`

  - `case_sensitive: optional boolean`

  - `columns: optional array of object { entry_id, header_name, num_cells, upload_status }`

    - `entry_id: string`

    - `header_name: string`

    - `num_cells: number`

    - `upload_status: "empty" or "uploading" or "pending" or 3 more`

      - `"empty"`

      - `"uploading"`

      - `"pending"`

      - `"processing"`

      - `"failed"`

      - `"complete"`

  - `secret: optional string`

# Versions

## Sets the column information for a multi-column upload

**post** `/accounts/{account_id}/dlp/datasets/{dataset_id}/versions/{version}`

This is used for multi-column EDMv2 datasets. The EDMv2 format can only be
created in the Cloudflare dashboard. The columns in the response appear in
the same order as in the request.

### Path Parameters

- `account_id: string`

- `dataset_id: string`

- `version: number`

### Body Parameters

- `body: array of object { entry_id, header_name, num_cells }  or object { entry_name, header_name, num_cells }`

  - `ExistingColumn object { entry_id, header_name, num_cells }`

    - `entry_id: string`

    - `header_name: optional string`

    - `num_cells: optional number`

  - `NewColumn object { entry_name, header_name, num_cells }`

    - `entry_name: string`

    - `header_name: optional string`

    - `num_cells: optional number`

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

- `result: optional array of object { entry_id, header_name, num_cells, upload_status }`

  - `entry_id: string`

  - `header_name: string`

  - `num_cells: number`

  - `upload_status: "empty" or "uploading" or "pending" or 3 more`

    - `"empty"`

    - `"uploading"`

    - `"pending"`

    - `"processing"`

    - `"failed"`

    - `"complete"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/datasets/$DATASET_ID/versions/$VERSION \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "entry_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "header_name": "header_name",
            "num_cells": 0
          }
        ]'
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
      "entry_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "header_name": "header_name",
      "num_cells": 0,
      "upload_status": "empty"
    }
  ]
}
```

## Domain Types

### Version Create Response

- `VersionCreateResponse object { entry_id, header_name, num_cells, upload_status }`

  - `entry_id: string`

  - `header_name: string`

  - `num_cells: number`

  - `upload_status: "empty" or "uploading" or "pending" or 3 more`

    - `"empty"`

    - `"uploading"`

    - `"pending"`

    - `"processing"`

    - `"failed"`

    - `"complete"`

# Entries

## Upload a new version of a multi-column dataset

**post** `/accounts/{account_id}/dlp/datasets/{dataset_id}/versions/{version}/entries/{entry_id}`

This is used for multi-column EDMv2 datasets. The EDMv2 format can only be
created in the Cloudflare dashboard.

### Path Parameters

- `account_id: string`

- `dataset_id: string`

- `version: number`

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

- `result: optional object { entry_id, header_name, num_cells, upload_status }`

  - `entry_id: string`

  - `header_name: string`

  - `num_cells: number`

  - `upload_status: "empty" or "uploading" or "pending" or 3 more`

    - `"empty"`

    - `"uploading"`

    - `"pending"`

    - `"processing"`

    - `"failed"`

    - `"complete"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/datasets/$DATASET_ID/versions/$VERSION/entries/$ENTRY_ID \
    -H 'Content-Type: application/octet-stream' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F 'dataset_version_entry=@/path/to/dataset_version_entry'
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
    "entry_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "header_name": "header_name",
    "num_cells": 0,
    "upload_status": "empty"
  }
}
```

## Domain Types

### Entry Create Response

- `EntryCreateResponse object { entry_id, header_name, num_cells, upload_status }`

  - `entry_id: string`

  - `header_name: string`

  - `num_cells: number`

  - `upload_status: "empty" or "uploading" or "pending" or 3 more`

    - `"empty"`

    - `"uploading"`

    - `"pending"`

    - `"processing"`

    - `"failed"`

    - `"complete"`

# Patterns

## Validate a DLP regex pattern

**post** `/accounts/{account_id}/dlp/patterns/validate`

Validates whether this pattern is a valid regular expression. Rejects it if
the regular expression is too complex or can match an unbounded-length
string. The regex will be rejected if it uses `*` or `+`. Bound the maximum
number of characters that can be matched using a range, e.g. `{1,100}`.

### Path Parameters

- `account_id: string`

### Body Parameters

- `regex: string`

- `max_match_bytes: optional number`

  Maximum number of bytes that the regular expression can match.

  If this is `null` then there is no limit on the length. Patterns can use
  `*` and `+`. Otherwise repeats should use a range `{m,n}` to restrict
  patterns to the length. If this field is missing, then a default length
  limit is used.

  Note that the length is specified in bytes. Since regular expressions
  use UTF-8 the pattern `.` can match up to 4 bytes. Hence `.{1,256}`
  has a maximum length of 1024 bytes.

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

- `result: optional object { valid }`

  - `valid: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/patterns/validate \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "regex": "regex"
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
    "valid": true
  }
}
```

## Domain Types

### Pattern Validate Response

- `PatternValidateResponse object { valid }`

  - `valid: boolean`

# Payload Logs

## Get payload log settings

**get** `/accounts/{account_id}/dlp/payload_log`

Gets the current payload logging configuration for DLP, showing whether matched content is being logged.

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

- `result: optional object { updated_at, masking_level, public_key }`

  - `updated_at: string`

  - `masking_level: optional "full" or "partial" or "clear" or "default"`

    Masking level for payload logs.

    - `full`: The entire payload is masked.
    - `partial`: Only partial payload content is masked.
    - `clear`: No masking is applied to the payload content.
    - `default`: DLP uses its default masking behavior.

    - `"full"`

    - `"partial"`

    - `"clear"`

    - `"default"`

  - `public_key: optional string`

    Base64-encoded public key for encrypting payload logs. Null when payload logging is disabled.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/payload_log \
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
    "updated_at": "2019-12-27T18:11:19.117Z",
    "masking_level": "full",
    "public_key": "public_key"
  }
}
```

## Set payload log settings

**put** `/accounts/{account_id}/dlp/payload_log`

Enables or disables payload logging for DLP matches. When enabled, matched content is stored for review.

### Path Parameters

- `account_id: string`

### Body Parameters

- `masking_level: optional "full" or "partial" or "clear" or "default"`

  Masking level for payload logs.

  - `full`: The entire payload is masked.
  - `partial`: Only partial payload content is masked.
  - `clear`: No masking is applied to the payload content.
  - `default`: DLP uses its default masking behavior.

  - `"full"`

  - `"partial"`

  - `"clear"`

  - `"default"`

- `public_key: optional string`

  Base64-encoded public key for encrypting payload logs.

  - Set to null or empty string to disable payload logging.
  - Set to a non-empty base64 string to enable payload logging with the given key.

  For customers with configurable payload masking feature rolled out:

  - If the field is missing, the existing setting will be kept. Note that this is different from setting to null or empty string.

  For all other customers:

  - If the field is missing, the existing setting will be cleared.

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

- `result: optional object { updated_at, masking_level, public_key }`

  - `updated_at: string`

  - `masking_level: optional "full" or "partial" or "clear" or "default"`

    Masking level for payload logs.

    - `full`: The entire payload is masked.
    - `partial`: Only partial payload content is masked.
    - `clear`: No masking is applied to the payload content.
    - `default`: DLP uses its default masking behavior.

    - `"full"`

    - `"partial"`

    - `"clear"`

    - `"default"`

  - `public_key: optional string`

    Base64-encoded public key for encrypting payload logs. Null when payload logging is disabled.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/payload_log \
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
    "updated_at": "2019-12-27T18:11:19.117Z",
    "masking_level": "full",
    "public_key": "public_key"
  }
}
```

## Domain Types

### Payload Log Get Response

- `PayloadLogGetResponse object { updated_at, masking_level, public_key }`

  - `updated_at: string`

  - `masking_level: optional "full" or "partial" or "clear" or "default"`

    Masking level for payload logs.

    - `full`: The entire payload is masked.
    - `partial`: Only partial payload content is masked.
    - `clear`: No masking is applied to the payload content.
    - `default`: DLP uses its default masking behavior.

    - `"full"`

    - `"partial"`

    - `"clear"`

    - `"default"`

  - `public_key: optional string`

    Base64-encoded public key for encrypting payload logs. Null when payload logging is disabled.

### Payload Log Update Response

- `PayloadLogUpdateResponse object { updated_at, masking_level, public_key }`

  - `updated_at: string`

  - `masking_level: optional "full" or "partial" or "clear" or "default"`

    Masking level for payload logs.

    - `full`: The entire payload is masked.
    - `partial`: Only partial payload content is masked.
    - `clear`: No masking is applied to the payload content.
    - `default`: DLP uses its default masking behavior.

    - `"full"`

    - `"partial"`

    - `"clear"`

    - `"default"`

  - `public_key: optional string`

    Base64-encoded public key for encrypting payload logs. Null when payload logging is disabled.

# Settings

## Get DLP account-level settings.

**get** `/accounts/{account_id}/dlp/settings`

Get DLP account-level settings.

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

- `result: optional DLPSettings`

  DLP account-level settings response.

  - `ai_context_analysis: boolean`

    Whether AI context analysis is enabled at the account level.

  - `ocr: boolean`

    Whether OCR is enabled at the account level.

  - `payload_logging: object { updated_at, masking_level, public_key }`

    - `updated_at: string`

    - `masking_level: optional "full" or "partial" or "clear" or "default"`

      Masking level for payload logs.

      - `full`: The entire payload is masked.
      - `partial`: Only partial payload content is masked.
      - `clear`: No masking is applied to the payload content.
      - `default`: DLP uses its default masking behavior.

      - `"full"`

      - `"partial"`

      - `"clear"`

      - `"default"`

    - `public_key: optional string`

      Base64-encoded public key for encrypting payload logs. Null when payload logging is disabled.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/settings \
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
    "ai_context_analysis": true,
    "ocr": true,
    "payload_logging": {
      "updated_at": "2019-12-27T18:11:19.117Z",
      "masking_level": "full",
      "public_key": "public_key"
    }
  }
}
```

## Update DLP account-level settings (full replacement).

**put** `/accounts/{account_id}/dlp/settings`

Missing fields are reset to initial (unconfigured) values.

### Path Parameters

- `account_id: string`

### Body Parameters

- `ai_context_analysis: optional boolean`

  Whether AI context analysis is enabled at the account level.

- `ocr: optional boolean`

  Whether OCR is enabled at the account level.

- `payload_logging: optional object { masking_level, public_key }`

  Request model for payload log settings within the DLP settings endpoint.
  Unlike the legacy endpoint, null and missing are treated identically here
  (both mean "not provided" for PATCH, "reset to default" for PUT).

  - `masking_level: optional "full" or "partial" or "clear" or "default"`

    Masking level for payload logs.

    - `full`: The entire payload is masked.
    - `partial`: Only partial payload content is masked.
    - `clear`: No masking is applied to the payload content.
    - `default`: DLP uses its default masking behavior.

    - `"full"`

    - `"partial"`

    - `"clear"`

    - `"default"`

  - `public_key: optional string`

    Base64-encoded public key for encrypting payload logs.

    - Set to a non-empty base64 string to enable payload logging with the given key.
    - Set to an empty string to disable payload logging.
    - Omit or set to null to leave unchanged (PATCH) or reset to disabled (PUT).

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

- `result: optional DLPSettings`

  DLP account-level settings response.

  - `ai_context_analysis: boolean`

    Whether AI context analysis is enabled at the account level.

  - `ocr: boolean`

    Whether OCR is enabled at the account level.

  - `payload_logging: object { updated_at, masking_level, public_key }`

    - `updated_at: string`

    - `masking_level: optional "full" or "partial" or "clear" or "default"`

      Masking level for payload logs.

      - `full`: The entire payload is masked.
      - `partial`: Only partial payload content is masked.
      - `clear`: No masking is applied to the payload content.
      - `default`: DLP uses its default masking behavior.

      - `"full"`

      - `"partial"`

      - `"clear"`

      - `"default"`

    - `public_key: optional string`

      Base64-encoded public key for encrypting payload logs. Null when payload logging is disabled.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/settings \
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
    "ai_context_analysis": true,
    "ocr": true,
    "payload_logging": {
      "updated_at": "2019-12-27T18:11:19.117Z",
      "masking_level": "full",
      "public_key": "public_key"
    }
  }
}
```

## Partially update DLP account-level settings.

**patch** `/accounts/{account_id}/dlp/settings`

Missing fields keep their existing values.

### Path Parameters

- `account_id: string`

### Body Parameters

- `ai_context_analysis: optional boolean`

  Whether AI context analysis is enabled at the account level.

- `ocr: optional boolean`

  Whether OCR is enabled at the account level.

- `payload_logging: optional object { masking_level, public_key }`

  Request model for payload log settings within the DLP settings endpoint.
  Unlike the legacy endpoint, null and missing are treated identically here
  (both mean "not provided" for PATCH, "reset to default" for PUT).

  - `masking_level: optional "full" or "partial" or "clear" or "default"`

    Masking level for payload logs.

    - `full`: The entire payload is masked.
    - `partial`: Only partial payload content is masked.
    - `clear`: No masking is applied to the payload content.
    - `default`: DLP uses its default masking behavior.

    - `"full"`

    - `"partial"`

    - `"clear"`

    - `"default"`

  - `public_key: optional string`

    Base64-encoded public key for encrypting payload logs.

    - Set to a non-empty base64 string to enable payload logging with the given key.
    - Set to an empty string to disable payload logging.
    - Omit or set to null to leave unchanged (PATCH) or reset to disabled (PUT).

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

- `result: optional DLPSettings`

  DLP account-level settings response.

  - `ai_context_analysis: boolean`

    Whether AI context analysis is enabled at the account level.

  - `ocr: boolean`

    Whether OCR is enabled at the account level.

  - `payload_logging: object { updated_at, masking_level, public_key }`

    - `updated_at: string`

    - `masking_level: optional "full" or "partial" or "clear" or "default"`

      Masking level for payload logs.

      - `full`: The entire payload is masked.
      - `partial`: Only partial payload content is masked.
      - `clear`: No masking is applied to the payload content.
      - `default`: DLP uses its default masking behavior.

      - `"full"`

      - `"partial"`

      - `"clear"`

      - `"default"`

    - `public_key: optional string`

      Base64-encoded public key for encrypting payload logs. Null when payload logging is disabled.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/settings \
    -X PATCH \
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
    "ai_context_analysis": true,
    "ocr": true,
    "payload_logging": {
      "updated_at": "2019-12-27T18:11:19.117Z",
      "masking_level": "full",
      "public_key": "public_key"
    }
  }
}
```

## Delete (reset) DLP account-level settings to initial values.

**delete** `/accounts/{account_id}/dlp/settings`

Delete (reset) DLP account-level settings to initial values.

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

- `result: optional DLPSettings`

  DLP account-level settings response.

  - `ai_context_analysis: boolean`

    Whether AI context analysis is enabled at the account level.

  - `ocr: boolean`

    Whether OCR is enabled at the account level.

  - `payload_logging: object { updated_at, masking_level, public_key }`

    - `updated_at: string`

    - `masking_level: optional "full" or "partial" or "clear" or "default"`

      Masking level for payload logs.

      - `full`: The entire payload is masked.
      - `partial`: Only partial payload content is masked.
      - `clear`: No masking is applied to the payload content.
      - `default`: DLP uses its default masking behavior.

      - `"full"`

      - `"partial"`

      - `"clear"`

      - `"default"`

    - `public_key: optional string`

      Base64-encoded public key for encrypting payload logs. Null when payload logging is disabled.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/settings \
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
    "ai_context_analysis": true,
    "ocr": true,
    "payload_logging": {
      "updated_at": "2019-12-27T18:11:19.117Z",
      "masking_level": "full",
      "public_key": "public_key"
    }
  }
}
```

## Domain Types

### DLP Settings

- `DLPSettings object { ai_context_analysis, ocr, payload_logging }`

  DLP account-level settings response.

  - `ai_context_analysis: boolean`

    Whether AI context analysis is enabled at the account level.

  - `ocr: boolean`

    Whether OCR is enabled at the account level.

  - `payload_logging: object { updated_at, masking_level, public_key }`

    - `updated_at: string`

    - `masking_level: optional "full" or "partial" or "clear" or "default"`

      Masking level for payload logs.

      - `full`: The entire payload is masked.
      - `partial`: Only partial payload content is masked.
      - `clear`: No masking is applied to the payload content.
      - `default`: DLP uses its default masking behavior.

      - `"full"`

      - `"partial"`

      - `"clear"`

      - `"default"`

    - `public_key: optional string`

      Base64-encoded public key for encrypting payload logs. Null when payload logging is disabled.

# Email

# Account Mapping

## Get mapping

**get** `/accounts/{account_id}/dlp/email/account_mapping`

Retrieves the email provider mapping configuration for DLP email scanning.

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

- `result: optional object { addin_identifier_token, auth_requirements }`

  - `addin_identifier_token: string`

  - `auth_requirements: object { allowed_microsoft_organizations, type }  or object { type }`

    - `object { allowed_microsoft_organizations, type }`

      - `allowed_microsoft_organizations: array of string`

      - `type: "Org"`

        - `"Org"`

    - `Type object { type }`

      - `type: "NoAuth"`

        - `"NoAuth"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/email/account_mapping \
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
    "addin_identifier_token": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "auth_requirements": {
      "allowed_microsoft_organizations": [
        "string"
      ],
      "type": "Org"
    }
  }
}
```

## Create mapping

**post** `/accounts/{account_id}/dlp/email/account_mapping`

Creates a mapping between a Cloudflare account and an email provider for DLP email scanning integration.

### Path Parameters

- `account_id: string`

### Body Parameters

- `auth_requirements: object { allowed_microsoft_organizations, type }  or object { type }`

  - `object { allowed_microsoft_organizations, type }`

    - `allowed_microsoft_organizations: array of string`

    - `type: "Org"`

      - `"Org"`

  - `Type object { type }`

    - `type: "NoAuth"`

      - `"NoAuth"`

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

- `result: optional object { addin_identifier_token, auth_requirements }`

  - `addin_identifier_token: string`

  - `auth_requirements: object { allowed_microsoft_organizations, type }  or object { type }`

    - `object { allowed_microsoft_organizations, type }`

      - `allowed_microsoft_organizations: array of string`

      - `type: "Org"`

        - `"Org"`

    - `Type object { type }`

      - `type: "NoAuth"`

        - `"NoAuth"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/email/account_mapping \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "auth_requirements": {
            "allowed_microsoft_organizations": [
              "string"
            ],
            "type": "Org"
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
    "addin_identifier_token": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "auth_requirements": {
      "allowed_microsoft_organizations": [
        "string"
      ],
      "type": "Org"
    }
  }
}
```

## Domain Types

### Account Mapping Get Response

- `AccountMappingGetResponse object { addin_identifier_token, auth_requirements }`

  - `addin_identifier_token: string`

  - `auth_requirements: object { allowed_microsoft_organizations, type }  or object { type }`

    - `object { allowed_microsoft_organizations, type }`

      - `allowed_microsoft_organizations: array of string`

      - `type: "Org"`

        - `"Org"`

    - `Type object { type }`

      - `type: "NoAuth"`

        - `"NoAuth"`

### Account Mapping Create Response

- `AccountMappingCreateResponse object { addin_identifier_token, auth_requirements }`

  - `addin_identifier_token: string`

  - `auth_requirements: object { allowed_microsoft_organizations, type }  or object { type }`

    - `object { allowed_microsoft_organizations, type }`

      - `allowed_microsoft_organizations: array of string`

      - `type: "Org"`

        - `"Org"`

    - `Type object { type }`

      - `type: "NoAuth"`

        - `"NoAuth"`

# Rules

## List all email scanner rules

**get** `/accounts/{account_id}/dlp/email/rules`

Lists all email scanner rules for an account.

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

- `result: optional array of object { action, conditions, created_at, 6 more }`

  - `action: object { action, message }`

    - `action: "Block"`

      - `"Block"`

    - `message: optional string`

  - `conditions: array of object { operator, selector, value }`

    Triggered if all conditions match.

    - `operator: "InList" or "NotInList" or "MatchRegex" or "NotMatchRegex"`

      - `"InList"`

      - `"NotInList"`

      - `"MatchRegex"`

      - `"NotMatchRegex"`

    - `selector: "Recipients" or "Sender" or "DLPProfiles"`

      - `"Recipients"`

      - `"Sender"`

      - `"DLPProfiles"`

    - `value: array of string or string`

      - `array of string`

      - `string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `priority: number`

  - `rule_id: string`

  - `updated_at: string`

  - `description: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/email/rules \
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
      "action": {
        "action": "Block",
        "message": "message"
      },
      "conditions": [
        {
          "operator": "InList",
          "selector": "Recipients",
          "value": [
            "string"
          ]
        }
      ],
      "created_at": "2019-12-27T18:11:19.117Z",
      "enabled": true,
      "name": "name",
      "priority": 0,
      "rule_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "updated_at": "2019-12-27T18:11:19.117Z",
      "description": "description"
    }
  ]
}
```

## Get an email scanner rule

**get** `/accounts/{account_id}/dlp/email/rules/{rule_id}`

Gets detailed configuration for a specific DLP email scanning rule, including detection patterns and actions.

### Path Parameters

- `account_id: string`

- `rule_id: string`

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

- `result: optional object { action, conditions, created_at, 6 more }`

  - `action: object { action, message }`

    - `action: "Block"`

      - `"Block"`

    - `message: optional string`

  - `conditions: array of object { operator, selector, value }`

    Triggered if all conditions match.

    - `operator: "InList" or "NotInList" or "MatchRegex" or "NotMatchRegex"`

      - `"InList"`

      - `"NotInList"`

      - `"MatchRegex"`

      - `"NotMatchRegex"`

    - `selector: "Recipients" or "Sender" or "DLPProfiles"`

      - `"Recipients"`

      - `"Sender"`

      - `"DLPProfiles"`

    - `value: array of string or string`

      - `array of string`

      - `string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `priority: number`

  - `rule_id: string`

  - `updated_at: string`

  - `description: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/email/rules/$RULE_ID \
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
    "action": {
      "action": "Block",
      "message": "message"
    },
    "conditions": [
      {
        "operator": "InList",
        "selector": "Recipients",
        "value": [
          "string"
        ]
      }
    ],
    "created_at": "2019-12-27T18:11:19.117Z",
    "enabled": true,
    "name": "name",
    "priority": 0,
    "rule_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description"
  }
}
```

## Create email scanner rule

**post** `/accounts/{account_id}/dlp/email/rules`

Creates a new DLP email scanning rule that defines what content patterns to detect in email messages and what actions to take.

### Path Parameters

- `account_id: string`

### Body Parameters

- `action: object { action, message }`

  - `action: "Block"`

    - `"Block"`

  - `message: optional string`

- `conditions: array of object { operator, selector, value }`

  Triggered if all conditions match.

  - `operator: "InList" or "NotInList" or "MatchRegex" or "NotMatchRegex"`

    - `"InList"`

    - `"NotInList"`

    - `"MatchRegex"`

    - `"NotMatchRegex"`

  - `selector: "Recipients" or "Sender" or "DLPProfiles"`

    - `"Recipients"`

    - `"Sender"`

    - `"DLPProfiles"`

  - `value: array of string or string`

    - `array of string`

    - `string`

- `enabled: boolean`

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

- `result: optional object { action, conditions, created_at, 6 more }`

  - `action: object { action, message }`

    - `action: "Block"`

      - `"Block"`

    - `message: optional string`

  - `conditions: array of object { operator, selector, value }`

    Triggered if all conditions match.

    - `operator: "InList" or "NotInList" or "MatchRegex" or "NotMatchRegex"`

      - `"InList"`

      - `"NotInList"`

      - `"MatchRegex"`

      - `"NotMatchRegex"`

    - `selector: "Recipients" or "Sender" or "DLPProfiles"`

      - `"Recipients"`

      - `"Sender"`

      - `"DLPProfiles"`

    - `value: array of string or string`

      - `array of string`

      - `string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `priority: number`

  - `rule_id: string`

  - `updated_at: string`

  - `description: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/email/rules \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": {
            "action": "Block"
          },
          "conditions": [
            {
              "operator": "InList",
              "selector": "Recipients",
              "value": [
                "string"
              ]
            }
          ],
          "enabled": true,
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
    "action": {
      "action": "Block",
      "message": "message"
    },
    "conditions": [
      {
        "operator": "InList",
        "selector": "Recipients",
        "value": [
          "string"
        ]
      }
    ],
    "created_at": "2019-12-27T18:11:19.117Z",
    "enabled": true,
    "name": "name",
    "priority": 0,
    "rule_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description"
  }
}
```

## Update email scanner rule

**put** `/accounts/{account_id}/dlp/email/rules/{rule_id}`

Update email scanner rule

### Path Parameters

- `account_id: string`

- `rule_id: string`

### Body Parameters

- `action: object { action, message }`

  - `action: "Block"`

    - `"Block"`

  - `message: optional string`

- `conditions: array of object { operator, selector, value }`

  Triggered if all conditions match.

  - `operator: "InList" or "NotInList" or "MatchRegex" or "NotMatchRegex"`

    - `"InList"`

    - `"NotInList"`

    - `"MatchRegex"`

    - `"NotMatchRegex"`

  - `selector: "Recipients" or "Sender" or "DLPProfiles"`

    - `"Recipients"`

    - `"Sender"`

    - `"DLPProfiles"`

  - `value: array of string or string`

    - `array of string`

    - `string`

- `enabled: boolean`

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

- `result: optional object { action, conditions, created_at, 6 more }`

  - `action: object { action, message }`

    - `action: "Block"`

      - `"Block"`

    - `message: optional string`

  - `conditions: array of object { operator, selector, value }`

    Triggered if all conditions match.

    - `operator: "InList" or "NotInList" or "MatchRegex" or "NotMatchRegex"`

      - `"InList"`

      - `"NotInList"`

      - `"MatchRegex"`

      - `"NotMatchRegex"`

    - `selector: "Recipients" or "Sender" or "DLPProfiles"`

      - `"Recipients"`

      - `"Sender"`

      - `"DLPProfiles"`

    - `value: array of string or string`

      - `array of string`

      - `string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `priority: number`

  - `rule_id: string`

  - `updated_at: string`

  - `description: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/email/rules/$RULE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": {
            "action": "Block"
          },
          "conditions": [
            {
              "operator": "InList",
              "selector": "Recipients",
              "value": [
                "string"
              ]
            }
          ],
          "enabled": true,
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
    "action": {
      "action": "Block",
      "message": "message"
    },
    "conditions": [
      {
        "operator": "InList",
        "selector": "Recipients",
        "value": [
          "string"
        ]
      }
    ],
    "created_at": "2019-12-27T18:11:19.117Z",
    "enabled": true,
    "name": "name",
    "priority": 0,
    "rule_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description"
  }
}
```

## Delete email scanner rule

**delete** `/accounts/{account_id}/dlp/email/rules/{rule_id}`

Removes a DLP email scanning rule. The rule will no longer be applied to email messages.

### Path Parameters

- `account_id: string`

- `rule_id: string`

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

- `result: optional object { action, conditions, created_at, 6 more }`

  - `action: object { action, message }`

    - `action: "Block"`

      - `"Block"`

    - `message: optional string`

  - `conditions: array of object { operator, selector, value }`

    Triggered if all conditions match.

    - `operator: "InList" or "NotInList" or "MatchRegex" or "NotMatchRegex"`

      - `"InList"`

      - `"NotInList"`

      - `"MatchRegex"`

      - `"NotMatchRegex"`

    - `selector: "Recipients" or "Sender" or "DLPProfiles"`

      - `"Recipients"`

      - `"Sender"`

      - `"DLPProfiles"`

    - `value: array of string or string`

      - `array of string`

      - `string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `priority: number`

  - `rule_id: string`

  - `updated_at: string`

  - `description: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/email/rules/$RULE_ID \
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
    "action": {
      "action": "Block",
      "message": "message"
    },
    "conditions": [
      {
        "operator": "InList",
        "selector": "Recipients",
        "value": [
          "string"
        ]
      }
    ],
    "created_at": "2019-12-27T18:11:19.117Z",
    "enabled": true,
    "name": "name",
    "priority": 0,
    "rule_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description"
  }
}
```

## Update email scanner rule priorities

**patch** `/accounts/{account_id}/dlp/email/rules`

Reorders DLP email scanning rules by updating their priority values. Higher priority rules are evaluated first.

### Path Parameters

- `account_id: string`

### Body Parameters

- `new_priorities: map[number]`

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

- `result: optional object { action, conditions, created_at, 6 more }`

  - `action: object { action, message }`

    - `action: "Block"`

      - `"Block"`

    - `message: optional string`

  - `conditions: array of object { operator, selector, value }`

    Triggered if all conditions match.

    - `operator: "InList" or "NotInList" or "MatchRegex" or "NotMatchRegex"`

      - `"InList"`

      - `"NotInList"`

      - `"MatchRegex"`

      - `"NotMatchRegex"`

    - `selector: "Recipients" or "Sender" or "DLPProfiles"`

      - `"Recipients"`

      - `"Sender"`

      - `"DLPProfiles"`

    - `value: array of string or string`

      - `array of string`

      - `string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `priority: number`

  - `rule_id: string`

  - `updated_at: string`

  - `description: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/email/rules \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "new_priorities": {
            "foo": 0
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
    "action": {
      "action": "Block",
      "message": "message"
    },
    "conditions": [
      {
        "operator": "InList",
        "selector": "Recipients",
        "value": [
          "string"
        ]
      }
    ],
    "created_at": "2019-12-27T18:11:19.117Z",
    "enabled": true,
    "name": "name",
    "priority": 0,
    "rule_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description"
  }
}
```

## Domain Types

### Rule List Response

- `RuleListResponse object { action, conditions, created_at, 6 more }`

  - `action: object { action, message }`

    - `action: "Block"`

      - `"Block"`

    - `message: optional string`

  - `conditions: array of object { operator, selector, value }`

    Triggered if all conditions match.

    - `operator: "InList" or "NotInList" or "MatchRegex" or "NotMatchRegex"`

      - `"InList"`

      - `"NotInList"`

      - `"MatchRegex"`

      - `"NotMatchRegex"`

    - `selector: "Recipients" or "Sender" or "DLPProfiles"`

      - `"Recipients"`

      - `"Sender"`

      - `"DLPProfiles"`

    - `value: array of string or string`

      - `array of string`

      - `string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `priority: number`

  - `rule_id: string`

  - `updated_at: string`

  - `description: optional string`

### Rule Get Response

- `RuleGetResponse object { action, conditions, created_at, 6 more }`

  - `action: object { action, message }`

    - `action: "Block"`

      - `"Block"`

    - `message: optional string`

  - `conditions: array of object { operator, selector, value }`

    Triggered if all conditions match.

    - `operator: "InList" or "NotInList" or "MatchRegex" or "NotMatchRegex"`

      - `"InList"`

      - `"NotInList"`

      - `"MatchRegex"`

      - `"NotMatchRegex"`

    - `selector: "Recipients" or "Sender" or "DLPProfiles"`

      - `"Recipients"`

      - `"Sender"`

      - `"DLPProfiles"`

    - `value: array of string or string`

      - `array of string`

      - `string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `priority: number`

  - `rule_id: string`

  - `updated_at: string`

  - `description: optional string`

### Rule Create Response

- `RuleCreateResponse object { action, conditions, created_at, 6 more }`

  - `action: object { action, message }`

    - `action: "Block"`

      - `"Block"`

    - `message: optional string`

  - `conditions: array of object { operator, selector, value }`

    Triggered if all conditions match.

    - `operator: "InList" or "NotInList" or "MatchRegex" or "NotMatchRegex"`

      - `"InList"`

      - `"NotInList"`

      - `"MatchRegex"`

      - `"NotMatchRegex"`

    - `selector: "Recipients" or "Sender" or "DLPProfiles"`

      - `"Recipients"`

      - `"Sender"`

      - `"DLPProfiles"`

    - `value: array of string or string`

      - `array of string`

      - `string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `priority: number`

  - `rule_id: string`

  - `updated_at: string`

  - `description: optional string`

### Rule Update Response

- `RuleUpdateResponse object { action, conditions, created_at, 6 more }`

  - `action: object { action, message }`

    - `action: "Block"`

      - `"Block"`

    - `message: optional string`

  - `conditions: array of object { operator, selector, value }`

    Triggered if all conditions match.

    - `operator: "InList" or "NotInList" or "MatchRegex" or "NotMatchRegex"`

      - `"InList"`

      - `"NotInList"`

      - `"MatchRegex"`

      - `"NotMatchRegex"`

    - `selector: "Recipients" or "Sender" or "DLPProfiles"`

      - `"Recipients"`

      - `"Sender"`

      - `"DLPProfiles"`

    - `value: array of string or string`

      - `array of string`

      - `string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `priority: number`

  - `rule_id: string`

  - `updated_at: string`

  - `description: optional string`

### Rule Delete Response

- `RuleDeleteResponse object { action, conditions, created_at, 6 more }`

  - `action: object { action, message }`

    - `action: "Block"`

      - `"Block"`

    - `message: optional string`

  - `conditions: array of object { operator, selector, value }`

    Triggered if all conditions match.

    - `operator: "InList" or "NotInList" or "MatchRegex" or "NotMatchRegex"`

      - `"InList"`

      - `"NotInList"`

      - `"MatchRegex"`

      - `"NotMatchRegex"`

    - `selector: "Recipients" or "Sender" or "DLPProfiles"`

      - `"Recipients"`

      - `"Sender"`

      - `"DLPProfiles"`

    - `value: array of string or string`

      - `array of string`

      - `string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `priority: number`

  - `rule_id: string`

  - `updated_at: string`

  - `description: optional string`

### Rule Bulk Edit Response

- `RuleBulkEditResponse object { action, conditions, created_at, 6 more }`

  - `action: object { action, message }`

    - `action: "Block"`

      - `"Block"`

    - `message: optional string`

  - `conditions: array of object { operator, selector, value }`

    Triggered if all conditions match.

    - `operator: "InList" or "NotInList" or "MatchRegex" or "NotMatchRegex"`

      - `"InList"`

      - `"NotInList"`

      - `"MatchRegex"`

      - `"NotMatchRegex"`

    - `selector: "Recipients" or "Sender" or "DLPProfiles"`

      - `"Recipients"`

      - `"Sender"`

      - `"DLPProfiles"`

    - `value: array of string or string`

      - `array of string`

      - `string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `priority: number`

  - `rule_id: string`

  - `updated_at: string`

  - `description: optional string`

# Profiles

## List all profiles

**get** `/accounts/{account_id}/dlp/profiles`

Lists all DLP profiles in an account.

### Path Parameters

- `account_id: string`

### Query Parameters

- `all: optional boolean`

  Return all profiles, including those that current account does not have access to.

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

- `result: optional array of Profile`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/profiles \
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
  ]
}
```

## Get DLP Profile

**get** `/accounts/{account_id}/dlp/profiles/{profile_id}`

Fetches a DLP profile by ID.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/profiles/$PROFILE_ID \
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

## Domain Types

### Context Awareness

- `ContextAwareness object { enabled, skip }`

  Scan the context of predefined entries to only return matches surrounded by keywords.

  - `enabled: boolean`

    If true, scan the context of predefined entries to only return matches surrounded by keywords.

  - `skip: SkipConfiguration`

    Content types to exclude from context analysis and return all matches.

    - `files: boolean`

      If the content type is a file, skip context analysis and return all matches.

### Profile

- `Profile = object { id, allowed_match_count, created_at, 13 more }  or object { id, allowed_match_count, entries, 7 more }  or object { id, created_at, entries, 5 more }`

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

### Skip Configuration

- `SkipConfiguration object { files }`

  Content types to exclude from context analysis and return all matches.

  - `files: boolean`

    If the content type is a file, skip context analysis and return all matches.

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

# Predefined

## Get predefined profile config

**get** `/accounts/{account_id}/dlp/profiles/predefined/{profile_id}/config`

This is similar to `get_predefined` but only returns entries that are enabled.
This is needed for our terraform API
Fetches a predefined DLP profile by id.

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

## Delete predefined profile

**delete** `/accounts/{account_id}/dlp/profiles/predefined/{profile_id}`

This is a no-op as predefined profiles can't be deleted but is needed for our generated terraform API.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/profiles/predefined/$PROFILE_ID \
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

### Predefined Profile

- `PredefinedProfile object { id, allowed_match_count, confidence_threshold, 6 more }`

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

### Predefined Delete Response

- `PredefinedDeleteResponse = unknown`

# Limits

## Fetch limits associated with DLP for account

**get** `/accounts/{account_id}/dlp/limits`

Retrieves current DLP usage limits and quotas for the account, including
maximum allowed counts and current usage for custom entries, dataset cells,
and document fingerprints.

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

- `result: optional object { max_custom_regex_entries, max_dataset_cells, max_document_fingerprints, 3 more }`

  - `max_custom_regex_entries: number`

    Maximum number of custom regex entries allowed for the account.

  - `max_dataset_cells: number`

    Maximum number of dataset cells allowed for the account, across all EDM and CWL datasets.

  - `max_document_fingerprints: number`

    Maximum number of document fingerprints allowed for the account.

  - `used_custom_regex_entries: number`

    Number of custom regex entries currently configured for the account.

  - `used_dataset_cells: number`

    Number of dataset cells currently configured for the account, across all EDM and CWL datasets. Document fingerprints do not count towards this limit.

  - `used_document_fingerprints: number`

    Number of document fingerprints currently configured for the account.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/limits \
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
    "max_custom_regex_entries": 0,
    "max_dataset_cells": 0,
    "max_document_fingerprints": 0,
    "used_custom_regex_entries": 0,
    "used_dataset_cells": 0,
    "used_document_fingerprints": 0
  }
}
```

## Domain Types

### Limit List Response

- `LimitListResponse object { max_custom_regex_entries, max_dataset_cells, max_document_fingerprints, 3 more }`

  - `max_custom_regex_entries: number`

    Maximum number of custom regex entries allowed for the account.

  - `max_dataset_cells: number`

    Maximum number of dataset cells allowed for the account, across all EDM and CWL datasets.

  - `max_document_fingerprints: number`

    Maximum number of document fingerprints allowed for the account.

  - `used_custom_regex_entries: number`

    Number of custom regex entries currently configured for the account.

  - `used_dataset_cells: number`

    Number of dataset cells currently configured for the account, across all EDM and CWL datasets. Document fingerprints do not count towards this limit.

  - `used_document_fingerprints: number`

    Number of document fingerprints currently configured for the account.

# Entries

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

## Create custom entry

**post** `/accounts/{account_id}/dlp/entries`

Creates a DLP custom entry.

### Path Parameters

- `account_id: string`

### Body Parameters

- `enabled: boolean`

- `name: string`

- `pattern: Pattern`

  - `regex: string`

  - `validation: optional "luhn"`

    - `"luhn"`

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

- `result: optional object { id, created_at, enabled, 5 more }`

  - `id: string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `pattern: Pattern`

    - `regex: string`

    - `validation: optional "luhn"`

      - `"luhn"`

  - `updated_at: string`

  - `description: optional string`

  - `profile_id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/entries \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true,
          "name": "name",
          "pattern": {
            "regex": "regex"
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "enabled": true,
    "name": "name",
    "pattern": {
      "regex": "regex",
      "validation": "luhn"
    },
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description",
    "profile_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  }
}
```

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

## Delete custom entry

**delete** `/accounts/{account_id}/dlp/entries/{entry_id}`

Deletes a DLP custom entry.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/entries/$ENTRY_ID \
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

### Entry List Response

- `EntryListResponse = object { id, created_at, enabled, 7 more }  or object { id, created_at, enabled, 5 more }  or object { id, confidence, enabled, 5 more }  or 4 more`

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

### Entry Get Response

- `EntryGetResponse = object { id, created_at, enabled, 8 more }  or object { id, created_at, enabled, 6 more }  or object { id, confidence, enabled, 6 more }  or 4 more`

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

### Entry Create Response

- `EntryCreateResponse object { id, created_at, enabled, 5 more }`

  - `id: string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `pattern: Pattern`

    - `regex: string`

    - `validation: optional "luhn"`

      - `"luhn"`

  - `updated_at: string`

  - `description: optional string`

  - `profile_id: optional string`

### Entry Update Response

- `EntryUpdateResponse = object { id, created_at, enabled, 6 more }  or object { id, created_at, enabled, 4 more }  or object { id, confidence, enabled, 4 more }  or 4 more`

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

### Entry Delete Response

- `EntryDeleteResponse = unknown`

# Custom

## Create custom entry

**post** `/accounts/{account_id}/dlp/entries`

Creates a DLP custom entry.

### Path Parameters

- `account_id: string`

### Body Parameters

- `enabled: boolean`

- `name: string`

- `pattern: Pattern`

  - `regex: string`

  - `validation: optional "luhn"`

    - `"luhn"`

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

- `result: optional object { id, created_at, enabled, 5 more }`

  - `id: string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `pattern: Pattern`

    - `regex: string`

    - `validation: optional "luhn"`

      - `"luhn"`

  - `updated_at: string`

  - `description: optional string`

  - `profile_id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/entries \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true,
          "name": "name",
          "pattern": {
            "regex": "regex"
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "enabled": true,
    "name": "name",
    "pattern": {
      "regex": "regex",
      "validation": "luhn"
    },
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description",
    "profile_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  }
}
```

## Update custom entry

**put** `/accounts/{account_id}/dlp/entries/custom/{entry_id}`

Updates a DLP custom entry.

### Path Parameters

- `account_id: string`

- `entry_id: string`

### Body Parameters

- `enabled: boolean`

- `name: string`

- `pattern: Pattern`

  - `regex: string`

  - `validation: optional "luhn"`

    - `"luhn"`

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

- `result: optional object { id, created_at, enabled, 5 more }`

  - `id: string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `pattern: Pattern`

    - `regex: string`

    - `validation: optional "luhn"`

      - `"luhn"`

  - `updated_at: string`

  - `description: optional string`

  - `profile_id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/entries/custom/$ENTRY_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true,
          "name": "name",
          "pattern": {
            "regex": "regex"
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "enabled": true,
    "name": "name",
    "pattern": {
      "regex": "regex",
      "validation": "luhn"
    },
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description",
    "profile_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  }
}
```

## Delete custom entry

**delete** `/accounts/{account_id}/dlp/entries/{entry_id}`

Deletes a DLP custom entry.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/entries/$ENTRY_ID \
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

### Custom Create Response

- `CustomCreateResponse object { id, created_at, enabled, 5 more }`

  - `id: string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `pattern: Pattern`

    - `regex: string`

    - `validation: optional "luhn"`

      - `"luhn"`

  - `updated_at: string`

  - `description: optional string`

  - `profile_id: optional string`

### Custom Update Response

- `CustomUpdateResponse object { id, created_at, enabled, 5 more }`

  - `id: string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `pattern: Pattern`

    - `regex: string`

    - `validation: optional "luhn"`

      - `"luhn"`

  - `updated_at: string`

  - `description: optional string`

  - `profile_id: optional string`

### Custom Delete Response

- `CustomDeleteResponse = unknown`

### Custom Get Response

- `CustomGetResponse = object { id, created_at, enabled, 8 more }  or object { id, created_at, enabled, 6 more }  or object { id, confidence, enabled, 6 more }  or 4 more`

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

### Custom List Response

- `CustomListResponse = object { id, created_at, enabled, 7 more }  or object { id, created_at, enabled, 5 more }  or object { id, confidence, enabled, 5 more }  or 4 more`

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

# Integration

## Create integration entry

**post** `/accounts/{account_id}/dlp/entries/integration`

Integration entries can't be created, this will update an existing integration entry.
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

- `result: optional object { id, created_at, enabled, 3 more }`

  - `id: string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `updated_at: string`

  - `profile_id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/entries/integration \
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
    "created_at": "2019-12-27T18:11:19.117Z",
    "enabled": true,
    "name": "name",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "profile_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  }
}
```

## Update integration entry

**put** `/accounts/{account_id}/dlp/entries/integration/{entry_id}`

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

- `result: optional object { id, created_at, enabled, 3 more }`

  - `id: string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `updated_at: string`

  - `profile_id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/entries/integration/$ENTRY_ID \
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
    "created_at": "2019-12-27T18:11:19.117Z",
    "enabled": true,
    "name": "name",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "profile_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  }
}
```

## Delete integration entry

**delete** `/accounts/{account_id}/dlp/entries/integration/{entry_id}`

This is a no-op as integration entires can't be deleted but is needed for our generated terraform API.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/entries/integration/$ENTRY_ID \
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

### Integration Create Response

- `IntegrationCreateResponse object { id, created_at, enabled, 3 more }`

  - `id: string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `updated_at: string`

  - `profile_id: optional string`

### Integration Update Response

- `IntegrationUpdateResponse object { id, created_at, enabled, 3 more }`

  - `id: string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `updated_at: string`

  - `profile_id: optional string`

### Integration Delete Response

- `IntegrationDeleteResponse = unknown`

### Integration Get Response

- `IntegrationGetResponse = object { id, created_at, enabled, 8 more }  or object { id, created_at, enabled, 6 more }  or object { id, confidence, enabled, 6 more }  or 4 more`

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

### Integration List Response

- `IntegrationListResponse = object { id, created_at, enabled, 7 more }  or object { id, created_at, enabled, 5 more }  or object { id, confidence, enabled, 5 more }  or 4 more`

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

# Data Tag Categories

## Retrieve all data tag categories in an account

**get** `/accounts/{account_id}/dlp/data_tag_categories`

Retrieve all data tag categories in an account

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

- `result: optional array of object { id, created_at, name, 4 more }`

  - `id: string`

  - `created_at: string`

  - `name: string`

  - `tags: array of object { id, created_at, name, 2 more }`

    - `id: string`

    - `created_at: string`

    - `name: string`

    - `updated_at: string`

    - `description: optional string`

  - `updated_at: string`

  - `description: optional string`

  - `template_id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/data_tag_categories \
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
      "tags": [
        {
          "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "created_at": "2019-12-27T18:11:19.117Z",
          "name": "name",
          "updated_at": "2019-12-27T18:11:19.117Z",
          "description": "description"
        }
      ],
      "updated_at": "2019-12-27T18:11:19.117Z",
      "description": "description",
      "template_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    }
  ]
}
```

## Retrieve a specific data tag category.

**get** `/accounts/{account_id}/dlp/data_tag_categories/{category_id}`

Retrieve a specific data tag category.

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

- `result: optional object { id, created_at, name, 4 more }`

  - `id: string`

  - `created_at: string`

  - `name: string`

  - `tags: array of object { id, created_at, name, 2 more }`

    - `id: string`

    - `created_at: string`

    - `name: string`

    - `updated_at: string`

    - `description: optional string`

  - `updated_at: string`

  - `description: optional string`

  - `template_id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/data_tag_categories/$CATEGORY_ID \
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
    "tags": [
      {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_at": "2019-12-27T18:11:19.117Z",
        "name": "name",
        "updated_at": "2019-12-27T18:11:19.117Z",
        "description": "description"
      }
    ],
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description",
    "template_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  }
}
```

## Creates a new data tag category.

**post** `/accounts/{account_id}/dlp/data_tag_categories`

Creates a new data tag category.

### Path Parameters

- `account_id: string`

### Body Parameters

- `name: string`

- `description: optional string`

- `tags: optional array of object { name, description }`

  Tags to create with the category. Mutually exclusive with `template_id`.

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

- `result: optional object { id, created_at, name, 4 more }`

  - `id: string`

  - `created_at: string`

  - `name: string`

  - `tags: array of object { id, created_at, name, 2 more }`

    - `id: string`

    - `created_at: string`

    - `name: string`

    - `updated_at: string`

    - `description: optional string`

  - `updated_at: string`

  - `description: optional string`

  - `template_id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/data_tag_categories \
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
    "tags": [
      {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_at": "2019-12-27T18:11:19.117Z",
        "name": "name",
        "updated_at": "2019-12-27T18:11:19.117Z",
        "description": "description"
      }
    ],
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description",
    "template_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  }
}
```

## Update the attributes of a single data tag category.

**put** `/accounts/{account_id}/dlp/data_tag_categories/{category_id}`

Update the attributes of a single data tag category.

### Path Parameters

- `account_id: string`

- `category_id: string`

### Body Parameters

- `description: optional string`

- `name: optional string`

- `tags: optional array of object { id, description, name }`

  The desired final state of tags.

  - `None` (omitted): no tag changes.
  - `Some([])`: delete all tags.
  - `Some([...])`: desired final set + order.

  - `id: optional string`

    If `None` (omitted), a new tag will be created. Otherwise, an existing tag will be
    updated.

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

- `result: optional object { id, created_at, name, 4 more }`

  - `id: string`

  - `created_at: string`

  - `name: string`

  - `tags: array of object { id, created_at, name, 2 more }`

    - `id: string`

    - `created_at: string`

    - `name: string`

    - `updated_at: string`

    - `description: optional string`

  - `updated_at: string`

  - `description: optional string`

  - `template_id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/data_tag_categories/$CATEGORY_ID \
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
    "tags": [
      {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_at": "2019-12-27T18:11:19.117Z",
        "name": "name",
        "updated_at": "2019-12-27T18:11:19.117Z",
        "description": "description"
      }
    ],
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description",
    "template_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  }
}
```

## Delete a single data tag category.

**delete** `/accounts/{account_id}/dlp/data_tag_categories/{category_id}`

Delete a single data tag category.

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

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/data_tag_categories/$CATEGORY_ID \
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

### Data Tag Category List Response

- `DataTagCategoryListResponse object { id, created_at, name, 4 more }`

  - `id: string`

  - `created_at: string`

  - `name: string`

  - `tags: array of object { id, created_at, name, 2 more }`

    - `id: string`

    - `created_at: string`

    - `name: string`

    - `updated_at: string`

    - `description: optional string`

  - `updated_at: string`

  - `description: optional string`

  - `template_id: optional string`

### Data Tag Category Get Response

- `DataTagCategoryGetResponse object { id, created_at, name, 4 more }`

  - `id: string`

  - `created_at: string`

  - `name: string`

  - `tags: array of object { id, created_at, name, 2 more }`

    - `id: string`

    - `created_at: string`

    - `name: string`

    - `updated_at: string`

    - `description: optional string`

  - `updated_at: string`

  - `description: optional string`

  - `template_id: optional string`

### Data Tag Category Create Response

- `DataTagCategoryCreateResponse object { id, created_at, name, 4 more }`

  - `id: string`

  - `created_at: string`

  - `name: string`

  - `tags: array of object { id, created_at, name, 2 more }`

    - `id: string`

    - `created_at: string`

    - `name: string`

    - `updated_at: string`

    - `description: optional string`

  - `updated_at: string`

  - `description: optional string`

  - `template_id: optional string`

### Data Tag Category Update Response

- `DataTagCategoryUpdateResponse object { id, created_at, name, 4 more }`

  - `id: string`

  - `created_at: string`

  - `name: string`

  - `tags: array of object { id, created_at, name, 2 more }`

    - `id: string`

    - `created_at: string`

    - `name: string`

    - `updated_at: string`

    - `description: optional string`

  - `updated_at: string`

  - `description: optional string`

  - `template_id: optional string`

### Data Tag Category Delete Response

- `DataTagCategoryDeleteResponse = unknown`

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

# Data Classes

## Retrieve all data classes in an account

**get** `/accounts/{account_id}/dlp/data_classes`

Retrieve all data classes in an account

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

- `result: optional array of object { id, created_at, data_tags, 5 more }`

  - `id: string`

  - `created_at: string`

  - `data_tags: array of string`

  - `expression: string`

  - `name: string`

  - `sensitivity_levels: array of object { group_id, level_id }`

    - `group_id: string`

    - `level_id: string`

  - `updated_at: string`

  - `description: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/data_classes \
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
      "data_tags": [
        "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      ],
      "expression": "expression",
      "name": "name",
      "sensitivity_levels": [
        {
          "group_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "level_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
        }
      ],
      "updated_at": "2019-12-27T18:11:19.117Z",
      "description": "description"
    }
  ]
}
```

## Retrieve a specific data class

**get** `/accounts/{account_id}/dlp/data_classes/{data_class_id}`

Retrieve a specific data class

### Path Parameters

- `account_id: string`

- `data_class_id: string`

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

- `result: optional object { id, created_at, data_tags, 5 more }`

  - `id: string`

  - `created_at: string`

  - `data_tags: array of string`

  - `expression: string`

  - `name: string`

  - `sensitivity_levels: array of object { group_id, level_id }`

    - `group_id: string`

    - `level_id: string`

  - `updated_at: string`

  - `description: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/data_classes/$DATA_CLASS_ID \
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
    "data_tags": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "expression": "expression",
    "name": "name",
    "sensitivity_levels": [
      {
        "group_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "level_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    ],
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description"
  }
}
```

## Creates a new data class

**post** `/accounts/{account_id}/dlp/data_classes`

Creates a new data class

### Path Parameters

- `account_id: string`

### Body Parameters

- `data_tags: array of string`

- `expression: string`

- `name: string`

- `sensitivity_levels: array of object { group_id, level_id }`

  - `group_id: string`

  - `level_id: string`

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

- `result: optional object { id, created_at, data_tags, 5 more }`

  - `id: string`

  - `created_at: string`

  - `data_tags: array of string`

  - `expression: string`

  - `name: string`

  - `sensitivity_levels: array of object { group_id, level_id }`

    - `group_id: string`

    - `level_id: string`

  - `updated_at: string`

  - `description: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/data_classes \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "data_tags": [
            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          ],
          "expression": "expression",
          "name": "name",
          "sensitivity_levels": [
            {
              "group_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
              "level_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
            }
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "data_tags": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "expression": "expression",
    "name": "name",
    "sensitivity_levels": [
      {
        "group_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "level_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    ],
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description"
  }
}
```

## Update the attributes of a single data class

**put** `/accounts/{account_id}/dlp/data_classes/{data_class_id}`

Update the attributes of a single data class

### Path Parameters

- `account_id: string`

- `data_class_id: string`

### Body Parameters

- `data_tags: optional array of string`

- `description: optional string`

- `expression: optional string`

- `name: optional string`

- `sensitivity_levels: optional array of object { group_id, level_id }`

  - `group_id: string`

  - `level_id: string`

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

- `result: optional object { id, created_at, data_tags, 5 more }`

  - `id: string`

  - `created_at: string`

  - `data_tags: array of string`

  - `expression: string`

  - `name: string`

  - `sensitivity_levels: array of object { group_id, level_id }`

    - `group_id: string`

    - `level_id: string`

  - `updated_at: string`

  - `description: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/data_classes/$DATA_CLASS_ID \
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
    "data_tags": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "expression": "expression",
    "name": "name",
    "sensitivity_levels": [
      {
        "group_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "level_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    ],
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description"
  }
}
```

## Delete a single data class

**delete** `/accounts/{account_id}/dlp/data_classes/{data_class_id}`

Delete a single data class

### Path Parameters

- `account_id: string`

- `data_class_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/data_classes/$DATA_CLASS_ID \
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

### Data Class List Response

- `DataClassListResponse object { id, created_at, data_tags, 5 more }`

  - `id: string`

  - `created_at: string`

  - `data_tags: array of string`

  - `expression: string`

  - `name: string`

  - `sensitivity_levels: array of object { group_id, level_id }`

    - `group_id: string`

    - `level_id: string`

  - `updated_at: string`

  - `description: optional string`

### Data Class Get Response

- `DataClassGetResponse object { id, created_at, data_tags, 5 more }`

  - `id: string`

  - `created_at: string`

  - `data_tags: array of string`

  - `expression: string`

  - `name: string`

  - `sensitivity_levels: array of object { group_id, level_id }`

    - `group_id: string`

    - `level_id: string`

  - `updated_at: string`

  - `description: optional string`

### Data Class Create Response

- `DataClassCreateResponse object { id, created_at, data_tags, 5 more }`

  - `id: string`

  - `created_at: string`

  - `data_tags: array of string`

  - `expression: string`

  - `name: string`

  - `sensitivity_levels: array of object { group_id, level_id }`

    - `group_id: string`

    - `level_id: string`

  - `updated_at: string`

  - `description: optional string`

### Data Class Update Response

- `DataClassUpdateResponse object { id, created_at, data_tags, 5 more }`

  - `id: string`

  - `created_at: string`

  - `data_tags: array of string`

  - `expression: string`

  - `name: string`

  - `sensitivity_levels: array of object { group_id, level_id }`

    - `group_id: string`

    - `level_id: string`

  - `updated_at: string`

  - `description: optional string`

### Data Class Delete Response

- `DataClassDeleteResponse = unknown`
