# History

## Billing History Details

**get** `/user/billing/history`

Accesses your billing history object.

### Query Parameters

- `action: optional string`

  The billing item action.

- `occurred_at: optional string`

  When the billing item was created.

- `order: optional "type" or "occurred_at" or "action"`

  Field to order billing history by.

  - `"type"`

  - `"occurred_at"`

  - `"action"`

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of items per page.

- `type: optional string`

  The billing item type.

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

- `result: array of BillingHistory`

  - `id: string`

    Billing item identifier tag.

  - `action: string`

    The billing item action.

  - `amount: number`

    The amount associated with this billing item.

  - `currency: string`

    The monetary unit in which pricing information is displayed.

  - `description: string`

    The billing item description.

  - `occurred_at: string`

    When the billing item was created.

  - `type: string`

    The billing item type.

  - `zone: object { name }`

    - `name: optional string`

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
curl https://api.cloudflare.com/client/v4/user/billing/history \
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
      "id": "b69a9f3492637782896352daae219e7d",
      "action": "subscription",
      "amount": 20.99,
      "currency": "USD",
      "description": "The billing item description",
      "occurred_at": "2014-03-01T12:21:59.3456Z",
      "type": "charge",
      "zone": {
        "name": "name"
      }
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

## Domain Types

### Billing History

- `BillingHistory object { id, action, amount, 5 more }`

  - `id: string`

    Billing item identifier tag.

  - `action: string`

    The billing item action.

  - `amount: number`

    The amount associated with this billing item.

  - `currency: string`

    The monetary unit in which pricing information is displayed.

  - `description: string`

    The billing item description.

  - `occurred_at: string`

    When the billing item was created.

  - `type: string`

    The billing item type.

  - `zone: object { name }`

    - `name: optional string`
