## Updates a category

**patch** `/accounts/{account_id}/cloudforce-one/events/categories/{category_id}`

Updates a category

### Path Parameters

- `account_id: string`

  Account ID.

- `category_id: string`

  Category UUID.

### Body Parameters

- `killChain: optional number`

- `mitreAttack: optional array of string`

- `mitreCapec: optional array of string`

- `name: optional string`

- `shortname: optional string`

### Returns

- `killChain: number`

- `name: string`

- `uuid: string`

- `mitreAttack: optional array of string`

- `mitreCapec: optional array of string`

- `shortname: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/categories/$CATEGORY_ID \
    -X PATCH \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
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
```
