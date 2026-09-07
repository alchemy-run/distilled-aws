# Available

## List available account or zone datasets

**get** `/{accounts_or_zones}/{account_or_zone_id}/logs/explorer/datasets/available`

Returns all dataset types that this account or zone can create. Each entry
includes the dataset schema and timestamp field.

The schema shows all possible fields for a dataset. However, not all
fields may be available for your account or zone. When creating or updating a
dataset, only fields available to your account or zone can be enabled. If you
request a field that is not available, you will receive an error.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Returns

- `AvailableList object { errors, messages, success, result }`

  - `errors: array of ResponseInfo`

    - `code: number`

    - `message: string`

    - `documentation_url: optional string`

    - `source: optional object { pointer }`

      - `pointer: optional string`

  - `messages: array of string`

  - `success: boolean`

  - `result: optional array of AvailableDataset`

    - `dataset: string`

      Dataset type name (e.g. `http_requests`).

    - `object_type: "account" or "zone"`

      Whether this dataset type is account-scoped or zone-scoped.

      - `"account"`

      - `"zone"`

    - `schema: object { properties, required, type }`

      JSON Schema that describes the fields this dataset exposes.

      - `properties: optional map[unknown]`

      - `required: optional array of string`

      - `type: optional "object"`

        - `"object"`

    - `timestamp_field: string`

      The primary timestamp field name for this dataset.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/logs/explorer/datasets/available \
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
      "dataset": "dataset",
      "object_type": "account",
      "schema": {
        "properties": {
          "foo": "bar"
        },
        "required": [
          "string"
        ],
        "type": "object"
      },
      "timestamp_field": "timestamp_field"
    }
  ]
}
```

## Domain Types

### Available Dataset

- `AvailableDataset object { dataset, object_type, schema, timestamp_field }`

  A dataset type that the account or zone can create.

  - `dataset: string`

    Dataset type name (e.g. `http_requests`).

  - `object_type: "account" or "zone"`

    Whether this dataset type is account-scoped or zone-scoped.

    - `"account"`

    - `"zone"`

  - `schema: object { properties, required, type }`

    JSON Schema that describes the fields this dataset exposes.

    - `properties: optional map[unknown]`

    - `required: optional array of string`

    - `type: optional "object"`

      - `"object"`

  - `timestamp_field: string`

    The primary timestamp field name for this dataset.

### Available List

- `AvailableList object { errors, messages, success, result }`

  - `errors: array of ResponseInfo`

    - `code: number`

    - `message: string`

    - `documentation_url: optional string`

    - `source: optional object { pointer }`

      - `pointer: optional string`

  - `messages: array of string`

  - `success: boolean`

  - `result: optional array of AvailableDataset`

    - `dataset: string`

      Dataset type name (e.g. `http_requests`).

    - `object_type: "account" or "zone"`

      Whether this dataset type is account-scoped or zone-scoped.

      - `"account"`

      - `"zone"`

    - `schema: object { properties, required, type }`

      JSON Schema that describes the fields this dataset exposes.

      - `properties: optional map[unknown]`

      - `required: optional array of string`

      - `type: optional "object"`

        - `"object"`

    - `timestamp_field: string`

      The primary timestamp field name for this dataset.
