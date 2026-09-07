## Retrieves a file from Binary Storage

**get** `/accounts/{account_id}/cloudforce-one/binary/{hash}`

Retrieves a binary file from the Cloudforce One binary storage for analysis.

### Path Parameters

- `account_id: string`

  Account ID.

- `hash: string`

  hash of the binary

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/binary/$HASH \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
