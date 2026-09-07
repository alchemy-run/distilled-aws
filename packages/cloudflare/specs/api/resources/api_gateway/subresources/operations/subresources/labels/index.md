# Labels

## Replace label(s) on an operation in endpoint management

**put** `/zones/{zone_id}/api_gateway/operations/{operation_id}/labels`

Replace label(s) on an operation in endpoint management

### Path Parameters

- `zone_id: string`

  Identifier.

- `operation_id: string`

  UUID.

### Body Parameters

- `managed: optional array of string`

  List of managed label names. Omitting this property or passing an empty array will result in all managed labels being removed from the operation

- `user: optional array of string`

  List of user label names. Omitting this property or passing an empty array will result in all user labels being removed from the operation

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { endpoint, host, last_updated, 3 more }`

  - `endpoint: string`

    The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be Cloudflare-normalized upon insertion. See: https://developers.cloudflare.com/rules/normalization/how-it-works/.

  - `host: string`

    RFC3986-compliant host.

  - `last_updated: string`

  - `method: "GET" or "POST" or "HEAD" or 6 more`

    The HTTP method used to access the endpoint.

    - `"GET"`

    - `"POST"`

    - `"HEAD"`

    - `"OPTIONS"`

    - `"PUT"`

    - `"DELETE"`

    - `"CONNECT"`

    - `"PATCH"`

    - `"TRACE"`

  - `operation_id: string`

    UUID.

  - `labels: optional array of object { created_at, description, last_updated, 3 more }`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/operations/$OPERATION_ID/labels \
    -X PUT \
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
  "result": {
    "endpoint": "/api/v1/users/{var1}",
    "host": "www.example.com",
    "last_updated": "2014-01-01T05:20:00.12345Z",
    "method": "GET",
    "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "labels": [
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
    ]
  },
  "success": true
}
```

## Attach label(s) on an operation in endpoint management

**post** `/zones/{zone_id}/api_gateway/operations/{operation_id}/labels`

Attach label(s) on an operation in endpoint management

### Path Parameters

- `zone_id: string`

  Identifier.

- `operation_id: string`

  UUID.

### Body Parameters

- `managed: optional array of string`

  List of managed label names.

- `user: optional array of string`

  List of user label names.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { endpoint, host, last_updated, 3 more }`

  - `endpoint: string`

    The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be Cloudflare-normalized upon insertion. See: https://developers.cloudflare.com/rules/normalization/how-it-works/.

  - `host: string`

    RFC3986-compliant host.

  - `last_updated: string`

  - `method: "GET" or "POST" or "HEAD" or 6 more`

    The HTTP method used to access the endpoint.

    - `"GET"`

    - `"POST"`

    - `"HEAD"`

    - `"OPTIONS"`

    - `"PUT"`

    - `"DELETE"`

    - `"CONNECT"`

    - `"PATCH"`

    - `"TRACE"`

  - `operation_id: string`

    UUID.

  - `labels: optional array of object { created_at, description, last_updated, 3 more }`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/operations/$OPERATION_ID/labels \
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
  "result": {
    "endpoint": "/api/v1/users/{var1}",
    "host": "www.example.com",
    "last_updated": "2014-01-01T05:20:00.12345Z",
    "method": "GET",
    "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "labels": [
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
    ]
  },
  "success": true
}
```

## Remove label(s) on an operation in endpoint management

**delete** `/zones/{zone_id}/api_gateway/operations/{operation_id}/labels`

Remove label(s) on an operation in endpoint management

### Path Parameters

- `zone_id: string`

  Identifier.

- `operation_id: string`

  UUID.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { endpoint, host, last_updated, 3 more }`

  - `endpoint: string`

    The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be Cloudflare-normalized upon insertion. See: https://developers.cloudflare.com/rules/normalization/how-it-works/.

  - `host: string`

    RFC3986-compliant host.

  - `last_updated: string`

  - `method: "GET" or "POST" or "HEAD" or 6 more`

    The HTTP method used to access the endpoint.

    - `"GET"`

    - `"POST"`

    - `"HEAD"`

    - `"OPTIONS"`

    - `"PUT"`

    - `"DELETE"`

    - `"CONNECT"`

    - `"PATCH"`

    - `"TRACE"`

  - `operation_id: string`

    UUID.

  - `labels: optional array of object { created_at, description, last_updated, 3 more }`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/operations/$OPERATION_ID/labels \
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
    "endpoint": "/api/v1/users/{var1}",
    "host": "www.example.com",
    "last_updated": "2014-01-01T05:20:00.12345Z",
    "method": "GET",
    "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "labels": [
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
    ]
  },
  "success": true
}
```

## Bulk replace label(s) on operation(s) in endpoint management

