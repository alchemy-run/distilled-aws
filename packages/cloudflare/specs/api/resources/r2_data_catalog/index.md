# R2 Data Catalog

## List R2 catalogs

**get** `/accounts/{account_id}/r2-catalog`

Returns a list of R2 buckets that have been enabled as Apache Iceberg catalogs
for the specified account. Each catalog represents an R2 bucket configured
to store Iceberg metadata and data files.

### Path Parameters

- `account_id: string`

  Use this to identify the account.

### Returns

- `errors: array of object { code, message }`

  Contains errors if the API call was unsuccessful.

  - `code: number`

    Specifies the error code.

  - `message: string`

    Describes the error.

- `messages: array of object { code, message }`

  Contains informational messages.

  - `code: number`

    Specifies the message code.

  - `message: string`

    Contains the message text.

- `success: boolean`

  Indicates whether the API call was successful.

- `result: optional object { warehouses }`

  Contains the list of catalogs.

  - `warehouses: array of object { id, bucket, name, 3 more }`

    Lists catalogs in the account.

    - `id: string`

      Use this to uniquely identify the catalog.

    - `bucket: string`

      Specifies the associated R2 bucket name.

    - `name: string`

      Specifies the catalog name (generated from account and bucket name).

    - `status: "active" or "inactive"`

      Indicates the status of the catalog.

      - `"active"`

      - `"inactive"`

    - `credential_status: optional "present" or "absent"`

      Shows the credential configuration status.

      - `"present"`

      - `"absent"`

    - `maintenance_config: optional object { compaction, snapshot_expiration }`

      Configures maintenance for the catalog.

      - `compaction: optional object { state, target_size_mb }`

        Configures compaction for catalog maintenance.

        - `state: "enabled" or "disabled"`

          Specifies the state of maintenance operations.

          - `"enabled"`

          - `"disabled"`

        - `target_size_mb: "64" or "128" or "256" or "512"`

          Sets the target file size for compaction in megabytes. Defaults to "128".

          - `"64"`

          - `"128"`

          - `"256"`

          - `"512"`

      - `snapshot_expiration: optional object { max_snapshot_age, min_snapshots_to_keep, state }`

        Configures snapshot expiration settings.

        - `max_snapshot_age: string`

          Specifies the maximum age for snapshots. The system deletes snapshots older than this age.
          Format: <number><unit> where unit is d (days), h (hours), m (minutes), or s (seconds).
          Examples: "7d" (7 days), "48h" (48 hours), "2880m" (2,880 minutes).
          Defaults to "7d".

        - `min_snapshots_to_keep: number`

          Specifies the minimum number of snapshots to retain. Defaults to 100.

        - `state: "enabled" or "disabled"`

          Specifies the state of maintenance operations.

          - `"enabled"`

          - `"disabled"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2-catalog \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "warehouses": [
      {
        "bucket": "analytics-bucket",
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "maintenance_config": {
          "compaction": {
            "state": "enabled",
            "target_size_mb": "128"
          },
          "snapshot_expiration": {
            "max_snapshot_age": "7d",
            "min_snapshots_to_keep": 100,
            "state": "enabled"
          }
        },
        "name": "account123_analytics-bucket",
        "status": "active"
      },
      {
        "bucket": "logs-bucket",
        "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        "maintenance_config": {
          "compaction": {
            "state": "disabled",
            "target_size_mb": "128"
          },
          "snapshot_expiration": {
            "max_snapshot_age": "7d",
            "min_snapshots_to_keep": 100,
            "state": "disabled"
          }
        },
        "name": "account123_logs-bucket",
        "status": "inactive"
      }
    ]
  },
  "success": true
}
```

## Get R2 catalog details

**get** `/accounts/{account_id}/r2-catalog/{bucket_name}`

Retrieve detailed information about a specific R2 catalog by bucket name.
Returns catalog status, maintenance configuration, and credential status.

### Path Parameters

- `account_id: string`

  Use this to identify the account.

- `bucket_name: string`

  Specifies the R2 bucket name.

### Returns

- `errors: array of object { code, message }`

  Contains errors if the API call was unsuccessful.

  - `code: number`

    Specifies the error code.

  - `message: string`

    Describes the error.

- `messages: array of object { code, message }`

  Contains informational messages.

  - `code: number`

    Specifies the message code.

  - `message: string`

    Contains the message text.

- `success: boolean`

  Indicates whether the API call was successful.

