# Publish

## Publish Zaraz preview configuration

**post** `/zones/{zone_id}/settings/zaraz/publish`

Publish current Zaraz preview configuration for a zone.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `body: optional string`

  Zaraz configuration description.

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

- `result: string`

- `success: boolean`

  Whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/zaraz/publish \
    -X POST \
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
  "result": "Config has been published successfully",
  "success": true
}
```

## Domain Types

### Publish Create Response

- `PublishCreateResponse = string`
