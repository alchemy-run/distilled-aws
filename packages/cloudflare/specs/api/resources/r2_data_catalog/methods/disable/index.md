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
