## Create a sharable link to a query result

**post** `/accounts/{account_id}/workers/observability/shared/query`

Shared queries store the results of a previously run query, allowing you to share the results with others.

### Path Parameters

- `account_id: string`

### Body Parameters

- `queryId: string`

  Identifier for the query. When parameters are omitted, this ID is used to load a previously saved query's parameters. When providing parameters inline, pass any identifier (e.g. an ad-hoc ID).

- `timeframe: object { from, to }`

  Timeframe for the query using Unix timestamps in milliseconds. Narrower timeframes produce faster responses and more specific results.

  - `from: number`

    Start timestamp for the query timeframe (Unix timestamp in milliseconds)

  - `to: number`

    End timestamp for the query timeframe (Unix timestamp in milliseconds)

- `chart: optional boolean`

  When true, includes time-series data in the response.

- `compare: optional boolean`

  When true, includes a comparison dataset from the previous time period of equal length.

- `dry: optional boolean`

  When true, executes the query without persisting the results. Useful for validation or previewing.

- `granularity: optional number`

  Number of time-series buckets. Only used when view is 'calculations'. Omit to let the system auto-detect an appropriate granularity.

- `ignoreSeries: optional boolean`

  When true, omits time-series data from the response and returns only aggregated values. Reduces response size when series are not needed.

- `limit: optional number`

  Maximum number of events to return when view is 'events'. Also controls the number of group-by rows when view is 'calculations'.

- `offset: optional string`

  Cursor for pagination in event, trace, and invocation views. Pass the $metadata.id of the last returned item to fetch the next page.

- `offsetBy: optional number`

  Numeric offset for paginating grouped/pattern results (top-N lists). Use together with limit. Not used by cursor-based pagination.

- `offsetDirection: optional string`

  Pagination direction: 'next' for forward, 'prev' for backward.

