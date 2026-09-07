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
