## Delete target

**delete** `/accounts/{account_id}/infrastructure/targets/{target_id}`

Delete target

### Path Parameters

- `account_id: string`

  Account identifier

- `target_id: string`

  Target identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/infrastructure/targets/$TARGET_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
