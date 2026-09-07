# Members

## List User Group Members

**get** `/accounts/{account_id}/iam/user_groups/{user_group_id}/members`

List all the members attached to a user group.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `user_group_id: string`

  User Group identifier tag.

### Query Parameters

- `direction: optional "asc" or "desc"`

  The sort order of returned user group members by email.

  - `"asc"`

  - `"desc"`

- `fuzzyEmail: optional string`

  A string used for filtering members by partial email match.

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

- `result: optional array of object { id, email, status }`

  - `id: string`

    Account member identifier.

  - `email: optional string`

    The contact email address of the user.

  - `status: optional "accepted" or "pending"`

    The member's status in the account.

    - `"accepted"`

    - `"pending"`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/user_groups/$USER_GROUP_ID/members \
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
      "id": "4f5f0c14a2a41d5063dd301b2f829f04",
      "email": "user@example.com",
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

## Add User Group Members

**post** `/accounts/{account_id}/iam/user_groups/{user_group_id}/members`

Add members to a User Group.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `user_group_id: string`

  User Group identifier tag.

### Body Parameters

- `members: array of object { id }`

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

## Remove User Group Member

**delete** `/accounts/{account_id}/iam/user_groups/{user_group_id}/members/{member_id}`

Remove a member from User Group

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

- `result: optional object { id, email, status }`

  Member attached to a User Group.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/user_groups/$USER_GROUP_ID/members/$MEMBER_ID \
    -X DELETE \
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
    "email": "user@example.com",
    "status": "accepted"
  }
}
```

## Domain Types

### Member List Response

- `MemberListResponse object { id, email, status }`

  Member attached to a User Group.

  - `id: string`

    Account member identifier.

  - `email: optional string`

    The contact email address of the user.

  - `status: optional "accepted" or "pending"`

    The member's status in the account.

    - `"accepted"`

    - `"pending"`

### Member Get Response

- `MemberGetResponse object { id, created_at, email, 2 more }`

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

### Member Create Response

- `MemberCreateResponse object { id, email, status }`

  Member attached to a User Group.

  - `id: string`

    Account member identifier.

  - `email: optional string`

    The contact email address of the user.

  - `status: optional "accepted" or "pending"`

    The member's status in the account.

    - `"accepted"`

    - `"pending"`

### Member Update Response

- `MemberUpdateResponse object { id, email, status }`

  Member attached to a User Group.

  - `id: string`

    Account member identifier.

  - `email: optional string`

    The contact email address of the user.

  - `status: optional "accepted" or "pending"`

    The member's status in the account.

    - `"accepted"`

    - `"pending"`

### Member Delete Response

- `MemberDeleteResponse object { id, email, status }`

  Member attached to a User Group.

  - `id: string`

    Account member identifier.

  - `email: optional string`

    The contact email address of the user.

  - `status: optional "accepted" or "pending"`

    The member's status in the account.

    - `"accepted"`

    - `"pending"`