- `result: optional object { id, bucket, name, 3 more }`

  Contains R2 Data Catalog information.

  - `id: string`

    Use this to uniquely identify the catalog.

  - `bucket: string`

    Specifies the associated R2 bucket name.

  - `name: string`

    Specifies the catalog name (generated from account and bucket name).

  - `status: "active" or "inactive"`

    Indicates the status of the catalog.

    - `"active"`

    - `"inactive"`

  - `credential_status: optional "present" or "absent"`

    Shows the credential configuration status.

    - `"present"`

    - `"absent"`

  - `maintenance_config: optional object { compaction, snapshot_expiration }`

    Configures maintenance for the catalog.

    - `compaction: optional object { state, target_size_mb }`

      Configures compaction for catalog maintenance.

      - `state: "enabled" or "disabled"`

        Specifies the state of maintenance operations.

        - `"enabled"`

        - `"disabled"`

      - `target_size_mb: "64" or "128" or "256" or "512"`

        Sets the target file size for compaction in megabytes. Defaults to "128".

        - `"64"`

        - `"128"`

        - `"256"`

        - `"512"`

    - `snapshot_expiration: optional object { max_snapshot_age, min_snapshots_to_keep, state }`

      Configures snapshot expiration settings.

      - `max_snapshot_age: string`

        Specifies the maximum age for snapshots. The system deletes snapshots older than this age.
        Format: <number><unit> where unit is d (days), h (hours), m (minutes), or s (seconds).
        Examples: "7d" (7 days), "48h" (48 hours), "2880m" (2,880 minutes).
        Defaults to "7d".

      - `min_snapshots_to_keep: number`

        Specifies the minimum number of snapshots to retain. Defaults to 100.

      - `state: "enabled" or "disabled"`

        Specifies the state of maintenance operations.

        - `"enabled"`

        - `"disabled"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2-catalog/$BUCKET_NAME \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "bucket": "analytics-bucket",
    "credential_status": "present",
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "maintenance_config": {
      "compaction": {
        "state": "enabled",
        "target_size_mb": "128"
      },
      "snapshot_expiration": {
        "max_snapshot_age": "7d",
        "min_snapshots_to_keep": 100,
        "state": "enabled"
      }
    },
    "name": "account123_analytics-bucket",
    "status": "active"
  },
  "success": true
}
```

## Enable R2 bucket as a catalog

**post** `/accounts/{account_id}/r2-catalog/{bucket_name}/enable`

Enable an R2 bucket as an Apache Iceberg catalog. This operation creates
the necessary catalog infrastructure and activates the bucket for storing
Iceberg metadata and data files.

### Path Parameters

- `account_id: string`

  Use this to identify the account.

- `bucket_name: string`

  Specifies the R2 bucket name.

### Returns

- `errors: array of object { code, message }`

  Contains errors if the API call was unsuccessful.

  - `code: number`

    Specifies the error code.

  - `message: string`

    Describes the error.

- `messages: array of object { code, message }`

  Contains informational messages.

  - `code: number`

    Specifies the message code.

  - `message: string`

    Contains the message text.

- `success: boolean`

  Indicates whether the API call was successful.

