## Get flag changelog

**get** `/accounts/{account_id}/flagship/apps/{app_id}/flags/{flag_key}/changelog`

Returns the audit history for a flag, newest first. Each entry includes the event type and full flag state after the change; `update` entries include a field-level diff. Capped at 200 entries per flag.

### Path Parameters

- `account_id: string`

  Cloudflare account ID.

- `app_id: string`

  App identifier.

- `flag_key: string`

  Flag key (slug).

### Query Parameters

- `cursor: optional string`

  Pagination cursor from a previous response.

- `limit: optional string`

  Max items to return (1–200).

### Returns

- `errors: array of object { message }`

  - `message: string`

- `messages: array of object { message }`

  - `message: string`

- `result: array of object { after, event, flag_key }  or object { after, event, flag_key }  or object { after, diff, event, flag_key }`

  - `object { after, event, flag_key }`

    - `after: object { default_variation, enabled, key, 6 more }`

      - `default_variation: string`

        Variation served when no rule matches or the flag is disabled. Must be a key in `variations`.

      - `enabled: boolean`

        When false, the flag bypasses all rules and always serves `default_variation`.

      - `key: string`

        Unique identifier for the flag within an app. Used in all evaluation and SDK calls.

      - `rules: array of object { conditions, priority, serve_variation, rollout }`

        Targeting rules evaluated in ascending `priority`; the first matching rule wins. An empty array means the flag always serves `default_variation`.

        - `conditions: array of object { attribute, operator, value }  or object { clauses, logical_operator }`

          Conditions the context must satisfy for this rule to match. An empty array matches all contexts.

          - `object { attribute, operator, value }`

            - `attribute: string`

            - `operator: "equals" or "not_equals" or "greater_than" or 8 more`

              - `"equals"`

              - `"not_equals"`

              - `"greater_than"`

              - `"less_than"`

              - `"greater_than_or_equals"`

              - `"less_than_or_equals"`

              - `"contains"`

              - `"starts_with"`

              - `"ends_with"`

              - `"in"`

              - `"not_in"`

            - `value: unknown`

              Value to compare against the context attribute. Must be an array for `in` and `not_in`; numeric and ISO-8601 datetime strings are accepted by the ordering operators.

          - `object { clauses, logical_operator }`

            - `clauses: array of object { attribute, operator, value }  or object { clauses, logical_operator }`

              - `object { attribute, operator, value }`

                - `attribute: string`

                - `operator: "equals" or "not_equals" or "greater_than" or 8 more`

                  - `"equals"`

                  - `"not_equals"`

                  - `"greater_than"`

                  - `"less_than"`

                  - `"greater_than_or_equals"`

                  - `"less_than_or_equals"`

                  - `"contains"`

                  - `"starts_with"`

                  - `"ends_with"`

                  - `"in"`

                  - `"not_in"`

                - `value: unknown`

                  Value to compare against the context attribute. Must be an array for `in` and `not_in`; numeric and ISO-8601 datetime strings are accepted by the ordering operators.

              - `object { clauses, logical_operator }`

                - `clauses: array of object { attribute, operator, value }  or object { clauses, logical_operator }`

                  - `object { attribute, operator, value }`

                    - `attribute: string`

                    - `operator: "equals" or "not_equals" or "greater_than" or 8 more`

                      - `"equals"`

                      - `"not_equals"`

                      - `"greater_than"`

                      - `"less_than"`

                      - `"greater_than_or_equals"`

                      - `"less_than_or_equals"`

                      - `"contains"`

                      - `"starts_with"`

                      - `"ends_with"`

                      - `"in"`

                      - `"not_in"`

                    - `value: unknown`

                      Value to compare against the context attribute. Must be an array for `in` and `not_in`; numeric and ISO-8601 datetime strings are accepted by the ordering operators.

                  - `object { clauses, logical_operator }`

                    - `clauses: array of object { attribute, operator, value }  or object { clauses, logical_operator }`

                      - `object { attribute, operator, value }`

                        - `attribute: string`

                        - `operator: "equals" or "not_equals" or "greater_than" or 8 more`

                          - `"equals"`

                          - `"not_equals"`

                          - `"greater_than"`

                          - `"less_than"`

                          - `"greater_than_or_equals"`

                          - `"less_than_or_equals"`

                          - `"contains"`

                          - `"starts_with"`

                          - `"ends_with"`

                          - `"in"`

                          - `"not_in"`

                        - `value: unknown`

                          Value to compare against the context attribute. Must be an array for `in` and `not_in`; numeric and ISO-8601 datetime strings are accepted by the ordering operators.

                      - `object { clauses, logical_operator }`

                        - `clauses: array of object { attribute, operator, value }  or object { clauses, logical_operator }`

                          - `object { attribute, operator, value }`

                            - `attribute: string`

                            - `operator: "equals" or "not_equals" or "greater_than" or 8 more`

                              - `"equals"`

                              - `"not_equals"`

                              - `"greater_than"`

                              - `"less_than"`

                              - `"greater_than_or_equals"`

                              - `"less_than_or_equals"`

                              - `"contains"`

                              - `"starts_with"`

                              - `"ends_with"`

                              - `"in"`

                              - `"not_in"`

                            - `value: unknown`

                              Value to compare against the context attribute. Must be an array for `in` and `not_in`; numeric and ISO-8601 datetime strings are accepted by the ordering operators.

                          - `object { clauses, logical_operator }`

                            - `clauses: array of object { attribute, operator, value }  or object { clauses, logical_operator }`

                              - `object { attribute, operator, value }`

                                - `attribute: string`

                                - `operator: "equals" or "not_equals" or "greater_than" or 8 more`

                                  - `"equals"`

                                  - `"not_equals"`

                                  - `"greater_than"`

                                  - `"less_than"`

                                  - `"greater_than_or_equals"`

                                  - `"less_than_or_equals"`

                                  - `"contains"`

                                  - `"starts_with"`

                                  - `"ends_with"`

                                  - `"in"`

                                  - `"not_in"`

                                - `value: unknown`

                                  Value to compare against the context attribute. Must be an array for `in` and `not_in`; numeric and ISO-8601 datetime strings are accepted by the ordering operators.

                              - `object { clauses, logical_operator }`

                                - `clauses: array of string or number or boolean or 2 more`

                                  - `string`

                                  - `number`

                                  - `boolean`

                                  - `map[unknown]`

                                  - `array of unknown`

                                - `logical_operator: "AND" or "OR"`

                                  - `"AND"`

                                  - `"OR"`

                            - `logical_operator: "AND" or "OR"`

                              - `"AND"`

                              - `"OR"`

                        - `logical_operator: "AND" or "OR"`

                          - `"AND"`

                          - `"OR"`

                    - `logical_operator: "AND" or "OR"`

                      - `"AND"`

                      - `"OR"`

                - `logical_operator: "AND" or "OR"`

                  - `"AND"`

                  - `"OR"`

            - `logical_operator: "AND" or "OR"`

              - `"AND"`

              - `"OR"`

        - `priority: number`

          Evaluation order; lower numbers are evaluated first. Must be unique across the flag's rules.

        - `serve_variation: string`

          Variation served when this rule matches. Must be a key in `variations`.

        - `rollout: optional object { percentage, attribute }`

          - `percentage: number`

            Percentage of matching traffic (0–100) served this variation. For multi-way splits, use cumulative upper bounds across rules (e.g. 30, 70, 100).

          - `attribute: optional string`

            Context attribute used for sticky bucketing. Defaults to `targetingKey`. If absent at evaluation time, bucketing is random per request.

      - `variations: map[string or number or boolean or 2 more]`

        Map of variation name to value. All values must be the same type (boolean, string, number, or JSON object/array). Each serialized value must be 10KB or smaller.

        - `string`

        - `number`

        - `boolean`

        - `map[unknown]`

        - `array of unknown`

      - `description: optional string`

      - `type: optional "boolean" or "string" or "number" or "json"`

        Value type of the flag's variations. Inferred from the variation values on write, so it may be omitted in requests.

        - `"boolean"`

        - `"string"`

        - `"number"`

        - `"json"`

      - `updated_at: optional string`

      - `updated_by: optional string`

    - `event: "create"`

      - `"create"`

    - `flag_key: string`

  - `object { after, event, flag_key }`

    - `after: object { default_variation, enabled, key, 6 more }`

      - `default_variation: string`

        Variation served when no rule matches or the flag is disabled. Must be a key in `variations`.

      - `enabled: boolean`

        When false, the flag bypasses all rules and always serves `default_variation`.

      - `key: string`

        Unique identifier for the flag within an app. Used in all evaluation and SDK calls.

      - `rules: array of object { conditions, priority, serve_variation, rollout }`

        Targeting rules evaluated in ascending `priority`; the first matching rule wins. An empty array means the flag always serves `default_variation`.

        - `conditions: array of object { attribute, operator, value }  or object { clauses, logical_operator }`

          Conditions the context must satisfy for this rule to match. An empty array matches all contexts.

          - `object { attribute, operator, value }`

            - `attribute: string`

            - `operator: "equals" or "not_equals" or "greater_than" or 8 more`

              - `"equals"`

              - `"not_equals"`

              - `"greater_than"`

              - `"less_than"`

              - `"greater_than_or_equals"`

              - `"less_than_or_equals"`

              - `"contains"`

              - `"starts_with"`

              - `"ends_with"`

              - `"in"`

              - `"not_in"`

            - `value: unknown`

              Value to compare against the context attribute. Must be an array for `in` and `not_in`; numeric and ISO-8601 datetime strings are accepted by the ordering operators.

          - `object { clauses, logical_operator }`

            - `clauses: array of object { attribute, operator, value }  or object { clauses, logical_operator }`

              - `object { attribute, operator, value }`

                - `attribute: string`

                - `operator: "equals" or "not_equals" or "greater_than" or 8 more`

                  - `"equals"`

                  - `"not_equals"`

                  - `"greater_than"`

                  - `"less_than"`

                  - `"greater_than_or_equals"`

                  - `"less_than_or_equals"`

                  - `"contains"`

                  - `"starts_with"`

                  - `"ends_with"`

                  - `"in"`

                  - `"not_in"`

                - `value: unknown`

                  Value to compare against the context attribute. Must be an array for `in` and `not_in`; numeric and ISO-8601 datetime strings are accepted by the ordering operators.

              - `object { clauses, logical_operator }`

                - `clauses: array of object { attribute, operator, value }  or object { clauses, logical_operator }`

                  - `object { attribute, operator, value }`

                    - `attribute: string`

                    - `operator: "equals" or "not_equals" or "greater_than" or 8 more`

                      - `"equals"`

                      - `"not_equals"`

                      - `"greater_than"`

                      - `"less_than"`

                      - `"greater_than_or_equals"`

                      - `"less_than_or_equals"`

                      - `"contains"`

                      - `"starts_with"`

                      - `"ends_with"`

                      - `"in"`

                      - `"not_in"`

                    - `value: unknown`

                      Value to compare against the context attribute. Must be an array for `in` and `not_in`; numeric and ISO-8601 datetime strings are accepted by the ordering operators.

                  - `object { clauses, logical_operator }`

                    - `clauses: array of object { attribute, operator, value }  or object { clauses, logical_operator }`

                      - `object { attribute, operator, value }`

                        - `attribute: string`

                        - `operator: "equals" or "not_equals" or "greater_than" or 8 more`

                          - `"equals"`

                          - `"not_equals"`

                          - `"greater_than"`

                          - `"less_than"`

                          - `"greater_than_or_equals"`

                          - `"less_than_or_equals"`

                          - `"contains"`

                          - `"starts_with"`

                          - `"ends_with"`

                          - `"in"`

                          - `"not_in"`

                        - `value: unknown`

                          Value to compare against the context attribute. Must be an array for `in` and `not_in`; numeric and ISO-8601 datetime strings are accepted by the ordering operators.

                      - `object { clauses, logical_operator }`

                        - `clauses: array of object { attribute, operator, value }  or object { clauses, logical_operator }`

                          - `object { attribute, operator, value }`

                            - `attribute: string`

                            - `operator: "equals" or "not_equals" or "greater_than" or 8 more`

                              - `"equals"`

                              - `"not_equals"`

                              - `"greater_than"`

                              - `"less_than"`

                              - `"greater_than_or_equals"`

                              - `"less_than_or_equals"`

                              - `"contains"`

                              - `"starts_with"`

                              - `"ends_with"`

                              - `"in"`

                              - `"not_in"`

                            - `value: unknown`

                              Value to compare against the context attribute. Must be an array for `in` and `not_in`; numeric and ISO-8601 datetime strings are accepted by the ordering operators.

                          - `object { clauses, logical_operator }`

                            - `clauses: array of object { attribute, operator, value }  or object { clauses, logical_operator }`

                              - `object { attribute, operator, value }`

                                - `attribute: string`

                                - `operator: "equals" or "not_equals" or "greater_than" or 8 more`

                                  - `"equals"`

                                  - `"not_equals"`

                                  - `"greater_than"`

                                  - `"less_than"`

                                  - `"greater_than_or_equals"`

                                  - `"less_than_or_equals"`

                                  - `"contains"`

                                  - `"starts_with"`

                                  - `"ends_with"`

                                  - `"in"`

                                  - `"not_in"`

                                - `value: unknown`

                                  Value to compare against the context attribute. Must be an array for `in` and `not_in`; numeric and ISO-8601 datetime strings are accepted by the ordering operators.

                              - `object { clauses, logical_operator }`

                                - `clauses: array of string or number or boolean or 2 more`

                                  - `string`

                                  - `number`

                                  - `boolean`

                                  - `map[unknown]`

                                  - `array of unknown`

                                - `logical_operator: "AND" or "OR"`

                                  - `"AND"`

                                  - `"OR"`

                            - `logical_operator: "AND" or "OR"`

                              - `"AND"`

                              - `"OR"`

                        - `logical_operator: "AND" or "OR"`

                          - `"AND"`

                          - `"OR"`

                    - `logical_operator: "AND" or "OR"`

                      - `"AND"`

                      - `"OR"`

                - `logical_operator: "AND" or "OR"`

                  - `"AND"`

                  - `"OR"`

            - `logical_operator: "AND" or "OR"`

              - `"AND"`

              - `"OR"`

        - `priority: number`

          Evaluation order; lower numbers are evaluated first. Must be unique across the flag's rules.

        - `serve_variation: string`

          Variation served when this rule matches. Must be a key in `variations`.

        - `rollout: optional object { percentage, attribute }`

          - `percentage: number`

            Percentage of matching traffic (0–100) served this variation. For multi-way splits, use cumulative upper bounds across rules (e.g. 30, 70, 100).

          - `attribute: optional string`

            Context attribute used for sticky bucketing. Defaults to `targetingKey`. If absent at evaluation time, bucketing is random per request.

      - `variations: map[string or number or boolean or 2 more]`

        Map of variation name to value. All values must be the same type (boolean, string, number, or JSON object/array). Each serialized value must be 10KB or smaller.

        - `string`

        - `number`

        - `boolean`

        - `map[unknown]`

        - `array of unknown`

      - `description: optional string`

      - `type: optional "boolean" or "string" or "number" or "json"`

        Value type of the flag's variations. Inferred from the variation values on write, so it may be omitted in requests.

        - `"boolean"`

        - `"string"`

        - `"number"`

        - `"json"`

      - `updated_at: optional string`

      - `updated_by: optional string`

    - `event: "delete"`

      - `"delete"`

    - `flag_key: string`

  - `object { after, diff, event, flag_key }`

    - `after: object { default_variation, enabled, key, 6 more }`

      - `default_variation: string`

        Variation served when no rule matches or the flag is disabled. Must be a key in `variations`.

      - `enabled: boolean`

        When false, the flag bypasses all rules and always serves `default_variation`.

      - `key: string`

        Unique identifier for the flag within an app. Used in all evaluation and SDK calls.

      - `rules: array of object { conditions, priority, serve_variation, rollout }`

        Targeting rules evaluated in ascending `priority`; the first matching rule wins. An empty array means the flag always serves `default_variation`.

        - `conditions: array of object { attribute, operator, value }  or object { clauses, logical_operator }`

          Conditions the context must satisfy for this rule to match. An empty array matches all contexts.

          - `object { attribute, operator, value }`

            - `attribute: string`

            - `operator: "equals" or "not_equals" or "greater_than" or 8 more`

              - `"equals"`

              - `"not_equals"`

              - `"greater_than"`

              - `"less_than"`

              - `"greater_than_or_equals"`

              - `"less_than_or_equals"`

              - `"contains"`

              - `"starts_with"`

              - `"ends_with"`

              - `"in"`

              - `"not_in"`

            - `value: unknown`

              Value to compare against the context attribute. Must be an array for `in` and `not_in`; numeric and ISO-8601 datetime strings are accepted by the ordering operators.

          - `object { clauses, logical_operator }`

            - `clauses: array of object { attribute, operator, value }  or object { clauses, logical_operator }`

              - `object { attribute, operator, value }`

                - `attribute: string`

                - `operator: "equals" or "not_equals" or "greater_than" or 8 more`

                  - `"equals"`

                  - `"not_equals"`

                  - `"greater_than"`

                  - `"less_than"`

                  - `"greater_than_or_equals"`

                  - `"less_than_or_equals"`

                  - `"contains"`

                  - `"starts_with"`

                  - `"ends_with"`

                  - `"in"`

                  - `"not_in"`

                - `value: unknown`

                  Value to compare against the context attribute. Must be an array for `in` and `not_in`; numeric and ISO-8601 datetime strings are accepted by the ordering operators.

              - `object { clauses, logical_operator }`

                - `clauses: array of object { attribute, operator, value }  or object { clauses, logical_operator }`

                  - `object { attribute, operator, value }`

                    - `attribute: string`

                    - `operator: "equals" or "not_equals" or "greater_than" or 8 more`

                      - `"equals"`

                      - `"not_equals"`

                      - `"greater_than"`

                      - `"less_than"`

                      - `"greater_than_or_equals"`

                      - `"less_than_or_equals"`

                      - `"contains"`

                      - `"starts_with"`

                      - `"ends_with"`

                      - `"in"`

                      - `"not_in"`

                    - `value: unknown`

                      Value to compare against the context attribute. Must be an array for `in` and `not_in`; numeric and ISO-8601 datetime strings are accepted by the ordering operators.

                  - `object { clauses, logical_operator }`

                    - `clauses: array of object { attribute, operator, value }  or object { clauses, logical_operator }`

                      - `object { attribute, operator, value }`

                        - `attribute: string`

                        - `operator: "equals" or "not_equals" or "greater_than" or 8 more`

                          - `"equals"`

                          - `"not_equals"`

                          - `"greater_than"`

                          - `"less_than"`

                          - `"greater_than_or_equals"`

                          - `"less_than_or_equals"`

                          - `"contains"`

                          - `"starts_with"`

                          - `"ends_with"`

                          - `"in"`

                          - `"not_in"`

                        - `value: unknown`

                          Value to compare against the context attribute. Must be an array for `in` and `not_in`; numeric and ISO-8601 datetime strings are accepted by the ordering operators.

                      - `object { clauses, logical_operator }`

                        - `clauses: array of object { attribute, operator, value }  or object { clauses, logical_operator }`

                          - `object { attribute, operator, value }`

                            - `attribute: string`

                            - `operator: "equals" or "not_equals" or "greater_than" or 8 more`

                              - `"equals"`

                              - `"not_equals"`

                              - `"greater_than"`

                              - `"less_than"`

                              - `"greater_than_or_equals"`

                              - `"less_than_or_equals"`

                              - `"contains"`

                              - `"starts_with"`

                              - `"ends_with"`

                              - `"in"`

                              - `"not_in"`

                            - `value: unknown`

                              Value to compare against the context attribute. Must be an array for `in` and `not_in`; numeric and ISO-8601 datetime strings are accepted by the ordering operators.

                          - `object { clauses, logical_operator }`

                            - `clauses: array of object { attribute, operator, value }  or object { clauses, logical_operator }`

                              - `object { attribute, operator, value }`

                                - `attribute: string`

                                - `operator: "equals" or "not_equals" or "greater_than" or 8 more`

                                  - `"equals"`

                                  - `"not_equals"`

                                  - `"greater_than"`

                                  - `"less_than"`

                                  - `"greater_than_or_equals"`

                                  - `"less_than_or_equals"`

                                  - `"contains"`

                                  - `"starts_with"`

                                  - `"ends_with"`

                                  - `"in"`

                                  - `"not_in"`

                                - `value: unknown`

                                  Value to compare against the context attribute. Must be an array for `in` and `not_in`; numeric and ISO-8601 datetime strings are accepted by the ordering operators.

                              - `object { clauses, logical_operator }`

                                - `clauses: array of string or number or boolean or 2 more`

                                  - `string`

                                  - `number`

                                  - `boolean`

                                  - `map[unknown]`

                                  - `array of unknown`

                                - `logical_operator: "AND" or "OR"`

                                  - `"AND"`

                                  - `"OR"`

                            - `logical_operator: "AND" or "OR"`

                              - `"AND"`

                              - `"OR"`

                        - `logical_operator: "AND" or "OR"`

                          - `"AND"`

                          - `"OR"`

                    - `logical_operator: "AND" or "OR"`

                      - `"AND"`

                      - `"OR"`

                - `logical_operator: "AND" or "OR"`

                  - `"AND"`

                  - `"OR"`

            - `logical_operator: "AND" or "OR"`

              - `"AND"`

              - `"OR"`

        - `priority: number`

          Evaluation order; lower numbers are evaluated first. Must be unique across the flag's rules.

        - `serve_variation: string`

          Variation served when this rule matches. Must be a key in `variations`.

        - `rollout: optional object { percentage, attribute }`

          - `percentage: number`

            Percentage of matching traffic (0–100) served this variation. For multi-way splits, use cumulative upper bounds across rules (e.g. 30, 70, 100).

          - `attribute: optional string`

            Context attribute used for sticky bucketing. Defaults to `targetingKey`. If absent at evaluation time, bucketing is random per request.

      - `variations: map[string or number or boolean or 2 more]`

        Map of variation name to value. All values must be the same type (boolean, string, number, or JSON object/array). Each serialized value must be 10KB or smaller.

        - `string`

        - `number`

        - `boolean`

        - `map[unknown]`

        - `array of unknown`

      - `description: optional string`

      - `type: optional "boolean" or "string" or "number" or "json"`

        Value type of the flag's variations. Inferred from the variation values on write, so it may be omitted in requests.

        - `"boolean"`

        - `"string"`

        - `"number"`

        - `"json"`

      - `updated_at: optional string`

      - `updated_by: optional string`

    - `diff: map[object { from, to } ]`

      - `from: optional string or number or boolean or 2 more`

        - `string`

        - `number`

        - `boolean`

        - `map[unknown]`

        - `array of unknown`

      - `to: optional string or number or boolean or 2 more`

        - `string`

        - `number`

        - `boolean`

        - `map[unknown]`

        - `array of unknown`

    - `event: "update"`

      - `"update"`

    - `flag_key: string`

- `result_info: object { count, cursor }`

  - `count: number`

    Number of items returned in this page.

  - `cursor: string`

    Cursor to pass back to fetch the next page, or null when this is the last page.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/flagship/apps/$APP_ID/flags/$FLAG_KEY/changelog \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
      "message": "message"
    }
  ],
  "result": [
    {
      "after": {
        "default_variation": "x",
        "enabled": true,
        "key": "x",
        "rules": [
          {
            "conditions": [
              {
                "attribute": "x",
                "operator": "equals",
                "value": {}
              }
            ],
            "priority": 1,
            "serve_variation": "x",
            "rollout": {
              "percentage": 0,
              "attribute": "x"
            }
          }
        ],
        "variations": {
          "foo": "string"
        },
        "description": "description",
        "type": "boolean",
        "updated_at": "updated_at",
        "updated_by": "updated_by"
      },
      "event": "create",
      "flag_key": "flag_key"
    }
  ],
  "result_info": {
    "count": 0,
    "cursor": "cursor"
  },
  "success": true
}
```
