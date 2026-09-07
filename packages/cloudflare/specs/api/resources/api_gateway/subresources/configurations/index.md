# Configurations

## Retrieve information about specific configuration properties

**get** `/zones/{zone_id}/api_gateway/configuration`

Gets the current API Shield configuration settings for a zone, including validation behavior and enforcement mode.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `normalize: optional boolean`

  Ensures that the configuration is written or retrieved in normalized fashion

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: Configuration`

  - `auth_id_characteristics: array of object { name, type }  or object { name, type }`

    - `APIShieldAuthIDCharacteristic object { name, type }`

      Auth ID Characteristic

      - `name: string`

        The name of the characteristic field, i.e., the header or cookie name.

      - `type: "header" or "cookie"`

        The type of characteristic.

        - `"header"`

        - `"cookie"`

    - `APIShieldAuthIDCharacteristicJWTClaim object { name, type }`

      Auth ID Characteristic extracted from JWT Token Claims

      - `name: string`

        Claim location expressed as `$(token_config_id):$(json_path)`, where `token_config_id`
        is the ID of the token configuration used in validating the JWT, and `json_path` is a RFC 9535
        JSONPath (https://goessner.net/articles/JsonPath/, https://www.rfc-editor.org/rfc/rfc9535.html).
        The JSONPath expression may be in dot or bracket notation, may only specify literal keys
        or array indexes, and must return a singleton value, which will be interpreted as a string.

      - `type: "jwt"`

        The type of characteristic.

        - `"jwt"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/configuration \
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
    "auth_id_characteristics": [
      {
        "name": "authorization",
        "type": "header"
      }
    ]
  },
  "success": true
}
```

## Update configuration properties

**put** `/zones/{zone_id}/api_gateway/configuration`

Updates API Shield configuration settings for a zone. Can modify validation strictness, enforcement mode, and other global settings.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `normalize: optional boolean`

  Ensures that the configuration is written or retrieved in normalized fashion

### Body Parameters

- `auth_id_characteristics: array of object { name, type }  or object { name, type }`

  - `APIShieldAuthIDCharacteristic object { name, type }`

    Auth ID Characteristic

    - `name: string`

      The name of the characteristic field, i.e., the header or cookie name.

    - `type: "header" or "cookie"`

      The type of characteristic.

      - `"header"`

      - `"cookie"`

  - `APIShieldAuthIDCharacteristicJWTClaim object { name, type }`

    Auth ID Characteristic extracted from JWT Token Claims

    - `name: string`

      Claim location expressed as `$(token_config_id):$(json_path)`, where `token_config_id`
      is the ID of the token configuration used in validating the JWT, and `json_path` is a RFC 9535
      JSONPath (https://goessner.net/articles/JsonPath/, https://www.rfc-editor.org/rfc/rfc9535.html).
      The JSONPath expression may be in dot or bracket notation, may only specify literal keys
      or array indexes, and must return a singleton value, which will be interpreted as a string.

    - `type: "jwt"`

      The type of characteristic.

      - `"jwt"`

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: Configuration`

  - `auth_id_characteristics: array of object { name, type }  or object { name, type }`

    - `APIShieldAuthIDCharacteristic object { name, type }`

      Auth ID Characteristic

      - `name: string`

        The name of the characteristic field, i.e., the header or cookie name.

      - `type: "header" or "cookie"`

        The type of characteristic.

        - `"header"`

        - `"cookie"`

    - `APIShieldAuthIDCharacteristicJWTClaim object { name, type }`

      Auth ID Characteristic extracted from JWT Token Claims

      - `name: string`

        Claim location expressed as `$(token_config_id):$(json_path)`, where `token_config_id`
        is the ID of the token configuration used in validating the JWT, and `json_path` is a RFC 9535
        JSONPath (https://goessner.net/articles/JsonPath/, https://www.rfc-editor.org/rfc/rfc9535.html).
        The JSONPath expression may be in dot or bracket notation, may only specify literal keys
        or array indexes, and must return a singleton value, which will be interpreted as a string.

      - `type: "jwt"`

        The type of characteristic.

        - `"jwt"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/configuration \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "auth_id_characteristics": [
            {
              "name": "authorization",
              "type": "header"
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
    "auth_id_characteristics": [
      {
        "name": "authorization",
        "type": "header"
      }
    ]
  },
  "success": true
}
```

## Domain Types

### Configuration

- `Configuration object { auth_id_characteristics }`

  - `auth_id_characteristics: array of object { name, type }  or object { name, type }`

    - `APIShieldAuthIDCharacteristic object { name, type }`

      Auth ID Characteristic

      - `name: string`

        The name of the characteristic field, i.e., the header or cookie name.

      - `type: "header" or "cookie"`

        The type of characteristic.

        - `"header"`

        - `"cookie"`

    - `APIShieldAuthIDCharacteristicJWTClaim object { name, type }`

      Auth ID Characteristic extracted from JWT Token Claims

      - `name: string`

        Claim location expressed as `$(token_config_id):$(json_path)`, where `token_config_id`
        is the ID of the token configuration used in validating the JWT, and `json_path` is a RFC 9535
        JSONPath (https://goessner.net/articles/JsonPath/, https://www.rfc-editor.org/rfc/rfc9535.html).
        The JSONPath expression may be in dot or bracket notation, may only specify literal keys
        or array indexes, and must return a singleton value, which will be interpreted as a string.

      - `type: "jwt"`

        The type of characteristic.

        - `"jwt"`
