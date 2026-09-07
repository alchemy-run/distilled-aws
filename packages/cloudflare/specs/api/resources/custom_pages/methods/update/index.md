## Update a custom page

**put** `/{accounts_or_zones}/{account_or_zone_id}/custom_pages/{identifier}`

Updates the configuration of an existing custom page.

### Path Parameters

- `identifier: "1000_errors" or "500_errors" or "basic_challenge" or 7 more`

  Error Page Types

  - `"1000_errors"`

  - `"500_errors"`

  - `"basic_challenge"`

  - `"country_challenge"`

  - `"ip_block"`

  - `"managed_challenge"`

  - `"ratelimit_block"`

  - `"under_attack"`

  - `"waf_block"`

  - `"waf_challenge"`

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `state: "default" or "customized"`

  The custom page state.

  - `"default"`

  - `"customized"`

- `url: string`

  The URL associated with the custom page.

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

- `result: optional object { id, created_on, description, 5 more }`

  - `id: optional string`

  - `created_on: optional string`

  - `description: optional string`

  - `modified_on: optional string`

  - `preview_target: optional string`

  - `required_tokens: optional array of string`

  - `state: optional "default" or "customized"`

    The custom page state.

    - `"default"`

    - `"customized"`

  - `url: optional string`

    The URL associated with the custom page.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/custom_pages/$IDENTIFIER \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "state": "default",
          "url": "http://www.example.com"
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
    "id": "basic_challenge",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "description": "Basic Challenge",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "preview_target": "block:basic-sec-captcha",
    "required_tokens": [
      "::CAPTCHA_BOX::"
    ],
    "state": "default",
    "url": "http://www.example.com"
  }
}
```
