# Settings

## Get global schema validation settings

**get** `/zones/{zone_id}/schema_validation/settings`

Retrieves the current global schema validation settings for a zone.

### Path Parameters

- `zone_id: string`

  Identifier.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { validation_default_mitigation_action, validation_override_mitigation_action }`

  - `validation_default_mitigation_action: "none" or "log" or "block"`

    The default mitigation action used

    Mitigation actions are as follows:

    - `log` - log request when request does not conform to schema
    - `block` - deny access to the site when request does not conform to schema
    - `none` - skip running schema validation

    - `"none"`

    - `"log"`

    - `"block"`

  - `validation_override_mitigation_action: optional "none"`

    When not null, this overrides global both zone level and operation level mitigation actions. This can serve as a quick way to disable schema validation for the whole zone.

    - `"none"` will skip running schema validation entirely for the request

    - `"none"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/settings \
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
    "validation_default_mitigation_action": "block",
    "validation_override_mitigation_action": "none"
  },
  "success": true
}
```

## Update global schema validation settings

**put** `/zones/{zone_id}/schema_validation/settings`

Fully updates global schema validation settings for a zone, replacing existing configuration.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `validation_default_mitigation_action: "none" or "log" or "block"`

  The default mitigation action used
  Mitigation actions are as follows:

  - `"log"` - log request when request does not conform to schema
  - `"block"` - deny access to the site when request does not conform to schema
  - `"none"` - skip running schema validation

  - `"none"`

  - `"log"`

  - `"block"`

- `validation_override_mitigation_action: optional "none"`

  When set, this overrides both zone level and operation level mitigation actions.

  - `"none"` - skip running schema validation entirely for the request
  - `null` - clears any existing override

  - `"none"`

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { validation_default_mitigation_action, validation_override_mitigation_action }`

  - `validation_default_mitigation_action: "none" or "log" or "block"`

    The default mitigation action used

    Mitigation actions are as follows:

    - `log` - log request when request does not conform to schema
    - `block` - deny access to the site when request does not conform to schema
    - `none` - skip running schema validation

    - `"none"`

    - `"log"`

    - `"block"`

  - `validation_override_mitigation_action: optional "none"`

    When not null, this overrides global both zone level and operation level mitigation actions. This can serve as a quick way to disable schema validation for the whole zone.

    - `"none"` will skip running schema validation entirely for the request

    - `"none"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/settings \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "validation_default_mitigation_action": "block"
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
    "validation_default_mitigation_action": "block",
    "validation_override_mitigation_action": "none"
  },
  "success": true
}
```

## Edit global schema validation settings

**patch** `/zones/{zone_id}/schema_validation/settings`

Partially updates global schema validation settings for a zone using PATCH semantics.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `validation_default_mitigation_action: optional "none" or "log" or "block"`

  The default mitigation action used
  Mitigation actions are as follows:

  - `"log"` - log request when request does not conform to schema
  - `"block"` - deny access to the site when request does not conform to schema
  - `"none"` - skip running schema validation

  - `"none"`

  - `"log"`

  - `"block"`

