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
