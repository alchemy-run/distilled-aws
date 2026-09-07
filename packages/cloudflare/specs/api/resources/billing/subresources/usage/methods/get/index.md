## Get Account Usage (Version 2, Alpha, Restricted)

**get** `/accounts/{account_id}/billable/usage`

Returns cost and usage data for a single Cloudflare account, aligned
with the [FinOps FOCUS v1.3](https://focus.finops.org/focus-specification/v1-3/)
Cost and Usage dataset specification.

Each record represents one billable metric for one account on one day.
This includes all metered usage, including usage that falls within
free-tier allowances and may result in zero cost.

**Note:** Cost and pricing fields are not yet populated and
will be absent from responses until billing integration is complete.

When `from` and `to` are omitted, defaults to the start of the current
month through today. The maximum date range is 31 days.

### Path Parameters

- `account_id: string`

  Represents a Cloudflare resource identifier tag.

### Query Parameters

- `from: optional string`

  Start date for the usage query (ISO 8601). Required if `to` is set. When omitted along with `to`, defaults to the start of the current month. Filters by charge period (when consumption happened), not billing period. The maximum date range is 31 days.

- `metric: optional string`

  Filter results by billable metric id (e.g., workers_standard_requests).

- `to: optional string`

  End date for the usage query (ISO 8601). Required if `from` is set. When omitted along with `from`, defaults to today. Filters by charge period (when consumption happened), not billing period. The maximum date range is 31 days.

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

- `result: array of object { BillingAccountId, BillingAccountName, ChargeCategory, 30 more }`

  Contains the array of cost and usage records.

  - `BillingAccountId: string`

    Public identifier of the Cloudflare account (account tag).

  - `BillingAccountName: string`

    Display name of the Cloudflare account.

  - `ChargeCategory: "Usage"`

    Highest-level classification of a charge based on the nature of how it gets billed. Currently only "Usage" is supported.

    - `"Usage"`

  - `ChargeDescription: string`

    Self-contained summary of the charge's purpose and price.

  - `ChargeFrequency: "Usage-Based"`

    Indicates how often a charge occurs. Currently only "Usage-Based" is supported.

    - `"Usage-Based"`

  - `ChargePeriodEnd: string`

    Exclusive end of the time interval during which the usage was consumed.

  - `ChargePeriodStart: string`

    Inclusive start of the time interval during which the usage was consumed.

  - `ConsumedQuantity: number`

    Measured usage amount within the charge period. Reflects raw metered consumption before pricing transformations.

  - `ConsumedUnit: string`

    Unit of measure for the consumed quantity (e.g., "GB", "Requests", "vCPU-Hours").

  - `HostProviderName: string`

    Name of the entity providing the underlying infrastructure or platform.

  - `InvoiceIssuerName: string`

    Name of the entity responsible for invoicing for the services consumed.

  - `ServiceProviderName: string`

    Name of the entity that made the services available for purchase.

  - `x_BillableMetricName: string`

    The display name of the billable metric. Cloudflare extension; replaces FOCUS SkuMeter.

  - `BilledCost: optional number`

    A charge serving as the basis for invoicing, inclusive of all reduced rates and discounts while excluding the amortization of upfront charges (one-time or recurring).

  - `BillingCurrency: optional string`

    Currency that a charge was billed in (ISO 4217).

  - `BillingPeriodEnd: optional string`

    Exclusive end of the billing cycle that contains this usage record.

  - `BillingPeriodStart: optional string`

    Inclusive start of the billing cycle that contains this usage record.

  - `ChargeClass: optional "Correction"`

    Indicates whether the row represents a correction to one or more charges invoiced in a previous billing period.

    - `"Correction"`

  - `ContractedCost: optional number`

    Cost calculated by multiplying ContractedUnitPrice and the corresponding PricingQuantity.

  - `ContractedUnitPrice: optional number`

    The agreed-upon unit price for a single PricingUnit of the associated billable metric, inclusive of negotiated discounts, if present, while excluding any other discounts.

  - `EffectiveCost: optional number`

    The amortized cost of the charge after applying all reduced rates, discounts, and the applicable portion of relevant, prepaid purchases (one-time or recurring) that covered the charge.

  - `ListCost: optional number`

    Cost calculated by multiplying ListUnitPrice and the corresponding PricingQuantity.

  - `ListUnitPrice: optional number`

    Suggested provider-published unit price for a single PricingUnit of the associated billable metric, exclusive of any discounts.

  - `PricingQuantity: optional number`

    Volume of a given service used or purchased, based on the PricingUnit.

  - `PricingUnit: optional string`

    Provider-specified measurement unit for determining unit prices, indicating how the provider rates measured usage after applying pricing rules like block pricing.

  - `RegionId: optional string`

    Provider-assigned identifier for an isolated geographic area where a service is provided.

  - `RegionName: optional string`

    Name of an isolated geographic area where a service is provided.

  - `SubAccountId: optional string`

    Unique identifier assigned to a grouping of services. For Cloudflare, this is the subscription or contract ID.

  - `SubAccountName: optional string`

    Name assigned to a grouping of services. For Cloudflare, this is the subscription or contract display name.

  - `x_BillableMetricId: optional string`

    The unique identifier for the billable metric in the Cloudflare catalog. Cloudflare extension; replaces FOCUS SkuId.

  - `x_ProductFamilyName: optional string`

    The product family the charge belongs to (e.g., "R2", "Workers"). Cloudflare extension; replaces FOCUS ServiceName.

  - `x_ZoneId: optional string`

    The identifier for the Cloudflare zone (zone tag). Cloudflare extension.

  - `x_ZoneName: optional string`

    The display name of the Cloudflare zone. Cloudflare extension.

- `success: true`

  Indicates whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/billable/usage \
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
      "BillingAccountId": "023e105f4ecef8ad9ca31a8372d0c353",
      "BillingAccountName": "My Account",
      "ChargeCategory": "Usage",
      "ChargeDescription": "Workers Standard Requests — daily usage",
      "ChargeFrequency": "Usage-Based",
      "ChargePeriodEnd": "2025-05-02T00:00:00Z",
      "ChargePeriodStart": "2025-05-01T00:00:00Z",
      "ConsumedQuantity": 150000,
      "ConsumedUnit": "Requests",
      "HostProviderName": "Cloudflare",
      "InvoiceIssuerName": "Cloudflare",
      "ServiceProviderName": "Cloudflare",
      "x_BillableMetricName": "Workers Standard Requests",
      "BilledCost": 0,
      "BillingCurrency": "USD",
      "BillingPeriodEnd": "2025-06-01T00:00:00Z",
      "BillingPeriodStart": "2025-05-01T00:00:00Z",
      "ChargeClass": "Correction",
      "ContractedCost": 0.75,
      "ContractedUnitPrice": 0.000005,
      "EffectiveCost": 0,
      "ListCost": 0.75,
      "ListUnitPrice": 0.000005,
      "PricingQuantity": 150000,
      "PricingUnit": "Requests",
      "RegionId": "EEUR",
      "RegionName": "Eastern Europe",
      "SubAccountId": "c9bd752d-9ca8-411d-b804-be44a758057f",
      "SubAccountName": "My Subscription",
      "x_BillableMetricId": "workers_standard_requests",
      "x_ProductFamilyName": "Workers",
      "x_ZoneId": "023e105f4ecef8ad9ca31a8372d0c353",
      "x_ZoneName": "example.com"
    }
  ],
  "success": true
}
```
