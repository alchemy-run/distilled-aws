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
