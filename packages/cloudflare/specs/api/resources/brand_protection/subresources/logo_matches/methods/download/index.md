## Download matches for logo queries by ID

**get** `/accounts/{account_id}/brand-protection/logo-matches/download`

Return matches as CSV for logo queries based on ID

### Path Parameters

- `account_id: string`

### Query Parameters

- `limit: optional string`

- `logo_id: optional array of string`

- `offset: optional string`

### Returns

- `matches: optional array of map[unknown]`

- `total: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/brand-protection/logo-matches/download \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "matches": [
    {
      "foo": "bar"
    }
  ],
  "total": 0
}
```
