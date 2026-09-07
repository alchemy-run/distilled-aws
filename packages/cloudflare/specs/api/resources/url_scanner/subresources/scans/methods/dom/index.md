## Get URL scan's DOM

**get** `/accounts/{account_id}/urlscanner/v2/dom/{scan_id}`

Returns a plain text response, with the scan's DOM content as rendered by Chrome.

### Path Parameters

- `account_id: string`

  Account ID.

- `scan_id: string`

  Scan UUID.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/urlscanner/v2/dom/$SCAN_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
