## List indicator feed permissions

**get** `/accounts/{account_id}/intel/indicator-feeds/permissions/view`

Lists current access permissions for custom threat indicator feeds.

### Path Parameters

- `account_id: string`

  Identifier

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

- `result: optional array of object { id, description, is_attributable, 3 more }`

  - `id: optional number`

    The unique identifier for the indicator feed

  - `description: optional string`

    The description of the example test

  - `is_attributable: optional boolean`

    Whether the indicator feed can be attributed to a provider

  - `is_downloadable: optional boolean`

    Whether the indicator feed can be downloaded

  - `is_public: optional boolean`

    Whether the indicator feed is exposed to customers

  - `name: optional string`

    The name of the indicator feed

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/permissions/view \
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
      "id": 1,
      "description": "An important indicator list",
      "is_attributable": false,
      "is_downloadable": false,
      "is_public": false,
      "name": "indicator_list_1"
    },
    {
      "id": 2,
      "description": "An even more important indicator list",
      "is_attributable": true,
      "is_downloadable": false,
      "is_public": true,
      "name": "indicator_list_2"
    }
  ]
}
```
