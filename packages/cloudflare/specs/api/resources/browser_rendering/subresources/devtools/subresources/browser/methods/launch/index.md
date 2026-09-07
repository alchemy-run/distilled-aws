## Acquire and connect to browser session.

**get** `/accounts/{account_id}/browser-rendering/devtools/browser`

Acquires and establishes a WebSocket connection to a browser session.

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `keep_alive: optional number`

  Keep-alive time in ms (only valid when acquiring new session).

- `lab: optional boolean`

  Use experimental browser.

- `recording: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
