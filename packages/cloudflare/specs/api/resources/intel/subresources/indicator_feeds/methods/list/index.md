## Get indicator feeds owned by this account

**get** `/accounts/{account_id}/intel/indicator-feeds`

Retrieves details for all accessible custom threat indicator feeds.

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

- `result: optional array of object { id, created_on, description, 5 more }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds \
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
      "created_on": "2023-05-12T12:21:56.777653Z",
      "description": "user specified description 1",
      "is_attributable": false,
      "is_downloadable": false,
      "is_public": false,
      "modified_on": "2023-06-18T03:13:34.123321Z",
      "name": "user_specified_name_1"
    },
    {
      "id": 2,
      "created_on": "2023-05-21T21:43:52.867525Z",
      "description": "User specified description 2",
      "is_attributable": false,
      "is_downloadable": false,
      "is_public": false,
      "modified_on": "2023-06-28T18:46:18.764425Z",
      "name": "user_specified_name_2"
    }
  ]
}
```
