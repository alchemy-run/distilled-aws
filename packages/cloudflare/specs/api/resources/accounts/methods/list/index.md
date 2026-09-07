## List Accounts

**get** `/accounts`

List all accounts you have ownership or verified access to.

### Query Parameters

- `direction: optional "asc" or "desc"`

  Direction to order results.

  - `"asc"`

  - `"desc"`

- `name: optional string`

  Name of the account.

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

- `result: optional array of Account`

  - `id: string`

    Identifier

  - `name: string`

    Account name

  - `type: "standard" or "enterprise"`

    - `"standard"`

    - `"enterprise"`

  - `created_on: optional string`

    Timestamp for the creation of the account

  - `managed_by: optional object { parent_org_id, parent_org_name }`

    Parent container details

    - `parent_org_id: optional string`

      ID of the parent Organization, if one exists

    - `parent_org_name: optional string`

      Name of the parent Organization, if one exists

  - `settings: optional object { abuse_contact_email, enforce_twofactor }`

    Account settings

    - `abuse_contact_email: optional string`

      Sets an abuse contact email to notify for abuse reports.

    - `enforce_twofactor: optional boolean`

      Indicates whether membership in this account requires that
      Two-Factor Authentication is enabled

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
curl https://api.cloudflare.com/client/v4/accounts \
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
      "name": "Demo Account",
      "type": "standard",
      "created_on": "2014-03-01T12:21:02.0000Z",
      "managed_by": {
        "parent_org_id": "4536bcfad5faccb111b47003c79917fa",
        "parent_org_name": "Demo Parent Organization"
      },
      "settings": {
        "abuse_contact_email": "abuse_contact_email",
        "enforce_twofactor": true
      }
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
