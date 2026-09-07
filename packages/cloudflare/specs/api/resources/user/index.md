# User

## User Details

**get** `/user`

Retrieves detailed information about the currently authenticated user, including email, name, and account memberships.

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

- `result: optional object { id, email, betas, 12 more }`

  - `id: string`

    Identifier of the user.

  - `email: string`

    Current email address of the user.

  - `betas: optional array of string`

    Lists the betas that the user is participating in.

  - `country: optional string`

    The country in which the user lives.

  - `first_name: optional string`

    User's first name

  - `has_business_zones: optional boolean`

    Indicates whether user has any business zones

  - `has_enterprise_zones: optional boolean`

    Indicates whether user has any enterprise zones

  - `has_pro_zones: optional boolean`

    Indicates whether user has any pro zones

  - `last_name: optional string`

    User's last name

  - `organizations: optional array of Organization`

    - `id: optional string`

      Identifier

    - `name: optional string`

      Organization name.

    - `permissions: optional array of Permission`

      Access permissions for this User.

    - `roles: optional array of string`

      List of roles that a user has within an organization.

    - `status: optional Status`

      Whether the user is a member of the organization or has an invitation pending.

      - `"member"`

      - `"invited"`

  - `suspended: optional boolean`

    Indicates whether user has been suspended

  - `telephone: optional string`

    User's telephone number

  - `two_factor_authentication_enabled: optional boolean`

    Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.

  - `two_factor_authentication_locked: optional boolean`

    Indicates whether two-factor authentication is required by one of the accounts that the user is a member of.

  - `zipcode: optional string`

    The zipcode or postal code where the user lives.

### Example

```http
curl https://api.cloudflare.com/client/v4/user \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "id": "6d7f2f5f5b1d4a0e9081fdc98d432fd1",
    "email": "alice@example.com",
    "betas": [
      "zone_level_access_beta"
    ],
    "country": "US",
    "first_name": "John",
    "has_business_zones": true,
    "has_enterprise_zones": true,
    "has_pro_zones": true,
    "last_name": "Appleseed",
    "organizations": [
      {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "name": "Cloudflare, Inc.",
        "permissions": [
          "#zones:read"
        ],
        "roles": [
          "All Privileges - Super Administrator"
        ],
        "status": "member"
      }
    ],
    "suspended": true,
    "telephone": "+1 123-123-1234",
    "two_factor_authentication_enabled": true,
    "two_factor_authentication_locked": true,
    "zipcode": "12345"
  }
}
```

## Edit User

**patch** `/user`

Edit part of your user details.

### Body Parameters

- `country: optional string`

  The country in which the user lives.

- `first_name: optional string`

  User's first name

- `last_name: optional string`

  User's last name

- `telephone: optional string`

  User's telephone number

- `zipcode: optional string`

  The zipcode or postal code where the user lives.

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

- `result: optional object { id, email, betas, 12 more }`

  - `id: string`

    Identifier of the user.

  - `email: string`

    Current email address of the user.

  - `betas: optional array of string`

    Lists the betas that the user is participating in.

  - `country: optional string`

    The country in which the user lives.

  - `first_name: optional string`

    User's first name

  - `has_business_zones: optional boolean`

    Indicates whether user has any business zones

  - `has_enterprise_zones: optional boolean`

    Indicates whether user has any enterprise zones

  - `has_pro_zones: optional boolean`

    Indicates whether user has any pro zones

  - `last_name: optional string`

    User's last name

  - `organizations: optional array of Organization`

    - `id: optional string`

      Identifier

    - `name: optional string`

      Organization name.

    - `permissions: optional array of Permission`

      Access permissions for this User.

    - `roles: optional array of string`

      List of roles that a user has within an organization.

    - `status: optional Status`

      Whether the user is a member of the organization or has an invitation pending.

      - `"member"`

      - `"invited"`

  - `suspended: optional boolean`

    Indicates whether user has been suspended

  - `telephone: optional string`

    User's telephone number

  - `two_factor_authentication_enabled: optional boolean`

    Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.

  - `two_factor_authentication_locked: optional boolean`

    Indicates whether two-factor authentication is required by one of the accounts that the user is a member of.

  - `zipcode: optional string`

    The zipcode or postal code where the user lives.

### Example

```http
curl https://api.cloudflare.com/client/v4/user \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "country": "US",
          "first_name": "John",
          "last_name": "Appleseed",
          "telephone": "+1 123-123-1234",
          "zipcode": "12345"
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
    "id": "6d7f2f5f5b1d4a0e9081fdc98d432fd1",
    "email": "alice@example.com",
    "betas": [
      "zone_level_access_beta"
    ],
    "country": "US",
    "first_name": "John",
    "has_business_zones": true,
    "has_enterprise_zones": true,
    "has_pro_zones": true,
    "last_name": "Appleseed",
    "organizations": [
      {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "name": "Cloudflare, Inc.",
        "permissions": [
          "#zones:read"
        ],
        "roles": [
          "All Privileges - Super Administrator"
        ],
        "status": "member"
      }
    ],
    "suspended": true,
    "telephone": "+1 123-123-1234",
    "two_factor_authentication_enabled": true,
    "two_factor_authentication_locked": true,
    "zipcode": "12345"
  }
}
```

## Domain Types

### User Get Response

- `UserGetResponse object { id, email, betas, 12 more }`

  - `id: string`

    Identifier of the user.

  - `email: string`

    Current email address of the user.

  - `betas: optional array of string`

    Lists the betas that the user is participating in.

  - `country: optional string`

    The country in which the user lives.

  - `first_name: optional string`

    User's first name

  - `has_business_zones: optional boolean`

    Indicates whether user has any business zones

  - `has_enterprise_zones: optional boolean`

    Indicates whether user has any enterprise zones

  - `has_pro_zones: optional boolean`

    Indicates whether user has any pro zones

  - `last_name: optional string`

    User's last name

  - `organizations: optional array of Organization`

    - `id: optional string`

      Identifier

    - `name: optional string`

      Organization name.

    - `permissions: optional array of Permission`

      Access permissions for this User.

    - `roles: optional array of string`

      List of roles that a user has within an organization.

    - `status: optional Status`

      Whether the user is a member of the organization or has an invitation pending.

      - `"member"`

      - `"invited"`

  - `suspended: optional boolean`

    Indicates whether user has been suspended

  - `telephone: optional string`

    User's telephone number

  - `two_factor_authentication_enabled: optional boolean`

    Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.

  - `two_factor_authentication_locked: optional boolean`

    Indicates whether two-factor authentication is required by one of the accounts that the user is a member of.

  - `zipcode: optional string`

    The zipcode or postal code where the user lives.

### User Edit Response

