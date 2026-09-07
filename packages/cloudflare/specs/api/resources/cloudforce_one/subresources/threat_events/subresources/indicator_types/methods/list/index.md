## Lists all indicator types

**get** `/accounts/{account_id}/cloudforce-one/events/indicatorTypes`

This Method is deprecated. Please use /events/dataset/:dataset_id/indicatorTypes instead.

### Path Parameters

- `account_id: string`

  Account ID.

### Returns

- `items: object { type }`

  - `type: string`

- `type: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/indicatorTypes \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "items": {
    "type": "string"
  },
  "type": "array"
}
```
