# API Gateway

# Configurations

## Retrieve information about specific configuration properties

**get** `/zones/{zone_id}/api_gateway/configuration`

Gets the current API Shield configuration settings for a zone, including validation behavior and enforcement mode.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `normalize: optional boolean`

  Ensures that the configuration is written or retrieved in normalized fashion

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: Configuration`

  - `auth_id_characteristics: array of object { name, type }  or object { name, type }`

    - `APIShieldAuthIDCharacteristic object { name, type }`

      Auth ID Characteristic

      - `name: string`

        The name of the characteristic field, i.e., the header or cookie name.

      - `type: "header" or "cookie"`

        The type of characteristic.

        - `"header"`

        - `"cookie"`

    - `APIShieldAuthIDCharacteristicJWTClaim object { name, type }`

      Auth ID Characteristic extracted from JWT Token Claims

      - `name: string`

        Claim location expressed as `$(token_config_id):$(json_path)`, where `token_config_id`
        is the ID of the token configuration used in validating the JWT, and `json_path` is a RFC 9535
        JSONPath (https://goessner.net/articles/JsonPath/, https://www.rfc-editor.org/rfc/rfc9535.html).
        The JSONPath expression may be in dot or bracket notation, may only specify literal keys
        or array indexes, and must return a singleton value, which will be interpreted as a string.

      - `type: "jwt"`

        The type of characteristic.

        - `"jwt"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/configuration \
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
    "auth_id_characteristics": [
      {
        "name": "authorization",
        "type": "header"
      }
    ]
  },
  "success": true
}
```

## Update configuration properties

**put** `/zones/{zone_id}/api_gateway/configuration`

Updates API Shield configuration settings for a zone. Can modify validation strictness, enforcement mode, and other global settings.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `normalize: optional boolean`

  Ensures that the configuration is written or retrieved in normalized fashion

### Body Parameters

- `auth_id_characteristics: array of object { name, type }  or object { name, type }`

  - `APIShieldAuthIDCharacteristic object { name, type }`

    Auth ID Characteristic

    - `name: string`

      The name of the characteristic field, i.e., the header or cookie name.

    - `type: "header" or "cookie"`

      The type of characteristic.

      - `"header"`

      - `"cookie"`

  - `APIShieldAuthIDCharacteristicJWTClaim object { name, type }`

    Auth ID Characteristic extracted from JWT Token Claims

    - `name: string`

      Claim location expressed as `$(token_config_id):$(json_path)`, where `token_config_id`
      is the ID of the token configuration used in validating the JWT, and `json_path` is a RFC 9535
      JSONPath (https://goessner.net/articles/JsonPath/, https://www.rfc-editor.org/rfc/rfc9535.html).
      The JSONPath expression may be in dot or bracket notation, may only specify literal keys
      or array indexes, and must return a singleton value, which will be interpreted as a string.

    - `type: "jwt"`

      The type of characteristic.

      - `"jwt"`

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: Configuration`

  - `auth_id_characteristics: array of object { name, type }  or object { name, type }`

    - `APIShieldAuthIDCharacteristic object { name, type }`

      Auth ID Characteristic

      - `name: string`

        The name of the characteristic field, i.e., the header or cookie name.

      - `type: "header" or "cookie"`

        The type of characteristic.

        - `"header"`

        - `"cookie"`

    - `APIShieldAuthIDCharacteristicJWTClaim object { name, type }`

      Auth ID Characteristic extracted from JWT Token Claims

      - `name: string`

        Claim location expressed as `$(token_config_id):$(json_path)`, where `token_config_id`
        is the ID of the token configuration used in validating the JWT, and `json_path` is a RFC 9535
        JSONPath (https://goessner.net/articles/JsonPath/, https://www.rfc-editor.org/rfc/rfc9535.html).
        The JSONPath expression may be in dot or bracket notation, may only specify literal keys
        or array indexes, and must return a singleton value, which will be interpreted as a string.

      - `type: "jwt"`

        The type of characteristic.

        - `"jwt"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/configuration \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "auth_id_characteristics": [
            {
              "name": "authorization",
              "type": "header"
            }
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
  "result": {
    "auth_id_characteristics": [
      {
        "name": "authorization",
        "type": "header"
      }
    ]
  },
  "success": true
}
```

## Domain Types

### Configuration

- `Configuration object { auth_id_characteristics }`

  - `auth_id_characteristics: array of object { name, type }  or object { name, type }`

    - `APIShieldAuthIDCharacteristic object { name, type }`

      Auth ID Characteristic

      - `name: string`

        The name of the characteristic field, i.e., the header or cookie name.

      - `type: "header" or "cookie"`

        The type of characteristic.

        - `"header"`

        - `"cookie"`

    - `APIShieldAuthIDCharacteristicJWTClaim object { name, type }`

      Auth ID Characteristic extracted from JWT Token Claims

      - `name: string`

        Claim location expressed as `$(token_config_id):$(json_path)`, where `token_config_id`
        is the ID of the token configuration used in validating the JWT, and `json_path` is a RFC 9535
        JSONPath (https://goessner.net/articles/JsonPath/, https://www.rfc-editor.org/rfc/rfc9535.html).
        The JSONPath expression may be in dot or bracket notation, may only specify literal keys
        or array indexes, and must return a singleton value, which will be interpreted as a string.

      - `type: "jwt"`

        The type of characteristic.

        - `"jwt"`

# Discovery

## Retrieve discovered operations on a zone rendered as OpenAPI schemas

**get** `/zones/{zone_id}/api_gateway/discovery`

Retrieve the most up to date view of discovered operations, rendered as OpenAPI schemas

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

- `result: object { schemas, timestamp }`

  - `schemas: array of unknown`

  - `timestamp: string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/discovery \
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
    "schemas": [
      {
        "info": {
          "title": "OpenAPI JSON schema for www.example.com",
          "version": "1.0"
        },
        "openapi": "3.0.0",
        "paths": {
          "... Further paths ...": {},
          "/api/v1/users/{var1}": {
            "get": {
              "parameters": [
                {
                  "in": "path",
                  "name": "var1",
                  "required": true,
                  "schema": {
                    "type": "string"
                  }
                }
              ]
            }
          }
        },
        "servers": [
          {
            "url": "www.example.com"
          }
        ]
      }
    ],
    "timestamp": "2014-01-01T05:20:00.12345Z"
  },
  "success": true
}
```

## Domain Types

### Discovery Operation

- `DiscoveryOperation object { id, endpoint, host, 5 more }`

  - `id: string`

    UUID.

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

  - `origin: array of "ML" or "SessionIdentifier" or "LabelDiscovery"`

    API discovery engine(s) that discovered this operation

    - `"ML"`

    - `"SessionIdentifier"`

    - `"LabelDiscovery"`

  - `state: "review" or "saved" or "ignored"`

    State of operation in API Discovery

    * `review` - Operation is not saved into API Shield Endpoint Management
    * `saved` - Operation is saved into API Shield Endpoint Management
    * `ignored` - Operation is marked as ignored

    - `"review"`

    - `"saved"`

    - `"ignored"`

  - `features: optional object { traffic_stats }`

    - `traffic_stats: optional object { last_updated, period_seconds, requests }`

      - `last_updated: string`

      - `period_seconds: number`

        The period in seconds these statistics were computed over

      - `requests: number`

        The average number of requests seen during this period

### Discovery Get Response

- `DiscoveryGetResponse object { schemas, timestamp }`

  - `schemas: array of unknown`

  - `timestamp: string`

# Operations

## Retrieve discovered operations on a zone

**get** `/zones/{zone_id}/api_gateway/discovery/operations`

Retrieve the most up to date view of discovered operations

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `diff: optional boolean`

  When `true`, only return API Discovery results that are not saved into API Shield Endpoint Management

- `direction: optional "asc" or "desc"`

  Direction to order results.

  - `"asc"`

  - `"desc"`

- `endpoint: optional string`

  Filter results to only include endpoints containing this pattern.

- `host: optional array of string`

  Filter results to only include the specified hosts.

- `method: optional array of string`

  Filter results to only include the specified HTTP methods.

- `order: optional "host" or "method" or "endpoint" or 2 more`

  Field to order by

  - `"host"`

  - `"method"`

  - `"endpoint"`

  - `"traffic_stats.requests"`

  - `"traffic_stats.last_updated"`

- `origin: optional "ML" or "SessionIdentifier" or "LabelDiscovery"`

  Filter results to only include discovery results sourced from a particular discovery engine

  * `ML` - Discovered operations that were sourced using ML API Discovery
  * `SessionIdentifier` - Discovered operations that were sourced using Session Identifier API Discovery

  - `"ML"`

  - `"SessionIdentifier"`

  - `"LabelDiscovery"`

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page.

- `state: optional "review" or "saved" or "ignored"`

  Filter results to only include discovery results in a particular state. States are as follows

  * `review` - Discovered operations that are not saved into API Shield Endpoint Management
  * `saved` - Discovered operations that are already saved into API Shield Endpoint Management
  * `ignored` - Discovered operations that have been marked as ignored

  - `"review"`

  - `"saved"`

  - `"ignored"`

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: array of DiscoveryOperation`

  - `id: string`

    UUID.

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

  - `origin: array of "ML" or "SessionIdentifier" or "LabelDiscovery"`

    API discovery engine(s) that discovered this operation

    - `"ML"`

    - `"SessionIdentifier"`

    - `"LabelDiscovery"`

  - `state: "review" or "saved" or "ignored"`

    State of operation in API Discovery

    * `review` - Operation is not saved into API Shield Endpoint Management
    * `saved` - Operation is saved into API Shield Endpoint Management
    * `ignored` - Operation is marked as ignored

    - `"review"`

    - `"saved"`

    - `"ignored"`

  - `features: optional object { traffic_stats }`

    - `traffic_stats: optional object { last_updated, period_seconds, requests }`

      - `last_updated: string`

      - `period_seconds: number`

        The period in seconds these statistics were computed over

      - `requests: number`

        The average number of requests seen during this period

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/discovery/operations \
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
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "endpoint": "/api/v1/users/{var1}",
      "host": "www.example.com",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "method": "GET",
      "origin": [
        "ML"
      ],
      "state": "review",
      "features": {
        "traffic_stats": {
          "last_updated": "2014-01-01T05:20:00.12345Z",
          "period_seconds": 3600,
          "requests": 1987.06
        }
      }
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

## Patch discovered operations

**patch** `/zones/{zone_id}/api_gateway/discovery/operations`

Update the `state` on one or more discovered operations

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `body: map[object { state } ]`

  - `state: optional "review" or "ignored"`

    Mark state of operation in API Discovery

    * `review` - Mark operation as for review
    * `ignored` - Mark operation as ignored

    - `"review"`

    - `"ignored"`

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: map[object { state } ]`

  - `state: optional "review" or "ignored"`

    Mark state of operation in API Discovery

    * `review` - Mark operation as for review
    * `ignored` - Mark operation as ignored

    - `"review"`

    - `"ignored"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/discovery/operations \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "3818d821-5901-4147-a474-f5f5aec1d54e": {
            "state": "ignored"
          },
          "b17c8043-99a0-4202-b7d9-8f7cdbee02cd": {
            "state": "review"
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
    "3818d821-5901-4147-a474-f5f5aec1d54e": {
      "state": "ignored"
    },
    "b17c8043-99a0-4202-b7d9-8f7cdbee02cd": {
      "state": "review"
    }
  },
  "success": true
}
```

## Domain Types

### Operation Bulk Edit Response

- `OperationBulkEditResponse = map[object { state } ]`

  - `state: optional "review" or "ignored"`

    Mark state of operation in API Discovery

    * `review` - Mark operation as for review
    * `ignored` - Mark operation as ignored

    - `"review"`

    - `"ignored"`

# Labels

## Retrieve all labels

**get** `/zones/{zone_id}/api_gateway/labels`

Retrieve all labels

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `direction: optional "asc" or "desc"`

  Direction to order results.

  - `"asc"`

  - `"desc"`

- `filter: optional string`

  Filter for labels where the name or description matches using substring match

- `order: optional "name" or "description" or "created_at" or 2 more`

  Field to order by

  - `"name"`

  - `"description"`

  - `"created_at"`

  - `"last_updated"`

  - `"mapped_resources.operations"`

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page.

- `source: optional "user" or "managed"`

  Filter for labels with source

  - `"user"`

  - `"managed"`

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

- `result: array of object { created_at, description, last_updated, 4 more }`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/labels \
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
      "source": "user",
      "mapped_resources": {
        "operations": 29
      }
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

## Domain Types

### Label List Response

- `LabelListResponse object { created_at, description, last_updated, 4 more }`

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

# Managed

## Retrieve managed label

**get** `/zones/{zone_id}/api_gateway/labels/managed/{name}`

Retrieve managed label

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/labels/managed/$NAME \
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
    "source": "managed",
    "mapped_resources": {
      "operations": 29
    }
  },
  "success": true
}
```

## Domain Types

### Managed Get Response

- `ManagedGetResponse object { created_at, description, last_updated, 4 more }`

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

# Resources

# Operation

## Replace operation(s) attached to a managed label

**put** `/zones/{zone_id}/api_gateway/labels/managed/{name}/resources/operation`

Replace all operations(s) attached to a managed label

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/labels/managed/$NAME/resources/operation \
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
    "source": "managed",
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

# Operations

## Retrieve information about all operations on a zone

**get** `/zones/{zone_id}/api_gateway/operations`

Lists all API operations tracked by API Shield for a zone with pagination. Returns operation details including method, path, and feature configurations.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `direction: optional "asc" or "desc"`

  Direction to order results.

  - `"asc"`

  - `"desc"`

- `endpoint: optional string`

  Filter results to only include endpoints containing this pattern.

- `feature: optional array of "thresholds" or "parameter_schemas" or "schema_info"`

  Add feature(s) to the results. The feature name that is given here corresponds to the resulting feature object. Have a look at the top-level object description for more details on the specific meaning.

  - `"thresholds"`

  - `"parameter_schemas"`

  - `"schema_info"`

- `host: optional array of string`

  Filter results to only include the specified hosts.

- `method: optional array of string`

  Filter results to only include the specified HTTP methods.

- `order: optional "method" or "host" or "endpoint" or "thresholds.$key"`

  Field to order by. When requesting a feature, the feature keys are available for ordering as well, e.g., `thresholds.suggested_threshold`.

  - `"method"`

  - `"host"`

  - `"endpoint"`

  - `"thresholds.$key"`

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page.

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

  - `features: optional object { thresholds }  or object { parameter_schemas }  or object { api_routing }  or 2 more`

    - `APIShieldOperationFeatureThresholds object { thresholds }`

      - `thresholds: optional object { auth_id_tokens, data_points, last_updated, 6 more }`

        - `auth_id_tokens: optional number`

          The total number of auth-ids seen across this calculation.

        - `data_points: optional number`

          The number of data points used for the threshold suggestion calculation.

        - `last_updated: optional string`

        - `p50: optional number`

          The p50 quantile of requests (in period_seconds).

        - `p90: optional number`

          The p90 quantile of requests (in period_seconds).

        - `p99: optional number`

          The p99 quantile of requests (in period_seconds).

        - `period_seconds: optional number`

          The period over which this threshold is suggested.

        - `requests: optional number`

          The estimated number of requests covered by these calculations.

        - `suggested_threshold: optional number`

          The suggested threshold in requests done by the same auth_id or period_seconds.

    - `APIShieldOperationFeatureParameterSchemas object { parameter_schemas }`

      - `parameter_schemas: object { last_updated, parameter_schemas }`

        - `last_updated: optional string`

        - `parameter_schemas: optional object { parameters, responses }`

          An operation schema object containing a response.

          - `parameters: optional array of unknown`

            An array containing the learned parameter schemas.

          - `responses: optional unknown`

            An empty response object. This field is required to yield a valid operation schema.

    - `APIShieldOperationFeatureAPIRouting object { api_routing }`

      - `api_routing: optional object { last_updated, route }`

        API Routing settings on endpoint.

        - `last_updated: optional string`

        - `route: optional string`

          Target route.

    - `APIShieldOperationFeatureConfidenceIntervals object { confidence_intervals }`

      - `confidence_intervals: optional object { last_updated, suggested_threshold }`

        - `last_updated: optional string`

        - `suggested_threshold: optional object { confidence_intervals, mean }`

          - `confidence_intervals: optional object { p90, p95, p99 }`

            - `p90: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

            - `p95: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

            - `p99: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

          - `mean: optional number`

            Suggested threshold.

    - `APIShieldOperationFeatureSchemaInfo object { schema_info }`

      - `schema_info: optional object { active_schema, learned_available, mitigation_action }`

        - `active_schema: optional object { id, created_at, is_learned, name }`

          Schema active on endpoint.

          - `id: optional string`

            UUID.

          - `created_at: optional string`

          - `is_learned: optional boolean`

            True if schema is Cloudflare-provided.

          - `name: optional string`

            Schema file name.

        - `learned_available: optional boolean`

          True if a Cloudflare-provided learned schema is available for this endpoint.

        - `mitigation_action: optional "none" or "log" or "block"`

          Action taken on requests failing validation.

          - `"none"`

          - `"log"`

          - `"block"`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/operations \
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
      "features": {
        "api_routing": {
          "last_updated": "2014-01-01T05:20:00.12345Z",
          "route": "https://api.example.com/api/service"
        }
      }
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