- `UserEditResponse object { id, email, betas, 12 more }`

  - `id: string`

    Identifier of the user.

  - `email: string`

    Current email address of the user.

  - `betas: optional array of string`

    Lists the betas that the user is participating in.

  - `country: optional string`

    The country in which the user lives.

  - `first_name: optional string`

    User's first name

  - `has_business_zones: optional boolean`

    Indicates whether user has any business zones

  - `has_enterprise_zones: optional boolean`

    Indicates whether user has any enterprise zones

  - `has_pro_zones: optional boolean`

    Indicates whether user has any pro zones

  - `last_name: optional string`

    User's last name

  - `organizations: optional array of Organization`

    - `id: optional string`

      Identifier

    - `name: optional string`

      Organization name.

    - `permissions: optional array of Permission`

      Access permissions for this User.

    - `roles: optional array of string`

      List of roles that a user has within an organization.

    - `status: optional Status`

      Whether the user is a member of the organization or has an invitation pending.

      - `"member"`

      - `"invited"`

  - `suspended: optional boolean`

    Indicates whether user has been suspended

  - `telephone: optional string`

    User's telephone number

  - `two_factor_authentication_enabled: optional boolean`

    Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.

  - `two_factor_authentication_locked: optional boolean`

    Indicates whether two-factor authentication is required by one of the accounts that the user is a member of.

  - `zipcode: optional string`

    The zipcode or postal code where the user lives.

# Audit Logs

## Get user audit logs

**get** `/user/audit_logs`

Gets a list of audit logs for a user account. Can be filtered by who made the change, on which zone, and the timeframe of the change.

### Query Parameters

- `id: optional string`

  Finds a specific log by its ID.

- `action: optional object { type }`

  - `type: optional string`

    Filters by the action type.

- `actor: optional object { email, ip }`

  - `email: optional string`

    Filters by the email address of the actor that made the change.

  - `ip: optional string`

    Filters by the IP address of the request that made the change by specific IP address or valid CIDR Range.

- `before: optional string or string`

  Limits the returned results to logs older than the specified date. A `full-date` that conforms to RFC3339.

  - `FullDate = string`

    Limits the returned results to logs older than the specified date. A `full-date` that conforms to RFC3339.

  - `DateTime = string`

    Limits the returned results to logs older than the specified date. A `date-time` that conforms to RFC3339.

- `direction: optional "desc" or "asc"`

  Changes the direction of the chronological sorting.

  - `"desc"`

  - `"asc"`

- `export: optional boolean`

  Indicates that this request is an export of logs in CSV format.

- `hide_user_logs: optional boolean`

  Indicates whether or not to hide user level audit logs.

- `page: optional number`

  Defines which page of results to return.

- `per_page: optional number`

  Sets the number of results to return per page.

- `since: optional string or string`

  Limits the returned results to logs newer than the specified date. A `full-date` that conforms to RFC3339.

  - `FullDate = string`

    Limits the returned results to logs newer than the specified date. A `full-date` that conforms to RFC3339.

  - `DateTime = string`

    Limits the returned results to logs newer than the specified date. A `date-time` that conforms to RFC3339.

- `zone: optional object { name }`

  - `name: optional string`

    Filters by the name of the zone associated to the change.

### Returns

- `object { errors, messages, result, success }`

  - `errors: optional array of ResponseInfo`

    - `code: number`

    - `message: string`

    - `documentation_url: optional string`

    - `source: optional object { pointer }`

      - `pointer: optional string`

  - `messages: optional array of ResponseInfo`

    - `code: number`

    - `message: string`

    - `documentation_url: optional string`

    - `source: optional object { pointer }`

  - `result: optional array of AuditLog`

    - `id: optional string`

      A string that uniquely identifies the audit log.

    - `action: optional object { result, type }`

      - `result: optional boolean`

        A boolean that indicates if the action attempted was successful.

      - `type: optional string`

        A short string that describes the action that was performed.

    - `actor: optional object { id, email, ip, type }`

      - `id: optional string`

        The ID of the actor that performed the action. If a user performed the action, this will be their User ID.

      - `email: optional string`

        The email of the user that performed the action.

      - `ip: optional string`

        The IP address of the request that performed the action.

      - `type: optional "user" or "admin" or "Cloudflare"`

        The type of actor, whether a User, Cloudflare Admin, or an Automated System.

        - `"user"`

        - `"admin"`

        - `"Cloudflare"`

    - `interface: optional string`

      The source of the event.

    - `metadata: optional unknown`

      An object which can lend more context to the action being logged. This is a flexible value and varies between different actions.

    - `newValue: optional string`

      The new value of the resource that was modified.

    - `oldValue: optional string`

      The value of the resource before it was modified.

    - `owner: optional object { id }`

      - `id: optional string`

        Identifier

    - `resource: optional object { id, type }`

      - `id: optional string`

        An identifier for the resource that was affected by the action.

      - `type: optional string`

        A short string that describes the resource that was affected by the action.

    - `when: optional string`

      A UTC RFC3339 timestamp that specifies when the action being logged occured.

  - `success: optional boolean`

