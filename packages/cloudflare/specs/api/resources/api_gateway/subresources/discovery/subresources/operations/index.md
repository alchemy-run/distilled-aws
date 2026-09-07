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
