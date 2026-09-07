## Partially update DLP account-level settings.

**patch** `/accounts/{account_id}/dlp/settings`

Missing fields keep their existing values.

### Path Parameters

- `account_id: string`

### Body Parameters

- `ai_context_analysis: optional boolean`

  Whether AI context analysis is enabled at the account level.

- `ocr: optional boolean`

  Whether OCR is enabled at the account level.

- `payload_logging: optional object { masking_level, public_key }`

  Request model for payload log settings within the DLP settings endpoint.
  Unlike the legacy endpoint, null and missing are treated identically here
  (both mean "not provided" for PATCH, "reset to default" for PUT).

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

    Base64-encoded public key for encrypting payload logs.

    - Set to a non-empty base64 string to enable payload logging with the given key.
    - Set to an empty string to disable payload logging.
    - Omit or set to null to leave unchanged (PATCH) or reset to disabled (PUT).

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

- `result: optional DLPSettings`

  DLP account-level settings response.

  - `ai_context_analysis: boolean`

    Whether AI context analysis is enabled at the account level.

  - `ocr: boolean`

    Whether OCR is enabled at the account level.

  - `payload_logging: object { updated_at, masking_level, public_key }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/settings \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
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
    "ai_context_analysis": true,
    "ocr": true,
    "payload_logging": {
      "updated_at": "2019-12-27T18:11:19.117Z",
      "masking_level": "full",
      "public_key": "public_key"
    }
  }
}
```