## Retrieve information about an operation

**get** `/zones/{zone_id}/api_gateway/operations/{operation_id}`

Gets detailed information about a specific API operation in API Shield, including its schema validation settings and traffic statistics.

### Path Parameters

- `zone_id: string`

  Identifier.

- `operation_id: string`

  UUID.

### Query Parameters

- `feature: optional array of "thresholds" or "parameter_schemas" or "schema_info"`

  Add feature(s) to the results. The feature name that is given here corresponds to the resulting feature object. Have a look at the top-level object description for more details on the specific meaning.

  - `"thresholds"`

  - `"parameter_schemas"`

  - `"schema_info"`

- `with_schemas: optional boolean`

  When true, includes OpenAPI schemas (both uploaded and learned) for the operation in the response. Due to the conversion overhead, this parameter is only supported on single-operation retrieval.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { endpoint, host, last_updated, 4 more }`

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

  - `features: optional object { thresholds }  or object { parameter_schemas }  or object { api_routing }  or 2 more`

    - `APIShieldOperationFeatureThresholds object { thresholds }`

      - `thresholds: optional object { auth_id_tokens, data_points, last_updated, 6 more }`

        - `auth_id_tokens: optional number`

          The total number of auth-ids seen across this calculation.

        - `data_points: optional number`

          The number of data points used for the threshold suggestion calculation.

        - `last_updated: optional string`

        - `p50: optional number`

          The p50 quantile of requests (in period_seconds).

        - `p90: optional number`

          The p90 quantile of requests (in period_seconds).

        - `p99: optional number`

          The p99 quantile of requests (in period_seconds).

        - `period_seconds: optional number`

          The period over which this threshold is suggested.

        - `requests: optional number`

          The estimated number of requests covered by these calculations.

        - `suggested_threshold: optional number`

          The suggested threshold in requests done by the same auth_id or period_seconds.

    - `APIShieldOperationFeatureParameterSchemas object { parameter_schemas }`

      - `parameter_schemas: object { last_updated, parameter_schemas }`

        - `last_updated: optional string`

        - `parameter_schemas: optional object { parameters, responses }`

          An operation schema object containing a response.

          - `parameters: optional array of unknown`

            An array containing the learned parameter schemas.

          - `responses: optional unknown`

            An empty response object. This field is required to yield a valid operation schema.

    - `APIShieldOperationFeatureAPIRouting object { api_routing }`

      - `api_routing: optional object { last_updated, route }`

        API Routing settings on endpoint.

        - `last_updated: optional string`

        - `route: optional string`

          Target route.

    - `APIShieldOperationFeatureConfidenceIntervals object { confidence_intervals }`

      - `confidence_intervals: optional object { last_updated, suggested_threshold }`

        - `last_updated: optional string`

        - `suggested_threshold: optional object { confidence_intervals, mean }`

          - `confidence_intervals: optional object { p90, p95, p99 }`

            - `p90: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

            - `p95: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

            - `p99: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

          - `mean: optional number`

            Suggested threshold.

    - `APIShieldOperationFeatureSchemaInfo object { schema_info }`

      - `schema_info: optional object { active_schema, learned_available, mitigation_action }`

        - `active_schema: optional object { id, created_at, is_learned, name }`

          Schema active on endpoint.

          - `id: optional string`

            UUID.

          - `created_at: optional string`

          - `is_learned: optional boolean`

            True if schema is Cloudflare-provided.

          - `name: optional string`

            Schema file name.

        - `learned_available: optional boolean`

          True if a Cloudflare-provided learned schema is available for this endpoint.

        - `mitigation_action: optional "none" or "log" or "block"`

          Action taken on requests failing validation.

          - `"none"`

          - `"log"`

          - `"block"`

  - `schemas: optional object { learned, uploaded }`

    OpenAPI JSON schemas for an operation, including both user-uploaded and Cloudflare-learned schemas.

    - `learned: optional object { parameters, requestBody }`

      An OpenAPI operation object fragment containing schema information for an operation. May include parameter definitions, request body specifications, and a component schema extension.

      - `parameters: optional array of map[unknown]`

        OpenAPI parameter objects describing path, query, header, or cookie parameters.

      - `requestBody: optional map[unknown]`

        OpenAPI request body object describing the expected request payload.

    - `uploaded: optional object { parameters, requestBody }`

      An OpenAPI operation object fragment containing schema information for an operation. May include parameter definitions, request body specifications, and a component schema extension.

      - `parameters: optional array of map[unknown]`

        OpenAPI parameter objects describing path, query, header, or cookie parameters.

      - `requestBody: optional map[unknown]`

        OpenAPI request body object describing the expected request payload.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/operations/$OPERATION_ID \
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
    "features": {
      "api_routing": {
        "last_updated": "2014-01-01T05:20:00.12345Z",
        "route": "https://api.example.com/api/service"
      }
    },
    "schemas": {
      "learned": {
        "parameters": [
          {
            "foo": "bar"
          }
        ],
        "requestBody": {
          "foo": "bar"
        }
      },
      "uploaded": {
        "parameters": [
          {
            "foo": "bar"
          }
        ],
        "requestBody": {
          "foo": "bar"
        }
      }
    }
  },
  "success": true
}
```

## Add one operation to a zone

**post** `/zones/{zone_id}/api_gateway/operations/item`

Add one operation to a zone. Endpoints can contain path variables. Host, method, endpoint will be normalized to a canoncial form when creating an operation and must be unique on the zone. Inserting an operation that matches an existing one will return the record of the already existing operation and update its last_updated date.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `endpoint: string`

  The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be Cloudflare-normalized upon insertion. See: https://developers.cloudflare.com/rules/normalization/how-it-works/.

- `host: string`

  RFC3986-compliant host.

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

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { endpoint, host, last_updated, 4 more }`

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

  - `features: optional object { thresholds }  or object { parameter_schemas }  or object { api_routing }  or 2 more`

    - `APIShieldOperationFeatureThresholds object { thresholds }`

      - `thresholds: optional object { auth_id_tokens, data_points, last_updated, 6 more }`

        - `auth_id_tokens: optional number`

          The total number of auth-ids seen across this calculation.

        - `data_points: optional number`

          The number of data points used for the threshold suggestion calculation.

        - `last_updated: optional string`

        - `p50: optional number`

          The p50 quantile of requests (in period_seconds).

        - `p90: optional number`

          The p90 quantile of requests (in period_seconds).

        - `p99: optional number`

          The p99 quantile of requests (in period_seconds).

        - `period_seconds: optional number`

          The period over which this threshold is suggested.

        - `requests: optional number`

          The estimated number of requests covered by these calculations.

        - `suggested_threshold: optional number`

          The suggested threshold in requests done by the same auth_id or period_seconds.

    - `APIShieldOperationFeatureParameterSchemas object { parameter_schemas }`

      - `parameter_schemas: object { last_updated, parameter_schemas }`

        - `last_updated: optional string`

        - `parameter_schemas: optional object { parameters, responses }`

          An operation schema object containing a response.

          - `parameters: optional array of unknown`

            An array containing the learned parameter schemas.

          - `responses: optional unknown`

            An empty response object. This field is required to yield a valid operation schema.

    - `APIShieldOperationFeatureAPIRouting object { api_routing }`

      - `api_routing: optional object { last_updated, route }`

        API Routing settings on endpoint.

        - `last_updated: optional string`

        - `route: optional string`

          Target route.

    - `APIShieldOperationFeatureConfidenceIntervals object { confidence_intervals }`

      - `confidence_intervals: optional object { last_updated, suggested_threshold }`

        - `last_updated: optional string`

        - `suggested_threshold: optional object { confidence_intervals, mean }`

          - `confidence_intervals: optional object { p90, p95, p99 }`

            - `p90: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

            - `p95: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

            - `p99: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

          - `mean: optional number`

            Suggested threshold.

    - `APIShieldOperationFeatureSchemaInfo object { schema_info }`

      - `schema_info: optional object { active_schema, learned_available, mitigation_action }`

        - `active_schema: optional object { id, created_at, is_learned, name }`

          Schema active on endpoint.

          - `id: optional string`

            UUID.

          - `created_at: optional string`

          - `is_learned: optional boolean`

            True if schema is Cloudflare-provided.

          - `name: optional string`

            Schema file name.

        - `learned_available: optional boolean`

          True if a Cloudflare-provided learned schema is available for this endpoint.

        - `mitigation_action: optional "none" or "log" or "block"`

          Action taken on requests failing validation.

          - `"none"`

          - `"log"`

          - `"block"`

  - `schemas: optional object { learned, uploaded }`

    OpenAPI JSON schemas for an operation, including both user-uploaded and Cloudflare-learned schemas.

    - `learned: optional object { parameters, requestBody }`

      An OpenAPI operation object fragment containing schema information for an operation. May include parameter definitions, request body specifications, and a component schema extension.

      - `parameters: optional array of map[unknown]`

        OpenAPI parameter objects describing path, query, header, or cookie parameters.

      - `requestBody: optional map[unknown]`

        OpenAPI request body object describing the expected request payload.

    - `uploaded: optional object { parameters, requestBody }`

      An OpenAPI operation object fragment containing schema information for an operation. May include parameter definitions, request body specifications, and a component schema extension.

      - `parameters: optional array of map[unknown]`

        OpenAPI parameter objects describing path, query, header, or cookie parameters.

      - `requestBody: optional map[unknown]`

        OpenAPI request body object describing the expected request payload.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/operations/item \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "endpoint": "/api/v1/users/{var1}",
          "host": "www.example.com",
          "method": "GET"
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
    "endpoint": "/api/v1/users/{var1}",
    "host": "www.example.com",
    "last_updated": "2014-01-01T05:20:00.12345Z",
    "method": "GET",
    "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "features": {
      "api_routing": {
        "last_updated": "2014-01-01T05:20:00.12345Z",
        "route": "https://api.example.com/api/service"
      }
    },
    "schemas": {
      "learned": {
        "parameters": [
          {
            "foo": "bar"
          }
        ],
        "requestBody": {
          "foo": "bar"
        }
      },
      "uploaded": {
        "parameters": [
          {
            "foo": "bar"
          }
        ],
        "requestBody": {
          "foo": "bar"
        }
      }
    }
  },
  "success": true
}
```

