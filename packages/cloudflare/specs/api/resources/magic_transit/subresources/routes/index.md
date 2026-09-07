# Routes

## List Routes

**get** `/accounts/{account_id}/magic/routes`

List all Magic static routes.

### Path Parameters

- `account_id: string`

  Identifier

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

- `result: object { routes }`

  - `routes: optional array of object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/routes \
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
    "routes": [
      {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "nexthop": "203.0.113.1",
        "prefix": "192.0.2.0/24",
        "priority": 0,
        "created_on": "2017-06-14T00:00:00Z",
        "description": "New route for new prefix 203.0.113.1",
        "modified_on": "2017-06-14T05:20:00Z",
        "scope": {
          "colo_names": [
            "den01"
          ],
          "colo_regions": [
            "APAC"
          ]
        },
        "weight": 0
      }
    ]
  },
  "success": true
}
```

## Route Details

**get** `/accounts/{account_id}/magic/routes/{route_id}`

Get a specific Magic static route.

### Path Parameters

- `account_id: string`

  Identifier

- `route_id: string`

  Identifier

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

- `result: object { route }`

  - `route: optional object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/routes/$ROUTE_ID \
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
    "route": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "nexthop": "203.0.113.1",
      "prefix": "192.0.2.0/24",
      "priority": 0,
      "created_on": "2017-06-14T00:00:00Z",
      "description": "New route for new prefix 203.0.113.1",
      "modified_on": "2017-06-14T05:20:00Z",
      "scope": {
        "colo_names": [
          "den01"
        ],
        "colo_regions": [
          "APAC"
        ]
      },
      "weight": 0
    }
  },
  "success": true
}
```

## Create a Route

**post** `/accounts/{account_id}/magic/routes`

Creates a new Magic static route. Use `?validate_only=true` as an optional query parameter to run validation only without persisting changes.

### Path Parameters

- `account_id: string`

  Identifier

### Body Parameters

- `nexthop: string`

  The next-hop IP Address for the static route.

- `prefix: string`

  IP Prefix in Classless Inter-Domain Routing format.

- `priority: number`

  Priority of the static route.

- `description: optional string`

  An optional human provided description of the static route.

- `scope: optional Scope`

  Used only for ECMP routes.

  - `colo_names: optional array of string`

    List of colo names for the ECMP scope.

  - `colo_regions: optional array of string`

    List of colo regions for the ECMP scope.

- `weight: optional number`

  Optional weight of the ECMP scope - if provided.

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

- `result: object { id, nexthop, prefix, 6 more }`

  - `id: string`

    Identifier

  - `nexthop: string`

    The next-hop IP Address for the static route.

  - `prefix: string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `priority: number`

    Priority of the static route.

  - `created_on: optional string`

    When the route was created.

  - `description: optional string`

    An optional human provided description of the static route.

  - `modified_on: optional string`

    When the route was last modified.

  - `scope: optional Scope`

    Used only for ECMP routes.

    - `colo_names: optional array of string`

      List of colo names for the ECMP scope.

    - `colo_regions: optional array of string`

      List of colo regions for the ECMP scope.

  - `weight: optional number`

    Optional weight of the ECMP scope - if provided.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/routes \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "nexthop": "203.0.113.1",
          "prefix": "192.0.2.0/24",
          "priority": 0,
          "description": "New route for new prefix 203.0.113.1"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "nexthop": "203.0.113.1",
    "prefix": "192.0.2.0/24",
    "priority": 0,
    "created_on": "2017-06-14T00:00:00Z",
    "description": "New route for new prefix 203.0.113.1",
    "modified_on": "2017-06-14T05:20:00Z",
    "scope": {
      "colo_names": [
        "den01"
      ],
      "colo_regions": [
        "APAC"
      ]
    },
    "weight": 0
  },
  "success": true
}
```

## Update Route

**put** `/accounts/{account_id}/magic/routes/{route_id}`

Update a specific Magic static route. Use `?validate_only=true` as an optional query parameter to run validation only without persisting changes.

### Path Parameters

- `account_id: string`

  Identifier

- `route_id: string`

  Identifier

### Body Parameters

- `nexthop: string`

  The next-hop IP Address for the static route.

- `prefix: string`

  IP Prefix in Classless Inter-Domain Routing format.

- `priority: number`

  Priority of the static route.

- `description: optional string`

  An optional human provided description of the static route.

- `scope: optional Scope`

  Used only for ECMP routes.

  - `colo_names: optional array of string`

    List of colo names for the ECMP scope.

  - `colo_regions: optional array of string`

    List of colo regions for the ECMP scope.

- `weight: optional number`

  Optional weight of the ECMP scope - if provided.

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

- `result: object { modified, modified_route }`

  - `modified: optional boolean`

  - `modified_route: optional object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/routes/$ROUTE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "nexthop": "203.0.113.1",
          "prefix": "192.0.2.0/24",
          "priority": 0,
          "description": "New route for new prefix 203.0.113.1"
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
    "modified": true,
    "modified_route": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "nexthop": "203.0.113.1",
      "prefix": "192.0.2.0/24",
      "priority": 0,
      "created_on": "2017-06-14T00:00:00Z",
      "description": "New route for new prefix 203.0.113.1",
      "modified_on": "2017-06-14T05:20:00Z",
      "scope": {
        "colo_names": [
          "den01"
        ],
        "colo_regions": [
          "APAC"
        ]
      },
      "weight": 0
    }
  },
  "success": true
}
```

