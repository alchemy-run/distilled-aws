## Model Search

**get** `/accounts/{account_id}/ai/models/search`

Searches Workers AI models by name or description.

### Path Parameters

- `account_id: string`

### Query Parameters

- `author: optional string`

  Filter by Author

- `format: optional "openrouter"`

  If set, return models in the requested marketplace format instead of the default response.

  - `"openrouter"`

- `hide_experimental: optional boolean`

  Filter to hide experimental models

- `include_deprecated: optional boolean`

  If true, include models whose planned_deprecation_date is in the past — but only within a three-month grace window after that date. Models whose planned_deprecation_date is more than three months in the past remain hidden regardless of this flag. Future planned-deprecation dates are always included regardless of this flag. Defaults to false, preserving the existing behavior of hiding all past-dated deprecations.

- `page: optional number`

- `per_page: optional number`

- `search: optional string`

  Search

- `source: optional number`

  Filter by Source Id

- `task: optional string`

  Filter by Task Name

### Returns

- `object { errors, messages, result, success }`

  - `errors: array of unknown`

  - `messages: array of string`

  - `result: array of unknown`

  - `success: boolean`

- `Data object { data }`

  Marketplace-format response. See https://openrouter.ai/docs/guides/get-started/for-providers

  - `data: array of unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/models/search \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {}
  ],
  "messages": [
    "string"
  ],
  "result": [
    {}
  ],
  "success": true
}
```
