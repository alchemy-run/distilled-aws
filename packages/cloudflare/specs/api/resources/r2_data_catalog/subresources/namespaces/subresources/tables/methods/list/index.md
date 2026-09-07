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
