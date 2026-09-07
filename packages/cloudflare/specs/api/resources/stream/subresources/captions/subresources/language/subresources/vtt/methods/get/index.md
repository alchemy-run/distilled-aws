## Return WebVTT captions for a provided language

**get** `/accounts/{account_id}/stream/{identifier}/captions/{language}/vtt`

Return WebVTT captions for a provided language.

### Path Parameters

- `account_id: string`

  Identifier.

- `identifier: string`

  A Cloudflare-generated unique identifier for a media item.

- `language: string`

  The language tag in BCP 47 format.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/captions/$LANGUAGE/vtt \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
