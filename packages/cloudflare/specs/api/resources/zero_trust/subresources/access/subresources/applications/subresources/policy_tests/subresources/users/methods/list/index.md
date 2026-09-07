## Get an Access policy test users page

**get** `/accounts/{account_id}/access/policy-tests/{policy_test_id}/users`

Fetches a single page of user results from an Access policy test.

### Path Parameters

- `account_id: string`

  Identifier.

- `policy_test_id: string`

  The UUID of the policy test.

### Query Parameters

- `page: optional number`

  Page number of results.

- `per_page: optional number`

- `status: optional "success" or "fail" or "error"`

  Filter users by their policy evaluation status.

  - `"success"`

  - `"fail"`

  - `"error"`

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

- `result: optional array of object { id, email, name, status }`

  Page of processed users.

  - `id: optional string`

    UUID.

  - `email: optional string`

    The email of the user.

  - `name: optional string`

    The name of the user.

  - `status: optional "approved" or "blocked" or "error"`

    Policy evaluation result for an individual user.

    - `"approved"`

    - `"blocked"`

    - `"error"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policy-tests/$POLICY_TEST_ID/users \
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
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "email": "jdoe@example.com",
      "name": "Jane Doe",
      "status": "approved"
    }
  ]
}
```
