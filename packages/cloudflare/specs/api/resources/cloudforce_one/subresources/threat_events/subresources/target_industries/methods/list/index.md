## Lists target industries across multiple datasets

**get** `/accounts/{account_id}/cloudforce-one/events/targetIndustries`

Lists target industries across multiple datasets

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `datasetIds: optional array of string`

  Array of dataset IDs to query target industries from. If not provided, uses the default dataset.

### Returns

- `items: object { type }`

  - `type: string`

- `type: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/targetIndustries \
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
