## Billing Profile Details

**get** `/accounts/{account_id}/billing/profile`

Gets the current billing profile for the account.

### Path Parameters

- `account_id: string`

  Identifier

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

- `result: object { id, account_type, address, 36 more }`

  - `id: optional string`

    Billing item identifier tag.

  - `account_type: optional string`

  - `address: optional string`

  - `address2: optional string`

  - `balance: optional string`

  - `card_expiry_month: optional number`

  - `card_expiry_year: optional number`

  - `card_number: optional string`

  - `city: optional string`

  - `company: optional string`

  - `country: optional string`

  - `created_on: optional string`

  - `device_data: optional string`

  - `edited_on: optional string`

  - `enterprise_billing_email: optional string`

  - `enterprise_primary_email: optional string`

  - `first_name: optional string`

  - `is_partner: optional boolean`

  - `last_name: optional string`

  - `next_bill_date: optional string`

  - `payment_address: optional string`

  - `payment_address2: optional string`

  - `payment_city: optional string`

  - `payment_country: optional string`

  - `payment_email: optional string`

  - `payment_first_name: optional string`

  - `payment_gateway: optional string`

  - `payment_last_name: optional string`

  - `payment_nonce: optional string`

  - `payment_state: optional string`

  - `payment_zipcode: optional string`

  - `primary_email: optional string`

  - `state: optional string`

  - `tax_id_type: optional string`

  - `telephone: optional string`

  - `use_legacy: optional boolean`

  - `validation_code: optional string`

  - `vat: optional string`

  - `zipcode: optional string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/billing/profile \
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
  "result": {
    "id": "b69a9f3492637782896352daae219e7d",
    "account_type": "type",
    "address": "123 Main Street",
    "address2": "Apt 1",
    "balance": "0",
    "card_expiry_month": 12,
    "card_expiry_year": 2099,
    "card_number": "4242424242424242",
    "city": "Anytown",
    "company": "Company",
    "country": "Anycountry",
    "created_on": "2014-03-01T12:21:59.3456Z",
    "device_data": "sample_data",
    "edited_on": "2014-03-01T12:21:59.3456Z",
    "enterprise_billing_email": "johndoe@gmail.com",
    "enterprise_primary_email": "johndoe@gmail.com",
    "first_name": "John",
    "is_partner": false,
    "last_name": "Doe",
    "next_bill_date": "2014-03-01T12:21:59.3456Z",
    "payment_address": "123 Main Street",
    "payment_address2": "Apt 1",
    "payment_city": "Anytown",
    "payment_country": "Anycountry",
    "payment_email": "johndoe@gmail.com",
    "payment_first_name": "John",
    "payment_gateway": "gateway",
    "payment_last_name": "Doe",
    "payment_nonce": "abc123",
    "payment_state": "state",
    "payment_zipcode": "12345",
    "primary_email": "johndoe@gmail.com",
    "state": "AnyState",
    "tax_id_type": "type",
    "telephone": "1234567899",
    "use_legacy": false,
    "validation_code": "1111",
    "vat": "GB123456789",
    "zipcode": "12345"
  },
  "success": true
}
```
