## Check target connectivity

**put** `/accounts/{account_id}/slurper/target/connectivity-precheck`

Check whether tokens are valid against the target bucket

### Path Parameters

- `account_id: string`

### Body Parameters

- `bucket: string`

- `secret: object { accessKeyId, secretAccessKey }`

  - `accessKeyId: string`

  - `secretAccessKey: string`

- `vendor: Provider`

  - `"r2"`

- `jurisdiction: optional "default" or "eu" or "fedramp"`

  - `"default"`

  - `"eu"`

  - `"fedramp"`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional object { connectivityStatus }`

  - `connectivityStatus: optional "success" or "error"`

    - `"success"`

    - `"error"`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/target/connectivity-precheck \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "bucket": "bucket",
          "secret": {
            "accessKeyId": "accessKeyId",
            "secretAccessKey": "secretAccessKey"
          },
          "vendor": "r2"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "connectivityStatus": "success"
  },
  "success": true
}
```
