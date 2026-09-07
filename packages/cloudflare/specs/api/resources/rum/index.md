# RUM

# Site Info

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

## Get a Web Analytics site

**get** `/accounts/{account_id}/rum/site_info/{site_id}`

Retrieves a Web Analytics site.

### Path Parameters

- `account_id: string`

  Identifier.

- `site_id: string`

  Identifier.

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

- `result: optional Site`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rum/site_info/$SITE_ID \
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
}
```

## Create a Web Analytics site

**post** `/accounts/{account_id}/rum/site_info`

Creates a new Web Analytics site.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `auto_install: optional boolean`

  If enabled, the JavaScript snippet is automatically injected for orange-clouded sites.

- `host: optional string`

  The hostname to use for gray-clouded sites.

- `zone_tag: optional string`

  The zone identifier.

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

- `result: optional Site`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rum/site_info \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "auto_install": true,
          "host": "example.com",
          "zone_tag": "023e105f4ecef8ad9ca31a8372d0c353"
        }'
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
}
```

## Update a Web Analytics site

**put** `/accounts/{account_id}/rum/site_info/{site_id}`

Updates an existing Web Analytics site.

### Path Parameters

- `account_id: string`

  Identifier.

- `site_id: string`

  Identifier.

### Body Parameters

- `auto_install: optional boolean`

  If enabled, the JavaScript snippet is automatically injected for orange-clouded sites.

- `enabled: optional boolean`

  Enables or disables RUM. This option can be used only when auto_install is set to true.

- `host: optional string`

  The hostname to use for gray-clouded sites.

- `lite: optional boolean`

  If enabled, the JavaScript snippet will not be injected for visitors from the EU.

- `zone_tag: optional string`

  The zone identifier.

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

- `result: optional Site`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rum/site_info/$SITE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "auto_install": true,
          "enabled": true,
          "host": "example.com",
          "zone_tag": "023e105f4ecef8ad9ca31a8372d0c353"
        }'
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
}
```

## Delete a Web Analytics site

**delete** `/accounts/{account_id}/rum/site_info/{site_id}`

Deletes an existing Web Analytics site.

### Path Parameters

- `account_id: string`

  Identifier.

- `site_id: string`

  Identifier.

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

- `result: optional object { site_tag }`

  - `site_tag: optional string`

    The Web Analytics site identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rum/site_info/$SITE_ID \
    -X DELETE \
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
    "site_tag": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```

## Domain Types

### Site

- `Site object { auto_install, created, rules, 4 more }`

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

### Site Info Delete Response

- `SiteInfoDeleteResponse object { site_tag }`

  - `site_tag: optional string`

    The Web Analytics site identifier.

# Rules

## List rules in Web Analytics ruleset

**get** `/accounts/{account_id}/rum/v2/{ruleset_id}/rules`

Lists all the rules in a Web Analytics ruleset.

### Path Parameters

- `account_id: string`

  Identifier.

- `ruleset_id: string`

  The Web Analytics ruleset identifier.

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

- `result: optional object { rules, ruleset }`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rum/v2/$RULESET_ID/rules \
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
    }
  }
}
```

## Create a Web Analytics rule

**post** `/accounts/{account_id}/rum/v2/{ruleset_id}/rule`

Creates a new rule in a Web Analytics ruleset.

### Path Parameters

- `account_id: string`

  Identifier.

- `ruleset_id: string`

  The Web Analytics ruleset identifier.

### Body Parameters

- `host: optional string`

- `inclusive: optional boolean`

  Whether the rule includes or excludes traffic from being measured.

- `is_paused: optional boolean`

  Whether the rule is paused or not.

- `paths: optional array of string`

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

- `result: optional RUMRule`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rum/v2/$RULESET_ID/rule \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "host": "example.com",
          "inclusive": true,
          "paths": [
            "*"
          ]
        }'
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
}
```

## Update a Web Analytics rule

**put** `/accounts/{account_id}/rum/v2/{ruleset_id}/rule/{rule_id}`

Updates a rule in a Web Analytics ruleset.

### Path Parameters

- `account_id: string`

  Identifier.

- `ruleset_id: string`

  The Web Analytics ruleset identifier.

- `rule_id: string`

  The Web Analytics rule identifier.

### Body Parameters

- `host: optional string`

- `inclusive: optional boolean`

  Whether the rule includes or excludes traffic from being measured.

- `is_paused: optional boolean`

  Whether the rule is paused or not.

- `paths: optional array of string`

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

- `result: optional RUMRule`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rum/v2/$RULESET_ID/rule/$RULE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "host": "example.com",
          "inclusive": true,
          "paths": [
            "*"
          ]
        }'
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
}
```

## Delete a Web Analytics rule

**delete** `/accounts/{account_id}/rum/v2/{ruleset_id}/rule/{rule_id}`

Deletes an existing rule from a Web Analytics ruleset.

### Path Parameters

- `account_id: string`

  Identifier.

- `ruleset_id: string`

  The Web Analytics ruleset identifier.

- `rule_id: string`

  The Web Analytics rule identifier.

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

- `result: optional object { id }`

  - `id: optional string`

    The Web Analytics rule identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rum/v2/$RULESET_ID/rule/$RULE_ID \
    -X DELETE \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
  }
}
```

## Update Web Analytics rules

**post** `/accounts/{account_id}/rum/v2/{ruleset_id}/rules`

Modifies one or more rules in a Web Analytics ruleset with a single request.

### Path Parameters

- `account_id: string`

  Identifier.

- `ruleset_id: string`

  The Web Analytics ruleset identifier.

### Body Parameters

- `delete_rules: optional array of string`

  A list of rule identifiers to delete.

- `rules: optional array of object { id, host, inclusive, 2 more }`

  A list of rules to create or update.

  - `id: optional string`

    The Web Analytics rule identifier.

  - `host: optional string`

  - `inclusive: optional boolean`

  - `is_paused: optional boolean`

  - `paths: optional array of string`

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

- `result: optional object { rules, ruleset }`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rum/v2/$RULESET_ID/rules \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    }
  }
}
```

## Domain Types

### RUM Rule

- `RUMRule object { id, created, host, 4 more }`

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

### Rule List Response

- `RuleListResponse object { rules, ruleset }`

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

### Rule Delete Response

- `RuleDeleteResponse object { id }`

  - `id: optional string`

    The Web Analytics rule identifier.

### Rule Bulk Create Response

- `RuleBulkCreateResponse object { rules, ruleset }`

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
