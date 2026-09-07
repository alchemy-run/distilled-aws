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
