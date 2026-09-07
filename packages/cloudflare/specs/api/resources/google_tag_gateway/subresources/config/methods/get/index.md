## Get Google Tag Gateway configuration

**get** `/zones/{zone_id}/settings/google-tag-gateway/config`

Gets the Google Tag Gateway configuration for a zone.

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

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional Config`

  Google Tag Gateway configuration for a zone.

  - `enabled: boolean`

    Enables or disables Google Tag Gateway for this zone.

  - `endpoint: string`

    Specifies the endpoint path for proxying Google Tag Manager requests. Use an absolute path starting with '/', with no nested paths and alphanumeric characters only (e.g. /metrics).

  - `hideOriginalIp: boolean`

    Hides the original client IP address from Google when enabled.

  - `measurementId: string`

    Specify the Google Tag Manager container or measurement ID (e.g. GTM-XXXXXXX or G-XXXXXXXXXX).

  - `setUpTag: optional boolean`

    Set up the associated Google Tag on the zone automatically when enabled.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/google-tag-gateway/config \
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
    "enabled": true,
    "endpoint": "/metrics",
    "hideOriginalIp": true,
    "measurementId": "GTM-P2F3N47Q",
    "setUpTag": true
  }
}
```
