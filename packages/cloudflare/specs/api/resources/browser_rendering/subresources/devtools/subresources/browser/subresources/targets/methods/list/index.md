## List targets.

**get** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/list`

Returns a list of all debuggable targets including tabs, pages, service workers, and other browser contexts.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID.

### Query Parameters

- `liveViewUrlExpiresInMs: optional number`

  How long the live view URLs remain valid, in milliseconds (max 60 minutes)

### Returns

- `id: string`

  Target ID.

- `type: string`

  Target type (page, background_page, worker, etc.).

- `url: string`

  URL of the target.

- `description: optional string`

  Target description.

- `devtoolsFrontendUrl: optional string`

  DevTools frontend URL.

- `title: optional string`

  Title of the target.

- `webSocketDebuggerUrl: optional string`

  WebSocket URL for debugging this target.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/json/list \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
[
  {
    "id": "id",
    "type": "type",
    "url": "url",
    "description": "description",
    "devtoolsFrontendUrl": "devtoolsFrontendUrl",
    "title": "title",
    "webSocketDebuggerUrl": "webSocketDebuggerUrl"
  }
]
```
