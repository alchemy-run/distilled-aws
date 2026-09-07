## Update indicator feed metadata

**put** `/accounts/{account_id}/intel/indicator-feeds/{feed_id}`

Revises details for a specific custom threat indicator feed.

### Path Parameters

- `account_id: string`

  Identifier

- `feed_id: number`

  Indicator feed ID

### Body Parameters

- `description: optional string`

  The new description of the feed

- `is_attributable: optional boolean`

  The new is_attributable value of the feed

- `is_downloadable: optional boolean`

  The new is_downloadable value of the feed

- `is_public: optional boolean`

  The new is_public value of the feed

- `name: optional string`

  The new name of the feed

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

- `result: optional object { id, created_on, description, 5 more }`

  - `id: optional number`

    The unique identifier for the indicator feed

  - `created_on: optional string`

    The date and time when the data entry was created

  - `description: optional string`

    The description of the example test

  - `is_attributable: optional boolean`

    Whether the indicator feed can be attributed to a provider

  - `is_downloadable: optional boolean`

    Whether the indicator feed can be downloaded

  - `is_public: optional boolean`

    Whether the indicator feed is exposed to customers

  - `modified_on: optional string`

    The date and time when the data entry was last modified

  - `name: optional string`

    The name of the indicator feed

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/$FEED_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "description": "This is an example description",
          "is_attributable": true,
          "is_downloadable": true,
          "is_public": true,
          "name": "indicator_list"
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
  "result": {
    "id": 1,
    "created_on": "2023-05-12T12:21:56.777653Z",
    "description": "example feed description",
    "is_attributable": false,
    "is_downloadable": false,
    "is_public": false,
    "modified_on": "2023-06-18T03:13:34.123321Z",
    "name": "example_feed_1"
  }
}
```
