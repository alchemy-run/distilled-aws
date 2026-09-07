## Export as Terraform

**post** `/accounts/{account_id}/magic/cloud/onramps/{onramp_id}/export`

Export an On-ramp to terraform ready file(s) (Closed Beta).

### Path Parameters

- `account_id: string`

- `onramp_id: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/onramps/$ONRAMP_ID/export \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
