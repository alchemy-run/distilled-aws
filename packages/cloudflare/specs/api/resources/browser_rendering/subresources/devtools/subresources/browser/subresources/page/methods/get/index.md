## Connect to a specific Chrome DevTools page.

**get** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/page/{target_id}`

Establishes a WebSocket connection to a specific Chrome DevTools target or page.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID.

- `target_id: string`

  Target ID, e.g. page ID.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/page/$TARGET_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
