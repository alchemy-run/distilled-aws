# Custom Pages

## List custom pages

**get** `/{accounts_or_zones}/{account_or_zone_id}/custom_pages`

Fetches all the custom pages.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

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

- `result: optional array of object { id, created_on, description, 5 more }`

  - `id: optional string`

  - `created_on: optional string`

  - `description: optional string`

  - `modified_on: optional string`

  - `preview_target: optional string`

  - `required_tokens: optional array of string`

  - `state: optional "default" or "customized"`

    The custom page state.

    - `"default"`

    - `"customized"`

  - `url: optional string`

    The URL associated with the custom page.

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
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/custom_pages \
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
      "id": "basic_challenge",
      "created_on": "2014-01-01T05:20:00.12345Z",
      "description": "Basic Challenge",
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "preview_target": "block:basic-sec-captcha",
      "required_tokens": [
        "::CAPTCHA_BOX::"
      ],
      "state": "default",
      "url": "http://www.example.com"
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

## Get a custom page

**get** `/{accounts_or_zones}/{account_or_zone_id}/custom_pages/{identifier}`

Fetches the details of a custom page.

### Path Parameters

- `identifier: "1000_errors" or "500_errors" or "basic_challenge" or 7 more`

  Error Page Types

  - `"1000_errors"`

  - `"500_errors"`

  - `"basic_challenge"`

  - `"country_challenge"`

  - `"ip_block"`

  - `"managed_challenge"`

  - `"ratelimit_block"`

  - `"under_attack"`

  - `"waf_block"`

  - `"waf_challenge"`

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

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

- `result: optional object { id, created_on, description, 5 more }`

  - `id: optional string`

  - `created_on: optional string`

  - `description: optional string`

  - `modified_on: optional string`

  - `preview_target: optional string`

  - `required_tokens: optional array of string`

  - `state: optional "default" or "customized"`

    The custom page state.

    - `"default"`

    - `"customized"`

  - `url: optional string`

    The URL associated with the custom page.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/custom_pages/$IDENTIFIER \
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
  "result": {
    "id": "basic_challenge",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "description": "Basic Challenge",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "preview_target": "block:basic-sec-captcha",
    "required_tokens": [
      "::CAPTCHA_BOX::"
    ],
    "state": "default",
    "url": "http://www.example.com"
  }
}
```

## Update a custom page

**put** `/{accounts_or_zones}/{account_or_zone_id}/custom_pages/{identifier}`

Updates the configuration of an existing custom page.

### Path Parameters

- `identifier: "1000_errors" or "500_errors" or "basic_challenge" or 7 more`

  Error Page Types

  - `"1000_errors"`

  - `"500_errors"`

  - `"basic_challenge"`

  - `"country_challenge"`

  - `"ip_block"`

  - `"managed_challenge"`

  - `"ratelimit_block"`

  - `"under_attack"`

  - `"waf_block"`

  - `"waf_challenge"`

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `state: "default" or "customized"`

  The custom page state.

  - `"default"`

  - `"customized"`

- `url: string`

  The URL associated with the custom page.

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

- `result: optional object { id, created_on, description, 5 more }`

  - `id: optional string`

  - `created_on: optional string`

  - `description: optional string`

  - `modified_on: optional string`

  - `preview_target: optional string`

  - `required_tokens: optional array of string`

  - `state: optional "default" or "customized"`

    The custom page state.

    - `"default"`

    - `"customized"`

  - `url: optional string`

    The URL associated with the custom page.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/custom_pages/$IDENTIFIER \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "state": "default",
          "url": "http://www.example.com"
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
    "id": "basic_challenge",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "description": "Basic Challenge",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "preview_target": "block:basic-sec-captcha",
    "required_tokens": [
      "::CAPTCHA_BOX::"
    ],
    "state": "default",
    "url": "http://www.example.com"
  }
}
```

## Domain Types

### Custom Page List Response

- `CustomPageListResponse object { id, created_on, description, 5 more }`

  - `id: optional string`

  - `created_on: optional string`

  - `description: optional string`

  - `modified_on: optional string`

  - `preview_target: optional string`

  - `required_tokens: optional array of string`

  - `state: optional "default" or "customized"`

    The custom page state.

    - `"default"`

    - `"customized"`

  - `url: optional string`

    The URL associated with the custom page.

### Custom Page Get Response

- `CustomPageGetResponse object { id, created_on, description, 5 more }`

  - `id: optional string`

  - `created_on: optional string`

  - `description: optional string`

  - `modified_on: optional string`

  - `preview_target: optional string`

  - `required_tokens: optional array of string`

  - `state: optional "default" or "customized"`

    The custom page state.

    - `"default"`

    - `"customized"`

  - `url: optional string`

    The URL associated with the custom page.

### Custom Page Update Response

- `CustomPageUpdateResponse object { id, created_on, description, 5 more }`

  - `id: optional string`

  - `created_on: optional string`

  - `description: optional string`

  - `modified_on: optional string`

  - `preview_target: optional string`

  - `required_tokens: optional array of string`

  - `state: optional "default" or "customized"`

    The custom page state.

    - `"default"`

    - `"customized"`

  - `url: optional string`

    The URL associated with the custom page.

# Assets

## List custom assets

**get** `/{accounts_or_zones}/{account_or_zone_id}/custom_pages/assets`

