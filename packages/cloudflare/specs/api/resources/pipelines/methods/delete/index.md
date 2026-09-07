## [DEPRECATED] Delete Pipeline

**delete** `/accounts/{account_id}/pipelines/{pipeline_name}`

[DEPRECATED] Delete a pipeline. Use the new /pipelines/v1/pipelines endpoint instead.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

- `pipeline_name: string`

  Defines the name of the pipeline.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/$PIPELINE_NAME \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
