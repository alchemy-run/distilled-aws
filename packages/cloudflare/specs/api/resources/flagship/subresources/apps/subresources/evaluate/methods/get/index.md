## Evaluate flag

**get** `/accounts/{account_id}/flagship/apps/{app_id}/evaluate`

Evaluates a flag against the provided context. Pass context attributes as query parameters; boolean and numeric strings are coerced automatically. For low-latency in-Worker evaluation, prefer the Flagship binding over this endpoint.

### Path Parameters

- `account_id: string`

  Cloudflare account ID.

- `app_id: string`

  App identifier.

### Query Parameters

- `flagKey: string`

  The flag key to evaluate.

- `targetingKey: optional string`

  Context targeting key (per OpenFeature spec); used for percentage rollout bucketing.

### Returns

- `flagKey: string`

- `reason: "TARGETING_MATCH" or "DEFAULT" or "DISABLED" or "SPLIT"`

  - `"TARGETING_MATCH"`

  - `"DEFAULT"`

  - `"DISABLED"`

  - `"SPLIT"`

- `variant: string`

- `value: optional string or number or boolean or 2 more`

  - `string`

  - `number`

  - `boolean`

  - `map[unknown]`

  - `array of unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/flagship/apps/$APP_ID/evaluate \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "flagKey": "flagKey",
  "reason": "TARGETING_MATCH",
  "variant": "variant",
  "value": "string"
}
```
