## Update URL Normalization settings

**put** `/zones/{zone_id}/url_normalization`

Updates the URL Normalization settings.

### Path Parameters

- `zone_id: string`

  The unique ID of the zone.

### Body Parameters

- `scope: "incoming" or "both" or "none"`

  The scope of the URL normalization.

  - `"incoming"`

  - `"both"`

  - `"none"`

- `type: "cloudflare" or "rfc3986"`

  The type of URL normalization performed by Cloudflare.

  - `"cloudflare"`

  - `"rfc3986"`

### Returns

- `errors: array of object { message, code, source }`

  A list of error messages.

  - `message: string`

    A text description of this message.

  - `code: optional number`

    A unique code for this message.

  - `source: optional object { pointer }`

    The source of this message.

    - `pointer: string`

      A JSON pointer to the field that is the source of the message.

- `messages: array of object { message, code, source }`

  A list of warning messages.

  - `message: string`

    A text description of this message.

  - `code: optional number`

    A unique code for this message.

  - `source: optional object { pointer }`

    The source of this message.

    - `pointer: string`

      A JSON pointer to the field that is the source of the message.

- `result: object { scope, type }`

  A result.

  - `scope: "incoming" or "both" or "none"`

    The scope of the URL normalization.

    - `"incoming"`

    - `"both"`

    - `"none"`

  - `type: "cloudflare" or "rfc3986"`

    The type of URL normalization performed by Cloudflare.

    - `"cloudflare"`

    - `"rfc3986"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/url_normalization \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "scope": "incoming",
          "type": "cloudflare"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "messages": [
    {
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "result": {
    "scope": "incoming",
    "type": "cloudflare"
  },
  "success": true
}
```
