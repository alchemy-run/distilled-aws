# Eligible

## Get delivery mechanism eligibility

**get** `/accounts/{account_id}/alerting/v3/destinations/eligible`

Get a list of all delivery mechanism types for which an account is eligible.

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

- `result: optional map[array of object { eligible, ready, type } ]`

  - `eligible: optional boolean`

    Determines whether or not the account is eligible for the delivery mechanism.

  - `ready: optional boolean`

    Beta flag. Users can create a policy with a mechanism that is not ready, but we cannot guarantee successful delivery of notifications.

  - `type: optional "email" or "pagerduty" or "webhook"`

    Determines type of delivery mechanism.

    - `"email"`

    - `"pagerduty"`

    - `"webhook"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/destinations/eligible \
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
    "foo": [
      {
        "eligible": true,
        "ready": true,
        "type": "email"
      }
    ]
  }
}
```

## Domain Types

### Eligible Get Response

- `EligibleGetResponse = map[array of object { eligible, ready, type } ]`

  - `eligible: optional boolean`

    Determines whether or not the account is eligible for the delivery mechanism.

  - `ready: optional boolean`

    Beta flag. Users can create a policy with a mechanism that is not ready, but we cannot guarantee successful delivery of notifications.

  - `type: optional "email" or "pagerduty" or "webhook"`

    Determines type of delivery mechanism.

    - `"email"`

    - `"pagerduty"`

    - `"webhook"`
