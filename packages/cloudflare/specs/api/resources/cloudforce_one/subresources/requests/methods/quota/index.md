## Get Request Quota

**get** `/accounts/{account_id}/cloudforce-one/requests/quota`

Retrieves quota usage for Cloudforce One standard requests.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: optional Quota`

  - `anniversary_date: optional string`

    Anniversary date is when annual quota limit is refreshed.

  - `quarter_anniversary_date: optional string`

    Quarter anniversary date is when quota limit is refreshed each quarter.

  - `quota: optional number`

    Tokens for the quarter.

  - `remaining: optional number`

    Tokens remaining for the quarter.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/quota \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "anniversary_date": "2022-04-01T00:00:00Z",
    "quarter_anniversary_date": "2022-04-01T00:00:00Z",
    "quota": 120,
    "remaining": 64
  }
}
```