- `validation_override_mitigation_action: optional "none"`

  When set, this overrides both zone level and operation level mitigation actions.

  - `"none"` - skip running schema validation entirely for the request
  - `null` - clears any existing override

  - `"none"`

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { validation_default_mitigation_action, validation_override_mitigation_action }`

  - `validation_default_mitigation_action: "none" or "log" or "block"`

    The default mitigation action used

    Mitigation actions are as follows:

    - `log` - log request when request does not conform to schema
    - `block` - deny access to the site when request does not conform to schema
    - `none` - skip running schema validation

    - `"none"`

    - `"log"`

    - `"block"`

  - `validation_override_mitigation_action: optional "none"`

    When not null, this overrides global both zone level and operation level mitigation actions. This can serve as a quick way to disable schema validation for the whole zone.

    - `"none"` will skip running schema validation entirely for the request

    - `"none"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/settings \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "validation_default_mitigation_action": "block"
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
    "validation_default_mitigation_action": "block",
    "validation_override_mitigation_action": "none"
  },
  "success": true
}
```

## Domain Types

### Setting Get Response

- `SettingGetResponse object { validation_default_mitigation_action, validation_override_mitigation_action }`

  - `validation_default_mitigation_action: "none" or "log" or "block"`

    The default mitigation action used

    Mitigation actions are as follows:

    - `log` - log request when request does not conform to schema
    - `block` - deny access to the site when request does not conform to schema
    - `none` - skip running schema validation

    - `"none"`

    - `"log"`

    - `"block"`

  - `validation_override_mitigation_action: optional "none"`

    When not null, this overrides global both zone level and operation level mitigation actions. This can serve as a quick way to disable schema validation for the whole zone.

    - `"none"` will skip running schema validation entirely for the request

    - `"none"`

### Setting Update Response

- `SettingUpdateResponse object { validation_default_mitigation_action, validation_override_mitigation_action }`

  - `validation_default_mitigation_action: "none" or "log" or "block"`

    The default mitigation action used

    Mitigation actions are as follows:

    - `log` - log request when request does not conform to schema
    - `block` - deny access to the site when request does not conform to schema
    - `none` - skip running schema validation

    - `"none"`

    - `"log"`

    - `"block"`

  - `validation_override_mitigation_action: optional "none"`

    When not null, this overrides global both zone level and operation level mitigation actions. This can serve as a quick way to disable schema validation for the whole zone.

    - `"none"` will skip running schema validation entirely for the request

    - `"none"`

### Setting Edit Response

- `SettingEditResponse object { validation_default_mitigation_action, validation_override_mitigation_action }`

  - `validation_default_mitigation_action: "none" or "log" or "block"`

    The default mitigation action used

    Mitigation actions are as follows:

    - `log` - log request when request does not conform to schema
    - `block` - deny access to the site when request does not conform to schema
    - `none` - skip running schema validation

    - `"none"`

    - `"log"`

    - `"block"`

  - `validation_override_mitigation_action: optional "none"`

    When not null, this overrides global both zone level and operation level mitigation actions. This can serve as a quick way to disable schema validation for the whole zone.

    - `"none"` will skip running schema validation entirely for the request

    - `"none"`

# Operations

## List per-operation schema validation settings

**get** `/zones/{zone_id}/schema_validation/settings/operations`

Lists all per-operation schema validation settings configured for the zone.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: array of object { mitigation_action, operation_id }`

  - `mitigation_action: "log" or "block" or "none"`

    When set, this applies a mitigation action to this operation which supersedes a global schema validation setting just for this operation

    - `"log"` - log request when request does not conform to schema for this operation
    - `"block"` - deny access to the site when request does not conform to schema for this operation
    - `"none"` - will skip mitigation for this operation

    - `"log"`

    - `"block"`

    - `"none"`

  - `operation_id: string`

    UUID.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/settings/operations \
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
      "mitigation_action": "block",
      "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Get per-operation schema validation setting

**get** `/zones/{zone_id}/schema_validation/settings/operations/{operation_id}`

Retrieves the schema validation settings configured for a specific API operation.

### Path Parameters

- `zone_id: string`

  Identifier.

- `operation_id: string`

  UUID.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { mitigation_action, operation_id }`

  - `mitigation_action: "log" or "block" or "none"`

    When set, this applies a mitigation action to this operation which supersedes a global schema validation setting just for this operation

    - `"log"` - log request when request does not conform to schema for this operation
    - `"block"` - deny access to the site when request does not conform to schema for this operation
    - `"none"` - will skip mitigation for this operation

    - `"log"`

    - `"block"`

    - `"none"`

  - `operation_id: string`

    UUID.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/settings/operations/$OPERATION_ID \
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
    "mitigation_action": "block",
    "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
  },
  "success": true
}
```

## Update per-operation schema validation setting

**put** `/zones/{zone_id}/schema_validation/settings/operations/{operation_id}`

Fully updates schema validation settings for a specific API operation.

### Path Parameters

- `zone_id: string`

  Identifier.

- `operation_id: string`

  UUID.

### Body Parameters

- `mitigation_action: "log" or "block" or "none"`

  When set, this applies a mitigation action to this operation

  - `"log"` - log request when request does not conform to schema for this operation
  - `"block"` - deny access to the site when request does not conform to schema for this operation
  - `"none"` - will skip mitigation for this operation
  - `null` - clears any mitigation action

  - `"log"`

  - `"block"`

  - `"none"`

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { mitigation_action, operation_id }`

  - `mitigation_action: "log" or "block" or "none"`

    When set, this applies a mitigation action to this operation which supersedes a global schema validation setting just for this operation

    - `"log"` - log request when request does not conform to schema for this operation
    - `"block"` - deny access to the site when request does not conform to schema for this operation
    - `"none"` - will skip mitigation for this operation

    - `"log"`

    - `"block"`

    - `"none"`

  - `operation_id: string`

    UUID.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/settings/operations/$OPERATION_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "mitigation_action": "block"
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
    "mitigation_action": "block",
    "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
  },
  "success": true
}
```

