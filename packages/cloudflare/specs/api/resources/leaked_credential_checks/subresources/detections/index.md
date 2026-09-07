# Detections

## List Leaked Credential Checks Custom Detections

**get** `/zones/{zone_id}/leaked-credential-checks/detections`

List user-defined detection patterns for Leaked Credential Checks.

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

- `result: array of object { id, password, username }`

  - `id: optional string`

    Defines the unique ID for this custom detection.

  - `password: optional string`

    Defines ehe ruleset expression to use in matching the password in a request.

  - `username: optional string`

    Defines the ruleset expression to use in matching the username in a request.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/leaked-credential-checks/detections \
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
      "id": "18a14bafaa8eb1df04ce683ec18c765e",
      "password": "lookup_json_string(http.request.body.raw, \"secret\")",
      "username": "lookup_json_string(http.request.body.raw, \"user\")"
    }
  ],
  "success": true
}
```

## Create Leaked Credential Checks Custom Detection

**post** `/zones/{zone_id}/leaked-credential-checks/detections`

Create user-defined detection pattern for Leaked Credential Checks.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

### Body Parameters

- `password: optional string`

  Defines ehe ruleset expression to use in matching the password in a request.

- `username: optional string`

  Defines the ruleset expression to use in matching the username in a request.

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

- `result: object { id, password, username }`

  Defines a custom set of username/password expressions to match Leaked Credential Checks on.

  - `id: optional string`

    Defines the unique ID for this custom detection.

  - `password: optional string`

    Defines ehe ruleset expression to use in matching the password in a request.

  - `username: optional string`

    Defines the ruleset expression to use in matching the username in a request.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/leaked-credential-checks/detections \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "password": "lookup_json_string(http.request.body.raw, \\"secret\\")",
          "username": "lookup_json_string(http.request.body.raw, \\"user\\")"
        }'
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
  "result": {
    "id": "18a14bafaa8eb1df04ce683ec18c765e",
    "password": "lookup_json_string(http.request.body.raw, \"secret\")",
    "username": "lookup_json_string(http.request.body.raw, \"user\")"
  },
  "success": true
}
```

## Get Leaked Credential Checks Custom Detection

**get** `/zones/{zone_id}/leaked-credential-checks/detections/{detection_id}`

Get user-defined detection pattern for Leaked Credential Checks.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

- `detection_id: string`

  Defines the unique ID for this custom detection.

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

- `result: object { id, password, username }`

  Defines a custom set of username/password expressions to match Leaked Credential Checks on.

  - `id: optional string`

    Defines the unique ID for this custom detection.

  - `password: optional string`

    Defines ehe ruleset expression to use in matching the password in a request.

  - `username: optional string`

    Defines the ruleset expression to use in matching the username in a request.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/leaked-credential-checks/detections/$DETECTION_ID \
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
  "result": {
    "id": "18a14bafaa8eb1df04ce683ec18c765e",
    "password": "lookup_json_string(http.request.body.raw, \"secret\")",
    "username": "lookup_json_string(http.request.body.raw, \"user\")"
  },
  "success": true
}
```

## Update Leaked Credential Checks Custom Detection

**put** `/zones/{zone_id}/leaked-credential-checks/detections/{detection_id}`

Update user-defined detection pattern for Leaked Credential Checks.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

- `detection_id: string`

  Defines the unique ID for this custom detection.

### Body Parameters

- `password: optional string`

  Defines ehe ruleset expression to use in matching the password in a request.

- `username: optional string`

  Defines the ruleset expression to use in matching the username in a request.

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

- `result: object { id, password, username }`

  Defines a custom set of username/password expressions to match Leaked Credential Checks on.

  - `id: optional string`

    Defines the unique ID for this custom detection.

  - `password: optional string`

    Defines ehe ruleset expression to use in matching the password in a request.

  - `username: optional string`

    Defines the ruleset expression to use in matching the username in a request.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/leaked-credential-checks/detections/$DETECTION_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "password": "lookup_json_string(http.request.body.raw, \\"secret\\")",
          "username": "lookup_json_string(http.request.body.raw, \\"user\\")"
        }'
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
  "result": {
    "id": "18a14bafaa8eb1df04ce683ec18c765e",
    "password": "lookup_json_string(http.request.body.raw, \"secret\")",
    "username": "lookup_json_string(http.request.body.raw, \"user\")"
  },
  "success": true
}
```

## Delete Leaked Credential Checks Custom Detection

**delete** `/zones/{zone_id}/leaked-credential-checks/detections/{detection_id}`

Remove user-defined detection pattern for Leaked Credential Checks.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

- `detection_id: string`

  Defines the unique ID for this custom detection.

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

- `result: unknown`

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/leaked-credential-checks/detections/$DETECTION_ID \
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
  "result": {},
  "success": true
}
```

## Domain Types

### Detection List Response

- `DetectionListResponse object { id, password, username }`

  Defines a custom set of username/password expressions to match Leaked Credential Checks on.

  - `id: optional string`

    Defines the unique ID for this custom detection.

  - `password: optional string`

    Defines ehe ruleset expression to use in matching the password in a request.

  - `username: optional string`

    Defines the ruleset expression to use in matching the username in a request.

### Detection Create Response

- `DetectionCreateResponse object { id, password, username }`

  Defines a custom set of username/password expressions to match Leaked Credential Checks on.

  - `id: optional string`

    Defines the unique ID for this custom detection.

  - `password: optional string`

    Defines ehe ruleset expression to use in matching the password in a request.

  - `username: optional string`

    Defines the ruleset expression to use in matching the username in a request.

### Detection Get Response

- `DetectionGetResponse object { id, password, username }`

  Defines a custom set of username/password expressions to match Leaked Credential Checks on.

  - `id: optional string`

    Defines the unique ID for this custom detection.

  - `password: optional string`

    Defines ehe ruleset expression to use in matching the password in a request.

  - `username: optional string`

    Defines the ruleset expression to use in matching the username in a request.

### Detection Update Response

- `DetectionUpdateResponse object { id, password, username }`

  Defines a custom set of username/password expressions to match Leaked Credential Checks on.

  - `id: optional string`

    Defines the unique ID for this custom detection.

  - `password: optional string`

    Defines ehe ruleset expression to use in matching the password in a request.

  - `username: optional string`

    Defines the ruleset expression to use in matching the username in a request.

### Detection Delete Response

- `DetectionDeleteResponse = unknown`
