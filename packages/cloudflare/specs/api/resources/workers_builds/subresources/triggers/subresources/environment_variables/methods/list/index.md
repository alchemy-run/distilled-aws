## List environment variables

**get** `/accounts/{account_id}/builds/triggers/{trigger_uuid}/environment_variables`

Get all environment variables for a trigger

### Path Parameters

- `account_id: string`

  Account identifier.

- `trigger_uuid: string`

  Trigger UUID.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: map[object { created_on, is_secret, value } ]`

  - `created_on: string`

  - `is_secret: boolean`

  - `value: optional string`

    Value is null for secret environment variables

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/triggers/$TRIGGER_UUID/environment_variables \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "API_KEY": {
      "created_on": "2023-01-01T00:00:00Z",
      "is_secret": true,
      "value": null
    },
    "NODE_ENV": {
      "created_on": "2023-01-01T00:00:00Z",
      "is_secret": false,
      "value": "production"
    }
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```
