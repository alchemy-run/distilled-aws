## Get Zero Trust certificate configuration

**get** `/accounts/{account_id}/gateway/configuration/custom_certificate`

Retrieve the current Zero Trust certificate configuration.

### Path Parameters

- `account_id: string`

### Returns

- `CustomCertificateSettings object { enabled, id, binding_status, updated_at }`

  Specify custom certificate settings for BYO-PKI. This field is deprecated; use `certificate` instead.

  - `enabled: boolean`

    Specify whether to enable a custom certificate authority for signing Gateway traffic.

  - `id: optional string`

    Specify the UUID of the certificate (ID from MTLS certificate store).

  - `binding_status: optional string`

    Indicate the internal certificate status.

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/configuration/custom_certificate \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "enabled": true,
  "id": "d1b364c5-1311-466e-a194-f0e943e0799f",
  "binding_status": "pending_deployment",
  "updated_at": "2019-12-27T18:11:19.117Z"
}
```
