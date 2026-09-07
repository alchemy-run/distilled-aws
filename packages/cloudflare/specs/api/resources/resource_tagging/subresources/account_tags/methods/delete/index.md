## Delete tags from an account-level resource

**delete** `/accounts/{account_id}/tags`

Removes all tags from a specific account-level resource.

### Path Parameters

- `account_id: string`

  Identifier.

### Header Parameters

- `"If-Match": optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```
