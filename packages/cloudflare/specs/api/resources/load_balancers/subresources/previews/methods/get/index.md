## Preview Result

**get** `/accounts/{account_id}/load_balancers/preview/{preview_id}`

Get the result of a previous preview operation using the provided preview_id.

### Path Parameters

- `account_id: string`

  Identifier.

- `preview_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: map[object { healthy, origins } ]`

  Resulting health data from a preview operation.

  - `healthy: optional boolean`

  - `origins: optional array of map[object { failure_reason, healthy, response_code, rtt } ]`

    - `failure_reason: optional string`

    - `healthy: optional boolean`

    - `response_code: optional number`

    - `rtt: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/preview/$PREVIEW_ID \
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
  "result": {
    "abwlnp5jbqn45ecgxd03erbgtxtqai0d": {
      "healthy": true,
      "origins": [
        {
          "originone.example.com.": {
            "failure_reason": "No failures",
            "healthy": true,
            "response_code": 200,
            "rtt": "66ms"
          }
        }
      ]
    }
  },
  "success": true
}
```
