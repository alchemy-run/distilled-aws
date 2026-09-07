# Logs

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

# Control

# Retention

## Get log retention flag

**get** `/zones/{zone_id}/logs/control/retention/flag`

Gets log retention flag for Logpull API.

### Path Parameters

- `zone_id: string`

  Identifier.

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

- `result: optional object { flag }`

  - `flag: optional boolean`

    The log retention flag for Logpull API.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logs/control/retention/flag \
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
    "flag": true
  }
}
```

## Update log retention flag

**post** `/zones/{zone_id}/logs/control/retention/flag`

Updates log retention flag for Logpull API.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `flag: optional boolean`

  The log retention flag for Logpull API.

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

- `result: optional object { flag }`

  - `flag: optional boolean`

    The log retention flag for Logpull API.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logs/control/retention/flag \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "flag": true
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
    "flag": true
  }
}
```

## Domain Types

### Retention Get Response

- `RetentionGetResponse object { flag }`

  - `flag: optional boolean`

    The log retention flag for Logpull API.

### Retention Create Response

- `RetentionCreateResponse object { flag }`

  - `flag: optional boolean`

    The log retention flag for Logpull API.

# Cmb

# Config

## Get CMB config

**get** `/accounts/{account_id}/logs/control/cmb/config`

Gets CMB config.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: optional CmbConfig`

  - `allow_out_of_region_access: optional boolean`

    Allow out of region access

  - `regions: optional string`

    Name of the region.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/logs/control/cmb/config \
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
    "allow_out_of_region_access": false,
    "regions": "eu"
  }
}
```

## Update CMB config

**post** `/accounts/{account_id}/logs/control/cmb/config`

Updates CMB config.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `allow_out_of_region_access: optional boolean`

  Allow out of region access

- `regions: optional string`

  Name of the region.

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

- `result: optional CmbConfig`

  - `allow_out_of_region_access: optional boolean`

    Allow out of region access

  - `regions: optional string`

    Name of the region.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/logs/control/cmb/config \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "regions": "eu"
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
    "allow_out_of_region_access": false,
    "regions": "eu"
  }
}
```

## Delete CMB config

**delete** `/accounts/{account_id}/logs/control/cmb/config`

Deletes CMB config.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/logs/control/cmb/config \
    -X DELETE \
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
  "result": {}
}
```

## Domain Types

### Cmb Config

- `CmbConfig object { allow_out_of_region_access, regions }`

  - `allow_out_of_region_access: optional boolean`

    Allow out of region access

  - `regions: optional string`

    Name of the region.

### Config Delete Response

- `ConfigDeleteResponse = unknown`

# RayID

## Get logs RayIDs

**get** `/zones/{zone_id}/logs/rayids/{ray_id}`

The `/rayids` api route allows lookups by specific rayid. The rayids route will return zero, one, or more records (ray ids are not unique).

### Path Parameters

- `zone_id: string`

  Identifier.

- `ray_id: string`

  Ray identifier.

### Query Parameters

- `fields: optional string`

  The `/received` route by default returns a limited set of fields, and allows customers to override the default field set by specifying individual fields. The reasons for this are: 1. Most customers require only a small subset of fields, but that subset varies from customer to customer; 2. Flat schema is much easier to work with downstream (importing into BigTable etc); 3. Performance (time to process, file size). If `?fields=` is not specified, default field set is returned. This default field set may change at any time. When `?fields=` is provided, each record is returned with the specified fields. `fields` must be specified as a comma separated list without any whitespaces, and all fields must exist. The order in which fields are specified does not matter, and the order of fields in the response is not specified.

- `timestamps: optional "unix" or "unixnano" or "rfc3339"`

  By default, timestamps in responses are returned as Unix nanosecond integers. The `?timestamps=` argument can be set to change the format in which response timestamps are returned. Possible values are: `unix`, `unixnano`, `rfc3339`. Note that `unix` and `unixnano` return timestamps as integers; `rfc3339` returns timestamps as strings.

  - `"unix"`

  - `"unixnano"`

  - `"rfc3339"`

### Returns

- `string`

- `unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logs/rayids/$RAYID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
"{\"ClientIP\":\"192.0.2.1\",\"RayID\":\"41ddf1740f67442d\",\"EdgeStartTimestamp\":1526810289280000000}\n{\"ClientIP\":\"192.0.2.1\",\"RayID\":\"41ddf1740f67442d\",\"EdgeStartTimestamp\":1526810289280000000}\n{\"ClientIP\":\"192.0.2.1\",\"RayID\":\"41ddf1740f67442d\",\"EdgeStartTimestamp\":1526810289280000000}"
```