Fetches all the custom assets.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Query Parameters

- `page: optional number`

- `per_page: optional number`

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

- `result: optional array of object { description, last_updated, name, 2 more }`

  - `description: optional string`

    A short description of the custom asset.

  - `last_updated: optional string`

  - `name: optional string`

    The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (_).

  - `size_bytes: optional number`

    The size of the asset content in bytes.

  - `url: optional string`

    The URL where the asset content is fetched from.

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
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/custom_pages/assets \
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
      "description": "Custom 500 error page",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "name": "my_custom_error_page",
      "size_bytes": 1024,
      "url": "https://example.com/error.html"
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

## Get a custom asset

**get** `/{accounts_or_zones}/{account_or_zone_id}/custom_pages/assets/{asset_name}`

Fetches the details of a custom asset.

### Path Parameters

- `asset_name: string`

  The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (_).

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

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

- `result: optional object { description, last_updated, name, 2 more }`

  - `description: optional string`

    A short description of the custom asset.

  - `last_updated: optional string`

  - `name: optional string`

    The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (_).

  - `size_bytes: optional number`

    The size of the asset content in bytes.

  - `url: optional string`

    The URL where the asset content is fetched from.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/custom_pages/assets/$ASSET_NAME \
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
  "result": {
    "description": "Custom 500 error page",
    "last_updated": "2014-01-01T05:20:00.12345Z",
    "name": "my_custom_error_page",
    "size_bytes": 1024,
    "url": "https://example.com/error.html"
  }
}
```

## Create a custom asset

**post** `/{accounts_or_zones}/{account_or_zone_id}/custom_pages/assets`

Creates a new custom asset.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `description: string`

  A short description of the custom asset.

- `name: string`

  The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (_).

- `url: string`

  The URL where the asset content is fetched from.

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

- `result: optional object { description, last_updated, name, 2 more }`

  - `description: optional string`

    A short description of the custom asset.

  - `last_updated: optional string`

  - `name: optional string`

    The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (_).

  - `size_bytes: optional number`

    The size of the asset content in bytes.

  - `url: optional string`

    The URL where the asset content is fetched from.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/custom_pages/assets \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "description": "Custom 500 error page",
          "name": "my_custom_error_page",
          "url": "https://example.com/error.html"
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
    "description": "Custom 500 error page",
    "last_updated": "2014-01-01T05:20:00.12345Z",
    "name": "my_custom_error_page",
    "size_bytes": 1024,
    "url": "https://example.com/error.html"
  }
}
```

## Update a custom asset

**put** `/{accounts_or_zones}/{account_or_zone_id}/custom_pages/assets/{asset_name}`

Updates the configuration of an existing custom asset.

### Path Parameters

- `asset_name: string`

  The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (_).

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `description: string`

  A short description of the custom asset.

- `url: string`

  The URL where the asset content is fetched from.

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

- `result: optional object { description, last_updated, name, 2 more }`

  - `description: optional string`

    A short description of the custom asset.

  - `last_updated: optional string`

  - `name: optional string`

    The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (_).

  - `size_bytes: optional number`

    The size of the asset content in bytes.

  - `url: optional string`

    The URL where the asset content is fetched from.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/custom_pages/assets/$ASSET_NAME \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "description": "Custom 500 error page",
          "url": "https://example.com/error.html"
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
    "description": "Custom 500 error page",
    "last_updated": "2014-01-01T05:20:00.12345Z",
    "name": "my_custom_error_page",
    "size_bytes": 1024,
    "url": "https://example.com/error.html"
  }
}
```

## Delete a custom asset

**delete** `/{accounts_or_zones}/{account_or_zone_id}/custom_pages/assets/{asset_name}`

Deletes an existing custom asset.

### Path Parameters

- `asset_name: string`

  The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (_).

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/custom_pages/assets/$ASSET_NAME \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

## Domain Types

### Asset List Response

- `AssetListResponse object { description, last_updated, name, 2 more }`

  - `description: optional string`

    A short description of the custom asset.

  - `last_updated: optional string`

  - `name: optional string`

    The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (_).

  - `size_bytes: optional number`

    The size of the asset content in bytes.

  - `url: optional string`

    The URL where the asset content is fetched from.

### Asset Get Response

- `AssetGetResponse object { description, last_updated, name, 2 more }`

  - `description: optional string`

    A short description of the custom asset.

  - `last_updated: optional string`

  - `name: optional string`

    The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (_).

  - `size_bytes: optional number`

    The size of the asset content in bytes.

  - `url: optional string`

    The URL where the asset content is fetched from.

### Asset Create Response

- `AssetCreateResponse object { description, last_updated, name, 2 more }`

  - `description: optional string`

    A short description of the custom asset.

  - `last_updated: optional string`

  - `name: optional string`

    The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (_).

  - `size_bytes: optional number`

    The size of the asset content in bytes.

  - `url: optional string`

    The URL where the asset content is fetched from.

### Asset Update Response

- `AssetUpdateResponse object { description, last_updated, name, 2 more }`

  - `description: optional string`

    A short description of the custom asset.

  - `last_updated: optional string`

  - `name: optional string`

    The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (_).

  - `size_bytes: optional number`

    The size of the asset content in bytes.

  - `url: optional string`

    The URL where the asset content is fetched from.
