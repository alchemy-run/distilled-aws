# Whois

## Get WHOIS Record

**get** `/accounts/{account_id}/intel/whois`

Retrieves WHOIS registration data for a domain, including registrant and nameserver information.

### Path Parameters

- `account_id: string`

  Use to uniquely identify or reference the resource.

### Query Parameters

- `domain: optional string`

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

  Returns a boolean for the success/failure of the API call.

  - `true`

- `result: optional object { dnssec, domain, extension, 84 more }`

  - `dnssec: boolean`

  - `domain: string`

  - `extension: string`

  - `found: boolean`

  - `nameservers: array of string`

  - `punycode: string`

  - `registrant: string`

  - `registrar: string`

  - `id: optional string`

  - `administrative_city: optional string`

  - `administrative_country: optional string`

  - `administrative_email: optional string`

  - `administrative_fax: optional string`

  - `administrative_fax_ext: optional string`

  - `administrative_id: optional string`

  - `administrative_name: optional string`

  - `administrative_org: optional string`

  - `administrative_phone: optional string`

  - `administrative_phone_ext: optional string`

  - `administrative_postal_code: optional string`

  - `administrative_province: optional string`

  - `administrative_referral_url: optional string`

  - `administrative_street: optional string`

  - `billing_city: optional string`

  - `billing_country: optional string`

  - `billing_email: optional string`

  - `billing_fax: optional string`

  - `billing_fax_ext: optional string`

  - `billing_id: optional string`

  - `billing_name: optional string`

  - `billing_org: optional string`

  - `billing_phone: optional string`

  - `billing_phone_ext: optional string`

  - `billing_postal_code: optional string`

  - `billing_province: optional string`

  - `billing_referral_url: optional string`

  - `billing_street: optional string`

  - `created_date: optional string`

  - `created_date_raw: optional string`

  - `expiration_date: optional string`

  - `expiration_date_raw: optional string`

  - `registrant_city: optional string`

  - `registrant_country: optional string`

  - `registrant_email: optional string`

  - `registrant_fax: optional string`

  - `registrant_fax_ext: optional string`

  - `registrant_id: optional string`

  - `registrant_name: optional string`

  - `registrant_org: optional string`

  - `registrant_phone: optional string`

  - `registrant_phone_ext: optional string`

  - `registrant_postal_code: optional string`

  - `registrant_province: optional string`

  - `registrant_referral_url: optional string`

  - `registrant_street: optional string`

  - `registrar_city: optional string`

  - `registrar_country: optional string`

  - `registrar_email: optional string`

  - `registrar_fax: optional string`

  - `registrar_fax_ext: optional string`

  - `registrar_id: optional string`

  - `registrar_name: optional string`

  - `registrar_org: optional string`

  - `registrar_phone: optional string`

  - `registrar_phone_ext: optional string`

  - `registrar_postal_code: optional string`

  - `registrar_province: optional string`

  - `registrar_referral_url: optional string`

  - `registrar_street: optional string`

  - `status: optional array of string`

  - `technical_city: optional string`

  - `technical_country: optional string`

  - `technical_email: optional string`

  - `technical_fax: optional string`

  - `technical_fax_ext: optional string`

  - `technical_id: optional string`

  - `technical_name: optional string`

  - `technical_org: optional string`

  - `technical_phone: optional string`

  - `technical_phone_ext: optional string`

  - `technical_postal_code: optional string`

  - `technical_province: optional string`

  - `technical_referral_url: optional string`

  - `technical_street: optional string`

  - `updated_date: optional string`

  - `updated_date_raw: optional string`

  - `whois_server: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/whois \
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
    "dnssec": true,
    "domain": "cloudflare.com",
    "extension": "com",
    "found": true,
    "nameservers": [
      "ns3.cloudflare.com",
      "ns4.cloudflare.com",
      "ns5.cloudflare.com",
      "ns6.cloudflare.com",
      "ns7.cloudflare.com"
    ],
    "punycode": "cloudflare.com",
    "registrant": "registrant",
    "registrar": "Cloudflare, Inc.",
    "id": "1542998887_DOMAIN_COM-VRSN",
    "administrative_city": "administrative_city",
    "administrative_country": "administrative_country",
    "administrative_email": "administrative_email",
    "administrative_fax": "administrative_fax",
    "administrative_fax_ext": "administrative_fax_ext",
    "administrative_id": "administrative_id",
    "administrative_name": "administrative_name",
    "administrative_org": "administrative_org",
    "administrative_phone": "administrative_phone",
    "administrative_phone_ext": "administrative_phone_ext",
    "administrative_postal_code": "administrative_postal_code",
    "administrative_province": "administrative_province",
    "administrative_referral_url": "administrative_referral_url",
    "administrative_street": "administrative_street",
    "billing_city": "billing_city",
    "billing_country": "billing_country",
    "billing_email": "billing_email",
    "billing_fax": "billing_fax",
    "billing_fax_ext": "billing_fax_ext",
    "billing_id": "billing_id",
    "billing_name": "billing_name",
    "billing_org": "billing_org",
    "billing_phone": "billing_phone",
    "billing_phone_ext": "billing_phone_ext",
    "billing_postal_code": "billing_postal_code",
    "billing_province": "billing_province",
    "billing_referral_url": "billing_referral_url",
    "billing_street": "billing_street",
    "created_date": "2009-02-17T22:07:54.000Z",
    "created_date_raw": "2009-02-17T22:07:54Z",
    "expiration_date": "2033-02-17T22:07:54.000Z",
    "expiration_date_raw": "2033-02-17T22:07:54Z",
    "registrant_city": "registrant_city",
    "registrant_country": "registrant_country",
    "registrant_email": "registrant_email",
    "registrant_fax": "registrant_fax",
    "registrant_fax_ext": "registrant_fax_ext",
    "registrant_id": "registrant_id",
    "registrant_name": "registrant_name",
    "registrant_org": "registrant_org",
    "registrant_phone": "registrant_phone",
    "registrant_phone_ext": "registrant_phone_ext",
    "registrant_postal_code": "registrant_postal_code",
    "registrant_province": "registrant_province",
    "registrant_referral_url": "registrant_referral_url",
    "registrant_street": "registrant_street",
    "registrar_city": "registrar_city",
    "registrar_country": "registrar_country",
    "registrar_email": "registrar_email",
    "registrar_fax": "registrar_fax",
    "registrar_fax_ext": "registrar_fax_ext",
    "registrar_id": "registrar_id",
    "registrar_name": "registrar_name",
    "registrar_org": "registrar_org",
    "registrar_phone": "registrar_phone",
    "registrar_phone_ext": "registrar_phone_ext",
    "registrar_postal_code": "registrar_postal_code",
    "registrar_province": "registrar_province",
    "registrar_referral_url": "registrar_referral_url",
    "registrar_street": "registrar_street",
    "status": [
      "clientdeleteprohibited",
      "clienttransferprohibited",
      "clientupdateprohibited",
      "serverdeleteprohibited",
      "servertransferprohibited",
      "serverupdateprohibited"
    ],
    "technical_city": "technical_city",
    "technical_country": "technical_country",
    "technical_email": "technical_email",
    "technical_fax": "technical_fax",
    "technical_fax_ext": "technical_fax_ext",
    "technical_id": "technical_id",
    "technical_name": "technical_name",
    "technical_org": "technical_org",
    "technical_phone": "technical_phone",
    "technical_phone_ext": "technical_phone_ext",
    "technical_postal_code": "technical_postal_code",
    "technical_province": "technical_province",
    "technical_referral_url": "technical_referral_url",
    "technical_street": "technical_street",
    "updated_date": "2024-01-09T16:45:28.000Z",
    "updated_date_raw": "2024-01-09T16:45:28Z",
    "whois_server": "whois.cloudflare.com"
  }
}
```

