## Delete Sink

**delete** `/accounts/{account_id}/pipelines/v1/sinks/{sink_id}`

Delete Pipeline in Account.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

- `sink_id: string`

  Specifies the publid ID of the sink.

### Query Parameters

- `force: optional string`

  Deprecated: Delete sink forcefully, including deleting any dependent pipelines.

### Returns

- `result: unknown`

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/sinks/$SINK_ID \
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