- `parameters: optional object { calculations, datasets, filterCombination, 6 more }`

  Query parameters defining what data to retrieve — filters, calculations, group-bys, and ordering. In practice this should always be provided for ad-hoc queries. Only omit when executing a previously saved query by queryId. Use the keys and values endpoints to discover available fields before building filters.

  - `calculations: optional array of object { operator, alias, key, keyType }`

    Aggregation calculations to compute (e.g. count, avg, p99). Each calculation produces aggregate values and optional time-series data.

    - `operator: "uniq" or "count" or "max" or 35 more`

      Aggregation operator to apply. Examples: count, avg, sum, min, max, median, p90, p95, p99, uniq, stddev, variance.

      - `"uniq"`

      - `"count"`

      - `"max"`

      - `"min"`

      - `"sum"`

      - `"avg"`

      - `"median"`

      - `"p001"`

      - `"p01"`

      - `"p05"`

      - `"p10"`

      - `"p25"`

      - `"p75"`

      - `"p90"`

      - `"p95"`

      - `"p99"`

      - `"p999"`

      - `"stddev"`

      - `"variance"`

      - `"COUNT_DISTINCT"`

      - `"COUNT"`

      - `"MAX"`

      - `"MIN"`

      - `"SUM"`

      - `"AVG"`

      - `"MEDIAN"`

      - `"P001"`

      - `"P01"`

      - `"P05"`

      - `"P10"`

      - `"P25"`

      - `"P75"`

      - `"P90"`

      - `"P95"`

      - `"P99"`

      - `"P999"`

      - `"STDDEV"`

      - `"VARIANCE"`

    - `alias: optional string`

      Custom label for this calculation in the results. Useful for distinguishing multiple calculations.

    - `key: optional string`

      Field name to calculate over. Must exist in the data — verify with the keys endpoint. Omit for operators that don't require a key (e.g. count).

    - `keyType: optional "string" or "number" or "boolean"`

      Data type of the key. Required when key is provided to ensure correct aggregation.

      - `"string"`

      - `"number"`

      - `"boolean"`

  - `datasets: optional array of string`

    Datasets to query. Leave empty to query all available datasets.

  - `filterCombination: optional "and" or "or" or "AND" or "OR"`

    Logical operator for combining top-level filters: 'and' (all must match) or 'or' (any must match). Defaults to 'and'.

    - `"and"`

    - `"or"`

    - `"AND"`

    - `"OR"`

  - `filters: optional array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

    Filters to narrow query results. Use the keys and values endpoints to discover available fields before building filters. Supports nested groups via kind: 'group'. Maximum nesting depth is 4.

    - `object { filterCombination, filters, kind }`

      - `filterCombination: "and" or "or" or "AND" or "OR"`

        - `"and"`

        - `"or"`

        - `"AND"`

        - `"OR"`

      - `filters: array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

        - `object { filterCombination, filters, kind }`

          - `filterCombination: "and" or "or" or "AND" or "OR"`

            - `"and"`

            - `"or"`

            - `"AND"`

            - `"OR"`

          - `filters: array of unknown`

          - `kind: "group"`

            - `"group"`

        - `WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }`

          A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

          - `key: string`

            Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

          - `operation: "includes" or "not_includes" or "starts_with" or 27 more`

            Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

            - `"includes"`

            - `"not_includes"`

            - `"starts_with"`

            - `"ends_with"`

            - `"regex"`

            - `"exists"`

            - `"is_null"`

            - `"in"`

            - `"not_in"`

            - `"eq"`

            - `"neq"`

            - `"gt"`

            - `"gte"`

            - `"lt"`

            - `"lte"`

            - `"="`

            - `"!="`

            - `">"`

            - `">="`

            - `"<"`

            - `"<="`

            - `"INCLUDES"`

            - `"DOES_NOT_INCLUDE"`

            - `"MATCH_REGEX"`

            - `"EXISTS"`

            - `"DOES_NOT_EXIST"`

            - `"IN"`

            - `"NOT_IN"`

            - `"STARTS_WITH"`

            - `"ENDS_WITH"`

          - `type: "string" or "number" or "boolean"`

            Data type of the filter field. Must match the actual type of the key being filtered.

            - `"string"`

            - `"number"`

            - `"boolean"`

          - `kind: optional "filter"`

            Discriminator for leaf filter nodes. Always 'filter' when present; may be omitted.

            - `"filter"`

          - `value: optional string or number or boolean`

            Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

            - `string`

            - `number`

            - `boolean`

      - `kind: "group"`

        - `"group"`

    - `WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }`

      A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

      - `key: string`

        Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

      - `operation: "includes" or "not_includes" or "starts_with" or 27 more`

        Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

        - `"includes"`

        - `"not_includes"`

        - `"starts_with"`

        - `"ends_with"`

        - `"regex"`

        - `"exists"`

        - `"is_null"`

        - `"in"`

        - `"not_in"`

        - `"eq"`

        - `"neq"`

        - `"gt"`

        - `"gte"`

        - `"lt"`

        - `"lte"`

        - `"="`

        - `"!="`

        - `">"`

        - `">="`

        - `"<"`

        - `"<="`

        - `"INCLUDES"`

        - `"DOES_NOT_INCLUDE"`

        - `"MATCH_REGEX"`

        - `"EXISTS"`

        - `"DOES_NOT_EXIST"`

        - `"IN"`

        - `"NOT_IN"`

        - `"STARTS_WITH"`

        - `"ENDS_WITH"`

      - `type: "string" or "number" or "boolean"`

        Data type of the filter field. Must match the actual type of the key being filtered.

        - `"string"`

        - `"number"`

        - `"boolean"`

      - `kind: optional "filter"`

        Discriminator for leaf filter nodes. Always 'filter' when present; may be omitted.

        - `"filter"`

      - `value: optional string or number or boolean`

        Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

        - `string`

        - `number`

        - `boolean`

  - `groupBys: optional array of object { type, value }`

    Fields to group calculation results by. Only applicable when the query view is 'calculations'. Produces per-group aggregate values.

    - `type: "string" or "number" or "boolean"`

      Data type of the group-by field.

      - `"string"`

      - `"number"`

      - `"boolean"`

    - `value: string`

      Field name to group results by (e.g. $metadata.service, $metadata.statusCode).

  - `havings: optional array of object { key, operation, value }`

    Post-aggregation filters applied to calculation results. Use to filter groups after aggregation (e.g. only groups where count > 100).

    - `key: string`

      Calculation alias or operator to filter on after aggregation.

    - `operation: "eq" or "neq" or "gt" or 3 more`

      Numeric comparison operator: eq, neq, gt, gte, lt, lte.

      - `"eq"`

      - `"neq"`

      - `"gt"`

      - `"gte"`

      - `"lt"`

      - `"lte"`

    - `value: number`

      Threshold value to compare the calculation result against.

  - `limit: optional number`

    Maximum number of group-by rows to return in calculation results. A value of 10 is a sensible default for most use cases.

  - `needle: optional object { value, isRegex, matchCase }`

    Full-text search expression applied across all event fields. Matches events containing the specified text.

    - `value: string or number or boolean`

      The text or pattern to search for.

      - `string`

      - `number`

      - `boolean`

    - `isRegex: optional boolean`

      When true, treats the value as a regular expression (RE2 syntax).

    - `matchCase: optional boolean`

      When true, performs a case-sensitive search. Defaults to case-insensitive.

  - `orderBy: optional object { value, order }`

    Ordering for grouped calculation results. Only effective when a group-by is present.

    - `value: string`

      Alias of the calculation to order results by. Must match the alias (or operator) of a calculation in the query.

    - `order: optional "asc" or "desc"`

      Sort direction: 'asc' for ascending, 'desc' for descending.

      - `"asc"`

      - `"desc"`

- `view: optional "traces" or "events" or "calculations" or 3 more`

  Controls the shape of the response. 'events': individual log lines matching the query. 'calculations': aggregated metrics (count, avg, p99, etc.) with optional group-by breakdowns and time-series. 'invocations': events grouped by request ID. 'traces': distributed trace summaries. 'agents': Durable Object agent summaries.

  - `"traces"`

  - `"events"`

  - `"calculations"`

  - `"invocations"`

  - `"requests"`

  - `"agents"`

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: "Successful request"`

    - `"Successful request"`

- `result: object { id }`

  - `id: string`

    Specify the ID of the shared query.

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/shared/query \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "queryId": "queryId",
          "timeframe": {
            "from": 0,
            "to": 0
          }
        }'
```

#### Response

```json
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "Successful request"
    }
  ],
  "result": {
    "id": "id"
  },
  "success": true
}
```
