## Create Device DEX test

**post** `/accounts/{account_id}/dex/devices/dex_tests`

Create a DEX test.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

### Body Parameters

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

  Determines whether or not the test is active.

- `interval: string`

  How often the test will run.

- `name: string`

  The name of the DEX test. Must be unique.

- `description: optional string`

  Additional details about the test.

- `target_policies: optional array of object { id, default, name }`

  DEX rules targeted by this test

  - `id: string`

    The id of the DEX rule.

  - `default: optional boolean`

    Whether the DEX rule is the account default.

  - `name: optional string`

    The name of the DEX rule.

- `targeted: optional boolean`

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

- `result: optional object { data, enabled, interval, 5 more }`

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

    Determines whether or not the test is active.

  - `interval: string`

    How often the test will run.

  - `name: string`

    The name of the DEX test. Must be unique.

  - `description: optional string`

    Additional details about the test.

  - `target_policies: optional array of object { id, default, name }`

    DEX rules targeted by this test

    - `id: string`

      The id of the DEX rule.

    - `default: optional boolean`

      Whether the DEX rule is the account default.

    - `name: optional string`

      The name of the DEX rule.

  - `targeted: optional boolean`

  - `test_id: optional string`

    The unique identifier for the test.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/devices/dex_tests \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "data": {
            "host": "https://dash.cloudflare.com",
            "kind": "http",
            "method": "GET"
          },
          "enabled": true,
          "interval": "30m",
          "name": "HTTP dash health check",
          "description": "Checks the dash endpoint every 30 minutes"
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
    "data": {
      "host": "https://dash.cloudflare.com",
      "kind": "http",
      "method": "GET"
    },
    "enabled": true,
    "interval": "30m",
    "name": "HTTP dash health check",
    "description": "Checks the dash endpoint every 30 minutes",
    "target_policies": [
      {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "default": true,
        "name": "name"
      }
    ],
    "targeted": true,
    "test_id": "372e67954025e0ba6aaa6d586b9e0b59"
  }
}
```
