## Delete a specified CNI object

**delete** `/accounts/{account_id}/cni/cnis/{cni}`

Delete a specified CNI object

### Path Parameters

- `account_id: string`

  Customer account tag

- `cni: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/cnis/$CNI \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
