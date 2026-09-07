## Get the current status of a given Access policy test

**get** `/accounts/{account_id}/access/policy-tests/{policy_test_id}`

Fetches the current status of a given Access policy test.

### Path Parameters

- `account_id: string`

  Identifier.

- `policy_test_id: string`

  The UUID of the policy test.

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

- `result: optional object { id, percent_approved, percent_blocked, 7 more }`

  - `id: optional string`

    The UUID of the policy test.

  - `percent_approved: optional number`

    The percentage of (processed) users approved based on policy evaluation results.

  - `percent_blocked: optional number`

    The percentage of (processed) users blocked based on policy evaluation results.

  - `percent_errored: optional number`

    The percentage of (processed) users errored based on policy evaluation results.

  - `percent_users_processed: optional number`

    The percentage of users processed so far (of the entire user base).

  - `status: optional "blocked" or "processing" or "exceeded time" or "complete"`

    The status of the policy test.

    - `"blocked"`

    - `"processing"`

    - `"exceeded time"`

    - `"complete"`

  - `total_users: optional number`

    The total number of users in the user base.

  - `users_approved: optional number`

    The number of (processed) users approved based on policy evaluation results.

  - `users_blocked: optional number`

    The number of (processed) users blocked based on policy evaluation results.

  - `users_errored: optional number`

    The number of (processed) users errored based on policy evaluation results.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policy-tests/$POLICY_TEST_ID \
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
    "id": "f1a8b3c9d4e5f6789a0b1c2d3e4f5678a9b0c1d2e3f4a5b67890c1d2e3f4b5a6",
    "percent_approved": 25,
    "percent_blocked": 25,
    "percent_errored": 25,
    "percent_users_processed": 50,
    "status": "complete",
    "total_users": 20,
    "users_approved": 5,
    "users_blocked": 5,
    "users_errored": 5
  }
}
```
