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
