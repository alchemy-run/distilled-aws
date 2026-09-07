# User

## Create user labels

**post** `/zones/{zone_id}/api_gateway/labels/user`

Create user labels

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `body: array of object { name, description, metadata }`

  - `name: string`

    The name of the label

  - `description: optional string`

    The description of the label

  - `metadata: optional unknown`

    Metadata for the label

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: array of object { created_at, description, last_updated, 3 more }`

  - `created_at: string`

  - `description: string`

    The description of the label

  - `last_updated: string`

  - `metadata: unknown`

    Metadata for the label

  - `name: string`

    The name of the label

  - `source: "user" or "managed"`

    * `user` - label is owned by the user
    * `managed` - label is owned by cloudflare

    - `"user"`

    - `"managed"`

- `success: true`

  Whether the API call was successful.

  - `true`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/labels/user \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "name": "login",
            "description": "All endpoints that deal with logins",
            "metadata": {
              "foo": "bar"
            }
          }
        ]'
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
  "result": [
    {
      "created_at": "2014-01-01T05:20:00.12345Z",
      "description": "All endpoints that deal with logins",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "metadata": {
        "foo": "bar"
      },
      "name": "login",
      "source": "user"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Delete user labels

**delete** `/zones/{zone_id}/api_gateway/labels/user`

Delete user labels

### Path Parameters

- `zone_id: string`

  Identifier.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: array of object { created_at, description, last_updated, 3 more }`

  - `created_at: string`

  - `description: string`

    The description of the label

  - `last_updated: string`

  - `metadata: unknown`

    Metadata for the label

  - `name: string`

    The name of the label

  - `source: "user" or "managed"`

    * `user` - label is owned by the user
    * `managed` - label is owned by cloudflare

    - `"user"`

    - `"managed"`