**put** `/zones/{zone_id}/api_gateway/operations/labels`

Bulk replace label(s) on operation(s) in endpoint management

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `managed: object { labels }`

  Managed labels to replace for all affected operations

  - `labels: array of string`

    List of managed label names. Providing an empty array will result in all managed labels being removed from all affected operations

- `selector: object { include }`

  Operation IDs selector

  - `include: object { operation_ids }`

    - `operation_ids: array of string`

- `user: object { labels }`

  User labels to replace for all affected operations

  - `labels: array of string`

    List of user label names. Providing an empty array will result in all user labels being removed from all affected operations

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: array of object { endpoint, host, last_updated, 3 more }`

  - `endpoint: string`

    The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be Cloudflare-normalized upon insertion. See: https://developers.cloudflare.com/rules/normalization/how-it-works/.

  - `host: string`

    RFC3986-compliant host.

  - `last_updated: string`

  - `method: "GET" or "POST" or "HEAD" or 6 more`

    The HTTP method used to access the endpoint.

    - `"GET"`

    - `"POST"`

    - `"HEAD"`

    - `"OPTIONS"`

    - `"PUT"`

    - `"DELETE"`

    - `"CONNECT"`

    - `"PATCH"`

    - `"TRACE"`

  - `operation_id: string`

    UUID.

  - `labels: optional array of object { created_at, description, last_updated, 3 more }`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/operations/labels \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "managed": {
            "labels": [
              "login"
            ]
          },
          "selector": {
            "include": {
              "operation_ids": [
                "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
              ]
            }
          },
          "user": {
            "labels": [
              "login"
            ]
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
  "result": [
    {
      "endpoint": "/api/v1/users/{var1}",
      "host": "www.example.com",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "method": "GET",
      "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "labels": [
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
      ]
    }
  ],
  "success": true
}
```

## Bulk attach label(s) on operation(s) in endpoint management

**post** `/zones/{zone_id}/api_gateway/operations/labels`

Bulk attach label(s) on operation(s) in endpoint management

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `selector: object { include }`

  Operation IDs selector

  - `include: object { operation_ids }`

    - `operation_ids: array of string`

- `managed: optional object { labels }`

  - `labels: optional array of string`

    List of managed label names.

- `user: optional object { labels }`

  - `labels: optional array of string`

    List of user label names.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: array of object { endpoint, host, last_updated, 3 more }`

  - `endpoint: string`

    The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be Cloudflare-normalized upon insertion. See: https://developers.cloudflare.com/rules/normalization/how-it-works/.

  - `host: string`

    RFC3986-compliant host.

  - `last_updated: string`

  - `method: "GET" or "POST" or "HEAD" or 6 more`

    The HTTP method used to access the endpoint.

    - `"GET"`

    - `"POST"`

    - `"HEAD"`

    - `"OPTIONS"`

    - `"PUT"`

    - `"DELETE"`

    - `"CONNECT"`

    - `"PATCH"`

    - `"TRACE"`

  - `operation_id: string`

    UUID.

  - `labels: optional array of object { created_at, description, last_updated, 3 more }`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/operations/labels \
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
  "result": [
    {
      "endpoint": "/api/v1/users/{var1}",
      "host": "www.example.com",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "method": "GET",
      "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "labels": [
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
      ]
    }
  ],
  "success": true
}
```

## Bulk remove label(s) on operation(s) in endpoint management

**delete** `/zones/{zone_id}/api_gateway/operations/labels`

Bulk remove label(s) on operation(s) in endpoint management

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