- `result: optional object { id, name }`

  Contains response from activating an R2 bucket as a catalog.

  - `id: string`

    Use this to uniquely identify the activated catalog.

  - `name: string`

    Specifies the name of the activated catalog.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2-catalog/$BUCKET_NAME/enable \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "account123_my-bucket"
  },
  "success": true
}
```

## Disable R2 catalog

**post** `/accounts/{account_id}/r2-catalog/{bucket_name}/disable`

Disable an R2 bucket as a catalog. This operation deactivates the catalog
but preserves existing metadata and data files. The catalog can be
re-enabled later.

### Path Parameters

- `account_id: string`

  Use this to identify the account.

- `bucket_name: string`

  Specifies the R2 bucket name.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2-catalog/$BUCKET_NAME/disable \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Domain Types

### R2 Data Catalog List Response

- `R2DataCatalogListResponse object { warehouses }`

  Contains the list of catalogs.

  - `warehouses: array of object { id, bucket, name, 3 more }`

    Lists catalogs in the account.

    - `id: string`

      Use this to uniquely identify the catalog.

    - `bucket: string`

      Specifies the associated R2 bucket name.

    - `name: string`

      Specifies the catalog name (generated from account and bucket name).

    - `status: "active" or "inactive"`

      Indicates the status of the catalog.

      - `"active"`

      - `"inactive"`

    - `credential_status: optional "present" or "absent"`

      Shows the credential configuration status.

      - `"present"`

      - `"absent"`

    - `maintenance_config: optional object { compaction, snapshot_expiration }`

      Configures maintenance for the catalog.

      - `compaction: optional object { state, target_size_mb }`

        Configures compaction for catalog maintenance.

        - `state: "enabled" or "disabled"`

          Specifies the state of maintenance operations.

          - `"enabled"`

          - `"disabled"`

        - `target_size_mb: "64" or "128" or "256" or "512"`

          Sets the target file size for compaction in megabytes. Defaults to "128".

          - `"64"`

          - `"128"`

          - `"256"`

          - `"512"`

      - `snapshot_expiration: optional object { max_snapshot_age, min_snapshots_to_keep, state }`

        Configures snapshot expiration settings.

        - `max_snapshot_age: string`

          Specifies the maximum age for snapshots. The system deletes snapshots older than this age.
          Format: <number><unit> where unit is d (days), h (hours), m (minutes), or s (seconds).
          Examples: "7d" (7 days), "48h" (48 hours), "2880m" (2,880 minutes).
          Defaults to "7d".

        - `min_snapshots_to_keep: number`

          Specifies the minimum number of snapshots to retain. Defaults to 100.

        - `state: "enabled" or "disabled"`

          Specifies the state of maintenance operations.

          - `"enabled"`

          - `"disabled"`

### R2 Data Catalog Get Response

- `R2DataCatalogGetResponse object { id, bucket, name, 3 more }`

  Contains R2 Data Catalog information.

  - `id: string`

    Use this to uniquely identify the catalog.

  - `bucket: string`

    Specifies the associated R2 bucket name.

  - `name: string`

    Specifies the catalog name (generated from account and bucket name).

  - `status: "active" or "inactive"`

    Indicates the status of the catalog.

    - `"active"`

    - `"inactive"`

  - `credential_status: optional "present" or "absent"`

    Shows the credential configuration status.

    - `"present"`

    - `"absent"`

  - `maintenance_config: optional object { compaction, snapshot_expiration }`

    Configures maintenance for the catalog.

    - `compaction: optional object { state, target_size_mb }`

      Configures compaction for catalog maintenance.

      - `state: "enabled" or "disabled"`

        Specifies the state of maintenance operations.

        - `"enabled"`

        - `"disabled"`

      - `target_size_mb: "64" or "128" or "256" or "512"`

        Sets the target file size for compaction in megabytes. Defaults to "128".

        - `"64"`

        - `"128"`

        - `"256"`

        - `"512"`

    - `snapshot_expiration: optional object { max_snapshot_age, min_snapshots_to_keep, state }`

      Configures snapshot expiration settings.

      - `max_snapshot_age: string`

        Specifies the maximum age for snapshots. The system deletes snapshots older than this age.
        Format: <number><unit> where unit is d (days), h (hours), m (minutes), or s (seconds).
        Examples: "7d" (7 days), "48h" (48 hours), "2880m" (2,880 minutes).
        Defaults to "7d".

      - `min_snapshots_to_keep: number`

        Specifies the minimum number of snapshots to retain. Defaults to 100.

      - `state: "enabled" or "disabled"`

        Specifies the state of maintenance operations.

        - `"enabled"`

        - `"disabled"`

### R2 Data Catalog Enable Response

- `R2DataCatalogEnableResponse object { id, name }`

  Contains response from activating an R2 bucket as a catalog.

  - `id: string`

    Use this to uniquely identify the activated catalog.

  - `name: string`

    Specifies the name of the activated catalog.

# Maintenance Configs

## Get catalog maintenance configuration

**get** `/accounts/{account_id}/r2-catalog/{bucket_name}/maintenance-configs`

Retrieve the maintenance configuration for a specific catalog,
including compaction settings and credential status.

### Path Parameters

- `account_id: string`

  Use this to identify the account.

- `bucket_name: string`

  Specifies the R2 bucket name.

### Returns

- `errors: array of object { code, message }`

  Contains errors if the API call was unsuccessful.

  - `code: number`

    Specifies the error code.

  - `message: string`

    Describes the error.

- `messages: array of object { code, message }`

  Contains informational messages.

  - `code: number`

    Specifies the message code.

  - `message: string`

    Contains the message text.

- `success: boolean`

  Indicates whether the API call was successful.

- `result: optional object { credential_status, maintenance_config }`

  Contains maintenance configuration and credential status.

  - `credential_status: "present" or "absent"`

    Shows the credential configuration status.

    - `"present"`

    - `"absent"`

  - `maintenance_config: object { compaction, snapshot_expiration }`

    Configures maintenance for the catalog.

    - `compaction: optional object { state, target_size_mb }`

      Configures compaction for catalog maintenance.

      - `state: "enabled" or "disabled"`

        Specifies the state of maintenance operations.

        - `"enabled"`

        - `"disabled"`

      - `target_size_mb: "64" or "128" or "256" or "512"`

        Sets the target file size for compaction in megabytes. Defaults to "128".

        - `"64"`

        - `"128"`

        - `"256"`

        - `"512"`

    - `snapshot_expiration: optional object { max_snapshot_age, min_snapshots_to_keep, state }`

      Configures snapshot expiration settings.

      - `max_snapshot_age: string`

        Specifies the maximum age for snapshots. The system deletes snapshots older than this age.
        Format: <number><unit> where unit is d (days), h (hours), m (minutes), or s (seconds).
        Examples: "7d" (7 days), "48h" (48 hours), "2880m" (2,880 minutes).
        Defaults to "7d".

      - `min_snapshots_to_keep: number`

        Specifies the minimum number of snapshots to retain. Defaults to 100.

      - `state: "enabled" or "disabled"`

        Specifies the state of maintenance operations.

        - `"enabled"`

        - `"disabled"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2-catalog/$BUCKET_NAME/maintenance-configs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "credential_status": "present",
    "maintenance_config": {
      "compaction": {
        "state": "enabled",
        "target_size_mb": "128"
      },
      "snapshot_expiration": {
        "max_snapshot_age": "7d",
        "min_snapshots_to_keep": 100,
        "state": "enabled"
      }
    }
  },
  "success": true
}
```

## Update catalog maintenance configuration

**post** `/accounts/{account_id}/r2-catalog/{bucket_name}/maintenance-configs`

Update the maintenance configuration for a catalog. This allows you to
enable or disable compaction and adjust target file sizes for optimization.

### Path Parameters

- `account_id: string`

  Use this to identify the account.

- `bucket_name: string`

  Specifies the R2 bucket name.

### Body Parameters

- `compaction: optional object { state, target_size_mb }`

  Updates compaction configuration (all fields optional).

  - `state: optional "enabled" or "disabled"`

    Updates the state optionally.

    - `"enabled"`

    - `"disabled"`

  - `target_size_mb: optional "64" or "128" or "256" or "512"`

    Updates the target file size optionally.

    - `"64"`

    - `"128"`

    - `"256"`

    - `"512"`

- `snapshot_expiration: optional object { max_snapshot_age, min_snapshots_to_keep, state }`

  Updates snapshot expiration configuration (all fields optional).

  - `max_snapshot_age: optional string`

    Updates the maximum age for snapshots optionally.

  - `min_snapshots_to_keep: optional number`

    Updates the minimum number of snapshots to retain optionally.

  - `state: optional "enabled" or "disabled"`

    Updates the state optionally.

    - `"enabled"`

    - `"disabled"`

### Returns

- `errors: array of object { code, message }`

  Contains errors if the API call was unsuccessful.

  - `code: number`

    Specifies the error code.

  - `message: string`

    Describes the error.

- `messages: array of object { code, message }`

  Contains informational messages.

  - `code: number`

    Specifies the message code.

  - `message: string`

    Contains the message text.

- `success: boolean`

  Indicates whether the API call was successful.

- `result: optional object { compaction, snapshot_expiration }`

  Configures maintenance for the catalog.

  - `compaction: optional object { state, target_size_mb }`

    Configures compaction for catalog maintenance.

    - `state: "enabled" or "disabled"`

      Specifies the state of maintenance operations.

      - `"enabled"`

      - `"disabled"`

    - `target_size_mb: "64" or "128" or "256" or "512"`

      Sets the target file size for compaction in megabytes. Defaults to "128".

      - `"64"`

      - `"128"`

      - `"256"`

      - `"512"`

  - `snapshot_expiration: optional object { max_snapshot_age, min_snapshots_to_keep, state }`

    Configures snapshot expiration settings.

    - `max_snapshot_age: string`

      Specifies the maximum age for snapshots. The system deletes snapshots older than this age.
      Format: <number><unit> where unit is d (days), h (hours), m (minutes), or s (seconds).
      Examples: "7d" (7 days), "48h" (48 hours), "2880m" (2,880 minutes).
      Defaults to "7d".

    - `min_snapshots_to_keep: number`

      Specifies the minimum number of snapshots to retain. Defaults to 100.

    - `state: "enabled" or "disabled"`

      Specifies the state of maintenance operations.

      - `"enabled"`

      - `"disabled"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2-catalog/$BUCKET_NAME/maintenance-configs \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "compaction": {
      "state": "enabled",
      "target_size_mb": "256"
    },
    "snapshot_expiration": {
      "max_snapshot_age": "14d",
      "min_snapshots_to_keep": 5,
      "state": "enabled"
    }
  },
  "success": true
}
```

## Domain Types

### Maintenance Config Get Response

- `MaintenanceConfigGetResponse object { credential_status, maintenance_config }`

  Contains maintenance configuration and credential status.

  - `credential_status: "present" or "absent"`

    Shows the credential configuration status.

    - `"present"`

    - `"absent"`

  - `maintenance_config: object { compaction, snapshot_expiration }`

    Configures maintenance for the catalog.

    - `compaction: optional object { state, target_size_mb }`

      Configures compaction for catalog maintenance.

      - `state: "enabled" or "disabled"`

        Specifies the state of maintenance operations.

        - `"enabled"`

        - `"disabled"`

      - `target_size_mb: "64" or "128" or "256" or "512"`

        Sets the target file size for compaction in megabytes. Defaults to "128".

        - `"64"`

        - `"128"`

        - `"256"`

        - `"512"`

    - `snapshot_expiration: optional object { max_snapshot_age, min_snapshots_to_keep, state }`

      Configures snapshot expiration settings.

      - `max_snapshot_age: string`

        Specifies the maximum age for snapshots. The system deletes snapshots older than this age.
        Format: <number><unit> where unit is d (days), h (hours), m (minutes), or s (seconds).
        Examples: "7d" (7 days), "48h" (48 hours), "2880m" (2,880 minutes).
        Defaults to "7d".

      - `min_snapshots_to_keep: number`

        Specifies the minimum number of snapshots to retain. Defaults to 100.

      - `state: "enabled" or "disabled"`

        Specifies the state of maintenance operations.

        - `"enabled"`

        - `"disabled"`

### Maintenance Config Update Response

- `MaintenanceConfigUpdateResponse object { compaction, snapshot_expiration }`

  Configures maintenance for the catalog.

  - `compaction: optional object { state, target_size_mb }`

    Configures compaction for catalog maintenance.

    - `state: "enabled" or "disabled"`

      Specifies the state of maintenance operations.

      - `"enabled"`

      - `"disabled"`

    - `target_size_mb: "64" or "128" or "256" or "512"`

      Sets the target file size for compaction in megabytes. Defaults to "128".

      - `"64"`

      - `"128"`

      - `"256"`

      - `"512"`

  - `snapshot_expiration: optional object { max_snapshot_age, min_snapshots_to_keep, state }`

    Configures snapshot expiration settings.

    - `max_snapshot_age: string`

      Specifies the maximum age for snapshots. The system deletes snapshots older than this age.
      Format: <number><unit> where unit is d (days), h (hours), m (minutes), or s (seconds).
      Examples: "7d" (7 days), "48h" (48 hours), "2880m" (2,880 minutes).
      Defaults to "7d".

    - `min_snapshots_to_keep: number`

      Specifies the minimum number of snapshots to retain. Defaults to 100.

    - `state: "enabled" or "disabled"`

      Specifies the state of maintenance operations.

      - `"enabled"`

      - `"disabled"`

# Credentials

## Store catalog credentials

**post** `/accounts/{account_id}/r2-catalog/{bucket_name}/credential`

Store authentication credentials for a catalog. These credentials are used
to authenticate with R2 storage when performing catalog operations.

### Path Parameters

- `account_id: string`

  Use this to identify the account.

- `bucket_name: string`

  Specifies the R2 bucket name.

### Body Parameters

- `token: string`

  Provides the Cloudflare API token for accessing R2.

### Returns

- `errors: array of object { code, message }`

  Contains errors if the API call was unsuccessful.

  - `code: number`

    Specifies the error code.

  - `message: string`

    Describes the error.

- `messages: array of object { code, message }`

  Contains informational messages.

  - `code: number`

    Specifies the message code.

  - `message: string`

    Contains the message text.

- `success: boolean`

  Indicates whether the API call was successful.

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2-catalog/$BUCKET_NAME/credential \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "token": "your-cloudflare-api-token-here"
        }'
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": null,
  "success": true
}
```

