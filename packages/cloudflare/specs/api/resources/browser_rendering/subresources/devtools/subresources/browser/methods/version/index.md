## Get browser version metadata.

**get** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/version`

Get browser version metadata.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID.

### Returns

- `Browser: string`

  Browser name and version.

- `"Protocol-Version": string`

  Chrome DevTools Protocol version.

- `"User-Agent": string`

  User agent string.

- `"V8-Version": string`

  V8 JavaScript engine version.

- `"WebKit-Version": string`

  WebKit version.

- `webSocketDebuggerUrl: string`

  WebSocket URL for debugging the browser.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/json/version \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "Browser": "Browser",
  "Protocol-Version": "Protocol-Version",
  "User-Agent": "User-Agent",
  "V8-Version": "V8-Version",
  "WebKit-Version": "WebKit-Version",
  "webSocketDebuggerUrl": "webSocketDebuggerUrl"
}
```
