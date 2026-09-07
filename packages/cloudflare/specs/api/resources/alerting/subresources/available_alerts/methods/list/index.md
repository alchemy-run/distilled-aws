## Get Alert Types

**get** `/accounts/{account_id}/alerting/v3/available_alerts`

Gets a list of all alert types for which an account is eligible.

### Path Parameters

- `account_id: string`

  The account id

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional map[array of object { description, display_name, filter_options, type } ]`

  - `description: optional string`

    Describes the alert type.

  - `display_name: optional string`

    Alert type name.

  - `filter_options: optional array of unknown`

    Format of additional configuration options (filters) for the alert type. Data type of filters during policy creation: Array of strings.

  - `type: optional string`

    Use this value when creating and updating a notification policy.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/available_alerts \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": {
    "Origin Monitoring": [
      {
        "description": "High levels of 5xx HTTP errors at your origin.",
        "display_name": "Origin Error Rate Alert",
        "filter_options": [
          {
            "AvailableValues": null,
            "ComparisonOperator": "==",
            "Key": "zones",
            "Range": "1-n"
          },
          {
            "AvailableValues": [
              {
                "Description": "Service-Level Objective of 99.7",
                "ID": "99.7"
              },
              {
                "Description": "Service-Level Objective of 99.8",
                "ID": "99.8"
              }
            ],
            "ComparisonOperator": ">=",
            "Key": "slo",
            "Range": "0-1"
          }
        ],
        "type": "http_alert_origin_error"
      }
    ]
  }
}
```