## Domain Types

### Credential Create Response

- `CredentialCreateResponse = unknown`

# Namespaces

## List namespaces in catalog

**get** `/accounts/{account_id}/r2-catalog/{bucket_name}/namespaces`

Returns a list of namespaces in the specified R2 catalog.
Supports hierarchical filtering and pagination for efficient traversal
of large namespace hierarchies.

### Path Parameters

- `account_id: string`

  Use this to identify the account.

- `bucket_name: string`

  Specifies the R2 bucket name.

### Query Parameters

- `page_size: optional number`

  Maximum number of namespaces to return per page.
  Defaults to 100, maximum 1000.

- `page_token: optional string`

  Opaque pagination token from a previous response.
  Use this to fetch the next page of results.

- `parent: optional string`

  Parent namespace to filter by. Only returns direct children of this namespace.
  For nested namespaces, use %1F as separator (e.g., "bronze%1Fanalytics").
  Omit this parameter to list top-level namespaces.

- `return_details: optional boolean`

  Whether to include additional metadata (timestamps).
  When true, response includes created_at and updated_at arrays.

- `return_uuids: optional boolean`

  Whether to include namespace UUIDs in the response.
  Set to true to receive the namespace_uuids array.

### Returns

- `errors: array of object { code, message }`

  Contains errors if the API call was unsuccessful.

  - `code: number`

    Specifies the error code.

  - `message: string`

    Describes the error.

