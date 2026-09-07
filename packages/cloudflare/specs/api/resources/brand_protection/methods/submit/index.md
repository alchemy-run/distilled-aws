## Create new URL submissions

**post** `/accounts/{account_id}/brand-protection/submit`

Return new URL submissions

### Path Parameters

- `account_id: string`

### Returns

- `skipped_urls: optional array of map[unknown]`

- `submitted_urls: optional array of map[unknown]`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/brand-protection/submit \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "skipped_urls": [
    {
      "foo": "bar"
    }
  ],
  "submitted_urls": [
    {
      "foo": "bar"
    }
  ]
}
```
