## Update Account

**put** `/accounts/{account_id}`

Update an existing account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Body Parameters

- `id: string`

  Identifier

- `name: string`

  Account name

- `type: "standard" or "enterprise"`

  - `"standard"`

  - `"enterprise"`

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

- `result: optional Account`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "id": "023e105f4ecef8ad9ca31a8372d0c353",
          "name": "Demo Account",
          "type": "standard"
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
}
```