- `messages: array of object { code, message }`

  Contains informational messages.

  - `code: number`

    Specifies the message code.

  - `message: string`

    Contains the message text.

- `success: boolean`

  Indicates whether the API call was successful.

- `result: optional object { namespaces, details, namespace_uuids, next_page_token }`

  Contains the list of namespaces with optional pagination.

  - `namespaces: array of array of string`

    Lists namespaces in the catalog.

  - `details: optional array of object { namespace, namespace_uuid, created_at, updated_at }`

    Contains detailed metadata for each namespace when return_details is true.
    Each object includes the namespace, UUID, and timestamps.

    - `namespace: array of string`

      Specifies the hierarchical namespace parts as an array of strings.
      For example, ["bronze", "analytics"] represents the namespace "bronze.analytics".

    - `namespace_uuid: string`

      Contains the UUID that persists across renames.

    - `created_at: optional string`

      Indicates the creation timestamp in ISO 8601 format.

    - `updated_at: optional string`

      Shows the last update timestamp in ISO 8601 format. Null if never updated.

  - `namespace_uuids: optional array of string`

    Contains UUIDs for each namespace when return_uuids is true.
    The order corresponds to the namespaces array.

  - `next_page_token: optional string`

    Use this opaque token to fetch the next page of results.
    A null or absent value indicates the last page.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2-catalog/$BUCKET_NAME/namespaces \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "success": true,
  "result": {
    "namespaces": [
      [
        "bronze",
        "analytics"
      ]
    ],
    "details": [
      {
        "namespace": [
          "bronze",
          "analytics"
        ],
        "namespace_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_at": "2019-12-27T18:11:19.117Z",
        "updated_at": "2019-12-27T18:11:19.117Z"
      }
    ],
    "namespace_uuids": [
      "0199b999-6869-7383-bb1f-d30e059d5326",
      "0199b99b-2c88-73b3-8dbb-421e0e8f2757"
    ],
    "next_page_token": "MSYxNzU5NzU1NTc4NTA0MTk0JjAxOTliOTliLTJjODgtNzNiMy04ZGJiLTQyMWUwZThmMjc1Nw"
  }
}
```

## Domain Types

### Namespace List Response

- `NamespaceListResponse object { namespaces, details, namespace_uuids, next_page_token }`

  Contains the list of namespaces with optional pagination.

  - `namespaces: array of array of string`

    Lists namespaces in the catalog.

  - `details: optional array of object { namespace, namespace_uuid, created_at, updated_at }`

    Contains detailed metadata for each namespace when return_details is true.
    Each object includes the namespace, UUID, and timestamps.

    - `namespace: array of string`

      Specifies the hierarchical namespace parts as an array of strings.
      For example, ["bronze", "analytics"] represents the namespace "bronze.analytics".

    - `namespace_uuid: string`

      Contains the UUID that persists across renames.

    - `created_at: optional string`

      Indicates the creation timestamp in ISO 8601 format.

    - `updated_at: optional string`

      Shows the last update timestamp in ISO 8601 format. Null if never updated.

  - `namespace_uuids: optional array of string`

    Contains UUIDs for each namespace when return_uuids is true.
    The order corresponds to the namespaces array.

  - `next_page_token: optional string`

    Use this opaque token to fetch the next page of results.
    A null or absent value indicates the last page.

# Tables

## List tables in namespace

**get** `/accounts/{account_id}/r2-catalog/{bucket_name}/namespaces/{namespace}/tables`

Returns a list of tables in the specified namespace within an R2 catalog.
Supports pagination for efficient traversal of large table collections.

### Path Parameters

- `account_id: string`

  Use this to identify the account.

- `bucket_name: string`

  Specifies the R2 bucket name.

- `namespace: string`

### Query Parameters

- `page_size: optional number`

  Maximum number of tables to return per page.
  Defaults to 100, maximum 1000.

- `page_token: optional string`

  Opaque pagination token from a previous response.
  Use this to fetch the next page of results.

- `return_details: optional boolean`

  Whether to include additional metadata (timestamps, locations).
  When true, response includes created_at, updated_at, metadata_locations, and locations arrays.

- `return_uuids: optional boolean`

  Whether to include table UUIDs in the response.
  Set to true to receive the table_uuids array.

### Returns

- `errors: array of object { code, message }`

  Contains errors if the API call was unsuccessful.

  - `code: number`

    Specifies the error code.

  - `message: string`

    Describes the error.

- `messages: array of object { code, message }`

  Contains informational messages.

  - `code: number`

    Specifies the message code.

  - `message: string`

    Contains the message text.

- `success: boolean`

  Indicates whether the API call was successful.

- `result: optional object { identifiers, details, next_page_token, table_uuids }`

  Contains the list of tables with optional pagination.

  - `identifiers: array of object { name, namespace }`

    Lists tables in the namespace.

    - `name: string`

      Specifies the table name.

    - `namespace: array of string`

      Specifies the hierarchical namespace parts as an array of strings.
      For example, ["bronze", "analytics"] represents the namespace "bronze.analytics".

  - `details: optional array of object { identifier, table_uuid, created_at, 3 more }`

    Contains detailed metadata for each table when return_details is true.
    Each object includes identifier, UUID, timestamps, and locations.

    - `identifier: object { name, namespace }`

      Specifies a unique table identifier within a catalog.

      - `name: string`

        Specifies the table name.

      - `namespace: array of string`

        Specifies the hierarchical namespace parts as an array of strings.
        For example, ["bronze", "analytics"] represents the namespace "bronze.analytics".

    - `table_uuid: string`

      Contains the UUID that persists across renames.

    - `created_at: optional string`

      Indicates the creation timestamp in ISO 8601 format.

    - `location: optional string`

      Specifies the base S3 URI for table storage location.

    - `metadata_location: optional string`

      Contains the S3 URI to table metadata file. Null for staged tables.

    - `updated_at: optional string`

      Shows the last update timestamp in ISO 8601 format. Null if never updated.

  - `next_page_token: optional string`

    Use this opaque token to fetch the next page of results.
    A null or absent value indicates the last page.

  - `table_uuids: optional array of string`

    Contains UUIDs for each table when return_uuids is true.
    The order corresponds to the identifiers array.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2-catalog/$BUCKET_NAME/namespaces/$NAMESPACE/tables \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "details": [
      {
        "created_at": "2025-10-07T10:00:00Z",
        "identifier": {
          "name": "events",
          "namespace": [
            "bronze"
          ]
        },
        "location": "s3://my-bucket/__r2_data_catalog/wh-id/table-id/",
        "metadata_location": "s3://my-bucket/__r2_data_catalog/wh-id/table-id/metadata/v1.metadata.json",
        "table_uuid": "0199b9a1-28a0-71e0-a73e-b0fc32c8468e",
        "updated_at": "2025-10-07T15:00:00Z"
      },
      {
        "created_at": "2025-10-07T10:30:00Z",
        "identifier": {
          "name": "users",
          "namespace": [
            "bronze"
          ]
        },
        "location": "s3://my-bucket/__r2_data_catalog/wh-id/table-id-2/",
        "metadata_location": "s3://my-bucket/__r2_data_catalog/wh-id/table-id-2/metadata/v2.metadata.json",
        "table_uuid": "0199b9a1-3c74-7731-bf53-d8c67ead079d",
        "updated_at": "2025-10-07T16:00:00Z"
      }
    ],
    "identifiers": [
      {
        "name": "events",
        "namespace": [
          "bronze"
        ]
      },
      {
        "name": "users",
        "namespace": [
          "bronze"
        ]
      }
    ],
    "next_page_token": null,
    "table_uuids": [
      "0199b9a1-28a0-71e0-a73e-b0fc32c8468e",
      "0199b9a1-3c74-7731-bf53-d8c67ead079d"
    ]
  },
  "success": true
}
```

