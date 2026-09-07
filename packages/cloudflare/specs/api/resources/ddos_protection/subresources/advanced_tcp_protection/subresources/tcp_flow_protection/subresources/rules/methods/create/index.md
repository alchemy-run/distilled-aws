## Create TCP Flow Protection rule.

**post** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules`

Create a TCP Flow Protection rule for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `burst_sensitivity: string`

  The burst sensitivity. Must be one of 'low', 'medium', 'high'.

- `mode: string`

  The mode for the TCP Flow Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

- `name: string`

  The name of the TCP Flow Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

- `rate_sensitivity: string`

  The rate sensitivity. Must be one of 'low', 'medium', 'high'.

- `scope: string`

  The scope for the TCP Flow Protection rule.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { id, burst_sensitivity, created_on, 5 more }`

  - `id: string`

    The unique ID of the TCP Flow Protection rule.

  - `burst_sensitivity: string`

    The burst sensitivity. Must be one of 'low', 'medium', 'high'.

  - `created_on: string`

    The creation timestamp of the TCP Flow Protection rule.

  - `mode: string`

    The mode for TCP Flow Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the TCP Flow Protection rule.

  - `name: string`

    The name of the TCP Flow Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

  - `rate_sensitivity: string`

    The rate sensitivity. Must be one of 'low', 'medium', 'high'.

  - `scope: string`

    The scope for the TCP Flow Protection rule. Must be one of 'global', 'region', or 'datacenter'.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "burst_sensitivity": "burst_sensitivity",
          "mode": "mode",
          "name": "name",
          "rate_sensitivity": "rate_sensitivity",
          "scope": "scope"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "id",
    "burst_sensitivity": "burst_sensitivity",
    "created_on": "2019-12-27T18:11:19.117Z",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "rate_sensitivity": "rate_sensitivity",
    "scope": "scope"
  }
}
```
