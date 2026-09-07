## Create an account or zone dataset

**post** `/{accounts_or_zones}/{account_or_zone_id}/logs/explorer/datasets`

Create a new Log Explorer dataset for the account or zone.

Use the `/account or zones/{account or zone_id}/logs/explorer/datasets/available` endpoint
to list dataset types you can create along with their available fields.

The `fields` property is optional. If not specified, all available fields
will be enabled.

For zone-level datasets use the zone-scoped endpoint: POST /zones/{zone_id}/logs/explorer/datasets

For dataset field definitions, see: https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `dataset: string`

  Dataset type name to create (e.g. `http_requests`).

- `fields: optional array of object { enabled, name }`

  Controls which fields the API ingests. Defaults to all available
  fields when absent.

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
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/logs/explorer/datasets \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "dataset": "dataset"
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
