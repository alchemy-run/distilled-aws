## Prepare live tail

**post** `/accounts/{account_id}/workers/observability/telemetry/live-tail`

Prepare websocket server for live tail.

### Path Parameters

- `account_id: string`

### Body Parameters

- `filterCombination: optional "and" or "or" or "AND" or "OR"`

  Set a flag to describe how to combine the filters on the query.

  - `"and"`

  - `"or"`

  - `"AND"`

  - `"OR"`

- `filters: optional array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

  Apply filters to the query. Supports nested groups via kind: 'group'.

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

- `scriptId: optional string`

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: "Successful request"`

    - `"Successful request"`

- `result: object { wsUrl }`

  - `wsUrl: string`

    WebSocket URL clients connect to in order to stream live tail events.

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/telemetry/live-tail \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{}'
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
    "wsUrl": "https://example.com"
  },
  "success": true
}
```
