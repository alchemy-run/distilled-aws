# Targets

## Open a new browser tab.

**put** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/new`

Opens a new tab in the browser. Optionally specify a URL to navigate to.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID.

### Query Parameters

- `liveViewUrlExpiresInMs: optional number`

  How long the live view URL remains valid, in milliseconds (max 60 minutes)

- `url: optional string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/json/new \
    -X PUT \
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

## Activate a browser target.

**get** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/activate/{target_id}`

Activates (brings to front) a specific browser target by its ID.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID.

- `target_id: string`

  Target ID to activate.

### Returns

- `message: string`

  Target activated.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/json/activate/$TARGET_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "message": "message"
}
```

## Close a browser target.

**get** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/close/{target_id}`

Closes a specific browser target (tab, page, etc.) by its ID. Returns 'Target is closing' on success or an error if the target is not found.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID.

- `target_id: string`

  Target ID to close.

### Returns

- `message: string`

  Target is closing.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/json/close/$TARGET_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "message": "message"
}
```

## Domain Types

### Target Create Response

- `TargetCreateResponse object { id, type, url, 4 more }`

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

### Target List Response

- `TargetListResponse = array of object { id, type, url, 4 more }`

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

### Target Get Response

- `TargetGetResponse object { id, type, url, 4 more }`

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

### Target Activate Response

- `TargetActivateResponse object { message }`

  - `message: string`

    Target activated.

### Target Close Response

- `TargetCloseResponse object { message }`

  - `message: string`

    Target is closing.
