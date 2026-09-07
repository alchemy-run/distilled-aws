## Run a query

**post** `/accounts/{account_id}/workers/observability/telemetry/query`

Run a temporary or saved query.

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

- `result: object { run, statistics, agents, 5 more }`

  Complete results of a query run. The populated fields depend on the requested view type (events, calculations, invocations, traces, or agents).

  - `run: object { id, accountId, dry, 8 more }`

    Represents a single execution of a query against Workers Observability data, including the query definition, execution status, and performance statistics.

    - `id: string`

      Unique identifier for this query run.

    - `accountId: string`

      Cloudflare account ID that owns this query run.

    - `dry: boolean`

      Whether this was a dry run (results not persisted).

    - `granularity: number`

      Number of time-series buckets used for the query. Higher values produce more detailed series data.

    - `query: object { id, adhoc, created, 6 more }`

      A saved query definition with its parameters, metadata, and ownership information.

      - `id: string`

      - `adhoc: boolean`

        If the query wasn't explcitly saved

      - `created: string`

      - `createdBy: string`

      - `description: string`

      - `name: string`

        Query name

      - `parameters: object { calculations, datasets, filterCombination, 6 more }`

        - `calculations: optional array of object { operator, alias, key, keyType }`

          Create Calculations to compute as part of the query.

          - `operator: "uniq" or "count" or "max" or 35 more`

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

          - `key: optional string`

          - `keyType: optional "string" or "number" or "boolean"`

            - `"string"`

            - `"number"`

            - `"boolean"`

        - `datasets: optional array of string`

          Set the Datasets to query. Leave it empty to query all the datasets.

        - `filterCombination: optional "and" or "or" or "AND" or "OR"`

          Set a Flag to describe how to combine the filters on the query.

          - `"and"`

          - `"or"`

          - `"AND"`

          - `"OR"`

        - `filters: optional array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

          Configure the Filters to apply to the query. Supports nested groups via kind: 'group'.

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

        - `groupBys: optional array of object { type, value }`

          Define how to group the results of the query.

          - `type: "string" or "number" or "boolean"`

            - `"string"`

            - `"number"`

            - `"boolean"`

          - `value: string`

        - `havings: optional array of object { key, operation, value }`

          Configure the Having clauses that filter on calculations in the query result.

          - `key: string`

          - `operation: "eq" or "neq" or "gt" or 3 more`

            - `"eq"`

            - `"neq"`

            - `"gt"`

            - `"gte"`

            - `"lt"`

            - `"lte"`

          - `value: number`

        - `limit: optional number`

          Set a limit on the number of results / records returned by the query

        - `needle: optional object { value, isRegex, matchCase }`

          Define an expression to search using full-text search.

          - `value:`

          - `isRegex: optional boolean`

          - `matchCase: optional boolean`

        - `orderBy: optional object { value, order }`

          Configure the order of the results returned by the query.

          - `value: string`

            Configure which Calculation to order the results by.

          - `order: optional "asc" or "desc"`

            Set the order of the results

            - `"asc"`

            - `"desc"`

      - `updated: string`

      - `updatedBy: string`

    - `status: "STARTED" or "COMPLETED"`

      Current execution status of the query run.

      - `"STARTED"`

      - `"COMPLETED"`

    - `timeframe: object { from, to }`

      Time range for the query execution

      - `from: number`

        Start timestamp for the query timeframe (Unix timestamp in milliseconds)

      - `to: number`

        End timestamp for the query timeframe (Unix timestamp in milliseconds)

    - `userId: string`

      ID of the user who initiated the query run.

    - `created: optional string`

      ISO-8601 timestamp when the query run was created.

    - `statistics: optional object { bytes_read, elapsed, rows_read, abr_level }`

      Query performance statistics from the database (does not include network latency).

      - `bytes_read: number`

        Number of uncompressed bytes read from the table.

      - `elapsed: number`

        Time in seconds for the query to run.

      - `rows_read: number`

        Number of rows scanned from the table.

      - `abr_level: optional number`

        The level of Adaptive Bit Rate (ABR) sampling used for the query. If empty the ABR level is 1

    - `updated: optional string`

      ISO-8601 timestamp when the query run was last updated.

  - `statistics: object { bytes_read, elapsed, rows_read, abr_level }`

    Query performance statistics from the database. Includes execution time, rows scanned, and bytes read. Does not include network latency.

    - `bytes_read: number`

      Number of uncompressed bytes read from the table.

    - `elapsed: number`

      Time in seconds for the query to run.

    - `rows_read: number`

      Number of rows scanned from the table.

    - `abr_level: optional number`

      The level of Adaptive Bit Rate (ABR) sampling used for the query. If empty the ABR level is 1

  - `agents: optional array of object { agentClass, eventTypeCounts, firstEventMs, 5 more }`

    Durable Object agent summaries. Present when the query view is 'agents'. Each entry represents an agent with its event counts and status.

    - `agentClass: string`

      Class name of the Durable Object agent.

    - `eventTypeCounts: map[number]`

      Breakdown of event counts by event type.

    - `firstEventMs: number`

      Timestamp of the earliest event from this agent in the queried window (Unix epoch ms).

    - `hasErrors: boolean`

      Whether the agent emitted any error events in the queried window.

    - `lastEventMs: number`

      Timestamp of the most recent event from this agent (Unix epoch ms).

    - `namespace: string`

      Durable Object namespace the agent belongs to.

    - `service: string`

      Worker service name that hosts this agent.

    - `totalEvents: number`

      Total number of events emitted by this agent in the queried window.

  - `calculations: optional array of object { aggregates, calculation, series, alias }`

    Aggregated calculation results. Present when the query view is 'calculations'. Contains computed metrics (count, avg, p99, etc.) with optional group-by breakdowns and time-series data.

    - `aggregates: array of object { count, interval, sampleInterval, 2 more }`

      - `count: number`

      - `interval: number`

      - `sampleInterval: number`

      - `value: number`

      - `groups: optional array of object { key, value }`

        - `key: string`

        - `value: string or number or boolean`

          - `string`

          - `number`

          - `boolean`

    - `calculation: string`

    - `series: array of object { data, time }`

      - `data: array of object { count, interval, sampleInterval, 4 more }`

        - `count: number`

        - `interval: number`

        - `sampleInterval: number`

        - `value: number`

        - `firstSeen: optional string`

        - `groups: optional array of object { key, value }`

          - `key: string`

          - `value: string or number or boolean`

            - `string`

            - `number`

            - `boolean`

        - `lastSeen: optional string`

      - `time: string`

    - `alias: optional string`

  - `compare: optional array of object { aggregates, calculation, series, alias }`

    Comparison calculation results from the previous time period. Present when the compare option is enabled. Same structure as calculations.

    - `aggregates: array of object { count, interval, sampleInterval, 2 more }`

      - `count: number`

      - `interval: number`

      - `sampleInterval: number`

      - `value: number`

      - `groups: optional array of object { key, value }`

        - `key: string`

        - `value: string or number or boolean`

          - `string`

          - `number`

          - `boolean`

    - `calculation: string`

    - `series: array of object { data, time }`

      - `data: array of object { count, interval, sampleInterval, 4 more }`

        - `count: number`

        - `interval: number`

        - `sampleInterval: number`

        - `value: number`

        - `firstSeen: optional string`

        - `groups: optional array of object { key, value }`

          - `key: string`

          - `value: string or number or boolean`

            - `string`

            - `number`

            - `boolean`

        - `lastSeen: optional string`

      - `time: string`

    - `alias: optional string`

  - `events: optional object { count, events, fields, series }`

    Individual event results. Present when the query view is 'events'. Contains the matching log lines and their metadata.

    - `count: optional number`

      Total number of events matching the query (may exceed the number returned due to limits).

    - `events: optional array of object { "$metadata", dataset, source, 3 more }`

      List of individual telemetry events matching the query.

      - `"$metadata": object { id, account, cloudService, 28 more }`

        Structured metadata extracted from the event. These fields are indexed and available for filtering and aggregation.

        - `id: string`

          Unique event ID. Use as the cursor value for offset-based pagination.

        - `account: optional string`

          Cloudflare account identifier.

        - `cloudService: optional string`

          Cloudflare product that generated this event (e.g. workers, pages).

        - `coldStart: optional number`

        - `cost: optional number`

          Estimated cost units for this invocation.

        - `duration: optional number`

          Span duration in milliseconds.

        - `endTime: optional number`

          Span end time as a Unix epoch in milliseconds.

        - `error: optional string`

          Error message, present when the log represents an error.

        - `errorTemplate: optional string`

          Templatized version of the error message used for grouping similar errors.

        - `fingerprint: optional string`

          Content-based fingerprint used to group similar events.

        - `level: optional string`

          Log level (e.g. log, debug, info, warn, error).

        - `message: optional string`

          Log message text.

        - `messageTemplate: optional string`

          Templatized version of the log message used for grouping similar messages.

        - `metricName: optional string`

          Metric name when the event represents a metric data point.

        - `origin: optional string`

          Origin of the event (e.g. fetch, scheduled, queue).

        - `parentSpanId: optional string`

          Span ID of the parent span in the trace hierarchy.

        - `provider: optional string`

          Infrastructure provider identifier.

        - `region: optional string`

          Cloudflare data center / region that handled the request.

        - `requestId: optional string`

          Cloudflare request ID that ties all logs from a single invocation together.

        - `service: optional string`

          Worker script name that produced this event.

        - `spanId: optional string`

          Span ID for this individual unit of work within a trace.

        - `spanName: optional string`

          Human-readable name for this span.

        - `stackId: optional string`

          Stack / deployment identifier.

        - `startTime: optional number`

          Span start time as a Unix epoch in milliseconds.

        - `statusCode: optional number`

          HTTP response status code returned by the Worker.

        - `traceDuration: optional number`

          Total duration of the entire trace in milliseconds.

        - `traceId: optional string`

          Distributed trace ID linking spans across services.

        - `transactionName: optional string`

          Logical transaction name for this request.

        - `trigger: optional string`

          What triggered the invocation (e.g. GET /users, POST /orders, queue message).

        - `type: optional string`

          Event type classifier (e.g. cf-worker-event, cf-worker-log).

        - `url: optional string`

          Request URL that triggered the Worker invocation.

      - `dataset: string`

        The dataset this event belongs to (e.g. cloudflare-workers).

      - `source: string or map[unknown]`

        Raw log payload. May be a string or a structured object depending on how the log was emitted.

        - `string`

        - `map[unknown]`

      - `timestamp: number`

        Event timestamp as a Unix epoch in milliseconds.

      - `"$containers": optional map[unknown]`

        Cloudflare Containers event information that enriches your logs for identifying and debugging issues.

      - `"$workers": optional object { eventType, requestId, scriptName, 10 more }  or object { cpuTimeMs, eventType, outcome, 14 more }`

        Cloudflare Workers event information that enriches your logs for identifying and debugging issues.

        - `object { eventType, requestId, scriptName, 10 more }`

          - `eventType: "fetch" or "scheduled" or "alarm" or 9 more`

            - `"fetch"`

            - `"scheduled"`

            - `"alarm"`

            - `"cron"`

            - `"queue"`

            - `"email"`

            - `"tail"`

            - `"rpc"`

            - `"jsrpc"`

            - `"websocket"`

            - `"workflow"`

            - `"unknown"`

          - `requestId: string`

          - `scriptName: string`

          - `durableObjectId: optional string`

          - `entrypoint: optional string`

          - `event: optional map[unknown]`

          - `executionModel: optional "durableObject" or "stateless"`

            - `"durableObject"`

            - `"stateless"`

          - `outcome: optional string`

          - `preview: optional object { id, name, slug }`

            - `id: optional string`

            - `name: optional string`

            - `slug: optional string`

          - `scriptVersion: optional object { id, message, tag }`

            - `id: optional string`

            - `message: optional string`

            - `tag: optional string`

          - `spanId: optional string`

          - `traceId: optional string`

          - `truncated: optional boolean`

        - `object { cpuTimeMs, eventType, outcome, 14 more }`

          - `cpuTimeMs: number`

          - `eventType: "fetch" or "scheduled" or "alarm" or 9 more`

            - `"fetch"`

            - `"scheduled"`

            - `"alarm"`

            - `"cron"`

            - `"queue"`

            - `"email"`

            - `"tail"`

            - `"rpc"`

            - `"jsrpc"`

            - `"websocket"`

            - `"workflow"`

            - `"unknown"`

          - `outcome: string`

          - `requestId: string`

          - `scriptName: string`

          - `wallTimeMs: number`

          - `diagnosticsChannelEvents: optional array of object { channel, message, timestamp }`

            - `channel: string`

            - `message: string`

            - `timestamp: number`

          - `dispatchNamespace: optional string`

          - `durableObjectId: optional string`

          - `entrypoint: optional string`

          - `event: optional map[unknown]`

          - `executionModel: optional "durableObject" or "stateless"`

            - `"durableObject"`

            - `"stateless"`

          - `preview: optional object { id, name, slug }`

            - `id: optional string`

            - `name: optional string`

            - `slug: optional string`

          - `scriptVersion: optional object { id, message, tag }`

            - `id: optional string`

            - `message: optional string`

            - `tag: optional string`

          - `spanId: optional string`

          - `traceId: optional string`

          - `truncated: optional boolean`

    - `fields: optional array of object { key, type }`

      List of fields discovered in the matched events. Useful for building dynamic UIs.

      - `key: string`

        Field name present in the matched events.

      - `type: string`

        Data type of the field (string, number, or boolean).

    - `series: optional array of object { data, time }`

      Time-series data for the matched events, bucketed by the query granularity.

      - `data: array of object { aggregates, count, interval, 3 more }`

        - `aggregates: object { _count, _interval, _firstSeen, 2 more }`

          - `_count: number`

          - `_interval: number`

          - `_firstSeen: optional string`

          - `_lastSeen: optional string`

          - `bin: optional unknown`

        - `count: number`

        - `interval: number`

        - `sampleInterval: number`

        - `errors: optional number`

        - `groups: optional map[string or number or boolean]`

          Groups in the query results.

          - `string`

          - `number`

          - `boolean`

      - `time: string`

  - `invocations: optional map[array of object { "$metadata", dataset, source, 3 more } ]`

    Events grouped by invocation (request ID). Present when the query view is 'invocations'. Each key is a request ID mapping to all events from that invocation.

    - `"$metadata": object { id, account, cloudService, 28 more }`

      Structured metadata extracted from the event. These fields are indexed and available for filtering and aggregation.

      - `id: string`

        Unique event ID. Use as the cursor value for offset-based pagination.

      - `account: optional string`

        Cloudflare account identifier.

      - `cloudService: optional string`

        Cloudflare product that generated this event (e.g. workers, pages).

      - `coldStart: optional number`

      - `cost: optional number`

        Estimated cost units for this invocation.

      - `duration: optional number`

        Span duration in milliseconds.

      - `endTime: optional number`

        Span end time as a Unix epoch in milliseconds.

      - `error: optional string`

        Error message, present when the log represents an error.

      - `errorTemplate: optional string`

        Templatized version of the error message used for grouping similar errors.

      - `fingerprint: optional string`

        Content-based fingerprint used to group similar events.

      - `level: optional string`

        Log level (e.g. log, debug, info, warn, error).

      - `message: optional string`

        Log message text.

      - `messageTemplate: optional string`

        Templatized version of the log message used for grouping similar messages.

      - `metricName: optional string`

        Metric name when the event represents a metric data point.

      - `origin: optional string`

        Origin of the event (e.g. fetch, scheduled, queue).

      - `parentSpanId: optional string`

        Span ID of the parent span in the trace hierarchy.

      - `provider: optional string`

        Infrastructure provider identifier.

      - `region: optional string`

        Cloudflare data center / region that handled the request.

      - `requestId: optional string`

        Cloudflare request ID that ties all logs from a single invocation together.

      - `service: optional string`

        Worker script name that produced this event.

      - `spanId: optional string`

        Span ID for this individual unit of work within a trace.

      - `spanName: optional string`

        Human-readable name for this span.

      - `stackId: optional string`

        Stack / deployment identifier.

      - `startTime: optional number`

        Span start time as a Unix epoch in milliseconds.

      - `statusCode: optional number`

        HTTP response status code returned by the Worker.

      - `traceDuration: optional number`

        Total duration of the entire trace in milliseconds.

      - `traceId: optional string`

        Distributed trace ID linking spans across services.

      - `transactionName: optional string`

        Logical transaction name for this request.

      - `trigger: optional string`

        What triggered the invocation (e.g. GET /users, POST /orders, queue message).

      - `type: optional string`

        Event type classifier (e.g. cf-worker-event, cf-worker-log).

      - `url: optional string`

        Request URL that triggered the Worker invocation.

    - `dataset: string`

      The dataset this event belongs to (e.g. cloudflare-workers).

    - `source: string or map[unknown]`

      Raw log payload. May be a string or a structured object depending on how the log was emitted.

      - `string`

      - `map[unknown]`

    - `timestamp: number`

      Event timestamp as a Unix epoch in milliseconds.

    - `"$containers": optional map[unknown]`

      Cloudflare Containers event information that enriches your logs for identifying and debugging issues.

    - `"$workers": optional object { eventType, requestId, scriptName, 10 more }  or object { cpuTimeMs, eventType, outcome, 14 more }`

      Cloudflare Workers event information that enriches your logs for identifying and debugging issues.

      - `object { eventType, requestId, scriptName, 10 more }`

        - `eventType: "fetch" or "scheduled" or "alarm" or 9 more`

          - `"fetch"`

          - `"scheduled"`

          - `"alarm"`

          - `"cron"`

          - `"queue"`

          - `"email"`

          - `"tail"`

          - `"rpc"`

          - `"jsrpc"`

          - `"websocket"`

          - `"workflow"`

          - `"unknown"`

        - `requestId: string`

        - `scriptName: string`

        - `durableObjectId: optional string`

        - `entrypoint: optional string`

        - `event: optional map[unknown]`

        - `executionModel: optional "durableObject" or "stateless"`

          - `"durableObject"`

          - `"stateless"`

        - `outcome: optional string`

        - `preview: optional object { id, name, slug }`

          - `id: optional string`

          - `name: optional string`

          - `slug: optional string`

        - `scriptVersion: optional object { id, message, tag }`

          - `id: optional string`

          - `message: optional string`

          - `tag: optional string`

        - `spanId: optional string`

        - `traceId: optional string`

        - `truncated: optional boolean`

      - `object { cpuTimeMs, eventType, outcome, 14 more }`

        - `cpuTimeMs: number`

        - `eventType: "fetch" or "scheduled" or "alarm" or 9 more`

          - `"fetch"`

          - `"scheduled"`

          - `"alarm"`

          - `"cron"`

          - `"queue"`

          - `"email"`

          - `"tail"`

          - `"rpc"`

          - `"jsrpc"`

          - `"websocket"`

          - `"workflow"`

          - `"unknown"`

        - `outcome: string`

        - `requestId: string`

        - `scriptName: string`

        - `wallTimeMs: number`

        - `diagnosticsChannelEvents: optional array of object { channel, message, timestamp }`

          - `channel: string`

          - `message: string`

          - `timestamp: number`

        - `dispatchNamespace: optional string`

        - `durableObjectId: optional string`

        - `entrypoint: optional string`

        - `event: optional map[unknown]`

        - `executionModel: optional "durableObject" or "stateless"`

          - `"durableObject"`

          - `"stateless"`

        - `preview: optional object { id, name, slug }`

          - `id: optional string`

          - `name: optional string`

          - `slug: optional string`

        - `scriptVersion: optional object { id, message, tag }`

          - `id: optional string`

          - `message: optional string`

          - `tag: optional string`

        - `spanId: optional string`

        - `traceId: optional string`

        - `truncated: optional boolean`

  - `traces: optional array of object { rootSpanName, rootTransactionName, service, 6 more }`

    Trace summaries matching the query. Present when the query view is 'traces'. Each entry represents a distributed trace with its spans, duration, and services involved.

    - `rootSpanName: string`

      Name of the root span that initiated the trace.

    - `rootTransactionName: string`

      Logical transaction name for the root span.

    - `service: array of string`

      List of Worker services involved in the trace.

    - `spans: number`

      Total number of spans in the trace.

    - `traceDurationMs: number`

      Total duration of the trace in milliseconds.

    - `traceEndMs: number`

      Trace end time as a Unix epoch in milliseconds.

    - `traceId: string`

      Unique identifier for the distributed trace.

    - `traceStartMs: number`

      Trace start time as a Unix epoch in milliseconds.

    - `errors: optional array of string`

      Error messages encountered during the trace, if any.

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/telemetry/query \
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
    "run": {
      "id": "id",
      "accountId": "accountId",
      "dry": true,
      "granularity": 0,
      "query": {
        "id": "id",
        "adhoc": true,
        "created": "created",
        "createdBy": "createdBy",
        "description": "Query description",
        "name": "x",
        "parameters": {
          "calculations": [
            {
              "operator": "uniq",
              "alias": "alias",
              "key": "key",
              "keyType": "string"
            }
          ],
          "datasets": [
            "string"
          ],
          "filterCombination": "and",
          "filters": [
            {
              "filterCombination": "and",
              "filters": [
                {}
              ],
              "kind": "group"
            }
          ],
          "groupBys": [
            {
              "type": "string",
              "value": "value"
            }
          ],
          "havings": [
            {
              "key": "key",
              "operation": "eq",
              "value": 0
            }
          ],
          "limit": 0,
          "needle": {
            "value": {
              "0": "s",
              "1": "t",
              "2": "r",
              "3": "i",
              "4": "n",
              "5": "g"
            },
            "isRegex": true,
            "matchCase": true
          },
          "orderBy": {
            "value": "value",
            "order": "asc"
          }
        },
        "updated": "updated",
        "updatedBy": "updatedBy"
      },
      "status": "STARTED",
      "timeframe": {
        "from": 0,
        "to": 0
      },
      "userId": "userId",
      "created": "created",
      "statistics": {
        "bytes_read": 0,
        "elapsed": 0,
        "rows_read": 0,
        "abr_level": 0
      },
      "updated": "updated"
    },
    "statistics": {
      "bytes_read": 0,
      "elapsed": 0,
      "rows_read": 0,
      "abr_level": 0
    },
    "agents": [
      {
        "agentClass": "agentClass",
        "eventTypeCounts": {
          "foo": 0
        },
        "firstEventMs": 0,
        "hasErrors": true,
        "lastEventMs": 0,
        "namespace": "namespace",
        "service": "service",
        "totalEvents": 0
      }
    ],
    "calculations": [
      {
        "aggregates": [
          {
            "count": 0,
            "interval": 0,
            "sampleInterval": 0,
            "value": 0,
            "groups": [
              {
                "key": "key",
                "value": "string"
              }
            ]
          }
        ],
        "calculation": "calculation",
        "series": [
          {
            "data": [
              {
                "count": 0,
                "interval": 0,
                "sampleInterval": 0,
                "value": 0,
                "firstSeen": "firstSeen",
                "groups": [
                  {
                    "key": "key",
                    "value": "string"
                  }
                ],
                "lastSeen": "lastSeen"
              }
            ],
            "time": "time"
          }
        ],
        "alias": "alias"
      }
    ],
    "compare": [
      {
        "aggregates": [
          {
            "count": 0,
            "interval": 0,
            "sampleInterval": 0,
            "value": 0,
            "groups": [
              {
                "key": "key",
                "value": "string"
              }
            ]
          }
        ],
        "calculation": "calculation",
        "series": [
          {
            "data": [
              {
                "count": 0,
                "interval": 0,
                "sampleInterval": 0,
                "value": 0,
                "firstSeen": "firstSeen",
                "groups": [
                  {
                    "key": "key",
                    "value": "string"
                  }
                ],
                "lastSeen": "lastSeen"
              }
            ],
            "time": "time"
          }
        ],
        "alias": "alias"
      }
    ],
    "events": {
      "count": 0,
      "events": [
        {
          "$metadata": {
            "id": "id",
            "account": "account",
            "cloudService": "cloudService",
            "coldStart": 1,
            "cost": 1,
            "duration": 1,
            "endTime": 0,
            "error": "error",
            "errorTemplate": "errorTemplate",
            "fingerprint": "fingerprint",
            "level": "level",
            "message": "message",
            "messageTemplate": "messageTemplate",
            "metricName": "metricName",
            "origin": "origin",
            "parentSpanId": "parentSpanId",
            "provider": "provider",
            "region": "region",
            "requestId": "requestId",
            "service": "service",
            "spanId": "spanId",
            "spanName": "spanName",
            "stackId": "stackId",
            "startTime": 0,
            "statusCode": 1,
            "traceDuration": 1,
            "traceId": "traceId",
            "transactionName": "transactionName",
            "trigger": "trigger",
            "type": "type",
            "url": "url"
          },
          "dataset": "dataset",
          "source": "string",
          "timestamp": 0,
          "$containers": {
            "foo": "bar"
          },
          "$workers": {
            "eventType": "fetch",
            "requestId": "requestId",
            "scriptName": "scriptName",
            "durableObjectId": "durableObjectId",
            "entrypoint": "entrypoint",
            "event": {
              "foo": "bar"
            },
            "executionModel": "durableObject",
            "outcome": "outcome",
            "preview": {
              "id": "id",
              "name": "name",
              "slug": "slug"
            },
            "scriptVersion": {
              "id": "id",
              "message": "message",
              "tag": "tag"
            },
            "spanId": "spanId",
            "traceId": "traceId",
            "truncated": true
          }
        }
      ],
      "fields": [
        {
          "key": "key",
          "type": "type"
        }
      ],
      "series": [
        {
          "data": [
            {
              "aggregates": {
                "_count": 1,
                "_interval": 1,
                "_firstSeen": "_firstSeen",
                "_lastSeen": "_lastSeen",
                "bin": {}
              },
              "count": 0,
              "interval": 0,
              "sampleInterval": 0,
              "errors": 0,
              "groups": {
                "foo": "string"
              }
            }
          ],
          "time": "time"
        }
      ]
    },
    "invocations": {
      "foo": [
        {
          "$metadata": {
            "id": "id",
            "account": "account",
            "cloudService": "cloudService",
            "coldStart": 1,
            "cost": 1,
            "duration": 1,
            "endTime": 0,
            "error": "error",
            "errorTemplate": "errorTemplate",
            "fingerprint": "fingerprint",
            "level": "level",
            "message": "message",
            "messageTemplate": "messageTemplate",
            "metricName": "metricName",
            "origin": "origin",
            "parentSpanId": "parentSpanId",
            "provider": "provider",
            "region": "region",
            "requestId": "requestId",
            "service": "service",
            "spanId": "spanId",
            "spanName": "spanName",
            "stackId": "stackId",
            "startTime": 0,
            "statusCode": 1,
            "traceDuration": 1,
            "traceId": "traceId",
            "transactionName": "transactionName",
            "trigger": "trigger",
            "type": "type",
            "url": "url"
          },
          "dataset": "dataset",
          "source": "string",
          "timestamp": 0,
          "$containers": {
            "foo": "bar"
          },
          "$workers": {
            "eventType": "fetch",
            "requestId": "requestId",
            "scriptName": "scriptName",
            "durableObjectId": "durableObjectId",
            "entrypoint": "entrypoint",
            "event": {
              "foo": "bar"
            },
            "executionModel": "durableObject",
            "outcome": "outcome",
            "preview": {
              "id": "id",
              "name": "name",
              "slug": "slug"
            },
            "scriptVersion": {
              "id": "id",
              "message": "message",
              "tag": "tag"
            },
            "spanId": "spanId",
            "traceId": "traceId",
            "truncated": true
          }
        }
      ]
    },
    "traces": [
      {
        "rootSpanName": "rootSpanName",
        "rootTransactionName": "rootTransactionName",
        "service": [
          "string"
        ],
        "spans": 0,
        "traceDurationMs": 0,
        "traceEndMs": 0,
        "traceId": "traceId",
        "traceStartMs": 0,
        "errors": [
          "string"
        ]
      }
    ]
  },
  "success": true
}
```
