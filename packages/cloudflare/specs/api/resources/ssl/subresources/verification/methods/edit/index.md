## Edit SSL Certificate Pack Validation Method

**patch** `/zones/{zone_id}/ssl/verification/{certificate_pack_id}`

Edit SSL validation method for a certificate pack. A PATCH request will request an immediate validation check on any certificate, and return the updated status. If a validation method is provided, the validation will be immediately attempted using that method.

### Path Parameters

- `zone_id: string`

  Identifier.

- `certificate_pack_id: string`

  Certificate Pack UUID.

### Body Parameters

- `validation_method: "http" or "cname" or "txt" or "email"`

  Desired validation method.

  - `"http"`

  - `"cname"`

  - `"txt"`

  - `"email"`

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

- `result: optional object { status, validation_method }`

  - `status: optional string`

    Result status.

  - `validation_method: optional "http" or "cname" or "txt" or "email"`

    Desired validation method.

    - `"http"`

    - `"cname"`

    - `"txt"`

    - `"email"`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/verification/$CERTIFICATE_PACK_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "validation_method": "txt"
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
    "status": "pending_validation",
    "validation_method": "txt"
  }
}
```
