## Delete Stream

**delete** `/accounts/{account_id}/pipelines/v1/streams/{stream_id}`

Delete Stream in Account.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

- `stream_id: string`

  Specifies the public ID of the stream.

### Query Parameters

- `force: optional string`

  Deprecated: Delete stream forcefully, including deleting any dependent pipelines.

### Returns

- `result: unknown`

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/streams/$STREAM_ID \
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
