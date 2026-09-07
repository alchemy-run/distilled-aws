# Rules

## List zone snippet rules

**get** `/zones/{zone_id}/snippets/snippet_rules`

Fetches all snippet rules belonging to the zone.

### Path Parameters

- `zone_id: string`

  Use this field to specify the unique ID of the zone.

### Returns

- `errors: array of object { message, code }`

  Lists error messages.

  - `message: string`

    Describes the message text.

  - `code: optional number`

    Identify the message code.

- `messages: array of object { message, code }`

  Contain warning messages.

  - `message: string`

    Describes the message text.

  - `code: optional number`

    Identify the message code.

- `result: unknown`

  Contain the response result.

- `success: true`

  Indicate whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/snippets/snippet_rules \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "something bad happened",
      "code": 10000
    }
  ],
  "messages": [
    {
      "message": "something bad happened",
      "code": 10000
    }
  ],
  "result": {},
  "success": true
}
```

## List zone snippet rules

**get** `/zones/{zone_id}/snippets/snippet_rules`

Fetches all snippet rules belonging to the zone.

### Path Parameters

- `zone_id: string`

  Use this field to specify the unique ID of the zone.

### Returns

- `errors: array of object { message, code }`

  Lists error messages.

  - `message: string`

    Describes the message text.

  - `code: optional number`

    Identify the message code.

- `messages: array of object { message, code }`

  Contain warning messages.

  - `message: string`

    Describes the message text.

  - `code: optional number`

    Identify the message code.

- `result: unknown`

  Contain the response result.

- `success: true`

  Indicate whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/snippets/snippet_rules \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "something bad happened",
      "code": 10000
    }
  ],
  "messages": [
    {
      "message": "something bad happened",
      "code": 10000
    }
  ],
  "result": {},
  "success": true
}
```

## Update zone snippet rules

**put** `/zones/{zone_id}/snippets/snippet_rules`

Updates all snippet rules belonging to the zone.

### Path Parameters

- `zone_id: string`

  Use this field to specify the unique ID of the zone.

### Body Parameters

- `rules: array of object { id, expression, last_updated, 3 more }`

  Lists snippet rules.

  - `id: string`

    Specify the unique ID of the rule.

  - `expression: string`

    Define the expression that determines which traffic matches the rule.

  - `last_updated: string`

    Specify the timestamp of when the rule was last modified.

  - `snippet_name: string`

    Identify the snippet.

  - `description: optional string`

    Provide an informative description of the rule.

  - `enabled: optional boolean`

    Indicate whether to execute the rule.

### Returns

- `errors: array of object { message, code }`

  Lists error messages.

  - `message: string`

    Describes the message text.

  - `code: optional number`

    Identify the message code.

- `messages: array of object { message, code }`

  Contain warning messages.

  - `message: string`

    Describes the message text.

  - `code: optional number`

    Identify the message code.

- `result: unknown`

  Contain the response result.

- `success: true`

  Indicate whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/snippets/snippet_rules \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "rules": [
            {
              "expression": "ip.src eq 1.1.1.1",
              "snippet_name": "my_snippet"
            }
          ]
        }'
```

#### Response

```json
{
  "errors": [
    {
      "message": "something bad happened",
      "code": 10000
    }
  ],
  "messages": [
    {
      "message": "something bad happened",
      "code": 10000
    }
  ],
  "result": {},
  "success": true
}
```

## Delete zone snippet rules

**delete** `/zones/{zone_id}/snippets/snippet_rules`

Deletes all snippet rules belonging to the zone.

### Path Parameters

- `zone_id: string`

  Use this field to specify the unique ID of the zone.

### Returns

- `errors: array of object { message, code }`

  Lists error messages.

  - `message: string`

    Describes the message text.

  - `code: optional number`

    Identify the message code.

- `messages: array of object { message, code }`

  Contain warning messages.

  - `message: string`

    Describes the message text.

  - `code: optional number`

    Identify the message code.

- `result: unknown`

  Contain the response result.

- `success: true`

  Indicate whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/snippets/snippet_rules \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "something bad happened",
      "code": 10000
    }
  ],
  "messages": [
    {
      "message": "something bad happened",
      "code": 10000
    }
  ],
  "result": {},
  "success": true
}
```

## Domain Types

### Rule Get Response

- `RuleGetResponse = unknown`

  Contain the response result.

### Rule List Response

- `RuleListResponse = unknown`

  Contain the response result.

### Rule Update Response

- `RuleUpdateResponse = unknown`

  Contain the response result.

### Rule Delete Response

- `RuleDeleteResponse = unknown`

  Contain the response result.
