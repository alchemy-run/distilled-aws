## Update the current settings for the active account

**put** `/accounts/{account_id}/cni/settings`

Update the current settings for the active account

### Path Parameters

- `account_id: string`

### Body Parameters

- `default_asn: optional number`

### Returns

- `default_asn: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/settings \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

#### Response

```json
{
  "default_asn": 0
}
```
