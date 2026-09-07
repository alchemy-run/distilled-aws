## Put Rules

**put** `/zones/{zone_id}/cloud_connector/rules`

Updates Cloud Connector rules for a zone, replacing the existing rule configuration.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `rules: optional array of object { id, description, enabled, 3 more }`

  - `id: optional string`

  - `description: optional string`

  - `enabled: optional boolean`

  - `expression: optional string`

  - `parameters: optional object { host }`

    Parameters of Cloud Connector Rule

    - `host: optional string`

      Host to perform Cloud Connection to

  - `provider: optional "aws_s3" or "cloudflare_r2" or "gcp_storage" or "azure_storage"`

    Cloud Provider type

    - `"aws_s3"`

    - `"cloudflare_r2"`

    - `"gcp_storage"`

    - `"azure_storage"`

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

- `result: optional array of object { id, description, enabled, 3 more }`

  List of Cloud Connector rules

  - `id: optional string`

  - `description: optional string`

  - `enabled: optional boolean`

  - `expression: optional string`

  - `parameters: optional object { host }`

    Parameters of Cloud Connector Rule

    - `host: optional string`

      Host to perform Cloud Connection to

  - `provider: optional "aws_s3" or "cloudflare_r2" or "gcp_storage" or "azure_storage"`

    Cloud Provider type

    - `"aws_s3"`

    - `"cloudflare_r2"`

    - `"gcp_storage"`

    - `"azure_storage"`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cloud_connector/rules \
    -X PUT \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
      "id": "95c365e17e1b46599cd99e5b231fac4e",
      "description": "Rule description",
      "enabled": true,
      "expression": "http.cookie eq \"a=b\"",
      "parameters": {
        "host": "examplebucket.s3.eu-north-1.amazonaws.com"
      },
      "provider": "aws_s3"
    }
  ]
}
```