## Domain Types

### RayID Get Response

- `RayIDGetResponse = string or unknown`

  - `string`

  - `unknown`

# Received

## Get logs received

**get** `/zones/{zone_id}/logs/received`

The `/received` api route allows customers to retrieve their edge HTTP logs. The basic access pattern is "give me all the logs for zone Z for minute M", where the minute M refers to the time records were received at Cloudflare's central data center. `start` is inclusive, and `end` is exclusive. Because of that, to get all data, at minutely cadence, starting at 10AM, the proper values are: `start=2018-05-20T10:00:00Z&end=2018-05-20T10:01:00Z`, then `start=2018-05-20T10:01:00Z&end=2018-05-20T10:02:00Z` and so on; the overlap will be handled properly.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `end: string or number`

  Sets the (exclusive) end of the requested time frame. This can be a unix timestamp (in seconds or nanoseconds), or an absolute timestamp that conforms to RFC 3339. `end` must be at least five minutes earlier than now and must be later than `start`. Difference between `start` and `end` must be not greater than one hour.

  - `string`

  - `number`

- `count: optional number`

  When `?count=` is provided, the response will contain up to `count` results. Since results are not sorted, you are likely to get different data for repeated requests. `count` must be an integer > 0.

- `fields: optional string`

  The `/received` route by default returns a limited set of fields, and allows customers to override the default field set by specifying individual fields. The reasons for this are: 1. Most customers require only a small subset of fields, but that subset varies from customer to customer; 2. Flat schema is much easier to work with downstream (importing into BigTable etc); 3. Performance (time to process, file size). If `?fields=` is not specified, default field set is returned. This default field set may change at any time. When `?fields=` is provided, each record is returned with the specified fields. `fields` must be specified as a comma separated list without any whitespaces, and all fields must exist. The order in which fields are specified does not matter, and the order of fields in the response is not specified.

- `sample: optional number`

  When `?sample=` is provided, a sample of matching records is returned. If `sample=0.1` then 10% of records will be returned. Sampling is random: repeated calls will not only return different records, but likely will also vary slightly in number of returned records. When `?count=` is also specified, `count` is applied to the number of returned records, not the sampled records. So, with `sample=0.05` and `count=7`, when there is a total of 100 records available, approximately five will be returned. When there are 1000 records, seven will be returned. When there are 10,000 records, seven will be returned.

- `start: optional string or number`

  Sets the (inclusive) beginning of the requested time frame. This can be a unix timestamp (in seconds or nanoseconds), or an absolute timestamp that conforms to RFC 3339. At this point in time, it cannot exceed a time in the past greater than seven days.

  - `string`

  - `number`

- `timestamps: optional "unix" or "unixnano" or "rfc3339"`

  By default, timestamps in responses are returned as Unix nanosecond integers. The `?timestamps=` argument can be set to change the format in which response timestamps are returned. Possible values are: `unix`, `unixnano`, `rfc3339`. Note that `unix` and `unixnano` return timestamps as integers; `rfc3339` returns timestamps as strings.

  - `"unix"`

  - `"unixnano"`

  - `"rfc3339"`

### Returns

- `string`

- `unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logs/received \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
"{\"ClientIP\":\"192.0.2.1\",\"RayID\":\"41ddf1740f67442d\",\"EdgeStartTimestamp\":1526810289280000000}\n{\"ClientIP\":\"192.0.2.1\",\"RayID\":\"41ddf1740f67442d\",\"EdgeStartTimestamp\":1526810289280000000}\n{\"ClientIP\":\"192.0.2.1\",\"RayID\":\"41ddf1740f67442d\",\"EdgeStartTimestamp\":1526810289280000000}"
```

## Domain Types

### Received Get Response

- `ReceivedGetResponse = string or unknown`

  - `string`

  - `unknown`

# Fields

## List fields

**get** `/zones/{zone_id}/logs/received/fields`

Lists all fields available. The response is json object with key-value pairs, where keys are field names, and values are descriptions.

### Path Parameters

- `zone_id: string`

  Identifier.

### Returns

- `key: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logs/received/fields \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "key": "value"
}
```

## Domain Types

### Field Get Response

- `FieldGetResponse object { key }`

  - `key: optional string`
