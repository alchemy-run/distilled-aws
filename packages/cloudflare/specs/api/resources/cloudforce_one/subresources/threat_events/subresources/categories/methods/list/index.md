## Lists categories across multiple datasets

**get** `/accounts/{account_id}/cloudforce-one/events/categories`

Lists categories across multiple datasets

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `datasetIds: optional array of string`

  Array of dataset IDs to query categories from. If not provided, uses the default dataset.

### Returns

- `killChain: number`

- `name: string`

- `uuid: string`

- `mitreAttack: optional array of string`

- `mitreCapec: optional array of string`

- `shortname: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/categories \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
[
  {
    "killChain": 0,
    "name": "name",
    "uuid": "12345678-1234-1234-1234-1234567890ab",
    "mitreAttack": [
      "T1234"
    ],
    "mitreCapec": [
      "123"
    ],
    "shortname": "shortname"
  }
]
```
