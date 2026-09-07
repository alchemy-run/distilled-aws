## Pool Health Details

**get** `/accounts/{account_id}/load_balancers/pools/{pool_id}/health`

Fetch the latest pool health status for a single pool.

### Path Parameters

- `account_id: string`

  Identifier.

- `pool_id: string`

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

- `result: object { pool_id, pop_health }`

  A list of regions from which to run health checks. Null means every Cloudflare data center.

  - `pool_id: optional string`

    Pool ID.

  - `pop_health: optional object { healthy, origins }`

    List of regions and associated health status.

    - `healthy: optional boolean`

      Whether health check in region is healthy.

    - `origins: optional array of object { ip }`

      - `ip: optional object { failure_reason, healthy, response_code, rtt }`

        - `failure_reason: optional string`

          Failure reason.

        - `healthy: optional boolean`

          Origin health status.

        - `response_code: optional number`

          Response code from origin health check.

        - `rtt: optional string`

          Origin RTT (Round Trip Time) response.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/pools/$POOL_ID/health \
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
    "pool_id": "17b5962d775c646f3f9725cbc7a53df4",
    "pop_health": {
      "healthy": true,
      "origins": [
        {
          "ip": {
            "failure_reason": "No failure reasons",
            "healthy": true,
            "response_code": 200,
            "rtt": "201.5ms"
          }
        }
      ]
    }
  },
  "success": true
}
```
