## Upload a Finetune Asset

**post** `/accounts/{account_id}/ai/finetunes/{finetune_id}/finetune-assets`

Uploads training data assets for a Workers AI fine-tuning job.

### Path Parameters

- `account_id: string`

- `finetune_id: string`

### Returns

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/finetunes/$FINETUNE_ID/finetune-assets \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F 'file=@/path/to/file' \
    -F file_name=file_name
```

#### Response

```json
{
  "success": true
}
```
