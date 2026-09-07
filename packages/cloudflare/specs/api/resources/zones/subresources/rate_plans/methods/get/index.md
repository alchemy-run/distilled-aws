## List Available Rate Plans

**get** `/zones/{zone_id}/available_rate_plans`

Lists all rate plans the zone can subscribe to.

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

- `result: array of object { id, components, currency, 3 more }`

  - `id: optional string`

    Plan identifier tag.

  - `components: optional array of object { default, name, unit_price }`

    Array of available components values for the plan.

    - `default: optional number`

      The default amount allocated.

    - `name: optional "zones" or "page_rules" or "dedicated_certificates" or "dedicated_certificates_custom"`

      The unique component.

      - `"zones"`

      - `"page_rules"`

      - `"dedicated_certificates"`

      - `"dedicated_certificates_custom"`

    - `unit_price: optional number`

      The unit price of the addon.

  - `currency: optional string`

    The monetary unit in which pricing information is displayed.

  - `duration: optional number`

    The duration of the plan subscription.

  - `frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"`

    The frequency at which you will be billed for this plan.

    - `"weekly"`

    - `"monthly"`

    - `"quarterly"`

    - `"yearly"`

  - `name: optional string`

    The plan name.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/available_rate_plans \
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
      "id": "free",
      "components": [
        {
          "default": 5,
          "name": "page_rules",
          "unit_price": 1
        }
      ],
      "currency": "USD",
      "duration": 1,
      "frequency": "monthly",
      "name": "Free Plan"
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
