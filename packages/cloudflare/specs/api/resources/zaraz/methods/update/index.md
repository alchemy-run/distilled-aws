## Update Zaraz workflow

**put** `/zones/{zone_id}/settings/zaraz/workflow`

Updates Zaraz workflow for a zone.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `workflow: Workflow`

  Zaraz workflow.

  - `"realtime"`

  - `"preview"`

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

- `result: Workflow`

  Zaraz workflow.

  - `"realtime"`

  - `"preview"`

- `success: boolean`

  Whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/zaraz/workflow \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '"realtime"'
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
  "result": "realtime",
  "success": true
}
```
