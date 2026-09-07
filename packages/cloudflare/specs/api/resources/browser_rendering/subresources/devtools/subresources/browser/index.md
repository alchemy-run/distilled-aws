# Browser

## Get a browser session ID.

**post** `/accounts/{account_id}/browser-rendering/devtools/browser`

Acquires a browser and returns its session ID and websocket URL.

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `keep_alive: optional number`

  Keep-alive time in milliseconds.

- `lab: optional boolean`

  Use experimental browser.

- `liveViewUrlExpiresInMs: optional number`

  How long the live view URL remains valid, in milliseconds (max 60 minutes). Only used when targets is true.

- `recording: optional boolean`

- `targets: optional boolean`

  Include browser targets in response.

### Returns

- `sessionId: string`

  Browser session ID.

- `webSocketDebuggerUrl: optional string`

  WebSocket URL for the session.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "sessionId": "sessionId",
  "webSocketDebuggerUrl": "webSocketDebuggerUrl"
}
```

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

## Connect to browser session.

**get** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}`

Establishes a WebSocket connection to an existing browser session.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID to connect to.

### Query Parameters

- `keep_alive: optional number`

  Keep-alive time in ms (only valid when acquiring new session).

- `lab: optional boolean`

  Use experimental browser.

- `recording: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Close browser session.

**delete** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}`

Closes an existing browser session.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID to close.

### Returns

- `status: "closing" or "closed"`

  - `"closing"`

  - `"closed"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "status": "closing"
}
```

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

## Get Chrome DevTools Protocol schema.

**get** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/protocol`

Returns the complete Chrome DevTools Protocol schema including all domains, commands, events, and types. This schema describes the entire CDP API surface.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID.

### Returns

- `domains: array of object { domain, commands, dependencies, 3 more }`

  List of protocol domains.

  - `domain: string`

    Domain name.

  - `commands: optional array of map[unknown]`

    Available commands.

  - `dependencies: optional array of string`

    Domain dependencies.

  - `events: optional array of map[unknown]`

    Available events.

  - `experimental: optional boolean`

    Whether this domain is experimental.

  - `types: optional array of map[unknown]`

    Type definitions.

- `version: optional object { major, minor }`

  Protocol version.

  - `major: string`

    Major version.

  - `minor: string`

    Minor version.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/json/protocol \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "domains": [
    {
      "domain": "domain",
      "commands": [
        {
          "foo": {}
        }
      ],
      "dependencies": [
        "string"
      ],
      "events": [
        {
          "foo": {}
        }
      ],
      "experimental": true,
      "types": [
        {
          "foo": {}
        }
      ]
    }
  ],
  "version": {
    "major": "major",
    "minor": "minor"
  }
}
```

## Domain Types

### Browser Create Response

- `BrowserCreateResponse object { sessionId, webSocketDebuggerUrl }`

  - `sessionId: string`

    Browser session ID.

  - `webSocketDebuggerUrl: optional string`

    WebSocket URL for the session.

### Browser Delete Response

- `BrowserDeleteResponse object { status }`

  - `status: "closing" or "closed"`

    - `"closing"`

    - `"closed"`

### Browser Version Response

- `BrowserVersionResponse object { Browser, "Protocol-Version", "User-Agent", 3 more }`

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

### Browser Protocol Response

- `BrowserProtocolResponse object { domains, version }`

  - `domains: array of object { domain, commands, dependencies, 3 more }`

    List of protocol domains.

    - `domain: string`

      Domain name.

    - `commands: optional array of map[unknown]`

      Available commands.

    - `dependencies: optional array of string`

      Domain dependencies.

    - `events: optional array of map[unknown]`

      Available events.

    - `experimental: optional boolean`

      Whether this domain is experimental.

    - `types: optional array of map[unknown]`

      Type definitions.

  - `version: optional object { major, minor }`

    Protocol version.

    - `major: string`

      Major version.

    - `minor: string`

      Minor version.

# Page

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
