## Delete environment variable

**delete** `/accounts/{account_id}/builds/triggers/{trigger_uuid}/environment_variables/{environment_variable_key}`

Remove a specific environment variable from a trigger

### Path Parameters

- `account_id: string`

  Account identifier.

- `trigger_uuid: string`

  Trigger UUID.

- `environment_variable_key: string`

  Environment variable key.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of string`

- `result: unknown`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

  - `total_pages: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/triggers/$TRIGGER_UUID/environment_variables/$ENVIRONMENT_VARIABLE_KEY \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": null,
  "success": true
}
```
