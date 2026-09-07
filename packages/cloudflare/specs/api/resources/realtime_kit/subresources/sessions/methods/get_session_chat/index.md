## Fetch all chat messages of a session

**get** `/accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/chat`

Returns a URL to download all chat messages of the session ID in CSV format.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `session_id: string`

### Returns

- `data: optional object { chat_download_url, chat_download_url_expiry }`

  - `chat_download_url: string`

    URL where the chat logs can be downloaded

  - `chat_download_url_expiry: string`

    Time when the download URL will expire

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/$SESSION_ID/chat \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "chat_download_url": "chat_download_url",
    "chat_download_url_expiry": "chat_download_url_expiry"
  },
  "success": true
}
```
