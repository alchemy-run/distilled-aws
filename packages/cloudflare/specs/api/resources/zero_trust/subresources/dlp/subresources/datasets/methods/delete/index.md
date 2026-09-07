## Delete a dataset

**delete** `/accounts/{account_id}/dlp/datasets/{dataset_id}`

This deletes all versions of the dataset.

### Path Parameters

- `account_id: string`

- `dataset_id: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/datasets/$DATASET_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
