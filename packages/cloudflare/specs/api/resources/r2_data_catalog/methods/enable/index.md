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
