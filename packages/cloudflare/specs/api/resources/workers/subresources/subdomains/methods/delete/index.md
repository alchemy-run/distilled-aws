## Delete Subdomain

**delete** `/accounts/{account_id}/workers/subdomain`

Deletes a Workers subdomain for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/subdomain \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
