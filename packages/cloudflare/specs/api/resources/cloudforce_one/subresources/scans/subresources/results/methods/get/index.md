## Get the Latest Scan Result

**get** `/accounts/{account_id}/cloudforce-one/scans/results/{config_id}`

Get the Latest Scan Result

### Path Parameters

- `account_id: string`

  Defines the Account ID.

- `config_id: string`

  Defines the Config ID.

### Returns

- `errors: array of string`

- `messages: array of string`

- `result: object { "1.1.1.1" }`

  - `"1.1.1.1": array of ScanResult`

    - `number: optional number`

    - `proto: optional string`

    - `status: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/scans/results/$CONFIG_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    "string"
  ],
  "messages": [
    "string"
  ],
  "result": {
    "1.1.1.1": [
      {
        "number": 8080,
        "proto": "tcp",
        "status": "open"
      }
    ]
  },
  "success": true
}
```
