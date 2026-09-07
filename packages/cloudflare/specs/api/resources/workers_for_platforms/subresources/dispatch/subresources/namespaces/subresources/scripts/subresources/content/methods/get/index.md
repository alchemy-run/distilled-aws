## Get Script Content

**get** `/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/content`

Fetch script content from a script uploaded to a Workers for Platforms namespace.

### Path Parameters

- `account_id: string`

  Identifier.

- `dispatch_namespace: string`

  Name of the Workers for Platforms dispatch namespace.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/dispatch/namespaces/$DISPATCH_NAMESPACE/scripts/$SCRIPT_NAME/content \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
