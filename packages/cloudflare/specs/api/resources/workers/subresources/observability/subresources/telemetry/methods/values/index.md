## List values

**post** `/accounts/{account_id}/workers/observability/telemetry/values`

List unique values found in your events.

### Path Parameters

- `account_id: string`

### Body Parameters

- `datasets: array of string`

  Leave this empty to use the default datasets

- `key: string`

- `timeframe: object { from, to }`

  - `from: number`

  - `to: number`

- `type: "string" or "boolean" or "number"`

  - `"string"`

  - `"boolean"`

  - `"number"`

- `filters: optional array of object { filterCombination, filters, kind }  or object { key, operation, type, 2 more }`

  Apply filters before listing values. Supports nested groups via kind: 'group'. Maximum nesting depth is 4.

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

- `limit: optional number`

- `needle: optional object { value, isRegex, matchCase }`

  Full-text search expression to match events containing the specified text or pattern.

  - `value: string or number or boolean`

    The text or pattern to search for.

    - `string`

    - `number`

    - `boolean`

  - `isRegex: optional boolean`

    When true, treats the value as a regular expression (RE2 syntax).

  - `matchCase: optional boolean`

    When true, performs a case-sensitive search. Defaults to case-insensitive.

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: "Successful request"`

    - `"Successful request"`

- `result: array of object { dataset, key, type, value }`

  - `dataset: string`

  - `key: string`

  - `type: "string" or "boolean" or "number"`

    - `"string"`

    - `"boolean"`

    - `"number"`

  - `value: string or number or boolean`

    - `string`

    - `number`

    - `boolean`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/telemetry/values \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "datasets": [
            "string"
          ],
          "key": "key",
          "timeframe": {
            "from": 0,
            "to": 0
          },
          "type": "string"
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
  "result": [
    {
      "dataset": "dataset",
      "key": "key",
      "type": "string",
      "value": "string"
    }
  ],
  "success": true
}
```
