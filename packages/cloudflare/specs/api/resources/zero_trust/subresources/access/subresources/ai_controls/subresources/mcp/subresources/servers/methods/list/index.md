## List MCP Servers

**get** `/accounts/{account_id}/access/ai-controls/mcp/servers`

Lists all MCP portals configured for the account.

### Path Parameters

- `account_id: string`

### Query Parameters

- `page: optional number`

- `per_page: optional number`

- `search: optional string`

  Search by id, name

### Returns

- `result: array of object { id, auth_type, hostname, 17 more }`

  - `id: string`

    server id

  - `auth_type: "oauth" or "bearer" or "unauthenticated"`

    - `"oauth"`

    - `"bearer"`

    - `"unauthenticated"`

  - `hostname: string`

  - `name: string`

  - `prompts: array of map[unknown]`

  - `tools: array of map[unknown]`

  - `created_at: optional string`

  - `created_by: optional string`

  - `description: optional string`

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

  - `is_shared_oauth_callback_enabled: optional boolean`

    When true, the gateway worker uses the shared Cloudflare-owned OAuth callback endpoint as the redirect_uri for upstream on-behalf OAuth, instead of the customer portal hostname. Defaults to false (off); opt in per server by setting true. Effective behavior is gated by the gateway worker's per-env rollout mode KV key.

  - `last_successful_sync: optional string`

  - `last_synced: optional string`

  - `modified_at: optional string`

  - `modified_by: optional string`

  - `secure_web_gateway: optional boolean`

    Route outbound traffic to this MCP server through Zero Trust Secure Web Gateway

  - `status: optional string`

  - `updated_prompts: optional array of object { name, alias, description, enabled }`

    - `name: string`

    - `alias: optional string`

    - `description: optional string`

    - `enabled: optional boolean`

  - `updated_tools: optional array of object { name, alias, description, enabled }`

    - `name: string`

    - `alias: optional string`

    - `description: optional string`

    - `enabled: optional boolean`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/ai-controls/mcp/servers \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "id": "my-mcp-server",
      "auth_type": "unauthenticated",
      "hostname": "https://example.com/mcp",
      "name": "My MCP Server",
      "prompts": [
        {
          "foo": "bar"
        }
      ],
      "tools": [
        {
          "foo": "bar"
        }
      ],
      "created_at": "2019-12-27T18:11:19.117Z",
      "created_by": "created_by",
      "description": "This is one remote mcp server",
      "error": "error",
      "error_details": {
        "cause": "cause",
        "is_upstream": true,
        "mcp_code": 0,
        "retryable": true,
        "status_code": 0
      },
      "is_shared_oauth_callback_enabled": true,
      "last_successful_sync": "2019-12-27T18:11:19.117Z",
      "last_synced": "2019-12-27T18:11:19.117Z",
      "modified_at": "2019-12-27T18:11:19.117Z",
      "modified_by": "modified_by",
      "secure_web_gateway": false,
      "status": "status",
      "updated_prompts": [
        {
          "name": "name",
          "alias": "my-custom-alias",
          "description": "description",
          "enabled": true
        }
      ],
      "updated_tools": [
        {
          "name": "name",
          "alias": "my-custom-alias",
          "description": "description",
          "enabled": true
        }
      ]
    }
  ],
  "success": true
}
```
