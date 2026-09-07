## Get active sessions

**get** `/accounts/{account_id}/access/users/{user_id}/active_sessions`

Get active sessions for a single user.

### Path Parameters

- `account_id: string`

  Identifier.

- `user_id: string`

  UUID.

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

- `result: optional array of object { expiration, metadata, name }`

  - `expiration: optional number`

  - `metadata: optional object { apps, expires, iat, 2 more }`

    - `apps: optional map[object { hostname, name, type, uid } ]`

      - `hostname: optional string`

      - `name: optional string`

      - `type: optional string`

      - `uid: optional string`

    - `expires: optional number`

    - `iat: optional number`

    - `nonce: optional string`

    - `ttl: optional number`

  - `name: optional string`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/users/$USER_ID/active_sessions \
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
      "expiration": 1694813506,
      "metadata": {
        "apps": {
          "foo": {
            "hostname": "test.example.com",
            "name": "app name",
            "type": "self_hosted",
            "uid": "cc2a8145-0128-4429-87f3-872c4d380c4e"
          }
        },
        "expires": 1694813506,
        "iat": 1694791905,
        "nonce": "X1aXj1lFVcqqyoXF",
        "ttl": 21600
      },
      "name": "name"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```
