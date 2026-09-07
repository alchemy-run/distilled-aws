## Delete Pipelines

**delete** `/accounts/{account_id}/pipelines/v1/pipelines/{pipeline_id}`

Delete Pipeline in Account.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

- `pipeline_id: string`

  Specifies the public ID of the pipeline.

### Returns

- `result: unknown`

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/pipelines/$PIPELINE_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {},
  "success": true
}
```
