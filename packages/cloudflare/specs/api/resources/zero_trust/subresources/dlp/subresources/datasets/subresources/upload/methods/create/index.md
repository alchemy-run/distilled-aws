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
