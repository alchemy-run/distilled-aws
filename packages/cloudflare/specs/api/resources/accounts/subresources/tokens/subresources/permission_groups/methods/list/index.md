## List Permission Groups

**get** `/accounts/{account_id}/tokens/permission_groups`

Find all available permission groups for Account Owned API Tokens

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Query Parameters

- `name: optional string`

  Filter by the name of the permission group.
  The value must be URL-encoded.

- `scope: optional string`

  Filter by the scope of the permission group.
  The value must be URL-encoded.

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

- `result: optional array of object { id, category, name, scopes }`

  - `id: optional string`

    Public ID.

  - `category: optional "developer_platform" or "ai_and_machine_learning" or "dns_and_zones" or 10 more`

    Product category that this permission group belongs to.

    - `"developer_platform"`

    - `"ai_and_machine_learning"`

    - `"dns_and_zones"`

    - `"app_security"`

    - `"rules_and_configuration"`

    - `"cloudflare_one_and_zero_trust"`

    - `"analytics_and_logs"`

    - `"network_services"`

    - `"media"`

    - `"email_and_messaging"`

    - `"cache_and_performance"`

    - `"account_and_billing"`

    - `"other"`

  - `name: optional string`

    Permission Group Name

  - `scopes: optional array of "com.cloudflare.api.account" or "com.cloudflare.api.account.zone" or "com.cloudflare.api.user" or "com.cloudflare.edge.r2.bucket"`

    Resources to which the Permission Group is scoped

    - `"com.cloudflare.api.account"`

    - `"com.cloudflare.api.account.zone"`

    - `"com.cloudflare.api.user"`

    - `"com.cloudflare.edge.r2.bucket"`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tokens/permission_groups \
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
      "id": "7cf72faf220841aabcfdfab81c43c4f6",
      "category": "account_and_billing",
      "name": "Billing Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "9d24387c6e8544e2bc4024a03991339f",
      "category": "network_services",
      "name": "Load Balancing: Monitors and Pools Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "d2a1802cc9a34e30852f8b33869b2f3c",
      "category": "network_services",
      "name": "Load Balancing: Monitors and Pools Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "8b47d2786a534c08a1f94ee8f9f599ef",
      "category": "developer_platform",
      "name": "Workers KV Storage Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "f7f0eda5697f475c90846e879bab8666",
      "category": "developer_platform",
      "name": "Workers KV Storage Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "1a71c399035b4950a1bd1466bbe4f420",
      "category": "developer_platform",
      "name": "Workers Scripts Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "e086da7e2179491d91ee5f35b3ca210a",
      "category": "developer_platform",
      "name": "Workers Scripts Write",
      "scopes": [
        "com.cloudflare.api.account"
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
