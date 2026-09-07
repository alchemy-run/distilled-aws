# Log Explorer

# Query

## Run a log query

**post** `/{accounts_or_zones}/{account_or_zone_id}/logs/explorer/query/sql`

Run a SQL query against account or zone-level datasets.

Timestamp fields are RFC3339 strings. Filter with:
WHERE {timestamp_field} >= now() - INTERVAL '30' DAY
WHERE {timestamp_field} >= '2026-04-01T00:00:00Z'
WHERE {timestamp_field} BETWEEN '2026-04-01T00:00:00Z' AND '2026-04-30T23:59:59Z'

Check /account or zones/{account or zone_id}/logs/explorer/datasets to see enabled account or zone level datasets.
Zone-level datasets will not appear here.
Check /account or zones/{account or zone_id}/logs/explorer/datasets/available for the schemas, and the name of the timestamp fields.

For zone-level datasets use the zone-scoped endpoint: POST /zones/{zone_id}/logs/explorer/query/sql

For more information about the datasets, and the meaning of each field, check out https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `success: boolean`

- `result: optional array of map[unknown]`

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/logs/explorer/query/sql \
    -H 'Content-Type: text/plain' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F 'body=@/path/to/body'
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
      "foo": "bar"
    }
  ]
}
```

## Domain Types

### Query Sql Response

- `QuerySqlResponse = map[unknown]`

# Datasets

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

## Get an account or zone dataset

**get** `/{accounts_or_zones}/{account_or_zone_id}/logs/explorer/datasets/{dataset_id}`

Retrieve a single Log Explorer dataset by ID for the account or zone.

### Path Parameters

- `dataset_id: string`

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

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

## Domain Types

### Create Request

- `CreateRequest object { dataset, fields }`

  - `dataset: string`

    Dataset type name to create (e.g. `http_requests`).

  - `fields: optional array of object { enabled, name }`

    Controls which fields the API ingests. Defaults to all available
    fields when absent.

    - `enabled: boolean`

      Whether the API includes this field in log ingest.

    - `name: string`

      Field name in lowercase.

### Dataset

- `Dataset object { created_at, dataset, dataset_id, 5 more }`

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

### Dataset Summary

- `DatasetSummary object { created_at, dataset, dataset_id, 4 more }`

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

### Update Request

- `UpdateRequest object { enabled, fields }`

  - `enabled: boolean`

    Whether to enable or disable log ingest for this dataset.

  - `fields: optional array of object { enabled, name }`

    Controls which fields the API ingests after the update. Defaults
    to all available fields when absent.

    - `enabled: boolean`

      Whether the API includes this field in log ingest.

    - `name: string`

      Field name in lowercase.

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
