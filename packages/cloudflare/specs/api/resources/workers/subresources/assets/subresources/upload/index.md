# Upload

## Upload Assets

**post** `/accounts/{account_id}/workers/assets/upload`

Upload assets ahead of creating a Worker version.  To learn more about the direct uploads of assets, see https://developers.cloudflare.com/workers/static-assets/direct-upload/.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `base64: true`

  Whether the file contents are base64-encoded. Must be `true`.

  - `true`

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

- `result: optional object { jwt }`

  - `jwt: optional string`

    A "completion" JWT which can be redeemed when creating a Worker version.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/assets/upload \
    -H 'Content-Type: multipart/form-data' \
    -F body='{"foo":"string"}'
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
    "jwt": "jwt"
  }
}
```

## Domain Types

### Upload Create Response

- `UploadCreateResponse object { jwt }`

  - `jwt: optional string`

    A "completion" JWT which can be redeemed when creating a Worker version.
