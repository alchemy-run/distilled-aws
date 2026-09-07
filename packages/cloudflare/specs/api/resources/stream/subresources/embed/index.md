# Embed

## Retrieve embed Code HTML

**get** `/accounts/{account_id}/stream/{identifier}/embed`

Fetches an HTML code snippet to embed a video in a web page delivered through Cloudflare. On success, returns an HTML fragment for use on web pages to display a video. On failure, returns a JSON response body.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `identifier: string`

  A Cloudflare-generated unique identifier for a media item.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/embed \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Domain Types

### Embed Get Response

- `EmbedGetResponse = string`
