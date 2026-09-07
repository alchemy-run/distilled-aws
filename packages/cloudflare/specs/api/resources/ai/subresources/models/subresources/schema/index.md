# Schema

## Get Model Schema

**get** `/accounts/{account_id}/ai/models/schema`

Retrieves the input and output JSON schema definition for a Workers AI model.

### Path Parameters

- `account_id: string`

### Query Parameters

- `model: string`

  Model Name

### Returns

- `result: object { input, output }`

  - `input: object { additionalProperties, description, type }`

    - `additionalProperties: boolean`

    - `description: string`

    - `type: string`

  - `output: object { additionalProperties, description, type }`

    - `additionalProperties: boolean`

    - `description: string`

    - `type: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/models/schema \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "input": {
      "additionalProperties": true,
      "description": "JSON Schema definition for the model's input parameters",
      "type": "object"
    },
    "output": {
      "additionalProperties": true,
      "description": "JSON Schema definition for the model's output format",
      "type": "object"
    }
  },
  "success": true
}
```

## Domain Types

### Schema Get Response

- `SchemaGetResponse object { input, output }`

  - `input: object { additionalProperties, description, type }`

    - `additionalProperties: boolean`

    - `description: string`

    - `type: string`

  - `output: object { additionalProperties, description, type }`

    - `additionalProperties: boolean`

    - `description: string`

    - `type: string`
