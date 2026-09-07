## Delete a MCP Portal

**delete** `/accounts/{account_id}/access/ai-controls/mcp/portals/{id}`

Deletes an MCP portal from the account.

### Path Parameters

- `account_id: string`

- `id: string`

  portal id

### Returns

- `result: object { id, hostname, name, 7 more }`

  - `id: string`

    portal id

  - `hostname: string`

  - `name: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/ai-controls/mcp/portals/$ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "my-mcp-portal",
    "hostname": "exmaple.com",
    "name": "My MCP Portal",
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
