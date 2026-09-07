## Create a new MCP Portal

**post** `/accounts/{account_id}/access/ai-controls/mcp/portals`

Creates a new MCP portal for managing AI tool access through Cloudflare Access.

### Path Parameters

- `account_id: string`

### Body Parameters

- `id: string`

  portal id

- `hostname: string`

- `name: string`

- `allow_code_mode: optional boolean`

  Allow remote code execution in Dynamic Workers (beta)

- `description: optional string`

- `secure_web_gateway: optional boolean`

  Route outbound MCP traffic through Zero Trust Secure Web Gateway

- `servers: optional array of object { server_id, default_disabled, on_behalf, 2 more }`

  - `server_id: string`

    server id

  - `default_disabled: optional boolean`

  - `on_behalf: optional boolean`

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

### Returns

- `result: object { id, hostname, name, 8 more }`

  - `id: string`

    portal id

  - `hostname: string`

  - `name: string`

  - `servers: array of object { id, auth_type, hostname, 20 more }`

    - `id: string`

      server id

    - `auth_type: "oauth" or "bearer" or "unauthenticated"`

      - `"oauth"`

      - `"bearer"`

      - `"unauthenticated"`

    - `hostname: string`

    - `name: string`

    - `prompts: array of map[unknown]`

    - `server_id: string`

      server id

    - `tools: array of map[unknown]`

    - `created_at: optional string`

    - `created_by: optional string`

    - `default_disabled: optional boolean`

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

    - `on_behalf: optional boolean`

    - `secure_web_gateway: optional boolean`

      Route outbound traffic to this MCP server through Zero Trust Secure Web Gateway

    - `status: optional string`

    - `updated_prompts: optional array of object { name, enabled, portal_alias, 3 more }`

      - `name: string`

      - `enabled: optional boolean`

      - `portal_alias: optional string`

      - `portal_description: optional string`

      - `server_alias: optional string`

      - `server_description: optional string`

    - `updated_tools: optional array of object { name, enabled, portal_alias, 3 more }`

      - `name: string`

      - `enabled: optional boolean`

      - `portal_alias: optional string`

      - `portal_description: optional string`

      - `server_alias: optional string`

      - `server_description: optional string`

  - `allow_code_mode: optional boolean`

    Allow remote code execution in Dynamic Workers (beta)

  - `created_at: optional string`

  - `created_by: optional string`

  - `description: optional string`

  - `modified_at: optional string`

  - `modified_by: optional string`

  - `secure_web_gateway: optional boolean`

    Route outbound MCP traffic through Zero Trust Secure Web Gateway

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/ai-controls/mcp/portals \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "id": "my-mcp-portal",
          "hostname": "exmaple.com",
          "name": "My MCP Portal",
          "allow_code_mode": true,
          "description": "This is my custom MCP Portal"
        }'
```

#### Response

```json
{
  "result": {
    "id": "my-mcp-portal",
    "hostname": "exmaple.com",
    "name": "My MCP Portal",
    "servers": [
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
        "server_id": "my-mcp-server",
        "tools": [
          {
            "foo": "bar"
          }
        ],
        "created_at": "2019-12-27T18:11:19.117Z",
        "created_by": "created_by",
        "default_disabled": true,
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
        "on_behalf": true,
        "secure_web_gateway": false,
        "status": "status",
        "updated_prompts": [
          {
            "name": "name",
            "enabled": true,
            "portal_alias": "portal-tool-alias",
            "portal_description": "portal-level description",
            "server_alias": "server-tool-alias",
            "server_description": "server-level description"
          }
        ],
        "updated_tools": [
          {
            "name": "name",
            "enabled": true,
            "portal_alias": "portal-tool-alias",
            "portal_description": "portal-level description",
            "server_alias": "server-tool-alias",
            "server_description": "server-level description"
          }
        ]
      }
    ],
    "allow_code_mode": true,
    "created_at": "2019-12-27T18:11:19.117Z",
    "created_by": "created_by",
    "description": "This is my custom MCP Portal",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "modified_by": "modified_by",
    "secure_web_gateway": false
  },
  "success": true
}
```
