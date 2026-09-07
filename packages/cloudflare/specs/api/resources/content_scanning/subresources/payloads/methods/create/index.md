## Add Custom Scan Expressions

**post** `/zones/{zone_id}/content-upload-scan/payloads`

Add custom scan expressions for Content Scanning.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

### Body Parameters

- `body: array of object { payload }`

  - `payload: string`

    Defines the ruleset expression to use in matching content objects.

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

- `result: array of object { id, payload }`

  - `id: optional string`

    defines the unique ID for this custom scan expression.

  - `payload: optional string`

    Defines the ruleset expression to use in matching content objects.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/content-upload-scan/payloads \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "payload": "lookup_json_string(http.request.body.raw, \\"file\\")"
          }
        ]'
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
  "result": [
    {
      "id": "a350a054caa840c9becd89c3b4f0195b",
      "payload": "lookup_json_string(http.request.body.raw, \"file\")"
    }
  ],
  "success": true
}
```
