# Reclassify

## Change email classification

**post** `/accounts/{account_id}/email-security/investigate/{investigate_id}/reclassify`

Submits a request to reclassify an email's disposition. Use for reporting false positives or false negatives. Optionally provide the raw EML content for reanalysis. The reclassification is processed asynchronously.

### Path Parameters

- `account_id: string`

  Identifier.

- `investigate_id: string`

  Unique identifier for a message retrieved from investigation

### Body Parameters

- `expected_disposition: "NONE" or "BULK" or "MALICIOUS" or 3 more`

  - `"NONE"`

  - `"BULK"`

  - `"MALICIOUS"`

  - `"SPAM"`

  - `"SPOOF"`

  - `"SUSPICIOUS"`

- `eml_content: optional string`

  Base64 encoded content of the EML file.

- `escalated_submission_id: optional string`

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

- `result: unknown`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/$INVESTIGATE_ID/reclassify \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "expected_disposition": "NONE"
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
  "result": {},
  "success": true
}
```

## Domain Types

### Reclassify Create Response

- `ReclassifyCreateResponse = unknown`
