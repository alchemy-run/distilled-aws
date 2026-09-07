## Revoke Certificate

**delete** `/certificates/{certificate_id}`

Revoke an existing Origin CA certificate by its serial number. You can use an Origin CA Key as your User Service Key or an API token when calling this endpoint ([see above](#requests)).

### Path Parameters

- `certificate_id: string`

  Identifier.

### Returns

- `result: optional object { id, revoked_at }`

  - `id: optional string`

    Identifier.

  - `revoked_at: optional string`

    When the certificate was revoked.

### Example

```http
curl https://api.cloudflare.com/client/v4/certificates/$CERTIFICATE_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "revoked_at": "2024-09-06T18:43:47.928893Z"
  }
}
```
