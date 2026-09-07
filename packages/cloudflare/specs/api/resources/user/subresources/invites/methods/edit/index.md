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
