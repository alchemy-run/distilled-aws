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
