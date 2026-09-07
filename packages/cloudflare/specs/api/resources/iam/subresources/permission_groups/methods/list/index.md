## List Account Permission Groups

**get** `/accounts/{account_id}/iam/permission_groups`

List all the permissions groups for an account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Query Parameters

- `id: optional string`

  ID of the permission group to be fetched.

- `label: optional string`

  Label of the permission group to be fetched.

- `name: optional string`

  Name of the permission group to be fetched.

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

- `result: optional array of object { id, meta, name }`

  A set of permission groups that are specified to the policy.

  - `id: string`

    Identifier of the permission group.

  - `meta: optional object { key, value }`

    Attributes associated to the permission group.

    - `key: optional string`

    - `value: optional string`

  - `name: optional string`

    Name of the permission group.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/permission_groups \
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
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```
