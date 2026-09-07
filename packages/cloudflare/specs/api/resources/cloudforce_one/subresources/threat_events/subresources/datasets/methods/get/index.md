## Reads a dataset

**get** `/accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}`

Reads a dataset

### Path Parameters

- `account_id: string`

  Account ID.

- `dataset_id: string`

  Dataset ID.

### Returns

- `isPublic: boolean`

- `name: string`

- `uuid: string`

- `deletedAt: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/dataset/$DATASET_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "isPublic": true,
  "name": "friendly dataset name",
  "uuid": "12345678-1234-1234-1234-1234567890ab",
  "deletedAt": "deletedAt"
}
```
