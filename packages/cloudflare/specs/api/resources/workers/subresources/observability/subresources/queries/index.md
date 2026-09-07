# Queries

## Save query

**post** `/accounts/{account_id}/workers/observability/queries`

Persist query for later use.

### Path Parameters

- `account_id: string`

### Body Parameters

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

    - `value: string or number or boolean`

      - `string`

      - `number`

      - `boolean`

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

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: "Successful request"`

    - `"Successful request"`

- `result: object { id, adhoc, created, 6 more }`

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

      - `value: string or number or boolean`

        - `string`

        - `number`

        - `boolean`

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

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/queries \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "description": "Query description",
          "name": "x",
          "parameters": {}
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
        "value": "string",
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
  "success": true
}
```

## List queries

**get** `/accounts/{account_id}/workers/observability/queries`

List saved queries.

### Path Parameters

- `account_id: string`

### Query Parameters

- `order: optional "asc" or "desc"`

  - `"asc"`

  - `"desc"`

- `orderBy: optional "created" or "updated"`

  - `"created"`

  - `"updated"`

- `page: optional number`

- `perPage: optional number`

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: "Successful request"`

    - `"Successful request"`

- `result: array of object { id, adhoc, created, 6 more }`

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

      - `value: string or number or boolean`

        - `string`

        - `number`

        - `boolean`

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

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/queries \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
          "value": "string",
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
    }
  ],
  "success": true
}
```

## Domain Types

### Query Create Response

- `QueryCreateResponse object { id, adhoc, created, 6 more }`

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

      - `value: string or number or boolean`

        - `string`

        - `number`

        - `boolean`

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

### Query List Response

- `QueryListResponse object { id, adhoc, created, 6 more }`

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

      - `value: string or number or boolean`

        - `string`

        - `number`

        - `boolean`

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
