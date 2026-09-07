# Workflow

## Get Zaraz workflow

**get** `/zones/{zone_id}/settings/zaraz/workflow`

Gets Zaraz workflow for a zone.

### Path Parameters

- `zone_id: string`

  Identifier.

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
  "result": "realtime",
  "success": true
}
```

## Domain Types

### Workflow

- `Workflow = "realtime" or "preview"`

  Zaraz workflow.

  - `"realtime"`

  - `"preview"`
