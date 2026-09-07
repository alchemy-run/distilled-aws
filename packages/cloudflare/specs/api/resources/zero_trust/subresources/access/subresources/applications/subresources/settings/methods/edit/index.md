## Update Access application settings

**patch** `/{accounts_or_zones}/{account_or_zone_id}/access/apps/{app_id}/settings`

Updates Access application settings.

### Path Parameters

- `app_id: AppID`

  Identifier.

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `allow_iframe: optional boolean`

  Enables loading application content in an iFrame.

- `skip_interstitial: optional boolean`

  Enables automatic authentication through cloudflared.

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

- `result: optional object { allow_iframe, skip_interstitial }`

  - `allow_iframe: optional boolean`

    Enables loading application content in an iFrame.

  - `skip_interstitial: optional boolean`

    Enables automatic authentication through cloudflared.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/apps/$APP_ID/settings \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "allow_iframe": true,
          "skip_interstitial": true
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
    "allow_iframe": true,
    "skip_interstitial": true
  }
}
```