- `AaaAPIResponseCommon object { errors, messages, success }`

  - `errors: array of ResponseInfo`

    - `code: number`

    - `message: string`

    - `documentation_url: optional string`

    - `source: optional object { pointer }`

  - `messages: array of ResponseInfo`

    - `code: number`

    - `message: string`

    - `documentation_url: optional string`

    - `source: optional object { pointer }`

  - `success: true`

    Whether the API call was successful

    - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/user/audit_logs \
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
      "id": "d5b0f326-1232-4452-8858-1089bd7168ef",
      "action": {
        "result": true,
        "type": "change_setting"
      },
      "actor": {
        "id": "f6b5de0326bb5182b8a4840ee01ec774",
        "email": "michelle@example.com",
        "ip": "198.41.129.166",
        "type": "user"
      },
      "interface": "API",
      "metadata": {
        "name": "security_level",
        "type": "firewall",
        "value": "high",
        "zone_name": "example.com"
      },
      "newValue": "low",
      "oldValue": "high",
      "owner": {
        "id": "023e105f4ecef8ad9ca31a8372d0c353"
      },
      "resource": {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "type": "zone"
      },
      "when": "2017-04-26T17:31:07Z"
    }
  ],
  "success": true
}
```

# Billing

# History

## Billing History Details

**get** `/user/billing/history`

Accesses your billing history object.

### Query Parameters

- `action: optional string`

  The billing item action.

- `occurred_at: optional string`

  When the billing item was created.

- `order: optional "type" or "occurred_at" or "action"`

  Field to order billing history by.

  - `"type"`

  - `"occurred_at"`

  - `"action"`

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of items per page.

- `type: optional string`

  The billing item type.

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

- `result: array of BillingHistory`

  - `id: string`

    Billing item identifier tag.

  - `action: string`

    The billing item action.

  - `amount: number`

    The amount associated with this billing item.

  - `currency: string`

    The monetary unit in which pricing information is displayed.

  - `description: string`

    The billing item description.

  - `occurred_at: string`

    When the billing item was created.

  - `type: string`

    The billing item type.

  - `zone: object { name }`

    - `name: optional string`

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
curl https://api.cloudflare.com/client/v4/user/billing/history \
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
      "id": "b69a9f3492637782896352daae219e7d",
      "action": "subscription",
      "amount": 20.99,
      "currency": "USD",
      "description": "The billing item description",
      "occurred_at": "2014-03-01T12:21:59.3456Z",
      "type": "charge",
      "zone": {
        "name": "name"
      }
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

## Domain Types

### Billing History

- `BillingHistory object { id, action, amount, 5 more }`

  - `id: string`

    Billing item identifier tag.

  - `action: string`

    The billing item action.

  - `amount: number`

    The amount associated with this billing item.

  - `currency: string`

    The monetary unit in which pricing information is displayed.

  - `description: string`

    The billing item description.

  - `occurred_at: string`

    When the billing item was created.

  - `type: string`

    The billing item type.

  - `zone: object { name }`

    - `name: optional string`

# Profile

## Billing Profile Details

**get** `/user/billing/profile`

Accesses your billing profile object.

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
curl https://api.cloudflare.com/client/v4/user/billing/profile \
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

## Domain Types

### Profile Get Response

- `ProfileGetResponse object { id, account_type, address, 36 more }`

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

# Invites

## List Invitations

**get** `/user/invites`

Lists all invitations associated with my user.

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

- `result: optional array of Invite`

  - `invited_member_id: string`

    ID of the user to add to the organization.

  - `organization_id: string`

    ID of the organization the user will be added to.

  - `id: optional string`

    Invite identifier tag.

  - `expires_on: optional string`

    When the invite is no longer active.

  - `invited_by: optional string`

    The email address of the user who created the invite.

  - `invited_member_email: optional string`

    Email address of the user to add to the organization.

  - `invited_on: optional string`

    When the invite was sent.

  - `organization_is_enforcing_twofactor: optional boolean`

  - `organization_name: optional string`

    Organization name.

  - `roles: optional array of string`

    List of role names the membership has for this account.

  - `status: optional "pending" or "accepted" or "rejected" or "expired"`

    Current status of the invitation.

    - `"pending"`

    - `"accepted"`

    - `"rejected"`

    - `"expired"`

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
curl https://api.cloudflare.com/client/v4/user/invites \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "result": [
    {
      "invited_member_id": "5a7805061c76ada191ed06f989cc3dac",
      "organization_id": "5a7805061c76ada191ed06f989cc3dac",
      "id": "4f5f0c14a2a41d5063dd301b2f829f04",
      "expires_on": "2014-01-01T05:20:00Z",
      "invited_by": "user@example.com",
      "invited_member_email": "user@example.com",
      "invited_on": "2014-01-01T05:20:00Z",
      "organization_is_enforcing_twofactor": true,
      "organization_name": "Cloudflare, Inc.",
      "roles": [
        "Account Administrator"
      ],
      "status": "accepted"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Invitation Details

**get** `/user/invites/{invite_id}`

Gets the details of an invitation.

### Path Parameters

- `invite_id: string`

  Invite identifier tag.

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

- `result: optional Invite`

  - `invited_member_id: string`

    ID of the user to add to the organization.

  - `organization_id: string`

    ID of the organization the user will be added to.

  - `id: optional string`

    Invite identifier tag.

  - `expires_on: optional string`

    When the invite is no longer active.

  - `invited_by: optional string`

    The email address of the user who created the invite.

  - `invited_member_email: optional string`

    Email address of the user to add to the organization.

  - `invited_on: optional string`

    When the invite was sent.

  - `organization_is_enforcing_twofactor: optional boolean`

  - `organization_name: optional string`

    Organization name.

  - `roles: optional array of string`

    List of role names the membership has for this account.

  - `status: optional "pending" or "accepted" or "rejected" or "expired"`

    Current status of the invitation.

    - `"pending"`

    - `"accepted"`

    - `"rejected"`

    - `"expired"`

### Example

```http
curl https://api.cloudflare.com/client/v4/user/invites/$INVITE_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "invited_member_id": "5a7805061c76ada191ed06f989cc3dac",
    "organization_id": "5a7805061c76ada191ed06f989cc3dac",
    "id": "4f5f0c14a2a41d5063dd301b2f829f04",
    "expires_on": "2014-01-01T05:20:00Z",
    "invited_by": "user@example.com",
    "invited_member_email": "user@example.com",
    "invited_on": "2014-01-01T05:20:00Z",
    "organization_is_enforcing_twofactor": true,
    "organization_name": "Cloudflare, Inc.",
    "roles": [
      "Account Administrator"
    ],
    "status": "accepted"
  }
}
```

## Respond to Invitation

**patch** `/user/invites/{invite_id}`

Responds to an invitation.

### Path Parameters

- `invite_id: string`

  Invite identifier tag.

### Body Parameters

- `status: "accepted" or "rejected"`

  Status of your response to the invitation (rejected or accepted).

  - `"accepted"`

  - `"rejected"`

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

- `result: optional Invite`

  - `invited_member_id: string`

    ID of the user to add to the organization.

  - `organization_id: string`

    ID of the organization the user will be added to.

  - `id: optional string`

    Invite identifier tag.

  - `expires_on: optional string`

    When the invite is no longer active.

  - `invited_by: optional string`

    The email address of the user who created the invite.

  - `invited_member_email: optional string`

    Email address of the user to add to the organization.

  - `invited_on: optional string`

    When the invite was sent.

  - `organization_is_enforcing_twofactor: optional boolean`

  - `organization_name: optional string`

    Organization name.

  - `roles: optional array of string`

    List of role names the membership has for this account.

  - `status: optional "pending" or "accepted" or "rejected" or "expired"`

    Current status of the invitation.

    - `"pending"`

    - `"accepted"`

    - `"rejected"`

    - `"expired"`

### Example

```http
curl https://api.cloudflare.com/client/v4/user/invites/$INVITE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "status": "accepted"
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
    "invited_member_id": "5a7805061c76ada191ed06f989cc3dac",
    "organization_id": "5a7805061c76ada191ed06f989cc3dac",
    "id": "4f5f0c14a2a41d5063dd301b2f829f04",
    "expires_on": "2014-01-01T05:20:00Z",
    "invited_by": "user@example.com",
    "invited_member_email": "user@example.com",
    "invited_on": "2014-01-01T05:20:00Z",
    "organization_is_enforcing_twofactor": true,
    "organization_name": "Cloudflare, Inc.",
    "roles": [
      "Account Administrator"
    ],
    "status": "accepted"
  }
}
```

## Domain Types

### Invite

- `Invite object { invited_member_id, organization_id, id, 8 more }`

  - `invited_member_id: string`

    ID of the user to add to the organization.

  - `organization_id: string`

    ID of the organization the user will be added to.

  - `id: optional string`

    Invite identifier tag.

  - `expires_on: optional string`

    When the invite is no longer active.

  - `invited_by: optional string`

    The email address of the user who created the invite.

  - `invited_member_email: optional string`

    Email address of the user to add to the organization.

  - `invited_on: optional string`

    When the invite was sent.

  - `organization_is_enforcing_twofactor: optional boolean`

  - `organization_name: optional string`

    Organization name.

  - `roles: optional array of string`

    List of role names the membership has for this account.

  - `status: optional "pending" or "accepted" or "rejected" or "expired"`

    Current status of the invitation.

    - `"pending"`

    - `"accepted"`

    - `"rejected"`

    - `"expired"`

# Organizations

## List Organizations

**get** `/user/organizations`

Lists organizations the user is associated with.

### Query Parameters

- `direction: optional "asc" or "desc"`

  Direction to order organizations.

  - `"asc"`

  - `"desc"`

- `match: optional "any" or "all"`

  Whether to match all search requirements or at least one (any).

  - `"any"`

  - `"all"`

- `name: optional string`

  Organization name.

- `order: optional "id" or "name" or "status"`

  Field to order organizations by.

  - `"id"`

  - `"name"`

  - `"status"`

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of organizations per page.

- `status: optional "member" or "invited"`

  Whether the user is a member of the organization or has an inivitation pending.

  - `"member"`

  - `"invited"`

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

- `result: optional array of Organization`

  - `id: optional string`

    Identifier

  - `name: optional string`

    Organization name.

  - `permissions: optional array of Permission`

    Access permissions for this User.

  - `roles: optional array of string`

    List of roles that a user has within an organization.

  - `status: optional Status`

    Whether the user is a member of the organization or has an invitation pending.

    - `"member"`

    - `"invited"`

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
curl https://api.cloudflare.com/client/v4/user/organizations \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "Cloudflare, Inc.",
      "permissions": [
        "#zones:read"
      ],
      "roles": [
        "All Privileges - Super Administrator"
      ],
      "status": "member"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Organization Details

**get** `/user/organizations/{organization_id}`

Gets a specific organization the user is associated with.

### Path Parameters

- `organization_id: string`

  Identifier

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

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/user/organizations/$ORGANIZATION_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "result": {}
}
```

