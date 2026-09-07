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
