# Payloads

## List Existing Custom Scan Expressions

**get** `/zones/{zone_id}/content-upload-scan/payloads`

Get a list of existing custom scan expressions for Content Scanning.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: array of object { id, payload }`

  - `id: optional string`

    defines the unique ID for this custom scan expression.

  - `payload: optional string`

    Defines the ruleset expression to use in matching content objects.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/content-upload-scan/payloads \
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
      "id": "a350a054caa840c9becd89c3b4f0195b",
      "payload": "lookup_json_string(http.request.body.raw, \"file\")"
    }
  ],
  "success": true
}
```

## Add Custom Scan Expressions

**post** `/zones/{zone_id}/content-upload-scan/payloads`

Add custom scan expressions for Content Scanning.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

### Body Parameters

- `body: array of object { payload }`

  - `payload: string`

    Defines the ruleset expression to use in matching content objects.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: array of object { id, payload }`

  - `id: optional string`

    defines the unique ID for this custom scan expression.

  - `payload: optional string`

    Defines the ruleset expression to use in matching content objects.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/content-upload-scan/payloads \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "payload": "lookup_json_string(http.request.body.raw, \\"file\\")"
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
      "id": "a350a054caa840c9becd89c3b4f0195b",
      "payload": "lookup_json_string(http.request.body.raw, \"file\")"
    }
  ],
  "success": true
}
```

## Delete a Custom Scan Expression

**delete** `/zones/{zone_id}/content-upload-scan/payloads/{expression_id}`

Delete a Content Scan Custom Expression.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

- `expression_id: string`

  defines the unique ID for this custom scan expression.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: array of object { id, payload }`

  - `id: optional string`

    defines the unique ID for this custom scan expression.

  - `payload: optional string`

    Defines the ruleset expression to use in matching content objects.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/content-upload-scan/payloads/$EXPRESSION_ID \
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
      "id": "a350a054caa840c9becd89c3b4f0195b",
      "payload": "lookup_json_string(http.request.body.raw, \"file\")"
    }
  ],
  "success": true
}
```

## Domain Types

### Payload List Response

- `PayloadListResponse object { id, payload }`

  Defines a custom scan expression to match Content Scanning on.

  - `id: optional string`

    defines the unique ID for this custom scan expression.

  - `payload: optional string`

    Defines the ruleset expression to use in matching content objects.

### Payload Create Response

- `PayloadCreateResponse object { id, payload }`

  Defines a custom scan expression to match Content Scanning on.

  - `id: optional string`

    defines the unique ID for this custom scan expression.

  - `payload: optional string`

    Defines the ruleset expression to use in matching content objects.

### Payload Delete Response

- `PayloadDeleteResponse object { id, payload }`

  Defines a custom scan expression to match Content Scanning on.

  - `id: optional string`

    defines the unique ID for this custom scan expression.

  - `payload: optional string`

    Defines the ruleset expression to use in matching content objects.
