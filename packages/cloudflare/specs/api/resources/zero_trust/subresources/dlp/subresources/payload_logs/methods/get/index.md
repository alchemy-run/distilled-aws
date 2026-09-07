## Get payload log settings

**get** `/accounts/{account_id}/dlp/payload_log`

Gets the current payload logging configuration for DLP, showing whether matched content is being logged.

### Path Parameters

- `account_id: string`

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

- `result: optional object { updated_at, masking_level, public_key }`

  - `updated_at: string`

  - `masking_level: optional "full" or "partial" or "clear" or "default"`

    Masking level for payload logs.

    - `full`: The entire payload is masked.
    - `partial`: Only partial payload content is masked.
    - `clear`: No masking is applied to the payload content.
    - `default`: DLP uses its default masking behavior.

    - `"full"`

    - `"partial"`

    - `"clear"`

    - `"default"`

  - `public_key: optional string`

    Base64-encoded public key for encrypting payload logs. Null when payload logging is disabled.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/payload_log \
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
    "updated_at": "2019-12-27T18:11:19.117Z",
    "masking_level": "full",
    "public_key": "public_key"
  }
}
```
