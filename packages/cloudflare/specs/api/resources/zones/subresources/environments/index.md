# Environments

## List zone environments

**get** `/zones/{zone_id}/environments`

List zone environments

### Path Parameters

- `zone_id: string`

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

- `result: object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/environments \
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
    "environments": [
      {
        "expression": "expression",
        "locked_on_deployment": true,
        "name": "name",
        "position": {
          "after": "yyy",
          "before": "xxx"
        },
        "ref": "ref",
        "version": 0,
        "http_application_id": "http_application_id"
      }
    ]
  },
  "success": true
}
```

## Create zone environments

**post** `/zones/{zone_id}/environments`

Create zone environments

### Path Parameters

- `zone_id: string`

### Body Parameters

- `environments: array of object { expression, locked_on_deployment, name, 4 more }`

  - `expression: string`

  - `locked_on_deployment: boolean`

  - `name: string`

  - `position: ListCursor`

    - `after: optional string`

    - `before: optional string`

  - `ref: string`

  - `version: number`

  - `http_application_id: optional string`

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

- `result: object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/environments \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "environments": [
            {
              "expression": "expression",
              "locked_on_deployment": true,
              "name": "name",
              "position": {},
              "ref": "ref",
              "version": 0
            }
          ]
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
    "environments": [
      {
        "expression": "expression",
        "locked_on_deployment": true,
        "name": "name",
        "position": {
          "after": "yyy",
          "before": "xxx"
        },
        "ref": "ref",
        "version": 0,
        "http_application_id": "http_application_id"
      }
    ]
  },
  "success": true
}
```

## Upsert zone environments

**put** `/zones/{zone_id}/environments`

Upsert zone environments

### Path Parameters

- `zone_id: string`

### Body Parameters

- `environments: array of object { expression, locked_on_deployment, name, 4 more }`

  - `expression: string`

  - `locked_on_deployment: boolean`

  - `name: string`

  - `position: ListCursor`

    - `after: optional string`

    - `before: optional string`

  - `ref: string`

  - `version: number`

  - `http_application_id: optional string`

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

- `result: object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/environments \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "environments": [
            {
              "expression": "expression",
              "locked_on_deployment": true,
              "name": "name",
              "position": {},
              "ref": "ref",
              "version": 0
            }
          ]
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
    "environments": [
      {
        "expression": "expression",
        "locked_on_deployment": true,
        "name": "name",
        "position": {
          "after": "yyy",
          "before": "xxx"
        },
        "ref": "ref",
        "version": 0,
        "http_application_id": "http_application_id"
      }
    ]
  },
  "success": true
}
```

## Partially update zone environments

**patch** `/zones/{zone_id}/environments`

Partially update zone environments

### Path Parameters

- `zone_id: string`

### Body Parameters

- `environments: array of object { expression, locked_on_deployment, name, 4 more }`

  - `expression: string`

  - `locked_on_deployment: boolean`

  - `name: string`

  - `position: ListCursor`

    - `after: optional string`

    - `before: optional string`

  - `ref: string`

  - `version: number`

  - `http_application_id: optional string`

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

- `result: object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/environments \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "environments": [
            {
              "expression": "expression",
              "locked_on_deployment": true,
              "name": "name",
              "position": {},
              "ref": "ref",
              "version": 0
            }
          ]
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
    "environments": [
      {
        "expression": "expression",
        "locked_on_deployment": true,
        "name": "name",
        "position": {
          "after": "yyy",
          "before": "xxx"
        },
        "ref": "ref",
        "version": 0,
        "http_application_id": "http_application_id"
      }
    ]
  },
  "success": true
}
```

## Delete zone environment

**delete** `/zones/{zone_id}/environments/{environment_id}`

Delete zone environment

### Path Parameters

- `zone_id: string`

- `environment_id: string`

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

- `result: object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/environments/$ENVIRONMENT_ID \
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
    "environments": [
      {
        "expression": "expression",
        "locked_on_deployment": true,
        "name": "name",
        "position": {
          "after": "yyy",
          "before": "xxx"
        },
        "ref": "ref",
        "version": 0,
        "http_application_id": "http_application_id"
      }
    ]
  },
  "success": true
}
```

## Roll back zone environment

**post** `/zones/{zone_id}/environments/{environment_id}/rollback`

Roll back zone environment

### Path Parameters

- `zone_id: string`

- `environment_id: string`

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

- `result: object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/environments/$ENVIRONMENT_ID/rollback \
    -X POST \
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
    "environments": [
      {
        "expression": "expression",
        "locked_on_deployment": true,
        "name": "name",
        "position": {
          "after": "yyy",
          "before": "xxx"
        },
        "ref": "ref",
        "version": 0,
        "http_application_id": "http_application_id"
      }
    ]
  },
  "success": true
}
```

## Domain Types

### Environment List Response

- `EnvironmentListResponse object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

### Environment Create Response

- `EnvironmentCreateResponse object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

### Environment Update Response

- `EnvironmentUpdateResponse object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

### Environment Edit Response

- `EnvironmentEditResponse object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

### Environment Delete Response

- `EnvironmentDeleteResponse object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

### Environment Rollback Response

- `EnvironmentRollbackResponse object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`
