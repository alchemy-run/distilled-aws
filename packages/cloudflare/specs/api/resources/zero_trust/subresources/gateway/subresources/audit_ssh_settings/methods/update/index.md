## Update Zero Trust SSH settings

**put** `/accounts/{account_id}/gateway/audit_ssh_settings`

Update Zero Trust Audit SSH and SSH with Access for Infrastructure settings for an account.

### Path Parameters

- `account_id: string`

### Body Parameters

- `public_key: string`

  Provide the Base64-encoded HPKE public key that encrypts SSH session logs. See https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/use-cases/ssh/ssh-infrastructure-access/#enable-ssh-command-logging.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional GatewaySettings`

  - `created_at: optional string`

  - `public_key: optional string`

    Provide the Base64-encoded HPKE public key that encrypts SSH session logs. See https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/use-cases/ssh/ssh-infrastructure-access/#enable-ssh-command-logging.

  - `seed_id: optional string`

    Identify the seed ID.

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/audit_ssh_settings \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "public_key": "1pyl6I1tL7xfJuFYVzXlUW8uXXlpxegHXBzGCBKaSFA="
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
    "created_at": "2014-01-01T05:20:00.12345Z",
    "public_key": "1pyl6I1tL7xfJuFYVzXlUW8uXXlpxegHXBzGCBKaSFA=",
    "seed_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```