## Leave Organization

**delete** `/user/organizations/{organization_id}`

Removes association to an organization.

### Path Parameters

- `organization_id: string`

  Identifier

### Returns

- `id: optional string`

  Identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/user/organizations/$ORGANIZATION_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "id": "023e105f4ecef8ad9ca31a8372d0c353"
}
```

## Domain Types

### Organization

- `Organization object { id, name, permissions, 2 more }`

  - `id: optional string`

    Identifier

  - `name: optional string`

    Organization name.

  - `permissions: optional array of Permission`

    Access permissions for this User.

  - `roles: optional array of string`

    List of roles that a user has within an organization.

  - `status: optional Status`

    Whether the user is a member of the organization or has an invitation pending.

    - `"member"`

    - `"invited"`

### Organization Get Response

- `OrganizationGetResponse = unknown`

### Organization Delete Response

- `OrganizationDeleteResponse object { id }`

  - `id: optional string`

    Identifier

# Subscriptions

## Get User Subscriptions

**get** `/user/subscriptions`

Lists all of a user's subscriptions.

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

- `result: array of Subscription`

  - `id: optional string`

    Subscription identifier tag.

  - `currency: optional string`

    The monetary unit in which pricing information is displayed.

  - `current_period_end: optional string`

    The end of the current period and also when the next billing is due.

  - `current_period_start: optional string`

    When the current billing period started. May match initial_period_start if this is the first period.

  - `frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"`

    How often the subscription is renewed automatically.

    - `"weekly"`

    - `"monthly"`

    - `"quarterly"`

    - `"yearly"`

  - `price: optional number`

    The price of the subscription that will be billed, in US dollars.

  - `rate_plan: optional RatePlan`

    The rate plan applied to the subscription.

    - `id: optional "free" or "lite" or "pro" or 7 more`

      The ID of the rate plan.

      - `"free"`

      - `"lite"`

      - `"pro"`

      - `"pro_plus"`

      - `"business"`

      - `"enterprise"`

      - `"partners_free"`

      - `"partners_pro"`

      - `"partners_business"`

      - `"partners_enterprise"`

    - `currency: optional string`

      The currency applied to the rate plan subscription.

    - `externally_managed: optional boolean`

      Whether this rate plan is managed externally from Cloudflare.

    - `is_contract: optional boolean`

      Whether a rate plan is enterprise-based (or newly adopted term contract).

    - `public_name: optional string`

      The full name of the rate plan.

    - `scope: optional string`

      The scope that this rate plan applies to.

    - `sets: optional array of string`

      The list of sets this rate plan applies to. Returns array of strings.

  - `state: optional "Trial" or "Provisioned" or "Paid" or 4 more`

    The state that the subscription is in.

    - `"Trial"`

    - `"Provisioned"`

    - `"Paid"`

    - `"AwaitingPayment"`

    - `"Cancelled"`

    - `"Failed"`

    - `"Expired"`

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
curl https://api.cloudflare.com/client/v4/user/subscriptions \
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
      "id": "506e3185e9c882d175a2d0cb0093d9f2",
      "currency": "USD",
      "current_period_end": "2014-03-31T12:20:00Z",
      "current_period_start": "2014-05-11T12:20:00Z",
      "frequency": "monthly",
      "price": 20,
      "rate_plan": {
        "id": "free",
        "currency": "USD",
        "externally_managed": false,
        "is_contract": false,
        "public_name": "Business Plan",
        "scope": "zone",
        "sets": [
          "string"
        ]
      },
      "state": "Paid"
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

## Update User Subscription

**put** `/user/subscriptions/{identifier}`

Updates a user's subscriptions.

### Path Parameters

- `identifier: string`

  Subscription identifier tag.

### Body Parameters

- `frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"`

  How often the subscription is renewed automatically.

  - `"weekly"`

  - `"monthly"`

  - `"quarterly"`

  - `"yearly"`

- `rate_plan: optional RatePlan`

  The rate plan applied to the subscription.

  - `id: optional "free" or "lite" or "pro" or 7 more`

    The ID of the rate plan.

    - `"free"`

    - `"lite"`

    - `"pro"`

    - `"pro_plus"`

    - `"business"`

    - `"enterprise"`

    - `"partners_free"`

    - `"partners_pro"`

    - `"partners_business"`

    - `"partners_enterprise"`

  - `currency: optional string`

    The currency applied to the rate plan subscription.

  - `externally_managed: optional boolean`

    Whether this rate plan is managed externally from Cloudflare.

  - `is_contract: optional boolean`

    Whether a rate plan is enterprise-based (or newly adopted term contract).

  - `public_name: optional string`

    The full name of the rate plan.

  - `scope: optional string`

    The scope that this rate plan applies to.

  - `sets: optional array of string`

    The list of sets this rate plan applies to. Returns array of strings.

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