- `result: array of object { endpoint, host, last_updated, 3 more }`

  - `endpoint: string`

    The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be Cloudflare-normalized upon insertion. See: https://developers.cloudflare.com/rules/normalization/how-it-works/.

  - `host: string`

    RFC3986-compliant host.

  - `last_updated: string`

  - `method: "GET" or "POST" or "HEAD" or 6 more`

    The HTTP method used to access the endpoint.

    - `"GET"`

    - `"POST"`

    - `"HEAD"`

    - `"OPTIONS"`

    - `"PUT"`

    - `"DELETE"`

    - `"CONNECT"`

    - `"PATCH"`

    - `"TRACE"`

  - `operation_id: string`

    UUID.

  - `labels: optional array of object { created_at, description, last_updated, 3 more }`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/operations/labels \
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
      "endpoint": "/api/v1/users/{var1}",
      "host": "www.example.com",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "method": "GET",
      "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "labels": [
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
      ]
    }
  ],
  "success": true
}
```

## Domain Types

### Label Update Response

- `LabelUpdateResponse object { endpoint, host, last_updated, 3 more }`

  - `endpoint: string`

    The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be Cloudflare-normalized upon insertion. See: https://developers.cloudflare.com/rules/normalization/how-it-works/.

  - `host: string`

    RFC3986-compliant host.

  - `last_updated: string`

  - `method: "GET" or "POST" or "HEAD" or 6 more`

    The HTTP method used to access the endpoint.

    - `"GET"`

    - `"POST"`

    - `"HEAD"`

    - `"OPTIONS"`

    - `"PUT"`

    - `"DELETE"`

    - `"CONNECT"`

    - `"PATCH"`

    - `"TRACE"`

  - `operation_id: string`

    UUID.

  - `labels: optional array of object { created_at, description, last_updated, 3 more }`

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

### Label Create Response

- `LabelCreateResponse object { endpoint, host, last_updated, 3 more }`

  - `endpoint: string`

    The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be Cloudflare-normalized upon insertion. See: https://developers.cloudflare.com/rules/normalization/how-it-works/.

  - `host: string`

    RFC3986-compliant host.

  - `last_updated: string`

  - `method: "GET" or "POST" or "HEAD" or 6 more`

    The HTTP method used to access the endpoint.

    - `"GET"`

    - `"POST"`

    - `"HEAD"`

    - `"OPTIONS"`

    - `"PUT"`

    - `"DELETE"`

    - `"CONNECT"`

    - `"PATCH"`

    - `"TRACE"`

  - `operation_id: string`

    UUID.

  - `labels: optional array of object { created_at, description, last_updated, 3 more }`

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

### Label Delete Response

- `LabelDeleteResponse object { endpoint, host, last_updated, 3 more }`

  - `endpoint: string`

    The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be Cloudflare-normalized upon insertion. See: https://developers.cloudflare.com/rules/normalization/how-it-works/.

  - `host: string`

    RFC3986-compliant host.

  - `last_updated: string`

  - `method: "GET" or "POST" or "HEAD" or 6 more`

    The HTTP method used to access the endpoint.

    - `"GET"`

    - `"POST"`

    - `"HEAD"`

    - `"OPTIONS"`

    - `"PUT"`

    - `"DELETE"`

    - `"CONNECT"`

    - `"PATCH"`

    - `"TRACE"`

  - `operation_id: string`

    UUID.

  - `labels: optional array of object { created_at, description, last_updated, 3 more }`

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

### Label Bulk Update Response

- `LabelBulkUpdateResponse object { endpoint, host, last_updated, 3 more }`

  - `endpoint: string`

    The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be Cloudflare-normalized upon insertion. See: https://developers.cloudflare.com/rules/normalization/how-it-works/.

  - `host: string`

    RFC3986-compliant host.

  - `last_updated: string`

  - `method: "GET" or "POST" or "HEAD" or 6 more`

    The HTTP method used to access the endpoint.

    - `"GET"`

    - `"POST"`

    - `"HEAD"`

    - `"OPTIONS"`

    - `"PUT"`

    - `"DELETE"`

    - `"CONNECT"`

    - `"PATCH"`

    - `"TRACE"`

  - `operation_id: string`

    UUID.

  - `labels: optional array of object { created_at, description, last_updated, 3 more }`

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

### Label Bulk Create Response

- `LabelBulkCreateResponse object { endpoint, host, last_updated, 3 more }`

  - `endpoint: string`

    The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be Cloudflare-normalized upon insertion. See: https://developers.cloudflare.com/rules/normalization/how-it-works/.

  - `host: string`

    RFC3986-compliant host.

  - `last_updated: string`

  - `method: "GET" or "POST" or "HEAD" or 6 more`

    The HTTP method used to access the endpoint.

    - `"GET"`

    - `"POST"`

    - `"HEAD"`

    - `"OPTIONS"`

    - `"PUT"`

    - `"DELETE"`

    - `"CONNECT"`

    - `"PATCH"`

    - `"TRACE"`

  - `operation_id: string`

    UUID.

  - `labels: optional array of object { created_at, description, last_updated, 3 more }`

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

### Label Bulk Delete Response

- `LabelBulkDeleteResponse object { endpoint, host, last_updated, 3 more }`

  - `endpoint: string`

    The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be Cloudflare-normalized upon insertion. See: https://developers.cloudflare.com/rules/normalization/how-it-works/.

  - `host: string`

    RFC3986-compliant host.

  - `last_updated: string`

  - `method: "GET" or "POST" or "HEAD" or 6 more`

    The HTTP method used to access the endpoint.

    - `"GET"`

    - `"POST"`

    - `"HEAD"`

    - `"OPTIONS"`

    - `"PUT"`

    - `"DELETE"`

    - `"CONNECT"`

    - `"PATCH"`

    - `"TRACE"`

  - `operation_id: string`

    UUID.

  - `labels: optional array of object { created_at, description, last_updated, 3 more }`

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
