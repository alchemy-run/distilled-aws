## Download current certificate in PEM format

**get** `/accounts/{account_id}/access/saml_certificates/{saml_cert_set_id}/pem`

Downloads the current SAML encryption certificate's public key in PEM format for the specified certificate set. This endpoint is useful for providing the certificate to Identity Providers for SAML assertion encryption configuration.

### Path Parameters

- `account_id: string`

  Identifier.

- `saml_cert_set_id: string`

  UUID.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/saml_certificates/$SAML_CERT_SET_ID/pem \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
