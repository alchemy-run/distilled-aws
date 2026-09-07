## Update Route

**put** `/zones/{zone_id}/workers/routes/{route_id}`

Updates the URL pattern or Worker associated with a route.

### Path Parameters

- `zone_id: string`

  Identifier.

- `route_id: string`

  Identifier.

### Body Parameters

- `pattern: string`

  Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior).

- `script: optional string`

  Name of the script to run if the route matches.

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

- `result: object { id, pattern, script }`

  - `id: string`

    Identifier.

  - `pattern: string`

    Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior).

  - `script: optional string`

    Name of the script to run if the route matches.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/workers/routes/$ROUTE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "pattern": "example.com/*",
          "script": "my-workers-script"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "pattern": "example.com/*",
    "script": "my-workers-script"
  },
  "success": true
}
```
