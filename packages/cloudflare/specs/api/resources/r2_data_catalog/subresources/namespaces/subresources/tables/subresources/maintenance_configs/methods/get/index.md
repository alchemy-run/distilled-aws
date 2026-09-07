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
