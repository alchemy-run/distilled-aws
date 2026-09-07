## Retrieve discovered operations on a zone rendered as OpenAPI schemas

**get** `/zones/{zone_id}/api_gateway/discovery`

Retrieve the most up to date view of discovered operations, rendered as OpenAPI schemas

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

- `result: object { schemas, timestamp }`

  - `schemas: array of unknown`

  - `timestamp: string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/discovery \
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
    "schemas": [
      {
        "info": {
          "title": "OpenAPI JSON schema for www.example.com",
          "version": "1.0"
        },
        "openapi": "3.0.0",
        "paths": {
          "... Further paths ...": {},
          "/api/v1/users/{var1}": {
            "get": {
              "parameters": [
                {
                  "in": "path",
                  "name": "var1",
                  "required": true,
                  "schema": {
                    "type": "string"
                  }
                }
              ]
            }
          }
        },
        "servers": [
          {
            "url": "www.example.com"
          }
        ]
      }
    ],
    "timestamp": "2014-01-01T05:20:00.12345Z"
  },
  "success": true
}
```
