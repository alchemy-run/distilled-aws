# Verification

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

## Edit SSL Certificate Pack Validation Method

**patch** `/zones/{zone_id}/ssl/verification/{certificate_pack_id}`

Edit SSL validation method for a certificate pack. A PATCH request will request an immediate validation check on any certificate, and return the updated status. If a validation method is provided, the validation will be immediately attempted using that method.

### Path Parameters

- `zone_id: string`

  Identifier.

- `certificate_pack_id: string`

  Certificate Pack UUID.

### Body Parameters

- `validation_method: "http" or "cname" or "txt" or "email"`

  Desired validation method.

  - `"http"`

  - `"cname"`

  - `"txt"`

  - `"email"`

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

- `result: optional object { status, validation_method }`

  - `status: optional string`

    Result status.

  - `validation_method: optional "http" or "cname" or "txt" or "email"`

    Desired validation method.

    - `"http"`

    - `"cname"`

    - `"txt"`

    - `"email"`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/verification/$CERTIFICATE_PACK_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "validation_method": "txt"
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
    "status": "pending_validation",
    "validation_method": "txt"
  }
}
```

## Domain Types

### Verification

- `Verification object { certificate_status, brand_check, cert_pack_uuid, 5 more }`

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

### Verification Get Response

- `VerificationGetResponse = array of Verification`

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

### Verification Edit Response

- `VerificationEditResponse object { status, validation_method }`

  - `status: optional string`

    Result status.

  - `validation_method: optional "http" or "cname" or "txt" or "email"`

    Desired validation method.

    - `"http"`

    - `"cname"`

    - `"txt"`

    - `"email"`
