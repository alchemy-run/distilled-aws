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