## Domain Types

### Table List Response

- `TableListResponse object { identifiers, details, next_page_token, table_uuids }`

  Contains the list of tables with optional pagination.

  - `identifiers: array of object { name, namespace }`

    Lists tables in the namespace.

    - `name: string`

      Specifies the table name.

    - `namespace: array of string`

      Specifies the hierarchical namespace parts as an array of strings.
      For example, ["bronze", "analytics"] represents the namespace "bronze.analytics".

  - `details: optional array of object { identifier, table_uuid, created_at, 3 more }`

    Contains detailed metadata for each table when return_details is true.
    Each object includes identifier, UUID, timestamps, and locations.

    - `identifier: object { name, namespace }`

      Specifies a unique table identifier within a catalog.

      - `name: string`

        Specifies the table name.

      - `namespace: array of string`

        Specifies the hierarchical namespace parts as an array of strings.
        For example, ["bronze", "analytics"] represents the namespace "bronze.analytics".

    - `table_uuid: string`

      Contains the UUID that persists across renames.

    - `created_at: optional string`

      Indicates the creation timestamp in ISO 8601 format.

    - `location: optional string`

      Specifies the base S3 URI for table storage location.

    - `metadata_location: optional string`

      Contains the S3 URI to table metadata file. Null for staged tables.

    - `updated_at: optional string`

      Shows the last update timestamp in ISO 8601 format. Null if never updated.

  - `next_page_token: optional string`

    Use this opaque token to fetch the next page of results.
    A null or absent value indicates the last page.

  - `table_uuids: optional array of string`

    Contains UUIDs for each table when return_uuids is true.
    The order corresponds to the identifiers array.

