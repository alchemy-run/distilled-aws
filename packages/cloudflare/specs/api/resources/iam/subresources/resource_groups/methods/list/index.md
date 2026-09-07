## List Resource Groups

**get** `/accounts/{account_id}/iam/resource_groups`

List all the resource groups for an account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Query Parameters

- `id: optional string`

  ID of the resource group to be fetched.

- `name: optional string`

  Name of the resource group to be fetched.

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

- `result: optional array of object { id, scope, meta, name }`

  - `id: string`

    Identifier of the resource group.

  - `scope: array of object { key, objects }`

    The scope associated to the resource group

    - `key: string`

      This is a combination of pre-defined resource name and identifier (like Account ID etc.)

    - `objects: array of object { key }`

      A list of scope objects for additional context.

      - `key: string`

        This is a combination of pre-defined resource name and identifier (like Zone ID etc.)

  - `meta: optional object { key, value }`

    Attributes associated to the resource group.

    - `key: optional string`

    - `value: optional string`

  - `name: optional string`

    Name of the resource group.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/resource_groups \
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
      "id": "6d7f2f5f5b1d4a0e9081fdc98d432fd1",
      "scope": [
        {
          "key": "com.cloudflare.api.account.eb78d65290b24279ba6f44721b3ea3c4",
          "objects": [
            {
              "key": "com.cloudflare.api.account.zone.23f8d65290b24279ba6f44721b3eaad5"
            }
          ]
        }
      ],
      "meta": {
        "key": "key",
        "value": "value"
      },
      "name": "com.cloudflare.api.account.eb78d65290b24279ba6f44721b3ea3c4"
    }
  ]
}
```
