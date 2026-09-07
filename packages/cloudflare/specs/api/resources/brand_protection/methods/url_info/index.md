## Read submitted URLs by ID

**get** `/accounts/{account_id}/brand-protection/url-info`

Return submitted URLs based on ID

### Path Parameters

- `account_id: string`

### Returns

- `result: optional array of map[unknown]`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/brand-protection/url-info \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "foo": "bar"
    }
  ]
}
```