# Maintenance Configs

## Get table maintenance configuration

**get** `/accounts/{account_id}/r2-catalog/{bucket_name}/namespaces/{namespace}/tables/{table_name}/maintenance-configs`

Retrieve the maintenance configuration for a specific table,
including compaction settings.

### Path Parameters

- `account_id: string`

  Use this to identify the account.

- `bucket_name: string`

  Specifies the R2 bucket name.

- `namespace: string`

- `table_name: string`

### Returns

- `errors: array of object { code, message }`

  Contains errors if the API call was unsuccessful.

  - `code: number`

    Specifies the error code.

  - `message: string`

    Describes the error.

- `messages: array of object { code, message }`

  Contains informational messages.

  - `code: number`

    Specifies the message code.

  - `message: string`

    Contains the message text.

- `success: boolean`

  Indicates whether the API call was successful.

- `result: optional object { maintenance_config }`

  Contains table maintenance configuration.

  - `maintenance_config: object { compaction, snapshot_expiration }`

    Configures maintenance for the table.

    - `compaction: optional object { state, target_size_mb }`

      Configures compaction settings for table optimization.

      - `state: "enabled" or "disabled"`

        Specifies the state of maintenance operations.

        - `"enabled"`

        - `"disabled"`

      - `target_size_mb: "64" or "128" or "256" or "512"`

        Sets the target file size for compaction in megabytes. Defaults to "128".

        - `"64"`

        - `"128"`

        - `"256"`

        - `"512"`

    - `snapshot_expiration: optional object { max_snapshot_age, min_snapshots_to_keep, state }`

      Configures snapshot expiration settings.

      - `max_snapshot_age: string`

        Specifies the maximum age for snapshots. The system deletes snapshots older than this age.
        Format: <number><unit> where unit is d (days), h (hours), m (minutes), or s (seconds).
        Examples: "7d" (7 days), "48h" (48 hours), "2880m" (2,880 minutes).
        Defaults to "7d".

      - `min_snapshots_to_keep: number`

        Specifies the minimum number of snapshots to retain. Defaults to 100.

      - `state: "enabled" or "disabled"`

        Specifies the state of maintenance operations.

        - `"enabled"`

        - `"disabled"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2-catalog/$BUCKET_NAME/namespaces/$NAMESPACE/tables/$TABLE_NAME/maintenance-configs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "maintenance_config": {
      "compaction": {
        "state": "enabled",
        "target_size_mb": "128"
      },
      "snapshot_expiration": {
        "max_snapshot_age": "7d",
        "min_snapshots_to_keep": 100,
        "state": "enabled"
      }
    }
  },
  "success": true
}
```

## Update table maintenance configuration

**post** `/accounts/{account_id}/r2-catalog/{bucket_name}/namespaces/{namespace}/tables/{table_name}/maintenance-configs`

Update the maintenance configuration for a specific table. This allows you to
enable or disable compaction and adjust target file sizes for optimization.

### Path Parameters

- `account_id: string`

  Use this to identify the account.

- `bucket_name: string`

  Specifies the R2 bucket name.

- `namespace: string`

- `table_name: string`

### Body Parameters

- `compaction: optional object { state, target_size_mb }`

  Updates compaction configuration (all fields optional).

  - `state: optional "enabled" or "disabled"`

    Updates the state optionally.

    - `"enabled"`

    - `"disabled"`

  - `target_size_mb: optional "64" or "128" or "256" or "512"`

    Updates the target file size optionally.

    - `"64"`

    - `"128"`

    - `"256"`

    - `"512"`