## Delete an operation

**delete** `/zones/{zone_id}/api_gateway/operations/{operation_id}`

Removes a single API operation from API Shield endpoint management. The operation will no longer be tracked or protected by API Shield rules.

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

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/operations/$OPERATION_ID \
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
  "success": true
}
```

## Add operations to a zone

**post** `/zones/{zone_id}/api_gateway/operations`

Add one or more operations to a zone. Endpoints can contain path variables. Host, method, endpoint will be normalized to a canoncial form when creating an operation and must be unique on the zone. Inserting an operation that matches an existing one will return the record of the already existing operation and update its last_updated date.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `body: array of object { endpoint, host, method }`

  - `endpoint: string`

    The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be Cloudflare-normalized upon insertion. See: https://developers.cloudflare.com/rules/normalization/how-it-works/.

  - `host: string`

    RFC3986-compliant host.

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

  - `features: optional object { thresholds }  or object { parameter_schemas }  or object { api_routing }  or 2 more`

    - `APIShieldOperationFeatureThresholds object { thresholds }`

      - `thresholds: optional object { auth_id_tokens, data_points, last_updated, 6 more }`

        - `auth_id_tokens: optional number`

          The total number of auth-ids seen across this calculation.

        - `data_points: optional number`

          The number of data points used for the threshold suggestion calculation.

        - `last_updated: optional string`

        - `p50: optional number`

          The p50 quantile of requests (in period_seconds).

        - `p90: optional number`

          The p90 quantile of requests (in period_seconds).

        - `p99: optional number`

          The p99 quantile of requests (in period_seconds).

        - `period_seconds: optional number`

          The period over which this threshold is suggested.

        - `requests: optional number`

          The estimated number of requests covered by these calculations.

        - `suggested_threshold: optional number`

          The suggested threshold in requests done by the same auth_id or period_seconds.

    - `APIShieldOperationFeatureParameterSchemas object { parameter_schemas }`

      - `parameter_schemas: object { last_updated, parameter_schemas }`

        - `last_updated: optional string`

        - `parameter_schemas: optional object { parameters, responses }`

          An operation schema object containing a response.

          - `parameters: optional array of unknown`

            An array containing the learned parameter schemas.

          - `responses: optional unknown`

            An empty response object. This field is required to yield a valid operation schema.

    - `APIShieldOperationFeatureAPIRouting object { api_routing }`

      - `api_routing: optional object { last_updated, route }`

        API Routing settings on endpoint.

        - `last_updated: optional string`

        - `route: optional string`

          Target route.

    - `APIShieldOperationFeatureConfidenceIntervals object { confidence_intervals }`

      - `confidence_intervals: optional object { last_updated, suggested_threshold }`

        - `last_updated: optional string`

        - `suggested_threshold: optional object { confidence_intervals, mean }`

          - `confidence_intervals: optional object { p90, p95, p99 }`

            - `p90: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

            - `p95: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

            - `p99: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

          - `mean: optional number`

            Suggested threshold.

    - `APIShieldOperationFeatureSchemaInfo object { schema_info }`

      - `schema_info: optional object { active_schema, learned_available, mitigation_action }`

        - `active_schema: optional object { id, created_at, is_learned, name }`

          Schema active on endpoint.

          - `id: optional string`

            UUID.

          - `created_at: optional string`

          - `is_learned: optional boolean`

            True if schema is Cloudflare-provided.

          - `name: optional string`

            Schema file name.

        - `learned_available: optional boolean`

          True if a Cloudflare-provided learned schema is available for this endpoint.

        - `mitigation_action: optional "none" or "log" or "block"`

          Action taken on requests failing validation.

          - `"none"`

          - `"log"`

          - `"block"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/operations \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "endpoint": "/api/v1/users/{var1}",
            "host": "www.example.com",
            "method": "GET"
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
      "endpoint": "/api/v1/users/{var1}",
      "host": "www.example.com",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "method": "GET",
      "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "features": {
        "api_routing": {
          "last_updated": "2014-01-01T05:20:00.12345Z",
          "route": "https://api.example.com/api/service"
        }
      }
    }
  ],
  "success": true
}
```

