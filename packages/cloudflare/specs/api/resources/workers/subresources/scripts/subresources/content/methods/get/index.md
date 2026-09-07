## Get script content

**get** `/accounts/{account_id}/workers/scripts/{script_name}/content/v2`

Fetch script content only.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/content/v2 \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
