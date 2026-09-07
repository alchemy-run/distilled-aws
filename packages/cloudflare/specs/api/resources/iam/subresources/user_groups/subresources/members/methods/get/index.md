## Get User Group Member

**get** `/accounts/{account_id}/iam/user_groups/{user_group_id}/members/{member_id}`

Get details of a specific member in a user group.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `user_group_id: string`

  User Group identifier tag.

- `member_id: string`

  The identifier of an existing account Member.

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

- `result: optional object { id, created_at, email, 2 more }`

  Detailed member information for a User Group member.

  - `id: string`

    Account member identifier.

  - `created_at: optional string`

    When the member was added to the user group.

  - `email: optional string`

    The contact email address of the user.

  - `status: optional "accepted" or "pending"`

    The member's status in the account.

    - `"accepted"`

    - `"pending"`

  - `user: optional object { id, email, first_name, last_name }`

    Details of the user associated with this membership.

    - `id: optional string`

      User identifier tag.

    - `email: optional string`

      The contact email address of the user.

    - `first_name: optional string`

      User's first name.

    - `last_name: optional string`

      User's last name.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/user_groups/$USER_GROUP_ID/members/$MEMBER_ID \
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
    "id": "4f5f0c14a2a41d5063dd301b2f829f04",
    "created_at": "2026-01-15T10:30:00Z",
    "email": "user@example.com",
    "status": "accepted",
    "user": {
      "id": "7c5dae5552338874e5053f2534d2767a",
      "email": "user@example.com",
      "first_name": "Alice",
      "last_name": "Smith"
    }
  }
}
```