## Delete multiple operations

**delete** `/zones/{zone_id}/api_gateway/operations`

Bulk removes multiple API operations from API Shield endpoint management in a single request. Efficient for cleaning up unused endpoints.

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

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/operations \
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
  "success": true
}
```

## Domain Types

### API Shield

- `APIShield object { endpoint, host, last_updated, 2 more }`

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

### Operation List Response

- `OperationListResponse object { endpoint, host, last_updated, 3 more }`

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

  - `features: optional object { thresholds }  or object { parameter_schemas }  or object { api_routing }  or 2 more`

    - `APIShieldOperationFeatureThresholds object { thresholds }`

      - `thresholds: optional object { auth_id_tokens, data_points, last_updated, 6 more }`

        - `auth_id_tokens: optional number`

          The total number of auth-ids seen across this calculation.

        - `data_points: optional number`

          The number of data points used for the threshold suggestion calculation.

        - `last_updated: optional string`

        - `p50: optional number`

          The p50 quantile of requests (in period_seconds).

        - `p90: optional number`

          The p90 quantile of requests (in period_seconds).

        - `p99: optional number`

          The p99 quantile of requests (in period_seconds).

        - `period_seconds: optional number`

          The period over which this threshold is suggested.

        - `requests: optional number`

          The estimated number of requests covered by these calculations.

        - `suggested_threshold: optional number`

          The suggested threshold in requests done by the same auth_id or period_seconds.

    - `APIShieldOperationFeatureParameterSchemas object { parameter_schemas }`

      - `parameter_schemas: object { last_updated, parameter_schemas }`

        - `last_updated: optional string`

        - `parameter_schemas: optional object { parameters, responses }`

          An operation schema object containing a response.

          - `parameters: optional array of unknown`

            An array containing the learned parameter schemas.

          - `responses: optional unknown`

            An empty response object. This field is required to yield a valid operation schema.

    - `APIShieldOperationFeatureAPIRouting object { api_routing }`

      - `api_routing: optional object { last_updated, route }`

        API Routing settings on endpoint.

        - `last_updated: optional string`

        - `route: optional string`

          Target route.

    - `APIShieldOperationFeatureConfidenceIntervals object { confidence_intervals }`

      - `confidence_intervals: optional object { last_updated, suggested_threshold }`

        - `last_updated: optional string`

        - `suggested_threshold: optional object { confidence_intervals, mean }`

          - `confidence_intervals: optional object { p90, p95, p99 }`

            - `p90: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

            - `p95: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

            - `p99: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

          - `mean: optional number`

            Suggested threshold.

    - `APIShieldOperationFeatureSchemaInfo object { schema_info }`

      - `schema_info: optional object { active_schema, learned_available, mitigation_action }`

        - `active_schema: optional object { id, created_at, is_learned, name }`

          Schema active on endpoint.

          - `id: optional string`

            UUID.

          - `created_at: optional string`

          - `is_learned: optional boolean`

            True if schema is Cloudflare-provided.

          - `name: optional string`

            Schema file name.

        - `learned_available: optional boolean`

          True if a Cloudflare-provided learned schema is available for this endpoint.

        - `mitigation_action: optional "none" or "log" or "block"`

          Action taken on requests failing validation.

          - `"none"`

          - `"log"`

          - `"block"`

### Operation Get Response

