## Enable Email Routing

**post** `/zones/{zone_id}/email/routing/enable`

Enable you Email Routing zone. Add and lock the necessary MX and SPF records.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `body: unknown`

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

- `result: optional Settings`

  - `id: string`

    Email Routing settings identifier.

  - `enabled: true or false`

    State of the zone settings for Email Routing.

    - `true`

    - `false`

  - `name: string`

    Domain of your zone.

  - `created: optional string`

    The date and time the settings have been created.

  - `modified: optional string`

    The date and time the settings have been modified.

  - `skip_wizard: optional true or false`

    Flag to check if the user skipped the configuration wizard.

    - `true`

    - `false`

  - `status: optional "ready" or "unconfigured" or "misconfigured" or 2 more`

    Show the state of your account, and the type or configuration error.

    - `"ready"`

    - `"unconfigured"`

    - `"misconfigured"`

    - `"misconfigured/locked"`

    - `"unlocked"`

  - `support_subaddress: optional true or false`

    Whether subaddressing (plus-addressing) is honored when matching incoming mail against routing rules.

    - `true`

    - `false`

  - `tag: optional string`

    Email Routing settings tag. (Deprecated, replaced by Email Routing settings identifier)

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/enable \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{}'
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
    "id": "75610dab9e69410a82cf7e400a09ecec",
    "enabled": true,
    "name": "example.net",
    "created": "2014-01-02T02:20:00Z",
    "modified": "2014-01-02T02:20:00Z",
    "skip_wizard": true,
    "status": "ready",
    "support_subaddress": true,
    "tag": "75610dab9e69410a82cf7e400a09ecec"
  }
}
```
