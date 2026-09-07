## Create TSIG

**post** `/accounts/{account_id}/secondary_dns/tsigs`

Create TSIG.

### Path Parameters

- `account_id: string`

### Body Parameters

- `algo: string`

  TSIG algorithm.

- `name: string`

  TSIG key name.

- `secret: string`

  TSIG secret.

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

- `result: optional TSIG`

  - `id: string`

  - `algo: string`

    TSIG algorithm.

  - `name: string`

    TSIG key name.

  - `secret: string`

    TSIG secret.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secondary_dns/tsigs \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "algo": "hmac-sha512.",
          "name": "tsig.customer.cf.",
          "secret": "caf79a7804b04337c9c66ccd7bef9190a1e1679b5dd03d8aa10f7ad45e1a9dab92b417896c15d4d007c7c14194538d2a5d0feffdecc5a7f0e1c570cfa700837c"
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
    "id": "69cd1e104af3e6ed3cb344f263fd0d5a",
    "algo": "hmac-sha512.",
    "name": "tsig.customer.cf.",
    "secret": "caf79a7804b04337c9c66ccd7bef9190a1e1679b5dd03d8aa10f7ad45e1a9dab92b417896c15d4d007c7c14194538d2a5d0feffdecc5a7f0e1c570cfa700837c"
  }
}
```