- `OperationGetResponse object { endpoint, host, last_updated, 4 more }`

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

  - `features: optional object { thresholds }  or object { parameter_schemas }  or object { api_routing }  or 2 more`

    - `APIShieldOperationFeatureThresholds object { thresholds }`

      - `thresholds: optional object { auth_id_tokens, data_points, last_updated, 6 more }`

        - `auth_id_tokens: optional number`

          The total number of auth-ids seen across this calculation.

        - `data_points: optional number`

          The number of data points used for the threshold suggestion calculation.

        - `last_updated: optional string`

        - `p50: optional number`

          The p50 quantile of requests (in period_seconds).

        - `p90: optional number`

          The p90 quantile of requests (in period_seconds).

        - `p99: optional number`

          The p99 quantile of requests (in period_seconds).

        - `period_seconds: optional number`

          The period over which this threshold is suggested.

        - `requests: optional number`

          The estimated number of requests covered by these calculations.

        - `suggested_threshold: optional number`

          The suggested threshold in requests done by the same auth_id or period_seconds.

    - `APIShieldOperationFeatureParameterSchemas object { parameter_schemas }`

      - `parameter_schemas: object { last_updated, parameter_schemas }`

        - `last_updated: optional string`

        - `parameter_schemas: optional object { parameters, responses }`

          An operation schema object containing a response.

          - `parameters: optional array of unknown`

            An array containing the learned parameter schemas.

          - `responses: optional unknown`

            An empty response object. This field is required to yield a valid operation schema.

    - `APIShieldOperationFeatureAPIRouting object { api_routing }`

      - `api_routing: optional object { last_updated, route }`

        API Routing settings on endpoint.

        - `last_updated: optional string`

        - `route: optional string`

          Target route.

    - `APIShieldOperationFeatureConfidenceIntervals object { confidence_intervals }`

      - `confidence_intervals: optional object { last_updated, suggested_threshold }`

        - `last_updated: optional string`

        - `suggested_threshold: optional object { confidence_intervals, mean }`

          - `confidence_intervals: optional object { p90, p95, p99 }`

            - `p90: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

            - `p95: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

            - `p99: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

          - `mean: optional number`

            Suggested threshold.

    - `APIShieldOperationFeatureSchemaInfo object { schema_info }`

      - `schema_info: optional object { active_schema, learned_available, mitigation_action }`

        - `active_schema: optional object { id, created_at, is_learned, name }`

          Schema active on endpoint.

          - `id: optional string`

            UUID.

          - `created_at: optional string`

          - `is_learned: optional boolean`

            True if schema is Cloudflare-provided.

          - `name: optional string`

            Schema file name.

        - `learned_available: optional boolean`

          True if a Cloudflare-provided learned schema is available for this endpoint.

        - `mitigation_action: optional "none" or "log" or "block"`

          Action taken on requests failing validation.

          - `"none"`

          - `"log"`

          - `"block"`

  - `schemas: optional object { learned, uploaded }`

    OpenAPI JSON schemas for an operation, including both user-uploaded and Cloudflare-learned schemas.

    - `learned: optional object { parameters, requestBody }`

      An OpenAPI operation object fragment containing schema information for an operation. May include parameter definitions, request body specifications, and a component schema extension.

      - `parameters: optional array of map[unknown]`

        OpenAPI parameter objects describing path, query, header, or cookie parameters.

      - `requestBody: optional map[unknown]`

        OpenAPI request body object describing the expected request payload.

    - `uploaded: optional object { parameters, requestBody }`

      An OpenAPI operation object fragment containing schema information for an operation. May include parameter definitions, request body specifications, and a component schema extension.

      - `parameters: optional array of map[unknown]`

        OpenAPI parameter objects describing path, query, header, or cookie parameters.

      - `requestBody: optional map[unknown]`

        OpenAPI request body object describing the expected request payload.

### Operation Create Response

- `OperationCreateResponse object { endpoint, host, last_updated, 4 more }`

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

  - `features: optional object { thresholds }  or object { parameter_schemas }  or object { api_routing }  or 2 more`

    - `APIShieldOperationFeatureThresholds object { thresholds }`

      - `thresholds: optional object { auth_id_tokens, data_points, last_updated, 6 more }`

        - `auth_id_tokens: optional number`

          The total number of auth-ids seen across this calculation.

        - `data_points: optional number`

          The number of data points used for the threshold suggestion calculation.

        - `last_updated: optional string`

        - `p50: optional number`

          The p50 quantile of requests (in period_seconds).

        - `p90: optional number`

          The p90 quantile of requests (in period_seconds).

        - `p99: optional number`

          The p99 quantile of requests (in period_seconds).

        - `period_seconds: optional number`

          The period over which this threshold is suggested.

        - `requests: optional number`

          The estimated number of requests covered by these calculations.

        - `suggested_threshold: optional number`

          The suggested threshold in requests done by the same auth_id or period_seconds.

    - `APIShieldOperationFeatureParameterSchemas object { parameter_schemas }`

      - `parameter_schemas: object { last_updated, parameter_schemas }`

        - `last_updated: optional string`

        - `parameter_schemas: optional object { parameters, responses }`

          An operation schema object containing a response.

          - `parameters: optional array of unknown`

            An array containing the learned parameter schemas.

          - `responses: optional unknown`

            An empty response object. This field is required to yield a valid operation schema.

    - `APIShieldOperationFeatureAPIRouting object { api_routing }`

      - `api_routing: optional object { last_updated, route }`

        API Routing settings on endpoint.

        - `last_updated: optional string`

        - `route: optional string`

          Target route.

    - `APIShieldOperationFeatureConfidenceIntervals object { confidence_intervals }`

      - `confidence_intervals: optional object { last_updated, suggested_threshold }`

        - `last_updated: optional string`

        - `suggested_threshold: optional object { confidence_intervals, mean }`

          - `confidence_intervals: optional object { p90, p95, p99 }`

            - `p90: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

            - `p95: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

            - `p99: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

          - `mean: optional number`

            Suggested threshold.

    - `APIShieldOperationFeatureSchemaInfo object { schema_info }`

      - `schema_info: optional object { active_schema, learned_available, mitigation_action }`

        - `active_schema: optional object { id, created_at, is_learned, name }`

          Schema active on endpoint.

          - `id: optional string`

            UUID.

          - `created_at: optional string`

          - `is_learned: optional boolean`

            True if schema is Cloudflare-provided.

          - `name: optional string`

            Schema file name.

        - `learned_available: optional boolean`

          True if a Cloudflare-provided learned schema is available for this endpoint.

        - `mitigation_action: optional "none" or "log" or "block"`

          Action taken on requests failing validation.

          - `"none"`

          - `"log"`

          - `"block"`

  - `schemas: optional object { learned, uploaded }`

    OpenAPI JSON schemas for an operation, including both user-uploaded and Cloudflare-learned schemas.

    - `learned: optional object { parameters, requestBody }`

      An OpenAPI operation object fragment containing schema information for an operation. May include parameter definitions, request body specifications, and a component schema extension.

      - `parameters: optional array of map[unknown]`

        OpenAPI parameter objects describing path, query, header, or cookie parameters.

      - `requestBody: optional map[unknown]`

        OpenAPI request body object describing the expected request payload.

    - `uploaded: optional object { parameters, requestBody }`

      An OpenAPI operation object fragment containing schema information for an operation. May include parameter definitions, request body specifications, and a component schema extension.

      - `parameters: optional array of map[unknown]`

        OpenAPI parameter objects describing path, query, header, or cookie parameters.

      - `requestBody: optional map[unknown]`

        OpenAPI request body object describing the expected request payload.

### Operation Delete Response

- `OperationDeleteResponse object { errors, messages, success }`

  - `errors: Message`

    - `code: number`

    - `message: string`

    - `documentation_url: optional string`

    - `source: optional object { pointer }`

      - `pointer: optional string`

  - `messages: Message`

  - `success: true`

    Whether the API call was successful.

    - `true`

### Operation Bulk Create Response

- `OperationBulkCreateResponse object { endpoint, host, last_updated, 3 more }`

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

  - `features: optional object { thresholds }  or object { parameter_schemas }  or object { api_routing }  or 2 more`

    - `APIShieldOperationFeatureThresholds object { thresholds }`

      - `thresholds: optional object { auth_id_tokens, data_points, last_updated, 6 more }`

        - `auth_id_tokens: optional number`

          The total number of auth-ids seen across this calculation.

        - `data_points: optional number`

          The number of data points used for the threshold suggestion calculation.

        - `last_updated: optional string`

        - `p50: optional number`

          The p50 quantile of requests (in period_seconds).

        - `p90: optional number`

          The p90 quantile of requests (in period_seconds).

        - `p99: optional number`

          The p99 quantile of requests (in period_seconds).

        - `period_seconds: optional number`

          The period over which this threshold is suggested.

        - `requests: optional number`

          The estimated number of requests covered by these calculations.

        - `suggested_threshold: optional number`

          The suggested threshold in requests done by the same auth_id or period_seconds.

    - `APIShieldOperationFeatureParameterSchemas object { parameter_schemas }`

      - `parameter_schemas: object { last_updated, parameter_schemas }`

        - `last_updated: optional string`

        - `parameter_schemas: optional object { parameters, responses }`

          An operation schema object containing a response.

          - `parameters: optional array of unknown`

            An array containing the learned parameter schemas.

          - `responses: optional unknown`

            An empty response object. This field is required to yield a valid operation schema.

    - `APIShieldOperationFeatureAPIRouting object { api_routing }`

      - `api_routing: optional object { last_updated, route }`

        API Routing settings on endpoint.

        - `last_updated: optional string`

        - `route: optional string`

          Target route.

    - `APIShieldOperationFeatureConfidenceIntervals object { confidence_intervals }`

      - `confidence_intervals: optional object { last_updated, suggested_threshold }`

        - `last_updated: optional string`

        - `suggested_threshold: optional object { confidence_intervals, mean }`

          - `confidence_intervals: optional object { p90, p95, p99 }`

            - `p90: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

            - `p95: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

            - `p99: optional object { lower, upper }`

              Upper and lower bound for percentile estimate

              - `lower: optional number`

                Lower bound for percentile estimate

              - `upper: optional number`

                Upper bound for percentile estimate

          - `mean: optional number`

            Suggested threshold.

    - `APIShieldOperationFeatureSchemaInfo object { schema_info }`

      - `schema_info: optional object { active_schema, learned_available, mitigation_action }`

        - `active_schema: optional object { id, created_at, is_learned, name }`

          Schema active on endpoint.

          - `id: optional string`

            UUID.

          - `created_at: optional string`

          - `is_learned: optional boolean`

            True if schema is Cloudflare-provided.

          - `name: optional string`

            Schema file name.

        - `learned_available: optional boolean`

          True if a Cloudflare-provided learned schema is available for this endpoint.

        - `mitigation_action: optional "none" or "log" or "block"`

          Action taken on requests failing validation.

          - `"none"`

          - `"log"`

          - `"block"`

### Operation Bulk Delete Response

- `OperationBulkDeleteResponse object { errors, messages, success }`

  - `errors: Message`

    - `code: number`

    - `message: string`

    - `documentation_url: optional string`

    - `source: optional object { pointer }`

      - `pointer: optional string`

  - `messages: Message`

  - `success: true`

    Whether the API call was successful.

    - `true`

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

# Schema Validation

## Retrieve operation-level schema validation settings

**get** `/zones/{zone_id}/api_gateway/operations/{operation_id}/schema_validation`

Retrieves operation-level schema validation settings on the zone

### Path Parameters

- `zone_id: string`

  Identifier.

- `operation_id: string`

  UUID.

### Returns

- `mitigation_action: optional "log" or "block" or "none"`

  When set, this applies a mitigation action to this operation

  - `log` log request when request does not conform to schema for this operation
  - `block` deny access to the site when request does not conform to schema for this operation
  - `none` will skip mitigation for this operation
  - `null` indicates that no operation level mitigation is in place, see Zone Level Schema Validation Settings for mitigation action that will be applied

  - `"log"`

  - `"block"`

  - `"none"`

- `operation_id: optional string`

  UUID.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/operations/$OPERATION_ID/schema_validation \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "mitigation_action": "block",
  "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
}
```

## Update operation-level schema validation settings

**put** `/zones/{zone_id}/api_gateway/operations/{operation_id}/schema_validation`

Updates operation-level schema validation settings on the zone

### Path Parameters

- `zone_id: string`

  Identifier.

- `operation_id: string`

  UUID.

### Body Parameters

- `mitigation_action: optional "log" or "block" or "none"`

  When set, this applies a mitigation action to this operation

  - `log` log request when request does not conform to schema for this operation
  - `block` deny access to the site when request does not conform to schema for this operation
  - `none` will skip mitigation for this operation
  - `null` indicates that no operation level mitigation is in place, see Zone Level Schema Validation Settings for mitigation action that will be applied

  - `"log"`

  - `"block"`

  - `"none"`

### Returns

- `mitigation_action: optional "log" or "block" or "none"`

  When set, this applies a mitigation action to this operation

  - `log` log request when request does not conform to schema for this operation
  - `block` deny access to the site when request does not conform to schema for this operation
  - `none` will skip mitigation for this operation
  - `null` indicates that no operation level mitigation is in place, see Zone Level Schema Validation Settings for mitigation action that will be applied

  - `"log"`

  - `"block"`

  - `"none"`

- `operation_id: optional string`

  UUID.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/operations/$OPERATION_ID/schema_validation \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "mitigation_action": "block"
        }'
```

