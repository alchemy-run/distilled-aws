## Create a sending subdomain

**post** `/zones/{zone_id}/email/sending/subdomains`

Creates a new sending subdomain or re-enables sending on an existing subdomain that had it disabled. If zone-level Email Sending has not been enabled yet, the zone flag is automatically set when the entitlement is present.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `name: string`

  The subdomain name. Must be within the zone.

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

- `result: optional object { enabled, name, tag, 5 more }`

  - `enabled: boolean`

    Whether Email Sending is enabled on this subdomain.

  - `name: string`

    The subdomain domain name.

  - `tag: string`

    Sending subdomain identifier.

  - `created: optional string`

    The date and time the destination address has been created.

  - `dkim_selector: optional string`

    The DKIM selector used for email signing.

  - `modified: optional string`

    The date and time the destination address was last modified.

  - `preview_enabled: optional boolean`

    Whether sent messages from this subdomain can be previewed in the activity log.

  - `return_path_domain: optional string`

    The return-path domain used for bounce handling.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/sending/subdomains \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "name": "sub.example.com"
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
    "enabled": true,
    "name": "sub.example.com",
    "tag": "aabbccdd11223344aabbccdd11223344",
    "created": "2014-01-02T02:20:00Z",
    "dkim_selector": "cf-bounce",
    "modified": "2014-01-02T02:20:00Z",
    "preview_enabled": true,
    "return_path_domain": "cf-bounce.sub.example.com"
  }
}
```
