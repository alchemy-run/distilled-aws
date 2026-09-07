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
