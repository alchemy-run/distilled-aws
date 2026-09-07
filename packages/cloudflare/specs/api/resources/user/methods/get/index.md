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
