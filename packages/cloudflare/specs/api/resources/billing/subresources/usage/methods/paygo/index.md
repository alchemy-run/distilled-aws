## Get PayGo Account Billable Usage (Version 1, Alpha)

**get** `/accounts/{account_id}/paygo-usage`

Returns billable usage data for PayGo (self-serve) accounts.
When no query parameters are provided, returns usage for the current
billing period.
This endpoint is currently in alpha and access is restricted to select
accounts. While in alpha, the endpoint may get breaking changes.

### Path Parameters

- `account_id: string`

  Represents a Cloudflare resource identifier tag.

### Query Parameters

- `from: optional string`

  Start date for the usage query (ISO 8601).

- `to: optional string`

  End date for the usage query (ISO 8601).

### Returns

- `errors: array of object { message, code }`

  Contains error details if the request failed.

  - `message: string`

    Describes the error or notice.

  - `code: optional number`

    Identifies the error or notice type.

- `messages: array of object { message, code }`

  Contains informational notices about the response.

  - `message: string`

    Describes the error or notice.

  - `code: optional number`

    Identifies the error or notice type.

- `result: array of object { BillingCurrency, BillingPeriodStart, ChargePeriodEnd, 12 more }`

  Contains the array of billable usage records.

  - `BillingCurrency: string`

    Specifies the billing currency code (ISO 4217).

  - `BillingPeriodStart: string`

    Indicates the start of the billing period.

  - `ChargePeriodEnd: string`

    Indicates the end of the charge period.

  - `ChargePeriodStart: string`

    Indicates the start of the charge period.

  - `ConsumedQuantity: number`

    Specifies the quantity consumed during this charge period.

  - `ConsumedUnit: string`

    A display name for the unit of measurement used for the product (for example, "GB-months", "GB-seconds"). May be empty when the unit is implicit in the service name.

  - `ContractedCost: number`

    Specifies the cost for this charge period in the billing currency.

  - `CumulatedContractedCost: number`

    Specifies the cumulated cost for the billing period in the billing currency.

  - `CumulatedPricingQuantity: number`

    Specifies the cumulated pricing quantity for the billing period.

  - `PricingQuantity: number`

    Specifies the pricing quantity for this charge period.

  - `ServiceName: string`

    Identifies the Cloudflare service.

  - `ServiceFamilyName: optional string`

    Identifies the product family for the Cloudflare service.

  - `SubscriptionId: optional string`

    The identifier for the Cloudflare subscription.

  - `ZoneId: optional string`

    The identifier for the Cloudflare zone (zone tag).

  - `ZoneName: optional string`

    The display name of the Cloudflare zone.

- `success: true`

  Indicates whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/paygo-usage \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 0
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 0
    }
  ],
  "result": [
    {
      "BillingCurrency": "USD",
      "BillingPeriodStart": "2025-02-01T00:00:00Z",
      "ChargePeriodEnd": "2025-02-02T00:00:00Z",
      "ChargePeriodStart": "2025-02-01T00:00:00Z",
      "ConsumedQuantity": 150000,
      "ConsumedUnit": "GB-months",
      "ContractedCost": 0.75,
      "CumulatedContractedCost": 2.25,
      "CumulatedPricingQuantity": 4500000,
      "PricingQuantity": 150000,
      "ServiceName": "Workers Standard",
      "ServiceFamilyName": "Workers",
      "SubscriptionId": "3F3CD4CQ6N7FXO7IK6NVFJBOYA",
      "ZoneId": "023e105f4ecef8ad9ca31a8372d0c353",
      "ZoneName": "example.com"
    }
  ],
  "success": true
}
```