- `snapshot_expiration: optional object { max_snapshot_age, min_snapshots_to_keep, state }`

  Updates snapshot expiration configuration (all fields optional).

  - `max_snapshot_age: optional string`

    Updates the maximum age for snapshots optionally.

  - `min_snapshots_to_keep: optional number`

    Updates the minimum number of snapshots to retain optionally.

  - `state: optional "enabled" or "disabled"`

    Updates the state optionally.

    - `"enabled"`

    - `"disabled"`

### Returns

- `errors: array of object { code, message }`

  Contains errors if the API call was unsuccessful.

  - `code: number`

    Specifies the error code.

  - `message: string`

    Describes the error.

- `messages: array of object { code, message }`

  Contains informational messages.

  - `code: number`

    Specifies the message code.

  - `message: string`

    Contains the message text.

- `success: boolean`

  Indicates whether the API call was successful.

- `result: optional object { compaction, snapshot_expiration }`

  Configures maintenance for the table.

  - `compaction: optional object { state, target_size_mb }`

    Configures compaction settings for table optimization.

    - `state: "enabled" or "disabled"`

      Specifies the state of maintenance operations.

      - `"enabled"`

      - `"disabled"`

    - `target_size_mb: "64" or "128" or "256" or "512"`

      Sets the target file size for compaction in megabytes. Defaults to "128".

      - `"64"`

      - `"128"`

      - `"256"`

      - `"512"`

  - `snapshot_expiration: optional object { max_snapshot_age, min_snapshots_to_keep, state }`

    Configures snapshot expiration settings.

    - `max_snapshot_age: string`

      Specifies the maximum age for snapshots. The system deletes snapshots older than this age.
      Format: <number><unit> where unit is d (days), h (hours), m (minutes), or s (seconds).
      Examples: "7d" (7 days), "48h" (48 hours), "2880m" (2,880 minutes).
      Defaults to "7d".

    - `min_snapshots_to_keep: number`

      Specifies the minimum number of snapshots to retain. Defaults to 100.

    - `state: "enabled" or "disabled"`

      Specifies the state of maintenance operations.

      - `"enabled"`

      - `"disabled"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2-catalog/$BUCKET_NAME/namespaces/$NAMESPACE/tables/$TABLE_NAME/maintenance-configs \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "compaction": {
      "state": "enabled",
      "target_size_mb": "256"
    },
    "snapshot_expiration": {
      "max_snapshot_age": "14d",
      "min_snapshots_to_keep": 5,
      "state": "enabled"
    }
  },
  "success": true
}
```

## Domain Types

### Maintenance Config Get Response

- `MaintenanceConfigGetResponse object { maintenance_config }`

  Contains table maintenance configuration.

  - `maintenance_config: object { compaction, snapshot_expiration }`

    Configures maintenance for the table.

    - `compaction: optional object { state, target_size_mb }`

      Configures compaction settings for table optimization.

      - `state: "enabled" or "disabled"`

        Specifies the state of maintenance operations.

        - `"enabled"`

        - `"disabled"`

      - `target_size_mb: "64" or "128" or "256" or "512"`

        Sets the target file size for compaction in megabytes. Defaults to "128".

        - `"64"`

        - `"128"`

        - `"256"`

        - `"512"`

    - `snapshot_expiration: optional object { max_snapshot_age, min_snapshots_to_keep, state }`

      Configures snapshot expiration settings.

      - `max_snapshot_age: string`

        Specifies the maximum age for snapshots. The system deletes snapshots older than this age.
        Format: <number><unit> where unit is d (days), h (hours), m (minutes), or s (seconds).
        Examples: "7d" (7 days), "48h" (48 hours), "2880m" (2,880 minutes).
        Defaults to "7d".

      - `min_snapshots_to_keep: number`

        Specifies the minimum number of snapshots to retain. Defaults to 100.

      - `state: "enabled" or "disabled"`

        Specifies the state of maintenance operations.

        - `"enabled"`

        - `"disabled"`

### Maintenance Config Update Response

- `MaintenanceConfigUpdateResponse object { compaction, snapshot_expiration }`

  Configures maintenance for the table.

  - `compaction: optional object { state, target_size_mb }`

    Configures compaction settings for table optimization.

    - `state: "enabled" or "disabled"`

      Specifies the state of maintenance operations.

      - `"enabled"`

      - `"disabled"`

    - `target_size_mb: "64" or "128" or "256" or "512"`

      Sets the target file size for compaction in megabytes. Defaults to "128".

      - `"64"`

      - `"128"`

      - `"256"`

      - `"512"`

  - `snapshot_expiration: optional object { max_snapshot_age, min_snapshots_to_keep, state }`

    Configures snapshot expiration settings.

    - `max_snapshot_age: string`

      Specifies the maximum age for snapshots. The system deletes snapshots older than this age.
      Format: <number><unit> where unit is d (days), h (hours), m (minutes), or s (seconds).
      Examples: "7d" (7 days), "48h" (48 hours), "2880m" (2,880 minutes).
      Defaults to "7d".

    - `min_snapshots_to_keep: number`

      Specifies the minimum number of snapshots to retain. Defaults to 100.

    - `state: "enabled" or "disabled"`

      Specifies the state of maintenance operations.

      - `"enabled"`

      - `"disabled"`
