## List all SYN Protection rules.

**get** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules`

List all SYN Protection rules for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional string`

  The direction of ordering (ASC or DESC). Defaults to 'ASC'.

- `order: optional string`

  The field to order by. Defaults to 'prefix'.

- `page: optional number`

  The page number for pagination. Defaults to 1.

- `per_page: optional number`

  The number of items per page. Must be between 10 and 1000. Defaults to 25.

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

- `result: optional array of object { id, burst_sensitivity, created_on, 6 more }`

  - `id: string`

    The unique ID of the SYN Protection rule.

  - `burst_sensitivity: string`

    The burst sensitivity. Must be one of 'low', 'medium', 'high'.

  - `created_on: string`

    The creation timestamp of the SYN Protection rule.

  - `mitigation_type: string`

    The type of mitigation for SYN Protection. Must be one of 'challenge' or 'retransmit'.

  - `mode: string`

    The mode for SYN Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the SYN Protection rule.

  - `name: string`

    The name of the SYN Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

  - `rate_sensitivity: string`

    The rate sensitivity. Must be one of 'low', 'medium', 'high'.

  - `scope: string`

    The scope for the SYN Protection rule. Must be one of 'global', 'region', or 'datacenter'.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/rules \
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
      "id": "id",
      "burst_sensitivity": "burst_sensitivity",
      "created_on": "2019-12-27T18:11:19.117Z",
      "mitigation_type": "mitigation_type",
      "mode": "mode",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "rate_sensitivity": "rate_sensitivity",
      "scope": "scope"
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
