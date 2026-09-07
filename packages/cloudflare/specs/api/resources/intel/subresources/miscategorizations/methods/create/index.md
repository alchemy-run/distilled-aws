## Create Miscategorization

**post** `/accounts/{account_id}/intel/miscategorization`

Allows you to submit requests to change a domain’s category.

Requests that include category `169` (New Domains) or category `177` (Newly Seen)
in any of `content_adds`, `content_removes`, `security_adds`, or `security_removes`
will be rejected with a `400 Bad Request`. These categories are automatically
managed and fall off 30 days after they are applied.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `content_adds: optional array of number`

  Content category IDs to add.

- `content_removes: optional array of number`

  Content category IDs to remove.

- `indicator_type: optional "domain" or "ipv4" or "ipv6" or "url"`

  - `"domain"`

  - `"ipv4"`

  - `"ipv6"`

  - `"url"`

- `ip: optional string`

  Provide only if indicator_type is `ipv4` or `ipv6`.

- `security_adds: optional array of number`

  Security category IDs to add.

- `security_removes: optional array of number`

  Security category IDs to remove.

- `url: optional string`

  Provide only if indicator_type is `domain` or `url`. Example if indicator_type is `domain`: `example.com`. Example if indicator_type is `url`: `https://example.com/news/`.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/miscategorization \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "content_adds": [
            82
          ],
          "content_removes": [
            155
          ],
          "indicator_type": "domain",
          "security_adds": [
            117,
            131
          ],
          "security_removes": [
            83
          ]
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
  "success": true
}
```