- `result: unknown or string`

  - `unknown`

  - `string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/user/subscriptions/$IDENTIFIER \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "frequency": "monthly"
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
  "result": {},
  "success": true
}
```

## Delete User Subscription

**delete** `/user/subscriptions/{identifier}`

Deletes a user's subscription.

### Path Parameters

- `identifier: string`

  Subscription identifier tag.

### Returns

- `subscription_id: optional string`

  Subscription identifier tag.

### Example

```http
curl https://api.cloudflare.com/client/v4/user/subscriptions/$IDENTIFIER \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "subscription_id": "506e3185e9c882d175a2d0cb0093d9f2"
}
```

## Domain Types

### Subscription Update Response

- `SubscriptionUpdateResponse = unknown or string`

  - `unknown`

  - `string`

### Subscription Delete Response

- `SubscriptionDeleteResponse object { subscription_id }`

  - `subscription_id: optional string`

    Subscription identifier tag.

# Tenants

## List user tenants

**get** `/user/tenants`

Retrieves list of tenants the authenticated user / method has access to.

### Returns

- `errors: array of unknown`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: array of Organization`

  - `id: string`

  - `create_time: string`

  - `meta: object { flags, hierarchy_tags, managed_by }`

    - `flags: optional object { account_creation, account_deletion, account_migration, 2 more }`

      Enable features for Organizations.

      - `account_creation: string`

      - `account_deletion: string`

      - `account_migration: string`

      - `account_mobility: string`

      - `sub_org_creation: string`

    - `hierarchy_tags: optional array of string`

      Ordered chain of organization tags from the root organization down to
      (and including) this organization itself. Root organizations return a
      single-element array containing their own tag; sub-organizations return
      `[rootTag, ...intermediateTags, parentTag, selfTag]`. Useful for
      constructing authorization scopes that need to cover every ancestor
      in the hierarchy.

    - `managed_by: optional string`

  - `name: string`

  - `parent: optional object { id, name }`

    - `id: string`

    - `name: string`

  - `profile: optional AccountProfile`

    - `business_address: string`

    - `business_email: string`

    - `business_name: string`

    - `business_phone: string`

    - `external_metadata: string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/user/tenants \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "errors": [],
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
      "id": "a7b9c3d2e8f4g1h5i6j0k9l2m3n7o4p8",
      "create_time": "2019-12-27T18:11:19.117Z",
      "meta": {
        "flags": {
          "account_creation": "account_creation",
          "account_deletion": "account_deletion",
          "account_migration": "account_migration",
          "account_mobility": "account_mobility",
          "sub_org_creation": "sub_org_creation"
        },
        "hierarchy_tags": [
          "string"
        ],
        "managed_by": "managed_by"
      },
      "name": "name",
      "parent": {
        "id": "a7b9c3d2e8f4g1h5i6j0k9l2m3n7o4p8",
        "name": "name"
      },
      "profile": {
        "business_address": "business_address",
        "business_email": "business_email",
        "business_name": "business_name",
        "business_phone": "business_phone",
        "external_metadata": "external_metadata"
      }
    }
  ],
  "success": true
}
```

# Tokens

## List Tokens

**get** `/user/tokens`

List all access tokens you created.

### Query Parameters

- `direction: optional "asc" or "desc"`

  Direction to order results.

  - `"asc"`

  - `"desc"`

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page.

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

- `result: optional array of Token`

  - `id: optional string`

    Token identifier tag.

  - `condition: optional object { request_ip }`

    - `request_ip: optional object { in, not_in }`

      Client IP restrictions.

      - `in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

      - `not_in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

  - `expires_on: optional string`

    The expiration time on or after which the JWT MUST NOT be accepted for processing.

  - `issued_on: optional string`

    The time on which the token was created.

  - `last_used_on: optional string`

    Last time the token was used.

  - `modified_on: optional string`

    Last time the token was modified.

  - `name: optional string`

    Token name.

  - `not_before: optional string`

    The time before which the token MUST NOT be accepted for processing.

  - `policies: optional array of TokenPolicy`

    List of access policies assigned to the token.

    - `id: string`

      Policy identifier.

    - `effect: "allow" or "deny"`

      Allow or deny operations against the resources.

      - `"allow"`

      - `"deny"`

    - `permission_groups: array of object { id, meta, name }`

      A set of permission groups that are specified to the policy.

      - `id: string`

        Identifier of the permission group.

      - `meta: optional object { key, value }`

        Attributes associated to the permission group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the permission group.

    - `resources: map[string] or map[map[string]]`

      A list of resource names that the policy applies to.

      - `IAMResourcesTypeObjectString = map[string]`

        Map of simple string resource permissions

      - `IAMResourcesTypeObjectNested = map[map[string]]`

        Map of nested resource permissions

  - `status: optional "active" or "disabled" or "expired"`

    Status of the token.

    - `"active"`

    - `"disabled"`

    - `"expired"`

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
curl https://api.cloudflare.com/client/v4/user/tokens \
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
  "result": [
    {
      "id": "ed17574386854bf78a67040be0a770b0",
      "condition": {
        "request_ip": {
          "in": [
            "123.123.123.0/24",
            "2606:4700::/32"
          ],
          "not_in": [
            "123.123.123.100/24",
            "2606:4700:4700::/48"
          ]
        }
      },
      "expires_on": "2020-01-01T00:00:00Z",
      "issued_on": "2018-07-01T05:20:00Z",
      "last_used_on": "2020-01-02T12:34:00Z",
      "modified_on": "2018-07-02T05:20:00Z",
      "name": "readonly token",
      "not_before": "2018-07-01T05:20:00Z",
      "policies": [
        {
          "id": "f267e341f3dd4697bd3b9f71dd96247f",
          "effect": "allow",
          "permission_groups": [
            {
              "id": "c8fed203ed3043cba015a93ad1616f1f",
              "meta": {
                "key": "key",
                "value": "value"
              },
              "name": "Zone Read"
            },
            {
              "id": "82e64a83756745bbbb1c9c2701bf816b",
              "meta": {
                "key": "key",
                "value": "value"
              },
              "name": "Magic Network Monitoring"
            }
          ],
          "resources": {
            "foo": "string"
          }
        }
      ],
      "status": "active"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Token Details

**get** `/user/tokens/{token_id}`

Get information about a specific token.

### Path Parameters

- `token_id: string`

  Token identifier tag.

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

- `result: optional Token`

  - `id: optional string`

    Token identifier tag.

  - `condition: optional object { request_ip }`

    - `request_ip: optional object { in, not_in }`

      Client IP restrictions.

      - `in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

      - `not_in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

  - `expires_on: optional string`

    The expiration time on or after which the JWT MUST NOT be accepted for processing.

  - `issued_on: optional string`

    The time on which the token was created.

  - `last_used_on: optional string`

    Last time the token was used.

  - `modified_on: optional string`

    Last time the token was modified.

  - `name: optional string`

    Token name.

  - `not_before: optional string`

    The time before which the token MUST NOT be accepted for processing.

  - `policies: optional array of TokenPolicy`

    List of access policies assigned to the token.

    - `id: string`

      Policy identifier.

    - `effect: "allow" or "deny"`

      Allow or deny operations against the resources.

      - `"allow"`

      - `"deny"`

    - `permission_groups: array of object { id, meta, name }`

      A set of permission groups that are specified to the policy.

      - `id: string`

        Identifier of the permission group.

      - `meta: optional object { key, value }`

        Attributes associated to the permission group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the permission group.

    - `resources: map[string] or map[map[string]]`

      A list of resource names that the policy applies to.

      - `IAMResourcesTypeObjectString = map[string]`

        Map of simple string resource permissions

      - `IAMResourcesTypeObjectNested = map[map[string]]`

        Map of nested resource permissions

  - `status: optional "active" or "disabled" or "expired"`

    Status of the token.

    - `"active"`

    - `"disabled"`

    - `"expired"`

### Example

```http
curl https://api.cloudflare.com/client/v4/user/tokens/$TOKEN_ID \
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
    "id": "ed17574386854bf78a67040be0a770b0",
    "condition": {
      "request_ip": {
        "in": [
          "123.123.123.0/24",
          "2606:4700::/32"
        ],
        "not_in": [
          "123.123.123.100/24",
          "2606:4700:4700::/48"
        ]
      }
    },
    "expires_on": "2020-01-01T00:00:00Z",
    "issued_on": "2018-07-01T05:20:00Z",
    "last_used_on": "2020-01-02T12:34:00Z",
    "modified_on": "2018-07-02T05:20:00Z",
    "name": "readonly token",
    "not_before": "2018-07-01T05:20:00Z",
    "policies": [
      {
        "id": "f267e341f3dd4697bd3b9f71dd96247f",
        "effect": "allow",
        "permission_groups": [
          {
            "id": "c8fed203ed3043cba015a93ad1616f1f",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Zone Read"
          },
          {
            "id": "82e64a83756745bbbb1c9c2701bf816b",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Magic Network Monitoring"
          }
        ],
        "resources": {
          "foo": "string"
        }
      }
    ],
    "status": "active"
  }
}
```

## Create Token

**post** `/user/tokens`

Create a new access token.

### Body Parameters

- `name: string`

  Token name.

- `policies: array of TokenPolicy`

  List of access policies assigned to the token.

  - `id: string`

    Policy identifier.

  - `effect: "allow" or "deny"`

    Allow or deny operations against the resources.

    - `"allow"`

    - `"deny"`

  - `permission_groups: array of object { id, meta, name }`

    A set of permission groups that are specified to the policy.

    - `id: string`

      Identifier of the permission group.

    - `meta: optional object { key, value }`

      Attributes associated to the permission group.

      - `key: optional string`

      - `value: optional string`

    - `name: optional string`

      Name of the permission group.

  - `resources: map[string] or map[map[string]]`

    A list of resource names that the policy applies to.

    - `IAMResourcesTypeObjectString = map[string]`

      Map of simple string resource permissions

    - `IAMResourcesTypeObjectNested = map[map[string]]`

      Map of nested resource permissions

- `condition: optional object { request_ip }`

  - `request_ip: optional object { in, not_in }`

    Client IP restrictions.

    - `in: optional array of TokenConditionCIDRList`

      List of IPv4/IPv6 CIDR addresses.

    - `not_in: optional array of TokenConditionCIDRList`

      List of IPv4/IPv6 CIDR addresses.

- `expires_on: optional string`

  The expiration time on or after which the JWT MUST NOT be accepted for processing.

- `not_before: optional string`

  The time before which the token MUST NOT be accepted for processing.

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

- `result: optional object { id, condition, expires_on, 8 more }`

  - `id: optional string`

    Token identifier tag.

  - `condition: optional object { request_ip }`

    - `request_ip: optional object { in, not_in }`

      Client IP restrictions.

      - `in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

      - `not_in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

  - `expires_on: optional string`

    The expiration time on or after which the JWT MUST NOT be accepted for processing.

  - `issued_on: optional string`

    The time on which the token was created.

  - `last_used_on: optional string`

    Last time the token was used.

  - `modified_on: optional string`

    Last time the token was modified.

  - `name: optional string`

    Token name.

  - `not_before: optional string`

    The time before which the token MUST NOT be accepted for processing.

  - `policies: optional array of TokenPolicy`

    List of access policies assigned to the token.

    - `id: string`

      Policy identifier.

    - `effect: "allow" or "deny"`

      Allow or deny operations against the resources.

      - `"allow"`

      - `"deny"`

    - `permission_groups: array of object { id, meta, name }`

      A set of permission groups that are specified to the policy.

      - `id: string`

        Identifier of the permission group.

      - `meta: optional object { key, value }`

        Attributes associated to the permission group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the permission group.

    - `resources: map[string] or map[map[string]]`

      A list of resource names that the policy applies to.

      - `IAMResourcesTypeObjectString = map[string]`

        Map of simple string resource permissions

      - `IAMResourcesTypeObjectNested = map[map[string]]`

        Map of nested resource permissions

  - `status: optional "active" or "disabled" or "expired"`

    Status of the token.

    - `"active"`

    - `"disabled"`

    - `"expired"`

  - `value: optional TokenValue`

    The token value.

### Example

```http
curl https://api.cloudflare.com/client/v4/user/tokens \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "readonly token",
          "policies": [
            {
              "effect": "allow",
              "permission_groups": [
                {
                  "id": "c8fed203ed3043cba015a93ad1616f1f",
                  "meta": {}
                },
                {
                  "id": "82e64a83756745bbbb1c9c2701bf816b",
                  "meta": {}
                }
              ],
              "resources": {
                "foo": "string"
              }
            }
          ],
          "expires_on": "2020-01-01T00:00:00Z",
          "not_before": "2018-07-01T05:20:00Z"
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
    "id": "ed17574386854bf78a67040be0a770b0",
    "condition": {
      "request_ip": {
        "in": [
          "123.123.123.0/24",
          "2606:4700::/32"
        ],
        "not_in": [
          "123.123.123.100/24",
          "2606:4700:4700::/48"
        ]
      }
    },
    "expires_on": "2020-01-01T00:00:00Z",
    "issued_on": "2018-07-01T05:20:00Z",
    "last_used_on": "2020-01-02T12:34:00Z",
    "modified_on": "2018-07-02T05:20:00Z",
    "name": "readonly token",
    "not_before": "2018-07-01T05:20:00Z",
    "policies": [
      {
        "id": "f267e341f3dd4697bd3b9f71dd96247f",
        "effect": "allow",
        "permission_groups": [
          {
            "id": "c8fed203ed3043cba015a93ad1616f1f",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Zone Read"
          },
          {
            "id": "82e64a83756745bbbb1c9c2701bf816b",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Magic Network Monitoring"
          }
        ],
        "resources": {
          "foo": "string"
        }
      }
    ],
    "status": "active",
    "value": "8M7wS6hCpXVc-DoRnPPY_UCWPgy8aea4Wy6kCe5T"
  }
}
```

## Update Token

**put** `/user/tokens/{token_id}`

Update an existing token.

### Path Parameters

- `token_id: string`

  Token identifier tag.

### Body Parameters

- `name: string`

  Token name.

- `policies: array of TokenPolicy`

  List of access policies assigned to the token.

  - `id: string`

    Policy identifier.

  - `effect: "allow" or "deny"`

    Allow or deny operations against the resources.

    - `"allow"`

    - `"deny"`

  - `permission_groups: array of object { id, meta, name }`

    A set of permission groups that are specified to the policy.

    - `id: string`

      Identifier of the permission group.

    - `meta: optional object { key, value }`

      Attributes associated to the permission group.

      - `key: optional string`

      - `value: optional string`

    - `name: optional string`

      Name of the permission group.

  - `resources: map[string] or map[map[string]]`

    A list of resource names that the policy applies to.

    - `IAMResourcesTypeObjectString = map[string]`

      Map of simple string resource permissions

    - `IAMResourcesTypeObjectNested = map[map[string]]`

      Map of nested resource permissions

- `condition: optional object { request_ip }`

  - `request_ip: optional object { in, not_in }`

    Client IP restrictions.

    - `in: optional array of TokenConditionCIDRList`

      List of IPv4/IPv6 CIDR addresses.

    - `not_in: optional array of TokenConditionCIDRList`

      List of IPv4/IPv6 CIDR addresses.

- `expires_on: optional string`

  The expiration time on or after which the JWT MUST NOT be accepted for processing.

- `not_before: optional string`

  The time before which the token MUST NOT be accepted for processing.

- `status: optional "active" or "disabled" or "expired"`

  Status of the token.

  - `"active"`

  - `"disabled"`

  - `"expired"`

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

- `result: optional Token`

  - `id: optional string`

    Token identifier tag.

  - `condition: optional object { request_ip }`

    - `request_ip: optional object { in, not_in }`

      Client IP restrictions.

      - `in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

      - `not_in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

  - `expires_on: optional string`

    The expiration time on or after which the JWT MUST NOT be accepted for processing.

  - `issued_on: optional string`

    The time on which the token was created.

  - `last_used_on: optional string`

    Last time the token was used.

  - `modified_on: optional string`

    Last time the token was modified.

  - `name: optional string`

    Token name.

  - `not_before: optional string`

    The time before which the token MUST NOT be accepted for processing.

  - `policies: optional array of TokenPolicy`

    List of access policies assigned to the token.

    - `id: string`

      Policy identifier.

    - `effect: "allow" or "deny"`

      Allow or deny operations against the resources.

      - `"allow"`

      - `"deny"`

    - `permission_groups: array of object { id, meta, name }`

      A set of permission groups that are specified to the policy.

      - `id: string`

        Identifier of the permission group.

      - `meta: optional object { key, value }`

        Attributes associated to the permission group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the permission group.

    - `resources: map[string] or map[map[string]]`

      A list of resource names that the policy applies to.

      - `IAMResourcesTypeObjectString = map[string]`

        Map of simple string resource permissions

      - `IAMResourcesTypeObjectNested = map[map[string]]`

        Map of nested resource permissions

  - `status: optional "active" or "disabled" or "expired"`

    Status of the token.

    - `"active"`

    - `"disabled"`

    - `"expired"`

### Example

```http
curl https://api.cloudflare.com/client/v4/user/tokens/$TOKEN_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "readonly token",
          "policies": [
            {
              "effect": "allow",
              "permission_groups": [
                {
                  "id": "c8fed203ed3043cba015a93ad1616f1f",
                  "meta": {}
                },
                {
                  "id": "82e64a83756745bbbb1c9c2701bf816b",
                  "meta": {}
                }
              ],
              "resources": {
                "foo": "string"
              }
            }
          ],
          "expires_on": "2020-01-01T00:00:00Z",
          "not_before": "2018-07-01T05:20:00Z",
          "status": "active"
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
    "id": "ed17574386854bf78a67040be0a770b0",
    "condition": {
      "request_ip": {
        "in": [
          "123.123.123.0/24",
          "2606:4700::/32"
        ],
        "not_in": [
          "123.123.123.100/24",
          "2606:4700:4700::/48"
        ]
      }
    },
    "expires_on": "2020-01-01T00:00:00Z",
    "issued_on": "2018-07-01T05:20:00Z",
    "last_used_on": "2020-01-02T12:34:00Z",
    "modified_on": "2018-07-02T05:20:00Z",
    "name": "readonly token",
    "not_before": "2018-07-01T05:20:00Z",
    "policies": [
      {
        "id": "f267e341f3dd4697bd3b9f71dd96247f",
        "effect": "allow",
        "permission_groups": [
          {
            "id": "c8fed203ed3043cba015a93ad1616f1f",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Zone Read"
          },
          {
            "id": "82e64a83756745bbbb1c9c2701bf816b",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Magic Network Monitoring"
          }
        ],
        "resources": {
          "foo": "string"
        }
      }
    ],
    "status": "active"
  }
}
```

## Delete Token

**delete** `/user/tokens/{token_id}`

Destroy a token.

### Path Parameters

- `token_id: string`

  Token identifier tag.

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

- `result: optional object { id }`

  - `id: string`

    Identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/user/tokens/$TOKEN_ID \
    -X DELETE \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```

