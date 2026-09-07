## Generate the Letter of Authorization (LOA) for a given interconnect

**get** `/accounts/{account_id}/cni/interconnects/{icon}/loa`

Generate the Letter of Authorization (LOA) for a given interconnect

### Path Parameters

- `account_id: string`

  Customer account tag

- `icon: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/interconnects/$ICON/loa \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
