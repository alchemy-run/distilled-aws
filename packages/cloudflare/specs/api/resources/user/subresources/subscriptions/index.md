# Subscriptions

## Get User Subscriptions

**get** `/user/subscriptions`

Lists all of a user's subscriptions.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: array of Subscription`

  - `id: optional string`

    Subscription identifier tag.

  - `currency: optional string`

    The monetary unit in which pricing information is displayed.

  - `current_period_end: optional string`

    The end of the current period and also when the next billing is due.

  - `current_period_start: optional string`

    When the current billing period started. May match initial_period_start if this is the first period.

  - `frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"`

    How often the subscription is renewed automatically.

    - `"weekly"`

    - `"monthly"`

    - `"quarterly"`

    - `"yearly"`

  - `price: optional number`

    The price of the subscription that will be billed, in US dollars.

  - `rate_plan: optional RatePlan`

    The rate plan applied to the subscription.

    - `id: optional "free" or "lite" or "pro" or 7 more`

      The ID of the rate plan.

      - `"free"`

      - `"lite"`

      - `"pro"`

      - `"pro_plus"`

      - `"business"`

      - `"enterprise"`

      - `"partners_free"`

      - `"partners_pro"`

      - `"partners_business"`

      - `"partners_enterprise"`

    - `currency: optional string`

      The currency applied to the rate plan subscription.

    - `externally_managed: optional boolean`

      Whether this rate plan is managed externally from Cloudflare.

    - `is_contract: optional boolean`

      Whether a rate plan is enterprise-based (or newly adopted term contract).

    - `public_name: optional string`

      The full name of the rate plan.

    - `scope: optional string`

      The scope that this rate plan applies to.

    - `sets: optional array of string`

      The list of sets this rate plan applies to. Returns array of strings.

  - `state: optional "Trial" or "Provisioned" or "Paid" or 4 more`

    The state that the subscription is in.

    - `"Trial"`

    - `"Provisioned"`

    - `"Paid"`

    - `"AwaitingPayment"`

    - `"Cancelled"`

    - `"Failed"`

    - `"Expired"`

- `success: true`

  Whether the API call was successful

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/user/subscriptions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": [
    {
      "id": "506e3185e9c882d175a2d0cb0093d9f2",
      "currency": "USD",
      "current_period_end": "2014-03-31T12:20:00Z",
      "current_period_start": "2014-05-11T12:20:00Z",
      "frequency": "monthly",
      "price": 20,
      "rate_plan": {
        "id": "free",
        "currency": "USD",
        "externally_managed": false,
        "is_contract": false,
        "public_name": "Business Plan",
        "scope": "zone",
        "sets": [
          "string"
        ]
      },
      "state": "Paid"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Update User Subscription

**put** `/user/subscriptions/{identifier}`

Updates a user's subscriptions.

### Path Parameters

- `identifier: string`

  Subscription identifier tag.

### Body Parameters

- `frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"`

  How often the subscription is renewed automatically.

  - `"weekly"`

  - `"monthly"`

  - `"quarterly"`

  - `"yearly"`

- `rate_plan: optional RatePlan`

  The rate plan applied to the subscription.

  - `id: optional "free" or "lite" or "pro" or 7 more`

    The ID of the rate plan.

    - `"free"`

    - `"lite"`

    - `"pro"`

    - `"pro_plus"`

    - `"business"`

    - `"enterprise"`

    - `"partners_free"`

    - `"partners_pro"`

    - `"partners_business"`

    - `"partners_enterprise"`

  - `currency: optional string`

    The currency applied to the rate plan subscription.

  - `externally_managed: optional boolean`

    Whether this rate plan is managed externally from Cloudflare.

  - `is_contract: optional boolean`

    Whether a rate plan is enterprise-based (or newly adopted term contract).

  - `public_name: optional string`

    The full name of the rate plan.

  - `scope: optional string`

    The scope that this rate plan applies to.

  - `sets: optional array of string`

    The list of sets this rate plan applies to. Returns array of strings.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: unknown or string`

  - `unknown`

  - `string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/user/subscriptions/$IDENTIFIER \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "frequency": "monthly"
        }'
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
  "result": {},
  "success": true
}
```

## Delete User Subscription

**delete** `/user/subscriptions/{identifier}`

Deletes a user's subscription.

### Path Parameters

- `identifier: string`

  Subscription identifier tag.

### Returns

- `subscription_id: optional string`

  Subscription identifier tag.

### Example

```http
curl https://api.cloudflare.com/client/v4/user/subscriptions/$IDENTIFIER \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "subscription_id": "506e3185e9c882d175a2d0cb0093d9f2"
}
```

## Domain Types

### Subscription Update Response

- `SubscriptionUpdateResponse = unknown or string`

  - `unknown`

  - `string`

### Subscription Delete Response

- `SubscriptionDeleteResponse object { subscription_id }`

  - `subscription_id: optional string`

    Subscription identifier tag.
