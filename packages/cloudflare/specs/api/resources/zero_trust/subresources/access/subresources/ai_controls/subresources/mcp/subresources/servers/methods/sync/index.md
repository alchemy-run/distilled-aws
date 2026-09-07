## Sync MCP Server Capabilities

**post** `/accounts/{account_id}/access/ai-controls/mcp/servers/{id}/sync`

Syncs an MCP server's capabilities and returns the updated server state, including any connection errors.

### Path Parameters

- `account_id: string`

- `id: string`

  portal id

### Returns

- `result: object { error, error_details, status }`

  - `error: optional string`

  - `error_details: optional object { cause, is_upstream, mcp_code, 2 more }`

    - `cause: optional string`

      Underlying error message

    - `is_upstream: optional boolean`

      True = MCP server returned an error. False = couldn't reach the server

    - `mcp_code: optional number`

      MCP protocol error code

    - `retryable: optional boolean`

      Whether the error is transient and worth retrying

    - `status_code: optional number`

      HTTP status code from the server

  - `status: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/ai-controls/mcp/servers/$ID/sync \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "error": "error",
    "error_details": {
      "cause": "cause",
      "is_upstream": true,
      "mcp_code": 0,
      "retryable": true,
      "status_code": 0
    },
    "status": "status"
  },
  "success": true
}
```
