## Delete integration

**delete** `/accounts/{account_id}/one/integrations/{id}`

Delete an integration by soft-deleting it.

### Path Parameters

- `account_id: string`

- `id: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/one/integrations/$ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
