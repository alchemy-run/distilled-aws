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
