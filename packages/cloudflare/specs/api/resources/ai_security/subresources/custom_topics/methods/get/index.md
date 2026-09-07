## Get AI Security for Apps Custom Topics

**get** `/zones/{zone_id}/ai-security/custom-topics`

Get the AI Security for Apps custom topic categories for a zone.

### Path Parameters

- `zone_id: string`

  Defines the zone.

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

- `result: object { topics }`

  - `topics: optional array of object { label, topic }`

    Custom topic categories for AI Security for Apps content detection.

    - `label: string`

      Unique label identifier. Must contain only lowercase letters (a–z), digits (0–9), and hyphens.

    - `topic: string`

      Description of the topic category. Must contain only printable ASCII characters.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ai-security/custom-topics \
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
    "topics": [
      {
        "label": "credit-cards",
        "topic": "credit card numbers"
      }
    ]
  },
  "success": true
}
```
