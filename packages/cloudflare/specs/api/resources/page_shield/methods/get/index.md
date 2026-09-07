## Get Page Shield settings

**get** `/zones/{zone_id}/page_shield`

Fetches the Page Shield settings.

### Path Parameters

- `zone_id: string`

  Identifier

### Returns

- `success: true`

  Whether the API call was successful

  - `true`

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: optional Setting`

  - `enabled: boolean`

    When true, indicates that Page Shield is enabled.

  - `updated_at: string`

    The timestamp of when Page Shield was last updated.

  - `use_cloudflare_reporting_endpoint: boolean`

    When true, CSP reports will be sent to https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report

  - `use_connection_url_path: boolean`

    When true, the paths associated with connections URLs will also be analyzed.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "success": true,
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
    "enabled": true,
    "updated_at": "2022-10-12T17:56:52.083582+01:00",
    "use_cloudflare_reporting_endpoint": true,
    "use_connection_url_path": true
  }
}
```