#### Response

```json
{
  "mitigation_action": "block",
  "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
}
```

## Update multiple operation-level schema validation settings

**patch** `/zones/{zone_id}/api_gateway/operations/schema_validation`

Updates multiple operation-level schema validation settings on the zone

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `settings_multiple_request: SettingsMultipleRequest`

  - `mitigation_action: optional "log" or "block" or "none"`

    When set, this applies a mitigation action to this operation

    - `log` log request when request does not conform to schema for this operation
    - `block` deny access to the site when request does not conform to schema for this operation
    - `none` will skip mitigation for this operation
    - `null` indicates that no operation level mitigation is in place, see Zone Level Schema Validation Settings for mitigation action that will be applied

    - `"log"`

    - `"block"`

    - `"none"`

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: SettingsMultipleRequest`

  - `mitigation_action: optional "log" or "block" or "none"`

    When set, this applies a mitigation action to this operation

    - `log` log request when request does not conform to schema for this operation
    - `block` deny access to the site when request does not conform to schema for this operation
    - `none` will skip mitigation for this operation
    - `null` indicates that no operation level mitigation is in place, see Zone Level Schema Validation Settings for mitigation action that will be applied

    - `"log"`

    - `"block"`

    - `"none"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/operations/schema_validation \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "3818d821-5901-4147-a474-f5f5aec1d54e": {
            "mitigation_action": "log"
          },
          "b17c8043-99a0-4202-b7d9-8f7cdbee02cd": {
            "mitigation_action": "block"
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
    "3818d821-5901-4147-a474-f5f5aec1d54e": {
      "mitigation_action": "log"
    },
    "b17c8043-99a0-4202-b7d9-8f7cdbee02cd": {
      "mitigation_action": "block"
    }
  },
  "success": true
}
```

## Domain Types

### Settings Multiple Request

- `SettingsMultipleRequest = map[object { mitigation_action } ]`

  - `mitigation_action: optional "log" or "block" or "none"`

    When set, this applies a mitigation action to this operation

    - `log` log request when request does not conform to schema for this operation
    - `block` deny access to the site when request does not conform to schema for this operation
    - `none` will skip mitigation for this operation
    - `null` indicates that no operation level mitigation is in place, see Zone Level Schema Validation Settings for mitigation action that will be applied

    - `"log"`

    - `"block"`

    - `"none"`

### Schema Validation Get Response

- `SchemaValidationGetResponse object { mitigation_action, operation_id }`

  - `mitigation_action: optional "log" or "block" or "none"`

    When set, this applies a mitigation action to this operation

    - `log` log request when request does not conform to schema for this operation
    - `block` deny access to the site when request does not conform to schema for this operation
    - `none` will skip mitigation for this operation
    - `null` indicates that no operation level mitigation is in place, see Zone Level Schema Validation Settings for mitigation action that will be applied

    - `"log"`

    - `"block"`

    - `"none"`

  - `operation_id: optional string`

    UUID.

### Schema Validation Update Response

- `SchemaValidationUpdateResponse object { mitigation_action, operation_id }`

  - `mitigation_action: optional "log" or "block" or "none"`

    When set, this applies a mitigation action to this operation

    - `log` log request when request does not conform to schema for this operation
    - `block` deny access to the site when request does not conform to schema for this operation
    - `none` will skip mitigation for this operation
    - `null` indicates that no operation level mitigation is in place, see Zone Level Schema Validation Settings for mitigation action that will be applied

    - `"log"`

    - `"block"`

    - `"none"`

  - `operation_id: optional string`

    UUID.

# Schemas

## Retrieve operations and features as OpenAPI schemas

**get** `/zones/{zone_id}/api_gateway/schemas`

Retrieves API operations and their features exported as OpenAPI schemas.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `feature: optional array of "thresholds" or "parameter_schemas" or "schema_info"`

  Add feature(s) to the results. The feature name that is given here corresponds to the resulting feature object. Have a look at the top-level object description for more details on the specific meaning.

  - `"thresholds"`

  - `"parameter_schemas"`

  - `"schema_info"`

- `host: optional array of string`

  Receive schema only for the given host(s).

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { schemas, timestamp }`

  - `schemas: optional array of unknown`

  - `timestamp: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/schemas \
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
    "schemas": [
      {
        "info": {
          "title": "OpenAPI JSON schema for www.example.com",
          "version": "1.0"
        },
        "openapi": "3.0.0",
        "paths": {
          "... Further paths ...": {},
          "/api/v1/users/{var1}": {
            "get": {
              "parameters": [
                {
                  "in": "path",
                  "name": "var1",
                  "required": true,
                  "schema": {
                    "type": "string"
                  }
                }
              ]
            }
          }
        },
        "servers": [
          {
            "url": "www.example.com"
          }
        ]
      }
    ],
    "timestamp": "timestamp"
  },
  "success": true
}
```

## Domain Types

### Schema List Response

- `SchemaListResponse object { schemas, timestamp }`

  - `schemas: optional array of unknown`

  - `timestamp: optional string`

# Settings

## Domain Types

### Settings

- `Settings object { validation_default_mitigation_action, validation_override_mitigation_action }`

  - `validation_default_mitigation_action: optional "none" or "log" or "block"`

    The default mitigation action used when there is no mitigation action defined on the operation

    Mitigation actions are as follows:

    * `log` - log request when request does not conform to schema
    * `block` - deny access to the site when request does not conform to schema

    A special value of of `none` will skip running schema validation entirely for the request when there is no mitigation action defined on the operation

    - `"none"`

    - `"log"`

    - `"block"`

  - `validation_override_mitigation_action: optional "none"`

    When set, this overrides both zone level and operation level mitigation actions.

    - `none` will skip running schema validation entirely for the request
    - `null` indicates that no override is in place

    - `"none"`

# Schema Validation

## Retrieve zone level schema validation settings

**get** `/zones/{zone_id}/api_gateway/settings/schema_validation`

Retrieves zone level schema validation settings currently set on the zone

### Path Parameters

- `zone_id: string`

  Identifier.

### Returns

- `Settings object { validation_default_mitigation_action, validation_override_mitigation_action }`

  - `validation_default_mitigation_action: optional "none" or "log" or "block"`

    The default mitigation action used when there is no mitigation action defined on the operation

    Mitigation actions are as follows:

    * `log` - log request when request does not conform to schema
    * `block` - deny access to the site when request does not conform to schema

    A special value of of `none` will skip running schema validation entirely for the request when there is no mitigation action defined on the operation

    - `"none"`

    - `"log"`

    - `"block"`

  - `validation_override_mitigation_action: optional "none"`

    When set, this overrides both zone level and operation level mitigation actions.

    - `none` will skip running schema validation entirely for the request
    - `null` indicates that no override is in place

    - `"none"`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/settings/schema_validation \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "validation_default_mitigation_action": "block",
  "validation_override_mitigation_action": "none"
}
```

## Update zone level schema validation settings

**put** `/zones/{zone_id}/api_gateway/settings/schema_validation`

Updates zone level schema validation settings on the zone

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `validation_default_mitigation_action: "none" or "log" or "block"`

  The default mitigation action used when there is no mitigation action defined on the operation

  Mitigation actions are as follows:

  * `log` - log request when request does not conform to schema
  * `block` - deny access to the site when request does not conform to schema

  A special value of of `none` will skip running schema validation entirely for the request when there is no mitigation action defined on the operation

  - `"none"`

  - `"log"`

  - `"block"`

- `validation_override_mitigation_action: optional "none" or "disable_override"`

  When set, this overrides both zone level and operation level mitigation actions.

  - `none` will skip running schema validation entirely for the request
  - `null` indicates that no override is in place

  To clear any override, use the special value `disable_override` or `null`

  - `"none"`

  - `"disable_override"`

### Returns

- `Settings object { validation_default_mitigation_action, validation_override_mitigation_action }`

  - `validation_default_mitigation_action: optional "none" or "log" or "block"`

    The default mitigation action used when there is no mitigation action defined on the operation

    Mitigation actions are as follows:

    * `log` - log request when request does not conform to schema
    * `block` - deny access to the site when request does not conform to schema

    A special value of of `none` will skip running schema validation entirely for the request when there is no mitigation action defined on the operation

    - `"none"`

    - `"log"`

    - `"block"`

  - `validation_override_mitigation_action: optional "none"`

    When set, this overrides both zone level and operation level mitigation actions.

    - `none` will skip running schema validation entirely for the request
    - `null` indicates that no override is in place

    - `"none"`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/settings/schema_validation \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "validation_default_mitigation_action": "block",
          "validation_override_mitigation_action": "none"
        }'
```

#### Response

```json
{
  "validation_default_mitigation_action": "block",
  "validation_override_mitigation_action": "none"
}
```

## Update zone level schema validation settings

**patch** `/zones/{zone_id}/api_gateway/settings/schema_validation`

Updates zone level schema validation settings on the zone

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `validation_default_mitigation_action: optional "none" or "log" or "block"`

  The default mitigation action used when there is no mitigation action defined on the operation
  Mitigation actions are as follows:

  * `log` - log request when request does not conform to schema
  * `block` - deny access to the site when request does not conform to schema

  A special value of of `none` will skip running schema validation entirely for the request when there is no mitigation action defined on the operation

  `null` will have no effect.

  - `"none"`

  - `"log"`

  - `"block"`

