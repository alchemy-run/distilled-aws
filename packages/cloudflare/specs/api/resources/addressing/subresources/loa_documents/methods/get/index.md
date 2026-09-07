## Download LOA Document

**get** `/accounts/{account_id}/addressing/loa_documents/{loa_document_id}/download`

Download specified LOA document under the account.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `loa_document_id: string`

  Identifier for the uploaded LOA document.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/loa_documents/$LOA_DOCUMENT_ID/download \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```
