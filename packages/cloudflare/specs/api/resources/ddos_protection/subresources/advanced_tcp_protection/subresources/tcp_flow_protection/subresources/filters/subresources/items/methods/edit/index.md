## Update TCP Flow Protection filter.

**patch** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters/{filter_id}`

Update a TCP Flow Protection filter specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `filter_id: string`

  UUID.

### Body Parameters

- `expression: optional string`

  The new filter expression. Optional.

- `mode: optional string`

  The new mode for the filter. Optional. Must be one of 'enabled', 'disabled', 'monitoring'.

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

- `result: optional object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters/$FILTER_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }"
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
    "created_on": "2019-12-27T18:11:19.117Z",
    "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z"
  }
}
```
