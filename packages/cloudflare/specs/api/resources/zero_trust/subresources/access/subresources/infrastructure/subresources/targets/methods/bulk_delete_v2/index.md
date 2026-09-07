## Delete targets

**post** `/accounts/{account_id}/infrastructure/targets/batch_delete`

Removes one or more targets.

### Path Parameters

- `account_id: string`

  Account identifier

### Body Parameters

- `target_ids: array of string`

  List of target IDs to bulk delete

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/infrastructure/targets/batch_delete \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "target_ids": [
            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          ]
        }'
```