- `validation_override_mitigation_action: optional "none" or "disable_override"`

  When set, this overrides both zone level and operation level mitigation actions.

  - `none` will skip running schema validation entirely for the request

  To clear any override, use the special value `disable_override`

  `null` will have no effect.

  - `"none"`

  - `"disable_override"`

### Returns

- `Settings object { validation_default_mitigation_action, validation_override_mitigation_action }`

  - `validation_default_mitigation_action: optional "none" or "log" or "block"`

    The default mitigation action used when there is no mitigation action defined on the operation

    Mitigation actions are as follows:

    * `log` - log request when request does not conform to schema
    * `block` - deny access to the site when request does not conform to schema

    A special value of of `none` will skip running schema validation entirely for the request when there is no mitigation action defined on the operation

    - `"none"`

    - `"log"`

    - `"block"`

  - `validation_override_mitigation_action: optional "none"`

    When set, this overrides both zone level and operation level mitigation actions.

    - `none` will skip running schema validation entirely for the request
    - `null` indicates that no override is in place

    - `"none"`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/settings/schema_validation \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "validation_default_mitigation_action": "block",
          "validation_override_mitigation_action": "none"
        }'
```

#### Response

```json
{
  "validation_default_mitigation_action": "block",
  "validation_override_mitigation_action": "none"
}
```

# User Schemas

## Retrieve information about all schemas on a zone

**get** `/zones/{zone_id}/api_gateway/user_schemas`

Lists all OpenAPI schemas uploaded to API Shield for the zone, including their validation status and associated operations.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `omit_source: optional boolean`

  Omit the source-files of schemas and only retrieve their meta-data.

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page.

- `validation_enabled: optional boolean`

  Flag whether schema is enabled for validation.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: array of OldPublicSchema`

  - `created_at: string`

  - `kind: "openapi_v3"`

    Kind of schema

    - `"openapi_v3"`

  - `name: string`

    Name of the schema

  - `schema_id: string`

    UUID.

  - `source: optional string`

    Source of the schema

  - `validation_enabled: optional boolean`

    Flag whether schema is enabled for validation.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/user_schemas \
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
      "kind": "openapi_v3",
      "name": "petstore schema",
      "schema_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "source": "<schema file bytes>",
      "validation_enabled": true
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

## Retrieve information about a specific schema on a zone

**get** `/zones/{zone_id}/api_gateway/user_schemas/{schema_id}`

Gets detailed information about a specific uploaded OpenAPI schema, including its contents and validation configuration.

### Path Parameters

- `zone_id: string`

  Identifier.

- `schema_id: string`

### Query Parameters

- `omit_source: optional boolean`

  Omit the source-files of schemas and only retrieve their meta-data.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: OldPublicSchema`

  - `created_at: string`

  - `kind: "openapi_v3"`

    Kind of schema

    - `"openapi_v3"`

  - `name: string`

    Name of the schema

  - `schema_id: string`

    UUID.

  - `source: optional string`

    Source of the schema

  - `validation_enabled: optional boolean`

    Flag whether schema is enabled for validation.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/user_schemas/$SCHEMA_ID \
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
    "kind": "openapi_v3",
    "name": "petstore schema",
    "schema_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "source": "<schema file bytes>",
    "validation_enabled": true
  },
  "success": true
}
```

## Upload a schema to a zone

**post** `/zones/{zone_id}/api_gateway/user_schemas`

Uploads a new OpenAPI schema for API Shield schema validation. The schema defines expected request/response formats for API endpoints.

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

- `result: object { schema, upload_details }`

  - `schema: OldPublicSchema`

    - `created_at: string`

    - `kind: "openapi_v3"`

      Kind of schema

      - `"openapi_v3"`

    - `name: string`

      Name of the schema

    - `schema_id: string`

      UUID.

    - `source: optional string`

      Source of the schema

    - `validation_enabled: optional boolean`

      Flag whether schema is enabled for validation.

  - `upload_details: optional object { warnings }`

    - `warnings: optional array of object { code, locations, message }`

      Diagnostic warning events that occurred during processing. These events are non-critical errors found within the schema.

      - `code: number`

        Code that identifies the event that occurred.

      - `locations: optional array of string`

        JSONPath location(s) in the schema where these events were encountered.  See <https://goessner.net/articles/JsonPath/> for JSONPath specification.

      - `message: optional string`

        Diagnostic message that describes the event.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/user_schemas \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F 'file=@/path/to/file' \
    -F kind=openapi_v3 \
    -F name='petstore schema'
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
    "schema": {
      "created_at": "2014-01-01T05:20:00.12345Z",
      "kind": "openapi_v3",
      "name": "petstore schema",
      "schema_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "source": "<schema file bytes>",
      "validation_enabled": true
    },
    "upload_details": {
      "warnings": [
        {
          "code": 28,
          "locations": [
            ".paths[\"/user/{username}\"].put"
          ],
          "message": "unsupported media type: application/octet-stream"
        }
      ]
    }
  },
  "success": true
}
```

## Enable validation for a schema

**patch** `/zones/{zone_id}/api_gateway/user_schemas/{schema_id}`

Activates schema validation for an uploaded OpenAPI schema. Requests to matching endpoints will be validated against the schema definitions.

### Path Parameters

- `zone_id: string`

  Identifier.

- `schema_id: string`

### Body Parameters

- `validation_enabled: optional true`

  Flag whether schema is enabled for validation.

  - `true`

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: OldPublicSchema`

  - `created_at: string`

  - `kind: "openapi_v3"`

    Kind of schema

    - `"openapi_v3"`

  - `name: string`

    Name of the schema

  - `schema_id: string`

    UUID.

  - `source: optional string`

    Source of the schema

  - `validation_enabled: optional boolean`

    Flag whether schema is enabled for validation.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/user_schemas/$SCHEMA_ID \
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
  "result": {
    "created_at": "2014-01-01T05:20:00.12345Z",
    "kind": "openapi_v3",
    "name": "petstore schema",
    "schema_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "source": "<schema file bytes>",
    "validation_enabled": true
  },
  "success": true
}
```

## Delete a schema

**delete** `/zones/{zone_id}/api_gateway/user_schemas/{schema_id}`

Permanently removes an uploaded OpenAPI schema from API Shield schema validation. Operations using this schema will lose their validation rules.

### Path Parameters

- `zone_id: string`

  Identifier.

- `schema_id: string`

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/user_schemas/$SCHEMA_ID \
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
  "success": true
}
```

## Domain Types

### Message