- `success: true`

  Whether the API call was successful.

  - `true`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/labels/user \
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
  "result": [
    {
      "created_at": "2014-01-01T05:20:00.12345Z",
      "description": "All endpoints that deal with logins",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "metadata": {
        "foo": "bar"
      },
      "name": "login",
      "source": "user"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Retrieve user label

**get** `/zones/{zone_id}/api_gateway/labels/user/{name}`

Retrieve user label

### Path Parameters

- `zone_id: string`

  Identifier.

- `name: string`

  The name of the label

### Query Parameters

- `with_mapped_resource_counts: optional boolean`

  Include `mapped_resources` for each label

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { created_at, description, last_updated, 4 more }`

  - `created_at: string`

  - `description: string`

    The description of the label

  - `last_updated: string`

  - `metadata: unknown`

    Metadata for the label

  - `name: string`

    The name of the label

  - `source: "user" or "managed"`

    * `user` - label is owned by the user
    * `managed` - label is owned by cloudflare

    - `"user"`

    - `"managed"`

  - `mapped_resources: optional unknown`

    Provides counts of what resources are linked to this label

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/labels/user/$NAME \
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
  "result": {
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "All endpoints that deal with logins",
    "last_updated": "2014-01-01T05:20:00.12345Z",
    "metadata": {
      "foo": "bar"
    },
    "name": "login",
    "source": "user",
    "mapped_resources": {
      "operations": 29
    }
  },
  "success": true
}
```

## Update user label

**put** `/zones/{zone_id}/api_gateway/labels/user/{name}`

Update all fields on a label

### Path Parameters

- `zone_id: string`

  Identifier.

- `name: string`

  The name of the label

### Body Parameters

- `description: optional string`

  The description of the label

- `metadata: optional unknown`

  Metadata for the label

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { created_at, description, last_updated, 3 more }`

  - `created_at: string`

  - `description: string`

    The description of the label

  - `last_updated: string`

  - `metadata: unknown`

    Metadata for the label

  - `name: string`

    The name of the label

  - `source: "user" or "managed"`

    * `user` - label is owned by the user
    * `managed` - label is owned by cloudflare

    - `"user"`

    - `"managed"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/labels/user/$NAME \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "description": "All endpoints that deal with logins",
          "metadata": {
            "foo": "bar"
          }
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
  "result": {
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "All endpoints that deal with logins",
    "last_updated": "2014-01-01T05:20:00.12345Z",
    "metadata": {
      "foo": "bar"
    },
    "name": "login",
    "source": "user"
  },
  "success": true
}
```

## Patch user label

**patch** `/zones/{zone_id}/api_gateway/labels/user/{name}`

Update certain fields on a label

### Path Parameters

- `zone_id: string`

  Identifier.

- `name: string`

  The name of the label

### Body Parameters

- `description: optional string`

  The description of the label

- `metadata: optional unknown`

  Metadata for the label

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { created_at, description, last_updated, 3 more }`

  - `created_at: string`

  - `description: string`

    The description of the label

  - `last_updated: string`

  - `metadata: unknown`

    Metadata for the label

  - `name: string`

    The name of the label

  - `source: "user" or "managed"`

    * `user` - label is owned by the user
    * `managed` - label is owned by cloudflare

    - `"user"`

    - `"managed"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/labels/user/$NAME \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "description": "All endpoints that deal with logins",
          "metadata": {
            "foo": "bar"
          }
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
  "result": {
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "All endpoints that deal with logins",
    "last_updated": "2014-01-01T05:20:00.12345Z",
    "metadata": {
      "foo": "bar"
    },
    "name": "login",
    "source": "user"
  },
  "success": true
}
```

## Delete user label

**delete** `/zones/{zone_id}/api_gateway/labels/user/{name}`

Delete user label

### Path Parameters

- `zone_id: string`

  Identifier.

- `name: string`

  The name of the label

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { created_at, description, last_updated, 3 more }`

  - `created_at: string`

  - `description: string`

    The description of the label

  - `last_updated: string`

  - `metadata: unknown`

    Metadata for the label

  - `name: string`

    The name of the label

  - `source: "user" or "managed"`

    * `user` - label is owned by the user
    * `managed` - label is owned by cloudflare

    - `"user"`

    - `"managed"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/labels/user/$NAME \
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
  "result": {
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "All endpoints that deal with logins",
    "last_updated": "2014-01-01T05:20:00.12345Z",
    "metadata": {
      "foo": "bar"
    },
    "name": "login",
    "source": "user"
  },
  "success": true
}
```

## Domain Types

### User Bulk Create Response

- `UserBulkCreateResponse object { created_at, description, last_updated, 3 more }`

  - `created_at: string`

  - `description: string`

    The description of the label

  - `last_updated: string`

  - `metadata: unknown`

    Metadata for the label

  - `name: string`

    The name of the label

  - `source: "user" or "managed"`

    * `user` - label is owned by the user
    * `managed` - label is owned by cloudflare

    - `"user"`

    - `"managed"`

### User Bulk Delete Response

- `UserBulkDeleteResponse object { created_at, description, last_updated, 3 more }`

  - `created_at: string`

  - `description: string`

    The description of the label

  - `last_updated: string`

  - `metadata: unknown`

    Metadata for the label

  - `name: string`

    The name of the label

  - `source: "user" or "managed"`

    * `user` - label is owned by the user
    * `managed` - label is owned by cloudflare

    - `"user"`

    - `"managed"`

### User Get Response

- `UserGetResponse object { created_at, description, last_updated, 4 more }`

  - `created_at: string`

  - `description: string`

    The description of the label

  - `last_updated: string`

  - `metadata: unknown`

    Metadata for the label

  - `name: string`

    The name of the label

  - `source: "user" or "managed"`

    * `user` - label is owned by the user
    * `managed` - label is owned by cloudflare

    - `"user"`

    - `"managed"`

  - `mapped_resources: optional unknown`

    Provides counts of what resources are linked to this label

### User Update Response

- `UserUpdateResponse object { created_at, description, last_updated, 3 more }`

  - `created_at: string`

  - `description: string`

    The description of the label

  - `last_updated: string`

  - `metadata: unknown`

    Metadata for the label

  - `name: string`

    The name of the label

  - `source: "user" or "managed"`

    * `user` - label is owned by the user
    * `managed` - label is owned by cloudflare

    - `"user"`

    - `"managed"`

### User Edit Response

- `UserEditResponse object { created_at, description, last_updated, 3 more }`

  - `created_at: string`

  - `description: string`

    The description of the label

  - `last_updated: string`

  - `metadata: unknown`

    Metadata for the label

  - `name: string`

    The name of the label

  - `source: "user" or "managed"`

    * `user` - label is owned by the user
    * `managed` - label is owned by cloudflare

    - `"user"`

    - `"managed"`

### User Delete Response

- `UserDeleteResponse object { created_at, description, last_updated, 3 more }`

  - `created_at: string`

  - `description: string`

    The description of the label

  - `last_updated: string`

  - `metadata: unknown`

    Metadata for the label

  - `name: string`

    The name of the label

  - `source: "user" or "managed"`

    * `user` - label is owned by the user
    * `managed` - label is owned by cloudflare

    - `"user"`

    - `"managed"`

# Resources

# Operation

## Replace operation(s) attached to a user label

**put** `/zones/{zone_id}/api_gateway/labels/user/{name}/resources/operation`

Replace all operations(s) attached to a user label

### Path Parameters

- `zone_id: string`

  Identifier.

- `name: string`

  The name of the label

### Body Parameters

- `selector: object { include }`

  Operation IDs selector

  - `include: object { operation_ids }`

    - `operation_ids: array of string`

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { created_at, description, last_updated, 4 more }`

  - `created_at: string`

  - `description: string`

    The description of the label

  - `last_updated: string`

  - `metadata: unknown`

    Metadata for the label

  - `name: string`

    The name of the label

  - `source: "user" or "managed"`

    * `user` - label is owned by the user
    * `managed` - label is owned by cloudflare

    - `"user"`

    - `"managed"`

  - `mapped_resources: optional unknown`

    Provides counts of what resources are linked to this label

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/labels/user/$NAME/resources/operation \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "selector": {
            "include": {
              "operation_ids": [
                "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
              ]
            }
          }
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
  "result": {
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "All endpoints that deal with logins",
    "last_updated": "2014-01-01T05:20:00.12345Z",
    "metadata": {
      "foo": "bar"
    },
    "name": "login",
    "source": "user",
    "mapped_resources": {
      "operations": 29
    }
  },
  "success": true
}
```

## Domain Types

### Operation Update Response

- `OperationUpdateResponse object { created_at, description, last_updated, 4 more }`

  - `created_at: string`

  - `description: string`

    The description of the label

  - `last_updated: string`

  - `metadata: unknown`

    Metadata for the label

  - `name: string`

    The name of the label

  - `source: "user" or "managed"`

    * `user` - label is owned by the user
    * `managed` - label is owned by cloudflare

    - `"user"`

    - `"managed"`

  - `mapped_resources: optional unknown`

    Provides counts of what resources are linked to this label
