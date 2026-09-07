## Get a target by ID.

**get** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/list/{target_id}`

Returns the debuggable target with the given ID.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID.

- `target_id: string`

  Target ID.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/json/list/$TARGET_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "id": "id",
  "type": "type",
  "url": "url",
  "description": "description",
  "devtoolsFrontendUrl": "devtoolsFrontendUrl",
  "title": "title",
  "webSocketDebuggerUrl": "webSocketDebuggerUrl"
}
```
