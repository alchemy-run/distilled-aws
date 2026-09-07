## Download Worker

**get** `/accounts/{account_id}/workers/scripts/{script_name}`

Fetch raw script content for your worker. Note this is the original script content, not JSON encoded.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
