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
