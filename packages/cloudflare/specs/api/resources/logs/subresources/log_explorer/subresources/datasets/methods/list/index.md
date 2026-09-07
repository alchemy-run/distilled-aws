## List account or zone datasets

**get** `/{accounts_or_zones}/{account_or_zone_id}/logs/explorer/datasets`

Returns all Log Explorer datasets configured for the account or zone.

Pass `include_zones=true` to also include zone-level datasets that
belong to this account or zone. List responses omit the `fields` property;
use the single-dataset endpoint to retrieve field configuration.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Query Parameters

- `include_zones: optional boolean`

  Set to true to include zone-scoped datasets belonging to this account.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `success: boolean`

- `result: optional array of DatasetSummary`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/logs/explorer/datasets \
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
    "string"
  ],
  "success": true,
  "result": [
    {
      "created_at": "2019-12-27T18:11:19.117Z",
      "dataset": "dataset",
      "dataset_id": "dataset_id",
      "enabled": true,
      "object_id": "object_id",
      "object_type": "account",
      "updated_at": "2019-12-27T18:11:19.117Z"
    }
  ]
}
```
