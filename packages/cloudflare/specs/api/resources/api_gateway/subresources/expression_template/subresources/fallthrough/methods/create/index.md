## Generate fallthrough WAF expression template from a set of API hosts

**post** `/zones/{zone_id}/api_gateway/expression-template/fallthrough`

Creates an expression template fallthrough rule for API Shield. Used for configuring default behavior when no other expression templates match.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `hosts: array of string`

  List of hosts to be targeted in the expression

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { expression, title }`

  - `expression: string`

    WAF Expression for fallthrough

  - `title: string`

    Title for the expression

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/expression-template/fallthrough \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "hosts": [
            "{zone}.domain1.tld",
            "domain2.tld"
          ]
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
    "expression": "(cf.api_gateway.fallthrough_detected)",
    "title": "Fallthrough Expression for [zone.domain.tld]"
  },
  "success": true
}
```
