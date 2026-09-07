## Retrieve operations and features as OpenAPI schemas

**get** `/zones/{zone_id}/api_gateway/schemas`

Retrieves API operations and their features exported as OpenAPI schemas.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `feature: optional array of "thresholds" or "parameter_schemas" or "schema_info"`

  Add feature(s) to the results. The feature name that is given here corresponds to the resulting feature object. Have a look at the top-level object description for more details on the specific meaning.

  - `"thresholds"`

  - `"parameter_schemas"`

  - `"schema_info"`

- `host: optional array of string`

  Receive schema only for the given host(s).

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { schemas, timestamp }`

  - `schemas: optional array of unknown`

  - `timestamp: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/schemas \
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
    "timestamp": "timestamp"
  },
  "success": true
}
```
