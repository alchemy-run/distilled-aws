## Deletes a category

**delete** `/accounts/{account_id}/cloudforce-one/events/categories/{category_id}`

Deletes a category

### Path Parameters

- `account_id: string`

  Account ID.

- `category_id: string`

  Category UUID.

### Returns

- `uuid: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/categories/$CATEGORY_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "uuid": "12345678-1234-1234-1234-1234567890ab"
}
```
