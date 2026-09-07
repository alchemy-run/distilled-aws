# Preview

## Get email preview

**get** `/accounts/{account_id}/email-security/investigate/{investigate_id}/preview`

Returns a preview of the message body as a base64 encoded PNG image for non-benign messages.

### Path Parameters

- `account_id: string`

  Identifier.

- `investigate_id: string`

  Unique identifier for a message retrieved from investigation

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

- `result: object { screenshot }`

  - `screenshot: string`

    A base64 encoded PNG image of the email.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/$INVESTIGATE_ID/preview \
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
  "result": {
    "screenshot": "screenshot"
  },
  "success": true
}
```

## Preview for non-detection messages

**post** `/accounts/{account_id}/email-security/investigate/preview`

Generates a preview image for a message that was not flagged as a detection. Useful for investigating benign messages. Returns a base64-encoded PNG screenshot of the email body.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `postfix_id: string`

  The identifier of the message

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

- `result: object { screenshot }`

  - `screenshot: string`

    A base64 encoded PNG image of the email.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/preview \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "postfix_id": "4Njp3P0STMz2c02Q"
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
  "result": {
    "screenshot": "screenshot"
  },
  "success": true
}
```

## Domain Types

### Preview Get Response

- `PreviewGetResponse object { screenshot }`

  - `screenshot: string`

    A base64 encoded PNG image of the email.

### Preview Create Response

- `PreviewCreateResponse object { screenshot }`

  - `screenshot: string`

    A base64 encoded PNG image of the email.
