# Custom Pages

## List custom pages

**get** `/accounts/{account_id}/access/custom_pages`

List custom pages

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `page: optional number`

  Page number of results.

- `per_page: optional number`

  Number of results per page.

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

- `result: optional array of CustomPageWithoutHTML`

  - `name: string`

    Custom page name.

  - `type: "identity_denied" or "forbidden"`

    Custom page type.

    - `"identity_denied"`

    - `"forbidden"`

  - `uid: optional string`

    UUID.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/custom_pages \
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
      "name": "name",
      "type": "identity_denied",
      "app_count": 0,
      "created_at": "2014-01-01T05:20:00.12345Z",
      "uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "updated_at": "2014-01-01T05:20:00.12345Z"
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

**get** `/accounts/{account_id}/access/custom_pages/{custom_page_id}`

Fetches a custom page and also returns its HTML.

### Path Parameters

- `account_id: string`

  Identifier.

- `custom_page_id: string`

  UUID.

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

- `result: optional CustomPage`

  - `custom_html: string`

    Custom page HTML.

  - `name: string`

    Custom page name.

  - `type: "identity_denied" or "forbidden"`

    Custom page type.

    - `"identity_denied"`

    - `"forbidden"`

  - `uid: optional string`

    UUID.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/custom_pages/$CUSTOM_PAGE_ID \
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
    "custom_html": "<html><body><h1>Access Denied</h1></body></html>",
    "name": "name",
    "type": "identity_denied",
    "app_count": 0,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Create a custom page

**post** `/accounts/{account_id}/access/custom_pages`

Create a custom page

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `custom_html: string`

  Custom page HTML.

- `name: string`

  Custom page name.

- `type: "identity_denied" or "forbidden"`

  Custom page type.

  - `"identity_denied"`

  - `"forbidden"`

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

- `result: optional CustomPageWithoutHTML`

  - `name: string`

    Custom page name.

  - `type: "identity_denied" or "forbidden"`

    Custom page type.

    - `"identity_denied"`

    - `"forbidden"`

  - `uid: optional string`

    UUID.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/custom_pages \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "custom_html": "<html><body><h1>Access Denied</h1></body></html>",
          "name": "name",
          "type": "identity_denied"
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
    "name": "name",
    "type": "identity_denied",
    "app_count": 0,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Update a custom page

**put** `/accounts/{account_id}/access/custom_pages/{custom_page_id}`

Update a custom page

### Path Parameters

- `account_id: string`

  Identifier.

- `custom_page_id: string`

  UUID.

### Body Parameters

- `custom_html: string`

  Custom page HTML.

- `name: string`

  Custom page name.

- `type: "identity_denied" or "forbidden"`

  Custom page type.

  - `"identity_denied"`

  - `"forbidden"`

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

- `result: optional CustomPageWithoutHTML`

  - `name: string`

    Custom page name.

  - `type: "identity_denied" or "forbidden"`

    Custom page type.

    - `"identity_denied"`

    - `"forbidden"`

  - `uid: optional string`

    UUID.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/custom_pages/$CUSTOM_PAGE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "custom_html": "<html><body><h1>Access Denied</h1></body></html>",
          "name": "name",
          "type": "identity_denied"
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
    "name": "name",
    "type": "identity_denied",
    "app_count": 0,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Delete a custom page

**delete** `/accounts/{account_id}/access/custom_pages/{custom_page_id}`

Delete a custom page

### Path Parameters

- `account_id: string`

  Identifier.

- `custom_page_id: string`

  UUID.

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

- `result: optional object { id }`

  - `id: optional string`

    UUID.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/custom_pages/$CUSTOM_PAGE_ID \
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

## Domain Types

### Custom Page

- `CustomPage object { custom_html, name, type, uid }`

  - `custom_html: string`

    Custom page HTML.

  - `name: string`

    Custom page name.

  - `type: "identity_denied" or "forbidden"`

    Custom page type.

    - `"identity_denied"`

    - `"forbidden"`

  - `uid: optional string`

    UUID.

### Custom Page Without HTML

- `CustomPageWithoutHTML object { name, type, uid }`

  - `name: string`

    Custom page name.

  - `type: "identity_denied" or "forbidden"`

    Custom page type.

    - `"identity_denied"`

    - `"forbidden"`

  - `uid: optional string`

    UUID.

### Custom Page Delete Response

- `CustomPageDeleteResponse object { id }`

  - `id: optional string`

    UUID.
