## List domains

**get** `/accounts/{account_id}/registrar/domains`

List domains handled by Registrar.

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

- `result: array of Domain`

  - `id: optional string`

    Domain identifier.

  - `available: optional boolean`

    Shows if a domain is available for transferring into Cloudflare Registrar.

  - `can_register: optional boolean`

    Indicates if the domain can be registered as a new domain.

  - `created_at: optional string`

    Shows time of creation.

  - `current_registrar: optional string`

    Shows name of current registrar.

  - `expires_at: optional string`

    Shows when domain name registration expires.

  - `locked: optional boolean`

    Shows whether a registrar lock is in place for a domain.

  - `registrant_contact: optional object { address, city, country, 10 more }`

    Shows contact information for domain registrant.

    - `address: string`

      Address.

    - `city: string`

      City.

    - `country: string`

      The country in which the user lives.

    - `first_name: string`

      User's first name

    - `last_name: string`

      User's last name

    - `organization: string`

      Name of organization.

    - `phone: string`

      User's telephone number

    - `state: string`

      State.

    - `zip: string`

      The zipcode or postal code where the user lives.

    - `id: optional string`

      Contact Identifier.

    - `address2: optional string`

      Optional address line for unit, floor, suite, etc.

    - `email: optional string`

      The contact email address of the user.

    - `fax: optional string`

      Contact fax number.

  - `registry_statuses: optional string`

    A comma-separated list of registry status codes. A full list of status codes can be found at [EPP Status Codes](https://www.icann.org/resources/pages/epp-status-codes-2014-06-16-en).

  - `supported_tld: optional boolean`

    Whether a particular TLD is currently supported by Cloudflare Registrar. Refer to [TLD Policies](https://www.cloudflare.com/tld-policies/) for a list of supported TLDs.

  - `transfer_in: optional object { accept_foa, approve_transfer, can_cancel_transfer, 3 more }`

    Statuses for domain transfers into Cloudflare Registrar.

    - `accept_foa: optional "needed" or "ok"`

      Form of authorization has been accepted by the registrant.

      - `"needed"`

      - `"ok"`

    - `approve_transfer: optional "needed" or "ok" or "pending" or 3 more`

      Shows transfer status with the registry.

      - `"needed"`

      - `"ok"`

      - `"pending"`

      - `"trying"`

      - `"rejected"`

      - `"unknown"`

    - `can_cancel_transfer: optional boolean`

      Indicates if cancellation is still possible.

    - `disable_privacy: optional "needed" or "ok" or "unknown"`

      Privacy guards are disabled at the foreign registrar.

      - `"needed"`

      - `"ok"`

      - `"unknown"`

    - `enter_auth_code: optional "needed" or "ok" or "pending" or 2 more`

      Auth code has been entered and verified.

      - `"needed"`

      - `"ok"`

      - `"pending"`

      - `"trying"`

      - `"rejected"`

    - `unlock_domain: optional "needed" or "ok" or "pending" or 2 more`

      Domain is unlocked at the foreign registrar.

      - `"needed"`

      - `"ok"`

      - `"pending"`

      - `"trying"`

      - `"unknown"`

  - `updated_at: optional string`

    Last updated.

- `success: true`

  Whether the API call was successful

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/domains \
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
  "result": [
    {
      "id": "ea95132c15732412d22c1476fa83f27a",
      "available": false,
      "can_register": false,
      "created_at": "2018-08-28T17:26:26Z",
      "current_registrar": "Cloudflare",
      "expires_at": "2019-08-28T23:59:59Z",
      "locked": false,
      "registrant_contact": {
        "address": "123 Sesame St.",
        "city": "Austin",
        "country": "US",
        "first_name": "John",
        "last_name": "Appleseed",
        "organization": "Cloudflare, Inc.",
        "phone": "+1 123-123-1234",
        "state": "TX",
        "zip": "12345",
        "id": "ea95132c15732412d22c1476fa83f27a",
        "address2": "Suite 430",
        "email": "user@example.com",
        "fax": "123-867-5309"
      },
      "registry_statuses": "ok,serverTransferProhibited",
      "supported_tld": true,
      "transfer_in": {
        "accept_foa": "needed",
        "approve_transfer": "unknown",
        "can_cancel_transfer": true,
        "disable_privacy": "ok",
        "enter_auth_code": "needed",
        "unlock_domain": "ok"
      },
      "updated_at": "2018-08-28T17:26:26Z"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```
