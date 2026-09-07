# Lists

## List Zero Trust lists

**get** `/accounts/{account_id}/gateway/lists`

Fetch all Zero Trust lists for an account.

### Path Parameters

- `account_id: string`

### Query Parameters

- `type: optional "SERIAL" or "URL" or "DOMAIN" or 6 more`

  Specify the list type.

  - `"SERIAL"`

  - `"URL"`

  - `"DOMAIN"`

  - `"EMAIL"`

  - `"IP"`

  - `"CATEGORY"`

  - `"LOCATION"`

  - `"DEVICE"`

  - `"AAGUID"`

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

- `result: optional array of GatewayList`

  - `id: optional string`

    Identify the API resource with a UUID.

  - `count: optional number`

    Indicate the number of items in the list.

  - `created_at: optional string`

  - `description: optional string`

    Provide the list description.

  - `items: optional array of GatewayItem`

    Provide the list items.

    - `created_at: optional string`

    - `description: optional string`

      Provide the list item description (optional).

    - `value: optional string`

      Specify the item value.

  - `name: optional string`

    Specify the list name.

  - `type: optional "SERIAL" or "URL" or "DOMAIN" or 6 more`

    Specify the list type.

    - `"SERIAL"`

    - `"URL"`

    - `"DOMAIN"`

    - `"EMAIL"`

    - `"IP"`

    - `"CATEGORY"`

    - `"LOCATION"`

    - `"DEVICE"`

    - `"AAGUID"`

  - `updated_at: optional string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/lists \
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
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "count": 20,
      "created_at": "2014-01-01T05:20:00.12345Z",
      "description": "The serial numbers for administrators",
      "items": [
        {
          "created_at": "2014-01-01T05:20:00.12345Z",
          "description": "Austin office IP",
          "value": "8GE8721REF"
        }
      ],
      "name": "Admin Serial Numbers",
      "type": "SERIAL",
      "updated_at": "2014-01-01T05:20:00.12345Z"
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

## Get Zero Trust list details

**get** `/accounts/{account_id}/gateway/lists/{list_id}`

Fetch a single Zero Trust list.

### Path Parameters

- `account_id: string`

- `list_id: string`

  Identify the API resource with a UUID.

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

- `result: optional GatewayList`

  - `id: optional string`

    Identify the API resource with a UUID.

  - `count: optional number`

    Indicate the number of items in the list.

  - `created_at: optional string`

  - `description: optional string`

    Provide the list description.

  - `items: optional array of GatewayItem`

    Provide the list items.

    - `created_at: optional string`

    - `description: optional string`

      Provide the list item description (optional).

    - `value: optional string`

      Specify the item value.

  - `name: optional string`

    Specify the list name.

  - `type: optional "SERIAL" or "URL" or "DOMAIN" or 6 more`

    Specify the list type.

    - `"SERIAL"`

    - `"URL"`

    - `"DOMAIN"`

    - `"EMAIL"`

    - `"IP"`

    - `"CATEGORY"`

    - `"LOCATION"`

    - `"DEVICE"`

    - `"AAGUID"`

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/lists/$LIST_ID \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "count": 20,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "The serial numbers for administrators",
    "items": [
      {
        "created_at": "2014-01-01T05:20:00.12345Z",
        "description": "Austin office IP",
        "value": "8GE8721REF"
      }
    ],
    "name": "Admin Serial Numbers",
    "type": "SERIAL",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Create Zero Trust list

**post** `/accounts/{account_id}/gateway/lists`

Creates a new Zero Trust list.

### Path Parameters

- `account_id: string`

### Body Parameters

- `name: string`

  Specify the list name.

- `type: "SERIAL" or "URL" or "DOMAIN" or 6 more`

  Specify the list type.

  - `"SERIAL"`

  - `"URL"`

  - `"DOMAIN"`

  - `"EMAIL"`

  - `"IP"`

  - `"CATEGORY"`

  - `"LOCATION"`

  - `"DEVICE"`

  - `"AAGUID"`

- `description: optional string`

  Provide the list description.

- `items: optional array of object { description, value }`

  Add items to the list.

  - `description: optional string`

    Provide the list item description (optional).

  - `value: optional string`

    Specify the item value.

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

- `result: optional object { id, created_at, description, 4 more }`

  - `id: optional string`

    Identify the API resource with a UUID.

  - `created_at: optional string`

  - `description: optional string`

    Provide the list description.

  - `items: optional array of GatewayItem`

    Provide the list items.

    - `created_at: optional string`

    - `description: optional string`

      Provide the list item description (optional).

    - `value: optional string`

      Specify the item value.

  - `name: optional string`

    Specify the list name.

  - `type: optional "SERIAL" or "URL" or "DOMAIN" or 6 more`

    Specify the list type.

    - `"SERIAL"`

    - `"URL"`

    - `"DOMAIN"`

    - `"EMAIL"`

    - `"IP"`

    - `"CATEGORY"`

    - `"LOCATION"`

    - `"DEVICE"`

    - `"AAGUID"`

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/lists \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Admin Serial Numbers",
          "type": "SERIAL",
          "description": "The serial numbers for administrators"
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
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "The serial numbers for administrators",
    "items": [
      {
        "created_at": "2014-01-01T05:20:00.12345Z",
        "description": "Austin office IP",
        "value": "8GE8721REF"
      }
    ],
    "name": "Admin Serial Numbers",
    "type": "SERIAL",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Update Zero Trust list

**put** `/accounts/{account_id}/gateway/lists/{list_id}`

Updates a configured Zero Trust list. Skips updating list items if not included in the payload. A non empty list items will overwrite the existing list.

### Path Parameters

- `account_id: string`

- `list_id: string`

  Identify the API resource with a UUID.

### Body Parameters

- `name: string`

  Specify the list name.

- `description: optional string`

  Provide the list description.

- `items: optional array of object { description, value }`

  Add items to the list.

  - `description: optional string`

    Provide the list item description (optional).

  - `value: optional string`

    Specify the item value.

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

- `result: optional GatewayList`

  - `id: optional string`

    Identify the API resource with a UUID.

  - `count: optional number`

    Indicate the number of items in the list.

  - `created_at: optional string`

  - `description: optional string`

    Provide the list description.

  - `items: optional array of GatewayItem`

    Provide the list items.

    - `created_at: optional string`

    - `description: optional string`

      Provide the list item description (optional).

    - `value: optional string`

      Specify the item value.

  - `name: optional string`

    Specify the list name.

  - `type: optional "SERIAL" or "URL" or "DOMAIN" or 6 more`

    Specify the list type.

    - `"SERIAL"`

    - `"URL"`

    - `"DOMAIN"`

    - `"EMAIL"`

    - `"IP"`

    - `"CATEGORY"`

    - `"LOCATION"`

    - `"DEVICE"`

    - `"AAGUID"`

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/lists/$LIST_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Admin Serial Numbers",
          "description": "The serial numbers for administrators"
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
    "count": 20,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "The serial numbers for administrators",
    "items": [
      {
        "created_at": "2014-01-01T05:20:00.12345Z",
        "description": "Austin office IP",
        "value": "8GE8721REF"
      }
    ],
    "name": "Admin Serial Numbers",
    "type": "SERIAL",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Patch Zero Trust list.

**patch** `/accounts/{account_id}/gateway/lists/{list_id}`

Appends or removes an item from a configured Zero Trust list.

### Path Parameters

- `account_id: string`

- `list_id: string`

  Identify the API resource with a UUID.

### Body Parameters

- `append: optional array of object { description, value }`

  Add items to the list.

  - `description: optional string`

    Provide the list item description (optional).

  - `value: optional string`

    Specify the item value.

- `remove: optional array of string`

  Lists of item values you want to remove.

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

- `result: optional GatewayList`

  - `id: optional string`

    Identify the API resource with a UUID.

  - `count: optional number`

    Indicate the number of items in the list.

  - `created_at: optional string`

  - `description: optional string`

    Provide the list description.

  - `items: optional array of GatewayItem`

    Provide the list items.

    - `created_at: optional string`

    - `description: optional string`

      Provide the list item description (optional).

    - `value: optional string`

      Specify the item value.

  - `name: optional string`

    Specify the list name.

  - `type: optional "SERIAL" or "URL" or "DOMAIN" or 6 more`

    Specify the list type.

    - `"SERIAL"`

    - `"URL"`

    - `"DOMAIN"`

    - `"EMAIL"`

    - `"IP"`

    - `"CATEGORY"`

    - `"LOCATION"`

    - `"DEVICE"`

    - `"AAGUID"`

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/lists/$LIST_ID \
    -X PATCH \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "count": 20,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "The serial numbers for administrators",
    "items": [
      {
        "created_at": "2014-01-01T05:20:00.12345Z",
        "description": "Austin office IP",
        "value": "8GE8721REF"
      }
    ],
    "name": "Admin Serial Numbers",
    "type": "SERIAL",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Delete Zero Trust list

**delete** `/accounts/{account_id}/gateway/lists/{list_id}`

Deletes a Zero Trust list.

### Path Parameters

- `account_id: string`

- `list_id: string`

  Identify the API resource with a UUID.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/lists/$LIST_ID \
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

### Gateway Item

- `GatewayItem object { created_at, description, value }`

  - `created_at: optional string`

  - `description: optional string`

    Provide the list item description (optional).

  - `value: optional string`

    Specify the item value.

### Gateway List

- `GatewayList object { id, count, created_at, 5 more }`

  - `id: optional string`

    Identify the API resource with a UUID.

  - `count: optional number`

    Indicate the number of items in the list.

  - `created_at: optional string`

  - `description: optional string`

    Provide the list description.

  - `items: optional array of GatewayItem`

    Provide the list items.

    - `created_at: optional string`

    - `description: optional string`

      Provide the list item description (optional).

    - `value: optional string`

      Specify the item value.

  - `name: optional string`

    Specify the list name.

  - `type: optional "SERIAL" or "URL" or "DOMAIN" or 6 more`

    Specify the list type.

    - `"SERIAL"`

    - `"URL"`

    - `"DOMAIN"`

    - `"EMAIL"`

    - `"IP"`

    - `"CATEGORY"`

    - `"LOCATION"`

    - `"DEVICE"`

    - `"AAGUID"`

  - `updated_at: optional string`

### List Create Response

- `ListCreateResponse object { id, created_at, description, 4 more }`

  - `id: optional string`

    Identify the API resource with a UUID.

  - `created_at: optional string`

  - `description: optional string`

    Provide the list description.

  - `items: optional array of GatewayItem`

    Provide the list items.

    - `created_at: optional string`

    - `description: optional string`

      Provide the list item description (optional).

    - `value: optional string`

      Specify the item value.

  - `name: optional string`

    Specify the list name.

  - `type: optional "SERIAL" or "URL" or "DOMAIN" or 6 more`

    Specify the list type.

    - `"SERIAL"`

    - `"URL"`

    - `"DOMAIN"`

    - `"EMAIL"`

    - `"IP"`

    - `"CATEGORY"`

    - `"LOCATION"`

    - `"DEVICE"`

    - `"AAGUID"`

  - `updated_at: optional string`

### List Delete Response

- `ListDeleteResponse = unknown`

# Items

## Get Zero Trust list items

**get** `/accounts/{account_id}/gateway/lists/{list_id}/items`

Fetch all items in a single Zero Trust list.

### Path Parameters

- `account_id: string`

- `list_id: string`

  Identify the API resource with a UUID.

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

- `result: optional array of GatewayItem`

  Provide the list items.

  - `created_at: optional string`

  - `description: optional string`

    Provide the list item description (optional).

  - `value: optional string`

    Specify the item value.

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Shows the total results returned based on your search parameters.

  - `page: optional number`

    Show the current page within paginated list of results.

  - `per_page: optional number`

    Show the number of results per page of results.

  - `total_count: optional number`

    Show the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/lists/$LIST_ID/items \
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
      "created_at": "2014-01-01T05:20:00.12345Z",
      "description": "Austin office IP",
      "value": "8GE8721REF"
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
