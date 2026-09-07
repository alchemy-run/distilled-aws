## Get screenshot

**get** `/accounts/{account_id}/urlscanner/v2/screenshots/{scan_id}.png`

Get scan's screenshot by resolution (desktop/mobile/tablet).

### Path Parameters

- `account_id: string`

  Account ID.

- `scan_id: string`

  Scan UUID.

### Query Parameters

- `resolution: optional "desktop" or "mobile" or "tablet"`

  Target device type.

  - `"desktop"`

  - `"mobile"`

  - `"tablet"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/urlscanner/v2/screenshots/$SCAN_ID.png \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
