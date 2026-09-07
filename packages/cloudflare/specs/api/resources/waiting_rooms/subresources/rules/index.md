# Rules

## List Waiting Room Rules

**get** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}/rules`

Lists rules for a waiting room.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional array of WaitingRoomRule`

  - `id: optional string`

    The ID of the rule.

  - `action: optional "bypass_waiting_room"`

    The action to take when the expression matches.

    - `"bypass_waiting_room"`

  - `description: optional string`

    The description of the rule.

  - `enabled: optional boolean`

    When set to true, the rule is enabled.

  - `expression: optional string`

    Criteria defining when there is a match for the current rule.

  - `last_updated: optional string`

  - `version: optional string`

    The version of the rule.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID/rules \
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
  "success": true,
  "result": [
    {
      "id": "25756b2dfe6e378a06b033b670413757",
      "action": "bypass_waiting_room",
      "description": "allow all traffic from 10.20.30.40",
      "enabled": true,
      "expression": "ip.src in {10.20.30.40}",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "version": "1"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Create Waiting Room Rule

**post** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}/rules`

Only available for the Waiting Room Advanced subscription. Creates a rule for a waiting room.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

### Body Parameters

- `rules: object { action, expression, description, enabled }`

  - `action: "bypass_waiting_room"`

    The action to take when the expression matches.

    - `"bypass_waiting_room"`

  - `expression: string`

    Criteria defining when there is a match for the current rule.

  - `description: optional string`

    The description of the rule.

  - `enabled: optional boolean`

    When set to true, the rule is enabled.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional array of WaitingRoomRule`

  - `id: optional string`

    The ID of the rule.

  - `action: optional "bypass_waiting_room"`

    The action to take when the expression matches.

    - `"bypass_waiting_room"`

  - `description: optional string`

    The description of the rule.

  - `enabled: optional boolean`

    When set to true, the rule is enabled.

  - `expression: optional string`

    Criteria defining when there is a match for the current rule.

  - `last_updated: optional string`

  - `version: optional string`

    The version of the rule.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID/rules \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": "bypass_waiting_room",
          "expression": "ip.src in {10.20.30.40}",
          "description": "allow all traffic from 10.20.30.40",
          "enabled": true
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
  "success": true,
  "result": [
    {
      "id": "25756b2dfe6e378a06b033b670413757",
      "action": "bypass_waiting_room",
      "description": "allow all traffic from 10.20.30.40",
      "enabled": true,
      "expression": "ip.src in {10.20.30.40}",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "version": "1"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Replace Waiting Room Rules

**put** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}/rules`

Only available for the Waiting Room Advanced subscription. Replaces all rules for a waiting room.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

### Body Parameters

- `rules: array of object { action, expression, description, enabled }`

  - `action: "bypass_waiting_room"`

    The action to take when the expression matches.

    - `"bypass_waiting_room"`

  - `expression: string`

    Criteria defining when there is a match for the current rule.

  - `description: optional string`

    The description of the rule.

  - `enabled: optional boolean`

    When set to true, the rule is enabled.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional array of WaitingRoomRule`

  - `id: optional string`

    The ID of the rule.

  - `action: optional "bypass_waiting_room"`

    The action to take when the expression matches.

    - `"bypass_waiting_room"`

  - `description: optional string`

    The description of the rule.

  - `enabled: optional boolean`

    When set to true, the rule is enabled.

  - `expression: optional string`

    Criteria defining when there is a match for the current rule.

  - `last_updated: optional string`

  - `version: optional string`

    The version of the rule.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID/rules \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "action": "bypass_waiting_room",
            "expression": "ip.src in {10.20.30.40}",
            "description": "allow all traffic from 10.20.30.40",
            "enabled": true
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
  "success": true,
  "result": [
    {
      "id": "25756b2dfe6e378a06b033b670413757",
      "action": "bypass_waiting_room",
      "description": "allow all traffic from 10.20.30.40",
      "enabled": true,
      "expression": "ip.src in {10.20.30.40}",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "version": "1"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Patch Waiting Room Rule

**patch** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}/rules/{rule_id}`

Patches a rule for a waiting room.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

- `rule_id: string`

  The ID of the rule.

### Body Parameters

- `action: "bypass_waiting_room"`

  The action to take when the expression matches.

  - `"bypass_waiting_room"`

- `expression: string`

  Criteria defining when there is a match for the current rule.

- `description: optional string`

  The description of the rule.

- `enabled: optional boolean`

  When set to true, the rule is enabled.

- `position: optional object { index }  or object { before }  or object { after }`

  Reorder the position of a rule

  - `Index object { index }`

    - `index: optional number`

      Places the rule in the exact position specified by the integer number <POSITION_NUMBER>. Position numbers start with 1. Existing rules in the ruleset from the specified position number onward are shifted one position (no rule is overwritten).

  - `Before object { before }`

    - `before: optional string`

      Places the rule before rule <RULE_ID>. Use this argument with an empty rule ID value ("") to set the rule as the first rule in the ruleset.

  - `After object { after }`

    - `after: optional string`

      Places the rule after rule <RULE_ID>. Use this argument with an empty rule ID value ("") to set the rule as the last rule in the ruleset.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional array of WaitingRoomRule`

  - `id: optional string`

    The ID of the rule.

  - `action: optional "bypass_waiting_room"`

    The action to take when the expression matches.

    - `"bypass_waiting_room"`

  - `description: optional string`

    The description of the rule.

  - `enabled: optional boolean`

    When set to true, the rule is enabled.

  - `expression: optional string`

    Criteria defining when there is a match for the current rule.

  - `last_updated: optional string`

  - `version: optional string`

    The version of the rule.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID/rules/$RULE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": "bypass_waiting_room",
          "expression": "ip.src in {10.20.30.40}",
          "description": "allow all traffic from 10.20.30.40",
          "enabled": true
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
  "success": true,
  "result": [
    {
      "id": "25756b2dfe6e378a06b033b670413757",
      "action": "bypass_waiting_room",
      "description": "allow all traffic from 10.20.30.40",
      "enabled": true,
      "expression": "ip.src in {10.20.30.40}",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "version": "1"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Delete Waiting Room Rule

**delete** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}/rules/{rule_id}`

Deletes a rule for a waiting room.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

- `rule_id: string`

  The ID of the rule.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional array of WaitingRoomRule`

  - `id: optional string`

    The ID of the rule.

  - `action: optional "bypass_waiting_room"`

    The action to take when the expression matches.

    - `"bypass_waiting_room"`

  - `description: optional string`

    The description of the rule.

  - `enabled: optional boolean`

    When set to true, the rule is enabled.

  - `expression: optional string`

    Criteria defining when there is a match for the current rule.

  - `last_updated: optional string`

  - `version: optional string`

    The version of the rule.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID/rules/$RULE_ID \
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
  "success": true,
  "result": [
    {
      "id": "25756b2dfe6e378a06b033b670413757",
      "action": "bypass_waiting_room",
      "description": "allow all traffic from 10.20.30.40",
      "enabled": true,
      "expression": "ip.src in {10.20.30.40}",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "version": "1"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Domain Types

### Waiting Room Rule

- `WaitingRoomRule object { id, action, description, 4 more }`

  - `id: optional string`

    The ID of the rule.

  - `action: optional "bypass_waiting_room"`

    The action to take when the expression matches.

    - `"bypass_waiting_room"`

  - `description: optional string`

    The description of the rule.

  - `enabled: optional boolean`

    When set to true, the rule is enabled.

  - `expression: optional string`

    Criteria defining when there is a match for the current rule.

  - `last_updated: optional string`

  - `version: optional string`

    The version of the rule.
