## SSL Verification Details

**get** `/zones/{zone_id}/ssl/verification`

Get SSL Verification Info for a Zone.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `retry: optional true`

  Immediately retry SSL Verification.

  - `true`

### Returns

- `result: optional array of Verification`

  - `certificate_status: "initializing" or "authorizing" or "active" or 4 more`

    Current status of certificate.

    - `"initializing"`

    - `"authorizing"`

    - `"active"`

    - `"expired"`

    - `"issuing"`

    - `"timing_out"`

    - `"pending_deployment"`

  - `brand_check: optional boolean`

    Certificate Authority is manually reviewing the order.

  - `cert_pack_uuid: optional string`

    Certificate Pack UUID.

  - `signature: optional "ECDSAWithSHA256" or "SHA1WithRSA" or "SHA256WithRSA"`

    Certificate's signature algorithm.

    - `"ECDSAWithSHA256"`

    - `"SHA1WithRSA"`

    - `"SHA256WithRSA"`

  - `validation_method: optional ValidationMethod`

    Validation method in use for a certificate pack order.

    - `"http"`

    - `"cname"`

    - `"txt"`

  - `verification_info: optional object { record_name, record_target }`

    Certificate's required verification information.

    - `record_name: optional "record_name" or "http_url" or "cname" or "txt_name"`

      Name of CNAME record.

      - `"record_name"`

      - `"http_url"`

      - `"cname"`

      - `"txt_name"`

    - `record_target: optional "record_value" or "http_body" or "cname_target" or "txt_value"`

      Target of CNAME record.

      - `"record_value"`

      - `"http_body"`

      - `"cname_target"`

      - `"txt_value"`

  - `verification_status: optional boolean`

    Status of the required verification information, omitted if verification status is unknown.

  - `verification_type: optional "cname" or "meta tag"`

    Method of verification.

    - `"cname"`

    - `"meta tag"`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/verification \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "certificate_status": "active",
      "brand_check": false,
      "cert_pack_uuid": "a77f8bd7-3b47-46b4-a6f1-75cf98109948",
      "signature": "ECDSAWithSHA256",
      "validation_method": "txt",
      "verification_info": {
        "record_name": "record_name",
        "record_target": "record_value"
      },
      "verification_status": true,
      "verification_type": "cname"
    }
  ]
}
```
