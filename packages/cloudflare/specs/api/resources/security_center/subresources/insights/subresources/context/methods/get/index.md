## Retrieves Security Center Insight Context

**get** `/accounts/{account_id}/security-center/insights/{issue_id}/context`

Returns the full context payload for an insight. This endpoint is used for insights with large payloads that are not included inline in the list response.

### Path Parameters

- `account_id: string`

  Identifier.

- `issue_id: string`

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

- `result: optional map[unknown]`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/security-center/insights/$ISSUE_ID/context \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "foo": "bar"
  }
}
```
