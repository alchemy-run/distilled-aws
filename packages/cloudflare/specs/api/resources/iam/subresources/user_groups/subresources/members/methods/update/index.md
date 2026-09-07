## Update User Group Members

**put** `/accounts/{account_id}/iam/user_groups/{user_group_id}/members`

Replace the set of members attached to a User Group.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `user_group_id: string`

  User Group identifier tag.

### Body Parameters

- `members: array of object { id }`

  Set/Replace members to a user group.

  - `id: string`

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

- `result: optional array of object { id, email, status }`

  - `id: string`

    Account member identifier.

  - `email: optional string`

    The contact email address of the user.

  - `status: optional "accepted" or "pending"`

    The member's status in the account.

    - `"accepted"`

    - `"pending"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/user_groups/$USER_GROUP_ID/members \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '[
          {
            "id": "023e105f4ecef8ad9ca31a8372d0c353"
          }
        ]'
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
      "id": "4f5f0c14a2a41d5063dd301b2f829f04",
      "email": "user@example.com",
      "status": "accepted"
    }
  ]
}
```
