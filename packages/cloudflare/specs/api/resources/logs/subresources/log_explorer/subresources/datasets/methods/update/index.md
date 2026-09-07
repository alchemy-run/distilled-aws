## Update an account or zone dataset

**put** `/{accounts_or_zones}/{account_or_zone_id}/logs/explorer/datasets/{dataset_id}`

Updates the enabled state and/or field configuration of an account or zone dataset.

### Path Parameters

- `dataset_id: string`

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `enabled: boolean`

  Whether to enable or disable log ingest for this dataset.

- `fields: optional array of object { enabled, name }`

  Controls which fields the API ingests after the update. Defaults
  to all available fields when absent.

  - `enabled: boolean`

    Whether the API includes this field in log ingest.

  - `name: string`

    Field name in lowercase.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `success: boolean`

- `result: optional Dataset`

  A Log Explorer dataset summary. List endpoints return this type and omit
  field configuration; use the single-dataset endpoint to retrieve it.

  - `created_at: string`

    RFC3339 timestamp recording when the API created this dataset.

  - `dataset: string`

    Dataset type name (e.g. `http_requests`).

  - `dataset_id: string`

    Unique dataset ID.

  - `enabled: boolean`

    Whether log ingest is currently active for this dataset.

  - `object_id: string`

    Public ID of the account or zone that owns this dataset.

  - `object_type: "account" or "zone"`

    Whether this dataset belongs to an account or a zone.

    - `"account"`

    - `"zone"`

  - `updated_at: string`

    RFC3339 timestamp recording when the API last updated this dataset.

  - `fields: optional array of object { enabled, name }`

    The field configuration for this dataset.

    - `enabled: boolean`

      Whether the API includes this field in log ingest.

    - `name: string`

      Field name in lowercase.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/logs/explorer/datasets/$DATASET_ID \
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
    "string"
  ],
  "success": true,
  "result": {
    "created_at": "2019-12-27T18:11:19.117Z",
    "dataset": "dataset",
    "dataset_id": "dataset_id",
    "enabled": true,
    "object_id": "object_id",
    "object_type": "account",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "fields": [
      {
        "enabled": true,
        "name": "name"
      }
    ]
  }
}
```
