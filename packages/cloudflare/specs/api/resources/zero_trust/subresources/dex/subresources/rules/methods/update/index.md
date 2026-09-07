## Update a DEX Rule

**patch** `/accounts/{account_id}/dex/rules/{rule_id}`

Update a DEX Rule.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

- `rule_id: string`

  API Resource UUID tag.

### Body Parameters

- `description: optional string`

- `match: optional string`

  The wirefilter expression to match.

- `name: optional string`

  The name of the Rule.

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

- `result: optional object { id, created_at, match, 4 more }`

  - `id: string`

    API Resource UUID tag.

  - `created_at: string`

  - `match: string`

  - `name: string`

  - `description: optional string`

  - `targeted_tests: optional array of object { data, enabled, name, test_id }`

    - `data: object { host, kind, method }`

      The configuration object which contains the details for the WARP client to conduct the test.

      - `host: string`

        The desired endpoint to test.

      - `kind: "http" or "traceroute"`

        The type of test.

        - `"http"`

        - `"traceroute"`

      - `method: optional "GET"`

        The HTTP request method type.

        - `"GET"`

    - `enabled: boolean`

    - `name: string`

    - `test_id: string`

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/rules/$RULE_ID \
    -X PATCH \
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
  "result": {
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2023-07-16 15:00:00+00",
    "match": "match",
    "name": "name",
    "description": "description",
    "targeted_tests": [
      {
        "data": {
          "host": "https://dash.cloudflare.com",
          "kind": "http",
          "method": "GET"
        },
        "enabled": true,
        "name": "name",
        "test_id": "test_id"
      }
    ],
    "updated_at": "2023-07-16 15:00:00+00"
  }
}
```
