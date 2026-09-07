## Update a filter

**put** `/zones/{zone_id}/filters/{filter_id}`

Updates an existing filter.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

- `filter_id: string`

  The unique identifier of the filter.

### Body Parameters

- `description: optional string`

  An informative summary of the filter.

- `expression: optional string`

  The filter expression. For more information, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/).

- `paused: optional boolean`

  When true, indicates that the filter is currently paused.

- `ref: optional string`

  A short reference tag. Allows you to select related filters.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: FirewallFilter`

  - `id: optional string`

    The unique identifier of the filter.

  - `description: optional string`

    An informative summary of the filter.

  - `expression: optional string`

    The filter expression. For more information, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/).

  - `paused: optional boolean`

    When true, indicates that the filter is currently paused.

  - `ref: optional string`

    A short reference tag. Allows you to select related filters.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/filters/$FILTER_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "description": "Restrict access from these browsers on this address range.",
          "expression": "(http.request.uri.path ~ \\".*wp-login.php\\" or http.request.uri.path ~ \\".*xmlrpc.php\\") and ip.addr ne 172.16.22.155",
          "ref": "FIL-100"
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
  "result": {
    "id": "372e67954025e0ba6aaa6d586b9e0b61",
    "description": "Restrict access from these browsers on this address range.",
    "expression": "(http.request.uri.path ~ \".*wp-login.php\" or http.request.uri.path ~ \".*xmlrpc.php\") and ip.addr ne 172.16.22.155",
    "paused": false,
    "ref": "FIL-100"
  },
  "success": true
}
```