## Verify Token

**get** `/user/tokens/verify`

Test whether a token works.

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

- `result: optional object { id, status, expires_on, not_before }`

  - `id: string`

    Token identifier tag.

  - `status: "active" or "disabled" or "expired"`

    Status of the token.

    - `"active"`

    - `"disabled"`

    - `"expired"`

  - `expires_on: optional string`

    The expiration time on or after which the JWT MUST NOT be accepted for processing.

  - `not_before: optional string`

    The time before which the token MUST NOT be accepted for processing.

### Example

```http
curl https://api.cloudflare.com/client/v4/user/tokens/verify \
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
    "id": "ed17574386854bf78a67040be0a770b0",
    "status": "active",
    "expires_on": "2020-01-01T00:00:00Z",
    "not_before": "2018-07-01T05:20:00Z"
  }
}
```

## Domain Types

### Token Create Response

- `TokenCreateResponse object { id, condition, expires_on, 8 more }`

  - `id: optional string`

    Token identifier tag.

  - `condition: optional object { request_ip }`

    - `request_ip: optional object { in, not_in }`

      Client IP restrictions.

      - `in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

      - `not_in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

  - `expires_on: optional string`

    The expiration time on or after which the JWT MUST NOT be accepted for processing.

  - `issued_on: optional string`

    The time on which the token was created.

  - `last_used_on: optional string`

    Last time the token was used.

  - `modified_on: optional string`

    Last time the token was modified.

  - `name: optional string`

    Token name.

  - `not_before: optional string`

    The time before which the token MUST NOT be accepted for processing.

  - `policies: optional array of TokenPolicy`

    List of access policies assigned to the token.

    - `id: string`

      Policy identifier.

    - `effect: "allow" or "deny"`

      Allow or deny operations against the resources.

      - `"allow"`

      - `"deny"`

    - `permission_groups: array of object { id, meta, name }`

      A set of permission groups that are specified to the policy.

      - `id: string`

        Identifier of the permission group.

      - `meta: optional object { key, value }`

        Attributes associated to the permission group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the permission group.

    - `resources: map[string] or map[map[string]]`

      A list of resource names that the policy applies to.

      - `IAMResourcesTypeObjectString = map[string]`

        Map of simple string resource permissions

      - `IAMResourcesTypeObjectNested = map[map[string]]`

        Map of nested resource permissions

  - `status: optional "active" or "disabled" or "expired"`

    Status of the token.

    - `"active"`

    - `"disabled"`

    - `"expired"`

  - `value: optional TokenValue`

    The token value.