- `Message = array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

### Old Public Schema

- `OldPublicSchema object { created_at, kind, name, 3 more }`

  - `created_at: string`

  - `kind: "openapi_v3"`

    Kind of schema

    - `"openapi_v3"`

  - `name: string`

    Name of the schema

  - `schema_id: string`

    UUID.

  - `source: optional string`

    Source of the schema

  - `validation_enabled: optional boolean`

    Flag whether schema is enabled for validation.

### User Schema Create Response

- `UserSchemaCreateResponse object { schema, upload_details }`

  - `schema: OldPublicSchema`

    - `created_at: string`

    - `kind: "openapi_v3"`

      Kind of schema

      - `"openapi_v3"`

    - `name: string`

      Name of the schema

    - `schema_id: string`

      UUID.

    - `source: optional string`

      Source of the schema

    - `validation_enabled: optional boolean`

      Flag whether schema is enabled for validation.

  - `upload_details: optional object { warnings }`

    - `warnings: optional array of object { code, locations, message }`

      Diagnostic warning events that occurred during processing. These events are non-critical errors found within the schema.

      - `code: number`

        Code that identifies the event that occurred.

      - `locations: optional array of string`

        JSONPath location(s) in the schema where these events were encountered.  See <https://goessner.net/articles/JsonPath/> for JSONPath specification.

      - `message: optional string`

        Diagnostic message that describes the event.

### User Schema Delete Response

- `UserSchemaDeleteResponse object { errors, messages, success }`

  - `errors: Message`

    - `code: number`

    - `message: string`

    - `documentation_url: optional string`

    - `source: optional object { pointer }`

      - `pointer: optional string`

  - `messages: Message`

  - `success: true`

    Whether the API call was successful.

    - `true`

# Operations

## Retrieve all operations from a schema.

**get** `/zones/{zone_id}/api_gateway/user_schemas/{schema_id}/operations`

Retrieves all operations from the schema. Operations that already exist in API Shield Endpoint Management will be returned as full operations.

### Path Parameters

- `zone_id: string`

  Identifier.

- `schema_id: string`

### Query Parameters

- `endpoint: optional string`

  Filter results to only include endpoints containing this pattern.

- `feature: optional array of "thresholds" or "parameter_schemas" or "schema_info"`

  Add feature(s) to the results. The feature name that is given here corresponds to the resulting feature object. Have a look at the top-level object description for more details on the specific meaning.

  - `"thresholds"`

  - `"parameter_schemas"`

  - `"schema_info"`

- `host: optional array of string`

  Filter results to only include the specified hosts.

- `method: optional array of string`

  Filter results to only include the specified HTTP methods.

- `operation_status: optional "new" or "existing"`

  Filter results by whether operations exist in API Shield Endpoint Management or not. `new` will just return operations from the schema that do not exist in API Shield Endpoint Management. `existing` will just return operations from the schema that already exist in API Shield Endpoint Management.

  - `"new"`

  - `"existing"`

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: array of object { endpoint, host, last_updated, 3 more }  or object { endpoint, host, method }`

  - `APIShieldOperation object { endpoint, host, last_updated, 3 more }`

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

    - `features: optional object { thresholds }  or object { parameter_schemas }  or object { api_routing }  or 2 more`

      - `APIShieldOperationFeatureThresholds object { thresholds }`

        - `thresholds: optional object { auth_id_tokens, data_points, last_updated, 6 more }`

          - `auth_id_tokens: optional number`

            The total number of auth-ids seen across this calculation.

          - `data_points: optional number`

            The number of data points used for the threshold suggestion calculation.

          - `last_updated: optional string`

          - `p50: optional number`

            The p50 quantile of requests (in period_seconds).

          - `p90: optional number`

            The p90 quantile of requests (in period_seconds).

          - `p99: optional number`

            The p99 quantile of requests (in period_seconds).

          - `period_seconds: optional number`

            The period over which this threshold is suggested.

          - `requests: optional number`

            The estimated number of requests covered by these calculations.

          - `suggested_threshold: optional number`

            The suggested threshold in requests done by the same auth_id or period_seconds.

      - `APIShieldOperationFeatureParameterSchemas object { parameter_schemas }`

        - `parameter_schemas: object { last_updated, parameter_schemas }`

          - `last_updated: optional string`

          - `parameter_schemas: optional object { parameters, responses }`

            An operation schema object containing a response.

            - `parameters: optional array of unknown`

              An array containing the learned parameter schemas.

            - `responses: optional unknown`

              An empty response object. This field is required to yield a valid operation schema.

      - `APIShieldOperationFeatureAPIRouting object { api_routing }`

        - `api_routing: optional object { last_updated, route }`

          API Routing settings on endpoint.

          - `last_updated: optional string`

          - `route: optional string`

            Target route.

      - `APIShieldOperationFeatureConfidenceIntervals object { confidence_intervals }`

        - `confidence_intervals: optional object { last_updated, suggested_threshold }`

          - `last_updated: optional string`

          - `suggested_threshold: optional object { confidence_intervals, mean }`

            - `confidence_intervals: optional object { p90, p95, p99 }`

              - `p90: optional object { lower, upper }`

                Upper and lower bound for percentile estimate

                - `lower: optional number`

                  Lower bound for percentile estimate

                - `upper: optional number`

                  Upper bound for percentile estimate

              - `p95: optional object { lower, upper }`

                Upper and lower bound for percentile estimate

                - `lower: optional number`

                  Lower bound for percentile estimate

                - `upper: optional number`

                  Upper bound for percentile estimate

              - `p99: optional object { lower, upper }`

                Upper and lower bound for percentile estimate

                - `lower: optional number`

                  Lower bound for percentile estimate

                - `upper: optional number`

                  Upper bound for percentile estimate

            - `mean: optional number`

              Suggested threshold.

      - `APIShieldOperationFeatureSchemaInfo object { schema_info }`

        - `schema_info: optional object { active_schema, learned_available, mitigation_action }`

          - `active_schema: optional object { id, created_at, is_learned, name }`

            Schema active on endpoint.

            - `id: optional string`

              UUID.

            - `created_at: optional string`

            - `is_learned: optional boolean`

              True if schema is Cloudflare-provided.

            - `name: optional string`

              Schema file name.

          - `learned_available: optional boolean`

            True if a Cloudflare-provided learned schema is available for this endpoint.

          - `mitigation_action: optional "none" or "log" or "block"`

            Action taken on requests failing validation.

            - `"none"`

            - `"log"`

            - `"block"`

  - `APIShieldBasicOperation object { endpoint, host, method }`

    - `endpoint: string`

      The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be Cloudflare-normalized upon insertion. See: https://developers.cloudflare.com/rules/normalization/how-it-works/.

    - `host: string`

      RFC3986-compliant host.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/user_schemas/$SCHEMA_ID/operations \
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
      "features": {
        "api_routing": {
          "last_updated": "2014-01-01T05:20:00.12345Z",
          "route": "https://api.example.com/api/service"
        }
      }
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

## Domain Types

### Operation List Response

- `OperationListResponse = object { endpoint, host, last_updated, 3 more }  or object { endpoint, host, method }`

  - `APIShieldOperation object { endpoint, host, last_updated, 3 more }`

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

    - `features: optional object { thresholds }  or object { parameter_schemas }  or object { api_routing }  or 2 more`

      - `APIShieldOperationFeatureThresholds object { thresholds }`

        - `thresholds: optional object { auth_id_tokens, data_points, last_updated, 6 more }`

          - `auth_id_tokens: optional number`

            The total number of auth-ids seen across this calculation.

          - `data_points: optional number`

            The number of data points used for the threshold suggestion calculation.

          - `last_updated: optional string`

          - `p50: optional number`

            The p50 quantile of requests (in period_seconds).

          - `p90: optional number`

            The p90 quantile of requests (in period_seconds).

          - `p99: optional number`

            The p99 quantile of requests (in period_seconds).

          - `period_seconds: optional number`

            The period over which this threshold is suggested.

          - `requests: optional number`

            The estimated number of requests covered by these calculations.

          - `suggested_threshold: optional number`

            The suggested threshold in requests done by the same auth_id or period_seconds.

      - `APIShieldOperationFeatureParameterSchemas object { parameter_schemas }`

        - `parameter_schemas: object { last_updated, parameter_schemas }`

          - `last_updated: optional string`

          - `parameter_schemas: optional object { parameters, responses }`

            An operation schema object containing a response.

            - `parameters: optional array of unknown`

              An array containing the learned parameter schemas.

            - `responses: optional unknown`

              An empty response object. This field is required to yield a valid operation schema.

      - `APIShieldOperationFeatureAPIRouting object { api_routing }`

        - `api_routing: optional object { last_updated, route }`

          API Routing settings on endpoint.

          - `last_updated: optional string`

          - `route: optional string`

            Target route.

      - `APIShieldOperationFeatureConfidenceIntervals object { confidence_intervals }`

        - `confidence_intervals: optional object { last_updated, suggested_threshold }`

          - `last_updated: optional string`

          - `suggested_threshold: optional object { confidence_intervals, mean }`

            - `confidence_intervals: optional object { p90, p95, p99 }`

              - `p90: optional object { lower, upper }`

                Upper and lower bound for percentile estimate

                - `lower: optional number`

                  Lower bound for percentile estimate

                - `upper: optional number`

                  Upper bound for percentile estimate

              - `p95: optional object { lower, upper }`

                Upper and lower bound for percentile estimate

                - `lower: optional number`

                  Lower bound for percentile estimate

                - `upper: optional number`

                  Upper bound for percentile estimate

              - `p99: optional object { lower, upper }`

                Upper and lower bound for percentile estimate

                - `lower: optional number`

                  Lower bound for percentile estimate

                - `upper: optional number`

                  Upper bound for percentile estimate

            - `mean: optional number`

              Suggested threshold.

      - `APIShieldOperationFeatureSchemaInfo object { schema_info }`

        - `schema_info: optional object { active_schema, learned_available, mitigation_action }`

          - `active_schema: optional object { id, created_at, is_learned, name }`

            Schema active on endpoint.

            - `id: optional string`

              UUID.

            - `created_at: optional string`

            - `is_learned: optional boolean`

              True if schema is Cloudflare-provided.

            - `name: optional string`

              Schema file name.

          - `learned_available: optional boolean`

            True if a Cloudflare-provided learned schema is available for this endpoint.

          - `mitigation_action: optional "none" or "log" or "block"`

            Action taken on requests failing validation.

            - `"none"`

            - `"log"`

            - `"block"`

  - `APIShieldBasicOperation object { endpoint, host, method }`

    - `endpoint: string`

      The endpoint which can contain path parameter templates in curly braces, each will be replaced from left to right with {varN}, starting with {var1}, during insertion. This will further be Cloudflare-normalized upon insertion. See: https://developers.cloudflare.com/rules/normalization/how-it-works/.

    - `host: string`

      RFC3986-compliant host.

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

# Hosts

## Retrieve schema hosts in a zone

**get** `/zones/{zone_id}/api_gateway/user_schemas/hosts`

Lists all unique hosts found in uploaded OpenAPI schemas for the zone. Useful for understanding which domains have schema coverage.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional array of object { created_at, hosts, name, schema_id }`

  - `created_at: string`

  - `hosts: array of string`

    Hosts serving the schema, e.g zone.host.com

  - `name: string`

    Name of the schema

  - `schema_id: string`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/user_schemas/hosts \
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
      "hosts": [
        "string"
      ],
      "name": "petstore schema",
      "schema_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
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

## Domain Types

### Host List Response

- `HostListResponse object { created_at, hosts, name, schema_id }`

  - `created_at: string`

  - `hosts: array of string`

    Hosts serving the schema, e.g zone.host.com

  - `name: string`

    Name of the schema

  - `schema_id: string`

    UUID.

# Expression Template

# Fallthrough

## Generate fallthrough WAF expression template from a set of API hosts

**post** `/zones/{zone_id}/api_gateway/expression-template/fallthrough`

Creates an expression template fallthrough rule for API Shield. Used for configuring default behavior when no other expression templates match.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `hosts: array of string`

  List of hosts to be targeted in the expression

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { expression, title }`

  - `expression: string`

    WAF Expression for fallthrough

  - `title: string`

    Title for the expression

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/expression-template/fallthrough \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "hosts": [
            "{zone}.domain1.tld",
            "domain2.tld"
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
  "result": {
    "expression": "(cf.api_gateway.fallthrough_detected)",
    "title": "Fallthrough Expression for [zone.domain.tld]"
  },
  "success": true
}
```

## Domain Types

### Fallthrough Create Response

- `FallthroughCreateResponse object { expression, title }`

  - `expression: string`

    WAF Expression for fallthrough

  - `title: string`

    Title for the expression