## Domain Types

### Whois

- `Whois object { created_date, domain, nameservers, 6 more }`

  - `created_date: optional string`

  - `domain: optional string`

  - `nameservers: optional array of string`

  - `registrant: optional string`

  - `registrant_country: optional string`

  - `registrant_email: optional string`

  - `registrant_org: optional string`

  - `registrar: optional string`

  - `updated_date: optional string`

### Whois Get Response

- `WhoisGetResponse object { dnssec, domain, extension, 84 more }`

  - `dnssec: boolean`

  - `domain: string`

  - `extension: string`

  - `found: boolean`

  - `nameservers: array of string`

  - `punycode: string`

  - `registrant: string`

  - `registrar: string`

  - `id: optional string`

  - `administrative_city: optional string`

  - `administrative_country: optional string`

  - `administrative_email: optional string`

  - `administrative_fax: optional string`

  - `administrative_fax_ext: optional string`

  - `administrative_id: optional string`

  - `administrative_name: optional string`

  - `administrative_org: optional string`

  - `administrative_phone: optional string`

  - `administrative_phone_ext: optional string`

  - `administrative_postal_code: optional string`

  - `administrative_province: optional string`

  - `administrative_referral_url: optional string`

  - `administrative_street: optional string`

  - `billing_city: optional string`

  - `billing_country: optional string`

  - `billing_email: optional string`

  - `billing_fax: optional string`

  - `billing_fax_ext: optional string`

  - `billing_id: optional string`

  - `billing_name: optional string`

  - `billing_org: optional string`

  - `billing_phone: optional string`

  - `billing_phone_ext: optional string`

  - `billing_postal_code: optional string`

  - `billing_province: optional string`

  - `billing_referral_url: optional string`

  - `billing_street: optional string`

  - `created_date: optional string`

  - `created_date_raw: optional string`

  - `expiration_date: optional string`

  - `expiration_date_raw: optional string`

  - `registrant_city: optional string`

  - `registrant_country: optional string`

  - `registrant_email: optional string`

  - `registrant_fax: optional string`

  - `registrant_fax_ext: optional string`

  - `registrant_id: optional string`

  - `registrant_name: optional string`

  - `registrant_org: optional string`

  - `registrant_phone: optional string`

  - `registrant_phone_ext: optional string`

  - `registrant_postal_code: optional string`

  - `registrant_province: optional string`

  - `registrant_referral_url: optional string`

  - `registrant_street: optional string`

  - `registrar_city: optional string`

  - `registrar_country: optional string`

  - `registrar_email: optional string`

  - `registrar_fax: optional string`

  - `registrar_fax_ext: optional string`

  - `registrar_id: optional string`

  - `registrar_name: optional string`

  - `registrar_org: optional string`

  - `registrar_phone: optional string`

  - `registrar_phone_ext: optional string`

  - `registrar_postal_code: optional string`

  - `registrar_province: optional string`

  - `registrar_referral_url: optional string`

  - `registrar_street: optional string`

  - `status: optional array of string`

  - `technical_city: optional string`

  - `technical_country: optional string`

  - `technical_email: optional string`

  - `technical_fax: optional string`

  - `technical_fax_ext: optional string`

  - `technical_id: optional string`

  - `technical_name: optional string`

  - `technical_org: optional string`

  - `technical_phone: optional string`

  - `technical_phone_ext: optional string`

  - `technical_postal_code: optional string`

  - `technical_province: optional string`

  - `technical_referral_url: optional string`

  - `technical_street: optional string`

  - `updated_date: optional string`

  - `updated_date_raw: optional string`

  - `whois_server: optional string`
