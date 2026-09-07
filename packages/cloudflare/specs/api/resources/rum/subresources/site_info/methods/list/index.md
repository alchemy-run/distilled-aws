## List Web Analytics sites

**get** `/accounts/{account_id}/rum/site_info/list`

Lists all Web Analytics sites of an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `order_by: optional "host" or "created"`

  The property used to sort the list of results.

  - `"host"`

  - `"created"`

- `page: optional number`

  Current page within the paginated list of results.

- `per_page: optional number`

  Number of items to return per page of results.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: boolean`

  Whether the API call was successful.

- `result: optional array of Site`

  - `auto_install: optional boolean`

    If enabled, the JavaScript snippet is automatically injected for orange-clouded sites.

  - `created: optional string`

  - `rules: optional array of RUMRule`

    A list of rules.

    - `id: optional string`

      The Web Analytics rule identifier.

    - `created: optional string`

    - `host: optional string`

      The hostname the rule will be applied to.

    - `inclusive: optional boolean`

      Whether the rule includes or excludes traffic from being measured.

    - `is_paused: optional boolean`

      Whether the rule is paused or not.

    - `paths: optional array of string`

      The paths the rule will be applied to.

    - `priority: optional number`

  - `ruleset: optional object { id, enabled, zone_name, zone_tag }`

    - `id: optional string`

      The Web Analytics ruleset identifier.

    - `enabled: optional boolean`

      Whether the ruleset is enabled.

    - `zone_name: optional string`

    - `zone_tag: optional string`

      The zone identifier.

  - `site_tag: optional string`

    The Web Analytics site identifier.

  - `site_token: optional string`

    The Web Analytics site token.

  - `snippet: optional string`

    Encoded JavaScript snippet.

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    The total number of items on the current page.

  - `page: optional number`

    Current page within the paginated list of results.

  - `per_page: optional number`

    The maximum number of items to return per page of results.

  - `total_count: optional number`

    The total number of items.

  - `total_pages: optional number`

    The total number of pages.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rum/site_info/list \
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
      "auto_install": true,
      "created": "2014-01-01T05:20:00.12345Z",
      "rules": [
        {
          "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
          "created": "2014-01-01T05:20:00.12345Z",
          "host": "example.com",
          "inclusive": true,
          "is_paused": false,
          "paths": [
            "*"
          ],
          "priority": 1000
        }
      ],
      "ruleset": {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "enabled": true,
        "zone_name": "example.com",
        "zone_tag": "023e105f4ecef8ad9ca31a8372d0c353"
      },
      "site_tag": "023e105f4ecef8ad9ca31a8372d0c353",
      "site_token": "023e105f4ecef8ad9ca31a8372d0c353",
      "snippet": "<!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{\"token\": \"bc40a2d1b5834453aba85c1b9a3054da\"}'></script><!-- End Cloudflare Web Analytics -->"
    }
  ],
  "result_info": {
    "count": 10,
    "page": 1,
    "per_page": 10,
    "total_count": 25,
    "total_pages": 3
  }
}
```
