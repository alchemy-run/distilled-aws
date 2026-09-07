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
