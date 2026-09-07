## Update Fallback Origin for Custom Hostnames

**put** `/zones/{zone_id}/custom_hostnames/fallback_origin`

Updates the fallback origin configuration for custom hostnames on a zone. Sets the default origin server for custom hostname traffic.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `origin: string`

  Your origin hostname that requests to your custom hostnames will be sent to.

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

- `result: optional object { created_at, errors, origin, 2 more }`

  - `created_at: optional string`

    This is the time the fallback origin was created.

  - `errors: optional array of string`

    These are errors that were encountered while trying to activate a fallback origin.

  - `origin: optional string`

    Your origin hostname that requests to your custom hostnames will be sent to.

  - `status: optional "initializing" or "pending_deployment" or "pending_deletion" or 3 more`

    Status of the fallback origin's activation.

    - `"initializing"`

    - `"pending_deployment"`

    - `"pending_deletion"`

    - `"active"`

    - `"deployment_timed_out"`

    - `"deletion_timed_out"`

  - `updated_at: optional string`

    This is the time the fallback origin was updated.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/fallback_origin \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "origin": "fallback.example.com"
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
  "success": true,
  "result": {
    "created_at": "2019-10-28T18:11:23.37411Z",
    "errors": [
      "DNS records are not setup correctly. Origin should be a proxied A/AAAA/CNAME dns record"
    ],
    "origin": "fallback.example.com",
    "status": "pending_deployment",
    "updated_at": "2020-03-16T18:11:23.531995Z"
  }
}
```
