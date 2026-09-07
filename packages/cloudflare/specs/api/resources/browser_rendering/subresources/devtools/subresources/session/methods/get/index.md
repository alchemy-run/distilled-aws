## Get session details.

**get** `/accounts/{account_id}/browser-rendering/devtools/session/{session_id}`

Get details for a specific browser session.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Session ID.

### Returns

- `sessionId: string`

  Session ID.

- `closeReason: optional string`

  Reason for session closure.

- `closeReasonText: optional string`

  Human-readable close reason.

- `connectionEndTime: optional number`

  Connection end time.

- `connectionId: optional string`

  Connection ID.

- `connectionStartTime: optional number`

  Connection start time.

- `devtoolsFrontendUrl: optional string`

  DevTools frontend URL.

- `endTime: optional number`

  Session end time.

- `lastUpdated: optional number`

  Last updated timestamp.

- `startTime: optional number`

  Session start time.

- `webSocketDebuggerUrl: optional string`

  WebSocket URL for debugging this target.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/session/$SESSION_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "sessionId": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "closeReason": "closeReason",
  "closeReasonText": "closeReasonText",
  "connectionEndTime": 0,
  "connectionId": "connectionId",
  "connectionStartTime": 0,
  "devtoolsFrontendUrl": "devtoolsFrontendUrl",
  "endTime": 0,
  "lastUpdated": 0,
  "startTime": 0,
  "webSocketDebuggerUrl": "webSocketDebuggerUrl"
}
```
