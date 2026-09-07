# Pacfiles

## List PAC files

**get** `/accounts/{account_id}/gateway/pacfiles`

List all Zero Trust Gateway PAC files for an account.

### Path Parameters

- `account_id: string`

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

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional array of object { id, created_at, description, 4 more }`

  - `id: optional string`

  - `created_at: optional string`

  - `description: optional string`

    Detailed description of the PAC file.

  - `name: optional string`

    Name of the PAC file.

  - `slug: optional string`

    URL-friendly version of the PAC file name.

  - `updated_at: optional string`

  - `url: optional string`

    Unique URL to download the PAC file.

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Indicate the total number of results for the requested service.

  - `page: optional number`

    Indicate the current page within a paginated list of results.

  - `per_page: optional number`

    Indicate the number of results per page.

  - `total_count: optional number`

    Indicate the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/pacfiles \
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
      "id": "ed35569b41ce4d1facfe683550f54086",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "description": "PAC file for Devops team",
      "name": "Devops team",
      "slug": "pac_devops",
      "updated_at": "2014-01-01T05:20:00.12345Z",
      "url": "https://pac.cloudflare-gateway.com/699d98642c564d2e855e9661899b7252/pac_devops"
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

## Get a PAC file

**get** `/accounts/{account_id}/gateway/pacfiles/{pacfile_id}`

Get a single Zero Trust Gateway PAC file.

### Path Parameters

- `account_id: string`

- `pacfile_id: string`

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

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { id, contents, created_at, 5 more }`

  - `id: optional string`

  - `contents: optional string`

    Actual contents of the PAC file

  - `created_at: optional string`

  - `description: optional string`

    Detailed description of the PAC file.

  - `name: optional string`

    Name of the PAC file.

  - `slug: optional string`

    URL-friendly version of the PAC file name.

  - `updated_at: optional string`

  - `url: optional string`

    Unique URL to download the PAC file.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/pacfiles/$PACFILE_ID \
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
    "id": "ed35569b41ce4d1facfe683550f54086",
    "contents": "function FindProxyForURL(url, host) { return \"DIRECT\"; }",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "PAC file for Devops team",
    "name": "Devops team",
    "slug": "pac_devops",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "url": "https://pac.cloudflare-gateway.com/699d98642c564d2e855e9661899b7252/pac_devops"
  }
}
```

## Create a PAC file

**post** `/accounts/{account_id}/gateway/pacfiles`

Create a new Zero Trust Gateway PAC file.

### Path Parameters

- `account_id: string`

### Body Parameters

- `contents: string`

  Actual contents of the PAC file

- `name: string`

  Name of the PAC file.

- `description: optional string`

  Detailed description of the PAC file.

- `slug: optional string`

  URL-friendly version of the PAC file name. If not provided, it will be auto-generated

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

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { id, contents, created_at, 5 more }`

  - `id: optional string`

  - `contents: optional string`

    Actual contents of the PAC file

  - `created_at: optional string`

  - `description: optional string`

    Detailed description of the PAC file.

  - `name: optional string`

    Name of the PAC file.

  - `slug: optional string`

    URL-friendly version of the PAC file name.

  - `updated_at: optional string`

  - `url: optional string`

    Unique URL to download the PAC file.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/pacfiles \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "contents": "function FindProxyForURL(url, host) { return \\"DIRECT\\"; }",
          "name": "Devops team",
          "description": "PAC file for Devops team",
          "slug": "pac_devops"
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
    "id": "ed35569b41ce4d1facfe683550f54086",
    "contents": "function FindProxyForURL(url, host) { return \"DIRECT\"; }",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "PAC file for Devops team",
    "name": "Devops team",
    "slug": "pac_devops",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "url": "https://pac.cloudflare-gateway.com/699d98642c564d2e855e9661899b7252/pac_devops"
  }
}
```

## Update a Zero Trust Gateway PAC file

**put** `/accounts/{account_id}/gateway/pacfiles/{pacfile_id}`

Update a configured Zero Trust Gateway PAC file.

### Path Parameters

- `account_id: string`

- `pacfile_id: string`

### Body Parameters

- `contents: string`

  Actual contents of the PAC file

- `description: string`

  Detailed description of the PAC file.

- `name: string`

  Name of the PAC file.

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

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { id, contents, created_at, 5 more }`

  - `id: optional string`

  - `contents: optional string`

    Actual contents of the PAC file

  - `created_at: optional string`

  - `description: optional string`

    Detailed description of the PAC file.

  - `name: optional string`

    Name of the PAC file.

  - `slug: optional string`

    URL-friendly version of the PAC file name.

  - `updated_at: optional string`

  - `url: optional string`

    Unique URL to download the PAC file.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/pacfiles/$PACFILE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "contents": "function FindProxyForURL(url, host) { return \\"DIRECT\\"; }",
          "description": "PAC file for Devops team",
          "name": "Devops team"
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
    "id": "ed35569b41ce4d1facfe683550f54086",
    "contents": "function FindProxyForURL(url, host) { return \"DIRECT\"; }",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "PAC file for Devops team",
    "name": "Devops team",
    "slug": "pac_devops",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "url": "https://pac.cloudflare-gateway.com/699d98642c564d2e855e9661899b7252/pac_devops"
  }
}
```

## Delete a PAC file

**delete** `/accounts/{account_id}/gateway/pacfiles/{pacfile_id}`

Delete a configured Zero Trust Gateway PAC file.

### Path Parameters

- `account_id: string`

- `pacfile_id: string`

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

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/pacfiles/$PACFILE_ID \
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
  "result": {}
}
```

## Domain Types

### Pacfile List Response

- `PacfileListResponse object { id, created_at, description, 4 more }`

  - `id: optional string`

  - `created_at: optional string`

  - `description: optional string`

    Detailed description of the PAC file.

  - `name: optional string`

    Name of the PAC file.

  - `slug: optional string`

    URL-friendly version of the PAC file name.

  - `updated_at: optional string`

  - `url: optional string`

    Unique URL to download the PAC file.

### Pacfile Get Response

- `PacfileGetResponse object { id, contents, created_at, 5 more }`

  - `id: optional string`

  - `contents: optional string`

    Actual contents of the PAC file

  - `created_at: optional string`

  - `description: optional string`

    Detailed description of the PAC file.

  - `name: optional string`

    Name of the PAC file.

  - `slug: optional string`

    URL-friendly version of the PAC file name.

  - `updated_at: optional string`

  - `url: optional string`

    Unique URL to download the PAC file.

### Pacfile Create Response

- `PacfileCreateResponse object { id, contents, created_at, 5 more }`

  - `id: optional string`

  - `contents: optional string`

    Actual contents of the PAC file

  - `created_at: optional string`

  - `description: optional string`

    Detailed description of the PAC file.

  - `name: optional string`

    Name of the PAC file.

  - `slug: optional string`

    URL-friendly version of the PAC file name.

  - `updated_at: optional string`

  - `url: optional string`

    Unique URL to download the PAC file.

### Pacfile Update Response

- `PacfileUpdateResponse object { id, contents, created_at, 5 more }`

  - `id: optional string`

  - `contents: optional string`

    Actual contents of the PAC file

  - `created_at: optional string`

  - `description: optional string`

    Detailed description of the PAC file.

  - `name: optional string`

    Name of the PAC file.

  - `slug: optional string`

    URL-friendly version of the PAC file name.

  - `updated_at: optional string`

  - `url: optional string`

    Unique URL to download the PAC file.

### Pacfile Delete Response

- `PacfileDeleteResponse = unknown`
