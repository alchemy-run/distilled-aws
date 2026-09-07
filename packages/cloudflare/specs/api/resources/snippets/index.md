# Snippets

## List zone snippets

**get** `/zones/{zone_id}/snippets`

Fetches all snippets belonging to the zone.

### Path Parameters

- `zone_id: string`

  Use this field to specify the unique ID of the zone.

### Query Parameters

- `page: optional number`

  Specifies the current page number.

- `per_page: optional number`

  Specifies how many results to return per page.

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

- `result: array of object { created_on, snippet_name, modified_on }`

  Contain snippets.

  - `created_on: string`

    Indicates when the snippet was created.

  - `snippet_name: string`

    Identify the snippet.

  - `modified_on: optional string`

    Indicates when the snippet was last modified.

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, 2 more }`

  Additional information to navigate the results.

  - `count: number`

    Specify the number of results in the current page.

  - `page: number`

    Specifies the current page number.

  - `per_page: number`

    Specifies how many results to return per page.

  - `total_count: number`

    Specify the total number of results.

  - `total_pages: number`

    Specify the total number of pages.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/snippets \
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
  "result": [
    {
      "created_on": "2000-01-01T00:00:00.000000Z",
      "snippet_name": "my_snippet",
      "modified_on": "2000-01-01T00:00:00.000000Z"
    }
  ],
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 25,
    "total_count": 100,
    "total_pages": 10
  }
}
```

## Get a zone snippet

**get** `/zones/{zone_id}/snippets/{snippet_name}`

Fetches a snippet belonging to the zone.

### Path Parameters

- `zone_id: string`

  Use this field to specify the unique ID of the zone.

- `snippet_name: string`

  Identify the snippet.

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

- `result: object { created_on, snippet_name, modified_on }`

  Contain the response result.

  - `created_on: string`

    Indicates when the snippet was created.

  - `snippet_name: string`

    Identify the snippet.

  - `modified_on: optional string`

    Indicates when the snippet was last modified.

- `success: true`

  Indicate whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/snippets/$SNIPPET_NAME \
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
  "result": {
    "created_on": "2000-01-01T00:00:00.000000Z",
    "snippet_name": "my_snippet",
    "modified_on": "2000-01-01T00:00:00.000000Z"
  },
  "success": true
}
```

## Update a zone snippet

**put** `/zones/{zone_id}/snippets/{snippet_name}`

Creates or updates a snippet belonging to the zone.

### Path Parameters

- `zone_id: string`

  Use this field to specify the unique ID of the zone.

- `snippet_name: string`

  Identify the snippet.

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

- `result: object { created_on, snippet_name, modified_on }`

  Contain the response result.

  - `created_on: string`

    Indicates when the snippet was created.

  - `snippet_name: string`

    Identify the snippet.

  - `modified_on: optional string`

    Indicates when the snippet was last modified.

- `success: true`

  Indicate whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/snippets/$SNIPPET_NAME \
    -X PUT \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F metadata='{"main_module":"main.js"}'
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
  "result": {
    "created_on": "2000-01-01T00:00:00.000000Z",
    "snippet_name": "my_snippet",
    "modified_on": "2000-01-01T00:00:00.000000Z"
  },
  "success": true
}
```

## Delete a zone snippet

**delete** `/zones/{zone_id}/snippets/{snippet_name}`

Deletes a snippet belonging to the zone.

### Path Parameters

- `zone_id: string`

  Use this field to specify the unique ID of the zone.

- `snippet_name: string`

  Identify the snippet.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/snippets/$SNIPPET_NAME \
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

### Snippet List Response

- `SnippetListResponse object { created_on, snippet_name, modified_on }`

  Define a snippet.

  - `created_on: string`

    Indicates when the snippet was created.

  - `snippet_name: string`

    Identify the snippet.

  - `modified_on: optional string`

    Indicates when the snippet was last modified.

### Snippet Get Response

- `SnippetGetResponse object { created_on, snippet_name, modified_on }`

  Contain the response result.

  - `created_on: string`

    Indicates when the snippet was created.

  - `snippet_name: string`

    Identify the snippet.

  - `modified_on: optional string`

    Indicates when the snippet was last modified.

### Snippet Update Response

- `SnippetUpdateResponse object { created_on, snippet_name, modified_on }`

  Contain the response result.

  - `created_on: string`

    Indicates when the snippet was created.

  - `snippet_name: string`

    Identify the snippet.

  - `modified_on: optional string`

    Indicates when the snippet was last modified.

### Snippet Delete Response

- `SnippetDeleteResponse = unknown`

  Contain the response result.

# Content

## Get a zone snippet content

**get** `/zones/{zone_id}/snippets/{snippet_name}/content`

Fetches the content of a snippet belonging to the zone.

### Path Parameters

- `zone_id: string`

  Use this field to specify the unique ID of the zone.

- `snippet_name: string`

  Identify the snippet.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/snippets/$SNIPPET_NAME/content \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

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
