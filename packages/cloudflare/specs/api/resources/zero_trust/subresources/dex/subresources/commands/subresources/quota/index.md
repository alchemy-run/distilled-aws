# Quota

## Returns account commands usage, quota, and reset time

**get** `/accounts/{account_id}/dex/commands/quota`

Retrieves the current quota usage and limits for device commands within a specific account, including the time when the quota will reset

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

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

- `result: optional object { quota, quota_usage, reset_time }`

  - `quota: number`

    The total number of commands that can be initiated for an account.

  - `quota_usage: number`

    The number of commands that have been initiated for an account.

  - `reset_time: string`

    The time when the quota resets.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/commands/quota \
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
    "quota": 0,
    "quota_usage": 0,
    "reset_time": "2019-12-27T18:11:19.117Z"
  },
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Domain Types

### Quota Get Response

- `QuotaGetResponse object { quota, quota_usage, reset_time }`

  - `quota: number`

    The total number of commands that can be initiated for an account.

  - `quota_usage: number`

    The number of commands that have been initiated for an account.

  - `reset_time: string`

    The time when the quota resets.
