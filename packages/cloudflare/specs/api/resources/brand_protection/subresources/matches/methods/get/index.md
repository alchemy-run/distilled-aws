## Read matches for string queries by ID

**get** `/accounts/{account_id}/brand-protection/matches`

Return matches for string queries based on ID

### Path Parameters

- `account_id: string`

### Query Parameters

- `id: optional string`

- `include_domain_id: optional boolean`

- `limit: optional number`

- `offset: optional number`

### Returns

- `matches: optional array of map[unknown]`

- `total: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/brand-protection/matches \
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
