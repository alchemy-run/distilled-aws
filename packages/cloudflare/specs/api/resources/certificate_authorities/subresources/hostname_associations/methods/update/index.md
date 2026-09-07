## Replace Hostname Associations

**put** `/zones/{zone_id}/certificate_authorities/hostname_associations`

Replace Hostname Associations.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `hostnames: optional array of HostnameAssociation`

- `mtls_certificate_id: optional string`

  The UUID for a certificate that was uploaded to the mTLS Certificate Management endpoint. If no mtls_certificate_id is given, the hostnames will be associated to your active Cloudflare Managed CA.

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

- `result: optional object { hostnames }`

  - `hostnames: optional array of HostnameAssociation`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/certificate_authorities/hostname_associations \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "hostnames": [
      "api.example.com"
    ]
  }
}
```
