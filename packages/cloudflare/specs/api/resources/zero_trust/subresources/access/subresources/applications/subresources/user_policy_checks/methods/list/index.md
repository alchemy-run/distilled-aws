## Test Access policies

**get** `/{accounts_or_zones}/{account_or_zone_id}/access/apps/{app_id}/user_policy_checks`

Tests if a specific user has permission to access an application.

### Path Parameters

- `app_id: AppID`

  Identifier.

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

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

- `result: optional object { app_state, user_identity }`

  - `app_state: optional object { app_uid, aud, hostname, 3 more }`

    - `app_uid: optional string`

      UUID.

    - `aud: optional string`

    - `hostname: optional string`

    - `name: optional string`

    - `policies: optional array of unknown`

    - `status: optional string`

  - `user_identity: optional object { id, account_id, device_sessions, 8 more }`

    - `id: optional string`

    - `account_id: optional string`

    - `device_sessions: optional unknown`

    - `email: optional string`

    - `geo: optional object { country }`

      - `country: optional string`

    - `iat: optional number`

    - `is_gateway: optional boolean`

    - `is_warp: optional boolean`

    - `name: optional string`

    - `user_uuid: optional string`

      UUID.

    - `version: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/apps/$APP_ID/user_policy_checks \
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
    "app_state": {
      "app_uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "aud": "737646a56ab1df6ec9bddc7e5ca84eaf3b0768850f3ffb5d74f1534911fe389",
      "hostname": "test.com",
      "name": "Test App",
      "policies": [
        {
          "decision": "allow",
          "exclude": [],
          "include": [
            {
              "_type": "email",
              "email": "testuser@gmail.com"
            }
          ],
          "precedence": 1,
          "require": [],
          "status": "Success"
        }
      ],
      "status": "Success"
    },
    "user_identity": {
      "id": "1164449231815010287495",
      "account_id": "41ecfbb341f033e52b46742756aabb8b",
      "device_sessions": {},
      "email": "testuser@gmail.com",
      "geo": {
        "country": "US"
      },
      "iat": 0,
      "is_gateway": false,
      "is_warp": false,
      "name": "Test User",
      "user_uuid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "version": 0
    }
  }
}
```