## Delete Route

**delete** `/accounts/{account_id}/magic/routes/{route_id}`

Disable and remove a specific Magic static route.

### Path Parameters

- `account_id: string`

  Identifier

- `route_id: string`

  Identifier

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

- `result: object { deleted, deleted_route }`

  - `deleted: optional boolean`

  - `deleted_route: optional object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/routes/$ROUTE_ID \
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
    "deleted": true,
    "deleted_route": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "nexthop": "203.0.113.1",
      "prefix": "192.0.2.0/24",
      "priority": 0,
      "created_on": "2017-06-14T00:00:00Z",
      "description": "New route for new prefix 203.0.113.1",
      "modified_on": "2017-06-14T05:20:00Z",
      "scope": {
        "colo_names": [
          "den01"
        ],
        "colo_regions": [
          "APAC"
        ]
      },
      "weight": 0
    }
  },
  "success": true
}
```

## Update Many Routes

**put** `/accounts/{account_id}/magic/routes`

Update multiple Magic static routes. Use `?validate_only=true` as an optional query parameter to run validation only without persisting changes. Only fields for a route that need to be changed need be provided.

### Path Parameters

- `account_id: string`

  Identifier

### Body Parameters

- `routes: array of object { id, nexthop, prefix, 4 more }`

  - `id: string`

    Identifier

  - `nexthop: string`

    The next-hop IP Address for the static route.

  - `prefix: string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `priority: number`

    Priority of the static route.

  - `description: optional string`

    An optional human provided description of the static route.

  - `scope: optional Scope`

    Used only for ECMP routes.

    - `colo_names: optional array of string`

      List of colo names for the ECMP scope.

    - `colo_regions: optional array of string`

      List of colo regions for the ECMP scope.

  - `weight: optional number`

    Optional weight of the ECMP scope - if provided.

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

- `result: object { modified, modified_routes }`

  - `modified: optional boolean`

  - `modified_routes: optional array of object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/routes \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "routes": [
            {
              "id": "023e105f4ecef8ad9ca31a8372d0c353",
              "nexthop": "203.0.113.1",
              "prefix": "192.0.2.0/24",
              "priority": 0
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
    "modified": true,
    "modified_routes": [
      {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "nexthop": "203.0.113.1",
        "prefix": "192.0.2.0/24",
        "priority": 0,
        "created_on": "2017-06-14T00:00:00Z",
        "description": "New route for new prefix 203.0.113.1",
        "modified_on": "2017-06-14T05:20:00Z",
        "scope": {
          "colo_names": [
            "den01"
          ],
          "colo_regions": [
            "APAC"
          ]
        },
        "weight": 0
      }
    ]
  },
  "success": true
}
```

## Delete Many Routes

**delete** `/accounts/{account_id}/magic/routes`

Delete multiple Magic static routes.

### Path Parameters

- `account_id: string`

  Identifier

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

- `result: object { deleted, deleted_routes }`

  - `deleted: optional boolean`

  - `deleted_routes: optional array of object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/routes \
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
    "deleted": true,
    "deleted_routes": [
      {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "nexthop": "203.0.113.1",
        "prefix": "192.0.2.0/24",
        "priority": 0,
        "created_on": "2017-06-14T00:00:00Z",
        "description": "New route for new prefix 203.0.113.1",
        "modified_on": "2017-06-14T05:20:00Z",
        "scope": {
          "colo_names": [
            "den01"
          ],
          "colo_regions": [
            "APAC"
          ]
        },
        "weight": 0
      }
    ]
  },
  "success": true
}
```

## Domain Types

### Scope

- `Scope object { colo_names, colo_regions }`

  Used only for ECMP routes.

  - `colo_names: optional array of string`

    List of colo names for the ECMP scope.

  - `colo_regions: optional array of string`

    List of colo regions for the ECMP scope.

### Route List Response

- `RouteListResponse object { routes }`

  - `routes: optional array of object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

### Route Get Response

- `RouteGetResponse object { route }`

  - `route: optional object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

### Route Create Response

- `RouteCreateResponse object { id, nexthop, prefix, 6 more }`

  - `id: string`

    Identifier

  - `nexthop: string`

    The next-hop IP Address for the static route.

  - `prefix: string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `priority: number`

    Priority of the static route.

  - `created_on: optional string`

    When the route was created.

  - `description: optional string`

    An optional human provided description of the static route.

  - `modified_on: optional string`

    When the route was last modified.

  - `scope: optional Scope`

    Used only for ECMP routes.

    - `colo_names: optional array of string`

      List of colo names for the ECMP scope.

    - `colo_regions: optional array of string`

      List of colo regions for the ECMP scope.

  - `weight: optional number`

    Optional weight of the ECMP scope - if provided.

### Route Update Response

- `RouteUpdateResponse object { modified, modified_route }`

  - `modified: optional boolean`

  - `modified_route: optional object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

### Route Delete Response

- `RouteDeleteResponse object { deleted, deleted_route }`

  - `deleted: optional boolean`

  - `deleted_route: optional object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

### Route Bulk Update Response

- `RouteBulkUpdateResponse object { modified, modified_routes }`

  - `modified: optional boolean`

  - `modified_routes: optional array of object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

### Route Empty Response

- `RouteEmptyResponse object { deleted, deleted_routes }`

  - `deleted: optional boolean`

  - `deleted_routes: optional array of object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.