### Token Delete Response

- `TokenDeleteResponse object { id }`

  - `id: string`

    Identifier

### Token Verify Response

- `TokenVerifyResponse object { id, status, expires_on, not_before }`

  - `id: string`

    Token identifier tag.

  - `status: "active" or "disabled" or "expired"`

    Status of the token.

    - `"active"`

    - `"disabled"`

    - `"expired"`

  - `expires_on: optional string`

    The expiration time on or after which the JWT MUST NOT be accepted for processing.

  - `not_before: optional string`

    The time before which the token MUST NOT be accepted for processing.

# Permission Groups

## List Token Permission Groups

**get** `/user/tokens/permission_groups`

Find all available permission groups for API Tokens.

### Query Parameters

- `name: optional string`

  Filter by the name of the permission group.
  The value must be URL-encoded.

- `scope: optional string`

  Filter by the scope of the permission group.
  The value must be URL-encoded.

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

- `result: optional array of object { id, category, name, scopes }`

  - `id: optional string`

    Public ID.

  - `category: optional "developer_platform" or "ai_and_machine_learning" or "dns_and_zones" or 10 more`

    Product category that this permission group belongs to.

    - `"developer_platform"`

    - `"ai_and_machine_learning"`

    - `"dns_and_zones"`

    - `"app_security"`

    - `"rules_and_configuration"`

    - `"cloudflare_one_and_zero_trust"`

    - `"analytics_and_logs"`

    - `"network_services"`

    - `"media"`

    - `"email_and_messaging"`

    - `"cache_and_performance"`

    - `"account_and_billing"`

    - `"other"`

  - `name: optional string`

    Permission Group Name

  - `scopes: optional array of "com.cloudflare.api.account" or "com.cloudflare.api.account.zone" or "com.cloudflare.api.user" or "com.cloudflare.edge.r2.bucket"`

    Resources to which the Permission Group is scoped

    - `"com.cloudflare.api.account"`

    - `"com.cloudflare.api.account.zone"`

    - `"com.cloudflare.api.user"`

    - `"com.cloudflare.edge.r2.bucket"`

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
curl https://api.cloudflare.com/client/v4/user/tokens/permission_groups \
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
  "result": [
    {
      "id": "7cf72faf220841aabcfdfab81c43c4f6",
      "category": "account_and_billing",
      "name": "Billing Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "9d24387c6e8544e2bc4024a03991339f",
      "category": "network_services",
      "name": "Load Balancing: Monitors and Pools Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "d2a1802cc9a34e30852f8b33869b2f3c",
      "category": "network_services",
      "name": "Load Balancing: Monitors and Pools Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "8b47d2786a534c08a1f94ee8f9f599ef",
      "category": "developer_platform",
      "name": "Workers KV Storage Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "f7f0eda5697f475c90846e879bab8666",
      "category": "developer_platform",
      "name": "Workers KV Storage Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "1a71c399035b4950a1bd1466bbe4f420",
      "category": "developer_platform",
      "name": "Workers Scripts Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "e086da7e2179491d91ee5f35b3ca210a",
      "category": "developer_platform",
      "name": "Workers Scripts Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Domain Types

### Permission Group List Response

- `PermissionGroupListResponse object { id, category, name, scopes }`

  - `id: optional string`

    Public ID.

  - `category: optional "developer_platform" or "ai_and_machine_learning" or "dns_and_zones" or 10 more`

    Product category that this permission group belongs to.

    - `"developer_platform"`

    - `"ai_and_machine_learning"`

    - `"dns_and_zones"`

    - `"app_security"`

    - `"rules_and_configuration"`

    - `"cloudflare_one_and_zero_trust"`

    - `"analytics_and_logs"`

    - `"network_services"`

    - `"media"`

    - `"email_and_messaging"`

    - `"cache_and_performance"`

    - `"account_and_billing"`

    - `"other"`

  - `name: optional string`

    Permission Group Name

  - `scopes: optional array of "com.cloudflare.api.account" or "com.cloudflare.api.account.zone" or "com.cloudflare.api.user" or "com.cloudflare.edge.r2.bucket"`

    Resources to which the Permission Group is scoped

    - `"com.cloudflare.api.account"`

    - `"com.cloudflare.api.account.zone"`

    - `"com.cloudflare.api.user"`

    - `"com.cloudflare.edge.r2.bucket"`

# Value

## Roll Token

**put** `/user/tokens/{token_id}/value`

Roll the token secret.

### Path Parameters

- `token_id: string`

  Token identifier tag.

### Body Parameters

- `body: unknown`

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

- `result: optional TokenValue`

  The token value.

### Example

```http
curl https://api.cloudflare.com/client/v4/user/tokens/$TOKEN_ID/value \
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
  "result": "8M7wS6hCpXVc-DoRnPPY_UCWPgy8aea4Wy6kCe5T"
}
```
