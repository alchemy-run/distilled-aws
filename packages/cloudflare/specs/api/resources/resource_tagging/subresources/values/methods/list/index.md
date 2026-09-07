## List tag values

**get** `/accounts/{account_id}/tags/values/{tag_key}`

Lists all distinct values for a given tag key, optionally filtered by resource type.

### Path Parameters

- `account_id: string`

  Identifier.

- `tag_key: string`

### Query Parameters

- `cursor: optional string`

  Cursor for pagination.

- `type: optional "access_application" or "access_application_policy" or "access_group" or 24 more`

  Filter by resource type.

  - `"access_application"`

  - `"access_application_policy"`

  - `"access_group"`

  - `"account"`

  - `"ai_gateway"`

  - `"alerting_policy"`

  - `"alerting_webhook"`

  - `"api_gateway_operation"`

  - `"cloudflared_tunnel"`

  - `"custom_certificate"`

  - `"custom_hostname"`

  - `"d1_database"`

  - `"dns_record"`

  - `"durable_object_namespace"`

  - `"gateway_list"`

  - `"gateway_rule"`

  - `"image"`

  - `"kv_namespace"`

  - `"managed_client_certificate"`

  - `"queue"`

  - `"r2_bucket"`

  - `"resource_share"`

  - `"stream_live_input"`

  - `"stream_video"`

  - `"worker"`

  - `"worker_version"`

  - `"zone"`

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

- `result: optional array of string`

- `result_info: optional object { count, cursor }`

  - `count: optional number`

    Indicates the number of results returned in the current page.

  - `cursor: optional string`

    Provides a cursor for the next page of results. Include this value in the next request to continue pagination.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags/values/$TAG_KEY \
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
    "production",
    "staging"
  ],
  "result_info": {
    "count": 20,
    "cursor": "eyJhY2NvdW50X2lkIjoxMjM0NTY3ODkwfQ"
  }
}
```