## Bulk edit per-operation schema validation settings

**patch** `/zones/{zone_id}/schema_validation/settings/operations`

Updates schema validation settings for multiple API operations in a single request. Efficient for applying consistent validation rules across endpoints.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `body: map[object { mitigation_action } ]`

  - `mitigation_action: optional "none" or "log" or "block"`

    Mitigation actions are as follows:

    * `log` - log request when request does not conform to schema * `block` - deny access to the site when request does not conform to schema * `none` - skip running schema validation * null - clears any existing per-operation setting

    - `"none"`

    - `"log"`

    - `"block"`

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: map[object { mitigation_action, operation_id } ]`

  Operation ID to per operation setting mapping

  - `mitigation_action: "log" or "block" or "none"`

    When set, this applies a mitigation action to this operation which supersedes a global schema validation setting just for this operation

    - `"log"` - log request when request does not conform to schema for this operation
    - `"block"` - deny access to the site when request does not conform to schema for this operation
    - `"none"` - will skip mitigation for this operation

    - `"log"`

    - `"block"`

    - `"none"`

  - `operation_id: string`

    UUID.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/settings/operations \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "3818d821-5901-4147-a474-f5f5aec1d54e": {
            "mitigation_action": "log"
          },
          "b17c8043-99a0-4202-b7d9-8f7cdbee02cd": {
            "mitigation_action": "block"
          }
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
    "foo": {
      "mitigation_action": "block",
      "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
    }
  },
  "success": true
}
```

## Delete per-operation schema validation setting

**delete** `/zones/{zone_id}/schema_validation/settings/operations/{operation_id}`

Removes custom schema validation settings for a specific API operation, reverting to zone-level defaults.

### Path Parameters

- `zone_id: string`

  Identifier.

- `operation_id: string`

  UUID.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { operation_id }`

  - `operation_id: optional string`

    UUID.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/settings/operations/$OPERATION_ID \
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
  "result": {
    "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
  },
  "success": true
}
```

## Domain Types

### Operation List Response

- `OperationListResponse object { mitigation_action, operation_id }`

  - `mitigation_action: "log" or "block" or "none"`

    When set, this applies a mitigation action to this operation which supersedes a global schema validation setting just for this operation

    - `"log"` - log request when request does not conform to schema for this operation
    - `"block"` - deny access to the site when request does not conform to schema for this operation
    - `"none"` - will skip mitigation for this operation

    - `"log"`

    - `"block"`

    - `"none"`

  - `operation_id: string`

    UUID.

### Operation Get Response

- `OperationGetResponse object { mitigation_action, operation_id }`

  - `mitigation_action: "log" or "block" or "none"`

    When set, this applies a mitigation action to this operation which supersedes a global schema validation setting just for this operation

    - `"log"` - log request when request does not conform to schema for this operation
    - `"block"` - deny access to the site when request does not conform to schema for this operation
    - `"none"` - will skip mitigation for this operation

    - `"log"`

    - `"block"`

    - `"none"`

  - `operation_id: string`

    UUID.

### Operation Update Response

- `OperationUpdateResponse object { mitigation_action, operation_id }`

  - `mitigation_action: "log" or "block" or "none"`

    When set, this applies a mitigation action to this operation which supersedes a global schema validation setting just for this operation

    - `"log"` - log request when request does not conform to schema for this operation
    - `"block"` - deny access to the site when request does not conform to schema for this operation
    - `"none"` - will skip mitigation for this operation

    - `"log"`

    - `"block"`

    - `"none"`

  - `operation_id: string`

    UUID.

### Operation Bulk Edit Response

- `OperationBulkEditResponse = map[object { mitigation_action, operation_id } ]`

  Operation ID to per operation setting mapping

  - `mitigation_action: "log" or "block" or "none"`

    When set, this applies a mitigation action to this operation which supersedes a global schema validation setting just for this operation

    - `"log"` - log request when request does not conform to schema for this operation
    - `"block"` - deny access to the site when request does not conform to schema for this operation
    - `"none"` - will skip mitigation for this operation

    - `"log"`

    - `"block"`

    - `"none"`

  - `operation_id: string`

    UUID.

### Operation Delete Response

- `OperationDeleteResponse object { operation_id }`

  - `operation_id: optional string`

    UUID.
