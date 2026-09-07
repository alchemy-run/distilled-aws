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
