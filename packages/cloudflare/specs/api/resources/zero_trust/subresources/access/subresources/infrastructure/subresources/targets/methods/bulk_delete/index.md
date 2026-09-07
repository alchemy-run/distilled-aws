## Delete targets (Deprecated)

**delete** `/accounts/{account_id}/infrastructure/targets/batch`

Removes one or more targets.

### Path Parameters

- `account_id: string`

  Account identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/infrastructure/targets/batch \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
