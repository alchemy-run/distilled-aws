## Get an mTLS certificate

**get** `/{accounts_or_zones}/{account_or_zone_id}/access/certificates/{certificate_id}`

Fetches a single mTLS certificate.

### Path Parameters

- `certificate_id: string`

  UUID.

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

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

- `result: optional Certificate`

  - `id: optional string`

    The ID of the application that will use this certificate.

  - `associated_hostnames: optional array of AssociatedHostnames`

    The hostnames of the applications that will use this certificate.

  - `expires_on: optional string`

  - `fingerprint: optional string`

    The MD5 fingerprint of the certificate.

  - `name: optional string`

    The name of the certificate.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/certificates/$CERTIFICATE_ID \
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
  "success": true,
  "result": {
    "id": "id",
    "associated_hostnames": [
      "admin.example.com"
    ],
    "created_at": "2014-01-01T05:20:00.12345Z",
    "expires_on": "2014-01-01T05:20:00.12345Z",
    "fingerprint": "MD5 Fingerprint=1E:80:0F:7A:FD:31:55:96:DE:D5:CB:E2:F0:91:F6:91",
    "name": "Allow devs",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```
