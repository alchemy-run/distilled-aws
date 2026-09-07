# Plans

## List Available Plans

**get** `/zones/{zone_id}/available_plans`

Lists available plans the zone can subscribe to.

### Path Parameters

- `zone_id: string`

  Identifier

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

- `result: array of AvailableRatePlan`

  - `id: optional string`

    Identifier

  - `can_subscribe: optional boolean`

    Indicates whether you can subscribe to this plan.

  - `currency: optional string`

    The monetary unit in which pricing information is displayed.

  - `externally_managed: optional boolean`

    Indicates whether this plan is managed externally.

  - `frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"`

    The frequency at which you will be billed for this plan.

    - `"weekly"`

    - `"monthly"`

    - `"quarterly"`

    - `"yearly"`

  - `is_subscribed: optional boolean`

    Indicates whether you are currently subscribed to this plan.

  - `legacy_discount: optional boolean`

    Indicates whether this plan has a legacy discount applied.

  - `legacy_id: optional string`

    The legacy identifier for this rate plan, if any.

  - `name: optional string`

    The plan name.

  - `price: optional number`

    The amount you will be billed for this plan.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/available_plans \
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "can_subscribe": true,
      "currency": "USD",
      "externally_managed": false,
      "frequency": "monthly",
      "is_subscribed": false,
      "legacy_discount": false,
      "legacy_id": "free",
      "name": "Free Plan",
      "price": 0
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

## Available Plan Details

**get** `/zones/{zone_id}/available_plans/{plan_identifier}`

Details of the available plan that the zone can subscribe to.

### Path Parameters

- `zone_id: string`

  Identifier

- `plan_identifier: string`

  Identifier

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

- `result: AvailableRatePlan`

  - `id: optional string`

    Identifier

  - `can_subscribe: optional boolean`

    Indicates whether you can subscribe to this plan.

  - `currency: optional string`

    The monetary unit in which pricing information is displayed.

  - `externally_managed: optional boolean`

    Indicates whether this plan is managed externally.

  - `frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"`

    The frequency at which you will be billed for this plan.

    - `"weekly"`

    - `"monthly"`

    - `"quarterly"`

    - `"yearly"`

  - `is_subscribed: optional boolean`

    Indicates whether you are currently subscribed to this plan.

  - `legacy_discount: optional boolean`

    Indicates whether this plan has a legacy discount applied.

  - `legacy_id: optional string`

    The legacy identifier for this rate plan, if any.

  - `name: optional string`

    The plan name.

  - `price: optional number`

    The amount you will be billed for this plan.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/available_plans/$PLAN_IDENTIFIER \
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "can_subscribe": true,
    "currency": "USD",
    "externally_managed": false,
    "frequency": "monthly",
    "is_subscribed": false,
    "legacy_discount": false,
    "legacy_id": "free",
    "name": "Free Plan",
    "price": 0
  },
  "success": true
}
```

## Domain Types

### Available Rate Plan

- `AvailableRatePlan object { id, can_subscribe, currency, 7 more }`

  - `id: optional string`

    Identifier

  - `can_subscribe: optional boolean`

    Indicates whether you can subscribe to this plan.

  - `currency: optional string`

    The monetary unit in which pricing information is displayed.

  - `externally_managed: optional boolean`

    Indicates whether this plan is managed externally.

  - `frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"`

    The frequency at which you will be billed for this plan.

    - `"weekly"`

    - `"monthly"`

    - `"quarterly"`

    - `"yearly"`

  - `is_subscribed: optional boolean`

    Indicates whether you are currently subscribed to this plan.

  - `legacy_discount: optional boolean`

    Indicates whether this plan has a legacy discount applied.

  - `legacy_id: optional string`

    The legacy identifier for this rate plan, if any.

  - `name: optional string`

    The plan name.

  - `price: optional number`

    The amount you will be billed for this plan.
