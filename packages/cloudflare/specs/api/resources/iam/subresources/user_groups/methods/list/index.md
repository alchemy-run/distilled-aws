## List User Groups

**get** `/accounts/{account_id}/iam/user_groups`

List all the user groups for an account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Query Parameters

- `id: optional string`

  ID of the user group to be fetched.

- `direction: optional "asc" or "desc"`

  The sort order of returned user groups by name (ascending or descending).

  - `"asc"`

  - `"desc"`

- `fuzzyName: optional string`

  A string used for searching for user groups containing that substring.

- `name: optional string`

  Name of the user group to be fetched.

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

- `result: optional array of object { id, created_on, modified_on, 2 more }`

  A list of user groups for the account.

  - `id: string`

    User Group identifier tag.

  - `created_on: string`

    Timestamp for the creation of the user group

  - `modified_on: string`

    Last time the user group was modified.

  - `name: string`

    Name of the user group.

  - `policies: optional array of object { id, access, permission_groups, resource_groups }`

    Policies attached to the User group

    - `id: optional string`

      Policy identifier.

    - `access: optional "allow" or "deny"`

      Allow or deny operations against the resources.

      - `"allow"`

      - `"deny"`

    - `permission_groups: optional array of object { id, meta, name }`

      A set of permission groups that are specified to the policy.

      - `id: string`

        Identifier of the permission group.

      - `meta: optional object { key, value }`

        Attributes associated to the permission group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the permission group.

    - `resource_groups: optional array of object { id, scope, meta, name }`

      A list of resource groups that the policy applies to.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/user_groups \
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_on": "2024-03-01T12:21:02.0000Z",
      "modified_on": "2024-03-01T12:21:02.0000Z",
      "name": "My New User Group",
      "policies": [
        {
          "id": "f267e341f3dd4697bd3b9f71dd96247f",
          "access": "allow",
          "permission_groups": [
            {
              "id": "c8fed203ed3043cba015a93ad1616f1f",
              "meta": {
                "key": "key",
                "value": "value"
              },
              "name": "Zone Read"
            },
            {
              "id": "82e64a83756745bbbb1c9c2701bf816b",
              "meta": {
                "key": "key",
                "value": "value"
              },
              "name": "Magic Network Monitoring"
            }
          ],
          "resource_groups": [
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
      ]
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
